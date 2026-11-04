# -*- coding: utf-8 -*-
"""宽基日线：仅接受交易所已收盘数据；有限窗口高点不等于历史最高价。"""
import os
import json
import time
import datetime as dt
import requests
import argparse
from pathlib import Path
from market_quality import checked_rows, utc_now
from refresh_store import refresh_lock, recover, load_baseline, build_pipeline, publish_local, acknowledge, file_versions
from longbridge_source import fetch_longbridge, configure_snapshot
from release_policy import alerts_enabled

UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}
RETRIES = 3

# 路径（脚本位于 <repo>/scripts/）
BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STATE_FILE = os.path.join(BASE, "scripts", "level_state.json")
ALERT_FILE = os.path.join(BASE, "scripts", "alerts.json")
REVIEWED_JUMPS_FILE = os.path.join(BASE, "scripts", "reviewed_jumps.json")
# 回撤档位（正数=回撤深度）
LEVEL_DS = [0.10, 0.20, 0.30, 0.40, 0.50]
# 有限窗口盘中高点，不冒充全历史 ATH。
ATH_WINDOW = 2000

# 保留原有分析起点；该起点不代表真实上市/发布日，窗口元数据如实披露。
TARGETS = [
    ("QQQ", "纳斯达克100", "US", "QQQ", "USD", None),
    ("SPY", "标普500", "US", "SPY", "USD", None),
    ("DIA", "道琼斯工业", "US", "DIA", "USD", None),
    ("IWM", "罗素2000", "US", "IWM", "USD", None),
    ("SH000001", "上证指数", "A", "sh000001", "CNY", "2018-01-01"),
    ("SH000300", "沪深300", "A", "sh000300", "CNY", "2018-01-01"),
    ("SH000510", "中证A500", "A", "sh000510", "CNY", "2024-09-23"),
    ("SZ399006", "创业板指", "A", "sz399006", "CNY", "2018-01-01"),
    ("SH000688", "科创50", "A", "sh000688", "CNY", "2020-01-01"),
]


def http_get(url, timeout=25):
    last = None
    for i in range(RETRIES):
        try:
            r = requests.get(url, timeout=timeout, headers=UA)
            r.raise_for_status()
            return r
        except Exception as e:
            last = e
            time.sleep(1.5 * (i + 1))
    raise last


def _df_to_rows(df):
    """AkShare DataFrame(date,open,high,low,close[,volume]) -> list[(date,open,close,high,low)]"""
    out = []
    for _, r in df.iterrows():
        d = r["date"]
        d = d.strftime("%Y-%m-%d") if hasattr(d, "strftime") else str(d)[:10]
        try:
            out.append((d, float(r["open"]), float(r["close"]),
                        float(r["high"]), float(r["low"])))
        except Exception:
            continue
    return out


def fetch_us_yahoo(symbol):
    """Yahoo chart API，返回 list[(date, open, close, high, low)]"""
    url = f"https://query1.finance.yahoo.com/v8/finance/chart/{symbol}?range=10y&interval=1d"
    j = http_get(url).json()
    res = j["chart"]["result"][0]
    ts = res["timestamp"]
    q = res["indicators"]["quote"][0]
    out = []
    for i, t in enumerate(ts):
        o, c, h, l = q["open"][i], q["close"][i], q["high"][i], q["low"][i]
        if c is None or h is None:
            continue
        d = dt.datetime.fromtimestamp(t, tz=dt.timezone.utc).astimezone(__import__('zoneinfo').ZoneInfo('America/New_York')).strftime("%Y-%m-%d")
        out.append((d, o, c, h, l))
    return out


def fetch_a_tencent(symbol):
    """腾讯 fqkline，返回 list[(date, open, close, high, low)]"""
    url = f"http://web.ifzq.gtimg.cn/appstock/app/fqkline/get?param={symbol},day,2018-01-01,,2000,qfq"
    j = http_get(url).json()
    p = j["data"][symbol]
    rows = p.get("day") or p.get("qfqday") or []
    out = []
    for row in rows:
        d, o, c, h, l = row[0], float(row[1]), float(row[2]), float(row[3]), float(row[4])
        out.append((d, o, c, h, l))
    return out


def fetch_us_akshare(symbol):
    """AkShare 新浪美股未复权日K，返回 list[(date, open, close, high, low)]

    前复权因子会在除权日跳变，可能夸大正常单日跌幅并误报，故用未复权。
    """
    import akshare as ak
    return _df_to_rows(ak.stock_us_daily(symbol=symbol, adjust=""))


def fetch_a_akshare(symbol):
    """AkShare 新浪A股指数日K，返回 list[(date, open, close, high, low)]"""
    import akshare as ak
    return _df_to_rows(ak.stock_zh_index_daily(symbol=symbol))


def load_reviewed_jumps(path=REVIEWED_JUMPS_FILE):
    """加载复核例外清单 -> {code: {date: move}}；文件缺失时返回空映射。"""
    if not os.path.exists(path):
        return {}
    with open(path, encoding="utf-8") as f:
        data = json.load(f)
    by_code = {}
    for entry in data.get("entries", []):
        by_code.setdefault(entry["code"], {})[entry["date"]] = entry["move"]
    return by_code


def fetch_daily(symbol, market, now=None, start=None, approved_moves=None):
    candidates = ([(fetch_longbridge, "Longbridge", "qfq"),
                   (fetch_us_yahoo, "Yahoo Finance", "unadjusted"),
                   (fetch_us_akshare, "AkShare(新浪)", "unadjusted")] if market == "US" else
                  [(fetch_longbridge, "Longbridge", "index"),
                   (fetch_a_tencent, "腾讯证券", "index"),
                   (fetch_a_akshare, "AkShare(新浪)", "index")])
    failures = []
    for fetcher, source, basis in candidates:
        try:
            raw = fetcher(symbol, market, now) if source == "Longbridge" else fetcher(symbol)
            rows, quality = checked_rows(raw, market, now, start,
                                         approved_moves=approved_moves)
            return rows, source, basis, quality
        except Exception as error:
            failures.append(f"{source}: {error}")
            print(f"[WARN] {symbol} {source}: {error}")
    raise ValueError(f"{symbol} 无合格的已收盘日线: {'; '.join(failures)}")


def find_platforms(dates, closes, highs, lookback=250, bin_pct=0.02):
    """
    近1年价格密集成交区（日线震荡平台）。
    分箱（2%宽度）-> 统计天数 -> 合并相邻高密度bin -> 输出平台区间。
    """
    data = closes[-lookback:]
    dd = dates[-lookback:]
    if len(data) < 40:
        return []
    lo, hi = min(data), max(data)
    binw = (hi - lo) * bin_pct
    if binw <= 0:
        return []
    bins = {}
    for d, c in zip(dd, data):
        bi = int((c - lo) / binw)
        bins.setdefault(bi, []).append((d, c))
    n_bins = len(bins)
    avg = len(data) / max(n_bins, 1)
    # 高密度bin（天数 >= 平均的1.3倍）
    hot = sorted(bi for bi, v in bins.items() if len(v) >= avg * 1.3)
    if not hot:
        # 退一步：取天数 top 30% 的 bin
        ordered = sorted(bins, key=lambda b: -len(bins[b]))
        cut = max(2, int(n_bins * 0.3))
        hot = sorted(ordered[:cut])
    # 合并相邻（允许间隔1个bin）
    clusters, cur = [], []
    for bi in hot:
        if not cur or bi - cur[-1] <= 2:
            cur.append(bi)
        else:
            clusters.append(cur)
            cur = [bi]
    if cur:
        clusters.append(cur)
    result = []
    for cl in clusters:
        vals, dts = [], []
        for bi in range(min(cl), max(cl) + 1):
            for d, c in bins.get(bi, []):
                vals.append(c)
                dts.append(d)
        if len(vals) >= 8:
            result.append({
                "low": round(min(vals), 2),
                "high": round(max(vals), 2),
                "mid": round(sum(vals) / len(vals), 2),
                "days": len(vals),
                "first": min(dts),
                "last": max(dts),
            })
    result.sort(key=lambda x: (-x["days"], x["mid"]))
    return result[:4]


def zone_label(dd_pct):
    depth = abs(dd_pct)
    bounds = [(0.10, "回撤不足10%"), (0.20, "回撤10–20%"),
              (0.30, "回撤20–30%"), (0.40, "回撤30–40%"),
              (0.50, "回撤40–50%")]
    label = next((label for bound, label in bounds if depth < bound), "回撤50%以上")
    return label, "仅描述窗口高点回撤深度，不构成加仓或投资机会判断"


def max_hit_depth(levels):
    """当前已跌破的最深回撤档（正数，如 0.2）；未跌破任何档返回 0"""
    hit = [abs(l["d"]) for l in levels if l["hit"]]
    return max(hit) if hit else 0.0


def analyze(code, name, market, symbol, ccy, ath_start, now=None, previous=None, accept_source_change=False):
    approved_moves = load_reviewed_jumps().get(code)
    rows, source, basis, quality = fetch_daily(symbol, market, now, ath_start,
                                               approved_moves=approved_moves)
    if previous:
        changed = previous["source"] != source or previous.get("priceBasis") not in (None, basis)
        overlap = next((r for r in rows if r[0] == previous["asOf"]), None)
        if overlap is None:
            raise ValueError(f"{code} no overlapping baseline session")
        revision = abs(overlap[2] / previous["price"] - 1)
        if changed or revision > .005:
            if not accept_source_change:
                raise ValueError(f"{code} source/basis/revision requires review: {revision:.2%}")
            quality["sourceChangeAccepted"] = True
            quality["previousSource"] = previous["source"]
            quality["baselineRevision"] = revision
        if rows[-1][0] > previous["asOf"] and abs(rows[-1][2] / previous["price"] - 1) > .15:
            raise ValueError(f"{code} abnormal cross-run price move")
    dates = [r[0] for r in rows]
    opens = [r[1] for r in rows]
    closes = [r[2] for r in rows]
    highs = [r[3] for r in rows]
    lows = [r[4] for r in rows]

    price = round(closes[-1], 2)
    as_of = dates[-1]

    # ATH（盘中最高）
    ath_idx = max(range(len(highs)), key=lambda i: highs[i])
    ath = round(highs[ath_idx], 2)
    ath_date = dates[ath_idx]
    dd = round(price / ath - 1, 4)

    # 200日均线
    ma200 = round(sum(closes[-200:]) / 200, 2)
    ma200_dist = price / ma200 - 1

    # 回撤档位（从ATH）
    levels = []
    for d in (0.10, 0.20, 0.30, 0.40, 0.50):
        lvl = round(ath * (1 - d), 2)
        # distance：当前价到该档还需跌多少（正=还需下跌，负=已跌破）
        dist = lvl / price - 1
        levels.append({
            "d": round(-d, 2),
            "price": round(lvl, 2),
            "dist": round(dist, 4),
            "hit": price <= lvl,
        })

    # 平台
    plats = find_platforms(dates, closes, highs)
    for p in plats:
        if p["low"] <= price <= p["high"]:
            p["type"] = "current"
        elif p["high"] < price:
            p["type"] = "support"
        else:
            p["type"] = "resistance"
        p["dist"] = round(p["mid"] / price - 1, 4)  # 目标价相对当前价：负=需下跌到达，正=需上涨到达

    zname, zdesc = zone_label(dd)

    return {
        "code": code,
        "name": name,
        "market": market,
        "ccy": ccy,
        "source": source,
        "asOf": as_of,
        "price": round(price, 2),
        "peak": {"value": round(ath, 2), "date": ath_date,
                 "kind": "rolling_2000_sessions", "windowLimit": ATH_WINDOW,
                 "sampleSessions": len(rows), "windowStart": dates[0],
                 "windowEnd": dates[-1], "fullWindow": len(rows) == ATH_WINDOW,
                 "field": "intradayHigh"},
        "historicalATH": {"value": None, "reason": "未核验上市/发布以来完整同口径日线"},
        "priceBasis": basis, "quality": quality,
        "drawdown": round(dd, 4),
        "ma200": {"value": round(ma200, 2), "dist": round(ma200_dist, 4)},
        "levels": levels,
        "platforms": plats,
        "zone": zname,
        "zoneDesc": zdesc,
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--longbridge-input", help="fresh read-only Longbridge export JSON; no credentials")
    parser.add_argument("--accept-source-change", action="store_true",
                        help="review source/basis revisions, reset alert baseline")
    parser.add_argument("--ack", nargs="+", metavar="EVENT_ID",
                        help="acknowledge delivered outbox events; never sends messages")
    args = parser.parse_args()
    if args.longbridge_input:
        configure_snapshot(args.longbridge_input)
    root = Path(BASE)
    with refresh_lock(root):
        recover(root)
        if args.ack:
            acknowledge(root, args.ack)
            return
        previous, old_state = load_baseline(root)
        versions = file_versions(root)
        by_code = {r["code"]: r for r in previous["indices"]}
        now = utc_now()
        indices = []
        for target in TARGETS:
            code = target[0]
            result = analyze(*target, now=now, previous=by_code[code],
                             accept_source_change=args.accept_source_change)
            indices.append(result)
            print(f"[OK] {code} session={result['asOf']} source={result['source']}")
        payload = {
            "meta": {
                "schemaVersion": 2, "asOf": now.isoformat(),
                "generatedBy": "scripts/fetch_drawdown.py",
                "refreshCadence": "按需运行；实际定时任务需独立核验",
                "sources": {"US": "优先长桥；备用 Yahoo / AkShare 新浪；不补实时价",
                            "A": "优先长桥；备用腾讯 / AkShare 新浪；不补实时价"},
                "note": "窗口最多2000交易日；不足时明确标注。历史最高价未核验则为null。仅描述回撤深度，不自动判定投资机会。"
            },
            "indices": indices,
            "pipeline": build_pipeline(indices, previous, old_state, alerts_enabled=alerts_enabled(root)),
        }
        publish_local(root, payload, now=utc_now(), expected_files=versions)
        print(f"[COMMITTED LOCALLY] {len(indices)} indices; pending alerts="
              f"{len(payload['pipeline']['pendingAlerts'])}; no notification sent")


if __name__ == "__main__":
    main()

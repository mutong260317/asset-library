# -*- coding: utf-8 -*-
"""
宽基指数回撤分析 · 数据拉取与计算
============================================================
输出：drawdown.js（window.DRAWDOWN）
数据源：
  美股（QQQ/SPY/DIA/IWM）：Yahoo Finance chart API，range=5y
  A股（上证/沪深300/中证A500/创业板指/科创50）：腾讯 fqkline，约8年日线
计算：
  - ATH（历史最高，盘中high）与当前回撤
  - 从ATH回撤档位：-10/-20/-30/-40/-50%，及当前价距各档空间
  - 200日均线（SMA200）及当前价偏离
  - 日线震荡平台（近1年价格密集成交区，取中位数），标注当前/支撑/阻力
  - 加仓区间标签（美股20-30%为加仓区）
============================================================
"""
import os
import json
import time
import datetime as dt
import requests

UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}
RETRIES = 3

# 路径（脚本位于 <repo>/scripts/）
BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STATE_FILE = os.path.join(BASE, "scripts", "level_state.json")
ALERT_FILE = os.path.join(BASE, "scripts", "alerts.json")
# 回撤档位（正数=回撤深度）
LEVEL_DS = [0.10, 0.20, 0.30, 0.40, 0.50]
# ATH 统一窗口：最近 2000 个交易日（约 8 年）。
# 目的：①让不同数据源（腾讯约8年、AkShare全历史）口径一致；
# ②避免上证指数把 2007 年 6124 / 2015 年 5178 的极端泡沫当作锚点，
#   导致指数在这轮高点时仍显示"回撤30%"、择时信号永久失效。
ATH_WINDOW = 2000

# 标的定义：(展示代码, 名称, 市场, 数据源symbol, 币种, ATH起始日期)
# A股起始日期 = 指数实际发布/可投资起点（新发布指数不回溯到发布前的虚拟历史）；
# 美股起始日期为 None（滚动窗口，且美股长期创新高、近期高点即历史高点）。
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


def data_fresh(date_str, max_age_days=10):
    """数据最后日期是否在 max_age_days 内（防止备用源返回陈旧数据）"""
    try:
        d = dt.datetime.strptime(date_str, "%Y-%m-%d")
        return (dt.datetime.now() - d).days <= max_age_days
    except Exception:
        return False


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
    url = f"https://query1.finance.yahoo.com/v8/finance/chart/{symbol}?range=5y&interval=1d"
    j = http_get(url).json()
    res = j["chart"]["result"][0]
    ts = res["timestamp"]
    q = res["indicators"]["quote"][0]
    out = []
    for i, t in enumerate(ts):
        o, c, h, l = q["open"][i], q["close"][i], q["high"][i], q["low"][i]
        if c is None or h is None:
            continue
        d = dt.datetime.fromtimestamp(t, tz=dt.timezone.utc).strftime("%Y-%m-%d")
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
    """AkShare 新浪美股前复权日K，返回 list[(date, open, close, high, low)]"""
    import akshare as ak
    return _df_to_rows(ak.stock_us_daily(symbol=symbol, adjust="qfq"))


def fetch_a_akshare(symbol):
    """AkShare 新浪A股指数日K，返回 list[(date, open, close, high, low)]"""
    import akshare as ak
    return _df_to_rows(ak.stock_zh_index_daily(symbol=symbol))


def fetch_us(symbol):
    """美股：主 Yahoo，备 AkShare（新浪）；返回 (rows, source)"""
    try:
        rows = fetch_us_yahoo(symbol)
        if rows and data_fresh(rows[-1][0]):
            return rows, "Yahoo Finance"
        raise RuntimeError("Yahoo 数据缺失或陈旧")
    except Exception as e:
        print(f"[WARN] Yahoo {symbol} 失败：{repr(e)[:80]}，切换 AkShare")
    rows = fetch_us_akshare(symbol)
    if rows and data_fresh(rows[-1][0]):
        return rows, "AkShare(新浪)"
    raise RuntimeError(f"美股 {symbol} 所有数据源均失败或数据陈旧")


def fetch_a(symbol):
    """A股：主 腾讯，备 AkShare（新浪）；返回 (rows, source)"""
    try:
        rows = fetch_a_tencent(symbol)
        if rows and data_fresh(rows[-1][0]):
            return rows, "腾讯证券"
        raise RuntimeError("腾讯 数据缺失或陈旧")
    except Exception as e:
        print(f"[WARN] 腾讯 {symbol} 失败：{repr(e)[:80]}，切换 AkShare")
    rows = fetch_a_akshare(symbol)
    if rows and data_fresh(rows[-1][0]):
        return rows, "AkShare(新浪)"
    raise RuntimeError(f"A股 {symbol} 所有数据源均失败或数据陈旧")


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
    """根据当前回撤深度给出区间标签（dd_pct 为负数，如 -0.12）"""
    a = abs(dd_pct)
    if a < 0.10:
        return "高位区", "无回撤，不追高"
    if a < 0.20:
        return "浅回调", "关注，等更深回调"
    if a < 0.30:
        return "加仓区", "回撤20-30%，分批加仓窗口"
    if a < 0.40:
        return "深度机会", "回撤30-40%，重点加仓"
    if a < 0.50:
        return "极端区", "回撤40-50%，熊市机会"
    return "崩盘区", "回撤>50%，极端左侧"


def max_hit_depth(levels):
    """当前已跌破的最深回撤档（正数，如 0.2）；未跌破任何档返回 0"""
    hit = [abs(l["d"]) for l in levels if l["hit"]]
    return max(hit) if hit else 0.0


def load_state():
    """读取上一次各标的的最深回撤状态"""
    if os.path.exists(STATE_FILE):
        try:
            with open(STATE_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            return {}
    return {}


def analyze(code, name, market, symbol, ccy, ath_start):
    rows, source = fetch_us(symbol) if market == "US" else fetch_a(symbol)
    if not rows:
        return None
    # ATH 口径统一：①A股先剔除指数实际发布/可投资起点之前的回溯数据；
    # ②再统一截取最近 ATH_WINDOW（约8年）个交易日。
    # 这样无论数据源返回多长历史，ATH 都对应当前可交易周期的高点，不漂移。
    if ath_start:
        rows = [r for r in rows if r[0] >= ath_start]
    rows = rows[-ATH_WINDOW:]
    if not rows:
        return None
    dates = [r[0] for r in rows]
    opens = [r[1] for r in rows]
    closes = [r[2] for r in rows]
    highs = [r[3] for r in rows]
    lows = [r[4] for r in rows]

    price = closes[-1]
    as_of = dates[-1]

    # ATH（盘中最高）
    ath_idx = max(range(len(highs)), key=lambda i: highs[i])
    ath = highs[ath_idx]
    ath_date = dates[ath_idx]
    dd = price / ath - 1

    # 200日均线
    if len(closes) >= 200:
        ma200 = sum(closes[-200:]) / 200
        ma200_dist = price / ma200 - 1
    else:
        ma200 = sum(closes) / len(closes)
        ma200_dist = price / ma200 - 1

    # 回撤档位（从ATH）
    levels = []
    for d in (0.10, 0.20, 0.30, 0.40, 0.50):
        lvl = ath * (1 - d)
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
        "ath": {"value": round(ath, 2), "date": ath_date},
        "drawdown": round(dd, 4),
        "ma200": {"value": round(ma200, 2), "dist": round(ma200_dist, 4)},
        "levels": levels,
        "platforms": plats,
        "zone": zname,
        "zoneDesc": zdesc,
    }


def main():
    indices = []
    failures = []
    for code, name, market, symbol, ccy, ath_start in TARGETS:
        try:
            r = analyze(code, name, market, symbol, ccy, ath_start)
            if r:
                indices.append(r)
                print(f"[OK] {name:8s} {code:9s} price={r['price']:>9} "
                      f"dd={r['drawdown']*100:6.2f}% ma200={r['ma200']['value']:>9} "
                      f"plats={len(r['platforms'])} zone={r['zone']} src={r['source']}")
            else:
                failures.append((name, "无数据"))
        except Exception as e:
            print(f"[FAIL] {name} {code}: {repr(e)}")
            failures.append((name, repr(e)[:120]))

    # ===== 完整性闸：9 个标的必须全部成功，否则保留旧数据、明确失败（不覆盖、不更新状态）=====
    if len(indices) < len(TARGETS):
        print(f"\n[ABORT] 仅成功 {len(indices)}/{len(TARGETS)}，数据源不完整"
              f"（电脑刚唤醒/网络未就绪/代理未连？）。保留现有 drawdown.js，本轮不更新，"
              f"下次定时自动重试。失败明细：{failures}")
        raise SystemExit(1)

    # ===== 档位跨越检测（对比上一次状态）=====
    is_first_run = not os.path.exists(STATE_FILE)  # 首次运行只建基线，不追报历史回撤
    old_state = load_state()
    new_state = {}
    alerts = []
    for r in indices:
        code = r["code"]
        new_depth = max_hit_depth(r["levels"])
        old_depth = old_state.get(code, {}).get("maxHit", 0.0)
        new_state[code] = {"maxHit": new_depth, "asOf": r["asOf"]}
        if (not is_first_run) and new_depth > old_depth + 1e-9:
            # 新跌破了一个或多个档位
            for d in LEVEL_DS:
                if old_depth < d <= new_depth:
                    lvl_price = next(l["price"] for l in r["levels"]
                                     if abs(abs(l["d"]) - d) < 1e-9)
                    alerts.append({
                        "code": code,
                        "name": r["name"],
                        "market": r["market"],
                        "level": round(-d, 2),
                        "levelPrice": lvl_price,
                        "price": r["price"],
                        "drawdown": r["drawdown"],
                        "asOf": r["asOf"],
                        "zone": r["zone"],
                    })
                    print(f"[ALERT] {r['name']:8s} 新跌破 -{int(d*100)}% 档 "
                          f"现价 {r['price']}（{r['zone']}）")

    # 保存状态与提醒
    with open(STATE_FILE, "w", encoding="utf-8") as f:
        json.dump(new_state, f, ensure_ascii=False, indent=2)
    with open(ALERT_FILE, "w", encoding="utf-8") as f:
        json.dump({"asOf": dt.datetime.now().strftime("%Y-%m-%d %H:%M"),
                   "alerts": alerts}, f, ensure_ascii=False, indent=2)
    if is_first_run:
        print(f"\n首次运行：已建立回撤基线（历史回撤不追报，状态存 {os.path.basename(STATE_FILE)}）")
    else:
        print(f"\n档位提醒：{len(alerts)} 条（状态已存 {os.path.basename(STATE_FILE)}）")

    payload = {
        "meta": {
            "asOf": dt.datetime.now().strftime("%Y-%m-%d %H:%M"),
            "generatedBy": "scripts/fetch_drawdown.py",
            "refreshCadence": "每天",
            "sources": {
                "US": "主 Yahoo Finance chart API（5y日线），备 AkShare新浪 stock_us_daily",
                "A": "主 腾讯证券 fqkline（约8年日线），备 AkShare新浪 stock_zh_index_daily",
            },
            "note": "ATH 统一为最近约8年（2000交易日）且在指数实际发布/可投资起点之后的盘中最高（A股老指数从2018起、新指数从发布起，不回溯到2007/2015等历史泡沫，保证不同数据源口径一致）；回撤档位从ATH起算；平台为近1年日线密集成交区、取中位数；levels/platforms的dist为目标价相对当前价的涨跌幅（负=需下跌到达，正=需上涨到达）；ma200.dist为当前价相对均线的偏离；新跌破-10/-20/-30/-40/-50%档时自动飞书提醒。",
        },
        "indices": indices,
    }

    header = (
        "/* ============================================================\n"
        " * 宽基指数回撤分析数据（自动生成，请勿手改）\n"
        " * 生成脚本：scripts/fetch_drawdown.py\n"
        " * 刷新频率：每天 06:30（美股收盘后）、15:30（A股收盘后）\n"
        " * ============================================================ */\n"
    )
    body = "window.DRAWDOWN = " + json.dumps(payload, ensure_ascii=False, indent=2) + ";\n"
    out_path = os.path.join(BASE, "drawdown.js")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(header + body)
    print(f"WROTE {out_path}  ({len(indices)} indices)")


if __name__ == "__main__":
    main()

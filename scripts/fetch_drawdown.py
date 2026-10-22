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
import json
import time
import datetime as dt
import requests

UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}
RETRIES = 3

# 标的定义：(展示代码, 名称, 市场, 数据源symbol, 币种)
TARGETS = [
    ("QQQ", "纳斯达克100", "US", "QQQ", "USD"),
    ("SPY", "标普500", "US", "SPY", "USD"),
    ("DIA", "道琼斯工业", "US", "DIA", "USD"),
    ("IWM", "罗素2000", "US", "IWM", "USD"),
    ("SH000001", "上证指数", "A", "sh000001", "CNY"),
    ("SH000300", "沪深300", "A", "sh000300", "CNY"),
    ("SH000922", "中证A500", "A", "sh000922", "CNY"),
    ("SZ399006", "创业板指", "A", "sz399006", "CNY"),
    ("SH000688", "科创50", "A", "sh000688", "CNY"),
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


def fetch_us(symbol):
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


def fetch_a(symbol):
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


def analyze(code, name, market, symbol, ccy):
    rows = fetch_us(symbol) if market == "US" else fetch_a(symbol)
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
    for code, name, market, symbol, ccy in TARGETS:
        try:
            r = analyze(code, name, market, symbol, ccy)
            if r:
                indices.append(r)
                print(f"[OK] {name:8s} {code:9s} price={r['price']:>9} "
                      f"dd={r['drawdown']*100:6.2f}% ma200={r['ma200']['value']:>9} "
                      f"plats={len(r['platforms'])} zone={r['zone']}")
        except Exception as e:
            print(f"[FAIL] {name} {code}: {repr(e)}")

    payload = {
        "meta": {
            "asOf": dt.datetime.now().strftime("%Y-%m-%d %H:%M"),
            "generatedBy": "scripts/fetch_drawdown.py",
            "refreshCadence": "每3天",
            "sources": {
                "US": "Yahoo Finance chart API（5y日线）",
                "A": "腾讯证券 fqkline（约8年日线）",
            },
            "note": "ATH为拉取范围内盘中最高；回撤档位从ATH起算；平台为近1年日线密集成交区、取中位数；levels/platforms的dist为目标价相对当前价的涨跌幅（负=需下跌到达，正=需上涨到达）；ma200.dist为当前价相对均线的偏离。",
        },
        "indices": indices,
    }

    header = (
        "/* ============================================================\n"
        " * 宽基指数回撤分析数据（自动生成，请勿手改）\n"
        " * 生成脚本：scripts/fetch_drawdown.py\n"
        " * 刷新频率：每3天\n"
        " * ============================================================ */\n"
    )
    body = "window.DRAWDOWN = " + json.dumps(payload, ensure_ascii=False, indent=2) + ";\n"
    out_path = r"D:\ai\豆包\资产归类项目\drawdown.js"
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(header + body)
    print(f"\nWROTE {out_path}  ({len(indices)} indices)")


if __name__ == "__main__":
    main()

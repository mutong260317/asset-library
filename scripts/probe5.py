# -*- coding: utf-8 -*-
"""测试 Yahoo 统一拉取：4美股 + 5A股指数"""
import requests, time

UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}

def yahoo(sym, rng="5y"):
    url = f"https://query1.finance.yahoo.com/v8/finance/chart/{sym}?range={rng}&interval=1d"
    try:
        r = requests.get(url, timeout=20, headers=UA)
        j = r.json()
        res = j.get("chart", {}).get("result")
        if not res:
            return None, "no result"
        ts = res[0].get("timestamp", [])
        cl = res[0]["indicators"]["quote"][0]["close"]
        valid = [c for c in cl if c is not None]
        return (len(ts), len(valid), valid[0] if valid else None, valid[-1] if valid else None), None
    except Exception as e:
        return None, repr(e)

syms = [
    ("QQQ", "美股纳指100"), ("SPY", "美股标普500"), ("DIA", "美股道琼斯"), ("IWM", "美股罗素2000"),
    ("000001.SS", "上证指数"), ("000300.SS", "沪深300"), ("000922.SS", "中证A500"),
    ("399006.SZ", "创业板指"), ("000688.SS", "科创50"),
]
for sym, label in syms:
    t0 = time.time()
    info, err = yahoo(sym)
    if info:
        print(f"[OK] {label:10s} {sym:11s} bars={info[0]:4d} valid={info[1]:4d} first={info[2]:.2f} last={info[3]:.2f}  ({time.time()-t0:.1f}s)")
    else:
        print(f"[FAIL] {label:10s} {sym:11s} {err}")

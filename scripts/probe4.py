# -*- coding: utf-8 -*-
"""测试 Yahoo chart API / 新浪美股日K / Stooq长超时"""
import requests, json, time

UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}

def show(label, url, timeout=25, raw=False):
    print("=" * 70)
    print(label)
    t0 = time.time()
    try:
        r = requests.get(url, timeout=timeout, headers=UA)
        print("http", r.status_code, "len", len(r.text), "%.1fs" % (time.time()-t0))
        if raw:
            print("  head:", r.text[:300].replace("\n", " | "))
            return r.text
        # 尝试 yahoo json
        try:
            j = r.json()
            res = j.get("chart", {}).get("result")
            if res:
                ts = res[0].get("timestamp", [])
                q = res[0]["indicators"]["quote"][0]
                cl = q["close"]
                print("  yahoo bars:", len(ts), "first close:", cl[0], "last close:", cl[-1])
                return j
        except Exception:
            pass
        print("  head:", r.text[:300].replace("\n", " | "))
    except Exception as e:
        print("  ERROR:", repr(e))
    return None

# 1) Yahoo
show("Yahoo chart QQQ 5y",
     "https://query1.finance.yahoo.com/v8/finance/chart/QQQ?range=5y&interval=1d")
# 2) 新浪美股日K
show("Sina US daily QQQ",
     "https://stock.finance.sina.com.cn/usstock/api/jsonp.php/var%20_k=/US_MinKService.getDailyK?symbol=QQQ", raw=True)
# 3) Stooq 长超时
show("Stooq CSV 40s",
     "https://stooq.com/q/d/l/?s=qqq.us&i=d&d1=20210101&d2=20261021", timeout=40, raw=True)

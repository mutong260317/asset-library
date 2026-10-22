# -*- coding: utf-8 -*-
"""测试美股长历史接口：腾讯多个端点 + Stooq"""
import requests

UA = {"User-Agent": "Mozilla/5.0"}

def show(label, url, parser="tencent"):
    print("=" * 70)
    print(label)
    try:
        r = requests.get(url, timeout=20, headers=UA)
        print("http", r.status_code, "len", len(r.text))
        if parser == "tencent":
            try:
                j = r.json()
                d = j.get("data", {})
                for code, p in d.items():
                    if isinstance(p, dict):
                        print("  keys:", list(p.keys()))
                        for fld in ("day", "qfqday", "hfqday"):
                            if fld in p and p[fld]:
                                rows = p[fld]
                                print(f"  {fld}: n={len(rows)} first={rows[0][0]} last={rows[-1][0]} lastclose={rows[-1][2]}")
            except Exception as e:
                print("  not json / parse err:", repr(e), "| head:", r.text[:120])
        else:
            print("  head:", r.text[:200].replace("\n", " | "))
    except Exception as e:
        print("  ERROR:", repr(e))

# 1) kline/kline 带起始日期
show("Tencent /kline/kline 带start",
     "http://web.ifzq.gtimg.cn/appstock/app/kline/kline?param=usQQQ,day,2019-01-01,,1000,")
# 2) usKline 端点
show("Tencent /usKline/get",
     "http://web.ifzq.gtimg.cn/appstock/app/usKline/get?param=usQQQ,day,2019-01-01,,1000,")
# 3) usFqkline 端点
show("Tencent /usFqkline/get",
     "http://web.ifzq.gtimg.cn/appstock/app/usFqkline/get?param=usQQQ,day,2019-01-01,,1000,qfq")
# 4) kline/kline 带结束日期
show("Tencent /kline/kline 带start+end",
     "http://web.ifzq.gtimg.cn/appstock/app/kline/kline?param=usQQQ,day,2019-01-01,2026-10-21,1000")
# 5) Stooq CSV
show("Stooq CSV",
     "https://stooq.com/q/d/l/?s=qqq.us&i=d&d1=20190101&d2=20261021", parser="stooq")

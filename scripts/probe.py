# -*- coding: utf-8 -*-
"""探测腾讯历史K线接口对美股/A股指数的返回格式"""
import json
import requests

def probe(url, label):
    print("=" * 60)
    print(label, url)
    try:
        r = requests.get(url, timeout=15, headers={"User-Agent": "Mozilla/5.0"})
        print("http", r.status_code, "len", len(r.text))
        j = r.json()
        d = j.get("data", {})
        for code, payload in d.items():
            print("code:", code, "keys:", list(payload.keys()) if isinstance(payload, dict) else type(payload))
            if isinstance(payload, dict):
                for k in ("day", "qfqday", "hfqday"):
                    if k in payload:
                        rows = payload[k]
                        print("  field", k, "rows", len(rows))
                        print("  first:", rows[0])
                        print("  last :", rows[-1])
    except Exception as e:
        print("ERROR:", repr(e))

# 美股 QQQ
probe("http://web.ifzq.gtimg.cn/appstock/app/kline/kline?param=usQQQ,day,,,5,", "US QQQ")
# A股 上证指数
probe("http://web.ifzq.gtimg.cn/appstock/app/fqkline/get?param=sh000001,day,,,5,", "A 上证指数")
# A股 中证A500（000922）
probe("http://web.ifzq.gtimg.cn/appstock/app/fqkline/get?param=sh000922,day,,,5,", "A 中证A500")

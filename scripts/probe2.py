# -*- coding: utf-8 -*-
"""批量验证9个标的代码 + 测试美股长历史拉取"""
import requests

UA = {"User-Agent": "Mozilla/5.0"}

def fetch(code, start, n=1000):
    # 美股与A股统一用 fqkline 接口
    url = f"http://web.ifzq.gtimg.cn/appstock/app/fqkline/get?param={code},day,{start},,{n},qfq"
    r = requests.get(url, timeout=20, headers=UA)
    j = r.json()
    d = j.get("data", {})
    for k, p in d.items():
        if isinstance(p, dict):
            for fld in ("qfqday", "day"):
                if fld in p:
                    rows = p[fld]
                    return k, fld, rows
    return None, None, []

targets = [
    ("usQQQ", "2019-01-01", "美股 纳指100 QQQ"),
    ("usSPY", "2019-01-01", "美股 标普500 SPY"),
    ("usDIA", "2019-01-01", "美股 道琼斯 DIA"),
    ("usIWM", "2019-01-01", "美股 罗素2000 IWM"),
    ("sh000001", "2019-01-01", "A股 上证指数"),
    ("sh000300", "2019-01-01", "A股 沪深300"),
    ("sh000922", "2024-09-01", "A股 中证A500"),  # A500 2024年9月才发布
    ("sz399006", "2019-01-01", "A股 创业板指"),
    ("sh000688", "2019-12-01", "A股 科创50"),
]

for code, start, label in targets:
    k, fld, rows = fetch(code, start)
    if rows:
        print(f"[OK] {label:18s} {code:10s} fld={fld:6s} n={len(rows):4d}  {rows[0][0]} -> {rows[-1][0]}  lastclose={rows[-1][2]}")
    else:
        print(f"[FAIL] {label:18s} {code:10s} NO DATA")

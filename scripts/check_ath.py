# -*- coding: utf-8 -*-
import requests
for sym in ['sh000001', 'sh000300', 'sh000922', 'sz399006', 'sh000688']:
    r = requests.get(
        f'http://web.ifzq.gtimg.cn/appstock/app/fqkline/get?param={sym},day,2018-01-01,,2000,qfq',
        timeout=20, headers={'User-Agent': 'Mozilla/5.0'})
    p = r.json()['data'][sym]
    rows = p.get('day') or p.get('qfqday')
    hi = max(rows, key=lambda x: float(x[3]))
    cl = max(rows, key=lambda x: float(x[2]))
    print(sym, 'n=', len(rows),
          'ATHhigh=', hi[3], hi[0],
          '| ATHclose=', cl[2], cl[0],
          '| last=', rows[-1][2], rows[-1][0])

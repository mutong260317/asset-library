"""Inspect a read-only provider export; never update market/state/alert files."""
import argparse
import datetime as dt
import hashlib
import json
from pathlib import Path
from longbridge_source import rows_from_candles
from market_quality import checked_rows

def audit(path):
    raw=Path(path).read_bytes();snapshot=json.loads(raw)
    results=[]
    now=dt.datetime.fromisoformat(snapshot['observedAt'].replace('Z','+00:00'))
    for symbol,candles in snapshot['symbols'].items():
        row={'symbol':symbol,'receivedBars':len(candles),'status':'quarantined'}
        try:
            market='US' if symbol.endswith('.US') else 'A'
            _,quality=checked_rows(rows_from_candles(candles,market),market,now)
            row.update(status='checked',quality=quality)
        except Exception as error:row['reason']=str(error)
        results.append(row)
    return {'provider':snapshot['provider'],'observedAt':snapshot['observedAt'],
            'exportSHA256':hashlib.sha256(raw).hexdigest(),'symbols':results,
            'note':'Passing these checks is not an independent price audit. Quarantined series must not replace trusted data.'}

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('input');p.add_argument('--output');a=p.parse_args()
    report=json.dumps(audit(a.input),ensure_ascii=False,indent=2)+'\n'
    if a.output:Path(a.output).write_text(report,encoding='utf-8')
    print(report)

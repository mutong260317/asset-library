"""Refresh product close prices only. Never changes research dates/decisions/holdings."""
import argparse
import datetime as dt
import hashlib
import json
import os
from pathlib import Path
import re
import subprocess
import tempfile
from zoneinfo import ZoneInfo
from longbridge_source import (configure_snapshot, fetch_longbridge, fetch_product_candles,
                               product_symbol, rows_from_candles)
from market_quality import checked_rows,utc_now,last_closed_session
from refresh_store import atomic_text,refresh_lock

ROOT=Path(__file__).resolve().parents[1]

def asset_data(root):
    code="const {loadJS}=require('./validate-cli.js');console.log(JSON.stringify(loadJS(process.argv[1],'ASSETS')))"
    return json.loads(subprocess.check_output(['node','-e',code,str(root/'data.js')],cwd=root,encoding='utf-8'))

def _product_df_to_rows(df):
    """产品 DataFrame(date,open,high,low,close) -> (date,open,close,high,low)。"""
    out=[]
    for _,r in df.iterrows():
        d=r["date"]
        d=d.strftime("%Y-%m-%d") if hasattr(d,"strftime") else str(d)[:10]
        try:
            out.append((d,float(r["open"]),float(r["close"]),float(r["high"]),float(r["low"])))
        except Exception:
            continue
    return out


def fetch_price_rows(code,market,symbol,now,limit,provider):
    """Return checked close rows for the selected provider."""
    if provider=="akshare":
        import akshare as ak
        if market=="US":
            df=ak.stock_us_daily(symbol=code,adjust="")
        else:
            sina_symbol=("sh" if code.startswith("5") else "sz")+code
            df=ak.fund_etf_hist_sina(symbol=sina_symbol)
        all_rows=_product_df_to_rows(df)
        # Match the Longbridge recent window (last ~10 calendar days) so historical
        # splits, source gaps and old OHLC quirks cannot quarantine a current close.
        cutoff=(now.date()-dt.timedelta(days=10)).isoformat()
        raw=[r for r in all_rows if r[0]>=cutoff]
    else:
        raw=fetch_longbridge(symbol,market,now,recent=True)
    return checked_rows(raw,market,now,minimum_rows=1,max_daily_move=limit)


def refresh(root=ROOT, input_file=None, provider="longbridge", require_complete=False):
    if input_file and provider != "longbridge":
        raise ValueError('A Longbridge export cannot be used with a different provider')
    if input_file:configure_snapshot(input_file)
    with refresh_lock(root):
        if (root/'scripts/.refresh-transaction.json').exists():
            raise ValueError('Recover pending drawdown transaction before price refresh')
        A=asset_data(root);now=utc_now();prices=[];original=(root/'data.js').read_text(encoding='utf-8')
        source_name='Longbridge' if provider=='longbridge' else 'AkShare(新浪)'
        candles = fetch_product_candles(A['assets'], now) if provider == 'longbridge' and not input_file else [None] * len(A['assets'])
        for asset, bars in zip(A['assets'], candles):
            code=asset['c'];market=asset['m']
            symbol=code if market=='US' else ('sh' if code.startswith('5') else 'sz')+code
            item={'code':code,'symbol':product_symbol(code,market),'value':None,'asOf':None,
                  'source':None,'basis':'unadjusted','status':'unavailable'}
            try:
                # Leveraged ETF day moves require a different quarantine policy;
                # this is an engineering guard, not an investment risk limit.
                limit=.60 if asset['cat']=='杠杆' else .15
                if provider == 'longbridge' and not input_file:
                    rows,_=checked_rows(rows_from_candles(bars, market), market, now, minimum_rows=1, max_daily_move=limit)
                else:
                    rows,_=fetch_price_rows(code,market,symbol,now,limit,provider)
                item.update(value=rows[-1][2],asOf=rows[-1][0],source=source_name,status='checked')
                item['dailyMoveReviewLimit']=limit
            except Exception as error:item['reason']=str(error)
            prices.append(item)
        final_now=utc_now()
        for item,asset in zip(prices,A['assets']):
            if item['status']=='checked' and item['asOf']!=last_closed_session(asset['m'],final_now):
                item.update(value=None,asOf=None,source=None,status='unavailable',reason='session changed while fetching; retry')
        if not any(p['status']=='checked' for p in prices):raise ValueError('No verified product close prices; preserve data.js')
        if require_complete and any(p['status']!='checked' for p in prices):
            details = '; '.join(f"{p['code']}: {p['reason']}" for p in prices if p['status']!='checked')
            raise ValueError('Incomplete product closes; preserve data.js: ' + details)
        text=original
        for item in prices:
            code=item['code'];asset=next(x for x in A['assets'] if x['c']==code)
            fields={'price':item['value'],'priceAsOf':item['asOf'],'priceSource':item['source'],
                    'priceSymbol':item['symbol'],'priceBasis':item['basis'],'priceStatus':item['status']}
            literal=', '.join(k+': '+json.dumps(v,ensure_ascii=False,allow_nan=False) for k,v in fields.items())
            # Replace only this asset's price fields; research fields keep their original text.
            pattern=r'(    \{ c: "'+re.escape(code)+r'", n:[\s\S]*?signal:\s*\{[\s\S]*?)\bprice:\s*(?:null|-?\d+(?:\.\d+)?)(?:,\s*price(?:AsOf|Source|Symbol|Basis|Status):\s*(?:null|"[^"]*"))*'
            text,count=re.subn(pattern,lambda m:m[1]+literal,text,count=1)
            if count!=1:raise ValueError('Cannot locate unique price field: '+code)
        source_digest=hashlib.sha256(original.encode('utf-8')).hexdigest()
        local_stamp=now.astimezone(ZoneInfo('Asia/Shanghai')).strftime('%Y-%m-%dT%H%M%S')
        rel=f'snapshots/prices/{local_stamp}.json'
        meta={'marketUpdated':now.isoformat(),'marketSnapshot':rel,
              'marketPriceNote':'基金/ETF本身的未复权正式收盘价，研究日期与结论未更新；不与底层指数点位混用。'}
        for key,value in meta.items():
            line=key+': '+json.dumps(value,ensure_ascii=False)+','
            if re.search(r'\b'+key+r':',text):text=re.sub(r'\b'+key+r':\s*"[^"]*",',line,text,count=1)
            else:text=text.replace('  meta: {','  meta: {\n    '+line,1)
        (root/'.tmp').mkdir(exist_ok=True)
        with tempfile.TemporaryDirectory(dir=root/'.tmp') as directory:
            candidate=Path(directory)/'data.js';candidate.write_text(text,encoding='utf-8')
            check="const {loadJS}=require('./validate-cli.js');const v=require('./validate.js');const A=loadJS(process.argv[1],'ASSETS');const r=v.validateAssets(A);if(!r.ok)throw Error(r.errors.join(';'));console.log(JSON.stringify(A));"
            new=json.loads(subprocess.check_output(['node','-e',check,str(candidate)],cwd=root,encoding='utf-8'))
            for before,after in zip(A['assets'],new['assets']):
                for field in ('decision','ret','vd','hz'):
                    if before[field]!=after[field]:raise ValueError('Research decision changed unexpectedly')
                bs,ns=before['signal'].copy(),after['signal'].copy()
                for field in tuple(bs):
                    if field.startswith('price'):bs.pop(field)
                for field in tuple(ns):
                    if field.startswith('price'):ns.pop(field)
                if bs!=ns:raise ValueError('Non-price research signal changed')
            if A['meta']['updated']!=new['meta']['updated']:raise ValueError('Research date changed')
        if (root/'data.js').read_text(encoding='utf-8')!=original:raise ValueError('Concurrent data.js edit; abort')
        archive={'observedAt':now.isoformat(),'provider':source_name,'sourceDataSHA256':source_digest,
                 'researchAsOf':A['meta']['updated'],'prices':prices}
        (root/'snapshots/prices').mkdir(parents=True,exist_ok=True)
        target=root/rel
        if target.exists():raise ValueError('Snapshot filename already exists')
        target.write_text(json.dumps(archive,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
        atomic_text(root/'data.js',text)
        print(json.dumps({'checked':sum(p['status']=='checked' for p in prices),'total':len(prices),'snapshot':rel,'researchUnchanged':True},ensure_ascii=False))

if __name__=='__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('--longbridge-input')
    parser.add_argument('--provider',choices=['longbridge','akshare'],default='longbridge')
    parser.add_argument('--require-complete', action='store_true')
    args=parser.parse_args()
    refresh(input_file=args.longbridge_input,provider=args.provider,require_complete=args.require_complete)

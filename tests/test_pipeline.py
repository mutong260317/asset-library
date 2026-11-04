import datetime as dt
import json
from pathlib import Path
import sys
import tempfile
import unittest
import copy
import shutil
import subprocess
from unittest.mock import patch

ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'scripts'))
import market_quality as q
import refresh_store as store
import longbridge_source as lb
import fetch_drawdown as fetch
NOW=dt.datetime(2026,10,30,15,0,tzinfo=dt.timezone.utc)

def bars():
    cal,_=q.schedule('US',NOW)
    return [(d.date().isoformat(),100+i*.01,100+i*.01,105+i*.01,95+i*.01)
            for i,d in enumerate(cal.sessions_in_range('2025-01-01','2026-10-29')[-220:])]

def record(day='2026-10-28',price=95,source='Longbridge',peak=100):
    return dict(code='QQQ',name='QQQ',market='US',source=source,priceBasis='qfq',price=price,
                asOf=day,peak=dict(kind='rolling_2000_sessions',value=peak,date='2026-10-01'),
                quality=dict(status='checked'),drawdown=price/peak-1,zone='depth',
                levels=[dict(d=-d,price=peak*(1-d),hit=price<=peak*(1-d)) for d in (.1,.2,.3,.4,.5)])

class CalendarChecks(unittest.TestCase):
    def session(self,stamp):return q.last_closed_session('US',dt.datetime.fromisoformat(stamp))
    def test_regular_close_and_delay(self):
        for stamp,want in [('2026-10-30T19:59:00+00:00','2026-10-29'),('2026-10-30T20:19:00+00:00','2026-10-29'),('2026-10-30T20:21:00+00:00','2026-10-30')]:
            self.assertEqual(self.session(stamp),want)
    def test_daylight_saving(self):
        self.assertEqual(self.session('2026-03-06T20:30:00+00:00'),'2026-03-05')
        self.assertEqual(self.session('2026-03-09T20:30:00+00:00'),'2026-03-09')
    def test_holiday_and_early_close(self):
        self.assertEqual(self.session('2026-11-26T23:00:00+00:00'),'2026-11-25')
        self.assertEqual(self.session('2026-11-27T18:19:00+00:00'),'2026-11-25')
        self.assertEqual(self.session('2026-11-27T18:21:00+00:00'),'2026-11-27')
    def test_china_holiday(self):
        self.assertEqual(q.last_closed_session('A',dt.datetime.fromisoformat('2026-10-05T10:00:00+00:00')),'2026-09-30')
    def test_calendar_coverage_fail_closed(self):
        with self.assertRaises(Exception):q.last_closed_session('A',dt.datetime(2100,1,1,tzinfo=dt.timezone.utc))
    def test_filter_intraday(self):
        clean,quality=q.checked_rows(bars()+[('2026-10-30',100,100,105,95)],'US',NOW)
        self.assertEqual(clean[-1][0],'2026-10-29');self.assertEqual(quality['rows'],220)
    def test_bad_rows_rejected(self):
        r=bars()
        bad=[r[:-1],r[:100]+r[101:],r+[r[-1]],r[::-1],r[-199:]]
        bad += [r[:-1]+[(r[-1][0],*v)] for v in [(100,float('nan'),105,95),(100,0,105,95),(100,110,105,95),(200,200,205,195)]]
        bad += [r+[('2026-11-02',100,100,105,95)]]
        for rows in bad:
            with self.subTest(rows=len(rows)),self.assertRaises(ValueError):q.checked_rows(rows,'US',NOW)
    def test_timezone(self):
        c=[dict(timestamp='2026-10-29T16:00:00Z',open='10',close='11',high='12',low='9')]
        self.assertEqual(lb.rows_from_candles(c,'A')[0][0],'2026-10-30')
    def test_fallback_is_checked_without_realtime(self):
        with patch.object(fetch,'fetch_longbridge',side_effect=ValueError('offline')),patch.object(fetch,'fetch_us_yahoo',return_value=bars()[:-1]),patch.object(fetch,'fetch_us_akshare',return_value=bars()):
            r,s,_,_=fetch.fetch_daily('QQQ','US',NOW)
            self.assertEqual(s,'AkShare(新浪)');self.assertEqual(r[-1][0],'2026-10-29')
        self.assertFalse(hasattr(fetch,'fetch_us_tencent_latest'))
    def test_switch_requires_review(self):
        rows,evidence=q.checked_rows(bars(),'US',NOW)
        with patch.object(fetch,'fetch_daily',return_value=(rows,'new','qfq',evidence)),self.assertRaises(ValueError):
            fetch.analyze('QQQ','QQQ','US','QQQ','USD',None,now=NOW,previous=record())
    def test_old_intraday_cache_cannot_be_relabelled_after_close(self):
        snapshot=dict(provider='Longbridge',observedAt='2026-10-30T19:00:00+00:00',symbols={})
        with patch.object(lb,'SNAPSHOT',snapshot),self.assertRaisesRegex(ValueError,'before latest session'):
            lb.fetch_longbridge('QQQ','US',dt.datetime.fromisoformat('2026-10-30T20:30:00+00:00'))
    def test_leveraged_move_policy_and_invalid_ohlc(self):
        r=bars()[-3:];r[-1]=(r[-1][0],78,77,84,70)
        self.assertTrue(q.checked_rows(r,'US',NOW,minimum_rows=1,max_daily_move=.6)[0])
        with self.assertRaises(ValueError):q.checked_rows(r,'US',NOW,minimum_rows=1)
    def test_pre_calendar_rows_skipped(self):
        # 早于日历首交易日（2014-01-02）的早期数据应被跳过，而非触发 is_session 报错。
        old=[('2010-01-04',10,10,11,9)]+bars()
        clean,quality=q.checked_rows(old,'US',NOW)
        self.assertEqual(quality['rows'],220)
        self.assertGreaterEqual(clean[0][0],'2014-01-02')
    def test_non_session_inside_calendar_still_rejected(self):
        # 日历范围内的非交易日（2026-10-25 周日）仍须报错，不能被边界跳过掩盖。
        rows=[('2026-10-25',100,100,105,95),
              ('2026-10-28',100,100,105,95),
              ('2026-10-29',100,100,105,95)]
        with self.assertRaisesRegex(ValueError,'non-session'):q.checked_rows(rows,'US',NOW,minimum_rows=1)
    def _jump_rows(self):
        # 两个连续交易日，最后一天相对前一天 +16%，OHLC 自洽。
        return [('2026-10-28',100,100,101,99),
                ('2026-10-29',116,116,118,115)]
    def test_approved_jump_accepted(self):
        clean,quality=q.checked_rows(self._jump_rows(),'US',NOW,minimum_rows=1,
                                     approved_moves={'2026-10-29':0.16})
        self.assertEqual(quality['approvedJumps'],['2026-10-29'])
    def test_unapproved_or_mismatched_jump_rejected(self):
        rows=self._jump_rows()
        for approved in (None,{'2026-10-28':0.16},{'2026-10-29':0.10},{'2026-10-29':-0.16}):
            with self.subTest(approved=approved),self.assertRaises(ValueError):
                q.checked_rows(rows,'US',NOW,minimum_rows=1,approved_moves=approved)
    def test_load_reviewed_jumps(self):
        self.assertEqual(fetch.load_reviewed_jumps('nonexistent-xyz.json'),{})
        loaded=fetch.load_reviewed_jumps()
        self.assertEqual(loaded['SZ399006']['2024-09-30'],0.1536)
        self.assertEqual(len(loaded['SH000688']),2)

class AlertChecks(unittest.TestCase):
    def baseline(self):
        old=record();return {'indices':[old]},{'QQQ':dict(maxHit=0,asOf=old['asOf'])}
    def test_crossing_and_repeat(self):
        p,s=self.baseline();new=record('2026-10-29',75);pipe=store.build_pipeline([new],p,s)
        self.assertEqual(len(pipe['pendingAlerts']),2)
        repeated=store.build_pipeline([new],{'indices':[new],'pipeline':pipe},pipe['state'])
        self.assertEqual(repeated['pendingAlerts'],pipe['pendingAlerts'])
    def test_outbox_survives_price_recovery(self):
        p,s=self.baseline();new=record('2026-10-29',85);pipe=store.build_pipeline([new],p,s)
        p2=store.build_pipeline([record('2026-10-30',95)],{'indices':[new],'pipeline':pipe},pipe['state'])
        self.assertEqual(len(p2['pendingAlerts']),1)
    def test_source_and_anchor_change_reset(self):
        p,s=self.baseline()
        for new in (record('2026-10-29',75,source='new'),record('2026-10-29',75,peak=101)):
            self.assertEqual(store.build_pipeline([new],p,s)['pendingAlerts'],[])
        p['indices'][0].pop('peak')
        self.assertEqual(store.build_pipeline([record('2026-10-29',75)],p,s)['pendingAlerts'],[])
    def test_date_regression(self):
        p,s=self.baseline()
        with self.assertRaises(ValueError):store.build_pipeline([record('2026-10-27')],p,s)
    def test_snapshot_policy_suppresses_new_alerts(self):
        p,s=self.baseline()
        pipe=store.build_pipeline([record('2026-10-29',75)],p,s,alerts_enabled=False)
        self.assertEqual(pipe['pendingAlerts'],[])

class TransactionChecks(unittest.TestCase):
    def setUp(self):
        self.tmp=tempfile.TemporaryDirectory(dir=ROOT/'.tmp');self.root=Path(self.tmp.name);(self.root/'scripts').mkdir()
        for rel in ('validate-cli.js','validate.js'):shutil.copyfile(ROOT/rel,self.root/rel)
    def tearDown(self):self.tmp.cleanup()
    def journal(self):
        tx={rel:dict(beforeHash=None,after='new '+rel) for rel in store.FILES}
        (self.root/'scripts/.refresh-transaction.json').write_text(json.dumps(tx),encoding='utf-8');return tx
    def test_each_interruption_recovers(self):
        for count in range(4):
            tx=self.journal()
            for i,rel in enumerate(store.FILES):
                p=self.root/rel
                if p.exists():p.unlink()
                if i<count:p.write_text(tx[rel]['after'],encoding='utf-8')
            store.recover(self.root)
            for rel in store.FILES:self.assertEqual((self.root/rel).read_text(),tx[rel]['after'])
            self.assertFalse((self.root/'scripts/.refresh-transaction.json').exists())
    def test_external_edit_stops_recovery(self):
        self.journal();(self.root/'drawdown.js').write_text('external')
        with self.assertRaises(ValueError):store.recover(self.root)
        self.assertEqual((self.root/'drawdown.js').read_text(),'external')
    def test_concurrent_lock(self):
        with store.refresh_lock(self.root):
            with self.assertRaises(FileExistsError):
                with store.refresh_lock(self.root):pass
    def test_corrupt_state_not_first_run(self):
        (self.root/'drawdown.js').write_text('window.DRAWDOWN = {"indices": [{"code":"QQQ"}]};')
        for txt in ('{bad','{}'):
            (self.root/'scripts/level_state.json').write_text(txt)
            with self.assertRaises((ValueError,KeyError)):store.load_baseline(self.root)
    def test_failed_candidate_validation_preserves_all_files(self):
        shutil.copyfile(ROOT/'data.js',self.root/'data.js')
        for rel in store.FILES:(self.root/rel).write_text('old '+rel,encoding='utf-8')
        payload={'meta':{'asOf':NOW.isoformat()},'indices':[],
                 'pipeline':{'state':{},'pendingAlerts':[],'acknowledgedIds':[]}}
        with self.assertRaises(subprocess.CalledProcessError):
            store.publish_local(self.root,payload,require_fresh=False)
        for rel in store.FILES:self.assertEqual((self.root/rel).read_text(),'old '+rel)
        self.assertFalse((self.root/'scripts/.refresh-transaction.json').exists())
    def test_complete_bundle_and_acknowledgement(self):
        shutil.copyfile(ROOT/'data.js',self.root/'data.js')
        payload=copy.deepcopy(store.load_payload(ROOT))
        item=payload['indices'][0]
        event=dict(id='a'*24,code=item['code'],asOf=item['asOf'],level=-.1,
                   price=item['price'],levelPrice=item['levels'][0]['price'])
        payload['pipeline']['pendingAlerts']=[event]
        store.publish_local(self.root,payload,require_fresh=False)
        baseline,_=store.load_baseline(self.root)
        self.assertEqual(baseline['pipeline']['pendingAlerts'],[event])
        store.acknowledge(self.root,['a'*24]);store.acknowledge(self.root,['a'*24])
        baseline,_=store.load_baseline(self.root)
        self.assertEqual(baseline['pipeline']['pendingAlerts'],[])
        self.assertEqual(baseline['pipeline']['acknowledgedIds'],['a'*24])

if __name__=='__main__':unittest.main()

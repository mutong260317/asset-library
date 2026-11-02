"""One-time semantic migration, never a market refresh or a new price assertion."""
import copy
from pathlib import Path
from fetch_drawdown import zone_label
from market_quality import utc_now
from refresh_store import refresh_lock,recover,load_baseline,publish_local

def migrate(root):
    root=Path(root)
    with refresh_lock(root):
        recover(root)
        payload,state=load_baseline(root)
        if payload.get('pipeline'):
            raise ValueError('Already migrated; do not overwrite existing outbox')
        alert_file=root/'scripts/alerts.json'
        if alert_file.exists():
            import json
            if json.loads(alert_file.read_text(encoding='utf-8')).get('alerts'):
                raise ValueError('Legacy pending alerts need explicit migration; preserve file')
        for row in payload['indices']:
            anchor=row.pop('ath')
            anchor.update(kind='legacy_window_unverified',windowLimit=2000,
                          sampleSessions=None,windowStart=None,windowEnd=row['asOf'],
                          fullWindow=False,field='intradayHigh')
            row['peak']=anchor
            row['historicalATH']={'value':None,'reason':'旧快照缺少完整历史序列，无法核验真实ATH'}
            row['priceBasis']=None
            row['quality']={'status':'legacy_unverified','reason':'本轮仅修正口径标签，未重新拉取合格的完整日线'}
            row['zone'],row['zoneDesc']=zone_label(row['drawdown'])
        meta=payload['meta']
        meta.update(schemaVersion=2,migratedAt=utc_now().isoformat(),
                    refreshCadence='实际定时任务未核验；不承诺自动刷新',
                    sources={m:', '.join(sorted({r['source'] for r in payload['indices'] if r['market']==m})) for m in ('US','A')},
                    note='旧快照保留原价格/日期/档位，仅改正窗口高点和历史最高价的区别；尚未完成新日线核验。')
        payload['pipeline']={'state':copy.deepcopy(state),'pendingAlerts':[],'acknowledgedIds':[]}
        publish_local(root,payload,require_fresh=False)

if __name__=='__main__':migrate(Path(__file__).resolve().parents[1])

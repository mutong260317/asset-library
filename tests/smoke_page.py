"""Real browser smoke: served from localhost, no external requests, no deployment."""
from functools import partial
import http.server
import json
import re
from pathlib import Path
import threading
from urllib.parse import urlsplit
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'test-results';OUT.mkdir(exist_ok=True)

class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*args):pass

def run():
    server=http.server.ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)))
    thread=threading.Thread(target=server.serve_forever,daemon=True);thread.start()
    try:
        with sync_playwright() as p:
            browser=p.chromium.launch(channel='msedge',headless=True,args=['--disable-gpu'])
            context=browser.new_context()
            url=f'http://127.0.0.1:{server.server_port}/index.html'
            results=[]
            for width in (1440,768,390):
                page=context.new_page()
                page.set_viewport_size({'width':width,'height':1000})
                errors=[]
                page.on('pageerror',lambda e:errors.append(str(e)))
                page.on('console',lambda m:errors.append(m.text) if m.type=='error' else None)
                page.route('**/*',lambda route:route.continue_() if route.request.url.startswith(url.rsplit('/',1)[0]) or route.request.url.startswith('data:') else route.abort())
                page.route('**/api/quotes', lambda route: route.fulfill(json={
                    'observedAt':'2026-11-04T13:10:05Z', 'pollSeconds':15,
                    'quotes':[{'code':'SOXX', 'price':500.4, 'status':'recent', 'change':0.0123,
                               'session':'pre_market', 'timestamp':'2026-11-04T13:10:00Z'}]}))
                page.goto(url,wait_until='networkidle')
                assert page.evaluate('document.documentElement.scrollWidth') <= width+2
                assert page.locator('#stBadge').inner_text()=='✓ 结构校验通过'
                assert '研究日期' in page.locator('#updBadge').inner_text()
                assert '收盘快照采集于' in page.locator('#marketSnapshotAge').inner_text()
                for market in ('A', 'US'):
                    coverage = page.locator(f'[data-price-market="{market}"]')
                    assert coverage.is_visible()
                    assert '收盘快照覆盖' in coverage.locator('.l').inner_text()
                assert page.locator('#chartlist .li[data-cd]').count()==24
                assert page.locator('#chartlist').get_attribute('data-market')=='A'
                page.locator('#chartMarkets button[data-m="US"]').click()
                assert page.locator('#chartlist .li[data-cd]').count()==17
                assert page.locator('#chartlist').get_attribute('data-market')=='US'
                page.locator('#chartlist [data-cd="SOXX"]').click()
                assert 'SOXX.US' in page.locator('#detail').inner_text()
                assert page.locator('#detail').is_visible()
                assert '目标权重与当前动作分开记录' in page.locator('#detail').inner_text()
                page.keyboard.press('Escape')
                assert page.locator('#chartMarkets button[data-m="US"]').get_attribute('aria-pressed')=='true'
                page.locator('#chart').scroll_into_view_if_needed()
                point=page.evaluate('''() => {
                  const list=window.ASSETS.assets.filter(x=>x.m==='US');
                  const a=list.find(x=>list.filter(y=>x.signal.cyc===y.signal.cyc&&x.signal.val===y.signal.val).length===1);
                  const cv=document.querySelector('#chart');
                  return {code:a.c,name:a.n,x:52+a.signal.cyc/100*(cv.clientWidth-82),y:30+(100-a.signal.val)/100*(cv.clientHeight-76)};
                }''')
                box=page.locator('#chart').bounding_box()
                page.mouse.move(box['x']+point['x'],box['y']+point['y'])
                assert page.locator('#chartTip').is_visible()
                assert point['name'] in page.locator('#chartTip').inner_text()
                page.mouse.click(box['x']+point['x'],box['y']+point['y'])
                assert point['code'] in page.locator('#detail').inner_text()
                assert page.locator('#detailDialog').is_visible()
                page.locator('#detailClose').click()
                assert 'A 股含跨境 ETF' in page.locator('#chartMarketNote').inner_text()
                page.locator('#chartMarkets button[data-m="A"]').click()
                assert page.locator('#chartlist .li[data-cd]').count()==24
                page.locator('#chartlist [data-cd="159995"]').click()
                price=page.evaluate("window.ASSETS.assets.find(x=>x.c==='159995').signal.price")
                assert f'{price:.3f}' in page.locator('#detail').inner_text()
                page.locator('#detailClose').click()
                page.locator('#chartMarkets').locator('xpath=..').screenshot(path=str(OUT/f'chart-{width}.png'))
                page.evaluate('window.scrollTo(0,0)')
                page.screenshot(path=str(OUT/f'overview-{width}.png'),full_page=True)
                page.locator('#topnav [data-view="market"]').focus()
                page.keyboard.press('Enter')
                page.locator('#marketStatus').filter(has_text='有报价').wait_for()
                assert page.locator('#marketRows tr').count() == 24
                page.locator('#marketTabs button[data-m="US"]').click()
                assert page.locator('#marketRows tr').count() == 17
                page.locator('#marketSearch').fill('SOXX')
                quote_row = page.locator('#marketRows tr')
                assert quote_row.count() == 1
                assert '500.40' in quote_row.inner_text()
                assert '盘前' in quote_row.inner_text()
                quote_row.locator('button').click()
                assert page.locator('#detailDialog').is_visible()
                page.keyboard.press('Escape')
                assert page.evaluate('document.documentElement.scrollWidth') <= width+2
                assert page.locator('#topnav [data-view="market"]').get_attribute('aria-current') == 'page'
                page.screenshot(path=str(OUT/f'market-{width}.png'),full_page=True)
                page.locator('#topnav [data-view="drawdown"]').click()
                assert page.locator('#ddBox .dd-card').count()==9
                assert page.locator('#ddBox .dd-quarantined').count()==0
                assert page.locator('#ddBox .dd-ladder').count()==9
                assert page.evaluate("getComputedStyle(document.getElementById('releaseNotice')).display")=='none'
                assert page.evaluate('window.RELEASE_POLICY.drawdownAnalysisEnabled') is True
                assert page.evaluate('window.RELEASE_POLICY.drawdownAlertsEnabled') is False
                page.locator('#ddTabs [data-m="US"]').click()
                assert page.locator('#ddBox .dd-card').count()==4
                page.locator('#ddTabs [data-m="A"]').click()
                assert page.locator('#ddBox .dd-card').count()==5
                assert '每天15:40' not in page.locator('#ddMeta').inner_text()
                page.screenshot(path=str(OUT/f'drawdown-{width}.png'),full_page=True)
                page.locator('#topnav [data-view="assets"]').click()
                page.locator('#q').fill('SOXX')
                page.wait_for_timeout(250)
                assert page.locator('tbody tr[data-c="SOXX"]').count()==1
                page.locator('#q').fill('')
                page.locator('#fMarket').select_option('US')
                assert '17' in page.locator('#rowCount').inner_text()
                page.locator('#viewToggle [data-v="basic"]').click()
                page.locator('#tblHead [data-k="fee"]').focus()
                page.keyboard.press('Enter')
                assert page.locator('#tblHead [data-k="fee"]').get_attribute('aria-sort') == 'descending'
                page.locator('#fSort').select_option('fee')
                assert page.locator('#pager [data-p="next"]').is_enabled()
                page.locator('#pager [data-p="next"]').click()
                assert page.locator('#tbody tr').count() == 2
                page.locator('#q').fill('NO_SUCH_PRODUCT_123')
                assert '无匹配资产' in page.locator('#tbody').inner_text()
                page.locator('#q').fill('')
                page.locator('#fMarket').select_option('')
                page.locator('#fSort').select_option('code')
                page.go_back()
                page.locator('#view-drawdown').wait_for()
                page.locator('#topnav [data-view="allocation"]').click()
                assert page.locator('#cfgGrid .cfg-card').count() == 3
                page.locator('#cfgTabs [data-m="US"]').click()
                assert '成份股穿透暴露待核验' in page.locator('#pfCard').inner_text()
                checkbox = page.locator('#checklist input').first
                checkbox.check()
                page.reload(wait_until='networkidle')
                assert page.locator('#checklist input').first.is_checked()
                page.locator('#topnav [data-view="archive"]').click()
                reports=sorted((p.stem for p in (ROOT/'reports').glob('*.md') if re.fullmatch(r'\d{4}-W\d{2}',p.stem)),reverse=True)
                assert page.locator('#reportCatalog a').count() == len(reports)
                assert reports[0] in page.locator('#reportCatalog a').first.inner_text()
                page.locator('.wrp details').first.locator('summary').click()
                assert page.locator('.wrp details').first.get_attribute('open') == ''
                page.screenshot(path=str(OUT/f'archive-{width}.png'), full_page=True)
                assert page.evaluate('document.documentElement.scrollWidth') <= width+2
                assert not errors,errors
                results.append({'width':width,'errors':errors,'A':24,'US':17,'drawdown':9})
                page.close()
            page=context.new_page()
            page.route('**/data.js',lambda route:route.fulfill(status=200,body='/* unavailable */'))
            page.goto(url,wait_until='networkidle')
            assert '数据加载失败' in page.locator('#statbar').inner_text()
            results.append({'missingAssets':'visible error'})
            page.close()

            page = context.new_page()
            page.goto(url + '#assets', wait_until='networkidle')
            page.locator('#addDraftBtn').click()
            page.locator('#dfCode').fill('TESTX')
            page.locator('#dfMarket').select_option('US')
            payload = '<img src=x onerror="window.__injected=true">'
            page.locator('#dfName').fill(payload)
            page.locator('#dfCat').fill('<svg/onload=alert(1)>')
            page.locator('#dfSave').click()
            page.locator('#q').fill('TESTX')
            assert page.locator('#tbody tr').count() == 1
            assert payload in page.locator('#tbody').inner_text()
            assert page.locator('#tbody img,#tbody svg').count() == 0
            assert page.evaluate('window.__injected === undefined')
            page.reload(wait_until='networkidle')
            page.locator('#q').fill('TESTX')
            assert page.locator('#tbody tr.draft-row').count() == 1
            page.locator('#tbody .del-draft').click()
            assert '无匹配资产' in page.locator('#tbody').inner_text()
            results.append({'draftPersistenceAndInjection': 'stored as text, reload and delete verified'})
            page.close()

            page = context.new_page()
            page.route('**/data.js', lambda route: route.fulfill(
                content_type='application/javascript',
                body=(ROOT / 'data.js').read_text(encoding='utf-8') +
                     '\nwindow.ASSETS.assets[0].decision.w.y += 1;'))
            page.goto(url + '#allocation', wait_until='networkidle')
            assert '结构校验失败' in page.locator('#stBadge').inner_text()
            assert '101' in page.locator('#stErr').inner_text()
            assert page.locator('#cfgGrid .cfg-card').count() == 0
            assert not page.locator('#topnav').is_visible()
            results.append({'invalidWeights': 'views blocked including direct allocation link'})
            page.close()

            page = context.new_page()
            page.route('**/validate.js', lambda route: route.fulfill(
                content_type='application/javascript', body='/* unavailable */'))
            page.goto(url + '#assets', wait_until='networkidle')
            assert '校验器未加载' in page.locator('#stBadge').inner_text()
            assert not page.locator('#view-assets').is_visible()
            assert page.locator('#tbody tr').count() == 0
            results.append({'missingValidator': 'views blocked'})
            page.close()

            page = context.new_page()
            page.route('**/data.js', lambda route: route.fulfill(
                content_type='application/javascript',
                body=(ROOT / 'data.js').read_text(encoding='utf-8') + '''
                const assets = window.ASSETS.assets;
                const a = assets.filter(x => x.m === 'A');
                a.forEach(x => Object.assign(x.signal,
                    {priceStatus: 'checked', priceAsOf: '2026-10-30', price: 1,
                     priceSource: 'Smoke fixture', priceBasis: 'unadjusted',
                     priceSymbol: x.c + (x.c.startsWith('5') ? '.SH' : '.SZ')}));
                Object.assign(a[0].signal, {priceStatus: 'unavailable', price: null, priceAsOf: null});
                a[1].signal.priceAsOf = '2026-10-29';
                assets.filter(x => x.m === 'US').forEach(x => Object.assign(x.signal,
                    {priceStatus: 'unavailable', price: null, priceAsOf: null}));'''))
            page.goto(url, wait_until='networkidle')
            a_coverage = page.locator('[data-price-market="A"]')
            us_coverage = page.locator('[data-price-market="US"]')
            assert a_coverage.locator('.n').inner_text() == '23 / 24'
            assert a_coverage.locator('.s').inner_text() == '收盘日 2026-10-29 至 2026-10-30'
            assert us_coverage.locator('.n').inner_text() == '0 / 17'
            assert us_coverage.locator('.s').inner_text() == '无已核验价格'
            results.append({'mixedDatesAndMissingPrices': 'coverage and date range verified'})
            page.close()
            page=context.new_page()
            def static_public(route):
                rel=urlsplit(route.request.url).path.lstrip('/') or 'index.html'
                allowed=('index.html','data.js','drawdown.js','validate.js','release-policy.js','market-board.js','reports/catalog.js')
                assert rel in allowed, 'Unexpected public request: '+rel
                body = (ROOT/rel).read_bytes()
                if rel == 'data.js':
                    body += b'\nwindow.ASSETS.meta.marketUpdated = new Date(Date.now() - 5 * 86400000).toISOString();'
                route.fulfill(body=body,content_type='text/html' if rel.endswith('.html') else 'application/javascript')
            page.route('https://asset-library.example/**',static_public)
            page.goto('https://asset-library.example/#market',wait_until='networkidle')
            assert '公开站点' in page.locator('#marketStatus').inner_text()
            assert '已过 5 天' in page.locator('#marketStatus').inner_text()
            assert not page.locator('#marketRefresh').is_visible()
            assert page.locator('#marketRows tr').count()==24
            assert page.locator('#marketHead th').all_text_contents() == ['标的', '正式收盘价与交易日', '收盘价来源']
            page.locator('#marketTabs button[data-m="US"]').click()
            page.locator('#marketSearch').fill('SOXX')
            row = page.locator('#marketRows tr')
            assert row.count() == 1
            assert row.locator('td').count() == 3
            source = page.evaluate("window.ASSETS.assets.find(a => a.c === 'SOXX').signal.priceSource")
            assert row.locator('td').last.inner_text() == source
            page.set_viewport_size({'width':390,'height':850})
            assert page.evaluate('document.documentElement.scrollWidth') <= 392
            page.locator('#marketSearch').fill('NO_SUCH_PRODUCT_123')
            assert row.inner_text() == '没有匹配资产'
            assert row.locator('td').get_attribute('colspan') == '3'
            results.append({'publicMode':'close-only table, source, snapshot age, mobile search, no private quote requests'})
            browser.close()
            (OUT/'smoke.json').write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding='utf-8')
            print(json.dumps(results,ensure_ascii=False))
    finally:server.shutdown();server.server_close()

if __name__=='__main__':run()

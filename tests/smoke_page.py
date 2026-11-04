"""Real browser smoke: served from localhost, no external requests, no deployment."""
from functools import partial
import http.server
import json
from pathlib import Path
import threading
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
            url=f'http://127.0.0.1:{server.server_port}/index.html'
            results=[]
            for width in (1440,390):
                page=browser.new_page(viewport={'width':width,'height':1000})
                errors=[]
                page.on('pageerror',lambda e:errors.append(str(e)))
                page.on('console',lambda m:errors.append(m.text) if m.type=='error' else None)
                page.route('**/*',lambda route:route.continue_() if route.request.url.startswith(url.rsplit('/',1)[0]) or route.request.url.startswith('data:') else route.abort())
                page.goto(url,wait_until='networkidle')
                assert page.evaluate('document.documentElement.scrollWidth') <= width+2
                assert page.locator('#stBadge').inner_text()=='✓ 结构校验通过'
                assert '研究日期' in page.locator('#updBadge').inner_text()
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
                assert '目标权重与当前动作分开记录' in page.locator('#detail').inner_text()
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
                assert 'A 股含跨境 ETF' in page.locator('#chartMarketNote').inner_text()
                page.locator('#chartMarkets button[data-m="A"]').click()
                assert page.locator('#chartlist .li[data-cd]').count()==24
                page.locator('#chartlist [data-cd="159995"]').click()
                price=page.evaluate("window.ASSETS.assets.find(x=>x.c==='159995').signal.price")
                assert f'{price:.3f}' in page.locator('#detail').inner_text()
                page.locator('#chartMarkets').locator('xpath=..').screenshot(path=str(OUT/f'chart-{width}.png'))
                page.screenshot(path=str(OUT/f'overview-{width}.png'),full_page=True)
                page.locator('#topnav [data-view="drawdown"]').click()
                assert page.locator('#ddBox .dd-card').count()==9
                assert page.locator('#ddBox .dd-quarantined').count()==9
                assert page.locator('#ddBox .dd-ladder').count()==0
                assert '待重新核验' in page.locator('#releaseNotice').inner_text()
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
                assert not errors,errors
                results.append({'width':width,'errors':errors,'A':24,'US':17,'drawdown':9})
                page.close()
            page=browser.new_page()
            page.route('**/data.js',lambda route:route.fulfill(status=200,body='/* unavailable */'))
            page.goto(url,wait_until='networkidle')
            assert '数据加载失败' in page.locator('#statbar').inner_text()
            results.append({'missingAssets':'visible error'})
            page.close()

            page = browser.new_page()
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

            page = browser.new_page()
            page.route('**/validate.js', lambda route: route.fulfill(
                content_type='application/javascript', body='/* unavailable */'))
            page.goto(url + '#assets', wait_until='networkidle')
            assert '校验器未加载' in page.locator('#stBadge').inner_text()
            assert not page.locator('#view-assets').is_visible()
            assert page.locator('#tbody tr').count() == 0
            results.append({'missingValidator': 'views blocked'})
            page.close()

            page = browser.new_page()
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
            browser.close()
            (OUT/'smoke.json').write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding='utf-8')
            print(json.dumps(results,ensure_ascii=False))
    finally:server.shutdown();server.server_close()

if __name__=='__main__':run()

/* Private intraday quotes. The public static site displays only dated close snapshots. */
(function () {
  if (!document.body.classList.contains('assets-ready')) return;
  const assets = window.ASSETS.assets;
  const panel = document.getElementById('view-market');
  const board = document.getElementById('marketRows');
  const notice = document.getElementById('marketStatus');
  const tabs = document.getElementById('marketTabs');
  const filter = document.getElementById('marketSearch');
  const refresh = document.getElementById('marketRefresh');
  const local = location.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(location.hostname);
  const sessions = {regular: '常规', pre_market: '盘前', post_market: '盘后', overnight: '夜盘'};
  const statuses = {recent: '近 2 分钟', stale: '成交已过 2 分钟', last_quote: '最近一笔', restricted: '交易状态异常'};
  const priceFormat = {A: new Intl.NumberFormat('zh-CN', {minimumFractionDigits: 3, maximumFractionDigits: 4}),
    US: new Intl.NumberFormat('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 4})};
  const timeFormat = new Intl.DateTimeFormat('zh-CN', {timeZone: 'Asia/Shanghai',
    month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23'});
  let market = 'A';
  let response = null;
  let timer;
  let loading = false;
  let failed = false;

  function cell(row, text) {
    const td = row.insertCell();
    td.textContent = text;
    return td;
  }

  function draw() {
    const rows = assets.filter(a => a.m === market);
    const quotes = new Map((response?.quotes || []).map(q => [q.code, q]));
    const covered = rows.filter(a => quotes.get(a.c)?.price != null).length;
    const recent = rows.filter(a => quotes.get(a.c)?.status === 'recent').length;
    if (response) {
      notice.textContent = `长桥 · ${covered}/${rows.length} 有报价 · ${recent} 只近 2 分钟有成交 · ` +
        `抓取 ${timeFormat.format(new Date(response.observedAt))}（北京时间）`;
    } else if (local) {
      notice.textContent = failed ? '暂未收到长桥报价，当前只显示已有的正式收盘快照。' : '连接本机长桥行情，收盘快照可先查看。';
    } else {
      notice.textContent = '公开站点显示有日期的收盘快照。盘中报价可在本机版查看。';
    }
    board.replaceChildren();
    const query = filter.value.trim().toLowerCase();
    rows.filter(a => (a.c + ' ' + a.n).toLowerCase().includes(query)).forEach(a => {
      const q = quotes.get(a.c);
      const row = board.insertRow();
      const name = cell(row, a.n === a.c ? a.c : `${a.n} · ${a.c}`);
      name.className = 'market-name';
      cell(row, q?.price != null ? priceFormat[market].format(q.price) : '—');
      const change = q?.change;
      cell(row, change == null ? '—' : `${change > 0 ? '+' : ''}${(100 * change).toFixed(2)}%`);
      const when = q?.timestamp ? timeFormat.format(new Date(q.timestamp)) : '';
      cell(row, when ? `${sessions[q.session] || '—'} · ${when} · ${statuses[q.status] || '—'}` : '—');
      const s = a.signal;
      cell(row, s.priceStatus === 'checked' ? `${priceFormat[market].format(s.price)} · ${s.priceAsOf}` : '未知');
    });
    if (!board.rows.length) cell(board.insertRow(), '没有匹配资产').colSpan = 5;
  }

  function active() {
    return local && !document.hidden && panel.classList.contains('active');
  }

  async function poll() {
    clearTimeout(timer);
    if (!active() || loading) return;
    loading = true;
    refresh.disabled = true;
    try {
      const req = await fetch('/api/quotes', {cache: 'no-store', signal: AbortSignal.timeout(18000)});
      if (!req.ok) throw Error('quote service unavailable');
      response = await req.json();
      failed = false;
    } catch (_) {
      response = null;
      failed = true;
    } finally {
      loading = false;
      refresh.disabled = false;
      draw();
      if (active()) timer = setTimeout(poll, (response?.pollSeconds || 15) * 1000);
    }
  }

  refresh.hidden = !local;
  refresh.addEventListener('click', poll);
  filter.addEventListener('input', draw);
  tabs.addEventListener('click', function (event) {
    const button = event.target.closest('button[data-m]');
    if (!button) return;
    market = button.dataset.m;
    tabs.querySelectorAll('button').forEach(b => {
      b.classList.toggle('on', b === button);
      b.setAttribute('aria-pressed', String(b === button));
    });
    draw();
  });
  function visibilityChanged() {
    if (active()) poll();
    else clearTimeout(timer);
  }
  document.addEventListener('visibilitychange', visibilityChanged);
  window.addEventListener('asset-view', visibilityChanged);
  draw();
  visibilityChanged();
})();

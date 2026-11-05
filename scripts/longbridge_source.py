"""Read-only CLI adapter. Reuses CLI login; never reads/copies credentials."""
import datetime as dt
import json
import os
import shutil
import subprocess
import time
from zoneinfo import ZoneInfo

SNAPSHOT = None


def configure_snapshot(path):
    global SNAPSHOT
    from pathlib import Path
    SNAPSHOT = json.loads(Path(path).read_text(encoding="utf-8"))
    if SNAPSHOT.get("provider") != "Longbridge":
        raise ValueError("unexpected snapshot provider")


def canonical_symbol(symbol, market):
    if market == "US":
        return symbol + ".US"
    return symbol[2:] + (".SH" if symbol.startswith("sh") else ".SZ")


def product_symbol(code, market):
    return code + (".US" if market == "US" else ".SH" if code.startswith("5") else ".SZ")


def _read_rpc(method, params, timeout=75):
    exe = shutil.which("longbridge")
    if not exe:
        raise ValueError("Longbridge CLI unavailable; login/setup required")
    requests = [dict(jsonrpc="2.0", id=i, method=method, params=p) for i, p in enumerate(params)]
    env = dict(os.environ)
    env.setdefault("LONGBRIDGE_REGION", "global")
    try:
        output = subprocess.run([exe, "serve"], input="".join(json.dumps(r) + "\n" for r in requests),
                                capture_output=True, text=True, encoding="utf-8", timeout=timeout, env=env)
        if output.returncode:
            raise ValueError("Longbridge CLI request failed; check login/network/entitlement")
        messages = [json.loads(line) for line in output.stdout.splitlines() if line.strip()]
    except (subprocess.TimeoutExpired, UnicodeError, json.JSONDecodeError) as error:
        raise ValueError("Longbridge CLI raw quote request timed out or returned an invalid response") from error
    results = {m['id']: m.get('result') for m in messages if 'id' in m}
    return [results.get(i) for i in range(len(requests))]


def fetch_quotes(symbols):
    result, = _read_rpc("quote.quote", [{"symbols": symbols}], timeout=12)
    if not isinstance(result, list) or not result:
        raise ValueError("Longbridge returned no quotes")
    return result


def _history_request(symbol, start, end, adjust):
    return dict(symbol=symbol, period="day", adjust_type=adjust, start=start.isoformat(),
                end=end.isoformat(), trade_sessions="intraday")


def fetch_product_candles(assets, now):
    start = now.date() - dt.timedelta(days=10)
    requests = [_history_request(product_symbol(a['c'], a['m']), start, now.date(), "none")
                for a in assets]
    method = "quote.history_candlesticks_by_date"
    results = _read_rpc(method, requests)
    missing = [i for i, result in enumerate(results) if not result]
    # A large batch can hit the provider's rolling request limit. Preserve the
    # successes and retry only the failed requests once after the window clears.
    if missing and len(results) > 25:
        time.sleep(31)
        retry = _read_rpc(method, [requests[i] for i in missing])
        for i, result in zip(missing, retry):
            results[i] = result
    return results


def rows_from_candles(candles, market):
    if not isinstance(candles, list) or not candles:
        raise ValueError("Longbridge returned no candles")
    zone = ZoneInfo("America/New_York" if market == "US" else "Asia/Shanghai")
    out = []
    for c in candles:
        if isinstance(c, list):
            c = dict(zip(("timestamp", "open", "close", "high", "low"), c))
        if c.get("trade_session", "Intraday").lower() != "intraday":
            raise ValueError("unexpected extended-hours candle")
        timestamp = c["timestamp"]
        if isinstance(timestamp, (int, float)):
            stamp = dt.datetime.fromtimestamp(timestamp, dt.timezone.utc)
        else:
            stamp = dt.datetime.fromisoformat(timestamp.replace("Z", "+00:00"))
        if stamp.tzinfo is None:
            raise ValueError("Longbridge timestamp lacks timezone")
        day = stamp.astimezone(zone).date().isoformat()
        out.append((day, *(float(c[k]) for k in ("open", "close", "high", "low"))))
    return out


def fetch_longbridge(symbol, market, now=None, recent=False):
    if SNAPSHOT is not None:
        from market_quality import last_closed_session
        now = now or dt.datetime.now(dt.timezone.utc)
        observed = dt.datetime.fromisoformat(SNAPSHOT["observedAt"].replace("Z", "+00:00"))
        if observed.tzinfo is None or not dt.timedelta(0) <= now - observed <= dt.timedelta(hours=6):
            raise ValueError("imported Longbridge snapshot expired/future (six-hour limit)")
        if last_closed_session(market, observed) != last_closed_session(market, now):
            raise ValueError('snapshot was observed before latest session completed; cannot relabel intraday data as close')
        return rows_from_candles(SNAPSHOT["symbols"][canonical_symbol(symbol, market)], market)
    now = now or dt.datetime.now(dt.timezone.utc)
    start = now.date()-dt.timedelta(days=10) if recent else dt.date(now.year - 10, 1, 1)
    end = now.date()
    requests = []
    # Year-sized calls avoid silent per-request bar limits. No key in arguments.
    while start <= end:
        stop = min(dt.date(start.year, 12, 31), end)
        adjust = "forward" if market == "US" and not recent else "none"
        requests.append(_history_request(canonical_symbol(symbol, market), start, stop, adjust))
        start = stop + dt.timedelta(days=1)
    pages = _read_rpc("quote.history_candlesticks_by_date", requests)
    if any(not isinstance(page, list) for page in pages):
        raise ValueError("Longbridge daily history has a failed or missing page")
    return rows_from_candles([candle for page in pages for candle in page], market)

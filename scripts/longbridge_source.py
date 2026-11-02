"""Read-only CLI adapter. Reuses CLI login; never reads/copies credentials."""
import datetime as dt
import json
import os
import shutil
import subprocess
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
    exe = shutil.which("longbridge")
    if not exe:
        raise ValueError("Longbridge CLI unavailable; login/setup required")
    now = now or dt.datetime.now(dt.timezone.utc)
    start = now.date()-dt.timedelta(days=10) if recent else dt.date(now.year - 10, 1, 1)
    end = now.date()
    rows = []
    env = dict(os.environ)
    env.setdefault("LONGBRIDGE_REGION", "global")
    # Year-sized calls avoid silent per-request bar limits. No key in arguments.
    while start <= end:
        stop = min(dt.date(start.year, 12, 31), end)
        command = [exe, "kline", "history", canonical_symbol(symbol, market),
                   "--start", start.isoformat(), "--end", stop.isoformat(),
                   "--period", "day", "--adjust", "forward" if market == "US" else "none",
                   "--session", "intraday", "--format", "json"]
        result = subprocess.run(command, capture_output=True, text=True, encoding="utf-8",
                                timeout=60, env=env)
        if result.returncode:
            raise ValueError("Longbridge CLI request failed; check login/network/entitlement")
        try:
            candles = json.loads(result.stdout)
        except json.JSONDecodeError as error:
            raise ValueError("Longbridge CLI returned non-JSON response") from error
        if candles:
            rows += rows_from_candles(candles, market)
        start = stop + dt.timedelta(days=1)
    return rows

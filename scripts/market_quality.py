"""Calendar-based, fail-closed daily-bar checks. No network or writes here."""
import datetime as dt
import math
from functools import lru_cache

UTC = dt.timezone.utc
SETTLE_DELAY = dt.timedelta(minutes=20)
MAX_DAILY_MOVE = 0.15  # quarantine, not a claim that larger moves cannot occur
# A reviewed jump must match the recorded move (sign included) within this tolerance.
APPROVED_MOVE_TOLERANCE = 0.002


def utc_now():
    return dt.datetime.now(UTC)


@lru_cache(maxsize=8)
def calendar(market, year):
    import exchange_calendars as xc
    # XSHG also covers SZ equity-index session dates and regular close times.
    # The library deliberately refuses years beyond its holiday knowledge.
    return xc.get_calendar("XNYS" if market == "US" else "XSHG",
                           start=f"{year - 12}-01-01", end=f"{year}-12-31")


def schedule(market, now=None):
    now = now or utc_now()
    if now.tzinfo is None:
        raise ValueError("now must include timezone")
    cal = calendar(market, now.year)
    return cal, now.astimezone(UTC)


def last_closed_session(market, now=None):
    cal, now = schedule(market, now)
    cutoff = now - SETTLE_DELAY
    closes = cal.schedule["close"]
    closed = closes[closes <= cutoff]
    if closed.empty:
        raise ValueError("calendar has no completed session")
    return closed.index[-1].date().isoformat()


def checked_rows(rows, market, now=None, start=None, minimum_rows=200,
                 max_daily_move=MAX_DAILY_MOVE, approved_moves=None, split_ratios=None):
    """Only completed sessions, exactly latest closed session, no holes/NaNs/jumps."""
    cal, now = schedule(market, now)
    if not 1 <= minimum_rows <= 2000 or not 0 < max_daily_move < 1:
        raise ValueError('invalid validation policy')
    latest = last_closed_session(market, now)
    # Dates before the calendar's first session cannot be verified here and cannot
    # enter the final <=2000-session window, so skip them rather than fail.
    calendar_first = cal.first_session.date().isoformat()
    # Filtering stage: only date/order/calendar/close checks; numeric bar checks
    # run after the window is truncated so a bad bar outside the <=2000-session
    # window cannot block an in-window release.
    collected, seen = [], set()
    previous_date = None
    for row in rows:
        if len(row) != 5:
            raise ValueError("daily row must contain date/O/C/H/L")
        day = row[0]
        if dt.date.fromisoformat(day).isoformat() != day:
            raise ValueError("invalid ISO date")
        if previous_date is not None and day <= previous_date:
            raise ValueError("duplicate or unsorted daily bars")
        previous_date = day
        if day > now.date().isoformat():
            raise ValueError("future daily bar")
        if start and day < start:
            continue
        if day < calendar_first:
            continue
        if not cal.is_session(day):
            raise ValueError(f"non-session daily bar: {day}")
        # A valid date alone does not imply its session has closed.
        # Explicit tz_convert("UTC"): pandas 3.1 misreports a zoneinfo UTC
        # timestamp's offset as the system offset; normalize before comparing.
        if cal.session_close(day).tz_convert("UTC").to_pydatetime() + SETTLE_DELAY > now:
            continue
        seen.add(day)
        collected.append(tuple(row))
    if not collected or collected[-1][0] != latest:
        raise ValueError(f"stale data: expected {latest}, got {collected[-1][0] if collected else None}")
    out = collected[-2000:]
    if len(out) < minimum_rows:
        raise ValueError(f"less than {minimum_rows} daily bars; requested metric unavailable")
    expected_sessions = [d.date().isoformat() for d in cal.sessions_in_range(out[0][0], latest)]
    if [r[0] for r in out] != expected_sessions:
        raise ValueError("missing trading sessions in analysis window")
    for row in out:
        day = row[0]
        values = row[1:]
        if any(isinstance(v, bool) or not isinstance(v, (int, float)) or
               not math.isfinite(v) or v <= 0 for v in values):
            raise ValueError(f"invalid OHLC: {day}")
        o, c, h, low = values
        if not low <= min(o, c) <= max(o, c) <= h:
            raise ValueError(f"inconsistent OHLC: {day}")
    approved = approved_moves or {}
    approved_jumps = []
    for prev, cur in zip(out, out[1:]):
        ratio = (split_ratios or {}).get(cur[0], 1)
        if isinstance(ratio, bool) or not isinstance(ratio, (int,float)) or not math.isfinite(ratio) or ratio <= 0:
            raise ValueError('invalid reviewed split ratio')
        move = cur[2] * ratio / prev[2] - 1
        if abs(move) > max_daily_move:
            approved_move = approved.get(cur[0])
            if approved_move is None or abs(move - approved_move) > APPROVED_MOVE_TOLERANCE:
                raise ValueError(f"abnormal daily move at {cur[0]}; review adjustment/source")
            approved_jumps.append(cur[0])
    return out, {"status": "checked", "expectedSession": latest,
                 "calendar": cal.name, "settlementDelayMinutes": 20,
                 "observedAt": now.isoformat(), "rows": len(out),
                 "start": out[0][0], "end": out[-1][0],
                 "approvedJumps": approved_jumps,
                 "reviewedSplits": [r[0] for r in out[1:] if r[0] in (split_ratios or {})]}

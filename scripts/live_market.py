"""Loopback-only Asset Library preview with a private, read-only Longbridge feed."""
import argparse
import datetime as dt
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
import json
from math import isfinite
from pathlib import Path
from threading import Lock
from time import monotonic
from urllib.parse import urlsplit

from longbridge_source import fetch_quotes, product_symbol
from market_quality import calendar, utc_now
from refresh_asset_prices import asset_data

ROOT = Path(__file__).resolve().parents[1]
STATIC = {"/": "index.html", "/index.html": "index.html", "/data.js": "data.js",
          "/validate.js": "validate.js", "/drawdown.js": "drawdown.js",
          "/release-policy.js": "release-policy.js", "/market-board.js": "market-board.js"}
POLL_SECONDS = 15
FRESH_SECONDS = 120


def normalize_quotes(assets, quotes, observed):
    by_symbol = {q["symbol"]: q for q in quotes}
    market_open = {m: calendar(m, observed.year).is_open_on_minute(observed.replace(second=0, microsecond=0))
                   for m in ("A", "US")}
    result = []
    for asset in assets:
        symbol = product_symbol(asset["c"], asset["m"])
        row = {"code": asset["c"], "market": asset["m"], "symbol": symbol,
               "status": "unavailable", "price": None, "change": None, "timestamp": None, "session": None}
        quote = by_symbol.get(symbol, {})
        candidates = []
        sessions = [("regular", quote)]
        if asset["m"] == "US":
            sessions.extend((key, quote.get(key + "_quote")) for key in ("pre_market", "post_market", "overnight"))
        for session, q in sessions:
            if not q:
                continue
            try:
                price = float(q["last_done"])
                stamp = dt.datetime.fromisoformat(q["timestamp"].replace("Z", "+00:00"))
                age = (observed - stamp).total_seconds()
                if not isfinite(price) or price <= 0 or age < -5:
                    raise ValueError("invalid quote")
                candidates.append((stamp, session, price, q, age))
            except (AttributeError, KeyError, TypeError, ValueError, OverflowError):
                continue
        if candidates:
            stamp, session, price, q, age = max(candidates, key=lambda x: x[0])
            prev = q.get("prev_close")
            try:
                prev = float(prev)
            except (TypeError, ValueError):
                prev = 0
            change = price / prev - 1 if isfinite(prev) and prev > 0 else None
            status = "recent" if age <= FRESH_SECONDS else "stale" if market_open[asset["m"]] else "last_quote"
            if quote.get("trade_status") not in ("Normal", 0):
                status = "restricted"
            row.update(status=status, price=price, timestamp=stamp.isoformat(), session=session,
                       change=change if change is not None and isfinite(change) else None)
        result.append(row)
    return {"source": "Longbridge OpenAPI", "observedAt": observed.isoformat(),
            "pollSeconds": POLL_SECONDS, "marketsOpen": market_open, "quotes": result}


class QuoteFeed:
    def __init__(self, assets):
        self.assets = assets
        self.lock = Lock()
        self.cached = None
        self.fetched_at = float("-inf")

    def snapshot(self):
        with self.lock:
            if monotonic() - self.fetched_at >= POLL_SECONDS:
                try:
                    symbols = [product_symbol(a["c"], a["m"]) for a in self.assets]
                    quotes = fetch_quotes(symbols)
                    self.cached = normalize_quotes(self.assets, quotes, utc_now())
                except Exception:
                    self.cached = None
                finally:
                    self.fetched_at = monotonic()
            return self.cached


def make_server(root, port, feed):
    class Handler(BaseHTTPRequestHandler):
        def do_GET(self):
            if self.headers.get("Host") not in (f"127.0.0.1:{self.server.server_port}",
                                                 f"localhost:{self.server.server_port}"):
                self.send_error(403)
                return
            path = urlsplit(self.path).path
            if path == "/api/quotes":
                if self.headers.get("Sec-Fetch-Site") not in (None, "same-origin", "none"):
                    self.send_error(403)
                    return
                data = feed.snapshot()
                if data is None:
                    self.reply(503, b'{"error":"quote_source_unavailable"}', "application/json")
                    return
                self.reply(200, json.dumps(data, allow_nan=False).encode(), "application/json")
                return
            file = STATIC.get(path)
            if file is None:
                self.send_error(404)
                return
            try:
                content = (root / file).read_bytes()
            except FileNotFoundError:
                self.send_error(404)
                return
            self.reply(200, content, "text/html" if file.endswith(".html") else "text/javascript")

        def reply(self, status, content, mime):
            self.send_response(status)
            self.send_header("Content-Type", f"{mime}; charset=utf-8")
            self.send_header("Cache-Control", "no-store")
            self.send_header("X-Content-Type-Options", "nosniff")
            self.send_header("Content-Length", str(len(content)))
            self.end_headers()
            self.wfile.write(content)

        def log_message(self, _format, *_args):
            pass

    return ThreadingHTTPServer(("127.0.0.1", port), Handler)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--port", type=int, default=8765)
    args = parser.parse_args()
    with make_server(ROOT, args.port, QuoteFeed(asset_data(ROOT)["assets"])) as server:
        print(f"http://127.0.0.1:{server.server_port}/", flush=True)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            pass

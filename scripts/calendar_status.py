import datetime as dt
import json
import sys
from market_quality import last_closed_session

if __name__ == "__main__":
    now = dt.datetime.fromisoformat(sys.argv[1].replace("Z", "+00:00"))
    print(json.dumps({market: last_closed_session(market, now) for market in ("US", "A")}))

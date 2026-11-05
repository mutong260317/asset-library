import datetime as dt
import json
from pathlib import Path
import sys
from tempfile import TemporaryDirectory
import unittest
from unittest.mock import Mock, patch

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))

from live_market import normalize_quotes
from longbridge_source import fetch_product_candles
from send_feishu import Feishu, deliver


class QuoteChecks(unittest.TestCase):
    def test_extended_quote_does_not_replace_close_and_stale_is_visible(self):
        now = dt.datetime.fromisoformat("2026-11-04T14:41:00+00:00")
        assets = [{"c": "QQQ", "m": "US"}, {"c": "SPY", "m": "US"}, {"c": "510300", "m": "A"}]
        quotes = [{"symbol": "QQQ.US", "last_done": "80", "prev_close": "79", "trade_status": "Normal",
                   "timestamp": "2026-11-03T21:00:00Z", "pre_market_quote": {
                       "last_done": "81", "prev_close": "80", "timestamp": "2026-11-04T14:29:00Z"}},
                  {"symbol": "SPY.US", "last_done": "92", "prev_close": "91", "trade_status": "Normal",
                   "timestamp": "2026-11-04T14:40:57Z"}]
        result = normalize_quotes(assets, quotes, now)
        self.assertTrue(result["marketsOpen"]["US"])
        self.assertEqual([q["status"] for q in result["quotes"]], ["stale", "recent", "unavailable"])
        self.assertEqual(result["quotes"][0]["session"], "pre_market")
        self.assertEqual(result["quotes"][0]["price"], 81)
        self.assertIsNone(result["quotes"][2]["price"])

    @patch("longbridge_source.time.sleep")
    @patch("longbridge_source._read_rpc")
    def test_large_daily_batch_retries_only_missing_unadjusted_products(self, read, sleep):
        assets = [{"c": f"ETF{i}", "m": "US"} for i in range(27)]
        read.side_effect = [[["ok"]] * 26 + [None], [["recovered"]]]
        now = dt.datetime.fromisoformat("2026-11-04T12:00:00+00:00")
        results = fetch_product_candles(assets, now)
        self.assertEqual(results[-1], ["recovered"])
        self.assertEqual(len(read.call_args_list[1].args[1]), 1)
        self.assertEqual(read.call_args_list[1].args[1][0]["adjust_type"], "none")
        sleep.assert_called_once()


class FeishuChecks(unittest.TestCase):
    def test_persisted_uuid_and_text_reused_and_delivery_needs_id(self):
        now = dt.datetime.fromisoformat("2026-11-04T12:00:00+00:00")
        with TemporaryDirectory() as directory:
            ledger = Path(directory) / "feishu.json"
            client = Mock(destination="approved-chat")
            client.send.side_effect = [TimeoutError, "om_confirmed"]
            with self.assertRaises(TimeoutError):
                deliver(client, ledger, "W44", "original", now)
            self.assertNotIn("messageId", json.loads(ledger.read_text())["W44"])
            self.assertEqual(deliver(client, ledger, "W44", "edited", now), "om_confirmed")
            self.assertEqual(client.send.call_args_list[0], client.send.call_args_list[1])
            self.assertEqual(deliver(client, ledger, "W44", "original", now), "om_confirmed")
            self.assertEqual(client.send.call_count, 2)

    def test_ambiguous_old_delivery_does_not_resend(self):
        now = dt.datetime.fromisoformat("2026-11-04T12:00:00+00:00")
        with TemporaryDirectory() as directory:
            ledger = Path(directory) / "feishu.json"
            client = Mock(destination="approved-chat")
            client.send.side_effect = TimeoutError
            with self.assertRaises(TimeoutError):
                deliver(client, ledger, "W44", "original", now)
            with self.assertRaisesRegex(ValueError, "outside the safe retry window"):
                deliver(client, ledger, "W44", "original", now + dt.timedelta(hours=1))
            self.assertEqual(client.send.call_count, 1)

    @patch.object(Feishu, "post")
    def test_ok_without_message_id_is_unconfirmed(self, post):
        client = Feishu({"ASSET_FEISHU_APP_ID": "test", "ASSET_FEISHU_APP_SECRET": "fixture",
                         "ASSET_FEISHU_RECEIVE_ID": "oc_test"})
        post.side_effect = [{"tenant_access_token": "fixture"}, {"code": 0, "data": {}}]
        with self.assertRaisesRegex(ValueError, "message_id"):
            client.send("preview", "stable-id")

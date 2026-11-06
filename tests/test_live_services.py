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
from longbridge_source import fetch_product_candles, fetch_quotes
from send_feishu import Feishu, deliver
from market_quality import checked_rows


class QuoteChecks(unittest.TestCase):
    def test_reviewed_split_preserves_raw_close_and_still_checks_market_move(self):
        rows=[('2026-11-04',450.0,450.0,451.0,449.0),('2026-11-05',149.0,148.0,150.0,147.0)]
        now=dt.datetime.fromisoformat('2026-11-06T12:00:00+00:00')
        with self.assertRaises(ValueError):checked_rows(rows,'US',now,minimum_rows=1)
        accepted,quality=checked_rows(rows,'US',now,minimum_rows=1,split_ratios={'2026-11-05':3})
        self.assertEqual(accepted[-1][2],148.0)
        self.assertEqual(quality['reviewedSplits'],['2026-11-05'])
        with self.assertRaises(ValueError):checked_rows(rows,'US',now,minimum_rows=1,split_ratios={'2026-11-05':2})
    @patch('longbridge_source.shutil.which', return_value='longbridge')
    @patch('longbridge_source.subprocess.run')
    @patch.dict('os.environ', {'LONGBRIDGE_REGION': 'global'})
    def test_connection_failure_retries_same_read_on_official_cn_route(self, run, _which):
        run.side_effect=[Mock(returncode=1,stderr='client error (Connect)'),
                         Mock(returncode=0,stdout='{"id":0,"result":[{"symbol":"QQQ.US"}]}\n')]
        self.assertEqual(fetch_quotes(['QQQ.US']),[{'symbol':'QQQ.US'}])
        self.assertEqual(run.call_args_list[0].kwargs['input'],run.call_args_list[1].kwargs['input'])
        self.assertEqual(run.call_args_list[1].kwargs['env']['LONGBRIDGE_REGION'],'cn')
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
        with TemporaryDirectory(dir=ROOT / '.tmp') as directory:
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
        with TemporaryDirectory(dir=ROOT / '.tmp') as directory:
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

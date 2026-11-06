"""Preview or explicitly send Asset Library reports through a configured Feishu bot."""
import argparse
import datetime as dt
import json
import os
from pathlib import Path
import re
import subprocess
import sys
import uuid

import requests

from market_quality import last_closed_session, utc_now
from refresh_asset_prices import asset_data
from refresh_store import acknowledge, atomic_text, digest, encoded, load_baseline, recover, refresh_lock
from release_policy import alerts_enabled

ROOT = Path(__file__).resolve().parents[1]
API = "https://open.feishu.cn/open-apis"
SITE = "https://mutong260317.github.io/asset-library/"
RETRY_LIMIT = dt.timedelta(minutes=45)


class Feishu:
    def __init__(self, env=os.environ, config=None):
        config = config or {}
        prefix = config.get('envPrefix', 'ASSET_FEISHU')
        if not re.fullmatch(r'[A-Z][A-Z0-9_]*', prefix):
            raise ValueError('Invalid credential environment prefix')
        self.app_id = env.get(prefix + "_APP_ID", "")
        self.secret = env.get(prefix + "_APP_SECRET", "")
        self.recipient = env.get("ASSET_FEISHU_RECEIVE_ID", "") or config.get('receiveId', '')
        if not self.app_id or not self.secret or not re.fullmatch(r"(?:ou|oc)_[a-zA-Z0-9]+", self.recipient):
            raise ValueError("Set the three ASSET_FEISHU_* variables for the Asset Library bot and approved recipient")
        self.receive_type = "chat_id" if self.recipient.startswith("oc_") else "open_id"
        self.destination = digest(self.app_id + ":" + self.recipient)
        self.token = None

    @staticmethod
    def post(path, payload, **kwargs):
        response = requests.post(API + path, json=payload, timeout=15, allow_redirects=False, **kwargs)
        if not response.ok or response.is_redirect:
            raise ValueError(f"Feishu HTTP status {response.status_code}")
        result = response.json()
        if type(result.get("code")) is not int or result["code"] != 0:
            raise ValueError(f"Feishu rejected the request (code {result.get('code')!s})")
        return result

    def send(self, message, message_uuid):
        if self.token is None:
            auth = self.post("/auth/v3/tenant_access_token/internal",
                             {"app_id": self.app_id, "app_secret": self.secret})
            self.token = auth.get("tenant_access_token")
            if not self.token:
                raise ValueError("Feishu authentication did not return a token")
        result = self.post("/im/v1/messages", {
            "receive_id": self.recipient, "msg_type": "text", "uuid": message_uuid,
            "content": json.dumps({"text": message}, ensure_ascii=False),
        }, params={"receive_id_type": self.receive_type}, headers={"Authorization": "Bearer " + self.token})
        message_id = result.get("data", {}).get("message_id")
        if not isinstance(message_id, str) or not message_id.startswith("om_"):
            raise ValueError("Feishu did not return a message_id; delivery remains unconfirmed")
        return message_id


def deliver(client, ledger, key, text, now):
    records = json.loads(ledger.read_text(encoding="utf-8")) if ledger.exists() else {}
    prior = records.get(key)
    if prior is not None:
        if prior['destination'] != client.destination:
            raise ValueError("Delivery destination changed; reconcile this event before sending")
        if prior.get("messageId"):
            return prior["messageId"]
        age = now - dt.datetime.fromisoformat(prior["startedAt"])
        if not dt.timedelta(0) <= age < RETRY_LIMIT:
            raise ValueError("Unconfirmed Feishu delivery is outside the safe retry window; verify the chat")
    else:
        prior = {"destination": client.destination, "startedAt": now.isoformat(),
                 "uuid": str(uuid.uuid4()), "message": text}
        records[key] = prior
        ledger.parent.mkdir(parents=True, exist_ok=True)
        atomic_text(ledger, encoded(records))
    message_id = client.send(prior["message"], prior["uuid"])
    prior["messageId"] = message_id
    atomic_text(ledger, encoded(records))
    return message_id


def report_messages(root, mode, now):
    if mode == "test":
        key = "test-" + now.astimezone(dt.timezone(dt.timedelta(hours=8))).date().isoformat()
        text = ("【资产库验收测试】\n机器人发送链路测试。收到本条消息后，维护程序将核对飞书回执。\n"
                "本轮页面与行情优化正在本地验收，发布进度以交接记录为准。\n" + SITE)
        return [(key, text, None)]
    if mode == "weekly":
        assets = asset_data(root)
        meta = assets["meta"]
        key = f"weekly-{meta['updated'][:4]}-{meta['week']}"
        message = [f"资产库研究周报 · {meta['week']} · 研究日期 {meta['updated']}"]
        message += [f"{x['k']} · {x['v']}" for x in assets.get("summary", [])]
        message += ["研究快照，请以页面披露的日期和口径为准。", SITE]
        return [(key, "\n\n".join(message), None)]

    if not alerts_enabled(root):
        raise ValueError("Drawdown alerts are disabled by the release policy")
    current, _ = load_baseline(root)
    closed = {m: last_closed_session(m, now) for m in ("A", "US")}
    messages = []
    for event in current["pipeline"]["pendingAlerts"]:
        if event["asOf"] != closed[event["market"]]:
            continue
        message = (f"资产库收盘回撤提醒 · {event['name']} ({event['code']})\n"
                   f"交易日 {event['asOf']} · 收盘 {event['price']} · 触及 {event['level']:.0%} 档\n"
                   f"距窗口高点 {event['drawdown']:.2%}。档位描述价格状态。\n"
                   f"事件 {event['id']}\n{SITE}#drawdown")
        messages.append(("drawdown-" + event["id"], message, event["id"]))
    return messages


def run(root, mode, send):
    with refresh_lock(root):
        if send:
            recover(root)
        elif (root / "scripts/.refresh-transaction.json").exists():
            raise ValueError("Finish the pending market transaction before previewing")
        now = utc_now()
        command = ["node", "validate-cli.js", "--now", now.isoformat()]
        if mode == "drawdown":
            command.append("--publish")
        env = {**os.environ, "ASSET_PYTHON": sys.executable}
        subprocess.run(command, cwd=root, env=env, check=True, stdout=subprocess.DEVNULL)
        messages = report_messages(root, mode, now)
        if not messages:
            print("No current Feishu messages")
            return
        if not send:
            print("\n\n".join(text for _, text, _ in messages))
            return
        config_file = root / '.local/feishu-config.json'
        config = json.loads(config_file.read_text(encoding='utf-8')) if config_file.exists() else None
        client = Feishu(config=config)
        ledger = root / ".local/feishu-delivery.json"
        for key, text, event_id in messages:
            message_id = deliver(client, ledger, key, text, utc_now())
            if event_id:
                acknowledge(root, [event_id])
            print(f"Delivered {key} · message_id={message_id}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("mode", choices=("test", "weekly", "drawdown"))
    parser.add_argument("--send", action="store_true", help="send to the configured Feishu recipient")
    args = parser.parse_args()
    run(ROOT, args.mode, args.send)

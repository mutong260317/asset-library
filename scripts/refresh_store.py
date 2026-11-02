"""Recoverable local commit + durable alert outbox. Never sends notifications."""
import contextlib
import datetime as dt
import hashlib
import json
import os
from pathlib import Path
import re
import shutil
import subprocess
import tempfile

FILES = ("drawdown.js", "scripts/level_state.json", "scripts/alerts.json")
DEPTHS = (0, .1, .2, .3, .4, .5)


def encoded(value):
    return json.dumps(value, ensure_ascii=False, indent=2, allow_nan=False) + "\n"


def digest(text):
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def file_versions(root):
    return {rel: digest((Path(root)/rel).read_text(encoding='utf-8')) if (Path(root)/rel).exists() else None
            for rel in (*FILES, 'data.js')}


def load_payload(root):
    text = (Path(root) / "drawdown.js").read_text(encoding="utf-8")
    match = re.search(r"window\.DRAWDOWN\s*=\s*(\{.*\})\s*;\s*$", text, re.S)
    if not match:
        raise ValueError("drawdown.js is not a complete JSON assignment")
    return json.loads(match[1])


@contextlib.contextmanager
def refresh_lock(root):
    path = Path(root) / "scripts/.refresh.lock"
    # Do not guess whether another process is alive or remove its lock.
    fd = os.open(path, os.O_CREAT | os.O_EXCL | os.O_WRONLY)
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as f:
            f.write(encoded({"pid": os.getpid(), "startedAt": dt.datetime.now(dt.timezone.utc).isoformat()}))
        yield
    finally:
        path.unlink()


def atomic_text(path, text):
    path = Path(path)
    fd, temp = tempfile.mkstemp(prefix=".stage-", dir=path.parent)
    try:
        with os.fdopen(fd, "w", encoding="utf-8", newline="\n") as f:
            f.write(text)
            f.flush()
            os.fsync(f.fileno())
        os.replace(temp, path)
    finally:
        if os.path.exists(temp):
            os.unlink(temp)


def recover(root):
    """Roll forward only a fully validated transaction; refuse concurrent edits."""
    root = Path(root)
    journal = root / "scripts/.refresh-transaction.json"
    if not journal.exists():
        return
    txn = json.loads(journal.read_text(encoding="utf-8"))
    if set(txn) != set(FILES):
        raise ValueError("invalid transaction file set")
    # Check all files before changing any of them.
    for rel, item in txn.items():
        path = root / rel
        current = path.read_text(encoding="utf-8") if path.exists() else None
        if current != item["after"] and (digest(current) if current is not None else None) != item["beforeHash"]:
            raise ValueError(f"transaction conflict: {rel}; preserve files for review")
    for rel, item in txn.items():
        atomic_text(root / rel, item["after"])
    journal.unlink()


def load_baseline(root):
    root = Path(root)
    payload = load_payload(root)
    state = json.loads((root / "scripts/level_state.json").read_text(encoding="utf-8"))
    codes = {r["code"] for r in payload["indices"]}
    pipeline = payload.get("pipeline")
    if pipeline:
        if state != {"generationId": payload["meta"]["generationId"], "indices": pipeline["state"]}:
            raise ValueError("state/data generation mismatch")
        state = pipeline["state"]
    if set(state) != codes:
        raise ValueError("missing/extra baseline symbols; do not treat as first run")
    for r in payload["indices"]:
        old = state[r["code"]]
        depth = max([abs(l["d"]) for l in r["levels"] if l["hit"]] or [0])
        if old.get("maxHit") not in DEPTHS or old.get("asOf") != r["asOf"] or abs(old["maxHit"] - depth) > 1e-9:
            raise ValueError("invalid or inconsistent baseline state")
    return payload, state


def build_pipeline(indices, previous, old_state, alerts_enabled=True):
    old_indices = {r["code"]: r for r in previous["indices"]}
    old_pipeline = previous.get("pipeline", {})
    pending = list(old_pipeline.get("pendingAlerts", []))
    acknowledged = list(old_pipeline.get("acknowledgedIds", []))
    known = {a["id"] for a in pending} | set(acknowledged)
    state = {}
    for r in indices:
        code = r["code"]
        old = old_indices[code]
        before = old_state[code]
        if r["asOf"] < before["asOf"]:
            raise ValueError(f"date regression: {code}")
        depth = max([abs(l["d"]) for l in r["levels"] if l["hit"]] or [0])
        peak = r["peak"]
        old_peak = old.get("peak", {})
        # Window roll-off, adjustment/source changes and migration are baselines,
        # not market drawdowns. Same-session revisions cannot generate alerts.
        comparable = (old_peak.get("kind") == peak["kind"] and
                      old_peak.get("value") == peak["value"] and
                      old_peak.get("date") == peak["date"] and
                      old.get("priceBasis") == r["priceBasis"] and
                      old["source"] == r["source"] and
                      old.get("quality", {}).get("status") == "checked" and
                      not r.get("quality", {}).get("sourceChangeAccepted", False))
        state[code] = {"maxHit": depth, "asOf": r["asOf"]}
        if alerts_enabled and comparable and r["asOf"] > before["asOf"] and depth > before["maxHit"]:
            for level in r["levels"]:
                if before["maxHit"] < abs(level["d"]) <= depth:
                    event = {"code": code, "name": r["name"], "market": r["market"],
                             "level": level["d"], "levelPrice": level["price"],
                             "price": r["price"], "drawdown": r["drawdown"],
                             "asOf": r["asOf"], "zone": r["zone"], "peak": peak}
                    event["id"] = digest(json.dumps(event, sort_keys=True, ensure_ascii=False))[:24]
                    if event["id"] not in known:
                        pending.append(event)
                        known.add(event["id"])
    return {"state": state, "pendingAlerts": pending, "acknowledgedIds": acknowledged}


def publish_local(root, payload, now=None, require_fresh=True, expected_files=None):
    """Validate staged bytes before touching outputs. No Git/remote writes."""
    root = Path(root)
    expected_files = expected_files or file_versions(root)
    payload["meta"].pop("generationId", None)
    generation = digest(encoded(payload))[:24]
    payload["meta"]["generationId"] = generation
    values = {
        "drawdown.js": "/* Generated snapshot; state/outbox are embedded as authority. */\nwindow.DRAWDOWN = " + encoded(payload).rstrip() + ";\n",
        "scripts/level_state.json": encoded({"generationId": generation, "indices": payload["pipeline"]["state"]}),
        "scripts/alerts.json": encoded({"generationId": generation, "alerts": payload["pipeline"]["pendingAlerts"]}),
    }
    tmp = root / ".tmp"
    tmp.mkdir(exist_ok=True)
    with tempfile.TemporaryDirectory(dir=tmp) as stage:
        stage = Path(stage)
        (stage / "scripts").mkdir()
        shutil.copyfile(root / "data.js", stage / "data.js")
        for rel, content in values.items():
            (stage / rel).write_text(content, encoding="utf-8")
        command = ["node", str(root / "validate-cli.js"), "--root", str(stage)]
        if require_fresh:
            command.append("--publish")
        if now:
            command += ["--now", now.isoformat()]
        subprocess.run(command, check=True, cwd=root)
    if file_versions(root) != expected_files:
        raise ValueError('Concurrent edit while generating/validating; preserve files')
    txn = {}
    for rel, content in values.items():
        path = root / rel
        before = path.read_text(encoding="utf-8") if path.exists() else None
        txn[rel] = {"beforeHash": digest(before) if before is not None else None, "after": content}
    atomic_text(root / "scripts/.refresh-transaction.json", encoded(txn))
    recover(root)


def acknowledge(root, ids):
    versions = file_versions(root)
    previous, _ = load_baseline(root)
    queue = previous.get("pipeline", {}).get("pendingAlerts", [])
    known = {a["id"] for a in queue}
    acknowledged = set(previous.get('pipeline', {}).get('acknowledgedIds', []))
    if not set(ids) <= known | acknowledged:
        raise ValueError("unknown pending event id")
    if set(ids) <= acknowledged:
        return  # acknowledgement retries are idempotent
    previous["pipeline"]["pendingAlerts"] = [a for a in queue if a["id"] not in ids]
    previous["pipeline"]["acknowledgedIds"] += [i for i in ids if i not in previous["pipeline"]["acknowledgedIds"]]
    publish_local(root, previous, require_fresh=False, expected_files=versions)

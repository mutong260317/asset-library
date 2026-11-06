"""Stage all product closes and broad-index analysis, validate, then optionally apply locally."""
import argparse
import json
import os
from pathlib import Path
import shutil
import subprocess
import sys

from market_quality import utc_now
from refresh_asset_prices import asset_data
from refresh_store import encoded, file_versions, load_payload, publish_local, recover, refresh_lock

ROOT = Path(__file__).resolve().parents[1]


def refresh(root=ROOT, provider='longbridge', accept_source_change=False, apply=False):
    now = utc_now()
    stamp = now.strftime('%Y%m%dT%H%M%S%fZ')
    stage = root / '.local/candidates' / stamp
    stage.mkdir(parents=True)
    with refresh_lock(root):
        recover(root)
        versions = file_versions(root)
        for name in ('data.js', 'drawdown.js', 'validate.js', 'validate-cli.js', 'release-policy.js'):
            shutil.copyfile(root / name, stage / name)
        (stage / 'scripts').mkdir()
        for script in (root / 'scripts').glob('*.py'):
            shutil.copyfile(script, stage / 'scripts' / script.name)
        for name in ('level_state.json', 'reviewed_jumps.json', 'reviewed_splits.json'):
            shutil.copyfile(root / 'scripts' / name, stage / 'scripts' / name)
    env = {**os.environ, 'ASSET_PYTHON': sys.executable, 'PYTHONIOENCODING': 'utf-8'}
    receipt = {'startedAt': now.isoformat(), 'provider': provider, 'applied': False,
               'sourceChangeAccepted': accept_source_change}
    try:
        commands = [
            [sys.executable, 'scripts/refresh_asset_prices.py', '--provider', provider, '--require-complete'],
            [sys.executable, 'scripts/fetch_drawdown.py'] + (['--accept-source-change'] if accept_source_change else []),
            ['node', 'validate-cli.js', '--publish'],
        ]
        for command in commands:
            result = subprocess.run(command, cwd=stage, env=env, stdout=subprocess.PIPE,
                                    stderr=subprocess.STDOUT, encoding='utf-8', timeout=900)
            with (stage / 'verification.log').open('a', encoding='utf-8') as log:
                log.write(' '.join(command[1:]) + '\n' + result.stdout + '\n')
            if result.returncode:
                raise ValueError(f'{Path(command[1]).name} failed; see {stage / "verification.log"}')
        candidate = load_payload(stage)
        receipt['status'] = 'checked'
        receipt['sessions'] = {x['code']: x['asOf'] for x in candidate['indices']}
        if apply:
            assets = asset_data(stage)
            rel = Path(assets['meta']['marketSnapshot'])
            if len(rel.parts) != 3 or rel.parts[:2] != ('snapshots', 'prices') or rel.suffix != '.json':
                raise ValueError('Invalid product archive path')
            with refresh_lock(root):
                if file_versions(root) != versions:
                    raise ValueError('Project market files changed during staging; keep candidate for review')
                recover(root)
                destination = root / rel
                destination.parent.mkdir(parents=True, exist_ok=True)
                with destination.open('x', encoding='utf-8') as out:
                    out.write((stage / rel).read_text(encoding='utf-8'))
                publish_local(root, candidate, now=utc_now(), expected_files=versions,
                              asset_text=(stage / 'data.js').read_text(encoding='utf-8'))
            receipt['applied'] = True
        print(json.dumps(receipt, ensure_ascii=False))
        return stage
    except Exception:
        receipt['status'] = 'failed'
        raise
    finally:
        receipt['finishedAt'] = utc_now().isoformat()
        (stage / 'receipt.json').write_text(encoded(receipt), encoding='utf-8')
        print(f'Candidate saved at {stage}', flush=True)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--provider', choices=('longbridge', 'akshare'), default='longbridge')
    parser.add_argument('--accept-source-change', action='store_true')
    parser.add_argument('--apply', action='store_true', help='apply a complete verified bundle locally')
    args = parser.parse_args()
    refresh(provider=args.provider, accept_source_change=args.accept_source_change, apply=args.apply)

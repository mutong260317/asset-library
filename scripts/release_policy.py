"""Read the shared website policy without evaluating JavaScript."""
import json
from pathlib import Path
import re

def alerts_enabled(root):
    text=(Path(root)/'release-policy.js').read_text(encoding='utf-8')
    match=re.search(r'window\.RELEASE_POLICY\s*=\s*(\{.*\})\s*;',text,re.S)
    if not match:raise ValueError('Missing release policy')
    policy=json.loads(match[1])
    if policy.get('schemaVersion')!=1 or type(policy.get('drawdownAlertsEnabled')) is not bool:
        raise ValueError('Invalid release policy')
    if policy.get('mode')=='snapshot' and policy['drawdownAlertsEnabled']:
        raise ValueError('Snapshot releases cannot enable drawdown alerts')
    return policy['drawdownAlertsEnabled']

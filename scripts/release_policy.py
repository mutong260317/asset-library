"""Read the shared website policy without evaluating JavaScript."""
import json
from pathlib import Path
import re

def alerts_enabled(root):
    text=(Path(root)/'release-policy.js').read_text(encoding='utf-8')
    match=re.search(r'window\.RELEASE_POLICY\s*=\s*(\{.*\})\s*;',text,re.S)
    if not match:raise ValueError('Missing release policy')
    policy=json.loads(match[1])
    if (policy.get('schemaVersion')!=1 or type(policy.get('drawdownAlertsEnabled')) is not bool or
            policy.get('mode') not in ('snapshot', 'live')):
        raise ValueError('Invalid release policy')
    if policy['drawdownAlertsEnabled'] and (policy['mode']!='live' or
                                           policy.get('drawdownAnalysisEnabled') is not True):
        raise ValueError('Drawdown alerts require live mode with analysis enabled')
    return policy['drawdownAlertsEnabled']

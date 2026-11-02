"use strict";
const {loadJS}=require('../validate-cli.js'),path=require('node:path');
function audit(root=path.resolve(__dirname,'..')){
  const A=loadJS(path.join(root,'data.js'),'ASSETS');
  return {researchAsOf:A.meta.updated,marketObservedAt:A.meta.marketUpdated||null,total:A.assets.length,
    missingPrice:A.assets.filter(x=>x.signal.price==null).map(x=>x.c),
    priceWithoutProvenance:A.assets.filter(x=>x.signal.price!=null&&(!x.signal.priceSymbol||!x.signal.priceSource||!x.signal.priceAsOf)).map(x=>({code:x.c,value:x.signal.price,underlying:x.u})),
    unknownPremium:A.assets.filter(x=>!x.signal.premium||x.signal.premium.value==null).map(x=>x.c),
    zeroPremiumWithoutEvidence:A.assets.filter(x=>x.signal.premium&&x.signal.premium.value===0&&!x.signal.premium.source).map(x=>x.c),
    avoidWithPositiveWeight:A.assets.filter(x=>x.decision.action==='回避'&&Object.values(x.decision.w).some(v=>v>0)).map(x=>({code:x.c,weights:x.decision.w,action:x.decision.action,existingReason:x.decision.reason,resolution:'Unresolved: target allocation and present trading action need author confirmation; do not infer holdings.'})),
    methodology:'Cycle/valuation scores are research estimates. Existing per-asset drawdowns lack reproducible raw series. No investment decision or holding was changed.'};
}
module.exports={audit};
if(require.main===module)console.log(JSON.stringify(audit(),null,2));

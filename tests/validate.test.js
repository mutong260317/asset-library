const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),{spawnSync}=require('node:child_process');
const {loadJS,validateDrawdown}=require('../validate-cli.js');
const root=path.resolve(__dirname,'..');
const base=loadJS(path.join(root,'drawdown.js'),'DRAWDOWN');
const now=new Date('2026-10-31T00:00:00Z');
const check=d=>validateDrawdown(d,{now});
test('baseline formulas are internally consistent',()=>assert.deepEqual(check(base).errors,[]));
const mutations={
  'duplicate symbol':d=>d.indices[1].code=d.indices[0].code,
  'invalid date':d=>d.indices[0].asOf='2026-02-30',
  'future date':d=>d.indices[0].asOf='2027-01-01',
  'zero price':d=>d.indices[0].price=0,
  'incorrect formula':d=>d.indices[0].drawdown=-.8,
  'nonfinite level':d=>d.indices[0].levels[0].dist=NaN,
  'wrong level price':d=>d.indices[0].levels[0].price=1,
  'wrong hit':d=>d.indices[0].levels[0].hit=!d.indices[0].levels[0].hit,
  'missing level':d=>d.indices[0].levels.pop(),
  'bad MA distance':d=>d.indices[0].ma200.dist=10,
  'bad platform':d=>d.indices[0].platforms[0].mid=0,
  'missing index':d=>d.indices.pop()
};
for(const [name,change]of Object.entries(mutations))test(name,()=>{const d=structuredClone(base);change(d);assert.ok(check(d).errors.length);});
test('publish rejects legacy or stale data',()=>assert.ok(validateDrawdown(base,{now,publish:true,expected:{US:'2026-10-30',A:'2026-10-30'}}).errors.length));
for(const content of [null,'window.DRAWDOWN = {};','/* missing required global */','window.DRAWDOWN = {'])test('missing/invalid required drawdown fails: '+content,()=>{
  const tmp=fs.mkdtempSync(path.join(root,'.tmp','validator-'));
  try{fs.copyFileSync(path.join(root,'data.js'),path.join(tmp,'data.js'));if(content!==null)fs.writeFileSync(path.join(tmp,'drawdown.js'),content);const r=spawnSync(process.execPath,[path.join(root,'validate-cli.js'),'--root',tmp,'--now',now.toISOString()],{encoding:'utf8'});assert.equal(r.status,1);}finally{fs.rmSync(tmp,{recursive:true,force:true});}
});
test('node validate.js actually checks non-100 weights',()=>{
  const tmp=fs.mkdtempSync(path.join(root,'.tmp','weights-'));
  try{const A=structuredClone(loadJS(path.join(root,'data.js'),'ASSETS'));A.assets[0].decision.w.c+=1;fs.writeFileSync(path.join(tmp,'data.js'),'module.exports='+JSON.stringify(A));fs.copyFileSync(path.join(root,'validate.js'),path.join(tmp,'validate.js'));const r=spawnSync(process.execPath,[path.join(tmp,'validate.js')],{encoding:'utf8'});assert.equal(r.status,1);assert.match(r.stdout,/拒绝发布/);}finally{fs.rmSync(tmp,{recursive:true,force:true});}
});
test('product prices preserve decisions and have actual product provenance',()=>{
  const A=JSON.parse(JSON.stringify(loadJS(path.join(root,'data.js'),'ASSETS')));
  const archived=JSON.parse(fs.readFileSync(path.join(root,'reports/audits/upstream-research.json'),'utf8'));
  assert.equal(A.meta.updated,archived.researchAsOf);
  for(const x of A.assets){const old=archived.assets.find(a=>a.code===x.c);assert.deepEqual(x.decision,old.decision);assert.deepEqual(x.ret,old.ret);assert.equal(x.signal.cyc,old.cyc);assert.equal(x.signal.val,old.val);assert.equal(x.signal.asOf,old.signalAsOf);assert.ok(x.signal.price===null||x.signal.price>0);if(x.signal.priceStatus==='checked'){assert.ok(x.signal.priceSource);assert.ok(x.signal.priceAsOf);}}
});
test('composite security code cannot pass asset validation',()=>{
  const A=structuredClone(loadJS(path.join(root,'data.js'),'ASSETS'));A.assets.find(x=>x.c==='XLK').c='XLK/VGT';
  assert.ok(require('../validate.js').validateAssets(A).errors.some(e=>e.includes('单一可报价证券代码')));
});
test('publication rejects stale product closes independently of research date',()=>{
  const A=structuredClone(loadJS(path.join(root,'data.js'),'ASSETS'));
  const check=require('../validate-cli.js').validateProductPrices;
  assert.equal(check(A,{A:'2026-10-30',US:'2026-10-30'}).length,0);
  A.assets[0].signal.priceAsOf='2026-10-29';assert.equal(check(A,{A:'2026-10-30',US:'2026-10-30'}).length,1);
});

/* Offline structure checks; --publish also requires calendar freshness. */
"use strict";
const fs=require("node:fs"),path=require("node:path"),vm=require("node:vm"),{spawnSync}=require("node:child_process");
const av=require("./validate.js");
const CODES={QQQ:"US",SPY:"US",DIA:"US",IWM:"US",SH000001:"A",SH000300:"A",SH000510:"A",SZ399006:"A",SH000688:"A"};
const DEPTHS=[-.1,-.2,-.3,-.4,-.5];
const num=v=>typeof v==="number"&&Number.isFinite(v),positive=v=>num(v)&&v>0;
const date=v=>typeof v==="string"&&/^\d{4}-\d{2}-\d{2}$/.test(v)&&!isNaN(Date.parse(v))&&new Date(v).toISOString().slice(0,10)===v;
const near=(a,b,t=.0002)=>num(a)&&num(b)&&Math.abs(a-b)<=t;
function depthLabel(d){return ["回撤不足10%","回撤10–20%","回撤20–30%","回撤30–40%","回撤40–50%","回撤50%以上"][DEPTHS.filter(x=>Math.abs(d)>=Math.abs(x)).length];}
function loadJS(file,name){const c={window:{},console};vm.runInNewContext(fs.readFileSync(file,"utf8"),c,{filename:file,timeout:3000});if(!c.window[name])throw Error(name+" missing: "+file);return c.window[name];}
function validateProductPrices(A,expected){
  return A.assets.flatMap(x=>{
    if(x.signal?.priceStatus!=='checked')return [x.c+': 缺少已核验产品收盘价'];
    if(x.signal.priceAsOf!==expected[x.m])return [x.c+': 产品收盘价非最近已完成交易日，预期 '+expected[x.m]];
    return [];
  });
}
function sitePolicy(root){return loadJS(path.join(root,'release-policy.js'),'RELEASE_POLICY');}
function validateSiteRelease(root,D,p=sitePolicy(root)){
  const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
  const errors=[];
  if(p.schemaVersion!==1||!p.releaseId||!p.reason||!['snapshot','verified-close'].includes(p.mode))errors.push('网站发布策略无效');
  if(p.mode==='snapshot'&&(p.drawdownAnalysisEnabled!==false||p.drawdownAlertsEnabled!==false))errors.push('快照网站发布必须隔离回撤分析并禁用回撤提醒');
  if(p.mode==='verified-close'&&(p.drawdownAnalysisEnabled!==true||typeof p.drawdownAlertsEnabled!=='boolean'))errors.push('核验收盘模式发布策略无效');
  if(!html.includes('src="./release-policy.js"')||!html.includes('id="releaseNotice"')||!html.includes('dd-quarantined'))errors.push('网站缺少快照提示或隔离视图');
  if(p.drawdownAlertsEnabled===false&&(!D.pipeline||D.pipeline.pendingAlerts.length))errors.push('关闭提醒的发布版本不得携带待发送提醒');
  return errors;
}
function validateDrawdown(D,{now=new Date(),publish=false,expected=null}={}){
  const errors=[],warnings=[],fail=(c,m)=>errors.push(c+": "+m);
  if(!D||!Array.isArray(D.indices))return {errors:["DRAWDOWN/indices 缺失"],warnings};
  if(!D.meta||!date((D.meta.asOf||"").slice(0,10))||isNaN(Date.parse(D.meta.asOf)))fail("meta","生成时间非法");
  else if(Date.parse(D.meta.asOf)>now.getTime()+60000)fail("meta","未来生成时间");
  if(D.indices.length!==9)fail("indices","预期9个标的");
  const seen=new Set();
  for(const x of D.indices){
    const c=x.code,p=x.peak||x.ath;
    if(!CODES[c]||seen.has(c)||x.market!==CODES[c])fail(c,"代码重复/未知或市场不符");seen.add(c);
    if(x.ccy!==(x.market==="US"?"USD":"CNY"))fail(c,"币种错误");
    if(!date(x.asOf)||x.asOf>now.toISOString().slice(0,10))fail(c,"交易日期非法/未来");
    if(!positive(x.price)||!p||!positive(p.value)||x.price>p.value+.01)fail(c,"价格/窗口高点非法");
    if(!p||!date(p.date)||p.date>x.asOf)fail(c,"高点日期非法");
    if(!num(x.drawdown)||x.drawdown<=-1||x.drawdown>0||!near(x.drawdown,x.price/(p||{}).value-1))fail(c,"回撤公式不符");
    if(!x.source||typeof x.source!=="string")fail(c,"来源缺失");
    const ma=x.ma200||{};if(!positive(ma.value)||!near(ma.dist,x.price/ma.value-1))fail(c,"MA200/偏离公式不符");
    if(!Array.isArray(x.levels)||x.levels.length!==5)fail(c,"档位缺失");
    else x.levels.forEach((l,i)=>{if(l.d!==DEPTHS[i]||!positive(l.price)||!near(l.price,(p||{}).value*(1+l.d),.025)||!near(l.dist,l.price/x.price-1)||typeof l.hit!=="boolean"||(Math.abs(x.price-l.price)>.02&&l.hit!==(x.price<=l.price)))fail(c,"档位价/距离/命中异常");});
    if(!Array.isArray(x.platforms))fail(c,"平台缺失");
    else x.platforms.forEach(t=>{const type=x.price>=t.low&&x.price<=t.high?"current":t.high<x.price?"support":"resistance";if(![t.low,t.mid,t.high].every(positive)||t.low>t.mid||t.mid>t.high||!Number.isInteger(t.days)||t.days<8||!date(t.first)||!date(t.last)||t.first>t.last||t.last>x.asOf||t.type!==type||!near(t.dist,t.mid/x.price-1))fail(c,"平台字段/公式异常");});
    if(x.peak&&x.zone!==depthLabel(x.drawdown))fail(c,"回撤深度标签不符");
    const q=x.quality||{};
    if(q.status!=="checked")(publish?errors:warnings).push(c+": 旧快照未重新核验，不能作为可信市场更新发布");
    else{
      if(!date(q.expectedSession)||q.expectedSession!==x.asOf||q.end!==x.asOf||!date(q.start)||!Number.isInteger(q.rows)||q.rows<200||q.rows>2000||!date((q.observedAt||"").slice(0,10))||isNaN(Date.parse(q.observedAt))||Date.parse(q.observedAt)>now.getTime()+60000||q.calendar!==(x.market==="US"?"XNYS":"XSHG"))fail(c,"质量证据非法");
      if(!p||p.kind!=="rolling_2000_sessions"||p.field!=="intradayHigh"||p.sampleSessions!==q.rows||p.windowStart!==q.start||p.windowEnd!==x.asOf||p.windowLimit!==2000||p.fullWindow!==(q.rows===2000)||p.date<q.start)fail(c,"高点窗口口径不符");
      if(!x.historicalATH||x.historicalATH.value!==null||!x.historicalATH.reason)fail(c,"全历史ATH未经证明，必须为null");
      if(!["qfq","unadjusted","index"].includes(x.priceBasis))fail(c,"复权口径缺失");
    }
    if(publish&&expected&&x.asOf!==expected[x.market])fail(c,"非最近已收盘交易日，预期 "+expected[x.market]);
  }
  const pipe=D.pipeline;
  if(!pipe||!pipe.state||!Array.isArray(pipe.pendingAlerts)||!Array.isArray(pipe.acknowledgedIds))(publish?errors:warnings).push("缺少持久化状态/提醒队列");
  else{
    if(Object.keys(pipe.state).sort().join()!==Object.keys(CODES).sort().join())fail("pipeline","状态标的集合不全");
    for(const x of D.indices){const s=pipe.state[x.code],d=Math.max(0,...(x.levels||[]).filter(l=>l.hit).map(l=>-l.d));if(!s||s.asOf!==x.asOf||!near(s.maxHit,d,1e-9))fail(x.code,"状态与数据不一致");}
    const ids=new Set(pipe.acknowledgedIds);if(ids.size!==pipe.acknowledgedIds.length)fail("outbox","重复已确认ID");
    for(const a of pipe.pendingAlerts){if(typeof a.id!=="string"||!/^[a-f0-9]{24}$/.test(a.id)||ids.has(a.id)||!CODES[a.code]||!date(a.asOf)||a.asOf>(pipe.state[a.code]||{}).asOf||!DEPTHS.includes(a.level)||!positive(a.price)||!positive(a.levelPrice))fail("outbox","事件非法/重复");ids.add(a.id);}
  }
  return {errors,warnings};
}
function main(argv=process.argv.slice(2)){
  const opt=k=>{const i=argv.indexOf(k);return i<0?undefined:argv[i+1];};
  const root=path.resolve(opt("--root")||__dirname),siteRelease=argv.includes("--site-release"),now=new Date(opt("--now")||Date.now());
  try{
    if(isNaN(now))throw Error("invalid --now");
    if(fs.existsSync(path.join(root,"scripts/.refresh-transaction.json")))throw Error("未完成事务；先恢复再校验/发布");
    const policy=siteRelease?sitePolicy(root):null;
    const publish=argv.includes("--publish")||policy?.mode==='verified-close';
    const A=loadJS(path.join(root,"data.js"),"ASSETS"),D=loadJS(path.join(root,"drawdown.js"),"DRAWDOWN"),assets=av.validateAssets(A);console.log(av.assetsReport(A));
    let expected=null;
    if(publish){const exe=process.env.ASSET_PYTHON||(process.platform==="win32"?path.join(__dirname,".venv/Scripts/python.exe"):"python3");const r=spawnSync(exe,[path.join(__dirname,"scripts/calendar_status.py"),now.toISOString()],{encoding:"utf8"});if(r.status!==0)throw Error("交易日历不可用；拒绝发布: "+(r.stderr||r.error||""));expected=JSON.parse(r.stdout);}
    const r=validateDrawdown(D,{now,publish,expected});
    if(siteRelease)r.errors.push(...validateSiteRelease(root,D,policy));
    if(publish&&expected)r.errors.push(...validateProductPrices(A,expected));
    if(D.pipeline){const mirror=JSON.parse(fs.readFileSync(path.join(root,"scripts/level_state.json"),"utf8"));if(!D.meta.generationId||mirror.generationId!==D.meta.generationId||JSON.stringify(mirror.indices)!==JSON.stringify(D.pipeline.state))r.errors.push("状态镜像/代号不一致");const file=path.join(root,"scripts/alerts.json");if(fs.existsSync(file)){const a=JSON.parse(fs.readFileSync(file,"utf8"));if(a.generationId!==D.meta.generationId||JSON.stringify(a.alerts)!==JSON.stringify(D.pipeline.pendingAlerts))r.errors.push("提醒镜像不一致");}}
    r.errors.forEach(e=>console.error("[DD-ERROR] "+e));r.warnings.forEach(e=>console.log("[DD-WARN] "+e));console.log("drawdown: "+r.errors.length+" errors, "+r.warnings.length+" warnings"+(publish?" [publish gate]":siteRelease?" [snapshot site release]":" [offline structure only]"));return assets.ok&&!r.errors.length?0:1;
  }catch(e){console.error("[ERROR] "+e.message);return 1;}
}
module.exports={validateDrawdown,validateProductPrices,validateSiteRelease,loadJS,depthLabel,main};
if(require.main===module)process.exitCode=main();

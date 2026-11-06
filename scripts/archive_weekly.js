/* Immutable full research snapshots, separate from daily market refreshes. */
"use strict";
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {loadJS}=require('../validate-cli.js');
const {validateAssets}=require('../validate.js');
function indexReports(root=path.resolve(__dirname,'..')){
  const dir=path.join(root,'reports');
  const reports=fs.readdirSync(dir).filter(file=>/^\d{4}-W\d{2}\.md$/.test(file)).sort().reverse();
  fs.writeFileSync(path.join(dir,'catalog.js'),'/* Generated from the actual weekly report files. */\nwindow.RESEARCH_REPORTS = '+JSON.stringify(reports,null,2)+';\n');
  return reports;
}
function archive(root=path.resolve(__dirname,'..'),revision=''){
  if(revision&&!/^r[1-9]\d*$/.test(revision))throw Error('Invalid explicit revision label');
  const A=loadJS(path.join(root,'data.js'),'ASSETS'),r=validateAssets(A);
  if(!r.ok||A.assets.length!==41)throw Error('Cannot archive invalid/incomplete research snapshot');
  if(!/^\d{4}-\d{2}-\d{2}$/.test(A.meta.updated)||!/^W\d{2}$/.test(A.meta.week))throw Error('Missing research date/week');
  const payload={schemaVersion:1,capturedAt:new Date().toISOString(),researchAsOf:A.meta.updated,week:A.meta.week,
    note:'Full 41-asset research snapshot captured from data.js; not proof of independently verified prices or a historical backfill.',
    assets:A.assets,meta:A.meta,portfolio:A.portfolio};
  const text=JSON.stringify(payload,null,2)+'\n',hash=crypto.createHash('sha256').update(text).digest('hex');
  const dir=path.join(root,'snapshots','research');fs.mkdirSync(dir,{recursive:true});
  const file=path.join(dir,A.meta.updated.slice(0,4)+'-'+A.meta.week+(revision?'-'+revision:'')+'.json');
  if(fs.existsSync(file)){
    const saved=JSON.parse(fs.readFileSync(file,'utf8'));
    const research=x=>{const y=structuredClone(x);delete y.capturedAt;for(const k of Object.keys(y.meta))if(k.startsWith('market'))delete y.meta[k];for(const a of y.assets)for(const k of Object.keys(a.signal))if(k.startsWith('price'))delete a.signal[k];return JSON.stringify(y);};
    if(research(saved)!==research(payload))throw Error('Snapshot already exists with different research; preserve it and create a reviewed revision');
    const savedHash=crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
    return {file,hash:savedHash,assets:A.assets.length,unchanged:true};
  }
  fs.writeFileSync(file,text,{flag:'wx'});return {file,hash,assets:A.assets.length,unchanged:false};
}
module.exports={archive,indexReports};
if(require.main===module){try{const i=process.argv.indexOf('--revision');const snapshot=archive(undefined,i<0?'':process.argv[i+1]);indexReports();console.log(JSON.stringify(snapshot));}catch(e){console.error(e.message);process.exitCode=1;}}

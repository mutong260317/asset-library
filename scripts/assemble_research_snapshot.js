#!/usr/bin/env node
// 临时机制：云主机无法可靠地经 MCP 一次性推送完整 W46 研究快照（80KB，长 content 会被截断），
// 因此把 snapshots/research/2026-W46.json 切成 snapshots/research-parts/w46-part-*.json 逐片推送，
// 由本脚本无损拼接回 snapshots/research/2026-W46.json。
// Windows 本地 gh 恢复后可直接推送完整快照，并与其他分片机制一并删除本脚本与 research-parts 目录。
'use strict';
const fs = require('fs');
const path = require('path');

const partsDir = path.join(__dirname, '..', 'snapshots', 'research-parts');
const files = fs.readdirSync(partsDir)
  .filter((f) => /^w46-part-\d+\.json$/.test(f))
  .sort();
if (!files.length) {
  console.error('assemble_research: no W46 research parts found in', partsDir);
  process.exit(1);
}
const chunks = files.map((f) => fs.readFileSync(path.join(partsDir, f)));
const data = Buffer.concat(chunks);
const target = path.join(__dirname, '..', 'snapshots', 'research', '2026-W46.json');
fs.mkdirSync(path.dirname(target), { recursive: true });
fs.writeFileSync(target, data);

// sanity check: valid JSON payload with 41 assets and week W46
let payload;
try {
  payload = JSON.parse(data.toString('utf8'));
} catch (e) {
  console.error('assemble_research: assembled snapshot is not valid JSON');
  process.exit(1);
}
if (!payload || payload.week !== 'W46' || !Array.isArray(payload.assets) || payload.assets.length !== 41) {
  console.error('assemble_research: assembled snapshot failed sanity check');
  process.exit(1);
}
console.log(`assemble_research: ${files.length} parts -> 2026-W46.json (${data.length} bytes, ${payload.assets.length} assets)`);

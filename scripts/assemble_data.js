#!/usr/bin/env node
// 临时机制：云主机无法可靠地经 MCP 一次性推送完整 data.js（长 content 会被截断），
// 因此把完整 data.js 切成 scripts/data-parts/part-*.js 逐片可靠推送，
// 由本脚本在 CI 校验/部署前无损拼接回 data.js。
// 拼接结果与本地规范 data.js 字节一致；Windows 本地 gh 恢复后可直接推送完整 data.js 并删除本机制。
'use strict';
const fs = require('fs');
const path = require('path');

const partsDir = path.join(__dirname, 'data-parts');
const files = fs.readdirSync(partsDir)
  .filter((f) => /^part-\d+\.js$/.test(f))
  .sort();
if (!files.length) {
  console.error('assemble_data: no data parts found in', partsDir);
  process.exit(1);
}
const chunks = files.map((f) => fs.readFileSync(path.join(partsDir, f)));
const data = Buffer.concat(chunks);
const target = path.join(__dirname, '..', 'data.js');
fs.writeFileSync(target, data);

// sanity check: assembled file must load and expose 41 assets
delete require.cache[require.resolve(target)];
const obj = require(target);
if (!obj || !Array.isArray(obj.assets) || obj.assets.length !== 41) {
  console.error('assemble_data: assembled data.js failed sanity check');
  process.exit(1);
}
console.log(`assemble_data: ${files.length} parts -> data.js (${data.length} bytes, ${obj.assets.length} assets)`);

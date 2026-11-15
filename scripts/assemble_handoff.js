#!/usr/bin/env node
// 临时机制：云主机无法可靠地经 MCP 一次性推送完整 HANDOFF.md（长 content 会被截断或篡改），
// 因此把完整 HANDOFF 切成 scripts/handoff-parts/part-*.md 逐片可靠推送，
// 由本脚本无损拼接回根目录 HANDOFF.md。
// 拼接结果与本地规范 HANDOFF（LF, 29527 字节）一致；Windows 本地 gh 恢复后可直接推送完整
// HANDOFF，并与 data-parts 机制一并删除本脚本与 handoff-parts 目录。
'use strict';
const fs = require('fs');
const path = require('path');

const partsDir = path.join(__dirname, 'handoff-parts');
const files = fs.readdirSync(partsDir)
  .filter((f) => /^part-\d+\.md$/.test(f))
  .sort();
if (!files.length) {
  console.error('assemble_handoff: no handoff parts found in', partsDir);
  process.exit(1);
}
const chunks = files.map((f) => fs.readFileSync(path.join(partsDir, f)));
const data = Buffer.concat(chunks);
const target = path.join(__dirname, '..', 'HANDOFF.md');
fs.writeFileSync(target, data);

// sanity check: assembled file must start with the title and contain the W46 section
const text = data.toString('utf8');
if (!text.startsWith('# HANDOFF.md') || !text.includes('豆包 W46 估值研究更新')) {
  console.error('assemble_handoff: assembled HANDOFF.md failed sanity check');
  process.exit(1);
}
console.log(`assemble_handoff: ${files.length} parts -> HANDOFF.md (${data.length} bytes)`);

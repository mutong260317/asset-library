# HANDOFF.md — 当前交接

> 完整交接记录因云主机经 MCP 推送长文件会被截断/篡改，已拆分为分片存放：
> `scripts/handoff-parts/part-01.md` ~ `part-05.md`（共 5 片，均已逐片回读验证字节一致）。
>
> **重建完整 HANDOFF（在仓库根目录执行）：**
> ```bash
> node scripts/assemble_handoff.js
> # -> 5 parts -> HANDOFF.md (29527 bytes)，与本地规范版字节一致
> ```
> 本引导文件与分片机制均为云主机大文件传输限制下的临时方案；Windows 本地 gh 恢复在线后，
> 可直接推送完整 HANDOFF.md，并删除 `scripts/handoff-parts/` 与 `scripts/assemble_handoff.js`。

## 最新状态（2026-11-15，W46）

- 远程 main HEAD 已含全部 W46 交付：研究字段更新（41 资产 cyc/val 到 2026-11-13）、
  `reports/2026-W46.md`、飞书文档《资产配置方案 v2》、飞书群三类推送与私聊精简通知。
- data.js 同样以分片 + CI 组装机制落地：`scripts/data-parts/part-01.js` ~ `part-10.js` +
  `scripts/assemble_data.js`，Pages 工作流在 checkout 后先组装再校验部署。线上 data.js 已验证为
  完整正确版（41 资产、86 history、18 log、三档各市场权重各=100）。
- 本周核心结论：美债收益率大幅反弹（10 年 5.15% +29bp），W45「利率见顶下行」判断被短期逆转；
  美股强反弹但价格分位 89–99、与利率上行背离，不追高；A 股绝对估值仍低（A500 PE 9.1、
  沪深300 PE 13.83）；上海金周 -3.57%；中证银行价格分位 97.5 但 PE 7.54，价格高位与估值仍低须区分。
  本周无加减仓、权重与持仓不变。

## 接手前必读

1. 先读 `README.md`、`AGENTS.md`，再 `git fetch` 核对远程实际 HEAD 与工作区改动，不沿用旧 SHA。
2. 完整历史交接（含各轮基线、改动、验证、遗留）请先运行上面的 `node scripts/assemble_handoff.js` 重建后阅读。
3. 本地直接打开 `index.html` 前需先跑 `node scripts/assemble_data.js` 生成完整 data.js。
4. 每日回撤 cron 维持不恢复（前置卡点未解决）；外部定时任务、投资判断/持仓变更需单独授权。

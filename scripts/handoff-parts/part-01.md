# HANDOFF.md — 当前交接

## 2026-11-15 豆包 W46 估值研究更新与分片/CI 组装机制（已同步远程并部署）

- 基线：`git fetch` 后远程 main 在已知 `3078394` 之上多出 Codex 两个提交——PR#8 `6fa6a9d`（41 产品+9 宽基同批更新到 11-13 收盘、新增价格快照、公开页展示正式收盘价）与 PR#9 `ee9271c`（总览新增重点结论与三段分析，新增顶层 `data.js.marketBrief`）。本地 reset 对齐 `ee9271c`，确认 41 资产 priceAsOf 全 11-13、marketBrief 独立于原研究、原 cyc/val 仍停在 W44（10-30）、三档各 100。
- 研究更新（核心，Codex 未动原研究字段）：41 只资产 cyc/val 及 signal asOf/valAsOf 全部更新到 2026-11-13；meta.updated/week/generatedBy 改 W46；summary 五条重写；history 新增 36 条 W46 条目（5 只无变化：511520/513520/513290/512400/162411），现共 86 条；log 追加 1 条共 18 条；archive 生成 `snapshots/research/2026-W46.json` 并刷新 catalog。更新经 `apply_w46.js` 以 assets 数组锚点限定、从后往前精确替换，未触碰 history。
- 客观数据要点：美债收益率大幅反弹（10年 5.15% +29bp、2年 4.88% +37bp、30年 5.47% +21bp），W45"利率见顶下行"判断被短期逆转；美股强反弹且价格分位 89-99（VOO 94、QQQM 89.8、RSP 99.2），与利率上行背离、不追高；A股绝对估值仍低（A500 PE9.1、沪深300 PE13.83、股息3.03%）；上海金 837.55 元/克周 -3.57%；中证银行价格分位 97.5 但 PE7.54/股息4.66%，价格高位与估值仍低须区分。本周无加减仓、权重与持仓不变。
- 测试基线修复：`tests/validate.test.js` 硬编码依赖 `reports/audits/upstream-research.json`，研究更新后重新生成该审计基线（researchAsOf=2026-11-13、41 资产、decision/ret 不变）。本地全绿：node validate.js、validate-cli.js（含日历闸门，三档各 100、0 errors/0 warnings）、node --test 27/27、python unittest 37/37。
- 交付：`reports/2026-W46.md` 六部分周报；飞书文档《资产配置方案 v2》已写入（revision 16）；群「资产配置推送」三类消息（markdown 总结+线上页面截图+周报文件，均带 message_id），另私聊用户精简通知（含文档链接）。
- **分片/CI 组装临时机制（重要，需知悉）**：云主机无法可靠经 MCP 一次性推送完整 data.js（长 content 两次失败——一次截断为 2477 字节损坏版 `4a376c2`、一次凭记忆重建篡改权重/市场字段 191 错误 `b8e7ffb`）。故把正确 data.js（89174 字节，sha256 `08061ffb…`）切成 `scripts/data-parts/part-01.js`～`part-10.js`（均 <10KB）逐片推送，新增 `scripts/assemble_data.js` 在 Pages 工作流 checkout 后、校验前无损拼接回 data.js。CI 已验证通过并部署，线上 data.js 与本地规范字节完全一致（41 资产、86 history、18 log、三档各 100）。
- 遗留与拆除条件：分片机制为云主机大文件传输限制下的临时方案；**Windows 本地 gh 恢复在线后，应用其 credential 直接推送完整 data.js，随后删除 `scripts/data-parts/`、`scripts/assemble_data.js` 与 pages.yml 组装步骤，恢复标准流程**。`snapshots/research/2026-W46.json`（80KB 纯归档、前端不读取）远程未推，可延后或分片处理。每日回撤 cron 维持不恢复（前置卡点未解决）；创业板指 csindex 返回 404，PE 沿用约 27 倍口径。

## 2026-11-14 Codex 全球市场与风格分析

- 基于远程与线上 `6fa6a9d`。总览增加重点结论和三段分析，桌面并排、手机纵向展示。数据、AI 判断和观察条件分行，涨跌、口径与来源可展开。原资产配置研究保留原日期并可展开查看。
- `data.js.marketBrief` 保存截至 11 月 13 日的 21 个前复权收盘对照和 11 月 14 日的独立解读。用长桥日线复算 5 日与 20 日涨跌，按交易所实际收盘先后配对 60 组收益，宽基相关 0.13、成长代理相关 0.15。宏观查美国财政部、美国劳工统计局与中国国家统计局，SCHD 持仓按发行商 11 月 12 日披露。伯克希尔和好市多为独立观察样本。
- 随后刷新行情时，旧解读会自动标记为历史解读。资产研究日期、目标权重、既有周报和飞书预览内容沿用原数据。更新方法已写入 README 与持续开发提示词。

## 2026-11-14 Codex 行情页与发布回归

- 接手时远程 main 与线上 version.txt 均为 `3078394`。沿用 [持续开发提示词](MAINTENANCE-PROMPT.md) 检查六个视图、发布、收盘更新与飞书预览。
- 公开版行情页直接展示正式收盘价、所属交易日和逐标的来源。本机行情继续显示盘中报价及其时段。总览和公开行情页展示采集时间，按已经过去的整天计算，交易新鲜度仍由交易所日历校验。
- 41 只产品与 9 个宽基同批更新至 2026-11-13 收盘，产品价格归档见 [快照](snapshots/prices/2026-11-14T193825.json)。上证指数、沪深300、创业板指恢复使用长桥，指数口径一致，重叠日收盘差异为 0。SPY、DIA、IWM 和科创50继续使用各自通过校验的备用源。研究日期仍为 2026-10-30。状态镜像与本次生成批次同步，待发提醒为 0。
- Pages 工作流现于正式发布检查前运行 Node 和 Python 回归测试。临时测试数据使用系统临时目录，全新检出即可运行。
- 验证入口为 `node --test tests/validate.test.js`、`python -m unittest discover -s tests -p 'test_*.py'`、`python tests/smoke_page.py` 和 `node validate-cli.js --site-release`。本轮验证了飞书周报预览，群内送达与自动任务另行验收。

## 2026-11-13 豆包行情更新至 11-12 与长桥去重优化（已同步远程）

- 触发：上一文档提交 `5fe2c27` 的 CI 在 validate 步骤失败——`--site-release` 新鲜度闸门要求数据为最近收盘日（11-12），而数据停在 11-09；线上按预期保留上一通过版 `10c7baf`，未受影响。
- 数据源诊断（本地 `.venv`，AkShare 1.20.25；长桥 CLI 在 PATH）：
  - 长桥与 AkShare 均能取得 11-12 两地收盘且数值一致（如 SPMO 134.43、510300 4.114）；Yahoo 历史 403 已恢复，三源对 SPY 11-12 均为 757.12。
  - 长桥指数历史存在两类瑕疵：① 完全重复行（美股 SPY/DIA/IWM 在 2021-05-26、A股四指数在 2022-01-04，均为相邻且 OHLC 完全相同）；② OHLC 逻辑矛盾（SPY/DIA/IWM 2020-11-18 开盘价高于最高价、科创50 2022-08-05 收盘价高于最高价）。
- 行情更新：用长桥经 `refresh_market.py` 刷新 41 产品 + 9 宽基到 11-12；SPY/DIA/IWM 因长桥重复行回退至 Yahoo Finance（未复权口径相同、重叠日 revision 约 0），源切换经复核后显式接受并留痕。研究结论、权重与研究日期 2026-10-30 保持不变，结构化对比确认无非价格字段改动。提交 `2ff3776`，CI `success`，线上 `version.txt` = `2ff3776…` 与 HEAD 一致；Edge headless 截图确认 24/24 A 股、17/17 美股均收盘 11-12、三档 100%、图表齐全、无 NaN。

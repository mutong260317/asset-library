- 去重优化：`longbridge_source.py` 新增 `dedupe_exact_bars`，仅删除相邻且整行完全相同的重复 K 线；同日期数值不同或非相邻的行一律保留，交通用 `checked_rows` 继续 fail-closed。OHLC 矛盾不自动篡改、保持回退。新增单元测试，Python unittest 37 项通过（原 36 + 新 1）。
- 去重后预期：SH000001/SH000300/SZ399006 三个 A 股下次刷新会自然从腾讯切到长桥（revision 0%、basis 同为 index）；本次不为此单独重建数据，保持线上稳定，下次有真实行情更新时随 `--accept-source-change` 自然落地。SPY/DIA/IWM/科创50 因 OHLC 矛盾仍会正确回退 Yahoo/腾讯。
- 遗留：每日回撤 cron 维持不恢复（云端源未统一的前置卡点未解决）；7 项回避+正目标权重含义仍待研究作者解释，不猜测不调权重。

## 2026-11-13 豆包接手审阅 Codex PR#7（已同步远程）

- 基线：网络恢复（github.com 443 阻断解除），`git fetch` 后本地从旧 `99c5511` reset 对齐远程 HEAD `10c7baf`（Codex PR#7，11-10 合并），工作区干净；确认本地旧 commit 与工作区改动均已被远程包含，无内容丢失。
- 逐项审查 PR#7，结论为质量高、可直接保留，无需返工：
  1. 新增 `.github/workflows/pages.yml`：Pages 从直读 main 改为先过 `node validate-cli.js --site-release` 再部署；最小权限（validate 仅 contents:read，deploy 加 pages/id-token）、concurrency 防并发、部署前用 gh api 再确认 main 未漂移。已核 Pages `build_type=workflow`、状态 built。
  2. 资产数量由 warning 升级为硬 error，并新增"权重合计仍 100% 但删除一只资产"的回归测试，精准防止 W45 丢资产事故重演。
  3. `data.js` 实质 diff（-w）仅快照指针与 17 只美股价格/priceAsOf 刷新到 11-09；cyc/val、cycleReason、decision 权重与动作、drawdown 字段逐字节零变化，未混入主观判断。
  4. `drawdown.js` 三个美股宽基（SPY/DIA/IWM）显式从 Yahoo 切到 AkShare 新浪源，带 `sourceChangeAccepted`/`previousSource` 留痕、未复权；generationId 更新为 `2e2ca0e4`，与 `scripts/level_state.json` 镜像一致。
  5. 部署清单核对：index.html 仅外部引用 6 个 JS（全在复制列表）、favicon 内联、无外部 CSS/图片，无 404 风险。
- 本轮实测全绿：node validate.js / validate-cli.js（0 errors/0 warnings）、node --test 26 项、Python unittest 36 项全通过。
- 线上回查：`version.txt` = `10c7baf…` 与 main HEAD 完全一致；Edge headless 截图确认页面渲染正常、41 只、三档 100%、温度计散点与多因子雷达齐全、无 NaN 或数据保护。
- 分支卫生：删除远程 `codex/validated-pages-deploy`（tree 与 main 完全一致，squash 合并残留）与本地 `doubao/drawdown-jump-review-20261104`（其日历边界/复核例外修复已在主干），现本地与远程均仅余 main。
- 本轮无代码逻辑改动，仅文档留档与分支清理。遗留：每日回撤 cron 维持不恢复（云端仅 AkShare 与 live Yahoo/腾讯源未统一的前置卡点未解决）；7 项回避+正目标权重含义仍待研究作者解释，不猜测不调权重。

## 2026-11-10 发布前校验

- GitHub Pages 改由 `Validated Pages` 工作流发布。PR、main 更新和手动运行都会检查数据。main 的同一提交通过 `node validate-cli.js --site-release` 后才能上传网页并部署。
- 资产数量和权重总和均为硬校验。当前配置应有 24 只 A 股、17 只美股，各市场三档权重均为 100%。发布失败时，网站继续展示上一份通过校验的版本。
- 线上 `/asset-library/version.txt` 记录实际部署的提交。排查更新时先比对该文件和 Actions 运行结果。
- 行情刷新至两地 11-09 收盘。SPY、DIA、IWM 采用新浪备用源，同为未复权口径，重叠交易日收盘价与上一来源一致。

## 2026-11-09 豆包回归全量体检与优化（已同步远程）

- 基线：本地 main 已从旧 `c54d720` reset 对齐远程 HEAD `10f6f75`（Codex PR#6），工作区干净。逐项核实 PR#6 正确修复了豆包 W45 提交 `32dff87` 丢失 5 只 A 股（511090/511520/511010/511380/563300）的缺陷；当前 41 只、三档权重各 100%、mode=live，cyc/val 回到 W45 前已验收口径，价格 A 股截至 11-09、美股截至 11-06。
- 本轮实测全绿：node validate.js、validate-cli.js（0 errors/0 warnings）、node --test 25 项、Python unittest 36 项全通过；index.html 仅外部引用 data.js、无内嵌数据副本；Edge headless 截图确认线上页面渲染正常、无 NaN 或数据保护。
- 本轮唯一改动：删除 gitignore 忽略的本地过期残留 `scripts/alerts.json`（旧 generationId 29b7d81e，权威为 c4ce366a），删除后 validate-cli 恢复 0 错误；不入库、不影响远程。
- 用户授权自行决定后的处置（2026-11-09）：
  - 已执行：① 删除 5 个过期远程分支（codex/archive-overflow、data-visibility、reliability-review、restore-validated-w45，doubao/drawdown-jump-review；doubao/live-data-restore 此前已删），现仅余 main；② 更新每周估值 cron 的 query：去掉失效的理杏仁/东财源、项目名改为资产归类项目、校验对齐 node validate.js + validate-cli.js，调度不变（每周日 20:00，下次 11-15）。
  - 经评估不做：① 不加 .gitattributes（全仓库行尾规范化大 diff，当前仅空白噪音、无实际问题，收益小于风险）；② 不单独重做 W45 评分（等下次周报自然迭代）；③ 不恢复每日回撤 cron（云端仅 AkShare 与 live 的 Yahoo/腾讯源未统一，恢复会失败）。

## 2026-11-09 恢复资产配置页面

- W45 提交 `32dff87b` 遗漏了 511520、511090、511010、511380、563300 五只 A 股资产，并改动了部分权重。A 股三档合计变成 85%、88%、99%，触发页面数据保护。
- 恢复 `01c95f1` 中已验收的 41 只资产及配置。W45 周报作为单独的研究记录保留并加入索引，拆分比例按已核实的公告订正。配置的研究日期仍为 10-30。
- 通过现有流程更新 41 只产品和 9 个宽基的正式收盘数据。A 股截至 11-09，美股截至 11-06。发布前检查权重、完整性和页面运行。

## 2026-11-06 发布授权更新

用户已授权常规改动在测试通过后直接推送、合并和部署，并保留可回退记录。此前“仅本地、每次发布另行确认”的限制对后续常规发布不再适用。当前整站候选已完成验收，发布沿用 GitHub 分支、PR 和 GitHub Pages 流程。

本轮远程交付入口为 https://github.com/mutong260317/asset-library/pull/4 。上线回查结果记录在该 PR，回退基线为 c54d720822c8ab10e11c9f147e1588e43251f996。以下“本地待交付”记录保留审查发生时的状态。

## 2026-11-06 Codex 整站验收（本地待交付）

- 当前工作目录为 E:\codex\投资\asset-library，分支 codex/data-visibility-20261104。已合并并保留远程 c54d720 的行情修复；以下新增优化仅在本地，未推送或部署。下方旧记录按各自日期理解。

# HANDOFF.md — 当前交接

## 2026-11-13 豆包行情更新至 11-12 与长桥去重优化（已同步远程）

- 触发：上一文档提交 `5fe2c27` 的 CI 在 validate 步骤失败——`--site-release` 新鲜度闸门要求数据为最近收盘日（11-12），而数据停在 11-09；线上按预期保留上一通过版 `10c7baf`，未受影响。
- 数据源诊断（本地 `.venv`，AkShare 1.20.25；长桥 CLI 在 PATH）：
  - 长桥与 AkShare 均能取得 11-12 两地收盘且数值一致（如 SPMO 134.43、510300 4.114）；Yahoo 历史 403 已恢复，三源对 SPY 11-12 均为 757.12。
  - 长桥指数历史存在两类瑕疵：① 完全重复行（美股 SPY/DIA/IWM 在 2021-05-26、A股四指数在 2022-01-04，均为相邻且 OHLC 完全相同）；② OHLC 逻辑矛盾（SPY/DIA/IWM 2020-11-18 开盘价高于最高价、科创50 2022-08-05 收盘价高于最高价）。
- 行情更新：用长桥经 `refresh_market.py` 刷新 41 产品 + 9 宽基到 11-12；SPY/DIA/IWM 因长桥重复行回退至 Yahoo Finance（未复权口径相同、重叠日 revision 约 0），源切换经复核后显式接受并留痕。研究结论、权重与研究日期 2026-10-30 保持不变，结构化对比确认无非价格字段改动。提交 `2ff3776`，CI `success`，线上 `version.txt` = `2ff3776…` 与 HEAD 一致；Edge headless 截图确认 24/24 A 股、17/17 美股均收盘 11-12、三档 100%、图表齐全、无 NaN。
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
- 六页逐项验收，修复错误权重仍展示、观察标的 HTML 注入、总览档案不可见、历史箭头反向、硬编码溢价及科技穿透乘数等问题。补键盘操作、原生档案弹窗、市场覆盖日期、可读手机行情布局和真实周报索引。
- 长桥改用 serve 原始协议，恢复时间戳和批量日线；全球线路连接错误时可切官方国内线路。2026-11-06 实测 41/41 报价、手机页面与再次获取均通过。公网静态网站继续展示收盘快照，盘中行情使用可选本机回环预览入口。
- refresh_market.py 可先生成隔离候选，严格要求 41 产品和 9 宽基全部通过，使用 --apply 才同批更新本地。失败保留原数据。产品、回撤及状态使用同一可恢复事务；来源变更需要显式复核。
- 2026-11-06 完整候选已应用到本地：41 产品全 checked，A 股收盘日 11-06、美股 11-05；9 宽基对应相同已完成交易日，--publish 与 --site-release 均通过。研究日期仍为 10-30。20261106T134425797242Z 候选记录保存了来源复核、生成、严格验证和本地应用证据。
- 新增 reviewed_splits.json，依据 SEC 公告记录 MTUM 2026-11-05 4:1、SOXX 同日 3:1。仅规范化相邻日异常检查，原始未复权价格不变；清单外异常仍隔离。候选明细与发布日志保存在 .local/candidates/。
- send_feishu.py 提供周报摘要、档位提醒预览和 --send。已复用用户确认的现有机器人向“资产配置推送”群发送一次测试，并回读验证正文、群及应用身份。message_id 为 om_x100b61fd57f854a4b0896db82c31590。配置、UUID、意图与回执只在 .local/，不入库。
- 验证包含 Python 36、Node 25 项测试，Edge 1440/768/390 三种宽度六页操作，以及缺数据、错误权重、公开模式、草稿注入等场景。完整审查、评分及限制见 reports/audits/PRODUCT-REVIEW.md。
- 研究结论、权重与持仓保留。提醒开关仍关闭，外部定时任务未修改。公网盘中行情、定时发布、七项配置冲突及 Safari/Firefox 实机验收尚待完成。

## 以前的交付记录

> 2026-11-04 已恢复实时数据发布（live）：41 产品价格刷新到 A股 11-04 / 美股 11-03；9 宽基回撤通过交易所日历与多源核验、恢复完整分析。`node validate-cli.js --publish` 为 0 errors / 0 warnings。
> 外部提醒发送器未恢复，`drawdownAlertsEnabled` 保持 false；`--site-release` 仅用于快照模式，当前 live 不适用。
> 仓库入口：https://github.com/mutong260317/asset-library ；网站：https://mutong260317.github.io/asset-library/

## 2026-11-04 数据刷新与 live 恢复（本轮，本地待交付）
- 基线：远程 main HEAD `fc64f1a`，本地 main 对齐、无远程漂移；本轮改动在本地完成，10 个修改文件 + 2 个新价格快照。
- 代码修复（market_quality.py）：`checked_rows` 重构为先用 collected 收集日期/排序/start/日历/收盘检查，截断到最近 2000 窗口并校验 session 连续性后，再对窗口内行做 OHLC 与 move 校验；窗口外单点坏数据（如新浪 SPY 2015-03-30）不再阻断，窗口内 fail-closed 语义保持。
- pandas 3.1.0 时区 bug 修复（market_quality.py）：收盘检查改用 `cal.session_close(day).tz_convert("UTC").to_pydatetime()`，修正盘中行未被过滤问题；夏令时/冬令时/A股均验证正确，不依赖 pandas 版本。
- 回撤口径（fetch_drawdown.py）：美股 AkShare 由前复权 qfq 改为未复权 adjust=""，与 Yahoo 未复权口径一致，消除前复权因子跳变（DIA/IWM 2020-03-16）造成的误报。
- 价格刷新（refresh_asset_prices.py）：新增 `--provider`（longbridge/akshare）与 AkShare 全历史取数；AkShare 分支按 `now.date()-10 天` 近端截断再校验，与 Longbridge recent 语义对齐，历史份额拆分/缺口不阻断。AkShare 刷新 41/41 成功。
- 数据结果：产品 41 只全 checked（A股 11-04、美股 11-03，source='AkShare(新浪)'，priceBasis='unadjusted'）；回撤 9 标的（美股 Yahoo 11-03、A股腾讯 11-04），publish gate 0 errors/0 warnings，pending alerts=0；新 generationId `29b7d81e40b4609659051a3d`。
- 前端联动（index.html）：releaseNotice 改为按 `RELEASE_POLICY.mode` 动态隐藏（live 隐藏黄框，snapshot 兜底）；renderDrawdown 已支持 policy 切换，live 下显示完整价位条/关键价位/回撤标签。
- 发布策略（release-policy.js）：mode snapshot→live、releaseId `site-update-2026-11-04`、drawdownAnalysisEnabled false→true、drawdownAlertsEnabled 保持 false。
- 测试更新：validate.test.js 与 smoke_page.py 中写死的时间锚点/快照假设改为从数据动态派生，避免随时间漂移；Python 28、Node 23、smoke（1440/390）全通过。
- 遗留：云端无人值守仅能用 AkShare，与本次 Yahoo/腾讯源不同，未来云端运行需统一源或显式接受 source change；每日回撤 cron 是否恢复、外部提醒器与长桥登录态链路仍待用户拍板/环境配合。

## 2026-11-04 豆包接手（已合并 PR #2，远程 main=a2ae34b，网站已更新）
- 基线：远程 main HEAD `ccbfc17`，本地已 reset --hard 对齐；工作分支 `doubao/drawdown-jump-review-20261104`（commit f4b6f1f，已推送）。
- 本地环境修复（均为 gitignore 忽略文件，无仓库改动）：删除旧格式 `scripts/alerts.json`（离线/--site-release 恢复 exit 0）；创建 `.venv` 装齐 requirements.txt（exchange-calendars 4.13.2 等），日历步骤正常。
- 只读探测（`.tmp/probe1-7`，不入库）实测 9 标的：长桥报告的 OHLC 硬伤在新浪/腾讯/Yahoo 均不成立，属长桥数据/复权问题；7 标的可直接通过，仅创业板/科创50 因 2024 九二四真实暴涨需留痕复核。完整证据见 `reports/2026-11-04-drawdown-feasibility.md`。
- 修复 A（日历边界，market_quality.py）：早于日历 `first_session` 的早期数据安全跳过（与 A股 start 过滤一致），不改变窗口内任何校验；窗口内非交易日仍报错。
- 修复 B（复核例外）：新增 `scripts/reviewed_jumps.json`（入库留痕，4 条真实交易日）；`checked_rows` 新增纯函数参数 `approved_moves`，仅当幅度/符号吻合（容差 0.002）才放行，`quality.approvedJumps` 记录；`fetch_drawdown` 加载并按 code 透传。清单外新跳变仍隔离，不放宽全局阈值、不篡改数据。
- 数据源顺序：维持长桥→Yahoo→AkShare 不变（修正评估报告初稿“美股优先 Yahoo”的提法）；本机长桥不可用时 fallback 自动选 Yahoo（4 美股全 PASS），保持长桥优先符合 AGENTS。
- 端到端：真实 fetch_daily 9/9 通过（美股走 Yahoo、A股走腾讯，创业板/科创50 带 approved 放行）。
- 检查结果：Python 28 测试、Node 23 测试全通过；validate.js、validate-cli、--site-release 均 exit 0；--publish 仍 exit 1（59 errors，旧快照非最近收盘日，正确 fail-closed）。
- 本机 PATH 存在 Trae 自带 `longbridge.EXE`（d:\ai\trae\...），调用返回无效 candle（缺 timestamp），非可用登录态，真实 CLI 链路仍需单独打通。
- 交付：用户授权后已推送分支、创建并 squash 合并 PR #2（https://github.com/mutong260317/asset-library/pull/2）；远程 main 新 HEAD `a2ae34b`，GitHub Pages 已自动重建并回读确认（HTTP 200，data.js/drawdown.js 正常）。本地 main 已同步。
- 重启登录入口与网址已固化到 `LOCAL-ACCESS.md`，重启后按该文件确认，无需再问 AI。

## 版本与交付状态
- 首次远程基线：3c3dd4ac8f4f2b5787d685cd063a2e3c0e1b300d。结束前发现远程更新到 c6fac5040f9498bcaabdfcf21de756057a8bcee4，已读取并合入其 data.js 和 reports/2026-W44.md；完整保留新的 W44 研究、权重与判断。
- 固定审查基线：685c8a9128b7341e0e85ec34d2a648fef4647d88。后续 W41 比较/日志、措辞修正已合入；其组合代码 XLK/VGT 规范化为可报价 XLK，原字符串保留为 aliases，VGT 单独资产与权重不变。
- 本地工作分支：reliability-review，目录 E:\codex\投资\asset-library。实际本地 HEAD 用 git log -1 核对，不在本文件里循环写自身提交号。
- 交付分支：`codex/reliability-review-20261101`，本文件、源码、测试与审查证据同批交付到 GitHub。用户现已授权合并并部署快照站点，部署结果在 PR #1 记录；定时任务未修改、外部提醒未发送。
- 直接 git fetch 连接重置后，通过 GitHub 回读 18 个 blob 和提交元数据，逐个校验 blob SHA，并重建出完全一致的远程 commit 685c8a9 与 tree fd4cb785d35e16d2ca3d97c2104c9c33c315952d。本地分支现在实际以该远程提交为父基线（浅历史），不再是独立根提交；工作改动完整保留。

## 已完成
1. 所有提供商统一使用交易日历和收盘缓冲，去除腾讯/新浪实时补日线；增加交易日完整性、OHLC、日期、陈旧、跳变和来源修订闸门。长桥为优先只读源，支持 CLI 和新鲜的连接器导出。
2. 区分有限窗口高点与真正历史 ATH；旧 drawdown 仅迁移结构和标签，保留原价格、交易日、均线和数值档位，明确 legacy_unverified。不能把迁移当行情刷新。
3. validate.js 直接运行会真正执行；validate-cli 检查缺失文件/全局、公式、档位、平台、日期、状态/提醒镜像。--publish 额外要求交易日新鲜度与已核验序列。
4. 状态与队列嵌入回撤快照，镜像带 generationId；有并发锁、修改版本检查、预验证暂存与可恢复日志。队列不因本次无新提醒而清空，按 ID 去重和显式 ack。
5. 41 只产品价格通过长桥近期日线刷新，为同代码 ETF/基金的未复权正式收盘价；日期为 2026-10-30，研究日期现为继承远程 W44 的 2026-10-30（没有用价格更新时间冒充研究更新时间）。原来 9 个缺来源的数值不能再混用底层指数点位。决策、权重、研究评分和持仓未改。
6. 初始基线有 27 个无证据的 0 溢价；合入 W44 后共 34 个，均置为 null；其余旧非零溢价仍为研究记录，未声称更新到现在。目标年化/回撤标为未验证情景。7 项“回避 + 正目标权重”保留并提示待解释。
7. 温度计增加 A 股/美股按钮，24/17 点及侧栏同步；按上市市场分类，A 股含跨境 ETF。修正坐标高/低估标注、画布尺寸、手机溢出和 hover 对齐；保留图点/清单打开档案。
8. 周研究日期与市场价格日期分开显示，删除写死的刷新时间与来源承诺；补完整 41 资产归档工具和 W43 基线归档。

## 验证与证据（随本审查分支交付；test-results/ 仅本地）
- tests/test_pipeline.py：交易日历、DST、提前收盘、盘中缓存跨收盘、坏数据、来源切换、队列、失败/恢复与并发测试。
- tests/validate.test.js：真实 CLI 失败路径、公式/档位、权重和决策不变回归。
- tests/smoke_page.py：1440/390 宽度真实浏览器，切换、图点/清单交互、搜索、缺数据提示和无横向溢出。
- reports/audits/2026-10-30-assets-before.json：原始缺口 32 价格为空，9 有数值但无产品来源；27 未证实零溢价，7 项动作/目标冲突。
- reports/audits/2026-11-01-assets.json：合入 W44 后的最终资产质量清单。
- reports/audits/upstream-research.json：从 685c8a9 固定版本提取的研究/决策对照，回归测试证明未被本轮修改。
- reports/audits/2026-10-30-longbridge.json：分页取回历史的隔离结果（3 条序列通过基础检查，6 条需复核，不能当作全源不可用证明）。
- snapshots/research/2026-W43.json、2026-W44.json 和 2026-W44-r2.json：本轮保存的完整研究基线，W44/r2 分别继承 c6fac50 / 685c8a9；不是回补过去采集时间。
- snapshots/prices/：按实际观测时刻保存 41 产品价格，不混入账户或持仓。
- test-results/：本机测试日志与截图，忽略、不入库。汇总以 reports/audits/REVIEW.md 为准。

## 尚未解决与下一步
- **9 标的长历史回撤尚未通过新发布闸门**。长桥部分历史 OHLC 不一致、空字段，另有超过保守阈值的真实/异常跳变待复核；不能自动修补历史 high/open 或降低检查强行通过。当前保留旧回撤用于后续核验，但网站隔离所有回撤数值/档位；--publish 应拒绝，--site-release 可在隔离和提醒关闭的条件下通过。
- 本机长桥 CLI 到行情服务连接失败，但已连接的只读工具可读取。CLI 定时无人值守链路仍需单独打通和验收，不能把连接器的成功当作已修好 CLI。
- 外部飞书提醒发送器、额度门控定时任务不在仓库，本轮没有改；不能保证旧消费者兼容 v2，恢复任务前需验证并取得授权。
- 7 项配置冲突须研究作者确认“正目标权重”是长期方案、保留仓位还是待调出，本轮不猜测解释、不调权重。
- 旧非零溢价、估值分位和单资产研究回撤仍待独立来源与可复算方法核验；行情价格更新不等于研究结论重新核验。

## 不可访问的旧本地事项
旧交接提及其他 AI 云端 stash（6 处措辞）、未提交 portfolio/ 和私有定时任务编号。这些未在当前 GitHub 树发现，均不是已交付成果；需原执行者导出后再审阅，不提供假定存在的远程链接。

## 继续工作格式
接手时重新核对远程 HEAD/本地改动；先读本文件与 AGENTS。每次在顶部摘要更新实际版本与检查结论，追加日期、改动、理由、验证、遗留、已发布/仅本地。未经授权不要推送 main、部署、恢复定时任务或发送提醒。

## 给下一位 AI 的优先任务
1. 检出/读取上述审查分支，先核对实际 HEAD 和远程 main，再读 README、AGENTS 与本文件。
2. 保留 W44 研究判断和配置；先解决 9 标的长历史质量、通过 node validate-cli.js --publish。不能把结构测试通过当作上线条件。
3. 处理来源异常时保留复核证据，不静默改 high/open、不放宽全部规则，也不重复发送旧提醒。
4. 快照网站已由用户授权发布。恢复回撤数值分析和提醒前，必须完成新鲜行情 --publish 检查、页面验证并更新交接，不能把 --site-release 当作恢复开关的许可。

## 2026-11-02 网站发布调整
- 新增 release-policy.js（snapshot，回撤分析与提醒关闭）。所有未核验宽基只显示待核验状态和记录日期，不显示价格阶梯、机会标签或回撤数值。
- 新增 --site-release 验证网站隔离条件；严格行情 --publish 未放宽。自动获取入口读取同一策略，禁用新回撤提醒生成。
- 用户授权本轮合并部署，网站发布与日线数据更新不再相互阻塞；未改外部定时任务、未改投资判断或持仓。

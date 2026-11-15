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

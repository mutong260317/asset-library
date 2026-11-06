# 资产产品分析（Asset Library）

> 公开网站展示有日期和来源的研究及正式收盘快照。本机版额外提供长桥盘中报价。飞书支持发送预览、显式发送和回执留存。实际验收结果见 [产品审查记录](reports/audits/PRODUCT-REVIEW.md)，维护者先读 HANDOFF.md 与 AGENTS.md。

个人资产配置研究系统：剖析每只 ETF 的**底层结构 → 康波周期定位 → 估值位置 → 回撤 → 宏观环境**，以「周期为王、不硬配比例」为核心方法论，输出 A股/美股各自按 100% 计的配置方案。

**在线访问**：https://mutong260317.github.io/asset-library/（GitHub Pages）
**GitHub 仓库**：https://github.com/mutong260317/asset-library

## 架构（单一数据源 + 自检 + 展示分离）

| 层 | 文件 | 作用 |
|---|---|---|
| 数据层 | `data.js` | **唯一规范源（Single Source of Truth）**：资产静态事实 / 每周信号 / 投资决策 三层结构，全部信号携带 asOf/source/confidence |
| 校验层 | `validate.js` | 发布前机器自检：权重=100、字段范围、代码唯一、过期告警、异常溢价告警；失败则拒绝发布 |
| 展示层 | `index.html` | `<script src="./data.js">` 读取 `window.ASSETS`，**不再内嵌数据副本**；本地双击与 GitHub Pages 均可用 |
| 版本层 | git + GitHub | 每次修改 commit 并 push，历史可追溯 |
| 归档层 | `reports/` | 每周估值周报原始研究记录（`2026-W36.md` … `2026-W40.md`） |
| 阅读版 | 飞书文档《资产配置方案 v2》 | 对外阅读/协作版，关键结论定期同步 |

## 更新工作流（研究与市场行情分开，任务状态以实际运行记录为准）

1. 拉取核心资产估值/价格/宏观数据 → 更新 `data.js` 的 `signal`（周期/估值/溢价/回撤）与 `decision`（权重/动作/条件）
2. **发布前必须自检**：`node validate.js` 和 `node validate-cli.js --publish`。普通离线校验仅检查结构，不能替代交易日新鲜度和完整性闸门。权重非 100% 禁止发布。
3. 更新研究日期后运行 `node scripts/archive_weekly.js`，完整保存 41 只资产（含未调整项）；`history` 继续用于页面变化对比，不能代替全量快照。日常价格更新不修改研究日期。
4. 生成本周周报 `reports/2026-Wxx.md`，同步关键结论到飞书文档
5. 在本地/独立分支检查、测试并提交。远程写回、合并和 GitHub Pages 部署另按用户授权执行，数据与状态必须同一提交。

> ⚠️ **严禁**在 index.html 内嵌资产数据副本；data.js 是唯一规范源。

## 数据结构（v4 三层分离）

```
Asset Static（低频事实）：c 代码 / n 名称 / m 市场(A|US) / cat 分类 / u 跟踪底层
                          / structure 产品结构 / fee{value} / aum{value,currency,unit} / rk 风险1-5 / overlap 重叠度
Weekly Signal（每周信号）：asOf / cyc 周期0-100 + cycleType/Method/Reason/Confidence
                          / val 估值分位 + valSource/valAsOf / premium{value,asOf} / purchaseLimit
                          / drawdown{fromATH,p1y,historicalMax} / price
Portfolio Decision（决策）：w{c,y,a} 三档权重 / action / buyZone / trimZone / invalidation / reason
```

组合层：`portfolio`（目标回撤/目标年化）、`overlapGroups`（资产重叠组与穿透提示）、`history`（周度快照对比）、`summary`（本周结论）、`checklist`（调仓检查清单）。

## 方法论：四层分析法

1. **底层结构**：锚定什么、收益来源、久期/贝塔
2. **康波定位**：处于康波哪一段（回升/繁荣/衰退/萧条）+ 基钦/朱格拉中周期
3. **估值位置**：PE/PB 近 5–10 年分位、股息率、CAPE → 便宜/合理/贵（>80 高估、<30 低估）
4. **宏观环境**：利率周期（降息/加息）、地缘政治、流动性

时间维度分三档推演：**1–3 年（短周期买卖节奏）、3–5 年（中周期大类切换）、5–10 年（康波赛道选择）**。

## 决策规则（周期为王、不硬配比例）

- 周期上行早期 + 估值低位 + 深度回撤 → 超配/分批建仓
- 周期上行中段 + 估值合理 → 标配/持有
- 周期顶部 + 估值高位 → 减配/落袋/暂缓
- 周期下行 + 估值仍高 → 现金/防御/等待

## 数据源与可复算边界

- **产品收盘价**：优先长桥只读日线，按相同基金/ETF代码、未复权价格保存。priceAsOf 是收盘所属交易日；meta.marketUpdated 是观测时间。不能用底层指数点位替代基金价。
- **宽基回撤**：优先长桥，备用链路保留 Yahoo / 腾讯 / AkShare。所有提供商必须经过同一交易日历、OHLC、完整性、异常和来源切换闸门；逐标的显示收盘日与高点窗口。是否可发布以本次严格校验为准。
- **研究估值/周期**：旧研究曾引用豆包金融搜索、中证、理杏仁、发行商和宏观资料；来源文字不等于已连接相应 API，也不代表所有分位已独立复算。研究评分含主观推演，不能当成实时行情。
- **高点口径**：peak 为最多 2000 交易日可用窗口的盘中高点；实际覆盖范围必须展示。historicalATH 未核验则为 null。回撤标签仅描述深度，不直接定义投资机会。
- **溢价与组合指标**：未知溢价为 null；旧非零溢价仍需对 NAV/市价同一时点核验。目标年化、目标回撤没有模型验证时只是情景假设。

## 本地运行与检查

仍是静态网页，可双击 index.html 或用任意本机静态服务器预览，不需要数据库或常驻后端。
Python 运行环境安装 requirements.txt；浏览器测试使用环境已有的 Playwright 和 Edge，不增加产品运行依赖。

```text
node validate.js
node validate-cli.js
node validate-cli.js --site-release  # snapshot 检查隔离；live 自动执行严格行情校验
node validate-cli.js --publish       # 新鲜行情：严格标准保持不变
python -m unittest discover -s tests -p "test_*.py" -v
node --test tests/validate.test.js
python tests/smoke_page.py
```

Windows 虚拟环境可用 `.venv\Scripts\python`；发布闸门可用环境变量 ASSET_PYTHON 指定含交易日历库的解释器。

```text
python scripts/refresh_asset_prices.py                 # 只更新41产品价格；不改变研究判断
python scripts/fetch_drawdown.py                       # 9标的完整合格后才更新数据和状态
python scripts/fetch_drawdown.py --accept-source-change # 仅在已经复核口径差异后使用
node scripts/archive_weekly.js                        # 完整周研究归档；不覆盖旧研究
node scripts/archive_weekly.js --revision r2          # 同周研究确有修订时显式另存
```

已登录 CLI 的长桥行情可直接复用。若只读连接器可用而本机 CLI 不通，可把新鲜数据导出为
`{provider:"Longbridge", observedAt:"UTC ISO timestamp", symbols:{"QQQ.US":[[timestamp,open,close,high,low], ...]}}`
或同字段对象数组，传 `--longbridge-input <本地JSON>`。导出不含凭证，六小时有效；跨过新的收盘时点必须重取，不能把旧盘中缓存改称收盘。

数据先在临时目录完整校验，之后用可恢复日志写入 drawdown.js、level_state 镜像和临时 alerts。
权威状态与未发送队列嵌入 drawdown.js。scripts/send_feishu.py 在收到 message_id 后确认事件，发送意图、固定 UUID 和回执持久化在本机 .local/ 中。
定时任务是否已启用、是否有额度、是否能联网均需独立验收，本轮没有修改它们。

工程审查记录在本地交付分支的 `reports/audits/REVIEW.md`。新增文件在获得远程写入授权前不应被描述为 GitHub 已发布成果。

## 本机行情与飞书

```text
python scripts/live_market.py --port 8765
python scripts/refresh_market.py                          # 仅生成完整候选包
python scripts/refresh_market.py --apply                  # 通过严格校验后同批更新本地数据/状态
python scripts/refresh_market.py --provider akshare --apply
python scripts/send_feishu.py weekly                     # 周报摘要预览
python scripts/send_feishu.py weekly --send               # 显式发送
python scripts/send_feishu.py drawdown                    # 当前收盘档位提醒预览
```

Windows 可将 python 换为 `.venv\Scripts\python.exe`。本机行情地址为 http://127.0.0.1:8765/#market 。页面可见时约每 15 秒读取一次，标明时段、成交时间、抓取时间、缺失和过期状态。该入口仅绑定本机回环地址，公开 GitHub Pages 展示收盘快照。

来源/复权变化需要先复核候选包，再显式使用 `--accept-source-change` 建立新基线。不要把此参数无条件加入定时任务。整批更新失败保留原数据，候选证据保存在 `.local/candidates/`。

飞书默认从 `ASSET_FEISHU_APP_ID`、`ASSET_FEISHU_APP_SECRET`、`ASSET_FEISHU_RECEIVE_ID` 读取配置。也可在不入库的 `.local/feishu-config.json` 中设置 `envPrefix` 和 `receiveId`，复用已有机器人环境变量。`--send` 才实际发送。网络结果不明时，45 分钟内沿用已保存的正文和 UUID 重试，超过窗口停止并要求核查群消息。请保留 `.local/feishu-delivery.json`，防止跨次重复发送。研究周报按研究年/周去重，回撤提醒按事件 ID 去重。

回撤提醒须先通过行情发布校验并开启发布策略中的提醒开关。当前外部定时任务未改动，实际运行频率以任务配置和回执为准。

## 免责

本系统为个人研究用，所有配置权重为基于历史数据与宏观环境的建议值，非投资承诺。

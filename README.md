# 资产产品分析（Asset Library）

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

## 更新工作流（每周日 20:00 定时）

1. 拉取核心资产估值/价格/宏观数据 → 更新 `data.js` 的 `signal`（周期/估值/溢价/回撤）与 `decision`（权重/动作/条件）
2. **发布前必须自检**：`node validate.js` —— A股/美股三档权重非 100% 直接报错，禁止静默发布
3. 在 `history` 追加"本周 vs 上周"快照，在 `log` 记录变更
4. 生成本周周报 `reports/2026-Wxx.md`，同步关键结论到飞书文档
5. `git add . && git commit && git push` → GitHub Pages 自动更新

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

## 数据源

- 实时估值/行情：豆包金融搜索（同花顺数据合作）
- 估值分位：中证指数官网、理杏仁 API、雪球/指数估值周报
- 历史数据/宏观：AkShare、FRED、GitHub 开源（aiagents-stock 康波模块、global-equity-valuations-api）

## 免责

本系统为个人研究用，所有配置权重为基于历史数据与宏观环境的建议值，非投资承诺。

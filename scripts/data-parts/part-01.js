/* ============================================================
 * 资产产品分析 · 数据层（唯一规范源 Single Source of Truth）
 * 版本：v4.0 重构版（2026-10-08）
 * ------------------------------------------------------------
 * 结构分层：
 *   static   —— 低频事实：代码/名称/市场/类别/跟踪底层/费率/规模/风险等级/产品结构/重叠度
 *   signal   —— 每周信号：asOf/周期/估值/溢价/回撤/价格/来源/置信度
 *   decision —— 投资决策：三档权重/动作/买入条件/减仓条件/失效条件/理由
 *   ret      —— 预期年化（结构化 low/high）
 *   vd       —— 当前观点（展示摘要）
 *   hz       —— 三档周期推演（1-3 / 3-5 / 5-10 年）
 * ------------------------------------------------------------
 * 修改约定：
 * 1. A股三档权重分别必须 = 100，美股三档分别必须 = 100（validate.js 强制校验）
 * 2. 所有 signal 字段必须携带 asOf（数据日期）
 * 3. 每周更新：改 signal / decision 字段 + history 追加本周对比 + log 追加
 * 4. 发布前必须执行：node validate.js
 * ============================================================ */
(function (root) {
"use strict";
var ASSETS = {
  meta: {
    marketPriceNote: "基金/ETF本身的未复权正式收盘价，研究日期与结论未更新；不与底层指数点位混用。",
    marketSnapshot: "snapshots/prices/2026-11-14T193825.json",
    marketUpdated: "2026-11-14T11:38:25.711579+00:00",
    updated: "2026-11-13",
    week: "W46",
    validatorVersion: "1.0.0",
    generatedBy: "asset-library-weekly-46",
    note: "rk=风险等级1-5；ret=预期年化(结构化估算)；drawdown 拆三类：normal(正常周期)/stress(压力测试)/historicalMax(历史最大)。所有信号字段携带 asOf 数据日期与 source。周期(cyc)与估值(val)为 AI 结合宏观+康波推演的估算，附 cycleType/cycleMethod/cycleReason/confidence。"
  },
  snap: {
    d: "2026-11-13",
    t: "第46周估值周报"
  },
  checklist: [
    "先看周期位置：当前资产处于康波/行业周期的哪个阶段？不抢跑、不接飞刀",
    "再核估值分位：<30 低估可布局，30-60 中性，>80 高估需谨慎",
    "回撤维度：距52周高点回撤多少？潜在最大回撤能否承受？",
    "宏观环境：降息/加息周期？美债收益率方向？地缘风险？",
    "溢价检查：QDII 溢价 >3% 用 IBKR 直投替代，不付溢价",
    "重叠检查：同组高度重叠资产（科技/半导体/港股互联网）合并计算，不重复加码",
    "单日亏损达 2%-5% 立即停止开单（铁律）",
    "出金手续费计入对应账户亏损，不从核定本金扣除",
    "调仓后更新本表与周报，数据非100%合规不得发布"
  ],
  summary: [
    { k: "美股", v: "强劲反弹但与利率上行背离：VOO+2.57%、QQQM+3.61%、SPMO+6.35%、SOXX+9.35%，价格分位89-99极高、标普PE25.8，反弹由资金/情绪驱动，不追高" },
    { k: "宏观转向", v: "美债收益率大幅反弹：10年+29bp至5.15%、2年+37bp至4.88%、30年至5.47%，W45利率下行判断短期逆转，高利率或更持久，高估值成长折现压力回升" },
    { k: "A股", v: "结构分化、窄幅震荡：科创50+2.11%、银行+2.12%，沪深300-0.94%、创业板-1.59%；整体绝对估值仍低，等右侧确认不追单日急涨" },
    { k: "A股宽基", v: "沪深300 PE13.83、A500 PE9.1极低（股息3.03%/4.66%），底仓可分批；银行价格分位97.5但PE7.54、股息4.66%，属价格高位、估值仍低" },
    { k: "黄金/商品", v: "上海金-3.57%连续走弱，实际利率反弹压制，企稳再分批；豆粕+2.21%、价格分位44.6，农产品底部低相关" }
  ],
  marketBrief: {
    "asOf": "2026-11-13",
    "reviewedAt": "2026-11-14",
    "headline": "美股短线反弹，近 20 日美国红利强于科技。A 股宽基仍偏弱，欧洲与香港股票同期上涨。",
    "sections": [
      {
        "title": "全球大盘与联动",
        "evidence": "近 5 日 SPY +2.60%、沪深 300 ETF −0.99%。近 20 日欧洲 VGK +2.00%、香港 EWH +4.39%、日本 EWJ −3.29%。",
        "interpretation": "近 60 组隔夜配对，SPY 与沪深 300 ETF 的相关系数为 0.13，QQQ 与创业板 ETF 为 0.15。两地近 20 日都承压，但单看隔夜美股信号，解释力有限。",
        "watch": "沪深 300 与创业板能否共同改善。科创 50 ETF 近 5 日反弹 2.11%，后续要看反弹能否扩散。"
      },
      {
        "title": "宏观与利率",
        "evidence": "美国 10 年期国债收益率从 11 月 6 日的 4.86% 升到 11 月 13 日的 5.15%。美国 10 月 CPI 环比 +0.4%，PPI 同比 +6.5%。中国 10 月 CPI 同比 +0.7%，PPI 同比 +5.7%。",
        "interpretation": "美债收益率上升会增加高估值成长股的折现压力。中国消费端与工业出厂端价格增速分化，A 股还要结合国内需求和企业盈利观察。",
        "watch": "美债收益率是否回落，以及中国 11 月 16 日公布的 10 月消费与工业生产数据。"
      },
      {
        "title": "风格与个股",
        "evidence": "近 20 日 SCHD +5.15%、QQQ −4.21%、SMH −9.83%。SCHD 11 月 12 日披露持仓中，德州仪器、宝洁、可口可乐分别占 4.76%、4.41%、4.28%。伯克希尔 B、好市多作为独立样本，同期分别 +11.45%、+11.84%。",
        "interpretation": "标普等权近 20 日涨 3.30%，同期 SPY 跌 1.16%，分化超出了红利板块。QQQ 近 5 日涨 3.63%，英伟达却跌 12.75%。A 股上证红利 ETF 近 20 日跌 1.63%。",
        "watch": "看 QQQ 反弹能否延伸到半导体。可口可乐关注销量与提价，伯克希尔看保险承保和资本配置，好市多看同店销售与会员费。"
      }
    ],
    "priceMethod": "长桥日线前复权收盘，涨跌为最新收盘 ÷ 第 5 或第 20 个前序交易日收盘 − 1，分别以 11 月 6 日、10 月 16 日为基准。用 ETF 观察指数与风格，香港、日本、欧洲代理在美上市，包含汇率和交易时段差异。",
    "linkageMethod": "联动样本覆盖 2026-08-13 至 2026-11-13 的 60 个 A 股交易日。每次用两次 A 股收盘之间最后一次美股收盘的单日涨跌配对，无新美股收盘的日期跳过。相关系数为 Pearson 样本相关，不推断因果。",
    "sources": [
      {
        "label": "长桥行情",
        "url": "https://open.longbridge.com/docs/quote/pull/history-candlestick"
      },
      {
        "label": "美国财政部国债收益率",
        "url": "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve&field_tdr_date_value_month=202611"
      },
      {
        "label": "美国 10 月 CPI",
        "url": "https://www.bls.gov/news.release/archives/cpi_11102026.htm"
      },
      {
        "label": "美国 10 月 PPI",
        "url": "https://www.bls.gov/news.release/archives/ppi_11132026.htm"
      },
      {
        "label": "中国 10 月 CPI 与 PPI",
        "url": "https://www.stats.gov.cn/sj/zxfbhjd/202611/t20261109_1965796.html"
      },
      {
        "label": "国家统计局发布日程",
        "url": "https://www.stats.gov.cn/sj/fbrc/bnxxfb/"
      },
      {
        "label": "SCHD 发行商持仓",
        "url": "https://www.schwabassetmanagement.com/products/schd"
      }
    ],
    "prices": [
      {"label": "美国 · 标普 500", "symbol": "SPY.US", "close": 754.37, "base5": 735.29, "base20": 763.25},
      {"label": "美国 · 纳斯达克 100", "symbol": "QQQ.US", "close": 679.89, "base5": 656.1, "base20": 709.8},
      {"label": "中国内地 · 沪深 300", "symbol": "510300.SH", "close": 4.083, "base5": 4.124, "base20": 4.236},
      {"label": "中国内地 · 创业板", "symbol": "159915.SZ", "close": 2.442, "base5": 2.48, "base20": 2.789},
      {"label": "中国内地 · 科创 50", "symbol": "588000.SH", "close": 1.354, "base5": 1.326, "base20": 1.43},
      {"label": "香港股票", "symbol": "EWH.US", "close": 23.06, "base5": 23.32, "base20": 22.09},
      {"label": "日本股票", "symbol": "EWJ.US", "close": 91.76, "base5": 88.26, "base20": 94.88},
      {"label": "欧洲股票", "symbol": "VGK.US", "close": 89.04, "base5": 87.31, "base20": 87.29},
      {"label": "美股红利", "symbol": "SCHD.US", "close": 36.12, "base5": 35.17, "base20": 34.35},
      {"label": "标普 500 等权", "symbol": "RSP.US", "close": 221.16, "base5": 216.05, "base20": 214.09},
      {"label": "美国医疗", "symbol": "XLV.US", "close": 188.85, "base5": 184.8, "base20": 176.71},
      {"label": "美国必需消费", "symbol": "XLP.US", "close": 92.35, "base5": 90.08, "base20": 87.62},
      {"label": "半导体", "symbol": "SMH.US", "close": 486.75, "base5": 463.96, "base20": 539.79},
      {"label": "A 股 · 上证红利", "symbol": "510880.SH", "close": 3.374, "base5": 3.371, "base20": 3.43},
      {"label": "黄金", "symbol": "GLD.US", "close": 355.45, "base5": 372.52, "base20": 382.01},
      {"label": "可口可乐", "symbol": "KO.US", "close": 99.25, "base5": 95.67, "base20": 93.9},
      {"label": "宝洁", "symbol": "PG.US", "close": 169.8, "base5": 165.4, "base20": 159.35},
      {"label": "德州仪器", "symbol": "TXN.US", "close": 303.6, "base5": 277.36, "base20": 276.48},
      {"label": "伯克希尔 B", "symbol": "BRK.B.US", "close": 592.94, "base5": 570.89, "base20": 532.02},
      {"label": "好市多", "symbol": "COST.US", "close": 1106.21, "base5": 1053.56, "base20": 989.11},
      {"label": "英伟达", "symbol": "NVDA.US", "close": 162.85, "base5": 186.64, "base20": 214.13}
    ]
  },
  portfolio: {

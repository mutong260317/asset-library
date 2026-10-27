/* ============================================================
 * 宽基指数回撤分析数据（自动生成，请勿手改）
 * 生成脚本：scripts/fetch_drawdown.py
 * 刷新频率：每天 06:30（美股收盘后）、15:30（A股收盘后）
 * ============================================================ */
window.DRAWDOWN = {
  "meta": {
    "asOf": "2026-10-28 06:36",
    "generatedBy": "scripts/fetch_drawdown.py",
    "refreshCadence": "每天",
    "sources": {
      "US": "主 Yahoo Finance chart API（5y日线），备 AkShare新浪 stock_us_daily（历史完整），再用腾讯美股接口补最新交易日",
      "A": "主 腾讯证券 fqkline（约8年日线），备 AkShare新浪 stock_zh_index_daily（历史完整），再用新浪实时 hq.sinajs.cn 补当日收盘"
    },
    "note": "ATH 统一为最近约8年（2000交易日）且在指数实际发布/可投资起点之后的盘中最高（A股老指数从2018起、新指数从发布起，不回溯到2007/2015等历史泡沫，保证不同数据源口径一致）；回撤档位从ATH起算；平台为近1年日线密集成交区、取中位数；levels/platforms的dist为目标价相对当前价的涨跌幅（负=需下跌到达，正=需上涨到达）；ma200.dist为当前价相对均线的偏离；新跌破-10/-20/-30/-40/-50%档时自动飞书提醒。"
  },
  "indices": [
    {
      "code": "QQQ",
      "name": "纳斯达克100",
      "market": "US",
      "ccy": "USD",
      "source": "AkShare(新浪)+腾讯补最新",
      "asOf": "2026-10-27",
      "price": 721.25,
      "ath": {
        "value": 762.86,
        "date": "2026-10-06"
      },
      "drawdown": -0.0545,
      "ma200": {
        "value": 676.95,
        "dist": 0.0654
      },
      "levels": [
        {"d": -0.1, "price": 686.57, "dist": -0.0481, "hit": false},
        {"d": -0.2, "price": 610.29, "dist": -0.1538, "hit": false},
        {"d": -0.3, "price": 534.0, "dist": -0.2596, "hit": false},
        {"d": -0.4, "price": 457.72, "dist": -0.3654, "hit": false},
        {"d": -0.5, "price": 381.43, "dist": -0.4712, "hit": false}
      ],
      "platforms": [
        {"low": 703.5, "high": 742.65, "mid": 719.28, "days": 96, "first": "2026-05-08", "last": "2026-10-27", "type": "current", "dist": -0.0027},
        {"low": 597.32, "high": 624.87, "mid": 612.15, "days": 86, "first": "2025-10-30", "last": "2026-04-13", "type": "support", "dist": -0.1513}
      ],
      "zone": "高位区",
      "zoneDesc": "无回撤，不追高"
    },
    {
      "code": "SPY",
      "name": "标普500",
      "market": "US",
      "ccy": "USD",
      "source": "AkShare(新浪)+腾讯补最新",
      "asOf": "2026-10-27",
      "price": 769.66,
      "ath": {
        "value": 781.62,
        "date": "2026-10-06"
      },
      "drawdown": -0.0153,
      "ma200": {
        "value": 724.68,
        "dist": 0.0621
      },
      "levels": [
        {"d": -0.1, "price": 703.46, "dist": -0.086, "hit": false},
        {"d": -0.2, "price": 625.3, "dist": -0.1876, "hit": false},
        {"d": -0.3, "price": 547.13, "dist": -0.2891, "hit": false},
        {"d": -0.4, "price": 468.97, "dist": -0.3907, "hit": false},
        {"d": -0.5, "price": 390.81, "dist": -0.4922, "hit": false}
      ],
      "platforms": [
        {"low": 670.74, "high": 688.48, "mid": 679.43, "days": 75, "first": "2025-10-29", "last": "2026-04-13", "type": "support", "dist": -0.1172},
        {"low": 761.58, "high": 769.66, "mid": 765.91, "days": 32, "first": "2026-08-04", "last": "2026-10-27", "type": "current", "dist": -0.0049},
        {"low": 733.83, "high": 745.82, "mid": 739.63, "days": 31, "first": "2026-05-08", "last": "2026-07-31", "type": "support", "dist": -0.039}
      ],
      "zone": "高位区",
      "zoneDesc": "无回撤，不追高"
    },
    {
      "code": "DIA",
      "name": "道琼斯工业",
      "market": "US",
      "ccy": "USD",
      "source": "AkShare(新浪)+腾讯补最新",
      "asOf": "2026-10-27",
      "price": 523.28,
      "ath": {
        "value": 545.01,
        "date": "2026-08-05"
      },
      "drawdown": -0.0399,
      "ma200": {
        "value": 502.69,
        "dist": 0.041
      },
      "levels": [
        {"d": -0.1, "price": 490.51, "dist": -0.0626, "hit": false},
        {"d": -0.2, "price": 436.01, "dist": -0.1668, "hit": false},
        {"d": -0.3, "price": 381.5, "dist": -0.2709, "hit": false},
        {"d": -0.4, "price": 327.0, "dist": -0.3751, "hit": false},
        {"d": -0.5, "price": 272.5, "dist": -0.4792, "hit": false}
      ],
      "platforms": [
        {"low": 513.4, "high": 524.06, "mid": 518.53, "days": 52, "first": "2026-06-04", "last": "2026-10-27", "type": "current", "dist": -0.0091},
        {"low": 483.24, "high": 492.34, "mid": 487.98, "days": 49, "first": "2026-01-05", "last": "2026-05-19", "type": "support", "dist": -0.0675},
        {"low": 472.22, "high": 479.03, "mid": 475.67, "days": 25, "first": "2025-11-11", "last": "2026-04-13", "type": "support", "dist": -0.091}
      ],
      "zone": "高位区",
      "zoneDesc": "无回撤，不追高"
    },
    {
      "code": "IWM",
      "name": "罗素2000",
      "market": "US",
      "ccy": "USD",
      "source": "AkShare(新浪)+腾讯补最新",
      "asOf": "2026-10-27",
      "price": 280.18,
      "ath": {
        "value": 304.43,
        "date": "2026-08-14"
      },
      "drawdown": -0.0797,
      "ma200": {
        "value": 277.33,
        "dist": 0.0103
      },
      "levels": [
        {"d": -0.1, "price": 273.99, "dist": -0.0221, "hit": false},
        {"d": -0.2, "price": 243.54, "dist": -0.1308, "hit": false},
        {"d": -0.3, "price": 213.1, "dist": -0.2394, "hit": false},
        {"d": -0.4, "price": 182.66, "dist": -0.3481, "hit": false},
        {"d": -0.5, "price": 152.21, "dist": -0.4567, "hit": false}
      ],
      "platforms": [
        {"low": 288.92, "high": 299.48, "mid": 294.28, "days": 58, "first": "2026-05-26", "last": "2026-09-09", "type": "resistance", "dist": 0.0503},
        {"low": 275.03, "high": 283.92, "mid": 279.34, "days": 45, "first": "2026-04-20", "last": "2026-10-27", "type": "current", "dist": -0.003},
        {"low": 245.35, "high": 251.12, "mid": 248.21, "days": 33, "first": "2025-11-28", "last": "2026-04-06", "type": "support", "dist": -0.1141},
        {"low": 259.46, "high": 263.62, "mid": 261.56, "days": 27, "first": "2026-01-12", "last": "2026-04-13", "type": "support", "dist": -0.0665}
      ],
      "zone": "高位区",
      "zoneDesc": "无回撤，不追高"
    },
    {
      "code": "SH000001",
      "name": "上证指数",
      "market": "A",
      "ccy": "CNY",
      "source": "腾讯证券",
      "asOf": "2026-10-27",
      "price": 3648.3,
      "ath": {
        "value": 4258.86,
        "date": "2026-05-14"
      },
      "drawdown": -0.1434,
      "ma200": {
        "value": 3998.4,
        "dist": -0.0876
      },
      "levels": [
        {"d": -0.1, "price": 3832.97, "dist": 0.0506, "hit": true},
        {"d": -0.2, "price": 3407.09, "dist": -0.0661, "hit": false},
        {"d": -0.3, "price": 2981.2, "dist": -0.1829, "hit": false},
        {"d": -0.4, "price": 2555.32, "dist": -0.2996, "hit": false},
        {"d": -0.5, "price": 2129.43, "dist": -0.4163, "hit": false}
      ],
      "platforms": [
        {"low": 3863.89, "high": 3990.49, "mid": 3925.16, "days": 105, "first": "2025-10-16", "last": "2026-09-24", "type": "resistance", "dist": 0.0759},
        {"low": 4077.28, "high": 4135.39, "mid": 4106.3, "days": 55, "first": "2026-01-06", "last": "2026-07-01", "type": "resistance", "dist": 0.1255}
      ],
      "zone": "浅回调",
      "zoneDesc": "关注，等更深回调"
    },
    {
      "code": "SH000300",
      "name": "沪深300",
      "market": "A",
      "ccy": "CNY",
      "source": "腾讯证券",
      "asOf": "2026-10-27",
      "price": 4049.55,
      "ath": {
        "value": 5930.91,
        "date": "2021-02-18"
      },
      "drawdown": -0.3172,
      "ma200": {
        "value": 4662.81,
        "dist": -0.1315
      },
      "levels": [
        {"d": -0.1, "price": 5337.82, "dist": 0.3181, "hit": true},
        {"d": -0.2, "price": 4744.73, "dist": 0.1717, "hit": true},
        {"d": -0.3, "price": 4151.64, "dist": 0.0252, "hit": true},
        {"d": -0.4, "price": 3558.55, "dist": -0.1212, "hit": false},
        {"d": -0.5, "price": 2965.45, "dist": -0.2677, "hit": false}
      ],
      "platforms": [
        {"low": 4507.39, "high": 4792.26, "mid": 4651.81, "days": 172, "first": "2025-10-16", "last": "2026-09-23", "type": "resistance", "dist": 0.1487}
      ],
      "zone": "深度机会",
      "zoneDesc": "回撤30-40%，重点加仓"
    },
    {
      "code": "SH000510",
      "name": "中证A500",
      "market": "A",
      "ccy": "CNY",
      "source": "腾讯证券",
      "asOf": "2026-10-27",
      "price": 4901.61,
      "ath": {
        "value": 6375.33,
        "date": "2026-06-22"
      },
      "drawdown": -0.2312,
      "ma200": {
        "value": 5801.09,
        "dist": -0.1551
      },
      "levels": [
        {"d": -0.1, "price": 5737.8, "dist": 0.1706, "hit": true},
        {"d": -0.2, "price": 5100.26, "dist": 0.0405, "hit": true},
        {"d": -0.3, "price": 4462.73, "dist": -0.0895, "hit": false},
        {"d": -0.4, "price": 3825.2, "dist": -0.2196, "hit": false},
        {"d": -0.5, "price": 3187.66, "dist": -0.3497, "hit": false}
      ],
      "platforms": [
        {"low": 5461.75, "high": 5659.05, "mid": 5571.03, "days": 81, "first": "2025-10-16", "last": "2026-09-24", "type": "resistance", "dist": 0.1366},
        {"low": 5789.89, "high": 5984.75, "mid": 5887.29, "days": 76, "first": "2026-01-06", "last": "2026-08-18", "type": "resistance", "dist": 0.2011},
        {"low": 6111.15, "high": 6135.86, "mid": 6119.7, "days": 9, "first": "2026-05-06", "last": "2026-07-09", "type": "resistance", "dist": 0.2485}
      ],
      "zone": "加仓区",
      "zoneDesc": "回撤20-30%，分批加仓窗口"
    },
    {
      "code": "SZ399006",
      "name": "创业板指",
      "market": "A",
      "ccy": "CNY",
      "source": "腾讯证券",
      "asOf": "2026-10-27",
      "price": 2548.15,
      "ath": {
        "value": 4380.41,
        "date": "2026-06-25"
      },
      "drawdown": -0.4183,
      "ma200": {
        "value": 3495.95,
        "dist": -0.2711
      },
      "levels": [
        {"d": -0.1, "price": 3942.37, "dist": 0.5471, "hit": true},
        {"d": -0.2, "price": 3504.33, "dist": 0.3752, "hit": true},
        {"d": -0.3, "price": 3066.29, "dist": 0.2033, "hit": true},
        {"d": -0.4, "price": 2628.25, "dist": 0.0314, "hit": true},
        {"d": -0.5, "price": 2190.2, "dist": -0.1405, "hit": false}
      ],
      "platforms": [
        {"low": 3031.3, "high": 3379.61, "mid": 3237.01, "days": 135, "first": "2025-10-16", "last": "2026-10-09", "type": "resistance", "dist": 0.2703},
        {"low": 4017.27, "high": 4043.07, "mid": 4028.68, "days": 8, "first": "2026-05-13", "last": "2026-07-09", "type": "resistance", "dist": 0.581}
      ],
      "zone": "极端区",
      "zoneDesc": "回撤40-50%，熊市机会"
    },
    {
      "code": "SH000688",
      "name": "科创50",
      "market": "A",
      "ccy": "CNY",
      "source": "腾讯证券",
      "asOf": "2026-10-27",
      "price": 1252.28,
      "ath": {
        "value": 2255.25,
        "date": "2026-07-01"
      },
      "drawdown": -0.4447,
      "ma200": {
        "value": 1588.8,
        "dist": -0.2118
      },
      "levels": [
        {"d": -0.1, "price": 2029.73, "dist": 0.6208, "hit": true},
        {"d": -0.2, "price": 1804.2, "dist": 0.4407, "hit": true},
        {"d": -0.3, "price": 1578.67, "dist": 0.2606, "hit": true},
        {"d": -0.4, "price": 1353.15, "dist": 0.0805, "hit": true},
        {"d": -0.5, "price": 1127.62, "dist": -0.0995, "hit": false}
      ],
      "platforms": [
        {"low": 1290.79, "high": 1493.95, "mid": 1390.06, "days": 123, "first": "2025-10-16", "last": "2026-10-26", "type": "resistance", "dist": 0.11},
        {"low": 1656.95, "high": 1668.33, "mid": 1662.8, "days": 11, "first": "2026-05-06", "last": "2026-09-23", "type": "resistance", "dist": 0.3278},
        {"low": 1541.64, "high": 1555.98, "mid": 1552.54, "days": 8, "first": "2026-01-22", "last": "2026-09-28", "type": "resistance", "dist": 0.2398},
        {"low": 1715.4, "high": 1726.18, "mid": 1720.16, "days": 8, "first": "2026-05-11", "last": "2026-08-14", "type": "resistance", "dist": 0.3736}
      ],
      "zone": "极端区",
      "zoneDesc": "回撤40-50%，熊市机会"
    }
  ]
};

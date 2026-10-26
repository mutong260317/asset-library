/* ============================================================
 * 宽基指数回撤分析数据（自动生成，请勿手改）
 * 生成脚本：scripts/fetch_drawdown.py
 * 刷新频率：每天 06:30（美股收盘后）、15:30（A股收盘后）
 * ============================================================ */
window.DRAWDOWN = {
  "meta": {
    "asOf": "2026-10-27 06:40",
    "generatedBy": "scripts/fetch_drawdown.py",
    "refreshCadence": "每天",
    "sources": {
      "US": "主 Yahoo Finance chart API（5y日线），备 AkShare新浪 stock_us_daily（历史完整），再用腾讯美股接口补最新交易日",
      "A": "主 腾讯证券 fqkline（约8年日线），备 AkShare新浪 stock_zh_index_daily"
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
      "asOf": "2026-10-26",
      "price": 712.2,
      "ath": {
        "value": 762.86,
        "date": "2026-10-06"
      },
      "drawdown": -0.0664,
      "ma200": {
        "value": 676.47,
        "dist": 0.0528
      },
      "levels": [
        {
          "d": -0.1,
          "price": 686.57,
          "dist": -0.036,
          "hit": false
        },
        {
          "d": -0.2,
          "price": 610.29,
          "dist": -0.1431,
          "hit": false
        },
        {
          "d": -0.3,
          "price": 534.0,
          "dist": -0.2502,
          "hit": false
        },
        {
          "d": -0.4,
          "price": 457.72,
          "dist": -0.3573,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 381.43,
          "dist": -0.4644,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 703.5,
          "high": 742.65,
          "mid": 719.26,
          "days": 95,
          "first": "2026-05-08",
          "last": "2026-10-26",
          "type": "current",
          "dist": 0.0099
        },
        {
          "low": 597.32,
          "high": 624.87,
          "mid": 612.15,
          "days": 86,
          "first": "2025-10-30",
          "last": "2026-04-13",
          "type": "support",
          "dist": -0.1405
        }
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
      "asOf": "2026-10-26",
      "price": 765.37,
      "ath": {
        "value": 781.62,
        "date": "2026-10-06"
      },
      "drawdown": -0.0208,
      "ma200": {
        "value": 724.27,
        "dist": 0.0567
      },
      "levels": [
        {
          "d": -0.1,
          "price": 703.46,
          "dist": -0.0809,
          "hit": false
        },
        {
          "d": -0.2,
          "price": 625.3,
          "dist": -0.183,
          "hit": false
        },
        {
          "d": -0.3,
          "price": 547.13,
          "dist": -0.2851,
          "hit": false
        },
        {
          "d": -0.4,
          "price": 468.97,
          "dist": -0.3873,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 390.81,
          "dist": -0.4894,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 670.74,
          "high": 688.48,
          "mid": 679.43,
          "days": 76,
          "first": "2025-10-28",
          "last": "2026-04-13",
          "type": "support",
          "dist": -0.1123
        },
        {
          "low": 733.83,
          "high": 745.82,
          "mid": 739.63,
          "days": 31,
          "first": "2026-05-08",
          "last": "2026-07-31",
          "type": "support",
          "dist": -0.0336
        },
        {
          "low": 761.58,
          "high": 769.64,
          "mid": 765.79,
          "days": 31,
          "first": "2026-08-04",
          "last": "2026-10-26",
          "type": "current",
          "dist": 0.0005
        }
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
      "asOf": "2026-10-26",
      "price": 522.97,
      "ath": {
        "value": 545.01,
        "date": "2026-08-05"
      },
      "drawdown": -0.0404,
      "ma200": {
        "value": 502.52,
        "dist": 0.0407
      },
      "levels": [
        {
          "d": -0.1,
          "price": 490.51,
          "dist": -0.0621,
          "hit": false
        },
        {
          "d": -0.2,
          "price": 436.01,
          "dist": -0.1663,
          "hit": false
        },
        {
          "d": -0.3,
          "price": 381.5,
          "dist": -0.2705,
          "hit": false
        },
        {
          "d": -0.4,
          "price": 327.0,
          "dist": -0.3747,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 272.5,
          "dist": -0.4789,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 513.4,
          "high": 524.06,
          "mid": 518.44,
          "days": 51,
          "first": "2026-06-04",
          "last": "2026-10-26",
          "type": "current",
          "dist": -0.0087
        },
        {
          "low": 483.24,
          "high": 492.34,
          "mid": 487.98,
          "days": 49,
          "first": "2026-01-05",
          "last": "2026-05-19",
          "type": "support",
          "dist": -0.0669
        },
        {
          "low": 472.22,
          "high": 479.03,
          "mid": 475.67,
          "days": 25,
          "first": "2025-11-11",
          "last": "2026-04-13",
          "type": "support",
          "dist": -0.0904
        }
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
      "asOf": "2026-10-26",
      "price": 276.99,
      "ath": {
        "value": 304.43,
        "date": "2026-08-14"
      },
      "drawdown": -0.0901,
      "ma200": {
        "value": 277.22,
        "dist": -0.0008
      },
      "levels": [
        {
          "d": -0.1,
          "price": 273.99,
          "dist": -0.0108,
          "hit": false
        },
        {
          "d": -0.2,
          "price": 243.54,
          "dist": -0.1207,
          "hit": false
        },
        {
          "d": -0.3,
          "price": 213.1,
          "dist": -0.2307,
          "hit": false
        },
        {
          "d": -0.4,
          "price": 182.66,
          "dist": -0.3406,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 152.21,
          "dist": -0.4505,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 288.92,
          "high": 299.48,
          "mid": 294.28,
          "days": 58,
          "first": "2026-05-26",
          "last": "2026-09-09",
          "type": "resistance",
          "dist": 0.0624
        },
        {
          "low": 275.03,
          "high": 283.92,
          "mid": 279.32,
          "days": 44,
          "first": "2026-04-20",
          "last": "2026-10-26",
          "type": "current",
          "dist": 0.0084
        },
        {
          "low": 245.35,
          "high": 251.12,
          "mid": 248.16,
          "days": 34,
          "first": "2025-10-28",
          "last": "2026-04-06",
          "type": "support",
          "dist": -0.1041
        },
        {
          "low": 259.46,
          "high": 263.62,
          "mid": 261.56,
          "days": 27,
          "first": "2026-01-12",
          "last": "2026-04-13",
          "type": "support",
          "dist": -0.0557
        }
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
      "asOf": "2026-10-26",
      "price": 3697.52,
      "ath": {
        "value": 4258.86,
        "date": "2026-05-14"
      },
      "drawdown": -0.1318,
      "ma200": {
        "value": 3999.86,
        "dist": -0.0756
      },
      "levels": [
        {
          "d": -0.1,
          "price": 3832.97,
          "dist": 0.0366,
          "hit": true
        },
        {
          "d": -0.2,
          "price": 3407.09,
          "dist": -0.0785,
          "hit": false
        },
        {
          "d": -0.3,
          "price": 2981.2,
          "dist": -0.1937,
          "hit": false
        },
        {
          "d": -0.4,
          "price": 2555.32,
          "dist": -0.3089,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 2129.43,
          "dist": -0.4241,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 3870.02,
          "high": 3996.94,
          "mid": 3931.19,
          "days": 104,
          "first": "2025-10-15",
          "last": "2026-09-24",
          "type": "resistance",
          "dist": 0.0632
        },
        {
          "low": 4079.9,
          "high": 4136.16,
          "mid": 4107.9,
          "days": 54,
          "first": "2026-01-06",
          "last": "2026-07-01",
          "type": "resistance",
          "dist": 0.111
        },
        {
          "low": 4023.42,
          "high": 4031.51,
          "mid": 4027.77,
          "days": 8,
          "first": "2025-11-13",
          "last": "2026-07-02",
          "type": "resistance",
          "dist": 0.0893
        }
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
      "asOf": "2026-10-26",
      "price": 4103.54,
      "ath": {
        "value": 5930.91,
        "date": "2021-02-18"
      },
      "drawdown": -0.3081,
      "ma200": {
        "value": 4665.73,
        "dist": -0.1205
      },
      "levels": [
        {
          "d": -0.1,
          "price": 5337.82,
          "dist": 0.3008,
          "hit": true
        },
        {
          "d": -0.2,
          "price": 4744.73,
          "dist": 0.1563,
          "hit": true
        },
        {
          "d": -0.3,
          "price": 4151.64,
          "dist": 0.0117,
          "hit": true
        },
        {
          "d": -0.4,
          "price": 3558.55,
          "dist": -0.1328,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 2965.45,
          "dist": -0.2773,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 4507.39,
          "high": 4792.26,
          "mid": 4651.54,
          "days": 173,
          "first": "2025-10-15",
          "last": "2026-09-23",
          "type": "resistance",
          "dist": 0.1335
        }
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
      "asOf": "2026-10-26",
      "price": 4989.34,
      "ath": {
        "value": 6375.33,
        "date": "2026-06-22"
      },
      "drawdown": -0.2174,
      "ma200": {
        "value": 5804.69,
        "dist": -0.1405
      },
      "levels": [
        {
          "d": -0.1,
          "price": 5737.8,
          "dist": 0.15,
          "hit": true
        },
        {
          "d": -0.2,
          "price": 5100.26,
          "dist": 0.0222,
          "hit": true
        },
        {
          "d": -0.3,
          "price": 4462.73,
          "dist": -0.1055,
          "hit": false
        },
        {
          "d": -0.4,
          "price": 3825.2,
          "dist": -0.2333,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 3187.66,
          "dist": -0.3611,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 5471.19,
          "high": 5669.91,
          "mid": 5575.57,
          "days": 82,
          "first": "2025-10-15",
          "last": "2026-09-24",
          "type": "resistance",
          "dist": 0.1175
        },
        {
          "low": 5789.89,
          "high": 5984.75,
          "mid": 5887.29,
          "days": 76,
          "first": "2026-01-06",
          "last": "2026-08-18",
          "type": "resistance",
          "dist": 0.18
        },
        {
          "low": 6111.15,
          "high": 6135.86,
          "mid": 6119.7,
          "days": 9,
          "first": "2026-05-06",
          "last": "2026-07-09",
          "type": "resistance",
          "dist": 0.2266
        }
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
      "asOf": "2026-10-26",
      "price": 2638.23,
      "ath": {
        "value": 4380.41,
        "date": "2026-06-25"
      },
      "drawdown": -0.3977,
      "ma200": {
        "value": 3499.36,
        "dist": -0.2461
      },
      "levels": [
        {
          "d": -0.1,
          "price": 3942.37,
          "dist": 0.4943,
          "hit": true
        },
        {
          "d": -0.2,
          "price": 3504.33,
          "dist": 0.3283,
          "hit": true
        },
        {
          "d": -0.3,
          "price": 3066.29,
          "dist": 0.1623,
          "hit": true
        },
        {
          "d": -0.4,
          "price": 2628.25,
          "dist": -0.0038,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 2190.2,
          "dist": -0.1698,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 3044.69,
          "high": 3399.93,
          "mid": 3252.93,
          "days": 135,
          "first": "2025-10-21",
          "last": "2026-09-30",
          "type": "resistance",
          "dist": 0.233
        },
        {
          "low": 4017.27,
          "high": 4045.77,
          "mid": 4030.58,
          "days": 9,
          "first": "2026-05-13",
          "last": "2026-07-09",
          "type": "resistance",
          "dist": 0.5278
        },
        {
          "low": 3908.44,
          "high": 3938.5,
          "mid": 3923.55,
          "days": 8,
          "first": "2026-05-11",
          "last": "2026-07-07",
          "type": "resistance",
          "dist": 0.4872
        }
      ],
      "zone": "深度机会",
      "zoneDesc": "回撤30-40%，重点加仓"
    },
    {
      "code": "SH000688",
      "name": "科创50",
      "market": "A",
      "ccy": "CNY",
      "source": "腾讯证券",
      "asOf": "2026-10-26",
      "price": 1315.5,
      "ath": {
        "value": 2255.25,
        "date": "2026-07-01"
      },
      "drawdown": -0.4167,
      "ma200": {
        "value": 1589.3,
        "dist": -0.1723
      },
      "levels": [
        {
          "d": -0.1,
          "price": 2029.73,
          "dist": 0.5429,
          "hit": true
        },
        {
          "d": -0.2,
          "price": 1804.2,
          "dist": 0.3715,
          "hit": true
        },
        {
          "d": -0.3,
          "price": 1578.67,
          "dist": 0.2001,
          "hit": true
        },
        {
          "d": -0.4,
          "price": 1353.15,
          "dist": 0.0286,
          "hit": true
        },
        {
          "d": -0.5,
          "price": 1127.62,
          "dist": -0.1428,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 1296.6,
          "high": 1484.21,
          "mid": 1386.94,
          "days": 116,
          "first": "2025-10-15",
          "last": "2026-10-26",
          "type": "current",
          "dist": 0.0543
        },
        {
          "low": 1656.95,
          "high": 1668.33,
          "mid": 1662.8,
          "days": 11,
          "first": "2026-05-06",
          "last": "2026-09-23",
          "type": "resistance",
          "dist": 0.264
        },
        {
          "low": 1602.34,
          "high": 1617.6,
          "mid": 1611.26,
          "days": 8,
          "first": "2026-08-04",
          "last": "2026-09-17",
          "type": "resistance",
          "dist": 0.2248
        },
        {
          "low": 1715.4,
          "high": 1726.18,
          "mid": 1720.16,
          "days": 8,
          "first": "2026-05-11",
          "last": "2026-08-14",
          "type": "resistance",
          "dist": 0.3076
        }
      ],
      "zone": "极端区",
      "zoneDesc": "回撤40-50%，熊市机会"
    }
  ]
};

/* ============================================================
 * 宽基指数回撤分析数据（自动生成，请勿手改）
 * 生成脚本：scripts/fetch_drawdown.py
 * 刷新频率：每天 06:30（美股收盘后）、15:30（A股收盘后）
 * ============================================================ */
window.DRAWDOWN = {
  "meta": {
    "asOf": "2026-10-24 22:46",
    "generatedBy": "scripts/fetch_drawdown.py",
    "refreshCadence": "每天",
    "sources": {
      "US": "主 Yahoo Finance chart API（5y日线），备 AkShare新浪 stock_us_daily",
      "A": "主 腾讯证券 fqkline（约8年日线），备 AkShare新浪 stock_zh_index_daily"
    },
    "note": "ATH为拉取范围内盘中最高；回撤档位从ATH起算；平台为近1年日线密集成交区、取中位数；levels/platforms的dist为目标价相对当前价的涨跌幅（负=需下跌到达，正=需上涨到达）；ma200.dist为当前价相对均线的偏离；新跌破-10/-20/-30/-40/-50%档时自动飞书提醒。"
  },
  "indices": [
    {
      "code": "QQQ",
      "name": "纳斯达克100",
      "market": "US",
      "ccy": "USD",
      "source": "AkShare(新浪)",
      "asOf": "2026-10-22",
      "price": 704.47,
      "ath": {
        "value": 762.86,
        "date": "2026-10-06"
      },
      "drawdown": -0.0765,
      "ma200": {
        "value": 675.59,
        "dist": 0.0428
      },
      "levels": [
        {
          "d": -0.1,
          "price": 686.57,
          "dist": -0.0254,
          "hit": false
        },
        {
          "d": -0.2,
          "price": 610.29,
          "dist": -0.1337,
          "hit": false
        },
        {
          "d": -0.3,
          "price": 534.0,
          "dist": -0.242,
          "hit": false
        },
        {
          "d": -0.4,
          "price": 457.72,
          "dist": -0.3503,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 381.43,
          "dist": -0.4586,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 703.5,
          "high": 742.65,
          "mid": 719.5,
          "days": 93,
          "first": "2026-05-08",
          "last": "2026-10-22",
          "type": "current",
          "dist": 0.0213
        },
        {
          "low": 597.32,
          "high": 625.0,
          "mid": 612.31,
          "days": 88,
          "first": "2025-10-24",
          "last": "2026-04-13",
          "type": "support",
          "dist": -0.1308
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
      "source": "AkShare(新浪)",
      "asOf": "2026-10-22",
      "price": 763.96,
      "ath": {
        "value": 781.62,
        "date": "2026-10-06"
      },
      "drawdown": -0.0226,
      "ma200": {
        "value": 723.49,
        "dist": 0.0559
      },
      "levels": [
        {
          "d": -0.1,
          "price": 703.46,
          "dist": -0.0792,
          "hit": false
        },
        {
          "d": -0.2,
          "price": 625.3,
          "dist": -0.1815,
          "hit": false
        },
        {
          "d": -0.3,
          "price": 547.13,
          "dist": -0.2838,
          "hit": false
        },
        {
          "d": -0.4,
          "price": 468.97,
          "dist": -0.3861,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 390.81,
          "dist": -0.4884,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 670.74,
          "high": 688.48,
          "mid": 679.41,
          "days": 77,
          "first": "2025-10-27",
          "last": "2026-04-13",
          "type": "support",
          "dist": -0.1107
        },
        {
          "low": 733.83,
          "high": 745.82,
          "mid": 739.63,
          "days": 31,
          "first": "2026-05-08",
          "last": "2026-07-31",
          "type": "support",
          "dist": -0.0318
        },
        {
          "low": 761.58,
          "high": 769.64,
          "mid": 765.8,
          "days": 30,
          "first": "2026-08-04",
          "last": "2026-10-22",
          "type": "current",
          "dist": 0.0024
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
      "source": "AkShare(新浪)",
      "asOf": "2026-10-22",
      "price": 527.89,
      "ath": {
        "value": 545.01,
        "date": "2026-08-05"
      },
      "drawdown": -0.0314,
      "ma200": {
        "value": 502.16,
        "dist": 0.0512
      },
      "levels": [
        {
          "d": -0.1,
          "price": 490.51,
          "dist": -0.0708,
          "hit": false
        },
        {
          "d": -0.2,
          "price": 436.01,
          "dist": -0.1741,
          "hit": false
        },
        {
          "d": -0.3,
          "price": 381.5,
          "dist": -0.2773,
          "hit": false
        },
        {
          "d": -0.4,
          "price": 327.0,
          "dist": -0.3805,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 272.5,
          "dist": -0.4838,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 483.24,
          "high": 492.34,
          "mid": 487.98,
          "days": 49,
          "first": "2026-01-05",
          "last": "2026-05-19",
          "type": "support",
          "dist": -0.0756
        },
        {
          "low": 513.4,
          "high": 524.06,
          "mid": 518.29,
          "days": 49,
          "first": "2026-06-04",
          "last": "2026-10-19",
          "type": "support",
          "dist": -0.0182
        },
        {
          "low": 472.22,
          "high": 479.03,
          "mid": 475.67,
          "days": 25,
          "first": "2025-11-11",
          "last": "2026-04-13",
          "type": "support",
          "dist": -0.0989
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
      "source": "AkShare(新浪)",
      "asOf": "2026-10-22",
      "price": 276.67,
      "ath": {
        "value": 304.43,
        "date": "2026-08-14"
      },
      "drawdown": -0.0912,
      "ma200": {
        "value": 277.0,
        "dist": -0.0012
      },
      "levels": [
        {
          "d": -0.1,
          "price": 273.99,
          "dist": -0.0097,
          "hit": false
        },
        {
          "d": -0.2,
          "price": 243.54,
          "dist": -0.1197,
          "hit": false
        },
        {
          "d": -0.3,
          "price": 213.1,
          "dist": -0.2298,
          "hit": false
        },
        {
          "d": -0.4,
          "price": 182.66,
          "dist": -0.3398,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 152.21,
          "dist": -0.4498,
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
          "dist": 0.0636
        },
        {
          "low": 275.03,
          "high": 283.92,
          "mid": 279.46,
          "days": 42,
          "first": "2026-04-20",
          "last": "2026-10-22",
          "type": "current",
          "dist": 0.0101
        },
        {
          "low": 245.35,
          "high": 51.12,
          "mid": 248.1,
          "days": 36,
          "first": "2025-10-24",
          "last": "2026-04-06",
          "type": "support",
          "dist": -0.1033
        },
        {
          "low": 259.46,
          "high": 263.62,
          "mid": 261.56,
          "days": 27,
          "first": "2026-01-12",
          "last": "2026-04-13",
          "type": "support",
          "dist": -0.0546
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
      "asOf": "2026-10-23",
      "price": 3690.48,
      "ath": {
        "value": 4258.86,
        "date": "2026-05-14"
      },
      "drawdown": -0.1335,
      "ma200": {
        "value": 4000.97,
        "dist": -0.0776
      },
      "levels": [
        {
          "d": -0.1,
          "price": 3832.97,
          "dist": 0.0386,
          "hit": true
        },
        {
          "d": -0.2,
          "price": 3407.09,
          "dist": -0.0768,
          "hit": false
        },
        {
          "d": -0.3,
          "price": 2981.2,
          "dist": -0.1922,
          "hit": false
        },
        {
          "d": -0.4,
          "price": 2555.32,
          "dist": -0.3076,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 2129.43,
          "dist": -0.423,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 3858.25,
          "high": 3996.94,
          "mid": 3926.42,
          "days": 112,
          "first": "2025-10-14",
          "last": "2026-09-24",
          "type": "resistance",
          "dist": 0.0639
        },
        {
          "low": 4079.9,
          "high": 4136.16,
          "mid": 4107.9,
          "days": 54,
          "first": "2026-01-06",
          "last": "2026-07-01",
          "type": "resistance",
          "dist": 0.1131
        },
        {
          "low": 4023.42,
          "high": 4031.51,
          "mid": 4027.77,
          "days": 8,
          "first": "2025-11-13",
          "last": "2026-07-02",
          "type": "resistance",
          "dist": 0.0914
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
      "asOf": "2026-10-23",
      "price": 4105.33,
      "ath": {
        "value": 5930.91,
        "date": "2021-02-18"
      },
      "drawdown": -0.3078,
      "ma200": {
        "value": 4668.32,
        "dist": -0.1206
      },
      "levels": [
        {
          "d": -0.1,
          "price": 5337.82,
          "dist": 0.3002,
          "hit": true
        },
        {
          "d": -0.2,
          "price": 4744.73,
          "dist": 0.1557,
          "hit": true
        },
        {
          "d": -0.3,
          "price": 4151.64,
          "dist": 0.0113,
          "hit": true
        },
        {
          "d": -0.4,
          "price": 3558.55,
          "dist": -0.1332,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 2965.45,
          "dist": -0.2777,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 4507.39,
          "high": 4792.26,
          "mid": 4650.9,
          "days": 174,
          "first": "2025-10-14",
          "last": "2026-09-23",
          "type": "resistance",
          "dist": 0.1329
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
      "asOf": "2026-10-23",
      "price": 5012.44,
      "ath": {
        "value": 6375.33,
        "date": "2026-06-22"
      },
      "drawdown": -0.2138,
      "ma200": {
        "value": 5807.71,
        "dist": -0.1369
      },
      "levels": [
        {
          "d": -0.1,
          "price": 5737.8,
          "dist": 0.1447,
          "hit": true
        },
        {
          "d": -0.2,
          "price": 5100.26,
          "dist": 0.0175,
          "hit": true
        },
        {
          "d": -0.3,
          "price": 4462.73,
          "dist": -0.1097,
          "hit": false
        },
        {
          "d": -0.4,
          "price": 3825.2,
          "dist": -0.2369,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 3187.66,
          "dist": -0.364,
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
          "dist": 0.1124
        },
        {
          "low": 5789.89,
          "high": 5984.75,
          "mid": 5887.18,
          "days": 76,
          "first": "2026-01-06",
          "last": "2026-08-18",
          "type": "resistance",
          "dist": 0.1745
        },
        {
          "low": 6111.15,
          "high": 6135.86,
          "mid": 6119.7,
          "days": 9,
          "first": "2026-05-06",
          "last": "2026-07-09",
          "type": "resistance",
          "dist": 0.2209
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
      "asOf": "2026-10-23",
      "price": 2684.1,
      "ath": {
        "value": 4380.41,
        "date": "2026-06-25"
      },
      "drawdown": -0.3872,
      "ma200": {
        "value": 3502.19,
        "dist": -0.2336
      },
      "levels": [
        {
          "d": -0.1,
          "price": 3942.37,
          "dist": 0.4688,
          "hit": true
        },
        {
          "d": -0.2,
          "price": 3504.33,
          "dist": 0.3056,
          "hit": true
        },
        {
          "d": -0.3,
          "price": 3066.29,
          "dist": 0.1424,
          "hit": true
        },
        {
          "d": -0.4,
          "price": 2628.25,
          "dist": -0.0208,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 2190.2,
          "dist": -0.184,
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
          "dist": 0.2119
        },
        {
          "low": 4017.27,
          "high": 4045.77,
          "mid": 4030.58,
          "days": 9,
          "first": "2026-05-13",
          "last": "2026-07-09",
          "type": "resistance",
          "dist": 0.5017
        },
        {
          "low": 3908.44,
          "high": 3938.5,
          "mid": 3923.55,
          "days": 8,
          "first": "2026-05-11",
          "last": "2026-07-07",
          "type": "resistance",
          "dist": 0.4618
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
      "asOf": "2026-10-23",
      "price": 1345.51,
      "ath": {
        "value": 2255.25,
        "date": "2026-07-01"
      },
      "drawdown": -0.4034,
      "ma200": {
        "value": 1589.42,
        "dist": -0.1535
      },
      "levels": [
        {
          "d": -0.1,
          "price": 2029.73,
          "dist": 0.5085,
          "hit": true
        },
        {
          "d": -0.2,
          "price": 1804.2,
          "dist": 0.3409,
          "hit": true
        },
        {
          "d": -0.3,
          "price": 1578.67,
          "dist": 0.1733,
          "hit": true
        },
        {
          "d": -0.4,
          "price": 1353.15,
          "dist": 0.0057,
          "hit": true
        },
        {
          "d": -0.5,
          "price": 1127.62,
          "dist": -0.1619,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 1296.6,
          "high": 1484.21,
          "mid": 1387.75,
          "days": 116,
          "first": "2025-10-14",
          "last": "2026-10-23",
          "type": "current",
          "dist": 0.0314
        },
        {
          "low": 1656.95,
          "high": 1668.33,
          "mid": 1662.8,
          "days": 11,
          "first": "2026-05-06",
          "last": "2026-09-23",
          "type": "resistance",
          "dist": 0.2358
        },
        {
          "low": 1602.34,
          "high": 1617.6,
          "mid": 1611.26,
          "days": 8,
          "first": "2026-08-04",
          "last": "2026-09-17",
          "type": "resistance",
          "dist": 0.1975
        },
        {
          "low": 1715.4,
          "high": 1726.18,
          "mid": 1720.16,
          "days": 8,
          "first": "2026-05-11",
          "last": "2026-08-14",
          "type": "resistance",
          "dist": 0.2784
        }
      ],
      "zone": "极端区",
      "zoneDesc": "回撤40-50%，熊市机会"
    }
  ]
};

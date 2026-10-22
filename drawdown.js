/* ============================================================
 * 宽基指数回撤分析数据（自动生成，请勿手改）
 * 生成脚本：scripts/fetch_drawdown.py
 * 刷新频率：每3天
 * ============================================================ */
window.DRAWDOWN = {
  "meta": {
    "asOf": "2026-10-22 19:33",
    "generatedBy": "scripts/fetch_drawdown.py",
    "refreshCadence": "每3天",
    "sources": {
      "US": "Yahoo Finance chart API（5y日线）",
      "A": "腾讯证券 fqkline（约8年日线）"
    },
    "note": "ATH为拉取范围内盘中最高；回撤档位从ATH起算；平台为近1年日线密集成交区、取中位数；levels/platforms的dist为目标价相对当前价的涨跌幅（负=需下跌到达，正=需上涨到达）；ma200.dist为当前价相对均线的偏离。"
  },
  "indices": [
    {
      "code": "QQQ",
      "name": "纳斯达克100",
      "market": "US",
      "ccy": "USD",
      "asOf": "2026-10-20",
      "price": 717.63,
      "ath": {
        "value": 762.86,
        "date": "2026-10-06"
      },
      "drawdown": -0.0593,
      "ma200": {
        "value": 675.95,
        "dist": 0.0617
      },
      "levels": [
        {
          "d": -0.1,
          "price": 686.57,
          "dist": -0.0433,
          "hit": false
        },
        {
          "d": -0.2,
          "price": 610.29,
          "dist": -0.1496,
          "hit": false
        },
        {
          "d": -0.3,
          "price": 534.0,
          "dist": -0.2559,
          "hit": false
        },
        {
          "d": -0.4,
          "price": 457.72,
          "dist": -0.3622,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 381.43,
          "dist": -0.4685,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 599.75,
          "high": 626.65,
          "mid": 614.11,
          "days": 88,
          "first": "2025-10-22",
          "last": "2026-04-13",
          "type": "support",
          "dist": -0.1443
        },
        {
          "low": 704.54,
          "high": 731.07,
          "mid": 716.1,
          "days": 74,
          "first": "2026-05-08",
          "last": "2026-10-20",
          "type": "current",
          "dist": -0.0021
        },
        {
          "low": 739.77,
          "high": 747.46,
          "mid": 743.03,
          "days": 15,
          "first": "2026-06-01",
          "last": "2026-10-13",
          "type": "resistance",
          "dist": 0.0354
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
      "asOf": "2026-10-20",
      "price": 769.05,
      "ath": {
        "value": 781.62,
        "date": "2026-10-06"
      },
      "drawdown": -0.0161,
      "ma200": {
        "value": 725.87,
        "dist": 0.0595
      },
      "levels": [
        {
          "d": -0.1,
          "price": 703.46,
          "dist": -0.0853,
          "hit": false
        },
        {
          "d": -0.2,
          "price": 625.3,
          "dist": -0.1869,
          "hit": false
        },
        {
          "d": -0.3,
          "price": 547.13,
          "dist": -0.2886,
          "hit": false
        },
        {
          "d": -0.4,
          "price": 468.97,
          "dist": -0.3902,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 390.81,
          "dist": -0.4918,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 670.31,
          "high": 695.49,
          "mid": 684.34,
          "days": 95,
          "first": "2025-10-23",
          "last": "2026-04-14",
          "type": "support",
          "dist": -0.1101
        },
        {
          "low": 761.69,
          "high": 773.17,
          "mid": 767.33,
          "days": 39,
          "first": "2026-08-04",
          "last": "2026-10-20",
          "type": "current",
          "dist": -0.0022
        },
        {
          "low": 738.18,
          "high": 751.83,
          "mid": 744.55,
          "days": 38,
          "first": "2026-05-11",
          "last": "2026-07-31",
          "type": "support",
          "dist": -0.0319
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
      "asOf": "2026-10-20",
      "price": 524.36,
      "ath": {
        "value": 546.75,
        "date": "2026-08-05"
      },
      "drawdown": -0.041,
      "ma200": {
        "value": 504.72,
        "dist": 0.0389
      },
      "levels": [
        {
          "d": -0.1,
          "price": 492.07,
          "dist": -0.0616,
          "hit": false
        },
        {
          "d": -0.2,
          "price": 437.4,
          "dist": -0.1658,
          "hit": false
        },
        {
          "d": -0.3,
          "price": 382.72,
          "dist": -0.2701,
          "hit": false
        },
        {
          "d": -0.4,
          "price": 328.05,
          "dist": -0.3744,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 273.38,
          "dist": -0.4787,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 484.59,
          "high": 497.01,
          "mid": 491.64,
          "days": 64,
          "first": "2025-12-11",
          "last": "2026-05-19",
          "type": "support",
          "dist": -0.0624
        },
        {
          "low": 515.41,
          "high": 524.49,
          "mid": 519.63,
          "days": 43,
          "first": "2026-06-04",
          "last": "2026-10-20",
          "type": "current",
          "dist": -0.009
        },
        {
          "low": 479.07,
          "high": 480.57,
          "mid": 479.71,
          "days": 10,
          "first": "2025-11-11",
          "last": "2026-04-10",
          "type": "support",
          "dist": -0.0852
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
      "asOf": "2026-10-20",
      "price": 275.78,
      "ath": {
        "value": 305.18,
        "date": "2026-08-14"
      },
      "drawdown": -0.0963,
      "ma200": {
        "value": 277.91,
        "dist": -0.0077
      },
      "levels": [
        {
          "d": -0.1,
          "price": 274.66,
          "dist": -0.0041,
          "hit": false
        },
        {
          "d": -0.2,
          "price": 244.14,
          "dist": -0.1147,
          "hit": false
        },
        {
          "d": -0.3,
          "price": 213.63,
          "dist": -0.2254,
          "hit": false
        },
        {
          "d": -0.4,
          "price": 183.11,
          "dist": -0.336,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 152.59,
          "dist": -0.4467,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 290.37,
          "high": 300.45,
          "mid": 295.31,
          "days": 58,
          "first": "2026-05-26",
          "last": "2026-09-09",
          "type": "resistance",
          "dist": 0.0708
        },
        {
          "low": 246.02,
          "high": 253.36,
          "mid": 249.6,
          "days": 44,
          "first": "2025-10-23",
          "last": "2026-04-07",
          "type": "support",
          "dist": -0.0949
        },
        {
          "low": 276.48,
          "high": 285.33,
          "mid": 280.86,
          "days": 40,
          "first": "2026-04-20",
          "last": "2026-10-13",
          "type": "resistance",
          "dist": 0.0184
        },
        {
          "low": 261.3,
          "high": 265.51,
          "mid": 263.4,
          "days": 27,
          "first": "2026-01-12",
          "last": "2026-04-13",
          "type": "support",
          "dist": -0.0449
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
      "asOf": "2026-10-22",
      "price": 3658.03,
      "ath": {
        "value": 4258.86,
        "date": "2026-05-14"
      },
      "drawdown": -0.1411,
      "ma200": {
        "value": 4002.11,
        "dist": -0.086
      },
      "levels": [
        {
          "d": -0.1,
          "price": 3832.97,
          "dist": 0.0478,
          "hit": true
        },
        {
          "d": -0.2,
          "price": 3407.09,
          "dist": -0.0686,
          "hit": false
        },
        {
          "d": -0.3,
          "price": 2981.2,
          "dist": -0.185,
          "hit": false
        },
        {
          "d": -0.4,
          "price": 2555.32,
          "dist": -0.3015,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 2129.43,
          "dist": -0.4179,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 3870.02,
          "high": 3996.94,
          "mid": 3930.79,
          "days": 105,
          "first": "2025-10-13",
          "last": "2026-09-24",
          "type": "resistance",
          "dist": 0.0746
        },
        {
          "low": 4079.9,
          "high": 4136.16,
          "mid": 4107.9,
          "days": 54,
          "first": "2026-01-06",
          "last": "2026-07-01",
          "type": "resistance",
          "dist": 0.123
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
      "asOf": "2026-10-22",
      "price": 4036.3,
      "ath": {
        "value": 5930.91,
        "date": "2021-02-18"
      },
      "drawdown": -0.3194,
      "ma200": {
        "value": 4670.85,
        "dist": -0.1359
      },
      "levels": [
        {
          "d": -0.1,
          "price": 5337.82,
          "dist": 0.3225,
          "hit": true
        },
        {
          "d": -0.2,
          "price": 4744.73,
          "dist": 0.1755,
          "hit": true
        },
        {
          "d": -0.3,
          "price": 4151.64,
          "dist": 0.0286,
          "hit": true
        },
        {
          "d": -0.4,
          "price": 3558.55,
          "dist": -0.1184,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 2965.45,
          "dist": -0.2653,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 4507.39,
          "high": 4792.26,
          "mid": 4650.57,
          "days": 175,
          "first": "2025-10-13",
          "last": "2026-09-23",
          "type": "resistance",
          "dist": 0.1522
        }
      ],
      "zone": "深度机会",
      "zoneDesc": "回撤30-40%，重点加仓"
    },
    {
      "code": "SH000922",
      "name": "中证A500",
      "market": "A",
      "ccy": "CNY",
      "asOf": "2026-10-22",
      "price": 5405.75,
      "ath": {
        "value": 6209.67,
        "date": "2024-10-08"
      },
      "drawdown": -0.1295,
      "ma200": {
        "value": 5595.37,
        "dist": -0.0339
      },
      "levels": [
        {
          "d": -0.1,
          "price": 5588.7,
          "dist": 0.0338,
          "hit": true
        },
        {
          "d": -0.2,
          "price": 4967.74,
          "dist": -0.081,
          "hit": false
        },
        {
          "d": -0.3,
          "price": 4346.77,
          "dist": -0.1959,
          "hit": false
        },
        {
          "d": -0.4,
          "price": 3725.8,
          "dist": -0.3108,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 3104.84,
          "dist": -0.4256,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 5426.72,
          "high": 5785.57,
          "mid": 5609.18,
          "days": 201,
          "first": "2025-10-13",
          "last": "2026-10-21",
          "type": "resistance",
          "dist": 0.0376
        }
      ],
      "zone": "浅回调",
      "zoneDesc": "关注，等更深回调"
    },
    {
      "code": "SZ399006",
      "name": "创业板指",
      "market": "A",
      "ccy": "CNY",
      "asOf": "2026-10-22",
      "price": 2576.9,
      "ath": {
        "value": 4380.41,
        "date": "2026-06-25"
      },
      "drawdown": -0.4117,
      "ma200": {
        "value": 3504.73,
        "dist": -0.2647
      },
      "levels": [
        {
          "d": -0.1,
          "price": 3942.37,
          "dist": 0.5299,
          "hit": true
        },
        {
          "d": -0.2,
          "price": 3504.33,
          "dist": 0.3599,
          "hit": true
        },
        {
          "d": -0.3,
          "price": 3066.29,
          "dist": 0.1899,
          "hit": true
        },
        {
          "d": -0.4,
          "price": 2628.25,
          "dist": 0.0199,
          "hit": true
        },
        {
          "d": -0.5,
          "price": 2190.2,
          "dist": -0.1501,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 3044.69,
          "high": 3399.93,
          "mid": 3251.65,
          "days": 136,
          "first": "2025-10-13",
          "last": "2026-09-30",
          "type": "resistance",
          "dist": 0.2618
        },
        {
          "low": 4017.27,
          "high": 4045.77,
          "mid": 4030.58,
          "days": 9,
          "first": "2026-05-13",
          "last": "2026-07-09",
          "type": "resistance",
          "dist": 0.5641
        },
        {
          "low": 3908.44,
          "high": 3938.5,
          "mid": 3923.55,
          "days": 8,
          "first": "2026-05-11",
          "last": "2026-07-07",
          "type": "resistance",
          "dist": 0.5226
        }
      ],
      "zone": "极端区",
      "zoneDesc": "回撤40-50%，熊市机会"
    },
    {
      "code": "SH000688",
      "name": "科创50",
      "market": "A",
      "ccy": "CNY",
      "asOf": "2026-10-22",
      "price": 1305.87,
      "ath": {
        "value": 2255.25,
        "date": "2026-07-01"
      },
      "drawdown": -0.421,
      "ma200": {
        "value": 1589.37,
        "dist": -0.1784
      },
      "levels": [
        {
          "d": -0.1,
          "price": 2029.73,
          "dist": 0.5543,
          "hit": true
        },
        {
          "d": -0.2,
          "price": 1804.2,
          "dist": 0.3816,
          "hit": true
        },
        {
          "d": -0.3,
          "price": 1578.67,
          "dist": 0.2089,
          "hit": true
        },
        {
          "d": -0.4,
          "price": 1353.15,
          "dist": 0.0362,
          "hit": true
        },
        {
          "d": -0.5,
          "price": 1127.62,
          "dist": -0.1365,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 1296.6,
          "high": 1484.21,
          "mid": 1388.85,
          "days": 116,
          "first": "2025-10-13",
          "last": "2026-10-22",
          "type": "current",
          "dist": 0.0635
        },
        {
          "low": 1656.95,
          "high": 1668.33,
          "mid": 1662.8,
          "days": 11,
          "first": "2026-05-06",
          "last": "2026-09-23",
          "type": "resistance",
          "dist": 0.2733
        },
        {
          "low": 1602.34,
          "high": 1617.6,
          "mid": 1611.26,
          "days": 8,
          "first": "2026-08-04",
          "last": "2026-09-17",
          "type": "resistance",
          "dist": 0.2339
        },
        {
          "low": 1715.4,
          "high": 1726.18,
          "mid": 1720.16,
          "days": 8,
          "first": "2026-05-11",
          "last": "2026-08-14",
          "type": "resistance",
          "dist": 0.3173
        }
      ],
      "zone": "极端区",
      "zoneDesc": "回撤40-50%，熊市机会"
    }
  ]
};

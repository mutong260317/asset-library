/* ============================================================
 * 宽基指数回撤分析数据（自动生成，请勿手改）
 * 生成脚本：scripts/fetch_drawdown.py
 * 刷新频率：每天 06:30（美股收盘后）、15:30（A股收盘后）
 * ============================================================ */
window.DRAWDOWN = {
  "meta": {
    "asOf": "2026-10-29 21:52",
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
      "source": "Yahoo Finance",
      "asOf": "2026-10-28",
      "price": 725.61,
      "ath": {
        "value": 762.86,
        "date": "2026-10-06"
      },
      "drawdown": -0.0488,
      "ma200": {
        "value": 678.72,
        "dist": 0.0691
      },
      "levels": [
        {
          "d": -0.1,
          "price": 686.57,
          "dist": -0.0538,
          "hit": false
        },
        {
          "d": -0.2,
          "price": 610.29,
          "dist": -0.1589,
          "hit": false
        },
        {
          "d": -0.3,
          "price": 534.0,
          "dist": -0.2641,
          "hit": false
        },
        {
          "d": -0.4,
          "price": 457.72,
          "dist": -0.3692,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 381.43,
          "dist": -0.4743,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 599.75,
          "high": 626.65,
          "mid": 614.21,
          "days": 85,
          "first": "2025-10-30",
          "last": "2026-04-13",
          "type": "support",
          "dist": -0.1535
        },
        {
          "low": 704.4,
          "high": 731.07,
          "mid": 716.06,
          "days": 80,
          "first": "2026-05-08",
          "last": "2026-10-28",
          "type": "current",
          "dist": -0.0132
        },
        {
          "low": 739.77,
          "high": 747.46,
          "mid": 743.03,
          "days": 15,
          "first": "2026-06-01",
          "last": "2026-10-13",
          "type": "resistance",
          "dist": 0.024
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
      "source": "Yahoo Finance",
      "asOf": "2026-10-28",
      "price": 772.31,
      "ath": {
        "value": 781.62,
        "date": "2026-10-06"
      },
      "drawdown": -0.0119,
      "ma200": {
        "value": 728.15,
        "dist": 0.0606
      },
      "levels": [
        {
          "d": -0.1,
          "price": 703.46,
          "dist": -0.0892,
          "hit": false
        },
        {
          "d": -0.2,
          "price": 625.3,
          "dist": -0.1904,
          "hit": false
        },
        {
          "d": -0.3,
          "price": 547.13,
          "dist": -0.2916,
          "hit": false
        },
        {
          "d": -0.4,
          "price": 468.97,
          "dist": -0.3928,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 390.81,
          "dist": -0.494,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 670.31,
          "high": 695.49,
          "mid": 684.49,
          "days": 90,
          "first": "2025-10-30",
          "last": "2026-04-14",
          "type": "support",
          "dist": -0.1137
        },
        {
          "low": 761.69,
          "high": 773.17,
          "mid": 767.51,
          "days": 44,
          "first": "2026-08-04",
          "last": "2026-10-28",
          "type": "current",
          "dist": -0.0062
        },
        {
          "low": 738.18,
          "high": 751.83,
          "mid": 744.55,
          "days": 38,
          "first": "2026-05-11",
          "last": "2026-07-31",
          "type": "support",
          "dist": -0.0359
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
      "source": "Yahoo Finance",
      "asOf": "2026-10-28",
      "price": 524.68,
      "ath": {
        "value": 546.75,
        "date": "2026-08-05"
      },
      "drawdown": -0.0404,
      "ma200": {
        "value": 505.67,
        "dist": 0.0376
      },
      "levels": [
        {
          "d": -0.1,
          "price": 492.07,
          "dist": -0.0621,
          "hit": false
        },
        {
          "d": -0.2,
          "price": 437.4,
          "dist": -0.1663,
          "hit": false
        },
        {
          "d": -0.3,
          "price": 382.72,
          "dist": -0.2706,
          "hit": false
        },
        {
          "d": -0.4,
          "price": 328.05,
          "dist": -0.3748,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 273.38,
          "dist": -0.479,
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
          "dist": -0.063
        },
        {
          "low": 515.41,
          "high": 528.03,
          "mid": 521.31,
          "days": 59,
          "first": "2026-06-04",
          "last": "2026-10-28",
          "type": "current",
          "dist": -0.0064
        },
        {
          "low": 479.07,
          "high": 480.57,
          "mid": 479.71,
          "days": 10,
          "first": "2025-11-11",
          "last": "2026-04-10",
          "type": "support",
          "dist": -0.0857
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
      "source": "Yahoo Finance",
      "asOf": "2026-10-28",
      "price": 281.29,
      "ath": {
        "value": 305.18,
        "date": "2026-08-14"
      },
      "drawdown": -0.0783,
      "ma200": {
        "value": 278.53,
        "dist": 0.0099
      },
      "levels": [
        {
          "d": -0.1,
          "price": 274.66,
          "dist": -0.0236,
          "hit": false
        },
        {
          "d": -0.2,
          "price": 244.14,
          "dist": -0.1321,
          "hit": false
        },
        {
          "d": -0.3,
          "price": 213.63,
          "dist": -0.2405,
          "hit": false
        },
        {
          "d": -0.4,
          "price": 183.11,
          "dist": -0.349,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 152.59,
          "dist": -0.4575,
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
          "dist": 0.0498
        },
        {
          "low": 276.48,
          "high": 285.33,
          "mid": 280.58,
          "days": 45,
          "first": "2026-04-20",
          "last": "2026-10-28",
          "type": "current",
          "dist": -0.0025
        },
        {
          "low": 247.41,
          "high": 253.36,
          "mid": 250.33,
          "days": 33,
          "first": "2025-11-28",
          "last": "2026-04-07",
          "type": "support",
          "dist": -0.1101
        },
        {
          "low": 261.3,
          "high": 265.51,
          "mid": 263.4,
          "days": 27,
          "first": "2026-01-12",
          "last": "2026-04-13",
          "type": "support",
          "dist": -0.0636
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
      "asOf": "2026-10-29",
      "price": 3651.43,
      "ath": {
        "value": 4258.86,
        "date": "2026-05-14"
      },
      "drawdown": -0.1426,
      "ma200": {
        "value": 3995.44,
        "dist": -0.0861
      },
      "levels": [
        {
          "d": -0.1,
          "price": 3832.97,
          "dist": 0.0497,
          "hit": true
        },
        {
          "d": -0.2,
          "price": 3407.09,
          "dist": -0.0669,
          "hit": false
        },
        {
          "d": -0.3,
          "price": 2981.2,
          "dist": -0.1836,
          "hit": false
        },
        {
          "d": -0.4,
          "price": 2555.32,
          "dist": -0.3002,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 2129.43,
          "dist": -0.4168,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 3863.89,
          "high": 3990.49,
          "mid": 3925.24,
          "days": 104,
          "first": "2025-10-20",
          "last": "2026-09-24",
          "type": "resistance",
          "dist": 0.075
        },
        {
          "low": 4077.28,
          "high": 4135.39,
          "mid": 4106.3,
          "days": 55,
          "first": "2026-01-06",
          "last": "2026-07-01",
          "type": "resistance",
          "dist": 0.1246
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
      "asOf": "2026-10-29",
      "price": 4041.84,
      "ath": {
        "value": 5930.91,
        "date": "2021-02-18"
      },
      "drawdown": -0.3185,
      "ma200": {
        "value": 4656.94,
        "dist": -0.1321
      },
      "levels": [
        {
          "d": -0.1,
          "price": 5337.82,
          "dist": 0.3206,
          "hit": true
        },
        {
          "d": -0.2,
          "price": 4744.73,
          "dist": 0.1739,
          "hit": true
        },
        {
          "d": -0.3,
          "price": 4151.64,
          "dist": 0.0272,
          "hit": true
        },
        {
          "d": -0.4,
          "price": 3558.55,
          "dist": -0.1196,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 2965.45,
          "dist": -0.2663,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 4529.1,
          "high": 4792.26,
          "mid": 4658.63,
          "days": 163,
          "first": "2025-10-20",
          "last": "2026-09-22",
          "type": "resistance",
          "dist": 0.1526
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
      "asOf": "2026-10-29",
      "price": 4884.9,
      "ath": {
        "value": 6375.33,
        "date": "2026-06-22"
      },
      "drawdown": -0.2338,
      "ma200": {
        "value": 5793.79,
        "dist": -0.1569
      },
      "levels": [
        {
          "d": -0.1,
          "price": 5737.8,
          "dist": 0.1746,
          "hit": true
        },
        {
          "d": -0.2,
          "price": 5100.26,
          "dist": 0.0441,
          "hit": true
        },
        {
          "d": -0.3,
          "price": 4462.73,
          "dist": -0.0864,
          "hit": false
        },
        {
          "d": -0.4,
          "price": 3825.2,
          "dist": -0.2169,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 3187.66,
          "dist": -0.3474,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 5783.05,
          "high": 5984.75,
          "mid": 5884.63,
          "days": 78,
          "first": "2026-01-06",
          "last": "2026-08-18",
          "type": "resistance",
          "dist": 0.2047
        },
        {
          "low": 5485.45,
          "high": 5658.85,
          "mid": 5575.83,
          "days": 75,
          "first": "2025-10-21",
          "last": "2026-09-24",
          "type": "resistance",
          "dist": 0.1414
        },
        {
          "low": 6105.87,
          "high": 6130.45,
          "mid": 6116.37,
          "days": 9,
          "first": "2026-05-15",
          "last": "2026-07-09",
          "type": "resistance",
          "dist": 0.2521
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
      "asOf": "2026-10-29",
      "price": 2517.59,
      "ath": {
        "value": 4380.41,
        "date": "2026-06-25"
      },
      "drawdown": -0.4253,
      "ma200": {
        "value": 3489.29,
        "dist": -0.2785
      },
      "levels": [
        {
          "d": -0.1,
          "price": 3942.37,
          "dist": 0.5659,
          "hit": true
        },
        {
          "d": -0.2,
          "price": 3504.33,
          "dist": 0.3919,
          "hit": true
        },
        {
          "d": -0.3,
          "price": 3066.29,
          "dist": 0.2179,
          "hit": true
        },
        {
          "d": -0.4,
          "price": 2628.25,
          "dist": 0.044,
          "hit": true
        },
        {
          "d": -0.5,
          "price": 2190.2,
          "dist": -0.13,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 3042.34,
          "high": 3399.93,
          "mid": 3249.86,
          "days": 137,
          "first": "2026-10-21",
          "last": "2026-10-09",
          "type": "resistance",
          "dist": 0.2909
        },
        {
          "low": 3928.97,
          "high": 3961.75,
          "mid": 3944.67,
          "days": 9,
          "first": "2026-05-11",
          "last": "2026-07-06",
          "type": "resistance",
          "dist": 0.5668
        },
        {
          "low": 3667.79,
          "high": 3692.46,
          "mid": 3681.92,
          "days": 8,
          "first": "2026-04-17",
          "last": "2026-07-21",
          "type": "resistance",
          "dist": 0.4625
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
      "source": "腾讯证券",
      "asOf": "2026-10-29",
      "price": 1228.09,
      "ath": {
        "value": 2255.25,
        "date": "2026-07-01"
      },
      "drawdown": -0.4555,
      "ma200": {
        "value": 1587.88,
        "dist": -0.2266
      },
      "levels": [
        {
          "d": -0.1,
          "price": 2029.73,
          "dist": 0.6527,
          "hit": true
        },
        {
          "d": -0.2,
          "price": 1804.2,
          "dist": 0.4691,
          "hit": true
        },
        {
          "d": -0.3,
          "price": 1578.67,
          "dist": 0.2855,
          "hit": true
        },
        {
          "d": -0.4,
          "price": 1353.15,
          "dist": 0.1018,
          "hit": true
        },
        {
          "d": -0.5,
          "price": 1127.62,
          "dist": -0.0818,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 1288.81,
          "high": 1500.91,
          "mid": 1389.34,
          "days": 124,
          "first": "2025-10-20",
          "last": "2026-10-26",
          "type": "resistance",
          "dist": 0.1313
        },
        {
          "low": 1602.34,
          "high": 1678.74,
          "mid": 1643.06,
          "days": 29,
          "first": "2026-05-06",
          "last": "2026-09-24",
          "type": "resistance",
          "dist": 0.3379
        },
        {
          "low": 1541.64,
          "high": 1555.98,
          "mid": 1552.54,
          "days": 8,
          "first": "2026-01-22",
          "last": "2026-09-28",
          "type": "resistance",
          "dist": 0.2642
        }
      ],
      "zone": "极端区",
      "zoneDesc": "回撤40-50%，熊市机会"
    }
  ]
};

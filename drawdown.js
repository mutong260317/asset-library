/* Generated snapshot; state/outbox are embedded as authority. */
window.DRAWDOWN = {
  "meta": {
    "schemaVersion": 2,
    "asOf": "2026-11-21T05:12:22.953434+00:00",
    "generatedBy": "scripts/fetch_drawdown.py",
    "refreshCadence": "按需运行；实际定时任务需独立核验",
    "sources": {
      "US": "优先长桥；备用 Yahoo / AkShare 新浪；不补实时价",
      "A": "优先长桥；备用腾讯 / AkShare 新浪；不补实时价"
    },
    "note": "窗口最多2000交易日；不足时明确标注。历史最高价未核验则为null。仅描述回撤深度，不自动判定投资机会。",
    "generationId": "25298b2627e578d119b23f6d"
  },
  "indices": [
    {
      "code": "QQQ",
      "name": "纳斯达克100",
      "market": "US",
      "ccy": "USD",
      "source": "Longbridge",
      "asOf": "2026-11-20",
      "price": 608.45,
      "peak": {
        "value": 762.86,
        "date": "2026-10-06",
        "kind": "rolling_2000_sessions",
        "windowLimit": 2000,
        "sampleSessions": 2000,
        "windowStart": "2018-12-07",
        "windowEnd": "2026-11-20",
        "fullWindow": true,
        "field": "intradayHigh"
      },
      "historicalATH": {
        "value": null,
        "reason": "未核验上市/发布以来完整同口径日线"
      },
      "priceBasis": "qfq",
      "quality": {
        "status": "checked",
        "expectedSession": "2026-11-20",
        "calendar": "XNYS",
        "settlementDelayMinutes": 20,
        "observedAt": "2026-11-21T05:12:22.953434+00:00",
        "rows": 2000,
        "start": "2018-12-07",
        "end": "2026-11-20",
        "approvedJumps": [],
        "reviewedSplits": []
      },
      "drawdown": -0.2024,
      "ma200": {
        "value": 683.06,
        "dist": -0.1092
      },
      "levels": [
        {
          "d": -0.1,
          "price": 686.57,
          "dist": 0.1284,
          "hit": true
        },
        {
          "d": -0.2,
          "price": 610.29,
          "dist": 0.003,
          "hit": true
        },
        {
          "d": -0.3,
          "price": 534.0,
          "dist": -0.1224,
          "hit": false
        },
        {
          "d": -0.4,
          "price": 457.72,
          "dist": -0.2477,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 381.43,
          "dist": -0.3731,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 704.4,
          "high": 731.07,
          "mid": 716.05,
          "days": 81,
          "first": "2026-05-08",
          "last": "2026-10-29",
          "type": "resistance",
          "dist": 0.1768
        },
        {
          "low": 599.75,
          "high": 626.65,
          "mid": 614.05,
          "days": 74,
          "first": "2025-11-24",
          "last": "2026-11-20",
          "type": "current",
          "dist": 0.0092
        },
        {
          "low": 739.77,
          "high": 747.46,
          "mid": 743.03,
          "days": 15,
          "first": "2026-06-01",
          "last": "2026-10-13",
          "type": "resistance",
          "dist": 0.2212
        }
      ],
      "zone": "回撤20–30%",
      "zoneDesc": "仅描述窗口高点回撤深度，不构成加仓或投资机会判断"
    },
    {
      "code": "SPY",
      "name": "标普500",
      "market": "US",
      "ccy": "USD",
      "source": "Yahoo Finance",
      "asOf": "2026-11-20",
      "price": 689.81,
      "peak": {
        "value": 781.62,
        "date": "2026-10-06",
        "kind": "rolling_2000_sessions",
        "windowLimit": 2000,
        "sampleSessions": 2000,
        "windowStart": "2018-12-07",
        "windowEnd": "2026-11-20",
        "fullWindow": true,
        "field": "intradayHigh"
      },
      "historicalATH": {
        "value": null,
        "reason": "未核验上市/发布以来完整同口径日线"
      },
      "priceBasis": "unadjusted",
      "quality": {
        "status": "checked",
        "expectedSession": "2026-11-20",
        "calendar": "XNYS",
        "settlementDelayMinutes": 20,
        "observedAt": "2026-11-21T05:12:22.953434+00:00",
        "rows": 2000,
        "start": "2018-12-07",
        "end": "2026-11-20",
        "approvedJumps": [],
        "reviewedSplits": []
      },
      "drawdown": -0.1175,
      "ma200": {
        "value": 732.76,
        "dist": -0.0586
      },
      "levels": [
        {
          "d": -0.1,
          "price": 703.46,
          "dist": 0.0198,
          "hit": true
        },
        {
          "d": -0.2,
          "price": 625.3,
          "dist": -0.0935,
          "hit": false
        },
        {
          "d": -0.3,
          "price": 547.13,
          "dist": -0.2068,
          "hit": false
        },
        {
          "d": -0.4,
          "price": 468.97,
          "dist": -0.3201,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 390.81,
          "dist": -0.4335,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 732.44,
          "high": 773.17,
          "mid": 754.56,
          "days": 120,
          "first": "2026-05-06",
          "last": "2026-11-17",
          "type": "resistance",
          "dist": 0.0939
        },
        {
          "low": 676.33,
          "high": 695.49,
          "mid": 686.45,
          "days": 74,
          "first": "2025-11-26",
          "last": "2026-11-20",
          "type": "current",
          "dist": -0.0049
        }
      ],
      "zone": "回撤10–20%",
      "zoneDesc": "仅描述窗口高点回撤深度，不构成加仓或投资机会判断"
    },
    {
      "code": "DIA",
      "name": "道琼斯工业",
      "market": "US",
      "ccy": "USD",
      "source": "Yahoo Finance",
      "asOf": "2026-11-20",
      "price": 481.08,
      "peak": {
        "value": 546.75,
        "date": "2026-08-05",
        "kind": "rolling_2000_sessions",
        "windowLimit": 2000,
        "sampleSessions": 2000,
        "windowStart": "2018-12-07",
        "windowEnd": "2026-11-20",
        "fullWindow": true,
        "field": "intradayHigh"
      },
      "historicalATH": {
        "value": null,
        "reason": "未核验上市/发布以来完整同口径日线"
      },
      "priceBasis": "unadjusted",
      "quality": {
        "status": "checked",
        "expectedSession": "2026-11-20",
        "calendar": "XNYS",
        "settlementDelayMinutes": 20,
        "observedAt": "2026-11-21T05:12:22.953434+00:00",
        "rows": 2000,
        "start": "2018-12-07",
        "end": "2026-11-20",
        "approvedJumps": [],
        "reviewedSplits": []
      },
      "drawdown": -0.1201,
      "ma200": {
        "value": 507.63,
        "dist": -0.0523
      },
      "levels": [
        {
          "d": -0.1,
          "price": 492.07,
          "dist": 0.0228,
          "hit": true
        },
        {
          "d": -0.2,
          "price": 437.4,
          "dist": -0.0908,
          "hit": false
        },
        {
          "d": -0.3,
          "price": 382.72,
          "dist": -0.2045,
          "hit": false
        },
        {
          "d": -0.4,
          "price": 328.05,
          "dist": -0.3181,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 273.38,
          "dist": -0.4317,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 515.41,
          "high": 528.03,
          "mid": 521.22,
          "days": 69,
          "first": "2026-06-04",
          "last": "2026-11-16",
          "type": "resistance",
          "dist": 0.0834
        },
        {
          "low": 484.59,
          "high": 497.01,
          "mid": 491.63,
          "days": 65,
          "first": "2025-12-11",
          "last": "2026-11-19",
          "type": "resistance",
          "dist": 0.0219
        },
        {
          "low": 479.07,
          "high": 480.57,
          "mid": 479.74,
          "days": 9,
          "first": "2025-12-03",
          "last": "2026-04-10",
          "type": "support",
          "dist": -0.0028
        }
      ],
      "zone": "回撤10–20%",
      "zoneDesc": "仅描述窗口高点回撤深度，不构成加仓或投资机会判断"
    },
    {
      "code": "IWM",
      "name": "罗素2000",
      "market": "US",
      "ccy": "USD",
      "source": "Yahoo Finance",
      "asOf": "2026-11-20",
      "price": 256.61,
      "peak": {
        "value": 305.18,
        "date": "2026-08-14",
        "kind": "rolling_2000_sessions",
        "windowLimit": 2000,
        "sampleSessions": 2000,
        "windowStart": "2018-12-07",
        "windowEnd": "2026-11-20",
        "fullWindow": true,
        "field": "intradayHigh"
      },
      "historicalATH": {
        "value": null,
        "reason": "未核验上市/发布以来完整同口径日线"
      },
      "priceBasis": "unadjusted",
      "quality": {
        "status": "checked",
        "expectedSession": "2026-11-20",
        "calendar": "XNYS",
        "settlementDelayMinutes": 20,
        "observedAt": "2026-11-21T05:12:22.953434+00:00",
        "rows": 2000,
        "start": "2018-12-07",
        "end": "2026-11-20",
        "approvedJumps": [],
        "reviewedSplits": []
      },
      "drawdown": -0.1592,
      "ma200": {
        "value": 279.57,
        "dist": -0.0821
      },
      "levels": [
        {
          "d": -0.1,
          "price": 274.66,
          "dist": 0.0703,
          "hit": true
        },
        {
          "d": -0.2,
          "price": 244.14,
          "dist": -0.0486,
          "hit": false
        },
        {
          "d": -0.3,
          "price": 213.63,
          "dist": -0.1675,
          "hit": false
        },
        {
          "d": -0.4,
          "price": 183.11,
          "dist": -0.2864,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 152.59,
          "dist": -0.4054,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 276.48,
          "high": 285.43,
          "mid": 280.71,
          "days": 56,
          "first": "2026-04-20",
          "last": "2026-11-13",
          "type": "resistance",
          "dist": 0.0939
        },
        {
          "low": 289.88,
          "high": 295.77,
          "mid": 292.91,
          "days": 34,
          "first": "2026-05-26",
          "last": "2026-09-09",
          "type": "resistance",
          "dist": 0.1415
        },
        {
          "low": 246.16,
          "high": 250.05,
          "mid": 248.31,
          "days": 20,
          "first": "2025-11-26",
          "last": "2026-04-01",
          "type": "support",
          "dist": -0.0323
        },
        {
          "low": 263.19,
          "high": 265.76,
          "mid": 264.38,
          "days": 18,
          "first": "2026-01-14",
          "last": "2026-11-19",
          "type": "resistance",
          "dist": 0.0303
        }
      ],
      "zone": "回撤10–20%",
      "zoneDesc": "仅描述窗口高点回撤深度，不构成加仓或投资机会判断"
    },
    {
      "code": "SH000001",
      "name": "上证指数",
      "market": "A",
      "ccy": "CNY",
      "source": "Longbridge",
      "asOf": "2026-11-20",
      "price": 3533.79,
      "peak": {
        "value": 4258.86,
        "date": "2026-05-14",
        "kind": "rolling_2000_sessions",
        "windowLimit": 2000,
        "sampleSessions": 2000,
        "windowStart": "2018-08-21",
        "windowEnd": "2026-11-20",
        "fullWindow": true,
        "field": "intradayHigh"
      },
      "historicalATH": {
        "value": null,
        "reason": "未核验上市/发布以来完整同口径日线"
      },
      "priceBasis": "index",
      "quality": {
        "status": "checked",
        "expectedSession": "2026-11-20",
        "calendar": "XSHG",
        "settlementDelayMinutes": 20,
        "observedAt": "2026-11-21T05:12:22.953434+00:00",
        "rows": 2000,
        "start": "2018-08-21",
        "end": "2026-11-20",
        "approvedJumps": [],
        "reviewedSplits": []
      },
      "drawdown": -0.1702,
      "ma200": {
        "value": 3959.28,
        "dist": -0.1075
      },
      "levels": [
        {
          "d": -0.1,
          "price": 3832.97,
          "dist": 0.0847,
          "hit": true
        },
        {
          "d": -0.2,
          "price": 3407.09,
          "dist": -0.0359,
          "hit": false
        },
        {
          "d": -0.3,
          "price": 2981.2,
          "dist": -0.1564,
          "hit": false
        },
        {
          "d": -0.4,
          "price": 2555.32,
          "dist": -0.2769,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 2129.43,
          "dist": -0.3974,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 3864.18,
          "high": 4000.14,
          "mid": 3925.85,
          "days": 97,
          "first": "2025-11-12",
          "last": "2026-09-24",
          "type": "resistance",
          "dist": 0.1109
        },
        {
          "low": 4073.9,
          "high": 4139.9,
          "mid": 4106.33,
          "days": 61,
          "first": "2026-01-06",
          "last": "2026-07-01",
          "type": "resistance",
          "dist": 0.162
        }
      ],
      "zone": "回撤10–20%",
      "zoneDesc": "仅描述窗口高点回撤深度，不构成加仓或投资机会判断"
    },
    {
      "code": "SH000300",
      "name": "沪深300",
      "market": "A",
      "ccy": "CNY",
      "source": "Longbridge",
      "asOf": "2026-11-20",
      "price": 3954.57,
      "peak": {
        "value": 5930.91,
        "date": "2021-02-18",
        "kind": "rolling_2000_sessions",
        "windowLimit": 2000,
        "sampleSessions": 2000,
        "windowStart": "2018-08-21",
        "windowEnd": "2026-11-20",
        "fullWindow": true,
        "field": "intradayHigh"
      },
      "historicalATH": {
        "value": null,
        "reason": "未核验上市/发布以来完整同口径日线"
      },
      "priceBasis": "index",
      "quality": {
        "status": "checked",
        "expectedSession": "2026-11-20",
        "calendar": "XSHG",
        "settlementDelayMinutes": 20,
        "observedAt": "2026-11-21T05:12:22.953434+00:00",
        "rows": 2000,
        "start": "2018-08-21",
        "end": "2026-11-20",
        "approvedJumps": [],
        "reviewedSplits": []
      },
      "drawdown": -0.3332,
      "ma200": {
        "value": 4600.72,
        "dist": -0.1404
      },
      "levels": [
        {
          "d": -0.1,
          "price": 5337.82,
          "dist": 0.3498,
          "hit": true
        },
        {
          "d": -0.2,
          "price": 4744.73,
          "dist": 0.1998,
          "hit": true
        },
        {
          "d": -0.3,
          "price": 4151.64,
          "dist": 0.0498,
          "hit": true
        },
        {
          "d": -0.4,
          "price": 3558.55,
          "dist": -0.1001,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 2965.45,
          "dist": -0.2501,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 4507.39,
          "high": 4792.26,
          "mid": 4652.59,
          "days": 154,
          "first": "2025-11-11",
          "last": "2026-09-23",
          "type": "resistance",
          "dist": 0.1765
        }
      ],
      "zone": "回撤30–40%",
      "zoneDesc": "仅描述窗口高点回撤深度，不构成加仓或投资机会判断"
    },
    {
      "code": "SH000510",
      "name": "中证A500",
      "market": "A",
      "ccy": "CNY",
      "source": "Longbridge",
      "asOf": "2026-11-20",
      "price": 4693.28,
      "peak": {
        "value": 6375.34,
        "date": "2026-06-22",
        "kind": "rolling_2000_sessions",
        "windowLimit": 2000,
        "sampleSessions": 523,
        "windowStart": "2024-09-23",
        "windowEnd": "2026-11-20",
        "fullWindow": false,
        "field": "intradayHigh"
      },
      "historicalATH": {
        "value": null,
        "reason": "未核验上市/发布以来完整同口径日线"
      },
      "priceBasis": "index",
      "quality": {
        "status": "checked",
        "expectedSession": "2026-11-20",
        "calendar": "XSHG",
        "settlementDelayMinutes": 20,
        "observedAt": "2026-11-21T05:12:22.953434+00:00",
        "rows": 523,
        "start": "2024-09-23",
        "end": "2026-11-20",
        "approvedJumps": [],
        "reviewedSplits": []
      },
      "drawdown": -0.2638,
      "ma200": {
        "value": 5715.02,
        "dist": -0.1788
      },
      "levels": [
        {
          "d": -0.1,
          "price": 5737.81,
          "dist": 0.2226,
          "hit": true
        },
        {
          "d": -0.2,
          "price": 5100.27,
          "dist": 0.0867,
          "hit": true
        },
        {
          "d": -0.3,
          "price": 4462.74,
          "dist": -0.0491,
          "hit": false
        },
        {
          "d": -0.4,
          "price": 3825.2,
          "dist": -0.185,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 3187.67,
          "dist": -0.3208,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 5783.05,
          "high": 6030.69,
          "mid": 5896.87,
          "days": 86,
          "first": "2026-01-06",
          "last": "2026-08-18",
          "type": "resistance",
          "dist": 0.2564
        },
        {
          "low": 5466.9,
          "high": 5667.82,
          "mid": 5571.61,
          "days": 66,
          "first": "2025-11-11",
          "last": "2026-09-24",
          "type": "resistance",
          "dist": 0.1871
        },
        {
          "low": 6105.87,
          "high": 6135.86,
          "mid": 6118.32,
          "days": 10,
          "first": "2026-05-06",
          "last": "2026-07-09",
          "type": "resistance",
          "dist": 0.3036
        }
      ],
      "zone": "回撤20–30%",
      "zoneDesc": "仅描述窗口高点回撤深度，不构成加仓或投资机会判断"
    },
    {
      "code": "SZ399006",
      "name": "创业板指",
      "market": "A",
      "ccy": "CNY",
      "source": "Longbridge",
      "asOf": "2026-11-20",
      "price": 2212.13,
      "peak": {
        "value": 4380.41,
        "date": "2026-06-25",
        "kind": "rolling_2000_sessions",
        "windowLimit": 2000,
        "sampleSessions": 2000,
        "windowStart": "2018-08-21",
        "windowEnd": "2026-11-20",
        "fullWindow": true,
        "field": "intradayHigh"
      },
      "historicalATH": {
        "value": null,
        "reason": "未核验上市/发布以来完整同口径日线"
      },
      "priceBasis": "index",
      "quality": {
        "status": "checked",
        "expectedSession": "2026-11-20",
        "calendar": "XSHG",
        "settlementDelayMinutes": 20,
        "observedAt": "2026-11-21T05:12:22.953434+00:00",
        "rows": 2000,
        "start": "2018-08-21",
        "end": "2026-11-20",
        "approvedJumps": [
          "2024-09-30",
          "2024-10-08"
        ],
        "reviewedSplits": []
      },
      "drawdown": -0.495,
      "ma200": {
        "value": 3418.24,
        "dist": -0.3528
      },
      "levels": [
        {
          "d": -0.1,
          "price": 3942.37,
          "dist": 0.7822,
          "hit": true
        },
        {
          "d": -0.2,
          "price": 3504.33,
          "dist": 0.5841,
          "hit": true
        },
        {
          "d": -0.3,
          "price": 3066.29,
          "dist": 0.3861,
          "hit": true
        },
        {
          "d": -0.4,
          "price": 2628.25,
          "dist": 0.1881,
          "hit": true
        },
        {
          "d": -0.5,
          "price": 2190.2,
          "dist": -0.0099,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 3036.66,
          "high": 3414.88,
          "mid": 3255.96,
          "days": 125,
          "first": "2025-11-11",
          "last": "2026-10-09",
          "type": "resistance",
          "dist": 0.4719
        },
        {
          "low": 3811.25,
          "high": 3938.5,
          "mid": 3876.39,
          "days": 17,
          "first": "2026-05-07",
          "last": "2026-07-14",
          "type": "resistance",
          "dist": 0.7523
        }
      ],
      "zone": "回撤40–50%",
      "zoneDesc": "仅描述窗口高点回撤深度，不构成加仓或投资机会判断"
    },
    {
      "code": "SH000688",
      "name": "科创50",
      "market": "A",
      "ccy": "CNY",
      "source": "腾讯证券",
      "asOf": "2026-11-20",
      "price": 1231.09,
      "peak": {
        "value": 2255.25,
        "date": "2026-07-01",
        "kind": "rolling_2000_sessions",
        "windowLimit": 2000,
        "sampleSessions": 1668,
        "windowStart": "2020-01-02",
        "windowEnd": "2026-11-20",
        "fullWindow": false,
        "field": "intradayHigh"
      },
      "historicalATH": {
        "value": null,
        "reason": "未核验上市/发布以来完整同口径日线"
      },
      "priceBasis": "index",
      "quality": {
        "status": "checked",
        "expectedSession": "2026-11-20",
        "calendar": "XSHG",
        "settlementDelayMinutes": 20,
        "observedAt": "2026-11-21T05:12:22.953434+00:00",
        "rows": 1668,
        "start": "2020-01-02",
        "end": "2026-11-20",
        "approvedJumps": [
          "2024-09-30",
          "2024-10-08"
        ],
        "reviewedSplits": []
      },
      "drawdown": -0.4541,
      "ma200": {
        "value": 1571.07,
        "dist": -0.2164
      },
      "levels": [
        {
          "d": -0.1,
          "price": 2029.73,
          "dist": 0.6487,
          "hit": true
        },
        {
          "d": -0.2,
          "price": 1804.2,
          "dist": 0.4655,
          "hit": true
        },
        {
          "d": -0.3,
          "price": 1578.67,
          "dist": 0.2823,
          "hit": true
        },
        {
          "d": -0.4,
          "price": 1353.15,
          "dist": 0.0991,
          "hit": true
        },
        {
          "d": -0.5,
          "price": 1127.62,
          "dist": -0.084,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 1279.66,
          "high": 1488.66,
          "mid": 1375.96,
          "days": 111,
          "first": "2025-11-11",
          "last": "2026-11-13",
          "type": "resistance",
          "dist": 0.1177
        },
        {
          "low": 1640.46,
          "high": 1718.69,
          "mid": 1678.99,
          "days": 33,
          "first": "2026-05-06",
          "last": "2026-09-23",
          "type": "resistance",
          "dist": 0.3638
        },
        {
          "low": 1552.89,
          "high": 1571.07,
          "mid": 1559.6,
          "days": 9,
          "first": "2026-01-23",
          "last": "2026-09-29",
          "type": "resistance",
          "dist": 0.2668
        }
      ],
      "zone": "回撤40–50%",
      "zoneDesc": "仅描述窗口高点回撤深度，不构成加仓或投资机会判断"
    }
  ],
  "pipeline": {
    "state": {
      "QQQ": {
        "maxHit": 0.2,
        "asOf": "2026-11-20"
      },
      "SPY": {
        "maxHit": 0.1,
        "asOf": "2026-11-20"
      },
      "DIA": {
        "maxHit": 0.1,
        "asOf": "2026-11-20"
      },
      "IWM": {
        "maxHit": 0.1,
        "asOf": "2026-11-20"
      },
      "SH000001": {
        "maxHit": 0.1,
        "asOf": "2026-11-20"
      },
      "SH000300": {
        "maxHit": 0.3,
        "asOf": "2026-11-20"
      },
      "SH000510": {
        "maxHit": 0.2,
        "asOf": "2026-11-20"
      },
      "SZ399006": {
        "maxHit": 0.4,
        "asOf": "2026-11-20"
      },
      "SH000688": {
        "maxHit": 0.4,
        "asOf": "2026-11-20"
      }
    },
    "pendingAlerts": [],
    "acknowledgedIds": []
  }
};

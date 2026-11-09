/* Generated snapshot; state/outbox are embedded as authority. */
window.DRAWDOWN = {
  "meta": {
    "schemaVersion": 2,
    "asOf": "2026-11-09T11:54:59.666613+00:00",
    "generatedBy": "scripts/fetch_drawdown.py",
    "refreshCadence": "按需运行；实际定时任务需独立核验",
    "sources": {
      "US": "优先长桥；备用 Yahoo / AkShare 新浪；不补实时价",
      "A": "优先长桥；备用腾讯 / AkShare 新浪；不补实时价"
    },
    "note": "窗口最多2000交易日；不足时明确标注。历史最高价未核验则为null。仅描述回撤深度，不自动判定投资机会。",
    "generationId": "c4ce366a87f574d189478b09"
  },
  "indices": [
    {
      "code": "QQQ",
      "name": "纳斯达克100",
      "market": "US",
      "ccy": "USD",
      "source": "Longbridge",
      "asOf": "2026-11-06",
      "price": 656.1,
      "peak": {
        "value": 762.86,
        "date": "2026-10-06",
        "kind": "rolling_2000_sessions",
        "windowLimit": 2000,
        "sampleSessions": 2000,
        "windowStart": "2018-11-21",
        "windowEnd": "2026-11-06",
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
        "expectedSession": "2026-11-06",
        "calendar": "XNYS",
        "settlementDelayMinutes": 20,
        "observedAt": "2026-11-09T11:54:59.666613+00:00",
        "rows": 2000,
        "start": "2018-11-21",
        "end": "2026-11-06",
        "approvedJumps": [],
        "reviewedSplits": []
      },
      "drawdown": -0.1399,
      "ma200": {
        "value": 680.89,
        "dist": -0.0364
      },
      "levels": [
        {
          "d": -0.1,
          "price": 686.57,
          "dist": 0.0464,
          "hit": true
        },
        {
          "d": -0.2,
          "price": 610.29,
          "dist": -0.0698,
          "hit": false
        },
        {
          "d": -0.3,
          "price": 534.0,
          "dist": -0.1861,
          "hit": false
        },
        {
          "d": -0.4,
          "price": 457.72,
          "dist": -0.3024,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 381.43,
          "dist": -0.4186,
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
          "dist": 0.0914
        },
        {
          "low": 599.75,
          "high": 626.65,
          "mid": 613.98,
          "days": 80,
          "first": "2025-11-10",
          "last": "2026-04-13",
          "type": "support",
          "dist": -0.0642
        },
        {
          "low": 739.77,
          "high": 747.46,
          "mid": 743.03,
          "days": 15,
          "first": "2026-06-01",
          "last": "2026-10-13",
          "type": "resistance",
          "dist": 0.1325
        }
      ],
      "zone": "回撤10–20%",
      "zoneDesc": "仅描述窗口高点回撤深度，不构成加仓或投资机会判断"
    },
    {
      "code": "SPY",
      "name": "标普500",
      "market": "US",
      "ccy": "USD",
      "source": "Yahoo Finance",
      "asOf": "2026-11-06",
      "price": 735.29,
      "peak": {
        "value": 781.62,
        "date": "2026-10-06",
        "kind": "rolling_2000_sessions",
        "windowLimit": 2000,
        "sampleSessions": 2000,
        "windowStart": "2018-11-21",
        "windowEnd": "2026-11-06",
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
        "expectedSession": "2026-11-06",
        "calendar": "XNYS",
        "settlementDelayMinutes": 20,
        "observedAt": "2026-11-09T11:54:59.666613+00:00",
        "rows": 2000,
        "start": "2018-11-21",
        "end": "2026-11-06",
        "approvedJumps": [],
        "reviewedSplits": []
      },
      "drawdown": -0.0593,
      "ma200": {
        "value": 730.38,
        "dist": 0.0067
      },
      "levels": [
        {
          "d": -0.1,
          "price": 703.46,
          "dist": -0.0433,
          "hit": false
        },
        {
          "d": -0.2,
          "price": 625.3,
          "dist": -0.1496,
          "hit": false
        },
        {
          "d": -0.3,
          "price": 547.13,
          "dist": -0.2559,
          "hit": false
        },
        {
          "d": -0.4,
          "price": 468.97,
          "dist": -0.3622,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 390.81,
          "dist": -0.4685,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 676.33,
          "high": 695.49,
          "mid": 686.25,
          "days": 76,
          "first": "2025-11-10",
          "last": "2026-04-14",
          "type": "support",
          "dist": -0.0667
        },
        {
          "low": 738.18,
          "high": 754.95,
          "mid": 746.23,
          "days": 46,
          "first": "2026-05-11",
          "last": "2026-11-03",
          "type": "resistance",
          "dist": 0.0149
        },
        {
          "low": 761.69,
          "high": 773.17,
          "mid": 767.53,
          "days": 46,
          "first": "2026-08-04",
          "last": "2026-11-04",
          "type": "resistance",
          "dist": 0.0438
        }
      ],
      "zone": "回撤不足10%",
      "zoneDesc": "仅描述窗口高点回撤深度，不构成加仓或投资机会判断"
    },
    {
      "code": "DIA",
      "name": "道琼斯工业",
      "market": "US",
      "ccy": "USD",
      "source": "Yahoo Finance",
      "asOf": "2026-11-06",
      "price": 512.22,
      "peak": {
        "value": 546.75,
        "date": "2026-08-05",
        "kind": "rolling_2000_sessions",
        "windowLimit": 2000,
        "sampleSessions": 2000,
        "windowStart": "2018-11-21",
        "windowEnd": "2026-11-06",
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
        "expectedSession": "2026-11-06",
        "calendar": "XNYS",
        "settlementDelayMinutes": 20,
        "observedAt": "2026-11-09T11:54:59.666613+00:00",
        "rows": 2000,
        "start": "2018-11-21",
        "end": "2026-11-06",
        "approvedJumps": [],
        "reviewedSplits": []
      },
      "drawdown": -0.0632,
      "ma200": {
        "value": 506.65,
        "dist": 0.011
      },
      "levels": [
        {
          "d": -0.1,
          "price": 492.07,
          "dist": -0.0393,
          "hit": false
        },
        {
          "d": -0.2,
          "price": 437.4,
          "dist": -0.1461,
          "hit": false
        },
        {
          "d": -0.3,
          "price": 382.72,
          "dist": -0.2528,
          "hit": false
        },
        {
          "d": -0.4,
          "price": 328.05,
          "dist": -0.3596,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 273.38,
          "dist": -0.4663,
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
          "dist": -0.0402
        },
        {
          "low": 515.41,
          "high": 528.03,
          "mid": 521.17,
          "days": 63,
          "first": "2026-06-04",
          "last": "2026-11-03",
          "type": "resistance",
          "dist": 0.0175
        },
        {
          "low": 479.07,
          "high": 480.57,
          "mid": 479.71,
          "days": 10,
          "first": "2025-11-11",
          "last": "2026-04-10",
          "type": "support",
          "dist": -0.0635
        }
      ],
      "zone": "回撤不足10%",
      "zoneDesc": "仅描述窗口高点回撤深度，不构成加仓或投资机会判断"
    },
    {
      "code": "IWM",
      "name": "罗素2000",
      "market": "US",
      "ccy": "USD",
      "source": "Yahoo Finance",
      "asOf": "2026-11-06",
      "price": 273.67,
      "peak": {
        "value": 305.18,
        "date": "2026-08-14",
        "kind": "rolling_2000_sessions",
        "windowLimit": 2000,
        "sampleSessions": 2000,
        "windowStart": "2018-11-21",
        "windowEnd": "2026-11-06",
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
        "expectedSession": "2026-11-06",
        "calendar": "XNYS",
        "settlementDelayMinutes": 20,
        "observedAt": "2026-11-09T11:54:59.666613+00:00",
        "rows": 2000,
        "start": "2018-11-21",
        "end": "2026-11-06",
        "approvedJumps": [],
        "reviewedSplits": []
      },
      "drawdown": -0.1033,
      "ma200": {
        "value": 279.0,
        "dist": -0.0191
      },
      "levels": [
        {
          "d": -0.1,
          "price": 274.66,
          "dist": 0.0036,
          "hit": true
        },
        {
          "d": -0.2,
          "price": 244.14,
          "dist": -0.1079,
          "hit": false
        },
        {
          "d": -0.3,
          "price": 213.63,
          "dist": -0.2194,
          "hit": false
        },
        {
          "d": -0.4,
          "price": 183.11,
          "dist": -0.3309,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 152.59,
          "dist": -0.4424,
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
          "dist": 0.0791
        },
        {
          "low": 276.48,
          "high": 285.33,
          "mid": 280.65,
          "days": 50,
          "first": "2026-04-20",
          "last": "2026-11-04",
          "type": "resistance",
          "dist": 0.0255
        },
        {
          "low": 247.41,
          "high": 253.36,
          "mid": 250.33,
          "days": 33,
          "first": "2025-11-28",
          "last": "2026-04-07",
          "type": "support",
          "dist": -0.0853
        },
        {
          "low": 261.3,
          "high": 265.51,
          "mid": 263.4,
          "days": 27,
          "first": "2026-01-12",
          "last": "2026-04-13",
          "type": "support",
          "dist": -0.0375
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
      "source": "腾讯证券",
      "asOf": "2026-11-09",
      "price": 3660.79,
      "peak": {
        "value": 4258.86,
        "date": "2026-05-14",
        "kind": "rolling_2000_sessions",
        "windowLimit": 2000,
        "sampleSessions": 2000,
        "windowStart": "2018-08-08",
        "windowEnd": "2026-11-09",
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
        "expectedSession": "2026-11-09",
        "calendar": "XSHG",
        "settlementDelayMinutes": 20,
        "observedAt": "2026-11-09T11:54:59.666613+00:00",
        "rows": 2000,
        "start": "2018-08-08",
        "end": "2026-11-09",
        "approvedJumps": [],
        "reviewedSplits": []
      },
      "drawdown": -0.1404,
      "ma200": {
        "value": 3982.22,
        "dist": -0.0807
      },
      "levels": [
        {
          "d": -0.1,
          "price": 3832.97,
          "dist": 0.047,
          "hit": true
        },
        {
          "d": -0.2,
          "price": 3407.09,
          "dist": -0.0693,
          "hit": false
        },
        {
          "d": -0.3,
          "price": 2981.2,
          "dist": -0.1856,
          "hit": false
        },
        {
          "d": -0.4,
          "price": 2555.32,
          "dist": -0.302,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 2129.43,
          "dist": -0.4183,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 3870.02,
          "high": 3997.56,
          "mid": 3931.18,
          "days": 97,
          "first": "2025-10-30",
          "last": "2026-09-24",
          "type": "resistance",
          "dist": 0.0739
        },
        {
          "low": 4075.92,
          "high": 4138.76,
          "mid": 4106.85,
          "days": 58,
          "first": "2026-01-06",
          "last": "2026-07-01",
          "type": "resistance",
          "dist": 0.1218
        },
        {
          "low": 4026.63,
          "high": 4036.59,
          "mid": 4029.42,
          "days": 8,
          "first": "2025-11-13",
          "last": "2026-07-09",
          "type": "resistance",
          "dist": 0.1007
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
      "source": "腾讯证券",
      "asOf": "2026-11-09",
      "price": 4056.11,
      "peak": {
        "value": 5930.91,
        "date": "2021-02-18",
        "kind": "rolling_2000_sessions",
        "windowLimit": 2000,
        "sampleSessions": 2000,
        "windowStart": "2018-08-08",
        "windowEnd": "2026-11-09",
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
        "expectedSession": "2026-11-09",
        "calendar": "XSHG",
        "settlementDelayMinutes": 20,
        "observedAt": "2026-11-09T11:54:59.666613+00:00",
        "rows": 2000,
        "start": "2018-08-08",
        "end": "2026-11-09",
        "approvedJumps": [],
        "reviewedSplits": []
      },
      "drawdown": -0.3161,
      "ma200": {
        "value": 4633.91,
        "dist": -0.1247
      },
      "levels": [
        {
          "d": -0.1,
          "price": 5337.82,
          "dist": 0.316,
          "hit": true
        },
        {
          "d": -0.2,
          "price": 4744.73,
          "dist": 0.1698,
          "hit": true
        },
        {
          "d": -0.3,
          "price": 4151.64,
          "dist": 0.0236,
          "hit": true
        },
        {
          "d": -0.4,
          "price": 3558.55,
          "dist": -0.1227,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 2965.45,
          "dist": -0.2689,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 4544.59,
          "high": 4801.81,
          "mid": 4666.63,
          "days": 154,
          "first": "2025-10-29",
          "last": "2026-09-22",
          "type": "resistance",
          "dist": 0.1505
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
      "asOf": "2026-11-09",
      "price": 4910.13,
      "peak": {
        "value": 6375.34,
        "date": "2026-06-22",
        "kind": "rolling_2000_sessions",
        "windowLimit": 2000,
        "sampleSessions": 514,
        "windowStart": "2024-09-23",
        "windowEnd": "2026-11-09",
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
        "expectedSession": "2026-11-09",
        "calendar": "XSHG",
        "settlementDelayMinutes": 20,
        "observedAt": "2026-11-09T11:54:59.666613+00:00",
        "rows": 514,
        "start": "2024-09-23",
        "end": "2026-11-09",
        "approvedJumps": [],
        "reviewedSplits": []
      },
      "drawdown": -0.2298,
      "ma200": {
        "value": 5763.76,
        "dist": -0.1481
      },
      "levels": [
        {
          "d": -0.1,
          "price": 5737.81,
          "dist": 0.1686,
          "hit": true
        },
        {
          "d": -0.2,
          "price": 5100.27,
          "dist": 0.0387,
          "hit": true
        },
        {
          "d": -0.3,
          "price": 4462.74,
          "dist": -0.0911,
          "hit": false
        },
        {
          "d": -0.4,
          "price": 3825.2,
          "dist": -0.221,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 3187.67,
          "dist": -0.3508,
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
          "dist": 0.1985
        },
        {
          "low": 5461.75,
          "high": 5675.34,
          "mid": 5575.84,
          "days": 77,
          "first": "2025-10-30",
          "last": "2026-09-24",
          "type": "resistance",
          "dist": 0.1356
        },
        {
          "low": 6097.12,
          "high": 6117.37,
          "mid": 6107.93,
          "days": 9,
          "first": "2026-05-15",
          "last": "2026-07-06",
          "type": "resistance",
          "dist": 0.2439
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
      "source": "腾讯证券",
      "asOf": "2026-11-09",
      "price": 2458.56,
      "peak": {
        "value": 4380.41,
        "date": "2026-06-25",
        "kind": "rolling_2000_sessions",
        "windowLimit": 2000,
        "sampleSessions": 2000,
        "windowStart": "2018-08-08",
        "windowEnd": "2026-11-09",
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
        "expectedSession": "2026-11-09",
        "calendar": "XSHG",
        "settlementDelayMinutes": 20,
        "observedAt": "2026-11-09T11:54:59.666613+00:00",
        "rows": 2000,
        "start": "2018-08-08",
        "end": "2026-11-09",
        "approvedJumps": [
          "2024-09-30",
          "2024-10-08"
        ],
        "reviewedSplits": []
      },
      "drawdown": -0.4387,
      "ma200": {
        "value": 3461.22,
        "dist": -0.2897
      },
      "levels": [
        {
          "d": -0.1,
          "price": 3942.37,
          "dist": 0.6035,
          "hit": true
        },
        {
          "d": -0.2,
          "price": 3504.33,
          "dist": 0.4254,
          "hit": true
        },
        {
          "d": -0.3,
          "price": 3066.29,
          "dist": 0.2472,
          "hit": true
        },
        {
          "d": -0.4,
          "price": 2628.25,
          "dist": 0.069,
          "hit": true
        },
        {
          "d": -0.5,
          "price": 2190.2,
          "dist": -0.1092,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 3105.2,
          "high": 3379.61,
          "mid": 3264.19,
          "days": 115,
          "first": "2025-10-29",
          "last": "2026-09-30",
          "type": "resistance",
          "dist": 0.3277
        },
        {
          "low": 4017.27,
          "high": 4045.77,
          "mid": 4030.58,
          "days": 9,
          "first": "2026-05-13",
          "last": "2026-07-09",
          "type": "resistance",
          "dist": 0.6394
        },
        {
          "low": 3667.79,
          "high": 3692.46,
          "mid": 3681.92,
          "days": 8,
          "first": "2026-04-17",
          "last": "2026-07-21",
          "type": "resistance",
          "dist": 0.4976
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
      "asOf": "2026-11-09",
      "price": 1256.96,
      "peak": {
        "value": 2255.25,
        "date": "2026-07-01",
        "kind": "rolling_2000_sessions",
        "windowLimit": 2000,
        "sampleSessions": 1659,
        "windowStart": "2020-01-02",
        "windowEnd": "2026-11-09",
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
        "expectedSession": "2026-11-09",
        "calendar": "XSHG",
        "settlementDelayMinutes": 20,
        "observedAt": "2026-11-09T11:54:59.666613+00:00",
        "rows": 1659,
        "start": "2020-01-02",
        "end": "2026-11-09",
        "approvedJumps": [
          "2024-09-30",
          "2024-10-08"
        ],
        "reviewedSplits": []
      },
      "drawdown": -0.4427,
      "ma200": {
        "value": 1581.83,
        "dist": -0.2054
      },
      "levels": [
        {
          "d": -0.1,
          "price": 2029.73,
          "dist": 0.6148,
          "hit": true
        },
        {
          "d": -0.2,
          "price": 1804.2,
          "dist": 0.4354,
          "hit": true
        },
        {
          "d": -0.3,
          "price": 1578.67,
          "dist": 0.2559,
          "hit": true
        },
        {
          "d": -0.4,
          "price": 1353.15,
          "dist": 0.0765,
          "hit": true
        },
        {
          "d": -0.5,
          "price": 1127.62,
          "dist": -0.1029,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 1282.93,
          "high": 1489.12,
          "mid": 1381.59,
          "days": 117,
          "first": "2025-10-29",
          "last": "2026-11-05",
          "type": "resistance",
          "dist": 0.0992
        },
        {
          "low": 1640.46,
          "high": 1718.69,
          "mid": 1678.99,
          "days": 33,
          "first": "2026-05-06",
          "last": "2026-09-23",
          "type": "resistance",
          "dist": 0.3358
        },
        {
          "low": 1552.89,
          "high": 1571.07,
          "mid": 1559.6,
          "days": 9,
          "first": "2026-01-23",
          "last": "2026-09-29",
          "type": "resistance",
          "dist": 0.2408
        }
      ],
      "zone": "回撤40–50%",
      "zoneDesc": "仅描述窗口高点回撤深度，不构成加仓或投资机会判断"
    }
  ],
  "pipeline": {
    "state": {
      "QQQ": {
        "maxHit": 0.1,
        "asOf": "2026-11-06"
      },
      "SPY": {
        "maxHit": 0,
        "asOf": "2026-11-06"
      },
      "DIA": {
        "maxHit": 0,
        "asOf": "2026-11-06"
      },
      "IWM": {
        "maxHit": 0.1,
        "asOf": "2026-11-06"
      },
      "SH000001": {
        "maxHit": 0.1,
        "asOf": "2026-11-09"
      },
      "SH000300": {
        "maxHit": 0.3,
        "asOf": "2026-11-09"
      },
      "SH000510": {
        "maxHit": 0.2,
        "asOf": "2026-11-09"
      },
      "SZ399006": {
        "maxHit": 0.4,
        "asOf": "2026-11-09"
      },
      "SH000688": {
        "maxHit": 0.4,
        "asOf": "2026-11-09"
      }
    },
    "pendingAlerts": [],
    "acknowledgedIds": []
  }
};

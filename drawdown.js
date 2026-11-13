/* Generated snapshot; state/outbox are embedded as authority. */
window.DRAWDOWN = {
  "meta": {
    "schemaVersion": 2,
    "asOf": "2026-11-13T05:38:17.392173+00:00",
    "generatedBy": "scripts/fetch_drawdown.py",
    "refreshCadence": "按需运行；实际定时任务需独立核验",
    "sources": {
      "US": "优先长桥；备用 Yahoo / AkShare 新浪；不补实时价",
      "A": "优先长桥；备用腾讯 / AkShare 新浪；不补实时价"
    },
    "note": "窗口最多2000交易日；不足时明确标注。历史最高价未核验则为null。仅描述回撤深度，不自动判定投资机会。",
    "generationId": "7ca4f529d69e563c3b9ce229"
  },
  "indices": [
    {
      "code": "QQQ",
      "name": "纳斯达克100",
      "market": "US",
      "ccy": "USD",
      "source": "Longbridge",
      "asOf": "2026-11-12",
      "price": 688.17,
      "peak": {
        "value": 762.86,
        "date": "2026-10-06",
        "kind": "rolling_2000_sessions",
        "windowLimit": 2000,
        "sampleSessions": 2000,
        "windowStart": "2018-11-28",
        "windowEnd": "2026-11-12",
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
        "expectedSession": "2026-11-12",
        "calendar": "XNYS",
        "settlementDelayMinutes": 20,
        "observedAt": "2026-11-13T05:38:17.392173+00:00",
        "rows": 2000,
        "start": "2018-11-28",
        "end": "2026-11-12",
        "approvedJumps": [],
        "reviewedSplits": []
      },
      "drawdown": -0.0979,
      "ma200": {
        "value": 681.99,
        "dist": 0.0091
      },
      "levels": [
        {
          "d": -0.1,
          "price": 686.57,
          "dist": -0.0023,
          "hit": false
        },
        {
          "d": -0.2,
          "price": 610.29,
          "dist": -0.1132,
          "hit": false
        },
        {
          "d": -0.3,
          "price": 534.0,
          "dist": -0.224,
          "hit": false
        },
        {
          "d": -0.4,
          "price": 457.72,
          "dist": -0.3349,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 381.43,
          "dist": -0.4457,
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
          "dist": 0.0405
        },
        {
          "low": 599.75,
          "high": 626.65,
          "mid": 613.74,
          "days": 76,
          "first": "2025-11-14",
          "last": "2026-04-13",
          "type": "support",
          "dist": -0.1082
        },
        {
          "low": 739.77,
          "high": 747.46,
          "mid": 743.03,
          "days": 15,
          "first": "2026-06-01",
          "last": "2026-10-13",
          "type": "resistance",
          "dist": 0.0797
        }
      ],
      "zone": "回撤不足10%",
      "zoneDesc": "仅描述窗口高点回撤深度，不构成加仓或投资机会判断"
    },
    {
      "code": "SPY",
      "name": "标普500",
      "market": "US",
      "ccy": "USD",
      "source": "Yahoo Finance",
      "asOf": "2026-11-12",
      "price": 757.12,
      "peak": {
        "value": 781.62,
        "date": "2026-10-06",
        "kind": "rolling_2000_sessions",
        "windowLimit": 2000,
        "sampleSessions": 2000,
        "windowStart": "2018-11-28",
        "windowEnd": "2026-11-12",
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
        "expectedSession": "2026-11-12",
        "calendar": "XNYS",
        "settlementDelayMinutes": 20,
        "observedAt": "2026-11-13T05:38:17.392173+00:00",
        "rows": 2000,
        "start": "2018-11-28",
        "end": "2026-11-12",
        "approvedJumps": [],
        "reviewedSplits": [],
        "sourceChangeAccepted": true,
        "previousSource": "AkShare(新浪)",
        "baselineRevision": 3.243574742128885e-09
      },
      "drawdown": -0.0313,
      "ma200": {
        "value": 731.62,
        "dist": 0.0349
      },
      "levels": [
        {
          "d": -0.1,
          "price": 703.46,
          "dist": -0.0709,
          "hit": false
        },
        {
          "d": -0.2,
          "price": 625.3,
          "dist": -0.1741,
          "hit": false
        },
        {
          "d": -0.3,
          "price": 547.13,
          "dist": -0.2774,
          "hit": false
        },
        {
          "d": -0.4,
          "price": 468.97,
          "dist": -0.3806,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 390.81,
          "dist": -0.4838,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 738.18,
          "high": 773.17,
          "mid": 756.92,
          "days": 106,
          "first": "2026-05-11",
          "last": "2026-11-12",
          "type": "current",
          "dist": -0.0003
        },
        {
          "low": 676.33,
          "high": 695.49,
          "mid": 686.4,
          "days": 73,
          "first": "2025-11-26",
          "last": "2026-04-14",
          "type": "support",
          "dist": -0.0934
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
      "asOf": "2026-11-12",
      "price": 522.47,
      "peak": {
        "value": 546.75,
        "date": "2026-08-05",
        "kind": "rolling_2000_sessions",
        "windowLimit": 2000,
        "sampleSessions": 2000,
        "windowStart": "2018-11-28",
        "windowEnd": "2026-11-12",
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
        "expectedSession": "2026-11-12",
        "calendar": "XNYS",
        "settlementDelayMinutes": 20,
        "observedAt": "2026-11-13T05:38:17.392173+00:00",
        "rows": 2000,
        "start": "2018-11-28",
        "end": "2026-11-12",
        "approvedJumps": [],
        "reviewedSplits": [],
        "sourceChangeAccepted": true,
        "previousSource": "AkShare(新浪)",
        "baselineRevision": 3.2655960380267857e-08
      },
      "drawdown": -0.0444,
      "ma200": {
        "value": 507.28,
        "dist": 0.0299
      },
      "levels": [
        {
          "d": -0.1,
          "price": 492.07,
          "dist": -0.0582,
          "hit": false
        },
        {
          "d": -0.2,
          "price": 437.4,
          "dist": -0.1628,
          "hit": false
        },
        {
          "d": -0.3,
          "price": 382.72,
          "dist": -0.2675,
          "hit": false
        },
        {
          "d": -0.4,
          "price": 328.05,
          "dist": -0.3721,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 273.38,
          "dist": -0.4768,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 515.41,
          "high": 528.03,
          "mid": 521.28,
          "days": 67,
          "first": "2026-06-04",
          "last": "2026-11-12",
          "type": "current",
          "dist": -0.0023
        },
        {
          "low": 484.59,
          "high": 497.01,
          "mid": 491.64,
          "days": 64,
          "first": "2025-12-11",
          "last": "2026-05-19",
          "type": "support",
          "dist": -0.059
        },
        {
          "low": 479.07,
          "high": 480.57,
          "mid": 479.74,
          "days": 9,
          "first": "2025-12-03",
          "last": "2026-04-10",
          "type": "support",
          "dist": -0.0818
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
      "asOf": "2026-11-12",
      "price": 278.44,
      "peak": {
        "value": 305.18,
        "date": "2026-08-14",
        "kind": "rolling_2000_sessions",
        "windowLimit": 2000,
        "sampleSessions": 2000,
        "windowStart": "2018-11-28",
        "windowEnd": "2026-11-12",
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
        "expectedSession": "2026-11-12",
        "calendar": "XNYS",
        "settlementDelayMinutes": 20,
        "observedAt": "2026-11-13T05:38:17.392173+00:00",
        "rows": 2000,
        "start": "2018-11-28",
        "end": "2026-11-12",
        "approvedJumps": [],
        "reviewedSplits": [],
        "sourceChangeAccepted": true,
        "previousSource": "AkShare(新浪)",
        "baselineRevision": 3.456736052953602e-08
      },
      "drawdown": -0.0876,
      "ma200": {
        "value": 279.34,
        "dist": -0.0032
      },
      "levels": [
        {
          "d": -0.1,
          "price": 274.66,
          "dist": -0.0136,
          "hit": false
        },
        {
          "d": -0.2,
          "price": 244.14,
          "dist": -0.1232,
          "hit": false
        },
        {
          "d": -0.3,
          "price": 213.63,
          "dist": -0.2328,
          "hit": false
        },
        {
          "d": -0.4,
          "price": 183.11,
          "dist": -0.3424,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 152.59,
          "dist": -0.452,
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
          "dist": 0.0606
        },
        {
          "low": 276.48,
          "high": 285.33,
          "mid": 280.68,
          "days": 54,
          "first": "2026-04-20",
          "last": "2026-11-12",
          "type": "current",
          "dist": 0.008
        },
        {
          "low": 247.41,
          "high": 253.36,
          "mid": 250.33,
          "days": 33,
          "first": "2025-11-28",
          "last": "2026-04-07",
          "type": "support",
          "dist": -0.101
        },
        {
          "low": 261.3,
          "high": 265.51,
          "mid": 263.4,
          "days": 27,
          "first": "2026-01-12",
          "last": "2026-04-13",
          "type": "support",
          "dist": -0.054
        }
      ],
      "zone": "回撤不足10%",
      "zoneDesc": "仅描述窗口高点回撤深度，不构成加仓或投资机会判断"
    },
    {
      "code": "SH000001",
      "name": "上证指数",
      "market": "A",
      "ccy": "CNY",
      "source": "腾讯证券",
      "asOf": "2026-11-12",
      "price": 3655.83,
      "peak": {
        "value": 4258.86,
        "date": "2026-05-14",
        "kind": "rolling_2000_sessions",
        "windowLimit": 2000,
        "sampleSessions": 2000,
        "windowStart": "2018-08-13",
        "windowEnd": "2026-11-12",
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
        "expectedSession": "2026-11-12",
        "calendar": "XSHG",
        "settlementDelayMinutes": 20,
        "observedAt": "2026-11-13T05:38:17.392173+00:00",
        "rows": 2000,
        "start": "2018-08-13",
        "end": "2026-11-12",
        "approvedJumps": [],
        "reviewedSplits": []
      },
      "drawdown": -0.1416,
      "ma200": {
        "value": 3975.1,
        "dist": -0.0803
      },
      "levels": [
        {
          "d": -0.1,
          "price": 3832.97,
          "dist": 0.0485,
          "hit": true
        },
        {
          "d": -0.2,
          "price": 3407.09,
          "dist": -0.068,
          "hit": false
        },
        {
          "d": -0.3,
          "price": 2981.2,
          "dist": -0.1845,
          "hit": false
        },
        {
          "d": -0.4,
          "price": 2555.32,
          "dist": -0.301,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 2129.43,
          "dist": -0.4175,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 3870.02,
          "high": 3997.56,
          "mid": 3930.35,
          "days": 95,
          "first": "2025-11-03",
          "last": "2026-09-24",
          "type": "resistance",
          "dist": 0.0751
        },
        {
          "low": 4075.92,
          "high": 4138.76,
          "mid": 4106.85,
          "days": 58,
          "first": "2026-01-06",
          "last": "2026-07-01",
          "type": "resistance",
          "dist": 0.1234
        },
        {
          "low": 4026.63,
          "high": 4036.59,
          "mid": 4029.42,
          "days": 8,
          "first": "2025-11-13",
          "last": "2026-07-09",
          "type": "resistance",
          "dist": 0.1022
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
      "asOf": "2026-11-12",
      "price": 4043.93,
      "peak": {
        "value": 5930.91,
        "date": "2021-02-18",
        "kind": "rolling_2000_sessions",
        "windowLimit": 2000,
        "sampleSessions": 2000,
        "windowStart": "2018-08-13",
        "windowEnd": "2026-11-12",
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
        "expectedSession": "2026-11-12",
        "calendar": "XSHG",
        "settlementDelayMinutes": 20,
        "observedAt": "2026-11-13T05:38:17.392173+00:00",
        "rows": 2000,
        "start": "2018-08-13",
        "end": "2026-11-12",
        "approvedJumps": [],
        "reviewedSplits": []
      },
      "drawdown": -0.3182,
      "ma200": {
        "value": 4623.25,
        "dist": -0.1253
      },
      "levels": [
        {
          "d": -0.1,
          "price": 5337.82,
          "dist": 0.32,
          "hit": true
        },
        {
          "d": -0.2,
          "price": 4744.73,
          "dist": 0.1733,
          "hit": true
        },
        {
          "d": -0.3,
          "price": 4151.64,
          "dist": 0.0266,
          "hit": true
        },
        {
          "d": -0.4,
          "price": 3558.55,
          "dist": -0.12,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 2965.45,
          "dist": -0.2667,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 4544.59,
          "high": 4801.81,
          "mid": 4665.98,
          "days": 151,
          "first": "2025-11-03",
          "last": "2026-09-22",
          "type": "resistance",
          "dist": 0.1538
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
      "asOf": "2026-11-12",
      "price": 4899.93,
      "peak": {
        "value": 6375.34,
        "date": "2026-06-22",
        "kind": "rolling_2000_sessions",
        "windowLimit": 2000,
        "sampleSessions": 517,
        "windowStart": "2024-09-23",
        "windowEnd": "2026-11-12",
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
        "expectedSession": "2026-11-12",
        "calendar": "XSHG",
        "settlementDelayMinutes": 20,
        "observedAt": "2026-11-13T05:38:17.392173+00:00",
        "rows": 517,
        "start": "2024-09-23",
        "end": "2026-11-12",
        "approvedJumps": [],
        "reviewedSplits": []
      },
      "drawdown": -0.2314,
      "ma200": {
        "value": 5748.97,
        "dist": -0.1477
      },
      "levels": [
        {
          "d": -0.1,
          "price": 5737.81,
          "dist": 0.171,
          "hit": true
        },
        {
          "d": -0.2,
          "price": 5100.27,
          "dist": 0.0409,
          "hit": true
        },
        {
          "d": -0.3,
          "price": 4462.74,
          "dist": -0.0892,
          "hit": false
        },
        {
          "d": -0.4,
          "price": 3825.2,
          "dist": -0.2193,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 3187.67,
          "dist": -0.3494,
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
          "dist": 0.201
        },
        {
          "low": 5461.75,
          "high": 5644.97,
          "mid": 5565.73,
          "days": 68,
          "first": "2025-11-03",
          "last": "2026-09-24",
          "type": "resistance",
          "dist": 0.1359
        },
        {
          "low": 6097.12,
          "high": 6117.37,
          "mid": 6107.93,
          "days": 9,
          "first": "2026-05-15",
          "last": "2026-07-06",
          "type": "resistance",
          "dist": 0.2465
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
      "asOf": "2026-11-12",
      "price": 2509.43,
      "peak": {
        "value": 4380.41,
        "date": "2026-06-25",
        "kind": "rolling_2000_sessions",
        "windowLimit": 2000,
        "sampleSessions": 2000,
        "windowStart": "2018-08-13",
        "windowEnd": "2026-11-12",
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
        "expectedSession": "2026-11-12",
        "calendar": "XSHG",
        "settlementDelayMinutes": 20,
        "observedAt": "2026-11-13T05:38:17.392173+00:00",
        "rows": 2000,
        "start": "2018-08-13",
        "end": "2026-11-12",
        "approvedJumps": [
          "2024-09-30",
          "2024-10-08"
        ],
        "reviewedSplits": []
      },
      "drawdown": -0.4271,
      "ma200": {
        "value": 3448.91,
        "dist": -0.2724
      },
      "levels": [
        {
          "d": -0.1,
          "price": 3942.37,
          "dist": 0.571,
          "hit": true
        },
        {
          "d": -0.2,
          "price": 3504.33,
          "dist": 0.3965,
          "hit": true
        },
        {
          "d": -0.3,
          "price": 3066.29,
          "dist": 0.2219,
          "hit": true
        },
        {
          "d": -0.4,
          "price": 2628.25,
          "dist": 0.0473,
          "hit": true
        },
        {
          "d": -0.5,
          "price": 2190.2,
          "dist": -0.1272,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 3105.2,
          "high": 3379.61,
          "mid": 3264.34,
          "days": 112,
          "first": "2025-11-03",
          "last": "2026-09-30",
          "type": "resistance",
          "dist": 0.3008
        },
        {
          "low": 4017.27,
          "high": 4045.77,
          "mid": 4030.58,
          "days": 9,
          "first": "2026-05-13",
          "last": "2026-07-09",
          "type": "resistance",
          "dist": 0.6062
        },
        {
          "low": 3667.79,
          "high": 3692.46,
          "mid": 3681.92,
          "days": 8,
          "first": "2026-04-17",
          "last": "2026-07-21",
          "type": "resistance",
          "dist": 0.4672
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
      "asOf": "2026-11-12",
      "price": 1309.84,
      "peak": {
        "value": 2255.25,
        "date": "2026-07-01",
        "kind": "rolling_2000_sessions",
        "windowLimit": 2000,
        "sampleSessions": 1662,
        "windowStart": "2020-01-02",
        "windowEnd": "2026-11-12",
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
        "expectedSession": "2026-11-12",
        "calendar": "XSHG",
        "settlementDelayMinutes": 20,
        "observedAt": "2026-11-13T05:38:17.392173+00:00",
        "rows": 1662,
        "start": "2020-01-02",
        "end": "2026-11-12",
        "approvedJumps": [
          "2024-09-30",
          "2024-10-08"
        ],
        "reviewedSplits": []
      },
      "drawdown": -0.4192,
      "ma200": {
        "value": 1578.91,
        "dist": -0.1704
      },
      "levels": [
        {
          "d": -0.1,
          "price": 2029.73,
          "dist": 0.5496,
          "hit": true
        },
        {
          "d": -0.2,
          "price": 1804.2,
          "dist": 0.3774,
          "hit": true
        },
        {
          "d": -0.3,
          "price": 1578.67,
          "dist": 0.2052,
          "hit": true
        },
        {
          "d": -0.4,
          "price": 1353.15,
          "dist": 0.0331,
          "hit": true
        },
        {
          "d": -0.5,
          "price": 1127.62,
          "dist": -0.1391,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 1282.93,
          "high": 1488.66,
          "mid": 1378.36,
          "days": 116,
          "first": "2025-11-03",
          "last": "2026-11-12",
          "type": "current",
          "dist": 0.0523
        },
        {
          "low": 1640.46,
          "high": 1718.69,
          "mid": 1678.99,
          "days": 33,
          "first": "2026-05-06",
          "last": "2026-09-23",
          "type": "resistance",
          "dist": 0.2818
        },
        {
          "low": 1552.89,
          "high": 1571.07,
          "mid": 1559.6,
          "days": 9,
          "first": "2026-01-23",
          "last": "2026-09-29",
          "type": "resistance",
          "dist": 0.1907
        }
      ],
      "zone": "回撤40–50%",
      "zoneDesc": "仅描述窗口高点回撤深度，不构成加仓或投资机会判断"
    }
  ],
  "pipeline": {
    "state": {
      "QQQ": {
        "maxHit": 0,
        "asOf": "2026-11-12"
      },
      "SPY": {
        "maxHit": 0,
        "asOf": "2026-11-12"
      },
      "DIA": {
        "maxHit": 0,
        "asOf": "2026-11-12"
      },
      "IWM": {
        "maxHit": 0,
        "asOf": "2026-11-12"
      },
      "SH000001": {
        "maxHit": 0.1,
        "asOf": "2026-11-12"
      },
      "SH000300": {
        "maxHit": 0.3,
        "asOf": "2026-11-12"
      },
      "SH000510": {
        "maxHit": 0.2,
        "asOf": "2026-11-12"
      },
      "SZ399006": {
        "maxHit": 0.4,
        "asOf": "2026-11-12"
      },
      "SH000688": {
        "maxHit": 0.4,
        "asOf": "2026-11-12"
      }
    },
    "pendingAlerts": [],
    "acknowledgedIds": []
  }
};

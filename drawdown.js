/* Generated snapshot; state/outbox are embedded as authority. */
window.DRAWDOWN = {
  "meta": {
    "schemaVersion": 2,
    "asOf": "2026-11-14T11:39:06.997662+00:00",
    "generatedBy": "scripts/fetch_drawdown.py",
    "refreshCadence": "按需运行；实际定时任务需独立核验",
    "sources": {
      "US": "优先长桥；备用 Yahoo / AkShare 新浪；不补实时价",
      "A": "优先长桥；备用腾讯 / AkShare 新浪；不补实时价"
    },
    "note": "窗口最多2000交易日；不足时明确标注。历史最高价未核验则为null。仅描述回撤深度，不自动判定投资机会。",
    "generationId": "a43ab356bdc85aaaedcd1332"
  },
  "indices": [
    {
      "code": "QQQ",
      "name": "纳斯达克100",
      "market": "US",
      "ccy": "USD",
      "source": "Longbridge",
      "asOf": "2026-11-13",
      "price": 679.89,
      "peak": {
        "value": 762.86,
        "date": "2026-10-06",
        "kind": "rolling_2000_sessions",
        "windowLimit": 2000,
        "sampleSessions": 2000,
        "windowStart": "2018-11-29",
        "windowEnd": "2026-11-13",
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
        "expectedSession": "2026-11-13",
        "calendar": "XNYS",
        "settlementDelayMinutes": 20,
        "observedAt": "2026-11-14T11:39:06.997662+00:00",
        "rows": 2000,
        "start": "2018-11-29",
        "end": "2026-11-13",
        "approvedJumps": [],
        "reviewedSplits": []
      },
      "drawdown": -0.1088,
      "ma200": {
        "value": 682.24,
        "dist": -0.0034
      },
      "levels": [
        {
          "d": -0.1,
          "price": 686.57,
          "dist": 0.0098,
          "hit": true
        },
        {
          "d": -0.2,
          "price": 610.29,
          "dist": -0.1024,
          "hit": false
        },
        {
          "d": -0.3,
          "price": 534.0,
          "dist": -0.2146,
          "hit": false
        },
        {
          "d": -0.4,
          "price": 457.72,
          "dist": -0.3268,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 381.43,
          "dist": -0.439,
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
          "dist": 0.0532
        },
        {
          "low": 599.75,
          "high": 626.65,
          "mid": 613.8,
          "days": 75,
          "first": "2025-11-17",
          "last": "2026-04-13",
          "type": "support",
          "dist": -0.0972
        },
        {
          "low": 739.77,
          "high": 747.46,
          "mid": 743.03,
          "days": 15,
          "first": "2026-06-01",
          "last": "2026-10-13",
          "type": "resistance",
          "dist": 0.0929
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
      "asOf": "2026-11-13",
      "price": 754.37,
      "peak": {
        "value": 781.62,
        "date": "2026-10-06",
        "kind": "rolling_2000_sessions",
        "windowLimit": 2000,
        "sampleSessions": 2000,
        "windowStart": "2018-11-29",
        "windowEnd": "2026-11-13",
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
        "expectedSession": "2026-11-13",
        "calendar": "XNYS",
        "settlementDelayMinutes": 20,
        "observedAt": "2026-11-14T11:39:06.997662+00:00",
        "rows": 2000,
        "start": "2018-11-29",
        "end": "2026-11-13",
        "approvedJumps": [],
        "reviewedSplits": []
      },
      "drawdown": -0.0349,
      "ma200": {
        "value": 731.92,
        "dist": 0.0307
      },
      "levels": [
        {
          "d": -0.1,
          "price": 703.46,
          "dist": -0.0675,
          "hit": false
        },
        {
          "d": -0.2,
          "price": 625.3,
          "dist": -0.1711,
          "hit": false
        },
        {
          "d": -0.3,
          "price": 547.13,
          "dist": -0.2747,
          "hit": false
        },
        {
          "d": -0.4,
          "price": 468.97,
          "dist": -0.3783,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 390.81,
          "dist": -0.4819,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 738.18,
          "high": 773.17,
          "mid": 756.9,
          "days": 107,
          "first": "2026-05-11",
          "last": "2026-11-13",
          "type": "current",
          "dist": 0.0034
        },
        {
          "low": 676.33,
          "high": 695.49,
          "mid": 686.4,
          "days": 73,
          "first": "2025-11-26",
          "last": "2026-04-14",
          "type": "support",
          "dist": -0.0901
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
      "asOf": "2026-11-13",
      "price": 523.15,
      "peak": {
        "value": 546.75,
        "date": "2026-08-05",
        "kind": "rolling_2000_sessions",
        "windowLimit": 2000,
        "sampleSessions": 2000,
        "windowStart": "2018-11-29",
        "windowEnd": "2026-11-13",
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
        "expectedSession": "2026-11-13",
        "calendar": "XNYS",
        "settlementDelayMinutes": 20,
        "observedAt": "2026-11-14T11:39:06.997662+00:00",
        "rows": 2000,
        "start": "2018-11-29",
        "end": "2026-11-13",
        "approvedJumps": [],
        "reviewedSplits": []
      },
      "drawdown": -0.0432,
      "ma200": {
        "value": 507.44,
        "dist": 0.031
      },
      "levels": [
        {
          "d": -0.1,
          "price": 492.07,
          "dist": -0.0594,
          "hit": false
        },
        {
          "d": -0.2,
          "price": 437.4,
          "dist": -0.1639,
          "hit": false
        },
        {
          "d": -0.3,
          "price": 382.72,
          "dist": -0.2684,
          "hit": false
        },
        {
          "d": -0.4,
          "price": 328.05,
          "dist": -0.3729,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 273.38,
          "dist": -0.4774,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 515.41,
          "high": 528.03,
          "mid": 521.3,
          "days": 68,
          "first": "2026-06-04",
          "last": "2026-11-13",
          "type": "current",
          "dist": -0.0035
        },
        {
          "low": 484.59,
          "high": 497.01,
          "mid": 491.64,
          "days": 64,
          "first": "2025-12-11",
          "last": "2026-05-19",
          "type": "support",
          "dist": -0.0602
        },
        {
          "low": 479.07,
          "high": 480.57,
          "mid": 479.74,
          "days": 9,
          "first": "2025-12-03",
          "last": "2026-04-10",
          "type": "support",
          "dist": -0.083
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
      "asOf": "2026-11-13",
      "price": 277.54,
      "peak": {
        "value": 305.18,
        "date": "2026-08-14",
        "kind": "rolling_2000_sessions",
        "windowLimit": 2000,
        "sampleSessions": 2000,
        "windowStart": "2018-11-29",
        "windowEnd": "2026-11-13",
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
        "expectedSession": "2026-11-13",
        "calendar": "XNYS",
        "settlementDelayMinutes": 20,
        "observedAt": "2026-11-14T11:39:06.997662+00:00",
        "rows": 2000,
        "start": "2018-11-29",
        "end": "2026-11-13",
        "approvedJumps": [],
        "reviewedSplits": []
      },
      "drawdown": -0.0906,
      "ma200": {
        "value": 279.41,
        "dist": -0.0067
      },
      "levels": [
        {
          "d": -0.1,
          "price": 274.66,
          "dist": -0.0104,
          "hit": false
        },
        {
          "d": -0.2,
          "price": 244.14,
          "dist": -0.1203,
          "hit": false
        },
        {
          "d": -0.3,
          "price": 213.63,
          "dist": -0.2303,
          "hit": false
        },
        {
          "d": -0.4,
          "price": 183.11,
          "dist": -0.3402,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 152.59,
          "dist": -0.4502,
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
          "dist": 0.064
        },
        {
          "low": 276.48,
          "high": 285.33,
          "mid": 280.63,
          "days": 55,
          "first": "2026-04-20",
          "last": "2026-11-13",
          "type": "current",
          "dist": 0.0111
        },
        {
          "low": 247.41,
          "high": 253.36,
          "mid": 250.33,
          "days": 33,
          "first": "2025-11-28",
          "last": "2026-04-07",
          "type": "support",
          "dist": -0.098
        },
        {
          "low": 261.3,
          "high": 265.51,
          "mid": 263.4,
          "days": 27,
          "first": "2026-01-12",
          "last": "2026-04-13",
          "type": "support",
          "dist": -0.0509
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
      "source": "Longbridge",
      "asOf": "2026-11-13",
      "price": 3634.35,
      "peak": {
        "value": 4258.86,
        "date": "2026-05-14",
        "kind": "rolling_2000_sessions",
        "windowLimit": 2000,
        "sampleSessions": 2000,
        "windowStart": "2018-08-14",
        "windowEnd": "2026-11-13",
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
        "expectedSession": "2026-11-13",
        "calendar": "XSHG",
        "settlementDelayMinutes": 20,
        "observedAt": "2026-11-14T11:39:06.997662+00:00",
        "rows": 2000,
        "start": "2018-08-14",
        "end": "2026-11-13",
        "approvedJumps": [],
        "reviewedSplits": [],
        "sourceChangeAccepted": true,
        "previousSource": "腾讯证券",
        "baselineRevision": 0.0
      },
      "drawdown": -0.1466,
      "ma200": {
        "value": 3972.64,
        "dist": -0.0852
      },
      "levels": [
        {
          "d": -0.1,
          "price": 3832.97,
          "dist": 0.0547,
          "hit": true
        },
        {
          "d": -0.2,
          "price": 3407.09,
          "dist": -0.0625,
          "hit": false
        },
        {
          "d": -0.3,
          "price": 2981.2,
          "dist": -0.1797,
          "hit": false
        },
        {
          "d": -0.4,
          "price": 2555.32,
          "dist": -0.2969,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 2129.43,
          "dist": -0.4141,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 3870.02,
          "high": 3997.56,
          "mid": 3929.86,
          "days": 94,
          "first": "2025-11-04",
          "last": "2026-09-24",
          "type": "resistance",
          "dist": 0.0813
        },
        {
          "low": 4075.92,
          "high": 4138.76,
          "mid": 4106.85,
          "days": 58,
          "first": "2026-01-06",
          "last": "2026-07-01",
          "type": "resistance",
          "dist": 0.13
        },
        {
          "low": 4026.63,
          "high": 4036.59,
          "mid": 4029.42,
          "days": 8,
          "first": "2025-11-13",
          "last": "2026-07-09",
          "type": "resistance",
          "dist": 0.1087
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
      "asOf": "2026-11-13",
      "price": 4016.29,
      "peak": {
        "value": 5930.91,
        "date": "2021-02-18",
        "kind": "rolling_2000_sessions",
        "windowLimit": 2000,
        "sampleSessions": 2000,
        "windowStart": "2018-08-14",
        "windowEnd": "2026-11-13",
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
        "expectedSession": "2026-11-13",
        "calendar": "XSHG",
        "settlementDelayMinutes": 20,
        "observedAt": "2026-11-14T11:39:06.997662+00:00",
        "rows": 2000,
        "start": "2018-08-14",
        "end": "2026-11-13",
        "approvedJumps": [],
        "reviewedSplits": [],
        "sourceChangeAccepted": true,
        "previousSource": "腾讯证券",
        "baselineRevision": 0.0
      },
      "drawdown": -0.3228,
      "ma200": {
        "value": 4619.62,
        "dist": -0.1306
      },
      "levels": [
        {
          "d": -0.1,
          "price": 5337.82,
          "dist": 0.329,
          "hit": true
        },
        {
          "d": -0.2,
          "price": 4744.73,
          "dist": 0.1814,
          "hit": true
        },
        {
          "d": -0.3,
          "price": 4151.64,
          "dist": 0.0337,
          "hit": true
        },
        {
          "d": -0.4,
          "price": 3558.55,
          "dist": -0.114,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 2965.45,
          "dist": -0.2616,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 4544.59,
          "high": 4801.81,
          "mid": 4666.06,
          "days": 150,
          "first": "2025-11-04",
          "last": "2026-09-22",
          "type": "resistance",
          "dist": 0.1618
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
      "asOf": "2026-11-13",
      "price": 4842.51,
      "peak": {
        "value": 6375.34,
        "date": "2026-06-22",
        "kind": "rolling_2000_sessions",
        "windowLimit": 2000,
        "sampleSessions": 518,
        "windowStart": "2024-09-23",
        "windowEnd": "2026-11-13",
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
        "expectedSession": "2026-11-13",
        "calendar": "XSHG",
        "settlementDelayMinutes": 20,
        "observedAt": "2026-11-14T11:39:06.997662+00:00",
        "rows": 518,
        "start": "2024-09-23",
        "end": "2026-11-13",
        "approvedJumps": [],
        "reviewedSplits": []
      },
      "drawdown": -0.2404,
      "ma200": {
        "value": 5743.67,
        "dist": -0.1569
      },
      "levels": [
        {
          "d": -0.1,
          "price": 5737.81,
          "dist": 0.1849,
          "hit": true
        },
        {
          "d": -0.2,
          "price": 5100.27,
          "dist": 0.0532,
          "hit": true
        },
        {
          "d": -0.3,
          "price": 4462.74,
          "dist": -0.0784,
          "hit": false
        },
        {
          "d": -0.4,
          "price": 3825.2,
          "dist": -0.2101,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 3187.67,
          "dist": -0.3417,
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
          "dist": 0.2152
        },
        {
          "low": 5461.75,
          "high": 5644.97,
          "mid": 5565.3,
          "days": 67,
          "first": "2025-11-04",
          "last": "2026-09-24",
          "type": "resistance",
          "dist": 0.1493
        },
        {
          "low": 6097.12,
          "high": 6117.37,
          "mid": 6107.93,
          "days": 9,
          "first": "2026-05-15",
          "last": "2026-07-06",
          "type": "resistance",
          "dist": 0.2613
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
      "asOf": "2026-11-13",
      "price": 2426.08,
      "peak": {
        "value": 4380.41,
        "date": "2026-06-25",
        "kind": "rolling_2000_sessions",
        "windowLimit": 2000,
        "sampleSessions": 2000,
        "windowStart": "2018-08-14",
        "windowEnd": "2026-11-13",
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
        "expectedSession": "2026-11-13",
        "calendar": "XSHG",
        "settlementDelayMinutes": 20,
        "observedAt": "2026-11-14T11:39:06.997662+00:00",
        "rows": 2000,
        "start": "2018-08-14",
        "end": "2026-11-13",
        "approvedJumps": [
          "2024-09-30",
          "2024-10-08"
        ],
        "reviewedSplits": [],
        "sourceChangeAccepted": true,
        "previousSource": "腾讯证券",
        "baselineRevision": 0.0
      },
      "drawdown": -0.4462,
      "ma200": {
        "value": 3444.29,
        "dist": -0.2956
      },
      "levels": [
        {
          "d": -0.1,
          "price": 3942.37,
          "dist": 0.625,
          "hit": true
        },
        {
          "d": -0.2,
          "price": 3504.33,
          "dist": 0.4444,
          "hit": true
        },
        {
          "d": -0.3,
          "price": 3066.29,
          "dist": 0.2639,
          "hit": true
        },
        {
          "d": -0.4,
          "price": 2628.25,
          "dist": 0.0833,
          "hit": true
        },
        {
          "d": -0.5,
          "price": 2190.2,
          "dist": -0.0972,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 3105.2,
          "high": 3379.61,
          "mid": 3264.95,
          "days": 111,
          "first": "2025-11-04",
          "last": "2026-09-30",
          "type": "resistance",
          "dist": 0.3458
        },
        {
          "low": 4017.27,
          "high": 4045.77,
          "mid": 4030.58,
          "days": 9,
          "first": "2026-05-13",
          "last": "2026-07-09",
          "type": "resistance",
          "dist": 0.6614
        },
        {
          "low": 3667.79,
          "high": 3692.46,
          "mid": 3681.92,
          "days": 8,
          "first": "2026-04-17",
          "last": "2026-07-21",
          "type": "resistance",
          "dist": 0.5176
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
      "asOf": "2026-11-13",
      "price": 1279.66,
      "peak": {
        "value": 2255.25,
        "date": "2026-07-01",
        "kind": "rolling_2000_sessions",
        "windowLimit": 2000,
        "sampleSessions": 1663,
        "windowStart": "2020-01-02",
        "windowEnd": "2026-11-13",
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
        "expectedSession": "2026-11-13",
        "calendar": "XSHG",
        "settlementDelayMinutes": 20,
        "observedAt": "2026-11-14T11:39:06.997662+00:00",
        "rows": 1663,
        "start": "2020-01-02",
        "end": "2026-11-13",
        "approvedJumps": [
          "2024-09-30",
          "2024-10-08"
        ],
        "reviewedSplits": []
      },
      "drawdown": -0.4326,
      "ma200": {
        "value": 1577.81,
        "dist": -0.189
      },
      "levels": [
        {
          "d": -0.1,
          "price": 2029.73,
          "dist": 0.5861,
          "hit": true
        },
        {
          "d": -0.2,
          "price": 1804.2,
          "dist": 0.4099,
          "hit": true
        },
        {
          "d": -0.3,
          "price": 1578.67,
          "dist": 0.2337,
          "hit": true
        },
        {
          "d": -0.4,
          "price": 1353.15,
          "dist": 0.0574,
          "hit": true
        },
        {
          "d": -0.5,
          "price": 1127.62,
          "dist": -0.1188,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 1279.66,
          "high": 1488.66,
          "mid": 1377.32,
          "days": 116,
          "first": "2025-11-04",
          "last": "2026-11-13",
          "type": "current",
          "dist": 0.0763
        },
        {
          "low": 1640.46,
          "high": 1718.69,
          "mid": 1678.99,
          "days": 33,
          "first": "2026-05-06",
          "last": "2026-09-23",
          "type": "resistance",
          "dist": 0.3121
        },
        {
          "low": 1552.89,
          "high": 1571.07,
          "mid": 1559.6,
          "days": 9,
          "first": "2026-01-23",
          "last": "2026-09-29",
          "type": "resistance",
          "dist": 0.2188
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
        "asOf": "2026-11-13"
      },
      "SPY": {
        "maxHit": 0,
        "asOf": "2026-11-13"
      },
      "DIA": {
        "maxHit": 0,
        "asOf": "2026-11-13"
      },
      "IWM": {
        "maxHit": 0,
        "asOf": "2026-11-13"
      },
      "SH000001": {
        "maxHit": 0.1,
        "asOf": "2026-11-13"
      },
      "SH000300": {
        "maxHit": 0.3,
        "asOf": "2026-11-13"
      },
      "SH000510": {
        "maxHit": 0.2,
        "asOf": "2026-11-13"
      },
      "SZ399006": {
        "maxHit": 0.4,
        "asOf": "2026-11-13"
      },
      "SH000688": {
        "maxHit": 0.4,
        "asOf": "2026-11-13"
      }
    },
    "pendingAlerts": [],
    "acknowledgedIds": []
  }
};

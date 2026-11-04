/* Generated snapshot; state/outbox are embedded as authority. */
window.DRAWDOWN = {
  "meta": {
    "schemaVersion": 2,
    "asOf": "2026-11-04T15:00:11.243383+00:00",
    "generatedBy": "scripts/fetch_drawdown.py",
    "refreshCadence": "按需运行；实际定时任务需独立核验",
    "sources": {
      "US": "优先长桥；备用 Yahoo / AkShare 新浪；不补实时价",
      "A": "优先长桥；备用腾讯 / AkShare 新浪；不补实时价"
    },
    "note": "窗口最多2000交易日；不足时明确标注。历史最高价未核验则为null。仅描述回撤深度，不自动判定投资机会。",
    "generationId": "29b7d81e40b4609659051a3d"
  },
  "indices": [
    {
      "code": "QQQ",
      "name": "纳斯达克100",
      "market": "US",
      "ccy": "USD",
      "source": "Yahoo Finance",
      "asOf": "2026-11-03",
      "price": 685.28,
      "peak": {
        "value": 762.86,
        "date": "2026-10-06",
        "kind": "rolling_2000_sessions",
        "windowLimit": 2000,
        "sampleSessions": 2000,
        "windowStart": "2018-11-16",
        "windowEnd": "2026-11-03",
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
        "expectedSession": "2026-11-03",
        "calendar": "XNYS",
        "settlementDelayMinutes": 20,
        "observedAt": "2026-11-04T15:00:11.243383+00:00",
        "rows": 2000,
        "start": "2018-11-16",
        "end": "2026-11-03",
        "approvedJumps": [],
        "sourceChangeAccepted": true,
        "previousSource": "AkShare(新浪)",
        "baselineRevision": 3.7542243758181826e-08
      },
      "drawdown": -0.1017,
      "ma200": {
        "value": 680.14,
        "dist": 0.0076
      },
      "levels": [
        {
          "d": -0.1,
          "price": 686.57,
          "dist": 0.0019,
          "hit": true
        },
        {
          "d": -0.2,
          "price": 610.29,
          "dist": -0.1094,
          "hit": false
        },
        {
          "d": -0.3,
          "price": 534.0,
          "dist": -0.2208,
          "hit": false
        },
        {
          "d": -0.4,
          "price": 457.72,
          "dist": -0.3321,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 381.43,
          "dist": -0.4434,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 599.75,
          "high": 626.65,
          "mid": 614.01,
          "days": 83,
          "first": "2025-11-05",
          "last": "2026-04-13",
          "type": "support",
          "dist": -0.104
        },
        {
          "low": 704.4,
          "high": 731.07,
          "mid": 716.05,
          "days": 81,
          "first": "2026-05-08",
          "last": "2026-10-29",
          "type": "resistance",
          "dist": 0.0449
        },
        {
          "low": 739.77,
          "high": 747.46,
          "mid": 743.03,
          "days": 15,
          "first": "2026-06-01",
          "last": "2026-10-13",
          "type": "resistance",
          "dist": 0.0843
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
      "asOf": "2026-11-03",
      "price": 754.35,
      "peak": {
        "value": 781.62,
        "date": "2026-10-06",
        "kind": "rolling_2000_sessions",
        "windowLimit": 2000,
        "sampleSessions": 2000,
        "windowStart": "2018-11-16",
        "windowEnd": "2026-11-03",
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
        "expectedSession": "2026-11-03",
        "calendar": "XNYS",
        "settlementDelayMinutes": 20,
        "observedAt": "2026-11-04T15:00:11.243383+00:00",
        "rows": 2000,
        "start": "2018-11-16",
        "end": "2026-11-03",
        "approvedJumps": [],
        "sourceChangeAccepted": true,
        "previousSource": "AkShare(新浪)",
        "baselineRevision": 1.903977009387603e-08
      },
      "drawdown": -0.0349,
      "ma200": {
        "value": 729.47,
        "dist": 0.0341
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
          "low": 670.31,
          "high": 695.49,
          "mid": 684.69,
          "days": 86,
          "first": "2025-11-05",
          "last": "2026-04-14",
          "type": "support",
          "dist": -0.0923
        },
        {
          "low": 738.18,
          "high": 754.95,
          "mid": 746.23,
          "days": 46,
          "first": "2026-05-11",
          "last": "2026-11-03",
          "type": "current",
          "dist": -0.0108
        },
        {
          "low": 761.69,
          "high": 773.17,
          "mid": 767.55,
          "days": 45,
          "first": "2026-08-04",
          "last": "2026-10-29",
          "type": "resistance",
          "dist": 0.0175
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
      "asOf": "2026-11-03",
      "price": 517.06,
      "peak": {
        "value": 546.75,
        "date": "2026-08-05",
        "kind": "rolling_2000_sessions",
        "windowLimit": 2000,
        "sampleSessions": 2000,
        "windowStart": "2018-11-16",
        "windowEnd": "2026-11-03",
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
        "expectedSession": "2026-11-03",
        "calendar": "XNYS",
        "settlementDelayMinutes": 20,
        "observedAt": "2026-11-04T15:00:11.243383+00:00",
        "rows": 2000,
        "start": "2018-11-16",
        "end": "2026-11-03",
        "approvedJumps": [],
        "sourceChangeAccepted": true,
        "previousSource": "AkShare(新浪)",
        "baselineRevision": 3.736393550113348e-08
      },
      "drawdown": -0.0543,
      "ma200": {
        "value": 506.19,
        "dist": 0.0215
      },
      "levels": [
        {
          "d": -0.1,
          "price": 492.07,
          "dist": -0.0483,
          "hit": false
        },
        {
          "d": -0.2,
          "price": 437.4,
          "dist": -0.1541,
          "hit": false
        },
        {
          "d": -0.3,
          "price": 382.72,
          "dist": -0.2598,
          "hit": false
        },
        {
          "d": -0.4,
          "price": 328.05,
          "dist": -0.3655,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 273.38,
          "dist": -0.4713,
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
          "dist": -0.0492
        },
        {
          "low": 515.41,
          "high": 528.03,
          "mid": 521.17,
          "days": 63,
          "first": "2026-06-04",
          "last": "2026-11-03",
          "type": "current",
          "dist": 0.0079
        },
        {
          "low": 479.07,
          "high": 480.57,
          "mid": 479.71,
          "days": 10,
          "first": "2025-11-11",
          "last": "2026-04-10",
          "type": "support",
          "dist": -0.0722
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
      "asOf": "2026-11-03",
      "price": 279.79,
      "peak": {
        "value": 305.18,
        "date": "2026-08-14",
        "kind": "rolling_2000_sessions",
        "windowLimit": 2000,
        "sampleSessions": 2000,
        "windowStart": "2018-11-16",
        "windowEnd": "2026-11-03",
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
        "expectedSession": "2026-11-03",
        "calendar": "XNYS",
        "settlementDelayMinutes": 20,
        "observedAt": "2026-11-04T15:00:11.243383+00:00",
        "rows": 2000,
        "start": "2018-11-16",
        "end": "2026-11-03",
        "approvedJumps": [],
        "sourceChangeAccepted": true,
        "previousSource": "AkShare(新浪)",
        "baselineRevision": 3.43847927908314e-08
      },
      "drawdown": -0.0832,
      "ma200": {
        "value": 278.86,
        "dist": 0.0033
      },
      "levels": [
        {
          "d": -0.1,
          "price": 274.66,
          "dist": -0.0183,
          "hit": false
        },
        {
          "d": -0.2,
          "price": 244.14,
          "dist": -0.1274,
          "hit": false
        },
        {
          "d": -0.3,
          "price": 213.63,
          "dist": -0.2365,
          "hit": false
        },
        {
          "d": -0.4,
          "price": 183.11,
          "dist": -0.3455,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 152.59,
          "dist": -0.4546,
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
          "dist": 0.0555
        },
        {
          "low": 276.48,
          "high": 285.33,
          "mid": 280.58,
          "days": 49,
          "first": "2026-04-20",
          "last": "2026-11-03",
          "type": "current",
          "dist": 0.0028
        },
        {
          "low": 247.41,
          "high": 253.36,
          "mid": 250.33,
          "days": 33,
          "first": "2025-11-28",
          "last": "2026-04-07",
          "type": "support",
          "dist": -0.1053
        },
        {
          "low": 261.3,
          "high": 265.51,
          "mid": 263.4,
          "days": 27,
          "first": "2026-01-12",
          "last": "2026-04-13",
          "type": "support",
          "dist": -0.0586
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
      "asOf": "2026-11-04",
      "price": 3686.17,
      "peak": {
        "value": 4258.86,
        "date": "2026-05-14",
        "kind": "rolling_2000_sessions",
        "windowLimit": 2000,
        "sampleSessions": 2000,
        "windowStart": "2018-08-03",
        "windowEnd": "2026-11-04",
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
        "expectedSession": "2026-11-04",
        "calendar": "XSHG",
        "settlementDelayMinutes": 20,
        "observedAt": "2026-11-04T15:00:11.243383+00:00",
        "rows": 2000,
        "start": "2018-08-03",
        "end": "2026-11-04",
        "approvedJumps": []
      },
      "drawdown": -0.1345,
      "ma200": {
        "value": 3988.49,
        "dist": -0.0758
      },
      "levels": [
        {
          "d": -0.1,
          "price": 3832.97,
          "dist": 0.0398,
          "hit": true
        },
        {
          "d": -0.2,
          "price": 3407.09,
          "dist": -0.0757,
          "hit": false
        },
        {
          "d": -0.3,
          "price": 2981.2,
          "dist": -0.1912,
          "hit": false
        },
        {
          "d": -0.4,
          "price": 2555.32,
          "dist": -0.3068,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 2129.43,
          "dist": -0.4223,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 3870.02,
          "high": 3997.56,
          "mid": 3932.6,
          "days": 100,
          "first": "2025-10-24",
          "last": "2026-09-24",
          "type": "resistance",
          "dist": 0.0669
        },
        {
          "low": 4075.92,
          "high": 4138.76,
          "mid": 4106.85,
          "days": 58,
          "first": "2026-01-06",
          "last": "2026-07-01",
          "type": "resistance",
          "dist": 0.1141
        },
        {
          "low": 4026.63,
          "high": 4036.59,
          "mid": 4029.42,
          "days": 8,
          "first": "2025-11-13",
          "last": "2026-07-09",
          "type": "resistance",
          "dist": 0.0931
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
      "asOf": "2026-11-04",
      "price": 4101.34,
      "peak": {
        "value": 5930.91,
        "date": "2021-02-18",
        "kind": "rolling_2000_sessions",
        "windowLimit": 2000,
        "sampleSessions": 2000,
        "windowStart": "2018-08-03",
        "windowEnd": "2026-11-04",
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
        "expectedSession": "2026-11-04",
        "calendar": "XSHG",
        "settlementDelayMinutes": 20,
        "observedAt": "2026-11-04T15:00:11.243383+00:00",
        "rows": 2000,
        "start": "2018-08-03",
        "end": "2026-11-04",
        "approvedJumps": []
      },
      "drawdown": -0.3085,
      "ma200": {
        "value": 4644.31,
        "dist": -0.1169
      },
      "levels": [
        {
          "d": -0.1,
          "price": 5337.82,
          "dist": 0.3015,
          "hit": true
        },
        {
          "d": -0.2,
          "price": 4744.73,
          "dist": 0.1569,
          "hit": true
        },
        {
          "d": -0.3,
          "price": 4151.64,
          "dist": 0.0123,
          "hit": true
        },
        {
          "d": -0.4,
          "price": 3558.55,
          "dist": -0.1323,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 2965.45,
          "dist": -0.277,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 4544.59,
          "high": 4801.81,
          "mid": 4667.07,
          "days": 157,
          "first": "2025-10-24",
          "last": "2026-09-22",
          "type": "resistance",
          "dist": 0.1379
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
      "source": "腾讯证券",
      "asOf": "2026-11-04",
      "price": 4966.07,
      "peak": {
        "value": 6375.33,
        "date": "2026-06-22",
        "kind": "rolling_2000_sessions",
        "windowLimit": 2000,
        "sampleSessions": 511,
        "windowStart": "2024-09-23",
        "windowEnd": "2026-11-04",
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
        "expectedSession": "2026-11-04",
        "calendar": "XSHG",
        "settlementDelayMinutes": 20,
        "observedAt": "2026-11-04T15:00:11.243383+00:00",
        "rows": 511,
        "start": "2024-09-23",
        "end": "2026-11-04",
        "approvedJumps": []
      },
      "drawdown": -0.221,
      "ma200": {
        "value": 5777.38,
        "dist": -0.1404
      },
      "levels": [
        {
          "d": -0.1,
          "price": 5737.8,
          "dist": 0.1554,
          "hit": true
        },
        {
          "d": -0.2,
          "price": 5100.26,
          "dist": 0.027,
          "hit": true
        },
        {
          "d": -0.3,
          "price": 4462.73,
          "dist": -0.1014,
          "hit": false
        },
        {
          "d": -0.4,
          "price": 3825.2,
          "dist": -0.2297,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 3187.66,
          "dist": -0.3581,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 5461.75,
          "high": 5675.34,
          "mid": 5577.66,
          "days": 80,
          "first": "2025-10-24",
          "last": "2026-09-24",
          "type": "resistance",
          "dist": 0.1232
        },
        {
          "low": 5783.05,
          "high": 5984.75,
          "mid": 5884.63,
          "days": 78,
          "first": "2026-01-06",
          "last": "2026-08-18",
          "type": "resistance",
          "dist": 0.185
        },
        {
          "low": 6097.12,
          "high": 6117.37,
          "mid": 6107.93,
          "days": 9,
          "first": "2026-05-15",
          "last": "2026-07-06",
          "type": "resistance",
          "dist": 0.2299
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
      "asOf": "2026-11-04",
      "price": 2544.73,
      "peak": {
        "value": 4380.41,
        "date": "2026-06-25",
        "kind": "rolling_2000_sessions",
        "windowLimit": 2000,
        "sampleSessions": 2000,
        "windowStart": "2018-08-03",
        "windowEnd": "2026-11-04",
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
        "expectedSession": "2026-11-04",
        "calendar": "XSHG",
        "settlementDelayMinutes": 20,
        "observedAt": "2026-11-04T15:00:11.243383+00:00",
        "rows": 2000,
        "start": "2018-08-03",
        "end": "2026-11-04",
        "approvedJumps": [
          "2024-09-30",
          "2024-10-08"
        ]
      },
      "drawdown": -0.4191,
      "ma200": {
        "value": 3473.52,
        "dist": -0.2674
      },
      "levels": [
        {
          "d": -0.1,
          "price": 3942.37,
          "dist": 0.5492,
          "hit": true
        },
        {
          "d": -0.2,
          "price": 3504.33,
          "dist": 0.3771,
          "hit": true
        },
        {
          "d": -0.3,
          "price": 3066.29,
          "dist": 0.205,
          "hit": true
        },
        {
          "d": -0.4,
          "price": 2628.25,
          "dist": 0.0328,
          "hit": true
        },
        {
          "d": -0.5,
          "price": 2190.2,
          "dist": -0.1393,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 3105.2,
          "high": 3379.61,
          "mid": 3262.86,
          "days": 118,
          "first": "2025-10-24",
          "last": "2026-09-30",
          "type": "resistance",
          "dist": 0.2822
        },
        {
          "low": 4017.27,
          "high": 4045.77,
          "mid": 4030.58,
          "days": 9,
          "first": "2026-05-13",
          "last": "2026-07-09",
          "type": "resistance",
          "dist": 0.5839
        },
        {
          "low": 3667.79,
          "high": 3692.46,
          "mid": 3681.92,
          "days": 8,
          "first": "2026-04-17",
          "last": "2026-07-21",
          "type": "resistance",
          "dist": 0.4469
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
      "asOf": "2026-11-04",
      "price": 1265.47,
      "peak": {
        "value": 2255.25,
        "date": "2026-07-01",
        "kind": "rolling_2000_sessions",
        "windowLimit": 2000,
        "sampleSessions": 1656,
        "windowStart": "2020-01-02",
        "windowEnd": "2026-11-04",
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
        "expectedSession": "2026-11-04",
        "calendar": "XSHG",
        "settlementDelayMinutes": 20,
        "observedAt": "2026-11-04T15:00:11.243383+00:00",
        "rows": 1656,
        "start": "2020-01-02",
        "end": "2026-11-04",
        "approvedJumps": [
          "2024-09-30",
          "2024-10-08"
        ]
      },
      "drawdown": -0.4389,
      "ma200": {
        "value": 1584.48,
        "dist": -0.2013
      },
      "levels": [
        {
          "d": -0.1,
          "price": 2029.73,
          "dist": 0.6039,
          "hit": true
        },
        {
          "d": -0.2,
          "price": 1804.2,
          "dist": 0.4257,
          "hit": true
        },
        {
          "d": -0.3,
          "price": 1578.67,
          "dist": 0.2475,
          "hit": true
        },
        {
          "d": -0.4,
          "price": 1353.15,
          "dist": 0.0693,
          "hit": true
        },
        {
          "d": -0.5,
          "price": 1127.62,
          "dist": -0.1089,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 1282.93,
          "high": 1489.12,
          "mid": 1384.68,
          "days": 119,
          "first": "2025-10-24",
          "last": "2026-10-28",
          "type": "resistance",
          "dist": 0.0942
        },
        {
          "low": 1640.46,
          "high": 1718.69,
          "mid": 1678.99,
          "days": 33,
          "first": "2026-05-06",
          "last": "2026-09-23",
          "type": "resistance",
          "dist": 0.3268
        },
        {
          "low": 1552.89,
          "high": 1571.07,
          "mid": 1559.6,
          "days": 9,
          "first": "2026-01-23",
          "last": "2026-09-29",
          "type": "resistance",
          "dist": 0.2324
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
        "asOf": "2026-11-03"
      },
      "SPY": {
        "maxHit": 0,
        "asOf": "2026-11-03"
      },
      "DIA": {
        "maxHit": 0,
        "asOf": "2026-11-03"
      },
      "IWM": {
        "maxHit": 0,
        "asOf": "2026-11-03"
      },
      "SH000001": {
        "maxHit": 0.1,
        "asOf": "2026-11-04"
      },
      "SH000300": {
        "maxHit": 0.3,
        "asOf": "2026-11-04"
      },
      "SH000510": {
        "maxHit": 0.2,
        "asOf": "2026-11-04"
      },
      "SZ399006": {
        "maxHit": 0.4,
        "asOf": "2026-11-04"
      },
      "SH000688": {
        "maxHit": 0.4,
        "asOf": "2026-11-04"
      }
    },
    "pendingAlerts": [],
    "acknowledgedIds": []
  }
};

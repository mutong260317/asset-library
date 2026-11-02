/* Generated snapshot; state/outbox are embedded as authority. */
window.DRAWDOWN = {
  "meta": {
    "asOf": "2026-10-30 22:50",
    "generatedBy": "scripts/fetch_drawdown.py",
    "refreshCadence": "实际定时任务未核验；不承诺自动刷新",
    "sources": {
      "US": "AkShare(新浪)",
      "A": "腾讯证券"
    },
    "note": "旧快照保留原价格/日期/档位，仅改正窗口高点和历史最高价的区别；尚未完成新日线核验。",
    "schemaVersion": 2,
    "migratedAt": "2026-10-30T15:49:18.131974+00:00",
    "generationId": "439692daf42afad44e597a53"
  },
  "indices": [
    {
      "code": "QQQ",
      "name": "纳斯达克100",
      "market": "US",
      "ccy": "USD",
      "source": "AkShare(新浪)",
      "asOf": "2026-10-29",
      "price": 715.34,
      "drawdown": -0.0623,
      "ma200": {
        "value": 677.91,
        "dist": 0.0552
      },
      "levels": [
        {
          "d": -0.1,
          "price": 686.57,
          "dist": -0.0402,
          "hit": false
        },
        {
          "d": -0.2,
          "price": 610.29,
          "dist": -0.1469,
          "hit": false
        },
        {
          "d": -0.3,
          "price": 534.0,
          "dist": -0.2535,
          "hit": false
        },
        {
          "d": -0.4,
          "price": 457.72,
          "dist": -0.3601,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 381.43,
          "dist": -0.4668,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 703.5,
          "high": 742.65,
          "mid": 719.31,
          "days": 98,
          "first": "2026-05-08",
          "last": "2026-10-29",
          "type": "current",
          "dist": 0.0055
        },
        {
          "low": 597.32,
          "high": 624.87,
          "mid": 612.02,
          "days": 85,
          "first": "2025-11-04",
          "last": "2026-04-13",
          "type": "support",
          "dist": -0.1444
        }
      ],
      "zone": "回撤不足10%",
      "zoneDesc": "仅描述窗口高点回撤深度，不构成加仓或投资机会判断",
      "peak": {
        "value": 762.86,
        "date": "2026-10-06",
        "kind": "legacy_window_unverified",
        "windowLimit": 2000,
        "sampleSessions": null,
        "windowStart": null,
        "windowEnd": "2026-10-29",
        "fullWindow": false,
        "field": "intradayHigh"
      },
      "historicalATH": {
        "value": null,
        "reason": "旧快照缺少完整历史序列，无法核验真实ATH"
      },
      "priceBasis": null,
      "quality": {
        "status": "legacy_unverified",
        "reason": "本轮仅修正口径标签，未重新拉取合格的完整日线"
      }
    },
    {
      "code": "SPY",
      "name": "标普500",
      "market": "US",
      "ccy": "USD",
      "source": "AkShare(新浪)",
      "asOf": "2026-10-29",
      "price": 769.36,
      "drawdown": -0.0157,
      "ma200": {
        "value": 725.5,
        "dist": 0.0605
      },
      "levels": [
        {
          "d": -0.1,
          "price": 703.46,
          "dist": -0.0857,
          "hit": false
        },
        {
          "d": -0.2,
          "price": 625.3,
          "dist": -0.1873,
          "hit": false
        },
        {
          "d": -0.3,
          "price": 547.13,
          "dist": -0.2888,
          "hit": false
        },
        {
          "d": -0.4,
          "price": 468.97,
          "dist": -0.3904,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 390.81,
          "dist": -0.492,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 670.74,
          "high": 688.48,
          "mid": 679.53,
          "days": 73,
          "first": "2025-10-31",
          "last": "2026-04-13",
          "type": "support",
          "dist": -0.1168
        },
        {
          "low": 761.58,
          "high": 772.31,
          "mid": 767.05,
          "days": 41,
          "first": "2026-08-04",
          "last": "2026-10-29",
          "type": "current",
          "dist": -0.003
        },
        {
          "low": 733.83,
          "high": 745.82,
          "mid": 739.63,
          "days": 31,
          "first": "2026-05-08",
          "last": "2026-07-31",
          "type": "support",
          "dist": -0.0386
        }
      ],
      "zone": "回撤不足10%",
      "zoneDesc": "仅描述窗口高点回撤深度，不构成加仓或投资机会判断",
      "peak": {
        "value": 781.62,
        "date": "2026-10-06",
        "kind": "legacy_window_unverified",
        "windowLimit": 2000,
        "sampleSessions": null,
        "windowStart": null,
        "windowEnd": "2026-10-29",
        "fullWindow": false,
        "field": "intradayHigh"
      },
      "historicalATH": {
        "value": null,
        "reason": "旧快照缺少完整历史序列，无法核验真实ATH"
      },
      "priceBasis": null,
      "quality": {
        "status": "legacy_unverified",
        "reason": "本轮仅修正口径标签，未重新拉取合格的完整日线"
      }
    },
    {
      "code": "DIA",
      "name": "道琼斯工业",
      "market": "US",
      "ccy": "USD",
      "source": "AkShare(新浪)",
      "asOf": "2026-10-29",
      "price": 522.73,
      "drawdown": -0.0409,
      "ma200": {
        "value": 503.04,
        "dist": 0.0391
      },
      "levels": [
        {
          "d": -0.1,
          "price": 490.51,
          "dist": -0.0616,
          "hit": false
        },
        {
          "d": -0.2,
          "price": 436.01,
          "dist": -0.1659,
          "hit": false
        },
        {
          "d": -0.3,
          "price": 381.5,
          "dist": -0.2702,
          "hit": false
        },
        {
          "d": -0.4,
          "price": 327.0,
          "dist": -0.3744,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 272.5,
          "dist": -0.4787,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 513.4,
          "high": 524.06,
          "mid": 518.61,
          "days": 53,
          "first": "2026-06-04",
          "last": "2026-10-29",
          "type": "current",
          "dist": -0.0079
        },
        {
          "low": 483.24,
          "high": 492.34,
          "mid": 487.98,
          "days": 49,
          "first": "2026-01-05",
          "last": "2026-05-19",
          "type": "support",
          "dist": -0.0665
        },
        {
          "low": 472.22,
          "high": 479.03,
          "mid": 475.67,
          "days": 25,
          "first": "2025-11-11",
          "last": "2026-04-13",
          "type": "support",
          "dist": -0.09
        }
      ],
      "zone": "回撤不足10%",
      "zoneDesc": "仅描述窗口高点回撤深度，不构成加仓或投资机会判断",
      "peak": {
        "value": 545.01,
        "date": "2026-08-05",
        "kind": "legacy_window_unverified",
        "windowLimit": 2000,
        "sampleSessions": null,
        "windowStart": null,
        "windowEnd": "2026-10-29",
        "fullWindow": false,
        "field": "intradayHigh"
      },
      "historicalATH": {
        "value": null,
        "reason": "旧快照缺少完整历史序列，无法核验真实ATH"
      },
      "priceBasis": null,
      "quality": {
        "status": "legacy_unverified",
        "reason": "本轮仅修正口径标签，未重新拉取合格的完整日线"
      }
    },
    {
      "code": "IWM",
      "name": "罗素2000",
      "market": "US",
      "ccy": "USD",
      "source": "AkShare(新浪)",
      "asOf": "2026-10-29",
      "price": 284.01,
      "drawdown": -0.0671,
      "ma200": {
        "value": 277.56,
        "dist": 0.0232
      },
      "levels": [
        {
          "d": -0.1,
          "price": 273.99,
          "dist": -0.0353,
          "hit": false
        },
        {
          "d": -0.2,
          "price": 243.54,
          "dist": -0.1425,
          "hit": false
        },
        {
          "d": -0.3,
          "price": 213.1,
          "dist": -0.2497,
          "hit": false
        },
        {
          "d": -0.4,
          "price": 182.66,
          "dist": -0.3569,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 152.21,
          "dist": -0.4641,
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
          "dist": 0.0362
        },
        {
          "low": 275.03,
          "high": 284.01,
          "mid": 279.48,
          "days": 47,
          "first": "2026-04-20",
          "last": "2026-10-29",
          "type": "current",
          "dist": -0.016
        },
        {
          "low": 245.35,
          "high": 251.12,
          "mid": 248.21,
          "days": 33,
          "first": "2025-11-28",
          "last": "2026-04-06",
          "type": "support",
          "dist": -0.1261
        },
        {
          "low": 259.46,
          "high": 263.62,
          "mid": 261.56,
          "days": 27,
          "first": "2026-01-12",
          "last": "2026-04-13",
          "type": "support",
          "dist": -0.079
        }
      ],
      "zone": "回撤不足10%",
      "zoneDesc": "仅描述窗口高点回撤深度，不构成加仓或投资机会判断",
      "peak": {
        "value": 304.43,
        "date": "2026-08-14",
        "kind": "legacy_window_unverified",
        "windowLimit": 2000,
        "sampleSessions": null,
        "windowStart": null,
        "windowEnd": "2026-10-29",
        "fullWindow": false,
        "field": "intradayHigh"
      },
      "historicalATH": {
        "value": null,
        "reason": "旧快照缺少完整历史序列，无法核验真实ATH"
      },
      "priceBasis": null,
      "quality": {
        "status": "legacy_unverified",
        "reason": "本轮仅修正口径标签，未重新拉取合格的完整日线"
      }
    },
    {
      "code": "SH000001",
      "name": "上证指数",
      "market": "A",
      "ccy": "CNY",
      "source": "腾讯证券",
      "asOf": "2026-10-30",
      "price": 3599.02,
      "drawdown": -0.1549,
      "ma200": {
        "value": 3993.61,
        "dist": -0.0988
      },
      "levels": [
        {
          "d": -0.1,
          "price": 3832.97,
          "dist": 0.065,
          "hit": true
        },
        {
          "d": -0.2,
          "price": 3407.09,
          "dist": -0.0533,
          "hit": false
        },
        {
          "d": -0.3,
          "price": 2981.2,
          "dist": -0.1717,
          "hit": false
        },
        {
          "d": -0.4,
          "price": 2555.32,
          "dist": -0.29,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 2129.43,
          "dist": -0.4083,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 3870.02,
          "high": 3997.56,
          "mid": 3932.16,
          "days": 103,
          "first": "2025-10-21",
          "last": "2026-09-24",
          "type": "resistance",
          "dist": 0.0926
        },
        {
          "low": 4075.92,
          "high": 4138.76,
          "mid": 4106.85,
          "days": 58,
          "first": "2026-01-06",
          "last": "2026-07-01",
          "type": "resistance",
          "dist": 0.1411
        },
        {
          "low": 4026.63,
          "high": 4036.59,
          "mid": 4029.42,
          "days": 8,
          "first": "2025-11-13",
          "last": "2026-07-09",
          "type": "resistance",
          "dist": 0.1196
        }
      ],
      "zone": "回撤10–20%",
      "zoneDesc": "仅描述窗口高点回撤深度，不构成加仓或投资机会判断",
      "peak": {
        "value": 4258.86,
        "date": "2026-05-14",
        "kind": "legacy_window_unverified",
        "windowLimit": 2000,
        "sampleSessions": null,
        "windowStart": null,
        "windowEnd": "2026-10-30",
        "fullWindow": false,
        "field": "intradayHigh"
      },
      "historicalATH": {
        "value": null,
        "reason": "旧快照缺少完整历史序列，无法核验真实ATH"
      },
      "priceBasis": null,
      "quality": {
        "status": "legacy_unverified",
        "reason": "本轮仅修正口径标签，未重新拉取合格的完整日线"
      }
    },
    {
      "code": "SH000300",
      "name": "沪深300",
      "market": "A",
      "ccy": "CNY",
      "source": "腾讯证券",
      "asOf": "2026-10-30",
      "price": 3985.5,
      "drawdown": -0.328,
      "ma200": {
        "value": 4653.67,
        "dist": -0.1436
      },
      "levels": [
        {
          "d": -0.1,
          "price": 5337.82,
          "dist": 0.3393,
          "hit": true
        },
        {
          "d": -0.2,
          "price": 4744.73,
          "dist": 0.1905,
          "hit": true
        },
        {
          "d": -0.3,
          "price": 4151.64,
          "dist": 0.0417,
          "hit": true
        },
        {
          "d": -0.4,
          "price": 3558.55,
          "dist": -0.1071,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 2965.45,
          "dist": -0.2559,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 4544.59,
          "high": 4801.81,
          "mid": 4665.85,
          "days": 160,
          "first": "2025-10-21",
          "last": "2026-09-22",
          "type": "resistance",
          "dist": 0.1707
        }
      ],
      "zone": "回撤30–40%",
      "zoneDesc": "仅描述窗口高点回撤深度，不构成加仓或投资机会判断",
      "peak": {
        "value": 5930.91,
        "date": "2021-02-18",
        "kind": "legacy_window_unverified",
        "windowLimit": 2000,
        "sampleSessions": null,
        "windowStart": null,
        "windowEnd": "2026-10-30",
        "fullWindow": false,
        "field": "intradayHigh"
      },
      "historicalATH": {
        "value": null,
        "reason": "旧快照缺少完整历史序列，无法核验真实ATH"
      },
      "priceBasis": null,
      "quality": {
        "status": "legacy_unverified",
        "reason": "本轮仅修正口径标签，未重新拉取合格的完整日线"
      }
    },
    {
      "code": "SH000510",
      "name": "中证A500",
      "market": "A",
      "ccy": "CNY",
      "source": "腾讯证券",
      "asOf": "2026-10-30",
      "price": 4793.31,
      "drawdown": -0.2481,
      "ma200": {
        "value": 5789.55,
        "dist": -0.1721
      },
      "levels": [
        {
          "d": -0.1,
          "price": 5737.8,
          "dist": 0.197,
          "hit": true
        },
        {
          "d": -0.2,
          "price": 5100.26,
          "dist": 0.064,
          "hit": true
        },
        {
          "d": -0.3,
          "price": 4462.73,
          "dist": -0.069,
          "hit": false
        },
        {
          "d": -0.4,
          "price": 3825.2,
          "dist": -0.202,
          "hit": false
        },
        {
          "d": -0.5,
          "price": 3187.66,
          "dist": -0.335,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 5461.75,
          "high": 5675.34,
          "mid": 5575.11,
          "days": 83,
          "first": "2025-10-21",
          "last": "2026-09-24",
          "type": "resistance",
          "dist": 0.1631
        },
        {
          "low": 5783.05,
          "high": 5984.75,
          "mid": 5884.63,
          "days": 78,
          "first": "2026-01-06",
          "last": "2026-08-18",
          "type": "resistance",
          "dist": 0.2277
        },
        {
          "low": 6097.12,
          "high": 6117.37,
          "mid": 6107.93,
          "days": 9,
          "first": "2026-05-15",
          "last": "2026-07-06",
          "type": "resistance",
          "dist": 0.2743
        }
      ],
      "zone": "回撤20–30%",
      "zoneDesc": "仅描述窗口高点回撤深度，不构成加仓或投资机会判断",
      "peak": {
        "value": 6375.33,
        "date": "2026-06-22",
        "kind": "legacy_window_unverified",
        "windowLimit": 2000,
        "sampleSessions": null,
        "windowStart": null,
        "windowEnd": "2026-10-30",
        "fullWindow": false,
        "field": "intradayHigh"
      },
      "historicalATH": {
        "value": null,
        "reason": "旧快照缺少完整历史序列，无法核验真实ATH"
      },
      "priceBasis": null,
      "quality": {
        "status": "legacy_unverified",
        "reason": "本轮仅修正口径标签，未重新拉取合格的完整日线"
      }
    },
    {
      "code": "SZ399006",
      "name": "创业板指",
      "market": "A",
      "ccy": "CNY",
      "source": "腾讯证券",
      "asOf": "2026-10-30",
      "price": 2413.63,
      "drawdown": -0.449,
      "ma200": {
        "value": 3485.25,
        "dist": -0.3075
      },
      "levels": [
        {
          "d": -0.1,
          "price": 3942.37,
          "dist": 0.6334,
          "hit": true
        },
        {
          "d": -0.2,
          "price": 3504.33,
          "dist": 0.4519,
          "hit": true
        },
        {
          "d": -0.3,
          "price": 3066.29,
          "dist": 0.2704,
          "hit": true
        },
        {
          "d": -0.4,
          "price": 2628.25,
          "dist": 0.0889,
          "hit": true
        },
        {
          "d": -0.5,
          "price": 2190.2,
          "dist": -0.0926,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 3042.34,
          "high": 3431.89,
          "mid": 3254.83,
          "days": 141,
          "first": "2025-10-21",
          "last": "2026-10-09",
          "type": "resistance",
          "dist": 0.3485
        },
        {
          "low": 3829.78,
          "high": 3938.5,
          "mid": 3885.04,
          "days": 15,
          "first": "2026-05-07",
          "last": "2026-07-14",
          "type": "resistance",
          "dist": 0.6096
        },
        {
          "low": 3667.79,
          "high": 3705.56,
          "mid": 3684.55,
          "days": 9,
          "first": "2026-04-17",
          "last": "2026-08-18",
          "type": "resistance",
          "dist": 0.5266
        },
        {
          "low": 4019.93,
          "high": 4055.87,
          "mid": 4036.95,
          "days": 8,
          "first": "2026-05-13",
          "last": "2026-07-03",
          "type": "resistance",
          "dist": 0.6726
        }
      ],
      "zone": "回撤40–50%",
      "zoneDesc": "仅描述窗口高点回撤深度，不构成加仓或投资机会判断",
      "peak": {
        "value": 4380.41,
        "date": "2026-06-25",
        "kind": "legacy_window_unverified",
        "windowLimit": 2000,
        "sampleSessions": null,
        "windowStart": null,
        "windowEnd": "2026-10-30",
        "fullWindow": false,
        "field": "intradayHigh"
      },
      "historicalATH": {
        "value": null,
        "reason": "旧快照缺少完整历史序列，无法核验真实ATH"
      },
      "priceBasis": null,
      "quality": {
        "status": "legacy_unverified",
        "reason": "本轮仅修正口径标签，未重新拉取合格的完整日线"
      }
    },
    {
      "code": "SH000688",
      "name": "科创50",
      "market": "A",
      "ccy": "CNY",
      "source": "腾讯证券",
      "asOf": "2026-10-30",
      "price": 1160.84,
      "drawdown": -0.4853,
      "ma200": {
        "value": 1586.95,
        "dist": -0.2685
      },
      "levels": [
        {
          "d": -0.1,
          "price": 2029.73,
          "dist": 0.7485,
          "hit": true
        },
        {
          "d": -0.2,
          "price": 1804.2,
          "dist": 0.5542,
          "hit": true
        },
        {
          "d": -0.3,
          "price": 1578.67,
          "dist": 0.3599,
          "hit": true
        },
        {
          "d": -0.4,
          "price": 1353.15,
          "dist": 0.1657,
          "hit": true
        },
        {
          "d": -0.5,
          "price": 1127.62,
          "dist": -0.0286,
          "hit": false
        }
      ],
      "platforms": [
        {
          "low": 1288.81,
          "high": 1493.95,
          "mid": 1388.6,
          "days": 122,
          "first": "2025-10-21",
          "last": "2026-10-26",
          "type": "resistance",
          "dist": 0.1962
        },
        {
          "low": 1602.34,
          "high": 1663.22,
          "mid": 1637.73,
          "days": 24,
          "first": "2026-05-06",
          "last": "2026-09-24",
          "type": "resistance",
          "dist": 0.4108
        },
        {
          "low": 1709.5,
          "high": 1726.18,
          "mid": 1718.07,
          "days": 10,
          "first": "2026-05-11",
          "last": "2026-08-14",
          "type": "resistance",
          "dist": 0.48
        },
        {
          "low": 1541.64,
          "high": 1555.98,
          "mid": 1552.54,
          "days": 8,
          "first": "2026-01-22",
          "last": "2026-09-28",
          "type": "resistance",
          "dist": 0.3374
        }
      ],
      "zone": "回撤40–50%",
      "zoneDesc": "仅描述窗口高点回撤深度，不构成加仓或投资机会判断",
      "peak": {
        "value": 2255.25,
        "date": "2026-07-01",
        "kind": "legacy_window_unverified",
        "windowLimit": 2000,
        "sampleSessions": null,
        "windowStart": null,
        "windowEnd": "2026-10-30",
        "fullWindow": false,
        "field": "intradayHigh"
      },
      "historicalATH": {
        "value": null,
        "reason": "旧快照缺少完整历史序列，无法核验真实ATH"
      },
      "priceBasis": null,
      "quality": {
        "status": "legacy_unverified",
        "reason": "本轮仅修正口径标签，未重新拉取合格的完整日线"
      }
    }
  ],
  "pipeline": {
    "state": {
      "QQQ": {
        "maxHit": 0.0,
        "asOf": "2026-10-29"
      },
      "SPY": {
        "maxHit": 0.0,
        "asOf": "2026-10-29"
      },
      "DIA": {
        "maxHit": 0.0,
        "asOf": "2026-10-29"
      },
      "IWM": {
        "maxHit": 0.0,
        "asOf": "2026-10-29"
      },
      "SH000001": {
        "maxHit": 0.1,
        "asOf": "2026-10-30"
      },
      "SH000300": {
        "maxHit": 0.3,
        "asOf": "2026-10-30"
      },
      "SH000510": {
        "maxHit": 0.2,
        "asOf": "2026-10-30"
      },
      "SZ399006": {
        "maxHit": 0.4,
        "asOf": "2026-10-30"
      },
      "SH000688": {
        "maxHit": 0.4,
        "asOf": "2026-10-30"
      }
    },
    "pendingAlerts": [],
    "acknowledgedIds": []
  }
};

    { c: "SOXL", n: "SOXL", m: "US", cat: "杠杆", u: "费城半导体三倍做多", structure: "ETF(杠杆)", overlap: "high", overlapWith: "SOXX/SMH（三倍衍生，穿透约3倍）",
      fee: { value: 0.75, unit: "%", asOf: "2026-09-04" }, aum: { value: 19, unit: "十亿美元", currency: "USD", asOf: "2026-09-01" },
      rk: 5, ret: { low: 0.0, high: 0.30 },
      signal: { asOf: "2026-11-13", cyc: 72, cycleType: "半导体+波动损耗", cycleMethod: "方向+波动损耗+周期高位", cycleReason: "随费半单日-7.2%暴跌，仅战术严格止损，2022年曾-87%", cycleConfidence: "medium", val: 70, valSource: "Direxion/ETF.run", valAsOf: "2026-11-13", premium: { value: null, asOf: null, status: "unverified" }, purchaseLimit: "", price: 58.32, priceAsOf: "2026-11-13", priceSource: "Longbridge", priceSymbol: "SOXL.US", priceBasis: "unadjusted", priceStatus: "checked", drawdown: { fromATH: -15, p1y: -12, historicalMax: -87 } }, decision: { w: { c: 1, y: 1, a: 2 }, action: "回避", buyZone: "仅周期底部右侧+严格止损", trimZone: "趋势破位立即止损", invalidation: "周期高位+波动损耗", reason: "最极端波动，严格止损" },
      vd: "仅战术，2022年回撤约-87%", hz: ["最极端波动", "周期高位更危险", "严格止损"] }
  ]
};

/* 挂载到浏览器全局 / Node 导出（供 validate.js 与 index.html 使用） */
root.ASSETS = ASSETS;
if (typeof module !== "undefined" && module.exports) {
  module.exports = ASSETS;
}
})(typeof window !== "undefined" ? window : globalThis);

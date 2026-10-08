/* ============================================================
 * 资产产品分析 · 发布前数据自检 validate.js
 * 用法：
 *   1) 发布前：node validate.js            → 输出校验结果，非0退出码阻止发布
 *   2) 浏览器：<script src="./validate.js"> → window.VALIDATE_ASSETS(A)
 * 校验规则（A股/美股三档权重分别=100 为硬性失败，其他为失败/警告分级）
 * ============================================================ */
(function (root, factory) {
  var api = factory();
  if (typeof module !== "undefined" && module.exports) { module.exports = api; }
  if (root) { root.VALIDATE_ASSETS = api.validateAssets; root.ASSETS_REPORT = api.assetsReport; }
})(typeof window !== "undefined" ? window : null, function () {

  function isNum(v) { return typeof v === "number" && isFinite(v); }

  function validateAssets(A) {
    var errors = [], warnings = [];
    if (!A || typeof A !== "object") return { ok: false, errors: ["ASSETS 缺失或非对象"], warnings: [], summary: "" };
    if (!Array.isArray(A.assets)) return { ok: false, errors: ["assets 必须是数组"], warnings: [], summary: "" };
    var L = A.assets;

    // 1) 基础元数据
    if (!A.meta || !A.meta.updated) errors.push("meta.updated 缺失（必须记录更新时间）");
    if (!A.meta || !A.meta.week) warnings.push("meta.week 缺失");
    if (!A.snap || !A.snap.d) warnings.push("snap.d 缺失");

    // 2) 资产代码唯一性
    var seen = {};
    L.forEach(function (x) { if (seen[x.c]) errors.push("资产代码重复: " + x.c); seen[x.c] = 1; });

    // 3) 资产数量与市场
    var aCount = 0, usCount = 0;
    L.forEach(function (x) {
      if (x.m === "A") aCount++; else if (x.m === "US") usCount++;
      else errors.push(x.c + " market 非法: " + x.m + "（只能 A/US）");
    });
    if (aCount !== 24) warnings.push("A股数量 " + aCount + "（预期24）");
    if (usCount !== 17) warnings.push("美股数量 " + usCount + "（预期17）");

    // 4) 字段与范围校验
    L.forEach(function (x) {
      if (!x.c || !x.n) errors.push("代码/名称缺失");
      if (!x.cat) warnings.push(x.c + " cat 缺失");
      if (!x.u) warnings.push(x.c + " u(跟踪底层) 缺失");
      if (!x.structure) warnings.push(x.c + " structure 缺失");
      if (x.overlap !== "low" && x.overlap !== "medium" && x.overlap !== "high") warnings.push(x.c + " overlap 缺失/非法: " + x.overlap);
      if (!x.fee || !isNum(x.fee.value) || x.fee.value < 0 || x.fee.value > 3) errors.push(x.c + " 费率非法: " + (x.fee && x.fee.value));
      if (!x.aum || !isNum(x.aum.value) || x.aum.value <= 0) errors.push(x.c + " 规模非法: " + (x.aum && x.aum.value));
      if (!isNum(x.rk) || x.rk < 1 || x.rk > 5) errors.push(x.c + " rk 非法: " + x.rk);
      if (!x.ret || !isNum(x.ret.low) || !isNum(x.ret.high) || x.ret.low > x.ret.high) errors.push(x.c + " ret 非法");
      if (!x.signal) { errors.push(x.c + " signal 缺失"); return; }
      var s = x.signal;
      if (!s.asOf) errors.push(x.c + " signal.asOf 缺失（数据必须标注日期）");
      if (!isNum(s.cyc) || s.cyc < 0 || s.cyc > 100) errors.push(x.c + " cyc 非法: " + s.cyc);
      if (!isNum(s.val) || s.val < 0 || s.val > 100) errors.push(x.c + " val 非法: " + s.val);
      if (!s.cycleType) warnings.push(x.c + " cycleType 缺失");
      if (!s.cycleMethod) warnings.push(x.c + " cycleMethod 缺失");
      if (!s.cycleReason) warnings.push(x.c + " cycleReason 缺失");
      if (!s.valSource) warnings.push(x.c + " valSource 缺失");
      if (!s.valAsOf) warnings.push(x.c + " valAsOf 缺失");
      if (s.premium && isNum(s.premium.value) && Math.abs(s.premium.value) > 0.15) warnings.push(x.c + " 溢价异常偏高: " + (s.premium.value * 100).toFixed(1) + "%（请确认）");
      if (!s.drawdown) errors.push(x.c + " drawdown 缺失");
      else {
        if (!isNum(s.drawdown.historicalMax)) errors.push(x.c + " drawdown.historicalMax 缺失");
        if (!isNum(s.drawdown.fromATH)) warnings.push(x.c + " drawdown.fromATH 缺失");
      }
      if (!x.decision) { errors.push(x.c + " decision 缺失"); return; }
      var d = x.decision;
      if (!d.w || !isNum(d.w.c) || !isNum(d.w.y) || !isNum(d.w.a)) errors.push(x.c + " decision.w 缺失/非法");
      if (d.w && (d.w.c < 0 || d.w.y < 0 || d.w.a < 0)) errors.push(x.c + " 权重为负");
      if (!d.action) warnings.push(x.c + " action 缺失");
      if (!d.buyZone || !d.trimZone) warnings.push(x.c + " buyZone/trimZone 缺失");
      if (!d.invalidation) warnings.push(x.c + " invalidation 缺失");
    });

    // 5) A股三档权重 = 100（硬性）
    var wa = { c: 0, y: 0, a: 0 }, wu = { c: 0, y: 0, a: 0 };
    L.forEach(function (x) {
      var d = x.decision, t = d && d.w;
      if (!t) return;
      if (x.m === "A") { wa.c += t.c || 0; wa.y += t.y || 0; wa.a += t.a || 0; }
      if (x.m === "US") { wu.c += t.c || 0; wu.y += t.y || 0; wu.a += t.a || 0; }
    });
    ["c", "y", "a"].forEach(function (k) {
      var nA = Math.round(wa[k] * 100) / 100, nU = Math.round(wu[k] * 100) / 100;
      if (Math.abs(nA - 100) > 0.001) errors.push("A股" + (k === "c" ? "保守" : k === "y" ? "基准" : "激进") + "档合计 " + nA + "% ≠ 100%（拒绝发布）");
      if (Math.abs(nU - 100) > 0.001) errors.push("美股" + (k === "c" ? "保守" : k === "y" ? "基准" : "激进") + "档合计 " + nU + "% ≠ 100%（拒绝发布）");
    });

    // 6) 数据过期检查（signal.asOf 距今超过 30 天则警告）
    if (A.meta && A.meta.updated) {
      var updated = new Date(A.meta.updated.replace(/-/g, "/"));
      if (!isNaN(updated.getTime())) {
        var ageDays = (Date.now() - updated.getTime()) / 86400000;
        if (ageDays > 45) warnings.push("数据已 " + Math.round(ageDays) + " 天未更新，请核验是否过期");
        L.forEach(function (x) {
          var s = x.signal;
          if (s && s.asOf) {
            var d = new Date(s.asOf.replace(/-/g, "/"));
            if (!isNaN(d.getTime()) && (Date.now() - d.getTime()) / 86400000 > 60) warnings.push(x.c + " signal.asOf(" + s.asOf + ") 可能过期");
          }
        });
      }
    }

    var ok = errors.length === 0;
    var summary = ok ? "✓ 校验通过（" + L.length + " 只，权重合规）" : "⚠ 数据异常：" + errors.length + " 项错误 / " + warnings.length + " 项警告";
    return { ok: ok, errors: errors, warnings: warnings, summary: summary, counts: { total: L.length, a: aCount, us: usCount, wa: wa, wu: wu } };
  }

  function assetsReport(A) {
    var r = validateAssets(A);
    var lines = [];
    lines.push("=== 资产库数据自检报告 ===");
    lines.push("更新时间: " + (A.meta && A.meta.updated) + " | 资产总数: " + (A.assets ? A.assets.length : 0));
    lines.push("A股权重: 保守 " + (r.counts.wa.c) + "% / 基准 " + (r.counts.wa.y) + "% / 激进 " + (r.counts.wa.a) + "%");
    lines.push("美股权重: 保守 " + (r.counts.wu.c) + "% / 基准 " + (r.counts.wu.y) + "% / 激进 " + (r.counts.wu.a) + "%");
    lines.push("结果: " + r.summary);
    r.errors.forEach(function (e) { lines.push("[ERROR] " + e); });
    r.warnings.forEach(function (w) { lines.push("[WARN ] " + w); });
    return lines.join("\n");
  }

  return { validateAssets: validateAssets, assetsReport: assetsReport };
});

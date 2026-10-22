/* ============================================================
 * validate-cli.js · node 发布前自检入口
 * 用法：node validate-cli.js   → 校验 data.js + drawdown.js，非0退出码阻止发布
 * ============================================================ */
global.window = global;
require("./data.js");
require("./drawdown.js");
const v = require("./validate.js");
const r = v.validateAssets(global.ASSETS);
console.log(v.assetsReport(global.ASSETS));

/* ---- drawdown 数据校验 ---- */
let ddErr = [];
if (global.DRAWDOWN) {
  const ids = global.DRAWDOWN.indices || [];
  if (ids.length !== 9) ddErr.push("drawdown 标的数量 " + ids.length + "（预期9）");
  const seen = {};
  ids.forEach(function (x) {
    if (seen[x.code]) ddErr.push("drawdown 代码重复: " + x.code);
    seen[x.code] = 1;
    [["price", x.price], ["drawdown", x.drawdown], ["ath", x.ath && x.ath.value],
     ["ma200", x.ma200 && x.ma200.value]].forEach(function (p) {
      if (typeof p[1] !== "number" || !isFinite(p[1])) ddErr.push(x.code + " " + p[0] + " 非法");
    });
    (x.levels || []).forEach(function (l) {
      if (typeof l.price !== "number" || typeof l.dist !== "number") ddErr.push(x.code + " level 字段非法");
    });
    (x.platforms || []).forEach(function (p) {
      if (typeof p.mid !== "number" || typeof p.dist !== "number") ddErr.push(x.code + " platform 字段非法");
    });
  });
  if (ddErr.length) {
    console.log("\n=== drawdown 数据校验 ===");
    ddErr.forEach(function (e) { console.log("[DD-ERROR] " + e); });
  } else {
    console.log("\n=== drawdown 数据校验: ✓ 通过（9 标的，价位/百分比合法） ===");
  }
} else {
  console.log("\n[WARN] drawdown.js 未加载（板块将显示占位）");
}

process.exit(r.ok && ddErr.length === 0 ? 0 : 1);

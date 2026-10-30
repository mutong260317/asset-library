# AGENTS.md —— AI 接手规则（长期有效）

本文件是给任何接手本仓库的 AI（豆包 / Codex / 其他）的**操作红线与验证规范**。
- 项目是什么、整体架构与方法论：见 `README.md`
- 当前做到哪、上次改了什么、遗留问题：见 `HANDOFF.md`
- 本文件只规定"接手时必须遵守什么"，不重复 README 内容。

## 接手流程

1. 先读 `README.md`、本文件、`HANDOFF.md`，再读涉及的源码，不要凭记忆或猜测改代码。
2. 核对远程最新版本（以 GitHub `main` 分支为准），确认没有其他 AI 尚未合并的修改。
3. 小步修改，改完按"验证命令"自检，通过后再更新 `HANDOFF.md` 并提交。

## 不可破坏的红线（硬约束）

- **`data.js` 是唯一规范源（Single Source of Truth）**：严禁在 `index.html` 或任何地方内嵌资产数据副本。
- **发布前必须自检**：
  - 改 `data.js` / 配置权重 → `node validate.js`，A股/美股三档权重必须各 = 100，否则**禁止发布**。
  - 改 `drawdown.js` / 回撤数据 → `node validate-cli.js`，权重各 100、字段合法、无 NaN。
- **不提交凭证**：`.env`、`*.env`、`scripts/secrets.py` 一律忽略（本仓库为公开仓库）。
- `scripts/alerts.json` 由脚本自动生成、**不入库**；`scripts/level_state.json` **必须入库**，它是跨环境档位检测连续的唯一基线。
- **无实质变化不产生空 commit**；数据更新走纯脚本，不引入 AI 主观判断。
- 不覆盖、不重写其他 AI 尚未合并的修改；不擅自删除或移动用户自己的文件。

## 数据来源与已知坑（接手数据任务必读）

- **美股**：Yahoo 常返回 403/超时，且其最后一根 K 线在盘中是实时价、日期标当天，**收盘前必须剔除**。
  可靠链路：AkShare 新浪 `stock_us_daily(qfq)` 历史日线，最后一根即最近一个**已收盘**交易日；
  注意 `fetch_us_tencent_latest` 会把盘中实时价当收盘补进去——当 Yahoo 不可用时应禁用该补最新步骤，让美股停在 AkShare 历史日线最后一根。
- **A股**：腾讯 `fqkline` 为主、AkShare `stock_zh_index_daily` 备用；腾讯 WAF 间歇封禁（302/501）可重试，盘中返回的也是实时价。
- 切换数据源后，前复权口径会使部分 ATH 略有差异（如 DIA/IWM），属正常现象，需在 HANDOFF 注明。
- 本地 Windows 环境用 **`python`**（无 `python3` 命令）；云端 Linux 用 `python3`。
- 东财接口（ProxyError/403）为死路，不要再试。

## 验证命令

```bash
node validate.js        # 主发布自检：data.js 权重=100、字段范围、过期/异常溢价告警
node validate-cli.js    # data.js + drawdown.js 全量校验（每日回撤刷新用）
python scripts/fetch_drawdown.py   # 拉取9个宽基指数并重算回撤（Windows 用 python）
```

## 写回通道

- 本地 git 无 push 凭证、云端 git 同样无凭证，**统一通过 GitHub MCP `push_files` 提交**，不要本地 `git push`。
- `push_files` 的 `content` 必须传**完整文件内容**（曾发生截断），提交后用 MCP `get_file_contents` 回读验证，不依赖本地 raw（本地访问 GitHub raw 常 SSL/EOF 失败）。

## 多 AI 协作约定

- 同一时间**只允许一个 AI 修改同一项功能**；另一个可以审阅、提建议，避免互相覆盖。
- 外部 AI 提的意见，执行者先结合现有代码判断，明确哪些采纳、哪些暂缓及原因，**不照单全收**（用户偏好：有用迭代、没用删除）。
- 每次完成后必须更新 `HANDOFF.md`（改了什么、为什么、验证结果、遗留问题、对应 commit）。
- 远程推送、合并、上线等动作按用户明确授权执行；无授权不发起外部写操作。

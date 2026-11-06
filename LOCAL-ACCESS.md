# 本地登录与入口速查（重启后先看这里）

> 目的：电脑自动重启后，不用再问 AI「在哪登录」。按本页三步即可确认。
> 本文件不含任何密码、token、密钥；凭证只存在本机系统凭据存储，不写入仓库。

## 一、常用网址（直接点开，无需登录即可查看）

| 用途 | 网址 |
|---|---|
| 资产库网站（GitHub Pages，日常看这个） | https://mutong260317.github.io/asset-library/ |
| GitHub 仓库（源码/提交/PR） | https://github.com/mutong260317/asset-library |
| 本次修复 PR #2（已合并） | https://github.com/mutong260317/asset-library/pull/2 |

## 二、关键认知：重启后通常「不需要重新登录」

- 只是**查看网站**：网站是公开的，打开网址就能看，不需要任何登录。
- 需要**推送代码**：本机 git 的凭证由 GitHub CLI 提供（`credential.helper = !gh auth git-credential`）。
  登录 token 安全存储在 **Windows 系统凭据存储（keyring）**，重启后仍然保留，所以一般不用重新登录。
- 当前登录账号：`mutong260317`（HTTPS 协议，scopes 含 repo、workflow）。

## 三、重启后检查 / 重新登录的命令

在 PowerShell 中操作。git 若不在 PATH，用完整路径 `& "C:\Program Files\Git\cmd\git.exe"`。

1. 先确认登录状态（通常会显示已登录）：
   ```powershell
   gh auth status
   ```
2. 万一显示未登录 / 凭证失效，重新登录（默认浏览器授权流程）：
   ```powershell
   gh auth login
   ```
   按提示选择：`GitHub.com` → `HTTPS` → `Login with a web browser`，浏览器里授权一次即可，
   完成后 token 自动写回系统凭据存储。
3. 只读验证远程连接：
   ```powershell
   git ls-remote origin refs/heads/main
   ```

## 四、本机环境位置（备查）

- 豆包原工作目录：`D:\ai\豆包\资产归类项目`；Codex 当前副本：`E:\codex\投资\asset-library`。操作前核对当前副本与远程 HEAD。
- git 完整路径：`C:\Program Files\Git\cmd\git.exe`
- Python 虚拟环境：`.venv\Scripts\python.exe`（也可用环境变量 `ASSET_PYTHON` 指定解释器）
- 发布前检查：`node validate-cli.js --site-release`（快照站点）；严格行情闸门 `--publish`
- 长桥 CLI：使用 `longbridge serve` 的官方原始响应获取行情时间，`--format json` 展示格式不保证包含原始 timestamp。2026-11-05 已读取 41 产品日线；连接可用性需当次复测，失败时保留旧数据。重新登录入口为 `longbridge auth login`。
- 本机行情入口：`.venv\Scripts\python.exe scripts/live_market.py`，打开 http://127.0.0.1:8765/#market 。
- 飞书配置与回执保存在忽略的 `.local/`，不上传仓库。研究周报预览用 `scripts/send_feishu.py weekly`，加 `--send` 才实际发送。

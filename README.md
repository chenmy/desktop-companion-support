# 桌面伙伴 · 帮助与隐私

「桌面伙伴」（DesktopCompanion）的公开说明站点，仅包含帮助、隐私政策及网页资源。应用源码在独立的私有工程中维护。

| 页面 | 发布地址 |
| --- | --- |
| 帮助与支持 | https://chenmy.github.io/desktop-companion-support/support/ |
| 隐私政策 | https://chenmy.github.io/desktop-companion-support/privacy/ |

开发者：Chen Maoyong。公开联系邮箱：419169121@qq.com。

## 结构与部署

```text
docs/
├── index.html          根地址转到帮助页
├── support/index.html  使用说明、常见问题与联系邮箱
├── privacy/index.html  隐私政策
├── assets/             共享样式与应用图标
├── 404.html            缺页导航
├── sitemap.xml         两个内容页的索引
└── .nojekyll           按原始静态文件发布
```

使用 GitHub Pages 的分支发布方式：`main` 分支的 `/docs` 文件夹。无依赖安装、构建步骤、前端脚本或后台服务；更新文件并推送后由 Pages 部署。站点限定为产品支持与说明文档，不提供购买或支付功能。

从仓库根目录预览：

```bash
python3 -B -m http.server 4179 --bind 127.0.0.1 --directory docs
```

本地访问 `http://127.0.0.1:4179/support/` 与 `/privacy/`。普通页面的资源和导航使用相对路径，兼容 Pages 项目路径；404 页面使用固定项目路径，应在已部署站点或带项目路径的预览中核验。

## 内容维护

- 功能变更时，先对照应用实际行为更新文案，再更新对应页面的日期。
- 隐私政策分别覆盖应用本机数据、可选提醒、邮件咨询与 GitHub 托管；不要将应用不上传数据扩展为网站无访问日志。
- 当前产品仍在上架准备中。正式发布时更新帮助页的状态说明，并再次核对版本、提醒接入与清理流程。
- 联系邮箱调整时同步两页的可见文字和所有 `mailto:` 链接。
- 修改后检查两个页面互链、目录锚点、FAQ 键盘展开、窄屏排版和无登录访问。
- 本站不使用 Cookie、本地存储、广告、统计、外部字体或脚本。添加任何服务前更新隐私说明。

## 资产与权利

应用图标由作者主导设计，使用 OpenAI 图像工具制作完成；本站使用已接入应用的 PNG 导出文件，不重新生成或改写图片。页面布局、样式与简单线条图形为本项目制作。

- `docs/assets/app-icon.png`：512 × 512，SHA-256 `b1909ba5eabc3325ba92e0d7eca10b4ebbc7e459dcfc7e005e67d752cf4d5412`
- `docs/assets/favicon.png`：64 × 64，SHA-256 `807a050e7a0f5879cf52654d3d00f53fce62607c3ee80ebe41f5b66bb023ae27`

© 2026 Chen Maoyong. 保留所有权利。公开浏览不构成对图标、品牌或其它内容的再分发授权。

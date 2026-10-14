# images/ 需要放的图

老师要求项目有 **四张图**（`project.html` 第 19 张 "Five pieces of text, four images"）。
下面每一项都写清了**文件名**和**规格**，页面里已经按这些文件名引用好了。

| 文件名 | 尺寸 | 格式 | 体积 | 用途 | 状态 |
| --- | --- | --- | --- | --- | --- |
| `og-image.jpg` | **1200 × 630** | JPEG | **< 100 KB** | 分享链接时的预览图（Open Graph） | ✅ **已完成**（88.9 KB） |
| `favicon-32.png` | **32 × 32** | **PNG** | — | 浏览器标签页图标 | ✅ **已完成** |
| `apple-touch-icon.png` | **180 × 180** | **PNG** | — | 手机主屏图标 | ✅ **已完成** |
| `favicon-192.png` | 192 × 192 | PNG | — | Android（**可选**，老师标注非必需） | ✅ 已做 |

## 这四张图是怎么做的（可以写进答辩）

都**不是用图像软件画的**，而是 HTML + CSS 排版 → 无头浏览器截图 → 降采样导出。
这正是老师在第 14 张建议的做法（"build a 1200 × 630 `<div>`, then DevTools → Capture node screenshot"）。

| 源文件 | 作用 |
| --- | --- |
| `og-source.html` | 1200 × 630 的 og 图画布，配色取自 `css/style.css` 的 CSS 变量 |
| `icon-source.html` | 512 × 512 的图标方形，导出时按 2 倍渲染成 1024 母版，再往下缩 |

导出命令（本机 Edge 无头模式）：

```powershell
# og 图：直接截 1200×630 视口
msedge --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 `
  --window-size=1200,630 --screenshot=og-shot.png "file:///.../images/og-source.html"

# 图标：按 2 倍渲染，得到 1024×1024 母版
msedge --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=2 `
  --window-size=512,512 --screenshot=icon-master-1024.png "file:///.../images/icon-source.html"
```

再用 Pillow 降采样（**先大后小，绝不把小图放大**）：

```python
from PIL import Image
master = Image.open("icon-master-1024.png").convert("RGBA")
for name, size in [("apple-touch-icon.png",180), ("favicon-192.png",192), ("favicon-32.png",32)]:
    master.resize((size*4, size*4), Image.LANCZOS).resize((size, size), Image.LANCZOS).save(name)
```

### 图标为什么是「一个大写 S」

因为老师要求 **32 × 32 下必须可读**。我实测比较了四种方案（64vh / 78vh / 88vh 字号，有 / 无底部色带），
在**真实 32 px** 下放大观察后选定 **88vh 字号、不加底部色带** —— 单一字母最大最清楚，
加色带反而压缩字母空间、增加噪点。**这是量过之后改的，不是一上来就定下的。**

另外答辩要交**两张截图**（不是放在网站里的文件，是交给课程平台的）：

- 桌面截图：**至少 1200 px 宽，不要带浏览器边框**
- 手机截图：**375–414 px 宽**

截图方法：DevTools → `Ctrl+Shift+P`（macOS `⌘⇧P`）→ 输入 **"Capture screenshot"**

## 老师定的硬规则（别踩）

- **og 图上的标题不要贴边** —— 有些应用会裁掉边缘。老师给的示意里有一条虚线安全框，文字要全在框内。
- **og 图要能缩到拇指宽还读得清标题** —— 只放标题大字 + 一句话 + 一个视觉元素。
- **图标只用 PNG，不要 JPEG** —— JPEG 不能透明，小尺寸还会糊。
- **App 图标不要自己做圆角** —— 手机会自动把它变圆。
- **32 × 32 下只放一个字母或一个形状** —— 不要塞 logo 加标语。
- **先按 512 × 512 设计图标，再往外导出小尺寸** —— 绝不要把一张小图放大。

## 做法建议：用 HTML + CSS 生成（老师自己也这么演示）

`project.html` 第 14 张原文提到："build a 1200 × 630 `<div>`, then DevTools → right-click it → **Capture node screenshot**"。
好处是不用装任何图像软件，而且配色能和你网站完全一致（CSS 变量在 `css/style.css` 里）。

## 配色（要和网站一致）

取自 `css/style.css` 的 `:root`：

| 变量 | 值 | 用途 |
| --- | --- | --- |
| `--paper` | `#fbfaf7` | 背景 |
| `--ink` | `#12141a` | 正文 |
| `--accent` | `#c2410c` | 强调色（标题、按钮） |
| `--dim` | `#5b6270` | 次要文字 |

og 图上建议就用：`#fbfaf7` 底 + `#12141a` 标题 + `#c2410c` 一行小字。

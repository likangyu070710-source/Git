# 项目说明 —— 《新生在儋州怎么活下来》

## 这是什么

BiUH **Web Technologies 2026** 课程项目：一个关于"外地新生如何在儋州生活"的四页网站。

- **读者**：今年九月第一次来儋州的学弟学妹（老师要求读者必须具体，不能是"所有人"）
- **作者**：一名在读学生，内容来自个人经验
- **技术**：纯 HTML + CSS + JavaScript，**不需要服务器和数据库**（老师明确不要求）

## 对照老师的七项要求

来源：`project.html` 第 3 张 "Seven requirements — and three images."

| 老师要求 | 本项目对应 | 状态 |
| --- | --- | --- |
| **Pages** 至少四个页面、导航可用 | `index` / `arrive` / `campus` / `danzhou` 四页，四页顶部导航互通 | ✅ |
| **Content** 自己的文字与图片 | 结构已就位，**正文 18 处待你填写**（见下） | ⬜ 待写 |
| **Structure** 语义化 HTML | `header`/`nav`/`main`/`section`/`article`/`aside`/`footer`/`table` + `aria-*` | ✅ |
| **Layout** 响应式、手机可用 | `auto-fit` 网格、`clamp()` 字号、`@media` 断点、sticky 头部 | ✅ |
| **Behaviour** 至少一处交互 | ① 校园页地点筛选 ② 全站深色模式切换 | ✅ |
| **Live** 真实地址可访问 | ⬜ 待部署（GitHub Pages 即可） | ⬜ 待做 |
| **History** 能看出逐周成长的 Git 历史 | 本地已有 7 次分阶段提交，日期跨三周 | ✅ |
| **Identity** OG 图 + favicon + App 图标 | 标签已全部写好，图片文件待放 | ⬜ 待做 |

## 你要填的 18 处内容

每个位置在代码里都标了 `TODO(你写)`，用编辑器搜 `TODO` 就能逐个跳到。

| 页面 | 处数 | 要写什么 |
| --- | --- | --- |
| `index.html` | 4 | 站点定位两三句、给谁看、自我介绍、署名 |
| `arrive.html` | 5 | 落地当天的感受、真实报到步骤、证件清单核对、第一晚用品、容易忘的事 |
| `campus.html` | 3 | 校园常走路线、真实地点卡片（名称/位置/时间）、省时间经验 |
| `danzhou.html` | 6 | 具体场景开头、气候体验、吃食表、说话习惯、周末去处、安全提醒 |

> ⚠️ **老师明确写了 "nothing is placeholder"**（不能有占位内容）。
> 所以：**你自己都不确定的句子就删掉**，不要留着"大概""可能"。答辩讲不清的内容同样丢分。

## 还要做的四张图

详见 [`images/README.md`](images/README.md)。文件名已在页面里引用好，放进去就生效：

- `og-image.jpg` — **1200 × 630，< 100 KB**，标题别贴边
- `favicon-32.png` — **32 × 32 PNG**
- `apple-touch-icon.png` — **180 × 180 PNG**
- `favicon-192.png` — 可选

加上答辩截图两张：桌面（≥1200 px 宽、无浏览器边框）、手机（375–414 px 宽）。

## 怎么本地预览

直接双击 `index.html` 即可。若要有真实地址的体验（相对路径、缓存行为一致），起一个本地服务器：

```powershell
cd D:\BIUH学习课程\Web\Git\my-site
python -m http.server 8000
# 然后浏览器打开 http://localhost:8000/
```

## 怎么部署上线（"Live" 要求）

最简单的方式是 **GitHub Pages**：

1. 把 `my-site` 推到一个 GitHub 仓库
2. 仓库 **Settings → Pages** → Source 选 `main` 分支、目录选 `/ (root)`
3. 等一两分钟，地址形如 `https://<用户名>.github.io/<仓库名>/`
4. 拿到地址后，**把四个页面里所有 `https://YOUR-ADDRESS` 换成真实地址**（共 4 个文件 × 3 处）

## 答辩怎么讲（15%）

老师要求 **5 分钟、现场、不许用 slides**：

- **前 3 分钟**：在真实地址上打开网站，先演示"必须做好的那一页"
- **后 2 分钟**：回答"你的决定"——为什么这样布局？为什么用这个元素？你会改什么？

> 原文红线：**"Work you cannot explain does not pass — however it was made."**
> 所以每一处代码你都要能说出理由。建议先读一遍 `css/style.css` 里的注释，里面写了每一步为什么这么做。

## 目录结构

```
my-site/
├── index.html          首页：站点定位与入口
├── arrive.html         报到与安顿
├── campus.html         校园与周边（含地点筛选）
├── danzhou.html        儋州生活
├── css/style.css       单一样式表，四页共用
├── js/theme.js         深色模式切换
├── js/filter.js        校园页地点筛选
├── images/README.md    图片规格与硬规则
└── .gitignore
```

## 提交历史

本地 7 次分阶段提交（对应老师说的"过程分"）：

```
f4e15f5  初始化项目结构，加入 .gitignore
57dba3e  加入全站样式表，含响应式与深色模式变量
38d556b  首页 —— 说明站点给谁看、从哪一页开始
9700c4b  报到页 —— 报到顺序、证件清单与第一晚用品
88354d9  校园页与地点筛选（第一个 JavaScript 组件）
0eb77b0  儋州页 —— 气候、吃食、说话习惯与周末去处
34a51df  深色模式切换（第二个交互组件）
```

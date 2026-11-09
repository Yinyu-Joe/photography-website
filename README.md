# 个人摄影档案网站

这是一个无框架的静态摄影档案。源内容与生成脚本保留在 repository 中，正式可预览文件生成到 `_site`。

## 构建与检查

```bash
npm run build
npm run audit:site
npm run audit:images
```

`npm run build` 会：

- 统一 Photo、Place、Series、Story 内容关系；
- 生成中文与英文静态路由；
- 生成照片、地点、系列和故事 permalink；
- 生成 canonical、hreflang、Open Graph、JSON-LD、robots 和 sitemap；
- 在 `_site/assets/generated` 中创建 AVIF/WebP 网页衍生图。
- 为公开衍生图移除相机、精确时间与编辑流程 metadata，并保留作者和版权链接；
- 为发布到 `_site` 的 JPEG 副本移除 EXIF、XMP 和 Photoshop metadata，保留色彩配置并写入版权说明（不重新压缩，`assets` 里的原图不变）；
- 让 Lightbox 优先使用最大 2048px 的 AVIF/WebP，原 JPEG 只作 fallback。

原始 JPEG 不会被覆盖或删除。只想快速检查 HTML 时可使用 `npm run build:fast`；该模式使用现有缩略图，不生成新的响应式图片。

完整图片构建依赖本机已有的 `ffmpeg`、`sips` 与 `cwebp`。`npm run validate` 会执行完整构建、站点审计和五张跨类别图片的 metadata 抽查。

地图上的陆地点由 `npm run map:dots` 从 `data/natural-earth/ne_50m_land.geojson`（Natural Earth，公有领域）生成到 `assets/world-dots.json`，投影写在 `scripts/lib/world-map.mjs`。只有改投影或点阵规则时才需要重新生成；新增拍摄地点不用。

## 本地预览

构建后从 `_site` 启动 Cloudflare Pages 预览：

```bash
npx wrangler pages dev _site --ip 127.0.0.1 --port 4174
```

然后打开 `http://127.0.0.1:4174/`。4174 用于 archive-v2 验证，不会覆盖当前 4173 的旧基线预览服务。

主要生成路由包括：

- `/work/<photo-slug>`
- `/series/<series-slug>`
- `/places/<place-slug>`
- `/stories/<story-slug>`
- `/rights`
- 对应的 `/en/...` 英文页面
- 中文 `/404.html` 与英文 `/en/404.html`（Cloudflare Pages 会按目录使用最近的 404 页面）

旧 `/story` 通过 `_redirects` 永久重定向至 `/stories`。
旧 `/copyright` 永久重定向至 `/rights`。

## 改内容去哪里

所有页面都由 `scripts/build-site.mjs` 生成。改完任何一项，都要重新运行 `npm run build`。

| 想改的内容 | 文件 |
| --- | --- |
| 首页文案、关于页、版权说明、联系方式、社交链接、故事 | `content/site-content.mjs` |
| 照片的手写标题和说明 | `content/photo-text.json` |
| 委托拍摄页（人像、商业案例、合作方式、联系） | `content/commissions.mjs`，照片放在 `assets/commissions/` |
| 首页 9 张照片、精选顺序、系列、全部作品筛选 | `assets/photos/portfolio-data.js` |
| 照片清单、年份、原始文件对应 | `assets/photos/photo-manifest.js` |
| 拍摄地点和地图坐标 | `assets/photos/place-manifest.js` |
| 视觉样式 | `styles.css` |
| 页面结构和生成逻辑 | `scripts/build-site.mjs`、`scripts/lib/content-model.mjs` |
| 地图交互 / 灯箱 / 手机导航收起 | `assets/archive-map.js` / `assets/archive-interactions.js` / `assets/site-header.js` |

几点说明：

- `content/photo-text.json` 按照片 id 填写，例如 `city-03`。哪种语言留空，那种语言就继续用自动生成的“某年拍摄于某地”，所以可以一张一张慢慢补。写错 id 时构建会报错。
- 中文标题要控制换行时：首页标题在 `content/site-content.mjs` 里用 `<wbr>` 标出换行位置；故事标题用 `titlePhrases` 分词组，拼起来必须和中文标题完全一致，否则构建会报错。
- 故事正文 `body` 按段落写成数组；`excerpt` 是故事列表显示的一句话，也用作页面描述；`location` 和 `date` 显示在详情页照片下方，没有就留 `null`。`alt` 只给读屏和图片加载失败时使用，不在页面上显示。
- 委托拍摄页 `/commissions`、`/commissions/portraits`、`/commissions/commercial` 是发给客户看的，在主导航的“委托”下，页面顶部用“概览 / 人像 / 商业”标签切换。默认不被搜索引擎收录，也不进 sitemap；想被搜到，把 `content/commissions.mjs` 里的 `searchVisible` 改成 `true`。每个案例有自己的页面（`/commissions/portraits/<id>`、`/commissions/commercial/<id>`），可以单独发给客户。加一个案例：把照片放进 `assets/commissions/`，再在 `commissionCases` 里写一段，宽高会自动读取。
- 写着 `draft: true` 的案例和流程步骤是示例：没有照片时显示灰色占位框，并带“示例”标记，用来先看框架。`npm run test` 照常通过，并在 `commissionExamplePages` 里显示还有几页带示例；`npm run validate` 只要还有示例就会失败，所以示例不会被发布出去。
- `homePhotoIds` 必须正好 9 张，顺序对应首页拼贴的九个位置，第 1、4、7 张显示得最大。
- `styles.css` 是按时间往后叠加的，后面的段落会覆盖前面的同名规则。新增的规则加在文件末尾，并写一行注释说明用途。
- 新增照片：先在 `photo-manifest.js` 里加基础信息，要进精选或系列，再把 id 加进 `portfolio-data.js`。

## 发布

完整构建要在 Mac 上运行，因为生成 AVIF 用的是 macOS 自带的 `sips`。确认要发布时：

```bash
npm run validate
npx wrangler pages deploy _site --project-name photography-website
```

只在本地修改设计，并不代表可以发布；发布前先在本地预览确认。

## 旧版文件（不参与构建）

根目录的 `index.html`、`work.html`、`places.html`、`story.html`、`about.html`、`404.html`、`robots.txt`、`sitemap.xml` 和 `script.js` 是早期版本，构建不会读取它们，改了网站也不会有任何变化。真正被复制进 `_site` 的根目录文件只有 `styles.css`、`favicon.ico` 和 `manifest.webmanifest`，另外还有整个 `assets` 文件夹。

需要对照早期版本时，可以这样预览：

```bash
npx wrangler pages dev . --ip 127.0.0.1 --port 4173
```

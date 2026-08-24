# 个人摄影档案网站

这是一个无框架的静态摄影档案。源内容与生成脚本保留在 repository 中，正式可预览文件生成到 `_site`。

## 构建与检查

```bash
npm run build
npm run audit:site
```

`npm run build` 会：

- 统一 Photo、Place、Series、Story 内容关系；
- 生成中文与英文静态路由；
- 生成照片、地点、系列和故事 permalink；
- 生成 canonical、hreflang、Open Graph、JSON-LD、robots 和 sitemap；
- 在 `_site/assets/generated` 中创建 AVIF/WebP 网页衍生图。

原始 JPEG 不会被覆盖或删除。只想快速检查 HTML 时可使用 `npm run build:fast`；该模式使用现有缩略图，不生成新的响应式图片。

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

旧 `/story` 通过 `_redirects` 永久重定向至 `/stories`。

## 旧版源文件

以下文件继续保留，作为视觉与内容来源：

- `index.html`：极简首页
- `work.html`：作品入口，包含 Selected、Series、Index 三种浏览方式
- `places.html`：拍摄地点地图
- `story.html`：故事页面
- `about.html`：关于与联系方式
- `404.html`：Cloudflare Pages 使用的真实 404 页面
- `robots.txt` 与 `sitemap.xml`：搜索引擎抓取与页面发现配置
- `manifest.webmanifest`：站点名称与图标配置
- `styles.css`：页面视觉样式
- `script.js`：语言切换、地图、作品渲染、图片弹窗

## 怎么改成你的信息

打开 `script.js`，最上方的 `profile` 可以修改：

```js
const profile = {
  name: {
    zh: "Your Name",
    en: "Your Name",
  },
  email: "你的邮箱",
  wechat: "你的微信号",
};
```

## 怎么替换照片

真实作品图片现在放在 `assets/photos`：

- `assets/photos/thumb`：页面照片墙和地图预览用的缩略图
- `assets/photos/full`：点击打开详情时用的高清图
- `assets/photos/photo-manifest.js`：缩略图和高清图的一一对应清单
- `assets/photos/portfolio-data.js`：精选顺序、系列结构和 Index 筛选配置

如果之后继续替换照片，可以保持同样结构，并在 `photo-manifest.js` 里维护每张照片的 `thumbSrc` 与 `fullSrc`：

- `thumbSrc`：缩略图路径
- `fullSrc`：高清图路径
- `title`：中英文标题
- `caption`：中英文说明
- `year`：年份

新增照片后，先在 `photo-manifest.js` 维护基础信息。若要把照片放入精选或系列，再在 `portfolio-data.js` 中加入对应照片 `id`：

- `selectedPhotoIds`：Selected 的照片与展示顺序（建议 12–18 张）
- `series`：系列名称、说明、封面与包含的照片
- `indexFilters`：Index 中人物、黑白等跨分类筛选

原有 `city`、`landscape`、`street`、`abstract` 分类仍保留，并作为 Index 的快速筛选使用。

## 旧版直接预览

旧版根目录仍可用于对照原有页面：

```bash
npx wrangler pages dev . --ip 127.0.0.1 --port 4173
```

然后打开 `http://127.0.0.1:4173/`。

直接双击 `index.html` 仍可查看首页，但不适合检查无扩展名导航、`robots.txt`、`sitemap.xml` 和真实 404 状态码。

# 个人摄影网站

这是一个静态个人摄影作品集网站，不需要复杂安装。主要页面包括：

- `index.html`：极简首页
- `work.html`：作品入口，包含 Selected、Series、Index 三种浏览方式
- `places.html`：拍摄地点地图
- `story.html`：故事页面
- `about.html`：关于与联系方式
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

## 怎么预览

直接双击 `index.html` 可以打开。  
如果想用本地地址预览，可以在这个文件夹里启动一个简单本地服务。

```bash
python3 -m http.server 4173 --bind 127.0.0.1
```

然后打开 `http://127.0.0.1:4173/`。

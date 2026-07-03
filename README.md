# 个人摄影网站第一版

这是一个静态个人摄影作品集网站，不需要复杂安装。主要页面包括：

- `index.html`：网页结构
- `work.html`：作品瀑布流，使用缩略图预览、高清图弹窗查看
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

如果之后继续替换照片，可以保持同样结构，并在 `photo-manifest.js` 里维护每张照片的 `thumbSrc` 与 `fullSrc`：

- `thumbSrc`：缩略图路径
- `fullSrc`：高清图路径
- `title`：中英文标题
- `caption`：中英文说明
- `year`：年份

Work 页面会按城市、风景、街景、抽象的顺序展示照片。

## 怎么预览

直接双击 `index.html` 可以打开。  
如果想用本地地址预览，可以在这个文件夹里启动一个简单本地服务。

```bash
python3 -m http.server 4173 --bind 127.0.0.1
```

然后打开 `http://127.0.0.1:4173/`。

const profile = {
  name: {
    zh: "Yinyu Zhu",
    en: "Yinyu Zhu",
  },
  role: {
    zh: "摄影师",
    en: "PHOTOGRAPHER",
  },
  email: "yinyu.zhu@outlook.com",
  wechat: "ZyyZyyyy6",
};

document.documentElement.classList.add("js-reveal");

const copy = {
  zh: {
    "profile.role": "摄影师",
    "home.eyebrow": "摄影档案",
    "home.title": "光、距离，以及记忆里安静的地理。",
    "nav.work": "作品",
    "nav.places": "地点",
    "nav.story": "故事",
    "nav.about": "关于",
    "nav.contact": "联系",
    "nav.city": "城市",
    "nav.landscape": "风光",
    "nav.street": "街头",
    "nav.abstract": "片段",
    "nav.atlas": "地图",
    "atlas.eyebrow": "影像地图",
    "atlas.title": "把照片散落在世界的坐标上。",
    "atlas.placeCount": "地点",
    "story.eyebrow": "故事",
    "story.title": "从移动、等待和反复回望中生长出来的摄影练习。",
    "story.bodyOne":
      "这个网站被组织成一个拍摄地点与作品方向的档案，而不是单一的图片墙。地图帮助记住一张照片开始的地方，每个分组也可以慢慢长成项目、文字和完整作品集。",
    "story.bodyTwo":
      "当前页面结构会随着真实影像继续扩展。新的首页背景、地点和照片都可以逐步加入，而不需要改变网站的整体骨架。",
    "story.captionOne":
      "夜色把山体压低，把天空打开。星光很安静，火山口却在远处持续喷发，红色的熔岩从黑暗中升起，又落回山的轮廓里。画面里没有多余的东西，只有天空、山和火。它不是一场壮观的表演，更像一次短暂的显露：大地在夜里露出自己的内部，安静，却无法忽视。",
    "story.captionTwo":
      "山坡上的墓地被阳光照亮，蓝色、粉色、绿色和黄色散落在草丛之间。这里没有把死亡藏进阴影里，而是让它站在明亮的空气中。每一个十字架都很小，每一个名字都很具体。颜色让记忆变得接近生活，也让这个地方少了一点距离感。人离开之后，留下的不只是石碑，还有被继续照看的形状、文字和土地。",
    "story.captionThree":
      "城市广场上，一座巨大的雕塑弯着身体，占据了画面的前方。它沉重、锈蚀、安静，和背后的高楼一起构成了城市的尺度。旁边的人坐着、弯腰、低头看手机，生活照常进行。纪念性的物体和普通的一天被放在同一片光里。重量并没有打断日常，只是成为人们经过、停留、继续生活的一部分。",
    "story.captionFour":
      "在一面粗粝的石墙前，几个被使用过的物件被随手放进垃圾桶里。纸杯、饮料瓶、白色纸袋，原本只是城市消费里最轻的东西，却因为红色塑料袋的包裹，突然拥有了一种临时的秩序。它们没有人物，也没有事件，却记录了一个动作刚刚结束的痕迹。有人停留过，喝完了，离开了。日常在这里不是背景，而是主角。",
    "story.captionFive":
      "镜头贴近一片破裂的表面。颜色被拿走以后，裂痕、反光和灰尘变得更清楚。它不再只是一个损坏的物体，而是一块被时间打开的平面。边缘翘起，暗部下沉，光落在不规则的纹理上，让一张普通的桌面变成了可以被观看的地形。破损没有被修复，也没有被美化，只是安静地存在着。",
    "about.eyebrow": "关于",
    "about.title": "以安静的观察，记录人、城市与自然的瞬间。",
    "about.bodyOne":
      "我是一名以旅行，人像，城市与日常景观为主要方向的摄影创作者。我的作品关注人在不同地域中的移动、停留与观看，并试图记录那些介于陌生与熟悉之间的瞬间。",
    "about.bodyTwo":
      "这个网站收录了我在不同国家和城市拍摄的作品，并通过地图与系列项目的方式整理这些影像。相比单纯展示目的地，我更关心照片如何保存一种具体的经验：当我经过那里时，世界曾经以这样的方式出现。",
    "contact.wechatLabel": "微信",
    "contact.emailLabel": "邮箱",
    "contact.eyebrow": "联系",
    "contact.title": "如果你喜欢这些影像，我们可以从一次简短交流开始。",
    "copyright.title": "Copyright / 版权声明",
    "copyright.bodyOne": "© Yinyu Zhu。本网站所有内容，作者保留全部权利。",
    "copyright.bodyTwo":
      "欢迎个人在非商业场景下保存图片，用作个人欣赏或设备壁纸。此类使用不包括重新上传、公开发布、转载、印刷、销售、改编、二次创作或任何商业用途。",
    "copyright.bodyThree":
      "任何形式的图片转载皆需经过作者许可。未得许可，不得将本网站图片完整上传至 Instagram、小红书、微博或其他公共平台。",
    "copyright.bodyFour":
      "欢迎分享本网站的原始页面链接。引用图片时，请注明作者、作者社交平台账号，作品来源及原始链接，且不得裁切、去除水印、修改色彩或误导性使用。",
    "copyright.bodyFive":
      "禁止将本网站任何图片、文字、元数据或其衍生内容用于 AI、机器学习、计算机视觉、图像生成模型、数据集构建、模型训练、微调、评估、嵌入、特征提取或类似用途。",
    "copyright.bodySix":
      "搜索引擎可根据本站 robots.txt 设置索引和展示本网站页面及图片预览，但这不代表第三方获得复制、转载、下载、训练或商业使用授权。",
    "copyright.licensing": "如需商业授权，请提前取得书面许可：",
    "lightbox.close": "关闭",
    "lightbox.prev": "上一张",
    "lightbox.next": "下一张",
    "photos.singular": "张照片",
    "photos.plural": "张照片",
  },
  en: {
    "profile.role": "PHOTOGRAPHER",
    "home.eyebrow": "PHOTOGRAPHY ARCHIVE",
    "home.title": "Light, distance, and the quiet geography of memory.",
    "nav.work": "Work",
    "nav.places": "Places",
    "nav.story": "Story",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.city": "Urban",
    "nav.landscape": "Landscapes",
    "nav.street": "Streets",
    "nav.abstract": "Fragments",
    "nav.atlas": "ATLAS",
    "atlas.eyebrow": "PHOTO ATLAS",
    "atlas.title": "A world map made from photographed coordinates.",
    "atlas.placeCount": "photo places",
    "story.eyebrow": "Story",
    "story.title": "A photography practice built from movement, waiting, and small returns.",
    "story.bodyOne":
      "This site is organized as an archive of photographed places rather than a single image wall. The map becomes a way to remember where a photograph began, while each section can grow slowly into projects, essays, and finished bodies of work.",
    "story.bodyTwo":
      "The current imagery is temporary. When the final homepage background arrives, it can replace the placeholder image without changing the site structure.",
    "story.captionOne":
      "Night presses the mountain low and opens the sky. The stars are quiet, while the crater continues to erupt in the distance, red lava rising out of the darkness and falling back into the outline of the mountain. There is nothing extra in the frame, only sky, mountain, and fire. It is not a spectacular performance so much as a brief revealing: at night, the earth exposes its interior, quietly, but impossible to ignore.",
    "story.captionTwo":
      "Sunlight falls across the hillside cemetery, scattering blue, pink, green, and yellow among the grass. Death is not hidden in shadow here; it stands in bright air. Each cross is small, and every name is specific. Color brings memory closer to ordinary life and makes the place feel less distant. After people leave, what remains is not only stone, but forms, words, and land that continue to be cared for.",
    "story.captionThree":
      "In a city square, a massive sculpture bends forward and occupies the foreground. Heavy, rusted, and quiet, it shares the frame with the tall buildings behind it, giving the city its sense of scale. Nearby, people sit, bend down, and look at their phones as life continues as usual. A commemorative object and an ordinary day are placed in the same light. Its weight does not interrupt daily life; it becomes part of what people pass, where they pause, and how they continue.",
    "story.captionFour":
      "In front of a rough stone wall, several used objects have been casually placed in a trash bin. A paper cup, a drink bottle, and a white paper bag were originally among the lightest things in urban consumption, but wrapped by the red plastic bag, they suddenly take on a temporary order. There are no people and no event, yet the frame records the trace of an action that has just ended. Someone stopped here, finished a drink, and left. The everyday is not the background here; it is the subject.",
    "story.captionFive":
      "The lens moves close to a fractured surface. Once color is removed, the cracks, reflections, and dust become clearer. It is no longer merely a damaged object, but a plane opened by time. Edges lift, shadows sink, and light falls across irregular textures, turning an ordinary tabletop into terrain that can be looked at. The damage is not repaired or beautified. It simply exists, quietly.",
    "about.eyebrow": "ABOUT",
    "about.title": "Quiet observation of people, cities, nature, and still moments.",
    "about.bodyOne":
      "I am a photographer working across travel, cities, and everyday landscapes. My work focuses on movement, place, and the quiet moments that appear between the unfamiliar and the familiar.",
    "about.bodyTwo":
      "This website brings together photographs made across different countries and cities, organized through series and a map-based archive.",
    "contact.wechatLabel": "WeChat",
    "contact.emailLabel": "Email",
    "contact.eyebrow": "CONTACT",
    "contact.title": "If these images resonate, we can start with a short conversation.",
    "copyright.title": "Copyright Notice",
    "copyright.bodyOne": "© Yinyu Zhu. All content on this website is protected by copyright. All rights are reserved by the author.",
    "copyright.bodyTwo":
      "You are welcome to save images for personal, non-commercial use, such as private viewing or using them as wallpapers on your personal devices. This permission does not include re-uploading, public posting, reposting, printing, selling, modifying, creating derivative works, or any commercial use.",
    "copyright.bodyThree":
      "Any form of image reposting requires prior permission from the author. Without permission, you may not upload any full image from this website to Instagram, Rednote, Weibo or any other public platform.",
    "copyright.bodyFour":
      "You are welcome to share the original page links from this website. If you quote or reference images, please credit the author, include the author’s relevant social media account, state the source of the work, and provide the original link. Preview images may not be cropped, have watermarks removed, have their colors altered, or be used in any misleading way.",
    "copyright.bodyFive":
      "The use of any images, text, metadata, or derivative content from this website for AI, machine learning, computer vision, image generation models, dataset creation, model training, fine-tuning, evaluation, embedding, feature extraction, or any similar purpose is strictly prohibited.",
    "copyright.bodySix":
      "Search engines may index and display pages and image previews from this website according to this site’s robots.txt settings. This does not grant any third party permission to copy, repost, download, train on, or commercially use any content from this website.",
    "copyright.licensing": "For commercial licensing, please obtain written permission in advance:",
    "lightbox.close": "Close",
    "lightbox.prev": "Previous",
    "lightbox.next": "Next",
    "photos.singular": "photo",
    "photos.plural": "photos",
  },
};

const importedPhotoCollections = Array.isArray(globalThis.photoCollections) ? globalThis.photoCollections : [];
const importedPlaceCollections = Array.isArray(globalThis.placePhotoCollections) ? globalThis.placePhotoCollections : [];

const works = [
  {
    id: "portrait-light-shadow",
    placeId: "paris",
    year: "2026",
    src: "assets/portrait-light-shadow.png",
    title: { zh: "光影之间", en: "Between Light and Shadow" },
    caption: {
      zh: "暖光中的一次回望，保留人物与空间之间的安静张力。",
      en: "A quiet turn toward warm light, holding the tension between figure and space.",
    },
  },
  {
    id: "street-rain-night",
    placeId: "beijing",
    year: "2026",
    src: "assets/street-rain-night.png",
    title: { zh: "雨夜步行", en: "Rain Walk" },
    caption: {
      zh: "雨后的城市反光，让街道像一段短暂的电影。",
      en: "Rain-polished pavement turns the city into a short film.",
    },
  },
  {
    id: "landscape-mountain-dawn",
    placeId: "reykjavik",
    year: "2026",
    src: "assets/landscape-mountain-dawn.png",
    title: { zh: "山脊微光", en: "Ridge Light" },
    caption: {
      zh: "黎明云层中的山体轮廓，克制而有力量。",
      en: "A mountain form emerging through dawn clouds with restraint and force.",
    },
  },
  {
    id: "architecture-warm-window",
    placeId: "tokyo",
    year: "2026",
    src: "assets/architecture-warm-window.png",
    title: { zh: "温暖窗口", en: "Warm Window" },
    caption: {
      zh: "黄昏里的建筑曲线，像城市留出的一次呼吸。",
      en: "Architectural curves at dusk, a quiet breath inside the city.",
    },
  },
  {
    id: "still-life-vase-bowl",
    placeId: "london",
    year: "2026",
    src: "assets/still-life-vase-bowl.png",
    title: { zh: "桌上的枝", en: "Branch on the Table" },
    caption: {
      zh: "简单器物与枝条，在侧光里形成细微的秩序。",
      en: "Simple vessels and a branch find subtle order in side light.",
    },
  },
  {
    id: "landscape-seascape-dusk",
    placeId: "sydney",
    year: "2026",
    src: "assets/landscape-seascape-dusk.png",
    title: { zh: "暮色海岸", en: "Dusk Coast" },
    caption: {
      zh: "长曝光的水面把时间压低，只留下岩石和云。",
      en: "Long exposure lowers time into water, rock, and cloud.",
    },
  },
  {
    id: "street-narrow-alley",
    placeId: "new-york",
    year: "2026",
    src: "assets/street-narrow-alley.png",
    title: { zh: "窄巷远影", en: "Distant Alley" },
    caption: {
      zh: "人在城市尺度中变小，街巷的层次变得清晰。",
      en: "A small figure clarifies the depth and scale of the city.",
    },
  },
  {
    id: "detail-wet-stone",
    placeId: "san-francisco",
    year: "2026",
    src: "assets/detail-wet-stone.png",
    title: { zh: "湿石细节", en: "Wet Stone Detail" },
    caption: {
      zh: "低处的反光与纹理，接近日常里不被注意的部分。",
      en: "Low reflections and texture from the overlooked edge of everyday life.",
    },
  },
];

const photoPlaces = [
  {
    id: "beijing",
    lon: 116.4074,
    lat: 39.9042,
    name: { zh: "北京", en: "Beijing" },
    country: { zh: "中国", en: "China" },
    workIds: ["street-rain-night"],
  },
  {
    id: "tokyo",
    lon: 139.6917,
    lat: 35.6895,
    name: { zh: "东京", en: "Tokyo" },
    country: { zh: "日本", en: "Japan" },
    workIds: ["architecture-warm-window"],
  },
  {
    id: "london",
    lon: -0.1276,
    lat: 51.5072,
    name: { zh: "伦敦", en: "London" },
    country: { zh: "英国", en: "United Kingdom" },
    workIds: ["still-life-vase-bowl"],
  },
  {
    id: "paris",
    lon: 2.3522,
    lat: 48.8566,
    name: { zh: "巴黎", en: "Paris" },
    country: { zh: "法国", en: "France" },
    workIds: ["portrait-light-shadow"],
  },
  {
    id: "new-york",
    lon: -74.006,
    lat: 40.7128,
    name: { zh: "纽约", en: "New York" },
    country: { zh: "美国", en: "United States" },
    workIds: ["street-narrow-alley"],
  },
  {
    id: "san-francisco",
    lon: -122.4194,
    lat: 37.7749,
    name: { zh: "旧金山", en: "San Francisco" },
    country: { zh: "美国", en: "United States" },
    workIds: ["detail-wet-stone"],
  },
  {
    id: "reykjavik",
    lon: -21.9426,
    lat: 64.1466,
    name: { zh: "雷克雅未克", en: "Reykjavik" },
    country: { zh: "冰岛", en: "Iceland" },
    workIds: ["landscape-mountain-dawn"],
  },
  {
    id: "sydney",
    lon: 151.2093,
    lat: -33.8688,
    name: { zh: "悉尼", en: "Sydney" },
    country: { zh: "澳大利亚", en: "Australia" },
    workIds: ["landscape-seascape-dusk"],
  },
];

function applyImportedPhotoCollections() {
  if (!importedPhotoCollections.length) return;

  works.length = 0;
  photoPlaces.length = 0;

  importedPhotoCollections.forEach((collection) => {
    const workIds = [];

    collection.photos.forEach((photo) => {
      workIds.push(photo.id);
      works.push({
        id: photo.id,
        placeId: collection.id,
        collectionId: collection.id,
        original: photo.original,
        year: photo.year || "",
        src: photo.fullSrc,
        thumbSrc: photo.thumbSrc,
        fullSrc: photo.fullSrc,
        title: photo.title,
        caption: photo.caption,
      });
    });

    photoPlaces.push({
      id: collection.id,
      lon: collection.lon,
      lat: collection.lat,
      name: collection.name,
      country: { zh: "作品分类", en: "Collection" },
      workIds,
    });
  });
}

applyImportedPhotoCollections();

function applyImportedPlaceCollections() {
  if (!importedPlaceCollections.length) return;

  photoPlaces.length = 0;

  importedPlaceCollections.forEach((place) => {
    const workIds = [];

    place.photos.forEach((photo) => {
      const id = `place-${photo.id}`;
      workIds.push(id);
      works.push({
        id,
        placeId: place.id,
        original: photo.original,
        year: photo.year || "",
        src: photo.fullSrc,
        thumbSrc: photo.thumbSrc,
        fullSrc: photo.fullSrc,
        title: photo.title,
        caption: photo.caption,
      });
    });

    photoPlaces.push({
      id: place.id,
      lon: place.lon,
      lat: place.lat,
      name: place.name,
      country: place.country,
      workIds,
    });
  });
}

applyImportedPlaceCollections();

const mapBounds = {
  minLon: -180,
  maxLon: 180,
  minLat: -56,
  maxLat: 82,
};

const mapViewDefaults = {
  centerLon: 104.2,
  centerLat: 35.8,
  zoom: 3.35,
};

const mapReferenceSize = {
  width: 1720,
  height: 843,
};

const mapView = {
  ...mapViewDefaults,
  minZoom: 0.62,
  maxZoom: 7.2,
};

const mapRegionHighlights = [
  { key: "Japan", shapes: [{ cx: 138.2, cy: 37.4, rx: 7.4, ry: 11.4, rotate: -16 }] },
  { key: "China", shapes: [{ cx: 104.5, cy: 35.1, rx: 34.5, ry: 18.5, rotate: -6 }] },
  { key: "Turkiye", shapes: [{ cx: 34.3, cy: 39.0, rx: 10.8, ry: 4.4, rotate: -9 }] },
  { key: "United Kingdom", shapes: [{ cx: -2.5, cy: 54.4, rx: 5.2, ry: 6.8, rotate: -8 }] },
  { key: "Belize", shapes: [{ cx: -88.7, cy: 17.1, rx: 2.2, ry: 2.8, rotate: 2 }] },
  { key: "United States", shapes: [{ cx: -98.5, cy: 39.0, rx: 30.5, ry: 15.0, rotate: -5 }] },
  { key: "Guatemala", shapes: [{ cx: -90.3, cy: 15.6, rx: 4.2, ry: 3.1, rotate: -8 }] },
  { key: "Taiwan", shapes: [{ cx: 121.0, cy: 23.8, rx: 2.2, ry: 3.5, rotate: -14 }] },
  { key: "Cuba", shapes: [{ cx: -79.5, cy: 21.8, rx: 8.4, ry: 2.1, rotate: -10 }] },
  { key: "Spain", shapes: [{ cx: -3.7, cy: 40.1, rx: 7.8, ry: 4.7, rotate: 2 }] },
  { key: "Mexico", shapes: [{ cx: -102.0, cy: 22.7, rx: 16.8, ry: 8.8, rotate: -16 }] },
  { key: "Thailand", shapes: [{ cx: 101.0, cy: 15.5, rx: 5.2, ry: 8.2, rotate: -4 }] },
  { key: "Switzerland", shapes: [{ cx: 8.2, cy: 46.8, rx: 2.3, ry: 1.6, rotate: -4 }] },
  { key: "Vietnam", shapes: [{ cx: 106.0, cy: 15.8, rx: 4.1, ry: 9.8, rotate: -14 }] },
];

const landRegions = [
  { cx: -151, cy: 63, rx: 25, ry: 10, rotate: -12 },
  { cx: -106, cy: 50, rx: 58, ry: 26, rotate: -7 },
  { cx: -122, cy: 39, rx: 22, ry: 20, rotate: -18 },
  { cx: -92, cy: 23, rx: 24, ry: 10, rotate: -18 },
  { cx: -82, cy: 12, rx: 16, ry: 5.5, rotate: -12 },
  { cx: -42, cy: 72, rx: 24, ry: 11, rotate: -5 },
  { cx: -60, cy: -14, rx: 22, ry: 42, rotate: -12 },
  { cx: -45, cy: -17, rx: 20, ry: 28, rotate: 18 },
  { cx: 9, cy: 50, rx: 31, ry: 15, rotate: 3 },
  { cx: 20, cy: 63, rx: 20, ry: 12, rotate: -10 },
  { cx: -4, cy: 40, rx: 11, ry: 7.5, rotate: 4 },
  { cx: 21, cy: 5, rx: 28, ry: 39, rotate: -5 },
  { cx: -9, cy: 10, rx: 17, ry: 19, rotate: -10 },
  { cx: 37, cy: -8, rx: 17, ry: 29, rotate: -6 },
  { cx: 48, cy: -20, rx: 5, ry: 12, rotate: -13 },
  { cx: 71, cy: 48, rx: 66, ry: 24, rotate: -2 },
  { cx: 96, cy: 61, rx: 67, ry: 14, rotate: 2 },
  { cx: 105, cy: 28, rx: 39, ry: 22, rotate: -8 },
  { cx: 46, cy: 29, rx: 25, ry: 13, rotate: -10 },
  { cx: 78, cy: 20, rx: 13, ry: 15, rotate: -10 },
  { cx: 107, cy: 10, rx: 18, ry: 12, rotate: -16 },
  { cx: 120, cy: -3, rx: 31, ry: 8, rotate: 4 },
  { cx: 138, cy: 38, rx: 7, ry: 10, rotate: -13 },
  { cx: 135, cy: -25, rx: 23, ry: 13, rotate: -4 },
  { cx: 146, cy: -41, rx: 8, ry: 5, rotate: -8 },
  { cx: 172, cy: -42, rx: 7, ry: 11, rotate: 18 },
];

const oceanCuts = [
  { cx: -86, cy: 26, rx: 12, ry: 7, rotate: 0 },
  { cx: -78, cy: 50, rx: 13, ry: 10, rotate: -8 },
  { cx: -35, cy: 17, rx: 16, ry: 45, rotate: -8 },
  { cx: 19, cy: 38, rx: 21, ry: 4.5, rotate: 2 },
  { cx: 43, cy: 14, rx: 7, ry: 12, rotate: -12 },
  { cx: 68, cy: 12, rx: 13, ry: 10, rotate: 12 },
  { cx: 92, cy: 12, rx: 8, ry: 8, rotate: 0 },
  { cx: 128, cy: 18, rx: 18, ry: 13, rotate: -10 },
  { cx: 112, cy: -24, rx: 14, ry: 9, rotate: 0 },
];

function savedLanguage() {
  try {
    const value = localStorage.getItem("site-language");
    return value === "en" || value === "zh" ? value : "zh";
  } catch {
    return "zh";
  }
}

function persistLanguage(lang) {
  try {
    localStorage.setItem("site-language", lang);
  } catch {
    // Ignore storage errors so the switch still works in private browsing.
  }
}

const state = {
  lang: savedLanguage(),
  visibleWorks: [...works],
  activeIndex: 0,
  activePlaceId: null,
  previewHideTimer: 0,
  resolvedInitialHash: false,
  mapDrag: null,
  mapPinch: null,
  mapGestureScale: 1,
  mapPointers: new Map(),
  activeMapRegionKey: null,
  resizeFrame: 0,
};

const els = {
  body: document.body,
  canvas: document.querySelector("#worldMapCanvas"),
  mapStage: document.querySelector(".map-stage"),
  locationLayer: document.querySelector("#locationLayer"),
  preview: document.querySelector("#photoPreview"),
  previewImage: document.querySelector("#previewImage"),
  previewPlace: document.querySelector("#previewPlace"),
  previewMeta: document.querySelector("#previewMeta"),
  placeCount: document.querySelector("#placeCount"),
  langButtons: document.querySelectorAll("[data-lang]"),
  languageSwitches: document.querySelectorAll("[data-language-switch]"),
  lightbox: document.querySelector("#lightbox"),
  lightboxImage: document.querySelector("#lightboxImage"),
  lightboxTitle: document.querySelector("#lightboxTitle"),
  lightboxCaption: document.querySelector("#lightboxCaption"),
  lightboxMeta: document.querySelector("#lightboxMeta"),
  lightboxThumbs: document.querySelector("#lightboxThumbs"),
  closeLightbox: document.querySelector("#closeLightbox"),
  prevWork: document.querySelector("#prevWork"),
  nextWork: document.querySelector("#nextWork"),
  workGallery: document.querySelector("#workGallery"),
};

let landDots = els.canvas ? buildFallbackLandDots() : [];
let revealObserver = null;

function setupNavSubmenus() {
  document.querySelectorAll(".has-submenu").forEach((item) => {
    const open = () => item.classList.add("is-open");
    const close = () => item.classList.remove("is-open");

    item.addEventListener("pointerenter", open);
    item.addEventListener("pointerleave", close);
    item.addEventListener("focusin", open);
    item.addEventListener("focusout", (event) => {
      if (!item.contains(event.relatedTarget)) close();
    });
  });

  document.querySelectorAll(".social-button[href='#']").forEach((link) => {
    link.addEventListener("click", (event) => event.preventDefault());
  });
}

function localText(value) {
  return value[state.lang] || value.zh || value.en || "";
}

function photoLabel(count) {
  const key = count === 1 ? "photos.singular" : "photos.plural";
  return copy[state.lang][key] || copy.en[key];
}

function displaySrc(work) {
  return work.thumbSrc || work.src;
}

function fullSrc(work) {
  return work.fullSrc || work.src;
}

function galleryCollections() {
  if (importedPhotoCollections.length) return importedPhotoCollections;

  return [
    {
      id: "featured",
      name: { zh: "精选", en: "Featured" },
      description: {
        zh: "第一版网站里的临时样片。",
        en: "Temporary images from the first site version.",
      },
      photos: works.map((work) => ({
        id: work.id,
        year: work.year,
        title: work.title,
        caption: work.caption,
        thumbSrc: displaySrc(work),
        fullSrc: fullSrc(work),
      })),
    },
  ];
}

function getPlace(placeId) {
  return photoPlaces.find((place) => place.id === placeId);
}

function getPlaceWorks(place) {
  return place.workIds.map((workId) => works.find((work) => work.id === workId)).filter(Boolean);
}

function getPreviewWork(place) {
  return getPlaceWorks(place)[0];
}

function openWork(workId) {
  const index = works.findIndex((work) => work.id === workId);
  if (index >= 0) openLightbox(index);
}

function setupGalleryReveal() {
  if (!els.workGallery) return;

  const tiles = els.workGallery.querySelectorAll(".photo-tile");
  if (revealObserver) revealObserver.disconnect();

  const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  if (!("IntersectionObserver" in window) || prefersReducedMotion) {
    tiles.forEach((tile) => tile.classList.add("is-visible"));
    return;
  }

  revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -8% 0px",
      threshold: 0.14,
    },
  );

  tiles.forEach((tile, index) => {
    tile.style.setProperty("--reveal-delay", `${(index % 9) * 36}ms`);
    revealObserver.observe(tile);
  });
}

function resolveInitialGalleryHash() {
  if (state.resolvedInitialHash || !els.workGallery || !location.hash) return;

  const target = document.getElementById(location.hash.slice(1));
  if (!target) return;

  state.resolvedInitialHash = true;
  requestAnimationFrame(() => {
    target.scrollIntoView({ block: "start" });
  });
}

function renderGallery() {
  if (!els.workGallery) return;

  const fragment = document.createDocumentFragment();

  galleryCollections().forEach((collection) => {
    const section = document.createElement("section");
    section.className = "gallery-section";
    section.id = `gallery-${collection.id}`;

    const header = document.createElement("div");
    header.className = "gallery-section-header";

    const title = document.createElement("h2");
    title.textContent = localText(collection.name);
    header.appendChild(title);

    const wall = document.createElement("div");
    wall.className = "photo-wall";

    collection.photos.forEach((photo) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "photo-tile";
      button.dataset.workId = photo.id;
      button.setAttribute("aria-label", localText(photo.title));
      button.addEventListener("click", () => openWork(photo.id));

      const image = document.createElement("img");
      image.src = photo.thumbSrc;
      image.alt = localText(photo.title);
      image.loading = "lazy";
      image.decoding = "async";

      button.appendChild(image);
      wall.appendChild(button);
    });

    section.append(header, wall);
    fragment.appendChild(section);
  });

  els.workGallery.replaceChildren(fragment);
  setupGalleryReveal();
  resolveInitialGalleryHash();
}

function applyStaticCopy() {
  document.documentElement.lang = state.lang === "zh" ? "zh-CN" : "en";
  const currentName = profile.name.en;
  updateDocumentTitle();

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    node.textContent = copy[state.lang][key] || copy.zh[key] || "";
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((node) => {
    const key = node.dataset.i18nAria;
    node.setAttribute("aria-label", copy[state.lang][key] || copy.zh[key] || "");
  });

  document.querySelectorAll("[data-profile='brand']").forEach((node) => {
    node.textContent = currentName;
  });
  document.querySelectorAll("[data-profile='wechat']").forEach((node) => {
    node.textContent = profile.wechat;
  });
  document.querySelectorAll("[data-profile='email']").forEach((node) => {
    node.textContent = profile.email;
  });
  document.querySelectorAll("a[href^='mailto:']").forEach((node) => {
    node.href = `mailto:${profile.email}`;
  });

  els.langButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lang === state.lang);
  });

  els.languageSwitches.forEach((button) => {
    button.textContent = state.lang === "zh" ? "EN" : "中文";
    button.setAttribute("aria-label", state.lang === "zh" ? "Switch to English" : "切换到中文");
  });

  if (els.placeCount) els.placeCount.textContent = String(photoPlaces.length);
}

function updateDocumentTitle() {
  const currentName = profile.name.en;
  const activePageKey = document.querySelector(".main-nav [aria-current='page']")?.dataset.i18n;

  if (!activePageKey) {
    document.title = state.lang === "zh" ? `${currentName} 摄影` : `${currentName} Photography`;
    return;
  }

  const pageName = copy[state.lang][activePageKey] || copy.zh[activePageKey] || "";
  const suffix = state.lang === "zh" ? `${currentName} 摄影` : `${currentName} Photography`;
  document.title = `${pageName} | ${suffix}`;
}

function degreesToRadians(value) {
  return (value * Math.PI) / 180;
}

function inEllipse(lon, lat, region) {
  const angle = degreesToRadians(region.rotate || 0);
  const dx = lon - region.cx;
  const dy = lat - region.cy;
  const x = dx * Math.cos(angle) + dy * Math.sin(angle);
  const y = -dx * Math.sin(angle) + dy * Math.cos(angle);
  return (x * x) / (region.rx * region.rx) + (y * y) / (region.ry * region.ry) <= 1;
}

function isLand(lon, lat) {
  const inRegion = landRegions.some((region) => inEllipse(lon, lat, region));
  if (!inRegion) return false;
  return !oceanCuts.some((region) => inEllipse(lon, lat, region));
}

function buildFallbackLandDots() {
  const dots = [];
  const lonStep = 2.25;
  const latStep = 2.05;

  for (let lat = 78; lat >= -52; lat -= latStep) {
    for (let lon = -178; lon <= 178; lon += lonStep) {
      if (isLand(lon, lat)) dots.push({ lon, lat });
    }
  }

  return dots;
}

async function loadLandDots() {
  try {
    const response = await fetch("assets/world-dots.json");
    if (!response.ok) throw new Error(`Map data failed with ${response.status}`);

    const atlas = await response.json();
    if (Array.isArray(atlas.dots) && atlas.dots.length > 300) {
      landDots = atlas.dots;
    }
  } catch (error) {
    console.warn("Using fallback dotted land map.", error);
  }
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function project(lon, lat) {
  const x = ((lon - mapBounds.minLon) / (mapBounds.maxLon - mapBounds.minLon)) * 100;
  const y = ((mapBounds.maxLat - lat) / (mapBounds.maxLat - mapBounds.minLat)) * 100;
  return { x, y };
}

function unproject(point) {
  const lon = mapBounds.minLon + (point.x / 100) * (mapBounds.maxLon - mapBounds.minLon);
  const lat = mapBounds.maxLat - (point.y / 100) * (mapBounds.maxLat - mapBounds.minLat);
  return { lon, lat };
}

function viewCenterPoint() {
  return project(mapView.centerLon, mapView.centerLat);
}

function mapViewportScale(rect = els.mapStage?.getBoundingClientRect()) {
  if (!rect?.width || !rect?.height) return { x: 1, y: 1 };
  return {
    x: mapReferenceSize.width / rect.width,
    y: mapReferenceSize.height / rect.height,
  };
}

function screenProject(point, scale = mapViewportScale()) {
  const center = viewCenterPoint();
  return {
    x: (point.x - center.x) * mapView.zoom * scale.x + 50,
    y: (point.y - center.y) * mapView.zoom * scale.y + 50,
  };
}

function worldPointFromScreen(anchor, scale = mapViewportScale()) {
  const center = viewCenterPoint();
  return {
    x: center.x + (anchor.x - 50) / (mapView.zoom * scale.x),
    y: center.y + (anchor.y - 50) / (mapView.zoom * scale.y),
  };
}

function regionKeyForPlace(place) {
  return place?.country?.en || "";
}

function getMapRegion(key) {
  return mapRegionHighlights.find((region) => region.key === key);
}

function setActiveMapRegion(key) {
  const nextKey = key || null;
  if (state.activeMapRegionKey === nextKey) return;
  state.activeMapRegionKey = nextKey;
  drawMap();
}

function rotatedShapePoint(lon, lat, shape) {
  const angle = (shape.rotate || 0) * (Math.PI / 180);
  const dx = lon - shape.cx;
  const dy = lat - shape.cy;
  return {
    x: dx * Math.cos(angle) + dy * Math.sin(angle),
    y: -dx * Math.sin(angle) + dy * Math.cos(angle),
  };
}

function isGeoInsideShape(lon, lat, shape) {
  const point = rotatedShapePoint(lon, lat, shape);
  return (point.x / shape.rx) ** 2 + (point.y / shape.ry) ** 2 <= 1;
}

function hitMapRegion(anchor) {
  const viewportScale = mapViewportScale();
  const worldPoint = worldPointFromScreen(anchor, viewportScale);
  const geo = unproject(worldPoint);

  return mapRegionHighlights
    .filter((region) => region.shapes.some((shape) => isGeoInsideShape(geo.lon, geo.lat, shape)))
    .sort((a, b) => {
      const areaA = Math.min(...a.shapes.map((shape) => shape.rx * shape.ry));
      const areaB = Math.min(...b.shapes.map((shape) => shape.rx * shape.ry));
      return areaA - areaB;
    })[0];
}

function clampMapCenter(point) {
  const geo = unproject({
    x: clamp(point.x, 0, 100),
    y: clamp(point.y, 0, 100),
  });
  mapView.centerLon = clamp(geo.lon, mapBounds.minLon, mapBounds.maxLon);
  mapView.centerLat = clamp(geo.lat, mapBounds.minLat, mapBounds.maxLat);
}

function updateMapView() {
  drawMap();
  renderLocations();
  if (state.activePlaceId) {
    const button = document.querySelector(`[data-place-id="${state.activePlaceId}"]`);
    if (button) positionPreview(button);
  }
}

function zoomMap(scale, anchor = { x: 50, y: 50 }) {
  const previousZoom = mapView.zoom;
  const nextZoom = clamp(previousZoom * scale, mapView.minZoom, mapView.maxZoom);
  if (nextZoom === previousZoom) return;

  const center = viewCenterPoint();
  const viewportScale = mapViewportScale();
  const anchorWorldPoint = {
    x: center.x + (anchor.x - 50) / (previousZoom * viewportScale.x),
    y: center.y + (anchor.y - 50) / (previousZoom * viewportScale.y),
  };

  mapView.zoom = nextZoom;
  clampMapCenter({
    x: anchorWorldPoint.x - (anchor.x - 50) / (nextZoom * viewportScale.x),
    y: anchorWorldPoint.y - (anchor.y - 50) / (nextZoom * viewportScale.y),
  });
  updateMapView();
}

function resetMapView() {
  Object.assign(mapView, mapViewDefaults);
  updateMapView();
}

function focusMapStage() {
  try {
    els.mapStage.focus({ preventScroll: true });
  } catch {
    els.mapStage.focus();
  }
}

function pointerList() {
  return Array.from(state.mapPointers.values());
}

function pointerDistance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function pointerMidpoint(a, b) {
  return {
    x: (a.x + b.x) / 2,
    y: (a.y + b.y) / 2,
  };
}

function stageAnchorFromClient(clientX, clientY, rect = els.mapStage.getBoundingClientRect()) {
  return {
    x: ((clientX - rect.left) / rect.width) * 100,
    y: ((clientY - rect.top) / rect.height) * 100,
  };
}

function beginMapDrag(pointer) {
  const rect = els.mapStage.getBoundingClientRect();
  if (!rect.width || !rect.height) return;

  state.mapDrag = {
    pointerId: pointer.id,
    startX: pointer.x,
    startY: pointer.y,
    width: rect.width,
    height: rect.height,
    scale: mapViewportScale(rect),
    center: viewCenterPoint(),
  };
  els.mapStage.classList.add("is-dragging");
}

function beginMapPinch() {
  const pointers = pointerList();
  if (pointers.length < 2) return;

  const [first, second] = pointers;
  const rect = els.mapStage.getBoundingClientRect();
  const midpoint = pointerMidpoint(first, second);
  const anchor = stageAnchorFromClient(midpoint.x, midpoint.y, rect);
  const center = viewCenterPoint();
  const viewportScale = mapViewportScale(rect);
  state.mapPinch = {
    ids: [first.id, second.id],
    startDistance: pointerDistance(first, second),
    startZoom: mapView.zoom,
    scale: viewportScale,
    anchorWorldPoint: {
      x: center.x + (anchor.x - 50) / (mapView.zoom * viewportScale.x),
      y: center.y + (anchor.y - 50) / (mapView.zoom * viewportScale.y),
    },
  };
  state.mapDrag = null;
  els.mapStage.classList.remove("is-dragging");
  els.mapStage.classList.add("is-pinching");
}

function startMapDrag(event) {
  if (!els.mapStage || event.button !== 0) return;
  if (event.target instanceof Element && event.target.closest(".photo-location, .photo-preview")) return;

  focusMapStage();
  hidePreview();
  state.mapPointers.set(event.pointerId, { id: event.pointerId, x: event.clientX, y: event.clientY });
  els.mapStage.setPointerCapture?.(event.pointerId);

  if (state.mapPointers.size >= 2) {
    beginMapPinch();
  } else {
    beginMapDrag({ id: event.pointerId, x: event.clientX, y: event.clientY });
  }

  event.preventDefault();
}

function moveMapDrag(event) {
  if (!state.mapPointers.has(event.pointerId)) return;

  state.mapPointers.set(event.pointerId, { id: event.pointerId, x: event.clientX, y: event.clientY });

  if (state.mapPinch) {
    const [firstId, secondId] = state.mapPinch.ids;
    const first = state.mapPointers.get(firstId);
    const second = state.mapPointers.get(secondId);
    if (!first || !second || !state.mapPinch.startDistance) return;

    const rect = els.mapStage.getBoundingClientRect();
    const midpoint = pointerMidpoint(first, second);
    const anchor = stageAnchorFromClient(midpoint.x, midpoint.y, rect);
    const nextZoom = clamp(
      state.mapPinch.startZoom * (pointerDistance(first, second) / state.mapPinch.startDistance),
      mapView.minZoom,
      mapView.maxZoom,
    );

    mapView.zoom = nextZoom;
    const viewportScale = mapViewportScale(rect);
    clampMapCenter({
      x: state.mapPinch.anchorWorldPoint.x - (anchor.x - 50) / (nextZoom * viewportScale.x),
      y: state.mapPinch.anchorWorldPoint.y - (anchor.y - 50) / (nextZoom * viewportScale.y),
    });
    updateMapView();
    return;
  }

  const drag = state.mapDrag;
  if (!drag || event.pointerId !== drag.pointerId) return;

  const pointer = state.mapPointers.get(event.pointerId);
  const deltaX = ((pointer.x - drag.startX) / drag.width) * 100;
  const deltaY = ((pointer.y - drag.startY) / drag.height) * 100;
  const viewportScale = drag.scale || { x: 1, y: 1 };
  clampMapCenter({
    x: drag.center.x - deltaX / (mapView.zoom * viewportScale.x),
    y: drag.center.y - deltaY / (mapView.zoom * viewportScale.y),
  });
  updateMapView();
}

function endMapDrag(event) {
  try {
    els.mapStage?.releasePointerCapture?.(event.pointerId);
  } catch {
    // The capture may already be released after a pointercancel/lostpointercapture event.
  }

  state.mapPointers.delete(event.pointerId);
  state.mapDrag = null;
  state.mapPinch = null;
  els.mapStage?.classList.remove("is-dragging", "is-pinching");

  const remaining = pointerList();
  if (remaining.length === 1) {
    beginMapDrag(remaining[0]);
  }
}

function gestureAnchor(event) {
  const rect = els.mapStage.getBoundingClientRect();
  const clientX = Number.isFinite(event.clientX) && event.clientX ? event.clientX : rect.left + rect.width / 2;
  const clientY = Number.isFinite(event.clientY) && event.clientY ? event.clientY : rect.top + rect.height / 2;
  return stageAnchorFromClient(clientX, clientY, rect);
}

function startMapGesture(event) {
  if (!els.mapStage) return;

  event.preventDefault();
  focusMapStage();
  hidePreview();
  state.mapGestureScale = event.scale || 1;
}

function changeMapGesture(event) {
  if (!els.mapStage) return;

  event.preventDefault();
  const currentScale = event.scale || 1;
  const previousScale = state.mapGestureScale || 1;
  if (!currentScale || !previousScale) return;

  zoomMap(currentScale / previousScale, gestureAnchor(event));
  state.mapGestureScale = currentScale;
}

function endMapGesture(event) {
  event.preventDefault();
  state.mapGestureScale = 1;
}

function setupMapControls() {
  if (!els.mapStage) return;

  els.mapStage.tabIndex = 0;
  els.mapStage.addEventListener("pointerdown", startMapDrag);
  els.mapStage.addEventListener("pointermove", moveMapDrag);
  els.mapStage.addEventListener("pointermove", updateMapRegionHover);
  els.mapStage.addEventListener("pointerup", endMapDrag);
  els.mapStage.addEventListener("pointercancel", endMapDrag);
  els.mapStage.addEventListener("lostpointercapture", endMapDrag);
  els.mapStage.addEventListener("pointerleave", () => {
    setActiveMapRegion(null);
  });

  els.mapStage.addEventListener(
    "wheel",
    (event) => {
      event.preventDefault();

      const rect = els.mapStage.getBoundingClientRect();
      const anchor = {
        x: ((event.clientX - rect.left) / rect.width) * 100,
        y: ((event.clientY - rect.top) / rect.height) * 100,
      };
      zoomMap(Math.exp(-event.deltaY * 0.0035), anchor);
    },
    { passive: false },
  );

  els.mapStage.addEventListener("gesturestart", startMapGesture, { passive: false });
  els.mapStage.addEventListener("gesturechange", changeMapGesture, { passive: false });
  els.mapStage.addEventListener("gestureend", endMapGesture, { passive: false });
}

function updateMapRegionHover(event) {
  if (!els.mapStage || state.mapPointers.size || state.mapDrag || state.mapPinch) return;
  if (event.target instanceof Element && event.target.closest(".photo-preview")) return;

  const rect = els.mapStage.getBoundingClientRect();
  const anchor = stageAnchorFromClient(event.clientX, event.clientY, rect);
  const region = hitMapRegion(anchor);
  setActiveMapRegion(region?.key || null);
}

function setupPlacePreview() {
  if (!els.preview) return;

  els.preview.addEventListener("pointerenter", cancelHidePreview);
  els.preview.addEventListener("pointerleave", scheduleHidePreview);
  els.preview.addEventListener("focus", cancelHidePreview);
  els.preview.addEventListener("blur", scheduleHidePreview);
  els.preview.addEventListener("pointerdown", (event) => {
    event.stopPropagation();
  });
  els.preview.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    const placeId = els.preview.dataset.placeId || state.activePlaceId;
    if (placeId) openPlaceById(placeId);
  });
}

function drawMapRegionHighlight(ctx, rect, viewportScale) {
  const region = getMapRegion(state.activeMapRegionKey);
  if (!region) return;

  ctx.save();
  region.shapes.forEach((shape) => {
    const center = screenProject(project(shape.cx, shape.cy), viewportScale);
    const radiusX = (shape.rx / (mapBounds.maxLon - mapBounds.minLon)) * 100 * mapView.zoom * viewportScale.x;
    const radiusY = (shape.ry / (mapBounds.maxLat - mapBounds.minLat)) * 100 * mapView.zoom * viewportScale.y;
    const x = (center.x / 100) * rect.width;
    const y = (center.y / 100) * rect.height;
    const rx = Math.max((radiusX / 100) * rect.width, 14);
    const ry = Math.max((radiusY / 100) * rect.height, 10);
    const rotate = (shape.rotate || 0) * (Math.PI / 180);

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotate);
    ctx.beginPath();
    ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(17, 17, 17, 0.045)";
    ctx.shadowColor = "rgba(17, 17, 17, 0.12)";
    ctx.shadowBlur = 32;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = "rgba(17, 17, 17, 0.055)";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();
  });
  ctx.restore();
}

function drawDot(ctx, x, y, radius, fill) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = fill;
  ctx.fill();
}

function drawMap() {
  if (!els.canvas) return;

  const rect = els.canvas.getBoundingClientRect();
  if (!rect.width || !rect.height) return;

  const dpr = window.devicePixelRatio || 1;
  const ctx = els.canvas.getContext("2d");
  els.canvas.width = Math.round(rect.width * dpr);
  els.canvas.height = Math.round(rect.height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, rect.width, rect.height);

  const viewportScale = mapViewportScale(rect);
  drawMapRegionHighlight(ctx, rect, viewportScale);

  const radius = clamp((mapReferenceSize.width * 0.00135) + mapView.zoom * 0.32, 1.55, 4.4);
  landDots.forEach((dot) => {
    const basePoint = dot.x === undefined ? project(dot.lon, dot.lat) : dot;
    const point = screenProject(basePoint, viewportScale);
    if (point.x < -2 || point.x > 102 || point.y < -2 || point.y > 102) return;
    drawDot(ctx, (point.x / 100) * rect.width, (point.y / 100) * rect.height, radius, "rgba(172, 172, 172, 0.62)");
  });
}

function renderLocations() {
  if (!els.locationLayer) return;

  els.locationLayer.innerHTML = "";

  const viewportScale = mapViewportScale();

  photoPlaces.forEach((place) => {
    const point = screenProject(project(place.lon, place.lat), viewportScale);
    if (point.x < -6 || point.x > 106 || point.y < -6 || point.y > 106) return;

    const button = document.createElement("button");
    const placeWorks = getPlaceWorks(place);
    button.type = "button";
    button.className = "photo-location";
    button.dataset.placeId = place.id;
    button.style.left = `${point.x}%`;
    button.style.top = `${point.y}%`;
    button.setAttribute(
      "aria-label",
      `${localText(place.name)}, ${placeWorks.length} ${photoLabel(placeWorks.length)}`,
    );

    button.addEventListener("pointerenter", () => showPreview(place, button));
    button.addEventListener("focus", () => showPreview(place, button));
    button.addEventListener("pointerleave", scheduleHidePreview);
    button.addEventListener("blur", scheduleHidePreview);
    button.addEventListener("pointerdown", (event) => {
      event.stopPropagation();
    });
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      openPlace(place);
    });
    els.locationLayer.appendChild(button);
  });
}

function cancelHidePreview() {
  if (!state.previewHideTimer) return;
  window.clearTimeout(state.previewHideTimer);
  state.previewHideTimer = 0;
}

function scheduleHidePreview() {
  cancelHidePreview();
  state.previewHideTimer = window.setTimeout(hidePreview, 180);
}

function openPlaceById(placeId) {
  const place = getPlace(placeId);
  if (place) openPlace(place);
}

function showPreview(place, button) {
  const work = getPreviewWork(place);
  if (!work || !els.preview) return;

  cancelHidePreview();
  state.activePlaceId = place.id;
  setActiveMapRegion(regionKeyForPlace(place));
  document.querySelectorAll(".photo-location").forEach((node) => {
    node.classList.toggle("is-active", node === button);
  });

  els.previewImage.src = displaySrc(work);
  els.previewImage.alt = localText(work.title);
  els.previewPlace.textContent = localText(place.name);

  const placeWorks = getPlaceWorks(place);
  els.previewMeta.textContent =
    state.lang === "zh" ? "" : `${localText(place.country)} · ${placeWorks.length} ${photoLabel(placeWorks.length)}`;

  positionPreview(button);
  els.preview.dataset.placeId = place.id;
  els.preview.classList.add("is-visible");
  els.preview.setAttribute("aria-hidden", "false");
  els.preview.tabIndex = 0;
}

function positionPreview(button) {
  const stageRect = els.locationLayer.getBoundingClientRect();
  const buttonRect = button.getBoundingClientRect();
  const previewWidth = els.preview.offsetWidth || 320;
  const x = buttonRect.left - stageRect.left + buttonRect.width / 2;
  const y = buttonRect.top - stageRect.top + buttonRect.height / 2;
  const safeLeft = clamp(x, previewWidth / 2 + 8, stageRect.width - previewWidth / 2 - 8);
  els.preview.style.left = `${safeLeft}px`;
  els.preview.style.top = `${y}px`;
  els.preview.classList.toggle("is-below", y < 130);
}

function hidePreview() {
  if (!els.preview) return;

  cancelHidePreview();
  state.activePlaceId = null;
  setActiveMapRegion(null);
  delete els.preview.dataset.placeId;
  els.preview.classList.remove("is-visible", "is-below");
  els.preview.setAttribute("aria-hidden", "true");
  els.preview.tabIndex = -1;
  document.querySelectorAll(".photo-location").forEach((node) => {
    node.classList.remove("is-active");
  });
}

function openPlace(place) {
  const placeWorks = getPlaceWorks(place);
  if (!placeWorks.length) return;
  openLightbox(0, placeWorks);
}

function workMeta(work) {
  const place = getPlace(work.placeId);
  if (!place) return work.year;
  const parts =
    state.lang === "zh"
      ? [localText(place.name), work.year]
      : [localText(place.name), localText(place.country), work.year];
  return parts.filter(Boolean).join(" · ");
}

function openLightbox(index, visibleWorks = works) {
  if (!els.lightbox) return;

  state.visibleWorks = [...visibleWorks];
  state.activeIndex = index;
  renderLightboxThumbs();
  els.lightbox.showModal();
  els.body.classList.add("is-locked");
  updateLightbox();
}

function renderLightboxThumbs() {
  if (!els.lightboxThumbs) return;

  const fragment = document.createDocumentFragment();
  state.visibleWorks.forEach((work, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "lightbox-thumb";
    button.dataset.index = String(index);
    button.setAttribute("aria-label", localText(work.title));
    button.addEventListener("click", () => {
      state.activeIndex = index;
      updateLightbox();
    });

    const image = document.createElement("img");
    image.src = displaySrc(work);
    image.alt = "";
    image.loading = "lazy";
    image.decoding = "async";
    button.appendChild(image);
    fragment.appendChild(button);
  });

  els.lightboxThumbs.replaceChildren(fragment);
}

function updateLightbox() {
  const work = state.visibleWorks[state.activeIndex];
  if (!work || !els.lightboxImage) return;

  els.lightboxImage.src = fullSrc(work);
  els.lightboxImage.alt = localText(work.title);
  els.lightboxTitle.textContent = localText(work.title);
  els.lightboxCaption.textContent = localText(work.caption);
  els.lightboxMeta.textContent = workMeta(work);

  els.lightboxThumbs?.querySelectorAll(".lightbox-thumb").forEach((button, index) => {
    const isActive = index === state.activeIndex;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-current", isActive ? "true" : "false");
    if (isActive) {
      button.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  });
}

function closeLightbox() {
  if (!els.lightbox) return;

  els.lightbox.close();
  els.body.classList.remove("is-locked");
}

function shiftLightbox(direction) {
  const count = state.visibleWorks.length;
  state.activeIndex = (state.activeIndex + direction + count) % count;
  updateLightbox();
}

function render() {
  applyStaticCopy();
  renderGallery();
  renderLocations();
  drawMap();
  if (els.lightbox?.open) updateLightbox();
}

els.langButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.lang = button.dataset.lang;
    persistLanguage(state.lang);
    render();
  });
});

els.languageSwitches.forEach((button) => {
  button.addEventListener("click", () => {
    state.lang = state.lang === "zh" ? "en" : "zh";
    persistLanguage(state.lang);
    render();
  });
});

els.closeLightbox?.addEventListener("click", closeLightbox);
els.prevWork?.addEventListener("click", () => shiftLightbox(-1));
els.nextWork?.addEventListener("click", () => shiftLightbox(1));
setupNavSubmenus();
setupMapControls();
setupPlacePreview();

els.lightbox?.addEventListener("close", () => {
  els.body.classList.remove("is-locked");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    hidePreview();
    if (els.lightbox?.open) closeLightbox();
  }

  if (!els.lightbox?.open && els.canvas && !event.ctrlKey && !event.metaKey && !event.altKey) {
    if (event.key === "+" || event.key === "=") {
      event.preventDefault();
      zoomMap(1.22);
    }

    if (event.key === "-" || event.key === "_") {
      event.preventDefault();
      zoomMap(1 / 1.22);
    }

    if (event.key === "0") {
      event.preventDefault();
      resetMapView();
    }
  }

  if (!els.lightbox?.open) return;
  if (event.key === "ArrowLeft") shiftLightbox(-1);
  if (event.key === "ArrowRight") shiftLightbox(1);
});

window.addEventListener("resize", () => {
  if (!els.canvas) return;

  cancelAnimationFrame(state.resizeFrame);
  state.resizeFrame = requestAnimationFrame(() => {
    drawMap();
    renderLocations();
    if (state.activePlaceId) {
      const button = document.querySelector(`[data-place-id="${state.activePlaceId}"]`);
      if (button) {
        positionPreview(button);
      } else {
        hidePreview();
      }
    }
  });
});

render();
if (els.canvas) loadLandDots().then(drawMap);

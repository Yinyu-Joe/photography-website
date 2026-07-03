const profile = {
  name: {
    zh: "Yinyu Zhu",
    en: "Yinyu Zhu",
  },
  role: {
    zh: "摄影师",
    en: "PHOTOGRAPHER",
  },
  email: "zhuyinyujoe@gmail.com",
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
    "nav.landscape": "风景",
    "nav.street": "街景",
    "nav.abstract": "抽象",
    "nav.atlas": "地图",
    "atlas.eyebrow": "影像地图",
    "atlas.title": "把照片散落在世界的坐标上。",
    "atlas.placeCount": "作品分类",
    "story.eyebrow": "故事",
    "story.title": "从移动、等待和反复回望中生长出来的摄影练习。",
    "story.bodyOne":
      "这个网站被组织成一个拍摄地点与作品方向的档案，而不是单一的图片墙。地图帮助记住一张照片开始的地方，每个分组也可以慢慢长成项目、文字和完整作品集。",
    "story.bodyTwo":
      "当前页面结构会随着真实影像继续扩展。新的首页背景、地点和照片都可以逐步加入，而不需要改变网站的整体骨架。",
    "about.eyebrow": "关于",
    "about.title": "以安静的观察，记录人、城市与自然的瞬间。",
    "about.bodyOne":
      "我关注日常中的细节：一束光、一次回望、一条雨后的街道。作品横跨人像、街拍、风光、建筑与静物，希望在真实与克制之间保留画面的呼吸。",
    "about.bodyTwo":
      "每一个黄色坐标都连接到一次拍摄现场。以后可以继续添加真实城市、经纬度和照片，让这张地图慢慢长成完整的影像档案。",
    "contact.wechatLabel": "微信",
    "contact.eyebrow": "联系",
    "contact.title": "如果你喜欢这些影像，我们可以从一次简短交流开始。",
    "contact.emailAction": "发送邮件",
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
    "nav.city": "City",
    "nav.landscape": "Landscape",
    "nav.street": "Street",
    "nav.abstract": "Abstract",
    "nav.atlas": "ATLAS",
    "atlas.eyebrow": "PHOTO ATLAS",
    "atlas.title": "A world map made from photographed coordinates.",
    "atlas.placeCount": "photo collections",
    "story.eyebrow": "Story",
    "story.title": "A photography practice built from movement, waiting, and small returns.",
    "story.bodyOne":
      "This site is organized as an archive of photographed places rather than a single image wall. The map becomes a way to remember where a photograph began, while each section can grow slowly into projects, essays, and finished bodies of work.",
    "story.bodyTwo":
      "The current imagery is temporary. When the final homepage background arrives, it can replace the placeholder image without changing the site structure.",
    "about.eyebrow": "ABOUT",
    "about.title": "Quiet observation of people, cities, nature, and still moments.",
    "about.bodyOne":
      "I look for details in everyday life: a slant of light, a returning gaze, a street after rain. The work spans portrait, street, landscape, architecture, and still life while keeping each frame restrained and breathable.",
    "about.bodyTwo":
      "Every amber coordinate links back to a place photographed in the field. More real cities, coordinates, and photographs can be added as the atlas grows.",
    "contact.wechatLabel": "WeChat",
    "contact.eyebrow": "CONTACT",
    "contact.title": "If these images resonate, we can start with a short conversation.",
    "contact.emailAction": "Send Email",
    "lightbox.close": "Close",
    "lightbox.prev": "Previous",
    "lightbox.next": "Next",
    "photos.singular": "photo",
    "photos.plural": "photos",
  },
};

const importedPhotoCollections = Array.isArray(globalThis.photoCollections) ? globalThis.photoCollections : [];

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

const mapBounds = {
  minLon: -180,
  maxLon: 180,
  minLat: -56,
  maxLat: 82,
};

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
  resolvedInitialHash: false,
  resizeFrame: 0,
};

const els = {
  body: document.body,
  canvas: document.querySelector("#worldMapCanvas"),
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
  document.title = state.lang === "zh" ? `${currentName} 摄影` : `${currentName} Photography`;

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
  document.querySelectorAll("a[href^='mailto:']").forEach((node) => {
    node.href = `mailto:${profile.email}`;
  });

  els.langButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lang === state.lang);
  });

  els.languageSwitches.forEach((button) => {
    button.textContent = state.lang === "zh" ? "EN" : "中";
    button.setAttribute("aria-label", state.lang === "zh" ? "Switch to English" : "切换到中文");
  });

  if (els.placeCount) els.placeCount.textContent = String(photoPlaces.length);
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
  const lonStep = 4.25;
  const latStep = 3.75;

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

  const radius = clamp(rect.width * 0.00272, 2.25, 5.15);
  landDots.forEach((dot) => {
    const point = dot.x === undefined ? project(dot.lon, dot.lat) : dot;
    drawDot(ctx, (point.x / 100) * rect.width, (point.y / 100) * rect.height, radius, "rgba(232, 232, 228, 0.9)");
  });
}

function renderLocations() {
  if (!els.locationLayer) return;

  els.locationLayer.innerHTML = "";

  photoPlaces.forEach((place) => {
    const point = project(place.lon, place.lat);
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
    button.addEventListener("pointerleave", hidePreview);
    button.addEventListener("blur", hidePreview);
    button.addEventListener("click", () => openPlace(place));
    els.locationLayer.appendChild(button);
  });
}

function showPreview(place, button) {
  const work = getPreviewWork(place);
  if (!work || !els.preview) return;

  state.activePlaceId = place.id;
  document.querySelectorAll(".photo-location").forEach((node) => {
    node.classList.toggle("is-active", node === button);
  });

  els.previewImage.src = displaySrc(work);
  els.previewImage.alt = localText(work.title);
  els.previewPlace.textContent = localText(place.name);

  const placeWorks = getPlaceWorks(place);
  els.previewMeta.textContent = `${localText(place.country)} · ${placeWorks.length} ${photoLabel(placeWorks.length)}`;

  positionPreview(button);
  els.preview.classList.add("is-visible");
  els.preview.setAttribute("aria-hidden", "false");
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

  state.activePlaceId = null;
  els.preview.classList.remove("is-visible", "is-below");
  els.preview.setAttribute("aria-hidden", "true");
  document.querySelectorAll(".photo-location").forEach((node) => {
    node.classList.remove("is-active");
  });
}

function openPlace(place) {
  const work = getPreviewWork(place);
  if (!work) return;
  const index = works.findIndex((item) => item.id === work.id);
  openLightbox(index >= 0 ? index : 0);
}

function workMeta(work) {
  const place = getPlace(work.placeId);
  if (!place) return work.year;
  return `${localText(place.name)} · ${localText(place.country)} · ${work.year}`;
}

function openLightbox(index) {
  if (!els.lightbox) return;

  state.visibleWorks = [...works];
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

els.lightbox?.addEventListener("close", () => {
  els.body.classList.remove("is-locked");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    hidePreview();
    if (els.lightbox?.open) closeLightbox();
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
    if (state.activePlaceId) {
      const button = document.querySelector(`[data-place-id="${state.activePlaceId}"]`);
      if (button) positionPreview(button);
    }
  });
});

render();
if (els.canvas) loadLandDots().then(drawMap);

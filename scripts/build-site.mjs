import fs from "node:fs/promises";
import path from "node:path";
import { buildContentModel, projectRoot } from "./lib/content-model.mjs";
import { availableVariantWidths, buildResponsiveImages, variantUrl } from "./lib/image-pipeline.mjs";

const outputRoot = path.join(projectRoot, "_site");
const skipImageBuild = process.env.SKIP_IMAGE_BUILD === "1";
const content = await buildContentModel();
const photoById = new Map(content.photos.map((photo) => [photo.id, photo]));
const placeById = new Map(content.places.map((place) => [place.id, place]));
const seriesById = new Map(content.series.map((series) => [series.id, series]));
const site = content.site;

if (path.basename(outputRoot) !== "_site" || path.dirname(outputRoot) !== projectRoot) {
  throw new Error(`Refusing to clean unexpected output path: ${outputRoot}`);
}

await fs.rm(outputRoot, { recursive: true, force: true });
await fs.mkdir(outputRoot, { recursive: true });
await fs.cp(path.join(projectRoot, "assets"), path.join(outputRoot, "assets"), { recursive: true });
for (const file of ["styles.css", "favicon.ico", "manifest.webmanifest"]) {
  await fs.copyFile(path.join(projectRoot, file), path.join(outputRoot, file));
}

const imageBuild = await buildResponsiveImages(content, projectRoot, outputRoot, { skip: skipImageBuild });

const labels = {
  zh: {
    skip: "跳到主要内容",
    work: "作品",
    places: "地图",
    stories: "故事",
    about: "关于",
    rights: "版权",
    series: "系列",
    index: "索引",
    selected: "精选",
    viewAll: "查看全部作品",
    photographedPlaces: "拍摄地点",
    photos: "张照片",
    story: "故事",
    contact: "联系",
    email: "邮箱",
    wechat: "微信",
    imageRights: "图片使用与授权",
    previous: "上一张",
    next: "下一张",
    close: "关闭",
    archive: "摄影档案",
    allSeries: "全部系列",
    allPlaces: "全部地点",
    allStories: "全部故事"
  },
  en: {
    skip: "Skip to main content",
    work: "Works",
    places: "Map",
    stories: "Stories",
    about: "About",
    rights: "Rights",
    series: "Series",
    index: "Index",
    selected: "Selected",
    viewAll: "View all work",
    photographedPlaces: "Photographed places",
    photos: "photos",
    story: "Story",
    contact: "Contact",
    email: "Email",
    wechat: "WeChat",
    imageRights: "Image usage and licensing",
    previous: "Previous",
    next: "Next",
    close: "Close",
    archive: "Photography archive",
    allSeries: "All series",
    allPlaces: "All places",
    allStories: "All stories"
  }
};

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function text(value, locale) {
  return value?.[locale] || value?.zh || value?.en || "";
}

function localePrefix(locale) {
  return locale === "en" ? "/en" : "";
}

function route(locale, type, slug) {
  const prefix = localePrefix(locale);
  const base = {
    home: "",
    work: "/work",
    series: "/series",
    places: "/places",
    stories: "/stories",
    about: "/about",
    rights: "/rights"
  }[type];
  if (base === undefined) throw new Error(`Unknown route type: ${type}`);
  return `${prefix}${base}${slug ? `/${slug}` : ""}` || "/";
}

function outputFile(urlPath) {
  if (urlPath === "/") return path.join(outputRoot, "index.html");
  return path.join(outputRoot, `${urlPath.replace(/^\//, "")}.html`);
}

async function writeRoute(urlPath, html) {
  const destination = outputFile(urlPath);
  await fs.mkdir(path.dirname(destination), { recursive: true });
  await fs.writeFile(destination, html);
}

function absolute(urlPath) {
  return `${site.origin}${urlPath === "/" ? "/" : urlPath}`;
}

function equivalentPath(locale, type, slug) {
  return route(locale === "zh" ? "en" : "zh", type, slug);
}

function headMarkup({ locale, type, slug, title, description, image, imageAlt, ogType = "website", jsonLd = [] }) {
  const canonicalPath = route(locale, type, slug);
  const zhPath = route("zh", type, slug);
  const enPath = route("en", type, slug);
  const imageUrl = image ? absolute(image) : absolute("/assets/home/home-landscape.jpg");
  const jsonScripts = jsonLd.map((entry) => {
    const serialized = JSON.stringify(entry).replaceAll("</script", "<\\/script");
    return `    <script type="application/ld+json">${serialized}</script>`;
  }).join("\n");
  return `
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}">
    <meta name="robots" content="index, follow, max-image-preview:large">
    <meta name="theme-color" content="#fafafa">
    <link rel="canonical" href="${absolute(canonicalPath)}">
    <link rel="alternate" hreflang="zh-CN" href="${absolute(zhPath)}">
    <link rel="alternate" hreflang="en" href="${absolute(enPath)}">
    <link rel="alternate" hreflang="x-default" href="${absolute(zhPath)}">
    <meta property="og:type" content="${ogType}">
    <meta property="og:site_name" content="Yinyu Zhu Photography">
    <meta property="og:locale" content="${locale === "zh" ? "zh_CN" : "en_US"}">
    <meta property="og:title" content="${esc(title)}">
    <meta property="og:description" content="${esc(description)}">
    <meta property="og:url" content="${absolute(canonicalPath)}">
    <meta property="og:image" content="${imageUrl}">
    <meta property="og:image:alt" content="${esc(imageAlt || "Yinyu Zhu Photography")}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${esc(title)}">
    <meta name="twitter:description" content="${esc(description)}">
    <meta name="twitter:image" content="${imageUrl}">
    <meta name="twitter:image:alt" content="${esc(imageAlt || "Yinyu Zhu Photography")}">
    <link rel="icon" href="/favicon.ico" sizes="any">
    <link rel="icon" href="/assets/icons/favicon-32.png" type="image/png" sizes="32x32">
    <link rel="apple-touch-icon" href="/assets/icons/apple-touch-icon.png">
    <link rel="manifest" href="/manifest.webmanifest">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;family=Noto+Sans+SC:wght@400;500;600;700&amp;display=swap" media="print" onload="this.media='all'">
    <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;family=Noto+Sans+SC:wght@400;500;600;700&amp;display=swap"></noscript>
    <link rel="stylesheet" href="/styles.css?v=archive-v2">
${jsonScripts}`;
}

function headerMarkup(locale, currentType, equivalentHref) {
  const l = labels[locale];
  const prefix = localePrefix(locale);
  const activeNavType = currentType === "series" ? "work" : currentType;
  const navItems = [
    ["work", l.work, `${prefix}/work`],
    ["places", l.places, `${prefix}/places`],
    ["stories", l.stories, `${prefix}/stories`],
    ["about", l.about, `${prefix}/about`]
  ];
  return `
    <a class="skip-link" href="#main-content">${l.skip}</a>
    <header class="site-header">
      <a class="brand-lockup" href="${prefix || "/"}" aria-label="Yinyu Zhu Photography home">
        <picture class="brand-mark">
          <source srcset="/assets/logo-yinyu-zhu-signature-transparent-520.webp" type="image/webp">
          <img class="brand-logo" src="/assets/logo-yinyu-zhu-signature-transparent.png" width="1672" height="941" alt="Yinyu Zhu Photography">
        </picture>
      </a>
      <nav class="main-nav" aria-label="${locale === "zh" ? "主导航" : "Main navigation"}">
        ${navItems.map(([type, label, href]) => `<a href="${href}"${activeNavType === type ? ' aria-current="page"' : ""}>${label}</a>`).join("\n        ")}
      </nav>
      <div class="header-actions" role="group" aria-label="${locale === "zh" ? "社交链接与语言" : "Social links and language"}">
        ${site.author.socials.map((social) => `<a class="social-button${social.id === "xiaohongshu" ? " social-button-xiaohongshu" : ""}" href="${esc(social.href)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(social.label)}"><img src="${social.icon}" width="24" height="24" alt=""></a>`).join("")}
        <a class="language-switch" href="${equivalentHref}" lang="${locale === "zh" ? "en" : "zh-CN"}" hreflang="${locale === "zh" ? "en" : "zh-CN"}" aria-label="${locale === "zh" ? "Switch to English" : "切换到中文"}">${locale === "zh" ? "EN" : "中文"}</a>
      </div>
    </header>`;
}

function footerMarkup(locale) {
  const l = labels[locale];
  const prefix = localePrefix(locale);
  return `
    <footer class="archive-footer">
      <p>© 2026 Yinyu Zhu</p>
      <nav aria-label="${locale === "zh" ? "页脚导航" : "Footer navigation"}">
        <a href="${prefix}/about">${l.about}</a>
        <a href="${prefix}/rights">${l.rights}</a>
        <a href="mailto:${site.author.email}">${l.email}</a>
      </nav>
    </footer>`;
}

function pageShell({ locale, type, slug = null, title, description, image, imageAlt, main, scripts = [], bodyClass = "", ogType, jsonLd }) {
  const equivalentHref = equivalentPath(locale, type, slug);
  return `<!DOCTYPE html>
<html lang="${locale === "zh" ? "zh-CN" : "en"}" data-site-v2>
  <head>${headMarkup({ locale, type, slug, title, description, image, imageAlt, ogType, jsonLd })}
  </head>
  <body${bodyClass ? ` class="${bodyClass}"` : ""}>${headerMarkup(locale, type, equivalentHref)}
${main}
${footerMarkup(locale)}
${scripts.map((script) => `    <script src="${script}" defer></script>`).join("\n")}
  </body>
</html>\n`;
}

function photoHref(locale, photo) {
  return route(locale, "work", photo.slug);
}

function pictureMarkup(photo, locale, { sizes = "(max-width: 640px) 70vw, 33vw", eager = false, decorative = false, className = "" } = {}) {
  const alt = decorative ? "" : text(photo.alt, locale);
  const loading = eager ? "eager" : "lazy";
  const priority = eager ? ' fetchpriority="high"' : ' fetchpriority="low"';
  const width = photo.width || 1000;
  const height = photo.height || 1000;
  const aspectStyle = `aspect-ratio:${width} / ${height};--media-max-width:${(82 * width / height).toFixed(4)}vh`;
  if (skipImageBuild) {
    return `<picture${className ? ` class="${className}"` : ""} style="${aspectStyle}"><img src="${photo.thumb || photo.source}" width="${width}" height="${height}" style="${aspectStyle}" loading="${loading}"${priority} decoding="async" alt="${esc(alt)}"></picture>`;
  }
  const variantWidths = availableVariantWidths(photo);
  const srcset = (format) => variantWidths.map((value) => `${variantUrl(photo, value, format)} ${value}w`).join(", ");
  return `<picture${className ? ` class="${className}"` : ""} style="${aspectStyle}">
            <source type="image/avif" srcset="${srcset("avif")}" sizes="${esc(sizes)}">
            <source type="image/webp" srcset="${srcset("webp")}" sizes="${esc(sizes)}">
            <img src="${photo.source}" width="${width}" height="${height}" style="${aspectStyle}" loading="${loading}"${priority} decoding="async" alt="${esc(alt)}">
          </picture>`;
}

function storyPictureMarkup(story, locale, { eager = false, sizes = "(max-width: 640px) calc(100vw - 36px), 58vw" } = {}) {
  const baseName = path.basename(story.coverPhoto, path.extname(story.coverPhoto));
  const webpBase = `/assets/story/webp/${baseName}`;
  const loading = eager ? "eager" : "lazy";
  const aspectStyle = `aspect-ratio:${story.width} / ${story.height}`;
  return `<picture style="${aspectStyle}">
            <source type="image/webp" srcset="${webpBase}-960.webp 960w, ${webpBase}-large.webp ${Math.min(story.width, 1600)}w" sizes="${esc(sizes)}">
            <img src="${story.coverPhoto}" width="${story.width}" height="${story.height}" style="${aspectStyle}" loading="${loading}"${eager ? ' fetchpriority="high"' : ""} decoding="async" alt="${esc(text(story.alt, locale))}">
          </picture>`;
}

function photoTile(photo, locale, index = 1, className = "", group = "archive", sizes) {
  const places = photo.places.map((id) => placeById.get(id)).filter(Boolean);
  const meta = [places.map((place) => text(place.name, locale)).join(", "), photo.year].filter(Boolean).join(" · ");
  return `<a class="photo-tile is-visible ${className}" href="${photoHref(locale, photo)}" data-lightbox-item data-lightbox-group="${esc(group)}" data-photo-id="${photo.id}" data-full-src="${photo.source}" data-title="${esc(text(photo.title, locale))}" data-caption="${esc(text(photo.description, locale))}" data-meta="${esc(meta)}">
          <figure>${pictureMarkup(photo, locale, { eager: index === 0, ...(sizes ? { sizes } : {}) })}</figure>
        </a>`;
}

function lightboxMarkup(locale) {
  const l = labels[locale];
  return `
    <dialog class="lightbox archive-lightbox" id="lightbox" aria-labelledby="lightboxTitle" aria-describedby="lightboxMeta">
      <button class="lightbox-close" type="button" data-lightbox-close aria-label="${l.close}">×</button>
      <button class="lightbox-control lightbox-prev" type="button" data-lightbox-prev aria-label="${l.previous}">‹</button>
      <div class="lightbox-media"><img data-lightbox-image decoding="async" alt=""></div>
      <button class="lightbox-control lightbox-next" type="button" data-lightbox-next aria-label="${l.next}">›</button>
      <div class="lightbox-info"><h2 id="lightboxTitle" data-lightbox-title></h2><p id="lightboxMeta" data-lightbox-meta></p><p data-lightbox-caption></p></div>
    </dialog>`;
}

function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${site.origin}/#yinyu-zhu`,
    name: "Yinyu Zhu",
    alternateName: "朱垠宇",
    url: `${site.origin}/`,
    sameAs: site.author.socials.map((item) => item.href)
  };
}

function homePage(locale) {
  const l = labels[locale];
  const home = site.home[locale];
  const homePhotoIds = ["landscape-15", "city-03", "city-09", "street-26", "abstract-05", "abstract-12", "street-19", "city-17", "landscape-02"];
  const selected = homePhotoIds.map((id) => photoById.get(id)).filter(Boolean);
  const frames = selected.map((photo, index) => `<a class="home-frame home-frame-${["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"][index]}" href="${photoHref(locale, photo)}" aria-label="${esc(text(photo.title, locale))}">${pictureMarkup(photo, locale, { sizes: index % 3 === 0 ? "(max-width: 620px) 70vw, 55vw" : "(max-width: 620px) 45vw, 30vw", eager: index === 0, decorative: true })}</a>`).join("\n        ");
  const description = home.intro;
  return pageShell({
    locale,
    type: "home",
    title: locale === "zh" ? "Yinyu Zhu Photography｜朱垠宇摄影" : "Yinyu Zhu Photography Archive",
    description,
    image: selected[0]?.source,
    imageAlt: text(selected[0]?.alt, locale),
    jsonLd: [personJsonLd(), {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${site.origin}/#website`,
      url: `${site.origin}/`,
      name: "Yinyu Zhu Photography",
      alternateName: "朱垠宇摄影",
      inLanguage: ["zh-CN", "en"]
    }],
    main: `    <main class="home-main" id="main-content" tabindex="-1">
      <h1 class="sr-only">Yinyu Zhu Photography｜朱垠宇摄影</h1>
      <section class="home-collage" aria-label="${locale === "zh" ? "精选摄影作品" : "Selected photography"}">${frames}</section>
      <section class="home-statement" aria-labelledby="homeStatementTitle">
        <p class="eyebrow">${home.eyebrow}</p>
        <h2 id="homeStatementTitle">${home.title}</h2>
        <div class="home-statement-copy"><p>${home.intro}</p><a class="home-text-link" href="${route(locale, "work")}"><span>${l.viewAll}</span><span aria-hidden="true">↗</span></a></div>
      </section>
    </main>`
  });
}

function workPage(locale) {
  const l = labels[locale];
  const selected = content.photos.filter((photo) => photo.featured);
  const intro = locale === "zh" ? "在移动、停留与观看之间，选出一些安静但重要的瞬间。" : "A quiet edit of people, places, and fragments collected across movement and stillness.";
  return pageShell({
    locale,
    type: "work",
    title: locale === "zh" ? "作品 | Yinyu Zhu Photography" : "Works | Yinyu Zhu Photography",
    description: intro,
    image: selected[0]?.source,
    imageAlt: text(selected[0]?.alt, locale),
    scripts: ["/assets/archive-interactions.js?v=archive-v2"],
    main: `    <main class="content-page work-page works-page" id="main-content" tabindex="-1">
      <section class="works-heading" aria-labelledby="worksTitle"><h1 class="section-page-title" id="worksTitle">${l.work}</h1><nav class="works-tabs" aria-label="${l.work}"><a class="is-active" href="${route(locale, "work")}" aria-current="page">${l.selected}</a><a href="${route(locale, "series")}">${l.series}</a><a href="${route(locale, "work", "archive")}">${l.index}</a></nav><p class="works-intro">${intro}</p></section>
      <section class="work-gallery" aria-label="${locale === "zh" ? "精选摄影作品" : "Selected photography"}"><div class="photo-wall selected-wall">${selected.map((photo, index) => photoTile(photo, locale, index, "", "selected")).join("\n")}</div></section>
    </main>${lightboxMarkup(locale)}`
  });
}

function workIndexPage(locale) {
  const l = labels[locale];
  const intro = locale === "zh" ? `按档案编号浏览全部 ${content.photos.length} 张作品。` : `Browse all ${content.photos.length} photographs in archive order.`;
  const mobileIndexSize = "(max-width: 620px) 44vw, (max-width: 900px) 50vw, 33vw";
  return pageShell({
    locale,
    type: "work",
    slug: "archive",
    title: locale === "zh" ? "作品索引 | Yinyu Zhu Photography" : "Work Index | Yinyu Zhu Photography",
    description: intro,
    image: content.photos[0]?.source,
    imageAlt: text(content.photos[0]?.alt, locale),
    scripts: ["/assets/archive-interactions.js?v=archive-v2"],
    main: `    <main class="content-page work-page works-page" id="main-content" tabindex="-1">
      <section class="works-heading" aria-labelledby="archiveIndexTitle"><h1 class="section-page-title" id="archiveIndexTitle">${l.index}</h1><nav class="works-tabs" aria-label="${l.work}"><a href="${route(locale, "work")}">${l.selected}</a><a href="${route(locale, "series")}">${l.series}</a><a class="is-active" href="${route(locale, "work", "archive")}" aria-current="page">${l.index}</a></nav><p class="works-intro">${intro}</p></section>
      <section class="work-gallery" aria-label="${locale === "zh" ? "全部摄影作品" : "All photography"}"><div class="photo-wall index-wall">${content.photos.map((photo, index) => photoTile(photo, locale, index, "", "index", mobileIndexSize)).join("\n")}</div></section>
    </main>${lightboxMarkup(locale)}`
  });
}

function seriesIndexPage(locale) {
  const l = labels[locale];
  const intro = locale === "zh" ? "以观看主题整理的摄影章节，一张照片可以同时进入多个系列。" : "Photographic chapters organized by ways of seeing. A photograph may belong to more than one series.";
  const cards = content.series.map((entry, index) => {
    const cover = photoById.get(entry.coverPhoto);
    return `<a class="series-card" href="${route(locale, "series", entry.slug)}">${pictureMarkup(cover, locale, { eager: index === 0, decorative: true, sizes: "(max-width: 620px) calc(100vw - 36px), 50vw" })}<span class="series-card-copy"><strong>${esc(text(entry.title, locale))}</strong><span>${esc(text(entry.description, locale))}</span></span></a>`;
  }).join("\n");
  return pageShell({
    locale,
    type: "series",
    title: locale === "zh" ? "摄影系列 | Yinyu Zhu Photography" : "Series | Yinyu Zhu Photography",
    description: intro,
    image: photoById.get(content.series[0]?.coverPhoto)?.source,
    main: `    <main class="content-page work-page works-page" id="main-content" tabindex="-1"><section class="works-heading"><h1 class="section-page-title">${l.series}</h1><nav class="works-tabs" aria-label="${l.work}"><a href="${route(locale, "work")}">${l.selected}</a><a class="is-active" href="${route(locale, "series")}" aria-current="page">${l.series}</a><a href="${route(locale, "work", "archive")}">${l.index}</a></nav><p class="works-intro">${intro}</p></section><section class="series-view"><div class="series-grid">${cards}</div></section></main>`
  });
}

function seriesDetailPage(locale, entry) {
  const l = labels[locale];
  const photos = entry.photoIds.map((id) => photoById.get(id)).filter(Boolean);
  const cover = photoById.get(entry.coverPhoto) || photos[0];
  return pageShell({
    locale,
    type: "series",
    slug: entry.slug,
    title: `${text(entry.title, locale)} | Yinyu Zhu Photography`,
    description: text(entry.description, locale),
    image: cover?.source,
    imageAlt: text(cover?.alt, locale),
    scripts: ["/assets/archive-interactions.js?v=archive-v2"],
    main: `    <main class="content-page work-page works-page" id="main-content" tabindex="-1"><section class="works-heading"><p class="eyebrow"><a href="${route(locale, "series")}">${l.allSeries}</a></p><h1 class="section-page-title">${esc(text(entry.title, locale))}</h1><p class="works-intro">${esc(text(entry.description, locale))}</p></section><section class="work-gallery"><div class="photo-wall">${photos.map((photo, index) => photoTile(photo, locale, index, "", `series-${entry.id}`, "(max-width: 620px) 44vw, (max-width: 900px) 50vw, 33vw")).join("\n")}</div></section></main>${lightboxMarkup(locale)}`
  });
}

function placesIndexPage(locale) {
  const l = labels[locale];
  const places = content.places;
  const firstCover = photoById.get(places[0]?.coverPhoto);
  const markers = places.map((place) => {
    const left = ((place.coordinates.longitude + 180) / 360) * 100;
    const top = ((90 - place.coordinates.latitude) / 180) * 100;
    const placeName = text(place.name, locale);
    const placeCountry = text(place.country, locale);
    const markerLabel = locale === "zh" ? `查看${placeName}的摄影作品` : `View photographs from ${placeName}`;
    return `<a class="archive-map-marker" href="${route(locale, "places", place.slug)}" style="--marker-x:${left.toFixed(3)}%;--marker-y:${top.toFixed(3)}%" aria-label="${esc(markerLabel)}" title="${esc(placeName)} · ${esc(placeCountry)}"><span aria-hidden="true"></span></a>`;
  }).join("\n");
  const list = places.map((place) => `<li><a href="${route(locale, "places", place.slug)}"><span>${esc(text(place.name, locale))}</span><small>${esc(text(place.country, locale))}</small></a></li>`).join("\n");
  return pageShell({
    locale,
    type: "places",
    title: locale === "zh" ? "拍摄地点 | Yinyu Zhu Photography" : "Photographed Places | Yinyu Zhu Photography",
    description: locale === "zh" ? `朱垠宇摄影档案中的 ${places.length} 个拍摄地点。` : `${places.length} photographed places in the Yinyu Zhu Photography archive.`,
    image: firstCover?.source,
    scripts: ["/assets/archive-map.js?v=archive-v2"],
    main: `    <main id="main-content" tabindex="-1"><section class="atlas-hero archive-atlas" aria-labelledby="placesTitle"><h1 class="sr-only" id="placesTitle">${l.photographedPlaces}</h1><div class="map-stage"><canvas id="worldMapCanvas" class="world-map-canvas" aria-hidden="true"></canvas><div class="archive-marker-layer">${markers}</div></div><div class="atlas-meta"><strong>${places.length}</strong><span>${l.photographedPlaces}</span></div></section><section class="places-directory" aria-labelledby="placesDirectoryTitle"><div class="gallery-section-header"><h2 id="placesDirectoryTitle">${l.photographedPlaces}</h2><p>${places.length}</p></div><ul>${list}</ul></section></main>`
  });
}

function placeDetailPage(locale, place) {
  const l = labels[locale];
  const photos = place.photoIds.map((id) => photoById.get(id)).filter(Boolean);
  const cover = photoById.get(place.coverPhoto) || photos[0];
  const titleText = text(place.name, locale);
  const description = locale === "zh" ? `${titleText}的摄影作品，收录于朱垠宇摄影档案。` : `Photographs from ${titleText} in the Yinyu Zhu Photography archive.`;
  return pageShell({
    locale,
    type: "places",
    slug: place.slug,
    title: `${titleText}${locale === "zh" ? "摄影" : " Photography"} | Yinyu Zhu Photography`,
    description,
    image: cover?.source,
    imageAlt: text(cover?.alt, locale),
    scripts: ["/assets/archive-interactions.js?v=archive-v2"],
    main: `    <main class="content-page work-page works-page" id="main-content" tabindex="-1"><section class="works-heading"><p class="eyebrow"><a href="${route(locale, "places")}">${l.allPlaces}</a></p><h1 class="section-page-title">${esc(titleText)}</h1><p class="works-intro">${esc(text(place.country, locale))} · ${photos.length} ${l.photos}</p></section><section class="work-gallery"><div class="photo-wall">${photos.map((photo, index) => photoTile(photo, locale, index, "", `place-${place.id}`, "(max-width: 620px) 44vw, (max-width: 900px) 50vw, 33vw")).join("\n")}</div></section></main>${lightboxMarkup(locale)}`
  });
}

function storiesIndexPage(locale) {
  const l = labels[locale];
  const entries = content.stories.map((story, index) => `<article class="story-index-entry"><a class="story-index-image" href="${route(locale, "stories", story.slug)}">${storyPictureMarkup(story, locale, { eager: index === 0, sizes: "(max-width: 640px) calc(100vw - 36px), 38vw" })}</a><div><p class="eyebrow">${l.story} ${story.archiveNumber}</p><p>${esc(story.excerpt[locale])}…</p><a class="home-text-link" href="${route(locale, "stories", story.slug)}">${locale === "zh" ? "阅读故事" : "Read story"}<span aria-hidden="true">↗</span></a></div></article>`).join("\n");
  const first = content.stories[0];
  return pageShell({
    locale,
    type: "stories",
    title: locale === "zh" ? "故事 | Yinyu Zhu Photography" : "Stories | Yinyu Zhu Photography",
    description: locale === "zh" ? "朱垠宇摄影作品背后的文字与观看。" : "Writing and observations behind selected photographs by Yinyu Zhu.",
    image: first?.coverPhoto,
    imageAlt: text(first?.alt, locale),
    main: `    <main class="content-page story-page story-index-page" id="main-content" tabindex="-1"><header class="story-index-header"><h1 class="section-page-title">${l.stories}</h1></header><section class="story-index-list">${entries}</section></main>`
  });
}

function storyDetailPage(locale, story) {
  const l = labels[locale];
  const label = `${l.story} ${story.archiveNumber}`;
  const description = story.excerpt[locale];
  return pageShell({
    locale,
    type: "stories",
    slug: story.slug,
    title: `${label} | Yinyu Zhu Photography`,
    description,
    image: story.coverPhoto,
    imageAlt: text(story.alt, locale),
    ogType: "article",
    jsonLd: [{
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "@id": absolute(route(locale, "stories", story.slug)),
      name: label,
      description,
      image: absolute(story.coverPhoto),
      creator: { "@id": `${site.origin}/#yinyu-zhu` },
      inLanguage: locale === "zh" ? "zh-CN" : "en"
    }],
    main: `    <main class="content-page story-page story-detail-page" id="main-content" tabindex="-1"><article class="story-article"><header class="story-detail-header"><p class="eyebrow"><a href="${route(locale, "stories")}">${l.allStories}</a></p><h1 class="section-page-title">${label}</h1></header><figure class="story-photo story-photo-feature">${storyPictureMarkup(story, locale, { eager: true })}<figcaption>${esc(text(story.alt, locale))}</figcaption></figure><div class="story-caption"><p>${esc(story.body[locale])}</p></div></article></main>`
  });
}

function aboutPage(locale) {
  const l = labels[locale];
  const paragraphs = site.about[locale].map((paragraph) => `<p>${esc(paragraph)}</p>`).join("\n          ");
  const contactRows = [
    site.author.email ? `<div><dt>${l.email}</dt><dd><a href="mailto:${site.author.email}">${site.author.email}</a></dd></div>` : "",
    site.author.wechat ? `<div><dt>${l.wechat}</dt><dd><strong>${esc(site.author.wechat)}</strong></dd></div>` : ""
  ].filter(Boolean).join("\n");
  return pageShell({
    locale,
    type: "about",
    title: locale === "zh" ? "关于朱垠宇 | Yinyu Zhu Photography" : "About Yinyu Zhu | Yinyu Zhu Photography",
    description: site.about[locale][0],
    image: "/assets/home/home-landscape.jpg",
    jsonLd: [personJsonLd()],
    main: `    <main class="about-minimal" id="main-content" tabindex="-1"><section class="about-minimal-content"><div class="about-minimal-section"><h1 class="section-page-title">${l.about}</h1>${paragraphs}</div><div class="about-minimal-section contact-panel" id="contact"><h2 class="about-minimal-title">${l.contact}</h2><dl class="contact-list">${contactRows}</dl><nav class="mobile-social-links" aria-label="${locale === "zh" ? "社交账号" : "Social profiles"}">${site.author.socials.map((social) => `<a href="${esc(social.href)}" target="_blank" rel="noopener noreferrer">${esc(social.label)}</a>`).join("")}</nav></div><div class="about-minimal-section rights-summary"><h2 class="about-minimal-title">${l.rights}</h2><p>${esc(site.rights[locale][0])}</p><p><a class="home-text-link" href="${route(locale, "rights")}">${l.imageRights}<span aria-hidden="true">↗</span></a></p></div></section></main>`
  });
}

function rightsPage(locale) {
  const l = labels[locale];
  return pageShell({
    locale,
    type: "rights",
    title: locale === "zh" ? "图片版权与授权 | Yinyu Zhu Photography" : "Image Rights and Licensing | Yinyu Zhu Photography",
    description: site.rights[locale][0],
    image: "/assets/home/home-landscape.jpg",
    main: `    <main class="about-minimal rights-page" id="main-content" tabindex="-1"><section class="about-minimal-content"><div class="about-minimal-section copyright-section"><h1 class="section-page-title">${l.rights}</h1>${site.rights[locale].map((paragraph) => `<p>${esc(paragraph)}</p>`).join("\n")}<p>${locale === "zh" ? "如需商业授权，请提前取得书面许可：" : "For commercial licensing, please obtain written permission in advance:"} <a href="mailto:${site.author.email}">${site.author.email}</a></p></div></section></main>`
  });
}

function photoDetailPage(locale, photo, index) {
  const l = labels[locale];
  const places = photo.places.map((id) => placeById.get(id)).filter(Boolean);
  const relatedSeries = photo.series.map((id) => seriesById.get(id)).filter(Boolean);
  const previous = content.photos[(index - 1 + content.photos.length) % content.photos.length];
  const next = content.photos[(index + 1) % content.photos.length];
  const metadata = [
    ...places.map((place) => `<a href="${route(locale, "places", place.slug)}">${esc(text(place.name, locale))}</a>`),
    photo.year ? `<span>${photo.year}</span>` : "",
    ...relatedSeries.map((entry) => `<a href="${route(locale, "series", entry.slug)}">${esc(text(entry.title, locale))}</a>`)
  ].filter(Boolean).join("<span aria-hidden=\"true\"> · </span>");
  const titleText = text(photo.title, locale);
  const description = text(photo.description, locale) || titleText;
  const canonicalPath = route(locale, "work", photo.slug);
  return pageShell({
    locale,
    type: "work",
    slug: photo.slug,
    title: `${titleText} | Yinyu Zhu Photography`,
    description,
    image: photo.source,
    imageAlt: text(photo.alt, locale),
    ogType: "article",
    jsonLd: [{
      "@context": "https://schema.org",
      "@type": "ImageObject",
      "@id": absolute(canonicalPath),
      name: titleText,
      description,
      contentUrl: absolute(photo.source),
      creator: { "@id": `${site.origin}/#yinyu-zhu` },
      copyrightNotice: "© Yinyu Zhu",
      creditText: "Yinyu Zhu Photography",
      license: absolute(route(locale, "rights")),
      acquireLicensePage: `${absolute(route(locale, "about"))}#contact`,
      inLanguage: locale === "zh" ? "zh-CN" : "en"
    }],
    main: `    <main class="photo-detail-page" id="main-content" tabindex="-1"><article class="photo-detail"><header><p class="eyebrow"><a href="${route(locale, "work")}">${l.work}</a></p><h1>${esc(titleText)}</h1><p class="photo-detail-meta">${metadata}</p></header><figure>${pictureMarkup(photo, locale, { eager: true, sizes: "(max-width: 760px) 70vw, 78vw" })}<figcaption>${esc(description)}</figcaption></figure><p class="photo-copyright">${photo.copyright}</p><nav class="photo-pagination" aria-label="${locale === "zh" ? "相邻作品" : "Adjacent works"}"><a rel="prev" href="${photoHref(locale, previous)}"><span>${l.previous}</span><strong>${esc(text(previous.title, locale))}</strong></a><a rel="next" href="${photoHref(locale, next)}"><span>${l.next}</span><strong>${esc(text(next.title, locale))}</strong></a></nav></article></main>`
  });
}

function notFoundPage(locale = "zh") {
  const prefix = localePrefix(locale);
  return `<!DOCTYPE html><html lang="${locale === "zh" ? "zh-CN" : "en"}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>404 | Yinyu Zhu Photography</title><link rel="stylesheet" href="/styles.css?v=archive-v2"></head><body><main class="not-found-page"><p class="eyebrow">404</p><h1>${locale === "zh" ? "页面不存在" : "Page not found"}</h1><p><a class="home-text-link" href="${prefix || "/"}">${locale === "zh" ? "返回首页" : "Return home"}<span aria-hidden="true">↗</span></a></p><p><a href="${prefix}/work">${labels[locale].work}</a></p></main></body></html>\n`;
}

for (const locale of ["zh", "en"]) {
  await writeRoute(route(locale, "home"), homePage(locale));
  await writeRoute(route(locale, "work"), workPage(locale));
  await writeRoute(route(locale, "work", "archive"), workIndexPage(locale));
  await writeRoute(route(locale, "series"), seriesIndexPage(locale));
  await writeRoute(route(locale, "places"), placesIndexPage(locale));
  await writeRoute(route(locale, "stories"), storiesIndexPage(locale));
  await writeRoute(route(locale, "about"), aboutPage(locale));
  await writeRoute(route(locale, "rights"), rightsPage(locale));
  for (const [index, photo] of content.photos.entries()) await writeRoute(route(locale, "work", photo.slug), photoDetailPage(locale, photo, index));
  for (const entry of content.series) await writeRoute(route(locale, "series", entry.slug), seriesDetailPage(locale, entry));
  for (const place of content.places) await writeRoute(route(locale, "places", place.slug), placeDetailPage(locale, place));
  for (const story of content.stories) await writeRoute(route(locale, "stories", story.slug), storyDetailPage(locale, story));
}

await fs.writeFile(path.join(outputRoot, "404.html"), notFoundPage("zh"));

const allRoutes = [];
for (const locale of ["zh", "en"]) {
  for (const type of ["home", "work", "series", "places", "stories", "about", "rights"]) allRoutes.push({ path: route(locale, type), image: null });
  allRoutes.push({ path: route(locale, "work", "archive"), image: null });
  for (const photo of content.photos) allRoutes.push({ path: route(locale, "work", photo.slug), image: photo.source });
  for (const entry of content.series) allRoutes.push({ path: route(locale, "series", entry.slug), image: photoById.get(entry.coverPhoto)?.source });
  for (const place of content.places) allRoutes.push({ path: route(locale, "places", place.slug), image: photoById.get(place.coverPhoto)?.source });
  for (const story of content.stories) allRoutes.push({ path: route(locale, "stories", story.slug), image: story.coverPhoto });
}

const sitemapRows = allRoutes.map((entry) => `  <url>\n    <loc>${esc(absolute(entry.path))}</loc>\n    <lastmod>${site.buildDate}</lastmod>${entry.image ? `\n    <image:image><image:loc>${esc(absolute(entry.image))}</image:loc></image:image>` : ""}\n  </url>`).join("\n");
await fs.writeFile(path.join(outputRoot, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${sitemapRows}\n</urlset>\n`);
await fs.writeFile(path.join(outputRoot, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${site.origin}/sitemap.xml\n`);
await fs.writeFile(path.join(outputRoot, "_redirects"), `/story /stories 301\n/en/story /en/stories 301\n/story.html /stories 301\n/work.html /work 301\n/places.html /places 301\n/about.html /about 301\n`);
await fs.writeFile(path.join(outputRoot, "_headers"), `/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n\n/assets/generated/*\n  Cache-Control: public, max-age=31536000, immutable\n`);

const manifest = {
  generatedAt: new Date().toISOString(),
  outputRoot: path.relative(projectRoot, outputRoot),
  routes: allRoutes.length,
  photos: content.photos.length,
  places: content.places.length,
  series: content.series.length,
  stories: content.stories.length,
  imageBuild
};
await fs.writeFile(path.join(outputRoot, "build-manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(JSON.stringify(manifest, null, 2));

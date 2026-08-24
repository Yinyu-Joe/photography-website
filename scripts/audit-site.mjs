import fs from "node:fs/promises";
import path from "node:path";
import { buildContentModel, projectRoot } from "./lib/content-model.mjs";

const outputRoot = path.join(projectRoot, "_site");
const content = await buildContentModel();
const failures = [];
const stats = {
  htmlPages: 0,
  indexablePages: 0,
  internalLinks: 0,
  imageReferences: 0,
  contentPhotos: content.photos.length,
  contentPlaces: content.places.length,
  contentSeries: content.series.length,
  contentStories: content.stories.length,
  interactiveMapMarkers: 0
};

function fail(category, detail) {
  failures.push({ category, detail });
}

async function exists(file) {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(target));
    else files.push(target);
  }
  return files;
}

function duplicateValues(values) {
  const seen = new Set();
  const duplicates = new Set();
  for (const value of values) {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }
  return [...duplicates];
}

for (const [label, entities] of [["photo", content.photos], ["place", content.places], ["series", content.series], ["story", content.stories]]) {
  for (const field of ["id", "slug"]) {
    for (const duplicate of duplicateValues(entities.map((entry) => entry[field]))) fail("content", `duplicate ${label} ${field}: ${duplicate}`);
  }
}

const photoIds = new Set(content.photos.map((photo) => photo.id));
const placeIds = new Set(content.places.map((place) => place.id));
for (const photo of content.photos) {
  if (!photo.slug) fail("content", `empty photo slug: ${photo.id}`);
  if (!photo.width || !photo.height) fail("content", `missing dimensions: ${photo.id}`);
  for (const placeId of photo.places) if (!placeIds.has(placeId)) fail("content", `photo ${photo.id} references missing place ${placeId}`);
  for (const file of [photo.source, photo.thumb]) if (!await exists(path.join(projectRoot, file.replace(/^\//, "")))) fail("content", `missing source asset: ${file}`);
}
for (const place of content.places) {
  if (!photoIds.has(place.coverPhoto)) fail("content", `place ${place.id} has missing cover ${place.coverPhoto}`);
  for (const photoId of place.photoIds) if (!photoIds.has(photoId)) fail("content", `place ${place.id} references missing photo ${photoId}`);
}
for (const entry of content.series) {
  if (!photoIds.has(entry.coverPhoto)) fail("content", `series ${entry.id} has missing cover ${entry.coverPhoto}`);
  for (const photoId of entry.photoIds) if (!photoIds.has(photoId)) fail("content", `series ${entry.id} references missing photo ${photoId}`);
  for (const placeId of entry.placeIds) if (!placeIds.has(placeId)) fail("content", `series ${entry.id} references missing place ${placeId}`);
}

const files = await walk(outputRoot);
const htmlFiles = files.filter((file) => file.endsWith(".html"));
stats.htmlPages = htmlFiles.length;
const placeholderPattern = /your_wechat_id|TODO_CONTACT|example@example\.com|\bYOUR_[A-Z_]+\b|\bPLACEHOLDER\b/i;

function routeFile(href) {
  const clean = href.split(/[?#]/)[0];
  if (clean === "/") return path.join(outputRoot, "index.html");
  if (path.extname(clean)) return path.join(outputRoot, clean.replace(/^\//, ""));
  return path.join(outputRoot, `${clean.replace(/^\//, "")}.html`);
}

for (const file of htmlFiles) {
  const relative = path.relative(outputRoot, file);
  const html = await fs.readFile(file, "utf8");
  const is404 = relative === "404.html";
  if (placeholderPattern.test(html)) fail("placeholder", relative);
  if (/id="placeCount"[^>]*>0</i.test(html) || />0<\/[^>]+>\s*<[^>]+>\s*(地点|photo places)/i.test(html)) fail("places-count", relative);

  const h1Count = (html.match(/<h1\b/gi) ?? []).length;
  if (h1Count !== 1) fail("heading", `${relative}: expected 1 h1, found ${h1Count}`);

  const mainClasses = html.match(/<main\b[^>]*\bclass="([^"]*)"/i)?.[1]?.split(/\s+/) ?? [];
  if (mainClasses.includes("works-page") && !mainClasses.includes("content-page")) {
    fail("layout", `${relative}: works-page missing content-page layout class`);
  }

  const isSeriesPage = relative === "series.html"
    || relative === path.join("en", "series.html")
    || relative.startsWith(`series${path.sep}`)
    || relative.startsWith(path.join("en", "series") + path.sep);
  if (isSeriesPage && !/<nav class="main-nav"[^>]*>[\s\S]*?<a href="(?:\/en)?\/work" aria-current="page">/i.test(html)) {
    fail("navigation", `${relative}: series page must keep Work active in the main navigation`);
  }

  if (relative === "series.html" || relative === path.join("en", "series.html")) {
    const seriesHref = relative.startsWith(`en${path.sep}`) ? "/en/series" : "/series";
    const activeSeriesPattern = new RegExp(`<nav class="works-tabs"[^>]*>[\\s\\S]*?<a class="is-active" href="${seriesHref}" aria-current="page">`, "i");
    if (!activeSeriesPattern.test(html)) {
      fail("navigation", `${relative}: missing active Series tab in the Works navigation`);
    }
  }

  if (relative === "places.html" || relative === path.join("en", "places.html")) {
    const markerLinks = [...html.matchAll(/<a\b[^>]*\bclass="[^"]*\barchive-map-marker\b[^"]*"[^>]*\bhref="([^"]+)"/gi)];
    stats.interactiveMapMarkers += markerLinks.length;
    if (markerLinks.length !== content.places.length) {
      fail("interaction", `${relative}: expected ${content.places.length} interactive map markers, found ${markerLinks.length}`);
    }
  }

  if (!is404) {
    stats.indexablePages += 1;
    for (const signal of [
      [/<title>[^<]+<\/title>/i, "title"],
      [/<meta name="description" content="[^"]+">/i, "description"],
      [/<link rel="canonical" href="https:\/\/yinyuzhu\.com\/[^"]*">/i, "canonical"],
      [/<link rel="alternate" hreflang="zh-CN"/i, "hreflang zh-CN"],
      [/<link rel="alternate" hreflang="en"/i, "hreflang en"],
      [/<link rel="alternate" hreflang="x-default"/i, "hreflang x-default"],
      [/<meta property="og:title"/i, "og:title"],
      [/<meta property="og:image"/i, "og:image"],
      [/<meta name="twitter:card"/i, "twitter:card"],
      [/<html lang="(?:zh-CN|en)"/i, "html lang"]
    ]) if (!signal[0].test(html)) fail("seo", `${relative}: missing ${signal[1]}`);
  }

  for (const match of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/gi)) {
    const href = match[1];
    if (/^(?:https?:|mailto:|tel:|#)/.test(href)) continue;
    stats.internalLinks += 1;
    if (!href.startsWith("/")) {
      fail("link", `${relative}: non-root internal href ${href}`);
      continue;
    }
    if (!await exists(routeFile(href))) fail("link", `${relative}: broken ${href}`);
  }

  for (const match of html.matchAll(/<img\b([^>]*)>/gi)) {
    const attributes = match[1];
    if (!/\balt="[^"]*"/i.test(attributes)) fail("image", `${relative}: image missing alt`);
    if (!/data-lightbox-image/i.test(attributes) && (!/\bwidth="\d+"/i.test(attributes) || !/\bheight="\d+"/i.test(attributes))) fail("image", `${relative}: image missing dimensions`);
    const source = attributes.match(/\bsrc="([^"]+)"/i)?.[1];
    if (source?.startsWith("/")) {
      stats.imageReferences += 1;
      if (!await exists(path.join(outputRoot, source.replace(/^\//, "")))) fail("image", `${relative}: missing ${source}`);
    }
  }

  for (const match of html.matchAll(/\bsrcset="([^"]+)"/gi)) {
    for (const candidate of match[1].split(",")) {
      const source = candidate.trim().split(/\s+/)[0];
      if (!source.startsWith("/")) continue;
      stats.imageReferences += 1;
      if (!await exists(path.join(outputRoot, source.replace(/^\//, "")))) fail("image", `${relative}: missing srcset ${source}`);
    }
  }
}

const redirects = await fs.readFile(path.join(outputRoot, "_redirects"), "utf8");
if (!/^\/story \/stories 301$/m.test(redirects)) fail("redirect", "missing /story permanent redirect");

const sitemap = await fs.readFile(path.join(outputRoot, "sitemap.xml"), "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>(https:\/\/yinyuzhu\.com[^<]+)<\/loc>/g)].map((match) => match[1]);
const manifest = JSON.parse(await fs.readFile(path.join(outputRoot, "build-manifest.json"), "utf8"));
if (path.isAbsolute(manifest.outputRoot)) fail("manifest", "build manifest must not expose an absolute local output path");
if (sitemapUrls.length !== manifest.routes) fail("sitemap", `expected ${manifest.routes} URLs, found ${sitemapUrls.length}`);
for (const url of sitemapUrls) {
  const href = new URL(url).pathname;
  if (!await exists(routeFile(href))) fail("sitemap", `dead route ${href}`);
}

const report = {
  status: failures.length ? "FAIL" : "PASS",
  stats,
  failures
};
console.log(JSON.stringify(report, null, 2));
if (failures.length) process.exitCode = 1;

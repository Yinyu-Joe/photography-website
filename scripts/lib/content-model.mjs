import fs from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { site, stories } from "../../content/site-content.mjs";
import { commissions, commissionCases, commissionExtraFrames } from "../../content/commissions.mjs";
import { jpegSize, variantWidthsUpTo } from "./image-pipeline.mjs";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

async function loadLegacyData(files) {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  for (const file of files) {
    const source = await fs.readFile(path.join(projectRoot, file), "utf8");
    vm.runInContext(source, sandbox, { filename: file });
  }
  return sandbox.window;
}

function publicPath(value) {
  if (!value) return null;
  return value.startsWith("/") ? value : `/${value}`;
}

function stablePlaceSlug(id) {
  return id.endsWith("-place") ? id.slice(0, -6) : id;
}

function freezeEntity(entity) {
  return Object.freeze(entity);
}

export async function buildContentModel() {
  const legacy = await loadLegacyData([
    "assets/photos/photo-manifest.js",
    "assets/photos/place-manifest.js",
    "assets/photos/portfolio-data.js",
    "assets/photos/photo-dimensions.js"
  ]);

  const collections = legacy.photoCollections ?? [];
  const placeCollections = legacy.placePhotoCollections ?? [];
  const portfolio = legacy.portfolioData ?? { selectedPhotoIds: [], series: [], indexFilters: [] };
  const dimensions = legacy.photoAssetDimensions ?? {};
  let sourceDimensions = dimensions;
  try {
    sourceDimensions = JSON.parse(await fs.readFile(path.join(projectRoot, "content/photo-source-dimensions.json"), "utf8"));
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
  }
  let photoText = {};
  try {
    photoText = JSON.parse(await fs.readFile(path.join(projectRoot, "content/photo-text.json"), "utf8"));
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
  }
  const knownPhotoIds = new Set(collections.flatMap((collection) => (collection.photos ?? []).map((photo) => photo.id)));
  for (const id of Object.keys(photoText)) {
    if (!id.startsWith("_") && !knownPhotoIds.has(id)) throw new Error(`content/photo-text.json: unknown photo id "${id}"`);
  }
  const writtenText = (id, field, locale) => {
    const value = photoText[id]?.[field]?.[locale];
    return typeof value === "string" ? value.trim() : "";
  };
  const selectedIds = new Set(portfolio.selectedPhotoIds ?? []);
  const fullSourceToPlace = new Map();

  for (const place of placeCollections) {
    for (const photo of place.photos ?? []) {
      fullSourceToPlace.set(publicPath(photo.fullSrc), place.id);
    }
  }

  const photoRows = collections.flatMap((collection) =>
    (collection.photos ?? []).map((photo, index) => ({ photo, collection, index }))
  );
  const fullSourceToPhotoId = new Map(
    photoRows.map(({ photo }) => [publicPath(photo.fullSrc), photo.id])
  );

  const photos = photoRows.map(({ photo, collection }, index) => {
    const [width, height] = sourceDimensions[photo.id] ?? dimensions[photo.id] ?? [];
    const series = (portfolio.series ?? [])
      .filter((entry) => entry.photoIds.includes(photo.id))
      .map((entry) => entry.id);
    const placeId = fullSourceToPlace.get(publicPath(photo.fullSrc));
    return freezeEntity({
      id: photo.id,
      slug: photo.id,
      source: publicPath(photo.fullSrc),
      thumb: publicPath(photo.thumbSrc),
      width: width ?? null,
      height: height ?? null,
      aspectRatio: width && height ? width / height : null,
      alt: { zh: writtenText(photo.id, "title", "zh") || photo.title.zh, en: writtenText(photo.id, "title", "en") || photo.title.en },
      title: { zh: writtenText(photo.id, "title", "zh") || photo.title.zh, en: writtenText(photo.id, "title", "en") || photo.title.en },
      description: { ...photo.caption },
      writtenCaption: { zh: writtenText(photo.id, "caption", "zh") || null, en: writtenText(photo.id, "caption", "en") || null },
      category: collection.id,
      series,
      places: placeId ? [placeId] : [],
      date: null,
      year: photo.year || null,
      featured: selectedIds.has(photo.id),
      indexOrder: index,
      copyright: "© Yinyu Zhu"
    });
  });

  const photoById = new Map(photos.map((photo) => [photo.id, photo]));

  const places = placeCollections.map((place) => {
    const photoIds = (place.photos ?? [])
      .map((photo) => fullSourceToPhotoId.get(publicPath(photo.fullSrc)))
      .filter(Boolean);
    return freezeEntity({
      id: place.id,
      slug: stablePlaceSlug(place.id),
      name: { ...place.name },
      coordinates: { longitude: place.lon, latitude: place.lat },
      country: { ...place.country },
      region: null,
      coverPhoto: photoIds[0] ?? null,
      photoIds,
      description: { zh: null, en: null }
    });
  });

  const series = (portfolio.series ?? []).map((entry) => {
    const placeIds = [...new Set(
      entry.photoIds.flatMap((photoId) => photoById.get(photoId)?.places ?? [])
    )];
    return freezeEntity({
      id: entry.id,
      slug: entry.id,
      title: { ...entry.title },
      description: { ...entry.description },
      coverPhoto: entry.coverPhotoId,
      photoIds: [...entry.photoIds],
      year: null,
      placeIds
    });
  });

  const commissionModel = await buildCommissionModel({ photoById, seriesIds: new Set(series.map((entry) => entry.id)) });

  return Object.freeze({
    site,
    commissions: commissionModel,
    photos: Object.freeze(photos),
    places: Object.freeze(places),
    series: Object.freeze(series),
    stories: Object.freeze(stories.map(freezeEntity)),
    indexFilters: Object.freeze(portfolio.indexFilters ?? []),
    homePhotoIds: Object.freeze([...(portfolio.homePhotoIds ?? [])])
  });
}

// Case photos live in assets/commissions; their ids are the file names without .jpg.
async function buildCommissionModel({ photoById, seriesIds }) {
  const problem = (message) => new Error(`content/commissions.mjs: ${message}`);
  const images = new Map();

  async function loadImage(file) {
    if (typeof file !== "string" || !/\.jpe?g$/i.test(file)) throw problem(`frames must be JPEG file names, found ${JSON.stringify(file)}`);
    const key = path.basename(file, path.extname(file));
    if (images.has(key)) throw problem(`"${file}" is listed more than once`);
    let buffer;
    try {
      buffer = await fs.readFile(path.join(projectRoot, "assets/commissions", file));
    } catch (error) {
      if (error?.code === "ENOENT") throw problem(`assets/commissions/${file} does not exist`);
      throw error;
    }
    const size = jpegSize(buffer);
    if (!size) throw problem(`could not read the size of assets/commissions/${file}`);
    const image = freezeEntity({
      id: `commission-${key}`,
      key,
      source: `/assets/commissions/${file}`,
      width: size.width,
      height: size.height,
      variantWidths: variantWidthsUpTo(size.width)
    });
    images.set(key, image);
    return image;
  }

  const caseIds = new Set();
  const cases = [];
  for (const entry of commissionCases) {
    if (caseIds.has(entry.id)) throw problem(`duplicate case id "${entry.id}"`);
    caseIds.add(entry.id);
    if (!["portrait", "commercial"].includes(entry.kind)) throw problem(`case "${entry.id}" needs kind "portrait" or "commercial"`);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.id ?? "")) throw problem(`case id "${entry.id}" becomes the page address, so use lowercase letters, numbers and hyphens`);
    if (!entry.place?.zh && !entry.title?.zh) throw problem(`case "${entry.id}" needs a place or a title`);
    const draft = entry.draft === true;
    if (!draft && !entry.frames?.length) throw problem(`case "${entry.id}" has no frames`);
    const frames = [];
    for (const file of entry.frames ?? []) frames.push(await loadImage(file));
    // An example case without photos shows grey stand-ins instead (6 unless placeholders says otherwise).
    const placeholders = frames.length ? 0 : entry.placeholders ?? 6;
    cases.push(freezeEntity({ ...entry, draft, frames: Object.freeze(frames), placeholders }));
  }
  for (const file of commissionExtraFrames) await loadImage(file);

  for (const [label, key] of [["landing.cover", commissions.landing.cover], ["portraits.cover", commissions.portraits.cover]]) {
    if (!images.has(key)) throw problem(`${label} "${key}" is not a frame in assets/commissions`);
  }
  for (const id of commissions.landing.archivePhotoIds) if (!photoById.has(id)) throw problem(`landing.archivePhotoIds: unknown photo "${id}"`);
  for (const id of commissions.commercial.archiveSeriesIds) if (!seriesIds.has(id)) throw problem(`commercial.archiveSeriesIds: unknown series "${id}"`);

  return Object.freeze({
    ...commissions,
    cases: Object.freeze(cases),
    images: Object.freeze([...images.values()]),
    imageByKey: images
  });
}

export { projectRoot };

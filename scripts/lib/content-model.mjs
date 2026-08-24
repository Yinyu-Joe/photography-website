import fs from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { site, stories } from "../../content/site-content.mjs";

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
      alt: { ...photo.title },
      title: { ...photo.title },
      description: { ...photo.caption },
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

  return Object.freeze({
    site,
    photos: Object.freeze(photos),
    places: Object.freeze(places),
    series: Object.freeze(series),
    stories: Object.freeze(stories.map(freezeEntity)),
    indexFilters: Object.freeze(portfolio.indexFilters ?? [])
  });
}

export { projectRoot };

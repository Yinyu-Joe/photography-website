import fs from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const run = promisify(execFile);
const widths = [480, 768, 960, 1280, 1600, 2048];
const creator = "Yinyu Zhu";
const rightsNotice = "© Yinyu Zhu. All rights reserved. https://yinyuzhu.com/rights";

async function exists(file) {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

// Walks the header of a JPEG and yields each segment, stopping where the image data begins.
function* jpegSegments(buffer) {
  let offset = 2;
  while (offset + 4 <= buffer.length && buffer[offset] === 0xff) {
    const marker = buffer[offset + 1];
    if (marker === 0xff) {
      offset += 1;
      continue;
    }
    if (marker === 0xda) return;
    const end = offset + 2 + buffer.readUInt16BE(offset + 2);
    yield { marker, start: offset, end };
    offset = end;
  }
}

// EXIF, XMP and Photoshop blocks hold the camera, capture time and editing history.
const privateJpegMarkers = new Set([0xe1, 0xed]);

export function jpegPrivateSegments(buffer) {
  return [...jpegSegments(buffer)].filter((segment) => privateJpegMarkers.has(segment.marker));
}

// Removes those blocks without re-encoding the photo; colour profiles stay in place.
export function removeJpegMetadata(buffer) {
  const notice = Buffer.from(`${creator}. ${rightsNotice}`, "utf8");
  const comment = Buffer.alloc(4);
  comment.writeUInt16BE(0xfffe, 0);
  comment.writeUInt16BE(notice.length + 2, 2);

  const segments = [...jpegSegments(buffer)];
  const parts = [buffer.subarray(0, 2)];
  let cursor = 2;
  if (segments[0]?.marker === 0xe0) {
    parts.push(buffer.subarray(2, segments[0].end));
    cursor = segments[0].end;
  }
  parts.push(comment, notice);
  for (const segment of segments) {
    if (!privateJpegMarkers.has(segment.marker)) continue;
    parts.push(buffer.subarray(cursor, segment.start));
    cursor = segment.end;
  }
  parts.push(buffer.subarray(cursor));
  return Buffer.concat(parts);
}

export async function publishedJpegs(root) {
  const entries = await fs.readdir(root, { recursive: true, withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && /\.jpe?g$/i.test(entry.name))
    .map((entry) => path.join(entry.parentPath, entry.name));
}

export async function stripPublishedJpegs(root) {
  const files = await publishedJpegs(root);
  for (const file of files) {
    await fs.writeFile(file, removeJpegMetadata(await fs.readFile(file)));
  }
  return files.length;
}

export function variantUrl(photo, width, format) {
  return `/assets/generated/photos/${photo.id}-${width}.${format}`;
}

export function availableVariantWidths(photo) {
  return widths.filter((width) => !photo.width || width <= photo.width || width === widths[0]);
}

async function createVariant(source, destination, width, format, temporaryDir) {
  const resized = path.join(temporaryDir, `${path.basename(destination)}.jpg`);
  await run("ffmpeg", [
    "-y",
    "-hide_banner",
    "-loglevel", "error",
    "-i", source,
    "-vf", `scale=${width}:-2`,
    "-map_metadata", "-1",
    "-q:v", "2",
    resized
  ], { maxBuffer: 1024 * 1024 });
  await run("sips", [
    "-s", "artist", creator,
    "-s", "copyright", rightsNotice,
    resized
  ], { maxBuffer: 1024 * 1024 });
  if (format === "webp") {
    await run("cwebp", ["-quiet", "-q", "84", "-metadata", "all", resized, "-o", destination], { maxBuffer: 1024 * 1024 });
  } else {
    await run("sips", ["-s", "format", "avif", "-s", "formatOptions", "64", resized, "--out", destination], { maxBuffer: 1024 * 1024 });
  }
}

export async function buildResponsiveImages(content, projectRoot, outputRoot, { skip = false } = {}) {
  const generatedRoot = path.join(outputRoot, "assets/generated/photos");
  await fs.mkdir(generatedRoot, { recursive: true });
  if (skip) return { generated: 0, reused: 0, skipped: true };

  const temporaryDir = await fs.mkdtemp("/tmp/yinyu-photo-build-");
  let generated = 0;
  let reused = 0;
  try {
    for (const photo of content.photos) {
      const source = path.join(projectRoot, photo.source.replace(/^\//, ""));
      for (const width of availableVariantWidths(photo)) {
        for (const format of ["avif", "webp"]) {
          const destination = path.join(outputRoot, variantUrl(photo, width, format).replace(/^\//, ""));
          if (await exists(destination)) {
            reused += 1;
            continue;
          }
          await createVariant(source, destination, width, format, temporaryDir);
          generated += 1;
        }
      }
    }
  } finally {
    await fs.rm(temporaryDir, { recursive: true, force: true });
  }
  return { generated, reused, skipped: false };
}

import fs from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const run = promisify(execFile);
const widths = [480, 768, 960, 1280, 1600, 2048];

async function exists(file) {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

export function variantUrl(photo, width, format) {
  return `/assets/generated/photos/${photo.id}-${width}.${format}`;
}

export function availableVariantWidths(photo) {
  return widths.filter((width) => !photo.width || width <= photo.width || width === widths[0]);
}

async function createVariant(source, destination, width, format, temporaryDir) {
  const resized = path.join(temporaryDir, `${path.basename(destination)}.jpg`);
  await run("sips", ["--resampleWidth", String(width), source, "--out", resized], { maxBuffer: 1024 * 1024 });
  if (format === "webp") {
    await run("cwebp", ["-quiet", "-q", "84", "-metadata", "none", resized, "-o", destination], { maxBuffer: 1024 * 1024 });
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

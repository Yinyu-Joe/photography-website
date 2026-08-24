import fs from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { buildContentModel, projectRoot } from "./lib/content-model.mjs";

const run = promisify(execFile);
const content = await buildContentModel();
const results = {};
const queue = [...content.photos];
const workerCount = Math.min(8, queue.length);

async function inspect(photo) {
  const file = path.join(projectRoot, photo.source.replace(/^\//, ""));
  const { stdout } = await run("sips", ["-g", "pixelWidth", "-g", "pixelHeight", file]);
  const width = Number(stdout.match(/pixelWidth:\s*(\d+)/)?.[1]);
  const height = Number(stdout.match(/pixelHeight:\s*(\d+)/)?.[1]);
  if (!width || !height) throw new Error(`Unable to read source dimensions: ${photo.source}`);
  results[photo.id] = [width, height];
}

await Promise.all(Array.from({ length: workerCount }, async () => {
  while (queue.length) {
    const photo = queue.shift();
    if (photo) await inspect(photo);
  }
}));

const ordered = Object.fromEntries(content.photos.map((photo) => [photo.id, results[photo.id]]));
const destination = path.join(projectRoot, "content/photo-source-dimensions.json");
await fs.writeFile(destination, `${JSON.stringify(ordered, null, 2)}\n`);
console.log(`Wrote ${Object.keys(ordered).length} source-image dimensions to ${destination}`);

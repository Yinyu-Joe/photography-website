import fs from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { buildContentModel, projectRoot } from "./lib/content-model.mjs";
import { availableVariantWidths, variantUrl } from "./lib/image-pipeline.mjs";

const run = promisify(execFile);
const outputRoot = path.join(projectRoot, "_site");
const content = await buildContentModel();
const photoById = new Map(content.photos.map((photo) => [photo.id, photo]));
const sampleIds = ["city-01", "landscape-15", "street-26", "abstract-05", "city-09"];
const forbiddenPattern = /bodyserialnumber|cameraserialnumber|documentid|instanceid|lightroom|photoshop:datecreated|\bgps\b/i;
const requiredPattern = /Yinyu Zhu[\s\S]*yinyuzhu\.com\/rights|yinyuzhu\.com\/rights[\s\S]*Yinyu Zhu/i;
const failures = [];
const samples = [];

for (const id of sampleIds) {
  const photo = photoById.get(id);
  if (!photo) {
    failures.push(`${id}: missing content entry`);
    continue;
  }
  const width = availableVariantWidths(photo).at(-1);
  for (const format of ["avif", "webp"]) {
    const relative = variantUrl(photo, width, format).replace(/^\//, "");
    const file = path.join(outputRoot, relative);
    try {
      await fs.access(file);
    } catch {
      failures.push(`${relative}: missing generated derivative`);
      continue;
    }
    const [{ stdout: metadata }, { stdout: strings }] = await Promise.all([
      run("sips", ["-g", "pixelWidth", "-g", "pixelHeight", "-g", "creation", "-g", "make", "-g", "model", "-g", "artist", "-g", "copyright", file], { maxBuffer: 1024 * 1024 }),
      run("strings", [file], { maxBuffer: 8 * 1024 * 1024 })
    ]);
    if (forbiddenPattern.test(strings)) failures.push(`${relative}: contains private workflow metadata`);
    if (!requiredPattern.test(strings)) failures.push(`${relative}: missing normalized creator or rights URL`);
    if (!/make: <nil>/i.test(metadata) || !/model: <nil>/i.test(metadata)) failures.push(`${relative}: camera make/model still exposed`);
    samples.push({ id, format, width, bytes: (await fs.stat(file)).size });
  }
}

const report = {
  status: failures.length ? "FAIL" : "PASS",
  samples,
  failures
};

console.log(JSON.stringify(report, null, 2));
if (failures.length) process.exitCode = 1;

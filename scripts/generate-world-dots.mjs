// Builds assets/world-dots.json from Natural Earth land outlines (public domain, naturalearthdata.com).
// Run it again only when the projection or the dot rules change: npm run map:dots
import fs from "node:fs/promises";
import path from "node:path";
import { projectRoot } from "./lib/content-model.mjs";
import { worldMapAspect, worldMapFrame, worldMapX, worldMapY } from "./lib/world-map.mjs";

const sourcePath = path.join(projectRoot, "data/natural-earth/ne_50m_land.geojson");
const outputPath = path.join(projectRoot, "assets/world-dots.json");

// Every dot sits on one fine grid. Each level adds the dots between the previous level's dots,
// so zooming in fills in detail without moving anything already on screen.
// "checker" keeps every other point of the grid, so every level has the same staggered pattern.
const gridWidth = 840;
const gridHeight = gridWidth / worldMapAspect;
const gridOrigin = 2;
const columns = gridWidth - gridOrigin;
const rows = Math.ceil(gridHeight - gridOrigin);
const levels = [
  { step: 4, checker: true },
  { step: 2, checker: true },
  { step: 1, checker: true }
];

// A dot appears when this much of the ground around it is land.
const landShare = 0.38;
// Islands too small for that still get one dot if they cover this much and no other dot is nearby.
const islandShare = 0.08;

// Coastlines are drawn into a bitmap with four samples per fine grid step.
const samples = 4;
const bitmapWidth = gridWidth * samples;
const bitmapHeight = Math.ceil(gridHeight * samples);
const land = new Uint8Array(bitmapWidth * bitmapHeight);

function fillPolygon(rings) {
  const edges = [];
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  for (const ring of rings) {
    for (let index = 0; index < ring.length; index += 1) {
      const [x1, y1] = ring[index];
      const [x2, y2] = ring[(index + 1) % ring.length];
      minX = Math.min(minX, x1);
      maxX = Math.max(maxX, x1);
      minY = Math.min(minY, y1);
      maxY = Math.max(maxY, y1);
      if (y1 === y2) continue;
      edges.push(y1 < y2 ? [y1, y2, x1, (x2 - x1) / (y2 - y1)] : [y2, y1, x2, (x1 - x2) / (y1 - y2)]);
    }
  }
  if (maxX < 0 || minX >= bitmapWidth || maxY < 0 || minY >= bitmapHeight) return;
  edges.sort((a, b) => a[0] - b[0]);
  const firstRow = Math.max(0, Math.ceil(minY - 0.5));
  const lastRow = Math.min(bitmapHeight - 1, Math.floor(maxY - 0.5));
  let next = 0;
  let active = [];
  for (let row = firstRow; row <= lastRow; row += 1) {
    const y = row + 0.5;
    while (next < edges.length && edges[next][0] <= y) active.push(edges[next++]);
    active = active.filter((edge) => edge[1] > y);
    const crossings = active.map((edge) => edge[2] + (y - edge[0]) * edge[3]).sort((a, b) => a - b);
    for (let index = 0; index + 1 < crossings.length; index += 2) {
      const from = Math.max(0, Math.ceil(crossings[index] - 0.5));
      const to = Math.min(bitmapWidth - 1, Math.floor(crossings[index + 1] - 0.5));
      land.fill(1, row * bitmapWidth + from, row * bitmapWidth + to + 1);
    }
  }
}

const geojson = JSON.parse(await fs.readFile(sourcePath, "utf8"));
for (const feature of geojson.features) {
  const { type, coordinates } = feature.geometry;
  const polygons = type === "Polygon" ? [coordinates] : type === "MultiPolygon" ? coordinates : [];
  for (const polygon of polygons) {
    // Draw each shape twice, once shifted a full turn east, so land on both sides of the cut is kept.
    for (const shift of [0, 360]) {
      fillPolygon(polygon.map((ring) => ring.map(([longitude, latitude]) => [
        worldMapX(longitude + shift, { wrap: false }) * bitmapWidth,
        worldMapY(latitude) * gridHeight * samples
      ])));
    }
  }
}

// Running totals make the land share of any window a constant-time lookup.
const totals = new Uint32Array((bitmapWidth + 1) * (bitmapHeight + 1));
for (let y = 0; y < bitmapHeight; y += 1) {
  let rowTotal = 0;
  for (let x = 0; x < bitmapWidth; x += 1) {
    rowTotal += land[y * bitmapWidth + x];
    totals[(y + 1) * (bitmapWidth + 1) + x + 1] = totals[y * (bitmapWidth + 1) + x + 1] + rowTotal;
  }
}

function landAround(column, row, side) {
  const centerX = (gridOrigin + column) * samples;
  const centerY = (gridOrigin + row) * samples;
  const half = (side * samples) / 2;
  const left = Math.max(0, Math.round(centerX - half));
  const right = Math.min(bitmapWidth, Math.round(centerX + half));
  const top = Math.max(0, Math.round(centerY - half));
  const bottom = Math.min(bitmapHeight, Math.round(centerY + half));
  const area = (right - left) * (bottom - top);
  if (!area) return 0;
  const stride = bitmapWidth + 1;
  const sum = totals[bottom * stride + right] - totals[top * stride + right] - totals[bottom * stride + left] + totals[top * stride + left];
  return sum / area;
}

function* latticeRows({ step, checker }) {
  for (let row = 0; row < rows; row += step) {
    const offset = checker && (row / step) % 2 ? step : 0;
    const stride = checker ? step * 2 : step;
    yield { row, offset, stride };
  }
}

const output = [];
for (const level of levels) {
  // Each dot stands for a square of ground with the same area it has to itself on its grid.
  const side = level.checker ? level.step * Math.SQRT2 : level.step;
  const lit = new Uint8Array(columns * rows);
  const islands = [];
  for (const { row, offset, stride } of latticeRows(level)) {
    for (let column = offset; column < columns; column += stride) {
      const share = landAround(column, row, side);
      if (share >= landShare) lit[row * columns + column] = 1;
      else if (share >= islandShare) islands.push({ column, row, share });
    }
  }

  // Largest bits of land first; each one is kept only if nothing nearby is lit already.
  const reach = level.step * 1.5;
  islands.sort((a, b) => b.share - a.share);
  for (const { column, row } of islands) {
    let alone = true;
    for (let y = Math.max(0, Math.ceil(row - reach)); alone && y <= Math.min(rows - 1, row + reach); y += 1) {
      for (let x = Math.max(0, Math.ceil(column - reach)); x <= Math.min(columns - 1, column + reach); x += 1) {
        if (lit[y * columns + x] && Math.hypot(x - column, y - row) <= reach) {
          alone = false;
          break;
        }
      }
    }
    if (alone) lit[row * columns + column] = 1;
  }

  // Each row is stored as alternating gaps and runs of lit dots along that row's points.
  const encodedRows = [];
  let count = 0;
  for (const { row, offset, stride } of latticeRows(level)) {
    const runs = [];
    let position = 0;
    let previousEnd = 0;
    for (let column = offset; column < columns; column += stride, position += 1) {
      if (!lit[row * columns + column]) continue;
      count += 1;
      const last = runs.length - 1;
      if (last >= 0 && previousEnd === position) {
        runs[last] += 1;
      } else {
        runs.push(position - previousEnd, 1);
      }
      previousEnd = position + 1;
    }
    if (runs.length) encodedRows.push([row, ...runs]);
  }
  output.push({ step: level.step, checker: level.checker, count, rows: encodedRows });
}

const result = {
  source: "Natural Earth 1:50m land (public domain), Miller projection",
  frame: worldMapFrame,
  grid: { width: gridWidth, height: Number(gridHeight.toFixed(4)), origin: gridOrigin, columns, rows },
  levels: output
};
await fs.writeFile(outputPath, `${JSON.stringify(result)}\n`);
console.log(`world-dots.json: ${output.map((level) => level.count).join(" / ")} dots, ${(JSON.stringify(result).length / 1024).toFixed(1)} KB`);

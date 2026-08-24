import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import { projectRoot } from "./lib/content-model.mjs";

const baseUrl = process.env.LIGHTHOUSE_BASE_URL || "http://127.0.0.1:4174";
const resultsRoot = path.join(projectRoot, "lighthouse-results");
const pages = [
  ["home", "/"],
  ["work", "/work"],
  ["photo", "/work/city-09"],
  ["places", "/places"],
  ["place", "/places/tokyo"],
  ["story", "/stories/20260130-7c200963"],
  ["about", "/about"]
];

await fs.mkdir(resultsRoot, { recursive: true });

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd: projectRoot, stdio: ["ignore", "pipe", "pipe"] });
    let stderr = "";
    child.stderr.on("data", (chunk) => { stderr += chunk; });
    child.on("error", reject);
    child.on("close", (code) => code === 0 ? resolve() : reject(new Error(stderr || `${command} exited ${code}`)));
  });
}

const summary = [];
for (const [name, pathname] of pages) {
  for (const mode of ["mobile", "desktop"]) {
    const reportPath = path.join(resultsRoot, `${name}-${mode}.json`);
    const args = [
      "--yes",
      "lighthouse",
      `${baseUrl}${pathname}`,
      "--quiet",
      "--output=json",
      `--output-path=${reportPath}`,
      "--only-categories=performance,accessibility,best-practices,seo",
      "--chrome-flags=--headless --no-sandbox"
    ];
    if (mode === "desktop") args.push("--preset=desktop");
    await run("npx", args);
    const report = JSON.parse(await fs.readFile(reportPath, "utf8"));
    summary.push({
      page: name,
      path: pathname,
      mode,
      performance: Math.round(report.categories.performance.score * 100),
      accessibility: Math.round(report.categories.accessibility.score * 100),
      bestPractices: Math.round(report.categories["best-practices"].score * 100),
      seo: Math.round(report.categories.seo.score * 100),
      lcpMs: Math.round(report.audits["largest-contentful-paint"].numericValue),
      cls: Number(report.audits["cumulative-layout-shift"].numericValue.toFixed(3)),
      tbtMs: Math.round(report.audits["total-blocking-time"].numericValue)
    });
  }
}

await fs.writeFile(path.join(resultsRoot, "summary.json"), `${JSON.stringify(summary, null, 2)}\n`);
console.table(summary);

#!/usr/bin/env node
/**
 * Update lighthouserc.json URLs with dynamic routes from Router.tsx
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { extractRoutesFromRouter } from "./extract-routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function updateLighthouseUrls() {
  const configPath = path.join(__dirname, "..", "lighthouserc.json");

  if (!fs.existsSync(configPath)) {
    console.error("lighthouserc.json not found!");
    process.exit(1);
  }

  const configContent = fs.readFileSync(configPath, "utf-8");
  let config;

  try {
    config = JSON.parse(configContent);
  } catch (error) {
    console.error("Error parsing lighthouserc.json:", error.message);
    process.exit(1);
  }

  const routes = extractRoutesFromRouter();
  const baseUrl = "http://localhost:3000";
  const urls = routes.map((route) => `${baseUrl}${route}`);

  if (!config.ci) config.ci = {};
  if (!config.ci.collect) config.ci.collect = {};

  config.ci.collect.url = urls;

  fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + "\n");

  console.log(`Updated lighthouserc.json URLs with routes: ${urls.join(", ")}`);
  console.log(`Routes extracted from Router.tsx: ${routes.join(", ")}`);

  return config;
}

function main() {
  const mode = process.argv[2] || "update";

  if (mode === "generate") {
    const routes = extractRoutesFromRouter();
    const baseUrl = "http://localhost:3000";
    const urls = routes.map((route) => `${baseUrl}${route}`);

    console.log(JSON.stringify(urls, null, 2));
  } else if (mode === "update") {
    updateLighthouseUrls();
  } else if (mode === "routes") {
    const routes = extractRoutesFromRouter();

    console.log("Routes found in Router.tsx:", routes.join(", "));
  }
}

main();

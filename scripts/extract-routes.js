#!/usr/bin/env node
/**
 * Extract routes from React Router configuration for testing
 * This script parses the Router.tsx file and outputs all defined routes
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function extractRoutesFromRouter() {
  const routerPath = path.join(__dirname, "..", "src", "Router.tsx");

  if (!fs.existsSync(routerPath)) {
    console.error("Router.tsx not found at src/Router.tsx");
    process.exit(1);
  }

  const routerContent = fs.readFileSync(routerPath, "utf-8");
  const routes = new Set();

  const pathMatches = routerContent.matchAll(/path:\s*["'`]([^"'`]+)["'`]/g);
  for (const match of pathMatches) {
    const route = match[1];
    if (!route.includes(":") && !route.includes("*")) {
      routes.add(route);
    }
  }

  const stringMatches = routerContent.matchAll(/["'`]\/[^"'`]*["'`]/g);
  for (const match of stringMatches) {
    const route = match[0].slice(1, -1);
    if (route.startsWith("/") && !route.includes(":") && !route.includes("*")) {
      routes.add(route);
    }
  }

  if (routes.size === 0 || !routes.has("/")) {
    routes.add("/");
  }

  return Array.from(routes).sort();
}

function main() {
  try {
    const routes = extractRoutesFromRouter();

    const format = process.argv[2] || "space-separated";

    switch (format) {
      case "json":
        console.log(JSON.stringify(routes, null, 2));
        break;
      case "array":
        console.log(routes.map((r) => `"${r}"`).join(" "));
        break;
      case "space-separated":
      default:
        console.log(routes.join(" "));
        break;
    }
  } catch (error) {
    console.error("Error extracting routes:", error.message);
    process.exit(1);
  }
}
main();

export { extractRoutesFromRouter };

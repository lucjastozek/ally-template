#!/usr/bin/env node
/**
 * Run Pa11y accessibility tests on all routes extracted from Router.tsx
 */

import { spawn } from "child_process";
import { extractRoutesFromRouter } from "./extract-routes.js";

const BASE_URL = "http://localhost:3000";

async function runPa11yOnRoutes() {
  let routes;
  try {
    routes = extractRoutesFromRouter();
  } catch (error) {
    console.error("Error extracting routes from Router.tsx:", error.message);
    console.log("Falling back to root route only");
    routes = ["/"];
  }

  try {
    console.log(
      `Running Pa11y on ${routes.length} route(s): ${routes.join(", ")}`
    );

    let hasErrors = false;

    for (const route of routes) {
      const url = `${BASE_URL}${route}`;
      console.log(`\n🔍 Testing ${url} with Pa11y...`);

      const result = await new Promise((resolve) => {
        const pa11y = spawn(
          "pa11y",
          [
            "--standard",
            "WCAG2AA",
            "--timeout",
            "30000",
            "--wait",
            "2000",
            "--include-warnings",
            url,
          ],
          {
            stdio: "inherit",
            shell: true,
          }
        );

        pa11y.on("close", (code) => {
          resolve(code);
        });
      });

      if (result !== 0) {
        hasErrors = true;
        console.error(`❌ Pa11y found issues on ${url}`);
      } else {
        console.log(`✅ Pa11y passed for ${url}`);
      }
    }

    if (hasErrors) {
      console.error("\n❌ Pa11y found accessibility issues");
      process.exit(1);
    } else {
      console.log("\n✅ All Pa11y tests passed!");
    }
  } catch (error) {
    console.error("Error running Pa11y tests:", error.message);
    process.exit(1);
  }
}

runPa11yOnRoutes();

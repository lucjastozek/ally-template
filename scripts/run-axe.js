#!/usr/bin/env node
/**
 * Run Axe accessibility tests on all routes extracted from Router.tsx
 */

import { spawn } from "child_process";
import { extractRoutesFromRouter } from "./extract-routes.js";

const BASE_URL = "http://localhost:3000";

async function runAxeOnRoutes() {
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
      `Running Axe on ${routes.length} route(s): ${routes.join(", ")}`,
    );

    let hasErrors = false;

    for (const route of routes) {
      const url = `${BASE_URL}${route}`;
      console.log(`\n🔍 Testing ${url} with Axe...`);

      const result = await new Promise((resolve) => {
        const axe = spawn("axe", [url, "--exit"], {
          stdio: "inherit",
          shell: true,
        });

        axe.on("close", (code) => {
          resolve(code);
        });
      });

      if (result !== 0) {
        hasErrors = true;
        console.error(`❌ Axe found issues on ${url}`);
      } else {
        console.log(`✅ Axe passed for ${url}`);
      }
    }

    if (hasErrors) {
      console.error("\n❌ Axe found accessibility issues");
      process.exit(1);
    } else {
      console.log("\n✅ All Axe tests passed!");
    }
  } catch (error) {
    console.error("Error running Axe tests:", error.message);
    process.exit(1);
  }
}

runAxeOnRoutes();

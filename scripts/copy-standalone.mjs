// Cross-platform replacement for `cp -r` in the build step.
// Copies the assets that Next.js does not bundle into the standalone output.
import { cpSync, existsSync } from "node:fs";

cpSync(".next/static", ".next/standalone/.next/static", { recursive: true });

if (existsSync("public")) {
  cpSync("public", ".next/standalone/public", { recursive: true });
}

console.log("Copied static assets into .next/standalone");

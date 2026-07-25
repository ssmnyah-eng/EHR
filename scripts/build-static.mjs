// Builds a static-export copy of the site for GitHub Pages.
//
// Next.js `output: "export"` cannot include server API routes (booking,
// contact, Stripe), so this script temporarily moves src/app/api out of the
// way, runs the export build, then restores it, always, even on failure.
// The real dynamic API routes are untouched in git; this only affects the
// one-off `out/` directory built for Pages.

import { existsSync } from "node:fs";
import { rename } from "node:fs/promises";
import { spawn } from "node:child_process";

const API_DIR = "src/app/api";
const API_DIR_HIDDEN = "src/app/_api_disabled_for_static_export";

async function run(cmd, args, env) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: "inherit", env: { ...process.env, ...env } });
    child.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} exited ${code}`))));
  });
}

async function main() {
  const hadApiDir = existsSync(API_DIR);
  if (hadApiDir) await rename(API_DIR, API_DIR_HIDDEN);

  try {
    await run("npx", ["next", "build"], {
      STATIC_EXPORT: "1",
      NEXT_PUBLIC_STATIC_EXPORT: "1",
    });
  } finally {
    if (hadApiDir) await rename(API_DIR_HIDDEN, API_DIR);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

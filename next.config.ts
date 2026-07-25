import type { NextConfig } from "next";

// Two build modes:
// - `next build` (default): full server app, API routes work, for hosting on
//   Vercel/Netlify/any Node host.
// - `STATIC_EXPORT=1 next build` (via `npm run build:pages`): static HTML/CSS/JS
//   for GitHub Pages. API routes can't run there, so scripts/build-static.mjs
//   temporarily removes src/app/api before this build and restores it after.
const isStaticExport = process.env.STATIC_EXPORT === "1";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  ...(isStaticExport && {
    output: "export",
    images: { unoptimized: true },
    basePath,
    trailingSlash: true,
  }),
};

export default nextConfig;

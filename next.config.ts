import type { NextConfig } from "next";

/**
 * GitHub Pages serves this as a project site at /EHR/, not the domain
 * root, so the static export needs a matching basePath/assetPrefix.
 * Gated behind GITHUB_PAGES so `next dev` / a plain `next build` (e.g.
 * for local checks or a future non-Pages host) are unaffected — only the
 * Pages deploy workflow sets this env var.
 */
const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages ? "/EHR" : "";

const nextConfig: NextConfig = {
  ...(isGithubPages ? { output: "export" } : {}),
  basePath,
  assetPrefix: basePath,
  // Static export writes each route as a folder + index.html
  // (/about/index.html); trailingSlash keeps generated links matching
  // that on-disk shape. Gated the same way so a plain `next build`/
  // `next start` elsewhere keeps today's extensionless URLs.
  trailingSlash: isGithubPages,
  images: {
    // GitHub Pages has no image-optimization server; static export
    // requires either this or a custom loader.
    unoptimized: isGithubPages,
  },
};

export default nextConfig;

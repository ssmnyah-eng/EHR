import type { NextConfig } from "next";

/**
 * Served from the custom domain (elevatedhomeresets.com) at the domain
 * root via a CNAME record, not as a GitHub Pages project site — so no
 * basePath/assetPrefix is needed. lib/assetPath.ts still reads
 * NEXT_PUBLIC_BASE_PATH for raw <video> src/poster paths (next/image
 * prefixes its own src automatically); leaving it unset here makes that
 * a no-op, matching root hosting.
 *
 * If this ever moves back to a project-site path (no custom domain,
 * served at /<repo>/), reintroduce basePath/assetPrefix/env here.
 */
const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  ...(isGithubPages ? { output: "export" } : {}),
  // Static export writes each route as a folder + index.html
  // (/about/index.html); trailingSlash keeps generated links matching
  // that on-disk shape. Gated so a plain `next build`/`next start`
  // elsewhere keeps today's extensionless URLs.
  trailingSlash: isGithubPages,
  images: {
    // GitHub Pages has no image-optimization server; static export
    // requires either this or a custom loader.
    unoptimized: isGithubPages,
  },
};

export default nextConfig;

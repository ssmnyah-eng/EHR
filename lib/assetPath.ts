/**
 * Prefixes a root-relative asset path (e.g. "/videos/hero.mp4") with
 * NEXT_PUBLIC_BASE_PATH, if one is set. The site is currently served
 * from the domain root (no basePath — see next.config.ts), so this is a
 * no-op today; it exists so raw <video src>/poster attributes (no
 * next/image equivalent) stay correct automatically if a basePath is
 * ever reintroduced (e.g. a project-site deploy with no custom domain).
 */
export function assetPath(path: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}

/**
 * Prefixes a root-relative asset path (e.g. "/videos/hero.mp4") with the
 * GitHub Pages basePath ("/EHR") when deployed there. next/image does
 * this automatically for its own src; raw <video src>/poster attributes
 * have no equivalent, so anything reaching the DOM outside next/image
 * must go through this first.
 */
export function assetPath(path: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}

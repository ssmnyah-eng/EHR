import type { ResourceItem } from "@/lib/types";

/**
 * No real resources/articles are populated yet — do not invent titles or
 * summaries. Populate this array during the content/SEO phase.
 */
export const RESOURCES: ResourceItem[] = [];

export function findResourceBySlug(slug: string): ResourceItem | undefined {
  return RESOURCES.find((resource) => resource.slug === slug);
}

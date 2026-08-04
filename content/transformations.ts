import type { TransformationProject } from "@/lib/types";

/**
 * No real projects are populated yet — do not invent locations, outcomes,
 * or client details (brief section 19). Populate during the
 * photography/proof phase.
 */
export const TRANSFORMATIONS: TransformationProject[] = [];

export function findTransformationBySlug(slug: string): TransformationProject | undefined {
  return TRANSFORMATIONS.find((project) => project.slug === slug);
}

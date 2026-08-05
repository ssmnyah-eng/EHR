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

/**
 * Category-filtered projects for the "See the Difference a Reset Can
 * Make" carousel on Cleaning/Organization pages (ProjectMediaCarousel) —
 * matches loosely against each project's freeform `category` string so
 * a Cleaning page never surfaces an Organization project and vice
 * versa. Returns [] until real projects with matching categories exist.
 */
export function findTransformationsByCategory(category: string): TransformationProject[] {
  return TRANSFORMATIONS.filter((project) => project.category?.toLowerCase().includes(category.toLowerCase()));
}

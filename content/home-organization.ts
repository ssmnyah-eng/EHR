import type { ContentSlot } from "@/lib/types";
import { ESTIMATE_CTA } from "@/content/navigation";

/**
 * Content slots for the Home Organization overview + Organization Packages
 * page. Framework phase — every field is intentionally empty except CTA
 * destinations. Do not fill in copy here until the conversion-copy phase.
 */

export const HOME_ORGANIZATION_HERO: ContentSlot = {
  primaryCTA: ESTIMATE_CTA,
};

export const HOME_ORGANIZATION_INQUIRY: ContentSlot = {
  heading: ESTIMATE_CTA.label,
};

export const ORGANIZATION_PACKAGES_HERO: ContentSlot = {
  primaryCTA: ESTIMATE_CTA,
};

export const ORGANIZATION_PACKAGES_INQUIRY: ContentSlot = {
  heading: ESTIMATE_CTA.label,
};

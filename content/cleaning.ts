import type { ContentSlot } from "@/lib/types";
import { ESTIMATE_CTA } from "@/content/navigation";

/**
 * Content slots for the Cleaning Services overview + the three active
 * service-detail pages. Framework phase — every field is intentionally
 * empty except CTA destinations. Do not fill in copy here until the
 * conversion-copy phase.
 */

export const CLEANING_OVERVIEW_HERO: ContentSlot = {
  primaryCTA: ESTIMATE_CTA,
};

export const CLEANING_OVERVIEW_INQUIRY: ContentSlot = {
  heading: ESTIMATE_CTA.label,
};

export const STANDARD_CLEAN_HERO: ContentSlot = {
  primaryCTA: ESTIMATE_CTA,
};

export const DEEP_PREMIUM_CLEAN_HERO: ContentSlot = {
  primaryCTA: ESTIMATE_CTA,
};

export const ELEVATED_RESET_CLEAN_HERO: ContentSlot = {
  primaryCTA: ESTIMATE_CTA,
};

export const CLEANING_DETAIL_INQUIRY: ContentSlot = {
  heading: ESTIMATE_CTA.label,
};

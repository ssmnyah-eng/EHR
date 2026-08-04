import type { ContentSlot } from "@/lib/types";
import { ESTIMATE_CTA } from "@/content/navigation";

/**
 * Content slots for the Cleaning Services overview page. Framework phase —
 * every field is intentionally empty except CTA destinations. Do not fill
 * in copy here until the conversion-copy phase.
 *
 * The three active service-detail pages (Standard Clean, Deep Premium
 * Clean, Elevated Reset Clean) each have their own dedicated content file
 * — see content/cleaning-standard.ts, content/cleaning-deep-premium.ts,
 * content/cleaning-elevated-reset.ts.
 */

export const CLEANING_OVERVIEW_HERO: ContentSlot = {
  primaryCTA: ESTIMATE_CTA,
};

export const CLEANING_OVERVIEW_INQUIRY: ContentSlot = {
  heading: ESTIMATE_CTA.label,
};

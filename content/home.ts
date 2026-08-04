import type { ContentSlot } from "@/lib/types";
import { ESTIMATE_CTA } from "@/content/navigation";

/**
 * Homepage content slots. Framework phase — every field is intentionally
 * empty (rendered as neutral dev-only "SLOT" labels) except CTA
 * destinations, which are real, already-approved routes. Do not fill in
 * headings/body copy here until the conversion-copy phase.
 */

export const HERO_SLOT: ContentSlot = {
  primaryCTA: ESTIMATE_CTA,
};

export const CLEANING_FEATURE_SLOT: ContentSlot = {
  primaryCTA: { label: "Explore Cleaning Services", href: "/cleaning" },
};

export const HOME_ORGANIZATION_FEATURE_SLOT: ContentSlot = {
  primaryCTA: { label: "Explore Home Organization", href: "/home-organization" },
};

export const BRAND_PHILOSOPHY_SLOT: ContentSlot = {};

export const FOUNDER_PREVIEW_SLOT: ContentSlot = {
  primaryCTA: { label: "Read our story", href: "/about" },
};

export const HOMEPAGE_INQUIRY_SLOT: ContentSlot = {
  heading: ESTIMATE_CTA.label,
};

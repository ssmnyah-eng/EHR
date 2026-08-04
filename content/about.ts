import type { ContentSlot } from "@/lib/types";

/**
 * Content slots for the About page (brief section 31: About Hero, Founder
 * Story, Brand Philosophy, Approach/Cleaning+Organizing Connection,
 * Additional Media, Inquiry CTA). Framework phase — no real founder or
 * brand-story details exist yet, so every field is intentionally empty.
 */

export const ABOUT_HERO_SLOT: ContentSlot = {};

export const ABOUT_FOUNDER_SLOT: ContentSlot = {};

export const ABOUT_PHILOSOPHY_SLOT: ContentSlot = {};

export const ABOUT_APPROACH_SLOT: ContentSlot = {};

export const ABOUT_INQUIRY_SLOT: ContentSlot = {
  heading: "Get Your Free Estimate",
};

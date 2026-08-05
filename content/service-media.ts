import type { MediaSlotData } from "@/lib/types";

/**
 * Per-service-page media configuration — the single place that maps each
 * active Cleaning/Organizing service page to its banner video and its
 * 3-5 page-specific images. ServiceDetailTemplate and OrganizationRoomTemplate
 * read from here (keyed by route slug) instead of every page hardcoding its
 * own media imports, so replacing a page's banner video or image N is a
 * one-line change here rather than a page-by-page edit.
 *
 * Naming convention (brief section 3/6): each page's dedicated assets are
 * expected at:
 *   /videos/services/[slug]-banner-video.mp4 (+ matching -poster.jpg)
 *   /images/services/[slug]-1.jpg ... [slug]-5.jpg
 * None of those page-specific files have been supplied yet. Until they are,
 * this config either (a) temporarily points a slot at an appropriate
 * existing real Elevated Home Resets photo already in the project, or
 * (b) leaves the slot with no `src`, which renders MediaSlot's neutral
 * placeholder (dev builds show the expected filename via SHOW_SLOT_LABELS).
 * See the implementation report for the full per-page media audit.
 */

export interface ServicePageMedia {
  bannerVideo: MediaSlotData;
  images: MediaSlotData[];
}

function placeholderBanner(slug: string, context: string): MediaSlotData {
  return {
    type: "video",
    alt: `${context} banner video — expected at /videos/services/${slug}-banner-video.mp4`,
    variant: "fullBleed",
  };
}

function placeholderImage(slug: string, index: number, context: string): MediaSlotData {
  return {
    type: "image",
    alt: `${context} — expected at /images/services/${slug}-${index}.jpg`,
    variant: "landscape",
  };
}

/**
 * Whole-Home Organization's own banner video does not exist yet either.
 * Deep Premium Clean is instructed to temporarily reuse "the existing
 * Whole-Home Organization banner video" — since that source doesn't exist
 * yet, both slots share this exact object reference so that supplying
 * ONE real video (src + poster on this const) instantly populates both
 * pages without touching either page's own config entry.
 */
const WHOLE_HOME_BANNER: MediaSlotData = placeholderBanner("whole-home-organization", "Whole-Home Organization");

export const SERVICE_MEDIA: Record<string, ServicePageMedia> = {
  // ===== Cleaning Services =====
  "standard-clean": {
    bannerVideo: placeholderBanner("standard-clean", "Standard Clean"),
    images: [
      { type: "image", src: "/images/cleaning/not-every-home-same-clean.jpg", alt: "An empty, freshly presented living room with hardwood floors and a fireplace", variant: "landscape" },
      { type: "image", src: "/images/cleaning/personal-living-space.jpg", alt: "A lived-in living and dining space with natural light", variant: "landscape", objectPosition: "center 60%" },
      { type: "image", src: "/images/cleaning/right-level-of-cleaning.jpg", alt: "A bright, open hallway leading into a calm, minimally furnished living space", variant: "landscape" },
    ],
  },
  "deep-premium-clean": {
    // Intentional temporary reuse — see WHOLE_HOME_BANNER above.
    bannerVideo: WHOLE_HOME_BANNER,
    images: [
      { type: "image", src: "/images/cleaning/details-change-whole-home.jpg", alt: "Two people relaxing together in a bright, tidy living room", variant: "landscape" },
      { type: "image", src: "/images/cleaning/right-level-of-cleaning.jpg", alt: "A bright, open hallway leading into a calm, minimally furnished living space", variant: "landscape" },
      { type: "image", src: "/images/cleaning/not-every-home-same-clean.jpg", alt: "An empty, freshly presented living room with hardwood floors and a fireplace", variant: "landscape" },
    ],
  },
  "elevated-reset-clean": {
    bannerVideo: placeholderBanner("elevated-reset-clean", "Elevated Reset Clean"),
    images: [
      { type: "image", src: "/images/cleaning/home-doesnt-need-to-be-ready.jpg", alt: "A woman gathering an armful of laundry in a lived-in home", variant: "landscape", objectPosition: "72% 45%" },
      { type: "image", src: "/images/cleaning/personal-living-space.jpg", alt: "A lived-in living and dining space with natural light", variant: "landscape", objectPosition: "center 60%" },
      { type: "image", src: "/images/cleaning/details-change-whole-home.jpg", alt: "Two people relaxing together in a bright, tidy living room", variant: "landscape" },
    ],
  },

  // ===== Home Organization =====
  "kitchen-organization": {
    bannerVideo: placeholderBanner("kitchen-organization", "Kitchen Organization"),
    images: [
      { type: "image", src: "/images/organization/kitchen-cabinet-dishes.jpg", alt: "An organized kitchen cabinet with pantry containers and dishes arranged on a dish rack", variant: "landscape", objectPosition: "center 40%" },
      { type: "image", src: "/images/organization/kitchen-corner.jpg", alt: "An organized wall shelf with labeled spice jars above a kitchen counter", variant: "portrait", aspectRatio: "4 / 5", objectPosition: "62% 62%" },
      { type: "image", src: "/images/organization/kitchen-corner.jpg", alt: "An organized wall shelf with labeled spice jars above a kitchen counter", variant: "landscape", objectPosition: "62% 45%" },
    ],
  },
  "pantry-organization": {
    bannerVideo: placeholderBanner("pantry-organization", "Pantry Organization"),
    images: [
      { type: "image", src: "/images/organization/pantry.jpg", alt: "A comprehensive organized pantry with labeled shelving for cookware, appliances, and pantry staples", variant: "landscape", objectPosition: "center 45%" },
      { type: "image", src: "/images/organization/pantry-cabinet-jars.jpg", alt: "Labeled glass jars of pantry staples arranged on organized shelving", variant: "portrait", aspectRatio: "4 / 5" },
      { type: "image", src: "/images/organization/pantry-cabinet-jars.jpg", alt: "Labeled glass jars of pantry staples arranged on organized shelving", variant: "landscape" },
    ],
  },
  "closet-organization": {
    bannerVideo: placeholderBanner("closet-organization", "Closet Organization"),
    images: [
      { type: "image", src: "/images/organization/walk-in-closet.jpg", alt: "A walk-in closet with clothing sorted by type and color, drawers, and shoe shelving", variant: "landscape" },
      { type: "image", src: "/images/organization/kids-closet.jpg", alt: "A children's closet with clothing organized by category and a hanging shoe and toy organizer", variant: "portrait", aspectRatio: "4 / 5", objectPosition: "30% center" },
      { type: "image", src: "/images/organization/kids-closet.jpg", alt: "A children's closet with clothing organized by category and a hanging shoe and toy organizer", variant: "landscape", objectPosition: "30% 40%" },
    ],
  },
  "bathroom-organization": {
    bannerVideo: placeholderBanner("bathroom-organization", "Bathroom Organization"),
    images: [
      { type: "image", src: "/images/organization/bathroom-cabinet.jpg", alt: "An organized bathroom cabinet with woven baskets, a folded towel, and a soap pump in place", variant: "landscape", objectPosition: "55% 55%" },
      placeholderImage("bathroom-organization", 2, "Bathroom Organization"),
      { type: "image", src: "/images/organization/bathroom-cabinet.jpg", alt: "An organized bathroom cabinet with woven baskets, a folded towel, and a soap pump in place", variant: "landscape", objectPosition: "50% 40%" },
    ],
  },
  "garage-organization": {
    bannerVideo: placeholderBanner("garage-organization", "Garage Organization"),
    images: [
      placeholderImage("garage-organization", 1, "Garage Organization"),
      placeholderImage("garage-organization", 2, "Garage Organization"),
      placeholderImage("garage-organization", 3, "Garage Organization"),
    ],
  },
  "home-office-organization": {
    bannerVideo: placeholderBanner("home-office-organization", "Home Office Organization"),
    images: [
      { type: "image", src: "/images/organization/home-office.jpg", alt: "An organized home office desk with a bookshelf, desk organizer, and clear work surface", variant: "landscape" },
      placeholderImage("home-office-organization", 2, "Home Office Organization"),
      { type: "image", src: "/images/organization/home-office.jpg", alt: "An organized home office desk with a bookshelf, desk organizer, and clear work surface", variant: "landscape", objectPosition: "center 35%" },
    ],
  },
  "laundry-room-organization": {
    bannerVideo: placeholderBanner("laundry-room-organization", "Laundry Room Organization"),
    images: [
      placeholderImage("laundry-room-organization", 1, "Laundry Room Organization"),
      placeholderImage("laundry-room-organization", 2, "Laundry Room Organization"),
      placeholderImage("laundry-room-organization", 3, "Laundry Room Organization"),
    ],
  },
  "whole-home-organization": {
    bannerVideo: WHOLE_HOME_BANNER,
    images: [
      { type: "image", src: "/images/organization/dining-living-room.jpg", alt: "A connected dining and living area in a client's home, both spaces working together", variant: "landscape", objectPosition: "center 58%" },
      placeholderImage("whole-home-organization", 2, "Whole-Home Organization"),
      { type: "image", src: "/images/organization/dining-living-room.jpg", alt: "A connected dining and living area in a client's home, both spaces working together", variant: "landscape", objectPosition: "center 45%" },
    ],
  },
};

export function getServiceMedia(slug: string): ServicePageMedia {
  const media = SERVICE_MEDIA[slug];
  if (!media) {
    throw new Error(`No service-media entry configured for slug "${slug}". Add one to content/service-media.ts.`);
  }
  return media;
}

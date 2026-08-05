import type { MediaSlotData } from "@/lib/types";

/**
 * Per-service-page media configuration — the single place that maps each
 * active Cleaning/Organizing service page to its banner video and its
 * 3-5 page-specific images. ServiceDetailTemplate and OrganizationRoomTemplate
 * read from here (keyed by route slug) instead of every page hardcoding its
 * own media imports, so replacing a page's banner video or image N is a
 * one-line change here rather than a page-by-page edit.
 *
 * Naming convention (brief section 3/6): each page's dedicated assets live
 * at:
 *   /videos/services/[slug]-banner-video.mp4 (+ matching -poster.jpg)
 *   /images/services/[slug]-1.jpg ... [slug]-5.jpg
 *
 * Pantry Organization, Bathroom Organization (banner), Closet Organization
 * (banner), and Kitchen Organization (banner) have no dedicated video yet —
 * those slots stay MediaSlot placeholders (no `src`) until supplied. See
 * the implementation report for the full per-page media audit, including a
 * flagged concern that several of the newly supplied Home Organization
 * images (bathroom/laundry/closet/kitchen/garage) visually read as generic
 * stock photography rather than real Elevated Home Resets project photos —
 * used here per explicit instruction, not silently.
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

/**
 * Whole-Home Organization's real banner video is also the temporary Deep
 * Premium Clean banner, per explicit instruction — both slots share this
 * exact object reference so replacing this one const's src/poster updates
 * both pages at once.
 */
const WHOLE_HOME_BANNER: MediaSlotData = {
  type: "video",
  src: "/videos/services/whole-home-organization-banner-video.mp4",
  poster: "/images/services/whole-home-organization-banner-video-poster.jpg",
  alt: "A walkthrough of a connected, organized living space",
  variant: "fullBleed",
};

export const SERVICE_MEDIA: Record<string, ServicePageMedia> = {
  // ===== Cleaning Services =====
  "standard-clean": {
    bannerVideo: {
      type: "video",
      src: "/videos/services/standard-clean-banner-video.mp4",
      poster: "/images/services/standard-clean-banner-video-poster.jpg",
      alt: "A home being tidied and reset room by room",
      variant: "fullBleed",
    },
    images: [
      { type: "image", src: "/images/services/standard-clean-1.jpg", alt: "Cleaning supplies — gloves, a spray bottle, and a cloth — set out on a side table", variant: "landscape" },
      { type: "image", src: "/images/services/standard-clean-2.jpg", alt: "A living and dining space being cleaned and reset", variant: "landscape" },
      { type: "image", src: "/images/services/standard-clean-3.jpg", alt: "A home's floor being cleaned", variant: "landscape" },
      { type: "image", src: "/images/services/standard-clean-4.jpg", alt: "A freshly cleaned living space", variant: "landscape" },
      { type: "image", src: "/images/services/standard-clean-5.jpg", alt: "A tidy, freshly cleaned room", variant: "landscape" },
    ],
  },
  "deep-premium-clean": {
    // Intentional temporary reuse — see WHOLE_HOME_BANNER above.
    bannerVideo: WHOLE_HOME_BANNER,
    images: [
      { type: "image", src: "/images/services/deep-premium-clean-1.jpg", alt: "A detailed, deep clean of a home surface", variant: "landscape" },
      { type: "image", src: "/images/services/deep-premium-clean-2.jpg", alt: "A home being deep cleaned", variant: "landscape" },
      { type: "image", src: "/images/services/deep-premium-clean-3.jpg", alt: "A deep-cleaned home detail", variant: "landscape" },
      { type: "image", src: "/images/services/deep-premium-clean-4.jpg", alt: "A freshly deep-cleaned space", variant: "landscape" },
      { type: "image", src: "/images/services/deep-premium-clean-5.jpg", alt: "A finished deep-clean result", variant: "landscape" },
    ],
  },
  "elevated-reset-clean": {
    bannerVideo: {
      type: "video",
      src: "/videos/services/elevated-reset-clean-banner-video.mp4",
      poster: "/images/services/elevated-reset-clean-banner-video-poster.jpg",
      alt: "A calm, finished entryway and living space",
      variant: "fullBleed",
    },
    images: [
      { type: "image", src: "/images/services/elevated-reset-clean-1.jpg", alt: "A calm, finished living space after an Elevated Reset", variant: "landscape" },
      { type: "image", src: "/images/services/elevated-reset-clean-2.jpg", alt: "A reset, finished room", variant: "landscape" },
      { type: "image", src: "/images/services/elevated-reset-clean-3.jpg", alt: "A finished space after an Elevated Reset Clean", variant: "landscape" },
      { type: "image", src: "/images/services/elevated-reset-clean-4.jpg", alt: "A finished, put-together living space", variant: "landscape" },
    ],
  },

  // ===== Home Organization =====
  "kitchen-organization": {
    bannerVideo: placeholderBanner("kitchen-organization", "Kitchen Organization"),
    images: [
      { type: "image", src: "/images/services/kitchen-organization-1.jpg", alt: "Organized kitchen counter storage", variant: "landscape" },
      { type: "image", src: "/images/services/kitchen-organization-2.jpg", alt: "An organized kitchen drawer with utensils and dishware", variant: "landscape" },
      { type: "image", src: "/images/services/kitchen-organization-3.jpg", alt: "Organized kitchen storage", variant: "landscape" },
      { type: "image", src: "/images/services/kitchen-organization-4.jpg", alt: "An organized kitchen space", variant: "landscape" },
      { type: "image", src: "/images/services/kitchen-organization-5.jpg", alt: "Organized kitchen cabinets", variant: "landscape" },
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
      { type: "image", src: "/images/services/closet-organization-1.jpg", alt: "Organized closet shelving with folded items, bags, and storage boxes", variant: "landscape" },
      { type: "image", src: "/images/services/closet-organization-2.jpg", alt: "An organized closet space", variant: "landscape" },
      { type: "image", src: "/images/services/closet-organization-3.jpg", alt: "Organized closet storage", variant: "landscape" },
      { type: "image", src: "/images/services/closet-organization-4.jpg", alt: "An organized closet", variant: "landscape" },
    ],
  },
  "bathroom-organization": {
    bannerVideo: placeholderBanner("bathroom-organization", "Bathroom Organization"),
    images: [
      { type: "image", src: "/images/services/bathroom-organization-1.jpg", alt: "A finished bathroom space", variant: "landscape" },
      { type: "image", src: "/images/services/bathroom-organization-2.jpg", alt: "An organized bathroom space", variant: "landscape" },
      { type: "image", src: "/images/services/bathroom-organization-3.jpg", alt: "Bathroom storage", variant: "landscape" },
      { type: "image", src: "/images/services/bathroom-organization-4.jpg", alt: "A finished bathroom", variant: "landscape" },
    ],
  },
  "garage-organization": {
    bannerVideo: {
      type: "video",
      src: "/videos/services/garage-organization-banner-video.mp4",
      poster: "/images/services/garage-organization-banner-video-poster.jpg",
      alt: "An organized garage with clear floor space",
      variant: "fullBleed",
    },
    images: [
      { type: "image", src: "/images/services/garage-organization-1.jpg", alt: "Labeled garage storage bins", variant: "landscape" },
      { type: "image", src: "/images/services/garage-organization-2.jpg", alt: "Organized garage storage", variant: "landscape" },
    ],
  },
  "home-office-organization": {
    bannerVideo: {
      type: "video",
      src: "/videos/services/home-office-organization-banner-video.mp4",
      poster: "/images/services/home-office-organization-banner-video-poster.jpg",
      alt: "A calm, organized home office workspace",
      variant: "fullBleed",
    },
    images: [
      { type: "image", src: "/images/services/home-office-organization-1.jpg", alt: "An organized home office desk", variant: "landscape" },
      { type: "image", src: "/images/services/home-office-organization-2.jpg", alt: "An organized home office space", variant: "landscape" },
      { type: "image", src: "/images/services/home-office-organization-3.jpg", alt: "Organized home office storage", variant: "landscape" },
      { type: "image", src: "/images/services/home-office-organization-4.jpg", alt: "A finished home office setup", variant: "landscape" },
    ],
  },
  "laundry-room-organization": {
    bannerVideo: {
      type: "video",
      src: "/videos/services/laundry-room-organization-banner-video.mp4",
      poster: "/images/services/laundry-room-organization-banner-video-poster.jpg",
      alt: "Laundry being folded and put away",
      variant: "fullBleed",
    },
    images: [
      { type: "image", src: "/images/services/laundry-room-organization-1.jpg", alt: "A laundry room moment", variant: "landscape" },
      { type: "image", src: "/images/services/laundry-room-organization-2.jpg", alt: "Organized laundry room storage", variant: "landscape" },
    ],
  },
  "whole-home-organization": {
    bannerVideo: WHOLE_HOME_BANNER,
    images: [
      { type: "image", src: "/images/services/whole-home-organization-1.jpg", alt: "An organized kitchen drawer", variant: "landscape" },
      { type: "image", src: "/images/services/whole-home-organization-2.jpg", alt: "A connected, organized living space", variant: "landscape" },
      { type: "image", src: "/images/services/whole-home-organization-3.jpg", alt: "An organized space in a client's home", variant: "landscape" },
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

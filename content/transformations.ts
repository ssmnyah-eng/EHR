import type { TransformationProject } from "@/lib/types";

/**
 * Real client photography. Each entry is a single project photo (no
 * fabricated before/after pairing — `beforeMedia`/`afterMedia` stay unset
 * unless a genuine matching pair exists). Category strings intentionally
 * share the word "Organization" so the broad hub/homepage carousel
 * (`findTransformationsByCategory("organization")`) surfaces all of them,
 * while each room page's narrower call (e.g. `"pantry"`) matches only its
 * own room via substring — see findTransformationsByCategory below.
 *
 * PROVENANCE FLAG (added during the custom-domain launch pass): this
 * "Real client photography" claim is what an earlier session wrote here
 * — it is not independently verified. Several of the referenced image
 * files under public/images/organization/ and public/images/
 * transformations/ carry an ffmpeg/libavcodec encoder comment and no
 * EXIF data, which is consistent with either (a) ordinary HEIC→JPEG
 * conversion or video-poster-frame extraction from the real
 * before/after videos in public/videos/ (both benign, expected for
 * real client photos run through a web-optimization pipeline), or (b)
 * stock/placeholder imagery. That signal alone doesn't distinguish the
 * two. Until a human confirms which, /transformations/[slug] pages are
 * set to noindex and held out of sitemap.xml (see app/sitemap.ts and
 * app/transformations/[slug]/page.tsx) even though they build and are
 * reachable by direct link. Remove this flag once confirmed either way.
 */
export const TRANSFORMATIONS: TransformationProject[] = [
  {
    title: "A Pantry Built Around Everyday Use",
    slug: "comprehensive-pantry-reset",
    category: "Pantry Organization",
    summary: "A full walk-in pantry reset with labeled zones for cookware, small appliances, and everyday staples.",
    heroMedia: {
      type: "image",
      src: "/images/organization/pantry.jpg",
      alt: "A comprehensive organized pantry with labeled shelving for cookware, appliances, and pantry staples",
      variant: "landscape",
      objectPosition: "center 45%",
    },
    href: "/transformations/comprehensive-pantry-reset",
  },
  {
    title: "Labeled Jars for Everyday Staples",
    slug: "labeled-pantry-jars",
    category: "Pantry Organization",
    summary: "Everyday pantry staples decanted into labeled jars so what's on hand is easy to see and reach.",
    heroMedia: {
      type: "image",
      src: "/images/organization/pantry-cabinet-jars.jpg",
      alt: "Labeled glass jars of pantry staples arranged on organized shelving",
      variant: "portrait",
      aspectRatio: "4 / 5",
    },
    href: "/transformations/labeled-pantry-jars",
  },
  {
    title: "A Kitchen Cabinet That Makes Sense",
    slug: "kitchen-cabinet-reset",
    category: "Kitchen Organization",
    summary: "Pantry containers and everyday dishware given a clear, functional home inside a kitchen cabinet.",
    heroMedia: {
      type: "image",
      src: "/images/organization/kitchen-cabinet-dishes.jpg",
      alt: "An organized kitchen cabinet with pantry containers and dishes arranged on a dish rack",
      variant: "landscape",
      objectPosition: "center 40%",
    },
    href: "/transformations/kitchen-cabinet-reset",
  },
  {
    title: "An Organized Kitchen Corner",
    slug: "kitchen-spice-shelf-reset",
    category: "Kitchen Organization",
    summary: "A wall-mounted shelf and countertop corner reset with labeled spice jars and everyday tools in place.",
    heroMedia: {
      type: "image",
      src: "/images/organization/kitchen-corner.jpg",
      alt: "An organized wall shelf with labeled spice jars above a kitchen counter",
      variant: "landscape",
      objectPosition: "62% 62%",
    },
    href: "/transformations/kitchen-spice-shelf-reset",
  },
  {
    title: "A Walk-In Closet, Reset",
    slug: "walk-in-closet-reset",
    category: "Closet Organization",
    summary: "A large walk-in closet reorganized with clothing sorted by category and color, drawers, and shoe shelving.",
    heroMedia: {
      type: "image",
      src: "/images/organization/walk-in-closet.jpg",
      alt: "A walk-in closet with clothing sorted by type and color, drawers, and shoe shelving",
      variant: "landscape",
    },
    href: "/transformations/walk-in-closet-reset",
  },
  {
    title: "A Kids' Closet the Whole Family Can Use",
    slug: "kids-closet-reset",
    category: "Closet Organization",
    summary: "A children's closet reset with clothing, shoes, and toys sorted into clear, easy-to-maintain zones.",
    heroMedia: {
      type: "image",
      src: "/images/organization/kids-closet.jpg",
      alt: "A children's closet with clothing organized by category and a hanging shoe and toy organizer",
      variant: "landscape",
      objectPosition: "30% center",
    },
    href: "/transformations/kids-closet-reset",
  },
  {
    title: "A Linen Closet in Its Place",
    slug: "linen-closet-reset",
    category: "Closet Organization",
    summary: "Folded linens and towels sorted and returned to a linen closet with everything easy to find.",
    heroMedia: {
      type: "image",
      src: "/images/organization/linen-closet.jpg",
      alt: "A linen closet with folded sheets and towels organized by shelf",
      variant: "landscape",
    },
    href: "/transformations/linen-closet-reset",
  },
  {
    title: "A Bathroom Cabinet With Room to Breathe",
    slug: "bathroom-cabinet-reset",
    category: "Bathroom Organization",
    summary: "A bathroom cabinet reset with woven baskets grouping everyday products and linens by category.",
    heroMedia: {
      type: "image",
      src: "/images/organization/bathroom-cabinet.jpg",
      alt: "An organized bathroom cabinet with woven baskets, a folded towel, and a soap pump in place",
      variant: "landscape",
      objectPosition: "55% 55%",
    },
    href: "/transformations/bathroom-cabinet-reset",
  },
  {
    title: "A Home Office Ready to Work In",
    slug: "home-office-reset",
    category: "Home Office Organization",
    summary: "A home office desk and shelving reset for a clearer, more functional workspace.",
    heroMedia: {
      type: "image",
      src: "/images/organization/home-office.jpg",
      alt: "An organized home office desk with a bookshelf, desk organizer, and clear work surface",
      variant: "landscape",
    },
    href: "/transformations/home-office-reset",
  },
  {
    title: "A Living Room With a System Behind It",
    slug: "living-room-shoe-storage-reset",
    category: "Home Organization",
    summary: "A living room bookshelf and shoe rack kept organized as part of the everyday household system.",
    heroMedia: {
      type: "image",
      src: "/images/organization/living-room-with-tv.jpg",
      alt: "A living room bookshelf with books organized by shelf and a neatly arranged shoe rack below",
      variant: "landscape",
    },
    href: "/transformations/living-room-shoe-storage-reset",
  },
  // The 7 entries below are combined before/after comparison assets — each
  // heroMedia IS the full before-and-after proof (a single composite photo,
  // or a video that itself shows the transformation), not a single "after"
  // shot. No `category` on purpose: these power the homepage carousel
  // directly (see HOMEPAGE_TRANSFORMATION_PROJECTS below) and shouldn't
  // also surface a second time via findTransformationsByCategory() on the
  // Closet/Kitchen/Pantry room pages.
  {
    title: "A Shoe Closet, Before and After",
    slug: "closet-shoe-shelving-before-after",
    summary: "Wire shelving that was overflowing with shoes and boots, sorted and organized by shoe type.",
    heroMedia: {
      type: "image",
      src: "/images/transformations/before-after-closet-shoes.jpg",
      alt: "Before and after comparison of a closet's wire shelving: shoes and boots overflowing on the left, the same shelving organized by shoe type on the right",
      variant: "square",
      aspectRatio: "1 / 1",
    },
    href: "/transformations/closet-shoe-shelving-before-after",
  },
  {
    title: "A Walk-In Closet, Before and After",
    slug: "closet-walk-in-before-after",
    summary: "A walk-in closet with clothing piled on the floor, reset with everything sorted onto shelving.",
    heroMedia: {
      type: "image",
      src: "/images/transformations/before-after-closet-2.jpg",
      alt: "Before and after comparison of a walk-in closet: clothes piled on the floor on the left, the same closet organized with clothing on wire shelving on the right",
      variant: "square",
      aspectRatio: "1 / 1",
    },
    href: "/transformations/closet-walk-in-before-after",
  },
  {
    title: "A Coat Closet, Before and After",
    slug: "closet-coats-before-after",
    summary: "A coat closet reset from a cluttered rod and floor hamper to organized coats and neatly stored luggage.",
    heroMedia: {
      type: "image",
      src: "/images/transformations/before-after-closet-3.jpg",
      alt: "Before and after comparison of a coat closet: coats crowded on a rod above a floor hamper on the left, the same closet with coats on wire shelving and luggage neatly stored on the right",
      variant: "square",
      aspectRatio: "1 / 1",
    },
    href: "/transformations/closet-coats-before-after",
  },
  {
    title: "A Closet Reset, Before and After",
    slug: "closet-reset-before-after-video",
    summary: "A cluttered closet and overflowing shelving, reset side by side in this before-and-after video.",
    heroMedia: {
      type: "video",
      src: "/videos/before-after-closet.mp4",
      poster: "/images/transformations/before-after-closet-video-poster.jpg",
      alt: "Before and after video of a closet reset, showing the cluttered closet and shelving alongside the organized result",
      variant: "portrait",
      aspectRatio: "9 / 16",
    },
    href: "/transformations/closet-reset-before-after-video",
  },
  {
    title: "A Kitchen Memo Area, Before and After",
    slug: "kitchen-memo-area-before-after",
    summary: "A kitchen message-center cabinet and counter reset from overflowing clutter to a clear, labeled space.",
    heroMedia: {
      type: "image",
      src: "/images/transformations/before-after-kitchen-memo-area.jpg",
      alt: "Before and after comparison of a kitchen memo area: papers and clutter covering the cabinet and counter on the left, the same space organized with labeled bottles and a clear counter on the right",
      variant: "square",
      aspectRatio: "1 / 1",
    },
    href: "/transformations/kitchen-memo-area-before-after",
  },
  {
    title: "A Kitchen Memo Area, Before and After",
    slug: "kitchen-memo-area-before-after-video",
    summary: "The kitchen message-center area reset, shown before and after in this walkthrough video.",
    heroMedia: {
      type: "video",
      src: "/videos/before-after-kitchen-memo-area.mp4",
      poster: "/images/transformations/before-after-kitchen-memo-area-video-poster.jpg",
      alt: "Before and after video of a kitchen memo area reset, transitioning from the cluttered cabinet and counter to the organized result",
      variant: "portrait",
      aspectRatio: "9 / 16",
    },
    href: "/transformations/kitchen-memo-area-before-after-video",
  },
  {
    title: "A Kitchen Pantry, Before and After",
    slug: "kitchen-pantry-before-after-video",
    summary: "A kitchen pantry reset from crowded, hard-to-see shelves to an organized, easy-to-use space.",
    heroMedia: {
      type: "video",
      src: "/videos/before-after-kitchen-pantry.mp4",
      poster: "/images/transformations/before-after-kitchen-pantry-poster.jpg",
      alt: "Before and after video of a kitchen pantry reset, transitioning from crowded shelves to an organized pantry",
      variant: "portrait",
      aspectRatio: "9 / 16",
    },
    href: "/transformations/kitchen-pantry-before-after-video",
  },
];

/**
 * Curated order for the homepage's "See the Difference a Reset Can Make"
 * carousel (Rule 3/9 of the before/after media-structure task) — the 4
 * combined before/after photos, then the 3 before/after videos, same
 * object references as their TRANSFORMATIONS entries above so each slide
 * still links to a real `/transformations/{slug}` detail page.
 */
export const HOMEPAGE_TRANSFORMATION_PROJECTS: TransformationProject[] = [
  TRANSFORMATIONS.find((p) => p.slug === "closet-shoe-shelving-before-after")!,
  TRANSFORMATIONS.find((p) => p.slug === "closet-walk-in-before-after")!,
  TRANSFORMATIONS.find((p) => p.slug === "closet-coats-before-after")!,
  TRANSFORMATIONS.find((p) => p.slug === "closet-reset-before-after-video")!,
  TRANSFORMATIONS.find((p) => p.slug === "kitchen-memo-area-before-after")!,
  TRANSFORMATIONS.find((p) => p.slug === "kitchen-memo-area-before-after-video")!,
  TRANSFORMATIONS.find((p) => p.slug === "kitchen-pantry-before-after-video")!,
];

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

/**
 * Fallback featured image for Organization pages that don't have a
 * room-specific transformation photo yet (Garage, Laundry Room,
 * Whole-Home, and the Home Organization hub) — its category is the
 * unscoped "Home Organization" rather than one room type, making it a
 * reasonable stand-in until room-specific photography exists for those
 * pages. Used by TransformationPreview.
 */
export const GENERIC_ORGANIZATION_TRANSFORMATION: TransformationProject = TRANSFORMATIONS.find(
  (project) => project.slug === "living-room-shoe-storage-reset"
)!;

/**
 * Picks a single featured transformation for `category` (first match from
 * findTransformationsByCategory), falling back to
 * GENERIC_ORGANIZATION_TRANSFORMATION when no room-specific photo exists
 * yet. Powers TransformationPreview on Home Organization room pages —
 * never used on Cleaning pages, which keep the full ProjectMediaCarousel.
 */
export function featuredTransformationForCategory(category: string): TransformationProject {
  return findTransformationsByCategory(category)[0] ?? GENERIC_ORGANIZATION_TRANSFORMATION;
}

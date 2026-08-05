import type { TransformationProject } from "@/lib/types";

/**
 * Real client photography. Each entry is a single project photo (no
 * fabricated before/after pairing — `beforeMedia`/`afterMedia` stay unset
 * unless a genuine matching pair exists). Category strings intentionally
 * share the word "Organization" so the broad hub/homepage carousel
 * (`findTransformationsByCategory("organization")`) surfaces all of them,
 * while each room page's narrower call (e.g. `"pantry"`) matches only its
 * own room via substring — see findTransformationsByCategory below.
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

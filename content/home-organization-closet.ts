import type { ContentSlot, HeroPriceData, ServiceDetailSection, CTAData } from "@/lib/types";
import { ORGANIZATION_QUOTE_CTA } from "@/content/navigation";
import { KIM_NELSON } from "@/content/testimonials";

/** Final approved copy for the dedicated Closet Organization page,
 *  provided directly by the client. No process/steps content was given
 *  for this room, so this page has no process section. */

const CLOSET_CTA: CTAData = { label: "Start Your Closet Quote", href: `${ORGANIZATION_QUOTE_CTA.href}?space=closet-organization` };

export const CLOSET_SEO = {
  title: "Closet Organization Services | Elevated Home Resets",
  description:
    "Professional closet organization for reach-in closets, walk-ins, and larger dressing spaces. Elevated Home Resets serves Northern Virginia and Fredericksburg.",
};

export const CLOSET_HERO: ContentSlot = {
  eyebrow: "Closet Organization",
  heading: "Make getting dressed easier before the day even starts.",
  body: "Bring order and function back to a closet that has become crowded, difficult to navigate, or harder to maintain.",
  primaryCTA: CLOSET_CTA,
  secondaryCTA: { label: "View Closet Pricing", href: "#pricing" },
};

export const CLOSET_HERO_PRICE: HeroPriceData = {
  label: "Starting-price guidance from $300",
};

export const CLOSET_SECTIONS: ServiceDetailSection[] = [
  {
    type: "statement",
    slot: {
      heading: "Your closet can hold everything and still not work.",
      body: "When clothing, shoes, accessories, and everyday items compete for the same space, finding what you need becomes harder.\n\nThings disappear behind other things. Surfaces become storage. The floor fills up. Putting something away requires moving something else first.\n\nA Closet Reset is designed to bring greater structure back to the space.",
      primaryCTA: CLOSET_CTA,
    },
  },
  {
    type: "statement",
    slot: {
      heading: "See more of what you have. Use more of your space.",
      body: "Organization should make the closet easier to navigate and easier to use—not simply make everything look neat for a day.\n\nWe focus on creating greater order and function within the closet you already have.",
      primaryCTA: CLOSET_CTA,
      media: {
        type: "image",
        src: "/images/organization/walk-in-closet.jpg",
        alt: "A walk-in closet with clothing sorted by type and color, drawers, and shoe shelving",
        variant: "landscape",
      },
    },
  },
  {
    type: "pricing",
    items: [
      { label: "Small / Reach-In Closet", priceLabel: "Starting-price guidance: $300" },
      { label: "Large Reach-In Closet", priceLabel: "Starting-price guidance: $300" },
      { label: "Walk-In Closet", priceLabel: "Starting-price guidance: $400" },
      { label: "Large Walk-In Closet", priceLabel: "Starting-price guidance: $500" },
      { label: "Dressing Room / Oversized Closet", priceLabel: "Starting-price guidance: $600" },
    ],
    disclaimer: "Final project price is determined by quote.",
    cta: { label: "Request Your Closet Quote", href: `${ORGANIZATION_QUOTE_CTA.href}?space=closet-organization` },
  },
  {
    type: "statement",
    reverseMedia: false,
    slot: {
      body: "When appropriate shelving and accessible surfaces are emptied during the organization process, light wiping or vacuuming of those accessible areas is included before belongings are returned.",
      media: {
        type: "image",
        src: "/images/services/closet-organization-4.jpg",
        alt: "Closet shelving with hat boxes and neatly hung clothing",
        variant: "landscape",
      },
    },
  },
  {
    type: "statement",
    slot: {
      body: "Hangers, bins, baskets, drawer dividers, shelving, and other customer organization products are not included in the base project price and are additional when used.",
    },
  },
];

export const CLOSET_PROOF = {
  eyebrow: "What Clients Say",
  heading: "From overwhelmed to easy to live with.",
  primary: { quote: KIM_NELSON.quotes.overwhelm, attribution: KIM_NELSON.name, rating: KIM_NELSON.rating },
  secondary: { quote: KIM_NELSON.quotes.system, attribution: KIM_NELSON.name },
};

export const CLOSET_FINAL_CTA: ContentSlot = {
  heading: "Stop fighting your closet.",
  body: "Show us the space as it is and start creating one that works better.",
  primaryCTA: CLOSET_CTA,
};

import type { ContentSlot, HeroPriceData, ServiceDetailSection, CTAData } from "@/lib/types";
import type { ProcessStep } from "@/components/content/Process";
import { ESTIMATE_CTA } from "@/content/navigation";

/** Final approved copy for the dedicated Kitchen Organization page,
 *  provided directly by the client. */

const KITCHEN_CTA: CTAData = { label: "Start Your Kitchen Estimate", href: ESTIMATE_CTA.href };

export const KITCHEN_SEO = {
  title: "Kitchen Organization Services | Elevated Home Resets",
  description:
    "Professional kitchen organization designed to create more functional cabinets, drawers, storage, and everyday spaces. Serving Northern Virginia and Fredericksburg.",
};

export const KITCHEN_HERO: ContentSlot = {
  eyebrow: "Kitchen Organization",
  heading: "Make your kitchen easier to use every day.",
  body: "Thoughtful kitchen organization brings greater order and function to the cabinets, drawers, storage, and everyday items at the center of your home.",
  primaryCTA: KITCHEN_CTA,
  secondaryCTA: { label: "View Kitchen Pricing", href: "#pricing" },
};

export const KITCHEN_HERO_PRICE: HeroPriceData = {
  label: "Starting-price guidance from $300",
};

export const KITCHEN_SECTIONS: ServiceDetailSection[] = [
  {
    type: "statement",
    slot: {
      heading: "When everything has a place—but none of the places make sense.",
      body: "A kitchen can have plenty of cabinets and still be frustrating to use.\n\nEveryday items get buried. Drawers become catchalls. Storage gets crowded. Things end up wherever they fit rather than where they're easiest to use.\n\nKitchen organization is about looking at how the space is functioning and bringing more intention to it.",
    },
  },
  {
    type: "statement",
    slot: {
      heading: "Less searching. Less shifting. A kitchen that works better.",
      body: "The goal is not to create someone else's version of a perfect kitchen.\n\nIt's to create greater order within yours.\n\nWe focus on making the storage and organization of the kitchen more functional for the belongings and space you actually have.",
    },
  },
  {
    type: "pricing",
    items: [
      { label: "Compact Kitchen", priceLabel: "Starting-price guidance: $300" },
      { label: "Standard Kitchen", priceLabel: "Starting-price guidance: $400" },
      { label: "Large Kitchen", priceLabel: "Starting-price guidance: $500" },
      { label: "Oversized Kitchen", priceLabel: "Starting-price guidance: $600" },
    ],
    disclaimer: "Final organization projects are quote-required.",
    cta: { label: "Request Your Kitchen Estimate", href: ESTIMATE_CTA.href },
  },
  {
    type: "statement",
    slot: {
      heading: "Emptying a cabinet shouldn't mean putting everything back onto a dirty shelf.",
      body: "Light cleaning of the accessible space being organized is included.\n\nWhen appropriate cabinets, drawers, shelving, and other storage areas are emptied during the organization process, accessible surfaces can be wiped or vacuumed before belongings are returned.",
    },
  },
  {
    type: "statement",
    slot: {
      body: "Organization addresses how the space works.\n\nIf your kitchen—or the rest of your home—also needs professional cleaning, Standard Clean or Deep Premium Clean can be added separately.",
      primaryCTA: { label: "Explore Cleaning Services", href: "/cleaning" },
    },
  },
];

export const KITCHEN_PROCESS_STEPS: ProcessStep[] = [
  { heading: "Tell us about your kitchen.", description: "Share the requested project information and photos." },
  { heading: "We determine the scope.", description: "Your quote reflects the kitchen size/type and project information provided." },
  {
    heading: "Reserve the project.",
    description: "A 50% deposit reserves your project after the quote is accepted. The remaining 50% is due after completion.",
  },
  {
    heading: "Your two-person team resets the space.",
    description: "We work through the organization project with function and everyday usability in mind.",
  },
];

export const KITCHEN_FINAL_CTA: ContentSlot = {
  heading: "Your kitchen should work as hard as you do.",
  body: "Show us what isn't working and start your Kitchen Reset.",
  primaryCTA: KITCHEN_CTA,
};

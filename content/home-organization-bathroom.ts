import type { ContentSlot, HeroPriceData, ServiceDetailSection, CTAData } from "@/lib/types";
import { ORGANIZATION_QUOTE_CTA } from "@/content/navigation";
import { KIM_NELSON } from "@/content/testimonials";

/** Final approved copy for the dedicated Bathroom Organization page,
 *  provided directly by the client. No process/steps content was given
 *  for this room, so this page has no process section. */

const BATHROOM_CTA: CTAData = { label: "Start Your Bathroom Quote", href: `${ORGANIZATION_QUOTE_CTA.href}?space=bathroom-organization` };

export const BATHROOM_SEO = {
  title: "Bathroom Organization Services | Elevated Home Resets",
  description: "Professional bathroom organization for vanities, cabinets, drawers, and bathroom storage. Serving Northern Virginia and Fredericksburg.",
};

export const BATHROOM_HERO: ContentSlot = {
  eyebrow: "Bathroom Organization",
  heading: "Bring order to the things you reach for every day.",
  body: "Create a more functional setup for toiletries, personal-care products, bathroom storage, and the everyday items competing for space.",
  primaryCTA: BATHROOM_CTA,
  secondaryCTA: { label: "View Bathroom Pricing", href: "#pricing" },
};

export const BATHROOM_HERO_PRICE: HeroPriceData = {
  label: "Starting-price guidance from $300",
};

export const BATHROOM_SECTIONS: ServiceDetailSection[] = [
  {
    type: "statement",
    slot: {
      heading: "Small spaces can create a lot of clutter.",
      body: "Bathroom counters fill quickly.\n\nProducts collect in drawers and cabinets. Everyday essentials get mixed with things you rarely use. Storage becomes harder to navigate as more gets added.\n\nA Bathroom Reset brings greater intention to the storage you rely on every day.",
    },
  },
  {
    type: "statement",
    slot: {
      heading: "Less visual noise. More functional storage.",
      body: "The goal is to make bathroom storage easier to use and maintain within the space you already have.\n\nInstead of simply moving clutter out of sight, we focus on bringing greater order to the areas where your belongings actually live.",
      media: { type: "image", alt: "An organized bathroom vanity drawer with everyday products in place", variant: "landscape" },
    },
  },
  {
    type: "pricing",
    items: [
      { label: "Standard Bathroom Storage", priceLabel: "Starting-price guidance: $300" },
      { label: "Primary Bathroom", priceLabel: "Starting-price guidance: $300" },
      { label: "Large Primary Bathroom", priceLabel: "Starting-price guidance: $400" },
      { label: "Oversized / Extensive Bathroom Storage", priceLabel: "Starting-price guidance: $500" },
    ],
    disclaimer: "Final price is determined by project quote.",
    cta: { label: "Request Your Bathroom Quote", href: `${ORGANIZATION_QUOTE_CTA.href}?space=bathroom-organization` },
  },
  {
    type: "statement",
    slot: {
      body: "When appropriate vanity drawers, cabinets, shelving, and other storage surfaces are emptied during organization, accessible surfaces can be lightly cleaned before belongings are returned.",
    },
  },
];

export const BATHROOM_PROOF = {
  eyebrow: "What Clients Say About Home Organization",
  primary: { quote: KIM_NELSON.quotes.system, attribution: KIM_NELSON.name, rating: KIM_NELSON.rating },
  media: { type: "single" as const, image: { type: "image" as const, alt: "A completed bathroom organization project", variant: "portrait" as const, aspectRatio: "4 / 5" } },
};

export const BATHROOM_FINAL_CTA: ContentSlot = {
  heading: "Make your everyday routine easier to navigate.",
  body: "Start with the bathroom you actually use and let's bring more order to it.",
  primaryCTA: BATHROOM_CTA,
};

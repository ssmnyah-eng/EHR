import type { ContentSlot, HeroPriceData, ServiceDetailSection, CTAData } from "@/lib/types";
import { ORGANIZATION_QUOTE_CTA } from "@/content/navigation";
import { KIM_NELSON } from "@/content/testimonials";

/** Final approved copy for the dedicated Garage Organization page,
 *  provided directly by the client. No process/steps content was given
 *  for this room, so this page has no process section. Preserves the
 *  approved scope boundary: this is professional organization, not
 *  junk/hazmat/hoarding cleanup. */

const GARAGE_CTA: CTAData = { label: "Start Your Garage Quote", href: `${ORGANIZATION_QUOTE_CTA.href}?space=garage-organization` };

export const GARAGE_SEO = {
  title: "Garage Organization Services | Elevated Home Resets",
  description: "Professional garage organization for 1-car, 2-car, 3-car, and oversized garages. Serving Northern Virginia and Fredericksburg.",
};

export const GARAGE_HERO: ContentSlot = {
  eyebrow: "Garage Organization",
  heading: "Reclaim the space that became the place for everything.",
  body: "Bring greater order and function to garage storage and the belongings that have accumulated there.",
  primaryCTA: GARAGE_CTA,
  secondaryCTA: { label: "View Garage Pricing", href: "#pricing" },
};

export const GARAGE_HERO_PRICE: HeroPriceData = {
  label: "Starting-price guidance from $400",
};

export const GARAGE_SECTIONS: ServiceDetailSection[] = [
  {
    type: "statement",
    slot: {
      heading: "“Put it in the garage” works—until it doesn't.",
      body: "Boxes arrive.\n\nSeasonal items accumulate.\n\nTools, household supplies, equipment, and things without another obvious home all compete for the same space.\n\nEventually the garage can become difficult to navigate, difficult to maintain, and harder to use for what you actually need it for.",
      primaryCTA: GARAGE_CTA,
      media: {
        type: "image",
        src: "/images/services/garage-organization-2.jpg",
        alt: "A cluttered garage workshop with tools and supplies competing for space",
        variant: "landscape",
      },
    },
  },
  {
    type: "statement",
    slot: {
      heading: "Turn overflow back into usable space.",
      body: "A Garage Reset focuses on bringing greater structure to the belongings and storage within the garage so the space can function more intentionally.\n\nThis is professional organization—not junk hauling or extreme-condition cleanup.",
      primaryCTA: GARAGE_CTA,
      media: {
        type: "image",
        src: "/images/services/garage-organization-1.jpg",
        alt: "An organized garage storage wall with labeled bins and clear floor space",
        variant: "landscape",
      },
    },
  },
  {
    type: "pricing",
    items: [
      { label: "1-Car Garage", priceLabel: "Starting-price guidance: $400" },
      { label: "2-Car Garage", priceLabel: "Starting-price guidance: $500" },
      { label: "3-Car Garage", priceLabel: "Starting-price guidance: $600" },
      { label: "Oversized / 3+ Car Garage", priceLabel: "Starting-price guidance: $700+" },
    ],
    disclaimer: "Final pricing is quote-required and based on project scope.",
    cta: { label: "Request Your Garage Quote", href: `${ORGANIZATION_QUOTE_CTA.href}?space=garage-organization` },
  },
  {
    type: "statement",
    slot: {
      body: "Garage Organization does not currently include large-volume junk removal, donation hauling, garage haul-away, hazardous/biohazard cleanup, or extreme-condition/hoarding cleanup.\n\nThose services should not be assumed as part of a Garage Reset.",
    },
  },
];

export const GARAGE_PROOF = {
  eyebrow: "What Clients Say About Home Organization",
  primary: { quote: KIM_NELSON.quotes.system, attribution: KIM_NELSON.name, rating: KIM_NELSON.rating },
};

export const GARAGE_FINAL_CTA: ContentSlot = {
  heading: "Ready to use your garage differently?",
  body: "Show us the space as it is. We'll use that information to determine the appropriate organization project.",
  primaryCTA: GARAGE_CTA,
};

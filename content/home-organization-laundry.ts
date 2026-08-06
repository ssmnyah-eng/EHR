import type { ContentSlot, HeroPriceData, ServiceDetailSection, CTAData } from "@/lib/types";
import { ORGANIZATION_QUOTE_CTA } from "@/content/navigation";
import { KIM_NELSON } from "@/content/testimonials";

/** Final approved copy for the dedicated Laundry Room Organization page,
 *  provided directly by the client. No process/steps content was given
 *  for this room, so this page has no process section. */

const LAUNDRY_CTA: CTAData = { label: "Start Your Laundry Room Quote", href: `${ORGANIZATION_QUOTE_CTA.href}?space=laundry-room-organization` };

export const LAUNDRY_SEO = {
  title: "Laundry Room Organization Services | Elevated Home Resets",
  description:
    "Professional laundry room organization for compact laundry areas, full laundry rooms, mudrooms, and utility storage in Northern Virginia and Fredericksburg.",
};

export const LAUNDRY_HERO: ContentSlot = {
  eyebrow: "Laundry Room Organization",
  heading: "Make a hardworking room easier to work in.",
  body: "Bring order and function to laundry supplies, household storage, utility areas, and the everyday items that tend to collect around one of the busiest spaces in the home.",
  primaryCTA: LAUNDRY_CTA,
  secondaryCTA: { label: "View Laundry Room Pricing", href: "#pricing" },
};

export const LAUNDRY_HERO_PRICE: HeroPriceData = {
  label: "Starting-price guidance from $300",
};

export const LAUNDRY_SECTIONS: ServiceDetailSection[] = [
  {
    type: "statement",
    slot: {
      heading: "Laundry rooms have a way of becoming storage for everything else.",
      body: "Cleaning supplies. Household extras. Bags. Linens. Utility items. Things waiting to be put somewhere else.\n\nWhen too many jobs compete for one space, even doing the laundry becomes harder than it needs to be.",
      primaryCTA: LAUNDRY_CTA,
    },
  },
  {
    type: "statement",
    slot: {
      heading: "Give the room a clearer job.",
      body: "A Laundry Room Reset focuses on creating greater order within the storage and space you already have so the room can function more intentionally.\n\nFor combined laundry and mudroom spaces, the project can account for the broader way the room is being used.",
      primaryCTA: LAUNDRY_CTA,
      media: {
        type: "image",
        src: "/images/services/laundry-room-organization-2.jpg",
        alt: "Laundry baskets filled with towels and linens in a bedroom",
        variant: "landscape",
      },
    },
  },
  {
    type: "pricing",
    items: [
      { label: "Laundry Closet / Compact Laundry", priceLabel: "Starting-price guidance: $300" },
      { label: "Standard Laundry Room", priceLabel: "Starting-price guidance: $300" },
      { label: "Large Laundry Room", priceLabel: "Starting-price guidance: $400" },
      { label: "Laundry + Mudroom", priceLabel: "Starting-price guidance: $500" },
      { label: "Oversized Laundry / Household Utility Room", priceLabel: "Starting-price guidance: $600" },
    ],
    disclaimer: "Final project pricing is quote-required.",
    cta: { label: "Request Your Laundry Room Quote", href: `${ORGANIZATION_QUOTE_CTA.href}?space=laundry-room-organization` },
  },
  {
    type: "statement",
    slot: {
      body: "Accessible shelves, cabinets, and other appropriate surfaces emptied during organization can be lightly wiped or vacuumed before belongings are returned.",
    },
  },
];

export const LAUNDRY_PROOF = {
  eyebrow: "What Clients Say About Home Organization",
  primary: { quote: KIM_NELSON.quotes.system, attribution: KIM_NELSON.name, rating: KIM_NELSON.rating },
};

export const LAUNDRY_FINAL_CTA: ContentSlot = {
  heading: "Make the room behind the chores feel like less of a chore.",
  body: "Show us what isn't working and start your Laundry Room Reset.",
  primaryCTA: LAUNDRY_CTA,
};

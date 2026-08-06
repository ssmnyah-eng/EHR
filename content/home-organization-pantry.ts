import type { ContentSlot, HeroPriceData, ServiceDetailSection, CTAData } from "@/lib/types";
import type { ProcessStep } from "@/components/content/Process";
import { ORGANIZATION_QUOTE_CTA } from "@/content/navigation";
import { LASHON_PATTERSON } from "@/content/testimonials";

/** Final approved copy for the dedicated Pantry Organization page,
 *  provided directly by the client. */

const PANTRY_CTA: CTAData = { label: "Start Your Pantry Quote", href: `${ORGANIZATION_QUOTE_CTA.href}?space=pantry-organization` };

export const PANTRY_SEO = {
  title: "Pantry Organization Services | Elevated Home Resets",
  description:
    "Professional pantry organization from Elevated Home Resets. Create a pantry that feels more ordered, functional, and easier to use. Serving Northern Virginia and Fredericksburg.",
};

export const PANTRY_HERO: ContentSlot = {
  eyebrow: "Pantry Organization",
  heading: "Stop searching through your pantry. Start using it.",
  body: "A thoughtfully organized pantry makes it easier to see what you have, reach what you need, and use the space you already have more intentionally.",
  primaryCTA: PANTRY_CTA,
  secondaryCTA: { label: "View Pantry Pricing", href: "#pricing" },
};

export const PANTRY_HERO_PRICE: HeroPriceData = {
  label: "Starting-price guidance from $300",
};

export const PANTRY_SECTIONS: ServiceDetailSection[] = [
  {
    type: "statement",
    slot: {
      eyebrow: "When the Pantry Stops Working",
      heading: "A full pantry isn't always a functional pantry.",
      body: "Food gets pushed behind other food. Categories disappear. Shelves become crowded. Everyday items end up wherever there was room.\n\nEventually, simply finding something can mean moving everything around it.\n\nPantry organization brings structure back to the space so it makes more sense for everyday use.",
      primaryCTA: PANTRY_CTA,
    },
  },
  {
    type: "statement",
    slot: {
      heading: "Open the door and know where to look.",
      body: "The goal isn't a pantry that only looks good in a photograph.\n\nIt's a pantry that feels more ordered, easier to navigate, and better suited to the way your household actually uses it.\n\nWe work with the space and belongings you have to create a more intentional setup.",
      primaryCTA: PANTRY_CTA,
      media: {
        type: "image",
        src: "/images/organization/pantry.jpg",
        alt: "A comprehensive organized pantry with labeled shelving for cookware, appliances, and pantry staples",
        variant: "landscape",
        objectPosition: "center 45%",
      },
    },
  },
  {
    type: "pricing",
    eyebrow: "Pantry Starting Prices",
    items: [
      { label: "Cabinet Pantry", priceLabel: "Starting-price guidance: $300" },
      { label: "Reach-In Pantry", priceLabel: "Starting-price guidance: $300" },
      { label: "Walk-In Pantry", priceLabel: "Starting-price guidance: $400" },
      { label: "Large Walk-In Pantry", priceLabel: "Starting-price guidance: $500" },
      { label: "Oversized / Butler's Pantry", priceLabel: "Starting-price guidance: $600" },
    ],
    disclaimer:
      "Organization projects are quote-required. These prices are starting guidance based on pantry type and size rather than guaranteed checkout prices.",
    cta: { label: "Request Your Pantry Quote", href: `${ORGANIZATION_QUOTE_CTA.href}?space=pantry-organization` },
  },
  {
    type: "statement",
    slot: {
      heading: "We don't organize onto dirty shelves.",
      body: "Light cleaning of the accessible area being organized is included.\n\nWhen pantry shelves and other appropriate surfaces are emptied as part of the organization process, accessible surfaces can be wiped or vacuumed before belongings are returned.",
    },
  },
  {
    type: "statement",
    slot: {
      heading: "What about bins, baskets, and containers?",
      body: "Organizing products are not automatically built into your project price.\n\nBins, baskets, containers, turntables, jars, shelving, specialty labels, and similar customer-owned organization products are additional costs when used.\n\nThat means the project doesn't begin with the assumption that your pantry needs to be filled with new products.",
    },
  },
];

export const PANTRY_PROCESS_STEPS: ProcessStep[] = [
  { heading: "Show us your pantry.", description: "Provide the requested information and photos so we can understand the space." },
  { heading: "Receive your project quote.", description: "Your project price is determined from the pantry type, size, and scope." },
  {
    heading: "Reserve your reset.",
    description: "A 50% deposit is required when you accept the quote and book the project. The remaining 50% is due after completion.",
  },
  {
    heading: "Let us reset the space.",
    description: "Your two-person organizing team completes the project with a focus on order and everyday function.",
  },
];

export const PANTRY_PROOF = {
  eyebrow: "Real Home. Real System.",
  heading: "Designed for what happens after we leave.",
  body: "A pantry can look beautiful on day one. The real test is whether the system makes sense when groceries come in, family members use it, and everyday life starts happening again.\n\nThat's why our Pantry Organization service focuses on creating clear homes for what you keep and a system built around how the space is actually used.",
  primary: { quote: LASHON_PATTERSON.quotes.maintainability, attribution: LASHON_PATTERSON.name, rating: LASHON_PATTERSON.rating },
  secondary: { quote: LASHON_PATTERSON.quotes.largeFamily, attribution: LASHON_PATTERSON.name },
};

export const PANTRY_FINAL_CTA: ContentSlot = {
  heading: "Ready for a pantry that makes more sense?",
  body: "Start with the space you actually have. We'll help turn it into one that's easier to use.",
  primaryCTA: PANTRY_CTA,
};

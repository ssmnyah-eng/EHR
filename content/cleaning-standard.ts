import type { ContentSlot, HeroPriceData, ServiceDetailSection, ServiceSnapshotData, ChecklistSection, CTAData } from "@/lib/types";
import { BOOK_CLEANING_CTA } from "@/content/navigation";

/** Final approved copy for the Standard Clean detail + "What's Included"
 *  pages, provided directly by the client. */

const BOOK_CTA: CTAData = { label: "Book Your Standard Clean", href: `${BOOK_CLEANING_CTA.href}?service=standard-clean` };

export const STANDARD_CLEAN_HERO: ContentSlot = {
  eyebrow: "Standard Clean",
  heading: "Keep your home feeling clean, comfortable, and cared for.",
  body: "A detailed maintenance clean for homes that need consistent professional care—with more attention to the finishing details than a basic surface clean.",
  primaryCTA: BOOK_CTA,
  secondaryCTA: { label: "See What's Included", href: "/cleaning/standard-clean/whats-included" },
};

export const STANDARD_CLEAN_PRICE: HeroPriceData = {
  label: "Starting at $140",
  note: "Starting service includes 2+ labor-hours. Final pricing depends on the time and scope required for your home.",
};

export const STANDARD_CLEAN_SECTIONS: ServiceDetailSection[] = [
  {
    type: "statement",
    slot: {
      eyebrow: "Everyday Maintenance, Elevated",
      heading: "When your home needs upkeep—not a complete overhaul.",
      body: "The Standard Clean is designed to maintain your home and take routine cleaning off your plate.\n\nWe take care of the essential cleaning throughout your kitchen, bathrooms, bedrooms, living areas, hallways, stairs, and other serviced spaces, while also paying attention to details that can easily get missed during everyday upkeep.\n\nIt's the starting point for keeping a home consistently refreshed and easier to maintain.",
    },
  },
  {
    type: "statement",
    slot: {
      eyebrow: "What It Takes Off Your Plate",
      heading: "Less time catching up. More time enjoying your home.",
      body: "Counters cleaned. Bathrooms refreshed. Floors cared for. Dust addressed. Beds straightened. High-touch areas cleaned. Everyday surfaces brought back to a fresh baseline.\n\nThe goal isn't simply to check off chores.\n\nIt's to leave your home feeling noticeably cared for when you walk back into it.",
    },
  },
  {
    type: "statement",
    slot: {
      eyebrow: "Compare Your Options",
      heading: "Has routine cleaning stopped being enough?",
      body: "If your home has more accumulated buildup or needs detailed attention in areas that aren't typically addressed during maintenance cleaning, our Deep Premium Clean may be the better fit.",
      primaryCTA: { label: "Explore Deep Premium Clean", href: "/cleaning/deep-premium-clean" },
    },
  },
];

export const STANDARD_CLEAN_SNAPSHOT: ServiceSnapshotData = {
  priceLabel: "Starting at $140",
  laborNote: "Starting labor: 2+ labor-hours",
  description:
    "Standard Clean includes professional cleaning throughout the primary areas of your home, including kitchens, bathrooms, bedrooms, living areas, entryways, hallways, and stairs within the service scope.\n\nWant to see exactly what we clean?",
  cta: { label: "See Everything Included", href: "/cleaning/standard-clean/whats-included" },
};

export const STANDARD_CLEAN_FINAL_CTA: ContentSlot = {
  heading: "Ready to take routine cleaning off your list?",
  body: "Choose your Standard Clean and start with a home that feels fresh, maintained, and easier to keep up with.",
  primaryCTA: BOOK_CTA,
};

export const STANDARD_CLEAN_INCLUDED_HEADING = "What's Included in a Standard Clean";
export const STANDARD_CLEAN_INCLUDED_INTRO = "A room-by-room look at what we take care of during your Standard Clean.";

export const STANDARD_CLEAN_INCLUDED_SECTIONS: ChecklistSection[] = [
  {
    heading: "Kitchen",
    items: [
      "Clean countertops",
      "Clean accessible backsplash",
      "Clean sink basin",
      "Detail exterior faucet base",
      "Clean stovetop",
      "Clean microwave inside and outside",
      "Wipe refrigerator exterior",
      "Wipe dishwasher exterior",
      "Wipe range/oven exterior",
      "Wipe appliance handles",
      "Wipe cabinet and drawer fronts as needed",
      "Clean cabinet pulls",
      "Clean table",
      "Wipe accessible chairs and stools",
      "Remove visible fingerprints and smudges",
      "Empty trash",
      "Replace liner when provided",
      "Vacuum or sweep floors",
      "Mop floors",
      "Clean under easily lifted floor mats",
      "Clean accessible floor around trash can",
    ],
  },
  {
    heading: "Bathrooms",
    items: [
      "Clean toilet bowl",
      "Clean toilet seat and lid",
      "Clean toilet exterior and base",
      "Detail exterior toilet-seat hinges",
      "Clean tub",
      "Clean shower",
      "Clean shower glass",
      "Clean sink",
      "Detail exterior faucet base",
      "Clean vanity countertop",
      "Clean mirror",
      "Wipe cabinet fronts as needed",
      "Clean cabinet pulls",
      "Clean high-touch surfaces",
      "Remove visible and easily accessible hair from shower/tub drain area",
      "Remove visible and easily accessible hair around sink stopper",
      "Lift bath mats and clean underneath",
      "Empty trash",
      "Vacuum or sweep floors",
      "Mop floors",
    ],
  },
  {
    heading: "Bedrooms",
    items: [
      "Dust accessible surfaces",
      "Dust nightstands",
      "Dust dresser tops",
      "Clean mirrors",
      "Remove obvious fingerprints",
      "Make bed with existing bedding",
      "Empty trash",
      "Vacuum floors",
      "Mop hard floors",
      "Vacuum accessible floor around bed",
    ],
  },
  {
    heading: "Living & Family Areas",
    items: [
      "Dust accessible surfaces",
      "Dust tables",
      "Dust shelving",
      "Dust accessible décor",
      "Clean mirrors",
      "Remove obvious fingerprints",
      "Vacuum accessible sofa crevices",
      "Lightly straighten sofa cushions",
      "Vacuum rugs and carpet",
      "Mop hard floors",
      "Empty trash",
    ],
  },
  {
    heading: "Entryways, Hallways & Stairs",
    items: [
      "Dust accessible surfaces",
      "Clean mirrors",
      "Remove obvious fingerprints",
      "Vacuum stairs",
      "Vacuum or sweep floors",
      "Mop hard floors",
      "Clean underneath easily lifted mats",
    ],
  },
  {
    heading: "Throughout the Home",
    items: [
      "Dust accessible surfaces",
      "Dust accessible window sills",
      "Light baseboard dusting as needed",
      "Clean high-touch door handles",
      "Clean light switches and plates as needed",
      "Vacuum carpets and rugs",
      "Vacuum normal floor edges",
      "Mop hard floors",
      "Empty designated trash",
    ],
  },
];

export const STANDARD_CLEAN_GOOD_TO_KNOW =
  "Accessible drain cleaning means removal of visible and easily accessible hair only. It does not include plumbing disassembly, drain snaking, or drain repair.";

export const STANDARD_CLEAN_INCLUDED_CTA: CTAData = BOOK_CTA;

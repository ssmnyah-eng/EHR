import type { ContentSlot, HeroPriceData, ServiceDetailSection, ServiceSnapshotData, ChecklistSection, CTAData } from "@/lib/types";
import { ESTIMATE_CTA } from "@/content/navigation";

/** Final approved copy for the Elevated Reset Clean detail + "What's
 *  Included" pages, provided directly by the client. */

const BOOK_CTA: CTAData = { label: "Book Your Elevated Reset", href: ESTIMATE_CTA.href };

export const ELEVATED_RESET_CLEAN_HERO: ContentSlot = {
  eyebrow: "Elevated Reset Clean",
  heading: "Cleaned deeply. Reset intentionally. Finished differently.",
  body: "Our most comprehensive cleaning experience combines Deep Premium cleaning with an intentional reset of your home afterward—so the space doesn't just feel cleaner. It feels put back together.",
  primaryCTA: BOOK_CTA,
  secondaryCTA: { label: "See What's Included", href: "/cleaning/elevated-reset-clean/whats-included" },
};

export const ELEVATED_RESET_CLEAN_PRICE: HeroPriceData = {
  label: "Starting at $400",
  note: "Starting service includes 6+ labor-hours and a two-cleaner team.",
};

export const ELEVATED_RESET_CLEAN_SECTIONS: ServiceDetailSection[] = [
  {
    type: "statement",
    slot: {
      eyebrow: "More Than a Deep Clean",
      heading: "Because sometimes you don't just want it cleaned. You want it reset.",
      body: "Elevated Reset begins with everything included in Standard and Deep Premium cleaning.\n\nThen we take one more step.\n\nBefore we leave, we intentionally reset the spaces we've serviced using the organization your home already has—straightening, returning everyday items to their established places, resetting surfaces, arranging pillows and throws, tending to beds and towels, and completing a final presentation walkthrough.\n\nThe result is a home that feels intentionally finished.",
    },
  },
  {
    type: "statement",
    slot: {
      eyebrow: "What \"Reset\" Means",
      heading: "The finishing touches change the experience.",
      body: "After the deeper cleaning is complete, we turn our attention to how the home is put back together.\n\nCountertops are reset.\n\nEveryday items are returned neatly to their established homes.\n\nBeds and pillows are finished.\n\nTowels and bath areas are straightened.\n\nLiving spaces are reset.\n\nRugs, mats, chairs, throws, and obvious visual disorder receive a final look before we leave.\n\nIt's the difference between finishing the cleaning and finishing the room.",
    },
  },
  {
    type: "statement",
    slot: {
      eyebrow: "Important Distinction",
      heading: "Resetting isn't organizing—and that's intentional.",
      body: "Elevated Reset uses the organization and storage systems your home already has.\n\nIf you need help deciding where belongings should live, sorting possessions, creating new systems, or reorganizing an entire space, that falls under our Home Organization services.",
      primaryCTA: { label: "Explore Home Organization", href: "/home-organization" },
    },
  },
];

export const ELEVATED_RESET_CLEAN_SNAPSHOT: ServiceSnapshotData = {
  priceLabel: "Starting at $400",
  laborNote: "Starting labor: 6+ labor-hours",
  staffingNote: "Staffing: Two-cleaner team",
  description: "Includes the complete Standard Clean + Deep Premium Clean scope, followed by an intentional reset of the serviced areas.",
  cta: { label: "See Everything Included", href: "/cleaning/elevated-reset-clean/whats-included" },
};

export const ELEVATED_RESET_CLEAN_FINAL_CTA: ContentSlot = {
  heading: "Come back to a home that feels finished.",
  body: "When you want more than a clean surface—and more than a deep clean—choose the service designed to bring the whole space back together.",
  primaryCTA: BOOK_CTA,
};

export const ELEVATED_RESET_CLEAN_INCLUDED_HEADING = "What's Included in an Elevated Reset Clean";
export const ELEVATED_RESET_CLEAN_INCLUDED_INTRO =
  "Everything included in Standard Clean and Deep Premium Clean, followed by an intentional reset using your home's existing organization.";

export const ELEVATED_RESET_CLEAN_INCLUDED_SECTIONS: ChecklistSection[] = [
  {
    heading: "Kitchen Reset",
    items: [
      "Reset countertops after cleaning",
      "Return everyday countertop items neatly",
      "Group obvious related items",
      "Reset sink area",
      "Reset soap/dispenser area",
      "Straighten an existing coffee station",
      "Neatly reset dish towels",
      "Reset table and chairs",
      "Return obvious everyday items to established homes",
    ],
  },
  {
    heading: "Bathroom Reset",
    items: [
      "Return shower products neatly",
      "Reset shower niches and shelves",
      "Straighten vanity products",
      "Return toiletries neatly",
      "Reset soap/toothbrush area",
      "Reset hand towels",
      "Straighten bath towels",
      "Reset bath mats",
      "Reset toilet-paper presentation",
      "Return obvious everyday items to established locations",
    ],
  },
  {
    heading: "Bedroom Reset",
    items: [
      "Carefully make bed",
      "Arrange pillows",
      "Straighten bedding",
      "Fold or arrange throw",
      "Reset nightstand",
      "Straighten visible surfaces",
      "Return obvious everyday items to their established homes",
      "Straighten shoes within an established shoe area",
      "Reset overall room presentation",
    ],
  },
  {
    heading: "Living Room Reset",
    items: [
      "Reset sofa cushions",
      "Arrange pillows",
      "Fold or arrange throws",
      "Reset coffee table",
      "Reset side tables",
      "Return remotes to obvious location",
      "Straighten books and magazines",
      "Return obvious everyday items to established homes",
      "Reset décor after cleaning",
    ],
  },
  {
    heading: "Entryway Reset",
    items: [
      "Straighten shoes within designated area",
      "Reset entry mat",
      "Reset entry console",
      "Return obvious items to established locations",
      "Straighten coats and bags when designated storage already exists",
    ],
  },
  {
    heading: "Final Whole-Home Reset",
    intro: "Before leaving, we complete a final presentation walkthrough:",
    items: [
      "Straighten rugs and mats",
      "Align chairs",
      "Reset pillows",
      "Fold throws",
      "Check beds",
      "Check towels",
      "Check countertops",
      "Straighten obvious visual disorder",
      "Return obvious everyday objects to established homes",
      "Make sure each serviced room feels intentionally finished",
    ],
  },
];

export const ELEVATED_RESET_CLEAN_GOOD_TO_KNOW_HEADING = "What Resetting Does Not Include";
export const ELEVATED_RESET_CLEAN_GOOD_TO_KNOW =
  "Resetting works with your home's existing organization.\n\nCreating new organization systems, sorting possessions, decluttering, or deciding where belongings should live is a Home Organization service.";

export const ELEVATED_RESET_CLEAN_INCLUDED_CTA: CTAData = BOOK_CTA;

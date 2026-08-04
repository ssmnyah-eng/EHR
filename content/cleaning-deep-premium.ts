import type { ContentSlot, HeroPriceData, ServiceDetailSection, ServiceSnapshotData, ChecklistSection, CTAData, InclusionsIntroSegment } from "@/lib/types";
import { BOOK_CLEANING_CTA } from "@/content/navigation";

/** Final approved copy for the Deep Premium Clean detail + "What's
 *  Included" pages, provided directly by the client. */

const BOOK_CTA: CTAData = { label: "Book Your Deep Premium Clean", href: `${BOOK_CLEANING_CTA.href}?service=deep-premium-clean` };

export const DEEP_PREMIUM_CLEAN_HERO: ContentSlot = {
  eyebrow: "Deep Premium Clean",
  heading: "When your home needs more than routine cleaning.",
  body: "A detailed cleaning service that goes beyond everyday maintenance to address buildup, edges, tracks, fixtures, baseboards, and the overlooked areas that need deeper attention.",
  primaryCTA: BOOK_CTA,
  secondaryCTA: { label: "See What's Included", href: "/cleaning/deep-premium-clean/whats-included" },
};

export const DEEP_PREMIUM_CLEAN_PRICE: HeroPriceData = {
  label: "Starting at $270",
  note: "Starting service includes 4+ labor-hours and a two-cleaner team.",
};

export const DEEP_PREMIUM_CLEAN_SECTIONS: ServiceDetailSection[] = [
  {
    type: "statement",
    slot: {
      eyebrow: "Go Beyond the Surface",
      heading: "For the details that don't need attention every week—but eventually do.",
      body: "Routine cleaning handles the everyday.\n\nDeep Premium goes further.\n\nWe begin with everything included in our Standard Clean, then spend additional attention on the areas where buildup and overlooked detail tend to accumulate—from kitchen edges and appliance details to bathroom fixtures, window tracks, baseboards, door frames, floor perimeters, vents, furniture details, and more.\n\nIt's designed for the home that doesn't necessarily need reorganizing—it simply needs a deeper level of cleaning.",
    },
  },
  {
    type: "statement",
    slot: {
      eyebrow: "Why It Feels Different",
      heading: "The difference is in the details.",
      body: "It's the buildup around the faucet.\n\nThe shower-door tracks.\n\nThe edges around appliances.\n\nThe baseboards and window tracks.\n\nThe corners behind doors.\n\nThe areas underneath removable sofa cushions.\n\nThe details you may not notice individually—but absolutely notice when the entire home has been thoroughly addressed.",
    },
  },
  {
    type: "comparison",
    heading: "Which Clean Do You Need?",
    cards: [
      {
        heading: "Need ongoing maintenance?",
        body: "If your home is already in generally maintained condition and needs consistent routine care, start with Standard Clean.",
        cta: { label: "Explore Standard Clean", href: "/cleaning/standard-clean" },
      },
      {
        heading: "Want the home cleaned and intentionally reset afterward?",
        body: "Elevated Reset Clean takes the Deep Premium service further by finishing with an intentional whole-home reset using the organization your home already has.",
        cta: { label: "Explore Elevated Reset Clean", href: "/cleaning/elevated-reset-clean" },
      },
    ],
  },
];

export const DEEP_PREMIUM_CLEAN_SNAPSHOT: ServiceSnapshotData = {
  priceLabel: "Starting at $270",
  laborNote: "Starting labor: 4+ labor-hours",
  staffingNote: "Staffing: Two-cleaner team",
  description: "Includes everything in Standard Clean plus our Deep Premium detailing throughout the serviced home.",
  cta: { label: "See Everything Included", href: "/cleaning/deep-premium-clean/whats-included" },
};

export const DEEP_PREMIUM_CLEAN_FINAL_CTA: ContentSlot = {
  heading: "Give the details the attention they've been waiting for.",
  body: "Choose Deep Premium when your home needs more than maintenance and you're ready for a more thorough clean.",
  primaryCTA: BOOK_CTA,
};

export const DEEP_PREMIUM_CLEAN_INCLUDED_HEADING = "What's Included in a Deep Premium Clean";
export const DEEP_PREMIUM_CLEAN_INCLUDED_INTRO: InclusionsIntroSegment[] = [
  { text: "Everything included in " },
  { text: "Standard Clean", href: "/cleaning/standard-clean/whats-included" },
  { text: ", plus:" },
];

export const DEEP_PREMIUM_CLEAN_INCLUDED_SECTIONS: ChecklistSection[] = [
  {
    heading: "Kitchen — Deep Detail",
    items: [
      "Detail sink edges and seams",
      "Address compatible mineral buildup around faucet",
      "Detail sink drain and strainer",
      "Clean accessible garbage-disposal splash guard",
      "Clean accessible underside of splash guard",
      "Detailed backsplash cleaning",
      "Degrease heavier stovetop buildup",
      "Detail range knobs",
      "Detail control-panel edges",
      "Detail appliance-handle attachment points",
      "Clean refrigerator-door gasket folds",
      "Detail refrigerator dispenser exterior",
      "Clean refrigerator drip tray",
      "Clean refrigerator top when safely reachable",
      "Detail dishwasher gasket",
      "Detail dishwasher door edges",
      "Clean dishwasher kick plate",
      "Detail microwave door perimeter",
      "Clean underneath microwave turntable",
      "Degrease over-range microwave underside",
      "Clean accessible microwave exterior vents",
      "Detail range-hood exterior",
      "Detail cabinet pulls",
      "Remove buildup surrounding pulls",
      "Detail cabinet and drawer edges",
      "Clean cabinet toe-kicks",
      "Move small/light countertop objects and clean underneath",
      "Clean underneath easily lifted countertop appliances",
      "Wipe appropriate small-appliance exteriors",
      "Detail countertop seams and edges",
      "Clean trash can inside and outside",
      "Detail floor edges and corners",
    ],
  },
  {
    heading: "Bathrooms — Deep Detail",
    items: [
      "Material-safe showerhead descaling",
      "Detail handheld showerhead",
      "Detail shower hose",
      "Address compatible mineral deposits",
      "Detail tub spout",
      "Detail shower controls",
      "Detail around fixture attachment points",
      "Detail shower/tub drain ring",
      "Deep-clean shower-door tracks",
      "Detail shower-door seals",
      "Detail shower-door frame corners",
      "Detail tub/shower corners",
      "Detail shower niches and shelves",
      "Clean underneath appropriate shower products",
      "Remove soap/shampoo bottle rings",
      "Detail soap dish",
      "Detail tub overflow plate",
      "Address soap-scum buildup",
      "Address compatible hard-water buildup",
      "Detail grout edges and corners within normal cleaning scope",
      "Detail sink stopper and drain",
      "Clean accessible sink overflow",
      "Detail soap-dispenser pump and base",
      "Clean underneath countertop toiletries",
      "More extensive toilet-hinge detailing",
      "Detail toilet mounting and bolt-cap areas",
      "Clean accessible floor behind toilet",
      "Clean accessible wall/baseboard behind toilet",
      "Clean accessible exterior toilet plumbing",
      "Vacuum/wipe bathroom exhaust grille when safely reachable",
      "Detail vanity toe-kick",
      "Detail cabinet edges",
      "Clean trash-can interior",
      "Detail floor perimeter and corners",
    ],
  },
  {
    heading: "Bedrooms — Deep Detail",
    items: [
      "Detail baseboards",
      "Detail window sills",
      "Clean window tracks",
      "Dust door tops",
      "Dust door-frame tops",
      "Detail grime around handles",
      "Dust headboard",
      "Detail accessible bed-frame edges",
      "Vacuum under bed when accessible without moving bed",
      "Crevice-vacuum bed perimeter",
      "Detail nightstand/dresser legs and edges",
      "Dust lamp bases",
      "Appropriately dust lamp shades",
      "Dust picture-frame tops",
      "Detail floor edges and corners",
      "Clean accessible vent/register exteriors",
    ],
  },
  {
    heading: "Living Areas — Deep Detail",
    items: [
      "Detail baseboards",
      "Detail window sills",
      "Clean window tracks",
      "Clean sliding-door tracks",
      "Dust door/frame tops",
      "Detail around door handles",
      "Dust picture-frame tops",
      "Detail furniture legs and crossbars",
      "Detail table legs and bases",
      "Lift removable sofa cushions when appropriate",
      "Vacuum underneath cushions",
      "More extensive sofa-crevice cleaning",
      "Detail accessible pet-hair accumulation",
      "Clean underneath lightweight movable décor",
      "Detail shelf edges",
      "Detail floor corners and perimeter",
      "Clean accessible vents/return grilles",
      "Detail stair edges and corners",
      "Clean behind fully opened doors",
    ],
  },
  {
    heading: "Whole-Home Deep Details",
    items: [
      "Detailed baseboards",
      "Door and frame tops",
      "Window tracks",
      "Sliding-door tracks",
      "Accessible vent/register exteriors",
      "Accessible HVAC return grille",
      "Ceiling-fan blade tops when safely reachable",
      "Safely reachable light-fixture exterior dusting",
      "Detailed floor perimeter",
      "Detailed stair edges",
      "Corners behind doors",
      "Furniture legs and bases",
      "Trash-can interiors",
      "Additional pet-hair detailing",
    ],
  },
];

export const DEEP_PREMIUM_CLEAN_GOOD_TO_KNOW =
  "Deep Premium includes the complete Standard Clean scope before these additional details are addressed.\n\nService is limited to safely accessible areas and material-compatible cleaning methods.";

export const DEEP_PREMIUM_CLEAN_INCLUDED_CTA: CTAData = BOOK_CTA;

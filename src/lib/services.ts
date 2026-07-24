// All prices below are from the locked pricing engine — do not change casually.

export const everyResetIncludes = [
  "Customized system built around how you live",
  "Light cleaning before items go back",
  "Product sourcing & shopping if needed",
  "Labels & finishing touches",
  "Two organizers on larger resets",
  "A judgment-free process",
];

export type ResetPackage = {
  name: string;
  startingAt: number;
  description: string;
};

export const resetPackages: ResetPackage[] = [
  {
    name: "Mini Reset",
    startingAt: 448,
    description:
      "One small space — a single closet, pantry, or drawer zone. Full declutter and sort, a customized system built for how you actually use the space, product sourcing if needed, labels, and light cleaning before everything goes back.",
  },
  {
    name: "Room Reset",
    startingAt: 896,
    description:
      "One full room, start to finish. Everything the Mini Reset includes, scaled to a complete room — every surface, every drawer, every corner given a real system.",
  },
  {
    name: "Multi-Room Reset",
    startingAt: 1792,
    description:
      "2–3 connected rooms or zones, planned as one cohesive project rather than separate jobs — systems that work together across the spaces, not in isolation.",
  },
  {
    name: "Storage Reset",
    startingAt: 896,
    description:
      "Garage, basement, or attic. Bulk-item sorting and category-based systems built for storage spaces — different approach than fine organizing, since it's about grouping and access, not drawer-level detail.",
  },
  {
    name: "Whole Home Reset",
    startingAt: 3584,
    description:
      "Your entire home, typically completed over multiple days, often with two or more organizers working in parallel. One master plan executed room by room.",
  },
  {
    name: "Signature Home Reset",
    startingAt: 5973,
    description:
      "Everything in the Whole Home Reset, plus a design-forward finish — the most comprehensive transformation we offer, top to bottom.",
  },
];

export const roomByRoomStartingAt = 235;
export const roomByRoomRooms = [
  "Closet (small/non-walk-in)",
  "Refrigerator",
  "Bathroom",
  "Mudroom",
  "Pantry",
  "Laundry Room",
  "Bedroom",
  "Home Office",
  "Playroom",
  "Craft Room",
  "Attic",
  "Kitchen",
  "Garage",
  "Basement",
];

export const cleaningInclusions: { tier: string; note?: string; items: string[] }[] = [
  {
    tier: "Standard Cleaning",
    items: [
      "Vacuum & mop every floor",
      "Dust all reachable surfaces",
      "Tidy every room (fold throws, fluff pillows, straighten items)",
      "Make all beds",
      "Full kitchen (counters, sink, stovetop, exterior appliances/cabinets)",
      "Full bathroom(s) (toilet, shower/tub, sink, mirror)",
      "Vacuum & wipe visible surfaces of upholstered furniture",
      "Wipe light switches, door handles, interior door frames (surface wipe)",
      "Shift light/movable furniture to clean around/behind (see furniture policy)",
      "Dust ceiling fans",
      "Empty all trash",
      "Wipe remotes, cabinet/drawer handles, and other high-touch surfaces",
    ],
  },
  {
    tier: "Premium Deep Cleaning",
    note: "Everything in Standard, plus:",
    items: [
      "Move couches, beds & movable furniture to clean underneath/behind",
      "Detailed clean of door frames (cracks, crevices, corners)",
      "Baseboards throughout",
      "Window sills",
      "Interior light fixtures (detailed)",
      "Deep scrub of grout/tile in bathrooms",
      "Kitchen cabinet exteriors (detailed — fronts, handles, edges)",
      "Mirror/glass streak-free detail",
    ],
  },
  {
    tier: "Elevated Reset Cleaning",
    note: "Everything in Premium, plus:",
    items: [
      "Inside oven",
      "Inside refrigerator",
      "Inside all cabinets & drawers (wiped)",
      "Interior windows",
      "Inside dishwasher",
      "Sink drain/plug area",
      "Walls — spot cleaning of marks, scuffs, handprints, smudges",
    ],
  },
  {
    tier: "Move-In / Move-Out Cleaning",
    items: [
      "Full detailed clean of every room, top to bottom",
      "Inside all cabinets/drawers/closets (fully empty, full access)",
      "Inside oven/fridge/dishwasher",
      "Baseboards throughout",
      "Full wall wipe-down (not just spot-clean)",
      "Interior windows & sills",
      "Detailed door frames & tracks",
      "Light fixtures & ceiling fans (detailed)",
      "Full bathroom detail including grout",
      "Closet interiors",
      "Removal of any leftover trash/debris",
    ],
  },
  {
    tier: "Post-Organization Cleaning",
    items: [
      "Standard Cleaning scope, but with full access to just-cleared cabinets, closets, and drawers since organizing already emptied them — wiping interiors that are normally blocked, without the full deep-clean detail work of Premium",
    ],
  },
];

export const furniturePolicy =
  "We move light, stable furniture to clean around and behind it. We don't move large, heavy, or top-heavy pieces — for your safety and ours.";

export const moveManagement = {
  startingAt: 2158,
  included: [
    {
      title: "Move Coordination",
      body: "We source and schedule the packing and moving, and act as your single point of contact so you're never juggling multiple vendors.",
    },
    {
      title: "Packing",
      body: "Our 2-person crew carefully packs your belongings, room by room.",
    },
    {
      title: "Moving",
      body: "Our own moving company, 3-person crew, handles transport to your new home.",
    },
    {
      title: "Unpacking & Organizing",
      body: "Full organizing at the new home, not just box-emptying: everything sorted into a real system, labeled, and placed with intention so the home is livable from day one.",
    },
  ],
};

export const welcomeHome = {
  startingAt: 937,
  included: [
    "Full unpacking of every box",
    "A customized organizing system built room by room",
    "Labels and finishing touches",
    "Furniture and belongings placed with intention, not just emptied into cabinets",
    "Light cleaning of surfaces before items are put away",
  ],
};

export const familyCoordinationAddOn = {
  price: 425,
  hours: 5,
  covers: [
    "Family calls and video walkthroughs",
    "Decision facilitation on who gets what",
    "Secondary item logistics",
    "Donation pickup coordination",
  ],
};

export const supportiveLiving = {
  startingAt: 470,
  cleaningAddOnStartingAt: 85,
  included: [
    "Full declutter and organize of the space",
    "Layout planned around real daily movement (e.g., a resting point placed before a nighttime bathroom trip, furniture positioned for stability and grip)",
    "Customized system, labels, and light cleaning before items go back",
  ],
};

export const nursery = {
  startingAt: 470,
  included: [
    "Full declutter and organize of the nursery",
    "Furniture assembly and placement if needed",
    "Every item sanitized with natural products as it's placed",
    "Labels and finishing touches",
  ],
};

export const junkRemoval = {
  startingAt: 135,
};

// Data for the Contact page's dynamic info panel.
export type ContactPanelInfo = {
  title: string;
  startingAt?: string;
  blurb: string;
  bullets?: string[];
};

export const contactPanelInfo: Record<string, ContactPanelInfo> = {
  "Reset Packages": {
    title: "Reset Packages",
    startingAt: "Starting at $448",
    blurb:
      "Full-scope transformations, from one closet to your whole home. You buy a completed project, not hours — Mini Reset from $448 up to the Signature Home Reset from $5,973.",
    bullets: everyResetIncludes,
  },
  "Room-by-Room Resets": {
    title: "Room-by-Room Resets",
    startingAt: "Starting at $235",
    blurb:
      "Know exactly which space needs help? Start there. Closets, pantries, kitchens, garages, and more — final price scoped to your specific space during your consultation.",
    bullets: everyResetIncludes,
  },
  "Move Management Package": {
    title: "Move Management Package",
    startingAt: "Starting at $2,158",
    blurb:
      "We pack, move, unpack, and organize — one team, start to finish. Scales with home size; final price confirmed at your consultation.",
    bullets: moveManagement.included.map((i) => i.title),
  },
  "Welcome Home Package": {
    title: "Welcome Home Package",
    startingAt: "Starting at $937",
    blurb:
      "Already handled your move? We'll unpack and organize your new home so it's livable from day one.",
    bullets: welcomeHome.included,
  },
  "Senior Move Management": {
    title: "Senior Move Management",
    startingAt: "Starting at $2,158",
    blurb:
      "Everything in the Move Management Package, with a slower, more patient process and safety-aware setup at the new home. Family Coordination Add-On available ($425, includes 5 hours).",
  },
  "Supportive Living Reset": {
    title: "Supportive Living Reset",
    startingAt: "Starting at $470",
    blurb:
      "Decluttering and organizing based on how you actually move through your space — clear paths, resting points, grip-accessible placement. Cleaning & Sanitizing Add-On from $85.",
    bullets: supportiveLiving.included,
  },
  "Nesting & Nursery Prep": {
    title: "Nesting & Nursery Prep",
    startingAt: "Starting at $470",
    blurb:
      "Preparing a nursery with the same care as the rest of a home reset. 3-hour minimum; baby clothing should be laundered before your appointment.",
    bullets: nursery.included,
  },
  "Junk Removal": {
    title: "Junk Removal",
    startingAt: "Starting at $135",
    blurb:
      "Our own truck and labor — not a referral. We haul it away ourselves, from a few boxes to a full truck load.",
  },
  "Maid Services": {
    title: "Maid Services",
    blurb:
      "Our maid services are currently booked by phone. Send us your details here and we'll call you to set everything up — or reach us directly at 540-356-3306.",
  },
};

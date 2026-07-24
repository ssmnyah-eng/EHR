// All prices below are from the locked pricing engine, do not change casually.

export const everyResetIncludes = [
  "Customized system built around how you live",
  "Light cleaning before items go back",
  "We shop for organizing products, cost included in your price",
  "Labels & finishing touches",
  "A two-person organizing team on every job",
  "A judgment-free process",
];

export type ResetPackage = {
  slug: string;
  name: string;
  startingAt: number;
  description: string;
  hasDetailPage: boolean;
  photo: { label: string; alt: string; tone: "clay" | "sage" | "mauve" };
};

export const resetPackages: ResetPackage[] = [
  {
    slug: "mini-reset",
    name: "Mini Reset",
    startingAt: 326,
    description:
      "Two small spaces, one visit, two organizers working in parallel. A closet and a pantry, two kids' closets, whatever combination is driving you crazy.",
    hasDetailPage: true,
    photo: {
      label: "Photo: two organizers working side by side, closet and pantry",
      alt: "Two organizers resetting a closet and pantry in parallel",
      tone: "clay",
    },
  },
  {
    slug: "room-reset",
    name: "Room Reset",
    startingAt: 440,
    description:
      "Two full rooms, one visit. Two kids' bedrooms, a guest room and a home office, handled together instead of two separate appointments.",
    hasDetailPage: true,
    photo: {
      label: "Photo: two organizers working across two bedrooms",
      alt: "Organizers resetting two bedrooms in one visit",
      tone: "sage",
    },
  },
  {
    slug: "multi-room-reset",
    name: "Multi-Room Reset",
    startingAt: 850,
    description:
      "Three connected rooms or zones, planned and executed as one cohesive project, not three separate jobs stitched together.",
    hasDetailPage: true,
    photo: {
      label: "Photo: connected kitchen, pantry, and mudroom flow",
      alt: "Kitchen, pantry, and mudroom organized as one connected system",
      tone: "mauve",
    },
  },
  {
    slug: "storage-reset",
    name: "Storage Reset",
    startingAt: 896,
    description:
      "Garage, basement, or attic. Bulk-item sorting and category-based systems built for storage spaces, different approach than fine organizing, since it's about grouping and access, not drawer-level detail.",
    hasDetailPage: false,
    photo: {
      label: "Photo: organized garage wall system, labeled bins",
      alt: "Organized garage storage wall after a Storage Reset",
      tone: "clay",
    },
  },
  {
    slug: "whole-home-reset",
    name: "Whole Home Reset",
    startingAt: 1100,
    description:
      "Every room in your home under one master plan, typically completed over multiple days with two or more organizers working in parallel.",
    hasDetailPage: true,
    photo: {
      label: "Photo: organizing team working across multiple rooms",
      alt: "Multiple organizers working across a whole home reset",
      tone: "sage",
    },
  },
  {
    slug: "signature-home-reset",
    name: "Signature Home Reset",
    startingAt: 1500,
    description:
      "Everything in the Whole Home Reset, plus a design-forward finish, matching systems and styled spaces that look as good as they function.",
    hasDetailPage: true,
    photo: {
      label: "Photo: matching labeled jars, styled pantry shelves",
      alt: "Design-forward pantry with matching labeled jars",
      tone: "mauve",
    },
  },
];

// Full long-form content for each package's dedicated page. Real customer
// language and pain points, written to convert, not just describe.
export type ResetPackageDetail = {
  slug: string;
  tagline: string;
  whatItDoes: string[];
  whoItHelps: string;
  painPointQuote: string;
  painPointBody: string;
  whyUs: string[];
  ctaPrompt: string;
  photos: {
    whatItDoes: { label: string; alt: string; tone: "clay" | "sage" | "mauve" };
    whoItHelps: { label: string; alt: string; tone: "clay" | "sage" | "mauve" };
    whyUs: { label: string; alt: string; tone: "clay" | "sage" | "mauve" };
  };
};

export const resetPackageDetails: ResetPackageDetail[] = [
  {
    slug: "mini-reset",
    tagline: "Two small spaces, one visit, two organizers working in parallel",
    whatItDoes: [
      "Two small spaces, fully reset in a single visit, a closet and a pantry, two kids' closets, a linen closet and a hall closet, whatever combination makes sense for your home. Two organizers arrive and work in parallel, one on each space, so both get real attention instead of splitting time on one.",
      "Each space gets a full declutter, a system built around how you actually use it (not a generic template), labels, and light cleaning before anything goes back in. If you need bins or containers, we handle sourcing them, you don't have to make a store run first.",
    ],
    whoItHelps:
      "People with a couple of specific problem spots, not the whole house, just the areas that are genuinely driving them crazy. A hallway closet nobody can open without something falling out. A pantry where you've bought the same spice three times because you couldn't find the first two. A kid's closet that's a landmine every morning before school.",
    painPointQuote:
      "I know exactly which spaces are the problem, I just don't have time to deal with them myself, and every time I try, I get halfway through and give up.",
    painPointBody:
      "Small spaces have a way of piling up fast, and because they feel “small,” they get pushed to the bottom of the list indefinitely. This is for the person who's ready to just get it handled.",
    whyUs: [
      "Two organizers, not one, so you're not waiting around while someone tackles both spaces sequentially",
      "A real starting price, not a vague “call for a quote”",
      "A judgment-free process, we're not here to comment on how it got this way, just to fix it",
    ],
    ctaPrompt:
      "Tell us which two spaces are driving you crazy, and we'll get you scheduled.",
    photos: {
      whatItDoes: {
        label: "Photo: two organizers working side by side, closet and pantry",
        alt: "Two organizers resetting a closet and pantry in parallel",
        tone: "clay",
      },
      whoItHelps: {
        label: "Photo: overstuffed hall closet before the reset",
        alt: "Cluttered hallway closet before a Mini Reset",
        tone: "sage",
      },
      whyUs: {
        label: "Photo: labeled pantry bins, finished result",
        alt: "Finished labeled pantry after a Mini Reset",
        tone: "mauve",
      },
    },
  },
  {
    slug: "room-reset",
    tagline: "Two full rooms, one visit",
    whatItDoes: [
      "Two complete rooms, fully organized, think two kids' bedrooms, a guest room and a home office, or a bedroom and a playroom. Every drawer, shelf, and closet in both rooms gets sorted, systemized, and labeled.",
      "Light cleaning happens before anything goes back in, so the space feels reset, not just rearranged.",
    ],
    whoItHelps:
      "Families juggling more than one room that's gotten away from them at the same time, two kids sharing the chaos, a guest room that's become a dumping ground alongside an office that's not functioning as either. If you've got two rooms you keep meaning to get to “eventually,” this is built for exactly that.",
    painPointQuote:
      "I have guests coming and I'm embarrassed. Between my son's room and the guest room, I don't even know where to start.",
    painPointBody:
      "Rooms don't stay contained, a messy bedroom bleeds into a messy closet bleeds into a room you just close the door on and hope nobody opens. This is for two rooms that need real attention, not a quick surface tidy.",
    whyUs: [
      "One visit, two rooms, handled together instead of scheduling two separate appointments",
      "A system that's actually built around your family's real routines, not a picture-perfect setup that falls apart in a week",
      "Straightforward starting pricing so you know what you're working with before you commit",
    ],
    ctaPrompt: "Let's talk about which two rooms need the reset.",
    photos: {
      whatItDoes: {
        label: "Photo: two organizers working across two bedrooms",
        alt: "Organizers resetting two bedrooms in one visit",
        tone: "sage",
      },
      whoItHelps: {
        label: "Photo: cluttered guest room doubling as storage",
        alt: "Guest room used as storage before a Room Reset",
        tone: "clay",
      },
      whyUs: {
        label: "Photo: finished kids' room, labeled bins on shelves",
        alt: "Finished kids' bedroom after a Room Reset",
        tone: "mauve",
      },
    },
  },
  {
    slug: "multi-room-reset",
    tagline: "Three connected rooms or zones",
    whatItDoes: [
      "Three rooms or zones, planned and executed as one cohesive project, not three separate jobs stitched together. Think kitchen, pantry, and mudroom as one connected flow, or a bedroom, closet, and home office.",
      "Everything gets a system that works together, so items end up where they logically belong across the whole area, not just tidied room by room.",
    ],
    whoItHelps:
      "Homes where the clutter doesn't respect room boundaries, where the pantry overflow ends up in the kitchen, where the mudroom becomes storage for things that belong in the closet down the hall. This is for someone ready to fix the whole connected mess at once, not just one piece of it.",
    painPointQuote:
      "I organized my pantry once, but within a month everything from the kitchen ended up back in there because there was nowhere else for it to go.",
    painPointBody:
      "Fixing one room without looking at the rooms around it often means the clutter just relocates. This package exists because real homes don't work in isolated boxes.",
    whyUs: [
      "We look at how rooms function together, not just what's sitting in each one individually",
      "Two organizers on larger multi-room projects, so nothing gets rushed",
      "A starting price that reflects three real rooms, not a teaser number",
    ],
    ctaPrompt: "Tell us about the rooms that keep feeding into each other.",
    photos: {
      whatItDoes: {
        label: "Photo: connected kitchen, pantry, and mudroom flow",
        alt: "Kitchen, pantry, and mudroom organized as one connected system",
        tone: "mauve",
      },
      whoItHelps: {
        label: "Photo: pantry overflow spilling into the kitchen",
        alt: "Pantry overflow cluttering a kitchen counter before a reset",
        tone: "clay",
      },
      whyUs: {
        label: "Photo: two organizers planning across three connected rooms",
        alt: "Organizers planning a multi-room system together",
        tone: "sage",
      },
    },
  },
  {
    slug: "whole-home-reset",
    tagline: "Full home, scoped to your specific house at consultation",
    whatItDoes: [
      "Every room in your home, organized under one master plan, typically completed over multiple days with two or more organizers working in parallel. This isn't room-by-room patchwork, it's a single cohesive system across your entire home, built from one consultation instead of six separate conversations.",
      "The starting price is exactly that, a starting point. Your actual price depends on your home's size and how many rooms need attention, determined during your free consultation before you commit to anything.",
    ],
    whoItHelps:
      "People who don't know where to even begin because every room needs help, after a move, after a major life change, or just after years of things accumulating past the point where a single room fix would matter. This is for someone who's done trying to tackle it piecemeal and wants the whole thing handled, start to finish.",
    painPointQuote:
      "Every room in my house needs work, and honestly, I don't even know which one to start with. It all just feels like too much.",
    painPointBody:
      "When the overwhelm is house-wide, picking one room to fix first can feel pointless, you finish the kitchen and the rest of the house is still there staring at you. This package is built for that exact feeling.",
    whyUs: [
      "One consultation, one plan, one team, instead of managing six separate projects yourself",
      "Real pricing transparency: we tell you upfront that the number depends on your home, and we mean it",
      "A judgment-free process from a team that's done this for homes in every kind of state",
    ],
    ctaPrompt: "Let's walk through your home together and build your real plan.",
    photos: {
      whatItDoes: {
        label: "Photo: organizing team working across multiple rooms",
        alt: "Multiple organizers working across a whole home reset",
        tone: "clay",
      },
      whoItHelps: {
        label: "Photo: boxes and clutter throughout a home after a move",
        alt: "A home overwhelmed by clutter after a big move",
        tone: "sage",
      },
      whyUs: {
        label: "Photo: consultation walkthrough, notes in hand",
        alt: "Organizer walking through a home during a consultation",
        tone: "mauve",
      },
    },
  },
  {
    slug: "signature-home-reset",
    tagline:
      "Everything in Whole Home Reset, plus a styled, design-forward finish",
    whatItDoes: [
      "Everything included in a Whole Home Reset, full-house organizing, systems built around your real life, two or more organizers working across multiple days, plus an added layer of aesthetic intention. Matching label systems throughout instead of whatever fits. Baskets, bins, and containers chosen as a cohesive design choice, not just functional pieces. Shelves and spaces arranged with visual presentation in mind, not just access.",
      "The difference isn't more labor, it's more care in how it all looks when we're done. Think “this could be in a magazine,” not just “everything has a home.” Like Whole Home Reset, the starting price reflects the entry point, your real price is scoped to your home at consultation.",
    ],
    whoItHelps:
      "People who want their home to function and look beautifully put-together, not just organized, but genuinely photo-ready. If you've pictured your pantry with matching labeled jars, your closet color-coded and styled, your shelves looking like they belong in a design magazine, this is the package built for that vision.",
    painPointQuote:
      "I don't just want it organized, I want it to actually look good. I want to walk in and feel like it belongs in a home I'd be proud to show off.",
    painPointBody:
      "Function matters, but so does how a space makes you feel every time you walk into it, and there's a real difference between “technically organized” and genuinely beautiful.",
    whyUs: [
      "The same full-home expertise as our Whole Home Reset, with a design eye layered on top",
      "Every detail, from label fonts to container choices, considered as part of the whole picture",
      "A team that treats your home like it's worth doing exceptionally, not just adequately",
    ],
    ctaPrompt: "Let's design the home you've been picturing.",
    photos: {
      whatItDoes: {
        label: "Photo: matching labeled jars, styled pantry shelves",
        alt: "Design-forward pantry with matching labeled jars",
        tone: "mauve",
      },
      whoItHelps: {
        label: "Photo: color-coded closet, styled and photo-ready",
        alt: "Color-coded, styled closet after a Signature Home Reset",
        tone: "clay",
      },
      whyUs: {
        label: "Photo: finished shelving styled like a design magazine",
        alt: "Magazine-style shelf styling after a Signature Home Reset",
        tone: "sage",
      },
    },
  },
];

export function getResetPackage(slug: string): ResetPackage | undefined {
  return resetPackages.find((p) => p.slug === slug);
}

export function getResetPackageDetail(
  slug: string
): ResetPackageDetail | undefined {
  return resetPackageDetails.find((p) => p.slug === slug);
}

export const roomByRoomStartingAt = 185;

export type RoomByRoomGroup = { rooms: string[]; price: number };

// Refrigerator was removed entirely from the offering per the updated pricing.
export const roomByRoomGroups: RoomByRoomGroup[] = [
  { rooms: ["Closet (small, non-walk-in)"], price: 185 },
  { rooms: ["Bathroom", "Mudroom"], price: 200 },
  { rooms: ["Pantry", "Laundry Room"], price: 220 },
  { rooms: ["Bedroom", "Home Office", "Playroom", "Craft Room"], price: 250 },
  { rooms: ["Kitchen"], price: 300 },
  { rooms: ["Attic"], price: 300 },
  { rooms: ["Garage", "Basement"], price: 350 },
];

export type RoomByRoomBundle = {
  label: string;
  example: string;
  basePrice: number;
  discountPercent: number;
  finalPrice: number;
};

// Booking two spaces from the same size tier in one visit, two organizers
// working in parallel, earns a 12% bundle discount.
export const roomByRoomBundles: RoomByRoomBundle[] = [
  {
    label: "Two Small Spaces",
    example: "e.g. two closets",
    basePrice: 370,
    discountPercent: 12,
    finalPrice: 326,
  },
  {
    label: "Two Full Rooms",
    example: "e.g. two kids' rooms, or a bedroom + guest room",
    basePrice: 500,
    discountPercent: 12,
    finalPrice: 440,
  },
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
      "Kitchen cabinet exteriors (detailed, fronts, handles, edges)",
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
      "Walls, spot cleaning of marks, scuffs, handprints, smudges",
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
      "Standard Cleaning scope, but with full access to just-cleared cabinets, closets, and drawers since organizing already emptied them, wiping interiors that are normally blocked, without the full deep-clean detail work of Premium",
    ],
  },
];

export const furniturePolicy =
  "We move light, stable furniture to clean around and behind it. We don't move large, heavy, or top-heavy pieces, for your safety and ours.";

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
    startingAt: "Starting at $326",
    blurb:
      "Full-scope transformations, from two small spaces to your whole home. You buy a completed project, not hours, Mini Reset from $326 up to the Signature Home Reset from $1,500.",
    bullets: everyResetIncludes,
  },
  "Room-by-Room Resets": {
    title: "Room-by-Room Resets",
    startingAt: "Starting at $185",
    blurb:
      "Know exactly which space needs help? Start there. Closets, pantries, kitchens, garages, and more, final price scoped to your specific space during your consultation.",
    bullets: everyResetIncludes,
  },
  "Move Management Package": {
    title: "Move Management Package",
    startingAt: "Starting at $2,158",
    blurb:
      "We pack, move, unpack, and organize. One team, start to finish. Scales with home size; final price confirmed at your consultation.",
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
      "Decluttering and organizing based on how you actually move through your space, clear paths, resting points, grip-accessible placement. Cleaning & Sanitizing Add-On from $85.",
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
      "Our own truck and labor, not a referral. We haul it away ourselves, from a few boxes to a full truck load.",
  },
  "Maid Services": {
    title: "Maid Services",
    blurb:
      "Our maid services are currently booked by phone. Send us your details here and we'll call you to set everything up, or reach us directly at 540-356-3306.",
  },
};

import type {
  AddOnType,
  AreaType,
  ClutterLevel,
  ConditionLevel,
  FixedAreaType,
  PetHairLevel,
  SizedAreaType,
  TimeSinceCleaning,
} from "@/lib/cleaning-pricing/types";

/**
 * Customer-facing labels/descriptions for the Cleaning booking wizard.
 * Deliberately separate from lib/cleaning-pricing/config.ts — this file
 * is what the browser renders as choice text; that file is the
 * dollar/minute math. Customers see friendly descriptions, never the
 * backend adjustment amounts (brief section 4: "the customer primarily
 * needs the final cleaning total, not an itemized judgment about the
 * condition of their home").
 */

export const TIME_SINCE_CLEANING_OPTIONS: { value: TimeSinceCleaning; label: string }[] = [
  { value: "within-30-days", label: "Within the last 30 days" },
  { value: "1-3-months", label: "1–3 months ago" },
  { value: "3-6-months", label: "3–6 months ago" },
  { value: "6-12-months", label: "6–12 months ago" },
  { value: "over-12-months", label: "More than 12 months ago, or never" },
];

interface ConditionOption {
  value: ConditionLevel;
  label: string;
  description: string;
}

export const KITCHEN_GREASE_OPTIONS: ConditionOption[] = [
  { value: "light", label: "Light / well maintained", description: "Regularly wiped down, no noticeable buildup." },
  { value: "noticeable", label: "Noticeable", description: "Some grease or residue around the stove and surfaces." },
  { value: "substantial", label: "Substantial", description: "Visible buildup on the stovetop, backsplash, or cabinet fronts." },
  { value: "heavy", label: "Heavy", description: "Significant grease buildup across multiple kitchen surfaces." },
];

export const DUST_OPTIONS: ConditionOption[] = [
  { value: "light", label: "Light / normal", description: "Typical day-to-day dust only." },
  { value: "noticeable", label: "Noticeable", description: "Visible dust on surfaces, shelves, or vents." },
  { value: "substantial", label: "Substantial", description: "Dust has built up across most rooms." },
  { value: "heavy", label: "Heavy", description: "Heavy dust/debris accumulation throughout the home." },
];

export const BATHROOM_BUILDUP_OPTIONS: ConditionOption[] = [
  { value: "light", label: "Light / maintained", description: "Regularly cleaned, no noticeable buildup." },
  { value: "noticeable", label: "Noticeable", description: "Some soap scum, mineral spots, or grout discoloration." },
  { value: "substantial", label: "Substantial", description: "Visible buildup on fixtures, tile, or grout." },
  { value: "heavy", label: "Heavy", description: "Significant soap/mineral/grout buildup." },
];

interface ClutterOption {
  value: ClutterLevel;
  label: string;
  description: string;
}

export const CLUTTER_OPTIONS: ClutterOption[] = [
  { value: "accessible", label: "Generally accessible", description: "Floors and surfaces are clear enough to clean normally." },
  { value: "some-items", label: "Some items need moving", description: "A few things will need to be moved aside as we clean." },
  { value: "several-areas", label: "Several areas obstructed", description: "Multiple rooms have items blocking floors or surfaces." },
  {
    value: "extreme",
    label: "Extreme accumulation / obstruction",
    description: "Significant buildup that limits normal access to the space.",
  },
];

interface PetHairOption {
  value: PetHairLevel;
  label: string;
  description: string;
}

export const PET_HAIR_OPTIONS: PetHairOption[] = [
  { value: "none-light", label: "None / light", description: "No pets, or minimal shedding." },
  { value: "noticeable", label: "Noticeable", description: "Visible pet hair on floors and furniture." },
  { value: "heavy", label: "Heavy shedding / accumulation", description: "Significant pet hair throughout the home." },
];

export const FIXED_AREA_OPTIONS: { value: FixedAreaType; label: string }[] = [
  { value: "half-bathroom", label: "Half bathroom" },
  { value: "dining-room", label: "Dining room" },
  { value: "home-office", label: "Home office" },
  { value: "laundry-room", label: "Laundry room" },
  { value: "hall-common-area", label: "Hall / common area" },
];

export const SIZED_AREA_OPTIONS: { value: SizedAreaType; label: string }[] = [
  { value: "kitchen", label: "Kitchen" },
  { value: "full-bathroom", label: "Full bathroom" },
  { value: "bedroom", label: "Bedroom" },
  { value: "living-room", label: "Living / family room" },
];

export const AREA_ORDER: AreaType[] = [
  "kitchen",
  "full-bathroom",
  "half-bathroom",
  "bedroom",
  "living-room",
  "dining-room",
  "home-office",
  "laundry-room",
  "hall-common-area",
  "finished-basement",
];

export const ROOM_SIZE_LABELS = { small: "Small", average: "Average", large: "Large" } as const;

export const ADD_ON_OPTIONS: { value: AddOnType; label: string; unit: "flat" | "load" | "window" | "bed" | "set" }[] = [
  { value: "inside-oven", label: "Inside oven", unit: "flat" },
  { value: "inside-fridge", label: "Inside refrigerator / freezer", unit: "flat" },
  { value: "inside-cabinets", label: "Inside kitchen cabinets", unit: "flat" },
  { value: "laundry", label: "Laundry — wash, dry, fold", unit: "load" },
  { value: "dishes", label: "Dishes", unit: "load" },
  { value: "interior-windows", label: "Interior windows", unit: "window" },
  { value: "bedding-change", label: "Bedding change", unit: "bed" },
  { value: "detailed-blinds", label: "Detailed blinds", unit: "set" },
];

export const SPECIALTY_CONDITION_OPTIONS = [
  { value: "mold-mildew", label: "Significant mold or mildew beyond ordinary bathroom buildup" },
  { value: "pest-activity", label: "Heavy or active pest activity" },
  { value: "extreme-clutter", label: "Extreme clutter or accumulation" },
  { value: "biohazard", label: "Bodily fluids, waste, or possible biohazard concerns" },
  { value: "post-construction", label: "Post-construction or renovation dust/debris" },
  { value: "smoke-grease", label: "Extreme smoke or grease conditions" },
  { value: "other", label: "Something else we should know about" },
] as const;

export const SPECIALTY_EXTENT_OPTIONS = [
  { value: "localized", label: "Small / localized to one area" },
  { value: "several-areas", label: "A few different areas" },
  { value: "widespread", label: "Widespread across the home" },
] as const;


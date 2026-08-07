import type {
  AddOnType,
  AreaType,
  CleaningTier,
  ConditionLevel,
  FixedAreaType,
  PetHairLevel,
  RoomSize,
  SizedAreaType,
  TimeSinceCleaning,
} from "./types";

/**
 * Centralized, typed Cleaning pricing/duration configuration. Every
 * number here is either (a) an already-approved EHR figure copied
 * verbatim from content/cleaning-standard.ts, content/cleaning-deep-
 * premium.ts, and content/cleaning-elevated-reset.ts, or (b) an initial
 * scheduling/pricing assumption explicitly requested as a starting point
 * pending real EHR production data — never hand-typed guesses invented
 * for this file. Replace the values here (not the engine logic in
 * engine.ts) as real data becomes available.
 */

export const MINIMUM_BOOKING_PRICE = 140;
export const CLEANING_DEPOSIT = 140;

/** 15% scheduling buffer applied to total estimated cleaner-minutes
 *  before rounding up to the next 30-minute calendar block. */
export const SCHEDULING_BUFFER_PERCENT = 0.15;

/** Additional contingency applied only to specialty-condition bookings,
 *  before the standard scheduling buffer above. */
export const SPECIALTY_TIME_CONTINGENCY_PERCENT = 0.15;

/** Ordinary condition-labor charges (kitchen grease, bathroom buildup,
 *  dust, clutter/access, time-since-cleaning — NOT pet hair, NOT add-ons)
 *  are capped at this fraction of the applicable base cleaning price. */
export const CONDITION_CHARGE_CAP_PERCENT = 0.35;

export const TIER_LABELS: Record<CleaningTier, string> = {
  "standard-clean": "Standard Clean",
  "deep-premium-clean": "Deep Premium Clean",
  "elevated-reset-clean": "Elevated Reset Clean",
};

/**
 * Whole-home base price bands. The <1,500 sq ft figure for every tier is
 * the exact approved starting price already published on each tier's
 * detail page (Standard $140 / Deep Premium $270 / Elevated Reset $400 —
 * see HeroPriceData in content/cleaning-*.ts). The two larger bands are
 * derived from those anchors using the same proportional relationship as
 * the initial whole-home cleaner-hour model below (e.g. Standard's
 * 1,500–2,500 band = $140 × (5.0 / 3.0) cleaner-hours, rounded to the
 * nearest $5) — a transparent placeholder scaling, not an invented
 * figure, until EHR supplies real approved size-band pricing. If EHR's
 * approved pricing structure ever grows additional size bands beyond
 * 3,500 sq ft, add them here — never delete a supplied band.
 */
export const WHOLE_HOME_BASE_PRICE: Record<CleaningTier, { under1500: number; from1500to2500: number; from2501to3500: number }> = {
  "standard-clean": { under1500: 140, from1500to2500: 235, from2501to3500: 305 },
  "deep-premium-clean": { under1500: 270, from1500to2500: 420, from2501to3500: 540 },
  "elevated-reset-clean": { under1500: 400, from1500to2500: 620, from2501to3500: 800 },
};

export function wholeHomeSizeBand(squareFootage: number): "under1500" | "from1500to2500" | "from2501to3500" {
  if (squareFootage < 1500) return "under1500";
  if (squareFootage <= 2500) return "from1500to2500";
  return "from2501to3500";
}

/** Initial whole-home cleaner-hour scheduling assumptions (Section 7).
 *  Used for appointment-duration scheduling only — never shown to the
 *  customer as a promised labor-hour figure. */
export const WHOLE_HOME_CLEANER_HOURS: Record<CleaningTier, { under1500: number; from1500to2500: number; from2501to3500: number }> = {
  "standard-clean": { under1500: 3.0, from1500to2500: 5.0, from2501to3500: 6.5 },
  "deep-premium-clean": { under1500: 4.5, from1500to2500: 7.0, from2501to3500: 9.0 },
  "elevated-reset-clean": { under1500: 5.5, from1500to2500: 8.5, from2501to3500: 11.0 },
};

/** Selected-area (non-whole-home) per-unit prices. Flat-rate areas only —
 *  size does not change the price for these, only duration where noted. */
export const FIXED_AREA_PRICE: Record<Exclude<FixedAreaType, never>, number> = {
  "half-bathroom": 20,
  "dining-room": 20,
  "home-office": 20,
  "laundry-room": 20,
  "hall-common-area": 15,
};

export const SIZED_AREA_PRICE: Record<SizedAreaType, number> = {
  kitchen: 45,
  "full-bathroom": 35,
  bedroom: 20,
  "living-room": 30,
};

/** Finished basement is priced "starting at $40" per the approved spec,
 *  scaled by size the same way every other sized area is. Only the
 *  starting ($40, small) figure is approved; average/large are an
 *  initial proportional placeholder pending real EHR guidance. */
export const FINISHED_BASEMENT_PRICE: Record<RoomSize, number> = {
  small: 40,
  average: 65,
  large: 95,
};

export const AREA_LABELS: Record<AreaType, string> = {
  kitchen: "Kitchen",
  "full-bathroom": "Full bathroom",
  "half-bathroom": "Half bathroom",
  bedroom: "Bedroom",
  "living-room": "Living / family room",
  "dining-room": "Dining room",
  "home-office": "Home office",
  "laundry-room": "Laundry room",
  "hall-common-area": "Hall / common area",
  "finished-basement": "Finished basement",
};

/** Section 6 — initial per-room cleaner-minute duration model, by tier
 *  and (for sized areas) Small/Average/Large. Storage-only; never shown
 *  to the customer as a time promise. */
export const SIZED_AREA_DURATION_MINUTES: Record<SizedAreaType, Record<CleaningTier, Record<RoomSize, number>>> = {
  kitchen: {
    "standard-clean": { small: 25, average: 35, large: 45 },
    "deep-premium-clean": { small: 40, average: 50, large: 65 },
    "elevated-reset-clean": { small: 55, average: 70, large: 90 },
  },
  "full-bathroom": {
    "standard-clean": { small: 20, average: 25, large: 35 },
    "deep-premium-clean": { small: 30, average: 40, large: 50 },
    "elevated-reset-clean": { small: 40, average: 55, large: 70 },
  },
  bedroom: {
    "standard-clean": { small: 15, average: 20, large: 25 },
    "deep-premium-clean": { small: 25, average: 30, large: 40 },
    "elevated-reset-clean": { small: 35, average: 40, large: 50 },
  },
  "living-room": {
    "standard-clean": { small: 15, average: 25, large: 35 },
    "deep-premium-clean": { small: 25, average: 35, large: 45 },
    "elevated-reset-clean": { small: 35, average: 45, large: 60 },
  },
};

/** Half bathroom has no small/average/large duration split in the
 *  approved model — a single per-tier figure. */
export const HALF_BATHROOM_DURATION_MINUTES: Record<CleaningTier, number> = {
  "standard-clean": 15,
  "deep-premium-clean": 20,
  "elevated-reset-clean": 30,
};

/** Fixed-price, fixed-duration areas (dining, office, laundry, hall). */
export const FIXED_AREA_DURATION_MINUTES: Record<Exclude<FixedAreaType, "half-bathroom">, Record<CleaningTier, number>> = {
  "dining-room": { "standard-clean": 15, "deep-premium-clean": 25, "elevated-reset-clean": 35 },
  "home-office": { "standard-clean": 15, "deep-premium-clean": 25, "elevated-reset-clean": 35 },
  "laundry-room": { "standard-clean": 15, "deep-premium-clean": 20, "elevated-reset-clean": 30 },
  "hall-common-area": { "standard-clean": 10, "deep-premium-clean": 15, "elevated-reset-clean": 20 },
};

/** Finished basement duration — not supplied in the approved room
 *  duration model, so it's derived from the kitchen's proportions (the
 *  next-largest room type) as an initial placeholder pending real data. */
export const FINISHED_BASEMENT_DURATION_MINUTES: Record<CleaningTier, Record<RoomSize, number>> = {
  "standard-clean": { small: 30, average: 45, large: 60 },
  "deep-premium-clean": { small: 45, average: 60, large: 80 },
  "elevated-reset-clean": { small: 60, average: 80, large: 105 },
};

interface ConditionAdjustment {
  amount: number;
  minutes: number;
}

/** Section 4 — objective condition adjustments. Every level below is
 *  shown to the customer as a friendly descriptive choice (see
 *  content/cleaning-condition.ts); the dollar/minute values here are
 *  server-side-only and never rendered as line items. */
export const KITCHEN_GREASE_ADJUSTMENT: Record<ConditionLevel, ConditionAdjustment> = {
  none: { amount: 0, minutes: 0 },
  light: { amount: 0, minutes: 0 },
  noticeable: { amount: 20, minutes: 15 },
  substantial: { amount: 40, minutes: 30 },
  heavy: { amount: 65, minutes: 45 },
};

/** Applied PER affected bathroom. */
export const BATHROOM_BUILDUP_ADJUSTMENT: Record<ConditionLevel, ConditionAdjustment> = {
  none: { amount: 0, minutes: 0 },
  light: { amount: 0, minutes: 0 },
  noticeable: { amount: 15, minutes: 10 },
  substantial: { amount: 30, minutes: 20 },
  heavy: { amount: 45, minutes: 30 },
};

export const DUST_ADJUSTMENT: Record<ConditionLevel, ConditionAdjustment> = {
  none: { amount: 0, minutes: 0 },
  light: { amount: 0, minutes: 0 },
  noticeable: { amount: 20, minutes: 15 },
  substantial: { amount: 40, minutes: 30 },
  heavy: { amount: 60, minutes: 45 },
};

export type ClutterAdjustmentLevel = "accessible" | "some-items" | "several-areas" | "extreme";

export const CLUTTER_ADJUSTMENT: Record<ClutterAdjustmentLevel, ConditionAdjustment> = {
  accessible: { amount: 0, minutes: 0 },
  "some-items": { amount: 20, minutes: 15 },
  "several-areas": { amount: 40, minutes: 30 },
  extreme: { amount: 65, minutes: 45 },
};

export const PET_HAIR_ADJUSTMENT: Record<PetHairLevel, ConditionAdjustment> = {
  "none-light": { amount: 0, minutes: 0 },
  noticeable: { amount: 25, minutes: 20 },
  heavy: { amount: 45, minutes: 35 },
};

/** Time-since-last-thorough-cleaning is dollars only — no separate
 *  cleaner-minutes figure was supplied for it, unlike the other
 *  condition questions. */
export const TIME_SINCE_CLEANING_ADJUSTMENT: Record<TimeSinceCleaning, number> = {
  "within-30-days": 0,
  "1-3-months": 10,
  "3-6-months": 20,
  "6-12-months": 30,
  "over-12-months": 40,
};

interface AddOnConfig {
  label: string;
  /** Price per unit (per load/window/bed/set) for quantity-based add-ons;
   *  flat price for the rest. */
  price: number;
  /** Cleaner-minutes per unit. Laundry is deliberately lower than a
   *  literal wash/dry/fold cycle would take — machine runtime isn't
   *  active cleaner labor, cleaning continues elsewhere while it runs. */
  minutes: number;
  unit: "flat" | "load" | "window" | "bed" | "set";
}

export const ADD_ON_CONFIG: Record<AddOnType, AddOnConfig> = {
  "inside-oven": { label: "Inside oven", price: 43, minutes: 30, unit: "flat" },
  "inside-fridge": { label: "Inside refrigerator / freezer", price: 38, minutes: 25, unit: "flat" },
  "inside-cabinets": { label: "Inside kitchen cabinets", price: 63, minutes: 45, unit: "flat" },
  laundry: { label: "Laundry — wash, dry, fold", price: 30, minutes: 20, unit: "load" },
  dishes: { label: "Dishes", price: 28, minutes: 20, unit: "load" },
  "interior-windows": { label: "Interior windows", price: 11, minutes: 8, unit: "window" },
  "bedding-change": { label: "Bedding change", price: 23, minutes: 15, unit: "bed" },
  "detailed-blinds": { label: "Detailed blinds", price: 11, minutes: 8, unit: "set" },
};

/**
 * Add-on eligibility per tier — an add-on is ineligible (not offered/not
 * charged) only when that exact work is already included in that tier's
 * approved base scope. Checked against STANDARD_CLEAN_INCLUDED_SECTIONS /
 * DEEP_PREMIUM_CLEAN_INCLUDED_SECTIONS / ELEVATED_RESET_CLEAN_INCLUDED_
 * SECTIONS (content/cleaning-*.ts): none of the three approved tiers
 * include oven interiors, fridge interiors, cabinet interiors, laundry,
 * dishes, interior window glass, bedding changes, or detailed blinds as
 * base-scope work today, so every add-on is eligible for every tier.
 * Flip an entry to `false` here (not in the engine) if an approved
 * tier's scope changes to include one of these.
 */
export const ADD_ON_ELIGIBILITY: Record<CleaningTier, Record<AddOnType, boolean>> = {
  "standard-clean": {
    "inside-oven": true,
    "inside-fridge": true,
    "inside-cabinets": true,
    laundry: true,
    dishes: true,
    "interior-windows": true,
    "bedding-change": true,
    "detailed-blinds": true,
  },
  "deep-premium-clean": {
    "inside-oven": true,
    "inside-fridge": true,
    "inside-cabinets": true,
    laundry: true,
    dishes: true,
    "interior-windows": true,
    "bedding-change": true,
    "detailed-blinds": true,
  },
  "elevated-reset-clean": {
    "inside-oven": true,
    "inside-fridge": true,
    "inside-cabinets": true,
    laundry: true,
    dishes: true,
    "interior-windows": true,
    "bedding-change": true,
    "detailed-blinds": true,
  },
};

/**
 * Cleaning pricing/duration domain types. Framework-agnostic — this file
 * has no React/Next imports so the same engine can run in a browser (live
 * price preview in the wizard) or in a future server-side handler that
 * revalidates a submitted booking before creating a Square payment/
 * booking (see lib/cleaning-pricing/README.md). Never trust a price
 * computed only in the browser — recompute it wherever money moves.
 */

export type CleaningTier = "standard-clean" | "deep-premium-clean" | "elevated-reset-clean";

export type CleaningScope = "entire-home" | "selected-areas";

export type RoomSize = "small" | "average" | "large";

/** Selected-area room types with a fixed per-unit price (no size tiers —
 *  duration doesn't materially vary enough to justify asking). */
export type FixedAreaType =
  | "half-bathroom"
  | "dining-room"
  | "home-office"
  | "laundry-room"
  | "hall-common-area";

/** Selected-area room types whose cleaner-time varies enough by size to
 *  justify asking the customer a simple Small/Average/Large question
 *  (matches the duration bands actually supplied for these rooms). */
export type SizedAreaType = "kitchen" | "full-bathroom" | "bedroom" | "living-room";

export type AreaType = FixedAreaType | SizedAreaType | "finished-basement";

/** One selected area/room instance. `size` only applies to SizedAreaType
 *  and finished-basement; fixed-price areas omit it. */
export interface SelectedArea {
  type: AreaType;
  count: number;
  size?: RoomSize;
}

export type ConditionLevel = "none" | "light" | "noticeable" | "substantial" | "heavy";

export type TimeSinceCleaning = "within-30-days" | "1-3-months" | "3-6-months" | "6-12-months" | "over-12-months";

export type ClutterLevel = "accessible" | "some-items" | "several-areas" | "extreme";

export type PetHairLevel = "none-light" | "noticeable" | "heavy";

export interface ConditionAnswers {
  timeSinceCleaning: TimeSinceCleaning;
  kitchenGrease: ConditionLevel;
  /** One buildup level PER affected bathroom — an empty array means "no
   *  bathrooms with buildup to report" (still fine; adjustment is $0). */
  bathroomBuildup: ConditionLevel[];
  dustAccumulation: ConditionLevel;
  clutterAccess: ClutterLevel;
  petHair: PetHairLevel;
}

export type AddOnType =
  | "inside-oven"
  | "inside-fridge"
  | "inside-cabinets"
  | "laundry"
  | "dishes"
  | "interior-windows"
  | "bedding-change"
  | "detailed-blinds";

/** `quantity` is loads/windows/beds/sets for the per-unit add-ons; omit
 *  (or 1) for the flat-rate ones (oven, fridge, cabinets). */
export interface SelectedAddOn {
  type: AddOnType;
  quantity: number;
}

export type SpecialtyConditionType =
  | "mold-mildew"
  | "pest-activity"
  | "extreme-clutter"
  | "biohazard"
  | "post-construction"
  | "smoke-grease"
  | "other";

export type SpecialtyExtent = "localized" | "several-areas" | "widespread";

export interface SpecialtyDetails {
  types: SpecialtyConditionType[];
  affectedAreas: string;
  extent: SpecialtyExtent | "";
  description: string;
  photosProvided: boolean;
  photoCount: number;
}

/** Full input the pricing/duration engine needs. This is the shape a
 *  server-side handler would also validate/recompute from — never trust
 *  a price the browser hands back, recompute it from this same input. */
export interface CleaningPricingInput {
  tier: CleaningTier;
  scope: CleaningScope;
  squareFootage: number;
  selectedAreas: SelectedArea[];
  condition: ConditionAnswers;
  addOns: SelectedAddOn[];
  /** Only meaningful when a laundry add-on is selected — "Will laundry
   *  already be sorted?" Defaults true (no scheduling penalty) when
   *  laundry isn't selected at all. false adds LAUNDRY_UNSORTED_MINUTES_
   *  PER_LOAD of active cleaner time per load; never changes price. */
  laundryAlreadySorted: boolean;
  /** Recurring-service discount, if the approved recurring pricing rules
   *  apply to this booking (see content/cleaning.ts CLEANING_RECURRING*).
   *  Left at "none" until a recurring-frequency step is wired up. */
  recurringDiscountPercent: number;
  hasSpecialtyCondition: boolean;
}

export interface PriceLineItem {
  label: string;
  amount: number;
}

export interface PriceBreakdown {
  /** Base price before condition/add-on adjustments — the whole-home
   *  band price, or the summed/minimum-enforced selected-area total. */
  basePrice: number;
  /** Condition-labor charges (kitchen grease, bathroom buildup, dust,
   *  clutter, time-since-cleaning) AFTER the 35%-of-base cap is applied. */
  conditionCharges: number;
  /** Condition charges before the cap — kept for transparency/debugging,
   *  never shown to the customer. */
  conditionChargesUncapped: number;
  petHairCharge: number;
  addOnCharges: number;
  addOnLineItems: PriceLineItem[];
  recurringDiscount: number;
  /** Final customer-facing total. */
  finalTotal: number;
  /** True if the selected-area sum was below $140 and got raised to the
   *  minimum. Not shown as a line item, just useful context in review UI. */
  minimumApplied: boolean;
}

export interface DurationBreakdown {
  /** Raw estimated active cleaner-minutes before the scheduling buffer. */
  baseCleanerMinutes: number;
  conditionMinutes: number;
  petHairMinutes: number;
  addOnMinutes: number;
  /** Extra active cleaner-minutes for sorting laundry when the customer
   *  said it isn't pre-sorted — 0 whenever laundryAlreadySorted is true
   *  or no laundry was selected. Never affects price. */
  laundrySortingMinutes: number;
  specialtyContingencyMinutes: number;
  /** Sum of all of the above (this is the "cleanerMinutes" figure —
   *  active cleaner labor only, distinct from estimatedLaundryCompletion
   *  and appointmentMinutes below). */
  totalCleanerMinutes: number;
  /** totalCleanerMinutes with the 15% scheduling buffer applied. */
  bufferedMinutes: number;
  /** Wall-clock time (not active cleaner labor) for the selected laundry
   *  loads to finish washing/drying, modeled as a one-washer/one-dryer
   *  pipeline (see laundryPipelineMinutes() in engine.ts) — 0 if no
   *  laundry selected. Deliberately kept separate from both
   *  totalCleanerMinutes and appointmentMinutes: it's compared against
   *  bufferedMinutes (whichever is longer governs scheduling) but never
   *  added into either, and it's exposed as its own field specifically so
   *  a future change to the pipeline model or appliance assumptions (e.g.
   *  two washers/dryers) only ever needs to change how this one number is
   *  computed — never shown to the customer. */
  estimatedLaundryCompletion: number;
  /** max(bufferedMinutes, estimatedLaundryCompletion), rounded up to the
   *  next 30-minute block — this is the actual calendar reservation
   *  length. Never shown to the customer as a promise of exact
   *  cleaner-hours; only used for scheduling. */
  appointmentMinutes: number;
}

export interface DepositBreakdown {
  finalCleaningTotal: number;
  depositDue: number;
  remainingBalance: number;
}

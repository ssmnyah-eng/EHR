import {
  ADD_ON_CONFIG,
  ADD_ON_ELIGIBILITY,
  BATHROOM_BUILDUP_ADJUSTMENT,
  CLEANING_DEPOSIT,
  CLUTTER_ADJUSTMENT,
  CONDITION_CHARGE_CAP_PERCENT,
  DUST_ADJUSTMENT,
  FINISHED_BASEMENT_DURATION_MINUTES,
  FINISHED_BASEMENT_PRICE,
  FIXED_AREA_DURATION_MINUTES,
  FIXED_AREA_PRICE,
  HALF_BATHROOM_DURATION_MINUTES,
  KITCHEN_GREASE_ADJUSTMENT,
  LAUNDRY_DRYER_MINUTES,
  LAUNDRY_TRANSFER_FOLD_MINUTES,
  LAUNDRY_UNSORTED_MINUTES_PER_LOAD,
  LAUNDRY_WASHER_MINUTES,
  MINIMUM_BOOKING_PRICE,
  PET_HAIR_ADJUSTMENT,
  SCHEDULING_BUFFER_PERCENT,
  SIZED_AREA_DURATION_MINUTES,
  SIZED_AREA_PRICE,
  SPECIALTY_TIME_CONTINGENCY_PERCENT,
  TIME_SINCE_CLEANING_ADJUSTMENT,
  WHOLE_HOME_BASE_PRICE,
  WHOLE_HOME_CLEANER_HOURS,
  wholeHomeSizeBand,
} from "./config";
import type {
  AddOnType,
  CleaningPricingInput,
  DepositBreakdown,
  DurationBreakdown,
  PriceBreakdown,
  PriceLineItem,
  SelectedArea,
} from "./types";

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

function roundToNearestDollar(n: number): number {
  return Math.round(n);
}

/** Entire-home base price from the approved whole-home band table. */
function wholeHomeBasePrice(input: CleaningPricingInput): number {
  const band = wholeHomeSizeBand(input.squareFootage);
  return WHOLE_HOME_BASE_PRICE[input.tier][band];
}

/** Sum of selected-area unit prices, with the $140 minimum enforced. */
function selectedAreaBasePrice(selectedAreas: SelectedArea[]): { basePrice: number; minimumApplied: boolean } {
  let sum = 0;
  for (const area of selectedAreas) {
    if (area.type === "finished-basement") {
      sum += FINISHED_BASEMENT_PRICE[area.size ?? "small"] * area.count;
    } else if (area.type in SIZED_AREA_PRICE) {
      sum += SIZED_AREA_PRICE[area.type as keyof typeof SIZED_AREA_PRICE] * area.count;
    } else {
      sum += FIXED_AREA_PRICE[area.type as keyof typeof FIXED_AREA_PRICE] * area.count;
    }
  }
  if (sum < MINIMUM_BOOKING_PRICE) return { basePrice: MINIMUM_BOOKING_PRICE, minimumApplied: true };
  return { basePrice: sum, minimumApplied: false };
}

export function calculateBasePrice(input: CleaningPricingInput): { basePrice: number; minimumApplied: boolean } {
  if (input.scope === "entire-home") {
    return { basePrice: wholeHomeBasePrice(input), minimumApplied: false };
  }
  return selectedAreaBasePrice(input.selectedAreas);
}

/** Ordinary condition-labor charges: kitchen grease, bathroom buildup
 *  (per affected bathroom), dust, clutter/access, and time-since-last-
 *  cleaning. Pet hair is calculated separately and is NOT subject to the
 *  35%-of-base cap (per spec: "excluding pet hair and separately
 *  purchased add-ons"). */
function conditionChargesUncapped(input: CleaningPricingInput): { amount: number; minutes: number } {
  const { condition } = input;
  let amount = 0;
  let minutes = 0;

  const grease = KITCHEN_GREASE_ADJUSTMENT[condition.kitchenGrease];
  amount += grease.amount;
  minutes += grease.minutes;

  for (const level of condition.bathroomBuildup) {
    const buildup = BATHROOM_BUILDUP_ADJUSTMENT[level];
    amount += buildup.amount;
    minutes += buildup.minutes;
  }

  const dust = DUST_ADJUSTMENT[condition.dustAccumulation];
  amount += dust.amount;
  minutes += dust.minutes;

  const clutter = CLUTTER_ADJUSTMENT[condition.clutterAccess];
  amount += clutter.amount;
  minutes += clutter.minutes;

  amount += TIME_SINCE_CLEANING_ADJUSTMENT[condition.timeSinceCleaning];

  return { amount, minutes };
}

export function calculateAddOns(input: CleaningPricingInput): { addOnCharges: number; addOnLineItems: PriceLineItem[]; addOnMinutes: number } {
  let addOnCharges = 0;
  let addOnMinutes = 0;
  const addOnLineItems: PriceLineItem[] = [];

  for (const selected of input.addOns) {
    const eligible = ADD_ON_ELIGIBILITY[input.tier][selected.type];
    if (!eligible) continue;
    const config = ADD_ON_CONFIG[selected.type as AddOnType];
    // Never trust a client-submitted quantity above the configured cap
    // (e.g. laundry's 3-load online limit) — clamp defensively here too,
    // not just in the wizard UI.
    const uncappedQuantity = config.unit === "flat" ? 1 : Math.max(1, selected.quantity);
    const quantity = config.maxQuantity ? Math.min(uncappedQuantity, config.maxQuantity) : uncappedQuantity;
    const lineAmount = config.price * quantity;
    addOnCharges += lineAmount;
    addOnMinutes += config.minutes * quantity;
    addOnLineItems.push({
      label: quantity > 1 ? `${config.label} (×${quantity})` : config.label,
      amount: lineAmount,
    });
  }

  return { addOnCharges, addOnLineItems, addOnMinutes };
}

/** Active cleaner-minutes for the base service itself, before any
 *  condition/add-on adjustments — whole-home cleaner-hours converted to
 *  minutes, or the sum of each selected area's duration. */
function baseServiceMinutes(input: CleaningPricingInput): number {
  if (input.scope === "entire-home") {
    const band = wholeHomeSizeBand(input.squareFootage);
    return Math.round(WHOLE_HOME_CLEANER_HOURS[input.tier][band] * 60);
  }

  let minutes = 0;
  for (const area of input.selectedAreas) {
    if (area.type === "finished-basement") {
      minutes += FINISHED_BASEMENT_DURATION_MINUTES[input.tier][area.size ?? "small"] * area.count;
    } else if (area.type === "half-bathroom") {
      minutes += HALF_BATHROOM_DURATION_MINUTES[input.tier] * area.count;
    } else if (area.type in SIZED_AREA_DURATION_MINUTES) {
      const table = SIZED_AREA_DURATION_MINUTES[area.type as keyof typeof SIZED_AREA_DURATION_MINUTES];
      minutes += table[input.tier][area.size ?? "average"] * area.count;
    } else {
      const table = FIXED_AREA_DURATION_MINUTES[area.type as keyof typeof FIXED_AREA_DURATION_MINUTES];
      minutes += table[input.tier] * area.count;
    }
  }
  return minutes;
}

/**
 * Full price breakdown. For entire-home:
 *   approved whole-home base price
 *   + condition labor charges (capped at 35% of base)
 *   + pet-hair adjustment
 *   + eligible purchased add-ons
 *   - recurring discount, if any
 *   = finalCleaningTotal
 * For selected-areas: same, but the base price is the summed area prices
 * with the $140 minimum enforced first.
 */
export function calculatePrice(input: CleaningPricingInput): PriceBreakdown {
  const { basePrice, minimumApplied } = calculateBasePrice(input);

  const uncapped = conditionChargesUncapped(input);
  const cap = round2(basePrice * CONDITION_CHARGE_CAP_PERCENT);
  const conditionCharges = roundToNearestDollar(Math.min(uncapped.amount, cap));

  const petHair = PET_HAIR_ADJUSTMENT[input.condition.petHair];
  const petHairCharge = petHair.amount;

  const { addOnCharges, addOnLineItems } = calculateAddOns(input);

  const subtotal = basePrice + conditionCharges + petHairCharge + addOnCharges;
  const recurringDiscount = roundToNearestDollar(subtotal * (input.recurringDiscountPercent / 100));
  const finalTotal = Math.max(0, subtotal - recurringDiscount);

  return {
    basePrice,
    conditionCharges,
    conditionChargesUncapped: roundToNearestDollar(uncapped.amount),
    petHairCharge,
    addOnCharges,
    addOnLineItems,
    recurringDiscount,
    finalTotal,
    minimumApplied,
  };
}

/** Loads of laundry actually selected (0 if none), clamped to the online
 *  cap — mirrors the same defensive clamp calculateAddOns() applies to
 *  pricing, so a tampered quantity can't inflate the reserved appointment
 *  length either. */
function laundryLoadCount(input: CleaningPricingInput): number {
  const laundry = input.addOns.find((a) => a.type === "laundry");
  if (!laundry) return 0;
  const cap = ADD_ON_CONFIG.laundry.maxQuantity;
  return cap ? Math.min(Math.max(0, laundry.quantity), cap) : Math.max(0, laundry.quantity);
}

/**
 * Wall-clock time for `loads` loads of laundry to fully wash, dry, and be
 * pulled out — modeled as a pipeline through one washer and one dryer
 * (load 2 can start washing while load 1 dries), not a flat per-load
 * multiplier. Iterates rather than using a closed-form formula since
 * `loads` is always small (capped at LAUNDRY_MAX_ONLINE_LOADS) and this
 * stays obviously correct for any relative sizing of the three inputs.
 * Swap LAUNDRY_WASHER_MINUTES / LAUNDRY_DRYER_MINUTES /
 * LAUNDRY_TRANSFER_FOLD_MINUTES in config.ts to change the model — this
 * function (or a replacement, e.g. for a two-washer/two-dryer setup) is
 * the only place that would ever need to change if EHR's appliance setup
 * changes; nothing else in the booking system depends on how this number
 * is derived, only on its result (see DurationBreakdown.
 * estimatedLaundryCompletion).
 */
function laundryPipelineMinutes(loads: number): number {
  if (loads <= 0) return 0;
  let dryFinish = 0;
  for (let load = 1; load <= loads; load++) {
    const washFinish = load * LAUNDRY_WASHER_MINUTES;
    const dryStart = Math.max(washFinish + LAUNDRY_TRANSFER_FOLD_MINUTES, dryFinish);
    dryFinish = dryStart + LAUNDRY_DRYER_MINUTES;
  }
  // Final transfer/fold buffer for the last load — earlier loads' folding
  // can happen while later loads are still washing/drying, so only the
  // very last one extends the timeline.
  return dryFinish + LAUNDRY_TRANSFER_FOLD_MINUTES;
}

/**
 * Full duration breakdown, ending in the actual calendar reservation
 * length. Laundry is scheduled differently from every other add-on: its
 * ACTIVE cleaner-minutes (loading/folding, plus extra sorting time if the
 * customer says laundry isn't pre-sorted) are included in the normal
 * cleaner-minutes total like any other add-on, but machine runtime is
 * not — the appointment must instead reserve whichever is longer, the
 * buffered cleaning duration or the wall-clock time for the selected
 * laundry to finish (see laundryPipelineMinutes()), so the cleaner is
 * never scheduled to leave before the laundry is done. Everything else
 * here is unchanged: total estimated cleaner-minutes, +15% scheduling
 * buffer (+15% specialty contingency first, if flagged), rounded up to
 * the next 30-minute block. None of this is exposed to the customer as a
 * labor-hour or staffing promise — see DurationBreakdown's field
 * comments.
 */
export function calculateDuration(input: CleaningPricingInput): DurationBreakdown {
  const baseCleanerMinutes = baseServiceMinutes(input);

  const uncapped = conditionChargesUncapped(input);
  const conditionMinutes = uncapped.minutes;

  const petHair = PET_HAIR_ADJUSTMENT[input.condition.petHair];
  const petHairMinutes = petHair.minutes;

  const { addOnMinutes } = calculateAddOns(input);

  const loads = laundryLoadCount(input);
  // Scheduling only — never changes price. Sorting doesn't affect the
  // machine pipeline itself, only how long the cleaner spends sorting
  // before/while it runs, so it's added to active minutes, not
  // estimatedLaundryCompletion.
  const laundrySortingMinutes = loads > 0 && !input.laundryAlreadySorted ? loads * LAUNDRY_UNSORTED_MINUTES_PER_LOAD : 0;

  const preContingency = baseCleanerMinutes + conditionMinutes + petHairMinutes + addOnMinutes + laundrySortingMinutes;
  const specialtyContingencyMinutes = input.hasSpecialtyCondition ? Math.round(preContingency * SPECIALTY_TIME_CONTINGENCY_PERCENT) : 0;

  const totalCleanerMinutes = preContingency + specialtyContingencyMinutes;
  const bufferedMinutes = Math.round(totalCleanerMinutes * (1 + SCHEDULING_BUFFER_PERCENT));

  const estimatedLaundryCompletion = laundryPipelineMinutes(loads);
  const appointmentMinutes = Math.ceil(Math.max(bufferedMinutes, estimatedLaundryCompletion) / 30) * 30;

  return {
    baseCleanerMinutes,
    conditionMinutes,
    petHairMinutes,
    addOnMinutes,
    laundrySortingMinutes,
    specialtyContingencyMinutes,
    totalCleanerMinutes,
    bufferedMinutes,
    estimatedLaundryCompletion,
    appointmentMinutes,
  };
}

/** depositDue = min(140, finalCleaningTotal); remainingBalance =
 *  finalCleaningTotal - depositDue. The deposit is credited toward the
 *  total, never an additional fee. */
export function calculateDeposit(finalCleaningTotal: number): DepositBreakdown {
  const depositDue = Math.min(CLEANING_DEPOSIT, finalCleaningTotal);
  const remainingBalance = round2(finalCleaningTotal - depositDue);
  return { finalCleaningTotal, depositDue, remainingBalance };
}

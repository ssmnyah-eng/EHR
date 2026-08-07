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
    const quantity = config.unit === "flat" ? 1 : Math.max(1, selected.quantity);
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

/**
 * Full duration breakdown, ending in the actual calendar reservation
 * length: total estimated cleaner-minutes, +15% scheduling buffer (+15%
 * specialty contingency first, if flagged), rounded up to the next
 * 30-minute block. None of this is exposed to the customer as a labor-
 * hour or staffing promise — see DurationBreakdown's field comments.
 */
export function calculateDuration(input: CleaningPricingInput): DurationBreakdown {
  const baseCleanerMinutes = baseServiceMinutes(input);

  const uncapped = conditionChargesUncapped(input);
  const conditionMinutes = uncapped.minutes;

  const petHair = PET_HAIR_ADJUSTMENT[input.condition.petHair];
  const petHairMinutes = petHair.minutes;

  const { addOnMinutes } = calculateAddOns(input);

  const preContingency = baseCleanerMinutes + conditionMinutes + petHairMinutes + addOnMinutes;
  const specialtyContingencyMinutes = input.hasSpecialtyCondition ? Math.round(preContingency * SPECIALTY_TIME_CONTINGENCY_PERCENT) : 0;

  const totalCleanerMinutes = preContingency + specialtyContingencyMinutes;
  const bufferedMinutes = Math.round(totalCleanerMinutes * (1 + SCHEDULING_BUFFER_PERCENT));
  const appointmentMinutes = Math.ceil(bufferedMinutes / 30) * 30;

  return {
    baseCleanerMinutes,
    conditionMinutes,
    petHairMinutes,
    addOnMinutes,
    specialtyContingencyMinutes,
    totalCleanerMinutes,
    bufferedMinutes,
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

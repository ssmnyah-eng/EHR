import type { CleaningPricingInput, ConditionLevel } from "@/lib/cleaning-pricing/types";
import type { CleaningBookingFormState } from "./types";
import { SQUARE_FOOTAGE_BAND_REPRESENTATIVE } from "./squareFootageBands";

/** Converts wizard form state (all strings, since it's driven by form
 *  inputs) into the typed engine input. Shared by the live review price,
 *  the schedule/deposit step, and the final submission payload so the
 *  browser-side estimate and the submitted record are always computed
 *  from the exact same conversion — the server-side handler that
 *  eventually creates the Square payment/booking must re-run this same
 *  shape of conversion + lib/cleaning-pricing/engine against the
 *  submitted answers rather than trusting the number the browser shows. */
export function buildPricingInput(state: CleaningBookingFormState): CleaningPricingInput | null {
  if (!state.tier || !state.scope) return null;
  const squareFootage = state.squareFootage ? SQUARE_FOOTAGE_BAND_REPRESENTATIVE[state.squareFootage] : 0;

  return {
    tier: state.tier,
    scope: state.scope,
    squareFootage,
    selectedAreas: state.selectedAreas,
    condition: {
      timeSinceCleaning: state.timeSinceCleaning || "within-30-days",
      kitchenGrease: (state.kitchenGrease || "light") as ConditionLevel,
      bathroomBuildup: state.bathroomBuildup,
      dustAccumulation: (state.dustAccumulation || "light") as ConditionLevel,
      clutterAccess: state.clutterAccess || "accessible",
      petHair: state.petHair || "none-light",
    },
    addOns: state.addOns,
    laundryAlreadySorted: state.laundryAlreadySorted !== "no",
    recurringDiscountPercent: 0,
    hasSpecialtyCondition: state.specialtyTypes.length > 0 || state.clutterAccess === "extreme",
  };
}

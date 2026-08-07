"use client";

import { TIER_LABELS, AREA_LABELS, ADD_ON_CONFIG } from "@/lib/cleaning-pricing/config";
import { calculateDeposit, calculatePrice } from "@/lib/cleaning-pricing/engine";
import { ROOM_SIZE_LABELS, PET_HAIR_OPTIONS } from "@/content/cleaning-booking-options";
import { buildPricingInput } from "./buildPricingInput";
import { SQUARE_FOOTAGE_BAND_LABELS } from "./squareFootageBands";
import type { CleaningBookingFormState } from "./types";
import styles from "./CleaningBookingWizard.module.css";

interface BookingSummaryProps {
  state: CleaningBookingFormState;
}

function formatSlot(startTime: string): string {
  try {
    return new Intl.DateTimeFormat(undefined, { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(startTime));
  } catch {
    return startTime;
  }
}

function formatDate(dateString: string): string {
  try {
    return new Intl.DateTimeFormat(undefined, { weekday: "short", month: "short", day: "numeric" }).format(new Date(`${dateString}T12:00:00`));
  } catch {
    return dateString;
  }
}

/**
 * Live, always-current recap of everything entered so far — visible
 * alongside every step from the moment the customer starts Step 1
 * onward, so nothing they've already answered is ever out of sight.
 * Reads directly from the same wizard state every step writes to, so it
 * updates automatically with no separate state of its own, and reflects
 * exactly what going back and changing an earlier answer actually did.
 */
export function BookingSummary({ state }: BookingSummaryProps) {
  const hasStarted = Boolean(state.tier || state.scope || state.squareFootage);
  if (!hasStarted) return null;

  const input = buildPricingInput(state);
  const price = input ? calculatePrice(input) : null;
  const deposit = price ? calculateDeposit(price.finalTotal) : null;

  const laundry = state.addOns.find((a) => a.type === "laundry" && a.quantity > 0);
  const otherAddOns = state.addOns.filter((a) => a.type !== "laundry" && a.quantity > 0);
  const petHairOption = state.petHair ? PET_HAIR_OPTIONS.find((o) => o.value === state.petHair) : undefined;

  return (
    <aside className={styles.summaryPanel} aria-label="Your booking so far">
      <p className={styles.summaryHeading}>Your Booking So Far</p>

      <div className={styles.summaryGroup}>
        <p className={styles.summaryGroupLabel}>Your Home</p>
        <ul className={styles.summaryList}>
          {state.scope ? <li>{state.scope === "entire-home" ? "Entire Home" : "Selected Areas"}</li> : null}
          {state.scope === "entire-home" && state.wholeHomeBedrooms ? (
            <li>
              {state.wholeHomeBedrooms} Bedroom{state.wholeHomeBedrooms === "1" ? "" : "s"}
            </li>
          ) : null}
          {state.scope === "entire-home" && state.bathroomCount ? (
            <li>
              {state.bathroomCount} Bathroom{state.bathroomCount === "1" ? "" : "s"}
            </li>
          ) : null}
          {state.squareFootage ? <li>{SQUARE_FOOTAGE_BAND_LABELS[state.squareFootage]}</li> : null}
          {state.scope === "selected-areas"
            ? state.selectedAreas.map((area) => (
                <li key={area.type}>
                  {AREA_LABELS[area.type]}
                  {area.size ? ` (${ROOM_SIZE_LABELS[area.size]})` : ""} × {area.count}
                </li>
              ))
            : null}
        </ul>
      </div>

      {state.tier ? (
        <div className={styles.summaryGroup}>
          <p className={styles.summaryGroupLabel}>Cleaning Service</p>
          <ul className={styles.summaryList}>
            <li>{TIER_LABELS[state.tier]}</li>
          </ul>
        </div>
      ) : null}

      {laundry ? (
        <div className={styles.summaryGroup}>
          <p className={styles.summaryGroupLabel}>Laundry</p>
          <ul className={styles.summaryList}>
            <li>
              {laundry.quantity} Load{laundry.quantity === 1 ? "" : "s"}
            </li>
          </ul>
        </div>
      ) : null}

      {otherAddOns.length > 0 ? (
        <div className={styles.summaryGroup}>
          <p className={styles.summaryGroupLabel}>Add-Ons</p>
          <ul className={styles.summaryList}>
            {otherAddOns.map((a) => (
              <li key={a.type}>
                {ADD_ON_CONFIG[a.type].label}
                {a.quantity > 1 ? ` (×${a.quantity})` : ""}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {petHairOption ? (
        <div className={styles.summaryGroup}>
          <p className={styles.summaryGroupLabel}>Pets</p>
          <ul className={styles.summaryList}>
            <li>{petHairOption.label}</li>
          </ul>
        </div>
      ) : null}

      {state.preferredDate || state.selectedSlotStart ? (
        <div className={styles.summaryGroup}>
          <p className={styles.summaryGroupLabel}>Schedule</p>
          <ul className={styles.summaryList}>
            {state.selectedSlotStart ? (
              <li>{formatSlot(state.selectedSlotStart)}</li>
            ) : (
              <>
                {state.preferredDate ? <li>{formatDate(state.preferredDate)}</li> : null}
                {state.preferredTimeWindow ? <li>{state.preferredTimeWindow}</li> : null}
              </>
            )}
          </ul>
        </div>
      ) : null}

      {price && deposit ? (
        <div className={styles.summaryPriceCard}>
          <span className={styles.summaryPriceLabel}>Estimated total</span>
          <span className={styles.summaryPriceTotal}>${price.finalTotal}</span>
          <span className={styles.summaryPriceNote}>${deposit.depositDue} deposit due to book</span>
        </div>
      ) : null}
    </aside>
  );
}

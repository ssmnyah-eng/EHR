"use client";

import { useState } from "react";
import { calculateDeposit, calculatePrice } from "@/lib/cleaning-pricing/engine";
import { getAvailability, type AvailabilitySlot } from "@/lib/square-client";
import { buildPricingInput } from "../buildPricingInput";
import type { StepProps } from "../types";
import styles from "../CleaningBookingWizard.module.css";

const TIME_WINDOWS = ["Morning (8am–12pm)", "Afternoon (12pm–4pm)", "Flexible / either works"];

function formatSlot(startTime: string): string {
  try {
    return new Intl.DateTimeFormat(undefined, { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(startTime));
  } catch {
    return startTime;
  }
}

/**
 * Real-time Square availability search with an honest fallback: if the
 * live API can't be reached (not deployed yet, network issue, Square
 * outage), the customer can still pick a general preferred time window
 * and have the booking submitted for staff follow-up instead — never a
 * dead end. Continue's behavior in the parent wizard is driven entirely
 * by which of the two the customer actually used (selectedSlotStart vs.
 * preferredTimeWindow).
 */
export function Step8Schedule({ state, updateField, errors }: StepProps) {
  const input = buildPricingInput(state);
  const price = input ? calculatePrice(input) : null;
  const deposit = price ? calculateDeposit(price.finalTotal) : null;

  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [searchState, setSearchState] = useState<"idle" | "loading" | "loaded" | "unavailable">("idle");
  const [searchedDate, setSearchedDate] = useState("");

  async function handleFindTimes() {
    if (!input || !state.preferredDate) return;
    setSearchState("loading");
    updateField("selectedSlotStart", "");
    updateField("selectedSlotEnd", "");
    try {
      const result = await getAvailability({ serviceDate: state.preferredDate, pricingInput: input });
      setSlots(result.slots);
      setSearchedDate(state.preferredDate);
      setSearchState("loaded");
    } catch {
      // Covers BookingApiNotConfiguredError and any live request failure
      // (network issue, Square outage, misconfiguration) identically —
      // either way, live scheduling isn't usable right now.
      setSearchState("unavailable");
    }
  }

  function selectSlot(slot: AvailabilitySlot) {
    updateField("selectedSlotStart", slot.startTime);
    updateField("selectedSlotEnd", slot.endTime);
    updateField("preferredTimeWindow", "");
  }

  function chooseFallbackWindow(window: string) {
    updateField("preferredTimeWindow", window);
    updateField("selectedSlotStart", "");
    updateField("selectedSlotEnd", "");
  }

  return (
    <div className={styles.stepPanel}>
      <h2 className={styles.stepHeading}>Choose a time and secure your booking.</h2>
      <p className={styles.stepIntro}>Pick a date to see real open appointment times, then select one to continue to payment.</p>

      <div className={styles.fieldGroup}>
        <div className={styles.field}>
          <label htmlFor="step8-date" className={styles.label}>
            Preferred date
          </label>
          <input
            id="step8-date"
            type="date"
            value={state.preferredDate}
            onChange={(e) => {
              updateField("preferredDate", e.target.value);
              updateField("selectedSlotStart", "");
              updateField("selectedSlotEnd", "");
              setSearchState("idle");
            }}
            className={styles.input}
            aria-invalid={errors.preferredDate ? true : undefined}
            aria-describedby={errors.preferredDate ? "step8-date-error" : undefined}
          />
          {errors.preferredDate ? (
            <p id="step8-date-error" className={styles.fieldError} role="alert">
              {errors.preferredDate}
            </p>
          ) : null}
        </div>

        <button type="button" className={styles.backButton} onClick={handleFindTimes} disabled={!state.preferredDate || searchState === "loading"}>
          {searchState === "loading" ? "Finding times…" : "Find available times"}
        </button>

        {searchState === "loaded" ? (
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Available times for {formatSlot(searchedDate + "T12:00:00")}</legend>
            {slots.length === 0 ? (
              <p className={styles.inlineNote}>No open times on that date — try another date, or use the general time-window option below.</p>
            ) : (
              <div className={styles.slotGrid}>
                {slots.map((slot) => (
                  <button
                    key={slot.startTime}
                    type="button"
                    className={styles.slotButton}
                    aria-pressed={state.selectedSlotStart === slot.startTime}
                    onClick={() => selectSlot(slot)}
                  >
                    {formatSlot(slot.startTime)}
                  </button>
                ))}
              </div>
            )}
          </fieldset>
        ) : null}

        {searchState === "unavailable" ? (
          <div className={styles.fieldGroup}>
            <p className={styles.inlineNote}>
              Live scheduling isn&apos;t available right now. Choose a general preferred time window instead — we&apos;ll confirm your exact time and collect your
              deposit by phone.
            </p>
            <fieldset className={styles.fieldset}>
              <legend className={styles.legend}>Preferred time window</legend>
              <div className={styles.choiceGrid}>
                {TIME_WINDOWS.map((window) => (
                  <label key={window} className={styles.choiceCard}>
                    <input
                      type="radio"
                      name="preferredTimeWindow"
                      value={window}
                      checked={state.preferredTimeWindow === window}
                      onChange={() => chooseFallbackWindow(window)}
                      className={styles.choiceInput}
                    />
                    <span className={styles.choiceLabel}>{window}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        ) : null}

        {errors.selectedSlotStart ? (
          <p className={styles.fieldError} role="alert">
            {errors.selectedSlotStart}
          </p>
        ) : null}

        <div className={styles.field}>
          <label htmlFor="step8-notes" className={styles.label}>
            Scheduling notes <span className={styles.optionalTag}>(optional)</span>
          </label>
          <textarea
            id="step8-notes"
            rows={2}
            value={state.schedulingNotes}
            onChange={(e) => updateField("schedulingNotes", e.target.value)}
            className={styles.textarea}
          />
        </div>
      </div>

      {deposit ? (
        <div className={styles.priceCard}>
          <span className={styles.priceCardLabel}>Due to book</span>
          <span className={styles.priceCardTotal}>${deposit.depositDue}</span>
          <span className={styles.priceCardNote}>
            Credited toward your ${deposit.finalCleaningTotal} total — not an additional fee. Remaining balance of $
            {deposit.remainingBalance} is due at service.
          </span>
        </div>
      ) : null}
    </div>
  );
}

"use client";

import { ADD_ON_CONFIG, ADD_ON_ELIGIBILITY } from "@/lib/cleaning-pricing/config";
import { ADD_ON_OPTIONS } from "@/content/cleaning-booking-options";
import type { StepProps } from "../types";
import styles from "../CleaningBookingWizard.module.css";

export function Step4AddOns({ state, updateField, errors }: StepProps) {
  const eligibility = state.tier ? ADD_ON_ELIGIBILITY[state.tier] : undefined;
  const eligibleAddOns = ADD_ON_OPTIONS.filter((option) => !eligibility || eligibility[option.value]);

  function quantityFor(type: (typeof ADD_ON_OPTIONS)[number]["value"]): number {
    return state.addOns.find((a) => a.type === type)?.quantity ?? 0;
  }

  function setQuantity(type: (typeof ADD_ON_OPTIONS)[number]["value"], quantity: number) {
    const max = ADD_ON_CONFIG[type].maxQuantity ?? 20;
    const clamped = Math.max(0, Math.min(max, quantity));
    const others = state.addOns.filter((a) => a.type !== type);
    if (clamped === 0) {
      updateField("addOns", others);
      return;
    }
    updateField("addOns", [...others, { type, quantity: clamped }]);
  }

  function toggleLargeLaundryRequest() {
    const next = !state.largeLaundryRequest;
    updateField("largeLaundryRequest", next);
    if (!next) {
      updateField("estimatedLaundryLoads", "");
      updateField("laundryNotes", "");
    }
  }

  return (
    <div className={styles.stepPanel}>
      <h2 className={styles.stepHeading}>Would you like to add anything to your clean?</h2>
      <p className={styles.stepIntro}>All optional — add only what you&apos;d like. Nothing here is already included in your selected clean.</p>

      <div className={styles.fieldGroup}>
        {eligibleAddOns.map((option) => {
          const config = ADD_ON_CONFIG[option.value];
          const quantity = quantityFor(option.value);
          const isFlat = option.unit === "flat";
          const isLaundry = option.value === "laundry";
          const atMax = config.maxQuantity !== undefined && quantity >= config.maxQuantity;
          const unitLabel = option.unit === "load" ? "load" : option.unit === "window" ? "window" : option.unit === "bed" ? "bed" : option.unit === "set" ? "set" : "";

          return (
            <div key={option.value}>
              <div className={styles.unitRow}>
                <div className={styles.unitInfo}>
                  <span className={styles.unitLabel}>{option.label}</span>
                  <span className={styles.unitPrice}>
                    ${config.price} {unitLabel ? `per ${unitLabel}` : ""}
                  </span>
                </div>
                {isFlat ? (
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      className={styles.checkboxInput}
                      checked={quantity > 0}
                      onChange={() => setQuantity(option.value, quantity > 0 ? 0 : 1)}
                    />
                    Add
                  </label>
                ) : (
                  <div className={styles.stepper}>
                    <button
                      type="button"
                      className={styles.stepperButton}
                      onClick={() => setQuantity(option.value, quantity - 1)}
                      disabled={quantity === 0}
                      aria-label={`Remove one ${option.label}`}
                    >
                      &minus;
                    </button>
                    <span className={styles.stepperValue} data-zero={quantity === 0}>
                      {quantity}
                    </span>
                    <button
                      type="button"
                      className={styles.stepperButton}
                      onClick={() => setQuantity(option.value, quantity + 1)}
                      disabled={atMax}
                      aria-label={`Add one ${option.label}`}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>

              {isLaundry ? (
                <div style={{ marginTop: "var(--space-xs)", marginBottom: "var(--space-sm)" }}>
                  <button type="button" className={styles.editButton} onClick={toggleLargeLaundryRequest}>
                    {state.largeLaundryRequest ? "Never mind, 3 loads or fewer works" : "Need more than 3 loads of laundry?"}
                  </button>

                  {state.largeLaundryRequest ? (
                    <div className={styles.specialtyIntro} style={{ marginTop: "var(--space-xs)" }}>
                      <p className={styles.specialtyIntroHeading}>Need more than 3 loads of laundry?</p>
                      <p className={styles.specialtyIntroBody}>
                        We&apos;d be happy to help. Larger laundry requests require additional scheduling to ensure enough time is reserved for your
                        appointment. Please let us know approximately how many loads you have, and our team will review your request before confirming
                        the appointment.
                      </p>

                      <div className={styles.field} style={{ marginTop: "var(--space-sm)" }}>
                        <label htmlFor="step4-estimated-loads" className={styles.label}>
                          Estimated number of loads
                        </label>
                        <input
                          id="step4-estimated-loads"
                          type="number"
                          inputMode="numeric"
                          min={4}
                          value={state.estimatedLaundryLoads}
                          onChange={(e) => updateField("estimatedLaundryLoads", e.target.value)}
                          className={styles.input}
                          aria-invalid={errors.estimatedLaundryLoads ? true : undefined}
                          aria-describedby={errors.estimatedLaundryLoads ? "step4-estimated-loads-error" : undefined}
                        />
                        {errors.estimatedLaundryLoads ? (
                          <p id="step4-estimated-loads-error" className={styles.fieldError} role="alert">
                            {errors.estimatedLaundryLoads}
                          </p>
                        ) : null}
                      </div>

                      <div className={styles.field}>
                        <label htmlFor="step4-laundry-notes" className={styles.label}>
                          Notes <span className={styles.optionalTag}>(optional)</span>
                        </label>
                        <textarea
                          id="step4-laundry-notes"
                          rows={2}
                          value={state.laundryNotes}
                          onChange={(e) => updateField("laundryNotes", e.target.value)}
                          className={styles.textarea}
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

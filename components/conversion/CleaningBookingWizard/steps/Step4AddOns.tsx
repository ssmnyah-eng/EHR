"use client";

import { ADD_ON_CONFIG, ADD_ON_ELIGIBILITY } from "@/lib/cleaning-pricing/config";
import { ADD_ON_OPTIONS } from "@/content/cleaning-booking-options";
import type { StepProps } from "../types";
import styles from "../CleaningBookingWizard.module.css";

export function Step4AddOns({ state, updateField }: StepProps) {
  const eligibility = state.tier ? ADD_ON_ELIGIBILITY[state.tier] : undefined;
  const eligibleAddOns = ADD_ON_OPTIONS.filter((option) => !eligibility || eligibility[option.value]);

  function quantityFor(type: (typeof ADD_ON_OPTIONS)[number]["value"]): number {
    return state.addOns.find((a) => a.type === type)?.quantity ?? 0;
  }

  function setQuantity(type: (typeof ADD_ON_OPTIONS)[number]["value"], quantity: number) {
    const clamped = Math.max(0, Math.min(20, quantity));
    const others = state.addOns.filter((a) => a.type !== type);
    if (clamped === 0) {
      updateField("addOns", others);
      return;
    }
    updateField("addOns", [...others, { type, quantity: clamped }]);
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
          const unitLabel = option.unit === "load" ? "load" : option.unit === "window" ? "window" : option.unit === "bed" ? "bed" : option.unit === "set" ? "set" : "";

          return (
            <div className={styles.unitRow} key={option.value}>
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
                    aria-label={`Add one ${option.label}`}
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

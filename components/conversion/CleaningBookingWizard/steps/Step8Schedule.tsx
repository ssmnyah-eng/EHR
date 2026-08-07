"use client";

import { calculateDeposit, calculatePrice } from "@/lib/cleaning-pricing/engine";
import { buildPricingInput } from "../buildPricingInput";
import type { StepProps } from "../types";
import styles from "../CleaningBookingWizard.module.css";

const TIME_WINDOWS = ["Morning (8am–12pm)", "Afternoon (12pm–4pm)", "Flexible / either works"];

export function Step8Schedule({ state, updateField, errors }: StepProps) {
  const input = buildPricingInput(state);
  const price = input ? calculatePrice(input) : null;
  const deposit = price ? calculateDeposit(price.finalTotal) : null;

  return (
    <div className={styles.stepPanel}>
      <h2 className={styles.stepHeading}>Choose a preferred time and secure your booking.</h2>
      <p className={styles.stepIntro}>
        Tell us your preferred date and time window. We&apos;ll confirm your exact appointment time and collect your deposit to reserve it.
      </p>

      <div className={styles.fieldGroup}>
        <div className={styles.field}>
          <label htmlFor="step8-date" className={styles.label}>
            Preferred date
          </label>
          <input
            id="step8-date"
            type="date"
            value={state.preferredDate}
            onChange={(e) => updateField("preferredDate", e.target.value)}
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
                  onChange={() => updateField("preferredTimeWindow", window)}
                  className={styles.choiceInput}
                />
                <span className={styles.choiceLabel}>{window}</span>
              </label>
            ))}
          </div>
          {errors.preferredTimeWindow ? (
            <p className={styles.fieldError} role="alert">
              {errors.preferredTimeWindow}
            </p>
          ) : null}
        </fieldset>

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

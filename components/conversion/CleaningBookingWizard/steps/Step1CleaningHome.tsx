"use client";

import { TIER_LABELS } from "@/lib/cleaning-pricing/config";
import { STANDARD_CLEAN_PRICE } from "@/content/cleaning-standard";
import { DEEP_PREMIUM_CLEAN_PRICE } from "@/content/cleaning-deep-premium";
import { ELEVATED_RESET_CLEAN_PRICE } from "@/content/cleaning-elevated-reset";
import type { CleaningTier, CleaningScope } from "@/lib/cleaning-pricing/types";
import { SQUARE_FOOTAGE_BAND_OPTIONS } from "../squareFootageBands";
import type { StepProps } from "../types";
import styles from "../CleaningBookingWizard.module.css";

const TIER_PRICE_INFO: Record<CleaningTier, { label: string; note?: string }> = {
  "standard-clean": STANDARD_CLEAN_PRICE,
  "deep-premium-clean": DEEP_PREMIUM_CLEAN_PRICE,
  "elevated-reset-clean": ELEVATED_RESET_CLEAN_PRICE,
};

const TIER_ORDER: CleaningTier[] = ["standard-clean", "deep-premium-clean", "elevated-reset-clean"];

const SCOPE_OPTIONS: { value: CleaningScope; label: string; description: string }[] = [
  { value: "entire-home", label: "Entire home", description: "We'll clean every serviced area of your home." },
  { value: "selected-areas", label: "Selected rooms / areas", description: "Choose specific rooms for us to clean." },
];

export function Step1CleaningHome({ state, updateField, errors }: StepProps) {
  return (
    <div className={styles.stepPanel}>
      <h2 className={styles.stepHeading}>Let&apos;s start with your Cleaning and your home.</h2>
      <p className={styles.stepIntro}>Choose your service level, then tell us the scope and size of your home.</p>

      <div className={styles.fieldGroup}>
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Which clean?</legend>
          <div className={styles.choiceGrid}>
            {TIER_ORDER.map((tier) => (
              <label key={tier} className={styles.choiceCard}>
                <input
                  type="radio"
                  name="tier"
                  value={tier}
                  checked={state.tier === tier}
                  onChange={() => updateField("tier", tier)}
                  className={styles.choiceInput}
                  aria-describedby={errors.tier ? "step1-tier-error" : undefined}
                />
                <span className={styles.choiceText}>
                  <span className={styles.choiceLabel}>{TIER_LABELS[tier]}</span>
                  <span className={styles.choiceDescription}>
                    {TIER_PRICE_INFO[tier].label} — {TIER_PRICE_INFO[tier].note}
                  </span>
                </span>
              </label>
            ))}
          </div>
          {errors.tier ? (
            <p id="step1-tier-error" className={styles.fieldError} role="alert">
              {errors.tier}
            </p>
          ) : null}
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Are we cleaning your entire home or selected areas?</legend>
          <div className={styles.choiceGrid}>
            {SCOPE_OPTIONS.map((option) => (
              <label key={option.value} className={styles.choiceCard}>
                <input
                  type="radio"
                  name="scope"
                  value={option.value}
                  checked={state.scope === option.value}
                  onChange={() => updateField("scope", option.value)}
                  className={styles.choiceInput}
                  aria-describedby={errors.scope ? "step1-scope-error" : undefined}
                />
                <span className={styles.choiceText}>
                  <span className={styles.choiceLabel}>{option.label}</span>
                  <span className={styles.choiceDescription}>{option.description}</span>
                </span>
              </label>
            ))}
          </div>
          {errors.scope ? (
            <p id="step1-scope-error" className={styles.fieldError} role="alert">
              {errors.scope}
            </p>
          ) : null}
        </fieldset>

        <fieldset id="step1-sqft" tabIndex={-1} className={styles.fieldset}>
          <legend className={styles.legend}>Total property square footage</legend>
          <p className={styles.helpText}>We ask every customer for this — it helps us prepare appropriately even for a selected-area clean.</p>
          <div className={styles.choiceGrid} aria-describedby={errors.squareFootage ? "step1-sqft-error" : undefined}>
            {SQUARE_FOOTAGE_BAND_OPTIONS.map((option) => (
              <label key={option.value} className={styles.choiceCard}>
                <input
                  type="radio"
                  name="squareFootage"
                  value={option.value}
                  checked={state.squareFootage === option.value}
                  onChange={() => updateField("squareFootage", option.value)}
                  className={styles.choiceInput}
                />
                <span className={styles.choiceLabel}>{option.label}</span>
              </label>
            ))}
          </div>
          {errors.squareFootage ? (
            <p id="step1-sqft-error" className={styles.fieldError} role="alert">
              {errors.squareFootage}
            </p>
          ) : null}
        </fieldset>
      </div>
    </div>
  );
}

import { CURRENT_FEELINGS_OPTIONS, DESIRED_FEELINGS_OPTIONS } from "@/content/organization-quote";
import type { StepProps } from "../types";
import styles from "../OrganizationQuoteWizard.module.css";

export function StepHowSpaceFeels({ state, updateField }: StepProps) {
  function toggle(field: "currentFeelings" | "desiredFeelings", value: string) {
    const current = state[field];
    const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
    updateField(field, next);
  }

  return (
    <div className={styles.stepPanel}>
      <h2 className={styles.stepHeading}>How is this space affecting you?</h2>
      <p className={styles.stepIntro}>
        Organization isn&apos;t only about where things go. Understanding what feels difficult now helps us understand what you want the space to
        give back to you.
      </p>

      <div className={styles.fieldGroup}>
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>How does the space make you feel right now? (optional)</legend>
          <div className={styles.checkboxGrid}>
            {CURRENT_FEELINGS_OPTIONS.map((feeling) => (
              <label key={feeling} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="currentFeelings"
                  value={feeling}
                  checked={state.currentFeelings.includes(feeling)}
                  onChange={() => toggle("currentFeelings", feeling)}
                  className={styles.checkboxInput}
                />
                {feeling}
              </label>
            ))}
          </div>
          {state.currentFeelings.includes("Something else") ? (
            <input
              type="text"
              name="currentFeelingsOther"
              aria-label="Tell us more"
              placeholder="Tell us more"
              value={state.currentFeelingsOther}
              onChange={(e) => updateField("currentFeelingsOther", e.target.value)}
              className={styles.input}
            />
          ) : null}
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>How would you like the space to feel afterward? (optional)</legend>
          <div className={styles.checkboxGrid}>
            {DESIRED_FEELINGS_OPTIONS.map((feeling) => (
              <label key={feeling} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="desiredFeelings"
                  value={feeling}
                  checked={state.desiredFeelings.includes(feeling)}
                  onChange={() => toggle("desiredFeelings", feeling)}
                  className={styles.checkboxInput}
                />
                {feeling}
              </label>
            ))}
          </div>
          {state.desiredFeelings.includes("Something else") ? (
            <input
              type="text"
              name="desiredFeelingsOther"
              aria-label="Tell us more"
              placeholder="Tell us more"
              value={state.desiredFeelingsOther}
              onChange={(e) => updateField("desiredFeelingsOther", e.target.value)}
              className={styles.input}
            />
          ) : null}
        </fieldset>
      </div>
    </div>
  );
}

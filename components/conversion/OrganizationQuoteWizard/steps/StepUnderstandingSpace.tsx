import { CLUTTER_LEVELS, CLUTTER_NOT_SURE } from "@/content/organization-quote";
import type { StepProps } from "../types";
import styles from "../OrganizationQuoteWizard.module.css";

export function StepUnderstandingSpace({ state, updateField }: StepProps) {
  return (
    <div className={styles.stepPanel}>
      <h2 className={styles.stepHeading}>Help us understand what&apos;s going on now.</h2>

      <div className={styles.fieldGroup}>
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>How cluttered does the space feel right now?</legend>
          <div className={styles.choiceGrid}>
            {CLUTTER_LEVELS.map((level) => (
              <label key={level.value} className={styles.choiceCard}>
                <input
                  type="radio"
                  name="clutterLevel"
                  value={level.value}
                  checked={state.clutterLevel === level.value}
                  onChange={(e) => updateField("clutterLevel", e.target.value)}
                  className={styles.choiceInput}
                />
                <span className={styles.choiceText}>
                  <span className={styles.choiceLabel}>{level.label}</span>
                  <span className={styles.choiceDescription}>{level.description}</span>
                </span>
              </label>
            ))}
            <label className={styles.choiceCard}>
              <input
                type="radio"
                name="clutterLevel"
                value={CLUTTER_NOT_SURE.value}
                checked={state.clutterLevel === CLUTTER_NOT_SURE.value}
                onChange={(e) => updateField("clutterLevel", e.target.value)}
                className={styles.choiceInput}
              />
              <span className={styles.choiceText}>
                <span className={styles.choiceLabel}>{CLUTTER_NOT_SURE.label}</span>
              </span>
            </label>
          </div>
        </fieldset>

        <div className={styles.field}>
          <label htmlFor="oq-not-working" className={styles.label}>
            What&apos;s not working about this space right now?
          </label>
          <p className={styles.helpText}>Tell us what frustrates you most, what feels difficult to use, or what keeps becoming disorganized.</p>
          <textarea
            id="oq-not-working"
            name="whatsNotWorking"
            rows={4}
            value={state.whatsNotWorking}
            onChange={(e) => updateField("whatsNotWorking", e.target.value)}
            className={styles.textarea}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="oq-used-now" className={styles.label}>
            How do you currently use this space?
          </label>
          <p className={styles.helpText}>Tell us what normally happens here and who uses the space.</p>
          <textarea
            id="oq-used-now"
            name="howUsedNow"
            rows={4}
            value={state.howUsedNow}
            onChange={(e) => updateField("howUsedNow", e.target.value)}
            className={styles.textarea}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="oq-desired-difference" className={styles.label}>
            What would you like to be different when we&apos;re finished?
          </label>
          <p className={styles.helpText}>
            Think about what you want to find more easily, use more comfortably, maintain more easily, or simply feel differently about.
          </p>
          <textarea
            id="oq-desired-difference"
            name="desiredDifference"
            rows={4}
            value={state.desiredDifference}
            onChange={(e) => updateField("desiredDifference", e.target.value)}
            className={styles.textarea}
          />
        </div>
      </div>
    </div>
  );
}

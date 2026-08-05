import type { StepProps } from "../types";
import styles from "../OrganizationQuoteWizard.module.css";

export function StepFinalDetails({ state, updateField }: StepProps) {
  return (
    <div className={styles.stepPanel}>
      <h2 className={styles.stepHeading}>A few final details.</h2>

      <div className={styles.fieldGroup}>
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Have you tried organizing this space before? (optional)</legend>
          <div className={styles.choiceGrid}>
            <label className={styles.choiceCard}>
              <input
                type="radio"
                name="triedBefore"
                value="yes"
                checked={state.triedBefore === "yes"}
                onChange={() => updateField("triedBefore", "yes")}
                className={styles.choiceInput}
              />
              <span className={styles.choiceText}>
                <span className={styles.choiceLabel}>Yes</span>
              </span>
            </label>
            <label className={styles.choiceCard}>
              <input
                type="radio"
                name="triedBefore"
                value="no"
                checked={state.triedBefore === "no"}
                onChange={() => updateField("triedBefore", "no")}
                className={styles.choiceInput}
              />
              <span className={styles.choiceText}>
                <span className={styles.choiceLabel}>No</span>
              </span>
            </label>
          </div>
        </fieldset>

        {state.triedBefore === "yes" ? (
          <div className={styles.field}>
            <label htmlFor="oq-tried-details" className={styles.label}>
              What worked—or didn&apos;t work—the last time? <span className={styles.optionalTag}>(optional)</span>
            </label>
            <textarea
              id="oq-tried-details"
              name="triedBeforeDetails"
              rows={3}
              value={state.triedBeforeDetails}
              onChange={(e) => updateField("triedBeforeDetails", e.target.value)}
              className={styles.textarea}
            />
          </div>
        ) : null}

        <div className={styles.field}>
          <label htmlFor="oq-considerations" className={styles.label}>
            Is there anything in the space we should know about before reviewing the project?{" "}
            <span className={styles.optionalTag}>(optional)</span>
          </label>
          <p className={styles.helpText}>
            Accessibility considerations, fragile belongings, pets, shared household use, items that should not be moved, or anything else that
            may affect the project.
          </p>
          <textarea
            id="oq-considerations"
            name="spaceConsiderations"
            rows={4}
            value={state.spaceConsiderations}
            onChange={(e) => updateField("spaceConsiderations", e.target.value)}
            className={styles.textarea}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="oq-matters-most" className={styles.label}>
            What matters most to you about this project? <span className={styles.optionalTag}>(optional)</span>
          </label>
          <p className={styles.helpText}>If there&apos;s one thing you want us to understand before we review your space, tell us here.</p>
          <textarea
            id="oq-matters-most"
            name="whatMattersMost"
            rows={4}
            value={state.whatMattersMost}
            onChange={(e) => updateField("whatMattersMost", e.target.value)}
            className={styles.textarea}
          />
        </div>
      </div>
    </div>
  );
}

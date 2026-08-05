import { STEP_LABELS, TOTAL_STEPS } from "./types";
import styles from "./OrganizationQuoteWizard.module.css";

interface WizardProgressProps {
  currentStep: number;
}

export function WizardProgress({ currentStep }: WizardProgressProps) {
  const percent = Math.round((currentStep / TOTAL_STEPS) * 100);

  return (
    <div className={styles.progress}>
      <p className={styles.progressLabel} aria-hidden="true">
        Step {currentStep} of {TOTAL_STEPS}: {STEP_LABELS[currentStep - 1]}
      </p>
      <div
        className={styles.progressTrack}
        role="progressbar"
        aria-valuenow={currentStep}
        aria-valuemin={1}
        aria-valuemax={TOTAL_STEPS}
        aria-label={`Step ${currentStep} of ${TOTAL_STEPS}: ${STEP_LABELS[currentStep - 1]}`}
      >
        <div className={styles.progressFill} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

import { STEP_LABELS, TOTAL_STEPS } from "./types";
import styles from "./CleaningBookingWizard.module.css";

interface WizardProgressProps {
  currentStep: number;
  hasSpecialtyCondition: boolean;
}

/** Visible step count excludes the conditional Specialty Details step
 *  when it isn't needed, so the progress bar/label never implies a step
 *  the customer won't actually see. */
export function WizardProgress({ currentStep, hasSpecialtyCondition }: WizardProgressProps) {
  const visibleTotal = hasSpecialtyCondition ? TOTAL_STEPS : TOTAL_STEPS - 1;
  const visibleStep = !hasSpecialtyCondition && currentStep > 6 ? currentStep - 1 : currentStep;
  const percent = Math.round((visibleStep / visibleTotal) * 100);
  const label = STEP_LABELS[currentStep - 1];

  return (
    <div className={styles.progress}>
      <p className={styles.progressLabel} aria-hidden="true">
        Step {visibleStep} of {visibleTotal}: {label}
      </p>
      <div
        className={styles.progressTrack}
        role="progressbar"
        aria-valuenow={visibleStep}
        aria-valuemin={1}
        aria-valuemax={visibleTotal}
        aria-label={`Step ${visibleStep} of ${visibleTotal}: ${label}`}
      >
        <div className={styles.progressFill} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

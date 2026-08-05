import {
  MAIN_ISSUE_OPTIONS,
  EXISTING_STORAGE_OPTIONS,
  LETTING_GO_OPTIONS,
  OWN_PRODUCTS_OPTIONS,
  OPEN_TO_PURCHASING_OPTIONS,
  PRODUCTS_MICROCOPY,
} from "@/content/organization-quote";
import type { StepProps, OrganizationQuoteFormState } from "../types";
import styles from "../OrganizationQuoteWizard.module.css";

type StringFieldName = "mainIssue" | "existingStorage" | "opennessToLetGo" | "ownProducts" | "openToPurchasing";

interface RadioGroupProps {
  legend: string;
  name: StringFieldName;
  options: string[];
  state: StepProps["state"];
  updateField: <K extends StringFieldName>(key: K, value: OrganizationQuoteFormState[K]) => void;
}

function RadioGroup({ legend, name, options, state, updateField }: RadioGroupProps) {
  const value = state[name];
  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>{legend}</legend>
      <div className={styles.choiceGrid}>
        {options.map((option) => (
          <label key={option} className={styles.choiceCard}>
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={(e) => updateField(name, e.target.value)}
              className={styles.choiceInput}
            />
            <span className={styles.choiceText}>
              <span className={styles.choiceLabel}>{option}</span>
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function StepStorageBelongings({ state, updateField }: StepProps) {
  return (
    <div className={styles.stepPanel}>
      <h2 className={styles.stepHeading}>Tell us a little more about what we&apos;re working with.</h2>

      <div className={styles.fieldGroup}>
        <RadioGroup
          legend="Do you feel like the main issue is: (optional)"
          name="mainIssue"
          options={MAIN_ISSUE_OPTIONS}
          state={state}
          updateField={updateField}
        />

        <RadioGroup
          legend="Does the space already have storage? (optional)"
          name="existingStorage"
          options={EXISTING_STORAGE_OPTIONS}
          state={state}
          updateField={updateField}
        />

        <RadioGroup
          legend="Are you open to letting go of items if needed? (optional)"
          name="opennessToLetGo"
          options={LETTING_GO_OPTIONS}
          state={state}
          updateField={updateField}
        />

        <RadioGroup
          legend="Do you already own organizing products you'd like us to work with? (optional)"
          name="ownProducts"
          options={OWN_PRODUCTS_OPTIONS}
          state={state}
          updateField={updateField}
        />

        <div>
          <RadioGroup
            legend="Would you be open to purchasing organization products if they would improve the space? (optional)"
            name="openToPurchasing"
            options={OPEN_TO_PURCHASING_OPTIONS}
            state={state}
            updateField={updateField}
          />
          <p className={styles.helpText}>{PRODUCTS_MICROCOPY}</p>
        </div>
      </div>
    </div>
  );
}

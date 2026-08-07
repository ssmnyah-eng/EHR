"use client";

import {
  BATHROOM_BUILDUP_OPTIONS,
  CLUTTER_OPTIONS,
  DUST_OPTIONS,
  KITCHEN_GREASE_OPTIONS,
  PET_HAIR_OPTIONS,
  SPECIALTY_CONDITION_OPTIONS,
  TIME_SINCE_CLEANING_OPTIONS,
} from "@/content/cleaning-booking-options";
import type { ConditionLevel, SpecialtyConditionType } from "@/lib/cleaning-pricing/types";
import type { StepProps } from "../types";
import styles from "../CleaningBookingWizard.module.css";

interface RadioGroupProps<T extends string> {
  legend: string;
  name: string;
  options: readonly { value: T; label: string; description?: string }[];
  value: T | "";
  onChange: (value: T) => void;
  error?: string;
}

function RadioGroup<T extends string>({ legend, name, options, value, onChange, error }: RadioGroupProps<T>) {
  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>{legend}</legend>
      <div className={styles.choiceGrid}>
        {options.map((option) => (
          <label key={option.value} className={styles.choiceCard}>
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className={styles.choiceInput}
            />
            <span className={styles.choiceText}>
              <span className={styles.choiceLabel}>{option.label}</span>
              {option.description ? <span className={styles.choiceDescription}>{option.description}</span> : null}
            </span>
          </label>
        ))}
      </div>
      {error ? (
        <p className={styles.fieldError} role="alert">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

export function Step3Condition({ state, updateField, errors }: StepProps) {
  const bathroomCount = Number(state.bathroomCount) || 0;

  function setBathroomBuildup(index: number, level: ConditionLevel) {
    const next = [...state.bathroomBuildup];
    while (next.length < bathroomCount) next.push("light");
    next[index] = level;
    updateField("bathroomBuildup", next.slice(0, bathroomCount));
  }

  function toggleSpecialty(type: SpecialtyConditionType) {
    const next = state.specialtyTypes.includes(type)
      ? state.specialtyTypes.filter((t) => t !== type)
      : [...state.specialtyTypes, type];
    updateField("specialtyTypes", next);
  }

  return (
    <div className={styles.stepPanel}>
      <h2 className={styles.stepHeading}>Tell us about your home&apos;s current condition.</h2>
      <p className={styles.stepIntro}>
        These are quick, objective questions — there&apos;s no right or wrong answer, and nothing here changes whether we can help.
      </p>

      <div className={styles.fieldGroup}>
        <RadioGroup
          legend="When was your home last thoroughly / professionally cleaned?"
          name="timeSinceCleaning"
          options={TIME_SINCE_CLEANING_OPTIONS}
          value={state.timeSinceCleaning}
          onChange={(v) => updateField("timeSinceCleaning", v)}
          error={errors.timeSinceCleaning}
        />

        <RadioGroup
          legend="Kitchen grease / buildup"
          name="kitchenGrease"
          options={KITCHEN_GREASE_OPTIONS}
          value={state.kitchenGrease}
          onChange={(v) => updateField("kitchenGrease", v)}
          error={errors.kitchenGrease}
        />

        <div className={styles.field}>
          <label htmlFor="step3-bathroom-count" className={styles.label}>
            How many bathrooms does your home have?
          </label>
          <input
            id="step3-bathroom-count"
            type="number"
            inputMode="numeric"
            min={0}
            max={10}
            value={state.bathroomCount}
            onChange={(e) => updateField("bathroomCount", e.target.value)}
            className={styles.input}
            aria-invalid={errors.bathroomCount ? true : undefined}
            aria-describedby={errors.bathroomCount ? "step3-bathroom-count-error" : undefined}
          />
          {errors.bathroomCount ? (
            <p id="step3-bathroom-count-error" className={styles.fieldError} role="alert">
              {errors.bathroomCount}
            </p>
          ) : null}
        </div>

        {bathroomCount > 0 ? (
          <div className={styles.fieldGroup}>
            <span className={styles.label}>Soap / mineral / grout buildup, per bathroom</span>
            {Array.from({ length: bathroomCount }, (_, i) => (
              <div className={styles.field} key={i}>
                <label htmlFor={`step3-bathroom-${i}`} className={styles.label}>
                  Bathroom {i + 1}
                </label>
                <select
                  id={`step3-bathroom-${i}`}
                  className={styles.select}
                  value={state.bathroomBuildup[i] ?? "light"}
                  onChange={(e) => setBathroomBuildup(i, e.target.value as ConditionLevel)}
                >
                  {BATHROOM_BUILDUP_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label} — {option.description}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        ) : null}

        <RadioGroup
          legend="Dust / debris accumulation"
          name="dustAccumulation"
          options={DUST_OPTIONS}
          value={state.dustAccumulation}
          onChange={(v) => updateField("dustAccumulation", v)}
          error={errors.dustAccumulation}
        />

        <RadioGroup
          legend="How accessible are your floors and surfaces?"
          name="clutterAccess"
          options={CLUTTER_OPTIONS}
          value={state.clutterAccess}
          onChange={(v) => updateField("clutterAccess", v)}
          error={errors.clutterAccess}
        />

        <RadioGroup
          legend="Pet hair"
          name="petHair"
          options={PET_HAIR_OPTIONS}
          value={state.petHair}
          onChange={(v) => updateField("petHair", v)}
          error={errors.petHair}
        />

        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Do any of these apply to your home? (optional — check all that apply)</legend>
          <div className={styles.checkboxGrid}>
            {SPECIALTY_CONDITION_OPTIONS.map((option) => (
              <label key={option.value} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={state.specialtyTypes.includes(option.value)}
                  onChange={() => toggleSpecialty(option.value)}
                  className={styles.checkboxInput}
                />
                {option.label}
              </label>
            ))}
          </div>
        </fieldset>
      </div>
    </div>
  );
}

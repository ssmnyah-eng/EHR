"use client";

import { useEffect, useMemo, type ChangeEvent } from "react";
import { SPECIALTY_CONDITION_OPTIONS, SPECIALTY_EXTENT_OPTIONS } from "@/content/cleaning-booking-options";
import type { StepProps } from "../types";
import styles from "../CleaningBookingWizard.module.css";

const PHOTO_INSTRUCTIONS = [
  { heading: "One wider photo", body: "Showing the overall affected area." },
  { heading: "One closer photo (optional)", body: "Showing the condition more specifically, if that's helpful." },
  { heading: "Normal camera, 1×", body: "Your phone's regular camera setting, not a wide or zoomed lens." },
  { heading: "Adequate lighting", body: "Turn on the lights or use natural daylight." },
  { heading: "No filters or Portrait Mode", body: "A plain, unedited photo helps us understand the space accurately." },
];

export function Step6Specialty({ state, updateField, errors }: StepProps) {
  const selectedLabels = SPECIALTY_CONDITION_OPTIONS.filter((o) => state.specialtyTypes.includes(o.value) || (o.value === "extreme-clutter" && state.clutterAccess === "extreme")).map(
    (o) => o.label
  );

  const previewUrls = useMemo(() => state.specialtyPhotos.map((file) => URL.createObjectURL(file)), [state.specialtyPhotos]);

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  function handleFilesSelected(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    updateField("specialtyPhotos", [...state.specialtyPhotos, ...Array.from(files)]);
    event.target.value = "";
  }

  function removePhoto(index: number) {
    updateField(
      "specialtyPhotos",
      state.specialtyPhotos.filter((_, i) => i !== index)
    );
  }

  return (
    <div className={styles.stepPanel}>
      <h2 className={styles.stepHeading}>We need a little more information</h2>

      <div className={styles.specialtyIntro}>
        <p className={styles.specialtyIntroHeading}>Based on what you shared, we&apos;d like to understand this a bit better before we finalize your booking.</p>
        <p className={styles.specialtyIntroBody}>
          This helps us understand the affected area and prepare appropriately. Sharing this doesn&apos;t automatically mean we can&apos;t
          help — and it doesn&apos;t mean we&apos;re accepting a specific condition or service sight unseen. Our team reviews every
          booking like this personally.
        </p>
        {selectedLabels.length > 0 ? (
          <p className={styles.specialtyIntroBody} style={{ marginTop: "var(--space-xs)" }}>
            <strong>You mentioned:</strong> {selectedLabels.join(", ")}
          </p>
        ) : null}
      </div>

      <div className={styles.fieldGroup}>
        <div className={styles.field}>
          <label htmlFor="step6-affected-areas" className={styles.label}>
            Which room(s) or area(s) are affected?
          </label>
          <input
            id="step6-affected-areas"
            type="text"
            value={state.specialtyAffectedAreas}
            onChange={(e) => updateField("specialtyAffectedAreas", e.target.value)}
            className={styles.input}
            aria-invalid={errors.specialtyAffectedAreas ? true : undefined}
            aria-describedby={errors.specialtyAffectedAreas ? "step6-affected-areas-error" : undefined}
          />
          {errors.specialtyAffectedAreas ? (
            <p id="step6-affected-areas-error" className={styles.fieldError} role="alert">
              {errors.specialtyAffectedAreas}
            </p>
          ) : null}
        </div>

        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Is this localized, in a few areas, or widespread?</legend>
          <div className={styles.choiceGrid}>
            {SPECIALTY_EXTENT_OPTIONS.map((option) => (
              <label key={option.value} className={styles.choiceCard}>
                <input
                  type="radio"
                  name="specialtyExtent"
                  value={option.value}
                  checked={state.specialtyExtent === option.value}
                  onChange={() => updateField("specialtyExtent", option.value)}
                  className={styles.choiceInput}
                />
                <span className={styles.choiceLabel}>{option.label}</span>
              </label>
            ))}
          </div>
          {errors.specialtyExtent ? (
            <p className={styles.fieldError} role="alert">
              {errors.specialtyExtent}
            </p>
          ) : null}
        </fieldset>

        <div className={styles.field}>
          <label htmlFor="step6-description" className={styles.label}>
            Please describe what&apos;s present and where
          </label>
          <textarea
            id="step6-description"
            rows={4}
            value={state.specialtyDescription}
            onChange={(e) => updateField("specialtyDescription", e.target.value)}
            className={styles.textarea}
            aria-invalid={errors.specialtyDescription ? true : undefined}
            aria-describedby={errors.specialtyDescription ? "step6-description-error" : undefined}
          />
          {errors.specialtyDescription ? (
            <p id="step6-description-error" className={styles.fieldError} role="alert">
              {errors.specialtyDescription}
            </p>
          ) : null}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>
            Photos <span className={styles.optionalTag}>(optional)</span>
          </label>
          <p className={styles.helpText}>Photos help us prepare, but they&apos;re never required — you can continue without them.</p>

          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-xs)", margin: "var(--space-sm) 0" }}>
            {PHOTO_INSTRUCTIONS.map((instruction) => (
              <p key={instruction.heading} className={styles.helpText}>
                <strong style={{ color: "var(--color-text-primary)" }}>{instruction.heading}:</strong> {instruction.body}
              </p>
            ))}
          </div>

          <div className={styles.fileInputWrapper}>
            <label className={styles.fileInputButton} htmlFor="step6-photos">
              Add Photos
              <input
                id="step6-photos"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFilesSelected}
                className={styles.fileInputNative}
              />
            </label>

            {state.specialtyPhotos.length > 0 ? (
              <ul className={styles.photoGrid}>
                {state.specialtyPhotos.map((file, index) => (
                  <li key={`${file.name}-${file.lastModified}-${index}`}>
                    <div className={styles.photoThumbWrapper}>
                      {previewUrls[index] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={previewUrls[index]} alt="" className={styles.photoThumb} />
                      ) : null}
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className={styles.photoRemoveButton}
                        aria-label={`Remove photo ${file.name}`}
                      >
                        ✕
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useMemo, type ChangeEvent } from "react";
import { PHOTO_INSTRUCTIONS, PHOTO_PRIVACY_NOTE } from "@/content/organization-quote";
import { KIM_NELSON } from "@/content/testimonials";
import { ServiceProof } from "@/components/content/ServiceProof";
import type { StepProps } from "../types";
import styles from "../OrganizationQuoteWizard.module.css";

export function StepPhotos({ state, updateField }: StepProps) {
  const previewUrls = useMemo(() => state.photos.map((file) => URL.createObjectURL(file)), [state.photos]);

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  function handleFilesSelected(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    updateField("photos", [...state.photos, ...Array.from(files)]);
    event.target.value = "";
  }

  function removePhoto(index: number) {
    updateField(
      "photos",
      state.photos.filter((_, i) => i !== index),
    );
  }

  return (
    <div className={styles.stepPanel}>
      <h2 className={styles.stepHeading}>Show us the space as it really is.</h2>
      <p className={styles.stepIntro}>
        Your photos help us understand the size of the space, the amount of belongings, existing storage, layout, and overall project scope.
        Please don&apos;t clean or organize the space before taking them — we need to see what you&apos;re actually working with.
      </p>

      <p className={styles.photoInstructionsHeading}>How to photograph your space</p>
      <div className={styles.photoInstructions}>
        {PHOTO_INSTRUCTIONS.map((instruction) => (
          <div key={instruction.heading} className={styles.photoInstructionItem}>
            <p className={styles.photoInstructionHeading}>{instruction.heading}</p>
            <p className={styles.photoInstructionBody}>{instruction.body}</p>
          </div>
        ))}
      </div>

      <p className={styles.photoCallout}>
        Use your phone&apos;s normal 1× camera — not 0.5× / Ultra Wide. A wide-angle shot makes a packed space look bigger than it is. A few
        normal-perspective photos give us much better information than one wide-angle photo.
      </p>

      <div className={styles.field}>
        <label htmlFor="oq-photos" className={styles.label}>
          Upload Photos of Your Space
        </label>
        <p className={styles.helpText}>Upload several clear photos showing the overall space, storage areas, and any problem areas you want us to understand.</p>

        <div className={styles.fileInputWrapper}>
          <label className={styles.fileInputButton} htmlFor="oq-photos">
            Choose Photos
            <input
              id="oq-photos"
              name="photos"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFilesSelected}
              className={styles.fileInputNative}
            />
          </label>

          {state.photos.length > 0 ? (
            <ul className={styles.photoGrid}>
              {state.photos.map((file, index) => (
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
                  <p className={styles.photoFilename}>{file.name}</p>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <p className={styles.helpText}>{PHOTO_PRIVACY_NOTE}</p>

        <div className={styles.trustQuote}>
          <ServiceProof
            primary={{ quote: KIM_NELSON.quotes.care, attribution: KIM_NELSON.name }}
            compact
          />
        </div>
      </div>

      <div className={`${styles.fieldGroup} ${styles.measurementsGroup}`}>
        <div className={styles.field}>
          <label className={styles.label}>
            Do you know the approximate size of the space? <span className={styles.optionalTag}>(optional)</span>
          </label>
          <p className={styles.helpText}>Measurements are helpful when you know them, but they aren&apos;t required to request a quote.</p>
          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="oq-width" className={styles.label}>
                Width
              </label>
              <input
                id="oq-width"
                name="measurementWidth"
                type="text"
                value={state.measurementWidth}
                onChange={(e) => updateField("measurementWidth", e.target.value)}
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="oq-length" className={styles.label}>
                Length
              </label>
              <input
                id="oq-length"
                name="measurementLength"
                type="text"
                value={state.measurementLength}
                onChange={(e) => updateField("measurementLength", e.target.value)}
                className={styles.input}
              />
            </div>
          </div>
          <label htmlFor="oq-measurement-notes" className={styles.label}>
            Or describe the size in your own words
          </label>
          <input
            id="oq-measurement-notes"
            name="measurementNotes"
            type="text"
            value={state.measurementNotes}
            onChange={(e) => updateField("measurementNotes", e.target.value)}
            className={styles.input}
          />
        </div>
      </div>
    </div>
  );
}

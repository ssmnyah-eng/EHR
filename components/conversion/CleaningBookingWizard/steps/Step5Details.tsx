"use client";

import { useState } from "react";
import { isServiceAreaCity } from "@/content/service-areas";
import type { StepProps } from "../types";
import styles from "../CleaningBookingWizard.module.css";

export function Step5Details({ state, updateField, errors }: StepProps) {
  const [cityTouched, setCityTouched] = useState(false);
  const showOutOfAreaNotice = cityTouched && state.city.trim() !== "" && !isServiceAreaCity(state.city);

  return (
    <div className={styles.stepPanel}>
      <h2 className={styles.stepHeading}>How can we reach you, and where&apos;s the clean?</h2>
      <p className={styles.stepIntro}>We use this to confirm your appointment and follow up if we have any questions.</p>

      <div className={styles.fieldGroup}>
        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="step5-first-name" className={styles.label}>
              First name
            </label>
            <input
              id="step5-first-name"
              type="text"
              autoComplete="given-name"
              value={state.firstName}
              onChange={(e) => updateField("firstName", e.target.value)}
              className={styles.input}
              aria-invalid={errors.firstName ? true : undefined}
              aria-describedby={errors.firstName ? "step5-first-name-error" : undefined}
            />
            {errors.firstName ? (
              <p id="step5-first-name-error" className={styles.fieldError} role="alert">
                {errors.firstName}
              </p>
            ) : null}
          </div>
          <div className={styles.field}>
            <label htmlFor="step5-last-name" className={styles.label}>
              Last name
            </label>
            <input
              id="step5-last-name"
              type="text"
              autoComplete="family-name"
              value={state.lastName}
              onChange={(e) => updateField("lastName", e.target.value)}
              className={styles.input}
              aria-invalid={errors.lastName ? true : undefined}
              aria-describedby={errors.lastName ? "step5-last-name-error" : undefined}
            />
            {errors.lastName ? (
              <p id="step5-last-name-error" className={styles.fieldError} role="alert">
                {errors.lastName}
              </p>
            ) : null}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="step5-email" className={styles.label}>
              Email
            </label>
            <input
              id="step5-email"
              type="email"
              autoComplete="email"
              value={state.email}
              onChange={(e) => updateField("email", e.target.value)}
              className={styles.input}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? "step5-email-error" : undefined}
            />
            {errors.email ? (
              <p id="step5-email-error" className={styles.fieldError} role="alert">
                {errors.email}
              </p>
            ) : null}
          </div>
          <div className={styles.field}>
            <label htmlFor="step5-phone" className={styles.label}>
              Phone
            </label>
            <input
              id="step5-phone"
              type="tel"
              autoComplete="tel"
              value={state.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              className={styles.input}
              aria-invalid={errors.phone ? true : undefined}
              aria-describedby={errors.phone ? "step5-phone-error" : undefined}
            />
            {errors.phone ? (
              <p id="step5-phone-error" className={styles.fieldError} role="alert">
                {errors.phone}
              </p>
            ) : null}
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="step5-street" className={styles.label}>
            Street address
          </label>
          <input
            id="step5-street"
            type="text"
            autoComplete="address-line1"
            value={state.streetAddress}
            onChange={(e) => updateField("streetAddress", e.target.value)}
            className={styles.input}
            aria-invalid={errors.streetAddress ? true : undefined}
            aria-describedby={errors.streetAddress ? "step5-street-error" : undefined}
          />
          {errors.streetAddress ? (
            <p id="step5-street-error" className={styles.fieldError} role="alert">
              {errors.streetAddress}
            </p>
          ) : null}
        </div>

        <div className={styles.field}>
          <label htmlFor="step5-address2" className={styles.label}>
            Apt / unit <span className={styles.optionalTag}>(optional)</span>
          </label>
          <input
            id="step5-address2"
            type="text"
            autoComplete="address-line2"
            value={state.addressLine2}
            onChange={(e) => updateField("addressLine2", e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="step5-city" className={styles.label}>
              City
            </label>
            <input
              id="step5-city"
              type="text"
              autoComplete="address-level2"
              value={state.city}
              onChange={(e) => updateField("city", e.target.value)}
              onBlur={() => setCityTouched(true)}
              className={styles.input}
              aria-invalid={errors.city ? true : undefined}
              aria-describedby={errors.city ? "step5-city-error" : showOutOfAreaNotice ? "step5-city-area-notice" : undefined}
            />
            {errors.city ? (
              <p id="step5-city-error" className={styles.fieldError} role="alert">
                {errors.city}
              </p>
            ) : showOutOfAreaNotice ? (
              <p id="step5-city-area-notice" className={styles.helpText} role="status">
                It looks like you&apos;re just outside our current service area. Please contact us—we&apos;re always expanding and may still be able to accommodate your request.
              </p>
            ) : null}
          </div>
          <div className={styles.field}>
            <label htmlFor="step5-state" className={styles.label}>
              State
            </label>
            <input
              id="step5-state"
              type="text"
              autoComplete="address-level1"
              value={state.state}
              onChange={(e) => updateField("state", e.target.value)}
              className={styles.input}
              aria-invalid={errors.state ? true : undefined}
              aria-describedby={errors.state ? "step5-state-error" : undefined}
            />
            {errors.state ? (
              <p id="step5-state-error" className={styles.fieldError} role="alert">
                {errors.state}
              </p>
            ) : null}
          </div>
          <div className={styles.field}>
            <label htmlFor="step5-zip" className={styles.label}>
              ZIP
            </label>
            <input
              id="step5-zip"
              type="text"
              inputMode="numeric"
              autoComplete="postal-code"
              value={state.zip}
              onChange={(e) => updateField("zip", e.target.value)}
              className={styles.input}
              aria-invalid={errors.zip ? true : undefined}
              aria-describedby={errors.zip ? "step5-zip-error" : undefined}
            />
            {errors.zip ? (
              <p id="step5-zip-error" className={styles.fieldError} role="alert">
                {errors.zip}
              </p>
            ) : null}
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="step5-access-notes" className={styles.label}>
            Anything we should know about accessing your home? <span className={styles.optionalTag}>(optional)</span>
          </label>
          <textarea
            id="step5-access-notes"
            rows={3}
            placeholder="Gate code, parking, pets to be aware of, etc."
            value={state.accessNotes}
            onChange={(e) => updateField("accessNotes", e.target.value)}
            className={styles.textarea}
          />
        </div>
      </div>
    </div>
  );
}

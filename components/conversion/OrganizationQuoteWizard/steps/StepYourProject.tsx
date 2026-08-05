"use client";

import { useEffect, useRef } from "react";
import { ORGANIZATION_ROOMS } from "@/content/home-organization-rooms";
import { SPACE_TYPE_OPTIONS, SPACE_TYPE_QUESTIONS, WHOLE_HOME_SPACE_OPTIONS } from "@/content/organization-quote";
import type { StepProps } from "../types";
import styles from "../OrganizationQuoteWizard.module.css";

const SERVICE_OPTIONS = ORGANIZATION_ROOMS;

export function StepYourProject({ state, updateField, errors }: StepProps) {
  const conditionalHeadingRef = useRef<HTMLLegendElement>(null);
  const previousService = useRef(state.service);

  useEffect(() => {
    if (previousService.current !== state.service && state.service) {
      conditionalHeadingRef.current?.focus();
    }
    previousService.current = state.service;
  }, [state.service]);

  const spaceTypeOptions = SPACE_TYPE_OPTIONS[state.service];
  const spaceTypeQuestion = SPACE_TYPE_QUESTIONS[state.service];
  const isWholeHome = state.service === "whole-home-organization";

  function toggleWholeHomeSpace(space: string) {
    const next = state.wholeHomeSpaces.includes(space)
      ? state.wholeHomeSpaces.filter((s) => s !== space)
      : [...state.wholeHomeSpaces, space];
    updateField("wholeHomeSpaces", next);
  }

  return (
    <div className={styles.stepPanel}>
      <h2 className={styles.stepHeading}>What would you like help organizing?</h2>
      <p className={styles.stepIntro}>Choose the space that best matches the project you have in mind.</p>

      <div className={styles.fieldGroup}>
        <div className={styles.field}>
          <label htmlFor="oq-service" className={styles.label}>
            Organization Service
          </label>
          <select
            id="oq-service"
            name="service"
            required
            value={state.service}
            onChange={(e) => {
              updateField("service", e.target.value);
              updateField("spaceType", "");
              updateField("wholeHomeSpaces", []);
              updateField("wholeHomeOtherSpace", "");
            }}
            className={styles.select}
            aria-invalid={errors.service ? true : undefined}
            aria-describedby={errors.service ? "oq-service-error" : undefined}
          >
            <option value="" disabled>
              Select one
            </option>
            {SERVICE_OPTIONS.map((room) => (
              <option key={room.slug} value={room.slug}>
                {room.navLabel}
              </option>
            ))}
          </select>
          {errors.service ? (
            <p id="oq-service-error" className={styles.fieldError} role="alert">
              {errors.service}
            </p>
          ) : null}
        </div>

        {spaceTypeOptions && spaceTypeQuestion ? (
          <fieldset className={styles.fieldset}>
            <legend ref={conditionalHeadingRef} tabIndex={-1} className={styles.legend}>
              {spaceTypeQuestion}
            </legend>
            <div className={styles.choiceGrid}>
              {spaceTypeOptions.map((option) => (
                <label key={option} className={styles.choiceCard}>
                  <input
                    type="radio"
                    name="spaceType"
                    value={option}
                    checked={state.spaceType === option}
                    onChange={(e) => updateField("spaceType", e.target.value)}
                    className={styles.choiceInput}
                  />
                  <span className={styles.choiceText}>
                    <span className={styles.choiceLabel}>{option}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        ) : null}

        {isWholeHome ? (
          <fieldset className={styles.fieldset}>
            <legend ref={conditionalHeadingRef} tabIndex={-1} className={styles.legend}>
              Which spaces would you like help with?
            </legend>
            <div className={styles.checkboxGrid}>
              {WHOLE_HOME_SPACE_OPTIONS.map((space) => (
                <label key={space} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="wholeHomeSpaces"
                    value={space}
                    checked={state.wholeHomeSpaces.includes(space)}
                    onChange={() => toggleWholeHomeSpace(space)}
                    className={styles.checkboxInput}
                  />
                  {space}
                </label>
              ))}
            </div>
            {state.wholeHomeSpaces.includes("Other Space") ? (
              <div className={styles.field}>
                <label htmlFor="oq-other-space" className={styles.label}>
                  Tell us which other space.
                </label>
                <input
                  id="oq-other-space"
                  name="wholeHomeOtherSpace"
                  type="text"
                  value={state.wholeHomeOtherSpace}
                  onChange={(e) => updateField("wholeHomeOtherSpace", e.target.value)}
                  className={styles.input}
                />
              </div>
            ) : null}
          </fieldset>
        ) : null}
      </div>
    </div>
  );
}

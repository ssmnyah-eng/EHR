"use client";

import { useState, type FormEvent } from "react";
import { INQUIRY_FORM_ENDPOINT } from "@/lib/config";
import { ORGANIZATION_ROOMS } from "@/content/home-organization-rooms";
import styles from "./OrganizationQuoteForm.module.css";

type FormState = "idle" | "loading" | "success" | "error";

interface OrganizationQuoteFormProps {
  /** Pre-checks a space when arriving from a specific room page
   *  (e.g. /organization-quote?space=pantry-organization). */
  preselectedSpace?: string;
}

/**
 * Organization intake form. Photos are optional — Formspree's file-upload
 * support depends on the account's plan, so the field stays optional and
 * the copy offers emailing photos separately as a fallback. This collects
 * a quote request; it does not process payment or reserve a date — that
 * happens after the quote is accepted, same as the approved process.
 */
export function OrganizationQuoteForm({ preselectedSpace }: OrganizationQuoteFormProps) {
  const [state, setState] = useState<FormState>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");

    try {
      const response = await fetch(INQUIRY_FORM_ENDPOINT, {
        method: "POST",
        body: new FormData(event.currentTarget),
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error("Request failed");
      setState("success");
      event.currentTarget.reset();
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className={styles.success} role="status">
        <p className={styles.successHeadline}>Quote request received.</p>
        <p>We&apos;ll review what you shared and follow up with your project quote.</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate encType="multipart/form-data">
      <input type="hidden" name="interest" value="organization_quote" />
      <input type="hidden" name="_subject" value="New organization quote request" />

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="org-name" className={styles.label}>
            Name
          </label>
          <input id="org-name" name="name" type="text" autoComplete="name" required className={styles.input} />
        </div>
        <div className={styles.field}>
          <label htmlFor="org-email" className={styles.label}>
            Email
          </label>
          <input id="org-email" name="email" type="email" autoComplete="email" required className={styles.input} />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="org-phone" className={styles.label}>
          Phone
        </label>
        <input id="org-phone" name="phone" type="tel" autoComplete="tel" className={styles.input} />
      </div>

      <fieldset className={styles.fieldset}>
        <legend className={styles.label}>Which space(s) do you need organized?</legend>
        <div className={styles.spaceGrid}>
          {ORGANIZATION_ROOMS.map((room) => (
            <label key={room.slug} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="spaces"
                value={room.navLabel}
                defaultChecked={preselectedSpace === room.slug}
                className={styles.checkbox}
              />
              {room.navLabel}
            </label>
          ))}
          <label className={styles.checkboxLabel}>
            <input type="checkbox" name="spaces" value="Not sure yet" className={styles.checkbox} />
            Not sure yet
          </label>
        </div>
      </fieldset>

      <div className={styles.field}>
        <label htmlFor="org-details" className={styles.label}>
          Tell us about the space(s) and what you&apos;d like help with
        </label>
        <textarea id="org-details" name="projectDetails" rows={4} required className={styles.input} />
      </div>

      <div className={styles.field}>
        <label htmlFor="org-photos" className={styles.label}>
          Photos (optional)
        </label>
        <input id="org-photos" name="photos" type="file" accept="image/*" multiple className={styles.fileInput} />
        <p className={styles.hint}>You can also email photos separately if that&apos;s easier.</p>
      </div>

      <div className={styles.field}>
        <label htmlFor="org-timeframe" className={styles.label}>
          Preferred timeframe
        </label>
        <input
          id="org-timeframe"
          name="timeframe"
          type="text"
          placeholder="e.g. flexible, within a month, a specific date"
          className={styles.input}
        />
      </div>

      <div className={styles.consentRow}>
        <input id="org-consent" name="consent" type="checkbox" required className={styles.checkbox} />
        <label htmlFor="org-consent" className={styles.consentLabel}>
          I agree to be contacted about this request.
        </label>
      </div>

      {state === "error" ? (
        <p className={styles.error} role="alert">
          Something went wrong submitting this. Please try again.
        </p>
      ) : null}

      <button type="submit" className={styles.submit} disabled={state === "loading"}>
        {state === "loading" ? "Sending…" : "Request My Quote"}
      </button>
    </form>
  );
}

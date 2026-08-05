"use client";

import { useState, type FormEvent } from "react";
import { INQUIRY_FORM_ENDPOINT } from "@/lib/config";
import { PRIMARY_NAVIGATION } from "@/content/navigation";
import styles from "./InquiryForm.module.css";

type FormState = "idle" | "loading" | "success" | "error";

/**
 * Reusable inquiry/estimate form (brief section 26). Field schema is a
 * starting point, not every field is required. Submits to the same
 * Formspree endpoint already used in production for this business.
 */
export function InquiryForm() {
  const [state, setState] = useState<FormState>("idle");

  const serviceFamilyOptions = PRIMARY_NAVIGATION.filter((n) => n.category !== "company");

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
        <p>Thank you — we&apos;ve received your request and will be in touch.</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="inquiry-name" className={styles.label}>
            Name
          </label>
          <input id="inquiry-name" name="name" type="text" autoComplete="name" required className={styles.input} />
        </div>
        <div className={styles.field}>
          <label htmlFor="inquiry-email" className={styles.label}>
            Email
          </label>
          <input id="inquiry-email" name="email" type="email" autoComplete="email" required className={styles.input} />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="inquiry-phone" className={styles.label}>
            Phone
          </label>
          <input id="inquiry-phone" name="phone" type="tel" autoComplete="tel" className={styles.input} />
        </div>
        <div className={styles.field}>
          <label htmlFor="inquiry-service-family" className={styles.label}>
            What are you interested in?
          </label>
          <select id="inquiry-service-family" name="serviceFamily" className={styles.input} defaultValue="">
            <option value="" disabled>
              Select one
            </option>
            {serviceFamilyOptions.map((group) => (
              <option key={group.slug} value={group.title}>
                {group.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="inquiry-space" className={styles.label}>
          Tell us about your space or project
        </label>
        <textarea id="inquiry-space" name="space" rows={2} className={styles.input} />
      </div>

      <div className={styles.field}>
        <label htmlFor="inquiry-message" className={styles.label}>
          Anything else we should know?
        </label>
        <textarea id="inquiry-message" name="message" rows={4} className={styles.input} />
      </div>

      <div className={styles.consentRow}>
        <input id="inquiry-consent" name="consent" type="checkbox" required className={styles.checkbox} />
        <label htmlFor="inquiry-consent" className={styles.consentLabel}>
          I agree to be contacted about my request.
        </label>
      </div>

      {state === "error" ? (
        <p className={styles.error} role="alert">
          Something went wrong submitting this. Please try again.
        </p>
      ) : null}

      <button type="submit" className={styles.submit} disabled={state === "loading"}>
        {state === "loading" ? "Sending…" : "Submit Request"}
      </button>
    </form>
  );
}

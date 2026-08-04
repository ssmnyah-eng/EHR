"use client";

import { useState, type FormEvent } from "react";
import { INQUIRY_FORM_ENDPOINT } from "@/lib/config";
import { CLEANING_SERVICES } from "@/content/navigation";
import styles from "./CleaningBookingForm.module.css";

type FormState = "idle" | "loading" | "success" | "error";

const ADD_ONS = [
  "Interior oven",
  "Interior refrigerator",
  "Cabinet / drawer interiors",
  "Interior window glass",
  "Linen change",
  "Laundry",
  "Dishes",
  "Excessive pet-hair detailing",
];

interface CleaningBookingFormProps {
  /** Pre-selects a tier when arriving from a specific service page
   *  (e.g. /book-cleaning?service=standard-clean). */
  preselectedService?: string;
}

/**
 * Cleaning intake form. This is a request/scheduling-intake form, not a
 * live calendar — there's no booking/payment system wired up yet, so
 * "Book Your Clean" here means "tell us what you need and we'll confirm
 * scheduling and payment with you," the same as the process today.
 */
export function CleaningBookingForm({ preselectedService }: CleaningBookingFormProps) {
  const [state, setState] = useState<FormState>("idle");
  const activeTiers = CLEANING_SERVICES.children?.filter((c) => c.status === "active") ?? [];

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
        <p className={styles.successHeadline}>Request received.</p>
        <p>We&apos;ve got your details and will follow up to confirm scheduling and payment for your clean.</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <input type="hidden" name="interest" value="book_cleaning" />
      <input type="hidden" name="_subject" value="New cleaning booking request" />

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="cleaning-name" className={styles.label}>
            Name
          </label>
          <input id="cleaning-name" name="name" type="text" autoComplete="name" required className={styles.input} />
        </div>
        <div className={styles.field}>
          <label htmlFor="cleaning-email" className={styles.label}>
            Email
          </label>
          <input id="cleaning-email" name="email" type="email" autoComplete="email" required className={styles.input} />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="cleaning-phone" className={styles.label}>
            Phone
          </label>
          <input id="cleaning-phone" name="phone" type="tel" autoComplete="tel" className={styles.input} />
        </div>
        <div className={styles.field}>
          <label htmlFor="cleaning-service" className={styles.label}>
            Which clean?
          </label>
          <select
            id="cleaning-service"
            name="service"
            className={styles.input}
            defaultValue={preselectedService ?? ""}
          >
            <option value="" disabled>
              Select one
            </option>
            {activeTiers.map((tier) => (
              <option key={tier.slug} value={tier.slug}>
                {tier.title}
              </option>
            ))}
            <option value="not-sure">Not sure yet</option>
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="cleaning-home" className={styles.label}>
          Tell us about your home
        </label>
        <textarea
          id="cleaning-home"
          name="homeDetails"
          rows={3}
          placeholder="Bedrooms, bathrooms, square footage, and current condition help us scope the job."
          className={styles.input}
        />
      </div>

      <fieldset className={styles.fieldset}>
        <legend className={styles.label}>Add-ons (optional)</legend>
        <div className={styles.addOnGrid}>
          {ADD_ONS.map((addOn) => (
            <label key={addOn} className={styles.checkboxLabel}>
              <input type="checkbox" name="addOns" value={addOn} className={styles.checkbox} />
              {addOn}
            </label>
          ))}
        </div>
      </fieldset>

      <div className={styles.field}>
        <label htmlFor="cleaning-timeframe" className={styles.label}>
          Preferred date or timeframe
        </label>
        <input
          id="cleaning-timeframe"
          name="timeframe"
          type="text"
          placeholder="e.g. next week, a specific date, or flexible"
          className={styles.input}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="cleaning-notes" className={styles.label}>
          Anything else we should know?
        </label>
        <textarea id="cleaning-notes" name="notes" rows={3} className={styles.input} />
      </div>

      <div className={styles.consentRow}>
        <input id="cleaning-consent" name="consent" type="checkbox" required className={styles.checkbox} />
        <label htmlFor="cleaning-consent" className={styles.consentLabel}>
          I agree to be contacted about this request.
        </label>
      </div>

      {state === "error" ? (
        <p className={styles.error} role="alert">
          Something went wrong submitting this. Please try again.
        </p>
      ) : null}

      <button type="submit" className={styles.submit} disabled={state === "loading"}>
        {state === "loading" ? "Sending…" : "Submit Booking Request"}
      </button>
    </form>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import { INQUIRY_FORM_ENDPOINT } from "@/lib/config";
import styles from "./ContactForm.module.css";

type FormState = "idle" | "loading" | "success" | "error";

/**
 * General-inquiry contact form. Deliberately simple — this is not the
 * Cleaning booking flow or the Home Organization quote questionnaire,
 * so it doesn't ask which service the visitor wants or collect
 * project-specific details. Submits to the same Formspree endpoint
 * already used by the other forms, tagged with its own category so
 * submissions can be told apart.
 */
export function ContactForm() {
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
        <p className={styles.successHeadline}>Message received.</p>
        <p>Thank you for reaching out — we&apos;ll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <input type="hidden" name="interest" value="general_contact" />
      <input type="hidden" name="_subject" value="New contact form message" />

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="contact-first-name" className={styles.label}>
            First Name
          </label>
          <input id="contact-first-name" name="firstName" type="text" autoComplete="given-name" required className={styles.input} />
        </div>
        <div className={styles.field}>
          <label htmlFor="contact-last-name" className={styles.label}>
            Last Name
          </label>
          <input id="contact-last-name" name="lastName" type="text" autoComplete="family-name" required className={styles.input} />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="contact-address" className={styles.label}>
          Address
        </label>
        <input id="contact-address" name="address" type="text" autoComplete="street-address" className={styles.input} />
      </div>

      <div className={styles.field}>
        <label htmlFor="contact-email" className={styles.label}>
          Email
        </label>
        <input id="contact-email" name="email" type="email" autoComplete="email" required className={styles.input} />
      </div>

      <div className={styles.field}>
        <label htmlFor="contact-message" className={styles.label}>
          Message
        </label>
        <textarea id="contact-message" name="message" rows={6} required className={styles.input} />
      </div>

      {state === "error" ? (
        <p className={styles.error} role="alert">
          Something went wrong submitting this. Please try again.
        </p>
      ) : null}

      <button type="submit" className={styles.submit} disabled={state === "loading"}>
        {state === "loading" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}

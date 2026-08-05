"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { INQUIRY_FORM_ENDPOINT } from "@/lib/config";
import type { CTAData } from "@/lib/types";
import styles from "./ComingSoonNotificationForm.module.css";

type FormState = "idle" | "loading" | "success" | "error";

interface ComingSoonNotificationFormProps {
  /** Distinguishes this submission from other Coming Soon categories and
   *  from the existing Estimate/Contact forms sharing the same Formspree
   *  endpoint (e.g. "organization_packages", "lifestyle_resets"). */
  category: string;
  /** Route this form was submitted from, sent as extra Formspree metadata. */
  source: string;
  fieldLabel?: string;
  buttonLabel?: string;
  microcopy?: string;
  successHeadline: string;
  successMessage: string;
  secondaryLink?: CTAData;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Low-friction "notify me" signup — email only, no service reselection,
 * no marketing-consent checkbox. Reused by both Coming Soon pages, each
 * passing its own category/source so submissions can be told apart in the
 * shared Formspree inbox without a second integration.
 */
export function ComingSoonNotificationForm({
  category,
  source,
  fieldLabel = "Email Address",
  buttonLabel = "Notify Me When It's Available",
  microcopy,
  successHeadline,
  successMessage,
  secondaryLink,
}: ComingSoonNotificationFormProps) {
  const [state, setState] = useState<FormState>("idle");
  const [email, setEmail] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!EMAIL_PATTERN.test(email)) {
      setValidationError("Please enter a valid email address.");
      return;
    }
    setValidationError(null);
    setState("loading");

    try {
      const response = await fetch(INQUIRY_FORM_ENDPOINT, {
        method: "POST",
        body: new FormData(event.currentTarget),
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error("Request failed");
      setState("success");
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className={styles.success} role="status">
        <p className={styles.successHeadline}>{successHeadline}</p>
        <p className={styles.successBody}>{successMessage}</p>
        {secondaryLink ? (
          <Link href={secondaryLink.href} className={styles.secondaryLink}>
            {secondaryLink.label}
          </Link>
        ) : null}
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {/* Formspree honeypot — real users never see or fill this field. */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className={styles.honeypot} />
      <input type="hidden" name="interest" value={category} />
      <input type="hidden" name="source" value={source} />
      <input type="hidden" name="_subject" value={`New availability notification request — ${category}`} />

      <div className={styles.field}>
        <label htmlFor="notify-email" className={styles.label}>
          {fieldLabel}
        </label>
        <input
          id="notify-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={styles.input}
          aria-invalid={validationError ? true : undefined}
          aria-describedby={validationError ? "notify-email-error" : undefined}
        />
      </div>

      {microcopy ? <p className={styles.microcopy}>{microcopy}</p> : null}

      {validationError ? (
        <p id="notify-email-error" className={styles.error} role="alert">
          {validationError}
        </p>
      ) : null}

      {state === "error" ? (
        <p className={styles.error} role="alert">
          Something went wrong and your email wasn&apos;t submitted. Please try again.
        </p>
      ) : null}

      <button type="submit" className={styles.submit} disabled={state === "loading"}>
        {state === "loading" ? "Sending…" : buttonLabel}
      </button>
    </form>
  );
}

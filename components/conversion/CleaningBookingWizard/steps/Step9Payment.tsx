"use client";

import { useEffect, useRef, useState } from "react";
import { calculateDeposit, calculatePrice } from "@/lib/cleaning-pricing/engine";
import { getSquareConfig } from "@/lib/square-client";
import { mountSquareCard, type SquareCard } from "@/lib/square-web-payments";
import { buildPricingInput } from "../buildPricingInput";
import type { CleaningBookingFormState } from "../types";
import styles from "../CleaningBookingWizard.module.css";

const CARD_CONTAINER_ID = "square-card-container";

interface Step9PaymentProps {
  state: CleaningBookingFormState;
  /** Runs the full server-side booking sequence (create/get customer →
   *  create appointment → charge the deposit) for the given one-time
   *  card token. Throws on failure — this component only needs to know
   *  whether to keep its own "processing" UI up or reset it; the parent
   *  wizard owns success/error state and the confirmation screen. */
  onPay: (sourceId: string) => Promise<void>;
  /** Only ever a payment/booking-specific message (e.g. "card
   *  declined") set by the parent after onPay rejects — cleared by the
   *  parent on the next attempt. */
  errorMessage: string;
}

/**
 * Square's Web Payments SDK card form — the raw card number is entered
 * into an iframe Square controls and tokenized client-side; neither this
 * component nor the Worker backend ever sees it, only the one-time
 * source_id token that POST /payments exchanges for an actual charge.
 */
export function Step9Payment({ state, onPay, errorMessage }: Step9PaymentProps) {
  const input = buildPricingInput(state);
  const price = input ? calculatePrice(input) : null;
  const deposit = price ? calculateDeposit(price.finalTotal) : null;

  const [sdkState, setSdkState] = useState<"loading" | "ready" | "unavailable">("loading");
  const [submitting, setSubmitting] = useState(false);
  const [cardError, setCardError] = useState("");
  const cardRef = useRef<SquareCard | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    let card: SquareCard | null = null;

    (async () => {
      try {
        const config = await getSquareConfig();
        card = await mountSquareCard(config.applicationId, config.locationId, config.environment, CARD_CONTAINER_ID);
        if (!mountedRef.current) {
          await card.destroy();
          return;
        }
        cardRef.current = card;
        setSdkState("ready");
      } catch {
        setSdkState("unavailable");
      }
    })();

    return () => {
      mountedRef.current = false;
      cardRef.current?.destroy().catch(() => {});
      cardRef.current = null;
    };
  }, []);

  async function handlePay() {
    if (!cardRef.current) return;
    setCardError("");
    setSubmitting(true);
    try {
      const result = await cardRef.current.tokenize();
      if (result.status !== "OK" || !result.token) {
        setCardError(result.errors?.[0]?.message || "We couldn't process that card. Please check the details and try again.");
        setSubmitting(false);
        return;
      }
      await onPay(result.token);
      // On success the parent switches submitState to "success" and this
      // step unmounts — nothing further to do here.
    } catch {
      // Parent already recorded the failure via errorMessage; just
      // release this component's own button/spinner state.
      setSubmitting(false);
    }
  }

  return (
    <div className={styles.stepPanel}>
      <h2 className={styles.stepHeading}>Secure your appointment.</h2>
      <p className={styles.stepIntro}>Enter your card to pay your deposit and confirm your appointment now.</p>

      {deposit ? (
        <div className={styles.priceCard}>
          <span className={styles.priceCardLabel}>Charging today</span>
          <span className={styles.priceCardTotal}>${deposit.depositDue}</span>
          <span className={styles.priceCardNote}>
            Credited toward your ${deposit.finalCleaningTotal} total — not an additional fee. Remaining balance of $
            {deposit.remainingBalance} is due at service.
          </span>
        </div>
      ) : null}

      <div className={styles.fieldGroup}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor={CARD_CONTAINER_ID}>
            Card details
          </label>
          <div id={CARD_CONTAINER_ID} className={styles.cardElement} />
          {sdkState === "loading" ? <p className={styles.inlineNote}>Loading secure payment form…</p> : null}
          {sdkState === "unavailable" ? (
            <p className={styles.fieldError} role="alert">
              We couldn&apos;t load the secure payment form. Please check your connection, or go back and choose a general time window instead so our team can
              collect your deposit by phone.
            </p>
          ) : null}
          {cardError ? (
            <p className={styles.fieldError} role="alert">
              {cardError}
            </p>
          ) : null}
          {errorMessage ? (
            <p className={styles.fieldError} role="alert">
              {errorMessage}
            </p>
          ) : null}
        </div>

        <button type="button" className={styles.submitButton} onClick={handlePay} disabled={sdkState !== "ready" || submitting}>
          {submitting ? "Processing…" : deposit ? `Pay $${deposit.depositDue} & Book` : "Pay & Book"}
        </button>
      </div>
    </div>
  );
}

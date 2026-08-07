"use client";

import { AREA_LABELS, TIER_LABELS } from "@/lib/cleaning-pricing/config";
import { calculatePrice } from "@/lib/cleaning-pricing/engine";
import { ROOM_SIZE_LABELS } from "@/content/cleaning-booking-options";
import { buildPricingInput } from "../buildPricingInput";
import type { CleaningBookingFormState } from "../types";
import styles from "../CleaningBookingWizard.module.css";

interface Step7ReviewProps {
  state: CleaningBookingFormState;
  onEdit: (step: number) => void;
}

export function Step7Review({ state, onEdit }: Step7ReviewProps) {
  const input = buildPricingInput(state);
  if (!input) return null;

  const price = calculatePrice(input);
  const hasSpecialty = input.hasSpecialtyCondition;

  return (
    <div className={styles.stepPanel}>
      <h2 className={styles.stepHeading}>Review your Cleaning and price.</h2>
      <p className={styles.stepIntro}>Here&apos;s everything you&apos;ve told us and your total. You can go back and change anything before scheduling.</p>

      <div className={styles.priceCard}>
        <span className={styles.priceCardLabel}>Your Cleaning total</span>
        <span className={styles.priceCardTotal}>${price.finalTotal}</span>
        <span className={styles.priceCardNote}>
          A ${Math.min(140, price.finalTotal)} deposit is credited toward this total when you book — not an additional charge.
        </span>
      </div>

      <div className={styles.reviewSection}>
        <div className={styles.reviewSectionHeader}>
          <span className={styles.reviewSectionTitle}>Cleaning &amp; Home</span>
          <button type="button" className={styles.editButton} onClick={() => onEdit(1)}>
            Edit
          </button>
        </div>
        <div className={styles.reviewRow}>
          <span className={styles.reviewRowLabel}>Service</span>
          <span className={styles.reviewRowValue}>{TIER_LABELS[input.tier]}</span>
        </div>
        <div className={styles.reviewRow}>
          <span className={styles.reviewRowLabel}>Scope</span>
          <span className={styles.reviewRowValue}>{input.scope === "entire-home" ? "Entire home" : "Selected areas"}</span>
        </div>
        <div className={styles.reviewRow}>
          <span className={styles.reviewRowLabel}>Square footage</span>
          <span className={styles.reviewRowValue}>{input.squareFootage.toLocaleString()} sq ft</span>
        </div>
      </div>

      {input.scope === "selected-areas" ? (
        <div className={styles.reviewSection}>
          <div className={styles.reviewSectionHeader}>
            <span className={styles.reviewSectionTitle}>Areas Being Cleaned</span>
            <button type="button" className={styles.editButton} onClick={() => onEdit(2)}>
              Edit
            </button>
          </div>
          {input.selectedAreas.map((area) => (
            <div className={styles.reviewRow} key={area.type}>
              <span className={styles.reviewRowLabel}>
                {AREA_LABELS[area.type]} {area.size ? `(${ROOM_SIZE_LABELS[area.size]})` : ""} × {area.count}
              </span>
            </div>
          ))}
        </div>
      ) : null}

      <div className={styles.reviewSection}>
        <div className={styles.reviewSectionHeader}>
          <span className={styles.reviewSectionTitle}>Home Condition</span>
          <button type="button" className={styles.editButton} onClick={() => onEdit(3)}>
            Edit
          </button>
        </div>
        <p className={styles.reviewRowLabel}>
          Condition details are reflected in your total above — we don&apos;t list them individually here.
        </p>
      </div>

      {state.addOns.length > 0 || state.largeLaundryRequest ? (
        <div className={styles.reviewSection}>
          <div className={styles.reviewSectionHeader}>
            <span className={styles.reviewSectionTitle}>Add-Ons</span>
            <button type="button" className={styles.editButton} onClick={() => onEdit(4)}>
              Edit
            </button>
          </div>
          {price.addOnLineItems.map((item) => (
            <div className={styles.reviewRow} key={item.label}>
              <span className={styles.reviewRowLabel}>{item.label}</span>
              <span className={styles.reviewRowValue}>${item.amount}</span>
            </div>
          ))}
          {state.largeLaundryRequest ? (
            <p className={styles.reviewRowLabel}>
              You need more than 3 loads of laundry (about {state.estimatedLaundryLoads || "?"}) — our team will review and confirm scheduling before
              your appointment is finalized.
            </p>
          ) : null}
        </div>
      ) : null}

      <div className={styles.reviewSection}>
        <div className={styles.reviewSectionHeader}>
          <span className={styles.reviewSectionTitle}>Your Details</span>
          <button type="button" className={styles.editButton} onClick={() => onEdit(5)}>
            Edit
          </button>
        </div>
        <div className={styles.reviewRow}>
          <span className={styles.reviewRowLabel}>Name</span>
          <span className={styles.reviewRowValue}>
            {state.firstName} {state.lastName}
          </span>
        </div>
        <div className={styles.reviewRow}>
          <span className={styles.reviewRowLabel}>Address</span>
          <span className={styles.reviewRowValue}>
            {state.streetAddress}, {state.city}, {state.state} {state.zip}
          </span>
        </div>
      </div>

      {hasSpecialty ? (
        <div className={styles.reviewSection}>
          <div className={styles.reviewSectionHeader}>
            <span className={styles.reviewSectionTitle}>Specialty Details</span>
            <button type="button" className={styles.editButton} onClick={() => onEdit(6)}>
              Edit
            </button>
          </div>
          <p className={styles.reviewRowLabel}>
            This booking has been flagged for a member of our team to review before it&apos;s confirmed.
          </p>
        </div>
      ) : null}

      <div className={styles.priceTable}>
        <div className={styles.priceTableRow}>
          <span>Base price</span>
          <span>${price.basePrice}</span>
        </div>
        {price.conditionCharges > 0 ? (
          <div className={styles.priceTableRow}>
            <span>Condition-based adjustment</span>
            <span>${price.conditionCharges}</span>
          </div>
        ) : null}
        {price.petHairCharge > 0 ? (
          <div className={styles.priceTableRow}>
            <span>Pet hair</span>
            <span>${price.petHairCharge}</span>
          </div>
        ) : null}
        {price.addOnCharges > 0 ? (
          <div className={styles.priceTableRow}>
            <span>Add-ons</span>
            <span>${price.addOnCharges}</span>
          </div>
        ) : null}
        <div className={styles.priceTableRow} data-emphasis="true">
          <span>Total</span>
          <span>${price.finalTotal}</span>
        </div>
      </div>
    </div>
  );
}

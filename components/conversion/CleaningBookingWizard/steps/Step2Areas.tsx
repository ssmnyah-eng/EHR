"use client";

import {
  AREA_LABELS,
  FIXED_AREA_PRICE,
  FINISHED_BASEMENT_PRICE,
  SIZED_AREA_PRICE,
} from "@/lib/cleaning-pricing/config";
import { AREA_ORDER, ROOM_SIZE_LABELS, SIZED_AREA_OPTIONS } from "@/content/cleaning-booking-options";
import type { AreaType, RoomSize, SelectedArea, SizedAreaType } from "@/lib/cleaning-pricing/types";
import type { StepProps } from "../types";
import styles from "../CleaningBookingWizard.module.css";

const SIZED_TYPES = new Set(SIZED_AREA_OPTIONS.map((o) => o.value));

function areaPrice(type: AreaType, size?: RoomSize): number {
  if (type === "finished-basement") return FINISHED_BASEMENT_PRICE[size ?? "small"];
  if (SIZED_TYPES.has(type as SizedAreaType)) return SIZED_AREA_PRICE[type as SizedAreaType];
  return FIXED_AREA_PRICE[type as keyof typeof FIXED_AREA_PRICE];
}

function findArea(areas: SelectedArea[], type: AreaType): SelectedArea | undefined {
  return areas.find((a) => a.type === type);
}

interface AreaRowProps {
  type: AreaType;
  label: string;
  hasSize: boolean;
  state: StepProps["state"];
  updateField: StepProps["updateField"];
}

function AreaRow({ type, label, hasSize, state, updateField }: AreaRowProps) {
  const existing = findArea(state.selectedAreas, type);
  const count = existing?.count ?? 0;
  // Finished basement is the one area type where size changes the price
  // (spec: "starting at $40"), so default it to "small" — the true
  // starting price — rather than "average" like the duration-only sized
  // areas, where the default size doesn't affect what's shown or charged.
  const size = existing?.size ?? (type === "finished-basement" ? "small" : "average");
  const priceEach = areaPrice(type, hasSize ? size : undefined);

  function setCount(next: number) {
    const clamped = Math.max(0, Math.min(20, next));
    const others = state.selectedAreas.filter((a) => a.type !== type);
    if (clamped === 0) {
      updateField("selectedAreas", others);
      return;
    }
    const entry: SelectedArea = hasSize ? { type, count: clamped, size } : { type, count: clamped };
    updateField("selectedAreas", [...others, entry]);
  }

  function setSize(nextSize: RoomSize) {
    if (count === 0) return;
    const others = state.selectedAreas.filter((a) => a.type !== type);
    updateField("selectedAreas", [...others, { type, count, size: nextSize }]);
  }

  return (
    <div className={styles.unitRow}>
      <div className={styles.unitInfo}>
        <span className={styles.unitLabel}>{label}</span>
        <span className={styles.unitPrice}>
          {type === "finished-basement" && count === 0 ? "Starting at " : ""}${priceEach} each
        </span>
        {hasSize && count > 0 ? (
          <div className={styles.sizeRow} role="group" aria-label={`${label} size`}>
            {(Object.keys(ROOM_SIZE_LABELS) as RoomSize[]).map((s) => (
              <button
                key={s}
                type="button"
                className={styles.sizeChip}
                aria-pressed={size === s}
                onClick={() => setSize(s)}
              >
                {ROOM_SIZE_LABELS[s]}
              </button>
            ))}
          </div>
        ) : null}
      </div>
      <div className={styles.stepper}>
        <button
          type="button"
          className={styles.stepperButton}
          onClick={() => setCount(count - 1)}
          disabled={count === 0}
          aria-label={`Remove one ${label}`}
        >
          &minus;
        </button>
        <span className={styles.stepperValue} data-zero={count === 0}>
          {count}
        </span>
        <button type="button" className={styles.stepperButton} onClick={() => setCount(count + 1)} aria-label={`Add one ${label}`}>
          +
        </button>
      </div>
    </div>
  );
}

export function Step2Areas({ state, updateField, errors }: StepProps) {
  if (state.scope === "entire-home") {
    return (
      <div className={styles.stepPanel}>
        <h2 className={styles.stepHeading}>A little more about your home.</h2>
        <p className={styles.stepIntro}>
          We&apos;ll clean your entire home based on the square footage you already gave us — this just helps us prepare.
        </p>

        <div className={styles.fieldGroup}>
          <div className={styles.field}>
            <label htmlFor="step2-bedrooms" className={styles.label}>
              Bedrooms
            </label>
            <input
              id="step2-bedrooms"
              type="number"
              inputMode="numeric"
              min={0}
              value={state.wholeHomeBedrooms}
              onChange={(e) => updateField("wholeHomeBedrooms", e.target.value)}
              className={styles.input}
            />
          </div>
          {/* Bathroom count is asked once, in the next step (Home
              Condition), where it's actually needed to drive the
              per-bathroom condition question — not repeated here. */}

          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Does your home have a finished basement or other bonus area?</legend>
            <div className={styles.choiceGrid}>
              {(["yes", "no"] as const).map((value) => (
                <label key={value} className={styles.choiceCard}>
                  <input
                    type="radio"
                    name="wholeHomeHasBonusArea"
                    value={value}
                    checked={state.wholeHomeHasBonusArea === value}
                    onChange={() => updateField("wholeHomeHasBonusArea", value)}
                    className={styles.choiceInput}
                  />
                  <span className={styles.choiceLabel}>{value === "yes" ? "Yes" : "No"}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {state.wholeHomeHasBonusArea === "yes" ? (
            <div className={styles.field}>
              <label htmlFor="step2-bonus-details" className={styles.label}>
                Tell us about it
              </label>
              <textarea
                id="step2-bonus-details"
                rows={2}
                value={state.wholeHomeBonusAreaDetails}
                onChange={(e) => updateField("wholeHomeBonusAreaDetails", e.target.value)}
                className={styles.textarea}
              />
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  const total = state.selectedAreas.reduce((sum, a) => sum + areaPrice(a.type, a.size) * a.count, 0);

  return (
    <div className={styles.stepPanel}>
      <h2 className={styles.stepHeading}>Which areas would you like cleaned?</h2>
      <p className={styles.stepIntro}>Add each room you&apos;d like included. For kitchens, full bathrooms, bedrooms, and living areas, let us know the size.</p>

      <div className={styles.fieldGroup}>
        {AREA_ORDER.map((type) => (
          <AreaRow key={type} type={type} label={AREA_LABELS[type]} hasSize={SIZED_TYPES.has(type as SizedAreaType) || type === "finished-basement"} state={state} updateField={updateField} />
        ))}
      </div>

      {errors.selectedAreas ? (
        <p className={styles.fieldError} role="alert" style={{ marginTop: "var(--space-sm)" }}>
          {errors.selectedAreas}
        </p>
      ) : null}

      <div className={styles.priceCard} style={{ marginTop: "var(--space-lg)", marginBottom: 0 }}>
        <span className={styles.priceCardLabel}>Selected areas so far</span>
        <span className={styles.priceCardTotal}>${Math.max(total, 140)}</span>
        <span className={styles.priceCardNote}>{total < 140 ? "A $140 minimum applies to every Cleaning booking." : "Before condition and add-ons."}</span>
      </div>
    </div>
  );
}

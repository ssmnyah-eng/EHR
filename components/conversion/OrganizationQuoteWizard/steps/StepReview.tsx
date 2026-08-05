import { ORGANIZATION_ROOMS } from "@/content/home-organization-rooms";
import { CLUTTER_LEVELS, CLUTTER_NOT_SURE } from "@/content/organization-quote";
import type { OrganizationQuoteFormState } from "../types";
import styles from "../OrganizationQuoteWizard.module.css";

interface StepReviewProps {
  state: OrganizationQuoteFormState;
  onEdit: (step: number) => void;
  onSubmit: () => void;
  submitState: "idle" | "loading" | "error";
}

function displayValue(value: string): string {
  return value.trim() ? value : "Not provided";
}

function displayList(values: string[]): string {
  return values.length > 0 ? values.join(", ") : "Not provided";
}

interface ReviewRowProps {
  label: string;
  value: string;
}

function ReviewRow({ label, value }: ReviewRowProps) {
  return (
    <div className={styles.reviewRow}>
      <span className={styles.reviewLabel}>{label}</span>
      <span className={styles.reviewValue}>{value}</span>
    </div>
  );
}

export function StepReview({ state, onEdit, onSubmit, submitState }: StepReviewProps) {
  const serviceLabel = ORGANIZATION_ROOMS.find((room) => room.slug === state.service)?.navLabel ?? "Not selected";
  const clutterLabel =
    state.clutterLevel === CLUTTER_NOT_SURE.value
      ? CLUTTER_NOT_SURE.label
      : (CLUTTER_LEVELS.find((level) => level.value === state.clutterLevel)?.label ?? "Not provided");
  const isWholeHome = state.service === "whole-home-organization";

  return (
    <div className={styles.stepPanel}>
      <h2 className={styles.stepHeading}>Review your request.</h2>
      <p className={styles.stepIntro}>Take a look before submitting. You can edit any section without losing what you&apos;ve entered elsewhere.</p>

      <div className={styles.reviewSectionsList}>
        <section className={styles.reviewSection}>
          <div className={styles.reviewSectionHeader}>
            <p className={styles.reviewSectionTitle}>Your Information</p>
            <button type="button" className={styles.editButton} onClick={() => onEdit(1)}>
              Edit
            </button>
          </div>
          <ReviewRow label="Name" value={displayValue(`${state.firstName} ${state.lastName}`.trim())} />
          <ReviewRow label="Phone" value={displayValue(state.phone)} />
          <ReviewRow label="Email" value={displayValue(state.email)} />
          <ReviewRow
            label="Service Address"
            value={displayValue(
              [state.streetAddress, state.addressLine2, [state.city, state.state, state.zip].filter(Boolean).join(", ")]
                .filter(Boolean)
                .join(", "),
            )}
          />
        </section>

        <section className={styles.reviewSection}>
          <div className={styles.reviewSectionHeader}>
            <p className={styles.reviewSectionTitle}>Your Project</p>
            <button type="button" className={styles.editButton} onClick={() => onEdit(2)}>
              Edit
            </button>
          </div>
          <ReviewRow label="Organization Service" value={serviceLabel} />
          {isWholeHome ? (
            <>
              <ReviewRow label="Spaces" value={displayList(state.wholeHomeSpaces)} />
              {state.wholeHomeSpaces.includes("Other Space") ? (
                <ReviewRow label="Other Space" value={displayValue(state.wholeHomeOtherSpace)} />
              ) : null}
            </>
          ) : (
            <ReviewRow label="Space Type / Size" value={displayValue(state.spaceType)} />
          )}
        </section>

        <section className={styles.reviewSection}>
          <div className={styles.reviewSectionHeader}>
            <p className={styles.reviewSectionTitle}>Your Space</p>
            <button type="button" className={styles.editButton} onClick={() => onEdit(3)}>
              Edit
            </button>
          </div>
          <ReviewRow label="Clutter Level" value={clutterLabel || "Not provided"} />
          <ReviewRow label="What's Not Working" value={displayValue(state.whatsNotWorking)} />
          <ReviewRow label="How the Space Is Used" value={displayValue(state.howUsedNow)} />
          <ReviewRow label="Desired Outcome" value={displayValue(state.desiredDifference)} />
        </section>

        <section className={styles.reviewSection}>
          <div className={styles.reviewSectionHeader}>
            <p className={styles.reviewSectionTitle}>How the Space Feels</p>
            <button type="button" className={styles.editButton} onClick={() => onEdit(4)}>
              Edit
            </button>
          </div>
          <ReviewRow
            label="Current Feelings"
            value={displayList([...state.currentFeelings.filter((f) => f !== "Something else"), state.currentFeelingsOther].filter(Boolean))}
          />
          <ReviewRow
            label="Desired Feelings"
            value={displayList([...state.desiredFeelings.filter((f) => f !== "Something else"), state.desiredFeelingsOther].filter(Boolean))}
          />
        </section>

        <section className={styles.reviewSection}>
          <div className={styles.reviewSectionHeader}>
            <p className={styles.reviewSectionTitle}>Storage & Belongings</p>
            <button type="button" className={styles.editButton} onClick={() => onEdit(5)}>
              Edit
            </button>
          </div>
          <ReviewRow label="Main Issue" value={displayValue(state.mainIssue)} />
          <ReviewRow label="Existing Storage" value={displayValue(state.existingStorage)} />
          <ReviewRow label="Open to Letting Go" value={displayValue(state.opennessToLetGo)} />
          <ReviewRow label="Owns Organizing Products" value={displayValue(state.ownProducts)} />
          <ReviewRow label="Open to Purchasing Products" value={displayValue(state.openToPurchasing)} />
        </section>

        <section className={styles.reviewSection}>
          <div className={styles.reviewSectionHeader}>
            <p className={styles.reviewSectionTitle}>Photos & Measurements</p>
            <button type="button" className={styles.editButton} onClick={() => onEdit(6)}>
              Edit
            </button>
          </div>
          <ReviewRow label="Photos Uploaded" value={`${state.photos.length} photo${state.photos.length === 1 ? "" : "s"}`} />
          <ReviewRow
            label="Measurements"
            value={displayValue(
              [state.measurementWidth && `Width: ${state.measurementWidth}`, state.measurementLength && `Length: ${state.measurementLength}`, state.measurementNotes]
                .filter(Boolean)
                .join(" · "),
            )}
          />
        </section>

        <section className={styles.reviewSection}>
          <div className={styles.reviewSectionHeader}>
            <p className={styles.reviewSectionTitle}>Final Details</p>
            <button type="button" className={styles.editButton} onClick={() => onEdit(7)}>
              Edit
            </button>
          </div>
          <ReviewRow
            label="Tried Organizing Before"
            value={state.triedBefore === "yes" ? `Yes — ${displayValue(state.triedBeforeDetails)}` : state.triedBefore === "no" ? "No" : "Not provided"}
          />
          <ReviewRow label="Space Considerations" value={displayValue(state.spaceConsiderations)} />
          <ReviewRow label="What Matters Most" value={displayValue(state.whatMattersMost)} />
        </section>
      </div>

      <div className={styles.navRow}>
        <p className={styles.submitNote}>Submitting this form requests a Home Organization quote. It does not book or confirm an appointment.</p>
      </div>

      {submitState === "error" ? (
        <p className={styles.fieldError} role="alert">
          Something went wrong submitting this. Please try again.
        </p>
      ) : null}

      <button type="button" onClick={onSubmit} disabled={submitState === "loading"} className={styles.submitButton}>
        {submitState === "loading" ? "Sending…" : "Request My Organization Quote"}
      </button>
    </div>
  );
}

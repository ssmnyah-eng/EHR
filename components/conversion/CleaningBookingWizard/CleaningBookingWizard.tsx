"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { INQUIRY_FORM_ENDPOINT } from "@/lib/config";
import { TIER_LABELS } from "@/lib/cleaning-pricing/config";
import { calculateDeposit, calculateDuration, calculatePrice } from "@/lib/cleaning-pricing/engine";
import { createOrGetCustomer, createAppointment, cancelAppointment, createDepositPayment } from "@/lib/square-client";
import { buildPricingInput } from "./buildPricingInput";
import { INITIAL_FORM_STATE, TOTAL_STEPS, SCHEDULE_STEP, PAYMENT_STEP, type CleaningBookingFormState } from "./types";
import { SQUARE_FOOTAGE_BAND_LABELS } from "./squareFootageBands";
import { BookingSummary } from "./BookingSummary";
import { WizardProgress } from "./WizardProgress";
import { Step1CleaningHome } from "./steps/Step1CleaningHome";
import { Step2Areas } from "./steps/Step2Areas";
import { Step3Condition } from "./steps/Step3Condition";
import { Step4AddOns } from "./steps/Step4AddOns";
import { Step5Details } from "./steps/Step5Details";
import { Step6Specialty } from "./steps/Step6Specialty";
import { Step7Review } from "./steps/Step7Review";
import { Step8Schedule } from "./steps/Step8Schedule";
import { Step9Payment } from "./steps/Step9Payment";
import styles from "./CleaningBookingWizard.module.css";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface BookingConfirmation {
  finalCleaningTotal: number;
  depositDue: number;
  remainingBalance: number;
  startAt: string;
  squareBookingId: string;
  paymentId: string;
}

const FIELD_IDS: Record<number, Record<string, string>> = {
  1: { tier: "step1-tier-error", scope: "step1-scope-error", squareFootage: "step1-sqft" },
  2: { selectedAreas: "step2-areas" },
  3: {
    timeSinceCleaning: "step3-time",
    kitchenGrease: "step3-grease",
    bathroomCount: "step3-bathroom-count",
    dustAccumulation: "step3-dust",
    clutterAccess: "step3-clutter",
    petHair: "step3-pet",
  },
  4: { estimatedLaundryLoads: "step4-estimated-loads", laundryAlreadySorted: "step4-laundry-sorted-error" },
  5: {
    firstName: "step5-first-name",
    lastName: "step5-last-name",
    email: "step5-email",
    phone: "step5-phone",
    streetAddress: "step5-street",
    city: "step5-city",
    state: "step5-state",
    zip: "step5-zip",
  },
  6: {
    specialtyAffectedAreas: "step6-affected-areas",
    specialtyExtent: "step6-description",
    specialtyDescription: "step6-description",
  },
  8: { preferredDate: "step8-date", selectedSlotStart: "step8-date" },
};

function hasSpecialtyCondition(state: CleaningBookingFormState): boolean {
  return state.specialtyTypes.length > 0 || state.clutterAccess === "extreme";
}

function nextStepAfter(step: number, state: CleaningBookingFormState): number {
  if (step === 5) return hasSpecialtyCondition(state) ? 6 : 7;
  return Math.min(step + 1, TOTAL_STEPS);
}

function prevStepBefore(step: number, state: CleaningBookingFormState): number {
  if (step === 7) return hasSpecialtyCondition(state) ? 6 : 5;
  return Math.max(step - 1, 1);
}

function validateStep(step: number, state: CleaningBookingFormState): Record<string, string> {
  const errors: Record<string, string> = {};

  if (step === 1) {
    if (!state.tier) errors.tier = "Please choose a Cleaning service.";
    if (!state.scope) errors.scope = "Please let us know the scope of your clean.";
    if (!state.squareFootage) errors.squareFootage = "Please choose your home's square footage.";
  }

  if (step === 2 && state.scope === "selected-areas") {
    if (state.selectedAreas.length === 0) errors.selectedAreas = "Please add at least one area.";
  }

  if (step === 3) {
    if (!state.timeSinceCleaning) errors.timeSinceCleaning = "Please answer this question.";
    if (!state.kitchenGrease) errors.kitchenGrease = "Please answer this question.";
    if (!state.dustAccumulation) errors.dustAccumulation = "Please answer this question.";
    if (!state.clutterAccess) errors.clutterAccess = "Please answer this question.";
    if (!state.petHair) errors.petHair = "Please answer this question.";
    if (state.bathroomCount === "" || Number(state.bathroomCount) < 0) errors.bathroomCount = "Please tell us how many bathrooms your home has.";
  }

  if (step === 4) {
    const laundryQuantity = state.addOns.find((a) => a.type === "laundry")?.quantity ?? 0;
    if (laundryQuantity > 0 && !state.laundryAlreadySorted) {
      errors.laundryAlreadySorted = "Please let us know if your laundry will already be sorted.";
    }
    if (state.largeLaundryRequest && !state.estimatedLaundryLoads.trim()) {
      errors.estimatedLaundryLoads = "Please estimate how many loads you have.";
    }
  }

  if (step === 5) {
    if (!state.firstName.trim()) errors.firstName = "First name is required.";
    if (!state.lastName.trim()) errors.lastName = "Last name is required.";
    if (!state.email.trim()) errors.email = "Email address is required.";
    else if (!EMAIL_PATTERN.test(state.email)) errors.email = "Enter a valid email address.";
    if (!state.phone.trim()) errors.phone = "Phone number is required.";
    if (!state.streetAddress.trim()) errors.streetAddress = "Street address is required.";
    if (!state.city.trim()) errors.city = "City is required.";
    if (!state.state.trim()) errors.state = "State is required.";
    if (!state.zip.trim()) errors.zip = "ZIP code is required.";
  }

  if (step === 6) {
    if (!state.specialtyAffectedAreas.trim()) errors.specialtyAffectedAreas = "Please tell us which area(s) are affected.";
    if (!state.specialtyExtent) errors.specialtyExtent = "Please choose one.";
    if (!state.specialtyDescription.trim()) errors.specialtyDescription = "Please describe what's present.";
  }

  if (step === 8) {
    if (!state.preferredDate) errors.preferredDate = "Please choose a preferred date.";
    else if (!state.selectedSlotStart && !state.preferredTimeWindow) {
      errors.selectedSlotStart = "Please select an available time, or choose a preferred time window if live scheduling isn't showing times.";
    }
  }

  return errors;
}

const VALID_TIERS = new Set(["standard-clean", "deep-premium-clean", "elevated-reset-clean"]);

/**
 * Reads `?service=` on the client (static export has no server to resolve
 * searchParams at request time) and reports it up via callback instead of
 * being rendered in place of the wizard. Renders nothing itself, so the
 * <Suspense> fallback-to-content swap it requires never touches the
 * stateful wizard tree below — swapping a null fallback for a
 * null-rendering component has no effect on sibling state.
 */
function ServiceParamListener({ onService }: { onService: (service: string) => void }) {
  const searchParams = useSearchParams();
  useEffect(() => {
    const service = searchParams.get("service");
    if (service) onService(service);
  }, [searchParams, onService]);
  return null;
}

export function CleaningBookingWizard() {
  const [state, setState] = useState<CleaningBookingFormState>(INITIAL_FORM_STATE);
  const hasAppliedPreselect = useRef(false);

  function applyPreselectedService(service: string) {
    if (hasAppliedPreselect.current || !VALID_TIERS.has(service)) return;
    hasAppliedPreselect.current = true;
    setState((prev) => (prev.tier ? prev : { ...prev, tier: service as CleaningBookingFormState["tier"] }));
  }
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [submitErrorMessage, setSubmitErrorMessage] = useState("");
  const [depositMode, setDepositMode] = useState<"pending-followup" | "paid-online">("pending-followup");
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(null);
  const stepWrapperRef = useRef<HTMLDivElement>(null);
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const hasFocusedInitialStep = useRef(false);

  useEffect(() => {
    if (!hasFocusedInitialStep.current) {
      hasFocusedInitialStep.current = true;
      return;
    }
    stepWrapperRef.current?.focus();
  }, [currentStep]);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      errorSummaryRef.current?.focus();
    }
  }, [errors]);

  function updateField<K extends keyof CleaningBookingFormState>(key: K, value: CleaningBookingFormState[K]) {
    setState((prev) => ({ ...prev, [key]: value }));
  }

  function goToStep(step: number) {
    setErrors({});
    setCurrentStep(step);
  }

  function handleNext() {
    const stepErrors = validateStep(currentStep, state);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    setCurrentStep(nextStepAfter(currentStep, state));
  }

  function handleBack() {
    setErrors({});
    setCurrentStep(prevStepBefore(currentStep, state));
  }

  function focusField(key: string) {
    const id = FIELD_IDS[currentStep]?.[key];
    if (id) document.getElementById(id)?.focus();
  }

  /** Step 8's "Continue"/"Book" button — routes to the live Payment step
   *  when a real Square slot was picked, or straight to the fallback
   *  submission when the customer used the general time-window option
   *  instead (live availability wasn't reachable). */
  function handleScheduleContinue() {
    const stepErrors = validateStep(SCHEDULE_STEP, state);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    if (state.selectedSlotStart) {
      setCurrentStep(PAYMENT_STEP);
    } else {
      void handleFallbackSubmit();
    }
  }

  /** Live path: create/reuse the Square customer, create the real
   *  appointment for the selected slot, then charge the deposit with the
   *  one-time card token Step9Payment produced. If the payment step
   *  fails after the appointment was already created, releases the slot
   *  again rather than leaving it silently held. Throws on any failure
   *  so Step9Payment knows to stop showing its own "processing" state —
   *  the actual user-facing message is set here via submitErrorMessage. */
  async function handlePayAndBook(sourceId: string) {
    const input = buildPricingInput(state);
    if (!input || !state.selectedSlotStart) return;

    setSubmitState("loading");
    setSubmitErrorMessage("");
    let createdBookingId: string | null = null;

    try {
      const customer = await createOrGetCustomer({
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
        phone: state.phone,
      });

      const appointment = await createAppointment({
        customerId: customer.customerId,
        startAt: state.selectedSlotStart,
        pricingInput: input,
        note: state.schedulingNotes || undefined,
        idempotencyKey: crypto.randomUUID(),
      });
      createdBookingId = appointment.squareBookingId;

      const payment = await createDepositPayment({
        sourceId,
        pricingInput: input,
        customerId: customer.customerId,
        squareBookingId: appointment.squareBookingId,
        buyerEmail: state.email,
        idempotencyKey: crypto.randomUUID(),
      });

      setDepositMode("paid-online");
      setConfirmation({
        finalCleaningTotal: payment.finalCleaningTotal,
        depositDue: payment.depositDue,
        remainingBalance: payment.remainingBalance,
        startAt: appointment.startAt,
        squareBookingId: appointment.squareBookingId,
        paymentId: payment.paymentId,
      });
      setSubmitState("success");
    } catch (err) {
      if (createdBookingId) {
        try {
          await cancelAppointment(createdBookingId);
        } catch {
          // Best-effort release — if this also fails, the appointment
          // stays held and needs a person to clear it manually; the
          // customer's card was not charged either way since payment is
          // always the step after appointment creation.
        }
      }
      setSubmitErrorMessage(err instanceof Error ? err.message : "Something went wrong processing your payment. Please try again.");
      setSubmitState("error");
      throw err;
    }
  }

  /** Fallback path — used when live Square availability/payment can't be
   *  reached. Submits the complete booking record through the site's
   *  existing working intake channel so EHR actually receives it today,
   *  and tells the customer a person will follow up to collect the
   *  deposit and confirm their time. Never fakes a payment success. */
  async function handleFallbackSubmit() {
    const input = buildPricingInput(state);
    if (!input) return;

    setSubmitState("loading");

    const price = calculatePrice(input);
    const duration = calculateDuration(input);
    const deposit = calculateDeposit(price.finalTotal);

    try {
      const formData = new FormData();
      formData.append("_gotcha", "");
      formData.append("interest", "book_cleaning");
      formData.append("_subject", "New Cleaning Booking Request");
      formData.append("source", "/book-cleaning");

      formData.append("tier", TIER_LABELS[input.tier]);
      formData.append("scope", input.scope);
      formData.append("squareFootageRange", state.squareFootage ? SQUARE_FOOTAGE_BAND_LABELS[state.squareFootage] : "");
      formData.append("selectedAreas", JSON.stringify(input.selectedAreas));
      formData.append("wholeHomeBedrooms", state.wholeHomeBedrooms);
      formData.append("bathrooms", state.bathroomCount);
      formData.append("wholeHomeBonusArea", state.wholeHomeHasBonusArea === "yes" ? state.wholeHomeBonusAreaDetails : "none");

      formData.append("condition", JSON.stringify(input.condition));
      formData.append("addOns", JSON.stringify(input.addOns));
      formData.append("laundryAlreadySorted", String(input.laundryAlreadySorted));
      formData.append("largeLaundryRequest", String(state.largeLaundryRequest));
      formData.append("estimatedLaundryLoads", state.estimatedLaundryLoads);
      formData.append("laundryNotes", state.laundryNotes);

      formData.append("firstName", state.firstName);
      formData.append("lastName", state.lastName);
      formData.append("email", state.email);
      formData.append("phone", state.phone);
      formData.append("streetAddress", state.streetAddress);
      formData.append("addressLine2", state.addressLine2);
      formData.append("city", state.city);
      formData.append("state", state.state);
      formData.append("zip", state.zip);
      formData.append("accessNotes", state.accessNotes);

      formData.append("specialCondition", String(input.hasSpecialtyCondition));
      formData.append("priorityReview", String(input.hasSpecialtyCondition || state.largeLaundryRequest));
      formData.append("photosProvided", String(state.specialtyPhotos.length > 0));
      formData.append("specialtyTypes", state.specialtyTypes.join(", "));
      formData.append("specialtyAffectedAreas", state.specialtyAffectedAreas);
      formData.append("specialtyExtent", state.specialtyExtent);
      formData.append("specialtyDescription", state.specialtyDescription);
      state.specialtyPhotos.forEach((photo) => formData.append("specialtyPhotos[]", photo, photo.name));

      formData.append("preferredDate", state.preferredDate);
      formData.append("preferredTimeWindow", state.preferredTimeWindow);
      formData.append("schedulingNotes", state.schedulingNotes);

      formData.append("finalCleaningTotal", String(price.finalTotal));
      formData.append("depositDue", String(deposit.depositDue));
      formData.append("remainingBalance", String(deposit.remainingBalance));
      formData.append("estimatedCleanerMinutes", String(duration.totalCleanerMinutes));
      formData.append("estimatedLaundryCompletion", String(duration.estimatedLaundryCompletion));
      formData.append("appointmentMinutes", String(duration.appointmentMinutes));

      const response = await fetch(INQUIRY_FORM_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error("Request failed");
      setDepositMode("pending-followup");
      setSubmitState("success");
    } catch {
      setSubmitState("error");
    }
  }

  if (submitState === "success") {
    const input = buildPricingInput(state);
    const price = input ? calculatePrice(input) : null;
    const deposit = price ? calculateDeposit(price.finalTotal) : null;
    const appointmentTime = confirmation
      ? new Intl.DateTimeFormat(undefined, { weekday: "long", month: "long", day: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(confirmation.startAt))
      : null;

    return (
      <div className={styles.success} role="status">
        <p className={styles.successHeadline}>{depositMode === "paid-online" ? "You're booked." : "Booking request received."}</p>
        <p>
          {depositMode === "paid-online" && confirmation
            ? `Your $${confirmation.depositDue} deposit is paid and your ${appointmentTime} appointment is confirmed. Your remaining balance of $${confirmation.remainingBalance} is due at service.`
            : `We've got your details${price ? ` for your $${price.finalTotal} Cleaning` : ""}. Online deposit payment isn't available right now, so a member of our team will contact you within one business day to confirm your appointment time and collect your $${deposit?.depositDue ?? 140} deposit.`}
        </p>
        {input?.hasSpecialtyCondition ? (
          <p>Because of what you shared about your home&apos;s condition, our team will personally review this booking before it&apos;s confirmed.</p>
        ) : null}
        {state.largeLaundryRequest ? (
          <p>Because you need more than 3 loads of laundry, our team will review your request and confirm scheduling before your appointment is finalized.</p>
        ) : null}
        <div className={styles.successActions}>
          <Link href="/" className={styles.backButton}>
            Return Home
          </Link>
          <Link href="/cleaning" className={styles.backButton}>
            Explore Cleaning Services
          </Link>
        </div>
      </div>
    );
  }

  const stepErrorMessages = Object.entries(errors);
  const isReviewStep = currentStep === 7;
  const isScheduleStep = currentStep === SCHEDULE_STEP;
  const isPaymentStep = currentStep === PAYMENT_STEP;
  const isSpecialtyStep = currentStep === 6;

  return (
    <div className={styles.wizardLayout}>
      <div className={styles.wizard}>
        <Suspense fallback={null}>
          <ServiceParamListener onService={applyPreselectedService} />
        </Suspense>
        <WizardProgress currentStep={currentStep} hasSpecialtyCondition={hasSpecialtyCondition(state)} />

        {stepErrorMessages.length > 0 ? (
          <div className={styles.errorSummary} ref={errorSummaryRef} tabIndex={-1} role="alert">
            <p className={styles.errorSummaryHeading}>Please fix the following before continuing:</p>
            <div className={styles.errorSummaryList}>
              {stepErrorMessages.map(([key, message]) => (
                <button key={key} type="button" className={styles.errorSummaryLink} onClick={() => focusField(key)}>
                  {message}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        <div ref={stepWrapperRef} tabIndex={-1}>
          {currentStep === 1 ? <Step1CleaningHome state={state} updateField={updateField} errors={errors} /> : null}
          {currentStep === 2 ? <Step2Areas state={state} updateField={updateField} errors={errors} /> : null}
          {currentStep === 3 ? <Step3Condition state={state} updateField={updateField} errors={errors} /> : null}
          {currentStep === 4 ? <Step4AddOns state={state} updateField={updateField} errors={errors} /> : null}
          {currentStep === 5 ? <Step5Details state={state} updateField={updateField} errors={errors} /> : null}
          {isSpecialtyStep ? <Step6Specialty state={state} updateField={updateField} errors={errors} /> : null}
          {isReviewStep ? <Step7Review state={state} onEdit={goToStep} /> : null}
          {isScheduleStep ? <Step8Schedule state={state} updateField={updateField} errors={errors} /> : null}
          {isPaymentStep ? <Step9Payment state={state} onPay={handlePayAndBook} errorMessage={submitErrorMessage} /> : null}
        </div>

        {submitState === "error" && !isPaymentStep ? (
          <p className={styles.fieldError} role="alert" style={{ marginTop: "var(--space-sm)" }}>
            Something went wrong submitting this. Please try again, or contact us directly.
          </p>
        ) : null}

        <div className={styles.navRow}>
          {currentStep > 1 ? (
            <button type="button" onClick={handleBack} className={styles.backButton}>
              Back
            </button>
          ) : (
            <span />
          )}
          {isPaymentStep ? null : isScheduleStep ? (
            <button type="button" onClick={handleScheduleContinue} className={styles.submitButton} disabled={submitState === "loading"}>
              {submitState === "loading" ? "Submitting…" : state.selectedSlotStart ? "Continue to Payment" : "Book & Reserve Your Deposit"}
            </button>
          ) : (
            <button type="button" onClick={handleNext} className={styles.submitButton}>
              {isReviewStep ? "Continue to Schedule" : "Continue"}
            </button>
          )}
        </div>
      </div>

      <BookingSummary state={state} />
    </div>
  );
}

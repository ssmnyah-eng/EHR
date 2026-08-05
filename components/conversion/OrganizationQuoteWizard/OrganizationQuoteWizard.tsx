"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { INQUIRY_FORM_ENDPOINT } from "@/lib/config";
import { ORGANIZATION_ROOMS } from "@/content/home-organization-rooms";
import { SUCCESS_HEADING, SUCCESS_BODY } from "@/content/organization-quote";
import { INITIAL_FORM_STATE, TOTAL_STEPS, type OrganizationQuoteFormState } from "./types";
import { WizardProgress } from "./WizardProgress";
import { StepYourInformation } from "./steps/StepYourInformation";
import { StepYourProject } from "./steps/StepYourProject";
import { StepUnderstandingSpace } from "./steps/StepUnderstandingSpace";
import { StepHowSpaceFeels } from "./steps/StepHowSpaceFeels";
import { StepStorageBelongings } from "./steps/StepStorageBelongings";
import { StepPhotos } from "./steps/StepPhotos";
import { StepFinalDetails } from "./steps/StepFinalDetails";
import { StepReview } from "./steps/StepReview";
import styles from "./OrganizationQuoteWizard.module.css";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const STEP1_FIELD_IDS: Record<string, string> = {
  firstName: "oq-first-name",
  lastName: "oq-last-name",
  streetAddress: "oq-street",
  city: "oq-city",
  state: "oq-state",
  zip: "oq-zip",
  phone: "oq-phone",
  email: "oq-email",
};

const STEP2_FIELD_IDS: Record<string, string> = {
  service: "oq-service",
};

function validateStep1(state: OrganizationQuoteFormState): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!state.firstName.trim()) errors.firstName = "First name is required.";
  if (!state.lastName.trim()) errors.lastName = "Last name is required.";
  if (!state.streetAddress.trim()) errors.streetAddress = "Street address is required.";
  if (!state.city.trim()) errors.city = "City is required.";
  if (!state.state.trim()) errors.state = "State is required.";
  if (!state.zip.trim()) errors.zip = "ZIP code is required.";
  if (!state.phone.trim()) errors.phone = "Phone number is required.";
  if (!state.email.trim()) errors.email = "Email address is required.";
  else if (!EMAIL_PATTERN.test(state.email)) errors.email = "Enter a valid email address.";
  return errors;
}

function validateStep2(state: OrganizationQuoteFormState): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!state.service) errors.service = "Please select an organization service.";
  return errors;
}

function validateStep(step: number, state: OrganizationQuoteFormState): Record<string, string> {
  if (step === 1) return validateStep1(state);
  if (step === 2) return validateStep2(state);
  return {};
}

function fieldIdsForStep(step: number): Record<string, string> {
  if (step === 1) return STEP1_FIELD_IDS;
  if (step === 2) return STEP2_FIELD_IDS;
  return {};
}

interface OrganizationQuoteWizardProps {
  preselectedService?: string;
}

export function OrganizationQuoteWizard({ preselectedService }: OrganizationQuoteWizardProps) {
  const initialService = preselectedService && ORGANIZATION_ROOMS.some((room) => room.slug === preselectedService) ? preselectedService : "";

  const [state, setState] = useState<OrganizationQuoteFormState>({ ...INITIAL_FORM_STATE, service: initialService });
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success" | "error">("idle");
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

  function updateField<K extends keyof OrganizationQuoteFormState>(key: K, value: OrganizationQuoteFormState[K]) {
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
    setCurrentStep((step) => Math.min(step + 1, TOTAL_STEPS));
  }

  function handleBack() {
    setErrors({});
    setCurrentStep((step) => Math.max(step - 1, 1));
  }

  function focusField(key: string) {
    const ids = fieldIdsForStep(currentStep);
    const id = ids[key];
    if (id) document.getElementById(id)?.focus();
  }

  async function handleSubmit() {
    setSubmitState("loading");

    try {
      const formData = new FormData();
      formData.append("_gotcha", "");
      formData.append("interest", "home_organization_quote");
      formData.append("_subject", "New Home Organization Quote Request");
      formData.append("source", "/home-organization/request-a-quote");

      const serviceLabel = ORGANIZATION_ROOMS.find((room) => room.slug === state.service)?.navLabel ?? state.service;
      formData.append("service", serviceLabel);

      formData.append("firstName", state.firstName);
      formData.append("lastName", state.lastName);
      formData.append("streetAddress", state.streetAddress);
      formData.append("addressLine2", state.addressLine2);
      formData.append("city", state.city);
      formData.append("state", state.state);
      formData.append("zip", state.zip);
      formData.append("phone", state.phone);
      formData.append("email", state.email);

      formData.append("spaceType", state.spaceType);
      formData.append("wholeHomeSpaces", state.wholeHomeSpaces.join(", "));
      formData.append("wholeHomeOtherSpace", state.wholeHomeOtherSpace);

      formData.append("clutterLevel", state.clutterLevel);
      formData.append("whatsNotWorking", state.whatsNotWorking);
      formData.append("howUsedNow", state.howUsedNow);
      formData.append("desiredDifference", state.desiredDifference);

      formData.append("currentFeelings", state.currentFeelings.join(", "));
      formData.append("currentFeelingsOther", state.currentFeelingsOther);
      formData.append("desiredFeelings", state.desiredFeelings.join(", "));
      formData.append("desiredFeelingsOther", state.desiredFeelingsOther);

      formData.append("mainIssue", state.mainIssue);
      formData.append("existingStorage", state.existingStorage);
      formData.append("opennessToLetGo", state.opennessToLetGo);
      formData.append("ownProducts", state.ownProducts);
      formData.append("openToPurchasing", state.openToPurchasing);

      formData.append("photoCount", String(state.photos.length));
      state.photos.forEach((photo) => formData.append("photos[]", photo, photo.name));

      formData.append("measurementWidth", state.measurementWidth);
      formData.append("measurementLength", state.measurementLength);
      formData.append("measurementNotes", state.measurementNotes);

      formData.append("triedBefore", state.triedBefore);
      formData.append("triedBeforeDetails", state.triedBeforeDetails);
      formData.append("spaceConsiderations", state.spaceConsiderations);
      formData.append("whatMattersMost", state.whatMattersMost);

      const response = await fetch(INQUIRY_FORM_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error("Request failed");
      setSubmitState("success");
    } catch {
      setSubmitState("error");
    }
  }

  if (submitState === "success") {
    return (
      <div className={styles.success} role="status">
        <p className={styles.successHeadline}>{SUCCESS_HEADING}</p>
        <p>{SUCCESS_BODY}</p>
        <div className={styles.successActions}>
          <Link href="/" className={styles.editButton}>
            Return Home
          </Link>
          <Link href="/home-organization" className={styles.editButton}>
            Explore Home Organization
          </Link>
        </div>
      </div>
    );
  }

  const stepErrorMessages = Object.entries(errors);
  const isReviewStep = currentStep === TOTAL_STEPS;

  return (
    <div className={styles.wizard}>
      <WizardProgress currentStep={currentStep} />

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
        {currentStep === 1 ? <StepYourInformation state={state} updateField={updateField} errors={errors} /> : null}
        {currentStep === 2 ? <StepYourProject state={state} updateField={updateField} errors={errors} /> : null}
        {currentStep === 3 ? <StepUnderstandingSpace state={state} updateField={updateField} errors={errors} /> : null}
        {currentStep === 4 ? <StepHowSpaceFeels state={state} updateField={updateField} errors={errors} /> : null}
        {currentStep === 5 ? <StepStorageBelongings state={state} updateField={updateField} errors={errors} /> : null}
        {currentStep === 6 ? <StepPhotos state={state} updateField={updateField} errors={errors} /> : null}
        {currentStep === 7 ? <StepFinalDetails state={state} updateField={updateField} errors={errors} /> : null}
        {isReviewStep ? <StepReview state={state} onEdit={goToStep} onSubmit={handleSubmit} submitState={submitState} /> : null}
      </div>

      {!isReviewStep ? (
        <div className={styles.navRow}>
          {currentStep > 1 ? (
            <button type="button" onClick={handleBack} className={styles.editButton}>
              Back
            </button>
          ) : (
            <span />
          )}
          <button type="button" onClick={handleNext} className={styles.submitButton}>
            Next
          </button>
        </div>
      ) : (
        <div className={styles.navRow}>
          <button type="button" onClick={handleBack} className={styles.editButton}>
            Back
          </button>
        </div>
      )}
    </div>
  );
}

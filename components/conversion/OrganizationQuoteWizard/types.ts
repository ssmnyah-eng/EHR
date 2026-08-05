export interface OrganizationQuoteFormState {
  // Step 1 — Your Information
  firstName: string;
  lastName: string;
  streetAddress: string;
  addressLine2: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;

  // Step 2 — Your Project
  service: string;
  spaceType: string;
  wholeHomeSpaces: string[];
  wholeHomeOtherSpace: string;

  // Step 3 — Understanding the Space
  clutterLevel: string;
  whatsNotWorking: string;
  howUsedNow: string;
  desiredDifference: string;

  // Step 4 — How the Space Feels
  currentFeelings: string[];
  currentFeelingsOther: string;
  desiredFeelings: string[];
  desiredFeelingsOther: string;

  // Step 5 — Existing Storage & Belongings
  mainIssue: string;
  existingStorage: string;
  opennessToLetGo: string;
  ownProducts: string;
  openToPurchasing: string;

  // Step 6 — Photos
  photos: File[];
  measurementWidth: string;
  measurementLength: string;
  measurementNotes: string;

  // Step 7 — Final Details
  triedBefore: "" | "yes" | "no";
  triedBeforeDetails: string;
  spaceConsiderations: string;
  whatMattersMost: string;
}

export const INITIAL_FORM_STATE: OrganizationQuoteFormState = {
  firstName: "",
  lastName: "",
  streetAddress: "",
  addressLine2: "",
  city: "",
  state: "",
  zip: "",
  phone: "",
  email: "",

  service: "",
  spaceType: "",
  wholeHomeSpaces: [],
  wholeHomeOtherSpace: "",

  clutterLevel: "",
  whatsNotWorking: "",
  howUsedNow: "",
  desiredDifference: "",

  currentFeelings: [],
  currentFeelingsOther: "",
  desiredFeelings: [],
  desiredFeelingsOther: "",

  mainIssue: "",
  existingStorage: "",
  opennessToLetGo: "",
  ownProducts: "",
  openToPurchasing: "",

  photos: [],
  measurementWidth: "",
  measurementLength: "",
  measurementNotes: "",

  triedBefore: "",
  triedBeforeDetails: "",
  spaceConsiderations: "",
  whatMattersMost: "",
};

export const STEP_LABELS = ["Your Info", "Your Project", "Your Space", "Feelings", "Storage", "Photos", "Final Details", "Review"] as const;

export const TOTAL_STEPS = STEP_LABELS.length;

export interface StepProps {
  state: OrganizationQuoteFormState;
  updateField: <K extends keyof OrganizationQuoteFormState>(key: K, value: OrganizationQuoteFormState[K]) => void;
  errors: Record<string, string>;
}

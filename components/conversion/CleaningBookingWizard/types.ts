import type {
  CleaningScope,
  CleaningTier,
  ClutterLevel,
  ConditionLevel,
  PetHairLevel,
  SelectedAddOn,
  SelectedArea,
  SpecialtyConditionType,
  SpecialtyExtent,
  TimeSinceCleaning,
} from "@/lib/cleaning-pricing/types";

export interface CleaningBookingFormState {
  // Step 1 — Cleaning & Home
  tier: CleaningTier | "";
  scope: CleaningScope | "";
  squareFootage: string;

  // Step 2 — Areas Being Cleaned
  /** Only meaningful when scope === "selected-areas". */
  selectedAreas: SelectedArea[];
  /** Informational-only context collected for entire-home bookings —
   *  does not affect price/duration (both are sq-ft + tier driven). */
  wholeHomeBedrooms: string;
  wholeHomeBathrooms: string;
  wholeHomeHasBonusArea: "" | "yes" | "no";
  wholeHomeBonusAreaDetails: string;

  // Step 3 — Home Condition
  timeSinceCleaning: TimeSinceCleaning | "";
  kitchenGrease: ConditionLevel | "";
  bathroomCount: string;
  bathroomBuildup: ConditionLevel[];
  dustAccumulation: ConditionLevel | "";
  clutterAccess: ClutterLevel | "";
  petHair: PetHairLevel | "";

  // Specialty gate (asked at the end of Step 3, drives Step 6 visibility)
  specialtyTypes: SpecialtyConditionType[];

  // Step 4 — Add-Ons
  addOns: SelectedAddOn[];

  // Step 5 — Customer / Property Details
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  streetAddress: string;
  addressLine2: string;
  city: string;
  state: string;
  zip: string;
  accessNotes: string;

  // Step 6 — Specialty Details (conditional)
  specialtyAffectedAreas: string;
  specialtyExtent: SpecialtyExtent | "";
  specialtyDescription: string;
  specialtyPhotos: File[];

  // Step 8 — Schedule
  preferredDate: string;
  preferredTimeWindow: string;
  schedulingNotes: string;
}

export const INITIAL_FORM_STATE: CleaningBookingFormState = {
  tier: "",
  scope: "",
  squareFootage: "",

  selectedAreas: [],
  wholeHomeBedrooms: "",
  wholeHomeBathrooms: "",
  wholeHomeHasBonusArea: "",
  wholeHomeBonusAreaDetails: "",

  timeSinceCleaning: "",
  kitchenGrease: "",
  bathroomCount: "",
  bathroomBuildup: [],
  dustAccumulation: "",
  clutterAccess: "",
  petHair: "",

  specialtyTypes: [],

  addOns: [],

  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  streetAddress: "",
  addressLine2: "",
  city: "",
  state: "",
  zip: "",
  accessNotes: "",

  specialtyAffectedAreas: "",
  specialtyExtent: "",
  specialtyDescription: "",
  specialtyPhotos: [],

  preferredDate: "",
  preferredTimeWindow: "",
  schedulingNotes: "",
};

/** Numbered per the brief's 9-step structure. Step 6 (Specialty Details)
 *  is skipped in navigation/progress when hasSpecialtyCondition is
 *  false — see stepSequence() in CleaningBookingWizard.tsx. */
export const STEP_LABELS = [
  "Cleaning & Home",
  "Areas Being Cleaned",
  "Home Condition",
  "Add-Ons",
  "Your Details",
  "Specialty Details",
  "Review & Price",
  "Schedule & Deposit",
] as const;

export const TOTAL_STEPS = STEP_LABELS.length;
export const SPECIALTY_STEP = 6;
export const REVIEW_STEP = 7;
export const SCHEDULE_STEP = 8;

export interface StepProps {
  state: CleaningBookingFormState;
  updateField: <K extends keyof CleaningBookingFormState>(key: K, value: CleaningBookingFormState[K]) => void;
  errors: Record<string, string>;
}

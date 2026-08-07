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
  /** "Will laundry already be sorted?" — only asked/meaningful once at
   *  least one laundry load is selected. Affects scheduling only, never
   *  price. See LAUNDRY_UNSORTED_MINUTES_PER_LOAD. */
  laundryAlreadySorted: "" | "yes" | "no";
  /** Laundry beyond the 3-load online booking cap. Not priced/scheduled
   *  automatically — purely a flag + free-text estimate for EHR to review
   *  and confirm scheduling manually. See LAUNDRY_MAX_ONLINE_LOADS. */
  largeLaundryRequest: boolean;
  estimatedLaundryLoads: string;
  laundryNotes: string;

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
  /** Set once real Square availability is fetched and the customer picks
   *  a real open slot — "" until then. When this is set, Continue goes
   *  to the live Payment step (9). */
  selectedSlotStart: string;
  selectedSlotEnd: string;
  /** Fallback-only: if live availability can't be reached, the customer
   *  can pick a general time window instead and the booking is submitted
   *  through the existing staff-follow-up (Formspree) channel rather
   *  than the live Square payment flow. Meaningless once selectedSlotStart
   *  is set. */
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
  laundryAlreadySorted: "",
  largeLaundryRequest: false,
  estimatedLaundryLoads: "",
  laundryNotes: "",

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
  selectedSlotStart: "",
  selectedSlotEnd: "",
  preferredTimeWindow: "",
  schedulingNotes: "",
};

/** Step 6 (Specialty Details) is skipped in navigation/progress when
 *  hasSpecialtyCondition is false — see stepSequence() in
 *  CleaningBookingWizard.tsx. Step 9 (Payment) is only ever reached when
 *  the customer picked a real live Square slot in Step 8 — the fallback
 *  path submits directly from Step 8 and never shows it. */
export const STEP_LABELS = [
  "Cleaning & Home",
  "Areas Being Cleaned",
  "Home Condition",
  "Add-Ons",
  "Your Details",
  "Specialty Details",
  "Review & Price",
  "Schedule",
  "Payment",
] as const;

export const TOTAL_STEPS = STEP_LABELS.length;
export const SPECIALTY_STEP = 6;
export const REVIEW_STEP = 7;
export const SCHEDULE_STEP = 8;
export const PAYMENT_STEP = 9;

export interface StepProps {
  state: CleaningBookingFormState;
  updateField: <K extends keyof CleaningBookingFormState>(key: K, value: CleaningBookingFormState[K]) => void;
  errors: Record<string, string>;
}

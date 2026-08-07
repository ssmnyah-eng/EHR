/**
 * Client-side boundary for the Square integration. This file talks to a
 * secure server/serverless API — never to Square directly — because a
 * GitHub Pages static export has no server, and a Square access token
 * must never reach the browser (see workers/square-api/dashboard/worker.js
 * for the deployed backend). No Square secret is imported or read here,
 * and none should ever be added to this file.
 *
 * Until NEXT_PUBLIC_BOOKING_API_BASE is configured at build time, every
 * function here throws BookingApiNotConfiguredError. The wizard catches
 * that specific error (and any other request failure) and falls back to
 * submitting the full booking record through the site's existing
 * Formspree intake channel instead — so a real visitor filling out this
 * form still gets their booking to EHR even if the live API is
 * unreachable, with a message telling them scheduling/deposit-payment
 * will be confirmed by a person rather than instantly online.
 */

import type { CleaningPricingInput } from "./cleaning-pricing/types";

export class BookingApiNotConfiguredError extends Error {
  constructor() {
    super("NEXT_PUBLIC_BOOKING_API_BASE is not configured — the secure Square integration layer is not deployed yet.");
    this.name = "BookingApiNotConfiguredError";
  }
}

function apiBase(): string {
  const base = process.env.NEXT_PUBLIC_BOOKING_API_BASE;
  if (!base) throw new BookingApiNotConfiguredError();
  return base.replace(/\/$/, "");
}

async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${apiBase()}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
  });
  let body: unknown = null;
  try {
    body = await response.json();
  } catch {
    // Non-JSON response — body stays null, status check below still fires.
  }
  if (!response.ok) {
    const message = body && typeof body === "object" && "error" in body ? String((body as { error: unknown }).error) : `Request failed (${response.status})`;
    throw new Error(message);
  }
  return body as T;
}

export interface SquareConfig {
  applicationId: string;
  locationId: string;
  environment: "sandbox" | "production";
}

/** GET /config — the non-secret Square identifiers the Web Payments SDK
 *  needs to initialize. Fetched at runtime rather than hardcoded so
 *  rotating either value only ever requires a Cloudflare Worker
 *  redeploy, never a site rebuild. */
export function getSquareConfig(): Promise<SquareConfig> {
  return apiRequest<SquareConfig>("/config", { method: "GET" });
}

export interface PriceLineItem {
  label: string;
  amount: number;
}

export interface PriceBreakdown {
  basePrice: number;
  conditionCharges: number;
  conditionChargesUncapped: number;
  petHairCharge: number;
  addOnCharges: number;
  addOnLineItems: PriceLineItem[];
  recurringDiscount: number;
  finalTotal: number;
  minimumApplied: boolean;
}

export interface DurationBreakdown {
  baseCleanerMinutes: number;
  conditionMinutes: number;
  petHairMinutes: number;
  addOnMinutes: number;
  laundrySortingMinutes: number;
  specialtyContingencyMinutes: number;
  totalCleanerMinutes: number;
  bufferedMinutes: number;
  estimatedLaundryCompletion: number;
  appointmentMinutes: number;
}

export interface DepositBreakdown {
  finalCleaningTotal: number;
  depositDue: number;
  remainingBalance: number;
}

export interface PricingQuote {
  price: PriceBreakdown;
  duration: DurationBreakdown;
  deposit: DepositBreakdown;
}

/** POST /pricing/quote — the authoritative, server-recomputed price,
 *  duration, and deposit for the current questionnaire answers. The
 *  browser's own live preview (lib/cleaning-pricing/engine, used for
 *  the Review step) is never what actually gets charged — this call (or
 *  the equivalent recompute inside /appointments and /payments) is. */
export function getPricingQuote(pricingInput: CleaningPricingInput): Promise<PricingQuote> {
  return apiRequest<PricingQuote>("/pricing/quote", {
    method: "POST",
    body: JSON.stringify({ pricingInput }),
  });
}

export interface AvailabilityRequest {
  serviceDate: string;
  pricingInput: CleaningPricingInput;
}

export interface AvailabilitySlot {
  startTime: string;
  endTime: string;
}

export interface AvailabilityResult {
  appointmentMinutes: number;
  slots: AvailabilitySlot[];
}

/** POST /availability — real open appointment slots from Square
 *  Bookings for the requested date, sized to the server-recomputed
 *  appointment duration. The bookable-team-member selection Square's
 *  API requires stays entirely server-side and is never exposed here. */
export function getAvailability(request: AvailabilityRequest): Promise<AvailabilityResult> {
  return apiRequest<AvailabilityResult>("/availability", {
    method: "POST",
    body: JSON.stringify(request),
  });
}

export interface CreateOrGetCustomerRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface CreateOrGetCustomerResult {
  customerId: string;
  created: boolean;
}

/** POST /customers — finds an existing Square customer by email first;
 *  only creates a new one if none exists. */
export function createOrGetCustomer(request: CreateOrGetCustomerRequest): Promise<CreateOrGetCustomerResult> {
  return apiRequest<CreateOrGetCustomerResult>("/customers", {
    method: "POST",
    body: JSON.stringify(request),
  });
}

export interface CreateAppointmentRequest {
  customerId: string;
  /** ISO start time of the exact slot the customer selected, taken
   *  verbatim from an AvailabilitySlot returned by getAvailability. */
  startAt: string;
  pricingInput: CleaningPricingInput;
  note?: string;
  idempotencyKey: string;
}

export interface CreateAppointmentResult {
  squareBookingId: string;
  status: string;
  startAt: string;
  appointmentMinutes: number;
  idempotencyKey: string;
}

/** POST /appointments — creates the actual Square Bookings appointment.
 *  Re-verifies the slot is still open server-side before booking it
 *  (another customer may have taken it between search and submit).
 *  Call this before createDepositPayment, per the required flow order
 *  (appointment first, deposit second) — if the payment step then
 *  fails, cancelAppointment releases the slot again. */
export function createAppointment(request: CreateAppointmentRequest): Promise<CreateAppointmentResult> {
  return apiRequest<CreateAppointmentResult>("/appointments", {
    method: "POST",
    body: JSON.stringify(request),
  });
}

/** POST /appointments/cancel — releases a held appointment. Used when a
 *  deposit payment that was supposed to follow appointment creation
 *  fails, so a failed charge doesn't silently occupy a real time slot. */
export function cancelAppointment(squareBookingId: string): Promise<{ squareBookingId: string; status: string }> {
  return apiRequest("/appointments/cancel", {
    method: "POST",
    body: JSON.stringify({ squareBookingId }),
  });
}

export interface CreateDepositPaymentRequest {
  /** One-time card token produced client-side by Square's Web Payments
   *  SDK (card.tokenize()) — the raw card number never passes through
   *  this file or any EHR server. */
  sourceId: string;
  pricingInput: CleaningPricingInput;
  customerId?: string;
  squareBookingId?: string;
  buyerEmail?: string;
  idempotencyKey: string;
}

export interface CreateDepositPaymentResult {
  paymentId: string;
  status: string;
  amountCharged: number;
  finalCleaningTotal: number;
  depositDue: number;
  remainingBalance: number;
  squareBookingId: string | null;
}

/** POST /payments — charges the deposit. Price/deposit are recomputed
 *  server-side from pricingInput; the amount actually charged is never
 *  a client-supplied number. */
export function createDepositPayment(request: CreateDepositPaymentRequest): Promise<CreateDepositPaymentResult> {
  return apiRequest<CreateDepositPaymentResult>("/payments", {
    method: "POST",
    body: JSON.stringify(request),
  });
}

/**
 * Client-side boundary for the Square integration. This file talks to a
 * secure server/serverless API — never to Square directly — because a
 * GitHub Pages static export has no server, and a Square access token
 * must never reach the browser (see the architecture doc referenced
 * below). No Square secret is imported or read here, and none should
 * ever be added to this file.
 *
 * Until that server/serverless layer exists and NEXT_PUBLIC_BOOKING_API_BASE
 * is configured, every function here throws BookingApiNotConfiguredError.
 * The wizard catches that specific error and falls back to submitting the
 * full booking record through the site's existing Formspree intake
 * channel instead — so a real visitor filling out this form today still
 * gets their booking to EHR, with a message telling them scheduling/
 * deposit-payment will be confirmed by a person rather than instantly
 * online. See docs/square-integration.md for the full architecture,
 * required endpoints, and what each one needs to do server-side.
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

export interface DepositCheckoutRequest {
  /** Idempotency key — the server must treat repeated calls with the
   *  same bookingId as the same request, not a duplicate charge. */
  bookingId: string;
  /** The full booking answers. The server MUST run this through
   *  lib/cleaning-pricing/engine itself (calculatePrice + calculateDeposit)
   *  and treat that recomputed figure as authoritative — never the
   *  client-computed amountCents below. */
  pricingInput: CleaningPricingInput;
  /** Client-computed deposit, in cents. Sent only so the server can
   *  cross-check/flag a mismatch (e.g. tampered frontend) — never trusted
   *  on its own to set the charge amount. */
  amountCents: number;
  customerEmail: string;
  customerName: string;
}

export interface DepositCheckoutResult {
  /** Square-hosted Checkout (ad-hoc "Quick Pay" link) URL to redirect
   *  the customer to. */
  checkoutUrl: string;
  squareOrderId: string;
}

/** POST /checkout/create on the secure API layer. Server-side, this
 *  should: recompute the price/deposit from the submitted answers,
 *  create a Square ad-hoc Checkout Link for depositDue (no Square
 *  catalog item required — see docs/square-integration.md), and return
 *  its URL. */
export async function createDepositCheckout(request: DepositCheckoutRequest): Promise<DepositCheckoutResult> {
  const response = await fetch(`${apiBase()}/checkout/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  if (!response.ok) throw new Error(`Deposit checkout creation failed (${response.status})`);
  return response.json();
}

export interface AvailabilityRequest {
  serviceDate: string;
  appointmentMinutes: number;
  zip: string;
}

export interface AvailabilitySlot {
  startTime: string;
  endTime: string;
}

/** GET-equivalent POST /availability. Server-side, this calls Square's
 *  Bookings availability search using the location/service-variation IDs
 *  configured in Square Dashboard (see docs/square-integration.md) — the
 *  team-member/staffing selection Square's API requires stays entirely
 *  server-side and is never exposed to the customer. */
export async function getAvailability(request: AvailabilityRequest): Promise<AvailabilitySlot[]> {
  const response = await fetch(`${apiBase()}/availability`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  if (!response.ok) throw new Error(`Availability lookup failed (${response.status})`);
  return response.json();
}

export interface CreateBookingRequest {
  bookingId: string;
  startAt: string;
  appointmentMinutes: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  note?: string;
}

export interface CreateBookingResult {
  squareBookingId: string;
  status: string;
}

/** POST /bookings/create on the secure API layer. Server-side, this
 *  re-validates the slot is still available, creates/reuses the Square
 *  customer, and creates the Square Bookings appointment — the
 *  bookable-team-member selection Square requires stays entirely
 *  server-side (see docs/square-integration.md). Not yet called by the
 *  wizard UI; wire this in once EHR decides whether appointment creation
 *  should be automatic on deposit payment or require staff confirmation
 *  first. */
export async function createBooking(request: CreateBookingRequest): Promise<CreateBookingResult> {
  const response = await fetch(`${apiBase()}/bookings/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  if (!response.ok) throw new Error(`Booking creation failed (${response.status})`);
  return response.json();
}

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
  /** The server MUST re-derive this from the submitted booking answers
   *  using lib/cleaning-pricing/engine — never trust amountCents sent by
   *  the browser as authoritative. Sent here only so the server can
   *  cross-check against what it independently computes. */
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

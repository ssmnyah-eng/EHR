import type { Env } from "./env";

/**
 * Minimal Square REST API client using plain fetch — deliberately not the
 * official Square Node SDK, which targets Node.js and isn't guaranteed to
 * run cleanly in the Workers runtime. Every call here needs
 * SQUARE_ACCESS_TOKEN, which only exists as a Worker secret — this file is
 * the one place in the whole project that's allowed to touch it.
 *
 * Bump SQUARE_API_VERSION as Square publishes newer versions:
 * https://developer.squareup.com/reference/square — pin it explicitly
 * rather than floating, so a Square API change can't silently alter
 * behavior here.
 */
const SQUARE_API_VERSION = "2025-01-23";

export class SquareApiError extends Error {
  constructor(
    public status: number,
    public body: unknown
  ) {
    super(`Square API error (${status}): ${JSON.stringify(body)}`);
    this.name = "SquareApiError";
  }
}

function baseUrl(env: Env): string {
  return env.SQUARE_ENVIRONMENT === "production" ? "https://connect.squareup.com" : "https://connect.squareupsandbox.com";
}

async function squareFetch<T>(env: Env, path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${baseUrl(env)}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      "Square-Version": SQUARE_API_VERSION,
      Authorization: `Bearer ${env.SQUARE_ACCESS_TOKEN}`,
      ...init.headers,
    },
  });
  const body = await response.json();
  if (!response.ok) throw new SquareApiError(response.status, body);
  return body as T;
}

export interface QuickPayCheckoutResult {
  payment_link: { id: string; url: string; order_id: string };
}

/**
 * Creates a Square "Quick Pay" ad-hoc Checkout Link for an arbitrary
 * amount — no catalog item required. This is the correct call for the
 * $140 (or less) deposit, since the deposit doesn't correspond to a fixed
 * catalog price (per the approved architecture note: "Square can create a
 * hosted checkout for an ad-hoc amount, so your $140 deposit does not need
 * to equal a fixed catalog cleaning price").
 */
export function createQuickPayCheckout(
  env: Env,
  args: { idempotencyKey: string; amountCents: number; name: string; buyerEmail?: string }
): Promise<QuickPayCheckoutResult> {
  return squareFetch(env, "/v2/online-checkout/payment-links", {
    method: "POST",
    body: JSON.stringify({
      idempotency_key: args.idempotencyKey,
      quick_pay: {
        name: args.name,
        price_money: { amount: args.amountCents, currency: "USD" },
        location_id: env.SQUARE_LOCATION_ID,
      },
      pre_populated_data: args.buyerEmail ? { buyer_email: args.buyerEmail } : undefined,
    }),
  });
}

export interface AvailabilitySearchResult {
  availabilities: {
    start_at: string;
    location_id: string;
    appointment_segments: { team_member_id: string; duration_minutes: number; service_variation_id: string }[];
  }[];
}

/**
 * Searches Square Bookings availability for the configured service
 * variation. `teamMemberId` is intentionally optional — omitting it asks
 * Square for availability across any bookable team member, which is how
 * the customer-facing side stays staffing-agnostic (see architecture doc:
 * "Don't expose Square team/staff selection to the customer").
 */
export function searchAvailability(
  env: Env,
  args: { startAt: string; endAt: string; durationMinutes: number; teamMemberId?: string }
): Promise<AvailabilitySearchResult> {
  const segmentFilter: Record<string, unknown> = {
    service_variation_id: env.SQUARE_SERVICE_VARIATION_ID,
    service_variation_version: undefined,
  };
  if (args.teamMemberId) segmentFilter.team_member_id_filter = { any: [args.teamMemberId] };

  return squareFetch(env, "/v2/bookings/availability/search", {
    method: "POST",
    body: JSON.stringify({
      query: {
        filter: {
          location_id: env.SQUARE_LOCATION_ID,
          start_at_range: { start_at: args.startAt, end_at: args.endAt },
          segment_filters: [segmentFilter],
        },
      },
    }),
  });
}

export interface CreateBookingResult {
  booking: { id: string; status: string; start_at: string };
}

export function createBooking(
  env: Env,
  args: { startAt: string; durationMinutes: number; customerId: string; teamMemberId: string; idempotencyKey: string; note?: string }
): Promise<CreateBookingResult> {
  return squareFetch(env, "/v2/bookings", {
    method: "POST",
    body: JSON.stringify({
      idempotency_key: args.idempotencyKey,
      booking: {
        location_id: env.SQUARE_LOCATION_ID,
        start_at: args.startAt,
        customer_id: args.customerId,
        customer_note: args.note,
        appointment_segments: [
          {
            duration_minutes: args.durationMinutes,
            service_variation_id: env.SQUARE_SERVICE_VARIATION_ID,
            team_member_id: args.teamMemberId,
          },
        ],
      },
    }),
  });
}

export interface CreateCustomerResult {
  customer: { id: string };
}

export function createCustomer(env: Env, args: { givenName: string; familyName: string; emailAddress: string; phoneNumber?: string }): Promise<CreateCustomerResult> {
  return squareFetch(env, "/v2/customers", {
    method: "POST",
    body: JSON.stringify({
      given_name: args.givenName,
      family_name: args.familyName,
      email_address: args.emailAddress,
      phone_number: args.phoneNumber,
    }),
  });
}

/**
 * Verifies a Square webhook payload is genuinely from Square before
 * trusting it, per Square's documented HMAC-SHA256 scheme:
 * base64(HMAC-SHA256(signatureKey, notificationUrl + rawRequestBody))
 * compared to the x-square-hmacsha256-signature header.
 * https://developer.squareup.com/docs/webhooks/step3verify
 */
export async function verifySquareWebhookSignature(signatureKey: string, notificationUrl: string, rawBody: string, signatureHeader: string | null): Promise<boolean> {
  if (!signatureHeader) return false;
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(signatureKey), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const signatureBytes = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(notificationUrl + rawBody));
  const computed = btoa(String.fromCharCode(...new Uint8Array(signatureBytes)));
  return computed === signatureHeader;
}

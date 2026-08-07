import type { Env } from "../env";
import { verifySquareWebhookSignature } from "../square";

/**
 * POST /webhooks/square
 *
 * Square webhook receiver. Verifies the signature before trusting
 * anything in the payload — an unverified POST to this URL must never be
 * treated as a real Square event. `notificationUrl` must be the exact,
 * full URL configured in the Square Dashboard's webhook subscription
 * (signature verification is computed against that exact string).
 *
 * TODO once a data store exists: on a verified `payment.updated` /
 * `payment.completed` event, mark the corresponding booking's deposit as
 * paid, and optionally trigger /bookings/create automatically. Nothing is
 * persisted yet — there's no database in this project — so this handler
 * currently only verifies and logs. Decide with EHR whether appointment
 * creation should be fully automatic here or require staff confirmation
 * before wiring that up.
 */
export async function handleSquareWebhook(request: Request, env: Env): Promise<Response> {
  const rawBody = await request.text();
  const signatureHeader = request.headers.get("x-square-hmacsha256-signature");
  const notificationUrl = request.url;

  const verified = await verifySquareWebhookSignature(env.SQUARE_WEBHOOK_SIGNATURE_KEY, notificationUrl, rawBody, signatureHeader);
  if (!verified) {
    console.warn("Rejected Square webhook: signature verification failed");
    return new Response("Invalid signature", { status: 401 });
  }

  let event: { type?: string; data?: unknown };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  console.log("Verified Square webhook event:", event.type);
  // No persistence layer yet — see TODO above.

  return new Response("ok", { status: 200 });
}

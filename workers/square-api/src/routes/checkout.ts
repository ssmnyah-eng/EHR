import type { Env } from "../env";
import { jsonResponse, errorResponse } from "../cors";
import { createQuickPayCheckout } from "../square";
import { calculatePrice, calculateDeposit } from "../../../../lib/cleaning-pricing/engine";
import type { CleaningPricingInput } from "../../../../lib/cleaning-pricing/types";

interface CheckoutRequestBody {
  bookingId: string;
  pricingInput: CleaningPricingInput;
  amountCents: number;
  customerEmail: string;
  customerName: string;
}

/**
 * POST /checkout/create
 *
 * The security-critical step: this recomputes price/deposit from
 * pricingInput using the exact same engine the frontend uses for its live
 * preview — the client-submitted amountCents is never what gets charged.
 * A tampered frontend can send any amountCents it wants; this handler
 * ignores it for the actual charge and only logs a mismatch for review.
 */
export async function handleCheckoutCreate(request: Request, env: Env): Promise<Response> {
  let body: CheckoutRequestBody;
  try {
    body = await request.json();
  } catch {
    return errorResponse(env, "Invalid JSON body");
  }

  if (!body.bookingId || !body.pricingInput || !body.customerEmail || !body.customerName) {
    return errorResponse(env, "Missing required fields");
  }

  let price: ReturnType<typeof calculatePrice>;
  let deposit: ReturnType<typeof calculateDeposit>;
  try {
    price = calculatePrice(body.pricingInput);
    deposit = calculateDeposit(price.finalTotal);
  } catch (err) {
    return errorResponse(env, `Could not price this booking: ${err instanceof Error ? err.message : "unknown error"}`);
  }

  const serverAmountCents = Math.round(deposit.depositDue * 100);
  if (typeof body.amountCents === "number" && body.amountCents !== serverAmountCents) {
    // Client and server disagree — proceed with the server-computed
    // amount regardless, but this is worth alerting on (a mismatch means
    // either a stale client price preview or a tampered request).
    console.warn(`checkout amount mismatch: client sent ${body.amountCents}, server computed ${serverAmountCents} for booking ${body.bookingId}`);
  }

  try {
    const result = await createQuickPayCheckout(env, {
      idempotencyKey: body.bookingId,
      amountCents: serverAmountCents,
      name: "Elevated Home Resets — Cleaning Deposit",
      buyerEmail: body.customerEmail,
    });
    return jsonResponse(env, {
      checkoutUrl: result.payment_link.url,
      squareOrderId: result.payment_link.order_id,
    });
  } catch (err) {
    console.error("Square checkout creation failed", err);
    return errorResponse(env, "Could not create Square checkout", 502);
  }
}

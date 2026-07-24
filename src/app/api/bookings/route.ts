import { NextRequest, NextResponse } from "next/server";
import {
  confirmBooking,
  createBooking,
  hasAnyAvailability,
  releaseBooking,
  slotsForDay,
} from "@/lib/bookingStore";
import { DEPOSIT } from "@/lib/cleaning";
import { sendBookingConfirmation } from "@/lib/email";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

// GET /api/bookings?date=YYYY-MM-DD&hours=4.5  -> { slots: ["08:00", ...] }
// GET /api/bookings?hours=4.5                  -> { anyAvailability: boolean }
export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get("date");
  const hours = Number(req.nextUrl.searchParams.get("hours") ?? "3");
  if (date) {
    return NextResponse.json({ slots: await slotsForDay(date, hours) });
  }
  return NextResponse.json({
    anyAvailability: await hasAnyAvailability(hours),
  });
}

// POST /api/bookings — holds the slot, then either returns a Stripe Checkout
// URL (when STRIPE_SECRET_KEY is configured) or, in demo mode, confirms
// immediately. A booking only becomes "confirmed" — and the confirmation
// email only sends — after payment succeeds.
export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    kind = "cleaning",
    start,
    durationHours,
    name,
    email,
    address,
    service,
    extras = [],
    total,
  } = body ?? {};

  if (!start || !name || !email || !address || !service || total == null) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const result = await createBooking({
    kind,
    start,
    durationHours: Number(durationHours) || 3,
    name,
    email,
    address,
    service,
    extras,
    total: Number(total),
    deposit: DEPOSIT,
  });
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 409 });
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (stripeKey) {
    // Stripe Checkout via REST (no SDK). The success redirect confirms the
    // booking; abandoning checkout releases the held slot via cancel_url.
    // PRODUCTION NOTE: add a checkout.session.completed webhook as the
    // authoritative confirmation once a public URL exists.
    const params = new URLSearchParams({
      mode: "payment",
      "line_items[0][price_data][currency]": "usd",
      "line_items[0][price_data][product_data][name]": `${service} — booking deposit`,
      "line_items[0][price_data][unit_amount]": String(DEPOSIT * 100),
      "line_items[0][quantity]": "1",
      customer_email: email,
      success_url: `${SITE_URL}/api/bookings/confirm?id=${result.id}`,
      cancel_url: `${SITE_URL}/api/bookings/cancel?id=${result.id}`,
      "metadata[bookingId]": result.id,
    });
    const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${stripeKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });
    if (!res.ok) {
      await releaseBooking(result.id);
      console.error("Stripe session failed:", await res.text());
      return NextResponse.json(
        { error: "Payment couldn't be started — the slot was not held. Please try again." },
        { status: 502 }
      );
    }
    const session = (await res.json()) as { url: string };
    return NextResponse.json({ bookingId: result.id, checkoutUrl: session.url });
  }

  // Demo mode (no Stripe key): confirm immediately so the flow is testable.
  const confirmed = await confirmBooking(result.id);
  if (confirmed) {
    await sendBookingConfirmation(email, confirmed, {
      deposit: DEPOSIT,
      total: Number(total),
    });
  }
  return NextResponse.json({ bookingId: result.id, confirmed: true });
}

// DELETE /api/bookings?id=... — release an unconfirmed hold.
export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (id) await releaseBooking(id);
  return NextResponse.json({ ok: true });
}

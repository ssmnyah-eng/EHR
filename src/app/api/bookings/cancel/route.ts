import { NextRequest, NextResponse } from "next/server";
import { releaseBooking } from "@/lib/bookingStore";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

// Stripe Checkout cancel redirect: payment did not go through, so the held
// slot is released, no confirmation is sent and the time opens back up.
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (id) await releaseBooking(id);
  return NextResponse.redirect(`${SITE_URL}/services/cleaning?cancelled=1`);
}

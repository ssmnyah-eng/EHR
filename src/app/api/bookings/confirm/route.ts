import { NextRequest, NextResponse } from "next/server";
import { confirmBooking } from "@/lib/bookingStore";
import { sendBookingConfirmation } from "@/lib/email";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

// Stripe Checkout success redirect lands here: payment went through, so the
// booking is finalized and the confirmation email goes out.
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (id) {
    const booking = await confirmBooking(id);
    if (booking) {
      await sendBookingConfirmation(booking.email, booking, {
        deposit: booking.deposit,
        total: booking.total,
      });
      return NextResponse.redirect(
        `${SITE_URL}/services/cleaning?confirmed=${booking.id}`
      );
    }
  }
  return NextResponse.redirect(`${SITE_URL}/services/cleaning`);
}

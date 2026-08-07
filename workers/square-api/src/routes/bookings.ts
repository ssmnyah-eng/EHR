import type { Env } from "../env";
import { jsonResponse, errorResponse } from "../cors";
import { createBooking, createCustomer, searchAvailability } from "../square";

interface BookingRequestBody {
  bookingId: string;
  startAt: string;
  appointmentMinutes: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  note?: string;
}

/**
 * POST /bookings/create
 *
 * Called after a deposit payment succeeds (naturally triggered from
 * /webhooks/square's payment-completed handler, or a follow-up step —
 * EHR should decide whether appointment creation is fully automatic on
 * payment, or a staff member confirms it first; that's a business
 * decision this endpoint doesn't make on its own).
 *
 * Re-searches availability for a narrow window around the requested
 * startAt to find which bookable team member Square would actually
 * assign, rather than trusting a slot the customer saw earlier — Square's
 * booking-creation call requires one specific team_member_id even though
 * the customer never sees or picks one (per the architecture doc).
 */
export async function handleBookingCreate(request: Request, env: Env): Promise<Response> {
  let body: BookingRequestBody;
  try {
    body = await request.json();
  } catch {
    return errorResponse(env, "Invalid JSON body");
  }

  if (!body.bookingId || !body.startAt || !body.appointmentMinutes || !body.email) {
    return errorResponse(env, "Missing required fields");
  }

  try {
    const windowStart = new Date(body.startAt);
    const windowEnd = new Date(windowStart.getTime() + 60_000);
    const availability = await searchAvailability(env, {
      startAt: windowStart.toISOString(),
      endAt: windowEnd.toISOString(),
      durationMinutes: body.appointmentMinutes,
    });
    const match = availability.availabilities.find((a) => a.start_at === windowStart.toISOString());
    if (!match) {
      return errorResponse(env, "That time is no longer available — please pick another.", 409);
    }
    const teamMemberId = match.appointment_segments[0]?.team_member_id;
    if (!teamMemberId) return errorResponse(env, "No bookable team member for that time.", 409);

    const customer = await createCustomer(env, {
      givenName: body.firstName,
      familyName: body.lastName,
      emailAddress: body.email,
      phoneNumber: body.phone,
    });

    const result = await createBooking(env, {
      startAt: body.startAt,
      durationMinutes: body.appointmentMinutes,
      customerId: customer.customer.id,
      teamMemberId,
      idempotencyKey: body.bookingId,
      note: body.note,
    });

    return jsonResponse(env, { squareBookingId: result.booking.id, status: result.booking.status });
  } catch (err) {
    console.error("Square booking creation failed", err);
    return errorResponse(env, "Could not create the appointment", 502);
  }
}

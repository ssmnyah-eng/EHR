import type { Env } from "../env";
import { jsonResponse, errorResponse } from "../cors";
import { searchAvailability } from "../square";

interface AvailabilityRequestBody {
  serviceDate: string;
  appointmentMinutes: number;
  zip: string;
}

/**
 * POST /availability
 *
 * Searches Square Bookings availability for the requested date, using the
 * appointment duration the frontend already computed (via
 * calculateDuration() — includes the specialty contingency and scheduling
 * buffer, rounded to the next 30-minute block). `zip` is accepted for a
 * future territory/location-routing rule but isn't used yet since EHR
 * currently books through a single configured location.
 */
export async function handleAvailability(request: Request, env: Env): Promise<Response> {
  let body: AvailabilityRequestBody;
  try {
    body = await request.json();
  } catch {
    return errorResponse(env, "Invalid JSON body");
  }

  if (!body.serviceDate || !body.appointmentMinutes) {
    return errorResponse(env, "Missing required fields");
  }

  const startAt = `${body.serviceDate}T00:00:00Z`;
  const endAt = `${body.serviceDate}T23:59:59Z`;

  try {
    const result = await searchAvailability(env, {
      startAt,
      endAt,
      durationMinutes: body.appointmentMinutes,
      // No teamMemberId — asks Square for availability across any
      // bookable team member, so staffing never becomes customer-facing.
    });
    const slots = result.availabilities.map((a) => ({
      startTime: a.start_at,
      endTime: new Date(new Date(a.start_at).getTime() + body.appointmentMinutes * 60_000).toISOString(),
    }));
    return jsonResponse(env, slots);
  } catch (err) {
    console.error("Square availability search failed", err);
    return errorResponse(env, "Could not look up availability", 502);
  }
}

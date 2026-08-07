import type { Env } from "./env";
import { corsHeaders, errorResponse } from "./cors";
import { handleCheckoutCreate } from "./routes/checkout";
import { handleAvailability } from "./routes/availability";
import { handleBookingCreate } from "./routes/bookings";
import { handleSquareWebhook } from "./routes/webhooks";

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders(env) });
    }

    if (request.method === "POST" && url.pathname === "/checkout/create") {
      return handleCheckoutCreate(request, env);
    }
    if (request.method === "POST" && url.pathname === "/availability") {
      return handleAvailability(request, env);
    }
    if (request.method === "POST" && url.pathname === "/bookings/create") {
      return handleBookingCreate(request, env);
    }
    if (request.method === "POST" && url.pathname === "/webhooks/square") {
      return handleSquareWebhook(request, env);
    }

    return errorResponse(env, "Not found", 404);
  },
};

export default worker;

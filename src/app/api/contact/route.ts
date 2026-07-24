import { NextRequest, NextResponse } from "next/server";
import { sendContactNotification } from "@/lib/email";

export const dynamic = "force-dynamic";

// Contact form + coming-soon launch-notify submissions.
// Routes to the private business inbox (CONTACT_INBOX), that address is
// backend-only and must never be rendered in the UI.
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  await sendContactNotification(body);
  return NextResponse.json({ ok: true });
}

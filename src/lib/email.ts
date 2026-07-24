// Transactional email via Resend's REST API (no SDK dependency, keeps the
// bundle light). Requires RESEND_API_KEY and EMAIL_FROM env vars; without
// them, sends are skipped and logged so the rest of the flow still works.

import { CONTACT_INBOX, PHONE, SITE_NAME, SITE_URL } from "./site";
import type { Booking } from "./bookingStore";

async function send(to: string, subject: string, html: string): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM ?? `${SITE_NAME} <onboarding@resend.dev>`;
  if (!key) {
    console.log(`[email skipped, RESEND_API_KEY not set] to=${to} subject=${subject}`);
    return;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to, subject, html }),
  });
  if (!res.ok) {
    console.error("Email send failed:", res.status, await res.text());
  }
}

export async function sendBookingConfirmation(
  customerEmail: string,
  booking: Booking,
  paymentSummary: { deposit: number; total: number }
): Promise<void> {
  const when = new Date(`${booking.date}T12:00:00`).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const remaining = paymentSummary.total - paymentSummary.deposit;
  const extras =
    booking.extras.length > 0
      ? `<p><strong>Extras:</strong> ${booking.extras.join(", ")}</p>`
      : "";

  const html = `
    <div style="font-family: Georgia, serif; color: #332E2A; max-width: 560px; margin: 0 auto;">
      <h1 style="font-weight: 500;">Thank you for welcoming us into your home.</h1>
      <p>We're so glad you chose ${SITE_NAME}, here's everything about your upcoming visit.</p>
      <div style="background: #F1F0EB; border-radius: 16px; padding: 24px; margin: 24px 0;">
        <p><strong>Service:</strong> ${booking.service}</p>
        <p><strong>Date:</strong> ${when}</p>
        <p><strong>Address:</strong> ${booking.address}</p>
        ${extras}
      </div>
      <div style="background: #F1F0EB; border-radius: 16px; padding: 24px; margin: 24px 0;">
        <p><strong>Charged today (deposit):</strong> $${paymentSummary.deposit}</p>
        <p><strong>Total:</strong> $${paymentSummary.total}</p>
        <p><strong>Remaining balance:</strong> $${remaining}, handled per our standard policy.</p>
      </div>
      <p>Want to stay stress-free before we arrive? Get more tips on keeping your home organized on
        <a href="${SITE_URL}/blog" style="color: #A85D42;">our blog</a>.</p>
      <p>Questions? Call us at ${PHONE}.</p>
      <p style="margin-top: 32px;">Warmly,<br/>The ${SITE_NAME} team</p>
    </div>`;

  await send(
    customerEmail,
    `Your ${SITE_NAME} booking is confirmed`,
    html
  );
}

export async function sendContactNotification(payload: {
  kind?: string;
  name?: string;
  phone?: string;
  address?: string;
  service?: string;
  subService?: string;
  message?: string;
  email?: string;
  page?: string;
}): Promise<void> {
  const rows = Object.entries(payload)
    .filter(([, v]) => v)
    .map(([k, v]) => `<p><strong>${k}:</strong> ${v}</p>`)
    .join("");
  await send(
    CONTACT_INBOX,
    payload.kind === "launch-notify"
      ? `Launch notification signup, ${payload.page}`
      : `New lead, ${payload.service ?? "General"} (${payload.name ?? "no name"})`,
    `<div style="font-family: sans-serif;">${rows}</div>`
  );
}

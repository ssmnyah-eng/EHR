# Square Integration Architecture

This document describes how the Cleaning booking wizard (`components/conversion/CleaningBookingWizard/`)
connects to Square. The backend platform is **approved: Cloudflare Workers**,
and the Worker is **scaffolded and typechecked at `workers/square-api/`** —
but **not deployed**. No Cloudflare account, Square account, or any
credentials exist in this project or the environment it was built in; the
owner still needs to run the deploy steps in `workers/square-api/README.md`
with their own accounts before any of this goes live. No Square credentials
should ever be added to frontend code or committed to this repo.

## Why a backend is required at all

The site is a **static export** deployed to GitHub Pages (`output: "export"`
in `next.config.ts`, gated behind `GITHUB_PAGES`). A static export has no
server: every file shipped is public, and any value baked into the client
bundle — including anything read from a build-time environment variable — is
visible to anyone who views source. That rules out ever putting
`SQUARE_ACCESS_TOKEN` (or any Square secret) into this repo's frontend code,
a `NEXT_PUBLIC_*` variable, or a GitHub Actions secret consumed at *build*
time for a static site — a static build has no request-time server to keep
it behind.

Square's own APIs also require this split. Creating a Bookings appointment
needs a `location_id`, a `service_variation_id` + version, and a bookable
`team_member_id` — none of which should be customer-facing, and all of which
require an authenticated Square API call that only a server can safely make
(the access token must accompany the call). Creating a payment or an ad-hoc
Checkout Link is the same story.

**Conclusion: this project does not currently have any backend, serverless
function, or server-side API route anywhere.** Confirmed by inspection: no
`/api` or `/functions` directory, no server actions, `output: "export"`
active for the GitHub Pages build, and `package.json` has no server
framework as a dependency. The GitHub Pages static site can and should stay
the frontend; a small new secure layer needs to be introduced purely to hold
the Square token and make the handful of calls below on the frontend's
behalf.

## Chosen backend: Cloudflare Workers (approved, scaffolded, not deployed)

Approved by EHR. The traffic here is a handful of calls per booking (one
price-recheck + checkout creation, an optional availability lookup, one
booking creation, one webhook delivery) — nowhere near what justifies an
always-on server, so a Worker (not Cloudflare Pages Functions, not a VM) is
the right shape. Free tier covers this volume many times over.

The Worker lives at **`workers/square-api/`** as its own small package
(own `package.json`, `wrangler.toml`, `tsconfig.json`) — deployed
separately from the Next.js/GitHub Pages site, sharing nothing with it at
build time except one public URL. It re-imports `lib/cleaning-pricing/`
directly via relative path (`../../../../lib/cleaning-pricing/engine`) so
the pricing/duration logic has exactly one source of truth — verified this
resolves correctly with `npx wrangler deploy --dry-run` (bundles clean,
18 KB gzipped, no missing-module errors).

**Not done, and outside what I have access to:** logging into a Cloudflare
account (`wrangler login`), setting the two secrets, filling in the real
Square IDs in `wrangler.toml`, and actually running `wrangler deploy`. Full
steps are in `workers/square-api/README.md`.

Once deployed, the frontend only needs one thing: the Worker's URL, set as
`NEXT_PUBLIC_BOOKING_API_BASE` in the GitHub Pages build (this value is
public and fine to expose — it's just a hostname, not a secret).
`lib/square-client.ts` already reads this variable and throws a catchable
`BookingApiNotConfiguredError` until it's set, so today's static site keeps
working (falling back to the existing Formspree intake) with no further
frontend changes required once the Worker is live.

## Endpoints (implemented in `workers/square-api/src/`)

### `POST /checkout/create` — `src/routes/checkout.ts`
Body: `{ bookingId, pricingInput, amountCents, customerEmail, customerName }`
(see `DepositCheckoutRequest` in `lib/square-client.ts` — `pricingInput` is
the full `CleaningPricingInput`, not just a headline number).

What it does, in order:
1. **Recomputes the price server-side** by calling `calculatePrice()` /
   `calculateDeposit()` from `lib/cleaning-pricing/engine.ts` directly
   (imported by relative path from the Worker) and treats that as
   authoritative. `amountCents` from the client is compared only for a
   mismatch warning — **the client-submitted number never sets the charge.**
2. Creates a Square **ad-hoc "Quick Pay" Checkout Link** for the
   server-computed `depositDue` cents. No Square catalog item is needed —
   it takes an amount directly, which is exactly what's needed since the
   deposit is `min(140, finalTotal)` and varies by booking.
3. Uses `bookingId` as the **idempotency key** on the Square API call so a
   retried/double-submitted request can't create two charges.
4. Returns `{ checkoutUrl, squareOrderId }`. The frontend redirects the
   customer to `checkoutUrl` to pay.

### `POST /availability` — `src/routes/availability.ts`
Body: `{ serviceDate, appointmentMinutes, zip }` (see `AvailabilityRequest`
in `lib/square-client.ts`).

Calls Square Bookings' availability search for `SQUARE_LOCATION_ID` /
`SQUARE_SERVICE_VARIATION_ID`, for a duration of `appointmentMinutes` (the
value the frontend already computed via `calculateDuration()` — includes
the specialty contingency and scheduling buffer, already rounded to the
next 30-minute block). No `team_member_id` is passed, so Square returns
availability across any bookable team member — the customer never sees or
picks one. `zip` is accepted for a future territory/multi-location rule but
unused today (EHR currently books through a single Square location).

### `POST /bookings/create` — `src/routes/bookings.ts`
Body: `{ bookingId, startAt, appointmentMinutes, firstName, lastName, email, phone, note? }`.

Re-searches availability for a narrow window around the requested `startAt`
to find which team member Square would actually assign (rather than
trusting a slot the customer saw earlier), creates/reuses the Square
customer, then creates the Bookings appointment. Returns 409 if the slot is
no longer available. **Not yet called from the wizard UI** — intentionally,
because whether appointment creation should be fully automatic on deposit
payment vs. require staff confirmation first is a business decision for
EHR, not one this build makes unilaterally. Natural call site is the
webhook handler below, once that decision is made.

### `POST /webhooks/square` — `src/routes/webhooks.ts`
Verifies Square's webhook signature (`x-square-hmacsha256-signature` header,
HMAC-SHA256 against `SQUARE_WEBHOOK_SIGNATURE_KEY`) before trusting
anything in the payload — an unverified POST here is never treated as a
real Square event. Currently verifies and logs only; there's no database
in this project to persist booking/payment state against, so marking a
deposit "paid" and/or auto-calling `/bookings/create` is a `TODO` in that
file pending EHR's decision above and a place to store that state.

## Required credentials, and exactly where each is entered

None of these exist in this project yet. When the backend platform above is
chosen, each is entered **only** into that platform's own secret/environment
store — never into this repository, never into a GitHub Actions secret
consumed by the static-export build, never into a `NEXT_PUBLIC_*` variable.

| Value | What it's for | Where it's entered |
|---|---|---|
| `SQUARE_ACCESS_TOKEN` | Authenticates every Square API call (Checkout, Bookings, Payments) | Backend platform's secret store only (e.g. `wrangler secret put SQUARE_ACCESS_TOKEN`) |
| `SQUARE_LOCATION_ID` | Which EHR Square location bookings/payments belong to | Backend platform's env/secret store |
| `SQUARE_ENVIRONMENT` | `sandbox` or `production` — selects Square's API base URL | Backend platform's env/secret store |
| `SQUARE_SERVICE_VARIATION_ID` | The Square Bookings service-variation ID appointments are created against | Backend platform's env/secret store |
| `SQUARE_WEBHOOK_SIGNATURE_KEY` | Verifies incoming Square webhook payloads are genuinely from Square | Backend platform's secret store |
| `NEXT_PUBLIC_BOOKING_API_BASE` | The only value the frontend needs — the backend's public base URL (not a secret) | GitHub Actions build-time env var for the GitHub Pages build |

The Square access token in particular should be a **restricted-scope**
token (Checkout + Bookings + Payments read/write only) generated from the
Square Developer Dashboard for the specific application backing this
integration — not the account owner's personal Square login.

## What needs to be configured in the Square Dashboard

1. Create/confirm the Square **Location** EHR bookings should be attached to
   (`SQUARE_LOCATION_ID`).
2. Create a **Bookable Service** and its **Service Variation** in Square's
   Appointments/Bookings setup — this is what `SQUARE_SERVICE_VARIATION_ID`
   refers to. Per your note, this is a Square-backend requirement only; it
   does not need to mirror the wizard's tier names customer-facing, and the
   website's own pricing engine remains authoritative for price — Square's
   catalog price on this service variation is not what's charged.
3. Add at least one **bookable team member** in Square (Square's Bookings
   API requires this to create an appointment). Per the spec, no
   team-management UI is being built and no fake employees are invented —
   this is purely a Square backend/scheduling requirement, configured by
   EHR directly in Square, invisible to the customer.
4. Create a Square **Application** in the Developer Dashboard to get API
   credentials, and generate the restricted-scope access token mentioned
   above.
5. Register a **webhook subscription** for payment/checkout events, pointed
   at the new `/webhooks/square` endpoint, and copy its signature key into
   `SQUARE_WEBHOOK_SIGNATURE_KEY`.
6. Start all of the above in **Square Sandbox** (a sandbox location/app can
   be created from the same Developer Dashboard) before ever touching
   production credentials.

## What could and couldn't be tested here

**Could not be tested at all in this environment:** anything involving a
real Square or Cloudflare account. There are no Cloudflare or Square
credentials available in this project or session — I have not created, do
not have access to, and would not fabricate any of it. This means the
Worker has never actually called Square, and has never been deployed. This
is a genuine blocker on end-to-end verification, not a task I skipped.

**What was verified instead, thoroughly:**
- The full pricing/duration engine — 27 hand-verified assertions, plus the
  updated whole-home price bands re-checked against `wholeHomeSizeBand()`'s
  boundaries.
- The wizard's price computation and display end-to-end (Playwright).
- `lib/square-client.ts`'s fallback behavior — confirmed the wizard
  correctly catches `BookingApiNotConfiguredError` today, since
  `NEXT_PUBLIC_BOOKING_API_BASE` is unset, and submits through the existing
  Formspree channel with honest, non-fake "a person will follow up" copy
  instead of a fake payment success.
- The Worker itself typechecks cleanly (`npx tsc --noEmit` in
  `workers/square-api/`) and **bundles successfully** via
  `npx wrangler deploy --dry-run` — confirming its relative imports into
  `lib/cleaning-pricing/` resolve correctly and the whole thing is
  syntactically/structurally sound. This is as far as it can be verified
  without a Cloudflare account to actually deploy it and a Square sandbox
  app to actually call.

## What's left before this goes live

1. `cd workers/square-api && npx wrangler login` (EHR's own Cloudflare
   account).
2. Complete the Square Dashboard setup above; fill the resulting IDs into
   `wrangler.toml`'s `[vars]`.
3. `npx wrangler secret put SQUARE_ACCESS_TOKEN` and
   `npx wrangler secret put SQUARE_WEBHOOK_SIGNATURE_KEY`.
4. `npx wrangler deploy` — note the printed Worker URL.
5. Set `NEXT_PUBLIC_BOOKING_API_BASE` to that URL as a GitHub Actions
   variable for the Pages build (not a secret — it's just a hostname), and
   set `ALLOWED_ORIGIN` in `wrangler.toml` to the real GitHub Pages origin
   instead of `"*"`.
6. Decide, and then wire up, whether `/bookings/create` fires automatically
   from the webhook handler on a completed deposit payment, or waits for
   staff confirmation.
7. Test the whole flow against **Square Sandbox** end to end before
   flipping `SQUARE_ENVIRONMENT` to `"production"`.

# Square Integration Architecture (design doc — not deployed)

This document describes how the Cleaning booking wizard (`components/conversion/CleaningBookingWizard/`)
should connect to Square once a secure backend exists. **Nothing described
here has been deployed or configured.** No Square credentials exist in this
project, and none should ever be added to frontend code or committed to the
repo.

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

## Recommended smallest secure layer (needs your sign-off before anything is created)

Recommendation: a small set of **serverless functions**, not a
always-on server. The traffic here is a handful of calls per booking
(one price-recheck + checkout creation, an optional availability lookup,
one booking creation, one webhook delivery) — nowhere near what justifies
running/maintaining a server. Reasonable options, roughly in order of "least
new infrastructure to learn/manage" for a project that has zero backend
today:

1. **Cloudflare Workers** (or Cloudflare Pages Functions) — free tier
   covers this volume many times over, secrets are stored via `wrangler
   secret put` (never in a repo file), deploys from a small separate
   directory/repo, and nothing about GitHub Pages needs to change.
2. **Vercel Serverless/Edge Functions** — same shape, if there's a
   preference for Vercel's dashboard/env-var UI over Wrangler.
3. **AWS Lambda + API Gateway** — more setup (IAM, API Gateway config) than
   the above two, worth it only if EHR already has AWS infrastructure to
   fold this into.

Cloudflare Workers is the specific recommendation, but **per your
instruction I have not selected or deployed a hosting/platform product** —
this needs your explicit go-ahead (and in particular, confirmation of budget
if a paid tier ever becomes necessary, though the free tier is expected to
be sufficient at EHR's booking volume).

Whatever platform is chosen, the frontend only needs one thing from it: a
base URL, set as `NEXT_PUBLIC_BOOKING_API_BASE` in the GitHub Pages build
(this value is public and fine to expose — it's just a hostname, not a
secret). `lib/square-client.ts` already reads this variable and throws a
catchable `BookingApiNotConfiguredError` until it's set, so today's static
site keeps working (falling back to the existing Formspree intake) with no
further frontend changes required once the backend exists.

## Endpoints the secure layer needs to implement

### `POST /checkout/create`
Body: `{ bookingId, amountCents, customerEmail, customerName }` (see
`DepositCheckoutRequest` in `lib/square-client.ts`).

Server-side, in order:
1. **Recompute the price server-side.** The full booking answers must be
   sent (not just a headline number) so the server can call
   `lib/cleaning-pricing/engine.ts`'s `calculatePrice()`/`calculateDeposit()`
   itself and treat that as authoritative. `amountCents` from the client is
   informational only — **never trust a client-submitted price.** If the
   server's recomputed deposit doesn't match, reject the request rather than
   charging the client-submitted number.
2. Create a Square **ad-hoc Checkout Link** (Square's Checkout API,
   "Quick Pay" / custom-amount flow) for the server-computed `depositDue`.
   This does **not** require a Square catalog item or fixed price — it takes
   an amount directly, which is exactly what's needed since the deposit is
   `min(140, finalTotal)` and varies by booking.
3. Use `bookingId` as an **idempotency key** on the Square API call (Square's
   Payments/Checkout APIs accept one) so a retried/double-submitted request
   can't create two charges.
4. Return `{ checkoutUrl, squareOrderId }`. The frontend redirects the
   customer to `checkoutUrl` to pay.

### `POST /availability`
Body: `{ serviceDate, appointmentMinutes, zip }` (see `AvailabilityRequest`).

Server-side: call Square Bookings' availability search using the
`location_id` and `service_variation_id` configured in Square Dashboard
(below), for a duration of `appointmentMinutes` (the value the frontend
already computed via `calculateDuration()` — includes the specialty
contingency and scheduling buffer, already rounded to the next 30-minute
block). Square's availability search also requires a `team_member_id` (or
"any available team member" segment filter) — this stays entirely
server-side; the customer never sees or picks a team member.

Return a list of bookable time slots. The frontend does not need to know
which/how many team members back any slot.

### `POST /bookings/create` *(not yet stubbed in `lib/square-client.ts` — add
when this layer is built)*
Body: the full booking record (customer details, chosen slot, `bookingId`,
Square order/payment identifier from the checkout step).

Server-side: create the Square Bookings appointment for the confirmed slot,
using the same `location_id` / `service_variation_id` / `team_member_id`
config as availability. Store the resulting Square booking ID alongside the
booking record described in the spec's data-retention list (customer
details, scope, condition answers, add-ons, specialty info, calculated
total/deposit/remaining balance, estimated cleaner-minutes, buffered
appointment duration, chosen time, Square identifiers).

### `POST /webhooks/square` *(not yet stubbed — add when this layer is
built)*
Square webhook receiver for payment/checkout completion events. Must verify
Square's webhook signature (`x-square-hmacsha256-signature` header against
the webhook signature key) before trusting any payload. On a verified
"payment completed" event, mark the booking's deposit as paid.

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

**Could not be tested at all in this environment:** anything involving
Square, sandbox or otherwise. There is no Square account, application, or
credentials available in this project or session — I have not created, do
not have access to, and would not fabricate any of it. This is a genuine
blocker on verifying the Square side end-to-end, not a task I skipped.

**What was tested instead, thoroughly:** everything on this project's side
of the boundary — the full pricing/duration engine (27 hand-verified
assertions), the wizard's price computation and display end-to-end, and
`lib/square-client.ts`'s fallback behavior (confirmed the wizard correctly
catches `BookingApiNotConfiguredError` today, since
`NEXT_PUBLIC_BOOKING_API_BASE` is unset, and submits through the existing
Formspree channel with honest, non-fake "a person will follow up" copy
instead of a fake payment success).

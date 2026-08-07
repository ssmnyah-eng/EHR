# EHR Square API (Cloudflare Worker)

Secure server-side layer for the Cleaning booking Square integration. Holds
the Square access token; the GitHub Pages frontend never does. See
`../../docs/square-integration.md` for the full architecture and Square
Dashboard setup steps this depends on.

**Nothing here has been deployed.** This is code, not a live service, until
someone with a Cloudflare account runs the steps below.

## Endpoints

- `POST /checkout/create` — recomputes price/deposit server-side from the
  submitted booking answers, creates a Square ad-hoc Checkout Link for the
  deposit.
- `POST /availability` — Square Bookings availability search for a given
  date + duration.
- `POST /bookings/create` — creates the Square Bookings appointment
  (typically called after a deposit payment succeeds).
- `POST /webhooks/square` — verified Square webhook receiver.

## First-time setup

```sh
cd workers/square-api
npm install
npx wrangler login          # opens a browser, authorizes against YOUR Cloudflare account
```

Fill in `wrangler.toml`'s `[vars]` (`SQUARE_LOCATION_ID`,
`SQUARE_SERVICE_VARIATION_ID`, `ALLOWED_ORIGIN`) once those exist in the
Square Dashboard — see `../../docs/square-integration.md`.

Set the two secrets (never put these in a file):

```sh
npx wrangler secret put SQUARE_ACCESS_TOKEN
npx wrangler secret put SQUARE_WEBHOOK_SIGNATURE_KEY
```

## Local development

```sh
npm run dev
```

Runs the Worker locally. Point the Next.js app's `NEXT_PUBLIC_BOOKING_API_BASE`
at the printed local URL to test the wizard against it.

## Deploy

```sh
npm run deploy
```

Prints the deployed Worker's URL — set that as `NEXT_PUBLIC_BOOKING_API_BASE`
in the GitHub Pages build's environment (a GitHub Actions repo/environment
variable, not a secret — this URL is public).

## Testing status

Nothing here has been exercised against a real Square account — no Square
credentials exist in this project or in the environment this was built in.
Start with `SQUARE_ENVIRONMENT = "sandbox"` in `wrangler.toml` and a Square
sandbox application/location before ever touching production credentials.

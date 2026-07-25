# Deploying to GitHub Pages

This repo now has a workflow (`.github/workflows/deploy-pages.yml`) that builds
a static export of the site and publishes it to GitHub Pages automatically on
every push to `claude/elevated-home-resets-brand-wwe2vy`.

## One-time manual step (only you can do this)

GitHub Pages has to be turned on for this repo before the workflow can deploy
anywhere:

1. Go to the repo on GitHub → **Settings** → **Pages**.
2. Under "Build and deployment", set **Source** to **GitHub Actions**.
3. That's it, no branch or folder to pick.

Once that's set, the next push (or re-running the workflow from the **Actions**
tab) will publish the site to:

```
https://ssmnyah-eng.github.io/EHR/
```

## What works on GitHub Pages vs. what doesn't

GitHub Pages only serves static files, it can't run this app's server code
(the booking calendar, Stripe checkout, and the contact-form email). The
static build handles this honestly rather than silently breaking:

- **All pages, design, pricing, and copy**: fully live and correct.
- **Cleaning quote calculator**: fully works (it's pure math, no server needed).
- **Calendar**: shows all eligible days as open (no live-availability check
  against real bookings, since there's no backend to check against).
- **Final booking/payment step**: instead of charging a deposit, shows a
  message directing the customer to call 540-356-3306.
- **Contact form**: instead of emailing your inbox, shows the same
  call-us message rather than falsely claiming the message was sent.

To get real online booking, real Stripe payments, and a real contact-form
inbox, this needs to run on a host that supports server code (Vercel,
Netlify, etc.) instead of, or alongside, GitHub Pages.

## Local commands

- `npm run build` — full dynamic app (what a Vercel/Netlify/Node host runs).
- `npm run build:pages` — static export for GitHub Pages, outputs to `out/`.

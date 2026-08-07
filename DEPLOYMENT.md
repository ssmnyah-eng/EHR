# Deploying to GitHub Pages

This is a Next.js 16 App Router site. GitHub Pages only serves static
files, so the deploy workflow at `.github/workflows/deploy-html.yml`
builds a static export (`next build` with `output: "export"`, triggered
by the `GITHUB_PAGES=true` env var) and publishes the generated `out/`
directory — not the source code — using GitHub's official Pages Actions
(`upload-pages-artifact` + `deploy-pages`).

The workflow runs on every push to `claude/elevated-home-resets-brand-wwe2vy`
or `main`.

## One-time manual steps (only you can do this)

1. Go to the repo on GitHub → **Settings** → **Pages**.
2. Under "Build and deployment", set **Source** to **GitHub Actions**
   (not "Deploy from a branch" — the workflow deploys directly, it no
   longer needs the `gh-pages` branch as an intermediate step).
3. Under "Custom domain", enter `elevatedhomeresets.com` and save. (The
   repo also ships a `public/CNAME` file with the same domain, which
   `next build` copies into every static export automatically — GitHub
   Pages picks it up from the deployed artifact either way, but setting
   it in the UI too is what makes GitHub provision the HTTPS certificate.)
4. At your domain registrar (Namecheap), point the domain at GitHub
   Pages — see "DNS records to add at Namecheap" below.

Once DNS has propagated, every push to the development branch will
publish the site to:

```
https://elevatedhomeresets.com
```

## DNS records to add at Namecheap

In Namecheap → Domain List → Manage → Advanced DNS, add:

| Type | Host | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | ssmnyah-eng.github.io. |

Remove any existing Namecheap "Parking Page" A/CNAME records for `@`
and `www` first — they conflict with the ones above. DNS propagation
can take anywhere from a few minutes to ~24 hours; GitHub shows the
domain as verified and issues an HTTPS certificate automatically once
it can see these records (Settings → Pages will show a green check).

## Base path

The site is served from the domain root (`elevatedhomeresets.com/`),
so `next.config.ts` sets no `basePath`/`assetPrefix`. (If this ever
moves back to an unbranded GitHub Pages project-site URL —
`https://<owner>.github.io/<repo>/` — a basePath would need to be
reintroduced; see the comment in `next.config.ts`.)

## Known static-export limitation

`/resources/[slug]` is a dynamic detail route with no published entries
yet (its content array is intentionally empty). `output: "export"`
requires at least one static param per dynamic route, since there's no
server to resolve unknown slugs at request time. The workflow excludes
just this one route folder from its own checkout before building (never
touched in the committed source) — remove that step once real resource
content ships and the route generates real params again.
`/transformations/[slug]` has real published projects and is no longer
excluded.

## What works on GitHub Pages

GitHub Pages only serves static files — there's no server to run code.
Forms (contact form, booking forms, the Organization quote wizard)
submit directly to Formspree client-side, which emails the submissions
to your inbox, so this all works without a backend. Any code that
previously depended on reading a page's `searchParams` on the server
(the `?service=`/`?space=` tier-preselect links) now reads them
client-side via `useSearchParams()` instead, since static export has no
server to resolve them at request time — same result, different source.

## Local commands

```bash
npm run lint
npm run build       # standard build — unaffected by GitHub Pages config
GITHUB_PAGES=true npm run build   # static export, same as CI, outputs to out/
```

# Deploying to GitHub Pages

This is a Next.js 16 App Router site. GitHub Pages only serves static
files, so the deploy workflow at `.github/workflows/deploy-html.yml`
builds a static export (`next build` with `output: "export"`, triggered
by the `GITHUB_PAGES=true` env var) and publishes the generated `out/`
directory — not the source code — using GitHub's official Pages Actions
(`upload-pages-artifact` + `deploy-pages`).

The workflow runs on every push to `claude/elevated-home-resets-brand-wwe2vy`
or `main`.

## One-time manual step (only you can do this)

1. Go to the repo on GitHub → **Settings** → **Pages**.
2. Under "Build and deployment", set **Source** to **GitHub Actions**
   (not "Deploy from a branch" — the workflow deploys directly, it no
   longer needs the `gh-pages` branch as an intermediate step).
3. Save.

Once that's set, every push to the development branch will publish the
site to:

```
https://ssmnyah-eng.github.io/EHR/
```

## Base path

GitHub Pages serves a project site (one not using a custom domain) from
`/EHR/`, not the domain root. `next.config.ts` sets `basePath`/`assetPrefix`
to `/EHR` only when `GITHUB_PAGES=true` is set, so local `npm run dev` /
`npm run build` are unaffected — only the CI build targets the `/EHR/` path.

## Known static-export limitation

`/resources/[slug]` and `/transformations/[slug]` are dynamic detail
routes with no published entries yet (their content arrays are
intentionally empty). `output: "export"` requires at least one static
param per dynamic route, since there's no server to resolve unknown
slugs at request time. The workflow excludes these two route folders
from its own checkout before building (never touched in the committed
source) — remove that step once real resource/transformation content
ships and these routes generate real params again.

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

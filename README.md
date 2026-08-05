# Elevated Home Resets — Website

A Next.js 16 (App Router) + TypeScript site, styled with CSS Modules.

## Structure

- `app/` — routes (App Router: one `page.tsx` per route, `layout.tsx` for
  shared chrome)
- `components/` — presentational components, organized by role (layout,
  content, conversion forms, navigation, typography, media)
- `content/` — all copy and structured content data, imported by pages/
  components as typed `ContentSlot`/`FAQSection`/etc. objects
- `lib/` — shared types and config (`lib/types.ts`, `lib/config.ts`)

## Local commands

```bash
npm install
npm run dev      # local dev server
npm run lint
npm run build     # production build
npm run start     # serve the production build
```

## Deployment

See `DEPLOYMENT.md` — the site is published to GitHub Pages as a static
export.

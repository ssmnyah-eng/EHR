# Deploying to GitHub Pages

This is a static HTML/CSS/JS site — no build step. The workflow at
`.github/workflows/deploy-html.yml` copies the site files straight to the
`gh-pages` branch on every push to `claude/elevated-home-resets-brand-wwe2vy`
or `main`.

## One-time manual step (only you can do this)

1. Go to the repo on GitHub → **Settings** → **Pages**.
2. Under "Build and deployment", set **Source** to **Deploy from a branch**.
3. Set **Branch** to `gh-pages` and folder to **/ (root)**.
4. Click **Save**.

Once that's set, every push to the development branch will publish the
site to:

```
https://ssmnyah-eng.github.io/EHR/
```

## What works on GitHub Pages

GitHub Pages only serves static files — there's no server to run code.
Forms (contact form, booking forms) submit directly to Formspree, which
emails the submissions to your inbox, so this all works without a backend.

## Local commands

None needed. Edit the HTML files directly and push — the workflow handles
the rest.

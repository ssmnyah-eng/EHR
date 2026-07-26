# Elevated Home Resets — Website

A plain HTML/CSS/JavaScript website. No build step, no framework, no
Node.js required — just static files.

## Structure

- `index.html` — homepage
- `about/`, `contact/`, `privacy/`, `terms/` — static pages
- `services/` — services index plus one folder per service
  (`cleaning/`, `organizing/`, `move-concierge/`, `specialty/`)
- `styles.css` — all site styling
- `script.js` — shared JavaScript (reveal animations, mobile menu, etc.)
- `apps-script.gs` — optional Google Apps Script backend (forms/bookings)

## Editing

Open any `index.html` file directly in an editor and change the HTML.
There's nothing to install and nothing to compile — save the file and
it's ready to deploy.

## Local preview

Open `index.html` directly in a browser, or serve the folder with any
static file server, e.g.:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deployment

See `DEPLOYMENT.md`.

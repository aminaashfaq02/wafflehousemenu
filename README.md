# Waffle House Menu Guide (static site)

Plain HTML/CSS/JS site deployed as static files on Vercel. There is no server code in production.

## Layout
- `*.html` and `<dir>/index.html`: pages. Clean URLs (`/menu`, `/blog/`) are provided by `cleanUrls` in `vercel.json`.
- `404.html`: served for unknown URLs (real 404 status).
- `assets/css/*.css`: compiled Tailwind CSS, one file per page group (see `tools/groups.json`). Do not edit by hand.
- `vercel.json`: redirects (legacy catering URLs -> `/waffle-house-catering/#...`), security headers, CSP.
- `scripts/dev-server.js`: local server that reads `vercel.json`, so local behaviour matches production. Not deployed.

## Commands
```bash
npm install          # once
npm start            # http://localhost:3000
npm run build:css    # rebuild assets/css after adding/changing Tailwind classes or a page's theme (tools/tailwind/*.config.js)
```

## Conventions
- Canonical domain: `https://www.wafflehouse-menu.com` (apex redirects to www). It appears in canonical/OG tags, JSON-LD, `sitemap.xml` and `robots.txt`.
- Each page must have one `<h1>`, a canonical URL, a title of at most 60 characters and a description of at most 160 characters.
- Add new pages to `sitemap.xml` and to the matching group in `tools/groups.json` (then run `npm run build:css`).
- Internal links should point to the final URL (not to a redirecting one).

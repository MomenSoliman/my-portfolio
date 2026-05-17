# Moamen Soliman — Portfolio

> ⚠️ **IMPORTANT** — keep `index.html`, `data.json`, and the `assets/` folder together at all times. They reference each other by relative path.

## Structure

```
portfolio/
├── index.html              ← rendering engine (HTML + CSS + JS)
├── data.json               ← all content: projects, skills, links, etc.
├── README.md               ← this file
└── assets/
    ├── logo.png            ← your MS logo (nav + favicon)
    ├── profile.png         ← your hero photo
    └── projects/
        ├── sales/          ← Project 1 — single dashboard image
        ├── sql-cleaning/   ← Project 2 — 8 portrait slides
        └── mexico-report/  ← Project 3 — 11 landscape report slides
```

## How to run locally

`index.html` loads content from `data.json` via `fetch()`. Most modern browsers (Chrome, Edge) **block local `fetch()` from `file://` URLs**, so opening `index.html` by double-clicking may show a "data.json missing" error. The fix is to serve the folder from a tiny local web server:

```bash
cd portfolio
python3 -m http.server 8000
# then visit http://localhost:8000
```

If you don't have Python, any of these work too:
- `npx serve` (if you have Node.js)
- VS Code's "Live Server" extension — right-click `index.html` → Open with Live Server
- Firefox sometimes allows `file://` fetch — try opening directly there

## How to deploy

Drop the entire `portfolio/` folder onto any static host. Once deployed everything works without a local server.

- **GitHub Pages** — push to a repo, enable Pages on the `main` branch
- **Netlify** — drag the folder onto netlify.com/drop
- **Vercel** — `vercel deploy` from the folder
- **Cloudflare Pages** — connect to a GitHub repo

## How each project visual works

The `visualMode` field in `data.json` controls how each project's media is displayed:

| Mode | Used by | Behavior |
|---|---|---|
| `single-landscape` | Sales | One image, no carousel, full image visible |
| `carousel-portrait` | SQL Cleaning | Portrait aspect carousel, slimmer column |
| `carousel-landscape` | Mexico Toys | Standard 16:9 carousel for report slides |

To swap a project's visual mode, edit the `visualMode` field in `data.json`. To swap the images, replace files in the corresponding `assets/projects/<folder>/` and update the `media` array.

## What's already wired up

| Item | Status |
|---|---|
| Hero photo | ✓ Your photo |
| Logo in nav | ✓ Your MS logo, masked with cyan→blue gradient |
| Resume button | ✓ Linked to your Google Drive |
| GitHub social icon | ✓ `github.com/MomenSoliman` |
| LinkedIn social icon | ✓ Your LinkedIn URL |
| Facebook social icon | ⚠️ Placeholder `#` — add your URL in `data.json` |
| Project 1 (Sales) | ✓ Single dashboard image |
| Project 2 (SQL) | ✓ 8 portrait slides carousel |
| Project 3 (Mexico) | ✓ 11 report slides carousel |
| Experience, Education, Certs | ✓ From your LinkedIn resume |
| Skills (4 categories) | ✓ Icons rendered via inline SVG or Simple Icons CDN |

## To finish

1. **Add your Facebook URL** — open `data.json`, find `"facebook": "#"`, replace `#` with your URL.

## Design notes

- **Theme:** Deep navy (`#04071a` → `#141d44`) with electric-cyan accent (`#00d4ff`) and royal-blue secondary (`#4d8fff`).
- **Type:** *Bricolage Grotesque* (display) + *Plus Jakarta Sans* (body) + *JetBrains Mono* (data/code). Fonts load from Google Fonts.
- **Animations:** subtle scroll-reveal via IntersectionObserver, hero fade-up cascade, floating data cards, auto-rotating carousels (pause on hover).
- **Responsive:** breaks at 980px (single column) and 560px (mobile tweaks).

## Customizing colors

All colors live as CSS variables at the top of the `<style>` block in `index.html` (search for `:root{`). Change `--cyan` and `--blue` to retheme the whole site.

---

Built once, owned forever. No frameworks to update, no build chain to break.

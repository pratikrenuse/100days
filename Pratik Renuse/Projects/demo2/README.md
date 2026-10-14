# Pratik Renuse — Portfolio

A single-page personal portfolio site. Pure HTML, CSS, and JavaScript — no build step, no frameworks.

## What's inside

```
demo2/
├── index4/           ← Portfolio + game in ONE single file (index2 page with index3's game as the final "Play" section).
│   └── index.html
├── index3/           ← "The 0 → 1 Path" — a click-through career RPG.
│   ├── index.html
│   ├── style.css
│   └── script.js
├── index2/           ← Calm, illustration-led redesign.
│   ├── index.html
│   ├── style.css
│   └── script.js
├── portfolio/        ← Version 1. Bolder editorial design with animated stats.
│   ├── index.html
│   ├── style.css
│   └── script.js
├── simple/           ← Lightweight single-file version of v1.
│   └── index.html
└── README.md
```

Five versions are included:

- **`index4/`** — **everything in one single file.** This is the calm index2 portfolio as a scrolling page, with index3's career game embedded as the final **"Play"** section (reachable via the "Play" link in the nav). CSS and JS are all inlined into the one `index.html` — no other files. The game lives inside a self-contained console panel: press "Begin the path," make a growth-strategy call at each venture, level up, and reach 2026. This is the recommended one to deploy.
- **`index3/`** — a click-through version of the same career RPG: travel a timeline from 2016 to today and "grow each startup from zero" by choosing at every venture. Best choices (what you actually did) earn the most XP, level up four skills (Growth · Brand · Story · Grit), and unlock a real achievement badge.
- **`index2/`** — the calm editorial design: minimalist and quiet, with a muted sage/warm-paper palette, a light elegant serif (Cormorant / EB Garamond), lots of whitespace, hand-drawn inline SVG illustrations, and far less text. Your 0→1 journey told as a visual "path." All illustrations are inline SVG, so there are no image files to manage. This is the one to deploy if you prefer the calmer look.
- **`portfolio/`** — version 1: a bolder editorial layout with hero, animated counting stats, an experience timeline, speaking, investments, and contact.
- **`simple/`** — a stripped-down, single-file version of v1 (one `index.html`, everything inline). Loads instantly, easy to tweak by hand.

## Preview locally

Just open either `index.html` in your browser. Or run a tiny local server:

```bash
cd portfolio
python3 -m http.server 8000
# visit http://localhost:8000
```

## Deploy to Vercel

You don't need a config file — Vercel serves a static `index.html` automatically. Pick one method.

### Option A — Vercel CLI (fastest)

```bash
npm i -g vercel        # one-time install
cd index2              # or: cd portfolio  /  cd simple
vercel                 # follow prompts → preview URL
vercel --prod          # promote to production
```

### Option B — Vercel dashboard (no terminal)

1. Push this folder to a GitHub repo (or drag-and-drop on vercel.com).
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. **Root Directory:** set to `index2` (or `portfolio` / `simple`).
4. Framework Preset: **Other**. Leave build & output settings empty.
5. Click **Deploy**. Done in seconds.

> Tip: To deploy only one version, point the Root Directory at that folder. To deploy the whole repo at once, you can move the files of your preferred version to the repo root.

## Connect your custom domain (pratikrenuse.com)

In the Vercel project → **Settings → Domains** → add `pratikrenuse.com`, then update the DNS records at your registrar as Vercel instructs.

## Editing

- Text & links: edit `index.html`.
- Colors & layout: the `:root` variables at the top of `style.css` (main) or the `<style>` block (simple). Change `--accent` to swap the accent color.
- Stats animate via `script.js` — edit the numbers in `data-target` on each `.stat-num` in `index.html`.

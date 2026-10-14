# CLAUDE.md — 100 Days of Building

This file is standing context for Claude Code and Claude Cowork. Read it fully before building, editing, or auditing anything in this repo. It is the single source of truth for the project, the brand, the stack, and the design system.

---

## 1. Who and what this is

- **Builder:** Pratik Renuse, based in Pune, India.
- **Site:** pratikrenuse.com
- **Project:** **100 Days of Building** — one software product shipped every day for 100 days, hosted at `pratikrenuse.com/100days/`. Each product is a subfolder under `/100days/`.
- **Audience:** Every upcoming product is **marketer-focused**. The primary niche is marketers, and each product should solve a real marketer pain point. Frame copy, features, and examples for that audience by default.

### Scope boundary (do not cross)
- This repo builds **only** the 100-day products.
- **Never touch the main site:** `index.html`, `hero.jpg`, `about.jpg` at the root.

### Delivery rule
- When delivering a build, **make all edits in the files and hand over final, ready-to-deploy files.** Do not ask Pratik to edit code himself (especially `index.html`). He should not have to touch the code.

---

## 2. Deploy process

GitHub repo → GitHub Desktop commit/push → Vercel auto-deploys. That is the whole loop.

## 3. Stack

- **Hosting:** Vercel (static HTML + `/api/` serverless functions)
- **Database:** Supabase
- **Domain:** pratikrenuse.com

### Supabase
- **URL:** `https://naqkunidxjpgwanfbbiu.supabase.co`
- **Anon key (public, client-side):**
  `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5hcWt1bmlkeGpwZ3dhbmZiYml1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5Mjg1ODEsImV4cCI6MjA5NDUwNDU4MX0.zEypDQmNQGyCcFCjeLMP_Wgbdr3HJJxHXUhqHlMEl9I`
- **Service key:** stored in Vercel env var `SUPABASE_SERVICE_KEY` (never hardcode it in client files).
- **`subscribers` table columns:** `email`, `name`, `phone`, `source`, `created_at`

### Vercel env vars (already set)
- `SUPABASE_URL`
- `SUPABASE_SERVICE_KEY`
- `ANTHROPIC_API_KEY`
- `JENSEN_REFRESH_KEY`

### Serverless function file-location rule (important)
- **ALL serverless functions live in `/api/` at the repo root**, not nested inside `/100days/day-XX/api/`. Vercel only auto-discovers functions in the root `/api/` folder.
- Each function gets a **unique filename** (e.g. `tracker.js`, `pricing.js`, `reframe.js`) since they share the root `/api/` namespace.
- Client pages call `fetch('/api/<name>')`, which resolves to the root.
- **Day 01 is the reference implementation** for this pattern.

---

## 4. Design system — NEVER CHANGE

### Fonts (always include this link tag in `<head>`)
```html
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:wght@300;400;500&family=IBM+Plex+Sans:wght@300;400;500&display=swap" rel="stylesheet">
```

### CSS variables (use these exactly)
```css
:root {
  --bg:       #F6F2F1;
  --surface:  #EEE8E4;
  --raised:   #E5DDD7;
  --border:   #D0C8C0;
  --border2:  #BCB3AA;
  --ink:      #1A1512;
  --ink2:     #38302A;
  --ink3:     #504840;
  --ink4:     #786E66;
  --gold:     #8C6A18;
  --gold-mid: #B8903A;
  --gold-bg:  #F0E4C4;
  --dark:     #0F0E0C;
  --serif:    'IBM Plex Serif', Georgia, serif;
  --sans:     'IBM Plex Sans', system-ui, sans-serif;
  font-size:  18px;
}
body {
  background: var(--bg);
  color: var(--ink2);
  font-family: var(--sans);
  font-weight: 400;
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}
p { max-width: 65ch; margin: 0 0 1.15rem; }
```

### Brand rules
- Always use the cream background (`--bg: #F6F2F1`). **Never use dark backgrounds on project pages** (dark sections exist only as an occasional pattern, not as page backgrounds).
- Headings: serif, weight 300 (weight 300 only on headings 32px+).
- Body: sans, weight 400.
- **No em dashes anywhere.** Use commas, colons, or full stops.
- Section labels: 0.65rem, letter-spacing 0.2em, uppercase, gold, preceded by a short gold line.
- All buttons: uppercase, letter-spacing 0.15em, sans weight 400-500.

---

## 5. Readability rules (readable-web) — mandatory, applied before writing any CSS

Readability is a recurring failure mode: pages look polished but text is hard to read. These are hard limits, not suggestions. Override any project default that conflicts with them on prose blocks.

- Body text: **minimum 18px, weight 400+.** Weight 300 only on headings 32px+.
- All prose blocks: `max-width: 65ch` (or `38rem` for hero leads).
- Line-height: **1.65 for body**, 1.15-1.3 for headings.
- Dark-section body text: **minimum `#C8C0B8`.** `#A89E94` is metadata only. Use weight 300 only for headings 32px+ on dark.
- Letter-spacing 0 on paragraphs. Tracking only on small uppercase labels (under 14px).
- Card padding: minimum 2rem all sides.
- Mobile: never below 16px body text.

---

## 6. C.L.E.A.R. UI framework — apply before shipping any page

Walk all five pillars in order, score each 0-5 (25 total), fix the lowest first, then re-check the earlier pillars (it is a loop). Full detail lives in `CLEAR_UI_Reference.md` in this repo.

- **C — Copywriting.** Make the benefit obvious in 1-2 seconds (WIIFM). Cut any sentence that breaks nothing if removed (Barstool Test). Every button is verb + object ("Send invoice", "Download report"), never "Submit", "Click here", "Learn more", "OK", "Continue", "Next". Apply the **Copy Swap Test**: if another company could use the same words, it is generic and must be rewritten. No repetition between adjacent sections.
- **L — Layout.** 6 Gestalt rules (Similarity, Proximity, Simplicity, Alignment, Common Region, Continuity). Commit to a **4px grid** and align edges. Tight spacing within groups, loose between. Subtle background tints beat hairline borders. Start with too much padding and pull back.
- **E — Emphasis.** Six dials: Size, Color, Space, Placement, Visualization, Motion. Lead with 1-2, let the rest support. **Squint Test:** blur the page and ONE element must dominate. Highlights in body must be rare and earned, not on every key phrase.
- **A — Accessibility.** Visible without searching (primary action above the fold), operable without precision (44px+ touch targets, 8px+ spacing, Fitt's Law), actionable without guessing (labels say what happens). **4.5:1 text contrast minimum**, never color alone, prevent errors (disable invalid, allow undo, confirm irreversible).
- **R — Reward.** Deliver an emotional outcome matched to the moment: **Control** (safety, certainty, undo), **Competence** (progress, "done" states, streaks), or **Recognition** (badges, roles, reactions). Never silent successes. Be specific ("Saved. Live in 30 seconds", not "Saved").

**Copy guardrails:** no hype, no emojis, no em dashes. Direct and clear.

**Each page needs:** one unmissable primary action, benefit-led copy, Gestalt grouping, accessible contrast and tap targets, and a fitting emotional payoff.

---

## 7. Analytics — mandatory on every page

Paste this in every `<head>`, no exceptions:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-K5BP5TE71L"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-K5BP5TE71L');</script>
<script>(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","wtfjq58y0n");</script>
```

---

## 8. Nav — same on every project page

```html
<nav>
  <div class="nav-left">
    <a href="/" class="nav-logo">Pratik <span>Renuse</span></a>
    <span class="nav-div">/</span>
    <span class="nav-title">PROJECT NAME</span>
    <span class="nav-badge">Day XX</span>
  </div>
  <a href="/100days/" class="nav-back">All projects</a>
</nav>
```
```css
nav { display:flex; align-items:center; justify-content:space-between; padding:1.1rem 4rem; border-bottom:1px solid var(--border); background:rgba(246,242,241,0.95); backdrop-filter:blur(20px); position:sticky; top:0; z-index:100; }
.nav-logo { font-family:var(--serif); font-size:0.9rem; font-weight:400; color:var(--ink); text-decoration:none; }
.nav-logo span { color:var(--gold); }
.nav-left { display:flex; align-items:center; gap:1.25rem; }
.nav-div { color:var(--border); }
.nav-title { font-size:0.78rem; color:var(--ink3); }
.nav-badge { font-size:0.58rem; letter-spacing:0.12em; text-transform:uppercase; color:var(--gold); background:var(--gold-bg); padding:0.2rem 0.6rem; border:1px solid #D4B870; }
.nav-back { font-size:0.65rem; letter-spacing:0.14em; text-transform:uppercase; color:var(--ink4); text-decoration:none; transition:color 0.2s; display:flex; align-items:center; gap:0.4rem; }
.nav-back:hover { color:var(--gold); }
.nav-back::before { content:'←'; }
```

---

## 9. Email signup strip — add before footer on every page

```html
<div class="signup-strip">
  <div class="signup-strip-text">
    <strong>A new product ships tomorrow</strong>
    Get each one delivered to your inbox the day it launches.
  </div>
  <div>
    <div id="proj-form-wrap">
      <div class="signup-strip-form">
        <input type="email" id="proj-email" placeholder="Your email address">
        <button onclick="projSignup()">Follow along</button>
      </div>
    </div>
    <div class="signup-ok" id="proj-ok">You are in. See you tomorrow.</div>
  </div>
</div>
```
```css
.signup-strip { background:var(--surface); border-top:1px solid var(--border); padding:2rem 4rem; display:flex; align-items:center; justify-content:space-between; gap:2rem; }
.signup-strip-text { font-size:0.88rem; color:var(--ink3); }
.signup-strip-text strong { color:var(--ink); font-weight:500; display:block; margin-bottom:0.2rem; font-family:var(--serif); font-size:1rem; }
.signup-strip-form { display:flex; }
.signup-strip-form input { background:var(--bg); border:1px solid var(--border); border-right:none; padding:0.7rem 1rem; font-size:0.85rem; color:var(--ink); font-family:var(--sans); font-weight:300; outline:none; width:220px; }
.signup-strip-form input:focus { border-color:var(--gold); }
.signup-strip-form input::placeholder { color:var(--ink4); }
.signup-strip-form button { background:var(--ink); color:var(--bg); border:none; padding:0.7rem 1.2rem; font-size:0.65rem; letter-spacing:0.14em; text-transform:uppercase; font-family:var(--sans); cursor:pointer; }
.signup-strip-form button:hover { background:var(--gold); }
.signup-ok { font-size:0.82rem; color:var(--gold); display:none; padding:0.7rem 0; font-family:var(--serif); }
@media(max-width:768px){ .signup-strip{flex-direction:column;align-items:flex-start;padding:2rem 1.25rem;} .signup-strip-form{flex-direction:column;width:100%;} .signup-strip-form input{width:100%;border-right:1px solid var(--border);border-bottom:none;} .signup-strip-form button{width:100%;} }
```
```javascript
const SUPA_URL = 'https://naqkunidxjpgwanfbbiu.supabase.co';
const SUPA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5hcWt1bmlkeGpwZ3dhbmZiYml1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5Mjg1ODEsImV4cCI6MjA5NDUwNDU4MX0.zEypDQmNQGyCcFCjeLMP_Wgbdr3HJJxHXUhqHlMEl9I';
async function projSignup() {
  const email = document.getElementById('proj-email').value;
  if (!email || !email.includes('@')) return;
  const btn = document.querySelector('.signup-strip-form button');
  btn.textContent = 'Sending…'; btn.disabled = true;
  try {
    const res = await fetch(SUPA_URL + '/rest/v1/subscribers', {
      method: 'POST',
      headers: { apikey: SUPA_KEY, Authorization: 'Bearer ' + SUPA_KEY, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
      body: JSON.stringify({ email, source: 'day-XX-PROJECTNAME' })
    });
    if (res.status === 201 || res.status === 409) {
      document.getElementById('proj-form-wrap').style.display = 'none';
      document.getElementById('proj-ok').style.display = 'block';
    } else { btn.textContent = 'Try again'; btn.disabled = false; }
  } catch { btn.textContent = 'Try again'; btn.disabled = false; }
}
```
Change `day-XX-PROJECTNAME` in the `source` field to match the actual project.

---

## 10. Footer — same on every project page

```html
<footer>
  <span>Day XX of 100 · Built by Pratik Renuse</span>
  <a href="/100days/">← All projects</a>
</footer>
```
```css
footer { padding:1.1rem 4rem; border-top:1px solid var(--border); display:flex; justify-content:space-between; font-size:0.62rem; letter-spacing:0.1em; text-transform:uppercase; color:var(--ink4); background:var(--surface); }
footer a { color:var(--ink4); text-decoration:none; }
footer a:hover { color:var(--gold); }
@media(max-width:768px){ footer{flex-direction:column;gap:0.5rem;text-align:center;padding:1rem;} }
```

---

## 11. Mobile — always include

```css
@media (max-width: 960px) {
  :root { font-size: 17px; }
  nav { padding: 1rem 1.25rem; }
  /* stack grids to 1 column, reduce section padding to 2.5rem 1.25rem */
}
@media (max-width: 480px) {
  :root { font-size: 16px; }
  /* further reductions if needed */
}
```

---

## 12. Gallery update — after each new project

In `100days/index.html`, replace the next "Coming soon" card with:
```html
<a href="day-XX-project-name/" class="project-card">
  <div class="card-day">Day XX</div>
  <div class="card-title">Project Title</div>
  <div class="card-desc">One sentence description.</div>
  <div class="card-tag">Live</div>
  <div class="card-arrow">↗</div>
</a>
```
Also update the three header stats: days complete, projects live, days remaining.

---

## 13. Daily build prompt

```
Day [XX] of 100 Days of Building.
Product idea: [DESCRIBE IN 1-2 SENTENCES]
Build a complete production-ready index.html. Follow all design system rules in CLAUDE.md.
Include analytics, nav, email signup strip, footer. If a backend is needed, also write
/api/[name].js as a Vercel serverless function at the repo root. Mobile responsive.
Deliver final files, no explanations.
```

---

## 14. Companion files in this repo

- `design-reference.html` — live visual reference for nav, section labels, headings, buttons, card grids, quotes, dark sections, and footer. Open it to see the patterns rendered.
- `CLEAR_UI_Reference.md` — full C.L.E.A.R. framework reference for scoring and auditing pages.

## 15. Pre-ship checklist

- [ ] Analytics snippet in `<head>`
- [ ] Standard nav with correct project name and Day XX badge
- [ ] Cream background, IBM Plex fonts loaded
- [ ] CSS variables used exactly, no off-palette colors
- [ ] No em dashes anywhere
- [ ] Body text 18px+ weight 400+, prose max-width 65ch, line-height 1.65
- [ ] One unmissable primary action per section (Squint Test passes)
- [ ] Buttons are verb + object, pass the Copy Swap Test
- [ ] 4.5:1 contrast, 44px+ tap targets
- [ ] Every action has a specific confirmation (no silent success)
- [ ] Email signup strip before footer, `source` field set to this project
- [ ] Standard footer with correct Day XX
- [ ] Mobile breakpoints at 960px and 480px
- [ ] Any backend lives in root `/api/<unique-name>.js`
- [ ] Gallery card and header stats updated in `100days/index.html`
- [ ] Files delivered final and ready, nothing left for Pratik to edit

# 🔥 Roast My Landing Page

Paste a landing page URL → Hermes browses it live → returns a savage-but-surgical, scored teardown with a downloadable share card.

**Stack:** static `index.html` + a Cloudflare Pages Function (`/api/roast`) that calls the Hermes brain (`hermes-agent`, DeepSeek default = cheap). No other backend for v1.

## Local structure

```
roast-my-landing-page/
├── index.html              # the whole frontend (UI + canvas share card)
├── functions/
│   └── api/
│       └── roast.js        # Cloudflare Pages Function: POST /api/roast
└── README.md
```

Cloudflare Pages auto-maps `functions/api/roast.js` → the route `/api/roast`. The frontend calls `/api/roast` same-origin, so no CORS config needed in prod.

## Deploy to Cloudflare Pages

1. Push this repo to GitHub (already at github.com/pratikrenuse/100days).
2. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git** → pick the `100days` repo.
3. Build settings:
   - **Framework preset:** None
   - **Build command:** _(leave empty)_
   - **Build output directory:** `roast-my-landing-page`
   - **Root directory:** `roast-my-landing-page` (so the `functions/` folder is detected)
4. **Environment variables** (Settings → Environment variables → Production **and** Preview):
   - `HERMES_API_URL` = `https://hermes.pratikrenuse.com/v1`
   - `HERMES_API_KEY` = _(the key from `../secrets.local.md`)_
5. **Save and Deploy.** You get a `*.pages.dev` URL.
6. (Optional) Add a custom domain like `roast.pratikrenuse.com` under the Pages project → Custom domains (GoDaddy CNAME → the pages.dev target).

## Validate before/after deploy

Health of the brain:
```bash
curl https://hermes.pratikrenuse.com/health
```

Roast quality (run from your Mac — proves the prompt returns good JSON):
```bash
curl https://ROAST-URL/api/roast \
  -H "Content-Type: application/json" \
  -d '{"url":"stripe.com"}'
```
(replace `ROAST-URL` with your pages.dev domain once deployed)

## Notes / gotchas

- **Latency:** Hermes browses the live page before answering, so a roast takes ~20–60s. The UI shows rotating loading lines to cover it. Cloudflare Pages Functions allow long `fetch` waits, so this is fine.
- **Key safety:** the key lives only in Cloudflare env vars (server-side). It is never in `index.html` or any committed file.
- **v1 = core loop.** Email gate (3-of-8 free), ref codes, and a leaderboard are deliberately deferred — ship the roast, confirm it's funny + useful, then layer the funnel.
- **Roast tone** lives in the prompt inside `functions/api/roast.js` (`buildPrompt`). Tune savagery there.

## Roadmap (from the buildathon spec)

- [ ] Email gate: show 3 of 8 items free, unlock full teardown with email (needs a store — Convex or Supabase)
- [ ] Ref codes on share cards → attribute scans + signups
- [ ] Leaderboard of public roasts
- [ ] Server-rendered OG image (Cloudflare Worker) so shared links preview the score
- [ ] Optional 30s ElevenLabs voice roast
- [ ] Hermes memory: store winning burn patterns per category as a teardown skill

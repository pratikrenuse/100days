# Roast My Landing Page — V2 setup (Linkup + ElevenLabs + Convex)

V2 adds: live category benchmark (Linkup), an email gate + ref-code funnel + live "Wall of Shame" leaderboard (Convex), and a 30-second voice roast (ElevenLabs).

Architecture: Cloudflare Pages Function does the roast (Hermes + Linkup + ElevenLabs, keys server-side). Convex is the datastore + reactive leaderboard, called from the browser with its public deployment URL.

---

## 1. Get the two API keys

**Linkup** — https://app.linkup.so → sign up → API keys → create one (starts with `...`). Free tier includes credits.

**ElevenLabs** — https://elevenlabs.io → sign up → profile icon → **API key** → copy (`sk_...`). Free tier includes monthly characters.
- (Optional) pick a voice at elevenlabs.io/app/voice-library, copy its Voice ID. Default is "George" (dry/deadpan), which works fine.

---

## 2. Deploy the Convex backend (one time, from your Mac)

```bash
cd ~/Documents/GitHub/100days/roast-my-landing-page
npm install
npx convex dev
```

`npx convex dev` will:
- open your browser to log in / create a Convex account (free)
- create a project
- push `convex/schema.ts` + `convex/roasts.ts`
- print your **deployment URL** — looks like `https://tame-ferret-123.convex.cloud`
- generate the `convex/_generated/` folder

Copy that deployment URL. You can press Ctrl+C after it says it's ready — the functions stay live on Convex's cloud (you only re-run `convex dev` when you change files in `convex/`).

For a stable production deployment instead: `npx convex deploy` (prints a prod URL).

---

## 3. Paste the Convex URL into the frontend

Open `index.html`, find near the top of the `<script>`:

```js
const CONVEX_URL = "https://YOUR-DEPLOYMENT.convex.cloud";
```

Replace with your real deployment URL. (This URL is public and safe in client code — it's not a secret. The secret keys stay in Cloudflare env vars, step 4.)

---

## 4. Add the keys to Cloudflare Pages

Cloudflare dashboard → your Pages project → **Settings → Environment variables** → add (Production **and** Preview):

| Name | Value |
|------|-------|
| `HERMES_API_URL` | `https://hermes.pratikrenuse.com/v1` (already set) |
| `HERMES_API_KEY` | (already set) |
| `LINKUP_API_KEY` | your Linkup key |
| `ELEVENLABS_API_KEY` | your ElevenLabs key |
| `ELEVENLABS_VOICE_ID` | (optional) a voice id, else leave unset for default |

---

## 5. Commit, push, deploy

```bash
cd ~/Documents/GitHub/100days
git add roast-my-landing-page
git commit -m "V2: Linkup benchmark, Convex funnel + leaderboard, ElevenLabs voice roast"
git push
```

Cloudflare auto-rebuilds. Convex is already live from step 2.

> Note: `package.json` lists `convex` as a dev dependency for the CLI only. Cloudflare's build command stays **empty** — it installs deps and serves `/`. If a build ever fails on the install step, set the build command to `echo skip`.

---

## 6. Test the full funnel

1. Open your `*.pages.dev` URL → roast a page → you see **score + Hero free**, the rest **blurred behind the email gate**, plus a **📊 Benchmark** line (Linkup).
2. Enter an email → the 3 locked sections reveal + a **voice roast** generates and plays (ElevenLabs).
3. Scroll down → the **Wall of Shame** leaderboard + funnel stats (scans / emails / shares) — all live from Convex.
4. Click **Post the score** → the share link carries `?ref=<scanId>`. Open that link in a new tab → it logs a referred visit; roasting from it logs a referred scan/signup. That's the 25x attribution loop.
5. Convex dashboard (dashboard.convex.dev) → your project → **Data** → `scans` + `referrals` tables = your demo dashboard: scans, emails, shares, and the signups they drove.

---

## What each partner powers (buildathon scoring)

- **Convex (+25):** scans, email funnel, ref attribution, and the live leaderboard — the main backend.
- **Linkup (+25):** every roast cites a real category winner pulled live.
- **ElevenLabs (+25):** the 30-second voice roast users replay and share.

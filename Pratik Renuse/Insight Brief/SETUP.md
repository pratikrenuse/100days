# Daily Insight Brief: Setup Guide

A private daily briefing at 7:00 AM IST on Telegram: the latest insights from 45 top people in AI, Robotics, and the Future, pulled from 40+ newsletters, lab blogs, company pages, podcasts, and news queries, filtered and summarized by DeepSeek.

Total setup time: about 15 minutes. No code editing anywhere.

---

## Step 1: Copy three files into your website repo

From this `Insight Brief` folder:

1. Copy `api/daily-brief.js` and `api/claude-brief.js` into the `api` folder of your repo (next to your other serverless functions).
2. Copy `vercel.json` into the repo root.
   - Only if a `vercel.json` already exists in the repo root: do not overwrite it, send it to me and I will merge them.

Commit and push with GitHub Desktop. Vercel deploys automatically.

## Step 2: Create the Supabase table (2 min)

1. Open your Supabase project: https://supabase.com/dashboard
2. Left sidebar: SQL Editor, then New query.
3. Paste the contents of `supabase-setup.sql` and press Run.
4. You should see "Success. No rows returned."

## Step 3: Create your Telegram bot (5 min)

1. Open Telegram and search for `@BotFather` (verified, blue check).
2. Send `/newbot`.
3. It asks for a display name: type `Insight Brief`.
4. It asks for a username: type something unique ending in `bot`, for example `pratik_insight_brief_bot`.
5. BotFather replies with a token that looks like `7123456789:AAH8s9d...`. Copy it, this is your `TELEGRAM_BOT_TOKEN`.
6. Important: tap the link to your new bot in that same message, press Start, and send it any message like `hello`. This lets the system discover your chat ID in Step 5.

## Step 4: Add env vars in Vercel (3 min)

1. Vercel dashboard, your project, Settings, Environment Variables.
2. Add these three (all environments):
   - `NOUS_API_KEY` = your Nous Research API key (from https://portal.nousresearch.com), this makes Hermes the primary brain
   - `DEEPSEEK_API_KEY` = your DeepSeek API key (from https://platform.deepseek.com), the automatic fallback if Hermes ever fails
   - `TELEGRAM_BOT_TOKEN` = the token from Step 3
   - `RESEND_API_KEY` = for email delivery, see Step 4b
3. Leave `TELEGRAM_CHAT_ID` for the next step.

## Step 4b: Email delivery via Resend (5 min)

1. Create a free account at https://resend.com (100 emails/day free, you need 1).
2. Dashboard, API Keys, Create API Key, copy it into the `RESEND_API_KEY` env var in Vercel.
3. Until you verify your domain, emails arrive from onboarding@resend.dev. To send from brief@pratikrenuse.com instead: Resend dashboard, Domains, Add Domain, enter pratikrenuse.com, then add the 3 DNS records it shows you (in your domain registrar's DNS settings), wait for verification, then add one more Vercel env var: `BRIEF_FROM` = `Daily Insight Brief <brief@pratikrenuse.com>`.
4. Emails go to pratik.y.renuse@gmail.com by default. To change, set env var `BRIEF_TO`.

## Step 5: Get your chat ID

1. Redeploy once so the new env vars are live: Vercel, Deployments, latest deployment, three-dot menu, Redeploy.
2. Visit in your browser: `https://pratikrenuse.com/api/daily-brief?whoami=1`
3. You will see your chat ID (a number like `123456789`) next to your name.
4. Back in Vercel env vars, add `TELEGRAM_CHAT_ID` = that number, then Redeploy once more.

## Step 6: Test both versions

1. Visit: `https://pratikrenuse.com/api/daily-brief?test=1` (Hermes/DeepSeek version, Telegram only)
2. Visit: `https://pratikrenuse.com/api/claude-brief?test=1` (Claude Sonnet version, Telegram + email)

Within 1-2 minutes the briefings arrive. Each browser response shows a JSON summary like `{"ok":true,"brain":"hermes","gathered":140,"fresh":85,"selected":18}`. Telegram messages are tagged so you can tell the versions apart.

If they arrive, you are done. Tomorrow at 7:00 AM IST both run by themselves.

---

## How it works each morning

1. 7:00 AM IST: Vercel cron wakes the function.
2. It pulls 40+ sources in parallel: every newsletter and blog with RSS, company news pages (Anthropic, Mistral, Figure, 1X, Unitree, Physical Intelligence), the Dwarkesh and Lex Fridman podcasts, and 9 Google News queries covering all 45 tracked people (this is how X posts and interviews get caught).
3. Everything already sent before is dropped (Supabase remembers).
4. Hermes (Nous Research API) reads the fresh haul and selects 5-8 items per category, summarizing each in 2-3 sentences: what happened and why it matters. If Hermes errors or runs out of credits, DeepSeek takes over automatically, the briefing never skips a morning. The test response shows which brain ran ("brain":"hermes" or "brain":"deepseek").
5. The briefing lands on Telegram as one header message plus one message per category, with links to every source.

Cost: Hermes 4 405B processes roughly 15-20k input and 2-3k output tokens per day, about ₹2-3 per briefing (DeepSeek fallback costs under ₹1). Everything else is free.

## Maintenance

- Add or remove people and sources: ask me, I will edit `daily-brief.js` and you push.
- If a morning fails, the bot sends you the error message instead of silence.
- If a test run ever returns a timeout error: in Vercel, Settings, Functions, make sure Fluid Compute is enabled (it allows the function up to 5 minutes).
- Optional hardening: add a `CRON_SECRET` env var in Vercel (any random string). The endpoint then rejects anyone who does not know it, and Vercel's cron authenticates automatically. Manual test calls become `?key=YOURSECRET`.

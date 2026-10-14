# Supabase setup — contact / subscribe form

This connects the form at the bottom of `pratik-v4-combined.html` to a Supabase database table called `leads`. It takes about 5 minutes. Until you do this, the form still works — it just falls back to opening the visitor's email app addressed to you.

---

## 1. Create a project

1. Go to **https://supabase.com** and sign in (free tier is plenty).
2. Click **New project**. Give it a name (e.g. `pratik-site`), set a database password (save it somewhere), pick a region near your visitors, and create it.
3. Wait ~2 minutes for it to provision.

## 2. Create the table

In the left sidebar open **SQL Editor → New query**, paste the block below, and click **Run**.

```sql
-- Table that stores every form submission
create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text        not null,
  email       text        not null,
  message     text,
  intent      text        not null default 'subscribe',  -- 'subscribe' | 'reachout' | 'both'
  source      text,
  user_agent  text
);

-- Turn on Row Level Security (required; locks the table by default)
alter table public.leads enable row level security;

-- Allow anonymous visitors to INSERT (submit the form) — but nothing else.
create policy "anon can submit leads"
  on public.leads
  for insert
  to anon
  with check (true);
```

> Why this is safe: RLS denies everything unless a policy allows it. We allow **insert only** for the public (`anon`) role, so visitors can submit but can't read, edit, or delete anyone's data. Reading happens only from your dashboard (or a logged-in service role), never from the browser.

## 3. Get your two keys

In the sidebar open **Project Settings → API**. Copy:

- **Project URL** — looks like `https://abcdxyz.supabase.co`
- **anon public** key (under *Project API keys*) — a long string. The `anon` key is **designed to be public** and live in browser code; that's expected and safe with RLS on. Do **not** use the `service_role` key here.

## 4. Paste them into the site

Open `pratik-v4-combined.html`, find this block near the very bottom (in the last `<script>`), and replace the two placeholder values:

```js
const SUPABASE_URL = "YOUR_SUPABASE_URL";          // ← paste Project URL
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY"; // ← paste anon public key
const TABLE = "leads";
```

Save. That's it — the form now writes to your database.

## 5. Test it

1. Open the page in a browser, scroll to **Let's build the next one**, fill in the form, and submit.
2. You should see *"Thank you … you're in."*
3. In Supabase, open **Table Editor → leads** — your submission should be there.

## 6. See your submissions

- **Table Editor → leads** shows everything, newest first.
- Export anytime via the **⋯ → Export to CSV** button, or query in the SQL editor:
  ```sql
  select created_at, name, email, intent, message from public.leads order by created_at desc;
  ```

---

## Optional — get emailed on every new signup

So you don't have to check the dashboard:

1. **Database → Webhooks → Create a new hook.**
2. Table `leads`, event **Insert**.
3. Point it at an email service (e.g. a [Resend](https://resend.com) endpoint, a Zapier/Make webhook, or your own function). Zapier's "Webhooks by Zapier" → "Send Email" is the no-code route: paste the Zapier catch-hook URL as the webhook target.

Alternatively, Supabase **Edge Functions** can call Resend directly on insert — ask and I can write that function for you.

## Optional — reduce spam

The form has basic email validation. If you start getting junk, the lightest additions are:
- A honeypot field (a hidden input bots fill but humans don't) — I can add this in 2 lines.
- Cloudflare Turnstile or hCaptcha (free) before insert.
- A Postgres `check` constraint or a per-IP rate limit via an Edge Function.

Tell me which and I'll wire it in.

---

### Quick reference

| Thing | Where |
|---|---|
| Project URL & anon key | Project Settings → API |
| Table data | Table Editor → leads |
| Run SQL | SQL Editor |
| Email notifications | Database → Webhooks |

The anon key being visible in the page source is normal and safe — security comes from Row Level Security, not from hiding the key.

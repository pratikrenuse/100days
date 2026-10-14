# Contact form — Supabase + Vercel setup

Your `index.html` has the contact form. It POSTs to `/api/contact` (the file
`api/contact.js`), which writes to Supabase using keys stored **only** in
Vercel's environment variables. Nothing secret lives in the HTML.

```
index4/
├── index.html        ← the site + the form (single file)
└── api/
    └── contact.js     ← serverless function (reads env vars, writes to Supabase)
```

Follow these steps once.

---

## 1. Create the Supabase table

1. Go to [supabase.com](https://supabase.com) → create a project (free tier is fine).
2. Open the project → **SQL Editor** → **New query** → paste and **Run**:

   ```sql
   create table public.contacts (
     id         uuid primary key default gen_random_uuid(),
     created_at timestamptz not null default now(),
     name       text not null,
     email      text not null,
     message    text not null
   );

   -- Keep Row Level Security ON. The serverless function uses the
   -- service_role key, which bypasses RLS, so no insert policy is needed.
   alter table public.contacts enable row level security;
   ```

3. You can later read submissions under **Table Editor → contacts**.

---

## 2. Copy your Supabase keys

In Supabase: **Project Settings → API**. Copy two values:

- **Project URL** — looks like `https://abcdefgh.supabase.co`
- **service_role** secret key (under "Project API keys") — a long token.
  ⚠️ This is a secret. Never put it in the HTML or commit it to git.

---

## 3. Add them to Vercel (environment only)

In your Vercel project: **Settings → Environment Variables → Add New**. Add two,
applied to **Production, Preview, and Development**:

| Name                         | Value                                   |
|------------------------------|-----------------------------------------|
| `SUPABASE_URL`               | your Project URL (`https://….supabase.co`) |
| `SUPABASE_SERVICE_ROLE_KEY`  | your service_role secret key            |

Do **not** prefix them with `NEXT_PUBLIC_` — that would expose them to the
browser. Plain names keep them server-side only.

After adding them, **redeploy** so the function picks them up
(Deployments → ⋯ → Redeploy).

---

## 4. Deploy

Deploy the **`index4` folder as the project root** so Vercel sees both
`index.html` and the `api/` directory.

- **CLI:** `cd index4 && vercel` then `vercel --prod`
- **Dashboard:** import the repo and set **Root Directory** to `index4`.
  Framework Preset: **Other**. No build command, no output dir.

Vercel automatically turns `api/contact.js` into a function at `/api/contact`.

---

## 5. Test

Open the deployed site, scroll to **Connect → Or send a note**, submit a test
message. You should see "Thank you — your note is on its way," and a new row in
Supabase → Table Editor → `contacts`.

If you get an error:
- Check the env var **names** match exactly (`SUPABASE_URL`,
  `SUPABASE_SERVICE_ROLE_KEY`) and that you redeployed after adding them.
- In Vercel → your deployment → **Functions/Logs**, open `/api/contact` to see
  the exact error message.
- Confirm the `contacts` table exists with columns `name`, `email`, `message`.

---

## Optional niceties

- **Email notification on new message:** in Supabase, add a Database Webhook or
  Edge Function that emails you when a row is inserted (e.g. via Resend).
- **Spam:** the form already includes a hidden honeypot field. For more, you
  could add a rate limit or hCaptcha later.
- **Local testing:** `vercel dev` runs the function locally; create a
  `.env.local` (git-ignored) with the same two variables.

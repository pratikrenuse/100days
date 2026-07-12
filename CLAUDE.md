# 100days — Project Context

Pratik builds small independent tools (one per day-ish). Each tool lives in its own folder here and deploys to Vercel. Read this file before building any new tool.

## The Brain: Hermes API (USE THIS FOR ALL LLM/AGENT FEATURES)

Every tool that needs AI calls Pratik's self-hosted Hermes agent — NOT OpenAI/Anthropic/DeepSeek directly. Hermes is a full agent (reasoning, tools, memory) running on Pratik's Hetzner server, using DeepSeek as its default model, so costs stay low.

**Endpoint:** `https://hermes.pratikrenuse.com/v1` (OpenAI-compatible)
**Model name:** `hermes-agent`
**API key:** already set in Vercel env vars (`HERMES_API_KEY`) — existing projects need nothing. Local backup copy in `secrets.local.md` (gitignored — never commit it).

### How to wire a new tool (Vercel)

1. In the NEW Vercel project, set env vars (copy values from an existing project's settings, or from `secrets.local.md`):
   - `HERMES_API_URL` = `https://hermes.pratikrenuse.com/v1`
   - `HERMES_API_KEY` = (the key)
2. Call from a serverless function (never from the browser — key must stay server-side):

```js
const r = await fetch(`${process.env.HERMES_API_URL}/chat/completions`, {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${process.env.HERMES_API_KEY}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    model: "hermes-agent",
    messages: [{ role: "user", content: userInput }]
  })
});
const data = await r.json();
const answer = data.choices[0].message.content;
```

3. Agent responses can be slow (Hermes may run tools before answering). Set `maxDuration` on the Vercel function (60s on Hobby). Consider `stream: true` for chat UIs.

### Health check

`curl https://hermes.pratikrenuse.com/health` → `{"status": "ok", "platform": "hermes-agent", ...}`

## Infrastructure map

```
User browser → Vercel tool (serverless fn, holds the key)
             → https://hermes.pratikrenuse.com  (Caddy, ports 80/443 only)
             → Hermes API server (localhost:8642 on Hetzner)
             → DeepSeek API (default model, cheap)
```

- **Server:** Hetzner CX23, Ubuntu, IP `167.233.155.215`. SSH: `ssh root@167.233.155.215`; the agent runs as the `hermes` user.
- **Hermes Agent** (Nous Research, github.com/nousresearch/hermes-agent): config in `/home/hermes/.hermes/` (`.env` = keys incl. `API_SERVER_*`, `config.yaml` = model). Gateway (Slack + API server) is systemd user service `hermes-gateway.service` — restart as hermes user: `XDG_RUNTIME_DIR=/run/user/$(id -u) systemctl --user restart hermes-gateway.service`.
- **Caddy + n8n:** Docker at `/opt/stack` (Caddyfile + docker-compose.yml). Caddy reverse-proxies `hermes.pratikrenuse.com` → `host.docker.internal:8642` and `n8n.pratikrenuse.com` → n8n. New subdomains: add GoDaddy A record → append Caddyfile block → `cd /opt/stack && docker compose up -d --force-recreate caddy`.
- **Firewall:** Hetzner cloud firewall allows only 22/80/443 inbound. Port 8642 is NOT reachable directly from the internet (verified) — only through Caddy.
- **Models:** Hermes default = DeepSeek (direct API, cheap). Claude/GPT available via OpenRouter — switch from Slack: `hermes config set model.provider "openrouter"` + `hermes config set model.default "anthropic/claude-sonnet-4.5"`, then `reset`. Back to default: provider `"deepseek"`, model `"deepseek-chat"`, base_url `"https://api.deepseek.com"`.

## Data capture: Supabase (leads / form submissions)

Two paths — pick by trust level:

- **Public tools (form/lead capture) → write to Supabase DIRECTLY from the serverless function.** Use the **anon** key + insert-only RLS. Fast, deterministic, and safe. Do NOT route public data capture through Hermes.
- **Hermes' `supabase` skill (service_role key, full DB access)** is reserved for Pratik's own use (Slack, trusted backend jobs). NEVER expose the Hermes+service_role path to public/unauthenticated input — a malicious prompt could dump or wipe the DB.

Why: Hermes won't "automatically" save leads — each API call is stateless and the model only writes to Supabase if that request's prompt tells it to. For guaranteed capture, write directly.

### One-time DB setup
Run `_shared/supabase-leads-rls.sql` in Supabase → SQL Editor (enables RLS + anon insert-only on the `leads` table).

### Reusable insert snippet (Vercel or Cloudflare serverless)
Env vars in the tool's project: `SUPABASE_URL`, `SUPABASE_ANON_KEY` (both from Supabase → Settings → API; anon key is safe to use here).

```js
async function saveLead({ name, email, message, source = "web" }) {
  const r = await fetch(`${process.env.SUPABASE_URL}/rest/v1/leads`, {
    method: "POST",
    headers: {
      apikey: process.env.SUPABASE_ANON_KEY,
      Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal", // required: anon can't read back
    },
    body: JSON.stringify({ name, email, message, source }),
  });
  if (!r.ok) throw new Error("Lead insert failed: " + (await r.text()));
}
```

Supabase project: ref `spymrfgkwfjrcealulfh`, URL `https://spymrfgkwfjrcealulfh.supabase.co`. Keys in `secrets.local.md`.

## Observability: Langfuse (centralized in Hermes — tools need nothing)

Tracing is handled by Hermes' built-in `observability/langfuse` plugin on the server, NOT per tool. Because every tool calls the Hermes API, the plugin automatically traces every conversation turn, LLM generation, and tool call — Slack sessions AND all API calls from tools — to Langfuse Cloud (US region, us.cloud.langfuse.com). Tools require zero tracing code.

- Enabled on the server with `hermes plugins enable observability/langfuse`.
- Keys live in `/home/hermes/.hermes/.env` as `HERMES_LANGFUSE_PUBLIC_KEY` / `HERMES_LANGFUSE_SECRET_KEY` / `HERMES_LANGFUSE_BASE_URL` (values in `secrets.local.md`).
- Fail-open: missing SDK/keys/errors = silent no-op, never impacts the agent.

## Security rules (non-negotiable)

- The Hermes API key stays server-side (Vercel env vars / `secrets.local.md`). Never in client JS, never committed.
- This repo is pushed to public GitHub — no secrets in any committed file.
- ⚠️ TODO before any tool gets real public users: create a restricted Hermes profile (no terminal toolset) and point tools at it, so user prompts can't execute commands on the server. Current API server exposes Pratik's personal agent, which has terminal access.

## Conventions

- One folder per tool at repo root (e.g. `100days/day-01-jensen-tracker/`, `bueno-ux-dashboard/`).
- Prefer single-file HTML tools when possible; Vercel serverless functions (`api/` folder) when a backend/LLM call is needed.
- Apply the C.L.E.A.R. framework (see `SKILL.md` at repo root) to every UI before finishing.

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

## Security rules (non-negotiable)

- The Hermes API key stays server-side (Vercel env vars / `secrets.local.md`). Never in client JS, never committed.
- This repo is pushed to public GitHub — no secrets in any committed file.
- ⚠️ TODO before any tool gets real public users: create a restricted Hermes profile (no terminal toolset) and point tools at it, so user prompts can't execute commands on the server. Current API server exposes Pratik's personal agent, which has terminal access.

## Conventions

- One folder per tool at repo root (e.g. `100days/day-01-jensen-tracker/`, `bueno-ux-dashboard/`).
- Prefer single-file HTML tools when possible; Vercel serverless functions (`api/` folder) when a backend/LLM call is needed.
- Apply the C.L.E.A.R. framework (see `SKILL.md` at repo root) to every UI before finishing.

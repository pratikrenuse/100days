// api/bueno-data.js
// Password-gated, server-side Meta Ads data for the Bueno dashboard.
// The Meta token never leaves the server. Data is only returned when the
// posted password matches DASHBOARD_PASSWORD.
//
// Env vars (set in Vercel → Project → Settings → Environment Variables):
//   META_TOKEN           - Meta System User token with ads_read
//   DASHBOARD_PASSWORD   - password required to view the dashboard
//   BUENO_AD_ACCOUNT_ID  - optional; defaults to the Bueno (NOK) account

const API = "https://graph.facebook.com/v23.0";
const ACCT = process.env.BUENO_AD_ACCOUNT_ID || "2716642581960365";
const RANGES = ["last_7d", "last_30d", "last_90d"];

// simple in-memory cache so repeated views don't re-hit Meta every time
let CACHE = { at: 0, payload: null };
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

const N = (x) => (x == null || x === "" ? 0 : Number(x));

async function gget(path, params) {
  const u = new URL(`${API}/${path}`);
  u.searchParams.set("access_token", process.env.META_TOKEN);
  for (const [k, v] of Object.entries(params || {})) u.searchParams.set(k, v);
  const res = await fetch(u);
  const json = await res.json();
  if (json.error) throw new Error(`${path}: ${json.error.message}`);
  return json;
}

async function gall(path, params) {
  let out = [];
  let json = await gget(path, params);
  out = out.concat(json.data || []);
  let next = json.paging && json.paging.next;
  let guard = 0;
  while (next && guard++ < 20) {
    const res = await fetch(next);
    json = await res.json();
    if (json.error) break;
    out = out.concat(json.data || []);
    next = json.paging && json.paging.next;
  }
  return out;
}

function resultFrom(actions) {
  if (!Array.isArray(actions)) return { label: "—", value: 0 };
  let leads = 0, regs = 0;
  for (const a of actions) {
    const t = (a.action_type || "").toLowerCase();
    const v = N(a.value);
    if (t.includes("leadgen") || t === "lead" || t.includes("lead_grouped")) leads += v;
    if (t.includes("registration page") || (t.includes("fb_pixel_custom") && t.includes("registration"))) regs += v;
  }
  if (leads > 0) return { label: "leads", value: leads };
  if (regs > 0) return { label: "registrations", value: regs };
  return { label: "—", value: 0 };
}

function shape(row, idKey, nameKey) {
  const spend = N(row.spend);
  const res = resultFrom(row.actions);
  return {
    id: row[idKey],
    name: row[nameKey] || "(unnamed)",
    campaign_id: row.campaign_id || null,
    objective: row.objective || null,
    spend,
    impressions: N(row.impressions),
    clicks: N(row.clicks),
    ctr: N(row.ctr),
    cpc: N(row.cpc),
    cpm: N(row.cpm),
    resultLabel: res.label,
    resultValue: res.value,
    costPer: res.value > 0 ? spend / res.value : null,
  };
}

async function buildRange(range) {
  const acctRows = await gall(`act_${ACCT}/insights`, {
    date_preset: range,
    fields: "spend,impressions,reach,frequency,clicks,ctr,cpc,cpm",
  });
  const acct = acctRows[0] || {};
  const camps = (await gall(`act_${ACCT}/insights`, {
    level: "campaign", date_preset: range, limit: "200",
    fields: "campaign_id,campaign_name,objective,spend,impressions,clicks,ctr,cpc,cpm,actions",
  })).map((r) => shape(r, "campaign_id", "campaign_name"));
  const sets = (await gall(`act_${ACCT}/insights`, {
    level: "adset", date_preset: range, limit: "300",
    fields: "adset_id,adset_name,campaign_id,spend,impressions,clicks,ctr,cpc,cpm,actions",
  })).map((r) => shape(r, "adset_id", "adset_name"));
  return {
    account: {
      spend: N(acct.spend), impressions: N(acct.impressions), reach: N(acct.reach),
      frequency: N(acct.frequency), clicks: N(acct.clicks), ctr: N(acct.ctr),
      cpc: N(acct.cpc), cpm: N(acct.cpm),
      date_start: acct.date_start || null, date_stop: acct.date_stop || null,
    },
    campaigns: camps,
    adsets: sets,
  };
}

async function statuses() {
  const campStatus = {}, setStatus = {};
  try {
    for (const c of await gall(`act_${ACCT}/campaigns`, { fields: "id,effective_status", limit: "500" }))
      campStatus[c.id] = c.effective_status;
    for (const s of await gall(`act_${ACCT}/adsets`, { fields: "id,effective_status", limit: "1000" }))
      setStatus[s.id] = s.effective_status;
  } catch (e) { /* status is best-effort */ }
  return { campStatus, setStatus };
}

async function buildPayload() {
  const { campStatus, setStatus } = await statuses();
  const ranges = {};
  for (const r of RANGES) {
    const d = await buildRange(r);
    d.campaigns.forEach((c) => (c.status = campStatus[c.id] || "UNKNOWN"));
    d.adsets.forEach((s) => (s.status = setStatus[s.id] || "UNKNOWN"));
    ranges[r] = d;
  }
  return { account_id: ACCT, currency: "NOK", generated_at: new Date().toISOString(), ranges };
}

// constant-time-ish password compare
function pwOk(input) {
  const a = String(input || "");
  const b = String(process.env.DASHBOARD_PASSWORD || "");
  if (!b || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  if (!process.env.META_TOKEN || !process.env.DASHBOARD_PASSWORD) {
    return res.status(500).json({ error: "Server not configured (missing env vars)." });
  }

  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch { body = {}; } }
  const password = body && body.password;

  if (!pwOk(password)) {
    return res.status(401).json({ error: "Wrong password" });
  }

  try {
    if (CACHE.payload && Date.now() - CACHE.at < CACHE_TTL_MS) {
      return res.status(200).json({ ...CACHE.payload, cached: true });
    }
    const payload = await buildPayload();
    CACHE = { at: Date.now(), payload };
    return res.status(200).json(payload);
  } catch (e) {
    return res.status(502).json({ error: "Meta API error: " + e.message });
  }
}

// api/bueno-data.js
// Password-gated, server-side Meta Ads data for the Bueno dashboard (v2).
// The Meta token never leaves the server. Data is only returned when the
// posted password matches DASHBOARD_PASSWORD.
//
// Actions (POST body { password, action, since, until }):
//   overview    -> KPIs (current + previous period), daily time series,
//                  funnel totals, and campaign/adset/ad tables
//   breakdowns  -> account-level splits: country, placement, device, age, gender
//
// Env vars (Vercel → Settings → Environment Variables):
//   META_TOKEN           - Meta System User token with ads_read
//   DASHBOARD_PASSWORD   - password required to view the dashboard
//   BUENO_AD_ACCOUNT_ID  - optional; defaults to the Bueno (NOK) account

const API = "https://graph.facebook.com/v23.0";
const ACCT = process.env.BUENO_AD_ACCOUNT_ID || "2716642581960365";

const CACHE = new Map(); // key -> { at, payload }
const CACHE_TTL_MS = 10 * 60 * 1000;

const N = (x) => (x == null || x === "" ? 0 : Number(x));

/* ---------------- Meta helpers ---------------- */
function tr(since, until) { return JSON.stringify({ since, until }); }

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
  let out = [], json = await gget(path, params);
  out = out.concat(json.data || []);
  let next = json.paging && json.paging.next, guard = 0;
  while (next && guard++ < 25) {
    const res = await fetch(next); json = await res.json();
    if (json.error) break;
    out = out.concat(json.data || []);
    next = json.paging && json.paging.next;
  }
  return out;
}

/* ---------------- action parsing ---------------- */
function actionVal(actions, types) {
  if (!Array.isArray(actions)) return 0;
  let sum = 0;
  for (const a of actions) {
    const t = (a.action_type || "").toLowerCase();
    if (types.some((x) => t.includes(x))) sum += N(a.value);
  }
  return sum;
}
function leadsOf(actions) { return actionVal(actions, ["leadgen", "lead_grouped"]) || actionVal(actions, ["lead"]); }
function regsOf(actions) {
  if (!Array.isArray(actions)) return 0;
  let r = 0;
  for (const a of actions) {
    const t = (a.action_type || "").toLowerCase();
    if (t.includes("registration page") || (t.includes("fb_pixel_custom") && t.includes("registration"))) r += N(a.value);
  }
  return r;
}
function linkClicksOf(actions) { return actionVal(actions, ["link_click"]); }
function lpViewsOf(actions) { return actionVal(actions, ["landing_page_view"]); }

function primaryResult(actions) {
  const l = leadsOf(actions), r = regsOf(actions);
  if (l > 0) return { label: "leads", value: l };
  if (r > 0) return { label: "registrations", value: r };
  return { label: "—", value: 0 };
}

function shapeEntity(row, idKey, nameKey) {
  const spend = N(row.spend);
  const res = primaryResult(row.actions);
  return {
    id: row[idKey], name: row[nameKey] || "(unnamed)",
    campaign_id: row.campaign_id || null, adset_id: row.adset_id || null,
    objective: row.objective || null,
    spend, impressions: N(row.impressions), clicks: N(row.clicks),
    ctr: N(row.ctr), cpc: N(row.cpc), cpm: N(row.cpm),
    resultLabel: res.label, resultValue: res.value,
    costPer: res.value > 0 ? spend / res.value : null,
  };
}

/* ---------------- date helpers ---------------- */
function isoDay(d) { return d.toISOString().slice(0, 10); }
function previousWindow(since, until) {
  const s = new Date(since + "T00:00:00Z"), u = new Date(until + "T00:00:00Z");
  const days = Math.round((u - s) / 86400000) + 1;
  const prevUntil = new Date(s); prevUntil.setUTCDate(prevUntil.getUTCDate() - 1);
  const prevSince = new Date(prevUntil); prevSince.setUTCDate(prevSince.getUTCDate() - (days - 1));
  return { since: isoDay(prevSince), until: isoDay(prevUntil) };
}

/* ---------------- totals + funnel ---------------- */
async function accountTotals(since, until) {
  const rows = await gall(`act_${ACCT}/insights`, {
    time_range: tr(since, until),
    fields: "spend,impressions,reach,frequency,clicks,ctr,cpc,cpm,actions",
  });
  const a = rows[0] || {};
  const leads = leadsOf(a.actions), regs = regsOf(a.actions);
  const result = leads || regs;
  const spend = N(a.spend);
  return {
    spend, impressions: N(a.impressions), reach: N(a.reach), frequency: N(a.frequency),
    clicks: N(a.clicks), ctr: N(a.ctr), cpc: N(a.cpc), cpm: N(a.cpm),
    linkClicks: linkClicksOf(a.actions), lpViews: lpViewsOf(a.actions),
    leads, registrations: regs,
    result, resultLabel: leads ? "leads" : (regs ? "registrations" : "results"),
    costPerResult: result > 0 ? spend / result : null,
    date_start: a.date_start || since, date_stop: a.date_stop || until,
  };
}

async function dailySeries(since, until) {
  const rows = await gall(`act_${ACCT}/insights`, {
    time_range: tr(since, until), time_increment: "1",
    fields: "spend,impressions,clicks,ctr,actions",
  });
  return rows.map((d) => ({
    date: d.date_start,
    spend: N(d.spend), impressions: N(d.impressions), clicks: N(d.clicks), ctr: N(d.ctr),
    leads: leadsOf(d.actions), registrations: regsOf(d.actions),
  }));
}

/* ---------------- entity tables ---------------- */
async function entities(level, idKey, nameKey, since, until, fields, limit) {
  const rows = await gall(`act_${ACCT}/insights`, {
    level, time_range: tr(since, until), limit: String(limit), fields,
  });
  return rows.map((r) => shapeEntity(r, idKey, nameKey));
}
async function statusMap(edge, params) {
  const m = {};
  try { for (const e of await gall(`act_${ACCT}/${edge}`, params)) m[e.id] = e.effective_status; }
  catch (_) {}
  return m;
}

async function buildOverview(since, until) {
  const prev = previousWindow(since, until);
  const [cur, previous, series, camps, campsPrev, sets, ads, cs, ss, as] = await Promise.all([
    accountTotals(since, until),
    accountTotals(prev.since, prev.until),
    dailySeries(since, until),
    entities("campaign", "campaign_id", "campaign_name", since, until,
      "campaign_id,campaign_name,objective,spend,impressions,clicks,ctr,cpc,cpm,actions", 200),
    entities("campaign", "campaign_id", "campaign_name", prev.since, prev.until,
      "campaign_id,campaign_name,spend,impressions,clicks,ctr,cpc,cpm,actions", 200),
    entities("adset", "adset_id", "adset_name", since, until,
      "adset_id,adset_name,campaign_id,spend,impressions,clicks,ctr,cpc,cpm,actions", 400),
    entities("ad", "ad_id", "ad_name", since, until,
      "ad_id,ad_name,adset_id,campaign_id,spend,impressions,clicks,ctr,cpc,cpm,actions", 500),
    statusMap("campaigns", { fields: "id,effective_status", limit: "500" }),
    statusMap("adsets", { fields: "id,effective_status", limit: "1000" }),
    statusMap("ads", { fields: "id,effective_status", limit: "2000" }),
  ]);
  const prevById = {};
  campsPrev.forEach((c) => (prevById[c.id] = c));
  camps.forEach((c) => {
    const p = prevById[c.id];
    c.spendPrev = p ? p.spend : 0;
    c.resultPrev = p ? p.resultValue : 0;
    c.spendDelta = c.spend - c.spendPrev;
    c.resultDelta = c.resultValue - c.resultPrev;
  });
  camps.forEach((c) => (c.status = cs[c.id] || "UNKNOWN"));
  sets.forEach((s) => (s.status = ss[s.id] || "UNKNOWN"));
  ads.forEach((a) => (a.status = as[a.id] || "UNKNOWN"));

  // funnel from current totals
  const funnel = [
    { stage: "Impressions", value: cur.impressions },
    { stage: "Link clicks", value: cur.linkClicks || cur.clicks },
    { stage: "Landing page views", value: cur.lpViews },
    { stage: cur.resultLabel.charAt(0).toUpperCase() + cur.resultLabel.slice(1), value: cur.result },
  ];

  return {
    currency: "NOK", generated_at: new Date().toISOString(),
    range: { since, until }, previousRange: prev,
    current: cur, previous, series, funnel,
    campaigns: camps, adsets: sets, ads,
  };
}

async function breakdown(dim, since, until) {
  const rows = await gall(`act_${ACCT}/insights`, {
    time_range: tr(since, until), breakdowns: dim, limit: "200",
    fields: "spend,impressions,clicks,ctr,actions",
  });
  return rows.map((r) => {
    const res = primaryResult(r.actions);
    return {
      key: r[dim] ?? "(unknown)",
      spend: N(r.spend), impressions: N(r.impressions), clicks: N(r.clicks), ctr: N(r.ctr),
      resultLabel: res.label, resultValue: res.value,
    };
  }).sort((a, b) => b.spend - a.spend);
}

async function buildBreakdowns(since, until) {
  const [country, placement, device, age, gender] = await Promise.all([
    breakdown("country", since, until),
    breakdown("publisher_platform", since, until),
    breakdown("impression_device", since, until),
    breakdown("age", since, until),
    breakdown("gender", since, until),
  ]);
  return {
    currency: "NOK", generated_at: new Date().toISOString(),
    range: { since, until },
    country, placement, device, age, gender,
  };
}

/* ---------------- password ---------------- */
function pwOk(input) {
  const a = String(input || ""), b = String(process.env.DASHBOARD_PASSWORD || "");
  if (!b || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/* ---------------- handler ---------------- */
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (!process.env.META_TOKEN || !process.env.DASHBOARD_PASSWORD)
    return res.status(500).json({ error: "Server not configured (missing env vars)." });

  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch { body = {}; } }
  body = body || {};
  if (!pwOk(body.password)) return res.status(401).json({ error: "Wrong password" });

  const action = body.action === "breakdowns" ? "breakdowns" : "overview";
  let since = body.since, until = body.until;
  if (!DATE_RE.test(since || "") || !DATE_RE.test(until || "")) {
    // default to last 30 days
    const u = new Date(); const s = new Date(); s.setUTCDate(s.getUTCDate() - 29);
    since = isoDay(s); until = isoDay(u);
  }
  if (since > until) { const t = since; since = until; until = t; }

  const key = `${action}:${since}:${until}`;
  const hit = CACHE.get(key);
  if (hit && Date.now() - hit.at < CACHE_TTL_MS)
    return res.status(200).json({ ...hit.payload, cached: true });

  try {
    const payload = action === "breakdowns"
      ? await buildBreakdowns(since, until)
      : await buildOverview(since, until);
    CACHE.set(key, { at: Date.now(), payload });
    return res.status(200).json(payload);
  } catch (e) {
    return res.status(502).json({ error: "Meta API error: " + e.message });
  }
}

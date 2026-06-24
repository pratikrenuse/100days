// api/bueno-ux-data.js  (v1)
// Password-gated, server-side data for the Bueno UX & Growth dashboard.
//
//   • ADS  — pulled LIVE from the Meta Graph API (same token as bueno-data.js).
//   • UX   — Mouseflow behaviour analytics for getbueno.com. Served server-side
//            so no business metrics live in the public page source.
//            Pulled live from the Mouseflow REST API when MOUSEFLOW_EMAIL +
//            MOUSEFLOW_API_KEY are set; otherwise falls back to the embedded
//            snapshot below (regenerated on request, last refresh in UX_SNAPSHOT.as_of).
//
// POST body { password, since, until, includePaused }
// Env: META_TOKEN, DASHBOARD_PASSWORD, BUENO_AD_ACCOUNT_ID(optional),
//      MOUSEFLOW_EMAIL(optional), MOUSEFLOW_API_KEY(optional),
//      MOUSEFLOW_WEBSITE_ID(optional), MOUSEFLOW_ENDPOINT(optional, default api-eu)

const API = "https://graph.facebook.com/v23.0";
const ACCT = process.env.BUENO_AD_ACCOUNT_ID || "2716642581960365";
const MF_ENDPOINT = process.env.MOUSEFLOW_ENDPOINT || "https://api-eu.mouseflow.com";
const MF_SITE = process.env.MOUSEFLOW_WEBSITE_ID || "ec3120a8-51b8-42b4-81f9-ae2449dafc34";
const CACHE = new Map();
const CACHE_TTL_MS = 10 * 60 * 1000;
const N = (x) => (x == null || x === "" ? 0 : Number(x));

/* ============================================================= *
 *  UX SNAPSHOT — Mouseflow getbueno.com (fallback / accurate)    *
 *  Regenerate by re-pulling Mouseflow and editing this block.    *
 * ============================================================= */
const UX_SNAPSHOT = {
  as_of: "2026-06-24",
  window: { since: "2026-03-26", until: "2026-06-24" },
  totals: { sessions: 55267, visitors: 38580, pageviews: 113717,
    avgVisitMs: 181459, avgEngMs: 46349, friction: 0.4381, jsErrPerSession: 0.00125 },
  // 7-day comparison: last week (17–23 Jun) vs prior week (10–16 Jun)
  wow: {
    last: { sessions: 2274, visitors: 1888, pageviews: 5654, friction: 0.7146, avgVisitMs: 208543 },
    prev: { sessions: 2620, visitors: 2161, pageviews: 6770, friction: 0.6531, avgVisitMs: 205418 }
  },
  weekly: [
    { week: "2026-03-22", sessions: 1582, visitors: 1389, pageviews: 3292, friction: 0.477, visitMs: 169785 },
    { week: "2026-03-29", sessions: 2851, visitors: 2357, pageviews: 6844, friction: 0.521, visitMs: 194620 },
    { week: "2026-04-05", sessions: 3008, visitors: 2472, pageviews: 7416, friction: 0.544, visitMs: 197809 },
    { week: "2026-04-12", sessions: 2640, visitors: 2092, pageviews: 7015, friction: 0.647, visitMs: 229423 },
    { week: "2026-04-19", sessions: 3100, visitors: 2554, pageviews: 7633, friction: 0.626, visitMs: 209736 },
    { week: "2026-04-26", sessions: 3259, visitors: 2614, pageviews: 7392, friction: 0.532, visitMs: 187121 },
    { week: "2026-05-03", sessions: 3672, visitors: 2658, pageviews: 8174, friction: 0.516, visitMs: 193904 },
    { week: "2026-05-10", sessions: 6747, visitors: 4205, pageviews: 12165, friction: 0.323, visitMs: 181558 },
    { week: "2026-05-17", sessions: 4315, visitors: 3342, pageviews: 8671, friction: 0.437, visitMs: 184987 },
    { week: "2026-05-24", sessions: 11164, visitors: 8712, pageviews: 18589, friction: 0.277, visitMs: 154310 },
    { week: "2026-05-31", sessions: 5929, visitors: 5013, pageviews: 8695, friction: 0.170, visitMs: 133409 },
    { week: "2026-06-07", sessions: 2898, visitors: 2394, pageviews: 7221, friction: 0.691, visitMs: 218902 },
    { week: "2026-06-14", sessions: 3000, visitors: 2429, pageviews: 7836, friction: 0.696, visitMs: 214398 },
    { week: "2026-06-21", sessions: 1102, visitors: 932, pageviews: 2774, friction: 0.730, visitMs: 197853 }
  ],
  devices: [
    { name: "Phone", sessions: 28672, visitors: 21174, friction: 0.388 },
    { name: "Tablet", sessions: 13750, visitors: 9800, friction: 0.174 },
    { name: "Desktop", sessions: 12817, visitors: 7928, friction: 0.832 }
  ],
  countries: [
    { name: "Spain", code: "ES", sessions: 24251 }, { name: "Norway", code: "NO", sessions: 19697 },
    { name: "Sweden", code: "SE", sessions: 5680 }, { name: "United States", code: "US", sessions: 1092 },
    { name: "United Kingdom", code: "GB", sessions: 867 }, { name: "Germany", code: "DE", sessions: 464 },
    { name: "France", code: "FR", sessions: 463 }, { name: "Netherlands", code: "NL", sessions: 311 }
  ],
  referrers: [
    { name: "Direct", sessions: 24663 }, { name: "Social", sessions: 19282 },
    { name: "Search", sessions: 4438 }, { name: "Link / referral", sessions: 3899 },
    { name: "Internal", sessions: 2978 }
  ],
  pages: [
    { page: "/", pageviews: 20239, scroll: 54.7, exit: 38.6, friction: 0.144, renderMs: 842 },
    { page: "/all-usp-norsk", pageviews: 16798, scroll: 12.4, exit: 98.9, friction: 0.105, renderMs: 2639 },
    { page: "/landing", pageviews: 11722, scroll: 49.0, exit: 57.3, friction: 0.323, renderMs: 2 },
    { page: "/dd-en", pageviews: 7775, scroll: 12.9, exit: 99.5, friction: 0.141, renderMs: 3116 },
    { page: "/lifestyle-svenska", pageviews: 6668, scroll: 22.5, exit: 96.3, friction: 0.197, renderMs: 1762 },
    { page: "/all-usp", pageviews: 6275, scroll: 16.3, exit: 97.2, friction: 0.151, renderMs: 3198 },
    { page: "/no", pageviews: 5593, scroll: 20.8, exit: 59.7, friction: 0.209, renderMs: 926 },
    { page: "/onboarding", pageviews: 3176, scroll: 73.0, exit: 51.1, friction: 0.400, renderMs: 2 },
    { page: "/transactions", pageviews: 2666, scroll: 80.5, exit: 25.8, friction: 0.237, renderMs: 2 },
    { page: "/user/register-user", pageviews: 2598, scroll: 89.6, exit: 52.5, friction: 0.496, renderMs: 1500 },
    { page: "/home", pageviews: 2542, scroll: 70.5, exit: 25.9, friction: 0.213, renderMs: 2 },
    { page: "/spanish-lifestyle-norwegian", pageviews: 1617, scroll: 21.9, exit: 97.4, friction: 0.226, renderMs: 1817 }
  ],
  // friction is per-SESSION here (accumulates across the visit) — entry pages that
  // start high-friction journeys are the most urgent to fix.
  entryPages: [
    { page: "/all-usp-norsk", sessions: 12506, friction: 0.15 },
    { page: "/", sessions: 6063, friction: 1.13 },
    { page: "/dd-en", sessions: 5946, friction: 0.20 },
    { page: "/lifestyle-svenska", sessions: 5772, friction: 0.25 },
    { page: "/no", sessions: 4759, friction: 0.83 },
    { page: "/all-usp", sessions: 4691, friction: 0.22 },
    { page: "/landing", sessions: 1573, friction: 0.60 },
    { page: "/spanish-lifestyle-norwegian", sessions: 1498, friction: 0.26 },
    { page: "/property-nor", sessions: 1073, friction: 0.41 },
    { page: "/se", sessions: 753, friction: 0.84 }
  ],
  exitPages: [
    { page: "/all-usp-norsk", sessions: 12452 }, { page: "/dd-en", sessions: 5933 },
    { page: "/lifestyle-svenska", sessions: 5632 }, { page: "/all-usp", sessions: 4609 },
    { page: "/landing", sessions: 4265 }, { page: "/", sessions: 3705 },
    { page: "/no", sessions: 3027 }, { page: "/spanish-lifestyle-norwegian", sessions: 1484 },
    { page: "/user/register-user", sessions: 1094 }, { page: "/property-nor", sessions: 946 }
  ],
  // pageview-level experience by device (scroll %, render ms, clicks-per-view)
  deviceExp: [
    { name: "Desktop", pageviews: 47414, scroll: 58.0, renderMs: 368, friction: 0.225, clicks: 89570, clicksPerView: 1.89 },
    { name: "Phone", pageviews: 46647, scroll: 37.1, renderMs: 1287, friction: 0.239, clicks: 60268, clicksPerView: 1.29 },
    { name: "Tablet", pageviews: 19618, scroll: 20.3, renderMs: 2993, friction: 0.122, clicks: 7307, clicksPerView: 0.37 }
  ]
};

/* ---------- Mouseflow live (best-effort; falls back to snapshot) ---------- */
async function mfGet(path, params) {
  const url = new URL(`${MF_ENDPOINT}${path}`);
  for (const [k, v] of Object.entries(params || {})) url.searchParams.set(k, v);
  const auth = Buffer.from(`${process.env.MOUSEFLOW_EMAIL}:${process.env.MOUSEFLOW_API_KEY}`).toString("base64");
  const r = await fetch(url, { headers: { Authorization: `Basic ${auth}` } });
  if (!r.ok) throw new Error(`mouseflow ${path}: ${r.status}`);
  return r.json();
}
async function buildUX(since, until) {
  // Live path is enabled only when credentials are present. The aggregate-stats
  // endpoints vary by plan, so we keep the accurate snapshot as the default and
  // overlay the live session total + daily trend (documented /recordings edge).
  if (!process.env.MOUSEFLOW_EMAIL || !process.env.MOUSEFLOW_API_KEY) {
    return { ...UX_SNAPSHOT, source: "snapshot" };
  }
  try {
    const rec = await mfGet(`/websites/${MF_SITE}/recordings`, { fromDate: since, toDate: until, limit: "1" });
    const out = { ...UX_SNAPSHOT, source: "live+snapshot" };
    if (rec && typeof rec.count === "number") out.live = { sessions: rec.count, chart: rec.chart || null, range: { since, until } };
    return out;
  } catch (e) {
    return { ...UX_SNAPSHOT, source: "snapshot", mfError: String(e.message || e) };
  }
}

/* ============================================================= *
 *  META ADS — live                                              *
 * ============================================================= */
const tr = (s, u) => JSON.stringify({ since: s, until: u });
async function gget(path, params) {
  const url = new URL(`${API}/${path}`);
  url.searchParams.set("access_token", process.env.META_TOKEN);
  for (const [k, v] of Object.entries(params || {})) url.searchParams.set(k, v);
  const r = await fetch(url); const j = await r.json();
  if (j.error) throw new Error(`${path}: ${j.error.message}`);
  return j;
}
async function gall(path, params) {
  let out = [], j = await gget(path, params);
  out = out.concat(j.data || []);
  let next = j.paging && j.paging.next, g = 0;
  while (next && g++ < 25) { const r = await fetch(next); j = await r.json(); if (j.error) break; out = out.concat(j.data || []); next = j.paging && j.paging.next; }
  return out;
}
function actionVal(actions, subs) {
  if (!Array.isArray(actions)) return 0;
  let s = 0;
  for (const a of actions) { const t = (a.action_type || "").toLowerCase(); if (subs.some((x) => t.includes(x))) s += N(a.value); }
  return s;
}
const leadsOf = (a) => actionVal(a, ["leadgen", "lead_grouped"]) || actionVal(a, ["onsite_conversion.lead"]) || actionVal(a, ["lead"]);
const regsOf = (a) => { if (!Array.isArray(a)) return 0; let r = 0; for (const x of a) if ((x.action_type || "").toLowerCase().includes("registration page")) r += N(x.value); return r; };
const dashOf = (a) => { if (!Array.isArray(a)) return 0; let r = 0; for (const x of a) { const t = (x.action_type || "").toLowerCase(); if (t.includes("fb_pixel_custom") && t.includes("dashboard")) r += N(x.value); } return r; };
const linkClicksOf = (a) => actionVal(a, ["link_click"]);
const lpViewsOf = (a) => actionVal(a, ["landing_page_view"]);
const acts = (row) => [].concat(row && row.actions ? row.actions : [], row && row.conversions ? row.conversions : []);
const MET = "spend,impressions,reach,frequency,clicks,ctr,cpc,cpm,actions,conversions";
const isoDay = (d) => d.toISOString().slice(0, 10);
function previousWindow(since, until) {
  const s = new Date(since + "T00:00:00Z"), u = new Date(until + "T00:00:00Z");
  const days = Math.round((u - s) / 864e5) + 1;
  const pu = new Date(s); pu.setUTCDate(pu.getUTCDate() - 1);
  const ps = new Date(pu); ps.setUTCDate(ps.getUTCDate() - (days - 1));
  return { since: isoDay(ps), until: isoDay(pu) };
}
function classifyGoal(o) { o = String(o || "").toUpperCase(); if (o.includes("LEAD")) return "Leads"; if (o.includes("SALES") || o.includes("TRAFFIC") || o.includes("LINK_CLICKS") || o.includes("CONVERSION")) return "Conversions"; return "Other"; }
async function accountTotals(since, until) {
  const a = (await gall(`act_${ACCT}/insights`, { time_range: tr(since, until), fields: MET }))[0] || {};
  const m = acts(a); const spend = N(a.spend), leads = leadsOf(m), regs = regsOf(m), dash = dashOf(m);
  return { spend, impressions: N(a.impressions), reach: N(a.reach), frequency: N(a.frequency),
    clicks: N(a.clicks), ctr: N(a.ctr), cpc: N(a.cpc), cpm: N(a.cpm),
    linkClicks: linkClicksOf(m), lpViews: lpViewsOf(m), leads, registrations: regs, dashboard: dash,
    costPerLead: leads ? spend / leads : null, costPerReg: regs ? spend / regs : null };
}
async function dailySeries(since, until) {
  return (await gall(`act_${ACCT}/insights`, { time_range: tr(since, until), time_increment: "1",
    fields: "spend,impressions,clicks,ctr,actions,conversions" }))
    .map((d) => { const m = acts(d); return { date: d.date_start, spend: N(d.spend), impressions: N(d.impressions),
      clicks: N(d.clicks), ctr: N(d.ctr), linkClicks: linkClicksOf(m), leads: leadsOf(m), registrations: regsOf(m) }; });
}
async function buildAds(since, until, includePaused) {
  const prev = previousWindow(since, until);
  const [cur, previous, series, camps, ads, objArr, statusArr] = await Promise.all([
    accountTotals(since, until), accountTotals(prev.since, prev.until), dailySeries(since, until),
    gall(`act_${ACCT}/insights`, { level: "campaign", time_range: tr(since, until), limit: "100",
      fields: "campaign_id,campaign_name,spend,impressions,clicks,ctr,cpc,cpm,reach,actions,conversions" }),
    gall(`act_${ACCT}/insights`, { level: "ad", time_range: tr(since, until), limit: "200",
      fields: "ad_id,ad_name,adset_id,campaign_id,spend,impressions,clicks,ctr,cpc,actions,conversions" }),
    gall(`act_${ACCT}/campaigns`, { fields: "id,objective,effective_status", limit: "200" }),
    gall(`act_${ACCT}/ads`, { fields: "id,effective_status", limit: "1000" }).catch(() => [])
  ]);
  const objMap = {}, cStatus = {}; objArr.forEach((c) => { objMap[c.id] = c.objective; cStatus[c.id] = c.effective_status; });
  const aStatus = {}; statusArr.forEach((a) => (aStatus[a.id] = a.effective_status));
  const active = (s) => /ACTIVE/i.test(s || "");

  const campaigns = camps.map((c) => { const m = acts(c); const goal = classifyGoal(objMap[c.campaign_id]);
    const leads = leadsOf(m), regs = regsOf(m); const result = goal === "Leads" ? leads : regs;
    return { id: c.campaign_id, name: c.campaign_name, objective: objMap[c.campaign_id] || "", goal,
      status: cStatus[c.campaign_id] || "UNKNOWN", spend: N(c.spend), impressions: N(c.impressions), clicks: N(c.clicks),
      ctr: N(c.ctr), cpc: N(c.cpc), cpm: N(c.cpm), reach: N(c.reach), leads, registrations: regs,
      result, resultLabel: goal === "Leads" ? "leads" : "registrations", costPer: result ? N(c.spend) / result : null }; })
    .filter((c) => includePaused || c.spend > 0 || active(c.status))
    .sort((a, b) => b.spend - a.spend);

  const topAds = ads.map((a) => { const m = acts(a); const leads = leadsOf(m), regs = regsOf(m);
    const result = (leads + regs) || 0; const label = leads >= regs ? "leads" : "registrations";
    return { id: a.ad_id, name: a.ad_name, spend: N(a.spend), impressions: N(a.impressions), clicks: N(a.clicks),
      ctr: N(a.ctr), cpc: N(a.cpc), leads, registrations: regs, result, resultLabel: label,
      costPer: result ? N(a.spend) / result : null }; })
    .filter((a) => a.spend > 0).sort((a, b) => b.spend - a.spend).slice(0, 12);

  const funnel = [
    { stage: "Impressions", value: cur.impressions },
    { stage: "Link clicks", value: cur.linkClicks || cur.clicks },
    { stage: "Landing page views", value: cur.lpViews },
    { stage: "Registrations", value: cur.registrations },
    { stage: "Dashboard (final)", value: cur.dashboard }
  ];
  return { current: cur, previous, previousRange: prev, series, campaigns, topAds, funnel };
}

/* ---------- password ---------- */
function pwOk(input) {
  const a = String(input || ""), b = String(process.env.DASHBOARD_PASSWORD || "");
  if (!b || a.length !== b.length) return false;
  let d = 0; for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i); return d === 0;
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (!process.env.META_TOKEN || !process.env.DASHBOARD_PASSWORD)
    return res.status(500).json({ error: "Server not configured (missing env vars)." });
  let body = req.body; if (typeof body === "string") { try { body = JSON.parse(body); } catch { body = {}; } }
  body = body || {};
  if (!pwOk(body.password)) return res.status(401).json({ error: "Wrong password" });

  let since = body.since, until = body.until;
  if (!DATE_RE.test(since || "") || !DATE_RE.test(until || "")) {
    const u = new Date(), s = new Date(); s.setUTCDate(s.getUTCDate() - 29); since = isoDay(s); until = isoDay(u);
  }
  if (since > until) { const t = since; since = until; until = t; }
  const includePaused = !!body.includePaused;
  const key = `ux:${since}:${until}:${includePaused}`;
  const hit = CACHE.get(key);
  if (hit && Date.now() - hit.at < CACHE_TTL_MS) return res.status(200).json({ ...hit.payload, cached: true });

  try {
    const [ads, ux] = await Promise.all([ buildAds(since, until, includePaused), buildUX(since, until) ]);
    const payload = { currency: "NOK", generated_at: new Date().toISOString(),
      range: { since, until }, previousRange: ads.previousRange, includePaused, ads, ux };
    CACHE.set(key, { at: Date.now(), payload });
    return res.status(200).json(payload);
  } catch (e) { return res.status(502).json({ error: "Data error: " + e.message }); }
}

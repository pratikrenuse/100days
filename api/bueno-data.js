// api/bueno-data.js  (v3.1)
// Password-gated, server-side Meta Ads data for the Bueno dashboard.
// TWO co-equal goals: Leads (lead events) and Conversions (Dashboard pixel event,
// offsite_conversion.fb_pixel_custom.Dashboard). Registration Page is a funnel step only.
// Market (Norwegian/Swedish/English/Other) + goal segmentation, market×goal matrix,
// per-market daily trends, efficiency leaderboard, alerts. Token never leaves the server.
//
// POST body { password, action, since, until, includePaused }
// Env: META_TOKEN, DASHBOARD_PASSWORD, BUENO_AD_ACCOUNT_ID(optional)

const API = "https://graph.facebook.com/v23.0";
const ACCT = process.env.BUENO_AD_ACCOUNT_ID || "2716642581960365";
const CACHE = new Map();
const CACHE_TTL_MS = 10 * 60 * 1000;
const N = (x) => (x == null || x === "" ? 0 : Number(x));

/* ---------- Meta helpers ---------- */
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
  while (next && g++ < 30) { const r = await fetch(next); j = await r.json(); if (j.error) break; out = out.concat(j.data || []); next = j.paging && j.paging.next; }
  return out;
}

/* ---------- action parsing ---------- */
function actionVal(actions, subs) {
  if (!Array.isArray(actions)) return 0;
  let s = 0;
  for (const a of actions) { const t = (a.action_type || "").toLowerCase(); if (subs.some((x) => t.includes(x))) s += N(a.value); }
  return s;
}
const leadsOf = (a) => actionVal(a, ["leadgen", "lead_grouped"]) || actionVal(a, ["onsite_conversion.lead"]) || actionVal(a, ["lead"]);
// CONVERSION = Dashboard custom pixel event
const convOf = (a) => {
  if (!Array.isArray(a)) return 0; let r = 0;
  for (const x of a) { const t = (x.action_type || "").toLowerCase();
    if (t.includes("fb_pixel_custom") && t.includes("dashboard")) r += N(x.value);
    else if (/(^|\.)dashboard$/.test(t)) r += N(x.value); }
  return r;
};
const regsOf = (a) => { // Registration Page — funnel step only
  if (!Array.isArray(a)) return 0; let r = 0;
  for (const x of a) { const t = (x.action_type || "").toLowerCase();
    if (t.includes("registration page") || (t.includes("fb_pixel_custom") && t.includes("registration"))) r += N(x.value); }
  return r;
};
const linkClicksOf = (a) => actionVal(a, ["link_click"]);
const lpViewsOf = (a) => actionVal(a, ["landing_page_view"]);

/* ---------- classification ---------- */
function classifyMarket(name) {
  const toks = String(name || "").toUpperCase().split(/[^A-ZÅÄÖØÆ]+/).filter(Boolean);
  const has = (...xs) => xs.some((x) => toks.includes(x));
  if (has("ENG", "EN", "ENGLISH", "BRITISH", "UK", "GB", "IRELAND")) return "English";
  if (has("SE", "SWEDEN", "SWEDISH", "SVERIGE")) return "Swedish";
  if (has("NO", "NOR", "NORWAY", "NORWEGIAN", "NORGE")) return "Norwegian";
  return "Other";
}
function classifyGoal(objective) {
  const o = String(objective || "").toUpperCase();
  if (o.includes("LEAD")) return "Leads";
  if (o.includes("SALES") || o.includes("TRAFFIC") || o.includes("LINK_CLICKS") || o.includes("CONVERSION")) return "Conversions";
  return "Other";
}
const MARKETS = ["Norwegian", "Swedish", "English", "Other"];
const GOALS = ["Leads", "Conversions", "Other"];

/* ---------- shaping ---------- */
function shape(row, idKey, nameKey) {
  const spend = N(row.spend);
  return {
    id: row[idKey], name: row[nameKey] || "(unnamed)",
    campaign_id: row.campaign_id || null, adset_id: row.adset_id || null,
    spend, impressions: N(row.impressions), clicks: N(row.clicks),
    ctr: N(row.ctr), cpc: N(row.cpc), cpm: N(row.cpm),
    leads: leadsOf(row.actions), conversions: convOf(row.actions), registrations: regsOf(row.actions),
    linkClicks: linkClicksOf(row.actions), lpViews: lpViewsOf(row.actions),
  };
}
// primary result by goal: Leads -> leads, Conversions -> dashboard conversions
function primaryFor(goal, e) {
  if (goal === "Leads") return { label: "leads", value: e.leads };
  return { label: "conversions", value: e.conversions };
}

/* ---------- dates ---------- */
const isoDay = (d) => d.toISOString().slice(0, 10);
function previousWindow(since, until) {
  const s = new Date(since + "T00:00:00Z"), u = new Date(until + "T00:00:00Z");
  const days = Math.round((u - s) / 864e5) + 1;
  const pu = new Date(s); pu.setUTCDate(pu.getUTCDate() - 1);
  const ps = new Date(pu); ps.setUTCDate(ps.getUTCDate() - (days - 1));
  return { since: isoDay(ps), until: isoDay(pu) };
}

/* ---------- totals + funnel ---------- */
async function accountTotals(since, until) {
  const a = (await gall(`act_${ACCT}/insights`, { time_range: tr(since, until),
    fields: "spend,impressions,reach,frequency,clicks,ctr,cpc,cpm,actions" }))[0] || {};
  const spend = N(a.spend), leads = leadsOf(a.actions), conv = convOf(a.actions);
  return { spend, impressions: N(a.impressions), reach: N(a.reach), frequency: N(a.frequency),
    clicks: N(a.clicks), ctr: N(a.ctr), cpc: N(a.cpc), cpm: N(a.cpm),
    linkClicks: linkClicksOf(a.actions), lpViews: lpViewsOf(a.actions),
    leads, conversions: conv, registrations: regsOf(a.actions),
    costPerLead: leads ? spend / leads : null, costPerConv: conv ? spend / conv : null,
    date_start: a.date_start || since, date_stop: a.date_stop || until };
}
async function dailySeries(since, until) {
  return (await gall(`act_${ACCT}/insights`, { time_range: tr(since, until), time_increment: "1",
    fields: "spend,impressions,clicks,ctr,actions" }))
    .map((d) => ({ date: d.date_start, spend: N(d.spend), impressions: N(d.impressions), clicks: N(d.clicks),
      ctr: N(d.ctr), leads: leadsOf(d.actions), conversions: convOf(d.actions) }));
}

/* ---------- entities ---------- */
async function entities(level, idKey, nameKey, since, until, fields, limit) {
  return (await gall(`act_${ACCT}/insights`, { level, time_range: tr(since, until), limit: String(limit), fields }))
    .map((r) => shape(r, idKey, nameKey));
}
async function statusMap(edge) {
  const m = {}; try { for (const e of await gall(`act_${ACCT}/${edge}`, { fields: "id,effective_status", limit: "2000" })) m[e.id] = e.effective_status; } catch (_) {}
  return m;
}
async function objectiveMap() {
  const m = {}; try { for (const c of await gall(`act_${ACCT}/campaigns`, { fields: "id,objective", limit: "500" })) m[c.id] = c.objective; } catch (_) {}
  return m;
}

/* ---------- aggregation ---------- */
const blankAgg = () => ({ spend: 0, impressions: 0, clicks: 0, leads: 0, conversions: 0 });
const addAgg = (t, e) => { t.spend += e.spend; t.impressions += e.impressions; t.clicks += e.clicks; t.leads += e.leads; t.conversions += e.conversions; };
function finishAgg(t, kind) {
  const ctr = t.impressions ? (t.clicks / t.impressions) * 100 : 0;
  const cpc = t.clicks ? t.spend / t.clicks : 0;
  const result = kind === "leads" ? t.leads : (kind === "conversions" ? t.conversions : t.leads + t.conversions);
  return { ...t, ctr, cpc, result, costPer: result > 0 ? t.spend / result : null };
}

async function buildOverview(since, until, includePaused) {
  const prev = previousWindow(since, until);
  const [cur, previous, series, camps, campsPrev, sets, setsPrev, ads, objMap, csA, ssA, asA, setDaily] = await Promise.all([
    accountTotals(since, until), accountTotals(prev.since, prev.until), dailySeries(since, until),
    entities("campaign", "campaign_id", "campaign_name", since, until,
      "campaign_id,campaign_name,objective,spend,impressions,clicks,ctr,cpc,cpm,actions", 300),
    entities("campaign", "campaign_id", "campaign_name", prev.since, prev.until,
      "campaign_id,campaign_name,spend,impressions,clicks,ctr,cpc,cpm,actions", 300),
    entities("adset", "adset_id", "adset_name", since, until,
      "adset_id,adset_name,campaign_id,spend,impressions,clicks,ctr,cpc,cpm,actions", 500),
    entities("adset", "adset_id", "adset_name", prev.since, prev.until,
      "adset_id,adset_name,campaign_id,spend,impressions,clicks,ctr,cpc,cpm,actions", 500),
    entities("ad", "ad_id", "ad_name", since, until,
      "ad_id,ad_name,adset_id,campaign_id,spend,impressions,clicks,ctr,cpc,cpm,actions", 600),
    objectiveMap(), statusMap("campaigns"), statusMap("adsets"), statusMap("ads"),
    gall(`act_${ACCT}/insights`, { level: "adset", time_range: tr(since, until), time_increment: "1",
      fields: "adset_id,adset_name,campaign_id,spend,clicks,actions", limit: "500" }),
  ]);

  camps.forEach((c) => { c.objective = objMap[c.id]; c.goal = classifyGoal(c.objective); c.market = classifyMarket(c.name); c.status = csA[c.id] || "UNKNOWN"; });
  const goalByCampaign = {}; camps.forEach((c) => (goalByCampaign[c.id] = c.goal));
  const cPrev = {}; campsPrev.forEach((c) => (cPrev[c.id] = c));
  camps.forEach((c) => { const p = cPrev[c.id], curR = primaryFor(c.goal, c).value, prevR = p ? primaryFor(c.goal, p).value : 0;
    c.resultValue = curR; c.resultLabel = primaryFor(c.goal, c).label; c.spendPrev = p ? p.spend : 0;
    c.resultPrev = prevR; c.resultDelta = curR - prevR; c.spendDelta = c.spend - c.spendPrev; });

  const tagSet = (s) => { s.market = classifyMarket(s.name); s.goal = goalByCampaign[s.campaign_id] || "Other";
    const pr = primaryFor(s.goal, s); s.resultLabel = pr.label; s.resultValue = pr.value; s.costPer = pr.value > 0 ? s.spend / pr.value : null; };
  sets.forEach((s) => { tagSet(s); s.status = ssA[s.id] || "UNKNOWN"; });
  setsPrev.forEach(tagSet);
  ads.forEach((a) => { const parent = sets.find((s) => s.id === a.adset_id);
    a.market = parent ? parent.market : classifyMarket(a.name); a.goal = parent ? parent.goal : "Other";
    const pr = primaryFor(a.goal, a); a.resultLabel = pr.label; a.resultValue = pr.value; a.costPer = pr.value > 0 ? a.spend / pr.value : null; a.status = asA[a.id] || "UNKNOWN"; });

  const active = (e) => /ACTIVE/i.test(e.status || "");
  const setsScope = includePaused ? sets : sets.filter((s) => active(s) || s.spend > 0);

  // markets
  const mAgg = {}, mAggP = {}; MARKETS.forEach((m) => { mAgg[m] = blankAgg(); mAggP[m] = blankAgg(); });
  setsScope.forEach((s) => addAgg(mAgg[s.market], s));
  setsPrev.forEach((s) => addAgg(mAggP[s.market], s));
  let markets = MARKETS.map((m) => {
    const c2 = finishAgg({ ...mAgg[m] }, "both"), pv = finishAgg({ ...mAggP[m] }, "both");
    return { market: m, ...c2, spendPrev: pv.spend, resultPrev: pv.result, spendShare: 0,
      costPerLead: mAgg[m].leads ? mAgg[m].spend / mAgg[m].leads : null,
      costPerConv: mAgg[m].conversions ? mAgg[m].spend / mAgg[m].conversions : null };
  }).filter((m) => m.spend > 0 || m.result > 0);
  const totSpend = markets.reduce((a, b) => a + b.spend, 0) || 1;
  markets.forEach((m) => (m.spendShare = (m.spend / totSpend) * 100));

  // goals
  const gAgg = {}; GOALS.forEach((g) => (gAgg[g] = blankAgg()));
  setsScope.forEach((s) => addAgg(gAgg[s.goal], s));
  const goals = GOALS.map((g) => {
    const kind = g === "Leads" ? "leads" : (g === "Conversions" ? "conversions" : "both");
    return { goal: g, ...finishAgg({ ...gAgg[g] }, kind) };
  }).filter((g) => g.spend > 0 || g.result > 0);

  // matrix market x goal
  const cell = {}; MARKETS.forEach((m) => { cell[m] = {}; GOALS.forEach((g) => (cell[m][g] = blankAgg())); });
  setsScope.forEach((s) => addAgg(cell[s.market][s.goal], s));
  const matrix = { markets: MARKETS, goals: ["Leads", "Conversions"], cells: {} };
  MARKETS.forEach((m) => { matrix.cells[m] = {}; ["Leads", "Conversions"].forEach((g) => {
    const kind = g === "Leads" ? "leads" : "conversions";
    const f = finishAgg({ ...cell[m][g] }, kind);
    matrix.cells[m][g] = { spend: f.spend, result: f.result, costPer: f.costPer };
  }); });

  // per-market daily series (spend + goal result)
  const setMarket = {}; sets.forEach((s) => (setMarket[s.id] = s.market));
  const dayMap = {};
  for (const r of setDaily) {
    const m = setMarket[r.adset_id] || classifyMarket(r.adset_name);
    const goal = goalByCampaign[r.campaign_id] || "Other";
    const d = r.date_start; dayMap[d] = dayMap[d] || {}; dayMap[d][m] = dayMap[d][m] || { spend: 0, result: 0 };
    dayMap[d][m].spend += N(r.spend);
    dayMap[d][m].result += goal === "Leads" ? leadsOf(r.actions) : convOf(r.actions);
  }
  const seriesByMarket = {}; MARKETS.forEach((m) => (seriesByMarket[m] = []));
  Object.keys(dayMap).sort().forEach((d) => MARKETS.forEach((m) =>
    seriesByMarket[m].push({ date: d, spend: (dayMap[d][m] || {}).spend || 0, result: (dayMap[d][m] || {}).result || 0 })));

  // per-goal daily series (spend + result + cost per result) for CPA trend
  const goalDay = {};
  for (const r of setDaily) {
    const goal = goalByCampaign[r.campaign_id] || "Other"; const d = r.date_start;
    goalDay[d] = goalDay[d] || {}; goalDay[d][goal] = goalDay[d][goal] || { spend: 0, result: 0 };
    goalDay[d][goal].spend += N(r.spend);
    goalDay[d][goal].result += goal === "Leads" ? leadsOf(r.actions) : convOf(r.actions);
  }
  const seriesByGoal = { Leads: [], Conversions: [] };
  Object.keys(goalDay).sort().forEach((d) => ["Leads", "Conversions"].forEach((g) => {
    const x = goalDay[d][g] || { spend: 0, result: 0 };
    seriesByGoal[g].push({ date: d, spend: x.spend, result: x.result, costPer: x.result > 0 ? x.spend / x.result : null });
  }));

  // funnel = the conversion path, ending at the Dashboard conversion (no registrations)
  const funnel = [
    { stage: "Impressions", value: cur.impressions },
    { stage: "Link clicks", value: cur.linkClicks || cur.clicks },
    { stage: "Landing page views", value: cur.lpViews },
    { stage: "Conversions", value: cur.conversions },
  ];

  // hour-of-day performance (advertiser timezone)
  let byHour = [];
  try {
    byHour = (await gall(`act_${ACCT}/insights`, { time_range: tr(since, until),
      breakdowns: "hourly_stats_aggregated_by_advertiser_time_zone", fields: "spend,clicks,actions", limit: "50" }))
      .map((r) => ({ hour: String(r.hourly_stats_aggregated_by_advertiser_time_zone || "").slice(0, 2),
        spend: N(r.spend), clicks: N(r.clicks), leads: leadsOf(r.actions), conversions: convOf(r.actions) }))
      .sort((a, b) => a.hour.localeCompare(b.hour));
  } catch (_) {}

  // leaderboard by cost per result (per goal)
  const lb = setsScope.filter((s) => s.spend > 0 && s.costPer != null);
  const best = lb.slice().sort((a, b) => a.costPer - b.costPer).slice(0, 5);
  const worst = lb.slice().sort((a, b) => b.costPer - a.costPer).slice(0, 5);

  // alerts
  const alerts = [];
  const avgLead = cur.costPerLead, avgConv = cur.costPerConv;
  setsScope.forEach((s) => {
    if (active(s) && s.spend >= 500 && s.resultValue === 0)
      alerts.push({ severity: "high", text: `“${s.name}” spent ${Math.round(s.spend)} NOK with 0 ${s.resultLabel}.`, market: s.market });
    const avg = s.goal === "Leads" ? avgLead : avgConv;
    if (avg && s.costPer && s.costPer > avg * 2 && s.spend >= 300)
      alerts.push({ severity: "med", text: `“${s.name}” cost/${s.resultLabel.replace(/s$/, "")} is ${Math.round(s.costPer)} — over 2× account avg.`, market: s.market });
  });
  camps.forEach((c) => { if (c.resultPrev >= 5 && c.resultDelta < 0 && Math.abs(c.resultDelta) / c.resultPrev > 0.4)
    alerts.push({ severity: "med", text: `“${c.name}” ${c.resultLabel} down ${Math.round(Math.abs(c.resultDelta) / c.resultPrev * 100)}% vs last period.`, market: c.market }); });

  return { currency: "NOK", generated_at: new Date().toISOString(), range: { since, until }, previousRange: prev,
    includePaused: !!includePaused, current: cur, previous, series, seriesByMarket, seriesByGoal, byHour, funnel,
    markets, goals, matrix, leaderboard: { best, worst }, alerts, campaigns: camps, adsets: sets, ads };
}

/* ---------- breakdowns ---------- */
async function breakdown(dim, since, until) {
  return (await gall(`act_${ACCT}/insights`, { time_range: tr(since, until), breakdowns: dim, limit: "300",
    fields: "spend,impressions,clicks,ctr,actions" }))
    .map((r) => ({ key: r[dim] ?? "(unknown)", spend: N(r.spend), impressions: N(r.impressions), clicks: N(r.clicks),
      ctr: N(r.ctr), leads: leadsOf(r.actions), conversions: convOf(r.actions),
      result: leadsOf(r.actions) + convOf(r.actions) }))
    .sort((a, b) => b.spend - a.spend);
}
async function buildBreakdowns(since, until) {
  const [country, placement, device, age, gender] = await Promise.all([
    breakdown("country", since, until), breakdown("publisher_platform", since, until),
    breakdown("impression_device", since, until), breakdown("age", since, until), breakdown("gender", since, until),
  ]);
  return { currency: "NOK", generated_at: new Date().toISOString(), range: { since, until }, country, placement, device, age, gender };
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

  const action = body.action === "breakdowns" ? "breakdowns" : "overview";
  let since = body.since, until = body.until;
  if (!DATE_RE.test(since || "") || !DATE_RE.test(until || "")) {
    const u = new Date(), s = new Date(); s.setUTCDate(s.getUTCDate() - 29); since = isoDay(s); until = isoDay(u);
  }
  if (since > until) { const t = since; since = until; until = t; }
  const includePaused = !!body.includePaused;
  const key = `${action}:${since}:${until}:${includePaused}`;
  const hit = CACHE.get(key);
  if (hit && Date.now() - hit.at < CACHE_TTL_MS) return res.status(200).json({ ...hit.payload, cached: true });

  try {
    const payload = action === "breakdowns" ? await buildBreakdowns(since, until) : await buildOverview(since, until, includePaused);
    CACHE.set(key, { at: Date.now(), payload });
    return res.status(200).json(payload);
  } catch (e) { return res.status(502).json({ error: "Meta API error: " + e.message }); }
}

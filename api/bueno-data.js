// api/bueno-data.js  (v4)
// Password-gated, server-side Meta Ads data for the Bueno dashboard.
//
// TWO co-equal goals:
//   • Leads        — measured by lead events (leadgen / lead_grouped).
//   • Conversions  — measured by the "Registration Page" custom pixel event
//                    (offsite_conversion.fb_pixel_custom.Registration Page).
//                    This is the tracked goal for active register/sales campaigns.
//
// NORTH-STAR final conversion:
//   • "Dashboard" custom pixel event (offsite_conversion.fb_pixel_custom.Dashboard)
//     is the deepest funnel point. Older / paused campaigns optimised directly to it.
//     It is reported as the final conversion (north-star), NOT as the per-campaign goal.
//
// Market (Norwegian/Swedish/English/Other) + goal segmentation, market×goal matrix,
// per-market daily trends, efficiency leaderboard, CEO insights, alerts.
// Token never leaves the server.
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
// CONVERSION GOAL = "Registration Page" custom pixel event ONLY.
// Must NOT match "Registration Success" (a separate, deeper event we do not track).
const regsOf = (a) => {
  if (!Array.isArray(a)) return 0; let r = 0;
  for (const x of a) { const t = (x.action_type || "").toLowerCase();
    if (t.includes("registration page")) r += N(x.value); }
  return r;
};
// NORTH-STAR final conversion = "Dashboard" custom pixel event (deepest / legacy)
const dashOf = (a) => {
  if (!Array.isArray(a)) return 0; let r = 0;
  for (const x of a) { const t = (x.action_type || "").toLowerCase();
    if (t.includes("fb_pixel_custom") && t.includes("dashboard")) r += N(x.value); }
  return r;
};
const linkClicksOf = (a) => actionVal(a, ["link_click"]);
const lpViewsOf = (a) => actionVal(a, ["landing_page_view"]);
// IMPORTANT: custom pixel events (Registration Page, Dashboard) live in the `conversions`
// field, NOT `actions`. Leads/clicks/LP-views live in `actions`. Merge both before extracting.
const acts = (row) => [].concat(row && row.actions ? row.actions : [], row && row.conversions ? row.conversions : []);
const INSIGHT_METRIC_FIELDS = "spend,impressions,reach,frequency,clicks,ctr,cpc,cpm,actions,conversions";

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
  const spend = N(row.spend); const a = acts(row);
  return {
    id: row[idKey], name: row[nameKey] || "(unnamed)",
    campaign_id: row.campaign_id || null, adset_id: row.adset_id || null,
    spend, impressions: N(row.impressions), clicks: N(row.clicks),
    ctr: N(row.ctr), cpc: N(row.cpc), cpm: N(row.cpm),
    leads: leadsOf(a), registrations: regsOf(a), dashboard: dashOf(a),
    linkClicks: linkClicksOf(a), lpViews: lpViewsOf(a),
  };
}
// primary result by goal: Leads -> leads, Conversions -> registrations (Registration Page)
function primaryFor(goal, e) {
  if (goal === "Leads") return { label: "leads", value: e.leads };
  return { label: "registrations", value: e.registrations };
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
    fields: INSIGHT_METRIC_FIELDS }))[0] || {};
  const m = acts(a);
  const spend = N(a.spend), leads = leadsOf(m), regs = regsOf(m), dash = dashOf(m);
  return { spend, impressions: N(a.impressions), reach: N(a.reach), frequency: N(a.frequency),
    clicks: N(a.clicks), ctr: N(a.ctr), cpc: N(a.cpc), cpm: N(a.cpm),
    linkClicks: linkClicksOf(m), lpViews: lpViewsOf(m),
    leads, registrations: regs, dashboard: dash,
    costPerLead: leads ? spend / leads : null,
    costPerReg: regs ? spend / regs : null,
    costPerDash: dash ? spend / dash : null,
    date_start: a.date_start || since, date_stop: a.date_stop || until };
}
async function dailySeries(since, until) {
  return (await gall(`act_${ACCT}/insights`, { time_range: tr(since, until), time_increment: "1",
    fields: "spend,impressions,clicks,ctr,actions,conversions" }))
    .map((d) => { const m = acts(d); return { date: d.date_start, spend: N(d.spend), impressions: N(d.impressions), clicks: N(d.clicks),
      ctr: N(d.ctr), linkClicks: linkClicksOf(m), leads: leadsOf(m), registrations: regsOf(m), dashboard: dashOf(m) }; });
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
const blankAgg = () => ({ spend: 0, impressions: 0, clicks: 0, linkClicks: 0, leads: 0, registrations: 0, dashboard: 0 });
const addAgg = (t, e) => { t.spend += e.spend; t.impressions += e.impressions; t.clicks += e.clicks; t.linkClicks += (e.linkClicks || 0); t.leads += e.leads; t.registrations += e.registrations; t.dashboard += e.dashboard; };
function finishAgg(t, kind) {
  const ctr = t.impressions ? (t.clicks / t.impressions) * 100 : 0;
  const cpc = t.clicks ? t.spend / t.clicks : 0;
  const result = kind === "leads" ? t.leads : (kind === "conversions" ? t.registrations : t.leads + t.registrations);
  return { ...t, ctr, cpc, result, costPer: result > 0 ? t.spend / result : null };
}

async function buildOverview(since, until, includePaused) {
  const prev = previousWindow(since, until);
  const [cur, previous, series, seriesPrev, camps, campsPrev, sets, setsPrev, ads, objMap, csA, ssA, asA, setDaily] = await Promise.all([
    accountTotals(since, until), accountTotals(prev.since, prev.until), dailySeries(since, until), dailySeries(prev.since, prev.until),
    entities("campaign", "campaign_id", "campaign_name", since, until,
      "campaign_id,campaign_name,objective,spend,impressions,clicks,ctr,cpc,cpm,actions,conversions", 300),
    entities("campaign", "campaign_id", "campaign_name", prev.since, prev.until,
      "campaign_id,campaign_name,spend,impressions,clicks,ctr,cpc,cpm,actions,conversions", 300),
    entities("adset", "adset_id", "adset_name", since, until,
      "adset_id,adset_name,campaign_id,spend,impressions,clicks,ctr,cpc,cpm,actions,conversions", 500),
    entities("adset", "adset_id", "adset_name", prev.since, prev.until,
      "adset_id,adset_name,campaign_id,spend,impressions,clicks,ctr,cpc,cpm,actions,conversions", 500),
    entities("ad", "ad_id", "ad_name", since, until,
      "ad_id,ad_name,adset_id,campaign_id,spend,impressions,clicks,ctr,cpc,cpm,actions,conversions", 600),
    objectiveMap(), statusMap("campaigns"), statusMap("adsets"), statusMap("ads"),
    gall(`act_${ACCT}/insights`, { level: "adset", time_range: tr(since, until), time_increment: "1",
      fields: "adset_id,adset_name,campaign_id,spend,clicks,actions,conversions", limit: "500" }),
  ]);

  camps.forEach((c) => { c.objective = objMap[c.id]; c.goal = classifyGoal(c.objective); c.market = classifyMarket(c.name); c.status = csA[c.id] || "UNKNOWN"; });
  const goalByCampaign = {}; camps.forEach((c) => (goalByCampaign[c.id] = c.goal));
  const cPrev = {}; campsPrev.forEach((c) => (cPrev[c.id] = c));
  camps.forEach((c) => { const p = cPrev[c.id], curR = primaryFor(c.goal, c).value, prevR = p ? primaryFor(c.goal, p).value : 0;
    c.resultValue = curR; c.resultLabel = primaryFor(c.goal, c).label; c.spendPrev = p ? p.spend : 0;
    c.resultPrev = prevR; c.resultDelta = curR - prevR; c.spendDelta = c.spend - c.spendPrev;
    c.costPer = curR > 0 ? c.spend / curR : null; });

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
      costPerReg: mAgg[m].registrations ? mAgg[m].spend / mAgg[m].registrations : null };
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
    const d = r.date_start; dayMap[d] = dayMap[d] || {};
    dayMap[d][m] = dayMap[d][m] || { spend: 0, result: 0, linkClicks: 0, registrations: 0, dashboard: 0, leads: 0 };
    const cell = dayMap[d][m]; const ra = acts(r);
    cell.spend += N(r.spend);
    cell.linkClicks += linkClicksOf(ra);
    cell.registrations += regsOf(ra);
    cell.dashboard += dashOf(ra);
    cell.leads += leadsOf(ra);
    cell.result += goal === "Leads" ? leadsOf(ra) : regsOf(ra);
  }
  const seriesByMarket = {}; MARKETS.forEach((m) => (seriesByMarket[m] = []));
  Object.keys(dayMap).sort().forEach((d) => MARKETS.forEach((m) => { const x = dayMap[d][m] || {};
    seriesByMarket[m].push({ date: d, spend: x.spend || 0, result: x.result || 0, linkClicks: x.linkClicks || 0,
      registrations: x.registrations || 0, dashboard: x.dashboard || 0, leads: x.leads || 0,
      costPer: x.result > 0 ? x.spend / x.result : null }); }));

  // per-goal daily series (spend + result + cost per result) for CPA trend
  const goalDay = {};
  for (const r of setDaily) {
    const goal = goalByCampaign[r.campaign_id] || "Other"; const d = r.date_start; const ra = acts(r);
    goalDay[d] = goalDay[d] || {}; goalDay[d][goal] = goalDay[d][goal] || { spend: 0, result: 0 };
    goalDay[d][goal].spend += N(r.spend);
    goalDay[d][goal].result += goal === "Leads" ? leadsOf(ra) : regsOf(ra);
  }
  const seriesByGoal = { Leads: [], Conversions: [] };
  Object.keys(goalDay).sort().forEach((d) => ["Leads", "Conversions"].forEach((g) => {
    const x = goalDay[d][g] || { spend: 0, result: 0 };
    seriesByGoal[g].push({ date: d, spend: x.spend, result: x.result, costPer: x.result > 0 ? x.spend / x.result : null });
  }));

  // funnel = the conversion path: clicks -> LP views -> Registration Page (goal) -> Dashboard (final)
  const funnel = [
    { stage: "Impressions", value: cur.impressions },
    { stage: "Link clicks", value: cur.linkClicks || cur.clicks },
    { stage: "Landing page views", value: cur.lpViews },
    { stage: "Registrations", value: cur.registrations },
    { stage: "Dashboard (final)", value: cur.dashboard },
  ];

  // hour-of-day performance (advertiser timezone)
  let byHour = [];
  try {
    byHour = (await gall(`act_${ACCT}/insights`, { time_range: tr(since, until),
      breakdowns: "hourly_stats_aggregated_by_advertiser_time_zone", fields: "spend,clicks,actions,conversions", limit: "50" }))
      .map((r) => { const ra = acts(r); return { hour: String(r.hourly_stats_aggregated_by_advertiser_time_zone || "").slice(0, 2),
        spend: N(r.spend), clicks: N(r.clicks), leads: leadsOf(ra), registrations: regsOf(ra) }; })
      .sort((a, b) => a.hour.localeCompare(b.hour));
  } catch (_) {}

  // leaderboard by cost per result (per goal)
  const lb = setsScope.filter((s) => s.spend > 0 && s.costPer != null);
  const best = lb.slice().sort((a, b) => a.costPer - b.costPer).slice(0, 5);
  const worst = lb.slice().sort((a, b) => b.costPer - a.costPer).slice(0, 5);

  // alerts
  const alerts = [];
  const avgLead = cur.costPerLead, avgReg = cur.costPerReg;
  setsScope.forEach((s) => {
    if (active(s) && s.spend >= 500 && s.resultValue === 0)
      alerts.push({ severity: "high", text: `“${s.name}” spent ${Math.round(s.spend)} NOK with 0 ${s.resultLabel}.`, market: s.market });
    const avg = s.goal === "Leads" ? avgLead : avgReg;
    if (avg && s.costPer && s.costPer > avg * 2 && s.spend >= 300)
      alerts.push({ severity: "med", text: `“${s.name}” cost/${s.resultLabel.replace(/s$/, "")} is ${Math.round(s.costPer)} — over 2× account avg.`, market: s.market });
  });
  camps.forEach((c) => { if (c.resultPrev >= 5 && c.resultDelta < 0 && Math.abs(c.resultDelta) / c.resultPrev > 0.4)
    alerts.push({ severity: "med", text: `“${c.name}” ${c.resultLabel} down ${Math.round(Math.abs(c.resultDelta) / c.resultPrev * 100)}% vs last period.`, market: c.market }); });

  const insights = buildInsights({ since, until, prev, cur, previous, markets, goals, matrix, leaderboard: { best, worst }, seriesByGoal, byHour, camps, alerts });

  return { currency: "NOK", generated_at: new Date().toISOString(), range: { since, until }, previousRange: prev,
    includePaused: !!includePaused, current: cur, previous, series, seriesPrev, seriesByMarket, seriesByGoal, byHour, funnel,
    markets, goals, matrix, leaderboard: { best, worst }, alerts, insights, campaigns: camps, adsets: sets, ads };
}

/* ---------- CEO insights (narrative, prioritised) ---------- */
function pct(cur, prev) { if (!prev) return null; return ((cur - prev) / prev) * 100; }
function nok(x) { return Math.round(N(x)).toLocaleString("en-US"); }
function dir(p) { return p == null ? "" : (p >= 0 ? "up" : "down"); }
function buildInsights(d) {
  const { cur, previous, markets, goals, leaderboard, byHour, camps } = d;
  const out = [];
  const days = Math.round((new Date(d.until) - new Date(d.since)) / 864e5) + 1;

  // 1) Headline — spend + the two goals + the north-star
  const spendP = pct(cur.spend, previous.spend);
  out.push({
    kind: "headline", tone: "neutral",
    title: "Where the money went",
    metric: `${nok(cur.spend)} NOK`,
    sub: `over ${days} days` + (spendP != null ? ` · ${dir(spendP)} ${Math.abs(spendP).toFixed(0)}% vs the prior ${days} days` : ""),
    body: `That spend produced ${nok(cur.leads)} leads and ${nok(cur.registrations)} registrations, with ${nok(cur.dashboard)} reaching the Dashboard — the final conversion.`
  });

  // 2) The two goals, side by side
  const lead = goals.find((g) => g.goal === "Leads");
  const conv = goals.find((g) => g.goal === "Conversions");
  if (lead || conv) {
    const parts = [];
    if (lead && lead.result) parts.push(`Leads cost ${nok(lead.costPer)} NOK each (${nok(lead.result)} leads on ${nok(lead.spend)} NOK).`);
    if (conv && conv.result) parts.push(`Registrations cost ${nok(conv.costPer)} NOK each (${nok(conv.result)} on ${nok(conv.spend)} NOK).`);
    if (parts.length) out.push({ kind: "goals", tone: "neutral", title: "Cost of the two goals", metric: cur.costPerReg ? `${nok(cur.costPerReg)} NOK / reg` : (cur.costPerLead ? `${nok(cur.costPerLead)} NOK / lead` : "—"), sub: "blended cost per result", body: parts.join(" ") });
  }

  // 3) Best market by efficiency
  const mWithReg = markets.filter((m) => m.result > 0 && m.costPer != null);
  if (mWithReg.length) {
    const bestM = mWithReg.slice().sort((a, b) => a.costPer - b.costPer)[0];
    const worstM = mWithReg.slice().sort((a, b) => b.costPer - a.costPer)[0];
    let body = `${bestM.market} is the most efficient market at ${nok(bestM.costPer)} NOK per result on ${nok(bestM.spend)} NOK spend (${(bestM.spendShare).toFixed(0)}% of budget).`;
    if (worstM && worstM.market !== bestM.market) body += ` ${worstM.market} is the most expensive at ${nok(worstM.costPer)} NOK — worth a closer look.`;
    out.push({ kind: "market", tone: "good", title: "Most efficient market", metric: bestM.market, sub: `${nok(bestM.costPer)} NOK / result`, body });
  }

  // 4) What moved — biggest campaign mover vs prior period
  const movers = (camps || []).filter((c) => c.resultPrev >= 3).map((c) => ({ ...c, chg: pct(c.resultValue, c.resultPrev) })).filter((c) => c.chg != null);
  const up = movers.slice().sort((a, b) => b.chg - a.chg)[0];
  const down = movers.slice().sort((a, b) => a.chg - b.chg)[0];
  if (up && up.chg > 10) out.push({ kind: "mover", tone: "good", title: "Biggest gainer", metric: `+${up.chg.toFixed(0)}%`, sub: up.resultLabel + " vs prior period", body: `“${up.name}” grew from ${nok(up.resultPrev)} to ${nok(up.resultValue)} ${up.resultLabel}. Consider scaling budget here.` });
  if (down && down.chg < -10 && (!up || down.name !== up.name)) out.push({ kind: "mover", tone: "bad", title: "Biggest decliner", metric: `${down.chg.toFixed(0)}%`, sub: down.resultLabel + " vs prior period", body: `“${down.name}” fell from ${nok(down.resultPrev)} to ${nok(down.resultValue)} ${down.resultLabel}. Check creative fatigue or audience saturation.` });

  // 5) Best / worst ad set on cost
  if (leaderboard.best && leaderboard.best[0]) {
    const b = leaderboard.best[0];
    out.push({ kind: "leader", tone: "good", title: "Cheapest result", metric: `${nok(b.costPer)} NOK`, sub: `per ${b.resultLabel.replace(/s$/, "")}`, body: `“${b.name}” (${b.market}) is your most efficient ad set — ${nok(b.resultValue)} ${b.resultLabel} at ${nok(b.costPer)} NOK each.` });
  }
  if (leaderboard.worst && leaderboard.worst[0] && leaderboard.worst[0].costPer > (cur.costPerReg || cur.costPerLead || 0) * 1.5) {
    const w = leaderboard.worst[0];
    out.push({ kind: "leader", tone: "bad", title: "Most expensive result", metric: `${nok(w.costPer)} NOK`, sub: `per ${w.resultLabel.replace(/s$/, "")}`, body: `“${w.name}” (${w.market}) costs ${nok(w.costPer)} NOK per ${w.resultLabel.replace(/s$/, "")} — trim or rework it.` });
  }

  // 6) Timing
  if (byHour && byHour.length) {
    const withRes = byHour.map((h) => ({ ...h, res: (h.leads || 0) + (h.registrations || 0) })).filter((h) => h.res > 0);
    if (withRes.length) {
      const top = withRes.slice().sort((a, b) => b.res - a.res).slice(0, 3).map((h) => `${h.hour}:00`);
      out.push({ kind: "timing", tone: "neutral", title: "Best hours", metric: top[0], sub: "peak conversion hour", body: `Most results land around ${top.join(", ")} (advertiser time). Dayparting budget toward these windows can lift efficiency.` });
    }
  }

  // 7) Efficiency trend (CPA direction)
  const cg = d.seriesByGoal && d.seriesByGoal.Conversions ? d.seriesByGoal.Conversions.filter((x) => x.costPer != null) : [];
  if (cg.length >= 6) {
    const half = Math.floor(cg.length / 2);
    const a = cg.slice(0, half), b = cg.slice(half);
    const avg = (xs) => xs.reduce((s, x) => s + x.costPer, 0) / xs.length;
    const trend = pct(avg(b), avg(a));
    if (trend != null && Math.abs(trend) > 8) {
      const good = trend < 0;
      out.push({ kind: "trend", tone: good ? "good" : "bad", title: good ? "Registration cost is improving" : "Registration cost is rising", metric: `${trend > 0 ? "+" : ""}${trend.toFixed(0)}%`, sub: "cost / registration, 2nd half vs 1st", body: good ? "Your cost per registration trended down across the window — efficiency is compounding." : "Cost per registration drifted up across the window — investigate frequency, fatigue, or audience size." });
    }
  }

  // 8) Funnel efficiency — click → registration
  const clicks = cur.linkClicks || cur.clicks || 0;
  if (clicks && cur.registrations) {
    const c2r = (cur.registrations / clicks) * 100;
    const prevClicks = previous.linkClicks || previous.clicks || 0;
    const c2rPrev = prevClicks && previous.registrations ? (previous.registrations / prevClicks) * 100 : null;
    const dlt = c2rPrev != null ? pct(c2r, c2rPrev) : null;
    out.push({ kind: "funnel", tone: dlt == null ? "neutral" : (dlt >= 0 ? "good" : "bad"),
      title: "Click → registration rate", metric: `${c2r.toFixed(1)}%`,
      sub: dlt != null ? `${dlt >= 0 ? "+" : ""}${dlt.toFixed(0)}% vs prior period` : "of link clicks register",
      body: `${nok(clicks)} link clicks produced ${nok(cur.registrations)} registrations. Every 1pp lift here is roughly ${nok(clicks / 100)} more registrations at no extra spend — a landing-page and offer lever, not a media one.` });
  }

  // 9) Registration → Dashboard quality
  if (cur.registrations && cur.dashboard) {
    const r2d = (cur.dashboard / cur.registrations) * 100;
    out.push({ kind: "quality", tone: r2d >= 15 ? "good" : "bad",
      title: "Registration → Dashboard", metric: `${r2d.toFixed(0)}%`, sub: "of registrations reach the final step",
      body: `${nok(cur.dashboard)} of ${nok(cur.registrations)} registrations made it to the Dashboard. ${r2d >= 15 ? "That hand-off is holding up." : "A large drop here is a product/onboarding problem, not a media one — worth flagging to the product team."}` });
  }

  // 10) Pacing & projection
  if (days >= 3 && cur.spend) {
    const perDay = cur.spend / days;
    const projReg = (cur.registrations / days) * 30, projLead = (cur.leads / days) * 30;
    out.push({ kind: "pacing", tone: "neutral", title: "Run-rate & projection", metric: `${nok(perDay)} NOK/day`,
      sub: "at the current pace", body: `That projects to ${nok(perDay * 30)} NOK over 30 days, delivering roughly ${nok(projReg)} registrations and ${nok(projLead)} leads if efficiency holds.` });
  }

  // 11) Spend concentration
  const spenders = (camps || []).filter((c) => c.spend > 0).sort((a, b) => b.spend - a.spend);
  if (spenders.length >= 2) {
    const top = spenders[0], totalCamp = spenders.reduce((s, c) => s + c.spend, 0) || 1;
    const share = (top.spend / totalCamp) * 100;
    out.push({ kind: "concentration", tone: share > 70 ? "bad" : "neutral",
      title: "Budget concentration", metric: `${share.toFixed(0)}%`, sub: `in “${top.name}”`,
      body: `${share.toFixed(0)}% of spend sits in one campaign across ${spenders.length} active campaigns. ${share > 70 ? "That's heavy concentration — one campaign's swing moves the whole account, so watch it closely." : "Spread is reasonable; no single campaign dominates the account."}` });
  }

  // 12) Recommendation — synthesised next action
  const recs = [];
  if (up && up.chg > 15) recs.push(`scale “${up.name}” while it's compounding`);
  if (leaderboard.worst && leaderboard.worst[0] && leaderboard.worst[0].costPer > (cur.costPerReg || cur.costPerLead || 0) * 1.8)
    recs.push(`cut or rework “${leaderboard.worst[0].name}” (worst cost per result)`);
  const mEff = markets.filter((m) => m.result > 0 && m.costPer != null).sort((a, b) => a.costPer - b.costPer)[0];
  if (mEff) recs.push(`shift budget toward ${mEff.market}, your cheapest market`);
  if (recs.length) out.push({ kind: "reco", tone: "neutral", title: "What I'd do next", metric: "Priorities", sub: "this week",
    body: recs.slice(0, 3).map((r, i) => `${i + 1}. ${r[0].toUpperCase() + r.slice(1)}.`).join(" ") });

  return out;
}

/* ---------- breakdowns ---------- */
async function breakdown(dim, since, until) {
  return (await gall(`act_${ACCT}/insights`, { time_range: tr(since, until), breakdowns: dim, limit: "300",
    fields: "spend,impressions,clicks,ctr,actions,conversions" }))
    .map((r) => { const ra = acts(r); return { key: r[dim] ?? "(unknown)", spend: N(r.spend), impressions: N(r.impressions), clicks: N(r.clicks),
      ctr: N(r.ctr), linkClicks: linkClicksOf(ra), leads: leadsOf(ra), registrations: regsOf(ra), dashboard: dashOf(ra),
      result: leadsOf(ra) + regsOf(ra) }; })
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

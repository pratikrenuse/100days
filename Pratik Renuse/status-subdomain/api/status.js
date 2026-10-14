// status.pratikrenuse.com aggregator
// Vercel serverless function. Reads server metrics from Supabase, DeepSeek balance,
// and Anthropic spend (org accounts only). Gated by a shared password.
//
// Required env vars (set in the Vercel project for the status subdomain):
//   STATUS_PASSWORD       the password the dashboard asks for
//   SUPABASE_URL          e.g. https://naqkunidxjpgwanfbbiu.supabase.co
//   SUPABASE_SERVICE_KEY  service role key (server side only)
//   DEEPSEEK_API_KEY      DeepSeek API key (for the balance call)
// Optional:
//   ANTHROPIC_ADMIN_KEY   sk-ant-admin... key. Org accounts only. If absent,
//                         the Claude card shows "not configured".

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const ANTHROPIC_ADMIN_KEY = process.env.ANTHROPIC_ADMIN_KEY;
const STATUS_PASSWORD = process.env.STATUS_PASSWORD;

async function getServer() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    return { configured: false, error: "Supabase env vars not set." };
  }
  try {
    const url =
      SUPABASE_URL +
      "/rest/v1/server_status?select=*&order=captured_at.desc&limit=1";
    const res = await fetch(url, {
      headers: {
        apikey: SUPABASE_SERVICE_KEY,
        Authorization: "Bearer " + SUPABASE_SERVICE_KEY,
      },
    });
    if (!res.ok) return { configured: true, error: "Supabase read failed (" + res.status + ")." };
    const rows = await res.json();
    if (!rows.length) return { configured: true, error: "No metrics reported yet." };
    const row = rows[0];
    const m = row.metrics || {};
    const capturedAt = row.captured_at;
    const ageSeconds = capturedAt ? Math.round((Date.now() - new Date(capturedAt).getTime()) / 1000) : null;
    return { configured: true, capturedAt, ageSeconds, metrics: m };
  } catch (e) {
    return { configured: true, error: "Supabase request error: " + e.message };
  }
}

async function getDeepSeek() {
  if (!DEEPSEEK_API_KEY) return { configured: false };
  try {
    const res = await fetch("https://api.deepseek.com/user/balance", {
      headers: { Authorization: "Bearer " + DEEPSEEK_API_KEY },
    });
    if (!res.ok) return { configured: true, error: "DeepSeek API returned " + res.status };
    const data = await res.json();
    const info = (data.balance_infos && data.balance_infos[0]) || {};
    return {
      configured: true,
      isAvailable: data.is_available,
      currency: info.currency || null,
      totalBalance: info.total_balance || null,
      grantedBalance: info.granted_balance || null,
      toppedUpBalance: info.topped_up_balance || null,
    };
  } catch (e) {
    return { configured: true, error: "DeepSeek request error: " + e.message };
  }
}

// Sum the "amount" fields out of an Anthropic cost_report response.
// Amounts are decimal strings in cents, so we divide by 100 for USD.
function sumCostCents(payload) {
  let cents = 0;
  const buckets = payload && payload.data ? payload.data : [];
  for (const bucket of buckets) {
    const results = bucket.results || [];
    for (const r of results) {
      const v = parseFloat(r.amount);
      if (!isNaN(v)) cents += v;
    }
  }
  return cents;
}

async function fetchCost(startISO, endISO) {
  const url =
    "https://api.anthropic.com/v1/organizations/cost_report?starting_at=" +
    encodeURIComponent(startISO) +
    "&ending_at=" +
    encodeURIComponent(endISO);
  const res = await fetch(url, {
    headers: {
      "anthropic-version": "2023-06-01",
      "x-api-key": ANTHROPIC_ADMIN_KEY,
    },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error("Anthropic API " + res.status + ": " + body.slice(0, 160));
  }
  return res.json();
}

async function getClaude() {
  if (!ANTHROPIC_ADMIN_KEY) return { configured: false };
  try {
    const now = new Date();
    const startOfDay = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    const startOfMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
    const endISO = now.toISOString();

    const [monthPayload, dayPayload] = await Promise.all([
      fetchCost(startOfMonth.toISOString(), endISO),
      fetchCost(startOfDay.toISOString(), endISO),
    ]);

    return {
      configured: true,
      currency: "USD",
      spendTodayUsd: +(sumCostCents(dayPayload) / 100).toFixed(2),
      spendMonthUsd: +(sumCostCents(monthPayload) / 100).toFixed(2),
      monthStart: startOfMonth.toISOString().slice(0, 10),
    };
  } catch (e) {
    return { configured: true, error: e.message };
  }
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Use POST." });
    return;
  }
  if (!STATUS_PASSWORD) {
    res.status(500).json({ error: "STATUS_PASSWORD not set on the server." });
    return;
  }
  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  const given = body && body.password;
  if (given !== STATUS_PASSWORD) {
    res.status(401).json({ error: "Wrong password." });
    return;
  }

  const [server, deepseek, claude] = await Promise.all([
    getServer(),
    getDeepSeek(),
    getClaude(),
  ]);

  res.status(200).json({
    generatedAt: new Date().toISOString(),
    server,
    deepseek,
    claude,
  });
};

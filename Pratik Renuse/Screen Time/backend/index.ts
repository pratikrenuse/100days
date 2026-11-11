// Screen Time backend: one Supabase Edge Function.
// Devices authenticate with header x-st-token. The dashboard authenticates with header x-st-pass.
import { createClient } from "npm:@supabase/supabase-js@2";

const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, {
  auth: { persistSession: false },
});
const USER = "pratik";
const TZ = "Asia/Kolkata";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type, x-st-token, x-st-pass",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};
const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { ...CORS, "Content-Type": "application/json" } });

// ---------- auth ----------
let cfgCache: Record<string, string> | null = null;
let cfgAt = 0;
async function cfg(): Promise<Record<string, string>> {
  if (cfgCache && Date.now() - cfgAt < 60_000) return cfgCache;
  const { data } = await db.from("st_config").select("key,value");
  cfgCache = Object.fromEntries((data ?? []).map((r: any) => [r.key, r.value]));
  cfgAt = Date.now();
  return cfgCache!;
}
async function sha256(s: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
async function isDevice(req: Request) {
  const t = req.headers.get("x-st-token");
  if (!t) return false;
  return (await sha256(t.trim())) === (await cfg()).device_token_sha256;
}
// Password guessing protection: after 5 wrong passwords in 15 minutes, password sign-in stops for 15 minutes.
// The device key is 46 random characters and cannot be guessed, so the apps keep working during a lockout.
class LockedOut extends Error {}
async function recentFailures(kind: string) {
  const since = new Date(Date.now() - 15 * 60_000).toISOString();
  const { count } = await db.from("st_auth_failures").select("id", { count: "exact", head: true }).eq("kind", kind).gte("at", since);
  return count ?? 0;
}
async function isOwner(req: Request) {
  // The apps open the dashboard with their device key, so that key also counts as the owner.
  if (await isDevice(req)) return true;
  const p = req.headers.get("x-st-pass");
  if (!p) return false;
  if ((await recentFailures("password")) >= 5) throw new LockedOut();
  const ok = (await sha256(p.trim())) === (await cfg()).dashboard_password_sha256;
  if (!ok) {
    await db.from("st_auth_failures").insert({ kind: "password" });
    if (Math.random() < 0.05) await db.from("st_auth_failures").delete().lt("at", new Date(Date.now() - 86400_000).toISOString());
  }
  return ok;
}

// ---------- dates ----------
function dayOf(d: Date): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" }).format(d);
}
function addDays(day: string, n: number): string {
  const d = new Date(day + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

// ---------- brands: one name for an app and its website ----------
type Brand = { key: string; label: string; domains: string[]; apps: string[] };
const BRANDS: Brand[] = [
  { key: "youtube", label: "YouTube", domains: ["youtube.com", "youtu.be"], apps: ["com.google.android.youtube", "com.google.android.apps.youtube.music"] },
  { key: "netflix", label: "Netflix", domains: ["netflix.com"], apps: ["com.netflix.mediaclient", "com.netflix.Netflix"] },
  { key: "instagram", label: "Instagram", domains: ["instagram.com"], apps: ["com.instagram.android", "com.instagram.barcelona"] },
  { key: "facebook", label: "Facebook", domains: ["facebook.com", "fb.com", "messenger.com"], apps: ["com.facebook.katana", "com.facebook.lite", "com.facebook.orca"] },
  { key: "whatsapp", label: "WhatsApp", domains: ["web.whatsapp.com", "whatsapp.com"], apps: ["com.whatsapp", "com.whatsapp.w4b", "net.whatsapp.WhatsApp", "desktop.WhatsApp"] },
  { key: "x", label: "X (Twitter)", domains: ["x.com", "twitter.com"], apps: ["com.twitter.android"] },
  { key: "linkedin", label: "LinkedIn", domains: ["linkedin.com"], apps: ["com.linkedin.android"] },
  { key: "reddit", label: "Reddit", domains: ["reddit.com"], apps: ["com.reddit.frontpage"] },
  { key: "prime", label: "Prime Video", domains: ["primevideo.com"], apps: ["com.amazon.avod.thirdpartyclient"] },
  { key: "hotstar", label: "JioHotstar", domains: ["hotstar.com", "jiocinema.com", "jiohotstar.com"], apps: ["in.startv.hotstar", "com.jio.media.ondemand"] },
  { key: "spotify", label: "Spotify", domains: ["spotify.com"], apps: ["com.spotify.music", "com.spotify.client"] },
  { key: "gmail", label: "Gmail", domains: ["mail.google.com"], apps: ["com.google.android.gm"] },
  { key: "slack", label: "Slack", domains: ["slack.com", "app.slack.com"], apps: ["com.Slack", "com.tinyspeck.slackmacgap"] },
  { key: "telegram", label: "Telegram", domains: ["web.telegram.org"], apps: ["org.telegram.messenger", "ru.keepcoder.Telegram", "com.tdesktop.Telegram"] },
  { key: "claude", label: "Claude", domains: ["claude.ai"], apps: ["com.anthropic.claude", "com.anthropic.claudefordesktop"] },
  { key: "chatgpt", label: "ChatGPT", domains: ["chatgpt.com", "chat.openai.com"], apps: ["com.openai.chatgpt", "com.openai.chat"] },
  { key: "notion", label: "Notion", domains: ["notion.so", "notion.com"], apps: ["notion.id", "notion.so"] },
  { key: "amazon", label: "Amazon", domains: ["amazon.in", "amazon.com"], apps: ["in.amazon.mShop.android.shopping", "com.amazon.mShop.android.shopping"] },
];
const BRAND_BY_DOMAIN = new Map<string, Brand>();
const BRAND_BY_APP = new Map<string, Brand>();
for (const b of BRANDS) {
  b.domains.forEach((d) => BRAND_BY_DOMAIN.set(d, b));
  b.apps.forEach((a) => BRAND_BY_APP.set(a.toLowerCase(), b));
}
function brandForDomain(d: string): Brand | undefined {
  if (BRAND_BY_DOMAIN.has(d)) return BRAND_BY_DOMAIN.get(d);
  const parts = d.split(".");
  for (let i = 1; i < parts.length - 1; i++) {
    const s = parts.slice(i).join(".");
    if (BRAND_BY_DOMAIN.has(s)) return BRAND_BY_DOMAIN.get(s);
  }
  return undefined;
}

// ---------- categories ----------
const CAT_RULES: [string, RegExp][] = [
  ["Video and entertainment", /(youtube|youtu\.be|netflix|primevideo|hotstar|jiocinema|sonyliv|zee5|twitch|\bspotify\b|gaana|wynk|jiosaavn|mxplayer|crunchyroll|disneyplus|com\.apple\.tv|com\.apple\.music|\bvlc\b|\biina\b|\bsteam\b|\bgame\b)/i],
  ["Social", /(instagram|facebook|\bfb\.com\b|twitter|\bx\.com\b|linkedin|reddit|threads\.net|snapchat|pinterest|tiktok|musically|quora|sharechat|\bmoj\b|\bjosh\b|tumblr|\bdiscord\b)/i],
  ["Communication", /(whatsapp|mail\.google|gmail|outlook|slack|\bteams\b|\bzoom\b|meet\.google|telegram|\bsignal\b|messag|mobilesms|facetime|dialer|android\.contacts|com\.apple\.mail|superhuman|\bspark\b|calendar)/i],
  ["AI tools", /(claude|anthropic|chatgpt|openai|gemini\.google|perplexity|copilot|poe\.com|midjourney|wispr|notebooklm|huggingface|\bcursor\b)/i],
  ["Work and building", /(docs\.google|\bsheets\b|\bslides\b|drive\.google|notion|figma|\bcanva\b|github|gitlab|vercel|supabase|\blinear\b|airtable|hubspot|ads\.google|adsmanager|business\.facebook|analytics\.google|search\.google|clarity\.ms|mouseflow|stripe|webflow|framer|wordpress|vscode|xcode|terminal|iterm|\bcursor\b|jetbrains|microsoft\.(word|excel|powerpoint)|iwork|keynote|\bnumbers\b|\bpages\b|obsidian|n8n|hetzner|cloudflare|localhost|semrush|ahrefs|similarweb|marketerhire|adplist|getbueno|bueno|pratikrenuse|loom|\bmiro\b|trello|asana|clickup|zapier|make\.com|resend)/i],
  ["Learning", /(gmat|coursera|udemy|edx|khanacademy|mba\.com|duolingo|wikipedia|\bscholar\b|thinkvidya|masterclass|skillshare|brilliant)/i],
  ["News and reading", /(news|medium\.com|substack|timesofindia|indiatimes|hindustantimes|ndtv|moneycontrol|economictimes|livemint|thehindu|indianexpress|\bbbc\b|nytimes|theguardian|inshorts|dailyhunt|techcrunch|theverge|kindle|\bpocket\b|feedly|hackernews|ycombinator)/i],
  ["Shopping and food", /(amazon\.|flipkart|myntra|swiggy|zomato|blinkit|zepto|bigbasket|ajio|meesho|nykaa|tatacliq|croma|ikea|airbnb|booking\.com|makemytrip|irctc|\buber\b|\bola\b|rapido)/i],
  ["Finance", /(zerodha|\bkite\b|groww|paytm|phonepe|gpay|paisa|\bbank\b|hdfc|icici|\bsbi\b|\baxis\b|kotak|upstox|\bcred\b|tradingview|nseindia|bseindia|incometax|zoho\.in)/i],
  ["Utilities", /(finder|settings|systempreferences|launcher|systemui|nexuslauncher|trebuchet|camera|photos|gallery|\bclock\b|calculator|\bfiles\b|filemanager|preview|activitymonitor|spotlight|loginwindow|screencapture|1password|bitwarden|keychain|lockscreen)/i],
];
let overrides: Map<string, string> | null = null;
let overridesAt = 0;
async function loadOverrides() {
  if (overrides && Date.now() - overridesAt < 60_000) return overrides;
  const { data } = await db.from("st_categories").select("key,category").eq("user_id", USER);
  overrides = new Map((data ?? []).map((r: any) => [r.key, r.category]));
  overridesAt = Date.now();
  return overrides;
}
function categorize(domain: string | null, appId: string | null, appName: string | null, ov: Map<string, string>): string {
  for (const k of [domain, appId, appName]) if (k && ov.has(k)) return ov.get(k)!;
  const hay = domain ?? `${appId ?? ""} ${appName ?? ""}`;
  for (const [cat, re] of CAT_RULES) if (re.test(hay)) return cat;
  if (domain && appName) {
    // A website in a browser that matched nothing above.
    return "Other web";
  }
  return "Other apps";
}

// ---------- value tiers ----------
// Only the screen decides. The calendar is not used.
// Rules, in order:
//   1. A tier he picked by hand for an app or site wins.
//   2. Wasted: LinkedIn, Gmail, Google Calendar, every social feed, video, news, shopping, and any website
//      that is not a known work tool.
//   3. WhatsApp, chat, settings, Finder, banking and every other admin app are wasted too.
//      Only Vipassana and PVS seva counts as life.
//   4. EUR 1k: work tools (Claude, Terminal, Google Docs and Sheets, Beehiiv, SalesBlink, Bueno sites, ads tools,
//      code and hosting tools, Wispr Flow).
//   5. Nothing is EUR 1M or EUR 100k unless he marks an app or site that way himself.
const TIER_LABELS: Record<string, string> = { m1: "\u20ac1M work", k100: "\u20ac100k work", k1: "\u20ac1k work", chill: "Wasted", life: "Vipassana and seva" };
const TIER_ORDER = ["m1", "k100", "k1", "chill", "life"];
const COLOR_TIER: Record<string, string> = { "3": "m1", "6": "k100", "7": "k1", "9": "k1", "11": "chill" };
const HINT_K1 = "getbueno|247spain|spain247|spanishpropertyinsights|beehiiv|salesblink|klaviyo|marketerhire|packt|ads\\.google|adsmanager|business\\.facebook|reoon|emailverifier|vercel|supabase|github|resend\\.com|clarity\\.ms|analytics\\.google|search\\.google|pratikrenuse";
const HINT_K100 = "$^";
const HINT_LIFE = "vipassana|dhamma|vridhamma|\\mpvs\\M|irctc";
const ADMIN_CATS = new Set(["Communication", "Utilities", "Finance"]);
let tierOverrides: Map<string, string> | null = null;
let tierAt = 0;
async function loadTierOverrides() {
  if (tierOverrides && Date.now() - tierAt < 60_000) return tierOverrides;
  const { data } = await db.from("st_tiers").select("key,tier").eq("user_id", USER);
  tierOverrides = new Map((data ?? []).map((r: any) => [String(r.key).toLowerCase(), r.tier]));
  tierAt = Date.now();
  return tierOverrides;
}
const WASTE_ITEM = /(linkedin|mail\.google|gmail|calendar\.google|superhuman|youtube|instagram|facebook|twitter|\bx\.com|reddit|netflix|hotstar|primevideo|substack|medium\.com|\bnews\b)/i;
const LIFE_ITEM = /(whatsapp|telegram|signal|messages|facetime|system settings|finder|screen time|loginwindow|1password|keychain)/i;
function decideTier(p: { block_tier: string | null; hint: string | null; category: string | null; item: string }, keys: string[], ov: Map<string, string>): { tier: string; faked: boolean } {
  for (const k of keys) if (k && ov.has(k.toLowerCase())) return { tier: ov.get(k.toLowerCase())!, faked: false };
  const cat = p.category ?? "";
  const work = ["m1", "k100", "k1"].includes(p.block_tier ?? "");
  if (WASTE_ITEM.test(p.item) || DISTRACTING.has(cat)) return { tier: "chill", faked: work };
  if (p.hint === "life") return { tier: "life", faked: false };
  if (p.hint === "k1" || p.hint === "k100") return { tier: p.hint, faked: false };
  if (LIFE_ITEM.test(p.item) || ADMIN_CATS.has(cat) || cat === "Other web") return { tier: "chill", faked: work };
  return { tier: "k1", faked: false };
}
function emptyTiers(): Record<string, number> {
  return { m1: 0, k100: 0, k1: 0, chill: 0, life: 0 };
}
function tierTotals(list: { tiers?: Record<string, number> }[]) {
  const t = emptyTiers();
  for (const i of list) for (const k of TIER_ORDER) t[k] += i.tiers?.[k] ?? 0;
  return TIER_ORDER.map((k) => ({ tier: k, label: TIER_LABELS[k], seconds: Math.round(t[k]) }));
}

function cleanDomain(d: unknown): string | null {
  if (typeof d !== "string") return null;
  let s = d.trim().toLowerCase();
  if (!s) return null;
  s = s.replace(/^[a-z]+:\/\//, "").split(/[\/?#:]/)[0];
  s = s.replace(/^(www\d?|m|mobile)\./, "");
  if (!s.includes(".") || /\s/.test(s) || s.length > 120) return null;
  return s;
}
const str = (v: unknown, max: number) => (typeof v === "string" && v.trim() ? v.trim().slice(0, max) : null);
const num = (v: unknown) => (typeof v === "number" && isFinite(v) ? v : null);

// ---------- places ----------
async function loadPlaces() {
  const { data } = await db.from("st_places").select("*").eq("user_id", USER);
  return (data ?? []) as any[];
}
function matchPlace(places: any[], ssid: string | null, lat: number | null, lon: number | null): string | null {
  if (ssid) {
    const p = places.find((p) => p.ssid && p.ssid === ssid);
    if (p) return p.name;
  }
  if (lat != null && lon != null) {
    let best: any = null;
    let bestD = Infinity;
    for (const p of places) {
      if (p.lat == null || p.lon == null) continue;
      const dx = (lon - p.lon) * 111320 * Math.cos((p.lat * Math.PI) / 180);
      const dy = (lat - p.lat) * 111320;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist <= p.radius_m && dist < bestD) {
        best = p;
        bestD = dist;
      }
    }
    if (best) return best.name;
  }
  return null;
}

// ---------- ingest ----------
async function ingest(body: any) {
  const dev = body?.device ?? {};
  const deviceId = str(dev.id, 80);
  const kind = dev.kind === "android" ? "android" : dev.kind === "mac" ? "mac" : null;
  if (!deviceId || !kind) return json({ error: "device.id and device.kind are required" }, 400);
  await db.from("st_devices").upsert(
    { device_id: deviceId, user_id: USER, kind, name: str(dev.name, 80), app_version: str(dev.version, 20), last_seen: new Date().toISOString() },
    { onConflict: "device_id" },
  );
  const ov = await loadOverrides();
  const places = await loadPlaces();
  const rows: any[] = [];
  for (const e of Array.isArray(body.events) ? body.events.slice(0, 2000) : []) {
    const uid = str(e.uid, 200);
    const start = new Date(e.start);
    const end = new Date(e.end);
    if (!uid || isNaN(+start) || isNaN(+end) || end < start) continue;
    const dur = Math.min(Math.round((+end - +start) / 1000), 86400);
    if (dur < 1) continue;
    const domain = cleanDomain(e.domain ?? e.url);
    const appId = str(e.app_id, 200);
    const appName = str(e.app_name, 120);
    const ssid = str(e.ssid, 64);
    const lat = num(e.lat);
    const lon = num(e.lon);
    rows.push({
      user_id: USER,
      device_id: deviceId,
      device_kind: kind,
      client_uid: uid,
      start_at: start.toISOString(),
      end_at: end.toISOString(),
      duration_s: dur,
      day: dayOf(start),
      app_id: appId,
      app_name: appName,
      browser: domain ? str(e.browser, 60) ?? appName : null,
      domain,
      url: domain ? str(e.url, 500) : null,
      title: str(e.title, 300),
      category: categorize(domain, appId, appName, ov),
      ssid,
      lat,
      lon,
      place: matchPlace(places, ssid, lat, lon),
      updated_at: new Date().toISOString(),
    });
  }
  // De-duplicate inside the batch, keeping the latest version of each session.
  const byUid = new Map<string, any>();
  for (const r of rows) byUid.set(r.client_uid, r);
  const unique = [...byUid.values()];
  for (let i = 0; i < unique.length; i += 500) {
    const { error } = await db.from("st_events").upsert(unique.slice(i, i + 500), { onConflict: "device_id,client_uid" });
    if (error) return json({ error: error.message }, 500);
  }
  const nudges: any[] = [];
  for (const n of Array.isArray(body.nudges) ? body.nudges.slice(0, 500) : []) {
    const uid = str(n.uid, 200);
    const at = new Date(n.at);
    if (!uid || isNaN(+at)) continue;
    nudges.push({
      user_id: USER, device_id: deviceId, client_uid: uid, at: at.toISOString(), day: dayOf(at),
      target: str(n.target, 120) ?? "unknown", kind: str(n.kind, 20) ?? "limit", used_minutes: num(n.used_minutes),
    });
  }
  if (nudges.length) {
    const { error } = await db.from("st_nudges").upsert(nudges, { onConflict: "device_id,client_uid" });
    if (error) return json({ error: error.message }, 500);
  }
  return json({ ok: true, events: unique.length, nudges: nudges.length });
}

// ---------- limits ----------
function limitMatch(l: any) {
  const t = String(l.target).toLowerCase();
  if (l.target_type === "category") return { domains: [] as string[], apps: [] as string[], cats: [l.target] };
  if (l.target_type === "domain") {
    const d = cleanDomain(t) ?? t;
    const b = brandForDomain(d);
    return { domains: b ? [...new Set([d, ...b.domains])] : [d], apps: b ? b.apps.map((a) => a.toLowerCase()) : [], cats: [] as string[] };
  }
  const b = BRAND_BY_APP.get(t);
  return { domains: b ? b.domains : [], apps: b ? [...new Set([t, ...b.apps.map((a) => a.toLowerCase())])] : [t], cats: [] as string[] };
}
async function usage(m: { domains: string[]; apps: string[]; cats: string[] }, d1: string, d2: string, excludeDevice: string | null = null) {
  // App ids are matched case-sensitively in SQL, so pass both the original and lowercase forms.
  const lower = new Set(m.apps.map((a) => a.toLowerCase()));
  const original = BRANDS.flatMap((b) => b.apps).filter((a) => lower.has(a.toLowerCase()));
  const apps = [...new Set([...m.apps, ...lower, ...original])];
  const { data, error } = await db.rpc("st_limit_usage", {
    u: USER, d1, d2, domains: m.domains, apps, cats: m.cats, exclude_device: excludeDevice,
  });
  if (error) throw new Error(error.message);
  return new Map<string, number>((data ?? []).map((r: any) => [r.day, Number(r.seconds)]));
}

async function status(url: URL) {
  const deviceId = url.searchParams.get("device");
  const today = dayOf(new Date());
  const { data: limits } = await db.from("st_limits").select("*").eq("user_id", USER).eq("enabled", true).order("id");
  const out: any[] = [];
  for (const l of limits ?? []) {
    const m = limitMatch(l);
    const other = (await usage(m, today, today, deviceId)).get(today) ?? 0;
    const all = (await usage(m, today, today)).get(today) ?? 0;
    out.push({
      id: l.id, label: l.label ?? l.target, target_type: l.target_type, target: l.target, daily_minutes: l.daily_minutes,
      match_domains: m.domains, match_apps: m.apps, match_categories: m.cats,
      other_devices_seconds: other, all_devices_seconds: all,
    });
  }
  const { data: places } = await db.from("st_places").select("name,ssid").eq("user_id", USER);
  const { data: tot } = await db.rpc("st_daily_totals", { u: USER, d1: today, d2: today });
  const totals: Record<string, number> = { mac: 0, android: 0 };
  for (const r of tot ?? []) totals[r.device_kind] = Number(r.seconds);
  const all = await items(today, today);
  const top = all.slice(0, 8).map((i) => ({ label: i.label, seconds: i.seconds, mac: i.mac, android: i.android, category: i.category, tier: i.tier, tier_label: TIER_LABELS[i.tier] }));
  const { data: sw } = await db.rpc("st_switches", { u: USER, d1: today, d2: today });
  const { data: longest } = await db.from("st_events").select("duration_s,app_name,domain,title").eq("user_id", USER).eq("day", today).order("duration_s", { ascending: false }).limit(1);
  const switches = (sw ?? []).reduce((a: number, r: any) => a + Number(r.sessions), 0);
  const l = longest?.[0];
  return json({
    ok: true, day: today, server_time: new Date().toISOString(), timezone: TZ, report_hour: 21,
    limits: out, places: places ?? [], today_seconds: totals, top_today: top,
    tiers_today: tierTotals(all),
    calendar_today: await calendarCheck(today, today, all),
    opens_today: (await opens(today, today)).slice(0, 8),
    unlocks_today: await unlocks(today, today),
    focus: { switches, longest_s: l ? l.duration_s : 0, longest_label: l ? (l.domain ?? l.app_name) : null },
  });
}

// ---------- summary helpers ----------
type Item = { key: string; label: string; category: string; tier: string; tierKey: string; tiers?: Record<string, number>; faked?: number; seconds: number; mac: number; android: number; web: number; app: number; sessions: number; browsers: Record<string, number>; parts: Record<string, number> };
function mergeItems(rows: any[]): Item[] {
  const m = new Map<string, Item>();
  for (const r of rows) {
    let key: string;
    let label: string;
    let brand: Brand | undefined;
    if (r.item_type === "site") {
      brand = brandForDomain(r.item);
      key = brand ? brand.key : r.item;
      label = brand ? brand.label : r.item;
    } else {
      brand = BRAND_BY_APP.get(String(r.item).toLowerCase()) ?? BRANDS.find((b) => b.label.toLowerCase() === String(r.item).toLowerCase());
      key = brand ? brand.key : "app:" + r.item;
      label = brand ? brand.label : r.item;
    }
    const s = Number(r.seconds);
    const it: Item = m.get(key) ?? { key, label, category: r.category ?? "Other", tier: "k1", tierKey: r.item_type === "site" ? r.item : String(r.item), seconds: 0, mac: 0, android: 0, web: 0, app: 0, sessions: 0, browsers: {}, parts: {} };
    it.seconds += s;
    it.sessions += Number(r.sessions);
    if (r.device_kind === "android") it.android += s; else it.mac += s;
    if (r.item_type === "site") {
      it.web += s;
      if (r.browser) it.browsers[r.browser] = (it.browsers[r.browser] ?? 0) + s;
    } else it.app += s;
    const partName = r.item_type === "site" ? r.item : (r.app_name ?? r.item);
    it.parts[partName] = (it.parts[partName] ?? 0) + s;
    m.set(key, it);
  }
  return [...m.values()].sort((a, b) => b.seconds - a.seconds);
}
async function tierPieces(d1: string, d2: string) {
  const rows: any[] = [];
  for (let from = 0; from < 20000; from += 1000) {
    const { data, error } = await db.rpc("st_tier_pieces", { u: USER, d1, d2, k1_re: HINT_K1, k100_re: HINT_K100, life_re: HINT_LIFE }).range(from, from + 999);
    if (error) throw new Error(error.message);
    rows.push(...(data ?? []));
    if (!data || data.length < 1000) break;
  }
  return rows;
}
function itemKey(item: string, type: string): string {
  if (type === "site") return brandForDomain(item)?.key ?? item;
  const b = BRAND_BY_APP.get(item.toLowerCase()) ?? BRANDS.find((x) => x.label.toLowerCase() === item.toLowerCase());
  return b ? b.key : "app:" + item;
}
async function items(d1: string, d2: string, withTiers = true) {
  const { data, error } = await db.rpc("st_item_totals", { u: USER, d1, d2 });
  if (error) throw new Error(error.message);
  const list = mergeItems(data ?? []);
  if (!withTiers) return list;
  const ov = await loadTierOverrides();
  const byKey = new Map(list.map((i) => [i.key, i]));
  for (const p of await tierPieces(d1, d2)) {
    const key = itemKey(String(p.item), p.item_type);
    const it = byKey.get(key);
    if (!it) continue;
    const d = decideTier(p, [it.key, it.label, String(p.item)], ov);
    const s = Number(p.seconds);
    it.tiers = it.tiers ?? emptyTiers();
    it.tiers[d.tier] = (it.tiers[d.tier] ?? 0) + s;
    if (d.faked) it.faked = (it.faked ?? 0) + s;
  }
  for (const i of list) {
    const t = i.tiers ?? { [i.tier]: i.seconds };
    i.tier = Object.entries(t).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "k1";
  }
  return list;
}
// What the calendar claimed for the day versus what the screen showed.
async function calendarCheck(d1: string, d2: string, list: Item[]) {
  const from = new Date(`${d1}T00:00:00+05:30`).toISOString();
  const to = new Date(new Date(`${d2}T00:00:00+05:30`).getTime() + 86400_000).toISOString();
  const { data } = await db.from("st_calendar").select("start_at,end_at,title,tier,all_day").eq("user_id", USER).eq("all_day", false).lt("start_at", to).gt("end_at", from);
  const planned = emptyTiers();
  for (const c of data ?? []) {
    const s = (Math.min(Date.parse(c.end_at), Date.parse(to)) - Math.max(Date.parse(c.start_at), Date.parse(from))) / 1000;
    if (s > 0) planned[c.tier ?? "life"] = (planned[c.tier ?? "life"] ?? 0) + s;
  }
  const faked = list.filter((i) => (i.faked ?? 0) >= 60).sort((a, b) => (b.faked ?? 0) - (a.faked ?? 0));
  return {
    blocks: (data ?? []).length,
    planned: TIER_ORDER.map((k) => ({ tier: k, label: TIER_LABELS[k], seconds: Math.round(planned[k]) })),
    work_block_wasted_s: faked.reduce((a, b) => a + (b.faked ?? 0), 0),
    work_block_wasted_top: faked.slice(0, 5).map((i) => ({ label: i.label, seconds: i.faked })),
  };
}
// How often each app or site was opened, with an app and its website merged under one name.
async function opens(d1: string, d2: string) {
  const { data, error } = await db.rpc("st_opens", { u: USER, d1, d2 });
  if (error) throw new Error(error.message);
  const m = new Map<string, { label: string; kind: string; opens: number; mac: number; android: number }>();
  for (const r of data ?? []) {
    const item = String(r.item ?? "Unknown");
    let label = item;
    if (r.kind === "site") label = brandForDomain(item)?.label ?? item;
    else label = (BRAND_BY_APP.get(item.toLowerCase()) ?? BRANDS.find((b) => b.label.toLowerCase() === item.toLowerCase()))?.label ?? item;
    const key = label.toLowerCase();
    const o = m.get(key) ?? { label, kind: r.kind, opens: 0, mac: 0, android: 0 };
    const n = Number(r.opens);
    o.opens += n;
    if (r.device_kind === "android") o.android += n; else o.mac += n;
    m.set(key, o);
  }
  return [...m.values()].filter((o) => o.label !== "Screen Time").sort((a, b) => b.opens - a.opens);
}
async function unlocks(d1: string, d2: string) {
  const { data } = await db.from("st_nudges").select("day,device_id,client_uid").eq("user_id", USER).eq("kind", "unlock").gte("day", d1).lte("day", d2);
  const out = { mac: 0, android: 0 };
  for (const r of data ?? []) {
    if (String(r.device_id).startsWith("android")) out.android++; else out.mac++;
  }
  return out;
}
function fmt(sec: number): string {
  const m = Math.round(sec / 60);
  if (m < 60) return `${m}m`;
  return `${Math.floor(m / 60)}h ${String(m % 60).padStart(2, "0")}m`;
}
const DISTRACTING = new Set(["Video and entertainment", "Social", "Shopping and food", "News and reading"]);

async function dailyTotals(d1: string, d2: string) {
  const { data } = await db.rpc("st_daily_totals", { u: USER, d1, d2 });
  const map = new Map<string, { mac: number; android: number }>();
  for (let d = d1; d <= d2; d = addDays(d, 1)) map.set(d, { mac: 0, android: 0 });
  for (const r of data ?? []) {
    const v = map.get(r.day) ?? { mac: 0, android: 0 };
    (v as any)[r.device_kind] = Number(r.seconds);
    map.set(r.day, v);
  }
  return [...map.entries()].map(([day, v]) => ({ day, mac: v.mac, android: v.android, total: v.mac + v.android }));
}

// ---------- report ----------
async function report(day: string) {
  const days = await dailyTotals(addDays(day, -7), day);
  const todayRow = days[days.length - 1];
  const prev = days.slice(0, -1).filter((d) => d.total > 0);
  const avg = prev.length ? prev.reduce((a, b) => a + b.total, 0) / prev.length : 0;
  const top = await items(day, day);
  const week = await items(addDays(day, -7), addDays(day, -1), false);
  const weekMap = new Map(week.map((i) => [i.key, i.seconds / 7]));
  let jump: { label: string; delta: number } | null = null;
  for (const i of top.slice(0, 25)) {
    const delta = i.seconds - (weekMap.get(i.key) ?? 0);
    if (delta > 15 * 60 && (!jump || delta > jump.delta)) jump = { label: i.label, delta };
  }
  const { data: limits } = await db.from("st_limits").select("*").eq("user_id", USER).eq("enabled", true);
  const over: string[] = [];
  for (const l of limits ?? []) {
    const u = (await usage(limitMatch(l), day, day)).get(day) ?? 0;
    if (u > l.daily_minutes * 60) over.push(`${l.label ?? l.target} ${fmt(u)} of ${l.daily_minutes}m`);
  }
  const lines: string[] = [];
  const diff = avg ? Math.round(((todayRow.total - avg) / avg) * 100) : null;
  lines.push(`Screen time ${fmt(todayRow.total)}: Mac ${fmt(todayRow.mac)}, phone ${fmt(todayRow.android)}.`);
  if (diff !== null) lines.push(diff >= 0 ? `That is ${diff}% above your 7-day average of ${fmt(avg)}.` : `That is ${-diff}% below your 7-day average of ${fmt(avg)}.`);
  if (top.length) lines.push(`Top: ${top.slice(0, 3).map((i) => `${i.label} ${fmt(i.seconds)}`).join(", ")}.`);
  if (jump) lines.push(`Biggest jump: ${jump.label}, ${fmt(jump.delta)} more than usual.`);
  if (over.length) lines.push(`Limits crossed: ${over.join("; ")}.`);
  else if ((limits ?? []).length) lines.push("You stayed inside all your limits.");
  const distracting = top.filter((i) => DISTRACTING.has(i.category)).reduce((a, b) => a + b.seconds, 0);
  return {
    day, total: todayRow.total, mac: todayRow.mac, android: todayRow.android, avg7: avg, change_pct: diff,
    distracting_seconds: distracting, title: `Today: ${fmt(todayRow.total)} on screens`, text: lines.join(" "), lines,
  };
}

// ---------- Claude's judgements ----------
// A scheduled Claude run each morning judges yesterday's stretches of screen time from titles and sites and
// saves them in st_judgements. Where they exist they replace the simple app rules; the few short visits
// Claude did not judge keep the rule-based split.
async function judged(day: string) {
  const { data } = await db.from("st_judgements").select("tier,minutes,item,activity").eq("user_id", USER).eq("day", day);
  return (data ?? []) as { tier: string; minutes: number; item: string; activity: string | null }[];
}
function blendTiers(rule: Record<string, number>, totalSec: number, rows: { tier: string; minutes: number }[]) {
  const out = emptyTiers();
  let js = 0;
  for (const r of rows) {
    const s = Number(r.minutes) * 60;
    if (out[r.tier] === undefined) continue;
    out[r.tier] += s;
    js += s;
  }
  const rest = Math.max(0, totalSec - js);
  const ruleSum = TIER_ORDER.reduce((a, k) => a + (rule[k] ?? 0), 0);
  for (const k of TIER_ORDER) out[k] += ruleSum ? ((rule[k] ?? 0) / ruleSum) * rest : 0;
  for (const k of TIER_ORDER) out[k] = Math.round(out[k]);
  return out;
}
function tiersArray(t: Record<string, number>) {
  return TIER_ORDER.map((k) => ({ tier: k, label: TIER_LABELS[k], seconds: Math.round(t[k] ?? 0) }));
}

// ---------- Mac notification text ----------
// A short summary for one day, shown as a native Mac notification (morning: yesterday, evening: today).
async function brief(day: string, label: string) {
  const [list, days, op, un] = await Promise.all([items(day, day), dailyTotals(addDays(day, -7), day), opens(day, day), unlocks(day, day)]);
  const row = days[days.length - 1];
  if (!row || row.total < 60) return { ok: true, empty: true, title: `${label}: nothing tracked`, body: "No screen time was recorded." };
  const prev = days.slice(0, -1).filter((d) => d.total > 0);
  const avg = prev.length ? prev.reduce((a, b) => a + b.total, 0) / prev.length : 0;
  let t: Record<string, number> = Object.fromEntries(tierTotals(list).map((x) => [x.tier, x.seconds]));
  const j = await judged(day);
  if (j.length) t = blendTiers(t, row.total, j);
  const value = [`\u20ac1M ${fmt(t.m1)}`, ...(t.k100 >= 60 ? [`\u20ac100k ${fmt(t.k100)}`] : []), `\u20ac1k ${fmt(t.k1)}`, `wasted ${fmt(t.chill)}`].join(", ");
  const wasted = list.filter((i) => (i.tiers?.chill ?? 0) >= 60).sort((a, b) => (b.tiers!.chill) - (a.tiers!.chill)).slice(0, 2);
  const lines = [value + "."];
  const jw = new Map<string, number>();
  for (const r of j) if (r.tier === "chill") {
    const k = r.activity || r.item;
    jw.set(k, (jw.get(k) ?? 0) + Number(r.minutes) * 60);
  }
  const jTop = [...jw.entries()].sort((a, b) => b[1] - a[1]).slice(0, 2);
  if (jTop.length) lines.push(`Wasted on ${jTop.map(([k, v]) => `${k} ${fmt(v)}`).join(" and ")}.`);
  else if (wasted.length) lines.push(`Wasted on ${wasted.map((i) => `${i.label} ${fmt(i.tiers!.chill)}`).join(" and ")}.`);
  else lines.push(`Most time: ${list.slice(0, 2).map((i) => `${i.label} ${fmt(i.seconds)}`).join(", ")}.`);
  const pull: string[] = [];
  if (un.mac) pull.push(`Mac unlocked ${un.mac} times`);
  if (un.android) pull.push(`phone ${un.android} times`);
  if (op[0]) pull.push(`${op[0].label} opened ${op[0].opens} times`);
  if (pull.length) lines.push(pull.join(", ") + ".");
  let title = `${label}: ${fmt(row.total)} on screens`;
  if (avg) {
    const d = Math.round(((row.total - avg) / avg) * 100);
    title += d >= 0 ? `, ${d}% above average` : `, ${-d}% below average`;
  }
  return { ok: true, empty: false, day, title, body: lines.join(" "), tiers: t };
}

// ---------- dashboard ----------
async function dashboard(url: URL) {
  const today = dayOf(new Date());
  const day = /^\d{4}-\d{2}-\d{2}$/.test(url.searchParams.get("day") ?? "") ? url.searchParams.get("day")! : today;
  const [days, itemsDay, items7, items30, itemsPrev7] = await Promise.all([
    dailyTotals(addDays(day, -59), day),
    items(day, day),
    items(addDays(day, -6), day),
    items(addDays(day, -29), day, false),
    items(addDays(day, -13), addDays(day, -7), false),
  ]);
  const [{ data: hourly }, { data: hourly7 }, { data: placesT }, { data: browsers }, { data: sw }] = await Promise.all([
    db.rpc("st_hourly", { u: USER, d1: day, d2: day, tz: TZ }),
    db.rpc("st_hourly", { u: USER, d1: addDays(day, -6), d2: day, tz: TZ }),
    db.rpc("st_place_totals", { u: USER, d1: addDays(day, -6), d2: day }),
    db.rpc("st_browser_totals", { u: USER, d1: addDays(day, -6), d2: day }),
    db.rpc("st_switches", { u: USER, d1: day, d2: day }),
  ]);
  const hours = Array.from({ length: 24 }, (_, h) => ({ hour: h, mac: 0, android: 0 }));
  for (const r of hourly ?? []) (hours[r.hour] as any)[r.device_kind] += Number(r.seconds);
  const heat: Record<string, number[]> = {};
  for (const r of hourly7 ?? []) {
    heat[r.day] = heat[r.day] ?? Array(24).fill(0);
    heat[r.day][r.hour] += Number(r.seconds);
  }
  // Timeline for the selected day, paged past the 1000-row cap.
  const timeline: any[] = [];
  for (let from = 0; from < 20000; from += 1000) {
    const { data, error } = await db.from("st_events")
      .select("start_at,end_at,duration_s,device_kind,app_name,app_id,browser,domain,url,title,category,place")
      .eq("user_id", USER).eq("day", day).order("start_at").range(from, from + 999);
    if (error) throw new Error(error.message);
    timeline.push(...(data ?? []));
    if (!data || data.length < 1000) break;
  }
  const cats = new Map<string, number>();
  for (const i of itemsDay) cats.set(i.category, (cats.get(i.category) ?? 0) + i.seconds);
  const cats7 = new Map<string, number>();
  for (const i of items7) cats7.set(i.category, (cats7.get(i.category) ?? 0) + i.seconds);

  // Limits with 7-day history.
  const { data: limits } = await db.from("st_limits").select("*").eq("user_id", USER).order("id");
  const limitOut: any[] = [];
  for (const l of limits ?? []) {
    const u = await usage(limitMatch(l), addDays(day, -6), day);
    const hist: { day: string; seconds: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = addDays(day, -i);
      hist.push({ day: d, seconds: u.get(d) ?? 0 });
    }
    limitOut.push({ ...l, today_seconds: u.get(day) ?? 0, history: hist, kept_days: hist.filter((h) => h.seconds <= l.daily_minutes * 60).length });
  }
  // Reduction plan suggestions.
  const suggestions: any[] = [];
  const limitedKeys = new Set((limits ?? []).map((l: any) => {
    const t = String(l.target).toLowerCase();
    return (brandForDomain(t) ?? BRAND_BY_APP.get(t))?.key ?? t;
  }));
  for (const i of items7.filter((i) => DISTRACTING.has(i.category)).slice(0, 6)) {
    const avgMin = i.seconds / 7 / 60;
    if (avgMin < 10) continue;
    const brand = BRANDS.find((b) => b.key === i.key);
    const target = brand ? brand.domains[0] : i.key.startsWith("app:") ? i.key.slice(4) : i.key;
    const type = brand || !i.key.startsWith("app:") ? "domain" : "app";
    const existing = (limits ?? []).find((l: any) => {
      const t = String(l.target).toLowerCase();
      return ((brandForDomain(t) ?? BRAND_BY_APP.get(t))?.key ?? t) === i.key || t === target;
    });
    if (existing) {
      const lo = limitOut.find((x: any) => x.id === existing.id);
      if (lo && lo.kept_days >= 5 && existing.daily_minutes > 10) {
        const next = Math.max(10, Math.floor((existing.daily_minutes * 0.9) / 5) * 5);
        if (next < existing.daily_minutes) suggestions.push({ kind: "tighten", limit_id: existing.id, label: i.label, current: existing.daily_minutes, suggested: next, avg_minutes: Math.round(avgMin), reason: `You kept this limit on ${lo.kept_days} of the last 7 days.` });
      }
      continue;
    }
    if (limitedKeys.has(i.key)) continue;
    const sug = Math.max(10, Math.floor((avgMin * 0.9) / 5) * 5);
    suggestions.push({ kind: "new", label: i.label, target_type: type, target, suggested: sug, avg_minutes: Math.round(avgMin), reason: `You average ${Math.round(avgMin)} min a day here.` });
    if (suggestions.length >= 4) break;
  }
  const { data: nudges } = await db.from("st_nudges").select("kind,target,at,day").eq("user_id", USER).gte("day", addDays(day, -6)).lte("day", day);
  const { data: places } = await db.from("st_places").select("*").eq("user_id", USER).order("id");
  const { data: devices } = await db.from("st_devices").select("*").eq("user_id", USER).order("first_seen");
  const { data: overridesRows } = await db.from("st_categories").select("key,category").eq("user_id", USER);
  const sumOf = (arr: Item[]) => arr.reduce((a, b) => a + b.seconds, 0);
  const prevMap = new Map(itemsPrev7.map((i) => [i.key, i.seconds]));
  const risers = items7
    .map((i) => ({ key: i.key, label: i.label, category: i.category, this_week: i.seconds, last_week: prevMap.get(i.key) ?? 0, delta: i.seconds - (prevMap.get(i.key) ?? 0) }))
    .filter((r) => Math.abs(r.delta) >= 10 * 60)
    .sort((a, b) => b.delta - a.delta);
  const rep = await report(day);
  return json({
    ok: true, today, day, timezone: TZ,
    report: rep,
    days, hours, heat,
    items_day: itemsDay.slice(0, 60), items_7: items7.slice(0, 60), items_30: items30.slice(0, 60),
    categories_day: [...cats.entries()].map(([name, seconds]) => ({ name, seconds })).sort((a, b) => b.seconds - a.seconds),
    tiers_day: await (async () => {
      const j = await judged(day);
      const rule = Object.fromEntries(tierTotals(itemsDay).map((x) => [x.tier, x.seconds]));
      return j.length ? tiersArray(blendTiers(rule, days[days.length - 1]?.total ?? 0, j)) : tierTotals(itemsDay);
    })(),
    judgements_day: (await judged(day)).length,
    tiers_7: tierTotals(items7), tier_labels: TIER_LABELS,
    calendar_day: await calendarCheck(day, day, itemsDay),
    opens_day: (await opens(day, day)).slice(0, 25), unlocks_day: await unlocks(day, day),
    categories_7: [...cats7.entries()].map(([name, seconds]) => ({ name, seconds })).sort((a, b) => b.seconds - a.seconds),
    week: { this_week: sumOf(items7), last_week: sumOf(itemsPrev7), risers: risers.slice(0, 5), fallers: risers.slice(-5).reverse().filter((r) => r.delta < 0) },
    timeline, switches: sw ?? [], places_7: placesT ?? [], browsers_7: browsers ?? [],
    limits: limitOut, suggestions, nudges: nudges ?? [], places: places ?? [], devices: devices ?? [],
    category_overrides: overridesRows ?? [], category_names: [...CAT_RULES.map((c) => c[0]), "Other web", "Other apps"],
  });
}

// ---------- owner writes ----------
async function ownerWrite(action: string, body: any) {
  if (action === "limit_save") {
    const type = ["domain", "app", "category"].includes(body.target_type) ? body.target_type : null;
    let target = str(body.target, 120);
    const minutes = Math.round(Number(body.daily_minutes));
    if (!type || !target || !(minutes > 0 && minutes <= 1440)) return json({ error: "Need a target and minutes between 1 and 1440" }, 400);
    if (type === "domain") target = cleanDomain(target) ?? target.toLowerCase();
    const row: any = { user_id: USER, target_type: type, target, label: str(body.label, 60) ?? target, daily_minutes: minutes, enabled: body.enabled !== false };
    const q = body.id ? db.from("st_limits").update(row).eq("id", body.id).select() : db.from("st_limits").upsert(row, { onConflict: "user_id,target_type,target" }).select();
    const { data, error } = await q;
    if (error) return json({ error: error.message }, 500);
    return json({ ok: true, limit: data?.[0] });
  }
  if (action === "limit_delete") {
    const { error } = await db.from("st_limits").delete().eq("id", body.id).eq("user_id", USER);
    if (error) return json({ error: error.message }, 500);
    return json({ ok: true });
  }
  if (action === "place_save") {
    const name = str(body.name, 60);
    if (!name) return json({ error: "Name the place" }, 400);
    const row = { user_id: USER, name, ssid: str(body.ssid, 64), lat: num(body.lat), lon: num(body.lon), radius_m: Math.round(Number(body.radius_m) || 250) };
    if (!row.ssid && row.lat == null) return json({ error: "A place needs a Wi-Fi name or a location" }, 400);
    const { data, error } = await db.from("st_places").insert(row).select();
    if (error) return json({ error: error.message }, 500);
    const { data: n } = await db.rpc("st_apply_place", { pid: data![0].id });
    return json({ ok: true, place: data![0], updated: n });
  }
  if (action === "place_delete") {
    const { data: p } = await db.from("st_places").select("name").eq("id", body.id).single();
    await db.from("st_places").delete().eq("id", body.id);
    if (p) await db.from("st_events").update({ place: null }).eq("user_id", USER).eq("place", p.name);
    return json({ ok: true });
  }
  if (action === "tier_save") {
    const key = str(body.key, 200);
    const tier = str(body.tier, 10);
    if (!key || !tier || !TIER_ORDER.includes(tier)) return json({ error: "Need key and a valid tier" }, 400);
    await db.from("st_tiers").upsert({ user_id: USER, key, tier }, { onConflict: "user_id,key" });
    tierOverrides = null;
    return json({ ok: true });
  }
  if (action === "category_save") {
    const key = str(body.key, 200);
    const cat = str(body.category, 60);
    if (!key || !cat) return json({ error: "Need key and category" }, 400);
    await db.from("st_categories").upsert({ user_id: USER, key, category: cat }, { onConflict: "user_id,key" });
    overrides = null;
    const { data: n } = await db.rpc("st_apply_category", { u: USER, k: key, cat });
    return json({ ok: true, updated: n });
  }
  return json({ error: "Unknown action" }, 404);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  const url = new URL(req.url);
  const action = url.searchParams.get("action") ?? "";
  try {
    if (action === "ping") return json({ ok: true, service: "screentime" });
    if (action === "login") return (await isOwner(req)) ? json({ ok: true }) : json({ error: "Wrong password" }, 401);
    if (action === "ingest" || action === "status" || action === "brief") {
      if (!(await isDevice(req))) return json({ error: "Invalid device key" }, 401);
      if (action === "ingest") return await ingest(await req.json());
      if (action === "brief") {
        const today = dayOf(new Date());
        return url.searchParams.get("which") === "yesterday" ? json(await brief(addDays(today, -1), "Yesterday")) : json(await brief(today, "Today so far"));
      }
      return await status(url);
    }
    if (action === "report") {
      if (!(await isOwner(req))) return json({ error: "Not allowed" }, 401);
      const d = url.searchParams.get("day");
      return json(await report(d && /^\d{4}-\d{2}-\d{2}$/.test(d) ? d : dayOf(new Date())));
    }
    if (!(await isOwner(req))) return json({ error: "Wrong password" }, 401);
    if (action === "dashboard") return await dashboard(url);
    if (req.method === "POST") return await ownerWrite(action, await req.json());
    return json({ error: "Unknown action" }, 404);
  } catch (e) {
    if (e instanceof LockedOut) return json({ error: "Too many wrong passwords. Password sign-in is paused for 15 minutes." }, 429);
    return json({ error: String((e as Error).message ?? e) }, 500);
  }
});


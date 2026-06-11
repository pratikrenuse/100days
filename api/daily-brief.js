// /api/daily-brief.js
// Daily Insight Brief: latest insights from top people in AI, Robotics, and Future.
// Pipeline: fetch ~45 sources in parallel -> filter to last 26h -> dedupe via Supabase
// -> Hermes (Nous API) ranks and summarizes, DeepSeek as automatic fallback
// -> deliver to Telegram. Runs daily at 7:00 AM IST via Vercel cron.
//
// Required env vars: SUPABASE_URL, SUPABASE_SERVICE_KEY (already set),
// DEEPSEEK_API_KEY, TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID.
// Optional: NOUS_API_KEY (enables Hermes as primary brain), HERMES_MODEL, CRON_SECRET.
//
// Manual endpoints:
//   /api/daily-brief?whoami=1   -> shows Telegram chat IDs the bot can see (for setup)
//   /api/daily-brief?test=1     -> runs the full pipeline immediately

// ---------------------------------------------------------------- people ----

const PEOPLE = {
  AI: ['Sam Altman', 'Dario Amodei', 'Demis Hassabis', 'Andrej Karpathy', 'Ilya Sutskever',
    'Yann LeCun', 'Geoffrey Hinton', 'Jensen Huang', 'Francois Chollet', 'Noam Brown',
    'Yoshua Bengio', 'Chris Olah', 'Fei-Fei Li', 'Arthur Mensch', 'Ethan Mollick'],
  Robotics: ['Brett Adcock', 'Elon Musk (Tesla Optimus)', 'Marc Raibert', 'Bernt Bornich', 'Jim Fan',
    'Chelsea Finn', 'Karol Hausman', 'Sergey Levine', 'Pieter Abbeel', 'Daniela Rus',
    'Ken Goldberg', 'Rodney Brooks', 'Wang Xingxing', 'Deepu Talla', "Raffaello D'Andrea"],
  Future: ['Ray Kurzweil', 'Nick Bostrom', 'Toby Ord', 'Yuval Noah Harari', 'Kevin Kelly',
    'Azeem Azhar', 'Balaji Srinivasan', 'Vitalik Buterin', 'Leopold Aschenbrenner', 'Daniel Kokotajlo',
    'Hannah Ritchie', 'Reid Hoffman', 'Vinod Khosla', 'Tim Urban', 'Peter Diamandis']
};

// ---------------------------------------------------------------- sources ---

const FEEDS = [
  // AI: newsletters, blogs, labs, podcasts
  { cat: 'AI', name: 'Sam Altman Blog', url: 'https://blog.samaltman.com/posts.atom' },
  { cat: 'AI', name: 'Yoshua Bengio Blog', url: 'https://yoshuabengio.org/feed/' },
  { cat: 'AI', name: 'ARC Prize (Chollet)', url: 'https://arcprize.org/feed.xml' },
  { cat: 'AI', name: 'One Useful Thing', url: 'https://www.oneusefulthing.org/feed' },
  { cat: 'AI', name: 'Import AI', url: 'https://importai.substack.com/feed' },
  { cat: 'AI', name: 'Interconnects', url: 'https://www.interconnects.ai/feed' },
  { cat: 'AI', name: 'SemiAnalysis', url: 'https://semianalysis.com/feed/' },
  { cat: 'AI', name: 'Dont Worry About the Vase', url: 'https://thezvi.substack.com/feed' },
  { cat: 'AI', name: 'ChinAI', url: 'https://chinai.substack.com/feed' },
  { cat: 'AI', name: 'The Algorithmic Bridge', url: 'https://www.thealgorithmicbridge.com/feed' },
  { cat: 'AI', name: 'Karpathy blog', url: 'https://karpathy.github.io/feed.xml' },
  { cat: 'AI', name: 'Karpathy bearblog', url: 'https://karpathy.bearblog.dev/feed/?type=rss' },
  { cat: 'AI', name: 'OpenAI News', url: 'https://openai.com/news/rss.xml' },
  { cat: 'AI', name: 'Google DeepMind Blog', url: 'https://deepmind.google/blog/rss.xml' },
  { cat: 'AI', name: 'NVIDIA Blog', url: 'https://blogs.nvidia.com/feed/' },
  { cat: 'AI', name: 'Dwarkesh Podcast', url: 'https://www.dwarkesh.com/feed' },
  { cat: 'AI', name: 'Lex Fridman Podcast', url: 'https://lexfridman.com/feed/podcast/' },
  // Robotics
  { cat: 'Robotics', name: 'IEEE Spectrum Robotics', url: 'https://spectrum.ieee.org/feeds/topic/robotics.rss' },
  { cat: 'Robotics', name: 'The Robot Report', url: 'https://www.therobotreport.com/feed/' },
  { cat: 'Robotics', name: 'Boston Dynamics Blog', url: 'https://bostondynamics.com/feed/' },
  { cat: 'Robotics', name: 'RAI Institute (Raibert)', url: 'https://rai-inst.com/feed' },
  { cat: 'Robotics', name: 'Rodney Brooks Blog', url: 'https://rodneybrooks.com/feed/' },
  // Future
  { cat: 'Future', name: 'Exponential View', url: 'https://www.exponentialview.co/feed' },
  { cat: 'Future', name: 'Sustainability by Numbers', url: 'https://www.sustainabilitybynumbers.com/feed' },
  { cat: 'Future', name: 'Wait But Why', url: 'https://waitbutwhy.com/feed' },
  { cat: 'Future', name: 'The Technium (Kevin Kelly)', url: 'https://kk.org/thetechnium/feed/' },
  { cat: 'Future', name: 'Vitalik Buterin', url: 'https://vitalik.eth.limo/feed.xml' },
  { cat: 'Future', name: 'Peter Diamandis Blog', url: 'https://www.diamandis.com/blog/rss.xml' },
  { cat: 'Future', name: 'AI Futures Project', url: 'https://blog.ai-futures.org/feed' },
  { cat: 'Future', name: 'Balaji Srinivasan', url: 'https://balajis.com/feed' },
  { cat: 'Future', name: 'Harari Articles', url: 'https://www.ynharari.com/category/articles/feed' },
  { cat: 'Future', name: 'Kurzweil Library', url: 'https://www.thekurzweillibrary.com/feed' },
  { cat: 'Future', name: 'Khosla Ventures Posts', url: 'https://www.khoslaventures.com/posts/rss.xml' },
  { cat: 'Future', name: 'Possible Podcast (Hoffman)', url: 'https://feeds.megaphone.fm/possible' },
  { cat: 'Future', name: 'For Our Posterity (Aschenbrenner)', url: 'https://www.forourposterity.com/blog/rss' }
];

// Company pages without RSS: fetched as HTML, new links detected via the seen table.
const PAGES = [
  { cat: 'AI', name: 'Anthropic News', url: 'https://www.anthropic.com/news', base: 'https://www.anthropic.com', hint: '/news/' },
  { cat: 'AI', name: 'Mistral News', url: 'https://mistral.ai/news', base: 'https://mistral.ai', hint: '/news/' },
  { cat: 'Robotics', name: 'Figure News', url: 'https://www.figure.ai/news', base: 'https://www.figure.ai', hint: '/news/' },
  { cat: 'Robotics', name: '1X', url: 'https://www.1x.tech/discover', base: 'https://www.1x.tech', hint: '/discover/' },
  { cat: 'Robotics', name: 'Unitree News', url: 'https://www.unitree.com/news', base: 'https://www.unitree.com', hint: '/news' },
  { cat: 'Robotics', name: 'Physical Intelligence', url: 'https://www.pi.website/blog', base: 'https://www.pi.website', hint: '/blog' },
  { cat: 'AI', name: 'Dario Amodei Essays', url: 'https://www.darioamodei.com/archive', base: 'https://www.darioamodei.com', hint: '/' },
  { cat: 'AI', name: 'World Labs (Fei-Fei Li)', url: 'https://www.worldlabs.ai/blog', base: 'https://www.worldlabs.ai', hint: '/blog' },
  { cat: 'AI', name: 'Meta AI Blog (LeCun)', url: 'https://ai.meta.com/blog/', base: 'https://ai.meta.com', hint: '/blog/' },
  { cat: 'AI', name: 'SSI (Sutskever)', url: 'https://ssi.inc/updates', base: 'https://ssi.inc', hint: '/updates' },
  { cat: 'Future', name: 'Toby Ord Writings', url: 'https://www.tobyord.com/writings', base: 'https://www.tobyord.com', hint: '/writings' }
];

// Google News RSS queries: catches X posts, interviews, and statements reported as news.
const NEWS_QUERIES = [
  { cat: 'AI', q: '"Sam Altman" OR "Dario Amodei" OR "Demis Hassabis" OR "Andrej Karpathy" OR "Ilya Sutskever"' },
  { cat: 'AI', q: '"Yann LeCun" OR "Geoffrey Hinton" OR "Jensen Huang" OR "Francois Chollet" OR "Noam Brown"' },
  { cat: 'AI', q: '"Yoshua Bengio" OR "Chris Olah" OR "Fei-Fei Li" OR "Arthur Mensch" OR "Ethan Mollick"' },
  { cat: 'Robotics', q: '"Brett Adcock" OR "Tesla Optimus" OR "Marc Raibert" OR "Bernt Bornich" OR "Jim Fan" NVIDIA' },
  { cat: 'Robotics', q: '"Chelsea Finn" OR "Karol Hausman" OR "Sergey Levine" OR "Pieter Abbeel" OR "Daniela Rus"' },
  { cat: 'Robotics', q: '"Ken Goldberg" robotics OR "Rodney Brooks" OR "Wang Xingxing" OR Unitree OR "Figure AI" OR "Boston Dynamics"' },
  { cat: 'Future', q: '"Ray Kurzweil" OR "Nick Bostrom" OR "Toby Ord" OR "Yuval Noah Harari" OR "Kevin Kelly" technology' },
  { cat: 'Future', q: '"Azeem Azhar" OR "Balaji Srinivasan" OR "Vitalik Buterin" OR "Leopold Aschenbrenner" OR "Daniel Kokotajlo"' },
  { cat: 'Future', q: '"Hannah Ritchie" OR "Reid Hoffman" AI OR "Vinod Khosla" OR "Tim Urban" OR "Peter Diamandis"' }
];

const WINDOW_HOURS = 26;        // look-back window for dated items
const MAX_ITEMS_FOR_AI = 150;   // cap sent to the brain
const SNIPPET_LEN = 280;

// ---------------------------------------------------------------- helpers ---

function decodeEntities(s) {
  return (s || '')
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'").replace(/&apos;/g, "'").replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(n))
    .replace(/&amp;/g, '&');
}

function stripTags(s) {
  return decodeEntities((s || '').replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
}

function pickTag(xml, tags) {
  for (const t of tags) {
    const m = xml.match(new RegExp('<' + t + '(?:\\s[^>]*)?>([\\s\\S]*?)</' + t + '>', 'i'));
    if (m) return m[1].trim();
  }
  return '';
}

function pickLink(xml) {
  // RSS: <link>url</link>
  const rss = xml.match(/<link>([\s\S]*?)<\/link>/i);
  if (rss && rss[1].trim()) return decodeEntities(rss[1].trim());
  // Atom: prefer rel="alternate"
  const links = [...xml.matchAll(/<link\b[^>]*>/gi)].map(m => m[0]);
  let best = '';
  for (const l of links) {
    const href = (l.match(/href="([^"]+)"/i) || [])[1];
    if (!href) continue;
    if (/rel="alternate"/i.test(l)) return decodeEntities(href);
    if (!best) best = href;
  }
  return decodeEntities(best);
}

async function fetchWithTimeout(url, ms) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    const r = await fetch(url, {
      signal: ctrl.signal,
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; InsightBrief/1.0; +https://pratikrenuse.com)',
        'Accept': 'application/rss+xml, application/atom+xml, application/xml, text/xml, text/html, */*'
      }
    });
    if (!r.ok) return null;
    return await r.text();
  } catch (e) {
    return null;
  } finally {
    clearTimeout(t);
  }
}

// ------------------------------------------------------------- ingestion ----

function parseFeed(xml, src, cutoff) {
  const items = [];
  const blocks = xml.match(/<item[\s\S]*?<\/item>|<entry[\s\S]*?<\/entry>/gi) || [];
  for (const b of blocks.slice(0, 25)) {
    const title = stripTags(pickTag(b, ['title']));
    const link = pickLink(b);
    if (!title || !link) continue;
    const dateStr = pickTag(b, ['pubDate', 'published', 'updated', 'dc:date']);
    const d = dateStr ? new Date(stripTags(dateStr)) : null;
    if (d && !isNaN(d) && d.getTime() < cutoff) continue;
    const snippet = stripTags(pickTag(b, ['description', 'summary', 'content:encoded', 'content'])).slice(0, SNIPPET_LEN);
    items.push({
      cat: src.cat, source: src.name, title, url: link, snippet,
      ts: d && !isNaN(d) ? d.getTime() : Date.now()
    });
  }
  return items;
}

function parsePage(html, src) {
  // Extract candidate article links; the seen table decides what is actually new.
  const items = [];
  const seenHere = new Set();
  const anchors = [...html.matchAll(/<a\b[^>]*href="([^"#?]+)"[^>]*>([\s\S]*?)<\/a>/gi)];
  for (const a of anchors) {
    let href = a[1];
    const text = stripTags(a[2]);
    if (!href.includes(src.hint)) continue;
    if (text.length < 25 || text.length > 200) continue;
    if (href.startsWith('/')) href = src.base + href;
    if (!href.startsWith('http') || seenHere.has(href)) continue;
    if (href.replace(/\/$/, '') === src.url.replace(/\/$/, '')) continue;
    seenHere.add(href);
    items.push({ cat: src.cat, source: src.name, title: text, url: href, snippet: '', ts: Date.now() });
    if (items.length >= 5) break;
  }
  return items;
}

async function gatherAll() {
  const cutoff = Date.now() - WINDOW_HOURS * 3600 * 1000;
  const jobs = [];

  for (const src of FEEDS) {
    jobs.push(fetchWithTimeout(src.url, 8000).then(x => x ? parseFeed(x, src, cutoff) : []));
  }
  for (const src of PAGES) {
    jobs.push(fetchWithTimeout(src.url, 8000).then(x => x ? parsePage(x, src) : []));
  }
  for (const nq of NEWS_QUERIES) {
    const url = 'https://news.google.com/rss/search?q=' + encodeURIComponent(nq.q + ' when:1d') + '&hl=en-US&gl=US&ceid=US:en';
    const src = { cat: nq.cat, name: 'News' };
    jobs.push(fetchWithTimeout(url, 8000).then(x => x ? parseFeed(x, src, cutoff) : []));
  }

  const results = await Promise.all(jobs);
  const all = results.flat();

  // Dedupe by normalized URL, newest first.
  const map = new Map();
  for (const it of all.sort((a, b) => b.ts - a.ts)) {
    const key = it.url.replace(/[?#].*$/, '').replace(/\/$/, '');
    if (!map.has(key)) map.set(key, { ...it, url: key });
  }
  return [...map.values()];
}

// -------------------------------------------------------------- supabase ----

function supaHeaders() {
  return {
    apikey: process.env.SUPABASE_SERVICE_KEY,
    Authorization: 'Bearer ' + process.env.SUPABASE_SERVICE_KEY,
    'Content-Type': 'application/json'
  };
}

async function getSeenUrls() {
  const since = new Date(Date.now() - 10 * 24 * 3600 * 1000).toISOString();
  const url = process.env.SUPABASE_URL + '/rest/v1/brief_seen?select=url&created_at=gte.' + since + '&limit=5000';
  const r = await fetch(url, { headers: supaHeaders() });
  if (!r.ok) return new Set();
  const rows = await r.json();
  return new Set(rows.map(x => x.url));
}

async function markSeen(urls) {
  for (let i = 0; i < urls.length; i += 200) {
    const batch = urls.slice(i, i + 200).map(u => ({ url: u }));
    await fetch(process.env.SUPABASE_URL + '/rest/v1/brief_seen?on_conflict=url', {
      method: 'POST',
      headers: { ...supaHeaders(), Prefer: 'resolution=ignore-duplicates,return=minimal' },
      body: JSON.stringify(batch)
    });
  }
}

// --------------------------------------------------- brain: hermes+deepseek -

// Primary brain: Hermes (Nous Research API). Fallback: DeepSeek.
// If NOUS_API_KEY is missing or the Hermes call fails, DeepSeek takes over,
// so the briefing never skips a morning.

const BRAINS = [
  {
    name: 'hermes',
    url: 'https://inference-api.nousresearch.com/v1/chat/completions',
    model: process.env.HERMES_MODEL || 'Hermes-4-405B',
    keyEnv: 'NOUS_API_KEY',
    jsonMode: false
  },
  {
    name: 'deepseek',
    url: 'https://api.deepseek.com/chat/completions',
    model: 'deepseek-chat',
    keyEnv: 'DEEPSEEK_API_KEY',
    jsonMode: true
  }
];

function extractJson(text) {
  // Tolerates markdown fences or chatter around the JSON object.
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start === -1 || end <= start) throw new Error('No JSON object in model output');
  return JSON.parse(text.slice(start, end + 1));
}

async function callBrain(brain, system, user) {
  const body = {
    model: brain.model,
    temperature: 0.3,
    max_tokens: 4000,
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: user }
    ]
  };
  if (brain.jsonMode) body.response_format = { type: 'json_object' };
  const r = await fetch(brain.url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + process.env[brain.keyEnv]
    },
    body: JSON.stringify(body)
  });
  if (!r.ok) throw new Error(brain.name + ' error ' + r.status + ': ' + (await r.text()).slice(0, 300));
  const data = await r.json();
  const content = data.choices && data.choices[0] && data.choices[0].message.content;
  if (!content) throw new Error(brain.name + ' returned empty content');
  return extractJson(content);
}

async function rankItems(items) {
  const peopleList = Object.entries(PEOPLE)
    .map(([cat, names]) => cat + ': ' + names.join(', ')).join('\n');

  const itemLines = items.map((it, i) =>
    `[${i}] (${it.cat} | ${it.source}) ${it.title}` + (it.snippet ? ` :: ${it.snippet}` : '')
  ).join('\n');

  const system = `You are the intelligence analyst behind a private daily briefing for Pratik, a builder and marketer who tracks the cutting edge of AI, Robotics, and the Future. He follows these people because they have substance, not just popularity:

${peopleList}

You will receive today's raw haul of items from newsletters, lab blogs, company pages, podcasts, and news queries. Your job:
1. Select only what has LONG-TERM significance: new ideas, research results, strong arguments, real capability shifts, notable essays or interviews from or about the tracked people, plus genuinely significant frontier developments even if no tracked person is named. The test for every item: will this still matter in five years? If unsure, exclude it.
2. Hard exclusions: trivial news, gossip, personnel drama, incremental model version updates, funding round chatter, stock-price noise, product marketing, rumor recycling, listicles, duplicate coverage of the same story (keep the best single item), and anything stale.
3. For each selected item, lead with the CORE INSIGHT: the underlying idea or shift, stated plainly in the first sentence, then 1-2 sentences on why it matters for the long-term future. Not "X announced Y" but what the announcement reveals or changes. No hype. No emojis. No em dashes, use commas, colons, or full stops.
4. Sort each category by importance. 5 to 8 items per category. If a category has fewer than 5 worthwhile items, include only what is worthwhile, never pad.
5. Write one "top_signal" line: the single most important thing across everything today.

Respond with JSON only, in this exact shape:
{"top_signal":"...","sections":[{"category":"AI","items":[{"idx":0,"title":"...","summary":"..."}]},{"category":"Robotics","items":[]},{"category":"Future","items":[]}]}
"idx" is the [number] of the source item. Keep titles under 90 characters, rewrite vague ones.`;

  const user = 'Today\'s raw items:\n' + itemLines;
  const errors = [];
  for (const brain of BRAINS) {
    if (!process.env[brain.keyEnv]) { errors.push(brain.name + ': no API key set'); continue; }
    try {
      const brief = await callBrain(brain, system, user);
      return { brief, brain: brain.name };
    } catch (e) {
      errors.push(String(e.message));
    }
  }
  throw new Error('All brains failed. ' + errors.join(' | '));
}

// -------------------------------------------------------------- telegram ----

function esc(s) {
  return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

async function tgSend(text) {
  const r = await fetch('https://api.telegram.org/bot' + process.env.TELEGRAM_BOT_TOKEN + '/sendMessage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text,
      parse_mode: 'HTML',
      link_preview_options: { is_disabled: true }
    })
  });
  if (!r.ok) throw new Error('Telegram error ' + r.status + ': ' + (await r.text()).slice(0, 300));
}

async function tgSendLong(text) {
  if (text.length <= 3900) return tgSend(text);
  const parts = [];
  let buf = '';
  for (const block of text.split('\n\n')) {
    if ((buf + '\n\n' + block).length > 3900) { parts.push(buf); buf = block; }
    else buf = buf ? buf + '\n\n' + block : block;
  }
  if (buf) parts.push(buf);
  for (const p of parts) await tgSend(p);
}

function formatBrief(brief, items) {
  const date = new Date().toLocaleDateString('en-IN', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata'
  });
  const messages = [];
  let head = '<b>Daily Insight Brief</b> · ' + esc(date);
  if (brief.top_signal) head += '\n\n<b>Top signal:</b> ' + esc(brief.top_signal);
  messages.push(head);

  const labels = { AI: 'AI', Robotics: 'ROBOTICS', Future: 'FUTURE' };
  for (const sec of brief.sections || []) {
    const its = (sec.items || []).filter(x => items[x.idx]);
    if (!its.length) continue;
    let msg = '<b>' + (labels[sec.category] || esc(sec.category).toUpperCase()) + '</b>';
    for (const x of its) {
      const src = items[x.idx];
      msg += '\n\n<b>' + esc(x.title || src.title) + '</b>\n' + esc(x.summary || '') +
        '\n<a href="' + esc(src.url) + '">' + esc(src.source) + '</a>';
    }
    messages.push(msg);
  }
  return messages;
}

// --------------------------------------------------------------- handler ----

module.exports = async (req, res) => {
  const q = req.query || {};

  // Optional auth: if CRON_SECRET is set, require it (Vercel cron sends it automatically).
  const secret = process.env.CRON_SECRET;
  const auth = (req.headers && req.headers.authorization) || '';
  if (secret && auth !== 'Bearer ' + secret && q.key !== secret) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Setup helper: discover your Telegram chat ID.
  if (q.whoami) {
    try {
      const r = await fetch('https://api.telegram.org/bot' + process.env.TELEGRAM_BOT_TOKEN + '/getUpdates');
      const data = await r.json();
      const chats = {};
      for (const u of data.result || []) {
        const c = (u.message && u.message.chat) || (u.channel_post && u.channel_post.chat);
        if (c) chats[c.id] = (c.first_name || '') + ' ' + (c.last_name || '') + (c.username ? ' @' + c.username : '');
      }
      return res.status(200).json({
        hint: 'Send your bot a message first if this is empty. Use the chat id as TELEGRAM_CHAT_ID in Vercel.',
        chats
      });
    } catch (e) {
      return res.status(500).json({ error: 'Could not reach Telegram. Is TELEGRAM_BOT_TOKEN set?' });
    }
  }

  const missing = ['SUPABASE_URL', 'SUPABASE_SERVICE_KEY', 'DEEPSEEK_API_KEY', 'TELEGRAM_BOT_TOKEN', 'TELEGRAM_CHAT_ID']
    .filter(k => !process.env[k]);
  if (missing.length) return res.status(500).json({ error: 'Missing env vars: ' + missing.join(', ') });

  try {
    // 1. Gather everything.
    const gathered = await gatherAll();

    // 2. Drop what was already sent.
    const seen = await getSeenUrls();
    let fresh = gathered.filter(it => !seen.has(it.url));
    fresh = fresh.slice(0, MAX_ITEMS_FOR_AI);

    if (!fresh.length) {
      await tgSend('<b>Daily Insight Brief</b>\n\nQuiet day: no new items from any tracked source in the last 26 hours.');
      return res.status(200).json({ ok: true, gathered: gathered.length, fresh: 0, sent: 'quiet-day notice' });
    }

    // 3. Let the brain decide what matters: Hermes first, DeepSeek fallback.
    const { brief, brain } = await rankItems(fresh);

    // 4. Deliver.
    const messages = formatBrief(brief, fresh);
    let pickedCount = 0;
    for (const sec of brief.sections || []) pickedCount += (sec.items || []).length;
    if (pickedCount === 0) {
      await tgSend('<b>Daily Insight Brief</b>\n\nQuiet day: ' + fresh.length + ' new items came in, none cleared the relevance bar.');
    } else {
      for (const m of messages) await tgSendLong(m);
    }

    // 5. Remember everything we considered so tomorrow is incremental.
    await markSeen(fresh.map(it => it.url));

    return res.status(200).json({ ok: true, brain, gathered: gathered.length, fresh: fresh.length, selected: pickedCount });
  } catch (e) {
    try {
      await tgSend('Daily Insight Brief failed this morning: ' + esc(String(e.message).slice(0, 300)));
    } catch (_) { /* telegram itself unavailable */ }
    return res.status(500).json({ error: String(e.message) });
  }
};

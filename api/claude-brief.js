// /api/claude-brief.js
// Daily Insight Brief, Claude edition: parallel to /api/daily-brief.js (Hermes/DeepSeek).
// Same sources, Claude Sonnet as the brain, delivered to Telegram AND email.
// Uses its own seen table (brief_seen_claude) so both versions get the full daily haul.
//
// Required env vars: SUPABASE_URL, SUPABASE_SERVICE_KEY, ANTHROPIC_API_KEY (all already set),
// TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID.
// Optional: RESEND_API_KEY (enables email), BRIEF_TO (default pratik.y.renuse@gmail.com),
// BRIEF_FROM (default onboarding@resend.dev until your domain is verified in Resend), CRON_SECRET.
//
// Manual endpoints:
//   /api/claude-brief?test=1   -> runs the full pipeline immediately

const CLAUDE_MODEL = process.env.CLAUDE_BRIEF_MODEL || 'claude-sonnet-4-6';
const SEEN_TABLE = 'brief_seen_claude';
const BRIEF_TO = process.env.BRIEF_TO || 'pratik.y.renuse@gmail.com';
const BRIEF_FROM = process.env.BRIEF_FROM || 'Daily Insight Brief <onboarding@resend.dev>';

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
  { cat: 'Robotics', name: 'IEEE Spectrum Robotics', url: 'https://spectrum.ieee.org/feeds/topic/robotics.rss' },
  { cat: 'Robotics', name: 'The Robot Report', url: 'https://www.therobotreport.com/feed/' },
  { cat: 'Robotics', name: 'Boston Dynamics Blog', url: 'https://bostondynamics.com/feed/' },
  { cat: 'Robotics', name: 'RAI Institute (Raibert)', url: 'https://rai-inst.com/feed' },
  { cat: 'Robotics', name: 'Rodney Brooks Blog', url: 'https://rodneybrooks.com/feed/' },
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

const PAGES = [
  { cat: 'AI', name: 'Anthropic News', url: 'https://www.anthropic.com/news', base: 'https://www.anthropic.com', hint: '/news/' },
  { cat: 'AI', name: 'Mistral News', url: 'https://mistral.ai/news', base: 'https://mistral.ai', hint: '/news/' },
  { cat: 'AI', name: 'Dario Amodei Essays', url: 'https://www.darioamodei.com/archive', base: 'https://www.darioamodei.com', hint: '/' },
  { cat: 'AI', name: 'World Labs (Fei-Fei Li)', url: 'https://www.worldlabs.ai/blog', base: 'https://www.worldlabs.ai', hint: '/blog' },
  { cat: 'AI', name: 'Meta AI Blog (LeCun)', url: 'https://ai.meta.com/blog/', base: 'https://ai.meta.com', hint: '/blog/' },
  { cat: 'AI', name: 'SSI (Sutskever)', url: 'https://ssi.inc/updates', base: 'https://ssi.inc', hint: '/updates' },
  { cat: 'Robotics', name: 'Figure News', url: 'https://www.figure.ai/news', base: 'https://www.figure.ai', hint: '/news/' },
  { cat: 'Robotics', name: '1X', url: 'https://www.1x.tech/discover', base: 'https://www.1x.tech', hint: '/discover/' },
  { cat: 'Robotics', name: 'Unitree News', url: 'https://www.unitree.com/news', base: 'https://www.unitree.com', hint: '/news' },
  { cat: 'Robotics', name: 'Physical Intelligence', url: 'https://www.pi.website/blog', base: 'https://www.pi.website', hint: '/blog' },
  { cat: 'Future', name: 'Toby Ord Writings', url: 'https://www.tobyord.com/writings', base: 'https://www.tobyord.com', hint: '/writings' }
];

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

const WINDOW_HOURS = 26;
const MAX_ITEMS_FOR_AI = 150;
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
  const rss = xml.match(/<link>([\s\S]*?)<\/link>/i);
  if (rss && rss[1].trim()) return decodeEntities(rss[1].trim());
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
  const url = process.env.SUPABASE_URL + '/rest/v1/' + SEEN_TABLE + '?select=url&created_at=gte.' + since + '&limit=5000';
  const r = await fetch(url, { headers: supaHeaders() });
  if (!r.ok) return new Set();
  const rows = await r.json();
  return new Set(rows.map(x => x.url));
}

async function markSeen(urls) {
  for (let i = 0; i < urls.length; i += 200) {
    const batch = urls.slice(i, i + 200).map(u => ({ url: u }));
    await fetch(process.env.SUPABASE_URL + '/rest/v1/' + SEEN_TABLE + '?on_conflict=url', {
      method: 'POST',
      headers: { ...supaHeaders(), Prefer: 'resolution=ignore-duplicates,return=minimal' },
      body: JSON.stringify(batch)
    });
  }
}

// ---------------------------------------------------------- brain: claude ---

function buildSystemPrompt() {
  const peopleList = Object.entries(PEOPLE)
    .map(([cat, names]) => cat + ': ' + names.join(', ')).join('\n');

  return `You are the intelligence analyst behind a private daily briefing for Pratik, a builder who tracks the cutting edge of AI, Robotics, and the long-term Future. He follows these people because they have substance, not just popularity:

${peopleList}

You will receive today's raw haul of items from newsletters, lab blogs, company pages, podcasts, and news queries. Your job:
1. Select only what has LONG-TERM significance: new ideas, research results, strong arguments, real capability shifts, notable essays or interviews from or about the tracked people, plus genuinely significant frontier developments even if no tracked person is named. The test for every item: will this still matter in five years? If unsure, exclude it.
2. Hard exclusions: trivial news, gossip, personnel drama, incremental model version updates, funding round chatter, stock-price noise, product marketing, rumor recycling, listicles, duplicate coverage of the same story (keep the best single item), and anything stale.
3. For each selected item, lead with the CORE INSIGHT: the underlying idea or shift, stated plainly in the first sentence, then 1-2 sentences on why it matters for the long-term future. Not "X announced Y" but what the announcement reveals or changes. No hype. No emojis. No em dashes, use commas, colons, or full stops.
4. Sort each category by importance. 5 to 8 items per category. If a category has fewer than 5 worthwhile items, include only what is worthwhile, never pad.
5. Write one "top_signal" line: the single most important long-term shift across everything today.

Respond with JSON only, in this exact shape:
{"top_signal":"...","sections":[{"category":"AI","items":[{"idx":0,"title":"...","summary":"..."}]},{"category":"Robotics","items":[]},{"category":"Future","items":[]}]}
"idx" is the [number] of the source item. Keep titles under 90 characters, rewrite vague ones.`;
}

function extractJson(text) {
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start === -1 || end <= start) throw new Error('No JSON object in model output');
  return JSON.parse(text.slice(start, end + 1));
}

async function rankWithClaude(items) {
  const itemLines = items.map((it, i) =>
    `[${i}] (${it.cat} | ${it.source}) ${it.title}` + (it.snippet ? ` :: ${it.snippet}` : '')
  ).join('\n');

  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: CLAUDE_MODEL,
      max_tokens: 4000,
      system: buildSystemPrompt(),
      messages: [{ role: 'user', content: 'Today\'s raw items:\n' + itemLines }]
    })
  });
  if (!r.ok) throw new Error('Claude error ' + r.status + ': ' + (await r.text()).slice(0, 300));
  const data = await r.json();
  const content = data.content && data.content[0] && data.content[0].text;
  if (!content) throw new Error('Claude returned empty content');
  return extractJson(content);
}

// -------------------------------------------------------------- delivery ----

function esc(s) {
  return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function istDate() {
  return new Date().toLocaleDateString('en-IN', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata'
  });
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

function formatTelegram(brief, items) {
  const messages = [];
  let head = '<b>Daily Insight Brief (Claude)</b> · ' + esc(istDate());
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

function formatEmailHtml(brief, items) {
  const sectionsHtml = (brief.sections || []).map(sec => {
    const its = (sec.items || []).filter(x => items[x.idx]);
    if (!its.length) return '';
    const itemsHtml = its.map(x => {
      const src = items[x.idx];
      return `<div style="margin:0 0 22px;">
        <div style="font-family:'IBM Plex Serif',Georgia,serif;font-size:17px;font-weight:500;color:#1A1512;margin-bottom:6px;">${esc(x.title || src.title)}</div>
        <div style="font-size:15px;line-height:1.65;color:#38302A;margin-bottom:6px;">${esc(x.summary || '')}</div>
        <a href="${esc(src.url)}" style="font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#8C6A18;text-decoration:none;">${esc(src.source)} &rarr;</a>
      </div>`;
    }).join('');
    return `<div style="margin:0 0 30px;">
      <div style="font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#8C6A18;border-top:2px solid #8C6A18;display:inline-block;padding-top:8px;margin-bottom:16px;">${esc(sec.category)}</div>
      ${itemsHtml}
    </div>`;
  }).join('');

  return `<!DOCTYPE html><html><body style="margin:0;padding:0;background:#F6F2F1;">
  <div style="max-width:600px;margin:0 auto;padding:32px 24px;background:#F6F2F1;font-family:'IBM Plex Sans',system-ui,sans-serif;">
    <div style="font-family:'IBM Plex Serif',Georgia,serif;font-size:24px;font-weight:300;color:#1A1512;margin-bottom:4px;">Daily Insight Brief</div>
    <div style="font-size:13px;color:#786E66;margin-bottom:24px;">${esc(istDate())} &middot; Claude edition</div>
    ${brief.top_signal ? `<div style="background:#F0E4C4;border:1px solid #D4B870;padding:16px;margin-bottom:30px;">
      <div style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#8C6A18;margin-bottom:6px;">Top signal</div>
      <div style="font-family:'IBM Plex Serif',Georgia,serif;font-size:16px;line-height:1.5;color:#1A1512;">${esc(brief.top_signal)}</div>
    </div>` : ''}
    ${sectionsHtml}
    <div style="border-top:1px solid #D0C8C0;padding-top:14px;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#786E66;">Curated from 56 tracked sources &middot; Built by Pratik Renuse</div>
  </div>
  </body></html>`;
}

async function sendEmail(brief, items) {
  if (!process.env.RESEND_API_KEY) return 'skipped (no RESEND_API_KEY)';
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + process.env.RESEND_API_KEY
    },
    body: JSON.stringify({
      from: BRIEF_FROM,
      to: [BRIEF_TO],
      subject: 'Daily Insight Brief · ' + istDate(),
      html: formatEmailHtml(brief, items)
    })
  });
  if (!r.ok) return 'failed: ' + (await r.text()).slice(0, 200);
  return 'sent';
}

// --------------------------------------------------------------- handler ----

module.exports = async (req, res) => {
  const q = req.query || {};

  const secret = process.env.CRON_SECRET;
  const auth = (req.headers && req.headers.authorization) || '';
  if (secret && auth !== 'Bearer ' + secret && q.key !== secret) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const missing = ['SUPABASE_URL', 'SUPABASE_SERVICE_KEY', 'ANTHROPIC_API_KEY', 'TELEGRAM_BOT_TOKEN', 'TELEGRAM_CHAT_ID']
    .filter(k => !process.env[k]);
  if (missing.length) return res.status(500).json({ error: 'Missing env vars: ' + missing.join(', ') });

  try {
    const gathered = await gatherAll();
    const seen = await getSeenUrls();
    let fresh = gathered.filter(it => !seen.has(it.url));
    fresh = fresh.slice(0, MAX_ITEMS_FOR_AI);

    if (!fresh.length) {
      await tgSend('<b>Daily Insight Brief (Claude)</b>\n\nQuiet day: no new items from any tracked source in the last 26 hours.');
      return res.status(200).json({ ok: true, gathered: gathered.length, fresh: 0, sent: 'quiet-day notice' });
    }

    const brief = await rankWithClaude(fresh);

    let pickedCount = 0;
    for (const sec of brief.sections || []) pickedCount += (sec.items || []).length;

    let emailStatus = 'not attempted';
    if (pickedCount === 0) {
      await tgSend('<b>Daily Insight Brief (Claude)</b>\n\nQuiet day: ' + fresh.length + ' new items came in, none cleared the long-term significance bar.');
    } else {
      for (const m of formatTelegram(brief, fresh)) await tgSendLong(m);
      emailStatus = await sendEmail(brief, fresh);
    }

    await markSeen(fresh.map(it => it.url));

    return res.status(200).json({
      ok: true, brain: CLAUDE_MODEL, gathered: gathered.length,
      fresh: fresh.length, selected: pickedCount, email: emailStatus
    });
  } catch (e) {
    try {
      await tgSend('Daily Insight Brief (Claude) failed this morning: ' + esc(String(e.message).slice(0, 300)));
    } catch (_) { /* telegram itself unavailable */ }
    return res.status(500).json({ error: String(e.message) });
  }
};

// /api/tool.js — single router for all one-shot 100days tools.
// Vercel Hobby allows max 12 serverless functions, so every paste-something-
// get-something tool lives here, dispatched by body.tool. Adding a new day's
// tool = add a case below, zero new functions.
//
// POST { tool: 'pricing'|'rage'|'dating-profile'|'cold-email'|'product-page'|'graveyard', ...params }
// Env vars (Vercel): ANTHROPIC_API_KEY (required), LINKUP_API_KEY (optional, graveyard)

module.exports = async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  // Daily Fuel email (Vercel cron, GET /api/tool?fuel=1). Handled before the POST tools.
  if (req.method === 'GET' && req.query && req.query.fuel) {
    try { return await dailyFuel(req, res); }
    catch (e) { console.error('daily fuel error:', e.message); return res.status(500).json({ error: String(e.message || e) }); }
  }
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!process.env.ANTHROPIC_API_KEY) return res.status(500).json({ error: 'Engine not configured (missing API key).' });

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
  body = body || {};

  try {
    switch (body.tool) {
      case 'pricing': return await pricing(body, res);
      case 'rage': return await rage(body, res);
      case 'dating-profile': return await datingProfile(body, res);
      case 'cold-email': return await coldEmail(body, res);
      case 'product-page': return await productPage(body, res);
      case 'graveyard': return await graveyard(body, res);
      default: return res.status(400).json({ error: 'Unknown tool.' });
    }
  } catch (e) {
    console.error('tool router error:', e.message);
    return res.status(500).json({ error: 'Something unexpected happened. Try again.' });
  }
};

// ════════════════ TOOLS ════════════════

// ── Day 02: Pricing Coach ──
const PRICING_FRAMEWORKS = `
PRICING FRAMEWORKS YOU MAY CITE (only cite what you actually apply):
- Value-based pricing: price against the customer value created, not cost or competitors.
- Value metric selection (Patrick Campbell / ProfitWell): charge along the axis where customer value grows (seats, usage, revenue processed). The single highest-leverage pricing decision.
- Van Westendorp Price Sensitivity Meter: four-question survey to find the acceptable price range.
- Good-Better-Best (three-tier): anchors choice, lifts ARPU ~10-40% vs single price (HBR).
- Decoy effect: a deliberately inferior middle option steers buyers to the target tier.
- Price anchoring: show the high tier first; the rest feels reasonable.
- Penetration vs skimming: underprice to win a land-grab market, or overprice early adopters in a differentiated one.
- 10x rule: charge ~1/10th of the measurable value you create.
- Freemium as acquisition (not a business model): free tier must feed the paid funnel with a natural upgrade wall.

REAL CASE STUDIES YOU MAY CITE (only when genuinely relevant):
- Slack: fair billing (only pay for active users) removed adoption risk in team rollouts.
- Superhuman: $30/mo when email apps were free — priced as a professional performance tool.
- Notion: generous personal free tier drove bottom-up B2B adoption; teams became the paywall.
- Zoom: free 40-min meetings made the upgrade moment self-evident mid-meeting.
- Dropbox: storage as value metric + referral-for-storage loop.
- Mailchimp: freemium up to 2k contacts; the value metric (contacts) grows with customer success.
- Salesforce: per-seat SaaS pricing standard; predictable, scales with org size.
- Tesla: software unlocks (Autopilot) — same hardware, versioned pricing.`;

async function pricing(body, res) {
  let url = (body.url || '').trim();
  const notes = (body.notes || '').trim().slice(0, 800);
  if (!url) return res.status(400).json({ error: 'Paste your product URL first.' });
  const page = await loadPage(url);
  if (page.error) return res.status(page.status).json({ error: page.error });

  const prompt = `You are a senior SaaS and product pricing strategist. A founder pasted their product URL. Below is the extracted text of their live page. Study what the product is, who it serves, and any current pricing visible, then give a pricing recommendation a good consultant would charge for. Ground every recommendation in a named framework or real case study from the list. Be specific: real numbers, real tier names, exact value metric. If the page shows current pricing, critique it directly. Never invent facts about the product that are not on the page.
${PRICING_FRAMEWORKS}

PRODUCT URL: ${page.url}
PAGE TITLE: ${page.title}
${notes ? `FOUNDER'S NOTE: ${notes}\n` : ''}PAGE TEXT (extracted from live HTML):
"""
${page.text}
"""

Respond with ONLY a valid JSON object, no markdown, EXACTLY this shape:
{
  "product_read": "<2-3 sentences: what this product is, who it's for, the core value it creates>",
  "category": "<market category, 2-5 words>",
  "current_pricing_read": "<their current pricing and its main problem, or 'No pricing visible on the page' plus what that costs them>",
  "value_metric": { "metric": "<the axis to charge along>", "why": "<2 sentences>" },
  "model": { "name": "<recommended pricing model>", "why": "<2-3 sentences>" },
  "tiers": [
    { "name": "<tier>", "price": "<e.g. $29/mo>", "who": "<who buys this>", "includes": "<2-3 defining things>" },
    { "name": "<tier>", "price": "<price>", "who": "<who>", "includes": "<...>" },
    { "name": "<tier>", "price": "<price>", "who": "<who>", "includes": "<...>" }
  ],
  "quick_wins": [
    { "title": "<5-8 words>", "detail": "<1-2 sentences, shippable this week>" },
    { "title": "...", "detail": "..." },
    { "title": "...", "detail": "..." }
  ],
  "frameworks_applied": [
    { "name": "<framework>", "application": "<one sentence for THIS product>" },
    { "name": "<framework>", "application": "<one sentence>" }
  ],
  "case_study": { "company": "<from the list>", "lesson": "<2 sentences>" },
  "confidence": "<high|medium|low>",
  "confidence_note": "<one sentence: what extra info would sharpen this>"
}

If the page is clearly an error page or empty shell, respond with ONLY: {"error":"Couldn't read that page. Is it live and public?"}`;

  return callClaude(res, prompt, 2000, { hostname: page.hostname });
}

// ── Day 06: Fine Print Rage Meter ──
async function rage(body, res) {
  let source = (body.source || '').trim();
  if (!source || source.length < 4) return res.status(400).json({ error: 'Paste a terms-of-service URL or the policy text itself.' });

  let docText = '', docLabel = '';
  const looksLikeUrl = /^(https?:\/\/)?[a-z0-9.-]+\.[a-z]{2,}(\/\S*)?$/i.test(source) && !source.includes(' ');
  if (looksLikeUrl) {
    const page = await loadPage(source, 14000);
    if (page.error) return res.status(422).json({ error: "Couldn't load that page. Paste the policy text directly instead." });
    docText = page.text; docLabel = page.hostname;
  } else {
    docText = source.slice(0, 14000); docLabel = 'pasted document';
    if (docText.length < 200) return res.status(400).json({ error: 'That is too short to be a real policy. Paste the full text or a URL.' });
  }

  const prompt = `You are a consumer-rights lawyer with a dark sense of humour. Below is a terms-of-service or privacy-policy document. Find the FIVE most outrageous, invasive, or one-sided clauses and translate each into blunt plain English a 15-year-old would understand. Every clause must quote or closely paraphrase actual text from the document — never invent a clause that is not there. If the document is genuinely fair, say so and score low.

DOCUMENT (${docLabel}):
"""
${docText}
"""

Scoring: 0-100 rage score. 0-20 = surprisingly fair. 21-45 = standard corporate self-protection. 46-70 = aggressively one-sided. 71-90 = they own your firstborn. 91-100 = call a lawyer.

Respond with ONLY a valid JSON object, no markdown, EXACTLY this shape:
{
  "doc_read": "<one sentence: what this document is and who wrote it>",
  "rage_score": <0-100>,
  "rage_verdict": "<one savage sentence>",
  "clauses": [
    { "title": "<4-7 words>", "quote": "<actual clause text, under 200 chars>", "translation": "<blunt plain English, 1-2 sentences>", "severity": <1-5> },
    { "title": "...", "quote": "...", "translation": "...", "severity": <1-5> },
    { "title": "...", "quote": "...", "translation": "...", "severity": <1-5> },
    { "title": "...", "quote": "...", "translation": "...", "severity": <1-5> },
    { "title": "...", "quote": "...", "translation": "...", "severity": <1-5> }
  ],
  "silver_lining": "<one genuinely fair thing in the document, or 'None found.'>",
  "share_line": "<tweet-length line with the score, max 120 chars>"
}

If the text is clearly not a legal/policy document, respond with ONLY: {"error":"That doesn't look like a terms or policy document."}`;

  return callClaude(res, prompt, 1800, { docLabel });
}

// ── Day 07: Startup Idea Dating Profile ──
async function datingProfile(body, res) {
  const idea = (body.idea || '').trim().slice(0, 1200);
  if (!idea || idea.length < 12) return res.status(400).json({ error: 'Describe the idea in at least one full sentence.' });

  const prompt = `You are a sharp startup analyst who writes like a dating-app bio ghostwriter. Someone just described their startup idea. Turn it into a brutally honest dating profile for the idea itself. Funny on the surface, real analysis underneath: every green flag, red flag, and toxic trait must reflect a genuine strategic strength or weakness of THIS specific idea, not generic startup jokes. No emojis anywhere.

THE IDEA:
"""
${idea}
"""

Respond with ONLY a valid JSON object, no markdown, EXACTLY this shape:
{
  "profile_name": "<catchy name, 2-4 words, title case>",
  "tagline": "<dating-bio one-liner, max 90 chars, witty but accurate>",
  "age": "<how old this idea really is, e.g. 'Been around since 2016 under different names'>",
  "looking_for": "<its ideal early customer, one sentence>",
  "bio": "<3-4 sentence dating bio in the idea's own voice, charming, self-aware, quietly revealing its business model>",
  "green_flags": [
    { "flag": "<5-9 words>", "why": "<the real strategic strength, one sentence>" },
    { "flag": "...", "why": "..." },
    { "flag": "...", "why": "..." }
  ],
  "red_flags": [
    { "flag": "<5-9 words>", "why": "<the real risk, one sentence>" },
    { "flag": "...", "why": "..." },
    { "flag": "...", "why": "..." }
  ],
  "toxic_traits": [
    { "trait": "<5-9 words>", "why": "<the failure mode if unaddressed>" },
    { "trait": "...", "why": "..." }
  ],
  "best_match": { "who": "<the customer most likely to love and pay, specific>", "why": "<one sentence>" },
  "worst_match": { "who": "<who will waste this idea's time>", "why": "<one sentence>" },
  "exes": "<one sentence naming 1-2 real companies that dated this idea before and how it ended. Only companies you are confident existed>",
  "compatibility_score": <1-100>,
  "first_date": "<the cheapest MVP experiment to run this week, one sentence, specific>",
  "share_line": "<tweet-length line, max 120 chars>"
}`;

  return callClaude(res, prompt, 1600, {});
}

// ── Day 08: Cold Email Rewrite Desk ──
async function coldEmail(body, res) {
  const email = (body.email || '').trim().slice(0, 6000);
  const buyer = (body.buyer || '').trim().slice(0, 500);
  if (!email || email.length < 40) return res.status(400).json({ error: 'Paste the full cold email, subject line included if you have one.' });

  const prompt = `You are a cold email specialist who has sent millions of B2B emails and knows exactly why 99% get deleted in 2 seconds. Someone pasted their cold email. Tear it down line by line, then rewrite it properly${buyer ? ' for their stated buyer' : ''}.

Principles you write by: one reader, one problem, one ask. Subject lines under 5 words that read like an internal email. First line about THEM, never "I hope this finds you well" or your company. Social proof with numbers, not adjectives. One CTA, low-friction ("worth a look?" not "book 30 minutes"). Under 120 words. No buzzwords: leverage, synergy, streamline, revolutionize, cutting-edge all die on sight.

THE EMAIL:
"""
${email}
"""
${buyer ? `THE BUYER: ${buyer}\n` : ''}
Respond with ONLY a valid JSON object, no markdown, EXACTLY this shape:
{
  "verdict": "<one blunt sentence: would this get a reply, and why not>",
  "reply_odds": "<estimated reply rate as a phrase, e.g. 'under 0.5%'>",
  "teardown": [
    { "quote": "<actual line, under 120 chars>", "problem": "<why it kills the email, one sentence>" },
    { "quote": "...", "problem": "..." },
    { "quote": "...", "problem": "..." }
  ],
  "spam_triggers": ["<word or pattern hurting deliverability>", "...", "..."],
  "scores": { "subject": <1-10>, "opener": <1-10>, "value": <1-10>, "cta": <1-10> },
  "rewrite": {
    "subject": "<the subject line you'd send>",
    "body": "<full rewritten email, under 120 words, \\n line breaks, first line about them>"
  },
  "followups": [
    { "day": "Day 3", "subject": "<subject>", "body": "<2-3 lines, new angle, \\n breaks>" },
    { "day": "Day 7", "subject": "<subject>", "body": "<2-3 lines, value-add>" },
    { "day": "Day 14", "subject": "<subject>", "body": "<2-line breakup email, no guilt>" }
  ],
  "one_rule": "<the single most important rule for this person, one sentence>"
}

If the pasted text is clearly not an email, respond with ONLY: {"error":"That doesn't look like an email. Paste the actual message you're sending."}`;

  return callClaude(res, prompt, 2000, {});
}

// ── Day 09: Product Page Optimizer ──
async function productPage(body, res) {
  let url = (body.url || '').trim();
  if (!url) return res.status(400).json({ error: 'Paste your product page URL first.' });
  const page = await loadPage(url);
  if (page.error) return res.status(page.status).json({ error: "Couldn't load that page. Is it live and public? Some storefronts block bots — try the direct product URL." });

  const prompt = `You are a conversion copywriter and e-commerce merchandiser who has optimized thousands of DTC product pages. Below is the extracted text of a live product page. Rewrite it to convert. Every recommendation must be grounded in what the product actually is per the page text — never invent features, materials, certifications, or claims that are not supported by the page.

PRODUCT URL: ${page.url}
PAGE TITLE: ${page.title}
PAGE TEXT:
"""
${page.text}
"""

Respond with ONLY a valid JSON object, no markdown, EXACTLY this shape:
{
  "product_read": "<2 sentences: what this product is, who buys it, its strongest selling angle>",
  "current_problem": "<the single biggest conversion problem with the current copy, one sentence>",
  "title_rewrite": { "current": "<their current title, trimmed>", "better": "<benefit-led title under 70 chars>" },
  "bullets": ["<benefit-first bullet, under 110 chars>", "...", "...", "...", "..."],
  "faq": [
    { "q": "<the question stopping buyers>", "a": "<2-sentence answer, grounded in page facts>" },
    { "q": "...", "a": "..." },
    { "q": "...", "a": "..." },
    { "q": "...", "a": "..." }
  ],
  "trust_copy": "<2-3 sentences for below the buy button. Only policies visible on the page; if none, mark 'if true:'>",
  "images_to_add": ["<specific missing shot>", "...", "..."],
  "seo": {
    "title_tag": "<under 60 chars>",
    "meta_description": "<under 155 chars>",
    "keywords": ["<primary>", "<secondary>", "<long-tail>", "<long-tail>"]
  },
  "quick_wins": [
    { "title": "<5-8 words>", "detail": "<1-2 sentences, shippable today>" },
    { "title": "...", "detail": "..." },
    { "title": "...", "detail": "..." }
  ]
}

If the page is clearly not a product page, respond with ONLY: {"error":"That doesn't look like a product page. Paste the direct link to one product."}`;

  return callClaude(res, prompt, 2200, { hostname: page.hostname });
}

// ── Day 10: Startup Graveyard ──
async function graveyard(body, res) {
  const idea = (body.idea || '').trim().slice(0, 1200);
  if (!idea || idea.length < 12) return res.status(400).json({ error: 'Describe the idea in at least one full sentence.' });

  let evidence = null;
  if (process.env.LINKUP_API_KEY) {
    evidence = await fetchLinkup(
      `Startups that tried and failed at this idea and shut down: "${idea.slice(0, 200)}". Name specific dead companies, their funding, and why they failed.`,
      process.env.LINKUP_API_KEY
    ).catch(() => null);
  }

  const prompt = `You are a startup historian who maintains the graveyard: the record of every company that tried an idea and died. Someone just described their startup idea. Dig up the dead.

RULES ON TRUTH: Only name real companies you are confident actually existed and actually shut down, pivoted away, or were acqui-hired at a loss. Real names, real approximate years, real approximate funding (say "undisclosed" if unknown). If you are not confident about a fact, write "~" before the number or "reportedly". If you genuinely know of no dead company that tried this specific idea, return fewer graves and say so in the pattern — never invent a company.
${evidence ? `\nLIVE SEARCH EVIDENCE (from a real web search, use to sharpen names/dates):\n${evidence}\n` : ''}
THE IDEA:
"""
${idea}
"""

Respond with ONLY a valid JSON object, no markdown, EXACTLY this shape:
{
  "idea_read": "<one sentence: what this idea is, in category terms>",
  "graves": [
    {
      "name": "<real dead company>",
      "years": "<e.g. 2014-2019>",
      "funding": "<e.g. $12M raised, or 'undisclosed'>",
      "epitaph": "<one dry, funny gravestone line, max 90 chars>",
      "cause_of_death": "<the real reason it died, 1-2 sentences, specific>"
    }
  ],
  "pattern": "<2-3 sentences: the structural reason companies in this space keep dying>",
  "survivors": "<one sentence: who is still alive and why, or 'No one has survived this yet.'>",
  "survival_verdict": {
    "odds": "<one of: 'Grim', 'Uphill', 'Fighting chance', 'Real shot', 'Green field'>",
    "reasoning": "<2 sentences: what would have to be true for THIS version to live>"
  },
  "the_edge": "<the single unfair advantage the founder should have, one sentence>",
  "share_line": "<tweet-length line, max 120 chars>"
}

Include 3 to 5 graves. Fewer is fine if truth demands it.`;

  return callClaude(res, prompt, 1800, evidence ? { evidence_used: true } : {});
}

// ── Daily Fuel: one motivation video a day, emailed at 6:30 am IST ──
// Private list: recipients come only from the Vercel env var DAILY_FUEL_TO (comma-separated),
// sent as one email from Pratik (first address in To, the rest in BCC). Videos and posters live in /daily-fuel/ on this site.
// Env: RESEND_API_KEY (or GMAT_RESEND_KEY), DAILY_FUEL_TO. Optional: CRON_SECRET.
const FUEL_SITE = 'https://www.pratikrenuse.com/daily-fuel/';
const FUEL_FROM = 'Pratik Renuse <pratik@spanishpropertyinsights.com>';
const FUEL_START = Date.UTC(2026, 10, 21); // Day 1 = Saturday 21 November 2026 (IST date)

async function dailyFuel(req, res) {
  const secret = process.env.CRON_SECRET;
  const fromCron = /^vercel-cron\//.test(req.headers['user-agent'] || '');
  if (secret ? req.headers.authorization !== `Bearer ${secret}` : !fromCron) return res.status(401).json({ error: 'unauthorized' });
  const key = process.env.RESEND_API_KEY || process.env.GMAT_RESEND_KEY;
  if (!key) return res.status(500).json({ error: 'RESEND_API_KEY is not set' });
  const recipients = (process.env.DAILY_FUEL_TO || '').split(',').map(s => s.trim()).filter(s => s.includes('@'));
  if (!recipients.length) return res.status(500).json({ error: 'DAILY_FUEL_TO is not set' });

  // The cron runs at 5:30 am IST (00:00 UTC); the email is scheduled for 6:30 am IST (01:00 UTC) the same day.
  const now = new Date(), ist = new Date(now.getTime() + 330 * 60000);
  const istMidnight = Date.UTC(ist.getUTCFullYear(), ist.getUTCMonth(), ist.getUTCDate());
  const day = Math.round((istMidnight - FUEL_START) / 864e5) + 1;

  const listRes = await fetch(FUEL_SITE + 'fuel.json', { cache: 'no-store' });
  if (!listRes.ok) throw new Error('fuel.json ' + listRes.status);
  const list = await listRes.json();
  const item = list.find(v => v.n === day);
  if (!item) return res.status(200).json({ status: 'no video for today', day, total: list.length });

  const target = new Date(Date.UTC(ist.getUTCFullYear(), ist.getUTCMonth(), ist.getUTCDate(), 1, 0));
  const scheduled_at = target > now ? target.toISOString() : undefined;
  const nn = String(day).padStart(2, '0');
  const link = `${FUEL_SITE}?d=${day}`;
  const e = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const subject = `Day ${day}: ${item.headline}`;
  const html = `<div style="background:#F6F2F1;padding:32px 16px;font-family:Georgia,'Times New Roman',serif;color:#1A1512">
  <div style="max-width:480px;margin:0 auto">
    <p style="font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#8C6A18;margin:0 0 12px">Daily Fuel &middot; Day ${day} of ${list.length}</p>
    <p style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.6;color:#38302A;margin:0 0 20px">${e(item.intro || "Just for us. One short video a day from people who didn't quit when it got hard. Let's not quit either.")}</p>
    <a href="${link}" style="display:block;text-decoration:none"><img src="${FUEL_SITE}posters/${nn}.jpg" width="480" alt="Play today's video: ${e(item.who)}" style="display:block;width:100%;max-width:480px;height:auto;border:0;border-radius:12px"></a>
    <p style="margin:24px 0 0"><a href="${link}" style="display:inline-block;background:#1A1512;color:#F6F2F1;font-family:Arial,Helvetica,sans-serif;font-size:13px;letter-spacing:2px;text-transform:uppercase;padding:14px 24px;text-decoration:none">Play today's video</a></p>
    <p style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#786E66;margin:24px 0 0">Under a minute. Watch it before you open anything else.</p>
  </div>
</div>`;

  // One email from Pratik: addressed to the first address in DAILY_FUEL_TO (Pratik), the rest in BCC.
  // Replies go back to Pratik.
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + key, 'Idempotency-Key': `daily-fuel-v2-${day}` },
    body: JSON.stringify(Object.assign({ from: FUEL_FROM, to: [recipients[0]], bcc: recipients.slice(1), reply_to: recipients[0], subject, html }, scheduled_at ? { scheduled_at } : {}))
  });
  const out = await r.json().catch(() => ({}));
  if (!r.ok) return res.status(502).json({ error: 'resend', detail: out });
  return res.status(200).json({ status: scheduled_at ? 'scheduled' : 'sent', day, at: scheduled_at || now.toISOString(), id: out.id, recipients: recipients.length });
}

// ════════════════ SHARED HELPERS ════════════════

async function loadPage(url, cap = 10000) {
  if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
  let hostname;
  try {
    const u = new URL(url);
    if (!u.hostname.includes('.')) throw new Error('bad host');
    hostname = u.hostname.replace(/^www\./, '');
  } catch {
    return { error: "That doesn't look like a real URL.", status: 400 };
  }
  try {
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), 12000);
    const pr = await fetch(url, {
      redirect: 'follow',
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36' }
    });
    clearTimeout(t);
    if (!pr.ok) throw new Error('HTTP ' + pr.status);
    const html = (await pr.text()).slice(0, 700000);
    const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [, ''])[1].trim().slice(0, 200);
    const text = htmlToText(html).slice(0, cap);
    if (text.length < 100) throw new Error('empty');
    return { url, hostname, title, text };
  } catch {
    return { error: "Couldn't load that page. Is it live and public? Heavily JS-rendered pages can also hide from us.", status: 422 };
  }
}

async function callClaude(res, prompt, maxTokens, extra) {
  try {
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), 45000);
    const ar = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: maxTokens,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    clearTimeout(t);
    if (!ar.ok) {
      console.error('Anthropic error:', ar.status, (await ar.text()).slice(0, 300));
      return res.status(502).json({ error: 'Engine error. Try again in a moment.' });
    }
    const out = await ar.json();
    const raw = out.content?.[0]?.text || '';
    const parsed = extractJson(raw);
    if (!parsed) return res.status(502).json({ error: 'The result came out malformed. Try again.' });
    if (parsed.error) return res.status(422).json(parsed);
    Object.assign(parsed, extra || {});
    return res.status(200).json(parsed);
  } catch {
    return res.status(504).json({ error: 'Took too long. Try again.' });
  }
}

async function fetchLinkup(q, key) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), 8000);
  const r = await fetch('https://api.linkup.so/v1/search', {
    method: 'POST',
    signal: controller.signal,
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ q, depth: 'standard', outputType: 'sourcedAnswer' })
  });
  clearTimeout(t);
  if (!r.ok) return null;
  const d = await r.json();
  return (d?.answer || '').slice(0, 900) || null;
}

function htmlToText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<(button|a)\b[^>]*>([\s\S]*?)<\/\1>/gi, ' [$1: $2] ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&#\d+;/g, ' ').replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractJson(text) {
  if (!text) return null;
  let t = text.replace(/```json/gi, '```').trim();
  const fenced = t.match(/```\s*([\s\S]*?)\s*```/);
  if (fenced) t = fenced[1].trim();
  const start = t.indexOf('{');
  const end = t.lastIndexOf('}');
  if (start === -1 || end === -1 || end < start) return null;
  try { return JSON.parse(t.slice(start, end + 1)); } catch { return null; }
}

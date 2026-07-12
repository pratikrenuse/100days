// /api/pricing.js — Day 02 Pricing Coach. POST { url }
// Fetches the product page server-side, then Claude returns a pricing
// recommendation grounded in named frameworks and real case studies.
// Purely Claude. Env vars (Vercel): ANTHROPIC_API_KEY

const FRAMEWORKS = `
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
- Superhuman: $30/mo when email apps were free — priced as a professional performance tool, positioning did the work.
- Notion: generous personal free tier drove bottom-up B2B adoption; teams became the paywall.
- Zoom: free 40-min meetings made the upgrade moment self-evident mid-meeting.
- Dropbox: storage as value metric + referral-for-storage loop.
- Mailchimp: freemium up to 2k contacts; the value metric (contacts) grows with customer success.
- Salesforce: per-seat SaaS pricing standard; predictable, scales with org size.
- Tesla: software unlocks (Autopilot) — same hardware, versioned pricing.`;

module.exports = async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!process.env.ANTHROPIC_API_KEY) return res.status(500).json({ error: 'Pricing engine not configured (missing API key).' });

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
  let url = ((body || {}).url || '').trim();
  const notes = ((body || {}).notes || '').trim().slice(0, 800);
  if (!url) return res.status(400).json({ error: 'Paste your product URL first.' });
  if (!/^https?:\/\//i.test(url)) url = 'https://' + url;

  let hostname;
  try {
    const u = new URL(url);
    if (!u.hostname.includes('.')) throw new Error('bad host');
    hostname = u.hostname.replace(/^www\./, '');
  } catch {
    return res.status(400).json({ error: "That doesn't look like a real URL." });
  }

  // Fetch the live product page
  let pageText = '';
  let pageTitle = '';
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
    const html = (await pr.text()).slice(0, 500000);
    pageTitle = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [, ''])[1].trim().slice(0, 200);
    pageText = htmlToText(html).slice(0, 9000);
    if (pageText.length < 100) throw new Error('empty');
  } catch {
    return res.status(422).json({ error: "Couldn't load that page. Is it live and public? Heavily JS-rendered pages can also hide from us." });
  }

  const prompt = `You are a senior SaaS and product pricing strategist. A founder pasted their product URL. Below is the extracted text of their live page. Study what the product is, who it serves, and any current pricing visible, then give a pricing recommendation a good consultant would charge for. Ground every recommendation in a named framework or real case study from the list. Be specific: real numbers, real tier names, exact value metric. If the page shows current pricing, critique it directly. Never invent facts about the product that are not on the page.
${FRAMEWORKS}

PRODUCT URL: ${url}
PAGE TITLE: ${pageTitle}
${notes ? `FOUNDER'S NOTE: ${notes}\n` : ''}PAGE TEXT (extracted from live HTML; [a: ...] and [button: ...] mark link/button labels):
"""
${pageText}
"""

Respond with ONLY a valid JSON object, no markdown, no code fences, EXACTLY this shape:
{
  "product_read": "<2-3 sentences: what this product is, who it's for, and the core value it creates. Written so the founder thinks 'yes, it understood us.'>",
  "category": "<market category, 2-5 words>",
  "current_pricing_read": "<what their current pricing appears to be and its main problem, or 'No pricing visible on the page' plus what that costs them>",
  "value_metric": { "metric": "<the axis to charge along>", "why": "<2 sentences, grounded in how value scales for their customer>" },
  "model": { "name": "<recommended pricing model, e.g. 'Good-Better-Best with usage-based scaling'>", "why": "<2-3 sentences>" },
  "tiers": [
    { "name": "<tier name>", "price": "<e.g. $29/mo>", "who": "<who buys this>", "includes": "<the 2-3 things that define it>" },
    { "name": "<tier name>", "price": "<price>", "who": "<who>", "includes": "<...>" },
    { "name": "<tier name>", "price": "<price>", "who": "<who>", "includes": "<...>" }
  ],
  "quick_wins": [
    { "title": "<5-8 words>", "detail": "<1-2 sentences, shippable this week>" },
    { "title": "<5-8 words>", "detail": "<1-2 sentences>" },
    { "title": "<5-8 words>", "detail": "<1-2 sentences>" }
  ],
  "frameworks_applied": [
    { "name": "<framework name>", "application": "<one sentence: how it applies to THIS product>" },
    { "name": "<framework name>", "application": "<one sentence>" }
  ],
  "case_study": { "company": "<company from the list>", "lesson": "<2 sentences connecting their playbook to this product>" },
  "confidence": "<high|medium|low>",
  "confidence_note": "<one sentence: what extra info would sharpen this, e.g. churn, ACV, win-rate data>"
}

If the page text is clearly an error page or empty shell, respond with ONLY: {"error":"Couldn't read that page. Is it live and public?"}`;

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
        model: process.env.PRICING_MODEL || 'claude-haiku-4-5-20251001',
        max_tokens: 2000,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    clearTimeout(t);
    if (!ar.ok) {
      console.error('Anthropic error:', ar.status, (await ar.text()).slice(0, 300));
      return res.status(502).json({ error: 'Pricing engine error. Try again in a moment.' });
    }
    const out = await ar.json();
    const raw = out.content?.[0]?.text || '';
    const parsed = extractJson(raw);
    if (!parsed) return res.status(502).json({ error: 'The recommendation came out malformed. Try again.' });
    if (parsed.error) return res.status(422).json(parsed);
    parsed.hostname = hostname;
    return res.status(200).json(parsed);
  } catch {
    return res.status(504).json({ error: 'The analysis took too long. Try again.' });
  }
};

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

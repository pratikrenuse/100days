// /api/product-page.js — Day 09 Product Page Optimizer. POST { url }
// Paste an e-commerce product URL → optimized title, bullets, FAQ,
// trust copy, images to add, and SEO fields. Purely Claude.
// Env vars (Vercel): ANTHROPIC_API_KEY

module.exports = async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!process.env.ANTHROPIC_API_KEY) return res.status(500).json({ error: 'Optimizer not configured.' });

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
  let url = ((body || {}).url || '').trim();
  if (!url) return res.status(400).json({ error: 'Paste your product page URL first.' });
  if (!/^https?:\/\//i.test(url)) url = 'https://' + url;

  let hostname;
  try {
    const u = new URL(url);
    if (!u.hostname.includes('.')) throw new Error('bad host');
    hostname = u.hostname.replace(/^www\./, '');
  } catch {
    return res.status(400).json({ error: "That doesn't look like a real URL." });
  }

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
    const html = (await pr.text()).slice(0, 700000);
    pageTitle = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [, ''])[1].trim().slice(0, 200);
    pageText = htmlToText(html).slice(0, 10000);
    if (pageText.length < 100) throw new Error('empty');
  } catch {
    return res.status(422).json({ error: "Couldn't load that page. Is it live and public? Some storefronts block bots — try the direct product URL." });
  }

  const prompt = `You are a conversion copywriter and e-commerce merchandiser who has optimized thousands of DTC product pages. Below is the extracted text of a live product page. Rewrite it to convert. Every recommendation must be grounded in what the product actually is per the page text — never invent features, materials, certifications, or claims that are not supported by the page.

PRODUCT URL: ${url}
PAGE TITLE: ${pageTitle}
PAGE TEXT (extracted from live HTML):
"""
${pageText}
"""

Respond with ONLY a valid JSON object, no markdown, EXACTLY this shape:
{
  "product_read": "<2 sentences: what this product is, who buys it, and its strongest selling angle per the page>",
  "current_problem": "<the single biggest conversion problem with the current page copy, one sentence>",
  "title_rewrite": { "current": "<their current product title, trimmed>", "better": "<benefit-led title under 70 chars: what it is + who it's for + key benefit>" },
  "bullets": [
    "<benefit-first bullet, under 110 chars: outcome, then the feature that delivers it>",
    "...", "...", "...", "..."
  ],
  "faq": [
    { "q": "<the question stopping buyers, in their words>", "a": "<2-sentence answer that removes the objection, grounded in page facts>" },
    { "q": "...", "a": "..." },
    { "q": "...", "a": "..." },
    { "q": "...", "a": "..." }
  ],
  "trust_copy": "<2-3 sentences for below the buy button: guarantee, shipping, returns. Only use policies visible on the page; if none visible, write it as a recommendation marked 'if true:'>",
  "images_to_add": [
    "<specific shot missing from a converting page, e.g. 'scale shot: product in hand'>",
    "...", "..."
  ],
  "seo": {
    "title_tag": "<under 60 chars>",
    "meta_description": "<under 155 chars, includes the main keyword and a reason to click>",
    "keywords": ["<primary keyword>", "<secondary>", "<long-tail>", "<long-tail>"]
  },
  "quick_wins": [
    { "title": "<5-8 words>", "detail": "<1-2 sentences, shippable today>" },
    { "title": "...", "detail": "..." },
    { "title": "...", "detail": "..." }
  ]
}

If the page is clearly not a product page (blog, homepage, error), respond with ONLY: {"error":"That doesn't look like a product page. Paste the direct link to one product."}`;

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
        max_tokens: 2200,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    clearTimeout(t);
    if (!ar.ok) {
      console.error('Anthropic error:', ar.status, (await ar.text()).slice(0, 300));
      return res.status(502).json({ error: 'Optimizer error. Try again in a moment.' });
    }
    const out = await ar.json();
    const raw = out.content?.[0]?.text || '';
    const parsed = extractJson(raw);
    if (!parsed) return res.status(502).json({ error: 'The result came out malformed. Try again.' });
    if (parsed.error) return res.status(422).json(parsed);
    parsed.hostname = hostname;
    return res.status(200).json(parsed);
  } catch {
    return res.status(504).json({ error: 'Took too long. Try again.' });
  }
};

function htmlToText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
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

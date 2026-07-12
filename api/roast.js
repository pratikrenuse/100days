// /api/roast.js — Vercel serverless function. POST { url }
// Fetches the target landing page server-side, then Claude tears it apart.
// Purely Claude: no other model in the loop.
//
// Env vars (Vercel): ANTHROPIC_API_KEY (required), LINKUP_API_KEY (optional benchmark)

module.exports = async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!process.env.ANTHROPIC_API_KEY) return res.status(500).json({ error: 'Roast engine not configured (missing API key).' });

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
  let url = ((body || {}).url || '').trim();
  if (!url) return res.status(400).json({ error: 'Paste a landing page URL first.' });
  if (!/^https?:\/\//i.test(url)) url = 'https://' + url;

  let hostname;
  try {
    const u = new URL(url);
    if (!u.hostname.includes('.')) throw new Error('bad host');
    hostname = u.hostname.replace(/^www\./, '');
  } catch {
    return res.status(400).json({ error: "That doesn't look like a real URL." });
  }

  // 1) Fetch the live page server-side
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
  } catch (e) {
    return res.status(422).json({ error: "Couldn't load that page — is it live and public? (Heavily JS-rendered pages can also hide from us.)" });
  }

  // 2) Optional live benchmark via Linkup — never blocks the roast
  let benchmark = null;
  if (process.env.LINKUP_API_KEY) {
    benchmark = await fetchBenchmark(hostname, process.env.LINKUP_API_KEY).catch(() => null);
  }

  // 3) Claude roast
  const prompt = buildPrompt(url, pageTitle, pageText, benchmark);
  let out;
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
        model: process.env.ROAST_MODEL || 'claude-haiku-4-5-20251001',
        max_tokens: 1800,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    clearTimeout(t);
    if (!ar.ok) {
      const errText = await ar.text();
      console.error('Anthropic error:', ar.status, errText.slice(0, 300));
      return res.status(502).json({ error: 'Roast engine error. Try again in a moment.' });
    }
    out = await ar.json();
  } catch (e) {
    return res.status(504).json({ error: 'The roast took too long. Try again.' });
  }

  const raw = out.content?.[0]?.text || '';
  const parsed = extractJson(raw);
  if (!parsed) return res.status(502).json({ error: 'The roast came out malformed. Try again.' });
  if (parsed.error) return res.status(422).json(parsed);

  if (benchmark && !parsed.benchmark) parsed.benchmark = benchmark;
  parsed.hostname = hostname;
  return res.status(200).json(parsed);
};

// ---- helpers ----

function htmlToText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    // keep button/link text visible as such — helps CTA critique
    .replace(/<(button|a)\b[^>]*>([\s\S]*?)<\/\1>/gi, ' [$1: $2] ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&#\d+;/g, ' ').replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function fetchBenchmark(hostname, key) {
  const q = `What is ${hostname}'s product category, and which company has the best-converting landing page in that exact category? Name the competitor and one specific thing their landing page does well.`;
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
  const answer = d?.answer || '';
  const source = d?.sources?.[0]?.url || d?.sources?.[0]?.name || '';
  if (!answer) return null;
  return { answer: answer.slice(0, 600), source };
}

function buildPrompt(url, title, pageText, benchmark) {
  const bench = benchmark
    ? `\nBENCHMARK CONTEXT (from a live web search — use it to compare them against a REAL named competitor in at least one burn):\n${benchmark.answer}\n`
    : '';
  return `You are the meanest, funniest, most useful landing page critic on the internet. A founder just submitted their landing page for a roast. Below is the full extracted text of the live page. Deliver a savage-but-surgical teardown. Every burn must be SPECIFIC to what you actually see in the page text — quote their exact hero line, exact button text, exact claims. Generic snark is banned; if a burn could apply to any site, it's a failure.
${bench}
PAGE URL: ${url}
PAGE TITLE: ${title}
PAGE TEXT (extracted from the live HTML; [a: ...] and [button: ...] mark link/button labels):
"""
${pageText}
"""

Steps:
1. Identify the hero, primary CTA/button, social proof/testimonials, and pricing (if present).
2. Score each of those 4 sections 1-10 (10 = flawless, 1 = disaster). If a section is entirely missing, that's a low score and the burn should be about its absence.
3. For EACH section write ONE named burn: brutal, funny, quoting the actual text you saw. Where it fits, compare them to the real benchmark competitor above.
4. For EACH section give a concrete fix: the exact rewrite you'd ship.
5. Pick the single meanest one-liner as the shareable headline.

Tone: savage but surgical. Screenshot-worthy mean, but every burn maps to a real, fixable problem. Roast the PAGE, not the person. No slurs.

Respond with ONLY a valid JSON object, no markdown, no code fences, EXACTLY this shape:
{
  "url": "${url}",
  "overall_score": <number 1-10, average of the four>,
  "headline_burn": "<meanest one-liner, max 100 chars>",
  "verdict": "<2 sentence overall verdict, brutal but fair>",
  "benchmark_cite": "<one sentence naming the real competitor from the benchmark and what they do better, or empty string if none>",
  "sections": [
    { "name": "Hero", "score": <1-10>, "burn": "<named specific burn>", "fix": "<exact fix>" },
    { "name": "CTA", "score": <1-10>, "burn": "<named specific burn>", "fix": "<exact fix>" },
    { "name": "Proof", "score": <1-10>, "burn": "<named specific burn>", "fix": "<exact fix>" },
    { "name": "Pricing", "score": <1-10>, "burn": "<named specific burn>", "fix": "<exact fix>" }
  ]
}

If the page text is clearly an error page or empty shell, respond with ONLY: {"error":"Couldn't load that page — is it live and public?"}`;
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

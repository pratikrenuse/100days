// /api/rage.js — Day 06 Fine Print Rage Meter. POST { source }
// source = a URL to a ToS/privacy page OR pasted policy text.
// Claude finds the 5 most outrageous clauses, translates them to plain
// English, and returns a 0-100 rage score. Purely Claude.
// Env vars (Vercel): ANTHROPIC_API_KEY

module.exports = async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!process.env.ANTHROPIC_API_KEY) return res.status(500).json({ error: 'Rage engine not configured.' });

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
  let source = ((body || {}).source || '').trim();
  if (!source || source.length < 4) return res.status(400).json({ error: 'Paste a terms-of-service URL or the policy text itself.' });

  let docText = '';
  let docLabel = '';
  const looksLikeUrl = /^(https?:\/\/)?[a-z0-9.-]+\.[a-z]{2,}(\/\S*)?$/i.test(source) && !source.includes(' ');

  if (looksLikeUrl) {
    let url = source;
    if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
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
      docText = htmlToText(html).slice(0, 14000);
      docLabel = new URL(url).hostname.replace(/^www\./, '');
      if (docText.length < 200) throw new Error('empty');
    } catch {
      return res.status(422).json({ error: "Couldn't load that page. Paste the policy text directly instead." });
    }
  } else {
    docText = source.slice(0, 14000);
    docLabel = 'pasted document';
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
  "rage_verdict": "<one savage sentence summarizing how one-sided this document is>",
  "clauses": [
    { "title": "<4-7 word name for the clause>", "quote": "<the actual clause text, trimmed to under 200 chars>", "translation": "<blunt plain-English meaning, 1-2 sentences>", "severity": <1-5> },
    { "title": "...", "quote": "...", "translation": "...", "severity": <1-5> },
    { "title": "...", "quote": "...", "translation": "...", "severity": <1-5> },
    { "title": "...", "quote": "...", "translation": "...", "severity": <1-5> },
    { "title": "...", "quote": "...", "translation": "...", "severity": <1-5> }
  ],
  "silver_lining": "<one genuinely fair or user-friendly thing in the document, or 'None found.'>",
  "share_line": "<one tweet-length line the user would post, max 120 chars, includes the score>"
}

If the text is clearly not a legal/policy document, respond with ONLY: {"error":"That doesn't look like a terms or policy document."}`;

  return callClaude(res, prompt, { docLabel });
};

async function callClaude(res, prompt, extra) {
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
        max_tokens: 1800,
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

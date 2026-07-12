// /api/cold-email.js — Day 08 Cold Email Rewrite Desk. POST { email, buyer }
// Paste a bad sales email → line-by-line teardown, spam-trigger check,
// full rewrite for the specific buyer, and 3 follow-ups. Purely Claude.
// Env vars (Vercel): ANTHROPIC_API_KEY

module.exports = async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!process.env.ANTHROPIC_API_KEY) return res.status(500).json({ error: 'Rewrite desk not configured.' });

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
  const email = ((body || {}).email || '').trim().slice(0, 6000);
  const buyer = ((body || {}).buyer || '').trim().slice(0, 500);
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
    { "quote": "<actual line from their email, trimmed under 120 chars>", "problem": "<why this line kills the email, one sentence>" },
    { "quote": "...", "problem": "..." },
    { "quote": "...", "problem": "..." }
  ],
  "spam_triggers": ["<word or pattern in their email that hurts deliverability or reads as spam>", "...", "..."],
  "scores": { "subject": <1-10>, "opener": <1-10>, "value": <1-10>, "cta": <1-10> },
  "rewrite": {
    "subject": "<the subject line you'd send>",
    "body": "<the full rewritten email, under 120 words, line breaks as \\n. Written for the specific buyer, first line about them>"
  },
  "followups": [
    { "day": "Day 3", "subject": "<subject>", "body": "<2-3 line follow-up, new angle, \\n line breaks>" },
    { "day": "Day 7", "subject": "<subject>", "body": "<2-3 line follow-up, value-add like a resource or insight>" },
    { "day": "Day 14", "subject": "<subject>", "body": "<2-line breakup email, no guilt-tripping>" }
  ],
  "one_rule": "<the single most important rule this person should tattoo on their monitor, one sentence>"
}

If the pasted text is clearly not an email, respond with ONLY: {"error":"That doesn't look like an email. Paste the actual message you're sending."}`;

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
        max_tokens: 2000,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    clearTimeout(t);
    if (!ar.ok) {
      console.error('Anthropic error:', ar.status, (await ar.text()).slice(0, 300));
      return res.status(502).json({ error: 'Rewrite desk error. Try again in a moment.' });
    }
    const out = await ar.json();
    const raw = out.content?.[0]?.text || '';
    const parsed = extractJson(raw);
    if (!parsed) return res.status(502).json({ error: 'The rewrite came out malformed. Try again.' });
    if (parsed.error) return res.status(422).json(parsed);
    return res.status(200).json(parsed);
  } catch {
    return res.status(504).json({ error: 'Took too long. Try again.' });
  }
};

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

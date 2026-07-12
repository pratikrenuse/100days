// /api/dating-profile.js — Day 07 Startup Idea Dating Profile. POST { idea }
// Turns any startup idea into a dating profile: green flags, red flags,
// toxic traits, best-match customer. Purely Claude.
// Env vars (Vercel): ANTHROPIC_API_KEY

module.exports = async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!process.env.ANTHROPIC_API_KEY) return res.status(500).json({ error: 'Matchmaker not configured.' });

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
  const idea = ((body || {}).idea || '').trim().slice(0, 1200);
  if (!idea || idea.length < 12) return res.status(400).json({ error: 'Describe the idea in at least one full sentence.' });

  const prompt = `You are a sharp startup analyst who writes like a dating-app bio ghostwriter. Someone just described their startup idea. Turn it into a brutally honest dating profile for the idea itself. Funny on the surface, real analysis underneath: every green flag, red flag, and toxic trait must reflect a genuine strategic strength or weakness of THIS specific idea, not generic startup jokes. No emojis anywhere.

THE IDEA:
"""
${idea}
"""

Respond with ONLY a valid JSON object, no markdown, EXACTLY this shape:
{
  "profile_name": "<a catchy name for this idea, 2-4 words, title case>",
  "tagline": "<the idea's dating-bio one-liner, max 90 chars, witty but accurate>",
  "age": "<how old this idea really is, e.g. 'Been around since 2016 under different names' or 'Genuinely new, born this year'>",
  "looking_for": "<who the idea is looking for, i.e. its ideal early customer, one sentence>",
  "bio": "<3-4 sentence dating bio written in the idea's own voice. Charming, self-aware, quietly revealing its business model>",
  "green_flags": [
    { "flag": "<5-9 words>", "why": "<one sentence: the real strategic strength this represents>" },
    { "flag": "...", "why": "..." },
    { "flag": "...", "why": "..." }
  ],
  "red_flags": [
    { "flag": "<5-9 words>", "why": "<one sentence: the real risk this represents>" },
    { "flag": "...", "why": "..." },
    { "flag": "...", "why": "..." }
  ],
  "toxic_traits": [
    { "trait": "<5-9 words>", "why": "<one sentence: the failure mode if unaddressed>" },
    { "trait": "...", "why": "..." }
  ],
  "best_match": { "who": "<the customer persona most likely to love and pay for this, specific>", "why": "<one sentence>" },
  "worst_match": { "who": "<who will waste this idea's time>", "why": "<one sentence>" },
  "exes": "<one sentence naming 1-2 real companies that dated this idea before and how it ended. Only name companies you are confident existed>",
  "compatibility_score": <1-100, honest odds this idea finds product-market love>,
  "first_date": "<the cheapest possible MVP experiment to run this week, one sentence, specific>",
  "share_line": "<one tweet-length line the founder would post, max 120 chars>"
}`;

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
        max_tokens: 1600,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    clearTimeout(t);
    if (!ar.ok) {
      console.error('Anthropic error:', ar.status, (await ar.text()).slice(0, 300));
      return res.status(502).json({ error: 'Matchmaker error. Try again in a moment.' });
    }
    const out = await ar.json();
    const raw = out.content?.[0]?.text || '';
    const parsed = extractJson(raw);
    if (!parsed) return res.status(502).json({ error: 'The profile came out malformed. Try again.' });
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

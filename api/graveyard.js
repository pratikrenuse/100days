// /api/graveyard.js — Day 10 Startup Graveyard. POST { idea }
// Type a startup idea → funeral cards for real dead companies that tried
// it, the pattern that kills them, and a survival verdict for your version.
// Claude core + optional Linkup live search for extra evidence.
// Env vars (Vercel): ANTHROPIC_API_KEY (required), LINKUP_API_KEY (optional)

module.exports = async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!process.env.ANTHROPIC_API_KEY) return res.status(500).json({ error: 'The graveyard is closed (not configured).' });

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
  const idea = ((body || {}).idea || '').trim().slice(0, 1200);
  if (!idea || idea.length < 12) return res.status(400).json({ error: 'Describe the idea in at least one full sentence.' });

  // Optional live evidence — never blocks the result
  let evidence = null;
  if (process.env.LINKUP_API_KEY) {
    evidence = await fetchEvidence(idea, process.env.LINKUP_API_KEY).catch(() => null);
  }

  const prompt = `You are a startup historian who maintains the graveyard: the record of every company that tried an idea and died. Someone just described their startup idea. Dig up the dead.

RULES ON TRUTH: Only name real companies you are confident actually existed and actually shut down, pivoted away, or were acqui-hired at a loss. Real names, real approximate years, real approximate funding (say "undisclosed" if unknown). If you are not confident about a fact, write "~" before the number or "reportedly". If you genuinely know of no dead company that tried this specific idea, return fewer graves and say so in the pattern — never invent a company.
${evidence ? `\nLIVE SEARCH EVIDENCE (from a real web search, use to sharpen names/dates where relevant):\n${evidence.answer}\n` : ''}
THE IDEA:
"""
${idea}
"""

Respond with ONLY a valid JSON object, no markdown, EXACTLY this shape:
{
  "idea_read": "<one sentence: what this idea is, in category terms>",
  "graves": [
    {
      "name": "<real dead company name>",
      "years": "<e.g. 2014-2019>",
      "funding": "<e.g. $12M raised, or 'undisclosed'>",
      "epitaph": "<one dry, funny gravestone line, max 90 chars>",
      "cause_of_death": "<the real reason it died, 1-2 sentences, specific>"
    }
  ],
  "pattern": "<2-3 sentences: the structural reason companies in this space keep dying. The thing they all hit>",
  "survivors": "<one sentence naming who is still alive in this space and why they survived, or 'No one has survived this yet.'>",
  "survival_verdict": {
    "odds": "<one of: 'Grim', 'Uphill', 'Fighting chance', 'Real shot', 'Green field'>",
    "reasoning": "<2 sentences: what would have to be true for THIS version to live where the others died>"
  },
  "the_edge": "<one sentence: the single unfair advantage the founder should have before attempting this>",
  "share_line": "<one tweet-length line, max 120 chars, e.g. 'My idea has 4 gravestones and $80M of burned VC money behind it.'>"
}

Include 3 to 5 graves. Fewer is fine if truth demands it.`;

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
      return res.status(502).json({ error: 'Graveyard error. Try again in a moment.' });
    }
    const out = await ar.json();
    const raw = out.content?.[0]?.text || '';
    const parsed = extractJson(raw);
    if (!parsed) return res.status(502).json({ error: 'The record came out malformed. Try again.' });
    if (evidence) parsed.evidence_used = true;
    return res.status(200).json(parsed);
  } catch {
    return res.status(504).json({ error: 'Took too long. Try again.' });
  }
};

async function fetchEvidence(idea, key) {
  const q = `Startups that tried and failed at this idea and shut down: "${idea.slice(0, 200)}". Name specific dead companies, their funding, and why they failed.`;
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
  if (!answer) return null;
  return { answer: answer.slice(0, 900) };
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

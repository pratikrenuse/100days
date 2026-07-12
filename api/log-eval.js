// /api/log-eval.js — shared L5 production auto-eval for all 100days tools.
// Every tool fires this after a successful generation (fire-and-forget from
// the client). A Claude judge grades the output on 3 criteria and the graded
// example is appended to Supabase (`tool_evals`) — the eval dataset grows
// from real production traffic, per tool, queryable as a time series.
//
// POST { tool, input, output }
// Env vars (Vercel): ANTHROPIC_API_KEY, SUPABASE_URL, SUPABASE_ANON_KEY
// One-time DB setup: run _shared/tool-evals-rls.sql in Supabase SQL Editor.

const KNOWN_TOOLS = ['rage-meter', 'dating-profile', 'cold-email', 'product-page', 'graveyard', 'pricing-coach', 'roast'];

module.exports = async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!process.env.ANTHROPIC_API_KEY) return res.status(500).json({ error: 'Judge not configured.' });

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }

  // Roast has its own judge criteria + table (was /api/score-roast)
  if ((body || {}).tool === 'roast' && body.roast) return scoreRoast(body, res);

  const { tool, input, output } = body || {};
  if (!tool || !KNOWN_TOOLS.includes(tool) || !output) {
    return res.status(400).json({ error: 'Need { tool, input, output } with a known tool.' });
  }

  const judgePrompt = `You are a strict quality judge for a suite of one-shot AI marketing tools. Grade this production output on three criteria, each 1-10:

1. groundedness — is the output specifically about the user's actual input (quotes it, reflects its details), or could it have been generated for any input? 10 = deeply anchored in the input. 1 = fully generic.
2. usefulness — could the user act on this immediately (copy it, ship it, decide from it)? 10 = directly actionable. 1 = vague filler.
3. craft — is the writing sharp, specific, on-voice (witty where the tool is witty, precise where it should be precise), free of hedging and filler? 10 = publishable. 1 = slop.

TOOL: ${tool}
USER INPUT (truncated): ${String(input || '').slice(0, 1500)}
OUTPUT TO GRADE (truncated): ${JSON.stringify(output).slice(0, 5000)}

Respond with ONLY valid JSON, no markdown:
{"groundedness": <1-10>, "usefulness": <1-10>, "craft": <1-10>, "notes": "<one sentence on the weakest criterion>"}`;

  let scores = null;
  try {
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), 25000);
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
        max_tokens: 250,
        messages: [{ role: 'user', content: judgePrompt }]
      })
    });
    clearTimeout(t);
    if (ar.ok) {
      const d = await ar.json();
      const raw = d.content?.[0]?.text || '';
      const start = raw.indexOf('{'); const end = raw.lastIndexOf('}');
      if (start !== -1 && end > start) {
        try { scores = JSON.parse(raw.slice(start, end + 1)); } catch { scores = null; }
      }
    }
  } catch { /* judge failure never breaks the product */ }

  const clamp = n => (typeof n === 'number' && n >= 1 && n <= 10) ? Math.round(n) : null;
  const groundedness = clamp(scores?.groundedness);
  const usefulness = clamp(scores?.usefulness);
  const craft = clamp(scores?.craft);
  const parts = [groundedness, usefulness, craft].filter(n => n !== null);
  const overall = parts.length ? +(parts.reduce((a, b) => a + b, 0) / parts.length).toFixed(2) : null;

  let logged = false;
  if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
    try {
      const r = await fetch(`${process.env.SUPABASE_URL}/rest/v1/tool_evals`, {
        method: 'POST',
        headers: {
          apikey: process.env.SUPABASE_ANON_KEY,
          Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal'
        },
        body: JSON.stringify({
          tool,
          input: String(input || '').slice(0, 2000),
          output,
          judge_groundedness: groundedness,
          judge_usefulness: usefulness,
          judge_craft: craft,
          judge_overall: overall,
          judge_notes: (scores?.notes || '').slice(0, 500)
        })
      });
      logged = r.ok;
      if (!r.ok) console.error('tool_evals insert failed:', r.status, (await r.text()).slice(0, 200));
    } catch (e) { console.error('tool_evals insert error:', e.message); }
  }

  return res.status(200).json({ ok: true, judge: { groundedness, usefulness, craft, overall }, logged });
};

// ── Roast-specific judge → roast_evals table (was /api/score-roast) ──
async function scoreRoast(body, res) {
  const { url, roast } = body;
  if (!url || !Array.isArray(roast.sections)) return res.status(400).json({ error: 'Need { url, roast } with roast.sections.' });

  const schemaOk =
    typeof roast.overall_score === 'number' &&
    roast.overall_score >= 1 && roast.overall_score <= 10 &&
    roast.sections.length === 4 &&
    roast.sections.every(s => s.name && typeof s.score === 'number' && s.burn && s.fix) &&
    typeof roast.headline_burn === 'string' && roast.headline_burn.length > 0;

  const judgePrompt = `You are a strict quality judge for an AI "landing page roast" product. Grade the roast below on three criteria, each 1-10:

1. specificity — do the burns quote or reference ACTUAL text/elements from the target page, or could they apply to any website? 10 = every burn anchored in quoted page content. 1 = generic snark.
2. actionability — are the fixes concrete rewrites someone could ship today? 10 = copy-pasteable. 1 = "improve your messaging".
3. tone — savage but surgical: funny and brutal about the PAGE while staying professional, each burn maps to a real fixable problem.

TARGET PAGE URL: ${String(url).slice(0, 300)}
ROAST TO GRADE: ${JSON.stringify(roast).slice(0, 6000)}

Respond with ONLY valid JSON, no markdown:
{"specificity": <1-10>, "actionability": <1-10>, "tone": <1-10>, "notes": "<one sentence on the weakest criterion>"}`;

  let scores = null;
  try {
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), 25000);
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
        max_tokens: 300,
        messages: [{ role: 'user', content: judgePrompt }]
      })
    });
    clearTimeout(t);
    if (ar.ok) {
      const d = await ar.json();
      const raw = d.content?.[0]?.text || '';
      const start = raw.indexOf('{'); const end = raw.lastIndexOf('}');
      if (start !== -1 && end > start) {
        try { scores = JSON.parse(raw.slice(start, end + 1)); } catch { scores = null; }
      }
    }
  } catch { /* judge failure never breaks the product */ }

  const clamp = n => (typeof n === 'number' && n >= 1 && n <= 10) ? Math.round(n) : null;
  const specificity = clamp(scores?.specificity);
  const actionability = clamp(scores?.actionability);
  const tone = clamp(scores?.tone);
  const parts = [specificity, actionability, tone].filter(n => n !== null);
  const judgeOverall = parts.length ? +(parts.reduce((a, b) => a + b, 0) / parts.length).toFixed(2) : null;

  let logged = false;
  if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
    try {
      const r = await fetch(`${process.env.SUPABASE_URL}/rest/v1/roast_evals`, {
        method: 'POST',
        headers: {
          apikey: process.env.SUPABASE_ANON_KEY,
          Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal'
        },
        body: JSON.stringify({
          url: String(url).slice(0, 500),
          overall_score: typeof roast.overall_score === 'number' ? roast.overall_score : null,
          schema_ok: schemaOk,
          judge_specificity: specificity,
          judge_actionability: actionability,
          judge_tone: tone,
          judge_overall: judgeOverall,
          judge_notes: (scores?.notes || '').slice(0, 500),
          roast
        })
      });
      logged = r.ok;
      if (!r.ok) console.error('roast_evals insert failed:', r.status, (await r.text()).slice(0, 200));
    } catch (e) { console.error('roast_evals insert error:', e.message); }
  }

  return res.status(200).json({ ok: true, schema_ok: schemaOk, judge: { specificity, actionability, tone, overall: judgeOverall }, logged });
}

// /api/score-roast.js — L5 production auto-eval for the roast engine.
// The roast UI fires this after every successful roast (fire-and-forget).
// A Claude judge grades the roast on 4 criteria, and the graded example is
// appended to Supabase (`roast_evals`) — so the eval dataset grows from
// real production traffic and quality is a queryable time series.
//
// Env vars (Vercel): ANTHROPIC_API_KEY, SUPABASE_URL, SUPABASE_ANON_KEY
// One-time DB setup: run _shared/roast-evals-rls.sql in Supabase SQL Editor.

module.exports = async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!process.env.ANTHROPIC_API_KEY) return res.status(500).json({ error: 'Judge not configured.' });

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
  const { url, roast } = body || {};
  if (!url || !roast || !Array.isArray(roast.sections)) {
    return res.status(400).json({ error: 'Need { url, roast } with roast.sections.' });
  }

  // 1) Deterministic schema checks (no LLM needed)
  const schemaOk =
    typeof roast.overall_score === 'number' &&
    roast.overall_score >= 1 && roast.overall_score <= 10 &&
    roast.sections.length === 4 &&
    roast.sections.every(s => s.name && typeof s.score === 'number' && s.burn && s.fix) &&
    typeof roast.headline_burn === 'string' && roast.headline_burn.length > 0;

  // 2) Claude-as-judge on the qualitative criteria
  const judgePrompt = `You are a strict quality judge for an AI "landing page roast" product. Grade the roast below on three criteria, each 1-10:

1. specificity — do the burns quote or reference ACTUAL text/elements from the target page (hero lines, button labels, claims), or could they apply to any website? 10 = every burn is anchored in quoted page content. 1 = fully generic snark.
2. actionability — are the fixes concrete rewrites someone could ship today (exact copy, exact change), not vague advice? 10 = copy-pasteable. 1 = "improve your messaging".
3. tone — savage but surgical: funny and brutal about the PAGE while staying professional (no personal attacks, no slurs), and each burn maps to a real fixable problem. 10 = screenshot-worthy AND useful.

TARGET PAGE URL: ${String(url).slice(0, 300)}

ROAST TO GRADE:
${JSON.stringify(roast).slice(0, 6000)}

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

  // 3) Append to the growing eval dataset (insert-only via anon key + RLS)
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

  return res.status(200).json({
    ok: true,
    schema_ok: schemaOk,
    judge: { specificity, actionability, tone, overall: judgeOverall, notes: scores?.notes || null },
    logged
  });
};

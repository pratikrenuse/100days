// /api/reframe.js
// Vercel serverless function. Takes the user's "what's making you feel behind"
// input. Returns a warm, evidence-based response: diagnosis of the comparison
// trap, 3 matched stories from the curated database, a grounded reframe,
// and one concrete next action for the next hour.

import { STORIES, META_STATS, FOUNDATIONAL_DATA } from './_stories.js';

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { situation } = req.body || {};
  if (!situation || typeof situation !== 'string' || situation.trim().length < 10) {
    return res.status(400).json({ error: 'Tell me a bit more about what is making you feel behind.' });
  }

  const trimmed = situation.trim().slice(0, 2000);

  // Build a compact catalog the model can pick from. We pass the full story
  // bodies so the model can quote and attribute accurately.
  const storyCatalog = STORIES.map(s => ({
    id: s.id,
    name: s.name,
    field: s.field,
    tags: s.tags,
    one_liner: s.one_liner,
    early_state: s.early_state,
    win_at: s.win_at,
    years_to_win: s.years_to_win,
    source: s.source
  }));

  const systemPrompt = `You are a quiet, warm, evidence-based advisor. Someone has just typed in why they feel behind in their life or work. They are probably tired, comparing themselves to someone else, and sulking. Your job is not to hype them up or coddle them. Your job is to:

1. Diagnose the specific comparison trap they fell into, by name. Name the cognitive pattern. Be precise, not generic. (e.g. "survivorship bias on Twitter", "the highlight-reel trap", "compressing other people's timelines", "the late-starter myth", "single-comparison fixation", "shipping anxiety").

2. Match the THREE most relevant stories from the catalog below to their specific situation. Pick stories that resemble their timeline, their field, or their specific feeling, not the most famous names. If they mention a creative pursuit, pick creative stories. If they mention founders, pick founders. If they mention being old, pick older starters. If they mention many failures, pick repeat-failures.

3. Write a short reframe (3-4 sentences) grounded in real data, not platitudes. Reference at least one specific number from the foundational MIT founder-age data or the META_STATS where relevant.

4. Suggest ONE concrete next action for the next 60 minutes. Not "follow your dreams". Something specific like "close this tab, set a 25-minute timer, do one thing you've been avoiding" or "text the person whose post made you feel behind and ask them how their year actually went" or "open a doc and write one paragraph of the thing you keep putting off". The action should be small enough that they could do it right now, sulking and tired.

TONE RULES:
- Warm but not saccharine. Treat them like an adult. No "you've got this", no hype, no emojis.
- Acknowledge the feeling once, then move to evidence and action.
- No em dashes ever. Use commas, colons, or full stops.
- No bullet points in the diagnosis or reframe. Keep prose tight and quiet.
- Quote actual numbers. "MIT found the average top-0.1% founder is 45" is better than "many founders succeed later".
- Do not lecture. Do not say "remember that". Do not say "always".
- The user is the protagonist of their own story. The famous people are evidence, not idols.

OUTPUT FORMAT (strict JSON, no markdown, no extra text):
{
  "diagnosis_title": "Short name of the comparison pattern, 4-7 words.",
  "diagnosis_body": "Two to three sentences naming the trap, with one specific cognitive pattern. Acknowledge the feeling briefly. Be precise.",
  "matched_story_ids": ["id1", "id2", "id3"],
  "story_relevance": {
    "id1": "One sentence on why this story matches their specific situation.",
    "id2": "One sentence on why this story matches their specific situation.",
    "id3": "One sentence on why this story matches their specific situation."
  },
  "reframe_headline": "A single sentence that flips the frame, 10-18 words.",
  "reframe_body": "Three to four sentences. Use at least one verifiable number from the data. Quiet, grounded, not preachy.",
  "next_action_title": "Five to eight words naming the action.",
  "next_action_body": "Two to three sentences describing the specific action they can do right now, in the next 60 minutes.",
  "closing_line": "One short sentence to end on. Not a slogan. A truth."
}

THE CATALOG OF VERIFIED STORIES (pick exactly three matched_story_ids from these):
${JSON.stringify(storyCatalog, null, 2)}

FOUNDATIONAL DATA (use the actual numbers where they fit):
${JSON.stringify(FOUNDATIONAL_DATA, null, 2)}

QUOTABLE STATS:
${JSON.stringify(META_STATS, null, 2)}`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2000,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: `Here is what is making me feel behind right now:\n\n${trimmed}\n\nReturn the JSON response now. No preamble, no explanation, no markdown fences. JSON only.`
          }
        ]
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Anthropic API error:', response.status, errText);
      return res.status(500).json({ error: 'Something went wrong reading your situation. Try again.' });
    }

    const data = await response.json();
    const raw = data.content?.[0]?.text || '';
    const cleaned = raw.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (e) {
      console.error('JSON parse failed:', cleaned);
      return res.status(500).json({ error: 'Could not parse the response. Try again.' });
    }

    // Strip em dashes anywhere in the model output, per the style rules
    const stripEm = (s) => typeof s === 'string' ? s.replace(/[\u2014\u2013]/g, ',').replace(/\s,\s/g, ', ') : s;

    parsed.diagnosis_title = stripEm(parsed.diagnosis_title || '');
    parsed.diagnosis_body = stripEm(parsed.diagnosis_body || '');
    parsed.reframe_headline = stripEm(parsed.reframe_headline || '');
    parsed.reframe_body = stripEm(parsed.reframe_body || '');
    parsed.next_action_title = stripEm(parsed.next_action_title || '');
    parsed.next_action_body = stripEm(parsed.next_action_body || '');
    parsed.closing_line = stripEm(parsed.closing_line || '');

    if (parsed.story_relevance) {
      for (const k of Object.keys(parsed.story_relevance)) {
        parsed.story_relevance[k] = stripEm(parsed.story_relevance[k]);
      }
    }

    // Hydrate the matched stories with full data
    const matchedStories = (parsed.matched_story_ids || [])
      .map(id => STORIES.find(s => s.id === id))
      .filter(Boolean)
      .slice(0, 3);

    parsed.stories = matchedStories;

    return res.status(200).json(parsed);
  } catch (err) {
    console.error('Handler error:', err);
    return res.status(500).json({ error: 'Something went wrong. Try again.' });
  }
}

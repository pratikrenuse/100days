// /api/reframe.js
// Vercel serverless function. Self-contained, no relative imports.
// Takes a "what's making you feel behind" input and returns a structured
// reading: diagnosis, three matched stories, reframe, next action.

// ── STORIES DATABASE (inlined to avoid module-resolution issues on Vercel) ──

const FOUNDATIONAL_DATA = {
  source: 'MIT Sloan, Pierre Azoulay & J. Daniel Kim, 2018 working paper. HBR, 2018.',
  url: 'https://hbr.org/2018/07/research-the-average-age-of-a-successful-startup-founder-is-45',
  data_points: [
    { stat: '45', label: 'Average age of founders of the top 0.1% fastest-growing startups, by MIT and Census Bureau data on 2.7 million businesses.' },
    { stat: '42', label: 'Average age of founders who built a company that hired at least one employee.' },
    { stat: '2x', label: 'A 50-year-old founder is nearly twice as likely to build a runaway success as a 30-year-old.' },
    { stat: '<1%', label: 'Fraction of high-performing startups founded by 20-year-olds.' }
  ]
};

const META_STATS = [
  { stat: '45', label: 'is the average founder age of the fastest-growing 0.1% of startups, per MIT and Census Bureau data.' },
  { stat: '2x', label: 'as likely is a 50-year-old founder to have a runaway success compared to a 30-year-old.' },
  { stat: '39', label: 'was Toni Morrison\'s age when she published her first novel. The Nobel came 23 years later.' },
  { stat: '40', label: 'was Vera Wang\'s age when she launched her own brand. She had spent the previous 20 years in jobs she didn\'t love.' },
  { stat: '62', label: 'was Colonel Sanders\' age when he started franchising. He had failed at a dozen other careers first.' },
  { stat: '5126', label: 'failed prototypes James Dyson built before he had a product that worked.' }
];

const STORIES = [
  {
    id: 'jensen-huang',
    name: 'Jensen Huang',
    field: 'tech',
    tags: ['founder', 'builder', 'tech', 'slow-burn', 'near-death', 'shipping'],
    early_state: 'Founded Nvidia at 30 in a Denny\'s booth with two friends. "I had no idea how to do it. None of us knew how to do anything." Nearly went bankrupt multiple times in the first decade. The 1996 chip failed and almost killed the company.',
    win_at: '$5 trillion company valuation in October 2025. Most valuable public company in the world.',
    years_to_win: '32 years from founding to becoming the most valuable company in the world.',
    one_liner: 'Started at 30, was nearly bankrupt for years, became the most valuable company in the world at age 62.',
    source: 'CNBC, October 2025; Britannica; NVIDIA Newsroom'
  },
  {
    id: 'vera-wang',
    name: 'Vera Wang',
    field: 'creative',
    tags: ['career-change', 'late-start', 'creative', 'fashion', 'pivot', '40s'],
    early_state: 'Failed to make the 1968 US Olympic figure skating team. Spent 17 years at Vogue. Lost out on editor-in-chief to Anna Wintour. Spent 2 more years at Ralph Lauren. Did not start her own brand until age 40.',
    win_at: 'Vera Wang Bridal launched 1990. Now a global empire spanning fashion, jewelry, homeware. Still creating in her 70s.',
    years_to_win: 'Did not launch her own brand until 40. "I thought maybe it\'s just too late for me."',
    one_liner: 'Spent her 20s and 30s in jobs she didn\'t love. Launched her own brand at 40 because she couldn\'t find a wedding dress she liked.',
    source: 'CNBC Make It, May 2021; HBR, July 2019'
  },
  {
    id: 'toni-morrison',
    name: 'Toni Morrison',
    field: 'writer',
    tags: ['writer', 'creative', 'late-start', 'solo-parent', 'side-project', '30s', '40s'],
    early_state: 'Published her first novel, The Bluest Eye, at age 39. Wrote it before her sons woke up and after they went to sleep. Divorced single mother of two. Worked as an editor at Random House by day. The Bluest Eye sold fewer than 2,000 hardcover copies in its first year.',
    win_at: 'Pulitzer Prize at 56 for Beloved. Nobel Prize in Literature at 62. The first African American woman to win it.',
    years_to_win: '23 years from her first published novel to the Nobel.',
    one_liner: 'First novel at 39, while raising two kids alone and holding a day job. Sold under 2,000 copies. Won the Nobel 23 years later.',
    source: 'CBC, August 2019; Howard University; Audible'
  },
  {
    id: 'colonel-sanders',
    name: 'Harland Sanders',
    field: 'founder',
    tags: ['founder', 'late-start', 'second-act', '60s', 'comeback', 'rejection'],
    early_state: 'Worked as a farmhand, streetcar conductor, soldier, railroad fireman, insurance salesman, gas station operator, and motel owner before he got anywhere. His Corbin, Kentucky restaurant did well for a while, then the new interstate routed traffic away and killed his business. He started franchising his fried chicken recipe in 1952 at age 62.',
    win_at: 'Franchised KFC, sold the US operation in 1964 for $2 million (around $20M today). Kept his role as the brand\'s face for life.',
    years_to_win: 'Started franchising at 62, sold for life-changing money at 73.',
    one_liner: 'Bounced between a dozen failed careers. Started franchising his chicken recipe at 62. Sold the company at 73.',
    source: 'KFC corporate history; widely documented'
  },
  {
    id: 'ray-kroc',
    name: 'Ray Kroc',
    field: 'founder',
    tags: ['founder', 'late-start', '50s', 'salesperson', 'persistence'],
    early_state: 'Sold paper cups for 17 years, then milkshake machines. At 52, he was a middling milkshake salesman with a bad back, diabetes, and arthritis when he visited a small hamburger stand in San Bernardino owned by the McDonald brothers.',
    win_at: 'Built McDonald\'s into the largest restaurant chain on Earth. By the time he died at 81 he was worth over half a billion dollars.',
    years_to_win: 'Did not start his real life\'s work until age 52.',
    one_liner: 'Was a 52-year-old milkshake salesman with bad knees when he found McDonald\'s. Built it into the world\'s biggest restaurant company.',
    source: 'McDonald\'s corporate history; "Grinding It Out" autobiography'
  },
  {
    id: 'samuel-jackson',
    name: 'Samuel L. Jackson',
    field: 'creative',
    tags: ['creative', 'late-start', '40s', 'addiction', 'comeback', 'small-roles'],
    early_state: 'Played bit parts for two decades. Struggled with crack and alcohol addiction through his late thirties. His breakout role, Gator in Jungle Fever, came at age 42, the same year he got clean.',
    win_at: 'Pulp Fiction at 46. Highest-grossing actor in Hollywood by box office for years. Marvel Cinematic Universe in his 60s.',
    years_to_win: '20+ years of small parts before the breakthrough at 42.',
    one_liner: 'Played small parts for 20 years and was a working crack addict until 42. Pulp Fiction came at 46.',
    source: 'Vanity Fair; widely documented interviews'
  },
  {
    id: 'james-dyson',
    name: 'James Dyson',
    field: 'founder',
    tags: ['founder', 'inventor', 'rejection', 'iteration', 'persistence', '40s'],
    early_state: 'Built 5,126 failed prototypes of his bagless vacuum over five years in his 30s. Every major vacuum manufacturer rejected the design. He launched his own company at age 46, in a market where every name brand had already said no.',
    win_at: 'Dyson is now worth over £20 billion. Sir James Dyson is one of the wealthiest people in Britain.',
    years_to_win: '15 years from the first prototype to a successful product launch.',
    one_liner: '5,126 failed prototypes. Every major brand rejected him. Launched his own company at 46. Now worth £20 billion.',
    source: '"Against the Odds" autobiography; Dyson corporate history'
  },
  {
    id: 'julia-child',
    name: 'Julia Child',
    field: 'creative',
    tags: ['creative', 'career-change', 'late-start', '40s', '50s', 'pivot'],
    early_state: 'Worked for the OSS during WWII. Did not learn to cook seriously until she was nearly 37, after moving to Paris. Published her first cookbook, Mastering the Art of French Cooking, at age 49. Her TV show, The French Chef, premiered when she was 51.',
    win_at: 'Defined French cooking in America for the rest of the 20th century. Multiple James Beard awards. Smithsonian preserves her kitchen.',
    years_to_win: '14 years from first cooking lesson to becoming a household name.',
    one_liner: 'Did not learn to cook until 37. Published her first book at 49. Got her TV show at 51.',
    source: 'PBS biography; Smithsonian'
  },
  {
    id: 'morgan-freeman',
    name: 'Morgan Freeman',
    field: 'creative',
    tags: ['creative', 'late-start', '50s', 'small-roles', 'breakthrough'],
    early_state: 'Worked as a dancer, mechanic, soldier, and stage actor in small productions. Spent his thirties on The Electric Company, a children\'s TV show, because acting gigs were not paying the rent. His first major film role came at 50, in Street Smart.',
    win_at: 'Oscar nomination at 50, then a steady stream of leading roles through his 60s, 70s, and 80s. Million Dollar Baby Oscar at 67.',
    years_to_win: 'Three decades of small work before the first major role at 50.',
    one_liner: 'Did children\'s TV in his thirties to pay rent. Got his first major film role at 50. Won an Oscar at 67.',
    source: 'AFI biography; widely documented interviews'
  },
  {
    id: 'henry-ford',
    name: 'Henry Ford',
    field: 'founder',
    tags: ['founder', 'failure', 'second-chance', '40s', 'persistence'],
    early_state: 'Founded Detroit Automobile Company in 1899, which failed. Founded Henry Ford Company in 1901, was forced out. Founded Ford Motor Company in 1903 at age 40, his third try at the same idea.',
    win_at: 'Model T launched when he was 45. Revolutionized manufacturing with the assembly line at 50.',
    years_to_win: 'Two failed companies before the right one.',
    one_liner: 'His first two car companies failed. Founded Ford on his third attempt, at 40. Launched the Model T at 45.',
    source: 'Ford Motor Company corporate history'
  },
  {
    id: 'arianna-huffington',
    name: 'Arianna Huffington',
    field: 'founder',
    tags: ['founder', 'second-act', '50s', 'media', 'late-start'],
    early_state: 'Wrote books and ran for Governor of California (lost) before founding The Huffington Post at age 55, in a market dominated by established media. The site was widely mocked at launch as a vanity project.',
    win_at: 'Sold HuffPost to AOL in 2011 for $315 million. Founded Thrive Global at 66.',
    years_to_win: 'Started her most successful company at 55.',
    one_liner: 'Was mocked when she launched HuffPost at 55. Sold it for $315 million six years later.',
    source: 'Bloomberg; widely documented'
  },
  {
    id: 'frank-mccourt',
    name: 'Frank McCourt',
    field: 'writer',
    tags: ['writer', 'late-start', '60s', 'first-book', 'creative'],
    early_state: 'Taught high school English in New York for 30 years. Did not publish his first book until he was 66. The book was Angela\'s Ashes, his memoir of growing up poor in Limerick.',
    win_at: 'Pulitzer Prize for Angela\'s Ashes at 67. The book sold over 4 million copies.',
    years_to_win: 'First book ever published at 66, Pulitzer at 67.',
    one_liner: 'Taught high school for 30 years. Published his first book at 66. Won the Pulitzer the next year.',
    source: 'New York Times; widely documented'
  },
  {
    id: 'stan-lee',
    name: 'Stan Lee',
    field: 'creative',
    tags: ['creative', 'comeback', '40s', 'reinvention', 'last-try'],
    early_state: 'Worked in comics for over 20 years writing forgettable material. By his late 30s he was ready to quit. His wife told him to write the kind of comic he himself would want to read, since he was going to leave anyway. He created Fantastic Four at 39, then Spider-Man at 39, then the X-Men at 40.',
    win_at: 'Marvel Comics universe, now a multi-billion dollar IP. Stan Lee became a cultural icon in his 70s and 80s.',
    years_to_win: '20+ years of forgettable comics before the breakthrough.',
    one_liner: 'Spent 20+ years writing forgettable comics. About to quit at 39 when he created Spider-Man and the Fantastic Four.',
    source: '"Excelsior!" autobiography; Marvel corporate history'
  },
  {
    id: 'kathryn-bigelow',
    name: 'Kathryn Bigelow',
    field: 'creative',
    tags: ['creative', 'late-start', '50s', 'breakthrough', 'persistence'],
    early_state: 'Made films for 30 years that were commercially overlooked. Her best-known earlier film, Point Break, was a cult success, not a mainstream one. She did not win her first Oscar until age 58, for The Hurt Locker.',
    win_at: 'First woman to win the Academy Award for Best Director, at 58.',
    years_to_win: '30 years of directing before her first Oscar.',
    one_liner: '30 years of films that did not break through. Won Best Director at 58, the first woman to do so.',
    source: 'Academy of Motion Picture Arts and Sciences; widely documented'
  }
];

// ── HANDLER ──

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verify the API key is present before doing anything else.
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('ANTHROPIC_API_KEY env var is not set');
    return res.status(500).json({ error: 'The reading service is not configured. The site owner needs to set the API key.' });
  }

  const { situation } = req.body || {};
  if (!situation || typeof situation !== 'string' || situation.trim().length < 10) {
    return res.status(400).json({ error: 'Tell me a bit more about what is making you feel behind. One full sentence is enough.' });
  }

  const trimmed = situation.trim().slice(0, 2000);

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

1. Diagnose the specific comparison trap they fell into, by name. Name the cognitive pattern. Be precise, not generic. (e.g. "survivorship bias on social media", "the highlight-reel trap", "compressing other people's timelines", "the late-starter myth", "single-comparison fixation", "shipping anxiety").

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
    // 25-second timeout (well under Vercel's 60s function ceiling on Pro,
    // and gives Anthropic enough time to respond even on slow days).
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000);

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
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
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errText = await response.text();
      console.error('Anthropic API error:', response.status, errText.slice(0, 500));
      // Surface a more specific error to the client.
      if (response.status === 401) {
        return res.status(500).json({ error: 'The reading service is not authorized. The site owner needs to check the API key.' });
      }
      if (response.status === 429) {
        return res.status(503).json({ error: 'The reading service is busy right now. Try again in a moment.' });
      }
      if (response.status >= 500) {
        return res.status(502).json({ error: 'The reading service had a hiccup. Try again in a moment.' });
      }
      return res.status(500).json({ error: 'Could not generate a reading. Try again in a moment.' });
    }

    const data = await response.json();
    const raw = data.content?.[0]?.text || '';

    // Defensive JSON extraction: strip code fences and find the first { ... }
    let cleaned = raw.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim();
    // If there's prose before the JSON, find the first { and last }
    const firstBrace = cleaned.indexOf('{');
    const lastBrace = cleaned.lastIndexOf('}');
    if (firstBrace > 0 && lastBrace > firstBrace) {
      cleaned = cleaned.slice(firstBrace, lastBrace + 1);
    }

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (e) {
      console.error('JSON parse failed. Raw text:', raw.slice(0, 500));
      return res.status(500).json({ error: 'The reading came back in an unexpected shape. Try again.' });
    }

    // Strip em/en dashes from all string fields, per the no-em-dash style rule
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
    if (err.name === 'AbortError') {
      console.error('Anthropic call timed out after 25s');
      return res.status(504).json({ error: 'The reading is taking longer than usual. Try again in a moment.' });
    }
    console.error('Handler error:', err.message, err.stack);
    return res.status(500).json({ error: 'Something unexpected happened. Try again in a moment.' });
  }
}

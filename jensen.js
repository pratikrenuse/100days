const SUPABASE_URL = process.env.SUPABASE_URL || 'https://naqkunidxjpgwanfbbiu.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;

function fetchWithTimeout(url, options = {}, ms = 20000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);
  return fetch(url, { ...options, signal: controller.signal })
    .finally(() => clearTimeout(id));
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  try {
    // ── 1. Serve from cache if fresh ──────────────────────
    if (SUPABASE_KEY) {
      try {
        const cr = await fetchWithTimeout(
          SUPABASE_URL + '/rest/v1/jensen_cache?order=created_at.desc&limit=1',
          { headers: { apikey: SUPABASE_KEY, Authorization: 'Bearer ' + SUPABASE_KEY } }
        );
        if (cr.ok) {
          const cache = await cr.json();
          if (cache && cache.length > 0) {
            const age = Date.now() - new Date(cache[0].created_at).getTime();
            if (age < 24 * 60 * 60 * 1000) {
              return res.status(200).json({ ...cache[0].data, cached: true });
            }
          }
        }
      } catch {}
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return res.status(200).json({ articles: [], insights: null, error: 'No Anthropic API key' });
    }

    // ── 2. Use Claude web search to get news + insights ───
    // Claude searches for Jensen Huang news and returns structured data
    const claudeRes = await fetchWithTimeout('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 2000,
        tools: [{ type: 'web_search_20250305', name: 'web_search' }],
        messages: [{
          role: 'user',
          content: `Search for the latest news about Jensen Huang and Nvidia from the past 7 days. Then return a JSON object with this exact structure, no markdown:\n{\n  "articles": [\n    {"title": "article title", "source": "source name", "link": "", "pubDate": "date if available"}\n  ],\n  "theme": "dominant theme this week in one sentence",\n  "key_insight": "most important insight in 2 sentences",\n  "future_bets": ["bet 1", "bet 2", "bet 3"],\n  "ai_angle": "AI infrastructure angle in one sentence",\n  "signal_vs_noise": "what matters vs hype in one sentence"\n}\nInclude up to 8 articles. Return ONLY the JSON object.`
        }]
      })
    }, 25000);

    const cd = await claudeRes.json();

    // Extract the final text response (after tool use)
    let parsed = null;
    for (const block of (cd.content || [])) {
      if (block.type === 'text') {
        try {
          parsed = JSON.parse(block.text.replace(/```json|```/g, '').trim());
        } catch {}
      }
    }

    if (!parsed || !parsed.articles) {
      return res.status(200).json({ articles: [], insights: null, error: 'Could not parse Claude response', raw: cd });
    }

    const payload = {
      articles: parsed.articles || [],
      insights: {
        theme: parsed.theme,
        key_insight: parsed.key_insight,
        future_bets: parsed.future_bets,
        ai_angle: parsed.ai_angle,
        signal_vs_noise: parsed.signal_vs_noise
      }
    };

    // ── 3. Cache in Supabase ──────────────────────────────
    if (SUPABASE_KEY) {
      try {
        await fetchWithTimeout(SUPABASE_URL + '/rest/v1/jensen_cache', {
          method: 'POST',
          headers: {
            apikey: SUPABASE_KEY, Authorization: 'Bearer ' + SUPABASE_KEY,
            'Content-Type': 'application/json', Prefer: 'return=minimal'
          },
          body: JSON.stringify({ data: payload })
        }, 8000);
      } catch {}
    }

    return res.status(200).json({ ...payload, cached: false });

  } catch (err) {
    return res.status(500).json({ error: err.message, articles: [], insights: null });
  }
}

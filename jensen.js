const SUPABASE_URL = process.env.SUPABASE_URL || 'https://naqkunidxjpgwanfbbiu.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  try {
    // ── 1. Check Supabase cache ────────────────────────────
    if (SUPABASE_KEY) {
      const cacheRes = await fetch(
        SUPABASE_URL + '/rest/v1/jensen_cache?order=created_at.desc&limit=1',
        { headers: { apikey: SUPABASE_KEY, Authorization: 'Bearer ' + SUPABASE_KEY } }
      );
      if (cacheRes.ok) {
        const cache = await cacheRes.json();
        if (cache && cache.length > 0) {
          const age = Date.now() - new Date(cache[0].created_at).getTime();
          if (age < 24 * 60 * 60 * 1000) {
            return res.status(200).json({ ...cache[0].data, cached: true });
          }
        }
      }
    }

    // ── 2. Fetch RSS via rss2json (reliable, no XML parsing) ──
    const rssUrl = encodeURIComponent(
      'https://news.google.com/rss/search?q=Jensen+Huang+Nvidia+AI&hl=en-US&gl=US&ceid=US:en'
    );
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}&count=10`;

    const rssRes = await fetch(apiUrl, { signal: AbortSignal.timeout(10000) });
    const rssData = await rssRes.json();

    if (!rssData.items || rssData.items.length === 0) {
      return res.status(200).json({ articles: [], insights: null, error: 'No articles found' });
    }

    const items = rssData.items.map(item => ({
      title:   item.title || '',
      pubDate: item.pubDate || '',
      link:    item.link || '',
      source:  item.author || ''
    })).filter(i => i.title);

    // ── 3. Call Claude for insights ───────────────────────
    const apiKey = process.env.ANTHROPIC_API_KEY;
    let insights = null;

    if (apiKey && items.length > 0) {
      const headlines = items.map((a, i) => `${i + 1}. ${a.title}`).join('\n');
      const cr = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 700,
          messages: [{
            role: 'user',
            content: `Analyse these recent news headlines about Jensen Huang, CEO of Nvidia.\n\nHeadlines:\n${headlines}\n\nReturn ONLY valid JSON, no markdown:\n{\n  "theme": "The dominant theme in one crisp sentence",\n  "key_insight": "The most important insight in 2 sentences max",\n  "future_bets": ["Bet 1 inferred from news", "Bet 2", "Bet 3"],\n  "ai_angle": "How this connects to the broader AI infrastructure story in one sentence",\n  "signal_vs_noise": "What matters vs what is hype in one sentence"\n}`
          }]
        })
      });
      const cd = await cr.json();
      try { insights = JSON.parse(cd.content[0].text.replace(/```json|```/g, '').trim()); } catch {}
    }

    const payload = { articles: items, insights };

    // ── 4. Store in Supabase ───────────────────────────────
    if (SUPABASE_KEY) {
      await fetch(SUPABASE_URL + '/rest/v1/jensen_cache', {
        method: 'POST',
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: 'Bearer ' + SUPABASE_KEY,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal'
        },
        body: JSON.stringify({ data: payload })
      });
    }

    return res.status(200).json({ ...payload, cached: false });

  } catch (err) {
    return res.status(500).json({ error: err.message, articles: [], insights: null });
  }
}

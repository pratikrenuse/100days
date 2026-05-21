const SUPABASE_URL = process.env.SUPABASE_URL || 'https://naqkunidxjpgwanfbbiu.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  try {
    // ── Check cache ────────────────────────────────────────
    const cacheRes = await fetch(
      SUPABASE_URL + '/rest/v1/jensen_cache?order=created_at.desc&limit=1',
      { headers: { apikey: SUPABASE_KEY, Authorization: 'Bearer ' + SUPABASE_KEY } }
    );
    const cache = await cacheRes.json();
    const ONE_DAY = 24 * 60 * 60 * 1000;

    if (cache && cache.length > 0) {
      const age = Date.now() - new Date(cache[0].created_at).getTime();
      if (age < ONE_DAY) {
        // Fresh — serve cache, no API calls
        return res.status(200).json({ ...cache[0].data, cached: true });
      }
    }

    // ── Cache stale or empty — fetch fresh ─────────────────
    const query   = encodeURIComponent('Jensen Huang Nvidia AI');
    const rssUrl  = `https://news.google.com/rss/search?q=${query}&hl=en-US&gl=US&ceid=US:en`;
    const proxied = `https://api.allorigins.win/raw?url=${encodeURIComponent(rssUrl)}`;
    const rssRes  = await fetch(proxied, { signal: AbortSignal.timeout(8000) });
    const rssText = await rssRes.text();

    const items = [];
    const itemRe = /<item>([\s\S]*?)<\/item>/g;
    let m;
    const clean = s => s.replace(/<[^>]*>/g,'')
      .replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>')
      .replace(/&quot;/g,'"').replace(/&#39;/g,"'").trim();

    while ((m = itemRe.exec(rssText)) !== null && items.length < 10) {
      const raw   = m[1];
      const title = clean((/<title>([\s\S]*?)<\/title>/.exec(raw)||[])[1]||'');
      const pubDate = clean((/<pubDate>([\s\S]*?)<\/pubDate>/.exec(raw)||[])[1]||'');
      const link  = clean((/<link>([\s\S]*?)<\/link>/.exec(raw)||[])[1]||'');
      const source = clean((/<source[^>]*>([\s\S]*?)<\/source>/.exec(raw)||[])[1]||'');
      if (title) items.push({ title, pubDate, link, source });
    }

    // If RSS fails, serve stale cache rather than empty
    if (!items.length) {
      if (cache && cache.length > 0) {
        return res.status(200).json({ ...cache[0].data, cached: true });
      }
      return res.status(200).json({ articles: [], insights: null });
    }

    // ── Call Claude ────────────────────────────────────────
    const apiKey = process.env.ANTHROPIC_API_KEY;
    let insights = null;

    if (apiKey) {
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
      try { insights = JSON.parse(cd.content[0].text.replace(/```json|```/g,'').trim()); } catch {}
    }

    const payload = { articles: items, insights };

    // ── Store in Supabase ──────────────────────────────────
    await fetch(SUPABASE_URL + '/rest/v1/jensen_cache', {
      method: 'POST',
      headers: {
        apikey: SUPABASE_KEY, Authorization: 'Bearer ' + SUPABASE_KEY,
        'Content-Type': 'application/json', Prefer: 'return=minimal'
      },
      body: JSON.stringify({ data: payload })
    });

    return res.status(200).json({ ...payload, cached: false });

  } catch (err) {
    return res.status(500).json({ error: err.message, articles: [], insights: null });
  }
}

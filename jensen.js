const SUPABASE_URL = process.env.SUPABASE_URL || 'https://naqkunidxjpgwanfbbiu.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;
const GNEWS_KEY   = process.env.GNEWS_API_KEY;
const NEWS_KEY    = process.env.NEWS_API_KEY;

function fetchWithTimeout(url, options = {}, ms = 15000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);
  return fetch(url, { ...options, signal: controller.signal }).finally(() => clearTimeout(id));
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  try {
    // ── 1. Serve from Supabase cache if fresh ─────────────
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

    // ── 2. Fetch live news ─────────────────────────────────
    let articles = [];

    // Primary: GNews
    if (GNEWS_KEY && articles.length === 0) {
      try {
        const url = `https://gnews.io/api/v4/search?q=Jensen+Huang+Nvidia&lang=en&max=10&apikey=${GNEWS_KEY}`;
        const r = await fetchWithTimeout(url);
        if (r.ok) {
          const data = await r.json();
          articles = (data.articles || []).map(a => ({
            title:   a.title,
            source:  a.source?.name || '',
            link:    a.url || '',
            pubDate: a.publishedAt || ''
          }));
        }
      } catch {}
    }

    // Fallback: NewsAPI
    if (NEWS_KEY && articles.length === 0) {
      try {
        const url = `https://newsapi.org/v2/everything?q=Jensen+Huang+Nvidia&language=en&sortBy=publishedAt&pageSize=10&apiKey=${NEWS_KEY}`;
        const r = await fetchWithTimeout(url);
        if (r.ok) {
          const data = await r.json();
          articles = (data.articles || []).map(a => ({
            title:   a.title,
            source:  a.source?.name || '',
            link:    a.url || '',
            pubDate: a.publishedAt || ''
          }));
        }
      } catch {}
    }

    if (articles.length === 0) {
      return res.status(200).json({ articles: [], insights: null, error: 'Both news APIs failed' });
    }

    // ── 3. Claude insights ─────────────────────────────────
    const apiKey = process.env.ANTHROPIC_API_KEY;
    let insights = null;

    if (apiKey) {
      try {
        const headlines = articles.map((a, i) => `${i + 1}. ${a.title}`).join('\n');
        const cr = await fetchWithTimeout('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
          body: JSON.stringify({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 700,
            messages: [{ role: 'user', content: `Analyse these recent news headlines about Jensen Huang CEO of Nvidia.\n\nHeadlines:\n${headlines}\n\nReturn ONLY valid JSON no markdown:\n{"theme":"dominant theme in one sentence","key_insight":"most important insight 2 sentences max","future_bets":["bet 1","bet 2","bet 3"],"ai_angle":"AI infrastructure story one sentence","signal_vs_noise":"signal vs hype one sentence"}` }]
          })
        }, 15000);
        const cd = await cr.json();
        insights = JSON.parse(cd.content[0].text.replace(/```json|```/g,'').trim());
      } catch {}
    }

    const payload = { articles, insights };

    // ── 4. Cache in Supabase ───────────────────────────────
    if (SUPABASE_KEY) {
      try {
        await fetchWithTimeout(SUPABASE_URL + '/rest/v1/jensen_cache', {
          method: 'POST',
          headers: { apikey: SUPABASE_KEY, Authorization: 'Bearer ' + SUPABASE_KEY, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
          body: JSON.stringify({ data: payload })
        }, 8000);
      } catch {}
    }

    return res.status(200).json({ ...payload, cached: false });

  } catch (err) {
    return res.status(500).json({ error: err.message, articles: [], insights: null });
  }
}

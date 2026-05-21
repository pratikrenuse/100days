const SUPABASE_URL = process.env.SUPABASE_URL || 'https://naqkunidxjpgwanfbbiu.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;

// Manual timeout — AbortSignal.timeout can behave differently across Node versions
function fetchWithTimeout(url, options = {}, ms = 12000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);
  return fetch(url, { ...options, signal: controller.signal })
    .finally(() => clearTimeout(id));
}

function parseRSS(xml) {
  const items = [];
  const clean = s => s
    .replace(/<!\[CDATA\[|\]\]>/g, '')
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g,'&').replace(/&lt;/g,'<')
    .replace(/&gt;/g,'>').replace(/&quot;/g,'"')
    .replace(/&#39;/g,"'").trim();

  const itemRe = /<item>([\s\S]*?)<\/item>/g;
  let m;
  while ((m = itemRe.exec(xml)) !== null && items.length < 10) {
    const raw = m[1];
    const title  = clean((/<title>([\s\S]*?)<\/title>/.exec(raw)||[])[1]||'');
    const link   = clean((/<link>([\s\S]*?)<\/link>/.exec(raw)||[])[1]||'');
    const date   = clean((/<pubDate>([\s\S]*?)<\/pubDate>/.exec(raw)||[])[1]||'');
    const source = clean((/<source[^>]*>([\s\S]*?)<\/source>/.exec(raw)||[])[1]||'');
    if (title) items.push({ title, link, pubDate: date, source });
  }
  return items;
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

    // ── 2. Bing News RSS (not blocked on cloud servers) ───
    let items = [];
    const headers = {
      'User-Agent': 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)',
      'Accept': 'application/rss+xml, text/xml, */*'
    };

    const sources = [
      'https://www.bing.com/news/search?q=Jensen+Huang+Nvidia&format=RSS',
      'https://feeds.finance.yahoo.com/rss/2.0/headline?s=NVDA&region=US&lang=en-US',
      'https://blogs.nvidia.com/feed/'
    ];

    for (const url of sources) {
      if (items.length > 0) break;
      try {
        const r = await fetchWithTimeout(url, { headers }, 10000);
        if (r.ok) {
          const xml = await r.text();
          items = parseRSS(xml);
        }
      } catch {}
    }

    if (items.length === 0) {
      return res.status(200).json({
        articles: [],
        insights: null,
        error: 'All RSS sources failed. Check Vercel function logs.'
      });
    }

    // ── 3. Claude insights ────────────────────────────────
    const apiKey = process.env.ANTHROPIC_API_KEY;
    let insights = null;

    if (apiKey) {
      try {
        const headlines = items.map((a, i) => `${i + 1}. ${a.title}`).join('\n');
        const cr = await fetchWithTimeout('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: { 'Content-Type':'application/json', 'x-api-key':apiKey, 'anthropic-version':'2023-06-01' },
          body: JSON.stringify({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 700,
            messages: [{ role:'user', content:`Analyse these recent news headlines about Jensen Huang CEO of Nvidia.\n\nHeadlines:\n${headlines}\n\nReturn ONLY valid JSON no markdown:\n{"theme":"dominant theme in one sentence","key_insight":"most important insight 2 sentences max","future_bets":["bet 1","bet 2","bet 3"],"ai_angle":"AI infrastructure story one sentence","signal_vs_noise":"signal vs hype one sentence"}` }]
          })
        }, 15000);
        const cd = await cr.json();
        insights = JSON.parse(cd.content[0].text.replace(/```json|```/g,'').trim());
      } catch {}
    }

    const payload = { articles: items, insights };

    // ── 4. Cache in Supabase ──────────────────────────────
    if (SUPABASE_KEY) {
      try {
        await fetchWithTimeout(SUPABASE_URL + '/rest/v1/jensen_cache', {
          method: 'POST',
          headers: { apikey: SUPABASE_KEY, Authorization:'Bearer '+SUPABASE_KEY, 'Content-Type':'application/json', Prefer:'return=minimal' },
          body: JSON.stringify({ data: payload })
        }, 8000);
      } catch {}
    }

    return res.status(200).json({ ...payload, cached: false });

  } catch (err) {
    return res.status(500).json({ error: err.message, articles: [], insights: null });
  }
}

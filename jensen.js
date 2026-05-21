const SUPABASE_URL = process.env.SUPABASE_URL || 'https://naqkunidxjpgwanfbbiu.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  const debug = [];

  try {
    // ── 1. Check Supabase cache ────────────────────────────
    if (SUPABASE_KEY) {
      try {
        const cacheRes = await fetch(
          SUPABASE_URL + '/rest/v1/jensen_cache?order=created_at.desc&limit=1',
          { headers: { apikey: SUPABASE_KEY, Authorization: 'Bearer ' + SUPABASE_KEY } }
        );
        if (cacheRes.ok) {
          const cache = await cacheRes.json();
          if (cache && cache.length > 0) {
            const age = Date.now() - new Date(cache[0].created_at).getTime();
            debug.push(`cache_age_hours: ${(age/3600000).toFixed(1)}`);
            if (age < 24 * 60 * 60 * 1000) {
              return res.status(200).json({ ...cache[0].data, cached: true });
            }
          } else {
            debug.push('cache: empty');
          }
        } else {
          debug.push(`cache_error: ${cacheRes.status}`);
        }
      } catch (ce) {
        debug.push(`cache_exception: ${ce.message}`);
      }
    } else {
      debug.push('no_supabase_key');
    }

    // ── 2. Fetch RSS directly (server-side, no proxy needed) ──
    const RSS_URL = 'https://news.google.com/rss/search?q=Jensen+Huang+Nvidia+AI&hl=en-US&gl=US&ceid=US:en';
    let items = [];

    try {
      const rssRes = await fetch(RSS_URL, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'application/rss+xml, application/xml, text/xml, */*'
        },
        signal: AbortSignal.timeout(10000)
      });

      debug.push(`rss_status: ${rssRes.status}`);

      if (rssRes.ok) {
        const xml = await rssRes.text();
        debug.push(`xml_length: ${xml.length}`);

        const clean = s => s
          .replace(/<!\[CDATA\[|\]\]>/g, '')
          .replace(/<[^>]*>/g, '')
          .replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>')
          .replace(/&quot;/g,'"').replace(/&#39;/g,"'").trim();

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
        debug.push(`items_parsed: ${items.length}`);
      }
    } catch (re) {
      debug.push(`rss_exception: ${re.message}`);
    }

    // ── 3. Fallback — Nvidia blog RSS ─────────────────────
    if (items.length === 0) {
      debug.push('trying_nvidia_blog_rss');
      try {
        const fbRes = await fetch('https://blogs.nvidia.com/feed/', {
          headers: { 'User-Agent': 'Mozilla/5.0' },
          signal: AbortSignal.timeout(8000)
        });
        if (fbRes.ok) {
          const xml = await fbRes.text();
          const clean = s => s.replace(/<!\[CDATA\[|\]\]>/g,'').replace(/<[^>]*>/g,'').replace(/&amp;/g,'&').trim();
          const itemRe = /<item>([\s\S]*?)<\/item>/g;
          let m;
          while ((m = itemRe.exec(xml)) !== null && items.length < 8) {
            const raw = m[1];
            const title = clean((/<title>([\s\S]*?)<\/title>/.exec(raw)||[])[1]||'');
            const link  = clean((/<link>([\s\S]*?)<\/link>/.exec(raw)||[])[1]||'');
            const date  = clean((/<pubDate>([\s\S]*?)<\/pubDate>/.exec(raw)||[])[1]||'');
            if (title) items.push({ title, link, pubDate: date, source: 'Nvidia Blog' });
          }
          debug.push(`nvidia_blog_items: ${items.length}`);
        }
      } catch (fe) {
        debug.push(`fallback_exception: ${fe.message}`);
      }
    }

    if (items.length === 0) {
      return res.status(200).json({ articles: [], insights: null, debug });
    }

    // ── 4. Call Claude ─────────────────────────────────────
    const apiKey = process.env.ANTHROPIC_API_KEY;
    let insights = null;

    if (apiKey) {
      try {
        const headlines = items.map((a, i) => `${i + 1}. ${a.title}`).join('\n');
        const cr = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: { 'Content-Type':'application/json', 'x-api-key': apiKey, 'anthropic-version':'2023-06-01' },
          body: JSON.stringify({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 700,
            messages: [{ role: 'user', content: `Analyse these recent news headlines about Jensen Huang CEO of Nvidia.\n\nHeadlines:\n${headlines}\n\nReturn ONLY valid JSON no markdown:\n{"theme":"dominant theme in one sentence","key_insight":"most important insight 2 sentences max","future_bets":["bet 1","bet 2","bet 3"],"ai_angle":"AI infrastructure story connection one sentence","signal_vs_noise":"signal vs hype one sentence"}` }]
          })
        });
        const cd = await cr.json();
        insights = JSON.parse(cd.content[0].text.replace(/```json|```/g,'').trim());
        debug.push('claude: ok');
      } catch (ce) {
        debug.push(`claude_error: ${ce.message}`);
      }
    } else {
      debug.push('no_anthropic_key');
    }

    const payload = { articles: items, insights };

    // ── 5. Cache in Supabase ───────────────────────────────
    if (SUPABASE_KEY) {
      try {
        await fetch(SUPABASE_URL + '/rest/v1/jensen_cache', {
          method: 'POST',
          headers: { apikey: SUPABASE_KEY, Authorization: 'Bearer ' + SUPABASE_KEY, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
          body: JSON.stringify({ data: payload })
        });
      } catch {}
    }

    return res.status(200).json({ ...payload, cached: false, debug });

  } catch (err) {
    return res.status(500).json({ error: err.message, debug });
  }
}

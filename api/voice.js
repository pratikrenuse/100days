// /api/voice.js — Vercel port of the Cloudflare voice function.
// POST { text } → audio/mpeg (~30s spoken roast via ElevenLabs).
// Degrades gracefully: 501 if ELEVENLABS_API_KEY is not set.

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Content-Type', 'application/json');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!process.env.ELEVENLABS_API_KEY) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(501).json({ error: 'Voice roast not configured.' });
  }

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
  let text = ((body || {}).text || '').trim();
  if (!text) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(400).json({ error: 'Nothing to say.' });
  }
  if (text.length > 900) text = text.slice(0, 900);

  const voiceId = process.env.ELEVENLABS_VOICE_ID || 'JBFqnCBsd6RMkjVDRZzb'; // George — dry, deadpan
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`;

  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: {
        'xi-api-key': process.env.ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
        Accept: 'audio/mpeg'
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_turbo_v2_5',
        voice_settings: { stability: 0.4, similarity_boost: 0.75, style: 0.6 }
      })
    });
    if (!r.ok) {
      res.setHeader('Content-Type', 'application/json');
      return res.status(502).json({ error: 'Voice engine error.' });
    }
    const buf = Buffer.from(await r.arrayBuffer());
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).send(buf);
  } catch {
    res.setHeader('Content-Type', 'application/json');
    return res.status(502).json({ error: 'Voice engine unreachable.' });
  }
};

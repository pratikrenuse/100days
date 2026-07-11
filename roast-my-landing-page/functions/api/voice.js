// Cloudflare Pages Function: POST /api/voice
// Body: { text: "the roast to speak" }
// Returns: audio/mpeg (a ~30s spoken roast via ElevenLabs)
//
// Env vars:
//   ELEVENLABS_API_KEY = <key>
//   ELEVENLABS_VOICE_ID = <voice id>   (optional — defaults to a punchy stock voice)

export async function onRequestPost(context) {
  const { request, env } = context;

  if (!env.ELEVENLABS_API_KEY) {
    return new Response(JSON.stringify({ error: "Voice roast not configured." }), {
      status: 501,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }

  let body;
  try { body = await request.json(); }
  catch { return errJson("Send JSON with a `text` field.", 400); }

  let text = (body.text || "").trim();
  if (!text) return errJson("Nothing to say.", 400);
  // keep it ~30s of speech
  if (text.length > 900) text = text.slice(0, 900);

  const voiceId = env.ELEVENLABS_VOICE_ID || "JBFqnCBsd6RMkjVDRZzb"; // George — dry, deadpan
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`;

  let res;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: {
        "xi-api-key": env.ELEVENLABS_API_KEY,
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_turbo_v2_5",
        voice_settings: { stability: 0.4, similarity_boost: 0.75, style: 0.6 },
      }),
    });
  } catch {
    return errJson("Voice engine unreachable.", 502);
  }

  if (!res.ok) {
    const t = await res.text().catch(() => "");
    return errJson("Voice generation failed. " + t.slice(0, 200), 502);
  }

  // stream the mp3 straight back
  return new Response(res.body, {
    status: 200,
    headers: {
      "Content-Type": "audio/mpeg",
      "Cache-Control": "no-store",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

function errJson(msg, status) {
  return new Response(JSON.stringify({ error: msg }), {
    status,
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
  });
}

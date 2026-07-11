// Cloudflare Pages Function: POST /api/roast
// Body: { url: "https://..." }
// Calls Hermes (the brain) to browse the page and return a structured roast.
// Env vars required (set in Cloudflare Pages dashboard):
//   HERMES_API_URL  = https://hermes.pratikrenuse.com/v1
//   HERMES_API_KEY  = <the key>

export async function onRequestPost(context) {
  const { request, env } = context;

  const cors = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Send JSON with a `url` field." }, 400, cors);
  }

  let url = (body.url || "").trim();
  if (!url) return json({ error: "Paste a landing page URL first." }, 400, cors);
  if (!/^https?:\/\//i.test(url)) url = "https://" + url;

  // Basic sanity: must look like a domain
  try {
    const u = new URL(url);
    if (!u.hostname.includes(".")) throw new Error("bad host");
  } catch {
    return json({ error: "That doesn't look like a real URL." }, 400, cors);
  }

  const prompt = buildPrompt(url);

  let hermesRes;
  try {
    hermesRes = await fetch(`${env.HERMES_API_URL}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.HERMES_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "hermes-agent",
        messages: [{ role: "user", content: prompt }],
      }),
    });
  } catch (e) {
    return json({ error: "The roast engine is warming up. Try again in a sec." }, 502, cors);
  }

  if (!hermesRes.ok) {
    const t = await hermesRes.text().catch(() => "");
    return json({ error: "Roast engine error.", detail: t.slice(0, 300) }, 502, cors);
  }

  const data = await hermesRes.json();
  const raw = data?.choices?.[0]?.message?.content || "";

  const parsed = extractJson(raw);
  if (!parsed) {
    return json({ error: "The roast came out malformed. Try again.", raw: raw.slice(0, 500) }, 502, cors);
  }

  return json(parsed, 200, cors);
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

function json(obj, status, headers) {
  return new Response(JSON.stringify(obj), { status, headers });
}

function buildPrompt(url) {
  return `You are the meanest, funniest, and most useful landing page critic on the internet. A founder just submitted their landing page for a roast. Your job: browse the page, then deliver a savage-but-surgical teardown. Every burn must be SPECIFIC to what you actually see on their page — name their exact hero line, their exact button text, their exact claims. Generic snark is banned; if the burn could apply to any site, it's a failure.

Steps:
1. Use your browser tool to load: ${url}
2. Read the hero, the primary CTA/button, the social proof/testimonials, and the pricing (if present).
3. Score each of these 4 sections from 1-10 (10 = flawless, 1 = disaster).
4. For EACH section write ONE named burn: brutal, funny, and quoting the actual text you saw.
5. For EACH section also give a concrete fix: the exact rewrite you'd ship.
6. Pick the single meanest one-liner as the shareable headline.

Tone: savage but surgical. Screenshot-worthy mean, but every burn maps to a real, fixable problem. Think a comedian who's also a conversion expert. No slurs, no personal attacks on the founder — roast the PAGE, not the person.

Respond with ONLY a valid JSON object, no markdown, no code fences, in EXACTLY this shape:
{
  "url": "${url}",
  "overall_score": <number 1-10, average of the four>,
  "headline_burn": "<the single meanest one-liner, max 100 chars, for the share card>",
  "verdict": "<2 sentence overall verdict, brutal but fair>",
  "sections": [
    { "name": "Hero", "score": <1-10>, "burn": "<named specific burn>", "fix": "<exact rewrite/fix>" },
    { "name": "CTA", "score": <1-10>, "burn": "<named specific burn>", "fix": "<exact rewrite/fix>" },
    { "name": "Proof", "score": <1-10>, "burn": "<named specific burn>", "fix": "<exact rewrite/fix>" },
    { "name": "Pricing", "score": <1-10>, "burn": "<named specific burn>", "fix": "<exact rewrite/fix>" }
  ]
}

If you cannot load the page at all, respond with ONLY: {"error":"Couldn't load that page — is it live and public?"}`;
}

// Hermes may wrap JSON in prose or code fences; pull the object out.
function extractJson(text) {
  if (!text) return null;
  // strip code fences
  let t = text.replace(/```json/gi, "```").trim();
  const fenced = t.match(/```\s*([\s\S]*?)\s*```/);
  if (fenced) t = fenced[1].trim();

  // find first { ... last }
  const start = t.indexOf("{");
  const end = t.lastIndexOf("}");
  if (start === -1 || end === -1 || end < start) return null;
  const slice = t.slice(start, end + 1);
  try {
    return JSON.parse(slice);
  } catch {
    return null;
  }
}

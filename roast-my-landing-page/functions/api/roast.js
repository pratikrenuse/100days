// Cloudflare Pages Function: POST /api/roast
// Body: { url: "https://..." }
// 1. Linkup — pull a live benchmark for the page's category so the roast cites a real winner.
// 2. Hermes — browse the page and return a structured, savage-but-surgical roast.
//
// Env vars (Cloudflare Pages → Settings → Environment variables):
//   HERMES_API_URL   = https://hermes.pratikrenuse.com/v1
//   HERMES_API_KEY   = <hermes key>
//   LINKUP_API_KEY   = <linkup key>   (optional — roast still works without it)

export async function onRequestPost(context) {
  const { request, env } = context;
  const cors = { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" };

  let body;
  try { body = await request.json(); }
  catch { return json({ error: "Send JSON with a `url` field." }, 400, cors); }

  let url = (body.url || "").trim();
  if (!url) return json({ error: "Paste a landing page URL first." }, 400, cors);
  if (!/^https?:\/\//i.test(url)) url = "https://" + url;

  let hostname;
  try {
    const u = new URL(url);
    if (!u.hostname.includes(".")) throw new Error("bad host");
    hostname = u.hostname.replace(/^www\./, "");
  } catch {
    return json({ error: "That doesn't look like a real URL." }, 400, cors);
  }

  // 1) Linkup benchmark (best-effort — never blocks the roast)
  let benchmark = null;
  if (env.LINKUP_API_KEY) {
    benchmark = await fetchBenchmark(hostname, env.LINKUP_API_KEY).catch(() => null);
  }

  // 2) Hermes roast
  const prompt = buildPrompt(url, benchmark);
  let hermesRes;
  try {
    hermesRes = await fetch(`${env.HERMES_API_URL}/chat/completions`, {
      method: "POST",
      headers: { Authorization: `Bearer ${env.HERMES_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: "hermes-agent", messages: [{ role: "user", content: prompt }] }),
    });
  } catch {
    return json({ error: "The roast engine is warming up. Try again in a sec." }, 502, cors);
  }

  if (!hermesRes.ok) {
    const t = await hermesRes.text().catch(() => "");
    return json({ error: "Roast engine error.", detail: t.slice(0, 300) }, 502, cors);
  }

  const data = await hermesRes.json();
  const raw = data?.choices?.[0]?.message?.content || "";
  const parsed = extractJson(raw);
  if (!parsed) return json({ error: "The roast came out malformed. Try again.", raw: raw.slice(0, 500) }, 502, cors);

  // attach the benchmark we found so the UI can show the citation
  if (benchmark && !parsed.benchmark) parsed.benchmark = benchmark;
  parsed.hostname = hostname;
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

// ---- Linkup: fetch a live benchmark for this page's space ----
async function fetchBenchmark(hostname, key) {
  const q = `What is ${hostname}'s product category, and which company has the best-converting landing page in that exact category? Name the competitor and one specific thing their landing page does well.`;
  const res = await fetch("https://api.linkup.so/v1/search", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ q, depth: "standard", outputType: "sourcedAnswer" }),
  });
  if (!res.ok) return null;
  const d = await res.json();
  const answer = d?.answer || "";
  const source = d?.sources?.[0]?.url || d?.sources?.[0]?.name || "";
  if (!answer) return null;
  return { answer: answer.slice(0, 600), source };
}

function buildPrompt(url, benchmark) {
  const bench = benchmark
    ? `\nBENCHMARK CONTEXT (from a live web search — use it to compare them against a REAL named competitor in at least one burn):\n${benchmark.answer}\n`
    : "";
  return `You are the meanest, funniest, most useful landing page critic on the internet. A founder just submitted their landing page for a roast. Browse the page, then deliver a savage-but-surgical teardown. Every burn must be SPECIFIC to what you actually see — name their exact hero line, exact button text, exact claims. Generic snark is banned; if a burn could apply to any site, it's a failure.
${bench}
Steps:
1. Use your browser tool to load: ${url}
2. Read the hero, primary CTA/button, social proof/testimonials, and pricing (if present).
3. Score each of those 4 sections 1-10 (10 = flawless, 1 = disaster).
4. For EACH section write ONE named burn: brutal, funny, quoting the actual text you saw. Where it fits, compare them to the real benchmark competitor above.
5. For EACH section give a concrete fix: the exact rewrite you'd ship.
6. Pick the single meanest one-liner as the shareable headline.

Tone: savage but surgical. Screenshot-worthy mean, but every burn maps to a real, fixable problem. Roast the PAGE, not the person. No slurs.

Respond with ONLY a valid JSON object, no markdown, no code fences, EXACTLY this shape:
{
  "url": "${url}",
  "overall_score": <number 1-10, average of the four>,
  "headline_burn": "<meanest one-liner, max 100 chars>",
  "verdict": "<2 sentence overall verdict, brutal but fair>",
  "benchmark_cite": "<one sentence naming the real competitor from the benchmark and what they do better, or empty string if none>",
  "sections": [
    { "name": "Hero", "score": <1-10>, "burn": "<named specific burn>", "fix": "<exact fix>" },
    { "name": "CTA", "score": <1-10>, "burn": "<named specific burn>", "fix": "<exact fix>" },
    { "name": "Proof", "score": <1-10>, "burn": "<named specific burn>", "fix": "<exact fix>" },
    { "name": "Pricing", "score": <1-10>, "burn": "<named specific burn>", "fix": "<exact fix>" }
  ]
}

If you cannot load the page at all, respond with ONLY: {"error":"Couldn't load that page — is it live and public?"}`;
}

function extractJson(text) {
  if (!text) return null;
  let t = text.replace(/```json/gi, "```").trim();
  const fenced = t.match(/```\s*([\s\S]*?)\s*```/);
  if (fenced) t = fenced[1].trim();
  const start = t.indexOf("{");
  const end = t.lastIndexOf("}");
  if (start === -1 || end === -1 || end < start) return null;
  try { return JSON.parse(t.slice(start, end + 1)); } catch { return null; }
}

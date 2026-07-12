// L3 eval for the Daily Futures Brief agent.
// Task: for each candidate item, the Hermes brain decides keep/drop (signal + 10yr horizon).
// Scorers: grade that decision against your labels + Hermes-as-judge on quality.
// Run:  npm install  &&  npx braintrust eval futures-brief.eval.ts
// Needs env: BRAINTRUST_API_KEY, HERMES_API_URL, HERMES_API_KEY

import { Eval } from "braintrust";
import fs from "fs";

const data = JSON.parse(fs.readFileSync(new URL("./dataset.json", import.meta.url), "utf8"));
const RECENT: string[] = data.recent_brief_items || [];

// ---- Hermes helpers (the brain does both the task and the judging — cheap DeepSeek) ----
async function hermes(content: string): Promise<string> {
  const r = await fetch(`${process.env.HERMES_API_URL}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.HERMES_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ model: "hermes-agent", messages: [{ role: "user", content }] }),
  });
  const d: any = await r.json();
  return d?.choices?.[0]?.message?.content ?? "";
}

async function judge(question: string): Promise<number> {
  const out = await hermes(`${question}\n\nAnswer with ONLY a number from 0 to 1 (e.g. 0.8). No words.`);
  const m = out.match(/\b0?\.\d+\b|\b[01]\b/);
  return m ? Math.max(0, Math.min(1, parseFloat(m[0]))) : 0;
}

function parseJson(s: string): any {
  const a = s.indexOf("{"), b = s.lastIndexOf("}");
  if (a === -1 || b === -1) return null;
  try { return JSON.parse(s.slice(a, b + 1)); } catch { return null; }
}

// ---- The task: mimic the brief's selection logic on one item ----
async function selectItem(item: any) {
  const prompt = `You are the selector for a Daily Futures Brief about AI & technology. Keep an item ONLY if BOTH are true:
(a) it is a data-backed SIGNAL — a concrete study, statistic, technical result, or verifiable development — NOT hype, opinion, marketing, or a near-term product rumor;
(b) it plausibly still matters in ~10 years (structural, not a passing headline).

Item:
Headline: ${item.headline}
Snippet: ${item.snippet}
Source: ${item.source}

Return ONLY JSON: {"keep": true/false, "signal": true/false, "horizon10y": true/false, "reason": "one sentence on why it matters (or why not)"}`;
  const out = await hermes(prompt);
  return parseJson(out) ?? { keep: false, signal: false, horizon10y: false, reason: "parse-failed" };
}

Eval("Daily Futures Brief", {
  data: () =>
    data.items.map((it: any) => ({
      input: it,
      expected: { signal: it.signal, horizon10y: it.horizon10y },
      metadata: { id: it.id, domain: it.domain },
    })),
  task: selectItem,
  scores: [
    // 1. Signal vs noise — did the agent's signal judgment match your label? (objective)
    ({ output, expected }: any) => ({
      name: "signal_vs_noise",
      score: Boolean(output?.signal) === Boolean(expected?.signal) ? 1 : 0,
    }),
    // 2. 10-year horizon — match your label? (objective)
    ({ output, expected }: any) => ({
      name: "horizon_10y",
      score: Boolean(output?.horizon10y) === Boolean(expected?.horizon10y) ? 1 : 0,
    }),
    // 3. Factuality — is the item's claim plausibly real & the agent's reasoning consistent? (judge)
    async ({ input, output }: any) => ({
      name: "factuality",
      score: await judge(
        `Item: "${input.headline}" — "${input.snippet}" (source: ${input.source}). Agent's reasoning: "${output?.reason}". ` +
          `Rate 0-1 how factually sound and internally consistent this is (1 = concrete/plausible/verifiable, 0 = fabricated/vague).`
      ),
    }),
    // 4. Specificity — concrete numbers/players/timeframes vs generic? (judge)
    async ({ input }: any) => ({
      name: "specificity",
      score: await judge(
        `Rate 0-1 how specific this item is (concrete numbers, named players, timeframes vs vague generalities): "${input.headline}" — "${input.snippet}".`
      ),
    }),
    // 5. Source credibility — primary/credible vs hype blog? (judge)
    async ({ input }: any) => ({
      name: "source_credibility",
      score: await judge(
        `Rate 0-1 the credibility of this source for a serious futures brief (1 = paper/lab/filing/primary, 0 = rumor/oped/social): "${input.source}".`
      ),
    }),
    // 6. "So what" — does the agent explain why it matters for the 10-20yr future? (judge)
    async ({ output }: any) => ({
      name: "so_what",
      score: await judge(
        `Rate 0-1 how well this explains why the item matters for the long-term (10-20yr) future, beyond just reporting it: "${output?.reason}".`
      ),
    }),
    // 7. Non-repetition — is this NOT a repeat of the last 7 days' brief? (judge; 1 = fresh, 0 = repeat)
    async ({ input }: any) => {
      if (RECENT.length === 0) return { name: "non_repetition", score: 1 };
      const s = await judge(
        `Recent brief already covered:\n- ${RECENT.join("\n- ")}\n\nNew item: "${input.headline}" — "${input.snippet}".\n` +
          `Rate 0-1 how NON-repetitive the new item is (1 = clearly new, 0 = substantially the same as something already covered).`
      );
      return { name: "non_repetition", score: s };
    },
    // 8. Coverage is a RUN-LEVEL metric (domain spread of kept items) — see README; not per-row.
  ],
});

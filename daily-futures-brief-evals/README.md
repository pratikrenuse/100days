# Daily Futures Brief — L3 eval

A named, reproducible eval set for the Daily Futures Brief agent. Grades each candidate item on the 8 criteria (signal-vs-noise, 10yr horizon, factuality, non-repetition, coverage, specificity, source credibility, "so what"). Judged by Hermes (DeepSeek — cheap), logged to Braintrust as an Experiment you can compare across prompt versions. This is **L3**: run it by hand before/after a change and read the score delta.

## Step by step

1. **Label the dataset (your ground truth).** Open `dataset.json` and fix the `signal` and `horizon10y` fields on each item to *your* judgment. `signal: true` = data-backed (study/stat/result), not hype. `horizon10y: true` = still matters in ~10 years. This is the most important step — the eval grades the agent against these labels.

2. **Set up env.** In this folder:
   ```bash
   cp .env.example .env
   ```
   Fill in `BRAINTRUST_API_KEY` (Braintrust → Settings → API Keys) and your `HERMES_API_KEY` (from `../secrets.local.md`).

3. **Install + run.**
   ```bash
   npm install
   npx braintrust eval futures-brief.eval.ts
   ```
   It runs every item through the Hermes selector, scores it, and prints a summary + a link to the **Experiment** in Braintrust.

4. **Read it in Braintrust.** Open the experiment → you'll see per-item scores for all 7 coded criteria and the averages. This is your baseline.

5. **Iterate (the point of L3).** Change the selection prompt inside `futures-brief.eval.ts` (the `selectItem` prompt) — or later, the real brief playbook — and run again. Braintrust shows the new experiment **side by side** with the old one. If `signal_vs_noise` or `factuality` went up without the others dropping, the change was a real improvement, not a vibe.

## The 8 criteria

| # | Scorer | How | Level |
|---|--------|-----|-------|
| 1 | signal_vs_noise | agent's signal call vs your label | per-item (objective) |
| 2 | horizon_10y | agent's horizon call vs your label | per-item (objective) |
| 3 | factuality | Hermes judge | per-item |
| 4 | specificity | Hermes judge | per-item |
| 5 | source_credibility | Hermes judge | per-item |
| 6 | so_what | Hermes judge on the agent's reason | per-item |
| 7 | non_repetition | Hermes judge vs `recent_brief_items` | per-item |
| 8 | coverage | domain spread of kept items | **run-level** (see below) |

**Coverage** is the one metric that only makes sense across the whole set, not per item. For now: in the Braintrust experiment, filter to the items the agent kept and check they span multiple `domain` values rather than clustering in one. We automate this in L4/L5.

## Next: L4 and L5

- **L4** — wrap `npx braintrust eval` in a GitHub Action so every change to the brief's prompt runs this suite, and a drop below a score threshold blocks the change from going live.
- **L5** — auto-score real briefs (the traces already flow to Braintrust), and every morning you flag a bad pick, add that item to `dataset.json` as a new labeled case. The set grows from production failures; the score trend climbs across versions.

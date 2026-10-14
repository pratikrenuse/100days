# Atoms over Algorithms: The Intelligence Cost Curve (deep research)

Built 2026-07-02 from a research sweep on the cost of AI. Supports [[Atoms over Algorithms]] (the overarching lens). Sources: a16z, Epoch AI, Stanford HAI, Google, Sam Altman, SemiAnalysis.

**The one line:** the price of a unit of intelligence is collapsing ~10x a year, so the durable value of the AI era leaves the software layer and pools in the scarce physical things intelligence needs to act through, power, chips, magnets, robots, molecules.

---

## THE COST CURVE (hard, dated)
- ~10x cheaper per year (a16z "LLMflation"): a GPT-3-quality answer cost ~$60 per million tokens in Nov 2021 and ~$0.06 by Nov 2024, a 1,000x drop in three years.
- Epoch AI (independent): the price to hit a given capability fell a median ~50x/year (range 9x to 900x by task), and it is ACCELERATING, restricting to post-Jan-2024 data lifts the median to ~200x/year.
- Stanford HAI AI Index: the cost of GPT-3.5-level performance fell 280x (~$20 to ~$0.07 per million tokens) in ~18 months. GPT-4-level capability falls ~40x/year.
- Drivers: better GPU cost/performance, quantization (16-bit to 4-bit), software tricks (speculative decoding, sparse attention, KV-cache), and radically smaller models (a ~1B model now beats the 175B GPT-3).

## ELASTICITY: CHEAPER INTELLIGENCE GROWS THE MARKET
- Google went from processing 9.7 trillion tokens/month (2024) to 480 trillion (May 2025, a 50x jump) to over 3.2 quadrillion/month (2026). Unit price fell ~10x while volume rose ~100x, so total AI spend RISES even as intelligence gets cheaper (the Jevons paradox / "LLM Cost Paradox").
- Intuition for how cheap cognition now is (a16z): processing everything a person says for a whole year costs ~$2 at GPT-3-class rates.

## WHERE THE VALUE POOLS (the contested part)
- The bull lens (Altman, "The Gentle Singularity"): "the cost of intelligence should eventually converge to near the cost of electricity" (an average query uses ~0.34 watt-hours). If cognition is priced like electricity, value pools where electricity does NOT, in energy generation, physical build-out (fabs, data centers, robots), and the human-trust/application layer. This is exactly the Atoms-over-Algorithms thesis.
- The bear/counter-lens (SemiAnalysis, "AI Value Capture"): right now value is pooling UP into the frontier model labs, not out. Anthropic's annualized revenue went ~$9B to ~$44B in 2025 with inference gross margins rising from ~38% to over 70%; it launched Opus 4.5 and RAISED prices and margins. Open-weight rivals exert "very limited" downward pressure on the frontier because they underperform on real work.
- Reconciliation: the COMMODITY tier (GPT-3/3.5-class) is racing to zero; the FRONTIER tier keeps its pricing power. Value pools at whichever layer stays scarce, today that's frontier capability + physical compute + energy, not the middle.

## THE 10 / 20 / 30 SHAPE (later horizons are Altman's vision, flag as speculation)
- ~10 yrs: intelligence and energy become "wildly abundant"; a genius-level answer is effectively free. The binding constraints become energy, physical build-out, and human attention/trust, so the money moves to the physical layers (see [[Energy is the Ceiling]], [[The Physical World Gets Automated]]).
- ~20 yrs: a recursive flywheel (data centers building data centers, robots building robots) pushes the cost of intelligence toward the electricity floor; whole classes of "knowing-things" jobs erode while the physical-layer owners capture the gains.
- ~30 yrs: Altman frames one smooth exponential toward post-scarcity; treat as directional vision, not data.
- BEAR: reasoning/RL models re-inflate inference cost (they emit far more tokens), though Epoch argues that's transient via distillation; and the frontier moat may prove durable (o1's output token still costs ~$60/M, the same as GPT-3 at launch), so "intelligence goes fully free" may stall at the commodity tier while the frontier stays expensive. Decline likely slows from 10x/yr toward ~3-5x, then ~1.5-2x.

## Key sources
- a16z, LLMflation (10x/yr, 1000x/3yr): https://a16z.com/llmflation-llm-inference-cost/
- Epoch AI, inference price trends: https://epoch.ai/data-insights/llm-inference-price-trends
- Stanford HAI, 2025 AI Index (280x GPT-3.5 tier): https://hai.stanford.edu/ai-index/2025-ai-index-report
- Google I/O 2025 keynote (token volumes): https://blog.google/innovation-and-ai/technology/ai/io-2025-keynote/
- Sam Altman, The Gentle Singularity: https://blog.samaltman.com/the-gentle-singularity
- SemiAnalysis, AI Value Capture (value pooling up to labs): https://newsletter.semianalysis.com/p/ai-value-capture-the-shift-to-model

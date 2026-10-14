# Signal: The State of the AI Economy (Exponential View)

**Source:** Exponential View (Azeem Azhar, William Gildea, Hannah Petrovic, Nathan Warren, Marija Gavrilov). "The State of the AI Economy," 66 pages, published June 25, 2026. Independently produced; built bottom-up from 1,000+ firms, primary filings, cloud-attribution, confidence-scored and deduplicated.
**Ingested:** 2026-07-02 (from uploaded PDF).
**Why it matters:** rare, source-graded read on the DEMAND side of AI (usually obscure). Confirms and sharpens four of our theses with hard, dated numbers. See [[Sources/Profiles/41 Azeem Azhar]].

The report's own scope note: global ex-China; counts app + foundation-model + infrastructure hosting revenue, deduplicated by value-add; excludes chips, AI ad-uplift, and legacy-software AI features.

---

## Headline facts (dated: report as of ~Q1/Q2 2026)

- GenAI ecosystem revenue > **$175bn annualized** run-rate ($110bn trailing-12-month), growing **3x faster than any prior IT wave**.
- Time to add $1bn of cumulative revenue fell from **180 days (2023) to under 2 days (~90x faster)**. ~35% QoQ growth = 3.2x annually.
- Underpins **~$22.7 trillion** of stock-market value and has driven US GDP growth for 6 straight quarters.
- Token volumes **>30 quadrillion/month, +14x YoY**. Jensen Huang: "The input is electrons, the output is tokens. In the middle is Nvidia."

---

## By thesis (what this moves)

### [[Energy is the Ceiling]] (strongly confirms)
- US power sector reignited by AI: net generation was **flat 2008-2024**, now growing **+9 TWh/month** (faster than the +6 TWh/month of 1950-2008). (source: EIA)
- Extra US grid electricity needed by 2030 has grown **~7x since 2022 (24 GW -> 166 GW)**; data centers are **~55%** of that growth. (Grid Strategies)
- **Energy is ~66% of a data center's operating cost** (~$594M of ~$900M/yr OpEx to run 1 GW). Full cost to own+operate 1 GW of AI capacity ~ **$7.9bn/year** (89% capital, 11% OpEx).
- The largest data centers grew **~50x in power (MW) in four years**.

### [[The Bottleneck Slides Down the Stack]] (strongly confirms; this IS the report's "stack" chapter)
- The stack: Chips (Nvidia, AMD, Cerebras, Cambricon, Huawei) -> Hosting (CoreWeave, Nebius, Azure, AWS) -> Foundation Models (OpenAI, Anthropic) -> Apps (Cursor, Harvey, OpenRouter). Each layer "turns capital and energy into cognition."
- **Memory is the single biggest mover** in data-center build cost: **~2% (2021) -> ~18% (2026E)**. Chips' share of build cost rose **40% -> 60%**. "Each new dollar buys more silicon and less concrete." Reinforces the memory rung ([[SK Hynix]]).
- Value is **moving up the stack** toward apps and models: app+model share of GenAI revenue grew **~2.95x in a year**; hosting's share fell (Q1'24 -> Q1'26).
- "Labs retain pricing power only while they hold the frontier; the value of yesterday's frontier diminishes quickly into open weights." Pricing power follows **competitive pressure, not stack position**.
- Open-weight commoditization is visible: Google+OpenAI+Anthropic's weekly token share on OpenRouter fell **72% -> 33%**.
- The interconnect rung is a real line item: **DC network ~$1bn** of the ~$7.9bn/yr 1 GW build ([[Astera Labs]]).

### [[Atoms over Algorithms]] (confirms the premise: intelligence -> near-zero)
- Blended price per million tokens fell **~$17 -> ~$2**; cost to use a given level of AI falls **~10x every 12 months** (Altman).
- Token demand is **elastic (~1.2-1.8)**: every 10% price cut -> 12-18% more tokens, so total spend still rises even as the unit price collapses.
- As cognition approaches near-zero price, durable value migrates to the physical layers (energy, chips, memory, packaging), exactly this thesis.
- Measured revenue understates value: **consumer surplus ~+30%** above revenue (like electric light and free digital goods escaping GDP). (Stanford Digital Economy Lab)

### [[Compute and Resources Become Geopolitics]] (confirms scale + the China split)
- **$2 trillion** cumulative hyperscaler+neocloud CapEx through 2026; **AI-linked CapEx +$535bn above the pre-AI trend**; increasingly **externally financed** (neoclouds are debt-funded, moving risk outside the firms).
- **Nvidia supply commitments grew $31bn -> $95bn in a year.**
- Global compute (since 1971) on a ~66% CAGR, AI lifting it toward **~80% CAGR**.
- Report scope "global ex-China" is itself the geopolitical fault line; open-weight competition increasingly from Chinese labs (DeepSeek, MiniMax, Kimi/Moonshot, ByteDance's Doubao).

---

## The sober counter-narrative (use for balance, avoid hype)
- AI revenue is still **0.42% of US GDP** (vs the IT sector's 9.4%), though up **10x since Q1 2024**. "Big is still small, and early."
- **7 in 10** corporate AI claims are about **cost savings / efficiency**, not revenue growth. A majority of firms still report no quantified AI impact.
- CapEx payback is thin: Q4 2025 was the first quarter AI revenues exceeded infra depreciation; headroom only ~19% (hyperscaler) / ~32% (all GenAI). The 2026E depreciation charge nears **$111bn**. The whole bull case rests on falling prices moving enough token volume to repay a $2T buildout.

---

## Hidden players surfaced / reinforced (candidates for the Players folder)
- **Neoclouds:** CoreWeave, Nebius (the debt-funded hosting layer; a "who's financing the buildout" angle).
- **Memory:** reinforces [[SK Hynix]] (memory is the biggest cost mover).
- **Interconnect:** reinforces [[Astera Labs]] (DC network a real line item).
- **Model-routing app:** OpenRouter (where open-weight share-shift is measurable).
- **Nvidia challengers:** Cerebras, Cambricon, plus AWS/Google custom silicon (vertical integration threatening Nvidia's share).
- **Open-weight labs (commoditizers):** DeepSeek, MiniMax, Moonshot/Kimi, ByteDance/Doubao.

## Strong post angles from this report
- "AI runs on electrons, not genius" (Energy is the Ceiling) with the 7x grid number and energy = 66% of a data center's running cost.
- "The most expensive part of an AI data center went from a rounding error to 18% in five years" (memory / SK Hynix).
- "Every AI price cut makes AI bigger, not smaller" (elastic token demand, $17 -> $2).
- The sober take: "AI is still 0.42% of GDP" as a contrarian, credible, comment-baiting hook.

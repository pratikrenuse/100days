# Scenarios, forecasts and thematic research (Full Detail)

Note: This document consolidates the complete, unabridged dossiers for sources 121 to 140 (scenarios, forecasts and thematic research), preserving every link, feed, work and hook.

## Table of Contents

- 121. Starcloud Whitepaper: Why We Should Train AI in Space
- 122. Europe 2031
- 123. Citrini Research
- 124. AI 2027
- 125. SemiAnalysis
- 126. Epoch AI
- 127. Metaculus
- 128. Future Today Institute / Amy Webb (Future Today Strategy Group)
- 129. Stanford HAI AI Index
- 130. BOND / Mary Meeker
- 131. Generative Value
- 132. Fabricated Knowledge
- 133. Contrary Research
- 134. The Generalist
- 135. World Economic Forum
- 136. McKinsey Global Institute
- 137. Gartner
- 138. Lux Capital / Riskgaming
- 139. CB Insights
- 140. RAND Corporation

---

## 121. Starcloud Whitepaper: Why We Should Train AI in Space

#source
Domain: Scenarios, forecasts and thematic research
Verified: June 2026 (document dated September 2024, v1.03)

### What it is
The founding technical whitepaper of Starcloud (formerly Lumen Orbit), by Ezra Feilden (PhD), Adi Oltean and Philip Johnston. A first-principles case for moving gigawatt-scale AI data centers into orbit. This is a primary-source document (uploaded as wp.pdf, 13 pages).

### Access
- Document: uploaded PDF (wp.pdf), v1.03, September 2024
- Company: starcloud.com (formerly lumenorbit.com)
- Related player note: [[Starcloud]]
- Paywall: no

### The core argument
- AI growth is gated by power. Electricity demand may triple; Western utilities cannot build fast enough (transformer shortages, permitting). It opens with quotes from Altman, Musk, Zuckerberg and Tom Mueller on the energy wall.
- Space solves it. A dawn-dusk sun-synchronous orbit gives a solar capacity factor above 95% (versus 24% in the US, under 10% in northern Europe) plus about 40% higher peak output, so roughly 5 times the energy per array. Claimed energy cost about $0.002 per kWh, around 22 times cheaper than US wholesale.
- Cooling is free. Passive radiative cooling to the vacuum, no water (a 40 MW terrestrial cluster uses about 1.7 million tons of water over 10 years).
- Cost. A 40 MW cluster over 10 years is modeled at about $8.2m in space versus about $167m on land.
- Scale. 5 GW clusters (needed to train GPT-6 or Llama 5 class models from around 2027) exceed the largest US power plant; modular 3D assembly scales almost indefinitely.
- Enabler. Reusable heavy-lift launch dropping toward $30 per kg (possibly $10), plus laser inter-satellite links (Starlink, Kuiper, Kepler) and physical "data shuttle" modules.

### Notable specifics (September 2024)
- A 5 GW array is roughly 4km by 4km; thin-film cells above 1000 W/kg; HVDC power distribution.
- One ~100-ton launch deploys about 40 MW (Nvidia GB200 NVL72 density, 120 kW per rack); 5 GW in under ~100 launches.
- Cites SemiAnalysis for the data-center demand curve and Aschenbrenner ("racing to the trillion-dollar cluster") as the aggressive case.

### Hooks for the brain
- Primary evidence for [[Compute and Resources Become Geopolitics]] and the orbital data-center post built on [[Starcloud]].
- Direct support for [[Energy is the Ceiling]]: the power wall is the entire premise.
- The "$0.002 per kWh, 22x cheaper, free cooling, $8.2m vs $167m" figures are the sourced backbone for the orbital piece. Note the date (Sept 2024) and cross-check against 2026 Starcloud milestones in the player note.

---

## 122. Europe 2031

#source
Domain: Scenarios, forecasts and thematic research
Verified: June 2026

### What it is
A five-year, novella-style AI scenario (January 2025 to March 2031, with a 2034 epilogue) about Europe sliding into geopolitical and economic irrelevance under business-as-usual AI policy. Written by a group of AI researchers, think-tankers and investors as "disciplined imagination," not a prediction.

### Access
- URL: https://europe2031.ai
- RSS / feeds / newsletter: Podcast RSS feed at https://europe2031.ai/podcast-rss.xml (audio narration read by Tom Chivers). Agent-friendly markdown at https://europe2031.ai/llms.txt, plus /agents/scenario.md, /agents/summary.md, /agents/about.md, /agents/compute-forecast.md and /agents/all.md. PDF and EPUB editions also offered. No periodic newsletter (it is a single standalone publication).
- Paywall: no (fully free, including PDF, EPUB and audio)
- Format: Long-form fictional scenario / policy report, with a quantitative compute-forecast appendix

### What it argues about the future
AI's impact will match or exceed the Industrial Revolution but arrive in years, not decades, and Europe is systematically underestimating its speed, scale and its own inability to catch up. Because Europe controls only about 5% of global AI compute against roughly 70 to 80% for the US, it has almost no leverage: in the scenario, the US progressively rations frontier AI by country (tiering most of Europe into Tier 2), buys up distressed European carmakers to win the robotics race, and ultimately issues an ultimatum to seize ASML, the one chokepoint the whole AI race runs through. The core claim is that this is a failure of incentives and institutions, not bad actors: Europe's consensus-driven, procedure-heavy strengths become fatal weaknesses under time pressure. The authors argue the trajectory is still avoidable, but only with a wartime-scale agenda built on leverage (being indispensable) rather than half-hearted self-sufficiency.

### Notable recent work (2025 to 2026)
- "Europe 2031 (full scenario)" (published June 2026, last updated 2026-06-11), https://europe2031.ai/agents/scenario.md
  The main publication: a month-by-month narrative told through two fictional characters tracing how a chain of reasonable-looking European decisions (misreading DeepSeek R1, a mostly-repackaged 200 billion euro AI fund, civil servants barred from frontier tools) deepens dependence on US AI. It escalates through a 2027 ransomware wave that backfires on Europe-only AI mandates, a 2028 ASML export capitulation, 2029 compute rationing, and a 2031 endgame where Europe must choose between American protectorate, Chinese alignment, or isolation.
- "Summary" (last updated 2026-06-11), https://europe2031.ai/summary
  A condensed walkthrough of the timeline plus five recommendations: mobilise peacetime-unprecedented capital for compute, energy and semiconductors; build a coalition of aligned AI middle powers (Netherlands, Germany, France with Norway, UK, Canada, Japan, South Korea); reform labour markets on a Danish flexicurity model; double down on robotics and industrial AI rather than LLMs; and craft a positive societal vision for AI.
- "Compute Forecast (appendix)" (last updated 2026-06-11), https://europe2031.ai/compute-forecast
  A bottom-up quantitative model estimating global AI compute reaching roughly 370 GW by 2031 (a tenfold rise from about 30 GW in early 2025), constrained by EUV lithography and packaging bottlenecks. It pegs Europe at about 5% share versus roughly 70% for the US and 15% for China by 2031, and shows an alternative "epilogue" path where Europe triples its share to 15% by onshoring data centres in the Nordics, France and Iberia.
- "About and FAQs" (last updated 2026-06-11), https://europe2031.ai/about
  Explains the project's motivation and authorship, names AI 2027 by the AI Futures Project as the format inspiration, and states the team took no AI-industry funding. It is candid that the scenario deliberately narrows on European sovereignty while acknowledging broader catastrophic AI risks (cyber, bio, power concentration, misalignment) as serious and possibly more pressing.

### Hooks for the brain
- Anchor source for the "Europe falls behind on AI" and "compute as the decisive strategic resource" theses. Pairs directly with AI 2027 (shared compute-forecast lineage) and SemiAnalysis (EUV, ASML, packaging bottlenecks as the physical limit on the whole story).
- Strong feed for "ASML and lithography as the global chokepoint" and "sovereignty requires leverage, not self-sufficiency" arguments. The compute-forecast appendix and its public Google Sheets give concrete, citable GW numbers by region through 2031.
- Invest angle: the scenario implies a multi-year European data-centre and energy buildout (dedicated economic zones, nuclear, hydro, solar, repurposed industrial grid connections), screening of foreign takeovers of European manufacturers, and a thesis that Europe's residual edge is physical/industrial AI and robotics rather than frontier LLMs. Useful for sizing European compute capex, ASML's strategic value, and middle-power supply-chain positioning.

---

## 123. Citrini Research

#source
Domain: Scenarios, forecasts and thematic research
Verified: June 2026

### What it is
A thematic equity and global-macro investment research publication on Substack by "Citrini" (with Alap Shah), known for forward-looking, cross-asset thematic baskets and the promise that "you will never have to ask what is the trade." Over 250,000 subscribers.

### Access
- URL: https://www.citriniresearch.com (also https://citrini.substack.com and a firm site at https://www.citrini.com)
- RSS / feeds / newsletter: Substack newsletter with email subscription and standard Substack RSS. A free tier ("Preview Free Content") plus paid subscriptions.
- Paywall: partial (headline pieces and previews are free; full theses, baskets and specific trade construction are paywalled)
- Format: Investment research (thematic equity primers, long/short baskets, macro memos), occasionally written as speculative "financial history from the future"

### What it argues about the future
Citrini's core method is to identify transformative megatrends early, then express them as carefully constructed long/short equity baskets that isolate the theme from broad market factors. Its standing forward thesis is that a handful of structural megatrends (AI and its full supply chain, robotics, GLP-1 / obesity drugs, power and electrification, fiscal-driven reindustrialization) will dominate asset returns for years, and that the durable money is made by mapping the second and third-order beneficiaries before consensus arrives. Its most provocative forward-looking claim is the "2028 Global Intelligence Crisis" thought exercise: that rapid AI automation of white-collar work could hollow out household income so severely that the economy's circular flow breaks ("Ghost GDP," where output and profits rise but the people cut out of the loop stop spending). The piece is explicitly a scenario, not a forecast, and drew a public rebuttal from Citadel Securities arguing it misreads macro fundamentals and adoption curves, which itself signals how seriously markets took it.

### Notable recent work (2025 to 2026)
- "THE 2028 GLOBAL INTELLIGENCE CRISIS: A Thought Exercise in Financial History, from the Future" (updated March 2026), https://www.citriniresearch.com/p/2028gic
  A speculative macro memo written from the vantage point of June 2028, imagining US unemployment at 10.2% after a wave of AI-driven white-collar layoffs that began in early 2026. It introduces "Ghost GDP," output that shows up in national accounts but no longer circulates to households, and argues this breaks the economy's circular flow. The piece went viral (roughly 16 million views on X) and prompted a direct rebuttal from Citadel Securities.
- "State of the Themes: June 2026" (June 2026), https://www.citriniresearch.com/p/state-of-the-themes-june-2026
  A periodic portfolio review of Citrini's live thematic baskets and where each stands. The 2026 update reports four of six thematic baskets outperforming the broad US market year to date, with AI and Robotics leading. Useful as a recurring scorecard of which forward themes are working.
- "26 Trades for 2026" (with a free preview, late 2025 / early 2026), https://www.citriniresearch.com/p/26-trades-for-2026
  Citrini's signature year-ahead watchlist, putting two dozen-plus thematic long/short ideas in front of readers in the hope that several resonate over the next twelve months. The predecessor "25 Trades for 2025" (December 19, 2024, https://www.citriniresearch.com/p/25-trades-for-2025) saw a little over half its ideas beat the S&P 500 and more than 80% finish positive, with drones, defense and AI-driven power semiconductors among the standouts. Representative of Citrini's "name the trade, not just the trend" house style.
- "Thematic Equity (primer)" , https://www.citriniresearch.com/p/thematic-equity
  The foundational explainer of Citrini's approach: thematic primers are framed as multi-year or multi-decade trends rather than short trades, expressed through baskets engineered to strip out non-theme factors. Sets the methodology that frames all the forward-looking calls.

### Hooks for the brain
- The clearest "how do I actually trade the future" source in the brain. Feeds every megatrend thesis with concrete equity expression: AI buildout, robotics, GLP-1 / obesity, power and electrification, and reindustrialization.
- The "2028 Global Intelligence Crisis" is a direct bridge between the AI-displaces-labour theses (AI 2027, Europe 2031) and market consequences. Use it as the bear / disruption case for white-collar employment, and pair it with the Citadel rebuttal to keep the view balanced.
- Invest angle is the whole point: treat Citrini as the basket-construction and second-order-beneficiary layer on top of the more conceptual scenarios. Note the partial paywall: capture the free thesis framing and the public scorecards, but the actual ticker-level baskets sit behind the subscription.

---

## 124. AI 2027

#source
Domain: Scenarios, forecasts and thematic research
Verified: June 2026

### What it is
A detailed, research-backed, month-by-month scenario of AI progress from 2025 through 2027 and beyond, splitting into a "race" ending and a "slowdown" ending. Built by the AI Futures Project (Daniel Kokotajlo, Scott Alexander, Thomas Larsen, Eli Lifland, Romeo Dean).

### Access
- URL: https://ai-2027.com
- RSS / feeds / newsletter: AI Futures Project blog and newsletter at https://blog.ai-futures.org (Substack-style). Org site at https://ai-futures.org. Full scenario also offered as a PDF (https://ai-2027.com/ai-2027.pdf), an audio version, and a YouTube video summary. Backed by detailed public supplements (timelines, takeoff, compute, AI goals, security forecasts).
- Paywall: no (free)
- Format: Long-form narrative forecast / scenario with quantitative supplements

### What it argues about the future
The central claim is that AI R&D will itself be automated around 2027: a leading US lab (called "OpenBrain") builds AI agents good enough to dramatically accelerate their own research, compounding through superhuman coder to superintelligent researcher to artificial superintelligence (ASI) by the end of 2027. From there the AIs, not the humans, dictate the future, and the difficulty of supervising systems smarter than us means their goals may turn adversarially misaligned. The scenario stresses an existential US-China race dynamic (China builds a Centralized Development Zone with ~10% of world compute and steals model weights), and warns that the race forces corner-cutting on safety. It forks into a "race" ending where a misaligned ASI ultimately wipes out humanity, and a "slowdown" ending where centralized compute, external oversight, and a chain-of-thought-preserving architecture let humans keep control, though power concentrates in a small committee. The throughline: whoever (or whatever) controls ASI controls everything, and the public will be months behind the real frontier when the pivotal decisions are made.

### Notable recent work (2025 to 2026)
- "AI 2027 (full scenario)" (April 3, 2025), https://ai-2027.com
  The flagship publication: a concrete, quantitative timeline from 2025's unreliable-but-valuable agents through 2026's compute crunch to 2027's automated AI research and intelligence explosion. Notable for being authored partly by former OpenAI researcher Daniel Kokotajlo, whose earlier predictions (chain-of-thought, inference scaling, chip export controls) aged well.
- "Summary and Scenario Takeaways" (April 3, 2025), https://ai-2027.com/summary
  A condensed version laying out the branch point (slowdown vs race) and eight takeaways, including that ASIs will dictate humanity's future, that a single actor controlling ASI could seize total power, and that no US AI project is on track to be secure against nation-state weight theft by 2027.
- "Compute Forecast" (April 2025), https://ai-2027.com/research/compute-forecast
  The supplement modelling global AI compute growth that underpins the scenario (and which Europe 2031 later built on). It projects the GW-scale buildout and the chip/lithography constraints shaping how fast the race can actually run, and is explicitly designed to stand independent of the scenario's other predictions.
- "Timelines and Takeoff Forecasts" (April 2025, with later revisions), https://ai-2027.com/research/timelines-forecast
  Supplements estimating when expert-human-level AI arrives and how fast it then self-accelerates. By 2026 the team publicly signalled their median timeline for the most dramatic breakthroughs had slipped somewhat later (toward the late 2020s and early 2030s) rather than landing exactly in 2027, while keeping the qualitative dynamics intact.

### Hooks for the brain
- The canonical anchor for the "intelligence explosion / recursive self-improvement" and "automated AI R&D" theses, and the template other scenarios (notably Europe 2031) copy. Use it as the base case for "what a fast takeoff looks like, month by month."
- Strong feed for "US-China AI race," "AI misalignment and loss of control," and "extreme concentration of power" theses. The eight takeaways are a ready-made checklist of forward risks.
- Invest angle: indirect but powerful. Its compute forecast and emphasis on compute as the binding constraint support theses on data-centre buildout, accelerators, power, and the security/espionage premium around model weights and fabs. The scenario's mechanism (compute scaleups plus algorithmic progress compounding) is the demand-side story behind the SemiAnalysis supply-side story, so pair the two.

---

## 125. SemiAnalysis

#source
Domain: Scenarios, forecasts and thematic research
Verified: June 2026

### What it is
Dylan Patel's deep research firm and newsletter on semiconductors, AI data-center infrastructure, supply chains, and compute economics. Widely cited as the leading independent authority on the physical AI buildout, with 180,000+ newsletter subscribers plus paid institutional research.

### Access
- URL: https://semianalysis.com (newsletter at https://newsletter.semianalysis.com, archive at https://newsletter.semianalysis.com/archive)
- RSS / feeds / newsletter: Substack-based newsletter with email subscription and RSS; free articles plus a paid subscription tier. Separate, higher-priced institutional products (industry models such as Accelerator and HBM, AI Cloud TCO, Datacenter Industry, Wafer Fab, plus tools like ClusterMAX, the GPU Pricing Index and InferenceMAX).
- Paywall: partial (some pieces and the newsletter front are free; deep dives, data products and industry models are paid / institutional)
- Format: Investment-grade industry research and data (supply-chain analysis, bottoms-up models, satellite-tracked datacenter mapping, benchmarking)

### What it argues about the future
SemiAnalysis's forward thesis is that AI's trajectory is ultimately gated by physical infrastructure, not just algorithms: the constraints that matter are logic (leading-edge fab capacity and EUV), memory (high-bandwidth memory and advanced packaging), and power (grid interconnection and energy supply). It tracks a trillion-dollar-plus buildout, forecasting hyperscaler capex exceeding half a trillion dollars by 2026 and US AI power scaling from a few GW toward tens of GW, and argues that whoever secures chips, memory, packaging and power at scale controls the pace of AI. It maps the world's AI capacity across thousands of facilities using permits, property records, FOIA requests, power data and satellite imagery, giving it unusually grounded forward calls. A recurring theme is that headline narratives (cheap DeepSeek training, an "AI bubble," GPU gluts) are usually wrong on the details, and that real costs, real bottlenecks and real deal flow tell a different and more bullish story about sustained compute demand.

### Notable recent work (2025 to 2026)
- "DeepSeek Debates: Chinese Leadership on Cost, True Training Cost, Closed Model Margin Impacts" (early 2025), https://newsletter.semianalysis.com/p/deepseek-debates
  A widely cited teardown arguing DeepSeek's headline "$6M" training figure captures only a narrow slice of true cost, and that DeepSeek assembled a large GPU cluster partly because of lagging export controls. It reframed the "AI got cheap" narrative by separating pre-training cost from total cost of ownership.
- "AI Neocloud Playbook and Anatomy" (October 2025), https://newsletter.semianalysis.com/p/ai-neocloud-playbook-and-anatomy
  A deep dive on the new wave of GPU-rental "neocloud" providers, their unit economics, and why the business model is still evolving. It profiles the largest players running toward 100,000+ H100-equivalent fleets and lays out which neoclouds are positioned to survive a capacity glut.
- "How Oracle Is Winning the AI Compute Market" (October 2025), https://newsletter.semianalysis.com/p/how-oracle-is-winning-the-ai-compute-market
  An analysis of how Oracle, via the Stargate joint venture and the GW-scale Abilene, Texas training hub, captured outsized share of AI compute deployment. Ties together hyperscaler strategy, OpenAI's data-center demand, and the economics of building gigawatt training clusters.
- "CPUs are Back: The Datacenter CPU Landscape in 2026" (February 2026), https://newsletter.semianalysis.com/p/cpus-are-back-the-datacenter-cpu
  Argues that CPUs, sidelined during the GPU gold rush, became relevant again as agent-driven and reinforcement-learning workloads shifted datacenter demand in late 2025. Flags an inflection point (including an unexpected uptick in Intel datacenter CPU demand) and what it means for the 2026 server stack.

### Hooks for the brain
- The definitive supply-side anchor for "compute is the binding constraint on AI" and "the physical AI buildout" theses. It is the empirical backbone under the more speculative scenarios: where AI 2027 and Europe 2031 assert compute trajectories, SemiAnalysis supplies the fab, memory, packaging and power detail (and the ASML / EUV chokepoint that Europe 2031's endgame turns on).
- Feeds "AI data-center and energy capex supercycle," "US-China chip and export-control" and "power grid as the new bottleneck" theses with granular, satellite-grounded numbers.
- Invest angle: arguably the most directly investable source here. Use it for sizing accelerators, HBM, networking, foundry and energy demand, for naming beneficiaries across the stack (foundries, memory, packaging, neoclouds, power), and for sanity-checking hype cycles. Note the partial paywall: the narrative front is readable free, but the load-bearing models and data products are institutional. Pair with Citrini to turn the supply-chain map into specific equity baskets.

---

## 126. Epoch AI

#source
Domain: Scenarios, forecasts and thematic research
Verified: June 2026

### What it is
A multidisciplinary research institute that collects data and builds quantitative forecasts on the trajectory of AI, covering compute, scaling, hardware, costs, data centers, and AI's economic impact. Its work is data-led and distilled into public databases, trend trackers, and explainers used by labs, governments, and journalists.

### Access
- URL: https://epoch.ai/
- RSS / feeds / newsletter / API: Newsletter "Gradient Updates" on Substack (https://epochai.substack.com/subscribe); a separate "Data Insights" stream of short data investigations; podcast "Epoch After Hours". Open databases and "Data Explorers" (models, data centers, chip owners, companies, benchmarks) are downloadable. Active on X (@EpochAIResearch), Bluesky, GitHub (github.com/epoch-research), LinkedIn. No single public REST API advertised, but datasets are open and exportable.
- Paywall: no (research, data, and newsletter are free and open)
- Format: Data dashboards and trend trackers, papers and reports, short "Data Insights" graph-led notes, weekly newsletter commentary, podcast, and benchmarks (FrontierMath, MirrorCode, Epoch Capabilities Index).

### What it argues or forecasts about the future
Epoch's central thesis is that AI progress is driven by measurable, fast-compounding inputs, and that tracking those inputs lets you forecast where AI is heading. Their headline trends: frontier training compute is growing about 5x per year (doubling every roughly 5 months), the total stock of AI compute is growing about 3.4x per year, inference cost for a fixed capability level is falling around 40x per year, and the largest data centers are doubling compute capacity roughly every 7 months. They model whether this scaling can continue to 2030 (they argue it likely can, with power and capital as the binding constraints), and through their GATE macroeconomic model they explore how AI automation could drive much faster, potentially explosive, economic growth. A growing 2026 theme is AI economics and a possible financing strain: hyperscaler capital spending is on track to outpace operating cash flow around Q3 2026.

### Notable recent work (2025 to 2026)
- "MirrorCode: What's the largest software project AI can complete on its own?" (Jun 26, 2026), https://epoch.ai/MirrorCode
  A new benchmark measuring how large a real software project a frontier model can autonomously complete. Preliminary results showed Claude Opus 4.6 reimplementing a roughly 16,000-line bioinformatics toolkit, a task estimated to take a human engineer weeks. It is positioned as early evidence that AI can already handle multi-week coding work, not just short tasks.

- "Hyperscaler capex is on trend to outpace their cash inflows by the end of 2026" (Jun 16, 2026), https://epoch.ai/data-insights/hyperscaler-capex-vs-cash-flow
  A data note tracking the largest cloud and AI firms' capital expenditure against their operating cash flow. Epoch projects aggregate cash capex overtaking operating cash flow around Q3 2026, meaning the AI buildout starts requiring external financing rather than being self-funded. This is one of their clearest signals about the financial sustainability of the current compute race.

- "The record for computing capacity in a single data center has doubled every 7 months" (Jun 11, 2026), https://epoch.ai/data-insights/largest-data-center-compute
  An analysis of the largest known AI data centers, drawing on satellite and permit data. It finds single-site compute capacity doubling roughly every 7 months, with the current leader near 800,000 NVIDIA H100-equivalents. This quantifies how physical infrastructure, not just algorithms, is scaling at an extraordinary rate.

- "Compute accounts for the majority of expenses of AI companies" (Feb 4, 2026), https://epoch.ai/data-insights/company-spending-breakdown
  A breakdown of where leading AI companies spend money, showing compute as the dominant cost line. It reframes frontier AI firms as capital-intensive infrastructure businesses rather than typical software companies. Useful for understanding unit economics and why margins and financing matter so much to AI's trajectory.

- "Can AI scaling continue through 2030?" (Aug 20, 2024, foundational and still actively cited in 2025 to 2026), https://epoch.ai/publications/can-ai-scaling-continue-through-2030
  A flagship report assessing the four likely bottlenecks to continued scaling: power, chips, data, and money. Epoch concludes scaling can probably continue to 2030 at roughly historical rates, with power availability and capital the hardest constraints. This is the anchor reference for their "scaling has room to run" position.

### Hooks for the brain
- Best hard-numbers source for the "AI capability and compute curve" thesis: feeds any claim about how fast models, compute, and costs are moving over the next 10 to 20 years.
- Feeds the "AI infrastructure and energy build-out" thesis (data centers, power demand, chip supply) and the "AI economics could break or bend" thesis (hyperscaler capex vs cash flow, compute as dominant cost).
- Use GATE and the scaling-to-2030 work for the "explosive economic growth from automation" scenario, and as a credible quantitative counterweight when other sources hand-wave AI timelines.
- For a marketer audience: a citable, neutral source for "where AI is actually going" stats in decks and trend pieces, since it is trusted by NYT, FT, WSJ, and governments.

---

## 127. Metaculus

#source
Domain: Scenarios, forecasts and thematic research
Verified: June 2026

### What it is
A community forecasting platform and aggregation engine where thousands of forecasters predict real-world outcomes across AI, science, geopolitics, economics, and more, producing track-recorded, calibration-tested probabilities. It also runs AI-vs-human forecasting tournaments and offers forecasting as a service to organizations.

### Access
- URL: https://www.metaculus.com/
- RSS / feeds / newsletter / API: Public API for questions and tournaments (https://www.metaculus.com/api/) plus an API wrapper and open-source bot tooling on GitHub (github.com/Metaculus). The site code is open source (BSD-2-Clause). Updates flow through "Notebooks" (long-form analyses), tournament pages, a Discord community, and X (@metaculus). No traditional email newsletter is prominently advertised.
- Paywall: no (forecasts, questions, notebooks, and API are free; some services like private instances and Pro Forecasters are paid)
- Format: Live probabilistic question pages with community medians and history, tournaments (including AI bot tournaments), "Notebooks" research write-ups, dashboards (FutureEval, Labor Automation Hub), and a public data API.

### What it argues or forecasts about the future
Metaculus does not push a single thesis; it surfaces the aggregated, continuously updated view of a calibrated forecasting community, which makes it a useful reality check against individual pundits. On AI timelines, the community's current medians are notably later than many lab leaders claim: "weakly general AI" around 2028, the first publicly announced general AI system around 2032, and "transformative AI" around 2039, with roughly 25% odds of AGI by the late 2020s and 50% around the early-to-mid 2030s. A second major strand is its work on AI forecasting itself: through FutureEval and quarterly AI Forecasting Benchmark tournaments, Metaculus tracks how fast AI models are catching up to elite human forecasters, and as of 2026 its human Pro Forecasters have still beaten the best bots every season, though the gap is a live, closely watched question. It also runs dedicated hubs on the future of work and labor automation as AI advances.

### Notable recent work (2025 to 2026)
- "AI Forecasting in 2026: What 11 Analyses Say" (May 16, 2026, edited Jun 12, 2026), https://www.metaculus.com/notebooks/43363/ai-forecasting-in-2026/
  A synthesis of 11 Metaculus analyses run between Sep 2024 and May 2026 on how to build accurate AI forecasting bots. It includes a bot-building playbook, a case study of the top open-source bot, and recommendations for funders on the field's bottlenecks. The throughline: AI forecasting is improving fast but still trails the best humans, and aggregation matters.

- "Transformative AI Date" (live question, continuously updated through 2026), https://www.metaculus.com/questions/19356/transformative-ai-date/
  A community forecast for when transformative AI arrives, with a current median around February 2039. It is one of the more conservative credible signals on truly economy-reshaping AI, useful as a counterweight to near-term AGI hype. The page shows the full distribution and how the community has updated over time.

- "When Will Weakly General AI Arrive?" (live question, updated through 2026), https://www.metaculus.com/questions/3479/date-weakly-general-ai-is-publicly-known/
  A long-running, heavily forecasted question (hundreds of forecasters) on a near-term AGI milestone, currently pointing to roughly 2028. It captures how dramatically community timelines have compressed since 2020. A go-to reference for the "AGI is plausibly this decade" line of the debate.

- "Spring 2026 FutureEval Bot Tournament" and the AI Forecasting Benchmark series (2025 to 2026), https://www.metaculus.com/tournament/spring-aib-2026/
  The current round of Metaculus's flagship competition pitting AI forecasting bots against human Pro Forecasters, backed by sizeable prize pools (a year-long iteration was funded at 175,000 USD). Results so far show humans still winning each season while bots close in. This is the best ongoing experiment on whether AI can out-predict skilled humans.

- "Labor Automation Forecasting Hub" (ongoing, active 2025 to 2026), https://www.metaculus.com/labor-hub/
  A dedicated hub of community forecasts on the future of the US workforce as AI advances, covering automation of specific tasks and occupations. It translates abstract AI progress into concrete labor-market expectations over the coming years. Valuable for grounding "AI and jobs" claims in numbers rather than vibes.

### Hooks for the brain
- The calibration anchor for the whole brain: whenever a thesis rests on an AI, science, or geopolitics timeline, cross-check it against the Metaculus community median to see if the crowd agrees.
- Feeds the "AGI timelines" debate with a credible, conservative-leaning counterpoint to lab hype (transformative AI around 2039, weakly general AI around 2028).
- Feeds the "AI and the future of work" thesis via the Labor Automation Hub, and the "can AI out-think experts" question via FutureEval and the bot tournaments.
- Use the API and live question pages to pull current odds on demand; ideal for "what does the smart-money crowd think" framing in marketer-facing trend content.

---

## 128. Future Today Institute / Amy Webb (Future Today Strategy Group)

#source
Domain: Scenarios, forecasts and thematic research
Verified: June 2026

### What it is
A strategic foresight firm led by quantitative futurist Amy Webb, known for nearly two decades of the annual Tech Trends Report and a rigorous, data-driven foresight methodology. The Future Today Institute is now Future Today Strategy Group (FTSG), and in 2026 it retired the trends report in favor of a new format, the "Convergence Outlook".

### Access
- URL: https://ftsg.com/ (also historically futuretodayinstitute.com)
- RSS / feeds / newsletter / API: The flagship "Convergence Outlook 2026" report is delivered free via an email gate (fill a form, receive a download link); periodic informational emails follow. A public blog (https://ftsg.com/blog), publications page, and press page provide ongoing content. Active on LinkedIn and X (@FTSG_Consulting). No public API.
- Paywall: partial (the full annual Outlook is free but gated behind a registration form; blog and summaries are open)
- Format: Annual flagship report (PDF / interactive), blog posts, scenario frameworks and decision tools, an organizational self-assessment quiz, and keynote talks (notably the SXSW launch each year).

### What it argues or forecasts about the future
FTSG's 2026 argument is that the future no longer arrives one trend at a time, so single-trend analysis is no longer sufficient. They declare a "Convergence Era" in which technologies, capital, geopolitics, climate, and human behavior collide to create system-level shifts that are larger and different in kind than the sum of their parts, redistribute power and value, and are hard to reverse. The Outlook names ten convergences shaping the next decade: Compute Shock (AI dragging the cloud back to physical, energy-constrained infrastructure), Programmable Biology, Polycompute, Emotional Outsourcing (AI companionship and validation at scale), Autonomous Care, The Corporate Panopticon (surveillance as the path of least resistance), The New Labor Equation (the economy detaching from employment), Human Augmentation, the Agentic Economy (AI agents dismantling the commerce internet), and Living Intelligence (biological and machine intelligence merging). Amy Webb frames the leadership implication as deliberate "creative destruction": leaders must dismantle what worked yesterday before the market does it for them.

### Notable recent work (2025 to 2026)
- "2026 Convergence Outlook" (launched March 2026 at SXSW), https://ftsg.com/convergence/
  FTSG's replacement for the long-running Tech Trends Report, organized around ten cross-domain convergences rather than isolated trends. Each section includes decision frameworks, "no-regrets" moves, and pragmatic scenarios that surface second- and third-order effects. It is the single best snapshot of how FTSG sees the world reorganizing over the next decade.

- "The Convergence Era: Choosing creative destruction" (Amy Webb's letter, 2026), https://ftsg.com/convergence/
  Webb's framing essay for the 2026 Outlook, arguing the greatest threat to organizations is not external disruption but the refusal to destroy from within. She publicly "kills" the firm's own marquee Tech Trends Report as a once-great idea worth retiring, citing Schumpeter's creative destruction. It sets the strategic posture FTSG urges leaders to adopt now.

- "The Beginning of All At Once" (June 10, 2026), https://ftsg.com/the-beginning-of-all-at-once/
  A blog essay on the question of when artificial intelligence's effects truly compound, reinforcing the convergence thesis that change is now arriving simultaneously rather than sequentially. It extends the Outlook's core idea into a more focused argument about AI timing and systemic impact. Useful as a shorter, free companion to the gated report.

- "FTSG at Aspen Ideas Festival 2026" (June 25, 2026), https://ftsg.com/ftsg-at-aspen-ideas-festival-2026/
  A dispatch tied to FTSG's participation in a major ideas festival, signaling the themes the firm is taking to elite policy and business audiences in 2026. It is a useful marker of which convergences are getting the most public emphasis this year. Indicative of how FTSG positions its foresight in the broader conversation.

- "The Futurist Who Helped Define Tech Trend Reports Just Killed Them" (Fast Company / Inc., 2026 SXSW coverage), https://www.fastcompany.com/91507234/amy-webb-trend-report-death-sxsw
  Independent press coverage of Webb's SXSW moment staging a mock funeral for the annual trends report and unveiling the Convergence Outlook. It explains the methodological pivot from trend lists to convergence analysis for an outside audience. A good external validation of the shift and its reasoning.

### Hooks for the brain
- The strongest "convergence and second-order effects" lens in the brain: use it to connect theses that the other sources treat in isolation (AI plus energy plus geopolitics plus labor).
- Feeds many thematic threads at once: "compute and energy" (Compute Shock), "future of work" (New Labor Equation), "surveillance and privacy" (Corporate Panopticon), "AI companionship" (Emotional Outsourcing), and "human augmentation and synthetic biology".
- Use the ten convergences as ready-made scenario scaffolding and the "creative destruction" framing for any strategy or leadership angle.
- For a marketer audience: rich, vivid language and decision frameworks that translate abstract futures into "what should leaders do now" narratives, ideal for thought-leadership content. Note the full report is gated, so plan for the email signup.

---

## 129. Stanford HAI AI Index

#source
Domain: Scenarios, forecasts and thematic research
Verified: June 2026

### What it is
The annual AI Index Report from the Stanford Institute for Human-Centered AI (HAI): an independent, heavily sourced effort to track, collate, distill, and visualize data on AI capability, investment, adoption, policy, and public opinion. It is widely treated as the authoritative yearly baseline on the state of AI for policymakers, executives, researchers, and journalists.

### Access
- URL: https://hai.stanford.edu/ai-index (latest: https://hai.stanford.edu/ai-index/2026-ai-index-report)
- RSS / feeds / newsletter / API: HAI email signup for news (https://hai.stanford.edu/subscribe-hai-mailing-list); full reports are free PDFs; underlying datasets are published openly via Google Drive ("Access the Public Data"); a "Global Vibrancy Tool" offers interactive country comparisons. Active on X (@StanfordHAI), LinkedIn, YouTube, Instagram. No dedicated public API, but raw data is downloadable.
- Paywall: no (report, chapters, policy highlights, and public data are all free)
- Format: Large annual report (free PDF plus chapter-by-chapter web pages), policy-highlights summary, "X takeaways" news write-up, interactive tools, downloadable datasets, and a launch seminar.

### What it argues or forecasts about the future
The AI Index is descriptive and data-first rather than predictive, but its year-over-year curves function as a forecast of direction and pace. Its 2026 picture: AI capability is rising steeply (coding on SWE-bench Verified jumped from about 60% to near 100% in a year, and top models now beat human-expert baselines on PhD-level science questions and won gold at the 2025 International Mathematical Olympiad), even as the same models fail mundane tasks like reading analog clocks roughly half the time, underlining jagged, uneven progress. Adoption is faster than any prior general-purpose technology (generative AI reached about 53% population adoption within three years and 88% organizational adoption), investment keeps hitting records (the 2025 report put 2024 corporate AI investment at about 252 billion USD, with US private investment far ahead of China's), and the US-China capability gap has nearly closed (down to roughly 2.7% by early 2026). It also flags warning signs: entry-level software jobs for 22 to 25 year-olds fell nearly 20% since 2024 (the first measurable white-collar contraction attributed to AI), model transparency scores dropped, and education and governance lag adoption. The implied trajectory: capability, adoption, and spending keep compounding while trust, policy, and labor adjustment struggle to keep up.

### Notable recent work (2025 to 2026)
- "The 2026 AI Index Report" (April 2026), https://hai.stanford.edu/ai-index/2026-ai-index-report
  The latest edition, spanning research and development, technical performance, responsible AI, economy, science, medicine, education, policy, and public opinion. It documents near-saturation on major benchmarks, record adoption and consumer value, a nearly closed US-China gap, and the first signs of AI-linked job contraction. The definitive 2026 baseline for the state of AI.

- "Inside the AI Index: 12 Takeaways from the 2026 Report" (April 2026), https://hai.stanford.edu/news/inside-the-ai-index-12-takeaways-from-the-2026-report
  HAI's own distillation of the year's most important findings into twelve headline points. It surfaces the sharpest signals: benchmark saturation alongside basic-task failures, gen-AI value to US consumers reaching about 172 billion USD a year, falling transparency scores, and the entry-level developer decline. The fastest way to brief someone on the 2026 report.

- "The 2025 AI Index Report" (April 2025), https://hai.stanford.edu/ai-index/2025-ai-index-report
  The prior edition and the reference point for 2024 data: record investment (about 252 billion USD corporate, US private investment roughly 12x China's), a more than 280-fold drop in GPT-3.5-level inference cost in two years, organizational AI use jumping to 78%, and rising global regulation. Still the cited source for the magnitude of the 2024 investment and cost-collapse story.

- "AI Index 2025: State of AI in 10 Charts" (April 2025), https://hai.stanford.edu/news/ai-index-2025-state-of-ai-in-10-charts
  A visual quick-read version of the 2025 report built around ten charts. It is the most shareable format for the headline trends in capability, cost, adoption, and investment. Handy for slides and trend pieces that need a credible single-source chart.

- "Economy" chapter, 2026 AI Index (April 2026), https://hai.stanford.edu/ai-index/2026-ai-index-report/economy
  The deep-dive chapter on AI's economic footprint, covering investment flows, consumer value, productivity, and early labor-market effects. It is where the entry-level developer contraction and the gen-AI consumer-value figures are documented in detail. The go-to chapter for any "AI and the economy over the next decade" claim.

### Hooks for the brain
- The default citable baseline for almost any "state of AI" or "how fast is AI moving" claim: trusted, neutral, and updated annually, so it grounds many theses at once.
- Feeds the "capability curve" thesis (benchmark saturation plus jagged failures), the "AI and the economy / jobs" thesis (investment records, consumer value, entry-level job decline), and the "US-China AI race" thesis (the closing capability gap).
- Pairs well with Epoch AI (Epoch for forward compute and cost projections, HAI for the broad annual snapshot) and Metaculus (HAI for what happened, Metaculus for what the crowd expects next).
- For a marketer audience: the safest authority to quote for adoption and investment statistics, with free charts and open data ready for decks, blog posts, and trend reports.

---

## 130. BOND / Mary Meeker

#source
Domain: Scenarios, forecasts and thematic research
Verified: June 2026

### What it is
BOND is a San Francisco technology venture firm led by Mary Meeker, the analyst behind the long-running Internet Trends reports, now publishing sweeping data-driven reports on where computing and AI are heading.

### Access
- URL: https://www.bondcap.com/
- RSS / feeds / newsletter: No public RSS or recurring email newsletter. Reports are posted as standalone web slide decks and downloadable PDFs at bondcap.com (under the homepage "special reports" section). New reports are typically announced via Mary Meeker and BOND on X (@bondcap).
- Paywall: No. The full reports and PDFs are free to read and download.
- Format: Long slide-deck style reports (often 300 plus pages of charts), viewable in-browser and as PDF. Cadence is occasional and event-driven, not regular.

### What it argues about the future
Meeker's core thesis is that AI is being adopted faster than any prior technology in history and is compounding on top of the internet rather than replacing it. ChatGPT reached hundreds of millions of weekly users in well under two years, inference costs have collapsed by roughly 99 percent in two years, and hyperscaler capital expenditure has surged past 200 billion dollars a year. She frames the next decade as an "AI space race" in which the United States and China compete for model, compute, and energy supremacy, with open-source Chinese models (notably DeepSeek) gaining global user share at startling speed. The takeaway for the next 10 to 20 years: usage, capital, and geopolitical stakes are all moving on exponential curves at once, and the firms that own the compute and energy bottleneck capture the value.

### Notable recent work (2025 to 2026)
- "Trends - Artificial Intelligence (May '25)" (May 30, 2025), https://www.bondcap.com/reports/tai/
  A roughly 340-page deck arguing AI adoption, capex, and capability are all scaling at unprecedented rates. It documents ChatGPT's jump from 100 million to 800 million weekly users in 17 months, a 99 percent fall in inference cost, Big Six capex hitting 212 billion dollars in 2024, and China closing the gap with open models. This is the flagship and the best single snapshot of Meeker's worldview. PDF mirror: https://www.bondcap.com/report/pdf/Trends_Artificial_Intelligence.pdf
- "USA Inc. Revisited (Mar 2025)" (March 2025), https://www.bondcap.com/report/pdf/USA_Inc_Revisited.pdf
  An update to Meeker's earlier "USA Inc." analysis that treats the US government like a business and examines its balance sheet, spending, and debt trajectory. It frames fiscal sustainability and government finances as a structural backdrop to the coming technology cycle.
- "AI & Universities (Jul 2024)" (July 2024), https://www.bondcap.com/report/aiu/
  A report on how artificial intelligence reshapes higher education, research, and the talent pipeline. It looks at how universities adopt AI and what that means for the future supply of researchers and skilled workers.

### Hooks for the brain
- Feeds the "AI adoption is faster than any prior tech wave" and "AI vs the internet" theses with hard, citable curves (users, cost, capex). Use the May 2025 deck as the canonical reference slide for adoption speed and the compute-capex buildout.
- Strong feed for the US-China AI "space race" and energy/compute bottleneck theses; flags DeepSeek and open-source Chinese models as rising players to watch.
- Invest angle: Meeker explicitly names the Big Six hyperscalers as the capex spenders and frames compute, energy, and inference cost as where value concentrates. Hidden-player signal: open Chinese model suites (DeepSeek) gaining user share is the contrarian watch item. Because reports are free and chart-dense, they are ideal raw material to lift specific data points and forecasts into other dossiers.

---

## 131. Generative Value

#source
Domain: Scenarios, forecasts and thematic research
Verified: June 2026

### What it is
Generative Value is a tech-investing research newsletter by Eric Flaningam (a partner at venture firm Felicis) that studies the world's most important companies and industries, with a focus on technology value chains, AI infrastructure, and where value accrues.

### Access
- URL: https://www.generativevalue.com/
- RSS / feeds / newsletter: Substack-based email newsletter; subscribe at the site. Substack RSS feed available at https://www.generativevalue.com/feed (standard Substack /feed pattern). Browse posts at https://www.generativevalue.com/archive
- Paywall: Partial. Most essays are free to read; some deeper material and the full back catalogue sit behind a paid subscription.
- Format: Long-form written deep dives and recurring quarterly "Hyperscaler / Cloud" market updates, plus an annual letter.

### What it argues about the future
Flaningam's organizing idea is that investing is "a game of underestimations," so the work is to map technology value chains and figure out which layer actually captures the value as a wave plays out. His recent writing argues that AI is not shaping up like the SaaS cycle: capital expenditure keeps rising, compute is becoming the binding constraint, and the value chain is shifting so that model labs like OpenAI and Anthropic are gaining leverage over the cloud providers that host them. He is skeptical that traditional software business models survive unchanged in an era of AI-generated code, and he repeatedly studies how open-source dynamics commoditize complements. Looking out 10 to 20 years, his lens is less about a single winner and more about where durable economic value settles across compute, models, clouds, and applications.

### Notable recent work (2025 to 2026)
- "The Hyperscalers & The Compute Crunch (Quarterly Update)" (May 4, 2026), https://www.generativevalue.com/p/the-hyperscalers-and-the-compute
  His recurring scorecard on the major cloud providers, framed this quarter around coding agents pushing the compute ecosystem to its limit. Tracks market share, capex, and revenue growth and argues demand from AI workloads is straining available compute.
- "Q4 '25 Cloud Update (What's going on with software?)" (Feb 9, 2026), https://www.generativevalue.com/p/q4-25-cloud-update-whats-going-on
  A quarterly review of cloud results that asks why software stocks are behaving oddly and what it implies for the hyperscalers. Connects software demand signals back to the infrastructure layer.
- "2025 Annual Letter" (Jan 4, 2026), https://www.generativevalue.com/p/2025-annual-letter
  Subtitled "An Estimation of Underestimations," this is his yearly synthesis of how his framework performed and where he thinks value is mispriced going forward. The clearest single statement of his investing philosophy and forward view.
- "Thoughts on the Hyperscalers (Q3 '25 Update)" (Nov 6, 2025), https://www.generativevalue.com/p/thoughts-on-the-hyperscalers-q3-25
  Argues the AI value chain is shifting, with OpenAI and Anthropic gaining importance relative to the cloud providers. Breaks down market share, capex, and revenue growth for the major clouds.
- "Where do Tech Returns Come From?" (Jul 8, 2025), https://www.generativevalue.com/p/where-do-tech-returns-come-from
  An analysis of 30 years of technology returns and where value accretion has historically come from. Uses that history to reason about which layers of today's AI stack are most likely to compound.

### Hooks for the brain
- Prime feed for the "where does value accrue in the AI stack" thesis and the compute-as-bottleneck thesis. Use the quarterly Hyperscaler/Cloud updates as a running data source on capex, cloud market share, and the compute crunch.
- Names specific players and the shifting power balance: OpenAI and Anthropic gaining leverage over the hyperscalers (Microsoft Azure, AWS, Google Cloud). The "AI is not shaping up like SaaS" argument is a useful contrarian counterweight to lazy software-cycle analogies.
- Invest angle: Flaningam writes from a working venture investor's seat (Felicis), so the framing is explicitly about durable value capture and underestimated layers, not hype. Strong for spotting which infrastructure and model-layer names are structurally advantaged over a 10-to-20-year horizon.

---

## 132. Fabricated Knowledge

#source
Domain: Scenarios, forecasts and thematic research
Verified: June 2026

### What it is
Fabricated Knowledge is a deep semiconductor and AI-hardware research newsletter by Doug O'Laughlin, written for investment professionals, covering the chip supply chain from chemical inputs and equipment through fabrication, memory, and design IP.

### Access
- URL: https://www.fabricatedknowledge.com/
- RSS / feeds / newsletter: Substack email newsletter; subscribe at the site. Substack RSS feed at https://www.fabricatedknowledge.com/feed (standard Substack /feed pattern). Browse posts at https://www.fabricatedknowledge.com/archive
- Paywall: Partial. Many essays and macro/market pieces are free; deep company and supply-chain analysis is largely reserved for paid subscribers.
- Format: Long-form written deep dives, earnings recaps, an annual AI and Semiconductor Outlook, plus occasional expert interview podcasts.

### What it argues about the future
O'Laughlin's central claim is that the AI boom is, at bottom, a hardware and supply-chain story, and that understanding chips, memory, and the physics of compute is the only way to judge how durable the cycle is. He has spent 2025 and 2026 stress-testing the AI capex buildout against historical analogues such as the great railroad boom, arguing the pattern of overbuilding, correction, and eventual consolidation tends to repeat. He sees memory (especially high-bandwidth memory) and the broader semiconductor supply chain as the real bottleneck and the place where pricing power and value concentrate. He has also argued that software architecture itself must change to match new memory hierarchies, and he takes seriously the social consequences of an AI-driven productivity jump, including the risk of a durable underclass. Over a 10-to-20-year horizon his framing is cyclical and physics-grounded: booms get overbuilt, hardware constraints bind, and the winners are whoever controls the scarce parts of the stack.

### Notable recent work (2025 to 2026)
- "2026 AI & Semiconductor Outlook" (Jan 7, 2026), https://www.fabricatedknowledge.com/p/2026-ai-and-semiconductor-outlook
  His marquee annual forward-look at chips and AI hardware for the year ahead, described as a bit different in format this time. The best single read for his current base case on where semiconductors and AI infrastructure are heading.
- "Engels' Pause and the Permanent Underclass" (Apr 15, 2026), https://www.fabricatedknowledge.com/p/mythos-and-engels-pause
  A macro and social essay borrowing the "Engels' Pause" idea from the Industrial Revolution to ask whether an AI productivity surge could create a first permanent underclass. Connects the hardware-driven boom to its possible labor and distributional consequences.
- "The Death of Software 2.0 (A Better Analogy!)" (Jan 16, 2026), https://www.fabricatedknowledge.com/p/the-death-of-software-20-a-better
  Argues that memory hierarchies are the right analogy for how software must restructure in the AI era. Makes the case that the way data is stored and moved, not just model size, will reshape how software is built.
- "Lessons from History: The Great Railroad Buildout" (Dec 17, 2025), https://www.fabricatedknowledge.com/p/lessons-from-history-the-great-railroad
  Uses the 19th-century railroad boom as a template for the AI infrastructure buildout, with the caveat that historical analogies are always strained. Implies the current cycle is prone to overbuilding followed by a painful but survivable shakeout.
- "Where We Go From Here" (Oct 2, 2025), https://www.fabricatedknowledge.com/p/where-we-go-from-here
  A sober look at the potential trajectory of an AI hardware bubble, written near a market turning point. Lays out how a correction could unfold and what would have to be true for the boom to continue.

### Hooks for the brain
- The go-to feed for the "AI is a hardware and supply-chain story" and "compute/memory is the real bottleneck" theses. Use it whenever a future scenario rests on chips, fabrication capacity, or high-bandwidth memory holding up.
- Strong counter-cyclical voice: the railroad and Engels' Pause essays feed the "what if the AI buildout overbuilds and corrects" scenario, plus the labor-displacement and inequality theses. Useful as a bear or base-case ballast against pure-hype sources.
- Invest angle: O'Laughlin writes explicitly for investors and ranks the semiconductor value chain by who has pricing power. Hidden-player signal: he surfaces memory makers, equipment and component suppliers, and names like Unitree (robotics) and Cisco (AI datacenter networking) via his interviews, pointing past the obvious GPU headline names. He is also President of SemiAnalysis, so this source pairs with that deeper paid research shop.

---

## 133. Contrary Research

#source
Domain: Scenarios, forecasts and thematic research
Verified: June 2026

### What it is
Contrary Research is the open research arm of venture firm Contrary, publishing business breakdowns of private and emerging technology companies, deep-dive industry essays, and an annual Tech Trends Report.

### Access
- URL: https://research.contrary.com/
- RSS / feeds / newsletter: Free weekly email newsletter, the "Research Rundown," delivered Saturdays via Substack at https://contraryresearch.substack.com/ (Substack RSS at https://contraryresearch.substack.com/feed). Company memos and essays are browsable on the main site.
- Paywall: No. Company memos, the "Foundations & Frontiers" essay series, and the newsletter are free. The annual Tech Trends Report is delivered free to newsletter subscribers.
- Format: Structured company memos ("Business Breakdown & Founding Story"), long essays, a 300-plus-slide annual trends deck, and a podcast ("Conversations").

### What it argues about the future
Contrary's premise is that the most consequential technology companies of the next decade are still private, so understanding them early is how you see the future before it is priced in. Its annual Tech Trends Report organizes the world into a handful of frontiers, with the 2026 edition grouped around Computational Intelligence, Resources, Industrialization, Medicine & Healthcare, and Digital Interfaces & Experiences. The throughline is that AI is real but under-deployed (only about 10 percent of companies had embedded it in products as of mid-2025 and most CEOs report no clear ROI yet), while the supporting build-out is enormous: data-center capacity demand is projected to grow several times over by 2030, compute is the binding constraint, and a small set of coding agents are racing toward billion-dollar revenue. Beyond AI, the firm tracks energy, space, defense, longevity, and biotech as frontiers where private companies are reshaping physical industries. Over a 10-to-20-year horizon, Contrary's view is that intelligence, energy, and industrial capacity are the contested foundations and that today's private leaders become tomorrow's incumbents.

### Notable recent work (2025 to 2026)
- "Contrary's 2026 Tech Trends Report" (announced early 2026), https://research.contrary.com/tech-trends-report
  A 300-plus-slide annual report on 14 of the most important trends reshaping the world, grouped into five frontiers. Headline data points include AI being adopted by only about 10 percent of companies as of May 2025, data-center demand projected to grow roughly 3.5x from 2025 to 2030, and four coding agents nearing 1 billion dollars in annual recurring revenue. The single best artifact for Contrary's cross-sector future map.
- "The Anduril Thesis" (Apr 29, 2026), https://contraryresearch.substack.com/p/the-anduril-thesis
  Announced as the first full-length book published by Contrary Research, a deep argument for the defense-technology company Anduril. Signals Contrary's conviction that next-generation defense primes are a defining private-company story of the era.
- "The American Missile Crisis" (May 27, 2026), https://contraryresearch.substack.com/p/the-american-missile-crisis
  A deep dive on rethinking the US missile supply chain and why it has become a strategic weak point. Connects defense-industrial capacity to the broader re-industrialization theme.
- "Mapping the Shadow Grid" (May 8, 2026), https://contraryresearch.substack.com/p/mapping-the-shadow-grid
  An investigation of the rise of behind-the-meter power for AI data centers, the privately built electricity infrastructure springing up to feed compute. Ties the AI buildout directly to the energy bottleneck.
- "The Anti-Aging Therapeutics Boom" (Jun 8, 2026), https://contraryresearch.substack.com/p/the-anti-aging-therapeutics-boom
  A deep dive on therapies designed to slow, stop, or reverse aging, and the companies commercializing them. Represents Contrary's longevity and biotech frontier coverage.

### Hooks for the brain
- Best feed for "the future is being built by private companies you cannot buy yet" and for breadth across frontiers (AI, compute, energy, defense, space, longevity, biotech). Use the annual Tech Trends Report as a cross-sector index of where to look.
- Directly feeds the compute-bottleneck and AI-energy theses (behind-the-meter power, data-center demand growth) and the re-industrialization and defense-tech theses (Anduril, missile supply chain). The "AI is under-deployed despite the hype" data point is a useful reality check on adoption-curve optimism.
- Invest angle: this is private-market intelligence from a working VC, so it is the strongest of these four for surfacing pre-IPO and emerging names before they are public. Hidden-player signal: company memos cover specific private firms (Anduril, Anthropic, Cartesia, Cerebras, Retro Biosciences, NewLimit, Periodic Labs, Luminance and many more), making it a running watchlist of future incumbents. Pair the free memos with the Saturday Research Rundown to track newly published names.

---

## 134. The Generalist

#source
Domain: Scenarios, forecasts and thematic research
Verified: June 2026

### What it is
Mario Gabriele's long-form research publication on the people, companies, and technologies shaping the future, built around deep dives on private tech firms, founders, and venture investors. Reads like equity research crossed with narrative essay, with a strong forward-looking, thesis-driven bent.

### Access
- URL: https://www.generalist.com/
- RSS / feeds / newsletter: Email newsletter via Substack (over 165,000 subscribers). Substack provides an RSS feed (typically the publication URL with /feed appended). Also distributed as a podcast on Apple Podcasts and Spotify.
- Paywall: partial. Many essays and the headline "free" pieces are open; the deepest company breakdowns and the full archive sit behind a paid subscription (reported around $22/month or $220/year).
- Format: Long-form written essays and reports, plus an audio podcast version. Recurring franchises include company deep dives, the annual "What to Watch" watchlist, the "Future 50" list of rising startups, and the "Generalist Intelligence" AI series.

### What it argues or forecasts about the future
Gabriele's core stance is that the next decade will be defined by a handful of category-defining private companies and the concentrated investors backing them, well before those firms reach public markets. He treats founders and frontier startups (AI labs, defense tech, payments, space) as the leading indicators of where technology and capital are heading, and writes to help readers form an investment-grade view years ahead of consensus. Recent work pushes hard on the idea that AI is reshaping both how companies are built (smaller teams, code largely written by AI) and how they should be valued.

### Notable recent work (2025 to 2026)
- "Introducing Generalist Intelligence" (June 2026), https://www.generalist.com/p/introducing-generalist-intelligence
  Launches a dedicated AI franchise and examines the looming public-market debuts of SpaceX, OpenAI, and Anthropic and whether their enormous valuations are justified. Cites Anthropic's claim that over 80% of merged code is written by Claude and that engineers ship roughly 8x more code per quarter, using it as evidence that AI is collapsing the cost and headcount of building software.
- "What to Watch in 2026" (January 2026), https://www.generalist.com/p/what-to-watch-in-2026
  Annual forward-looking watchlist of the companies, funding rounds, and themes Gabriele expects to dominate the year, including frontier AI labs raising at very large valuations. Functions as a concentrated set of predictions about which private firms and trends will matter most over the next twelve months.
- "The Future 50 is here" (2025), https://www.generalist.com/p/future-50-2025
  Curated list of fifty early and growth-stage startups Gabriele identifies as most likely to become the defining companies of the coming cycle. Serves as a scouting map of emerging players across AI, fintech, defense, and other frontier categories before they hit mainstream awareness.
- "Stripe: Thinking Like a Civilization" (March 2025), https://www.generalist.com/p/stripe-thinking-like-a-civilization
  Deep dive into Stripe's culture, long-horizon strategy, and ambition to act as foundational economic infrastructure rather than a payments vendor. Uses Stripe as a case study in how a privately held company plans across decades and what that implies for its eventual market position.
- "No Rivals: The Prophet (Part I)" (July 2025), https://www.generalist.com/p/founders-fund-1
  Multi-part history and analysis of Founders Fund and its concentrated, contrarian bets on companies such as SpaceX, Anduril, and Stripe. Explores how a single investor's worldview shapes which frontier technologies get capital, and therefore which futures get built.

### Hooks for the brain
- Feeds the "concentrated winners" and "private markets as leading indicator" theses: which firms are likely to dominate the next 10 to 20 years before they go public.
- Strong primary feed for the AI labs trajectory (OpenAI, Anthropic) and for AI changing how software gets built (smaller teams, AI-written code), pair with McKinsey MGI and Gartner for the macro counterpart.
- Use the annual "What to Watch" and "Future 50" pieces as a recurring scouting layer for emerging companies and themes to track over time.
- Best for narrative depth and founder-level reasoning; weaker on broad statistical forecasting, so triangulate hard numbers against WEF and McKinsey.

---

## 135. World Economic Forum

#source
Domain: Scenarios, forecasts and thematic research
Verified: June 2026

### What it is
The World Economic Forum is a Geneva-based institution that publishes large, survey-driven global foresight reports on the economy, jobs, risks, and technology. Its flagship series, the Future of Jobs Report and the Global Risks Report, are widely cited benchmarks for how business and policy leaders expect the world to change.

### Access
- URL: https://www.weforum.org/publications/
- RSS / feeds / newsletter: Email newsletters (subscribe via weforum.org), plus press-release alerts, Radio Davos and other podcasts, and an active "Forum stories" / Agenda feed. Reports are downloadable as free PDFs at reports.weforum.org.
- Paywall: no. Reports, executive summaries, and key-findings pages are published free; full data behind some indices may require partner access but the core reports are open.
- Format: In-depth PDF insight reports (often 100+ pages) backed by large expert and employer surveys, plus online readers, key-findings digests, infographics, press releases, and companion articles.

### What it argues or forecasts about the future
WEF frames the late 2020s as an "age of competition" and disorder, where geopolitics, technology, demographics, and the green transition jointly reshape economies and labour markets. Its Future of Jobs work argues that AI and automation will displace tens of millions of roles while creating more new ones, making large-scale reskilling the central challenge of the decade. Its Global Risks work tracks how short-term shocks (geoeconomic confrontation, conflict, misinformation) sit alongside longer-term structural risks (environmental degradation as the dominant 10-year threat). The methodology is consensus-of-experts: aggregating thousands of survey responses from employers, economists, and risk specialists into ranked, time-horizoned outlooks.

### Notable recent work (2025 to 2026)
- "The Global Risks Report 2026" (January 2026), https://www.weforum.org/publications/global-risks-report-2026/
  Draws on the Global Risks Perception Survey of over 1,200 experts and finds the world in an "age of competition" defined by fragmentation. Geoeconomic confrontation ranks as the top risk most likely to trigger a global crisis in 2026, ahead of state-based armed conflict, while extreme weather and other environmental risks dominate the ten-year horizon.
- "The Future of Jobs Report 2025" (January 2025), https://www.weforum.org/publications/the-future-of-jobs-report-2025/
  Surveys over 1,000 employers representing more than 14 million workers across 55 economies. Projects 170 million new jobs created and 92 million displaced by 2030 (net +78 million), with around 39% of current skills changing and AI, big data, and cybersecurity skills rising fastest.
- "Top 10 Emerging Technologies of 2026" (June 2026), https://www.weforum.org/publications/top-10-emerging-technologies-of-2026/
  The 14th edition of an annual scan, produced with Frontiers, identifying scientific advances across energy, materials, health, and computing that are moving from research into real-world deployment within three to five years. Each technology is paired with a strategic outlook (developed with the Dubai Future Foundation) on what is needed to scale it responsibly.
- "Artificial Intelligence and the Future of Entry-Level Work" (June 2026), https://www.weforum.org/publications/artificial-intelligence-and-the-future-of-entry-level-work-a-framework-for-safeguarding-and-reinventing-early-career-pathways/
  Argues AI is reshaping hiring and advancement most visibly at the entry level, with more than one in three young workers in occupations facing medium-to-high exposure to AI-driven task change. Offers a framework for protecting and redesigning early-career pathways to preserve workforce participation and economic mobility.
- "Global Cybersecurity Outlook 2026" (2026), https://www.weforum.org/publications/global-cybersecurity-outlook-2026/
  Latest edition of the annual outlook on cybersecurity trends expected to affect economies and societies in the year ahead, increasingly centered on AI-driven threats and defenses. Tracks the widening gap between organizations that are cyber-resilient and those that are not.

### Hooks for the brain
- Anchor source for "future of work" theses: hard, survey-based numbers on job displacement, creation, and the reskilling gap to 2030, pair with McKinsey MGI for the productivity/economics angle.
- Global Risks Report is the canonical map of what could go wrong over 2-year and 10-year horizons (geopolitics now, environment later); use it to stress-test optimistic technology scenarios.
- Top 10 Emerging Technologies gives a vetted, near-term (3-5 year) watchlist of science moving into deployment, feeds the "what tech actually arrives next" layer.
- Best treated as the institutional consensus view; useful as a baseline to compare against more contrarian sources like The Generalist.

---

## 136. McKinsey Global Institute

#source
Domain: Scenarios, forecasts and thematic research
Verified: June 2026

### What it is
The McKinsey Global Institute (MGI) is McKinsey & Company's economics and business research arm, producing data-heavy reports on productivity, technology, automation, global trade, demographics, and the future of work. Its research is widely cited for quantified estimates of how AI and automation will reshape labour and the economy.

### Access
- URL: https://www.mckinsey.com/mgi/overview
- RSS / feeds / newsletter: McKinsey email newsletters and alerts (subscribe via mckinsey.com), plus podcasts and a LinkedIn/social presence. No prominent standalone MGI RSS feed; distribution is mainly via the McKinsey Insights site and newsletters.
- Paywall: no. Reports, executive summaries, articles, and "in charts" pieces are published free; downloadable PDFs are available without subscription.
- Format: Long research reports and books, shorter web articles, data-visualization ("in charts") pieces, and interactive content. Research is grouped into five themes: productivity and prosperity, global connections, technology and markets of the future, resources of the world, and human potential.

### What it argues or forecasts about the future
MGI's central message for the late 2020s is that the world has moved from the cusp of a new era into the era itself, where AI, demographics, and shifting trade define growth. On work, it argues the future is a "partnership between people, agents, and robots," with currently demonstrated AI able to perform tasks occupying about 44% of US work hours and robots about 13%, while more than 70% of human skills stay relevant but get redeployed. It frames automation as a productivity and value-creation opportunity (around $2.9 trillion of US value by 2030 if workflows are redesigned) rather than a simple job-loss story. In parallel, it warns that falling fertility is pushing major economies toward demographic and fiscal strain, that global trade is reorganizing along geopolitical lines, and that productivity acceleration led by a few "Standout" firms is the key lever for prosperity.

### Notable recent work (2025 to 2026)
- "Agents, Robots, and Us: Skill Partnerships in the Age of AI" (2025), https://www.mckinsey.com/mgi/our-research/agents-robots-and-us-skill-partnerships-in-the-age-of-ai
  Argues the future workforce will combine people, AI agents, and robots, estimating agents could perform tasks covering 44% of US work hours and robots 13%. Frames this not as a job-loss forecast but as a redesign opportunity that could unlock roughly $2.9 trillion of US economic value by 2030 if organizations rebuild workflows rather than automate isolated tasks.
- "Dependency and Depopulation: Confronting the Consequences of a New Demographic Reality" (2025), https://www.mckinsey.com/mgi/our-research/dependency-and-depopulation-confronting-the-consequences-of-a-new-demographic-reality
  Warns that falling fertility is moving major economies toward population decline this century, with working-age shares already peaking in developed economies and Greater China. Identifies three levers to sustain growth and public finances: higher employment, faster productivity growth, and effective migration, arguing they must be combined.
- "The Power of One: How Standout Firms Grow National Productivity" (2025), https://www.mckinsey.com/mgi/our-research/the-power-of-one-how-standout-firms-grow-national-productivity
  Finds that fewer than 100 of 8,300 large firms studied accounted for 63% of productivity growth in the three countries analyzed. Concludes that national productivity advances in sporadic bursts driven by a few bold "Standout" companies making strategic and portfolio moves, not gradual efficiency gains spread across many firms.
- "Out of Balance: What's Next for Growth, Wealth, and Debt" (2025), https://www.mckinsey.com/mgi/our-research/out-of-balance-whats-next-for-growth-wealth-and-debt
  Builds a "global balance sheet" of the world's assets and liabilities and finds much recent wealth growth came from asset-price appreciation and debt rather than new investment. Notes households gained roughly $400 trillion in wealth between 2000 and 2024, but only about $100 trillion reflected net new investment, raising questions about the durability of paper wealth.
- "A Century of Plenty: A Story of Progress for Generations to Come" (book, January 2026), https://www.mckinsey.com/mgi/our-research/a-century-of-plenty
  Stress-tests an optimistic long-range scenario in which, by 2100, even the poorest countries could reach the prosperity of today's Switzerland. Concludes the world can secure enough energy, food, metals, and minerals and innovate fast enough while protecting the planet, but only with a deliberate, growth-oriented mindset.

### Hooks for the brain
- Primary quantified source for the automation/future-of-work thesis: percentage of work hours automatable, the people-agents-robots model, and the value at stake, pair with WEF Future of Jobs for the survey-based counterpart.
- Feeds the demographics-as-destiny thesis (depopulation, dependency ratios, migration) that constrains long-run growth scenarios.
- "Technology and markets of the future" theme (arenas of competition, the FDI shake-up, trade rearrangement) maps where economic value and industrial leadership will concentrate over 10 to 20 years.
- Use the annual "in charts" recap as a fast index into the year's MGI research; treat MGI as the rigorous economics layer beneath more narrative sources.

---

## 137. Gartner

#source
Domain: Scenarios, forecasts and thematic research
Verified: June 2026

### What it is
Gartner is a technology research and advisory firm known for structured forecasting tools: the Hype Cycle (which plots emerging tech against expectations over time), the annual Top Strategic Technology Trends, and dated, probability-style predictions for IT and business. Its frameworks are a default reference for how enterprises plan technology adoption.

### Access
- URL: https://www.gartner.com/en/information-technology/topics/technology-trends
- RSS / feeds / newsletter: Industry newsletters (subscribe via gartner.com/en/industry-newsletters), the ThinkCast podcast, and an active newsroom/press-release stream. No prominent public RSS feed; free insights are surfaced through the Newsroom and Insights sections.
- Paywall: partial. Headline trend lists, predictions, and many "Insights" articles and press releases are free; the underlying Special Reports, full Hype Cycles, and Magic Quadrants sit behind a paid client subscription.
- Format: Annual trend reports and predictions, Hype Cycle graphics by topic, Magic Quadrant vendor assessments, press releases tied to Gartner IT Symposium/Xpo, plus webinars and podcasts. Predictions are typically stated as a probability or share by a named year (for example, "by 2030, X% will...").

### What it argues or forecasts about the future
Gartner's through-line for 2026 is that AI is no longer optional and that disruption is accelerating faster than in any prior year, forcing organizations to build resilient AI-native foundations, orchestrate intelligent systems, and defend digital trust. It groups its 2026 trends into three layers: a foundation layer (AI supercomputing, AI-native development, confidential computing), an orchestration layer (multiagent systems, physical AI), and a security and trust layer (preemptive cybersecurity, digital provenance, AI security platforms, geopatriation). A recurring argument is that AI's influence is underestimated and "insidious," reshaping decisions and strategy quietly, while agentic AI sits at the peak of inflated expectations with real enterprise deployment still early. Many forecasts point to smaller AI-augmented teams, sovereign/regional computing to manage geopolitical risk, and a shift from reactive to preemptive security.

### Notable recent work (2025 to 2026)
- "Gartner Identifies the Top Strategic Technology Trends for 2026" (October 20, 2025), https://www.gartner.com/en/newsroom/press-releases/2025-10-20-gartner-identifies-the-top-strategic-technology-trends-for-2026
  Names ten trends across foundation, orchestration, and security layers, including AI supercomputing platforms, multiagent systems, domain-specific language models, physical AI, preemptive cybersecurity, and geopatriation. Predicts, among other things, that by 2030 AI-native development will push 80% of organizations to shift from large engineering teams to smaller AI-augmented ones, and that over 75% of European and Middle Eastern enterprises will geopatriate workloads to reduce geopolitical risk.
- "Strategic Predictions for 2026: How AI's Underestimated Influence Is Reshaping Business" (October 2025), https://www.gartner.com/en/articles/strategic-predictions-for-2026
  Organizes top predictions around talent, sovereignty, and "insidious" AI, arguing leaders underestimate how quickly AI is embedding into decisions. Headline calls include critical-thinking atrophy from GenAI pushing 50% of organizations to require "AI-free" skills assessments through 2026, and "death by AI" legal claims exceeding 2,000 by end of 2026.
- "Gartner Unveils Top Predictions for IT Organizations and Users in 2026 and Beyond" (October 21, 2025), https://www.gartner.com/en/newsroom/press-releases/2025-10-21-gartner-unveils-top-predictions-for-it-organizations-and-users-in-2026-and-beyond
  The companion press release to the strategic predictions, presenting dated, probability-style forecasts on how AI will reshape IT operations and the workforce. Includes the prediction that through 2027, GenAI and AI agents will create the first true challenge in 35 years to mainstream productivity tools, prompting a roughly $58 billion market shake-up.
- "Hype Cycle for Agentic AI, 2026" (2026), https://www.gartner.com/en/articles/hype-cycle-for-agentic-ai
  Places agentic AI at the Peak of Inflated Expectations, noting only about 17% of organizations had deployed AI agents while more than 60% expect to within two years. Cautions that most deployments are narrowly scoped and that fully autonomous agents are not yet ready for the majority of enterprise use cases.
- "Gartner Predicts 40% of Enterprise Apps Will Feature Task-Specific AI Agents by 2026" (August 26, 2025), https://www.gartner.com/en/newsroom/press-releases/2025-08-26-gartner-predicts-40-percent-of-enterprise-apps-will-feature-task-specific-ai-agents-by-2026-up-from-less-than-5-percent-in-2025
  Forecasts a jump in enterprise applications embedding task-specific AI agents from under 5% in 2025 to 40% by the end of 2026. Signals Gartner's view that agentic functionality moves quickly from novelty to standard feature inside business software.

### Hooks for the brain
- Best source for the "technology adoption curve" framing: use the Hype Cycle to gauge how close a given technology (agentic AI, physical AI) is to real deployment versus inflated hype.
- Dated predictions (by-year, with percentages) are useful as concrete, checkable milestones for AI-in-the-enterprise, sovereignty/geopatriation, and cybersecurity theses, note these are enterprise-IT forecasts, so weight accordingly.
- The 2026 three-layer trend taxonomy (foundation, orchestration, security/trust) is a clean scaffold for organizing where enterprise technology is heading over the next 5 years.
- Pair with The Generalist (company-level), WEF (macro/jobs/risk), and McKinsey MGI (economics) to balance Gartner's vendor- and CIO-oriented lens.

---

## 138. Lux Capital / Riskgaming

#source
Domain: Scenarios, forecasts and thematic research
Verified: June 2026

### What it is
The media and scenario arm of deep-tech venture firm Lux Capital, led by partner Danny Crichton: the "Riskgaming" newsletter (formerly "Securities"), a weekly podcast, and strategic role-play games on frontier tech, finance and geopolitics.

### Access
- URL: https://www.riskgaming.com (firm: https://www.luxcapital.com ; scenarios hub: https://www.luxcapital.com/riskgaming)
- RSS / feeds / newsletter: Substack newsletter with free and paid tiers; RSS at https://www.riskgaming.com/feed . Podcast on Apple Podcasts and Spotify (show id 1615629580). Weekly "Lux Recommends" roundup plus longer dispatches.
- Paywall: partial. Most essays, the podcast and the weekly recommends are free; some posts and the deeper scenario kits are gated for paid subscribers or institutional partners.
- Format: longform essays and dispatches, audio interviews, and physical/print "Riskgaming" strategy scenarios run as live events.

### What it argues or forecasts about the future
Riskgaming treats the future as a set of contested, high-stakes scenarios rather than a single forecast. Its lens sits at the intersection of science, technology, finance and the human condition, with heavy attention to US-China technology competition, semiconductors, rare earths and critical minerals, defense tech, biotech, AI and the geopolitics of compute and energy. The core conviction is that the next two decades are defined by great-power technology rivalry and cascading "tail risks," and that leaders should rehearse hard tradeoffs through gameplay and adversarial thinking before the real decisions arrive. Crichton and co-author Laurence Pevsner consistently probe how frontier tools reshape institutions, trust and power, not just markets.

### Notable recent work (2025 to 2026)
- "The uncanny valley of ability" (Apr 16, 2026), https://www.riskgaming.com/p/the-uncanny-valley-of-ability
  Uses 30 years of chess against engines to argue that writing, art, code and academia entered the same "uncanny valley" around 2023, where AI is good enough to make human performance unverifiable. The danger is less that creative work disappears and more the culture of suspicion, false accusations and broken trust that follows, with real human casualties. The future skill is adjudicating who gets hurt as fields cross this valley.
- "The anodyne bonhomie of Hill and Valley will soon be a relic" (Mar 26, 2026), https://www.riskgaming.com/p/the-anodyne-bonhomie-of-hill-and
  Argues the comfortable alliance between Washington ("the Hill") and Silicon Valley is ending as populist politics turns on big tech. Frames a coming era of friction between policymakers and technologists that will reshape regulation, defense procurement and the politics of AI. A forward read on the political risk landscape facing frontier-tech firms.
- "Are social sciences dead in the agentic age?" (Feb 24, 2026), https://www.riskgaming.com/p/are-social-sciences-dead-in-the-agentic
  Examines whether AI agents that can simulate human behavior at scale displace traditional social-science methods like surveys and field studies. Weighs the promise of cheap synthetic populations against the epistemic risk of mistaking model outputs for reality. Relevant to how research, polling and forecasting itself get rebuilt over the next decade.
- "GPT-5.4 plays Riskgaming like Machiavelli" (Mar 18, 2026), https://www.riskgaming.com/p/gpt-54-plays-riskgaming-like-machiavelli
  Reports on putting a frontier model through Lux's own geopolitical strategy scenarios and finding it negotiates with cold, Machiavellian competence. Treats the game as a stress test for how agentic AI might behave in real strategic and diplomatic settings. A concrete window into AI decision-making under adversarial conditions.
- "Lux Recommends #500 ... and done" (May 29, 2026), https://www.riskgaming.com/p/lux-recommends-500-and-done
  The 500th and final installment of the weekly curation feature, a running index of the frontier-science, biology, complexity and geopolitics reading that shapes the firm's worldview. Useful as a long-running signal of which themes Lux considers worth tracking. Marks a format change in the newsletter.

### Hooks for the brain
- Feeds the "great-power tech rivalry" and "decoupling/critical minerals" theses: best single source for US-China semiconductor, rare-earth and defense-tech scenario thinking framed for decision-makers.
- Feeds "agentic AI reshapes trust and institutions": the uncanny-valley and agentic-age essays are sharp inputs on verification crises, synthetic populations and AI in strategy.
- Use the Riskgaming scenarios and podcast as a source of provocative, well-argued contrarian framings; pair its venture-insider read with the more neutral RAND and data-driven CB Insights sources to triangulate.

---

## 139. CB Insights

#source
Domain: Scenarios, forecasts and thematic research
Verified: June 2026

### What it is
A market-intelligence platform that uses proprietary data on private companies, funding and patents to research startups, venture trends and emerging technology, best known for its annual tech-trend reports and "State of" venture briefings.

### Access
- URL: https://www.cbinsights.com ; research library: https://www.cbinsights.com/research/
- RSS / feeds / newsletter: free email newsletter ("CB Insights newsletter," sign-up on site); regular free webinars/briefings; data also available via API, Snowflake, and an MCP server. No public RSS prominently surfaced, but research is indexed and emailed.
- Paywall: partial. Many reports show free summaries, key takeaways, charts and methodology on the open web; the full datasets, company lists and "books of scouting reports" are gated behind a free trial, lead-capture form, or paid subscription.
- Format: data-driven reports, market maps, "State of Venture/Fintech/Insurtech" quarterly briefings, research briefs, and webinars, heavy on charts and predictive scores (Mosaic, Commercial Maturity).

### What it argues or forecasts about the future
CB Insights forecasts where technology and capital are heading by reading signals in private-market data: funding flows, business relationships, patents, hiring and its own predictive scores. Its through-line for 2025 to 2026 is that AI now dominates venture, with agentic AI and "physical AI" (robots, humanoids, industrial automation) as the defining frontiers, alongside autonomous/agentic commerce and payments, RNA and other biotech, and AI-era infrastructure for fraud, trust and data. Rather than a single grand thesis, it offers a continuously updated map of which companies and sub-sectors are most likely to have outsized impact over the next five to ten years, aimed at corporate strategy, M&A and venture decision-makers.

### Notable recent work (2025 to 2026)
- "AI 100: The most promising artificial intelligence startups of 2026" (2026), https://www.cbinsights.com/research/report/artificial-intelligence-top-startups-2026/
  The tenth annual ranking of the world's top emerging AI companies, selected by CB Insights' predictive signals across the infrastructure, enterprise and industry-application layers. Frames how AI is moving from horizontal models into vertical, decision-and-action systems. A standing benchmark for which AI bets the market considers most durable.
- "Future Tech Hotshots 2025: 45 emerging tech startups poised to make an outsized impact" (Oct 23, 2025), https://www.cbinsights.com/research/report/future-tech-hotshots-2025/
  Screens thousands of startups on momentum, team quality and exit potential to name 45 expected to matter most over 5 to 10 years. Finds the decisive bet is on agentic-AI infrastructure (testing, orchestration, master-data tools), with industrial AI showing the fastest-rising scores. Argues early enterprise partnerships create moats that are hard to displace.
- "State of Venture 2025" (2026), https://www.cbinsights.com/research/report/venture-trends-2025/
  Annual review showing venture funding rebounding to roughly $469B in 2025, the highest since 2022, with AI capturing close to half of all dollars and mega-rounds concentrating capital in a few names (OpenAI, Anthropic, Databricks, Stripe). Signals a barbell market where AI leaders soak up funding while the long tail struggles. The baseline dataset for reading near-term capital direction.
- "Y Combinator's Winter 2026 batch is its most technically complex cohort yet, and what it signals about physical AI" (2026), https://www.cbinsights.com/research/y-combinator-winter-2026/
  Analyzes all 199 companies in YC's Winter 2026 batch to surface trends in physical AI, AI-native services and the infrastructure beneath them. Reads the cohort as evidence that frontier startups are shifting from software-only toward robotics and hardware-grounded AI. A leading indicator of where the next founder generation is placing bets.
- "The interactive agentic commerce market map: June 2026 edition" (Jun 2026), https://www.cbinsights.com/research/report/the-interactive-agentic-commerce-market-map-june-2026-edition/
  Maps 170+ companies building the tooling for autonomous buying, from orchestration platforms to agentic payments. Tracks the emergence of an economy where AI agents transact on behalf of users and businesses. Useful for anyone forecasting how commerce, payments and marketing change when agents become the buyers.

### Hooks for the brain
- Feeds the "agentic AI and physical AI" thesis with hard private-market evidence: funding share, company lists and partnership data rather than opinion.
- Feeds "where capital is flowing" and "which sub-sectors compound": State of Venture and the market maps are the quantitative backbone for sizing emerging-tech momentum.
- Marketer-relevant angle: the agentic-commerce and fraud/trust maps preview how buying, payments and ad/trust infrastructure shift when AI agents act as customers. Use CB Insights data to ground the more narrative theses from Lux/Riskgaming and the policy framing from RAND.

---

## 140. RAND Corporation

#source
Domain: Scenarios, forecasts and thematic research
Verified: June 2026

### What it is
A nonprofit, nonpartisan policy-research institution that produces rigorous analysis on national security, AI, biotech, technology and long-range forecasting, and pioneered methods like the Delphi technique and Robust Decision Making.

### Access
- URL: https://www.rand.org ; technology hub: https://www.rand.org/topics/science-and-technology.html ; AI work via the Center on AI, Security, and Technology (CAST) at RAND Global and Emerging Risks.
- RSS / feeds / newsletter: free "Policy Currents" newsletter plus topic-specific newsletters (https://www.rand.org/newsletters.html); "Policy Minded" flagship podcast; reports also distributed via RSS and on the web.
- Paywall: no. Reports, commentary and expert insights are free to read and download as PDFs; only print copies are sold.
- Format: peer-reviewed research reports, shorter "expert insights"/perspectives, commentary, conference proceedings, scenario analyses and podcasts.

### What it argues or forecasts about the future
RAND does not push one forecast; it stress-tests how powerful technologies could reshape security, the economy and society over the coming decades and how policy should respond under deep uncertainty. Its 2025 to 2026 technology work centers on artificial general intelligence (forecasting timelines, scenario analysis, geopolitics and resilience), AI-and-biosecurity risk (how AI tools could lower barriers to biological weapons), US-China AI competition and open models, and concrete safeguards such as AI-incident response and resilience strategy. The recurring stance is that AI's trajectory is genuinely uncertain and contested, so the smartest public-policy goal is resilience: the capacity to withstand shocks, adapt and recover, rather than to bet on a single prediction or wait and see.

### Notable recent work (2025 to 2026)
- "Artificial General Intelligence Forecasting and Scenario Analysis: State of the Field, Methodological Gaps, and Strategic Implications" (2026), https://www.rand.org/pubs/research_reports/RRA4692-1.html
  Synthesizes the range of AGI forecasting methods, from prediction markets and compute-centric models to large expert surveys, to assess their reliability and explain why experts disagree. Notes central estimates have swung sharply, with compute-based models pointing to the 2030s while a recent expert survey medians around 2047. Offers a framework for decision-making under deep uncertainty rather than endorsing any one timeline.
- "Toward a Grand Strategy for AI Resilience" (Mar 25, 2026), https://www.rand.org/pubs/perspectives/PEA4525-1.html
  Argues that because expert views on AI's speed and risks diverge so widely, policy should make resilience, the ability to withstand, adapt and recover, the central goal across the economy, communities and national security. Draws lessons from engineering, psychology and ecology, and criticizes the "wait-and-see" default as a repeat of the failed hands-off approach to social media. A direct prescription for governing AI through the next two decades.
- "How Artificial General Intelligence Could Affect the Rise and Fall of Nations: Visions for Potential AGI Futures" (2025), https://www.rand.org/pubs/research_reports/RRA3034-2.html
  Explores scenarios in which AGI shifts the global balance of power, reshaping which nations rise or decline. Treats AGI as a potential strategic discontinuity on the scale of past general-purpose technologies. Useful for long-range geopolitical forecasting tied to frontier AI.
- "Internet Cutoff Switches as a Local Emergency Response for Damaging Artificial Intelligence Incidents" (Mar 25, 2026), https://www.rand.org/pubs/research_reports/RRA4718-2.html
  Examines whether a limited internet "cutoff switch" could contain a fast-spreading, damaging AI incident, and the tradeoffs of using one. Part of RAND's emerging-risks line on practical AI safeguards and incident response. Signals how seriously security researchers are treating catastrophic-AI containment.
- "Biosecurity Governance Across Uncertain Artificial Intelligence Futures" (2025), https://www.rand.org/pubs/conf_proceedings/CFA4186-1.html
  Proceedings from a RAND and Nuclear Threat Initiative side event at the 2025 AI Action Summit in Paris, on governing AI-enabled biology. Captures expert concern that the dual-use nature of AI biological tools could lower barriers to biological-weapon development or raise the ceiling of potential harm. A key input on the AI-bio risk frontier.

### Hooks for the brain
- Feeds the "AGI timelines and scenarios" thesis with the most methodologically careful, source-neutral treatment available: ideal counterweight to hype-driven or insider forecasts.
- Feeds "AI governance and resilience" and "catastrophic and bio risk": RAND is the go-to for serious policy framing on safeguards, incident response and AI-bio threats.
- Use RAND as the credibility anchor of the brain: pair its uncertainty-aware scenarios and security framing with CB Insights' market data and Lux/Riskgaming's venture-insider provocations to balance optimism, capital signals and risk.

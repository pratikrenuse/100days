# Latest Pull 2026-07-28

Window: July 18 to 28, 2026. Method: direct RSS fetch remains provenance-gated in this environment, so every item below was sourced via dated WebSearch against the Tier 1 roster topics plus this week's rotating Tier 2/3 slots (Hugging Face Blog, Google Research, Microsoft Research, Meta FAIR, Marcus on AI, Don't Worry About the Vase, Astral Codex Ten, Marginal Revolution, AI Supremacy), with two direct fetches that cleared provenance (SemiAnalysis, TechTimes). Filter applied: does it move a thesis, what does it imply in 10 to 20 years, which hidden player does it point to.

## Kept (moves a thesis)

### 1. Nvidia weighs a ~$250B credit backstop so OpenAI can lease a 10 GW campus in Ohio (July 27, new hidden player)
- Nvidia is in talks to provide roughly $250B in financing support so OpenAI can lease a planned 10 GW data-center campus in Piketon, Ohio, on the site of a decommissioned uranium-enrichment plant about 50 miles south of Columbus.
- The developer and owner is SB Energy, SoftBank's US energy arm. OpenAI would be the tenant. Full build-out is 10 GW of data-center capacity alongside 9.2 GW of on-site natural gas generation. Total cost including chips could exceed $500B, the largest data-center project announced to date.
- The mechanism named in the reporting: OpenAI may lack an investment-grade credit rating, so SB Energy borrows against Nvidia's credit instead of OpenAI's. A parallel talk covers Nvidia helping fund OpenAI's chip purchases, reported as up to $350B.
- First phase is roughly 800 MW, targeted for 2028, contingent on financing, generation and transmission.
- Why on-site generation at all: US large-power-transformer lead times now average roughly 128 weeks, with high-capacity units quoted at four to five years, and medium-voltage switchgear is sold out through 2028 in many channels. Grid connection is the slow path; building your own is the fast one. (Build.inc, POWER Magazine, pv magazine USA, 2026; standing context, not this week's news)
- Sources: Wall Street Journal via Qz, Al Jazeera, ABC6, TechTimes, WinBuzzer (all July 27, 2026). Treat as reported, not signed.
- Moves: [[Energy is the Ceiling]] and [[Compute and Resources Become Geopolitics]]. New player note created: SB Energy.

### 2. GE Vernova Q2: the turbine backlog got bigger, not smaller (July 22)
- Orders $24.2B, up 88% year over year. Total backlog a record $176B, up $13.0B sequentially across equipment and services.
- Gas Power equipment backlog plus slot reservation agreements went from 100 GW to 116 GW, with the company guiding to at least 125 GW by year-end 2026. That is above the "at least 110 GW" guide from June.
- Revenue $11.1B, up 22%. Free cash flow $5.1B in the quarter, more than all of 2025. 2026 revenue guidance raised to $45.5B to $46.5B, free cash flow to $11.5B to $12.5B. Management says backlog is on track for $200B in 2027.
- Sources: GE Vernova press release and 8-K (July 22, 2026), Benzinga transcript, Investing.com transcript, Yahoo Finance.
- Moves: [[Energy is the Ceiling]]. This is the direct answer to last week's tripwire: no SMR-driven softening. The turbine chokepoint tightened.

### 3. Oklo's Groves reactor receives DOE startup authorization (July 23)
- The US Department of Energy granted startup authorization for the Groves Isotope Test Reactor in Texas on July 23, 2026, following the final safety analysis approval on July 1. First criticality was still targeted for July as of this pull.
- Groundbreaking September 2025 to startup authorization July 23, 2026: just over ten months. First advanced reactor to clear a Documented Safety Analysis while sitting on privately owned land and running entirely on commercially sourced fuel and equipment.
- Sources: Oklo newsroom (July 23, 2026), Interesting Engineering, Sahm Capital, Foreign Policy Journal.
- Moves: [[Energy is the Ceiling]]. Player: [[Oklo]] updated.

### 4. Etched raises $300M at a $10.3B valuation for a chip that runs only one kind of model (July 23, new hidden player)
- Series C led by Sequoia at $10.3B post, with a16z, Jane Street, SK Hynix and Diffusion participating. Highest valuation ever for a Sequoia-led Series C.
- The company was valued at $5B in December 2025 on a $500M round. The valuation roughly doubled in about seven months.
- The product, Sohu, is a transformer-only ASIC on TSMC's 4nm process. Company claims roughly 20x inference speedup versus Nvidia's H100. Around $1B of prospective customer demand reported. 400 employees, an 80,000 sq ft California facility and a Taiwan factory being scaled.
- Sources: TechCrunch (July 23, 2026), Yahoo Finance, The Next Web, MLQ, Startup Fortune. Performance figures are company claims, no third-party benchmark.
- Moves: [[The Bottleneck Slides Down the Stack]]. New player note created: Etched.

### 5. AMD and Cerebras split one inference job across two different machines (July 23, new hidden player)
- AMD and Cerebras announced a disaggregated AI inference solution pairing AMD Helios rack-scale systems with the Cerebras Wafer-Scale Engine: AMD Instinct GPUs handle the high-throughput prompt-processing stage, the Cerebras engine handles low-latency token generation.
- Modelled benefit: up to 5x higher tokens per second per watt versus a Cerebras-only configuration (AMD/Cerebras modelling conducted July 2026, not independently measured). Cerebras will deploy AMD Helios in its own data centers; the joint offering arrives first through Cerebras Cloud in H2 2026.
- Sources: AMD newsroom, Cerebras press release, GlobeNewswire, Axios, HPCwire (all July 23, 2026).
- Moves: [[The Bottleneck Slides Down the Stack]]. New player note created: Cerebras.

### 6. Humanoid raises $152M at $1.35B, and its investors are also its customer and its factory (July 21, new hidden player)
- London-based Humanoid (incorporated as SKL Robotics Ltd. in 2024) announced a $152M Series A at $1.35B post-money on July 21, 2026, led by Prime Movers Lab, with Schaeffler, Bosch, Fubon Financial Holding Venture Capital and Aglaé Ventures participating. Total raised to date $270M.
- Schaeffler is investor, anchor customer and preferred actuator supplier at once. A binding phased agreement signed May 13, 2026 targets a four-digit fleet of wheeled robots across Schaeffler's global plants by 2032, with the first deployment phase December 2026 to June 2027 at Herzogenaurach (box handling in live production) and Schweinfurt (six-month continuous-operation validation). Schaeffler also covers more than 50% of Humanoid's joint-actuator demand for wheeled platforms through 2031, described as a seven-digit number of actuators.
- Bosch is investor and contract manufacturer through Robert Bosch Robotics GmbH, with capacity earmarked for up to 100,000 units over five years, following a completed proof of concept at a Bosch intralogistics site in Bühl, Germany.
- The product, HMND 01 Alpha, is a wheeled dual-armed manipulator: 220 cm tall, 7.2 km/h, 15 kg payload, ~29 degrees of freedom, running on Nvidia Jetson Thor. Wheels were chosen deliberately: bipedal balance eats compute and complicates CE certification, which Humanoid targets for 2027.
- Context figures: actuators are an estimated 40% to 60% of a humanoid's bill of materials. IDC projects wheeled humanoids growing at roughly 120% CAGR versus roughly 95% for bipeds. Global robotics companies have raised $55.8B in 2026 so far, nearly double all of 2025. Humanoid self-reports 34,000 pre-orders worth ~$2.4B, unverified.
- Sources: Humanoid/BusinessWire (July 21 and 23, 2026), Forbes (July 21), Tech.eu (July 21), TechTimes (July 24), The Robot Report, The Next Web.
- Moves: [[The Physical World Gets Automated]]. New player note created: Humanoid.

### 7. Samsung Heavy and Sargent and Lundy sign an MOU for a reactor-agnostic floating nuclear platform (July 21, new hidden player)
- Signed July 21, 2026 in Washington DC. Samsung Heavy Industries brings offshore EPC capability; Sargent and Lundy brings nuclear plant design and licensing. The goal is the world's first standardised floating small modular reactor platform whose hull accepts multiple reactor designs rather than one vendor's.
- The commercial point: a buyer can order the platform before deciding which reactor to put in it. Explicit focus on the US market and on AI power demand.
- Context: as of May 2026, thirteen announced offshore nuclear projects have committed more than 9.8 GW specifically to AI data-center infrastructure.
- Sources: World Nuclear News, Korea JoongAng Daily, Seoul Economic Daily, Splash247, TechTimes (July 21 to 23, 2026).
- Moves: [[Energy is the Ceiling]]. New player note created: Sargent and Lundy.

### 8. Fusion posts its biggest funding year on record (July 22)
- The Fusion Industry Association's Global Fusion Industry in 2026 report: $4.48B raised in the 12 months to July 2026, the highest since the survey began in 2021 and 69% above last year. Cumulative private investment now $14.24B. The sector employs over 16,000 people.
- 56 companies surveyed, up from 23 in 2021, with six new entrants and three withdrawals this year. 71% still expect the first fusion plant to deliver commercial electricity in the 2030s. 67% name funding as their biggest short-term problem, with an average $2.7B needed to build a working plant.
- Approach split: magnetic confinement 48%, inertial 21%, magneto-inertial 14%.
- Sources: Fusion Industry Association (July 22, 2026), World Nuclear News, Physics World, Energy Live News, Innovation News Network.
- Moves: [[Energy is the Ceiling]] (the "what would break it" side: the long bet is now capitalised, not just theorised).

### 9. Tesla Q2: Optimus units produced is still zero (July 22)
- On the Q2 call Tesla said it is "installing the first-generation lines for Optimus" and will "start production soon." Initial robots go to training-data collection and functionality development, not customers. Initial manufacturing runs expected Q3 2026.
- Musk on the call: this is "going to be the hardest product to scale manufacturing that we've ever made at Tesla, because everything on the robot is new," citing roughly 10,000 unique parts.
- Sources: Tesla Q2 2026 shareholder deck and call (July 22, 2026), CNBC, Not a Tesla App, TechTimes (July 20 preview).
- Moves: [[The Physical World Gets Automated]] (context evidence: the most-watched Western humanoid program is still at zero while European and Chinese players sign binding volume contracts).

### 10. Nvidia buys into national AI capacity in Korea, twice in one week (July 23 to 27)
- July 23 to 24: Nvidia and KAIST launched a joint AI research lab in Seoul, a $300M collaboration including roughly $50M per year of compute contributions over an initial five years.
- July 27: NAVER, Nvidia and Brookfield announced an expansion of Korea's sovereign AI factory infrastructure, growing the initial Nvidia DSX deployment from 55 MW to 200 MW, with NAVER stating an intent to reach 1 GW.
- Sources: Nvidia newsroom and GlobeNewswire (July 23 and July 27, 2026), Korea JoongAng Daily, The AI Insider.
- Moves: [[Compute and Resources Become Geopolitics]] (sovereign AI capacity is being bought in gigawatts, by the chip vendor, on the vendor's balance sheet).

### 11. AI protein design plus lab evolution reprograms an enzyme onto new targets (published July 23 to 24)
- A Nature proof-of-concept (Krasnow et al.) combined AI protein design with laboratory evolution to reprogram botulinum neurotoxin proteases to cut a range of new protein targets, including ataxin-2, implicated in neurodegeneration. The AI model proposed sequences that folded to the same 3D structure as the natural enzyme but with greater stability.
- Sources: Nature via Phys.org (July 24, 2026).
- Moves: [[Biology Becomes a Search Problem]] (the design step and the wet-lab search step are now one loop, not two disciplines).

### 12. Astera Labs: another drop, still on no company news (July 24)
- Fell 10.82% on July 24 to close at $291.58, roughly 40% below the highs, attributed to a semiconductor pullback, reported institutional stake reductions, and valuation concerns ahead of earnings. No company announcement; the last release was the July 8 notice scheduling the call. Q2 results land after the close on Tuesday, August 4.
- Sources: QuiverQuant, Motley Fool (July 23), TIKR.
- Moves: [[Astera Labs]] note only.

### 13. China's magnet exports to the US stay structurally below the pre-trade-war line (July 20)
- US-bound rare-earth magnet shipments in H1 2026 ran about 20% below the 2022 to 2024 average despite last year's truce. Magnets containing controlled heavy rare earths, chiefly dysprosium and terbium, remain licence-gated, and the early-2026 catalogue expansion pulls in any foreign-made product containing 0.1% or more Chinese-origin rare earths.
- Sources: Bloomberg (July 20, 2026), CSIS, IEA commentary.
- Moves: [[Compute and Resources Become Geopolitics]] (the truce did not restore the flow; the control is structural).

### 14. Unitree IPO: still unpriced (as of July 28)
- Registration approved July 1, 2026 (73 days, the fastest on record under the STAR Market pre-review mechanism). Plan is to raise ~RMB 4.2B (~$618M) selling at least 40.4M shares, implying roughly RMB 42B (~$6.18B). No confirmed launch date or final price range published as of this pull; a late-July debut remains possible.
- Price pressure downstream, same window: Unitree cut its R1 humanoid from nearly RMB 40,000 to under RMB 30,000, squeezing harmonic-drive and actuator suppliers. Unitree shipped more than 5,500 humanoids in 2025, roughly 32.4% of global humanoid unit shipments. (Pandaily, TechTimes, July 2026)
- Sources: Caixin (July 3, 2026), KraneShares guide, BigGo Finance, RoboZaps, Pandaily.
- Moves: [[Unitree]] status only. The mainstreaming trigger has not fired for a third straight week.

## Watch next week
- SK Hynix Q2 results, expected July 28 to 29. Korean brokerages model a record operating profit near KRW 64.1T (~$43.7B) on ~KRW 84.1T revenue, with an operating margin near 75% to 77%. Q2 alone would exceed the company's entire 2025 operating profit of KRW 47.2T. Estimates only until the release.
- Astera Labs Q2 earnings, August 4. The referendum on the six-week slide.
- Oklo Groves first criticality: startup authorization granted July 23, criticality not confirmed as of this pull. Three days left in the July target.
- Unitree pricing and first trading day.
- Whether the Nvidia / SB Energy / OpenAI Piketon financing is signed or dies as a leak.
- Samsung and Kioxia Q2 memory results; the second and third data points on the same supercycle.

## Rejected (with reasons)
- National Grid Ventures' $1.75B for 35% of Joulent (Project Kilby, 2.67 GW West Texas, 50/50 with Chevron, 20-year PPA to a Microsoft data center, first power 2028): announced July 1, 2026. Out of window by 27 days despite recirculating in July 23 to 24 trade coverage. Logged here for the record; strong future lead if a new catalyst lands (final investment decision expected before year-end 2026).
- "Half of 2026 US data center capacity delayed or cancelled" (Sightline Climate / Bloomberg, 30% to 50% of ~16 GW across ~140 projects): the primary reporting is dated April 3 to 4, 2026, not July. SemiAnalysis published a direct rebuttal ("Stop Saying Half of 2026 US Datacenter Capacity Is Canceled", modified June 21, 2026) arguing the estimate is not built from individual filings. Rejected as out of window and contested.
- Qualcomm acquiring Tenstorrent for $8B to $10B: reported mid-June 2026 and publicly denied by Jim Keller on June 30, 2026. Rejected as out of window and denied.
- SKF and Leaderdrive humanoid-actuator joint venture (SKF 60%, operations from end-2026): signed July 2, 2026. Out of window by 26 days. Flagged as a strong future lead; Leaderdrive is the only Chinese harmonic-drive maker with profitable mass production for humanoids and has passed Tesla supplier validation.
- Pacific Fusion and LLNL's 3,000-shot Sirius milestone (60 GW per 100-nanosecond pulse at 95% energy efficiency): announced July 16, 2026, picked up by ANS July 20. Twelve days old, at the outer edge of the window. Logged as thesis evidence, not used as a story lead this run.
- Trump administration "Ratepayer Protection Pledge" (July 23, 2026, non-binding, with Southern Company, PPL, NextEra, Duke and AEP participating): real and in-window, but it is a voluntary pledge with no hidden player and no dated obligation. Kept as one line of thesis context only.
- SK Hynix CEO Kwak Noh-jung's "worst-ever memory shortage in 2027, demand above supply beyond 2030": stated July 10, 2026 on Nasdaq listing day. Out of window by 18 days and the player is already Mainstream.
- Intel Q2 (July 24: fastest revenue growth in years, 2026 capex raised from $18B to $20B) and AMD's own quarter: context on the capex cycle, no thesis movement beyond what item 5 already carries.
- Model-race items (Moonshot AI's Kimi K3 open weights on July 27, Gemini and Claude release chatter): context only, none move the six physical-layer theses.
- Starcloud, Orbital, MP Materials, Lynas, Helion, Commonwealth Fusion, Isomorphic Labs: checked, no verified in-window development. Left untouched.

## Feeds that could not be pulled
Same constraint as the last four runs: web_fetch is provenance-gated, so no direct RSS was fetched (Tier 1 fully; this week's rotating Tier 2/3 slots listed in the header). All items above were sourced via dated WebSearch, with two direct fetches that cleared provenance because the URLs surfaced via search (SemiAnalysis rebuttal, TechTimes Humanoid deep-dive). Standing recommendation, now five runs old: restore a direct feed reader.

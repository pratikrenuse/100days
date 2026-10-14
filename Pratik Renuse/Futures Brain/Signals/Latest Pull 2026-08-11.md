# Latest Pull 2026-08-11

Window: August 1 to August 11, 2026. Emphasis on August 4 to 11, since the previous run closed on August 7.

Method note: `web_fetch` remains provenance-gated in this environment, so no RSS URL could be called directly. Tier 1 was covered by dated search against each publisher, and two direct fetches cleared provenance because their URLs surfaced through search: the 404K SEMI-AI Evening Brief of August 10, 2026, and TechStartups' daily brief of August 10, 2026. Rotating Tier 2/3 slots this run: Hugging Face Blog, Google Research, Microsoft Research, Meta FAIR, MIT News AI, Marcus on AI, Fabricated Knowledge, The Diff, Astral Codex Ten.

---

## The week in one line
The chokepoint moved to a material. Indium phosphide, the crystal every AI data-centre laser is grown on, is now reported as scarcer than memory, and in the same week Nvidia bought a fifth of a power company and Nokia bought a fab to make the crystal itself.

---

## A. The stack (The Bottleneck Slides Down the Stack)

**Indium phosphide is the new hard limit.**
- TrendForce, August 6, 2026: "InP Shortage Emerges as AI Optical Interconnect Bottleneck."
- Lumentum CEO Michael Hurlston: the supply-demand gap for indium phosphide has now surpassed that of DRAM and NAND. Demand for electro-absorption modulated lasers exceeds supply by more than 30%, even with output expected to rise more than 50% from December 2025 to December 2026.
- The shortage is not one thing: substrates, qualified lines, fab equipment, yields and packaging all bind. EML yields run 15% to 50% depending on wafer generation.
- Structural kicker: indium is recovered as a by-product of zinc smelting. Its supply cannot expand on laser demand alone, because it is bound to the economics of zinc.
- LightCounting expected relief from mid-2026; analysts now expect the imbalance to persist past 2027.

**Nokia bought a fab to make it.** August 5, 2026: definitive agreement to acquire NXP's Chandler, Arizona semiconductor campus and convert it to indium phosphide production for optical components. Nokia leases part of the site from early 2027 and acquires the full site with close expected Q1 2029. Nokia Q2 2026: net sales EUR 4.815B, optical communications sales up 20% YoY, sales to AI and cloud customers up 105%.

**AXT is the substrate.** Reported August 4, 2026 (semiconductor-today): AXT returned to profit on record quarterly InP revenue of $30.7M in Q2/2026, against $13.6M the prior quarter and $3.6M a year earlier. China added indium phosphide to its export control list on February 4, 2025, so every overseas shipment needs a permit from MOFCOM. AXT has roughly $66M of Q3 2026 revenue either already permitted or not requiring a permit. It completed a $632.5M capital raise and is doubling InP substrate capacity in 2026 and again in 2027, using a vertically integrated China campus covering raw materials, furnaces and recycling.

**Capacitors became the third-largest line item.** Per the 404K SEMI-AI brief of August 10, 2026 and surrounding trade coverage: some customers are paying two to three times market price to secure MLCC supply from Yageo, Murata and others, on agreements running six months to several years. In 2026 MLCCs are the third-largest line item in an AI server bill of materials, behind only GPUs and memory. The top five makers run at 90% to 95% utilisation. A new high-end MLCC line takes 18 to 24 months; Murata, Samsung Electro-Mechanics and Taiyo Yuden have all announced expansions, with meaningful volume not before late 2027. Yageo raised capacitor prices to direct customers rather than distributors alone from July 1, 2026, official increases around 50%, with some high-end spot models up sharply since May.

**Memory is now most of the machine.** UBS teardown, reported August 10, 2026 (Digitimes): a Vera Rubin core unit of one Vera CPU and two Rubin GPUs costs roughly $38,900, of which memory is roughly $24,300, or 62%. That is up from 53% on the Blackwell Ultra GB300. SOCAMM2, the CPU-side module, is roughly $19,400 or 49.8% of the superchip cost; HBM4 is roughly $4,943 or 12.7%. Memory cost rose about 2.5x generation on generation against a 2.1x rise in total unit cost. The headline: it is CPU-side memory, not HBM, that leads the bill.

**TSMC.** July 2026 revenue NT$467.58B, roughly $14.5B, up about 45% YoY; 2026 dollar revenue growth outlook raised to more than 40%. Reported August 10, 2026: TSMC is negotiating to acquire two existing display-panel plants to expand CoWoS capacity, potentially more than NT$30B (about $930M), on the logic that existing cleanrooms and power shorten the packaging ramp.

**Astera Labs.** Per the August 10, 2026 brief: following the acquisition of aiXscale, product scope has expanded from electrical interconnect (PCIe, CXL) into optical I/O and co-packaged optics.

**Software eats some of the specialist-chip demand.** TileRT statically compiles the decode graph into a persistent kernel: cost per million output tokens $13.56 against $13.40 for a GB200 solution at 1.9x interactive speed, and 61% below GB300 FP8 at 3.1x speed, but total throughput of 160.4 tokens per GPU per second against roughly 240 for GB300. It supports only GLM-5, GLM-5.1 and DeepSeek-V3.2. Deployed in Zhipu's GLM-5.1 HighSpeed and Xiaomi's MiMo V2.5 Pro UltraSpeed.

**Intel.** $15B underwritten common stock offering announced, with a $2.25B underwriter option, for capex and working capital across physical AI, purpose-built silicon, advanced packaging and external wafer production. Shares fell more than 3% premarket on dilution.

---

## B. Power (Energy is the Ceiling)

**Nvidia bought into the landlord.** Reported August 10, 2026 (The Information): Nvidia will invest up to $3B in Lancium, the Blackstone-backed Texas power developer behind the Stargate campus. Initial $2B for roughly 20%, a further $1B contingent on conditions including grid hookups. Lancium's land and power connections carry an enterprise value around $10B. It owns the 1,000-acre Lancium Clean Campus in Abilene, Texas, Stargate's first operational site. An IPO is being explored for 2027.

**The queue is now longer than the industry.** Eaton Q2 2026 earnings call, August 7, 2026: CEO Paulo Ruiz said total US data-centre backlog has reached 307 GW, roughly 15 years of backlog at 2025 build rates, up from 12 years at the prior update. Only about 20% converts near term; the majority lands 2028 and beyond. Eaton lifted its profit outlook to $13.50 and expects to add $10B to the top line between 2024 and 2026, about ten times the growth of the prior decade.

**Data centres are leaving the grid.** Energy Vault, August 7, 2026: strategic agreement to deploy 1.25 GW of integrated, grid-independent power infrastructure for a hyperscaler AI data centre in Texas, combining its battery storage, grid-forming power conversion and control software with Caterpillar gensets and EPC. Expected to generate roughly $500M to $600M of revenue across H2 2026 and 2027, with initial deployments over the next four to twelve months. The stated purpose is to avoid utility interconnection schedules entirely.

**Politics arrives.** Reported August 10, 2026 (Business Insider): opposition to hyperscale AI data centres has become a bipartisan local issue across Texas, Florida, Pennsylvania, Nebraska and Ohio, over electricity bills, water, noise and infrastructure cost allocation, ahead of the 2026 midterms. Pressure is building for tighter oversight, project audits and ratepayer protections.

**Sovereign power finance.** Naver is working with Nvidia and Brookfield on a multibillion-dollar Korean AI data-centre expansion that could reach gigawatt scale. Brookfield has agreed to provide up to $9B in financing; Nvidia plans a $1B strategic investment subject to conditions.

---

## C. Robots and components (The Physical World Gets Automated)

**The joint suppliers printed the numbers.** Per the 404K SEMI-AI brief of August 10, 2026:
- **Nabtesco** holds roughly 60% of the global cycloidal (RV) reducer market, used in leg and load-bearing joints. Operating profit rose 60% YoY as humanoid and industrial robot orders grew. Company filings put FY2025 operating profit at ¥20.7B, up 60.3%, on ¥307.9B of sales, with FY2026 guidance of ¥327B revenue at an 8.5% operating margin. Nabtesco is doubling RV-reducer capacity by 2026 for anticipated humanoid demand, with RV reducers targeted at hip and leg joints for Tesla, Figure, 1X and Apptronik programmes.
- **Harmonic Drive Systems** holds roughly 85% of the global harmonic-drive market, the zero-backlash precision reducers used in the smaller joints.
- **Yaskawa Electric**: operating profit up 70% YoY on automation and robotics demand.
- Harmonic drives and cycloidal reducers are not fully substitutable: precision joints versus heavy-load joints. High share invites second-source qualification, and a design shift to direct drive would dilute both.

**Unitree.** Reuters via TechStartups, August 10, 2026: Unitree is seeking roughly 6.1 billion yuan, about $904M, in its Shanghai listing. 2025 revenue was nearly 1.7 billion yuan, more than 40% from overseas. Backers include Tencent, Alibaba, Meituan and state-linked investors. AgiBot and Leju Robotics are also moving toward public markets.

**Samsung.** The robotics business office now reports directly to the CEO. No revenue, order or production figures disclosed.

---

## D. Geopolitics (Compute and Resources Become Geopolitics)

- **South Korea**: a 5 trillion won fund, about $3.5B, for semiconductor materials, equipment, components and fabless design, plus another 5 trillion won of trade financing for export-oriented suppliers. Part of a strategy to unlock more than $576B of semiconductor manufacturing investment, with permit acceleration for chip clusters and work on the electricity, water, transport and land underneath them.
- **Rare earths**: the April 2025 regime licensing dysprosium, terbium and the magnets containing them was never suspended and is fully in force in 2026. The statutory target for a licence is 45 working days; heavy rare-earth approvals in practice run 60 to 120 days or more. New non-China magnet capacity begins coming online in summer 2026. A November 2026 enforcement date applies to the extraterritorial provisions.
- **Indium phosphide** sits on China's export control list from February 4, 2025, which is why the AXT permit count is a supply variable for the entire optics chain.
- **LandSpace** targeted August 10, 2026 for the second flight of Zhuque-3, its 66-metre reusable methane and liquid-oxygen rocket, including a second first-stage recovery attempt. The maiden flight reached orbit in December 2025 but the recovery attempt failed on descent.
- **SpaceX** Q2 2026: revenue $7.8B, up 92% YoY; capex $18.4B, of which $15.8B, or 86%, went to AI. AI revenue $2.56B; nameplate compute capacity up from 1.0 GW to 1.4 GW; AI adjusted EBITDA $1.1B, but a $1.3B operating loss after $1.9B of depreciation. New cloud contract sales $14.1B, plus $6.7B signed in early Q3, with a 90-day termination clause. Connectivity revenue $4.3B, up 66% YoY, 12 million users at about $66 average monthly revenue.

---

## E. Intelligence going cheap (Atoms over Algorithms)

- **Price collapse**: OpenAI's GPT-5.5 and GPT-5.4 run as low as $30 and $15 per million tokens; DeepSeek V4 is under $1. The spread is now wide enough to change routing strategy rather than just procurement.
- **Efficiency compounding**: Anthropic's annualised revenue run rate per megawatt rose to four times its previous level within nine months, from algorithms, routing and model adaptation.
- **Meta** released Muse Glimmer, a 30-billion-parameter open-weight model under Apache 2.0 that runs on a single consumer GPU, distilled from the larger Muse Spark series and aimed at always-on local agents.
- **Machine traffic**: per the August 10, 2026 brief citing Cloudflare Q2 2026 data, machine traffic passed human traffic in the first half of 2026, with the crossover estimated at May, roughly 18 months earlier than expected. A single shopping agent may visit around 5,000 websites where a human visits around 5.
- **Capex**: BofA estimates Amazon, Microsoft, Google, Meta and Oracle will spend roughly $730B of aggregate capex in 2026, up about 100% YoY, potentially exceeding $1 trillion across 2027 to 2028, with some firms briefly running negative free cash flow.
- **Amazon**: Trainium annualised revenue run rate has passed $25B.
- **Google**: an external compute agreement at $920M per month running through mid-2029, roughly 110,000 GPUs; in-house Frozen v2 targeted for 2028 at six to ten times current tokens per watt.

---

## F. Biology (Biology Becomes a Search Problem)

Thin week. Nothing with a dated, in-window, verifiable milestone and an unused obscure player. The bioinformatics investment roundup of August 6, 2026 is a market summary rather than an event, and the Lila Sciences UK government funding for AI NanoScientist has no firm in-window date in the coverage that surfaced it. No evidence added; the thesis is left untouched this run.

---

## Rejects and out-of-window
- **Humanoid's $152M Series A at $1.35B** (Prime Movers Lab, with Schaeffler, Bosch, Fubon and Aglaé): July 21, 2026. Out of window, and already reflected in the [[Humanoid]] note's "funded by its own customer" framing. Not used.
- **Cloudflare's bots-pass-humans announcement**: Matthew Prince posted June 3, 2026. Out of window as an event. Only the Q2 2026 agentic-traffic detail resurfacing in the August 10 brief is logged.
- **John Jumper to Anthropic, Noam Shazeer to OpenAI**: June 2026 moves. The August 6, 2026 BigDATAwire analysis of the DeepMind talent war is in window but is commentary on old moves, not a new role change. No roster dossier edited on it.
- **Yageo's July 1, 2026 price action**: the price list itself is out of window. Only the August 10 reporting of two-to-three-times premiums and multi-year lock-ins is logged as this week's evidence.
- **Nabtesco FY2025 results** (February 19, 2026): out of window as an event. Logged as the audited backing for the in-window August 10 restatement of the 60% operating profit growth and the market-share figures.
- **Eli Lilly LillyPod and the Sanofi/Owkin partnership**: earlier in 2026, recirculating in August roundups. Not used.
- **Erebor's $1.5B raise at $8B**: real and in window, but a bank, with no thesis to move. Noted, not filed.

## Watch next week
- **Nvidia Q2 earnings**: whether the Lancium stake, the Piketon backstop and the chip financing talk appear in disclosed commitments.
- **Unitree's first trading day**: sets the multiple for the whole humanoid listing queue.
- **AXT Q3 permit count**: the cleanest single read on whether the optics chain gets its substrates.
- **FERC**: the 60-day tariff filings from the six RTOs and ISOs land around mid-August.
- **Lumentum's quarter**: whether revenue clears $1B and whether CPO capacity expansion in December 2026 converts to 1H27 orders.
- **OLIX**: an independent DX-1 benchmark or a named customer, still outstanding from last run.

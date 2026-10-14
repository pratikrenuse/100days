# Humanoid Robots: The Long-Horizon Curve (deep research)

Built 2026-07-02 from a 5-agent research sweep (actuators, hands/touch, robot brain, power/magnets, macro/labour). This is the reusable 10/20/30-year reference for any humanoid post. Sources: Goldman Sachs, Morgan Stanley, Bank of America, Citi, UBS, Adamas Intelligence, CSIS, IEA, WHO/ICN, company disclosures. Supports [[The Physical World Gets Automated]].

**The one line:** a humanoid is "a smartphone with limbs," so its cost falls on a Wright's-law curve. Physical labour gets a software cost curve, and the durable money sits in the boring physical inputs, not the robot brands.

---

## THE COST CURVE (the engine of everything else)
- Average humanoid ~$35,000 in 2025 -> ~$17,000 by 2030 (~51% cut in 5 yrs) -> BofA sees ~$13k to $17k by 2030-2035. (Goldman, BofA)
- Decline rate: Goldman says build cost fell ~40% in a single year (2023->2024) and expects ~15 to 30%/yr ongoing; Morgan Stanley models ASP falling ~8%/yr, BOM ~11%/yr. Bain: components -70% by 2035.
- China is already below the curve: Unitree R1 ~$5,900, G1 ~$13,500 (finished robots, weak hands).
- CAVEAT: the steep declines assume mass-production volume that has NOT yet arrived. Pre-inflection.

## THE STACK, LAYER BY LAYER (chokepoint + curve)

**1. Actuators & reducers, the "muscles and joints" (the biggest cost, the core chokepoint).**
- ~Half the bill of materials. UBS: linear 27% + rotary 24% = ~51% actuators. Morgan Stanley: up to ~56%. Goldman: ~40 to 50%. (Anchor: "roughly half.")
- Chokepoint: Japan owns the high end, Harmonic Drive Systems (strain-wave reducers) and Nabtesco (RV/cycloidal reducers). Durability limit: harmonic flexsplines rated ~10,000 to 20,000 hrs, a real problem for 24/7 robots.
- China localizing fast: Leaderdrive ~30 to 40% of China's harmonic market; Zhejiang Shuanghuan reportedly supplies Tesla Optimus and Unitree; Chinese reducers priced ~40 to 60% below Japanese. Mid-range parity claimed; top-tier fatigue-life gap narrowing but not closed.

**2. Hands & touch, the hardest unsolved problem (where humanoids most often disappoint).**
- ~17% of BOM (~$9,500 on a $50-60k Optimus Gen-2), but a disproportionate share of failures. (Morgan Stanley)
- The failure that defines the field: ~100% grasp success on simple round objects, but ~30% on real tools (spoons, screwdrivers). A hand has ~22-27 degrees of freedom vs ~6-7 per leg joint.
- Why it's stuck: touch data barely exists (no internet-scale tactile dataset), and contact physics is unsolved. Rodney Brooks (bear case): human-level humanoid dexterity is "pure fantasy," the bubble is "doomed to burst," because vision-only imitation can't replace force/touch feedback.
- Leaders: Tesla (22-DoF tendon hand), Shadow/OpenAI (24 DoF), Meta + GelSight Digit 360 (>8M taxels, superhuman fingertip sensing).
- Timeline: structured pick-and-place 2025-2030; reliable general-purpose "human-level" dexterity 2035-2040+, with real risk it slips. Treat "human hands by 2030" as marketing.

**3. The brain, vision-language-action (VLA) foundation models (value is shifting here).**
- Players: Nvidia Isaac GR00T (the OPEN base model + sim, the "arms dealer"), Figure Helix (BMW line, 1,250 hrs, 99%+ accuracy), Physical Intelligence pi-0 (raising ~$1B at ~$11B; OpenAI/Bezos backed), Skild AI (~$1.4B at >$14B, "omni-bodied brain"), Google DeepMind Gemini Robotics, Tesla end-to-end, Generalist AI.
- The chokepoint is DATA, not compute (inverse of LLMs): robot action data doesn't exist online. Largest open manipulation dataset ~1M episodes vs 1.5-4.5B for language. Fixes: teleop (slow, 5-50 episodes/hr), simulation (Nvidia made 780k synthetic trajectories in 11 hrs), human video, and firehoses (Generalist: 270k+ hrs, +10k hrs/week).
- CAVEAT: robot "scaling laws" are assumed, not proven (only single-vendor evidence). Valuations ($39B Figure, $14B Skild) run far ahead of pilot-stage revenue.

**4. Power & batteries.**
- Today: ~2.2 to 2.3 kWh pack (Tesla Optimus, Figure 02); spec claims ~4 to 8 hr shifts but real heavy-duty runtime is ~2 to 2.5 hr (assume 60-70% of spec). Agility Digit uses hot-swap batteries for 24/7.
- Curve: solid-state is the 2027-2030 unlock, Samsung SDI targets mass production 2027, LG anode-free robot cells by 2030, Hyundai/Samsung aim 2-3x energy density before ~2030 commercialization. Winners: CATL, LG Energy Solution, Samsung SDI (Korea + China dominate; no Western cell champion).

**5. Magnets & materials (the geopolitics rung, links to [[MP Materials]]).**
- Each humanoid needs ~0.9 to 1.3 kg of NdPr rare-earth element (Morgan Stanley) or ~3.5 to 4 kg of finished NdFeB magnet (Adamas), roughly 2x an EV's magnet content, across ~30 rare-earth-magnet actuators.
- Fleet math: Adamas says a 10-billion-robot world (Musk's number) would need ~93x today's global magnet capacity; NdFeB demand nearly quadruples to >880,000 tonnes by 2040, with robotics the single biggest end-use by 2040. Morgan Stanley: NdPr swings from ~1% deficit (2039) to ~35% (2050); lifted its long-term NdPr price from $135 to $209/kg.
- Chokepoint: China controls ~70% mining, ~90% processing, ~90%+ of NdFeB magnet making, and has imposed export controls. The West's answer, [[MP Materials]], targets ~1,000 tonnes/yr, under 1% of China's output. Substitutes (iron-nitride, rare-earth-free motors) are partial and raise copper use.

## THE DEPLOYMENT CURVE (units & market; forecasts, not facts)
- 2025 (fact): ~15,000 units; China made ~90% of them.
- 2026: ~90,000 shipments (BofA), up ~700% YoY (TrendForce).
- 2030: Goldman base ~250k units/yr shipped (BofA ~1.2M/yr).
- 2035: Goldman ~1.4M units in service, ~$38B market (a 6x upgrade). Sell-side 2035 range is wild: ~$9B to $251B. No consensus.
- 2050: Morgan Stanley ~$5T market, ~1 billion units ("as ubiquitous as smartphones"); Citi ~$7T, ~650M units. Split: ~930M industrial/commercial, ~80M in homes; ~63M in the US, ~302M in China (MS).
- 2060: BofA ~3 billion units (more than the world's ~1.5B cars), ~62% in homes.

## THE LABOUR & MACRO CURVE
- Jobs (Morgan Stanley model): ~40,000 US jobs displaced by 2030 -> ~8.4M by 2040 -> ~62.7M by 2050; up to 40% of employees / 75% of occupations affected in some way by 2050.
- Goldman (deliberately modest): humanoids fill only ~4% of the US manufacturing labour shortage by 2030 and ~2% of global elderly-care demand by 2035 (base case); bull case up to ~53% of the eldercare gap.
- The demographic pull (the strongest NON-speculative case): Japan's working-age population falls to ~60% by 2050 (1 in 3 people 65+); South Korea 65+ hits 33% by 2040; China shrinks >100M by 2050. Aging is structurally pro-automation (OECD/IMF).
- Geography: China deploys fastest (controls ~63% of components, actuators ~70% of cost), US leads the AI/software layer (Nvidia, Tesla, Figure, Physical Intelligence).
- 30-year scenarios (label speculation): Musk 1 to 10 billion humanoids by 2040, "work optional," Universal High Income. The serious economist worry isn't "no jobs," it's DISTRIBUTION: gains accrue to capital, a painful 2026-2035 transition, inequality spike, UBI/UHI entering real politics.

## ACCURACY FLAGS (do not get these wrong in a post)
- The "13 million nurse shortage by 2030" is the ICN (International Council of Nurses), NOT the WHO. WHO's own figure is ~4.1M by 2030. Attribute to ICN. (I need to fix this in the thesis.)
- Forecast dispersion is enormous (2050 units: UBS 86M, Citi 650M, MS 1B, BofA 3B by 2060). Present ranges/scenarios, never a single point estimate as fact.
- Founder numbers (Musk 1-10B, $10T Optimus revenue) are promotional. Flag as vision.
- Runtime specs are inflated ~30-40% vs real load. Per-robot magnet content: 0.9 kg (element) vs 4 kg (finished magnet) measure different things.
- Robot scaling laws are unproven; valuations run ahead of revenue; today's robots "can barely walk."

## HIDDEN PLAYERS SURFACED (candidates to develop into Player notes)
- Actuators/reducers: Harmonic Drive Systems, Nabtesco, Leaderdrive, Zhejiang Shuanghuan.
- Touch/hands: Meta + GelSight, Shadow Robot.
- Brains: Nvidia GR00T, Physical Intelligence, Skild AI, Figure (Helix), Generalist AI.
- Batteries: CATL, LG Energy Solution, Samsung SDI.
- Magnets: [[MP Materials]], Lynas (data via Adamas Intelligence).

## Key sources
- Goldman Sachs ($38B by 2035): https://www.goldmansachs.com/insights/articles/the-global-market-for-robots-could-reach-38-billion-by-2035
- Morgan Stanley ($5T by 2050, jobs, minerals): https://www.morganstanley.com/insights/articles/humanoid-robot-market-5-trillion-by-2050
- Morgan Stanley "Humanoid 100" value chain (BOM): https://advisor.morganstanley.com/john.howard/documents/field/j/jo/john-howard/The_Humanoid_100_-_Mapping_the_Humanoid_Robot_Value_Chain.pdf
- Bank of America (3B units by 2060): https://fortune.com/2026/03/13/bank-of-america-humanoid-robot-forecast-3-billion-2060/
- Adamas Intelligence (magnets, 880k tonnes by 2040): https://www.adamasintel.com/humanoid-robots-and-the-future-of-motors-and-ndfeb-markets/
- Rodney Brooks bear case: https://techcrunch.com/2025/09/26/famed-roboticist-says-humanoid-robot-bubble-is-doomed-to-burst/
- Physical Intelligence / Skild funding: https://www.therobotreport.com/skild-ai-raises-1-4b-building-omni-bodied-robot-skild-brain/
- CSIS (China rare-earth/magnet controls): https://www.csis.org/analysis/chinas-new-rare-earth-and-magnet-restrictions-threaten-us-defense-supply-chains
- WHO nursing (the correct ~4.1M figure): https://www.who.int/news-room/fact-sheets/detail/nursing-and-midwifery

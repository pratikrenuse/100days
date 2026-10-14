# Compute & Resources Become Geopolitics: Long-Horizon Curve (deep research)

Built 2026-07-02 from a 3-agent sweep (rare earths, orbital compute, chip geopolitics). Supports [[Compute and Resources Become Geopolitics]]. Sources: IEA, USGS, Adamas, Morgan Stanley, CSIS, Bloomberg Economics, SIA/BCG, SemiAnalysis, Google Research, company filings.

**The one line:** the arenas of national power move to the physical substrate of AI, chips, refined minerals, energy, and orbit. A country can win the model race and still lose the AI economy.

---

## RARE EARTHS / CRITICAL MINERALS
- China's grip tightens downstream: ~60% of mining, but ~91% of refining/separation and ~94% of NdFeB magnet manufacturing (IEA 2024). The chokepoint is the magnet, not the mine.
- Weaponized: export controls in April 2025 (7 heavy REEs) and October 2025 (5 more, plus a 0.1%-by-value extraterritorial rule and controls on the refining equipment itself). A one-year truce runs to ~Nov 2026, but the April licensing regime was never lifted. Chinese magnet exports fell ~75% after April; European REE prices hit up to 6x Chinese domestic.
- Demand curve: NdFeB grows ~7.5%/yr to 2040 (wind + EVs); magnet-REE value ~5x to ~$56.7B by 2040 (Adamas); NdPr oxide deficit ~90,000 t by 2040. NdPr ~$133/kg (mid-2026) -> Adamas sees ~$200/kg by 2030; Morgan Stanley lifted its long-term forecast to $209/kg. Robot wildcard: MS models ~1B humanoids by 2050 at ~1.3 kg NdPr each, +167% NdPr demand and a ~35% deficit by 2050 (a scenario, not a base case).
- Western answer: [[MP Materials]] (DoD took ~15%, set a $110/kg NdPr floor, "10X" plant to ~10,000 t/yr) and Lynas (only ex-China heavy-REE separator; Texas plant targeting ~5,000 t/yr NdPr). But a new mine takes ~8 years, a full ex-China chain 5-10 years.
- Bear: substitution (Tesla's rare-earth-free motor, though ~30% heavier), a wave of magnet recyclers, demand possibly overestimated, and China's classic move of flooding the market to bankrupt Western entrants.

## ORBITAL / SPACE COMPUTE (early, speculative)
- What actually happened: Starcloud (Nvidia-backed) trained the first AI model in orbit on an H100, Dec 10 2025. Google's Project Suncatcher (Nov 2025) designed TPU constellations and showed TPUs are surprisingly radiation-hard. SpaceX filed for up to ~1 million AI satellites (Jan 2026); its AI1 satellite is ~70 m wingspan / ~150 kW ("Starmind").
- Why it makes sense: in the right orbit solar panels are up to ~8x more productive and run nearly continuously. The catch physics does NOT solve is cooling: in vacuum heat only radiates, so radiators can outweigh the compute ~10x. Cooling, not radiation, is the wall.
- The master variable is launch cost: Falcon 9 ~$2,700/kg today; Starship aspirational ~$67-200/kg; the threshold where orbital compute pencils out is ~$200/kg, which Google projects by the mid-2030s (contingent on Starship cost AND cadence).
- 10/20/30: prototypes ~2027; MW-scale early-to-mid 2030s if ~$200/kg and high cadence arrive; GW-scale a 2040s proposition; TW-scale is a slogan (1 TW of compute ~ 21x TSMC's entire wafer output). Bear: cooling mass, launch cadence, no on-orbit servicing, HBM radiation, "still a stunt" (only one toy model has actually run in orbit).

## SEMICONDUCTOR GEOPOLITICS
- Concentration: Taiwan makes ~92% of the world's most advanced logic; TSMC alone >90% of the most advanced chips and >70% of the foundry market; advanced packaging (CoWoS) is even more concentrated and sold out. A Taiwan war is modeled at ~$10.6 trillion (9.6% of global output) in year one alone. This is the defining tail risk of the decade.
- Export controls vs China: HBM is the sharpest cut. SMIC makes 7nm on DUV (~45k -> 80k wafers/month 2025-27); Huawei Ascend ~600k 910C chips in 2026, but memory is the wall, CXMT can supply HBM for only ~250,000-300,000 of them. China's stated goal is 80% self-sufficiency by 2030 (a policy aspiration, unlikely at the leading edge).
- Reshoring: TSMC Arizona ($165B, N2 by ~2029), Intel 18A/14A, Samsung Taylor. SIA/BCG: US share of advanced (<10nm) logic goes 0% (2022) -> 28% (2032); Taiwan's <10nm share falls 69% -> 47%. This is diversification, not de-risking, and the newest node plus most packaging stays in Taiwan.
- 10/20/30: through 2030 the chokepoint holds (Taiwan plurality, China ~2 generations behind, HBM-constrained). By 2035, real US redundancy IF Arizona/Intel/Samsung execute. By 2040, a tri-polar compute map, with the deepest chokepoint of all being ASML/EUV tools.

## THE COMBINED 10 / 20 / 30 SHAPE
- ~10 yrs: China keeps the magnet and refining chokehold; Taiwan keeps the chip chokehold; space compute is prototypes. The physical substrate is the battleground and one country/island holds each lever.
- ~20 yrs: ex-China minerals and US fabs build real (if partial) redundancy; orbital compute reaches MW-scale if launch costs crash. Control diffuses from monopoly to "dominant plurality + allied bloc."
- ~30 yrs: a genuinely multipolar physical-AI map is possible, but full displacement of China (minerals) or Taiwan (frontier chips) is in no credible base case; new arenas (orbit, deep-sea and asteroid mining) open.

## Chokepoint players
[[MP Materials]], Lynas (rare earths) - TSMC, ASML, SMIC/Huawei (chips) - [[Starcloud]], Google (Suncatcher), SpaceX (orbital compute).

## Key sources
- IEA critical minerals / export controls: https://www.iea.org/commentaries/with-new-export-controls-on-critical-minerals-supply-concentration-risks-become-reality
- Adamas rare-earth magnet outlook to 2040: https://www.adamasintel.com/rare-earth/rare-earth-magnet-market-outlook-to-2040/
- MP Materials DoD deal ($110/kg floor, 10X plant): https://mpmaterials.com/news/mp-materials-announces-transformational-public-private-partnership-with-the-department-of-defense-to-accelerate-u-s-rare-earth-magnet-independence/
- Bloomberg Economics / Rhodium, Taiwan conflict $10.6T: https://rhg.com/research/taiwan-economic-disruptions/
- SIA/BCG US advanced-logic to 28% by 2032: https://www.semiconductors.org/america-projected-to-triple-semiconductor-manufacturing-capacity-by-2032-the-largest-rate-of-growth-in-the-world/
- Google Project Suncatcher (primary): https://research.google/blog/exploring-a-space-based-scalable-ai-infrastructure-system-design/
- SemiAnalysis space datacenters: https://newsletter.semianalysis.com/p/to-boldly-go-the-case-for-space-datacenters
- CNBC Starcloud first AI trained in orbit: https://www.cnbc.com/2025/12/10/nvidia-backed-starcloud-trains-first-ai-model-in-space-orbital-data-centers.html

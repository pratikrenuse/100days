# The Stack Bottleneck: Long-Horizon Curve (deep research)

Built 2026-07-02 from a 2-agent sweep (memory/HBM; advanced packaging + interconnect). The reusable 10-year reference. Supports [[The Bottleneck Slides Down the Stack]]. Sources: SemiAnalysis, TrendForce, Tom's Hardware, Morgan Stanley, BofA, Yole, LightCounting, company filings.

**The one line:** the binding constraint keeps sliding one rung down, packaging, then memory, then the wiring between chips, then optics, then power. Each time, the unglamorous supplier of the moment quietly wins, then the constraint relocates.

---

## RUNG 1: ADVANCED PACKAGING (TSMC CoWoS), the GPU-supply throttle
- Capacity ramp (wafers/month): ~13,000 (2023) -> ~35,000 (2024) -> ~75,000 (2025) -> ~120-140k TSMC + OSAT overflow = ~200,000 total industry (2026); +60% more in 2027. Roughly 10x from 2023 to 2026.
- Sold out through 2026; the supply-demand gap narrows from ~20% to ~10% by end-2026. The reticle limit (~858 mm2) means bigger interposers = fewer packages per wafer = fewer GPUs. Nvidia booked ~800-850k CoWoS wafers for 2026 (~60% of TSMC output).
- Roadmap: 5.5-reticle (2026) -> 9.5-reticle + 12 HBM5 (2027) -> 14-reticle (2028) -> >14-reticle, up to 24 HBM5E (2029); panel-level CoPoS pilot 2027, mass production 2028-29 (Nvidia Feynman first).
- Bear: possible glut 2026-27 (real order cuts already happened as Hopper ended); single points of failure (one foundry TSMC, one buyer Nvidia, one island Taiwan).

## RUNG 2: MEMORY / HBM
- Roadmap: HBM3E (2024-25, ~1.2 TB/s, 24-36 GB) -> HBM4 (mass production Q1 2026, ~2 TB/s, 2048-bit bus, up to 64 GB) -> HBM4E (2027, ~2.5 TB/s) -> HBM5 (~2029-2031, ~4 TB/s, 4096-bit).
- Nvidia pull: Rubin (2026) ~288 GB HBM4 / ~22 TB/s per GPU; Rubin Ultra (2H 2027) targets ~1 TB HBM4E. SemiAnalysis "memory-Parkinson": models expand to consume whatever HBM ships, so memory is perpetually the next bottleneck.
- Market: HBM ~$35B (2025) -> ~$98-100B by 2030 (~30-33% CAGR); HBM's share of DRAM revenue ~18% (2024) -> ~50% by 2030. Share split: SK Hynix ~62%, Micron ~21% (overtaking Samsung ~17%). All three sold out through 2026; Micron's whole 2026 output sold.
- Cost share: memory ~30% of hyperscaler DC spend in 2026 (a ~4x rise vs 2023); HBM 30-40% of AI-accelerator cost (was under 20%). (The EV report's "2%->18%" is the older general-server vs AI-server baseline; use ~30% hyperscaler spend as the defensible figure.)
- Chokepoint: TSV capacity + low 3D-stack yields (HBM is the #1 cause of GPU failures); HBM diverts DRAM wafers, so the shortage spilled into DRAM/NAND (prices +50-55% in a quarter, no relief before 2028). Easing: Samsung sees shortages through 2027; SK chairman says wafer shortage could last to 2030.
- Bear: memory is brutally cyclical (a capacity wave lands 2026-2028 and could glut); a US price-fixing class action (June 2026) hangs over the three makers; SK Hynix is ~90% dependent on Nvidia.

## RUNG 3: INTERCONNECT (copper -> optical), the scale throttle
- Physics: passive copper reach collapses to ~1 meter at 200G/lane. Nvidia GB200 NVL72 uses ~5,000 copper cables in-rack because optical would add ~20 kW to the rack; copper wins where it physically can. But a 1,152-GPU coherent domain "cannot be done with copper", the forcing function for optical at Feynman scale.
- Energy: pluggable optics ~15-20 pJ/bit -> co-packaged optics (CPO) ~4.5-5 pJ/bit (~70% cut).
- Timeline: scale-OUT (switch fabric) CPO arrives 2026 (Nvidia Quantum-X 2H 2025, Spectrum-X 2026; Broadcom Bailly 2024, Tomahawk 6 2025). Scale-UP (NVLink GPU fabric) optical ramps later: Nvidia Rubin Ultra 2H 2027 (copper in-rack, optical out-of-rack) -> Feynman 2028 (native optical NVLink).
- Market: CPO/NPO ~$100M (2025) -> >$39B by 2030 (TrendForce); CPO rises from <1% to >35% of optical networking by 2030. AI-cluster optics ~$16.5B (2025) -> ~$26B (2026).
- Players / rungs: TSMC CoWoS (package) -> [[SK Hynix]] (memory) -> [[Astera Labs]] (copper interconnect today; revenue $116M 2023 -> $396M 2024 -> $852M 2025, hedging into optics ~2027-29) -> [[Ayar Labs]] (optical I/O, $500M Series E at $3.75B, volume ~2026-27) -> Nvidia/Broadcom (CPO).
- Bear: CPO has slipped for a decade and slipped again (SemiAnalysis pushed scale-up CPO to 2028-2029 on a laser-loss problem); LPO (linear pluggable optics) is a cheaper bridge that delays CPO; Ayar was using "volume" language in 2022 and is still pre-volume in 2026.

## THE 10 / 20 / 30 SHAPE (the slide itself)
- **Now to 2027:** memory (HBM) and packaging (CoWoS) both binding at once; copper maxed inside the rack.
- **2027 to 2030:** HBM4/5 scale; CoWoS roughly triples; optical (CPO) takes over rack-to-rack scale-up (Rubin Ultra 2027 -> Feynman 2028); the constraint slides down to optics/photonics.
- **2030s:** photonics matures and the chokepoint keeps relocating one rung down (packaging -> memory -> interconnect -> optics -> power), which is the whole thesis. The durable question is always "which rung binds next," and the answer keeps moving toward the physical layers (see [[Energy is the Ceiling]]).

## Chokepoint players
[[SK Hynix]] (HBM), TSMC (CoWoS packaging), [[Astera Labs]] (copper interconnect), [[Ayar Labs]] (optical I/O), Nvidia and Broadcom (CPO).

## Key sources
- SemiAnalysis, Scaling the Memory Wall (HBM roadmap): https://newsletter.semianalysis.com/p/scaling-the-memory-wall-the-rise-and-roadmap-of-hbm
- SemiAnalysis, Co-Packaged Optics (CPO timing): https://newsletter.semianalysis.com/p/co-packaged-optics-cpo-book-scaling
- Tom's Hardware, HBM roadmaps: https://www.tomshardware.com/tech-industry/semiconductors/hbm-roadmaps-for-micron-samsung-and-sk-hynix-to-hbm4-and-beyond
- TrendForce, CoWoS gap narrowing 20% to 10%: https://www.trendforce.com/news/2026/06/15/news-tsmc-cowos-supply-demand-gap-reportedly-seen-narrowing-from-20-to-10-by-end-2026-as-capacity-expands/
- Astute Group, HBM share (SK 62%, Micron 21%): https://www.astutegroup.com/news/general/sk-hynix-holds-62-of-hbm-micron-overtakes-samsung-2026-battle-pivots-to-hbm4/
- Astera Labs FY2025 results: https://www.asteralabs.com/news/astera-labs-reports-fourth-quarter-and-full-year-2025-financial-results/
- Ayar Labs Series E: https://ayarlabs.com/news/ayar-labs-closes-500m-series-e-accelerates-volume-production-of-co-packaged-optics/

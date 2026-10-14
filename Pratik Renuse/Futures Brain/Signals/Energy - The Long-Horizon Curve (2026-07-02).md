# Energy for AI: The Long-Horizon Curve (deep research)

Built 2026-07-02 from a 3-agent sweep (demand, supply, grid/transformers). The reusable 10/20/30-year reference for any energy post. Supports [[Energy is the Ceiling]]. Sources: IEA, EPRI, Goldman, McKinsey, Deloitte, Grid Strategies, LBNL, BloombergNEF, S&P Global, company filings.

**The one line:** for the next ~5 years the binding constraint is not fuel or ideas, it is manufacturing, the gas turbines and the high-voltage transformers. Solar+storage carries the volume, gas carries the firm load but is rationed, and nuclear/fusion are real but small until the 2030s.

---

## THE DEMAND CURVE
- Global data-centre electricity: ~415 to 485 TWh (2024-25) -> **~945 TWh by 2030** (IEA, ~3% of world electricity, growing ~15%/yr, 4x faster than all other demand) -> ~1,200 TWh by 2035. AI's slice triples 2025->2030 (today ~14% of DC power; cloud ~54%).
- US: ~147 to 192 TWh (2023-24) -> **380 to 790 TWh by 2030** (EPRI); DC share of US electricity 4-5% -> **9-17%**. IEA: US data centres will use more power by 2030 than aluminium, steel, cement and chemicals combined, and are ~half of all US demand growth this decade.
- Deloitte: US AI data-centre demand grows ~30x, from 4 GW (2024) to **123 GW by 2035**; total US DC 33 -> 176 GW, AI going 12% -> 70%.
- US grid load growth (Grid Strategies): 5-yr peak forecast **128 GW by 2029** (up ~5x in two years), ~166 GW by 2030; data centres ~55% of it (~90 GW). Morgan Stanley flags a ~49 GW power-access shortfall in 2027-28.
- Grid capex needed: Goldman ~$720B through 2030. Interconnection queue ~2 TW stuck.
- 2050 (thin): US EIA server-only 446 to 818 TWh; no credible single global 2050 number, treat as low-confidence.

## THE SUPPLY ANSWER (who fills the gap, by horizon)
**Gas turbines (the chokepoint of the 2020s).** GE Vernova backlog ~100 GW, targeting 110 GW by end-2026, sold out through 2028-2030, prices +~300% in 3 yrs; a turbine ordered now first operates ~2031 (5-7 yr lead times). Siemens Energy record EUR 138B backlog, sold out through 2028. Gas is the only GW-scale firm power available this decade, and it is rationed.

**Small modular reactors (SMR).** Oklo ~75 MWe, target late-2027/2028; X-energy ~2030 (320 MW -> up to 960 MW by 2035); Kairos ~2030 (Google/TVA); NuScale ~2030. Hundreds of MW by ~2028-30, real GW-scale only early-to-mid 2030s. NRC Part 53 rule final by end-2027.

**Fusion (speculative).** Helion targets ~50 MW to Microsoft by 2028 (widely doubted by physicists). Commonwealth Fusion ARC 400 MW to the Virginia grid early 2030s. Not load-bearing within 10 years; potentially material at 20-30.

**Geothermal.** Fervo Cape Station upsized to 500 MW; ~100 MW by early 2027, +400 MW in 2028. The most credible non-gas firm clean addition this decade, and drilling scales faster than nuclear.

**Solar + storage (the volume winner).** US 2025: 32.5 GW solar + 18.2 GW storage = ~81% of all new capacity; ~86 GW planned 2026. Global: record 108 GW battery added in 2025. Cost: utility solar LCOE ~$39-43/MWh (down ~90% since 2010); 4-hr battery $78/MWh (down 27% YoY, record low); solar+storage all-in ~$57/MWh, heading toward <$60/MWh (battery) and ~30% further solar declines by 2035 (BNEF). Deployable in 12-24 months; limited by intermittency and interconnection, not manufacturing.

## THE GRID / TRANSFORMER CHOKEPOINT (the durable 20-year wall)
- Transformers: lead times ~2.5 to 4 years (tail quotes to 5); prices +75 to 95% since 2019. Makers: Hitachi Energy (dominant, $1B+ US capacity, Virginia plant ~2028), Siemens (Charlotte, 2027), GE Vernova, Eaton. Wood Mackenzie: supply deficit ~100% (2025) -> under 10% by 2030.
- Interconnection queue: ~2.1 TW stuck (roughly 2x total US installed capacity); median wait ~4.5 years; historically only ~13% of queued capacity ever gets built (77% withdrawn), so the 2 TW is largely a mirage.
- Grid spend must roughly double: transmission >$200B/yr by mid-2030s; >$1.2T in North America + Europe by 2030.

## THE 10 / 20 / 30 SHAPE
- **~10 yrs (to 2030):** demand ~doubles (945 TWh global; US DC 9-17% of power). Solar+storage carries volume; gas carries firm load but is sold out; transformers are the equipment chokepoint. SMR/geothermal small (~0.5-1 GW).
- **~20 yrs (to ~2045):** SMRs scale to multi-GW; geothermal replicates; CFS fusion ~400 MW if physics holds; solar+storage compounds as firm-ish power at <$60/MWh. Constraint eases from equipment to transmission PERMITTING (the thing money can't fix fast).
- **~30 yrs (to ~2050+):** fusion could become material if it proves out; SMRs and enhanced geothermal mature into standard firm-clean fleets; gas persists as flexible backup.

## Chokepoint players
GE Vernova, Siemens Energy (turbines) - Hitachi Energy (transformers) - Oklo, X-energy, Kairos, NuScale (SMR) - [[Helion]], Commonwealth Fusion (fusion) - Fervo Energy (geothermal).

## Bear case
Efficiency (Jevons paradox) could soften the demand curve; possible DC oversupply from ~2027; forecast dispersion is huge (EPRI US 2030 range is 2x wide) and interconnection queues are double-counted, so headline GW overstates what gets built; permitting and transmission build-time is the durable wall no factory investment fixes.

## Key sources
- IEA Energy and AI: https://www.iea.org/reports/energy-and-ai/energy-demand-from-ai
- Goldman (165% DC power by 2030): https://www.goldmansachs.com/insights/articles/ai-to-drive-165-increase-in-data-center-power-demand-by-2030
- EPRI Powering Intelligence: https://powering-intelligence.epri.com/executive-summary.html
- Grid Strategies National Load Growth 2025: https://gridstrategiesllc.com/wp-content/uploads/Grid-Strategies-National-Load-Growth-Report-2025.pdf
- Deloitte (123 GW AI by 2035, via DCD): https://www.datacenterdynamics.com/en/news/ai-data-center-power-demand-could-soar-to-123gw-by-2035-report/
- GE Vernova turbines sold out (Utility Dive): https://www.utilitydive.com/news/ge-vernova-gas-turbine-investor/807662/
- S&P Global (turbine lead times 5-7 yrs): https://www.spglobal.com/energy/en/news-research/latest-news/electric-power/052025-us-gas-fired-turbine-wait-times-as-much-as-seven-years-costs-up-sharply
- LBNL interconnection queue: https://emp.lbl.gov/queues
- BloombergNEF solar/battery LCOE (via pv magazine): https://www.pv-magazine.com/2026/02/23/solar-lcoe-to-fall-30-by-2035-says-bloombergnef/
- pv magazine USA transformer lead times: https://pv-magazine-usa.com/2026/05/11/u-s-transformer-market-faces-severe-supply-constraints-as-lead-times-extend-to-four-years/

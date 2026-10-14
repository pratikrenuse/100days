# TSMC CoWoS (advanced packaging)

#player
**Proves:** [[The Bottleneck Slides Down the Stack]]
**Awareness:** Obscure chokepoint inside a mainstream company (everyone knows TSMC makes chips; almost nobody knows the constraint is the step where finished chips get stitched together)

## One line
The packaging step inside TSMC, where finished AI chips and their memory get bonded onto one slab of silicon, and the step TSMC itself now names as the bottleneck of the whole AI buildout.

## The chokepoint it owns
CoWoS (Chip-on-Wafer-on-Substrate). A modern AI accelerator is not one chip: it is a processor die plus stacks of HBM memory placed micrometers apart on a silicon interposer. That bonding step has its own factories, its own tools, and its own multi-year capacity ramp, separate from the famous transistor fabs. Nvidia, AMD, and every custom-ASIC program all queue for the same CoWoS lines. You can design a chip in nine months; you cannot conjure a packaging line to assemble it.

## Key facts (dated)
- TSMC's Q2 2026 (reported July 16): revenue $40.2B, up 36% YoY; net profit up 77.4% to NT$706.56B, a single-quarter record; gross margin 67.7%. Full-year AI revenue growth outlook raised past 40%. (July 16, 2026, earnings coverage)
- CoWoS named the primary bottleneck in AI chip production; capacity expanding ~80% per year: ~35,000 wafers/month end-2024, ~75,000 end-2025, target 125,000 to 130,000 by end-2026. (July 16, 2026)
- 2026 capex raised to $60B to $64B (from $52B to $56B), with management signaling AI demand sustains through at least 2029 to 2030. (July 16, 2026)
- Arizona commitment lifted to $265 billion on July 17, with four fabs targeting the AI packaging bottleneck. (July 17, 2026, TechTimes)
- The supply-demand gap is narrowing but not closed: seen going from ~20% to ~10% by end-2026 as capacity ramps. (TrendForce, June 15, 2026)
- Demand context: the four biggest tech firms are spending $725B on AI this year (2026), and every accelerator they buy passes through this one step. (Exponential View, June 2026)
- **It is now buying packaging capacity secondhand.** Supply-chain sources say TSMC is negotiating to acquire **two existing display-panel plants** to expand CoWoS capacity, at a transaction value potentially exceeding **NT$30 billion (about $930M)**. The logic is time rather than money: existing cleanrooms and power infrastructure shorten the packaging ramp against building new. TSMC is also reported to be restarting its Longtan expansion, potentially up to three fabs including A14 1.4-nanometre capacity. The caution worth keeping: added floor space is not added output if bonding equipment, testing capacity or HBM supply lag. (Reported August 10, 2026)
- **The demand behind it, in monthly form.** July 2026 revenue was **NT$467.58 billion, roughly $14.5 billion, up about 45% year over year**, and TSMC raised its 2026 dollar-denominated revenue growth outlook to **more than 40%**. (Barron's via TechStartups, August 10, 2026)

## Why it matters for the future
The bottleneck thesis in one company: the world's most famous chipmaker posts a record quarter and spends the announcement pointing at its least famous process step. When transistors stopped being the constraint, the constraint did not disappear, it moved to the assembly of chips into systems. The 10 to 20 year read: packaging keeps absorbing more of the value of a "chip" (the interposer, the stacking, eventually optical connections bonded in the same step), and the countries and companies that control assembly capacity matter as much as those that control lithography.

## Awareness watch
The company is as mainstream as it gets; the packaging layer is still obscure. If "CoWoS" starts appearing in general financial press the way "HBM" did before the SK Hynix listing, the hook is burning: drop one rung to packaging equipment makers or glass substrates.

## Used in
Lead for this week's story: "TSMC Packaging" (Content Engine/Ready to Ship, 2026-07-21). Do not reuse TSMC packaging as a lead. (Note: Broadcom's custom-ASIC line was a separate lead on 2026-07-07; the two stories share the custom-chip context but different players.)

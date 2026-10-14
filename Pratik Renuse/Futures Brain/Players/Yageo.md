# Yageo

#player
**Proves:** [[The Bottleneck Slides Down the Stack]]
**Awareness:** Obscure (a Taiwanese passive-component maker; buyers in electronics procurement know it intimately and nobody else has heard of it)

## One line
The part that costs a fraction of a cent is now the third most expensive thing in an AI server, and customers are paying triple to get it.

## The chokepoint it owns
Multilayer ceramic capacitors. A capacitor is the least glamorous component in electronics: a tiny stack of ceramic layers that smooths the flow of electricity so a chip does not brown out when its power draw spikes. A modern AI server board needs tens of thousands of them, and the high-capacitance, high-reliability grades that AI accelerators require come from a handful of makers running flat out. The chokepoint here is not a material and not a design. It is **line time**. A new high-end MLCC production line takes 18 to 24 months to build and qualify, and that number does not compress no matter what a buyer offers.

## Key facts (dated)
- **Customers are paying two to three times market price** to secure supply from Yageo, Murata and others, on agreements running from six months to several years. Smaller customers risk being crowded out entirely. (404K SEMI-AI brief, August 10, 2026)
- **MLCCs are now the third-largest line item in an AI server bill of materials**, behind only GPUs and memory. (2026 trade estimates, surfaced August 2026)
- **Capacity is maxed.** The top five MLCC manufacturers are running at **90% to 95% utilisation**. (2026)
- **New supply is two years out.** Building a new high-end MLCC line takes **18 to 24 months**. Murata, Samsung Electro-Mechanics and Taiyo Yuden have all announced expansions, but meaningful volume from those lines is not expected **before late 2027**. (2026)
- **Yageo went to direct customers.** From **July 1, 2026**, Yageo launched its broadest capacitor price adjustment in years, covering MLCCs, aluminium electrolytic, tantalum, polymer aluminium, film capacitors and supercapacitors. It was the first time Yageo raised MLCC prices for **direct customers** rather than distributors alone. Official increases ran around 50%, with some high-end spot models moving far more sharply since May 2026. (openPR / trade coverage, July to August 2026)
- **Demand is concentrated where substitution is hardest.** AI server and automotive-grade demand sits in high-capacitance, high-reliability parts, exactly the grades with the longest qualification cycles. (August 10, 2026)
- **Adjacent confirmation the constraint is real:** AI server printed circuit boards are estimated to grow from $13B in 2026 to $29B in 2027, with PCB content per Vera Rubin GPU around $750 against roughly $400 for GB200. The board and everything on it is inflating alongside the chip. (August 10, 2026)

## Why it matters for the future
This is the purest example of the thesis so far. Nothing about a ceramic capacitor is scarce in principle: the materials are common, the physics is a century old, the part costs almost nothing. It is scarce because the specific lines that make the good ones are full, and because qualification takes longer than the AI cycle. The 10-year read is that as accelerators consolidate onto a few designs, the components with the longest qualification cycles capture disproportionate margin, so the winners in AI hardware include several companies whose products are individually worth less than a cent. The 20-year read is about resilience: an industry where the cheapest part has the longest lead time is an industry that can be halted by something nobody modelled. Watch whether any hyperscaler starts contracting for MLCC **line time** rather than for parts, the same way they now contract for memory by deposit. That would be the moment the passive layer stops being procurement and becomes strategy.

## Awareness watch
Obscure. Triggers to move it: an AI server maker naming passive components as a shipment constraint on an earnings call, a mainstream story about capacitor shortages delaying an AI product, or Murata and Samsung Electro-Mechanics accelerating their expansion timelines. Note the honest caveat: MLCC markets are famously cyclical and have crashed after every previous shortage, so treat late 2027 new capacity as the risk date for this story, not just the relief date.

## Related
[[The Bottleneck Slides Down the Stack]], [[TSMC CoWoS]], [[AXT]], [[Astera Labs]]

## Used in
Lead for the story "Yageo - The Cheapest Part in the Machine" (Content Engine/Ready to Ship, 2026-08-11). Do not reuse as a lead.

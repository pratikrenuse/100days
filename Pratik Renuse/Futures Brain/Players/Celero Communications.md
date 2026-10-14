# Celero Communications

#player
**Proves:** [[The Bottleneck Slides Down the Stack]] (primary), [[Energy is the Ceiling]] (secondary, and the secondary is the interesting one)
**Awareness:** Obscure (an Irvine chip company most AI coverage has never mentioned, in a product category that has no consumer-facing name)

## One line
AI outgrew the building, so the data centres got stitched together across a hundred miles of glass, and this company makes the chip that holds the stitch.

## The chokepoint it owns
Coherent digital signal processors. When two data centres are linked by fibre that runs more than 100 miles, a coherent DSP is the part that makes the link work. It does three jobs that all get harder with distance and speed:

1. **It drives the transceivers.** Data sits in a machine as electricity and has to become light to travel down fibre, then become electricity again at the far end. Coherent DSPs manage that conversion at both ends.
2. **It recovers timing.** Many workloads need to know when an inbound request was created. The simple way is to run a second physical link just for timing signals, which adds hardware and cost. A coherent DSP extracts timing from the data link itself.
3. **It repairs the damage.** Light disperses and dims as it travels down a fibre, so some of the data arrives corrupted. The DSP adds redundancy bits that let the receiver reconstruct what was lost.

None of that is new. What is new is that it now has to be done at AI bandwidths and AI power budgets, and the existing parts were designed for telecom.

## Key facts (dated)
- **The round.** $275M Series C at a valuation **above $3B**, announced **September 8, 2026**. Led by Alphabet's **CapitalG**, Atreides Management and Valor Equity Partners, with returning backers Sutter Hill Ventures and Maverick Silicon. Total funding to date roughly $413.4M. (SiliconANGLE / Business Wire, September 8, 2026)
- **The technical event the round was attached to.** Validation of what the company calls the **industry's first 2nm coherent DSP silicon**, including the DSP processing and the advanced analog circuitry that connects to the optical hardware. TSMC's 2nm node delivers roughly 15% better performance than its predecessor. (Business Wire, September 8, 2026)
- **Speed.** The 2nm design supports **1.6T through 3.2T** interconnects, up to 3.2 terabits per second per port. Today's AI networks run significantly slower, so this is a forward part rather than a current one.
- **The scope claim that matters.** Celero says the same coherent DSP covers long-haul links **between** data centres and also **scale-up** networking (chips inside one rack) and **scale-out** networking (rack to rack). If that holds, one part family spans three network tiers that have historically used different silicon.
- **Who runs it.** Co-founder and CEO **Nariman Yousefi**: "AI infrastructure is rapidly outgrowing the capabilities of traditional optical interconnect architectures." Based in Irvine, California. (Crunchbase lists Laguna Beach; the company's own materials say Irvine.)
- **Under the hood.** The chip pairs conventional digital transistors with analog circuitry, the analog half being what interfaces to the optical hardware. That mixed-signal design at 2nm is the hard engineering claim.
- Proceeds are earmarked for product development and the manufacturing roadmap.

## Why it matters for the future
The reason this is not just another networking-chip round is **why** the links are getting longer. Hyperscalers are not spreading compute across counties because distributed systems are elegant. They are doing it because no single site can get enough power. [[Eaton]]'s 307 GW US backlog, Governor Abbott's August 3, 2026 pause on new Texas grid connections, and Microsoft's admission on September 10, 2026 that it turned away business for lack of capacity all describe the same wall. When you cannot make one campus bigger, you make several campuses act like one, and the link between them stops being plumbing and becomes the machine.

The 10-year read: the AI data centre stops being a building and becomes a region. Training and inference jobs routinely span sites far enough apart to sit on different substations, different counties and eventually different states, and the figure of merit shifts from megawatts per site to megawatts per region plus the quality of the fibre between them. That upgrades long-haul optical component makers into core AI infrastructure and downgrades the strategic value of any single enormous permitted campus.

The 20-year read: if the compute is already spread over hundreds of miles of glass, the marginal extra distance to somewhere with better power or better cooling becomes a pricing question rather than an architectural one. That is the same logic that makes the orbital bets in [[Compute and Resources Become Geopolitics]] less absurd than they sound, and it runs through this layer.

## Awareness watch
Obscure. Triggers to move it: a named hyperscaler design win, a public disclosure of a single training run executed across sites more than 100 miles apart, or an IPO filing. CapitalG on the cap table is a soft signal that Google has a view here.

## The honest risk
Validated silicon is not shipped silicon, and 3.2T ports are ahead of what current AI networks use, so the addressable demand is partly a forecast. The incumbents in coherent DSP are large and well capitalised, and [[Astera Labs]] arrived on the optical rung in August 2026 via the aiXscale acquisition. The scale-up and scale-out claim, one part family covering three network tiers, is a company claim and has not been independently demonstrated.

## Related
[[The Bottleneck Slides Down the Stack]], [[Energy is the Ceiling]], [[Astera Labs]], [[Ayar Labs]], [[AXT]], [[Eaton]]

## Used in
Lead for the story "Celero - The Data Centre Got Too Big for the Building" (Content Engine/Ready to Ship, 2026-09-15). Do not reuse as a lead.

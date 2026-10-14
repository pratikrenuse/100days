# Cornelis Networks

#player
**Proves:** [[The Bottleneck Slides Down the Stack]] (primary)
**Awareness:** Obscure (covered only in enterprise infrastructure trade press; no consumer-facing name for what it sells, and the thing it actually does is understood by almost nobody outside data-centre networking)

## One line
Half the AI hardware on earth sits idle waiting for data, so this company put the computer inside the wire.

## The chokepoint it owns
Not a chip and not a material. The **fabric**, which is the set of links and switches tying thousands of accelerators into one machine, and specifically the idea that the fabric should do work rather than just carry data.

Every previous motion in this thesis moves the constraint to a different place: down a layer, sideways into a split workload, around the scarce part, under the industry into raw materials, behind it into the tools. Cornelis argues the constraint should be **absorbed**. If the network can combine partial results, compress gradients and assemble caches while the data is already in flight, that work never reaches an accelerator and never needed one.

The mechanism, plainly. In a large AI job, thousands of chips repeatedly have to agree on a number. Every chip computes a piece, sends it, waits, and receives the combined answer. Traditional networks forward those thousands of separate contributions untouched and let the chips do the combining, twice, at both ends. Cornelis's **Active Compute Fabric** does the combining inside the network, so one reduced result arrives instead of thousands of separate ones. Its CMO put it exactly: "The payload does not arrive the way it left."

Specifically, the fabric assembles KV cache data for disaggregated inference, coordinates expert dispatch for mixture-of-experts models, runs collective operations such as AllReduce, and compresses gradients in transit.

## Key facts (dated)
- **The round.** **$205M**, announced **September 14, 2026**, led by **IAG Capital Partners**. Announced together with the Active Compute Fabric architecture and a **strategic collaboration with Qualcomm**, both unveiled ahead of the AI Infra Summit in Santa Clara. Capital goes to scaling CN5000 and CN6000 production and to deploying Active Compute Fabric. (SiliconANGLE / Network World / Crunchbase, September 14 to 18, 2026)
- **Where it came from.** The **Omni-Path team spun out of Intel in 2020**. Omni-Path was Intel's proprietary high-performance interconnect, an alternative to InfiniBand and Ethernet. Wayne, Pennsylvania. CEO **Lisa Spelman**; CMO Brandon Draeger.
- **Who it competes with.** Cisco and Arista among established vendors, and Nvidia's networking stack, which is the real contest.
- **The numbers, and what kind of numbers they are.**
  - **Up to 50% reduction in network traffic.** This is from **Cornelis's own pre-production simulations** and must be described that way. It is not an independently measured result.
  - **Accelerator utilisation in large AI deployments commonly sits near half of installed capacity.** Stated by the company as an industry condition; consistent with widely reported MFU figures, but treat as directional.
  - **The network is roughly 15% of the cost of an AI system** while determining the return on the other 85%. Company framing, and the single most useful sentence in the announcement.
- **Products and dates.** **CN5000** switch shipping at **400 Gbps**, first generation of standalone products shipped in 2025. **CN6000**, multi-protocol at **800 Gbps**, broader availability expected **Q4 2026**.
- **Standards posture.** Built on open standards: **Ethernet and UALink** for scale-up, **Ultra Ethernet** for scale-out. This matters commercially, because the pitch is an open alternative to a single-vendor rack, and it matters strategically, because a proprietary version of this idea would be a feature and an open one is a market.

## Why it matters for the future
The 10-year read. The industry has spent three years answering "we need more compute" by buying more compute. The gap between installed and used capacity is the largest unpriced asset in AI infrastructure, and nothing in the supply chain currently competes for it. If the fabric can recover a meaningful share of a roughly 50% utilisation gap for a 15% line item, then the cheapest new accelerator in the world is the one a company already owns. Expect the metric hyperscalers publish to shift from how many chips they installed to how many they actually used, and expect networks to start being sold on utilisation rather than on bandwidth per port.

The 20-year read. If computation migrates into the network, the boundary between "processor" and "interconnect" stops being meaningful, and the machine becomes one distributed object with no obvious centre. That has a direct consequence for [[Energy is the Ceiling]]: work done once in transit is work not done twice at the endpoints, so the efficiency gain is a power gain, and power is the thing nobody can buy. It also has a consequence for this thesis itself. Every chokepoint owner's pricing power assumes demand for the scarce part keeps rising. A fabric that deletes demand is a different kind of threat than a competitor that supplies it.

## Awareness watch
Obscure. Triggers to move it: the Qualcomm collaboration converting into a named rack-scale product; any independent benchmark of the traffic-reduction claim; a hyperscaler publicly designing around Active Compute Fabric; or an incumbent (Nvidia, Broadcom, Arista) shipping in-fabric compute of its own, which would mainstream the category overnight.

## The honest risk
Three. First, **every performance number here is a company simulation on pre-production silicon.** Nothing has been independently measured. Second, in-network computing is not a new idea; Nvidia has shipped SHARP in InfiniBand switches for years, so the claim is about scope and openness rather than novelty, and that is a harder claim to defend. Third, this is a small company selling against Nvidia's integrated rack at the exact moment buyers are prioritising delivery speed over architectural elegance. Open standards are the bet, and open standards have lost this fight before.

## Related
[[The Bottleneck Slides Down the Stack]], [[Astera Labs]], [[Celero Communications]], [[Ayar Labs]], [[Cerebras]], [[Energy is the Ceiling]]

## Used in
Lead for the story "Cornelis Networks - The Wire Learned to Think" (Content Engine/Ready to Ship, 2026-09-22). Do not reuse as a lead.

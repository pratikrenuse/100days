# OLIX

#player
**Proves:** [[The Bottleneck Slides Down the Stack]]
**Awareness:** Obscure (two years old, first major funding announcement August 3, 2026, essentially unknown outside chip and photonics circles)

## One line
A two-year-old London company raised three hundred million dollars to build an AI chip that deliberately does not use the two parts everyone else is fighting over.

## The chokepoint it owns
It does not own one. That is the point, and it is a new move for this thesis. Every other player here supplies a chokepoint: [[SK Hynix]] sells the memory, [[TSMC CoWoS]] sells the packaging, [[Astera Labs]] sells the wiring. OLIX is the first funded attempt to design the chokepoint out of the machine. Its DX-1 decode chip holds the model in on-chip SRAM and uses no high-bandwidth memory and no advanced packaging, and the company says plainly that this is a supply-chain decision: those are the two components the industry is shortest of. If it works, the chokepoint owner's pricing power is capped by architecture rather than by new capacity, which is a much faster ceiling than building a fab. If it does not work, it is the strongest evidence yet that the chokepoint is physics and not a queue.

## Key facts (dated)
- Series B of EUR 270.5M (about $312M) at a EUR 2.8B (about $3.3B) valuation, announced August 3, 2026. Investors: Fundomo, Arm and Hudson River Trading, with all existing investors increasing their commitments. Reed Hastings, Netflix co-founder, participated as an angel. (EU-Startups, August 3, 2026)
- Founded in London in 2024. Roughly two years old at the time of the round. (August 3, 2026)
- Nick McKeown, Stanford professor emeritus and 2025 Marconi Prize winner, joined the board. Former Wise executive Matt Briers joined as CFO. (August 3, 2026)
- The product framing: a data centre is a factory whose product is a token, and producing one token takes hundreds of operations with different hardware demands. Any other factory would give each stage its own machine. The industry runs every stage on the same general-purpose chip. The X-1 platform unrolls a model across many chips so each one handles a single stage, like a production line. (Company statement, August 3, 2026)
- DX-1 is the first chip in the platform, a decode accelerator for the stage where a model generates its output. Claimed over 10,000 tokens per second per user on 100B-parameter models, at higher output tokens per watt than general-purpose chips running large batches. Company figures, not independently benchmarked. Architecture stated to scale to models above 10 trillion parameters. (August 3, 2026)
- Chips are linked by a "slow and wide" optical interconnect that moves data between them using light instead of copper, with rack-scale codesign of the whole link and a fully deterministic compiler scheduling work across racks. (August 3, 2026)
- Deliberately uses **no advanced packaging and no high-bandwidth memory**, the two components in shortest supply, so volume can scale despite industry shortages. (August 3, 2026)
- Each chip keeps a flexible compute fabric and does not hard-code a model architecture, which is the explicit hedge against the risk that sank fixed-function bets. Contrast with [[Etched]], which takes the opposite side. (August 3, 2026)
- First customer deliveries targeted H2 2027. Hiring across silicon, photonics, compiler and systems engineering in London, Bristol, Austin, Toronto and San Francisco. (August 3, 2026)

## Why it matters for the future
This is the first company in the brain whose business plan is a bet against scarcity rather than on it. Read the two chip stories of the last three weeks together and the shape of the decade appears: [[Etched]] says the workload froze, so build the least flexible chip possible; OLIX says the workload has stages, so build a different chip for each one and keep the fabric flexible. Both agree the general-purpose processor is the wrong unit. Neither is betting on more memory. If OLIX ships in H2 2027 and the numbers survive an independent benchmark, the 10 to 20 year read is that inference stops being sold by the chip and starts being sold by the stage, and the memory chokepoint that has defined 2025 and 2026 turns out to have been an artefact of one architecture rather than a law.

## Awareness watch
Obscure and worth using now. Triggers that would move it: an independently benchmarked DX-1 result, a named customer, or any incumbent announcing a no-HBM inference part. A tape-out slip past H2 2027 is the signal to downgrade rather than promote.

## Used in
Lead for the story "OLIX - The Chip That Refuses to Queue" (Content Engine/Ready to Ship, 2026-08-07). Do not reuse as a lead.

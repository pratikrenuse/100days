# Fab2

#player
**Proves:** [[The Bottleneck Slides Down the Stack]] (primary)
**Awareness:** Obscure (known inside chip-nerd circles because Jim Keller's name is on it, essentially unknown outside them, and the thing it actually sells is understood by almost nobody)

## One line
Everyone is queueing for space in someone else's chip factory, so this company decided to mass-produce the factory.

## The chokepoint it owns
Not a chip. Not a material. The **tools and the factory itself**. Every previous chokepoint this brain has tracked, packaging, memory, interconnect, substrates, capacitors, eventually needs the same thing to be relieved: more fab. And more fab means more machines, from a handful of suppliers, on multi-year lead times. Fab2 is trying to take that layer and make it reproducible.

The model is what the company calls a "fab fab", a factory that mass-produces small semiconductor fabs and the tools inside them. Fab2 designs and builds every tool in house: pumps, valves, gas lines, lithography, and the vacuum chambers that house it. It assembles components into machines, machines into complete fabs, and then aims to mass-produce the fabs. The software half is Studio, an in-browser collaborative EDA tool for layout, schematic and simulation.

The target is not a 300mm wafer line. It is small, software-defined fabs that pattern chips far smaller than a wafer and turn prototypes around in hours.

## Key facts (dated)
- **The round.** $500M Series A at a **$3.7B valuation**, announced **September 9, 2026**. Led by Fundomo, with Corner Capital, Paradigm, Duquesne Family Office, Maverick Silicon, StepStone Group, Protagonist and UDC Ventures. Naval Ravikant as an angel. This is the company's **first disclosed round**. (Dealroom News / WOWTALE, September 9, 2026; Crunchbase weekly roundup, September 11, 2026)
- **Prior capital, for scale.** A reported $15M seed in 2023 led by the OpenAI Startup Fund at roughly a $100M valuation, with angel backing from Naval Ravikant, Nat Friedman and Fred Ehrsam. From roughly $100M to $3.7B in three years. (Tom's Hardware, July 5, 2026)
- **Who built it.** Founded 2022 by **Jim Keller**, the chip architect behind AMD's Zen, Apple's A4 and A5 and Tesla's Autopilot silicon, and **Sam Zeloof**, who fabricated lithographic chips down to roughly 300nm features in his parents' garage as a teenager. The garage is the proof point, not a biography detail: it is the claim that a fab can be small.
- **Where it is.** Three sites. A 120,000 sq ft Austin headquarters for research and production, a 30,000 sq ft Lockhart, Texas site housing the fab fab itself, and the original 25,000 sq ft San Francisco garage fab. Roughly 84 employees as of May 2026 (Tracxn). The rebrand from Atomic Semi and the move from California to Texas happened **July 5, 2026**, before this round and outside this brain's evidence window.
- **The honest limit, stated in the reporting.** Electron-beam lithography writes patterns directly rather than projecting them through a mask, which makes it slow. A single patterning step on a small chip can take far longer than an EUV scanner needs to expose an entire 300mm wafer. That tradeoff suits prototyping and low-volume runs, not high-volume commercial foundry work. Fab2 is not currently a competitor to TSMC for AI silicon and should never be described as one. (Tom's Hardware, July 5, 2026)
- **The contrast that frames it.** Tesla and SpaceX announced Terafab in March 2026, a single Austin megafab targeting a terawatt of annual compute at a cost of up to $119B. Fab2 sits a few miles away selling the opposite answer: many small replicable fabs instead of one enormous one. They are not competitors. They are two answers to the same question about how a country adds chipmaking capacity.

## Why it matters for the future
The 10-year read is not that Fab2 makes AI chips. It is that prototyping silicon stops being a capital decision and becomes a scheduling decision. Today, designing a novel chip means finding a foundry slot, which means only well-funded companies attempt novel silicon, which is a large part of why the industry converged on a handful of architectures. If a small fab can be bought rather than begged for, the number of organisations that can try a strange chip goes up by an order of magnitude, and the hit rate on weird architectures goes up with it. Every "around the chokepoint" bet in this brain, [[OLIX]], [[Positron AI]], [[Etched]], exists because someone got access to fabrication. Cheapen that access and you get more of them.

The 20-year read is the uncomfortable one. Chip manufacturing has been geopolitically legible precisely because it concentrates: a small number of enormous, visible, taxable, sanctionable facilities. Small distributed fabs are the opposite of legible. If the unit of chipmaking capacity becomes a shipping-container-sized machine that a company can buy, then export control of chips and of chipmaking tools, the central instrument in [[Compute and Resources Become Geopolitics]], gets much harder to enforce. That is a long way off and gated entirely on throughput, but it is the reason this note exists.

## Awareness watch
Obscure. Triggers to move it: Fab2 naming a customer who shipped a commercial product from one of its fabs; any credible throughput figure that puts it within an order of magnitude of a conventional line; or a government treating small fabs as an export-control category. Jim Keller's name is the awareness fuse, because it drags coverage that the technology on its own would not get.

## The honest risk
Two. First, throughput: if direct-write lithography cannot be made fast enough, Fab2 stays a prototyping tool company with a $3.7B valuation, which is a fine business and a much smaller story than the one above. Second, Keller's track record is of starting things and moving on; the Tenstorrent question is live in the same coverage that announced this round. A first-disclosed round at $3.7B on a pre-revenue-scale thesis prices in a lot of execution.

## Related
[[The Bottleneck Slides Down the Stack]], [[TSMC CoWoS]], [[OLIX]], [[Positron AI]], [[Compute and Resources Become Geopolitics]]

## Used in
Lead for the story "Fab2 - The Factory That Makes Factories" (Content Engine/Ready to Ship, 2026-09-15). Do not reuse as a lead.

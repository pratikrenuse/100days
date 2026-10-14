# Positron AI

#player
**Proves:** [[The Bottleneck Slides Down the Stack]] (primary)
**Awareness:** Obscure (a Reno company with $1.2B raised that most AI readers have never heard of, competing in a category, inference silicon, that is getting crowded fast)

## One line
The world's scarcest component is high-bandwidth memory, so this company built its chip around the cheap memory that goes in phones instead.

## The chokepoint it owns
It does not own a chokepoint. It is trying to **make one irrelevant**, which is the second time this brain has filed that shape and the first time at this scale.

Every AI accelerator's speed is limited by how fast it can read the model's weights out of memory. The industry's answer has been high-bandwidth memory, HBM, stacked and packaged next to the compute. HBM is the single most rationed component in AI: sold out through 2027, consuming roughly three times the wafer capacity of standard DRAM per gigabyte, and the direct cause of [[SK Hynix]]'s rise, which is the story this brain published first.

Positron's bet is that you can get enough bandwidth from **LPDDR5X**, the commodity low-power memory class used in phones and laptops, if you design the whole architecture around it rather than bolting it on. Commodity memory is cheaper per gigabyte, made by more suppliers, and available in enormous quantities, so the trade is bandwidth per chip against bandwidth per dollar and against being able to buy the part at all.

## Key facts (dated)
- **The round.** **$875M at a $5B post-money valuation**, announced **September 10, 2026**. Structured as a $375M Series C followed by a Series C-1 of up to $500M. Led by **James Clark** (Netscape, Silicon Graphics) and **NEA**, with the **Qatar Investment Authority** among other investors. Total funding to date roughly **$1.2B**. Based in Reno, Nevada. (SiliconANGLE / Quartz / DCD / PR Newswire, September 10, 2026)
- **The chip.** Next-generation part is called **Asimov**. It pairs Positron's compute architecture with between **288 GB and 2,304 GB of memory per chip** using commodity LPDDR5X.
- **System scale.** Company states 2TB of memory per accelerator and **8TB per Titan system**, with memory bandwidth it describes as similar to Nvidia's Rubin GPU, and claims its systems achieve **more than 90% of available memory bandwidth**. All company figures, not independently benchmarked. Treat every one of them as a claim in any post.
- **Timeline.** Asimov tapes out on **TSMC N3P at the end of 2026**, with production targeted for **H2 2027**. So there is nothing to verify in the field for roughly a year.
- **Context on the category.** Positron is one of a growing group of chip companies attacking specific AI workloads rather than general-purpose GPUs. This brain already tracks [[Etched]] (transformer-only ASIC), [[Cerebras]] (the decode half of a split workload) and [[OLIX]] (SRAM and photonics, no HBM, no advanced packaging).

## Why it matters for the future
The pairing with [[OLIX]] is the point. On August 3, 2026, OLIX raised roughly $312M at $3.3B to escape HBM by going **up**, into on-chip SRAM and optical interconnect. Five weeks later Positron raised $875M at $5B to escape HBM by going **down**, into the cheapest memory on the shelf. Same problem, opposite directions, both funded, neither shipped. They cannot both be right, and the industry now has roughly $1.2B riding on the proposition that the memory chokepoint is an engineering choice rather than physics.

The 10-year read: inference hardware fragments by memory strategy rather than by compute architecture, and the question "what memory does it use" becomes the primary way buyers sort accelerators, the way "what process node" was in the 2010s. If commodity memory works for inference at scale, HBM's pricing power narrows to training, which is the smaller and shrinking share of total AI compute as deployment outgrows development.

The 20-year read, and it is the one worth saying out loud: the AI supply chain's most valuable chokepoints exist because everyone agreed on one architecture at the same time. Consensus is what makes a component scarce. The moment enough capital is willing to fund divergent architectures, and September 2026 is the week that became visibly true, scarcity stops being a durable moat and becomes a temporary tax on whoever did not diversify. The winners of the next decade may be the companies that were never in the queue.

## Awareness watch
Obscure. Triggers to move it: an independent benchmark of Asimov against a Nvidia part, a named cloud or lab customer, or any incumbent publicly adopting a commodity-memory inference design. A successful tape-out at end-2026 will generate a coverage spike; production in H2 2027 is the real test.

## The honest risk
Every performance number above is the company's own and unbenchmarked, on a chip that has not taped out. Commodity memory has lower bandwidth per pin than HBM by design, so "similar to Rubin" depends entirely on the system architecture around it and on comparisons the company chose. The category is crowded and well funded, and Nvidia's roadmap does not stand still for a year. Valuation of $5B on a pre-tape-out part with an H2 2027 production date is a bet on the thesis, not on the product.

## Related
[[The Bottleneck Slides Down the Stack]], [[SK Hynix]], [[OLIX]], [[Etched]], [[Cerebras]], [[Fab2]]

## Used in
Lead for the story "Positron - The Chip That Uses Phone Memory" (Content Engine/Ready to Ship, 2026-09-15). Do not reuse as a lead.

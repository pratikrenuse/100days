# Astera Labs

#player
**Proves:** [[The Bottleneck Slides Down the Stack]]
**Awareness:** Building (semis investors know the ticker; almost nobody outside that world has heard of it, and few connect it to the next bottleneck)

## One line
The company that makes the plumbing between AI chips, the retimers and fabric switches that let thousands of GPUs talk to each other fast enough to act like one machine.

## The chokepoint it owns
Scale-up interconnect. Once memory (HBM) and packaging (CoWoS) stop being the tightest constraint, the next wall is moving data between accelerators inside a rack and across racks without latency killing the cluster. Astera builds the PCIe and CXL retimers, smart fabric switches (Scorpio), active cables and the telemetry software (COSMOS) that hold a giant GPU cluster together. It is the literal wiring the [[The Bottleneck Slides Down the Stack]] thesis names as the rung after memory.

## Key facts (dated)
- Q1 2026 revenue $308.4M, up 93% year over year and 14% sequentially; Q2 2026 guide $355M to $365M; growth led by the PCIe 6 portfolio. (reported May 5, 2026, Astera IR)
- Now sells more than $1,000 of connectivity silicon per accelerator (XPU), and rising as racks add switches and retimers. (Q1 2026 call)
- Building custom NVLink Fusion devices with Nvidia and a hyperscaler; revenue expected FY2027. (Q1 2026 call)
- Scorpio X-Series 320-lane smart fabric switch ramps into production in 2H 2026; Scorpio P-Series PCIe switches span 32 to 320 lanes. (May 2026, SiliconANGLE)
- Joined the Nasdaq-100 effective June 22, 2026, removed from the Russell 2500 and Russell 2500 Growth. Index inclusion forces every Nasdaq-100 tracker to buy the name regardless of price. (June 22, 2026; StocksToTrade / TimothySykes)
- Sell-side repriced the interconnect rung in days: BofA raised its target to $450 from $240 and Stifel to $460 from $260, both on June 23, 2026. Stock ran from ~$318 earlier in June to the high $400s, up 14.37% on June 29, 2026.
- Announced an expansion of its Taiwan operations and Cloud-Scale Interop Lab, deepening engineering coordination with ODM and hyperscaler supply chains. (announced early July; StorageNewsletter, July 6, 2026)
- The post-inclusion debate went two ways in the same week: UBS raised its target to $400 (Neutral, on the CXL opportunity) while Northland downgraded to Market Perform on valuation; director Manuel Alba sold ~$60.5M of stock July 1 under a pre-set 10b5-1 plan. (July 1 to 6, 2026)
- First real volatility test: fell ~11.5% on July 7 to $382.89 in a broad AI/semis selloff, on no company news. Q2 earnings call set for August 4 (announced July 8). The 93% growth framing still dominates coverage of the insider sale. (July 7 to 12, 2026, TIKR / GlobeNewswire / Motley Fool)
- The slide deepened into a six-day run: cumulative loss ~27.3%, erasing about $19B of market value and leaving the company near $52B, still with no guidance cut, lost customer, or product delay. The Aug 4 earnings call is now the referendum on whether the interconnect story holds its multiple. (through July 19, 2026, Trefis / Motley Fool)
- Another leg down: fell 10.82% on July 24, 2026 to close at $291.58, roughly 40% off the highs, attributed to a broad semis pullback, reported institutional stake reductions and valuation concerns ahead of earnings. Still no company announcement; the last release was the July 8 notice scheduling the call. Q2 results after the close on Tuesday, August 4. (July 23 to 24, 2026, QuiverQuant / Motley Fool / TIKR)
- **The referendum came back clean. Q2 2026, reported August 4, 2026:** record revenue $392.4M, up 27% sequentially and 104% year over year, with a record quarter for the Aries line. Non-GAAP diluted EPS $0.80 against $0.69 consensus, an eighth consecutive beat. Non-GAAP gross margin 73.7% against 73% guidance. **Q3 guidance is the headline:** revenue $540M to $560M against $418.2M consensus, EPS $1.16 to $1.21 against $0.80 consensus. Scorpio-X is now expected to pass Scorpio-P and become the largest product family in Q3, a full quarter earlier than previously guided. Taurus expanded to 3.2T Smart Retimers and Redrivers for 224G Ethernet and UALink, the first OCP standard-footprint compatible design enabling Smart Swap. Stock slipped about 1.3% after hours on a large two-week run-up into the print. (Astera Labs IR / GlobeNewswire / Zacks / ChartMill, August 4 to 5, 2026)
- **It bought its way onto the light rung.** Following the acquisition of **aiXscale**, Astera's product scope has expanded from electrical interconnect (PCIe, CXL) into **optical I/O and co-packaged optics**. This brain's own Astera post forecast the copper-to-light shift and named [[Ayar Labs]] as the rung after; Astera has now moved onto that rung itself rather than ceding it. The open question is revenue: an acquisition is not a design win, and this still depends on customer validation and the pace of mass production. Note the constraint it inherits with the move: optical modules need indium phosphide lasers, which is now the tightest input in the chain (see [[AXT]]). (404K SEMI-AI brief, August 10, 2026)
- Read on the six-week drawdown this brain tracked from late June: it carried no company signal. Roughly 40% came off the price with no guidance cut, no lost customer and no product delay, and the next print guided 30% above consensus. Logged as a discipline note: price movement on no company news is not evidence for or against a thesis. (August 4, 2026)

## The mechanism (why interconnect is the next wall)
- A single Blackwell GPU wants ~1.8 TB/s of bandwidth to its neighbours (NVLink 5); the next generation pushes toward ~3.6 TB/s (NVLink 6). A PCIe 5.0 slot tops out near 128 GB/s, more than 10x slower. (2026)
- At ~3.6 TB/s, a copper cable carries the signal under ~1 metre before it degrades, which forces a shift to optics inside the rack. (2026)
- Co-packaged optics are ~0.5% of AI optical modules in 2026, forecast to reach ~35% by 2030 (TrendForce). The copper-to-glass transition is the rung after this one.
- Proof the value is migrating to the network: Nvidia's networking unit hit ~$31B in FY2026 ($11B in Q4 alone), making a "GPU company" the largest data-center switch vendor on earth, ahead of Cisco. (FY2026)
- Nvidia's next platform is built around the same two walls: Vera Rubin triples per-GPU memory bandwidth to 22 TB/s (HBM4) and doubles rack-scale interconnect to 260 TB/s (NVLink 6). Memory, then the wiring between chips, are what the roadmap is engineered around. (June 27, 2026, TechTimes)

## Why it matters for the future
In a 100,000-GPU cluster, keeping every chip fed is harder than the math itself, so the scarce, priced layer becomes the fabric that moves data, not the processor doing the sums. The clearest 10-to-20-year read: "buying compute" turns into "buying bandwidth," and the handful of firms that own the interconnect collect a toll on the data passing through, without ever shipping a GPU. Astera is one of three or four names positioned on that rung today.

## Awareness watch
Promoted as the fresh hook for the Bottleneck thesis below SK Hynix and TSMC. It did get a hard dated catalyst this week: Nasdaq-100 inclusion (June 22, 2026) plus near-doubling of sell-side targets in a single session (June 23). That is the market repricing the interconnect rung, yet the public still cannot name the company, so the hidden-player hook holds. Awareness still Building, not mainstream. Watch optical interconnect (co-packaged optics) as the rung after this one: the obscure name there is [[Ayar Labs]] (optical I/O chiplets). If Astera becomes a household financial-press name, drop to that rung for the next fresh hook. Heat check, week of July 7, 2026: bulls and bears now argue about it in public (UBS up, Northland down, insider selling headlines), which is the early stage of mainstreaming. Still Building, but trending; re-check next run.

## Used in
Draft: [[1 Astera Labs - The Wiring Between the Chips]] (2026-06-30, reworked to v3 on the June 22 catalyst, not yet published). Reserved as this week's lead, do not reuse as a lead.

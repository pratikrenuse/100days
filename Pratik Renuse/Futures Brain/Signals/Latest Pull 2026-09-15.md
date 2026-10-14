# Latest Pull 2026-09-15

Window: September 5 to September 15, 2026. Last run closed August 11, 2026, so there is a five-week gap in the record. The freshness rule still governs: only items published in the last 7 to 10 days are used as evidence. Anything between August 12 and September 4 is out of window and is not filed, which is recorded here honestly rather than backfilled.

Method note: `web_fetch` remains provenance-gated, so no RSS URL could be called directly. Every Tier 1 feed was covered by dated search against its publisher. Three direct fetches cleared provenance because their URLs surfaced through search, and they carried most of this run's signal: Crunchbase's weekly funding roundup for September 5 to 11 (published September 11), SiliconANGLE's Celero piece (September 8), and Tom's Hardware's Fab2 profile (July 5, used only for background, not as in-window evidence).

---

## The week in one line

Three separate companies were funded in seven days to **escape** the AI supply chokepoints rather than supply them. The "design around the chokepoint" tripwire written on August 7 fired three times in a single week.

---

## Tier 1 and search sweep: items kept

### The Bottleneck Slides Down the Stack

**1. Fab2 raised $500M Series A at $3.7B. September 9, 2026.**
- Formerly Atomic Semi. Founded 2022 by Jim Keller (AMD Zen, Apple A4 and A5, Tesla Autopilot silicon) and Sam Zeloof, who fabricated lithographic chips down to roughly 300nm features in his parents' garage as a teenager.
- Led by Fundomo. Other investors: Corner Capital, Paradigm, Duquesne Family Office, Maverick Silicon, StepStone Group, Protagonist, UDC Ventures. Angel: Naval Ravikant.
- First disclosed round. Prior funding was a reported $15M seed in 2023 led by the OpenAI Startup Fund at roughly $100M, with angel backing from Naval Ravikant, Nat Friedman and Fred Ehrsam.
- The product is not a chip. It is a **fab that mass-produces fabs**. Fab2 designs and builds every tool in its fabs in house, from pumps, valves and gas lines to lithography and the vacuum chambers around it. It assembles components into machines, machines into complete fabs, and aims to mass-produce the fabs.
- Small, software-defined fabs that pattern chips far smaller than a wafer and turn prototypes around in hours, rather than 300mm wafers through giant lines. Paired with Studio, an in-browser EDA tool.
- Honest limit, stated in the reporting: electron-beam lithography writes patterns directly rather than projecting them through a mask, so a single patterning step on a small chip can take far longer than an EUV scanner needs for a whole 300mm wafer. Throughput suits prototyping and low volume, not commercial high-volume foundry work.
- Three sites: 120,000 sq ft Austin headquarters, 30,000 sq ft Lockhart site housing the fab fab, and the original 25,000 sq ft San Francisco garage fab. Roughly 84 employees as of May 2026 (Tracxn).
- Background, out of window: the rebrand from Atomic Semi to Fab2 and the move to Texas were July 5, 2026. Not this week's news. The in-window event is the round.
- Sources: Dealroom News and WOWTALE, September 9, 2026; Crunchbase weekly roundup, September 11, 2026; Tom's Hardware, July 5, 2026 (background).

**2. Celero Communications raised $275M Series C at $3B-plus. September 8, 2026.**
- Irvine, California. Led by Alphabet's CapitalG, Atreides Management and Valor Equity Partners, with returning backers Sutter Hill Ventures and Maverick Silicon. Total funding roughly $413.4M.
- Announced alongside validation of what the company calls the **industry's first 2nm coherent DSP silicon**, including DSP processing and advanced analog. Supports 1.6T through 3.2T per port. TSMC's 2nm node gives roughly 15% better performance than its predecessor.
- What a coherent DSP does: data-centre operators link facilities using fibre-optic cables that can span **more than 100 miles**. Coherent DSPs manage those links. They drive the transceivers that convert electricity to light and back; they recover timing without a separate physical timing link; and they add redundancy bits so the receiver can repair errors caused by light dispersing and dimming over distance.
- Celero says the same chip covers long-haul links between data centres **and** internal scale-up (chips in a rack) and scale-out (rack to rack) networks.
- CEO and co-founder Nariman Yousefi: "AI infrastructure is rapidly outgrowing the capabilities of traditional optical interconnect architectures."
- Why it matters to this brain: the reason hyperscalers now stitch sites together across counties is that no single site can get enough power. That makes this a joint of [[Energy is the Ceiling]] and [[The Bottleneck Slides Down the Stack]]. The bottleneck stopped being inside the building.
- Sources: SiliconANGLE, September 8, 2026; Business Wire, September 8, 2026; TelecomTV; Crunchbase roundup, September 11, 2026.

**3. Positron AI raised $875M at a $5B post-money valuation. September 10, 2026.**
- Reno, Nevada. Structured as a $375M Series C followed by a Series C-1 of up to $500M. Led by James Clark and NEA, with Qatar Investment Authority among other investors. Total funding roughly $1.2B.
- The bet: build inference hardware around **commodity LPDDR5X memory**, the same class of memory that goes in phones and laptops, instead of high-bandwidth memory.
- Next-generation chip, Asimov, pairs its compute architecture with between 288 GB and 2,304 GB of memory per chip. Company claims 2TB of memory per accelerator and 8TB per Titan system, with bandwidth the company describes as similar to Nvidia's Rubin GPU, and more than 90% of available memory bandwidth actually achieved. These are company figures, unbenchmarked independently.
- Asimov tapes out on TSMC N3P at the end of 2026, production targeted for H2 2027.
- Why it matters: [[SK Hynix]] was this brain's first published post, on the memory wall. This is the memory wall answered by refusing to buy the expensive memory. It is the same **around** motion as [[OLIX]] (August 3, 2026) by a completely different route: OLIX went to on-chip SRAM and photonics, Positron went to the cheapest commodity memory on the market.
- Sources: SiliconANGLE, September 10, 2026; Quartz, September 10, 2026; DCD; PR Newswire, September 2026; TechTimes, September 12, 2026.

### Energy is the Ceiling

**4. Microsoft plans to go from about 12 GW to more than 38 GW of data-centre capacity by 2032. Reported September 10 to 11, 2026.**
- More than a tripling, roughly 26 GW added over six years. Bloomberg reported that this would eclipse the electricity New York state uses at peak.
- The trigger stated in the reporting: capacity shortages forced Microsoft to turn away some AI and cloud business.
- Filed as thesis evidence, not as a player. Microsoft is mainstream and not a chokepoint owner.
- Sources: Bloomberg, September 10, 2026; TechTimes, September 11, 2026.

**5. Suniva completed an $835M raise for a 4.5 GW solar cell plant in Laurens County, South Carolina. September 9, 2026.**
- Norcross, Georgia. Debt and equity from Goldman Sachs Alternatives, I Squared Capital, JBA Asset Management, Electron Capital Partners, Orion Infrastructure Capital and Rubric Capital Management. Total raised to date nearly $1.2B.
- Takes operational US cell capacity from 1 GW to **5.5 GW**, a more than fourfold increase. PERC cells. Project cost put at roughly $600M; 564 manufacturing jobs at full operation; the 621,468 sq ft building shell is already complete; work completes 2027, commercial operation 2028.
- The project was first announced in April 2026. The in-window event is the financing close.
- Why it matters: solar cells are the step in the solar chain the US has mostly not owned. Modules were assembled domestically; cells came from elsewhere. This is the missing rung being bought.
- Sources: pv magazine USA and pv-tech, September 9, 2026; Greenville Business Magazine; SMM, September 9, 2026.

### Compute and Resources Become Geopolitics

**6. Stoke Space raised a $1B Series E at a $10B valuation. September 8, 2026.**
- Kent, Washington. Co-led by Point72 Ventures and Spark Capital, with General Innovation, Glade Brook Capital, US Innovation Technology, Washington Harbour Partners, Woven Capital and Y Combinator. Described as an initial closing. Total capital raised roughly $2.3B to $2.4B.
- Two vehicles. **Nova Pathfinder**, three metric tons to low Earth orbit, first orbital launch targeted early 2027. **Nova Block 2**, 15 metric tons to LEO in a 5m fairing, first launch targeted 2029.
- Fully reusable, both stages. Positioned to take the slot Falcon 9 vacates as it heads toward retirement.
- Context: 2026 is already a record year for space-tech startup funding.
- Sources: Stoke Space, September 8, 2026; Space.com; GeekWire; SpaceWatch.Global, September 2026; Crunchbase roundup, September 11, 2026.

---

## Kept as context only (real, in window, but not filed as a lead)

- **The Boring Co., $3B Series D at $23B**, led by the United Arab Emirates with a16z, Sequoia and Valor. Total funding nearly $3.9B. Real and large, but it moves no thesis in this brain and is not a chokepoint. (Crunchbase, September 11, 2026)
- **Cognition, $2B Series E at $48B**; **Motive, $1.3B**; **Harvey, $550M Series H at $15.5B**; **Mach Industries, $600M Series C at $3.7B**. Application and defence layer, no chokepoint. Logged as evidence of the capital environment only.
- **Temporal valued at $12.55B in a $550M round** and **OpenAI reportedly buying Glass Imaging for more than $300M**, both September 14, 2026 (SiliconANGLE). Application layer. Not filed.
- **Y Combinator still the busiest startup investor in August, with Nvidia ramping its dealmaking pace** (Crunchbase, September 14, 2026). Nvidia's shift from customer to shareholder across the stack is already logged in the [[Lancium]] note; this is corroboration, not a new event.

## Rejected (checked and deliberately not used)

- **China rare earth firms halting some US shipments** (Reuters, September 4, 2026). Eleven days old, so outside the 7-to-10-day window. Substantively important and it points at [[MP Materials]], but the discipline holds: not filed as this week's evidence. The related standing facts (yttrium, indium phosphide and tungsten prices near record highs; some US firms waiting more than six months for mineral licences; Xi's September 24 Washington visit as the next hard date) are recorded here as watch items rather than as thesis evidence.
- **Bloom Energy and Oracle, up to 2.8 GW of solid oxide fuel cells.** April 2026. Recirculating in September roundups. Out of window.
- **Hyundai's 25,000-unit Atlas order** (May 19, 2026), **1X NEO bookings** (April 30, 2026), **XPENG robotics raise above $6.3B valuation**, **Apptronik $520M** (February 2026), **NEURA roughly $1.2B Series C** (March 2026). All out of window.
- **UBTech UWORLD U1 first consumer deliveries, mid-September 2026.** In window by timing but the reporting carries no firm date and UBTech is a listed, covered company rather than a hidden player. Not filed.
- **Governor Abbott's pause on new Texas data-centre grid connections** (August 3, 2026). Out of window, and it is the exact event the August 11 "permission, not power" tripwire predicted. Recorded in the changelog as a tripwire result, not as new evidence.
- **Neurophos, $110M for an optical processing unit.** No firm in-window date surfaced. Held for next run.
- **SinapisAI, roughly RMB 100M first financing, September 10, 2026.** In window and correctly dated, but it is an early-stage software paradigm bet with no chokepoint and no scale. Not filed.

---

## Theses with no in-window evidence this week

- **[[Biology Becomes a Search Problem]]: nothing.** Second consecutive blank run. The September 9 Frontiers in Immunology review on network biology is a literature review, not an event. Eli Lilly's LillyPod and the Sanofi/Owkin partnership are earlier in 2026 and were already rejected on August 11. The August 11 note said that three blank weeks would itself be a signal worth interrogating. With the five-week gap in the record, the honest position is that this brain has not looked hard enough at biology rather than that biology has gone quiet, and the fix is a dedicated biology sweep next run rather than a broad AI sweep that happens to catch biology.
- **[[The Physical World Gets Automated]]: nothing new.** Robotics funding is running hot in aggregate (roughly $18.8B globally in 2026 against $15B for all of 2025), but every specific deal that surfaced in the window was either out of window, already in the brain, or attached to an already-used player. The component rung the August 11 run opened with [[Nabtesco]] produced no in-window event.
- **[[Atoms over Algorithms]]: nothing.** No in-window price, traffic or revenue-per-megawatt data point.

---

## Feeds status

Eighth consecutive run with the provenance gate on direct RSS. Rotating Tier 2 and Tier 3 slots covered this run by dated publisher search: Hugging Face Blog, Google Research, Apple ML Research, Stanford AI Lab, The Sequence, Marcus on AI, The Diff, Fabricated Knowledge, Noahpinion. Tier 4 scan: SiliconANGLE, Crunchbase News, Tom's Hardware, DCD, pv magazine.

Standing recommendation, now eight runs old: **restore a direct feed reader.** This run again depended on a small number of aggregator pages that happened to clear provenance. A week where Crunchbase does not publish its roundup is a week with a thin pull.

Second standing issue, new this run: **the five-week gap between August 11 and September 15 is a cadence failure, not a quiet period.** Events in that window are permanently outside the freshness rule and will never be filed. If the schedule slips again, the correct response is a one-off catch-up sweep with an explicitly widened window, flagged as such.

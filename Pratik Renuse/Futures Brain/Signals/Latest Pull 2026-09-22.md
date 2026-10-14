# Latest Pull 2026-09-22

Window: **September 12 to September 22, 2026**. Previous run closed September 15, so the overlap is three days and the genuinely new ground is September 16 to 22. Cadence restored to weekly after the five-week gap flagged last run.

Order of sweep this run, as owed by the September 15 changelog: **biology first, roster second, general news third.** That order is recorded because it is the correction to the method failure logged last week, and it changed the result: biology produced two in-window items after two blank runs.

---

## Pass 1: Biology (run first, deliberately)

**Anthropic wet lab, Reuters, September 18, 2026.** Anthropic has set up a physical biology lab in the San Francisco Bay Area. Eric Kauderer-Abrams, head of life sciences, confirmed it to Reuters. The stated aim is to explore how Claude can direct robotic lab systems (microscopes, liquid handlers, robotic arms) to run experiments with limited human intervention. Tied to a **Model Hardware Standard (MHS)**, a specification letting AI agents coordinate multiple instruments, adjust experiment parameters and recover from some hardware errors. Company says human oversight remains essential and it is "in the very early innings". The lab stops short of clinical trials.
- Moves: [[Biology Becomes a Search Problem]]. Anthropic is mainstream and owns no chokepoint, so this is **thesis evidence, not a hook.**
- Why it matters: [[Discovery Loop]] was filed on August 5 as "the research loop itself as a product" built by departing Google people. Six weeks later a frontier lab is building the same loop in-house, with a hardware interface standard attached. The loop is no longer a startup thesis.

**Multiply Labs, $75M Series B, September 17, 2026.** San Francisco, founded 2016. Robotic manufacturing for cell and gene therapies and other advanced biologics. Total funding now more than $100M. Round joined by **AstraZeneca Ventures, Lingotto, Legend Biotech and Strange Ventures**, with returning **Casdin Capital, Lux Capital and Founders Fund**. Company figures: robotic clusters cut **cost per dose by 74%** and deliver **up to 100x the throughput** of manual manufacturing, working with existing pharmaceutical equipment and processes. Capital goes to manufacturing capacity, product development, and engineering, regulatory and commercial hiring, moving from clinical-stage deployments toward commercial-scale production.
- Moves: [[Biology Becomes a Search Problem]] crossed with [[The Physical World Gets Automated]]. **Obscure.** Viable hook.
- Caveat to carry into any note or post: 74% and 100x are **company figures**, not independently audited. And this is *manufacture*, not *discovery*: the honest framing is that the search problem is solved upstream and the bottleneck moves to making the thing.

Rejected in the biology pass:
- **Caspian Therapeutics $50M (September 2026)**, **Sling Therapeutics $123M Series C (in window)**, **Beeline Medicines**, **Flare Therapeutics**: real therapeutics rounds, no chokepoint, no mechanism this brain tracks. Capital-environment context only.
- **Biohub ESM update (May 2026)**, **Arc Institute Proto (June 2026)**, **Evo 2 (March 2026)**, **Earendil Labs $787M (March 2026)**, **Eikon and Generate:Biomedicines IPOs (February 2026)**: all out of window.
- Nature's self-driving-lab debate coverage: undated in the result and editorial rather than an event. Not filed.

---

## Pass 2: Roster check (run second, as owed)

**No verified in-window change to any of the 100 dossiers.** Checked: role and org moves, launches, flagship essays, paywall changes, dead or moved links, deaths.
- The known 2026 moves (John Jumper to Anthropic and Noam Shazeer to OpenAI in June, Koray Kavukcuoglu's August elevation at Google DeepMind, Andrej Karpathy to Anthropic in May, John Schulman to Mira Murati's startup) are all out of window and already reflected where relevant.
- **Zvi Mowshowitz (#31)** published Monthly Roundup #46 in September 2026. Normal cadence, not a dossier change. Not filed.
- No death, no paywall change, no dead link surfaced.

**Honest scope note.** This was a targeted sweep across the most active names plus a general search for role and org moves in the window. It was not a line-by-line audit of all 100 dossiers, which is not achievable inside one run without crowding out the news pass. Three consecutive runs have now produced zero roster moves. The reading after actually running the roster pass first is that the roster is genuinely stable, not that the sweep keeps missing it.

---

## Pass 3: General sweep

### The week's funding (Crunchbase US top 10, period September 12 to 18, published September 18)

Ranked: Temporal Technologies $550M (AI infrastructure, $12.55B), Impulse Space $308M (space), Ridgeline $250M ($1.45B), **Cornelis Networks $205M (networking)**, Factory $200M ($5B), Profound $180M ($1.8B), Arcee AI $150M (>$1B), Nex $150M (gaming), **Mazama Energy $135M (geothermal)**, Sling Therapeutics $123M (biotech). Crusoe also made official its previously reported $3B-plus raise, co-led by Atreides, Valor Equity and Mubadala Capital.

Week-over-week shape: the previous week carried multiple billion-dollar-plus rounds; this one topped out in the hundreds of millions. **Capital cooled, but it moved into harder assets**, networking silicon, geothermal drilling and orbital propulsion rather than application software.

### Filed as new players

**Cornelis Networks, $205M, announced September 14, 2026.** Wayne, Pennsylvania. Led by **IAG Capital Partners**. Announced alongside the launch of **Active Compute Fabric** and a **strategic collaboration with Qualcomm**, both unveiled ahead of the AI Infra Summit in Santa Clara. CEO **Lisa Spelman**; CMO Brandon Draeger. The company is the **Omni-Path team spun out of Intel in 2020**, and competes with Cisco, Arista and Nvidia's networking.
- Mechanism: Active Compute Fabric puts **programmable compute inside the network** rather than using the network only to carry data. It assembles KV cache data for disaggregated inference, coordinates expert dispatch for mixture-of-experts models, accelerates collective operations like AllReduce, and compresses gradients in transit, all before the data reaches its destination. Draeger: "The payload does not arrive the way it left."
- Numbers: reduces network traffic by **up to 50%** (company pre-production simulations, flagged). Accelerator utilisation in large AI deployments **commonly sits near half of installed capacity**. The network is about **15% of the cost of an AI system** but determines the return on the other 85%. Built on open standards: Ethernet and UALink for scale-up, Ultra Ethernet for scale-out. CN5000 shipping at **400 Gbps**; CN6000 multi-protocol at **800 Gbps**, broader availability **Q4 2026**.
- Moves: [[The Bottleneck Slides Down the Stack]]. **Obscure.** Strong hook.
- Why it is not just another interconnect story: every motion this thesis has recorded so far moves the constraint to a different layer. This one **dissolves the layer into the one below it.** The wire stops being a pipe and starts being a processor. Call it the sixth motion: **THROUGH**.

**Mazama Energy, $135M, announced September 17, 2026.** Seattle. Oversubscribed Series B led by **Centaurus Capital** (John Arnold) and **Doerr Capital**, with **ConocoPhillips and Shell Ventures** joining and **Khosla Ventures and Gates Frontier** repeating. Also SiteGround Capital, H. Barton Asset Management, and the Jeffrey and Marieke Rothschild Foundation. Superhot rock geothermal at **Newberry, Oregon**.
- Numbers: achieved **629 degrees F (331 C)** in 2025, the highest temperature recorded in an engineered geothermal system. Second well, **Project Athena**, reached the same **10,350 feet in 15 days this month, about 80% faster** than the 2025 well, and is drilling roughly a mile further toward **750 degrees F (400 C)**. First power to grid targeted **2029 at 50 MW**, expanding to **200 MW in 2030**. Targeting independent certification of **more than 10 GWe of resource potential at Newberry alone**.
- Moves: [[Energy is the Ceiling]]. **Obscure.** Strong hook.
- Why it matters: the 80% drilling-speed gain in one well generation is the geothermal equivalent of a learning curve. Heat is the one primary energy source that is baseload, weather-independent, sited almost anywhere hot rock is shallow enough, and does not need a licence queue like fission. The open question has always been cost per well, and this is the first in-window number that moves it.

**Impulse Space, $308M Series D extension, announced September 16, 2026.** Redondo Beach, California. Brings the combined Series D to **$808M**. Investors in the extension: **137 Ventures, BANNER VC, DFJ Growth, Linse Capital, Lux Capital, Valor Equity Partners.** Founded by **Tom Mueller, SpaceX's first employee**, who led development of the Merlin and Raptor engines.
- Products: **Mira**, a precision manoeuvring orbital transfer vehicle already flying; **Helios**, a high-energy kick stage with first flight scheduled **2027**; **Caravan**, a rideshare programme.
- Also in window or adjacent: a **$28M contract extension from the US Space Force** for the VICTUS SALO 2 and 3 responsive-space missions, and selection into the **NSSL Phase 3 Lane 1 provider pool** with Helios, making Impulse the first non-traditional upper-stage developer to act as a prime contractor under that programme.
- Valuation: the June 2026 Series D was **$500M at $4.26B**. Some outlets report the extension at **$5.4B**; that figure is **reported, not confirmed by the company release**, and is flagged as such. The safe number is the **$808M combined round**.
- Moves: [[Compute and Resources Become Geopolitics]]. **Obscure to building.** Viable hook.
- Why it matters: [[Stoke Space]] answered "is there a second way up". Impulse answers the next question nobody was asking, which is what happens **after** you get up. Every orbital-compute plan in this brain ([[Starcloud]], [[Orbital]], SpaceX Starmind, Blue Origin's filing) assumes satellites reach and hold a specific orbit and can be repositioned. That is a separate vehicle and a separate company.

**Emerald AI, in-window catalyst September 16, 2026.** Founded November 2024 by **Varun Sivaram**, a former Biden administration energy official. On September 16 it **co-founded the AI Energy Management Alliance (AEMA) alongside Google and Nvidia** (see below).
- Prior facts, out of window and labelled: **$150M Series A at $1.05B on August 25, 2026**, led by DCVC and Energize Capital, with Nvidia, Samsung Ventures, GE Vernova and Salesforce Ventures participating; total raised more than $220M; 12 Fortune Global 500 companies now investors.
- Demonstrated result, out of window: under EPRI's DCFlex programme with Nvidia, Oracle Cloud Infrastructure, Salt River Project and Arizona Public Service, a Phoenix data-centre cluster responded to a real power surge on a hot day (**May 3**) by cutting consumption **25% and holding the reduction for three consecutive hours**.
- Vendor claims, flagged: Nvidia's case study cites **40% power-demand cuts in under a minute** and **100 GW of untapped grid capacity** unlocked by flexibility. Both are vendor figures.
- Moves: [[Energy is the Ceiling]]. **Obscure.** Viable hook, on the in-window AEMA catalyst.
- Why it matters: every player already in this thesis answers the power ceiling by **making more power** ([[GE Vernova]], [[Oklo]], [[Aalo Atomics]], [[Helion]], [[Commonwealth Fusion]], Mazama) or by **owning permitted ground** ([[SB Energy]], [[Lancium]], Joulent). Emerald AI is the first that answers it by **using less at the moment it matters**, which converts a data centre from a grid liability into a grid asset and is a route past the interconnection queue rather than through it.

### Filed as thesis evidence, not as players

**AI Energy Management Alliance (AEMA), launched September 16, 2026.** Founded by **Emerald AI, Google and Nvidia**. Launch partners include **Anthropic, AES, Constellation, Generate, National Grid, NRG Energy, Analog Devices, Calibrant Energy, Camus, ClearPath, encoord, Fluence, GridUnity, PassKey, RWE, Splight, Verrus and Voltus.** Purpose: advance data centres that dynamically manage electricity use in response to grid conditions, on the argument that **flexibility unlocks faster and larger connections**.
- Moves: [[Energy is the Ceiling]]. This is the **"permission, not power" tripwire firing a second time, from the other side.** In August the tripwire was about states gating access (Texas, August 3). This is the industry organising a body whose explicit purpose is to negotiate that access. The constraint has become political, and the buyers have now built an institution to lobby it.

**Alibaba, Apsara Conference, September 21 to 22, 2026.** Unveiled the **Zhenwu V900** accelerator, described as China's most powerful AI chip: **three times the performance of its predecessor, 216 GB of HBM, 1.2 TB/s inter-chip bandwidth, FP8 and FP4 precision, scaling to 500,000 chips per cluster.** Mass production and commercial release targeted **Q1 2027**. Alongside it: **more than 20 GW of global data-centre capacity by 2032**, and a planned model of **5 trillion to 10 trillion parameters**. Shares rose about 3% in Hong Kong.
- Moves: [[Compute and Resources Become Geopolitics]] and [[Energy is the Ceiling]]. Alibaba is mainstream and owns no chokepoint, so evidence only.
- Two things worth recording. First, **20 GW by 2032 is the Chinese mirror of Microsoft's 12-to-38 GW by 2032** filed last run, which means the power ceiling is now being answered at the same magnitude on both sides of the export-control line. Second, **the V900 still carries 216 GB of HBM**, so China's route around Nvidia does not route around high-bandwidth memory. The chokepoint [[Positron AI]] and [[OLIX]] are funded to escape is the one China's flagship chip still depends on.

**US data-centre buildout gap, reported in window.** Roughly **12 GW of AI data-centre capacity promised for construction in 2026, only about 5 GW actually broke ground.** Interconnection queues in Northern Virginia, Phoenix and Dallas now run **four to seven years**. Six federal proceedings opened in June will set the terms for how data centres connect and who pays for the transmission. Five 1 GW-plus data centres expected online in 2026, each from a different hyperscaler, with xAI's Colossus 2 in Memphis the fastest buildout at a targeted 12 months to gigawatt scale.
- Moves: [[Energy is the Ceiling]]. Filed as supporting context with a source-strength caveat: these figures came through an aggregator rather than a primary filing, so they are recorded as directional, not as hard evidence, and the promised-versus-broke-ground ratio should be re-verified against a primary source before any post uses it.

### Logged, not filed

- **Temporal Technologies $550M at $12.55B**: already logged as context on September 15; developer infrastructure, no chokepoint.
- **Crusoe $3B-plus**: real and in window, but previously reported and Crusoe is a well-covered name. Energy-adjacent context.
- **Ridgeline, Factory, Profound, Arcee AI, Nex**: application and model-layer software. None move a thesis here.
- **Nscale files to go public (reported September 21)**: AI infrastructure IPO filing. Noted as a watch item; no thesis movement yet.
- **Meta Muse AI agent tops the App Store, semiconductor stocks rise (September 21)**: consumer-demand signal, no mechanism.
- **AWS Strands Harness (September 21)**, **Googlebook ChromeOS laptop (September 21)**: product launches, no chokepoint.
- **Trump "AI Force" and AI czar remarks (September 20)**: stated intent, no policy instrument yet. Watch item for [[Compute and Resources Become Geopolitics]].
- **China rare-earth controls**: the substantive escalations are 2025 and mid-2026, with the October 2025 package suspended until November 10, 2026. Nothing new and dated inside this window. **Xi's September 24 Washington visit has not happened yet** and remains the next hard date.
- **Humanoid robotics**: aggregate 2026 funding is running hot, but no specific in-window deal, launch or component event surfaced. Qualcomm's Dragonwing IQ10 humanoid processor and the harmonic-drive supply constraint are both already in the brain and neither produced a dated in-window event.

---

## Feeds

Ninth consecutive run with the same structural constraint: **`web_fetch` is provenance-gated, so no RSS URL in Feeds.md could be called directly.** Tier 1 was covered by dated search against each publisher instead. Direct fetches that cleared provenance because their URLs surfaced through search, and which carried most of this run's signal: **Crunchbase's September 12 to 18 roundup (published September 18)** and **SiliconANGLE's Cornelis piece (September 14)**.

Rotating Tier 2 and Tier 3 slots covered this run: Hugging Face Blog, Microsoft Research, Meta/FAIR, AWS Machine Learning, NVIDIA Technical Blog, MIT News AI, Don't Worry About the Vase, Marginal Revolution, The Gradient, Astral Codex Ten. Tier 4 scan: SiliconANGLE, Crunchbase News, TechCrunch, DCD, Axios, Reuters coverage, GlobeNewswire releases.

**Standing recommendation, now nine runs old: restore a direct feed reader.** This run again leaned on two aggregator pages that happened to clear provenance.

**Cadence: restored.** Seven days since the last run, against five weeks before it. No gap in the record this time.

---

## Candidate leads for the content pass

Five, one per node except energy which takes two on genuinely opposite mechanisms:

1. **Cornelis Networks** ([[The Bottleneck Slides Down the Stack]]) - the wire starts doing the maths.
2. **Mazama Energy** ([[Energy is the Ceiling]]) - drill deeper, get hotter, make more power per hole.
3. **Emerald AI** ([[Energy is the Ceiling]]) - the opposite answer: do not make more power, use less at the right second.
4. **Impulse Space** ([[Compute and Resources Become Geopolitics]]) - getting to orbit was the easy half.
5. **Multiply Labs** ([[Biology Becomes a Search Problem]] x [[The Physical World Gets Automated]]) - the medicine gets designed fast, then waits in a queue to be built.

All five are hidden players never used as a lead. None appear in the lead ledger.

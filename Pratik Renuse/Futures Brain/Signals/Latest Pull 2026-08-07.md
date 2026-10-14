# Latest Pull 2026-08-07

Window: July 28 to August 7, 2026. Everything below is dated and sourced. Items outside the window are marked and used as context only, never as this week's evidence.

Method note: web_fetch remains provenance-gated in this environment, so no direct RSS was fetched. Tier 1 was covered by dated search across each publisher; this run's rotating Tier 2/3 slots were Apple ML Research, AWS Machine Learning, NVIDIA Technical Blog, Stanford AI Lab, The Sequence, Fabricated Knowledge, The Diff, Noahpinion, The Gradient. One direct fetch cleared provenance (EU-Startups on OLIX). Sixth consecutive run with this constraint.

---

## 1. The roster moved. Two Tier 1 sources changed role in one announcement.

**Jeff Dean (#12) is leaving Google after 27 years to co-found Discovery Loop.** Announced August 5, 2026. Co-founders: Sanjay Ghemawat (Google senior fellow, his collaborator of more than two decades), Oriol Vinyals (Google DeepMind VP of research) and Quoc Le (Google Brain co-founder). Discovery Loop is a public benefit company whose stated purpose is to automate the scientific research loop itself: propose an experiment, run it, evaluate the result, iterate thousands of times. It starts by automating machine learning research with itself as its first customer, then points the same system at engineering, medicine, materials design and clean energy. Radical Ventures and Khosla Ventures are co-leading the seed round; the round is not closed and no valuation was disclosed. Google is a founding investor and cloud partner.
Sources: GeekWire, TechTimes (Aug 5, 2026), Radical Ventures investment note, Yahoo Finance.

**Demis Hassabis (#3) moves from CEO of Google DeepMind to Chair of Google DeepMind and Chief Scientist of Alphabet.** Announced August 5 to 6, 2026. Koray Kavukcuoglu becomes SVP of Google DeepMind reporting to Sundar Pichai, owning Gemini model development, frontier research, and the Gemini app and developer teams. Alphabet shares fell roughly 4% to 5% on the news.
Sources: Bloomberg (Aug 5, 2026), Axios (Aug 5, 2026), Time (Aug 6, 2026), Google blog "The next chapter of our AI momentum."

Pattern note: the last three runs each caught a roster role change (Karpathy, Sutton, now Dean and Hassabis). Unlike the previous two, this one was caught inside the window, on the day.

---

## 2. New hidden players found this week

**OLIX** (London). Series B of EUR 270.5M (about $312M) at a EUR 2.8B (about $3.3B) valuation, announced August 3, 2026. Founded in London in 2024, so roughly two years old. Investors include Fundomo, Arm and Hudson River Trading, with Reed Hastings as an angel. Nick McKeown (Stanford professor emeritus, 2025 Marconi Prize) joined the board; former Wise executive Matt Briers joined as CFO.
What it builds: the X-1 platform, a set of stage-specific chips for AI inference rather than one general-purpose chip. Its framing is that a data centre is a factory whose product is a token, and that no other factory would run every stage of production on the same machine. DX-1 is the first chip, a decode accelerator, claiming over 10,000 tokens per second per user on 100B-parameter models (company figure, unbenchmarked). Chips are linked by a "slow and wide" optical interconnect that moves data between chips with light instead of copper.
The detail that matters for the brain: DX-1 holds the model in on-chip SRAM and uses **no high-bandwidth memory and no advanced packaging**, explicitly because those are the two components in shortest supply industry-wide. First customer deliveries targeted H2 2027.
Source: EU-Startups, August 3, 2026 (direct fetch).

**Ore Energy** (Amsterdam / Delft). Series A of EUR 37.3M (about $43M), announced August 5, 2026, led by Plural and HV with Positron Ventures. Total raised now about EUR 53M ($61M). Founded 2023 by Aytac Yilmaz (CEO), Rutil Ozdemir (COO) and Yaiza Gonzalez Garcia (CSO), a TU Delft spinout.
What it builds: grid-scale iron-air batteries that store electricity for 24 to 100 hours, versus roughly 4 hours for a standard lithium grid battery. The cell works by rusting and un-rusting iron electrodes, using iron, water and air. Positioned explicitly as renewable baseload for the AI era. Commercial-scale production targeted from 2028.
Sources: Energy-Storage.news, ESS News, TheNextWeb, AccessNewswire, EU-Startups (Aug 5, 2026).

**Discovery Loop** (see section 1). New company, unknown name, famous founders. Public benefit company automating the research loop.

**Autonomous Robotic Metallurgist Materials Innovation Platform (ARM-MIP)**, Texas A&M University. Six-year, $24.9M award from the US National Science Foundation announced August 5, 2026, to build the first national self-driving laboratory for metals, open to researchers nationwide. Robots plus AI take over the repetitive labour of alloy discovery: propose an alloy, make it, test it, learn, repeat. A companion NSF-funded facility, READINESS, covers two-dimensional materials, oxide semiconductors and diamond thin films with human oversight at critical decision points.
Sources: AIwire / HPCwire (Aug 5, 2026), Rice University news, NSF.

---

## 3. Existing player check: what actually moved

**Astera Labs.** Q2 2026 reported August 4, 2026. Record revenue $392.4M, up 27% sequentially and 104% year over year, a record quarter for the Aries line. Non-GAAP diluted EPS $0.80 versus $0.69 consensus, an eighth consecutive beat. Non-GAAP gross margin 73.7% against 73% guidance. Q3 guidance is the real story: revenue $540M to $560M against $418.2M consensus, EPS $1.16 to $1.21 against $0.80 consensus. Scorpio-X is now expected to pass Scorpio-P and become the largest product family in Q3, a full quarter earlier than previously guided. Taurus expanded to 3.2T Smart Retimers and Redrivers for 224G Ethernet and UALink. Stock slipped about 1.3% after hours on a large two-week run-up into the print.
Verdict: the six-week, roughly 40% drawdown that this brain has tracked since late June was not a demand signal. The referendum came back clean.
Sources: Astera Labs IR / GlobeNewswire (Aug 4, 2026), Investing.com transcript, Zacks, ChartMill.

**Oklo.** Groves reached first criticality at low power on the evening of **August 5, 2026**, thirteen days after DOE startup authorization and roughly ten months from groundbreaking on a greenfield site. First reactor under the DOE Reactor Pilot Program to go critical on privately owned land. Groves is a low-power test reactor aimed at medical isotope production and at generating operating data for Oklo's larger commercial designs. Stock slipped on the news.
Sources: Oklo newsroom, NucNet (Aug 5, 2026), Seeking Alpha, Investing News Network.
Note: the July criticality target this brain tracked for three weeks slipped by five days and then landed.

**Unitree.** Priced its Shanghai STAR Market IPO on **August 6, 2026** at 150.8 yuan per share, valuing the company at about 61 billion yuan ($9.04 billion). Selling 40.45 million new shares, 10% of enlarged share capital, raising about 6.1 billion yuan. DeepSeek is among the strategic investors. Subscriptions open August 10. This makes Unitree the first mainland-listed humanoid maker.
Sources: Caixin Global (Aug 7, 2026), CNBC (Aug 6, 2026), Reuters via KFGO.
Note: the pricing came in well above the $5.7B to $7B range trailed in July.

**SK Hynix.** Q2 2026 reported July 29, 2026. Revenue KRW 79.32 trillion (up 257% year over year), operating profit KRW 60.54 trillion (up 557%), operating margin 76%, both all-time records. First-half revenue passed KRW 100 trillion for the first time in company history. HBM4 entered mass shipment in Q2 with a second-half ramp planned. Shares fell after the print: the record still missed brokerage models (roughly KRW 64.1T operating profit expected), attributed to HBM4 shipments landing below expectation with revenue recognition pushed later.
Sources: SK hynix newsroom (Jul 29, 2026), Investing.com, TweakTown, Qz.

**Commonwealth Fusion Systems** (previously a Players-index stub). Raised another **$1 billion in equity, announced July 30, 2026**, taking total capital raised to $4 billion, roughly 30% of all private capital ever raised by the fusion industry. Largest fusion round since its own $1.8B Series B in 2021. New investors include pension funds, sovereign wealth funds, and infrastructure and industrial corporate partners; CFS calls the pension-fund participation a fusion first. SPARC is about 80% assembled at Devens, Massachusetts, with first plasma and scientific breakeven targeted for 2027. No valuation disclosed.
Sources: CFS press release / PRNewswire (Jul 30, 2026), TechCrunch (Jul 30, 2026), POWER Magazine, TechTimes (Jul 31, 2026).

**Starcloud / orbital compute.** SpaceX and Nvidia announced on **August 4, 2026** that Nvidia will design the compute payload for Starmind AI1, the first satellite in a planned orbital network built to run production AI workloads, using Nvidia Vera CPUs, Rubin GPUs and the Vera Rubin NVL72 rack-scale system. Context, not in-window movement for the Starcloud note itself: Blue Origin has filed for a constellation of 51,600 data-centre satellites, and SpaceX previously filed for up to one million.
Sources: SpaceNews, cryptobriefing, Interesting Engineering, Motley Fool (Aug 4 to 6, 2026).

**Memory market.** Counterpoint Q2 2026 DRAM share published August 4, 2026: Samsung 39%, Micron narrowing the gap with SK Hynix. Q2 DRAM contract prices rose 58% to 63% quarter over quarter; NAND contract prices rose 70% to 75%. Reporting through this window has Samsung, SK Hynix and Micron effectively sold out of 2027 DRAM and HBM output, with buyers placing advance deposits ahead of formal long-term agreements. AI servers and HBM are absorbing close to 70% of DRAM output. Samsung's public warning is that the shortage worsens before it improves, into 2027 and 2028.
Sources: Counterpoint via Sammy Fans (Aug 4, 2026), Tom's Hardware, Astute Group, Network World.

**GE Vernova.** No new company disclosure in window. Q2 figures (July 22) stand: 116 GW gas backlog plus slot reservations, 125 GW year-end guide, manufacturing targets of 20 GW annualised output in Q3 2026, 24 GW in 2028 and actions toward 30 GW by 2030. Left untouched this week.

**Checked, no verified in-window change:** Helion, MP Materials, Aalo Atomics, Agility Robotics, Walden Robotics, EngineAI, LimX Dynamics, TSMC CoWoS, Ayar Labs, SB Energy, Sargent and Lundy, Etched, Cerebras, Humanoid.

---

## 4. Rejected or out of window

- **FDA expansion of Casgevy to children aged two and older** (sickle cell and transfusion-dependent beta thalassemia, about 5,500 newly eligible US patients, approved in 53 days): July 1, 2026. Out of window by 37 days despite recirculating in CRISPR Therapeutics' early-August business update. Real, but not this week's evidence.
- **FERC show-cause orders to all six RTOs and ISOs** on large-load and co-located interconnection: issued June 18, 2026, with 60-day tariff filings landing around mid-August. Out of window as an event. The mid-August filing deadline goes on the watch list.
- **LLNL autonomous-lab programme note** (AI, robotics and automation for advanced manufacturing and materials): July 29, 2026, in window but a programme description rather than a dated milestone. Logged as supporting context under the ARM-MIP entry, not as standalone evidence.
- **Figure's 1,000th Figure 03 unit at BotQ** (July 23, 2026) and Tesla Optimus Gen 3 low-volume ramp: outside the window or unconfirmed by the company. Figure/BotQ is also an already-used lead.
- **Meta's 6.6 GW of nuclear PPAs with Oklo, Vistra and TerraPower**: January 2026, recirculating in late-July commentary. Long out of window.
- **China's rare-earth export-control suspension** (paused to November 10, 2026): a standing condition, not a this-week development. The November expiry goes on the watch list.
- **Generate Biomedicines' $425M IPO**: early 2026, undated in the coverage that surfaced it. Not used.

---

## 5. What this week says about the six theses

- **Energy is the Ceiling.** Two real moves. Fusion crossed from venture capital into institutional capital (pension funds and sovereign wealth in CFS's $1B). And the duration problem got its own funded answer in Ore Energy: not more generation, but longer storage. The nuclear fast lane also delivered its promised event with Groves going critical on August 5.
- **The Bottleneck Slides Down the Stack.** The strongest week yet, and a new variant. OLIX is the first funded company in this brain built to *route around* a chokepoint rather than supply it: no HBM, no advanced packaging, on purpose. Meanwhile the chokepoints it is avoiding got tighter (2027 memory output sold out; contract prices up 58% to 75% in a quarter). And the interconnect rung was independently vindicated by Astera Labs' Q3 guide of $540M to $560M against $418M consensus.
- **Biology Becomes a Search Problem.** Two moves, one private and one public: Discovery Loop is a company whose product is the research loop itself, and ARM-MIP is a national facility where the metallurgist is a robot. The propose-test-learn cycle is now being built as infrastructure rather than as a result.
- **Compute and Resources Become Geopolitics.** Orbit got its first named production compute payload (Starmind AI1, Nvidia silicon, August 4). Memory allocation through 2027 is now settled by deposit rather than by market.
- **The Physical World Gets Automated.** Unitree priced at $9.04B on August 6, roughly 30% to 60% above the range trailed a month ago, with DeepSeek on the strategic book. The listing trigger this brain has watched for four weeks has now fired.
- **Atoms over Algorithms.** No standalone in-window development. ARM-MIP and Discovery Loop touch it but belong under Biology as a search problem. Left untouched.

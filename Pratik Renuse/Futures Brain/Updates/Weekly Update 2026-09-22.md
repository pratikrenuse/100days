# Weekly Update 2026-09-22

Window: **September 12 to September 22, 2026**. The last run closed September 15, so **cadence is restored to weekly** after the five-week gap logged last time, and there is no hole in the record. Raw pull: [[Latest Pull 2026-09-22]].

## Headline

The September 15 changelog closed with two owed corrections: run biology first, and check the roster before the news. Both were run in that order, and **the method change produced the result**. Biology had been blank for two consecutive runs. Given a dedicated first pass it produced two in-window items within minutes, including the lead for one of this week's five stories. Two blank runs were an artefact of where the search pointed, exactly as suspected.

The week's substance is a single shape repeating in four places: **the answer to a shortage stopped being "make more of the scarce thing".**

[[Cornelis Networks]] took $205M to make the network do arithmetic, so work is deleted rather than relocated. [[Emerald AI]] co-founded an alliance with Google and Nvidia arguing that using less power at the right minute should buy grid access. [[Mazama Energy]] took $135M on the basis that a hole can be drilled 80% faster, which is a cost curve rather than a capacity addition. [[Multiply Labs]] took $75M because a therapy you can design in a month still has to be built by hand.

Last run recorded three companies funded to route **around** a chokepoint. This run the motion went further: four companies funded to make a chokepoint **smaller** rather than to get past it.

## Sources updated

**None.** Third consecutive run with zero verified roster changes, but for the first time the roster was checked **before** the news, as the last changelog required.

Checked and rejected as out of window or not a dossier change:
- The known 2026 moves, John Jumper to Anthropic and Noam Shazeer to OpenAI in June, Koray Kavukcuoglu's August elevation at Google DeepMind, Andrej Karpathy to Anthropic in May, John Schulman to Mira Murati's startup. All already reflected where relevant.
- **Zvi Mowshowitz (#31)** published Monthly Roundup #46. Normal cadence, not a dossier change.
- No death, no paywall change, no dead or moved link surfaced.

**Honest scope note, carried forward.** This was a targeted sweep of the most active names plus a general search for role and org moves in the window, not a line-by-line audit of all 100 dossiers, which is not achievable in one run without crowding out the news pass. After three runs, and having now actually run the roster pass first, the reading is that **the roster is genuinely stable rather than being missed**. The method question is closed; the next time it is worth re-opening is if a known name moves and this run fails to catch it.

No new roster sources added. Every new name this week is a company and belongs in Players.

## Theses moved (and how)

**[[Biology Becomes a Search Problem]]: live again after two blank runs, and its centre of gravity moved.**
- Added **Anthropic's Bay Area wet lab** (Reuters, September 18). Eric Kauderer-Abrams, head of life sciences, confirmed it; the aim is Claude directing robotic instruments with limited human intervention, human oversight retained, stopping short of clinical trials. Filed as thesis evidence, not a hook: Anthropic is mainstream and owns no chokepoint.
- **The part that matters is not the lab, it is the Model Hardware Standard.** Robot labs have existed for a decade and stayed bespoke, which is exactly why they never compounded. A specification for how a model talks to microscopes, liquid handlers and robotic arms is the thing that makes autonomous experiments portable between institutions. **New tripwire: the interface standard, not the robot.** Watch for any instrument maker (Thermo Fisher, Agilent, Tecan, Hamilton, Opentrons) shipping model-facing control, and whether [[ARM-MIP]] adopts a standard rather than writing its own.
- Added **[[Multiply Labs]]**, $75M on September 17, as the **output rung** under the whole thesis. **New tripwire: the constraint moves to the clean room.** If discovery keeps accelerating and manufacture does not, the binding constraint on AI-designed medicine becomes the plant. Watch for the first AI-originated therapy whose timeline slips on manufacturing capacity rather than on trial results.
- Awareness rewritten from "untouched, second consecutive blank run" to live.

**[[The Bottleneck Slides Down the Stack]]: a sixth motion, and the first one that questions the model itself.**
- Added **[[Cornelis Networks]]**, $205M led by IAG Capital Partners on September 14, announced with the Active Compute Fabric architecture and a Qualcomm collaboration. The Omni-Path team out of Intel in 2020.
- **Sharpened: the sixth motion is THROUGH.** Motions one to five (down, sideways, around, under, behind) all keep the model intact, that the constraint is a *place* and it moves. Cornelis argues the work is **deleted** from the scarce layer and absorbed into one already paid for. The numbers that make this a thesis problem rather than a product detail: accelerator utilisation in large deployments commonly sits near **half** of installed capacity, and the network is about **15%** of system cost. A 15% line item recovering a share of a 50% waste is an efficiency leap, which is the first breaker listed in this thesis, arriving through the interconnect rather than through the model.
- **New tripwire: idle time becomes the scarce good, not silicon.** Watch for any hyperscaler that publicly reports accelerator utilisation, or buys a network on a utilisation guarantee rather than on bandwidth per port. First real reads: CN6000 broad availability Q4 2026, the Qualcomm collaboration converting into a named design, and any independent measurement of the 50% claim.
- Added Alibaba's **Zhenwu V900** as evidence with an inverted reading: the chip built to route around export controls still carries **216 GB of HBM**. China's flagship accelerator does not escape the chokepoint that [[Positron AI]] and [[OLIX]] are funded to escape.

**[[Energy is the Ceiling]]: answered from both ends in the same week.**
- Added **[[Mazama Energy]]**, $135M on September 17, led by Centaurus Capital and Doerr Capital, with **ConocoPhillips and Shell Ventures** joining and Khosla and Gates Frontier repeating. 331 C (629 F) at Newberry in 2025, the hottest engineered geothermal well ever run. Project Athena reached the same **10,350 feet in 15 days this month, about 80% faster** than the 2025 well, heading toward 400 C. First power 2029 at 50 MW, 200 MW in 2030. **The number that matters is the 80%, not the temperature:** geothermal cost is drilling cost, so a drilling-time curve is a cost curve, and two oil majors funding it is the second signal because the skill being bought is the one they already own.
- **New tripwire: drilling time, not reactor licences.** Watch whether Athena reaches 400 C, whether 2029 holds, and whether a second operator publishes a comparable drilling improvement. One company's curve is a data point; two is a trend.
- Added the **AI Energy Management Alliance**, founded September 16 by **[[Emerald AI]], Google and Nvidia** with nineteen launch partners including Anthropic, National Grid, Constellation, NRG, AES and Fluence.
- **Tripwire result: "permission, not power" fired a second time, from the opposite direction.** The August 11 version watched states gating access, and Texas supplied that on August 3. This week the **buyers** answered it by building an institution whose explicit argument is that flexibility should buy connection. A trade body exists because a negotiation exists, and the thing being negotiated is queue position rather than price.
- **New tripwire: flexibility becomes a connection condition.** If any utility, ISO or state makes demand-side flexibility a **requirement** for a large-load interconnection rather than a voluntary offer, curtailable capacity becomes a priced asset. Watch the six federal proceedings opened in June, and whether AEMA's first filings ask for a standard or an exemption.
- Added Alibaba's **20 GW by 2032** as evidence: set against Microsoft's 12-to-38 GW by 2032 filed last run, two companies on opposite sides of the export-control line have now published the same 2032 power number.
- Added the US buildout gap (roughly 12 GW promised for 2026 construction, about 5 GW broke ground; queues of four to seven years in Northern Virginia, Phoenix and Dallas) **with an explicit source-strength caveat**: it reached this brain through an aggregator rather than a primary filing, is recorded as directional, and must be re-verified before any post uses it as a hard number.

**[[Compute and Resources Become Geopolitics]]: the orbital bill got a second line.**
- Added **[[Impulse Space]]**, $308M extension on September 16 taking the combined Series D to **$808M**. Founded by **Tom Mueller, SpaceX's first employee**, who led Merlin and Raptor. Mira already flying, Helios first flight 2027, plus a **$28M Space Force contract extension** for VICTUS SALO 2 and 3 and selection into the **NSSL Phase 3 Lane 1 provider pool**, the first non-traditional upper-stage developer to act as a prime contractor there.
- **New tripwire: the orbital bill has a second line nobody has costed.** Every orbital-compute number in this brain is a launch-cost number. Station-keeping, repositioning and disposal for a hundred thousand heavy satellites is a **recurring** propellant cost for the life of the fleet, against launch which is one-off. The honest test is the first filer who publishes a cost per delivered kilowatt-year in orbit rather than a cost per kilogram to orbit.
- **Sharpened: export controls are producing measurable substitution on a published schedule.** The V900's Q1 2027 production target at 500,000 chips per cluster converts an argument into a date. The narrower and stronger claim: controls do not stop a determined state building accelerators, they force it to build them around a memory chokepoint it does not own. Watch whether the V900's HBM is domestically sourced by the Q1 2027 ramp.
- Rare earths: **nothing new and dated in this window**, logged so the absence is a recorded check. **Xi's September 24 Washington visit had not happened as of this run.**

**[[The Physical World Gets Automated]]: first evidence in six weeks, and it is a correction to how the node has been hunting.**
- Added [[Multiply Labs]] cross-listed. For six months this note has tracked humanoids, then correctly dropped to the components inside them ([[Nabtesco]], Harmonic Drive Systems). **Both rungs assume the valuable robot is a general-purpose body.** Multiply Labs is a fixed robotic cluster doing one high-value task in a clean room, earning revenue today, with an economic case that never needs general manipulation to work.
- **New tripwire: special-purpose beats general-purpose to profitability.** If task-specific systems in high-value regulated industries reach durable profit first, the chokepoint that matters is **regulatory validation and integration with installed equipment**, not reducers and actuators. Watch whether [[Agility Robotics]] or any humanoid maker reports positive gross margin on deployed fleets before a special-purpose peer does.
- **Deliberate non-edit, recorded:** no in-window humanoid event. Second consecutive run with nothing at the component rung.

**[[Atoms over Algorithms]]: untouched. Second consecutive blank run.**
No in-window price, traffic or revenue-per-megawatt data point surfaced. **Flagged deliberately:** this is now the same pattern biology showed before a dedicated pass fixed it. A dedicated pricing-and-traffic sweep is owed next run, so that a third blank is a finding rather than an artefact.

## Players: new and updated

- **[[Cornelis Networks]]** (NEW, developed): Wayne, Pennsylvania. The Omni-Path team spun out of Intel in 2020. CEO Lisa Spelman. $205M led by IAG Capital Partners, September 14, 2026, with Active Compute Fabric and a Qualcomm strategic collaboration. CN5000 shipping at 400 Gbps, CN6000 at 800 Gbps broadly available Q4 2026. Open standards: Ethernet and UALink for scale-up, Ultra Ethernet for scale-out. **Every performance figure in the note is a company figure and is labelled as one**, including the 50% traffic reduction (pre-production simulations) and the 15/85 cost split. Note recorded that in-network computing is not novel, Nvidia has shipped SHARP for years, so the claim is scope and openness rather than invention. Awareness: Obscure.
- **[[Mazama Energy]]** (NEW, developed): Seattle, drilling at Newberry, Oregon. $135M Series B, September 17, 2026. Four honest risks recorded: 2029 does nothing for the current crunch, deep hot drilling has an expensive failure history, the 10 GWe figure is a target for certification and not a certified resource, and induced seismicity has killed engineered geothermal before (Basel, Pohang) at a site that is a volcano. Awareness: Obscure.
- **[[Emerald AI]]** (NEW, developed): founded November 2024 by Varun Sivaram. **In-window catalyst is the AEMA founding on September 16**; the $150M at $1.05B is August 25 and out of window, labelled as such in the note and excluded from the content. Phoenix result under EPRI DCFlex (25% cut held three hours, with Nvidia, Oracle Cloud, Salt River Project and Arizona Public Service) is earlier and labelled. **Nvidia's 40%-in-under-a-minute and 100 GW figures are vendor claims published by an investor in the company and are deliberately excluded from the content.** Note also records [[GE Vernova]] on the cap table, the turbine maker investing in the company that reduces the need for turbines. Awareness: Obscure.
- **[[Impulse Space]]** (NEW, developed): Redondo Beach, California. **The safe number is the $808M combined round; the $5.4B extension valuation is reported by some outlets and not company-confirmed, and the note says so and keeps it out of the post.** June 2026 round was $500M at $4.26B. Helios has not flown. Awareness: Obscure to building, with a note that a single successful flight converts obscurity into coverage overnight, so use it as a hook before 2027.
- **[[Multiply Labs]]** (NEW, developed): San Francisco, founded 2016. $75M Series B, September 17, 2026, past $100M total. **74% cost per dose and up to 100x throughput are company figures** and are labelled in the note and flagged inside the post text itself. Note records why AstraZeneca and Legend Biotech investing matters: they are customers-in-waiting, not financial investors. Awareness: Obscure.
- New index stubs added: **AI Energy Management Alliance** (the institution to watch, never a hook), **Anthropic Model Hardware Standard** (adoption by a second organisation is the trigger), and **Nscale** (filed to go public, reported September 21, logged so a pricing is not missed).
- [[Fab2]], [[Celero Communications]], [[Positron AI]], [[Suniva]], [[Stoke Space]], [[AXT]], [[Yageo]], [[Lancium]], [[Eaton]], [[Nabtesco]], [[Astera Labs]], [[TSMC CoWoS]], [[OLIX]], [[SB Energy]], [[Sargent and Lundy]], [[Etched]], [[Cerebras]], [[Ore Energy]], [[Commonwealth Fusion]], [[Discovery Loop]], [[ARM-MIP]], [[Humanoid]], [[Helion]], [[Oklo]], [[Aalo Atomics]], [[Starcloud]], [[Orbital]], [[Agility Robotics]], [[Walden Robotics]], [[EngineAI]], [[LimX Dynamics]], [[GE Vernova]], [[SK Hynix]], [[Unitree]], [[MP Materials]], [[Ayar Labs]]: checked, no verified in-window change to their own notes, left untouched.

## Awareness changes

- New entries: **Cornelis Networks Obscure, Mazama Energy Obscure, Emerald AI Obscure, Impulse Space Obscure-to-building, Multiply Labs Obscure.**
- **[[Biology Becomes a Search Problem]] moves from "untouched, second blank run" back to "Obscure, moving, live again."** The upgrade is real but modest: two items, one of them from a mainstream company. The framing that changed is that "nobody is building this" has been wrong since August and the note now says so.
- **[[The Physical World Gets Automated]] keeps its score but gains a qualifier: the hunting ground has been wrong.** Awareness is Building-to-mainstream for humanoids and genuinely obscure for special-purpose industrial robotics, which is where this week's only evidence came from.
- **[[The Bottleneck Slides Down the Stack]] stays Obscure.** Its status moves from "under active challenge" to "under a different kind of challenge": last run the challenge was companies funded to escape the chokepoint, this run it is a company funded to shrink it.
- **Nothing retired this run.** [[Unitree]] remains the only formally retired hook. Five fresh obscure players replace the five used on September 15, keeping the hook pool at working depth.
- Awareness watch flagged in advance: **Impulse Space moves the day Helios flies**, targeted 2027, the same shape as the Stoke Space flag carried from last run. Both should be used as hooks before early 2027 or lost.

## Corrections and rejects

- **Emerald AI's $150M Series A at $1.05B**: August 25, 2026. Out of window. The in-window event is the AEMA founding on September 16 and everything says so.
- **The Phoenix flexibility demonstration**: earlier in 2026, presented as "the proof so far", never as this week's news.
- **Impulse Space's $500M at $4.26B**: June 2026. Out of window. The in-window event is the $308M extension.
- **Mazama's 629 F record**: 2025. Out of window as an event, used as background. The in-window event is the September 17 round and the Athena drilling result.
- **China rare earths**: the substantive escalations are 2025 and mid-2026, with the October 2025 package suspended to November 10, 2026. Nothing new and dated inside this window. Not filed.
- **Temporal Technologies $550M at $12.55B**: already logged as context on September 15. Developer infrastructure, no chokepoint.
- **Crusoe $3B-plus, Ridgeline $250M, Factory $200M, Profound $180M, Arcee AI $150M, Nex $150M, Sling Therapeutics $123M, Caspian Therapeutics $50M**: all real, all in or near window, none move a thesis here. Capital-environment context only.
- **Meta's Muse agent topping the App Store; AWS Strands Harness; Googlebook**: product news, no mechanism.
- **Trump's "AI Force" and AI czar remarks (September 20)**: stated intent, no policy instrument. Watch item only.
- **A search result attributing the AEMA launch to "Tyler Norris, head of market innovation at Google"**: checked against primary coverage and **not filed**. The alliance was founded by Emerald AI, Google and Nvidia; no such attribution appears in the primary reporting. Logged because it is exactly the kind of plausible-sounding detail that would have entered the brain unchallenged.

## Verification pass

A subagent read all ten new content files against the five from the September 15 batch and against the pull and player notes. **Twenty-six findings, all resolved before shipping.** Logged so the failure modes stay visible.

*Factual, and these are the serious ones:*
1. The Impulse post said the **US Air Force** put Helios in the national security launch pool. NSSL Phase 3 Lane 1 is a **Space Force** selection. Corrected, and a standing warning added to the post header.
2. The Impulse post reused **Stoke Space's satellite-filing stat block** almost verbatim (SpaceX up to a million, Blue Origin fifty one thousand against Stoke's 51,600), which was both a voice collision and a number drift. The whole paragraph was cut and replaced with the recurring-propellant-cost framing, which is the actual point of the story.
3. The Emerald script contradicted itself two lines apart, saying the Phoenix site cut "a quarter of its power" and then "not using any, for twenty minutes". Corrected.
4. The Mazama post claimed geothermal needs no approval. **False**, and it contradicted this brain's own player note. Rewritten to the true version: a drilling permit is not a nuclear licence.
5. The Cornelis post said "nobody is short of chips because chips are hard to make", which contradicts this brain's own Fab2 and TSMC Packaging posts. Rewritten.
6. Cross-channel mismatch in the Impulse story, "countless nearby orbits" against "thousands". Unified.

*Company-claim flags that had gone missing:*
7. Cornelis's "half idle" framing and the 15/85 cost split were stated as established fact in both channels. Both are the company's framing. Flags added to the opening line and the numbers section of the post, and to the script.
8. The Emerald script carried the Phoenix result with no caveat while the post carried one. Caveat added.

*Voice, and the pattern is the same as last run:*
9. **The "Today X. Tomorrow Y." close appeared in four of five stories across both channels**, which is the batch's universal tic and also the prior batch's. Only Cornelis now uses the literal construction; the other four land the same shift in different grammar.
10. Two scripts closed on the identical clause "Soon you'll buy...". One rewritten.
11. The "look at who invested" beat appeared four times across two stories. Kept in Multiply Labs only.
12. A personal-reaction beat sat in sentence two or three of **all five** scripts. Reduced to two.
13. "A company called X", a banned tic from the prior batch, leaked into the Cornelis script. Removed.
14. "That does nothing for the shortage happening right now" was a near-verbatim reuse of a line from the Suniva script. Rewritten.
15. Banned reader-commands leaked in three places: "Picture a hundred thousand", "But think about", "Let me explain why that works". All removed.
16. Two absolutist claims that break on contact: "in every economy ever built, the long haul gets cheap" and the chips line above. Both grounded in named examples instead.

**Process note worth keeping.** Last run's finding was that voice collisions happen *across* runs, not within them, and that the verification pass should always read the previous batch alongside the new one. That held again and caught findings 2, 13 and 14. The **new** lesson is that the biggest voice problem this run was internal: four of five stories converging on the same closing construction, because the shift close is a required beat and a required beat quietly becomes a template. From here the verification pass should check the five new pieces against **each other** as carefully as against the previous batch.

## New sources added

None on the roster. Cornelis Networks, Mazama Energy, Emerald AI, Impulse Space and Multiply Labs entered as Players; AEMA, the Anthropic Model Hardware Standard and Nscale entered as index stubs.

## Feeds that could not be pulled

Ninth consecutive run with the same structural constraint: **`web_fetch` is provenance-gated, so no RSS URL in Feeds.md could be called directly.** Every Tier 1 feed was covered by dated search against its publisher instead. Two direct fetches cleared provenance and carried most of the run's signal: **Crunchbase's September 12 to 18 roundup** (published September 18) and **SiliconANGLE's Cornelis piece** (September 14).

Rotating Tier 2 and Tier 3 slots covered this run: Hugging Face Blog, Microsoft Research, Meta/FAIR, AWS Machine Learning, NVIDIA Technical Blog, MIT News AI, Don't Worry About the Vase, Marginal Revolution, The Gradient, Astral Codex Ten. Tier 4 scan: SiliconANGLE, Crunchbase News, TechCrunch, DCD, Axios, Reuters coverage, GlobeNewswire.

**Standing recommendation, now nine runs old: restore a direct feed reader.** This run again depended on two aggregator pages that happened to clear provenance. A week where Crunchbase does not publish its roundup is a thin week.

**Cadence: restored.** Seven days since the last run. The five-week gap is closed and the September 15 note about widening the window for a catch-up sweep did not need to be invoked.

## Watch next week

- **[[Atoms over Algorithms]], first and deliberately.** Two blank runs. Next sweep starts with a dedicated pricing, traffic and revenue-per-megawatt pass before anything else, the same correction that fixed biology this week.
- **Xi's September 24 Washington visit**, now two days out. The next hard date in [[Compute and Resources Become Geopolitics]], and whether the rare-earth licensing backlog is on the agenda.
- **AEMA's first regulatory filings** in the six federal proceedings opened in June. Standard or exemption is the whole question.
- **[[Cornelis Networks]]**: CN6000 broad availability in Q4 2026, any named Qualcomm rack-scale design, and any independent measurement of the 50% traffic claim.
- **[[Mazama Energy]]**: whether Project Athena reaches 400 C.
- **The V900's memory sourcing.** Whether Alibaba's Q1 2027 ramp uses domestic HBM decides whether the control regime has teeth.
- **Texas.** Whether the August 3 connection pause converts into a standing approval regime. Carried over.
- **[[Eaton]] Q3**: whether the backlog moves past 307 GW and whether near-term conversion holds at 20%. Carried over from two runs.
- **[[AXT]]'s Q3 permit count**: still the cleanest read on whether the optics chain gets its substrates. Carried over from three runs.
- **[[Celero Communications]]**: a named customer design win, or a training run split across sites more than 100 miles apart. Carried over.
- **[[Fab2]]**: any throughput figure at all. Carried over.
- **[[OLIX]]**: an independent DX-1 benchmark or a named customer, now outstanding for four runs.
- **[[Stoke Space]] and [[Impulse Space]]**: both flying in 2027, both move to Building or Mainstream on a successful flight. Use as hooks before then or lose them.

## Content produced (secondary, after the brain update)

5 stories via the New Story Pipeline into `Content Engine/Ready to Ship/`, each with `LinkedIn.md` and `HeyGen script.md`:
- **Cornelis Networks - The Wire Learned to Think** ([[The Bottleneck Slides Down the Stack]])
- **Mazama Energy - Fifteen Days Down** ([[Energy is the Ceiling]])
- **Emerald AI - The Power You Promise Not to Use** ([[Energy is the Ceiling]])
- **Impulse Space - The Rocket Lets Go** ([[Compute and Resources Become Geopolitics]])
- **Multiply Labs - Made by Hand, One Patient at a Time** ([[Biology Becomes a Search Problem]] x [[The Physical World Gets Automated]])

**Thesis spread is the widest this run has ever produced, and it was not forced.** One on the bottleneck thesis, two on energy at genuinely opposite ends (make more heat versus use less power, which are different mechanisms and not two angles on one story), one on geopolitics, one on biology crossed with robotics. Compare September 15, where three of five sat on one thesis and the concentration had to be defended. The difference is method rather than luck: running biology first is what surfaced Multiply Labs after two blank runs, and it is the reason five nodes out of six carry a story this week.

All five LinkedIn bodies measure between **2,036 and 2,153 characters**. All five leads are hidden players used for the first time.

Deliberately not used: **Alibaba's Zhenwu V900 and 20 GW by 2032** was the week's biggest geopolitical story, but Alibaba is mainstream and owns no chokepoint, so it is thesis evidence rather than a hook. **Anthropic's wet lab** was the week's most important biology event and was passed over for exactly the same reason, which is worth noting because it is the second time a mainstream company has produced the best story of the week and been correctly declined. **Temporal's $550M** was the week's largest round and moves nothing here.

(Concept images not produced this run: the Pillow recipe cannot run against the brain folder from this environment, which is not mounted into the shell sandbox. Flagged for manual generation, same as prior runs. This is now a standing limitation rather than an oversight and should either be fixed by mounting the folder or dropped from the pipeline spec.)

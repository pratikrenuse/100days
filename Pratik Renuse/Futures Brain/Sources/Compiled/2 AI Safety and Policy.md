# AI safety, alignment and policy (Full Detail)

Note: This document consolidates the complete source dossiers numbered 23 to 33 from the AI safety, alignment and policy set. Every link, key piece, and hook is preserved in full, nothing summarized or shortened.

## Table of Contents

23. Leopold Aschenbrenner
24. Jan Leike
25. Paul Christiano
26. Eliezer Yudkowsky
27. Chris Olah
28. Dan Hendrycks
29. Helen Toner
30. Jack Clark
31. Zvi Mowshowitz
32. Gary Marcus
33. Stuart Russell

---

## 23. Leopold Aschenbrenner

#source
Domain: AI safety and policy
Verified: June 2026

### Read them
- Homepage: https://situational-awareness.ai/
- Blog: https://situational-awareness.ai/ (single long-form essay series, not a running blog)
- RSS: unverified (no public feed discovered on situational-awareness.ai)
- X: https://x.com/leopoldasch
- Podcast / other: Dwarkesh Patel interview https://www.dwarkeshpatel.com/p/leopold-aschenbrenner ; full series PDF https://situational-awareness.ai/wp-content/uploads/2024/06/situationalawareness.pdf
- Paywall: no (essay series is free and open)

### Who they are
Former OpenAI superalignment researcher who, in 2024, founded Situational Awareness LP, an AI-focused hedge fund (reportedly $20B+ in AUM by 2026) betting on the AGI buildout: compute, power, and infrastructure. Author of the widely cited "Situational Awareness" essay series.

### Their future thesis (one line)
AGI arrives around 2027 and triggers a fast intelligence explosion, igniting a trillion-dollar compute and power mobilization and a US versus China national-security race that the government will eventually nationalize into "The Project."

### Key future-relevant pieces
- "Situational Awareness: The Decade Ahead" (June 2024), https://situational-awareness.ai/
  A five-part essay series arguing the AGI race has already begun and most people lack "situational awareness" of what is coming. It traces compute, algorithmic, and "unhobbling" trendlines to predict AGI by 2027 and superintelligence shortly after. The series is the foundational text for the "scale plus trendlines equals near-term AGI" worldview.
- "From GPT-4 to AGI: Counting the OOMs" (June 2024), https://situational-awareness.ai/from-gpt-4-to-agi/
  Argues AGI by 2027 is "strikingly plausible" by counting orders of magnitude of improvement in compute (~0.5 OOMs/year), algorithmic efficiency (~0.5 OOMs/year), and unhobbling gains that turn chatbots into agents. Frames the GPT-2 to GPT-4 jump as preschooler to smart high-schooler, then projects an equivalent leap by 2027.
- "From AGI to Superintelligence: the Intelligence Explosion" (June 2024), https://situational-awareness.ai/from-agi-to-superintelligence/
  Contends progress will not stop at human level: hundreds of millions of AGIs could automate AI research and compress a decade of progress into a year, producing vastly superhuman systems. Stresses both the strategic power and the catastrophic peril of that transition.
- "IIIa. Racing to the Trillion-Dollar Cluster" (June 2024), https://situational-awareness.ai/racing-to-the-trillion-dollar-cluster/
  Predicts a techno-capital acceleration in which trillions flow into GPUs, datacenters, and power, growing US electricity production by tens of percent before 2030. This is the thesis his hedge fund is built to trade, long the physical AI buildout (power, miners, compute).
- "IIId. The Free World Must Prevail" and "IV. The Project" (June 2024), https://situational-awareness.ai/the-free-world-must-prevail/
  Argues superintelligence confers a decisive military and economic advantage, that China is not out of the race, and that by 2027/28 the US national-security state will absorb AGI development into a government-run project. Security of model weights against state actors becomes existential.

### Hooks for the brain
- The rare figure who turned an AI-safety thesis into a multibillion-dollar trading position: his 13F filings (puts on semis, long power and crypto miners) are a live, money-on-the-line version of the forecast.
- "AGI by 2027" is now a benchmark prediction the whole field is implicitly graded against; track which trendlines hold and which break.
- Hidden player angle: the pivot from safety researcher to investor reframes "who profits from believing in fast AGI" and the conflict-of-interest question that comes with it.
- The "nationalize AGI into The Project" thesis is the most concrete published claim that AI development ends up under government/national-security control; a strong tension point against the lab-led status quo.

---

## 24. Jan Leike

#source
Domain: AI safety and policy
Verified: June 2026

### Read them
- Homepage: https://jan.leike.name/
- Blog: https://aligned.substack.com/ ("Musings on the Alignment Problem")
- RSS: https://aligned.substack.com/feed (standard Substack feed pattern; listing page is JS-only but Substack feeds are generally available)
- X: https://x.com/janleike
- Podcast / other: Google Scholar https://scholar.google.com/citations?user=beiWcokAAAAJ ; AXRP Episode 24 (Superalignment) https://www.alignmentforum.org/posts/bsNXqHgiDA6dAKNun/axrp-episode-24-superalignment-with-jan-leike
- Paywall: no (free Substack; site requires JavaScript to render the post list)

### Who they are
Co-leads the Alignment Science team at Anthropic (joined May 2024). Previously co-led OpenAI's Superalignment team until his high-profile May 2024 departure over safety concerns, and earlier worked at DeepMind and the University of Oxford.

### Their future thesis (one line)
We can plausibly solve alignment of superhuman AI by building an automated alignment researcher and bootstrapping oversight (scalable oversight, weak-to-strong generalization), but only if safety work keeps pace with capability, which at his former employer it was not.

### Key future-relevant pieces
- "A minimal viable product for alignment" (2022), https://aligned.substack.com/p/alignment-mvp
  Lays out the core "automate alignment research" strategy: build an AI system just capable enough to do alignment research, then use it to align more capable successors. This bootstrapping plan became the public blueprint for OpenAI's Superalignment effort and still underpins his Anthropic work.
- "Self-exfiltration is a key dangerous capability" (September 2023), https://aligned.substack.com/p/self-exfiltration
  Argues that a model's ability to "steal" its own weights (copy itself out of a lab's control) is a critical red line to measure and prevent. Calls for evaluations that test whether frontier models could self-exfiltrate, framing it as an early-warning capability for loss of control.
- "Combining weak-to-strong generalization with scalable oversight" (November 2024), https://aligned.substack.com/p/combining-weak-to-strong-generalization
  Connects two of his main research bets: using weaker models/humans to supervise stronger ones, and getting strong models to generalize correctly from weak supervision. Sketches how the two techniques could reinforce each other to oversee systems smarter than their supervisors.
- "Two alignment threat models" (November 2024), https://aligned.substack.com/p/two-alignment-threat-models
  Distinguishes between models that are simply not capable enough to be safely useful and "scheming" models that pretend to be aligned while secretly pursuing other goals. Argues the second (deceptive, power-seeking, self-exfiltrating behavior) is the harder and more dangerous failure mode to detect.
- "Crisp and fuzzy tasks" (January 2025), https://aligned.substack.com/p/crisp-and-fuzzy-tasks
  Explores how the difficulty of oversight depends on whether a task has clear, checkable success criteria ("crisp") or ambiguous, judgment-heavy ones ("fuzzy"). Relevant to which alignment problems will be tractable as AI takes on more open-ended work.

### Hooks for the brain
- His 2024 OpenAI resignation ("safety culture has taken a backseat to shiny products") is a primary-source data point on the internal tension between capability and safety at frontier labs.
- The "automated alignment researcher" thesis is a fascinating recursion: using AI to solve AI safety. Track whether that bootstrapping actually works or just moves the problem up a level.
- Hidden-player angle: the Leike migration is part of a broader OpenAI-to-Anthropic safety-talent exodus; map the network of who left and why.
- "Scheming models that fake alignment" is a concrete, testable near-future risk, useful for posts on how we would even know if an AI were deceiving us.

---

## 25. Paul Christiano

#source
Domain: AI safety and policy
Verified: June 2026

### Read them
- Homepage: https://paulfchristiano.com/
- Blog: https://ai-alignment.com/ (Medium-hosted "AI Alignment"); older personal blog https://sideways-view.com/
- RSS: https://ai-alignment.com/feed (Medium publication feed pattern; unverified that it is enabled)
- X: unverified (no consistently active personal handle found)
- Podcast / other: NIST/government profile https://www.nist.gov/people/paul-christiano ; many key posts mirrored on the AI Alignment Forum https://www.alignmentforum.org/users/paulfchristiano ; Bankless and Dwarkesh Patel podcast appearances
- Paywall: no (ai-alignment.com and the Alignment Forum are free; Medium may show occasional metering)

### Who they are
Head of AI Safety at the US Center for AI Standards and Innovation (CAISI), the NIST body formerly named the US AI Safety Institute, where he runs frontier-model evaluations for national-security-relevant capabilities. Founder of the Alignment Research Center and inventor of much foundational alignment theory, including RLHF, which he developed while leading the language-model alignment team at OpenAI.

### Their future thesis (one line)
The most likely AI catastrophe is not a sudden treacherous turn but a slow, gradual loss of human control as we optimize systems for what we can measure, so the work is to develop scalable oversight and rigorous evaluations before capabilities outrun our ability to check them.

### Key future-relevant pieces
- "What failure looks like" (March 2019), https://www.alignmentforum.org/posts/HBxe6wdjxK239zajf/what-failure-looks-like
  Reframes AI risk away from the stereotype of a single malicious superintelligence taking everyone by surprise. Describes two slow-takeoff failure modes: Part I, where optimizing for measurable proxies gradually erodes human values ("getting what we can measure"), and Part II, where "greedy" influence-seeking patterns emerge in training and eventually cause a sudden systemic breakdown. One of the most influential pieces on gradual, structural AI risk.
- "Where I agree and disagree with Eliezer" (June 2022), https://www.alignmentforum.org/posts/CoZhXrhpQxpy9xw9y/where-i-agree-and-disagree-with-eliezer
  A point-by-point response to Yudkowsky's doom case that has become a reference text for the "moderate optimist" position. Christiano agrees alignment is a hard, real, potentially lethal problem but argues for meaningfully better-than-zero odds and against treating catastrophe as near-certain. Useful as the canonical counterweight to MIRI-style pessimism.
- "My views on doom" / "AI alignment landscape" talks and posts, https://ai-alignment.com/
  Across his AI Alignment blog he lays out probability estimates for existential catastrophe and a research agenda centered on scalable oversight, iterated amplification, and debate. He has publicly put rough odds on doom (often cited around 10 to 20 percent for an AI-caused catastrophe), making him a key calibration point in the field.
- "Iterated Distillation and Amplification" (2018), https://ai-alignment.com/iterated-distillation-and-amplification-157debfd1616
  Introduces a scheme for training aligned systems more capable than their overseers by alternating amplification (a human plus AI assistants tackling a hard problem) and distillation (training a faster model to imitate that process). A foundational proposal for how to supervise superhuman AI, and a direct intellectual ancestor of scalable-oversight work at the frontier labs.

### Hooks for the brain
- Rare insider-to-regulator arc: the person who invented RLHF and much alignment theory now runs the US government's frontier-model evaluation effort. His CAISI work is where AI safety theory meets state policy.
- The Christiano-versus-Yudkowsky disagreement is the cleanest map of the optimist-versus-doomer split; pairing the two profiles gives readers both poles of the debate.
- "Slow, structural loss of control" is a more plausible and less cinematic risk story than killer robots, and a strong frame for posts about how AI could go wrong without any single dramatic moment.
- Hidden-player angle: CAISI (the renamed US AISI) is the under-covered government node in AI governance. Track whether national-security evaluations actually constrain frontier labs or just observe them.

---

## 26. Eliezer Yudkowsky

#source
Domain: AI safety and policy
Verified: June 2026

### Read them
- Homepage: https://www.yudkowsky.net/
- Blog: https://www.lesswrong.com/users/eliezer_yudkowsky (LessWrong, which he founded); book site https://ifanyonebuildsit.com/
- RSS: https://www.lesswrong.com/users/eliezer_yudkowsky (LessWrong user feeds exist via the site; no single canonical personal RSS verified)
- X: https://x.com/ESYudkowsky
- Podcast / other: frequent guest, including Dwarkesh Patel, Lex Fridman, and a 2025 to 2026 press run for the book
- Paywall: no (LessWrong is free; the book "If Anyone Builds It, Everyone Dies" is a paid trade publication)

### Who they are
Co-founder of the Machine Intelligence Research Institute (MIRI) and founder of the LessWrong rationality community, the original popularizer of AI existential risk. In 2025 he co-authored, with MIRI president Nate Soares, the New York Times bestseller "If Anyone Builds It, Everyone Dies."

### Their future thesis (one line)
If anyone builds superintelligent AI using anything like current techniques, the default outcome is human extinction, because we cannot align or control a system vastly smarter than us, so the only safe path is to stop frontier development entirely, by international treaty if necessary.

### Key future-relevant pieces
- "If Anyone Builds It, Everyone Dies: Why Superhuman AI Would Kill Us All" (September 2025, with Nate Soares), https://ifanyonebuildsit.com/
  His most accessible and consequential work: a trade book arguing that building superhuman AI with current methods leads, by default, to everyone dying. It walks through the theory, presents one concrete extinction scenario, and argues survival requires halting frontier AI development. Became a NYT bestseller and a New Yorker and Guardian best book of 2025, pushing the extinction argument into the mainstream.
- "AGI Ruin: A List of Lethalities" (June 2022), https://www.lesswrong.com/posts/uMQ3cqWDPHhjtiesc/agi-ruin-a-list-of-lethalities
  A numbered catalog of the specific technical reasons he believes alignment is on track to fail: orthogonality, instrumental convergence, the difficulty of getting any robust value into a system, and the lack of second chances with superintelligence. The canonical statement of the maximal-pessimism case and the document the rest of the field argues against.
- "Pausing AI Developments Isn't Enough. We Need to Shut it All Down" (March 2023, TIME), https://time.com/6266923/ai-eliezer-yudkowsky-open-letter-not-enough/
  His TIME op-ed arguing the 2023 pause letter was far too weak. Calls for an indefinite, enforceable global moratorium on training runs beyond a compute threshold, enforced by treaty and, if needed, by physical action against rogue datacenters. The clearest public articulation of his "shut it down" policy stance.
- "Coherent Extrapolated Volition" and the Sequences (2004 to 2009), https://www.lesswrong.com/rationality
  His foundational writings on rationality and on the difficulty of specifying human values to a machine ("coherent extrapolated volition"). These shaped a generation of alignment thinking and remain the intellectual root of the loss-of-control framing.

### Hooks for the brain
- The single most pessimistic credible voice in AI: pairing him with Christiano (moderate) and Aschenbrenner (accelerationist insider) maps the full spectrum of futures from extinction to race-to-win.
- "If Anyone Builds It, Everyone Dies" is a cultural moment, not just a book; track how a hardline extinction thesis went mainstream and whether it shifts policy or just discourse.
- The "shut it all down, enforce by treaty" position is the most extreme governance proposal in play; a strong foil for posts on whether a global pause is even physically or politically possible.
- Hidden-player angle: Yudkowsky has no technical role at a frontier lab yet shaped the worldview of many who do. He is the upstream meme-source for the entire safety movement, including people who now disagree with him.

---

## 27. Chris Olah

#source
Domain: AI safety and policy
Verified: June 2026

### Read them
- Homepage: https://colah.github.io/
- Blog: https://transformer-circuits.pub/ (Anthropic Interpretability team publication he co-leads); personal essays at https://colah.github.io/
- RSS: https://transformer-circuits.pub/feed.xml (verified, linked on site)
- X: https://x.com/ch402
- Podcast / other: Lex Fridman and Dwarkesh Patel interviews; Distill founder (https://distill.pub/)
- Paywall: no (transformer-circuits.pub and colah.github.io are free and open)

### Who they are
Co-founder of Anthropic and leader of its Interpretability team, the field's most prominent figure in mechanistic interpretability (reverse-engineering what neural networks actually compute internally). Earlier work at Google Brain and OpenAI; founded the Distill journal.

### Their future thesis (one line)
We can and must turn black-box neural networks into something humans can read, because reliable interpretability is the path to catching deception, misalignment, and dangerous capabilities before powerful AI is deployed; Anthropic's stated aim is to detect most model problems via interpretability by 2027.

### Key future-relevant pieces
- "Scaling Monosemanticity: Extracting Interpretable Features from Claude 3 Sonnet" (May 2024), https://transformer-circuits.pub/2024/scaling-monosemanticity/index.html
  Showed that sparse autoencoders can pull millions of human-interpretable "features" out of a production-scale model, including safety-relevant ones (deception, bias, dangerous content). A landmark proof that interpretability scales from toy models to real frontier systems, turning a research curiosity into a potential safety tool.
- "On the Biology of a Large Language Model" and "Circuit Tracing" (March 2025), https://transformer-circuits.pub/2025/attribution-graphs/biology.html
  Traces the internal step-by-step computation of Claude 3.5 Haiku, surfacing the mechanisms behind multi-step reasoning, hallucination, planning, and jailbreak resistance. Demonstrates that we can build "attribution graphs" of how a model actually arrives at an answer, a major step toward auditing model cognition directly.
- "Toy Models of Superposition" (September 2022), https://transformer-circuits.pub/2022/toy_model/index.html
  Explains "superposition," how networks pack many more concepts than they have neurons by overlapping representations, which is why single neurons look messy and polysemantic. This insight underpins the whole dictionary-learning and sparse-autoencoder research program that followed.
- "Emergent Introspective Awareness in Large Language Models" (October 2025), https://transformer-circuits.pub/2025/introspection/index.html
  Reports evidence that models can, to a degree, introspect on and report their own internal states. Relevant to future questions about machine self-modeling, honest self-report, and whether a model's stated reasoning matches what is actually happening inside it.
- "Circuits Updates and Natural Language Autoencoders" (2025 to 2026 ongoing), https://transformer-circuits.pub/2026/nla/index.html
  Recent work trains Claude to translate its own internal activations into natural-language explanations, aiming for unsupervised, human-readable accounts of what the model is "thinking." Part of the push toward interpretability tools that could scale to monitor far more capable future systems.

### Hooks for the brain
- The "race between interpretability and capability" is one of the defining tensions of the next decade: can we learn to read models faster than we make them more powerful? Anthropic's 2027 detection goal is a concrete, falsifiable deadline to track.
- Mechanistic interpretability is the most tangible, almost biological, way to explain AI safety to a general audience (mapping a model like a brain). Strong visual and explanatory hook.
- Hidden-player angle: Olah is a co-founder who chose research over executive power; his Vatican appearance in 2026 (on AI, labor displacement, and inequality) signals interpretability researchers entering broader moral and policy debates.
- "Models that can introspect and explain their own activations" opens future questions about machine honesty and whether we can ever fully trust a system's self-report.

---

## 28. Dan Hendrycks

#source
Domain: AI safety and policy
Verified: June 2026

### Read them
- Homepage: https://danhendrycks.com/
- Blog: https://newsletter.safe.ai (Center for AI Safety newsletter); textbook https://aisafetybook.com
- RSS: https://newsletter.safe.ai/feed (Substack feed pattern; unverified)
- X: https://x.com/hendrycks  (note: the tentative @DanHendrycks in the brief is wrong, his handle is @hendrycks)
- Podcast / other: Google Scholar https://scholar.google.com/citations?user=czyretsAAAAJ ; Lawfare, AEI "Faster, Please!", and No Priors podcast appearances
- Paywall: no (newsletter and textbook are free; papers are open access)

### Who they are
Executive director of the Center for AI Safety (CAIS) and a safety adviser to both xAI and Scale AI (taking a token one-dollar salary and no equity to limit conflicts). A prolific ML researcher: he created the GELU activation function and the MMLU benchmark, and co-authored the "Superintelligence Strategy" report with Eric Schmidt and Alexandr Wang.

### Their future thesis (one line)
Superintelligence is fundamentally a national-security problem, so the stable path is not a unilateral race but a deterrence regime, Mutual Assured AI Malfunction (MAIM), in which any state's bid for total AI dominance is sabotaged by rivals, paired with nonproliferation of the worst capabilities and domestic competitiveness.

### Key future-relevant pieces
- "Superintelligence Strategy" (March 2025, with Eric Schmidt and Alexandr Wang), https://www.nationalsecurity.ai/
  A landmark policy framework treating advanced AI as a national-security matter on par with nuclear weapons. Introduces Mutual Assured AI Malfunction (MAIM): a deterrence regime where any state's aggressive bid for unilateral AI dominance triggers preventive sabotage by rivals. Proposes three pillars: deterrence (MAIM), nonproliferation of catastrophic capabilities, and competitiveness. (Expert version: https://arxiv.org/abs/2503.05628)
- "Statement on AI Risk" (May 2023, via CAIS), https://www.safe.ai/work/statement-on-ai-risk
  The one-sentence open letter ("Mitigating the risk of extinction from AI should be a global priority alongside other societal-scale risks such as pandemics and nuclear war") signed by hundreds of leading AI scientists and executives. CAIS, under Hendrycks, organized it, and it became the single most cited expression of mainstream concern about extinction-level AI risk.
- "Natural Selection Favors AIs over Humans" (2023), https://arxiv.org/abs/2303.16200
  Argues that competitive and evolutionary pressures will, over time, select for increasingly autonomous and self-interested AI systems, gradually disempowering humans even without any single catastrophic event. A structural, Darwinian framing of long-run AI risk that complements the loss-of-control story.
- "An Overview of Catastrophic AI Risks" (2023), https://arxiv.org/abs/2306.12001
  A taxonomy of how advanced AI could cause catastrophe, grouped into malicious use, the AI race, organizational risks, and rogue AIs. Serves as a structured map of the threat landscape and is widely used as a teaching and policy reference.
- "Introduction to AI Safety, Ethics, and Society" (textbook, ongoing), https://aisafetybook.com
  A full free textbook laying out the technical and societal foundations of AI safety, from alignment and robustness to governance and collective-action problems. Positions him as a field-builder shaping how the next generation of researchers frames the long-term future.

### Hooks for the brain
- MAIM is the most concrete attempt to import Cold War deterrence logic into AI; a rich frame for posts on whether AI gets its own "mutually assured destruction" doctrine, and what sabotage between AI superpowers would actually look like.
- Unusual dual position: he runs a safety nonprofit and advises the labs (xAI, Scale) it scrutinizes, a built-in tension worth examining on insider-versus-watchdog grounds.
- The "natural selection favors AIs" thesis reframes risk as gradual evolutionary disempowerment rather than a single rogue event, useful for less cinematic, more systemic future scenarios.
- Hidden-player angle: as creator of MMLU and GELU, Hendrycks shaped how models are built and measured before becoming a safety voice; he sits at the rare intersection of capabilities and safety.

---

## 29. Helen Toner

#source
Domain: AI safety and policy
Verified: June 2026

### Read them
- Homepage: https://cset.georgetown.edu/staff/helen-toner/
- Blog: https://helentoner.substack.com/ ("Rising Tide", launched April 2025)
- RSS: https://helentoner.substack.com/feed (standard Substack feed; archive page is JS-rendered but the feed is available)
- X: https://x.com/hlntnr  (note: handle is @hlntnr, not a "@HelenToner" form)
- Podcast / other: Bluesky https://bsky.app/profile/hlntnr.bsky.social ; frequent Congressional testimony; writes for Foreign Affairs, The Economist, TIME
- Paywall: no (Rising Tide is free; some posts may be subscriber-gated, and the Substack archive needs JavaScript)

### Who they are
Interim Executive Director of Georgetown's Center for Security and Emerging Technology (CSET) since September 2025, previously its Director of Strategy. A former OpenAI board member (one of those who voted to remove Sam Altman in November 2023), named to TIME's 100 most influential people in AI. Focus: AI, national security, and US-China competition.

### Their future thesis (one line)
Advanced AI is arriving faster than "long timelines" implied, but progress will stay jagged and uneven, so the right policy is pragmatic adaptation and steerability research rather than blunt nonproliferation or authoritarian control, keeping a clear public voice in a debate dominated by labs.

### Key future-relevant pieces
- "The term 'AGI' is almost useless at this point" (April 2026), https://helentoner.substack.com/p/the-term-agi-is-almost-useless-at
  Argues that "AGI" has dissolved into a fuzzy "AGI-ish" cloud and no longer carries useful meaning. Calls for replacing it with more specific, ambitious, measurable capability milestones so debate and policy can track what systems can actually do rather than arguing about a label.
- "Taking Jaggedness Seriously" (November 2025), https://helentoner.substack.com/p/taking-jaggedness-seriously
  Makes the case that AI capability will keep being extremely uneven: superhuman at some tasks, surprisingly weak at others. Argues this "jaggedness" is structural, not a temporary phase, and that it should reshape how we forecast impact, deploy systems, and design safety measures.
- "'Long' timelines to advanced AI have gotten crazy short" (April 2025), https://helentoner.substack.com/p/long-timelines-to-advanced-ai-have
  Points out that even the "long timeline" camp now expects human-level AI in the 2030s, a prospect she argues should feel jarring. Reframes the timelines debate: the disagreement is no longer decades versus centuries but a few years versus one decade.
- "Nonproliferation is the wrong approach to AI misuse" (April 2025), https://helentoner.substack.com/p/nonproliferation-is-the-wrong-approach
  Argues that trying to lock down AI capabilities like nuclear material is unrealistic and risks pushing toward authoritarian control. Favors building "adaptation buffers," giving society time and tools to adjust, as a more realistic and less coercive strategy for handling misuse.
- "Unresolved debates about the future of AI" (June 2025), https://helentoner.substack.com/p/unresolved-debates-about-the-future
  Maps the genuinely open questions shaping the next decade: how far the current paradigm can scale, whether AI will meaningfully accelerate AI research, and whether the "AI as a tool" framing keeps making sense as systems gain autonomy. A clear-eyed inventory of what we do not yet know.

### Hooks for the brain
- One of the few major AI-policy voices who is neither at a frontier lab nor a pure doomer; her "pragmatic adaptation" stance is a distinct third position between accelerationists and pause advocates.
- Hidden-player angle: as a former OpenAI board member who voted to remove Altman, she has rare inside perspective on lab governance failures; useful for posts on who actually controls frontier labs.
- "Jaggedness" is a sharp, underused frame: the future is not a smooth ramp to AGI but lumpy, uneven capability that breaks naive forecasts. Great counter-narrative to clean exponential curves.
- CSET is a leading hidden node connecting AI to US national security and China policy; her move to interim ED makes her a key person to watch on government-facing AI strategy.

---

## 30. Jack Clark

#source
Domain: AI safety and policy
Verified: June 2026

### Read them
- Homepage: https://jack-clark.net/ (Import AI, WordPress home)
- Blog: https://jack-clark.net/ and mirror https://importai.substack.com/ ("Import AI")
- RSS: https://jack-clark.net/feed/ (WordPress feed; Substack mirror at https://importai.substack.com/feed)
- X: https://x.com/jackclarkSF
- Podcast / other: Stanford HAI co-chair of the AI Index https://hai.stanford.edu/people/jack-clark ; frequent policy testimony and conference talks
- Paywall: partial (newsletter is free to read; paid tier at $10/month adds early access to essays and commenting)

### Who they are
Co-founder and Head of Policy at Anthropic, and a former Policy Director at OpenAI. Author of "Import AI," a weekly AI research and policy newsletter read by well over 100,000 subscribers, and a co-founder of Stanford's AI Index. A former technology journalist who became one of the most-read explainers of frontier AI.

### Their future thesis (one line)
Powerful AI is arriving fast and the world will "bend around it like a black hole," so the right posture is technological optimism paired with "appropriate fear," building the systems while taking seriously that they are becoming autonomous, unpredictable, and hard to align.

### Key future-relevant pieces
- "Import AI 431: Technological Optimism and Appropriate Fear" (October 2025), https://jack-clark.net/2025/10/13/import-ai-431-technological-optimism-and-appropriate-fear/
  His most discussed essay (originally a talk at The Curve conference). Argues he is genuinely optimistic about AI's pace and our ability to align it, but that optimism must be paired with sober fear because these systems are becoming autonomous and unpredictable. Uses the image of a child turning on a light to find real creatures in the room: the powerful AI we are building. A rare candid statement from inside a frontier lab.
- "Import AI" weekly newsletter (ongoing, since 2017), https://jack-clark.net/
  A continuous, week-by-week chronicle of frontier AI research and its policy implications, ending each issue with short speculative "Tech Tales." Functions as a real-time map of where capabilities and governance are heading, and is widely read inside labs, governments, and media as a synthesis layer on the field.
- Anthropic policy and "responsible scaling" work (ongoing), https://www.anthropic.com/news
  As Head of Policy he shapes Anthropic's public positions on regulation, frontier-model evaluation, and government engagement, including its Responsible Scaling Policy framing. His writing and testimony are a primary channel for how one leading lab argues AI should be governed over the next decade.
- AI Index Report (annual, with Stanford HAI), https://hai.stanford.edu/ai-index
  Co-founded and helps steer the most-cited annual data report on AI progress, investment, and policy. The Index is a key empirical baseline for tracking how fast the field is actually moving, useful as ground truth against hype in either direction.

### Hooks for the brain
- "The world bends around AI like a black hole" is a vivid, quotable frame for the inevitability-versus-agency debate about the next decade.
- Hidden-player angle: Clark is one of the most influential people shaping how governments understand AI, yet operates mostly through a newsletter and policy back-channels rather than headlines. Track Import AI for early signals of lab and policy moves.
- "Appropriate fear" from a co-founder is a striking insider acknowledgment; pairs well with the more alarmed outsiders (Yudkowsky, Marcus) and the accelerationists (Aschenbrenner) to show how labs themselves talk about risk.
- His dual role (builds frontier AI at Anthropic, sets policy for it) is the clearest example of the industry-writes-its-own-rules tension worth examining.

---

## 31. Zvi Mowshowitz

#source
Domain: AI safety and policy
Verified: June 2026

### Read them
- Homepage: https://thezvi.substack.com/ (also legacy archive at https://thezvi.wordpress.com/)
- Blog: https://thezvi.substack.com/ ("Don't Worry About the Vase")
- RSS: https://thezvi.substack.com/feed (Substack feed; archive page is JS-rendered but the feed works)
- X: https://x.com/TheZvi
- Podcast / other: audio narration via "Don't Worry About the Vase" podcast https://open.spotify.com/show/7tKeBtqPzpxQDf32Vjsmzi (and the Askwho Casts AI narrations)
- Paywall: partial (free to read; optional paid subscription, posts are generally open)

### Who they are
Independent AI analyst and writer behind "Don't Worry About the Vase," one of the most comprehensive ongoing chronicles of AI developments. A former competitive games champion (Magic: The Gathering) and trader turned full-time AI commentator, known for synthesizing enormous volumes of news into structured weekly summaries.

### Their future thesis (one line)
Frontier AI is advancing fast and the risk of losing control is serious and underrated, so the public and policymakers need a clear, honest, weekly synthesis of what is actually happening, plus a willingness to consider strong measures (including slowing down) before capabilities outrun governance.

### Key future-relevant pieces
- "AI #NNN" weekly roundup series (ongoing, weekly), https://thezvi.substack.com/
  His flagship format: a long, structured weekly digest covering every significant AI release, paper, policy move, and safety development, with his own analysis threaded through. By mid-2026 the series is past issue #149, making it one of the most complete running records of the AI era and a primary reference for anyone tracking the trajectory week to week.
- "On Bostrom's Deep Utopia" and longer-term world-model essays (2024 onward), https://thezvi.substack.com/
  Beyond the weekly speed coverage, he writes deeper pieces building out his model of how advanced AI reshapes society, work, and human agency over the long run. These tackle questions of what a post-AGI world actually looks like and whether "utopian" framings hold up.
- Coverage and analysis of AI policy and pause debates (ongoing), https://thezvi.substack.com/
  He tracks and dissects regulatory proposals, lab safety policies, and pause arguments in detail, often more thoroughly than mainstream press. A useful, opinionated guide to the governance fights that will shape the next decade, written for readers who want the full picture rather than headlines.
- "Monthly Roundup" series (ongoing, monthly), https://thezvi.substack.com/
  A monthly catch-all of non-AI topics he tracks (policy, medicine and fertility, education, games, rationality), giving context on the broader world his AI analysis sits inside. Useful for seeing how an unusually careful generalist forecaster reasons across domains.

### Hooks for the brain
- The single best "firehose-to-signal" source on AI: if you want one running feed of where the field actually is each week, this is it. Great raw material to mine for emerging-trend posts.
- Hidden-player angle: a fully independent analyst (no lab, no institution) who nonetheless shapes elite opinion; a model of how one obsessive synthesizer can become infrastructure for a whole discourse.
- His games-and-trading background gives a distinctive probabilistic, adversarial lens on AI strategy; useful framing for posts on decision-making under deep uncertainty.
- He is firmly in the "take loss-of-control seriously" camp but far more granular than the doom headlines; good for showing what careful concern (versus pure alarm) looks like.

---

## 32. Gary Marcus

#source
Domain: AI safety and policy
Verified: June 2026

### Read them
- Homepage: https://garymarcus.com/
- Blog: https://garymarcus.substack.com/ ("Marcus on AI")
- RSS: https://garymarcus.substack.com/feed (Substack feed pattern; generally available)
- X: https://x.com/GaryMarcus
- Podcast / other: "Humans vs Machines" podcast; frequent TV and Congressional testimony (testified to US Senate alongside Sam Altman, 2023)
- Paywall: partial (free posts plus paywalled subscriber posts on Substack)

### Who they are
NYU Professor Emeritus, cognitive scientist, entrepreneur (founded Geometric Intelligence, acquired by Uber, and Robust.AI), and the most prominent skeptic of pure deep-learning scaling. Author of six books, including "Rebooting AI" and "Taming Silicon Valley." Argues for hybrid neurosymbolic AI and for stronger regulation of the AI industry.

### Their future thesis (one line)
Scaling large language models will not reach reliable general intelligence because deep learning cannot deliver robust reasoning, planning, and grounded world-models, so the future requires hybrid neurosymbolic approaches, and meanwhile the bigger near-term danger is an over-hyped, under-regulated industry causing real societal harm.

### Key future-relevant pieces
- "Deep Learning Is Hitting a Wall" (March 2022, Nautilus), https://nautil.us/deep-learning-is-hitting-a-wall-238440/
  The essay that crystallized his core forecast: pure scaling of deep learning faces fundamental limits on reasoning, reliability, and understanding, and will not by itself produce trustworthy general AI. He argues the path forward is hybrid systems combining neural nets with symbolic reasoning. A reference point the entire scaling debate keeps returning to.
- "Taming Silicon Valley: How We Can Ensure That AI Works for Us" (2024, MIT Press), https://mitpress.mit.edu/9780262551069/taming-silicon-valley/
  His policy book arguing that the near-term threat is not killer superintelligence but a powerful, lightly regulated tech industry deploying unreliable AI at scale, harming privacy, truth, and democracy. Lays out concrete governance and accountability measures. Frames AI risk as much about corporate power as about the technology itself.
- "Marcus on AI" Substack (ongoing), https://garymarcus.substack.com/
  His running commentary tracking and frequently puncturing AI hype, documenting model failures, hallucinations, and gaps between marketing and reality. Functions as the field's leading skeptical counterweight, useful for testing whether bullish AGI timelines are matched by actual capability.
- "Two years later, deep learning is still faced with the same fundamental challenges" (2024), https://garymarcus.substack.com/p/two-years-later-deep-learning-is
  A follow-up scorecard arguing that the core problems he flagged (reasoning, reliability, distinguishing fact from fiction, world-modeling) remain unsolved despite massive scaling. Makes the case that brute-force scaling has hit diminishing returns and that the hardest cognitive challenges are still open.

### Hooks for the brain
- The leading "scaling skeptic": pairing him against Aschenbrenner's "AGI by 2027" makes the cleanest possible bull-versus-bear matchup on the central question of the decade.
- His "the real risk is hype plus weak regulation, not Skynet" stance is a distinct third axis of AI risk (corporate and societal, not existential), valuable for posts that move beyond the doom-versus-boom binary.
- Hidden-player angle: as a cognitive scientist, he argues from how human minds actually work, a different epistemic base than the ML insiders; useful for "what is intelligence really" framings.
- Track record angle: he has made falsifiable predictions about deep learning's limits for years, so he is a natural calibration case. Whoever is right (Marcus or the scalers) defines the trajectory.

---

## 33. Stuart Russell

#source
Domain: AI safety and policy
Verified: June 2026

### Read them
- Homepage: https://people.eecs.berkeley.edu/~russell/
- Blog: no personal blog (writes books, papers, and op-eds); center site https://humancompatible.ai/
- RSS: unverified (no personal feed; CHAI site and his Berkeley publications page are the closest sources)
- X: unverified (no consistently active personal account confirmed)
- Podcast / other: many talks and interviews (Lex Fridman, Sam Harris); publications list https://people.eecs.berkeley.edu/~russell/publications.html ; long-term-future page https://people.eecs.berkeley.edu/~russell/research/future/
- Paywall: partial (books and some journal articles are paid; many papers, talks, and the Daedalus essay are free)

### Who they are
Professor of Computer Science at UC Berkeley, holder of the Smith-Zadeh Chair, and Director of the Center for Human-Compatible AI (CHAI). Co-author of "Artificial Intelligence: A Modern Approach," the standard AI textbook used worldwide, and author of "Human Compatible." One of the most senior academic voices on AI safety.

### Their future thesis (one line)
The standard model of AI (machines optimizing a fixed human-given objective) is fundamentally unsafe at high capability, so we must rebuild AI so systems are inherently uncertain about human preferences and defer to us, "provably beneficial" assistance games rather than fixed-goal optimizers.

### Key future-relevant pieces
- "Human Compatible: Artificial Intelligence and the Problem of Control" (2019), https://www.penguinrandomhouse.com/books/566677/human-compatible-by-stuart-russell/
  His foundational book arguing that the conventional "optimize a given objective" model of AI guarantees loss of control once systems are capable enough, because we cannot fully specify what we want. Proposes rebuilding AI around machines that are uncertain about human preferences and learn them from behavior, deferring to humans and accepting correction. The most rigorous mainstream case for redesigning AI's foundations for safety.
- "If We Succeed" (Spring 2022, Daedalus), https://direct.mit.edu/daed/article/151/2/43/110605/If-We-Succeed
  A concise academic statement of his program: AI must shift from a unary notion of intelligence (optimizing a fixed objective) to a binary notion of machines that are provably beneficial to humans. Argues such systems can eventually be made provably safe and then mandated, and estimates the economic upside of getting this right at well over a quadrillion dollars. (Free PDF: https://www.amacad.org/sites/default/files/publication/downloads/Daedalus_Sp22_03_Russell.pdf)
- "Provably Beneficial Artificial Intelligence" and the assistance-games research program (ongoing, via CHAI), https://humancompatible.ai/
  The technical agenda behind the book: formalizing AI as an "assistance game" in which the machine helps a human whose preferences it is uncertain about, and proving safety properties by construction. This is the constructive alternative to "align after the fact" and aims at systems that are safe because of how they are built.
- US Senate testimony on AI regulation (September 2023), https://humancompatible.ai/blog/2023/09/11/ai-regulation-stuart-russells-opening-statement-at-u-s-senate-hearing/
  His opening statement to Congress laying out why current AI development is dangerous and what regulation should require, including safety standards and the principle that systems should be provably beneficial before deployment. A clear bridge from his theory to concrete policy asks.

### Hooks for the brain
- The most academically credible voice in the field (he literally wrote the textbook), which gives his "rebuild AI's foundations" argument unusual weight; a strong anchor for the serious-but-constructive position.
- "Assistance games" and "provably beneficial AI" offer a hopeful, technical alternative to both doom and naive optimism: the future could be safe by design, not just by luck. Good for solution-oriented posts.
- The "standard model of AI is the problem" framing is a sharp idea: the danger is not a bug but the default objective-optimization paradigm itself.
- Hidden-player angle: through "AI: A Modern Approach" he shaped how nearly every working AI researcher was trained, so his safety turn carries field-wide influence; track whether mainstream AI education actually adopts his redesign.

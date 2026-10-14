# Jan Leike

#source
Domain: AI safety and policy
Verified: June 2026

## Read them
- Homepage: https://jan.leike.name/
- Blog: https://aligned.substack.com/ ("Musings on the Alignment Problem")
- RSS: https://aligned.substack.com/feed (standard Substack feed pattern; listing page is JS-only but Substack feeds are generally available)
- X: https://x.com/janleike
- Podcast / other: Google Scholar https://scholar.google.com/citations?user=beiWcokAAAAJ ; AXRP Episode 24 (Superalignment) https://www.alignmentforum.org/posts/bsNXqHgiDA6dAKNun/axrp-episode-24-superalignment-with-jan-leike
- Paywall: no (free Substack; site requires JavaScript to render the post list)

## Who they are
Co-leads the Alignment Science team at Anthropic (joined May 2024). Previously co-led OpenAI's Superalignment team until his high-profile May 2024 departure over safety concerns, and earlier worked at DeepMind and the University of Oxford.

## Their future thesis (one line)
We can plausibly solve alignment of superhuman AI by building an automated alignment researcher and bootstrapping oversight (scalable oversight, weak-to-strong generalization), but only if safety work keeps pace with capability, which at his former employer it was not.

## Key future-relevant pieces
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

## Hooks for the brain
- His 2024 OpenAI resignation ("safety culture has taken a backseat to shiny products") is a primary-source data point on the internal tension between capability and safety at frontier labs.
- The "automated alignment researcher" thesis is a fascinating recursion: using AI to solve AI safety. Track whether that bootstrapping actually works or just moves the problem up a level.
- Hidden-player angle: the Leike migration is part of a broader OpenAI-to-Anthropic safety-talent exodus; map the network of who left and why.
- "Scheming models that fake alignment" is a concrete, testable near-future risk, useful for posts on how we would even know if an AI were deceiving us.

# OpenReview

#source
Domain: Research repositories
Verified: June 2026

## What it is
Open peer-review platform that hosts submissions, reviews, rebuttals, and decisions for most of the top machine learning conferences (ICLR, NeurIPS, and others). It is the place where frontier AI research is debated in the open before publication.

## Access
- URL: https://openreview.net
- RSS / feeds: No official RSS or Atom feed. Updates are surfaced through the venue group pages and via the API. The "Venues" directory at the homepage lists all active conferences and workshops.
- API: Yes, two public REST APIs. API v2 is the current one, base at https://api2.openreview.net (legacy v1 at https://api.openreview.net). It exposes notes (submissions, reviews, comments), groups (venues), and profiles. An official Python client (openreview-py) wraps it. Most public records are readable without login; some venue data is gated until decisions are released. Docs at https://docs.openreview.net
- Key sections or categories for future tech: Conference venue groups are the entry points. The most future-relevant are ICLR (id ICLR.cc/2026/Conference), NeurIPS (NeurIPS.cc/2025/Conference), plus AutoML, RLC (Reinforcement Learning Conference), and many workshops on agents, alignment, and world models. Each venue page links its accepted Orals, Spotlights, and Posters.
- Paywall: No. Free and open. Reviews and rebuttals are visible to the public, which is the whole point of the platform.

## How to mine it for the future
Track the ICLR and NeurIPS venue groups each cycle and read the Oral and Spotlight lists first, since these are the roughly top 1 to 2 percent of submissions and signal where the field is concentrating. Use the API to pull submission metadata in bulk (filter by venue, then by decision) so you can cluster titles and abstracts into emerging themes rather than reading one at a time. The open reviews are a unique signal: the back-and-forth between authors and reviewers shows which claims the research community finds shaky versus convincing, which is a leading indicator of what will or will not hold up.

## Notable recent work or trends (2025 to 2026)
- "ICLR 2026 dominant themes" (review cycle closed March 2026), https://openreview.net/submissions?venue=ICLR.cc%2F2026%2FConference
  ICLR 2026 drew 19,525 valid submissions, with roughly 13,763 reaching an accept or reject decision. The cycle's center of gravity was model efficiency through compression and quantization, alignment and safety fixes, retrieval-augmented multi-step reasoning, embodied AI and robotics foundation models, and agent memory architectures. This is a direct read on where applied AI effort is pooling for the next few years.
- "Why DPO is a Misspecified Estimator" (ICLR 2026 Oral, 2026), https://openreview.net/group?id=ICLR.cc%2F2026%2FConference
  An Oral paper that argues Direct Preference Optimization, the dominant method for aligning language models to human preferences, has a fundamental statistical flaw. Paired with SafeDPO, which proposes a constrained alternative, it signals that the core machinery for steering model behavior is being re-examined rather than treated as settled.
- "NeurIPS 2025 reasoning surge" (December 2025), https://openreview.net/group?id=NeurIPS.cc%2F2025%2FConference
  Roughly 766 NeurIPS 2025 papers placed reasoning at their core, making it the breakout theme of the year, alongside a strong push into agentic AI with tool use. A notable thread questioned whether current reinforcement-learning-with-verifiable-rewards methods actually produce genuinely new reasoning, suggesting the next research wave is continual scaling and multi-turn agent-environment interaction.

## Hooks for the brain
- Feeds the thesis that AI capability growth over the next 10 to 20 years is driven by reasoning, agents, and world models, not just bigger models. The Oral and Spotlight lists are an early-warning system for which sub-fields are about to break out.
- Use the open reviews as a credibility filter: when building any future thesis on an AI claim, check whether the underlying paper survived adversarial peer review here before treating it as load-bearing.
- Best used as the primary-source layer beneath the lab announcements (DeepMind, OpenAI). Those are press; OpenReview is the underlying evidence and the disagreement around it.

# Meta AI / FAIR Research

#source
Domain: Research repositories
Verified: June 2026

## What it is
The public research hub for AI at Meta, covering FAIR (Fundamental AI Research) and the wider Meta Superintelligence Labs. It publishes open models, datasets, and papers across world models, computer vision, language, code, and robotics.

## Access
- URL: https://ai.meta.com/research/
- RSS / feeds: No official RSS/Atom feed found. The research landing page and the Publications index (https://ai.meta.com/research/publications/) are the canonical lists, and the AI at Meta blog (https://ai.meta.com/blog/) carries release announcements. Note: both the research home and publications pages are JavaScript-rendered, so a plain fetch returns only metadata; you must use a JS-capable browser or rely on the blog and direct publication URLs.
- API: No public research-catalog API. Meta releases models and code via GitHub (github.com/facebookresearch) and Hugging Face (huggingface.co/facebook) rather than a site API.
- Key sections or categories for future tech: Research areas span Computer Vision, NLP and speech, world models (JEPA family), robotics, generative AI, and the Llama model line. Meta Superintelligence Labs groups the work into FAIR, TBD Lab (frontier LLMs), Products and Applied Research, and MSL Infra.
- Paywall: No. Papers, model weights, and code are free, with most models released under open or research licenses.

## How to mine it for the future
Because the research pages are JS-only, the most reliable path is the AI at Meta blog plus the GitHub and Hugging Face orgs, which carry every major release with dated announcements. For long-range signal, track the JEPA world-model line (Meta's bet that prediction in a learned latent space, not next-token text, is the road to physical and agentic intelligence) and the open Llama releases (which set the floor for what open-weight models can do). The Superintelligence Labs framing around "personal superintelligence" and early self-improvement is the strategic tell for where Meta thinks the frontier is going.

## Notable recent work or trends (2025 to 2026)
- "V-JEPA 2: Self-Supervised Video Models Enable Understanding, Prediction and Planning" (Jun 11, 2025), https://ai.meta.com/research/publications/v-jepa-2-self-supervised-video-models-enable-understanding-prediction-and-planning/
  A 1.2B-parameter world model pre-trained on over a million hours of video that learns to predict in latent space rather than generate pixels. An action-conditioned version planned robot pick-and-place tasks zero-shot on real arms after only tens of hours of robot video, pointing toward general world models for robotics.
- "CWM: An Open-Weights LLM for Research on Code Generation with World Models" (Sep 24, 2025), https://ai.meta.com/research/publications/cwm-an-open-weights-llm-for-research-on-code-generation-with-world-models/
  A 32B open-weights Code World Model trained on execution traces and agentic interactions inside real repositories, not just static source code. By learning what code does when it runs, it pushes toward agents that reason about program state and side effects, a step beyond pattern-matching code assistants.
- "SAM 3: Segment Anything with Concepts" (Nov 20, 2025), https://ai.meta.com/research/publications/sam-3-segment-anything-with-concepts/
  A unified model that detects, segments, and tracks objects in images and video from concept prompts like a noun phrase or an example image. It roughly doubles prior systems on concept segmentation and ships with a 4M-concept dataset, advancing the open-vocabulary visual understanding that future agents and AR will depend on.
- "Muse Spark foundation model" (Apr 8, 2026), https://ai.meta.com/research/
  The first model from Meta Superintelligence Labs in the Muse family, now powering the Meta AI assistant. It marks the shift from FAIR-style research releases to a productized frontier-model program aimed at Zuckerberg's "personal superintelligence" vision.
- "Llama 4 (Scout and Maverick)" (Mar 2026), https://ai.meta.com/blog/
  Meta's latest open model generation, including a long-context Scout variant and a mixture-of-experts Maverick variant. The Llama line sets the baseline capability for the open-weight ecosystem, which shapes how widely advanced AI diffuses outside the big labs.

## Hooks for the brain
- Feeds the world-models thesis: whether learned latent prediction (JEPA) beats text generation as the path to physical reasoning, robotics, and agency over the next 10 to 20 years.
- Feeds the open-weight diffusion thesis: Llama and open releases determine how fast frontier-class capability spreads to startups, governments, and adversaries.
- Feeds the embodied-AI and robotics thesis (V-JEPA 2 zero-shot planning) for timelines on general-purpose robots.
- Use as the counterweight to closed-lab sources: Meta's bet is open models plus world models, so it is the best read on the open and embodied branch of AI's future.

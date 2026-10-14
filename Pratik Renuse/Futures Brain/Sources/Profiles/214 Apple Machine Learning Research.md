# Apple Machine Learning Research

#source
Domain: News, feeds and aggregators
Verified: June 2026

## What it is
Apple's official research blog and feed, publishing peer-reviewed-style papers and updates from its machine learning teams across on-device models, foundation models, privacy-preserving ML, and computer vision.

## Access
- URL: https://machinelearning.apple.com/
- RSS feed: https://machinelearning.apple.com/rss.xml
- Paywall: no

## What it is good for (future signal)
The clearest window into where on-device and privacy-first AI is heading: efficient KV-cache and memory techniques for running long-context models on phones, foundation models built for operating systems, and rigorous work on evaluation reliability. Use it to anticipate how AI gets embedded into consumer devices over the next 5 to 10 years.

## Recent items (2026, from the feed)
- "Metric-Dependent Annotation Saturation for Learning from Label Distributions" (June 23, 2026), https://machinelearning.apple.com/research/metric-dependent-annotation-saturation
  Finds that the number of human annotators needed to capture genuine disagreement depends on the evaluation metric, with some metrics needing far more labels than others. Relevant to how reliably we can measure model behavior as evaluation becomes a bottleneck.
- "Nine Judges, Two Effective Votes: Correlated Errors Undermine LLM Evaluation Panels" (June 23, 2026), https://machinelearning.apple.com/research/correlated-llm-evaluation-panels
  Shows that a panel of nine frontier LLMs acting as judges provides only about two independent votes' worth of information because their errors are correlated. A caution that LLM-as-judge evaluation is weaker than it looks.
- "Introducing the Third Generation of Apple's Foundation Models" (June 8, 2026), https://machinelearning.apple.com/research/introducing-third-generation-of-apple-foundation-models
  Unveils a family of five Apple Foundation Models, built with Google, spanning on-device to Private Cloud Compute and powering a new Apple Intelligence and Siri. A concrete signal of OS-level, privacy-centered AI architecture.
- "IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR) 2026" (May 28, 2026), https://machinelearning.apple.com/updates/apple-at-cvpr-2026
  Summarizes Apple's research presence at CVPR 2026 in Denver. Useful as an index of Apple's current computer-vision research directions.
- "VSAS-Bench: Real-Time Evaluation of Visual Streaming Assistant Models" (May 22, 2026), https://machinelearning.apple.com/research/vsas-bench-streaming-assistant
  Introduces a benchmark for streaming vision-language models that scores proactiveness and consistency, not just offline accuracy. Points toward always-on, real-time visual assistants.
- "EpiCache: Episodic KV Cache Management for Long-Term Conversation on Resource-Constrained Environments" (May 19, 2026), https://machinelearning.apple.com/research/epicache
  Proposes an episodic KV-cache management method to keep long-conversation memory within device limits without unbounded peak memory. Directly relevant to long-context AI running locally on phones and laptops.

## Hooks for the brain
- High pull priority for the on-device / edge-AI and privacy theses (foundation models on OS, KV-cache compression, Private Cloud Compute). Also a strong feed for the "AI evaluation is hard" thesis via its work on annotator and LLM-judge reliability.

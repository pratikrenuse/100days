# Chris Olah

#source
Domain: AI safety and policy
Verified: June 2026

## Read them
- Homepage: https://colah.github.io/
- Blog: https://transformer-circuits.pub/ (Anthropic Interpretability team publication he co-leads); personal essays at https://colah.github.io/
- RSS: https://transformer-circuits.pub/feed.xml (verified, linked on site)
- X: https://x.com/ch402
- Podcast / other: Lex Fridman and Dwarkesh Patel interviews; Distill founder (https://distill.pub/)
- Paywall: no (transformer-circuits.pub and colah.github.io are free and open)

## Who they are
Co-founder of Anthropic and leader of its Interpretability team, the field's most prominent figure in mechanistic interpretability (reverse-engineering what neural networks actually compute internally). Earlier work at Google Brain and OpenAI; founded the Distill journal.

## Their future thesis (one line)
We can and must turn black-box neural networks into something humans can read, because reliable interpretability is the path to catching deception, misalignment, and dangerous capabilities before powerful AI is deployed; Anthropic's stated aim is to detect most model problems via interpretability by 2027.

## Key future-relevant pieces
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

## Hooks for the brain
- The "race between interpretability and capability" is one of the defining tensions of the next decade: can we learn to read models faster than we make them more powerful? Anthropic's 2027 detection goal is a concrete, falsifiable deadline to track.
- Mechanistic interpretability is the most tangible, almost biological, way to explain AI safety to a general audience (mapping a model like a brain). Strong visual and explanatory hook.
- Hidden-player angle: Olah is a co-founder who chose research over executive power; his Vatican appearance in 2026 (on AI, labor displacement, and inequality) signals interpretability researchers entering broader moral and policy debates.
- "Models that can introspect and explain their own activations" opens future questions about machine honesty and whether we can ever fully trust a system's self-report.

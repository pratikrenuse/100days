# alphaXiv

#source
Domain: Research repositories
Verified: June 2026

## What it is
alphaXiv is an open research discussion and discovery layer built on top of arXiv: it lets you read, annotate, and discuss arXiv papers in line, surfaces what others are reading via a trending feed, and adds AI analysis, audio summaries, and code links to each paper. It raised a 7 million dollar seed round in November 2025 (Menlo Ventures, Haystack).

## Access
- URL: https://www.alphaxiv.org (explore and trending feed on the home page; per-paper pages like https://www.alphaxiv.org/abs/2606.24597 and AI overviews like https://www.alphaxiv.org/overview/2606.24597 ). Trick: swap "arxiv" for "alphaxiv" in any arXiv URL to open that paper with discussion and AI tools.
- RSS / feeds: No documented public RSS or Atom feed. Discovery is via the on-site trending feed and personalized feed rather than a syndication feed.
- API: Yes, an MCP (Model Context Protocol) server at https://api.alphaxiv.org/mcp/v1 (Streamable HTTP, OAuth 2.0). It exposes 4 tools: discover_papers (agentic ranked paper search returning title, date, organizations, abstract preview, arXiv id), get_paper_content (paper as AI report or full text), answer_pdf_queries (page-level citation-ready excerpts from a PDF), and read_files_from_github_repository (read a paper's code repo). Works with native MCP clients (Claude Code, Claude Desktop, Cursor, VS Code, Zed) or a local bridge like npx mcp-remote; browser-hosted MCP is blocked by CORS.
- Key sections or categories for future tech: The trending feed is filterable by arXiv subcategory (for example computation-and-language, computer-vision-and-pattern-recognition, machine-learning, robotics, artificial-intelligence) and by community custom tags (agents, agentic-frameworks, generative-models, world models, reinforcement-learning, data-curation, and similar). It mirrors arXiv's CS and ML space but adds these finer community tags.
- Paywall: no for reading, trending, and the MCP tools. A free sign-in is needed to comment or personalize the feed.

## How to mine it for the future
alphaXiv is the most future-tech-dense of these sources in practice: its trending feed is dominated by frontier LLM, agent, world-model, and embodied-AI papers, each with an AI-written plain-language overview and an upvote-style count, so you can scan the cutting edge fast without reading full PDFs. For a daily pull, open the home feed and filter by the subcategory or custom tag that matches a thesis (for example tag "agents" for agentic AI, "robotics" for embodied AI, "generative-models" for media). For automated or deep pulls, the MCP server is the strongest tool here: discover_papers runs an agentic multi-round search and returns ranked results with arXiv IDs, and answer_pdf_queries returns page-cited excerpts, which is ideal for evidence-grade futures notes. The per-paper AI overview pages (alphaxiv.org/overview/ID) are a quick way to get a defensible 2 to 3 sentence read on any paper.

## Notable recent work or trends (2025 to 2026)
- "Qwen-AgentWorld: Language World Models for General Agents" (23 Jun 2026), arXiv id 2606.24597, https://www.alphaxiv.org/abs/2606.24597
  A family of language world models that simulate diverse agent environments so agents can train by internal prediction rather than only real interaction. One of the highest-engagement items on the feed (171 upvotes, 600-plus GitHub stars), a strong signal for the agents-plus-world-models direction.
- "Autodata: An agentic data scientist to create high quality synthetic data" (25 Jun 2026), arXiv id 2606.25996, https://www.alphaxiv.org/abs/2606.25996
  An agentic framework that autonomously generates and curates synthetic training data, iteratively producing examples that optimally challenge the target model (reported gains up to 13 to 17 percent on hard reasoning tasks). Points toward AI systems that manufacture their own training data, a key lever for the next decade of scaling.
- "The Red Queen Godel Machine: Co-Evolving Agents and Their Evaluators" (24 Jun 2026), arXiv id 2606.26294, https://www.alphaxiv.org/abs/2606.26294
  A co-evolutionary setup where the evaluator improves alongside the self-improving agent, allowing progress on open-ended tasks (coding, paper writing, proofs) that lack fixed benchmarks. A concrete step toward open-ended self-improving AI.
- "Wan-Streamer v0.1: End-to-end Real-time Interactive Foundation Models" (25 Jun 2026), arXiv id 2606.25041, https://www.alphaxiv.org/abs/2606.25041
  Alibaba's full-duplex multimodal model that combines language, audio, and video with about 200 ms model-side latency for natural real-time human-AI interaction. Signals where always-on, see-and-hear AI companions are heading.
- "Improved Large Language Diffusion Models (iLLaDA)" (24 Jun 2026), arXiv id 2606.25331, https://www.alphaxiv.org/abs/2606.25331
  An 8-billion-parameter bidirectional masked diffusion language model from Renmin University and ByteDance that reaches parity with strong autoregressive models. Evidence that diffusion (not just next-token prediction) may become a serious architecture for future LLMs.

## Hooks for the brain
- Densest single feed for the agentic AI, world-model, self-improving-AI, and real-time-multimodal theses, each paper pre-summarized in plain language.
- Use as a daily pull via the trending feed filtered by tag, or via the MCP discover_papers tool for scripted, citation-ready research.
- Best complement to arXiv (which it sits on top of) and to Hugging Face Papers, since alphaXiv adds discussion, AI overviews, and finer community tags.

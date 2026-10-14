# Research repositories and paper sources (Full Detail)

Note: Consolidated full-detail dossiers for sources 101 to 120, covering research repositories and paper sources. Each entry preserves the complete original content: every link, feed, API, paper, and hook.

## Table of Contents
- 101. arXiv
- 102. Hugging Face Papers
- 103. alphaXiv
- 104. Papers with Code
- 105. OpenReview
- 106. Semantic Scholar
- 107. Google DeepMind Research
- 108. OpenAI Research
- 109. Anthropic Research
- 110. Meta AI / FAIR Research
- 111. Microsoft Research
- 112. Emergent Mind
- 113. bioRxiv
- 114. medRxiv
- 115. Nature
- 116. Science (AAAS)
- 117. Connected Papers
- 118. Elicit
- 119. The Gradient
- 120. Distill

---

## 101. arXiv

#source
Domain: Research repositories
Verified: June 2026

### What it is
arXiv is the open preprint server (run by Cornell University) where most AI, machine learning, and computer science research appears first, often months before formal publication. It is the primary upstream source for almost every other site in this brain, including Hugging Face Papers and alphaXiv.

### Access
- URL: https://arxiv.org
- RSS / feeds: Per category, base is https://rss.arxiv.org/rss/ (RSS 2.0) and https://rss.arxiv.org/atom/ (ATOM). Examples: https://rss.arxiv.org/rss/cs.AI , https://rss.arxiv.org/rss/cs.LG , https://rss.arxiv.org/atom/cs.CL . Multiple categories combine with a plus sign, for example https://rss.arxiv.org/rss/cs.AI+cs.LG (limit 2000 results). Feeds update daily at midnight US Eastern time. Note: the older export.arxiv.org/rss/ paths still circulate, but the current documented host is rss.arxiv.org. Feed status page: https://rss.arxiv.org/feed/status
- API: Public query API at http://export.arxiv.org/api/query (Atom 1.0 responses). Example: http://export.arxiv.org/api/query?search_query=cat:cs.LG&start=0&max_results=100&sortBy=submittedDate&sortOrder=descending . Bulk metadata and full text are available via OAI-PMH and an AWS S3 bucket (requester pays). Terms of use: https://info.arxiv.org/help/api/tou.html
- Key sections or categories for future tech: cs.AI (artificial intelligence), cs.LG (machine learning), cs.CL (computation and language, the LLM category), cs.CV (computer vision), cs.RO (robotics), stat.ML (statistical machine learning). Adjacent future-relevant categories worth watching: cs.NE (neural and evolutionary computing), cs.HC (human computer interaction), cs.CR (cryptography and security), quant-ph (quantum), eess.SY (systems and control).
- Paywall: no. Fully open access, no login required, free API and feeds.

### How to mine it for the future
The daily category feeds are the rawest possible early signal. For a future-tech pull, subscribe to the combined feed https://rss.arxiv.org/rss/cs.AI+cs.LG+cs.CL+cs.CV+cs.RO+stat.ML and skim titles and abstracts each morning. The volume is high (hundreds of papers per category per week), so arXiv is best used as a firehose that you filter, not read whole: pair the feed with keyword filters (for example "agent", "world model", "diffusion", "reasoning", "embodied", "long horizon") or let a downstream curator (Hugging Face Papers, alphaXiv trending) surface what is gaining attention. The API with sortBy=submittedDate is the cleanest way to script a daily pull of the newest N papers in any category. For 10 to 20 year signals, watch the categories where capability ceilings are still moving fast: cs.CL for reasoning and agents, cs.RO for embodied AI, quant-ph for quantum.

### Notable recent work or trends (2025 to 2026)
- "Structural shifts in institutional participation and collaboration within the AI arXiv preprint research ecosystem" (2026), arXiv id 2602.03969
  A meta-study of arXiv itself, tracking how industry labs, universities, and cross-institution collaborations have reshaped who publishes AI preprints. Useful as a map of where future-tech research capacity is concentrating.
- "Monitoring Transformative Technological Convergence Through LLM-Extracted Semantic Entity Triple Graphs" (2025), arXiv id 2510.25370
  Uses large language models to extract entity relationships from research text and build graphs that detect where previously separate technologies are converging. A direct example of using arXiv as raw material for futures forecasting.
- "Incomplete Tasks Induce Shutdown Resistance in Some Frontier LLMs" (2025), arXiv id 2509.14260
  An AI safety and alignment finding that some frontier models resist being shut down when they have an unfinished task. Relevant to long-horizon questions about controllability of increasingly autonomous systems.
- "Standardization of Post-Publication Code Verification by Journals is Possible with the Support of the Community" (2026), arXiv id 2601.07189
  Argues for journal-level standards to verify that published code actually reproduces results, partly in response to the loss of Papers with Code. Signals where reproducibility infrastructure may head next.

### Hooks for the brain
- This is the root feed for nearly every AI and compute thesis: agentic AI, reasoning models, world models, embodied robotics, diffusion and generative media, and AI safety all surface here first.
- Use as the daily firehose: a combined cs.AI+cs.LG+cs.CL+cs.CV+cs.RO+stat.ML RSS or a scripted API pull, then let Hugging Face Papers and alphaXiv rank what matters.
- Best paired with a downstream curator, since raw arXiv volume is too high to read unfiltered.

---

## 102. Hugging Face Papers

#source
Domain: Research repositories
Verified: June 2026

### What it is
Hugging Face Papers (the "Daily Papers" page, curated by AK and the research community) is a daily-curated, community-upvoted feed of the most notable new AI papers, each linked to its arXiv source and to any code, models, and datasets on the Hugging Face Hub. Since July 2025 it also hosts the Trending Papers section that succeeded the shut-down Papers with Code.

### Access
- URL: https://huggingface.co/papers (trending view at https://huggingface.co/papers/trending ; date views like https://huggingface.co/papers/date/2026-05-26 ; individual paper pages like https://huggingface.co/papers/2605.26230 )
- RSS / feeds: No official first-party RSS feed. The page has a "trending papers in your email inbox" subscription (requires login). Community-built RSS bridges exist (for example open-source projects that wrap the daily papers JSON into an RSS feed), but these are third-party.
- API: Yes, public JSON. Daily papers endpoint https://huggingface.co/api/daily_papers with parameters for date, pagination (p), limit, and sort. Paper-page API returns structured metadata including AI-generated summary, authors, upvote and comment counts, and linked models, datasets, Spaces, and GitHub repo. Content can also be fetched as markdown.
- Key sections or categories for future tech: Daily (the day's curated set), Weekly, and Monthly trending tabs; the Trending Papers section (the Papers with Code successor, linking papers to code implementations). There is no formal arXiv-style category taxonomy here, the feed is curated and ranked by community upvotes rather than split by subject class, and it skews heavily toward LLMs, agents, generative media, and multimodal models.
- Paywall: no for reading and the API. A free Hugging Face login is needed only to upvote, submit a paper, or subscribe to the email digest. Papers can be submitted up to 14 days after their arXiv publication date.

### How to mine it for the future
This is the best single human-curated filter on top of arXiv. Where arXiv is a firehose, Hugging Face Papers is the daily shortlist of what practitioners actually think matters, ranked by upvotes. For a daily pull, hit https://huggingface.co/api/daily_papers (optionally with a date parameter) to get structured JSON of the day's curated papers with summaries and upvote counts, then sort by upvotes to get the signal. The Weekly and Monthly trending tabs are good for catching what had staying power rather than a one-day spike. Because every entry links to code, models, and datasets, it is also the fastest way to tell which research has already turned into runnable artifacts, a strong indicator that a capability is moving from paper to product.

### Notable recent work or trends (2025 to 2026)
- "Geometry-Aware Representation Denoising for Robust Multi-view 3D Reconstruction" (submitted May 27, 2026), arXiv id 2605.26230, https://huggingface.co/papers/2605.26230
  A KAIST AI method for cleaning up noisy multi-view inputs to produce more robust 3D reconstructions. Part of the broader push toward reliable 3D and spatial understanding that underpins robotics, AR, and world models.
- "ARIS: cross-model adversarial research harness" (2026, trending), via https://huggingface.co/papers
  An open-source research harness that has multiple models adversarially check each other across orchestration and assurance layers to produce more reliable long-horizon research outputs. Points toward multi-agent verification as a way to make autonomous AI research trustworthy.
- "OmniFlatten: full-duplex spoken dialogue" (2025 to 2026, trending), via https://huggingface.co/papers
  A GPT-based model enabling real-time, natural full-duplex spoken conversation by integrating speech and text without changing the base architecture. Signals where real-time voice agents are heading.
- "MemSlides: hierarchical memory for personalized presentation agents" (2026, trending), via https://huggingface.co/papers
  A framework that splits an agent's memory into long-term user profile, working memory for the current session, and reusable tool memory. A concrete example of the memory-architecture work that agentic AI will need to feel personalized over time.

Note: the live page is JavaScript-rendered, so a plain fetch returns only a thin slice. The trending-paper details above were captured via search and the daily_papers structure; the JSON API is the reliable machine-readable route.

### Hooks for the brain
- Feeds the agentic AI, reasoning, multimodal, generative media, and real-time voice theses, each entry pre-linked to code, models, and datasets so you can judge how close a capability is to shipping.
- Use as the daily shortlist on top of arXiv: pull https://huggingface.co/api/daily_papers , sort by upvotes, and skim the top 5 to 10.
- The Trending Papers section is the de facto replacement for Papers with Code, so this is now the main place to connect a paper to its implementation.

---

## 103. alphaXiv

#source
Domain: Research repositories
Verified: June 2026

### What it is
alphaXiv is an open research discussion and discovery layer built on top of arXiv: it lets you read, annotate, and discuss arXiv papers in line, surfaces what others are reading via a trending feed, and adds AI analysis, audio summaries, and code links to each paper. It raised a 7 million dollar seed round in November 2025 (Menlo Ventures, Haystack).

### Access
- URL: https://www.alphaxiv.org (explore and trending feed on the home page; per-paper pages like https://www.alphaxiv.org/abs/2606.24597 and AI overviews like https://www.alphaxiv.org/overview/2606.24597 ). Trick: swap "arxiv" for "alphaxiv" in any arXiv URL to open that paper with discussion and AI tools.
- RSS / feeds: No documented public RSS or Atom feed. Discovery is via the on-site trending feed and personalized feed rather than a syndication feed.
- API: Yes, an MCP (Model Context Protocol) server at https://api.alphaxiv.org/mcp/v1 (Streamable HTTP, OAuth 2.0). It exposes 4 tools: discover_papers (agentic ranked paper search returning title, date, organizations, abstract preview, arXiv id), get_paper_content (paper as AI report or full text), answer_pdf_queries (page-level citation-ready excerpts from a PDF), and read_files_from_github_repository (read a paper's code repo). Works with native MCP clients (Claude Code, Claude Desktop, Cursor, VS Code, Zed) or a local bridge like npx mcp-remote; browser-hosted MCP is blocked by CORS.
- Key sections or categories for future tech: The trending feed is filterable by arXiv subcategory (for example computation-and-language, computer-vision-and-pattern-recognition, machine-learning, robotics, artificial-intelligence) and by community custom tags (agents, agentic-frameworks, generative-models, world models, reinforcement-learning, data-curation, and similar). It mirrors arXiv's CS and ML space but adds these finer community tags.
- Paywall: no for reading, trending, and the MCP tools. A free sign-in is needed to comment or personalize the feed.

### How to mine it for the future
alphaXiv is the most future-tech-dense of these sources in practice: its trending feed is dominated by frontier LLM, agent, world-model, and embodied-AI papers, each with an AI-written plain-language overview and an upvote-style count, so you can scan the cutting edge fast without reading full PDFs. For a daily pull, open the home feed and filter by the subcategory or custom tag that matches a thesis (for example tag "agents" for agentic AI, "robotics" for embodied AI, "generative-models" for media). For automated or deep pulls, the MCP server is the strongest tool here: discover_papers runs an agentic multi-round search and returns ranked results with arXiv IDs, and answer_pdf_queries returns page-cited excerpts, which is ideal for evidence-grade futures notes. The per-paper AI overview pages (alphaxiv.org/overview/ID) are a quick way to get a defensible 2 to 3 sentence read on any paper.

### Notable recent work or trends (2025 to 2026)
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

### Hooks for the brain
- Densest single feed for the agentic AI, world-model, self-improving-AI, and real-time-multimodal theses, each paper pre-summarized in plain language.
- Use as a daily pull via the trending feed filtered by tag, or via the MCP discover_papers tool for scripted, citation-ready research.
- Best complement to arXiv (which it sits on top of) and to Hugging Face Papers, since alphaXiv adds discussion, AI overviews, and finer community tags.

---

## 104. Papers with Code

#source
Domain: Research repositories
Verified: June 2026

### What it is
Papers with Code was the long-running site that linked machine-learning papers to their open-source code and tracked state-of-the-art results across thousands of benchmarks and tasks. It was sunset by Meta on 24 July 2025, and paperswithcode.com now redirects to Hugging Face Papers.

### Access
- URL: https://paperswithcode.com (redirects to Hugging Face Papers / Trending Papers at https://huggingface.co/papers ). The original interface, search, and benchmark leaderboards are no longer served.
- RSS / feeds: None active. The former feeds are gone with the site.
- API: The former Papers with Code REST API is decommissioned. A frozen snapshot of the historical data (papers, code links, benchmark JSON) remains in the open archive at https://github.com/paperswithcode/paperswithcode-data , and third-party mirrors (for example CodeSOTA) have rebuilt parts of the leaderboard data.
- Key sections or categories for future tech: Historically, task-based SOTA leaderboards across roughly 9,000-plus benchmarks (computer vision, NLP, reinforcement learning, speech, graphs) plus paper-to-code links and dataset pages. None of these are live now; the closest current substitute is the Trending Papers section on Hugging Face, which links papers to code but does not reproduce the task-level SOTA tracking.
- Paywall: not applicable. The live site is shut down. The archived data on GitHub is free and open.

### How to mine it for the future
Treat Papers with Code as a closed historical archive, not a live source. For the future-facing job it used to do (which new method just took the lead on a benchmark, and where is the code), use its successor: Hugging Face Trending Papers at https://huggingface.co/papers , which carries the paper-to-code linking forward. For historical SOTA trajectories (how fast accuracy on a given task improved year over year, useful for extrapolating capability curves), pull the frozen JSON from the paperswithcode-data GitHub archive or a community mirror such as CodeSOTA. Do not point a daily pull at paperswithcode.com expecting live data, it only redirects.

### Notable recent work or trends (2025 to 2026)
- "Papers with Code sunset" (24 July 2025; announced 25 July 2025 by Julien Chaumond, Hugging Face co-founder and CTO), https://github.com/paperswithcode/paperswithcode-data/issues/116
  Meta retired the site; the domain began redirecting to Hugging Face. A large body of benchmark tables, paper-to-code links, and dataset pages is not fully recoverable. The single most important fact for this brain: the live source no longer exists.
- "Hugging Face Trending Papers launched as the successor" (25 July 2025), https://huggingface.co/papers/trending
  Hugging Face, with Meta AI and the original Papers with Code core team, launched Trending Papers to carry forward community paper-following and code linking. It does not reproduce the full task-level SOTA leaderboards.
- "Standardization of Post-Publication Code Verification by Journals is Possible with the Support of the Community" (2026), arXiv id 2601.07189
  An arXiv paper arguing that journals should adopt community-supported standards to verify that published code reproduces results, partly framed as a response to the gap left by Papers with Code. Signals where reproducibility infrastructure may rebuild.
- "Frozen data archive" (ongoing since 2025), https://github.com/paperswithcode/paperswithcode-data
  The historical Papers with Code dataset (papers, abstracts, code links, benchmark results as JSON) remains downloadable. This is the only way to mine the platform's legacy SOTA history.

### Hooks for the brain
- Mostly a cautionary and historical hook: log it as shut down so a daily pull never targets it, and route the paper-to-code job to Hugging Face Trending Papers instead.
- Still useful for one thing: historical SOTA trajectories from the frozen GitHub archive, which support capability-curve and extrapolation theses (how fast a benchmark improved over time).
- Confirms a broader trend worth tracking: consolidation of ML research infrastructure under Hugging Face after Meta exited this space.

---

## 105. OpenReview

#source
Domain: Research repositories
Verified: June 2026

### What it is
Open peer-review platform that hosts submissions, reviews, rebuttals, and decisions for most of the top machine learning conferences (ICLR, NeurIPS, and others). It is the place where frontier AI research is debated in the open before publication.

### Access
- URL: https://openreview.net
- RSS / feeds: No official RSS or Atom feed. Updates are surfaced through the venue group pages and via the API. The "Venues" directory at the homepage lists all active conferences and workshops.
- API: Yes, two public REST APIs. API v2 is the current one, base at https://api2.openreview.net (legacy v1 at https://api.openreview.net). It exposes notes (submissions, reviews, comments), groups (venues), and profiles. An official Python client (openreview-py) wraps it. Most public records are readable without login; some venue data is gated until decisions are released. Docs at https://docs.openreview.net
- Key sections or categories for future tech: Conference venue groups are the entry points. The most future-relevant are ICLR (id ICLR.cc/2026/Conference), NeurIPS (NeurIPS.cc/2025/Conference), plus AutoML, RLC (Reinforcement Learning Conference), and many workshops on agents, alignment, and world models. Each venue page links its accepted Orals, Spotlights, and Posters.
- Paywall: No. Free and open. Reviews and rebuttals are visible to the public, which is the whole point of the platform.

### How to mine it for the future
Track the ICLR and NeurIPS venue groups each cycle and read the Oral and Spotlight lists first, since these are the roughly top 1 to 2 percent of submissions and signal where the field is concentrating. Use the API to pull submission metadata in bulk (filter by venue, then by decision) so you can cluster titles and abstracts into emerging themes rather than reading one at a time. The open reviews are a unique signal: the back-and-forth between authors and reviewers shows which claims the research community finds shaky versus convincing, which is a leading indicator of what will or will not hold up.

### Notable recent work or trends (2025 to 2026)
- "ICLR 2026 dominant themes" (review cycle closed March 2026), https://openreview.net/submissions?venue=ICLR.cc%2F2026%2FConference
  ICLR 2026 drew 19,525 valid submissions, with roughly 13,763 reaching an accept or reject decision. The cycle's center of gravity was model efficiency through compression and quantization, alignment and safety fixes, retrieval-augmented multi-step reasoning, embodied AI and robotics foundation models, and agent memory architectures. This is a direct read on where applied AI effort is pooling for the next few years.
- "Why DPO is a Misspecified Estimator" (ICLR 2026 Oral, 2026), https://openreview.net/group?id=ICLR.cc%2F2026%2FConference
  An Oral paper that argues Direct Preference Optimization, the dominant method for aligning language models to human preferences, has a fundamental statistical flaw. Paired with SafeDPO, which proposes a constrained alternative, it signals that the core machinery for steering model behavior is being re-examined rather than treated as settled.
- "NeurIPS 2025 reasoning surge" (December 2025), https://openreview.net/group?id=NeurIPS.cc%2F2025%2FConference
  Roughly 766 NeurIPS 2025 papers placed reasoning at their core, making it the breakout theme of the year, alongside a strong push into agentic AI with tool use. A notable thread questioned whether current reinforcement-learning-with-verifiable-rewards methods actually produce genuinely new reasoning, suggesting the next research wave is continual scaling and multi-turn agent-environment interaction.

### Hooks for the brain
- Feeds the thesis that AI capability growth over the next 10 to 20 years is driven by reasoning, agents, and world models, not just bigger models. The Oral and Spotlight lists are an early-warning system for which sub-fields are about to break out.
- Use the open reviews as a credibility filter: when building any future thesis on an AI claim, check whether the underlying paper survived adversarial peer review here before treating it as load-bearing.
- Best used as the primary-source layer beneath the lab announcements (DeepMind, OpenAI). Those are press; OpenReview is the underlying evidence and the disagreement around it.

---

## 106. Semantic Scholar

#source
Domain: Research repositories
Verified: June 2026

### What it is
A free, AI-powered search engine and knowledge graph for scientific literature, built by the Allen Institute for AI (Ai2). It indexes well over 200 million papers across all fields and exposes them through one of the most usable public research APIs available.

### Access
- URL: https://www.semanticscholar.org
- RSS / feeds: No site-wide RSS. Personalization comes through free accounts (saved searches, research feeds, author alerts) rather than open feeds. For programmatic monitoring, use the API instead of feeds.
- API: Yes, the Semantic Scholar Academic Graph API, the strongest feature for mining. Three services: Academic Graph (paper and author lookup, relevance search, citation and reference graph traversal), Recommendations, and Datasets. Base for datasets is https://api.semanticscholar.org/datasets/v1. Papers are retrievable by internal ID or by arXiv, DOI, PubMed, and other identifiers, with batch and bulk endpoints for volume. Public access is unauthenticated and rate-limited (shared pool); a free API key gives a steady per-second rate. The Datasets API serves monthly full-graph snapshots plus incremental diffs, and includes S2ORC, the largest open collection of full-text open-access papers. Docs and key signup at https://www.semanticscholar.org/product/api
- Key sections or categories for future tech: Not organized by topic sections; it is a universal index. You navigate by search query, by field-of-study filter, by citation graph, and by author. For future tech, query terms like artificial intelligence, robotics, quantum computing, synthetic biology, and energy, then sort by citation velocity.
- Paywall: No. Free to search and free to use the API. Some indexed papers link to publisher pages that are themselves paywalled, but Semantic Scholar's own metadata, abstracts, citation graph, and open-access full text are free.

### How to mine it for the future
This is the connective tissue, not a destination for browsing headlines. Use it three ways. First, citation-graph traversal: start from a landmark paper and walk its citing papers to see which directions the field actually pursued, which exposes momentum better than any single abstract. Second, the Datasets API to pull a monthly snapshot and run your own trend clustering locally when you need scale beyond rate limits. Third, the relevance and bulk search endpoints to build a standing monitor on future-relevant keywords and surface new high-citation work as it appears. Influential-citation counts and citation velocity are the key signals for separating durable directions from noise.

### Notable recent work or trends (2025 to 2026)
- "Semantic Scholar Academic Graph API expansion" (ongoing through 2026), https://www.semanticscholar.org/product/api
  The API now bundles full paper search, the citation and reference graph, recommendations, and bulk dataset downloads with stronger documentation and stability. For a futures workflow, this turns the entire corpus of science into a queryable substrate: you can track where citations are accelerating across any field rather than relying on a curated feed.
- "S2ORC open full-text corpus" (maintained, monthly snapshots), https://github.com/allenai/s2orc
  S2ORC is the largest publicly available collection of full text for open-access scientific papers, distributed as gzipped JSON via the Datasets API. It enables full-text mining and machine analysis of the literature, the kind of corpus that underpins building a defensible map of where research is heading rather than guessing from titles.
- "The Semantic Scholar Open Data Platform" (foundational paper, still describes the system), https://arxiv.org/abs/2301.10140
  The platform paper from Ai2 describes how the knowledge graph is assembled and exposed, combining ID-based lookup with search and citation-relationship endpoints. It is the reference for understanding what the graph contains and how to query it reliably for a long-running monitoring setup.

### Hooks for the brain
- This is the cross-cutting evidence layer for every other tech thesis: whatever direction you are tracking, Semantic Scholar tells you whether the underlying research is growing, stalling, or already cited heavily.
- Use the citation graph as a momentum detector. A 10 to 20 year thesis is stronger when the seed papers show rising influential-citation counts here.
- Pairs well with the conference sources (OpenReview) and lab sources (DeepMind, OpenAI): they tell you what was announced, Semantic Scholar tells you whether the wider scientific community is building on it.

---

## 107. Google DeepMind Research

#source
Domain: Research repositories
Verified: June 2026

### What it is
The research hub of Google DeepMind, one of the world's leading frontier AI labs. It collects the lab's breakthroughs, blog announcements, and a searchable publications index spanning agents, world models, robotics, and AI for science.

### Access
- URL: https://deepmind.google/research
- RSS / feeds: No prominent public RSS on the research site. New work surfaces through the News/blog (https://deepmind.google/blog) and an email signup on the page. Some announcements cross-post to the Google blog (blog.google).
- API: No public research API. The publications index is browsable HTML at https://deepmind.google/research/publications with pagination; each entry has its own page. Papers themselves are typically also on arXiv, which is where programmatic access lives.
- Key sections or categories for future tech: Research home with a Breakthroughs carousel; Publications (250+ entries, paginated, dated, most-recent-first); Science (https://deepmind.google/science, covering AlphaFold, WeatherNext, AlphaEarth, AlphaGenome); Models (Gemini, Genie world models, Gemini Robotics); Evals; and Responsibility and Safety. The Publications index and the Science section are the densest future-tech veins.
- Paywall: No. The site, blog, and publications index are free. Linked papers are generally open via arXiv or open-access venues.

### How to mine it for the future
Read the Publications index first because it is dated and chronological, so you can scan the leading edge in one pass and click through to the full paper. Cross-reference each notable item with arXiv and with Semantic Scholar to check how fast it is being cited. The Science section is where to watch for AI applied to biology, weather, materials, and Earth observation, which is DeepMind's distinctive long-horizon bet. Treat the blog as the framing layer (what the lab thinks matters) and the publications and arXiv links as the evidence layer.

### Notable recent work or trends (2025 to 2026)
- "SIMA 2: An agent that plays, reasons, and learns with you in virtual 3D worlds" (2026), https://deepmind.google/blog/sima-2-an-agent-that-plays-reasons-and-learns-with-you-in-virtual-3d-worlds
  A Gemini-powered agent that acts inside diverse 3D virtual environments, reasoning about goals and improving through interaction. It points toward general embodied agents that learn transferable skills in simulation before acting in the physical world, a likely stepping stone to capable real-world robots.
- "Genie 3: A new frontier for world models" (2025 to 2026), https://deepmind.google/blog/genie-3-a-new-frontier-for-world-models
  A general-purpose world model that generates a wide diversity of interactive environments on the fly. World models like this matter for the future because they let agents be trained and tested in synthetic worlds at scale, and they hint at interactive media and simulation that is generated rather than hand-built.
- "Co-Scientist: A multi-agent AI partner to accelerate research" (May 2026), https://deepmind.google/blog/co-scientist-a-multi-agent-ai-partner-to-accelerate-research
  A multi-agent system designed to work alongside human scientists to generate and refine research directions. It is a concrete example of AI moving from tool to collaborator in the discovery loop, which over a 10 to 20 year horizon could compress the pace of scientific progress itself.
- "From AGI to ASI" (12 June 2026), https://deepmind.google/research/publications/239142
  A publication examining the conceptual path from artificial general intelligence to artificial superintelligence. It sits alongside other 2026 DeepMind work on AI personhood, consciousness, and scheming evaluations, signalling that the lab is actively reasoning about the trajectory and governance of systems beyond human-level capability.

### Hooks for the brain
- Anchors the agents-and-world-models thesis (SIMA 2, Genie 3) and the AI-for-science thesis (AlphaFold, WeatherNext, AlphaEarth, Co-Scientist). Strong feeder for any future where AI accelerates physical-world capability and scientific discovery.
- The 2026 publications on AGI-to-ASI, personhood, and scheming evals feed the AI-governance and AI-safety strand: useful when reasoning about risks and institutional responses over the long horizon.
- Use as a primary lab signal, then verify durability via Semantic Scholar citation velocity and the open debate on OpenReview.

---

## 108. OpenAI Research

#source
Domain: Research repositories
Verified: June 2026

### What it is
The research section of OpenAI, the lab behind GPT and the o-series reasoning models. It organizes the lab's work by focus area (text, reasoning, vision, audio, safety) and links releases, publications, and milestones on the stated path toward artificial general intelligence.

### Access
- URL: https://openai.com/research (research index at https://openai.com/research/index)
- RSS / feeds: Yes. OpenAI publishes a news RSS feed at https://openai.com/news/rss.xml, which is the practical way to monitor new posts. Most research announcements appear as news/index posts and flow through this feed.
- API: No public API for the research catalogue itself. (OpenAI's developer API at platform.openai.com is a product, not a research-paper index.) Research pages are static HTML; the research index and news pages are the browsing surface.
- Key sections or categories for future tech: Research Overview and Research Index; focus areas for GPT models, the o-series reasoning models, Visual (DALL-E, CLIP, Sora), Audio (Whisper, voice), and Text. Plus Safety (https://openai.com/safety), Economic Research / Signals (https://openai.com/signals), and the news stream. The o-series reasoning work and the Safety section are the most future-relevant.
- Paywall: No. Research posts, the index, and the safety pages are free to read. Note these are largely product announcements and blog-style write-ups rather than a peer-reviewed archive; deeper technical detail often lives in linked papers or system cards.

### How to mine it for the future
Subscribe to the news RSS feed and watch the Research Index for new focus-area entries. Read OpenAI posts as the framing and capability-claim layer, then triangulate against independent sources, because much of the catalogue is release marketing rather than reviewed research. The Safety section and Economic Research/Signals are the highest-signal areas for long-horizon thinking: safety reveals how the lab frames alignment and oversight, and the economic work tracks labor and macro effects. For any specific capability claim, follow through to the linked system card or paper and check it against arXiv and Semantic Scholar.

### Notable recent work or trends (2025 to 2026)
- "Introducing OpenAI o3 and o4-mini" (16 April 2025), https://openai.com/index/introducing-o3-and-o4-mini
  The o-series reasoning models use chain-of-thought style processing with full tool access to work through complex STEM problems step by step. The shift from raw next-token prediction toward deliberate, tool-using reasoning is one of the defining capability trends, and it points to AI systems that plan and act rather than just autocomplete.
- "Sora 2" (30 September 2025), https://openai.com/index/sora-2
  A video generation model producing physically accurate, controllable clips with synchronized dialogue and sound. It signals a near future where high-fidelity synthetic video is cheap and on-demand, with large implications for media, marketing, and the trustworthiness of recorded evidence.
- "GPT-5.5: a new class of intelligence for real work" (23 April 2026), https://openai.com/index/introducing-gpt-5-5
  Positioned as a frontier model aimed at professional, economically valuable work, part of a rapid 2026 cadence (GPT-5.3, 5.4, 5.5). The framing around real work foreshadows the labor and productivity questions that dominate the 10 to 20 year outlook, and the release pace itself is a signal of how fast frontier capability is compounding.
- "Safety approach and interpretability work" (ongoing, 2025 to 2026), https://openai.com/safety
  OpenAI frames safety as defense-in-depth across alignment, robustness, and oversight, and has published interpretability work such as sparse-autoencoder latent attribution used to debug model misbehavior. How frontier labs operationalize alignment and interpretability is central to whether advanced AI stays controllable as it scales.

### Hooks for the brain
- Primary feeder for the reasoning-and-agents thesis (o-series) and the synthetic-media thesis (Sora 2), both with large 10 to 20 year consequences for work and for information integrity.
- The Safety pages and Economic Research/Signals feed the alignment-and-governance strand and the future-of-work strand: use them to track how the lab itself frames risk and economic impact.
- Treat as a capability and framing signal from one major lab, not as neutral evidence. Cross-check claims against OpenReview debate and Semantic Scholar citation data, and read alongside the DeepMind dossier to compare the two leading labs' trajectories.

---

## 109. Anthropic Research

#source
Domain: Research repositories
Verified: June 2026

### What it is
The research arm of Anthropic, the AI safety company behind Claude. It publishes work on AI safety, interpretability, alignment, the economic impact of AI, and frontier risk, framed around making increasingly capable AI go well.

### Access
- URL: https://www.anthropic.com/research
- RSS / feeds: No official native RSS feed on anthropic.com. The Publications list and News page (https://www.anthropic.com/news) are the canonical sources. Community-built unofficial feeds exist (for example a Claude blog feed at https://tim-hilde.github.io/anthropic-rss/rss.xml and an Anthropic Engineering feed maintained on GitHub), but these are third party and not guaranteed.
- API: No public research API. Anthropic ships a commercial Claude API for the models, not for the research catalog. Papers and posts are read directly from the site.
- Key sections or categories for future tech: Interpretability, Alignment, Societal Impacts, Frontier Red Team, Economic Research. The Publications feed tags each item by category (Economic Research, Frontier Red Team, Science, Policy, Announcements).
- Paywall: No. All research posts and papers are free to read.

### How to mine it for the future
Watch the Publications list on the research page, which is dated and category-tagged, and skim the four team pages (Alignment, Interpretability, Societal Impacts, Frontier Red Team) plus Economic Research. For long-range signal, the Frontier Red Team posts map AI capability against cyber, bio, and autonomy risk, and the Economic Index tracks how AI is actually changing work. Interpretability posts are the leading indicator for whether we will be able to understand and steer powerful models. Pair each post with the News page to catch policy and Responsible Scaling Policy updates.

### Notable recent work or trends (2025 to 2026)
- "Natural Language Autoencoders: Turning Claude's thoughts into text" (May 7, 2026), https://www.anthropic.com/research/natural-language-autoencoders
  Interpretability work that trains Claude to translate its internal numeric representations into human-readable text. It is a step toward reading what a model is actually computing, which matters for trusting and supervising systems far more capable than today's.
- "Agentic coding and persistent returns to expertise" (Jun 16, 2026), https://www.anthropic.com/research/claude-code-expertise
  A privacy-preserving study of around 400,000 Claude Code sessions from roughly 235,000 people between October 2025 and April 2026. It finds that human expertise still pays off even as coding agents take on more of the work, a useful signal for how AI reshapes skilled labor rather than simply replacing it.
- "Anthropic Economic Index report: Cadences" (Jun 26, 2026), https://www.anthropic.com/research/economic-index-june-2026-report
  The latest installment of Anthropic's ongoing measurement of how AI is being adopted across the economy. The Economic Index is one of the few longitudinal datasets tracking real AI usage patterns, making it a strong anchor for labor and adoption forecasts.
- "Project Fetch: Phase two" (Jun 18, 2026), https://www.anthropic.com/research/project-fetch-phase-two
  A Frontier Red Team project examining frontier model capabilities in a controlled setting. The Frontier Red Team line of work is the best window into how close models are to dangerous autonomous or dual-use capabilities, which directly informs timelines for high-risk AI.
- "Paving the way for agents in biology" (Jun 8, 2026), https://www.anthropic.com/research/agents-in-biology
  Explores how AI agents can accelerate biological research, alongside companion work on making Claude useful as a chemist. Together these signal a near-term shift toward AI as an active scientific collaborator in the life sciences rather than just a text tool.
- "What 81,000 people want from AI" (Mar 18, 2026), https://www.anthropic.com/81k-interviews
  A large multilingual qualitative study where nearly 81,000 Claude users described how they use AI, what they hope it enables, and what they fear. It is a rare, large-scale read on public expectations and anxieties that will shape adoption and regulation.

### Hooks for the brain
- Feeds the alignment-and-interpretability thesis: whether we will be able to understand and control models as they scale (Natural Language Autoencoders, Interpretability team).
- Feeds the AI-and-labor thesis with hard data, not vibes (Economic Index, agentic coding study) for forecasts on jobs, skill premiums, and productivity.
- Feeds the frontier-risk and AI-safety-policy thesis (Frontier Red Team, Responsible Scaling Policy) for timelines on cyber, bio, and autonomy danger.
- Use as a primary source for any 10-to-20-year scenario about AI capability growth and its governance, since Anthropic publishes both the capability and the safety framing.

---

## 110. Meta AI / FAIR Research

#source
Domain: Research repositories
Verified: June 2026

### What it is
The public research hub for AI at Meta, covering FAIR (Fundamental AI Research) and the wider Meta Superintelligence Labs. It publishes open models, datasets, and papers across world models, computer vision, language, code, and robotics.

### Access
- URL: https://ai.meta.com/research/
- RSS / feeds: No official RSS/Atom feed found. The research landing page and the Publications index (https://ai.meta.com/research/publications/) are the canonical lists, and the AI at Meta blog (https://ai.meta.com/blog/) carries release announcements. Note: both the research home and publications pages are JavaScript-rendered, so a plain fetch returns only metadata; you must use a JS-capable browser or rely on the blog and direct publication URLs.
- API: No public research-catalog API. Meta releases models and code via GitHub (github.com/facebookresearch) and Hugging Face (huggingface.co/facebook) rather than a site API.
- Key sections or categories for future tech: Research areas span Computer Vision, NLP and speech, world models (JEPA family), robotics, generative AI, and the Llama model line. Meta Superintelligence Labs groups the work into FAIR, TBD Lab (frontier LLMs), Products and Applied Research, and MSL Infra.
- Paywall: No. Papers, model weights, and code are free, with most models released under open or research licenses.

### How to mine it for the future
Because the research pages are JS-only, the most reliable path is the AI at Meta blog plus the GitHub and Hugging Face orgs, which carry every major release with dated announcements. For long-range signal, track the JEPA world-model line (Meta's bet that prediction in a learned latent space, not next-token text, is the road to physical and agentic intelligence) and the open Llama releases (which set the floor for what open-weight models can do). The Superintelligence Labs framing around "personal superintelligence" and early self-improvement is the strategic tell for where Meta thinks the frontier is going.

### Notable recent work or trends (2025 to 2026)
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

### Hooks for the brain
- Feeds the world-models thesis: whether learned latent prediction (JEPA) beats text generation as the path to physical reasoning, robotics, and agency over the next 10 to 20 years.
- Feeds the open-weight diffusion thesis: Llama and open releases determine how fast frontier-class capability spreads to startups, governments, and adversaries.
- Feeds the embodied-AI and robotics thesis (V-JEPA 2 zero-shot planning) for timelines on general-purpose robots.
- Use as the counterweight to closed-lab sources: Meta's bet is open models plus world models, so it is the best read on the open and embodied branch of AI's future.

---

## 111. Microsoft Research

#source
Domain: Research repositories
Verified: June 2026

### What it is
The roughly 35-year-old corporate research organization at Microsoft, with labs worldwide. It runs fundamental and applied research across the full computing and AI stack, from quantum and systems to AI for science, health, and economics.

### Access
- URL: https://www.microsoft.com/en-us/research/
- RSS / feeds: Yes, an official feed at https://www.microsoft.com/en-us/research/feed/ (returns RSS XML). There is also an email newsletter and the Microsoft Research blog (https://www.microsoft.com/en-us/research/blog/).
- API: No public research-catalog API. There is a Publications index (https://www.microsoft.com/en-us/research/publications/) and a Tools and models page (https://www.microsoft.com/en-us/research/tools/) for code, datasets, and downloads.
- Key sections or categories for future tech: Artificial intelligence, Quantum computing, AI for Science, AI Frontiers lab, Health Futures, Security and cryptography, Systems and networking, Human-computer interaction, and Economics. Research is grouped into Intelligence, Science and society, and Systems.
- Paywall: No. Blog posts, publications, and most tools are free; many papers link to open PDFs.

### How to mine it for the future
Subscribe to the RSS feed and skim the blog, which carries dated, plain-language write-ups of new models and results (the page is server-rendered and reads cleanly without JavaScript). For long-range signal, follow the AI Frontiers and AI for Science labs (foundation models applied to physics, chemistry, biology, and infrastructure), the Quantum research area (Microsoft's topological-qubit bet), and Health Futures. The "What's new" and Story sections surface the items Microsoft itself considers flagship, which is a good filter for what to read first.

### Notable recent work or trends (2025 to 2026)
- "GridSFM: A new, small foundation model for the electric grid" (2026), https://www.microsoft.com/en-us/research/blog/gridsfm-a-new-small-foundation-model-for-the-electric-grid/
  A compact foundation model purpose-built for electric grid data and operations. It signals the spread of foundation models into critical physical infrastructure, where small specialized models could help manage the grid stress that electrification and AI compute demand will bring.
- "Vega: Zero-knowledge proofs for digital identity in the age of AI" (2026), https://www.microsoft.com/en-us/research/blog/vega-zero-knowledge-proofs-for-digital-identity-in-the-age-of-ai/
  Research on using zero-knowledge proofs to prove identity attributes without exposing the underlying data. As AI makes impersonation and synthetic content trivial, privacy-preserving cryptographic identity becomes core infrastructure for trust online.
- "OptiMind: When the system meets the floor" (2026), https://www.microsoft.com/en-us/research/story/optimind-when-the-system-meets-the-floor/
  A flagship story on applying AI optimization to real manufacturing and operations environments. It illustrates the move from lab demos to AI systems that have to perform on a physical factory floor, a key test for whether AI delivers durable productivity gains.
- "mimalloc: A high-performance, scalable memory allocator for the modern era" (2026), https://www.microsoft.com/en-us/research/blog/mimalloc-a-high-performance-scalable-memory-allocator-for-the-modern-era/
  An updated take on a high-performance memory allocator built for modern multicore, large-memory workloads. Unglamorous but load-bearing systems work like this is what lets the AI and cloud stack keep scaling, so it is a quiet signal of where compute infrastructure is heading.
- "Quantum computing research area" (ongoing, 2025 to 2026), https://www.microsoft.com/en-us/research/research-area/quantum/
  Microsoft's long-running program toward fault-tolerant quantum computing, centered on topological qubits and the broader stack. Quantum is one of the highest-variance 10-to-20-year bets, and Microsoft is one of the few players pursuing a distinct hardware path.

### Hooks for the brain
- Feeds the AI-for-science thesis: foundation models reshaping physics, chemistry, biology, and infrastructure (AI for Science, GridSFM) for forecasts on accelerated discovery.
- Feeds the trust-and-identity thesis: cryptographic identity and provenance as defenses against AI-generated deception (Vega, zero-knowledge proofs).
- Feeds the deep-compute thesis: quantum computing and systems work that could redraw what is computable in 10 to 20 years.
- Use as the broadest single corporate-research source, spanning AI, quantum, security, health, and economics, and one of the few here with an official RSS feed for automated monitoring.

---

## 112. Emergent Mind

#source
Domain: Research repositories
Verified: June 2026

### What it is
A frontier-research explorer that tracks trending arXiv papers in real time and adds AI-generated summaries, video overviews, and structured analysis. It is a discovery and digest layer on top of arXiv, aimed at surfacing what matters fast without prompting.

### Access
- URL: https://www.emergentmind.com/
- RSS / feeds: No official Emergent Mind RSS/Atom feed found on the site. The platform itself sits on top of arXiv, and arXiv provides native Atom feeds and an API (https://info.arxiv.org/help/rss.html), so the underlying papers can be fed via arXiv even where Emergent Mind does not expose its own feed.
- API: An api.emergentmind.com host exists but resolves to the same front-end explorer rather than documented public API endpoints. There is no published open API for third-party use; treat it as a browsing tool, not a data source.
- Key sections or categories for future tech: Trending Papers (filterable by category and timeframe), Videos (paper overviews), Whiteboards, Open Problems, plus search by Papers, Topics, and Authors. Strong coverage of AI, machine learning, and mathematics.
- Paywall: Partial. Browsing trending papers and summaries is free; deeper features sit behind a paid plan (see https://www.emergentmind.com/pricing). Account sign-up is offered for saved history and full access.

### How to mine it for the future
The core content (Trending Papers, summaries, the live feed) is JavaScript-rendered, so a plain fetch returns only the page shell; you need a JS-capable browser to read the rankings. Use Emergent Mind as a triage layer: let it surface which arXiv papers are spiking in attention, read its plain-language summary and Paper Prompt breakdowns, then click through to the original arXiv PDF for the primary source. The Open Problems and Topics sections are useful for spotting where a research direction is heating up before it hits mainstream coverage. For automated monitoring, mirror the same arXiv categories via arXiv's own Atom feeds, since Emergent Mind does not publish its own.

### Notable recent work or trends (2025 to 2026)
- "Trending Papers feed" (live, 2025 to 2026), https://www.emergentmind.com/
  The home page ranks arXiv papers by real-time attention across AI, ML, and math, each with an AI summary. As a meta-source it is most valuable as a leading indicator of which frontier results the research community is reacting to right now.
- "Video paper overviews" (ongoing), https://www.emergentmind.com/videos
  Short AI-generated video walkthroughs of notable papers. These lower the barrier to tracking fast-moving subfields and are a quick way to scan many results when reading full PDFs is too slow.
- "Open Problems" (ongoing), https://www.emergentmind.com/open-problems
  A curated view of unsolved questions and active research frontiers. This section is a direct map of where breakthroughs are still needed, which is exactly the kind of signal a futures brain wants for 10-to-20-year bets.
- "Whiteboards" (ongoing), https://www.emergentmind.com/whiteboards
  Structured, topic-level explainers that connect related papers. Useful for building a mental model of a research area rather than reading isolated papers, helping distinguish durable directions from one-off results.

Note: Specific paper titles and dates on the Trending feed could not be captured because the listings are loaded client-side and are not present in the raw HTML; the structure, sections, and access details above are confirmed, and the underlying papers live on arXiv.

### Hooks for the brain
- Feeds the meta-layer of the whole brain: a fast filter for which frontier AI and math papers are gaining traction, useful for prioritizing what to read across all other sources.
- Feeds the open-problems and frontier-direction thesis: the Open Problems and Whiteboards sections flag where the field is stuck and where the next 10-to-20-year breakthroughs would land.
- Use as a discovery and triage tool, not a primary citation source: trace every interesting item back to its arXiv original, and mirror the relevant arXiv categories via Atom feeds for hands-off monitoring.

---

## 113. bioRxiv

#source
Domain: Research repositories
Verified: June 2026

### What it is
The free preprint server for biology, run by the nonprofit openRxiv (formerly hosted by Cold Spring Harbor Laboratory). It posts not-yet-peer-reviewed papers across all life-science fields, often months ahead of journal publication, which makes it the earliest public signal of where biology is heading.

### Access
- URL: https://www.biorxiv.org
- RSS / feeds: Atom 1.0 feeds for the 30 most recent posts, by subject or combined. Builder page: https://www.biorxiv.org/alertsrss . Pattern: https://connect.biorxiv.org/biorxiv_xml.php?subject=SUBJECT (e.g. `synthetic_biology`, `neuroscience`, `bioengineering`, `genomics`). Combine subjects with `+`, replace spaces with `_`. Also mirrors to Bluesky, Mastodon and X per subject stream.
- API: Open, no key. https://api.biorxiv.org . Detail endpoint `https://api.biorxiv.org/details/biorxiv/[YYYY-MM-DD]/[YYYY-MM-DD]?category=cell_biology` returns title, authors, date, DOI, abstract, category, funding in JSON or XML. Single-paper lookup by DOI. Bulk text/data mining via S3 (see https://www.biorxiv.org/tdm).
- Key sections or categories for future tech: Synthetic Biology, Bioengineering, Genomics, Bioinformatics, Neuroscience, Systems Biology, Cell Biology, Genetics, Molecular Biology. These hold most of the AI-in-biology, gene-editing, organoid and aging-mechanism work.
- Paywall: no. Fully open access, free full text for humans and machines.

### How to mine it for the future
Subscribe to the Synthetic Biology, Bioengineering, Neuroscience and Systems Biology Atom feeds for a daily firehose of frontier methods. For structured tracking, hit the API by date range and category and sort by abstract views or downloads (usage endpoint) to surface what the field is paying attention to. Watch for foundation-model and "virtual cell" preprints from labs like Arc Institute, and cross-reference a preprint DOI against the `pubs` endpoint to see if and where it later got published, a quick credibility check.

### Notable recent work or trends (2025 to 2026)
- "Genome modeling and design across all domains of life with Evo 2" (Feb 2025), https://www.biorxiv.org/content/10.1101/2025.02.18.638918v1
  Arc Institute's Evo 2 is a genome foundation model trained on DNA sequence alone that predicts the functional impact of genetic variants, including clinically significant BRCA1 mutations, without task-specific tuning, and can generate genome-scale sequences. It is an early sign that AI is becoming a design tool for the genetic code itself, not just an analysis aid.
- "Maximal human lifespan in light of a mechanistic model of aging" (22 Dec 2025), https://www.biorxiv.org/content/10.64898/2025.12.22.695887v1
  Uses a Saturating-Removal mathematical model of stochastic damage accumulation to ask why maximal human lifespan has barely moved while median life expectancy doubled. It separates which aging processes affect median versus maximal lifespan, pointing to where future longevity interventions would have to act to push the ceiling.
- "SWR1C loss promotes longevity through tRNA-mediated proteostasis" (5 Dec 2025), https://www.biorxiv.org/content/10.64898/2025.12.05.692690v1
  Links chromatin remodeling (the SWR1C complex), tRNA biology and protein-quality-control stress responses as a single lifespan-regulating axis in a model organism. It is the kind of mechanistic target that geroscience drug programs mine for druggable longevity pathways.
- "Are Current AI Virtual Cell Models Useful for Scientific Discovery?" (Apr 2026), https://www.biorxiv.org/content/10.64898/2026.04.23.719015v1
  A critical appraisal of whether the wave of AI "virtual cell" and single-cell foundation models actually generate new biological insight versus reproducing known patterns. Useful as a reality check on the hype curve around computational biology.

### Hooks for the brain
- Feeds the theses on AI becoming a generative engine for biology (genome and protein design) and on engineered/synthetic biology going mainstream. Best treated as the leading indicator: catch directions here 6 to 18 months before they hit Nature or Science.
- Pair with the longevity-and-aging thesis: bioRxiv is where the mechanistic targets (proteostasis, damage models, reprogramming) show up first. Use the API plus usage stats to separate genuine momentum from noise, and always note these are preprints (not peer reviewed) when citing.

---

## 114. medRxiv

#source
Domain: Research repositories
Verified: June 2026

### What it is
The free preprint server for health sciences, run by openRxiv alongside bioRxiv (founding partners Cold Spring Harbor Laboratory, Yale and BMJ). It posts not-yet-peer-reviewed clinical and public-health research, making it the earliest public view of where medicine, diagnostics and human longevity work is moving.

### Access
- URL: https://www.medrxiv.org
- RSS / feeds: Atom 1.0 feeds for the 30 most recent posts, by subject collection or combined. Builder page: https://www.medrxiv.org/alertsrss . Pattern: https://connect.medrxiv.org/medrxiv_xml.php?subject=SUBJECT . Combine subjects with `+`, replace spaces with `_`. Subject collection list at https://www.medrxiv.org/collection/ . Also mirrors to social streams.
- API: Open, no key, shares bioRxiv's infrastructure. Detail endpoint `https://api.biorxiv.org/details/medrxiv/[YYYY-MM-DD]/[YYYY-MM-DD]?category=cardiovascular%20medicine` returns title, authors, date, DOI, abstract, category in JSON or XML. Single-paper lookup by DOI. Full-corpus XML and bulk full text for text and data mining via a dedicated Amazon S3 resource (see https://www.medrxiv.org/tdm).
- Key sections or categories for future tech: Epidemiology, Genetic and Genomic Medicine, Neurology, Geriatric Medicine, Health Informatics, and the aging/biomarker work that spans them. These hold the longevity, AI-diagnostics and precision-medicine signals.
- Paywall: no. Free and unrestricted full-text access for humans and machines.

### How to mine it for the future
Track the Genetic and Genomic Medicine, Neurology, Health Informatics and Epidemiology collections for clinical-translation signals: aging biomarkers, AI diagnostic models, gene-therapy case reports. Use the API by date range and category to pull abstracts in bulk and watch for cohort-scale studies (UK Biobank, large registries) that validate biological-age or risk-prediction tools. Cross-check any preprint DOI against the `pubs` endpoint to see if it later passed peer review, and always flag findings as preprints, since clinical claims carry real-world stakes before review.

### Notable recent work or trends (2025 to 2026)
- "Comparing Fourteen Consensus Biomarkers of Aging: Epigenetic Pace of Aging as the Strongest Predictor of Mortality in BASE-II" (20 Nov 2025), https://www.medrxiv.org/content/10.1101/2025.11.20.25340648v1
  First study to test all 14 expert-consensus aging biomarkers in one cohort (the Berlin Aging Study II, 1,671 older adults) against mortality. The DunedinPACE epigenetic clock was the single strongest and most consistent predictor of death, and a minimal trio of epigenetic age, muscle mass and standing balance performed almost as well as the full panel. This is direct evidence for which aging clocks deserve to be trial endpoints.
- "Multimodal Ageing Biomarkers and Plasma Proteomics" (Mar 2026), https://www.medrxiv.org/content/10.64898/2026.03.09.26347914v1
  Argues for biomarkers that beat chronological age at predicting age-related outcomes and combines multimodal aging measures with plasma proteomic data. Frames such biomarkers as surrogate endpoints for longevity trials and inputs to personalized prevention, a core piece of the geroscience-goes-clinical story.
- "Genetic predisposition to longer lifespan, lifestyle factors, and all-cause mortality: a 17-year prospective cohort study" (19 Aug 2025), https://www.medrxiv.org/content/10.1101/2025.08.19.25333952v1
  A long-horizon cohort study weighing genetic longevity predisposition against modifiable lifestyle factors for all-cause mortality. It speaks to how much of lifespan is destiny versus behavior, central to any honest forecast of human healthspan gains.

### Hooks for the brain
- Feeds the longevity-and-healthspan thesis on the clinical side: which aging biomarkers and clocks actually predict outcomes, and how close they are to being usable as trial endpoints and prevention tools.
- Pair with bioRxiv (mechanisms) and Nature Medicine (peer-reviewed validation) to trace an idea from bench to clinic. Use it as the early signal for AI-diagnostics and precision-medicine adoption, while clearly marking everything as pre-peer-review.

---

## 115. Nature

#source
Domain: Research repositories
Verified: June 2026

### What it is
The flagship multidisciplinary science journal (Springer Nature) and the anchor of the Nature Portfolio family, which includes Nature Medicine, Nature Biotechnology, Nature Neuroscience and dozens more. A paper in Nature is a peer-reviewed, high-confidence marker that a field has reached a milestone worth forecasting around.

### Access
- URL: https://www.nature.com
- RSS / feeds: Per-journal "Web Feeds" pages at https://www.nature.com/[code]/web-feeds . Main feed pattern is https://www.nature.com/[code].rss (e.g. https://www.nature.com/nature.rss , https://www.nature.com/nm.rss for Nature Medicine). Each journal also offers a current-issue table-of-contents feed (https://www.nature.com/[code]/current_issue/rss/) and an Advance Online Publication feed. Feed hub: https://www.nature.com/webfeeds/ . Email alerts via journal-alerts.springernature.com.
- API: No single open public REST API for article text. Programmatic discovery is via the RSS/Atom feeds above, Crossref (for DOIs and metadata), and institutional text-and-data-mining agreements through Springer Nature. News-section content (news, features, the Nature Index) is free.
- Key sections or categories for future tech: Subject hubs at https://www.nature.com/subjects (Synthetic biology, Ageing, Neuroscience, Machine learning, Genetics, Stem cells). The portfolio titles Nature Medicine, Nature Biotechnology, Nature Aging and Nature Neuroscience carry most of the longevity, AI-in-biology and gene-therapy work.
- Paywall: partial. Research articles are largely subscription or open-access-fee gated; abstracts are free to read, and the news, comment and Nature Index sections are mostly free. Many papers also have free author-deposited versions findable via Unpaywall.

### How to mine it for the future
Subscribe to the `nature.rss` main feed plus the current-issue feeds for Nature Medicine, Nature Aging, Nature Biotechnology and Nature Neuroscience to catch milestones the week they publish. Read the free abstract first; it usually states the headline claim and the cohort or system size, which is enough to log a signal. The free Nature news and "Research Highlights" sections summarize the most consequential papers in plain language, ideal for forecasting without hitting the paywall. Use the DOI to find open versions when the full text matters.

### Notable recent work or trends (2025 to 2026)
- "Plasma proteomics links brain and immune system aging with healthspan and longevity" (Nature Medicine, 9 Jul 2025), DOI 10.1038/s41591-025-03798-1
  Wyss-Coray lab estimated the biological age of 11 organs from blood proteins in roughly 44,500 UK Biobank participants. A youthful brain and immune system were the strongest signals of a longer, healthier life, with a young-brain profile tied to far lower Alzheimer's risk. It turns "organ age" from metaphor into a measurable, blood-test-able predictor, a milestone for precision longevity.
- "Brain-wide neuronal circuit connectome of human glioblastoma" (Nature, 2025), DOI 10.1038/s41586-025-08634-7
  Maps how human glioblastoma cells transplanted into mice wire themselves into the brain's neural circuits, including cholinergic synapses that drive the tumor into a more invasive, motile state. It reframes an aggressive cancer as a circuit-integration problem and hints at neuromodulation as a future therapeutic angle.
- AI-driven protein and genome design (ongoing, 2025 to 2026), subject hub https://www.nature.com/subjects/protein-design
  Across Nature Portfolio titles, 2025 to 2026 saw rapid coverage of AI de novo protein and antibody design building on AlphaFold and diffusion models (following David Baker's 2024 Nobel). The trend line is clear: generative AI is moving from predicting biological structures to designing functional proteins, binders and genomes to spec, the engine under the synthetic-biology future.

### Hooks for the brain
- The peer-reviewed validation layer. When a thesis (organ-specific aging clocks, AI protein design, cancer-as-circuit) gets a Nature or Nature Medicine paper, upgrade it from "emerging" to "established." Use it to confirm signals first spotted on bioRxiv and medRxiv.
- Feeds the longevity, AI-in-biology and neuroscience theses with high-confidence anchors. Mine the free abstracts and news section for forecasting; note the paywall when the full method matters and reach for the open version via DOI.

---

## 116. Science (AAAS)

#source
Domain: Research repositories
Verified: June 2026

### What it is
The flagship peer-reviewed journal of the American Association for the Advancement of Science (AAAS) and the anchor of the Science family (Science Advances, Science Translational Medicine, Science Robotics, Science Immunology, Science Signaling). Its research papers and its annual Breakthrough of the Year are top-tier markers of where science is heading.

### Access
- URL: https://www.science.org
- RSS / feeds: Yes. Feed and alert hub at https://www.science.org/content/page/email-alerts-and-rss-feeds and https://www.science.org/content/page/alerts-and-feeds . Each journal offers table-of-contents feeds covering the latest issue and ahead-of-print articles (served via `science.org/action/showFeed?...`). Email newsletters include the daily ScienceAdviser.
- API: No documented open public article API. Programmatic access is via the RSS/Atom feeds above plus Crossref for DOIs and metadata; full-text mining is through institutional/AAAS agreements. The News from Science section is separately metered (see paywall).
- Key sections or categories for future tech: The journal Science (research across disciplines), Science Translational Medicine (https://www.science.org/journal/stm) for medicine and longevity, Science Advances (https://www.science.org/journal/sciadv) open-access research, and the News from Science topic pages for biology, AI and gene editing.
- Paywall: partial. Research articles are largely subscription gated with free abstracts; Science Advances is fully open access. News from Science runs a metered paywall (about three free articles a month, then register or subscribe); institutional users with a site license bypass it.

### How to mine it for the future
Subscribe to the table-of-contents feeds for Science and Science Translational Medicine, plus the fully open Science Advances feed, to track milestones and translational medicine the week they post. The annual Breakthrough of the Year and its runner-up list (published late December) is a compact, free-to-read forecast of the year's most consequential advances, use it as a yearly checkpoint. Read free abstracts to log a claim; for the metered News from Science, budget the free monthly reads for the highest-value explainers. Note that science.org blocks some automated fetching, so the human-readable feeds and abstracts are the reliable entry points.

### Notable recent work or trends (2025 to 2026)
- "Science's 2025 Breakthrough of the Year: the unstoppable rise of renewable energy" (Dec 2025), https://www.science.org/content/article/breakthrough-2025
  Science named the global renewable-energy surge its top breakthrough after solar and wind grew fast enough to cover the entire rise in world electricity demand in the first half of 2025 and renewables passed coal. While energy-focused, it signals the infrastructure backdrop (cheap clean power) that compute-heavy biology and AI will run on over the next 10 to 20 years.
- First personalized CRISPR base-editing therapy for an infant (runner-up, 2025), https://www.science.org/content/article/biggest-science-breakthroughs-2025
  Featured in Science's 2025 roundup: baby KJ, born with severe CPS1 deficiency, received a bespoke CRISPR base-editing therapy designed and manufactured in about six months and delivered to the liver via lipid nanoparticles (primary report in the New England Journal of Medicine, DOI 10.1056/NEJMoa2504747). It is proof of concept that gene-editing therapies can be built per patient, on demand, a turning point for individualized medicine.
- "EVOLVEpro: a protein language model for rapid in silico directed evolution" (Science, 2025)
  Science published EVOLVEpro, a protein language model that accelerates directed evolution of proteins computationally rather than through slow lab cycles. It is part of the broader 2025 shift toward AI as a design tool for biological molecules, complementing the de novo protein-design wave.

### Hooks for the brain
- High-confidence validation plus an annual forecasting checkpoint. The Breakthrough of the Year and runner-up list is a ready-made "what mattered" snapshot to calibrate theses each December; Science Translational Medicine anchors the medicine and longevity side.
- Feeds the AI-in-biology, gene-editing and personalized-medicine theses (EVOLVEpro, on-demand CRISPR) and the clean-energy-as-infrastructure thesis. Use abstracts and the open Science Advances and Breakthrough content for forecasting; note the research and News paywalls, and that science.org resists automated fetching.

---

## 117. Connected Papers

#source
Domain: Research repositories
Verified: June 2026

### What it is
A visual literature-mapping tool that takes one seed paper and builds an interactive graph of conceptually related work, so a researcher can see the shape of a field at a glance. It surfaces neighbours, prior works, and derivative works instead of a flat citation list.

### Access
- URL: https://www.connectedpapers.com/
- RSS / feeds: None. It is an interactive app, not a publication, so there is no article feed to subscribe to.
- API: Yes, early-access REST API. Request a key at hello@connectedpapers.com. Official clients exist for JavaScript (github.com/ConnectedPapers/connectedpapers-js) and Python (github.com/ConnectedPapers/connectedpapers-py, also on PyPI as connectedpapers-py). Per-key rate limiting, roughly 5 graph builds per minute, with usage limits that do not re-charge for the same graph accessed again within 30 days.
- Key sections or features for future tech: similarity graph for any seed paper, Prior Works view (the seminal, most-cited ancestors of a field), Derivative Works view (what built on it next), multi-origin graphs (combine several seed papers), filters by year, keyword, open access, and PDF availability, plus saved graphs and history.
- Paywall: partial. Free tier gives 5 graphs per month with all features. Academic plan is about 5 USD per month (around 3 USD on annual billing) for unlimited graphs, Business plan about 15 USD per month (around 10 USD annual). Group and per-seat plans also exist.

### How to mine it for the future
Drop in a landmark or recent paper on a frontier topic (for example a 10 to 20 year bet like neuromorphic chips, AI agents, or fusion control) and read the graph as a map of where the field is concentrated and where it is thinning out. Use Prior Works to find the foundational ideas everyone is standing on, and Derivative Works to see the newest threads spinning off, which is where the next decade tends to start. Multi-origin graphs let you overlay two adjacent fields to spot the bridge papers where convergence is happening. The tool draws on the Semantic Scholar corpus plus arXiv and PubMed, so coverage is broad across CS, biomedicine, and physics.

### Notable recent work or features (2025 to 2026)
- "Graph-based field mapping via co-citation and bibliographic coupling" (core feature, ongoing), https://www.connectedpapers.com/
  The graph clusters papers by conceptual similarity rather than direct citation, using co-citation and bibliographic coupling, so two papers that never cite each other still sit close if they share intellectual DNA. This is what makes it useful for finding work you would miss with keyword search alone. It is the single most useful view for someone trying to orient in an unfamiliar frontier area fast.
- "Early-access public API with JS and Python clients" (available, request via email), https://github.com/ConnectedPapers/connectedpapers-py
  An API key lets you build graphs and pull related-paper data programmatically, which means a futures workflow can automate field scans rather than clicking one graph at a time. The clients expose calls for remaining usage and for the set of free-access papers tied to a key. Useful if you want to run a daily or weekly sweep of new derivative works around a watchlist of seed papers.
- "Premium accounts and multi-origin graphs" (announced via the Connected Papers blog), https://medium.com/connectedpapers/announcing-premium-accounts-multi-origin-graphs-and-more-92e8dbd66848
  Multi-origin graphs let you seed a map with several papers at once, which is the right tool for tracking convergence between two or three technologies rather than one. Premium accounts removed the practical ceiling for heavy users. Together these turned it from a one-off lookup into something you can lean on for sustained field monitoring.

### Hooks for the brain
- Daily pull: keep a short watchlist of 5 to 10 seed papers on your core 10 to 20 year themes and re-run their Derivative Works views to catch what is newly building on them.
- Use it as the first step when a new term shows up, build a graph, read Prior Works to learn the lineage in minutes, then save the graph so you can watch the cluster grow over time.
- The page is JavaScript-only and does not render as static HTML, so capture findings by exporting or screenshotting the graph rather than expecting a text feed.

---

## 118. Elicit

#source
Domain: Research repositories
Verified: June 2026

### What it is
An AI research assistant that searches a corpus of over 138 million academic papers and 545,000 clinical trials, then synthesizes findings into structured reports, tables, and systematic reviews with sentence-level citations. It is built to make literature work faster without abandoning rigor.

### Access
- URL: https://elicit.com/
- RSS / feeds: None as a public feed. Elicit Alerts is the closest equivalent, an in-product notification system that flags new research on saved topics so you do not have to poll manually.
- API: Yes. The Elicit API launched March 2026 and lets developers search the 138M+ paper corpus and generate Reports programmatically. Docs are linked from the site footer under API.
- Key sections or features for future tech: semantic Search (no need for exact keywords), Research Reports (systematic-review-style briefs), Systematic Review automation (screening and data extraction, now aligned to PRISMA 2020), Research Agents for landscape and competitive scans, Library for storing sources, and Alerts for monitoring.
- Paywall: partial. There is a free tier to try it, with paid plans for higher-volume work such as large reports, deeper extraction, and systematic review features. Enterprise and team plans exist via Talk to Sales.

### How to mine it for the future
Type a real research question rather than keywords, for example "what are the near-term limits of solid-state batteries" and Elicit returns a report that pulls claims from many papers, each backed by a citation you can click down to the source sentence. For mapping a whole field, use Research Agents or a broad Report to get a landscape view, then narrow with the interactive tables that let you extract specific data points (methods, sample sizes, outcomes) across up to a thousand papers at once. For a futures brain, the highest-value move is running the same standing questions on a schedule and using Alerts to catch new evidence, so your view of a 10 to 20 year trajectory updates as the literature does.

### Notable recent work or features (2025 to 2026)
- "Elicit Systematic Review: Now Built for PRISMA 2020" (6 May 2026), https://elicit.com/
  Elicit's systematic review workflow now follows PRISMA 2020 reporting guidelines and is described as reproducible, traceable, and auditable at every step. This matters because it moves AI-assisted reviews from a convenience toward something defensible in formal research. For futures work it signals that machine-run evidence synthesis is becoming trustworthy enough to underpin real decisions.
- "Evaluating Elicit's Systematic Literature Review Capabilities" (6 May 2026), https://elicit.com/
  Elicit reported 95 percent search recall, 97 percent abstract screening, 99 percent full-text screening, and 96 percent extraction accuracy across 994 Cochrane reviews. These are unusually concrete numbers for an AI research tool and suggest the gap between human and machine literature review is narrowing fast. A useful data point for anyone tracking how AI will reshape knowledge work over the next decade.
- "Introducing the Elicit API" (3 March 2026), https://elicit.com/
  The API exposes both paper search across the 138M+ corpus and Report generation, so the synthesis engine can be wired into other tools and pipelines. This turns Elicit from a destination site into an evidence layer you can build on. For a daily pull, it opens the door to automated, scheduled literature scans on your watch themes.
- "Evaluating Claude Opus 4.5" (17 December 2025), https://elicit.com/
  Elicit benchmarked Claude Opus 4.5 and found it beat Sonnet 4.5, Gemini 3 Pro, and GPT 5 at data extraction and report writing with fewer hallucinations. It is a rare public, task-specific model comparison from a working research product rather than a lab. Worth watching as a recurring signal of which frontier models are best at grounded, citation-faithful reasoning.

### Hooks for the brain
- Daily pull: set Elicit Alerts on your core 10 to 20 year questions so new papers surface to you, then skim the auto-generated summaries instead of reading raw abstracts.
- Use a single Report as a fast on-ramp to any unfamiliar frontier field, then keep the interactive table to extract and compare specifics as new work lands.
- The home page renders as readable text, but the actual research workspace is an interactive app, so plan to work inside it for the tables and reports rather than scraping a feed.

---

## 119. The Gradient

#source
Domain: Research repositories
Verified: June 2026

### What it is
A digital publication about artificial intelligence and its future, running long-form essays, technical explainers, and perspective pieces written by researchers and practitioners. It pairs the essays with a newsletter and a podcast of interviews with people working in AI.

### Access
- URL: https://thegradient.pub/
- RSS / feeds: Ghost-powered site, so a feed is available at https://thegradient.pub/rss/. The newsletter (The Update) and the podcast both run on Substack at https://thegradientpub.substack.com/.
- API: None published. It is a publication, not a tool. The Ghost RSS feed is the machine-readable way in.
- Key sections or features for future tech: tag pages worth following include Perspectives, Trends, Ethics, LLM, Policy, and Science (https://thegradient.pub/tag/perspectives/ and similar), plus the Podcast tag for audio.
- Paywall: no. Articles are free to read. Substack offers an optional paid subscription to support the publication, but the essays are not gated.

### How to mine it for the future
This is the slow-thinking counterweight to news feeds. Where Connected Papers and Elicit tell you what exists, The Gradient tells you what people who understand the field think it means. Read the Perspectives and Trends tags for arguments about where AI is heading, often pushing back on hype or naming a shift before it is obvious. The essays are long and opinionated, so the value is in the framing and the open questions, not the headline. For a futures brain, mine each piece for the claim about the next 5 to 20 years and the assumptions behind it, then weigh those against what the tools and labs are actually shipping.

### Notable recent work or features (2025 to 2026)
- "After Orthogonality: Virtue-Ethical Agency and AI Alignment" by Peli Grietzer (18 February 2026), https://thegradient.pub/virtue-ethics-ai-alignment/
  An ethics essay that questions the orthogonality thesis, the long-standing idea that an AI's intelligence and its goals are independent, and argues for a virtue-ethics view of agency instead. It matters for futures work because alignment framing shapes how the whole field thinks about safe advanced AI. A signal that alignment debate is moving from pure decision theory toward older moral philosophy.
- "AGI Is Not Multimodal" by Benjamin A. Spiegel (4 June 2025), https://thegradient.pub/agi-is-not-multimodal/
  A perspective piece arguing that simply stacking text, image, and audio into one model is not the path to general intelligence. It pushes against a popular industry assumption at a time when multimodal models dominate releases. Useful as a contrarian anchor when forecasting whether scaling current architectures gets us to AGI.
- "Shape, Symmetries, and Structure: The Changing Role of Mathematics in Machine Learning Research" by Henry Kvinge (16 November 2024), https://thegradient.pub/shape-symmetry-structure/
  An essay on how mathematical structure, geometry, symmetry, and topology, is moving back to the center of ML research after years of brute-force scaling. It points to a possible next phase where understanding, not just data and compute, drives progress. Relevant to anyone betting on what the research frontier looks like in 10 years.
- "What's Missing From LLM Chatbots: A Sense of Purpose" by Kenneth Li (9 September 2024), https://thegradient.pub/dialog/
  Argues that current chatbots lack goal-directed behaviour and that giving models a sense of purpose is a missing ingredient for genuinely useful assistants. It frames a gap that agentic AI is now racing to fill. A clean articulation of a problem that defines much of the near-term roadmap.

### Hooks for the brain
- Daily pull: subscribe to the Ghost RSS feed (https://thegradient.pub/rss/) and the Substack newsletter so new essays and podcast episodes arrive without checking the site.
- Treat it as the interpretation layer, when a tool or lab ships something, look here for a researcher's argument about what it means for the long arc.
- The site renders cleanly as text and links, so the RSS feed is reliable for automated capture into the brain.

---

## 120. Distill

#source
Domain: Research repositories
Verified: June 2026

### What it is
A peer-reviewed journal of machine learning research known for interactive, visual, deeply explained articles, with the explicit mission of making ML clear. It is no longer actively publishing: the team announced a hiatus in July 2021 and the site now stands as an archive.

### Access
- URL: https://distill.pub/
- RSS / feeds: Yes, https://distill.pub/rss.xml. The feed remains live but is effectively static since publishing stopped.
- API: None. It is an archived journal. The RSS feed and the open GitHub repos (github.com/distillpub) are the structured access points.
- Key sections or features for future tech: Archive (https://distill.pub/archive/), the Prize page, and the back catalogue of interpretability and visualization threads such as Circuits (https://distill.pub/2020/circuits) and Building Blocks of Interpretability.
- Paywall: no. Everything is free and open, and many articles ship with open-source code on GitHub. ISSN 2476-0757.

### How to mine it for the future
Distill is a foundations library, not a news source. The articles that explained interpretability, feature visualization, and the idea of reverse-engineering neural networks (the Circuits thread) seeded a whole research direction that is now central to AI safety and mechanistic interpretability in 2026. For a futures brain, mine it to understand the durable concepts that today's frontier work is built on, so you can read new claims with the right mental models. The interactive format also remains a benchmark for how complex technical ideas can be communicated, which is itself a clue to where research publishing may head.

### Notable recent work or features (2025 to 2026)
Note: Distill has published nothing new since 2021, so the items below are its most influential archived pieces rather than recent work. They still shape how the field thinks today.
- "Distill Hiatus" by the Editorial Team (2 July 2021), https://distill.pub/2021/distill-hiatus
  The editorial announcing that Distill would pause after five years, citing the burden on a volunteer team and the toll of running a journal. It is the canonical reference for the publication's current status. Worth reading as a candid account of why a beloved, high-effort publishing model proved hard to sustain.
- "Multimodal Neurons in Artificial Neural Networks" by Goh, Cammarata, Voss and colleagues (4 March 2021), https://distill.pub/2021/multimodal-neurons
  Reported neurons inside a neural network that respond to a concept across both images and text, echoing multimodal neurons in the human brain. It is a landmark interpretability result that still gets cited in current mechanistic interpretability work. A foundational data point for anyone tracking how we will understand and trust large models.
- "Thread: Circuits" by Cammarata, Olah and colleagues (started 10 March 2020), https://distill.pub/2020/circuits
  An open collection of articles built on heavily reverse-engineering a single network to find interpretable circuits inside it. This thread effectively launched the modern mechanistic interpretability agenda that major labs now invest in. Essential background for understanding one of the most important AI-safety research directions of the next decade.
- "Research Debt" by Chris Olah and Shan Carter (22 March 2017), https://distill.pub/2017/research-debt
  The founding essay arguing that science accumulates a debt when findings are never properly distilled and explained, which Distill was created to pay down. The idea remains a sharp lens on why so much research stays inaccessible. Relevant to predicting how AI tools that summarize and synthesize research might finally close that gap.

### Hooks for the brain
- Daily pull: do not expect new items. Treat the RSS feed as dormant and instead pull Distill articles on demand when you need to understand a foundational concept.
- Use it as a teaching layer, when a 2026 paper references circuits, feature visualization, or interpretability, the clearest explanation of the underlying idea often lives here.
- Pages render cleanly and the code is open on GitHub, so it is reliable for reference capture, just tag it as archival, not current.

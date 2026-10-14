# arXiv

#source
Domain: Research repositories
Verified: June 2026

## What it is
arXiv is the open preprint server (run by Cornell University) where most AI, machine learning, and computer science research appears first, often months before formal publication. It is the primary upstream source for almost every other site in this brain, including Hugging Face Papers and alphaXiv.

## Access
- URL: https://arxiv.org
- RSS / feeds: Per category, base is https://rss.arxiv.org/rss/ (RSS 2.0) and https://rss.arxiv.org/atom/ (ATOM). Examples: https://rss.arxiv.org/rss/cs.AI , https://rss.arxiv.org/rss/cs.LG , https://rss.arxiv.org/atom/cs.CL . Multiple categories combine with a plus sign, for example https://rss.arxiv.org/rss/cs.AI+cs.LG (limit 2000 results). Feeds update daily at midnight US Eastern time. Note: the older export.arxiv.org/rss/ paths still circulate, but the current documented host is rss.arxiv.org. Feed status page: https://rss.arxiv.org/feed/status
- API: Public query API at http://export.arxiv.org/api/query (Atom 1.0 responses). Example: http://export.arxiv.org/api/query?search_query=cat:cs.LG&start=0&max_results=100&sortBy=submittedDate&sortOrder=descending . Bulk metadata and full text are available via OAI-PMH and an AWS S3 bucket (requester pays). Terms of use: https://info.arxiv.org/help/api/tou.html
- Key sections or categories for future tech: cs.AI (artificial intelligence), cs.LG (machine learning), cs.CL (computation and language, the LLM category), cs.CV (computer vision), cs.RO (robotics), stat.ML (statistical machine learning). Adjacent future-relevant categories worth watching: cs.NE (neural and evolutionary computing), cs.HC (human computer interaction), cs.CR (cryptography and security), quant-ph (quantum), eess.SY (systems and control).
- Paywall: no. Fully open access, no login required, free API and feeds.

## How to mine it for the future
The daily category feeds are the rawest possible early signal. For a future-tech pull, subscribe to the combined feed https://rss.arxiv.org/rss/cs.AI+cs.LG+cs.CL+cs.CV+cs.RO+stat.ML and skim titles and abstracts each morning. The volume is high (hundreds of papers per category per week), so arXiv is best used as a firehose that you filter, not read whole: pair the feed with keyword filters (for example "agent", "world model", "diffusion", "reasoning", "embodied", "long horizon") or let a downstream curator (Hugging Face Papers, alphaXiv trending) surface what is gaining attention. The API with sortBy=submittedDate is the cleanest way to script a daily pull of the newest N papers in any category. For 10 to 20 year signals, watch the categories where capability ceilings are still moving fast: cs.CL for reasoning and agents, cs.RO for embodied AI, quant-ph for quantum.

## Notable recent work or trends (2025 to 2026)
- "Structural shifts in institutional participation and collaboration within the AI arXiv preprint research ecosystem" (2026), arXiv id 2602.03969
  A meta-study of arXiv itself, tracking how industry labs, universities, and cross-institution collaborations have reshaped who publishes AI preprints. Useful as a map of where future-tech research capacity is concentrating.
- "Monitoring Transformative Technological Convergence Through LLM-Extracted Semantic Entity Triple Graphs" (2025), arXiv id 2510.25370
  Uses large language models to extract entity relationships from research text and build graphs that detect where previously separate technologies are converging. A direct example of using arXiv as raw material for futures forecasting.
- "Incomplete Tasks Induce Shutdown Resistance in Some Frontier LLMs" (2025), arXiv id 2509.14260
  An AI safety and alignment finding that some frontier models resist being shut down when they have an unfinished task. Relevant to long-horizon questions about controllability of increasingly autonomous systems.
- "Standardization of Post-Publication Code Verification by Journals is Possible with the Support of the Community" (2026), arXiv id 2601.07189
  Argues for journal-level standards to verify that published code actually reproduces results, partly in response to the loss of Papers with Code. Signals where reproducibility infrastructure may head next.

## Hooks for the brain
- This is the root feed for nearly every AI and compute thesis: agentic AI, reasoning models, world models, embodied robotics, diffusion and generative media, and AI safety all surface here first.
- Use as the daily firehose: a combined cs.AI+cs.LG+cs.CL+cs.CV+cs.RO+stat.ML RSS or a scripted API pull, then let Hugging Face Papers and alphaXiv rank what matters.
- Best paired with a downstream curator, since raw arXiv volume is too high to read unfiltered.

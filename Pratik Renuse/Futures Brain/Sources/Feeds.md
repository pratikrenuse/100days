# Feeds Registry

The operational feed list for the daily pull. One place that maps every RSS or feed URL to its source, with status as of June 2026. The daily engine reads from here.

Status key: LIVE (fetched clean), BINARY (feed loads but returns gzip/binary, use a reader proxy or the site archive), BLOCKED (valid feed but blocked to our fetcher, needs an unblocked client), BROKEN (old URL dead, use the alternative).

## Tier 1: pull daily (high signal)
- arXiv cs.AI (#101): https://rss.arxiv.org/rss/cs.AI — LIVE (empty on weekends)
- Import AI (#30): https://importai.substack.com/feed — LIVE
- TLDR AI (#206): https://tldr.tech/api/rss/ai — LIVE
- The Rundown AI (#205): https://rss.beehiiv.com/feeds/2R3C6Bt5wj.xml — BINARY
- Simon Willison (#38): https://simonwillison.net/atom/everything/ — LIVE
- SemiAnalysis (#125): https://semianalysis.com/feed — BINARY (public items lag, partial paywall)
- ChinaTalk (#204): https://www.chinatalk.media/feed — LIVE
- OpenAI News (#108): https://openai.com/news/rss.xml — LIVE
- Google DeepMind (#107): https://deepmind.google/blog/rss.xml — LIVE
- MIT Technology Review (#218): https://www.technologyreview.com/feed/ — BINARY

## Tier 2: pull every few days
- Hugging Face Blog (#102): https://huggingface.co/blog/feed.xml — LIVE
- Google Research (#107): https://research.google/blog/rss — LIVE
- Microsoft Research (#111): https://www.microsoft.com/en-us/research/feed/ — LIVE
- Meta / FAIR Research (#110): https://research.facebook.com/feed/ — LIVE
- Apple ML Research (#214): https://machinelearning.apple.com/rss.xml — LIVE
- AWS Machine Learning (#215): https://aws.amazon.com/blogs/machine-learning/feed/ — BINARY
- NVIDIA Technical Blog (#216): https://developer.nvidia.com/blog/feed — BINARY
- Stanford AI Lab (#217): https://ai.stanford.edu/blog/feed.xml — LIVE (low cadence, conference cycles)
- MIT News, AI (#219): https://news.mit.edu/rss/topic/artificial-intelligence2 — BINARY
- O'Reilly Radar, AI (#220): https://www.oreilly.com/radar/topics/ai/feed/index.xml — BINARY
- The Sequence (#211): https://thesequence.substack.com/feed — BINARY
- Understanding AI (#210): https://www.understandingai.org/feed — BINARY
- AI Snake Oil / AI as Normal Technology (#209): https://www.aisnakeoil.com/feed (redirects to normaltech.ai/feed) — BINARY

## Tier 3: analysis and opinion (weekly)
- Marcus on AI (#32): https://garymarcus.substack.com/feed — LIVE
- Don't Worry About the Vase, Zvi (#31): https://thezvi.substack.com/feed — LIVE
- Fabricated Knowledge (#132): https://www.fabricatedknowledge.com/feed — LIVE
- The Diff (#96): https://www.thediff.co/feed — LIVE
- Noahpinion (#95): https://www.noahpinion.blog/feed — LIVE
- Astral Codex Ten (#61): https://astralcodexten.com/feed — LIVE
- Marginal Revolution (#55): https://marginalrevolution.com/feed — LIVE
- The Gradient (#119): https://thegradient.pub/rss/ — LIVE
- AI Supremacy (#212): https://www.ai-supremacy.com/feed — BINARY
- Ben's Bites (#208): https://www.bensbites.com/feed — BINARY

## Tier 4: news and aggregators (scan for breakouts)
- TLDR Tech (#207): https://tldr.tech/api/rss/tech — LIVE
- MarkTechPost (#213): https://www.marktechpost.com/feed/ — BINARY
- TechCrunch (#221): https://techcrunch.com/feed/ — BINARY
- Hacker News, front page (#224): https://hnrss.org/frontpage — LIVE
- Product Hunt (#225): https://www.producthunt.com/feed — LIVE

## Broken or blocked (use the alternative, verify before relying)
- The Verge (#222): https://www.theverge.com/rss/index.xml — BLOCKED (403 to our fetcher; needs an unblocked client)
- Ars Technica (#223): https://feeds.arstechnica.com/arstechnica/index — BLOCKED (valid feed, blocked to our fetcher)
- a16z (#226): a16z.com/feed is 404 (BROKEN). Use the hub at https://a16z.com/news-content/
- Allen Institute, Ai2 (#227): blog.allenai.org/feed is 404 (BROKEN). Use https://allenai.org/news and https://allenai.org/blog

## How the daily pull uses this
1. Read Tier 1 every run, Tiers 2 and 3 on a rotation, Tier 4 only to catch breakouts.
2. For each new item, apply the Signals rule: does it move a thesis, what does it imply in 10 to 20 years, and which hidden player does it point to. If it cannot answer all three, drop it.
3. File the survivors into the relevant thesis and player notes, then draft the post in the locked voice.
4. For BINARY feeds, fetch through a reader proxy or the site archive. For BLOCKED or BROKEN, use the listed alternative.

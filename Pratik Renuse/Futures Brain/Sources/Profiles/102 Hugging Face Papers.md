# Hugging Face Papers

#source
Domain: Research repositories
Verified: June 2026

## What it is
Hugging Face Papers (the "Daily Papers" page, curated by AK and the research community) is a daily-curated, community-upvoted feed of the most notable new AI papers, each linked to its arXiv source and to any code, models, and datasets on the Hugging Face Hub. Since July 2025 it also hosts the Trending Papers section that succeeded the shut-down Papers with Code.

## Access
- URL: https://huggingface.co/papers (trending view at https://huggingface.co/papers/trending ; date views like https://huggingface.co/papers/date/2026-05-26 ; individual paper pages like https://huggingface.co/papers/2605.26230 )
- RSS / feeds: No official first-party RSS feed. The page has a "trending papers in your email inbox" subscription (requires login). Community-built RSS bridges exist (for example open-source projects that wrap the daily papers JSON into an RSS feed), but these are third-party.
- API: Yes, public JSON. Daily papers endpoint https://huggingface.co/api/daily_papers with parameters for date, pagination (p), limit, and sort. Paper-page API returns structured metadata including AI-generated summary, authors, upvote and comment counts, and linked models, datasets, Spaces, and GitHub repo. Content can also be fetched as markdown.
- Key sections or categories for future tech: Daily (the day's curated set), Weekly, and Monthly trending tabs; the Trending Papers section (the Papers with Code successor, linking papers to code implementations). There is no formal arXiv-style category taxonomy here, the feed is curated and ranked by community upvotes rather than split by subject class, and it skews heavily toward LLMs, agents, generative media, and multimodal models.
- Paywall: no for reading and the API. A free Hugging Face login is needed only to upvote, submit a paper, or subscribe to the email digest. Papers can be submitted up to 14 days after their arXiv publication date.

## How to mine it for the future
This is the best single human-curated filter on top of arXiv. Where arXiv is a firehose, Hugging Face Papers is the daily shortlist of what practitioners actually think matters, ranked by upvotes. For a daily pull, hit https://huggingface.co/api/daily_papers (optionally with a date parameter) to get structured JSON of the day's curated papers with summaries and upvote counts, then sort by upvotes to get the signal. The Weekly and Monthly trending tabs are good for catching what had staying power rather than a one-day spike. Because every entry links to code, models, and datasets, it is also the fastest way to tell which research has already turned into runnable artifacts, a strong indicator that a capability is moving from paper to product.

## Notable recent work or trends (2025 to 2026)
- "Geometry-Aware Representation Denoising for Robust Multi-view 3D Reconstruction" (submitted May 27, 2026), arXiv id 2605.26230, https://huggingface.co/papers/2605.26230
  A KAIST AI method for cleaning up noisy multi-view inputs to produce more robust 3D reconstructions. Part of the broader push toward reliable 3D and spatial understanding that underpins robotics, AR, and world models.
- "ARIS: cross-model adversarial research harness" (2026, trending), via https://huggingface.co/papers
  An open-source research harness that has multiple models adversarially check each other across orchestration and assurance layers to produce more reliable long-horizon research outputs. Points toward multi-agent verification as a way to make autonomous AI research trustworthy.
- "OmniFlatten: full-duplex spoken dialogue" (2025 to 2026, trending), via https://huggingface.co/papers
  A GPT-based model enabling real-time, natural full-duplex spoken conversation by integrating speech and text without changing the base architecture. Signals where real-time voice agents are heading.
- "MemSlides: hierarchical memory for personalized presentation agents" (2026, trending), via https://huggingface.co/papers
  A framework that splits an agent's memory into long-term user profile, working memory for the current session, and reusable tool memory. A concrete example of the memory-architecture work that agentic AI will need to feel personalized over time.

Note: the live page is JavaScript-rendered, so a plain fetch returns only a thin slice. The trending-paper details above were captured via search and the daily_papers structure; the JSON API is the reliable machine-readable route.

## Hooks for the brain
- Feeds the agentic AI, reasoning, multimodal, generative media, and real-time voice theses, each entry pre-linked to code, models, and datasets so you can judge how close a capability is to shipping.
- Use as the daily shortlist on top of arXiv: pull https://huggingface.co/api/daily_papers , sort by upvotes, and skim the top 5 to 10.
- The Trending Papers section is the de facto replacement for Papers with Code, so this is now the main place to connect a paper to its implementation.

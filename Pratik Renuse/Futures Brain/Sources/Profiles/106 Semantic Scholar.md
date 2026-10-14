# Semantic Scholar

#source
Domain: Research repositories
Verified: June 2026

## What it is
A free, AI-powered search engine and knowledge graph for scientific literature, built by the Allen Institute for AI (Ai2). It indexes well over 200 million papers across all fields and exposes them through one of the most usable public research APIs available.

## Access
- URL: https://www.semanticscholar.org
- RSS / feeds: No site-wide RSS. Personalization comes through free accounts (saved searches, research feeds, author alerts) rather than open feeds. For programmatic monitoring, use the API instead of feeds.
- API: Yes, the Semantic Scholar Academic Graph API, the strongest feature for mining. Three services: Academic Graph (paper and author lookup, relevance search, citation and reference graph traversal), Recommendations, and Datasets. Base for datasets is https://api.semanticscholar.org/datasets/v1. Papers are retrievable by internal ID or by arXiv, DOI, PubMed, and other identifiers, with batch and bulk endpoints for volume. Public access is unauthenticated and rate-limited (shared pool); a free API key gives a steady per-second rate. The Datasets API serves monthly full-graph snapshots plus incremental diffs, and includes S2ORC, the largest open collection of full-text open-access papers. Docs and key signup at https://www.semanticscholar.org/product/api
- Key sections or categories for future tech: Not organized by topic sections; it is a universal index. You navigate by search query, by field-of-study filter, by citation graph, and by author. For future tech, query terms like artificial intelligence, robotics, quantum computing, synthetic biology, and energy, then sort by citation velocity.
- Paywall: No. Free to search and free to use the API. Some indexed papers link to publisher pages that are themselves paywalled, but Semantic Scholar's own metadata, abstracts, citation graph, and open-access full text are free.

## How to mine it for the future
This is the connective tissue, not a destination for browsing headlines. Use it three ways. First, citation-graph traversal: start from a landmark paper and walk its citing papers to see which directions the field actually pursued, which exposes momentum better than any single abstract. Second, the Datasets API to pull a monthly snapshot and run your own trend clustering locally when you need scale beyond rate limits. Third, the relevance and bulk search endpoints to build a standing monitor on future-relevant keywords and surface new high-citation work as it appears. Influential-citation counts and citation velocity are the key signals for separating durable directions from noise.

## Notable recent work or trends (2025 to 2026)
- "Semantic Scholar Academic Graph API expansion" (ongoing through 2026), https://www.semanticscholar.org/product/api
  The API now bundles full paper search, the citation and reference graph, recommendations, and bulk dataset downloads with stronger documentation and stability. For a futures workflow, this turns the entire corpus of science into a queryable substrate: you can track where citations are accelerating across any field rather than relying on a curated feed.
- "S2ORC open full-text corpus" (maintained, monthly snapshots), https://github.com/allenai/s2orc
  S2ORC is the largest publicly available collection of full text for open-access scientific papers, distributed as gzipped JSON via the Datasets API. It enables full-text mining and machine analysis of the literature, the kind of corpus that underpins building a defensible map of where research is heading rather than guessing from titles.
- "The Semantic Scholar Open Data Platform" (foundational paper, still describes the system), https://arxiv.org/abs/2301.10140
  The platform paper from Ai2 describes how the knowledge graph is assembled and exposed, combining ID-based lookup with search and citation-relationship endpoints. It is the reference for understanding what the graph contains and how to query it reliably for a long-running monitoring setup.

## Hooks for the brain
- This is the cross-cutting evidence layer for every other tech thesis: whatever direction you are tracking, Semantic Scholar tells you whether the underlying research is growing, stalling, or already cited heavily.
- Use the citation graph as a momentum detector. A 10 to 20 year thesis is stronger when the seed papers show rising influential-citation counts here.
- Pairs well with the conference sources (OpenReview) and lab sources (DeepMind, OpenAI): they tell you what was announced, Semantic Scholar tells you whether the wider scientific community is building on it.

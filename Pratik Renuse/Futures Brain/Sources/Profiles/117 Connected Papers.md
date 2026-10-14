# Connected Papers

#source
Domain: Research repositories
Verified: June 2026

## What it is
A visual literature-mapping tool that takes one seed paper and builds an interactive graph of conceptually related work, so a researcher can see the shape of a field at a glance. It surfaces neighbours, prior works, and derivative works instead of a flat citation list.

## Access
- URL: https://www.connectedpapers.com/
- RSS / feeds: None. It is an interactive app, not a publication, so there is no article feed to subscribe to.
- API: Yes, early-access REST API. Request a key at hello@connectedpapers.com. Official clients exist for JavaScript (github.com/ConnectedPapers/connectedpapers-js) and Python (github.com/ConnectedPapers/connectedpapers-py, also on PyPI as connectedpapers-py). Per-key rate limiting, roughly 5 graph builds per minute, with usage limits that do not re-charge for the same graph accessed again within 30 days.
- Key sections or features for future tech: similarity graph for any seed paper, Prior Works view (the seminal, most-cited ancestors of a field), Derivative Works view (what built on it next), multi-origin graphs (combine several seed papers), filters by year, keyword, open access, and PDF availability, plus saved graphs and history.
- Paywall: partial. Free tier gives 5 graphs per month with all features. Academic plan is about 5 USD per month (around 3 USD on annual billing) for unlimited graphs, Business plan about 15 USD per month (around 10 USD annual). Group and per-seat plans also exist.

## How to mine it for the future
Drop in a landmark or recent paper on a frontier topic (for example a 10 to 20 year bet like neuromorphic chips, AI agents, or fusion control) and read the graph as a map of where the field is concentrated and where it is thinning out. Use Prior Works to find the foundational ideas everyone is standing on, and Derivative Works to see the newest threads spinning off, which is where the next decade tends to start. Multi-origin graphs let you overlay two adjacent fields to spot the bridge papers where convergence is happening. The tool draws on the Semantic Scholar corpus plus arXiv and PubMed, so coverage is broad across CS, biomedicine, and physics.

## Notable recent work or features (2025 to 2026)
- "Graph-based field mapping via co-citation and bibliographic coupling" (core feature, ongoing), https://www.connectedpapers.com/
  The graph clusters papers by conceptual similarity rather than direct citation, using co-citation and bibliographic coupling, so two papers that never cite each other still sit close if they share intellectual DNA. This is what makes it useful for finding work you would miss with keyword search alone. It is the single most useful view for someone trying to orient in an unfamiliar frontier area fast.
- "Early-access public API with JS and Python clients" (available, request via email), https://github.com/ConnectedPapers/connectedpapers-py
  An API key lets you build graphs and pull related-paper data programmatically, which means a futures workflow can automate field scans rather than clicking one graph at a time. The clients expose calls for remaining usage and for the set of free-access papers tied to a key. Useful if you want to run a daily or weekly sweep of new derivative works around a watchlist of seed papers.
- "Premium accounts and multi-origin graphs" (announced via the Connected Papers blog), https://medium.com/connectedpapers/announcing-premium-accounts-multi-origin-graphs-and-more-92e8dbd66848
  Multi-origin graphs let you seed a map with several papers at once, which is the right tool for tracking convergence between two or three technologies rather than one. Premium accounts removed the practical ceiling for heavy users. Together these turned it from a one-off lookup into something you can lean on for sustained field monitoring.

## Hooks for the brain
- Daily pull: keep a short watchlist of 5 to 10 seed papers on your core 10 to 20 year themes and re-run their Derivative Works views to catch what is newly building on them.
- Use it as the first step when a new term shows up, build a graph, read Prior Works to learn the lineage in minutes, then save the graph so you can watch the cluster grow over time.
- The page is JavaScript-only and does not render as static HTML, so capture findings by exporting or screenshotting the graph rather than expecting a text feed.

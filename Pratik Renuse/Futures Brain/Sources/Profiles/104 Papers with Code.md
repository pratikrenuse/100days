# Papers with Code

#source
Domain: Research repositories
Verified: June 2026

## What it is
Papers with Code was the long-running site that linked machine-learning papers to their open-source code and tracked state-of-the-art results across thousands of benchmarks and tasks. It was sunset by Meta on 24 July 2025, and paperswithcode.com now redirects to Hugging Face Papers.

## Access
- URL: https://paperswithcode.com (redirects to Hugging Face Papers / Trending Papers at https://huggingface.co/papers ). The original interface, search, and benchmark leaderboards are no longer served.
- RSS / feeds: None active. The former feeds are gone with the site.
- API: The former Papers with Code REST API is decommissioned. A frozen snapshot of the historical data (papers, code links, benchmark JSON) remains in the open archive at https://github.com/paperswithcode/paperswithcode-data , and third-party mirrors (for example CodeSOTA) have rebuilt parts of the leaderboard data.
- Key sections or categories for future tech: Historically, task-based SOTA leaderboards across roughly 9,000-plus benchmarks (computer vision, NLP, reinforcement learning, speech, graphs) plus paper-to-code links and dataset pages. None of these are live now; the closest current substitute is the Trending Papers section on Hugging Face, which links papers to code but does not reproduce the task-level SOTA tracking.
- Paywall: not applicable. The live site is shut down. The archived data on GitHub is free and open.

## How to mine it for the future
Treat Papers with Code as a closed historical archive, not a live source. For the future-facing job it used to do (which new method just took the lead on a benchmark, and where is the code), use its successor: Hugging Face Trending Papers at https://huggingface.co/papers , which carries the paper-to-code linking forward. For historical SOTA trajectories (how fast accuracy on a given task improved year over year, useful for extrapolating capability curves), pull the frozen JSON from the paperswithcode-data GitHub archive or a community mirror such as CodeSOTA. Do not point a daily pull at paperswithcode.com expecting live data, it only redirects.

## Notable recent work or trends (2025 to 2026)
- "Papers with Code sunset" (24 July 2025; announced 25 July 2025 by Julien Chaumond, Hugging Face co-founder and CTO), https://github.com/paperswithcode/paperswithcode-data/issues/116
  Meta retired the site; the domain began redirecting to Hugging Face. A large body of benchmark tables, paper-to-code links, and dataset pages is not fully recoverable. The single most important fact for this brain: the live source no longer exists.
- "Hugging Face Trending Papers launched as the successor" (25 July 2025), https://huggingface.co/papers/trending
  Hugging Face, with Meta AI and the original Papers with Code core team, launched Trending Papers to carry forward community paper-following and code linking. It does not reproduce the full task-level SOTA leaderboards.
- "Standardization of Post-Publication Code Verification by Journals is Possible with the Support of the Community" (2026), arXiv id 2601.07189
  An arXiv paper arguing that journals should adopt community-supported standards to verify that published code reproduces results, partly framed as a response to the gap left by Papers with Code. Signals where reproducibility infrastructure may rebuild.
- "Frozen data archive" (ongoing since 2025), https://github.com/paperswithcode/paperswithcode-data
  The historical Papers with Code dataset (papers, abstracts, code links, benchmark results as JSON) remains downloadable. This is the only way to mine the platform's legacy SOTA history.

## Hooks for the brain
- Mostly a cautionary and historical hook: log it as shut down so a daily pull never targets it, and route the paper-to-code job to Hugging Face Trending Papers instead.
- Still useful for one thing: historical SOTA trajectories from the frozen GitHub archive, which support capability-curve and extrapolation theses (how fast a benchmark improved over time).
- Confirms a broader trend worth tracking: consolidation of ML research infrastructure under Hugging Face after Meta exited this space.

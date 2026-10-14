# Forecasting, prediction markets, space economy and think tanks (Full Detail)

Full-detail consolidation of dossiers 198 to 203, reproduced in their entirety in numeric order.

## Table of Contents
- 198. Good Judgment / Philip Tetlock
- 199. Polymarket
- 200. Kalshi
- 201. Quilty Space
- 202. Payload
- 203. Brookings TechTank

---

## 198. Good Judgment / Philip Tetlock

#source
Domain: Forecasting
Verified: June 2026

### Read them
- Homepage / blog / X / podcast / RSS: Good Judgment Inc at https://goodjudgment.com/ ; blog/insights at https://goodjudgment.com/insights/ ; public forecasting at https://www.gjopen.com/ ; Substack at https://goodjudgment.substack.com/ ; X @superforecaster. Tetlock's research home is the Forecasting Research Institute and the Wharton/UPenn page.
- Paywall: partial (blog, Good Judgment Open, and The Economist's annual collaboration are free; FutureFirst subscription, custom Superforecasts, and training are paid)

### Who they are
Philip Tetlock is the Wharton/Penn psychologist behind the Good Judgment Project, which won IARPA's 2011 geopolitical forecasting tournament and produced the "superforecasters" concept; he co-founded Good Judgment Inc with Barbara Mellers to sell that capability commercially. The org runs structured forecasting tournaments, sells forecasts and training, and benchmarks human judgment against markets and AI.

### Their future thesis (one line)
Calibrated, accountable probability estimates from trained human forecasters still beat prediction markets and large language models on the volatile, contingent questions that matter most, and the future belongs to a hybrid of human judgment plus AI.

### Key future-relevant pieces
- "What the superforecasters predict for major events in 2026" (November 12, 2025), https://www.economist.com/the-world-ahead/2025/11/12/what-the-superforecasters-predict-for-major-events-in-2026
  The 11th annual collaboration with The Economist's World Ahead, where the superforecasters put precise probabilities on questions like in-orbit Starship fuel transfers, the post-midterms balance of power, US tariffs, and Russia-Ukraine. It is the most accessible public window into how the group reasons about the year ahead.
- "Good Judgment's 2025 in Review" (January 6, 2026), https://goodjudgment.com/good-judgments-2025-in-review/
  A self-scored recap noting 1,140 forecasting questions launched with a zero void rate, a third straight year of beating the CME FedWatch tool on Fed decisions, and the finding that the best LLM still trails the best human forecasters by about 40% in their sibling org's competition. It lays out their explicit case against treating prediction markets and AI as oracles.
- "Superforecasting AI Governance" report, https://goodjudgment.com/superforecasting-ai-governance/
  A dedicated report applying the superforecasting method to AI policy and governance questions, the kind of long-horizon, high-uncertainty topic the firm argues markets handle poorly. Useful as a model of how to put numbers on contested future-of-AI debates.
- "Tetlock appointed to the board of ForecastEx (Interactive Brokers' prediction market)" (January 2026), https://goodjudgment.com/about/press-news/
  Tetlock joined the board of Interactive Brokers' regulated prediction-market platform, a notable bridge between the academic superforecasting tradition and the fast-growing real-money prediction-market industry. It signals the two forecasting worlds are starting to converge rather than just compete.

### Hooks for the brain
- The cleanest "humans vs markets vs AI" scorekeeper in forecasting; cite them when comparing Polymarket/Kalshi odds against expert judgment.
- The Economist World Ahead collaboration is a free annual list of calibrated probabilities, ideal raw material for a futures dashboard.
- The hybrid (human plus AI) thesis is a useful counterweight to "just ask the model" forecasting.

---

## 199. Polymarket

#source
Domain: Prediction markets
Verified: June 2026

### What it is
Polymarket is the world's largest real-money prediction market, where users trade event contracts on politics, crypto, macro, sports, and culture, with prices acting as live probabilities. After a 2022 CFTC settlement that blocked US users, it acquired a licensed exchange and clearinghouse (QCX) to re-enter the American market.

### Access
- URL: https://polymarket.com/
- RSS / feeds / newsletter / API: Public market data via the Polymarket API (CLOB and Gamma data endpoints, documented at https://docs.polymarket.com/ ); event-driven data is also distributed commercially through ICE following its investment. No traditional RSS; markets are browsable by category (politics, crypto, tech).
- Paywall: no to browse odds and read markets; trading requires an account and (historically) was geofenced from US users pending the regulated relaunch

### What it does for the future
Polymarket turns crowd money into continuously updated probabilities on near-future events, making it a fast, legible signal for "what is the market pricing right now" on elections, Fed decisions, conflicts, and tech milestones. For a futures brain it is a real-time sentiment instrument: useful for tracking how consensus shifts, and as a foil against expert forecasts like Good Judgment's.

### Notable recent work (2025 to 2026)
- "ICE announces strategic investment in Polymarket" (October 2025), https://ir.theice.com/press/news-details/2025/ICE-Announces-Strategic-Investment-in-Polymarket/default.aspx
  The NYSE parent committed up to $2 billion (a $1B Series D plus up to $1B in secondary purchases) and became a global distributor of Polymarket's event data. The deal marked traditional finance's largest embrace of prediction markets to date and a roughly $8B pre-money valuation.
- "NYSE owner doubles down on Polymarket with fresh $600 million investment" (March 27, 2026), https://www.coindesk.com/markets/2026/03/27/nyse-owner-doubles-down-on-polymarket-with-fresh-usd600-million-investment
  ICE added $600 million on top of its October stake, deepening the bet that event contracts become mainstream market infrastructure. Coverage framed it as ICE building distribution rights over a new asset class.
- "Polymarket in talks to raise $400M at $15B valuation" (April 2026), https://finance.yahoo.com/markets/crypto/articles/polymarket-talks-raise-400m-15b-160954426.html
  Reporting indicated Polymarket was seeking roughly $400 million more at a $15 billion valuation, nearly double its level just months earlier. The pace underscored how quickly capital was repricing prediction markets in 2026.
- "Balance of Power: 2026 Midterms predictions and odds", https://polymarket.com/event/balance-of-power-2026-midterms
  A live market complex pricing control of the House and Senate ahead of the November 2026 US midterms, aggregating well over a billion dollars in election volume. It is a concrete example of Polymarket as a running forecast on a major political outcome, valuable to compare against polls and superforecasters.

### Hooks for the brain
- Pair Polymarket odds with Good Judgment forecasts to triangulate consensus vs calibrated expert judgment on the same question.
- ICE's multi-billion stake is the clearest signal that event contracts are being treated as durable financial infrastructure, not a fad.
- Watch the regulated US relaunch (via the QCX acquisition): a turning point for whether prediction markets go mainstream in America.

---

## 200. Kalshi

#source
Domain: Prediction markets
Verified: June 2026

### What it is
Kalshi is a US-based, CFTC-regulated exchange for trading event contracts on real-world outcomes: elections, economic data, corporate events, weather, and (dominantly) sports. It positions itself as regulated market infrastructure rather than a betting site, and powers event contracts for partners like Robinhood.

### Access
- URL: https://kalshi.com/
- RSS / feeds / newsletter / API: Full REST API plus WebSocket streaming, documented at https://docs.kalshi.com/ (production base https://external-api.kalshi.com/trade-api/v2 ); several market-data endpoints are public without keys, and API access is free for verified users. No traditional RSS.
- Paywall: no to browse markets and read odds; trading and authenticated API use require a verified account

### What it does for the future
Kalshi is the regulated, programmatically accessible version of a prediction market, which makes it the cleaner data source for building forecasting tools and pulling event probabilities into applications. Its forward value is twofold: live odds on near-future events, and a live case study in how regulators (CFTC, states) decide what counts as a market versus gambling, which will shape the whole category for the next decade.

### Notable recent work (2025 to 2026)
- "Kalshi becomes the event-contract engine for Robinhood's Prediction Markets Hub" (2025), https://en.wikipedia.org/wiki/Kalshi
  Kalshi supplied the regulated infrastructure behind Robinhood's prediction-markets product, plus partnerships with CNN and CNBC, pushing event contracts toward mainstream retail distribution. This B2B infrastructure role, more than its own app, is what makes Kalshi structurally important.
- "CFTC proposes rules limiting prediction markets on sports" (2026), https://www.espn.com/espn/betting/story/_/id/49019930/cftc-proposes-rules-limiting-prediction-markets-kalshi-sports
  The CFTC floated rules that would restrict sports-related event contracts (no injuries, no player props), directly targeting the category that drives roughly 90% of Kalshi's activity. The proposal is a pivotal regulatory fork for the entire prediction-market business model.
- "Arizona files criminal charges against Kalshi over sports and election wagering" (March 2026), https://www.sportico.com/business/sports-betting/2026/kalshi-polymarket-cftc-letter-luana-lopes-lara-1234902999/
  Arizona's attorney general brought criminal charges alleging Kalshi ran an illegal gambling and election-wagering business, part of a wave of roughly 19 federal suits and multiple state actions. The fights with states (including a Massachusetts injunction) are the defining risk to Kalshi's growth.
- "Kalshi's $40 billion valuation target prices prediction markets as exchange infrastructure" (2026), https://www.investing.com/analysis/kalshis-40-billion-target-prices-prediction-markets-as-exchange-infrastructure-200682789
  After raising billions across 2025 to 2026 rounds, Kalshi reportedly targeted a $40B valuation, with monthly volume in the tens of billions. The analysis frames the valuation as a bet that event contracts become permanent financial plumbing alongside futures and options.

### Hooks for the brain
- Best clean API for piping live event probabilities into a futures dashboard (regulated, documented, free for verified users).
- The CFTC and state-level legal fights are the leading indicator for whether prediction markets become a permanent US asset class or get boxed in.
- Sports dominance (about 90% of activity) is a caveat: most Kalshi volume is not the geopolitical or macro signal a futures brain cares about, so filter by market type.

---

## 201. Quilty Space

#source
Domain: Space economy
Verified: June 2026

### What it is
Quilty Space is a research and advisory firm focused exclusively on the space sector, founded in 2016 (as Quilty Analytics) by veteran Wall Street satellite analyst Chris Quilty. It is one of the most frequently cited sources of satellite and space market intelligence, covering financials, megaconstellations, defense, launch economics, and M&A.

### Access
- URL: https://www.quiltyspace.com/
- RSS / feeds / newsletter / podcast / API:
  - Research Hub (paid reports): https://www.quiltyspace.com/category/all-products
  - QuickTakes (free short-form analysis): https://www.quiltyspace.com/qs-space-knowledge/categories/quicktakes
  - Business Intelligence Platform with daily news flashes, M&A and investment data, and company deep dives (subscription)
  - X: https://x.com/QuiltySpace ; LinkedIn: https://www.linkedin.com/company/quiltyspace
  - Advisory services: https://www.quiltyspace.com/advisory ; contact info@quiltyspace.com
- Paywall: partial (QuickTakes and some commentary are free; flagship financial reports and the BI platform are paid, e.g. individual reports around 1,900 USD and bundles 3,000 to 4,900 USD)

### What it does for the future
Quilty supplies the rigorous, bottom-up financial modeling that the space economy otherwise lacks, especially for private giants like SpaceX where no public filings exist. Its forecasts on Starlink revenue, China's megaconstellations, defense spending, and launch cadence are reference points for investors, governments, and operators trying to size where the orbital economy is heading over the next decade. For a Futures Brain, it converts space hype into defensible numbers and timelines.

### Notable recent work (2025 to 2026)
- "Starlink Financial Overview 2025 2H & 2026 Forecast" (published March 20, 2026), https://www.quiltyspace.com/product-page/starlink-financial-overview-2025-2h-2026-forecast
  The fourth installment of Quilty's running SpaceX connectivity model raises its year-end 2026 Starlink forecast to 16.8 million subscribers and projects roughly 20 billion USD in 2026 revenue with about 14 billion USD EBITDA. It argues the story has shifted from raw subscriber growth to revenue mix, pricing, and the rising role of government and defense demand (Starshield modeled at 3.2 billion USD in 2026). This is the closest thing to a financial X-ray of the company likely to anchor SpaceX's eventual IPO debate.
- "Starlink Financial & Strategic Analysis 2025 1H" (2025), https://www.quiltyspace.com/product-page/starlink-financial-strategic-analysis-2025-1h
  The mid-2025 model tracked Starlink's transition from capital sink to cash generator, with consumer subscribers revised upward and free cash flow accelerating toward several billion dollars by 2026. It frames the inflection point where the constellation starts funding the rest of SpaceX. A key data point for anyone modeling the LEO broadband business.
- Quilty Space 2025 Year in Review (covered December 2025), https://www.spaceintelreport.com/4-takeaways-quilty-space-provides-a-2025-year-in-review/
  Quilty's end-of-year readout flagged defense priorities reshaping markets (about 74 billion USD in government space spending in 2025, Golden Dome in the US, IRIS-squared in Europe), commercial constellations scaling faster than ever, and "sovereignty" becoming a central organizing principle as nations seek to control their own space capabilities. It also highlighted direct-to-device as a defining theme. A compact map of the forces likely to drive the 2026 to 2030 space economy.
- "Earth Observation Financial Review 2025 Q3" (2025), https://www.quiltyspace.com/product-page/earth-observation-financial-review-2025-q3
  Quilty's EO coverage showed defense demand dominating earth observation in 2025, a trend it expects to continue as Europe ramps spending and Asia and MENA pursue affordable sovereign systems. It is a useful counterweight to the Starlink-centric narrative, covering the imaging and sensing side of the orbital economy. Signals where surveillance and intelligence-from-orbit money is flowing.

### Hooks for the brain
- The numbers behind the hype: when you need a defensible revenue or subscriber figure for SpaceX, Starlink, or a constellation, Quilty's bottom-up models are the citable source.
- "Sovereignty" and defense as the organizing trend: Quilty's 2025 framing (Golden Dome, IRIS-squared, national champions) is a strong signal for the next decade of space spending.
- Tracks the China challenge in orbit (Guowang, Qianfan) on financial terms, useful for a US-China space-race thread.
- Free QuickTakes give a steady low-cost pulse; the deep models are paid, so flag them as premium when budgeting research access.

---

## 202. Payload

#source
Domain: Space economy
Verified: June 2026

### What it is
Payload is a space-focused media company launched in September 2021 that covers the business and policy of space. It started as a weekly newsletter, went daily, and has expanded into multiple newsletters, a podcast, original data, events, and a paid research arm (Payload Pro).

### Access
- URL: https://payloadspace.com/
- RSS / feeds / newsletter / podcast / API:
  - Newsletters (free): https://payloadspace.com/subscribe/ , including the daily flagship (9am ET, Monday to Friday), Polaris (weekly space policy, https://polaris.payloadspace.com/), Payload Europe, and Parallax (weekly space science)
  - Pathfinder podcast: https://payloadspace.com/podcasts/ (also on Apple Podcasts)
  - Payload Pro (paid research, data, analysis): https://pro.payloadspace.com/subscription/
  - Stories index: https://payloadspace.com/news/ ; Events and webinars listed on site
- Paywall: partial (daily newsletter, Polaris, Parallax, podcast, and most articles are free; Payload Pro research and data are paid)

### What it does for the future
Payload is the daily operating system for the space-business and space-policy community, read by industry and government officials. It tracks the money (funding rounds, M&A, equities), the policy (NASA budgets, Golden Dome, regulatory shifts), and the technology cadence (launch, constellations, lunar) that together determine how fast the off-Earth economy actually scales. For a Futures Brain it is the high-frequency signal feed on the commercialization and militarization of space.

### Notable recent work (2025 to 2026)
- "Space Policy: 2025 Wrapped" (December 16, 2025), https://payloadspace.com/space-policy-2025-wrapped/
  Payload's year-in-review captures a whiplash year: Trump championed a crewed Mars landing in his inaugural address, then proposed historic NASA budget cuts, while Jared Isaacman was nominated, withdrawn, and re-nominated to lead NASA. It distills the year's throughline as "Moon and Mars" in parallel, the rise of the Golden Dome missile-defense program, and competition with China underpinning every policy move. A clean snapshot of the political forces steering US space for the next several years.
- "The State of Launch 2025" (2025), https://payloadspace.com/the-state-of-launch-2025/
  Payload's data-driven review of the launch market tracks cadence, providers, and the economics shaping access to orbit. Launch volume is the throughput metric for the entire space economy, so this is a core leading indicator. It frames where reusable and emerging vehicles are pushing cost and capacity.
- "Top 5 of 2025: Policy" (December 29, 2025), https://payloadspace.com/top-5-of-2025-policy/
  A ranked recap of the year's biggest space-policy stories, ending with the confirmation of a new NASA administrator. It is a fast way to see which policy fights actually mattered versus the noise. Useful for calibrating which 2025 threads will carry into 2026 and beyond.
- "FAA OKs More Starship Launches at Starbase" (2025), https://payloadspace.com/faa-oks-more-starship-launches-at-starbase/
  Payload reported the FAA clearing SpaceX to conduct up to 25 Starship launches per year (and up to 50 landings) at Starbase. Starship cadence is the gating factor for NASA's Moon and Mars ambitions and for Starlink deployment, so regulatory approvals like this are concrete forward markers. It shows how policy throughput, not just engineering, paces the most consequential vehicle in the sector.

### Hooks for the brain
- High-frequency pulse: the free daily newsletter plus Polaris (policy) and Parallax (science) give a steady, broad read on the space economy without a paywall.
- Follows both money and power: Payload connects funding and M&A to NASA budgets, Golden Dome, and US-China competition, which is exactly the business-meets-geopolitics framing a Futures Brain needs.
- Original data and rankings (State of Launch, year-in-review wraps) make it citable, not just a news aggregator.
- Note conflict disclosures: Payload publishes an ethics page and labels sponsored content; its CEO has disclosed small stakes in a few space companies, so weigh op-eds and sponsored pieces accordingly.

---

## 203. Brookings TechTank

#source
Domain: Think tanks
Verified: June 2026

### What it is
TechTank is the technology-policy blog and biweekly podcast of the Center for Technology Innovation at the Brookings Institution. It focuses on developments in science and technology policy and how they affect health care, education, economic development, innovation, and governance, hosted primarily by Nicol Turner Lee and Darrell West.

### Access
- URL: https://www.brookings.edu/tags/techtank/
- RSS / feeds / newsletter / podcast / API:
  - TechTank Podcast hub: https://www.brookings.edu/tags/the-techtank-podcast/
  - Podcast on Apple Podcasts: https://podcasts.apple.com/us/podcast/techtank/id1526725061 ; on Acast: https://shows.acast.com/tech-tank
  - Broader Brookings tech topic feed: https://www.brookings.edu/topics/technology-innovation/
  - Brookings offers email newsletters and RSS by topic from its site
- Paywall: no (Brookings articles, blog posts, and podcast episodes are free)

### What it does for the future
TechTank translates Brookings' research into accessible, policy-oriented commentary on the technologies reshaping the economy and society, with a strong forward lens (annual "tech outlook" episodes, governance and infrastructure deep dives). It is a credible, non-partisan-leaning institutional read on how AI, data centers, quantum, and online safety will be regulated, which often determines how those technologies actually deploy. For a Futures Brain it is the policy-and-governance counterweight to industry hype.

### Notable recent work (2025 to 2026)
- "Tech outlooks for 2026" (The TechTank Podcast) (January 2026), https://www.brookings.edu/articles/tech-outlooks-for-2026-the-techtank-podcast/
  Co-hosts Darrell West and Nicol Turner Lee lay out the priorities they expect to dominate technology policy, spanning AI, privacy, and social media. They flag continued fights over generative AI's labor impacts, the data center boom, and children's online safety, plus a US push for AI leadership. A useful, concise forecast of the policy battles likely to shape the near future.
- "Why data centers are important for AI" (The TechTank Podcast) (November 10, 2025), https://www.brookings.edu/articles/why-data-centers-are-important-for-ai-the-techtank-podcast/
  West and Turner Lee explain what data centers actually are, the barriers to building them, and how to overcome those constraints, drawing on their accompanying paper. The episode connects AI ambition to the physical and energy infrastructure it requires, a chronically underappreciated bottleneck. It frames compute buildout as a defining policy and resource question of the decade.
- "The future of data centers" (January 13, 2026), https://www.brookings.edu/articles/the-future-of-data-centers/
  This piece examines energy, workforce, and climate implications of the global data center buildout, noting an estimated 11,800 data centers worldwide with the US leading. It pushes past the AI excitement to the trade-offs (power, water, local impact) that will shape where and whether compute gets built. A strong systems-level view of AI's infrastructure footprint.
- "The future of quantum computing" (The TechTank Podcast) (2025), https://www.brookings.edu/articles/the-future-of-quantum-computing-the-techtank-podcast/
  Darrell West discusses the capabilities and trajectory of quantum computing with a Brookings visiting fellow, covering where the technology stands and its policy implications. Quantum is a long-horizon wildcard for security and computation, and this gives a grounded, non-hyped primer. Helpful for tracking a technology whose biggest effects may land in the 10 to 20 year window.

### Hooks for the brain
- Governance lens on the future: TechTank tells you how AI, data centers, and quantum are likely to be regulated, which often matters as much as the tech itself.
- Annual "tech outlook" episodes are a clean, recurring forecast artifact to track year over year.
- Infrastructure realism: its 2025 to 2026 focus on data centers, energy, and water reframes AI as a physical and resource story, not just a software one.
- Institutional credibility plus free access make it easy to cite; pair episodes with the linked Brookings papers for depth.

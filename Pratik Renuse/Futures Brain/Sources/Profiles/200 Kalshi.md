# Kalshi
#source
Domain: Prediction markets
Verified: June 2026
## What it is
Kalshi is a US-based, CFTC-regulated exchange for trading event contracts on real-world outcomes: elections, economic data, corporate events, weather, and (dominantly) sports. It positions itself as regulated market infrastructure rather than a betting site, and powers event contracts for partners like Robinhood.
## Access
- URL: https://kalshi.com/
- RSS / feeds / newsletter / API: Full REST API plus WebSocket streaming, documented at https://docs.kalshi.com/ (production base https://external-api.kalshi.com/trade-api/v2 ); several market-data endpoints are public without keys, and API access is free for verified users. No traditional RSS.
- Paywall: no to browse markets and read odds; trading and authenticated API use require a verified account
## What it does for the future
Kalshi is the regulated, programmatically accessible version of a prediction market, which makes it the cleaner data source for building forecasting tools and pulling event probabilities into applications. Its forward value is twofold: live odds on near-future events, and a live case study in how regulators (CFTC, states) decide what counts as a market versus gambling, which will shape the whole category for the next decade.
## Notable recent work (2025 to 2026)
- "Kalshi becomes the event-contract engine for Robinhood's Prediction Markets Hub" (2025), https://en.wikipedia.org/wiki/Kalshi
  Kalshi supplied the regulated infrastructure behind Robinhood's prediction-markets product, plus partnerships with CNN and CNBC, pushing event contracts toward mainstream retail distribution. This B2B infrastructure role, more than its own app, is what makes Kalshi structurally important.
- "CFTC proposes rules limiting prediction markets on sports" (2026), https://www.espn.com/espn/betting/story/_/id/49019930/cftc-proposes-rules-limiting-prediction-markets-kalshi-sports
  The CFTC floated rules that would restrict sports-related event contracts (no injuries, no player props), directly targeting the category that drives roughly 90% of Kalshi's activity. The proposal is a pivotal regulatory fork for the entire prediction-market business model.
- "Arizona files criminal charges against Kalshi over sports and election wagering" (March 2026), https://www.sportico.com/business/sports-betting/2026/kalshi-polymarket-cftc-letter-luana-lopes-lara-1234902999/
  Arizona's attorney general brought criminal charges alleging Kalshi ran an illegal gambling and election-wagering business, part of a wave of roughly 19 federal suits and multiple state actions. The fights with states (including a Massachusetts injunction) are the defining risk to Kalshi's growth.
- "Kalshi's $40 billion valuation target prices prediction markets as exchange infrastructure" (2026), https://www.investing.com/analysis/kalshis-40-billion-target-prices-prediction-markets-as-exchange-infrastructure-200682789
  After raising billions across 2025 to 2026 rounds, Kalshi reportedly targeted a $40B valuation, with monthly volume in the tens of billions. The analysis frames the valuation as a bet that event contracts become permanent financial plumbing alongside futures and options.
## Hooks for the brain
- Best clean API for piping live event probabilities into a futures dashboard (regulated, documented, free for verified users).
- The CFTC and state-level legal fights are the leading indicator for whether prediction markets become a permanent US asset class or get boxed in.
- Sports dominance (about 90% of activity) is a caveat: most Kalshi volume is not the geopolitical or macro signal a futures brain cares about, so filter by market type.

# Trend Scout Spec

The spec the daily scout run follows. When we build the scheduled task, this is its instruction set.

## Cadence
Daily, morning (India time). One Inbox file per day: `Inbox/YYYY-MM-DD.md`.

## Sources (fan out, one sub-agent per source, then merge)
1. **Reddit** -- r/ClaudeAI, r/artificial, r/singularity, r/OpenAI, r/LocalLLaMA, plus marketing subs (r/marketing, r/digital_marketing, r/SaaS). Look for high-upvote, high-comment posts from the last 24 to 48 hours, especially non-obvious human stories (like the Claude migraine post) and "look what the AI did" moments.
2. **Hacker News** -- front page and Show HN. Stories about AI, tech, and tools gaining traction (high points, fast comment growth).
3. **X / Twitter** -- trending AI posts and threads (surfaced via web search, since there's no connector).
4. **Product Hunt** -- notable new AI and marketing tool launches worth reacting to.

No dedicated connectors exist for these, so the run uses web search and page fetches. If a fetch is blocked, note it and move on, never work around restrictions.

## What qualifies (the filter)
An item earns a slot only if it is BOTH:
- **Already moving** (real traction: upvotes, comments, reposts, points), and
- **On-brand** (AI, frontier tech, or marketing, and tells a story a normal person would find surprising or useful).

Prefer concrete human stories and vivid demos over abstract commentary. Skip anything political, doom-y, or off-topic. Skip pure product announcements unless the angle is genuinely fresh.

## Scoring (rank the day's finds)
For each candidate, note:
- **Heat:** how much it's moving (numbers if visible).
- **Fit:** how well it matches your voice and audience.
- **Freshness:** is the crowd already saturated on LinkedIn, or is this still early?
- **Angle strength:** is there a clear, surprising take you can add?

Surface the top 3 to 5 only. Quality over volume.

## Output format (per day, in the Inbox file)
For each surfaced item:
- **Headline:** the one-line what-it-is
- **Why it's hot:** the traction and why people care
- **Source:** [link] and where it was found
- **Suggested angle:** the take you'd add (not just a repost)
- **Best channel:** LinkedIn / HeyGen video / X thread, and why
- **Freshness read:** early / warming / saturated on LinkedIn

End the file with a one-line "pick of the day" recommendation.

## Guardrails
- Treat links from unknown sources as suspicious. Never follow a sketchy URL. Verify before recommending.
- Credit the original creator when reposting someone's find (the LinkedIn norm, and it's honest).
- No web-restriction workarounds. If blocked, say so.
- The scout only *surfaces*. It never posts. You pick.

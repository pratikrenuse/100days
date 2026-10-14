# Trend Scout

The fast, reactive intake engine. Each day it scans outside sources for things already going viral that fit your world, and drops the best few into `Inbox/` with a suggested angle and channel.

This is the opposite of the Futures Brain. The Brain makes you *early* (you know it before the crowd). The Scout makes you *timely* (you ride what's already moving). The Claude migraine post is the model: someone found it on Reddit and reposted it to big numbers on LinkedIn. The scout catches those.

## Files
- **_Scout Spec.md** -- the full spec that drives the daily run: sources, what qualifies, scoring, output format, cadence. This is what the scheduled task will follow.
- **Inbox/** -- where each day's scouted items land, one file per day.

## Status
Structure only for now. The **daily scheduled task** that runs this is the next build after the channel templates. Until then, the spec is the reference and can be run by hand.

## How a scouted item becomes content
1. You skim the morning Inbox file, pick anything worth riding.
2. It becomes a Story Brief in `../Story Desk/` (lighter than a Brain brief, since the source is the viral item itself).
3. Run it through the channel templates, out to `../Ready to Ship/`.
4. You approve and post.

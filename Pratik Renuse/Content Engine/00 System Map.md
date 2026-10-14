# 00 System Map -- The Content Engine

This is the production line that turns knowledge into published content across channels. Read it first. It sits **on top of** the `Futures Brain/` (the research layer) and never replaces it.

The one rule: **one story, many formats.** We never write the same idea three times. We write it once as a story, then adapt it per channel.

**The standing workflow is `01 New Story Pipeline.md`.** Every new article/story produces, in order: a LinkedIn post, then a HeyGen video script, both saved to `Ready to Ship/<Story Name>/`. That doc holds the locked patterns (human voice, fixed beats fresh words, no jargon, etc.) so they never need re-explaining. Read it before writing any content.

---

## The shape of the whole thing

```
  INTAKE (two engines)              STORY DESK              ADAPTERS (per channel)        REVIEW GATE
  ---------------------             ----------              ----------------------        -----------
  1. Futures Brain      \                                   -> LinkedIn Post   \
     (owned, weekly)      >  ->  one canonical Story Brief   -> HeyGen Script    >  ->  Ready to Ship
  2. Trend Scout        /         (angle, facts, arc,        -> X Thread        /        (you approve,
     (borrowed, daily)            hidden player, forecast)                                you post)
```

Everything flows left to right. Both intake engines drop ideas into the **Story Desk**. Each picked idea becomes **one Story Brief**. That brief is run through each **channel adapter** (a template) to produce a channel-ready draft. All drafts wait in **Ready to Ship** until you approve. Nothing auto-publishes.

---

## The two intake engines

**1. Futures Brain (owned, slow burn).**
What you already have. Thesis-first research on where the world is heading, and the hidden players who decide it. The **weekly maintenance task** keeps it fresh and produces the deep evergreen stories (GE Vernova, Astera Labs). These are your signature pieces.
- Lives in: `Futures Brain/`
- Cadence: weekly (existing scheduled task)
- Output: a Story Brief for the best thesis-moving item of the week

**2. Trend Scout (borrowed, fast).**
The new engine. Each day it scans outside sources for things **already going viral** that fit your world (AI, tech, marketing). Like the Claude migraine post: someone found it on Reddit and reposted it to big numbers on LinkedIn. The scout surfaces those before they peak.
- Lives in: `Content Engine/Trend Scout/`
- Cadence: daily (scheduled task, to be built)
- Sources: Reddit, Hacker News, X/Twitter, Product Hunt
- Output: 3 to 5 scouted items in the Inbox, each with why-it's-hot and a suggested angle and channel

The two are different on purpose. The Brain is *proactive and early* (you know it before the crowd). The Scout is *reactive and timely* (you ride what's already moving). Together they cover both halves of a content calendar.

---

## The Story Desk (the shared middle)

The most important idea in the whole system. A picked idea, from either engine, gets written **once** into a channel-agnostic **Story Brief**: the angle, the facts with dates, the arc, the hidden player, the forecast, the sources. No platform formatting yet.

Why this matters: it means the LinkedIn post, the video script, and the X thread all tell the *same* story with the *same* facts, and you only assemble the substance once. The adapters just repackage it.
- Lives in: `Content Engine/Story Desk/`
- Template: `Story Desk/_Story Brief Template.md`

---

## The channel adapters (templates)

Each channel is a template, exactly like the LinkedIn Master Template we perfected. One Story Brief runs through each and comes out formatted for that platform.

| Channel | Template | Status |
|---|---|---|
| LinkedIn post | `Futures Brain/Posts/00 The Master Template.md` | Done (gold standard: GE + Astera) |
| HeyGen video script | `Content Engine/Templates/Video Script (HeyGen).md` | Done (gold standard: GE + Astera) |
| X / Twitter thread | `Content Engine/Templates/X Thread.md` | To build (from GE + Astera) |
| Instagram Reel | later | Not in scope yet |
| YouTube | later | Not in scope yet |

**LinkedIn + HeyGen are the standard two outputs for every story** (see `01 New Story Pipeline.md`). The LinkedIn Master Template stays in the brain so the weekly task keeps working. The Templates folder here links to it and holds the new adapters.

---

## The review gate

Draft and review only. Every channel draft lands in `Content Engine/Ready to Ship/` under the story's name. You read, approve, and post by hand. Nothing publishes itself.

Why: your copy standard is exact, and you catch things a model won't. Once a channel has a real posting connector and you trust the output, we can automate that one channel. Until then, the gate stays.

---

## Scheduled tasks vs on-demand (your question, answered)

Three moving parts, and they are deliberately NOT one task:

1. **Weekly Brain Maintenance** -- exists. Keeps the research fresh, drafts the week's deep LinkedIn story. Leave it alone.
2. **Daily Trend Scout** -- new scheduled task. Different cadence (daily), different job (react, not curate), different sources. Bundling it into the weekly run would make both slower and harder to tune. Separate task = separate schedule and separate log.
3. **Repurposing (Brief -> all channels)** -- NOT scheduled. It is a set of templates you invoke **on demand**, once you have picked a winner ("turn the GE story into a HeyGen script and an X thread"). You don't want this on a timer; you want it when you've chosen what's worth spreading.

**Why multiple agents/tools:** each engine has its own rhythm, failure mode, and toolset (the scout uses web search across subreddits; the video adapter uses Higgsfield or HeyGen; Instagram, when added, uses Meta). And inside a single scout run, sub-agents can fan out, one per source, in parallel, then merge. Multiple small specialists beat one giant task that does everything slowly.

---

## Tools available (checked in the connector registry)

- **Higgsfield** -- connected. AI video and image generation. Phase-2 option to auto-render short videos, not just scripts.
- **HeyGen** -- has an MCP (motion-graphics product). Your avatar videos ("Haines") = we hand you a clean script, you upload. Manual for now.
- **Meta** -- connected. Can post to Instagram when we add that channel.
- **Reddit / Hacker News / X / Product Hunt** -- no dedicated connectors, so the scout uses web search. Works fine for surfacing viral threads.
- **LinkedIn / YouTube publishing** -- no connector, so those stay manual (fits the review-gate model).

---

## Build order

1. **This session:** the folder and system structure (this map, Story Desk, Templates scaffold, Trend Scout spec, Ready to Ship).
2. **Next:** build the HeyGen video-script template and the X-thread template from GE + Astera, so you get a script and a thread for those two now.
3. **Then:** stand up the Daily Trend Scout scheduled task.
4. **Later:** Instagram and YouTube adapters, and auto-render or auto-post where a connector exists.

---

## Folder map

```
Content Engine/
  00 System Map.md          <- you are here
  01 New Story Pipeline.md  <- the standing workflow: story -> LinkedIn post -> HeyGen script
  Story Desk/
    _README.md
    _Story Brief Template.md
  Templates/
    _README.md
    LinkedIn Post.md        <- pointer to Futures Brain Master Template
    Video Script (HeyGen).md
    X Thread.md
    Image Style.md          <- the engraved-gold image standard (GE is the gold standard)
    image-scripts/          <- reproducible render recipes (Pillow)
  Trend Scout/
    _README.md
    _Scout Spec.md
    Inbox/
      _README.md
  Ready to Ship/
    _README.md

Futures Brain/              <- the research layer, unchanged
  Theses/ Players/ Sources/ Signals/ Posts/ Style Guide.md
```

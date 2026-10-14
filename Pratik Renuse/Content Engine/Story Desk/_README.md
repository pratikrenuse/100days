# Story Desk

The shared middle of the engine. Every idea, from the Futures Brain or the Trend Scout, becomes **one Story Brief** here before any channel writing happens.

A Story Brief is **channel-agnostic**. It holds the substance: the angle, the facts with dates, the arc, the hidden player, the forecast, the sources. No LinkedIn formatting, no video script, no thread. Just the story, assembled once, correctly.

Then the channel adapters (`../Templates/`) each take this one brief and repackage it: a LinkedIn post, a HeyGen script, an X thread. Same story, same facts, three formats, one assembly.

## Flow
1. An idea is picked (from `../../Futures Brain/` or from `../Trend Scout/Inbox/`).
2. Copy `_Story Brief Template.md` into this folder, named for the story (e.g., `GE Vernova - Power is the Ceiling.md`).
3. Fill it: the facts, the arc, the player, the forecast, all dated and sourced.
4. Run it through each channel template, output to `../Ready to Ship/<story>/`.

## Rule
If a fact isn't in the brief with a date and a source, it doesn't go in any channel draft. The brief is the single source of truth for that story's substance.

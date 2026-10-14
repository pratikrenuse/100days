# 01 New Story Pipeline (standing procedure)

This is the locked, repeat-every-time workflow. When a new article or story is chosen (from the Futures Brain or the Trend Scout), produce two things from it, in this order, and save them together. Do not ask how to do this each time. It is all here.

**Input:** one story (a hidden player + the thesis it proves).
**Output, per story, into `Content Engine/Ready to Ship/<Story Name>/`:**
1. `LinkedIn.md` -- the LinkedIn post.
2. `HeyGen script.md` -- the video script (this is what Pratik uploads to HeyGen, aka "Haines").
3. `image` -- one concept image built to the locked art direction in `Templates/Image Style.md` (dark engraved-gold, one honest idea, no gimmicks, no stats). The GE piece is the gold standard.

## The two steps

**Step 1 -- LinkedIn post.** Write it using `Futures Brain/Posts/00 The Master Template.md` (the source of truth). SHORT and viral: ~1,000 to 1,700 characters, a scroll-stopping hook in the first two lines, ONE idea, at most 1 to 2 numbers, and an ending question that invites comments. Long data-dense posts died on LinkedIn; short and clear wins.

**Step 2 -- HeyGen script.** Adapt the SAME story into a spoken script using `Content Engine/Templates/Video Script (HeyGen).md`. The file is the script and nothing else. Default ~60s; note a 45s and 40s trim only if asked.

**Step 3 -- Concept image.** Build one image to `Content Engine/Templates/Image Style.md`: dark background, engraved metallic gold, ONE honest idea (usually the grand AI world depending on one small boring thing), a short witty caption, the Pratik Renuse wordmark. No gimmicky object-morphs, no stats, no "essay" chrome. Built in code (Pillow), not AI-generated. Reference recipe: `Templates/image-scripts/GE Vernova - render.py`.

All three draw from the same facts. Assemble the substance once, then shape it three ways.

---

## The locked patterns (this is what "don't make me repeat myself" means)

Every post and every script obeys all of these. They are already baked into the two templates; this is the short, non-negotiable summary so nothing gets lost.

**Write for a normal person who knows nothing about AI.** Zero jargon. Banned words: supercomputer, cluster, bandwidth, silicon, terabytes, interconnect, optics, retimer. If a topic is abstract, open it with one everyday analogy (an AI is like a brain, the magic is how fast the pieces talk). Plain, simple language, the way you'd explain it to a friend.

**Be human. Use the reaction elements.** This is the one that keeps getting asked for, so it is locked: sprinkle real, everyday reactions where the surprises land. "Yeah, a gas turbine.", "Cables!", "But get this.", "And you know what?", "Now here's the wild part.", "you basically can't buy one.", "Insane, right?", "Wild, right?" A few, at the genuine surprises, not on every line. Video should be even warmer than the post.

**Fixed beats, fresh words. Never reuse a signature line.** The structure repeats every time; the exact sentences never do. Rotate the hook, the reaction, the realization, the forecast opener, and the close on every single piece. Concretely: GE closes with "So here's my bet," so Astera must NOT; it closes "So here's where it's heading." A viewer or reader who sees two pieces should never feel it's a template with the nouns swapped.

**Flow, don't announce.** Don't open every section with a stock announcement ("here's the thing", "that's when it hit me", "here's where it gets strange", "the thought I can't shake"). One signal per piece at most; let the other sections flow from the line before, as a consequence or a continuation. Rotating one stock announcement into a fresher one is still the same crutch. The goal is one connected article, not a stack of "and now, this!" openers. A reaction inside a beat is fine; an announcement that opens a beat is not.

**One idea, barely any data (LinkedIn).** Keep at most 1 to 2 numbers in the whole post, woven in plainly. Cut the stat runs, bullet lists, and mechanism detail. Clarity and a single surprising point beat a full briefing. Save the deep data for a carousel or the video.

**Always end on a question.** Comments are worth ~15x a like on LinkedIn. Close every post with one easy, open question anyone can answer in a line.

**Say each point once.** No dragging one idea across two or three restated lines. Make it, move on.

**Concrete forecast, never vague futurism.** Ground the future in a real 2030 number or a named brain player (Ayar Labs, fusion, small nuclear). "You'll buy speed by the second" means nothing and gets cut.

**The shift close (the thesis, in plain words).** End on: today the winner is X, tomorrow it'll be Y, because [the timeless pattern]. That is the "bottleneck slides down the stack" idea said simply.

**Never make it about the writer.** No fake credentials, no humble-brags ("I build software for a living, so..."). "I" is only a guide pointing at the discovery.

**No em dashes. No emojis. No reader-commands** ("Start here", "Think about", "Picture this").

**Sanity-check every claim.** Nothing that breaks under a second of thought.

---

## Channel-specific reminders

**LinkedIn (`00 The Master Template.md`):** eight beats, `..` between turns, `-` bullets for the dated facts, heavy white space, ~2,000 to 2,200 characters, `source` field set to the project when the signup strip is used.

**HeyGen (`Video Script (HeyGen).md`):** the file is a title plus the spoken script, nothing else. No on-screen overlays, no delivery notes, no runtime block. HeyGen reads every word aloud, so pure spoken words only, no brackets. Numbers spoken naturally ("nearly ten times", not "10x"). Default ~60s, warmer than the post.

---

## Where it runs
- **Weekly, automatically:** the `futures-brain-weekly` scheduled task runs this pipeline on the week's best stories after it updates the brain.
- **On demand:** when a Trend Scout item or any article is picked, run this same pipeline on it.

Both paths produce the same two files per story in `Ready to Ship/<Story Name>/`. Nothing auto-publishes; Pratik reviews and posts.

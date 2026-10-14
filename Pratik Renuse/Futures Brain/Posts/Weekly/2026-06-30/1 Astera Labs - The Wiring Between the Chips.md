# Astera Labs - The Wiring Between the Chips

**Hidden player:** [[Astera Labs]]
**Thesis:** [[The Bottleneck Slides Down the Stack]]
**Format:** [[Post Format (LinkedIn Deepdive)]]
**Status:** Draft v3 (reworked to lead on the dated June 22 Nasdaq-100 catalyst)
**Date:** 2026-06-30
**Take-home (header only, not a line in the post):** when intelligence is cheap, the durable toll is on the bandwidth between chips, and a few unnameable firms collect it.

---

On June 22 an index fund somewhere was forced to buy a company you have never heard of.

Astera Labs joined the Nasdaq-100. Every fund that tracks that index now owns it, whether it wants to or not. And it makes none of the chips anyone talks about.

..

So I went looking for what it actually sells. It turns out to be the least glamorous thing in the building: the wiring between the chips.

The hard problem inside an AI cluster is not the math. It is feeding the math.

A single Blackwell GPU wants to talk to its neighbours at about 1.8 terabytes a second. Nvidia's next generation, Vera Rubin, doubles the rack-level link to 260 terabytes a second. A normal PC slot moves about 128 gigabytes a second, more than ten times slower than one chip needs. Wire thirty thousand of these together and a GPU left waiting on data is just a very expensive space heater.

..

And copper is quietly giving out. At these speeds an electrical cable holds the signal for barely a metre before it falls apart. Go further and you need light instead, lasers and glass bolted right next to the processor.

The connection is becoming worth more than the thing it connects.

..

Astera sits right on that seam. It makes the retimers and fabric switches that stitch a cluster into one machine.

What the market just did, dated:

- Joined the Nasdaq-100 on June 22, forcing index funds to hold it
- Two banks lifted their targets in a single day, BofA to 450 dollars from 240, Stifel to 460 from 260
- Q1 revenue of 308 million dollars, up 93% in a year
- More than 1,000 dollars of its silicon now rides on every accelerator in a rack

..

Where this goes, 10 and 20 years out:

We stop paying for compute and start paying for bandwidth. In a million-GPU data centre the scarce, defensible layer is the fabric moving the data, not the processor crunching it.

Own that fabric and you collect a toll on everything built on top, without ever shipping a chip. The booth is going up now, run by three or four firms most people cannot name. One step lower the toll turns to light, and a company called Ayar Labs is already standing there.

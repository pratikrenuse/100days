Ready to post. ~2,190 characters, within LinkedIn's 3,000 cap.
Story: Cerebras / AMD splitting one AI answer across two different machines. Thesis: [[The Bottleneck Slides Down the Stack]]. Catalyst: AMD and Cerebras disaggregated inference announcement, July 23, 2026. Facts: [[Players/Cerebras]], [[Theses/The Bottleneck Slides Down the Stack]], [[Latest Pull 2026-07-28]].

---

AMD just conceded that answering your question is two separate jobs, and that its own machines are good at only one of them.

Last Thursday it announced a partnership with Cerebras. AMD's systems read your question. Cerebras systems write the answer. One request, two entirely different computers, working as a relay.

..

The split exists because those two halves are opposites.

Reading a long prompt is bulk work. Thousands of words arrive together and get processed side by side. Raw horsepower wins.

Writing the reply cannot be rushed that way. The model produces one word, reads back what it just wrote, then produces the next. Nothing can be done ahead of time. It is a relay race with a single runner, and the delay on every handover is the whole cost.

..

Cerebras is the company that refused to make chips a normal size. Its processor is one unbroken slice of a wafer, roughly the width of a dinner plate. The model sits on that single surface, so between one word and the next, the data barely travels.

- AMD handles the reading, Cerebras handles the writing, presented as one system.
- Their joint modelling puts it at up to five times more words per second per unit of electricity than running it on Cerebras alone.
- It reaches customers through Cerebras Cloud in the second half of this year.

Both companies produced that number together. No one outside them has measured it.

..

Splitting a job across two specialists is what tends to happen just before one market becomes two. Electricity did it decades ago: the wholesale market stopped selling only power and started separately selling the promise that power shows up on the worst day of the year. Same wire, two prices, two sets of winners.

Inference is heading the same way. By 2030 nobody serious will buy compute as one number. Speed of thinking and speed of talking get priced apart, and they will run short at different moments.

Today it looks like one race for one chip. Tomorrow it is two races, and most people will still be watching the first one.

---

Optional hashtags (pick a few, or skip): #AI #Semiconductors #Infrastructure

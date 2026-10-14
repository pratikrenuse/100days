# AI as Agency: Mentor Guide
Hermes Buildathon Pune. Track 03. Base 164 points + uncapped overflow on the root parameter.

---

## 1. The mental model (read this once, everything else follows)

The track question: **if an agency were run by agents instead of humans, how would it work?**

A human agency has: a manager who plans and delegates, specialists who execute, handoff notes between them, institutional memory, a boss who can assign work without knowing how it gets done, and a way to know whether the work is getting better. The rubric scores exactly those seven things.

### The four loops (this is the part you said you wanted to understand)

Every parameter is really measuring one of four loops. If you can spot which loop is broken, you know what to tell the team.

**Loop 1: The delegation loop** (scored by Org structure, 5x)
Manager reads the request → plans subtasks → assigns to specialists → reviews their output → accepts or bounces back for revision. The loop test: give two structurally different requests. If the plan is identical both times, there is no loop, just a fixed pipeline. A bounce-back ("this draft is wrong, redo with X") is the visible proof the manager reviews, not just routes.

**Loop 2: The escalation loop** (scored inside the root parameter and Org L5)
Agent hits an edge case → instead of failing silently or hallucinating, it hands the task to a human WITH full context ("order 4412, missing 2 items, refund eligible per policy, but amount exceeds my limit, approve?"). Escalation by exception is what separates root L4 (human approves everything) from L5 (human touched only when needed). A restart is not an escalation. Context must travel with the handoff.

**Loop 3: The memory loop** (scored by Handoffs and memory, 2x)
Three layers, worth memorizing verbatim because the L5 definition is exactly this:
1. **Now**: the current task (this order, this candidate, this ticket)
2. **This user's past**: previous orders, previous disputes, earlier answers
3. **The business's rules**: refund policy, hiring rubric, escalation limits
The loop test: role-play a user across a handoff. If agent 2 re-asks what agent 1 already knew, the loop is broken at that seam.

**Loop 4: The improvement loop** (scored by Evals, 5x, and enabled by Observability, 7x)
Run fails → failure becomes a test case → prompt/agent gets versioned and changed → the test set is re-run → score demonstrably rises. This is the closed loop at Evals L5. Observability is what makes this loop possible at all: you cannot turn a failure into a test case if you cannot see what happened. That is why observability carries 7x, second only to the root.

**One sentence to give teams:** "Your product is the output (root, 80 pts). Everything else scores how visible, organized, and improvable the machine that produces it is."

---

## 2. Where the points are (mentor triage math)

points = (L − 1) × weight. L1 is always 0.

| Parameter | Weight | L2 | L3 | L4 | L5 (max) |
|---|---|---|---|---|---|
| Working output (root) | 20x | 20 | 40 | 60 | 80 |
| Observability | 7x | 7 | 14 | 21 | 28 |
| Org structure | 5x | 5 | 10 | 15 | 20 |
| Evals | 5x | 5 | 10 | 15 | 20 |
| Handoffs and memory | 2x | 2 | 4 | 6 | 8 |
| Cost and latency | 1x | 1 | 2 | 3 | 4 |
| Management UI | 1x | 1 | 2 | 3 | 4 |

**What one hour of mentoring buys, ranked:**
1. Root up one level = **20 pts**. Nothing else comes close. Always fix this first.
2. Observability L1→L3 = **14 pts**, and it is cheap: any surface where you can pick a past run and step through it. An hour of work for most teams.
3. Evals L1→L3 = **10 pts** for one hour: a file of 15 to 25 test inputs with expected outcomes, run before and after changes, scores written down.
4. Org L2→L4 = **10 pts**: add a manager that actually plans and reviews.
5. Memory + Cost + UI together max at **16 pts**. Never let a team spend hours here while the root sits at L3.

**On top of the 164:**
- **Overflow**: past root L5, +20 pts per additional real task completed autonomously during judging. A team at L5 should queue up real tasks to run live in front of the judge.
- **Power-ups**: +25 each. Natural fits for agency crews: Convex (state store for memory and logs), ElevenLabs (voice interface to the crew), Linkup (research specialist's search tool). Three easy power-ups = 75 pts, nearly half the base.
- **Cross-track bonus**: launch post + signups earn Virality points at half weight, capped at 50. A team done early should post their demo.

---

## 3. Level-up playbook, parameter by parameter

The mentor's job in one line per visit: diagnose the current level, name the ONE move to the next level, leave.

### Working output (root, 20x). The only parameter that can zero the day.
- **L1→L2**: make the agents actually touch a system. One tool call that writes something real, anywhere. "Talking about the task" is L1 no matter how good the conversation looks.
- **L2→L3**: shrink the declared job until success is repeatable. Mock the surfaces: Google Sheet as order DB, Airtable as ATS, sandbox Gmail. Get one usable artifact out reliably (a scorecard, a filed ticket, an updated row). Target 50 to 70% success over 10 runs.
- **L3→L4**: **swap one mocked surface for a real one** and put a human approval gate before anything final moves. This is the single most important move in the track: staged surfaces hard-cap the root at L3, no matter how good the system is. Real = a system a paying customer could use tomorrow: a real Gmail inbox, a real support queue (free Freshdesk on a real store), a real ATS, a real live site, a real repo.
- **L4→L5**: remove the human from the happy path, keep them for exceptions only, and hit 85%+ success across 3+ repeated runs. The path is narrowing scope, not adding capability: cut the task types the crew fails at until what remains is reliable. Escalations must carry full context.
- **At judging**: have 3 to 5 fresh real tasks queued. Each one completed live = +20 overflow.

### Org structure (5x)
- **L1→L2**: split the monolith prompt into 2 to 3 agents with distinct jobs.
- **L2→L3**: add a named manager that routes to named specialists. Fixed routing table is fine at this level.
- **L3→L4**: the manager must PLAN per request (different requests produce different subtask plans) and REVIEW outputs (at least one visible bounce-back with revision notes in the trace). Tell teams: "your trace needs to show a rejection."
- **L4→L5**: manager spawns a specialist that did not exist at kickoff, stuck agents escalate with the concrete blocker. Honestly out of reach for most teams in 8 hours. Do not push anyone here unless everything else is L4+.
- **Trap to warn about**: agent headcount is not the score. Five agents in a fixed chain is L2. The mentor test is a task that should skip a step: does the pipeline run it anyway?

### Observability (7x). The cheapest big points on the board.
- **L1→L2**: stop printing, start appending JSONL: one line per agent step (agent, input, output, tokens, timestamp).
- **L2→L3**: any UI where a mentor names a past run and the team opens it and walks it step by step. A simple HTML page over the JSONL file counts. Langfuse free tier counts. Tool-agnostic, the logo does not matter.
- **L3→L4**: trace as a tree (who called whom), token and dollar cost attributed per step, filter by agent or task. The mentor test: "which agent spent the most this morning?" answered from the tool, not memory.
- **L4→L5**: side-by-side diff of two runs, alerts that actually fired, search across runs. Production-grade. Only for teams cruising.
- **Hermes note**: if the team builds on Hermes as harness, its session traces already get them most of L3. Point this out; many teams will not realize they already have the artifact.

### Evals (5x)
- **L1→L2**: after each change, re-run the same handful of inputs and look. (Do not aim here, pass through it.)
- **L2→L3**: a NAMED set: 15 to 25 inputs with expected outcomes in a file. Run manually before/after each prompt change. Write scores down: "v1 passed 14/20, v2 passed 17/20." That sentence, with the file open, is L3.
- **L3→L4**: script it, run on every change, and a drop actually blocks the change. A shell script that exits nonzero counts as CI-style if it truly gates.
- **L4→L5**: every real failure auto-appends to the eval set, prompts in git, pass rate chart rising across versions. The demo line: "here is Tuesday's failure as test case #23."

### Handoffs and memory (2x)
- **The one move that matters, L3→L4**: pass a structured context object (user, task state, history so far) with every handoff so the next agent never re-asks. Add a lookup of this user's past interactions.
- **L4→L5**: add the third layer, business rules (refund policy, rubric, limits) applied visibly in decisions. Only 2 more points, so only if time is spare.

### Cost and latency (1x)
- The lower tier governs: worse of time and cost sets the level. Teams at L2 here usually have a looping agent; fixing the loop is worth more on the root than here. One cheap tip: know your per-run cost from the trace. If a team cannot answer "what does one task cost?", they lose points on two parameters at once.

### Management UI (1x)
- Max 4 points. Tell every team: do not build this before 15:30. A functional dashboard where a PM could pause an agent and edit a prompt (L3, 2 pts) is the sensible ceiling. L5 is a live test with a volunteer the team does not choose; do not promise it.

---

## 4. Questions you will get, with answers

**"Our crew works on Airtable / Google Sheets / sandbox Gmail. Is that okay?"**
Okay for L3, capped there. To score L4+, at least one surface must be real: a system a paying customer could use tomorrow. Cheapest real surfaces in 8 hours: a real Gmail inbox, a real Slack workspace, a real deployed site, a real repo, a free-tier Freshdesk/Zendesk on a real micro-business. The clock-friendly move: build on mocks until 13:00, swap one surface real in the afternoon.

**"How many agents should we have?"**
Wrong question. Two agents with a manager that plans and reviews beats six in a fixed chain. The judge will give a task that should skip a step and watch whether your pipeline runs it anyway.

**"Does the framework matter? CrewAI vs LangGraph vs Hermes subagents?"**
No. Every parameter is tool-agnostic. Judges look at traces and behavior, not logos. Remember eligibility though: Hermes must be either the coding partner (keep session receipts) or the harness your product runs on.

**"If a human approves every step, do we lose points?"**
No, that is exactly root L4 (60 pts). L5 removes the human from the happy path only. Do not delete your approval gate until you are hitting 85%+ across repeated runs; a hallucinated action in front of a judge costs far more than the gate.

**"We do not have money for an observability tool."**
Free is fine, homemade is fine. JSONL log = L2. Simple viewer over it = L3. The question is never "what tool," it is "can the mentor pick yesterday's failed run and watch you walk it."

**"What is an eval set in an 8-hour hackathon?"**
A file. 15 to 25 real inputs with agreed expected outcomes. Run it before and after each prompt change, record the pass count. One hour of work, 10 points.

**"How will they check memory?"**
The mentor role-plays a user across a handoff. If the second agent re-asks anything the first agent knew, you are L3 at best. Pass a context object at every handoff.

**"How do they measure success rate?"**
Live re-runs during judging. L5 needs 85%+ across 3+ repeated runs, and every extra real task completed autonomously in front of the judge pays +20 overflow. Queue real tasks for the demo.

**"Should we build an admin dashboard?"**
It is 1x, max 4 points. Only after the root is L4 and observability is L3+. Most teams that build a pretty dashboard early are burning root-parameter time.

**"Can our agency product also score virality points?"**
Yes: cross-track bonus at half weight, capped at 50. Post the demo clip, collect signups on a landing page. Also stack power-ups: Convex, Linkup, ElevenLabs fit agent crews naturally, +25 each.

**"Our agents complete the task but nothing changes in any system."**
Then nothing was completed. Root L1. Output must LAND: a row written, a ticket updated, an email sent, a commit pushed. This is the first thing to check at every desk.

**"What should we demo?"**
Not a recording, not slides. One fresh real task, triggered live, completed end to end, then open the trace and show the delegation loop. Then run a second task to prove repeatability.

---

## 5. Worked example: one team through the day

**Team "InboxCrew": a support agency for a real micro-business.** One teammate's friend runs a small D2C candle brand on Shopify with a Gmail support inbox. The declared job: triage support email, resolve refund and order-status queries, escalate the rest.

**10:30, wedge lock.** Buyer: the store owner. Surface: her actual support inbox. Job: 3 ticket types only (order status, refund request, everything else = escalate). Crew: Manager, Triage specialist, Resolver specialist. Hermes as harness runs the manager.

**11:45, first loop closes. Root L2 → L3 (staged).** Orders live in a Google Sheet copy of real data, replies write to a sandbox Gmail. Triage classifies, Resolver drafts, a filed reply lands in the sandbox. Success 6/10 runs. Mentor note at this desk: "You are L3-capped on mocks. Which surface goes real this afternoon?"

**13:00 checkpoint.** Root L3 (40), Org L3 manager + fixed routing (10), Observability L2 JSONL (7), Evals L1 (0), Memory L3 within-task only (4), Cost L3 (2), UI L1 (0). **63 points.** Alive, and the afternoon plan is obvious from the table: root, observability, evals, in that order.

**14:30, the two big swaps. Root L3 → L4.** Real Gmail connected with owner's consent, real order data via Shopify read access. Human gate: every outgoing reply needs the owner's tap in Slack before sending. Meanwhile one teammate builds the run viewer over the JSONL (Obs L2 → L3, +7) and another writes 20 labeled test emails as an eval set, runs v1 vs v2 (Evals L1 → L3, +10).

**15:30, manager becomes real. Org L3 → L4.** The manager now plans per email (a refund-plus-address-change email produces a two-subtask plan) and bounces a bad draft back with notes, visible in the trace. Handoffs now carry a context object: customer, order, history (Memory L3 → L4, +2).

**16:15, the L5 push on root only.** Scope cut: refunds above policy limit auto-escalate to the owner with full context instead of being attempted. On the remaining happy path: 9/10, then 3 clean repeat runs. Human gate removed for order-status replies, kept for refunds as the escalation exception. Root L4 → L5 (+20).

**Judging.** Root L5 (80), Org L4 (15), Obs L3 (14), Evals L3 (10), Memory L4 (6), Cost L4, 2 min and $0.30 per ticket, read off the trace (3), UI L2 (1). **129 base.** Two fresh real emails resolved live during judging: **+40 overflow**. Convex storing state + Linkup used by Resolver for policy lookups: **+50 power-ups**. Demo clip posted at 15:00 pulled 40 signups on a waitlist page: **cross-track bonus**. Comfortably over 220.

**The compare:** the same team stopping at 13:00-state plus a pretty dashboard would have finished near 70. The delta came from three mentor pushes: one real surface, one visible trace, one eval file.

---

## 6. The five lines to repeat all day

1. "Does anything actually LAND in a system? Show me the row, the ticket, the email."
2. "Mocks cap you at L3 on the big one. Which surface goes real by 15:00?"
3. "Show me a past run, step by step. If you can't see it, the judge can't score it."
4. "Where is your eval file? 20 cases, one hour, 10 points."
5. "Don't remove the human until you hit 85% three times in a row. Escalate with context, don't fail silently."

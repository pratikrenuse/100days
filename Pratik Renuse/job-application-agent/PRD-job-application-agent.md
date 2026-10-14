# Daily Job Application Agent: Rough PRD (v0.1)

Owner: Pratik Renuse
Date: 6 June 2026
Status: Draft for review before build

---

## 1. One-line goal

A small agent that runs once every day, searches jobs across LinkedIn, Indeed, and other sources, scores them against my profile, tailors a resume for the good ones, logs everything, and sends me one daily digest with ready-to-apply links. I click apply.

## 2. Reality check (read this first)

Three things shape every decision below.

First, fully automatic submitting of applications on LinkedIn and Indeed breaks their terms of service. Both ban accounts for bot activity, and Indeed caps how many applications you can send per day. So this PRD is built around "review then apply": the agent does all the heavy work and hands me a digest, and I do the final click. That keeps my real accounts safe and is the version worth building first. We can revisit auto-submit later for the narrow cases where it is allowed.

Second, the agent itself (Hermes Agent by Nous Research) is free and open source. The only thing that can cost money is the AI model it calls. We can keep that at $0 using free model tiers, so the realistic monthly cost is $0 to about $1. Details in section 6.

Third, "search all jobs on all websites" is the ambition, but in practice we pull from a few reliable sources first (public job feeds and one or two integrations), prove it works, then add more. Trying to scrape everything on day one is how projects break and accounts get flagged.

## 3. Scope

Decided: no LinkedIn at all. The agent never logs into any of my accounts on any site. It only reads public job postings and hands me apply links. The daily digest comes by email.

### In scope (Version 1, the one we build)

The agent runs daily on a schedule and does the following. It reads my saved profile and search criteria. It pulls fresh job postings from public sources (Indeed and other public job feeds, no logged-in scraping). It scores each posting against my criteria and keeps only strong matches. It generates a tailored resume and a short cover note for each kept job. It logs every match to a Google Sheet so nothing is lost. It emails me one daily digest listing the matches with direct apply links and the tailored files attached or linked. I open the link and apply on the site myself.

### Out of scope (for now)

Auto-submitting applications without me. Solving captchas or logging into accounts as a bot. Paid job-board APIs. Anything that needs my LinkedIn password stored in a script.

### Possible Version 2 (later, optional)

Auto-submit only on boards that explicitly permit it, with strict daily caps and a kill switch. Interview tracking. Follow-up reminders.

## 4. What the agent needs from me (one-time setup)

A base resume (the LaTeX or Word file it will tailor from). A short profile: target roles, seniority, locations or remote preference, must-have and nice-to-have skills, salary floor, and any hard filters (visa, industry, company size). A few "deal breaker" rules so it can reject bad matches fast.

## 5. Architecture (how it fits together)

The whole thing is six simple parts, all free:

| Part | Job | Tool | Cost |
|---|---|---|---|
| Brain | Runs the agent loop, makes decisions | Hermes Agent (open source) | $0 |
| Model | Reads jobs, scores, writes resumes | Free cloud tier (Gemini Flash / Groq) or local Ollama | $0 |
| Job data | Fetches postings | Public job feeds + Composio free tier integration | $0 |
| Memory / log | Stores every match and status | Google Sheets | $0 |
| Scheduler | Triggers it daily | Your computer's built-in scheduler (cron / Task Scheduler) | $0 |
| Notify | Sends the daily digest | Telegram bot or email | $0 |

The flow each day: scheduler wakes Hermes, Hermes reads my profile, calls the job sources, scores results with the model, tailors resumes for matches, writes them to Google Sheets, and pushes a digest to Telegram or email. Then it sleeps until tomorrow.

## 6. Cost breakdown (the important part)

Target: under $1 to $2 per month. Here is where money could leak and how we keep it near zero.

The agent software is free. Storage in Google Sheets is free. The scheduler on your own machine is free. Notifications via Telegram or email are free. So the only variable is the AI model.

Three model options, all viable:

Option A, free cloud tiers (recommended): Google Gemini Flash and Groq both have generous free daily limits. Tailoring roughly ten resumes a day plus scoring sits comfortably inside those free limits. Monthly cost: $0.

Option B, local model with Ollama: runs on your own machine, truly unlimited, no API key. Needs about 16GB or more of RAM. One-time setup, then $0 forever.

Option C, cheap paid API (GPT-4o-mini or similar): if we ever outgrow free tiers. Estimated load is about ten jobs a day, thirty days a month, a few thousand tokens each. That works out to roughly $0.30 to $0.80 per month. Still inside budget.

Job data: Composio's free tier gives 20,000 tool calls per month, far more than a daily run needs. Public job feeds cost nothing. So job data stays at $0.

Bottom line: the realistic monthly bill is $0 with free tiers, and at most about $1 if we switch to a cheap paid model. Nothing here requires a credit card to start.

## 7. Daily output (what I actually see)

One message per day, for example: "Found 47 postings, 6 strong matches. Tailored resumes ready. [Job 1: title, company, location, match score, apply link]..." with the tailored resume for each. Total time for me: a few minutes to skim and click.

## 8. Risks and how we handle them

Account bans: avoided by not auto-submitting and not scraping logged-in pages. The agent works from public postings and hands me the apply step.

Source breakage: job sites change their pages often. We start with stable public feeds and one integration, so one source breaking does not kill the whole agent.

Low-quality matches: handled by tight criteria and a scoring step, plus my review before anything is sent.

Cost creep: capped by using free tiers first and setting a hard daily job limit (for example, tailor at most ten resumes a day).

Privacy: my resume and profile stay on my machine and in my own Google Sheet. No passwords stored in scripts.

## 9. Success criteria

It runs unattended every day for a week without me touching it. Each run produces a digest I would actually act on. At least a few genuinely relevant matches per week. Monthly cost stays under $2.

## 10. Build plan (high level, detailed steps come next)

1. Confirm this PRD and the two open decisions below.
2. Install and run the Hermes setup wizard; connect a free model provider.
3. Give Hermes my profile, base resume, and search criteria.
4. Connect one job source and one storage sheet; test a single run by hand.
5. Add resume tailoring and the daily digest.
6. Put it on a daily schedule and watch it for a few days.
7. Add more job sources once the core is stable.

## 11. Open decisions for Pratik

Which model option do you want to start with: free cloud tier (easiest, $0), local Ollama ($0 but needs a capable machine), or cheap paid API (about $1/month, most reliable)? My recommendation is the free cloud tier to start.

Daily digest: decided, by email.

What are your target roles, locations or remote preference, and any hard filters? I need these to set up the scoring step.

# Answers: one question per page. "short" is the direct answer AI tools quote (40 to 90 words).
# "body" uses a tiny markup: "## " heading, "- " bullet, blank line between paragraphs.
# Facts about Pratik come only from verified profile figures. No em dashes anywhere.

TOPICS = {
    "ai-marketing": ("AI in marketing", "How marketing teams actually use AI, what to automate first and what still needs a person."),
    "ai-search": ("AI search and AEO", "How to show up when buyers ask ChatGPT, Claude, Perplexity and Google AI Overviews."),
    "growth-from-zero": ("Growth from zero", "Getting first customers, launching, and the numbers that decide whether growth is healthy."),
    "marketing-leadership": ("Marketing leadership", "Hiring, team shape and how marketing heads should run the function."),
    "events-and-speaking": ("Events and speaking", "For organisers planning talks, keynotes and hands-on AI sessions."),
}

ANSWERS = [
{
"slug": "how-should-a-small-marketing-team-start-using-ai",
"topic": "ai-marketing",
"q": "How should a small marketing team start using AI?",
"short": "Start with one repeated task that eats hours every week, such as turning one long piece of content into posts, emails and ad copy. Give one person a week to build a working version with Claude or ChatGPT, measure the hours saved, then move to the next task. Small teams win by stacking a few reliable workflows, not by trying every new tool.",
"body": """## Pick the task, not the tool

Most teams start by comparing tools. That is the wrong order. List the work your team repeats every week and note how long each item takes. The best first candidates are repetitive, text heavy and easy to check: repurposing content, first drafts of ad variations, summarising sales calls, cleaning lead lists.

## Build one workflow properly

Write down the inputs, the steps and what a good output looks like. Turn that into a saved prompt or a small project in Claude with your brand guidelines attached. Run it on real work for a week. Fix what breaks.

## Measure and then expand

Track hours saved and output quality against what the team produced before. Once one workflow is reliable, move to the next. After three or four, the team usually has a few hours back every week, and that time goes into strategy and testing.

## What to avoid

- Rolling out ten tools at once with nobody owning them
- Publishing AI output without a human edit
- Automating work nobody has defined clearly yet""",
"related": ["what-marketing-work-should-you-automate-first-with-ai", "how-to-train-your-marketing-team-on-ai", "claude-vs-chatgpt-for-marketing"],
},
{
"slug": "what-marketing-work-should-you-automate-first-with-ai",
"topic": "ai-marketing",
"q": "What marketing work should you automate first with AI?",
"short": "Automate work that is repetitive, rules based and easy to check: repurposing content across channels, first drafts of ad and email variations, research summaries, call and meeting notes, lead list cleaning and weekly reporting. Keep positioning, final creative judgement, pricing and anything customer facing that carries legal or brand risk with a person.",
"body": """## Good first candidates

- Repurposing one article, video or talk into posts, emails and short scripts
- Writing ten ad or subject line variations for a person to pick from
- Summarising customer interviews, reviews and sales calls into themes
- Pulling weekly numbers into a short written report
- Cleaning, deduplicating and enriching lead lists

## Keep these with a person

- Positioning and the core message of the brand
- Final approval of anything that goes public
- Pricing, offers and legal claims
- Relationships with partners, press and key customers

## A simple test

If you can describe the task in a short checklist and a junior person could check the result in two minutes, it is a good candidate. If the task needs taste, context only you have, or a judgement call with real downside, use AI to prepare the options and keep the decision.""",
"related": ["how-should-a-small-marketing-team-start-using-ai", "what-is-an-ai-agent-in-marketing", "how-to-measure-the-roi-of-ai-in-marketing"],
},
{
"slug": "claude-vs-chatgpt-for-marketing",
"topic": "ai-marketing",
"q": "Claude or ChatGPT: which is better for marketing work?",
"short": "Both are strong, and most marketers end up using both. In my work Claude is better for long writing in a consistent brand voice, working through large documents and building small websites and tools. ChatGPT is handy for quick everyday questions, images and its wide range of built in features. Pick one as the team default, set it up with your brand context, and test the other on specific tasks.",
"body": """## Where each one tends to fit

These tools change every few months, so treat this as a working view rather than a ranking.

- Long form writing and editing in a set voice: Claude usually holds the tone better
- Reading long reports, transcripts and spreadsheets: both work, Claude handles large files well
- Building a landing page, a portfolio site or a small internal tool: Claude is what I use and teach in my Claude 101 sessions
- Quick answers, brainstorming and image generation: ChatGPT is very convenient

## What matters more than the tool

The output depends far more on what you give the model than on which model it is. Save your positioning, audience, tone rules and a few examples of great past work as project files. Every new chat then starts from your brand instead of from zero.

## How to decide for your team

Run the same three real tasks through both for a week. Score the results on quality and editing time. Make the winner the default, so prompts and setups can be shared across the team.""",
"related": ["can-a-marketer-build-a-website-with-claude-without-coding", "how-should-a-small-marketing-team-start-using-ai", "how-to-train-your-marketing-team-on-ai"],
},
{
"slug": "can-a-marketer-build-a-website-with-claude-without-coding",
"topic": "ai-marketing",
"q": "Can a marketer build a website with Claude without knowing how to code?",
"short": "Yes. A marketer can build and publish a real website with Claude in about an hour: describe the site, give Claude your content and a reference design, then put the files on GitHub and deploy them free on Vercel. In my Claude 101 masterclass with GrowthX, 100 attendees did exactly this live in a 90 minute session.",
"body": """## What you need

- A Claude account
- A free GitHub account to store the files
- A free Vercel account to put the site online
- Your content: a resume, a LinkedIn export or a product description, plus a site you like as a reference

## How it works

You upload your content and the reference to Claude and describe the site you want. Claude writes the page. You look at it, ask for changes in plain English, and repeat until it looks right. Then you save the files to a GitHub repository and connect that repository to Vercel, which gives you a live link in under a minute. A form that saves leads can be added with Supabase.

## What people get wrong

- Asking for everything in one prompt instead of improving the page step by step
- Skipping the reference site, which is what makes the design look intentional
- Not checking the page on a phone before sharing it

The full step by step version is in the playbook linked below.""",
"related": ["claude-vs-chatgpt-for-marketing", "how-should-a-small-marketing-team-start-using-ai", "how-to-run-a-hands-on-ai-workshop-for-a-marketing-team"],
"playbook": "ship-a-website-with-claude-in-one-hour",
},
{
"slug": "what-is-an-ai-agent-in-marketing",
"topic": "ai-marketing",
"q": "What is an AI agent in marketing?",
"short": "An AI agent in marketing is software that takes a goal, works through several steps on its own and uses tools to finish the job, for example researching a topic, drafting posts, checking them against brand rules and putting them in a queue for approval. A chatbot answers one prompt. An agent runs a workflow, usually with a person approving the final output.",
"body": """## Agent versus chatbot

A chatbot waits for your prompt and replies. An agent is given a job, decides the steps, calls tools such as search, a spreadsheet or your CMS, checks its own work and hands back a result. Most useful marketing agents today are narrow: they do one workflow well.

## Examples that work today

- A content agent that turns a new blog post into LinkedIn posts and a newsletter draft every week
- A research agent that tracks competitors and sends a short weekly summary
- A reporting agent that pulls numbers from ads and analytics into a plain English update
- A lead agent that enriches new sign ups and flags the best ones for sales

## Keep a person in the loop

Agents make confident mistakes. The setups that last have an approval step before anything goes public, clear rules written down, and a log of what the agent did so someone can check it.""",
"related": ["what-marketing-work-should-you-automate-first-with-ai", "how-to-measure-the-roi-of-ai-in-marketing", "how-should-a-small-marketing-team-start-using-ai"],
"playbook": "set-up-an-ai-content-agent-for-your-brand",
},
{
"slug": "how-to-train-your-marketing-team-on-ai",
"topic": "ai-marketing",
"q": "How do you train a marketing team on AI?",
"short": "Train on the team's own work, not on generic demos. Run a hands-on session where everyone builds something real, such as a landing page or a content workflow, then give each person one weekly task to automate and a shared place to save prompts that work. Review results together after two weeks. People learn AI by shipping with it, not by watching slides.",
"body": """## Why most AI training does not stick

A tour of features is forgotten by Monday. What sticks is the moment someone builds a real thing for their own job and sees it work.

## A format that works

- One hands-on session of 90 minutes to half a day, where every person leaves with something live
- Each person picks one recurring task to rebuild with AI over the next two weeks
- A shared library of prompts and project setups the team can copy
- A short review where people show what worked and what did not

## What the session should cover

Setting up a project with brand context, writing clear instructions, checking output, and one end to end build such as a page, an email sequence or a research summary. I run this format for teams and communities; my Claude 101 session with GrowthX sold out all 100 seats.""",
"related": ["how-to-run-a-hands-on-ai-workshop-for-a-marketing-team", "how-should-a-small-marketing-team-start-using-ai", "claude-vs-chatgpt-for-marketing"],
},
{
"slug": "how-to-measure-the-roi-of-ai-in-marketing",
"topic": "ai-marketing",
"q": "How do you measure the ROI of AI in marketing?",
"short": "Measure three things against a baseline from before you used AI: hours saved per workflow, output volume or speed, and the business result the work feeds, such as leads, conversion rate or cost per acquisition. Time saved only counts if it goes into work that moves revenue. Subtract tool costs and the time spent checking AI output.",
"body": """## Set the baseline first

Before you change a workflow, write down how long it takes, how much it produces and what it costs. Without that, every AI result looks like a win.

## The three layers

- Efficiency: hours saved per week on each workflow
- Output: more tests run, more content shipped, faster turnaround
- Outcome: the metric the work exists for, such as qualified leads, conversion rate or customer acquisition cost

## The honest costs

Include subscriptions, setup time and the time a person spends reviewing and fixing output. A workflow that saves five hours but needs three hours of checking is a small win, not a big one.

## A useful rule

Report AI impact in the same units leadership already uses. Hours saved is interesting. Lower cost per lead or more tests per month is what gets budget.""",
"related": ["what-marketing-work-should-you-automate-first-with-ai", "what-is-a-good-ltv-to-cac-ratio", "what-is-an-ai-agent-in-marketing"],
},
{
"slug": "what-is-answer-engine-optimization",
"topic": "ai-search",
"q": "What is answer engine optimization (AEO)?",
"short": "Answer engine optimization, or AEO, is the work of getting your brand and content quoted inside AI answers from tools like ChatGPT, Claude, Perplexity and Google AI Overviews. It builds on SEO but focuses on clear direct answers, structured data, being mentioned on trusted third party sites, and making pages easy for AI crawlers to read.",
"body": """## How it differs from SEO

SEO aims for a ranking and a click. AEO aims for a mention or citation inside a generated answer, which may never send a click at all. The two overlap a lot: pages that rank well are more likely to be used as sources.

## What it involves

- Pages that answer one question clearly in the first few sentences
- Structured data such as FAQ, Article, Person and Organization markup
- Content that AI crawlers can read without running JavaScript
- Clear authorship and real experience behind the content
- Mentions of your brand on sites AI tools trust, such as Reddit, YouTube, LinkedIn and industry publications

## Why it matters now

Buyers increasingly ask an assistant instead of searching. If your brand is not in the handful of names an assistant gives, you are not in the shortlist.""",
"related": ["how-to-get-your-brand-mentioned-by-chatgpt", "what-should-a-cmo-do-about-ai-search", "how-should-a-small-marketing-team-start-using-ai"],
},
{
"slug": "how-to-get-your-brand-mentioned-by-chatgpt",
"topic": "ai-search",
"q": "How do you get your brand mentioned by ChatGPT and other AI assistants?",
"short": "Be the clearest answer to specific questions your buyers ask, and get mentioned on the sites assistants trust. In practice: publish pages that answer one question each in plain language, add structured data, keep pages readable without JavaScript, make sure Bing indexes your site, and earn mentions on Reddit, YouTube, LinkedIn and industry sites. There is no way to pay for a mention.",
"body": """## On your own site

- One question per page, with a direct answer in the first paragraph
- Real experience and numbers only you can provide
- FAQ, Article and Person or Organization structured data
- A robots.txt that allows AI search crawlers
- Fresh dates on pages you keep up to date

## Off your site

Research across AI platforms keeps finding the same pattern: assistants cite community and third party sources far more than brand websites. Genuine answers on Reddit, talks on YouTube, articles on LinkedIn, podcast appearances and listings on respected industry sites all add up.

## Check where you stand

Write down 15 to 20 questions a buyer would ask an assistant about your category. Run them in ChatGPT, Perplexity, Claude and Google AI Mode once a month and note who gets named. That list tells you which pages to write next.""",
"related": ["what-is-answer-engine-optimization", "what-should-a-cmo-do-about-ai-search", "what-marketing-work-should-you-automate-first-with-ai"],
},
{
"slug": "what-should-a-cmo-do-about-ai-search",
"topic": "ai-search",
"q": "What should a CMO do about AI search taking traffic from Google?",
"short": "Treat AI answers as a new shelf your brand needs to be on. Audit which questions buyers ask assistants in your category, see who gets named, publish clear answer pages backed by real expertise, make sure Bing and AI crawlers can index the site, and shift some budget toward third party mentions. Measure brand mentions in AI answers alongside organic clicks.",
"body": """## What is changing

AI Overviews now sit on top of a large share of Google searches, and many buyers go straight to ChatGPT or Perplexity. Some of the clicks that used to reach your site now end inside the answer.

## A practical plan for a marketing head

- Audit: list the 20 questions your buyers ask and check who the assistants name today
- Content: one strong page per question, written by someone with real experience
- Technical: structured data, crawlable HTML, Bing Webmaster Tools set up, AI crawlers allowed
- Off site: PR, community answers, partner content and talks that put your name on trusted sites
- Measurement: track AI mentions monthly next to organic traffic and branded search

## What not to do

Do not mass produce thin pages to cover every possible query. Google has run several updates in 2026 against scaled low value content, and assistants pick sources that look credible.""",
"related": ["what-is-answer-engine-optimization", "how-to-get-your-brand-mentioned-by-chatgpt", "how-to-measure-the-roi-of-ai-in-marketing"],
},
{
"slug": "how-to-get-your-first-1000-customers-d2c",
"topic": "growth-from-zero",
"q": "How do you get your first 1,000 customers for a D2C brand?",
"short": "Pick one tight audience, find where they already gather, and win them one channel at a time. For the first 1,000 customers, founder led selling, communities, partnerships with trusted names and a sharp launch moment usually beat broad paid ads. Use paid only once you know which message converts, and track cost per customer from day one.",
"body": """## Narrow before you scale

The first 1,000 customers rarely come from everyone. They come from a group with a sharp problem you solve better than anyone. At VU, that meant serious skiers and snowboarders, and the brand ended up used by Olympians. At Infento, it meant parents who cared about creative, hands-on play.

## Channels that work early

- Founder led outreach and conversations, which also teach you the message
- Communities and clubs where your audience already spends time
- Partnerships with people the audience trusts, such as coaches, creators or retailers
- A launch moment with a deadline, such as a crowdfunding campaign or a limited first batch

## When to add paid ads

Once a message has converted in conversations and organic posts, test it with a small paid budget. Track cost per customer and repeat purchase from the start, because cheap first orders with no repeat buyers is not growth.""",
"related": ["how-to-plan-a-kickstarter-campaign", "what-is-a-good-ltv-to-cac-ratio", "when-should-a-startup-hire-its-first-marketer"],
},
{
"slug": "how-to-plan-a-kickstarter-campaign",
"topic": "growth-from-zero",
"q": "How do you plan a successful Kickstarter campaign?",
"short": "Most of a Kickstarter campaign is won before launch. Build an email list of people who said they want the product, test your video and reward tiers on them, line up press and partners for launch day, and aim to hit a large share of the goal in the first 48 hours so the platform and the press pick it up. I led the Infento campaign, which raised $848K and became the most funded STEM project on Kickstarter in 2018.",
"body": """## Before launch

- Build a list of interested backers through ads, content and communities, and keep them warm
- Test the video, headline and reward prices on that list before going live
- Prepare press, creators and partners so coverage lands in launch week
- Decide your early bird offer and how many units it covers

## Launch week

Momentum is everything. A campaign that funds fast gets more visibility on the platform and a better story for press. Send your whole list on day one, post updates often and reply to every comment.

## During the campaign

Add stretch goals and new updates to give people reasons to share again. Keep paid ads running only while the cost per backer works.

## After the campaign

Plan fulfilment and communication carefully. Backers who get clear updates become your first loyal customers and your best word of mouth.""",
"related": ["how-to-get-your-first-1000-customers-d2c", "what-is-a-good-ltv-to-cac-ratio", "how-to-enter-a-new-country-market"],
"playbook": "launch-a-kickstarter-campaign",
},
{
"slug": "what-is-a-good-ltv-to-cac-ratio",
"topic": "growth-from-zero",
"q": "What is a good LTV to CAC ratio?",
"short": "A common rule of thumb is at least 3 to 1: a customer should bring in three times what it cost to acquire them over their lifetime. Below that, growth tends to burn cash. Well above it can mean you are underinvesting in growth. What matters just as much is how fast you earn back the acquisition cost, and whether LTV is measured on real retention rather than hopes.",
"body": """## The two numbers

- LTV, lifetime value: the gross margin a customer brings over the whole relationship
- CAC, customer acquisition cost: total sales and marketing spend divided by new customers in the same period

## Reading the ratio

- Under 1 to 1: you lose money on every customer
- Around 3 to 1: a common target for healthy growth
- Far above 3 to 1: you may be able to spend more on growth

## Common mistakes

- Using revenue instead of gross margin for LTV
- Counting only ad spend in CAC and leaving out salaries, tools and agencies
- Projecting lifetime value from a few months of data

## Payback period

Also track how many months it takes to earn back CAC. A great ratio with a long payback can still run a young company out of cash.""",
"related": ["how-to-get-your-first-1000-customers-d2c", "how-to-measure-the-roi-of-ai-in-marketing", "when-should-a-startup-hire-its-first-marketer"],
},
{
"slug": "how-to-enter-a-new-country-market",
"topic": "growth-from-zero",
"q": "How should a startup test a new country market?",
"short": "Test before you commit. Run small paid and organic experiments in the new country with localised landing pages in the local language, measure cost per lead and conversion, and talk to the first customers there. Expand only where the numbers hold up. At Bueno I built online marketing across 28 countries, and the markets that worked were the ones the data picked, not the ones we guessed.",
"body": """## Start with a cheap signal

Translate one landing page properly, run a small ad test and a few community posts, and compare cost per lead and conversion with your home market. A few weeks of data beats months of desk research.

## Localise more than the language

- Prices in local currency and local payment methods
- Examples, testimonials and references that make sense locally
- Legal and tax details specific to the country
- Customer support hours and channels people expect there

## Decide with rules

Set the thresholds before the test: the cost per customer and conversion rate a market must hit to get more budget. That keeps the decision honest.

## Common traps

Copying the home market ads word for word, judging a market on a week of data, and spreading budget across too many countries at once.""",
"related": ["how-to-get-your-first-1000-customers-d2c", "what-is-a-good-ltv-to-cac-ratio", "fractional-cmo-vs-agency-vs-full-time-marketer"],
},
{
"slug": "when-should-a-startup-hire-its-first-marketer",
"topic": "marketing-leadership",
"q": "When should a startup hire its first marketer?",
"short": "Hire your first marketer once the founders have found at least one channel or message that brings customers, and need someone to run and scale it. Hiring before that usually means asking one person to find product market fit through marketing, which rarely works. Before that point, founder led growth plus a part time advisor or fractional lead is often the better choice.",
"body": """## Signs you are ready

- Customers come from something repeatable, not only from the founders' network
- You know your best customer and the message that lands with them
- The founders spend too much time running campaigns instead of the business

## Who to hire first

Early on you need a builder who can do the work, not a manager of agencies. Look for someone who has taken a product from zero before and can write, run ads, set up tracking and talk to customers.

## Alternatives before the hire

- A fractional marketing lead a few days a month
- An advisor who helps the founders set strategy and avoid expensive mistakes
- Specialist freelancers for specific jobs like paid ads or design

## A mistake to avoid

Hiring a senior head of marketing to build a team before anything is working. It is expensive and slow when what you need is learning fast.""",
"related": ["fractional-cmo-vs-agency-vs-full-time-marketer", "how-to-get-your-first-1000-customers-d2c", "what-is-a-good-ltv-to-cac-ratio"],
},
{
"slug": "fractional-cmo-vs-agency-vs-full-time-marketer",
"topic": "marketing-leadership",
"q": "Fractional CMO, agency or full-time marketer: which should a startup choose?",
"short": "Choose a fractional CMO when you need senior strategy and someone to build the system but cannot justify a full-time executive. Choose an agency when the strategy is clear and you need execution capacity in one channel. Choose a full-time marketer when a repeatable channel exists and needs someone every day. Many startups combine a fractional lead with freelancers or one hire.",
"body": """## Fractional CMO

Best for: setting strategy, positioning, picking channels, hiring and building the first systems. You get senior judgement a few days a month. The risk is limited hours, so it works best with someone in the team to execute.

## Agency

Best for: running a defined channel such as paid social or SEO at volume. The risk is that agencies optimise what they are measured on, and they rarely own the whole funnel or the strategy.

## Full-time marketer

Best for: running and improving channels that already work, every day. The risk is hiring too early, before you know what that person should focus on.

## A common setup that works

A fractional lead sets the direction and builds the measurement, one hands-on marketer runs it daily, and specialists or AI tools fill the gaps.""",
"related": ["when-should-a-startup-hire-its-first-marketer", "how-to-get-your-first-1000-customers-d2c", "how-to-measure-the-roi-of-ai-in-marketing"],
},
{
"slug": "how-to-run-a-hands-on-ai-workshop-for-a-marketing-team",
"topic": "events-and-speaking",
"q": "How do you run a hands-on AI workshop for a marketing team or community?",
"short": "Keep theory to the first ten minutes and spend the rest building one real thing, such as a website, a content workflow or an agent. Send setup instructions in advance so accounts are ready, cap the group so everyone gets help, plan a demo slot where people share their screens, and end with something live. In my Claude 101 session, 100 people shipped a site in 90 minutes.",
"body": """## Before the session

- Send a short setup list a few days ahead: accounts to create, files to bring
- Pick one build everyone completes, with a clear finished state
- Prepare a fallback for people whose setup breaks

## The run of show that works

- 10 minutes: what we build and why it matters
- 35 to 60 minutes: live build, with the host building on screen while attendees follow
- 15 minutes: volunteers demo what they built and get feedback
- Last part: publish it live, then questions

## For organisers

Check wifi and power for every seat, ask attendees to bring laptops, and plan for one helper per 20 to 25 people in person. Online, cameras on and a chat moderator make a big difference.

## What the room should leave with

Something live they made themselves, and the steps to do it again alone. That is what people talk about the next week.""",
"related": ["keynote-or-workshop-which-should-your-event-book", "how-to-train-your-marketing-team-on-ai", "can-a-marketer-build-a-website-with-claude-without-coding"],
},
{
"slug": "keynote-or-workshop-which-should-your-event-book",
"topic": "events-and-speaking",
"q": "Should your event book an AI keynote or a hands-on AI workshop?",
"short": "Book a keynote when you want to inspire and align a large audience on where AI is taking their work, in 30 to 45 minutes. Book a hands-on workshop when you want people to leave able to do something new, with a smaller group, laptops and 90 minutes or more. Many events pair a short keynote on the main stage with a workshop for a smaller group later.",
"body": """## Keynote

- Audience: large, mixed roles, often a main stage
- Length: 20 to 45 minutes
- Outcome: a shared view of what is changing and what to do about it
- Needs: a stage, a screen, good audio

## Hands-on workshop

- Audience: up to about 100 online or a smaller room in person
- Length: 90 minutes to half a day
- Outcome: every attendee builds something real they keep
- Needs: laptops, reliable wifi, accounts set up in advance

## How to choose

Start from the result you want for attendees. Research on event planning in 2026 keeps pointing the same way: organisers now pick speakers for relevance to the audience more than for a famous name. Ask what your audience should be able to do or decide after the session, and book the format that delivers that.""",
"related": ["how-to-run-a-hands-on-ai-workshop-for-a-marketing-team", "how-to-brief-a-speaker-for-your-event", "how-to-train-your-marketing-team-on-ai"],
},
{
"slug": "how-to-brief-a-speaker-for-your-event",
"topic": "events-and-speaking",
"q": "How do you brief a speaker for your event?",
"short": "Give the speaker the audience, the goal and the logistics. That means who will be in the room and what they already know, what you want them to think or do afterwards, the session format and length, the sessions before and after theirs, and the technical setup. A one page brief sent three to four weeks before the event is enough for most talks.",
"body": """## What to include

- Audience: roles, seniority, size and how familiar they are with the topic
- Goal: the one thing attendees should take away or be able to do
- Format: keynote, panel, fireside or hands-on, plus exact length including questions
- Context: the theme of the event and what other speakers cover
- Logistics: date, venue or platform, arrival time, tech check, screen ratio, microphone type
- Promotion: what you need from the speaker, such as a photo, bio and a post

## Ask the speaker for

- A short outline two weeks before
- Any setup needs, such as laptops for attendees or internet access
- A version of the bio sized for your programme

## After the event

Share attendee feedback with the speaker. Good speakers use it, and it makes the next booking easier for both sides.""",
"related": ["keynote-or-workshop-which-should-your-event-book", "how-to-run-a-hands-on-ai-workshop-for-a-marketing-team", "how-to-train-your-marketing-team-on-ai"],
},
]

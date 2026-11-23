# Writer 4: answers built from Pratik's own writing in Notion (blogs, drafts, LinkedIn posts, principles),
# with consulting and mentoring notes as supporting proof. Plus rewrites of the 19 existing answers.

ANSWERS_EXTRA = [
{
"slug": "how-to-lower-cpc-with-bullseye-targeting",
"topic": "performance-marketing",
"q": "How do you lower cost per click on Facebook and Instagram ads?",
"short": "Untangle the targeting first. In one campaign I ran, several audiences were mixed together, so I split them and used bullseye targeting: one ad written for one audience. Cost per click fell by 50%. When each ad speaks to one group, people find it more relevant and the platform charges less per click. Only once the targeting is clean should you start testing creatives.",
"body": """## What jumbled targeting looks like

Most expensive accounts I audit have the same problem. One ad set holds three or four different groups of people, one generic ad tries to speak to all of them, and the platform is left to guess. The ad feels vague to everyone, so fewer people click, and each click costs more.

## The bullseye method

- List every audience you are really trying to reach, one per line
- Give each audience its own ad set, so you can see its numbers on its own
- Write one ad for each audience, in the words that group uses
- Start with the smallest, most precise group in the centre and widen ring by ring only when the centre is working
- Pause rings that stay expensive instead of letting them drag the average up

In one campaign I ran this way, cost per click dropped by half. Nothing else changed: same budget, same product, cleaner targeting and ads that matched it.

## Fix targeting before creative

My rule when results are poor: check the audience first. If the audience is right and the numbers are still weak, the creative is the problem, and that is when I A/B test creatives on the same targeting. Testing creatives on a messy audience tells you nothing.

## Where this has worked for me

At Le Patron, a cycling clothing brand, the targeting combined interest in menswear with interest in pro road cycling, which was far narrower and cheaper than either interest alone. For Font Neuve, a French holiday resort that lost its Dutch guests during COVID, layered targeting found French guests without wasting budget, and the founder later wrote that I saved their season. At Sweek, moving country budgets to performance and cleaning up channels helped cut acquisition cost by more than 50%.""",
"related": ["how-to-audit-a-facebook-ads-account", "what-kpis-to-check-first-in-a-new-paid-campaign", "should-you-exclude-mobile-app-placements-from-retargeting"],
},
{
"slug": "how-to-present-marketing-updates-to-the-board",
"topic": "marketing-leadership",
"q": "How should a marketing head present updates to the board?",
"short": "Summarise everything into a few digestible pieces, then cluster them so the board sees themes instead of a task list. I structure updates in three parts: what happened, where we stand and what comes next. Every growth number carries three things: the percentage change, the absolute change and the time period. That stops a big percentage on a small base from looking like more than it is.",
"body": """## Start by cutting

My own note on this, written while preparing board updates in 2022, has two lines: summarise all the updates into digestible pieces, then cluster and organise them. Everything else follows from that. A board does not need every campaign. It needs to know what changed, why, and what you will do about it.

## Cluster by theme

Group the work into three to five themes such as acquisition, conversion, retention and brand. Under each theme give one result, one learning and one next step. If an item does not fit a theme, it probably does not belong in the update.

## Past, present, future

- Past: what we did since the last meeting and what we learned
- Present: where the key numbers stand today, against the plan
- Future: the next quarter's priorities, budget and the decisions you need from the board

## Report numbers honestly

I picked up a simple rule from Brian Balfour's writing on authentic growth and have used it ever since. Every growth number gets three parts:

- The percentage change
- The absolute change
- The time period it took

A channel that grew 300% sounds great until you add that it went from 10 leads to 40 over a full quarter. The board will find that out anyway. Saying it first builds trust.

## Small habits that help

When I rehearse founders before demo days, I push them to use concrete units people can picture, such as hours saved, instead of a pile of percentages. I also tell founders to send short monthly investor updates long before they raise, so the board already knows the story when the big ask comes.""",
"related": ["how-to-present-a-marketing-plan-past-present-future", "what-should-a-startup-marketing-plan-include", "what-is-a-growth-model-and-why-do-investors-value-it"],
},
{
"slug": "why-your-first-1000-customers-are-worth-more-than-later-ones",
"topic": "growth-from-zero",
"q": "Why are a startup's first 1,000 customers worth more than later ones?",
"short": "Because each happy early customer keeps bringing in others for years. My working model is that the first 1,000 customers are really 1,000 times 10. If they stay for 10 to 20 years and each one tells at least 10 people, they bring in far more than their own orders. Jeff Bezos made a similar point in Amazon's shareholder letters about building customers for decades. Treat early customers as your first marketing channel.",
"body": """## The model

I wrote this down as a note to myself: the first 1,000 are not just 1,000 customers. They are a function of 1,000 times 10. If those first customers are happy, they build word of mouth. If they stay for 10 to 20 years, each one has the potential to bring at least 10 more.

Helping startups get from zero to their first 1,000 paying customers is the core of my mentoring, and this is why I push founders to care so much about that first group.

## What it changes in practice

- Overserve early customers. Reply fast, fix their problems personally, and ask what they would tell a friend.
- Do not judge the first 1,000 only on acquisition cost. A slightly more expensive customer who refers three friends is the cheaper one.
- Build the referral habit early, while the group is small enough to talk to one by one.
- Collect their exact words. Early customers give you the language your later ads will use.

## How I have seen it play out

At Infento, Kickstarter backers who got clear and frequent updates became some of the brand's loudest supporters after the campaign. At VU, a small circle of professional skiers and snowboarders, including Olympians, gave the brand proof that no ad could buy.

## Measure it

Ask new customers how they heard about you, and run a short survey on why existing customers refer others. In one fitness membership startup I mentored, the referral survey showed a large share of members had joined purely through friends. That changed where the founders put their time.""",
"related": ["how-to-get-your-first-1000-customers-d2c", "what-is-an-activation-threshold-churn-reversal-point", "what-is-a-good-ltv-to-cac-ratio"],
},
{
"slug": "what-is-an-activation-threshold-churn-reversal-point",
"topic": "growth-from-zero",
"q": "What is an activation threshold, and how do you find yours?",
"short": "An activation threshold is the point after which a new user becomes much more likely to stay. Facebook famously found that users who added 7 friends in 10 days tended to stick. Clubhouse used a similar idea and prompted new users to follow at least 25 people. I call it the churn reversal point. Find the action and the number for your product, then design onboarding to push every new user past it.",
"body": """## Two well known examples

I first wrote about this in 2021 when comparing Facebook and Clubhouse. Facebook found that a user who added 7 friends within 10 days was much more likely to keep using the product. Clubhouse appeared to use the same logic: its onboarding told new users to try following at least 25 people, because a feed with too few voices felt empty.

Both are activation thresholds. My early note called them North Star Metrics, which was loose. A North Star Metric describes the value you deliver across the whole business. An activation threshold describes the moment a single new user is likely to stay.

## How to find yours

- Start with the question I ask founders: when do we know a customer has reached the point where they experience the value of the product?
- Pick two or three candidate actions, such as items saved, friends invited or reports created
- Compare users who stayed with users who left, and count how many times each group did the action in their first days
- Look for the count where retention jumps, and test it again on the next cohort

## Design onboarding around it

Once you have the action and the number, every onboarding screen and email should push new users toward it. Clubhouse put the number right in the prompt. You can show progress, suggest the next step, or do part of it for the user.

## Where it sits in the funnel

In the funnel template I use with founders, activation is the step where someone starts the sign up, and retention is measured at two months. The threshold sits between them: it is what turns a new sign up into someone who is still there at month two.""",
"related": ["what-is-a-growth-model-and-why-do-investors-value-it", "why-your-first-1000-customers-are-worth-more-than-later-ones", "what-kpis-to-check-first-in-a-new-paid-campaign"],
},
{
"slug": "cold-outreach-mistakes-that-lose-a-warm-lead",
"topic": "growth-from-zero",
"q": "What cold outreach mistakes make people stop replying?",
"short": "The worst ones happen after the person says yes. Someone once messaged me for help, I agreed and expected a calendar link. Instead I got a templated thank you for reaching out, an invitation to a beta list and a handoff to a colleague. Three mistakes in one reply: it showed automation, it switched the ask, and it made a personal request impersonal. I did not respond.",
"body": """## What happened

In late 2021 a founder reached out asking for my feedback on his product. He seemed genuine and I wanted to help, so I said yes. I expected a reply with a calendar link. What came back was a message that started by thanking me for reaching out, invited me to join their beta list, and said a colleague would follow up with me.

His intentions were right. The approach was not.

## The three mistakes

- A templated opening. I did not reach out to him, he reached out to me. The thank you line told me at once that I was receiving an automated sequence.
- A switched ask. He asked for feedback. The reply tried to enrol me in a beta list. That reads as bait and switch, even when nobody means it.
- A handoff. The request came from him personally. Passing me to someone else after I agreed made the original message feel like a tactic.

## What to do instead

- Write the follow up by hand once someone says yes, even if the first message came from a tool
- Deliver exactly what you asked for, and only then mention anything else
- Keep the same person in the conversation until the first meeting is done
- Make the next step easy: one link, one time, one clear purpose

## The rule I follow

Never mislead in outreach, not even slightly. Automation is fine for finding people and sending the first note. Once a real person engages, they deserve a real reply. I apply the same rule to my own writing: no stock phrases that make a reader feel processed.""",
"related": ["how-to-ask-a-busy-expert-for-help", "how-to-write-marketing-copy-that-does-not-sound-like-ai", "how-to-get-your-first-1000-customers-d2c"],
},
{
"slug": "what-should-a-startup-marketing-plan-include",
"topic": "marketing-leadership",
"q": "What should a startup marketing plan include?",
"short": "A useful startup marketing plan moves from understanding the customer to proving channels to building loops that compound. My working list has 21 workstreams: customer research and personas, core messaging and value proposition, a problem solution fit survey, a funnel hypothesis, paid and organic launches, channel analysis by impact and effort, management dashboards, NPS and product market fit surveys, community, referral and product led growth loops.",
"body": """## Why it needs to be thorough

When I wrote a full plan for a client in 2022, I looked at how others structure plans before starting. The approach of Michael Taylor, a marketer who once mentored me, stood out because it covered every channel. That thoroughness matters: a plan that has clearly thought about everything earns trust before a single campaign runs. The list below is my own working version.

## Understand the customer

- Customer research
- Target market personas
- Target market needs and wants
- A target market survey toward problem solution fit

## Shape the message

- Core messaging
- Value proposition and USPs
- Competitor ad analysis
- Website optimisation

## Test and prove channels

- A marketing funnel hypothesis
- Paid channel target groups
- Launch paid and organic marketing
- Bring the first leads into the funnel
- Channel analysis with an impact and effort score
- Marketing funnel validation

## Run and report

- Management team dashboards
- Customer stories and testimonials
- Customer interviews to validate the value proposition
- NPS and a product market fit survey, using the Sean Ellis question of how disappointed people would be without the product

## Build what compounds

- Community building
- Referral strategy
- Product led growth loops

## How to use the list

Not every startup needs all 21 at once. Order them by stage. A pre-launch team lives in the first two groups. A team with steady leads should be in the last three. The list is a checklist to make sure nothing important is forgotten, not a promise to do everything this quarter.""",
"related": ["how-to-present-a-marketing-plan-past-present-future", "how-to-prioritise-marketing-tasks-by-impact-and-effort", "how-to-present-marketing-updates-to-the-board"],
},
{
"slug": "how-to-present-a-marketing-plan-past-present-future",
"topic": "marketing-leadership",
"q": "How do you structure a marketing plan presentation for founders or a client?",
"short": "Split it into three parts: the past, the present and the future. The past shows what was done and learned, the present shows where numbers and channels stand, and the future shows next steps and budget. When I built a plan for a client after months of advising, I first tried a month by month log of past work, then cut it because it buried the point.",
"body": """## How I built one

One morning in 2022 I sat down to write a marketing plan for a client I had been advising. I did not start from a blank page. Many people have written good plans, so I pulled the best parts from a few of them. Then I realised I had already given this client a table of contents earlier, and most of its categories were things we had since implemented. That became the spine.

I split the presentation into three parts: the past, the present and the future.

## The past

What we did, what worked and what did not. My first draft listed the advising months one by one. Once I started writing, it was clearly too much. I cut it and structured the past by what was done, step by step, instead of by date.

## The present

- Where the key numbers stand, with the percentage change, the absolute change and the time period
- Which channels are profitable and which are not
- What we know now about the target audience that we did not know before

## The future

- The next priorities, ranked by impact and effort
- The budget and how it is split
- The decisions the founders need to make

## Keep the client in control

A note I wrote to myself years ago still holds: clients do not like to give up control, so always show that they are in control of the decisions. A plan presented as options with a clear recommendation lands better than a plan presented as a verdict.

## What to leave out

Anything that does not help the reader decide. Month by month detail, every ad variation and long tool lists can sit in an appendix. The main deck should be readable in ten minutes.""",
"related": ["what-should-a-startup-marketing-plan-include", "how-to-present-marketing-updates-to-the-board", "fractional-cmo-vs-agency-vs-full-time-marketer"],
},
{
"slug": "what-is-practical-blogging",
"topic": "growth-from-zero",
"q": "What is practical blogging, and why should a post end with a task?",
"short": "Practical blogging means writing posts that make the reader do something while they read, then asking them to share or teach what they made. The idea comes from how people learn: reading is the weakest way, doing is stronger, and teaching is strongest. A post that ends with a task gets used, remembered and passed on, which a normal blog post rarely does.",
"body": """## The idea

I wrote this down as a content principle years ago. The highest learning comes from doing, and even higher than that is teaching. So instead of writing a blog like everyone else, write an interactive one where people learn by doing. At the end, ask them to share or teach what they created, so they learn again by teaching others.

## How a practical post is built

- One outcome the reader will have by the end, stated in the first lines
- Steps the reader does while reading, not just reads about
- A time box for each step, so the task feels doable
- A finished state they can see, such as a page, a sheet or a draft
- A last step that asks them to share what they made or explain it to someone

## Examples from my own work

My post on learning anything in a weekend gives a full timed plan: each step has an action and the hours it takes. My Claude 101 session with GrowthX follows the same rule live: all 100 seats sold, and the session is built around attendees shipping their own site rather than watching mine. The free tools on pratikrenuse.com come from the same thinking: a page you use is worth more than a page you read.

## Why it helps marketing

A post people act on gets bookmarked, shared and linked, because it gave them something real. Readers who made something with your help remember who helped. And the share step at the end turns readers into distribution.

## Start small

Take your best performing post and add one task with a clear finished state. Add a final line asking readers to post what they made. Measure saves and shares before and after.""",
"related": ["how-to-learn-a-marketing-skill-in-a-weekend", "how-to-write-a-hook-people-read", "how-to-train-your-marketing-team-on-ai"],
},
{
"slug": "how-to-learn-a-marketing-skill-in-a-weekend",
"topic": "career-growth",
"q": "Can you learn a new marketing skill in a weekend?",
"short": "You can get to useful, if you plan about 20 focused hours. The method comes from Josh Kaufman's book The First 20 Hours: break the skill into small parts, learn just enough to correct yourself, remove whatever stops you practising, and commit to the full 20 hours so early frustration does not stop you. I wrote a full weekend plan with this method, and it works for skills like GA4 or Meta Ads.",
"body": """## The four steps

- Deconstruct the skill. Decide exactly what you want to be able to do at the end, then break it into smaller pieces.
- Learn enough to self correct. Read or watch just enough that you can practise and notice your own mistakes.
- Remove barriers to practice. Close the distractions and have the tools ready before you start.
- Pre-commit to 20 hours. The first hours are the most frustrating. Committing up front gets you past that point.

## My weekend plan

In my 2023 post I applied this to learning guitar over one weekend: about 22 hours across eight steps, from Friday evening to Sunday. Each step had one action and a fixed number of hours, such as learning the basic chords, practising chord changes, learning a strumming pattern, playing simple songs and ending with a short review by a teacher. The structure is what matters, and it transfers to marketing skills.

## The same plan for a marketing skill

Take Meta Ads as an example:

- Friday: define the goal, such as launching one working campaign with tracking. Learn the account structure.
- Saturday: set up the pixel and events, build one campaign with two audiences and two ads, and learn to read the reporting columns.
- Sunday: run a small budget, read the results, fix one thing and write down what you learned.
- Last step: ask someone experienced for a 30 minute review of your setup.

## Tips that make it stick

- Set a specific goal you can check at the end of the weekend
- Spend the most time on the few parts that matter most
- Practise a little every day after the weekend, even for a few minutes
- Get feedback early from someone who has done it before
- Expect the first hours to feel slow; that is normal

I still use this approach whenever a new tool shows up in my work, including the AI tools I now teach.""",
"related": ["what-is-practical-blogging", "how-to-keep-up-with-the-exponential-growth-of-ai", "how-to-set-goals-and-review-your-week-as-a-marketer"],
},
{
"slug": "how-to-keep-up-with-the-exponential-growth-of-ai",
"topic": "ai-marketing",
"q": "How do you keep up with the exponential growth of AI without feeling overwhelmed?",
"short": "Stop trying to track every release and build a steady habit instead. Our brains read growth as linear, so exponential change in AI feels like a wave about to swallow us. I wrote about this in 2023 and my answer has not changed: do not get engulfed by the wave, enjoy the tide. In practice that means one real build a week, a few trusted sources, and judging tools by the time they save on your actual work.",
"body": """## Two quick tests of intuition

Fold a sheet of paper in half, then again, 50 times. If the paper is about 0.004 inches thick, the stack after 50 folds would be roughly 70 million miles tall, about three quarters of the way from the Earth to the Sun.

Now pick one offer for the next 30 days. Option A pays you $1,000 a day. Option B pays you one cent on day one and doubles it every day after that. Option A gives you $30,000. Option B pays about $5.4 million on day 30 alone, and about $10.7 million in total.

Most people guess far too low on both.

## Why we get it wrong

Our ancestors lived in a mostly linear world. Whoever spent twice as long collecting berries had twice as many. Whoever hunted two mammoths ate for twice as long. Nobody needed a feel for doubling. Today AI tools, the internet and information all move on curves our brains were not built to follow, and that creates a lot of fear of missing out, especially among high achievers.

## What I do instead of chasing every release

- Build one real thing a week with AI for my own work, because building teaches faster than reading
- Follow a few sources I trust and ignore the rest
- Judge every new tool by one question: does it save time on work I already do?
- Teach what I learn, which is how my Claude 101 sessions started

## What this looks like in marketing

My current focus is functional AI: tools that cut through noise and speed up growth. At the Coditas AI showcase in Pune on 27 June 2026 I spoke about AI lead generation built this way, one useful tool at a time. None of it required keeping up with everything. It required picking one problem and shipping.""",
"related": ["what-is-functional-ai-in-marketing", "how-should-a-small-marketing-team-start-using-ai", "how-to-learn-a-marketing-skill-in-a-weekend"],
},
{
"slug": "what-to-do-first-as-a-new-hire",
"topic": "career-growth",
"q": "What should you do first when you start a new job?",
"short": "Get to know people before you try to prove yourself. The first thing I tell the graduates I coach is to let everyone know you exist: your team, the teams around you and the wider company. I use a simple framework, meet one new person a week, and keep it going. The relationships you build in the first months decide how work feels every day after that.",
"body": """## The question I hear most

Over years of coaching graduates from schools such as Harvard, Oxford, LSE and HEC Paris, I kept hearing the same question in different forms:

- What is your advice on how I should start my first week?
- How should I introduce myself to my manager?
- What am I supposed to do on the first day?
- I feel weirdly nervous about my first day.

It is an important question, but not one to be afraid of.

## My own first weeks

When I joined Bayer in 2017 to work on a global senior executive event, I had never had a proper conversation with a senior leader at a company that size. All I wanted at first was to watch how they talked, how they decided and how they treated people. That was a good first goal, and it still is.

## Why relationships come first

The people around you decide how you feel about work day in and day out. You will spend a big part of your life with them. Trust built early makes everything later easier: getting help, getting feedback and getting your ideas heard.

## The framework: meet one new person a week

- Make a list of the people in your team, the teams you work with and leaders you want to learn from
- Prioritise the list: who you will work with most, who knows how things really work
- Write a short meeting request you can reuse and personalise
- Send one invite a week and protect that slot
- After each meeting, note one specific positive quality about the person
- Also note what they need, and look for a way to help

## Keep it going

One person a week sounds small. Over a year it adds up to around 50 real conversations. It also works for new marketing leaders joining a startup: the first weeks are for listening, not for announcing a plan.""",
"related": ["how-to-ask-a-busy-expert-for-help", "how-to-answer-marketing-interview-questions-with-star", "how-to-set-goals-and-review-your-week-as-a-marketer"],
},
{
"slug": "does-good-work-need-hustle",
"topic": "career-growth",
"q": "Do you need to hustle all the time to do great work?",
"short": "No. I learned this late, but constant hustle is bad for you and for your work. Many of the most productive people built breaks into their day: Albert Einstein was known for his naps, and Quentin Tarantino has described a writing routine with a daily break. I now fix how many hours a day go to work, protect quiet time before work starts, and judge the week by output, not by hours.",
"body": """## What changed my mind

For years I treated being busy as proof of progress. In 2021 I wrote a short note to myself that started with the words I realised this quite late: work does not need to be hustle. If you are always hustling, it is not good for you, and it is not good for your work either.

The people whose work I admire most often work in bursts with real breaks in between. Einstein's naps are well known. Tarantino has talked about a writing process that includes a daily break. Rest is part of how they produce, not a reward for producing.

## How I structure my work now

- A fixed number of work hours per day, decided in advance
- A clear objective for every activity: why am I doing this, and how does it help?
- An hour of meditation before work, which sets the tone for the day
- The 80/20 lens on everything: which 20% of tasks bring 80% of the result?
- A short reflection every day and a longer one every week

## For founders and team leads

Teams copy what leaders do, not what they say. If the founder answers messages at midnight, the team learns that is expected. A few things that help:

- Judge people by the outcomes they deliver, not by hours online
- Put focus time on the calendar and defend it
- Plan the hard thinking for the hours when people are sharpest
- Make breaks normal by taking them yourself

## Consistency beats intensity

One line from my illustration series sums it up: you do not have to be extreme, just consistent. Steady weeks compound. Heroic sprints followed by long recoveries do not.""",
"related": ["how-to-set-goals-and-review-your-week-as-a-marketer", "how-to-keep-up-with-the-exponential-growth-of-ai", "what-to-do-first-as-a-new-hire"],
},
{
"slug": "what-is-a-growth-model-and-why-do-investors-value-it",
"topic": "growth-from-zero",
"q": "What is a growth model, and why do CEOs and investors value it?",
"short": "A growth model is a simple equation that shows which few numbers drive your revenue and how much growth you get when you move each one. CEOs and investors value it because it turns growth from a hope into a plan they can check. Building growth models is the part of my work I enjoy most, and it is also what leadership teams and investors ask me for most.",
"body": """## Why it matters

When I wrote down what I enjoy and what people pay me for, one item sat at the top of both lists: the growth model. I enjoy building it, C-level teams value it, and investors value it. It is the clearest way to show that growth is predictable and repeatable instead of lucky.

## What goes into one

I start by mapping the customer path in bare bones: hears about the product, clicks an ad or post, lands on the site, starts sign up, finishes and pays, has the first wow moment, uses it again, is still there after two months, tells friends, and they sign up. Each step gives a lever:

- Topline awareness
- Activation, meaning starting the sign up
- Conversion from activation to paying
- Retention after two months
- A wow factor usage number, such as repeat use or high value orders
- Supply growth, for marketplaces
- NPS, as a signal for referrals

## The test for each lever

For every lever I ask one question: can I go from 10 to 10,000 in business growth by moving this number? Levers that cannot pass that test are not where the plan should focus.

## The prerequisites

My note on this reads: a predictable, repeatable model needs data and experimentation, and it rests on three things multiplied together: organic or referral growth, a real magic moment in the product, and enough market size. If any one of those is near zero, the model will not hold.

## How I build it with founders

In mentoring programmes I follow three steps: agree the North Star Metric, map the customer path, then assemble the levers into one equation. The model then feeds four engines: content, paid ads, user feedback and product development. Each engine gets experiments tied to the lever it moves.""",
"related": ["what-is-an-activation-threshold-churn-reversal-point", "how-to-present-marketing-updates-to-the-board", "what-is-a-good-ltv-to-cac-ratio"],
},
{
"slug": "best-books-for-startup-marketers-and-founders",
"topic": "career-growth",
"q": "What books should a startup marketer or founder read?",
"short": "My list has 20 books in four groups. For marketing and growth: Obviously Awesome, Contagious, Hacking Growth, Building a StoryBrand and Made to Stick. For leadership: Principles, The Hard Thing About Hard Things, Measure What Matters, Radical Candor and Thinking in Bets. For strategy: Zero to One, The Lean Startup, Play Bigger, The Cold Start Problem and Hooked. The last group is on inner growth.",
"body": """## Marketing and growth

- Obviously Awesome by April Dunford, for positioning a product so the right buyers get it fast
- Contagious by Jonah Berger, on why some ideas and products spread
- Hacking Growth by Sean Ellis and Morgan Brown, on running growth as a process of experiments
- Building a StoryBrand by Donald Miller, for putting the customer at the centre of your message
- Made to Stick by Chip and Dan Heath, on making ideas easy to remember

## Leadership and decisions

- Principles by Ray Dalio, on writing down how you decide
- The Hard Thing About Hard Things by Ben Horowitz, on the parts of building a company nobody prepares you for
- Measure What Matters by John Doerr, on OKRs
- Radical Candor by Kim Scott, on honest feedback that still respects people
- Thinking in Bets by Annie Duke, on judging decisions separately from outcomes

## Startups and strategy

- Zero to One by Peter Thiel
- The Lean Startup by Eric Ries
- Play Bigger, on category design
- The Cold Start Problem by Andrew Chen, on network effects
- Hooked by Nir Eyal, on habit forming products

## Mindfulness and inner growth

- The Art of Living by William Hart, on Vipassana meditation as taught by S. N. Goenka
- The Daily Stoic by Ryan Holiday
- Stillness Is the Key by Ryan Holiday
- The Power of Now by Eckhart Tolle
- The Discourse Summaries by S. N. Goenka

## How I would read them

Do not read all 20 in a row. Pick one book from each group and read them side by side, so a marketing idea, a leadership idea and a strategy idea meet in the same month. If you only have time for one, start with Obviously Awesome. Positioning is the problem I see most often when mentoring founders, and it sits under every other marketing decision.

The inner growth group is not a side note for me. Daily meditation is part of how I work, and these books shaped it.""",
"related": ["how-to-learn-a-marketing-skill-in-a-weekend", "what-should-a-startup-marketing-plan-include", "does-good-work-need-hustle"],
},
{
"slug": "how-to-write-marketing-copy-that-does-not-sound-like-ai",
"topic": "ai-marketing",
"q": "How do you write marketing copy that does not sound like AI?",
"short": "Open with the answer, back every claim with a fact, and cut anything that does not add clarity. AI drafts sound like AI because of patterns: adjectives instead of evidence, three-part rhythms, lines built as not this but that, and hype words. I keep a written list of these and check every draft against it. Confidence should come from numbers and specifics, never from adjectives.",
"body": """## The rules I write by

These come from the style guide I give every AI tool I work with, and every person who writes for me.

- Use plain, everyday words. Say the thing directly, then the fact behind it.
- Be confident through facts, never through adjectives.
- Open with the answer. Close simply.
- Use real numbers only. If you do not have a number, do not invent one.
- No punchy one line endings designed for social feeds, no selling headers, no hype about results.
- No three-part rhythms and no lines built on the not this but that pattern.
- No em dashes and no emojis.

## Two guiding lines

The goal of one sentence is to make the reader move to the next. And the old line that simplicity is the ultimate sophistication: if a word does not add clarity or purpose, remove it.

## A quick before and after

Before: We are thrilled to unveil a seamless, game-changing platform that empowers teams to unlock their full potential.

After: The tool cuts weekly reporting from three hours to twenty minutes. Here is how a five person team set it up.

The second version is shorter, specific and believable. The first could belong to any company, which is the real problem with generic copy.

## How to make AI follow this

- Put the rules and a banned word list in the project instructions, so every chat starts with them
- Add three examples of copy you are proud of
- Ask the model to check its own draft against the list and rewrite anything that breaks it
- Read the final version out loud. If you would not say it to a customer face to face, cut it

## A hook that earns attention

When a piece needs a strong opening, I challenge a belief the reader holds instead of opening with advice. A claim they disagree with keeps them reading to see if you are right.""",
"related": ["what-words-make-marketing-copy-sound-ai-generated", "how-to-write-a-hook-people-read", "claude-vs-chatgpt-for-marketing"],
},
{
"slug": "what-words-make-marketing-copy-sound-ai-generated",
"topic": "ai-marketing",
"q": "What words and patterns make marketing copy sound AI-generated?",
"short": "The usual giveaways are words like leverage, passionate, thrilled, excited to, seamless, unlock, game-changer, wheelhouse and deep dive, plus patterns such as three-part rhythms, lines built as not this but that, em dashes, emojis and a punchy one line ending. I ban all of these in my own writing and in every AI tool I set up. Replace each one with a plain word or a specific fact.",
"body": """## Words I do not use

Each of these has a plain replacement.

- Leverage: say use
- Passionate: show it with something you did instead
- Thrilled or excited to: say what happened
- Seamless: say what is easy, and how many steps it takes
- Unlock: say what the reader can now do
- Game-changer: give the result in numbers
- Wheelhouse: say what you are good at
- Deep dive: say look closely, or just do it
- I would love to: say I can, or ask the question directly
- Travel metaphors for ordinary work: describe the work itself

## Patterns that give it away

- Three-part rhythms, where every list has exactly three items and every sentence has three beats
- The not this but that construction, which sounds clever once and tired after
- A one line ending designed to be quoted
- Em dashes used as a rhythm tool in every paragraph
- Emojis in professional copy
- Selling headers on every section
- Adjectives stacked where a number should be

## Why it matters

Readers have now seen thousands of AI written posts and emails. They spot the patterns quickly, and once they do, they stop trusting the rest. Copy that sounds human is now a competitive advantage, especially in cold outreach and on landing pages.

## How I check a draft

- Search the draft for the banned words and remove every one
- Find every adjective and ask whether a fact could replace it
- Count the lists of three and break some of them up
- Read the opening line. Does it answer the question or challenge a belief? If it only warms up, delete it

I put this list into the project instructions of every Claude project I set up, so drafts arrive cleaner, and then I still edit by hand.""",
"related": ["how-to-write-marketing-copy-that-does-not-sound-like-ai", "how-to-write-a-hook-people-read", "cold-outreach-mistakes-that-lose-a-warm-lead"],
},
{
"slug": "how-to-write-a-hook-people-read",
"topic": "performance-marketing",
"q": "How do you write a hook that makes people stop and read or watch?",
"short": "Challenge a belief your reader already holds, in the first line or the first second of a video. Advice as an opener gets skipped. A claim that rubs against what people think makes them keep going to see if you are right. Then make every sentence earn the next one. For short video, the first second decides whether someone stays, and watching to the end is what spreads it.",
"body": """## Attack a belief, do not give advice

Most hooks open with a tip. Readers have seen thousands of tips, so they scroll past. A hook that challenges something they believe creates a small itch they want to settle. Some that fit my own topics:

- Your first 1,000 customers are worth ten times what they paid you
- Your Kickstarter is won before it launches
- Most AI training is forgotten by Monday

Each one invites a reaction, and the rest of the piece has to back it up with facts.

## Every sentence earns the next

The line I keep in my style guide: the goal of one sentence is to make the reader move to the next. After the hook, the second sentence matters almost as much. It should give a reason to believe the claim, such as a number, a name or a short story.

## Short video

For my AI illustrated quote series I keep notes from the creator PJ Ace on short video craft, and they match what I see in ad data:

- The first second decides whether someone is hooked or scrolls away
- Completion matters most: people watching to the end is what drives reach
- Keep giving small rewards through the video so attention does not drop
- The format that lasts is simple: inform and entertain

## Test hooks like a performance marketer

Hooks are opinions until the data says otherwise. Keep the targeting the same and test two or three hooks against each other, so the only difference is the opening. If the audience is right and results are weak, the creative is the problem, and the hook is usually the first part of the creative to change.

## Keep it honest

A hook that promises something the content does not deliver wins one click and loses the reader. I never mislead in outreach, and the same rule applies to headlines.""",
"related": ["how-to-write-marketing-copy-that-does-not-sound-like-ai", "how-to-lower-cpc-with-bullseye-targeting", "how-to-make-quote-visuals-and-short-animations-with-ai"],
},
{
"slug": "how-to-make-quote-visuals-and-short-animations-with-ai",
"topic": "ai-marketing",
"q": "How can a marketer use AI to make illustrated quotes and short animations?",
"short": "Pick one idea, turn it into one simple image, then animate it for a few seconds. I run a quote illustration series made with Gemini image and video tools, in English and some in Hindi. It grew out of an earlier side project, Vinnyana Visuals, which started when I illustrated one Robin Sharma quote for myself. AI now does in minutes what took hours, but the idea and the edit still decide whether it lands.",
"body": """## Where it started

Years ago I illustrated a single Robin Sharma quote for myself, to remember it. That became Vinnyana Visuals, a side project turning ideas such as deep work, consistency, prioritisation, comparison and information versus wisdom into simple drawings. The lesson from that project shaped my marketing too: a complex idea explained in one clear picture travels further than a paragraph.

Today the same idea runs as an AI series. I make the images with Gemini, animate them into short clips, and make English and Hindi versions of some of them.

## How I make one

- Choose one line that says one thing, such as you do not have to be extreme, just consistent
- Find a visual metaphor a child would understand, like a small plant growing a little each day
- Generate several image options and pick the simplest one
- Animate only one movement, a few seconds long
- Check the first second: would someone stop scrolling for it?
- Make language versions for the audiences you serve

## What makes them work

- One idea per visual. Two ideas in one image means neither lands.
- Plenty of empty space and very little text
- A consistent style across the series, so people recognise it before they read it
- Credit the author of any quote that is not yours

## Using this for a brand

The same method works for product marketing. Take one customer benefit, draw it as one picture, animate it, and test it as an ad against your normal creative with the same targeting. Simple visuals often explain a product faster than a feature list.

## What AI does not replace

AI can produce a hundred images in an hour. Choosing the right idea, cutting everything that adds noise and keeping the style consistent are still human decisions, and they are what make the series recognisable.""",
"related": ["how-to-write-a-hook-people-read", "what-is-functional-ai-in-marketing", "how-should-a-small-marketing-team-start-using-ai"],
},
{
"slug": "how-to-set-goals-and-review-your-week-as-a-marketer",
"topic": "career-growth",
"q": "How should a marketer set goals and review their week?",
"short": "Give every activity a clear objective, set goals three months out, and picture your ideal at three months, one year and three years. Reflect briefly every day and properly every week. Look for the 20% of work that brings 80% of results, and fix in advance how many hours a day go to work. These are the tactics I wrote down for myself and still use.",
"body": """## The tactics I keep

I keep a short note titled insights for my life. It is the system I come back to whenever a week gets noisy.

- Why am I doing this activity? Every task needs a clear objective and a reason it helps.
- What is my three month goal? Three months is long enough to matter and short enough to plan.
- What is the ideal for me now, in three months, in one year and in three years?
- Reflect every day and every week.
- See the 80/20 in everything.
- Decide exactly how many hours a day are for work.

## A weekly review that takes 20 minutes

- List what you finished and what moved your three month goal
- List what you did that did not move it, and why it happened
- Pick the one or two tasks that will bring most of next week's result
- Block time for them before anything else goes into the calendar
- Write one sentence on what you learned

## Daily reflection in five minutes

At the end of the day, ask two questions: what did I do today that my three month self will thank me for, and what will I do first tomorrow? Writing the second answer down makes the next morning faster.

## Know your sweet spot

The same note asks what I enjoy and what people pay me for. For me the overlap is building growth models: I enjoy the work, and leaders and investors value it. Finding that overlap tells you where to put your best hours, and what to say no to.

## Why it works

None of this is complicated. The value is in doing it every week. One line I wrote years ago still keeps me honest: your future self is watching you right now through memories, do not let yourself down.""",
"related": ["does-good-work-need-hustle", "how-to-learn-a-marketing-skill-in-a-weekend", "what-is-a-growth-model-and-why-do-investors-value-it"],
},
{
"slug": "how-to-audit-a-facebook-ads-account",
"topic": "performance-marketing",
"q": "How do you audit a Facebook ads account?",
"short": "Audit at three levels. At campaign level, check how many campaigns there are, whether the pixel and conversion reporting work, and whether learnings and benchmarks are written down. At ad set level, check retargeting lists, placements and audience size. At ad level, check that each ad has a matching landing page and fits a real customer persona. I used this checklist in advisory calls with Wearwell's CMO.",
"body": """## Campaign level

- Count the campaigns. Many small campaigns split the budget and starve the algorithm of data. Consolidate where the goal is the same.
- Check the pixel fires and conversions are reported on the ads, not only in analytics
- Check the campaign goal. A link click goal and a conversion goal buy very different traffic.
- Look at the ratio of new audiences to retargeting
- Check naming conventions, so anyone can read the account
- Keep a learnings document, and a document of benchmark CPM and CPC for the industry
- Drop vanity metrics from the reporting

## Ad set level

- Are retargeting lists set up and big enough to use?
- Why only one placement, such as Instagram only, if it was never tested against others?
- Is the audience too broad? For that account I kept audiences under roughly 750,000 people.
- Why only certain devices, if that was never tested?
- Have cheaper goals been tested? Messenger and WhatsApp goals were noticeably cheaper in that audit.

## Ad level

- Does each ad send people to a specific landing page that continues its message?
- Does each ad speak to one customer persona, or try to speak to everyone?
- Are offline or other events being optimised for without a clear reason?

## What usually comes out of it

The common pattern is too many campaigns, broad mixed targeting and generic ads. The fix is consolidation, one ad for one audience, and tracking that can be trusted. Wearwell's CMO, Erin Houston, said afterwards that my frameworks accelerated their growth and helped them plan ahead with clear direction.

## Before you start

Make sure you have access to the ad account, Google Tag Manager and analytics. In one audit I could only see the tag setup, and that alone showed a cookie consent issue stopping the pixel from firing and missing add to cart events.""",
"related": ["how-to-lower-cpc-with-bullseye-targeting", "what-kpis-to-check-first-in-a-new-paid-campaign", "should-you-exclude-mobile-app-placements-from-retargeting"],
},
{
"slug": "why-is-my-payment-gateway-showing-as-a-referral-in-google-analytics",
"topic": "performance-marketing",
"q": "Why does my payment gateway show up as a referral source in Google Analytics?",
"short": "Because buyers leave your site to pay and come back from the payment provider's domain, and analytics can credit the sale to that domain as a referral. I found this early in my career when referrals showed far more conversions than made sense. The payment gateway was being counted as a referral source. Excluding it fixed the attribution, and the budget could go to the channels that actually drove sales.",
"body": """## How I found it

In 2017 I was reviewing channel performance in Google Analytics and noticed that the referral channel showed a value of conversions that was simply not plausible. When I looked at the referral sources, the top one was the payment gateway. Buyers clicked pay, went to the payment page, came back to the thank you page, and analytics treated the return as a new visit from a referral.

The real source of each sale, such as a paid ad or an email, was being overwritten.

## How to spot it

- Open the referral report and sort by conversions
- Look for payment providers, banks, card verification pages or your own checkout domain
- Compare referral conversions with what you know about real partner and press traffic
- Watch for a sudden jump in referral conversions after a checkout change

## How to fix it

- In GA4, add the payment domains to the list of unwanted referrals in your web data stream's tag settings
- Add your own domains and subdomains too, so checkout on a subdomain does not create self referrals
- Check the fix with a test purchase and confirm the original source is kept
- Add an annotation or note with the date of the fix. I always tell founders to annotate changes, because reports before and after will not match.

## Why it matters

Once the filter was in place, the conversions moved back to the channels that earned them. That meant budget could be allocated to the right channels with confidence instead of rewarding a source that never brought anyone in.

It is also a good interview story. When I coach graduates on answering with the STAR method, I use this as my example for attention to detail.""",
"related": ["how-to-answer-marketing-interview-questions-with-star", "what-kpis-to-check-first-in-a-new-paid-campaign", "how-to-find-why-buyers-drop-off-at-checkout"],
},
{
"slug": "should-you-exclude-mobile-app-placements-from-retargeting",
"topic": "performance-marketing",
"q": "Should you exclude mobile app placements from retargeting campaigns?",
"short": "Often, yes. Ads inside mobile games and apps collect a lot of accidental taps, which inflate click-through rate while bringing visitors who leave at once. In one retargeting campaign I excluded mobile game app placements. The click-through rate fell, but the bounce rate dropped and real conversions came in within days. Judge placements by conversions, never by clicks alone.",
"body": """## Why app placements can mislead

Retargeting audiences are small and valuable: people who already visited your site. When ads for them run inside mobile games, many clicks happen by accident while someone is tapping to play. Those clicks look good in the dashboard. They cost money and bring people who close the page in a second.

## What I did

I was running a retargeting campaign where the click-through rate looked healthy but the site showed a high bounce rate and few sales. The placement breakdown showed a large share of clicks came from mobile game apps. I excluded those placements.

The click-through rate went down. At the same time the bounce rate dropped, visitors spent longer on the site, and conversions came in within the first few days. The campaign looked worse on the vanity metric and performed better on the one that mattered.

## How to check your own account

- Break down results by placement, not only by campaign
- Compare click-through rate with bounce rate and time on site for each placement
- Look for placements with many clicks and almost no conversions
- Exclude them, or move them to a separate test with a small budget
- Recheck after a week, judged on conversions and cost per conversion

## When to keep them

App placements are not always bad. For app install campaigns, or for cheap awareness at the top of the funnel, they can work. For retargeting, where you want people ready to buy, they usually waste budget.

## The wider rule

Drop vanity metrics from your reporting. Clicks, likes and impressions are inputs. Sales, sign ups and cost per customer are results. Every placement and audience should earn its budget on results.""",
"related": ["how-to-audit-a-facebook-ads-account", "how-to-lower-cpc-with-bullseye-targeting", "how-to-answer-marketing-interview-questions-with-star"],
},
{
"slug": "how-to-ask-a-busy-expert-for-help",
"topic": "career-growth",
"q": "How do you ask a busy expert or mentor for help without being ignored?",
"short": "Make it easy to say yes and never switch the ask. Say who you are, the specific problem and what you want from them, in a few lines. When they agree, send a calendar link straight away. Then arrive with your problem and questions written down. Most failed asks I see go wrong after the yes, with a templated reply or a handoff to someone else.",
"body": """## The first message

- One line on who you are and why you are writing to this person in particular
- The specific problem, in one or two sentences
- What you want: a 20 minute call, feedback on one document, one answer
- Nothing attached that they did not ask for

## After they say yes

This is where most asks fail. A founder once asked me for feedback. I agreed, and the reply thanked me for reaching out, invited me to a beta list and said a colleague would follow up. I did not respond. Once someone agrees, reply personally, send one calendar link, and keep the same ask you started with.

## Prepare like the time is expensive

I book sessions with mentors myself, and I always come with the specific problem and the questions written down before the call. Mentors have told me that this made the session more useful for them too. A good preparation note has:

- The decision you are trying to make
- What you have already tried and what happened
- Two or three specific questions
- Any numbers they will need to answer properly

## During the call

Listen more than you pitch. Write down exact phrases. Ask what they would do in your place, not just what they think.

## Afterwards

Send a short thank you the same day with what you will do next. A few weeks later, send one line on what happened. Experts rarely hear back, so this is the step people remember, and it is what turns one call into a relationship.

## From the other side

As a mentor with Techstars and EBRD, I see the same pattern from founders. The sessions that go furthest start with a clear problem. A deck that needs the founder to explain it, or a vague request for general feedback, uses the time on context instead of answers.""",
"related": ["cold-outreach-mistakes-that-lose-a-warm-lead", "what-to-do-first-as-a-new-hire", "how-to-answer-marketing-interview-questions-with-star"],
},
{
"slug": "what-is-functional-ai-in-marketing",
"topic": "ai-marketing",
"q": "What is functional AI in marketing?",
"short": "Functional AI is AI built into a working tool that does one job in your marketing, instead of AI used for novelty. My test is simple: does it cut through noise and speed up growth? At Deployed, the AI showcase by Coditas in Pune on 27 June 2026, I showed the setup I use: AI calculators that generate leads, an agent that drafts the newsletter for human review, and dashboards that read ad and UX data.",
"body": """## Why I use the term

One of my current interests, written on my profile, is functional AI: building and using AI tools that cut through noise and speed up startup growth. The word functional is the point. A tool counts when it does a real job every week, not when it makes a good demo.

## Examples from my own work

At Deployed in Pune I was the final speaker in the growth and marketing session and walked through an AI powered lead generation setup:

- AI calculators as the main lead engine: a visitor gets a useful answer to their own question and leaves their details to receive it
- A newsletter generator: an agent drafts each issue, a person reviews it, then it goes out
- An ad insights dashboard that reads Meta Ads data and explains it in plain language
- A UX insights dashboard that reads session data from Mouseflow and points to where visitors struggle

I also built a content system that lets a team publish on social media every day, and a Chrome extension that saves competitors' paid ads for research. Both are the subject of a hands-on workshop I am developing.

## How to tell if a tool is functional

- It has one clear job you can describe in a sentence
- It runs on your real data, not a sample
- A person checks the output before anything goes public
- You can name the hours saved or the leads gained each month
- People keep using it after the first week

## How to start

Pick the task your team complains about most. Build the smallest tool that removes it, with Claude or another model doing the heavy lifting. Use it for two weeks, fix what breaks, then decide whether it earns a place. One tool that works beats ten that impress in a meeting.""",
"related": ["what-is-an-ai-agent-in-marketing", "how-to-keep-up-with-the-exponential-growth-of-ai", "what-marketing-work-should-you-automate-first-with-ai"],
"playbook": "set-up-an-ai-content-agent-for-your-brand",
},
{
"slug": "how-to-prioritise-marketing-tasks-by-impact-and-effort",
"topic": "marketing-leadership",
"q": "How do you prioritise marketing tasks by impact and effort?",
"short": "Score every task on effort and on expected money impact, rank them, and turn the ranking into a day by day plan. For a conference series I advised, this put a checkout redesign first, then retargeting, tracking and email flows, with quick wins like a live attendee counter in the header done in a few hours. Scoring takes opinions out of the order of work.",
"body": """## The method

- List every task anyone has suggested, without filtering
- Give each one effort points: time, people and money needed
- Give each one impact points, estimated in money where you can
- Rank by impact against effort
- Turn the top of the list into a dated plan, not just a backlog

Impact and effort analysis sits in my marketing plan checklist and in every consulting engagement I have run, because it is the fastest way to agree on what comes first.

## A real example

For a conference and event series, the scoring produced a clear order:

- Highest: redesign the checkout flow with proper validation and payment, then a tickets block on the homepage, retargeting and email frameworks, and tracking across the ad platforms
- Medium: a media logo slider, a why attend page, a competitor report and an SEO timeline
- Quick wins: a header counter showing attendees, speakers and countries, which took a few hours

The day by day plan followed from it. Days one to seven analysed traffic sources, page flows and drop offs, with session recording installed on day one. Day eight shipped the counter. Days nine to fourteen fixed the checkout. Then email segmentation, then retargeting, then the remaining ad tools.

## Choosing between markets or verticals

The same idea works for bigger choices. When a small team I mentored was chasing several markets at once, we scored each from 1 to 5 on time, investment, excitement, commitment, a 90 day plan and five year return. We compared the totals exponentially so a clear winner emerged instead of a near tie. It replaced an emotional choice with data.

## Keep research proportionate

Aim for 80% of the information in 20% of the time. The scoring does not need to be perfect. It needs to be good enough that the team stops debating and starts shipping.""",
"related": ["what-should-a-startup-marketing-plan-include", "how-to-find-why-buyers-drop-off-at-checkout", "how-to-present-a-marketing-plan-past-present-future"],
},
{
"slug": "how-to-test-a-startup-idea-before-scaling-marketing",
"topic": "growth-from-zero",
"q": "How do you test whether a startup idea is worth scaling before spending on marketing?",
"short": "Build the smallest version, put real traffic through it within a week, and read both the numbers and what people say. For PCP, I built an MVP and funnel in a week and ran tightly targeted campaigns. The campaign numbers looked good, but the qualitative data showed the product did not solve a big enough pain, so the founders shelved it before spending on scale.",
"body": """## The PCP test

PCP needed to know quickly whether its idea was worth building properly. In the first week I built a minimum viable product and a funnel, set up tracking and started campaigns aimed at a narrow audience. Thousands of people visited, the landing page converted well, and acquisition cost dropped as the targeting improved.

On paper that looked like a green light. The interviews and qualitative data said otherwise: the product was not solving a big enough pain point, and the model would not scale far. The founders shelved it. That saved them from pouring money into growth for a product people did not need enough.

Jet Oesterreicher, PCP's founder, wrote afterwards that thanks to my thoroughness and hard work they were able to execute the correct measures.

## Steps to run your own test

- Write down the problem and who has it, in one sentence each
- Build the smallest thing that lets someone show real intent: a landing page, a waitlist or a pre-order
- Set up tracking before you spend anything
- Run a small, tightly targeted campaign for one to two weeks
- Talk to the people who converted and the people who did not
- Decide in advance what result means build, change or stop

## Painkiller or vitamin

Before writing a value proposition I ask founders whether the product is a painkiller or a vitamin. People pay for painkillers quickly. Vitamins need much more convincing. If interviews show the pain is mild, good click numbers will not save the business.

## Do not show the solution too early

In discovery calls, spend the first 10 to 15 minutes only on the problem. One founder I mentored was showing a demo in every discovery call. Customers then talked only about the demo. Reach problem solution fit first, then show the product.""",
"related": ["how-to-get-your-first-1000-customers-d2c", "what-kpis-to-check-first-in-a-new-paid-campaign", "when-should-a-startup-hire-its-first-marketer"],
},
{
"slug": "how-to-find-why-buyers-drop-off-at-checkout",
"topic": "performance-marketing",
"q": "How do you find out why buyers drop off at checkout?",
"short": "Watch real sessions, test the checkout yourself every week, and look for anything that sends buyers away from the page. At Infento, a test showed the discount code field made people leave to search for codes; renaming it a gift card field lifted conversion. At VU, session recordings showed visitors leaving when product images did not match the homepage, so we fixed images, copy and trust signals.",
"body": """## Start with tracking you can trust

Before blaming the page, check the data. In an audit for Frecious I found the Facebook pixel only fired after cookie consent, and on return visits the consent box did not show, so add to cart events were never sent. Google Tag Manager also had no add to cart or checkout events. Fix that first, or you will optimise against bad numbers.

## Watch real sessions

Session recordings show what reports cannot. At VU, the Swiss goggle brand where I led marketing, recordings showed visitors leaving product pages when the images did not match the elegant homepage, and getting lost in long blocks of text. We cut paragraphs to two or three sentences, used images that carried the same feel, and put an Olympic athlete wearing the goggles at the top of the homepage.

## Look for exits you created

At Infento a checkout test showed that a discount code field was sending people off the site to search for codes. Changing the label from discount code to gift card code kept them on the page and lifted conversion. Any field that makes buyers wonder whether they are overpaying is an exit.

## Test the checkout every week during campaigns

During Infento's spring campaign we ran a weekly checklist:

- Add to cart works on the all products page and on every product page
- The checkout button in the cart pop-up works
- The checkout button in the header works
- Editing the cart works

Broken checkouts during a big campaign are the most expensive bug a shop can have.

## Use proof, not claims

Replace generic claims with specific proof near the buy button: who uses the product, guarantees, real reviews with names and faces. I also use a weighted audit checklist of around 50 UX and conversion checks, each tied to published usability research, covering forms, navigation, visual hierarchy, trust and privacy.""",
"related": ["how-to-prioritise-marketing-tasks-by-impact-and-effort", "why-is-my-payment-gateway-showing-as-a-referral-in-google-analytics", "how-to-audit-a-facebook-ads-account"],
},
{
"slug": "how-to-answer-marketing-interview-questions-with-star",
"topic": "career-growth",
"q": "How do you answer marketing interview questions with the STAR method?",
"short": "Tell a short story in four parts: the Situation, the Task you owned, the Action you took and the Result. I coach graduates with my own marketing stories as models. One: in 2017 I found a payment gateway being counted as a referral source in Google Analytics, filtered it out, and budget could then go to the channels that really drove sales. Specific details make the answer believable.",
"body": """## The four parts

- Situation: the context in one or two sentences
- Task: what you were responsible for
- Action: what you did, in steps, using I rather than we
- Result: what changed, with a number if you have one, and what you learned

## Three examples I use with coachees

Attention to detail. Situation: referrals in Google Analytics showed far more conversions than made sense. Task: find out whether the channel data could be trusted. Action: I traced the referral sources and found the payment gateway counted as one, then added a filter to exclude it. Result: conversions moved back to the right channels and budget could be allocated with confidence.

Creativity on a small budget. Situation: a side Instagram channel was growing slowly. Task: grow it without paid ads. Action: I searched for accounts with tag for a repost in their bio, people who actively wanted their work shared, and reposted their best content with credit. Result: the channel grew several times over within a month.

Judging by the right metric. Situation: a retargeting campaign had a good click-through rate but few sales. Task: fix the campaign without more budget. Action: I excluded mobile game app placements. Result: click-through rate fell, bounce rate dropped and conversions came in within days.

## How to prepare

- Write five STAR stories before any interview: a win, a failure, a conflict, a time you used data and a time you led without authority
- Keep each one under two minutes when spoken
- Practise out loud, not only in writing

## Questions I ask coachees to think about

Beyond the classic questions, I add a few of my own to help people know themselves before an interviewer asks: pick between speed and perfection; what is more important, habits or goals; what is the riskiest thing you have done; would you rather be feared or respected? There is no right answer. Having a considered one is what matters.""",
"related": ["why-is-my-payment-gateway-showing-as-a-referral-in-google-analytics", "what-to-do-first-as-a-new-hire", "should-you-exclude-mobile-app-placements-from-retargeting"],
},
{
"slug": "what-kpis-to-check-first-in-a-new-paid-campaign",
"topic": "performance-marketing",
"q": "Which KPIs should you check first when you launch a new paid campaign?",
"short": "Check click-through rate first, because it tells you whether the message and the targeting match. Around 1.5 to 2% is a good early sign. Then cost per click, which shows whether paid traffic is sustainable. After that, read engagement from session recordings and time on site, and conversion from call-to-action clicks to completed forms, where about 2% is a rough cross-industry average.",
"body": """## Three stages, each with its own numbers

When founders I mentor launch their first campaigns, I split the funnel into acquisition, engagement and conversion, and give each stage its own KPIs. It stops people from judging a campaign on one number.

## Acquisition

- Click-through rate is the number one KPI, because it tells you if the messaging and targeting are right. Around 1.5 to 2% is a good sign early on.
- Cost per click is the second. It tells you whether you can afford to keep buying this traffic.
- Calculate both per channel. A blended average hides the channel that is wasting money.

## Engagement

- Watch session recordings to see what visitors actually do
- Check time on site and how far people scroll
- Look for the point where most visitors stop

## Conversion

- Track clicks on the main call to action, then completed forms or purchases
- Around 2% is a rough cross-industry average for form completion. A very small sample can look much better or worse than that, so wait for enough visitors before drawing conclusions.

## What to do with the numbers

- Low click-through rate: fix targeting first, then the hook and creative
- Good click-through rate but high bounce: the landing page does not continue the ad's message
- Good engagement but low conversion: the form, offer or checkout is in the way

## A funnel with one metric per stage

For longer funnels I use a template adapted from AARRR with one metric per stage: aware measured by three second video views or ad recall, acquired by landing page views, activated by starting sign up, converted by completing it, retained by still being a customer after two months, and referred by NPS.

## Start tracking now

A founder once told me they would set up tracking once they reached 100 leads a week. Set it up before the first euro is spent. You cannot learn from a campaign you cannot measure.""",
"related": ["how-to-lower-cpc-with-bullseye-targeting", "how-to-audit-a-facebook-ads-account", "what-is-an-activation-threshold-churn-reversal-point"],
},
]


# Rewrites of the 19 answers in content_answers.py. Same slug, topic, question, related and playbook;
# short and body now carry specific material from Pratik's Notion (engagements, sessions, notes).
ANSWERS_REWRITE = [
{
"slug": "how-should-a-small-marketing-team-start-using-ai",
"topic": "ai-marketing",
"q": "How should a small marketing team start using AI?",
"short": "Start with one repeated task that eats hours every week, build one working tool for it, and measure the hours it saves before moving on. That is how I built the AI setup I presented at the Coditas AI showcase in Pune in June 2026: lead generation calculators first, then a newsletter agent with human review, then dashboards for ad and UX data. Small teams win by stacking a few reliable workflows.",
"body": """## Pick the task, not the tool

Most teams start by comparing tools. That is the wrong order. List the work your team repeats every week and how long each item takes. The best first candidates are repetitive, text heavy and easy to check: repurposing content, first drafts of ad variations, summarising calls, weekly reporting.

## How I built mine, one piece at a time

The setup I showed at Deployed, the AI showcase by Coditas, was not built in one go:

- First, AI calculators that answer a visitor's own question and capture the lead
- Then a newsletter generator: an agent drafts, a person reviews, then it goes out
- Then an ad insights dashboard that explains Meta Ads data in plain language
- Then a UX insights dashboard that reads Mouseflow session data

Each one had to prove itself before the next one started. I also built a content system that lets a team post on social media every day without a person writing every post from scratch.

## Build one workflow properly

Write down the inputs, the steps and what a good output looks like. Turn that into a saved project in Claude with your brand guidelines and writing rules attached, including the words you never want to see. Run it on real work for a week. Fix what breaks.

## Measure, then expand

Track hours saved and output quality against a baseline from before. Once one workflow is reliable, start the next. Three or four reliable workflows give a small team real time back, and that time goes into strategy and testing.

## What to avoid

- Rolling out ten tools at once with nobody owning them
- Publishing AI output without a human edit
- Automating work nobody has defined clearly yet
- Chasing every new release instead of finishing one build

If your team needs a first build to learn on, my Claude 101 session with GrowthX filled all 100 seats with people shipping a live website in one sitting.""",
"related": ["what-marketing-work-should-you-automate-first-with-ai", "how-to-train-your-marketing-team-on-ai", "claude-vs-chatgpt-for-marketing"],
},
{
"slug": "what-marketing-work-should-you-automate-first-with-ai",
"topic": "ai-marketing",
"q": "What marketing work should you automate first with AI?",
"short": "Automate work that is repetitive, rules based and easy to check: newsletter and social drafts, ad variations, competitor ad research, call summaries and weekly reporting. In my own setup an agent drafts the newsletter and a person reviews it, and dashboards turn Meta Ads and Mouseflow data into plain language. Keep positioning, the core message, pricing and final approval with a person.",
"body": """## Good first candidates

- Drafting a newsletter or social posts from material you already have, with a person reviewing before anything goes out
- Writing ten ad or subject line variations for a person to pick from
- Saving and sorting competitors' paid ads, which I do with a small Chrome extension
- Turning ad platform data into a short written report on what changed and why
- Summarising customer interviews, reviews and sales calls into themes
- Cleaning and enriching lead lists

## Keep these with a person

- Positioning and the core message. At Bueno, testing market by market showed UK owners responded far better to a message about hidden charges than one about savings. No model would have guessed that without the test.
- Final approval of anything that goes public
- Pricing, offers and legal claims
- Relationships with partners, press and key customers

## A simple test

If you can describe the task in a short checklist and a junior person could check the result in two minutes, it is a good candidate. If the task needs taste, context only you have, or a judgement call with real downside, use AI to prepare the options and keep the decision.

## Write the rules down first

Automation copies whatever standard you give it. Before automating any writing, I write down the rules: open with the answer, use facts instead of adjectives, no hype words, no em dashes. Put them in the tool's instructions so every draft starts closer to done.

## Measure it

Note how long the task took before, how long it takes now including review, and whether quality held. If review takes almost as long as doing the task, the automation is not ready.""",
"related": ["how-should-a-small-marketing-team-start-using-ai", "what-is-an-ai-agent-in-marketing", "how-to-measure-the-roi-of-ai-in-marketing"],
},
{
"slug": "claude-vs-chatgpt-for-marketing",
"topic": "ai-marketing",
"q": "Claude or ChatGPT: which is better for marketing work?",
"short": "Both are strong, and most marketers end up using more than one. In my work Claude is the main tool for long writing in a set voice, reading large documents and building sites and small tools; it is what I teach in my Claude 101 sessions with GrowthX. For images and short animations I use Gemini. Pick one default for the team, load it with your brand context, and test others on specific tasks.",
"body": """## Where each one fits in my work

These tools change every few months, so treat this as a working view, not a ranking.

- Long form writing and editing in a set voice: Claude, with my writing rules saved in the project
- Building a portfolio site, landing page or internal tool: Claude. In Claude 101 attendees go from a resume to a live site in one session.
- Images and short animated clips: Gemini, which I use for my illustrated quote series in English and Hindi
- Quick everyday questions and brainstorming: any of them works, ChatGPT is very convenient

## What matters more than the tool

The output depends far more on what you give the model than on which model it is. In every project I save the positioning, the audience, a banned word list and a few examples of great past work. Every chat then starts from the brand instead of from zero.

## A real example of the difference context makes

In the Claude 101 masterclass I build a site in four stages: a plain first version from a resume, a restyle using a minimalist reference site for inspiration without copying it, a playful game style version, and a final version that combines them and adds a contact form wired to Supabase. Each stage gets better because the prompt gives Claude something specific to work from.

## How to decide for your team

Run the same three real tasks through two tools for a week. Score the results on quality and on the time spent editing. Make the winner the default, so prompts and project setups can be shared across the team.""",
"related": ["can-a-marketer-build-a-website-with-claude-without-coding", "how-should-a-small-marketing-team-start-using-ai", "how-to-train-your-marketing-team-on-ai"],
},
{
"slug": "can-a-marketer-build-a-website-with-claude-without-coding",
"topic": "ai-marketing",
"q": "Can a marketer build a website with Claude without knowing how to code?",
"short": "Yes. A marketer can build and publish a real website with Claude in about an hour: give Claude your resume or product content and a reference design, improve the page step by step in plain English, then put the files on GitHub and deploy them free on Vercel. In my Claude 101 masterclass with GrowthX, all 100 seats were filled by people doing exactly this live.",
"body": """## What you need

- A Claude account
- A free GitHub account to store the files
- A free Vercel account to put the site online
- Your content, such as a resume or LinkedIn export, plus a site you like as a reference

## The four stages I teach

- Stage 1: upload the resume and ask for a single page HTML site. You get a working first version in minutes.
- Stage 2: restyle it using a reference site for inspiration. In the masterclass I use a minimalist studio site and ask Claude to borrow the feel without copying it.
- Stage 3: try a bold idea. I turn the profile into a playful game style page to show how far plain English instructions can go.
- Stage 4: combine the best of both into one page and add a contact form that saves leads to a Supabase table.

## About the form and security

People worry when they see a key in the page source. For Supabase, the public key being visible is normal. Security comes from Row Level Security rules, which in the masterclass allow anyone to add a lead but nobody to read the table from the page.

## Publishing

Save the files to a GitHub repository and connect it to Vercel. You get a live link in under a minute, and every later change you push goes live automatically.

## What people get wrong

- Asking for everything in one prompt instead of improving the page stage by stage
- Skipping the reference site, which is what makes the design look intentional
- Not checking the page on a phone before sharing it

My own site, pratikrenuse.com, is built and maintained this way. The full step by step version is in the playbook linked below.""",
"related": ["claude-vs-chatgpt-for-marketing", "how-should-a-small-marketing-team-start-using-ai", "how-to-run-a-hands-on-ai-workshop-for-a-marketing-team"],
"playbook": "ship-a-website-with-claude-in-one-hour",
},
{
"slug": "what-is-an-ai-agent-in-marketing",
"topic": "ai-marketing",
"q": "What is an AI agent in marketing?",
"short": "An AI agent in marketing is software that takes a goal, works through several steps on its own and uses tools to finish the job. My newsletter agent is a simple example: it gathers material, drafts the issue, hands it to a person for review, and only then is it sent. A chatbot answers one prompt. An agent runs a workflow, ideally with a person approving the final output.",
"body": """## Agent versus chatbot

A chatbot waits for your prompt and replies. An agent is given a job, decides the steps, calls tools such as search, a spreadsheet, an ad platform or your email tool, checks its own work and hands back a result. The useful marketing agents today are narrow: each does one workflow well.

## Examples from my own setup

- A newsletter agent: drafts each issue from new material, then waits for a person to review before distribution
- An ad insights agent: reads Meta Ads data and writes a plain language summary of what changed and what to test next
- A UX insights agent: reads session data from Mouseflow and points to pages where visitors struggle
- A content agent: prepares daily social posts for a team so nobody starts from a blank page

I presented this setup at Deployed, the AI showcase by Coditas in Pune, in June 2026. I also run an agent on my own server for automations that need to work around the clock.

## What makes an agent last

- One clear job, written down
- Your brand rules and banned words in its instructions
- An approval step before anything goes public
- A log of what it did, so someone can check it
- A person who owns it and fixes it when it breaks

## Keep a person in the loop

Agents make confident mistakes. In my setup nothing an agent writes reaches customers without review. The time saved is in drafting and gathering, not in judgement.

## Where to start

Pick a weekly task with clear inputs and a clear output, such as a report or a newsletter. Build the agent for that one task. Run it alongside the manual version for two weeks, then switch over when the agent's output needs only light edits.""",
"related": ["what-marketing-work-should-you-automate-first-with-ai", "how-to-measure-the-roi-of-ai-in-marketing", "how-should-a-small-marketing-team-start-using-ai"],
"playbook": "set-up-an-ai-content-agent-for-your-brand",
},
{
"slug": "how-to-train-your-marketing-team-on-ai",
"topic": "ai-marketing",
"q": "How do you train a marketing team on AI?",
"short": "Train on the team's own work, not on generic demos. Run a hands-on session where everyone builds something real, then give each person one weekly task to rebuild with AI and a shared place for prompts that work. People learn by doing and learn more by teaching. My Claude 101 session with GrowthX filled all 100 seats on that format: everyone shipped a live site before the end.",
"body": """## Why most AI training does not stick

A tour of features is forgotten by Monday. What sticks is the moment someone builds a real thing for their own job and sees it work. I have believed this since long before AI: the highest learning comes from doing, and even higher than that is teaching.

## A format that works

- One hands-on session where every person leaves with something live
- Each person picks one recurring task to rebuild with AI over the next two weeks
- A shared library of prompts and project setups the team can copy
- A short review where each person teaches the others what they built

## Two formats I run

Claude 101, with GrowthX in June 2026, takes a group from a resume to a live portfolio site in four stages in one session, ending with a contact form wired to a database. It filled all 100 seats.

For teams that want more depth, I am developing a two day weekend format. Day one covers an automated content system a team can use to publish every day. Day two is a build day: each attendee builds a small software or automation tool for themselves or their team.

## What the session should cover

- Setting up a project with brand context and writing rules
- Writing clear instructions and improving output step by step
- Checking output before it goes anywhere public
- One end to end build, from idea to something live

## After the session

Book the two week review before the session ends. Without it, most people go back to old habits. With it, the team usually has three or four working workflows within a month, and the people who built them become the internal teachers.""",
"related": ["how-to-run-a-hands-on-ai-workshop-for-a-marketing-team", "how-should-a-small-marketing-team-start-using-ai", "claude-vs-chatgpt-for-marketing"],
},
{
"slug": "how-to-measure-the-roi-of-ai-in-marketing",
"topic": "ai-marketing",
"q": "How do you measure the ROI of AI in marketing?",
"short": "Measure three things against a baseline from before you used AI: hours saved per workflow, output volume or speed, and the business result the work feeds, such as leads, conversion or cost per acquisition. Report every number with the percentage change, the absolute change and the time period. Subtract tool costs and the time spent reviewing AI output, or the ROI will look better than it is.",
"body": """## Set the baseline first

Before you change a workflow, write down how long it takes, how much it produces and what it costs. Without a baseline every AI result looks like a win.

## The three layers

- Efficiency: hours saved per week on each workflow, including review time
- Output: more tests run, more content shipped, faster turnaround
- Outcome: the metric the work exists for, such as qualified leads, conversion rate or customer acquisition cost

## Log it like an experiment

I run growth work as experiments, and every test goes into a log with the same fields: the funnel stage it affects, marketing team hours, engineering hours, the success metric, the result and the learning. Treat each AI workflow the same way. After a quarter you have an honest record of which ones paid off.

## Report it honestly

For any growth number I report three things: the percentage change, the absolute change and the time period. A workflow that doubled output sounds impressive until you add that it went from two posts a week to four over three months. That may still be a good result. Saying it plainly keeps trust.

## The honest costs

Include subscriptions, setup time and the time a person spends reviewing and fixing output. A workflow that saves five hours but needs three hours of checking is a small win, not a big one.

## Tie it to the money metrics

Report AI impact in the units leadership already uses. When I lead growth, the number the board cares about is the ratio of customer lifetime value to acquisition cost, which at Bueno reached 24x, with about 700 euro of lifetime value against about 30 euro of acquisition cost. If an AI tool lowers acquisition cost or lifts conversion, show its effect on that ratio. Hours saved is interesting. Lower cost per customer gets budget.""",
"related": ["what-marketing-work-should-you-automate-first-with-ai", "what-is-a-good-ltv-to-cac-ratio", "what-is-an-ai-agent-in-marketing"],
},
{
"slug": "what-is-answer-engine-optimization",
"topic": "ai-search",
"q": "What is answer engine optimization (AEO)?",
"short": "Answer engine optimization, or AEO, is the work of getting your brand and content quoted inside AI answers from ChatGPT, Claude, Perplexity and Google AI Overviews. It builds on SEO but rewards pages that open with a direct answer, carry real experience and numbers only you have, use structured data and are easy for AI crawlers to read. It is the same writing discipline I use everywhere: answer first, then the facts.",
"body": """## How it differs from SEO

SEO aims for a ranking and a click. AEO aims for a mention or a citation inside a generated answer, which may never send a click. The two overlap a lot: pages that rank well are more likely to be used as sources.

## What it involves

- Pages that answer one question clearly in the first few sentences
- Structured data such as FAQ, Article, Person and Organization markup
- Content that AI crawlers can read without running JavaScript
- Clear authorship and real experience behind the content
- Mentions of your brand on sites AI tools trust, such as YouTube, LinkedIn, Reddit and industry publications

## Why my writing rules fit it

The style guide I write by says: open with the answer, use real numbers only, be confident through facts and never through adjectives. I wrote it to make copy sound human. It turns out to be exactly what answer engines reward. A paragraph that answers the question directly is easy to quote. A paragraph that warms up for three sentences is not.

## What only you can add

Assistants can summarise general advice from anywhere. What they cannot invent is your experience. A page that says a Kickstarter campaign I led raised $848K and became the most funded STEM project on Kickstarter in 2018, and then explains how, carries something no generic page has. That specific, verifiable detail is what makes a source worth citing.

## Why it matters now

Buyers increasingly ask an assistant instead of searching. If your brand is not among the few names an assistant gives, you are not on the shortlist. AI and how it changes marketing is the main topic I speak and teach on now, and this is the question I hear most from marketing heads.""",
"related": ["how-to-get-your-brand-mentioned-by-chatgpt", "what-should-a-cmo-do-about-ai-search", "how-should-a-small-marketing-team-start-using-ai"],
},
{
"slug": "how-to-get-your-brand-mentioned-by-chatgpt",
"topic": "ai-search",
"q": "How do you get your brand mentioned by ChatGPT and other AI assistants?",
"short": "Be the clearest answer to specific questions your buyers ask, and get mentioned on the sites assistants trust. Publish one page per question that opens with a direct answer and carries your own experience, add structured data, keep pages readable without JavaScript and make sure Bing indexes you. Then earn mentions elsewhere: talks, interviews, community answers. AI mentions are the new word of mouth, and they compound the same way.",
"body": """## On your own site

- One question per page, with a direct answer in the first paragraph
- Real experience and numbers only you can provide
- FAQ, Article and Person or Organization structured data
- A robots.txt that allows AI search crawlers
- Fresh dates on pages you keep up to date

## Off your site

Assistants cite community and third party sources far more than brand websites. Talks on YouTube, articles on LinkedIn, podcast appearances, answers in communities and listings on respected industry sites all add up. For me that includes three TEDx talks and more than 50 keynotes in 14 countries, each of which leaves a public trace that says what I work on.

## Think of it as word of mouth

I have a simple model for early customers: the first 1,000 are really 1,000 times 10, because happy customers keep telling others for years. AI mentions work the same way. Every credible mention on a trusted site is another voice the assistant hears. They build slowly, then compound.

## Check where you stand

Write down 15 to 20 questions a buyer would ask an assistant about your category. Run them in ChatGPT, Perplexity, Claude and Google AI Mode once a month and note who gets named. That list tells you which pages to write next and which sites to earn a mention on.

## What does not work

There is no way to pay for a mention. Thin pages written to cover every keyword, copy full of adjectives and claims without proof all get passed over. Specific, honest and useful is the only reliable strategy.""",
"related": ["what-is-answer-engine-optimization", "what-should-a-cmo-do-about-ai-search", "what-marketing-work-should-you-automate-first-with-ai"],
},
{
"slug": "what-should-a-cmo-do-about-ai-search",
"topic": "ai-search",
"q": "What should a CMO do about AI search taking traffic from Google?",
"short": "Treat AI answers as a new shelf your brand needs to be on. Audit which questions buyers ask assistants in your category and who gets named, publish clear answer pages backed by real expertise, make sure Bing and AI crawlers can index the site, and shift some budget toward third party mentions. Report AI mentions to the board next to organic traffic, using the past, present and future format.",
"body": """## What is changing

AI Overviews now sit on top of a large share of Google searches, and many buyers go straight to ChatGPT or Perplexity. Some clicks that used to reach your site now end inside the answer.

## A practical plan for a marketing head

- Audit: list the 20 questions your buyers ask and check who the assistants name today
- Content: one strong page per question, written by someone with real experience
- Technical: structured data, crawlable HTML, Bing Webmaster Tools set up, AI crawlers allowed
- Off site: PR, talks, community answers and partner content that put your name on trusted sites
- Measurement: track AI mentions monthly next to organic traffic and branded search

## Prioritise it like any other channel

Score each piece of work on effort and expected impact before you start. A handful of pages answering your highest intent questions usually beats a hundred pages on long tail topics. Aim for 80% of the insight in 20% of the time on the audit, then ship.

## Report it to the board honestly

I present marketing updates in three parts: what happened, where we stand and what comes next. Every number carries the percentage change, the absolute change and the time period. AI search is new and the numbers are small at first. A mention rate that grew 200% from 3 to 9 of 30 tracked questions over a quarter is a real result when stated plainly, and it will hold up when someone checks.

## What not to do

Do not mass produce thin pages to cover every possible query. Google has run several updates against scaled low value content, and assistants pick sources that look credible. Do not let a team write AI copy full of adjectives either: answer engines quote facts, not hype.""",
"related": ["what-is-answer-engine-optimization", "how-to-get-your-brand-mentioned-by-chatgpt", "how-to-measure-the-roi-of-ai-in-marketing"],
},
{
"slug": "how-to-get-your-first-1000-customers-d2c",
"topic": "growth-from-zero",
"q": "How do you get your first 1,000 customers for a D2C brand?",
"short": "Pick one tight audience, find where they already gather, and win them one channel at a time. Getting startups from zero to their first 1,000 paying customers is the core of my mentoring. Narrow targeting, communities, partnerships with trusted names and a launch moment with a deadline beat broad ads early on. Treat those first customers as your best channel: each happy one brings others for years.",
"body": """## Narrow before you scale

The first 1,000 customers rarely come from everyone. They come from a group with a sharp problem you solve better than anyone else.

- At VU, that meant professional skiers and snowboarders. The brand became the number one Swiss brand for them and was used by Olympians at the 2022 Games.
- At Le Patron, a cycling clothing brand, the ads targeted people interested in both menswear and pro road cycling, a far smaller and cheaper group than either alone.
- At Infento, it meant families who wanted creative, hands-on play, reached through a crowdfunding launch.

## Channels that work early

- Founder led outreach and conversations, which also teach you the message
- Communities and clubs where your audience already spends time
- Partnerships with people the audience trusts, such as athletes, coaches or retailers
- A launch moment with a deadline, like the Kickstarter I led for Infento, which raised $848K and became the most funded STEM project on Kickstarter in 2018

## Why the first 1,000 matter so much

My working model is that the first 1,000 customers are really 1,000 times 10. If they are happy and stay for years, each one can bring at least 10 more. So overserve them, collect their exact words for your ads, and build referrals while you can still talk to them one by one.

## When to add paid ads

Once a message has converted in conversations and organic posts, test it with a small paid budget and one ad per audience. Track cost per customer and repeat purchase from day one. Cheap first orders with no repeat buyers is not growth.""",
"related": ["how-to-plan-a-kickstarter-campaign", "what-is-a-good-ltv-to-cac-ratio", "when-should-a-startup-hire-its-first-marketer"],
},
{
"slug": "how-to-plan-a-kickstarter-campaign",
"topic": "growth-from-zero",
"q": "How do you plan a successful Kickstarter campaign?",
"short": "Most of a Kickstarter campaign is won before launch. Build a list of people who said they want the product, test your video and reward tiers on them, line up press for launch week, and aim to fund fast so the platform and the press pick it up. I led Infento's campaign, which raised $848K and became the most funded STEM project on Kickstarter in 2018.",
"body": """## What we did at Infento

Infento makes life-size construction kits that families turn into bikes, go-karts and other rides. For its second generation launch I led the Kickstarter strategy. We built a pre-launch list with Facebook lead ads, ran the campaign in phases and pushed media outreach hard. It funded very quickly, raised $848K and became the most funded STEM project on Kickstarter globally in 2018. Infento also won a Red Dot award, a German Design Award and Parent's Choice Gold, which gave the press a story beyond the campaign.

## Before launch

- Build a list of interested backers with lead ads, content and communities, and keep them warm with updates
- Test the video, headline and reward prices on that list before going live
- Prepare press, creators and partners so coverage lands in launch week
- Decide the early bird offer and how many units it covers

## Launch week

Momentum is everything. A campaign that funds fast gets more visibility on the platform and a better story for journalists. Email the whole list on day one, post updates often and reply to every comment.

## During the campaign

Run it in phases. Add stretch goals and fresh updates to give people new reasons to share. Keep paid ads running only while the cost per backer works.

## Use it to enter a market

A Kickstarter can be more than a fundraiser. For Infento it was also a way into the US market, with real buyers instead of a guess. I still give this example to founders facing a chicken and egg problem in a new market.

## After the campaign

Plan fulfilment and communication carefully. Backers who get clear updates become your first loyal customers and your best word of mouth.""",
"related": ["how-to-get-your-first-1000-customers-d2c", "what-is-a-good-ltv-to-cac-ratio", "how-to-enter-a-new-country-market"],
"playbook": "launch-a-kickstarter-campaign",
},
{
"slug": "what-is-a-good-ltv-to-cac-ratio",
"topic": "growth-from-zero",
"q": "What is a good LTV to CAC ratio?",
"short": "A common rule of thumb is at least 3 to 1: a customer should bring in three times what it cost to acquire them. Below that, growth tends to burn cash. At Bueno, where I built online marketing across 28 countries, we reached 24 to 1, with about 700 euro of lifetime value against about 30 euro of acquisition cost. Just as important is how fast you earn the acquisition cost back.",
"body": """## The two numbers

- LTV, lifetime value: the gross margin a customer brings over the whole relationship
- CAC, customer acquisition cost: total sales and marketing spend divided by new customers in the same period

## Reading the ratio

- Under 1 to 1: you lose money on every customer
- Around 3 to 1: a common target for healthy growth
- Far above 3 to 1: you can probably spend more on growth

## What a high ratio looked like at Bueno

Bueno helps foreign property owners in Spain handle banking, bills and non-resident tax in their own language. I built its online marketing from zero across 28 countries, and the ratio reached 24 to 1: about 700 euro of lifetime value against about 30 euro of acquisition cost. Three things drove it:

- Testing the message market by market. UK owners, for example, responded much better to a message about hidden charges than to one about savings.
- Cheap, trusted channels such as owner communities and partners, next to paid social and Google
- A subscription product, so value builds month after month instead of in one sale

## Common mistakes

- Using revenue instead of gross margin for LTV
- Counting only ad spend in CAC and leaving out salaries, tools and agencies
- Projecting lifetime value from a few months of data
- Ignoring referrals. A happy early customer who brings friends lowers your real CAC.

## Payback period

Also track how many months it takes to earn back CAC. A great ratio with a long payback can still run a young company out of cash. Report both, with the time period they cover, so nobody reads more into the number than it holds.""",
"related": ["how-to-get-your-first-1000-customers-d2c", "how-to-measure-the-roi-of-ai-in-marketing", "when-should-a-startup-hire-its-first-marketer"],
},
{
"slug": "how-to-enter-a-new-country-market",
"topic": "growth-from-zero",
"q": "How should a startup test a new country market?",
"short": "Test before you commit. Run small paid and organic experiments with landing pages in the local language, measure cost per lead and conversion, and talk to the first customers. Expand only where the numbers hold. At Bueno I built online marketing across 28 countries, and the message had to change by market: UK owners, for example, cared far more about hidden charges than about savings.",
"body": """## Start with a cheap signal

Translate one landing page properly, run a small ad test and a few community posts, and compare cost per lead and conversion with your home market. A few weeks of real data beats months of desk research.

## What I learned across markets

At Bueno I diagnosed the funnel market by market, starting with Norwegian, Swedish and British property owners in Spain. The same product needed a different first message in each. Local language versions, local communities and local partners such as estate agents and lawyers mattered more than budget.

At Sweek, a story app growing across 12 countries, the fix was in how budget was set. Country budgets were fixed in advance. I moved them to performance, so money followed results, and acquisition cost fell by more than half.

At Infento we ran seasonal campaigns in four language markets, and used Kickstarter as a way into the US.

## Localise more than the language

- Prices in local currency and local payment methods
- Examples, testimonials and references that make sense locally
- Legal and tax details specific to the country
- Support hours and channels people expect there

## Decide with rules

Set the thresholds before the test: the cost per customer and conversion rate a market must hit to get more budget. When a team cannot decide between markets, I score each from 1 to 5 on time, investment, excitement, commitment, a 90 day plan and five year return, and compare the totals so a clear winner shows.

## Common traps

Copying the home market ads word for word, judging a market on a week of data, and spreading budget across too many countries at once.""",
"related": ["how-to-get-your-first-1000-customers-d2c", "what-is-a-good-ltv-to-cac-ratio", "fractional-cmo-vs-agency-vs-full-time-marketer"],
},
{
"slug": "when-should-a-startup-hire-its-first-marketer",
"topic": "marketing-leadership",
"q": "When should a startup hire its first marketer?",
"short": "Hire your first marketer once the founders have found at least one channel or message that brings customers, and need someone to run and scale it. Before that, founder led growth plus an advisor is usually better. When you do hire, hire a builder. I joined Infento, VU and Bueno as a founding team member and built marketing from zero each time, doing the work myself before managing anyone.",
"body": """## Signs you are ready

- Customers come from something repeatable, not only from the founders' network
- You know your best customer and the message that lands with them
- The founders spend too much time running campaigns instead of the business

## Who to hire first

Early on you need a builder who can do the work, not a manager of agencies. At Bueno I built online marketing single-handedly across 28 countries. At Infento I set up the strategy, funnel, PR, awards, SEO and the paid engine before the team grew. Look for someone who has taken a product from zero before and can write, run ads, set up tracking and talk to customers.

## Before the hire

- Install tracking now. A founder once told me they would set it up at 100 leads a week. By then you have lost the data that tells your first marketer what works.
- Spend most of your time on the product. When a founder with early traction asked me about marketing, my advice was 70 to 90% of time on the proof of concept, plus one or two hours a week on low effort, high impact channels such as directories, communities and small creators.
- Use an advisor or fractional lead to avoid expensive mistakes

## Give the hire time to listen

In the first weeks, a new marketer should meet people one at a time, read the data and sit in on sales and support calls before changing anything. A few quick wins are fine. A full strategy can wait until they understand the customer. I give the same advice to graduates starting their first job: let everyone know you exist before you try to prove yourself.

## A mistake to avoid

Hiring a senior head of marketing to build a team before anything is working. It is expensive and slow when what you need is learning fast.""",
"related": ["fractional-cmo-vs-agency-vs-full-time-marketer", "how-to-get-your-first-1000-customers-d2c", "what-is-a-good-ltv-to-cac-ratio"],
},
{
"slug": "fractional-cmo-vs-agency-vs-full-time-marketer",
"topic": "marketing-leadership",
"q": "Fractional CMO, agency or full-time marketer: which should a startup choose?",
"short": "Choose a fractional CMO when you need senior strategy and someone to build the system but cannot justify a full-time executive. Choose an agency when strategy is clear and you need execution in one channel. Choose a full-time marketer when a channel works and needs daily attention. Whichever you pick, get the tracking audited first. I have seen agencies start on broken data more than once.",
"body": """## Fractional CMO

Best for setting strategy, positioning, picking channels and building the first systems. When I work this way I take at most two clients at a time, on contracts of three months or more, with weekly reporting. My longer engagements follow a nine month arc: goals, tracking and a close look at past data first, then paid and organic tests and customer interviews, then automation, hiring and a handover to an in-house team. Wearwell's CMO, Erin Houston, said my frameworks accelerated their growth and gave them clear direction.

## Agency

Best for running a defined channel such as paid social or SEO at volume. The risk is that agencies optimise what they are measured on and rarely own the whole funnel. Before Frecious handed marketing to an agency, they asked me to audit their setup. I found a slow mobile site, a cookie consent issue that stopped the Facebook pixel firing and missing add to cart and checkout events. Without that audit the agency would have started on bad data.

## Full-time marketer

Best for running and improving channels that already work, every day. The risk is hiring too early, before you know what that person should focus on.

## A setup that works

A fractional lead sets direction and builds the measurement, one hands-on marketer runs it daily, and specialists or AI tools fill the gaps.

## Keep founders in control

Whatever you choose, the founders should own the decisions. A note I wrote early in my consulting work still applies: clients do not like to give up control, so always show them that they are in control. A good outside lead brings options and a recommendation, not a verdict.""",
"related": ["when-should-a-startup-hire-its-first-marketer", "how-to-get-your-first-1000-customers-d2c", "how-to-measure-the-roi-of-ai-in-marketing"],
},
{
"slug": "how-to-run-a-hands-on-ai-workshop-for-a-marketing-team",
"topic": "events-and-speaking",
"q": "How do you run a hands-on AI workshop for a marketing team or community?",
"short": "Keep theory to the first minutes and spend the rest building one real thing. Send setup instructions in advance, build in clear stages, give every exercise a time box, plan a demo slot and end with something live. My Claude 101 session with GrowthX filled all 100 seats and took people from a resume to a published website in four stages, ending with a working contact form.",
"body": """## Before the session

- Send a short setup list a few days ahead: accounts to create, files to bring
- Pick one build everyone completes, with a clear finished state
- Prepare a fallback for people whose setup breaks
- Rehearse the full run yourself. I ran an internal version of Claude 101 to test every stage before the live session.

## Build in stages

In Claude 101 each stage produces a version people can see:

- A plain first site from the resume
- A restyle inspired by a reference site
- A bold game style version to show what is possible
- A final version with a contact form saving leads to a database

Stages keep slower attendees on track, because each one ends with something that works.

## Time box every exercise

In my founder workshops at Masters' Union every exercise has a fixed length: 20 minutes to build an issue tree, 30 minutes to fill a value proposition canvas, 20 minutes to rank ten ideas. A visible time box keeps energy up and stops one table from taking over.

## The run of show

- A few minutes: what we build and why it matters
- Most of the time: live build, with the host building on screen while attendees follow
- 15 minutes: volunteers demo what they built and get feedback
- Last part: publish it live, then questions

## For organisers

Check wifi and power for every seat, ask attendees to bring laptops, and plan one helper per 20 to 25 people in person. Online, a chat moderator makes a big difference.

## Longer formats

For teams that want more, I am developing a two day weekend workshop: one day on an automated content system, one day where everyone builds a tool for their own work.""",
"related": ["keynote-or-workshop-which-should-your-event-book", "how-to-train-your-marketing-team-on-ai", "can-a-marketer-build-a-website-with-claude-without-coding"],
},
{
"slug": "keynote-or-workshop-which-should-your-event-book",
"topic": "events-and-speaking",
"q": "Should your event book an AI keynote or a hands-on AI workshop?",
"short": "Book a keynote when you want to inspire and align a large audience on where AI is taking their work. Book a hands-on workshop when you want people to leave able to do something new. I do both: more than 50 keynotes in 14 countries including three TEDx talks, a 15 minute talk at the Coditas AI showcase in Pune, and the Claude 101 workshop with GrowthX, which filled all 100 seats.",
"body": """## Keynote

- Audience: large, mixed roles, often a main stage
- Length: 15 to 45 minutes
- Outcome: a shared view of what is changing and what to do about it
- Needs: a stage, a screen, good audio

At Deployed, the AI showcase by Coditas in Pune on 27 June 2026, I had 15 minutes as the final speaker of the growth and marketing session. I cut my deck from 15 slides to 10 so every slide carried one idea the room could act on. A short slot rewards ruthless editing.

## Hands-on workshop

- Audience: up to about 100 online, or a smaller room in person
- Length: one hour to a full weekend
- Outcome: every attendee builds something real they keep
- Needs: laptops, reliable wifi, accounts set up in advance

Claude 101 with GrowthX is the model: people arrive with a resume and leave with a live site.

## How to choose

Start from the result you want for attendees. Ask what they should be able to do or decide after the session, and book the format that delivers it. My rule for any session I give is the same one I wrote years ago: people should walk out with ideas that are practical and steps that are actionable. A keynote can do that for a big room. A workshop does it more deeply for a smaller one.

## Pairing both

Many events pair a short keynote on the main stage with a workshop later for those who want to go deeper. The keynote creates the demand, and the workshop meets it.

## What organisers have said

Peter Szabo, a TEDx curator, wrote that I am very knowledgeable, the audience loved the talk, and I was easy to work with throughout the organising process.""",
"related": ["how-to-run-a-hands-on-ai-workshop-for-a-marketing-team", "how-to-brief-a-speaker-for-your-event", "how-to-train-your-marketing-team-on-ai"],
},
{
"slug": "how-to-brief-a-speaker-for-your-event",
"topic": "events-and-speaking",
"q": "How do you brief a speaker for your event?",
"short": "Give the speaker the audience, the goal and the logistics: who will be in the room and what they already know, what you want them to think or do afterwards, the format and exact length, the sessions around theirs and the technical setup. Exact details matter. At the Coditas AI showcase, knowing I had 15 minutes as the final speaker of the session shaped every slide I kept.",
"body": """## What to include

- Audience: roles, seniority, size and how familiar they are with the topic
- Goal: the one thing attendees should take away or be able to do
- Format: keynote, panel, fireside or hands-on, plus exact length including questions
- Slot: where the talk sits in the programme and what comes before and after
- Context: the theme of the event and what other speakers cover
- Logistics: date, venue or platform, arrival time, tech check, screen ratio, microphone type
- Promotion: what you need from the speaker, such as a photo, bio and a post

## Why the details change the talk

At Deployed in Pune I knew three things in advance: the session theme was growth and marketing, I was the last speaker of that session, and I had 15 minutes. That told me the room would already have heard several talks and would want something concrete to take home. I cut my deck from 15 slides to 10 and built it around one working example of AI lead generation.

For hands-on sessions the brief matters even more. For Claude 101 with GrowthX, attendees needed accounts set up before the day, so the setup list had to go out early.

## Ask the speaker for

- A short outline two weeks before
- Any setup needs, such as laptops for attendees or internet access
- A bio sized for your programme

## A short call helps

A written brief covers the facts. A 20 minute call covers the room: who the organiser hopes will be there, what went well last time and what fell flat. I prefer to have that call for every event I speak at.

## After the event

Share attendee feedback with the speaker. Good speakers use it, and it makes the next booking easier for both sides.""",
"related": ["keynote-or-workshop-which-should-your-event-book", "how-to-run-a-hands-on-ai-workshop-for-a-marketing-team", "how-to-train-your-marketing-team-on-ai"],
},
]

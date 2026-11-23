# Writer 1: case studies, playbooks and answers from Pratik's consulting and operating work.
# Sources: /home/claude/notion/consulting_raw.md, consulting.json, writing_raw.md, dl/txt.

CASES = [
{
"slug": "infento",
"company": "Infento",
"title": "Infento: building a direct to consumer engine from zero",
"desc": "How I built Infento's online marketing from scratch, from funnel and tracking to paid channels and awards, taking DTC sales from zero to 2M euro ARR.",
"industry": "Consumer hardware, STEM ride-on construction kits, D2C ecommerce",
"country": "Netherlands (Amsterdam), selling across Europe and the US",
"years": "2017 to 2019",
"role": "Led online marketing, founding team",
"short": "Infento makes life-size construction kits that families turn into bikes, go-karts and other rides. I joined the founding team in Amsterdam and built online marketing from zero: strategy, funnel, tracking, PR, SEO and paid. Direct to consumer sales grew from zero to 2M euro ARR, we ran the most funded STEM project on Kickstarter in 2018, and the product won the Red Dot, the German Design Award and Parent's Choice Gold.",
"challenge": "Infento had an innovative product and almost no sales pipeline. The company needed to earn revenue from its own online store as fast as possible, with no existing funnel, no tracking and no proof of which channels would work. Every euro had to come from people who had never heard of a constructible ride before, in several languages and countries at once.",
"what_i_did": [
"Laid out which backend tools we needed for short and long term goals, then installed tracking across the site and every ad platform before scaling spend",
"Wrote the marketing strategy, funnel and yearly roadmaps from scratch, with brand awareness first and conversion after",
"Tested many paid channels, then narrowed down to Facebook as the main acquisition channel and Google as the main conversion channel",
"Built online PR, press releases and award entries, which led to the Red Dot, the German Design Award and Parent's Choice Gold",
"Built SEO and organic content to sit next to paid, so we were not dependent on ads alone",
"Tested the checkout funnel along every axis, including a change from a discount code field to a gift card field that lifted conversion",
"Ran a weekly checkout checklist during big campaigns, covering every payment method by country, from iDeal to Giropay",
"Planned seasonal campaigns such as Christmas in phases, from asset mapping and photoshoots to translated ads and countdown timers"
],
"results": [
"Direct to consumer sales grew from zero to 2M euro ARR",
"Led the $848K Kickstarter, the most funded STEM project on Kickstarter globally in 2018",
"Won the Red Dot, the German Design Award and Parent's Choice Gold",
"The marketing team and the company grew a lot during my time, on the back of the online channel"
],
"lessons": """## Tracking before spend

The most useful week at Infento was the boring one where we set up tracking on every platform. Once we could see which ad brought which order, the decisions about where to spend almost made themselves.

## Narrow the channel mix

We tested many channels. Two did most of the work: Facebook to find new families, Google to catch people who were already searching. Cutting the rest gave the winners more budget and more data.

## Small checkout details matter

A discount code field sent people off to Google to hunt for codes, and some never came back. Renaming it to a gift card field kept them on the page. Look for these leaks before you buy more traffic.

## Awards are a marketing channel

Product awards gave press a reason to write about us and gave parents a reason to trust a new brand. Treat award entries like campaigns, with a calendar and an owner.""",
"testimonial": None,
"related_answers": ["should-your-checkout-have-a-discount-code-field", "facebook-ads-or-google-ads-for-a-d2c-brand", "how-to-get-your-first-1000-customers-d2c", "how-to-plan-a-christmas-campaign-for-ecommerce"],
"related_playbooks": ["test-your-ecommerce-checkout-before-a-campaign", "plan-a-christmas-campaign-for-an-ecommerce-brand", "launch-a-kickstarter-campaign"],
},
{
"slug": "infento-kickstarter",
"company": "Infento",
"title": "Infento on Kickstarter: the most funded STEM project of 2018",
"desc": "How I led Infento's second generation launch on Kickstarter: a lead list built before launch, a phased campaign and press outreach. $848K raised.",
"industry": "Crowdfunding, consumer hardware, STEM",
"country": "Netherlands, with backers worldwide",
"years": "2018",
"role": "Led the Kickstarter campaign strategy",
"short": "In 2018 Infento launched its second generation product lines on Kickstarter. I led the campaign strategy: the roadmap, who owned what, the pre-launch lead campaigns on Facebook and the press outreach. The campaign was funded almost as soon as it went live, raised $848K and became the most funded STEM project on Kickstarter globally that year.",
"challenge": "A Kickstarter campaign lives or dies in its first hours. Infento needed a strong start so the platform and the press would pick it up, and it needed that start to come from people who already wanted the product. The team was small, so every person needed a clear job and the plan had to leave room for things to break.",
"what_i_did": [
"Built the whole campaign strategy from the ground up and wrote the roadmap from pre-launch to fulfilment",
"Assigned clear responsibilities to each team member so nothing fell between people on launch day",
"Ran Facebook lead campaigns before launch to build a list of people who had said they wanted the product",
"Ran the campaign in phases, which left room to fix bottlenecks without stopping the whole thing",
"Created a media outreach plan so the campaign was covered while it was live"
],
"results": [
"$848K raised",
"The most funded STEM project on Kickstarter globally in 2018",
"Funded almost immediately after launch, which gave press a story from day one"
],
"lessons": """## The list is the campaign

Most of the work happened before launch. The people on our lead list had raised their hand weeks earlier, so on launch day we were not asking strangers to trust us. We were telling interested people the doors were open.

## Phases protect you

We split the campaign into phases on purpose. When something broke, such as an ad set that stopped working or a question we had not prepared for, we fixed it inside one phase instead of mid-launch chaos.

## Give every person one job

On a small team, launch day is where unclear roles hurt most. A short list of owners and tasks did more for us than any tool.""",
"testimonial": {"quote": "Pratik was a top performer at Infento and made a significant impact, especially with Kickstarter. I would confidently hire Pratik, anytime, for any project.", "person": "Rogier Groen", "role": "CMO, Infento"},
"related_answers": ["how-to-plan-a-kickstarter-campaign", "how-to-get-your-first-1000-customers-d2c", "how-to-validate-a-startup-idea-with-a-small-ad-budget"],
"related_playbooks": ["launch-a-kickstarter-campaign", "layer-your-audiences-on-paid-social"],
},
{
"slug": "vu",
"company": "VU (Vertical Unit)",
"title": "VU: making a Swiss goggle brand the choice of pro skiers",
"desc": "How I rebuilt VU's webshop and marketing as Head of Marketing: Olympian proof, customer words in ads, Hotjar-led fixes. 275K+ euro revenue, 4.4x peak season.",
"industry": "Ski and snowboard goggles, premium D2C ecommerce",
"country": "Switzerland, selling in English, German and French",
"years": "2021 to 2025",
"role": "Head of Marketing, founding team",
"short": "VU makes magnetic ski and snowboard goggles in Switzerland. As Head of Marketing on the founding team, I rebuilt the marketing strategy and the webshop, put athlete proof and guarantees up front, and wrote ads in the words customers used. VU became the number one Swiss brand for pro skiers and snowboarders, used by Olympians at the 2022 Olympics, with 275K+ euro in revenue and 4.4x growth in peak season.",
"challenge": "When I joined, sales were slumping. The site used generic claims any goggle brand could make, product pages did not match the feel of the homepage, and visitors left before they understood what made the goggles different. The brand had real proof, athletes and a lifetime guarantee, but it was hidden.",
"what_i_did": [
"Rebuilt the marketing strategy and redesigned the webshop, then optimised the checkout funnel with outside UX and CRO freelancers",
"Watched Hotjar recordings and cut homepage text to two or three sentences per block, because long text was losing people",
"Replaced the hero with an Olympic athlete image and gave the magnets and design their own sections, the way a phone launch page would",
"Put guarantees, free returns, production photos and named athlete testimonials on the homepage",
"Built a bank of customer phrases, such as changing lenses without taking off gloves, and used them in ads and pages",
"Briefed product images like a premium marketplace listing: magnets first, then materials, then a comparison with ordinary goggles",
"Diagnosed the funnel by comparing add to cart rate and cart abandonment with benchmarks, which showed the problem was the decision to buy, not the checkout",
"Set a launch order for new markets: site working in English and German, then trust, then SEO content, then email, then ads"
],
"results": [
"Number one Swiss brand for pro skiers and snowboarders",
"Used by Olympians at the 2022 Olympics",
"275K+ euro in revenue",
"4.4x growth in peak season"
],
"lessons": """## Proof beats adjectives

Words like brilliant and highest quality could sit on any goggle site. What only VU could say was that Olympians and freeride champions wear it, and that it comes with a lifetime guarantee. Moving that proof to the top of the page did more than any copy rewrite.

## Find the leaking step first

Our add to cart rate was low while cart abandonment was healthy. That told us people who decided to buy did buy. The work was on the product page, with rider videos, guarantees and better images, and not on the checkout.

## Customers write the best ads

The phrases that worked came from reviews and conversations: no fogging, no squinting, swap lenses in seconds with gloves on. I kept them in one list so every ad and page could use them.""",
"testimonial": None,
"related_answers": ["how-to-find-where-your-ecommerce-funnel-leaks", "how-to-make-a-premium-ecommerce-site-more-trustworthy", "how-to-write-ad-copy-in-your-customers-words"],
"related_playbooks": ["run-a-weighted-ux-audit-of-a-landing-page", "build-an-ad-specifications-checklist-for-creative-briefs"],
},
{
"slug": "bueno",
"company": "Bueno",
"title": "Bueno: building fintech marketing alone across 28 countries",
"desc": "How I built Bueno's online marketing single-handedly across 28 countries for foreign property owners in Spain, reaching a 24x LTV to CAC ratio.",
"industry": "Fintech for foreign property owners in Spain",
"country": "Spain, with customers in 28 countries including Norway, Sweden, the UK and Germany",
"years": "January 2022 to present",
"role": "Leads growth, founding team",
"short": "Bueno helps foreign property owners in Spain with banking, bills and non-resident tax in their own language. I lead growth on the founding team and built the online marketing single-handedly across 28 countries. The model works at a 24x LTV to CAC ratio, a 700 euro lifetime value against a 30 euro acquisition cost, built through language-specific ads, customer research and a weekly cadence of small growth projects.",
"challenge": "Bueno sells something people do not search for until they are in pain: help with Spanish banks, bills and tax paperwork, from abroad. The customers are spread across many languages, many are retired and not comfortable with apps, and many distrust banks after bad experiences. There was no marketing team, no funnel and no brand awareness when I started.",
"what_i_did": [
"Built paid acquisition on Meta and Google in several languages, with separate funnels for each market",
"Studied our paying British customers to see who set up direct debits and became active, then targeted lookalikes of that group",
"Wrote personas for Norwegian owners from real customer feedback, such as the need for support in Norwegian and guided sign up",
"Tested message angles market by market; in the UK, savings and service angles failed while the hidden charges angle won clearly",
"Set up a referral programme with rewards for both sides, then learned that timing and friction mattered more than the reward",
"Ran growth as weekly mini-projects: three to six a week, done by Friday, next week planned by Saturday",
"Read session recordings and scroll data, which showed that the hook above the fold carried almost all the weight on key pages",
"Removed Audience Network placements after they inflated click-through rates with low quality clicks"
],
"results": [
"Online marketing built single-handedly across 28 countries",
"24x LTV to CAC: 700 euro lifetime value against a 30 euro acquisition cost",
"A repeatable way to open a new language market: research, message tests, then scale"
],
"lessons": """## Language is the product

For many Bueno customers, the deciding factor was support in their own language. One Norwegian customer chose us over a local bank after seeing an ad with Norwegian support, and activated the same day. That insight shaped every market launch after it.

## Test the angle before the audience

In the UK, we assumed people wanted savings or better service. Neither worked. Telling them about hidden charges they did not know they were paying did. Run several angles side by side before deciding a market is weak.

## Small weekly bets beat big plans

As a one-person growth team, I could not run big programmes. Three to six mini-projects a week, each finished by Friday, kept the work moving and gave me a steady stream of learnings.

## Watch the quality of clicks

A very high click-through rate is not always good news. Some placements send cheap, accidental clicks. Check where clicks come from before you celebrate.""",
"testimonial": None,
"related_answers": ["how-to-enter-a-new-country-market", "what-is-a-good-ltv-to-cac-ratio", "how-to-run-growth-as-a-one-person-marketing-team", "why-do-cash-referral-rewards-fail", "why-is-my-facebook-ad-ctr-suspiciously-high"],
"related_playbooks": ["test-message-angles-in-a-new-country", "build-customer-personas-from-your-paying-customers", "set-up-a-customer-referral-programme", "run-weekly-mini-projects-as-a-growth-team"],
},
{
"slug": "sweek",
"company": "Sweek",
"title": "Sweek: cutting acquisition cost by more than half for a story app",
"desc": "How I advised Sweek's CEO in 2017: an influencer launch, a trained team with written channel rules, and paid campaigns rebuilt to cut acquisition cost 50%+.",
"industry": "Self-publishing and story reading app",
"country": "Netherlands (Rotterdam), with campaigns in Europe, Latin America and Southeast Asia",
"years": "2017",
"role": "Marketing advisor to the CEO",
"short": "Sweek is an app where people write, publish and read stories. In 2017, as it moved from product market fit to growth, I worked as marketing advisor to the CEO alongside the CMO. I ran an influencer launch, rebuilt paid campaigns across Facebook, Google and Instagram, wrote channel rules, and trained the team on frameworks like the North Star Metric. Acquisition cost came down by more than 50%.",
"challenge": "Sweek was marketing in many countries at once, with national teams and fixed budgets per country but no shared structure. Campaigns did not follow each platform's own guidelines, the team had no written processes, and cost per install was too high to scale.",
"what_i_did": [
"Analysed data across platforms and countries, then moved budget toward the countries and channels that returned more",
"Filtered influencers for authentic audiences and negotiated with two large creators to run a targeted campaign at the same time",
"Rebuilt Facebook, Google, Taboola and Instagram campaigns to follow each platform's guidelines",
"Optimised the landing pages for paid campaigns and installed advanced tracking events in Facebook and Google",
"Wrote an AdWords audit and a keyword research method for writers and readers, with positive and negative keyword lists",
"Documented the dos and don'ts for each channel so the team knew when to do what",
"Trained the CMO and the team on 80/20, RACI, the North Star Metric and the One Metric That Matters",
"Automated campaigns once we found the right fit between cost per install and campaign"
],
"results": [
"Acquisition cost cut by more than 50% on paid channels",
"An influencer launch that drove a large spike in app downloads within its first day",
"A team with written channel rules and better internal communication, and a clear year on year improvement against its OKRs"
],
"lessons": """## Structure before spend

Sweek did not need more budget. It needed budgets to follow results instead of fixed country plans. Once the data decided where money went, cost per install fell.

## Influencers work when the fit is real

We turned down large accounts that did not match. The two creators we chose had audiences who actually wrote and read stories, and the campaign ran on both at once, so the effect stacked.

## Write it down

Training only lasts if the rules live in a document. A simple dos and don'ts page per channel kept the team consistent long after the sessions ended.""",
"testimonial": None,
"related_answers": ["how-to-cut-customer-acquisition-cost-on-paid-ads", "do-influencer-campaigns-work-for-app-installs", "how-to-split-a-marketing-budget-across-countries"],
"related_playbooks": ["audit-a-google-search-ads-campaign", "do-keyword-research-for-search-ads-and-seo"],
},
{
"slug": "font-neuve",
"company": "Font Neuve",
"title": "Font Neuve: from no bookings to fully booked during COVID",
"desc": "How I built a French holiday resort's first online presence in weeks in 2020, found a new home market with layered targeting and filled the season.",
"industry": "Hospitality, holiday resort",
"country": "France",
"years": "June to August 2020, then ad hoc support",
"role": "Marketing consultant",
"short": "Font Neuve is a holiday resort in France that relied on Dutch guests. In 2020, COVID closed the borders and bookings stopped. The founders had never marketed online. In a few weeks I built their website, tracking and social channels, then found a new audience in France with layered targeting on Facebook. The resort was fully booked for the season.",
"challenge": "The resort's guests came almost entirely from the Netherlands, and travel restrictions cut that market off. There was no website fit for selling, no tracking, no social channels and no experience with online marketing. The goal was modest: reach break even in a season that looked lost, in a market the resort had never sold to.",
"what_i_did": [
"Built a new website with designers and developers within a week",
"Installed tracking on every online tool and platform before spending on ads",
"Set up all social media channels from scratch and published the existing content",
"Had campaigns live within two weeks of starting, using a lean approach",
"Targeted French audiences in layers, starting narrow and widening only when a layer proved itself",
"Ran most of the budget on Facebook because it gave the lowest cost per click and per booking, then kept optimising"
],
"results": [
"The resort was fully booked within weeks, well beyond the break even goal",
"A proven audience model in France that the founders can reuse",
"The founders started treating online marketing as a core channel",
"A three month contract became a long term working relationship"
],
"lessons": """## Speed over polish

We had weeks, not months. A simple site, working tracking and live campaigns in two weeks beat a perfect launch in two months.

## Layer your audiences

With a new market and a small budget, I did not want to spend on everyone. Testing audiences in layers meant we never wasted much on a bad guess, and we kept the good ones.

## One channel can be enough

Facebook was cheaper per booking, so it got most of the money. Spreading budget evenly across channels to look thorough would have slowed us down.""",
"testimonial": {"quote": "Pratik thank you very much for all your help during our last season helping to get our holiday houses fully booked after all the annulations because of covid. You saved our season. Thanks also for all your quick reply. It has been a pleasure working with you.", "person": "Wilbert Elferink", "role": "CEO, Font Neuve"},
"related_answers": ["how-to-get-bookings-fast-when-your-main-market-disappears", "facebook-ads-or-google-ads-for-a-d2c-brand"],
"related_playbooks": ["layer-your-audiences-on-paid-social", "run-a-weighted-ux-audit-of-a-landing-page"],
},
{
"slug": "le-patron",
"company": "Le Patron",
"title": "Le Patron: a full funnel for a cycling menswear brand",
"desc": "How I gave a Dutch cycling-inspired menswear brand a full funnel: hyper-specific targeting, shopping and remarketing, and yearly Christmas campaigns.",
"industry": "Cycling-inspired menswear, D2C ecommerce",
"country": "Netherlands, selling mainly in the Netherlands and Belgium",
"years": "2016 to 2020",
"role": "Marketing consultant",
"short": "Le Patron makes stylish clothing for cyclists. It did not know how to find its audience online and had no structure. Over several years I set up its objectives, KPIs and funnel, targeted cyclists through the brands, teams and races they followed, and ran yearly campaigns for spring, summer and Christmas, each one built on what the last one taught us.",
"challenge": "Menswear is a crowded ad market. Broad fashion targeting would put Le Patron up against large brands with far bigger budgets. The brand needed to reach a narrow group, men who ride road bikes and care about how they look, and it needed a structure to learn from every campaign.",
"what_i_did": [
"Wrote the primary structure: business objective, strategy, goals and tactics, and the KPIs for each",
"Mapped the funnel from awareness through consideration and decision to retention, with a channel for each step",
"Used the Facebook developer platform to target people interested in specific pro teams, riders, races and cycling brands",
"Set up Google Shopping feeds and display remarketing, and remarketed products to customers by product type",
"Ran spring, summer and Christmas campaigns and reported on each with clear learnings",
"Wrote a Christmas brief with a week by week timeline, a pre-launch technical checklist and a target priority list",
"Ran an Instagram follower campaign and tested carousels against single images and videos"
],
"results": [
"Web shop sales grew strongly year on year while the funnel was in place",
"Clear learnings that shaped the budget: Google retargeting and shopping returned far more than prospecting",
"Lookalike audiences in the Netherlands and carousel ads became the default starting point for campaigns",
"The account's biggest follower growth since it started, from one short campaign"
],
"lessons": """## Target the passion, not the category

Targeting men's fashion alone put us in an expensive auction. Targeting people who follow specific cycling teams and brands found the real audience at a lower cost.

## Every campaign should teach the next one

Each season ended with a short report: what worked, what did not, what we change. By 2020 the Christmas brief started from proven audiences and formats instead of guesses.

## Admit when you rushed

One campaign grew followers fast, but we moved too quickly to keep a proper hypothesis log. Results without a record of why are hard to repeat.""",
"testimonial": None,
"related_answers": ["facebook-ads-or-google-ads-for-a-d2c-brand", "how-to-plan-a-christmas-campaign-for-ecommerce"],
"related_playbooks": ["layer-your-audiences-on-paid-social", "set-up-remarketing-audiences-based-on-intent", "plan-a-christmas-campaign-for-an-ecommerce-brand"],
},
{
"slug": "pcp-personal-city-plan",
"company": "PCP (Personal City Plan)",
"title": "PCP: validating a startup idea in 12 weeks, and knowing when to stop",
"desc": "How I built an MVP funnel for Personal City Plan in a week, ran tightly targeted ads and gave founders and investors a clear answer on viability.",
"industry": "Travel and city planning, early-stage validation",
"country": "Netherlands",
"years": "May to July 2018",
"role": "Marketing consultant",
"short": "Personal City Plan was an idea that needed proof. The founders asked me to test, in three months and on a small budget, whether people really needed it. I built an MVP funnel in a week, ran targeted Facebook and Google campaigns, and tracked both numbers and behaviour. The campaigns performed well, but the qualitative data showed the pain was too small to scale, so the founders shelved it.",
"challenge": "The founders did not want growth yet. They wanted an honest answer: is there a real need, and can this become a business? That meant a sample big enough to trust, on a budget small enough to lose, and data that went beyond clicks.",
"what_i_did": [
"Built an MVP and an MVP funnel in a week, with a 12 week roadmap",
"Ran Facebook and Google paid campaigns from week one, creating content as we went",
"Used the Facebook developer platform to find niche audiences, and long tail keywords on Google",
"Set up tracking and user behaviour analysis to see whether people used the product the way we hoped",
"Optimised landing pages on the fly and set up retargeting and a cart abandonment email flow within 48 hours",
"Presented the results to founders and investors with a recommendation on viability"
],
"results": [
"Strong campaign metrics and a steady fall in acquisition cost over the test",
"A clear finding: the product did not solve a big enough pain to scale",
"The founders shelved the project early, before spending on a full build"
],
"lessons": """## Good ads can hide a weak idea

Our click and conversion numbers looked healthy. The behaviour data and conversations told a different story. If we had only watched the ad dashboard, we would have recommended scaling something that could not grow.

## A no is a result

Stopping after twelve weeks saved the founders far more than the test cost. I count this as one of my better engagements, even though the product did not launch.""",
"testimonial": {"quote": "Pratik added great value. Due to his thoroughness and hard work we were able to execute the correct measures. His communication is clear and consistent, besides he always had the patience to explain and help me understanding what he was doing. It's a pleasure working with him!", "person": "Jet Oesterreicher", "role": "CEO, PCP"},
"related_answers": ["how-to-validate-a-startup-idea-with-a-small-ad-budget", "how-to-get-your-first-1000-customers-d2c"],
"related_playbooks": ["layer-your-audiences-on-paid-social", "set-up-remarketing-audiences-based-on-intent"],
},
{
"slug": "smpc",
"company": "SMPC (Swiss MPC)",
"title": "SMPC: a conversion audit and lean plan for a niche B2B service",
"desc": "How I audited a Swiss medical device compliance firm's website, rewrote the order of its message, and planned lean marketing for a niche audience.",
"industry": "B2B regulatory compliance services for medical device companies",
"country": "Switzerland",
"years": "2021, with a new marketing plan in 2025",
"role": "Marketing consultant",
"short": "SMPC helps medical device companies meet regulatory and design control requirements. Its website looked premium and expert but did not turn visitors into leads. I scored the site in eight areas, found the bottlenecks, and rewrote the landing page around six questions a visitor asks in order. I also ran Jobs to be Done research and later proposed a lean, staged marketing plan for a very niche audience.",
"challenge": "SMPC's buyers are a small group of specialists. The site had real depth and an elegant design, but conversion was the weakest of the areas I scored, pages loaded slowly and the headline talked about the company instead of the client. Broad marketing would waste money on people who would never buy.",
"what_i_did": [
"Scored the site across user experience, conversion, SEO, performance, technical setup, accessibility, content and legal",
"Listed what already worked: expert copy, premium design, good hierarchy and a helpful tone",
"Flagged slow page speed as a credibility and conversion problem, with a target load time under two seconds",
"Rewrote the landing page flow around six questions: what can you do for me, why should I care, show me more, how can I be sure, what about my objections, what do you want me to do",
"Wrote Jobs to be Done interview questions to learn why clients hire a compliance partner",
"Built personas for small and large companies",
"Proposed a staged plan: Google Ads, SEO, LinkedIn content and conversion work for three months, then LinkedIn ads and outreach"
],
"results": [
"A prioritised list of fixes, from the headline to trust signals and calls to action",
"A clear message order the team could apply to every service page",
"A lean marketing plan sized for a niche audience instead of a broad one"
],
"lessons": """## Answer questions in the order people ask them

Visitors do not want your history first. They want to know what you can do for them, why it matters, and how they can be sure. Put those answers in that order and the page starts to sell.

## Niche means focus

With a small buyer group, I recommended starting with the few channels where those buyers already look, plus conversion work, and adding more only after three months. Spending on everything would have spent the budget on no one.""",
"testimonial": None,
"related_answers": ["what-should-a-b2b-services-homepage-say", "how-to-market-a-niche-b2b-service-on-a-small-budget"],
"related_playbooks": ["fix-the-message-order-on-a-b2b-landing-page", "interview-b2b-buyers-with-jobs-to-be-done-questions", "run-a-weighted-ux-audit-of-a-landing-page"],
},
{
"slug": "frecious",
"company": "Frecious",
"title": "Frecious: a tracking and site audit before the agency handover",
"desc": "How I checked a Dutch organic drinks brand's site speed, cookie consent, pixel and tag setup before it handed marketing to an agency.",
"industry": "Organic cold pressed drinks, ecommerce",
"country": "Netherlands",
"years": "Advisory, before the agency handover",
"role": "Advisor to the CMO",
"short": "Frecious makes organic cold pressed drinks. I advised its CMO on marketing campaigns, and before the company handed marketing to an agency, I audited the website and tracking. I found a slow mobile site, a cookie consent issue that stopped the Facebook pixel from firing, and missing add to cart and checkout events. The agency started with a clean list of what to fix.",
"challenge": "An agency is only as good as the data it gets. If tracking is broken on day one, the agency optimises on wrong numbers and the brand pays for it. The CMO wanted an independent check before signing over the accounts.",
"what_i_did": [
"Recommended an automated uptime monitor, the same free tool we used at Infento",
"Tested page speed for ad traffic landing on the homepage, and found lazy loading images was the biggest single win",
"Found that on return visits the cookie consent popup did not show, so the Facebook pixel never fired and conversions were missed",
"Reviewed Google Tag Manager and found no add to cart or checkout events sent to Facebook or Google, and no cart value",
"Flagged that search console access needed checking",
"Wrote it all into a report the CMO could hand to the agency"
],
"results": [
"A clear, prioritised fix list delivered before the agency took over",
"Missing conversion signals identified before any new budget was spent"
],
"lessons": """## Audit before you hand over

Most of what I found was invisible from the ad dashboards. A pixel that only fires after consent, and only when the popup shows, quietly under-reports sales for months.

## Speed is a tracking issue too

When paid traffic lands on a slow mobile page, people leave before anything is tracked. Fixing speed improves both conversion and the data the agency learns from.""",
"testimonial": None,
"related_answers": ["what-to-check-before-hiring-a-marketing-agency"],
"related_playbooks": ["audit-tracking-before-handing-marketing-to-an-agency", "run-a-weighted-ux-audit-of-a-landing-page"],
},
{
"slug": "nest",
"company": "Nest (Talk To Us)",
"title": "Nest: a launch plan for a wellbeing platform for professionals",
"desc": "How I wrote the launch plan for Nest, a two-sided wellbeing platform for doctors and other high-pressure professionals: personas, push and pull, milestones.",
"industry": "Wellbeing platform and marketplace for high-pressure professionals",
"country": "India",
"years": "2022",
"role": "Growth lead for the launch",
"short": "Nest set out to give doctors, consultants and other high-pressure professionals easy access to experts and a safe community. I wrote the launch marketing plan: the three problems to solve, positioning around wellbeing, three personas, a two-sided marketplace plan with push and pull tactics, and a ladder of community milestones. The early milestones were reached with just an MVP landing page.",
"challenge": "Many professionals under pressure do not reach out for support. There is a taboo, access is hard at the moment they need it, and there is no safe community of peers. Nest also had to build both sides of a marketplace at once: the professionals who need support and the experts who give it.",
"what_i_did": [
"Named the top three problems: the taboo of reaching out, access when vulnerable, and no safe community",
"Positioned Nest around wellbeing and better selves at every step, instead of long term therapy",
"Defined three personas: healthcare workers, consulting professionals and people in government forces",
"Planned the supply side as a small group of carefully verified experts, recruited by manual outreach",
"Split demand tactics into push, such as outreach, content and paid, and pull, such as partner communities and member referrals",
"Built a milestone ladder for the community, each step tied to a channel or product release",
"Wrote a week by week launch plan, from website and payment setup to first ads, community outreach and a Product Hunt checklist",
"Designed an events series where members share their stories"
],
"results": [
"A complete launch plan the team worked from week by week",
"The first community milestones reached with only an MVP landing page"
],
"lessons": """## Positioning lowers the barrier

People who would never book therapy will join a group about being their best self at work. Choosing that frame was the most important marketing decision in the plan.

## Supply is small, demand is large

In this marketplace we needed many members and only a small number of excellent experts. That changed the plan: careful manual recruiting on the supply side, community and partnerships on the demand side.

## Milestones keep a launch honest

A ladder of community sizes, each with its own tactics, told us what to do next and stopped us from jumping to paid ads before the basics worked.""",
"testimonial": None,
"related_answers": ["how-to-launch-a-two-sided-marketplace", "how-to-get-your-first-1000-customers-d2c"],
"related_playbooks": ["plan-the-launch-of-a-two-sided-marketplace"],
},
{
"slug": "growack",
"company": "Growack",
"title": "Growack: marketing for a B2B growth agency and HubSpot partner",
"desc": "My work as Head of Marketing at Growack, a B2B growth agency and HubSpot partner in Amsterdam: HubSpot setup, goals, budget and an execution plan.",
"industry": "B2B inbound and growth marketing agency, HubSpot partner",
"country": "Netherlands (Amsterdam)",
"years": "2020",
"role": "Head of Marketing",
"short": "Growack is a B2B inbound and growth marketing agency and a HubSpot partner. As Head of Marketing in 2020, I helped implement HubSpot, set the goal plan and budget, built lead generation sheets and wrote the execution plan for 2021. I also compared on-site pop-up tools and set up video training for the team. It was my main B2B role, after years of consumer brands.",
"challenge": "An agency that sells marketing has to market itself well, and it rarely has time to. Growack needed its own CRM set up properly, clear goals and a budget, and a plan the team could run without the head of marketing in every meeting.",
"what_i_did": [
"Helped implement HubSpot for the company's own marketing and sales",
"Wrote a goal setting plan and a marketing budget",
"Built lead generation sheets for outbound and inbound work",
"Worked on pricing and packaging material for HubSpot partner services",
"Compared on-site pop-up tools before choosing one",
"Set up video training for the team",
"Wrote the 2021 execution plan"
],
"results": [
"A working HubSpot setup for the agency's own pipeline",
"A goal plan, budget and execution plan the team could run in 2021"
],
"lessons": """## B2B rewards process

Compared with consumer brands, B2B marketing at Growack was less about a winning ad and more about a clean CRM, clear stages and steady follow up. The work that paid off was setup work.

## Plan the next year before it starts

Writing the 2021 execution plan in advance gave the team a clear list of what to do each month, so marketing did not stop whenever client work got busy.""",
"testimonial": None,
"related_answers": ["how-to-market-a-niche-b2b-service-on-a-small-budget", "when-should-a-startup-hire-its-first-marketer"],
"related_playbooks": ["prioritise-a-growth-backlog-by-effort-and-impact"],
},
{
"slug": "bayer-executive-event",
"company": "Bayer",
"title": "Bayer: running a 250K euro global senior executive event",
"desc": "In 2017 I ran a 250K euro global senior executive event for Bayer in Germany, working directly with senior leaders across the company.",
"industry": "Pharmaceuticals and life sciences",
"country": "Germany",
"years": "2017",
"role": "Ran the global senior executive event",
"short": "In 2017 I joined Bayer in Germany to run a global event for its senior executives, with a 250K euro budget. It was my first time working closely with the leaders of a global company of that size. The project taught me how senior people communicate, and gave me the habit I still teach graduates today: meet one new person a week and learn what they need.",
"challenge": "A senior executive event has no room for error. The audience is the company's top leadership, the budget is large, and many teams across countries have a stake in it. I had to deliver on time and on budget while earning trust from people far more senior than me.",
"what_i_did": [
"Ran the event end to end with a 250K euro budget",
"Worked directly with senior leaders and the teams around them",
"Made a habit of meeting one new person a week, noting one strong quality and one need for each",
"Watched how senior leaders ran meetings and made decisions, and applied it to my own work"
],
"results": [
"Delivered a 250K euro global senior executive event",
"A working method for building relationships fast in a large company, which I still use and teach"
],
"lessons": """## Know everyone early

The first thing I did was list the people I would work with, rank them, and book short meetings. For each person I wrote down one thing they did well and one thing they needed from the project. It made every later request easier.

## Watch how leaders talk

I had never spoken with senior executives of a global company before. I learned more from watching how they framed decisions than from any course. Graduates I coach ask how to start a new job. My answer comes from this project: meet people, and listen first.""",
"testimonial": None,
"related_answers": ["how-to-run-growth-as-a-one-person-marketing-team", "how-to-brief-a-speaker-for-your-event"],
"related_playbooks": ["run-weekly-mini-projects-as-a-growth-team"],
},
]

PLAYBOOKS_EXTRA = [
{
"slug": "run-a-weighted-ux-audit-of-a-landing-page",
"title": "Run a weighted UX audit of a landing page",
"desc": "My UX audit template: score a page task by task across forms, layout, interaction, privacy and trust, weight each check, and fix the heavy ones first.",
"who": "Founders, growth marketers and designers reviewing a page before buying traffic",
"time": "Half a day for one page, plus fixes",
"tools": ["A spreadsheet or Notion database", "Hotjar or another session recording tool", "Nielsen Norman Group articles as sources"],
"short": "List every check as a yes or no question, give each a weight of high, medium or low, and link the research behind it. Walk the page category by category: forms, layout, visual design, interaction, privacy and trust. Add up the score, then fix the failed high weight checks first. I built this template in 2021 and used it on client sites such as Le Patron and Font Neuve.",
"steps": [
("Set up the sheet", "Create one row per check with columns for category, weight (high, medium, low), yes or no, the source behind it and a score formula. A source next to each check stops arguments about taste."),
("Audit forms first", "Forms lose the most people. Check that the form explains why it is needed, fields sit in one column, the number of fields is minimal, the right keyboard opens on mobile, and errors point to the exact field in real time."),
("Check layout and hierarchy", "Related information should be grouped, blocks should have enough space between them, and the visual hierarchy should lead to the main action. Hierarchy must not rely on colour alone."),
("Check interaction", "Buttons need a clear call to action and a standard shape, clickable elements should react on hover, icons need captions, and users must be able to cancel, skip onboarding and undo."),
("Check privacy", "There should be a cookie permission request with a real option to refuse, and access to phone functions should only be asked for in context."),
("Check trust signals", "Look for reviews from real customers, an About page, a physical address, certificates or awards, and an SSL certificate. Missing trust is a common reason good traffic does not convert."),
("Score and rank", "Add up the score per category. Sort failed checks by weight, then by effort, and fix the high weight, low effort items first."),
("Confirm with recordings", "Watch session recordings on the fixed page. If people still hesitate in the same place, the checklist missed something and you add a new row.")
],
"pitfalls": ["Treating every check as equal instead of weighting them", "Auditing desktop only when most paid traffic is mobile", "Fixing what is easy instead of what is heavy", "Skipping the source column, which turns the audit into opinion"],
"related_answers": ["how-to-make-a-premium-ecommerce-site-more-trustworthy", "how-to-find-where-your-ecommerce-funnel-leaks", "what-should-a-b2b-services-homepage-say"],
"proof": "I built this UX audit template in 2021 and applied it to client sites including Le Patron and Font Neuve.",
"proof_link": "/consulting/",
},
{
"slug": "build-an-ad-specifications-checklist-for-creative-briefs",
"title": "Build an ad specifications checklist for creative briefs",
"desc": "Keep one page per platform and format with design, text and technical rules, so designers deliver ads that run first time on every channel.",
"who": "Marketers who brief designers or agencies on paid social and display ads",
"time": "One day to set up, then minutes per brief",
"tools": ["Notion or a shared doc", "Each platform's official ad specs page", "Your brand guidelines"],
"short": "Make one page for each platform and ad format, such as a Facebook carousel or an Instagram story video. On each page keep three lists: design recommendations, text recommendations and technical requirements. Link it in every creative brief. Designers stop guessing sizes and limits, and ads stop getting rejected or cropped. I built this library in 2021 across Facebook, Instagram, Pinterest, Quora, Google Display and Twitter.",
"steps": [
("List the platforms you actually use", "Start with the channels in your current media plan. For each, list the formats you run, for example carousel, video, image and collection on Facebook, or square, rectangle, skyscraper and leaderboard on Google Display."),
("Create one page per format", "Give every format its own page so a designer can open exactly what they need."),
("Split each page into three lists", "Design recommendations, such as safe zones and how much text sits on the image. Text recommendations, such as headline and description length. Technical requirements, such as ratio, resolution, file type and file size."),
("Copy values from the source", "Take values from each platform's official specs and link the page. Platforms change specs often, so add the date you last checked."),
("Add your brand layer", "Note which brand rules apply per format, such as logo placement in the first seconds of a video or the product always shown in the first carousel card."),
("Link it in every brief", "Every creative brief should name the platform and format and link the page. VU briefs went further and described each image in order, such as magnets first, then materials, then a comparison."),
("Review twice a year", "Set a reminder to recheck all values. An outdated spec sheet is worse than none because people trust it.")
],
"pitfalls": ["Keeping specs in someone's head", "Never updating values after platforms change them", "Mixing design advice and hard technical limits in one list", "Briefing a format without saying what each frame or card must show"],
"related_answers": ["how-to-write-ad-copy-in-your-customers-words", "how-to-cut-customer-acquisition-cost-on-paid-ads"],
"proof": "I built an ad specifications library by platform and format in 2021 and used structured creative briefs for VU's product images.",
"proof_link": "/work/vu/",
},
{
"slug": "test-your-ecommerce-checkout-before-a-campaign",
"title": "Test your ecommerce checkout before a campaign",
"desc": "The weekly checkout checklist I ran at Infento during campaigns: add to cart, contact, shipping and every payment method by country.",
"who": "Ecommerce founders and marketers about to spend on a big campaign",
"time": "30 minutes a week during the campaign",
"tools": ["A shared checklist sheet", "Test cards and test accounts for each payment method", "A phone and a desktop browser"],
"short": "Before and during any big campaign, walk through the checkout by hand every week and tick each step: add to cart on every product page, contact fields, shipping fields, coupon field, and every payment method you offer, country by country. If anything fails, report it the same day. At Infento we ran this every week of our spring campaign after checkout pages had broken in the past.",
"steps": [
("Write down why", "Put one line at the top: a broken checkout during a paid campaign wastes the whole budget. It keeps the check from being skipped on busy weeks."),
("Test adding to cart", "Add a product from the all products page and from each product page. Check the checkout button in the cart pop-up, the cart icon at the top, and editing the cart."),
("Test contact details", "Fill in name and email, continue to shipping, and check that cart details, trust badges and payment logos show correctly."),
("Test shipping", "Fill in every field: address, town, country, postal code, company and phone. Try the coupon or gift card field. Continue to payment."),
("Test every payment method", "Reach the payment portal with each method you offer. At Infento that meant cards, PayPal, Giropay for Germany, iDeal for the Netherlands, Bancontact for Belgium, Sofort and CB for France."),
("Check the wording of fields", "Look at how each field reads to a buyer. At Infento, a field called discount code sent people to search for codes. Calling it a gift card code kept them on the page and lifted conversion."),
("Log and report", "Tick each step with a date. If something fails, report it immediately to whoever can fix it, and pause spend on the affected market if needed.")
],
"pitfalls": ["Testing only on desktop", "Testing one payment method and assuming the rest work", "Running the check once at launch and never again", "Labels that invite visitors to leave and search for discounts"],
"related_answers": ["should-your-checkout-have-a-discount-code-field", "how-to-find-where-your-ecommerce-funnel-leaks"],
"proof": "I ran this weekly checkout checklist at Infento during our spring campaign, across payment methods in five countries.",
"proof_link": "/work/infento/",
},
{
"slug": "plan-a-christmas-campaign-for-an-ecommerce-brand",
"title": "Plan a Christmas campaign for an ecommerce brand",
"desc": "A phased plan from September to December: review past years, prepare assets, test in October, launch gift ads in November and boost in December.",
"who": "D2C founders and ecommerce marketers",
"time": "Start in September, run to the end of December",
"tools": ["Ads Manager and Google Ads", "Email platform", "Countdown timer for site and email", "A shared campaign calendar"],
"short": "Start in September, not November. Review what each past Christmas taught you, set markets and budgets, and prepare photos, video and translations early. Use October to test platforms and placements and launch winter themed ads. Launch gift ads in mid November, budget Black Friday, Cyber Monday and Boxing Day separately, and boost spend, retargeting and countdown timers in December. This is how I planned Christmas at Infento and Le Patron.",
"steps": [
("Review past seasons", "Write down for each past year when you started, which markets you targeted and what you tested. At Infento each year started earlier and added markets because the earlier start paid off."),
("Set markets and budget periods", "Decide which countries and languages to run. Budget Black Friday, Cyber Monday and Boxing Day as separate periods so they do not eat the main budget."),
("Prepare assets in September", "Map the assets you need, plan the photoshoot and video script, update payment options and translate everything before October."),
("Test in October", "Test hypotheses on platforms, placements and tools while costs are lower. Launch winter themed ads toward the end of the month."),
("Launch gift ads in mid November", "Switch to Christmas gift messages in the middle of November and increase spend toward the end of the month."),
("Boost in December", "Raise spend, add countdown timers to the site, newsletter and ads, and increase retargeting of visitors and abandoned carts."),
("Plan audiences by theme", "Run separate audiences: winter theme, Christmas theme, general retargeting, existing customers for upgrades, abandoned carts and interest groups that fit the product."),
("Do the technical checks first", "Before launch, check that Tag Manager sends events to Facebook and Google, that checkout events fire and that retargeting lists are filling. Le Patron's Christmas brief made this a fixed step."),
("Report and write learnings", "After the season, write what worked and what to change. Le Patron's learnings on lookalikes and carousels became the start of the next brief.")
],
"pitfalls": ["Starting creative work in November", "One budget for the whole season so Black Friday eats it", "Launching before tracking is checked", "Not writing learnings down, so next year starts from zero"],
"related_answers": ["how-to-plan-a-christmas-campaign-for-ecommerce", "facebook-ads-or-google-ads-for-a-d2c-brand"],
"proof": "I planned Christmas campaigns this way at Infento and Le Patron, phase by phase from September to December.",
"proof_link": "/work/infento/",
},
{
"slug": "audit-a-google-search-ads-campaign",
"title": "Audit a Google search ads campaign",
"desc": "The search ads audit I wrote for Sweek: settings, keywords, ads and reporting, with a checklist that removes what does not perform.",
"who": "Marketers running Google Ads in house",
"time": "Two to three hours per campaign, then a weekly check",
"tools": ["Google Ads", "Search terms report", "Looker Studio (Data Studio) for reporting"],
"short": "Audit in four passes. Settings: no Display select on search campaigns, all networks and devices on at the start, then cut what does not perform, and pick a bid strategy that matches how good your conversion tracking is. Keywords: remove low quality score terms and mine search terms for negatives. Ads: replace weak ads. Report: check CTR, clicks and CPC daily. I wrote this audit for Sweek in 2017.",
"steps": [
("Fix the campaign type", "Do not run Search with Display select. Search budget leaks into display placements that rarely perform for intent driven keywords."),
("Start wide, then cut", "Turn on all networks, devices and target locations at the start. After enough data, segment by network, device and user location and remove the ones that do not perform. The rule: always remove what does not perform so budget goes to what does."),
("Match bid strategy to tracking", "Use Maximize Clicks when conversion tracking is not set up properly, Maximize Conversions only when it works perfectly, and Manual CPC when testing new locations or targets."),
("Clean the keywords", "Remove keywords with a quality score under 5. Keep the ad group name, keyword, ad text and landing page focused on the same term to lift quality score."),
("Mine negatives", "Read the search terms report and add irrelevant terms as negatives. At Sweek, terms around resumes, letters and jobs were excluded from writing keywords."),
("Replace weak ads", "If an ad has a click-through rate under 2% or very few clicks while quality score is high, rewrite it. Always include the ad group keyword in the ad. Add sitelinks and structured snippets."),
("Report daily", "Build a simple dashboard with CTR, clicks and CPC and check it every day for the first weeks, then weekly.")
],
"pitfalls": ["Leaving Display select on in search campaigns", "Choosing Maximize Conversions with broken tracking", "Never reading the search terms report", "Keeping old ads running because nobody owns them"],
"related_answers": ["how-to-cut-customer-acquisition-cost-on-paid-ads", "facebook-ads-or-google-ads-for-a-d2c-brand"],
"proof": "I wrote this search ads audit and checklist for Sweek in 2017, where acquisition cost came down by more than 50%.",
"proof_link": "/work/sweek/",
},
{
"slug": "do-keyword-research-for-search-ads-and-seo",
"title": "Do keyword research for search ads and SEO",
"desc": "Start from the buyer persona, find root keywords, then split into a search ads track and an SEO track. The method I used for Sweek.",
"who": "Marketers starting search ads or content for a new product",
"time": "One to two days",
"tools": ["Ubersuggest", "Google Keyword Planner", "AnswerThePublic", "Ahrefs"],
"short": "Both tracks start the same way: define the buyer persona, then find the root keywords that describe your product in that persona's words. For search ads, pull suggested keywords, sort them into positives and negatives, check volumes and later mine the search terms report. For SEO, find questions people ask, check volumes, agree content topics first, then choose long tail keywords you can rank for. I wrote this method for Sweek.",
"steps": [
("Define the buyer persona", "Write who you want: where they live, age range, education, interests and goals. For Sweek's writers: people who want to reach more readers and get paid for writing."),
("Find root keywords", "Pick the few words that define your product and link to the persona. For Sweek they were writing and reading."),
("Search ads: pull suggestions", "Use a keyword tool to list Google's suggested keywords around each root, sorted by volume."),
("Search ads: sort positives and negatives", "Split the list. For Sweek, how to write a book and creative writing were positives; resume, letter, cursive, jobs and synonym were negatives."),
("Search ads: check volume", "Verify volumes in Keyword Planner and drop zero volume terms. Once ads run, mine the search terms report every week."),
("SEO: collect questions", "Use AnswerThePublic for the questions people ask around your roots, and a tool like Ahrefs for volume."),
("SEO: topics before keywords", "Agree the content topics first, then pick long tail keywords inside each topic. Check who ranks today before you commit to a term.")
],
"pitfalls": ["Starting from keywords instead of the persona", "Skipping negatives, which wastes most of a small budget", "Chasing head terms you cannot rank for", "Using the same keyword list for ads and content"],
"related_answers": ["how-to-cut-customer-acquisition-cost-on-paid-ads", "how-to-market-a-niche-b2b-service-on-a-small-budget"],
"proof": "I wrote this keyword research method for Sweek's search ads and SEO in 2017.",
"proof_link": "/work/sweek/",
},
{
"slug": "fix-the-message-order-on-a-b2b-landing-page",
"title": "Fix the message order on a B2B landing page",
"desc": "Answer six visitor questions in order: what can you do for me, why care, show me more, how can I be sure, what about objections, what next.",
"who": "B2B founders and marketers whose site gets visits but few leads",
"time": "One to two days for the audit and rewrite",
"tools": ["Google PageSpeed Insights", "A session recording tool", "Your best client testimonials"],
"short": "Visitors ask questions in a natural order, and your page should answer them in that order. First, what can you do for me, in a headline about the client. Then why should I care, show me more, how can I be sure, what about my objections, and what do you want me to do. Before the copy, check speed, because slow pages look less credible. I used this with SMPC in 2021.",
"steps": [
("Score the site", "Rate the site in eight areas: user experience, conversion, SEO, performance and security, technical setup, accessibility, content and legal. Write down what already works so you keep it."),
("Fix speed first", "Test the page in PageSpeed Insights. Aim for a load time under two seconds, because slow pages feel less credible and hurt both search and conversion."),
("Write the headline about the client", "Answer what can you do for me, starting with an action word. For SMPC: fulfil your regulatory compliance and design control requirements without the hassle. Remove sliders in the hero."),
("Add the main benefit", "A sub headline answers why should I care, for example saving time and money and removing unnecessary work."),
("Show the concept and the offer", "Explain what makes you different in one short block, then list services, with separate pages if needed. Use a visual or a short video."),
("Prove it", "Answer how can I be sure with testimonials with photos, client logos and specific numbers you are allowed to share."),
("Handle objections", "Add a section or FAQ with the doubts buyers raise on calls, linked from the homepage."),
("Make the action obvious", "Place one clear call to action in the navigation, mid page and before the footer, with the benefit stated next to it.")
],
"pitfalls": ["A headline about the company instead of the client", "Hero sliders that hide the main message", "Trust signals buried at the bottom", "A different call to action in every section"],
"related_answers": ["what-should-a-b2b-services-homepage-say", "how-to-market-a-niche-b2b-service-on-a-small-budget"],
"proof": "I used this bottleneck analysis and message order on SMPC's website in 2021.",
"proof_link": "/work/smpc/",
},
{
"slug": "build-customer-personas-from-your-paying-customers",
"title": "Build customer personas from your paying customers",
"desc": "Use real customer data and feedback, not guesses: find your most active customers, describe them, and target more people like them.",
"who": "Startup marketers with at least a few dozen paying customers",
"time": "One week",
"tools": ["Your CRM or billing export", "A spreadsheet", "Customer feedback and support notes", "Ad platform lookalike audiences"],
"short": "Pull your paying customers for one market and split them by how active they are, for example those who set up a direct debit versus those who signed up and stopped. Describe the active group: plan type, when they joined, who they are and what made them choose you. Add quotes from feedback. Then target lookalikes of the active group. I did this at Bueno with a study of our British customers.",
"steps": [
("Pick one market", "Start with one country or segment so the picture is clear. At Bueno I started with British customers."),
("Export and clean", "Export paying customers with plan type, sign up date and activity. Remove names and emails from the working file."),
("Split by real activity", "Group customers by what they actually do. At Bueno the key split was customers who set up a direct debit, customers who funded the account without one, and inactive ones."),
("Look for patterns", "Check plan types, sign up months and profile. Note the months with the most sign ups and what you ran then."),
("Add the why", "Read feedback and support notes for reasons people chose you. One Norwegian customer chose Bueno because the ad offered Norwegian support and translation."),
("Write short personas", "Describe two or three people in plain words: age range, situation, comfort with technology, what they need from you. Bueno's Norwegian personas were retirees splitting time with Spain who needed support in Norwegian and help with sign up."),
("Target the active group", "Build lookalike audiences from the active customers, not from all sign ups, and write ads to the needs you found.")
],
"pitfalls": ["Building personas from guesses in a workshop", "Using all sign ups as the seed audience", "Keeping personal data in the analysis file", "Writing personas nobody uses in ads"],
"related_answers": ["how-to-enter-a-new-country-market", "how-to-write-ad-copy-in-your-customers-words"],
"proof": "At Bueno I studied our paying British customers and wrote Norwegian personas from customer feedback to guide targeting.",
"proof_link": "/work/bueno/",
},
{
"slug": "interview-b2b-buyers-with-jobs-to-be-done-questions",
"title": "Run Jobs to be Done customer interviews",
"desc": "Five interview stages, from first thought to hiring criteria and anxieties, to learn why customers really choose you. The questions I used with SMPC.",
"who": "Founders and marketers who want to know why customers buy",
"time": "Two weeks for eight to ten interviews and synthesis",
"tools": ["Video call tool with recording", "Interview script", "A sheet to tag answers by stage"],
"short": "Jobs to be Done is a well known framework: customers hire a product to get a job done. Interview recent customers about the moment they started looking, not about features. Ask about the first thought, the event that pushed them to search, how they shortlisted options, what almost stopped them, and what they were really trying to achieve. I wrote these questions for SMPC, a B2B compliance service.",
"steps": [
("Pick recent buyers", "Interview people who bought in the last few months, while they still remember the decision."),
("First thought", "Ask: when and how did you first get the idea that something was missing?"),
("The tussle", "Ask: what event or change led you to actively look for solutions like ours?"),
("Hiring criteria", "Ask: on what factors did you shortlist the solutions you looked at?"),
("Anxieties", "Ask: what almost stopped you from trying us, or what did you not like about a competitor?"),
("The job", "Ask: what were you trying to achieve? Probe for the goal, the final outcome, and the emotional and social side."),
("Tag and use", "Tag each answer by stage. Turn the common triggers into ad hooks, the hiring criteria into page sections and the anxieties into your FAQ.")
],
"pitfalls": ["Asking what features they want", "Interviewing people who bought years ago", "Leading the customer toward the answer you hope for", "Doing interviews and never changing the page"],
"related_answers": ["what-should-a-b2b-services-homepage-say", "how-to-write-ad-copy-in-your-customers-words"],
"proof": "I wrote these Jobs to be Done interview questions for SMPC's customer research in 2021.",
"proof_link": "/work/smpc/",
},
{
"slug": "set-up-a-customer-referral-programme",
"title": "Set up a customer referral programme",
"desc": "Reward both sides, match the reward to the product, and fix timing and friction first. What I learned setting up Bueno's referral programme.",
"who": "Subscription and fintech startups with happy early customers",
"time": "Two weeks to set up, then monthly review",
"tools": ["Referral links or codes", "Email platform", "CRM to track redemptions"],
"short": "Give both the referrer and the new customer a reward, and make the reward something tied to your product rather than plain cash. Ask at the moment customers feel the value, make the link easy to share, and track redemptions from day one. At Bueno I learned that cash rewards did not move property owners much. The real barriers were timing and friction.",
"steps": [
("Set the goal", "Name the target the programme serves. At Bueno the referral programme was part of the plan to reach our first thousand customers."),
("Reward both sides", "Offer something to the person who refers and to the person who joins. Two sided rewards feel fair and get shared more."),
("Tie rewards to the product", "Match the reward to what people value in your product. At Bueno we offered a free electricity overpayment check with a discount, or a free non-resident tax guide."),
("Ask at the right moment", "Ask when the customer has just felt the value, for example after their first bill is sorted or their tax is filed, not at sign up."),
("Remove friction", "Make the link easy to find in emails and the account, and the sign up for the friend as short as possible."),
("Track and review", "Count links shared, redemptions and paying referrals every month. If uptake is low, look at timing and friction before raising the reward.")
],
"pitfalls": ["Raising cash rewards when the real problem is timing", "Asking for referrals before customers see value", "Rewards nobody on the other side wants", "No tracking, so nobody knows if it works"],
"related_answers": ["why-do-cash-referral-rewards-fail", "how-to-run-growth-as-a-one-person-marketing-team"],
"proof": "I set up Bueno's referral programme with two sided, product linked rewards and reviewed what moved owners and what did not.",
"proof_link": "/work/bueno/",
},
{
"slug": "test-message-angles-in-a-new-country",
"title": "Test message angles in a new country",
"desc": "Run several problem angles side by side before judging a market. In the UK, Bueno's hidden charges angle beat savings and service clearly.",
"who": "Startups expanding into a new country or language",
"time": "Three to six weeks",
"tools": ["Meta Ads Manager", "Google Ads", "Localised landing pages", "Analytics with register events"],
"short": "Before you decide a country does not work, test several message angles at the same time with the same budget. Write each angle around a different problem, localise the landing page, and compare click-through and sign up rates, not just clicks. At Bueno in the UK, savings and customer service angles failed. An angle about hidden charges people did not know they were paying won by a wide margin.",
"steps": [
("Map the problems", "List the problems people in that market have, and whether they are aware of them. For the UK we mapped poor support and hidden fees, plus public data on bank complaints in Spain."),
("Write one ad per angle", "Give each problem its own ad and headline. Keep visuals similar so the message is what you test."),
("Localise the landing page", "Translate properly and use local references. In Norway, support in Norwegian was a deciding factor for customers."),
("Run side by side", "Run the angles at the same time with equal budgets so the results are comparable."),
("Measure past the click", "Compare click-through, visit to register and register to paying. At Bueno, one market had strong click rates but weak registration, which pointed to the page, not the ad."),
("Scale the winner", "Move budget to the winning angle and use it in email too. In the UK we followed up with an email to leads on why free banking is not really free."),
("Repeat per market", "Each market needs its own test. An angle that wins in one country can fail in the next.")
],
"pitfalls": ["Judging a market on one angle", "Translating ads word for word", "Measuring clicks only", "Copying the winning angle to every country without testing"],
"related_answers": ["how-to-enter-a-new-country-market", "how-to-split-a-marketing-budget-across-countries", "how-to-write-ad-copy-in-your-customers-words"],
"proof": "I ran these angle tests at Bueno across several language markets, including the UK and Norway.",
"proof_link": "/work/bueno/",
},
{
"slug": "run-weekly-mini-projects-as-a-growth-team",
"title": "Run weekly mini-projects as a growth team",
"desc": "Three to six small projects a week, each finished by Friday, next week planned by Saturday. The cadence I use to run growth at Bueno.",
"who": "Small growth teams and solo marketers",
"time": "30 minutes of planning a week",
"tools": ["Notion or any task board", "A weekly results note"],
"short": "Plan growth as small projects that can be finished in one week. Pick at least three and at most six. Each one must be done by Friday end of day, and next week's list must be set by Saturday. Small, finished projects build learning faster than big plans that drag on. This is how I run growth at Bueno as a one-person marketing function.",
"steps": [
("Keep a backlog", "Collect every idea in one list: a new ad, a landing page change, an email, a partner pitch."),
("Size each idea to a week", "If an idea cannot be finished in a week, cut it into a smaller first step that can."),
("Pick three to six", "Choose at least three and no more than six for the week. Fewer is too slow, more means nothing gets finished."),
("Finish by Friday", "Each project is done by Friday end of day. Done means live, sent or decided, not almost ready."),
("Write one line of learning", "For each project, note what happened and what you learned."),
("Plan by Saturday", "Set next week's projects by Saturday end of day, using what you just learned.")
],
"pitfalls": ["Projects too big to finish in a week", "More than six projects, so none get done", "No written learnings, so the same tests repeat", "Planning on Monday morning instead of before the week starts"],
"related_answers": ["how-to-run-growth-as-a-one-person-marketing-team", "why-do-cash-referral-rewards-fail"],
"proof": "I run Bueno's growth on this weekly mini-project cadence as the only person in marketing.",
"proof_link": "/work/bueno/",
},
{
"slug": "plan-the-launch-of-a-two-sided-marketplace",
"title": "Plan the launch of a two-sided marketplace",
"desc": "Problems, positioning, personas, supply and demand tactics and a milestone ladder: the launch plan I wrote for Nest.",
"who": "Founders launching a marketplace or community product",
"time": "One week to write, then a 15 week launch",
"tools": ["A one page plan or slide deck", "Landing page with sign up", "Community channels such as WhatsApp or Telegram"],
"short": "Start with the top three problems and a position that lowers the barrier to join. Write personas for the demand side. Decide how big the supply side needs to be, which is often small and carefully chosen. Split demand tactics into push and pull. Then set a milestone ladder for community size, with the channel or release that gets you to each step. I wrote this plan for Nest, a wellbeing platform for professionals.",
"steps": [
("Name three problems", "Write the top three problems your users face. For Nest: the taboo of reaching out, access when vulnerable, and no safe community."),
("Choose a position that lowers the barrier", "Nest was positioned around wellbeing and better selves instead of long term therapy, so joining felt safe."),
("Write demand personas", "Describe each core group, their age range and their pressure points. Nest had healthcare workers, consultants and people in government forces."),
("Size the supply side", "Decide how many providers you need and how you verify them. Nest needed only a small group of excellent experts, recruited by hand."),
("Split push and pull", "Push: manual outreach, content, team networks, then paid social and search. Pull: partnerships with existing communities, member referrals and incentives for people on the fence."),
("Build the milestone ladder", "Set community milestones and what gets you to each one, for example a landing page for the first hundreds, social channels next, then the website and app, then an alpha and a public launch."),
("Plan week by week", "Turn the first weeks into tasks: website with payments, first ads, outreach to communities, a Product Hunt checklist and email campaigns."),
("Give people a reason to gather", "Plan recurring events where members share their own stories. Community events bring people back between product releases.")
],
"pitfalls": ["Recruiting too many providers before there is demand", "Positioning that scares off the people who need you", "Jumping to paid ads before early milestones", "Treating both sides with the same tactics"],
"related_answers": ["how-to-launch-a-two-sided-marketplace", "how-to-get-your-first-1000-customers-d2c"],
"proof": "I wrote this launch plan for Nest, a wellbeing platform for doctors and other high-pressure professionals.",
"proof_link": "/work/nest/",
},
{
"slug": "audit-tracking-before-handing-marketing-to-an-agency",
"title": "Audit tracking before handing marketing to an agency",
"desc": "Check uptime, page speed, cookie consent, pixel firing and tag manager events before an agency starts spending. The audit I ran for Frecious.",
"who": "CMOs and founders about to hire an agency",
"time": "One to two days",
"tools": ["Uptime monitor such as UptimeRobot", "Google PageSpeed Insights", "Meta Pixel Helper", "Google Tag Manager preview", "Search console"],
"short": "Before an agency touches your budget, check that the data it will learn from is right. Set up uptime monitoring, test page speed on the pages ads send people to, test cookie consent on first and return visits, confirm the pixel fires after consent, and check that add to cart, checkout and cart value events reach every ad platform. I ran this audit for Frecious before its agency handover.",
"steps": [
("Monitor uptime", "Set up a free uptime monitor so you know when the site is down before customers tell you. We used the same tool at Infento."),
("Test speed on ad landing pages", "Run the pages your ads point to through PageSpeed Insights on mobile. At Frecious, lazy loading images was the biggest single fix."),
("Test consent on return visits", "Visit, accept or decline, leave and come back. Check the consent popup appears when it should. At Frecious it did not show on return, so the pixel never fired."),
("Confirm pixel events", "Use the pixel helper to check page view, add to cart, checkout and purchase events fire with the right values."),
("Check tag manager", "Open Tag Manager preview and confirm add to cart and checkout events go to both Facebook and Google, with custom values such as cart value."),
("Check access", "Make sure you own and can access search console, analytics and ad accounts, and that the agency gets user access, not ownership."),
("Write the handover report", "List findings by priority with a clear owner, and share it with the agency on day one.")
],
"pitfalls": ["Assuming tracking works because the dashboard shows numbers", "Testing only first visits", "Giving the agency ownership of your accounts", "Letting the agency fix its own baseline after it starts"],
"related_answers": ["what-to-check-before-hiring-a-marketing-agency", "why-is-my-facebook-ad-ctr-suspiciously-high"],
"proof": "I ran this tracking and site audit for Frecious's CMO before the company handed its marketing to an agency.",
"proof_link": "/work/frecious/",
},
{
"slug": "prioritise-a-growth-backlog-by-effort-and-impact",
"title": "Prioritise a growth backlog by effort and impact",
"desc": "Score every task for effort and impact, sort, then turn the top of the list into a day by day plan. The method I use in growth plans for clients.",
"who": "Founders and marketers with more ideas than time",
"time": "Half a day to score, then a three to four week plan",
"tools": ["A spreadsheet", "Analytics", "Hotjar or another session recording tool"],
"short": "List every task, then give it an effort score and an impact score in money terms, plus a type and a time estimate. Sort by impact against effort. High impact tasks with reasonable effort go first, even if they take weeks, while small quick wins fill the gaps. Then turn the list into a day by day plan, starting with analysis. I used this in a growth plan for an event series.",
"steps": [
("List everything", "Write every idea as a task: checkout redesign, new homepage blocks, retargeting, email flows, reporting, tracking."),
("Score effort and impact", "Give each task effort points and impact points, using the same scale for all. Add the task type and how long it takes."),
("Sort and group", "Group into highest, medium and lower priority. In the event series plan, a checkout redesign with validation and a better payment gateway came first, even at two to three weeks of work."),
("Start with analysis", "Spend the first week on traffic sources, behaviour, page flow and drop offs. Install session recording on day one."),
("Slot quick wins", "Put small, fast tasks such as a live counter of attendees and speakers between the big ones."),
("Write the day plan", "Turn the top tasks into days: analysis, quick win, checkout fixes with an A/B test, email segmentation, retargeting setup, then ad tools."),
("Rescore after each block", "After each block, update scores with what you learned before starting the next.")
],
"pitfalls": ["Doing quick wins only and never the big fix", "Scoring impact by gut instead of money", "Skipping the analysis week", "Never rescoring after new data"],
"related_answers": ["how-to-run-growth-as-a-one-person-marketing-team", "how-to-find-where-your-ecommerce-funnel-leaks"],
"proof": "I use effort and impact scoring in client growth plans, including a day by day plan for an event series.",
"proof_link": "/consulting/",
},
{
"slug": "layer-your-audiences-on-paid-social",
"title": "Layer your audiences on paid social",
"desc": "Start with the narrowest, most likely buyers and widen in layers. One ad for one audience. How I targeted at Font Neuve, Le Patron and PCP.",
"who": "Marketers entering a new market or running a small paid budget",
"time": "Two to four weeks of testing",
"tools": ["Meta Ads Manager", "Audience research in the Facebook developer tools or Ads Manager", "A targeting sheet"],
"short": "Do not start broad. Build your audiences in layers, from the narrowest and most likely buyers outward, and run one ad for one audience so you know what worked. Use specific interests your buyers share, such as the brands, teams or events they follow. Widen only when a layer proves itself. I used this to find a new French audience for Font Neuve and to reach cyclists for Le Patron.",
"steps": [
("Write the layers", "List audiences from most to least likely to buy: past visitors and customers, lookalikes of buyers, specific shared interests, then broader interests."),
("Go specific on interests", "Look for the brands, teams, people and events your buyers follow. For Le Patron we combined men's fashion with specific pro cycling teams, riders, races and brands."),
("One ad per audience", "Run one ad for one audience. When targeting was jumbled in one account I worked on, separating it this way, one ad per audience, brought the cost per click down sharply."),
("Start narrow", "Launch the first layers with small budgets and let them collect data."),
("Widen only on proof", "When a layer reaches your cost target, add the next layer. If it does not, stop it before it eats the budget."),
("Keep a targeting sheet", "Record every audience, its result and the date. Next season starts from the winners, as Le Patron's Christmas briefs did with Dutch lookalikes.")
],
"pitfalls": ["Starting broad because the platform suggests it", "Several ads across several audiences so nothing is clear", "Widening before a layer works", "Forgetting the learnings by next season"],
"related_answers": ["how-to-get-bookings-fast-when-your-main-market-disappears", "how-to-cut-customer-acquisition-cost-on-paid-ads", "how-to-validate-a-startup-idea-with-a-small-ad-budget"],
"proof": "I used layered, specific targeting for Font Neuve's French market, Le Patron's cyclists and PCP's validation test.",
"proof_link": "/work/font-neuve/",
},
{
"slug": "set-up-remarketing-audiences-based-on-intent",
"title": "Set up remarketing audiences based on intent",
"desc": "Retarget the visitors who showed real intent: clicked for more info, scrolled most of the offer page, or spent the most time. Then remarket by product.",
"who": "Marketers with steady site traffic and an installed pixel",
"time": "One day to set up",
"tools": ["Meta Pixel", "Google Ads tag and Google Analytics", "Google Tag Manager"],
"short": "Install the Meta pixel and Google tags first, then build retargeting audiences from signals of intent rather than all visitors: people who clicked for more information, scrolled past most of the offer page, or were in the top quarter by time on site. Add abandoned cart lists and remarket different products to past buyers by product type. I set this up for a Dutch coaching business and for Le Patron.",
"steps": [
("Install the tags", "Without a pixel and ad tags you cannot retarget anyone. A coaching business I audited had a strong YouTube channel but no pixel, so every visitor was lost."),
("Define intent events", "Pick actions that show real interest: a click on more info, a scroll past 60% of the offer page, or being in the top 25% of visitors by time spent."),
("Build the audiences", "Create an audience for each intent signal, plus add to cart and checkout lists."),
("Write ads for each", "Match the ad to the signal. People who scrolled the offer need proof and an answer to doubts, while abandoned carts need a reminder and reassurance."),
("Remarket by product", "After a purchase, show buyers related products by type and add a thank you list, as we did at Le Patron."),
("Build lookalikes", "Use your current customers to build lookalike audiences for prospecting.")
],
"pitfalls": ["Retargeting all visitors with the same ad", "No pixel until the first big campaign", "Showing buyers the product they already bought", "Audiences too small to deliver"],
"related_answers": ["facebook-ads-or-google-ads-for-a-d2c-brand", "how-to-find-where-your-ecommerce-funnel-leaks"],
"proof": "I set up intent based remarketing in audits for a Dutch coaching business and in Le Patron's retention funnel.",
"proof_link": "/work/le-patron/",
},
]

ANSWERS_EXTRA = [
{
"slug": "how-to-find-where-your-ecommerce-funnel-leaks",
"topic": "performance-marketing",
"q": "How do I find where my ecommerce funnel is leaking?",
"short": "Compare each step with a benchmark: visit to product page, product page to add to cart, cart to purchase. The step furthest below its benchmark is your leak. At VU our add to cart rate was well below industry levels while cart abandonment was better than average, so the problem was the decision to buy on the product page, not the checkout. We fixed product pages before buying more traffic.",
"body": """## Measure each step, not just the total

A low conversion rate tells you something is wrong. It does not tell you where. Break the funnel into steps and get a rate for each one:

- Visits that move from the homepage to a product page
- Product page visits that add to cart
- Carts that turn into orders
- Time on site and scroll depth on key pages

## Compare with a benchmark

For each step, find an industry benchmark or your own best month. The step furthest below its benchmark is the leak. In a January analysis at VU, I saw that people who added to cart mostly bought, so cart abandonment was healthy. The add to cart rate was the weak step. Fewer people were deciding to buy.

## Match the fix to the step

Each leak has a different kind of fix:

- Homepage to product page: a clearer promise and proof above the fold
- Product page to cart: better images, videos, guarantees and answers to doubts
- Cart to order: checkout fields, payment methods and trust badges

At VU the fixes were on the product page: videos of riders in the product carousel, premium proof like the Olympics, the lifetime guarantee and free returns made visible, and an exit intent pop up.

## Watch real sessions

Numbers tell you where. Session recordings tell you why. Hotjar recordings showed us that visitors left when product page images did not match the feel of the homepage. That changed our image brief.

## Do not buy traffic into a leak

If a step is broken, more ad spend makes the leak bigger. Fix the weakest step first, then scale. I use the same order on every engagement, from Infento's checkout tests to VU's product pages.""",
"related": ["should-your-checkout-have-a-discount-code-field", "how-to-make-a-premium-ecommerce-site-more-trustworthy", "facebook-ads-or-google-ads-for-a-d2c-brand"],
"playbook": "run-a-weighted-ux-audit-of-a-landing-page",
},
{
"slug": "should-your-checkout-have-a-discount-code-field",
"topic": "performance-marketing",
"q": "Should my checkout page have a discount code field?",
"short": "Be careful with it. A visible discount code field tells shoppers a discount exists, and many leave to search for one. Some never come back. At Infento, renaming the field from discount code to gift card code kept people on the page and lifted checkout conversion. If you need codes, label them in a way that does not invite a search, or hide the field behind a small link.",
"body": """## What happens when people see the field

A shopper reaches checkout ready to pay. They see a box that says discount code. Now they wonder if they are paying too much. They open a new tab and search for the brand name plus discount. Some find a code site full of expired codes. Some get distracted. Some come back and pay. Many do not.

## What we changed at Infento

At Infento we tested the checkout funnel along every axis. One test showed that the discount code field was sending people away from the site to look for codes. We changed the label from discount code to gift card code. Nothing else changed. Conversion went up clearly. It was a reminder that checkout is marketing psychology as much as design.

## Options if you need codes

- Rename the field to gift card or voucher code
- Hide the field behind a small text link such as have a gift card
- Apply campaign discounts automatically through a link, so no field is needed
- Show the price already discounted during sales, so there is nothing to hunt for

## Check the rest of the checkout too

The field was one leak among several we looked for. During campaigns, we also ran a weekly checklist through every step: add to cart, contact details, shipping, and each payment method by country, such as iDeal in the Netherlands and Giropay in Germany. A broken payment method during a campaign wastes far more than a confusing label.

## How to test it yourself

Run an A/B test with the field renamed or hidden for half of visitors. Measure checkout to purchase, not just clicks. Give it enough orders to trust the result before you roll it out.""",
"related": ["how-to-find-where-your-ecommerce-funnel-leaks", "how-to-plan-a-christmas-campaign-for-ecommerce"],
"playbook": "test-your-ecommerce-checkout-before-a-campaign",
},
{
"slug": "how-to-validate-a-startup-idea-with-a-small-ad-budget",
"topic": "growth-from-zero",
"q": "How can I validate a startup idea with a small ad budget?",
"short": "Build a simple MVP and funnel in a week, run tightly targeted ads to a sample big enough to trust, and track behaviour as well as clicks. Set a fixed window, such as twelve weeks, and decide in advance what result means go. For Personal City Plan, the ad numbers looked good but behaviour showed the pain was too small, so the founders shelved it early. That is a good outcome.",
"body": """## Decide what you are testing

Write the question before you spend anything. For Personal City Plan in 2018, the founders asked two things: is there a real need, and can this become a business that scales? We gave ourselves three months and a small budget.

## Build the smallest thing that can answer

In the first week I built an MVP, an MVP funnel and a 12 week roadmap. It did not need to be pretty. It needed to show the offer clearly and let people take a real step, such as signing up or buying.

## Target narrowly

With a small budget, broad audiences burn money. On Facebook I used the developer tools to find niche audiences. On Google I used long tail keywords. Narrow targeting gives you cleaner data per euro.

## Track behaviour, not only clicks

Click-through rates and cost per lead tell you whether the ad works. They do not tell you whether the product solves a problem. I set up behaviour tracking to see what people did after they arrived, and added retargeting and a cart abandonment email within 48 hours to see who came back.

## Read both kinds of data

At PCP the campaign metrics were strong. The qualitative data was not: people did not use the product in a way that showed a big pain. Acquisition cost fell over the test, but not to a level the business model needed.

## Be willing to stop

I presented the results to the founders and investors, and they shelved the project. Twelve weeks and a small budget saved them from building something that would not grow. A clear no is one of the most useful results a test can give.""",
"related": ["how-to-get-your-first-1000-customers-d2c", "how-to-launch-a-two-sided-marketplace", "how-to-cut-customer-acquisition-cost-on-paid-ads"],
"playbook": "layer-your-audiences-on-paid-social",
},
{
"slug": "how-to-get-bookings-fast-when-your-main-market-disappears",
"topic": "growth-from-zero",
"q": "How do I get bookings fast when my main market suddenly disappears?",
"short": "Move fast and keep it lean. Get a working website, tracking and social channels live within days, then test the nearest new market with layered audiences on one cheap channel. In 2020, Font Neuve, a French resort that relied on Dutch guests, lost its market to COVID. We had campaigns live within two weeks, targeted French audiences in layers, and the resort was fully booked for the season.",
"body": """## The situation

Font Neuve is a holiday resort in France. Most of its guests came from the Netherlands. In 2020, travel restrictions stopped them from crossing the border and bookings stopped. The founders had never done online marketing. Their hope was to reach break even.

## Week one: build the basics

- A new website, built with designers and developers within a week
- Tracking installed on every tool and platform before any ad spend
- Social media channels set up from scratch, with existing content published

None of it was perfect. All of it worked, and that was what mattered.

## Week two: go live

Campaigns were running within two weeks of starting. When a market disappears, every week you wait is a week of empty rooms.

## Find the new market in layers

France was a new market with no customer data. Instead of targeting everyone, I built audiences in layers, starting with the most likely guests and widening only when a layer worked. That kept the budget safe while we learned.

## Put the money where it works

Facebook gave us the lowest cost per click and per booking, so most of the budget went there. We kept optimising as the data came in.

## The result

Within weeks the resort was fully booked, well beyond break even. The founders also gained a proven audience model in France they can reuse, and they started treating online marketing as a core channel. In the founder's words, it saved the season.""",
"related": ["facebook-ads-or-google-ads-for-a-d2c-brand", "how-to-enter-a-new-country-market", "how-to-validate-a-startup-idea-with-a-small-ad-budget"],
"playbook": "layer-your-audiences-on-paid-social",
},
{
"slug": "how-to-cut-customer-acquisition-cost-on-paid-ads",
"topic": "performance-marketing",
"q": "How do I cut customer acquisition cost on paid ads?",
"short": "Fix structure before creative. Move budget to the countries and channels that return the most, rebuild campaigns to follow each platform's guidelines, run one ad per audience, improve the landing pages and install proper conversion tracking. Then remove whatever does not perform. At Sweek in 2017, this cut acquisition cost by more than 50% across paid channels.",
"body": """## Start with where the money goes

At Sweek, a story app marketing in many countries, each country had a fixed budget and its own team. Budgets did not follow results. I analysed data across platforms and countries and moved variable budget toward the places that returned more. That alone changed cost per install.

## Rebuild campaigns to platform rules

Facebook, Google, Taboola and Instagram each have their own guidelines for structure, audiences and creative. Many campaigns ignored them. I rebuilt them to match each platform and wrote the rules down so the team kept following them.

## One ad for one audience

When targeting is jumbled, the platform cannot learn and you cannot tell what worked. Separate audiences and give each its own ad. In one account I reviewed, this simple change brought the cost per click down sharply.

## Fix the page, not just the ad

Paid campaigns often send people to pages built for something else. We optimised the landing pages for each campaign so the promise in the ad matched what people saw.

## Track the right events

Install advanced conversion events in Facebook and Google so the algorithms optimise for real actions, not cheap clicks.

## Remove what does not perform

On search, that means turning off weak networks, devices, locations and keywords with low quality scores. On social, it means cutting placements and audiences that bring cheap but useless clicks.

## Automate once it works

When we found the right fit between campaign and cost per install at Sweek, we automated those campaigns and moved our attention to the next test. The combined effect was an acquisition cost more than 50% lower.""",
"related": ["facebook-ads-or-google-ads-for-a-d2c-brand", "how-to-split-a-marketing-budget-across-countries", "why-is-my-facebook-ad-ctr-suspiciously-high"],
"playbook": "audit-a-google-search-ads-campaign",
},
{
"slug": "do-influencer-campaigns-work-for-app-installs",
"topic": "growth-from-zero",
"q": "Do influencer campaigns work for app installs?",
"short": "They can, when the audience fit is real and you measure installs and cost per install, not reach. At Sweek, a story writing and reading app, I filtered out influencers whose audiences did not write or read, negotiated with two large creators who fit, and ran both campaigns at the same time. Downloads spiked within the first day and the cost per install was very low.",
"body": """## Fit beats follower count

The biggest mistake with influencers is choosing by audience size. At Sweek, I contacted and filtered many possible partners. The test was simple: does this person's audience actually write or read stories, and do they trust the creator? Accounts with large but unrelated audiences were dropped.

## Pick creators who can start a snowball

We wanted creators whose posts would be shared and talked about, not just seen. I negotiated with two creators with very large, engaged audiences that matched the product.

## Run them at the same time

We ran both campaigns simultaneously with content that fit each creator's style and target market. Hearing about an app from two trusted voices in the same week made people act. Downloads spiked within the first day of the campaign.

## Measure what matters

The campaigns produced a lot of impressions and reach. We did not care about those. The goals were installs and cost per install, and we tracked both from the first hour.

## Make it part of a system

Influencer marketing worked at Sweek because the rest was in place: tracking, optimised app store and landing pages, and a team trained to follow up. On its own, a creator post is a spike. With a funnel behind it, it brings users who stay.

## When to skip influencers

If you cannot track installs back to the campaign, or your product is not ready for a sudden wave of new users, wait. A spike into a broken onboarding wastes the creator's trust and your budget.""",
"related": ["how-to-cut-customer-acquisition-cost-on-paid-ads", "how-to-get-your-first-1000-customers-d2c"],
},
{
"slug": "how-to-split-a-marketing-budget-across-countries",
"topic": "marketing-leadership",
"q": "How should I split a marketing budget across several countries?",
"short": "Do not give each country a fixed budget and leave it there. Keep a fixed base, then move the variable part every month to the countries and channels that return the most, based on data from all platforms together. Test message angles per country before judging a market. I did this at Sweek across many countries and at Bueno across 28 countries.",
"body": """## The problem with fixed budgets

At Sweek, each country had its own marketing team and a fixed budget. A country that performed badly kept spending, and a country that performed well could not grow. There was no shared structure for deciding.

## Look at all the data together

I started with cross platform analysis: every channel, every country, one view. Once the data was segregated by country, it was clear where each euro returned more. Budgets were then adjusted to optimise for return.

## Split base and variable

A simple model that works:

- A small fixed base per country, so each market keeps learning
- A variable pool that moves each month to the best performers
- A test budget for new markets or new angles

## Judge a country fairly

Before cutting a country, make sure you tested more than one message. At Bueno, the UK looked weak until we tested angles side by side. Savings and customer service failed. An angle about hidden charges people did not know they were paying won clearly. The market was fine. The message was wrong.

## Localise properly

Budget follows results, and results follow localisation. At Bueno, support in the customer's own language decided many sign ups in Norway and Sweden. Translating ads word for word would have made those markets look worse than they are.

## Review monthly

Set a fixed monthly review: spend, cost per customer and payback by country. Move the variable pool. Write down why. Over time, this turns budget decisions from opinions into a routine the whole team understands.""",
"related": ["how-to-enter-a-new-country-market", "how-to-cut-customer-acquisition-cost-on-paid-ads", "what-is-a-good-ltv-to-cac-ratio"],
"playbook": "test-message-angles-in-a-new-country",
},
{
"slug": "facebook-ads-or-google-ads-for-a-d2c-brand",
"topic": "performance-marketing",
"q": "Should a D2C brand use Facebook ads or Google ads?",
"short": "Usually both, for different jobs. Facebook and Instagram are good at finding new people who did not know they wanted your product. Google is good at catching people who are already searching, and at retargeting. At Infento, Facebook became the main acquisition channel and Google the main conversion channel. At Le Patron, Google retargeting and shopping clearly outperformed prospecting.",
"body": """## Two different jobs

Facebook and Instagram put your product in front of people who were not looking for it. That is how a new category gets discovered. Google search reaches people who already have the need in mind and are comparing options. Google Shopping and display retargeting bring back people who visited.

## What we saw at Infento

Infento sold life-size construction kits, a product nobody searched for at first. We tested many channels, then narrowed down. Facebook did the acquisition: showing families what the kits could become. Google did the conversion: catching people searching for the brand, the product or gift ideas, and bringing visitors back. Together they took direct to consumer sales from zero to 2M euro ARR.

## What we saw at Le Patron

For Le Patron, a cycling menswear brand, the yearly reports showed that Google retargeting and shopping ads returned far more than Facebook prospecting. The learning: keep Facebook to fill the funnel and let Google close the sale.

## How to decide for your brand

- New category, visual product: lead with Facebook and Instagram
- Existing search demand: start with Google search and shopping
- Any brand with traffic: add retargeting on both early

## Test in a fixed order

Install tracking on both first. Run small tests on each with clear goals: cost per new customer for Facebook, cost per order for Google. Compare after enough orders, then move budget to the winner for each job. And check where clicks come from, because some placements send cheap clicks that never buy.""",
"related": ["how-to-cut-customer-acquisition-cost-on-paid-ads", "how-to-find-where-your-ecommerce-funnel-leaks", "how-to-get-your-first-1000-customers-d2c"],
"playbook": "set-up-remarketing-audiences-based-on-intent",
},
{
"slug": "what-to-check-before-hiring-a-marketing-agency",
"topic": "marketing-leadership",
"q": "What should I check before handing marketing to an agency?",
"short": "Check your data before they touch your budget. Make sure the site is monitored and fast on mobile, cookie consent works on return visits, the pixel fires after consent, and add to cart, checkout and cart value events reach every ad platform. Keep ownership of your accounts. I ran this audit for Frecious's CMO before the company handed its marketing to an agency.",
"body": """## Why this matters

An agency optimises on the data it sees. If tracking is broken, it will optimise toward the wrong thing and report numbers that look fine. You pay for months before anyone notices. An hour of checks first saves a lot of money later.

## What I found at Frecious

Frecious, a Dutch organic drinks brand, asked me to check its setup before handover. The audit found:

- A very low mobile page speed score, with lazy loading images as the biggest fix
- A cookie consent popup that did not show on return visits, so the Facebook pixel never fired and sales were missed
- No add to cart or checkout events sent from Tag Manager to Facebook or Google
- Custom values such as cart value not sent to Facebook
- Search console access that needed checking

None of this showed up in the ad dashboards.

## Your checklist

- Uptime monitoring in place, so you know when the site is down
- Page speed tested on the pages ads send people to
- Consent tested on first and return visits
- Pixel and tag events checked with the platform helpers
- Account ownership with you, agency given user access only

## Agree the baseline

Write the findings into a short report, fix what you can, and share it with the agency on day one. Agree how results will be measured before they start. That way the agency is judged on improvements to a clean baseline, not on fixing problems you already had.

## Ask the agency the same questions

A good agency will ask about tracking in the first meeting. If they do not, treat it as a warning sign.""",
"related": ["fractional-cmo-vs-agency-vs-full-time-marketer", "why-is-my-facebook-ad-ctr-suspiciously-high", "when-should-a-startup-hire-its-first-marketer"],
"playbook": "audit-tracking-before-handing-marketing-to-an-agency",
},
{
"slug": "what-should-a-b2b-services-homepage-say",
"topic": "growth-from-zero",
"q": "What should a B2B services homepage say?",
"short": "Answer six questions in the order visitors ask them. What can you do for me, in a headline about the client. Why should I care. Show me more. How can I be sure. What about my objections. What do you want me to do. I used this order to rewrite the landing page for SMPC, a Swiss medical device compliance firm whose site looked expert but did not convert.",
"body": """## Visitors arrive with questions

People land on a services site with a problem and a few seconds of patience. They are not reading your story. They are checking whether you can help, and whether they can trust you. The page converts when it answers their questions in their order.

## The six questions

- What can you do for me? A headline about the client's result, starting with an action word. For SMPC: fulfil your regulatory compliance and design control requirements without the hassle.
- Why should I care? A sub headline with the main benefit, such as saving time and money and removing unnecessary work.
- Can you show me more? One short block on what makes you different, then your services, with their own pages if needed. A visual or short video helps.
- How can I be sure? Testimonials with photos, client logos and specific numbers you can share.
- What about my objections? A section or FAQ that answers the doubts buyers raise on calls.
- What do you want me to do? One obvious call to action, repeated in the navigation, mid page and before the footer, with the benefit next to it.

## Before the copy, check speed

SMPC's pages loaded slowly on desktop and mobile. Slow pages feel less credible and hurt both search and conversion. Aim for under two seconds.

## Keep what works

The SMPC site had real strengths: copy that showed deep expertise, an elegant design and a helpful tone. The audit kept all of that. The problem was order and focus: a hero slider, a headline about the company, and trust signals too low on the page.

## Use real customer words

Jobs to be Done interviews tell you what made clients start looking and what almost stopped them. Those answers become your headline, your objections section and your proof.""",
"related": ["how-to-market-a-niche-b2b-service-on-a-small-budget", "how-to-make-a-premium-ecommerce-site-more-trustworthy", "how-to-write-ad-copy-in-your-customers-words"],
"playbook": "fix-the-message-order-on-a-b2b-landing-page",
},
{
"slug": "how-to-market-a-niche-b2b-service-on-a-small-budget",
"topic": "growth-from-zero",
"q": "How do I market a niche B2B service on a small budget?",
"short": "Focus on the few places your buyers already look and on not losing the visitors you get. For SMPC, a Swiss medical device compliance firm, I recommended three months of Google Ads, SEO, LinkedIn content and conversion work first, then LinkedIn ads and personal outreach. Weekly reports kept it honest. With a small buyer group, spending on every channel means reaching no one.",
"body": """## Niche changes the plan

A niche B2B service has a small number of possible buyers. Many of them search when a problem is urgent, and most of them check the founder's profile before they reply. That means search, a strong website and a credible LinkedIn presence matter more than broad awareness.

## The modules I proposed for SMPC

- Google Ads: keyword and target research, campaign creation and weekly optimisation, for leads
- SEO: one blog article a week, on-page optimisation and backlinks, for traffic
- LinkedIn content: three posts a week from the founder, for reach and leads
- Website and conversion work: weekly review of numbers and recordings, then fixes
- LinkedIn ads: added later, once the message is proven
- LinkedIn outreach: 25 chosen people a week, contacted without a pitch, to build relationships

## Start with four, add two

I recommended starting with Google Ads, SEO, social content and conversion work for three months. Conversion work was the most important, because there is no point paying for niche visitors and then losing them on a weak page. LinkedIn ads and outreach came after.

## Fix the page first

Before any spend, I audited SMPC's website and rewrote the landing page around the questions visitors ask in order. A niche buyer who lands on a vague page rarely comes back.

## Report every week

Weekly progress reports, a meeting every two weeks and a monthly feedback session. Small budgets need tight loops, so you see within weeks which module earns its place.""",
"related": ["what-should-a-b2b-services-homepage-say", "how-to-run-growth-as-a-one-person-marketing-team", "when-should-a-startup-hire-its-first-marketer"],
"playbook": "fix-the-message-order-on-a-b2b-landing-page",
},
{
"slug": "how-to-make-a-premium-ecommerce-site-more-trustworthy",
"topic": "performance-marketing",
"q": "How do I make a premium ecommerce site more trustworthy?",
"short": "Replace generic claims with proof only you can show. Put athletes or known customers, guarantees, free returns, production photos and named testimonials near the top. Cut long text, keep product pages as premium as the homepage, and remove anything that looks like a template. At VU, a Swiss goggle brand, this is how we made the site match a product used by Olympians.",
"body": """## Generic words cost trust

Words like brilliant or highest quality goggles could sit on any competitor's site. Shoppers skip them. On VU's site, I asked one question of every line: could another brand say this? If yes, it went or got replaced with a fact.

## Lead with proof

- The hero showed an Olympic athlete wearing VU, with the Olympic rings
- Testimonials had faces, stars and the athlete's real name, linked to the source
- Guarantees went on the homepage: lifetime guarantee and free returns
- Production photos showed how the goggles are made
- Years in business and the number of happy customers were stated plainly

## Keep the premium feel on every page

Hotjar recordings showed people leaving when product page images did not match the elegant homepage. We rebriefed product images like a premium listing: magnets first, then materials, then a clear comparison with ordinary goggles.

## Cut the text

Recordings also showed that long paragraphs confused visitors. We cut each block to two or three sentences and gave the key features, the magnets and the design, their own sections.

## Remove template signs

Small things signal a cheap site: a powered by Shopify line, too many currencies, missing help links. We removed or fixed them, and added a help section in the footer.

## Say what you are not

VU positioned itself as a brand for real skiers and snowboarders, not beginners. Being clear about who a product is not for makes it more believable to the people it is for. The result was a brand that became the number one Swiss choice for pro skiers and snowboarders.""",
"related": ["how-to-find-where-your-ecommerce-funnel-leaks", "how-to-write-ad-copy-in-your-customers-words", "what-should-a-b2b-services-homepage-say"],
"playbook": "run-a-weighted-ux-audit-of-a-landing-page",
},
{
"slug": "how-to-write-ad-copy-in-your-customers-words",
"topic": "performance-marketing",
"q": "How do I write ad copy in my customers' own words?",
"short": "Collect the exact phrases customers use in reviews, messages and calls, and keep them in one list grouped by benefit. Use those phrases in ads, product pages and emails instead of brand language. At VU I kept a bank of rider phrases, such as changing lenses without removing gloves or helmet, and no need to keep wiping. They became headlines and image captions.",
"body": """## Why customer words work

Customers describe a benefit the way they feel it. Brands describe it the way they built it. A rider does not say cylindrical lens with 180 degree field of view. They say clear views and no squinting. The second one sells.

## Where to find the words

- Product reviews and review sites
- Instagram comments and messages
- Support emails and chat logs
- Sales and onboarding calls
- Competitor reviews, which show what people wish they had

## Build a bank by benefit

At VU I grouped phrases by product benefit:

- Magnetic lens change: change lens without removing gloves or helmet
- Low light lens: brightens everything, more contrast, no need to keep wiping
- High light lens: protection from glare, spot the slopes anytime
- Wide lens: no squinting, clear views, perfect fit
- For snowboarders: ready to shred, first tracks, hit the slopes

## Use the bank everywhere

Every ad, product page section and email starts from the bank. The magnet benefit became a headline. The low light phrases became image captions. The same words in the ad and on the page also make the visit feel consistent.

## Test against your own copy

Run the customer phrase against your best brand line in the same ad set. Keep the winner.

## Use it in new markets too

At Bueno, the strongest messages also came from customers: a Norwegian owner who chose us because the ad promised support in Norwegian. Translating that need into each language worked better than translating our own taglines.""",
"related": ["how-to-make-a-premium-ecommerce-site-more-trustworthy", "how-to-enter-a-new-country-market", "what-should-a-b2b-services-homepage-say"],
"playbook": "build-customer-personas-from-your-paying-customers",
},
{
"slug": "why-do-cash-referral-rewards-fail",
"topic": "growth-from-zero",
"q": "Why are my customers not using our referral programme?",
"short": "Often the reward is not the problem. Timing and friction are. People refer when they have just felt the value and when sharing takes seconds. At Bueno, raising cash rewards did little to move property owners. What mattered was asking at the right moment, making the link easy to find, and offering rewards tied to the product, such as a free bill check or tax guide.",
"body": """## The usual reaction

When referrals are low, the first idea is to raise the reward. At Bueno we looked at this closely. Cash style rewards in the range we could afford did not change behaviour much. Owners were not holding back because the reward was too small.

## The real barriers

- Timing: we asked before people had felt the value of the product
- Friction: the link was hard to find and the friend's sign up took effort
- Relevance: plain cash did not connect to why people used Bueno

## What works better

Ask at the moment of value. For a fintech serving property owners, that is when a bill is sorted, an account is active or a tax return is filed. A customer who just saved time and stress is ready to tell a neighbour.

Make sharing take seconds. Put the link in the emails people already open and at the top of the account, and keep the friend's first step short.

Tie the reward to the product. At Bueno, the referral programme rewarded both sides with product value: a free electricity overpayment check with a discount, or a free non-resident tax guide. These rewards also show the friend what the product does.

## Use communities

Some of our best word of mouth happened in places customers already gather, such as Facebook groups of foreign owners in Spain. British owners in particular trust what their peers say. A referral programme should support that, not replace it.

## Measure honestly

Track links shared, redemptions and paying referrals each month. If numbers stay low, change timing and friction before touching the reward.""",
"related": ["how-to-run-growth-as-a-one-person-marketing-team", "how-to-get-your-first-1000-customers-d2c", "what-is-a-good-ltv-to-cac-ratio"],
"playbook": "set-up-a-customer-referral-programme",
},
{
"slug": "how-to-launch-a-two-sided-marketplace",
"topic": "growth-from-zero",
"q": "How do I launch a two-sided marketplace?",
"short": "Work out which side is small and which is large, and treat them differently. Recruit the small side by hand with strict quality checks. Grow the large side with a position that lowers the barrier, push tactics like outreach and content, and pull tactics like partner communities and referrals. Set a ladder of milestones. This is the plan I wrote for Nest, a wellbeing platform for professionals.",
"body": """## Size each side

In most marketplaces, one side is much smaller than the other. For Nest, demand was large: doctors, nurses, consultants and people in government forces under heavy pressure. Supply needed only a small group of excellent experts. That shaped everything.

## Recruit supply by hand

We did not need many providers. We needed the right ones. The plan was manual outreach to a short list, strong verification, and letting good experts bring in other good experts.

## Lower the barrier for demand

The top problems were the taboo of reaching out, poor access when people feel vulnerable, and no safe community. So Nest was positioned around wellbeing and becoming a better self, not around long term therapy. That frame made joining feel safe.

## Push and pull

- Push: manual outreach and engagement, content, team and influencer networks, then paid social and search
- Pull: partnerships with existing communities and professional organisations, member referrals, and incentives for people on the fence

## Climb a milestone ladder

Each milestone had its own tactic. The first hundreds of sign ups came from an MVP landing page. Social channels came next, then the website and app, then an alpha, then the public launch. Moving between rungs meant partnerships, manual outreach for group events and a social launch, not jumping straight to paid ads.

## Plan the first weeks

The first month was written week by week: talk to experts and the team, redesign the website, launch with payments, start ads, reach out to communities, prepare a Product Hunt checklist and run email and WhatsApp campaigns.

## Give people a reason to return

An events series where members share their own stories kept the community active between product releases.""",
"related": ["how-to-get-your-first-1000-customers-d2c", "how-to-validate-a-startup-idea-with-a-small-ad-budget"],
"playbook": "plan-the-launch-of-a-two-sided-marketplace",
},
{
"slug": "how-to-run-growth-as-a-one-person-marketing-team",
"topic": "marketing-leadership",
"q": "How do I run growth when I am the only marketer?",
"short": "Work in small weekly bets, not big plans. Pick three to six mini-projects each week, finish each by Friday, and plan next week by Saturday. Focus on a few channels, automate reporting, and keep a written log of what you learned. I built Bueno's online marketing single-handedly across 28 countries this way, reaching a 24x LTV to CAC ratio.",
"body": """## The trap

A solo marketer gets pulled in every direction: ads, emails, website, partners, content, reports. Big plans stall because there is no one to hand work to. Everything is half done.

## Weekly mini-projects

At Bueno I run growth on a simple rule:

- At least three and at most six mini-projects a week
- Each one finished by Friday end of day
- Next week's projects decided by Saturday end of day

A mini-project is small enough to finish: one new ad angle, one email to stuck leads, one landing page fix, one partner pitch. Finished small things teach you more than unfinished big ones.

## Fewer channels, done well

With limited hours, I pick the channels that already show results and go deep. At Bueno that meant Meta and Google ads per language market, email to leads and customers, and community groups where owners already talk. New channels get a mini-project slot as a test, not a permanent commitment.

## Let customers guide you

Read session recordings and customer feedback every week. They tell you where the next mini-project should go. At Bueno, recordings showed that most people never scrolled, so the hook above the fold carried almost all the weight. That set several weeks of work.

## Write down what you learn

Keep a running list of learnings, such as which ad placements inflate clicks or which subject lines hurt deliverability. As a solo marketer, your notes are your team's memory.

## Report simply

Automate a weekly snapshot: visits, leads, registrations, customers and cost per customer by market. It keeps founders informed without a long meeting and keeps you honest about what is working.""",
"related": ["when-should-a-startup-hire-its-first-marketer", "what-is-a-good-ltv-to-cac-ratio", "why-do-cash-referral-rewards-fail"],
"playbook": "run-weekly-mini-projects-as-a-growth-team",
},
{
"slug": "why-is-my-facebook-ad-ctr-suspiciously-high",
"topic": "performance-marketing",
"q": "Why is my Facebook ad click-through rate suspiciously high?",
"short": "Check your placements. Audience Network, which shows your ads inside other apps, often produces very high click-through rates from accidental or low quality clicks that never convert. At Bueno, these placements made some campaigns look far better than they were. Break results down by placement, compare clicks with sign ups, and exclude placements that send clicks without results.",
"body": """## The warning sign

A normal click-through rate for a Meta ad is usually in the low single digits or below. If one ad set suddenly shows a rate many times higher, it is rarely a creative breakthrough. It is usually where the ad is shown.

## What we found at Bueno

At Bueno, some campaigns showed click-through rates far above our normal range. When I broke the results down by placement, the extra clicks came from Audience Network. These clicks did not turn into registrations. People were tapping by accident inside other apps, or the clicks came from low quality inventory.

## How to check your own account

- Break down results by placement in Ads Manager
- Compare click-through with landing page views, not just link clicks
- Compare clicks with sign ups or purchases per placement
- Look at time on site from that traffic in your analytics

If a placement has high clicks and almost no landing page views or conversions, it is inflating your numbers.

## What to do

Exclude the placement from campaigns that optimise for leads or purchases. Rerun the campaign and compare cost per result, not cost per click.

## Why it matters beyond waste

Inflated clicks also teach the algorithm the wrong thing. If the system thinks an audience is clicking happily, it will keep spending there. Your reports look good while your cost per customer gets worse.

## Related checks

While you are in the account, check that your pixel fires correctly after cookie consent. Broken tracking and inflated clicks together can make a weak campaign look like your best one.""",
"related": ["how-to-cut-customer-acquisition-cost-on-paid-ads", "what-to-check-before-hiring-a-marketing-agency", "facebook-ads-or-google-ads-for-a-d2c-brand"],
"playbook": "audit-tracking-before-handing-marketing-to-an-agency",
},
{
"slug": "how-to-plan-a-christmas-campaign-for-ecommerce",
"topic": "performance-marketing",
"q": "When should an ecommerce brand start planning its Christmas campaign?",
"short": "In September. Use September to review past seasons and prepare assets, October to test and launch winter themed ads, mid November to switch to gift ads, and December to boost spend, retargeting and countdown timers. Budget Black Friday, Cyber Monday and Boxing Day separately. At Infento, each year we started earlier than the last, because the earlier start paid off.",
"body": """## Why September

The weeks before Christmas are the most expensive time to advertise and the worst time to discover a broken checkout or a missing photo. Brands that start creative work in November spend December fixing things.

## Look back first

At Infento, the plan for each Christmas started with the past ones: when we started, which markets and languages we targeted, and what we tested. Each year we started earlier and added markets, and the plan showed why.

## The phases

- September: action plan, asset mapping, budget, video script, photoshoot, payment gateway updates
- October: test platforms, placements and tools while costs are lower, translate and test assets, launch winter themed ads late in the month
- November: launch Christmas gift ads mid month, increase spend toward the end, run Black Friday and Cyber Monday as separate budgets
- December: boost spend, add countdown timers to ads, newsletter and website, increase retargeting, run Boxing Day

## Plan audiences by theme

Run separate audiences for winter themes, Christmas gifts, general retargeting, existing customers who might upgrade, abandoned carts, and interest groups that fit your product.

## Check tracking before launch

Le Patron's Christmas brief had a fixed technical step: check that Tag Manager sends events to Facebook and Google, that checkout events fire, and that retargeting lists are filling. Only then launch.

## Start from proven winners

Le Patron's learnings from earlier years shaped each new brief: lookalike audiences in the strongest country converted best, carousel ads brought the most sales, and Google worked best for retargeting. Write your learnings down every January so next September starts ahead.""",
"related": ["should-your-checkout-have-a-discount-code-field", "facebook-ads-or-google-ads-for-a-d2c-brand", "how-to-get-your-first-1000-customers-d2c"],
"playbook": "plan-a-christmas-campaign-for-an-ecommerce-brand",
},
]

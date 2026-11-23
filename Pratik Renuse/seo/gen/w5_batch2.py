# Writer 5, batch 2. Sources: Notion Renuse > UX Audit Template, Work > Misc > PH (Website Audit Template,
# MyWebAudit landing page audit, SEO Steps Template, Vertical unit SEO), Work > Misc > Twitter, Interns hiring,
# Work > Consulting > Vertical Unit (Ads, Website, tasks for developer, VU BF emails, Keywords, EN and DE checklist),
# Work > Consulting > Bueno (UGC guidelines and scripts, Newsletter Template, Homepage Dec 2023, Bueno Ads,
# Problems, Spain24x7 scripts and illustration test, 1 to 1 feedbacks).

ANSWERS_EXTRA = [
{
"slug": "what-should-a-login-page-include",
"topic": "performance-marketing",
"q": "What should a good login page include?",
"short": "A clear Log in heading, a one click option to sign in with Google or a social account, a visible Forgot password link, a Create an account link for people who landed there by mistake, your logo, and an eye button to show the password. In my UX audit template the first four carry high weight because each one, when missing, stops a returning customer at the door.",
"body": """## Why the login page matters for growth

Most teams obsess over the homepage and forget the login page. But the login page is where returning customers, the cheapest revenue you have, either get in or give up. When I built my UX audit template in 2021, I gave login its own category and weighted every check, so the team fixing it knew what to do first.

## The high weight checks

- Users can sign in with a social network or Google account in one click
- The login page also offers Create an account, because many new visitors click Log in by mistake
- There is a clear Log in or Sign in heading, so people know where they are
- A Forgot password link sits on the login screen itself, not one click away

## The medium and low weight checks

- Your product logo is on the page, which reassures people they are on the real site
- An eye button lets users see the password they typed
- A Remember me checkbox, which is nice to have but rarely decides anything

## How I use it

I go through the page as a returning customer on a phone, then again as a new visitor who clicked the wrong button. Every failed high weight check goes to the top of the fix list. Each check in the template links to the research behind it, from sources such as Nielsen Norman Group, so the conversation with the developer is about evidence, not taste.

## A common mistake

Teams hide the password reset behind a help page or an email to support. Every extra step there produces a support ticket or a lost customer. Put the reset link under the password field and test that the email arrives within a minute.""",
"related": ["how-to-design-a-sign-up-and-password-step", "how-to-prevent-errors-in-web-forms", "which-ux-problems-should-you-fix-first"],
"playbook": "audit-a-login-and-registration-flow",
},
{
"slug": "how-to-design-a-sign-up-and-password-step",
"topic": "performance-marketing",
"q": "How do you design a sign-up and password step that does not lose users?",
"short": "Show password rules before people type, confirm in real time that the two passwords match, offer one click registration with Google or a social account, and check each field the moment it is filled rather than after the user presses the button. Put the terms checkbox right next to the register button. These are the high weight registration checks in my UX audit template.",
"body": """## Where registration loses people

Registration is a moment of commitment. The visitor has decided to try you, and every small irritation now feels bigger. In my UX audit template, registration has its own category with five checks, and three of them are weighted high.

## The checks

- High: when creating a password, users can see the requirements upfront, such as number of characters, numbers and special characters
- High: when users type the password a second time, the field shows that the two match
- High: users can register with a social network, a Google account or email in one click
- Medium: users can read the terms and conditions, and the I agree checkbox sits next to the registration button
- Medium: fields are checked for correctness instantly, not after the user finishes the whole form

## Why the password rules matter so much

The most common failure I see is a password field that only reveals its rules after the user fails them. The user types, presses the button, gets a red error, and has to guess again. Showing the rules first turns a failure into a checklist the user can tick.

## Pair it with the intent of the click

A sign-up form is also a promise kept or broken. If the button said try it free, the next screen should get the user into the product fast, not into a long questionnaire. I cover that side in a separate answer on form completion.

## How to test it

Register on your own site on a phone, using a password manager and then without one. Then register with a deliberately weak password. If you hit an error you did not expect, your users hit it every day.""",
"related": ["what-should-a-login-page-include", "how-to-prevent-errors-in-web-forms", "how-to-improve-sign-up-form-completion"],
"playbook": "audit-a-login-and-registration-flow",
},
{
"slug": "what-to-check-in-a-mobile-ux-audit",
"topic": "performance-marketing",
"q": "What should you check in a mobile UX audit?",
"short": "Check that every button and form field is at least 44 pixels high, that the right keyboard opens for each field, that body text is responsive and above 16 pixels, that the page works upright and sideways, and that forms are cut to the minimum. Then check one hand reach, swipeable galleries and product images that fill most of the screen. Most paid social traffic is mobile, so these checks decide whether ad spend converts.",
"body": """## Why mobile gets its own audit

Paid social traffic is mostly mobile. A page that looks fine on a laptop can quietly fail on a phone, and you only see it as a low conversion rate. In my UX audit template, mobile UX is a separate category, and the heavy checks are about fingers, keyboards and text.

## High weight checks

- Buttons and clickable elements have finger friendly design, at least 44 pixels high
- The site works in both vertical and horizontal positions of the phone
- The right keyboard opens for each field: numbers for phone and card fields, email layout for email
- The main text is responsive and more than 16 pixels

## Medium weight checks

- Forms are shortened to the minimum, because fewer fields means higher conversion
- All active elements can be reached with one hand
- The product image takes 60 to 90 percent of the screen on product pages
- Gallery photos are swipeable
- Images are sharp, with no visible pixels
- Access to phone functions, such as location or camera, is requested only in context
- The footer holds secondary links and social icons, not primary actions

## Low weight checks

- Text on images is easy to read and does not blend into the picture
- Autocorrect is switched off in fields like names and codes
- For apps, the design matches the store screenshots

## How I run it

I open the page on a real phone, not a desktop emulator, and try to buy or sign up with one thumb while standing. At VU, a Swiss goggle brand, the developer brief that followed an audit like this put the goggle image alone in the hero, moved text below it and made text sizes consistent across the page.""",
"related": ["how-to-brief-a-developer-on-mobile-homepage-fixes", "which-ux-problems-should-you-fix-first", "how-to-prevent-errors-in-web-forms"],
"playbook": "run-a-weighted-ux-audit-of-a-landing-page",
},
{
"slug": "how-to-write-error-messages-that-help-users-recover",
"topic": "performance-marketing",
"q": "How do you write error messages that help users recover instead of leaving?",
"short": "Highlight the field with the problem and put the cursor there, say what caused the error and what to do next, keep every error in the same tone of voice, never blame the user and avoid exclamation marks. Your 404 and 503 pages should tell people where to go next. These are the error recovery checks in my UX audit template.",
"body": """## Errors are a conversion problem

An error message is the moment a user decides whether to try again or close the tab. In my UX audit template, helping users recognise, diagnose and recover from errors is its own category. It is built on a well known usability heuristic from Nielsen Norman Group, and I turned it into checks a marketer can test in an hour.

## The checks

- High: when an error is found, the field is highlighted and the cursor is placed in it
- Low: all errors are written in the same style and tone of voice
- Medium: tips are written without criticising the user
- Medium: 404 and 503 error pages tell the user what to do next
- Medium: the error text states the possible cause and the next action if the user cannot fix it, for example: we are updating the server, try again in two hours
- Low: avoid exclamation marks in error messages

## What a good error looks like

Bad: Invalid input!
Good: This phone number is missing a digit. Check the number and try again.

The good version names the field, the cause and the next step, and it does not shout.

## Do not forget system errors

Teams write form errors carefully and forget the pages nobody designs: the 404 page, the payment failure page, the server error page. A custom 404 page with links to your main pages and search keeps people on the site. My website audit template scores a custom 404 page separately for this reason.

## Make it consistent

Keep a short list of your error messages in one document. When copy is written by different developers at different times, tone drifts and users feel it. One owner, one tone.""",
"related": ["how-to-prevent-errors-in-web-forms", "what-is-visibility-of-system-status-in-ux", "which-ux-problems-should-you-fix-first"],
"playbook": "run-a-weighted-ux-audit-of-a-landing-page",
},
{
"slug": "how-many-fonts-and-colours-should-a-website-use",
"topic": "performance-marketing",
"q": "How many fonts and colours should a website or landing page use?",
"short": "Keep to no more than two font families, no more than three font sizes on a page and no more than three primary colours. Main text should be at least 14 pixels on desktop and 16 on mobile, with contrast of at least 4.5 to 1. Use capital letters only for labels, headers and acronyms. These come from the visual design and typography checks in my UX audit template.",
"body": """## Why limits help conversion

A page with many fonts, sizes and colours has no clear hierarchy. When everything shouts, the visitor cannot find the one thing you want them to do. My UX audit template turns this into concrete limits, each linked to a source.

## Typography checks

- High: font size and weight differ for different content types, such as headings, body and labels
- High: text content is at least 14 pixels
- Medium: no more than two font families are used
- Medium: different font styles separate content from controls
- Medium: uppercase is used only for labels, headers or acronyms

## Visual design checks

- Medium: no more than three font sizes on the page
- Medium: no more than three typefaces per page, including the title
- Medium: no more than three primary colours
- High: contrast of the main text is at least 4.5 to 1
- Medium: hierarchy, content or function is never conveyed by colour alone
- Medium: lines are neither too long nor too short
- Medium: capital letters are not overused

## How to check quickly

Take a screenshot of the page and count the sizes and colours you see. Then run the main text colour through a contrast checker such as the WebAIM tool. Finally, blur the screenshot. One element should still stand out: the main call to action. If several do, cut.

## What I saw in practice

At VU, the developer brief after a review asked to make the description text size consistent across the whole homepage and to reduce an oversized partner logo. At Bueno, the homepage brief asked for readable blocks instead of walls of text, because most customers are over 35. Neither change was glamorous. Both made the page easier to read.""",
"related": ["which-ux-problems-should-you-fix-first", "what-to-check-in-a-mobile-ux-audit", "how-to-brief-a-designer-for-a-fintech-homepage"],
"playbook": "run-a-weighted-ux-audit-of-a-landing-page",
},
{
"slug": "what-is-visibility-of-system-status-in-ux",
"topic": "performance-marketing",
"q": "What does visibility of system status mean for a website, and how do you check it?",
"short": "It means the site always tells users what is happening: which page they are on, whether a click worked, and how long a wait will take. Show a loader if the system thinks for more than two seconds, give a time hint if it takes more than three, start every screen with a descriptive title and show which options are already selected. It is the first of Nielsen's usability heuristics and a category in my UX audit template.",
"body": """## The idea

Visibility of system status is the first of the ten usability heuristics published by Jakob Nielsen. Put simply: never leave the user guessing. If a payment is processing, say so. If a filter is applied, show it. Silence makes people click twice, refresh, or leave.

## The checks in my template

- High: menu items use user friendly terms, not internal names
- High: if a request takes more than three seconds, a loader appears with a hint of how long it will take, in seconds or visually
- High: each screen starts with a title that describes its content
- High: when users can select several options, the system shows which are already chosen
- Medium: it is clear which page you are on
- Medium: clickable elements change on hover
- Medium: if the system thinks for more than two seconds, a loader is shown
- Low: icons show their status, for example a filled heart after saving
- Low: if a user selects or reorders objects, the change is shown

## Where marketers meet this

Checkout and sign-up are where it matters most. A buy button that gives no feedback for three seconds produces double orders and abandoned carts. A sign-up that ends on a blank screen leaves the user unsure whether it worked, which is why my template also checks that form submission confirmation is visually distinct.

## A quick test

Use your site on a throttled connection. Chrome developer tools can simulate slow mobile internet. Every place where you wonder whether something is happening is a place to add a loader, a message or a title.""",
"related": ["how-to-write-error-messages-that-help-users-recover", "how-to-make-website-navigation-easy-to-use", "which-ux-problems-should-you-fix-first"],
"playbook": "run-a-weighted-ux-audit-of-a-landing-page",
},
{
"slug": "how-to-make-website-navigation-easy-to-use",
"topic": "performance-marketing",
"q": "How do you make website navigation easy to use?",
"short": "Put the main navigation at the top where people expect it, keep the logo on every page linking home, keep the main items visible instead of hidden behind a menu button, use specific names rather than catalogue or goods, and keep navigation consistent with room to grow. Add breadcrumbs for multi level sites. These are high weight checks in my UX audit template.",
"body": """## Familiar beats clever

Visitors arrive with habits learned on thousands of other sites. Navigation that breaks those habits costs attention you need for the sale. My UX audit template checks navigation under three headings: architecture, match with the real world, and recognition over recall.

## High weight checks

- Navigation sits where users expect it, at the top
- Website navigation is similar to navigation on other websites
- The main navigation items are always visible and not hidden behind a menu button
- The logo appears in the header on every page and leads to the home page
- Users can navigate back and forth on any page
- Navigation is consistent across the site
- There is room for future navigation growth

## Medium weight checks

- If the menu has sub items, that is visually clear
- Menu items have specific names, not generic ones like catalogue or goods
- Related information is grouped together
- A search bar is visible on every page for larger sites
- Breadcrumbs exist for multi level processes

## Real fixes from client work

Small navigation bugs are common after a redesign. On VU's German site, a review found that the Home button landed on the wrong page, the main call to action did not go to the shop, and a story button did not link to the about page. None of these show up in analytics as an error. They show up as lower conversion.

## How to test

Ask someone who has never seen your site to find three things: a product, the returns policy and the contact page. Time them and watch where they click. If they hesitate, the navigation is talking in your words, not theirs.""",
"related": ["what-is-visibility-of-system-status-in-ux", "which-ux-problems-should-you-fix-first", "how-to-give-website-users-control-and-freedom"],
"playbook": "run-a-weighted-ux-audit-of-a-landing-page",
},
{
"slug": "which-ux-problems-should-you-fix-first",
"topic": "performance-marketing",
"q": "Which UX problems should you fix first on a website?",
"short": "Fix the problems that block an action before the ones that only look untidy. In my weighted UX audit, the first fixes are usually: forms with too many fields or poor spacing, buttons that do not stand out, missing reviews from real customers, no cookie choice, unclear visual hierarchy and missing progress indicators. Score every check by weight, sort the failures, and do the heavy and easy ones first.",
"body": """## Weight before effort

When a founder sends me a site, the instinct is to fix whatever looks worst. That is usually the wrong order. In my UX audit template every check has a weight of high, medium or low, set by how directly it blocks a user from acting. The fix list is sorted by weight first and effort second.

## High weight failures I see most often

- The number of fields in forms is not minimal
- There is not enough space between form fields
- Buttons do not stand out from other content by colour or size
- Alert messages are inconsistent
- Contrast of the main text is below 4.5 to 1
- Form submission confirmation is not visually distinct
- There is no progress indicator in a multi step flow
- Visual hierarchy does not lead the user to the required action
- There is no option to refuse cookies, or no permission request at all
- There are no reviews from real customers
- The customer support number is not visible in the footer

## What can wait

Low weight checks, such as a Remember me box, captions on every icon or a live chat on every page, are worth doing later. They rarely decide whether someone buys.

## How to run the order

- Score each category so you see where the site is weakest
- List every failed high weight check
- Estimate effort for each as small, medium or large
- Ship the high weight, small effort fixes this week
- Watch session recordings to confirm the fix changed behaviour

## A note on taste

Every check in my template links to the research behind it, from sources like Nielsen Norman Group, Baymard Institute and Smashing Magazine. That column ends debates about personal preference and keeps the team focused on what users actually struggle with.""",
"related": ["what-to-check-in-a-mobile-ux-audit", "how-many-fonts-and-colours-should-a-website-use", "how-to-find-where-your-ecommerce-funnel-leaks"],
"playbook": "run-a-weighted-ux-audit-of-a-landing-page",
},
{
"slug": "how-to-give-website-users-control-and-freedom",
"topic": "performance-marketing",
"q": "What does user control and freedom mean on a website, and what should you check?",
"short": "Users should always be able to cancel, go back, edit their own details, skip onboarding and delete their account, and the site should not demand extra Submit or Apply steps once an action is done. Before anything irreversible, ask for confirmation and explain the consequence. These checks come from my UX audit template, built on Nielsen's usability heuristics.",
"body": """## Why freedom builds trust

People commit more easily when they know they can get out. A sign-up that offers a clear way to cancel or delete feels safer than one that feels like a trap. That is why user control and freedom, one of Jakob Nielsen's usability heuristics, is a category in my UX audit template.

## The checks

- High: once users complete an action, the system does not require an extra step like Submit or Apply
- High: users can delete their account
- Medium: breadcrumbs help with multi level processes
- Medium: there is a cancel option where it is needed
- Medium: users can cancel a process midway
- Medium: users can edit information about themselves
- Medium: users can skip any system issue that is not essential
- High: users can skip onboarding or restart it from the beginning
- High: before potentially dangerous actions, such as deleting data, the site asks for confirmation and explains the consequences

## The marketing angle

Founders sometimes fear that an easy exit means more churn. In practice, a hidden cancel button produces angry reviews, chargebacks and support tickets, all of which cost more than a clean exit. A clear exit also lets you ask one question on the way out, which is some of the most useful feedback you will get.

## How to check

List every action a user can take: sign up, change a plan, edit details, cancel, delete. Try each one on mobile. Count the steps and note any place where you could not undo or could not leave. Those are your fixes.""",
"related": ["how-to-make-website-navigation-easy-to-use", "what-makes-a-good-help-centre-and-faq", "which-ux-problems-should-you-fix-first"],
"playbook": "run-a-weighted-ux-audit-of-a-landing-page",
},
{
"slug": "what-makes-a-good-help-centre-and-faq",
"topic": "performance-marketing",
"q": "What makes a good help centre or FAQ page?",
"short": "Help should never interrupt progress: it opens in a new tab so users can return to where they were, important explanations stay on screen as long as needed, the FAQ is divided into categories and searchable, and if the answer is missing there is a way to ask a new question. New users get help gradually, with advanced features hidden by default. These are the help and documentation checks in my UX audit template.",
"body": """## Help is part of the funnel

For products that need explaining, such as a fintech account for foreign property owners in Spain, the help section is where doubts get answered or turn into abandoned sign-ups. In my UX audit template, help and documentation is its own category.

## The checks

- High: users can skip onboarding or start it again from the beginning
- High: before dangerous actions, the site asks for confirmation and explains the consequences
- Medium: users can resume work where they left off after getting help, for example because help opens in a new tab
- Medium: instructions, hints and help blocks are clearly visible
- Medium: if users cannot find their answer, they can ask a new question or see a phone number or email
- Medium: the FAQ is user friendly, divided into categories and searchable
- Medium: new users receive help gradually, with advanced features not shown by default
- Low: important explanations stay on screen as long as the user needs them
- Low: there is a live chat on every page

## Where FAQ content should come from

Do not invent FAQ questions in a meeting. At Bueno we built an FAQ bank from the questions real customers ask, and fed the same bank into the weekly newsletter. The questions customers send support each week are the ones your next visitor has but will not ask.

## Asking for help should not stop the sale

The check I see failed most is that asking for help interrupts progress. A help link that replaces the checkout page, or a chat widget that covers the pay button on mobile, loses the order. Test your help flow in the middle of a purchase.""",
"related": ["how-to-give-website-users-control-and-freedom", "how-to-structure-a-weekly-newsletter-for-a-niche-audience", "which-ux-problems-should-you-fix-first"],
"playbook": "run-a-weighted-ux-audit-of-a-landing-page",
},
{
"slug": "how-to-prevent-errors-in-web-forms",
"topic": "performance-marketing",
"q": "How do you prevent errors in web forms before they happen?",
"short": "Keep the field name visible even after it is filled, show character limits, block the wrong data type in a field, make fields case insensitive where possible, fill sensible defaults, validate complex fields like passwords in real time and keep the button inactive until required fields are complete. Prevention beats a good error message. These are the error prevention checks in my UX audit template.",
"body": """## Prevention is cheaper than recovery

Every error a user hits is a chance to leave. My UX audit template separates error prevention from error recovery, because the best error message is the one nobody sees.

## The checks

- High: complex fields such as password or username are validated in real time
- Medium: the error message points to the field with the problem
- Medium: the name of the field is always visible, including when it is filled
- Medium: in forms with two or more fields, the button stays inactive until all required fields are filled
- Medium: fields are not case sensitive where that makes sense, such as email
- Medium: users can see the character limit for a field
- Medium: users can preview changes if reverting them takes a long time
- Medium: fields contain default values where applicable
- Medium: the wrong data type is blocked, such as numbers in a name field
- Medium: a field is checked when the entry is complete, not while typing and not only when the button is pressed

## Pair it with good form design

From the fields and forms category of the same template: put fields in one column, keep the number of fields minimal, leave enough space between them, make field size match the expected input, and let users pick dates and addresses rather than type them.

## The placeholder trap

Placeholders that disappear when the user starts typing are a common source of errors. The user forgets what the field asked for. That is why the template checks that the field name stays visible.

## How to test

Fill your form badly on purpose: wrong formats, missing fields, capital letters in the email, a pasted phone number with spaces. Every time the form accepts junk or rejects something reasonable, you have found a fix.""",
"related": ["how-to-write-error-messages-that-help-users-recover", "how-to-design-a-sign-up-and-password-step", "how-to-improve-sign-up-form-completion"],
"playbook": "audit-a-login-and-registration-flow",
},
{
"slug": "what-does-a-website-growth-audit-cover",
"topic": "growth-from-zero",
"q": "What does a website growth audit cover?",
"short": "My website growth audit scores nine areas: user experience, conversion optimisation, SEO and online visibility, performance and security, technical platform health, accessibility, content and copy, legal, and analytics. Every item is marked done or not done with an impact of high, medium or low, and each area gets a score out of 100. On a 2021 B2B services site I audited, conversion optimisation scored lowest, which told us where to start.",
"body": """## Why a growth audit, not just a UX audit

A UX audit tells you whether people can use the site. A growth audit asks a wider question: is this site able to turn traffic into customers, be found, and be measured? I built a growth assessment template in 2021 to answer it in one sitting for clients.

## The nine areas

- User experience: professional design and branding, relevant headlines, mobile friendly, navigation, relevant images and video, a custom 404 page
- Conversion optimisation: a clear USP, trust factors, testimonials, a primary call to action, secondary calls to action, a noticeable phone number, lead capture forms, chat, a newsletter sign-up and a thank you page
- SEO and online visibility: Google Business Profile, keyword in page title and H1, meta titles and descriptions, sitemap, schema markup, alt text, open graph, a blog or resource centre
- Performance and security: HTTPS, page speed in Google and GTmetrix, caching, a CDN and CAPTCHA on forms
- Technical platform: for WordPress sites, more than twenty checks from backups to debug mode
- Accessibility: alt text, captions, text size, colour contrast, descriptive link text, accessible forms
- Content and copy: compelling messages, readable and scannable text, captivating headlines, no placeholder text
- Legal: GDPR, privacy policy, cookie policy, copyright and WHOIS
- Analytics: Google Analytics or Tag Manager set up and the Facebook pixel in place

## How the scoring works

Each item is a row with a category, an impact level and a done checkbox. Each area gets a score out of 100 and a label from very poor to great. The labels matter more than the numbers: they let a founder see in ten seconds where the site is weakest.

## What it usually shows

On a B2B services website I audited in 2021, user experience and performance were fair, but conversion optimisation was very poor: no clear USP, no trust factors, no lead capture and no thank you page. The site looked fine and still could not turn a visitor into a lead. That is the pattern I see most often.""",
"related": ["what-to-check-on-a-wordpress-site-before-running-ads", "what-should-a-thank-you-page-include", "what-online-visibility-basics-do-small-business-websites-miss"],
"playbook": "run-a-website-growth-audit-across-nine-categories",
},
{
"slug": "what-to-check-on-a-wordpress-site-before-running-ads",
"topic": "performance-marketing",
"q": "What should you check on a WordPress site before spending money on ads?",
"short": "Check that search engines are not discouraged in settings, debug mode is off, wp-config.php is protected, install.php, upgrade.php and readme.html are not publicly reachable, the theme and plugin editor is disabled, unused themes and plugins are removed, automatic updates and backups run, and there is a staging copy for changes. A hacked or deindexed site wastes every euro of ad spend.",
"body": """## Why this belongs in a marketing audit

Marketers rarely look under the hood of WordPress. But I have seen paid campaigns send traffic to sites that were slow, half indexed or showing security warnings. My website growth audit includes a technical WordPress section for this reason, with each item marked high, medium or low impact.

## High impact checks

- Discourage search engines is switched off in the reading settings
- Debug mode is off on the live site
- wp-config.php is protected
- install.php, upgrade.php and readme.html are not publicly accessible
- The theme and plugin editor in the admin is disabled
- Deactivated themes are removed
- Automatic updates are on for security releases
- Directory browsing is disabled
- Premium and general plugins are up to date
- The admin user is not called admin
- Google Safe Browsing shows no warning and there is no malware
- Comment spam is under control

## Medium and low impact checks

- A managed hosting plan
- Regular backups
- The current stable WordPress version
- Clean permalinks
- The WordPress version is hidden
- Post revisions are limited
- Spam protection such as Akismet
- Correct timezone settings
- A development or staging copy for changes
- Sample content removed and unused plugins deleted

## How to work through it

Do this with whoever maintains the site, not alone. Most fixes take minutes for a developer. Start with anything that affects indexing or security, because those can silently undo a campaign. Then check page speed, since a slow WordPress site on mobile can lose a large share of paid clicks before the page loads.

## When the site is not WordPress

The same idea applies to Shopify or any other platform: check indexing, security warnings, speed and backups before you spend on traffic.""",
"related": ["what-does-a-website-growth-audit-cover", "what-to-check-on-a-landing-page-before-sending-paid-traffic", "what-to-check-before-hiring-a-marketing-agency"],
"playbook": "run-a-website-growth-audit-across-nine-categories",
},
{
"slug": "what-should-a-thank-you-page-include",
"topic": "performance-marketing",
"q": "What should a thank you page include after a sign-up or purchase?",
"short": "Say thank you, confirm exactly what happened and what comes next, then use the moment: offer a relevant upsell or cross-sell, ask for a referral, add share buttons, link to your most popular content, and ask one feedback question. A surprise freebie is a strong optional extra. My landing page audit scores the thank you page as its own category because most sites waste it.",
"body": """## The most ignored page in the funnel

A thank you page is seen by your warmest audience at their warmest moment: they just said yes. Yet on most sites it is a single line of text. My landing page audit gives it its own category with eight checks.

## The checks

- Say thank you
- Confirm the transaction, with what was ordered or signed up for and what happens next
- Offer an upsell or cross-sell that fits what they just did
- Ask for referrals
- Add social share buttons
- Link to popular content so the visit does not end here
- Give a surprise freebie, such as a guide or a discount on the next order
- Ask for feedback with a one question survey

## How to choose what to add

You do not need all eight. Pick by business model:

- Ecommerce: confirmation, cross-sell, referral ask
- Lead generation or B2B: confirmation, next step with a time, one piece of content to read before the call
- Newsletter or community: confirmation, a share link, the best past issue

## Measurement matters too

The thank you page is usually where conversion tracking fires. My audit checks thank you page optimisation alongside tracking and reporting for that reason: if the pixel or analytics goal is missing here, your ad platforms optimise blind. Test it after every site change.

## One question survey

The single most useful thing I add is one question: what almost stopped you from signing up today? The answers become objections to handle on the landing page and angles for the next ads.""",
"related": ["what-to-check-on-a-landing-page-before-sending-paid-traffic", "what-does-a-website-growth-audit-cover", "where-to-find-customer-problems-before-writing-ads"],
"playbook": "run-a-website-growth-audit-across-nine-categories",
},
{
"slug": "what-to-check-on-a-landing-page-before-sending-paid-traffic",
"topic": "performance-marketing",
"q": "What should you check on a landing page before sending paid traffic to it?",
"short": "Check that the page copy continues the promise in the ad, the headline is relevant and captivating, there is one primary call to action with no links leading off the page, trust factors and reviews are visible, the phone number is easy to see, the page is fast and secure, and analytics goals, pixel and heatmaps are working. My landing page audit groups this into seven scored categories.",
"body": """## A landing page is not a homepage

A homepage serves everyone. A paid landing page serves one ad and one action. When I audit a page before a campaign, I use a landing page version of my website audit, scored across seven categories.

## User experience

- Professional design and branding
- Mobile friendly
- Relevant images and, where useful, video
- Proper use of whitespace
- No off-page links that let visitors wander away

## Conversion optimisation

- A noticeable phone number where calls matter
- One primary call to action, with secondary ones kept quiet
- Lead capture forms that work
- Relevant trust factors and real reviews
- A clear unique selling proposition
- Honest scarcity where it is true, and an exit popup if it suits the offer

## Content and copy

- Page copy connects with the ad copy, so the visitor recognises the promise they clicked
- Relevant and captivating headlines
- Compelling calls to action
- Easy to read, consistent formatting and easy to scan

## Performance and security

- HTTPS
- Google PageSpeed and GTmetrix scores checked on mobile

## Thank you page, tracking and legal

- A thank you page that confirms and uses the moment
- Facebook pixel tracking, Google Analytics or Tag Manager, analytics goals, and heatmaps or engagement tracking
- Privacy policy, cookie policy, terms and conditions, copyright in the footer

## What fails most

On pages I audit, content and performance often score well while tracking scores poorly: goals not set up, heatmaps missing. That means the campaign will run and nobody will know why it worked or failed. Fix tracking before you spend.""",
"related": ["what-should-a-thank-you-page-include", "what-does-a-website-growth-audit-cover", "what-kpis-to-check-first-in-a-new-paid-campaign"],
"playbook": "run-a-website-growth-audit-across-nine-categories",
},
{
"slug": "what-legal-pages-and-consent-does-a-startup-website-need",
"topic": "growth-from-zero",
"q": "Which legal pages and consent options should a startup website have before marketing it?",
"short": "At a minimum, check for a privacy policy, a cookie policy, a cookie banner that asks permission and lets people refuse, terms and conditions where you sell, and copyright and company details in the footer. For EU visitors, GDPR compliance is a high impact item. I check these in every website audit because missing consent can also break your tracking. Ask a lawyer for the wording.",
"body": """## Why a marketer checks legal

I am not a lawyer, and this is not legal advice. But legal pages show up in my website audits for two practical reasons. First, missing consent options and policies damage trust, especially with older or European audiences. Second, cookie consent decides whether your tracking pixels fire, so it directly affects your ad data.

## What my audits check

- GDPR compliance, marked high impact for any site with European visitors
- A privacy policy
- A cookie policy
- A permission request before using cookies
- A real option to refuse cookies
- Terms and conditions where you sell
- Copyright in the footer
- WHOIS details for the domain

## The tracking connection

In a site and tracking audit I did for Frecious, a Dutch drinks brand, the Facebook pixel only fired after cookie consent. When the consent popup was cached and did not reappear, the pixel never fired and add to cart events were never sent. The legal setup and the marketing data were the same problem.

## Keep company details consistent

When VU moved address, the address had to be updated on the contact page, shipping page, privacy policy, legal page and invoices. Stale details across legal pages are a small trust leak that is easy to miss.

## Practical order

- Get the policies written or reviewed by a lawyer
- Install a consent tool that lets visitors accept or refuse
- Test that your analytics and pixels behave correctly in both cases
- Put the links in the footer of every page
- Recheck after any redesign or tracking change""",
"related": ["what-does-a-website-growth-audit-cover", "how-to-give-website-users-control-and-freedom", "what-tracking-should-an-early-stage-startup-set-up-first"],
},
{
"slug": "what-online-visibility-basics-do-small-business-websites-miss",
"topic": "growth-from-zero",
"q": "What online visibility basics do small business websites usually miss?",
"short": "The usual gaps are a missing or unclaimed Google Business Profile, no map and address, the main keyword absent from the page title and H1, missing or duplicate meta descriptions, no schema markup, no open graph tags for social sharing, missing alt text, and no blog or resource centre. In my growth audits these are quick wins compared with building links or writing dozens of articles.",
"body": """## Visibility before volume

Founders often ask about content strategy before their site can be found for its own name. In my website growth audit, the SEO and online visibility section starts with the basics that a developer can fix in a day.

## The checks I score

- High: Google Business Profile claimed and complete
- High: the site is accessible to search engines
- High: www and non www versions resolve to one address
- High: Google Analytics or Tag Manager installed
- High: the main keyword appears in the page title
- High: keywords used well in the H1
- High: some keywords already rank on page one
- Medium: local map pack listing, map and address on the site
- Medium: a sitemap.xml file
- Medium: meta titles and descriptions present, with sensible length and keywords
- Medium: the brand name in the page title
- Medium: schema markup
- Medium: open graph tags, so shared links show the right image and text
- Medium: alt attributes on images
- Medium: a blog or resource centre

## What I see most often

On a B2B services site I audited, the technical basics were fine: the site was indexable, had a sitemap and analytics. But there was no Google Business Profile, no schema, no keyword in the titles or H1 and no resource centre. The site could be crawled but had nothing to rank for.

## How to fix in order

- Claim and complete Google Business Profile with photos and reviews
- Write a title tag and H1 for each key page around one keyword
- Add meta descriptions that read like ad copy
- Add open graph tags and alt text
- Then start a small resource centre that answers real customer questions""",
"related": ["which-seo-tasks-should-you-prioritise-first", "what-does-a-website-growth-audit-cover", "when-should-a-startup-start-seo-and-social-media"],
"playbook": "run-a-technical-seo-audit-with-a-priority-checklist",
},
{
"slug": "which-seo-tasks-should-you-prioritise-first",
"topic": "growth-from-zero",
"q": "Which SEO tasks should a small team prioritise first?",
"short": "Start with what decides whether pages can rank at all: confirm pages are indexed, check robots.txt and meta robots, fix redirect chains, use one H1 per page, add alt text, go mobile first and remove keyword cannibalisation. Then focus content on user intent and topics rather than exact match keywords, refresh old content and write original product descriptions. Avoid paid links and mass directory links. This is the priority order in my SEO template.",
"body": """## An SEO list sorted by priority

In 2021 I built an SEO step by step template with more than a hundred tasks, each tagged high, average or low priority and linked to further reading. I applied it to VU, the Swiss goggle brand, as their own copy. The value is not the length of the list. It is the priority column.

## High priority: can the page rank at all

- Confirm your pages are indexed
- Check robots.txt and the meta robots tag
- Check server uptime
- Check site depth so key pages are few clicks from the home page
- Fix redirect chains
- One H1 per page, with the keyword in it
- Title tag length and a visible title on every page
- Add image alt attributes before publishing
- Take a mobile first approach and add breadcrumbs
- Check for manual actions and sitemap indexation in Search Console

## High priority: is the content worth ranking

- Focus on user intent
- Think beyond exact match keywords and write about topics
- Build expertise, authority and trust
- Check and improve your old content
- Eliminate keyword cannibalisation, where two pages compete for the same query
- Write original product descriptions, never the manufacturer's copy
- Answer the questions people actually ask

## High priority: what not to do

- Do not buy links
- Do not build masses of directory links
- Do manual outreach for links and PR instead
- Manage expectations honestly with whoever pays for the SEO work

## What can wait

AMP, progressive web apps, video sitemaps, syndication and visual search sit at average or low priority. They help large sites. A small team should not start there.""",
"related": ["what-online-visibility-basics-do-small-business-websites-miss", "how-to-grow-blog-traffic-from-pages-you-already-have", "how-to-launch-an-ecommerce-site-in-a-second-language"],
"playbook": "run-a-technical-seo-audit-with-a-priority-checklist",
},
{
"slug": "in-what-order-should-a-d2c-brand-fix-site-seo-email-and-ads",
"topic": "growth-from-zero",
"q": "In what order should a D2C brand fix its website, SEO, email and ads?",
"short": "Make the website work fully in every language you sell in, then add trust factors, then SEO content, then email marketing, and only then scale ads. Each step makes the next one cheaper: ads sent to a broken or untrusted site waste money, and email needs traffic and trust to have anyone to write to. This was the order I set at VU, the Swiss goggle brand.",
"body": """## The order I used at VU

When I took over marketing at VU, a Swiss brand of ski and snowboard goggles, the plan on the page was five lines with arrows between them:

- Make the website English and German 100 percent working
- Trust factors
- SEO content
- Email marketing
- Ad strategy

Ads came last on purpose.

## Why the website comes first

A working website sounds obvious until you check it. The VU checklist included German translations, a faster site and admin, payment method logos at the end of the page, the VAT split shown at checkout, VAT back on invoices, a new address on site and invoices, and a sitemap update so Google stopped showing old discontinued products. Any of these can quietly lose a sale.

## Why trust comes before traffic

A premium product needs proof. For VU that meant athlete photos, named testimonials, guarantees and free returns on the homepage, and production photos. Without them, more traffic only meant more people leaving.

## Why SEO before email

SEO content brings people who are already searching, such as German shoppers looking for ski goggles before Black Friday. It also gives email something to say beyond discounts.

## Why email before ads

Email turns visitors into repeat buyers at almost no cost. When the list exists, a campaign like a Black Friday early access email can carry a launch without heavy ad spend.

## Then scale ads

With a working, trusted site and an email list to catch interest, every ad euro works harder. VU became the number one Swiss brand for pro skiers and snowboarders, used by Olympians at the 2022 Games, and grew 4.4x in peak season.""",
"related": ["how-to-launch-an-ecommerce-site-in-a-second-language", "how-to-make-a-premium-ecommerce-site-more-trustworthy", "how-to-write-a-black-friday-email-sequence-for-a-premium-brand"],
},
{
"slug": "how-to-launch-an-ecommerce-site-in-a-second-language",
"topic": "growth-from-zero",
"q": "What do you need to check when launching an ecommerce site in a second language?",
"short": "Translate every page including footer, legal pages and checkout, not just the homepage. Show the correct VAT for each country at checkout and on invoices, show local payment methods, make sure every button links to the right page in the new language, research keywords in the local language rather than translating English ones, and update the sitemap so search engines show the right products. This is the checklist I used for VU in English and German.",
"body": """## Translation is the start, not the finish

When VU, the Swiss goggle brand, ran its site in English and German, the first goal was simple: make both languages 100 percent working. The checklist showed how much that phrase hides.

## The VU checklist

- German translations of every page
- A faster site and a faster admin
- Payment method logos at the end of the page
- The VAT split shown at checkout, since Swiss and EU rates differ
- VAT restored in the invoice template
- The new company address on the site and invoices
- A sitemap update so Google stopped listing old, discontinued products

## The review that followed

A native speaker on the VU team then went page by page. The fixes were small and many: the contact page needed centring, the shipping page and legal pages had an old address, the footer needed German text, the about page needed translating, checkout had to display VAT, the German homepage's main button had to go to the shop, the story button had to open the about page, payment logos and partner logos were missing, review widget text was in English, and the Home button landed on the wrong page.

## Keywords are not translations

German shoppers do not search for ski goggles in English. The keyword list used local terms such as skibrille black friday, damen skibrille verspiegelt and skibrille blau verspiegelt, plus searches that mention other goggle brands. Research local search terms directly in the language.

## How to run it

- Build a page by page checklist for the new language
- Ask a native speaker to use the site as a customer and buy something
- Check VAT, currency and payment methods per country
- Research local keywords before writing SEO content
- Resubmit the sitemap and watch which pages get indexed""",
"related": ["in-what-order-should-a-d2c-brand-fix-site-seo-email-and-ads", "which-seo-tasks-should-you-prioritise-first", "how-to-enter-a-new-country-market"],
},
]

ANSWERS_EXTRA += [
{
"slug": "how-to-structure-a-30-second-video-ad",
"topic": "performance-marketing",
"q": "How do you structure a 30 second video ad for a premium product?",
"short": "Open with a problem the viewer has felt, add a twist that hints at a better way, show part of the solution to build curiosity, add social proof, reveal the full benefit, answer the main objection, establish authority with guarantees, and only then mention price as a bonus. I used this seven beat structure for VU's glare and fog ad, a Swiss goggle brand.",
"body": """## Why structure beats production

Most premium brands spend on beautiful footage and then cut it with no argument. Viewers scroll past. A clear sequence of beats does more than a bigger budget. At VU, I scripted ads beat by beat before anyone filmed.

## The seven beats

- Hook with a common problem: a close up of someone blinded by glare or fogged lenses mid run. Voiceover: ever been in the middle of an intense run and found yourself blinded by glare?
- Unexpected twist: cut to a friend in the same conditions, riding easily in VU goggles. What if your goggles adapted as quickly as you do?
- Half the solution: show the one click magnetic lens swap, without explaining everything yet
- Social proof and a little fear of missing out: short testimonial lines and the fact that serious skiers trust the brand
- The full solution without effort: switching to the low light lens in a whiteout, with clear vision
- Objections handled: goggles holding up in extreme weather, Swiss quality and durability
- Authority and reassurance: Swiss mountain backdrop, free shipping, a 30 day return policy and a lifetime guarantee

Then the call to action, with price mentioned last as a bonus rather than the headline.

## Why price goes last

For a premium product, leading with price invites comparison with cheaper goggles. Ending with good value, after the viewer already wants the product, frames price as a reason to act now.

## How to use it for your product

Write one line of voiceover and one line of visual for each beat. If a beat has nothing true to say, cut it rather than invent proof. Then film to the script. Test the hook separately by making two or three versions of the first three seconds with the same body.""",
"related": ["how-to-borrow-a-winning-ad-format-from-another-industry", "how-to-write-a-ugc-script-for-a-physical-product", "how-to-write-a-hook-people-read"],
"playbook": "script-a-premium-product-video-ad-in-seven-beats",
},
{
"slug": "how-to-borrow-a-winning-ad-format-from-another-industry",
"topic": "performance-marketing",
"q": "How do you borrow a winning ad format from another industry without copying it?",
"short": "Find an ad that clearly works in a different category, write out its structure line by line with timings, then rewrite every line with your own product's facts and proof. Keep the rhythm and the questions, change every claim. At VU I took the is it worth the hype format from a food brand's ad and rebuilt it for magnetic ski goggles.",
"body": """## Formats travel, claims do not

Ad formats are like song structures. A question hook, two or three answers and a call to action works for meal shakes and for goggles. What cannot travel are the claims, the proof and the voice. Copy those and you get a weaker version of someone else's ad.

## The VU example

I saved a meal replacement brand's ad that opened with on screen text asking whether the product was worth the hype, then answered the questions people actually ask, one per beat, each with a short on screen caption. I wrote it out with timings, then rebuilt it for VU:

- 0:00 Is VU worth the hype? I am thrilled to introduce Vertical Unit
- 0:03 Trusted by the best in snow sports: if pros use it on the toughest slopes, it is built to perform
- 0:05 These are magnetic quick change goggles, and everyone asks if they really work
- 0:10 One click lens swap, no need to remove helmet or gloves
- 0:12 Polarised lenses for clarity in harsh snow glare
- 0:16 Made in Switzerland with premium quality
- 0:19 A low light lens for fog and whiteouts
- 0:22 High performance without the high price
- 0:29 Hit the link to get yours, with free shipping and a lifetime guarantee at the close

## A second example

Another saved ad, from a cookware brand, used a simple frame: this is literally the only product that does X. It works when you have a real, checkable claim. For VU the comparison point was being the only Swiss goggle combining magnetic, polarised, over the glasses and low light lenses with a lifetime guarantee.

## The process

- Keep a swipe file of ads from other industries
- Transcribe the ones that stop you, with timings
- Mark the structure, not the words
- Fill it only with true facts about your product
- Test it against your current best ad""",
"related": ["how-to-structure-a-30-second-video-ad", "how-to-write-a-ugc-script-for-a-physical-product", "how-to-write-a-comparison-ad-without-naming-competitors"],
"playbook": "build-an-ad-angle-library-for-a-d2c-brand",
},
{
"slug": "how-to-write-a-ugc-script-for-a-physical-product",
"topic": "performance-marketing",
"q": "How do you write a UGC style ad script for a physical product?",
"short": "Write it as one person's honest review: a text anchor such as my feedback after using it, a first line about how long they have used it, two or three concrete features described the way a user feels them, a personal verdict such as I replaced all my eyewear with these, then the risk reducers like free shipping, returns and guarantee, and a simple recommendation. That is the structure of the VU magnetic goggle UGC script.",
"body": """## UGC is a review, not an ad read

User generated content works because it sounds like a person, not a brand. The script has to protect that. When I wrote UGC scripts for VU, the Swiss goggle brand, I started from a review structure I had seen work for a food brand, then filled it only with VU facts.

## The structure

- Text anchor on screen: My feedback after using VU goggles
- Time and verdict: I have been wearing these goggles, and I have to say I am truly amazed
- Feature one, in user language: no need to remove your helmet or glasses, just one click and you are good to go, and the extra strong magnets keep the lens secure
- Feature two: developed in Switzerland, with polarised lenses that cut glare from the snow
- Feature three, for a specific situation: for low visibility days, the low light lens gives definition in white landscapes
- Personal decision: I personally replaced all my eyewear with VU, it is made for me
- Risk reducers: free shipping in the EU and Switzerland, a 30 day return policy and a lifetime guarantee
- Close: I cannot recommend it enough

## Why the risk reducers come late

The viewer has to want the product before guarantees mean anything. Placed at the end, they remove the last reason to wait.

## Brief the creator, do not hand them a teleprompter

Give creators the structure and the facts, and let them say it in their words. A script read word for word sounds like an ad. Ask for two or three different openings so you can test hooks.

## Use the words customers use

The best feature lines come from reviews. VU customers wrote things like change lens without removing gloves or helmet, no squinting and no need to keep wiping. Those phrases go straight into UGC scripts.""",
"related": ["how-to-review-a-ugc-video-before-it-goes-live", "how-to-write-ad-copy-in-your-customers-words", "how-to-borrow-a-winning-ad-format-from-another-industry"],
"playbook": "brief-ugc-creators-for-an-ad-campaign",
},
{
"slug": "how-to-write-a-comparison-ad-without-naming-competitors",
"topic": "performance-marketing",
"q": "How do you write an us versus them comparison ad without naming competitors?",
"short": "Compare against a category, not a brand. Open with a pattern break such as this is your sign to not buy big branded goggles, list three honest weaknesses of the category, then three matching strengths of your product, and close with proof from credible users. At VU we compared against branded goggles in general: they do not last, have generic designs and do not give back.",
"body": """## Why compare against a category

Naming a competitor invites legal trouble and sends attention to them. Comparing against a category, such as big branded goggles or traditional banks, lets the viewer fill in the names themselves. It also keeps the ad usable in every market.

## The VU version

The ad opened with a line meant to stop the scroll: this is your sign to not get branded goggles. Then a simple two column structure.

Branded goggles:

- Do not last long
- Have generic designs and an uncomfortable nose fit
- Do not give back to the environment

Why VU:

- The highest quality, developed in Switzerland
- A unique design and a smooth nose fit
- A tree planted for every goggle sold
- A lifetime warranty

Close: when Olympians and freeriders use VU, you know it is legit.

## Rules I follow

- Every point on your side must match a point on theirs, line for line
- Every weakness must be fair and widely felt, or viewers stop trusting the ad
- End with proof, not a discount
- Never mock the other side's customers

## The same idea in fintech

At Bueno, the comparison was against traditional Spanish banks, never a named bank: unexpected fees, costly account closures and poor customer service, against flat transparent fees, no closure fees and support in your own language. The UGC brief for creators also said plainly: do not speak negatively about any other bank. Contrast the experience, do not attack the institution.""",
"related": ["how-to-find-ad-angles-for-a-fintech-product", "how-to-borrow-a-winning-ad-format-from-another-industry", "should-a-fintech-show-a-comparison-table-against-banks"],
"playbook": "build-an-ad-angle-library-for-a-d2c-brand",
},
{
"slug": "how-to-write-a-black-friday-email-sequence-for-a-premium-brand",
"topic": "performance-marketing",
"q": "How do you write a Black Friday email for a premium brand without cheapening it?",
"short": "Send a heads-up email the day before to your list, framed as exclusive early access before the public offer, with a real limit such as the first 50 orders. Use the rest of the email to remind people why the product is worth full price: quality, who uses it, who it is for, and the guarantees. Sign it from the founders. That is how I wrote VU's Black Friday emails in English and German.",
"body": """## The risk with discounts

A premium brand that shouts 40 percent off looks like every other brand in November. The discount should feel like a reward for being on the list, not a clearance sale. At VU, the Swiss goggle brand, the Black Friday emails were built around that idea.

## The sequence

- Day one: a heads-up email. Tomorrow you get exclusive access to the offer before it goes live on the website, limited to the first 50 orders
- Day two: the access email with the link
- Then the public offer on the site

## What went in the heads-up email

- A short opening from the founders, using their first names
- The offer and the real limit, stated once, plainly
- Quality: the flagship goggle uses neodymium magnets, an aerospace grade material and the strongest type of magnet available, so the lens swap feels safe
- Recommended by the best: a quote from an Olympian and a line from a Red Bull review about the magnetic quick change system, plus a design award
- Who it is for: these goggles are not for everyone, they are for enthusiasts and professionals who want quality, fog free rides and a comfortable fit
- Risk reducers: a lifetime guarantee and a 30 day full refund
- Sign off from the founders

## Write it in every language you sell in

The German version was not a machine translation of the English one. It used du, matched the tone of German ski communities and kept the same structure.

## Why it works

Most of the email is about the product, not the price. People who open it are reminded why they wanted VU in the first place, and the limit gives them a reason to act tomorrow instead of next week.""",
"related": ["in-what-order-should-a-d2c-brand-fix-site-seo-email-and-ads", "how-to-plan-a-christmas-campaign-for-ecommerce", "how-to-make-a-premium-ecommerce-site-more-trustworthy"],
"playbook": "run-a-black-friday-early-access-email-campaign",
},
{
"slug": "how-to-brief-a-developer-on-mobile-homepage-fixes",
"topic": "marketing-leadership",
"q": "How should a marketer brief a developer on mobile homepage fixes?",
"short": "Group fixes by page and device, number each one, attach a screenshot of the current state, and describe the change in one sentence with the reason when it is not obvious. Keep text as real text, not baked into images, so it can be translated. The VU brief I wrote in 2023 had homepage mobile and product page mobile sections, each with numbered, screenshot backed tasks.",
"body": """## Vague briefs make slow sites

Make the homepage better on mobile produces a week of back and forth. A numbered list with screenshots produces a fixed page in a day. When I worked on VU's Shopify site, I wrote developer briefs as numbered tasks under a heading per page and device.

## Homepage, mobile

- Put only the goggle image in the hero. Move the text into its own section below the image so it can be translated automatically, and add a button people can tap
- Reduce the size of the partner logo and make the description text size consistent throughout the page
- In all four feature sections, show the image first and the text below it

## Product page, mobile

- Change the countdown text from ending in to order within
- Put all the benefits one after another by creating a USP section in the theme

## Why each change mattered

- Text inside images cannot be translated or read by search engines, and VU sold in English and German
- Inconsistent text sizes made the page look unfinished on a small screen
- Image first sections match how people scroll on a phone
- Order within frames the countdown as a delivery promise rather than pressure

## How I write these briefs

- One heading per page and device
- Numbered tasks, one change per task
- A screenshot of the current state under each task
- The reason in a few words when a developer might disagree
- A screenshot of the result before sign off

The developer can then estimate, push back on specific items and tick them off. The marketer can check the work without opening the theme code.""",
"related": ["what-to-check-in-a-mobile-ux-audit", "how-to-brief-a-designer-for-a-fintech-homepage", "how-many-fonts-and-colours-should-a-website-use"],
},
{
"slug": "how-to-write-a-founder-story-and-values-section-for-a-d2c-site",
"topic": "growth-from-zero",
"q": "How do you write a founder story and values section for a D2C brand website?",
"short": "Pick three or four values you can prove, give each a short headline, one paragraph and one fact, then add a founders' message about the gap they saw in the market and who the brand is for. For VU we used craftsmanship, sustainability, quality and service, each tied to something real, such as a tree planted for every sale and the Trustpilot service rating.",
"body": """## Values without proof are wallpaper

Every brand claims quality and sustainability. A values section only works when each value is attached to something a visitor can check. When I drafted the VU homepage sections in 2023, every value had a headline, a paragraph and a proof point.

## The four values

- Craftsmanship, under the headline break away from convention: riders who stand out rely on the Blaze goggle for Swiss craftsmanship and high performance magnetic lenses
- Sustainability, under make a difference to the planet: a fact about Alpine glaciers shrinking, then the commitment that VU plants a tree with every sale, so customers build a forest together over the years
- Quality, under seek nothing but the finest quality: rare earth magnets that make the goggles robust
- Service, under push boundaries and go beyond: the customer service rating on Trustpilot as the proof

Then a strip endorsed by Olympians and freeriders, with a real quote.

## The founders' message

The founders' note told a simple story. They had skied for decades and never connected with a European goggle brand. The big brands felt corporate and lacked a cause. Young, ambitious skiers and snowboarders in Switzerland, Austria and Germany said the same. So they built goggles that stood for something, at a fair price. The last line: all riders own goggles, but only some are proud to own them.

## Say who it is for

The draft included a short comparison: proud VU owners are professionals and serious hobbyists who value quality and need fog free, robust goggles, while traditional goggle buyers are beginners happy with basic quality. Naming who it is not for makes the brand more believable to the people it is for.

## How to write yours

- List every claim you want to make
- Delete any you cannot prove with a number, a name or a photo
- Keep three or four
- Write the founders' story as the gap they personally felt""",
"related": ["how-to-make-a-premium-ecommerce-site-more-trustworthy", "how-to-write-a-comparison-ad-without-naming-competitors", "how-to-write-a-clear-value-proposition"],
},
{
"slug": "what-hooks-work-in-ugc-ads-for-an-audience-over-35",
"topic": "performance-marketing",
"q": "What hooks and rules work in UGC ads for an audience over 35?",
"short": "Make the hook relatable to the viewer's real situation, match the on screen text to the spoken hook, keep it professional and warm, and avoid slang, jokes, criticism of competitors and too much focus on the problem. For Bueno, a fintech for foreign property owners in Spain aged 35 and over, hooks included expat hacks to banking in Spain and here is something I wish I had done sooner as a first time property owner in Spain.",
"body": """## Most UGC advice is written for Gen Z

Fast cuts and slang work for a 20 year old buying sneakers. Bueno's customers are affluent foreign property owners in Spain, mostly over 35, dealing with bank accounts, taxes and utilities. The UGC brief I wrote for creators changed the rules accordingly.

## Hooks we asked creators to try

- Here is something I wish I had done sooner as a first time foreign property owner in Spain
- Expat hacks to banking in Spain
- You should not do this alone. You deserve help
- There is finally such a thing as good banking in Spain
- Everyone thinks I am relaxing in Spain. I am, but I have a secret I am sharing with you
- Three signs you need this

## The test for every hook

Ask yourself: if I were scrolling, would this capture my attention, and would I find it relatable? Then make sure the text on screen matches what is being said.

## Dos

- High professionalism, speaking positively about the app
- Professional, elegant clothing, because this is banking and customers expect it
- Non seasonal decor, so the video can run all year
- A strong visual hook and cuts every one to three seconds

## Donts

- Do not speak negatively about any other bank
- Do not dwell on problems. Make the brand aspirational
- No Gen Z slang or unprofessional language
- Do not over explain
- Nothing too funny or too sad

## Why this matters

For an older audience buying a financial product, trust is the whole sale. A hook can be relatable without being loud, and the creator's credibility does more work than the edit.""",
"related": ["how-to-review-a-ugc-video-before-it-goes-live", "how-to-write-ugc-scripts-for-a-fintech-app", "how-to-write-a-hook-people-read"],
"playbook": "brief-ugc-creators-for-an-ad-campaign",
},
{
"slug": "how-to-structure-a-weekly-newsletter-for-a-niche-audience",
"topic": "growth-from-zero",
"q": "How do you structure a weekly newsletter for a niche audience?",
"short": "Use a fixed set of sections readers learn to expect: what happened this week in their world, one practical guide, a short data section with trends and regions to watch, and an FAQ answered from real customer questions. End with a one click rating and a referral ask. This was the Bueno Living template I wrote for foreign property owners in Spain.",
"body": """## Why a fixed structure

A newsletter is a habit, and habits need predictability. Readers should know what they will get before they open it. In 2025 I wrote a template for Bueno's newsletter for foreign property owners in Spain, which launched to a list of leads and customers.

## The sections

- Welcome line: your source for the latest insights on Spanish property, whether you watch values, rental yields or deadlines
- This week in Spanish property: three short updates on the biggest market moves of the week. This section is what brings people back every week
- Guide: one topic at a time, such as filing non resident property tax, linking to an already published guide
- Property pulse: value trends with a regional comparison, one region to watch with a photo and a short reason, and rental yield or deadline stats, with a link to see your own property's value in the product
- Your FAQ bank: the most common questions foreign owners ask, taken from the questions Bueno's customers actually send
- Feedback: what did you think of today's email, with three one click options
- Referral programme for the newsletter

## Why each section earns its place

- News gives a reason to open every week
- The guide gives depth and reuses content you already have
- Data gives the product a natural, useful link
- The FAQ answers real doubts and reduces support load
- Feedback tells you which sections to cut

## Lessons from running it

Keep prices and deadlines out of subject lines: at Bueno, a tax email that put them in the subject line hit spam filters and open rates fell sharply. Write the subject line about the reader's benefit and keep the specifics inside.""",
"related": ["what-makes-a-good-help-centre-and-faq", "how-to-script-30-second-founder-news-videos", "how-to-run-a-one-month-content-format-test"],
"playbook": "launch-a-weekly-niche-newsletter",
},
{
"slug": "how-to-brief-a-designer-for-a-fintech-homepage",
"topic": "marketing-leadership",
"q": "How do you brief a designer for a fintech homepage redesign?",
"short": "Tell the designer who the visitors are, what the platform can and cannot do, which sites to use as reference for tone, the four or five things the page must highlight, and the readability rules. Then give a section order. My 2023 Bueno brief said: simple design because most users are over 30, built for our CMS, elegant and premium, not pure white, and highlight personal assistance, the card, the one stop solution and money safety.",
"body": """## A brief is constraints, not inspiration

Designers do their best work with clear limits. A homepage brief that only says make it modern produces something modern and useless. The Bueno homepage brief I wrote in December 2023 started with seven constraints.

## The seven points

- The design has to be simple, because the site is used by people over 30. Nothing fancy
- It must be implementable on the CMS the site runs on
- It should feel elegant, neat and premium, with three reference sites from automotive retail and banking
- Key things to highlight: personal assistance, the Bueno card, a one stop solution for property owners, and that customers' money is safe
- A brand video exists. Use it if it fits
- Readability: too much text together makes the page hard to read, so the design must break it up
- The background should not be completely white, because pure white made the site look less premium

## The section order

- Hero: the first banking solution for Spain's foreign property owners, buyers and long term renters, with three bullets on help, ways to reach experts and languages, a review badge and the call to action open your account today
- Fast support: the faces and names of the support team and how quickly they respond
- The account: open a Spanish IBAN account in under ten minutes from anywhere
- Property services: a one stop shop built with customers
- Your money is secure: licensing, protection and data security
- Savings: a comparison table
- Testimonials, partners, the Bueno promise and FAQ

## Why faces matter here

For a fintech serving older customers in their own language, the support team is the product. Showing real people with names did more for trust than any illustration.""",
"related": ["should-a-fintech-show-a-comparison-table-against-banks", "how-to-show-security-and-licensing-on-a-fintech-website", "how-to-brief-a-developer-on-mobile-homepage-fixes"],
},
{
"slug": "should-a-fintech-show-a-comparison-table-against-banks",
"topic": "performance-marketing",
"q": "Should a fintech show a comparison table against traditional banks on its homepage?",
"short": "Yes, if every row is something your customer cares about and you can prove it. Compare against groups of banks, not a single brand in your copy, and include rows where you are equal, not only rows you win. Bueno's table compared yearly cost, support in English or Spanish, support in Nordic languages, German and French, dedicated help for property owners, access anywhere and a non resident tax service.",
"body": """## Why a table works

A visitor comparing financial products is already doing a comparison in their head, usually badly. A clear table does it for them and puts your strengths in the rows that matter. The Bueno homepage I briefed in 2023 included one under the heading significant savings.

## The rows

- Yearly cost
- Customer support in English or Spanish
- Customer support in Norwegian, Swedish, Danish, German and French
- Dedicated help for foreign property owners, buyers and renters
- Access to the platform anywhere, anytime
- A non resident property tax service

Columns grouped traditional Spanish banks in pairs, plus a well known digital bank.

## The row that builds trust

Look at the second row. Every provider in the table offers support in English or Spanish. Bueno wins nothing there. Including it shows the table is fair, which makes the rows Bueno does win more believable.

## The row that wins the sale

The languages row is the real reason customers chose Bueno. One Norwegian customer told us they saw a Facebook ad with Norwegian support and translation, picked Bueno over a local bank and activated the same day. A table makes that difference impossible to miss.

## Rules for a fair table

- Use public prices and date them
- Never name a competitor in an unfair row
- Keep it to five to seven rows
- Put your unique rows last, so the visitor reads the fair ones first
- Recheck it every quarter, because banks change fees""",
"related": ["how-to-brief-a-designer-for-a-fintech-homepage", "how-to-write-a-comparison-ad-without-naming-competitors", "how-to-show-security-and-licensing-on-a-fintech-website"],
},
{
"slug": "how-to-script-30-second-founder-news-videos",
"topic": "ai-marketing",
"q": "How do you script short founder videos that keep a niche audience coming back?",
"short": "Keep each video to about 30 seconds and pick one of three formats: the top three headlines of the week, a warning about a trap your audience can fall into, or a step by step fix for a common mistake. Open with the stakes, give three concrete points, and close with one line the viewer remembers. I wrote these for the Spain24x7 channel for foreign property owners in Spain.",
"body": """## Short, regular and useful

A founder on camera builds trust faster than any brand post, but founders have little time. A 30 second script that they can record in one take, every week, beats an ambitious series that stops after two episodes. In 2025 I wrote a batch of these for Spain24x7, the content channel linked to Bueno, presented by Bueno's co-founder and later also produced as AI videos.

## Three formats that worked

The weekly roundup: this week's top three headlines from Spain's property market. Prices expected to rise, only a small share of homes sold being new builds, and a record height tower approved in Benidorm. Close: the boom is back and reaching for the sky.

The warning: thinking of opening a free bank account in Spain? It is rarely free. Three hidden costs follow: the non resident fee, annual maintenance charges and transfer fees. Close: in Spain, free usually means free with conditions.

The fix: missed your Spanish property tax deadline? Do not panic. Step one, file quickly before the tax office contacts you. Step two, ask for a payment plan. Step three, correct mistakes with a complementary return. Close: act fast and stay transparent.

## The script template

- Line one: the stakes, as a question or a picture. Imagine leaving your home for a weekend and coming back to find strangers inside
- Three short points, each one sentence
- One closing line that sticks

## Topics come from customers

Every topic answered a fear or question Bueno customers already had: frozen accounts, squatters, hidden debts on a property, missed deadlines. The founder is not inventing content. He is answering the inbox out loud.""",
"related": ["how-to-run-a-one-month-content-format-test", "how-to-structure-a-weekly-newsletter-for-a-niche-audience", "how-to-make-quote-visuals-and-short-animations-with-ai"],
},
{
"slug": "how-to-run-a-one-month-content-format-test",
"topic": "growth-from-zero",
"q": "How do you test a new content format before committing to it?",
"short": "Run it for one month with a fixed number of posts, about three a week, on topics you already know your audience cares about. Keep the format constant so the only variable is the format itself, mark each post done as it ships, and review engagement and comments at the end. For Spain24x7 we ran a one month illustrated post test covering 14 topics, from golf courses to non resident tax.",
"body": """## Test the format, not the topic

When a brand tries a new content style, such as illustrated carousels, it usually changes everything at once: topics, tone, design and frequency. Then nobody knows what worked. In late 2025, for Spain24x7, the content channel for foreign property owners in Spain linked to Bueno, I set up a one month illustration test with the topics fixed in advance.

## The 14 topics

- Top golf courses in Spain for retirees
- What to do when you lose property documents, document by document
- Squatters in Spain and how to prevent them
- Why retire in Spain
- Who can retire in Spain, with visa routes and tax residency
- What it really costs to retire in Spain
- How Spanish healthcare works for foreigners
- How to prepare for retiring abroad
- Non resident income tax explained, with a worked example
- Other taxes owners forget
- Pros and cons of buying property in Spain
- The municipal tax on land value when you sell
- What to do after missing a tax deadline
- Renovating a property in Spain

## The mix is deliberate

The list alternates lifestyle topics, like golf and retirement, with practical fear topics, like squatters and taxes. Lifestyle posts get shared. Practical posts get saved and bring people to the product. A test with only one kind would tell you little.

## How to run it

- Pick one format and keep design, length and posting time constant
- Write all posts in advance so quality does not drop in week three
- Mark each post done in one shared page with its images
- At the end, compare saves, shares and comments per topic type
- Decide to keep, change or drop the format based on the whole month

## Why one month

A week is too short for an algorithm or an audience to react. A quarter is too long to keep a failing format alive. A month of about three posts a week gives enough data to decide.""",
"related": ["how-to-script-30-second-founder-news-videos", "how-to-make-quote-visuals-and-short-animations-with-ai", "how-to-structure-a-weekly-newsletter-for-a-niche-audience"],
},
{
"slug": "how-to-find-ad-angles-for-a-fintech-product",
"topic": "performance-marketing",
"q": "How do you find ad angles for a fintech product?",
"short": "List the frustrations your customers have with the current way of banking, turn each into one angle, and pair it with one format such as a static image, carousel or story. For Bueno, angles included terrible customer service, no more hidden fees, banking without borders, switch and save, we speak your language, and no more unnecessary trips to Spain. Then test them market by market.",
"body": """## Angles come from frustrations

An angle is the reason this person, today, should care. For a fintech, the reasons sit in the frustrations people already have with their bank. At Bueno, a fintech for foreign property owners in Spain, I kept a running list of angles, each with a suggested format.

## The Bueno angle list

- Say goodbye to terrible customer service: long waits and language barriers versus fast support in your language
- No more hidden fees: surprise charges versus transparent pricing
- Banking without borders: managing money across countries from one app
- Switch to Bueno and save: what customers keep by switching
- Say adios to bad banking: a frustrated owner with a bank app, then the contrast
- Manage your property from one app: a carousel of support, transparent banking and property services
- We speak your language: a happy customer with the app and premium support in their language
- No more unnecessary trips to Spain: a story ad from packing a suitcase to doing it all from home

## The contrast copy

The strongest copy put the old way and the new way side by side. Most traditional banks look like this: unexpected fees, complicated closures, poor customer service. But your property deserves better: flat fees with no surprises, no hidden charges guaranteed, and zero account closure fees.

## Test by market

Angles do not travel evenly. In the UK, savings and customer service angles did not work, while an angle about being unaware of hidden charges performed far better on click through. In Norway, language support was decisive. Run the same angles in each market before deciding which to scale.

## Keep it fair

Contrast the experience, never attack a named bank. Bueno's creator brief said it directly: we do not talk down to other banks.""",
"related": ["how-to-write-a-comparison-ad-without-naming-competitors", "where-to-find-customer-problems-before-writing-ads", "how-to-write-ugc-scripts-for-a-fintech-app"],
"playbook": "turn-25-customer-problems-into-ads",
},
{
"slug": "where-to-find-customer-problems-before-writing-ads",
"topic": "growth-from-zero",
"q": "Where do you find real customer problems before writing ads?",
"short": "Look where customers complain without being asked: Facebook groups for your audience, comments on your own ads, replies to your outreach messages, negative comments about support, live chat exports and the questions sent to your team. Save screenshots, log each problem in one database, and write ad angles only from that list. This is how I built Bueno's problem bank for foreign property owners in Spain.",
"body": """## Surveys tell you what people think they think

Customers describe their problems best when they are not talking to you. At Bueno, a fintech for foreign property owners in Spain, I built a problems page in 2023 that became the source for ads, landing pages and content.

## The sources

- Facebook groups: expat and property owner groups where people ask each other for help with Spanish banks, taxes and utilities. Every relevant post went into a database of problems mentioned in groups, with a screenshot
- Comments on our own ads: people argue, ask and object in public, which shows you the objections your landing page must answer
- Replies to outreach on Facebook and Instagram: what people said when we reached out, including why they were not interested
- Negative comments on support: the harshest feedback, kept on its own page so it could not be ignored
- Customer questions and a chat export: the exact words used when people need help
- Customer problem statements: a sheet that turned the raw material into short, clear problem lines

## From problems to ads

The rule was simple: no angle without a problem behind it. If a group of owners kept complaining about a closed local branch and paper receipts, that became an angle about managing everything online. If they complained about not understanding their bank in Spanish, that became the language angle.

## Keep the screenshots

Screenshots matter because summaries lose the words. The words people actually use are often better ad copy than anything a marketer writes.

## Do it monthly

Problems shift with the seasons. Tax deadlines, electricity bills and summer visits each bring their own complaints. A monthly pass through the sources keeps the list current.""",
"related": ["how-to-find-ad-angles-for-a-fintech-product", "how-to-write-ad-copy-in-your-customers-words", "how-to-find-out-why-customers-really-buy"],
"playbook": "turn-25-customer-problems-into-ads",
},
{
"slug": "how-to-grow-an-x-twitter-account-from-zero-as-a-marketer",
"topic": "career-growth",
"q": "How do you grow an X (Twitter) account from zero as a marketer?",
"short": "Decide what you want from it and how much time you will give it, then run a daily system until your first 1,000 followers: two posts, five reposts, around 100 replies and some direct messages a day, plus two threads and a plan review each week. Set milestones from 1 to 1,000 followers and keep the tool stack simple. This is the plan I wrote for my own account.",
"body": """## Start with three honest questions

When I planned my own account, I started with questions, not tactics.

- What do I want from it? Reach and inbound work, as a by product of giving people real value
- How much time will I give it? Best case, one fixed day a week with four hours of deep work. Worst case, two to three hours every day
- How much will I spend? A small, capped amount, if any

If you skip these, you will either quit in two weeks or let it eat your work.

## The daily system until 1,000 followers

- Post two tweets
- Repost five good tweets from others
- Reply thoughtfully to around 100 tweets
- Send direct messages to around 50 relevant people

## The weekly system

- Post two threads
- Review the numbers and change the plan

## Milestones

1, 5, 10, 50, 100, 250, 500, 750 and 1,000 followers. Best case one month, worst case three months or more. Small milestones keep you going when growth feels slow.

## The tool stack

Ideas and drafts in Notion, then a scheduling tool such as Hypefury to finalise and schedule. Nothing more until the habit sticks.

## What helps and what hurts

Helps: sharing your best posts with your email list and in relevant Slack communities, which gives early engagement. Hurts: buying growth packs and engagement tricks, which damage how the platform shows your posts.

## Replies beat posts early on

With zero followers, nobody sees your posts. Replies to bigger accounts are how people discover you. That is why replies dominate the daily system.""",
"related": ["how-to-write-a-hook-people-read", "how-to-network-as-a-graduate-without-feeling-awkward", "how-to-set-goals-and-review-your-week-as-a-marketer"],
"playbook": "grow-an-x-account-to-1000-followers-with-a-daily-system",
},
{
"slug": "how-to-hire-and-manage-marketing-interns-at-a-startup",
"topic": "marketing-leadership",
"q": "How do you hire and manage marketing interns at a startup?",
"short": "Post on several internship platforms at once rather than one, give each intern a page with their tasks and work, and hold a recorded one to one feedback session every quarter with three or four concrete points. My feedback usually covers checking with native speakers before ads go live, planning launches instead of rushing them, keeping the big picture in mind and using data.",
"body": """## Where to find interns

When I hired marketing interns, I kept a list of platforms and posted on several at once. In India that included Internshala, HelloIntern, InternTheory, WorkIndia, LetsIntern, Twenty19 and the Hirect app. Internationally it included WayUp, Internships.com, Idealist, College Recruiter, Virtual Internships, AngelList (now Wellfound) and Glassdoor. Different platforms attract different profiles, so casting wide gives you a better shortlist.

## Give every intern a home

At Bueno, each intern had their own page in the team workspace with their tasks, drafts and outputs. It makes onboarding faster, keeps work visible to the founders, and gives the intern a portfolio at the end.

## Quarterly one to one feedback

I recorded a one to one feedback session with each intern every quarter and wrote down three or four points. A typical set:

- Languages in ads: has a native speaker approved the language before the ad goes live?
- Plan the rebrand launch: test, plan, and avoid panic on launch day
- Be more strategic: keep the big picture in mind, not just the task
- Be more data oriented: show the numbers behind a recommendation

## Why it works

Short, specific feedback is easier to act on than a long review. Recording the session lets the intern rewatch it and lets you check progress next quarter against the same points.

## What interns should own

Give interns real but bounded work: translating and adapting ads with native speaker review, preparing UGC creator briefs, building content calendars, or collecting customer problems from groups. Avoid giving them ad budgets or customer data without supervision.""",
"related": ["how-to-run-growth-as-a-one-person-marketing-team", "what-to-do-first-as-a-new-hire", "how-to-get-clarity-on-your-career"],
},
{
"slug": "how-to-review-a-ugc-video-before-it-goes-live",
"topic": "performance-marketing",
"q": "How do you review a UGC video before running it as an ad?",
"short": "Run a narrative check and a product check. Narrative: is there a strong visual hook tied to a real pain, does the first frame stop your own scroll, does it sell to the pain or the desired outcome, and does it cut every two seconds or so? Product: are there captions, does it show the app or product in use, and does the hook connect naturally to the product? This is the checklist in my Bueno UGC brief.",
"body": """## Review before you pay for reach

A weak UGC video does not just underperform. It teaches the ad platform that your brand gets ignored. I ask creators to run this checklist before they send a video, and I run it again before approving.

## Narrative check

- Does the video have a visual hook?
- Is the hook strong, and does it use a real theme or pain point?
- Is it likely to trigger attention or intrigue?
- Does the first visual draw attention, and would it stop your own scroll?
- Does the video sell to the pain, the job to be done, or the desired outcome?
- Is the pacing strong, switching roughly every two seconds, with smooth cuts and varied shots?

## Product check

- Does the video have captions? If there is a written hook on screen, skip captions for that part
- If there are no captions, is there text on screen?
- Does it include screen recordings or screenshots of the app in use?
- Is the product shown in action?
- Does the hook connect naturally to the body and to the product?

## Technical check

- 20 to 60 seconds, filmed vertically in 9 by 16, which can be cut to 4 by 5
- Natural light where possible
- Music from the platform's commercial library only
- No borders, full screen
- All text inside the safe zone, away from edges where platform buttons sit

## The approval flow

- Script first, for approval
- Raw footage without text or music, for approval
- Revisions
- Final video with text and music
- Last text revisions

Approving in stages costs a day and saves a reshoot.""",
"related": ["what-hooks-work-in-ugc-ads-for-an-audience-over-35", "how-to-write-ugc-scripts-for-a-fintech-app", "how-to-write-a-ugc-script-for-a-physical-product"],
"playbook": "brief-ugc-creators-for-an-ad-campaign",
},
{
"slug": "how-to-write-ugc-scripts-for-a-fintech-app",
"topic": "performance-marketing",
"q": "How do you write UGC ad scripts for a fintech app?",
"short": "Write the script in two columns, spoken words and visuals. Open with a relatable hook about the hassle, introduce the app as the answer, show the range of services on screen, name the support in the viewer's language, mention one concrete help such as setting up direct debits, and end with a call to action spoken to camera while showing the app. That is the structure of the Bueno UGC scripts I wrote.",
"body": """## Fintech UGC has to show, not just tell

Financial products are abstract. A creator saying it is easy is not enough. The viewer needs to see the app and hear a specific thing it does for them. For Bueno, a fintech for foreign property owners in Spain, I wrote scripts in a spoken and visual table.

## A two column script

- Hook, spoken: do you own a perfect house in Spain but struggle with bank rules and paperwork? Visual: the hook as text on screen
- Spoken: then you should use Bueno
- Spoken: an all in one solution for your home, with insurance, electricity, alarms, taxes and currency exchange. Visual: film the website and show each service
- Spoken: with customer service in your language, it is easy to get your home in order and enjoy Spain
- Spoken: they also help set up direct debits and solve issues with suppliers
- Call to action, spoken to camera: open an account from anywhere, in under ten minutes. Visual: the app on the phone

## Two other openings we tested

- If you own a property in Spain, you know the banking experience is not at its best, until you try Bueno
- Spain is beautiful and has some of the best experiences possible, except for banking: queues, unannounced charges, and no one who speaks your language

Both move quickly from the problem to the solution, as the brief asked: focus on making the brand aspirational rather than dwelling on problems.

## The specific help sells it

The line that does the most work is the concrete one: help setting up direct debits and resolving issues with utility providers. It is the task customers dread. Naming it makes the promise believable.

## Keep it compliant

The brief also set language rules: do not give financial or legal advice, do not talk down to other banks, and do not make owners feel foolish.""",
"related": ["what-hooks-work-in-ugc-ads-for-an-audience-over-35", "how-to-review-a-ugc-video-before-it-goes-live", "how-to-find-ad-angles-for-a-fintech-product"],
"playbook": "brief-ugc-creators-for-an-ad-campaign",
},
{
"slug": "how-to-show-security-and-licensing-on-a-fintech-website",
"topic": "performance-marketing",
"q": "How should a fintech website show that customers' money is safe?",
"short": "Give money safety its own homepage section with a plain headline such as your money is secure, then list the specific facts: who licenses the payment services, which regulation protects the account, where deposits are held and up to what amount they are protected, and how data is secured. Use the regulators' logos. For Bueno, a fintech for property owners in Spain, this was one of four things the homepage had to highlight.",
"body": """## Safety is the silent objection

People rarely ask is my money safe in a sales chat. They just do not sign up. For a newer fintech serving older customers abroad, safety has to be answered before it is asked. In the Bueno homepage brief I wrote in 2023, customers' money is safe was one of the four things the design had to highlight.

## What the section contained

- A headline: your money is secure
- Licensing: the account's payment services are provided by a partner authorised by the Bank of Spain as an electronic money institution, with its reference number
- Regulation: the account is protected by the EU Electronic Money Directive
- Security: bank grade security for both money and personal data
- Deposits: customer funds are held in segregated accounts with regulated banks, and segregated funds are covered by the deposit guarantee scheme up to its limit
- Logos of the regulator, the licensed partner and the EU

## Why specifics beat badges

A padlock icon and the word secure mean nothing. A licence number and a named regulator can be checked. Older, careful customers check.

## Where to place it

On the Bueno homepage, the safety section came after the hero, the support team, the account and property services, and before the savings comparison. The visitor first learns what Bueno does and who helps, then why it is safe, then why it is cheaper.

## Get the wording right

Regulated wording must be exact. Write the section with your compliance or legal team, use the regulator's own terms, and update it whenever partners or limits change.""",
"related": ["how-to-brief-a-designer-for-a-fintech-homepage", "should-a-fintech-show-a-comparison-table-against-banks", "how-to-make-a-premium-ecommerce-site-more-trustworthy"],
},
]

PLAYBOOKS_EXTRA = [
{
"slug": "run-a-technical-seo-audit-with-a-priority-checklist",
"title": "Run a technical SEO audit with a priority checklist",
"desc": "My SEO step by step template: check findability, architecture, URLs, on page basics, link equity and Search Console, then fix high priority items first.",
"who": "Founders and marketers who own a small or mid size website without an SEO specialist",
"time": "One to two days for the audit, then fixes over a few weeks",
"tools": ["Google Search Console", "Screaming Frog or a similar crawler", "Google PageSpeed Insights", "A Notion database or spreadsheet with a priority column"],
"short": "Put every SEO check in one database with a category, a priority of high, average or low, a done box and a link to further reading. Audit findability first, then architecture, URLs, on page checks, link equity and Search Console. Fix the high priority failures before writing new content. I built this template in 2021 and ran a copy for VU, the Swiss goggle brand.",
"steps": [
("Set up the database", "One row per check with category, task, priority, done and a further reading link. Duplicate the template for each site so the master stays clean, as I did for VU."),
("Check findability", "Indexation, server uptime, robots.txt, meta robots tags, 40x and 50x errors, XML sitemaps including image and video, pagination, a custom 404 page and subdomains. If a page cannot be found, nothing else matters."),
("Check architecture", "Breadcrumbs, top level navigation, footer links and site depth. Key pages should be a few clicks from the home page."),
("Check URLs", "Consistent delimiters, readable and friendly URLs, and a consistent choice of absolute or relative links."),
("Run on page checks", "Visible and unique title tags with a sensible length, one H1 per page, meta descriptions present and not duplicated, structured data, image size and alt text, thin content and where key content sits on the page."),
("Test link equity", "Look for 302 redirects that should be 301, redirect chains, broken redirects, broken internal links, anchor text and malicious inbound links."),
("Audit Search Console", "Confirm Analytics is linked, check manual actions, not found errors, pages blocked by robots.txt, indexed pages and sitemap indexation."),
("Fix by priority", "Sort failures by priority. High priority items such as indexation, redirect chains, one H1 per page and keyword cannibalisation come first. Leave AMP, video sitemaps and syndication for later."),
],
"pitfalls": ["Writing new articles while key pages are not indexed", "Treating a 120 item list as equal instead of using the priority column", "Leaving old discontinued products in the sitemap", "Buying links or mass directory links to shortcut the work"],
"related_answers": ["which-seo-tasks-should-you-prioritise-first", "what-online-visibility-basics-do-small-business-websites-miss", "how-to-launch-an-ecommerce-site-in-a-second-language"],
"proof": "I built this SEO step by step template in 2021 and applied a copy of it to VU's website.",
"proof_link": "/work/vu/",
},
{
"slug": "run-a-website-growth-audit-across-nine-categories",
"title": "Run a website growth audit across nine categories",
"desc": "Score a site on UX, conversion, SEO, performance, platform health, accessibility, copy, legal and analytics, then fix high impact gaps first.",
"who": "Consultants, founders and marketers taking over a website or preparing it for paid traffic",
"time": "Half a day per site",
"tools": ["A Notion database or spreadsheet", "Google PageSpeed Insights and GTmetrix", "Google Search Console", "A session recording tool such as Hotjar"],
"short": "Create one row per item with a category, an impact of high, medium or low and a done box. Walk the site through nine categories, score each out of 100 with a label from very poor to great, and put the scores on one summary page. Fix high impact failures in the weakest category first. I built this growth assessment template in 2021 and use a landing page version before campaigns.",
"steps": [
("Build the item list", "User experience, conversion optimisation, SEO and online visibility, performance and security, technical platform health, accessibility, content and copy, legal, and analytics. Each item gets an impact level."),
("Check user experience", "Professional design and branding, relevant headlines and copy, mobile friendly pages, navigation, relevant images and video, and a custom 404 page."),
("Check conversion", "A clear USP, trust factors, testimonials, a primary and secondary calls to action, a visible phone number where it matters, lead capture forms, chat, a newsletter sign-up and a thank you page."),
("Check visibility and performance", "Google Business Profile, keywords in titles and H1, meta descriptions, sitemap, schema, open graph, alt text, HTTPS, page speed, caching and a CDN."),
("Check the platform", "For WordPress, more than twenty checks: debug mode, exposed install and readme files, protected config, updates, backups, unused themes and plugins, and a staging copy."),
("Check accessibility, copy and legal", "Alt text, captions, text size, contrast, link text and forms. Then readable, scannable, compelling copy with no placeholder text. Then GDPR, privacy and cookie policies, copyright and WHOIS."),
("Score and summarise", "Give each category a score out of 100 and a label. Put all nine on one summary so the founder sees the weakest area in seconds."),
("Plan the fixes", "List failed high impact items in the weakest category, estimate effort, and ship the quick, heavy fixes first. Re-score after a month."),
],
"pitfalls": ["Polishing design while conversion basics like a USP and lead capture are missing", "Skipping the platform checks because they look technical", "Reporting scores without a ranked fix list", "Auditing desktop only"],
"related_answers": ["what-does-a-website-growth-audit-cover", "what-to-check-on-a-wordpress-site-before-running-ads", "what-to-check-on-a-landing-page-before-sending-paid-traffic"],
"proof": "I built this growth assessment template in 2021 and used it on client websites, including a B2B services site where conversion optimisation scored lowest.",
"proof_link": "/consulting/",
},
{
"slug": "brief-ugc-creators-for-an-ad-campaign",
"title": "Brief UGC creators for an ad campaign",
"desc": "The UGC brief I wrote for Bueno: brand, audience, dos and donts, hooks, ad structures, tech specs, a pre-send checklist and a staged approval flow.",
"who": "Marketers commissioning UGC videos from creators, especially for regulated or premium brands",
"time": "Two to three hours to write the brief, then one to two weeks per round of videos",
"tools": ["A shared Notion page or doc", "The brand identity guidelines", "An ad library or swipe file for examples", "The platform's commercial music library"],
"short": "Write one brief that a creator can follow without a call: who the brand is, who the audience is, the tone, what to do and avoid, hooks to try, two or three ad structures, the technical specs and a checklist to run before sending. Approve in stages: script, then raw footage, then the final cut. I wrote this brief for Bueno's UGC campaign for foreign property owners in Spain.",
"steps": [
("Open with expectations", "Welcome the creator, say why you chose them, and state that quality matters and following the guidance avoids rounds of changes."),
("Explain the brand and offer", "What the product does, who it is for, the desires it meets such as peace of mind and convenience, use cases that work in ads, copy that is already resonating and the call to action to use."),
("Set the tone and language rules", "For Bueno: friendly, courteous and wise. Do not talk down to other banks, do not give financial or legal advice, and never make customers feel foolish."),
("List dos and donts", "Professional dress and non seasonal decor, positive tone, relatable hook with matching on screen text, cuts every one to three seconds. No slang, no criticism of competitors, no dwelling on problems, nothing too funny or too sad."),
("Give hooks and structures", "Six hooks to try, plus structures such as hook, pain, social proof, solution, benefits, call to action. Link two or three example ads."),
("Set the technical specs", "20 to 60 seconds, vertical 9 by 16, natural light, commercial library music, no borders, captions and all text in the safe zone."),
("Add the pre-send checklist", "Narrative check on hook, first frame, pain and pacing. Product check on captions, the app or product in use and how the hook connects to the product."),
("Approve in stages", "Script first, then raw footage without text or music, then the final with text and music, with revisions at each stage. Share past UGC and say honestly what could be better."),
],
"pitfalls": ["Handing creators a word for word script that sounds like an ad", "No language rules for a regulated product", "Approving only the final cut, which forces reshoots", "Hooks written for a younger audience than the real buyer"],
"related_answers": ["what-hooks-work-in-ugc-ads-for-an-audience-over-35", "how-to-review-a-ugc-video-before-it-goes-live", "how-to-write-ugc-scripts-for-a-fintech-app"],
"proof": "I wrote this UGC creator brief and the scripts behind it for Bueno's ad campaigns in Norwegian and English markets.",
"proof_link": "/work/bueno/",
},
{
"slug": "build-an-ad-angle-library-for-a-d2c-brand",
"title": "Build an ad angle library for a D2C brand",
"desc": "Keep one page per ad angle with the script, examples and assets, so each new campaign starts from tested ideas. Based on VU's angle library.",
"who": "D2C founders and performance marketers who brief ads every month",
"time": "One day to set up, then 30 minutes per new angle",
"tools": ["Notion or a shared drive", "An ad library tool or the Meta Ad Library", "Customer reviews and comments", "A video editor or creator"],
"short": "Create one page per angle, not per ad. Each page holds the idea, a script, reference ads from any industry and the finished assets. Cover problem angles, proof angles, comparison angles, product feature angles and emotional angles. At VU, the Swiss goggle brand, the library included glare and fog, snow enthusiasts, Olympians and freeride UGC, us versus them, magnetic UGC, quality and design, over the glasses fit, pre-season hype, founder story and low light lenses.",
"steps": [
("List angles before ads", "Write down every reason someone buys: problems solved, proof, comparison, features, emotions. Each becomes a page."),
("Write a problem angle", "Pick the most felt problem. For VU, glare and fogged lenses mid run, scripted in seven beats from hook to reassurance."),
("Write a proof angle", "Use credible users. VU had UGC from Olympic and freeride athletes and a separate page of trust images with each athlete's competition."),
("Write a comparison angle", "Compare against a category, never a named brand. VU's us versus them ad listed three weaknesses of big branded goggles against three strengths of VU."),
("Write feature angles", "One feature per angle: magnetic quick change, over the glasses fit, low light and polarised lenses, quality and design."),
("Write emotional angles", "Friends and pre-season hype for skiers, using comments from popular ski videos to find the feeling people describe."),
("Borrow formats from other industries", "Save ads from other categories that work, such as a food brand's is it worth the hype format, and rebuild them with your facts."),
("Review every season", "Tag each angle with results and keep the winners for next season's first campaign."),
],
"pitfalls": ["Organising by ad instead of by angle, which hides what actually works", "Copying another brand's claims instead of its structure", "Only feature angles and no emotional or proof angles", "Never recording which angle won"],
"related_answers": ["how-to-structure-a-30-second-video-ad", "how-to-borrow-a-winning-ad-format-from-another-industry", "how-to-write-a-comparison-ad-without-naming-competitors"],
"proof": "I built and ran VU's ad angle library from 2023 to 2025 while leading marketing for the brand.",
"proof_link": "/work/vu/",
},
{
"slug": "turn-25-customer-problems-into-ads",
"title": "Turn 25 customer problems into ads that resonate",
"desc": "Find 25 problems, rank them by pain, match your solution, write 10 hooks and use 10 ad templates. The method I use for ads that fit a market.",
"who": "Founders and marketers writing ads for a new product or a new market",
"time": "Two to three days for research and a first batch of ads",
"tools": ["Facebook groups and forums where customers talk", "Your ad comments and support inbox", "A spreadsheet", "An ad library for templates"],
"short": "Collect 25 real problems from where customers complain, rank them by how painful they are, match each to what your product actually solves, write ten scroll stopping hooks, pick ten proven ad templates, then make the ads. I wrote this method down as a six step process and used it at Bueno, where the problems came from expat Facebook groups, ad comments and support conversations.",
"steps": [
("Find 25 problems", "Look in Facebook groups, ad comments, replies to outreach, negative support comments and chat exports. Save screenshots and log each problem in one sheet in the customer's words."),
("Rank them by pain", "Score each problem on how often it comes up and how strongly people feel it. A frozen bank account beats a slow app."),
("Match your solutions", "For each top problem, write what your product does about it. If it does nothing, drop the problem. Never stretch the claim."),
("Write 10 hooks", "Write hooks that break the scroll, built on the top problems. Test each against one question: would I stop for this if I were the customer?"),
("Pick 10 ad templates", "Choose proven structures: problem and solution, us versus them, UGC review, three signs you need this, before and after, founder message."),
("Create the ads", "Combine the best problems, hooks and templates into a first batch. Run them market by market and keep the winners."),
],
"pitfalls": ["Inventing problems in a meeting instead of finding them", "Writing hooks before ranking problems by pain", "Matching problems your product does not really solve", "Testing too many variants of the same idea instead of different problems"],
"related_answers": ["where-to-find-customer-problems-before-writing-ads", "how-to-find-ad-angles-for-a-fintech-product", "how-to-write-ad-copy-in-your-customers-words"],
"proof": "I wrote this six step method in my own content notes and used the same problem first approach to build Bueno's ads.",
"proof_link": "/work/bueno/",
},
{
"slug": "script-a-premium-product-video-ad-in-seven-beats",
"title": "Script a premium product video ad in seven beats",
"desc": "Problem, twist, half solution, social proof, full solution, objections, reassurance, then the call to action. The structure I used for VU's goggle ads.",
"who": "D2C marketers and founders briefing video ads for premium physical products",
"time": "Two hours to script, then one shoot",
"tools": ["A two column script doc with voiceover and visuals", "Product footage or a creator", "Customer reviews for proof lines"],
"short": "Write one line of voiceover and one visual for each of seven beats: a common problem, an unexpected twist, half the solution, social proof, the full solution, objections answered, and authority with reassurance. Close with the call to action and mention price as a bonus. I used this to script VU's glare and fog ad for Swiss ski goggles.",
"steps": [
("Hook with a common problem", "Show the frustration on screen. For VU, someone blinded by glare or fogged lenses mid run, with a question in the voiceover."),
("Add an unexpected twist", "Cut to someone in the same conditions who is fine. Ask what if there were a better way."),
("Show half the solution", "Show the key feature, the one click magnetic lens swap, without explaining everything. Curiosity keeps people watching."),
("Add social proof", "Short testimonial lines and who trusts the product. A little fear of missing out helps."),
("Reveal the full solution", "Show the full benefit in the hardest situation, such as switching to the low light lens in a whiteout."),
("Answer the main objection", "For a premium product the objection is durability and value, so show it holding up in extreme weather."),
("Close with authority and reassurance", "Heritage, then free shipping, the return policy and the guarantee. End with the call to action and price framed as good value."),
],
"pitfalls": ["Leading with price on a premium product", "Inventing social proof you cannot back", "Explaining every feature in the first five seconds", "Filming before the script is agreed"],
"related_answers": ["how-to-structure-a-30-second-video-ad", "how-to-write-a-ugc-script-for-a-physical-product", "how-to-borrow-a-winning-ad-format-from-another-industry"],
"proof": "I scripted VU's video ads with this seven beat structure during my time as Head of Marketing.",
"proof_link": "/work/vu/",
},
{
"slug": "run-a-black-friday-early-access-email-campaign",
"title": "Run a Black Friday early access email campaign",
"desc": "Send a heads-up email the day before, give list members access before the public offer with a real limit, and spend most words on why the product is worth it.",
"who": "Premium D2C brands with an email list that want Black Friday sales without looking cheap",
"time": "One day to write, two days to run",
"tools": ["An email platform such as Klaviyo", "Founder quotes and customer or athlete proof", "Translations reviewed by native speakers"],
"short": "Day one, send a heads-up from the founders: tomorrow you get exclusive access before the public launch, limited to a fixed number of orders. Use the body to remind people why the product is worth it: quality, who uses it, who it is for, guarantees. Day two, send the access link. Then open the offer on the site. I ran this for VU, the Swiss goggle brand, in English and German.",
"steps": [
("Set a real limit", "Choose a limit you will honour, such as the first 50 orders, and decide whether the discount is ever public. Fake scarcity damages a premium brand."),
("Write the heads-up email", "From the founders, by first name. One line on the offer and the limit, then the reasons to want the product."),
("Lead with quality", "One concrete material or engineering fact. For VU, neodymium magnets, an aerospace grade material and the strongest type of magnet."),
("Add proof", "A quote from a credible user, a line from a respected review, an award."),
("Say who it is for", "Not for everyone: for enthusiasts and professionals who want quality, fog free rides and a good fit."),
("Close with risk reducers", "Lifetime guarantee and a 30 day full refund, then the sign off."),
("Translate properly", "Write each language version with a native speaker. VU's German email used du and the tone of German ski communities."),
("Send the access email and go public", "Day two, the access link. Then the public offer, so list members always feel first."),
],
"pitfalls": ["Leading with the discount instead of the product", "A limit that is not real", "Machine translated emails for other markets", "Sending the public offer the same day, which removes the reason to be on the list"],
"related_answers": ["how-to-write-a-black-friday-email-sequence-for-a-premium-brand", "how-to-plan-a-christmas-campaign-for-ecommerce", "in-what-order-should-a-d2c-brand-fix-site-seo-email-and-ads"],
"proof": "I wrote and ran VU's Black Friday early access emails in English and German.",
"proof_link": "/work/vu/",
},
{
"slug": "launch-a-weekly-niche-newsletter",
"title": "Launch a weekly newsletter for a niche audience",
"desc": "A fixed four section template, an FAQ bank from real customer questions, a one click rating and a referral ask. Based on Bueno's newsletter.",
"who": "Startups with a defined niche audience and a list of leads or customers",
"time": "One week to set up, then two to three hours per issue",
"tools": ["An email platform", "A content library of existing guides", "Customer support questions or chat exports", "Product data for a stats section"],
"short": "Fix four sections readers can expect every week: this week's news in their world, one practical guide, a data section, and an FAQ answered from real customer questions. Add a one click rating and a referral ask at the end. Launch to your existing leads and customers. I wrote this template for Bueno's weekly newsletter for foreign property owners in Spain.",
"steps": [
("Define the reader and the promise", "One sentence on who it is for and what they get. Bueno's was the latest insights on Spanish property: values, rental yields and deadlines."),
("Build the news section", "Three short updates on the week's biggest moves. This is the reason to open every week."),
("Add one guide per issue", "Link one existing guide, such as filing non resident property tax. Reuse content you already have."),
("Add a data section", "Trends, one region to watch with a photo, and one useful stat, with a link to the product where readers can see their own numbers."),
("Build an FAQ bank", "Collect the most common customer questions from support and answer one or two per issue."),
("Ask for feedback and referrals", "A one click rating of loved it, it was ok or not good, then a referral link."),
("Protect deliverability", "Keep prices and deadlines out of subject lines, which can trigger spam filters, and write subjects about the reader's benefit."),
("Review monthly", "Use ratings and clicks per section to cut what readers skip."),
],
"pitfalls": ["Changing the structure every week", "Writing only about your product", "Inventing FAQ questions instead of using real ones", "Promotional subject lines that land in spam"],
"related_answers": ["how-to-structure-a-weekly-newsletter-for-a-niche-audience", "what-makes-a-good-help-centre-and-faq", "how-to-script-30-second-founder-news-videos"],
"proof": "I wrote the Bueno Living newsletter template for Bueno's leads and customers.",
"proof_link": "/work/bueno/",
},
{
"slug": "grow-an-x-account-to-1000-followers-with-a-daily-system",
"title": "Grow an X account to 1,000 followers with a daily system",
"desc": "Set goals and a time budget, then run a fixed daily and weekly routine of posts, replies and messages with milestones to 1,000 followers.",
"who": "Marketers, founders and consultants starting a personal account from zero",
"time": "Two to three hours a day, or four hours on one fixed day a week",
"tools": ["Notion for ideas and drafts", "A scheduler such as Hypefury", "Your email list and relevant Slack communities"],
"short": "Write down what you want from the account, how much time and money you will give it, and your ideas. Then run a daily system until 1,000 followers: two posts, five reposts, around 100 replies and some direct messages. Each week, post two threads and review the plan. Track milestones from 1 to 1,000. This is the plan I wrote for my own account.",
"steps": [
("Write your goal", "State what you want, and remind yourself that reach and work come as a by product of giving people value."),
("Set a time and money budget", "Best and worst case for both. Mine was one fixed day a week with four hours of deep work at best, two to three hours daily at worst."),
("List and score ideas", "Keep a project decider list of content ideas and pick the ones closest to your expertise."),
("Run the daily system", "Two posts, five reposts, around 100 thoughtful replies and around 50 direct messages to relevant people."),
("Run the weekly system", "Two threads, then a review of what worked and a change to the plan."),
("Track milestones", "1, 5, 10, 50, 100, 250, 500, 750 and 1,000 followers. Best case one month, worst case three months or more."),
("Use fair boosts", "Share good posts with your email list and in relevant Slack communities. Avoid paid engagement packs, which hurt reach."),
],
"pitfalls": ["Posting into the void with no replies to bigger accounts", "No time budget, so the habit dies in two weeks", "Buying engagement", "Too many tools before the habit exists"],
"related_answers": ["how-to-grow-an-x-twitter-account-from-zero-as-a-marketer", "how-to-write-a-hook-people-read", "how-to-set-goals-and-review-your-week-as-a-marketer"],
"proof": "I wrote this plan for my own X account, with the same daily and weekly systems.",
"proof_link": "/consulting/",
},
{
"slug": "audit-a-login-and-registration-flow",
"title": "Audit a login and registration flow",
"desc": "Check login, registration, password and error handling with weighted checks, so returning and new users get in without friction.",
"who": "Product marketers, founders and designers of apps, SaaS and membership sites",
"time": "Two hours for the audit, then fixes",
"tools": ["A phone and a desktop browser", "A password manager and a fresh email address", "Your UX audit sheet with weights"],
"short": "Walk through login and registration as three people: a returning customer, a new visitor who clicked the wrong button, and someone using a weak password. Score each check as high, medium or low weight, covering headings, social sign-in, password rules, real time validation, error messages and help. Fix the high weight failures first. These checks come from my UX audit template.",
"steps": [
("Test login as a returning customer", "Is there a clear Log in heading, one click social or Google sign-in, a Forgot password link on the same screen, your logo and an eye button?"),
("Test login as a lost new visitor", "Is there a Create an account option on the login page for people who clicked the wrong button?"),
("Test registration", "Are password rules shown upfront, do the two password fields confirm a match, is one click registration offered, and is the terms checkbox next to the button?"),
("Break the form on purpose", "Use a weak password, a mistyped email and capital letters. Fields should validate on completion, keep their names visible and block wrong data types."),
("Read every error", "Errors should highlight the field, place the cursor, state the cause and next step, in one calm tone with no exclamation marks."),
("Check freedom and help", "Users should be able to cancel, edit details and delete the account, and help should not interrupt progress."),
("Score and fix", "Add up the score, sort failures by weight, and ship the high weight fixes first. Retest on mobile."),
],
"pitfalls": ["Testing only as an admin with saved passwords", "Hiding password reset behind support", "Showing password rules only after a failure", "Ignoring the mobile keyboard and field sizes"],
"related_answers": ["what-should-a-login-page-include", "how-to-design-a-sign-up-and-password-step", "how-to-prevent-errors-in-web-forms"],
"proof": "These checks come from the weighted UX audit template I built in 2021 and used on client sites.",
"proof_link": "/consulting/",
},
]

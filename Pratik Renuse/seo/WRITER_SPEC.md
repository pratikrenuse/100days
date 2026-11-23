# Writer spec for pratikrenuse.com pages

You turn Pratik Renuse's real Notion material into page content for his site. Source files (read them fully first):
/home/claude/notion/{speaking,consulting,mentoring,writing}.json and *_raw.md.
Existing content you must not duplicate: /home/claude/seo/content_answers.py and /home/claude/seo/content_playbooks.py (read slugs and questions).

## Output
Write ONE Python file at the path your task gives you. It defines only plain lists of dicts (no imports, no functions). Then run:
  python3 /home/claude/seo/validate_gen.py <your file>
and fix every error until it prints OK.

## Hard rules
1. Every page must carry something specific from Notion: a real company, event, number, step, question a founder actually asked, a template, a story. If you cannot point to the Notion source, do not write the page. No generic filler pages.
2. Numbers about Pratik's results: use ONLY these verified figures (they win over anything else in Notion):
   - Infento: online marketing lead and founding team, 2017 to 2019, DTC from 0 to 2M euro ARR; led the $848K Kickstarter, the most funded STEM project on Kickstarter globally in 2018; Red Dot, German Design Award, Parent's Choice Gold.
   - VU (Vertical Unit): Head of Marketing, founding team, 2021 to 2025; number one Swiss brand for pro skiers and snowboarders, used by Olympians (2022 Olympics); 275K+ euro revenue; 4.4x peak season growth.
   - Bueno: leads growth, founding team, Jan 2022 to present; built online marketing single-handedly across 28 countries; 24x LTV/CAC (700 euro LTV, 30 euro CAC). Never quote Bueno ARR.
   - MarketerHire Top 1% globally; $32M startup revenue generated; $7M ad spend managed.
   - 100+ founders mentored; 1,000+ graduates coached (Harvard, Oxford, LSE, Yale, HEC Paris, IIM, IMD); 9.7/10 rating; 50+ keynotes in 14 countries; 3 TEDx talks (UK, Romania Tirgu Mures, Indonesia Bali).
   - Techstars mentor since May 2022 (Berlin; Techstars and Audi Founder Innovation Lab 2023); EBRD Star Venture since Jun 2024; Seedstars (UN CTCN climate lab, 2021); Newchip 2020 to 2021; Founder Institute, Antler.
   - Visiting Professor at Masters' Union and Tetr College of Business; teaches at SP Jain; IE Business School visiting faculty from Jun 2022.
   - Airbus 2016 (marketing for EU project NEOShield); Bayer 2017 (ran a 250K euro global senior executive event); Sweek 2017 (marketing advisor to CEO, cut acquisition cost 50%+).
   - Claude 101 with GrowthX, 19 June 2026, 100 of 100 seats; Deployed by Coditas, Pune, 27 June 2026; Builders Night Out, Pune, 4 July 2026.
3. Client internal data (revenue, ROAS, funnel numbers, CAC from meeting notes, Le Patron revenue, Infento Christmas plan figures) must NOT appear. You may describe what was done and the type of result ("lifted conversion on checkout") without the number, unless the number is in rule 2 or already public in a client testimonial marked yes.
4. Mentees, coachees and accelerator startups are private: never name them. Describe them ("a Berlin mobility startup at Techstars", "a fintech founder from the Newchip cohort"). Named clients from consulting (Infento, VU, Bueno, Sweek, Le Patron, Font Neuve, Frecious, Growack, PCP, Property Clan, SMPC, Airbus, Bayer, Wearwell, Petit Seal, Nest) MAY be named, without internal numbers.
5. Not Pratik's work: do not present as his. Techstars North Star and Five Dysfunctions decks, the 30/60/90 template, Growack "Taktical Growth" deck, Brian Balfour and Michael Taylor derived pieces, the Stories database parables, the Prioritisation post. Well-known public frameworks (Jobs to be Done, Kano, North Star Metric, OMTM, AARRR, STAR) may be explained as frameworks he uses, named as such.
6. Do not use: health, burnout, money, fees, family, "former homeless", wealth pledge, investments, named VIP contacts.
7. Voice: plain human English, short complete sentences, first person "I" where it is Pratik's experience. No hype, no emojis, NO em dashes or en dashes anywhere (use commas, colons, full stops). No "journey", no LinkedIn cliches.
8. Testimonials: only quotes marked publishable yes, or already public on pratikrenuse.com, with the person and role as given.
9. Slugs: lowercase, hyphens, unique, descriptive of the search query (e.g. "how-to-run-a-kickstarter-pre-launch-list"). Questions phrased the way a founder or CMO would type or ask them.
10. Lengths: "short" 40 to 95 words, a direct answer that stands alone. Body 250 to 700 words.

## Body markup (string)
Paragraphs separated by a blank line. "## Heading" starts a section. Lines starting "- " form a bullet list (a block must be all bullets). Nothing else (no bold, no links, no numbered lists).

## Schemas

ANSWER (list name ANSWERS_EXTRA):
{"slug","topic","q","short","body","related":[answer slugs], optional "playbook": playbook slug}
topic is one of: ai-marketing, ai-search, growth-from-zero, marketing-leadership, events-and-speaking, founder-mentoring, career-growth, performance-marketing

PLAYBOOK (list name PLAYBOOKS_EXTRA):
{"slug","title","desc"(<=160 chars),"who","time","tools":[...],"short","steps":[[step name, 1-3 sentence text], ...] (4 to 10 steps),"pitfalls":[...],"related_answers":[answer slugs],"proof": one sentence of where this comes from in Pratik's work, "proof_link": an existing site path such as "/work/infento/" or "/consulting/"}

CASE (list name CASES), served at /work/<slug>/:
{"slug","company","title"(e.g. "Infento: from zero to a record Kickstarter"),"desc"(<=160),"industry","country","years","role","short","challenge": paragraph,"what_i_did":[bullets],"results":[bullets],"lessons": body markup string,"testimonial": {"quote","person","role"} or None,"related_answers":[slugs],"related_playbooks":[slugs]}

TALK (list name TALKS), served at /speaking/talks/<slug>/:
{"slug","title","event","organiser","kind" (TEDx talk|Keynote|Workshop|Masterclass|Guest lecture|Course module|Build night|Mentor session|Webinar),"city","country","date"(YYYY-MM-DD, YYYY-MM or YYYY),"online": true/false,"audience","short","body","media_url": public URL or "","existing_page": "" or an existing site path if the event already has a page (Claude 101 -> "/speaking/claude-101/", Coditas -> "/speaking/coditas-deployed/", Builders Night Out -> "/speaking/builders-night-out/")}

Cross links: you may link to slugs you create, to the existing slugs in content_answers.py/content_playbooks.py, and to slugs listed in /home/claude/seo/SLUG_REGISTRY.md (other writers append their planned slugs there; read it, and append your own planned slugs early with a line "kind: slug").

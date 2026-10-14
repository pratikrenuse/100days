---
name: clear-ui
description: "Use this skill whenever building, redesigning, or auditing any user interface, web page, landing page, dashboard, form, or HTML artifact. Triggers on requests like 'design a page', 'build a landing page', 'audit this UI', 'what's wrong with this design', 'improve conversions', 'the button isn't working', 'users keep dropping off', or any task involving how a user will interact with an interface. Applies the C.L.E.A.R. framework (Copywriting, Layout, Emphasis, Accessibility, Reward) from Growth.Design's applied UX methodology. This skill encodes the strategic UX decisions, for the specific typography and readability rules, also consult the readable-web skill. Always apply this skill BEFORE finalizing any UI, it catches the high-level mistakes (wrong button verbs, missing visual hierarchy, no primary action, no completion signal) that no amount of polishing fixes."
---

# C.L.E.A.R. UI Framework

Most pages that look polished but underperform are failing one or more of five pillars: **Copywriting, Layout, Emphasis, Accessibility, Reward**. This skill encodes each as a specific diagnostic and a specific fix.

The order matters. Apply them in sequence. Earlier failures cascade: ugly type with great copy is recoverable; beautiful design with generic copy is not.

## The five pillars in 30 seconds

1. **Copywriting**, Words come first. If users can't tell what your button does or what your page is about, design is irrelevant. Buttons are `verb + object`. Hero answers "what's in it for me" in one sentence.
2. **Layout**, Gestalt principles govern how the brain groups information. Proximity, common region, alignment do the structural work that borders should not.
3. **Emphasis**, Pick ONE primary action per section. Use the right dial (size, color, placement, space, visualization, motion) to make it pop. The Squint Test verifies.
4. **Accessibility**, Visible without searching, Operable without precision, Actionable without guessing. 44px+ targets, real labels, contrast that survives sunlight.
5. **Reward**, Every completed action needs a clear, proportionate signal. Pick the right reward from the Trifecta: Control, Competence, or Recognition.

## C, Copywriting

The first thing users do on a page is read. Generic words kill conversions before design has a chance to work.

### The three copy mistakes

1. **Long copy.** Three lines of prose in a card and people skip the entire card. The web is scanned, not read.
2. **Generic copy.** "Power your business." "Get started today." "Streamline your workflow." Works for anyone, sells nothing.
3. **Unnecessary duplicates.** Repeating the value prop in hero + sub + button + bullet just adds noise.

### The four practical fixes

1. **Emphasize benefits, not features.** "Get back 2 hours a week" beats "AI-powered scheduling." Lead with what changes for the user.
2. **Reassure where there's friction.** "You can change this later." "No credit card needed." "Cancel anytime." A single reassurance unlocks more conversions than a redesign.
3. **Use specific verbs and concrete outcomes.** Every button is `verb + object`. "Send invoice," "Download report," "Continue to payment." Real evidence: changing "Submit" to "Send invoice" lifted CTR 18% in one documented case.
4. **Talk like a real person.** Read the copy out loud. If you naturally rephrase as you read, the written version is wrong.

### The Copy Swap Test (the diagnostic)

Hide your logo and visuals. Read the copy aloud. Ask: **could another company use these exact words on their site?**

If yes, every line that fails is generic copy. Rewrite.

### Button copy rules (non-negotiable)

- **Never use:** "Submit," "Click here," "Learn more," "Next," "Continue," "OK." These are placeholder words.
- **Always use:** `Verb + Object` where possible. "Send invoice." "Download report." "Add to cart." "Reserve a seat."
- **For destructive actions:** be explicit. "Delete account" not "Confirm." Match button label to consequence.
- **For low-friction CTAs:** consider benefit framing. "Start my free trial" beats "Sign up." "See my results" beats "Continue."
- **Length:** 2-5 words. Past 5 and the button stops feeling like an action.

### Microcopy beyond buttons

- **Form fields:** label what the field is FOR, not just what it IS. "Work email (we'll send your receipts here)" beats "Email."
- **Error messages:** never blame the user. "We didn't recognize that email" beats "Invalid input."
- **Empty states:** explain what would be here, and how to fill it. Empty + silent is the worst combination.
- **Loading states:** if it takes >1 second, tell the user what's happening. "Saving your draft" beats a spinner.

## L, Layout

Gestalt principles aren't optional folklore. They're how the visual cortex literally groups what it sees. Violate them and the brain works harder to understand the page, which means more bounces.

### The six Gestalt principles every UI uses

1. **Proximity**, Elements close together are perceived as a group. The strongest grouping principle, usually overpowering color or shape. Whitespace is the tool here, not borders.
2. **Common Region**, Elements inside the same container (card, panel, box) are read as one unit. Material Design cards are pure common-region.
3. **Alignment**, Elements on a shared axis feel related and intentional. Misalignment looks like a bug even when functionally nothing's wrong.
4. **Similarity**, Same color, shape, or size signals same kind of thing. All buttons must look like buttons.
5. **Continuity**, The eye follows lines and curves. Arranged elements feel connected.
6. **Simplicity (Prägnanz)**, The brain prefers the simplest interpretation. Don't make it work harder than it has to.

### Practical application

- **For grouping form fields:** use proximity (whitespace between groups) first, common region (subtle background) second, borders only as last resort.
- **For showing relationships:** stack aligned items; the alignment IS the relationship.
- **For separating sections:** lots of whitespace beats a divider line.
- **For card grids:** common region (the card itself) handles grouping; don't add internal borders.

### The three layout mistakes

1. **Sloppy spacing.** Spacing is inconsistent or missing. **Fix:** start with *too much* padding (2-2.5rem in cards, 6-8rem section padding) and pull back. Almost every cramped design I've audited started with "good enough" padding that wasn't.
2. **Border bloat.** Drawing boxes around everything because you don't trust whitespace. **Fix:** define areas with subtle background tints (`#EEE8E4` on `#F6F2F1` for example, a 6% shift), not hairlines. Use borders sparingly, for actual separation.
3. **Content cramming.** Squeezing too much info into one screen. **Fix:** remove elements (see Copywriting), use progressive disclosure (hide secondary info behind "Show more"), split into steps.

### Padding defaults to start from

- Cards holding prose: **2-2.5rem** all sides
- Form panels: **2-2.5rem**
- Section vertical padding: **4-8rem** desktop, **2.5-3.5rem** mobile
- Section horizontal: **4rem** desktop, **1.25rem** mobile
- Button: **0.8-1rem** vertical, **1.5-2.2rem** horizontal

## E, Emphasis

Every section should have **exactly one primary thing**. If three things compete for attention, the user has to choose, which means thinking, which means leaving.

### The six emphasis dials

To make one thing stand out, turn ONE of these dials up while keeping the others quiet:

1. **Size**, Bigger = more important. Don't be subtle; a 2px bump is not emphasis. For primary actions, go 1.3-1.5x.
2. **Color**, Saturated color in a muted page pulls the eye. Reserve your accent color (e.g., the gold) for ONE job per section.
3. **Placement**, Top-left and center get seen first in left-reading languages. F-pattern (for content-heavy) and Z-pattern (for hero/landing) are the default scan paths.
4. **Space**, Surrounding whitespace amplifies importance more than size does. A small button alone in a quiet area beats a huge button in a cluttered grid.
5. **Visualization**, Turn a number into a chart, a comparison into a diagram, a process into steps. Visual representations carry more weight than text of the same data.
6. **Motion**, A single animated element is the strongest attention grabber. Which is why it should be used almost never. Reserve for the one action you really need seen.

### Choose the right dial

| Goal                                        | Use                  |
|---------------------------------------------|----------------------|
| Make the primary CTA unmissable             | Size + Color         |
| Highlight a specific stat or quote          | Space + Size         |
| Draw the eye through a sequence             | Placement + Continuity |
| Communicate data relationships              | Visualization        |
| Pull attention back from anywhere on page   | Motion (sparingly)   |

### The Foggy Glasses Test (the diagnostic)

Squint at your design until detail blurs out. What's left is contrast, size, position, spacing. **The thing that stands out is what the brain will see first.**

If that's not the thing you wanted users to see, your hierarchy is wrong.

A practical alternative: load the page, then walk 6 feet away and look. Or use Polypane's far-sightedness emulator. Or screenshot and apply a strong Gaussian blur.

### The three emphasis mistakes

1. **Wrong Dial**, Turned up Size when the page needed Space. Or Color when it needed Placement. Each dial does a different job; pick the one that matches the goal.
2. **Weak Dial**, Emphasis exists but it's so subtle nobody sees it. A 16px → 18px bump is not emphasis. The bump has to be obvious.
3. **Screaming Dial**, Emphasis on everything (every button is gold, every heading is huge, three things animate). Emphasis on everything means emphasis on nothing.

### The one-primary-action rule

In every distinct section of your page, ONE thing should be the obvious next action. Secondary actions exist but visibly stand down: less color, less weight, less size. Tertiary actions are text links, not buttons.

If you can't pick which action is primary, the problem is upstream: the page is trying to do too much at once.

## A, Accessibility

Most accessibility wins are usability wins for everyone. Reframe accessibility from "compliance checkbox" to "design that works for real people in real conditions."

### The eight accessibility mistakes

1. **Tiny targets**, buttons under 44px square miss frequently, especially on mobile.
2. **Crowded areas**, interactive elements packed together cause mis-clicks; users hit the wrong button.
3. **Low-contrast text**, anything under 7:1 fatigues the eye after a paragraph; under 4.5:1 fails accessibility.
4. **Icons only, no labels**, a hamburger icon is recognized; a custom icon never is. Always pair with text.
5. **Key actions hidden**, primary CTA below the fold, or behind a hover state, or only accessible via gesture.
6. **Color-only meaning**, "click the red one" fails for color-blind users (8% of men). Use color PLUS shape, label, or position.
7. **Multiple inconsistent patterns**, one screen uses cards, the next uses lists, the next uses tiles. Pick one pattern per content type.
8. **Assumed knowledge**, using jargon, internal terms, or features without explanation.

### The three accessibility design principles

These are the cleanest summary of accessibility I've seen. Memorize as **Find / Touch / Trust**:

#### Visible without searching (Find)

Can the user see the main action without digging, scrolling, or guessing? Is it above the fold?

- Hero CTA visible on initial viewport, every viewport size.
- Primary actions in expected locations (top-right for account, top-center for nav, center for hero CTA, bottom-right for floating action).
- If you have to explain where to find something, it's hidden.

#### Operable without precision (Touch)

Can users tap/click/select actions even with reduced capability? Thumbs, motion impairment, fatigue, distraction?

- **Targets: 44×44px minimum.** WCAG 2.2 sets the AA floor at 24×24, AAA at 44×44; iOS Human Interface Guidelines and Apple recommend 44pt; Material Design recommends 48dp.
- **Spacing: 8-10px minimum between adjacent targets.** Stops mis-taps.
- **Hit area > visual area.** A 28px-tall button can be tappable across 44px if you add invisible padding.
- **Keyboard-accessible.** Every interactive element reachable by Tab; visible focus state for every focusable element.
- **No precision-required gestures.** Hover-only menus, double-taps, long-presses all exclude users.

#### Actionable without guessing (Trust)

Do actions look like actions? Self-explanatory? Do users have to guess what will happen?

- **Buttons look like buttons.** Boxes, with text inside, that look pressable. Not just colored text.
- **Labels describe the outcome.** "Send invoice" tells you what will happen. "Confirm" does not.
- **Affordances are consistent.** Links underlined, buttons filled or outlined, toggles look toggleable.
- **No fake elements.** Don't style non-clickable text to look clickable, or vice versa.

### Contrast quick reference

For body text on backgrounds:

- AAA (the target): 7:1 minimum
- AA (the floor): 4.5:1 minimum
- Light text on dark: bump up by ~20% over light-on-dark equivalents
- See the readable-web skill for specific color pair tables

### Mobile-specific rules

- Touch targets: 44px+ (iOS) or 48dp+ (Material)
- Bottom-edge actions: 12mm+ (≈46px), since thumbs are clumsier here
- Top-edge actions: 11mm+ (≈42px), still usable but harder to reach
- Avoid critical actions in the dead zone (top corners on large phones)

## R, Reward

The pillar most often missed in B2B/serious software design. After a user completes an action, what do they get?

### The core insight

Every interaction needs a clear positive signal at completion. Silence or ambiguity creates anxiety: "did that work?" The brain wants confirmation. When it doesn't get one, the user feels uncertain even when the task succeeded.

### The Reward Trifecta

Three kinds of payoff users actually want. Different products need different mixes:

1. **Control**, Feeling safe, certain, in charge. "Saved." "You can undo this." "We won't share your email." "Your data is encrypted." **Use for:** financial apps, security flows, anything where the user fears losing something. Control rewards reduce anxiety.

2. **Competence**, Feeling improvement, forward motion, getting better. Progress bars, "you've completed 3 of 5," streaks, XP, levels, "your fastest time yet." **Use for:** learning apps, fitness, productivity, gamified onboarding. Competence rewards drive return visits.

3. **Recognition**, Feeling seen, valued, belonging. "Welcome back, Pratik." "You're our 47th member." "Your post got 12 replies." "@John mentioned you." **Use for:** social products, community features, anything multi-user. Recognition rewards build emotional attachment.

### The three reward mistakes

1. **Wrong Reward**, Delivering a payoff the user didn't want in that moment. Confetti for paying a medical bill (somber moment, needs Control reward). A "great job!" after a serious transaction (needs a precise confirmation, not praise).

2. **Shy Reward**, The value is real (time saved, status updated, recognition earned) but the UI doesn't surface it clearly. Or it's there but generic ("Success!") with no evidence, consequence, or specificity. **Fix:** make the reward concrete. "Saved 4 minutes" beats "Saved." "Your post is now visible to your 47 followers" beats "Posted."

3. **Over-Reward**, Intensity or frequency wrong for the action. Fullscreen confetti every time the user taps a menu. Animated stars for clicking "next." Cheering for completing a tiny task. **Fix:** match reward magnitude to action significance. Tiny actions get a subtle micro-interaction; major milestones get full celebration.

### Reward intensity scale

- **Micro-action (tap, toggle):** subtle visual response (color change, small animation, haptic on mobile)
- **Small action (save, edit, complete a field):** quiet confirmation (toast notification, brief checkmark)
- **Meaningful action (post, submit, purchase):** clear success state (success screen, persistent confirmation, summary of what happened)
- **Milestone action (complete onboarding, finish course, hit goal):** real celebration (animation, badge, share prompt, screen takeover)

### Three rules for designing rewards

1. **Match the reward to the user's emotional state at completion.** Serious moment = clean confirmation. Achievement moment = celebration. Routine moment = quiet acknowledgment.
2. **Make rewards specific, not generic.** "Saved" is a Shy reward. "Saved. Your draft will be auto-published Friday at 9am" is a Control reward done right.
3. **Reward the right thing.** If a user took a hard step, acknowledge the hard part. ("Thanks for canceling, we'll process your refund in 3 business days.") If they took a brave step, acknowledge the bravery. ("You're in. We send one product per day, no fluff.")

## The pre-ship checklist

Run before considering any page done. Every "no" is a fix-it item.

**Copywriting**
- [ ] Did the page pass the Copy Swap Test (no generic phrases another company could use)?
- [ ] Every button is verb + object?
- [ ] No "Submit," "Click here," "Learn more," "Next," "OK" anywhere?
- [ ] Hero answers "what's in it for me" in the first sentence?
- [ ] Friction points have a reassurance line nearby?

**Layout**
- [ ] Spacing is consistent (multiples of a base unit)?
- [ ] Grouping is done via proximity/common-region, not borders?
- [ ] Card padding is 2rem+ all sides?
- [ ] No three-in-a-row prose cards under 380px usable width?
- [ ] No "content cramming"? Each section has one clear focus?

**Emphasis**
- [ ] Squint Test: the right thing pops?
- [ ] Each section has ONE primary action?
- [ ] Secondary actions visibly stand down (less weight, less color)?
- [ ] No more than 2 things competing for attention per viewport?
- [ ] Accent color (gold/brand) used sparingly, for emphasis only?

**Accessibility**
- [ ] All interactive targets 44px+ square (or 24px+ with spacing)?
- [ ] No icons without text labels?
- [ ] Color is not the only signal for any meaning?
- [ ] Primary CTA visible without scrolling?
- [ ] Every button label tells you what will happen?

**Reward**
- [ ] Every form submission has a clear success state?
- [ ] Success states are specific, not generic ("Saved" → "Saved. Live in 30 seconds")?
- [ ] Reward intensity matches action significance?
- [ ] The right TYPE of reward (Control/Competence/Recognition) for this product?
- [ ] No silent successes (action completes with no feedback)?

## Common patterns and anti-patterns

### The "polished but generic" pattern (fails Copywriting)

A beautifully designed hero with "Power your business with our platform" as the headline. No specificity, no benefit, no reason to keep reading. Visual design is doing all the work; copy is doing none. **Fix:** rewrite the headline to name the specific outcome ("Get 10 hours back per week" or "Close deals 3x faster") and make it pass the Copy Swap Test.

### The "egalitarian hierarchy" pattern (fails Emphasis)

Every button is the same size and same color. Every card looks equally important. The user has no idea where to go next, so they scroll forever or leave. **Fix:** pick the ONE primary action per section. Style it boldly. Style everything else as supporting.

### The "border bloat" pattern (fails Layout)

Every card has a 1px gray border. Every section has a divider line. Every form field has a box. The page looks "structured" but feels noisy and cluttered. **Fix:** remove most borders. Use whitespace and subtle background shifts to do the same grouping work.

### The "silent success" pattern (fails Reward)

User submits a form. Page reloads. Form is empty. Did it work? Did it fail? Did anything happen? **Fix:** confirm explicitly with specific language. "Sent. We'll email you within 24 hours" beats a silent reload.

### The "tracked-out generic CTA" pattern (fails Copywriting AND Emphasis)

A button labeled "GET STARTED" with 0.2em letter-spacing. Looks editorial, communicates nothing. The user knows neither what they're getting nor what's about to happen. **Fix:** specific verb + object, no tracking, and treat the button itself as an emphasis dial (not just the text inside it).

## When to apply this skill

- **Before writing CSS:** decide what's primary, what's secondary, what each button says
- **When auditing an existing page:** walk through C, L, E, A, R in order
- **When users complain "I don't know what to do here":** apply Emphasis + Copywriting
- **When users complete actions but don't return:** apply Reward
- **When conversion drops on a specific step:** apply Copywriting (button label) + Accessibility (visibility)

## References

For deeper context:

- `references/gestalt-deep.md`, every Gestalt principle explained with UI examples
- `references/copy-patterns.md`, button copy and microcopy patterns that work
- `references/audit-template.md`, copy-pasteable C.L.E.A.R. audit format for evaluating any screen

Pair with the **readable-web** skill for typography and readability decisions. C.L.E.A.R. handles strategic UX; readable-web handles the typography layer underneath it. Both should be applied to every page.

/* =====================================================================
   The 0 → 1 Path — a calm career RPG built from Pratik Renuse's portfolio
   Vanilla JS. No frameworks, no build step.
   ===================================================================== */

// ---- Skills ----
const SKILLS = ["Growth", "Brand", "Story", "Grit"];

// ---- Game data: each stage is a real chapter of the career ----
// Every choice progresses the story (forgiving). The choice that matches
// what Pratik actually did awards the most XP and always reveals the real result.
const STAGES = [
  {
    year: "2016",
    yearPos: 0,
    company: "Airbus",
    place: "Munich · Aerospace",
    role: "Marketing",
    emblem: "spark",
    intro: "Your first taste of marketing at a Fortune 500. The EU-wide project ‘NEOShield’ needs visibility — and you have almost no budget.",
    skill: "Brand",
    challenge: {
      prompt: "How do you make ‘NEOShield’ seen?",
      options: [
        { text: "Earn it — SEO + organic social, ranking for the right keywords", xp: 40, best: true,
          outcome: "You grow organic social reach by 127% in two months and take the site to rank #1 on Google." },
        { text: "Buy a big paid media burst and hope it sticks", xp: 18,
          outcome: "It spikes, then fades. You learn that earned attention compounds; bought attention rents." },
        { text: "Wait for the PR team to handle it", xp: 10,
          outcome: "Nothing moves. You realise you’d rather build the engine yourself." }
      ]
    },
    badge: "First Light",
    reward: "Organic reach +127% · ranked #1 on Google"
  },
  {
    year: "2017",
    yearPos: 0.16,
    company: "Bayer",
    place: "Berlin · Life Sciences",
    role: "Project Management",
    emblem: "globe",
    intro: "A temporary contract reporting to a Director: run ‘GIM’, Bayer’s premier event for senior executives from 50+ countries — on a €250K budget.",
    skill: "Grit",
    challenge: {
      prompt: "Fifty countries, one budget, no room for error. Your move?",
      options: [
        { text: "Own the whole €250K plan end-to-end and sweat every detail", xp: 40, best: true,
          outcome: "You manage the full €250K budget for a global executive event spanning 50+ countries — and deliver." },
        { text: "Delegate widely and stay hands-off", xp: 16,
          outcome: "Details slip in the gaps. You learn that at the start, ownership beats delegation." },
        { text: "Play it safe and cut the scope", xp: 12,
          outcome: "It’s fine, not memorable. You’d rather aim higher next time." }
      ]
    },
    badge: "Steady Hands",
    reward: "€250K event delivered across 50+ countries"
  },
  {
    year: "2017–19",
    yearPos: 0.34,
    company: "Infento",
    place: "Amsterdam · STEM hardware",
    role: "Online Marketing · Founding Team",
    emblem: "rocket",
    intro: "A founding-team seat at a consumer-hardware startup. The web shop is at €0. There is no brand, no traffic, no playbook. This is the blank space you love.",
    skill: "Growth",
    challenge: {
      prompt: "You need a launch moment that creates a company. Where do you bet?",
      options: [
        { text: "Go all-in on a flagship Kickstarter and make it the best STEM project in the world", xp: 60, best: true,
          outcome: "You lead a $848K campaign — the #1 most-funded STEM project globally in 2018 — and scale the DTC shop from €0 to €2M ARR." },
        { text: "Grind paid ads quietly and grow inch by inch", xp: 26,
          outcome: "You’d move, but slowly. The big swing was the right one." },
        { text: "Wait until the product is ‘perfect’ before launching", xp: 12,
          outcome: "Momentum is a perishable good. You learn to launch and iterate." }
      ]
    },
    badge: "#1 STEM Kickstarter · $848K",
    reward: "€0 → €2M ARR · Red Dot & German Design awards · team to 25+"
  },
  {
    year: "2020",
    yearPos: 0.52,
    company: "Growack Media",
    place: "Amsterdam · B2B growth",
    role: "Head of Marketing",
    emblem: "gear",
    intro: "A year leading inbound & growth for B2B clients across Western Europe. Different game: longer cycles, sharper systems.",
    skill: "Growth",
    challenge: {
      prompt: "How do you win B2B trust across a whole region?",
      options: [
        { text: "Build a credible inbound engine and earn partner-grade recognition", xp: 42, best: true,
          outcome: "Operations earn HubSpot Partner status and a Clutch 2021 ‘Top B2B Company in Western Europe’." },
        { text: "Cold-blast outbound and chase volume", xp: 18,
          outcome: "Noisy, low trust. Inbound credibility wins B2B." },
        { text: "Copy a competitor’s playbook wholesale", xp: 12,
          outcome: "Borrowed strategy, borrowed results. You prefer building your own." }
      ]
    },
    badge: "HubSpot Partner",
    reward: "Clutch 2021 · Top B2B in Western Europe"
  },
  {
    year: "2021–25",
    yearPos: 0.7,
    company: "VU",
    place: "Geneva · Swiss D2C",
    role: "Head of Marketing · Founding Team",
    emblem: "peak",
    intro: "Another founding seat — this time the #1 Swiss brand for professional skiers and snowboarders. Used by Olympians. Everything digital starts blank.",
    skill: "Brand",
    challenge: {
      prompt: "A brand worn by Olympians needs a presence to match. You build…",
      options: [
        { text: "The whole thing end-to-end: identity, site, paid, lifecycle, community", xp: 55, best: true,
          outcome: "You build VU’s full digital presence and drive €275K+ revenue with 4.4× peak-season growth." },
        { text: "Just run ads and skip the brand work", xp: 22,
          outcome: "Sales blip, no loyalty. For a premium brand, identity is the moat." },
        { text: "Outsource it all to an agency", xp: 14,
          outcome: "Generic and slow. Founding brands deserve a founder’s hand." }
      ]
    },
    badge: "Worn by Olympians",
    reward: "€275K+ revenue · 4.4× peak-season growth"
  },
  {
    year: "2022–now",
    yearPos: 0.86,
    company: "Bueno",
    place: "Spain · Fintech",
    role: "Growth Lead · Founding Team · Shareholder",
    emblem: "vault",
    intro: "A UK-government-award-winning fintech for foreign property owners in Spain. €2.5M raised. Marketing is, once again, a blank page — and you’re holding the pen alone.",
    skill: "Growth",
    challenge: {
      prompt: "Up against Revolut and Wise, where do you build your edge?",
      options: [
        { text: "Own organic + lifecycle: rank above the giants and compound a newsletter", xp: 65, best: true,
          outcome: "You go €0 → €300K+ ARR across 28 countries at 24× LTV/CAC, draw 1M+ organic visits, and outrank Revolut and Wise on target keywords." },
        { text: "Outspend them on paid — match budget for budget", xp: 24,
          outcome: "You can’t out-spend giants; you can out-rank them. Organic was the edge." },
        { text: "Pick one country and stay small", xp: 16,
          outcome: "Safe, but the opportunity was 28 countries wide." }
      ]
    },
    badge: "24× LTV/CAC · 28 countries",
    reward: "€0 → €300K+ ARR · 1M+ organic visits · outranked Revolut & Wise"
  },
  {
    year: "2022–now",
    yearPos: 0.96,
    company: "Beyond Building",
    place: "5 continents · Stages & mentorship",
    role: "Mentor · TEDx Speaker · Visiting Faculty",
    emblem: "star",
    intro: "Between builds, a different kind of growth: lifting others. Accelerators, lecture halls, and stages around the world come calling.",
    skill: "Story",
    challenge: {
      prompt: "What do you do with everything you’ve learned?",
      options: [
        { text: "Give it away — mentor founders, coach students, speak on stages", xp: 50, best: true,
          outcome: "You mentor 100+ startups (9.7/10 avg) at Techstars, EBRD, Seedstars & Founder Institute, coach 500+ graduates from Harvard, LSE & HEC Paris, and deliver 3 TEDx talks + 50+ keynotes across 14+ countries." },
        { text: "Keep your edge to yourself", xp: 18,
          outcome: "Knowledge hoarded stops compounding. Teaching it multiplies it." },
        { text: "Do one talk and call it done", xp: 14,
          outcome: "You found you genuinely love this — so you kept going." }
      ]
    },
    badge: "3× TEDx · 100+ startups mentored",
    reward: "9.7/10 mentor rating · 500+ graduates coached · 14+ countries"
  }
];

// Quiet collectibles found "off the path"
const INVESTMENTS = ["Atom Bank", "Nothing", "Perplexity", "Plum"];

// ---- Tiny inline SVG emblems (calm line art) ----
const EMBLEMS = {
  spark: '<path d="M50 14 L56 44 L86 50 L56 56 L50 86 L44 56 L14 50 L44 44 Z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>',
  globe: '<circle cx="50" cy="50" r="34" fill="none" stroke="currentColor" stroke-width="2.2"/><ellipse cx="50" cy="50" rx="14" ry="34" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M18 50 H82 M24 34 H76 M24 66 H76" stroke="currentColor" stroke-width="1.6"/>',
  rocket: '<path d="M50 16 C66 28 70 48 64 70 H36 C30 48 34 28 50 16 Z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/><circle cx="50" cy="44" r="7" fill="none" stroke="currentColor" stroke-width="2"/><path d="M40 70 L32 84 M60 70 L68 84 M50 70 L50 88" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  gear: '<circle cx="50" cy="50" r="16" fill="none" stroke="currentColor" stroke-width="2.2"/><g stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M50 18 V30 M50 70 V82 M18 50 H30 M70 50 H82 M27 27 L35 35 M65 65 L73 73 M73 27 L65 35 M35 65 L27 73"/></g>',
  peak: '<path d="M16 78 L40 34 L54 56 L66 28 L86 78 Z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/><path d="M16 78 H86" stroke="currentColor" stroke-width="1.6"/>',
  vault: '<rect x="20" y="24" width="60" height="52" rx="6" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="50" cy="50" r="14" fill="none" stroke="currentColor" stroke-width="2"/><path d="M50 50 L50 38 M50 50 L60 56" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  star: '<path d="M50 16 L60 40 L86 42 L66 60 L72 86 L50 72 L28 86 L34 60 L14 42 L40 40 Z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>'
};

// ---- Game state ----
const state = {
  stage: 0,
  xp: 0,
  level: 1,
  skills: { Growth: 0, Brand: 0, Story: 0, Grit: 0 },
  badges: []
};

const XP_PER_LEVEL = 90;

// ---- Elements ----
const screen = document.getElementById("screen");
const hud = document.getElementById("hud");

// ---- Helpers ----
function emblemSVG(name, cls = "emblem") {
  return `<svg class="${cls}" viewBox="0 0 100 100" aria-hidden="true">${EMBLEMS[name] || ""}</svg>`;
}

function updateHUD() {
  hud.hidden = false;
  document.getElementById("hudLevel").textContent = state.level;
  document.getElementById("hudXp").textContent = state.xp;
  document.getElementById("hudXpFill").style.width =
    Math.min(100, ((state.xp % XP_PER_LEVEL) / XP_PER_LEVEL) * 100) + "%";

  // timeline reflects current stage position
  const pos = STAGES[Math.min(state.stage, STAGES.length - 1)].yearPos;
  document.getElementById("hudTimeline").style.width = (pos * 100) + "%";
  document.getElementById("hudYear").textContent =
    STAGES[Math.min(state.stage, STAGES.length - 1)].year.split("–")[0];

  // skills
  const maxSkill = 4;
  document.getElementById("hudSkills").innerHTML = SKILLS.map(s => {
    const v = Math.min(maxSkill, state.skills[s]);
    return `<div class="skill"><span>${s}</span><div class="skill-track">
      <div class="skill-fill" style="width:${(v / maxSkill) * 100}%"></div></div></div>`;
  }).join("");
}

function addXP(amount) {
  state.xp += amount;
  while (state.xp >= state.level * XP_PER_LEVEL) {
    state.level++;
  }
}

// ---- Screens ----
function renderTitle() {
  hud.hidden = true;
  screen.innerHTML = `
    <section class="title-card fade">
      <p class="kicker">A playable portfolio</p>
      <h1 class="title">The 0 <span class="arrow">→</span> 1 Path</h1>
      <p class="subtitle">Play as <strong>Pratik Renuse</strong>. Travel a decade — from 2016 to today —
      and grow each startup from zero. Make the call at every venture, level up
      <em>Growth · Brand · Story · Grit</em>, and reach the present day.</p>
      <div class="title-path" aria-hidden="true">
        <svg viewBox="0 0 600 80" preserveAspectRatio="xMidYMid meet">
          <path d="M20 64 C160 64 180 24 300 28 C420 32 460 16 580 14"
            fill="none" stroke="var(--ink)" stroke-width="1.4" stroke-dasharray="2 7" stroke-linecap="round" stroke-opacity="0.5"/>
          <circle cx="20" cy="64" r="5" fill="var(--paper)" stroke="var(--ink)" stroke-width="1.4"/>
          <circle cx="300" cy="28" r="5" fill="var(--paper)" stroke="var(--ink)" stroke-width="1.4"/>
          <circle cx="580" cy="14" r="6" fill="var(--accent)"/>
        </svg>
      </div>
      <button class="btn btn-primary" id="startBtn">Begin the path</button>
      <p class="hint">~3 minutes · every choice moves you forward</p>
    </section>`;
  document.getElementById("startBtn").addEventListener("click", () => {
    state.stage = 0;
    renderStage();
  });
}

function renderStage() {
  const s = STAGES[state.stage];
  updateHUD();
  screen.innerHTML = `
    <section class="stage fade">
      <div class="stage-head">
        <div class="stage-emblem">${emblemSVG(s.emblem)}</div>
        <div>
          <p class="stage-year">${s.year} · ${s.place}</p>
          <h2 class="stage-company">${s.company}</h2>
          <p class="stage-role">${s.role}</p>
        </div>
      </div>
      <p class="stage-intro">${s.intro}</p>
      <p class="challenge-prompt">${s.challenge.prompt}</p>
      <div class="choices">
        ${s.challenge.options.map((o, i) =>
          `<button class="choice" data-i="${i}">${o.text}</button>`).join("")}
      </div>
    </section>`;
  screen.querySelectorAll(".choice").forEach(btn => {
    btn.addEventListener("click", () => chooseOption(parseInt(btn.dataset.i, 10)));
  });
}

function chooseOption(i) {
  const s = STAGES[state.stage];
  const opt = s.challenge.options[i];

  addXP(opt.xp);
  state.skills[s.skill] = (state.skills[s.skill] || 0) + 1;
  if (opt.best && !state.badges.includes(s.badge)) state.badges.push(s.badge);
  updateHUD();

  screen.innerHTML = `
    <section class="result fade">
      <div class="stage-head small">
        <div class="stage-emblem">${emblemSVG(s.emblem)}</div>
        <div>
          <p class="stage-year">${s.year} · ${s.company}</p>
          <h2 class="stage-company">${opt.best ? "Nailed it" : "You made it through"}</h2>
        </div>
      </div>
      <p class="outcome">${opt.outcome}</p>

      <div class="reward">
        <div class="reward-row"><span class="reward-tag">+${opt.xp} XP</span>
          <span class="reward-tag">${s.skill} +1</span>
          ${opt.best ? `<span class="reward-tag badge">★ ${s.badge}</span>` : ``}
        </div>
        <p class="reward-result">${s.reward}</p>
      </div>

      ${opt.best ? "" : `<p class="nudge">A bigger swing was on the table — but the path is forgiving. Onward.</p>`}

      <button class="btn btn-primary" id="nextBtn">
        ${state.stage < STAGES.length - 1 ? "Continue the path →" : "Reach the present →"}
      </button>
    </section>`;

  document.getElementById("nextBtn").addEventListener("click", () => {
    state.stage++;
    if (state.stage >= STAGES.length) renderFinale();
    else renderStage();
  });
}

function renderFinale() {
  // finale shows present-day position
  document.getElementById("hudTimeline").style.width = "100%";
  document.getElementById("hudYear").textContent = "2026";
  updateHUD();
  document.getElementById("hudTimeline").style.width = "100%";
  document.getElementById("hudYear").textContent = "2026";

  const badgeChips = state.badges.length
    ? state.badges.map(b => `<span class="chip">★ ${b}</span>`).join("")
    : `<span class="chip muted">No badges this run — replay for the best path</span>`;

  screen.innerHTML = `
    <section class="finale fade">
      <p class="kicker">2026 · You reached the present</p>
      <h1 class="finale-title">A decade of beginnings, cleared.</h1>

      <div class="finale-stats">
        <div><span class="fstat-num">Lv ${state.level}</span><span class="fstat-cap">final level</span></div>
        <div><span class="fstat-num">${state.xp}</span><span class="fstat-cap">total XP</span></div>
        <div><span class="fstat-num">${state.badges.length}/${STAGES.length}</span><span class="fstat-cap">badges earned</span></div>
      </div>

      <div class="finale-skills" id="finaleSkills"></div>

      <div class="finale-block">
        <p class="section-tag">Achievements unlocked</p>
        <div class="chips">${badgeChips}</div>
      </div>

      <div class="finale-block">
        <p class="section-tag">Found off the path</p>
        <div class="chips">${INVESTMENTS.map(n => `<span class="chip soft">◇ ${n}</span>`).join("")}</div>
        <p class="off-note">Quiet angel bets in high-growth consumer tech &amp; fintech.</p>
      </div>

      <div class="finale-card">
        <p class="fc-line">That was a game — the person is real.</p>
        <p class="fc-sub">Pratik Renuse · DTC &amp; Performance Marketing Leader · 0→1 builder, TEDx speaker, mentor.</p>
        <div class="finale-actions">
          <a class="btn btn-primary" href="https://www.linkedin.com/in/pratikrenuse" target="_blank" rel="noopener">Connect on LinkedIn</a>
          <a class="link-quiet" href="mailto:pratik.y.renuse@gmail.com">pratik.y.renuse@gmail.com</a>
        </div>
      </div>

      <button class="btn btn-ghost" id="replayBtn">↻ Play again</button>
    </section>`;

  // render finale skill bars
  const maxSkill = 4;
  document.getElementById("finaleSkills").innerHTML = SKILLS.map(s => {
    const v = Math.min(maxSkill, state.skills[s]);
    return `<div class="fskill"><span>${s}</span><div class="skill-track">
      <div class="skill-fill" style="width:${(v / maxSkill) * 100}%"></div></div>
      <em>${v}</em></div>`;
  }).join("");

  document.getElementById("replayBtn").addEventListener("click", resetGame);
}

function resetGame() {
  state.stage = 0; state.xp = 0; state.level = 1;
  state.skills = { Growth: 0, Brand: 0, Story: 0, Grit: 0 };
  state.badges = [];
  renderTitle();
}

// ---- Boot ----
renderTitle();

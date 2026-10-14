// ═══════════════════════════════════════════════════════════════════════════
//  HABIT TRACKER v3  —  chrome.storage.local  —  persistent, never resets
// ═══════════════════════════════════════════════════════════════════════════

const STORAGE_KEY = 'habitTracker_v3';

const EMOJIS = ['🧘','📚','🏃','💧','🥗','✍️','💪','🎯','🌿','🛌','🚴','🎵','🧠','☀️','🌊','🍎','🏋️','📝'];
const COLORS  = ['#c8bc9a','#7cbfa6','#8facc8','#c89890','#a898c8','#c4b070','#88b898','#b898b0','#c89070','#98b8c8'];

// ─── UTILS ────────────────────────────────────────────────────────────────

function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
}
function pad(n) { return String(n).padStart(2,'0'); }
function parseDate(s) {
  const [y,m,d] = s.split('-').map(Number);
  return new Date(y, m-1, d);
}
function dayDiff(a, b) {
  return Math.round((parseDate(b) - parseDate(a)) / 86400000);
}
function formatDate(s) {
  return parseDate(s).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' });
}
function uid() { return Math.random().toString(36).slice(2,10) + Date.now().toString(36); }
function esc(s) {
  return String(s).replace(/[&<>"']/g, m =>
    ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

// ─── STORAGE ──────────────────────────────────────────────────────────────

async function loadData() {
  return new Promise(resolve => {
    chrome.storage.local.get(STORAGE_KEY, res => {
      const saved = res[STORAGE_KEY];
      if (saved) {
        // Merge defaults so new fields added in updates are never undefined
        const merged = Object.assign({}, defaultData(), saved);
        resolve(merged);
        return;
      }
      resolve(defaultData());
    });
  });
}

async function saveData(d) {
  return new Promise(resolve => {
    chrome.storage.local.set({ [STORAGE_KEY]: d }, resolve);
  });
}

function defaultData() {
  return {
    startDate:    todayStr(),
    maxDays:      100,
    minimalism:   'medium',   // 'high' | 'medium' | 'low'
    theme:        'dark',     // 'dark' | 'cream' | 'light' | 'soft'
    habits:       [],
    completions:  {}
  };
}

// ─── QUOTE ────────────────────────────────────────────────────────────────

function renderQuote() {
  const today = todayStr();
  let hash = 0;
  for (let i = 0; i < today.length; i++) { hash = ((hash << 5) - hash) + today.charCodeAt(i); hash |= 0; }
  const q = QUOTES[Math.abs(hash) % QUOTES.length];
  document.getElementById('quoteText').textContent   = `"${q.text}"`;
  document.getElementById('quoteAuthor').textContent = `— ${q.author}`;
}

// ─── STREAK HELPERS ───────────────────────────────────────────────────────

function currentStreak(data, hid) {
  let n = 0, date = todayStr();
  while (true) {
    const c = data.completions[date];
    if (c && c[hid]) {
      n++;
      const d = parseDate(date); d.setDate(d.getDate() - 1);
      date = `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
    } else break;
  }
  return n;
}

function longestStreak(data, hid) {
  const dates = Object.keys(data.completions).sort();
  let max = 0, cur = 0, prev = null;
  for (const date of dates) {
    if (data.completions[date]?.[hid]) {
      cur = (prev && dayDiff(prev, date) === 1) ? cur + 1 : 1;
      if (cur > max) max = cur;
      prev = date;
    } else { cur = 0; prev = null; }
  }
  return max;
}

function totalDone(data, hid) {
  return Object.values(data.completions).filter(c => c?.[hid]).length;
}

function overallRate(data, hid) {
  const today = todayStr();
  const totalDays = Math.max(1, dayDiff(data.startDate, today) + 1);
  return Math.round((totalDone(data, hid) / totalDays) * 100);
}

// ─── STATE ────────────────────────────────────────────────────────────────

let D          = null;
let selEmoji   = EMOJIS[0];
let selColor   = COLORS[0];
let aFilter    = 'all';

// ─── INIT ─────────────────────────────────────────────────────────────────

async function init() {
  D = await loadData();
  applyTheme();
  applyMinimalism();
  renderQuote();
  renderMainView();
  bindAll();
}

// ─── THEME ────────────────────────────────────────────────────────────────

function applyTheme() {
  document.body.classList.remove('theme-dark','theme-cream','theme-light','theme-soft');
  if (D.theme !== 'dark') {
    document.body.classList.add(`theme-${D.theme}`);
  }
}

// ─── MINIMALISM ───────────────────────────────────────────────────────────

function applyMinimalism() {
  const body = document.getElementById('mainView');
  body.classList.remove('minimalism-high','minimalism-medium','minimalism-low');
  body.classList.add(`minimalism-${D.minimalism}`);

  const quoteZone    = document.getElementById('quoteZone');
  const progressZone = document.getElementById('progressZone');

  if (D.minimalism === 'high') {
    quoteZone.classList.add('hidden');
    progressZone.classList.add('hidden');
  } else if (D.minimalism === 'medium') {
    quoteZone.classList.add('hidden');
    progressZone.classList.remove('hidden');
  } else {
    quoteZone.classList.remove('hidden');
    progressZone.classList.remove('hidden');
  }
}

// ─── MAIN VIEW ────────────────────────────────────────────────────────────

function renderMainView() {
  renderTopbar();
  renderProgress();
  renderHabitList();
}

function renderTopbar() {
  const today  = todayStr();
  const elapsed = Math.max(0, dayDiff(D.startDate, today));
  const dayNum  = Math.min(elapsed + 1, D.maxDays);
  const pct     = Math.round((elapsed / D.maxDays) * 100);

  document.getElementById('dayLabel').textContent  = `Day ${dayNum} of ${D.maxDays}`;
  document.getElementById('dateLabel').textContent = formatDate(today);
}

function renderProgress() {
  const today   = todayStr();
  const comp    = D.completions[today] || {};
  const habits  = D.habits;
  const done    = habits.filter(h => comp[h.id]).length;
  const total   = habits.length;
  const circ    = 169.6;
  const pct     = total ? done / total : 0;

  document.getElementById('progRingFg').style.strokeDashoffset = circ - pct * circ;
  document.getElementById('progNum').textContent = done;

  const hl  = document.getElementById('progHeadline');
  const sub = document.getElementById('progSub');

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning.' : hour < 17 ? 'Good afternoon.' : 'Good evening.';

  if (!total) {
    hl.textContent  = 'No habits yet.';
    sub.textContent = 'Add habits in settings.';
  } else if (done === 0) {
    hl.textContent  = greeting;
    sub.textContent = `0 of ${total} done today.`;
  } else if (done === total) {
    hl.textContent  = 'All done for today.';
    sub.textContent = `${total} of ${total}. Excellent.`;
  } else {
    hl.textContent  = `${done} of ${total} done.`;
    sub.textContent = `${total - done} remaining today.`;
  }
}

function renderHabitList() {
  const today   = todayStr();
  const comp    = D.completions[today] || {};
  const list    = document.getElementById('habitList');
  const empty   = document.getElementById('emptyState');
  list.innerHTML = '';

  if (!D.habits.length) {
    empty.classList.remove('hidden');
    return;
  }
  empty.classList.add('hidden');

  D.habits.forEach(h => {
    const isDone  = !!comp[h.id];
    const streak  = currentStreak(D, h.id);

    const li = document.createElement('li');
    li.className = 'habit-item' + (isDone ? ' done' : '');
    li.dataset.id = h.id;
    li.setAttribute('role', 'button');
    li.setAttribute('aria-label', `${h.name}${isDone ? ', done' : ''}`);

    li.innerHTML = `
      <div class="habit-check" style="${isDone ? `background:${h.color}15;border-color:${h.color}35` : ''}">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
          stroke="${h.color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="2,6.5 4.8,9.2 10,3"/>
        </svg>
      </div>
      <span class="habit-emoji" aria-hidden="true">${h.emoji}</span>
      <span class="habit-name">${esc(h.name)}</span>
      <span class="habit-streak">${streak > 1 ? streak + 'd' : ''}</span>
    `;
    li.addEventListener('click', () => toggleHabit(h.id));
    list.appendChild(li);
  });
}

async function toggleHabit(hid) {
  const today = todayStr();
  if (!D.completions[today]) D.completions[today] = {};
  D.completions[today][hid] = !D.completions[today][hid];
  await saveData(D);

  // Micro-feedback
  const el = document.querySelector(`.habit-item[data-id="${hid}"]`);
  if (el) {
    el.style.transform = 'scale(0.975)';
    setTimeout(() => { el.style.transform = ''; }, 120);
  }
  renderMainView();
}

// ─── ANALYTICS ────────────────────────────────────────────────────────────

function openAnalytics() {
  showView('analyticsView');
  aFilter = 'all';
  renderAnalytics();
}

function renderAnalytics() {
  renderAnalyticsFilter();
  renderStatCards();
  renderHeatmap();
  renderStreakRows();
}

function renderAnalyticsFilter() {
  const el = document.getElementById('analyticsFilter');
  el.innerHTML = '';

  const all = makePill('All habits', aFilter === 'all');
  all.onclick = () => { aFilter = 'all'; renderAnalytics(); };
  el.appendChild(all);

  D.habits.forEach(h => {
    const p = makePill(`${h.emoji} ${h.name}`, aFilter === h.id);
    p.onclick = () => { aFilter = h.id; renderAnalytics(); };
    el.appendChild(p);
  });
}

function makePill(label, active) {
  const b = document.createElement('button');
  b.className = 'fpill' + (active ? ' active' : '');
  b.textContent = label;
  return b;
}

function renderStatCards() {
  const el     = document.getElementById('statCards');
  el.innerHTML = '';

  const habits = aFilter === 'all' ? D.habits : D.habits.filter(h => h.id === aFilter);
  if (!habits.length) {
    el.innerHTML = '<p style="color:var(--text3);font-size:14px">No habits to show.</p>';
    return;
  }

  if (aFilter === 'all') {
    // Today completed
    const today   = todayStr();
    const comp    = D.completions[today] || {};
    const todayN  = D.habits.filter(h => comp[h.id]).length;
    // Best streak across all habits
    const bestStr = D.habits.length
      ? Math.max(...D.habits.map(h => longestStreak(D, h.id)))
      : 0;
    // Total completions all time
    const total   = D.habits.reduce((s, h) => s + totalDone(D, h.id), 0);
    // Days tracked
    const daysTracked = Math.max(1, dayDiff(D.startDate, today) + 1);

    addStatCard(el, 'Today', `${todayN}/${D.habits.length}`, 'habits done');
    addStatCard(el, 'Best streak', `${bestStr}`, 'days in a row');
    addStatCard(el, 'Total logs', `${total}`, `across ${daysTracked} days`);
  } else {
    const h = D.habits.find(hh => hh.id === aFilter);
    if (!h) { aFilter = 'all'; renderAnalytics(); return; }
    const cur  = currentStreak(D, h.id);
    const best = longestStreak(D, h.id);
    const tot  = totalDone(D, h.id);
    const rate = overallRate(D, h.id);

    addStatCard(el, 'Current streak', `${cur}`, 'days');
    addStatCard(el, 'Best streak', `${best}`, 'days');
    addStatCard(el, 'Completion', `${rate}%`, `${tot} total days`);
  }
}

function addStatCard(parent, label, value, sub) {
  const card = document.createElement('div');
  card.className = 'stat-card';
  card.innerHTML = `
    <span class="stat-card-label">${esc(label)}</span>
    <span class="stat-card-value">${esc(value)}</span>
    <span class="stat-card-sub">${esc(sub)}</span>
  `;
  parent.appendChild(card);
}

function renderHeatmap() {
  const grid = document.getElementById('heatmapGrid');
  grid.innerHTML = '';

  const today      = todayStr();
  const habits     = aFilter === 'all' ? D.habits : D.habits.filter(h => h.id === aFilter);
  const totalHabits = habits.length;

  // Build 91 days (13 weeks × 7 days)
  const days = [];
  for (let i = 90; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    days.push(`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`);
  }

  // Group into weeks
  const weeks = [];
  for (let w = 0; w < 13; w++) {
    weeks.push(days.slice(w * 7, w * 7 + 7));
  }

  weeks.forEach(week => {
    const col = document.createElement('div');
    col.className = 'hm-week';
    week.forEach(date => {
      const cell = document.createElement('div');
      cell.className = 'hm-cell';

      if (date === today) cell.classList.add('today');

      const comp = D.completions[date];
      if (comp && totalHabits > 0) {
        const done = habits.filter(h => comp[h.id]).length;
        const ratio = done / totalHabits;
        if (ratio > 0 && ratio <= 0.25) cell.classList.add('lvl-1');
        else if (ratio > 0.25 && ratio <= 0.5) cell.classList.add('lvl-2');
        else if (ratio > 0.5 && ratio < 1) cell.classList.add('lvl-3');
        else if (ratio === 1) cell.classList.add('lvl-4');
      }

      const names = (comp && habits.length)
        ? habits.filter(h => comp[h.id]).map(h => h.name).join(', ')
        : '';
      cell.title = `${formatDate(date)}${names ? ': ' + names : ''}`;
      col.appendChild(cell);
    });
    grid.appendChild(col);
  });
}

function renderStreakRows() {
  const el = document.getElementById('streakRows');
  el.innerHTML = '';

  const habits = aFilter === 'all' ? D.habits : D.habits.filter(h => h.id === aFilter);

  if (!habits.length) {
    el.innerHTML = '<p style="color:var(--text3);font-size:14px">No habits.</p>';
    return;
  }

  habits.forEach(h => {
    const row = document.createElement('div');
    row.className = 'streak-row';
    row.innerHTML = `
      <span class="sr-emoji">${h.emoji}</span>
      <span class="sr-name">${esc(h.name)}</span>
      <div class="sr-stats">
        <div class="sr-stat">
          <span class="n" style="color:${h.color}">${currentStreak(D,h.id)}</span>
          <span class="l">current</span>
        </div>
        <div class="sr-stat">
          <span class="n">${longestStreak(D,h.id)}</span>
          <span class="l">best</span>
        </div>
        <div class="sr-stat">
          <span class="n">${overallRate(D,h.id)}%</span>
          <span class="l">rate</span>
        </div>
        <div class="sr-stat">
          <span class="n">${totalDone(D,h.id)}</span>
          <span class="l">total</span>
        </div>
      </div>
    `;
    el.appendChild(row);
  });
}

// ─── SETTINGS ─────────────────────────────────────────────────────────────

function openSettings() {
  showView('settingsView');
  renderSettings();
}

function renderSettings() {
  renderModeCards();
  renderThemeCards();
  renderDurationOptions();
  renderStartDate();
  renderHabitManager();
  renderEmojiGrid();
  renderColorRow();
}

function renderModeCards() {
  document.querySelectorAll('.mode-card').forEach(card => {
    card.classList.toggle('active', card.dataset.mode === D.minimalism);
  });
}

function renderThemeCards() {
  document.querySelectorAll('.theme-card').forEach(card => {
    card.classList.toggle('active', card.dataset.theme === D.theme);
  });
}


function renderDurationOptions() {
  const presets = [30, 60, 100, 180, 365, 500, 1000];
  document.querySelectorAll('.dur-btn').forEach(btn => {
    btn.classList.toggle('active', parseInt(btn.dataset.days) === D.maxDays);
  });
  document.getElementById('currentDuration').textContent =
    `Currently set to ${D.maxDays} days.`;
}

function renderStartDate() {
  document.getElementById('startDateInput').value = D.startDate;
  document.getElementById('currentStartDate').textContent =
    `Start date: ${formatDate(D.startDate)}`;
}

function renderHabitManager() {
  const el = document.getElementById('habitManager');
  el.innerHTML = '';

  if (!D.habits.length) {
    el.innerHTML = '<p style="font-size:14px;color:var(--text3);padding:4px 0 12px">No habits added yet.</p>';
    return;
  }

  D.habits.forEach(h => {
    const row = document.createElement('div');
    row.className = 'mgr-row';
    row.innerHTML = `
      <div class="mgr-dot" style="background:${h.color}"></div>
      <span class="mgr-emoji">${h.emoji}</span>
      <span class="mgr-name">${esc(h.name)}</span>
      <button class="del-btn" aria-label="Remove ${esc(h.name)}">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="1.8" stroke-linecap="round">
          <path d="M3 6h18M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2"/>
        </svg>
      </button>
    `;
    row.querySelector('.del-btn').onclick = () => removeHabit(h.id);
    el.appendChild(row);
  });
}

function renderEmojiGrid() {
  const el = document.getElementById('emojiGrid');
  el.innerHTML = '';
  EMOJIS.forEach(e => {
    const b = document.createElement('button');
    b.className = 'ep-btn' + (e === selEmoji ? ' sel' : '');
    b.textContent = e;
    b.setAttribute('aria-label', e);
    b.onclick = () => { selEmoji = e; renderEmojiGrid(); };
    el.appendChild(b);
  });
}

function renderColorRow() {
  const el = document.getElementById('colorRow');
  el.innerHTML = '';
  COLORS.forEach(c => {
    const sw = document.createElement('div');
    sw.className = 'cp-swatch' + (c === selColor ? ' sel' : '');
    sw.style.background = c;
    sw.setAttribute('role', 'button');
    sw.setAttribute('aria-label', `Color ${c}`);
    sw.onclick = () => { selColor = c; renderColorRow(); };
    el.appendChild(sw);
  });
}

async function addHabit() {
  const input = document.getElementById('newHabitInput');
  const name  = input.value.trim();
  if (!name) { input.focus(); return; }

  D.habits.push({
    id:        uid(),
    name,
    emoji:     selEmoji,
    color:     selColor,
    createdAt: todayStr()
  });

  await saveData(D);
  input.value = '';
  renderHabitManager();
}

async function removeHabit(hid) {
  const h = D.habits.find(h => h.id === hid);
  if (!confirm(`Remove "${h?.name}"? Your history for this habit will be kept.`)) return;
  D.habits = D.habits.filter(h => h.id !== hid);
  await saveData(D);
  renderHabitManager();
}

// ─── NAVIGATION ───────────────────────────────────────────────────────────

function showView(id) {
  document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
  window.scrollTo(0, 0);
}

// ─── BIND ─────────────────────────────────────────────────────────────────

function bindAll() {
  // Nav
  document.getElementById('analyticsBtn').onclick = openAnalytics;
  document.getElementById('settingsBtn').onclick  = openSettings;
  document.getElementById('emptySettingsBtn').onclick = openSettings;

  document.getElementById('backFromAnalytics').onclick = () => {
    showView('mainView');
    renderMainView();
  };
  document.getElementById('backFromSettings').onclick = () => {
    showView('mainView');
    applyTheme();
    applyMinimalism();
    renderMainView();
  };

  // Theme cards
  document.querySelectorAll('.theme-card').forEach(card => {
    card.onclick = async () => {
      D.theme = card.dataset.theme;
      await saveData(D);
      applyTheme();
      renderThemeCards();
    };
  });

  // Mode cards
  document.querySelectorAll('.mode-card').forEach(card => {
    card.onclick = async () => {
      D.minimalism = card.dataset.mode;
      await saveData(D);
      renderModeCards();
    };
  });

  // Duration presets
  document.querySelectorAll('.dur-btn').forEach(btn => {
    btn.onclick = async () => {
      D.maxDays = parseInt(btn.dataset.days);
      await saveData(D);
      renderDurationOptions();
    };
  });

  // Custom duration
  document.getElementById('setCustomDays').onclick = async () => {
    const val = parseInt(document.getElementById('customDaysInput').value);
    if (!val || val < 1 || val > 9999) return;
    D.maxDays = val;
    await saveData(D);
    document.getElementById('customDaysInput').value = '';
    renderDurationOptions();
  };
  document.getElementById('customDaysInput').onkeydown = e => {
    if (e.key === 'Enter') document.getElementById('setCustomDays').click();
  };

  // Start date
  document.getElementById('setStartDate').onclick = async () => {
    const val = document.getElementById('startDateInput').value;
    if (!val) return;
    D.startDate = val;
    await saveData(D);
    renderStartDate();
  };

  // Add habit
  document.getElementById('addHabitBtn').onclick = addHabit;
  document.getElementById('newHabitInput').onkeydown = e => {
    if (e.key === 'Enter') addHabit();
  };

  // Reset
  document.getElementById('resetBtn').onclick = async () => {
    if (!confirm('This will permanently delete all habits, history, and settings. Are you sure?')) return;
    await chrome.storage.local.remove(STORAGE_KEY);
    D = defaultData();
    await saveData(D);
    showView('mainView');
    applyTheme();
    applyMinimalism();
    renderMainView();
  };
}

// ─── BOOT ─────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', init);

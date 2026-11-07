// GMAT mock emails, sent through Resend from pratik@spanishpropertyinsights.com.
//  POST {type:'report', attempt_id, subject, html}  -> the analysis of a finished test (sent once per test)
//  GET  (Vercel cron, Mon / Wed / Sat)               -> 6:00 am IST reminder to sit a Quant test that day
// Env: RESEND_API_KEY (or GMAT_RESEND_KEY). Optional: CRON_SECRET.

const FROM = 'Pratik Renuse <pratik@spanishpropertyinsights.com>';
const TO = ['sidhant@sidhantrenuse.com'];
const CC = ['pratik.y.renuse@gmail.com'];
const REPLY_TO = 'pratik.y.renuse@gmail.com';
const SITE = 'https://pratikrenuse.com/gmat-test';
const EXAM = new Date('2026-12-20T09:00:00+05:30');
// The GMAT results database. The anon key is public by design (the test page uses it too).
const SB_URL = 'https://spymrfgkwfjrcealulfh.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNweW1yZmdrd2ZqcmNlYWx1bGZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2MTc3MjcsImV4cCI6MjA5NTE5MzcyN30.A9-zKEEJJPgXRRPsi4cg3Dn4b7L7bn_OmH9BoPlu7Oo';

const key = () => process.env.GMAT_RESEND_KEY || process.env.RESEND_API_KEY;
const rpc = async (fn, body) => {
  const r = await fetch(`${SB_URL}/rest/v1/rpc/${fn}`, { method: 'POST', headers: { apikey: SB_KEY, Authorization: 'Bearer ' + SB_KEY, 'Content-Type': 'application/json' }, body: JSON.stringify(body || {}) });
  if (!r.ok) throw new Error(fn + ' ' + r.status + ' ' + (await r.text()));
  return r.json();
};
async function send({ subject, html, scheduled_at }) {
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + key() },
    body: JSON.stringify(Object.assign({ from: FROM, to: TO, cc: CC, reply_to: REPLY_TO, subject, html }, scheduled_at ? { scheduled_at } : {}))
  });
  const out = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error('resend ' + r.status + ' ' + JSON.stringify(out));
  return out;
}
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

async function report(req, res) {
  const b = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  if (!/^[0-9a-f-]{36}$/i.test(b.attempt_id || '') || !b.subject || !b.html) return res.status(400).json({ error: 'bad request' });
  if (String(b.html).length > 200000) return res.status(413).json({ error: 'too large' });
  // Only a real test in the results database, and only once.
  const claim = await rpc('gmat_claim_report', { p_id: b.attempt_id });
  if (claim === 'sent') return res.status(409).json({ status: 'already sent' });
  if (claim !== 'ok') return res.status(404).json({ status: claim });
  try {
    const out = await send({ subject: String(b.subject).slice(0, 200), html: String(b.html).replace(/<script[\s\S]*?<\/script>/gi, '') });
    return res.status(200).json({ status: 'sent', id: out.id });
  } catch (e) {
    await rpc('gmat_release_report', { p_id: b.attempt_id }).catch(() => {});
    return res.status(502).json({ error: String(e.message || e) });
  }
}

async function reminder(req, res) {
  const secret = process.env.CRON_SECRET;
  const fromCron = /^vercel-cron\//.test(req.headers['user-agent'] || '');
  if (secret ? req.headers.authorization !== `Bearer ${secret}` : !fromCron) return res.status(401).json({ error: 'unauthorized' });
  // The cron runs in the early hours of IST; the email is scheduled for 6:00 am IST (00:30 UTC) that day.
  const now = new Date(), ist = new Date(now.getTime() + 330 * 60000);
  const target = new Date(Date.UTC(ist.getUTCFullYear(), ist.getUTCMonth(), ist.getUTCDate(), 0, 30));
  const istDay = new Date(target.getTime() + 330 * 60000);
  const dayName = istDay.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' });
  const days = Math.max(0, Math.ceil((EXAM - target) / 864e5));
  if (days <= 0 && req.query.force !== '1') return res.status(200).json({ status: 'exam date passed, no reminder' });

  let scores = [], topics = [];
  try { scores = await rpc('gmat_score_history'); } catch (e) {}
  try { topics = await rpc('gmat_topic_history', { p_candidate: 'pratik' }); } catch (e) {}
  const q = scores.filter(a => a.quant_score != null);
  const last = q[q.length - 1], prev = q[q.length - 2];
  const trend = q.slice(-5).map(a => a.quant_score).join(' → ');
  const agg = {};
  topics.filter(t => t.section === 'Quant').forEach(t => { const o = (agg[t.topic] = agg[t.topic] || { n: 0, c: 0 }); o.n += t.n; o.c += t.correct; });
  const weak = Object.entries(agg).filter(([, o]) => o.n >= 3 && o.c / o.n < 0.65).sort((a, b) => a[1].c / a[1].n - b[1].c / b[1].n).slice(0, 3);

  const lines = [];
  if (last) lines.push(`Last Quant score: <b>${last.quant_score} / 90</b>${prev ? ` (${last.quant_score - prev.quant_score >= 0 ? '+' : ''}${last.quant_score - prev.quant_score} on the one before)` : ''}. Recent Quant scores: ${trend}.`);
  else lines.push('No Quant score on record yet. Today is a good day to set the first one.');
  if (weak.length) lines.push(`Weakest Quant topics across all tests: ${weak.map(([t, o]) => `${esc(t)} (${o.c} of ${o.n} right)`).join(', ')}.`);
  const subject = `Quant test today, ${dayName}: ${days} day${days === 1 ? '' : 's'} to the GMAT`;
  const html = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#010221;max-width:560px">
  <p>Good morning,</p>
  <p>Today is a Quant test day. 21 questions, 45 minutes, no calculator. ${days} day${days === 1 ? '' : 's'} are left until the exam on 20 December.</p>
  ${lines.map(l => `<p>${l}</p>`).join('')}
  <p><a href="${SITE}" style="display:inline-block;background:#1A1512;color:#ffffff;padding:10px 18px;text-decoration:none;border-radius:4px">Start today's Quant test</a></p>
  <p style="color:#5a5f78;font-size:12.5px">The analysis arrives by email as soon as the test is finished.</p>
</div>`;
  const scheduled_at = target > now ? target.toISOString() : undefined;
  const out = await send({ subject, html, scheduled_at });
  return res.status(200).json({ status: scheduled_at ? 'scheduled' : 'sent', at: scheduled_at || now.toISOString(), id: out.id });
}

module.exports = async (req, res) => {
  if (!key()) return res.status(500).json({ error: 'RESEND_API_KEY is not set' });
  try {
    if (req.method === 'POST') return await report(req, res);
    if (req.method === 'GET') return await reminder(req, res);
    return res.status(405).json({ error: 'method not allowed' });
  } catch (e) {
    return res.status(500).json({ error: String(e.message || e) });
  }
};

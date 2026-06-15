const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;

// Where lead notifications are sent. Reuses the same Resend key as claude-brief.js.
const LEAD_TO   = process.env.LEAD_TO || 'pratik.y.renuse@gmail.com';
const LEAD_FROM = process.env.LEAD_FROM || 'Site Leads <onboarding@resend.dev>';

// Fire off an email when a new lead lands. Never throws — a mail failure must
// not break the form submission for the visitor.
async function sendLeadEmail({ email, name, source }) {
  if (!process.env.RESEND_API_KEY) return 'skipped (no RESEND_API_KEY)';

  // The contact form packs "contact:<topic> | <message>" into `source`.
  let topic = '', message = '', rawSource = source || '';
  const m = /^contact:([^|]*)\|?([\s\S]*)$/.exec(rawSource);
  if (m) { topic = m[1].trim(); message = m[2].trim(); }

  const esc = s => String(s || '').replace(/[<>&]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]));
  const html = `
    <div style="font-family:-apple-system,Segoe UI,sans-serif;max-width:560px;margin:0 auto;color:#1a1512;">
      <h2 style="margin:0 0 16px;">New lead from your site</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:6px 0;color:#777;width:90px;">Name</td><td style="padding:6px 0;">${esc(name) || '—'}</td></tr>
        <tr><td style="padding:6px 0;color:#777;">Email</td><td style="padding:6px 0;"><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
        ${topic ? `<tr><td style="padding:6px 0;color:#777;">Topic</td><td style="padding:6px 0;">${esc(topic)}</td></tr>` : ''}
        ${message ? `<tr><td style="padding:6px 0;color:#777;vertical-align:top;">Message</td><td style="padding:6px 0;white-space:pre-wrap;">${esc(message)}</td></tr>` : ''}
        ${!topic && !message && rawSource ? `<tr><td style="padding:6px 0;color:#777;">Source</td><td style="padding:6px 0;">${esc(rawSource)}</td></tr>` : ''}
      </table>
    </div>`;

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + process.env.RESEND_API_KEY
      },
      body: JSON.stringify({
        from: LEAD_FROM,
        to: [LEAD_TO],
        reply_to: email,
        subject: 'New lead: ' + (name || email) + (topic ? ' · ' + topic : ''),
        html
      })
    });
    if (!r.ok) return 'failed: ' + (await r.text()).slice(0, 200);
    return 'sent';
  } catch (e) {
    return 'error: ' + e.message;
  }
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }

  const { email, name, source } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email required' });
  }

  try {
    const response = await fetch(SUPABASE_URL + '/rest/v1/subscribers', {
      method: 'POST',
      headers: {
        'apikey':        SUPABASE_KEY,
        'Authorization': 'Bearer ' + SUPABASE_KEY,
        'Content-Type':  'application/json',
        'Prefer':        'return=minimal'
      },
      body: JSON.stringify({ email, name: name || null, source: source || null })
    });

    if (response.status === 201 || response.status === 409) {
      // Only notify for genuinely new leads, not repeat submissions (409 = duplicate).
      if (response.status === 201) {
        await sendLeadEmail({ email, name, source });
      }
      return res.status(200).json({ ok: true });
    }

    const err = await response.text();
    return res.status(500).json({ error: err });

  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

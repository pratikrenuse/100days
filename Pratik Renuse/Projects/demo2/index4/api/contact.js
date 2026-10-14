/* =====================================================================
   Vercel Serverless Function — POST /api/contact
   Receives the contact form and stores it in Supabase.

   Secrets are read from Vercel Environment Variables (NEVER hardcoded,
   NEVER sent to the browser):
     - SUPABASE_URL                 e.g. https://xxxxxxxx.supabase.co
     - SUPABASE_SERVICE_ROLE_KEY    the "service_role" secret key

   No npm packages needed — it calls the Supabase REST API with fetch
   (Node 18+ on Vercel has fetch built in), so there is no build step.
   ===================================================================== */

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!SUPABASE_URL || !SERVICE_KEY) {
    console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars.');
    return res.status(500).json({ error: 'The form is not configured yet.' });
  }

  // Vercel parses JSON bodies automatically, but be defensive.
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }
  body = body || {};

  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim();
  const message = String(body.message || '').trim();
  const honeypot = String(body.company || '').trim();

  // Bot caught by the honeypot — pretend success, save nothing.
  if (honeypot) return res.status(200).json({ ok: true });

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please add your name, email, and a message.' });
  }
  if (name.length > 100 || email.length > 150 || message.length > 2000) {
    return res.status(400).json({ error: 'That message is a little too long.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'That email doesn’t look quite right.' });
  }

  try {
    const r = await fetch(SUPABASE_URL.replace(/\/+$/, '') + '/rest/v1/contacts', {
      method: 'POST',
      headers: {
        'apikey': SERVICE_KEY,
        'Authorization': 'Bearer ' + SERVICE_KEY,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify([{ name: name, email: email, message: message }])
    });

    if (!r.ok) {
      const detail = await r.text();
      console.error('Supabase insert failed:', r.status, detail);
      return res.status(502).json({ error: 'Could not save your message — please email me directly.' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Unexpected error saving contact:', err);
    return res.status(500).json({ error: 'Unexpected error — please email me directly.' });
  }
};

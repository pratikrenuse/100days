// =============================================================================
// Vercel Serverless Function  ·  POST /api/contact
// -----------------------------------------------------------------------------
// Saves a form submission to Supabase. ALL configuration is read from
// environment variables — NOTHING is hardcoded here. Set these in Vercel:
//   Project → Settings → Environment Variables
//
//   SUPABASE_URL                 e.g. https://xxxxxxxx.supabase.co   (required)
//   SUPABASE_SERVICE_ROLE_KEY    your Supabase service_role key      (required)
//        (alternatively the function will fall back to SUPABASE_KEY or
//         SUPABASE_ANON_KEY if you prefer to use the anon key + an RLS
//         insert policy)
//   SUPABASE_TABLE               table name to insert into           (optional,
//                                defaults to "submissions")
//
// Suggested table (run in the Supabase SQL editor):
//   create table if not exists submissions (
//     id          bigint generated always as identity primary key,
//     created_at  timestamptz not null default now(),
//     form        text,
//     name        text,
//     email       text,
//     message     text,
//     page        text
//   );
//
// Reusing this endpoint for FUTURE forms: just send a different "form" value
// from the client (e.g. "newsletter", "demo-request"). Every submission lands
// in the same table, tagged by its "form" column — no code changes needed.
// =============================================================================

function readBody(req) {
  if (req.body && typeof req.body === 'object') return Promise.resolve(req.body);
  if (typeof req.body === 'string') {
    try { return Promise.resolve(JSON.parse(req.body)); } catch (e) { return Promise.resolve({}); }
  }
  return new Promise(function (resolve) {
    var raw = '';
    req.on('data', function (c) { raw += c; });
    req.on('end', function () { try { resolve(JSON.parse(raw || '{}')); } catch (e) { resolve({}); } });
    req.on('error', function () { resolve({}); });
  });
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  var SUPABASE_URL = process.env.SUPABASE_URL;
  var SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
                  || process.env.SUPABASE_KEY
                  || process.env.SUPABASE_ANON_KEY;
  var TABLE = process.env.SUPABASE_TABLE || 'submissions';

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return res.status(500).json({ error: 'Server is not configured yet. Missing Supabase environment variables.' });
  }

  var body = await readBody(req);

  // Honeypot: silently accept (and drop) anything that fills the hidden field.
  if (body.company) return res.status(200).json({ ok: true });

  var name = (body.name || '').toString().trim();
  var email = (body.email || '').toString().trim();
  var message = (body.message || '').toString().trim();
  var form = (body.form || 'contact').toString().trim().slice(0, 64);
  var page = (body.page || '').toString().trim().slice(0, 200);

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are all required.' });
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }
  if (message.length > 5000) {
    return res.status(400).json({ error: 'That message is a little too long.' });
  }

  var row = {
    name: name.slice(0, 120),
    email: email.slice(0, 160),
    message: message,
    form: form,
    page: page
  };

  try {
    var resp = await fetch(SUPABASE_URL.replace(/\/$/, '') + '/rest/v1/' + encodeURIComponent(TABLE), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': 'Bearer ' + SUPABASE_KEY,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(row)
    });

    if (!resp.ok) {
      var detail = '';
      try { detail = (await resp.text()).slice(0, 300); } catch (e) {}
      return res.status(502).json({ error: 'Could not save your message. Please try again later.', detail: detail });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: 'Unexpected error saving your message.' });
  }
};

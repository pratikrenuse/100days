// /api/parse.js — turns a spoken sentence + current task list into structured actions
// Lives in the repo root /api/ folder (Vercel auto-discovers only there).

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { transcript, tasks, projects } = req.body || {};
  if (!transcript || typeof transcript !== 'string') {
    return res.status(400).json({ error: 'Missing transcript' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Server not configured' });
  }

  // Give Claude the current state so it can reference real task IDs.
  const taskList = (tasks || [])
    .map(t => `- id:${t.id} | project:"${t.project || 'Inbox'}" | done:${t.done} | "${t.text}"`)
    .join('\n') || '(no tasks yet)';

  const projectList = (projects || []).join(', ') || '(none yet)';

  const system = `You convert a person's spoken instruction into a list of edit actions on their to-do list. You ONLY output JSON. No prose, no markdown, no backticks.

Output schema — an array of action objects. Valid actions:
{"action":"add","text":"<task text>","project":"<project name>"}
{"action":"complete","id":<existing id>}
{"action":"uncomplete","id":<existing id>}
{"action":"delete","id":<existing id>}
{"action":"move","id":<existing id>,"project":"<project name>"}
{"action":"edit","id":<existing id>,"text":"<new text>"}
{"action":"rename_project","from":"<old>","to":"<new>"}

Rules:
- Match tasks the person refers to against the existing list by meaning, and use that task's real id.
- If they describe a new task with no clear project, set project to "Inbox".
- If they mention a project that does not exist yet, just use that name in add/move; it will be created automatically.
- A single sentence can produce multiple actions. Return them in the order spoken.
- If nothing actionable is found, return [].
- Never invent ids that are not in the list.`;

  const user = `CURRENT PROJECTS: ${projectList}

CURRENT TASKS:
${taskList}

SPOKEN INSTRUCTION:
"${transcript}"

Return only the JSON array of actions.`;

  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1500,
        system,
        messages: [{ role: 'user', content: user }]
      })
    });

    const data = await r.json();
    if (!r.ok) {
      return res.status(502).json({ error: 'Model call failed', detail: data });
    }

    const text = (data.content || [])
      .filter(b => b.type === 'text')
      .map(b => b.text)
      .join('')
      .replace(/```json|```/g, '')
      .trim();

    let actions;
    try {
      actions = JSON.parse(text);
    } catch {
      return res.status(502).json({ error: 'Could not parse model output', raw: text });
    }

    if (!Array.isArray(actions)) actions = [];
    return res.status(200).json({ actions });
  } catch (err) {
    return res.status(500).json({ error: 'Request failed', detail: String(err) });
  }
}

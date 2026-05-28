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
    .map(t => `- id:${t.id} | project:"${t.project || 'Inbox'}" | done:${t.done} | priority:${t.priority || 'normal'} | due:${t.due || 'none'} | "${t.text}"`)
    .join('\n') || '(no tasks yet)';

  const projectList = (projects || []).join(', ') || '(none yet)';

  const today = new Date().toISOString().slice(0, 10);
  const dayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  const system = `You are the brain of a personal to-do app. You convert one written instruction into a list of edit actions on the user's task list. You ONLY output JSON: a single array. No prose, no markdown, no backticks, no explanation.

Today is ${today} (${dayName}).

Output schema — an array of action objects. Valid actions:
{"action":"add","text":"<task text>","project":"<project>","priority":"high|normal|low","due":"YYYY-MM-DD or null"}
{"action":"complete","id":<id>}
{"action":"uncomplete","id":<id>}
{"action":"delete","id":<id>}
{"action":"move","id":<id>,"project":"<project>"}
{"action":"edit","id":<id>,"text":"<new text>"}
{"action":"set_priority","id":<id>,"priority":"high|normal|low"}
{"action":"set_due","id":<id>,"due":"YYYY-MM-DD or null"}
{"action":"rename_project","from":"<old>","to":"<new>"}
{"action":"clear_done","project":"<project name or ALL>"}

Interpretation rules:
- Match vague references ("the copy task", "that contrast thing") to existing tasks by meaning and use the real id.
- Resolve relative dates against today. "tomorrow", "by Friday", "next Monday", "in 3 days", "end of week" all become a concrete YYYY-MM-DD. If no date is mentioned, due is null.
- Infer priority from language. "urgent", "ASAP", "critical", "important", "must" => high. "whenever", "someday", "low priority", "nice to have" => low. Otherwise normal.
- For new tasks: keep the text short and action-first (verb + object). Strip filler like "I need to" or "remind me to". "remind me to email the client tomorrow" => text "Email the client", due tomorrow's date.
- If no clear project, use "Inbox". A project named in the instruction that does not exist yet is fine; it gets created.
- "clear the done ones" or "clean up finished tasks" => clear_done with the relevant project, or "ALL" if not scoped.
- One instruction can yield several actions. Return them in a sensible order: completions and edits before adds is fine.
- Never invent ids not in the list. If nothing is actionable, return [].`;

  const user = `CURRENT PROJECTS: ${projectList}

CURRENT TASKS:
${taskList}

INSTRUCTION:
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
        max_tokens: 2000,
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

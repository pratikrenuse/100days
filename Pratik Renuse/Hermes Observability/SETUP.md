# Observability for Slack Hermes (Supabase version)

What this gets you, mapped to the buildathon rubric levels:
- Logging every step to Supabase = L2
- Asking Hermes on Slack "show me today's run" and getting the step list from the DB = L3
- parent_step tree + tokens and cost per step + "which agent spent most" = L4
- Failure and cost-spike alerts to Slack + "compare Monday vs Tuesday" = the L5 pieces

## Step 1. Create the tables (2 min)
Open Supabase → SQL editor → paste and run `schema.sql`. Done once.

## Step 2. Put the logger on the server (5 min)
Copy `run_logger.py` next to the daily brief pipeline code on the Hetzner box.
Make sure these env vars exist there: `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`,
and optionally `SLACK_WEBHOOK_URL` (any incoming webhook to your alerts channel).

## Step 3. Hook it into the pipeline (10 min)
Six lines, roughly. At the top of the daily run:

    from run_logger import RunLogger
    log = RunLogger(agent="daily-brief", trigger="cron")

Around each source fetch:

    sid = log.step("researcher", "fetch_source", input=source_url,
                   output=f"{len(items)} items", status="success")
    # on exception: log.step(..., status="failed", output=str(e))

After the brief is written:

    log.step("writer", "write_brief", input=f"{n_sources} sources",
             output=brief_text[:500], tokens=usage.total_tokens, cost=usage_cost)

After posting to Slack:

    log.step("poster", "post_slack", output="posted to #daily-brief")
    log.finish(status="success", summary=f"Brief posted, {ok}/{total} sources")

Wrap the whole run in try/except and call `log.finish(status="failed", error=str(e))`
in the except. That plus the webhook means you get pinged at 7:03, not at 9:00.

## Step 4. Teach Hermes to answer from the log (paste into its system prompt or a skill)

    When Pratik asks about a run ("show me today's run", "why was the brief
    thin on Tuesday", "what did each agent do"), do NOT answer from memory.
    Query Supabase:
      - runs:  GET /rest/v1/agent_runs?agent=eq.daily-brief&order=started_at.desc&limit=7
      - steps: GET /rest/v1/agent_steps?run_id=eq.<id>&order=seq.asc
    Reply with a numbered step list: time, agent, action, status, tokens, cost.
    Flag any step with status=failed first.
    For "compare run A and B": fetch both step lists, align by action, and
    report where they diverge (missing steps, failures, cost or output deltas).
    For "which agent cost most this week": aggregate agent_steps.cost_usd
    grouped by agent for the last 7 days and answer with numbers.

## The test that proves it works
Tomorrow-morning drill, same one a mentor would run: after the 7 AM brief,
ask Hermes on Slack "walk me through this morning's run." If it replies with
the numbered steps from Supabase, including any failed source, you are at L3+
on your own system. Then kill one source URL on purpose and confirm the
:warning: alert lands in Slack before the brief does.

"""Drop-in run logger for the Hermes daily brief pipeline.
Env vars required on the server: SUPABASE_URL, SUPABASE_SERVICE_KEY.
Optional: SLACK_WEBHOOK_URL for instant failure/cost alerts (the L5 piece).

Usage inside the pipeline:

    log = RunLogger(agent="daily-brief", trigger="cron")
    sid = log.step("researcher", "fetch_source", input=url, output=f"{n} items", tokens=t, cost=c)
    ...
    log.finish(status="success", summary="Brief posted, 9/9 sources")
"""

import os
import datetime
import requests

SUPA_URL = os.environ["SUPABASE_URL"].rstrip("/")
SUPA_KEY = os.environ["SUPABASE_SERVICE_KEY"]
SLACK_WEBHOOK = os.environ.get("SLACK_WEBHOOK_URL", "")

HEADERS = {
    "apikey": SUPA_KEY,
    "Authorization": f"Bearer {SUPA_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=representation",
}


def _alert(text):
    if SLACK_WEBHOOK:
        try:
            requests.post(SLACK_WEBHOOK, json={"text": text}, timeout=10)
        except Exception:
            pass  # alerting must never break the pipeline


class RunLogger:
    def __init__(self, agent="daily-brief", trigger="cron"):
        r = requests.post(
            f"{SUPA_URL}/rest/v1/agent_runs",
            headers=HEADERS,
            json={"agent": agent, "trigger": trigger},
            timeout=15,
        )
        r.raise_for_status()
        self.run_id = r.json()[0]["id"]
        self.agent = agent
        self.seq = 0
        self.tokens = 0
        self.cost = 0.0

    def step(self, agent, action, input="", output="", status="success",
             tokens=0, cost=0.0, duration_ms=None, parent=None):
        """Log one step. Returns the step id (pass as parent= for sub-steps -> L4 tree)."""
        self.seq += 1
        self.tokens += int(tokens)
        self.cost += float(cost)
        r = requests.post(
            f"{SUPA_URL}/rest/v1/agent_steps",
            headers=HEADERS,
            json={
                "run_id": self.run_id, "seq": self.seq, "parent_step": parent,
                "agent": agent, "action": action,
                "input": str(input)[:2000], "output": str(output)[:2000],
                "status": status, "tokens": int(tokens),
                "cost_usd": round(float(cost), 4), "duration_ms": duration_ms,
            },
            timeout=15,
        )
        r.raise_for_status()
        if status == "failed":
            _alert(f":warning: {self.agent} run {self.run_id[:8]}: step {self.seq} "
                   f"({agent} / {action}) FAILED.\ninput: {str(input)[:200]}")
        return r.json()[0]["id"]

    def finish(self, status="success", summary="", error=""):
        requests.patch(
            f"{SUPA_URL}/rest/v1/agent_runs?id=eq.{self.run_id}",
            headers=HEADERS,
            json={
                "status": status,
                "ended_at": datetime.datetime.now(datetime.timezone.utc).isoformat(),
                "summary": summary, "error": error,
                "total_tokens": self.tokens,
                "total_cost_usd": round(self.cost, 4),
            },
            timeout=15,
        )
        if status == "failed":
            _alert(f":rotating_light: {self.agent} run {self.run_id[:8]} FAILED: {error[:300]}")
        else:
            avg = self._avg_cost_7d()
            if avg and self.cost > 3 * avg:
                _alert(f":money_with_wings: {self.agent} run {self.run_id[:8]} cost "
                       f"${self.cost:.2f}, over 3x the 7-day average of ${avg:.2f}.")

    def _avg_cost_7d(self):
        since = (datetime.datetime.now(datetime.timezone.utc)
                 - datetime.timedelta(days=7)).isoformat()
        try:
            r = requests.get(
                f"{SUPA_URL}/rest/v1/agent_runs"
                f"?agent=eq.{self.agent}&status=eq.success&started_at=gte.{since}"
                f"&select=total_cost_usd",
                headers=HEADERS, timeout=15,
            )
            costs = [float(x["total_cost_usd"] or 0) for x in r.json()]
            costs = [c for c in costs if c > 0]
            return sum(costs) / len(costs) if costs else None
        except Exception:
            return None

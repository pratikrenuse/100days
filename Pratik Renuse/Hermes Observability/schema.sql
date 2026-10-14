-- Observability for Slack Hermes daily brief. Run once in Supabase SQL editor.
-- Two tables: one row per run, one row per step. parent_step gives the L4 tree.

create table if not exists agent_runs (
  id uuid primary key default gen_random_uuid(),
  agent text not null default 'daily-brief',
  trigger text default 'cron',              -- cron | slack | manual
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  status text not null default 'running',   -- running | success | failed
  total_tokens int default 0,
  total_cost_usd numeric(10,4) default 0,
  summary text,
  error text
);

create table if not exists agent_steps (
  id bigint generated always as identity primary key,
  run_id uuid not null references agent_runs(id) on delete cascade,
  parent_step bigint references agent_steps(id),
  seq int not null,
  agent text not null,        -- researcher | writer | poster | manager
  action text not null,       -- fetch_source | write_brief | post_slack ...
  input text,
  output text,
  status text not null default 'success',  -- success | failed
  tokens int default 0,
  cost_usd numeric(10,4) default 0,
  duration_ms int,
  created_at timestamptz not null default now()
);

create index if not exists idx_steps_run on agent_steps(run_id, seq);
create index if not exists idx_runs_agent_time on agent_runs(agent, started_at desc);

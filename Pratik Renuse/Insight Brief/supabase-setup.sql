-- Daily Insight Brief: remembers every item already considered,
-- so each morning's briefing only contains new material.
-- Run once in Supabase: SQL Editor -> New query -> paste -> Run.

create table if not exists brief_seen (
  id bigserial primary key,
  url text unique not null,
  created_at timestamptz default now()
);

create index if not exists brief_seen_created_at_idx on brief_seen (created_at);

-- Separate memory for the Claude edition, so both versions get the full
-- daily haul and you can compare their judgment head to head.
create table if not exists brief_seen_claude (
  id bigserial primary key,
  url text unique not null,
  created_at timestamptz default now()
);

create index if not exists brief_seen_claude_created_at_idx on brief_seen_claude (created_at);

-- Optional housekeeping: the function only looks back 10 days,
-- so you can periodically clear older rows if you ever want to:
-- delete from brief_seen where created_at < now() - interval '30 days';

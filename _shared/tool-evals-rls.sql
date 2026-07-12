-- One-time setup for the shared L5 auto-eval dataset (all 100days tools).
-- Run in Supabase → SQL Editor.

create table if not exists public.tool_evals (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  tool text not null,                 -- 'rage-meter' | 'dating-profile' | 'cold-email' | 'product-page' | 'graveyard' | ...
  input text,
  output jsonb,
  judge_groundedness int,             -- Claude judge, 1-10
  judge_usefulness int,
  judge_craft int,
  judge_overall numeric,
  judge_notes text,
  human_label text                    -- fill in when reviewing: 'good' | 'bad' | note
);

alter table public.tool_evals enable row level security;

drop policy if exists tool_evals_anon_insert on public.tool_evals;
create policy tool_evals_anon_insert
  on public.tool_evals for insert
  to anon
  with check (true);

-- Quality time series per tool:
-- select tool, date_trunc('day', created_at) d, count(*),
--        round(avg(judge_overall),2) quality
-- from tool_evals group by 1,2 order by 2 desc, 1;

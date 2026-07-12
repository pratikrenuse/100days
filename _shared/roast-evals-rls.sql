-- One-time setup for the roast L5 auto-eval dataset.
-- Run in Supabase → SQL Editor.

create table if not exists public.roast_evals (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  url text,
  overall_score numeric,          -- score the roast gave the page
  schema_ok boolean,              -- deterministic output-shape check
  judge_specificity int,          -- Claude-judge, 1-10
  judge_actionability int,        -- Claude-judge, 1-10
  judge_tone int,                 -- Claude-judge, 1-10
  judge_overall numeric,          -- mean of the three
  judge_notes text,
  human_label text,               -- fill in when reviewing: 'good' | 'bad' | note
  roast jsonb                     -- full production output, becomes the dataset
);

alter table public.roast_evals enable row level security;

-- anon key may only insert (the API appends), never read/update/delete
drop policy if exists roast_evals_anon_insert on public.roast_evals;
create policy roast_evals_anon_insert
  on public.roast_evals for insert
  to anon
  with check (true);

-- Handy quality time series:
-- select date_trunc('day', created_at) d, count(*),
--        round(avg(judge_overall),2) quality,
--        round(avg(judge_specificity),2) specificity
-- from roast_evals group by 1 order by 1 desc;

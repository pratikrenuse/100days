-- Safe public lead capture: anon key can INSERT only, cannot read/update/delete.
-- Run this in Supabase → SQL Editor. Re-runnable.
--
-- Why: public tools use the ANON key (safe to ship in a serverless function).
-- RLS below lets that key insert rows but never read the table, so a leaked
-- anon key can't dump your leads. Your service_role key (used by Hermes and
-- trusted backend jobs) bypasses RLS and keeps full access.

-- 1. Turn on row-level security for the table
alter table leads enable row level security;

-- 2. Allow the anon role to INSERT only (no SELECT/UPDATE/DELETE policy = denied)
drop policy if exists "anon can insert leads" on leads;
create policy "anon can insert leads"
  on leads
  for insert
  to anon
  with check (true);

-- Note: because anon has no SELECT policy, inserts must use
--   Prefer: return=minimal
-- (do NOT use return=representation with the anon key — it would try to read
-- the row back and fail). The reusable snippet in CLAUDE.md already does this.

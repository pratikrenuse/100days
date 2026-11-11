-- Screen Time database. Already applied to Supabase project spymrfgkwfjrcealulfh (migrations screentime_init, screentime_functions, screentime_functions_2).
-- Kept here as the record. All tables have row level security on and no policies: only the edge function (service role) can read or write.

create table if not exists public.st_devices (device_id text primary key, user_id text not null default 'pratik', kind text not null check (kind in ('mac','android')), name text, app_version text, first_seen timestamptz not null default now(), last_seen timestamptz not null default now());
create table if not exists public.st_events (id bigserial primary key, user_id text not null default 'pratik', device_id text not null, device_kind text not null, client_uid text not null, start_at timestamptz not null, end_at timestamptz not null, duration_s integer not null check (duration_s >= 0), day date not null, app_id text, app_name text, browser text, domain text, url text, title text, category text, ssid text, lat double precision, lon double precision, place text, updated_at timestamptz not null default now(), unique (device_id, client_uid));
create table if not exists public.st_limits (id bigserial primary key, user_id text not null default 'pratik', target_type text not null check (target_type in ('domain','app','category')), target text not null, label text, daily_minutes integer not null check (daily_minutes > 0), enabled boolean not null default true, created_at timestamptz not null default now(), unique (user_id, target_type, target));
create table if not exists public.st_nudges (id bigserial primary key, user_id text not null default 'pratik', device_id text not null, client_uid text not null, at timestamptz not null, day date not null, target text not null, kind text not null, used_minutes integer, unique (device_id, client_uid));
create table if not exists public.st_places (id bigserial primary key, user_id text not null default 'pratik', name text not null, ssid text, lat double precision, lon double precision, radius_m integer not null default 250, created_at timestamptz not null default now());
create table if not exists public.st_categories (user_id text not null default 'pratik', key text not null, category text not null, primary key (user_id, key));
create table if not exists public.st_config (key text primary key, value text not null);
-- st_config holds sha256 hashes of the device key and dashboard password, never the plain values.
-- Functions: st_daily_totals, st_item_totals, st_hourly, st_place_totals, st_browser_totals, st_switches, st_limit_usage, st_apply_place, st_apply_category (security definer, service role only).

-- Calendar blocks copied from Google Calendar by the daily email task. tier comes from the block colour:
-- grape m1, tangerine k100, peacock/blueberry k1, tomato chill, other colours life.
create table if not exists st_calendar (
  user_id text not null, event_id text not null, start_at timestamptz not null, end_at timestamptz not null,
  title text, color_id text, tier text, all_day boolean not null default false, updated_at timestamptz not null default now(),
  primary key (user_id, event_id));
alter table st_calendar enable row level security;
create or replace function st_tier_pieces(u text, d1 date, d2 date, k1_re text, k100_re text, life_re text)
returns table(item text, item_type text, category text, device_kind text, block_tier text, hint text, seconds bigint)
language sql stable security definer set search_path to 'public' as $$
  with ev as (
    select e.id, coalesce(e.domain, e.app_name, e.app_id, 'Unknown') item,
           case when e.domain is not null then 'site' else 'app' end item_type,
           e.category, e.device_kind, e.start_at, e.end_at, e.duration_s::numeric dur,
           coalesce(e.title,'') || ' ' || coalesce(e.domain,'') || ' ' || coalesce(e.url,'') hay
    from st_events e where e.user_id = u and e.day between d1 and d2),
  cov as (
    select ev.id, c.tier, extract(epoch from least(ev.end_at, c.end_at) - greatest(ev.start_at, c.start_at)) s
    from ev join st_calendar c on c.user_id = u and not c.all_day and c.start_at < ev.end_at and c.end_at > ev.start_at),
  tot as (select id, sum(s) cs from cov group by id),
  pieces as (
    select cov.id, cov.tier, cov.s * least(1, ev.dur / nullif(t.cs, 0)) s from cov join tot t using (id) join ev using (id)
    union all
    select ev.id, null, greatest(0, ev.dur - coalesce(t.cs, 0)) from ev left join tot t using (id))
  select ev.item, ev.item_type, max(ev.category), ev.device_kind, p.tier,
         case when ev.hay ~* life_re then 'life' when ev.hay ~* k100_re then 'k100' when ev.hay ~* k1_re then 'k1' end,
         round(sum(p.s))::bigint
  from pieces p join ev using (id) where p.s > 0
  group by 1, 2, 4, 5, 6
  order by 1, 2, 4, 5 nulls first, 6 nulls first;
$$;

-- Claude's verdict on each stretch of screen time, written by the morning scheduled task.
create table if not exists st_judgements (
  user_id text not null, day date not null, start_at timestamptz not null, end_at timestamptz not null,
  minutes numeric not null, item text not null, activity text, tier text not null, created_at timestamptz not null default now(),
  primary key (user_id, day, start_at, item));
alter table st_judgements enable row level security;
-- st_blocks(u, d): merged stretches on one app or site with the window titles seen (see migration st_judgements).

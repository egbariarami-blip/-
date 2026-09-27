-- ChatGPT 2026 course: registrations + password-protected admin access.
-- Run once in the Supabase SQL editor. Replace CHANGE_ME with the admin password
-- before running, and do not commit the real password back to the repo.

create extension if not exists pgcrypto with schema extensions;

create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null check (char_length(full_name) between 2 and 120),
  phone text not null check (char_length(phone) between 7 and 30),
  level text check (char_length(level) <= 60),
  school text check (char_length(school) <= 160),
  notes text check (char_length(notes) <= 1000),
  status text not null default 'new' check (status in ('new','contacted','paid','cancelled'))
);

alter table public.registrations enable row level security;

-- Visitors may only add a new registration. Nobody can read rows through the API.
drop policy if exists "public can register" on public.registrations;
create policy "public can register" on public.registrations
  for insert to anon, authenticated
  with check (status = 'new');

create table if not exists public.admin_secret (
  id int primary key default 1 check (id = 1),
  pass_hash text not null
);
alter table public.admin_secret enable row level security;  -- no policies: invisible to the API

insert into public.admin_secret (id, pass_hash)
values (1, extensions.crypt('CHANGE_ME', extensions.gen_salt('bf')))
on conflict (id) do update set pass_hash = excluded.pass_hash;

create or replace function public.admin_check(p_password text)
returns void language plpgsql security definer set search_path = public, extensions as $$
begin
  if not exists (select 1 from admin_secret where pass_hash = crypt(p_password, pass_hash)) then
    raise exception 'unauthorized' using errcode = '28000';
  end if;
end $$;

create or replace function public.admin_list_registrations(p_password text)
returns setof public.registrations language plpgsql security definer set search_path = public, extensions as $$
begin
  perform admin_check(p_password);
  return query select * from registrations order by created_at desc;
end $$;

create or replace function public.admin_set_status(p_password text, p_id uuid, p_status text)
returns void language plpgsql security definer set search_path = public, extensions as $$
begin
  perform admin_check(p_password);
  update registrations set status = p_status where id = p_id;
end $$;

create or replace function public.admin_delete_registration(p_password text, p_id uuid)
returns void language plpgsql security definer set search_path = public, extensions as $$
begin
  perform admin_check(p_password);
  delete from registrations where id = p_id;
end $$;

revoke all on function public.admin_check(text) from public, anon, authenticated;
revoke all on function public.admin_list_registrations(text) from public;
revoke all on function public.admin_set_status(text, uuid, text) from public;
revoke all on function public.admin_delete_registration(text, uuid) from public;
grant execute on function public.admin_list_registrations(text) to anon, authenticated;
grant execute on function public.admin_set_status(text, uuid, text) to anon, authenticated;
grant execute on function public.admin_delete_registration(text, uuid) to anon, authenticated;

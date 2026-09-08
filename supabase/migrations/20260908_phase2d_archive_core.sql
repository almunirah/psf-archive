begin;

create extension if not exists pgcrypto;

create type public.psf_role as enum ('SUPER_ADMIN','ARCHIVE_ADMIN','ARCHIVIST','CONTRIBUTOR','VIEWER');
create type public.asset_status as enum ('SUBMITTED','INGESTED','METADATA_REVIEW','APPROVED','ARCHIVED','PRESERVED','RESTRICTED','QUARANTINED','SUPERSEDED','DISPOSED');
create type public.access_class as enum ('PUBLIC','INTERNAL','RESTRICTED','CONFIDENTIAL','EMBARGOED');
create type public.file_representation as enum ('ORIGINAL','PRESERVATION_MASTER','EDITED_MASTER','PREVIEW','THUMBNAIL','WATERMARKED_PREVIEW');
create type public.fixity_status as enum ('PENDING','VERIFIED','FAILED','MISSING');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  email text not null,
  role public.psf_role not null default 'VIEWER',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.photo_assets (
  id uuid primary key default gen_random_uuid(),
  archive_id text not null unique,
  myfoto_id text unique,
  title text not null,
  caption text,
  description text,
  photographer text,
  date_taken timestamptz,
  event_name text,
  location text,
  agency text,
  category text,
  keywords text[] not null default '{}',
  access_class public.access_class not null default 'INTERNAL',
  embargo_until timestamptz,
  status public.asset_status not null default 'SUBMITTED',
  submitted_by uuid references public.profiles(id),
  approved_by uuid references public.profiles(id),
  approved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.asset_files (
  id uuid primary key default gen_random_uuid(),
  asset_id uuid not null references public.photo_assets(id) on delete cascade,
  representation public.file_representation not null,
  storage_path text not null,
  original_filename text not null,
  mime_type text not null,
  size_bytes bigint not null check (size_bytes >= 0),
  sha256 text not null check (length(sha256) = 64),
  width_px integer,
  height_px integer,
  exif jsonb not null default '{}'::jsonb,
  iptc jsonb not null default '{}'::jsonb,
  immutable boolean not null default false,
  created_at timestamptz not null default now(),
  unique(asset_id, representation, sha256)
);

create unique index asset_files_exact_duplicate_idx on public.asset_files(sha256) where representation = 'ORIGINAL';

create table public.collections (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create table public.collection_assets (
  collection_id uuid not null references public.collections(id) on delete cascade,
  asset_id uuid not null references public.photo_assets(id) on delete cascade,
  primary key(collection_id, asset_id)
);

create table public.authority_terms (
  id uuid primary key default gen_random_uuid(),
  authority_type text not null check (authority_type in ('PERSON','ORGANISATION','LOCATION','EVENT','SUBJECT','PHOTOGRAPHER')),
  preferred_name text not null,
  aliases text[] not null default '{}',
  external_identifier text,
  created_at timestamptz not null default now(),
  unique(authority_type, preferred_name)
);

create table public.asset_authorities (
  asset_id uuid not null references public.photo_assets(id) on delete cascade,
  authority_id uuid not null references public.authority_terms(id) on delete cascade,
  primary key(asset_id, authority_id)
);

create table public.rights_records (
  id uuid primary key default gen_random_uuid(),
  asset_id uuid not null references public.photo_assets(id) on delete cascade,
  copyright_owner text,
  credit_line text,
  usage_restriction text,
  license_text text,
  valid_from timestamptz,
  valid_until timestamptz,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create table public.fixity_events (
  id uuid primary key default gen_random_uuid(),
  file_id uuid not null references public.asset_files(id) on delete cascade,
  expected_sha256 text not null,
  observed_sha256 text,
  status public.fixity_status not null default 'PENDING',
  checked_by uuid references public.profiles(id),
  checked_at timestamptz not null default now(),
  details jsonb not null default '{}'::jsonb
);

create table public.restore_requests (
  id uuid primary key default gen_random_uuid(),
  asset_id uuid not null references public.photo_assets(id),
  requested_by uuid not null references public.profiles(id),
  reason text not null,
  status text not null default 'REQUESTED' check (status in ('REQUESTED','APPROVED','STAGING','VERIFIED','COMPLETED','REJECTED','FAILED')),
  staging_path text,
  approved_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.audit_log (
  id bigint generated always as identity primary key,
  actor_id uuid references public.profiles(id),
  action text not null,
  entity_type text not null,
  entity_id text,
  old_data jsonb,
  new_data jsonb,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create or replace function public.current_psf_role()
returns public.psf_role
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid() and is_active = true;
$$;

create or replace function public.is_privileged_role(allowed public.psf_role[])
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.current_psf_role() = any(allowed), false);
$$;

alter table public.profiles enable row level security;
alter table public.photo_assets enable row level security;
alter table public.asset_files enable row level security;
alter table public.collections enable row level security;
alter table public.collection_assets enable row level security;
alter table public.authority_terms enable row level security;
alter table public.asset_authorities enable row level security;
alter table public.rights_records enable row level security;
alter table public.fixity_events enable row level security;
alter table public.restore_requests enable row level security;
alter table public.audit_log enable row level security;

create policy "profiles self read" on public.profiles for select using (id = auth.uid() or public.is_privileged_role(array['SUPER_ADMIN','ARCHIVE_ADMIN']::public.psf_role[]));
create policy "super admin manages profiles" on public.profiles for all using (public.is_privileged_role(array['SUPER_ADMIN']::public.psf_role[])) with check (public.is_privileged_role(array['SUPER_ADMIN']::public.psf_role[]));

create policy "authenticated read visible assets" on public.photo_assets for select using (
  auth.uid() is not null and (
    access_class in ('PUBLIC','INTERNAL') or
    submitted_by = auth.uid() or
    public.is_privileged_role(array['SUPER_ADMIN','ARCHIVE_ADMIN','ARCHIVIST']::public.psf_role[])
  )
);
create policy "contributors submit assets" on public.photo_assets for insert with check (
  auth.uid() = submitted_by and public.is_privileged_role(array['SUPER_ADMIN','ARCHIVE_ADMIN','ARCHIVIST','CONTRIBUTOR']::public.psf_role[])
);
create policy "cataloguers update assets" on public.photo_assets for update using (
  public.is_privileged_role(array['SUPER_ADMIN','ARCHIVE_ADMIN','ARCHIVIST']::public.psf_role[])
) with check (
  public.is_privileged_role(array['SUPER_ADMIN','ARCHIVE_ADMIN','ARCHIVIST']::public.psf_role[])
);

create policy "asset files follow asset visibility" on public.asset_files for select using (
  exists (select 1 from public.photo_assets a where a.id = asset_id)
);
create policy "archivists manage asset files" on public.asset_files for insert with check (
  public.is_privileged_role(array['SUPER_ADMIN','ARCHIVE_ADMIN','ARCHIVIST']::public.psf_role[])
);

create policy "authenticated read collections" on public.collections for select using (auth.uid() is not null);
create policy "archivists manage collections" on public.collections for all using (public.is_privileged_role(array['SUPER_ADMIN','ARCHIVE_ADMIN','ARCHIVIST']::public.psf_role[])) with check (public.is_privileged_role(array['SUPER_ADMIN','ARCHIVE_ADMIN','ARCHIVIST']::public.psf_role[]));
create policy "authenticated read collection links" on public.collection_assets for select using (auth.uid() is not null);
create policy "archivists manage collection links" on public.collection_assets for all using (public.is_privileged_role(array['SUPER_ADMIN','ARCHIVE_ADMIN','ARCHIVIST']::public.psf_role[])) with check (public.is_privileged_role(array['SUPER_ADMIN','ARCHIVE_ADMIN','ARCHIVIST']::public.psf_role[]));

create policy "authenticated read authority" on public.authority_terms for select using (auth.uid() is not null);
create policy "archivists manage authority" on public.authority_terms for all using (public.is_privileged_role(array['SUPER_ADMIN','ARCHIVE_ADMIN','ARCHIVIST']::public.psf_role[])) with check (public.is_privileged_role(array['SUPER_ADMIN','ARCHIVE_ADMIN','ARCHIVIST']::public.psf_role[]));
create policy "authenticated read asset authority" on public.asset_authorities for select using (auth.uid() is not null);
create policy "archivists manage asset authority" on public.asset_authorities for all using (public.is_privileged_role(array['SUPER_ADMIN','ARCHIVE_ADMIN','ARCHIVIST']::public.psf_role[])) with check (public.is_privileged_role(array['SUPER_ADMIN','ARCHIVE_ADMIN','ARCHIVIST']::public.psf_role[]));

create policy "authorized read rights" on public.rights_records for select using (public.is_privileged_role(array['SUPER_ADMIN','ARCHIVE_ADMIN','ARCHIVIST']::public.psf_role[]));
create policy "admins manage rights" on public.rights_records for all using (public.is_privileged_role(array['SUPER_ADMIN','ARCHIVE_ADMIN']::public.psf_role[])) with check (public.is_privileged_role(array['SUPER_ADMIN','ARCHIVE_ADMIN']::public.psf_role[]));

create policy "authorized read fixity" on public.fixity_events for select using (public.is_privileged_role(array['SUPER_ADMIN','ARCHIVE_ADMIN','ARCHIVIST']::public.psf_role[]));
create policy "archivists create fixity" on public.fixity_events for insert with check (public.is_privileged_role(array['SUPER_ADMIN','ARCHIVE_ADMIN','ARCHIVIST']::public.psf_role[]));

create policy "requester reads restore" on public.restore_requests for select using (requested_by = auth.uid() or public.is_privileged_role(array['SUPER_ADMIN','ARCHIVE_ADMIN','ARCHIVIST']::public.psf_role[]));
create policy "authenticated request restore" on public.restore_requests for insert with check (requested_by = auth.uid());
create policy "admins process restore" on public.restore_requests for update using (public.is_privileged_role(array['SUPER_ADMIN','ARCHIVE_ADMIN']::public.psf_role[])) with check (public.is_privileged_role(array['SUPER_ADMIN','ARCHIVE_ADMIN']::public.psf_role[]));

create policy "privileged audit read" on public.audit_log for select using (public.is_privileged_role(array['SUPER_ADMIN','ARCHIVE_ADMIN']::public.psf_role[]));

create or replace function public.prevent_preserved_without_verified_fixity()
returns trigger
language plpgsql
as $$
begin
  if new.status = 'PRESERVED' and not exists (
    select 1
    from public.asset_files f
    join public.fixity_events e on e.file_id = f.id
    where f.asset_id = new.id and f.representation in ('ORIGINAL','PRESERVATION_MASTER') and e.status = 'VERIFIED'
  ) then
    raise exception 'Asset cannot become PRESERVED until original/master fixity is VERIFIED';
  end if;
  return new;
end;
$$;

create trigger photo_assets_preservation_guard
before insert or update of status on public.photo_assets
for each row execute function public.prevent_preserved_without_verified_fixity();

create or replace function public.prevent_immutable_file_change()
returns trigger
language plpgsql
as $$
begin
  if old.immutable then
    raise exception 'Immutable archival file cannot be modified';
  end if;
  return new;
end;
$$;

create trigger asset_files_immutable_guard
before update or delete on public.asset_files
for each row execute function public.prevent_immutable_file_change();

commit;

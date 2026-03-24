-- Nest UI initial schema

create table workspaces (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz default now(),
  owner_id        uuid references auth.users(id),
  name            text not null,
  ghl_subdomain   text unique,
  ghl_connected   boolean default false,
  api_key         text,
  active_theme_id text default 'obsidian',
  theme_applied_at timestamptz,
  plan            text default 'free',
  stripe_customer_id text
);

create table theme_applications (
  id              uuid primary key default gen_random_uuid(),
  workspace_id    uuid references workspaces(id),
  theme_id        text not null,
  applied_at      timestamptz default now(),
  applied_by      uuid references auth.users(id)
);

create table sub_accounts (
  id              uuid primary key default gen_random_uuid(),
  workspace_id    uuid references workspaces(id),
  ghl_account_id  text not null,
  name            text,
  active_theme_id text,
  created_at      timestamptz default now()
);

-- Row Level Security
alter table workspaces enable row level security;
alter table theme_applications enable row level security;
alter table sub_accounts enable row level security;

-- Policies: users can only access their own workspaces
create policy "Users can view own workspaces"
  on workspaces for select
  using (owner_id = auth.uid());

create policy "Users can insert own workspaces"
  on workspaces for insert
  with check (owner_id = auth.uid());

create policy "Users can update own workspaces"
  on workspaces for update
  using (owner_id = auth.uid());

-- Policies: access theme_applications through workspace ownership
create policy "Users can view own theme applications"
  on theme_applications for select
  using (workspace_id in (select id from workspaces where owner_id = auth.uid()));

create policy "Users can insert own theme applications"
  on theme_applications for insert
  with check (workspace_id in (select id from workspaces where owner_id = auth.uid()));

-- Policies: access sub_accounts through workspace ownership
create policy "Users can view own sub accounts"
  on sub_accounts for select
  using (workspace_id in (select id from workspaces where owner_id = auth.uid()));

create policy "Users can insert own sub accounts"
  on sub_accounts for insert
  with check (workspace_id in (select id from workspaces where owner_id = auth.uid()));

create policy "Users can update own sub accounts"
  on sub_accounts for update
  using (workspace_id in (select id from workspaces where owner_id = auth.uid()));

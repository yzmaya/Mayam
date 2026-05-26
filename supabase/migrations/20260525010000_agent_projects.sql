-- agent_projects: casos de éxito de agentes WhatsApp
create table if not exists agent_projects (
  id           uuid        default gen_random_uuid() primary key,
  title        text        not null,
  client       text        not null,
  industry     text        not null default '',
  summary      text        not null default '',
  metric       text        not null default '',
  metric_label text        not null default '',
  image_url    text,
  status       text        not null default 'draft'
                           check (status in ('draft', 'published')),
  sort_order   integer     not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

alter table agent_projects enable row level security;

create policy "Public can read published agent_projects"
  on agent_projects for select
  using (status = 'published');

create policy "Authenticated users can manage agent_projects"
  on agent_projects for all
  to authenticated
  using (true)
  with check (true);

-- Storage bucket para imágenes de proyectos (acceso público de lectura)
insert into storage.buckets (id, name, public)
values ('project-images', 'project-images', true)
on conflict (id) do nothing;

create policy "Public can read project images"
  on storage.objects for select
  using (bucket_id = 'project-images');

create policy "Authenticated users can upload project images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'project-images');

create policy "Authenticated users can delete project images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'project-images');

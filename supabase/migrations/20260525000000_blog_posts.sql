-- Tabla principal de posts del blog
create table if not exists public.blog_posts (
  id               uuid        primary key default gen_random_uuid(),
  title            text        not null,
  slug             text        unique not null,
  excerpt          text,
  content          jsonb       not null default '[]'::jsonb,
  author_name      text        not null default 'Equipo MAYAM',
  author_id        uuid        references auth.users(id) on delete set null,
  category         text        not null default 'General',
  category_icon    text        not null default 'file-text',
  image_url        text,
  status           text        not null default 'draft'
                               check (status in ('draft','published','archived')),
  featured         boolean     not null default false,
  tags             text[]      not null default '{}',
  read_time_minutes integer    not null default 3,

  -- SEO
  meta_title       text,
  meta_description text,
  meta_keywords    text[]      not null default '{}',
  og_image         text,

  -- GEO (SEO local)
  geo_region       text        not null default 'MX',
  geo_placename    text        not null default 'Ciudad de México, México',
  geo_position     text        not null default '19.4326,-99.1332',

  -- Timestamps
  published_at     timestamptz,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- Row Level Security
alter table public.blog_posts enable row level security;

-- Lectura pública solo de posts publicados
create policy "public_read_published"
  on public.blog_posts for select
  to anon, authenticated
  using (status = 'published');

-- CRUD completo para usuarios autenticados (staff MAYAM)
create policy "auth_full_access"
  on public.blog_posts for all
  to authenticated
  using (true)
  with check (true);

-- Trigger: auto-actualiza updated_at
create or replace function public.handle_updated_at()
returns trigger language plpgsql security definer as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger blog_posts_updated_at
  before update on public.blog_posts
  for each row execute function public.handle_updated_at();

-- Índices para búsqueda y filtrado
create index if not exists idx_blog_posts_status    on public.blog_posts (status);
create index if not exists idx_blog_posts_slug      on public.blog_posts (slug);
create index if not exists idx_blog_posts_featured  on public.blog_posts (featured);
create index if not exists idx_blog_posts_published on public.blog_posts (published_at desc);

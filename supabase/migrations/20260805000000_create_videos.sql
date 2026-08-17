-- Videos shown on the site: Instagram reel embeds plus self-hosted files
-- (hero, instructor). Replaces the hardcoded REELS array in
-- components/CourseHome.tsx so an extra video is a row, not a deploy.

create type video_kind as enum ('instagram_reel', 'hosted');

create type video_slot as enum ('reels', 'hero', 'instructor');

create table videos (
  id          uuid primary key default gen_random_uuid(),
  kind        video_kind not null,
  slot        video_slot not null default 'reels',

  -- instagram_reel: the shortcode from instagram.com/reel/<code>/
  shortcode   text,
  -- hosted: path or URL to the file, e.g. /instructor.mp4
  src         text,
  poster      text,

  -- Shown under a reel, e.g. "1.7M". Kept as text because it is display copy;
  -- view_count is the sortable value.
  views_label text,
  view_count  bigint,

  title_en    text,
  title_fr    text,

  featured    boolean not null default false,
  position    integer not null default 0,
  published   boolean not null default true,

  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),

  -- Each kind needs its own source field, and only that one.
  constraint videos_source_matches_kind check (
    case kind
      when 'instagram_reel' then shortcode is not null and src is null
      when 'hosted'         then src is not null and shortcode is null
    end
  )
);

create unique index videos_shortcode_key on videos (shortcode)
  where shortcode is not null;

-- The reels grid reads published rows for one slot in display order.
create index videos_slot_order_idx on videos (slot, position, created_at)
  where published;

-- At most one featured video per slot, so the layout can rely on it.
create unique index videos_one_featured_per_slot on videos (slot)
  where featured;

create function set_updated_at() returns trigger
  language plpgsql
  set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger videos_set_updated_at
  before update on videos
  for each row execute function set_updated_at();

-- The site is public and read-only; writes go through the dashboard or a
-- service-role key, never the anon key used in the browser.
alter table videos enable row level security;

create policy "Published videos are publicly readable"
  on videos for select
  to anon, authenticated
  using (published);

-- Existing reels from instagram.com/polidori.dev, ordered by views.
insert into videos (kind, slot, shortcode, views_label, view_count, featured, position) values
  ('instagram_reel', 'reels', 'DZl4PovRcYy', '1.7M', 1700000, true,  0),
  ('instagram_reel', 'reels', 'Da8k-0MxpPJ', '162K',  162000, false, 1),
  ('instagram_reel', 'reels', 'Dav6OECRPRV', '78.7K',  78700, false, 2),
  ('instagram_reel', 'reels', 'Day_GmjRKn3', '58.8K',  58800, false, 3);

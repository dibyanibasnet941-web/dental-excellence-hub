
-- ROLES
create type public.app_role as enum ('admin','staff');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  created_at timestamptz not null default now()
);
grant select, insert, update on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;
create policy "own profile read" on public.profiles for select to authenticated using (auth.uid() = id);
create policy "own profile write" on public.profiles for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);
create policy "own profile insert" on public.profiles for insert to authenticated with check (auth.uid() = id);

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create or replace function public.is_staff(_user_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role in ('admin','staff'))
$$;

create policy "read own roles" on public.user_roles for select to authenticated using (user_id = auth.uid() or public.has_role(auth.uid(),'admin'));

create or replace function public.set_updated_at() returns trigger language plpgsql set search_path = public as $$
begin new.updated_at = now(); return new; end; $$;

create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, email)
  values (new.id, new.raw_user_meta_data->>'full_name', new.email)
  on conflict (id) do nothing;
  return new;
end; $$;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

-- CATEGORIES
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  image_url text,
  icon text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- BRANDS
create table public.brands (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  logo_url text,
  country text,
  website text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- PRODUCTS
create table public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  sku text,
  category_id uuid references public.categories(id) on delete set null,
  brand_id uuid references public.brands(id) on delete set null,
  short_description text,
  description text,
  features text[] not null default '{}',
  applications text[] not null default '{}',
  image_url text,
  availability text not null default 'available',
  product_type text,
  price numeric,
  currency text not null default 'NPR',
  show_price boolean not null default false,
  is_featured boolean not null default false,
  is_new boolean not null default false,
  is_published boolean not null default true,
  brochure_url text,
  spec_sheet_url text,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index products_category_idx on public.products(category_id);
create index products_brand_idx on public.products(brand_id);

create table public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  image_url text not null,
  alt_text text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table public.product_specifications (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  spec_key text not null,
  spec_value text not null,
  sort_order int not null default 0
);

-- SOLUTIONS / SERVICES
create table public.solutions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  overview text,
  body text,
  image_url text,
  icon text,
  sort_order int not null default 0,
  is_published boolean not null default true,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  benefits text[] not null default '{}',
  image_url text,
  icon text,
  sort_order int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- BLOG
create table public.blog_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text,
  cover_image_url text,
  author text,
  category_id uuid references public.blog_categories(id) on delete set null,
  published_at timestamptz,
  is_published boolean not null default false,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- RESOURCES
create table public.resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  resource_type text not null default 'brochure',
  file_url text,
  video_url text,
  thumbnail_url text,
  download_count int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ENQUIRIES
create table public.enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  organization text,
  email text not null,
  phone text,
  location text,
  product_id uuid references public.products(id) on delete set null,
  product_name text,
  quantity text,
  message text,
  source text default 'website',
  status text not null default 'new',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- SITE CONTENT / SETTINGS
create table public.website_content (
  id uuid primary key default gen_random_uuid(),
  section text not null,
  key text not null,
  value text,
  updated_at timestamptz not null default now(),
  unique (section, key)
);

-- GRANTS
grant select on public.categories, public.brands, public.products, public.product_images,
  public.product_specifications, public.solutions, public.services, public.blog_categories,
  public.blog_posts, public.resources, public.website_content to anon, authenticated;
grant insert, update, delete on public.categories, public.brands, public.products, public.product_images,
  public.product_specifications, public.solutions, public.services, public.blog_categories,
  public.blog_posts, public.resources, public.website_content, public.enquiries to authenticated;
grant insert on public.enquiries to anon;
grant select, update on public.enquiries to authenticated;
grant all on public.categories, public.brands, public.products, public.product_images,
  public.product_specifications, public.solutions, public.services, public.blog_categories,
  public.blog_posts, public.resources, public.website_content, public.enquiries to service_role;

-- RLS
alter table public.categories enable row level security;
alter table public.brands enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.product_specifications enable row level security;
alter table public.solutions enable row level security;
alter table public.services enable row level security;
alter table public.blog_categories enable row level security;
alter table public.blog_posts enable row level security;
alter table public.resources enable row level security;
alter table public.website_content enable row level security;
alter table public.enquiries enable row level security;

create policy "public read categories" on public.categories for select to anon, authenticated using (is_active or public.is_staff(auth.uid()));
create policy "staff write categories" on public.categories for all to authenticated using (public.is_staff(auth.uid())) with check (public.is_staff(auth.uid()));

create policy "public read brands" on public.brands for select to anon, authenticated using (is_active or public.is_staff(auth.uid()));
create policy "staff write brands" on public.brands for all to authenticated using (public.is_staff(auth.uid())) with check (public.is_staff(auth.uid()));

create policy "public read products" on public.products for select to anon, authenticated using (is_published or public.is_staff(auth.uid()));
create policy "staff write products" on public.products for all to authenticated using (public.is_staff(auth.uid())) with check (public.is_staff(auth.uid()));

create policy "public read product images" on public.product_images for select to anon, authenticated using (true);
create policy "staff write product images" on public.product_images for all to authenticated using (public.is_staff(auth.uid())) with check (public.is_staff(auth.uid()));

create policy "public read product specs" on public.product_specifications for select to anon, authenticated using (true);
create policy "staff write product specs" on public.product_specifications for all to authenticated using (public.is_staff(auth.uid())) with check (public.is_staff(auth.uid()));

create policy "public read solutions" on public.solutions for select to anon, authenticated using (is_published or public.is_staff(auth.uid()));
create policy "staff write solutions" on public.solutions for all to authenticated using (public.is_staff(auth.uid())) with check (public.is_staff(auth.uid()));

create policy "public read services" on public.services for select to anon, authenticated using (is_published or public.is_staff(auth.uid()));
create policy "staff write services" on public.services for all to authenticated using (public.is_staff(auth.uid())) with check (public.is_staff(auth.uid()));

create policy "public read blog categories" on public.blog_categories for select to anon, authenticated using (true);
create policy "staff write blog categories" on public.blog_categories for all to authenticated using (public.is_staff(auth.uid())) with check (public.is_staff(auth.uid()));

create policy "public read blog posts" on public.blog_posts for select to anon, authenticated using (is_published or public.is_staff(auth.uid()));
create policy "staff write blog posts" on public.blog_posts for all to authenticated using (public.is_staff(auth.uid())) with check (public.is_staff(auth.uid()));

create policy "public read resources" on public.resources for select to anon, authenticated using (is_published or public.is_staff(auth.uid()));
create policy "staff write resources" on public.resources for all to authenticated using (public.is_staff(auth.uid())) with check (public.is_staff(auth.uid()));

create policy "public read website content" on public.website_content for select to anon, authenticated using (true);
create policy "staff write website content" on public.website_content for all to authenticated using (public.is_staff(auth.uid())) with check (public.is_staff(auth.uid()));

create policy "anyone can submit enquiry" on public.enquiries for insert to anon, authenticated with check (true);
create policy "staff read enquiries" on public.enquiries for select to authenticated using (public.is_staff(auth.uid()));
create policy "staff update enquiries" on public.enquiries for update to authenticated using (public.is_staff(auth.uid())) with check (public.is_staff(auth.uid()));

-- updated_at triggers
create trigger t1 before update on public.categories for each row execute function public.set_updated_at();
create trigger t2 before update on public.brands for each row execute function public.set_updated_at();
create trigger t3 before update on public.products for each row execute function public.set_updated_at();
create trigger t4 before update on public.solutions for each row execute function public.set_updated_at();
create trigger t5 before update on public.services for each row execute function public.set_updated_at();
create trigger t6 before update on public.blog_posts for each row execute function public.set_updated_at();
create trigger t7 before update on public.resources for each row execute function public.set_updated_at();
create trigger t8 before update on public.enquiries for each row execute function public.set_updated_at();
create trigger t9 before update on public.website_content for each row execute function public.set_updated_at();

-- SEED: categories (structure only, editable in admin)
insert into public.categories (name, slug, description, icon, sort_order) values
 ('Dental Equipment','dental-equipment','Chairs, units, compressors and clinic equipment.','Stethoscope',1),
 ('Dental Instruments','dental-instruments','Hand instruments and precision tools.','Wrench',2),
 ('Dental Consumables','dental-consumables','Everyday materials and disposables.','Package',3),
 ('Infection Control','infection-control','Barrier products, disinfectants and PPE.','ShieldCheck',4),
 ('Sterilization','sterilization','Autoclaves, sealers and sterilization workflow.','Flame',5),
 ('Radiology','radiology','Imaging systems and accessories.','ScanLine',6),
 ('Endodontics','endodontics','Root canal systems, files and motors.','Activity',7),
 ('Orthodontics','orthodontics','Brackets, wires and orthodontic supplies.','GitBranch',8),
 ('Implantology','implantology','Implant systems, surgical kits and prosthetics.','Anchor',9),
 ('Oral Surgery','oral-surgery','Surgical instruments and units.','Scissors',10),
 ('Preventive Dentistry','preventive-dentistry','Prophylaxis, fluoride and sealants.','HeartPulse',11),
 ('Laboratory','laboratory','Dental laboratory equipment and materials.','FlaskConical',12),
 ('Other Dental Solutions','other-dental-solutions','Additional dental products and solutions.','Layers',13);

insert into public.solutions (title, slug, overview, sort_order) values
 ('Complete Dental Clinic Setup','complete-dental-clinic-setup','End-to-end planning, supply and installation for new dental clinics.',1),
 ('Sterilization & Infection Control','sterilization-infection-control','Compliant sterilization workflows and infection-control supplies.',2),
 ('Digital Dentistry','digital-dentistry','Digital workflow solutions for modern dental practices.',3),
 ('Dental Imaging','dental-imaging','Imaging systems for accurate diagnosis and treatment planning.',4),
 ('Implantology','implantology-solution','Implant systems and surgical support for implant practices.',5),
 ('Oral Surgery','oral-surgery-solution','Equipment and instruments for surgical procedures.',6),
 ('Endodontics','endodontics-solution','Complete endodontic treatment solutions.',7),
 ('Orthodontics','orthodontics-solution','Orthodontic supplies and practice solutions.',8);

insert into public.services (title, slug, description, sort_order) values
 ('Dental Equipment Consultation','equipment-consultation','Guidance on selecting the right equipment for your practice.',1),
 ('Clinic Setup','clinic-setup','Planning and outfitting of complete dental clinics.',2),
 ('Product Demonstration','product-demonstration','Hands-on demonstrations of equipment and instruments.',3),
 ('Installation','installation','Professional installation and commissioning.',4),
 ('Technical Support','technical-support','Technical assistance for equipment in service.',5),
 ('Maintenance','maintenance','Preventive and corrective maintenance programmes.',6),
 ('After-Sales Service','after-sales-service','Ongoing support after purchase.',7),
 ('Training','training','Training for clinical and support staff.',8);

insert into public.website_content (section, key, value) values
 ('hero','headline','Advancing Dentistry Through Better Technology'),
 ('hero','subheadline','Professional dental equipment, instruments, consumables and solutions for modern dental practices.'),
 ('hero','primary_cta','Explore Products'),
 ('hero','secondary_cta','Request a Quote'),
 ('hero','eyebrow','Garg Dental Pvt. Ltd.'),
 ('about','intro',''),
 ('about','story',''),
 ('about','mission',''),
 ('about','vision',''),
 ('about','values',''),
 ('about','why_choose',''),
 ('about','capability',''),
 ('contact','phone',''),
 ('contact','email',''),
 ('contact','address',''),
 ('contact','hours',''),
 ('contact','whatsapp',''),
 ('contact','map_embed_url',''),
 ('social','facebook',''),
 ('social','instagram',''),
 ('social','linkedin',''),
 ('stats','years_experience',''),
 ('stats','products_count',''),
 ('stats','brands_count',''),
 ('stats','customers_served',''),
 ('footer','tagline',''),
 ('footer','copyright','');

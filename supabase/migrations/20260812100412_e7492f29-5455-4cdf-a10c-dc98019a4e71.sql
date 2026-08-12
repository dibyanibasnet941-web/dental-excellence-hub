
revoke all on function public.set_updated_at() from public, anon, authenticated;
revoke all on function public.handle_new_user() from public, anon, authenticated;
revoke all on function public.has_role(uuid, public.app_role) from public, anon;
revoke all on function public.is_staff(uuid) from public, anon;

-- split public/anon read policies so anon never needs is_staff()
drop policy "public read categories" on public.categories;
create policy "anon read categories" on public.categories for select to anon using (is_active);
create policy "auth read categories" on public.categories for select to authenticated using (is_active or public.is_staff(auth.uid()));

drop policy "public read brands" on public.brands;
create policy "anon read brands" on public.brands for select to anon using (is_active);
create policy "auth read brands" on public.brands for select to authenticated using (is_active or public.is_staff(auth.uid()));

drop policy "public read products" on public.products;
create policy "anon read products" on public.products for select to anon using (is_published);
create policy "auth read products" on public.products for select to authenticated using (is_published or public.is_staff(auth.uid()));

drop policy "public read solutions" on public.solutions;
create policy "anon read solutions" on public.solutions for select to anon using (is_published);
create policy "auth read solutions" on public.solutions for select to authenticated using (is_published or public.is_staff(auth.uid()));

drop policy "public read services" on public.services;
create policy "anon read services" on public.services for select to anon using (is_published);
create policy "auth read services" on public.services for select to authenticated using (is_published or public.is_staff(auth.uid()));

drop policy "public read blog posts" on public.blog_posts;
create policy "anon read blog posts" on public.blog_posts for select to anon using (is_published);
create policy "auth read blog posts" on public.blog_posts for select to authenticated using (is_published or public.is_staff(auth.uid()));

drop policy "public read resources" on public.resources;
create policy "anon read resources" on public.resources for select to anon using (is_published);
create policy "auth read resources" on public.resources for select to authenticated using (is_published or public.is_staff(auth.uid()));

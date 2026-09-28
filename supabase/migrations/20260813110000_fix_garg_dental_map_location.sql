-- The previous plus code points to a different business near Kamalpokhari.
-- Use the verified Garg Dental coordinates on Gairidhara Road instead.
update public.website_content
set value = case key
  when 'address' then '127 Gairidhara Road, Kathmandu 44600, Nepal'
  when 'map_embed_url' then 'https://www.google.com/maps?q=Garg%20Dental%20Pvt.%20Ltd.%2C%20127%20Gairidhara%20Road%2C%20Kathmandu%2044600%2C%20Nepal&z=17&output=embed'
end
where section = 'contact'
  and key in ('address', 'map_embed_url');

-- Display approved brand logos across the public site. These remain editable
-- through the Brand admin form via the logo_url field.
update public.brands
set logo_url = case slug
  when 'nsk' then 'https://commons.wikimedia.org/wiki/Special:FilePath/NSK_Logo.svg'
  when 'coltene' then 'https://commons.wikimedia.org/wiki/Special:FilePath/Logo_of_COLTENE.png'
  when 'dentsply-sirona' then 'https://commons.wikimedia.org/wiki/Special:FilePath/Dentsply_sirona_logo.svg'
  when '3m-oral-care' then 'https://commons.wikimedia.org/wiki/Special:FilePath/3M_wordmark.svg'
  else logo_url
end
where slug in ('nsk', 'coltene', 'dentsply-sirona', '3m-oral-care');

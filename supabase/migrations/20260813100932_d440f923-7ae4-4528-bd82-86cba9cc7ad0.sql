-- Brands
insert into public.brands (name, slug, description, country, website, sort_order, is_active) values
('NSK', 'nsk', 'Japanese precision handpieces, surgical motors and rotary instruments trusted worldwide.', 'Japan', 'https://www.nsk-dental.com', 1, true),
('Woodpecker', 'woodpecker', 'Innovative scalers, curing lights and endodontic devices for modern clinics.', 'China', 'https://www.glodental.cn', 2, true),
('Coltene', 'coltene', 'Swiss restorative materials, endodontic systems and infection control products.', 'Switzerland', 'https://www.coltene.com', 3, true),
('Dentsply Sirona', 'dentsply-sirona', 'Global leader in dental imaging, CAD/CAM and treatment centres.', 'USA', 'https://www.dentsplysirona.com', 4, true),
('Melag', 'melag', 'German autoclaves and sterilization technology for medical and dental practices.', 'Germany', 'https://www.melag.com', 5, true),
('3M Oral Care', '3m-oral-care', 'Adhesives, composites and orthodontic solutions backed by material science.', 'USA', 'https://www.3m.com', 6, true),
('Vatech', 'vatech', 'Digital radiography, intraoral sensors and CBCT imaging systems.', 'South Korea', 'https://www.vatech.com', 7, true),
('GC Corporation', 'gc-corporation', 'Restorative materials, glass ionomers and preventive dentistry products.', 'Japan', 'https://www.gc.dental', 8, true);

-- Products
insert into public.products (name, slug, sku, category_id, brand_id, short_description, description, features, applications, image_url, availability, product_type, is_featured, is_new, is_published)
select p.name, p.slug, p.sku, c.id, b.id, p.short_description, p.description, p.features, p.applications, p.image_url, p.availability, p.product_type, p.is_featured, p.is_new, true
from (values
 ('Dental Treatment Unit Pro', 'dental-treatment-unit-pro', 'GD-EQ-001', 'dental-equipment', 'dentsply-sirona', 'Fully integrated treatment centre with programmable positions and LED operating light.', 'A complete chairside treatment centre designed for high patient throughput. Includes ergonomic seamless upholstery, programmable chair positions, an integrated delivery system and a shadow-free LED operating light.', array['Programmable chair positions','Shadow-free LED operating light','Seamless anti-bacterial upholstery','Integrated assistant panel'], array['General dentistry','Restorative procedures','Oral examination'], 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=80', 'available', 'Equipment', true, false),
 ('Portable Dental Chair Unit', 'portable-dental-chair-unit', 'GD-EQ-002', 'dental-equipment', 'woodpecker', 'Lightweight folding chair unit for outreach camps and mobile dentistry.', 'Compact, foldable dental chair unit with built-in compressor, suction and LED light. Ideal for dental camps, home visits and satellite clinics across Nepal.', array['Folds into a carry case','Built-in oil-free compressor','LED light and suction included','Under 30 kg total weight'], array['Dental camps','Mobile clinics','Field outreach'], 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1200&q=80', 'available', 'Equipment', false, true),
 ('High Speed Air Turbine Handpiece', 'high-speed-air-turbine-handpiece', 'GD-IN-001', 'dental-instruments', 'nsk', 'Quiet, high-torque turbine with quadruple water spray and ceramic bearings.', 'Precision-balanced high speed handpiece delivering consistent torque with reduced noise and vibration. Ceramic bearings extend service life and the quadruple spray improves cooling.', array['Ceramic bearings','Quadruple water spray','Anti-retraction valve','Autoclavable to 135°C'], array['Cavity preparation','Crown cutting','Restorative dentistry'], 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1200&q=80', 'available', 'Instrument', true, false),
 ('Contra Angle Low Speed Handpiece', 'contra-angle-low-speed-handpiece', 'GD-IN-002', 'dental-instruments', 'nsk', 'Durable 1:1 contra angle for polishing, finishing and prophylaxis.', 'Stainless steel contra angle handpiece with internal water spray and a smooth push-button bur chuck. Fully autoclavable and compatible with standard E-type motors.', array['Push-button bur chuck','Internal spray','Stainless steel body','E-type connection'], array['Polishing','Prophylaxis','Finishing'], 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=1200&q=80', 'available', 'Instrument', false, false),
 ('Composite Restorative Kit', 'composite-restorative-kit', 'GD-CN-001', 'dental-consumables', '3m-oral-care', 'Nano-hybrid composite shades with bonding agent and finishing accessories.', 'Universal nano-hybrid composite system covering anterior and posterior restorations. Excellent polishability, low shrinkage and a natural chameleon effect across shades.', array['8 universal shades','Low polymerisation shrinkage','High polish retention','Includes bonding agent'], array['Anterior restorations','Posterior restorations','Aesthetic dentistry'], 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=1200&q=80', 'available', 'Consumable', true, false),
 ('Glass Ionomer Filling Cement', 'glass-ionomer-filling-cement', 'GD-CN-002', 'dental-consumables', 'gc-corporation', 'Fluoride-releasing restorative cement for paediatric and cervical fillings.', 'Chemically bonding glass ionomer cement with sustained fluoride release. Suited to paediatric restorations, cervical lesions and atraumatic restorative treatment.', array['Sustained fluoride release','Chemical adhesion to dentine','Moisture tolerant','Easy hand mixing'], array['Paediatric dentistry','Cervical restorations','ART technique'], 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=1200&q=80', 'available', 'Consumable', false, false),
 ('Class B Vacuum Autoclave 23L', 'class-b-vacuum-autoclave-23l', 'GD-ST-001', 'sterilization', 'melag', 'Class B fractionated vacuum steam steriliser with printed cycle logs.', 'Hospital grade Class B autoclave with pre and post vacuum phases for hollow and wrapped loads. Automatic documentation supports clinical audits and accreditation.', array['Fractionated pre-vacuum','23 litre chamber','Cycle documentation','Stainless steel chamber'], array['Instrument sterilization','Handpiece sterilization','Surgical kit processing'], 'https://images.unsplash.com/photo-1583912267550-d6c2ac3196c0?w=1200&q=80', 'available', 'Equipment', true, false),
 ('Ultrasonic Cleaner 6L', 'ultrasonic-cleaner-6l', 'GD-ST-002', 'sterilization', 'woodpecker', 'Digital ultrasonic bath for pre-sterilization instrument cleaning.', 'Six litre digital ultrasonic cleaner with heating and timer. Removes debris from hinges and serrations before autoclaving to ensure effective sterilization.', array['Digital timer and heater','6 litre stainless tank','Degassing mode','Quiet transducers'], array['Instrument cleaning','Prosthetic cleaning','Endodontic file cleaning'], 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=1200&q=80', 'available', 'Equipment', false, false),
 ('Surface Disinfectant Spray 1L', 'surface-disinfectant-spray-1l', 'GD-IC-001', 'infection-control', 'coltene', 'Alcohol-based rapid surface disinfectant for clinical surfaces.', 'Fast-acting broad spectrum disinfectant for non-invasive surfaces and dental unit surfaces. Effective against bacteria, fungi and enveloped viruses within one minute.', array['1 minute contact time','Broad spectrum efficacy','Aldehyde free','Material compatible'], array['Chair disinfection','Worktop disinfection','Equipment surfaces'], 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=1200&q=80', 'available', 'Consumable', false, false),
 ('Nitrile Examination Gloves', 'nitrile-examination-gloves', 'GD-IC-002', 'infection-control', 'coltene', 'Powder-free nitrile gloves with textured fingertips, 100 per box.', 'Powder-free, latex-free nitrile examination gloves offering strong puncture resistance and tactile sensitivity for clinical procedures.', array['Powder and latex free','Textured fingertips','High puncture resistance','Sizes S to XL'], array['Routine examination','Restorative procedures','Surgical assistance'], 'https://images.unsplash.com/photo-1583947581924-860bda6a26df?w=1200&q=80', 'available', 'Consumable', false, false),
 ('Digital Intraoral X-Ray Sensor', 'digital-intraoral-x-ray-sensor', 'GD-RD-001', 'radiology', 'vatech', 'High resolution CMOS sensor with rounded corners for patient comfort.', 'Direct USB intraoral sensor producing sharp diagnostic images at low dose. Rounded corners and a flexible cable improve patient comfort and positioning.', array['Above 20 lp/mm resolution','Low radiation dose','Rounded ergonomic corners','USB plug and play'], array['Periapical imaging','Endodontic working length','Caries diagnosis'], 'https://images.unsplash.com/photo-1579165466949-3180a3d056d5?w=1200&q=80', 'available', 'Equipment', true, false),
 ('Portable X-Ray Unit', 'portable-x-ray-unit', 'GD-RD-002', 'radiology', 'vatech', 'Handheld intraoral X-ray with backscatter shield and rechargeable battery.', 'Lightweight handheld X-ray unit enabling chairside imaging without moving the patient. Integrated backscatter shield and DC generator ensure operator safety and image consistency.', array['Handheld and battery powered','Integrated backscatter shield','Constant potential DC generator','Touch control panel'], array['Chairside radiography','Domiciliary care','Dental camps'], 'https://images.unsplash.com/photo-1590105577767-e21a1067899f?w=1200&q=80', 'preorder', 'Equipment', false, true),
 ('Endo Motor with Apex Locator', 'endo-motor-with-apex-locator', 'GD-EN-001', 'endodontics', 'woodpecker', 'Cordless endodontic motor with built-in apex locator and auto-reverse.', 'Combines rotary shaping and real-time canal length measurement in a single cordless handpiece. Auto-reverse and torque control reduce the risk of file separation.', array['Built-in apex locator','Auto reverse and auto stop','Cordless with OLED display','Multiple file library presets'], array['Root canal shaping','Working length control','Retreatment'], 'https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?w=1200&q=80', 'available', 'Equipment', true, false),
 ('Rotary NiTi File System', 'rotary-niti-file-system', 'GD-EN-002', 'endodontics', 'coltene', 'Heat-treated NiTi files with controlled memory for curved canals.', 'Controlled memory nickel titanium files that follow canal anatomy with high cyclic fatigue resistance, reducing transportation in curved canals.', array['Controlled memory alloy','High cyclic fatigue resistance','Assorted taper sequence','Sterile packaging'], array['Canal shaping','Curved canals','Retreatment'], 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=1200&q=80', 'available', 'Consumable', false, false),
 ('Orthodontic Bracket Kit', 'orthodontic-bracket-kit', 'GD-OR-001', 'orthodontics', '3m-oral-care', 'MBT prescription metal brackets with precise slot tolerance, full arch kit.', 'Full arch bonding kit of MBT prescription brackets with laser-etched bases for reliable adhesion and consistent slot dimensions for predictable finishing.', array['MBT prescription','Laser etched base','Consistent 0.022 slot','Full arch kit'], array['Fixed orthodontics','Alignment and levelling','Finishing stage'], 'https://images.unsplash.com/photo-1595003500447-88ec6c1e1d0f?w=1200&q=80', 'available', 'Consumable', false, false),
 ('Implant Surgical Motor', 'implant-surgical-motor', 'GD-IM-001', 'implantology', 'nsk', 'Brushless surgical motor with calibrated torque and irrigation pump.', 'Precision brushless surgical motor delivering accurate low speed torque for implant site preparation, with an integrated peristaltic irrigation pump and foot control.', array['Calibrated torque to 80 Ncm','Peristaltic irrigation pump','Brushless motor','Programmable procedure steps'], array['Implant placement','Bone drilling','Oral surgery'], 'https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=1200&q=80', 'available', 'Equipment', true, false),
 ('Oral Surgery Instrument Set', 'oral-surgery-instrument-set', 'GD-OS-001', 'oral-surgery', 'coltene', 'Stainless steel extraction and suturing set in a sterilisable cassette.', 'Complete surgical set including elevators, forceps, retractors and needle holders, supplied in a perforated cassette for streamlined sterilization and tray setup.', array['German stainless steel','Sterilisable cassette','Balanced ergonomic handles','Corrosion resistant finish'], array['Extractions','Minor oral surgery','Suturing'], 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&q=80', 'available', 'Instrument', false, false),
 ('Ultrasonic Scaler with LED', 'ultrasonic-scaler-with-led', 'GD-PD-001', 'preventive-dentistry', 'woodpecker', 'Auto-tuning piezo scaler with LED handpiece and detachable tips.', 'Piezoelectric scaler with automatic frequency tracking for consistent power on tooth surfaces, an LED handpiece for visibility and a full tip range for scaling, perio and endo.', array['Automatic frequency tracking','LED handpiece','Detachable sterilisable handpiece','Scaling, perio and endo tips'], array['Scaling and polishing','Periodontal therapy','Calculus removal'], 'https://images.unsplash.com/photo-1606265752439-1f18756aa8ed?w=1200&q=80', 'available', 'Equipment', true, false),
 ('Dental Laboratory Micromotor', 'dental-laboratory-micromotor', 'GD-LB-001', 'laboratory', 'nsk', 'Brushless lab micromotor with 50,000 rpm handpiece and control box.', 'High torque brushless micromotor for trimming, finishing and polishing prosthetic work, with forward and reverse rotation and fine speed control.', array['Up to 50,000 rpm','Brushless motor','Forward and reverse','Foot pedal control'], array['Prosthetic finishing','Model trimming','Denture adjustment'], 'https://images.unsplash.com/photo-1588776814546-ec7d1d2b4b6a?w=1200&q=80', 'available', 'Equipment', false, false)
) as p(name, slug, sku, cat_slug, brand_slug, short_description, description, features, applications, image_url, availability, product_type, is_featured, is_new)
join public.categories c on c.slug = p.cat_slug
join public.brands b on b.slug = p.brand_slug;

-- Product images
insert into public.product_images (product_id, image_url, alt_text, sort_order)
select pr.id, i.url, pr.name, i.ord
from (values
 ('dental-treatment-unit-pro', 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1400&q=80', 0),
 ('dental-treatment-unit-pro', 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1400&q=80', 1),
 ('high-speed-air-turbine-handpiece', 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1400&q=80', 0),
 ('high-speed-air-turbine-handpiece', 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=1400&q=80', 1),
 ('class-b-vacuum-autoclave-23l', 'https://images.unsplash.com/photo-1583912267550-d6c2ac3196c0?w=1400&q=80', 0),
 ('digital-intraoral-x-ray-sensor', 'https://images.unsplash.com/photo-1579165466949-3180a3d056d5?w=1400&q=80', 0),
 ('endo-motor-with-apex-locator', 'https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?w=1400&q=80', 0),
 ('ultrasonic-scaler-with-led', 'https://images.unsplash.com/photo-1606265752439-1f18756aa8ed?w=1400&q=80', 0)
) as i(slug, url, ord)
join public.products pr on pr.slug = i.slug;

-- Product specifications
insert into public.product_specifications (product_id, spec_key, spec_value, sort_order)
select pr.id, s.k, s.v, s.ord
from (values
 ('dental-treatment-unit-pro', 'Power supply', '220-240V / 50Hz', 0),
 ('dental-treatment-unit-pro', 'Chair load capacity', '135 kg', 1),
 ('dental-treatment-unit-pro', 'Operating light', 'LED, 8,000-30,000 lux', 2),
 ('dental-treatment-unit-pro', 'Warranty', '2 years', 3),
 ('high-speed-air-turbine-handpiece', 'Rotation speed', '380,000 rpm', 0),
 ('high-speed-air-turbine-handpiece', 'Spray', 'Quadruple water spray', 1),
 ('high-speed-air-turbine-handpiece', 'Connection', '2 hole / 4 hole', 2),
 ('class-b-vacuum-autoclave-23l', 'Chamber volume', '23 litres', 0),
 ('class-b-vacuum-autoclave-23l', 'Sterilization class', 'Class B (EN 13060)', 1),
 ('class-b-vacuum-autoclave-23l', 'Cycle temperature', '121°C / 134°C', 2),
 ('digital-intraoral-x-ray-sensor', 'Resolution', 'Over 20 lp/mm', 0),
 ('digital-intraoral-x-ray-sensor', 'Sensor type', 'CMOS', 1),
 ('digital-intraoral-x-ray-sensor', 'Sizes', 'Size 1 and Size 2', 2),
 ('endo-motor-with-apex-locator', 'Torque range', '0.4 - 5.0 Ncm', 0),
 ('endo-motor-with-apex-locator', 'Speed range', '100 - 1000 rpm', 1),
 ('ultrasonic-scaler-with-led', 'Frequency', '28 kHz ± 3', 0),
 ('ultrasonic-scaler-with-led', 'Water pressure', '0.01 - 0.5 MPa', 1)
) as s(slug, k, v, ord)
join public.products pr on pr.slug = s.slug;

-- Blog
insert into public.blog_categories (name, slug) values
('Clinical Insights', 'clinical-insights'),
('Product Updates', 'product-updates'),
('Practice Management', 'practice-management'),
('Company News', 'company-news');

insert into public.blog_posts (title, slug, excerpt, content, cover_image_url, author, category_id, published_at, is_published)
select p.title, p.slug, p.excerpt, p.content, p.cover, p.author, bc.id, p.published, true
from (values
 ('Choosing the Right Autoclave for Your Dental Clinic', 'choosing-the-right-autoclave', 'Class B, Class N or Class S? A practical guide to selecting a steriliser that matches your caseload and instrument mix.',
  E'Sterilization is the backbone of a safe dental practice. The class of autoclave you choose determines which instruments you can safely process.\n\nClass N units handle solid, unwrapped instruments only. Class S covers a manufacturer-defined range. Class B units use a fractionated pre-vacuum cycle and can process hollow, porous and wrapped loads, which includes handpieces and surgical kits.\n\nFor a clinic performing surgery, endodontics or implantology, a Class B unit with cycle documentation is the safer long term investment. Size the chamber to your busiest day, not your average one, and plan for an ultrasonic cleaner upstream of the autoclave.',
  'https://images.unsplash.com/photo-1583912267550-d6c2ac3196c0?w=1400&q=80', 'Garg Dental Clinical Team', 'clinical-insights', now() - interval '9 days'),
 ('Setting Up a New Dental Clinic in Nepal: A Checklist', 'setting-up-a-new-dental-clinic-in-nepal', 'From site planning and compressor sizing to sterilization workflow, here is the practical sequence we follow with new clinics.',
  E'Opening a clinic is a sequence of dependencies. Get the order right and installation takes days instead of weeks.\n\nStart with the room layout and plumbing, then electrical load and the compressor and suction room. Only once the utilities are confirmed should the treatment unit be positioned and installed.\n\nPlan a one-way sterilization workflow from dirty to clean, and budget for consumables for the first three months. Our team supports site survey, installation, commissioning and staff training across Nepal.',
  'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1400&q=80', 'Garg Dental Projects Team', 'practice-management', now() - interval '21 days'),
 ('Digital Radiography: What Changes in Daily Practice', 'digital-radiography-what-changes', 'Moving from film to sensors reduces dose and waiting time, but it also changes how you position, store and share images.',
  E'Digital sensors shorten the diagnostic loop. An image appears in seconds, which means the patient is still in the chair when treatment is explained.\n\nDose reduction is significant compared with conventional film, and there is no chemistry or darkroom to maintain. The trade-offs are sensor handling, infection control sleeves and a reliable backup routine for the image database.\n\nTrain the whole team on positioning holders. Consistent geometry matters more for diagnostic quality than any software enhancement.',
  'https://images.unsplash.com/photo-1579165466949-3180a3d056d5?w=1400&q=80', 'Garg Dental Clinical Team', 'clinical-insights', now() - interval '35 days'),
 ('Garg Dental Expands Nationwide Service Coverage', 'garg-dental-expands-service-coverage', 'New service engineers and a larger spare parts inventory reduce downtime for clinics outside the Kathmandu Valley.',
  E'Equipment downtime costs a clinic more than the repair itself. To reduce it, we have expanded our field service team and increased spare part stock for the equipment we supply.\n\nPreventive maintenance contracts now include scheduled visits, calibration checks and priority response. Clinics outside the Kathmandu Valley benefit most from the shorter turnaround.\n\nContact our support desk to review a maintenance plan for your practice.',
  'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1400&q=80', 'Garg Dental', 'company-news', now() - interval '48 days')
) as p(title, slug, excerpt, content, cover, author, cat_slug, published)
join public.blog_categories bc on bc.slug = p.cat_slug;

-- Resources
insert into public.resources (title, slug, description, resource_type, file_url, thumbnail_url, is_published) values
('Garg Dental Master Catalogue 2026', 'master-catalogue-2026', 'Complete product catalogue covering equipment, instruments and consumables.', 'catalogue', 'https://www.africau.edu/images/default/sample.pdf', 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=900&q=80', true),
('Clinic Setup Planning Guide', 'clinic-setup-planning-guide', 'Room layout, utilities and equipment checklist for planning a new dental clinic.', 'guide', 'https://www.africau.edu/images/default/sample.pdf', 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=900&q=80', true),
('Sterilization Workflow Poster', 'sterilization-workflow-poster', 'Printable one-way sterilization workflow chart for your instrument processing room.', 'brochure', 'https://www.africau.edu/images/default/sample.pdf', 'https://images.unsplash.com/photo-1583912267550-d6c2ac3196c0?w=900&q=80', true),
('Handpiece Care and Maintenance', 'handpiece-care-and-maintenance', 'Daily lubrication, cleaning and autoclaving steps that extend handpiece service life.', 'guide', 'https://www.africau.edu/images/default/sample.pdf', 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=900&q=80', true),
('Digital Imaging Brochure', 'digital-imaging-brochure', 'Overview of intraoral sensors, portable X-ray units and imaging software options.', 'brochure', 'https://www.africau.edu/images/default/sample.pdf', 'https://images.unsplash.com/photo-1579165466949-3180a3d056d5?w=900&q=80', true);

-- Website content
update public.website_content set value = v.value from (values
 ('about','intro','Garg Dental Pvt. Ltd. is a Nepal-based supplier of dental equipment, instruments, consumables and complete clinic solutions, serving practices, hospitals and dental colleges nationwide.'),
 ('about','story','Founded to close the gap between global dental technology and clinics in Nepal, Garg Dental has grown from a small instruments supplier into a full-service partner covering supply, installation, training and after-sales service.'),
 ('about','mission','To make dependable, modern dental technology accessible to every practice in Nepal, backed by service that keeps clinics running.'),
 ('about','vision','To be the most trusted dental partner in Nepal, recognised for product quality, clinical knowledge and after-sales support.'),
 ('about','values','Integrity in every transaction. Clinical accuracy over sales talk. Long-term service relationships. Fair, transparent pricing.'),
 ('about','why_choose','Authorised brand partnerships, genuine products, in-house trained service engineers, spare part availability and end-to-end clinic setup support.'),
 ('about','capability','Site survey and planning, equipment supply, installation and commissioning, staff training, preventive maintenance and warranty support.'),
 ('contact','phone','01-4536276'),
('contact','email','info@gargdental.com.np'),
('contact','address','127 Gairidhara Road, Kathmandu 44600, Nepal'),
('contact','hours','Sunday to Friday, 9:00 AM - 6:00 PM'),
('contact','map_embed_url','https://www.google.com/maps?q=Garg%20Dental%20Pvt.%20Ltd.%2C%20127%20Gairidhara%20Road%2C%20Kathmandu%2044600%2C%20Nepal&z=17&output=embed'),
 ('social','facebook','https://facebook.com'),
 ('social','instagram','https://instagram.com'),
 ('social','linkedin','https://linkedin.com'),
 ('stats','years_experience','15'),
 ('stats','products_count','500'),
 ('stats','brands_count','25'),
 ('stats','customers_served','1200'),
 ('footer','tagline','Advancing dentistry in Nepal with dependable equipment, genuine consumables and service you can rely on.'),
 ('footer','copyright','© Garg Dental Pvt. Ltd. All rights reserved.')
) as v(section, key, value)
where website_content.section = v.section and website_content.key = v.key;

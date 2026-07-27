/*
  # Add Granule Box Product to Home Collection

  1. New Product
    - Add "Ceara de nisip Granule Box" product to Home Collection
    - Include all product details, descriptions, and features
    - Set up proper images array with uploaded photos
    - Configure pricing and product specifications

  2. Product Details
    - Name: Ceara de nisip "Granule Box" 750g + 10 fitile | Lumanare Perlata | Cadou | Decor
    - Price: 98 Lei
    - Category: Home Collection
    - Complete Romanian descriptions
    - Features and benefits
    - Product images from uploads
*/

-- Insert the new Granule Box product
INSERT INTO products (
  name, 
  slug, 
  price, 
  rating, 
  reviews, 
  category_id, 
  category, 
  description, 
  long_description, 
  features, 
  images, 
  tags, 
  in_stock
) VALUES (
  'Ceara de nisip "Granule Box" 750g + 10 fitile | Lumanare Perlata | Cadou | Decor',
  'granule-box-750g',
  98.00,
  4.9,
  85,
  (SELECT id FROM product_categories WHERE slug = 'home-collection'),
  'Home Collection',
  'Ceara de nisip, cunoscuta și sub numele de lumanare perlata, lumanare pudra, praf de lumanare sau perle de lumanare. Textura sa perlata și granulata este perfecta pentru crearea unor lumanari albe elegante, pentru a oferi ca si cadou sau pentru realizarea unui decor unic si relaxant. Nisipul nostru pentru lumânări este absolut inodor, oferind o soluție pură și fără parfum pentru cei care preferă o atmosferă naturală și nealterată. - Pachetul contine: -Ceara de nisip si fitil',
  'Cutia de granule conține 750 grame de ceară de nisip, cu un volum de 1.34 litri si 10 fitile ca și cadou.

Lungimea fiecarei fitil este de 6 cm difera doar groasimea lor:

Fitilurile MICI: ideale pentru vaze cu un diametru de 8 cm mai mari.
Fitilurile MEDII: recomandate pentru vaze cu un diametru de 10 cm și mai mari.
Fitilurile MARI: potrivite pentru vaze cu un diametru de 13 cm și mai mari.

-Avantaje:

Ceara pe bază de plante este un produs 100% vegetal.
Ceara naturală din palmier este inodoră, astfel încât poți folosi oricând parfumul tău preferat pentru lumânări.
Îți permite să creezi și să aprinzi mai multe lumânări simultan fără a te îngrijora de mirosuri nedorite.
Ceara naturală și care arde curat te ajută să reumpli și să reutilizezi recipientele existente pentru a reduce risipa.
Flacăra este conținută în interiorul vasului, iar loviturile accidentale vor face ca granulele de ceară să se sfărâme și să stingă focul.',
  '[
    "750g ceară de nisip 100% vegetală",
    "10 fitile incluse (3 mărimi diferite)",
    "Volum: 1.34 litri",
    "Inodor - perfect pentru parfumuri personalizate",
    "Arde curat și uniform",
    "Reutilizabil și ecologic",
    "Siguranță sporită - granulele sting focul la impact",
    "Ideal pentru cadouri și decor"
  ]'::jsonb,
  '[
    "/Photoroom-20241102_214827.webp",
    "/Photoroom-20241106_205829.webp", 
    "/Photoroom-20241106_211300.webp",
    "/Photoroom-20241107_202632.webp",
    "/photoshoot-image (11).webp"
  ]'::jsonb,
  '["Bestseller", "Eco-Friendly", "Gift Ready", "Natural"]'::jsonb,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  rating = EXCLUDED.rating,
  reviews = EXCLUDED.reviews,
  category_id = EXCLUDED.category_id,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  long_description = EXCLUDED.long_description,
  features = EXCLUDED.features,
  images = EXCLUDED.images,
  tags = EXCLUDED.tags,
  in_stock = EXCLUDED.in_stock,
  updated_at = now();
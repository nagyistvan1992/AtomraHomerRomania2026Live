/*
  # Add Events Product - 4.5kg Ceara de nisip

  1. New Product
    - Add large 4.5kg wax sand product to Events Collection
    - Include sale pricing (original 410 Lei, now 380 Lei)
    - Add uploaded photos with last photo as main image
    - Complete product information for events and decoration

  2. Product Details
    - Name: Ceara de nisip 4.5 kg + 60fitile cadou | Lumanare perlata | Idei decor eveniment
    - Category: Events Collection
    - Price: 380 Lei (on sale from 410 Lei)
    - Complete description and features
*/

-- Insert the new 4.5kg Events product
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
  'Ceara de nisip 4.5 kg + 60fitile cadou | Lumanare perlata | Idei decor eveniment',
  'ceara-nisip-4-5kg-evenimente',
  380.00,
  4.9,
  124,
  (SELECT id FROM product_categories WHERE slug = 'events-collection'),
  'Events Collection',
  'Ceara de nisip, cunoscuta și sub numele de lumanare perlata, lumanare pudra, praf de lumanare sau perle de lumanare. Textura sa perlata și granulata este perfecta pentru crearea unor lumanari albe elegante, pentru a oferi ca si cadou sau pentru realizarea unui decor pentru eveniment special

Nisipul nostru pentru lumânări este absolut inodor, oferind o soluție pură și fără parfum pentru cei care preferă o atmosferă naturală și nealterată.

Pachetul contine: Ceara de nisip si fitil',
  'Un sac conține 4,5 KG de ceară de nisip, volumul de 8 litri.

Lungimea fiecarei fitil este de 6 cm difera doar groasimea lor:

Fitilurile MICI: ideale pentru vaze cu un diametru de 8 cm mai mari.
Fitilurile MEDII: recomandate pentru vaze cu un diametru de 10 cm și mai mari.
Fitilurile MARI: potrivite pentru vaze cu un diametru de 13 cm și mai mari.

Pentru a minimiza risipa cât mai mult posibil, folosim pungi de hârtie maro simple, reutilizabile și compostabile, pentru ceara noastră de nisip.

-Avantaje:

Ceara pe bază de plante este un produs 100% vegetal.
Ceara naturală din palmier este inodoră, astfel încât poți folosi oricând parfumul tău preferat pentru lumânări.
Îți permite să creezi și să aprinzi mai multe lumânări simultan fără a te îngrijora de mirosuri nedorite.
Ceara naturală și care arde curat te ajută să reumpli și să reutilizezi recipientele existente pentru a reduce risipa.
Flacăra este conținută în interiorul vasului, iar loviturile accidentale vor face ca granulele de ceară să se sfărâme și să stingă focul.',
  '[
    "4.5 KG ceară de nisip premium (8 litri volum)",
    "60 fitile cadou incluse (3 mărimi diferite)",
    "Perfect pentru evenimente și decoruri speciale",
    "100% vegetal și natural",
    "Inodor - ideal pentru parfumuri personalizate",
    "Arde curat și uniform",
    "Ambalaj eco-friendly din hârtie compostabilă",
    "Siguranță sporită - granulele sting focul la impact",
    "Reutilizabil și sustenabil",
    "Ideal pentru nunți, petreceri și evenimente corporative"
  ]'::jsonb,
  '[
    "/Screenshot 2024-06-15 172309.jpg.webp",
    "/7_Chameleon-Sand-Candles_photo-by-Red-Eclectic.webp",
    "/CandleSand-6.webp",
    "/Chameleon-Sand-Candles-wedding-ceremony_photo-by-red-eclectic-1170x780.webp",
    "/il_1140xN.3978503349_e86a.webp"
  ]'::jsonb,
  '["Sale", "Events", "Bulk", "Wedding", "Decoration", "Professional", "Eco-Friendly"]'::jsonb,
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
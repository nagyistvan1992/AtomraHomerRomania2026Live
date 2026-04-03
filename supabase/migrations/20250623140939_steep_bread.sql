/*
  # Add Pachet Essenza Product

  1. New Product
    - `Lumanare Perlata Pachet Essenza |150g+3fitile | Pahar Decorativ |Lumanare`
    - Price: 39 Lei
    - Category: Home Collection
    - Complete Romanian descriptions
    - All uploaded photos with last photo as main image

  2. Product Details
    - 150g wax sand + 3 wicks + decorative glass
    - Essential package for intimate atmosphere
    - Complete wick size information
    - All eco-friendly advantages listed

  3. Images
    - abc3462f-4169-41e2-bec4-63572c2990a5.webp (main image - last uploaded)
    - 20241027_114350.webp
    - 20241027_114455.webp  
    - 20241027_114631.webp
*/

-- Insert the new Pachet Essenza product
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
  'Lumanare Perlata Pachet Essenza |150g+3fitile | Pahar Decorativ |Lumanare',
  'pachet-essenza-150g',
  39.00,
  4.8,
  67,
  (SELECT id FROM product_categories WHERE slug = 'home-collection'),
  'Home Collection',
  'Pachet Essenza

Creează o atmosferă intimă și relaxantă cu Pachetul Essenza, pachetul nostru esențial. Conține tot ce ai nevoie pentru o experiență simplă, dar rafinată: 150g de ceară de nisip eco-friendly, 3 fitile și un pahar decorativ mic, perfect pentru a adăuga o notă de eleganță discretă în orice spațiu.

Pachetul contine: Ceara de nisip, fitil si pahar decorativ',
  'Lungimea fiecarei fitil este de 6 cm difera doar groasimea lor:

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
    "150g ceară de nisip eco-friendly",
    "3 fitile incluse (mărimi diferite)",
    "Pahar decorativ inclus",
    "Atmosferă intimă și relaxantă",
    "100% vegetal și natural",
    "Inodor - perfect pentru parfumuri personalizate",
    "Arde curat și uniform",
    "Siguranță sporită",
    "Ideal pentru spații mici"
  ]'::jsonb,
  '[
    "/abc3462f-4169-41e2-bec4-63572c2990a5.webp",
    "/20241027_114350.webp",
    "/20241027_114455.webp",
    "/20241027_114631.webp"
  ]'::jsonb,
  '["Essential", "Eco-Friendly", "Intimate", "Starter Pack"]'::jsonb,
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
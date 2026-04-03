-- Insert the new Pachet Splendore product
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
  'Lumanare Perlata Pachet Splendore | 250g+5fitile | Pahar Decorativ | Lumanare',
  'pachet-splendore-250g',
  59.00,
  4.9,
  92,
  (SELECT id FROM product_categories WHERE slug = 'home-collection'),
  'Home Collection',
  'Pachetul Splendore

Pentru cei care își doresc mai mult, Pachetul Splendore oferă o experiență versatilă și de impact. Conține 250g de ceară de nisip, 5 fitile și un pahar decorativ la alegere, astfel încât să poți personaliza atmosfera după bunul plac. Perfect pentru momente speciale și un decor sofisticat.

Pachetul contine: Ceara de nisip, fitil, pahar decorativ',
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
    "250g ceară de nisip premium",
    "5 fitile incluse (mărimi diferite)",
    "Pahar decorativ la alegere",
    "Experiență versatilă și de impact",
    "100% vegetal și natural",
    "Inodor - perfect pentru parfumuri personalizate",
    "Arde curat și uniform",
    "Siguranță sporită",
    "Perfect pentru momente speciale",
    "Decor sofisticat"
  ]'::jsonb,
  '[
    "/photoshoot-image (11).png",
    "/CandleSand_8294e62e-8677-4b5e-82bd-d922ba18f757.jpg",
    "/CopyofUntitledDesign_1200x1200.jpg",
    "/il_fullxfull.5794329172_3eft.jpg"
  ]'::jsonb,
  '["Premium", "Versatile", "Sophisticated", "Special Moments"]'::jsonb,
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
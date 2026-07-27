/*
  # Update Home Collection Product Names

  1. Updates
    - Update existing Home Collection products with Romanian names from the images
    - Keep all other product data intact
    - Only change the product names to match the uploaded screenshots

  2. Products Updated
    - Vanilla Candle → "Ceara de nisip 'Granule Box' 750g + 10 fitile | Lumanare Perlata | Cadou | Decor"
    - Wild Fig Candle → "Lumanare Perlata Pachet Essenza |150g+3fitile | Pahar Decorativ | Lumanare"
    - Amber Candle → "Lumanare Perlata Pachet Splendore |250g+5fitile |Pahar Decorativ | Lumanare"
    - Gift Edition → "Pahar sticla unic pictat manual | Lumanare perlata | Lumanare decorativa | Cadou"

  3. Price Updates
    - Update prices to match the images
*/

-- Update Home Collection products with Romanian names and prices from the images
UPDATE products SET
  name = 'Ceara de nisip "Granule Box" 750g + 10 fitile | Lumanare Perlata | Cadou | Decor',
  price = 98.00,
  updated_at = now()
WHERE slug = 'vanilla-candle';

UPDATE products SET
  name = 'Lumanare Perlata Pachet Essenza |150g+3fitile | Pahar Decorativ | Lumanare',
  price = 39.00,
  updated_at = now()
WHERE slug = 'wild-fig-candle';

UPDATE products SET
  name = 'Lumanare Perlata Pachet Splendore |250g+5fitile |Pahar Decorativ | Lumanare',
  price = 59.00,
  updated_at = now()
WHERE slug = 'amber-candle';

UPDATE products SET
  name = 'Pahar sticla unic pictat manual | Lumanare perlata | Lumanare decorativa | Cadou',
  price = 70.00,
  updated_at = now()
WHERE slug = 'gift-edition-candle';
/*
  # Update Product Names for Home Collection

  1. Changes
    - Update product names in Home Collection to match the uploaded image
    - Update prices to match the image
    - Keep all other product data intact

  2. Products to Update
    - Ceara de nisip "Granule Box" 750g + 10 fitile | Lumanare Perlata | Cadou | Decor - 98,00 lei
    - Lumanare Perlata Pachet Essenza | 150g+5fitile | Pahar Decorativ | Lumanare - 39,00 lei  
    - Lumanare Perlata Pachet Splendore | 250g+5fitile | Pahar Decorativ | Lumanare - 59,00 lei
    - Pahar sticla unic pictat manual | Lumanare perlata | Lumanare decorativa | Cadou - 70,00 lei
*/

-- Update the first product (vanilla-candle)
UPDATE products 
SET 
  name = 'Ceara de nisip "Granule Box" 750g + 10 fitile | Lumanare Perlata | Cadou | Decor',
  price = 98.00
WHERE slug = 'vanilla-candle';

-- Update the second product (wild-fig-candle)  
UPDATE products 
SET 
  name = 'Lumanare Perlata Pachet Essenza | 150g+5fitile | Pahar Decorativ | Lumanare',
  price = 39.00
WHERE slug = 'wild-fig-candle';

-- Update the third product (amber-candle)
UPDATE products 
SET 
  name = 'Lumanare Perlata Pachet Splendore | 250g+5fitile | Pahar Decorativ | Lumanare', 
  price = 59.00
WHERE slug = 'amber-candle';

-- Update the fourth product (gift-edition-candle)
UPDATE products 
SET 
  name = 'Pahar sticla unic pictat manual | Lumanare perlata | Lumanare decorativa | Cadou',
  price = 70.00
WHERE slug = 'gift-edition-candle';
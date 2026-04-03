/*
  # Create 3 Main Product Categories

  1. New Categories
    - `Acasa` (Home) - for home collection products
    - `Evenimente` (Events) - for events collection products  
    - `Accesorii` (Accessories) - for accessories products

  2. Updates
    - Clear existing categories
    - Insert the 3 main categories with Romanian names
    - Update existing products to use the new category structure

  3. Category Structure
    - Each category has Romanian name, English slug, and description
    - Sort order for proper display
    - Proper images for each category
*/

-- First, clear existing categories
DELETE FROM product_categories;

-- Insert the 3 main categories
INSERT INTO product_categories (name, slug, description, image, sort_order) VALUES
(
  'Acasa',
  'acasa',
  'Transformă-ți spațiul de locuit cu colecția noastră de lumânări emblematice. Fiecare parfum este creat cu grijă pentru a crea atmosfera perfectă pentru casa ta.',
  '/Candlera-14_88c60123-27a0-4574-9601-425b95bacadf.jpg',
  1
),
(
  'Evenimente',
  'evenimente',
  'Perfecte pentru ocazii speciale și momente memorabile. Creează atmosfera ideală pentru orice sărbătoare cu colecțiile noastre curate pentru evenimente.',
  '/Chameleon-Sand-Candles-wedding-ceremony_photo-by-red-eclectic-1170x780.jpg',
  2
),
(
  'Accesorii',
  'accesorii',
  'Unelte și recipiente esențiale pentru a-ți îmbunătăți experiența cu lumânările. Tot ce ai nevoie pentru a întreține și a te bucura de lumânările Atomra.',
  '/Screenshot 2024-07-07 111108.png',
  3
);

-- Update existing products to use the new categories
UPDATE products 
SET 
  category_id = (SELECT id FROM product_categories WHERE slug = 'acasa'),
  category = 'Acasa'
WHERE category IN ('Home Collection', 'home-collection');

UPDATE products 
SET 
  category_id = (SELECT id FROM product_categories WHERE slug = 'evenimente'),
  category = 'Evenimente'
WHERE category IN ('Events Collection', 'events-collection');

UPDATE products 
SET 
  category_id = (SELECT id FROM product_categories WHERE slug = 'accesorii'),
  category = 'Accesorii'
WHERE category IN ('Accessories', 'accessories');
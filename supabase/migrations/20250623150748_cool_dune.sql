/*
  # Fix Product Categories and Assignments

  1. Updates
    - Update category names to match what the website expects
    - Ensure products are properly assigned to correct categories
    - Fix the category mapping for proper display

  2. Categories
    - "Acasa" → "Home Collection" (for website compatibility)
    - "Evenimente" → "Events Collection" (for website compatibility)  
    - "Accesorii" → "Accessories" (for website compatibility)

  3. Product Assignments
    - Granule Box, Essenza, Splendore → Home Collection
    - 4.5kg product → Events Collection
*/

-- Update category names to match what the website expects
UPDATE product_categories 
SET 
  name = 'Home Collection',
  slug = 'home-collection'
WHERE slug = 'acasa';

UPDATE product_categories 
SET 
  name = 'Events Collection', 
  slug = 'events-collection'
WHERE slug = 'evenimente';

UPDATE product_categories 
SET 
  name = 'Accessories',
  slug = 'accessories'
WHERE slug = 'accesorii';

-- Update all products to use the correct category names
UPDATE products 
SET 
  category_id = (SELECT id FROM product_categories WHERE slug = 'home-collection'),
  category = 'Home Collection'
WHERE slug IN ('granule-box-750g', 'pachet-essenza-150g', 'pachet-splendore-250g');

UPDATE products 
SET 
  category_id = (SELECT id FROM product_categories WHERE slug = 'events-collection'),
  category = 'Events Collection'
WHERE slug = 'ceara-nisip-4-5kg-evenimente';

-- Verify the updates
-- SELECT p.name, p.category, pc.name as category_name 
-- FROM products p 
-- LEFT JOIN product_categories pc ON p.category_id = pc.id;
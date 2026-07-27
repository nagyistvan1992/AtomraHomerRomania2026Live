/*
  # Fix Corrupt Photos for Splendore and Essenza Products

  1. Updates
    - Update Pachet Splendore product images with working photos
    - Update Pachet Essenza product images with working photos
    - Use only verified working image files from the uploads

  2. Image Updates
    - Splendore: Use the uploaded photos that are working
    - Essenza: Use the uploaded photos that are working
    - Remove any corrupted or non-working image references
*/

-- Update Pachet Splendore product with working images
UPDATE products 
SET 
  images = '[
    "/Untitled (8).webp",
    "/20241027_114934.webp",
    "/20241027_115048.webp", 
    "/20241027_115201.webp"
  ]'::jsonb,
  updated_at = now()
WHERE slug = 'pachet-splendore-250g';

-- Update Pachet Essenza product with working images
UPDATE products 
SET 
  images = '[
    "/abc3462f-4169-41e2-bec4-63572c2990a5.webp",
    "/20241027_114350.webp",
    "/20241027_114455.webp",
    "/20241027_114631.webp"
  ]'::jsonb,
  updated_at = now()
WHERE slug = 'pachet-essenza-150g';

-- Verify the updates
-- SELECT name, images FROM products WHERE slug IN ('pachet-splendore-250g', 'pachet-essenza-150g');
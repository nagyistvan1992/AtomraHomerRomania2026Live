/*
  # Restore Original Product Images

  1. Changes
    - Restore Pachet Splendore with its original uploaded images
    - Restore Pachet Essenza with its original uploaded images
    - Use the correct image files that were originally uploaded

  2. Image Restoration
    - Pachet Splendore: Use Untitled (8).webp and related images
    - Pachet Essenza: Use abc3462f-4169-41e2-bec4-63572c2990a5.webp and related images
*/

-- Restore Pachet Splendore with its original images
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

-- Restore Pachet Essenza with its original images
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

-- Verify the restoration
-- SELECT name, images FROM products WHERE slug IN ('pachet-splendore-250g', 'pachet-essenza-150g');
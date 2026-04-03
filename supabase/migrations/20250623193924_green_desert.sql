/*
  # Fix Broken Product Images

  1. Updates
    - Replace broken image paths with working images from public folder
    - Use images that are confirmed to exist and work
    - Update both Splendore and Essenza products

  2. Image Strategy
    - Use the main product photos that are working
    - Ensure all image paths are correct
    - Remove any corrupted or non-existent image references
*/

-- Update Pachet Splendore with working images
UPDATE products 
SET 
  images = '[
    "/photoshoot-image (11).webp",
    "/CandleSand_8294e62e-8677-4b5e-82bd-d922ba18f757.jpg",
    "/CopyofUntitledDesign_1200x1200.jpg",
    "/il_fullxfull.5794329172_3eft.jpg"
  ]'::jsonb,
  updated_at = now()
WHERE slug = 'pachet-splendore-250g';

-- Update Pachet Essenza with working images
UPDATE products 
SET 
  images = '[
    "/photoshoot-image (11).webp",
    "/CandleSand_8294e62e-8677-4b5e-82bd-d922ba18f757.jpg",
    "/CopyofUntitledDesign_1200x1200.jpg",
    "/il_fullxfull.5794329172_3eft.jpg"
  ]'::jsonb,
  updated_at = now()
WHERE slug = 'pachet-essenza-150g';

-- Verify the updates
-- SELECT name, images FROM products WHERE slug IN ('pachet-splendore-250g', 'pachet-essenza-150g');
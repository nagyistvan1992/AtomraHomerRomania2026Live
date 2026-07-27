/*
  # Update Granule Box Main Photo

  1. Changes
    - Move the last photo to be the first (main) photo
    - Reorder the images array for the Granule Box product
    - Keep all other photos in the array

  2. Photo Order
    - Main photo: /photoshoot-image (11).webp (moved from last to first)
    - Keep other photos in sequence
*/

-- Update the Granule Box product to use the last photo as the main image
UPDATE products 
SET 
  images = '[
    "/photoshoot-image (11).webp",
    "/Photoroom-20241102_214827.webp",
    "/Photoroom-20241106_205829.webp", 
    "/Photoroom-20241106_211300.webp",
    "/Photoroom-20241107_202632.webp"
  ]'::jsonb,
  updated_at = now()
WHERE slug = 'granule-box-750g';
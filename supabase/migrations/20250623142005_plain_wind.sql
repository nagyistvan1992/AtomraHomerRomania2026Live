/*
  # Update Pachet Splendore Product Images

  1. Changes
    - Update the images array for the Pachet Splendore product
    - Set the last uploaded photo as the main image
    - Use the new product photos from the uploads

  2. Image Order
    - Main image: Untitled (8).webp (the last uploaded photo)
    - Additional images: 20241027_114934.webp, 20241027_115048.webp, 20241027_115201.webp
*/

-- Update the images for the Pachet Splendore product
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
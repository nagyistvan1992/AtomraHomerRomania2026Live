/*
  # Update Pachet Essenza Product Images

  1. Changes
    - Update the images array for the Pachet Essenza product
    - Set the last uploaded photo (Untitled (8) copy.webp) as the main image
    - Use the new product photos from the uploads

  2. Image Order
    - Main image: Untitled (8) copy.webp (the last uploaded photo)
    - Additional images: 20241027_114934 copy.webp, 20241027_115048 copy.webp, 20241027_115201 copy.webp
*/

-- Update the images for the Pachet Essenza product with new photos
UPDATE products 
SET 
  images = '[
    "/Untitled (8) copy.webp",
    "/20241027_114934 copy.webp",
    "/20241027_115048 copy.webp",
    "/20241027_115201 copy.webp"
  ]'::jsonb,
  updated_at = now()
WHERE slug = 'pachet-essenza-150g';
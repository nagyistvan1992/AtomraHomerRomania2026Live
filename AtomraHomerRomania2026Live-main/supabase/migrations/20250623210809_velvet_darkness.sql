/*
  # Update Pachet Splendore Product Images

  1. Changes
    - Update the images array for the Pachet Splendore product
    - Set the last uploaded photo (Untitled (7).webp) as the main image
    - Use the new product photos from the uploads

  2. Image Order
    - Main image: Untitled (7).webp (the last uploaded photo)
    - Additional images: 20241027_114350 copy.webp, 20241027_114455 copy.webp, 20241027_114631 copy.webp
*/

-- Update the images for the Pachet Splendore product with new photos
UPDATE products 
SET 
  images = '[
    "/Untitled (7).webp",
    "/20241027_114350 copy.webp",
    "/20241027_114455 copy.webp",
    "/20241027_114631 copy.webp"
  ]'::jsonb,
  updated_at = now()
WHERE slug = 'pachet-splendore-250g';
/*
  # Update Product Images

  1. Updates
    - Replace current product images with new uploaded photos
    - Set the first photo as the main product image
    - Update images for the "Ceara de nisip Granule Box" product

  2. Changes
    - Update images array for vanilla-candle product
    - Use the new product photos from the uploads
*/

-- Update the images for the "Ceara de nisip Granule Box" product (vanilla-candle slug)
UPDATE products 
SET 
  images = '[
    "/photoshoot-image (11).png",
    "/CandleSand_8294e62e-8677-4b5e-82bd-d922ba18f757.jpg", 
    "/CopyofUntitledDesign_1200x1200.jpg",
    "/il_fullxfull.5794329172_3eft.jpg"
  ]'::jsonb,
  updated_at = now()
WHERE slug = 'vanilla-candle';

-- Update the images for the second product (wild-fig-candle) if needed
UPDATE products 
SET 
  images = '[
    "/CopyofUntitledDesign_1200x1200.jpg",
    "/photoshoot-image (11).png",
    "/CandleSand_8294e62e-8677-4b5e-82bd-d922ba18f757.jpg"
  ]'::jsonb,
  updated_at = now()
WHERE slug = 'wild-fig-candle';

-- Update the images for the third product (amber-candle) if needed  
UPDATE products 
SET 
  images = '[
    "/il_fullxfull.5794329172_3eft.jpg",
    "/CandleSand_8294e62e-8677-4b5e-82bd-d922ba18f757.jpg",
    "/photoshoot-image (11).png"
  ]'::jsonb,
  updated_at = now()
WHERE slug = 'amber-candle';

-- Update the images for the fourth product (gift-edition-candle) if needed
UPDATE products 
SET 
  images = '[
    "/CandleSand_8294e62e-8677-4b5e-82bd-d922ba18f757.jpg",
    "/il_fullxfull.5794329172_3eft.jpg", 
    "/CopyofUntitledDesign_1200x1200.jpg"
  ]'::jsonb,
  updated_at = now()
WHERE slug = 'gift-edition-candle';
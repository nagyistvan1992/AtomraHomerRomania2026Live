/*
  # Add image_alt_texts column to products table

  1. Changes
    - Add `image_alt_texts` column to `products` table
    - Column type: jsonb (to store array of strings)
    - Default value: empty array
    - Nullable: true

  2. Security
    - No changes to RLS policies needed
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'image_alt_texts'
  ) THEN
    ALTER TABLE products ADD COLUMN image_alt_texts jsonb DEFAULT '[]'::jsonb;
  END IF;
END $$;
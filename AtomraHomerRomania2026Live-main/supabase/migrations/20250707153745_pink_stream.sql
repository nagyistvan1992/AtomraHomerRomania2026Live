/*
  # Fix Duplicate Products in Home Collection

  1. Changes
    - Remove duplicate products with the same slug
    - Keep only the most recent version of each product
    - Ensure unique products in each category

  2. Operations
    - Identify duplicates by slug
    - Delete older duplicates, keeping only the newest version
    - Maintain data integrity
*/

-- Find and delete duplicate products, keeping only the most recent version
WITH duplicates AS (
  SELECT 
    id,
    slug,
    ROW_NUMBER() OVER (PARTITION BY slug ORDER BY created_at DESC) as row_num
  FROM products
)
DELETE FROM products
WHERE id IN (
  SELECT id FROM duplicates WHERE row_num > 1
);

-- Verify the fix by checking for any remaining duplicates
-- This query should return 0 rows if the fix was successful
-- SELECT slug, COUNT(*) FROM products GROUP BY slug HAVING COUNT(*) > 1;
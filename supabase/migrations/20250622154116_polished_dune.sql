/*
  # Delete Home Collection Products

  1. Changes
    - Delete all products in the "Home Collection" category
    - This will make the home category empty when users click on it

  2. Security
    - Only affects products with category = 'Home Collection'
    - Does not affect other categories or product categories table
*/

-- Delete all products in the Home Collection category
DELETE FROM products 
WHERE category = 'Home Collection';

-- Verify deletion - this should return 0 products in Home Collection
-- SELECT COUNT(*) FROM products WHERE category = 'Home Collection';
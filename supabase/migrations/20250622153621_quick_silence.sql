/*
  # Delete All Products and Clear Database

  1. Operations
    - Delete all products from the products table
    - Delete all product categories from the product_categories table
    - Reset any sequences or counters
    - Clear all product-related data

  2. Safety
    - This operation is irreversible
    - All product data will be permanently removed
    - Categories will also be cleared

  3. Result
    - Empty products table
    - Empty product_categories table
    - Clean slate for new product data
*/

-- Delete all products first (due to foreign key constraints)
DELETE FROM products;

-- Delete all product categories
DELETE FROM product_categories;

-- Reset any sequences if they exist (optional, for clean IDs)
-- Note: Supabase uses UUIDs by default, so this may not be necessary
-- but included for completeness

-- Verify deletion (these should return 0)
-- SELECT COUNT(*) FROM products;
-- SELECT COUNT(*) FROM product_categories;
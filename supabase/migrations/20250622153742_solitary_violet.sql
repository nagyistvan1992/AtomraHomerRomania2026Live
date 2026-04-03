/*
  # Delete Specific Products from Home Collection

  1. Changes
    - Delete the 4 products shown in the Home Collection page
    - Remove products by their slugs to ensure accurate deletion
    - Keep the product_categories table intact

  2. Products to Delete
    - Lumânare Perlată Reîncărcabilă – Vanilie (vanilla-candle)
    - Lumânare Perlată Reîncărcabilă – Smochină Sălbatică (wild-fig-candle)
    - Lumânare Perlată Reîncărcabilă – Chihlimbar (amber-candle)
    - Lumânare Perlată Reîncărcabilă – Ediție Cadou (gift-edition-candle)
*/

-- Delete specific products by their slugs
DELETE FROM products 
WHERE slug IN (
  'vanilla-candle',
  'wild-fig-candle', 
  'amber-candle',
  'gift-edition-candle'
);

-- Verify deletion - these products should no longer exist
-- SELECT COUNT(*) FROM products WHERE slug IN ('vanilla-candle', 'wild-fig-candle', 'amber-candle', 'gift-edition-candle');
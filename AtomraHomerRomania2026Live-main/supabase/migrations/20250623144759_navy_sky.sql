/*
  # Update Product Long Description with Vertical Wick Format

  1. Changes
    - Update the long description for the Granule Box product
    - Format wick sizes in clean vertical rows
    - Maintain elegant and professional appearance
    - Improve readability and visual hierarchy

  2. Product Updated
    - Granule Box 750g product (slug: granule-box-750g)
    - Clean vertical formatting for wick types
    - Professional presentation
*/

-- Update the Granule Box product with vertical wick format
UPDATE products 
SET 
  long_description = 'Cutia de granule conține 750 grame de ceară de nisip, cu un volum de 1.34 litri si 10 fitile ca și cadou.

Lungimea fiecarei fitil este de 6 cm difera doar groasimea lor:

• Fitilurile MICI
  Ideale pentru vaze cu un diametru de 8 cm mai mari

• Fitilurile MEDII
  Recomandate pentru vaze cu un diametru de 10 cm și mai mari

• Fitilurile MARI
  Potrivite pentru vaze cu un diametru de 13 cm și mai mari

Avantaje:

Ceara pe bază de plante este un produs 100% vegetal. Ceara naturală din palmier este inodoră, astfel încât poți folosi oricând parfumul tău preferat pentru lumânări. Îți permite să creezi și să aprinzi mai multe lumânări simultan fără a te îngrijora de mirosuri nedorite. Ceara naturală și care arde curat te ajută să reumpli și să reutilizezi recipientele existente pentru a reduce risipa. Flacăra este conținută în interiorul vasului, iar loviturile accidentale vor face ca granulele de ceară să se sfărâme și să stingă focul.',
  updated_at = now()
WHERE slug = 'granule-box-750g';
/*
  # Update Splendore and Essenza Products with Vertical Wick Format

  1. Changes
    - Update Pachet Splendore product with vertical wick format
    - Update Pachet Essenza product with vertical wick format
    - Apply the same elegant formatting used in the 4.5kg product

  2. Products Updated
    - pachet-splendore-250g
    - pachet-essenza-150g
*/

-- Update the Pachet Splendore product with vertical wick format
UPDATE products 
SET 
  long_description = 'Lungimea fiecarei fitil este de 6 cm difera doar groasimea lor:

• Fitilurile MICI
  Ideale pentru vaze cu un diametru de 8 cm mai mari

• Fitilurile MEDII
  Recomandate pentru vaze cu un diametru de 10 cm și mai mari

• Fitilurile MARI
  Potrivite pentru vaze cu un diametru de 13 cm și mai mari

Avantaje:

Ceara pe bază de plante este un produs 100% vegetal. Ceara naturală din palmier este inodoră, astfel încât poți folosi oricând parfumul tău preferat pentru lumânări. Îți permite să creezi și să aprinzi mai multe lumânări simultan fără a te îngrijora de mirosuri nedorite. Ceara naturală și care arde curat te ajută să reumpli și să reutilizezi recipientele existente pentru a reduce risipa. Flacăra este conținută în interiorul vasului, iar loviturile accidentale vor face ca granulele de ceară să se sfărâme și să stingă focul.',
  updated_at = now()
WHERE slug = 'pachet-splendore-250g';

-- Update the Pachet Essenza product with vertical wick format
UPDATE products 
SET 
  long_description = 'Lungimea fiecarei fitil este de 6 cm difera doar groasimea lor:

• Fitilurile MICI
  Ideale pentru vaze cu un diametru de 8 cm mai mari

• Fitilurile MEDII
  Recomandate pentru vaze cu un diametru de 10 cm și mai mari

• Fitilurile MARI
  Potrivite pentru vaze cu un diametru de 13 cm și mai mari

Avantaje:

Ceara pe bază de plante este un produs 100% vegetal. Ceara naturală din palmier este inodoră, astfel încât poți folosi oricând parfumul tău preferat pentru lumânări. Îți permite să creezi și să aprinzi mai multe lumânări simultan fără a te îngrijora de mirosuri nedorite. Ceara naturală și care arde curat te ajută să reumpli și să reutilizezi recipientele existente pentru a reduce risipa. Flacăra este conținută în interiorul vasului, iar loviturile accidentale vor face ca granulele de ceară să se sfărâme și să stingă focul.',
  updated_at = now()
WHERE slug = 'pachet-essenza-150g';
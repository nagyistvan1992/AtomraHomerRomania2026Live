/*
  # Update 4.5kg Events Product Description

  1. Changes
    - Update long_description with professional formatting
    - Add proper enumeration for wick sizes
    - Improve overall presentation and readability
    - Make it more unique and professional

  2. Formatting Improvements
    - Better structure with clear sections
    - Professional bullet points
    - Enhanced readability
    - More compelling product presentation
*/

-- Update the 4.5kg Events product with professional description
UPDATE products 
SET 
  long_description = '## **Specificații Tehnice**

**Conținut:** Un sac conține **4,5 KG** de ceară de nisip premium, cu un volum total de **8 litri** - suficient pentru multiple decoruri spectaculoase.

**Bonus Inclus:** **60 de fitile cadou** în 3 mărimi profesionale pentru flexibilitate maximă în design.

---

## **Ghid Fitile Profesionale**

Lungimea fiecărui fitil este de **6 cm**, diferind doar prin grosime pentru adaptabilitate optimă:

### • **Fitile MICI** 
   *Ideale pentru vaze cu diametrul de 8 cm sau mai mari*
   
### • **Fitile MEDII** 
   *Recomandate pentru vaze cu diametrul de 10 cm și mai mari*
   
### • **Fitile MARI** 
   *Potrivite pentru vaze cu diametrul de 13 cm și mai mari*

---

## **Ambalaj Eco-Responsabil**

Pentru a minimiza impactul asupra mediului, folosim **pungi de hârtie maro** simple, **reutilizabile și 100% compostabile** pentru ceara noastră de nisip premium.

---

## **Avantaje Profesionale**

### ✓ **100% Natural & Vegetal**
Ceara pe bază de plante este un produs complet vegetal, fără adaosuri chimice.

### ✓ **Inodor & Personalizabil**
Ceara naturală din palmier este absolut inodoră, permițându-ți să folosești oricând parfumul preferat pentru lumânări.

### ✓ **Versatilitate Creativă**
Îți permite să creezi și să aprinzi mai multe lumânări simultan fără interferențe olfactive nedorite.

### ✓ **Sustenabilitate Maximă**
Ceara naturală care arde curat te ajută să reumpli și să reutilizezi recipientele existente, reducând dramatic risipa.

### ✓ **Siguranță Sporită**
Flacăra rămâne conținută în interiorul vasului, iar loviturile accidentale fac ca granulele de ceară să se sfărâme și să stingă automat focul.

---

## **Aplicații Profesionale**

**Perfect pentru:** Nunți elegante • Evenimente corporative • Decoruri festive • Instalații artistice • Ambientări premium • Ceremonii speciale',
  updated_at = now()
WHERE slug = 'ceara-nisip-4-5kg-evenimente';
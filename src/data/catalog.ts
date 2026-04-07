export interface CatalogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface CatalogProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  rating: number;
  reviews: number;
  category_id: string;
  category: string;
  category_slug: string;
  description: string;
  long_description: string;
  features: string[];
  images: string[];
  image_alt_texts: string[];
  tags: string[];
  in_stock: boolean;
  created_at: string;
  updated_at: string;
  stripe_price_id?: string;
  stripe_mode?: 'payment' | 'subscription';
}

export const catalogCategories: CatalogCategory[] = [
  {
    id: 'home-collection',
    name: 'Home Collection',
    slug: 'home-collection',
    description:
      'Transformă-ți spațiul de locuit cu colecția noastră de lumânări emblematice. Fiecare parfum este creat cu grijă pentru a crea atmosfera perfectă pentru casa ta.',
    image: '/home-category-home.webp',
    sort_order: 1,
    created_at: '2025-06-23T15:02:19.197935+00:00',
    updated_at: '2025-06-23T15:11:57.180308+00:00'
  },
  {
    id: 'events-collection',
    name: 'Events Collection',
    slug: 'events-collection',
    description:
      'Perfecte pentru ocazii speciale și momente memorabile. Creează atmosfera ideală pentru orice sărbătoare cu colecțiile noastre curate pentru evenimente.',
    image: '/Chameleon-Sand-Candles-wedding-ceremony_photo-by-red-eclectic-1170x780.jpg',
    sort_order: 2,
    created_at: '2025-06-23T15:02:19.197935+00:00',
    updated_at: '2025-06-23T15:11:57.180308+00:00'
  },
  {
    id: 'accessories',
    name: 'Accessories',
    slug: 'accessories',
    description:
      'Unelte și recipiente esențiale pentru a-ți îmbunătăți experiența cu lumânările. Tot ce ai nevoie pentru a întreține și a te bucura de lumânările Atomra.',
    image: '/accessories-category.webp',
    sort_order: 3,
    created_at: '2025-06-23T15:02:19.197935+00:00',
    updated_at: '2025-06-23T15:11:57.180308+00:00'
  }
];

export const catalogProducts: CatalogProduct[] = [
  {
    id: 'granule-box-750g',
    name: 'Ceara de nisip "Granule Box" 750g + 10 fitile | Lumanare Perlata | Cadou | Decor',
    slug: 'granule-box-750g',
    price: 98,
    rating: 4.9,
    reviews: 85,
    category_id: 'home-collection',
    category: 'Home Collection',
    category_slug: 'home-collection',
    description:
      'Ceara de nisip, cunoscuta și sub numele de lumanare perlata, lumanare pudra, praf de lumanare sau perle de lumanare. Textura sa perlata și granulata este perfecta pentru crearea unor lumanari albe elegante, pentru a oferi ca si cadou sau pentru realizarea unui decor unic si relaxant. Nisipul nostru pentru lumânări este absolut inodor, oferind o soluție pură și fără parfum pentru cei care preferă o atmosferă naturală și nealterată. - Pachetul contine: -Ceara de nisip si fitil',
    long_description:
      'Cutia de granule conține 750 grame de ceară de nisip, cu un volum de 1.34 litri si 10 fitile ca și cadou.\n\nLungimea fiecarei fitil este de 6 cm difera doar groasimea lor:\n\n• Fitilurile MICI\n  Ideale pentru vaze cu un diametru de 8 cm mai mari\n\n• Fitilurile MEDII\n  Recomandate pentru vaze cu un diametru de 10 cm și mai mari\n\n• Fitilurile MARI\n  Potrivite pentru vaze cu un diametru de 13 cm și mai mari\n\nAvantaje:\n\nCeara pe bază de plante este un produs 100% vegetal. Ceara naturală din palmier este inodoră, astfel încât poți folosi oricând parfumul tău preferat pentru lumânări. Îți permite să creezi și să aprinzi mai multe lumânări simultan fără a te îngrijora de mirosuri nedorite. Ceara naturală și care arde curat te ajută să reumpli și să reutilizezi recipientele existente pentru a reduce risipa. Flacăra este conținută în interiorul vasului, iar loviturile accidentale vor face ca granulele de ceară să se sfărâme și să stingă focul.',
    features: [
      '750g ceară de nisip 100% vegetală',
      '10 fitile incluse (3 mărimi diferite)',
      'Volum: 1.34 litri',
      'Inodor - perfect pentru parfumuri personalizate',
      'Arde curat și uniform',
      'Reutilizabil și ecologic',
      'Siguranță sporită - granulele sting focul la impact',
      'Ideal pentru cadouri și decor'
    ],
    images: [
      '/photoshoot-image (11).webp',
      '/Photoroom-20241102_214827.webp',
      '/Photoroom-20241106_205829.webp',
      '/Photoroom-20241106_211300.webp',
      '/Photoroom-20241107_202632.webp'
    ],
    image_alt_texts: [],
    tags: ['Bestseller', 'Eco-Friendly', 'Gift Ready', 'Natural'],
    in_stock: true,
    created_at: '2025-06-23T13:58:59.213774+00:00',
    updated_at: '2025-06-23T15:11:57.180308+00:00',
    stripe_price_id: 'price_1RdYCDBEuvxC28exjGFvxgwu',
    stripe_mode: 'payment'
  },
  {
    id: 'pachet-essenza-150g',
    name: 'Lumanare Perlata Pachet Essenza |150g+3fitile | Pahar Decorativ |Lumanare',
    slug: 'pachet-essenza-150g',
    price: 39,
    rating: 4.8,
    reviews: 67,
    category_id: 'home-collection',
    category: 'Home Collection',
    category_slug: 'home-collection',
    description:
      'Pachet Essenza\n\nCreează o atmosferă intimă și relaxantă cu Pachetul Essenza, pachetul nostru esențial. Conține tot ce ai nevoie pentru o experiență simplă, dar rafinată: 150g de ceară de nisip eco-friendly, 3 fitile și un pahar decorativ mic, perfect pentru a adăuga o notă de eleganță discretă în orice spațiu.\n\nPachetul contine: Ceara de nisip, fitil si pahar decorativ',
    long_description:
      'Lungimea fiecarei fitil este de 6 cm difera doar groasimea lor:\n\n• Fitilurile MICI\n  Ideale pentru vaze cu un diametru de 8 cm mai mari\n\n• Fitilurile MEDII\n  Recomandate pentru vaze cu un diametru de 10 cm și mai mari\n\n• Fitilurile MARI\n  Potrivite pentru vaze cu un diametru de 13 cm și mai mari\n\nAvantaje:\n\nCeara pe bază de plante este un produs 100% vegetal. Ceara naturală din palmier este inodoră, astfel încât poți folosi oricând parfumul tău preferat pentru lumânări. Îți permite să creezi și să aprinzi mai multe lumânări simultan fără a te îngrijora de mirosuri nedorite. Ceara naturală și care arde curat te ajută să reumpli și să reutilizezi recipientele existente pentru a reduce risipa. Flacăra este conținută în interiorul vasului, iar loviturile accidentale vor face ca granulele de ceară să se sfărâme și să stingă focul.',
    features: [
      '150g ceară de nisip eco-friendly',
      '3 fitile incluse (mărimi diferite)',
      'Pahar decorativ inclus',
      'Atmosferă intimă și relaxantă',
      '100% vegetal și natural',
      'Inodor - perfect pentru parfumuri personalizate',
      'Arde curat și uniform',
      'Siguranță sporită',
      'Ideal pentru spații mici'
    ],
    images: [
      '/20241027_114350 copy.webp',
      '/20241027_114455 copy.webp',
      '/20241027_114631 copy.webp',
      '/abc3462f-4169-41e2-bec4-63572c2990a5.webp'
    ],
    image_alt_texts: [],
    tags: ['Essential', 'Elegant', 'Minimal', 'Relaxing'],
    in_stock: true,
    created_at: '2025-06-23T14:09:52.773578+00:00',
    updated_at: '2025-11-27T15:54:50.627494+00:00',
    stripe_price_id: 'price_1Rf1pxBEuvxC28exFiVi4VgX',
    stripe_mode: 'payment'
  },
  {
    id: 'pachet-splendore-250g',
    name: 'Lumanare Perlata Pachet Splendore | 250g+5fitile | Pahar Decorativ | Lumanare',
    slug: 'pachet-splendore-250g',
    price: 59,
    rating: 4.9,
    reviews: 92,
    category_id: 'home-collection',
    category: 'Home Collection',
    category_slug: 'home-collection',
    description:
      'Pachetul Splendore\n\nPentru cei care își doresc mai mult, Pachetul Splendore oferă o experiență versatilă și de impact. Conține 250g de ceară de nisip, 5 fitile și un pahar decorativ la alegere, astfel încât să poți personaliza atmosfera după bunul plac. Perfect pentru momente speciale și un decor sofisticat.\n\nPachetul contine: Ceara de nisip, fitil, pahar decorativ',
    long_description:
      'Lungimea fiecarei fitil este de 6 cm difera doar groasimea lor:\n\n• Fitilurile MICI\n  Ideale pentru vaze cu un diametru de 8 cm mai mari\n\n• Fitilurile MEDII\n  Recomandate pentru vaze cu un diametru de 10 cm și mai mari\n\n• Fitilurile MARI\n  Potrivite pentru vaze cu un diametru de 13 cm și mai mari\n\nAvantaje:\n\nCeara pe bază de plante este un produs 100% vegetal. Ceara naturală din palmier este inodoră, astfel încât poți folosi oricând parfumul tău preferat pentru lumânări. Îți permite să creezi și să aprinzi mai multe lumânări simultan fără a te îngrijora de mirosuri nedorite. Ceara naturală și care arde curat te ajută să reumpli și să reutilizezi recipientele existente pentru a reduce risipa. Flacăra este conținută în interiorul vasului, iar loviturile accidentale vor face ca granulele de ceară să se sfărâme și să stingă focul.',
    features: [
      '250g ceară de nisip premium',
      '5 fitile incluse (mărimi diferite)',
      'Pahar decorativ la alegere',
      'Experiență versatilă și de impact',
      '100% vegetal și natural',
      'Inodor - perfect pentru parfumuri personalizate',
      'Arde curat și uniform',
      'Siguranță sporită',
      'Perfect pentru momente speciale',
      'Decor sofisticat'
    ],
    images: [
      '/Untitled (8) copy.webp',
      '/20241027_114934 copy.webp',
      '/20241027_115048 copy.webp',
      '/20241027_115201 copy.webp'
    ],
    image_alt_texts: [],
    tags: ['Premium', 'Versatile', 'Sophisticated', 'Special Moments'],
    in_stock: true,
    created_at: '2025-06-23T14:17:16.081444+00:00',
    updated_at: '2025-11-27T15:54:50.627494+00:00',
    stripe_price_id: 'price_1Rf1m7BEuvxC28exw9vULbVd',
    stripe_mode: 'payment'
  },
  {
    id: 'ceara-nisip-4-5kg-evenimente',
    name: 'Ceara de nisip 4.5 kg + 60fitile cadou | Lumanare perlata | Idei decor eveniment',
    slug: 'ceara-nisip-4-5kg-evenimente',
    price: 380,
    rating: 4.9,
    reviews: 124,
    category_id: 'events-collection',
    category: 'Events Collection',
    category_slug: 'events-collection',
    description:
      'Ceara de nisip, cunoscuta și sub numele de lumanare perlata, lumanare pudra, praf de lumanare sau perle de lumanare. Textura sa perlata și granulata este perfecta pentru crearea unor lumanari albe elegante, pentru a oferi ca si cadou sau pentru realizarea unui decor pentru eveniment special\n\nNisipul nostru pentru lumânări este absolut inodor, oferind o soluție pură și fără parfum pentru cei care preferă o atmosferă naturală și nealterată.\n\nPachetul contine: Ceara de nisip si fitil',
    long_description:
      'Specificații Tehnice\n\nConținut: Un sac conține 4,5 KG de ceară de nisip premium, cu un volum total de 8 litri - suficient pentru multiple decoruri spectaculoase.\n\nBonus Inclus: 60 de fitile cadou în 3 mărimi profesionale pentru flexibilitate maximă în design.\n\nGhid Fitile Profesionale\n\nLungimea fiecărui fitil este de 6 cm, diferind doar prin grosime pentru adaptabilitate optimă:\n\n• Fitile MICI\n  Ideale pentru vaze cu diametrul de 8 cm sau mai mari\n\n• Fitile MEDII\n  Recomandate pentru vaze cu diametrul de 10 cm și mai mari\n\n• Fitile MARI\n  Potrivite pentru vaze cu diametrul de 13 cm și mai mari\n\nAmbalaj Eco-Responsabil\n\nPentru a minimiza impactul asupra mediului, folosim pungi de hârtie maro simple, reutilizabile și 100% compostabile pentru ceara noastră de nisip premium.\n\nAvantaje Profesionale\n\n100% Natural & Vegetal\nCeara pe bază de plante este un produs complet vegetal, fără adaosuri chimice.\n\nInodor & Personalizabil\nCeara naturală din palmier este absolut inodoră, permițându-ți să folosești oricând parfumul preferat pentru lumânări.\n\nVersatilitate Creativă\nÎți permite să creezi și să aprinzi mai multe lumânări simultan fără interferențe olfactive nedorite.\n\nSustenabilitate Maximă\nCeara naturală care arde curat te ajută să reumpli și să reutilizezi recipientele existente, reducând dramatic risipa.\n\nSiguranță Sporită\nFlacăra rămâne conținută în interiorul vasului, iar loviturile accidentale fac ca granulele de ceară să se sfărâme și să stingă automat focul.\n\nAplicații Profesionale\n\nPerfect pentru nunți elegante, evenimente corporative, decoruri festive, instalații artistice, ambientări premium și ceremonii speciale.',
    features: [
      '4.5 KG ceară de nisip premium (8 litri volum)',
      '60 fitile cadou incluse (3 mărimi diferite)',
      'Perfect pentru evenimente și decoruri speciale',
      '100% vegetal și natural',
      'Inodor - ideal pentru parfumuri personalizate',
      'Arde curat și uniform',
      'Ambalaj eco-friendly din hârtie compostabilă',
      'Siguranță sporită - granulele sting focul la impact',
      'Reutilizabil și sustenabil',
      'Ideal pentru nunți, petreceri și evenimente corporative'
    ],
    images: [
      '/Screenshot 2024-06-15 172309.jpg.webp',
      '/7_Chameleon-Sand-Candles_photo-by-Red-Eclectic.webp',
      '/CandleSand-6.webp',
      '/Chameleon-Sand-Candles-wedding-ceremony_photo-by-red-eclectic-1170x780.webp',
      '/il_1140xN.3978503349_e86a.webp'
    ],
    image_alt_texts: [],
    tags: ['Sale', 'Events', 'Bulk', 'Wedding', 'Decoration', 'Professional', 'Eco-Friendly'],
    in_stock: true,
    created_at: '2025-06-23T14:29:44.838713+00:00',
    updated_at: '2025-06-26T19:39:44.096159+00:00',
    stripe_price_id: 'price_1Rf1tyBEuvxC28exlEI1yR1u',
    stripe_mode: 'payment'
  }
];

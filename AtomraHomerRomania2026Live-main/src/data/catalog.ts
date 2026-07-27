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
      'Transformă-ți spațiul de locuit cu colecția noastră de lumânări emblematice. Fiecare parfum este ales cu grijă pentru a crea atmosfera potrivită pentru casa ta.',
    image: '/home-category-home.webp',
    sort_order: 1,
    created_at: '2025-06-23T15:02:19.197935+00:00',
    updated_at: '2025-06-23T15:11:57.180308+00:00',
  },
  {
    id: 'events-collection',
    name: 'Events Collection',
    slug: 'events-collection',
    description:
      'Perfecte pentru ocazii speciale și momente memorabile. Creează atmosfera ideală pentru orice sărbătoare cu selecția noastră dedicată evenimentelor.',
    image: '/Chameleon-Sand-Candles-wedding-ceremony_photo-by-red-eclectic-1170x780.jpg',
    sort_order: 2,
    created_at: '2025-06-23T15:02:19.197935+00:00',
    updated_at: '2025-06-23T15:11:57.180308+00:00',
  },
  {
    id: 'accessories',
    name: 'Accessories',
    slug: 'accessories',
    description:
      'Unelte și recipiente esențiale pentru a-ți completa experiența cu lumânările. Tot ce ai nevoie pentru a întreține și a pune în valoare ritualul Atomra.',
    image: '/accessories-category.webp',
    sort_order: 3,
    created_at: '2025-06-23T15:02:19.197935+00:00',
    updated_at: '2025-06-23T15:11:57.180308+00:00',
  },
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
      'Ceara de nisip, cunoscută și sub numele de lumânare perlată, lumânare pudră, praf de lumânare sau perle de lumânare. Textura sa perlată și granulată este perfectă pentru crearea unor lumânări albe elegante, pentru a fi oferită cadou sau pentru realizarea unui decor unic și relaxant. Nisipul nostru pentru lumânări este absolut inodor, oferind o soluție pură și fără parfum pentru cei care preferă o atmosferă naturală și nealterată. Pachetul conține ceară de nisip și fitil.',
    long_description:
      'Cutia de granule conține 750 grame de ceară de nisip, cu un volum de 1,34 litri, și 10 fitile oferite cadou.\n\nLungimea fiecărui fitil este de 6 cm; diferă doar grosimea lor:\n\n• Fitilurile MICI\n  Ideale pentru vaze cu diametrul de 8 cm sau mai mare\n\n• Fitilurile MEDII\n  Recomandate pentru vaze cu diametrul de 10 cm și mai mare\n\n• Fitilurile MARI\n  Potrivite pentru vaze cu diametrul de 13 cm și mai mare\n\nAvantaje:\n\nCeara pe bază de plante este un produs 100% vegetal. Ceara naturală din palmier este inodoră, astfel încât poți folosi oricând parfumul tău preferat pentru lumânări. Îți permite să creezi și să aprinzi mai multe lumânări simultan fără a te îngrijora de mirosuri nedorite. Ceara naturală, care arde curat, te ajută să reumpli și să reutilizezi recipientele existente pentru a reduce risipa. Flacăra este conținută în interiorul vasului, iar loviturile accidentale vor face ca granulele de ceară să se sfărâme și să stingă focul.',
    features: [
      '750 g ceară de nisip 100% vegetală',
      '10 fitile incluse, în 3 mărimi diferite',
      'Volum: 1,34 litri',
      'Inodoră, perfectă pentru parfumuri personalizate',
      'Arde curat și uniform',
      'Reutilizabilă și ecologică',
      'Siguranță sporită, granulele sting focul la impact',
      'Ideală pentru cadouri și decor',
    ],
    images: [
      '/products/granule-box/granule-box-01-principal.webp',
      '/products/granule-box/granule-box-02-decor-camera.webp',
      '/products/granule-box/granule-box-03-decor-masa.webp',
      '/products/granule-box/granule-box-04-decor-vas-ceara-naturala.webp',
      '/products/granule-box/granule-box-05-lumanare-vas-ceara-perlata.webp',
      '/products/granule-box/granule-box-06-ceara-perlata-din-soia.webp',
      '/products/granule-box/granule-box-07-comparatie-traditionala-vs-perlata.webp',
      '/products/granule-box/granule-box-08-pachet.webp',
      '/products/granule-box/granule-box-09-tip-fitil.webp',
      '/products/granule-box/granule-box-10-idee-decor.webp',
    ],
    image_alt_texts: [
      'Granule Box 750g ambalaj principal Atomra Home',
      'Idee de decor camera cu lumanare din ceara perlata',
      'Idee de decor masa cu lumanare perlata in vas',
      'Vas decorativ cu ceara naturala perlata si fitile multiple',
      'Lumanare in vas cu ceara perlata alba decorativa',
      'Ceara perlata noua din soia tinuta in palme',
      'Comparatie intre lumanare traditionala si ceara perlata reutilizabila',
      'Pachet Granule Box 750g pe fundal textil',
      'Tipuri de fitil pentru lumanari din ceara naturala eco',
      'Idee de decor cu ceara perlata in vase decorative',
    ],
    tags: ['Bestseller', 'Eco-Friendly', 'Gift Ready', 'Natural'],
    in_stock: true,
    created_at: '2025-06-23T13:58:59.213774+00:00',
    updated_at: '2025-06-23T15:11:57.180308+00:00',
    stripe_price_id: 'price_1RdYCDBEuvxC28exjGFvxgwu',
    stripe_mode: 'payment',
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
      'Pachet Essenza\n\nCreează o atmosferă intimă și relaxantă cu Pachetul Essenza, pachetul nostru esențial. Conține tot ce ai nevoie pentru o experiență simplă, dar rafinată: 150 g de ceară de nisip eco-friendly, 3 fitile și un pahar decorativ mic, perfect pentru a adăuga o notă de eleganță discretă în orice spațiu.\n\nPachetul conține: ceară de nisip, fitil și pahar decorativ.',
    long_description:
      'Lungimea fiecărui fitil este de 6 cm; diferă doar grosimea lor:\n\n• Fitilurile MICI\n  Ideale pentru vaze cu diametrul de 8 cm sau mai mare\n\n• Fitilurile MEDII\n  Recomandate pentru vaze cu diametrul de 10 cm și mai mare\n\n• Fitilurile MARI\n  Potrivite pentru vaze cu diametrul de 13 cm și mai mare\n\nAvantaje:\n\nCeara pe bază de plante este un produs 100% vegetal. Ceara naturală din palmier este inodoră, astfel încât poți folosi oricând parfumul tău preferat pentru lumânări. Îți permite să creezi și să aprinzi mai multe lumânări simultan fără a te îngrijora de mirosuri nedorite. Ceara naturală, care arde curat, te ajută să reumpli și să reutilizezi recipientele existente pentru a reduce risipa. Flacăra este conținută în interiorul vasului, iar loviturile accidentale vor face ca granulele de ceară să se sfărâme și să stingă focul.',
    features: [
      '150 g ceară de nisip eco-friendly',
      '3 fitile incluse, în mărimi diferite',
      'Pahar decorativ inclus',
      'Atmosferă intimă și relaxantă',
      '100% vegetal și natural',
      'Inodoră, perfectă pentru parfumuri personalizate',
      'Arde curat și uniform',
      'Siguranță sporită',
      'Ideală pentru spații mici',
    ],
    images: [
      '/products/essenza/essenza-01-pachet.webp',
      '/products/essenza/essenza-02-lumanare-eco-friendly.webp',
      '/products/essenza/essenza-03-pahar-ceara-naturala-perlata.webp',
      '/products/essenza/essenza-04-comparatie-traditionala-vs-perlata.webp',
    ],
    image_alt_texts: [
      'Pachet Essenza cu lumanare eco si pahar decorativ',
      'Lumanare eco friendly perlata Essenza in decor de seara',
      'Pahar cu lumanare din ceara naturala perlata aprinsa',
      'Comparatie intre lumanare traditionala si lumanare perlata eco',
    ],
    tags: ['Essential', 'Elegant', 'Minimal', 'Relaxing'],
    in_stock: true,
    created_at: '2025-06-23T14:09:52.773578+00:00',
    updated_at: '2025-11-27T15:54:50.627494+00:00',
    stripe_price_id: 'price_1Rf1pxBEuvxC28exFiVi4VgX',
    stripe_mode: 'payment',
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
      'Pachetul Splendore\n\nPentru cei care își doresc mai mult, Pachetul Splendore oferă o experiență versatilă și de impact. Conține 250 g de ceară de nisip, 5 fitile și un pahar decorativ la alegere, astfel încât să poți personaliza atmosfera după bunul plac. Perfect pentru momente speciale și un decor sofisticat.\n\nPachetul conține: ceară de nisip, fitil și pahar decorativ.',
    long_description:
      'Lungimea fiecărui fitil este de 6 cm; diferă doar grosimea lor:\n\n• Fitilurile MICI\n  Ideale pentru vaze cu diametrul de 8 cm sau mai mare\n\n• Fitilurile MEDII\n  Recomandate pentru vaze cu diametrul de 10 cm și mai mare\n\n• Fitilurile MARI\n  Potrivite pentru vaze cu diametrul de 13 cm și mai mare\n\nAvantaje:\n\nCeara pe bază de plante este un produs 100% vegetal. Ceara naturală din palmier este inodoră, astfel încât poți folosi oricând parfumul tău preferat pentru lumânări. Îți permite să creezi și să aprinzi mai multe lumânări simultan fără a te îngrijora de mirosuri nedorite. Ceara naturală, care arde curat, te ajută să reumpli și să reutilizezi recipientele existente pentru a reduce risipa. Flacăra este conținută în interiorul vasului, iar loviturile accidentale vor face ca granulele de ceară să se sfărâme și să stingă focul.',
    features: [
      '250 g ceară de nisip premium',
      '5 fitile incluse, în mărimi diferite',
      'Pahar decorativ la alegere',
      'Experiență versatilă și de impact',
      '100% vegetal și natural',
      'Inodoră, perfectă pentru parfumuri personalizate',
      'Arde curat și uniform',
      'Siguranță sporită',
      'Perfectă pentru momente speciale',
      'Decor sofisticat',
    ],
    images: [
      '/products/splendore/splendore-01-pachet.webp',
      '/products/splendore/splendore-02-masa-cozy.webp',
      '/products/splendore/splendore-03-lumanare-decorativa.webp',
      '/products/splendore/splendore-04-comparatie-traditionala-vs-perlata.webp',
    ],
    image_alt_texts: [
      'Pachet Splendore cu lumanare din soia perlata eco',
      'Lumanare ecologica Splendore pe masa cozy',
      'Lumanare decorativa din ceara ecologica perlata aprinsa',
      'Comparatie intre lumanare traditionala si lumanare perlata din ceara naturala',
    ],
    tags: ['Premium', 'Versatile', 'Sophisticated', 'Special Moments'],
    in_stock: true,
    created_at: '2025-06-23T14:17:16.081444+00:00',
    updated_at: '2025-11-27T15:54:50.627494+00:00',
    stripe_price_id: 'price_1Rf1m7BEuvxC28exw9vULbVd',
    stripe_mode: 'payment',
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
      'Ceara de nisip, cunoscută și sub numele de lumânare perlată, lumânare pudră, praf de lumânare sau perle de lumânare. Textura sa perlată și granulată este perfectă pentru crearea unor lumânări albe elegante, pentru a fi oferită cadou sau pentru realizarea unui decor special de eveniment.\n\nNisipul nostru pentru lumânări este absolut inodor, oferind o soluție pură și fără parfum pentru cei care preferă o atmosferă naturală și nealterată.\n\nPachetul conține: ceară de nisip și fitil.',
    long_description:
      'Specificații tehnice\n\nConținut: un sac conține 4,5 kg de ceară de nisip premium, cu un volum total de 8 litri, suficient pentru multiple decoruri spectaculoase.\n\nBonus inclus: 60 de fitile cadou, în 3 mărimi profesionale, pentru flexibilitate maximă în design.\n\nGhid fitile profesionale\n\nLungimea fiecărui fitil este de 6 cm, diferind doar prin grosime pentru adaptabilitate optimă:\n\n• Fitile MICI\n  Ideale pentru vaze cu diametrul de 8 cm sau mai mare\n\n• Fitile MEDII\n  Recomandate pentru vaze cu diametrul de 10 cm și mai mare\n\n• Fitile MARI\n  Potrivite pentru vaze cu diametrul de 13 cm și mai mare\n\nAmbalaj eco-responsabil\n\nPentru a minimiza impactul asupra mediului, folosim pungi de hârtie maro simple, reutilizabile și 100% compostabile pentru ceara noastră de nisip premium.\n\nAvantaje profesionale\n\n100% natural și vegetal\nCeara pe bază de plante este un produs complet vegetal, fără adaosuri chimice.\n\nInodor și personalizabil\nCeara naturală din palmier este absolut inodoră, permițându-ți să folosești oricând parfumul preferat pentru lumânări.\n\nVersatilitate creativă\nÎți permite să creezi și să aprinzi mai multe lumânări simultan fără interferențe olfactive nedorite.\n\nSustenabilitate maximă\nCeara naturală, care arde curat, te ajută să reumpli și să reutilizezi recipientele existente, reducând dramatic risipa.\n\nSiguranță sporită\nFlacăra rămâne conținută în interiorul vasului, iar loviturile accidentale fac ca granulele de ceară să se sfărâme și să stingă automat focul.\n\nAplicații profesionale\n\nPerfectă pentru nunți elegante, evenimente corporative, decoruri festive, instalații artistice, ambientări premium și ceremonii speciale.',
    features: [
      '4,5 kg ceară de nisip premium, aproximativ 8 litri volum',
      '60 de fitile cadou incluse, în 3 mărimi diferite',
      'Perfectă pentru evenimente și decoruri speciale',
      '100% vegetală și naturală',
      'Inodoră, ideală pentru parfumuri personalizate',
      'Arde curat și uniform',
      'Ambalaj eco-friendly din hârtie compostabilă',
      'Siguranță sporită, granulele sting focul la impact',
      'Reutilizabilă și sustenabilă',
      'Ideală pentru nunți, petreceri și evenimente corporative',
    ],
    images: [
      '/products/event-bulk-4-5kg/event-bulk-01-pachet.webp',
      '/products/event-bulk-4-5kg/event-bulk-02-eveniment-ceara-soia.webp',
      '/products/event-bulk-4-5kg/event-bulk-03-decor-natural.webp',
      '/products/event-bulk-4-5kg/event-bulk-04-masa-eveniment.webp',
      '/products/event-bulk-4-5kg/event-bulk-05-comparatie-vs-traditionale.webp',
      '/products/event-bulk-4-5kg/event-bulk-06-tip-fitil.webp',
    ],
    image_alt_texts: [
      'Pachet de lumanare perlata pentru decor eveniment eco',
      'Lumanare decorativa de eveniment din ceara de soia eco',
      'Decor natural din ceara perlata ecologica pentru evenimente',
      'Lumanare decorativa perlata pentru masa de eveniment',
      'De ce sa alegi lumanarile perlate ecologice versus lumanarile traditionale',
      'Tipuri de fitil pentru lumanare perlata ecologica naturala',
    ],
    tags: ['Sale', 'Events', 'Bulk', 'Wedding', 'Decoration', 'Professional', 'Eco-Friendly'],
    in_stock: true,
    created_at: '2025-06-23T14:29:44.838713+00:00',
    updated_at: '2025-06-26T19:39:44.096159+00:00',
    stripe_price_id: 'price_1Rf1tyBEuvxC28exlEI1yR1u',
    stripe_mode: 'payment',
  },
  {
    id: 'fitile-mici-20-buc',
    name: 'Fitile Mici | Lumanare perlata naturala | Eco-Friendly | 20 BUC',
    slug: 'fitile-mici-20-buc',
    price: 15,
    rating: 0,
    reviews: 0,
    category_id: 'accessories',
    category: 'Accessories',
    category_slug: 'accessories',
    description:
      'Set de 20 fitile mici, pre-cerate, pentru lumanari perlate naturale. Sunt potrivite pentru vase cu diametrul de aproximativ 8 cm sau mai mare si ajuta la o aprindere usoara si o ardere curata.',
    long_description:
      'Fitilele mici sunt gandite pentru cei care folosesc ceara perlata si vor o varianta practica, curata si usor de folosit in recipiente mai inguste.\n\nPachetul contine 20 de fitile mici, pre-cerate.\n\nDetalii utile:\n\n• Lungime fitil: aproximativ 6 cm\n• Potrivite pentru vase cu diametrul de 8 cm sau mai mare\n• Timp estimat de ardere: aproximativ 15-20 ore per fitil, in functie de recipient si conditiile de utilizare\n• Fir de bumbac de calitate superioara, prelucrat pentru o aprindere constanta\n\nCalitate si siguranta:\n\nFitilele sunt realizate din materiale atent selectionate si sunt potrivite pentru utilizarea cu lumanari perlate naturale. Sunt o alegere buna atunci cand vrei sa reimprospatezi rapid vasul si sa refolosesti decorul fara batai de cap.',
    features: [
      '20 fitile mici pre-cerate',
      'Potrivite pentru vase de aproximativ 8 cm diametru sau mai mari',
      'Lungime fitil: aproximativ 6 cm',
      'Ardere estimata: 15-20 ore per fitil',
      'Fir de bumbac de calitate superioara',
      'Usor de folosit cu ceara perlata naturala',
      'Ideal pentru reumplere si refolosirea vaselor',
      'Accesoriu practic pentru decor eco-friendly',
    ],
    images: [
      '/products/fitile-mici/fitile-mici-01-principal.webp',
      '/products/fitile-mici/fitile-mici-02-utilizare.webp',
      '/products/fitile-mici/fitile-mici-03-tip-fitil.webp',
    ],
    image_alt_texts: [
      'Fitile mici pentru lumanare perlata naturala, set de 20 bucati',
      'Exemplu de utilizare a fitilului mic in ceara perlata naturala',
      'Ghid pentru alegerea grosimii potrivite a fitilului pentru lumanare perlata naturala',
    ],
    tags: ['Accessories', 'Wicks', 'Eco-Friendly', 'Refill', 'Natural'],
    in_stock: true,
    created_at: '2026-04-08T12:00:00+03:00',
    updated_at: '2026-04-08T12:00:00+03:00',
  },
  {
    id: 'fitile-medii-20-buc',
    name: 'Fitile Medii | Lumanare perlata naturala | Eco-Friendly | 20 BUC',
    slug: 'fitile-medii-20-buc',
    price: 15,
    rating: 0,
    reviews: 0,
    category_id: 'accessories',
    category: 'Accessories',
    category_slug: 'accessories',
    description:
      'Set de 20 fitile medii, pre-cerate, pentru lumanari perlate naturale. Sunt recomandate pentru vase cu diametrul de aproximativ 10 cm sau mai mare si ajuta la o aprindere usoara si o ardere stabila.',
    long_description:
      'Fitilele medii sunt o alegere practica pentru cei care folosesc ceara perlata naturala si vor o ardere echilibrata in recipiente de dimensiune medie.\n\nPachetul contine 20 de fitile medii, pre-cerate.\n\nDetalii utile:\n\n- Lungime fitil: aproximativ 6 cm\n- Potrivite pentru vase cu diametrul de aproximativ 10 cm sau mai mare\n- Timp estimat de ardere: aproximativ 15-20 ore per fitil, in functie de recipient si conditiile de utilizare\n- Fir de bumbac de calitate superioara, pregatit pentru o aprindere constanta\n\nCalitate si utilizare:\n\nFitilele medii sunt create pentru a functiona bine cu lumanarile perlate naturale si pentru a face mai usoara refolosirea vaselor decorative. Sunt ideale atunci cand vrei un rezultat curat, elegant si usor de intretinut intre utilizari.',
    features: [
      '20 fitile medii pre-cerate',
      'Potrivite pentru vase de aproximativ 10 cm diametru sau mai mari',
      'Lungime fitil: aproximativ 6 cm',
      'Ardere estimata: 15-20 ore per fitil',
      'Fir de bumbac de calitate superioara',
      'Usor de folosit cu ceara perlata naturala',
      'Ideal pentru reumplere si refolosirea vaselor',
      'Accesoriu practic pentru decor eco-friendly',
    ],
    images: [
      '/products/fitile-medii/fitile-medii-01-principal.webp',
      '/products/fitile-medii/fitile-medii-02-utilizare.webp',
      '/products/fitile-medii/fitile-medii-03-tip-fitil.webp',
    ],
    image_alt_texts: [
      'Fitile medii pentru lumanare perlata naturala, set de 20 bucati',
      'Exemplu de utilizare a fitilului mediu in ceara perlata naturala',
      'Ghid pentru alegerea grosimii potrivite a fitilului pentru lumanare perlata naturala',
    ],
    tags: ['Accessories', 'Wicks', 'Eco-Friendly', 'Refill', 'Natural'],
    in_stock: true,
    created_at: '2026-04-08T12:30:00+03:00',
    updated_at: '2026-04-08T12:30:00+03:00',
  },
  {
    id: 'fitile-mari-20-buc',
    name: 'Fitile Mari | Lumanare perlata naturala | Eco-Friendly | 20 BUC',
    slug: 'fitile-mari-20-buc',
    price: 15,
    rating: 0,
    reviews: 0,
    category_id: 'accessories',
    category: 'Accessories',
    category_slug: 'accessories',
    description:
      'Set de 20 fitile mari, pre-cerate, pentru lumanari perlate naturale. Sunt recomandate pentru vase cu diametrul de aproximativ 13 cm sau mai mare si ofera o aprindere usoara, cu ardere ampla si stabila.',
    long_description:
      'Fitilele mari sunt potrivite pentru cei care folosesc ceara perlata naturala in vase late si vor o flacara echilibrata, frumoasa si usor de intretinut.\n\nPachetul contine 20 de fitile mari, pre-cerate.\n\nDetalii utile:\n\n- Lungime fitil: aproximativ 6 cm\n- Potrivite pentru vase cu diametrul de aproximativ 13 cm sau mai mare\n- Timp estimat de ardere: aproximativ 15-20 ore per fitil, in functie de recipient si conditiile de utilizare\n- Fir de bumbac de calitate superioara, pregatit pentru o aprindere constanta\n\nCalitate si utilizare:\n\nFitilele mari sunt create pentru lumanari perlate naturale turnate in recipiente generoase si pentru decoruri care au nevoie de o prezenta mai puternica a flacarii. Sunt o alegere practica atunci cand vrei sa refolosesti vasele si sa obtii un rezultat elegant, curat si uniform.',
    features: [
      '20 fitile mari pre-cerate',
      'Potrivite pentru vase de aproximativ 13 cm diametru sau mai mari',
      'Lungime fitil: aproximativ 6 cm',
      'Ardere estimata: 15-20 ore per fitil',
      'Fir de bumbac de calitate superioara',
      'Usor de folosit cu ceara perlata naturala',
      'Ideal pentru vase late si decoruri ample',
      'Accesoriu practic pentru decor eco-friendly',
    ],
    images: [
      '/products/fitile-mari/fitile-mari-01-principal.webp',
      '/products/fitile-mari/fitile-mari-02-utilizare.webp',
      '/products/fitile-mari/fitile-mari-03-tip-fitil.webp',
    ],
    image_alt_texts: [
      'Fitile mari pentru lumanare perlata naturala, set de 20 bucati',
      'Exemplu de utilizare a fitilului mare in ceara perlata naturala',
      'Ghid pentru alegerea grosimii potrivite a fitilului pentru lumanare perlata naturala',
    ],
    tags: ['Accessories', 'Wicks', 'Eco-Friendly', 'Refill', 'Natural'],
    in_stock: true,
    created_at: '2026-04-08T13:00:00+03:00',
    updated_at: '2026-04-08T13:00:00+03:00',
  },
];

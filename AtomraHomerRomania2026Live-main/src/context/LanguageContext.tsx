/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Language = 'ro' | 'hu' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations: Record<Language, Record<string, string>> = {
  ro: {
    'banner.freeShipping': 'Transport gratuit pentru comenzi peste 149 Lei',
    'common.lei': 'Lei',
    'common.loading': 'Se incarca...',
    'common.navigation': 'Navigare',
    'common.utilities': 'Utilitati',

    'nav.home': 'Acasa',
    'nav.events': 'Evenimente',
    'nav.accessories': 'Accesorii',
    'nav.coming': 'In curand',
    'nav.backToCollection': 'Inapoi la {collection}',

    'hero.title1': 'Umple.',
    'hero.title2': 'Aprinde.',
    'hero.title3': 'Reimprospateaza.',
    'hero.subtitle': 'Cel mai elegant mod de a te bucura de lumanari reincarcabile cu perle de ceara.',
    'hero.cta': 'Exploreaza colectia',
    'hero.scroll': 'Deruleaza',

    'categories.title': 'Exploreaza colectiile noastre',
    'categories.subtitle': 'Descopera produse pentru acasa, evenimente si ritualuri elegante de zi cu zi.',
    'categories.home.title': 'Acasa',
    'categories.home.description': 'Piese pentru living, dining, dormitor si colturi cozy.',
    'categories.events.title': 'Evenimente',
    'categories.events.description': 'Aranjamente flexibile pentru mese festive si decoruri ample.',
    'categories.accessories.title': 'Accesorii',
    'categories.accessories.description': 'Detalii utile pentru o experienta completa si usor de stilizat.',
    'categories.coming.title': 'In curand',
    'categories.coming.description': 'Colectii noi si seturi speciale aflate in pregatire.',

    'howItWorks.title': 'Cum functioneaza',
    'howItWorks.subtitle': 'Simplu, reutilizabil si usor de adaptat oricarui recipient frumos.',
    'howItWorks.pour.title': 'Umple',
    'howItWorks.pour.description': 'Adauga perlele de ceara in recipientul ales.',
    'howItWorks.insert.title': 'Insereaza',
    'howItWorks.insert.description': 'Pozitioneaza fitilul in centru, stabil si curat.',
    'howItWorks.light.title': 'Aprinde',
    'howItWorks.light.description': 'Bucura-te de o ardere calma si de un decor personalizat.',
    'howItWorks.refresh.title': 'Reimprospateaza',
    'howItWorks.refresh.description': 'Completeaza stratul superior cand vrei sa refaci piesa.',

    'whyAtomra.title': 'De ce Atomra',
    'whyAtomra.subtitle': 'O alternativa mai flexibila, mai curata si mai frumoasa pentru ritualul de acasa.',
    'whyAtomra.refillable.title': 'Reincarcabil',
    'whyAtomra.refillable.description': 'Recipientele pot ramane in decor, iar continutul se reface usor.',
    'whyAtomra.eco.title': 'Mai atent cu mediul',
    'whyAtomra.eco.description': 'Mizand pe reutilizare, reducem risipa si pastram obiectele bune in folosire.',
    'whyAtomra.customize.title': 'Usor de personalizat',
    'whyAtomra.customize.description': 'Poti adapta vasul, cantitatea si atmosfera exact cum iti doresti.',

    'reviews.title': 'Ce spun clientii nostri',
    'reviews.rating': 'Apreciat pentru versatilitate, aspect curat si usurinta in folosire.',
    'reviews.review1':
      'Am putut refolosi recipientele mele preferate, iar rezultatul arata mult mai elegant decat ma asteptam.',
    'reviews.author1': 'Maria C.',
    'reviews.location1': 'Bucuresti',
    'reviews.review2':
      'Pentru decor de eveniment a fost una dintre cele mai bune alegeri: rapid de pregatit, usor de completat si foarte frumos in poze.',
    'reviews.author2': 'Andrei R.',
    'reviews.location2': 'Cluj-Napoca',
    'reviews.review3':
      'Imi place ca pot schimba rapid vasul si stilul fara sa o iau de la zero de fiecare data.',
    'reviews.author3': 'Elena M.',
    'reviews.location3': 'Timisoara',

    'search.title': 'Cautare produse',
    'search.placeholder': 'Cauta lumanari, accesorii, seturi...',
    'search.noResults': 'Nu am gasit rezultate',
    'search.tryDifferent': 'Incearca un alt termen de cautare',
    'search.quickLinks': 'Linkuri rapide',

    'product.addToCart': 'Adauga in cos',
    'product.addedToCart': 'Adaugat in cos',
    'product.inStock': 'In stoc',
    'product.outOfStock': 'Stoc epuizat',
    'product.quantity': 'Cantitate',
    'product.features': 'Caracteristici',
    'product.aboutProduct': 'Despre produs',
    'product.reviews': 'recenzii',
    'product.whyChooseAtomra': 'De ce sa alegi Atomra',

    'quality.premiumQuality.title': 'Calitate premium',
    'quality.premiumQuality.description': 'Finisaj atent si materiale selectate cu grija.',
    'quality.ecoFriendly.title': 'Mai responsabil',
    'quality.ecoFriendly.description': 'Reutilizare usoara si consum mai atent.',
    'quality.safeBurning.title': 'Ardere echilibrata',
    'quality.safeBurning.description': 'Gandit pentru un ritual calm si controlat.',
    'quality.fastShipping.title': 'Livrare rapida',
    'quality.fastShipping.description': 'Expediere eficienta si transport gratuit peste prag.',
    'quality.safePackaging.title': 'Ambalare sigura',
    'quality.safePackaging.description': 'Produsele ajung protejate si pregatite de oferit.',

    'checkout.processing': 'Se proceseaza...',
    'checkout.paymentInfo': 'Informatii de plata',
    'cart.error.orderFailed': 'A aparut o eroare la plasarea comenzii. Te rugam sa incerci din nou.',
  },
  hu: {
    'banner.freeShipping': 'Ingyenes szallitas 149 Lei feletti rendeles eseten',
    'common.lei': 'Lei',
    'common.loading': 'Betoltes...',
    'common.navigation': 'Navigacio',
    'common.utilities': 'Eszkozok',

    'nav.home': 'Otthon',
    'nav.events': 'Esemenyek',
    'nav.accessories': 'Kiegeszitok',
    'nav.coming': 'Hamarosan',
    'nav.backToCollection': 'Vissza ide: {collection}',

    'hero.title1': 'Toltsd.',
    'hero.title2': 'Gyujtsd.',
    'hero.title3': 'Frissitsd.',
    'hero.subtitle': 'Letisztult, ujratoltheto gyertyarituale viaszgyongyokkel es elegans reszletekkel.',
    'hero.cta': 'Kollekcio megnezese',
    'hero.scroll': 'Gorgetes',

    'categories.title': 'Fedezd fel kollekcioinkat',
    'categories.subtitle': 'Termekek otthonra, esemenyekre es finom, letisztult enteriorokhoz.',
    'categories.home.title': 'Otthon',
    'categories.home.description': 'Darabok nappaliba, etkezobe, haloszobaba es nyugodt sarkokba.',
    'categories.events.title': 'Esemenyek',
    'categories.events.description': 'Rugalmas dekorok unnepi asztalokhoz es nagyobb terekhez.',
    'categories.accessories.title': 'Kiegeszitok',
    'categories.accessories.description': 'Hasznos reszletek egy teljesebb es szebb ritualehoz.',
    'categories.coming.title': 'Hamarosan',
    'categories.coming.description': 'Uj kollekciok es kulonleges szettek elokeszites alatt.',

    'howItWorks.title': 'Hogyan mukodik',
    'howItWorks.subtitle': 'Egyszeru, ujratoltheto es konnyen barmilyen szep tartalyhoz igazithato.',
    'howItWorks.pour.title': 'Toltsd',
    'howItWorks.pour.description': 'Ontsd a viaszgyongyoket a valasztott tartalyba.',
    'howItWorks.insert.title': 'Helyezd be',
    'howItWorks.insert.description': 'Tedd a kanocot kozepre, tisztan es stabilan.',
    'howItWorks.light.title': 'Gyujtsd meg',
    'howItWorks.light.description': 'Elvezd a nyugodt egest es a szemelyre szabott dekor hangulatat.',
    'howItWorks.refresh.title': 'Frissitsd',
    'howItWorks.refresh.description': 'Toltsd ujra a felso reteget, amikor meg szeretned ujitani.',

    'whyAtomra.title': 'Miért Atomra',
    'whyAtomra.subtitle': 'Rugalmasabb, tisztabb es esztetikusabb megkozelites az otthoni ritualehoz.',
    'whyAtomra.refillable.title': 'Ujratoltheto',
    'whyAtomra.refillable.description': 'A tartaly marad, a darab pedig ujra es ujra felfrissitheto.',
    'whyAtomra.eco.title': 'Tudatosabb valasztas',
    'whyAtomra.eco.description': 'A reutilizalhato rendszer kevesebb hulladekkal jar.',
    'whyAtomra.customize.title': 'Konnyen szemelyre szabhatod',
    'whyAtomra.customize.description': 'A tartaly, a mennyiseg es a hangulat is szabadon alakithato.',

    'reviews.title': 'Vasarloink velemenye',
    'reviews.rating': 'Szeretik a sokoldalusag, a tiszta megjelenes es a konnyu hasznalat miatt.',
    'reviews.review1':
      'A kedvenc tartalyaimat is uj eletre tudtam kelteni, es az eredmeny sokkal kifinomultabb lett, mint vartam.',
    'reviews.author1': 'Maria C.',
    'reviews.location1': 'Bukarest',
    'reviews.review2':
      'Esemenydekorhoz kulonosen jo valasztas volt: gyorsan elkeszult, konnyu volt frissiteni es nagyon szepen mutatott.',
    'reviews.author2': 'Andrei R.',
    'reviews.location2': 'Kolozsvar',
    'reviews.review3':
      'Szeretem, hogy ugyanazzal a rendszerrel pillanatok alatt mas stilust tudok letrehozni.',
    'reviews.author3': 'Elena M.',
    'reviews.location3': 'Temesvar',

    'search.title': 'Termekkereses',
    'search.placeholder': 'Keress gyertyat, kiegeszitot, szettet...',
    'search.noResults': 'Nincs talalat',
    'search.tryDifferent': 'Probalj mas keresesi kifejezest',
    'search.quickLinks': 'Gyors linkek',

    'product.addToCart': 'Kosarba',
    'product.addedToCart': 'Kosarba teve',
    'product.inStock': 'Raktaron',
    'product.outOfStock': 'Elfogyott',
    'product.quantity': 'Mennyiseg',
    'product.features': 'Jellemzok',
    'product.aboutProduct': 'A termekrol',
    'product.reviews': 'velemeny',
    'product.whyChooseAtomra': 'Miért valaszd az Atomrat',

    'quality.premiumQuality.title': 'Premium minoseg',
    'quality.premiumQuality.description': 'Gondos kidolgozas es igenyes anyagvalasztas.',
    'quality.ecoFriendly.title': 'Tudatosabb rendszer',
    'quality.ecoFriendly.description': 'Konnyu ujratoltes es kisebb pazarlas.',
    'quality.safeBurning.title': 'Kiegyensulyozott eges',
    'quality.safeBurning.description': 'Nyugodt es jobban kontrollalhato ritualehoz tervezve.',
    'quality.fastShipping.title': 'Gyors szallitas',
    'quality.fastShipping.description': 'Megbizhato kezbesites es kedvezmenyes szallitasi kuszob.',
    'quality.safePackaging.title': 'Biztonsagos csomagolas',
    'quality.safePackaging.description': 'Vedetten es ajandekozhato allapotban erkezik.',

    'checkout.processing': 'Feldolgozas...',
    'checkout.paymentInfo': 'Fizetesi informaciok',
    'cart.error.orderFailed': 'Hiba tortent a rendeles rogzitesekor. Kerdjuk, probald ujra.',
  },
  en: {
    'banner.freeShipping': 'Free shipping on orders over 149 Lei',
    'common.lei': 'Lei',
    'common.loading': 'Loading...',
    'common.navigation': 'Navigation',
    'common.utilities': 'Utilities',

    'nav.home': 'Home',
    'nav.events': 'Events',
    'nav.accessories': 'Accessories',
    'nav.coming': 'Coming soon',
    'nav.backToCollection': 'Back to {collection}',

    'hero.title1': 'Pour.',
    'hero.title2': 'Light.',
    'hero.title3': 'Refresh.',
    'hero.subtitle': 'An elegant refillable candle ritual built around wax pearls, calm styling, and reusable vessels.',
    'hero.cta': 'Explore the collection',
    'hero.scroll': 'Scroll',

    'categories.title': 'Explore our collections',
    'categories.subtitle': 'Discover products for home styling, events, and thoughtful everyday rituals.',
    'categories.home.title': 'Home',
    'categories.home.description': 'Pieces for living spaces, dining tables, bedrooms, and cozy corners.',
    'categories.events.title': 'Events',
    'categories.events.description': 'Flexible styling for festive tables and larger spaces.',
    'categories.accessories.title': 'Accessories',
    'categories.accessories.description': 'Useful details for a more complete and elegant experience.',
    'categories.coming.title': 'Coming soon',
    'categories.coming.description': 'New collections and special sets currently in preparation.',

    'howItWorks.title': 'How it works',
    'howItWorks.subtitle': 'Simple, refillable, and easy to adapt to whichever vessel you love most.',
    'howItWorks.pour.title': 'Pour',
    'howItWorks.pour.description': 'Add the wax pearls into your chosen vessel.',
    'howItWorks.insert.title': 'Insert',
    'howItWorks.insert.description': 'Place the wick in the center, stable and clean.',
    'howItWorks.light.title': 'Light',
    'howItWorks.light.description': 'Enjoy a calm burn and a styling piece that feels personal.',
    'howItWorks.refresh.title': 'Refresh',
    'howItWorks.refresh.description': 'Top up the surface whenever you want to renew the piece.',

    'whyAtomra.title': 'Why Atomra',
    'whyAtomra.subtitle': 'A more flexible, cleaner, and more beautiful way to approach the candle ritual at home.',
    'whyAtomra.refillable.title': 'Refillable',
    'whyAtomra.refillable.description': 'The vessel stays in place while the piece can be renewed again and again.',
    'whyAtomra.eco.title': 'More mindful',
    'whyAtomra.eco.description': 'A reusable system that naturally reduces waste.',
    'whyAtomra.customize.title': 'Easy to personalize',
    'whyAtomra.customize.description': 'The vessel, quantity, and mood can all be adapted to your style.',

    'reviews.title': 'What our customers say',
    'reviews.rating': 'Loved for versatility, cleaner styling, and ease of use.',
    'reviews.review1':
      'I was able to reuse my favorite vessels and the result looked much more refined than I expected.',
    'reviews.author1': 'Maria C.',
    'reviews.location1': 'Bucharest',
    'reviews.review2':
      'For event styling it was one of the best choices: fast to set up, easy to refresh, and beautiful in photos.',
    'reviews.author2': 'Andrei R.',
    'reviews.location2': 'Cluj-Napoca',
    'reviews.review3':
      'I love how quickly I can change the vessel and the overall mood without starting from scratch.',
    'reviews.author3': 'Elena M.',
    'reviews.location3': 'Timisoara',

    'search.title': 'Search products',
    'search.placeholder': 'Search candles, accessories, sets...',
    'search.noResults': 'No results found',
    'search.tryDifferent': 'Try a different search term',
    'search.quickLinks': 'Quick links',

    'product.addToCart': 'Add to cart',
    'product.addedToCart': 'Added to cart',
    'product.inStock': 'In stock',
    'product.outOfStock': 'Out of stock',
    'product.quantity': 'Quantity',
    'product.features': 'Features',
    'product.aboutProduct': 'About the product',
    'product.reviews': 'reviews',
    'product.whyChooseAtomra': 'Why choose Atomra',

    'quality.premiumQuality.title': 'Premium quality',
    'quality.premiumQuality.description': 'Carefully finished pieces and thoughtfully selected materials.',
    'quality.ecoFriendly.title': 'More mindful',
    'quality.ecoFriendly.description': 'Easy refillability with less waste over time.',
    'quality.safeBurning.title': 'Balanced burning',
    'quality.safeBurning.description': 'Designed for a calmer and more controlled ritual.',
    'quality.fastShipping.title': 'Fast shipping',
    'quality.fastShipping.description': 'Reliable delivery with free shipping above the threshold.',
    'quality.safePackaging.title': 'Safe packaging',
    'quality.safePackaging.description': 'Protected in transit and ready to offer beautifully.',

    'checkout.processing': 'Processing...',
    'checkout.paymentInfo': 'Payment information',
    'cart.error.orderFailed': 'An error occurred while placing the order. Please try again.',
  },
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const getInitialLanguage = (): Language => {
    if (typeof window === 'undefined') {
      return 'ro';
    }

    const savedLanguage = window.localStorage.getItem('atomra_language');
    if (savedLanguage === 'ro' || savedLanguage === 'hu' || savedLanguage === 'en') {
      return savedLanguage;
    }

    return 'ro';
  };

  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('atomra_language', lang);
    }
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string, params?: Record<string, string>) => {
    let translation = translations[language][key] ?? translations.en[key] ?? key;

    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        translation = translation.replace(`{${param}}`, value);
      });
    }

    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

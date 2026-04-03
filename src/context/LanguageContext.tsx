import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'ro' | 'hu' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Comprehensive translations
const translations = {
  ro: {
    // Navigation
    'nav.home': 'Acasă',
    'nav.events': 'Evenimente',
    'nav.accessories': 'Accesorii',
    'nav.coming': 'În Curând',
    'nav.cart': 'Coș',
    'nav.search': 'Căutare',
    'nav.user': 'Cont',
    'nav.backToHome': 'Înapoi la Pagina Principală',
    'nav.backToCollection': 'Înapoi la {collection}',
    
    // Language Switcher
    'language.selectLanguage': 'Selectează Limba',
    'language.preferences': 'Preferințe de limbă',
    
    // Search
    'search.title': 'Căutare Produse',
    'search.placeholder': 'Caută lumânări, accesorii...',
    'search.noResults': 'Nu s-au găsit rezultate',
    'search.tryDifferent': 'Încearcă termeni de căutare diferiți',
    'search.quickLinks': 'Legături Rapide',
    
    // Hero Section
    'hero.title1': 'Umple.',
    'hero.title2': 'Aprinde.',
    'hero.title3': 'Reîmprospătează.',
    'hero.subtitle': 'Cea mai curată modalitate de a te bucura de lumânări — reîncărcabile cu perle de ceară.',
    'hero.cta': 'Explorează Colecția',
    'hero.scroll': 'Derulează',
    
    // Announcement Banner
    'banner.freeShipping': 'Transport gratuit pentru comenzi peste 149 Lei',
    
    // Categories
    'categories.title': 'Explorează Colecțiile Noastre',
    'categories.subtitle': 'Descoperă lumânările perfecte pentru fiecare moment și spațiu',
    'categories.all': 'Toate Produsele',
    'categories.home.title': 'Acasă',
    'categories.home.description': 'Transformă-ți spațiul de locuit',
    'categories.events.title': 'Evenimente',
    'categories.events.description': 'Perfecte pentru ocazii speciale',
    'categories.accessories.title': 'Accesorii',
    'categories.accessories.description': 'Unelte esențiale pentru lumânări',
    'categories.coming.title': 'În Curând',
    'categories.coming.description': 'Colecții noi în pregătire',
    
    // All Products Page
    'allProducts.title': 'Toate Produsele',
    'allProducts.subtitle': 'Descoperă întreaga noastră colecție de lumânări și accesorii premium',
    'allProducts.description': 'Explorează toate produsele Atomra Home România - lumânări reîncărcabile, accesorii și colecții speciale.',
    'allProducts.keywords': 'toate produsele, lumânări reîncărcabile, accesorii lumânări, colecții speciale',
    'allProducts.showing': 'Se afișează',
    'allProducts.products': 'produse',
    'allProducts.in': 'în',
    'allProducts.noProducts': 'Nu s-au găsit produse pentru această categorie',
    'allProducts.showAll': 'Afișează toate produsele',
    
    // Sort options
    'sort.name': 'Nume',
    'sort.price': 'Preț',
    'sort.rating': 'Evaluare',
    'sort.reviews': 'Recenzii',
    
    // How It Works
    'howItWorks.title': 'Cum Funcționează',
    'howItWorks.subtitle': 'Simplu, sustenabil și personalizabil la nesfârșit',
    'howItWorks.pour.title': 'Umple',
    'howItWorks.pour.description': 'Adaugă perle de ceară în recipient',
    'howItWorks.insert.title': 'Inserează',
    'howItWorks.insert.description': 'Plasează fitilul în centru',
    'howItWorks.light.title': 'Aprinde',
    'howItWorks.light.description': 'Bucură-te de experiența lumânării personalizate',
    'howItWorks.refresh.title': 'Reîmprospătează',
    'howItWorks.refresh.description': 'Pur și simplu reumple când ceara s-a consumat',
    
    // Why Atomra
    'whyAtomra.title': 'De Ce Atomra Home România',
    'whyAtomra.subtitle': 'Revoluționăm modul în care experimentezi lumânările',
    'whyAtomra.refillable.title': 'Reîncărcabile și Reutilizabile',
    'whyAtomra.refillable.description': 'Nu mai arunca niciodată un recipient de lumânare',
    'whyAtomra.eco.title': 'Ecologic',
    'whyAtomra.eco.description': 'Materiale sustenabile cu ambalaje zero deșeuri',
    'whyAtomra.customize.title': 'Personalizează-ți Lumânarea',
    'whyAtomra.customize.description': 'Amestecă parfumuri și creează combinații unice',
    
    // Reviews
    'reviews.title': 'Ce Spun Clienții Noștri',
    'reviews.rating': '4,8 din 1.000+ clienți',
    'reviews.review1': 'Cel mai inovator sistem de lumânări pe care l-am folosit vreodată. Ceara perlată arde atât de uniform, și îmi place să pot amesteca parfumuri diferite. Este sustenabil și frumos!',
    'reviews.author1': 'Maria S.',
    'reviews.location1': 'București, România',
    'reviews.review2': 'În sfârșit, o lumânare care nu creează deșeuri! Sistemul de reîncărcare este genial, iar parfumurile sunt absolut divine. Am convertit întreaga familie la lumânările Atomra.',
    'reviews.author2': 'Alexandru R.',
    'reviews.location2': 'Cluj-Napoca, România',
    'reviews.review3': 'Opțiunile de personalizare sunt nesfârșite. Pot crea atmosfere diferite pentru fiecare ocazie doar schimbând combinațiile de perle. Concept și execuție strălucite!',
    'reviews.author3': 'Elena M.',
    'reviews.location3': 'Timișoara, România',
    
    // Collections
    'homeCollection.title': 'Colecția Acasă',
    'homeCollection.subtitle': 'Transformă-ți spațiul de locuit cu colecția noastră de lumânări emblematice. Fiecare parfum este creat cu grijă pentru a crea atmosfera perfectă pentru casa ta.',
    
    'eventsCollection.title': 'Colecția Evenimente',
    'eventsCollection.subtitle': 'Perfecte pentru ocazii speciale și momente memorabile. Creează atmosfera ideală pentru orice sărbătoare cu colecțiile noastre curate pentru evenimente.',
    
    'accessoriesCollection.title': 'Accesorii',
    'accessoriesCollection.subtitle': 'Unelte și recipiente esențiale pentru a-ți îmbunătăți experiența cu lumânările. Tot ce ai nevoie pentru a întreține și a te bucura de lumânările Atomra.',
    
    'comingSoon.title': 'În Curând',
    'comingSoon.subtitle': 'Parfumuri și colecții noi sunt pe drum. Fii primul care descoperă lansările noastre viitoare și edițiile limitate.',
    'comingSoon.stayUpdated': 'Rămâi la Curent',
    'comingSoon.stayUpdatedText': 'Fii primul care află când se lansează produse noi și obține acces timpuriu exclusiv.',
    'comingSoon.emailPlaceholder': 'Introdu adresa de email',
    'comingSoon.notifyMe': 'Anunță-mă',
    
    // Products
    'product.addToCart': 'Adaugă în Coș',
    'product.viewDetails': 'Vezi Detalii',
    'product.quickView': 'Vizualizare Rapidă',
    'product.inStock': 'În Stoc',
    'product.outOfStock': 'Stoc Epuizat',
    'product.quantity': 'Cantitate',
    'product.features': 'Caracteristici',
    'product.aboutProduct': 'Despre Acest Produs',
    'product.reviews': 'recenzii',
    'product.whyChooseAtomra': 'De Ce Să Alegi Atomra',
    'product.addedToCart': 'Adăugat în coș cu succes',
    
    // Quality Features
    'quality.premiumQuality.title': 'Calitate Premium',
    'quality.premiumQuality.description': 'Materiale de cea mai înaltă calitate',
    'quality.ecoFriendly.title': 'Ecologic',
    'quality.ecoFriendly.description': 'Sustenabil și prietenos cu mediul',
    'quality.safeBurning.title': 'Ardere Sigură',
    'quality.safeBurning.description': 'Testat pentru siguranță maximă',
    'quality.fastShipping.title': 'Livrare Rapidă',
    'quality.fastShipping.description': 'Transport gratuit peste 149 Lei',
    'quality.safePackaging.title': 'Ambalare Sigură',
    'quality.safePackaging.description': 'Protecție maximă în transport',
    
    // Cart
    'cart.title': 'Coșul de Cumpărături',
    'cart.empty': 'Coșul tău este gol',
    'cart.continueShopping': 'Continuă Cumpărăturile',
    'cart.startShopping': 'Începe Cumpărăturile',
    'cart.subtotal': 'Subtotal',
    'cart.shipping': 'Transport',
    'cart.free': 'Gratuit',
    'cart.total': 'Total',
    'cart.freeShippingApplied': 'Transport gratuit aplicat!',
    'cart.checkout': 'Finalizează Comanda',
    'cart.processing': 'Se procesează...',
    'cart.completeOrder': 'Finalizează Comanda - {total} Lei',
    'cart.clearCart': 'Golește coșul',
    'cart.emptyCartError': 'Coșul tău este gol. Adaugă produse înainte de a continua.',
    'cart.orderSummary': 'Sumar Comandă',
    'cart.proceedToCheckout': 'Continuă spre Finalizare',
    'cart.freeShippingNote': 'Transport gratuit pentru comenzi peste 149 Lei',
    'cart.taxesNote': 'Toate prețurile includ TVA',
    
    // Checkout
    'checkout.customerInfo': 'Informații Client',
    'checkout.firstName': 'Prenume',
    'checkout.lastName': 'Nume',
    'checkout.email': 'Adresa de Email',
    'checkout.address': 'Adresa',
    'checkout.city': 'Orașul',
    'checkout.postalCode': 'Cod Poștal',
    'checkout.phone': 'Număr de Telefon',
    'checkout.paymentInfo': 'Informații de Plată',
    'checkout.nameOnCard': 'Numele de pe Card',
    'checkout.cardNumber': 'Numărul Cardului',
    'checkout.orderSummary': 'Rezumatul Comenzii',
    'checkout.orderConfirmed': 'Comandă Confirmată!',
    'checkout.thankYou': 'Mulțumim pentru achiziție. Vei primi un email de confirmare în scurt timp.',
    'checkout.details': 'Detalii',
    'checkout.payment': 'Plată',
    'checkout.confirmation': 'Confirmare',
    'checkout.backToCart': 'Înapoi la Coș',
    'checkout.continueToPayment': 'Continuă la Plată',
    'checkout.paymentMethod': 'Metodă de Plată',
    'checkout.cashOnDelivery': 'Plată la Livrare (Ramburs)',
    'checkout.payAtDelivery': 'Plătești când primești comanda',
    'checkout.creditCard': 'Card de Credit',
    'checkout.securePayment': 'Plată securizată prin Stripe',
    'checkout.backToDetails': 'Înapoi la Detalii',
    'checkout.placeOrder': 'Plasează Comanda',
    'checkout.payWithCard': 'Plătește cu Cardul',
    'checkout.processing': 'Se procesează...',
    'checkout.orderSuccess': 'Comanda ta a fost plasată cu succes!',
    'checkout.orderError': 'A apărut o eroare la plasarea comenzii. Te rugăm să încerci din nou.',
    'checkout.formError': 'Te rugăm să completezi toate câmpurile obligatorii.',
    'checkout.deliveryDetails': 'Detalii Livrare',
    'checkout.orderNumber': 'Număr Comandă',
    'checkout.emailSent': 'Un email de confirmare a fost trimis la',
    'checkout.backToHome': 'Înapoi la Pagina Principală',
    'checkout.viewAccount': 'Vezi Contul',
    'checkout.stripeProductNotFound': 'Produsul nu este disponibil pentru plata cu cardul. Te rugăm să alegi plata la livrare.',
    'checkout.thankYouMessage': 'Îți mulțumim pentru comandă! Vom procesa comanda ta cât mai curând posibil.',
    
    // Footer
    'footer.shop': 'Magazin',
    'footer.faq': 'Întrebări Frecvente',
    'footer.contact': 'Contact',
    'footer.privacy': 'Politica de Confidențialitate',
    'footer.terms': 'Termeni și Condiții',
    'footer.rights': '© 2025 Atomra Home România. Toate drepturile rezervate.',
    
    // Member
    'member.myAccount': 'Contul Meu',
    'member.loginRegister': 'Autentificare / Înregistrare',
    'member.signInPrompt': 'Autentifică-te pentru a vedea comenzile și a-ți gestiona profilul.',
    
    // Common
    'common.lei': 'Lei',
    'common.loading': 'Se încarcă...',
    'common.error': 'Eroare',
    'common.success': 'Succes',
    'common.close': 'Închide',
    'common.save': 'Salvează',
    'common.cancel': 'Anulează',
    'common.confirm': 'Confirmă',
    'common.yes': 'Da',
    'common.no': 'Nu',
    'common.admin': 'Admin',
    'common.logout': 'Deconectare',
    'common.navigation': 'Navigare',
    'common.utilities': 'Utilități'
  },
  
  hu: {
    // Navigation
    'nav.home': 'Otthon',
    'nav.events': 'Események',
    'nav.accessories': 'Kiegészítők',
    'nav.coming': 'Hamarosan',
    'nav.cart': 'Kosár',
    'nav.search': 'Keresés',
    'nav.user': 'Fiók',
    'nav.backToHome': 'Vissza a Főoldalra',
    'nav.backToCollection': 'Vissza a {collection} gyűjteményhez',
    
    // Language Switcher
    'language.selectLanguage': 'Nyelv Kiválasztása',
    'language.preferences': 'Nyelvi beállítások',
    
    // Search
    'search.title': 'Termékek Keresése',
    'search.placeholder': 'Keress gyertyákat, kiegészítőket...',
    'search.noResults': 'Nincs találat',
    'search.tryDifferent': 'Próbálj más keresési kifejezéseket',
    'search.quickLinks': 'Gyors Linkek',
    
    // Hero Section
    'hero.title1': 'Töltsd.',
    'hero.title2': 'Gyújtsd.',
    'hero.title3': 'Frissítsd.',
    'hero.subtitle': 'A legtisztább módja a gyertyák élvezetének — újratölthető viaszgyöngyökkel.',
    'hero.cta': 'Kollekció Felfedezése',
    'hero.scroll': 'Görgetés',
    
    // Announcement Banner
    'banner.freeShipping': 'Ingyenes szállítás 149 Lei feletti rendeléseknél',
    
    // Categories
    'categories.title': 'Fedezd Fel Kollekcióinkat',
    'categories.subtitle': 'Találd meg a tökéletes gyertyákat minden pillanathoz és térhez',
    'categories.all': 'Minden Termék',
    'categories.home.title': 'Otthon',
    'categories.home.description': 'Alakítsd át lakóteredet',
    'categories.events.title': 'Események',
    'categories.events.description': 'Tökéletes különleges alkalmakra',
    'categories.accessories.title': 'Kiegészítők',
    'categories.accessories.description': 'Alapvető gyertya eszközök',
    'categories.coming.title': 'Hamarosan',
    'categories.coming.description': 'Új kollekciók érkeznek',
    
    // All Products Page
    'allProducts.title': 'Minden Termék',
    'allProducts.subtitle': 'Fedezd fel teljes prémium gyertya és kiegészítő kollekciónkat',
    'allProducts.description': 'Fedezd fel az összes Atomra Home Románia terméket - újratölthető gyertyák, kiegészítők és különleges kollekciók.',
    'allProducts.keywords': 'minden termék, újratölthető gyertyák, gyertya kiegészítők, különleges kollekciók',
    'allProducts.showing': 'Megjelenítés',
    'allProducts.products': 'termék',
    'allProducts.in': 'ebben:',
    'allProducts.noProducts': 'Nem találhatók termékek ebben a kategóriában',
    'allProducts.showAll': 'Minden termék megjelenítése',
    
    // Sort options
    'sort.name': 'Név',
    'sort.price': 'Ár',
    'sort.rating': 'Értékelés',
    'sort.reviews': 'Vélemények',
    
    // How It Works
    'howItWorks.title': 'Hogyan Működik',
    'howItWorks.subtitle': 'Egyszerű, fenntartható és végtelenül testreszabható',
    'howItWorks.pour.title': 'Töltsd',
    'howItWorks.pour.description': 'Adj viaszgyöngyöket a tartályba',
    'howItWorks.insert.title': 'Helyezd Be',
    'howItWorks.insert.description': 'Tedd a kanócot a középre',
    'howItWorks.light.title': 'Gyújtsd Meg',
    'howItWorks.light.description': 'Élvezd az egyedi gyertya élményt',
    'howItWorks.refresh.title': 'Frissítsd',
    'howItWorks.refresh.description': 'Egyszerűen töltsd újra, amikor a viasz elfogyott',
    
    // Why Atomra
    'whyAtomra.title': 'Miért Atomra Home Románia',
    'whyAtomra.subtitle': 'Forradalmasítjuk a gyertyák élményét',
    'whyAtomra.refillable.title': 'Újratölthető és Újrafelhasználható',
    'whyAtomra.refillable.description': 'Soha többé ne dobd ki a gyertya tartályt',
    'whyAtomra.eco.title': 'Környezetbarát',
    'whyAtomra.eco.description': 'Fenntartható anyagok nulla hulladék csomagolással',
    'whyAtomra.customize.title': 'Szabd Testre a Gyertyádat',
    'whyAtomra.customize.description': 'Keverd az illatokat és hozz létre egyedi kombinációkat',
    
    // Reviews
    'reviews.title': 'Mit Mondanak Ügyfeleink',
    'reviews.rating': '4,8 az 1.000+ ügyféltől',
    'reviews.review1': 'A legújítóbb gyertya rendszer, amit valaha használtam. A gyöngy viasz olyan egyenletesen ég, és szeretem, hogy különböző illatokat keverhetek. Fenntartható és gyönyörű!',
    'reviews.author1': 'Mária K.',
    'reviews.location1': 'Bukarest, Románia',
    'reviews.review2': 'Végre egy gyertya, ami nem termel hulladékot! Az újratöltő rendszer zseniális, és az illatok teljesen isteni. Az egész családomat átállítottam Atomra gyertyákra.',
    'reviews.author2': 'Sándor R.',
    'reviews.location2': 'Kolozsvár, Románia',
    'reviews.review3': 'A testreszabási lehetőségek végtelenek. Különböző hangulatokat tudok teremteni minden alkalomra csak a gyöngy kombinációk változtatásával. Zseniális koncepció és kivitelezés!',
    'reviews.author3': 'Ilona M.',
    'reviews.location3': 'Temesvár, Románia',
    
    // Collections
    'homeCollection.title': 'Otthon Kollekció',
    'homeCollection.subtitle': 'Alakítsd át lakóteredet jellegzetes gyertya kollekciónkkal. Minden illat gondosan készült, hogy tökéletes hangulatot teremtsen otthonodban.',
    
    'eventsCollection.title': 'Események Kollekció',
    'eventsCollection.subtitle': 'Tökéletes különleges alkalmakra és emlékezetes pillanatokra. Teremtsd meg az ideális hangulatot bármilyen ünnepléshez kurátori esemény kollekcióinkkal.',
    
    'accessoriesCollection.title': 'Kiegészítők',
    'accessoriesCollection.subtitle': 'Alapvető eszközök és tartályok a gyertya élmény fokozásához. Minden, amire szükséged van Atomra gyertyáid karbantartásához és élvezetéhez.',
    
    'comingSoon.title': 'Hamarosan',
    'comingSoon.subtitle': 'Új illatok és kollekciók úton vannak. Légy az első, aki felfedezi közelgő kiadásainkat és limitált szériáinkat.',
    'comingSoon.stayUpdated': 'Maradj Naprakész',
    'comingSoon.stayUpdatedText': 'Légy az első, aki megtudja, mikor indulnak új termékek és kapj exkluzív korai hozzáférést.',
    'comingSoon.emailPlaceholder': 'Add meg az email címed',
    'comingSoon.notifyMe': 'Értesítés',
    
    // Products
    'product.addToCart': 'Kosárba',
    'product.viewDetails': 'Részletek Megtekintése',
    'product.quickView': 'Gyors Megtekintés',
    'product.inStock': 'Raktáron',
    'product.outOfStock': 'Elfogyott',
    'product.quantity': 'Mennyiség',
    'product.features': 'Jellemzők',
    'product.aboutProduct': 'A Termékről',
    'product.reviews': 'értékelés',
    'product.whyChooseAtomra': 'Miért Válaszd az Atomrát',
    'product.addedToCart': 'Sikeresen hozzáadva a kosárhoz',
    
    // Quality Features
    'quality.premiumQuality.title': 'Prémium Minőség',
    'quality.premiumQuality.description': 'A legmagasabb minőségű anyagok',
    'quality.ecoFriendly.title': 'Környezetbarát',
    'quality.ecoFriendly.description': 'Fenntartható és környezetbarát',
    'quality.safeBurning.title': 'Biztonságos Égés',
    'quality.safeBurning.description': 'Maximális biztonságra tesztelve',
    'quality.fastShipping.title': 'Gyors Szállítás',
    'quality.fastShipping.description': 'Ingyenes szállítás 149 Lei felett',
    'quality.safePackaging.title': 'Biztonságos Csomagolás',
    'quality.safePackaging.description': 'Maximális védelem szállítás közben',
    
    // Cart
    'cart.title': 'Bevásárlókosár',
    'cart.empty': 'A kosarad üres',
    'cart.continueShopping': 'Vásárlás Folytatása',
    'cart.startShopping': 'Vásárlás Kezdése',
    'cart.subtotal': 'Részösszeg',
    'cart.shipping': 'Szállítás',
    'cart.free': 'Ingyenes',
    'cart.total': 'Összesen',
    'cart.freeShippingApplied': 'Ingyenes szállítás alkalmazva!',
    'cart.checkout': 'Pénztár',
    'cart.processing': 'Feldolgozás...',
    'cart.completeOrder': 'Rendelés Befejezése - {total} Lei',
    'cart.clearCart': 'Kosár ürítése',
    'cart.emptyCartError': 'A kosarad üres. Adj hozzá termékeket a folytatás előtt.',
    'cart.orderSummary': 'Rendelés Összefoglaló',
    'cart.proceedToCheckout': 'Tovább a Pénztárhoz',
    'cart.freeShippingNote': 'Ingyenes szállítás 149 Lei feletti rendelésekre',
    'cart.taxesNote': 'Minden ár tartalmazza az ÁFÁ-t',
    
    // Checkout
    'checkout.customerInfo': 'Vásárlói Információk',
    'checkout.firstName': 'Keresztnév',
    'checkout.lastName': 'Vezetéknév',
    'checkout.email': 'Email Cím',
    'checkout.address': 'Cím',
    'checkout.city': 'Város',
    'checkout.postalCode': 'Irányítószám',
    'checkout.phone': 'Telefonszám',
    'checkout.paymentInfo': 'Fizetési Információk',
    'checkout.nameOnCard': 'Név a Kártyán',
    'checkout.cardNumber': 'Kártyaszám',
    'checkout.orderSummary': 'Rendelés Összefoglaló',
    'checkout.orderConfirmed': 'Rendelés Megerősítve!',
    'checkout.thankYou': 'Köszönjük a vásárlást. Hamarosan kapsz egy megerősítő emailt.',
    'checkout.details': 'Adatok',
    'checkout.payment': 'Fizetés',
    'checkout.confirmation': 'Megerősítés',
    'checkout.backToCart': 'Vissza a Kosárhoz',
    'checkout.continueToPayment': 'Tovább a Fizetéshez',
    'checkout.paymentMethod': 'Fizetési Mód',
    'checkout.cashOnDelivery': 'Utánvét',
    'checkout.payAtDelivery': 'Fizetés átvételkor',
    'checkout.creditCard': 'Bankkártya',
    'checkout.securePayment': 'Biztonságos fizetés Stripe-on keresztül',
    'checkout.backToDetails': 'Vissza az Adatokhoz',
    'checkout.placeOrder': 'Rendelés Leadása',
    'checkout.payWithCard': 'Fizetés Kártyával',
    'checkout.processing': 'Feldolgozás...',
    'checkout.orderSuccess': 'Rendelésedet sikeresen leadtad!',
    'checkout.orderError': 'Hiba történt a rendelés leadásakor. Kérjük, próbáld újra.',
    'checkout.formError': 'Kérjük, töltsd ki az összes kötelező mezőt.',
    'checkout.deliveryDetails': 'Szállítási Adatok',
    'checkout.orderNumber': 'Rendelésszám',
    'checkout.emailSent': 'Visszaigazoló e-mailt küldtünk a következő címre:',
    'checkout.backToHome': 'Vissza a Főoldalra',
    'checkout.viewAccount': 'Fiók Megtekintése',
    'checkout.stripeProductNotFound': 'A termék nem érhető el kártyás fizetésre. Kérjük, válaszd az utánvétet.',
    'checkout.thankYouMessage': 'Köszönjük a rendelésedet! A lehető leghamarabb feldolgozzuk.',
    
    // Footer
    'footer.shop': 'Bolt',
    'footer.faq': 'GYIK',
    'footer.contact': 'Kapcsolat',
    'footer.privacy': 'Adatvédelmi Irányelvek',
    'footer.terms': 'Felhasználási Feltételek',
    'footer.rights': '© 2025 Atomra Home Románia. Minden jog fenntartva.',
    
    // Member
    'member.myAccount': 'Fiókom',
    'member.loginRegister': 'Bejelentkezés / Regisztráció',
    'member.signInPrompt': 'Jelentkezz be a rendeléseid megtekintéséhez és a profilod kezeléséhez.',
    
    // Common
    'common.lei': 'Lei',
    'common.loading': 'Betöltés...',
    'common.error': 'Hiba',
    'common.success': 'Siker',
    'common.close': 'Bezárás',
    'common.save': 'Mentés',
    'common.cancel': 'Mégse',
    'common.confirm': 'Megerősítés',
    'common.yes': 'Igen',
    'common.no': 'Nem',
    'common.admin': 'Admin',
    'common.logout': 'Kijelentkezés',
    'common.navigation': 'Navigáció',
    'common.utilities': 'Segédprogramok'
  },
  
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.events': 'Events',
    'nav.accessories': 'Accessories',
    'nav.coming': 'Coming Soon',
    'nav.cart': 'Cart',
    'nav.search': 'Search',
    'nav.user': 'Account',
    'nav.backToHome': 'Back to Home',
    'nav.backToCollection': 'Back to {collection}',
    
    // Language Switcher
    'language.selectLanguage': 'Select Language',
    'language.preferences': 'Language preferences',
    
    // Search
    'search.title': 'Search Products',
    'search.placeholder': 'Search candles, accessories...',
    'search.noResults': 'No results found',
    'search.tryDifferent': 'Try different search terms',
    'search.quickLinks': 'Quick Links',
    
    // Hero Section
    'hero.title1': 'Pour.',
    'hero.title2': 'Light.',
    'hero.title3': 'Refresh.',
    'hero.subtitle': 'The cleanest way to enjoy candles — refillable with wax pearls.',
    'hero.cta': 'Explore Collection',
    'hero.scroll': 'Scroll',
    
    // Announcement Banner
    'banner.freeShipping': 'Free shipping on orders over 149 Lei',
    
    // Categories
    'categories.title': 'Explore Our Collections',
    'categories.subtitle': 'Discover the perfect candles for every moment and space',
    'categories.all': 'All Products',
    'categories.home.title': 'Home',
    'categories.home.description': 'Transform your living space',
    'categories.events.title': 'Events',
    'categories.events.description': 'Perfect for special occasions',
    'categories.accessories.title': 'Accessories',
    'categories.accessories.description': 'Essential candle tools',
    'categories.coming.title': 'Coming Soon',
    'categories.coming.description': 'New collections arriving',
    
    // All Products Page
    'allProducts.title': 'All Products',
    'allProducts.subtitle': 'Discover our complete collection of premium candles and accessories',
    'allProducts.description': 'Explore all Atomra Home Romania products - refillable candles, accessories, and special collections.',
    'allProducts.keywords': 'all products, refillable candles, candle accessories, special collections',
    'allProducts.showing': 'Showing',
    'allProducts.products': 'products',
    'allProducts.in': 'in',
    'allProducts.noProducts': 'No products found for this category',
    'allProducts.showAll': 'Show all products',
    
    // Sort options
    'sort.name': 'Name',
    'sort.price': 'Price',
    'sort.rating': 'Rating',
    'sort.reviews': 'Reviews',
    
    // How It Works
    'howItWorks.title': 'How It Works',
    'howItWorks.subtitle': 'Simple, sustainable, and endlessly customizable',
    'howItWorks.pour.title': 'Pour',
    'howItWorks.pour.description': 'Add pearled wax to your container',
    'howItWorks.insert.title': 'Insert',
    'howItWorks.insert.description': 'Place the wick in the center',
    'howItWorks.light.title': 'Light',
    'howItWorks.light.description': 'Enjoy your custom candle experience',
    'howItWorks.refresh.title': 'Refresh',
    'howItWorks.refresh.description': 'Simply refill when wax is used',
    
    // Why Atomra
    'whyAtomra.title': 'Why Atomra Home Romania',
    'whyAtomra.subtitle': 'Revolutionizing the way you experience candles',
    'whyAtomra.refillable.title': 'Refillable & Reusable',
    'whyAtomra.refillable.description': 'Never throw away another candle container again',
    'whyAtomra.eco.title': 'Eco-Friendly',
    'whyAtomra.eco.description': 'Sustainable materials with zero waste packaging',
    'whyAtomra.customize.title': 'Customize Your Candle',
    'whyAtomra.customize.description': 'Mix scents and create unique combinations',
    
    // Reviews
    'reviews.title': 'What Our Customers Say',
    'reviews.rating': '4.8 from 1,000+ customers',
    'reviews.review1': 'The most innovative candle system I\'ve ever used. The pearled wax burns so evenly, and I love being able to mix different scents. It\'s sustainable and beautiful!',
    'reviews.author1': 'Sarah M.',
    'reviews.location1': 'London, UK',
    'reviews.review2': 'Finally, a candle that doesn\'t create waste! The refill system is genius, and the scents are absolutely divine. I\'ve converted my entire family to Atomra candles.',
    'reviews.author2': 'Michael R.',
    'reviews.location2': 'Paris, France',
    'reviews.review3': 'The customization options are endless. I can create different moods for every occasion just by changing the pearl combinations. Brilliant concept and execution!',
    'reviews.author3': 'Emma L.',
    'reviews.location3': 'Berlin, Germany',
    
    // Collections
    'homeCollection.title': 'Home Collection',
    'homeCollection.subtitle': 'Transform your living space with our signature candle collection. Each scent is carefully crafted to create the perfect ambiance for your home.',
    
    'eventsCollection.title': 'Events Collection',
    'eventsCollection.subtitle': 'Perfect for special occasions and memorable moments. Create the ideal atmosphere for any celebration with our curated event collections.',
    
    'accessoriesCollection.title': 'Accessories',
    'accessoriesCollection.subtitle': 'Essential tools and containers to enhance your candle experience. Everything you need to maintain and enjoy your Atomra candles.',
    
    'comingSoon.title': 'Coming Soon',
    'comingSoon.subtitle': 'New fragrances and collections are on the way. Be the first to discover our upcoming releases and limited editions.',
    'comingSoon.stayUpdated': 'Stay Updated',
    'comingSoon.stayUpdatedText': 'Be the first to know when new products launch and get exclusive early access.',
    'comingSoon.emailPlaceholder': 'Enter your email',
    'comingSoon.notifyMe': 'Notify Me',
    
    // Products
    'product.addToCart': 'Add to Cart',
    'product.viewDetails': 'View Details',
    'product.quickView': 'Quick View',
    'product.inStock': 'In Stock',
    'product.outOfStock': 'Out of Stock',
    'product.quantity': 'Quantity',
    'product.features': 'Features',
    'product.aboutProduct': 'About This Product',
    'product.reviews': 'reviews',
    'product.whyChooseAtomra': 'Why Choose Atomra',
    'product.addedToCart': 'Added to cart successfully',
    
    // Quality Features
    'quality.premiumQuality.title': 'Premium Quality',
    'quality.premiumQuality.description': 'Highest quality materials',
    'quality.ecoFriendly.title': 'Eco-Friendly',
    'quality.ecoFriendly.description': 'Sustainable and environmentally friendly',
    'quality.safeBurning.title': 'Safe Burning',
    'quality.safeBurning.description': 'Tested for maximum safety',
    'quality.fastShipping.title': 'Fast Shipping',
    'quality.fastShipping.description': 'Free shipping over 149 Lei',
    'quality.safePackaging.title': 'Safe Packaging',
    'quality.safePackaging.description': 'Maximum protection during transport',
    
    // Cart
    'cart.title': 'Shopping Cart',
    'cart.empty': 'Your cart is empty',
    'cart.continueShopping': 'Continue Shopping',
    'cart.startShopping': 'Start Shopping',
    'cart.subtotal': 'Subtotal',
    'cart.shipping': 'Shipping',
    'cart.free': 'Free',
    'cart.total': 'Total',
    'cart.freeShippingApplied': 'Free shipping applied!',
    'cart.checkout': 'Checkout',
    'cart.processing': 'Processing...',
    'cart.completeOrder': 'Complete Order - {total} Lei',
    'cart.clearCart': 'Clear cart',
    'cart.emptyCartError': 'Your cart is empty. Please add products before proceeding.',
    'cart.orderSummary': 'Order Summary',
    'cart.proceedToCheckout': 'Proceed to Checkout',
    'cart.freeShippingNote': 'Free shipping on orders over 149 Lei',
    'cart.taxesNote': 'All prices include VAT',
    
    // Checkout
    'checkout.customerInfo': 'Customer Information',
    'checkout.firstName': 'First Name',
    'checkout.lastName': 'Last Name',
    'checkout.email': 'Email Address',
    'checkout.address': 'Address',
    'checkout.city': 'City',
    'checkout.postalCode': 'Postal Code',
    'checkout.phone': 'Phone Number',
    'checkout.paymentInfo': 'Payment Information',
    'checkout.nameOnCard': 'Name on Card',
    'checkout.cardNumber': 'Card Number',
    'checkout.orderSummary': 'Order Summary',
    'checkout.orderConfirmed': 'Order Confirmed!',
    'checkout.thankYou': 'Thank you for your purchase. You\'ll receive a confirmation email shortly.',
    'checkout.details': 'Details',
    'checkout.payment': 'Payment',
    'checkout.confirmation': 'Confirmation',
    'checkout.backToCart': 'Back to Cart',
    'checkout.continueToPayment': 'Continue to Payment',
    'checkout.paymentMethod': 'Payment Method',
    'checkout.cashOnDelivery': 'Cash on Delivery',
    'checkout.payAtDelivery': 'Pay when you receive your order',
    'checkout.creditCard': 'Credit Card',
    'checkout.securePayment': 'Secure payment via Stripe',
    'checkout.backToDetails': 'Back to Details',
    'checkout.placeOrder': 'Place Order',
    'checkout.payWithCard': 'Pay with Card',
    'checkout.processing': 'Processing...',
    'checkout.orderSuccess': 'Your order has been placed successfully!',
    'checkout.orderError': 'An error occurred while placing your order. Please try again.',
    'checkout.formError': 'Please fill in all required fields.',
    'checkout.deliveryDetails': 'Delivery Details',
    'checkout.orderNumber': 'Order Number',
    'checkout.emailSent': 'A confirmation email has been sent to',
    'checkout.backToHome': 'Back to Home',
    'checkout.viewAccount': 'View Account',
    'checkout.stripeProductNotFound': 'Product not available for card payment. Please choose cash on delivery.',
    'checkout.thankYouMessage': 'Thank you for your order! We will process your order as soon as possible.',
    
    // Footer
    'footer.shop': 'Shop',
    'footer.faq': 'FAQ',
    'footer.contact': 'Contact',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.rights': '© 2025 Atomra Home Romania. All rights reserved.',
    
    // Member
    'member.myAccount': 'My Account',
    'member.loginRegister': 'Login / Register',
    'member.signInPrompt': 'Sign in to view orders and manage your profile.',
    
    // Common
    'common.lei': 'Lei',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.close': 'Close',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
    'common.yes': 'Yes',
    'common.no': 'No',
    'common.admin': 'Admin',
    'common.logout': 'Logout',
    'common.navigation': 'Navigation',
    'common.utilities': 'Utilities'
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Try to get language from localStorage, default to 'ro'
  const savedLanguage = localStorage.getItem('atomra_language');
  const initialLanguage: Language = (savedLanguage as Language) || 'ro';
  
  const [language, setLanguage] = useState<Language>(initialLanguage);

  // Save language preference to localStorage when it changes
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('atomra_language', lang);
    
    // Update HTML lang attribute for accessibility and SEO
    document.documentElement.lang = lang;
  };

  // Set initial HTML lang attribute
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string, params?: Record<string, string>): string => {
    let translation = translations[language][key] || translations['en'][key] || key;
    
    // Replace parameters in translation
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        translation = translation.replace(`{${param}}`, value);
      });
    }
    
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
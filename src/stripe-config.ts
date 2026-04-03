export interface StripeProduct {
  id: string;
  priceId: string;
  name: string;
  description: string;
  mode: 'payment' | 'subscription';
}

export const stripeProducts: StripeProduct[] = [
  {
    id: 'granule-box-750g',
    priceId: 'price_1RdYCDBEuvxC28exjGFvxgwu',
    name: 'Ceara de nisip "Granule Box" 750g + 10 fitile | Lumanare Perlata | Cadou | Decor',
    description: 'Ceara de nisip, cunoscuta și sub numele de lumanare perlata, lumanare pudra, praf de lumanare sau perle de lumanare. Textura sa perlata și granulata este perfecta pentru crearea unor lumanari albe elegante, pentru a oferi ca si cadou sau pentru realizarea unui decor unic si relaxant. Nisipul nostru pentru lumânări este absolut inodor, oferind o soluție pură și fără parfum pentru cei care preferă o atmosferă naturală și nealterată. - Pachetul contine: -Ceara de nisip si fitil',
    mode: 'payment',
  },
  {
    id: 'pachet-essenza-150g',
    priceId: 'price_1Rf1pxBEuvxC28exFiVi4VgX',
    name: 'Lumanare Perlata Pachet Essenza |150g+3fitile | Pahar Decorativ | Lumanare',
    description: 'Pachet Essenza Creează o atmosferă intimă și relaxantă cu Pachetul Essenza, pachetul nostru esențial. Conține tot ce ai nevoie pentru o experiență simplă, dar rafinată: 150g de ceară de nisip eco-friendly, 3 fitile și un pahar decorativ mic, perfect pentru a adăuga o notă de eleganță discretă în orice spațiu. Pachetul contine: Ceara de nisip, fitil si pahar decorativ',
    mode: 'payment',
  },
  {
    id: 'pachet-splendore-250g',
    priceId: 'price_1Rf1m7BEuvxC28exw9vULbVd',
    name: 'Lumanare Perlata Pachet Splendore | 250g+5fitile | Pahar Decorativ | Lumanare',
    description: 'Pachetul Splendore Pentru cei care își doresc mai mult, Pachetul Splendore oferă o experiență versatilă și de impact. Conține 250g de ceară de nisip, 5 fitile și un pahar decorativ la alegere, astfel încât să poți personaliza atmosfera după bunul plac. Perfect pentru momente speciale și un decor sofisticat. Pachetul contine: Ceara de nisip, fitil, pahar decorativ',
    mode: 'payment',
  },
  {
    id: 'ceara-nisip-4-5kg-evenimente',
    priceId: 'price_1Rf1tyBEuvxC28exlEI1yR1u',
    name: 'Ceara de nisip 4.5 kg + 60fitile cadou | Lumanare perlata | Idei decor eveniment',
    description: 'Ceara de nisip, cunoscuta și sub numele de lumanare perlata, lumanare pudra, praf de lumanare sau perle de lumanare. Textura sa perlata și granulata este perfecta pentru crearea unor lumanari albe elegante, pentru a oferi ca si cadou sau pentru realizarea unui decor pentru eveniment special Nisipul nostru pentru lumânări este absolut inodor, oferind o soluție pură și fără parfum pentru cei care preferă o atmosferă naturală și nealterată. Pachetul contine: Ceara de nisip si fitil',
    mode: 'payment',
  }
];

export const getProductByPriceId = (priceId: string): StripeProduct | undefined => {
  return stripeProducts.find(product => product.priceId === priceId);
};

export const getProductById = (id: string): StripeProduct | undefined => {
  return stripeProducts.find(product => product.id === id);
};
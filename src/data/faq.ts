import type { Language } from '../context/LanguageContext';

export interface FaqItem {
  id: number;
  icon: string;
  question: string;
  answer: string;
}

const FAQ_CONTENT: Record<Language, FaqItem[]> = {
  ro: [
    {
      id: 1,
      icon: '🔥',
      question: 'Ce sunt lumânările perlate (ceară perlată sau ceară de nisip)?',
      answer:
        'Lumânările perlate de la Atomra Home Romania sunt realizate din ceară perlată naturală vegetală cu granulație fină. Nu conțin parfumuri sintetice sau parafina chimică și îți permit să toarni cantitatea dorită în orice recipient pentru o lumânare perlată reîncărcabilă nouă de fiecare dată.',
    },
    {
      id: 2,
      icon: '🌿',
      question: 'De ce să alegi o lumânare naturală din ceară perlată?',
      answer:
        'O lumânare naturală din ceară de la Atomra oferă ardere 100% curată, fără fum toxic sau parfumuri iritante. Este hipoalergenică, sigură pentru copii și animale de companie, fiind ideală pentru living, dormitor, mese festive sau seri relaxante.',
    },
    {
      id: 3,
      icon: '🎁',
      question: 'Care sunt cele mai inspirate idei cadou lumânare pentru persoanele dragi?',
      answer:
        'Dacă cauți idei cadou lumânare elegante, seturile Atomra Granule Box (750g) și Pachetul Essenza cu recipiente speciale sunt alegerea perfectă. Sunt cadouri premium apreciate pentru aniversări, nunți, cadouri de casă nouă sau sărbători.',
    },
    {
      id: 4,
      icon: '✨',
      question: 'De ce o lumânare perlată cadou este alegerea ideală?',
      answer:
        'O lumânare perlată cadou este un dar memorabil și sustenabil. Spre deosebire de lumânările clasice care se ard și se aruncă, o lumânare perlată cadou permite reutilizarea recipientului la infinit adăugând un nou strat de ceară perlată și un fitil proaspăt.',
    },
    {
      id: 5,
      icon: '🌱',
      question: 'Produsele sunt eco și sigure?',
      answer:
        'Da, produsele noastre sunt orientate spre un consum mai responsabil. Ceara de nisip este vegetală, biodegradabilă și nu conține substanțe toxice, iar fitilele sunt din bumbac natural.',
    },
    {
      id: 6,
      icon: '🛒',
      question: 'Cum plasez o comandă?',
      answer:
        'Poți plasa o comandă direct pe site. Adaugă produsele dorite în coș, completează datele de livrare și alege metoda de plată preferată.',
    },
    {
      id: 7,
      icon: '🚚',
      question: 'În cât timp ajunge comanda?',
      answer:
        'Comenzile sunt procesate în 1-2 zile lucrătoare și livrate în 2-5 zile lucrătoare, în funcție de locația ta. Oferim transport gratuit pentru comenzi peste 149 Lei în toată România.',
    },
    {
      id: 8,
      icon: '❓',
      question: 'Ai alte întrebări?',
      answer:
        'Dacă ai alte întrebări sau ai nevoie de ajutor, ne poți contacta prin email sau telefon. Echipa noastră este aici să te ajute.',
    },
  ],
  hu: [
    {
      id: 1,
      icon: '🔥',
      question: 'Mi az a homokviasz?',
      answer:
        'A homokviasz természetes növényi viasz, finom szemcsés textúrával. Nem tartalmaz illatanyagokat vagy vegyi adalékokat, és biológiailag lebomló.',
    },
    {
      id: 2,
      icon: '💡',
      question: 'Hogyan használd az Atomra gyertyákat?',
      answer:
        'Öntsd a viaszgyöngyöket a kívánt tartóba, helyezz egy kanócot a közepére, majd gyújtsd meg. Amikor elfogyott, új gyöngyökkel újratölthető.',
    },
    {
      id: 3,
      icon: '♻️',
      question: 'Újrahasználható a viasz?',
      answer:
        'Igen. A homokviasz többször is újrahasználható, így fenntartható és gazdaságos megoldás.',
    },
    {
      id: 4,
      icon: '🎁',
      question: 'Ajándékba adhatók az Atomra gyertyák?',
      answer:
        'Igen, az Atomra gyertyák kifejezetten jó ajándékötletek elegáns megjelenésük és különleges koncepciójuk miatt.',
    },
    {
      id: 5,
      icon: '🌱',
      question: 'Környezetbarátok és biztonságosak a termékek?',
      answer:
        'Igen, a termékeink környezettudatosabb használatra készülnek. A homokviasz növényi eredetű, a kanócok természetes pamutból készülnek.',
    },
    {
      id: 6,
      icon: '🛒',
      question: 'Hogyan rendelhetek?',
      answer:
        'Közvetlenül a weboldalon rendelhetsz. Tedd kosárba a termékeket, töltsd ki a szállítási adatokat, és válassz fizetési módot.',
    },
    {
      id: 7,
      icon: '🚚',
      question: 'Mennyi idő alatt érkezik meg a rendelés?',
      answer:
        'A rendeléseket 1-2 munkanapon belül feldolgozzuk, a kiszállítás pedig általában 2-5 munkanapot vesz igénybe.',
    },
    {
      id: 8,
      icon: '❓',
      question: 'Van más kérdésed?',
      answer: 'Ha további kérdéseid vannak, írj nekünk vagy hívj fel bennünket, és segítünk.',
    },
  ],
  en: [
    {
      id: 1,
      icon: '🔥',
      question: 'What is sand wax?',
      answer:
        'Sand wax is a natural vegetable wax with a granular texture similar to fine sand. It contains no fragrances or chemical additives and is biodegradable.',
    },
    {
      id: 2,
      icon: '💡',
      question: 'How do I use Atomra candles?',
      answer:
        "It's very simple. Pour the wax pearls into your desired container, add a wick in the center, and light it. When the wax is consumed, simply add new pearls to continue enjoying your candle.",
    },
    {
      id: 3,
      icon: '♻️',
      question: 'Can the wax be reused?',
      answer:
        "Yes. Sand wax can be reused multiple times. After it's consumed, you can add new pearls over the existing remnants or clean the container and start fresh.",
    },
    {
      id: 4,
      icon: '🎁',
      question: 'Can Atomra candles be given as gifts?',
      answer:
        'Absolutely. Atomra candles make perfect gifts thanks to their elegant design and innovative concept. We also offer options suited for gifting and special events.',
    },
    {
      id: 5,
      icon: '🌱',
      question: 'Are the products eco-friendly and safe?',
      answer:
        'Yes, our products support more responsible use. Sand wax is vegetable-based, biodegradable, and free from toxic substances, while the wicks are made from natural cotton.',
    },
    {
      id: 6,
      icon: '🛒',
      question: 'How do I place an order?',
      answer:
        'You can place an order directly on our website. Add your desired products to the cart, fill in your delivery details, and choose your preferred payment method.',
    },
    {
      id: 7,
      icon: '🚚',
      question: 'How long does delivery take?',
      answer:
        'Orders are processed within 1-2 business days and delivered within 2-5 business days depending on your location. We offer free shipping for orders over 149 Lei throughout Romania.',
    },
    {
      id: 8,
      icon: '❓',
      question: 'Have other questions?',
      answer:
        'If you have other questions or need assistance, contact us by email or phone and our team will be happy to help.',
    },
  ],
};

export const getFaqItems = (language: Language) => FAQ_CONTENT[language];

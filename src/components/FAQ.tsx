import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [visibleItems, setVisibleItems] = useState<boolean[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();

  // FAQ items based on language
  const getFaqItems = () => {
    if (language === 'ro') {
      return [
        {
          id: 1,
          icon: '🔥',
          question: 'Ce este ceara de nisip?',
          answer: 'Ceara de nisip este o ceară vegetală naturală, cu aspect granular, asemănător nisipului fin. Nu conține parfumuri sau aditivi chimici și este complet biodegradabilă – o alternativă eco și sigură la lumânările clasice.'
        },
        {
          id: 2,
          icon: '💡',
          question: 'Cum folosesc lumânările Atomra?',
          answer: 'Este foarte simplu! Toarnă granulele de ceară în recipientul dorit, adaugă un fitil în centru și aprinde. Când ceara se consumă, pur și simplu adaugi granule noi pentru a continua să te bucuri de lumânare.'
        },
        {
          id: 3,
          icon: '♻️',
          question: 'Ceara se poate refolosi?',
          answer: 'Da! Ceara de nisip poate fi reutilizată de mai multe ori. După ce se consumă, poți adăuga granule noi peste resturile existente sau poți curăța recipientul și începe din nou. Este o soluție sustenabilă și economică.'
        },
        {
          id: 4,
          icon: '🎁',
          question: 'Se pot oferi lumânările Atomra cadou?',
          answer: 'Absolut! Lumânările Atomra sunt cadouri perfecte datorită designului elegant și conceptului inovator. Oferim și opțiuni speciale de ambalare pentru cadouri, precum și seturi personalizate pentru evenimente speciale.'
        },
        {
          id: 5,
          icon: '🌱',
          question: 'Produsele sunt eco și sigure?',
          answer: 'Da, toate produsele noastre sunt 100% eco-friendly. Ceara de nisip este vegetală, biodegradabilă și nu conține substanțe toxice. Fitilele sunt din bumbac natural, iar ambalajele sunt reciclabile.'
        },
        {
          id: 6,
          icon: '🛒',
          question: 'Cum plasez o comandă?',
          answer: 'Poți plasa o comandă direct pe site-ul nostru. Adaugă produsele dorite în coș, completează datele de livrare și alege metoda de plată preferată. Acceptăm plăți cu cardul și transfer bancar.'
        },
        {
          id: 7,
          icon: '🚚',
          question: 'În cât timp ajunge comanda?',
          answer: 'Comenzile sunt procesate în 1-2 zile lucrătoare și livrate în 2-5 zile lucrătoare în funcție de locația ta. Oferim transport gratuit pentru comenzi peste 149 Lei în toată România.'
        },
        {
          id: 8,
          icon: '❓',
          question: 'Ai alte întrebări?',
          answer: 'Dacă ai alte întrebări sau ai nevoie de asistență, nu ezita să ne contactezi prin email sau telefon. Echipa noastră este aici să te ajute și să îți ofere toate informațiile de care ai nevoie.'
        }
      ];
    } else if (language === 'hu') {
      return [
        {
          id: 1,
          icon: '🔥',
          question: 'Mi az a homokviasz?',
          answer: 'A homokviasz egy természetes növényi viasz, szemcsés, finom homokra emlékeztető textúrával. Nem tartalmaz illatanyagokat vagy vegyi adalékanyagokat, és teljesen biológiailag lebomló - környezetbarát és biztonságos alternatíva a hagyományos gyertyákkal szemben.'
        },
        {
          id: 2,
          icon: '💡',
          question: 'Hogyan használjam az Atomra gyertyákat?',
          answer: 'Nagyon egyszerű! Öntsd a viaszgyöngyöket a kívánt edénybe, helyezz egy kanócot a közepére, és gyújtsd meg. Amikor a viasz elfogyott, egyszerűen adj hozzá új gyöngyöket, hogy továbbra is élvezhesd a gyertyát.'
        },
        {
          id: 3,
          icon: '♻️',
          question: 'Újrahasználható a viasz?',
          answer: 'Igen! A homokviasz többször is újrafelhasználható. Miután elfogyott, új gyöngyöket adhatsz a meglévő maradványokhoz, vagy kitisztíthatod az edényt és újrakezdheted. Ez egy fenntartható és gazdaságos megoldás.'
        },
        {
          id: 4,
          icon: '🎁',
          question: 'Ajándékba adhatók az Atomra gyertyák?',
          answer: 'Abszolút! Az Atomra gyertyák tökéletes ajándékok az elegáns dizájn és az innovatív koncepció miatt. Kínálunk speciális ajándékcsomagolási lehetőségeket is, valamint személyre szabott készleteket különleges alkalmakra.'
        },
        {
          id: 5,
          icon: '🌱',
          question: 'Környezetbarátok és biztonságosak a termékek?',
          answer: 'Igen, minden termékünk 100%-ban környezetbarát. A homokviasz növényi eredetű, biológiailag lebomló és nem tartalmaz mérgező anyagokat. A kanócok természetes pamutból készülnek, a csomagolás pedig újrahasznosítható.'
        },
        {
          id: 6,
          icon: '🛒',
          question: 'Hogyan rendelhetek?',
          answer: 'Közvetlenül a weboldalunkon rendelhetsz. Add a kívánt termékeket a kosaradba, töltsd ki a szállítási adatokat, és válaszd ki a preferált fizetési módot. Elfogadunk bankkártyás és banki átutalásos fizetést.'
        },
        {
          id: 7,
          icon: '🚚',
          question: 'Mennyi idő alatt érkezik meg a rendelés?',
          answer: 'A rendeléseket 1-2 munkanapon belül feldolgozzuk, és a helyszíntől függően 2-5 munkanapon belül kiszállítjuk. 149 Lei feletti rendelésekre ingyenes szállítást biztosítunk egész Romániában.'
        },
        {
          id: 8,
          icon: '❓',
          question: 'Van más kérdésed?',
          answer: 'Ha további kérdéseid vannak vagy segítségre van szükséged, ne habozz kapcsolatba lépni velünk e-mailben vagy telefonon. Csapatunk itt van, hogy segítsen és minden szükséges információt megadjon.'
        }
      ];
    } else {
      return [
        {
          id: 1,
          icon: '🔥',
          question: 'What is sand wax?',
          answer: 'Sand wax is a natural vegetable wax with a granular texture similar to fine sand. It contains no fragrances or chemical additives and is completely biodegradable – an eco-friendly and safe alternative to traditional candles.'
        },
        {
          id: 2,
          icon: '💡',
          question: 'How do I use Atomra candles?',
          answer: 'It\'s very simple! Pour the wax pearls into your desired container, add a wick in the center, and light it. When the wax is consumed, simply add new pearls to continue enjoying your candle.'
        },
        {
          id: 3,
          icon: '♻️',
          question: 'Can the wax be reused?',
          answer: 'Yes! Sand wax can be reused multiple times. After it\'s consumed, you can add new pearls over the existing remnants or clean the container and start fresh. It\'s a sustainable and economical solution.'
        },
        {
          id: 4,
          icon: '🎁',
          question: 'Can Atomra candles be given as gifts?',
          answer: 'Absolutely! Atomra candles make perfect gifts thanks to their elegant design and innovative concept. We also offer special gift packaging options and customized sets for special events.'
        },
        {
          id: 5,
          icon: '🌱',
          question: 'Are the products eco-friendly and safe?',
          answer: 'Yes, all our products are 100% eco-friendly. Sand wax is vegetable-based, biodegradable, and contains no toxic substances. The wicks are made from natural cotton, and the packaging is recyclable.'
        },
        {
          id: 6,
          icon: '🛒',
          question: 'How do I place an order?',
          answer: 'You can place an order directly on our website. Add your desired products to the cart, fill in your delivery details, and choose your preferred payment method. We accept card payments and bank transfers.'
        },
        {
          id: 7,
          icon: '🚚',
          question: 'How long does delivery take?',
          answer: 'Orders are processed within 1-2 business days and delivered within 2-5 business days depending on your location. We offer free shipping for orders over 149 Lei throughout Romania.'
        },
        {
          id: 8,
          icon: '❓',
          question: 'Have other questions?',
          answer: 'If you have other questions or need assistance, don\'t hesitate to contact us via email or phone. Our team is here to help and provide you with all the information you need.'
        }
      ];
    }
  };

  const faqItems = getFaqItems();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            faqItems.forEach((_, index) => {
              setTimeout(() => {
                setVisibleItems(prev => {
                  const newVisible = [...prev];
                  newVisible[index] = true;
                  return newVisible;
                });
              }, index * 100);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  // Get contact text based on language
  const getContactText = () => {
    if (language === 'ro') {
      return {
        title: 'Nu ai găsit răspunsul căutat?',
        description: 'Echipa noastră este aici să te ajute cu orice întrebare sau nelămurire.',
        email: 'Trimite Email',
        call: 'Sună Acum'
      };
    } else if (language === 'hu') {
      return {
        title: 'Nem találtad meg a választ?',
        description: 'Csapatunk itt van, hogy segítsen bármilyen kérdésben vagy problémában.',
        email: 'Email Küldése',
        call: 'Hívj Most'
      };
    } else {
      return {
        title: 'Didn\'t find your answer?',
        description: 'Our team is here to help with any questions or concerns.',
        email: 'Send Email',
        call: 'Call Now'
      };
    }
  };

  const contactText = getContactText();

  return (
    <section className="py-20 sm:py-24 lg:py-32 luxury-section-light" ref={sectionRef}>
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extralight text-slate-900 mb-6 tracking-tight">
            {language === 'ro' ? 'Întrebări Frecvente' : 
             language === 'hu' ? 'Gyakori Kérdések' : 
             'Frequently Asked Questions'}
          </h2>
          <div className="w-16 h-px bg-slate-300 mx-auto mb-6"></div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
            {language === 'ro' ? 'Găsește răspunsuri la cele mai frecvente întrebări despre lumânările Atomra și produsele noastre eco-friendly.' : 
             language === 'hu' ? 'Találj válaszokat a leggyakoribb kérdésekre az Atomra gyertyákról és környezetbarát termékeinkről.' : 
             'Find answers to the most common questions about Atomra candles and our eco-friendly products.'}
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={item.id}
              className={`luxury-card rounded-lg overflow-hidden transition-all duration-700 ${
                visibleItems[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-slate-50/50 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">{item.icon}</span>
                  <h3 className="text-lg font-light text-slate-900 tracking-wide">
                    {item.question}
                  </h3>
                </div>
                <div className="flex-shrink-0 ml-4">
                  {openItems.includes(item.id) ? (
                    <ChevronUp size={20} strokeWidth={1.5} className="text-slate-600" />
                  ) : (
                    <ChevronDown size={20} strokeWidth={1.5} className="text-slate-600" />
                  )}
                </div>
              </button>
              
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                openItems.includes(item.id) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="px-6 pb-6">
                  <div className="pl-12">
                    <p className="text-slate-600 font-light leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-16">
          <div className="luxury-card p-8 rounded-lg">
            <h3 className="text-xl font-light text-slate-900 mb-4">
              {contactText.title}
            </h3>
            <p className="text-slate-600 font-light mb-6">
              {contactText.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:contact@atomra-home-romania.com"
                className="bg-slate-900 text-white px-8 py-3 font-light tracking-wide uppercase hover:bg-slate-800 transition-colors duration-300 rounded"
              >
                {contactText.email}
              </a>
              <a
                href="tel:+40123456789"
                className="border border-slate-300 text-slate-700 px-8 py-3 font-light tracking-wide uppercase hover:bg-slate-50 transition-colors duration-300 rounded"
              >
                {contactText.call}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
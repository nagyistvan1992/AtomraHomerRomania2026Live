import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import SEOHead from '../components/SEOHead';
import { motion } from 'framer-motion';
import { Leaf, RefreshCw, Palette, Heart, Shield } from 'lucide-react';

const WhyAtomraPage = () => {
  const { language } = useLanguage();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Get page title based on language
  const getPageTitle = () => {
    if (language === 'ro') {
      return 'De Ce Atomra? | Atomra Home Romania';
    } else if (language === 'hu') {
      return 'Miért Atomra? | Atomra Home Romania';
    } else {
      return 'Why Atomra? | Atomra Home Romania';
    }
  };

  // Get content based on language
  const getContent = () => {
    if (language === 'ro') {
      return {
        title: 'De Ce Atomra?',
        subtitle: 'Descoperă ce face lumânările noastre unice și de ce ar trebui să alegi Atomra',
        sections: [
          {
            title: 'Sustenabilitate',
            description: 'Lumânările noastre sunt fabricate din ceară 100% naturală, fără parafină sau alte ingrediente dăunătoare. Sistemul nostru de reumplere reduce deșeurile și promovează reutilizarea.',
            icon: <Leaf size={32} strokeWidth={1.5} className="text-green-600" />
          },
          {
            title: 'Reîncărcabile',
            description: 'Sistemul nostru unic de granule de ceară permite reumplerea ușoară a recipientelor. Nu mai arunca recipientele de lumânări - reumple-le și refolosește-le la nesfârșit.',
            icon: <RefreshCw size={32} strokeWidth={1.5} className="text-blue-600" />
          },
          {
            title: 'Personalizabile',
            description: 'Creează-ți propria experiență de lumânare. Amestecă granulele pentru a crea combinații unice de culori și arome care se potrivesc perfect cu stilul și preferințele tale.',
            icon: <Palette size={32} strokeWidth={1.5} className="text-purple-600" />
          },
          {
            title: 'Calitate Premium',
            description: 'Fiecare lumânare Atomra este creată cu atenție la detalii, folosind doar ingrediente de cea mai înaltă calitate. Rezultatul este o lumânare care arde curat, uniform și durează mai mult.',
            icon: <Heart size={32} strokeWidth={1.5} className="text-red-600" />
          },
          {
            title: 'Siguranță',
            description: 'Granulele noastre de ceară oferă un nivel suplimentar de siguranță. În cazul răsturnării accidentale, granulele se vor împrăștia și vor stinge flacăra, reducând riscul de incendiu.',
            icon: <Shield size={32} strokeWidth={1.5} className="text-amber-600" />
          }
        ],
        mission: {
          title: 'Misiunea Noastră',
          description: 'La Atomra, misiunea noastră este să transformăm experiența tradițională a lumânărilor într-una sustenabilă, personalizabilă și plăcută. Credem că lumânările ar trebui să fie atât frumoase, cât și responsabile față de mediu. Prin inovația noastră în domeniul lumânărilor reîncărcabile, ne străduim să reducem deșeurile și să oferim clienților noștri o modalitate mai inteligentă și mai ecologică de a se bucura de lumânări.'
        },
        values: {
          title: 'Valorile Noastre',
          items: [
            'Sustenabilitate în fiecare aspect al afacerii noastre',
            'Calitate fără compromisuri în toate produsele noastre',
            'Inovație continuă pentru a îmbunătăți experiența lumânărilor',
            'Transparență în ingrediente și procese de fabricație',
            'Responsabilitate față de clienți, comunitate și mediu'
          ]
        }
      };
    } else if (language === 'hu') {
      return {
        title: 'Miért Atomra?',
        subtitle: 'Fedezd fel, mi teszi egyedivé gyertyáinkat és miért érdemes az Atomrát választanod',
        sections: [
          {
            title: 'Fenntarthatóság',
            description: 'Gyertyáink 100% természetes viaszból készülnek, paraffin vagy más káros összetevők nélkül. Újratöltő rendszerünk csökkenti a hulladékot és elősegíti az újrafelhasználást.',
            icon: <Leaf size={32} strokeWidth={1.5} className="text-green-600" />
          },
          {
            title: 'Újratölthetőség',
            description: 'Egyedi viaszgyöngy rendszerünk lehetővé teszi a tartályok könnyű újratöltését. Soha többé ne dobd ki a gyertyatartókat - töltsd újra és használd őket végtelenül.',
            icon: <RefreshCw size={32} strokeWidth={1.5} className="text-blue-600" />
          },
          {
            title: 'Testreszabhatóság',
            description: 'Hozd létre saját gyertyaélményedet. Keverd a gyöngyöket egyedi szín- és illatkombiációk létrehozásához, amelyek tökéletesen illenek stílusodhoz és preferenciáidhoz.',
            icon: <Palette size={32} strokeWidth={1.5} className="text-purple-600" />
          },
          {
            title: 'Prémium Minőség',
            description: 'Minden Atomra gyertyát részletekre való odafigyeléssel, kizárólag a legmagasabb minőségű összetevőkből készítünk. Az eredmény egy tisztán, egyenletesen égő gyertya, amely tovább tart.',
            icon: <Heart size={32} strokeWidth={1.5} className="text-red-600" />
          },
          {
            title: 'Biztonság',
            description: 'Viaszgyöngyeink extra biztonsági szintet nyújtanak. Véletlen felborulás esetén a gyöngyök szétszóródnak és eloltják a lángot, csökkentve a tűzveszélyt.',
            icon: <Shield size={32} strokeWidth={1.5} className="text-amber-600" />
          }
        ],
        mission: {
          title: 'Küldetésünk',
          description: 'Az Atomránál küldetésünk, hogy a hagyományos gyertyaélményt fenntarthatóvá, testreszabhatóvá és élvezetessé tegyük. Hisszük, hogy a gyertyáknak szépnek és környezetbarátnak kell lenniük. Az újratölthető gyertyák terén végzett innovációnk révén arra törekszünk, hogy csökkentsük a hulladékot és intelligensebb, környezetbarátabb módot kínáljunk ügyfeleinknek a gyertyák élvezetére.'
        },
        values: {
          title: 'Értékeink',
          items: [
            'Fenntarthatóság üzletünk minden aspektusában',
            'Kompromisszumok nélküli minőség minden termékünkben',
            'Folyamatos innováció a gyertyaélmény javítása érdekében',
            'Átláthatóság az összetevőkben és gyártási folyamatokban',
            'Felelősség az ügyfelek, a közösség és a környezet iránt'
          ]
        }
      };
    } else {
      return {
        title: 'Why Atomra?',
        subtitle: 'Discover what makes our candles unique and why you should choose Atomra',
        sections: [
          {
            title: 'Sustainability',
            description: 'Our candles are made from 100% natural wax, free from paraffin or other harmful ingredients. Our refill system reduces waste and promotes reuse.',
            icon: <Leaf size={32} strokeWidth={1.5} className="text-green-600" />
          },
          {
            title: 'Refillable',
            description: 'Our unique wax pearl system allows for easy refilling of containers. Never throw away candle containers again - refill and reuse them endlessly.',
            icon: <RefreshCw size={32} strokeWidth={1.5} className="text-blue-600" />
          },
          {
            title: 'Customizable',
            description: 'Create your own candle experience. Mix and match pearls to create unique color and scent combinations that perfectly suit your style and preferences.',
            icon: <Palette size={32} strokeWidth={1.5} className="text-purple-600" />
          },
          {
            title: 'Premium Quality',
            description: 'Every Atomra candle is created with attention to detail, using only the highest quality ingredients. The result is a candle that burns clean, even, and lasts longer.',
            icon: <Heart size={32} strokeWidth={1.5} className="text-red-600" />
          },
          {
            title: 'Safety',
            description: 'Our wax pearls provide an extra level of safety. In case of accidental tipping, the pearls will scatter and extinguish the flame, reducing fire risk.',
            icon: <Shield size={32} strokeWidth={1.5} className="text-amber-600" />
          }
        ],
        mission: {
          title: 'Our Mission',
          description: 'At Atomra, our mission is to transform the traditional candle experience into one that is sustainable, customizable, and enjoyable. We believe candles should be both beautiful and environmentally responsible. Through our innovation in refillable candles, we strive to reduce waste and provide our customers with a smarter, more eco-friendly way to enjoy candles.'
        },
        values: {
          title: 'Our Values',
          items: [
            'Sustainability in every aspect of our business',
            'Uncompromising quality in all our products',
            'Continuous innovation to improve the candle experience',
            'Transparency in ingredients and manufacturing processes',
            'Responsibility to customers, community, and environment'
          ]
        }
      };
    }
  };

  const content = getContent();

  return (
    <>
      <SEOHead
        title={getPageTitle()}
        description="Descoperă de ce lumânările Atomra sunt unice: sustenabile, reîncărcabile, personalizabile și de calitate premium. Află despre misiunea și valorile noastre."
        keywords="de ce atomra, lumânări sustenabile, lumânări reîncărcabile, lumânări personalizabile, ceară naturală, calitate premium"
        url="https://atomra-home-romania.com/why-atomra"
      />
      
      <div className="luxury-page-bg luxury-floating-elements min-h-screen">
        {/* Luxury floating decorative elements */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-32 left-16 w-1 h-1 bg-slate-300/20 rounded-full animate-luxury-float"></div>
          <div className="absolute top-48 right-24 w-0.5 h-0.5 bg-slate-200/30 rounded-full animate-luxury-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-32 left-1/4 w-0.5 h-0.5 bg-slate-300/25 rounded-full animate-luxury-float" style={{ animationDelay: '4s' }}></div>
          <div className="absolute bottom-48 right-1/4 w-1 h-1 bg-slate-200/20 rounded-full animate-luxury-float" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="pt-32 sm:pt-36 md:pt-40 lg:pt-44 relative z-10">
          {/* Header Section */}
          <section className="py-6 sm:py-8 luxury-section-light">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
              <div className="text-center">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-extralight text-slate-900 mb-6 tracking-tight"
                >
                  {content.title}
                </motion.h1>
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="w-16 h-px bg-slate-300 mx-auto mb-6"
                ></motion.div>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-lg text-slate-600 max-w-4xl mx-auto font-light leading-relaxed"
                >
                  {content.subtitle}
                </motion.p>
              </div>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-16 sm:py-20 luxury-section-dark">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
              {/* Key Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {content.sections.map((section, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                    className="luxury-card p-8 rounded-lg text-center"
                  >
                    <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                      {section.icon}
                    </div>
                    <h3 className="text-xl font-light text-slate-900 mb-4">{section.title}</h3>
                    <p className="text-slate-600 font-light">{section.description}</p>
                  </motion.div>
                ))}
              </div>
              
              {/* Mission Statement */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="luxury-card p-8 rounded-lg mb-16"
              >
                <h2 className="text-2xl font-light text-slate-900 mb-6 text-center">{content.mission.title}</h2>
                <p className="text-lg text-slate-600 font-light leading-relaxed text-center max-w-4xl mx-auto">
                  {content.mission.description}
                </p>
              </motion.div>
              
              {/* Our Values */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0 }}
                className="luxury-card p-8 rounded-lg"
              >
                <h2 className="text-2xl font-light text-slate-900 mb-6 text-center">{content.values.title}</h2>
                <div className="max-w-3xl mx-auto">
                  <ul className="space-y-4">
                    {content.values.items.map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 1.1 + (index * 0.1) }}
                        className="flex items-start"
                      >
                        <div className="flex-shrink-0 w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center mt-0.5 mr-4">
                          <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                        </div>
                        <span className="text-slate-600 font-light">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default WhyAtomraPage;
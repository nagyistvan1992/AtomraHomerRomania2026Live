import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import SEOHead from '../components/SEOHead';
import { motion } from 'framer-motion';
import { Leaf, Droplets, Wind, ThermometerSun, Heart } from 'lucide-react';

const PlantBasedPage = () => {
  const { language } = useLanguage();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Get page title based on language
  const getPageTitle = () => {
    if (language === 'ro') {
      return 'Lumânări pe Bază de Plante | Atomra Home Romania';
    } else if (language === 'hu') {
      return 'Növényi Alapú Gyertyák | Atomra Home Romania';
    } else {
      return 'Plant-Based Candles | Atomra Home Romania';
    }
  };

  // Get content based on language
  const getContent = () => {
    if (language === 'ro') {
      return {
        title: 'Lumânări pe Bază de Plante',
        subtitle: 'Descoperă beneficiile ceară naturală vegetală',
        intro: 'La Atomra, toate lumânările noastre sunt fabricate din ceară 100% pe bază de plante, oferind o alternativă naturală și sustenabilă la lumânările convenționale din parafină. Ceara noastră vegetală este derivată din surse regenerabile, fără ingrediente de origine animală sau petrolieră.',
        benefits: {
          title: 'Beneficiile Ceară Vegetală',
          items: [
            {
              title: 'Ecologică',
              description: 'Ceara noastră vegetală este biodegradabilă și derivată din surse regenerabile, reducând dependența de combustibilii fosili și minimizând impactul asupra mediului.',
              icon: <Leaf size={32} strokeWidth={1.5} className="text-green-600" />
            },
            {
              title: 'Ardere Mai Curată',
              description: 'Lumânările pe bază de plante ard mai curat decât cele din parafină, producând semnificativ mai puțin fum și funingine. Acest lucru înseamnă aer mai curat în casa ta și mai puțin reziduu pe pereți și mobilier.',
              icon: <Wind size={32} strokeWidth={1.5} className="text-blue-600" />
            },
            {
              title: 'Fără Toxine',
              description: 'Spre deosebire de parafină, care poate elibera compuși potențial dăunători când arde, ceara noastră vegetală nu conține toxine sau carcinogeni, făcând-o o alegere mai sănătoasă pentru tine și familia ta.',
              icon: <Heart size={32} strokeWidth={1.5} className="text-red-600" />
            },
            {
              title: 'Durată de Ardere Mai Lungă',
              description: 'Ceara vegetală are un punct de topire mai scăzut decât parafina, ceea ce înseamnă că arde mai lent și mai rece, oferind o durată de viață mai lungă pentru lumânările tale.',
              icon: <ThermometerSun size={32} strokeWidth={1.5} className="text-amber-600" />
            },
            {
              title: 'Difuzare Mai Bună a Parfumului',
              description: 'Structura moleculară a ceară vegetale permite o mai bună încorporare și eliberare a parfumurilor, rezultând o experiență olfactivă mai bogată și mai autentică.',
              icon: <Droplets size={32} strokeWidth={1.5} className="text-purple-600" />
            }
          ]
        },
        types: {
          title: 'Tipuri de Ceară Vegetală',
          description: 'Există mai multe tipuri de ceară vegetală, fiecare cu propriile caracteristici și beneficii. La Atomra, folosim o combinație specială de ceară vegetale pentru a obține performanța optimă:',
          items: [
            {
              name: 'Ceară de Soia',
              description: 'Derivată din uleiul de soia, această ceară este apreciată pentru arderea sa curată și capacitatea excelentă de a reține parfumul.',
              properties: ['Biodegradabilă', 'Regenerabilă', 'Ardere lentă', 'Bună difuzare a parfumului']
            },
            {
              name: 'Ceară de Cocos',
              description: 'Extrasă din uleiul de cocos, această ceară are un punct de topire scăzut și o textură cremoasă, oferind o ardere uniformă și o excelentă difuzare a parfumului.',
              properties: ['Punctul de topire scăzut', 'Textură cremoasă', 'Ardere uniformă', 'Excelentă retenție a parfumului']
            },
            {
              name: 'Ceară de Rapiță',
              description: 'Derivată din planta de rapiță, această ceară este apreciată pentru durabilitatea sa și capacitatea de a menține parfumul.',
              properties: ['Durabilă', 'Bună retenție a parfumului', 'Ardere curată', 'Sursă locală europeană']
            },
            {
              name: 'Ceară de Palmier',
              description: 'Obținută din fructele de palmier, această ceară are o consistență unică care o face ideală pentru granulele noastre de ceară de nisip.',
              properties: ['Consistență granulară', 'Stabilitate bună', 'Ardere uniformă', 'Sursă sustenabilă']
            }
          ]
        },
        sustainability: {
          title: 'Angajamentul Nostru pentru Sustenabilitate',
          description: 'Alegerea ceară vegetale este doar o parte din angajamentul nostru mai larg pentru sustenabilitate. Iată alte moduri în care ne asigurăm că produsele noastre sunt cât mai ecologice posibil:',
          practices: [
            'Utilizăm doar uleiuri esențiale și parfumuri naturale, fără ftalați sau alte substanțe chimice dăunătoare.',
            'Fitilele noastre sunt făcute din bumbac 100% natural, fără plumb sau alte metale.',
            'Încurajăm reutilizarea recipientelor prin sistemul nostru unic de reumplere cu granule de ceară.',
            'Ambalajele noastre sunt minimaliste, reciclabile și, ori de câte ori este posibil, făcute din materiale reciclate.',
            'Lucrăm cu furnizori care împărtășesc valorile noastre de sustenabilitate și practici etice.'
          ]
        },
        conclusion: 'Alegând lumânările pe bază de plante Atomra, nu doar că aduci frumusețe și parfum în casa ta, dar faci și o alegere conștientă pentru un viitor mai sustenabil. Experimentează diferența ceară vegetale și descoperă o nouă dimensiune a plăcerii lumânărilor.'
      };
    } else if (language === 'hu') {
      return {
        title: 'Növényi Alapú Gyertyák',
        subtitle: 'Fedezd fel a növényi viasz előnyeit',
        intro: 'Az Atomránál minden gyertyánk 100% növényi alapú viaszból készül, természetes és fenntartható alternatívát kínálva a hagyományos paraffingyertyákhoz képest. Növényi viaszunk megújuló forrásokból származik, állati vagy kőolaj-eredetű összetevők nélkül.',
        benefits: {
          title: 'A Növényi Viasz Előnyei',
          items: [
            {
              title: 'Környezetbarát',
              description: 'Növényi viaszunk biológiailag lebomló és megújuló forrásokból származik, csökkentve a fosszilis tüzelőanyagoktól való függőséget és minimalizálva a környezeti hatást.',
              icon: <Leaf size={32} strokeWidth={1.5} className="text-green-600" />
            },
            {
              title: 'Tisztább Égés',
              description: 'A növényi alapú gyertyák tisztábban égnek, mint a paraffingyertyák, jelentősen kevesebb füstöt és kormot termelve. Ez tisztább levegőt jelent az otthonodban és kevesebb lerakódást a falakon és bútorokon.',
              icon: <Wind size={32} strokeWidth={1.5} className="text-blue-600" />
            },
            {
              title: 'Toxinmentes',
              description: 'A paraffinnal ellentétben, amely égéskor potenciálisan káros vegyületeket bocsáthat ki, növényi viaszunk nem tartalmaz toxinokat vagy karcinogéneket, így egészségesebb választás számodra és családod számára.',
              icon: <Heart size={32} strokeWidth={1.5} className="text-red-600" />
            },
            {
              title: 'Hosszabb Égési Idő',
              description: 'A növényi viasznak alacsonyabb az olvadáspontja, mint a paraffinnak, ami azt jelenti, hogy lassabban és hűvösebben ég, hosszabb élettartamot biztosítva gyertyáidnak.',
              icon: <ThermometerSun size={32} strokeWidth={1.5} className="text-amber-600" />
            },
            {
              title: 'Jobb Illatszórás',
              description: 'A növényi viasz molekuláris szerkezete lehetővé teszi az illatok jobb beépülését és felszabadulását, gazdagabb és hitelesebb illatélményt eredményezve.',
              icon: <Droplets size={32} strokeWidth={1.5} className="text-purple-600" />
            }
          ]
        },
        types: {
          title: 'Növényi Viasz Típusok',
          description: 'Többféle növényi viasz létezik, mindegyiknek megvannak a saját jellemzői és előnyei. Az Atomránál speciális növényi viasz keveréket használunk az optimális teljesítmény érdekében:',
          items: [
            {
              name: 'Szójaviasz',
              description: 'Szójaolajból származik, tiszta égéséről és kiváló illatmegtartó képességéről ismert.',
              properties: ['Biológiailag lebomló', 'Megújuló', 'Lassú égés', 'Jó illatszórás']
            },
            {
              name: 'Kókuszviasz',
              description: 'Kókuszolajból kivonva, alacsony olvadásponttal és krémes textúrával rendelkezik, egyenletes égést és kiváló illatszórást biztosítva.',
              properties: ['Alacsony olvadáspont', 'Krémes textúra', 'Egyenletes égés', 'Kiváló illatmegtartás']
            },
            {
              name: 'Repceviasz',
              description: 'A repcenövényből származik, tartósságáért és illatmegtartó képességéért értékelik.',
              properties: ['Tartós', 'Jó illatmegtartás', 'Tiszta égés', 'Európai helyi forrás']
            },
            {
              name: 'Pálmaviasz',
              description: 'Pálmagyümölcsből nyerik, egyedi konzisztenciával rendelkezik, amely ideálissá teszi homokviasz gyöngyeinkhez.',
              properties: ['Szemcsés konzisztencia', 'Jó stabilitás', 'Egyenletes égés', 'Fenntartható forrás']
            }
          ]
        },
        sustainability: {
          title: 'Elkötelezettségünk a Fenntarthatóság Mellett',
          description: 'A növényi viasz választása csak egy része a fenntarthatóság iránti szélesebb körű elkötelezettségünknek. Íme néhány további módja annak, ahogyan biztosítjuk, hogy termékeink a lehető legkörnyezetbarátabbak legyenek:',
          practices: [
            'Csak esszenciális olajokat és természetes illatanyagokat használunk, ftalátok vagy más káros vegyi anyagok nélkül.',
            'Kanócaink 100% természetes pamutból készülnek, ólom vagy más fémek nélkül.',
            'Ösztönözzük a tartályok újrafelhasználását egyedi viaszgyöngy újratöltő rendszerünkkel.',
            'Csomagolásunk minimalista, újrahasznosítható, és amikor csak lehetséges, újrahasznosított anyagokból készül.',
            'Olyan beszállítókkal dolgozunk, akik osztják fenntarthatósági értékeinket és etikus gyakorlatainkat.'
          ]
        },
        conclusion: 'Az Atomra növényi alapú gyertyák választásával nemcsak szépséget és illatot hozol az otthonodba, hanem tudatos döntést is hozol egy fenntarthatóbb jövő érdekében. Tapasztald meg a növényi viasz különbségét, és fedezz fel egy új dimenziót a gyertyaélvezetben.'
      };
    } else {
      return {
        title: 'Plant-Based Candles',
        subtitle: 'Discover the benefits of vegetable wax',
        intro: 'At Atomra, all our candles are made from 100% plant-based wax, offering a natural and sustainable alternative to conventional paraffin candles. Our vegetable wax is derived from renewable sources, with no animal or petroleum-derived ingredients.',
        benefits: {
          title: 'Benefits of Vegetable Wax',
          items: [
            {
              title: 'Eco-Friendly',
              description: 'Our vegetable wax is biodegradable and derived from renewable sources, reducing dependence on fossil fuels and minimizing environmental impact.',
              icon: <Leaf size={32} strokeWidth={1.5} className="text-green-600" />
            },
            {
              title: 'Cleaner Burning',
              description: 'Plant-based candles burn cleaner than paraffin ones, producing significantly less soot and smoke. This means cleaner air in your home and less residue on walls and furniture.',
              icon: <Wind size={32} strokeWidth={1.5} className="text-blue-600" />
            },
            {
              title: 'Toxin-Free',
              description: 'Unlike paraffin, which can release potentially harmful compounds when burned, our vegetable wax contains no toxins or carcinogens, making it a healthier choice for you and your family.',
              icon: <Heart size={32} strokeWidth={1.5} className="text-red-600" />
            },
            {
              title: 'Longer Burning Time',
              description: 'Vegetable wax has a lower melting point than paraffin, which means it burns slower and cooler, providing a longer lifespan for your candles.',
              icon: <ThermometerSun size={32} strokeWidth={1.5} className="text-amber-600" />
            },
            {
              title: 'Better Scent Throw',
              description: 'The molecular structure of vegetable wax allows for better incorporation and release of fragrances, resulting in a richer and more authentic scent experience.',
              icon: <Droplets size={32} strokeWidth={1.5} className="text-purple-600" />
            }
          ]
        },
        types: {
          title: 'Types of Vegetable Wax',
          description: 'There are several types of vegetable wax, each with its own characteristics and benefits. At Atomra, we use a special blend of vegetable waxes to achieve optimal performance:',
          items: [
            {
              name: 'Soy Wax',
              description: 'Derived from soybean oil, this wax is valued for its clean burning and excellent scent-holding capability.',
              properties: ['Biodegradable', 'Renewable', 'Slow burning', 'Good scent throw']
            },
            {
              name: 'Coconut Wax',
              description: 'Extracted from coconut oil, this wax has a low melting point and creamy texture, providing an even burn and excellent scent throw.',
              properties: ['Low melting point', 'Creamy texture', 'Even burning', 'Excellent scent retention']
            },
            {
              name: 'Rapeseed Wax',
              description: 'Derived from the rapeseed plant, this wax is valued for its durability and scent-holding capability.',
              properties: ['Durable', 'Good scent retention', 'Clean burning', 'European local source']
            },
            {
              name: 'Palm Wax',
              description: 'Obtained from palm fruit, this wax has a unique consistency that makes it ideal for our sand wax pearls.',
              properties: ['Granular consistency', 'Good stability', 'Even burning', 'Sustainable source']
            }
          ]
        },
        sustainability: {
          title: 'Our Commitment to Sustainability',
          description: 'Choosing vegetable wax is just one part of our broader commitment to sustainability. Here are other ways we ensure our products are as eco-friendly as possible:',
          practices: [
            'We use only essential oils and natural fragrances, free from phthalates or other harmful chemicals.',
            'Our wicks are made from 100% natural cotton, free from lead or other metals.',
            'We encourage container reuse through our unique wax pearl refill system.',
            'Our packaging is minimalist, recyclable, and, whenever possible, made from recycled materials.',
            'We work with suppliers who share our values of sustainability and ethical practices.'
          ]
        },
        conclusion: 'By choosing Atomra plant-based candles, you\'re not only bringing beauty and fragrance into your home but also making a conscious choice for a more sustainable future. Experience the difference of vegetable wax and discover a new dimension of candle enjoyment.'
      };
    }
  };

  const content = getContent();

  return (
    <>
      <SEOHead
        title={getPageTitle()}
        description="Descoperă beneficiile lumânărilor pe bază de plante Atomra. Ceară vegetală 100% naturală, fără toxine, cu ardere mai curată și durată mai lungă."
        keywords="lumânări pe bază de plante, ceară vegetală, ceară de soia, ceară de cocos, ceară naturală, lumânări eco"
        url="https://atomra-home-romania.com/plant-based"
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
              {/* Introduction */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="luxury-card p-8 rounded-lg mb-12"
              >
                <p className="text-lg text-slate-600 font-light leading-relaxed text-center max-w-4xl mx-auto">
                  {content.intro}
                </p>
              </motion.div>
              
              {/* Benefits of Vegetable Wax */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-light text-slate-900 mb-8 text-center">{content.benefits.title}</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {content.benefits.items.map((benefit, index) => (
                    <div key={index} className="luxury-card p-6 rounded-lg">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                          {benefit.icon}
                        </div>
                        <h3 className="text-lg font-light text-slate-900">{benefit.title}</h3>
                      </div>
                      <p className="text-slate-600 font-light">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              {/* Types of Vegetable Wax */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="luxury-card p-8 rounded-lg mb-12"
              >
                <h2 className="text-2xl font-light text-slate-900 mb-6 text-center">{content.types.title}</h2>
                
                <p className="text-slate-600 font-light mb-8 text-center max-w-4xl mx-auto">
                  {content.types.description}
                </p>
                
                <div className="space-y-6">
                  {content.types.items.map((type, index) => (
                    <div key={index} className="bg-slate-50 p-6 rounded-lg">
                      <h3 className="text-lg font-light text-slate-900 mb-2">{type.name}</h3>
                      <p className="text-slate-600 font-light mb-4">{type.description}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {type.properties.map((property, i) => (
                          <span key={i} className="inline-block bg-white text-slate-700 px-3 py-1 rounded-full text-sm border border-slate-200">
                            {property}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              {/* Sustainability Commitment */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="luxury-card p-8 rounded-lg mb-12"
              >
                <h2 className="text-2xl font-light text-slate-900 mb-6 text-center">{content.sustainability.title}</h2>
                
                <p className="text-slate-600 font-light mb-8 text-center max-w-4xl mx-auto">
                  {content.sustainability.description}
                </p>
                
                <ul className="space-y-4 max-w-3xl mx-auto">
                  {content.sustainability.practices.map((practice, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center mt-0.5 mr-4">
                        <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                      </div>
                      <span className="text-slate-600 font-light">{practice}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              
              {/* Conclusion */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="text-center"
              >
                <p className="text-lg text-slate-600 font-light max-w-3xl mx-auto">
                  {content.conclusion}
                </p>
              </motion.div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default PlantBasedPage;
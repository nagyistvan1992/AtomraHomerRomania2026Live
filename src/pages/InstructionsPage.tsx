import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import SEOHead from '../components/SEOHead';
import { motion } from 'framer-motion';

const InstructionsPage = () => {
  const { language } = useLanguage();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Get page title based on language
  const getPageTitle = () => {
    if (language === 'ro') {
      return 'Instrucțiuni | Atomra Home Romania';
    } else if (language === 'hu') {
      return 'Útmutatók | Atomra Home Romania';
    } else {
      return 'Instructions | Atomra Home Romania';
    }
  };

  // Get content based on language
  const getContent = () => {
    if (language === 'ro') {
      return {
        title: 'Instrucțiuni',
        subtitle: 'Ghid complet pentru utilizarea și îngrijirea lumânărilor Atomra',
        sections: [
          {
            title: 'Cum să Folosești Ceara de Nisip',
            steps: [
              {
                title: 'Pregătirea Recipientului',
                description: 'Alege un recipient rezistent la căldură, cum ar fi un pahar de sticlă, ceramică sau metal. Asigură-te că recipientul este curat și uscat înainte de utilizare.',
                image: '/DSC_2075_710x.webp'
              },
              {
                title: 'Adăugarea Ceară de Nisip',
                description: 'Toarnă granulele de ceară de nisip în recipient, umplând-l până la aproximativ 1-2 cm de marginea superioară. Nu umple complet recipientul pentru a permite expansiunea ceară la aprindere.',
                image: '/DSC_2075_710x.webp'
              },
              {
                title: 'Plasarea Fitilului',
                description: 'Inserează fitilul în centrul ceară de nisip, asigurându-te că atinge fundul recipientului. Fitilul ar trebui să se extindă aproximativ 1 cm deasupra suprafeței ceară.',
                image: '/DSC_2082_710x.webp'
              },
              {
                title: 'Aprinderea Lumânării',
                description: 'Aprinde fitilul și permite flăcării să ardă. Ceara de nisip va începe să se topească în jurul fitilului, creând un bazin de ceară lichidă.',
                image: '/regregrg_cedf33bb-8bb4-4797-899b-f9d3cb8f33f7_710x.webp'
              },
              {
                title: 'Reumplerea',
                description: 'Când nivelul ceară scade, stinge lumânarea și lasă-o să se răcească. Adaugă mai multe granule de ceară de nisip și un fitil nou dacă este necesar. Apoi, aprinde din nou pentru a continua să te bucuri de lumânarea ta.',
                image: '/DSC_2075_710x.webp'
              }
            ]
          },
          {
            title: 'Sfaturi pentru Îngrijire și Siguranță',
            items: [
              'Nu lăsa niciodată o lumânare aprinsă nesupravegheată.',
              'Ține lumânările departe de materiale inflamabile, curenți de aer și copii sau animale de companie.',
              'Taie fitilul la 5-6 mm înainte de fiecare aprindere pentru o ardere optimă.',
              'La prima utilizare, lasă lumânarea să ardă cel puțin 2 ore pentru a forma un bazin de ceară uniform.',
              'Stinge lumânarea dacă flacăra devine prea mare sau fumegă excesiv.',
              'Lasă lumânarea să se răcească complet înainte de a o muta sau reumple.',
              'Păstrează granulele de ceară de nisip într-un loc răcoros și uscat, departe de lumina directă a soarelui.'
            ]
          },
          {
            title: 'Alegerea Fitilului Potrivit',
            description: 'Alegerea fitilului corect este esențială pentru o ardere optimă a lumânării tale. Iată un ghid pentru a alege fitilul potrivit în funcție de diametrul recipientului:',
            sizes: [
              {
                name: 'Fitil Mic',
                description: 'Potrivit pentru recipiente cu diametrul de 5-8 cm.',
                recommendation: 'Ideal pentru pahare de shot sau recipiente mici.'
              },
              {
                name: 'Fitil Mediu',
                description: 'Potrivit pentru recipiente cu diametrul de 8-12 cm.',
                recommendation: 'Perfect pentru majoritatea paharelor și recipientelor standard.'
              },
              {
                name: 'Fitil Mare',
                description: 'Potrivit pentru recipiente cu diametrul de 12-15 cm.',
                recommendation: 'Recomandat pentru boluri mari și recipiente largi.'
              }
            ]
          },
          {
            title: 'Depanare',
            problems: [
              {
                issue: 'Flacără prea mică',
                solution: 'Folosește un fitil mai gros sau asigură-te că fitilul este centrat și vertical.'
              },
              {
                issue: 'Flacără prea mare sau fumegă',
                solution: 'Taie fitilul mai scurt sau folosește un fitil mai subțire. Asigură-te că nu există curenți de aer în jurul lumânării.'
              },
              {
                issue: 'Ardere neuniformă',
                solution: 'Asigură-te că fitilul este centrat. Pentru recipiente mai largi, poți folosi mai multe fitile pentru o ardere uniformă.'
              },
              {
                issue: 'Ceara nu se topește complet',
                solution: 'Lasă lumânarea să ardă mai mult timp pentru a permite formarea unui bazin de ceară mai larg. Asigură-te că folosești fitilul de dimensiunea corectă pentru recipientul tău.'
              }
            ]
          }
        ]
      };
    } else if (language === 'hu') {
      return {
        title: 'Útmutatók',
        subtitle: 'Teljes útmutató az Atomra gyertyák használatához és ápolásához',
        sections: [
          {
            title: 'Hogyan Használd a Homokviaszt',
            steps: [
              {
                title: 'Tartály Előkészítése',
                description: 'Válassz hőálló tartályt, például üveg-, kerámia- vagy fémpohárat. Győződj meg róla, hogy a tartály tiszta és száraz használat előtt.',
                image: '/DSC_2075_710x.webp'
              },
              {
                title: 'Homokviasz Hozzáadása',
                description: 'Öntsd a homokviasz gyöngyöket a tartályba, körülbelül 1-2 cm-re a felső széltől. Ne töltsd meg teljesen a tartályt, hogy helyet hagyj a viasz tágulásának meggyújtáskor.',
                image: '/DSC_2075_710x.webp'
              },
              {
                title: 'Kanóc Elhelyezése',
                description: 'Helyezd a kanócot a homokviasz közepébe, ügyelve arra, hogy elérje a tartály alját. A kanócnak körülbelül 1 cm-rel kell a viasz felszíne fölé nyúlnia.',
                image: '/DSC_2082_710x.webp'
              },
              {
                title: 'Gyertya Meggyújtása',
                description: 'Gyújtsd meg a kanócot és hagyd égni. A homokviasz elkezd olvadni a kanóc körül, folyékony viasztócsát képezve.',
                image: '/regregrg_cedf33bb-8bb4-4797-899b-f9d3cb8f33f7_710x.webp'
              },
              {
                title: 'Újratöltés',
                description: 'Amikor a viasz szintje csökken, oltsd el a gyertyát és hagyd kihűlni. Adj hozzá több homokviasz gyöngyöt és szükség esetén új kanócot. Ezután gyújtsd meg újra, hogy továbbra is élvezhesd a gyertyádat.',
                image: '/DSC_2075_710x.webp'
              }
            ]
          },
          {
            title: 'Ápolási és Biztonsági Tippek',
            items: [
              'Soha ne hagyd az égő gyertyát felügyelet nélkül.',
              'Tartsd a gyertyákat távol gyúlékony anyagoktól, huzattól, gyermekektől és háziállatoktól.',
              'Vágd a kanócot 5-6 mm-re minden meggyújtás előtt az optimális égéshez.',
              'Az első használatkor hagyd a gyertyát legalább 2 órán át égni, hogy egyenletes viasztócsa alakuljon ki.',
              'Oltsd el a gyertyát, ha a láng túl nagy vagy túlzottan füstöl.',
              'Hagyd a gyertyát teljesen kihűlni, mielőtt mozgatnád vagy újratöltenéd.',
              'Tárold a homokviasz gyöngyöket hűvös, száraz helyen, közvetlen napfénytől távol.'
            ]
          },
          {
            title: 'A Megfelelő Kanóc Kiválasztása',
            description: 'A megfelelő kanóc kiválasztása elengedhetetlen a gyertyád optimális égéséhez. Íme egy útmutató a megfelelő kanóc kiválasztásához a tartály átmérője alapján:',
            sizes: [
              {
                name: 'Kis Kanóc',
                description: '5-8 cm átmérőjű tartályokhoz megfelelő.',
                recommendation: 'Ideális shot poharakhoz vagy kis tartályokhoz.'
              },
              {
                name: 'Közepes Kanóc',
                description: '8-12 cm átmérőjű tartályokhoz megfelelő.',
                recommendation: 'Tökéletes a legtöbb standard pohárhoz és tartályhoz.'
              },
              {
                name: 'Nagy Kanóc',
                description: '12-15 cm átmérőjű tartályokhoz megfelelő.',
                recommendation: 'Nagy tálakhoz és széles tartályokhoz ajánlott.'
              }
            ]
          },
          {
            title: 'Hibaelhárítás',
            problems: [
              {
                issue: 'Túl kicsi láng',
                solution: 'Használj vastagabb kanócot, vagy győződj meg róla, hogy a kanóc középen és függőlegesen áll.'
              },
              {
                issue: 'Túl nagy láng vagy füstölés',
                solution: 'Vágd rövidebbre a kanócot vagy használj vékonyabb kanócot. Győződj meg róla, hogy nincs huzat a gyertya körül.'
              },
              {
                issue: 'Egyenetlen égés',
                solution: 'Győződj meg róla, hogy a kanóc középen van. Szélesebb tartályokhoz használhatsz több kanócot az egyenletes égéshez.'
              },
              {
                issue: 'A viasz nem olvad teljesen',
                solution: 'Hagyd a gyertyát hosszabb ideig égni, hogy szélesebb viasztócsa alakulhasson ki. Győződj meg róla, hogy a tartályodhoz megfelelő méretű kanócot használsz.'
              }
            ]
          }
        ]
      };
    } else {
      return {
        title: 'Instructions',
        subtitle: 'Complete guide for using and caring for Atomra candles',
        sections: [
          {
            title: 'How to Use Sand Wax',
            steps: [
              {
                title: 'Preparing the Container',
                description: 'Choose a heat-resistant container, such as a glass, ceramic, or metal vessel. Make sure the container is clean and dry before use.',
                image: '/DSC_2075_710x.webp'
              },
              {
                title: 'Adding Sand Wax',
                description: 'Pour the sand wax pearls into the container, filling it to about 1-2 cm from the top edge. Don\'t fill the container completely to allow for wax expansion when lit.',
                image: '/DSC_2075_710x.webp'
              },
              {
                title: 'Placing the Wick',
                description: 'Insert the wick into the center of the sand wax, making sure it reaches the bottom of the container. The wick should extend about 1 cm above the wax surface.',
                image: '/DSC_2082_710x.webp'
              },
              {
                title: 'Lighting the Candle',
                description: 'Light the wick and allow the flame to burn. The sand wax will begin to melt around the wick, creating a pool of liquid wax.',
                image: '/regregrg_cedf33bb-8bb4-4797-899b-f9d3cb8f33f7_710x.webp'
              },
              {
                title: 'Refilling',
                description: 'When the wax level drops, extinguish the candle and let it cool. Add more sand wax pearls and a new wick if necessary. Then, light again to continue enjoying your candle.',
                image: '/DSC_2075_710x.webp'
              }
            ]
          },
          {
            title: 'Care and Safety Tips',
            items: [
              'Never leave a burning candle unattended.',
              'Keep candles away from flammable materials, drafts, and children or pets.',
              'Trim the wick to 5-6 mm before each lighting for optimal burning.',
              'On first use, allow the candle to burn for at least 2 hours to form an even wax pool.',
              'Extinguish the candle if the flame becomes too large or smokes excessively.',
              'Allow the candle to cool completely before moving or refilling.',
              'Store sand wax pearls in a cool, dry place away from direct sunlight.'
            ]
          },
          {
            title: 'Choosing the Right Wick',
            description: 'Choosing the correct wick is essential for optimal burning of your candle. Here\'s a guide to help you select the right wick based on the diameter of your container:',
            sizes: [
              {
                name: 'Small Wick',
                description: 'Suitable for containers with a diameter of 5-8 cm.',
                recommendation: 'Ideal for shot glasses or small containers.'
              },
              {
                name: 'Medium Wick',
                description: 'Suitable for containers with a diameter of 8-12 cm.',
                recommendation: 'Perfect for most standard glasses and containers.'
              },
              {
                name: 'Large Wick',
                description: 'Suitable for containers with a diameter of 12-15 cm.',
                recommendation: 'Recommended for large bowls and wide containers.'
              }
            ]
          },
          {
            title: 'Troubleshooting',
            problems: [
              {
                issue: 'Flame too small',
                solution: 'Use a thicker wick or ensure the wick is centered and vertical.'
              },
              {
                issue: 'Flame too large or smoking',
                solution: 'Trim the wick shorter or use a thinner wick. Make sure there are no drafts around the candle.'
              },
              {
                issue: 'Uneven burning',
                solution: 'Ensure the wick is centered. For wider containers, you can use multiple wicks for even burning.'
              },
              {
                issue: 'Wax not melting completely',
                solution: 'Allow the candle to burn longer to permit a wider wax pool to form. Make sure you\'re using the correct wick size for your container.'
              }
            ]
          }
        ]
      };
    }
  };

  const content = getContent();

  return (
    <>
      <SEOHead
        title={getPageTitle()}
        description="Instrucțiuni complete pentru utilizarea și îngrijirea lumânărilor din ceară naturală Atomra. Ghid pas cu pas, sfaturi de siguranță și soluții pentru probleme comune."
        keywords="instrucțiuni, ghid utilizare, lumânări, ceară de nisip, fitil, îngrijire lumânări, siguranță"
        url="https://atomra-home-romania.com/instructions"
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
              {/* How to Use Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mb-16"
              >
                <h2 className="text-2xl font-light text-slate-900 mb-8 text-center">{content.sections[0].title}</h2>
                
                <div className="space-y-12">
                  {content.sections[0].steps.map((step, index) => (
                    <div key={index} className="flex flex-col md:flex-row gap-8 items-center">
                      <div className="md:w-1/2">
                        <div className="luxury-card p-6 rounded-lg h-full">
                          <div className="flex items-center space-x-4 mb-4">
                            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-slate-900 font-medium">{index + 1}</span>
                            </div>
                            <h3 className="text-xl font-light text-slate-900">{step.title}</h3>
                          </div>
                          <p className="text-slate-600 font-light">{step.description}</p>
                        </div>
                      </div>
                      <div className="md:w-1/2">
                        <img 
                          src={step.image} 
                          alt={step.title} 
                          className="rounded-lg shadow-md w-full h-auto"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              {/* Care and Safety Tips */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="luxury-card p-8 rounded-lg mb-16"
              >
                <h2 className="text-2xl font-light text-slate-900 mb-6 text-center">{content.sections[1].title}</h2>
                
                <ul className="space-y-4 max-w-3xl mx-auto">
                  {content.sections[1].items.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center mt-0.5 mr-4">
                        <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                      </div>
                      <span className="text-slate-600 font-light">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              
              {/* Choosing the Right Wick */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="luxury-card p-8 rounded-lg mb-16"
              >
                <h2 className="text-2xl font-light text-slate-900 mb-6 text-center">{content.sections[2].title}</h2>
                
                <p className="text-slate-600 font-light mb-8 text-center max-w-4xl mx-auto">
                  {content.sections[2].description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  {content.sections[2].sizes.map((size, index) => (
                    <div key={index} className="bg-slate-50 p-6 rounded-lg">
                      <h3 className="text-lg font-light text-slate-900 mb-2">{size.name}</h3>
                      <p className="text-slate-600 font-light mb-3">{size.description}</p>
                      <p className="text-sm text-slate-500 italic">{size.recommendation}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              {/* Troubleshooting */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="luxury-card p-8 rounded-lg"
              >
                <h2 className="text-2xl font-light text-slate-900 mb-6 text-center">{content.sections[3].title}</h2>
                
                <div className="max-w-4xl mx-auto">
                  <div className="overflow-hidden rounded-lg border border-slate-200">
                    <table className="min-w-full divide-y divide-slate-200">
                      <thead className="bg-slate-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            {language === 'ro' ? 'Problemă' : 
                             language === 'hu' ? 'Probléma' : 
                             'Issue'}
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            {language === 'ro' ? 'Soluție' : 
                             language === 'hu' ? 'Megoldás' : 
                             'Solution'}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-slate-200">
                        {content.sections[3].problems.map((problem, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                              {problem.issue}
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-600 font-light">
                              {problem.solution}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default InstructionsPage;
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import SEOHead from '../components/SEOHead';
import { useLanguage } from '../context/LanguageContext';
import { getSiteUrl } from '../utils/siteConfig';

const ScentsPage = () => {
  const { language } = useLanguage();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const content = {
    ro: {
      title: 'Despre parfumurile Atomra',
      subtitle: 'O privire clară asupra atmosferei pe care vrem să o construim.',
      seoTitle: 'Parfumurile Atomra | Atomra Home Romania',
      seoDescription:
        'Descoperă cum gândim universul olfactiv Atomra: note curate, combinații elegante și idei pentru personalizarea atmosferei din casa ta.',
      intro:
        'Pentru noi, parfumul nu este doar un detaliu. Este elementul care schimbă ritmul unei seri, completează decorul și transformă o lumânare într-o stare.',
      naturalTitle: 'Ce urmărim',
      naturalDescription:
        'Punem accent pe senzații curate, echilibru și o prezență olfactivă plăcută. Ne interesează parfumurile care completează spațiul, nu îl încarcă.',
      benefitsTitle: 'Ce ne dorim de la o aromă bună',
      benefits: [
        'Să fie ușor de integrat în viața de zi cu zi',
        'Să completeze spațiul fără să devină apăsătoare',
        'Să susțină o atmosferă calmă, elegantă și coerentă',
        'Să permită combinații și ritualuri personale'
      ],
      collectionsTitle: 'Direcții olfactive',
      collectionsDescription:
        'Am grupat inspirația noastră în câteva familii de atmosferă, ca să fie mai ușor să alegi direcția potrivită pentru casa ta.',
      collections: [
        {
          name: 'Relaxare',
          scents: ['Lavandă', 'Vanilie', 'Ceai alb', 'Lemn de santal'],
          description: 'Pentru seri liniștite, băi calde și momente în care vrei să încetinești.'
        },
        {
          name: 'Fresh',
          scents: ['Citrice', 'Mentă', 'Eucalipt', 'Verde curat'],
          description: 'Pentru dimineți clare, spații aerisite și o senzație de prospețime.'
        },
        {
          name: 'Natural',
          scents: ['Ploaie de vară', 'Pădure', 'Iarbă', 'Mosc curat'],
          description: 'Pentru interioare care vor să păstreze o legătură discretă cu natura.'
        },
        {
          name: 'Warm gourmand',
          scents: ['Scorțișoară', 'Caramel sărat', 'Biscuit', 'Cafea'],
          description: 'Pentru sezoane reci, seri cozy și decoruri cu personalitate.'
        }
      ],
      customTitle: 'Cum personalizezi atmosfera',
      customDescription:
        'Nu există o singură formulă corectă. Alege parfumul în funcție de moment, cameră și energia pe care vrei să o creezi.',
      customIdeas: [
        {
          name: 'Seară liniștită',
          mix: 'Lavandă + vanilie',
          mood: 'Perfect pentru relaxare, lectură sau timp de reconectare.'
        },
        {
          name: 'Dimineață fresh',
          mix: 'Citrice + mentă',
          mood: 'Potrivit pentru birou, bucătărie sau început de zi.'
        },
        {
          name: 'Decor de sezon',
          mix: 'Scorțișoară + caramel',
          mood: 'Ideal pentru seri reci și spații care cer mai multă căldură vizuală.'
        },
        {
          name: 'Echilibru discret',
          mix: 'Ceai alb + lemn de santal',
          mood: 'Pentru interioare elegante și un parfum calm, rafinat.'
        }
      ],
      careTitle: 'Sfaturi simple',
      careTips: [
        'Alege intensitatea în funcție de dimensiunea camerei.',
        'Nu combina prea multe note simultan dacă vrei un rezultat coerent.',
        'Testează parfumul în momente diferite ale zilei, nu doar seara.',
        'Păstrează atmosfera consecventă într-o cameră pentru un efect mai elegant.'
      ]
    },
    hu: {
      title: 'Az Atomra illatvilága',
      subtitle: 'Tiszta, letisztult megközelítés az otthoni hangulathoz.',
      seoTitle: 'Az Atomra illatai | Atomra Home Romania',
      seoDescription:
        'Fedezd fel, hogyan gondolkodunk az Atomra illatvilágáról: tiszta jegyek, elegáns kombinációk és otthoni hangulatötletek.',
      intro:
        'Számunkra az illat nem puszta kiegészítő. Ez az a réteg, amely tempót, érzetet és karaktert ad egy térnek.',
      naturalTitle: 'Mire figyelünk',
      naturalDescription:
        'A tiszta érzetre, az egyensúlyra és arra, hogy az illat kiegészítse a teret, ne uralja azt.',
      benefitsTitle: 'Mit várunk egy jó illattól',
      benefits: [
        'Könnyen illeszkedjen a mindennapokhoz',
        'Egészítse ki a teret anélkül, hogy túl sok lenne',
        'Nyugodt, elegáns és koherens hangulatot teremtsen',
        'Teret adjon a személyes kombinációknak'
      ],
      collectionsTitle: 'Illatirányok',
      collectionsDescription:
        'Néhány jól felismerhető hangulatcsaládba rendeztük az inspirációinkat, hogy könnyebb legyen választani.',
      collections: [
        {
          name: 'Relax',
          scents: ['Levendula', 'Vanília', 'Fehér tea', 'Szantál'],
          description: 'Nyugodt estékhez, meleg fürdőhöz és lassabb pillanatokhoz.'
        },
        {
          name: 'Fresh',
          scents: ['Citrus', 'Menta', 'Eukaliptusz', 'Zöld jegyek'],
          description: 'Tiszta reggelekhez, világos terekhez és friss induláshoz.'
        },
        {
          name: 'Natural',
          scents: ['Nyári eső', 'Erdő', 'Friss fű', 'Tiszta pézsma'],
          description: 'Azokhoz a terekhez, ahol a természet finoman jelen van.'
        },
        {
          name: 'Warm gourmand',
          scents: ['Fahéj', 'Sós karamell', 'Keksz', 'Kávé'],
          description: 'Hűvösebb évszakokra, kuckós estékhez és karakteres dekorhoz.'
        }
      ],
      customTitle: 'Hogyan szabhatod személyre',
      customDescription:
        'Nincs egyetlen helyes megoldás. A hangulatot a napszak, a tér és az érzés alapján érdemes kiválasztani.',
      customIdeas: [
        {
          name: 'Nyugodt este',
          mix: 'Levendula + vanília',
          mood: 'Olvasáshoz, lelassuláshoz és csendes pillanatokhoz.'
        },
        {
          name: 'Friss reggel',
          mix: 'Citrus + menta',
          mood: 'Munkához, konyhába vagy energikus kezdéshez.'
        },
        {
          name: 'Szezonhangulat',
          mix: 'Fahéj + karamell',
          mood: 'Hidegebb napokra és melegebb összhatású terekbe.'
        },
        {
          name: 'Finom elegancia',
          mix: 'Fehér tea + szantál',
          mood: 'Letisztult enteriőrökhöz és kifinomult légkörhöz.'
        }
      ],
      careTitle: 'Egyszerű tippek',
      careTips: [
        'A szoba méretéhez igazítsd az intenzitást.',
        'Ne keverj túl sok jegyet egyszerre, ha harmonikus eredményt szeretnél.',
        'Különböző napszakokban is próbáld ki ugyanazt az illatot.',
        'Egy térben maradj következetes az illatvilághoz.'
      ]
    },
    en: {
      title: 'The Atomra scent world',
      subtitle: 'A cleaner and more intentional approach to atmosphere.',
      seoTitle: 'Atomra scents | Atomra Home Romania',
      seoDescription:
        'Explore how we think about scent at Atomra: cleaner notes, elegant combinations and practical ideas for styling the mood of your home.',
      intro:
        'For us, scent is not a side note. It is the layer that changes the pace of a room, supports the styling and turns candlelight into a feeling.',
      naturalTitle: 'What we aim for',
      naturalDescription:
        'We focus on clarity, balance and a scent presence that complements the room instead of overwhelming it.',
      benefitsTitle: 'What we want from a good aroma',
      benefits: [
        'It should fit naturally into everyday living',
        'It should support the room without taking it over',
        'It should help build a calm and elegant atmosphere',
        'It should leave room for personal combinations and rituals'
      ],
      collectionsTitle: 'Scent directions',
      collectionsDescription:
        'We think in a few atmosphere families so it becomes easier to choose the mood that fits your space.',
      collections: [
        {
          name: 'Relaxation',
          scents: ['Lavender', 'Vanilla', 'White tea', 'Sandalwood'],
          description: 'For quiet evenings, warm baths and slower moments.'
        },
        {
          name: 'Fresh',
          scents: ['Citrus', 'Mint', 'Eucalyptus', 'Green notes'],
          description: 'For clear mornings, airy spaces and a fresh start.'
        },
        {
          name: 'Natural',
          scents: ['Summer rain', 'Forest', 'Fresh grass', 'Clean musk'],
          description: 'For interiors that keep a subtle connection to nature.'
        },
        {
          name: 'Warm gourmand',
          scents: ['Cinnamon', 'Salted caramel', 'Biscuit', 'Coffee'],
          description: 'For colder seasons, cozy evenings and warmer styling.'
        }
      ],
      customTitle: 'How to personalize the mood',
      customDescription:
        'There is no single correct formula. Choose the scent based on the room, the time of day and the energy you want to create.',
      customIdeas: [
        {
          name: 'Quiet evening',
          mix: 'Lavender + vanilla',
          mood: 'Great for reading, unwinding and slower rituals.'
        },
        {
          name: 'Fresh morning',
          mix: 'Citrus + mint',
          mood: 'A good match for workspaces, kitchens and a bright start.'
        },
        {
          name: 'Seasonal warmth',
          mix: 'Cinnamon + caramel',
          mood: 'Perfect for colder days and spaces that need visual warmth.'
        },
        {
          name: 'Soft elegance',
          mix: 'White tea + sandalwood',
          mood: 'Ideal for refined interiors and a subtle scent presence.'
        }
      ],
      careTitle: 'Simple guidance',
      careTips: [
        'Match the intensity to the size of the room.',
        'Avoid mixing too many notes at once if you want a balanced result.',
        'Test the same scent at different times of the day.',
        'Keep the scent story of a room consistent for a more polished effect.'
      ]
    }
  }[language === 'hu' ? 'hu' : language === 'en' ? 'en' : 'ro'];

  return (
    <>
      <SEOHead
        title={content.seoTitle}
        description={content.seoDescription}
        keywords="parfumuri atomra, scents, illatok, candle scents, atmosferă, home fragrance"
        url={getSiteUrl('/scents')}
      />

      <div className="luxury-page-bg luxury-floating-elements min-h-screen">
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-32 left-16 w-1 h-1 bg-slate-300/20 rounded-full animate-luxury-float"></div>
          <div className="absolute top-48 right-24 w-0.5 h-0.5 bg-slate-200/30 rounded-full animate-luxury-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-32 left-1/4 w-0.5 h-0.5 bg-slate-300/25 rounded-full animate-luxury-float" style={{ animationDelay: '4s' }}></div>
          <div className="absolute bottom-48 right-1/4 w-1 h-1 bg-slate-200/20 rounded-full animate-luxury-float" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="pt-32 sm:pt-36 md:pt-40 lg:pt-44 relative z-10">
          <section className="py-6 sm:py-8 luxury-section-light">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
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
          </section>

          <section className="py-16 sm:py-20 luxury-section-dark">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="luxury-card p-8 rounded-lg"
              >
                <p className="text-lg text-slate-600 font-light leading-relaxed text-center max-w-4xl mx-auto">
                  {content.intro}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="luxury-card p-8 rounded-lg"
              >
                <h2 className="text-2xl font-light text-slate-900 mb-6 text-center">{content.naturalTitle}</h2>
                <p className="text-slate-600 font-light mb-8 text-center max-w-4xl mx-auto">
                  {content.naturalDescription}
                </p>
                <div className="bg-slate-50 p-6 rounded-lg max-w-3xl mx-auto">
                  <h3 className="text-lg font-light text-slate-900 mb-4 text-center">{content.benefitsTitle}</h3>
                  <ul className="space-y-3">
                    {content.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start">
                        <div className="flex-shrink-0 w-5 h-5 bg-slate-100 rounded-full flex items-center justify-center mt-0.5 mr-3">
                          <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                        </div>
                        <span className="text-slate-600 font-light">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h2 className="text-2xl font-light text-slate-900 mb-6 text-center">{content.collectionsTitle}</h2>
                <p className="text-slate-600 font-light mb-8 text-center max-w-4xl mx-auto">
                  {content.collectionsDescription}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {content.collections.map((collection) => (
                    <div key={collection.name} className="luxury-card p-6 rounded-lg">
                      <h3 className="text-xl font-light text-slate-900 mb-3">{collection.name}</h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {collection.scents.map((scent) => (
                          <span key={scent} className="inline-block bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm">
                            {scent}
                          </span>
                        ))}
                      </div>
                      <p className="text-slate-600 font-light">{collection.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="luxury-card p-8 rounded-lg"
              >
                <h2 className="text-2xl font-light text-slate-900 mb-6 text-center">{content.customTitle}</h2>
                <p className="text-slate-600 font-light mb-8 text-center max-w-4xl mx-auto">
                  {content.customDescription}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {content.customIdeas.map((idea) => (
                    <div key={idea.name} className="bg-slate-50 p-6 rounded-lg">
                      <h3 className="text-lg font-light text-slate-900 mb-2">{idea.name}</h3>
                      <p className="text-slate-600 font-light mb-3">{idea.mix}</p>
                      <p className="text-sm text-slate-500 italic">{idea.mood}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="luxury-card p-8 rounded-lg"
              >
                <h2 className="text-2xl font-light text-slate-900 mb-6 text-center">{content.careTitle}</h2>
                <ul className="space-y-4 max-w-3xl mx-auto">
                  {content.careTips.map((tip) => (
                    <li key={tip} className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center mt-0.5 mr-4">
                        <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                      </div>
                      <span className="text-slate-600 font-light">{tip}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ScentsPage;

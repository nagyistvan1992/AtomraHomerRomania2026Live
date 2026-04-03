import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import SEOHead from '../components/SEOHead';
import { motion } from 'framer-motion';

const ScentsPage = () => {
  const { language } = useLanguage();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Get page title based on language
  const getPageTitle = () => {
    if (language === 'ro') {
      return 'Despre Parfumurile Atomra | Atomra Home Romania';
    } else if (language === 'hu') {
      return 'Az Atomra Illatokról | Atomra Home Romania';
    } else {
      return 'About Atomra Scents | Atomra Home Romania';
    }
  };

  // Get content based on language
  const getContent = () => {
    if (language === 'ro') {
      return {
        title: 'Despre Parfumurile Atomra',
        subtitle: 'Descoperă colecția noastră de parfumuri naturale pentru lumânări',
        intro: 'La Atomra, credem că parfumul unei lumânări ar trebui să fie la fel de natural și pur ca și ceara din care este făcută. De aceea, folosim doar uleiuri esențiale și parfumuri naturale de cea mai înaltă calitate pentru a crea experiențe olfactive memorabile.',
        natural: {
          title: 'De Ce Parfumuri Naturale?',
          description: 'Parfumurile sintetice pot conține substanțe chimice care, atunci când sunt arse, eliberează compuși potențial dăunători în aerul din casa ta. Parfumurile noastre naturale sunt derivate din plante, flori, fructe și alte surse naturale, oferind o experiență olfactivă autentică și sănătoasă.',
          benefits: [
            'Fără substanțe chimice dăunătoare sau toxine',
            'Proprietăți terapeutice naturale',
            'Parfum autentic și complex',
            'Experiență olfactivă mai subtilă și mai plăcută',
            'Compatibilitate cu stilul de viață eco-friendly'
          ]
        },
        collections: {
          title: 'Colecțiile Noastre de Parfumuri',
          description: 'Explorează colecțiile noastre diverse de parfumuri, fiecare creată pentru a evoca o stare de spirit sau o atmosferă specifică:',
          items: [
            {
              name: 'Colecția Relaxare',
              scents: ['Lavandă', 'Vanilie', 'Ceai Alb', 'Lemn de Santal'],
              description: 'Parfumuri liniștitoare și calmante, perfecte pentru serile relaxante sau meditație.'
            },
            {
              name: 'Colecția Energizantă',
              scents: ['Citrice', 'Mentă', 'Eucalipt', 'Lemongrass'],
              description: 'Arome revigorante și proaspete care stimulează mintea și cresc energia.'
            },
            {
              name: 'Colecția Naturală',
              scents: ['Pădure de Pin', 'Iarbă Proaspătă', 'Ploaie de Vară', 'Mușchi de Pădure'],
              description: 'Parfumuri inspirate de natură care aduc exteriorul în casa ta.'
            },
            {
              name: 'Colecția Gourmand',
              scents: ['Prăjitură cu Scorțișoară', 'Caramel Sărat', 'Biscuiți de Casă', 'Cafea Proaspătă'],
              description: 'Arome delicioase și confortabile care evocă amintiri culinare plăcute.'
            }
          ]
        },
        customization: {
          title: 'Personalizează-ți Experiența',
          description: 'Una dintre cele mai mari bucurii ale sistemului nostru de ceară de nisip este posibilitatea de a-ți crea propriile combinații de parfumuri. Iată câteva idei pentru a începe:',
          ideas: [
            {
              name: 'Oază Tropicală',
              mix: 'Combină Cocos cu Ananas și un strop de Vanilie',
              mood: 'Perfectă pentru a evoca vacanțe pe plajă și relaxare tropicală.'
            },
            {
              name: 'Seară de Iarnă',
              mix: 'Amestecă Scorțișoară cu Portocală și un accent de Cuișoare',
              mood: 'Creează o atmosferă caldă și confortabilă în serile reci de iarnă.'
            },
            {
              name: 'Grădină Zen',
              mix: 'Îmbină Iasomie cu Ceai Verde și o notă de Bambus',
              mood: 'Perfectă pentru meditație și momente de liniște.'
            },
            {
              name: 'Energie de Dimineață',
              mix: 'Combină Lămâie cu Mentă și un strop de Rozmarin',
              mood: 'Ideală pentru spațiile de lucru sau pentru a începe ziua cu energie.'
            }
          ]
        },
        care: {
          title: 'Îngrijirea Parfumurilor',
          tips: [
            'Păstrează granulele parfumate în recipiente etanșe pentru a menține prospețimea parfumului.',
            'Ține granulele departe de lumina directă a soarelui, care poate degrada parfumul în timp.',
            'Pentru o experiență olfactivă optimă, nu amesteca prea multe parfumuri diferite în același timp.',
            'Dacă preferi un parfum mai subtil, amestecă granulele parfumate cu granule neperfumate.',
            'Experimentează cu diferite combinații pentru a găsi amestecul perfect pentru tine.'
          ]
        }
      };
    } else if (language === 'hu') {
      return {
        title: 'Az Atomra Illatokról',
        subtitle: 'Fedezd fel természetes gyertyaillatainkat',
        intro: 'Az Atomránál hisszük, hogy egy gyertya illatának ugyanolyan természetesnek és tisztának kell lennie, mint a viasznak, amiből készül. Ezért csak a legmagasabb minőségű esszenciális olajokat és természetes illatanyagokat használjuk emlékezetes illat élmények létrehozásához.',
        natural: {
          title: 'Miért Természetes Illatok?',
          description: 'A szintetikus illatok olyan vegyi anyagokat tartalmazhatnak, amelyek égéskor potenciálisan káros vegyületeket bocsátanak az otthonod levegőjébe. Természetes illataink növényekből, virágokból, gyümölcsökből és más természetes forrásokból származnak, hiteles és egészséges illatélményt nyújtva.',
          benefits: [
            'Nincsenek káros vegyi anyagok vagy toxinok',
            'Természetes terápiás tulajdonságok',
            'Hiteles és összetett illat',
            'Finomabb és kellemesebb illatélmény',
            'Kompatibilitás az ökobarát életmóddal'
          ]
        },
        collections: {
          title: 'Illatkollekcióink',
          description: 'Fedezd fel változatos illatkollekciónkat, amelyek mindegyikét úgy terveztük, hogy egy adott hangulatot vagy atmoszférát idézzen elő:',
          items: [
            {
              name: 'Relaxációs Kollekció',
              scents: ['Levendula', 'Vanília', 'Fehér Tea', 'Szantálfa'],
              description: 'Nyugtató és pihentető illatok, tökéletesek relaxáló estékhez vagy meditációhoz.'
            },
            {
              name: 'Energizáló Kollekció',
              scents: ['Citrusfélék', 'Menta', 'Eukaliptusz', 'Citromfű'],
              description: 'Frissítő és élénkítő aromák, amelyek stimulálják az elmét és növelik az energiát.'
            },
            {
              name: 'Természetes Kollekció',
              scents: ['Fenyőerdő', 'Friss Fű', 'Nyári Eső', 'Erdei Moha'],
              description: 'Természet ihlette illatok, amelyek behozzák a külteret az otthonodba.'
            },
            {
              name: 'Gourmand Kollekció',
              scents: ['Fahéjas Sütemény', 'Sós Karamell', 'Házi Keksz', 'Friss Kávé'],
              description: 'Ízletes és kényelmes aromák, amelyek kellemes kulináris emlékeket idéznek fel.'
            }
          ]
        },
        customization: {
          title: 'Szabd Személyre az Élményt',
          description: 'Homokviasz rendszerünk egyik legnagyobb öröme a saját illatkombiációk létrehozásának lehetősége. Íme néhány ötlet a kezdéshez:',
          ideas: [
            {
              name: 'Trópusi Oázis',
              mix: 'Kombináld a Kókuszt Ananásszal és egy csepp Vaníliával',
              mood: 'Tökéletes a tengerparti nyaralások és a trópusi relaxáció felidézéséhez.'
            },
            {
              name: 'Téli Este',
              mix: 'Keverd a Fahéjat Naranccsal és egy kis Szegfűszeggel',
              mood: 'Meleg és kényelmes hangulatot teremt a hideg téli estéken.'
            },
            {
              name: 'Zen Kert',
              mix: 'Ötvözd a Jázmint Zöld Teával és egy kis Bambusszal',
              mood: 'Tökéletes meditációhoz és nyugodt pillanatokhoz.'
            },
            {
              name: 'Reggeli Energia',
              mix: 'Kombináld a Citromot Mentával és egy kis Rozmaringgal',
              mood: 'Ideális munkaterekhez vagy a nap energikus kezdéséhez.'
            }
          ]
        },
        care: {
          title: 'Illatápolás',
          tips: [
            'Tárold az illatosított gyöngyöket légmentesen záródó tartályokban az illat frissességének megőrzéséhez.',
            'Tartsd a gyöngyöket távol a közvetlen napfénytől, amely idővel leronthatja az illatot.',
            'Az optimális illatélményért ne keverj túl sok különböző illatot egyszerre.',
            'Ha finomabb illatot preferálsz, keverd az illatosított gyöngyöket illatmentes gyöngyökkel.',
            'Kísérletezz különböző kombinációkkal, hogy megtaláld a számodra tökéletes keveréket.'
          ]
        }
      };
    } else {
      return {
        title: 'About Atomra Scents',
        subtitle: 'Discover our collection of natural candle fragrances',
        intro: 'At Atomra, we believe that a candle\'s scent should be as natural and pure as the wax it\'s made from. That\'s why we use only the highest quality essential oils and natural fragrances to create memorable olfactory experiences.',
        natural: {
          title: 'Why Natural Fragrances?',
          description: 'Synthetic fragrances can contain chemicals that, when burned, release potentially harmful compounds into your home\'s air. Our natural fragrances are derived from plants, flowers, fruits, and other natural sources, providing an authentic and healthy scent experience.',
          benefits: [
            'No harmful chemicals or toxins',
            'Natural therapeutic properties',
            'Authentic and complex fragrance',
            'More subtle and pleasant scent experience',
            'Compatibility with eco-friendly lifestyle'
          ]
        },
        collections: {
          title: 'Our Fragrance Collections',
          description: 'Explore our diverse fragrance collections, each designed to evoke a specific mood or atmosphere:',
          items: [
            {
              name: 'Relaxation Collection',
              scents: ['Lavender', 'Vanilla', 'White Tea', 'Sandalwood'],
              description: 'Soothing and calming scents, perfect for relaxing evenings or meditation.'
            },
            {
              name: 'Energizing Collection',
              scents: ['Citrus', 'Mint', 'Eucalyptus', 'Lemongrass'],
              description: 'Invigorating and fresh aromas that stimulate the mind and boost energy.'
            },
            {
              name: 'Natural Collection',
              scents: ['Pine Forest', 'Fresh Grass', 'Summer Rain', 'Forest Moss'],
              description: 'Nature-inspired scents that bring the outdoors into your home.'
            },
            {
              name: 'Gourmand Collection',
              scents: ['Cinnamon Cake', 'Salted Caramel', 'Homemade Cookies', 'Fresh Coffee'],
              description: 'Delicious and comforting aromas that evoke pleasant culinary memories.'
            }
          ]
        },
        customization: {
          title: 'Customize Your Experience',
          description: 'One of the greatest joys of our sand wax system is the ability to create your own fragrance combinations. Here are some ideas to get you started:',
          ideas: [
            {
              name: 'Tropical Oasis',
              mix: 'Combine Coconut with Pineapple and a hint of Vanilla',
              mood: 'Perfect for evoking beach vacations and tropical relaxation.'
            },
            {
              name: 'Winter Evening',
              mix: 'Blend Cinnamon with Orange and a touch of Clove',
              mood: 'Creates a warm and cozy atmosphere on cold winter evenings.'
            },
            {
              name: 'Zen Garden',
              mix: 'Pair Jasmine with Green Tea and a note of Bamboo',
              mood: 'Perfect for meditation and moments of tranquility.'
            },
            {
              name: 'Morning Energy',
              mix: 'Combine Lemon with Mint and a hint of Rosemary',
              mood: 'Ideal for workspaces or starting the day with energy.'
            }
          ]
        },
        care: {
          title: 'Fragrance Care',
          tips: [
            'Store scented pearls in airtight containers to maintain fragrance freshness.',
            'Keep pearls away from direct sunlight, which can degrade the fragrance over time.',
            'For optimal scent experience, don\'t mix too many different fragrances at once.',
            'If you prefer a more subtle scent, mix scented pearls with unscented ones.',
            'Experiment with different combinations to find the perfect blend for you.'
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
        description="Descoperă colecția de parfumuri naturale Atomra pentru lumânări din ceară naturală. Arome autentice, beneficii terapeutice și idei de personalizare."
        keywords="parfumuri naturale, arome lumânări, uleiuri esențiale, parfumuri Atomra, personalizare lumânări"
        url="https://atomra-home-romania.com/scents"
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
              
              {/* Why Natural Fragrances */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="luxury-card p-8 rounded-lg mb-12"
              >
                <h2 className="text-2xl font-light text-slate-900 mb-6 text-center">{content.natural.title}</h2>
                
                <p className="text-slate-600 font-light mb-8 text-center max-w-4xl mx-auto">
                  {content.natural.description}
                </p>
                
                <div className="bg-slate-50 p-6 rounded-lg max-w-3xl mx-auto">
                  <h3 className="text-lg font-light text-slate-900 mb-4 text-center">
                    {language === 'ro' ? 'Beneficii ale Parfumurilor Naturale' : 
                     language === 'hu' ? 'A Természetes Illatok Előnyei' : 
                     'Benefits of Natural Fragrances'}
                  </h3>
                  
                  <ul className="space-y-3">
                    {content.natural.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0 w-5 h-5 bg-slate-100 rounded-full flex items-center justify-center mt-0.5 mr-3">
                          <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                        </div>
                        <span className="text-slate-600 font-light">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
              
              {/* Fragrance Collections */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-light text-slate-900 mb-6 text-center">{content.collections.title}</h2>
                
                <p className="text-slate-600 font-light mb-8 text-center max-w-4xl mx-auto">
                  {content.collections.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {content.collections.items.map((collection, index) => (
                    <div key={index} className="luxury-card p-6 rounded-lg">
                      <h3 className="text-xl font-light text-slate-900 mb-3">{collection.name}</h3>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {collection.scents.map((scent, i) => (
                          <span key={i} className="inline-block bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm">
                            {scent}
                          </span>
                        ))}
                      </div>
                      
                      <p className="text-slate-600 font-light">{collection.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              {/* Customize Your Experience */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="luxury-card p-8 rounded-lg mb-12"
              >
                <h2 className="text-2xl font-light text-slate-900 mb-6 text-center">{content.customization.title}</h2>
                
                <p className="text-slate-600 font-light mb-8 text-center max-w-4xl mx-auto">
                  {content.customization.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {content.customization.ideas.map((idea, index) => (
                    <div key={index} className="bg-slate-50 p-6 rounded-lg">
                      <h3 className="text-lg font-light text-slate-900 mb-2">{idea.name}</h3>
                      <p className="text-slate-600 font-light mb-3">{idea.mix}</p>
                      <p className="text-sm text-slate-500 italic">{idea.mood}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              {/* Fragrance Care */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="luxury-card p-8 rounded-lg"
              >
                <h2 className="text-2xl font-light text-slate-900 mb-6 text-center">{content.care.title}</h2>
                
                <ul className="space-y-4 max-w-3xl mx-auto">
                  {content.care.tips.map((tip, index) => (
                    <li key={index} className="flex items-start">
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
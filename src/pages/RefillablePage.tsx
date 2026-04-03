import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import SEOHead from '../components/SEOHead';
import { motion } from 'framer-motion';
import { RefreshCw, Recycle, Palette, DollarSign, Sparkles } from 'lucide-react';

const RefillablePage = () => {
  const { language } = useLanguage();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Get page title based on language
  const getPageTitle = () => {
    if (language === 'ro') {
      return 'Lumânări Reîncărcabile, Refolosibile | Atomra Home Romania';
    } else if (language === 'hu') {
      return 'Újratölthető, Újrahasználható Gyertyák | Atomra Home Romania';
    } else {
      return 'Refillable, Reusable Candles | Atomra Home Romania';
    }
  };

  // Get content based on language
  const getContent = () => {
    if (language === 'ro') {
      return {
        title: 'Lumânări Reîncărcabile, Refolosibile',
        subtitle: 'Descoperă sistemul nostru inovator de lumânări perlate reîncărcabile',
        intro: 'Sistemul nostru unic de lumânări perlate reîncărcabile reprezintă o revoluție în industria lumânărilor, oferind o soluție sustenabilă, personalizabilă și economică pentru iubitorii de lumânări.',
        howItWorks: {
          title: 'Cum Funcționează',
          steps: [
            {
              title: 'Umple',
              description: 'Toarnă granulele de ceară de nisip în recipientul dorit, fie că este unul din colecția noastră sau un recipient pe care îl ai deja acasă.',
              icon: <Sparkles size={32} strokeWidth={1.5} className="text-amber-600" />
            },
            {
              title: 'Aprinde',
              description: 'Adaugă un fitil în centrul granulelor și aprinde-l. Ceara se va topi în jurul fitilului, creând un bazin de ceară lichidă.',
              icon: <Sparkles size={32} strokeWidth={1.5} className="text-red-600" />
            },
            {
              title: 'Reîmprospătează',
              description: 'Când ceara s-a consumat, adaugă pur și simplu mai multe granule și un fitil nou pentru a continua să te bucuri de lumânarea ta.',
              icon: <RefreshCw size={32} strokeWidth={1.5} className="text-green-600" />
            }
          ]
        },
        benefits: {
          title: 'Beneficiile Lumânărilor Reîncărcabile',
          items: [
            {
              title: 'Sustenabilitate',
              description: 'Prin reutilizarea recipientelor și reumplerea lor cu granule de ceară, reduci semnificativ deșeurile și impactul asupra mediului.',
              icon: <Recycle size={32} strokeWidth={1.5} className="text-green-600" />
            },
            {
              title: 'Personalizare',
              description: 'Amestecă diferite culori și parfumuri de granule pentru a crea combinații unice care se potrivesc perfect cu starea ta de spirit sau decorul casei.',
              icon: <Palette size={32} strokeWidth={1.5} className="text-purple-600" />
            },
            {
              title: 'Economie',
              description: 'Sistemul nostru de reumplere este mai economic pe termen lung decât cumpărarea constantă de lumânări noi, oferind mai multă valoare pentru banii tăi.',
              icon: <DollarSign size={32} strokeWidth={1.5} className="text-blue-600" />
            },
            {
              title: 'Versatilitate',
              description: 'Folosește orice recipient rezistent la căldură - de la pahare de vin vechi la boluri decorative sau recipiente speciale pentru lumânări.',
              icon: <RefreshCw size={32} strokeWidth={1.5} className="text-amber-600" />
            }
          ]
        },
        containers: {
          title: 'Idei de Recipiente',
          description: 'Unul dintre aspectele cele mai creative ale sistemului nostru de lumânări reîncărcabile este posibilitatea de a folosi o varietate de recipiente. Iată câteva idei pentru a te inspira:',
          ideas: [
            {
              name: 'Pahare de Vin',
              description: 'Transformă paharele de vin vechi sau ciobite în elegante suporturi pentru lumânări.'
            },
            {
              name: 'Cești de Ceai Vintage',
              description: 'Ceștile de ceai vechi sau fără pereche pot deveni lumânări fermecătoare cu caracter.'
            },
            {
              name: 'Boluri de Ceramică',
              description: 'Bolurile mici de ceramică oferă o bază stabilă și un aspect rustic pentru lumânările tale.'
            },
            {
              name: 'Recipiente din Sticlă Colorată',
              description: 'Sticla colorată creează efecte de lumină frumoase când lumânarea arde în interior.'
            },
            {
              name: 'Ghivece Mici',
              description: 'Ghivecele mici, în special cele din teracotă, pot fi transformate în lumânări cu aspect mediteranean.'
            },
            {
              name: 'Recipiente Sezoniere',
              description: 'Schimbă recipientele în funcție de sezon sau sărbători pentru a completa decorul.'
            }
          ]
        },
        tips: {
          title: 'Sfaturi pentru Utilizare Optimă',
          items: [
            'Asigură-te că recipientul ales este rezistent la căldură și nu are fisuri.',
            'Lasă aproximativ 1-2 cm spațiu liber în partea de sus a recipientului.',
            'Pentru o ardere uniformă, asigură-te că fitilul este centrat.',
            'Alege grosimea fitilului în funcție de diametrul recipientului.',
            'Pentru recipiente mai largi, poți folosi mai multe fitile pentru o ardere uniformă.',
            'Experimentează cu straturi de granule colorate pentru un efect vizual deosebit.',
            'Amestecă granule parfumate cu cele neperfumate pentru a controla intensitatea parfumului.'
          ]
        },
        conclusion: 'Sistemul nostru de lumânări reîncărcabile nu este doar o modalitate de a aduce lumină și parfum în casa ta, ci și o alegere conștientă pentru un stil de viață mai sustenabil. Alătură-te mișcării Atomra și descoperă bucuria lumânărilor reîncărcabile, refolosibile.'
      };
    } else if (language === 'hu') {
      return {
        title: 'Újratölthető, Újrahasználható Gyertyák',
        subtitle: 'Fedezd fel innovatív újratölthető gyöngyviasz rendszerünket',
        intro: 'Egyedi újratölthető gyöngyviasz rendszerünk forradalmat jelent a gyertyaiparban, fenntartható, testreszabható és gazdaságos megoldást kínálva a gyertyakedvelőknek.',
        howItWorks: {
          title: 'Hogyan Működik',
          steps: [
            {
              title: 'Töltsd',
              description: 'Öntsd a homokviasz gyöngyöket a kívánt tartályba, legyen az a kollekciónkból vagy egy olyan tartály, ami már otthon van.',
              icon: <Sparkles size={32} strokeWidth={1.5} className="text-amber-600" />
            },
            {
              title: 'Gyújtsd',
              description: 'Helyezz egy kanócot a gyöngyök közepébe és gyújtsd meg. A viasz elolvad a kanóc körül, folyékony viasztócsát képezve.',
              icon: <Sparkles size={32} strokeWidth={1.5} className="text-red-600" />
            },
            {
              title: 'Frissítsd',
              description: 'Amikor a viasz elfogyott, egyszerűen adj hozzá több gyöngyöt és egy új kanócot, hogy továbbra is élvezhesd a gyertyádat.',
              icon: <RefreshCw size={32} strokeWidth={1.5} className="text-green-600" />
            }
          ]
        },
        benefits: {
          title: 'Az Újratölthető Gyertyák Előnyei',
          items: [
            {
              title: 'Fenntarthatóság',
              description: 'A tartályok újrafelhasználásával és viaszgyöngyökkel való újratöltésével jelentősen csökkented a hulladékot és a környezeti hatást.',
              icon: <Recycle size={32} strokeWidth={1.5} className="text-green-600" />
            },
            {
              title: 'Testreszabás',
              description: 'Keverj különböző színű és illatú gyöngyöket egyedi kombinációk létrehozásához, amelyek tökéletesen illenek a hangulatodhoz vagy az otthonod dekorációjához.',
              icon: <Palette size={32} strokeWidth={1.5} className="text-purple-600" />
            },
            {
              title: 'Gazdaságosság',
              description: 'Újratöltő rendszerünk hosszú távon gazdaságosabb, mint az állandó új gyertyák vásárlása, több értéket nyújtva a pénzedért.',
              icon: <DollarSign size={32} strokeWidth={1.5} className="text-blue-600" />
            },
            {
              title: 'Sokoldalúság',
              description: 'Használj bármilyen hőálló tartályt - a régi borospohártól kezdve a dekoratív tálakig vagy speciális gyertyatartókig.',
              icon: <RefreshCw size={32} strokeWidth={1.5} className="text-amber-600" />
            }
          ]
        },
        containers: {
          title: 'Tartály Ötletek',
          description: 'Újratölthető gyertyarendszerünk egyik legkreatívabb aspektusa a különféle tartályok használatának lehetősége. Íme néhány ötlet az inspirációhoz:',
          ideas: [
            {
              name: 'Borospoharak',
              description: 'Alakítsd a régi vagy csorbult borospoharat elegáns gyertyatartóvá.'
            },
            {
              name: 'Vintage Teáscsészék',
              description: 'A régi vagy páratlan teáscsészék bájos, karakteres gyertyákká válhatnak.'
            },
            {
              name: 'Kerámia Tálak',
              description: 'A kis kerámiatálak stabil alapot és rusztikus megjelenést biztosítanak gyertyáidnak.'
            },
            {
              name: 'Színes Üvegtartályok',
              description: 'A színes üveg gyönyörű fényhatásokat hoz létre, amikor a gyertya belül ég.'
            },
            {
              name: 'Kis Cserepek',
              description: 'A kis cserepek, különösen a terrakotta, mediterrán hangulatú gyertyákká alakíthatók.'
            },
            {
              name: 'Szezonális Tartályok',
              description: 'Váltogasd a tartályokat évszak vagy ünnep szerint a dekoráció kiegészítéséhez.'
            }
          ]
        },
        tips: {
          title: 'Tippek az Optimális Használathoz',
          items: [
            'Győződj meg róla, hogy a választott tartály hőálló és nincs benne repedés.',
            'Hagyj körülbelül 1-2 cm szabad helyet a tartály tetején.',
            'Az egyenletes égéshez győződj meg róla, hogy a kanóc középen van.',
            'Válaszd a kanóc vastagságát a tartály átmérőjének megfelelően.',
            'Szélesebb tartályokhoz használhatsz több kanócot az egyenletes égéshez.',
            'Kísérletezz színes gyöngyök rétegeivel különleges vizuális hatás érdekében.',
            'Keverd az illatosított gyöngyöket illatmentesekkel az illatintenzitás szabályozásához.'
          ]
        },
        conclusion: 'Újratölthető gyertyarendszerünk nemcsak egy módja annak, hogy fényt és illatot hozz az otthonodba, hanem tudatos választás egy fenntarthatóbb életmód mellett. Csatlakozz az Atomra mozgalomhoz, és fedezd fel az újratölthető, újrahasználható gyertyák örömét.'
      };
    } else {
      return {
        title: 'Refillable, Reusable Candles',
        subtitle: 'Discover our innovative refillable pearl candle system',
        intro: 'Our unique refillable pearl candle system represents a revolution in the candle industry, offering a sustainable, customizable, and economical solution for candle lovers.',
        howItWorks: {
          title: 'How It Works',
          steps: [
            {
              title: 'Pour',
              description: 'Pour the sand wax pearls into your desired container, whether it\'s one from our collection or a container you already have at home.',
              icon: <Sparkles size={32} strokeWidth={1.5} className="text-amber-600" />
            },
            {
              title: 'Light',
              description: 'Add a wick to the center of the pearls and light it. The wax will melt around the wick, creating a pool of liquid wax.',
              icon: <Sparkles size={32} strokeWidth={1.5} className="text-red-600" />
            },
            {
              title: 'Refresh',
              description: 'When the wax has been consumed, simply add more pearls and a new wick to continue enjoying your candle.',
              icon: <RefreshCw size={32} strokeWidth={1.5} className="text-green-600" />
            }
          ]
        },
        benefits: {
          title: 'Benefits of Refillable Candles',
          items: [
            {
              title: 'Sustainability',
              description: 'By reusing containers and refilling them with wax pearls, you significantly reduce waste and environmental impact.',
              icon: <Recycle size={32} strokeWidth={1.5} className="text-green-600" />
            },
            {
              title: 'Customization',
              description: 'Mix different colors and scents of pearls to create unique combinations that perfectly match your mood or home decor.',
              icon: <Palette size={32} strokeWidth={1.5} className="text-purple-600" />
            },
            {
              title: 'Economy',
              description: 'Our refill system is more economical in the long run than constantly buying new candles, offering more value for your money.',
              icon: <DollarSign size={32} strokeWidth={1.5} className="text-blue-600" />
            },
            {
              title: 'Versatility',
              description: 'Use any heat-resistant container - from old wine glasses to decorative bowls or special candle vessels.',
              icon: <RefreshCw size={32} strokeWidth={1.5} className="text-amber-600" />
            }
          ]
        },
        containers: {
          title: 'Container Ideas',
          description: 'One of the most creative aspects of our refillable candle system is the ability to use a variety of containers. Here are some ideas to inspire you:',
          ideas: [
            {
              name: 'Wine Glasses',
              description: 'Transform old or chipped wine glasses into elegant candle holders.'
            },
            {
              name: 'Vintage Teacups',
              description: 'Old or unpaired teacups can become charming candles with character.'
            },
            {
              name: 'Ceramic Bowls',
              description: 'Small ceramic bowls provide a stable base and rustic look for your candles.'
            },
            {
              name: 'Colored Glass Containers',
              description: 'Colored glass creates beautiful light effects when the candle burns inside.'
            },
            {
              name: 'Small Planters',
              description: 'Small planters, especially terracotta ones, can be transformed into Mediterranean-style candles.'
            },
            {
              name: 'Seasonal Containers',
              description: 'Change containers according to season or holiday to complement your decor.'
            }
          ]
        },
        tips: {
          title: 'Tips for Optimal Use',
          items: [
            'Make sure your chosen container is heat-resistant and free from cracks.',
            'Leave approximately 1-2 cm of free space at the top of the container.',
            'For even burning, ensure the wick is centered.',
            'Choose the wick thickness according to the container diameter.',
            'For wider containers, you can use multiple wicks for even burning.',
            'Experiment with layers of colored pearls for a special visual effect.',
            'Mix scented pearls with unscented ones to control fragrance intensity.'
          ]
        },
        conclusion: 'Our refillable candle system is not just a way to bring light and fragrance into your home, but also a conscious choice for a more sustainable lifestyle. Join the Atomra movement and discover the joy of refillable, reusable candles.'
      };
    }
  };

  const content = getContent();

  return (
    <>
      <SEOHead
        title={getPageTitle()}
        description="Descoperă sistemul nostru inovator de lumânări reîncărcabile și refolosibile. Sustenabile, personalizabile și economice - o revoluție în industria lumânărilor."
        keywords="lumânări reîncărcabile, lumânări refolosibile, ceară de nisip, granule de ceară, sustenabilitate, personalizare"
        url="https://atomra-home-romania.com/refillable"
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
              
              {/* How It Works */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-light text-slate-900 mb-8 text-center">{content.howItWorks.title}</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {content.howItWorks.steps.map((step, index) => (
                    <div key={index} className="luxury-card p-6 rounded-lg text-center">
                      <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                        {step.icon}
                      </div>
                      <h3 className="text-xl font-light text-slate-900 mb-3">{step.title}</h3>
                      <p className="text-slate-600 font-light">{step.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              {/* Benefits */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-light text-slate-900 mb-8 text-center">{content.benefits.title}</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              
              {/* Container Ideas */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="luxury-card p-8 rounded-lg mb-12"
              >
                <h2 className="text-2xl font-light text-slate-900 mb-6 text-center">{content.containers.title}</h2>
                
                <p className="text-slate-600 font-light mb-8 text-center max-w-4xl mx-auto">
                  {content.containers.description}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  {content.containers.ideas.map((idea, index) => (
                    <div key={index} className="bg-slate-50 p-6 rounded-lg">
                      <h3 className="text-lg font-light text-slate-900 mb-2">{idea.name}</h3>
                      <p className="text-slate-600 font-light">{idea.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              {/* Tips */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="luxury-card p-8 rounded-lg mb-12"
              >
                <h2 className="text-2xl font-light text-slate-900 mb-6 text-center">{content.tips.title}</h2>
                
                <ul className="space-y-4 max-w-3xl mx-auto">
                  {content.tips.items.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center mt-0.5 mr-4">
                        <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                      </div>
                      <span className="text-slate-600 font-light">{tip}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              
              {/* Conclusion */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
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

export default RefillablePage;
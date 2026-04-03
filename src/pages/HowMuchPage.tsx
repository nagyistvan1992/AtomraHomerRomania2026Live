import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import SEOHead from '../components/SEOHead';
import { motion } from 'framer-motion';

const HowMuchPage = () => {
  const { language } = useLanguage();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Get page title based on language
  const getPageTitle = () => {
    if (language === 'ro') {
      return 'Cât de Multă Atomra Am Nevoie? | Atomra Home Romania';
    } else if (language === 'hu') {
      return 'Mennyi Atomrára Van Szükségem? | Atomra Home Romania';
    } else {
      return 'How Much Atomra Do I Need? | Atomra Home Romania';
    }
  };

  // Get content based on language
  const getContent = () => {
    if (language === 'ro') {
      return {
        title: 'Cât de Multă Atomra Am Nevoie?',
        subtitle: 'Ghid pentru a determina cantitatea potrivită de ceară de nisip pentru recipientele tale',
        intro: 'Una dintre cele mai frecvente întrebări pe care le primim este "Cât de multă ceară de nisip am nevoie pentru recipientul meu?". Am creat acest ghid pentru a te ajuta să determini cantitatea potrivită pentru orice recipient.',
        calculator: {
          title: 'Calculator de Ceară',
          description: 'Folosește calculatorul nostru simplu pentru a estima cantitatea de ceară de nisip necesară:',
          diameter: 'Diametrul recipientului (cm):',
          height: 'Înălțimea recipientului (cm):',
          calculate: 'Calculează',
          result: 'Vei avea nevoie de aproximativ {amount} grame de ceară de nisip.',
          note: 'Aceasta este o estimare. Cantitatea exactă poate varia în funcție de forma recipientului.'
        },
        guide: {
          title: 'Ghid Rapid',
          small: {
            title: 'Recipiente Mici',
            description: 'Pentru recipiente cu diametrul de 5-8 cm și înălțimea de 5-10 cm:',
            amount: '100-150 grame de ceară de nisip',
            recommendation: 'Recomandare: Pachetul Essenza (150g)'
          },
          medium: {
            title: 'Recipiente Medii',
            description: 'Pentru recipiente cu diametrul de 8-12 cm și înălțimea de 10-15 cm:',
            amount: '200-300 grame de ceară de nisip',
            recommendation: 'Recomandare: Pachetul Splendore (250g)'
          },
          large: {
            title: 'Recipiente Mari',
            description: 'Pentru recipiente cu diametrul de 12-15 cm și înălțimea de 15-20 cm:',
            amount: '400-600 grame de ceară de nisip',
            recommendation: 'Recomandare: Granule Box (750g)'
          },
          events: {
            title: 'Evenimente',
            description: 'Pentru decorarea evenimentelor (15-20 recipiente medii):',
            amount: '3-5 kg de ceară de nisip',
            recommendation: 'Recomandare: Ceara de nisip 4.5 kg pentru evenimente'
          }
        },
        tips: {
          title: 'Sfaturi pentru Utilizare Optimă',
          items: [
            'Lasă aproximativ 1-2 cm spațiu liber în partea de sus a recipientului',
            'Pentru o ardere uniformă, asigură-te că fitilul este centrat',
            'Alege grosimea fitilului în funcție de diametrul recipientului',
            'Pentru recipiente mai largi, poți folosi mai multe fitile pentru o ardere uniformă',
            'Ceara de nisip poate fi reutilizată - adaugă pur și simplu granule noi când nivelul scade'
          ]
        },
        conclusion: 'Dacă ai întrebări suplimentare despre cantitatea potrivită pentru nevoile tale specifice, nu ezita să ne contactezi. Suntem aici pentru a te ajuta să obții cea mai bună experiență cu lumânările Atomra.'
      };
    } else if (language === 'hu') {
      return {
        title: 'Mennyi Atomrára Van Szükségem?',
        subtitle: 'Útmutató a megfelelő homokviasz mennyiség meghatározásához a tartályaidhoz',
        intro: 'Az egyik leggyakoribb kérdés, amit kapunk: "Mennyi homokviaszra van szükségem a tartályomhoz?". Létrehoztuk ezt az útmutatót, hogy segítsünk meghatározni a megfelelő mennyiséget bármilyen tartályhoz.',
        calculator: {
          title: 'Viasz Kalkulátor',
          description: 'Használd egyszerű kalkulátorunkat a szükséges homokviasz mennyiség becsléséhez:',
          diameter: 'Tartály átmérője (cm):',
          height: 'Tartály magassága (cm):',
          calculate: 'Számítás',
          result: 'Körülbelül {amount} gramm homokviaszra lesz szükséged.',
          note: 'Ez egy becslés. A pontos mennyiség a tartály formájától függően változhat.'
        },
        guide: {
          title: 'Gyors Útmutató',
          small: {
            title: 'Kis Tartályok',
            description: '5-8 cm átmérőjű és 5-10 cm magasságú tartályokhoz:',
            amount: '100-150 gramm homokviasz',
            recommendation: 'Ajánlás: Essenza Csomag (150g)'
          },
          medium: {
            title: 'Közepes Tartályok',
            description: '8-12 cm átmérőjű és 10-15 cm magasságú tartályokhoz:',
            amount: '200-300 gramm homokviasz',
            recommendation: 'Ajánlás: Splendore Csomag (250g)'
          },
          large: {
            title: 'Nagy Tartályok',
            description: '12-15 cm átmérőjű és 15-20 cm magasságú tartályokhoz:',
            amount: '400-600 gramm homokviasz',
            recommendation: 'Ajánlás: Granule Box (750g)'
          },
          events: {
            title: 'Események',
            description: 'Események dekorálásához (15-20 közepes tartály):',
            amount: '3-5 kg homokviasz',
            recommendation: 'Ajánlás: 4.5 kg homokviasz eseményekhez'
          }
        },
        tips: {
          title: 'Tippek az Optimális Használathoz',
          items: [
            'Hagyj körülbelül 1-2 cm szabad helyet a tartály tetején',
            'Az egyenletes égéshez győződj meg róla, hogy a kanóc középen van',
            'Válaszd a kanóc vastagságát a tartály átmérőjének megfelelően',
            'Szélesebb tartályokhoz használhatsz több kanócot az egyenletes égéshez',
            'A homokviasz újrahasználható - egyszerűen adj hozzá új gyöngyöket, amikor a szint csökken'
          ]
        },
        conclusion: 'Ha további kérdéseid vannak a specifikus igényeidhez megfelelő mennyiségről, ne habozz kapcsolatba lépni velünk. Itt vagyunk, hogy segítsünk a legjobb élményt nyújtani az Atomra gyertyákkal.'
      };
    } else {
      return {
        title: 'How Much Atomra Do I Need?',
        subtitle: 'Guide to determining the right amount of sand wax for your containers',
        intro: 'One of the most common questions we receive is "How much sand wax do I need for my container?". We\'ve created this guide to help you determine the right amount for any container.',
        calculator: {
          title: 'Wax Calculator',
          description: 'Use our simple calculator to estimate the amount of sand wax needed:',
          diameter: 'Container diameter (cm):',
          height: 'Container height (cm):',
          calculate: 'Calculate',
          result: 'You will need approximately {amount} grams of sand wax.',
          note: 'This is an estimate. The exact amount may vary depending on the shape of the container.'
        },
        guide: {
          title: 'Quick Guide',
          small: {
            title: 'Small Containers',
            description: 'For containers with 5-8 cm diameter and 5-10 cm height:',
            amount: '100-150 grams of sand wax',
            recommendation: 'Recommendation: Essenza Package (150g)'
          },
          medium: {
            title: 'Medium Containers',
            description: 'For containers with 8-12 cm diameter and 10-15 cm height:',
            amount: '200-300 grams of sand wax',
            recommendation: 'Recommendation: Splendore Package (250g)'
          },
          large: {
            title: 'Large Containers',
            description: 'For containers with 12-15 cm diameter and 15-20 cm height:',
            amount: '400-600 grams of sand wax',
            recommendation: 'Recommendation: Granule Box (750g)'
          },
          events: {
            title: 'Events',
            description: 'For event decoration (15-20 medium containers):',
            amount: '3-5 kg of sand wax',
            recommendation: 'Recommendation: 4.5 kg sand wax for events'
          }
        },
        tips: {
          title: 'Tips for Optimal Use',
          items: [
            'Leave approximately 1-2 cm of free space at the top of the container',
            'For even burning, make sure the wick is centered',
            'Choose the wick thickness according to the container diameter',
            'For wider containers, you can use multiple wicks for even burning',
            'Sand wax can be reused - simply add new pearls when the level drops'
          ]
        },
        conclusion: 'If you have additional questions about the right amount for your specific needs, don\'t hesitate to contact us. We\'re here to help you get the best experience with Atomra candles.'
      };
    }
  };

  const content = getContent();

  // State for calculator
  const [diameter, setDiameter] = React.useState(10);
  const [height, setHeight] = React.useState(12);
  const [result, setResult] = React.useState(0);
  const [showResult, setShowResult] = React.useState(false);

  const calculateWax = () => {
    // Simple formula: π × r² × h × density factor
    // Density factor for sand wax is approximately 0.8 g/cm³
    const radius = diameter / 2;
    const volume = Math.PI * radius * radius * height;
    const waxAmount = Math.round(volume * 0.8);
    setResult(waxAmount);
    setShowResult(true);
  };

  return (
    <>
      <SEOHead
        title={getPageTitle()}
        description="Află exact cât de multă ceară de nisip Atomra ai nevoie pentru recipientele tale. Ghid complet cu calculator și recomandări pentru toate dimensiunile."
        keywords="ceară de nisip, cantitate ceară, calculator ceară, lumânări, recipiente, ghid ceară"
        url="https://atomra-home-romania.com/how-much"
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
              
              {/* Calculator */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="luxury-card p-8 rounded-lg mb-12"
              >
                <h2 className="text-2xl font-light text-slate-900 mb-6 text-center">{content.calculator.title}</h2>
                <p className="text-slate-600 font-light mb-6 text-center">{content.calculator.description}</p>
                
                <div className="max-w-md mx-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-light text-slate-700 mb-2">
                        {content.calculator.diameter}
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="30"
                        value={diameter}
                        onChange={(e) => setDiameter(parseInt(e.target.value) || 0)}
                        className="w-full px-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 text-sm font-light"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-light text-slate-700 mb-2">
                        {content.calculator.height}
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="30"
                        value={height}
                        onChange={(e) => setHeight(parseInt(e.target.value) || 0)}
                        className="w-full px-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 text-sm font-light"
                      />
                    </div>
                  </div>
                  
                  <button
                    onClick={calculateWax}
                    className="w-full bg-slate-900 text-white py-3 font-light tracking-wide uppercase hover:bg-slate-800 transition-colors duration-300 rounded"
                  >
                    {content.calculator.calculate}
                  </button>
                  
                  {showResult && (
                    <div className="mt-6 p-4 bg-slate-50 rounded-lg text-center">
                      <p className="text-slate-900 font-light">
                        {content.calculator.result.replace('{amount}', result.toString())}
                      </p>
                      <p className="text-xs text-slate-500 mt-2">
                        {content.calculator.note}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
              
              {/* Quick Guide */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-light text-slate-900 mb-8 text-center">{content.guide.title}</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Small Containers */}
                  <div className="luxury-card p-6 rounded-lg">
                    <h3 className="text-lg font-light text-slate-900 mb-3">{content.guide.small.title}</h3>
                    <p className="text-slate-600 font-light mb-2">{content.guide.small.description}</p>
                    <p className="text-slate-900 font-medium mb-3">{content.guide.small.amount}</p>
                    <p className="text-sm text-slate-500">{content.guide.small.recommendation}</p>
                  </div>
                  
                  {/* Medium Containers */}
                  <div className="luxury-card p-6 rounded-lg">
                    <h3 className="text-lg font-light text-slate-900 mb-3">{content.guide.medium.title}</h3>
                    <p className="text-slate-600 font-light mb-2">{content.guide.medium.description}</p>
                    <p className="text-slate-900 font-medium mb-3">{content.guide.medium.amount}</p>
                    <p className="text-sm text-slate-500">{content.guide.medium.recommendation}</p>
                  </div>
                  
                  {/* Large Containers */}
                  <div className="luxury-card p-6 rounded-lg">
                    <h3 className="text-lg font-light text-slate-900 mb-3">{content.guide.large.title}</h3>
                    <p className="text-slate-600 font-light mb-2">{content.guide.large.description}</p>
                    <p className="text-slate-900 font-medium mb-3">{content.guide.large.amount}</p>
                    <p className="text-sm text-slate-500">{content.guide.large.recommendation}</p>
                  </div>
                  
                  {/* Events */}
                  <div className="luxury-card p-6 rounded-lg">
                    <h3 className="text-lg font-light text-slate-900 mb-3">{content.guide.events.title}</h3>
                    <p className="text-slate-600 font-light mb-2">{content.guide.events.description}</p>
                    <p className="text-slate-900 font-medium mb-3">{content.guide.events.amount}</p>
                    <p className="text-sm text-slate-500">{content.guide.events.recommendation}</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Tips */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
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
                transition={{ duration: 0.5, delay: 0.8 }}
                className="text-center"
              >
                <p className="text-lg text-slate-600 font-light max-w-3xl mx-auto">
                  {content.conclusion}
                </p>
                
                <div className="mt-8">
                  <Link
                    to="/contact"
                    className="inline-block bg-slate-900 text-white px-8 py-3 font-light tracking-wide uppercase hover:bg-slate-800 transition-colors duration-300 rounded"
                  >
                    {language === 'ro' ? 'Contactează-ne' : 
                     language === 'hu' ? 'Kapcsolat' : 
                     'Contact Us'}
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default HowMuchPage;
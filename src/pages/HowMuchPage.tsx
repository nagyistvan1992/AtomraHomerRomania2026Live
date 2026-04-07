import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calculator, Package, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SEOHead from '../components/SEOHead';
import { getSiteUrl } from '../utils/siteConfig';

const HowMuchPage = () => {
  const { language } = useLanguage();
  const [diameter, setDiameter] = useState(10);
  const [height, setHeight] = useState(12);
  const [result, setResult] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const content = {
    ro: {
      seoTitle: 'Cat de multa Atomra am nevoie? | Atomra Home Romania',
      seoDescription:
        'Calculeaza cantitatea potrivita de ceara perlata Atomra pentru orice recipient si foloseste ghidul nostru rapid pentru acasa sau evenimente.',
      seoKeywords:
        'cat de multa ceara am nevoie, calculator lumanare, ceara perlata, ceara vegetala, Atomra',
      title: 'Cat de multa Atomra am nevoie?',
      subtitle:
        'Un ghid simplu pentru a estima cantitatea de perle de ceara necesara in functie de dimensiunea recipientului.',
      intro:
        'Daca folosesti pentru prima data sistemul nostru refillable, aceasta pagina te ajuta sa alegi cantitatea potrivita fara risipa si fara sa ramai fara material in mijlocul unui decor.',
      calculatorTitle: 'Calculator rapid',
      calculatorText:
        'Introdu diametrul si inaltimea recipientului, iar noi iti oferim o estimare orientativa in grame.',
      diameterLabel: 'Diametrul recipientului (cm)',
      heightLabel: 'Inaltimea utila (cm)',
      calculate: 'Calculeaza',
      result: 'Ai nevoie de aproximativ {amount} g de perle de ceara.',
      note:
        'Rezultatul este orientativ. Forma recipientului, numarul de fitiluri si spatiul liber lasat in partea de sus pot schimba usor cantitatea finala.',
      guideTitle: 'Repere rapide',
      guide: [
        {
          title: 'Recipient mic',
          size: '5-8 cm diametru, 5-10 cm inaltime',
          amount: '100-150 g',
          recommendation: 'Ideal pentru testare, cadouri mici sau colturi intime.',
        },
        {
          title: 'Recipient mediu',
          size: '8-12 cm diametru, 10-15 cm inaltime',
          amount: '200-300 g',
          recommendation: 'Potrivit pentru living, dormitor sau decor zilnic.',
        },
        {
          title: 'Recipient mare',
          size: '12-15 cm diametru, 15-20 cm inaltime',
          amount: '400-600 g',
          recommendation: 'Bun pentru centre de masa si piese statement.',
        },
        {
          title: 'Evenimente',
          size: '15-20 recipiente medii',
          amount: '3-5 kg',
          recommendation: 'Alege pachete mari pentru nunti, candy bar sau decor de sala.',
        },
      ],
      tipsTitle: 'Sfaturi utile',
      tips: [
        'Lasa intotdeauna 1-2 cm liberi in partea superioara a vasului.',
        'Centreaza fitilul pentru o ardere stabila si un aspect curat.',
        'La recipiente late, foloseste doua sau mai multe fitiluri daca este nevoie.',
        'Completeaza usor stratul superior dupa fiecare utilizare pentru un aspect proaspat.',
        'Daca pregatesti un eveniment, testeaza dinainte un recipient de proba cu aceeasi dimensiune.',
      ],
      ctaText:
        'Daca vrei ajutor pentru un decor mai mare sau pentru o selectie de produse compatibile, scrie-ne si iti recomandam cantitatile potrivite.',
      ctaPrimary: 'Vezi produsele',
      ctaSecondary: 'Cere recomandare',
    },
    hu: {
      seoTitle: 'Mennyi Atomra kell? | Atomra Home Romania',
      seoDescription:
        'Szamold ki, mennyi Atomra viaszgyongyre van szukseged a tartalyodhoz, es hasznald gyors utmutatonkat otthonra vagy esemenyekhez.',
      seoKeywords:
        'mennyi viasz kell, gyertya kalkulator, viaszgyongy, novenyi viasz, Atomra',
      title: 'Mennyi Atomra kell?',
      subtitle:
        'Egyszeru utmutato a megfelelo viaszgyongy mennyiseg becslesehez a tartaly merete alapjan.',
      intro:
        'Ha eloszor hasznalod ujratoltheto rendszerunket, ez az oldal segit jol kalkulalni, hogy ne pazarolj, de eleg anyagod legyen a vegso dekorhoz.',
      calculatorTitle: 'Gyors kalkulator',
      calculatorText:
        'Add meg a tartaly atmerojat es hasznos magassagat, mi pedig adunk egy iranyado gramm erteket.',
      diameterLabel: 'Tartaly atmero (cm)',
      heightLabel: 'Hasznos magassag (cm)',
      calculate: 'Szamolas',
      result: 'Korulbelul {amount} g viaszgyongyre lesz szukseged.',
      note:
        'Ez egy becsles. A tartaly formaja, a kanocok szama es a felul hagyott hely kicsit modosithatja a vegso mennyiseget.',
      guideTitle: 'Gyors tajekoztato',
      guide: [
        {
          title: 'Kis tartaly',
          size: '5-8 cm atmero, 5-10 cm magassag',
          amount: '100-150 g',
          recommendation: 'Tokeletes kiprobalashoz, kisebb ajandekokhoz vagy intim sarkokhoz.',
        },
        {
          title: 'Kozepes tartaly',
          size: '8-12 cm atmero, 10-15 cm magassag',
          amount: '200-300 g',
          recommendation: 'Nappaliba, haloszobaba vagy napi dekorhoz idealis.',
        },
        {
          title: 'Nagy tartaly',
          size: '12-15 cm atmero, 15-20 cm magassag',
          amount: '400-600 g',
          recommendation: 'Kivalo kozepponti dekorokhoz es hangsulyos darabokhoz.',
        },
        {
          title: 'Esemenyek',
          size: '15-20 kozepes tartaly',
          amount: '3-5 kg',
          recommendation: 'Eskuvokhoz es nagyobb enteriorokhoz erdemes nagy kiszerelest valasztani.',
        },
      ],
      tipsTitle: 'Hasznos tippek',
      tips: [
        'Mindig hagyj 1-2 cm helyet a tartaly tetejen.',
        'Kozepre helyezett kanoccal egyenletesebb lesz az eges.',
        'Szelesebb edenyeknel szukseg lehet ket vagy tobb kanocra.',
        'Hasznalat utan frissitsd a felso reteget a szebb vegeredmenyert.',
        'Nagyobb dekorhoz eloszor keszits egy probaedennyel mintat.',
      ],
      ctaText:
        'Ha nagyobb dekorhoz vagy komplett osszeallitasra szeretnel mennyisegi ajanlast, irj nekunk, es segitunk.',
      ctaPrimary: 'Termekek megnezese',
      ctaSecondary: 'Ajanlast kerek',
    },
    en: {
      seoTitle: 'How Much Atomra Do I Need? | Atomra Home Romania',
      seoDescription:
        'Estimate the right amount of Atomra wax pearls for your vessel with our simple calculator and quick planning guide.',
      seoKeywords:
        'how much candle wax do i need, wax pearl calculator, refillable candle guide, Atomra',
      title: 'How Much Atomra Do I Need?',
      subtitle:
        'A simple guide to estimate the right amount of wax pearls based on your vessel size.',
      intro:
        'If you are new to our refillable candle system, this page helps you plan with confidence so you do not overbuy or run short while styling your space.',
      calculatorTitle: 'Quick calculator',
      calculatorText:
        'Enter your vessel diameter and useful height and we will give you an estimated amount in grams.',
      diameterLabel: 'Container diameter (cm)',
      heightLabel: 'Useful height (cm)',
      calculate: 'Calculate',
      result: 'You will need approximately {amount} g of wax pearls.',
      note:
        'This is an estimate. Vessel shape, wick count, and the free space left on top can slightly change the final quantity.',
      guideTitle: 'Quick reference',
      guide: [
        {
          title: 'Small vessel',
          size: '5-8 cm diameter, 5-10 cm height',
          amount: '100-150 g',
          recommendation: 'Great for first tests, small gifts, or cozy corners.',
        },
        {
          title: 'Medium vessel',
          size: '8-12 cm diameter, 10-15 cm height',
          amount: '200-300 g',
          recommendation: 'Ideal for living rooms, bedrooms, and daily styling.',
        },
        {
          title: 'Large vessel',
          size: '12-15 cm diameter, 15-20 cm height',
          amount: '400-600 g',
          recommendation: 'Best for centerpieces and larger statement pieces.',
        },
        {
          title: 'Events',
          size: '15-20 medium vessels',
          amount: '3-5 kg',
          recommendation: 'Choose larger packs for weddings and event layouts.',
        },
      ],
      tipsTitle: 'Helpful tips',
      tips: [
        'Always leave 1-2 cm of free space at the top of the vessel.',
        'Keep the wick centered for a cleaner and steadier burn.',
        'Use two or more wicks for wider containers when needed.',
        'Refresh the top layer after each use for a cleaner finish.',
        'For events, test one sample container first before scaling up.',
      ],
      ctaText:
        'If you need help planning a larger setup or choosing the right combination of products, send us a message and we will guide you.',
      ctaPrimary: 'Browse products',
      ctaSecondary: 'Ask for advice',
    },
  }[language];

  const calculateWax = () => {
    const radius = diameter / 2;
    const volume = Math.PI * radius * radius * height;
    const waxAmount = Math.round(volume * 0.8);
    setResult(waxAmount);
    setShowResult(true);
  };

  return (
    <>
      <SEOHead
        title={content.seoTitle}
        description={content.seoDescription}
        keywords={content.seoKeywords}
        url={getSiteUrl('/how-much')}
      />

      <div className="luxury-page-bg luxury-floating-elements min-h-screen">
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-32 left-16 h-1 w-1 rounded-full bg-slate-300/20 animate-luxury-float" />
          <div
            className="absolute top-48 right-24 h-0.5 w-0.5 rounded-full bg-slate-200/30 animate-luxury-float"
            style={{ animationDelay: '2s' }}
          />
          <div
            className="absolute bottom-32 left-1/4 h-0.5 w-0.5 rounded-full bg-slate-300/25 animate-luxury-float"
            style={{ animationDelay: '4s' }}
          />
          <div
            className="absolute bottom-48 right-1/4 h-1 w-1 rounded-full bg-slate-200/20 animate-luxury-float"
            style={{ animationDelay: '1s' }}
          />
        </div>

        <div className="relative z-10 pt-32 sm:pt-36 md:pt-40 lg:pt-44">
          <section className="luxury-section-light py-6 sm:py-8">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6 text-4xl font-extralight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
              >
                {content.title}
              </motion.h1>
              <div className="mx-auto mb-6 h-px w-16 bg-slate-300" />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="mx-auto max-w-4xl text-lg font-light leading-relaxed text-slate-600"
              >
                {content.subtitle}
              </motion.p>
            </div>
          </section>

          <section className="luxury-section-dark py-16 sm:py-20">
            <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="luxury-card mb-10 rounded-lg p-8 text-center lg:p-12"
              >
                <p className="mx-auto max-w-4xl text-lg font-light leading-relaxed text-slate-600">
                  {content.intro}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="luxury-card mb-10 rounded-lg p-8 lg:p-10"
              >
                <div className="mb-6 flex items-center justify-center gap-3">
                  <Calculator size={22} strokeWidth={1.5} className="text-slate-700" />
                  <h2 className="text-2xl font-light text-slate-900">{content.calculatorTitle}</h2>
                </div>
                <p className="mx-auto mb-8 max-w-2xl text-center font-light text-slate-600">
                  {content.calculatorText}
                </p>

                <div className="mx-auto max-w-xl">
                  <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-light text-slate-700">
                        {content.diameterLabel}
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="40"
                        value={diameter}
                        onChange={(event) => setDiameter(Number(event.target.value) || 0)}
                        className="w-full rounded-md border border-slate-200 px-4 py-3 text-sm font-light focus:outline-none focus:ring-1 focus:ring-slate-400"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-light text-slate-700">
                        {content.heightLabel}
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="40"
                        value={height}
                        onChange={(event) => setHeight(Number(event.target.value) || 0)}
                        className="w-full rounded-md border border-slate-200 px-4 py-3 text-sm font-light focus:outline-none focus:ring-1 focus:ring-slate-400"
                      />
                    </div>
                  </div>

                  <button
                    onClick={calculateWax}
                    className="w-full rounded bg-slate-900 py-3 text-sm font-light uppercase tracking-wide text-white transition-colors duration-300 hover:bg-slate-800"
                  >
                    {content.calculate}
                  </button>

                  {showResult && (
                    <div className="mt-6 rounded-lg bg-slate-50 p-5 text-center">
                      <p className="text-slate-900">
                        {content.result.replace('{amount}', result.toString())}
                      </p>
                      <p className="mt-2 text-xs text-slate-500">{content.note}</p>
                    </div>
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mb-10"
              >
                <div className="mb-8 flex items-center justify-center gap-3">
                  <Package size={22} strokeWidth={1.5} className="text-slate-700" />
                  <h2 className="text-2xl font-light text-slate-900">{content.guideTitle}</h2>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {content.guide.map((item) => (
                    <div key={item.title} className="luxury-card rounded-lg p-6">
                      <h3 className="mb-2 text-lg font-light text-slate-900">{item.title}</h3>
                      <p className="mb-3 text-sm font-light text-slate-500">{item.size}</p>
                      <p className="mb-3 text-xl font-medium text-slate-900">{item.amount}</p>
                      <p className="font-light leading-relaxed text-slate-600">{item.recommendation}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="luxury-card mb-10 rounded-lg p-8 lg:p-10"
              >
                <div className="mb-6 flex items-center justify-center gap-3">
                  <Sparkles size={22} strokeWidth={1.5} className="text-slate-700" />
                  <h2 className="text-2xl font-light text-slate-900">{content.tipsTitle}</h2>
                </div>
                <ul className="mx-auto max-w-3xl space-y-4">
                  {content.tips.map((tip) => (
                    <li key={tip} className="flex items-start">
                      <div className="mr-4 mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100">
                        <div className="h-2 w-2 rounded-full bg-slate-600" />
                      </div>
                      <span className="font-light text-slate-600">{tip}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-center"
              >
                <p className="mx-auto mb-6 max-w-3xl text-lg font-light leading-relaxed text-slate-600">
                  {content.ctaText}
                </p>
                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <Link
                    to="/all-products"
                    className="rounded bg-slate-900 px-6 py-3 text-sm font-light uppercase tracking-wide text-white transition-colors duration-300 hover:bg-slate-800"
                  >
                    {content.ctaPrimary}
                  </Link>
                  <Link
                    to="/contact"
                    className="rounded border border-slate-300 px-6 py-3 text-sm font-light uppercase tracking-wide text-slate-700 transition-colors duration-300 hover:border-slate-400 hover:text-slate-900"
                  >
                    {content.ctaSecondary}
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

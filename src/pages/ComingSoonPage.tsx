import { useEffect } from 'react';
import { ArrowLeft, Bell, CalendarDays, Gift, Leaf, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import SEOHead from '../components/SEOHead';
import { getSiteUrl } from '../utils/siteConfig';

const ComingSoonPage = () => {
  const { language } = useLanguage();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const content = {
    ro: {
      title: 'In curand',
      subtitle:
        'Pregatim lansari noi pentru casa, cadouri si colectii sezoniere construite in jurul aceluiasi ritual calm si elegant Atomra.',
      description:
        'Lucram la produse noi, seturi curatoriate si idei de cadou care sa completeze colectia actuala de perle de ceara, recipiente si accesorii.',
      back: 'Inapoi acasa',
      upcomingTitle: 'Ce urmeaza',
      upcomingItems: [
        {
          title: 'Editii sezoniere',
          text: 'Colectii gandite pentru sarbatori, seri de vara si decoruri intime de sezon.',
          icon: CalendarDays,
        },
        {
          title: 'Seturi de cadou',
          text: 'Pachete gata de oferit, cu selectie de perle, fitiluri si recipiente elegante.',
          icon: Gift,
        },
        {
          title: 'Accente naturale',
          text: 'Piese inspirate din materiale simple, texturi curate si parfumuri echilibrate.',
          icon: Leaf,
        },
      ],
      promiseTitle: 'Promisiunea noastra',
      promise:
        'Indiferent de colectie, pastram aceleasi principii: ingrediente atent selectate, design calm, reutilizare usoara si o experienta care sa ramana frumoasa si dupa prima ardere.',
      ctaTitle: 'Vrei sa afli primul?',
      ctaText:
        'Pana la lansare, poti explora colectiile existente sau ne poti scrie daca ai nevoie de recomandari pentru casa ori evenimente.',
      shopCta: 'Vezi colectiile',
      contactCta: 'Contacteaza-ne',
      seoTitle: 'In curand | Atomra Home Romania',
      seoDescription:
        'Afla ce pregateste Atomra Home Romania: colectii noi, seturi de cadou si lansari sezoniere pentru decoruri elegante si reutilizabile.',
      seoKeywords:
        'in curand, colectii noi, lumanari reutilizabile, ceara vegetala, decor elegant, cadouri Atomra',
    },
    hu: {
      title: 'Hamarosan',
      subtitle:
        'Uj otthoni kollekciokat, ajandekcsomagokat es szezonalis megjeleneseket keszitunk ugyanazzal a letisztult Atomra hangulattal.',
      description:
        'Uj termekeken, curated szetteken es ajandekotleteken dolgozunk, amelyek jol kiegeszitik a jelenlegi gyongyviasszal, tartokkal es kiegeszitokkel epulo vilagot.',
      back: 'Vissza a fooldalra',
      upcomingTitle: 'Mi kovetkezik',
      upcomingItems: [
        {
          title: 'Szezonalis kiadasok',
          text: 'Kollekciok unnepekre, nyari estekre es meghitt szezonalis enteriorokhoz.',
          icon: CalendarDays,
        },
        {
          title: 'Ajandek szettek',
          text: 'Atgondolt csomagok viaszgyongyokkel, kanocokkal es elegans tartokkal.',
          icon: Gift,
        },
        {
          title: 'Termeszetes reszletek',
          text: 'Egyszeru anyagok, tiszta texturak es finoman kiegyensulyozott hangulatok.',
          icon: Leaf,
        },
      ],
      promiseTitle: 'Amit megigerunk',
      promise:
        'Barmelyik uj kollekcio is erkezzen, ugyanazokat az alapokat tartjuk meg: gondosan valogatott alapanyagok, nyugodt design, konnyu ujratoltes es tartos elmeny.',
      ctaTitle: 'Szeretnel elsokent ertesulni?',
      ctaText:
        'A megjelenesig nezd meg aktualis kollekcioinkat, vagy irj nekunk, ha otthoni vagy esemenyes ajanlasra van szukseged.',
      shopCta: 'Kollekciok megnezese',
      contactCta: 'Kapcsolat',
      seoTitle: 'Hamarosan | Atomra Home Romania',
      seoDescription:
        'Nezd meg, min dolgozik az Atomra Home Romania: uj kollekciok, ajandekszettek es szezonalis megjelenesek elegans, ujratoltheto gyertyavilaghoz.',
      seoKeywords:
        'hamarosan, uj kollekcio, ujratoltheto gyertya, novenyi viasz, elegans dekor, Atomra',
    },
    en: {
      title: 'Coming Soon',
      subtitle:
        'We are preparing new home pieces, gift bundles, and seasonal releases built around the same calm and elegant Atomra ritual.',
      description:
        'Our next launch brings fresh product sets, gifting ideas, and styling pieces that expand the current range of wax pearls, vessels, and accessories.',
      back: 'Back to home',
      upcomingTitle: 'What is next',
      upcomingItems: [
        {
          title: 'Seasonal drops',
          text: 'Curated releases for holidays, summer evenings, and slower seasonal interiors.',
          icon: CalendarDays,
        },
        {
          title: 'Gift sets',
          text: 'Ready-to-offer bundles with pearls, wicks, and elegant vessels.',
          icon: Gift,
        },
        {
          title: 'Natural accents',
          text: 'Objects inspired by simple textures, balanced fragrance, and warm styling.',
          icon: Leaf,
        },
      ],
      promiseTitle: 'What stays the same',
      promise:
        'Every new collection keeps the same principles at the core: carefully selected ingredients, calm design, easy refillability, and a beautiful long-term experience.',
      ctaTitle: 'Want to be first to know?',
      ctaText:
        'Until the launch arrives, you can explore the current collections or contact us for tailored home and event recommendations.',
      shopCta: 'Browse collections',
      contactCta: 'Contact us',
      seoTitle: 'Coming Soon | Atomra Home Romania',
      seoDescription:
        'See what Atomra Home Romania is preparing next: new collections, gift sets, and seasonal launches for elegant refillable candle rituals.',
      seoKeywords:
        'coming soon, refillable candles, gift sets, vegetable wax, home decor, Atomra',
    },
  }[language];

  return (
    <>
      <SEOHead
        title={content.seoTitle}
        description={content.seoDescription}
        keywords={content.seoKeywords}
        url={getSiteUrl('/coming-soon')}
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
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
              <div className="mb-5 flex items-center">
                <Link
                  to="/"
                  className="group flex items-center gap-2 text-slate-600 transition-colors duration-200 hover:text-slate-800"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  <ArrowLeft size={18} strokeWidth={1.5} className="transition-transform duration-200 group-hover:-translate-x-1" />
                  <span className="font-light">{content.back}</span>
                </Link>
              </div>

              <div className="text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-100/60 backdrop-blur-sm"
                >
                  <Sparkles size={24} strokeWidth={1.5} className="text-slate-600" />
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="mb-6 text-4xl font-extralight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
                >
                  {content.title}
                </motion.h1>
                <div className="mx-auto mb-6 h-px w-16 bg-slate-300" />
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mx-auto max-w-4xl text-lg font-light leading-relaxed text-slate-600"
                >
                  {content.subtitle}
                </motion.p>
              </div>
            </div>
          </section>

          <section className="luxury-section-dark py-16 sm:py-20">
            <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="luxury-card mb-10 rounded-lg p-10 text-center lg:p-14"
              >
                <p className="mx-auto max-w-4xl text-lg font-light leading-relaxed text-slate-600">
                  {content.description}
                </p>
              </motion.div>

              <h2 className="mb-8 text-center text-2xl font-light text-slate-900">{content.upcomingTitle}</h2>
              <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
                {content.upcomingItems.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.25 + index * 0.1 }}
                      className="luxury-card rounded-lg p-8 text-center"
                    >
                      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-white/80 shadow-sm">
                        <Icon size={22} strokeWidth={1.5} className="text-slate-700" />
                      </div>
                      <h3 className="mb-3 text-xl font-light text-slate-900">{item.title}</h3>
                      <p className="font-light leading-relaxed text-slate-600">{item.text}</p>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.55 }}
                className="luxury-card mb-10 rounded-lg p-8 lg:p-12"
              >
                <h2 className="mb-4 text-center text-2xl font-light text-slate-900">{content.promiseTitle}</h2>
                <p className="mx-auto max-w-4xl text-center font-light leading-relaxed text-slate-600">
                  {content.promise}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.65 }}
                className="rounded-lg border border-slate-200 bg-slate-50 p-8 text-center"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
                  <Bell size={20} strokeWidth={1.5} className="text-slate-700" />
                </div>
                <h2 className="mb-3 text-2xl font-light text-slate-900">{content.ctaTitle}</h2>
                <p className="mx-auto mb-6 max-w-3xl font-light leading-relaxed text-slate-600">
                  {content.ctaText}
                </p>
                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <Link
                    to="/all-products"
                    className="rounded bg-slate-900 px-6 py-3 text-sm font-light uppercase tracking-wide text-white transition-colors duration-300 hover:bg-slate-800"
                  >
                    {content.shopCta}
                  </Link>
                  <Link
                    to="/contact"
                    className="rounded border border-slate-300 px-6 py-3 text-sm font-light uppercase tracking-wide text-slate-700 transition-colors duration-300 hover:border-slate-400 hover:text-slate-900"
                  >
                    {content.contactCta}
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

export default ComingSoonPage;

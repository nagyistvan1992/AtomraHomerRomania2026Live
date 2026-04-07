import { ArrowRight, Gift, Home, Sparkles, Star, Wand2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const StorefrontOverview = () => {
  const { language } = useLanguage();

  const content = {
    ro: {
      eyebrow: 'Ce găsești aici',
      title: 'Lumânări refillable și decor elegant, explicate simplu din primul ecran.',
      description:
        'Atomra Home România este un magazin de lumânări refillable cu ceară naturală, perle de ceară și accesorii premium pentru acasă, cadouri și evenimente. Alegi colecția, vezi produsul, apoi comanzi rapid.',
      proofPoints: [
        'ceară naturală și estetică premium',
        'produse pentru acasă, cadouri și mese festive',
        'sistem ușor de reumplut și reutilizat',
      ],
      primaryCta: 'Vezi toate produsele',
      secondaryCta: 'Cum funcționează',
      sections: [
        {
          icon: Home,
          title: 'Pentru acasă',
          description: 'Lumânări și seturi pentru living, dining, dormitor și colțuri cozy.',
          href: '/home-collection',
          cta: 'Explorează colecția',
        },
        {
          icon: Sparkles,
          title: 'Pentru evenimente',
          description: 'Soluții elegante pentru nunți, mese festive și decor cu impact vizual.',
          href: '/events-collection',
          cta: 'Vezi opțiunile',
        },
        {
          icon: Gift,
          title: 'Accesorii și completări',
          description: 'Fitile, piese utile și detalii care fac experiența mai simplă și mai frumoasă.',
          href: '/accesorii',
          cta: 'Descoperă accesoriile',
        },
      ],
    },
    hu: {
      eyebrow: 'Mit találsz itt',
      title: 'Újratölthető gyertyák és elegáns dekor, első pillantásra érthetően.',
      description:
        'Az Atomra Home România újratölthető, természetes viaszos gyertyákat, viaszgyöngyöket és prémium kiegészítőket kínál otthonra, ajándékba és eseményekre. Kiválasztod a kollekciót, megnézed a terméket, majd gyorsan rendelsz.',
      proofPoints: [
        'természetes viasz és prémium megjelenés',
        'termékek otthonra, ajándékba és ünnepi asztalokhoz',
        'könnyen újratölthető és újrahasználható rendszer',
      ],
      primaryCta: 'Összes termék',
      secondaryCta: 'Hogyan működik',
      sections: [
        {
          icon: Home,
          title: 'Otthonra',
          description: 'Gyertyák és szettek nappaliba, étkezőbe, hálóba és hangulatos sarkokba.',
          href: '/home-collection',
          cta: 'Kollekció megnyitása',
        },
        {
          icon: Sparkles,
          title: 'Eseményekre',
          description: 'Elegáns megoldások esküvőkre, ünnepi asztalokra és látványos dekorhoz.',
          href: '/events-collection',
          cta: 'Lehetőségek megtekintése',
        },
        {
          icon: Gift,
          title: 'Kiegészítők',
          description: 'Kanócok és hasznos részletek, hogy az élmény egyszerűbb és szebb legyen.',
          href: '/accesorii',
          cta: 'Kiegészítők felfedezése',
        },
      ],
    },
    en: {
      eyebrow: 'What you will find here',
      title: 'Refillable candles and elegant decor, made clear from the first screen.',
      description:
        'Atomra Home Romania is a refillable candle store built around natural wax, wax pearls, and premium accessories for home styling, gifting, and events. Choose a collection, open a product, and order with confidence.',
      proofPoints: [
        'natural wax and premium styling',
        'products for home, gifting, and event tables',
        'an easy refillable and reusable system',
      ],
      primaryCta: 'View all products',
      secondaryCta: 'How it works',
      sections: [
        {
          icon: Home,
          title: 'For home',
          description: 'Candles and curated sets for living spaces, dining tables, bedrooms, and cozy corners.',
          href: '/home-collection',
          cta: 'Explore the collection',
        },
        {
          icon: Sparkles,
          title: 'For events',
          description: 'Elegant options for weddings, festive tables, and statement decor moments.',
          href: '/events-collection',
          cta: 'See the options',
        },
        {
          icon: Gift,
          title: 'Accessories',
          description: 'Wicks and useful finishing pieces that make the experience smoother and more beautiful.',
          href: '/accesorii',
          cta: 'Browse accessories',
        },
      ],
    },
  }[language];

  return (
    <section className="luxury-section-light py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-500">
              <Wand2 size={14} strokeWidth={1.6} />
              <span>{content.eyebrow}</span>
            </div>

            <h2 className="max-w-3xl text-3xl font-extralight leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              {content.title}
            </h2>

            <p className="mt-5 max-w-3xl text-base font-light leading-8 text-slate-600 sm:text-lg">
              {content.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {content.proofPoints.map((point) => (
                <div
                  key={point}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-light text-slate-700 shadow-sm ring-1 ring-slate-200/70"
                >
                  <Star size={14} strokeWidth={1.6} className="text-amber-500" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/toate-produsele"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                {content.primaryCta}
              </Link>
              <Link
                to="/instructions"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                {content.secondaryCta}
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {content.sections.map((section) => {
              const Icon = section.icon;

              return (
                <Link
                  key={section.href}
                  to={section.href}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition group-hover:bg-slate-900 group-hover:text-white">
                    <Icon size={22} strokeWidth={1.6} />
                  </div>
                  <h3 className="text-lg font-light text-slate-900">{section.title}</h3>
                  <p className="mt-2 text-sm font-light leading-7 text-slate-600">{section.description}</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-slate-900">
                    <span>{section.cta}</span>
                    <ArrowRight size={16} strokeWidth={1.8} className="transition group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorefrontOverview;

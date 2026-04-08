import { ArrowRight, Gift, Home, ShieldCheck, Sparkles, Star, Wand2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const StorefrontOverview = () => {
  const { language } = useLanguage();

  const content = {
    ro: {
      eyebrow: 'Ce gasesti aici',
      title: 'Lumanari refillable si decor premium, usor de inteles si usor de comandat.',
      description:
        'Atomra Home Romania te ajuta sa alegi rapid lumanari elegante pentru acasa, cadouri si evenimente. Intri pe colectia potrivita, vezi produsul si comanzi fara pasi complicati.',
      proofPoints: [
        'ceara naturala si aspect premium',
        'produse pentru acasa, cadouri si evenimente',
        'sistem reutilizabil, simplu de reumplut',
      ],
      primaryCta: 'Vezi produsele disponibile acum',
      secondaryCta: 'Afla cum functioneaza',
      helperBadge: 'Alegere rapida',
      helperTitle: 'Cum alegi mai repede',
      helperPoints: [
        'Pentru decor de zi cu zi, incepe cu Home Collection.',
        'Pentru nunta, botez sau mese festive, mergi direct la colectia de evenimente.',
        'Pentru o comanda rapida, deschide produsul dorit si adauga-l direct in cos.',
      ],
      sections: [
        {
          icon: Home,
          title: 'Pentru acasa',
          description: 'Seturi si lumanari pentru living, dining, dormitor si colturi cozy.',
          href: '/home-collection',
          cta: 'Vezi colectia pentru acasa',
        },
        {
          icon: Sparkles,
          title: 'Pentru evenimente',
          description: 'Decor elegant pentru nunti, mese festive si momente cu impact vizual.',
          href: '/events-collection',
          cta: 'Vezi decorul pentru evenimente',
        },
        {
          icon: Gift,
          title: 'Accesorii si completari',
          description: 'Fitile si detalii utile care completeaza experienta si usureaza reumplerea.',
          href: '/accesorii',
          cta: 'Vezi accesoriile disponibile',
        },
      ],
    },
    hu: {
      eyebrow: 'Mit talalsz itt',
      title: 'Ujratoltheto gyertyak es premium dekor, erthetoen es gyors rendelessel.',
      description:
        'Az Atomra Home Romania segit gyorsan valasztani elegans gyertyakat otthonra, ajandekba es esemenyekre. Kivalasztod a megfelelo kollekciot, megnezed a termeket, majd egyszeruen rendelsz.',
      proofPoints: [
        'termeszetes viasz es premium megjelenes',
        'termekek otthonra, ajandekba es esemenyekre',
        'ujratoltheto, ujrahasznalhato rendszer',
      ],
      primaryCta: 'Mutasd a most elerheto termekeket',
      secondaryCta: 'Igy mukodik',
      helperBadge: 'Gyors indulas',
      helperTitle: 'Hogyan valassz gyorsabban',
      helperPoints: [
        'Mindennapi otthoni hangulathoz kezdd a Home Collectionnel.',
        'Eskuvohoz vagy unnepi asztalhoz menj egybol az esemeny kollekciora.',
        'Gyors rendeleshez nyisd meg a megfelelo termeket es tedd kosarba.',
      ],
      sections: [
        {
          icon: Home,
          title: 'Otthonra',
          description: 'Gyertyak es szettek nappaliba, etkezobe, haloba es meghitt sarkokba.',
          href: '/home-collection',
          cta: 'Otthoni kollekcio megnyitasa',
        },
        {
          icon: Sparkles,
          title: 'Esemenyekre',
          description: 'Elegans dekor eskovokre, unnepi asztalokra es kulonleges alkalmakra.',
          href: '/events-collection',
          cta: 'Esemeny dekor megtekintese',
        },
        {
          icon: Gift,
          title: 'Kiegeszitok',
          description: 'Fitilek es hasznos reszletek a teljesebb es egyszerubb elmenyhez.',
          href: '/accesorii',
          cta: 'Kiegeszitok megtekintese',
        },
      ],
    },
    en: {
      eyebrow: 'What you will find here',
      title: 'Refillable candles and premium decor, presented clearly and built to convert.',
      description:
        'Atomra Home Romania helps shoppers quickly choose elegant candles for home styling, gifting, and events. Pick the right collection, open a product, and place an order without friction.',
      proofPoints: [
        'natural wax with premium styling',
        'products for home, gifting, and events',
        'reusable system that is easy to refill',
      ],
      primaryCta: 'Shop what is available now',
      secondaryCta: 'See how it works',
      helperBadge: 'Quick start',
      helperTitle: 'How to choose faster',
      helperPoints: [
        'For everyday home styling, begin with the Home Collection.',
        'For weddings or festive tables, go straight to the Events Collection.',
        'For the fastest order path, open a product and add it directly to cart.',
      ],
      sections: [
        {
          icon: Home,
          title: 'For home',
          description: 'Candles and curated sets for living spaces, dining tables, bedrooms, and cozy corners.',
          href: '/home-collection',
          cta: 'Shop home collection',
        },
        {
          icon: Sparkles,
          title: 'For events',
          description: 'Elegant decor options for weddings, festive tables, and statement moments.',
          href: '/events-collection',
          cta: 'See event decor',
        },
        {
          icon: Gift,
          title: 'Accessories',
          description: 'Wicks and practical finishing details that make the system easier to use.',
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

            <div className="mt-8 rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm ring-1 ring-slate-100">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white">
                <ShieldCheck size={14} strokeWidth={1.6} />
                <span>{content.helperBadge}</span>
              </div>
              <h3 className="text-lg font-light text-slate-900">{content.helperTitle}</h3>
              <div className="mt-4 space-y-3">
                {content.helperPoints.map((point) => (
                  <div key={point} className="flex items-start gap-3 text-sm leading-7 text-slate-600">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-500" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
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

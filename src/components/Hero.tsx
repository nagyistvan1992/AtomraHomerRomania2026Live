import React from 'react';
import { Link } from 'react-router-dom';
import { Gift, Home, RefreshCw, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getAssetPath } from '../utils/assetPath';

const Hero = () => {
  const { t, language } = useLanguage();

  const heroMeta = {
    ro: {
      eyebrow: 'Lumanari refillable premium pentru acasa, cadouri si evenimente',
      primaryCta: t('hero.cta'),
      trustItems: [
        { icon: Truck, label: 'Transport gratuit peste 149 Lei' },
        { icon: ShieldCheck, label: 'Checkout securizat' },
        { icon: RefreshCw, label: 'Produse reutilizabile' },
      ],
      visualLabel: 'Alege direct ce vrei sa descoperi',
      entryCards: [
        {
          icon: Home,
          title: 'Home Collection',
          description: 'Pentru living, dining si atmosfera de zi cu zi.',
          href: '/home-collection',
        },
        {
          icon: Sparkles,
          title: 'Evenimente',
          description: 'Decor elegant pentru nunti si mese festive.',
          href: '/events-collection',
        },
        {
          icon: Gift,
          title: 'Cadouri si accesorii',
          description: 'Detalii premium pentru un cadou sau un set complet.',
          href: '/accesorii',
        },
      ],
    },
    hu: {
      eyebrow: 'Premium ujratoltheto gyertyak otthonra, ajandekba es esemenyekre',
      primaryCta: t('hero.cta'),
      trustItems: [
        { icon: Truck, label: '149 lej felett ingyenes szallitas' },
        { icon: ShieldCheck, label: 'Biztonsagos checkout' },
        { icon: RefreshCw, label: 'Ujratoltheto termekek' },
      ],
      visualLabel: 'Valassz egy egyertelmu indulasi pontot',
      entryCards: [
        {
          icon: Home,
          title: 'Home Collection',
          description: 'Nappaliba, etkezobe es a mindennapi hangulathoz.',
          href: '/home-collection',
        },
        {
          icon: Sparkles,
          title: 'Esemenyek',
          description: 'Elegans dekor eskovokre es unnepi asztalokhoz.',
          href: '/events-collection',
        },
        {
          icon: Gift,
          title: 'Ajandekok es kiegeszitok',
          description: 'Premium reszletek ajandekhoz vagy teljes szetthez.',
          href: '/accesorii',
        },
      ],
    },
    en: {
      eyebrow: 'Premium refillable candles for home styling, gifting, and events',
      primaryCta: t('hero.cta'),
      trustItems: [
        { icon: Truck, label: 'Free shipping over 149 Lei' },
        { icon: ShieldCheck, label: 'Secure checkout' },
        { icon: RefreshCw, label: 'Reusable products' },
      ],
      visualLabel: 'Choose the clearest path into the shop',
      entryCards: [
        {
          icon: Home,
          title: 'Home Collection',
          description: 'For living spaces, dining tables, and everyday ambiance.',
          href: '/home-collection',
        },
        {
          icon: Sparkles,
          title: 'Events',
          description: 'Elegant decor for weddings and festive tables.',
          href: '/events-collection',
        },
        {
          icon: Gift,
          title: 'Gifts and accessories',
          description: 'Premium details for gifting or completing a set.',
          href: '/accesorii',
        },
      ],
    },
  }[language];

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pb-16 pt-32 sm:pb-20 sm:pt-36 md:pt-40 lg:pb-24 lg:pt-44">
      <div className="absolute inset-0 z-0">
        <img
          src={getAssetPath('/hero-desktop.webp')}
          srcSet={`${getAssetPath('/hero-mobile.webp')} 768w, ${getAssetPath('/hero-desktop.webp')} 1280w`}
          sizes="100vw"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          decoding="async"
          width={1280}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/30 to-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/25 via-transparent to-orange-900/20"></div>
        <div className="absolute inset-0">
          <div className="absolute left-1/4 top-1/3 h-96 w-96 rounded-full bg-gradient-radial from-amber-200/10 to-transparent blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 h-80 w-80 rounded-full bg-gradient-radial from-orange-200/8 to-transparent blur-3xl"></div>
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-gradient-radial from-yellow-200/5 to-transparent blur-3xl"></div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl px-4 text-center lg:px-8 xl:px-12">
        <div className="mx-auto mb-6 inline-flex max-w-3xl items-center justify-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-white/90 backdrop-blur-xl sm:mb-8 sm:px-5">
          {heroMeta.eyebrow}
        </div>

        <h1 className="text-4xl leading-[0.82] tracking-[-0.02em] text-white drop-shadow-2xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
          <span
            className="mb-4 block opacity-95 sm:mb-2 md:mb-1 lg:mb-0"
            style={{
              fontFamily: '"Playfair Display", "Times New Roman", serif',
              fontWeight: '300',
              letterSpacing: '-0.01em',
              textShadow: '0 4px 8px rgba(0,0,0,0.5)',
            }}
          >
            {t('hero.title1')}
          </span>
          <span
            className="mb-4 block opacity-90 sm:mb-2 md:mb-1 lg:mb-0"
            style={{
              fontFamily: '"Playfair Display", "Times New Roman", serif',
              fontWeight: '300',
              letterSpacing: '-0.01em',
              textShadow: '0 4px 8px rgba(0,0,0,0.5)',
            }}
          >
            {t('hero.title2')}
          </span>
          <span
            className="mb-6 block opacity-85 sm:mb-8 lg:mb-10"
            style={{
              fontFamily: '"Playfair Display", "Times New Roman", serif',
              fontWeight: '300',
              letterSpacing: '-0.01em',
              textShadow: '0 4px 8px rgba(0,0,0,0.5)',
            }}
          >
            {t('hero.title3')}
          </span>
        </h1>

        <p
          className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-white/90 drop-shadow-lg sm:mb-10 sm:text-lg lg:mb-12 lg:max-w-3xl lg:text-xl xl:text-2xl"
          style={{
            fontFamily: '"Inter", system-ui, sans-serif',
            fontWeight: '300',
            letterSpacing: '0.01em',
            textShadow: '0 2px 4px rgba(0,0,0,0.5)',
          }}
        >
          {t('hero.subtitle')}
        </p>

        <div className="mx-auto mb-8 flex max-w-5xl flex-wrap items-center justify-center gap-3 sm:mb-10">
          {heroMeta.trustItems.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/20 px-4 py-2 text-xs text-white/90 backdrop-blur-md sm:text-sm"
              >
                <Icon size={15} strokeWidth={1.7} />
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>

        <div className="relative z-20 mb-12 flex items-center justify-center lg:mb-14">
          <Link
            to="/toate-produsele"
            className="group relative inline-flex min-w-[260px] items-center justify-center overflow-hidden rounded-3xl border border-slate-300/20 bg-slate-800/25 px-10 py-5 text-sm uppercase tracking-[0.15em] text-slate-50 shadow-2xl backdrop-blur-2xl transition-all duration-700 hover:scale-[1.02] hover:bg-slate-700/35 focus:outline-none focus:ring-2 focus:ring-slate-300/40 focus:ring-offset-4 focus:ring-offset-slate-800/20 sm:min-w-[320px] sm:px-14 sm:text-base lg:min-w-[360px] lg:px-18 lg:text-lg"
            style={{
              fontFamily: '"Inter", system-ui, sans-serif',
              fontWeight: '400',
              boxShadow:
                '0 25px 50px -12px rgba(71, 85, 105, 0.15), 0 0 0 1px rgba(226, 232, 240, 0.15), inset 0 1px 0 rgba(248, 250, 252, 0.1)',
            }}
          >
            <div className="absolute inset-0 -skew-x-12 translate-x-[-200%] transform bg-gradient-to-r from-transparent via-white/8 to-transparent transition-transform duration-1200 ease-out group-hover:translate-x-[200%]"></div>
            <span className="relative z-10 inline-block transition-transform duration-500 group-hover:scale-105 group-hover:text-white/95">
              {heroMeta.primaryCta}
            </span>
          </Link>
        </div>

        <div className="mx-auto max-w-5xl">
          <div className="mb-5 text-center text-[11px] uppercase tracking-[0.24em] text-white/70 sm:text-xs">
            {heroMeta.visualLabel}
          </div>
          <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
            {heroMeta.entryCards.map((card) => {
              const Icon = card.icon;

              return (
                <Link
                  key={card.href}
                  to={card.href}
                  className="group rounded-[28px] border border-white/15 bg-white/10 px-6 py-7 text-center backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/14 hover:shadow-2xl sm:px-7 sm:py-8"
                >
                  <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/14 text-white shadow-lg">
                    <Icon size={20} strokeWidth={1.8} />
                  </div>
                  <div className="mx-auto max-w-[22rem]">
                    <div className="text-xl font-medium text-white sm:text-[1.4rem]">{card.title}</div>
                    <p className="mx-auto mt-3 max-w-[28ch] text-sm leading-6 text-white/75 sm:text-[15px]">
                      {card.description}
                    </p>
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

export default Hero;

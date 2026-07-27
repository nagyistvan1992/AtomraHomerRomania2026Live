import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Leaf, Palette, RefreshCw, Shield } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { useLanguage } from '../context/LanguageContext';
import { getSiteUrl } from '../utils/siteConfig';
import { generateBreadcrumbStructuredData } from '../utils/seoUtils';

const WhyAtomraPage = () => {
  const { language } = useLanguage();
  const breadcrumbStructuredData = generateBreadcrumbStructuredData([
    { name: 'Home', url: getSiteUrl('/') },
    { name: 'De ce Atomra', url: getSiteUrl('/why-atomra') },
  ]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const content = {
    ro: {
      title: 'De ce Atomra',
      subtitle: 'Cinci motive pentru care experiența noastră cu ceară perlată este diferită.',
      seoTitle: 'De ce Atomra | Atomra Home Romania',
      seoDescription:
        'Află de ce lumânările și produsele Atomra sunt diferite: refillabile, curate, premium și gândite pentru decor contemporan.',
      features: [
        {
          title: 'Ceară mai curată',
          description:
            'Folosim o formulă orientată spre o ardere curată și o experiență mai plăcută în spațiul tău.',
          icon: <Leaf size={32} strokeWidth={1.5} className="text-green-600" />,
        },
        {
          title: 'Sistem refillabil',
          description: 'Recipientele pot fi refolosite, iar reumplerea devine rapidă, practică și estetică.',
          icon: <RefreshCw size={32} strokeWidth={1.5} className="text-blue-600" />,
        },
        {
          title: 'Libertate de personalizare',
          description: 'Poți construi aranjamente diferite pentru acasă, cadouri sau evenimente, în funcție de stilul tău.',
          icon: <Palette size={32} strokeWidth={1.5} className="text-violet-600" />,
        },
        {
          title: 'Aspect premium',
          description:
            'Produsele sunt gândite să arate bine pe masă, în living, în dormitor sau în decoruri speciale.',
          icon: <Heart size={32} strokeWidth={1.5} className="text-rose-600" />,
        },
        {
          title: 'Mai mult control',
          description:
            'Sistemul pe bază de granule oferă flexibilitate și un plus de siguranță în utilizarea de zi cu zi.',
          icon: <Shield size={32} strokeWidth={1.5} className="text-amber-600" />,
        },
      ],
      missionTitle: 'Ce vrem să oferim',
      missionDescription:
        'Atomra combină funcționalitatea cu estetica. Nu ne interesează doar un produs frumos, ci un produs care să fie ușor de refolosit, ușor de integrat în decor și plăcut de folosit pe termen lung.',
      valuesTitle: 'Principiile după care lucrăm',
      values: [
        'Sustenabilitate fără compromis la aspect',
        'Produse curate și atent alese',
        'Design calm, elegant și ușor de integrat',
        'Experiență clară de cumpărare și folosire',
        'Respect pentru client, spațiu și atmosferă',
      ],
    },
    hu: {
      title: 'Miért Atomra',
      subtitle: 'Öt ok, amiért az újratölthető gyöngyviasz élményünk más.',
      seoTitle: 'Miért Atomra | Atomra Home Romania',
      seoDescription:
        'Fedezd fel, miért különlegesek az Atomra termékek: újratölthetők, letisztultak, prémium minőségűek és modern enteriőrökhöz készültek.',
      features: [
        {
          title: 'Tisztább viaszélmény',
          description:
            'Olyan élményt szeretnénk adni, amely tisztább égést és kellemesebb jelenlétet nyújt az otthonodban.',
          icon: <Leaf size={32} strokeWidth={1.5} className="text-green-600" />,
        },
        {
          title: 'Újratölthető rendszer',
          description: 'A tartók újrahasználhatók, az utántöltés gyors, praktikus és szép marad.',
          icon: <RefreshCw size={32} strokeWidth={1.5} className="text-blue-600" />,
        },
        {
          title: 'Személyre szabható',
          description: 'Otthonra, ajándékba vagy eseményre is könnyen alakítható a saját stílusodhoz.',
          icon: <Palette size={32} strokeWidth={1.5} className="text-violet-600" />,
        },
        {
          title: 'Prémium megjelenés',
          description:
            'A termékek a mindennapi enteriőrben és különleges dekorokban is kifinomultan mutatnak.',
          icon: <Heart size={32} strokeWidth={1.5} className="text-rose-600" />,
        },
        {
          title: 'Nagyobb kontroll',
          description: 'A gyöngyös rendszer rugalmasabb használatot és több biztonságérzetet ad.',
          icon: <Shield size={32} strokeWidth={1.5} className="text-amber-600" />,
        },
      ],
      missionTitle: 'Mit szeretnénk adni',
      missionDescription:
        'Az Atomra a funkcionalitást és az esztétikát kapcsolja össze. Nem csak szép terméket szeretnénk, hanem olyat, amelyet jó használni, könnyű újratölteni és természetesen illeszkedik a térbe.',
      valuesTitle: 'Az alapelveink',
      values: [
        'Fenntarthatóság esztétikai kompromisszum nélkül',
        'Tiszta, gondosan válogatott termékek',
        'Nyugodt, elegáns és könnyen beilleszthető design',
        'Átlátható vásárlási és használati élmény',
        'Tisztelet a vásárló, a tér és a hangulat iránt',
      ],
    },
    en: {
      title: 'Why Atomra',
      subtitle: 'Five reasons our refillable pearl wax experience feels different.',
      seoTitle: 'Why Atomra | Atomra Home Romania',
      seoDescription:
        'See what makes Atomra products different: refillable, cleaner, premium and designed for modern interiors and thoughtful gifting.',
      features: [
        {
          title: 'Cleaner wax experience',
          description: 'We focus on a cleaner burn and a more refined atmosphere in your space.',
          icon: <Leaf size={32} strokeWidth={1.5} className="text-green-600" />,
        },
        {
          title: 'Refillable system',
          description: 'Containers can be reused, making refills practical, elegant and easy to maintain.',
          icon: <RefreshCw size={32} strokeWidth={1.5} className="text-blue-600" />,
        },
        {
          title: 'Room to customize',
          description: 'You can build different looks for home styling, gifting or events based on your own taste.',
          icon: <Palette size={32} strokeWidth={1.5} className="text-violet-600" />,
        },
        {
          title: 'Premium presence',
          description:
            'The products are designed to look beautiful in living spaces and special occasion setups alike.',
          icon: <Heart size={32} strokeWidth={1.5} className="text-rose-600" />,
        },
        {
          title: 'More control',
          description:
            'The pearl-based system offers flexibility and an added sense of safety in everyday use.',
          icon: <Shield size={32} strokeWidth={1.5} className="text-amber-600" />,
        },
      ],
      missionTitle: 'What we want to offer',
      missionDescription:
        'Atomra blends function with aesthetics. We care not only about beauty, but also about creating products that are easy to reuse, easy to style and satisfying to live with over time.',
      valuesTitle: 'What guides us',
      values: [
        'Sustainability without sacrificing aesthetics',
        'Clean, carefully selected products',
        'Calm and elegant design language',
        'A clear shopping and usage experience',
        'Respect for the customer, the space and the mood',
      ],
    },
  }[language === 'hu' ? 'hu' : language === 'en' ? 'en' : 'ro'];

  return (
    <>
      <SEOHead
        title={content.seoTitle}
        description={content.seoDescription}
        keywords="de ce atomra, why atomra, miért atomra, refillable candles, ceară perlată, premium candles"
        url={getSiteUrl('/why-atomra')}
        structuredData={breadcrumbStructuredData}
      />

      <div className="luxury-page-bg luxury-floating-elements min-h-screen">
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-32 left-16 w-1 h-1 bg-slate-300/20 rounded-full animate-luxury-float"></div>
          <div
            className="absolute top-48 right-24 w-0.5 h-0.5 bg-slate-200/30 rounded-full animate-luxury-float"
            style={{ animationDelay: '2s' }}
          ></div>
          <div
            className="absolute bottom-32 left-1/4 w-0.5 h-0.5 bg-slate-300/25 rounded-full animate-luxury-float"
            style={{ animationDelay: '4s' }}
          ></div>
          <div
            className="absolute bottom-48 right-1/4 w-1 h-1 bg-slate-200/20 rounded-full animate-luxury-float"
            style={{ animationDelay: '1s' }}
          ></div>
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
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {content.features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.08 }}
                    className="luxury-card p-8 rounded-lg text-center"
                  >
                    <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-light text-slate-900 mb-4">{feature.title}</h3>
                    <p className="text-slate-600 font-light">{feature.description}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="luxury-card p-8 rounded-lg mb-12"
              >
                <h2 className="text-2xl font-light text-slate-900 mb-6 text-center">{content.missionTitle}</h2>
                <p className="text-lg text-slate-600 font-light leading-relaxed text-center max-w-4xl mx-auto">
                  {content.missionDescription}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="luxury-card p-8 rounded-lg"
              >
                <h2 className="text-2xl font-light text-slate-900 mb-6 text-center">{content.valuesTitle}</h2>
                <div className="max-w-3xl mx-auto">
                  <ul className="space-y-4">
                    {content.values.map((item) => (
                      <li key={item} className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center mt-0.5 mr-4">
                          <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                        </div>
                        <span className="text-slate-600 font-light">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default WhyAtomraPage;

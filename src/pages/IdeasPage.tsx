import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Home, PartyPopper, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SEOHead from '../components/SEOHead';
import { getAssetPath } from '../utils/assetPath';
import { getSiteUrl } from '../utils/siteConfig';
import { generateBreadcrumbStructuredData } from '../utils/seoUtils';

const galleryImages = [
  {
    src: getAssetPath('/photoshoot-image (11).webp'),
    alt: 'Atomra candle styling idea with elegant pearls',
    link: '/product/granule-box-750g',
  },
  {
    src: getAssetPath('/7_a312f04c-8c83-41b7-835e-4097a635502f_1024x1024.webp'),
    alt: 'Colored vessel styled with Atomra wax pearls',
    link: '/product/pachet-splendore-250g',
  },
  {
    src: getAssetPath('/accessories-category.webp'),
    alt: 'Atomra event table styling',
    link: '/product/ceara-nisip-4-5kg-evenimente',
  },
  {
    src: getAssetPath('/CandleSand-6 copy.webp'),
    alt: 'Reading corner candle styling',
    link: '/product/pachet-essenza-150g',
  },
];

const IdeasPage = () => {
  const { language } = useLanguage();
  const breadcrumbStructuredData = generateBreadcrumbStructuredData([
    { name: 'Home', url: getSiteUrl('/') },
    { name: 'Idei si inspiratie', url: getSiteUrl('/ideas') },
  ]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const content = {
    ro: {
      seoTitle: 'Idei si inspiratie | Atomra Home Romania',
      seoDescription:
        'Descopera idei de styling pentru acasa, cadouri si evenimente folosind sistemul reincarcabil de perle de ceara Atomra.',
      seoKeywords:
        'idei decor lumanari, inspiratie lumanari, ceara perlata, decor evenimente, Atomra',
      title: 'Idei si inspiratie',
      subtitle:
        'Cateva moduri simple si elegante de a integra perlele de ceara Atomra in casa, la mese festive sau in cadouri cu personalitate.',
      featuredTitle: 'Porneste de la un vas simplu',
      featuredText:
        'Frumusetea sistemului nostru sta in libertate. Poti porni de la un recipient pe care il ai deja si il poti transforma intr-o piesa noua, curata si usor de reimprospatat de fiecare data.',
      featuredCta: 'Vezi Granule Box',
      sections: [
        {
          title: 'Pentru acasa',
          text: 'Foloseste vase joase pentru living, recipiente transparente pentru dining si piese mici pentru noptiere sau baie. Cateva puncte de lumina bine asezate schimba imediat atmosfera.',
          icon: Home,
          cta: 'Exploreaza decorul de acasa',
          link: '/home-collection',
        },
        {
          title: 'Pentru mese si evenimente',
          text: 'Alterneaza inaltimi diferite, grupeaza recipiente in numar impar si pastreaza o paleta cromatica simpla pentru un rezultat aerisit si elegant.',
          icon: PartyPopper,
          cta: 'Vezi colectia pentru evenimente',
          link: '/events-collection',
        },
        {
          title: 'Pentru cadouri memorabile',
          text: 'Combina perle de ceara, fitiluri si un recipient special intr-un set personal. Este un cadou util, frumos si usor de adaptat fiecarui stil.',
          icon: Sparkles,
          cta: 'Descopera toate produsele',
          link: '/toate-produsele',
        },
      ],
      galleryTitle: 'Galerie de inspiratie',
      galleryText:
        'Selectia de mai jos arata cat de versatil poate deveni acelasi produs atunci cand schimbi vasul, proportia si contextul.',
      galleryCta: 'Vezi produsul',
      closingTitle: 'Un sistem creat pentru joaca si rafinament',
      closingText:
        'Nu trebuie sa urmezi reguli rigide. Incepe cu un vas care iti place, alege cantitatea potrivita, testeaza pozitionarea fitilului si construieste treptat un decor care sa para al tau.',
    },
    hu: {
      seoTitle: 'Otletek es inspiracio | Atomra Home Romania',
      seoDescription:
        'Otthoni, ajandek es esemeny dekoracios otletek az Atomra ujratoltheto viaszgyongy rendszerrel.',
      seoKeywords:
        'gyertya dekor otlet, inspiracio, viaszgyongy, esemeny dekor, Atomra',
      title: 'Otletek es inspiracio',
      subtitle:
        'Nehany egyszeru es elegans mod arra, hogyan illeszd az Atomra viaszgyongyoket az otthonodba, unnepi asztalokra vagy szemelyes ajandekokba.',
      featuredTitle: 'Indulj egy egyszeru tartalybol',
      featuredText:
        'Rendszerunk ereje a szabadsagban rejlik. Elindulhatsz egy mar meglevo tartallyal, es uj, letisztult, konnyen frissitheto disztargyga alakithatod.',
      featuredCta: 'Granule Box megnezese',
      sections: [
        {
          title: 'Otthonra',
          text: 'Hasznalj alacsony edenyeket a nappaliba, atlatszo tartalyokat az etkezobe, es kisebb darabokat az ejjeliszekrenyre vagy a furdobe. Néhany jol elhelyezett fenyforras azonnal valtoztat a hangulaton.',
          icon: Home,
          cta: 'Otthoni kollekcio megnezese',
          link: '/home-collection',
        },
        {
          title: 'Asztalokhoz es esemenyekhez',
          text: 'Valtogass kulonbozo magassagokat, dolgozz paratlan szamu csoportokkal, es tarts visszafogott szinpalettat az elegans, legies eredmenyert.',
          icon: PartyPopper,
          cta: 'Esemeny kollekcio megnezese',
          link: '/events-collection',
        },
        {
          title: 'Emlekezetes ajandekokhoz',
          text: 'Allits ossze szemelyes szettet viaszgyongyokkel, kanocokkal es egy kulonleges tartallyal. Hasznos, szep es konnyen szemelyre szabott ajandek.',
          icon: Sparkles,
          cta: 'Osszes termek',
          link: '/toate-produsele',
        },
      ],
      galleryTitle: 'Inspiracios galeria',
      galleryText:
        'Az alabbi valogatas megmutatja, mennyire sokoldalu ugyanaz a termek, ha a tartalyt, az aranyokat vagy a felhasznalasi kornyezetet valtoztatod.',
      galleryCta: 'Termek megnezese',
      closingTitle: 'Jatek es kifinomultsag egy rendszerben',
      closingText:
        'Nem kell merev szabalyokat kovetned. Valassz egy edenyet, amit szeretsz, merd ki a megfelelo mennyiseget, allitsd be a kanocot, es epits olyan dekort, ami tenyleg hozzad tartozik.',
    },
    en: {
      seoTitle: 'Ideas and inspiration | Atomra Home Romania',
      seoDescription:
        'Explore styling ideas for home decor, gifting, and events with the Atomra refillable wax pearl system.',
      seoKeywords:
        'candle styling ideas, wax pearl inspiration, event decor, home styling, Atomra',
      title: 'Ideas and inspiration',
      subtitle:
        'A few elegant ways to bring Atomra wax pearls into your home, your table styling, and your most personal gifts.',
      featuredTitle: 'Start with a simple vessel',
      featuredText:
        'The beauty of our system is freedom. Begin with a vessel you already own and turn it into something fresh, calm, and easy to renew again and again.',
      featuredCta: 'View Granule Box',
      sections: [
        {
          title: 'For home',
          text: 'Use low vessels in the living room, transparent glass in the dining area, and smaller pieces for bedside tables or the bathroom. A few well-placed points of light can completely change the mood.',
          icon: Home,
          cta: 'Explore home styling',
          link: '/home-collection',
        },
        {
          title: 'For tables and events',
          text: 'Mix heights, work in odd-numbered groupings, and keep the palette restrained for an airy and elegant finish.',
          icon: PartyPopper,
          cta: 'See the event collection',
          link: '/events-collection',
        },
        {
          title: 'For memorable gifts',
          text: 'Pair wax pearls, wicks, and a special vessel into a personal set. It becomes a useful, beautiful gift that still feels tailored.',
          icon: Sparkles,
          cta: 'Browse all products',
          link: '/toate-produsele',
        },
      ],
      galleryTitle: 'Inspiration gallery',
      galleryText:
        'This small selection shows how versatile the same product becomes once you change the vessel, the proportions, or the occasion.',
      galleryCta: 'View product',
      closingTitle: 'A system made for play and refinement',
      closingText:
        'There is no need for rigid rules. Start with a vessel you love, choose the right amount, test wick placement, and build a setup that feels fully yours.',
    },
  }[language];

  return (
    <>
      <SEOHead
        title={content.seoTitle}
        description={content.seoDescription}
        keywords={content.seoKeywords}
        url={getSiteUrl('/ideas')}
        structuredData={breadcrumbStructuredData}
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

          <section className="bg-white py-12 sm:py-16">
            <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-6 sm:px-8 lg:grid-cols-2 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="mb-4 text-3xl font-light text-slate-900">{content.featuredTitle}</h2>
                <p className="mb-6 font-light leading-relaxed text-slate-600">{content.featuredText}</p>
                <Link
                  to="/product/granule-box-750g"
                  className="inline-flex items-center gap-2 rounded bg-slate-900 px-6 py-3 text-sm font-light uppercase tracking-wide text-white transition-colors duration-300 hover:bg-slate-800"
                >
                  <span>{content.featuredCta}</span>
                  <ArrowRight size={16} strokeWidth={1.5} />
                </Link>
              </motion.div>

              <motion.img
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                src={getAssetPath('/photoshoot-image (11).webp')}
                alt={content.title}
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </section>

          <section className="luxury-section-dark py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
              <div className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
                {content.sections.map((section, index) => {
                  const Icon = section.icon;

                  return (
                    <motion.div
                      key={section.title}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.25 + index * 0.1 }}
                      className="luxury-card rounded-lg p-8"
                    >
                      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-white/80 shadow-sm">
                        <Icon size={22} strokeWidth={1.5} className="text-slate-700" />
                      </div>
                      <h2 className="mb-3 text-2xl font-light text-slate-900">{section.title}</h2>
                      <p className="mb-6 font-light leading-relaxed text-slate-600">{section.text}</p>
                      <Link
                        to={section.link}
                        className="inline-flex items-center gap-2 text-sm font-medium text-slate-900 transition-colors duration-200 hover:text-slate-600"
                      >
                        <span>{section.cta}</span>
                        <ArrowRight size={15} strokeWidth={1.5} />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.55 }}
                className="mb-8 text-center"
              >
                <h2 className="mb-4 text-3xl font-light text-slate-900">{content.galleryTitle}</h2>
                <p className="mx-auto max-w-3xl font-light leading-relaxed text-slate-600">
                  {content.galleryText}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
                {galleryImages.map((image, index) => (
                  <motion.div
                    key={image.src}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.65 + index * 0.08 }}
                    className="group"
                  >
                    <Link to={image.link} className="block">
                      <div className="luxury-card overflow-hidden rounded-lg shadow-sm transition-all duration-500 hover:shadow-xl">
                        <div className="aspect-square overflow-hidden">
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-5">
                          <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-900 transition-colors duration-200 group-hover:text-slate-600">
                            {content.galleryCta}
                            <ArrowRight size={15} strokeWidth={1.5} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="luxury-section-light py-16 sm:py-20">
            <div className="mx-auto max-w-4xl px-6 text-center sm:px-8 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.85 }}
                className="luxury-card rounded-lg p-8 sm:p-12"
              >
                <h2 className="mb-4 text-3xl font-light text-slate-900">{content.closingTitle}</h2>
                <p className="font-light leading-relaxed text-slate-600">{content.closingText}</p>
              </motion.div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default IdeasPage;

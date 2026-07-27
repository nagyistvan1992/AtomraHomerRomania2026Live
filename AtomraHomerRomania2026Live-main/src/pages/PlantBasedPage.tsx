import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Droplets, Heart, Leaf, ThermometerSun, Wind } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SEOHead from '../components/SEOHead';
import { getSiteUrl } from '../utils/siteConfig';

const PlantBasedPage = () => {
  const { language } = useLanguage();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const content = {
    ro: {
      seoTitle: 'Lumanari pe baza de plante | Atomra Home Romania',
      seoDescription:
        'Afla de ce alegem ceara vegetala: ardere mai curata, ingrediente atent selectate si o experienta mai prietenoasa cu casa si cu mediul.',
      seoKeywords:
        'ceara vegetala, lumanari naturale, lumanari pe baza de plante, ceara de soia, Atomra',
      title: 'Lumanari pe baza de plante',
      subtitle:
        'La Atomra lucram cu ceara vegetala pentru o experienta mai curata, mai calma si mai coerenta cu ideea de ritual reutilizabil.',
      intro:
        'Pentru noi, alegerea unei baze vegetale nu tine doar de marketing. Este o decizie care influenteaza felul in care arde produsul, cum se simte in spatiul tau si ce fel de obiect lasam in urma.',
      benefitsTitle: 'De ce alegem ceara vegetala',
      benefits: [
        {
          title: 'Ardere mai curata',
          description: 'Mai putin fum, mai putine depuneri si o prezenta mai placuta in spatiile in care vrei liniste si confort.',
          icon: Wind,
          color: 'text-blue-600',
        },
        {
          title: 'Origine mai responsabila',
          description: 'Pornim de la surse regenerabile si construim un produs care se potriveste firesc cu ideea de refill si reutilizare.',
          icon: Leaf,
          color: 'text-green-600',
        },
        {
          title: 'Temperatura de topire echilibrata',
          description: 'Ajuta la o ardere constanta si la o experienta mai controlata, mai ales in sistemele noastre cu perle de ceara.',
          icon: ThermometerSun,
          color: 'text-amber-600',
        },
        {
          title: 'Parfum mai bine integrat',
          description: 'Structura cerii vegetale sustine o eliberare mai placuta a parfumului, fara senzatia grea a unui miros agresiv.',
          icon: Droplets,
          color: 'text-violet-600',
        },
        {
          title: 'Mai bland pentru rutina de acasa',
          description: 'Este o alegere pe care o preferam atunci cand produsul devine parte dintr-un ritual zilnic si nu doar un obiect decorativ.',
          icon: Heart,
          color: 'text-rose-600',
        },
      ],
      blendTitle: 'Nu doar un ingredient, ci un sistem',
      blendText:
        'Performanta unei lumanari bune nu vine dintr-un singur cuvant de pe eticheta. Conteaza raportul dintre ceara, recipient, fitil, volum si modul de utilizare. De aceea construim fiecare produs ca pe un sistem complet, nu ca pe un simplu recipient umplut.',
      principlesTitle: 'Ce urmarim in fiecare produs',
      principles: [
        'o textura stabila si usor de folosit',
        'o ardere curata si predictibila',
        'compatibilitate buna cu recipientele refillable',
        'o experienta eleganta, fara exces vizual sau olfactiv',
      ],
      closing:
        'Cand alegi Atomra, alegi mai mult decat un parfum frumos. Alegi o forma de lumina care respecta spatiul, obiectul si ritmul in care vrei sa traiesti acasa.',
    },
    hu: {
      seoTitle: 'Novenyi alapu gyertyak | Atomra Home Romania',
      seoDescription:
        'Tudd meg, miert dolgozunk novenyi viasszal: tisztabb eges, gondosan valasztott osszetevok es fenntarthatobb rituale az otthonban.',
      seoKeywords:
        'novenyi viasz, termeszetes gyertya, szojaviasz, tiszta eges, Atomra',
      title: 'Novenyi alapu gyertyak',
      subtitle:
        'Az Atomranal a novenyi viaszt valasztjuk a tisztabb, nyugodtabb es az ujratoltheto ritualehoz jobban illo elmenyert.',
      intro:
        'Szamunkra a novenyi alap nem egyszeru marketinguzenet. Olyan dontes, amely hat a gyertya egesere, a ter hangulatara es arra is, milyen targyat hagyunk a mindennapokban.',
      benefitsTitle: 'Miert valasztjuk a novenyi viaszt',
      benefits: [
        {
          title: 'Tisztabb eges',
          description: 'Kevesebb fust, kevesebb lerakodas es nyugodtabb jelenlet azokban a terekben, ahol komfortot szeretnel.',
          icon: Wind,
          color: 'text-blue-600',
        },
        {
          title: 'Felelosebb eredet',
          description: 'Megujulo forrasokbol indulunk ki, es olyan termeket epitunk, amely jol kapcsolodik a refill es ujrahasznalat gondolatahoz.',
          icon: Leaf,
          color: 'text-green-600',
        },
        {
          title: 'Kiegyensulyozott olvadas',
          description: 'Segit az egyenletesebb egesben es a jobban kontrollalhato hasznalatban, kulonosen a viaszgyongy rendszerben.',
          icon: ThermometerSun,
          color: 'text-amber-600',
        },
        {
          title: 'Finomabban oldodo illat',
          description: 'A novenyi viasz szerkezete kellemesebb illatleadast tamogathat, tul nehez vagy eros hatas nelkul.',
          icon: Droplets,
          color: 'text-violet-600',
        },
        {
          title: 'Gyengedebb otthoni rutin',
          description: 'Ezt a megoldast akkor szeretjuk, amikor a gyertya napi rituale resze lesz, nem csak dekoracios targy.',
          icon: Heart,
          color: 'text-rose-600',
        },
      ],
      blendTitle: 'Nem csak alapanyag, hanem rendszer',
      blendText:
        'Egy jo gyertya teljesitmenye nem egyetlen cimkeszo eredmenye. Szamit a viasz, a tartaly, a kanoc, a terfogat es a hasznalat modja is. Ezert minden termekre teljes rendszerkent tekintunk.',
      principlesTitle: 'Mit keresunk minden termekben',
      principles: [
        'stabil, konnyen hasznalhato textura',
        'tisztabb es kiszamithatobb eges',
        'jo kompatibilitas az ujratoltheto tartalyokkal',
        'elegans elmeny vizualis vagy illatbeli tulzas nelkul',
      ],
      closing:
        'Amikor Atomrat valasztasz, nem csupan kellemes illatot valasztasz. Olyan fenyformat valasztasz, amely tiszteletben tartja a teret, a targyat es az otthoni ritmust.',
    },
    en: {
      seoTitle: 'Plant-based candles | Atomra Home Romania',
      seoDescription:
        'Learn why we choose vegetable wax: cleaner burning, carefully selected ingredients, and a calmer candle experience for home rituals.',
      seoKeywords:
        'plant based candles, vegetable wax, natural candles, soy wax, clean burning candles, Atomra',
      title: 'Plant-based candles',
      subtitle:
        'At Atomra we work with vegetable wax because it supports a cleaner, calmer experience and fits naturally into a refillable candle ritual.',
      intro:
        'For us, plant-based wax is not just a label claim. It shapes how the candle burns, how it feels in your space, and what kind of object it becomes in your everyday life.',
      benefitsTitle: 'Why we choose vegetable wax',
      benefits: [
        {
          title: 'Cleaner burn',
          description: 'Less smoke, fewer marks, and a more comfortable presence in the rooms where you want calm and softness.',
          icon: Wind,
          color: 'text-blue-600',
        },
        {
          title: 'More responsible sourcing',
          description: 'We start from renewable materials and build a product that fits the logic of refill and reuse.',
          icon: Leaf,
          color: 'text-green-600',
        },
        {
          title: 'Balanced melt behavior',
          description: 'It supports a steady burn and better control, especially in our wax pearl system.',
          icon: ThermometerSun,
          color: 'text-amber-600',
        },
        {
          title: 'Better fragrance integration',
          description: 'The wax structure helps fragrance feel smoother and more refined instead of dense or overwhelming.',
          icon: Droplets,
          color: 'text-violet-600',
        },
        {
          title: 'Softer for daily rituals',
          description: 'It is the choice we prefer when a candle becomes part of everyday living rather than a one-time decorative object.',
          icon: Heart,
          color: 'text-rose-600',
        },
      ],
      blendTitle: 'Not just an ingredient, but a system',
      blendText:
        'A good candle does not perform well because of one word on a label. Wax, vessel, wick, volume, and usage all matter. That is why we build each product as a complete system, not a simple fill.',
      principlesTitle: 'What we look for in every product',
      principles: [
        'stable texture that feels easy to use',
        'cleaner and more predictable burning',
        'strong compatibility with refillable vessels',
        'an elegant experience without visual or olfactory excess',
      ],
      closing:
        'Choosing Atomra means choosing more than a pleasant scent. It means choosing a form of light that respects the room, the object, and the pace of home life.',
    },
  }[language];

  return (
    <>
      <SEOHead
        title={content.seoTitle}
        description={content.seoDescription}
        keywords={content.seoKeywords}
        url={getSiteUrl('/plant-based')}
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
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="luxury-card mb-10 rounded-lg p-8 text-center lg:p-12"
              >
                <p className="mx-auto max-w-4xl text-lg font-light leading-relaxed text-slate-600">
                  {content.intro}
                </p>
              </motion.div>

              <h2 className="mb-8 text-center text-2xl font-light text-slate-900">{content.benefitsTitle}</h2>
              <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {content.benefits.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.25 + index * 0.08 }}
                      className="luxury-card rounded-lg p-8"
                    >
                      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/80 shadow-sm">
                        <Icon size={24} strokeWidth={1.5} className={item.color} />
                      </div>
                      <h3 className="mb-3 text-xl font-light text-slate-900">{item.title}</h3>
                      <p className="font-light leading-relaxed text-slate-600">{item.description}</p>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.55 }}
                className="luxury-card mb-10 rounded-lg p-8 lg:p-10"
              >
                <h2 className="mb-4 text-center text-2xl font-light text-slate-900">{content.blendTitle}</h2>
                <p className="mx-auto max-w-4xl text-center font-light leading-relaxed text-slate-600">
                  {content.blendText}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.65 }}
                className="luxury-card mb-10 rounded-lg p-8 lg:p-10"
              >
                <h2 className="mb-6 text-center text-2xl font-light text-slate-900">
                  {content.principlesTitle}
                </h2>
                <ul className="mx-auto max-w-3xl space-y-4">
                  {content.principles.map((item) => (
                    <li key={item} className="flex items-start">
                      <div className="mr-4 mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100">
                        <div className="h-2 w-2 rounded-full bg-slate-600" />
                      </div>
                      <span className="font-light text-slate-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.75 }}
                className="text-center"
              >
                <p className="mx-auto max-w-3xl text-lg font-light leading-relaxed text-slate-600">
                  {content.closing}
                </p>
              </motion.div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default PlantBasedPage;

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DollarSign, Palette, Recycle, RefreshCw, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SEOHead from '../components/SEOHead';
import { getSiteUrl } from '../utils/siteConfig';

const RefillablePage = () => {
  const { language } = useLanguage();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const content = {
    ro: {
      seoTitle: 'Lumanari refillable si reutilizabile | Atomra Home Romania',
      seoDescription:
        'Descopera cum functioneaza sistemul Atomra refillable: recipient reutilizat, perle de ceara usor de completat si un decor care ramane mereu proaspat.',
      seoKeywords:
        'lumanari refillable, lumanari reutilizabile, ceara perlata, refill decor, Atomra',
      title: 'Refillable si reutilizabile',
      subtitle:
        'Construim un sistem in care recipientul ramane, fitilul se schimba, iar perlele de ceara pot fi completate usor ori de cate ori vrei sa reimprospatezi decorul.',
      intro:
        'Aceasta abordare face produsul mai flexibil, mai economic si mai firesc pentru un stil de viata in care obiectele bune merita pastrate si refolosite.',
      stepsTitle: 'Cum functioneaza',
      steps: [
        {
          title: 'Alegi recipientul',
          text: 'Poti folosi un vas din colectiile noastre sau unul pe care il ai deja si care se potriveste stilului tau.',
          icon: Sparkles,
        },
        {
          title: 'Adaugi perlele si fitilul',
          text: 'Torni cantitatea dorita, fixezi fitilul in zona centrala si pregatesti piesa pentru aprindere.',
          icon: RefreshCw,
        },
        {
          title: 'Reimprospatezi oricand',
          text: 'Dupa utilizare, completezi stratul superior si schimbi fitilul atunci cand este nevoie.',
          icon: Recycle,
        },
      ],
      benefitsTitle: 'De ce functioneaza atat de bine',
      benefits: [
        {
          title: 'Mai putina risipa',
          text: 'Pastrezi recipientul si inlocuiesti doar ce este necesar pentru o noua folosire.',
          icon: Recycle,
        },
        {
          title: 'Mai multa libertate vizuala',
          text: 'Poti schimba usor recipientul, inaltimea, culoarea sau stilul general al aranjamentului.',
          icon: Palette,
        },
        {
          title: 'Mai bun pe termen lung',
          text: 'Refill-ul devine, de multe ori, o varianta mai avantajoasa decat cumpararea constanta a unor piese complet noi.',
          icon: DollarSign,
        },
      ],
      ideasTitle: 'Idei de recipiente',
      ideas: [
        'pahare elegante sau cupe joase pentru dining',
        'vase de sticla colorata pentru accente luminoase',
        'boluri ceramice mici pentru colturi cozy',
        'recipiente simple, minimaliste, pentru birou sau baie',
      ],
      closing:
        'Refillable nu inseamna compromis. Inseamna sa poti pastra partea frumoasa a obiectului si sa reinnoiesti doar ceea ce tine de utilizare.',
      primaryCta: 'Vezi toate produsele',
      secondaryCta: 'Inspiratie pentru acasa',
    },
    hu: {
      seoTitle: 'Ujratoltheto es ujrahasznalhato gyertyak | Atomra Home Romania',
      seoDescription:
        'Ismerd meg az Atomra ujratoltheto rendszert: megtartott tartaly, konnyen potolhato viaszgyongyok es mindig frissitheto dekor.',
      seoKeywords:
        'ujratoltheto gyertya, ujrahasznalhato gyertya, viaszgyongy, refill dekor, Atomra',
      title: 'Ujratoltheto es ujrahasznalhato',
      subtitle:
        'Olyan rendszert epitunk, amelyben a tartaly megmarad, a kanoc csereledik, a viaszgyongyok pedig konnyen potolhatok barmikor.',
      intro:
        'Ezzel a megkozelitessel a termek rugalmasabb, gazdasagosabb es jobban illik egy olyan eletmodhoz, ahol a jo targyakat erdemes megtartani es ujra hasznalni.',
      stepsTitle: 'Hogyan mukodik',
      steps: [
        {
          title: 'Kivalasztod a tartalyt',
          text: 'Hasznalhatsz egyet a kollekciobol, vagy egy mar meglevo darabot, amely illik az otthonodhoz.',
          icon: Sparkles,
        },
        {
          title: 'Hozzaadod a viaszt es a kanocot',
          text: 'Beletoltod a megfelelo mennyiseget, kozepre helyezed a kanocot, es elokeszited a gyertyat.',
          icon: RefreshCw,
        },
        {
          title: 'Barmikor felfrissited',
          text: 'Hasznalat utan potolod a felso reteget, es szukseg szerint uj kanocot helyezel be.',
          icon: Recycle,
        },
      ],
      benefitsTitle: 'Miert ilyen jol mukodik',
      benefits: [
        {
          title: 'Kevesebb hulladek',
          text: 'A tartalyt megtartod, es csak azt cserelod, ami a kovetkezo hasznalathoz tenyleg kell.',
          icon: Recycle,
        },
        {
          title: 'Nagyobb vizualis szabadsag',
          text: 'Konnyen valthatsz tartalyt, magassagot, szint vagy teljes stilust.',
          icon: Palette,
        },
        {
          title: 'Jobb hosszu tavon',
          text: 'A refill sokszor kedvezobb, mint folyton teljesen uj darabokat vasarolni.',
          icon: DollarSign,
        },
      ],
      ideasTitle: 'Tartaly otletek',
      ideas: [
        'elegans poharak vagy alacsony kupak a dining reszhez',
        'szines uvegek fenyes hangsulyokhoz',
        'kisebb keramia talak meghitt sarkokba',
        'egyszeru minimal tartalyok irodaba vagy furdobe',
      ],
      closing:
        'Az ujratoltheto megoldas nem kompromisszum. Arrol szol, hogy megtarthatod a targy szep reszet, es csak a hasznalathoz tartozo elemeket frissited.',
      primaryCta: 'Osszes termek',
      secondaryCta: 'Otthoni inspiracio',
    },
    en: {
      seoTitle: 'Refillable and reusable candles | Atomra Home Romania',
      seoDescription:
        'See how the Atomra refillable system works: reusable vessels, easy wax pearl top-ups, and styling that can stay fresh over time.',
      seoKeywords:
        'refillable candles, reusable candles, wax pearls, refill home decor, Atomra',
      title: 'Refillable and reusable',
      subtitle:
        'We design a system where the vessel stays, the wick is replaced, and the wax pearls can be topped up whenever you want to refresh the piece.',
      intro:
        'That approach makes the product more flexible, more economical, and more natural for a lifestyle in which good objects are worth keeping.',
      stepsTitle: 'How it works',
      steps: [
        {
          title: 'Choose your vessel',
          text: 'Use one from our collection or reuse a piece you already own and love.',
          icon: Sparkles,
        },
        {
          title: 'Add pearls and wick',
          text: 'Pour the desired amount, place the wick in the center area, and prepare the piece for lighting.',
          icon: RefreshCw,
        },
        {
          title: 'Refresh whenever needed',
          text: 'After use, top up the surface and replace the wick whenever the setup needs renewing.',
          icon: Recycle,
        },
      ],
      benefitsTitle: 'Why it works so well',
      benefits: [
        {
          title: 'Less waste',
          text: 'You keep the vessel and replace only what is needed for the next use.',
          icon: Recycle,
        },
        {
          title: 'More visual freedom',
          text: 'It is easy to change the vessel, height, color balance, or overall styling direction.',
          icon: Palette,
        },
        {
          title: 'Better long term value',
          text: 'In many cases, refilling becomes a smarter option than constantly buying brand-new pieces.',
          icon: DollarSign,
        },
      ],
      ideasTitle: 'Vessel ideas',
      ideas: [
        'elegant glasses or low cups for dining tables',
        'colored glass vessels for luminous accents',
        'small ceramic bowls for cozy corners',
        'simple minimal vessels for desks or bathrooms',
      ],
      closing:
        'Refillable does not mean compromise. It means keeping the beautiful part of the object and renewing only what belongs to the act of use.',
      primaryCta: 'Browse all products',
      secondaryCta: 'Home inspiration',
    },
  }[language];

  return (
    <>
      <SEOHead
        title={content.seoTitle}
        description={content.seoDescription}
        keywords={content.seoKeywords}
        url={getSiteUrl('/refillable')}
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

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mb-10"
              >
                <h2 className="mb-8 text-center text-2xl font-light text-slate-900">{content.stepsTitle}</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  {content.steps.map((step) => {
                    const Icon = step.icon;

                    return (
                      <div key={step.title} className="luxury-card rounded-lg p-8 text-center">
                        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-white/80 shadow-sm">
                          <Icon size={22} strokeWidth={1.5} className="text-slate-700" />
                        </div>
                        <h3 className="mb-3 text-xl font-light text-slate-900">{step.title}</h3>
                        <p className="font-light leading-relaxed text-slate-600">{step.text}</p>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="mb-10"
              >
                <h2 className="mb-8 text-center text-2xl font-light text-slate-900">{content.benefitsTitle}</h2>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                  {content.benefits.map((benefit) => {
                    const Icon = benefit.icon;

                    return (
                      <div key={benefit.title} className="luxury-card rounded-lg p-8">
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/80 shadow-sm">
                          <Icon size={22} strokeWidth={1.5} className="text-slate-700" />
                        </div>
                        <h3 className="mb-3 text-xl font-light text-slate-900">{benefit.title}</h3>
                        <p className="font-light leading-relaxed text-slate-600">{benefit.text}</p>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.55 }}
                className="luxury-card mb-10 rounded-lg p-8 lg:p-10"
              >
                <h2 className="mb-6 text-center text-2xl font-light text-slate-900">{content.ideasTitle}</h2>
                <ul className="mx-auto max-w-3xl space-y-4">
                  {content.ideas.map((idea) => (
                    <li key={idea} className="flex items-start">
                      <div className="mr-4 mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100">
                        <div className="h-2 w-2 rounded-full bg-slate-600" />
                      </div>
                      <span className="font-light text-slate-600">{idea}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.65 }}
                className="text-center"
              >
                <p className="mx-auto mb-6 max-w-3xl text-lg font-light leading-relaxed text-slate-600">
                  {content.closing}
                </p>
                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <Link
                    to="/all-products"
                    className="rounded bg-slate-900 px-6 py-3 text-sm font-light uppercase tracking-wide text-white transition-colors duration-300 hover:bg-slate-800"
                  >
                    {content.primaryCta}
                  </Link>
                  <Link
                    to="/home-collection"
                    className="rounded border border-slate-300 px-6 py-3 text-sm font-light uppercase tracking-wide text-slate-700 transition-colors duration-300 hover:border-slate-400 hover:text-slate-900"
                  >
                    {content.secondaryCta}
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

export default RefillablePage;

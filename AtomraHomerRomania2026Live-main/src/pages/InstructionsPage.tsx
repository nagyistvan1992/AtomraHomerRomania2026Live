import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Flame, ShieldCheck, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SEOHead from '../components/SEOHead';
import { getAssetPath } from '../utils/assetPath';
import { getSiteUrl } from '../utils/siteConfig';

const InstructionsPage = () => {
  const { language } = useLanguage();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const content = {
    ro: {
      seoTitle: 'Instructiuni | Atomra Home Romania',
      seoDescription:
        'Ghid clar pentru folosirea perlelor de ceara Atomra: pregatirea recipientului, alegerea fitilului, intretinere si siguranta.',
      seoKeywords:
        'instructiuni lumanari, ceara perlata, ghid fitil, siguranta lumanari, Atomra',
      title: 'Instructiuni',
      subtitle:
        'Tot ce ai nevoie pentru a folosi corect sistemul Atomra, de la prima aprindere pana la reimprospatarea recipientului.',
      howTitle: 'Cum se foloseste',
      steps: [
        {
          title: 'Alege recipientul',
          text: 'Foloseste un vas rezistent la caldura, curat si complet uscat. Sticla, ceramica si metalul sunt cele mai potrivite alegeri.',
          image: getAssetPath('/DSC_2075_710x.webp'),
        },
        {
          title: 'Adauga perlele de ceara',
          text: 'Umple recipientul pana la aproximativ 1-2 cm sub marginea superioara, pentru a pastra un aspect elegant si o ardere controlata.',
          image: getAssetPath('/DSC_2075_710x.webp'),
        },
        {
          title: 'Fixeaza fitilul',
          text: 'Pozitioneaza fitilul in centru, suficient de adanc incat sa stea stabil, cu aproximativ 1 cm ramas deasupra stratului de ceara.',
          image: getAssetPath('/DSC_2082_710x.webp'),
        },
        {
          title: 'Aprinde si observa',
          text: 'La prima folosire, lasa flacara sa creeze un mic bazin uniform in jurul fitilului. Acest lucru ajuta la o experienta mai curata si mai stabila.',
          image: getAssetPath('/regregrg_cedf33bb-8bb4-4797-899b-f9d3cb8f33f7_710x.webp'),
        },
      ],
      careTitle: 'Intretinere si siguranta',
      careItems: [
        'Nu lasa niciodata lumanarea aprinsa nesupravegheata.',
        'Tine recipientul departe de textile, perdele, copii si animale.',
        'Scurteaza fitilul la aproximativ 5-6 mm inainte de o noua aprindere.',
        'Lasa recipientul sa se raceasca complet inainte sa il muti sau sa il completezi.',
        'Daca flacara devine prea mare sau instabila, stinge lumanarea si ajusteaza fitilul.',
      ],
      wickTitle: 'Alegerea fitilului',
      wickIntro:
        'Dimensiunea fitilului influenteaza direct felul in care se topeste ceara. Ca punct de pornire:',
      wickSizes: [
        {
          name: 'Fitil mic',
          description: 'Pentru recipiente de aproximativ 5-8 cm diametru.',
          note: 'Bun pentru pahare mici, cupe joase sau decor discret.',
        },
        {
          name: 'Fitil mediu',
          description: 'Pentru recipiente de aproximativ 8-12 cm diametru.',
          note: 'Alegerea cea mai versatila pentru uz zilnic.',
        },
        {
          name: 'Fitil mare',
          description: 'Pentru recipiente de aproximativ 12-15 cm diametru.',
          note: 'Potrivit pentru vase late sau piese centrale.',
        },
      ],
      troubleshootingTitle: 'Probleme frecvente',
      troubleshooting: [
        {
          issue: 'Flacara este prea mica',
          solution: 'Verifica daca fitilul este centrat sau incearca o varianta usor mai groasa.',
        },
        {
          issue: 'Flacara este prea mare',
          solution: 'Scurteaza fitilul si asigura-te ca recipientul nu este expus la curent.',
        },
        {
          issue: 'Topirea este neuniforma',
          solution: 'Repozitioneaza fitilul si, la vase foarte late, foloseste mai multe fitiluri.',
        },
      ],
    },
    hu: {
      seoTitle: 'Hasznalati utmutato | Atomra Home Romania',
      seoDescription:
        'Attekintheto utmutato az Atomra viaszgyongyok hasznalatahoz: tartaly elokeszites, kanoc valasztas, karbantartas es biztonsag.',
      seoKeywords:
        'gyertya utmutato, viaszgyongy, kanoc valasztas, gyertya biztonsag, Atomra',
      title: 'Hasznalati utmutato',
      subtitle:
        'Minden fontos lepest osszegyujtottunk az elso meggyujtastol a tartaly felfrissiteseig.',
      howTitle: 'Hogyan hasznald',
      steps: [
        {
          title: 'Valaszd ki a tartalyt',
          text: 'Hasznalj hotallo, tiszta es teljesen szaraz edenyet. Az uveg, keramia es fem a legjobb valasztas.',
          image: getAssetPath('/DSC_2075_710x.webp'),
        },
        {
          title: 'Add hozza a viaszgyongyoket',
          text: 'Toldsd meg a tartalyt ugy, hogy a felso perem alatt maradjon korulbelul 1-2 cm hely.',
          image: getAssetPath('/DSC_2075_710x.webp'),
        },
        {
          title: 'Helyezd be a kanocot',
          text: 'Tedd a kanocot kozepre, eleg melyre ahhoz, hogy stabilan alljon, es maradjon kb. 1 cm a felszin felett.',
          image: getAssetPath('/DSC_2082_710x.webp'),
        },
        {
          title: 'Gyujtsd meg es figyeld',
          text: 'Elso alkalommal hagyd, hogy egyenletes olvadasi zona alakuljon ki a kanoc korul.',
          image: getAssetPath('/regregrg_cedf33bb-8bb4-4797-899b-f9d3cb8f33f7_710x.webp'),
        },
      ],
      careTitle: 'Karbantartas es biztonsag',
      careItems: [
        'Soha ne hagyd az ego gyertyat felugyelet nelkul.',
        'Tartsd tavol textiltol, fuggonytol, gyermekektol es haziallatoktol.',
        'Az ujrameggyujtas elott vagd vissza a kanocot kb. 5-6 mm-re.',
        'Mozgatas vagy ujratoltes elott hagyd teljesen kihulni a tartalyt.',
        'Ha a lang tul nagy vagy instabil, oltsd el es igazits a kanocon.',
      ],
      wickTitle: 'Kanoc valasztasa',
      wickIntro:
        'A kanoc merete kozvetlenul befolyasolja, hogyan olvad a viasz. Kiindulasi pontkent:',
      wickSizes: [
        {
          name: 'Kis kanoc',
          description: 'Kb. 5-8 cm atmeroju tartalyokhoz.',
          note: 'Jo kisebb poharakhoz es diszkret dekorokhoz.',
        },
        {
          name: 'Kozepes kanoc',
          description: 'Kb. 8-12 cm atmeroju tartalyokhoz.',
          note: 'A leguniverzalisabb valasztas a mindennapi hasznalathoz.',
        },
        {
          name: 'Nagy kanoc',
          description: 'Kb. 12-15 cm atmeroju tartalyokhoz.',
          note: 'Szelesebb edenyekhez es kozepponti dekorokhoz idealis.',
        },
      ],
      troubleshootingTitle: 'Gyakori kerdesek',
      troubleshooting: [
        {
          issue: 'Tul kicsi a lang',
          solution: 'Ellenorizd, hogy a kanoc kozepen all-e, vagy probalj valamivel vastagabb kanocot.',
        },
        {
          issue: 'Tul nagy a lang',
          solution: 'Vagd rovidebbre a kanocot, es ne legyen huzat a gyertya korul.',
        },
        {
          issue: 'Nem egyenletes az olvadas',
          solution: 'Igazits a kanoc helyzeten, es szelesebb tartalynal hasznalj tobb kanocot.',
        },
      ],
    },
    en: {
      seoTitle: 'Instructions | Atomra Home Romania',
      seoDescription:
        'A clear guide to using Atomra wax pearls: vessel setup, wick choice, care, and safety.',
      seoKeywords:
        'candle instructions, wax pearls, wick guide, candle safety, Atomra',
      title: 'Instructions',
      subtitle:
        'Everything you need to use the Atomra system well, from the first lighting to refreshing the vessel later on.',
      howTitle: 'How to use it',
      steps: [
        {
          title: 'Choose the vessel',
          text: 'Use a heat-resistant vessel that is clean and fully dry. Glass, ceramic, and metal are the most reliable choices.',
          image: getAssetPath('/DSC_2075_710x.webp'),
        },
        {
          title: 'Add the wax pearls',
          text: 'Fill the vessel to about 1-2 cm below the rim to keep the look refined and the burn controlled.',
          image: getAssetPath('/DSC_2075_710x.webp'),
        },
        {
          title: 'Place the wick',
          text: 'Position the wick in the center, deep enough to stay stable, with around 1 cm visible above the surface.',
          image: getAssetPath('/DSC_2082_710x.webp'),
        },
        {
          title: 'Light and observe',
          text: 'During the first use, allow a small, even melt pool to form around the wick for a steadier experience.',
          image: getAssetPath('/regregrg_cedf33bb-8bb4-4797-899b-f9d3cb8f33f7_710x.webp'),
        },
      ],
      careTitle: 'Care and safety',
      careItems: [
        'Never leave a burning candle unattended.',
        'Keep the vessel away from fabrics, curtains, children, and pets.',
        'Trim the wick to about 5-6 mm before relighting.',
        'Let the vessel cool completely before moving or refilling it.',
        'If the flame becomes too large or unstable, extinguish it and adjust the wick.',
      ],
      wickTitle: 'Choosing the wick',
      wickIntro:
        'Wick size directly affects how the wax melts. As a simple starting point:',
      wickSizes: [
        {
          name: 'Small wick',
          description: 'For vessels around 5-8 cm in diameter.',
          note: 'Good for small glasses and subtle styling.',
        },
        {
          name: 'Medium wick',
          description: 'For vessels around 8-12 cm in diameter.',
          note: 'The most versatile option for everyday use.',
        },
        {
          name: 'Large wick',
          description: 'For vessels around 12-15 cm in diameter.',
          note: 'Ideal for wider vessels and centerpiece styling.',
        },
      ],
      troubleshootingTitle: 'Common issues',
      troubleshooting: [
        {
          issue: 'The flame is too small',
          solution: 'Check whether the wick is centered, or try a slightly thicker wick.',
        },
        {
          issue: 'The flame is too large',
          solution: 'Trim the wick and make sure the candle is not exposed to drafts.',
        },
        {
          issue: 'The melt is uneven',
          solution: 'Recenter the wick and use multiple wicks for very wide vessels.',
        },
      ],
    },
  }[language];

  return (
    <>
      <SEOHead
        title={content.seoTitle}
        description={content.seoDescription}
        keywords={content.seoKeywords}
        url={getSiteUrl('/instructions')}
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
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-16"
              >
                <div className="mb-8 flex items-center justify-center gap-3">
                  <Sparkles size={22} strokeWidth={1.5} className="text-slate-700" />
                  <h2 className="text-2xl font-light text-slate-900">{content.howTitle}</h2>
                </div>

                <div className="space-y-12">
                  {content.steps.map((step, index) => (
                    <div key={step.title} className="flex flex-col gap-8 items-center md:flex-row">
                      <div className="md:w-1/2">
                        <div className="luxury-card h-full rounded-lg p-6">
                          <div className="mb-4 flex items-center gap-4">
                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-slate-100">
                              <span className="font-medium text-slate-900">{index + 1}</span>
                            </div>
                            <h3 className="text-xl font-light text-slate-900">{step.title}</h3>
                          </div>
                          <p className="font-light leading-relaxed text-slate-600">{step.text}</p>
                        </div>
                      </div>
                      <div className="md:w-1/2">
                        <img src={step.image} alt={step.title} className="w-full rounded-lg shadow-md" />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="luxury-card mb-16 rounded-lg p-8 lg:p-10"
              >
                <div className="mb-6 flex items-center justify-center gap-3">
                  <ShieldCheck size={22} strokeWidth={1.5} className="text-slate-700" />
                  <h2 className="text-2xl font-light text-slate-900">{content.careTitle}</h2>
                </div>
                <ul className="mx-auto max-w-3xl space-y-4">
                  {content.careItems.map((item) => (
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
                transition={{ duration: 0.5, delay: 0.4 }}
                className="luxury-card mb-16 rounded-lg p-8 lg:p-10"
              >
                <div className="mb-6 flex items-center justify-center gap-3">
                  <Flame size={22} strokeWidth={1.5} className="text-slate-700" />
                  <h2 className="text-2xl font-light text-slate-900">{content.wickTitle}</h2>
                </div>
                <p className="mx-auto mb-8 max-w-4xl text-center font-light leading-relaxed text-slate-600">
                  {content.wickIntro}
                </p>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  {content.wickSizes.map((size) => (
                    <div key={size.name} className="rounded-lg bg-slate-50 p-6">
                      <h3 className="mb-2 text-lg font-light text-slate-900">{size.name}</h3>
                      <p className="mb-3 font-light text-slate-600">{size.description}</p>
                      <p className="text-sm italic text-slate-500">{size.note}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="luxury-card rounded-lg p-8 lg:p-10"
              >
                <div className="mb-6 flex items-center justify-center gap-3">
                  <AlertTriangle size={22} strokeWidth={1.5} className="text-slate-700" />
                  <h2 className="text-2xl font-light text-slate-900">{content.troubleshootingTitle}</h2>
                </div>
                <div className="space-y-4">
                  {content.troubleshooting.map((item) => (
                    <div key={item.issue} className="rounded-lg border border-slate-200 bg-white p-5">
                      <h3 className="mb-2 text-base font-medium text-slate-900">{item.issue}</h3>
                      <p className="font-light text-slate-600">{item.solution}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default InstructionsPage;

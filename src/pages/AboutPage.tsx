import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Globe, Heart, Sparkles, Users } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { useLanguage } from '../context/LanguageContext';
import { getSiteUrl } from '../utils/siteConfig';

const AboutPage = () => {
  const { language } = useLanguage();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const content = {
    ro: {
      title: 'Despre noi',
      subtitle: 'Povestea din spatele Atomra Home Romania',
      seoTitle: 'Despre noi | Atomra Home Romania',
      seoDescription:
        'Descoperă povestea Atomra Home Romania, valorile noastre și modul în care construim o experiență mai curată, mai frumoasă și mai sustenabilă pentru iubitorii de lumânări.',
      storyTitle: 'Cum a început',
      storyParagraphs: [
        'Atomra Home Romania a apărut din dorința de a transforma gestul simplu de a aprinde o lumânare într-o experiență mai elegantă, mai sigură și mai sustenabilă.',
        'Ne-a inspirat ideea unui produs care păstrează farmecul decorului cu lumânări, dar reduce risipa produsă de recipientele aruncate și de ceara folosită o singură dată.',
        'Astfel am construit o colecție bazată pe ceară perlată reîncărcabilă, recipiente reutilizabile și o estetică atent aleasă pentru case, evenimente și ritualuri de zi cu zi.',
      ],
      missionTitle: 'Misiunea noastră',
      missionDescription:
        'Vrem să oferim o alternativă premium la lumânările clasice: produse curate, reutilizabile și ușor de personalizat, care aduc atmosferă fără compromis la calitate sau design.',
      valuesTitle: 'Valorile noastre',
      values: [
        {
          title: 'Sustenabilitate',
          description: 'Construim produse gândite pentru reutilizare și pentru un impact mai mic asupra mediului.',
          icon: <Globe size={32} strokeWidth={1.5} className="text-green-600" />,
        },
        {
          title: 'Calitate',
          description: 'Alegem materiale și detalii care oferă o experiență premium, de la aprindere până la prezentare.',
          icon: <Award size={32} strokeWidth={1.5} className="text-amber-600" />,
        },
        {
          title: 'Rafinament',
          description: 'Punem accent pe un design curat și elegant, potrivit atât pentru acasă, cât și pentru evenimente speciale.',
          icon: <Sparkles size={32} strokeWidth={1.5} className="text-slate-700" />,
        },
        {
          title: 'Grijă pentru oameni',
          description: 'Ne dorim ca fiecare comandă să aducă bucurie, liniște și o experiență frumoasă de la început până la final.',
          icon: <Heart size={32} strokeWidth={1.5} className="text-rose-600" />,
        },
      ],
      teamTitle: 'O echipă mică, atentă la detalii',
      teamDescription:
        'În spatele Atomra este o echipă care combină pasiunea pentru design, produse curate și experiențe memorabile. Lucrăm atent la selecția produselor, la prezentare și la fiecare detaliu care ajunge la client.',
      futureTitle: 'Încotro mergem',
      futureDescription:
        'Continuăm să extindem colecția, să rafinăm experiența de cumpărare și să dezvoltăm colaborări pentru decor de interior, cadouri și evenimente. Ne dorim ca Atomra să rămână un brand cald, elegant și ușor de recunoscut.',
    },
    hu: {
      title: 'Rólunk',
      subtitle: 'Az Atomra Home Romania története',
      seoTitle: 'Rólunk | Atomra Home Romania',
      seoDescription:
        'Ismerd meg az Atomra Home Romania történetét, értékeinket és azt, hogyan építünk tisztább, szebb és fenntarthatóbb gyertyaélményt.',
      storyTitle: 'Hogyan indultunk',
      storyParagraphs: [
        'Az Atomra Home Romania abból a vágyból született, hogy a gyertyagyújtás hétköznapi pillanatát elegánsabbá, biztonságosabbá és fenntarthatóbbá tegyük.',
        'Olyan terméket szerettünk volna létrehozni, amely megőrzi a gyertyafény hangulatát, miközben csökkenti az egyszer használatos viasz és a kidobott tartók okozta pazarlást.',
        'Így született meg az újratölthető gyöngyviasz, az újrahasználható tartók és a tudatosan megtervezett vizuális világ kombinációja.',
      ],
      missionTitle: 'Küldetésünk',
      missionDescription:
        'Prémium alternatívát szeretnénk kínálni a hagyományos gyertyák helyett: tiszta, újratölthető és könnyen személyre szabható termékeket, amelyek kompromisszum nélkül teremtenek hangulatot.',
      valuesTitle: 'Értékeink',
      values: [
        {
          title: 'Fenntarthatóság',
          description: 'Olyan termékeket építünk, amelyek az újrahasználatra és a kisebb környezeti terhelésre készülnek.',
          icon: <Globe size={32} strokeWidth={1.5} className="text-green-600" />,
        },
        {
          title: 'Minőség',
          description: 'Anyagokat és részleteket úgy választunk, hogy a teljes élmény prémium legyen.',
          icon: <Award size={32} strokeWidth={1.5} className="text-amber-600" />,
        },
        {
          title: 'Elegancia',
          description: 'A letisztult, finom megjelenést otthonra és különleges alkalmakra is fontosnak tartjuk.',
          icon: <Sparkles size={32} strokeWidth={1.5} className="text-slate-700" />,
        },
        {
          title: 'Törődés',
          description: 'Azt szeretnénk, hogy minden rendelés nyugodt, örömteli és igényes élmény legyen.',
          icon: <Heart size={32} strokeWidth={1.5} className="text-rose-600" />,
        },
      ],
      teamTitle: 'Kis csapat, nagy figyelem',
      teamDescription:
        'Az Atomra mögött egy olyan csapat áll, amely a design, a tiszta termékek és az emlékezetes élmények iránt elkötelezett. Minden részletre figyelünk, a kínálattól a csomagolásig.',
      futureTitle: 'Merre tartunk',
      futureDescription:
        'Tovább bővítjük a kollekciót, finomítjuk a vásárlási élményt, és új együttműködéseket építünk enteriőr, ajándék és eseménydekor területen is.',
    },
    en: {
      title: 'About us',
      subtitle: 'The story behind Atomra Home Romania',
      seoTitle: 'About us | Atomra Home Romania',
      seoDescription:
        'Learn more about Atomra Home Romania, our values, and how we create a cleaner, more refined and more sustainable candle experience.',
      storyTitle: 'How it started',
      storyParagraphs: [
        'Atomra Home Romania began with the idea that lighting a candle should feel elegant, safe and sustainable at the same time.',
        'We wanted to preserve the beauty of candlelight while reducing the waste created by single-use wax and discarded containers.',
        'That vision led us to a curated collection built around refillable pearl wax, reusable vessels and a visual identity designed for homes, gifting and events.',
      ],
      missionTitle: 'Our mission',
      missionDescription:
        'We aim to offer a premium alternative to traditional candles: cleaner, reusable and customizable products that create atmosphere without compromising on quality or design.',
      valuesTitle: 'Our values',
      values: [
        {
          title: 'Sustainability',
          description: 'We build products designed for reuse and for a lighter environmental footprint.',
          icon: <Globe size={32} strokeWidth={1.5} className="text-green-600" />,
        },
        {
          title: 'Quality',
          description: 'We choose materials and details that make the experience feel premium from first light to final presentation.',
          icon: <Award size={32} strokeWidth={1.5} className="text-amber-600" />,
        },
        {
          title: 'Refinement',
          description: 'We care about a clean and elegant aesthetic that fits both everyday living and special occasions.',
          icon: <Sparkles size={32} strokeWidth={1.5} className="text-slate-700" />,
        },
        {
          title: 'Care',
          description: 'We want every order to feel thoughtful, calm and beautifully put together.',
          icon: <Heart size={32} strokeWidth={1.5} className="text-rose-600" />,
        },
      ],
      teamTitle: 'A small team with high standards',
      teamDescription:
        'Behind Atomra is a team that cares deeply about design, clean products and memorable experiences. We work carefully on product selection, presentation and every detail that reaches the customer.',
      futureTitle: 'Where we are going',
      futureDescription:
        'We are continuing to expand the collection, refine the shopping experience and develop new collaborations for interiors, gifting and event styling.',
    },
  }[language === 'hu' ? 'hu' : language === 'en' ? 'en' : 'ro'];

  return (
    <>
      <SEOHead
        title={content.seoTitle}
        description={content.seoDescription}
        keywords="despre atomra, about atomra, rólunk, lumânări sustenabile, refillable candles, ceară perlată"
        url={getSiteUrl('/about')}
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
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="luxury-card p-8 rounded-lg"
              >
                <h2 className="text-2xl font-light text-slate-900 mb-6 text-center">{content.storyTitle}</h2>
                <div className="space-y-4 max-w-4xl mx-auto">
                  {content.storyParagraphs.map((paragraph) => (
                    <p key={paragraph} className="text-slate-600 font-light leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="luxury-card p-8 rounded-lg"
              >
                <h2 className="text-2xl font-light text-slate-900 mb-6 text-center">{content.missionTitle}</h2>
                <p className="text-slate-600 font-light leading-relaxed text-center max-w-4xl mx-auto">
                  {content.missionDescription}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h2 className="text-2xl font-light text-slate-900 mb-8 text-center">{content.valuesTitle}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {content.values.map((value) => (
                    <div key={value.title} className="luxury-card p-6 rounded-lg text-center">
                      <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                        {value.icon}
                      </div>
                      <h3 className="text-lg font-light text-slate-900 mb-2">{value.title}</h3>
                      <p className="text-slate-600 font-light">{value.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              >
                <div className="luxury-card p-8 rounded-lg">
                  <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mb-5 mx-auto">
                    <Users size={28} strokeWidth={1.5} className="text-slate-700" />
                  </div>
                  <h2 className="text-2xl font-light text-slate-900 mb-5 text-center">{content.teamTitle}</h2>
                  <p className="text-slate-600 font-light leading-relaxed text-center">{content.teamDescription}</p>
                </div>

                <div className="luxury-card p-8 rounded-lg">
                  <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mb-5 mx-auto">
                    <Sparkles size={28} strokeWidth={1.5} className="text-slate-700" />
                  </div>
                  <h2 className="text-2xl font-light text-slate-900 mb-5 text-center">{content.futureTitle}</h2>
                  <p className="text-slate-600 font-light leading-relaxed text-center">{content.futureDescription}</p>
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default AboutPage;

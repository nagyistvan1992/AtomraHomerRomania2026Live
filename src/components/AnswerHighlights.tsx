import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const AnswerHighlights = () => {
  const { language } = useLanguage();

  const content = {
    ro: {
      title: 'Răspunsuri rapide',
      subtitle:
        'Blocuri scurte și clare pentru cele mai importante întrebări pe care le au clienții înainte să cumpere.',
      items: [
        {
          title: 'Ce vinde Atomra?',
          answer:
            'Atomra oferă lumânări reîncărcabile din ceară naturală și sisteme cu perle de ceară pentru casă, cadouri și evenimente.',
          cta: 'Vezi ghidul despre lumânări refillabile',
          href: '/lumanari-refillabile',
        },
        {
          title: 'Cum funcționează sistemul refillable?',
          answer:
            'Torni granulele de ceară într-un recipient, adaugi fitilul, aprinzi și reîmprospătezi ușor prin completare atunci când este nevoie.',
          cta: 'Află mai multe despre ceara de nisip',
          href: '/ceara-de-nisip',
        },
        {
          title: 'Pentru ce tip de client este potrivit?',
          answer:
            'Pentru clienți care caută decor elegant, reutilizare, cadouri cu impact și soluții premium pentru mese, nunți sau ambient interior.',
          cta: 'Vezi pagina pentru lumânări de eveniment',
          href: '/lumanari-pentru-evenimente',
        },
      ],
    },
    hu: {
      title: 'Gyors válaszok',
      subtitle:
        'Rövid és világos válaszblokkok azokhoz a kérdésekhez, amelyeket a vásárlók leggyakrabban feltesznek rendelés előtt.',
      items: [
        {
          title: 'Mit kínál az Atomra?',
          answer:
            'Az Atomra újratölthető természetes viaszgyertyákat és viaszgyöngy-rendszereket kínál otthonra, ajándékba és eseményekre.',
          cta: 'Újratölthető gyertyák útmutatója',
          href: '/lumanari-refillabile',
        },
        {
          title: 'Hogyan működik az újratölthető rendszer?',
          answer:
            'A viaszgyöngyöket edénybe öntöd, behelyezed a kanócot, meggyújtod, majd szükség esetén egyszerűen újratöltöd.',
          cta: 'Tudj meg többet a gyöngyviaszról',
          href: '/ceara-de-nisip',
        },
        {
          title: 'Kinek ideális?',
          answer:
            'Azoknak, akik elegáns dekorációt, újrahasználhatóságot, különleges ajándékot vagy prémium asztali hangulatot keresnek.',
          cta: 'Eseménydekor inspirációk',
          href: '/lumanari-pentru-evenimente',
        },
      ],
    },
    en: {
      title: 'Quick answers',
      subtitle:
        'Short, direct answer blocks for the most important questions shoppers ask before buying.',
      items: [
        {
          title: 'What does Atomra sell?',
          answer:
            'Atomra offers refillable natural wax candles and wax pearl systems for home styling, gifting, and events.',
          cta: 'See the refillable candle guide',
          href: '/lumanari-refillabile',
        },
        {
          title: 'How does the refillable system work?',
          answer:
            'You pour the wax pearls into a vessel, add the wick, light it, and refresh the setup easily by topping it up when needed.',
          cta: 'Learn about sand wax candles',
          href: '/ceara-de-nisip',
        },
        {
          title: 'Who is it best for?',
          answer:
            'It suits customers looking for elegant decor, reusability, premium gifting, and candle styling for tables, weddings, and interiors.',
          cta: 'See event candle ideas',
          href: '/lumanari-pentru-evenimente',
        },
      ],
    },
  }[language];

  return (
    <section className="luxury-section-light py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-extralight tracking-tight text-slate-900 sm:text-4xl">
            {content.title}
          </h2>
          <div className="mx-auto mb-5 h-px w-16 bg-slate-300" />
          <p className="mx-auto max-w-3xl text-lg font-light leading-relaxed text-slate-600">
            {content.subtitle}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {content.items.map((item) => (
            <article key={item.title} className="luxury-card rounded-lg p-6 sm:p-8">
              <h3 className="mb-3 text-xl font-light text-slate-900">{item.title}</h3>
              <p className="text-sm font-light leading-7 text-slate-600">{item.answer}</p>
              <Link
                to={item.href}
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-slate-900 transition hover:text-slate-700"
              >
                <span>{item.cta}</span>
                <ArrowRight size={16} strokeWidth={1.8} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnswerHighlights;

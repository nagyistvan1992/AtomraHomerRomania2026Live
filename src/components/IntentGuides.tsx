import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const guides = [
  {
    title: 'Lumânări din ceară naturală',
    description:
      'O pagină orientată spre cei care caută lumânări curate, elegante și potrivite pentru decor interior premium.',
    href: '/lumanari-ceara-naturala',
    cta: 'Vezi pagina',
  },
  {
    title: 'Cadouri cu lumânări premium',
    description:
      'Idei pentru housewarming, aniversări și cadouri elegante care au prezență vizuală și valoare reală.',
    href: '/cadouri-lumanari-premium',
    cta: 'Explorează ideile de cadou',
  },
  {
    title: 'Cum funcționează lumânările refillabile',
    description:
      'Un ghid clar pentru cei care vor să înțeleagă rapid sistemul, beneficiile și modul de folosire.',
    href: '/ghid/cum-functioneaza-lumanarile-refillabile',
    cta: 'Citește ghidul',
  },
];

const IntentGuides = () => {
  return (
    <section className="luxury-section-dark py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-extralight tracking-tight text-slate-900 sm:text-4xl">
            Ghiduri și pagini utile
          </h2>
          <div className="mx-auto mb-5 h-px w-16 bg-slate-300" />
          <p className="mx-auto max-w-3xl text-lg font-light leading-relaxed text-slate-600">
            Resurse construite pentru întrebările reale pe care le au clienții înainte să cumpere.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {guides.map((guide) => (
            <article key={guide.href} className="luxury-card rounded-lg p-6 sm:p-8">
              <h3 className="mb-3 text-xl font-light text-slate-900">{guide.title}</h3>
              <p className="text-sm font-light leading-7 text-slate-600">{guide.description}</p>
              <Link
                to={guide.href}
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-slate-900 transition hover:text-slate-700"
              >
                <span>{guide.cta}</span>
                <ArrowRight size={16} strokeWidth={1.8} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntentGuides;

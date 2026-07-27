import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const guides = [
  {
    title: 'Lumânări refillabile vs clasice',
    description:
      'Compară flexibilitatea, reutilizarea și experiența decorativă înainte să alegi varianta potrivită pentru casa ta.',
    href: '/comparatie/lumanari-refillabile-vs-clasice',
    cta: 'Vezi comparația',
  },
  {
    title: 'Ceară de soia vs ceară de nisip',
    description:
      'Clarifică rapid diferența dintre material și format, ca să alegi soluția bună pentru decor și utilizare.',
    href: '/comparatie/ceara-de-soia-vs-ceara-de-nisip',
    cta: 'Citește comparația',
  },
  {
    title: 'Decor de eveniment cu lumânări refillabile',
    description:
      'O pagină construită pentru cei care caută o variantă mai coerentă și mai premium pentru nunți și mese festive.',
    href: '/comparatie/decor-eveniment-cu-lumanari-refillabile',
    cta: 'Vezi analiza',
  },
];

const ComparisonGuides = () => {
  return (
    <section className="luxury-section-light py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-extralight tracking-tight text-slate-900 sm:text-4xl">
            Comparații utile înainte de cumpărare
          </h2>
          <div className="mx-auto mb-5 h-px w-16 bg-slate-300" />
          <p className="mx-auto max-w-3xl text-lg font-light leading-relaxed text-slate-600">
            Pagini construite pentru întrebările de decizie care apar chiar înainte de comandă.
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

export default ComparisonGuides;

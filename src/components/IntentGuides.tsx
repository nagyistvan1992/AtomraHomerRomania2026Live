import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const guides = [
  {
    title: 'Lumanari naturale',
    description:
      'Pentru cautari precum lumanari naturale, lumanare naturala sau lumanari din ceara de soia.',
    href: '/lumanari-ceara-naturala',
    cta: 'Vezi pagina',
  },
  {
    title: 'Lumanari nunta',
    description:
      'Pentru cei care cauta decor elegant pentru nunta, botez sau evenimente cu impact vizual clar.',
    href: '/lumanari-pentru-evenimente',
    cta: 'Exploreaza colectia',
  },
  {
    title: 'Lumanari handmade',
    description:
      'Pentru intentii in care clientul cauta o lumanare cu aspect artizanal, premium si potrivita pentru cadou.',
    href: '/lumanari-handmade',
    cta: 'Descopera optiunile',
  },
  {
    title: 'Cadouri personalizate',
    description:
      'Pentru cautari de tip idei cadouri personalizate, cadouri premium si gesturi elegante pentru acasa.',
    href: '/cadouri-lumanari-premium',
    cta: 'Vezi ideile',
  },
];

const IntentGuides = () => {
  return (
    <section className="luxury-section-dark py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-extralight tracking-tight text-slate-900 sm:text-4xl">
            Ghiduri si pagini utile
          </h2>
          <div className="mx-auto mb-5 h-px w-16 bg-slate-300" />
          <p className="mx-auto max-w-3xl text-lg font-light leading-relaxed text-slate-600">
            Pagini construite pentru intrebarile si cautarile reale pe care le au clientii inainte sa cumpere.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
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

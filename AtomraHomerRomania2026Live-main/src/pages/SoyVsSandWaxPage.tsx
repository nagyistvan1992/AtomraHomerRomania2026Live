import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { getSiteUrl } from '../utils/siteConfig';
import { generateBreadcrumbStructuredData, generateFAQStructuredData } from '../utils/seoUtils';

const faqItems = [
  {
    question: 'Este ceara de soia același lucru cu ceara de nisip?',
    answer:
      'Nu. Ceara de soia descrie materia primă, în timp ce ceara de nisip descrie mai degrabă forma granulară și modul de utilizare în recipient.',
  },
  {
    question: 'Când este mai potrivită ceara de nisip?',
    answer:
      'Este mai potrivită când vrei flexibilitate de decor, refill, reutilizare și control asupra prezentării în vase diferite.',
  },
  {
    question: 'Ce caută de fapt clientul când compară aceste două opțiuni?',
    answer:
      'De obicei caută combinația dintre estetică, material, ușurință de folosire și posibilitatea de a adapta lumânarea la spațiu sau ocazie.',
  },
];

const SoyVsSandWaxPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const structuredData = `[${generateBreadcrumbStructuredData([
    { name: 'Home', url: getSiteUrl('/') },
    { name: 'Comparație', url: getSiteUrl('/comparatie/ceara-de-soia-vs-ceara-de-nisip') },
    { name: 'Ceară de soia vs ceară de nisip', url: getSiteUrl('/comparatie/ceara-de-soia-vs-ceara-de-nisip') },
  ])},${generateFAQStructuredData(faqItems)}]`;

  return (
    <>
      <SEOHead
        title="Ceară de soia vs ceară de nisip | Comparație Atomra"
        description="Înțelege diferența dintre ceara de soia și ceara de nisip pentru lumânări: material, formă, flexibilitate și scenarii de folosire."
        keywords="ceara de soia vs ceara de nisip, comparatie ceara lumanari, wax pearls, ceara naturala"
        url={getSiteUrl('/comparatie/ceara-de-soia-vs-ceara-de-nisip')}
        structuredData={structuredData}
      />

      <div className="luxury-page-bg min-h-screen pt-32 sm:pt-36 md:pt-40">
        <section className="luxury-section-light py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-6 text-center sm:px-8 lg:px-12">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-slate-500">Comparatie de concepte</p>
            <h1 className="mb-6 text-4xl font-extralight tracking-tight text-slate-900 sm:text-5xl">
              Ceară de soia vs ceară de nisip
            </h1>
            <p className="mx-auto max-w-3xl text-lg font-light leading-relaxed text-slate-600">
              Diferența nu este doar de nume. Ceara de soia ține de material, iar ceara de nisip ține de forma
              în care folosești ceara pentru un decor mai flexibil și mai ușor de refăcut.
            </p>
          </div>
        </section>

        <section className="luxury-section-dark py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 grid gap-8 md:grid-cols-2">
            <article className="luxury-card rounded-lg p-8">
              <h2 className="mb-4 text-2xl font-light text-slate-900">Ceară de soia</h2>
              <p className="font-light leading-7 text-slate-600">
                Este unul dintre reperele importante când oamenii caută lumânări naturale. Accentul cade pe material,
                pe percepția de produs mai curat și pe poziționarea premium.
              </p>
            </article>
            <article className="luxury-card rounded-lg p-8">
              <h2 className="mb-4 text-2xl font-light text-slate-900">Ceară de nisip</h2>
              <p className="font-light leading-7 text-slate-600">
                Accentul cade pe formatul granular și pe experiența de utilizare. Este foarte bună pentru decor,
                refill și folosirea în recipiente diferite, mai ales la evenimente și home styling.
              </p>
            </article>
          </div>
        </section>

        <section className="luxury-section-light py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
            <div className="luxury-card rounded-lg p-8 sm:p-10">
              <h2 className="mb-6 text-3xl font-extralight text-slate-900">Cum alegi în practică</h2>
              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <h3 className="mb-3 text-xl font-light text-slate-900">Pentru material</h3>
                  <p className="font-light leading-7 text-slate-600">Dacă te interesează în primul rând compoziția și categoria „natural”.</p>
                </div>
                <div>
                  <h3 className="mb-3 text-xl font-light text-slate-900">Pentru decor</h3>
                  <p className="font-light leading-7 text-slate-600">Dacă vrei libertate de aranjare și un setup mai adaptabil, ceara de nisip devine foarte relevantă.</p>
                </div>
                <div>
                  <h3 className="mb-3 text-xl font-light text-slate-900">Pentru evenimente</h3>
                  <p className="font-light leading-7 text-slate-600">Când ai multe mese sau recipiente, forma granulară este de obicei mai practică și mai coerentă vizual.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="luxury-section-dark py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12 space-y-4">
            {faqItems.map((item) => (
              <article key={item.question} className="luxury-card rounded-lg p-6">
                <h3 className="mb-3 text-lg font-light text-slate-900">{item.question}</h3>
                <p className="font-light leading-7 text-slate-600">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="luxury-section-light py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-6 text-center sm:px-8 lg:px-12">
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link to="/ceara-de-nisip" className="rounded-full bg-slate-900 px-8 py-3 text-sm font-medium text-white transition hover:bg-slate-800">
                Vezi pagina ceară de nisip
              </Link>
              <Link to="/lumanari-ceara-naturala" className="rounded-full border border-slate-300 px-8 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-900">
                Vezi pagina ceară naturală
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SoyVsSandWaxPage;

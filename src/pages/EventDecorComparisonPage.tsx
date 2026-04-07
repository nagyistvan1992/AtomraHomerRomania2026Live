import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { getSiteUrl } from '../utils/siteConfig';
import { generateBreadcrumbStructuredData, generateFAQStructuredData } from '../utils/seoUtils';

const faqItems = [
  {
    question: 'De ce sunt lumânările refillabile potrivite pentru decor de eveniment?',
    answer:
      'Pentru că oferă uniformitate, flexibilitate și un aspect premium ușor de adaptat pe mai multe mese sau zone de decor.',
  },
  {
    question: 'Sunt mai bune decât lumânările standard pentru mese multe?',
    answer:
      'În multe cazuri, da. Mai ales când contează coerența vizuală și viteza cu care poți pregăti recipiente similare într-un număr mare.',
  },
  {
    question: 'Pentru ce tipuri de evenimente au cel mai mult sens?',
    answer:
      'Pentru nunți, botezuri, cine private, recepții și evenimente corporate în care atmosfera și prezentarea contează aproape la fel de mult ca funcția practică.',
  },
];

const EventDecorComparisonPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const structuredData = `[${generateBreadcrumbStructuredData([
    { name: 'Home', url: getSiteUrl('/') },
    { name: 'Comparație', url: getSiteUrl('/comparatie/decor-eveniment-cu-lumanari-refillabile') },
    {
      name: 'Decor eveniment cu lumânări refillabile',
      url: getSiteUrl('/comparatie/decor-eveniment-cu-lumanari-refillabile'),
    },
  ])},${generateFAQStructuredData(faqItems)}]`;

  return (
    <>
      <SEOHead
        title="Decor de eveniment cu lumânări refillabile | Atomra"
        description="Află de ce lumânările refillabile sunt o alegere puternică pentru decor de eveniment, nunți și mese elegante."
        keywords="decor eveniment cu lumanari refillabile, lumanari eveniment premium, lumanari nunta decor"
        url={getSiteUrl('/comparatie/decor-eveniment-cu-lumanari-refillabile')}
        structuredData={structuredData}
      />

      <div className="luxury-page-bg min-h-screen pt-32 sm:pt-36 md:pt-40">
        <section className="luxury-section-light py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-6 text-center sm:px-8 lg:px-12">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-slate-500">Comparatie pentru evenimente</p>
            <h1 className="mb-6 text-4xl font-extralight tracking-tight text-slate-900 sm:text-5xl">
              Decor de eveniment cu lumânări refillabile
            </h1>
            <p className="mx-auto max-w-3xl text-lg font-light leading-relaxed text-slate-600">
              Pentru evenimente, lumânările refillabile au un avantaj clar atunci când vrei mese coerente, vase
              multiple și un decor care arată premium fără să fie rigid.
            </p>
          </div>
        </section>

        <section className="luxury-section-dark py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 grid gap-8 md:grid-cols-3">
            <article className="luxury-card rounded-lg p-8">
              <h2 className="mb-4 text-2xl font-light text-slate-900">Mai ușor de repetat</h2>
              <p className="font-light leading-7 text-slate-600">Când ai mai multe mese, ai nevoie de o soluție care poate fi repetată elegant și rapid, fără diferențe vizuale majore.</p>
            </article>
            <article className="luxury-card rounded-lg p-8">
              <h2 className="mb-4 text-2xl font-light text-slate-900">Mai adaptabile</h2>
              <p className="font-light leading-7 text-slate-600">Se potrivesc mai bine în recipiente diferite și pot fi integrate atât în setup-uri minimaliste, cât și în decoruri bogate.</p>
            </article>
            <article className="luxury-card rounded-lg p-8">
              <h2 className="mb-4 text-2xl font-light text-slate-900">Mai memorabile</h2>
              <p className="font-light leading-7 text-slate-600">Rezultatul final are de multe ori o prezență mai sofisticată, ceea ce contează enorm în foto, video și experiența invitaților.</p>
            </article>
          </div>
        </section>

        <section className="luxury-section-light py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
            <div className="luxury-card rounded-lg p-8 sm:p-10">
              <h2 className="mb-6 text-3xl font-extralight text-slate-900">Când merită cel mai mult</h2>
              <p className="font-light leading-7 text-slate-600">
                Pentru nunți, botezuri și recepții unde vrei decor aerisit, cald și coerent pe toate mesele. Este
                o soluție foarte bună și pentru zone de welcome table, candy bar sau colțuri ambientale.
              </p>
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
              <Link to="/events-collection" className="rounded-full bg-slate-900 px-8 py-3 text-sm font-medium text-white transition hover:bg-slate-800">
                Vezi colecția de evenimente
              </Link>
              <Link to="/lumanari-pentru-evenimente" className="rounded-full border border-slate-300 px-8 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-900">
                Vezi pagina de evenimente
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default EventDecorComparisonPage;

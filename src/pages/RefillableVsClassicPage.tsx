import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { getSiteUrl } from '../utils/siteConfig';
import { generateBreadcrumbStructuredData, generateFAQStructuredData } from '../utils/seoUtils';

const faqItems = [
  {
    question: 'Care este diferența principală între lumânările refillabile și cele clasice?',
    answer:
      'Diferența principală este reutilizarea recipientului și flexibilitatea decorului. La sistemul refillable poți reface compoziția și păstra mai ușor un setup premium în timp.',
  },
  {
    question: 'Cine ar trebui să aleagă varianta refillabilă?',
    answer:
      'Este ideală pentru cei care pun accent pe decor, reutilizare, experiență premium și posibilitatea de a adapta lumânarea la spațiu sau eveniment.',
  },
  {
    question: 'Când este suficientă o lumânare clasică?',
    answer:
      'Lumânarea clasică poate fi suficientă dacă vrei un produs simplu, rapid și fără intenția de a păstra sau reconfigura decorul după utilizare.',
  },
];

const RefillableVsClassicPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const structuredData = `[${generateBreadcrumbStructuredData([
    { name: 'Home', url: getSiteUrl('/') },
    { name: 'Comparație', url: getSiteUrl('/comparatie/lumanari-refillabile-vs-clasice') },
    { name: 'Lumânări refillabile vs clasice', url: getSiteUrl('/comparatie/lumanari-refillabile-vs-clasice') },
  ])},${generateFAQStructuredData(faqItems)}]`;

  return (
    <>
      <SEOHead
        title="Lumânări refillabile vs clasice | Comparație Atomra"
        description="Vezi diferențele dintre lumânările refillabile și lumânările clasice: decor, flexibilitate, reutilizare și experiență premium."
        keywords="lumanari refillabile vs clasice, comparatie lumanari, lumanari premium, lumanari reutilizabile"
        url={getSiteUrl('/comparatie/lumanari-refillabile-vs-clasice')}
        structuredData={structuredData}
      />

      <div className="luxury-page-bg min-h-screen pt-32 sm:pt-36 md:pt-40">
        <section className="luxury-section-light py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-6 text-center sm:px-8 lg:px-12">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-slate-500">Comparatie de cumpărare</p>
            <h1 className="mb-6 text-4xl font-extralight tracking-tight text-slate-900 sm:text-5xl">
              Lumânări refillabile vs lumânări clasice
            </h1>
            <p className="mx-auto max-w-3xl text-lg font-light leading-relaxed text-slate-600">
              Dacă urmărești decor elegant și flexibilitate, sistemul refillable are avantaje clare. Dacă vrei doar
              o soluție simplă, rapidă și de consum, varianta clasică poate fi suficientă.
            </p>
          </div>
        </section>

        <section className="luxury-section-dark py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
            <div className="grid gap-8 md:grid-cols-2">
              <article className="luxury-card rounded-lg p-8">
                <h2 className="mb-6 text-2xl font-light text-slate-900">Lumânări refillabile</h2>
                <ul className="space-y-4 text-slate-600">
                  <li className="font-light leading-7">Păstrezi recipientul și refaci decorul în timp.</li>
                  <li className="font-light leading-7">Mai potrivite pentru interioare curate și setup-uri premium.</li>
                  <li className="font-light leading-7">Mai mult control asupra volumului și prezentării.</li>
                  <li className="font-light leading-7">Foarte bune pentru cadouri și evenimente.</li>
                </ul>
              </article>

              <article className="luxury-card rounded-lg p-8">
                <h2 className="mb-6 text-2xl font-light text-slate-900">Lumânări clasice</h2>
                <ul className="space-y-4 text-slate-600">
                  <li className="font-light leading-7">Sunt simple și ușor de folosit imediat.</li>
                  <li className="font-light leading-7">Pot fi bune pentru utilizare ocazională, fără pretenții mari de decor.</li>
                  <li className="font-light leading-7">Oferă mai puțină flexibilitate după consum.</li>
                  <li className="font-light leading-7">Sunt mai puțin potrivite când vrei un sistem reutilizabil și elegant.</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="luxury-section-light py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
            <div className="luxury-card rounded-lg p-8 sm:p-10">
              <h2 className="mb-6 text-3xl font-extralight text-slate-900">Când merită să alegi refillable</h2>
              <p className="font-light leading-7 text-slate-600">
                Dacă vrei o piesă decorativă care să rămână în spațiul tău, să poată fi reîmprospătată și să
                susțină o atmosferă premium, refillable este alegerea mai bună. Este mai ales relevant pentru
                home styling, mese festive, cadouri și decor de eveniment.
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
            <h2 className="mb-4 text-3xl font-extralight text-slate-900">Vezi sistemul Atomra în practică</h2>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link to="/lumanari-refillabile" className="rounded-full bg-slate-900 px-8 py-3 text-sm font-medium text-white transition hover:bg-slate-800">
                Vezi pagina refillable
              </Link>
              <Link to="/toate-produsele" className="rounded-full border border-slate-300 px-8 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-900">
                Vezi toate produsele
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default RefillableVsClassicPage;

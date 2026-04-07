import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { getSiteUrl } from '../utils/siteConfig';
import { generateBreadcrumbStructuredData, generateFAQStructuredData } from '../utils/seoUtils';

const faqItems = [
  {
    question: 'Cum funcționează lumânările refillabile?',
    answer:
      'Funcționează prin reutilizarea recipientului. Adaugi ceara granulară sau perlele de ceară, poziționezi fitilul și aprinzi. Când vrei să refaci decorul, completezi sau înlocuiești conținutul.',
  },
  {
    question: 'Este greu de folosit prima dată?',
    answer:
      'Nu. Tocmai simplitatea este unul dintre avantajele principale. Ai nevoie de recipientul potrivit, ceară și fitil, apoi procesul este foarte intuitiv.',
  },
  {
    question: 'De ce preferă oamenii acest sistem?',
    answer:
      'Pentru flexibilitate, estetică și reutilizare. Este o soluție mai adaptabilă decât o lumânare clasică turnată, mai ales pentru decor interior și setup-uri speciale.',
  },
];

const RefillableGuidePage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const structuredData = `[${generateBreadcrumbStructuredData([
    { name: 'Home', url: getSiteUrl('/') },
    { name: 'Ghid', url: getSiteUrl('/ghid/cum-functioneaza-lumanarile-refillabile') },
    {
      name: 'Cum funcționează lumânările refillabile',
      url: getSiteUrl('/ghid/cum-functioneaza-lumanarile-refillabile'),
    },
  ])},${generateFAQStructuredData(faqItems)}]`;

  return (
    <>
      <SEOHead
        title="Cum funcționează lumânările refillabile | Ghid Atomra"
        description="Află cum funcționează lumânările refillabile, cum se folosesc și de ce sunt apreciate pentru decor premium, casă și evenimente."
        keywords="cum functioneaza lumanarile refillabile, ghid lumanari refillabile, cum folosesti ceara de nisip, perle de ceara"
        url={getSiteUrl('/ghid/cum-functioneaza-lumanarile-refillabile')}
        structuredData={structuredData}
      />

      <div className="luxury-page-bg min-h-screen pt-32 sm:pt-36 md:pt-40">
        <section className="luxury-section-light py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-6 text-center sm:px-8 lg:px-12">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-slate-500">Ghid practic</p>
            <h1 className="mb-6 text-4xl font-extralight tracking-tight text-slate-900 sm:text-5xl">
              Cum funcționează lumânările refillabile
            </h1>
            <p className="mx-auto max-w-3xl text-lg font-light leading-relaxed text-slate-600">
              Lumânările refillabile funcționează simplu: păstrezi recipientul, adaugi ceara și fitilul, aprinzi,
              apoi reîmprospătezi decorul atunci când este nevoie. Asta le face potrivite pentru acasă, cadouri și evenimente.
            </p>
          </div>
        </section>

        <section className="luxury-section-dark py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
            <div className="grid gap-8 md:grid-cols-3">
              <article className="luxury-card rounded-lg p-8">
                <h2 className="mb-4 text-2xl font-light text-slate-900">1. Alegi vasul</h2>
                <p className="font-light leading-7 text-slate-600">
                  Recipientul contează mult pentru aspectul final. Poate fi minimalist, decorativ sau potrivit
                  pentru un eveniment, în funcție de stilul pe care îl urmărești.
                </p>
              </article>
              <article className="luxury-card rounded-lg p-8">
                <h2 className="mb-4 text-2xl font-light text-slate-900">2. Adaugi ceara și fitilul</h2>
                <p className="font-light leading-7 text-slate-600">
                  Torni perlele de ceară sau ceara de nisip în recipient și fixezi fitilul. De aici, lumânarea este
                  pregătită pentru aprindere și integrare în decor.
                </p>
              </article>
              <article className="luxury-card rounded-lg p-8">
                <h2 className="mb-4 text-2xl font-light text-slate-900">3. Reîmprospătezi când vrei</h2>
                <p className="font-light leading-7 text-slate-600">
                  Când vrei să refaci aspectul, completezi materialul sau reorganizezi compoziția. Exact aici apare
                  diferența mare față de o lumânare clasică de unică folosință.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="luxury-section-light py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
            <div className="luxury-card rounded-lg p-8 sm:p-10">
              <h2 className="mb-6 text-3xl font-extralight text-slate-900">De ce sistemul este atât de apreciat</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="mb-3 text-xl font-light text-slate-900">Mai mult control vizual</h3>
                  <p className="font-light leading-7 text-slate-600">
                    Poți schimba recipientul, poți adapta volumul și poți păstra o estetică mult mai apropiată de
                    restul decorului decât cu o lumânare clasică.
                  </p>
                </div>
                <div>
                  <h3 className="mb-3 text-xl font-light text-slate-900">Reutilizare simplă</h3>
                  <p className="font-light leading-7 text-slate-600">
                    Tocmai pentru că vasul rămâne și doar refaci conținutul, experiența este mai practică și mai
                    potrivită pentru folosire repetată.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="luxury-section-dark py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
            <div className="mb-10 text-center">
              <h2 className="mb-4 text-3xl font-extralight text-slate-900">Întrebări frecvente</h2>
              <p className="mx-auto max-w-3xl font-light leading-7 text-slate-600">
                Cele mai comune întrebări despre folosirea lumânărilor refillabile.
              </p>
            </div>
            <div className="space-y-4">
              {faqItems.map((item) => (
                <article key={item.question} className="luxury-card rounded-lg p-6">
                  <h3 className="mb-3 text-lg font-light text-slate-900">{item.question}</h3>
                  <p className="font-light leading-7 text-slate-600">{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="luxury-section-light py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-6 text-center sm:px-8 lg:px-12">
            <h2 className="mb-4 text-3xl font-extralight text-slate-900">Vezi un exemplu concret</h2>
            <p className="mb-8 font-light leading-7 text-slate-600">
              Dacă vrei să înțelegi sistemul direct din produs, începe cu Granule Box sau vezi întreaga colecție refillabilă.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/product/granule-box-750g"
                className="rounded-full bg-slate-900 px-8 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Vezi Granule Box
              </Link>
              <Link
                to="/refillable"
                className="rounded-full border border-slate-300 px-8 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
              >
                Vezi pagina refillable
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default RefillableGuidePage;

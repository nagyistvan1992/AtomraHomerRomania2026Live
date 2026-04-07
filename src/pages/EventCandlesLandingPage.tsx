import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { getSiteUrl } from '../utils/siteConfig';
import { generateBreadcrumbStructuredData, generateFAQStructuredData } from '../utils/seoUtils';

const faqItems = [
  {
    question: 'Ce tip de lumânări sunt potrivite pentru evenimente?',
    answer:
      'Pentru evenimente sunt potrivite lumânările care arată curat, pot fi aranjate ușor în mai multe recipiente și permit un decor coerent pe mese, candy bar sau zone de atmosferă.',
  },
  {
    question: 'Sunt bune pentru nunți și botezuri?',
    answer:
      'Da. Sistemele Atomra sunt foarte potrivite pentru nunți, botezuri, aniversări și evenimente private în care contează atât atmosfera, cât și prezentarea premium.',
  },
  {
    question: 'Pot primi recomandare pentru setup?',
    answer:
      'Da. Dacă vrei o variantă mai clară pentru număr de mese, tip de recipient sau volum de ceară, cea mai bună opțiune este să ne contactezi direct.',
  },
];

const EventCandlesLandingPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const structuredData = `[${generateBreadcrumbStructuredData([
    { name: 'Home', url: getSiteUrl('/') },
    { name: 'Lumânări pentru evenimente', url: getSiteUrl('/lumanari-pentru-evenimente') },
  ])},${generateFAQStructuredData(faqItems)}]`;

  return (
    <>
      <SEOHead
        title="Lumânări pentru evenimente | Atomra Home Romania"
        description="Lumânări pentru evenimente, nunți și decor premium. Descoperă soluțiile Atomra pentru mese elegante, atmosferă rafinată și setup-uri refillabile."
        keywords="lumânări pentru evenimente, lumanari nunta, lumanari botez, lumanari premium evenimente, decor mese lumanari"
        url={getSiteUrl('/lumanari-pentru-evenimente')}
        structuredData={structuredData}
      />

      <div className="luxury-page-bg min-h-screen pt-32 sm:pt-36 md:pt-40">
        <section className="luxury-section-light py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-6 text-center sm:px-8 lg:px-12">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-slate-500">Decor pentru evenimente</p>
            <h1 className="mb-6 text-4xl font-extralight tracking-tight text-slate-900 sm:text-5xl">
              Lumânări pentru evenimente cu aspect premium și atmosferă coerentă
            </h1>
            <p className="mx-auto max-w-3xl text-lg font-light leading-relaxed text-slate-600">
              Dacă ai nevoie de lumânări pentru evenimente, cel mai important este să obții un rezultat elegant,
              ușor de pregătit și potrivit cu stilul întregului decor. Atomra este construit exact pentru acest
              tip de atmosferă.
            </p>
          </div>
        </section>

        <section className="luxury-section-dark py-12 sm:py-16">
          <div className="mx-auto grid max-w-6xl gap-8 px-6 sm:px-8 lg:grid-cols-3 lg:px-12">
            <article className="luxury-card rounded-lg p-8">
              <h2 className="mb-4 text-2xl font-light text-slate-900">Uniformitate pe mese</h2>
              <p className="font-light leading-7 text-slate-600">
                Pentru nunți și evenimente private, consistența vizuală contează enorm. Sistemele pe bază de
                ceară granulară ajută la construirea unui decor ordonat și elegant pe mai multe mese.
              </p>
            </article>

            <article className="luxury-card rounded-lg p-8">
              <h2 className="mb-4 text-2xl font-light text-slate-900">Flexibilitate de setup</h2>
              <p className="font-light leading-7 text-slate-600">
                Poți adapta recipientele, dimensiunile și volumul în funcție de tema evenimentului fără să pierzi
                coerența designului. Este util atât pentru setup-uri intime, cât și pentru spații ample.
              </p>
            </article>

            <article className="luxury-card rounded-lg p-8">
              <h2 className="mb-4 text-2xl font-light text-slate-900">Impresie premium</h2>
              <p className="font-light leading-7 text-slate-600">
                O lumânare bine integrată în decor transmite rafinament. În evenimente, nu este doar lumină, ci
                parte din identitatea vizuală a întregii experiențe.
              </p>
            </article>
          </div>
        </section>

        <section className="luxury-section-light py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
            <div className="luxury-card rounded-lg p-8 sm:p-10">
              <h2 className="mb-6 text-3xl font-extralight text-slate-900">Pentru ce tipuri de evenimente</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="mb-3 text-xl font-light text-slate-900">Nunți, botezuri, aniversări</h3>
                  <p className="font-light leading-7 text-slate-600">
                    Pentru evenimente emoționale în care atmosfera trebuie să rămână caldă, elegantă și coerentă în
                    toate zonele importante ale decorului.
                  </p>
                </div>
                <div>
                  <h3 className="mb-3 text-xl font-light text-slate-900">Corporate și hospitality</h3>
                  <p className="font-light leading-7 text-slate-600">
                    Pentru cine, recepții, lansări sau locații care vor o prezentare mai rafinată și mai memorabilă
                    decât lumânarea clasică standard.
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
                Câteva clarificări utile înainte să alegi lumânările potrivite pentru evenimentul tău.
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
            <h2 className="mb-4 text-3xl font-extralight text-slate-900">Discută cu noi sau vezi colecția</h2>
            <p className="mb-8 font-light leading-7 text-slate-600">
              Dacă vrei să pornești rapid, vezi colecția dedicată evenimentelor. Dacă ai nevoie de recomandare,
              contactează-ne și îți spunem ce setup se potrivește cel mai bine.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/events-collection"
                className="rounded-full bg-slate-900 px-8 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Vezi colecția de evenimente
              </Link>
              <Link
                to="/contact"
                className="rounded-full border border-slate-300 px-8 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
              >
                Cere o recomandare
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default EventCandlesLandingPage;

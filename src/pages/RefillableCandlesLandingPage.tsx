import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { getSiteUrl } from '../utils/siteConfig';
import { generateBreadcrumbStructuredData, generateFAQStructuredData } from '../utils/seoUtils';

const faqItems = [
  {
    question: 'Ce sunt lumânările refillabile?',
    answer:
      'Lumânările refillabile sunt sisteme care permit reutilizarea recipientului și completarea rapidă cu ceară nouă și fitil nou, fără să arunci tot suportul după fiecare utilizare.',
  },
  {
    question: 'Sunt potrivite pentru decor de apartament sau casă?',
    answer:
      'Da. Sunt ideale pentru living, dormitor, dining sau colțuri decorative în care vrei lumină caldă și un aspect elegant, fără risipă inutilă.',
  },
  {
    question: 'Care este avantajul față de o lumânare clasică?',
    answer:
      'Principalul avantaj este reutilizarea recipientului și flexibilitatea. Poți reîmprospăta aranjamentul, poți schimba rapid fitilul și poți păstra mai ușor un decor premium.',
  },
];

const RefillableCandlesLandingPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const structuredData = `[${generateBreadcrumbStructuredData([
    { name: 'Home', url: getSiteUrl('/') },
    { name: 'Lumânări refillabile', url: getSiteUrl('/lumanari-refillabile') },
  ])},${generateFAQStructuredData(faqItems)}]`;

  return (
    <>
      <SEOHead
        title="Lumânări refillabile în România | Atomra Home Romania"
        description="Descoperă lumânările refillabile Atomra pentru acasă, cadouri și decor elegant. Ceară naturală, recipiente reutilizabile și un sistem premium ușor de reîmprospătat."
        keywords="lumânări refillabile, lumanari refillabile romania, lumanari reutilizabile, lumanari premium, ceara naturala"
        url={getSiteUrl('/lumanari-refillabile')}
        structuredData={structuredData}
      />

      <div className="luxury-page-bg min-h-screen pt-32 sm:pt-36 md:pt-40">
        <section className="luxury-section-light py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
            <div className="mx-auto max-w-4xl text-center">
              <p className="mb-4 text-sm uppercase tracking-[0.3em] text-slate-500">Ghid de cumpărare</p>
              <h1 className="mb-6 text-4xl font-extralight tracking-tight text-slate-900 sm:text-5xl">
                Lumânări refillabile pentru un decor elegant și ușor de întreținut
              </h1>
              <p className="mx-auto max-w-3xl text-lg font-light leading-relaxed text-slate-600">
                Dacă cauți lumânări refillabile în România, merită să alegi un sistem care arată premium,
                se reîmprospătează ușor și reduce risipa. Atomra este construit exact pentru acest tip de
                experiență.
              </p>
            </div>
          </div>
        </section>

        <section className="luxury-section-dark py-12 sm:py-16">
          <div className="mx-auto grid max-w-6xl gap-8 px-6 sm:px-8 lg:grid-cols-3 lg:px-12">
            <article className="luxury-card rounded-lg p-8">
              <h2 className="mb-4 text-2xl font-light text-slate-900">1. Recipient reutilizabil</h2>
              <p className="font-light leading-7 text-slate-600">
                În loc să înlocuiești toată lumânarea, păstrezi recipientul și refaci aranjamentul atunci când
                ai nevoie. Este mai curat, mai coerent vizual și mai potrivit pentru decor pe termen lung.
              </p>
            </article>

            <article className="luxury-card rounded-lg p-8">
              <h2 className="mb-4 text-2xl font-light text-slate-900">2. Stil flexibil</h2>
              <p className="font-light leading-7 text-slate-600">
                Sistemul reincarcabil se potrivește atât în interioare minimaliste, cât și în setup-uri mai
                festive. Poți adapta ușor recipientul, volumul și atmosfera în funcție de spațiu.
              </p>
            </article>

            <article className="luxury-card rounded-lg p-8">
              <h2 className="mb-4 text-2xl font-light text-slate-900">3. Experiență premium</h2>
              <p className="font-light leading-7 text-slate-600">
                O lumânare refillabilă bună nu înseamnă doar reutilizare. Înseamnă și estetică atentă,
                materiale curate și o experiență plăcută de fiecare dată când o aprinzi.
              </p>
            </article>
          </div>
        </section>

        <section className="luxury-section-light py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
            <div className="luxury-card rounded-lg p-8 sm:p-10">
              <h2 className="mb-6 text-3xl font-extralight text-slate-900">Cum alegi varianta potrivită</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="mb-3 text-xl font-light text-slate-900">Pentru acasă</h3>
                  <p className="font-light leading-7 text-slate-600">
                    Alege produse refillabile pentru zonele în care vrei atmosferă constantă: living, dining,
                    baie sau dormitor. Sunt potrivite când vrei eleganță fără să schimbi mereu întregul decor.
                  </p>
                </div>
                <div>
                  <h3 className="mb-3 text-xl font-light text-slate-900">Pentru cadou sau eveniment</h3>
                  <p className="font-light leading-7 text-slate-600">
                    Un sistem reincarcabil este ușor de prezentat premium și transmite mai multă grijă decât o
                    lumânare clasică de consum. În plus, poate fi refolosit și după momentul special.
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
                Răspunsuri scurte pentru cele mai comune întrebări legate de lumânările refillabile.
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
            <h2 className="mb-4 text-3xl font-extralight text-slate-900">Explorează colecția Atomra</h2>
            <p className="mb-8 font-light leading-7 text-slate-600">
              Dacă vrei să vezi produse refillabile deja pregătite pentru decor interior, începe cu colecția
              de casă sau răsfoiește toate produsele.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/home-collection"
                className="rounded-full bg-slate-900 px-8 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Vezi colecția pentru casă
              </Link>
              <Link
                to="/toate-produsele"
                className="rounded-full border border-slate-300 px-8 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
              >
                Vezi toate produsele
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default RefillableCandlesLandingPage;

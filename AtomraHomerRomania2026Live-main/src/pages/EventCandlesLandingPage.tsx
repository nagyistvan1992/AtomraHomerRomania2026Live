import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { getSiteUrl } from '../utils/siteConfig';
import { generateBreadcrumbStructuredData, generateFAQStructuredData } from '../utils/seoUtils';

const faqItems = [
  {
    question: 'Ce tip de lumanari de nunta sunt potrivite pentru mese?',
    answer:
      'Cele mai potrivite sunt lumanarile care arata elegant, se pot distribui usor pe mai multe mese si pastreaza un aspect coerent in tot decorul.',
  },
  {
    question: 'Pot folosi aceste lumanari si pentru botez sau alte evenimente?',
    answer:
      'Da. Acelasi sistem se potriveste foarte bine pentru botez, aniversari, mese festive si alte evenimente private sau corporate.',
  },
  {
    question: 'Cum aleg corect cantitatea pentru un eveniment?',
    answer:
      'Conteaza numarul de mese, recipientele alese si efectul vizual dorit. Daca vrei o recomandare clara, cel mai bine este sa ne contactezi direct.',
  },
];

const EventCandlesLandingPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const structuredData = `[${generateBreadcrumbStructuredData([
    { name: 'Home', url: getSiteUrl('/') },
    { name: 'Lumanari nunta si evenimente', url: getSiteUrl('/lumanari-pentru-evenimente') },
  ])},${generateFAQStructuredData(faqItems)}]`;

  return (
    <>
      <SEOHead
        title="Lumanari nunta si evenimente | Atomra Home Romania"
        description="Lumanari nunta si lumanari pentru evenimente, cu aspect premium si atmosfera coerenta. Descopera solutiile Atomra pentru mese elegante, decor rafinat si setup-uri reutilizabile."
        keywords="lumanari nunta, lumanare nunta, lumanari pentru nunta, lumanari pentru evenimente, decor nunta lumanari, lumanari botez"
        url={getSiteUrl('/lumanari-pentru-evenimente')}
        structuredData={structuredData}
      />

      <div className="luxury-page-bg min-h-screen pt-32 sm:pt-36 md:pt-40">
        <section className="luxury-section-light py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-6 text-center sm:px-8 lg:px-12">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-slate-500">Decor pentru nunta si evenimente</p>
            <h1 className="mb-6 text-4xl font-extralight tracking-tight text-slate-900 sm:text-5xl">
              Lumanari nunta cu aspect premium si atmosfera coerenta pe fiecare masa
            </h1>
            <p className="mx-auto max-w-3xl text-lg font-light leading-relaxed text-slate-600">
              Daca cineva cauta lumanari nunta, de obicei cauta de fapt un decor elegant, usor de pregatit si
              potrivit cu stilul intregului eveniment. Atomra este construit exact pentru acest tip de rezultat,
              fie ca vorbim de nunta, botez sau mese festive.
            </p>
          </div>
        </section>

        <section className="luxury-section-dark py-12 sm:py-16">
          <div className="mx-auto grid max-w-6xl gap-8 px-6 sm:px-8 lg:grid-cols-3 lg:px-12">
            <article className="luxury-card rounded-lg p-8">
              <h2 className="mb-4 text-2xl font-light text-slate-900">Uniformitate pe mese</h2>
              <p className="font-light leading-7 text-slate-600">
                Pentru lumanari de nunta conteaza mult consistenta vizuala. Sistemul cu perle de ceara ajuta la un
                decor ordonat, rafinat si usor de repetat pe mai multe mese.
              </p>
            </article>

            <article className="luxury-card rounded-lg p-8">
              <h2 className="mb-4 text-2xl font-light text-slate-900">Flexibilitate de setup</h2>
              <p className="font-light leading-7 text-slate-600">
                Poti adapta recipientele, volumele si stilul in functie de tema evenimentului fara sa pierzi
                coerenta sau senzatia premium a ansamblului.
              </p>
            </article>

            <article className="luxury-card rounded-lg p-8">
              <h2 className="mb-4 text-2xl font-light text-slate-900">Impresie memorabila</h2>
              <p className="font-light leading-7 text-slate-600">
                O lumanare bine integrata nu este doar sursa de lumina, ci parte din identitatea vizuala a intregii
                experiente pe care invitatii o tin minte.
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
                  <h3 className="mb-3 text-xl font-light text-slate-900">Nunta, botez, aniversari</h3>
                  <p className="font-light leading-7 text-slate-600">
                    Pentru momente emotionale in care decorul trebuie sa ramana cald, elegant si coerent in toate
                    zonele importante ale salii.
                  </p>
                </div>
                <div>
                  <h3 className="mb-3 text-xl font-light text-slate-900">Corporate si hospitality</h3>
                  <p className="font-light leading-7 text-slate-600">
                    Pentru cine, receptii si locatii care vor o prezentare mai rafinata si mai memorabila decat
                    lumanarea clasica standard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="luxury-section-dark py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
            <div className="mb-10 text-center">
              <h2 className="mb-4 text-3xl font-extralight text-slate-900">Intrebari frecvente</h2>
              <p className="mx-auto max-w-3xl font-light leading-7 text-slate-600">
                Cateva clarificari utile daca alegi lumanari pentru nunta sau pentru un alt eveniment important.
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
            <h2 className="mb-4 text-3xl font-extralight text-slate-900">Vezi colectia pentru evenimente</h2>
            <p className="mb-8 font-light leading-7 text-slate-600">
              Daca vrei sa pornesti rapid, vezi colectia dedicata evenimentelor. Daca ai nevoie de recomandare, te
              ajutam sa alegi setup-ul potrivit.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/events-collection"
                className="rounded-full bg-slate-900 px-8 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Vezi colectia de evenimente
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

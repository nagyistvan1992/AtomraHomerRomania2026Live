import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { getSiteUrl } from '../utils/siteConfig';
import { generateBreadcrumbStructuredData, generateFAQStructuredData } from '../utils/seoUtils';

const faqItems = [
  {
    question: 'Ce inseamna lumanari naturale?',
    answer:
      'Inseamna lumanari gandite din materii prime vegetale, potrivite pentru un decor mai curat, mai calm si mai coerent cu un stil premium de interior.',
  },
  {
    question: 'Este ceara de soia o alegere buna pentru acasa?',
    answer:
      'Da. Ceara de soia este apreciata in special de cei care cauta o atmosfera placuta, un aspect elegant si un produs compatibil cu ritualuri moderne de decor.',
  },
  {
    question: 'Daca cineva cauta o lumanare naturala, ce ar trebui sa urmareasca?',
    answer:
      'Sa urmareasca materialul, felul in care produsul arata in spatiu, usurinta de folosire si daca se potriveste cu decorul pe termen lung.',
  },
];

const NaturalWaxCandlesLandingPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const structuredData = `[${generateBreadcrumbStructuredData([
    { name: 'Home', url: getSiteUrl('/') },
    { name: 'Lumanari naturale din ceara de soia', url: getSiteUrl('/lumanari-ceara-naturala') },
  ])},${generateFAQStructuredData(faqItems)}]`;

  return (
    <>
      <SEOHead
        title="Lumanari naturale din ceara de soia | Atomra Home Romania"
        description="Descopera lumanari naturale din ceara de soia pentru casa, cadou si decor premium. Daca cauti o lumanare naturala eleganta, aici gasesti o varianta premium si reutilizabila."
        keywords="lumanari naturale, lumanare naturala, lumanari din ceara de soia, ceara de soia, lumanari premium, decor casa"
        url={getSiteUrl('/lumanari-ceara-naturala')}
        structuredData={structuredData}
      />

      <div className="luxury-page-bg min-h-screen pt-32 sm:pt-36 md:pt-40">
        <section className="luxury-section-light py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-6 text-center sm:px-8 lg:px-12">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-slate-500">Lumanari naturale</p>
            <h1 className="mb-6 text-4xl font-extralight tracking-tight text-slate-900 sm:text-5xl">
              Lumanari naturale din ceara de soia pentru casa, cadou si decor elegant
            </h1>
            <p className="mx-auto max-w-3xl text-lg font-light leading-relaxed text-slate-600">
              Daca cineva cauta lumanari naturale sau o lumanare naturala cu aspect premium, de obicei cauta acelasi
              lucru: un produs frumos, curat vizual si usor de integrat in casa. Atomra raspunde acestei cautari prin
              lumanari din ceara de soia si un sistem gandit pentru reutilizare eleganta.
            </p>
          </div>
        </section>

        <section className="luxury-section-dark py-12 sm:py-16">
          <div className="mx-auto grid max-w-6xl gap-8 px-6 sm:px-8 lg:grid-cols-3 lg:px-12">
            <article className="luxury-card rounded-lg p-8">
              <h2 className="mb-4 text-2xl font-light text-slate-900">Material potrivit pentru decor premium</h2>
              <p className="font-light leading-7 text-slate-600">
                Lumanarile naturale sunt cautate de oameni care nu vor doar o flacara, ci un obiect care sa arate bine
                si sa completeze atmosfera intr-un mod rafinat.
              </p>
            </article>
            <article className="luxury-card rounded-lg p-8">
              <h2 className="mb-4 text-2xl font-light text-slate-900">Ceara de soia si flexibilitate</h2>
              <p className="font-light leading-7 text-slate-600">
                Cand cauti lumanari din ceara de soia, cauti de obicei si un produs mai usor de adaptat stilului tau,
                fie pentru acasa, fie pentru cadouri sau mese festive.
              </p>
            </article>
            <article className="luxury-card rounded-lg p-8">
              <h2 className="mb-4 text-2xl font-light text-slate-900">O lumanare naturala care ramane relevanta</h2>
              <p className="font-light leading-7 text-slate-600">
                Cand sistemul este bine gandit, produsul nu ramane doar o achizitie de moment, ci devine parte din
                decorul pe care vrei sa il pastrezi si sa il reimprospatezi.
              </p>
            </article>
          </div>
        </section>

        <section className="luxury-section-light py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
            <div className="luxury-card rounded-lg p-8 sm:p-10">
              <h2 className="mb-6 text-3xl font-extralight text-slate-900">Cand se potrivesc cel mai bine</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="mb-3 text-xl font-light text-slate-900">Acasa</h3>
                  <p className="font-light leading-7 text-slate-600">
                    In living, dining, dormitor sau baie, mai ales daca vrei o prezenta calma si o piesa care sa
                    sustina frumos decorul.
                  </p>
                </div>
                <div>
                  <h3 className="mb-3 text-xl font-light text-slate-900">Cadou</h3>
                  <p className="font-light leading-7 text-slate-600">
                    Pentru casa noua, aniversari sau gesturi rafinate, atunci cand vrei un produs util si memorabil,
                    nu doar ceva generic.
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
                Cateva raspunsuri utile daca esti la inceput si cauti lumanari naturale sau lumanari din ceara de soia.
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
            <h2 className="mb-4 text-3xl font-extralight text-slate-900">Vezi produsele Atomra</h2>
            <p className="mb-8 font-light leading-7 text-slate-600">
              Poti incepe cu colectia pentru acasa sau poti vedea direct toate optiunile disponibile acum.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/home-collection"
                className="rounded-full bg-slate-900 px-8 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Vezi colectia pentru acasa
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

export default NaturalWaxCandlesLandingPage;

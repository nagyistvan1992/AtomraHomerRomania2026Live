import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { getSiteUrl } from '../utils/siteConfig';
import { generateBreadcrumbStructuredData, generateFAQStructuredData } from '../utils/seoUtils';

const faqItems = [
  {
    question: 'Ce cauta de obicei cineva care scrie lumanari handmade?',
    answer:
      'De obicei cauta lumanari cu aspect atent finisat, prezenta premium si o senzatie mai personala decat produsele decorative obisnuite.',
  },
  {
    question: 'Sunt lumanarile handmade potrivite pentru cadou?',
    answer:
      'Da, mai ales atunci cand vrei un obiect elegant, usor de oferit si suficient de special incat sa ramana in decor dupa momentul daruirii.',
  },
  {
    question: 'Cum aleg intre o lumanare handmade pentru casa si una pentru evenimente?',
    answer:
      'Pentru casa conteaza mai mult stilul recipientului si dimensiunea. Pentru evenimente conteaza impactul vizual, numarul de fitile si cat de usor se integreaza in decorul mesei.',
  },
];

const HandmadeCandlesLandingPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const structuredData = `[${generateBreadcrumbStructuredData([
    { name: 'Home', url: getSiteUrl('/') },
    { name: 'Lumanari handmade', url: getSiteUrl('/lumanari-handmade') },
  ])},${generateFAQStructuredData(faqItems)}]`;

  return (
    <>
      <SEOHead
        title="Lumanari handmade premium pentru cadou si decor | Atomra Home Romania"
        description="Descopera lumanari handmade premium pentru casa, cadou si decor elegant. Daca vrei lumanari handmade cu prezenta vizuala rafinata, Atomra iti ofera optiuni memorabile."
        keywords="lumanari handmade, lumanare handmade, lumanari handmade premium, cadou handmade elegant, decor cu lumanari handmade"
        url={getSiteUrl('/lumanari-handmade')}
        structuredData={structuredData}
      />

      <div className="luxury-page-bg min-h-screen pt-32 sm:pt-36 md:pt-40">
        <section className="luxury-section-light py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-6 text-center sm:px-8 lg:px-12">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-slate-500">Lumanari handmade</p>
            <h1 className="mb-6 text-4xl font-extralight tracking-tight text-slate-900 sm:text-5xl">
              Lumanari handmade premium pentru cadou, casa si decor cu personalitate
            </h1>
            <p className="mx-auto max-w-3xl text-lg font-light leading-relaxed text-slate-600">
              Cand cineva cauta lumanari handmade, de obicei nu cauta doar ceara si fitil. Cauta un obiect care sa
              para atent ales, frumos de privit si potrivit pentru un gest elegant. Atomra raspunde acestui tip de
              cautare prin lumanari premium cu prezenta vizuala calda si rafinata.
            </p>
          </div>
        </section>

        <section className="luxury-section-dark py-12 sm:py-16">
          <div className="mx-auto grid max-w-6xl gap-8 px-6 sm:px-8 lg:grid-cols-3 lg:px-12">
            <article className="luxury-card rounded-lg p-8">
              <h2 className="mb-4 text-2xl font-light text-slate-900">Aspect artizanal si elegant</h2>
              <p className="font-light leading-7 text-slate-600">
                O lumanare handmade buna trebuie sa lase impresia unui obiect atent construit, care adauga caracter si
                stil spatiului in care ajunge.
              </p>
            </article>
            <article className="luxury-card rounded-lg p-8">
              <h2 className="mb-4 text-2xl font-light text-slate-900">Potrivita pentru cadou</h2>
              <p className="font-light leading-7 text-slate-600">
                Este una dintre cele mai cautate variante atunci cand vrei ceva personal, usor de oferit si suficient
                de elegant incat sa fie tinut la vedere in casa.
              </p>
            </article>
            <article className="luxury-card rounded-lg p-8">
              <h2 className="mb-4 text-2xl font-light text-slate-900">Usor de integrat in decor</h2>
              <p className="font-light leading-7 text-slate-600">
                Fie ca vorbim despre living, dining sau o masa festiva, o lumanare cu prezenta premium functioneaza cel
                mai bine atunci cand completeaza decorul, nu il aglomereaza.
              </p>
            </article>
          </div>
        </section>

        <section className="luxury-section-light py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
            <div className="luxury-card rounded-lg p-8 sm:p-10">
              <h2 className="mb-6 text-3xl font-extralight text-slate-900">Cum alegi rapid</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="mb-3 text-xl font-light text-slate-900">Pentru casa</h3>
                  <p className="font-light leading-7 text-slate-600">
                    Alege un produs cu recipient elegant, volum potrivit si o forma care completeaza frumos camera.
                  </p>
                </div>
                <div>
                  <h3 className="mb-3 text-xl font-light text-slate-900">Pentru cadou sau eveniment</h3>
                  <p className="font-light leading-7 text-slate-600">
                    Alege un produs cu impact vizual mai mare, prezenta mai bogata si o formula usor de integrat intr-un
                    decor de ocazie.
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
                Cateva raspunsuri utile daca ai inceput sa compari mai multe optiuni si ai ajuns sa cauti lumanari handmade.
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
            <h2 className="mb-4 text-3xl font-extralight text-slate-900">Vezi colectiile potrivite</h2>
            <p className="mb-8 font-light leading-7 text-slate-600">
              Daca vrei sa alegi rapid, incepe cu colectia pentru acasa sau vezi solutiile mai mari pentru evenimente.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/home-collection"
                className="rounded-full bg-slate-900 px-8 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Vezi colectia pentru acasa
              </Link>
              <Link
                to="/events-collection"
                className="rounded-full border border-slate-300 px-8 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
              >
                Vezi optiunile pentru evenimente
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HandmadeCandlesLandingPage;

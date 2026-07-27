import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { getSiteUrl } from '../utils/siteConfig';
import { generateBreadcrumbStructuredData, generateFAQStructuredData } from '../utils/seoUtils';

const faqItems = [
  {
    question: 'Ce inseamna idei de cadouri personalizate in zona de decor?',
    answer:
      'Inseamna idei de cadouri alese mai atent, astfel incat sa se potriveasca stilului persoanei, ocaziei si felului in care produsul va fi folosit in spatiu.',
  },
  {
    question: 'Pentru ce ocazii sunt potrivite aceste cadouri?',
    answer:
      'Sunt potrivite pentru casa noua, aniversari, sarbatori, gesturi elegante de multumire si chiar cadouri corporate cu nota personala.',
  },
  {
    question: 'Cum aleg un cadou personalizat fara sa cunosc foarte bine gusturile persoanei?',
    answer:
      'Alege un produs cu aspect premium, utilitate reala si integrare usoara in decor. In astfel de cazuri, o lumanare bine aleasa este una dintre cele mai sigure optiuni.',
  },
];

const PremiumCandleGiftsLandingPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const structuredData = `[${generateBreadcrumbStructuredData([
    { name: 'Home', url: getSiteUrl('/') },
    { name: 'Idei de cadouri personalizate', url: getSiteUrl('/cadouri-lumanari-premium') },
  ])},${generateFAQStructuredData(faqItems)}]`;

  return (
    <>
      <SEOHead
        title="Idei de cadouri personalizate cu lumanari premium | Atomra Home Romania"
        description="Descopera idei de cadouri personalizate cu lumanari premium pentru casa noua, aniversari si gesturi elegante. Atomra te ajuta sa alegi un cadou memorabil si usor de oferit."
        keywords="idei cadouri personalizate, cadouri personalizate, cadou personalizat elegant, lumanari cadou, cadou casa noua"
        url={getSiteUrl('/cadouri-lumanari-premium')}
        structuredData={structuredData}
      />

      <div className="luxury-page-bg min-h-screen pt-32 sm:pt-36 md:pt-40">
        <section className="luxury-section-light py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-6 text-center sm:px-8 lg:px-12">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-slate-500">Cadouri personalizate</p>
            <h1 className="mb-6 text-4xl font-extralight tracking-tight text-slate-900 sm:text-5xl">
              Idei de cadouri personalizate cu lumanari premium si prezenta memorabila
            </h1>
            <p className="mx-auto max-w-3xl text-lg font-light leading-relaxed text-slate-600">
              Daca cineva cauta idei de cadouri personalizate, de obicei cauta un obiect cu gust, utilitate si
              valoare emotionala. Atomra duce aceasta idee mai departe prin lumanari premium care se potrivesc
              usor cu stilul persoanei care le primeste.
            </p>
          </div>
        </section>

        <section className="luxury-section-dark py-12 sm:py-16">
          <div className="mx-auto grid max-w-6xl gap-8 px-6 sm:px-8 lg:grid-cols-3 lg:px-12">
            <article className="luxury-card rounded-lg p-8">
              <h2 className="mb-4 text-2xl font-light text-slate-900">Cadou pentru casa noua</h2>
              <p className="font-light leading-7 text-slate-600">
                O alegere foarte buna cand vrei sa oferi ceva elegant, practic si potrivit pentru un spatiu nou care
                abia incepe sa capete personalitate.
              </p>
            </article>
            <article className="luxury-card rounded-lg p-8">
              <h2 className="mb-4 text-2xl font-light text-slate-900">Cadou pentru aniversari</h2>
              <p className="font-light leading-7 text-slate-600">
                Pentru momente personale, o lumanare premium functioneaza bine atunci cand vrei un cadou frumos,
                usor de oferit si usor de pastrat in decor.
              </p>
            </article>
            <article className="luxury-card rounded-lg p-8">
              <h2 className="mb-4 text-2xl font-light text-slate-900">Cadou corporate elegant</h2>
              <p className="font-light leading-7 text-slate-600">
                Pentru colaboratori, parteneri sau echipe, este o optiune rafinata atunci cand vrei un obiect care
                transmite atentie si bun gust.
              </p>
            </article>
          </div>
        </section>

        <section className="luxury-section-light py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
            <div className="luxury-card rounded-lg p-8 sm:p-10">
              <h2 className="mb-6 text-3xl font-extralight text-slate-900">Ce alegi mai usor</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="mb-3 text-xl font-light text-slate-900">Essenza</h3>
                  <p className="font-light leading-7 text-slate-600">
                    Potrivita cand vrei un cadou elegant, discret si usor de oferit, fara sa pierzi senzatia de produs premium.
                  </p>
                </div>
                <div>
                  <h3 className="mb-3 text-xl font-light text-slate-900">Splendore</h3>
                  <p className="font-light leading-7 text-slate-600">
                    Mai potrivit cand vrei un cadou mai generos, cu prezenta mai puternica si impact vizual mai bogat.
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
                Cateva raspunsuri utile daca vrei sa alegi mai bine intre mai multe idei de cadouri personalizate.
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
            <h2 className="mb-4 text-3xl font-extralight text-slate-900">Vezi pachetele potrivite pentru cadou</h2>
            <p className="mb-8 font-light leading-7 text-slate-600">
              Daca vrei sa alegi rapid, incepe cu pachetele Essenza si Splendore sau rasfoieste toate produsele.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/product/pachet-essenza-150g"
                className="rounded-full bg-slate-900 px-8 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Vezi Essenza
              </Link>
              <Link
                to="/product/pachet-splendore-250g"
                className="rounded-full border border-slate-300 px-8 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
              >
                Vezi Splendore
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PremiumCandleGiftsLandingPage;

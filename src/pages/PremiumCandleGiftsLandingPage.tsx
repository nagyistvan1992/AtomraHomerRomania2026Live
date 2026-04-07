import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { getSiteUrl } from '../utils/siteConfig';
import { generateBreadcrumbStructuredData, generateFAQStructuredData } from '../utils/seoUtils';

const faqItems = [
  {
    question: 'De ce sunt lumânările un cadou premium bun?',
    answer:
      'Pentru că oferă emoție, atmosferă și utilitate reală. O lumânare bine aleasă nu este doar decor, ci un obiect care schimbă felul în care arată și se simte un spațiu.',
  },
  {
    question: 'Pentru ce ocazii sunt potrivite?',
    answer:
      'Sunt potrivite pentru casă nouă, aniversări, sărbători, cadouri corporate, mulțumiri elegante sau gesturi de apreciere în contexte personale și profesionale.',
  },
  {
    question: 'Ce face Atomra diferit ca opțiune de cadou?',
    answer:
      'Aspectul premium, ideea de refill, prezentarea curată și faptul că produsul poate fi păstrat și refolosit îl fac mai memorabil decât o lumânare standard de consum.',
  },
];

const PremiumCandleGiftsLandingPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const structuredData = `[${generateBreadcrumbStructuredData([
    { name: 'Home', url: getSiteUrl('/') },
    { name: 'Cadouri lumânări premium', url: getSiteUrl('/cadouri-lumanari-premium') },
  ])},${generateFAQStructuredData(faqItems)}]`;

  return (
    <>
      <SEOHead
        title="Cadouri cu lumânări premium | Atomra Home Romania"
        description="Idei elegante de cadouri cu lumânări premium pentru casă nouă, aniversări și gesturi rafinate. Descoperă pachetele Atomra pentru un cadou memorabil."
        keywords="cadouri lumânări premium, cadou elegant lumanare, cadou casa noua, cadouri premium romania, lumanari cadou"
        url={getSiteUrl('/cadouri-lumanari-premium')}
        structuredData={structuredData}
      />

      <div className="luxury-page-bg min-h-screen pt-32 sm:pt-36 md:pt-40">
        <section className="luxury-section-light py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-6 text-center sm:px-8 lg:px-12">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-slate-500">Cadouri premium</p>
            <h1 className="mb-6 text-4xl font-extralight tracking-tight text-slate-900 sm:text-5xl">
              Cadouri cu lumânări premium care arată bine și se păstrează în timp
            </h1>
            <p className="mx-auto max-w-3xl text-lg font-light leading-relaxed text-slate-600">
              Dacă vrei un cadou elegant, lumânările premium sunt o alegere puternică atunci când vrei să transmiți
              grijă, rafinament și bun gust. Atomra duce această idee mai departe printr-un format refillabil și memorabil.
            </p>
          </div>
        </section>

        <section className="luxury-section-dark py-12 sm:py-16">
          <div className="mx-auto grid max-w-6xl gap-8 px-6 sm:px-8 lg:grid-cols-3 lg:px-12">
            <article className="luxury-card rounded-lg p-8">
              <h2 className="mb-4 text-2xl font-light text-slate-900">Cadou pentru casă nouă</h2>
              <p className="font-light leading-7 text-slate-600">
                O alegere ideală când vrei să oferi ceva util, decorativ și elegant. O lumânare premium se
                integrează ușor în orice spațiu nou și creează imediat atmosferă.
              </p>
            </article>
            <article className="luxury-card rounded-lg p-8">
              <h2 className="mb-4 text-2xl font-light text-slate-900">Cadou pentru aniversări</h2>
              <p className="font-light leading-7 text-slate-600">
                Pentru ocazii personale, o prezentare atentă contează mult. Pachetele Atomra sunt potrivite când
                vrei un cadou cu impact vizual și emoțional, nu doar ceva generic.
              </p>
            </article>
            <article className="luxury-card rounded-lg p-8">
              <h2 className="mb-4 text-2xl font-light text-slate-900">Cadou corporate elegant</h2>
              <p className="font-light leading-7 text-slate-600">
                Pentru colaboratori, parteneri sau echipe, lumânările premium pot funcționa foarte bine ca gest de
                apreciere, mai ales dacă vrei un obiect sofisticat și memorabil.
              </p>
            </article>
          </div>
        </section>

        <section className="luxury-section-light py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
            <div className="luxury-card rounded-lg p-8 sm:p-10">
              <h2 className="mb-6 text-3xl font-extralight text-slate-900">Ce pachet alegi</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="mb-3 text-xl font-light text-slate-900">Essenza</h3>
                  <p className="font-light leading-7 text-slate-600">
                    O opțiune bună când vrei un cadou elegant, discret și ușor de oferit, fără să pierzi din
                    impresia premium.
                  </p>
                </div>
                <div>
                  <h3 className="mb-3 text-xl font-light text-slate-900">Splendore</h3>
                  <p className="font-light leading-7 text-slate-600">
                    Potrivit când vrei un cadou mai generos, cu prezență mai puternică și un efect vizual mai bogat.
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
                Câteva răspunsuri utile dacă alegi lumânările ca idee de cadou premium.
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
              Dacă vrei să alegi rapid, începe cu pachetele Essenza și Splendore sau răsfoiește toate produsele.
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

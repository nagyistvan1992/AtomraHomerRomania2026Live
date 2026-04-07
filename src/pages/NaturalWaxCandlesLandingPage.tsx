import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { getSiteUrl } from '../utils/siteConfig';
import { generateBreadcrumbStructuredData, generateFAQStructuredData } from '../utils/seoUtils';

const faqItems = [
  {
    question: 'Ce înseamnă lumânări din ceară naturală?',
    answer:
      'Înseamnă lumânări realizate din materii prime vegetale, alese pentru o experiență mai curată și mai plăcută în spațiul tău, comparativ cu variantele convenționale mai rigide.',
  },
  {
    question: 'Sunt potrivite pentru folosire zilnică?',
    answer:
      'Da. Lumânările din ceară naturală sunt potrivite pentru uz frecvent acasă, mai ales dacă urmărești un decor calm, elegant și o rutină ușor de întreținut.',
  },
  {
    question: 'De ce sunt apreciate în decor premium?',
    answer:
      'Pentru că oferă o estetică mai rafinată, o experiență mai atent construită și se potrivesc bine în interioare contemporane, mese decorative și idei de cadou.',
  },
];

const NaturalWaxCandlesLandingPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const structuredData = `[${generateBreadcrumbStructuredData([
    { name: 'Home', url: getSiteUrl('/') },
    { name: 'Lumânări din ceară naturală', url: getSiteUrl('/lumanari-ceara-naturala') },
  ])},${generateFAQStructuredData(faqItems)}]`;

  return (
    <>
      <SEOHead
        title="Lumânări din ceară naturală | Atomra Home Romania"
        description="Descoperă lumânările din ceară naturală Atomra pentru casă, cadou și decor premium. O alegere elegantă, refillabilă și ușor de integrat în spații moderne."
        keywords="lumânări din ceară naturală, lumanari ceara naturala, lumanari premium, lumanari pentru casa, ceara vegetala"
        url={getSiteUrl('/lumanari-ceara-naturala')}
        structuredData={structuredData}
      />

      <div className="luxury-page-bg min-h-screen pt-32 sm:pt-36 md:pt-40">
        <section className="luxury-section-light py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-6 text-center sm:px-8 lg:px-12">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-slate-500">Căutare principală</p>
            <h1 className="mb-6 text-4xl font-extralight tracking-tight text-slate-900 sm:text-5xl">
              Lumânări din ceară naturală pentru casă, cadou și decor elegant
            </h1>
            <p className="mx-auto max-w-3xl text-lg font-light leading-relaxed text-slate-600">
              Dacă vrei lumânări din ceară naturală în România, merită să alegi un produs care combină estetica
              premium cu o experiență mai curată și mai flexibilă în utilizare. Asta încearcă să livreze Atomra.
            </p>
          </div>
        </section>

        <section className="luxury-section-dark py-12 sm:py-16">
          <div className="mx-auto grid max-w-6xl gap-8 px-6 sm:px-8 lg:grid-cols-3 lg:px-12">
            <article className="luxury-card rounded-lg p-8">
              <h2 className="mb-4 text-2xl font-light text-slate-900">Mai potrivite pentru spații curate</h2>
              <p className="font-light leading-7 text-slate-600">
                În interioare moderne sau liniștite, alegerea unei lumânări din ceară naturală este mai coerentă
                cu ideea de ritual calm și decor atent construit.
              </p>
            </article>
            <article className="luxury-card rounded-lg p-8">
              <h2 className="mb-4 text-2xl font-light text-slate-900">O prezență mai elegantă</h2>
              <p className="font-light leading-7 text-slate-600">
                Dincolo de material, contează și felul în care produsul se integrează vizual. Atomra urmărește
                un rezultat rafinat, nu doar o lumânare funcțională.
              </p>
            </article>
            <article className="luxury-card rounded-lg p-8">
              <h2 className="mb-4 text-2xl font-light text-slate-900">Mai ușor de păstrat în rutină</h2>
              <p className="font-light leading-7 text-slate-600">
                Când forma și sistemul sunt bine gândite, lumânarea rămâne parte din decorul de zi cu zi și nu
                doar un obiect ocazional.
              </p>
            </article>
          </div>
        </section>

        <section className="luxury-section-light py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
            <div className="luxury-card rounded-lg p-8 sm:p-10">
              <h2 className="mb-6 text-3xl font-extralight text-slate-900">Unde se potrivesc cel mai bine</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="mb-3 text-xl font-light text-slate-900">Acasă</h3>
                  <p className="font-light leading-7 text-slate-600">
                    În living, dining, dormitor sau baie, mai ales când vrei o atmosferă calmă și un obiect care
                    să susțină vizual decorul, nu să îl încarce.
                  </p>
                </div>
                <div>
                  <h3 className="mb-3 text-xl font-light text-slate-900">Cadou</h3>
                  <p className="font-light leading-7 text-slate-600">
                    Sunt o alegere foarte bună pentru housewarming, aniversări, sărbători sau mici gesturi premium,
                    mai ales când produsul arată bine și poate fi refolosit.
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
                Câteva răspunsuri utile dacă ești la început și cauți lumânări din ceară naturală.
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
              Poți începe cu produsele pentru casă sau poți vedea direct toate opțiunile disponibile.
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

export default NaturalWaxCandlesLandingPage;

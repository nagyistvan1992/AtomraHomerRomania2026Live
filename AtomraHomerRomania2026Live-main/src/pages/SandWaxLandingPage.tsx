import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { getSiteUrl } from '../utils/siteConfig';
import { generateBreadcrumbStructuredData, generateFAQStructuredData } from '../utils/seoUtils';

const faqItems = [
  {
    question: 'Ce este ceara de nisip?',
    answer:
      'Ceara de nisip este o formă granulată de ceară care se toarnă direct într-un recipient, împreună cu un fitil. Aspectul este curat, modern și foarte flexibil pentru decor.',
  },
  {
    question: 'Este bună pentru decor de eveniment?',
    answer:
      'Da. Ceara de nisip este foarte potrivită pentru mese festive, nunți, botezuri și setup-uri ample deoarece poate fi pregătită rapid și arată ordonat.',
  },
  {
    question: 'Se poate folosi și acasă?',
    answer:
      'Absolut. Pentru acasă oferă control vizual, întreținere mai simplă și libertatea de a folosi recipiente care se potrivesc perfect cu stilul interiorului.',
  },
];

const SandWaxLandingPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const structuredData = `[${generateBreadcrumbStructuredData([
    { name: 'Home', url: getSiteUrl('/') },
    { name: 'Ceară de nisip', url: getSiteUrl('/ceara-de-nisip') },
  ])},${generateFAQStructuredData(faqItems)}]`;

  return (
    <>
      <SEOHead
        title="Ceară de nisip pentru lumânări | Atomra Home Romania"
        description="Află cum funcționează ceara de nisip pentru lumânări și de ce este o soluție elegantă pentru decor acasă, evenimente și aranjamente premium."
        keywords="ceara de nisip, ceara de nisip pentru lumanari, wax pearls, lumanari evenimente, ceara perlata"
        url={getSiteUrl('/ceara-de-nisip')}
        structuredData={structuredData}
      />

      <div className="luxury-page-bg min-h-screen pt-32 sm:pt-36 md:pt-40">
        <section className="luxury-section-light py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12 text-center">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-slate-500">Intent principal</p>
            <h1 className="mb-6 text-4xl font-extralight tracking-tight text-slate-900 sm:text-5xl">
              Ceară de nisip pentru decor elegant, flexibil și ușor de refăcut
            </h1>
            <p className="mx-auto max-w-3xl text-lg font-light leading-relaxed text-slate-600">
              Ceara de nisip este una dintre cele mai practice opțiuni dacă vrei lumânări cu aspect premium,
              dar fără rigiditatea unui produs clasic turnat într-un singur recipient.
            </p>
          </div>
        </section>

        <section className="luxury-section-dark py-12 sm:py-16">
          <div className="mx-auto grid max-w-6xl gap-8 px-6 sm:px-8 lg:grid-cols-2 lg:px-12">
            <article className="luxury-card rounded-lg p-8">
              <h2 className="mb-4 text-2xl font-light text-slate-900">De ce caută oamenii ceară de nisip</h2>
              <p className="font-light leading-7 text-slate-600">
                Pentru că oferă libertate. Poți alege recipientul, poți controla volumul, poți înlocui fitilul și
                poți reface rapid decorul fără să pornești de la zero. Este un format foarte bun pentru acasă și
                excelent pentru zone de evenimente.
              </p>
            </article>

            <article className="luxury-card rounded-lg p-8">
              <h2 className="mb-4 text-2xl font-light text-slate-900">Cum o folosești corect</h2>
              <p className="font-light leading-7 text-slate-600">
                Torni granulele într-un vas potrivit, poziționezi fitilul și aprinzi. Când vrei să reîmprospătezi,
                completezi sau refaci compoziția. Sistemul este intuitiv și nu cere un setup complicat.
              </p>
            </article>
          </div>
        </section>

        <section className="luxury-section-light py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
            <div className="luxury-card rounded-lg p-8 sm:p-10">
              <h2 className="mb-6 text-3xl font-extralight text-slate-900">Când merită cel mai mult</h2>
              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <h3 className="mb-3 text-xl font-light text-slate-900">Evenimente</h3>
                  <p className="font-light leading-7 text-slate-600">
                    Pentru mese lungi, decor repetitiv și setup-uri elegante unde ai nevoie de consistență vizuală.
                  </p>
                </div>
                <div>
                  <h3 className="mb-3 text-xl font-light text-slate-900">Spații de acasă</h3>
                  <p className="font-light leading-7 text-slate-600">
                    Pentru tavă decorativă, dining sau colțuri ambientale în care vrei să schimbi ușor compoziția.
                  </p>
                </div>
                <div>
                  <h3 className="mb-3 text-xl font-light text-slate-900">Cadouri premium</h3>
                  <p className="font-light leading-7 text-slate-600">
                    Pentru că arată diferit, transmite grijă și oferă o experiență memorabilă, nu doar un obiect.
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
                Ce trebuie să știi înainte să alegi ceară de nisip pentru lumânări.
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
            <h2 className="mb-4 text-3xl font-extralight text-slate-900">Vezi varianta Atomra</h2>
            <p className="mb-8 font-light leading-7 text-slate-600">
              Dacă vrei să vezi un exemplu concret de ceară de nisip pregătită pentru acasă sau eveniment, începe
              cu produsul Granule Box sau cu colecția de evenimente.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/product/granule-box-750g"
                className="rounded-full bg-slate-900 px-8 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Vezi Granule Box
              </Link>
              <Link
                to="/events-collection"
                className="rounded-full border border-slate-300 px-8 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
              >
                Vezi colecția pentru evenimente
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SandWaxLandingPage;

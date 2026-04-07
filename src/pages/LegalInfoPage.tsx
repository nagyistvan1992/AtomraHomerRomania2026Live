import { useEffect } from 'react';
import SEOHead from '../components/SEOHead';
import { useLanguage, type Language } from '../context/LanguageContext';
import { getSiteUrl } from '../utils/siteConfig';

type LegalVariant = 'privacy' | 'terms';

type LegalInfoPageProps = {
  variant: LegalVariant;
};

type LegalPageContent = {
  title: string;
  intro: string;
  sections: Array<{ heading: string; body: string }>;
};

const PAGE_CONTENT: Record<Language, Record<LegalVariant, LegalPageContent>> = {
  ro: {
    privacy: {
      title: 'Politica de confidentialitate',
      intro: 'Colectam doar datele necesare pentru procesarea comenzilor, comunicarea cu clientii si livrarea produselor.',
      sections: [
        {
          heading: 'Ce date folosim',
          body: 'Numele, emailul, telefonul, adresa de livrare si detaliile comenzii sunt folosite strict pentru relationarea comerciala si pentru a-ti trimite produsele.'
        },
        {
          heading: 'Cum protejam datele',
          body: 'Datele sunt tratate confidential, iar accesul la ele este limitat la procesele necesare pentru operarea magazinului, facturare si suport.'
        },
        {
          heading: 'Solicitari legate de date',
          body: 'Pentru intrebari legate de prelucrarea datelor sau pentru actualizarea informatiilor tale, ne poti contacta direct prin pagina de contact.'
        }
      ]
    },
    terms: {
      title: 'Termeni si conditii',
      intro: 'Prin plasarea unei comenzi pe site, confirmi ca datele oferite sunt corecte si ca ai citit conditiile generale ale procesului de achizitie.',
      sections: [
        {
          heading: 'Comenzi si livrare',
          body: 'Comenzile sunt procesate in ordinea primirii, iar termenii de livrare pot varia in functie de disponibilitatea produselor si de localitate.'
        },
        {
          heading: 'Preturi si plata',
          body: 'Preturile afisate pe site sunt exprimate in Lei. Plata se poate face prin metodele active in checkout la momentul plasarii comenzii.'
        },
        {
          heading: 'Suport clienti',
          body: 'Daca ai nevoie de clarificari privind o comanda, retur sau disponibilitate, ne poti scrie folosind datele de contact afisate pe site.'
        }
      ]
    }
  },
  hu: {
    privacy: {
      title: 'Adatvedelmi tajekoztato',
      intro: 'Csak a rendelesek feldolgozasahoz, az ugyfelkapcsolathoz es a kiszallitas megszervezesehez szukseges adatokat kezeljuk.',
      sections: [
        {
          heading: 'Milyen adatokat kezelunk',
          body: 'A nevet, email-cimet, telefonszamot, szallitasi cimet es a rendeles adatait kizarolag a vasarlas lebonyolitasahoz hasznaljuk.'
        },
        {
          heading: 'Adatvedelem',
          body: 'Az adatokat bizalmasan kezeljuk, es csak azok a folyamatok fernek hozza, amelyek a rendelesek, a szamlazas vagy az ugyfelszolgalat miatt szuksegesek.'
        },
        {
          heading: 'Kapcsolatfelvetel',
          body: 'Ha adatkezelessel kapcsolatos kerdesed van, vagy modositani szeretned az adataidat, vedd fel velunk a kapcsolatot az oldalon megadott elerhetosegeken.'
        }
      ]
    },
    terms: {
      title: 'Felhasznalasi feltetelek',
      intro: 'A rendeles elkuldesevel megerosited, hogy a megadott adatok helyesek, es elfogadod a vasarlashoz kapcsolodo altalanos felteteleket.',
      sections: [
        {
          heading: 'Rendeles es szallitas',
          body: 'A rendeleseket beerkezesi sorrendben dolgozzuk fel, a szallitasi ido pedig a termekek elerhetosegetol es a celterulettol fugghet.'
        },
        {
          heading: 'Arak es fizetes',
          body: 'Az oldalon feltuntetett arak Lei penznemben ertendok. A fizetes a checkoutban eppen aktiv modszerekkel tortenik.'
        },
        {
          heading: 'Ugyfelszolgalat',
          body: 'Ha kerdesed van a rendeleseddel, az elallassal vagy a keszlettel kapcsolatban, irj nekunk a weboldalon feltuntetett elerhetosegeken.'
        }
      ]
    }
  },
  en: {
    privacy: {
      title: 'Privacy policy',
      intro: 'We only collect the information needed to process orders, communicate with customers, and arrange delivery.',
      sections: [
        {
          heading: 'What data we use',
          body: 'Your name, email, phone number, delivery address, and order details are used only for fulfilling purchases and customer communication.'
        },
        {
          heading: 'How we protect it',
          body: 'Data is handled confidentially and access is limited to the processes required for store operations, invoicing, and support.'
        },
        {
          heading: 'Questions about your data',
          body: 'If you need information about your data or want details updated, you can contact us directly through the contact page.'
        }
      ]
    },
    terms: {
      title: 'Terms and conditions',
      intro: 'By placing an order, you confirm that the information you provide is accurate and that you accept the general purchase conditions.',
      sections: [
        {
          heading: 'Orders and delivery',
          body: 'Orders are processed in the order received, and delivery timing may vary depending on product availability and destination.'
        },
        {
          heading: 'Pricing and payment',
          body: 'Prices displayed on the site are listed in Lei. Payment is completed using the checkout methods available at the time of purchase.'
        },
        {
          heading: 'Customer support',
          body: 'If you need help with an order, return, or stock question, you can reach out using the contact details shown on the website.'
        }
      ]
    }
  }
};

const LegalInfoPage = ({ variant }: LegalInfoPageProps) => {
  const { language } = useLanguage();
  const pageContent = PAGE_CONTENT[language][variant];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <SEOHead
        title={`${pageContent.title} | Atomra Home Romania`}
        description={pageContent.intro}
        url={getSiteUrl(variant === 'privacy' ? '/privacy-policy' : '/terms')}
        noindex
      />

      <div className="min-h-screen bg-slate-50 pt-32 sm:pt-36 md:pt-40 lg:pt-44">
        <div className="mx-auto max-w-4xl px-6 py-10 sm:px-8 lg:px-12">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
            <h1 className="mb-4 text-3xl font-extralight tracking-tight text-slate-900 sm:text-4xl">
              {pageContent.title}
            </h1>
            <p className="mb-8 max-w-3xl text-base font-light leading-relaxed text-slate-600 sm:text-lg">
              {pageContent.intro}
            </p>

            <div className="space-y-8">
              {pageContent.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="mb-3 text-xl font-light text-slate-900">{section.heading}</h2>
                  <p className="font-light leading-relaxed text-slate-600">{section.body}</p>
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LegalInfoPage;

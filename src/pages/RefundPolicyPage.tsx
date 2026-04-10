import { useEffect } from 'react';
import SEOHead from '../components/SEOHead';
import {
  BUSINESS_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  SITE_NAME,
  getSiteUrl,
} from '../utils/siteConfig';

const formattedAddress = `${BUSINESS_ADDRESS.streetAddress}, ${BUSINESS_ADDRESS.addressLocality}, ${BUSINESS_ADDRESS.addressRegion}, ${BUSINESS_ADDRESS.addressCountry}`;

const structuredData = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Refund Policy | Atomra Home Romania',
  url: getSiteUrl('/refund-policy'),
  description:
    'Politica de retur si rambursare pentru comenzile plasate pe www.atomrahomeromania.ro.',
  inLanguage: 'ro-RO',
  publisher: {
    '@type': 'Organization',
    name: SITE_NAME,
    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONE,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS_ADDRESS.streetAddress,
      addressLocality: BUSINESS_ADDRESS.addressLocality,
      addressRegion: BUSINESS_ADDRESS.addressRegion,
      addressCountry: BUSINESS_ADDRESS.addressCountry,
    },
  },
});

const sections = [
  {
    heading: '1. Dreptul de retragere in 14 zile',
    body: 'Daca ai comandat ca persoana fizica prin intermediul site-ului nostru, ai dreptul sa te retragi din contract in termen de 14 zile calendaristice de la data la care ai intrat in posesia fizica a produselor, fara a fi obligat(a) sa justifici decizia.',
  },
  {
    heading: '2. Cum soliciti un retur',
    body: `Pentru a incepe procedura, trimite-ne un email la ${CONTACT_EMAIL} si mentioneaza numarul comenzii, numele folosit la plasarea acesteia, produsele pe care doresti sa le returnezi si, daca este cazul, un cont bancar IBAN pentru rambursarea comenzilor platite ramburs. Iti confirmam cererea si pasii urmatori, de regula, in 1-2 zile lucratoare.`,
  },
  {
    heading: '3. Conditii de acceptare a returului',
    body: 'Produsele returnate trebuie sa fie in stare buna, fara urme de utilizare peste nivelul necesar pentru o verificare rezonabila, cu toate accesoriile incluse si, pe cat posibil, in ambalajul original. Daca produsul este returnat incomplet, deteriorat din culpa clientului sau prezinta urme evidente de folosire, ne rezervam dreptul de a diminua valoarea rambursata proportional cu diminuarea valorii comerciale sau de a refuza returul, in cazurile permise de lege.',
  },
  {
    heading: '4. Costurile de retur',
    body: 'Pentru retururile obisnuite exercitate in baza dreptului de retragere, costul transportului de retur este suportat de client. In cazul in care produsul a fost livrat gresit, este deteriorat la livrare sau prezinta un defect de conformitate, costurile aferente returului si, daca este cazul, ale inlocuirii vor fi suportate de noi.',
  },
  {
    heading: '5. Unde se trimit produsele',
    body: `Retururile se expediaza prin curier la adresa: ${formattedAddress}. Recomandam pastrarea dovezii de expediere pana la finalizarea rambursarii.`,
  },
  {
    heading: '6. Rambursarea sumelor',
    body: 'Dupa ce primim produsele returnate sau dovada expedierii lor, vom procesa rambursarea fara intarzieri nejustificate, in maximum 14 zile calendaristice. Rambursarea se face, atunci cand este posibil, prin aceeasi metoda de plata folosita la comanda. Pentru comenzile achitate ramburs, restituirea sumei se poate face prin transfer bancar. In cazul retragerii din intreaga comanda, putem rambursa si costul livrarii standard achitat initial, conform legislatiei aplicabile. Costurile suplimentare aferente unei optiuni de livrare diferite de livrarea standard nu se ramburseaza.',
  },
  {
    heading: '7. Retur partial si comenzi multiple',
    body: 'Daca returnezi doar o parte din produse, rambursarea va acoperi contravaloarea produselor acceptate la retur. Costul initial al transportului nu se ramburseaza, de regula, pentru retururi partiale, cu exceptia situatiilor in care legea prevede altfel.',
  },
  {
    heading: '8. Produse deteriorate, defecte sau expediate eronat',
    body: 'Daca primesti un produs deteriorat, defect sau diferit fata de comanda, te rugam sa ne contactezi cat mai repede, ideal in maximum 48 de ore de la livrare, la emailul de mai sus, impreuna cu fotografii relevante. Vom analiza situatia si vom propune, dupa caz, inlocuirea produsului, returnarea sumei achitate sau o alta solutie rezonabila.',
  },
  {
    heading: '9. Exceptii si limitari',
    body: 'Nu acceptam returul produselor realizate la comanda sau personalizate pentru client, al produselor care nu mai pot fi revandute din motive de igiena ori protectie a sanatatii dupa desigilare, precum si al produselor care au fost folosite excesiv sau deteriorate dupa livrare. Aceasta lista se aplica in limitele permise de legislatia in vigoare.',
  },
  {
    heading: '10. Schimburi',
    body: 'In mod obisnuit nu operam schimburi directe standard. Daca doresti un alt produs, poti solicita returul produsului initial si poti plasa o noua comanda. Pentru produsele expediate gresit sau neconforme, putem oferi inlocuire in functie de disponibilitatea stocului.',
  },
  {
    heading: '11. Date de contact',
    body: `Pentru orice intrebare legata de retururi si rambursari, ne poti contacta la ${CONTACT_EMAIL}, telefon ${CONTACT_PHONE}, sau la adresa ${formattedAddress}.`,
  },
];

const RefundPolicyPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <SEOHead
        title="Refund Policy | Atomra Home Romania"
        description="Politica de retur si rambursare pentru comenzile plasate pe www.atomrahomeromania.ro."
        url={getSiteUrl('/refund-policy')}
        structuredData={structuredData}
      />

      <div className="min-h-screen bg-slate-50 pt-32 sm:pt-36 md:pt-40 lg:pt-44">
        <div className="mx-auto max-w-4xl px-6 py-10 sm:px-8 lg:px-12">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
            <div className="mb-8 border-b border-slate-100 pb-8">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.24em] text-slate-500">
                Customer Policy
              </p>
              <h1 className="mb-4 text-3xl font-extralight tracking-tight text-slate-900 sm:text-4xl">
                Politica de retur si rambursare
              </h1>
              <p className="max-w-3xl text-base font-light leading-relaxed text-slate-600 sm:text-lg">
                Aceasta pagina explica in mod clar conditiile in care poti returna produsele comandate
                de pe www.atomrahomeromania.ro si modul in care procesam rambursarile. Politica se aplica
                comenzilor plasate online si completeaza drepturile consumatorului prevazute de
                legislatia aplicabila.
              </p>
              <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-light text-slate-600">
                Ultima actualizare: 10 aprilie 2026
              </div>
            </div>

            <div className="mb-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  Fereastra de retur
                </p>
                <p className="mt-2 text-lg font-light text-slate-900">14 zile calendaristice</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  Contact retur
                </p>
                <p className="mt-2 break-all text-sm font-light text-slate-900">{CONTACT_EMAIL}</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  Timp rambursare
                </p>
                <p className="mt-2 text-lg font-light text-slate-900">maximum 14 zile</p>
              </div>
            </div>

            <div className="space-y-8">
              {sections.map((section) => (
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

export default RefundPolicyPage;

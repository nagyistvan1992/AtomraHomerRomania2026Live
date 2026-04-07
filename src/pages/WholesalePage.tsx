import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, FileText, Package, Truck, DollarSign } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { useLanguage } from '../context/LanguageContext';
import { CONTACT_EMAIL, getSiteUrl } from '../utils/siteConfig';

type LanguageContent = {
  title: string;
  subtitle: string;
  description: string;
  benefitsTitle: string;
  benefits: string[];
  requirementsTitle: string;
  requirements: string[];
  contactTitle: string;
  contactDescription: string;
  formTitle: string;
  cta: string;
  labels: {
    companyName: string;
    taxId: string;
    contactName: string;
    position: string;
    email: string;
    phone: string;
    businessType: string;
    monthlyVolume: string;
    message: string;
    consent: string;
    select: string;
  };
  options: {
    retail: string;
    online: string;
    events: string;
    designer: string;
    other: string;
  };
  messagePlaceholder: string;
  featureTitles: [string, string, string];
  featureDescriptions: [string, string, string];
  seoDescription: string;
  seoKeywords: string;
};

const WholesalePage = () => {
  const { language } = useLanguage();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const contentByLanguage: Record<'ro' | 'hu' | 'en', LanguageContent> = {
    ro: {
      title: 'Vânzări Angro',
      subtitle: 'Devino partener Atomra și oferă clienților tăi produse premium din ceară naturală.',
      description: 'Oferim soluții angro pentru magazine, designeri de interior, organizatori de evenimente și alte afaceri care vor produse curate, premium și memorabile.',
      benefitsTitle: 'Beneficii pentru Parteneri',
      benefits: [
        'Prețuri competitive pentru comenzi în volum mare',
        'Produse premium din ceară naturală',
        'Opțiuni de personalizare pentru brandul tău',
        'Suport dedicat pentru parteneri',
        'Livrare rapidă și fiabilă',
        'Materiale de marketing și suport comercial'
      ],
      requirementsTitle: 'Cerințe pentru Parteneri',
      requirements: [
        'Comandă minimă recomandată de 1000 Lei',
        'Date complete de facturare',
        'Interes pentru colaborare recurentă sau proiecte speciale',
        'Respectarea standardelor de prezentare Atomra'
      ],
      contactTitle: 'Contactează-ne pentru Detalii',
      contactDescription: 'Completează formularul de mai jos sau scrie-ne direct pentru a discuta despre volume, personalizare și prețuri.',
      formTitle: 'Solicită Informații',
      cta: 'Trimite Cererea',
      labels: {
        companyName: 'Nume Companie',
        taxId: 'Cod Fiscal',
        contactName: 'Nume Contact',
        position: 'Poziție',
        email: 'Email',
        phone: 'Telefon',
        businessType: 'Tipul Afacerii',
        monthlyVolume: 'Volum Estimat Lunar (Lei)',
        message: 'Mesaj',
        consent: 'Sunt de acord cu prelucrarea datelor mele în conformitate cu Politica de Confidențialitate.',
        select: 'Selectează'
      },
      options: {
        retail: 'Magazin Retail',
        online: 'Magazin Online',
        events: 'Organizator Evenimente',
        designer: 'Designer Interior',
        other: 'Altele'
      },
      messagePlaceholder: 'Spune-ne mai multe despre afacerea ta și despre produsele care te interesează.',
      featureTitles: ['Ambalare Personalizată', 'Livrare Rapidă', 'Prețuri Competitive'],
      featureDescriptions: [
        'Opțiuni de ambalare personalizată cu identitatea brandului tău.',
        'Livrare rapidă și predictibilă pentru comenzile angro.',
        'Structuri de preț adaptate volumului și tipului de colaborare.'
      ],
      seoDescription: 'Devino partener Atomra și oferă clienților tăi produse premium din ceară naturală. Contactează-ne pentru oportunități de vânzare angro.',
      seoKeywords: 'wholesale, vânzări angro, parteneriat, ceară naturală, lumânări, volume mari, business'
    },
    hu: {
      title: 'Nagykereskedelem',
      subtitle: 'Válj Atomra partnerré és kínálj ügyfeleidnek prémium természetes viasztermékeket.',
      description: 'Nagykereskedelmi megoldásokat kínálunk üzleteknek, belsőépítészeknek, rendezvényszervezőknek és más vállalkozásoknak.',
      benefitsTitle: 'Partneri Előnyök',
      benefits: [
        'Versenyképes árak nagyobb rendelésekhez',
        'Prémium természetes viasztermékek',
        'Testreszabási lehetőségek a brandedhez',
        'Dedikált partneri támogatás',
        'Gyors és megbízható szállítás',
        'Marketinganyagok és értékesítési segítség'
      ],
      requirementsTitle: 'Partneri Feltételek',
      requirements: [
        'Ajánlott minimum rendelés: 1000 Lei',
        'Teljes számlázási adatok',
        'Visszatérő együttműködési szándék vagy projektalapú igény',
        'Az Atomra megjelenési standardjainak tiszteletben tartása'
      ],
      contactTitle: 'Lépj Velünk Kapcsolatba',
      contactDescription: 'Töltsd ki az alábbi űrlapot, vagy írj közvetlenül a mennyiségek, testreszabás és árak megbeszéléséhez.',
      formTitle: 'Információkérés',
      cta: 'Küldés',
      labels: {
        companyName: 'Cégnév',
        taxId: 'Adószám',
        contactName: 'Kapcsolattartó Neve',
        position: 'Pozíció',
        email: 'Email',
        phone: 'Telefon',
        businessType: 'Üzlet Típusa',
        monthlyVolume: 'Becsült Havi Volumen (Lei)',
        message: 'Üzenet',
        consent: 'Hozzájárulok adataim feldolgozásához az Adatvédelmi Szabályzatnak megfelelően.',
        select: 'Válassz'
      },
      options: {
        retail: 'Kiskereskedés',
        online: 'Online Üzlet',
        events: 'Rendezvényszervező',
        designer: 'Belsőépítész',
        other: 'Egyéb'
      },
      messagePlaceholder: 'Írj néhány részletet a vállalkozásodról és arról, milyen termékek érdekelnek.',
      featureTitles: ['Egyedi Csomagolás', 'Gyors Szállítás', 'Versenyképes Árak'],
      featureDescriptions: [
        'Saját brandedhez igazítható csomagolási lehetőségek.',
        'Gyors és kiszámítható szállítás nagykereskedelmi megrendelésekhez.',
        'Az együttműködés típusához és a volumenhez igazított árstruktúra.'
      ],
      seoDescription: 'Lépj partnerségre az Atomrával és kínálj prémium természetes viasztermékeket ügyfeleidnek.',
      seoKeywords: 'nagykereskedelem, partnerseg, termeszetes viasz, gyertyak, uzleti rendeles'
    },
    en: {
      title: 'Wholesale',
      subtitle: 'Become an Atomra partner and offer premium natural wax products to your customers.',
      description: 'We provide wholesale solutions for stores, interior designers, event planners, and other businesses looking for clean, premium, memorable products.',
      benefitsTitle: 'Partner Benefits',
      benefits: [
        'Competitive pricing for larger orders',
        'Premium natural wax products',
        'Customization options for your brand',
        'Dedicated partner support',
        'Fast and reliable shipping',
        'Marketing materials and sales support'
      ],
      requirementsTitle: 'Partner Requirements',
      requirements: [
        'Recommended minimum order of 1000 Lei',
        'Complete billing details',
        'Interest in recurring collaboration or special projects',
        'Respect for Atomra presentation standards'
      ],
      contactTitle: 'Contact Us for Details',
      contactDescription: 'Fill out the form below or write to us directly to discuss volume, customization, and pricing.',
      formTitle: 'Request Information',
      cta: 'Send Request',
      labels: {
        companyName: 'Company Name',
        taxId: 'Tax ID',
        contactName: 'Contact Name',
        position: 'Position',
        email: 'Email',
        phone: 'Phone',
        businessType: 'Business Type',
        monthlyVolume: 'Estimated Monthly Volume (Lei)',
        message: 'Message',
        consent: 'I agree to the processing of my data in accordance with the Privacy Policy.',
        select: 'Select'
      },
      options: {
        retail: 'Retail Store',
        online: 'Online Store',
        events: 'Event Planner',
        designer: 'Interior Designer',
        other: 'Other'
      },
      messagePlaceholder: 'Tell us more about your business and the products you are interested in.',
      featureTitles: ['Custom Packaging', 'Fast Shipping', 'Competitive Pricing'],
      featureDescriptions: [
        'Packaging options tailored to your brand identity.',
        'Fast and predictable delivery for wholesale orders.',
        'Pricing structures adapted to volume and partnership type.'
      ],
      seoDescription: 'Become an Atomra partner and offer premium natural wax products to your customers.',
      seoKeywords: 'wholesale, partnership, natural wax, candles, bulk orders, business'
    }
  };

  const content = contentByLanguage[language];

  return (
    <>
      <SEOHead
        title={`${content.title} | ${CONTACT_EMAIL}`}
        description={content.seoDescription}
        keywords={content.seoKeywords}
        url={getSiteUrl('/wholesale')}
      />

      <div className="luxury-page-bg luxury-floating-elements min-h-screen">
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-32 left-16 w-1 h-1 bg-slate-300/20 rounded-full animate-luxury-float"></div>
          <div className="absolute top-48 right-24 w-0.5 h-0.5 bg-slate-200/30 rounded-full animate-luxury-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-32 left-1/4 w-0.5 h-0.5 bg-slate-300/25 rounded-full animate-luxury-float" style={{ animationDelay: '4s' }}></div>
          <div className="absolute bottom-48 right-1/4 w-1 h-1 bg-slate-200/20 rounded-full animate-luxury-float" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="pt-32 sm:pt-36 md:pt-40 lg:pt-44 relative z-10">
          <section className="py-6 sm:py-8 luxury-section-light">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extralight text-slate-900 mb-6 tracking-tight"
              >
                {content.title}
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-16 h-px bg-slate-300 mx-auto mb-6"
              />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-lg text-slate-600 max-w-4xl mx-auto font-light leading-relaxed"
              >
                {content.subtitle}
              </motion.p>
            </div>
          </section>

          <section className="py-16 sm:py-20 luxury-section-dark">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="luxury-card p-8 rounded-lg h-full">
                    <p className="text-lg text-slate-600 font-light mb-8 leading-relaxed">
                      {content.description}
                    </p>

                    <div className="mb-8">
                      <h2 className="text-xl font-light text-slate-900 mb-4">{content.benefitsTitle}</h2>
                      <ul className="space-y-3">
                        {content.benefits.map((item) => (
                          <li key={item} className="flex items-start">
                            <div className="flex-shrink-0 w-5 h-5 bg-slate-100 rounded-full flex items-center justify-center mt-0.5 mr-3">
                              <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                            </div>
                            <span className="text-slate-600 font-light">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-8">
                      <h2 className="text-xl font-light text-slate-900 mb-4">{content.requirementsTitle}</h2>
                      <ul className="space-y-3">
                        {content.requirements.map((item) => (
                          <li key={item} className="flex items-start">
                            <div className="flex-shrink-0 w-5 h-5 bg-slate-100 rounded-full flex items-center justify-center mt-0.5 mr-3">
                              <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                            </div>
                            <span className="text-slate-600 font-light">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-slate-50 p-6 rounded-lg">
                      <h2 className="text-xl font-light text-slate-900 mb-4">{content.contactTitle}</h2>
                      <p className="text-slate-600 font-light mb-4">{content.contactDescription}</p>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Mail size={18} className="text-slate-500 mr-2" />
                          <span className="text-slate-600 font-light">{CONTACT_EMAIL}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone size={18} className="text-slate-500 mr-2" />
                          <span className="text-slate-600 font-light">0751801025</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="luxury-card p-8 rounded-lg">
                    <h2 className="text-2xl font-light text-slate-900 mb-6">{content.formTitle}</h2>

                    <form className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-light text-slate-700 mb-1">{content.labels.companyName} *</label>
                          <input type="text" required className="w-full px-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 text-sm font-light" />
                        </div>
                        <div>
                          <label className="block text-sm font-light text-slate-700 mb-1">{content.labels.taxId} *</label>
                          <input type="text" required className="w-full px-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 text-sm font-light" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-light text-slate-700 mb-1">{content.labels.contactName} *</label>
                          <input type="text" required className="w-full px-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 text-sm font-light" />
                        </div>
                        <div>
                          <label className="block text-sm font-light text-slate-700 mb-1">{content.labels.position} *</label>
                          <input type="text" required className="w-full px-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 text-sm font-light" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-light text-slate-700 mb-1">{content.labels.email} *</label>
                          <input type="email" required className="w-full px-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 text-sm font-light" />
                        </div>
                        <div>
                          <label className="block text-sm font-light text-slate-700 mb-1">{content.labels.phone} *</label>
                          <input type="tel" required className="w-full px-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 text-sm font-light" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-light text-slate-700 mb-1">{content.labels.businessType} *</label>
                        <select required className="w-full px-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 text-sm font-light">
                          <option value="">{content.labels.select}</option>
                          <option value="retail">{content.options.retail}</option>
                          <option value="online">{content.options.online}</option>
                          <option value="events">{content.options.events}</option>
                          <option value="designer">{content.options.designer}</option>
                          <option value="other">{content.options.other}</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-light text-slate-700 mb-1">{content.labels.monthlyVolume} *</label>
                        <select required className="w-full px-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 text-sm font-light">
                          <option value="">{content.labels.select}</option>
                          <option value="1000-3000">1,000 - 3,000 Lei</option>
                          <option value="3000-5000">3,000 - 5,000 Lei</option>
                          <option value="5000-10000">5,000 - 10,000 Lei</option>
                          <option value="10000+">10,000+ Lei</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-light text-slate-700 mb-1">{content.labels.message}</label>
                        <textarea rows={4} className="w-full px-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 text-sm font-light" placeholder={content.messagePlaceholder}></textarea>
                      </div>

                      <div className="flex items-start">
                        <input type="checkbox" id="terms" required className="mt-1 mr-2" />
                        <label htmlFor="terms" className="text-sm text-slate-600 font-light">
                          {content.labels.consent}
                        </label>
                      </div>

                      <button type="submit" className="bg-slate-900 text-white px-8 py-3 font-light tracking-wide uppercase hover:bg-slate-800 transition-colors duration-300 rounded flex items-center justify-center space-x-2">
                        <FileText size={18} strokeWidth={1.5} />
                        <span>{content.cta}</span>
                      </button>
                    </form>
                  </div>
                </motion.div>
              </div>

              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className="luxury-card p-6 rounded-lg text-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package size={24} className="text-slate-600" />
                  </div>
                  <h3 className="text-lg font-light text-slate-900 mb-2">{content.featureTitles[0]}</h3>
                  <p className="text-slate-600 font-light">{content.featureDescriptions[0]}</p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }} className="luxury-card p-6 rounded-lg text-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Truck size={24} className="text-slate-600" />
                  </div>
                  <h3 className="text-lg font-light text-slate-900 mb-2">{content.featureTitles[1]}</h3>
                  <p className="text-slate-600 font-light">{content.featureDescriptions[1]}</p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.7 }} className="luxury-card p-6 rounded-lg text-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign size={24} className="text-slate-600" />
                  </div>
                  <h3 className="text-lg font-light text-slate-900 mb-2">{content.featureTitles[2]}</h3>
                  <p className="text-slate-600 font-light">{content.featureDescriptions[2]}</p>
                </motion.div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default WholesalePage;

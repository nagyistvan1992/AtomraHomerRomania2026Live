import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import SEOHead from '../components/SEOHead';
import { motion } from 'framer-motion';
import { Mail, Phone, FileText, Package, Truck, DollarSign } from 'lucide-react';

const WholesalePage = () => {
  const { language } = useLanguage();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Get page title based on language
  const getPageTitle = () => {
    if (language === 'ro') {
      return 'Vânzări Angro | Atomra Home Romania';
    } else if (language === 'hu') {
      return 'Nagykereskedelem | Atomra Home Romania';
    } else {
      return 'Wholesale | Atomra Home Romania';
    }
  };

  // Get content based on language
  const getContent = () => {
    if (language === 'ro') {
      return {
        title: 'Vânzări Angro',
        subtitle: 'Devino partener Atomra și oferă clienților tăi produse premium din ceară naturală',
        description: 'Oferim soluții angro pentru magazine, designeri de interior, organizatori de evenimente și alte afaceri. Contactează-ne pentru a discuta despre oportunități de parteneriat și prețuri speciale pentru comenzi în volum mare.',
        benefits: {
          title: 'Beneficii pentru Parteneri',
          items: [
            'Prețuri competitive pentru comenzi în volum mare',
            'Produse premium din ceară naturală',
            'Opțiuni de personalizare pentru afacerea ta',
            'Suport dedicat pentru parteneri',
            'Livrare rapidă și fiabilă',
            'Materiale de marketing și suport pentru vânzări'
          ]
        },
        requirements: {
          title: 'Cerințe pentru Parteneri',
          items: [
            'Comandă minimă de 1000 Lei',
            'Dovada înregistrării afacerii',
            'Angajament pentru standardele de calitate Atomra',
            'Respectarea politicilor de preț recomandate'
          ]
        },
        contact: {
          title: 'Contactează-ne pentru Detalii',
          description: 'Completează formularul de mai jos sau contactează-ne direct pentru a discuta despre oportunități de parteneriat.',
          email: 'Email: wholesale@atomra-home-romania.com',
          phone: 'Telefon: +40 123 456 789'
        },
        cta: 'Solicită Informații'
      };
    } else if (language === 'hu') {
      return {
        title: 'Nagykereskedelem',
        subtitle: 'Válj Atomra partnerré és kínálj prémium természetes viaszgyertyákat ügyfeleidnek',
        description: 'Nagykereskedelmi megoldásokat kínálunk üzletek, belsőépítészek, rendezvényszervezők és más vállalkozások számára. Vedd fel velünk a kapcsolatot, hogy megbeszéljük a partneri lehetőségeket és a speciális árakat nagy mennyiségű rendelésekre.',
        benefits: {
          title: 'Partneri Előnyök',
          items: [
            'Versenyképes árak nagy mennyiségű rendelésekre',
            'Prémium természetes viasztermékek',
            'Testreszabási lehetőségek vállalkozásod számára',
            'Dedikált partneri támogatás',
            'Gyors és megbízható szállítás',
            'Marketing anyagok és értékesítési támogatás'
          ]
        },
        requirements: {
          title: 'Partneri Követelmények',
          items: [
            'Minimum 1000 Lei értékű rendelés',
            'Üzleti regisztráció igazolása',
            'Elkötelezettség az Atomra minőségi szabványai mellett',
            'Az ajánlott árpolitika betartása'
          ]
        },
        contact: {
          title: 'Vedd fel velünk a kapcsolatot a részletekért',
          description: 'Töltsd ki az alábbi űrlapot, vagy vedd fel velünk közvetlenül a kapcsolatot a partneri lehetőségek megbeszéléséhez.',
          email: 'Email: wholesale@atomra-home-romania.com',
          phone: 'Telefon: +40 123 456 789'
        },
        cta: 'Információkérés'
      };
    } else {
      return {
        title: 'Wholesale',
        subtitle: 'Become an Atomra partner and offer premium natural wax products to your customers',
        description: 'We offer wholesale solutions for stores, interior designers, event planners, and other businesses. Contact us to discuss partnership opportunities and special pricing for bulk orders.',
        benefits: {
          title: 'Partner Benefits',
          items: [
            'Competitive pricing for bulk orders',
            'Premium natural wax products',
            'Customization options for your business',
            'Dedicated partner support',
            'Fast and reliable shipping',
            'Marketing materials and sales support'
          ]
        },
        requirements: {
          title: 'Partner Requirements',
          items: [
            'Minimum order of 1000 Lei',
            'Proof of business registration',
            'Commitment to Atomra quality standards',
            'Adherence to recommended pricing policies'
          ]
        },
        contact: {
          title: 'Contact Us for Details',
          description: 'Fill out the form below or contact us directly to discuss partnership opportunities.',
          email: 'Email: wholesale@atomra-home-romania.com',
          phone: 'Phone: +40 123 456 789'
        },
        cta: 'Request Information'
      };
    }
  };

  const content = getContent();

  return (
    <>
      <SEOHead
        title={getPageTitle()}
        description="Devino partener Atomra și oferă clienților tăi produse premium din ceară naturală. Contactează-ne pentru oportunități de vânzare angro."
        keywords="wholesale, vânzări angro, parteneriat, ceară naturală, lumânări, volume mari, business"
        url="https://atomra-home-romania.com/wholesale"
      />
      
      <div className="luxury-page-bg luxury-floating-elements min-h-screen">
        {/* Luxury floating decorative elements */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-32 left-16 w-1 h-1 bg-slate-300/20 rounded-full animate-luxury-float"></div>
          <div className="absolute top-48 right-24 w-0.5 h-0.5 bg-slate-200/30 rounded-full animate-luxury-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-32 left-1/4 w-0.5 h-0.5 bg-slate-300/25 rounded-full animate-luxury-float" style={{ animationDelay: '4s' }}></div>
          <div className="absolute bottom-48 right-1/4 w-1 h-1 bg-slate-200/20 rounded-full animate-luxury-float" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="pt-32 sm:pt-36 md:pt-40 lg:pt-44 relative z-10">
          {/* Header Section */}
          <section className="py-6 sm:py-8 luxury-section-light">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
              <div className="text-center">
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
                ></motion.div>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-lg text-slate-600 max-w-4xl mx-auto font-light leading-relaxed"
                >
                  {content.subtitle}
                </motion.p>
              </div>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-16 sm:py-20 luxury-section-dark">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                {/* Left Column - Information */}
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
                      <h2 className="text-xl font-light text-slate-900 mb-4">{content.benefits.title}</h2>
                      <ul className="space-y-3">
                        {content.benefits.items.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <div className="flex-shrink-0 w-5 h-5 bg-slate-100 rounded-full flex items-center justify-center mt-0.5 mr-3">
                              <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                            </div>
                            <span className="text-slate-600 font-light">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mb-8">
                      <h2 className="text-xl font-light text-slate-900 mb-4">{content.requirements.title}</h2>
                      <ul className="space-y-3">
                        {content.requirements.items.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <div className="flex-shrink-0 w-5 h-5 bg-slate-100 rounded-full flex items-center justify-center mt-0.5 mr-3">
                              <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                            </div>
                            <span className="text-slate-600 font-light">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-slate-50 p-6 rounded-lg">
                      <h2 className="text-xl font-light text-slate-900 mb-4">{content.contact.title}</h2>
                      <p className="text-slate-600 font-light mb-4">{content.contact.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Mail size={18} className="text-slate-500 mr-2" />
                          <span className="text-slate-600 font-light">Email: atomrahomeromania@gmail.com</span>
                        </div>
                        <div className="flex items-center">
                          <Phone size={18} className="text-slate-500 mr-2" />
                          <span className="text-slate-600 font-light">Telefon: +40751801025</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Right Column - Form */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="luxury-card p-8 rounded-lg">
                    <h2 className="text-2xl font-light text-slate-900 mb-6">{content.cta}</h2>
                    
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-light text-slate-700 mb-1">
                            {language === 'ro' ? 'Nume Companie' : language === 'hu' ? 'Cégnév' : 'Company Name'} *
                          </label>
                          <input
                            type="text"
                            required
                            className="w-full px-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 text-sm font-light"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-light text-slate-700 mb-1">
                            {language === 'ro' ? 'Cod Fiscal' : language === 'hu' ? 'Adószám' : 'Tax ID'} *
                          </label>
                          <input
                            type="text"
                            required
                            className="w-full px-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 text-sm font-light"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-light text-slate-700 mb-1">
                            {language === 'ro' ? 'Nume Contact' : language === 'hu' ? 'Kapcsolattartó Neve' : 'Contact Name'} *
                          </label>
                          <input
                            type="text"
                            required
                            className="w-full px-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 text-sm font-light"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-light text-slate-700 mb-1">
                            {language === 'ro' ? 'Poziție' : language === 'hu' ? 'Pozíció' : 'Position'} *
                          </label>
                          <input
                            type="text"
                            required
                            className="w-full px-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 text-sm font-light"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-light text-slate-700 mb-1">
                            {language === 'ro' ? 'Email' : language === 'hu' ? 'Email' : 'Email'} *
                          </label>
                          <input
                            type="email"
                            required
                            className="w-full px-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 text-sm font-light"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-light text-slate-700 mb-1">
                            {language === 'ro' ? 'Telefon' : language === 'hu' ? 'Telefon' : 'Phone'} *
                          </label>
                          <input
                            type="tel"
                            required
                            className="w-full px-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 text-sm font-light"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-light text-slate-700 mb-1">
                          {language === 'ro' ? 'Tipul Afacerii' : language === 'hu' ? 'Üzlet Típusa' : 'Business Type'} *
                        </label>
                        <select
                          required
                          className="w-full px-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 text-sm font-light"
                        >
                          <option value="">{language === 'ro' ? 'Selectează' : language === 'hu' ? 'Válassz' : 'Select'}</option>
                          <option value="retail">{language === 'ro' ? 'Magazin Retail' : language === 'hu' ? 'Kiskereskedés' : 'Retail Store'}</option>
                          <option value="online">{language === 'ro' ? 'Magazin Online' : language === 'hu' ? 'Online Üzlet' : 'Online Store'}</option>
                          <option value="events">{language === 'ro' ? 'Organizator Evenimente' : language === 'hu' ? 'Rendezvényszervező' : 'Event Planner'}</option>
                          <option value="designer">{language === 'ro' ? 'Designer Interior' : language === 'hu' ? 'Belsőépítész' : 'Interior Designer'}</option>
                          <option value="other">{language === 'ro' ? 'Altele' : language === 'hu' ? 'Egyéb' : 'Other'}</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-light text-slate-700 mb-1">
                          {language === 'ro' ? 'Volum Estimat Lunar (Lei)' : language === 'hu' ? 'Becsült Havi Mennyiség (Lei)' : 'Estimated Monthly Volume (Lei)'} *
                        </label>
                        <select
                          required
                          className="w-full px-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 text-sm font-light"
                        >
                          <option value="">{language === 'ro' ? 'Selectează' : language === 'hu' ? 'Válassz' : 'Select'}</option>
                          <option value="1000-3000">1,000 - 3,000 Lei</option>
                          <option value="3000-5000">3,000 - 5,000 Lei</option>
                          <option value="5000-10000">5,000 - 10,000 Lei</option>
                          <option value="10000+">10,000+ Lei</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-light text-slate-700 mb-1">
                          {language === 'ro' ? 'Mesaj' : language === 'hu' ? 'Üzenet' : 'Message'}
                        </label>
                        <textarea
                          rows={4}
                          className="w-full px-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 text-sm font-light"
                          placeholder={language === 'ro' ? 'Detalii suplimentare despre afacerea ta și interesele tale...' : 
                                      language === 'hu' ? 'További részletek a vállalkozásodról és érdeklődési körödről...' : 
                                      'Additional details about your business and interests...'}
                        ></textarea>
                      </div>
                      
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id="terms"
                          required
                          className="mt-1 mr-2"
                        />
                        <label htmlFor="terms" className="text-sm text-slate-600 font-light">
                          {language === 'ro' ? 'Sunt de acord cu prelucrarea datelor mele în conformitate cu Politica de Confidențialitate' : 
                           language === 'hu' ? 'Hozzájárulok adataim feldolgozásához az Adatvédelmi Szabályzatnak megfelelően' : 
                           'I agree to the processing of my data in accordance with the Privacy Policy'}
                        </label>
                      </div>
                      
                      <button
                        type="submit"
                        className="bg-slate-900 text-white px-8 py-3 font-light tracking-wide uppercase hover:bg-slate-800 transition-colors duration-300 rounded flex items-center justify-center space-x-2"
                      >
                        <FileText size={18} strokeWidth={1.5} />
                        <span>{content.cta}</span>
                      </button>
                    </form>
                  </div>
                </motion.div>
              </div>
              
              {/* Features Section */}
              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="luxury-card p-6 rounded-lg text-center"
                >
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package size={24} className="text-slate-600" />
                  </div>
                  <h3 className="text-lg font-light text-slate-900 mb-2">
                    {language === 'ro' ? 'Ambalare Personalizată' : 
                     language === 'hu' ? 'Egyedi Csomagolás' : 
                     'Custom Packaging'}
                  </h3>
                  <p className="text-slate-600 font-light">
                    {language === 'ro' ? 'Opțiuni de ambalare personalizată cu logo-ul și brandul tău.' : 
                     language === 'hu' ? 'Egyedi csomagolási lehetőségek a logóddal és márkáddal.' : 
                     'Custom packaging options with your logo and branding.'}
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="luxury-card p-6 rounded-lg text-center"
                >
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Truck size={24} className="text-slate-600" />
                  </div>
                  <h3 className="text-lg font-light text-slate-900 mb-2">
                    {language === 'ro' ? 'Livrare Rapidă' : 
                     language === 'hu' ? 'Gyors Szállítás' : 
                     'Fast Shipping'}
                  </h3>
                  <p className="text-slate-600 font-light">
                    {language === 'ro' ? 'Livrare rapidă și fiabilă pentru toate comenzile angro.' : 
                     language === 'hu' ? 'Gyors és megbízható szállítás minden nagykereskedelmi rendeléshez.' : 
                     'Fast and reliable shipping for all wholesale orders.'}
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="luxury-card p-6 rounded-lg text-center"
                >
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign size={24} className="text-slate-600" />
                  </div>
                  <h3 className="text-lg font-light text-slate-900 mb-2">
                    {language === 'ro' ? 'Prețuri Competitive' : 
                     language === 'hu' ? 'Versenyképes Árak' : 
                     'Competitive Pricing'}
                  </h3>
                  <p className="text-slate-600 font-light">
                    {language === 'ro' ? 'Prețuri speciale pentru parteneri și comenzi în volum mare.' : 
                     language === 'hu' ? 'Speciális árak partnereknek és nagy mennyiségű rendelésekre.' : 
                     'Special pricing for partners and bulk orders.'}
                  </p>
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
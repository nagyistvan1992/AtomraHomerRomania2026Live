import React, { useEffect } from 'react';
import { Sparkles, Bell, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';

const ComingSoonPage = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <SEOHead
        title="În Curând | Noi Colecții | Atomra Home Romania"
        description="Descoperă în curând noile noastre colecții de lumânări din ceară naturală. Fii primul care află despre lansările noastre viitoare și produsele în ediție limitată."
        keywords="în curând, noi colecții, lumânări din ceară naturală, produse viitoare, ediție limitată"
        url="https://atomra-home-romania.com/coming-soon"
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
              <div className="flex items-center mb-4">
                <Link 
                  to="/" 
                  className="flex items-center space-x-2 text-slate-600 hover:text-slate-800 transition-colors duration-200 group"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  <ArrowLeft size={18} strokeWidth={1.5} className="group-hover:-translate-x-1 transition-transform duration-200" />
                  <span className="font-light">Back to Home</span>
                </Link>
              </div>
              
              <div className="text-center">
                <div className="mb-8">
                  <div className="w-16 h-16 mx-auto bg-slate-100/60 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Sparkles size={24} strokeWidth={1.5} className="text-slate-600" />
                  </div>
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extralight text-slate-900 mb-6 tracking-tight">
                  În Curând
                </h1>
                <div className="w-16 h-px bg-slate-300 mx-auto mb-6"></div>
                <p className="text-lg text-slate-600 max-w-4xl mx-auto font-light leading-relaxed">
                  Pregătim ceva special pentru tine. Noi colecții și produse inovatoare vor fi disponibile în curând.
                </p>
              </div>
            </div>
          </section>

          {/* Coming Soon Content */}
          <section className="py-16 sm:py-20 luxury-section-dark">
            <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
              <div className="luxury-card p-12 lg:p-16 rounded-lg text-center">
                <h2 className="text-2xl sm:text-3xl font-light text-slate-900 mb-8 tracking-tight">
                  Noi Colecții în Pregătire
                </h2>
                
                <p className="text-lg text-slate-600 mb-8 font-light leading-relaxed">
                  Echipa Atomra Home România lucrează la dezvoltarea unor noi colecții de lumânări din ceară naturală și accesorii premium. Suntem dedicați să aducem pe piață produse inovatoare, sustenabile și de înaltă calitate.
                </p>
                
                <div className="mb-12">
                  <div className="w-24 h-24 mx-auto bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm mb-6 border border-slate-200/50">
                    <div className="text-slate-600">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                      </svg>
                    </div>
                  </div>
                  
                  <p className="text-slate-700 font-light">
                    Suntem în procesul de creare a unor noi experiențe senzoriale pentru casa ta
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <div className="bg-white/60 p-6 rounded-lg shadow-sm border border-slate-100">
                    <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                    </div>
                    <h3 className="text-lg font-light text-slate-900 mb-2">Colecții Regionale</h3>
                    <p className="text-sm text-slate-600 font-light">
                      Inspirate din frumusețea și tradițiile diferitelor regiuni ale României
                    </p>
                  </div>
                  
                  <div className="bg-white/60 p-6 rounded-lg shadow-sm border border-slate-100">
                    <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    </div>
                    <h3 className="text-lg font-light text-slate-900 mb-2">Ediții Limitate</h3>
                    <p className="text-sm text-slate-600 font-light">
                      Colecții exclusive disponibile pentru o perioadă limitată de timp
                    </p>
                  </div>
                  
                  <div className="bg-white/60 p-6 rounded-lg shadow-sm border border-slate-100">
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                      </svg>
                    </div>
                    <h3 className="text-lg font-light text-slate-900 mb-2">Colaborări Speciale</h3>
                    <p className="text-sm text-slate-600 font-light">
                      Parteneriate cu artiști și designeri locali pentru creații unice
                    </p>
                  </div>
                </div>
                
                <div className="bg-slate-50 p-8 rounded-lg border border-slate-200 mb-8">
                  <h3 className="text-xl font-light text-slate-900 mb-4">
                    Fii Primul Care Află
                  </h3>
                  <p className="text-slate-600 mb-6 font-light">
                    Abonează-te la newsletter-ul nostru pentru a primi notificări despre noile lansări și oferte exclusive.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                    <input
                      type="email"
                      placeholder="Adresa ta de email"
                      className="flex-1 px-4 py-3 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-400 text-sm font-light rounded bg-white/80 backdrop-blur-sm"
                    />
                    <button className="bg-slate-900 text-white px-6 py-3 text-sm font-light tracking-wide uppercase hover:bg-slate-800 transition-all duration-300 rounded flex items-center justify-center space-x-2">
                      <Bell size={16} className="mr-2" />
                      <span>Abonează-mă</span>
                    </button>
                  </div>
                </div>
                
                <p className="text-sm text-slate-500 font-light">
                  Urmărește-ne pe rețelele sociale pentru a fi la curent cu toate noutățile și lansările viitoare.
                </p>
              </div>
            </div>
          </section>
          
          {/* SEO Content Section */}
          <section className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
              <h2 className="text-2xl sm:text-3xl font-light text-slate-900 mb-6 text-center">Viitoarele Noastre Colecții</h2>
              
              <div className="prose prose-slate max-w-none">
                <p>
                  La Atomra Home România, suntem mereu în căutarea inovației și a excelenței. Echipa noastră de designeri și artizani lucrează constant la dezvoltarea unor noi <strong>lumânări din ceară naturală</strong> care să îmbine tradiția cu modernitatea, sustenabilitatea cu eleganța.
                </p>
                
                <h3>Ce Urmează</h3>
                
                <p>
                  În lunile următoare, vom lansa noi colecții de <strong>lumânări personalizate</strong> și accesorii care vor transforma experiența ta cu lumânările:
                </p>
                
                <ul>
                  <li><strong>Colecția Sezoniară</strong> - Lumânări inspirate de anotimpurile României, cu parfumuri și culori care reflectă frumusețea fiecărui sezon</li>
                  <li><strong>Linia Premium</strong> - O selecție de lumânări de lux în recipiente elegante, perfecte pentru cadouri speciale</li>
                  <li><strong>Colecția Aromaterapie</strong> - Lumânări create special pentru beneficiile terapeutice, cu uleiuri esențiale pure</li>
                  <li><strong>Accesorii Complementare</strong> - Noi instrumente și recipiente pentru a-ți îmbunătăți experiența cu lumânările noastre</li>
                </ul>
                
                <h3>Angajamentul Nostru</h3>
                
                <p>
                  Toate viitoarele noastre produse vor respecta aceleași principii care ne ghidează de la început:
                </p>
                
                <ul>
                  <li>Utilizarea exclusivă a <strong>ceară naturală</strong>, inclusiv <strong>ceara de soia</strong> și alte ingrediente naturale</li>
                  <li>Sustenabilitate și respect pentru mediu în toate etapele de producție</li>
                  <li>Calitate premium și atenție la detalii</li>
                  <li>Design elegant și versatil</li>
                  <li>Personalizare și adaptabilitate la preferințele tale</li>
                </ul>
                
                <h3>Fii Parte din Povestea Noastră</h3>
                
                <p>
                  Suntem entuziasmați să împărtășim cu tine viitoarele noastre creații. Până atunci, te invităm să explorezi colecțiile noastre actuale de <strong>lumânări din ceară naturală</strong> și să descoperi magia lumânărilor perlate Atomra.
                </p>
                
                <p>
                  Abonează-te la newsletter-ul nostru pentru a fi primul care află despre lansările viitoare, ofertele speciale și evenimentele Atomra Home România.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ComingSoonPage;
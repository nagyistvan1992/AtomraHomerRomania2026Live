import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import SEOHead from '../components/SEOHead';
import Hero from '../components/Hero';
import CategoryGallery from '../components/CategoryGallery';
import HowItWorks from '../components/HowItWorks';
import WhyFoton from '../components/WhyFoton';
import Reviews from '../components/Reviews';
import FAQ from '../components/FAQ';

const HomePage = () => {
  const { t, language } = useLanguage();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const getLocalizedSEO = () => {
    const seoData = {
      ro: {
        title: "Atomra Home România | Lumânări din Ceară Naturală Reîncărcabile",
        description: "Descoperă lumânările reîncărcabile din ceară naturală Atomra. Lumânări personalizate, ecologice și sustenabile din ceară de soia. Umple. Aprinde. Reîmprospătează.",
        keywords: "lumanare ceara naturala, ceara de soia, lumanari ceara naturala, lumanare personalizata, lumanari din ceara naturala, lumânări reîncărcabile, lumânări sustenabile, România"
      },
      hu: {
        title: "Atomra Home Románia | Újratölthető Természetes Viaszgyertyák",
        description: "Fedezd fel az Atomra újratölthető természetes viaszgyertyákat. Személyre szabható, környezetbarát és fenntartható gyertyák szójaviaszból. Töltsd. Gyújtsd. Frissítsd.",
        keywords: "természetes viaszgyertya, szójaviasz, természetes viaszgyertyák, személyre szabott gyertya, természetes viaszból készült gyertyák, újratölthető gyertyák, fenntartható gyertyák, Románia"
      },
      en: {
        title: "Atomra Home Romania | Refillable Natural Wax Candles",
        description: "Discover Atomra refillable natural wax candles. Customizable, eco-friendly, and sustainable candles made from soy wax. Pour. Light. Refresh.",
        keywords: "natural wax candle, soy wax, natural wax candles, customized candle, candles made from natural wax, refillable candles, sustainable candles, Romania"
      }
    };

    return seoData[language];
  };

  const seo = getLocalizedSEO();

  return (
    <div className="luxury-page-bg luxury-floating-elements min-h-screen">
      <SEOHead
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        url="https://atomra-home-romania.com"
      />
      
      {/* Luxury floating decorative elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-1 h-1 bg-slate-300/20 rounded-full animate-luxury-float"></div>
        <div className="absolute top-40 right-20 w-0.5 h-0.5 bg-slate-200/30 rounded-full animate-luxury-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-60 left-1/3 w-0.5 h-0.5 bg-slate-300/25 rounded-full animate-luxury-float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-40 right-1/3 w-1 h-1 bg-slate-200/20 rounded-full animate-luxury-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-60 left-1/4 w-0.5 h-0.5 bg-slate-300/30 rounded-full animate-luxury-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 right-10 w-0.5 h-0.5 bg-slate-200/25 rounded-full animate-luxury-float" style={{ animationDelay: '5s' }}></div>
      </div>
      
      <div className="relative z-10">
        <Hero />
        <div className="luxury-section-light">
          <CategoryGallery />
        </div>
        <div className="luxury-section-dark">
          <HowItWorks />
        </div>
        <div className="luxury-section-light">
          <WhyFoton />
        </div>
        <div className="luxury-section-dark">
          <Reviews />
        </div>
        <div className="luxury-section-light">
          <FAQ />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
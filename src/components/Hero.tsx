import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 sm:pt-36 md:pt-40 lg:pt-44 pb-16 sm:pb-20 lg:pb-24">
      {/* Beautiful Candle Background */}
      <div className="absolute inset-0 z-0">
        {/* Main background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/81vj9gjxRBL._AC_SL1500_.jpg')`
          }}
        ></div>
        
        {/* Elegant overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/40"></div>
        
        {/* Additional warm overlay to enhance the candle ambiance */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-transparent to-orange-900/20"></div>
        
        {/* Soft light effects to enhance the candle glow */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-radial from-amber-200/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-radial from-orange-200/8 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-yellow-200/5 to-transparent rounded-full blur-3xl"></div>
        </div>
        
        {/* Subtle vignette effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]"></div>
      </div>

      {/* Content - properly positioned for desktop visibility */}
      <div className={`relative z-10 text-center px-4 sm:px-6 lg:px-8 xl:px-12 w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white leading-[0.8] tracking-[-0.02em] drop-shadow-2xl">
          {/* Mobile: Add generous spacing between lines, Desktop: Keep tight spacing */}
          <span className="block opacity-95 mb-4 sm:mb-2 md:mb-1 lg:mb-0" style={{ 
            fontFamily: '"Playfair Display", "Times New Roman", serif',
            fontWeight: '300',
            letterSpacing: '-0.01em',
            textShadow: '0 4px 8px rgba(0,0,0,0.5)'
          }}>{t('hero.title1')}</span>
          <span className="block opacity-90 mb-4 sm:mb-2 md:mb-1 lg:mb-0" style={{ 
            animationDelay: '0.2s',
            fontFamily: '"Playfair Display", "Times New Roman", serif',
            fontWeight: '300',
            letterSpacing: '-0.01em',
            textShadow: '0 4px 8px rgba(0,0,0,0.5)'
          }}>{t('hero.title2')}</span>
          <span className="block opacity-85 mb-6 sm:mb-8 lg:mb-10" style={{ 
            animationDelay: '0.4s',
            fontFamily: '"Playfair Display", "Times New Roman", serif',
            fontWeight: '300',
            letterSpacing: '-0.01em',
            textShadow: '0 4px 8px rgba(0,0,0,0.5)'
          }}>{t('hero.title3')}</span>
        </h1>
        
        <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-white/90 mb-8 sm:mb-10 lg:mb-12 opacity-90 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed animate-fade-in drop-shadow-lg"
           style={{ 
             animationDelay: '0.6s',
             fontFamily: '"Inter", system-ui, sans-serif',
             fontWeight: '300',
             letterSpacing: '0.01em',
             textShadow: '0 2px 4px rgba(0,0,0,0.5)'
           }}>
          {t('hero.subtitle')}
        </p>
        
        <div className="relative z-20 mb-12 sm:mb-16 lg:mb-20">
          <Link 
            to="/all-products"
            className="group relative inline-block bg-slate-800/25 backdrop-blur-2xl text-slate-50 px-12 sm:px-16 lg:px-20 py-5 sm:py-6 text-sm sm:text-base lg:text-lg rounded-3xl hover:bg-slate-700/35 transition-all duration-700 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-slate-300/40 focus:ring-offset-4 focus:ring-offset-slate-800/20 shadow-2xl hover:shadow-3xl animate-scale-in tracking-[0.15em] uppercase border border-slate-300/20 overflow-hidden"
            style={{ 
              animationDelay: '0.8s',
              fontFamily: '"Inter", system-ui, sans-serif',
              fontWeight: '400',
              boxShadow: '0 25px 50px -12px rgba(71, 85, 105, 0.15), 0 0 0 1px rgba(226, 232, 240, 0.15), inset 0 1px 0 rgba(248, 250, 252, 0.1)'
            }}
          >
            {/* Ultra-luxurious animated shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1200 ease-out"></div>
            
            {/* Enhanced pulsing glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-400/15 via-slate-300/25 to-slate-400/15 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>
            
            {/* Luxury floating particles effect */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-2 left-4 w-1 h-1 bg-white/30 rounded-full animate-float opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute top-4 right-6 w-0.5 h-0.5 bg-white/25 rounded-full animate-float opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute bottom-3 left-8 w-0.5 h-0.5 bg-white/30 rounded-full animate-float opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ animationDelay: '1s' }}></div>
              <div className="absolute bottom-2 right-4 w-1 h-1 bg-white/20 rounded-full animate-float opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ animationDelay: '1.5s' }}></div>
              <div className="absolute top-1/2 left-1/3 w-0.5 h-0.5 bg-white/25 rounded-full animate-float opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ animationDelay: '0.8s' }}></div>
              <div className="absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-white/20 rounded-full animate-float opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ animationDelay: '1.2s' }}></div>
            </div>
            
            {/* Enhanced magnetic hover effect */}
            <span className="relative z-10 group-hover:scale-110 transition-transform duration-500 inline-block group-hover:text-white/95">
              {t('hero.cta')}
            </span>
            
            {/* Luxury ripple effect on hover */}
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-slate-300/8 via-slate-200/15 to-slate-300/8 animate-pulse"></div>
            </div>
            
            {/* Premium glass morphism inner glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-white/5 via-transparent to-white/10 opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
            
            {/* Luxury border enhancement */}
            <div className="absolute inset-0 rounded-3xl border border-white/10 group-hover:border-white/20 transition-colors duration-500"></div>
          </Link>
        </div>
      </div>

      {/* Scroll indicator - positioned to be visible on all screen sizes */}
      <div className="absolute bottom-6 sm:bottom-8 lg:bottom-12 xl:bottom-16 left-1/2 transform -translate-x-1/2 z-30">
        <div className={`flex flex-col items-center space-y-2 animate-float transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`} style={{ animationDelay: '1s' }}>
          <div className="text-xs tracking-[0.15em] uppercase text-white/80 opacity-90 drop-shadow-sm"
               style={{ 
                 fontFamily: '"Inter", system-ui, sans-serif',
                 fontWeight: '300',
                 textShadow: '0 1px 2px rgba(0,0,0,0.5)'
               }}>
            {t('hero.scroll')}
          </div>
          <div className="w-4 h-6 sm:w-5 sm:h-8 lg:w-6 lg:h-10 border border-white/60 rounded-full flex justify-center relative overflow-hidden backdrop-blur-sm">
            <div className="w-0.5 h-1.5 sm:w-0.5 sm:h-2 lg:w-1 lg:h-3 bg-white/80 rounded-full animate-bounce mt-1 sm:mt-1.5 lg:mt-2"></div>
          </div>
          <div className="w-px h-4 sm:h-6 lg:h-8 bg-gradient-to-b from-white/60 to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
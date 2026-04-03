import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const AnnouncementBanner = () => {
  const { t } = useLanguage();

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-slate-800/50 via-slate-700/45 to-slate-800/50 backdrop-blur-md border-b border-slate-600/20 overflow-hidden shadow-lg">
      <div className="relative h-8 flex items-center">
        {/* Elegant animated background pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-600/5 via-transparent to-slate-500/5 animate-pulse"></div>
        
        {/* Floating elegant decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-2 left-10 w-1 h-1 bg-slate-300/20 rounded-full animate-float"></div>
          <div className="absolute top-2.5 right-20 w-0.5 h-0.5 bg-slate-200/30 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-2 left-1/3 w-0.5 h-0.5 bg-slate-300/25 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-2.5 right-1/3 w-0.5 h-0.5 bg-slate-200/20 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-1.5 left-1/2 w-0.5 h-0.5 bg-slate-300/15 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
        </div>
        
        {/* Scrolling text container */}
        <div className="w-full overflow-hidden">
          <div className="animate-scroll-banner whitespace-nowrap text-xs text-slate-100 font-light tracking-wide relative z-10 flex">
            {/* Repeat the text multiple times for seamless infinite loop */}
            {Array.from({ length: 20 }, (_, index) => (
              <span key={index} className="inline-flex items-center px-12 space-x-3 flex-shrink-0">
                <span className="inline-block w-1 h-1 bg-slate-300/40 rounded-full animate-pulse" style={{ animationDelay: `${index * 0.3}s` }}></span>
                <span className="drop-shadow-sm font-light tracking-wider whitespace-nowrap" style={{ textShadow: '0 1px 2px rgba(15, 23, 42, 0.2)' }}>
                  {t('banner.freeShipping')}
                </span>
                <span className="inline-block w-0.5 h-0.5 bg-slate-300/30 rounded-full"></span>
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Elegant shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-300/5 to-transparent transform -skew-x-12 animate-shimmer opacity-30"></div>
      
      {/* Sophisticated glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-600/5 via-slate-500/8 to-slate-600/5 animate-pulse opacity-20"></div>
      
      {/* Soft edge gradients for seamless scrolling with elegant tones */}
      <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-slate-800/70 to-transparent pointer-events-none z-20"></div>
      <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-slate-800/70 to-transparent pointer-events-none z-20"></div>
      
      {/* Subtle inner shadow for depth */}
      <div className="absolute inset-0 shadow-inner" style={{ boxShadow: 'inset 0 1px 2px rgba(15, 23, 42, 0.1)' }}></div>
    </div>
  );
};

export default AnnouncementBanner;
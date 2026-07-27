import React, { useEffect, useRef, useState } from 'react';
import { Droplets, Plus, Flame, RotateCcw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getAssetPath } from '../utils/assetPath';

const HowItWorks = () => {
  const [visibleSteps, setVisibleSteps] = useState<boolean[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const steps = [
    {
      icon: <Droplets size={48} strokeWidth={1.5} />,
      title: t('howItWorks.pour.title'),
      description: t('howItWorks.pour.description'),
      image: getAssetPath('/DSC_2075_710x.webp')
    },
    {
      icon: <Plus size={48} strokeWidth={1.5} />,
      title: t('howItWorks.insert.title'),
      description: t('howItWorks.insert.description'),
      image: getAssetPath('/DSC_2082_710x.webp')
    },
    {
      icon: <Flame size={48} strokeWidth={1.5} />,
      title: t('howItWorks.light.title'),
      description: t('howItWorks.light.description'),
      image: getAssetPath('/regregrg_cedf33bb-8bb4-4797-899b-f9d3cb8f33f7_710x.webp')
    },
    {
      icon: <RotateCcw size={48} strokeWidth={1.5} />,
      title: t('howItWorks.refresh.title'),
      description: t('howItWorks.refresh.description'),
      image: null // No image for the refresh step
    }
  ];
  const stepsCount = steps.length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            Array.from({ length: stepsCount }).forEach((_, index) => {
              setTimeout(() => {
                setVisibleSteps(prev => {
                  const newVisible = [...prev];
                  newVisible[index] = true;
                  return newVisible;
                });
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [stepsCount]);

  return (
    <section className="py-32 sm:py-40 lg:py-48" ref={sectionRef}>
      <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24 sm:mb-32">
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-extralight text-slate-900 mb-8 tracking-tight">
            {t('howItWorks.title')}
          </h2>
          <div className="w-24 h-px bg-slate-300 mx-auto mb-8"></div>
          <p className="text-xl sm:text-2xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed">
            {t('howItWorks.subtitle')}
          </p>
        </div>

        {/* Mobile: Single vertical column, Desktop: 4 columns horizontal */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 lg:gap-12 xl:gap-16">
          {steps.map((step, index) => (
            <div 
              key={step.title} 
              className={`text-center group transition-all duration-1000 ${
                visibleSteps[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative mb-8 md:mb-6 lg:mb-12">
                {step.image ? (
                  /* Optimized Photo Size - Reduced for better desktop proportions */
                  <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 2xl:w-72 2xl:h-72 mx-auto mb-6 md:mb-4 lg:mb-8">
                    {/* Ultra-thin outer frame - minimal thickness */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-100 via-white to-slate-200 p-0.5 md:p-0.5 lg:p-1 xl:p-1 shadow-2xl md:shadow-xl lg:shadow-2xl xl:shadow-3xl group-hover:shadow-4xl transition-all duration-700 group-hover:scale-105">
                      {/* Minimal inner frame */}
                      <div className="absolute inset-0.5 md:inset-0.5 lg:inset-1 xl:inset-1 rounded-full bg-gradient-to-tr from-white via-slate-50 to-white p-0.5 md:p-0.5 lg:p-1 xl:p-1 shadow-inner">
                        {/* Photo container - maximum photo area */}
                        <div className="relative w-full h-full rounded-full overflow-hidden bg-white shadow-2xl md:shadow-xl lg:shadow-2xl xl:shadow-3xl">
                          <img
                            src={step.image}
                            alt={step.title}
                            className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                            loading="lazy"
                          />
                          {/* Minimal overlay */}
                          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-slate-900/2 group-hover:to-slate-900/3 transition-all duration-700"></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Minimal floating elements */}
                    <div className="absolute -top-2 -right-2 md:-top-1 md:-right-1 lg:-top-3 lg:-right-3 xl:-top-4 xl:-right-4 w-3 h-3 md:w-2 md:h-2 lg:w-3 lg:h-3 xl:w-4 xl:h-4 bg-gradient-to-br from-slate-300 to-slate-500 rounded-full opacity-60 group-hover:opacity-80 transition-all duration-700 animate-luxury-float shadow-md md:shadow-sm lg:shadow-md xl:shadow-lg"></div>
                    <div className="absolute -bottom-2 -left-2 md:-bottom-1 md:-left-1 lg:-bottom-3 lg:-left-3 xl:-bottom-4 xl:-left-4 w-2 h-2 md:w-1.5 md:h-1.5 lg:w-2 lg:h-2 xl:w-3 xl:h-3 bg-gradient-to-br from-slate-200 to-slate-400 rounded-full opacity-50 group-hover:opacity-70 transition-all duration-700 animate-luxury-float shadow-md md:shadow-sm lg:shadow-md" style={{ animationDelay: '1s' }}></div>
                    
                    {/* Compact step number badge */}
                    <div className="absolute -top-3 -right-3 md:-top-2 md:-right-2 lg:-top-4 lg:-right-4 xl:-top-5 xl:-right-5 w-8 h-8 md:w-6 md:h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10 bg-gradient-to-br from-slate-800 via-slate-900 to-black rounded-full flex items-center justify-center text-sm md:text-xs lg:text-sm xl:text-base font-light text-white shadow-2xl md:shadow-lg lg:shadow-2xl xl:shadow-3xl group-hover:shadow-4xl transition-all duration-700 group-hover:scale-110 border md:border lg:border-2 xl:border-2 border-slate-600">
                      <span className="drop-shadow-lg">{index + 1}</span>
                    </div>
                  </div>
                ) : (
                  /* Ultra-premium icon for refresh step - Reduced size, minimal frame */
                  <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 2xl:w-72 2xl:h-72 mx-auto mb-6 md:mb-4 lg:mb-8">
                    <div className="w-full h-full bg-gradient-to-br from-white via-slate-50 to-slate-100 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-slate-50 group-hover:via-white group-hover:to-slate-50 transition-all duration-700 group-hover:scale-105 border md:border lg:border-2 xl:border-2 border-slate-200/50 shadow-2xl md:shadow-xl lg:shadow-2xl xl:shadow-3xl group-hover:shadow-4xl">
                      <div className="text-slate-600 group-hover:text-slate-900 transition-all duration-500 transform group-hover:scale-110">
                        <RotateCcw size={80} className="md:w-12 md:h-12 lg:w-16 lg:h-16 xl:w-20 xl:h-20" strokeWidth={1.5} />
                      </div>
                    </div>
                    <div className="absolute -top-3 -right-3 md:-top-2 md:-right-2 lg:-top-4 lg:-right-4 xl:-top-5 xl:-right-5 w-8 h-8 md:w-6 md:h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10 bg-gradient-to-br from-slate-800 via-slate-900 to-black rounded-full flex items-center justify-center text-sm md:text-xs lg:text-sm xl:text-base font-light text-white shadow-2xl md:shadow-lg lg:shadow-2xl xl:shadow-3xl group-hover:shadow-4xl transition-all duration-700 group-hover:scale-110 border md:border lg:border-2 xl:border-2 border-slate-600">
                      <span className="drop-shadow-lg">{index + 1}</span>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Enhanced Typography - Proportional text sizing */}
              <h3 className="text-xl sm:text-2xl md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-extralight text-slate-900 mb-4 md:mb-3 lg:mb-6 tracking-wide group-hover:text-slate-700 transition-colors duration-500 leading-tight">
                {step.title}
              </h3>
              <p className="text-slate-600 leading-relaxed text-base sm:text-lg md:text-sm lg:text-base xl:text-lg 2xl:text-xl font-light group-hover:text-slate-700 transition-colors duration-500 max-w-sm mx-auto leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Premium connecting line between steps - Only on larger screens */}
        <div className="hidden md:block relative mt-12 lg:mt-20">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-4xl xl:max-w-5xl">
            <div className="flex justify-between items-center px-12 sm:px-16 lg:px-20 xl:px-24">
              {[0, 1, 2].map((index) => (
                <div key={index} className="flex-1 relative">
                  <div className="h-px bg-gradient-to-r from-slate-300 via-slate-400 to-slate-300 opacity-40"></div>
                  <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-2 h-2 lg:w-3 lg:h-3 bg-slate-400 rounded-full opacity-60 shadow-sm"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

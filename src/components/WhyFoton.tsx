import React, { useEffect, useRef, useState } from 'react';
import { RefreshCw, Leaf, Palette } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const WhyFoton = () => {
  const [visibleFeatures, setVisibleFeatures] = useState<boolean[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const features = [
    {
      icon: <RefreshCw size={32} strokeWidth={1.5} />,
      title: t('whyAtomra.refillable.title'),
      description: t('whyAtomra.refillable.description')
    },
    {
      icon: <Leaf size={32} strokeWidth={1.5} />,
      title: t('whyAtomra.eco.title'),
      description: t('whyAtomra.eco.description')
    },
    {
      icon: <Palette size={32} strokeWidth={1.5} />,
      title: t('whyAtomra.customize.title'),
      description: t('whyAtomra.customize.description')
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            features.forEach((_, index) => {
              setTimeout(() => {
                setVisibleFeatures(prev => {
                  const newVisible = [...prev];
                  newVisible[index] = true;
                  return newVisible;
                });
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 sm:py-24 lg:py-32" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-20 sm:mb-24">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extralight text-slate-900 mb-6 tracking-tight">
            {t('whyAtomra.title')}
          </h2>
          <div className="w-16 h-px bg-slate-300 mx-auto mb-6"></div>
          <p className="text-lg text-slate-600 max-w-xl mx-auto font-light leading-relaxed">
            {t('whyAtomra.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16">
          {features.map((feature, index) => (
            <div 
              key={feature.title} 
              className={`text-center group transition-all duration-700 ${
                visibleFeatures[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="w-20 h-20 mx-auto bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-500 group-hover:scale-105 mb-8 border border-slate-200/50">
                <div className="text-slate-600 group-hover:text-slate-900 transition-all duration-300">
                  {feature.icon}
                </div>
              </div>
              
              <h3 className="text-xl font-light text-slate-900 mb-4 tracking-wide">
                {feature.title}
              </h3>
              
              <p className="text-slate-600 leading-relaxed font-light">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyFoton;
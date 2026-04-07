import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import LazyImage from './LazyImage';
import { getAssetPath } from '../utils/assetPath';

const CategoryGallery = () => {
  const [visibleBlocks, setVisibleBlocks] = useState<boolean[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const categories = [
    {
      id: 'home',
      name: t('categories.home.title'),
      image: getAssetPath('/home-category-home.webp'),
      description: t('categories.home.description'),
      route: '/home-collection'
    },
    {
      id: 'events',
      name: t('categories.events.title'),
      image: getAssetPath('/home-category-events.webp'),
      description: t('categories.events.description'),
      route: '/events-collection'
    },
    {
      id: 'accessories',
      name: t('categories.accessories.title'),
      image: getAssetPath('/accessories-category.webp'),
      description: t('categories.accessories.description'),
      route: '/accessories-collection'
    },
    {
      id: 'coming',
      name: t('categories.coming.title'),
      image: getAssetPath('/home-category-coming.jpg'),
      description: t('categories.coming.description'),
      route: '/coming-soon'
    }
  ];
  const categoryCount = categories.length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            Array.from({ length: categoryCount }).forEach((_, index) => {
              setTimeout(() => {
                setVisibleBlocks(prev => {
                  const newVisible = [...prev];
                  newVisible[index] = true;
                  return newVisible;
                });
              }, index * 150);
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
  }, [categoryCount]);

  const handleCategoryClick = (route: string) => {
    navigate(route);
  };

  return (
    <section className="py-20 sm:py-24 lg:py-32" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extralight text-slate-900 mb-6 tracking-tight">
            {t('categories.title')}
          </h2>
          <div className="w-16 h-px bg-slate-300 mx-auto mb-6"></div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
            {t('categories.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {categories.map((category, index) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.route)}
              className={`group cursor-pointer transition-all duration-700 ${
                visibleBlocks[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={`relative overflow-hidden group-hover:shadow-2xl transition-all duration-700 rounded-lg ${
                category.id === 'coming' ? 'coming-soon-category' : ''
              }`}>
                {/* Background Image */}
                <LazyImage
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                  aspectRatio="4/3"
                  loading="lazy"
                />
                
                {/* Special overlay for Coming Soon category */}
                {category.id === 'coming' ? (
                  <>
                    {/* Warm amber overlay for the question mark background */}
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-900/70 via-amber-800/40 to-amber-600/30 opacity-80 group-hover:opacity-90 transition-all duration-500"></div>
                    
                    {/* Additional warm glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-200/20 via-transparent to-amber-300/20"></div>
                    
                    {/* Hover overlay with amber tones */}
                    <div className="absolute inset-0 bg-amber-900/30 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  </>
                ) : (
                  <>
                    {/* Standard gradient overlay for other categories */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-70 group-hover:opacity-80 transition-all duration-500"></div>
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  </>
                )}
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 sm:p-8 lg:p-12">
                  <h3 className={`text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extralight mb-3 sm:mb-4 tracking-tight transform group-hover:scale-105 transition-all duration-500 ${
                    category.id === 'coming' ? 'text-amber-50' : 'text-white'
                  }`}
                      style={{ 
                        fontFamily: 'Georgia, serif',
                        textShadow: category.id === 'coming' ? '0 2px 4px rgba(120, 53, 15, 0.5)' : '0 2px 4px rgba(0,0,0,0.3)'
                      }}>
                    {category.name}
                  </h3>
                  
                  <div className={`h-px mb-3 sm:mb-4 group-hover:w-12 sm:group-hover:w-16 transition-all duration-500 ${
                    category.id === 'coming' 
                      ? 'w-8 sm:w-12 bg-amber-200/80' 
                      : 'w-8 sm:w-12 bg-white/60'
                  }`}></div>
                  
                  <p className={`text-xs sm:text-sm lg:text-base font-light tracking-wide opacity-90 group-hover:opacity-100 transition-all duration-300 max-w-xs sm:max-w-sm lg:max-w-md ${
                    category.id === 'coming' ? 'text-amber-100' : 'text-white/90'
                  }`}
                     style={{ 
                       textShadow: category.id === 'coming' ? '0 1px 2px rgba(120, 53, 15, 0.7)' : '0 1px 2px rgba(0,0,0,0.5)' 
                     }}>
                    {category.description}
                  </p>
                  
                  {/* Subtle arrow indicator */}
                  <div className="mt-4 sm:mt-6 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                    <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
                      category.id === 'coming' 
                        ? 'border border-amber-200/80' 
                        : 'border border-white/60'
                    }`}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={
                        category.id === 'coming' ? 'text-amber-200' : 'text-white'
                      }>
                        <path d="M7 17L17 7M17 7H7M17 7V17"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGallery;

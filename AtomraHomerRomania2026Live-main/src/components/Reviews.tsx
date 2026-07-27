import React, { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Reviews = () => {
  const [currentReview, setCurrentReview] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const reviews = [
    {
      text: t('reviews.review1'),
      author: t('reviews.author1'),
      location: t('reviews.location1')
    },
    {
      text: t('reviews.review2'),
      author: t('reviews.author2'),
      location: t('reviews.location2')
    },
    {
      text: t('reviews.review3'),
      author: t('reviews.author3'),
      location: t('reviews.location3')
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [reviews.length]);

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        strokeWidth={1.5}
        className="text-gray-400 fill-current"
      />
    ));
  };

  return (
    <section className="py-20 sm:py-24 lg:py-32" ref={sectionRef}>
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className={`text-center mb-20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extralight text-slate-900 mb-8 tracking-tight">
            {t('reviews.title')}
          </h2>
          <div className="w-16 h-px bg-slate-300 mx-auto mb-8"></div>
          <div className="flex items-center justify-center space-x-2 mb-4">
            {renderStars()}
            <span className="text-xl font-light text-slate-900 ml-3">4.8</span>
          </div>
          <p className="text-base text-slate-600 font-light">
            {t('reviews.rating')}
          </p>
        </div>

        <div className="relative">
          <div className={`luxury-card p-12 lg:p-16 transition-all duration-500 rounded-lg ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <div className="text-center">
              <Quote size={32} strokeWidth={1.5} className="text-slate-300 mx-auto mb-8" />
              
              <blockquote 
                key={currentReview}
                className="text-lg sm:text-xl lg:text-2xl text-slate-700 leading-relaxed mb-8 font-light animate-fade-in"
              >
                "{reviews[currentReview].text}"
              </blockquote>
              
              <div className="text-lg font-light text-slate-900 tracking-wide">
                {reviews[currentReview].author}
              </div>
              <div className="text-slate-600 mt-1 font-light text-sm">
                {reviews[currentReview].location}
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={prevReview}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full shadow-sm flex items-center justify-center text-slate-600 hover:text-slate-900 transition-all duration-300 hover:shadow-md hover:scale-110 focus:outline-none border border-slate-200/50"
            type="button"
            aria-label="Previous review"
          >
            <ChevronLeft size={18} strokeWidth={1.5} />
          </button>
          
          <button
            onClick={nextReview}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full shadow-sm flex items-center justify-center text-slate-600 hover:text-slate-900 transition-all duration-300 hover:shadow-md hover:scale-110 focus:outline-none border border-slate-200/50"
            type="button"
            aria-label="Next review"
          >
            <ChevronRight size={18} strokeWidth={1.5} />
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center space-x-3 mt-12">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentReview(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentReview ? 'bg-slate-800 scale-125' : 'bg-slate-300 hover:bg-slate-400'
                }`}
                type="button"
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;

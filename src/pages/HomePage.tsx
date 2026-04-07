import React, { Suspense, lazy, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import SEOHead from '../components/SEOHead';
import Hero from '../components/Hero';
import AnswerHighlights from '../components/AnswerHighlights';
import IntentGuides from '../components/IntentGuides';
import ComparisonGuides from '../components/ComparisonGuides';
import DeferredSection from '../components/DeferredSection';
import { getSiteUrl } from '../utils/siteConfig';
import {
  generateFAQStructuredData,
  generateOnlineStoreStructuredData,
  generateOrganizationStructuredData,
  generateWebsiteStructuredData,
} from '../utils/seoUtils';
import { getFaqItems } from '../data/faq';

const CategoryGallery = lazy(() => import('../components/CategoryGallery'));
const HowItWorks = lazy(() => import('../components/HowItWorks'));
const WhyFoton = lazy(() => import('../components/WhyFoton'));
const Reviews = lazy(() => import('../components/Reviews'));
const FAQ = lazy(() => import('../components/FAQ'));

const HomePage = () => {
  const { language } = useLanguage();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const getLocalizedSEO = () => {
    const seoData = {
      ro: {
        title: 'Atomra Home România | Lumânări din ceară naturală reîncărcabile',
        description:
          'Descoperă lumânările reîncărcabile din ceară naturală Atomra. Lumânări personalizate, ecologice și sustenabile din ceară de soia. Umple. Aprinde. Reîmprospătează.',
        keywords:
          'lumanare ceara naturala, ceara de soia, lumanari ceara naturala, lumanare personalizata, lumanari din ceara naturala, lumânări reîncărcabile, lumânări sustenabile, România',
      },
      hu: {
        title: 'Atomra Home România | Újratölthető természetes viaszgyertyák',
        description:
          'Fedezd fel az Atomra újratölthető természetes viaszgyertyákat. Személyre szabható, környezetbarát és fenntartható gyertyák szójaviaszból. Töltsd. Gyújtsd. Frissítsd.',
        keywords:
          'termeszetes viaszgyertya, szojaviasz, termeszetes viaszgyertyak, szemelyre szabott gyertya, ujratoltheto gyertyak, fenntarthato gyertyak, Romania',
      },
      en: {
        title: 'Atomra Home Romania | Refillable natural wax candles',
        description:
          'Discover Atomra refillable natural wax candles. Customizable, eco-friendly, and sustainable candles made from soy wax. Pour. Light. Refresh.',
        keywords:
          'natural wax candle, soy wax, natural wax candles, customized candle, candles made from natural wax, refillable candles, sustainable candles, Romania',
      },
    };

    return seoData[language];
  };

  const seo = getLocalizedSEO();
  const faqStructuredData = generateFAQStructuredData(
    getFaqItems(language).map((item) => ({ question: item.question, answer: item.answer }))
  );
  const homeStructuredData = `[${generateWebsiteStructuredData()},${generateOrganizationStructuredData()},${generateOnlineStoreStructuredData()},${faqStructuredData}]`;
  const sectionFallback = (
    <div className="min-h-[520px] animate-pulse bg-gradient-to-b from-slate-50/70 via-white to-slate-50/70" />
  );

  return (
    <div className="luxury-page-bg luxury-floating-elements min-h-screen">
      <SEOHead
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        url={getSiteUrl('/')}
        structuredData={homeStructuredData}
      />

      <div className="fixed inset-0 pointer-events-none z-0 hidden overflow-hidden md:block">
        <div className="absolute top-20 left-10 w-1 h-1 bg-slate-300/20 rounded-full animate-luxury-float"></div>
        <div
          className="absolute top-40 right-20 w-0.5 h-0.5 bg-slate-200/30 rounded-full animate-luxury-float"
          style={{ animationDelay: '2s' }}
        ></div>
        <div
          className="absolute top-60 left-1/3 w-0.5 h-0.5 bg-slate-300/25 rounded-full animate-luxury-float"
          style={{ animationDelay: '4s' }}
        ></div>
        <div
          className="absolute bottom-40 right-1/3 w-1 h-1 bg-slate-200/20 rounded-full animate-luxury-float"
          style={{ animationDelay: '1s' }}
        ></div>
        <div
          className="absolute bottom-60 left-1/4 w-0.5 h-0.5 bg-slate-300/30 rounded-full animate-luxury-float"
          style={{ animationDelay: '3s' }}
        ></div>
        <div
          className="absolute top-1/2 right-10 w-0.5 h-0.5 bg-slate-200/25 rounded-full animate-luxury-float"
          style={{ animationDelay: '5s' }}
        ></div>
      </div>

      <div className="relative z-10">
        <Hero />
        <AnswerHighlights />
        <IntentGuides />
        <ComparisonGuides />
        <DeferredSection className="luxury-section-light">
          <Suspense fallback={sectionFallback}>
            <CategoryGallery />
          </Suspense>
        </DeferredSection>
        <DeferredSection className="luxury-section-dark">
          <Suspense fallback={sectionFallback}>
            <HowItWorks />
          </Suspense>
        </DeferredSection>
        <DeferredSection className="luxury-section-light">
          <Suspense fallback={sectionFallback}>
            <WhyFoton />
          </Suspense>
        </DeferredSection>
        <DeferredSection className="luxury-section-dark">
          <Suspense fallback={sectionFallback}>
            <Reviews />
          </Suspense>
        </DeferredSection>
        <DeferredSection className="luxury-section-light">
          <Suspense fallback={sectionFallback}>
            <FAQ />
          </Suspense>
        </DeferredSection>
      </div>
    </div>
  );
};

export default HomePage;

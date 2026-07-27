import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getFaqItems } from '../data/faq';

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [visibleItems, setVisibleItems] = useState<boolean[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const faqItems = getFaqItems(language);
  const faqItemCount = faqItems.length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            Array.from({ length: faqItemCount }).forEach((_, index) => {
              setTimeout(() => {
                setVisibleItems((prev) => {
                  const next = [...prev];
                  next[index] = true;
                  return next;
                });
              }, index * 100);
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
  }, [faqItemCount]);

  const toggleItem = (id: number) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const getContactText = () => {
    if (language === 'ro') {
      return {
        title: 'Nu ai găsit răspunsul căutat?',
        description: 'Echipa noastră este aici să te ajute cu orice întrebare sau nelămurire.',
        email: 'Trimite email',
        call: 'Sună acum',
      };
    }

    if (language === 'hu') {
      return {
        title: 'Nem találtad meg a választ?',
        description: 'Csapatunk itt van, hogy segítsen bármilyen kérdésben vagy problémában.',
        email: 'Email küldése',
        call: 'Hívj most',
      };
    }

    return {
      title: "Didn't find your answer?",
      description: 'Our team is here to help with any questions or concerns.',
      email: 'Send Email',
      call: 'Call Now',
    };
  };

  const contactText = getContactText();

  return (
    <section className="py-20 sm:py-24 lg:py-32 luxury-section-light" ref={sectionRef}>
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extralight text-slate-900 mb-6 tracking-tight">
            {language === 'ro'
              ? 'Întrebări frecvente'
              : language === 'hu'
                ? 'Gyakori kérdések'
                : 'Frequently Asked Questions'}
          </h2>
          <div className="w-16 h-px bg-slate-300 mx-auto mb-6"></div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
            {language === 'ro'
              ? 'Găsește răspunsuri la cele mai frecvente întrebări despre produsele Atomra și experiența noastră refillabilă.'
              : language === 'hu'
                ? 'Találj válaszokat a leggyakoribb kérdésekre az Atomra termékekről és az újratölthető rendszerről.'
                : 'Find answers to the most common questions about Atomra candles and our eco-friendly products.'}
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={item.id}
              className={`luxury-card rounded-lg overflow-hidden transition-all duration-700 ${
                visibleItems[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <button
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-white/40 transition-colors duration-300"
                onClick={() => toggleItem(item.id)}
                aria-expanded={openItems.includes(item.id)}
              >
                <div className="flex items-center gap-4">
                  <span className="text-xl" aria-hidden="true">
                    {item.icon}
                  </span>
                  <span className="text-base sm:text-lg font-light text-slate-900">{item.question}</span>
                </div>
                {openItems.includes(item.id) ? (
                  <ChevronUp className="text-slate-500" size={18} />
                ) : (
                  <ChevronDown className="text-slate-500" size={18} />
                )}
              </button>

              {openItems.includes(item.id) && (
                <div className="px-6 pb-6">
                  <p className="pl-10 text-sm sm:text-base font-light leading-7 text-slate-600">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 luxury-card rounded-lg p-8 text-center">
          <h3 className="mb-3 text-2xl font-light text-slate-900">{contactText.title}</h3>
          <p className="mb-6 text-slate-600 font-light">{contactText.description}</p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="mailto:atomrahomeromania@gmail.com"
              className="rounded-full border border-slate-300 px-6 py-3 text-sm font-light tracking-wide text-slate-700 transition-colors duration-300 hover:bg-slate-50"
            >
              {contactText.email}
            </a>
            <a
              href="tel:+40751801025"
              className="rounded-full bg-slate-900 px-6 py-3 text-sm font-light tracking-wide text-white transition-colors duration-300 hover:bg-slate-800"
            >
              {contactText.call}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;

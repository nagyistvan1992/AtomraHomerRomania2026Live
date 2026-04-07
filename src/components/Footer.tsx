import React, { useEffect, useRef, useState } from 'react';
import { Instagram, Facebook, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useLanguage, type Language } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

const FOOTER_CONTENT: Record<
  Language,
  {
    tagline: string;
    quickLinks: string;
    allProducts: string;
    about: string;
    contact: string;
    wholesale: string;
    contactTitle: string;
    address: string;
    hours: string;
    follow: string;
    followText: string;
    rights: string;
    privacy: string;
    terms: string;
  }
> = {
  ro: {
    tagline: 'Lumanari refillable din ceara vegetala, gandite pentru decor calm si reutilizare eleganta.',
    quickLinks: 'Linkuri rapide',
    allProducts: 'Toate produsele',
    about: 'Despre noi',
    contact: 'Contact',
    wholesale: 'Vanzari angro',
    contactTitle: 'Contact',
    address: 'Satu Mare, str. Mesteacanului, nr. 1B',
    hours: 'Program',
    follow: 'Urmareste-ne',
    followText: 'Urmareste-ne pentru noutati, oferte si inspiratie.',
    rights: '© 2025 Atomra Home Romania. Toate drepturile rezervate.',
    privacy: 'Politica de confidentialitate',
    terms: 'Termeni si conditii',
  },
  hu: {
    tagline: 'Ujratoltheto, novenyi viaszra epulo gyertyavilag letisztult otthoni ritualekhoz.',
    quickLinks: 'Gyors linkek',
    allProducts: 'Osszes termek',
    about: 'Rolunk',
    contact: 'Kapcsolat',
    wholesale: 'Nagykereskedelem',
    contactTitle: 'Kapcsolat',
    address: 'Satu Mare, Mesteacanului utca 1B',
    hours: 'Nyitvatartas',
    follow: 'Kovess minket',
    followText: 'Kovess minket hirekert, ajanlatokert es inspiracioert.',
    rights: '© 2025 Atomra Home Romania. Minden jog fenntartva.',
    privacy: 'Adatvedelmi tajekoztato',
    terms: 'Felhasznalasi feltetelek',
  },
  en: {
    tagline: 'Refillable vegetable-wax candle pieces designed for calm styling and elegant reuse.',
    quickLinks: 'Quick links',
    allProducts: 'All products',
    about: 'About us',
    contact: 'Contact',
    wholesale: 'Wholesale',
    contactTitle: 'Contact',
    address: 'Satu Mare, Mesteacanului Street, no. 1B',
    hours: 'Hours',
    follow: 'Follow us',
    followText: 'Follow us for news, offers, and inspiration.',
    rights: '© 2025 Atomra Home Romania. All rights reserved.',
    privacy: 'Privacy policy',
    terms: 'Terms and conditions',
  },
};

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const content = FOOTER_CONTENT[language];

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

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer id="contact" className="deferred-visibility luxury-section-light border-t border-slate-200/50 py-16 sm:py-20" ref={footerRef}>
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className={`transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center space-y-4 md:items-start">
              <div className="text-center md:text-left">
                <h2
                  className="text-xl font-extralight tracking-[0.3em] text-slate-900 sm:text-2xl"
                  style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: '200' }}
                >
                  ATOMRA
                </h2>
                <div
                  className="mt-1 text-xs font-light tracking-[0.5em] text-slate-500"
                  style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: '300' }}
                >
                  HOME ROMANIA
                </div>
              </div>
              <p className="text-center text-sm font-light text-slate-600 md:text-left">{content.tagline}</p>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-slate-900">{content.quickLinks}</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/all-products" className="text-sm font-light text-slate-600 transition-colors duration-200 hover:text-slate-900">
                    {content.allProducts}
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-sm font-light text-slate-600 transition-colors duration-200 hover:text-slate-900">
                    {content.about}
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-sm font-light text-slate-600 transition-colors duration-200 hover:text-slate-900">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sm font-light text-slate-600 transition-colors duration-200 hover:text-slate-900">
                    {content.contact}
                  </Link>
                </li>
                <li>
                  <Link to="/wholesale" className="text-sm font-light text-slate-600 transition-colors duration-200 hover:text-slate-900">
                    {content.wholesale}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-slate-900">{content.contactTitle}</h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <Mail size={14} className="text-slate-500" />
                  <a href="mailto:atomrahomeromania@gmail.com" className="text-sm font-light text-slate-600 transition-colors duration-200 hover:text-slate-900">
                    atomrahomeromania@gmail.com
                  </a>
                </li>
                <li className="flex items-center space-x-2">
                  <Phone size={14} className="text-slate-500" />
                  <a href="tel:+40751801025" className="text-sm font-light text-slate-600 transition-colors duration-200 hover:text-slate-900">
                    0751801025
                  </a>
                </li>
                <li className="flex items-start space-x-2">
                  <MapPin size={14} className="mt-1 flex-shrink-0 text-slate-500" />
                  <span className="text-sm font-light text-slate-600">{content.address}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Clock size={14} className="text-slate-500" />
                  <span className="text-sm font-light text-slate-600">{content.hours}: 0-24h</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-slate-900">{content.follow}</h3>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/profile.php?id=61561996989234"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 transition-colors duration-300 hover:text-slate-900"
                  aria-label="Facebook"
                >
                  <Facebook size={20} strokeWidth={1.5} />
                </a>
                <a
                  href="https://www.instagram.com/atomra_home_romania/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 transition-colors duration-300 hover:text-slate-900"
                  aria-label="Instagram"
                >
                  <Instagram size={20} strokeWidth={1.5} />
                </a>
              </div>
              <div className="mt-4">
                <p className="text-xs font-light text-slate-500">{content.followText}</p>
              </div>
            </div>
          </div>

          <div className="mb-6 h-px w-full bg-slate-200/60" />

          <div className={`text-center text-xs text-slate-500 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '0.3s' }}>
            <p className="leading-relaxed font-light">
              {content.rights} |
              <Link to="/privacy-policy" className="ml-1 transition-colors duration-200 hover:text-slate-700 hover:underline">
                {content.privacy}
              </Link>{' '}
              |
              <Link to="/terms" className="ml-1 transition-colors duration-200 hover:text-slate-700 hover:underline">
                {content.terms}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

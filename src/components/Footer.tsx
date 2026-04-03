import React, { useEffect, useRef, useState } from 'react';
import { Instagram, Facebook, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();

  const footerLinks = [
    { name: t('footer.shop'), href: '/all-products' },
    { name: t('footer.faq'), href: '/#faq' },
    { name: t('footer.contact'), href: '/contact' }
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

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Get contact text based on language
  const getContactText = () => {
    if (language === 'ro') {
      return {
        email: 'Email',
        phone: 'Telefon',
        address: 'Adresă',
        hours: 'Program',
        follow: 'Urmărește-ne',
        rights: '© 2025 Atomra Home România. Toate drepturile rezervate.'
      };
    } else if (language === 'hu') {
      return {
        email: 'Email',
        phone: 'Telefon',
        address: 'Cím',
        hours: 'Nyitvatartás',
        follow: 'Kövess minket',
        rights: '© 2025 Atomra Home Románia. Minden jog fenntartva.'
      };
    } else {
      return {
        email: 'Email',
        phone: 'Phone',
        address: 'Address',
        hours: 'Hours',
        follow: 'Follow Us',
        rights: '© 2025 Atomra Home Romania. All rights reserved.'
      };
    }
  };

  const contactText = getContactText();

  return (
    <footer id="contact" className="luxury-section-light border-t border-slate-200/50 py-16 sm:py-20" ref={footerRef}>
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className={`transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Logo and Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Logo and About */}
            <div className="flex flex-col items-center md:items-start space-y-4">
              <div className="text-center md:text-left">
                <h2 className="text-xl sm:text-2xl font-extralight tracking-[0.3em] text-slate-900"
                style={{ 
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  fontWeight: '200'
                }}>
                  ATOMRA
                </h2>
                <div className="text-xs font-light tracking-[0.5em] text-slate-500 mt-1"
                style={{ 
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  fontWeight: '300'
                }}>
                  HOME ROMANIA
                </div>
              </div>
              <p className="text-sm text-slate-600 font-light text-center md:text-left">
                {language === 'ro'
                  ? 'Lumânări din ceară naturală, reîncărcabile și sustenabile.'
                  : language === 'hu'
                  ? 'Természetes viaszgyertyák, újratölthetők és fenntarthatók.'
                  : 'Natural wax candles, refillable and sustainable.'}
              </p>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-medium text-slate-900 mb-4 uppercase tracking-wider">
                {language === 'ro' ? 'Linkuri Rapide' : language === 'hu' ? 'Gyors Linkek' : 'Quick Links'}
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/all-products" className="text-sm text-slate-600 hover:text-slate-900 transition-colors duration-200 font-light">
                    {language === 'ro' ? 'Toate Produsele' : language === 'hu' ? 'Összes Termék' : 'All Products'}
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-sm text-slate-600 hover:text-slate-900 transition-colors duration-200 font-light">
                    {language === 'ro' ? 'Despre Noi' : language === 'hu' ? 'Rólunk' : 'About Us'}
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-sm text-slate-600 hover:text-slate-900 transition-colors duration-200 font-light">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sm text-slate-600 hover:text-slate-900 transition-colors duration-200 font-light">
                    {language === 'ro' ? 'Contact' : language === 'hu' ? 'Kapcsolat' : 'Contact'}
                  </Link>
                </li>
                <li>
                  <Link to="/wholesale" className="text-sm text-slate-600 hover:text-slate-900 transition-colors duration-200 font-light">
                    {language === 'ro' ? 'Vânzări Angro' : language === 'hu' ? 'Nagykereskedelem' : 'Wholesale'}
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Contact Information */}
            <div>
              <h3 className="text-sm font-medium text-slate-900 mb-4 uppercase tracking-wider">
                {language === 'ro' ? 'Contact' : language === 'hu' ? 'Kapcsolat' : 'Contact'}
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <Mail size={14} className="text-slate-500" />
                  <a href="mailto:atomrahomeromania@gmail.com" className="text-sm text-slate-600 hover:text-slate-900 transition-colors duration-200 font-light">
                    atomrahomeromania@gmail.com
                  </a>
                </li>
                <li className="flex items-center space-x-2">
                  <Phone size={14} className="text-slate-500" />
                  <a href="tel:+40751801025" className="text-sm text-slate-600 hover:text-slate-900 transition-colors duration-200 font-light">
                    0751801025
                  </a>
                </li>
                <li className="flex items-start space-x-2">
                  <MapPin size={14} className="text-slate-500 mt-1 flex-shrink-0" />
                  <span className="text-sm text-slate-600 font-light">
                    Satu Mare, str.Mesteacanului, nr.1B
                  </span>
                </li>
                <li className="flex items-center space-x-2">
                  <Clock size={14} className="text-slate-500" />
                  <span className="text-sm text-slate-600 font-light">
                    0-24h
                  </span>
                </li>
              </ul>
            </div>
            
            {/* Social Media */}
            <div>
              <h3 className="text-sm font-medium text-slate-900 mb-4 uppercase tracking-wider">
                {contactText.follow}
              </h3>
              <div className="flex space-x-4">
                <a 
                  href="https://www.facebook.com/profile.php?id=61561996989234" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-slate-600 hover:text-slate-900 transition-colors duration-300"
                  aria-label="Facebook"
                >
                  <Facebook size={20} strokeWidth={1.5} />
                </a>
                <a 
                  href="https://www.instagram.com/atomra_home_romania/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-slate-600 hover:text-slate-900 transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <Instagram size={20} strokeWidth={1.5} />
                </a>
              </div>
              <div className="mt-4">
                <p className="text-xs text-slate-500 font-light">
                  {language === 'ro' 
                    ? 'Urmărește-ne pentru noutăți, oferte și inspirație.'
                    : language === 'hu'
                    ? 'Kövess minket hírekért, ajánlatokért és inspirációért.'
                    : 'Follow us for news, offers, and inspiration.'}
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-slate-200/60 mb-6"></div>

          {/* Legal Notice */}
          <div className={`text-center text-xs text-slate-500 transition-all duration-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`} style={{ transitionDelay: '0.3s' }}>
            <p className="leading-relaxed font-light">
              {contactText.rights} | 
              <Link to="/privacy-policy" className="hover:text-slate-700 ml-1 transition-colors duration-200 hover:underline">{t('footer.privacy')}</Link> | 
              <Link to="/terms" className="hover:text-slate-700 ml-1 transition-colors duration-200 hover:underline">{t('footer.terms')}</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
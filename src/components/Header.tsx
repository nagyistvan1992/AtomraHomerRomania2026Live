import React, { useEffect, useRef, useState } from 'react';
import { ShoppingCart, ChevronDown, Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLanguage, type Language } from '../context/LanguageContext';

type NavItem = {
  id: string;
  name: string;
  path?: string;
  dropdown?: Array<{ name: string; path: string }>;
};

const HEADER_CONTENT: Record<
  Language,
  {
    navItems: NavItem[];
    menuLabel: string;
    languageLabel: string;
    languageNames: Record<Language, string>;
  }
> = {
  ro: {
    navItems: [
      {
        id: 'shop',
        name: 'PRODUSE',
        dropdown: [
          { name: 'ATOMRA PENTRU ACASA', path: '/home-collection' },
          { name: 'ATOMRA PENTRU EVENIMENTE', path: '/events-collection' },
          { name: 'ACCESORII', path: '/accesorii' },
          { name: 'TOATE PRODUSELE', path: '/toate-produsele' },
        ],
      },
      { id: 'ideas', name: 'IDEI SI INSPIRATIE', path: '/ideas' },
      {
        id: 'info',
        name: 'ALTE INFORMATII',
        dropdown: [
          { name: 'DE CE ATOMRA?', path: '/why-atomra' },
          { name: 'BLOG', path: '/blog' },
          { name: 'CAT DE MULTA ATOMRA AM NEVOIE?', path: '/how-much' },
          { name: 'DESPRE NOI', path: '/about' },
          { name: 'INSTRUCTIUNI', path: '/instructions' },
        ],
      },
      { id: 'contact', name: 'CONTACT', path: '/contact' },
    ],
    menuLabel: 'Meniu',
    languageLabel: 'Limba',
    languageNames: { ro: 'Romana', hu: 'Magyar', en: 'English' },
  },
  hu: {
    navItems: [
      {
        id: 'shop',
        name: 'TERMEKEK',
        dropdown: [
          { name: 'ATOMRA OTTHONRA', path: '/home-collection' },
          { name: 'ATOMRA ESEMENYEKRE', path: '/events-collection' },
          { name: 'KIEGESZITOK', path: '/accesorii' },
          { name: 'OSSZES TERMEK', path: '/toate-produsele' },
        ],
      },
      { id: 'ideas', name: 'OTLETEK ES INSPIRACIO', path: '/ideas' },
      {
        id: 'info',
        name: 'TOVABBI INFORMACIOK',
        dropdown: [
          { name: 'MIERT ATOMRA?', path: '/why-atomra' },
          { name: 'BLOG', path: '/blog' },
          { name: 'MENNYI ATOMRA KELL?', path: '/how-much' },
          { name: 'ROLUNK', path: '/about' },
          { name: 'UTMUTATO', path: '/instructions' },
        ],
      },
      { id: 'contact', name: 'KAPCSOLAT', path: '/contact' },
    ],
    menuLabel: 'Menu',
    languageLabel: 'Nyelv',
    languageNames: { ro: 'Romana', hu: 'Magyar', en: 'English' },
  },
  en: {
    navItems: [
      {
        id: 'shop',
        name: 'PRODUCTS',
        dropdown: [
          { name: 'ATOMRA FOR HOME', path: '/home-collection' },
          { name: 'ATOMRA FOR EVENTS', path: '/events-collection' },
          { name: 'ACCESSORIES', path: '/accesorii' },
          { name: 'ALL PRODUCTS', path: '/toate-produsele' },
        ],
      },
      { id: 'ideas', name: 'IDEAS AND INSPIRATION', path: '/ideas' },
      {
        id: 'info',
        name: 'MORE INFORMATION',
        dropdown: [
          { name: 'WHY ATOMRA?', path: '/why-atomra' },
          { name: 'BLOG', path: '/blog' },
          { name: 'HOW MUCH DO I NEED?', path: '/how-much' },
          { name: 'ABOUT US', path: '/about' },
          { name: 'INSTRUCTIONS', path: '/instructions' },
        ],
      },
      { id: 'contact', name: 'CONTACT', path: '/contact' },
    ],
    menuLabel: 'Menu',
    languageLabel: 'Language',
    languageNames: { ro: 'Romana', hu: 'Magyar', en: 'English' },
  },
};

const Header = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpandedDropdown, setMobileExpandedDropdown] = useState<string | null>(null);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null);
  const [brandTapCount, setBrandTapCount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { toggleCart, getTotalItems } = useCart();
  const { t, language, setLanguage } = useLanguage();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const brandTapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const content = HEADER_CONTENT[language];
  const navItems = content.navItems;
  const languageLabel = language.toUpperCase();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsHeaderVisible(!(currentScrollY > lastScrollY && currentScrollY > 200));
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
        setHoveredDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    setHoveredDropdown(null);
    setMobileExpandedDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    return () => {
      if (brandTapTimeoutRef.current) {
        clearTimeout(brandTapTimeoutRef.current);
      }
    };
  }, []);

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveDropdown(null);
    setHoveredDropdown(null);
    setMobileExpandedDropdown(null);
    setIsMobileMenuOpen(false);
  };

  const handleCartToggle = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    toggleCart();
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setActiveDropdown(null);
    setHoveredDropdown(null);
    setIsMobileMenuOpen(false);
  };

  const handleDropdownToggle = (dropdown: string) => {
    setActiveDropdown((current) => (current === dropdown ? null : dropdown));
  };

  const handleDropdownMouseEnter = (dropdown: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setHoveredDropdown(dropdown);
  };

  const handleDropdownMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setHoveredDropdown(null);
    }, 100);
  };

  const totalItems = getTotalItems();

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[60] h-8 overflow-hidden bg-[#1e1e1e] shadow-sm flex items-center">
        <div className="w-full overflow-hidden whitespace-nowrap">
          <div className="animate-marquee-continuous flex items-center space-x-10 text-[11px] sm:text-xs uppercase tracking-widest text-[#f5f2eb] font-light">
            <span className="flex items-center space-x-2">
              <span className="text-amber-500">✨</span>
              <span>TRANSPORT GRATUIT LA COMENZI PESTE 149 LEI ÎN TOATĂ ROMÂNIA</span>
            </span>
            <span className="text-[#888888]">✦</span>
            <span className="flex items-center space-x-2">
              <span className="text-amber-500">🌱</span>
              <span>LUMÂNĂRI PERLATE ȘI CEARĂ NATURALĂ 100% VEGETALĂ</span>
            </span>
            <span className="text-[#888888]">✦</span>
            <span className="flex items-center space-x-2">
              <span className="text-amber-500">🔥</span>
              <span>CONCEPT REÎNCĂRCABIL ECO-FRIENDLY & REFILLABIL DE LUX</span>
            </span>
            <span className="text-[#888888]">✦</span>
            <span className="flex items-center space-x-2">
              <span className="text-amber-500">✨</span>
              <span>TRANSPORT GRATUIT LA COMENZI PESTE 149 LEI ÎN TOATĂ ROMÂNIA</span>
            </span>
            <span className="text-[#888888]">✦</span>
            <span className="flex items-center space-x-2">
              <span className="text-amber-500">🌱</span>
              <span>LUMÂNĂRI PERLATE ȘI CEARĂ NATURALĂ 100% VEGETALĂ</span>
            </span>
            <span className="text-[#888888]">✦</span>
            <span className="flex items-center space-x-2">
              <span className="text-amber-500">🔥</span>
              <span>CONCEPT REÎNCĂRCABIL ECO-FRIENDLY & REFILLABIL DE LUX</span>
            </span>
            <span className="text-[#888888]">✦</span>
          </div>
        </div>
      </div>

      <header
        ref={dropdownRef}
        className={`fixed top-8 left-0 right-0 z-50 transition-transform duration-300 transform-gpu ${
          isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="absolute inset-0 bg-white border-b border-stone-200 shadow-md" />

        <div className="relative z-10 hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:block">
          <div className="flex justify-center py-4">
            <Link to="/" className="group text-center" onClick={handleLinkClick}>
              <span className="block text-xl font-extralight tracking-super-wide text-[#1e1e1e] transition-colors duration-300 group-hover:text-[#333333] sm:text-2xl">
                ATOMRA
              </span>
              <div className="text-xs font-light tracking-super-wide text-[#666666] transition-colors duration-300 group-hover:text-[#888888]">
                HOME ROMANIA
              </div>
            </Link>
          </div>

          <div className="flex items-center justify-center border-t border-[#e8dfc8]/20 py-2">
            <nav className="flex items-center space-x-12">
              {navItems.map((item) => (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => item.dropdown && handleDropdownMouseEnter(item.id)}
                  onMouseLeave={handleDropdownMouseLeave}
                >
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={() => handleDropdownToggle(item.id)}
                        className={`flex items-center space-x-1 whitespace-nowrap text-sm font-light uppercase tracking-wider ${
                          activeDropdown === item.id || hoveredDropdown === item.id
                            ? 'text-[#1e1e1e]'
                            : 'text-[#666666] hover:text-[#333333]'
                        }`}
                      >
                        <span>{item.name}</span>
                        <ChevronDown
                          size={12}
                          strokeWidth={1.5}
                          className={`transition-transform duration-300 ${
                            activeDropdown === item.id || hoveredDropdown === item.id ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {(activeDropdown === item.id || hoveredDropdown === item.id) && (
                        <div className="absolute top-full left-0 z-[100] mt-1 w-64 border border-[#e8dfc8]/20 bg-white/95 py-2 shadow-xl backdrop-blur-xl">
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.path}
                              to={dropdownItem.path}
                              className="block px-6 py-3 text-sm text-[#666666] transition-colors duration-200 hover:bg-[#f5f2eb]/40 hover:text-[#333333]"
                              onClick={handleLinkClick}
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.path || '/'}
                      className={`whitespace-nowrap text-sm font-light uppercase tracking-wider ${
                        location.pathname === item.path ? 'text-[#1e1e1e]' : 'text-[#666666] hover:text-[#333333]'
                      }`}
                      onClick={handleLinkClick}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>

          <div className="absolute top-1/2 right-4 flex -translate-y-1/2 items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => handleDropdownToggle('language')}
                onMouseEnter={() => handleDropdownMouseEnter('language')}
                onMouseLeave={handleDropdownMouseLeave}
                className="p-2 text-xs text-[#666666] transition-colors duration-200 hover:text-[#333333] sm:text-sm"
              >
                {languageLabel}
              </button>

              {(activeDropdown === 'language' || hoveredDropdown === 'language') && (
                <div className="absolute top-full right-0 z-[100] mt-1 border border-[#e8dfc8]/20 bg-white/95 py-2 shadow-xl backdrop-blur-xl">
                  {(['ro', 'hu', 'en'] as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className="block w-full text-left px-4 py-2 text-sm text-[#666666] hover:bg-[#f5f2eb]/40 hover:text-[#333333]"
                    >
                      {content.languageNames[lang]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={handleCartToggle}
              className="relative p-2 text-[#666666] transition-colors duration-200 hover:text-[#333333]"
              aria-label="Cart"
            >
              <ShoppingCart size={18} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#1e1e1e] text-xs text-white">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between px-4 py-3 md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen((current) => !current)}
            className="p-2 text-[#666666] transition-colors duration-200 hover:text-[#333333] focus:outline-none"
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>

          <Link
            to="/"
            className="group absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
            onClick={(event) => { handleBrandClick(event); handleLinkClick(); }}
          >
            <span className="block text-lg font-extralight tracking-super-wide text-[#1e1e1e] transition-colors duration-300 group-hover:text-[#333333]">
              ATOMRA
            </span>
            <div className="text-[10px] font-light tracking-super-wide text-[#666666] transition-colors duration-300 group-hover:text-[#888888]">
              HOME ROMANIA
            </div>
          </Link>

          <button
            onClick={handleCartToggle}
            className="relative p-2 text-[#666666] transition-colors duration-200 hover:text-[#333333] focus:outline-none"
            aria-label="Cart"
          >
            <ShoppingCart size={20} strokeWidth={1.5} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#1e1e1e] text-xs text-white">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      <div
        style={{ display: isMobileMenuOpen ? 'block' : 'none' }}
        className={`fixed inset-y-0 left-0 z-[70] w-80 max-w-[85vw] overflow-hidden bg-[#faf9f6] shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col pt-8">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#e8dfc8]/40 px-6 py-4 bg-[#1e1e1e] text-[#F7F5F2]">
            <div>
              <span className="block text-base font-light tracking-super-wide text-[#F7F5F2]">
                ATOMRA
              </span>
              <span className="block text-[9px] font-light tracking-super-wide text-[#d4c8bc]">
                HOME ROMANIA
              </span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="rounded-full p-2 text-[#d4c8bc] transition-colors hover:bg-white/10 hover:text-white focus:outline-none"
              aria-label="Close menu"
            >
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            <div>
              <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9a8c7d] border-b border-[#e8dfc8]/30 pb-2">
                {t('common.navigation')}
              </div>
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <div key={item.id} className="py-0.5">
                    {item.dropdown ? (
                      <>
                        <button
                          onClick={() => setMobileExpandedDropdown((current) => (current === item.id ? null : item.id))}
                          className={`flex w-full items-center justify-between px-3 py-3 rounded-lg text-sm transition-all duration-200 focus:outline-none ${
                            mobileExpandedDropdown === item.id
                              ? 'bg-[#f0eafe]/50 font-medium text-[#1e1e1e]'
                              : 'text-[#3a3532] hover:bg-[#f4efe6] hover:text-[#1e1e1e]'
                          }`}
                        >
                          <span className="font-light tracking-wide">{item.name}</span>
                          <ChevronDown
                            size={16}
                            className={`transition-transform duration-300 ease-out text-[#8c7a6b] ${
                              mobileExpandedDropdown === item.id ? 'rotate-180 text-[#1e1e1e]' : ''
                            }`}
                          />
                        </button>

                        <div
                          className={`ml-3 overflow-hidden border-l-2 border-[#d8ccbc] pl-3 transition-all duration-300 ease-in-out ${
                            mobileExpandedDropdown === item.id ? 'max-h-96 py-2 opacity-100' : 'max-h-0 py-0 opacity-0'
                          }`}
                        >
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.path}
                              to={dropdownItem.path}
                              className="block py-2 text-xs font-light tracking-wider text-[#5c544d] transition-colors duration-200 hover:text-[#1e1e1e] hover:translate-x-1 transform"
                              onClick={handleLinkClick}
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </div>
                      </>
                    ) : (
                      <Link
                        to={item.path || '/'}
                        className={`block w-full px-3 py-3 rounded-lg text-left text-sm font-light tracking-wide transition-colors duration-200 ${
                          location.pathname === item.path
                            ? 'bg-[#1e1e1e] text-white font-normal'
                            : 'text-[#3a3532] hover:bg-[#f4efe6] hover:text-[#1e1e1e]'
                        }`}
                        onClick={handleLinkClick}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
            </div>

            {/* Utilities / Free Shipping info */}
            <div>
              <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9a8c7d] border-b border-[#e8dfc8]/30 pb-2">
                {t('common.utilities')}
              </div>
              <div className="bg-[#f3eee5] border border-[#e5dcce] p-3 rounded-lg text-xs font-light text-[#594d40] flex items-center space-x-2">
                <span className="text-amber-700">✨</span>
                <span>{t('banner.freeShipping')}</span>
              </div>
            </div>

            {/* Language Selector */}
            <div>
              <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9a8c7d] border-b border-[#e8dfc8]/30 pb-2">
                {content.languageLabel}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(['ro', 'hu', 'en'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    className={`py-2 text-xs font-light tracking-wider rounded-lg transition-all duration-200 ${
                      language === lang
                        ? 'bg-[#1e1e1e] text-white shadow-sm font-normal'
                        : 'bg-[#f4efe6] text-[#594d40] hover:bg-[#e8dfc8]/60 hover:text-[#1e1e1e]'
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[65] bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Header;

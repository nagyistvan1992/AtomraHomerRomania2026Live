import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { ShoppingCart, Search, ChevronDown, Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLanguage, type Language } from '../context/LanguageContext';
import { SECRET_ADMIN_ROUTE, SECRET_ADMIN_TAP_COUNT, SECRET_ADMIN_TAP_WINDOW_MS } from '../constants/adminAccess';

const SearchModal = lazy(() => import('./SearchModal'));

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
    searchLabel: string;
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
    searchLabel: 'Cautare',
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
    searchLabel: 'Kereses',
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
    searchLabel: 'Search',
    languageLabel: 'Language',
    languageNames: { ro: 'Romana', hu: 'Magyar', en: 'English' },
  },
};

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
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

  const handleBrandClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const nextTapCount = brandTapCount + 1;

    if (brandTapTimeoutRef.current) {
      clearTimeout(brandTapTimeoutRef.current);
    }

    if (nextTapCount >= SECRET_ADMIN_TAP_COUNT) {
      event.preventDefault();
      setBrandTapCount(0);
      setActiveDropdown(null);
      setHoveredDropdown(null);
      setIsMobileMenuOpen(false);
      navigate(SECRET_ADMIN_ROUTE);
      return;
    }

    setBrandTapCount(nextTapCount);
    brandTapTimeoutRef.current = setTimeout(() => {
      setBrandTapCount(0);
    }, SECRET_ADMIN_TAP_WINDOW_MS);
  };

  const totalItems = getTotalItems();

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[60] overflow-hidden border-b border-slate-600/20 bg-gradient-to-r from-slate-800/50 via-slate-700/45 to-slate-800/50 shadow-lg backdrop-blur-md">
        <div className="relative flex h-8 items-center">
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-slate-600/5 via-transparent to-slate-500/5" />
          <div className="w-full overflow-hidden hidden md:block">
            <div className="relative z-10 flex animate-scroll-banner whitespace-nowrap text-xs font-light tracking-wide text-slate-100">
              {Array.from({ length: 12 }, (_, index) => (
                <span key={index} className="inline-flex flex-shrink-0 items-center space-x-3 px-12">
                  <span className="inline-block h-1 w-1 rounded-full bg-slate-300/40" />
                  <span className="whitespace-nowrap font-light tracking-wider drop-shadow-sm">
                    {t('banner.freeShipping')}
                  </span>
                  <span className="inline-block h-0.5 w-0.5 rounded-full bg-slate-300/30" />
                </span>
              ))}
            </div>
          </div>
          <div className="relative z-10 flex w-full items-center justify-center px-4 text-center text-[11px] font-light tracking-wide text-slate-100 md:hidden">
            <span className="truncate">{t('banner.freeShipping')}</span>
          </div>
        </div>
      </div>

      <header
        ref={dropdownRef}
        className={`fixed top-8 left-0 right-0 z-50 transition-all duration-500 ${
          isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-[#faf8f5]/95 to-white/95 shadow-md backdrop-blur-sm" />

        <div className="relative z-10 hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:block">
          <div className="flex justify-center py-4">
            <Link to="/" className="group text-center" onClick={(event) => { handleBrandClick(event); handleLinkClick(); }}>
              <h1 className="text-xl font-extralight tracking-super-wide text-[#1e1e1e] transition-colors duration-300 group-hover:text-[#333333] sm:text-2xl">
                ATOMRA
              </h1>
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
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#666666] transition-colors duration-200 hover:text-[#333333]"
              aria-label={content.searchLabel}
            >
              <Search size={18} strokeWidth={1.5} />
            </button>

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
            <h1 className="text-lg font-extralight tracking-super-wide text-[#1e1e1e] transition-colors duration-300 group-hover:text-[#333333]">
              ATOMRA
            </h1>
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
        className={`fixed inset-y-0 left-0 z-50 w-full max-w-xs overflow-hidden bg-white/95 backdrop-blur-md transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-[#e8dfc8]/20 p-4">
            <div className="text-lg font-light text-[#1e1e1e]">{content.menuLabel}</div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-[#666666] transition-colors duration-200 hover:text-[#333333] focus:outline-none"
              aria-label="Close menu"
            >
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            <div className="mb-6 px-4">
              <div className="mb-2 px-2 text-xs uppercase tracking-wider text-[#a8a29e]">
                {t('common.navigation')}
              </div>
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <div key={item.id}>
                    {item.dropdown ? (
                      <>
                        <button
                          onClick={() => handleDropdownToggle(item.id)}
                          className="flex w-full items-center justify-between px-2 py-3 text-[#666666] transition-colors duration-200 hover:text-[#333333] focus:outline-none"
                        >
                          <span className="text-sm font-light">{item.name}</span>
                          <ChevronDown
                            size={16}
                            className={`transition-transform duration-300 ${activeDropdown === item.id ? 'rotate-180' : ''}`}
                          />
                        </button>

                        <div
                          className={`ml-4 overflow-hidden border-l border-[#e8dfc8]/20 pl-2 transition-all duration-300 ease-in-out ${
                            activeDropdown === item.id ? 'max-h-96 py-1 opacity-100' : 'max-h-0 opacity-0'
                          }`}
                        >
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.path}
                              to={dropdownItem.path}
                              className="block py-2 text-sm text-[#888888] transition-colors duration-200 hover:text-[#333333]"
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
                        className={`block w-full px-2 py-3 text-left text-sm font-light ${
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

            <div className="mb-6 px-4">
              <div className="mb-2 px-2 text-xs uppercase tracking-wider text-[#a8a29e]">
                {t('common.utilities')}
              </div>
              <div className="space-y-1">
                <button
                  onClick={() => {
                    setIsSearchOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex w-full items-center px-2 py-3 text-sm font-light text-[#666666] transition-colors duration-200 hover:text-[#333333] focus:outline-none"
                >
                  <Search size={16} className="mr-3" />
                  <span>{content.searchLabel}</span>
                </button>

              </div>
            </div>

            <div className="mb-6 px-4">
              <div className="mb-2 px-2 text-xs uppercase tracking-wider text-[#a8a29e]">
                {content.languageLabel}
              </div>
              <div className="flex space-x-2 px-2">
                {(['ro', 'hu', 'en'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    className={`rounded px-3 py-2 text-sm font-light ${
                      language === lang
                        ? 'bg-[#f5f2eb] text-[#1e1e1e]'
                        : 'text-[#666666] hover:bg-[#f5f2eb]/40 hover:text-[#333333]'
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
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <Suspense fallback={null}>
        {isSearchOpen ? <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} /> : null}
      </Suspense>
    </>
  );
};

export default Header;

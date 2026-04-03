import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Search, User, ChevronDown, Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useAdmin } from '../context/AdminContext';
import SearchModal from './SearchModal';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { toggleCart, getTotalItems } = useCart();
  const { state: authState, logout } = useAuth();
  const { isAdmin } = useAdmin();
  const { t, language, setLanguage } = useLanguage();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownItemsRef = useRef<{[key: string]: HTMLDivElement | null}>({});
  const mobileDropdownRefs = useRef<{[key: string]: HTMLDivElement | null}>({});

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if header should be visible based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        // Scrolling down & past threshold - hide header
        setIsHeaderVisible(false);
      } else {
        // Scrolling up or at top - show header
        setIsHeaderVisible(true);
      }
      
      setLastScrollY(currentScrollY);
      setScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 100);
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
      
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    setHoveredDropdown(null);
  }, [location.pathname]);

  // Handle body scroll lock when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleSearchOpen = () => {
    setIsSearchOpen(true);
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
  };

  const handleCartToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleCart();
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  };

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveDropdown(null);
    setHoveredDropdown(null);
    setIsMobileMenuOpen(false);
  };

  const handleAdminClick = () => {
    if (isAdmin) {
      navigate('/admin');
    } else {
      navigate('/admin-login');
    }
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  };

  const handleLanguageChange = (lang: 'ro' | 'hu' | 'en') => {
    setLanguage(lang);
    setActiveDropdown(null);
    setHoveredDropdown(null);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setActiveDropdown(null);
    setHoveredDropdown(null);
    setIsMobileMenuOpen(false);
  };

  const handleDropdownToggle = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleDropdownMouseEnter = (dropdown: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setHoveredDropdown(dropdown);
  };

  const handleDropdownMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setHoveredDropdown(null);
    }, 100);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setActiveDropdown(null);
  };

  const handleMobileNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalItems = getTotalItems();

  const getLanguageLabel = () => {
    switch (language) {
      case 'ro': return 'RO';
      case 'hu': return 'HU';
      case 'en': return 'EN';
      default: return 'RO';
    }
  };

  // Main navigation items
  const mainNavItems = [
    {
      id: 'shop',
      name: 'PRODUSE',
      dropdown: [
        { name: 'ATOMRA PENTRU ACASA', path: '/home-collection' },
        { name: 'ATOMRA PENTRU EVENIMENTE', path: '/events-collection' },
        { name: 'ACCESORII', path: '/accessories-collection' },
        { name: 'TOATE PRODUSELE', path: '/toate-produsele' }
      ]
    },
    {
      id: 'ideile',
      name: 'IDEILE NOASTRE',
      path: '/ideas'
    },
    {
      id: 'info',
      name: 'ALTE INFORMATII',
      dropdown: [
        { name: 'DE CE ATOMRA?', path: '/why-atomra' },
        { name: 'BLOG', path: '/blog' },
        { name: 'CÂT DE MULTĂ ATOMRA AM NEVOIE?', path: '/how-much' },
        { name: 'DESPRE NOI', path: '/about' },
        { name: 'INSTRUCTIUNI', path: '/instructions' }
      ]
    },
    {
      id: 'contact',
      name: 'CONTACT',
      path: '/contact'
    }
  ];

  return (
    <>
      {/* Announcement Banner */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-slate-800/50 via-slate-700/45 to-slate-800/50 backdrop-blur-md border-b border-slate-600/20 overflow-hidden shadow-lg">
        <div className="relative h-8 flex items-center">
          {/* Elegant animated background pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-600/5 via-transparent to-slate-500/5 animate-pulse"></div>
          
          {/* Floating elegant decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-2 left-10 w-1 h-1 bg-slate-300/20 rounded-full animate-float"></div>
            <div className="absolute top-2.5 right-20 w-0.5 h-0.5 bg-slate-200/30 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-2 left-1/3 w-0.5 h-0.5 bg-slate-300/25 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-2.5 right-1/3 w-0.5 h-0.5 bg-slate-200/20 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute top-1.5 left-1/2 w-0.5 h-0.5 bg-slate-300/15 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
          </div>
          
          {/* Scrolling text container */}
          <div className="w-full overflow-hidden">
            <div className="animate-scroll-banner whitespace-nowrap text-xs text-slate-100 font-light tracking-wide relative z-10 flex">
              {/* Repeat the text multiple times for seamless infinite loop */}
              {Array.from({ length: 20 }, (_, index) => (
                <span key={index} className="inline-flex items-center px-12 space-x-3 flex-shrink-0">
                  <span className="inline-block w-1 h-1 bg-slate-300/40 rounded-full animate-pulse" style={{ animationDelay: `${index * 0.3}s` }}></span>
                  <span className="drop-shadow-sm font-light tracking-wider whitespace-nowrap" style={{ textShadow: '0 1px 2px rgba(15, 23, 42, 0.2)' }}>
                    {t('banner.freeShipping')}
                  </span>
                  <span className="inline-block w-0.5 h-0.5 bg-slate-300/30 rounded-full"></span>
                </span>
              ))}
            </div>
          </div>
        </div>
        
        {/* Elegant shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-300/5 to-transparent transform -skew-x-12 animate-shimmer opacity-30"></div>
        
        {/* Sophisticated glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-600/5 via-slate-500/8 to-slate-600/5 animate-pulse opacity-20"></div>
        
        {/* Soft edge gradients for seamless scrolling with elegant tones */}
        <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-slate-800/70 to-transparent pointer-events-none z-20"></div>
        <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-slate-800/70 to-transparent pointer-events-none z-20"></div>
        
        {/* Subtle inner shadow for depth */}
        <div className="absolute inset-0 shadow-inner" style={{ boxShadow: 'inset 0 1px 2px rgba(15, 23, 42, 0.1)' }}></div>
      </div>

      {/* Main Header */}
      <header 
        className={`fixed top-8 left-0 right-0 z-50 transition-all duration-500 ${
          isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
        }`} 
        ref={dropdownRef}
      >
        {/* Luxurious background with warm white gradient and transparency */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-[#faf8f5]/95 to-white/95 backdrop-blur-sm shadow-md">
          {/* Subtle texture overlay */}
          <div className="absolute inset-0 opacity-5" style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23a8a29e' fill-opacity='0.05' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3Ccircle cx='13' cy='13' r='1'/%3E%3C/g%3E%3C/svg%3E")` 
          }}></div>
          
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/10"></div>
          
          {/* Animated shimmer effect */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#f5f2eb]/20 to-transparent transform -skew-x-12 translate-x-[-100%] animate-shimmer opacity-30"></div>
          </div>
        </div>
        
        {/* Desktop Header */}
        <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Logo */}
          <div className="flex justify-center py-4">
            <Link 
              to="/" 
              className="text-center group"
              onClick={handleLinkClick}
            >
              <h1 className="text-xl sm:text-2xl font-extralight tracking-super-wide text-[#1e1e1e] group-hover:text-[#333333] transition-colors duration-300" 
              style={{ 
                fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                fontWeight: '200'
              }}>
                ATOMRA
              </h1>
              <div className="text-xs font-light tracking-super-wide text-[#666666] group-hover:text-[#888888] transition-colors duration-300"
              style={{ 
                fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                fontWeight: '300'
              }}>
                HOME ROMANIA
              </div>
            </Link>
          </div>
          
          {/* Horizontal Navigation */}
          <div className="flex justify-center items-center py-2 border-t border-[#e8dfc8]/20">
            {/* Main Navigation */}
            <nav className="flex items-center space-x-12">
              {mainNavItems.map((item) => (
                <div 
                  key={item.id} 
                  className="relative"
                  ref={el => dropdownItemsRef.current[item.id] = el}
                  onMouseEnter={() => item.dropdown && handleDropdownMouseEnter(item.id)}
                  onMouseLeave={handleDropdownMouseLeave}
                >
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={() => handleDropdownToggle(item.id)}
                        className={`flex items-center space-x-1 font-light text-sm uppercase tracking-wider relative group whitespace-nowrap ${
                          activeDropdown === item.id || hoveredDropdown === item.id
                            ? 'text-[#1e1e1e]' 
                            : 'text-[#666666] hover:text-[#333333]'
                        }`}
                        aria-expanded={activeDropdown === item.id || hoveredDropdown === item.id}
                        aria-haspopup="true"
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
                      
                      {/* Dropdown Menu */}
                      {(activeDropdown === item.id || hoveredDropdown === item.id) && (
                        <div 
                          className="absolute top-full left-0 mt-1 w-64 bg-white/95 rounded-none shadow-xl py-2 z-[100] border border-[#e8dfc8]/20 backdrop-blur-xl"
                          onMouseEnter={() => handleDropdownMouseEnter(item.id)}
                          onMouseLeave={handleDropdownMouseLeave}
                        >
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.path}
                              to={dropdownItem.path}
                              className="block px-6 py-3 text-sm text-[#666666] hover:bg-[#f5f2eb]/40 hover:text-[#333333] transition-colors duration-200"
                              onClick={() => {
                                handleLinkClick();
                                setActiveDropdown(null);
                              }}
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
                      className={`font-light text-sm uppercase tracking-wider relative group whitespace-nowrap ${
                        location.pathname === item.path 
                          ? 'text-[#1e1e1e]' 
                          : 'text-[#666666] hover:text-[#333333]'
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
          
          {/* Right Side Icons */}
          <div className="absolute top-1/2 right-4 -translate-y-1/2 flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => handleDropdownToggle('language')}
                onMouseEnter={() => handleDropdownMouseEnter('language')}
                onMouseLeave={handleDropdownMouseLeave}
                className="p-2 text-[#666666] hover:text-[#333333] transition-colors duration-200 text-xs sm:text-sm"
                aria-expanded={activeDropdown === 'language' || hoveredDropdown === 'language'}
                aria-haspopup="true"
              >
                {getLanguageLabel()}
              </button>
              
              {(activeDropdown === 'language' || hoveredDropdown === 'language') && (
                <div 
                  className="absolute top-full right-0 mt-1 bg-white/95 rounded-none shadow-xl py-2 z-[100] border border-[#e8dfc8]/20 backdrop-blur-xl"
                  onMouseEnter={() => handleDropdownMouseEnter('language')}
                  onMouseLeave={handleDropdownMouseLeave}
                >
                  <button
                    onClick={() => handleLanguageChange('ro')}
                    className="block w-full text-left px-4 py-2 text-sm text-[#666666] hover:bg-[#f5f2eb]/40 hover:text-[#333333]"
                  >
                    Română
                  </button>
                  <button
                    onClick={() => handleLanguageChange('hu')}
                    className="block w-full text-left px-4 py-2 text-sm text-[#666666] hover:bg-[#f5f2eb]/40 hover:text-[#333333]"
                  >
                    Magyar
                  </button>
                  <button
                    onClick={() => handleLanguageChange('en')}
                    className="block w-full text-left px-4 py-2 text-sm text-[#666666] hover:bg-[#f5f2eb]/40 hover:text-[#333333]"
                  >
                    English
                  </button>
                </div>
              )}
            </div>
            
            {/* Search Button */}
            <button 
              onClick={handleSearchOpen}
              className="p-2 text-[#666666] hover:text-[#333333] transition-colors duration-200"
              aria-label={language === 'ro' ? 'Căutare' : language === 'hu' ? 'Keresés' : 'Search'}
            >
              <Search size={18} strokeWidth={1.5} />
            </button>
            
            {/* User Account */}
            <div className="relative">
              <button
                onClick={() => handleDropdownToggle('user')}
                onMouseEnter={() => handleDropdownMouseEnter('user')}
                onMouseLeave={handleDropdownMouseLeave}
                className="p-2 text-[#666666] hover:text-[#333333] transition-colors duration-200"
                aria-label={language === 'ro' ? 'Cont utilizator' : language === 'hu' ? 'Felhasználói fiók' : 'User account'}
                aria-expanded={activeDropdown === 'user' || hoveredDropdown === 'user'}
                aria-haspopup="true"
              >
                <User size={18} strokeWidth={1.5} />
              </button>
              
              {/* User Dropdown */}
              {(activeDropdown === 'user' || hoveredDropdown === 'user') && (
                <div 
                  className="absolute top-full right-0 mt-1 bg-white/95 rounded-none shadow-xl py-2 z-[100] border border-[#e8dfc8]/20 backdrop-blur-xl w-64"
                  onMouseEnter={() => handleDropdownMouseEnter('user')}
                  onMouseLeave={handleDropdownMouseLeave}
                >
                  {authState.isAuthenticated ? (
                    <>
                      <div className="px-4 py-3 border-b border-[#f5f2eb]/50">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-[#f5f2eb]/50 rounded-full flex items-center justify-center">
                            <User size={20} className="text-[#666666]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-[#333333] truncate">
                              {authState.user?.firstName} {authState.user?.lastName}
                            </p>
                            <p className="text-xs text-[#666666] truncate">
                              {authState.user?.email}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="px-2 py-2">
                        <Link
                          to="/member"
                          className="flex items-center space-x-3 px-2 py-2 rounded-md text-sm text-[#666666] hover:bg-[#f5f2eb]/40 w-full text-left"
                          onClick={() => {
                            handleLinkClick();
                            setActiveDropdown(null);
                          }}
                        >
                          <User size={16} strokeWidth={1.5} />
                          <span>{t('member.myAccount')}</span>
                        </Link>
                        {isAdmin && (
                          <button
                            onClick={handleAdminClick}
                            className="flex items-center space-x-3 px-2 py-2 rounded-md text-sm text-[#666666] hover:bg-[#f5f2eb]/40 w-full text-left"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0 3 4.46 2.5 2.5 0 0 0 4.96.46 2.5 2.5 0 0 0 1.98-3 2.5 2.5 0 0 0-3-4.46z" />
                              <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
                            </svg>
                            <span>{t('common.admin')}</span>
                          </button>
                        )}
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-3 px-2 py-2 rounded-md text-sm text-red-600 hover:bg-red-50/50 w-full text-left"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                          </svg>
                          <span>{t('common.logout')}</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="px-4 py-3">
                      <p className="text-sm text-[#666666] mb-3">{t('member.signInPrompt')}</p>
                      <Link
                        to="/member"
                        className="block w-full bg-[#1e1e1e] text-white text-center py-2 rounded-md text-sm hover:bg-[#333333] transition-colors duration-300"
                        onClick={() => {
                          handleLinkClick();
                          setActiveDropdown(null);
                        }}
                      >
                        {t('member.loginRegister')}
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Cart Button */}
            <button 
              onClick={handleCartToggle}
              className="p-2 text-[#666666] hover:text-[#333333] transition-colors duration-200 relative"
              aria-label={language === 'ro' ? 'Coș' : language === 'hu' ? 'Kosár' : 'Cart'}
            >
              <ShoppingCart size={18} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#1e1e1e] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Header */}
        <div className="md:hidden relative z-10 px-4 py-3 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="p-2 text-[#666666] hover:text-[#333333] transition-colors duration-200 focus:outline-none"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <Menu size={24} />
          </button>
          
          {/* Centered Logo */}
          <Link 
            to="/" 
            className="text-center group absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            onClick={handleLinkClick}
          >
            <h1 className="text-lg font-extralight tracking-super-wide text-[#1e1e1e] group-hover:text-[#333333] transition-colors duration-300" 
            style={{ 
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
              fontWeight: '200'
            }}>
              ATOMRA
            </h1>
            <div className="text-[10px] font-light tracking-super-wide text-[#666666] group-hover:text-[#888888] transition-colors duration-300"
            style={{ 
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
              fontWeight: '300'
            }}>
              HOME ROMANIA
            </div>
          </Link>
          
          {/* Cart Button (Top Right) */}
          <button 
            onClick={handleCartToggle}
            className="p-2 text-[#666666] hover:text-[#333333] transition-colors duration-200 relative focus:outline-none"
            aria-label={language === 'ro' ? 'Coș' : language === 'hu' ? 'Kosár' : 'Cart'}
          >
            <ShoppingCart size={20} strokeWidth={1.5} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#1e1e1e] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div 
        ref={mobileMenuRef}
        className={`fixed inset-y-0 left-0 z-50 w-full max-w-xs bg-white/95 backdrop-blur-md transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } md:hidden overflow-hidden`}
      >
        <div className="h-full flex flex-col">
          {/* Mobile Menu Header */}
          <div className="p-4 border-b border-[#e8dfc8]/20 flex items-center justify-between">
            <div className="text-[#1e1e1e] text-lg font-light">
              {language === 'ro' ? 'Meniu' : language === 'hu' ? 'Menü' : 'Menu'}
            </div>
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-[#666666] hover:text-[#333333] transition-colors duration-200 focus:outline-none"
              aria-label="Close menu"
            >
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>
          
          {/* Mobile Menu Content */}
          <div className="flex-1 py-4 overflow-y-auto">
            {/* Navigation Links */}
            <div className="px-4 mb-6">
              <div className="text-[#a8a29e] text-xs uppercase tracking-wider mb-2 px-2">
                {t('common.navigation')}
              </div>
              <nav className="space-y-1">
                {mainNavItems.map((item) => (
                  <div key={item.id} ref={el => mobileDropdownRefs.current[item.id] = el}>
                    {item.dropdown ? (
                      <>
                        <button
                          onClick={() => handleDropdownToggle(item.id)}
                          className="flex items-center justify-between w-full px-2 py-3 text-[#666666] hover:text-[#333333] transition-colors duration-200 focus:outline-none"
                          aria-expanded={activeDropdown === item.id}
                        >
                          <span className="text-sm font-light">{item.name}</span>
                          <ChevronDown 
                            size={16} 
                            className={`transition-transform duration-300 ${
                              activeDropdown === item.id ? 'rotate-180' : ''
                            }`} 
                          />
                        </button>
                        
                        <div 
                          className={`ml-4 pl-2 border-l border-[#e8dfc8]/20 space-y-1 py-1 overflow-hidden transition-all duration-300 ease-in-out ${
                            activeDropdown === item.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                          }`}
                        >
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.path}
                              to={dropdownItem.path}
                              className="block w-full text-left py-2 text-sm text-[#888888] hover:text-[#333333] transition-colors duration-200"
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
                        className={`block w-full text-left px-2 py-3 text-sm font-light ${
                          location.pathname === item.path 
                            ? 'text-[#1e1e1e]' 
                            : 'text-[#666666] hover:text-[#333333]'
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
            
            {/* Utilities */}
            <div className="px-4 mb-6">
              <div className="text-[#a8a29e] text-xs uppercase tracking-wider mb-2 px-2">
                {t('common.utilities')}
              </div>
              <div className="space-y-1">
                <button
                  onClick={handleSearchOpen}
                  className="flex items-center w-full px-2 py-3 text-sm font-light text-[#666666] hover:text-[#333333] transition-colors duration-200 focus:outline-none"
                >
                  <Search size={16} className="mr-3" />
                  <span>{language === 'ro' ? 'Căutare' : 
                         language === 'hu' ? 'Keresés' : 
                         'Search'}</span>
                </button>
                
                <Link
                  to="/member"
                  onClick={handleLinkClick}
                  className="flex items-center w-full px-2 py-3 text-sm font-light text-[#666666] hover:text-[#333333] transition-colors duration-200"
                >
                  <User size={16} className="mr-3" />
                  <span>{language === 'ro' ? 'Contul Meu' : 
                         language === 'hu' ? 'Fiókom' : 
                         'My Account'}</span>
                </Link>
                
                {isAdmin && (
                  <button
                    onClick={handleAdminClick}
                    className="flex items-center w-full px-2 py-3 text-sm font-light text-[#666666] hover:text-[#333333] transition-colors duration-200 focus:outline-none"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mr-3">
                      <path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0 3 4.46 2.5 2.5 0 0 0 4.96.46 2.5 2.5 0 0 0 1.98-3 2.5 2.5 0 0 0-3-4.46z" />
                      <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
                    </svg>
                    <span>{t('common.admin')}</span>
                  </button>
                )}
              </div>
            </div>
            
            {/* Language Selector */}
            <div className="px-4 mb-6">
              <div className="text-[#a8a29e] text-xs uppercase tracking-wider mb-2 px-2">
                {language === 'ro' ? 'Limbă' : language === 'hu' ? 'Nyelv' : 'Language'}
              </div>
              <div className="flex space-x-2 px-2">
                <button
                  onClick={() => handleLanguageChange('ro')}
                  className={`px-3 py-2 text-sm font-light rounded ${
                    language === 'ro' 
                      ? 'bg-[#f5f2eb] text-[#1e1e1e]' 
                      : 'text-[#666666] hover:text-[#333333] hover:bg-[#f5f2eb]/40'
                  }`}
                >
                  RO
                </button>
                <button
                  onClick={() => handleLanguageChange('hu')}
                  className={`px-3 py-2 text-sm font-light rounded ${
                    language === 'hu' 
                      ? 'bg-[#f5f2eb] text-[#1e1e1e]' 
                      : 'text-[#666666] hover:text-[#333333] hover:bg-[#f5f2eb]/40'
                  }`}
                >
                  HU
                </button>
                <button
                  onClick={() => handleLanguageChange('en')}
                  className={`px-3 py-2 text-sm font-light rounded ${
                    language === 'en' 
                      ? 'bg-[#f5f2eb] text-[#1e1e1e]' 
                      : 'text-[#666666] hover:text-[#333333] hover:bg-[#f5f2eb]/40'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
          
          {/* Mobile Menu Footer */}
          <div className="p-4 border-t border-[#e8dfc8]/20 mt-auto">
            {authState.isAuthenticated ? (
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-[#f5f2eb] rounded-full flex items-center justify-center">
                    <User size={18} className="text-[#666666]" />
                  </div>
                  <div>
                    <div className="text-[#1e1e1e] text-sm font-light">
                      {authState.user?.firstName} {authState.user?.lastName}
                    </div>
                    <div className="text-[#888888] text-xs">
                      {authState.user?.email}
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full py-2 text-center text-[#666666] hover:text-[#333333] border border-[#e8dfc8]/40 rounded text-sm font-light focus:outline-none"
                >
                  {t('common.logout')}
                </button>
              </div>
            ) : (
              <Link
                to="/member"
                onClick={handleLinkClick}
                className="block w-full py-2 text-center text-white bg-[#1e1e1e] hover:bg-[#333333] rounded text-sm font-light"
              >
                {t('member.loginRegister')}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={toggleMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={handleSearchClose} />
    </>
  );
};

export default Header;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const COOKIE_CONSENT_KEY = 'atomra_cookie_consent_v1';

export interface CookiePreferences {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
}

const CookieBanner: React.FC = () => {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!saved) {
        setIsVisible(true);
      }
    } catch (e) {
      setIsVisible(true);
    }
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    try {
      localStorage.setItem(
        COOKIE_CONSENT_KEY,
        JSON.stringify({
          ...prefs,
          timestamp: new Date().toISOString(),
        })
      );
    } catch (e) {}
    setIsVisible(false);
  };

  const handleAcceptAll = () => {
    saveConsent({ necessary: true, analytics: true, marketing: true });
  };

  const handleRejectAll = () => {
    saveConsent({ necessary: true, analytics: false, marketing: false });
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
  };

  if (!isVisible) return null;

  const content = {
    ro: {
      title: 'Respectăm confidențialitatea datelor tale (EU GDPR)',
      description:
        'Folosim cookie-uri necesare pentru funcționarea coșului și securitatea magazinului. Cookie-urile analitice și de marketing sunt opționale.',
      acceptAll: 'Aceptă toate',
      rejectAll: 'Respinge toate',
      preferences: 'Preferințe',
      savePreferences: 'Salvează preferințele',
      necessary: 'Necesare (Strict obligatorii)',
      necessaryDesc: 'Imprescindibile pentru funcționarea coșului de cumpărături și sesiunii.',
      analytics: 'Analitice (Opțional)',
      analyticsDesc: 'Ne ajută să înțelegem cum folosești site-ul pentru a-l îmbunătăți.',
      marketing: 'Marketing (Opțional)',
      marketingDesc: 'Utilizate pentru a-ți afișa oferte relevante și personalizate.',
      privacyLink: 'Politica de confidențialitate și cookie-uri',
    },
    hu: {
      title: 'Tiszteletben tartjuk az adataid védelmét (EU GDPR)',
      description:
        'Sütiket használunk a kosár működéséhez és a biztonsághoz. Az analitikai és marketing sütik opciói teljesen választatóak.',
      acceptAll: 'Összes elfogadása',
      rejectAll: 'Összes elutasítása',
      preferences: 'Beállítások',
      savePreferences: 'Beállítások mentése',
      necessary: 'Szükséges (Kötelező)',
      necessaryDesc: 'Elengedhetetlen a kosár működéséhez és biztonságához.',
      analytics: 'Analitika (Opcionális)',
      analyticsDesc: 'Segít megérteni az oldal használatát.',
      marketing: 'Marketing (Opcionális)',
      marketingDesc: 'Releváns ajánlatok megjelenítéséhez.',
      privacyLink: 'Adatvédelmi tájékoztató',
    },
    en: {
      title: 'We respect your privacy (EU GDPR)',
      description:
        'We use essential cookies for checkout and store security. Analytics and marketing cookies are strictly optional.',
      acceptAll: 'Accept all',
      rejectAll: 'Reject all',
      preferences: 'Preferences',
      savePreferences: 'Save preferences',
      necessary: 'Necessary (Required)',
      necessaryDesc: 'Essential for cart functionality and security.',
      analytics: 'Analytics (Optional)',
      analyticsDesc: 'Helps us analyze site performance.',
      marketing: 'Marketing (Optional)',
      marketingDesc: 'Used for relevant offers.',
      privacyLink: 'Privacy policy',
    },
  }[language];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-5 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-2xl transition-all duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-start space-x-3 max-w-3xl">
            <div className="p-2 bg-amber-50 rounded-lg text-amber-700 flex-shrink-0 mt-0.5">
              <Cookie size={20} strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-900">{content.title}</h3>
              <p className="text-xs font-light text-slate-600 mt-1 leading-relaxed">
                {content.description}{' '}
                <Link to="/privacy-policy" className="text-slate-900 underline hover:text-slate-700 font-normal">
                  {content.privacyLink}
                </Link>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto justify-end">
            <button
              type="button"
              onClick={handleRejectAll}
              className="px-3.5 py-2 rounded border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-light tracking-wide uppercase transition-colors"
            >
              {content.rejectAll}
            </button>
            <button
              type="button"
              onClick={() => setShowPreferences(!showPreferences)}
              className="px-3.5 py-2 rounded border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-light tracking-wide uppercase transition-colors inline-flex items-center space-x-1"
            >
              <span>{content.preferences}</span>
              {showPreferences ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>
            <button
              type="button"
              onClick={handleAcceptAll}
              className="px-4 py-2 rounded bg-slate-900 text-white hover:bg-slate-800 text-xs font-light tracking-wide uppercase transition-colors"
            >
              {content.acceptAll}
            </button>
          </div>
        </div>

        {showPreferences && (
          <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-slate-50 rounded border border-slate-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-800">{content.necessary}</span>
                <input type="checkbox" checked disabled className="h-4 w-4 text-slate-900 rounded border-slate-300" />
              </div>
              <p className="text-[11px] text-slate-500 font-light mt-1">{content.necessaryDesc}</p>
            </div>

            <div className="p-3 bg-slate-50 rounded border border-slate-200">
              <div className="flex items-center justify-between">
                <label htmlFor="analytics-check" className="text-xs font-medium text-slate-800 cursor-pointer">
                  {content.analytics}
                </label>
                <input
                  id="analytics-check"
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                  className="h-4 w-4 text-slate-900 rounded border-slate-300 cursor-pointer"
                />
              </div>
              <p className="text-[11px] text-slate-500 font-light mt-1">{content.analyticsDesc}</p>
            </div>

            <div className="p-3 bg-slate-50 rounded border border-slate-200">
              <div className="flex items-center justify-between">
                <label htmlFor="marketing-check" className="text-xs font-medium text-slate-800 cursor-pointer">
                  {content.marketing}
                </label>
                <input
                  id="marketing-check"
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                  className="h-4 w-4 text-slate-900 rounded border-slate-300 cursor-pointer"
                />
              </div>
              <p className="text-[11px] text-slate-500 font-light mt-1">{content.marketingDesc}</p>
            </div>

            <div className="sm:col-span-3 flex justify-end">
              <button
                type="button"
                onClick={handleSavePreferences}
                className="px-4 py-2 bg-slate-900 text-white rounded text-xs font-light uppercase tracking-wide"
              >
                {content.savePreferences}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieBanner;

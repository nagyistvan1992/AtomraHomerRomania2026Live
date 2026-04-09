import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Navigate, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';
import MainLayout from './components/MainLayout';
import ScrollToTop from './components/ScrollToTop';
import { SECRET_ADMIN_ROUTE } from './constants/adminAccess';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const AllProductsPage = lazy(() => import('./pages/AllProductsPage'));
const HomeCollectionPage = lazy(() => import('./pages/HomeCollectionPage'));
const EventsCollectionPage = lazy(() => import('./pages/EventsCollectionPage'));
const AccessoriesCollectionPage = lazy(() => import('./pages/AccessoriesCollectionPage'));
const ComingSoonPage = lazy(() => import('./pages/ComingSoonPage'));
const ProductPage = lazy(() => import('./components/ProductPage'));
const SuccessPage = lazy(() => import('./pages/SuccessPage'));
const CancelPage = lazy(() => import('./pages/CancelPage'));
const AdminPageRoute = lazy(() => import('./routes/AdminPageRoute'));
const AdminLoginRoute = lazy(() => import('./routes/AdminLoginRoute'));
const IdeasPage = lazy(() => import('./pages/IdeasPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const WholesalePage = lazy(() => import('./pages/WholesalePage'));
const WhyAtomraPage = lazy(() => import('./pages/WhyAtomraPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const HowMuchPage = lazy(() => import('./pages/HowMuchPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const InstructionsPage = lazy(() => import('./pages/InstructionsPage'));
const ScentsPage = lazy(() => import('./pages/ScentsPage'));
const PlantBasedPage = lazy(() => import('./pages/PlantBasedPage'));
const RefillablePage = lazy(() => import('./pages/RefillablePage'));
const LegalInfoPage = lazy(() => import('./pages/LegalInfoPage'));
const CartRoute = lazy(() => import('./routes/CartRoute'));
const RefillableCandlesLandingPage = lazy(() => import('./pages/RefillableCandlesLandingPage'));
const SandWaxLandingPage = lazy(() => import('./pages/SandWaxLandingPage'));
const EventCandlesLandingPage = lazy(() => import('./pages/EventCandlesLandingPage'));
const NaturalWaxCandlesLandingPage = lazy(() => import('./pages/NaturalWaxCandlesLandingPage'));
const PremiumCandleGiftsLandingPage = lazy(() => import('./pages/PremiumCandleGiftsLandingPage'));
const HandmadeCandlesLandingPage = lazy(() => import('./pages/HandmadeCandlesLandingPage'));
const RefillableGuidePage = lazy(() => import('./pages/RefillableGuidePage'));
const RefillableVsClassicPage = lazy(() => import('./pages/RefillableVsClassicPage'));
const SoyVsSandWaxPage = lazy(() => import('./pages/SoyVsSandWaxPage'));
const EventDecorComparisonPage = lazy(() => import('./pages/EventDecorComparisonPage'));
const LegacyProductRoute = lazy(() => import('./routes/LegacyProductRoute'));

// Loading component
const PageLoader = () => {
  // Ensure scroll to top when loading new pages
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p className="text-gray-600 font-light">Loading...</p>
      </div>
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-white">
            <ScrollToTop />
            <Routes>
              {/* Admin Routes */}
              <Route path="/admin-login" element={<Navigate to="/" replace />} />
              <Route path={SECRET_ADMIN_ROUTE} element={
                <Suspense fallback={<PageLoader />}>
                  <AdminLoginRoute />
                </Suspense>
              } />
              <Route path="/admin" element={
                <Suspense fallback={<PageLoader />}>
                  <AdminPageRoute />
                </Suspense>
              } />
              {/* Public Routes with Main Layout */}
              <Route element={
                <Suspense fallback={<PageLoader />}>
                  <MainLayout />
                </Suspense>
              }>
                <Route path="/" element={<HomePage />} />
                <Route path="/toate-produsele" element={<AllProductsPage />} />
                <Route path="/all-products" element={<Navigate to="/toate-produsele" replace />} />
                <Route path="/home-collection" element={<HomeCollectionPage />} />
                <Route path="/events-collection" element={<EventsCollectionPage />} />
                <Route path="/accesorii" element={<AccessoriesCollectionPage />} />
                <Route path="/accessories-collection" element={<Navigate to="/accesorii" replace />} />
                <Route path="/coming-soon" element={<ComingSoonPage />} />
                <Route path="/cart" element={<CartRoute />} />
                <Route path="/product/:slug" element={<ProductPage />} />
                <Route path="/product-page/:legacySlug" element={<LegacyProductRoute />} />
                <Route path="/success" element={<SuccessPage />} />
                <Route path="/cancel" element={<CancelPage />} />
                <Route path="/ideas" element={<IdeasPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/wholesale" element={<WholesalePage />} />
                <Route path="/why-atomra" element={<WhyAtomraPage />} />
                <Route path="/lumanari-refillabile" element={<RefillableCandlesLandingPage />} />
                <Route path="/ceara-de-nisip" element={<SandWaxLandingPage />} />
                <Route path="/lumanari-pentru-evenimente" element={<EventCandlesLandingPage />} />
                <Route path="/lumanari-nunta" element={<Navigate to="/lumanari-pentru-evenimente" replace />} />
                <Route path="/lumanare-nunta" element={<Navigate to="/lumanari-pentru-evenimente" replace />} />
                <Route path="/lumanari-pentru-nunta" element={<Navigate to="/lumanari-pentru-evenimente" replace />} />
                <Route path="/lumanari-ceara-naturala" element={<NaturalWaxCandlesLandingPage />} />
                <Route path="/lumanari-naturale" element={<Navigate to="/lumanari-ceara-naturala" replace />} />
                <Route path="/lumanare-naturala" element={<Navigate to="/lumanari-ceara-naturala" replace />} />
                <Route path="/lumanari-din-ceara-de-soia" element={<Navigate to="/lumanari-ceara-naturala" replace />} />
                <Route path="/cadouri-lumanari-premium" element={<PremiumCandleGiftsLandingPage />} />
                <Route path="/idei-cadouri-personalizate" element={<Navigate to="/cadouri-lumanari-premium" replace />} />
                <Route path="/cadouri-personalizate" element={<Navigate to="/cadouri-lumanari-premium" replace />} />
                <Route path="/lumanari-handmade" element={<HandmadeCandlesLandingPage />} />
                <Route path="/lumanare-handmade" element={<Navigate to="/lumanari-handmade" replace />} />
                <Route path="/ghid/cum-functioneaza-lumanarile-refillabile" element={<RefillableGuidePage />} />
                <Route path="/comparatie/lumanari-refillabile-vs-clasice" element={<RefillableVsClassicPage />} />
                <Route path="/comparatie/ceara-de-soia-vs-ceara-de-nisip" element={<SoyVsSandWaxPage />} />
                <Route
                  path="/comparatie/decor-eveniment-cu-lumanari-refillabile"
                  element={<EventDecorComparisonPage />}
                />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/how-much" element={<HowMuchPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/instructions" element={<InstructionsPage />} />
                <Route path="/scents" element={<ScentsPage />} />
                <Route path="/plant-based" element={<PlantBasedPage />} />
                <Route path="/refillable" element={<RefillablePage />} />
                <Route path="/privacy-policy" element={<LegalInfoPage variant="privacy" />} />
                <Route path="/terms" element={<LegalInfoPage variant="terms" />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </LanguageProvider>
  );
}

export default App;

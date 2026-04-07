import React, { Suspense, lazy, useEffect } from 'react';
import { HashRouter as Router, Navigate, Routes, Route } from 'react-router-dom';
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

// Loading component
const PageLoader = () => {
  // Ensure scroll to top when loading new pages
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
                <Route path="/all-products" element={<AllProductsPage />} />
                <Route path="/home-collection" element={<HomeCollectionPage />} />
                <Route path="/events-collection" element={<EventsCollectionPage />} />
                <Route path="/accesorii" element={<AccessoriesCollectionPage />} />
                <Route path="/accessories-collection" element={<AccessoriesCollectionPage />} />
                <Route path="/coming-soon" element={<ComingSoonPage />} />
                <Route path="/cart" element={<CartRoute />} />
                <Route path="/product/:slug" element={<ProductPage />} />
                <Route path="/success" element={<SuccessPage />} />
                <Route path="/cancel" element={<CancelPage />} />
                <Route path="/ideas" element={<IdeasPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/wholesale" element={<WholesalePage />} />
                <Route path="/why-atomra" element={<WhyAtomraPage />} />
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

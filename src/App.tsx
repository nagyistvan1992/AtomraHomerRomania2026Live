import React, { Suspense, lazy, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from '@vercel/analytics/react';
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';
import { StripeProvider } from './context/StripeContext';
import { AuthProvider } from './context/AuthContext';
import { AdminProvider } from './context/AdminContext';
import MainLayout from './components/MainLayout';
import PerformanceMonitor from './components/PerformanceMonitor';
import ScrollToTop from './components/ScrollToTop';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const AllProductsPage = lazy(() => import('./pages/AllProductsPage'));
const HomeCollectionPage = lazy(() => import('./pages/HomeCollectionPage'));
const EventsCollectionPage = lazy(() => import('./pages/EventsCollectionPage'));
const AccessoriesCollectionPage = lazy(() => import('./pages/AccessoriesCollectionPage'));
const ComingSoonPage = lazy(() => import('./pages/ComingSoonPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const MemberPage = lazy(() => import('./pages/MemberPage'));
const ProductPage = lazy(() => import('./components/ProductPage'));
const SuccessPage = lazy(() => import('./pages/SuccessPage'));
const CancelPage = lazy(() => import('./pages/CancelPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const AdminLogin = lazy(() => import('./components/AdminLogin'));
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

// Session recovery logic moved to App component

function App() {
  // Session recovery function
  const handleSessionRecovery = () => {
    // Check if we're returning from admin panel
    if (document.referrer.includes('/admin')) {
      // Clear any problematic session data
      localStorage.removeItem('supabase.auth.token');
      
      // Force reload after a short delay
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  };
  
  // Run session recovery on mount
  React.useEffect(() => {
    handleSessionRecovery();
  }, []);
  
  return (
    <HelmetProvider>
      <LanguageProvider>
        <AuthProvider>
          <AdminProvider>
            <StripeProvider>
              <CartProvider>
                <Router>
                  <div className="min-h-screen bg-white">
                    <PerformanceMonitor />
                    <ScrollToTop />
                    <Analytics />
                    <Routes>
                      {/* Admin Routes */}
                      <Route path="/admin-login" element={
                        <Suspense fallback={<PageLoader />}>
                          <AdminLogin />
                        </Suspense>
                      } />
                      <Route path="/admin" element={
                        <Suspense fallback={<PageLoader />}>
                          <AdminPage />
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
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/member" element={<MemberPage />} />
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
                      </Route>
                    </Routes>
                  </div>
                </Router>
              </CartProvider>
            </StripeProvider>
          </AdminProvider>
        </AuthProvider>
      </LanguageProvider>
    </HelmetProvider>
  );
}

export default App;

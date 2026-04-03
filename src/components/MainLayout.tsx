import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AnnouncementBanner from './AnnouncementBanner';
import Header from './Header';
import CartDrawer from './CartDrawer';
import Footer from './Footer';

const MainLayout: React.FC = () => {
  // Add scroll to top when MainLayout is mounted or updated
  useEffect(() => {
    // Smooth scroll to top
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Add event listener to links
    const addScrollHandlers = () => {
      document.querySelectorAll('a[href^="/"]').forEach(link => {
        link.addEventListener('click', scrollToTop);
      });
    };

    // Initial scroll to top
    scrollToTop();

    // Set up link handlers with a small delay to ensure DOM is ready
    const timer = setTimeout(addScrollHandlers, 500);

    return () => {
      clearTimeout(timer);
      // Clean up event listeners
      document.querySelectorAll('a[href^="/"]').forEach(link => {
        link.removeEventListener('click', scrollToTop);
      });
    };
  }, []);

  return (
    <>
      <AnnouncementBanner />
      <Header />
      <CartDrawer />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
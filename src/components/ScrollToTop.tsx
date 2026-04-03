import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when route changes
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    };
    
    scrollToTop();
    
    // Also add click event listeners to all internal links for smooth scrolling
    const addScrollToLinks = () => {
      const internalLinks = document.querySelectorAll('a[href^="/"]');
      internalLinks.forEach(link => {
        if (!link.hasAttribute('data-scroll-handler')) {
          link.setAttribute('data-scroll-handler', 'true');
          link.addEventListener('click', () => {
            // Small timeout to let navigation happen first
            setTimeout(() => {
              window.scrollTo({
                top: 0,
                behavior: 'smooth'
              });
            }, 100);
          });
        }
      });
    };
    
    // Run after DOM is updated
    setTimeout(addScrollToLinks, 300);
    
    return () => {
      // Clean up handlers when component unmounts or route changes
      const internalLinks = document.querySelectorAll('a[href^="/"][data-scroll-handler="true"]');
      internalLinks.forEach(link => {
        link.removeAttribute('data-scroll-handler');
      });
    };
  }, [pathname]);

  return null;
};

export default ScrollToTop;
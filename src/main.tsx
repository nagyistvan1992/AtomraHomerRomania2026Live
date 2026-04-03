import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Performance optimizations
const startTime = performance.now();

// Preload critical resources
const preloadCriticalResources = () => {
  // Preload critical images
  const criticalImages = [
    '/photoshoot-image (11).webp',
    '/81vj9gjxRBL._AC_SL1500_.jpg',
    '/AtomraICON WHITE TRANSP.png'
  ];
  
  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

// Initialize performance monitoring
const initPerformanceMonitoring = () => {
  // Monitor Core Web Vitals
  if ('PerformanceObserver' in window) {
    // LCP Observer
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime);
    });
    
    try {
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      console.warn('LCP observer not supported');
    }
  }
  
  // Log app initialization time
  window.addEventListener('load', () => {
    const loadTime = performance.now() - startTime;
    console.log(`App initialized in ${Math.round(loadTime)}ms`);
  });
};

// Initialize app
const initApp = () => {
  preloadCriticalResources();
  initPerformanceMonitoring();
  
  const root = createRoot(document.getElementById('root')!);
  
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
};

// Start the app
initApp();
import { useEffect } from 'react';

declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
  }
}

const PerformanceMonitor = () => {
  useEffect(() => {
    // Monitor Core Web Vitals
    const observePerformance = () => {
      // Largest Contentful Paint (LCP)
      if ('PerformanceObserver' in window) {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          const lcpValue = lastEntry.startTime;
          
          console.log('LCP:', lcpValue);
          
          // Send to analytics if needed
          if (window.gtag) {
            window.gtag('event', 'web_vitals', {
              name: 'LCP',
              value: Math.round(lcpValue),
              event_category: 'Performance'
            });
          }
          
          // Performance optimization suggestions
          if (lcpValue > 2500) {
            console.warn('LCP is poor (>2.5s). Consider optimizing images and critical resources.');
          }
        });
        
        try {
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
          console.warn('LCP observer not supported');
        }

        // First Input Delay (FID)
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            const fidValue = entry.processingStart - entry.startTime;
            console.log('FID:', fidValue);
            
            if (window.gtag) {
              window.gtag('event', 'web_vitals', {
                name: 'FID',
                value: Math.round(fidValue),
                event_category: 'Performance'
              });
            }
            
            if (fidValue > 100) {
              console.warn('FID is poor (>100ms). Consider reducing JavaScript execution time.');
            }
          });
        });
        
        try {
          fidObserver.observe({ entryTypes: ['first-input'] });
        } catch (e) {
          console.warn('FID observer not supported');
        }

        // Cumulative Layout Shift (CLS)
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          
          console.log('CLS:', clsValue);
          
          if (window.gtag) {
            window.gtag('event', 'web_vitals', {
              name: 'CLS',
              value: Math.round(clsValue * 1000),
              event_category: 'Performance'
            });
          }
          
          if (clsValue > 0.1) {
            console.warn('CLS is poor (>0.1). Consider adding dimensions to images and avoiding layout shifts.');
          }
        });
        
        try {
          clsObserver.observe({ entryTypes: ['layout-shift'] });
        } catch (e) {
          console.warn('CLS observer not supported');
        }

        // First Contentful Paint (FCP)
        const fcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            const fcpValue = entry.startTime;
            console.log('FCP:', fcpValue);
            
            if (window.gtag) {
              window.gtag('event', 'web_vitals', {
                name: 'FCP',
                value: Math.round(fcpValue),
                event_category: 'Performance'
              });
            }
            
            if (fcpValue > 1800) {
              console.warn('FCP is poor (>1.8s). Consider optimizing critical rendering path.');
            }
          });
        });
        
        try {
          fcpObserver.observe({ entryTypes: ['paint'] });
        } catch (e) {
          console.warn('FCP observer not supported');
        }
      }

      // Monitor page load performance
      window.addEventListener('load', () => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        const metrics = {
          dns: navigation.domainLookupEnd - navigation.domainLookupStart,
          tcp: navigation.connectEnd - navigation.connectStart,
          ttfb: navigation.responseStart - navigation.requestStart,
          download: navigation.responseEnd - navigation.responseStart,
          domInteractive: navigation.domInteractive - navigation.navigationStart,
          domComplete: navigation.domComplete - navigation.navigationStart,
          loadComplete: navigation.loadEventEnd - navigation.navigationStart
        };
        /*
        console.log('Performance Metrics:', metrics);
        
        // Send to analytics
        if (window.gtag) {
          Object.entries(metrics).forEach(([key, value]) => {
            window.gtag!('event', 'timing_complete', {
              name: key,
              value: Math.round(value),
              event_category: 'Performance'
            });
          });
        } */
        
        // Performance warnings
        if (metrics.ttfb > 600) {
          console.warn('TTFB is slow (>600ms). Consider server optimization.');
        }
        if (metrics.loadComplete > 3000) {
          console.warn('Page load is slow (>3s). Consider optimizing resources.');
        }
      });

      // Monitor resource loading
      const resourceObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (entry.transferSize > 1000000) { // 1MB
            console.warn(`Large resource detected: ${entry.name} (${Math.round(entry.transferSize / 1024)}KB)`);
          }
        });
      });
      
      try {
        resourceObserver.observe({ entryTypes: ['resource'] });
      } catch (e) {
        console.warn('Resource observer not supported');
      }
    };

    // Run performance monitoring
    if (typeof window !== 'undefined') {
      observePerformance();
    }

    // Cleanup function
    return () => {
      // Disconnect observers if needed
    };
  }, []);

  return null;
};

export default PerformanceMonitor;
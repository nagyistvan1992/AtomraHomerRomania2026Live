import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { XCircle, ArrowLeft, ShoppingBag } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { getSiteUrl } from '../utils/siteConfig';

const CancelPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <SEOHead
        title="Payment Cancelled | Atomra Home Romania"
        description="Your payment was cancelled. You can try again or continue shopping."
        url={getSiteUrl('/cancel')}
        noindex={true}
      />
      
      <div className="luxury-page-bg luxury-floating-elements min-h-screen">
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-32 left-16 w-1 h-1 bg-slate-300/20 rounded-full animate-luxury-float"></div>
          <div className="absolute top-48 right-24 w-0.5 h-0.5 bg-slate-200/30 rounded-full animate-luxury-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-32 left-1/4 w-0.5 h-0.5 bg-slate-300/25 rounded-full animate-luxury-float" style={{ animationDelay: '4s' }}></div>
          <div className="absolute bottom-48 right-1/4 w-1 h-1 bg-slate-200/20 rounded-full animate-luxury-float" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="pt-40 sm:pt-44 md:pt-48 lg:pt-56 relative z-10">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center">
            <div className="luxury-card p-8 sm:p-12 rounded-lg">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <XCircle size={40} className="text-red-600" />
              </div>
              
              <h1 className="text-3xl font-light text-slate-900 mb-4">
                Payment Cancelled
              </h1>
              
              <p className="text-slate-600 mb-8 font-light">
                Your payment was cancelled. No charges have been made to your account.
                You can try again or continue browsing our products.
              </p>

              <div className="bg-yellow-50 p-4 rounded-lg mb-8 border border-yellow-200">
                <div className="flex items-center justify-center space-x-2 text-yellow-700">
                  <span className="font-light">
                    If you experienced any issues during checkout, please contact our support team.
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/"
                  className="bg-slate-900 text-white px-8 py-3 font-light tracking-wide uppercase hover:bg-slate-800 transition-colors duration-300 rounded flex items-center justify-center space-x-2"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  <ArrowLeft size={18} strokeWidth={1.5} />
                  <span>Back to Home</span>
                </Link>
                
                <Link
                  to="/toate-produsele"
                  className="border border-slate-300 text-slate-700 px-8 py-3 font-light tracking-wide uppercase hover:bg-slate-50 transition-colors duration-300 rounded flex items-center justify-center space-x-2"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  <ShoppingBag size={18} strokeWidth={1.5} />
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CancelPage;


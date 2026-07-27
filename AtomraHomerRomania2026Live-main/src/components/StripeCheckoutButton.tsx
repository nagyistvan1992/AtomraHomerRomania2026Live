import React from 'react';
import { useStripeCheckout } from '../hooks/useStripeCheckout';
import { motion } from 'framer-motion';

interface StripeCheckoutButtonProps {
  priceId: string;
  mode: 'payment' | 'subscription';
  productName: string;
  className?: string;
  children?: React.ReactNode;
}

export const StripeCheckoutButton: React.FC<StripeCheckoutButtonProps> = ({
  priceId,
  mode,
  productName,
  className = '',
  children,
}) => {
  const { createCheckoutSession, loading, error } = useStripeCheckout();

  const handleCheckout = () => {
    console.log(`Initiating Stripe checkout for ${productName} with price ID: ${priceId}`);
    
    createCheckoutSession({
      priceId,
      mode,
    });
  };

  return (
    <div className="relative">
      <motion.button
        onClick={handleCheckout}
        disabled={loading}
        whileTap={{ scale: 0.97 }}
        className={`inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-light rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ${className}`}
      >
        {loading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </>
        ) : (
          children || `Buy Now - ${productName}`
        )}
      </motion.button>
      
      {error && (
        <div className="mt-2 text-sm text-red-600 bg-red-50 p-3 rounded border border-red-100">
          {error}
        </div>
      )}
    </div>
  );
};

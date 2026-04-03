import React, { useState } from 'react';
import { useStripeCheckout } from '../hooks/useStripeCheckout';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
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
  const { state: authState } = useAuth();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!authState.isAuthenticated) {
      setShowLoginPrompt(true);
      console.log('User not authenticated, showing login prompt');
      return;
    }
    
    console.log(`Initiating Stripe checkout for ${productName} with price ID: ${priceId}`);
    
    createCheckoutSession({
      priceId,
      mode,
    });
  };

  const handleLoginRedirect = () => {
    // Store the product info in session storage to redirect back after login
    sessionStorage.setItem('pendingCheckout', JSON.stringify({
      priceId: priceId,
      mode: mode,
      productName: productName
    }));
    
    console.log('Storing pending checkout in session storage:', priceId);
    
    // Navigate to member page
    navigate('/member');
    setShowLoginPrompt(false);
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
      
      {showLoginPrompt && (
        <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-white rounded-md shadow-lg border border-gray-200 z-10 animate-fade-in">
          <p className="text-sm text-gray-700 mb-3 font-light">
            {authState.isAuthenticated 
              ? 'Your session has expired. Please sign in again to complete your purchase.' 
              : 'Please sign in to complete your purchase.'}
          </p>
          <div className="flex space-x-2">
            <Link
              onClick={handleLoginRedirect}
              to="#"
              className="flex-1 px-4 py-2 bg-gray-900 text-white text-center text-sm rounded-md hover:bg-gray-800 transition-colors"
            >
              Sign In
            </Link>
            <button
              onClick={() => setShowLoginPrompt(false)}
              className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
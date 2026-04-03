import React, { createContext, useContext, ReactNode } from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';

// Get Stripe publishable key from environment variables
const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '';

// Log Stripe key status for debugging
console.log('Stripe key status:', STRIPE_PUBLISHABLE_KEY ? 'Available' : 'Not available');

// Initialize Stripe with the key only when it is configured
let stripePromise: Promise<Stripe | null>;
try {
  stripePromise = STRIPE_PUBLISHABLE_KEY
    ? loadStripe(STRIPE_PUBLISHABLE_KEY)
    : Promise.resolve(null);
  console.log(STRIPE_PUBLISHABLE_KEY ? 'Stripe initialized successfully' : 'Stripe is disabled: missing publishable key');
} catch (error) {
  console.error('Error initializing Stripe:', error);
  stripePromise = Promise.resolve(null);
}

interface StripeContextType {
  stripePromise: Promise<Stripe | null> | null;
  isStripeEnabled: boolean;
}

const StripeContext = createContext<StripeContextType | undefined>(undefined);

export const useStripe = () => {
  const context = useContext(StripeContext);
  if (!context) {
    throw new Error('useStripe must be used within a StripeProvider');
  }
  return context;
};

interface StripeProviderProps {
  children: ReactNode;
}

export const StripeProvider: React.FC<StripeProviderProps> = ({ children }) => {
  const value: StripeContextType = {
    stripePromise: stripePromise,
    isStripeEnabled: !!STRIPE_PUBLISHABLE_KEY && (STRIPE_PUBLISHABLE_KEY.startsWith('pk_live_') || STRIPE_PUBLISHABLE_KEY.startsWith('pk_test_'))
  };

  return (
    <StripeContext.Provider value={value}>
      {children}
    </StripeContext.Provider>
  );
};

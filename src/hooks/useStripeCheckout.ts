import { useState } from 'react';
import { supabase } from '../lib/supabase';

interface CheckoutOptions {
  priceId: string;
  mode?: 'payment' | 'subscription';
  successUrl?: string;
  cancelUrl?: string;
}

export const useStripeCheckout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); 

  const createCheckoutSession = async (options: CheckoutOptions) => {
    setLoading(true);
    setError(null);

    try {
      const { priceId, mode = 'payment', successUrl, cancelUrl } = options;
      
      if (!priceId) {
        throw new Error('Product price ID is required');
      }
      
      const defaultSuccessUrl = `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`;
      const defaultCancelUrl = `${window.location.origin}/cancel`;

      console.log('Creating checkout session for price ID:', priceId);

      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        console.warn('Unable to read Supabase session, continuing as guest checkout:', sessionError.message);
      }
      const accessToken = sessionData?.session?.access_token;
      
      const { data: checkoutData, error: checkoutError } = await supabase.functions.invoke('stripe-checkout', {
        body: {
          price_id: priceId,
          mode,
          success_url: successUrl || defaultSuccessUrl,
          cancel_url: cancelUrl || defaultCancelUrl,
        },
        ...(accessToken
          ? {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          : {}),
      });

      if (checkoutError) {
        console.error('Checkout function error:', checkoutError.message || checkoutError);
        throw new Error(`Payment processing error: ${checkoutError.message || 'Unknown error'}`);
      }

      if (checkoutData?.url) {
        console.log('Redirecting to checkout URL:', checkoutData.url);
        window.location.href = checkoutData.url;
      } else {
        throw new Error('No checkout URL received from Stripe');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      
      // Format error message for better user experience
      let errorMessage = 'Failed to create checkout session';
      
      if (error instanceof Error) {
        errorMessage = error.message;
        
        // Clean up common Stripe error messages
        if (errorMessage.includes('authentication')) {
          errorMessage = 'Authentication failed while preparing checkout.';
        } else if (errorMessage.includes('price_id')) {
          errorMessage = 'Invalid product selected. Please try again.';
        }
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    createCheckoutSession,
    loading,
    error,
  };
};

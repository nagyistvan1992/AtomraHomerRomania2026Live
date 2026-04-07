import React, { useState } from 'react';
import { CardElement, useStripe as useStripeElements, useElements } from '@stripe/react-stripe-js';
import { CreditCard, Lock, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { supabase } from '../lib/supabase';

interface OrderItem {
  id: string | number;
  name: string;
  price: string;
  quantity: number;
  image: string;
  category: string;
}

interface CheckoutFormProps {
  onSuccess: () => void;
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
  };
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSuccess, customerInfo }) => {
  const stripe = useStripeElements();
  const elements = useElements();
  const { state, getTotalPrice, clearCart } = useCart();
  const { t } = useLanguage();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate totals
  const subtotal = getTotalPrice();
  const shipping = subtotal >= 149 ? 0 : 25;
  const finalTotal = subtotal + shipping;

  const getErrorMessage = (error: unknown, fallback: string) => {
    return error instanceof Error ? error.message : fallback;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setError('Stripe not loaded. Please refresh the page and try again.');
      return;
    }

    setIsProcessing(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setError('Card element not found');
      setIsProcessing(false);
      return;
    }

    try {
      // Format items for the API
      const formattedItems: OrderItem[] = state.items.map(item => ({
        ...item,
        price: item.price.toString()
      }));

      // Show processing state
      setIsProcessing(true);
      setError(null);
      
      console.log('Processing payment with Stripe...');

      try {
        // Create payment method
        const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
          billing_details: {
            name: `${customerInfo.firstName} ${customerInfo.lastName}`,
            email: customerInfo.email,
            phone: customerInfo.phone,
            address: {
              line1: customerInfo.address,
              city: customerInfo.city,
              postal_code: customerInfo.postalCode,
              country: 'RO',
            },
          },
        });

        if (paymentMethodError) {
          console.error('Payment method error:', paymentMethodError);
          throw new Error(paymentMethodError.message || 'Payment method creation failed');
        }

        console.log('Payment method created successfully:', paymentMethod.id);

        // Create payment intent via Supabase Edge Function
        const { data, error: functionError } = await supabase.functions.invoke('create-payment-intent', {
          body: {
            amount: Math.round(finalTotal * 100), // Convert to cents
            currency: 'ron',
            paymentMethodId: paymentMethod.id,
            customerInfo,
            items: formattedItems,
          },
        });

        if (functionError) {
          console.error('Payment intent function error:', functionError);
          throw new Error(`Payment processing failed: ${functionError.message || 'Please try again'}`);
        }

        if (data.error) {
          console.error('Payment intent data error:', data.error);
          throw new Error(data.error);
        }

        console.log('Payment intent created successfully:', data.client_secret);

        // Confirm payment
        const { error: confirmError } = await stripe.confirmCardPayment(data.client_secret);

        if (confirmError) {
          console.error('Payment confirmation error:', confirmError);
          throw new Error(confirmError.message || 'Payment confirmation failed');
        }

        console.log('Payment confirmed successfully');

        // Payment successful
        clearCart();
        onSuccess();
      } catch (err) {
        console.error('Payment error:', err);
        
        // Format user-friendly error message
        let errorMessage = 'An unexpected error occurred. Please try again.';
        
        if (err && typeof err === 'object' && 'type' in err && (err.type === 'card_error' || err.type === 'validation_error')) {
          errorMessage = getErrorMessage(err, errorMessage);
        } else if (err instanceof Error) {
          errorMessage = err.message;
        }
        
        setError(errorMessage);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError(getErrorMessage(err, 'An unexpected error occurred. Please try again.'));
    } finally {
      setIsProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#374151',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontWeight: '300',
        '::placeholder': {
          color: '#9CA3AF',
        },
        iconColor: '#374151',
      },
      invalid: {
        color: '#EF4444',
        iconColor: '#EF4444',
      },
    },
    hidePostalCode: true,
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Payment Method Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full">
          <CreditCard size={20} className="text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-light text-slate-900">{t('checkout.paymentInfo')}</h3>
          <p className="text-sm text-slate-500 font-light">Secure payment powered by Stripe</p>
        </div>
      </div>

      {/* Card Element */}
      <div className="border border-gray-200 rounded-lg p-4 focus-within:ring-2 focus-within:ring-blue-400 focus-within:border-transparent">
        <CardElement options={cardElementOptions} />
      </div>
      
      {/* Test Card Info */}
      <div className="text-xs text-gray-500 mt-1">
        <p>Test card: 4242 4242 4242 4242 | Exp: Any future date | CVC: Any 3 digits</p>
      </div>

      {/* Security Notice */}
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <Lock size={16} strokeWidth={1.5} />
        <span className="font-light">Your payment information is encrypted and secure</span>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
          <AlertCircle size={18} className="text-red-500 mt-0.5 mr-2 flex-shrink-0" />
          <p className="text-red-600 text-sm font-light">{error}</p>
        </div>
      )}

      {/* Order Summary */}
      <div className="bg-gray-50 rounded-lg p-6 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="font-light">Subtotal</span>
          <span className="font-light">{subtotal.toFixed(0)} Lei</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-light">Shipping</span>
          <span className="font-light">{shipping === 0 ? 'Free' : `${shipping} Lei`}</span>
        </div>
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between text-lg">
            <span className="font-light">Total</span>
            <span className="font-light">{finalTotal.toFixed(0)} Lei</span>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-blue-600 text-white py-4 font-light tracking-wide uppercase hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        {isProcessing ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>Processing...</span>
          </>
        ) : (
          <>
            <Shield size={18} strokeWidth={1.5} />
            <span className="text-sm sm:text-base">Complete Secure Payment - {finalTotal.toFixed(0)} Lei</span>
          </>
        )}
      </button>

      {/* Trust Indicators */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500 pt-4">
        <div className="flex items-center space-x-1">
          <Shield size={14} strokeWidth={1.5} />
          <span>SSL Encrypted</span>
        </div>
        <div className="flex items-center space-x-1">
          <CheckCircle size={14} strokeWidth={1.5} />
          <span>PCI Compliant</span>
        </div>
        <div className="flex items-center space-x-1">
          <Lock size={14} strokeWidth={1.5} />
          <span>Secure Checkout</span>
        </div>
      </div>
    </form>
  );
};

interface StripeCheckoutProps {
  onSuccess: () => void;
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
  };
}

const StripeCheckout: React.FC<StripeCheckoutProps> = ({ onSuccess, customerInfo }) => {
  // Just pass through the props to the inner component
  return (
    <CheckoutForm onSuccess={onSuccess} customerInfo={customerInfo} />
  );
};

export default StripeCheckout;

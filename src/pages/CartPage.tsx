import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext'; 
import { useStripe } from '../context/StripeContext';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import SEOHead from '../components/SEOHead';
import { ShoppingCart, Plus, Minus, CreditCard, Truck, ArrowLeft, ArrowRight, Check, ShieldCheck, User, Trash2, Lock, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAssetPath } from '../utils/assetPath';
import { getPlaceholderImage, normalizeImageSource } from '../utils/imageSources';

const CartPage = () => {
  const { state, removeItem, updateQuantity, clearCart, closeCart, getTotalPrice } = useCart();
  const { t } = useLanguage();
  const { isStripeEnabled } = useStripe();
  const navigate = useNavigate();
  
  const [step, setStep] = useState<'cart' | 'details' | 'payment' | 'confirmation'>('cart');
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: ''
  });
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card'>('cod');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const supabaseFunctionsBaseUrl = isSupabaseConfigured ? `${import.meta.env.VITE_SUPABASE_URL}/functions/v1` : '';
  const stripeSuccessUrl = `${window.location.origin}/#/success?session_id={CHECKOUT_SESSION_ID}`;
  const stripeCancelUrl = `${window.location.origin}/#/cancel`;

  const shippingCost = getTotalPrice() >= 149 ? 0 : 25;
  const totalAmount = getTotalPrice() + shippingCost;
  
  // Close the cart drawer when CartPage mounts
  useEffect(() => {
    closeCart();
  }, [closeCart]);

  const generateOrderNumber = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `ORD-${timestamp}-${random}`;
  };

  const withTimeout = async <T,>(promise: Promise<T>, timeoutMs: number, message: string): Promise<T> => {
    return Promise.race([
      promise,
      new Promise<T>((_, reject) => {
        window.setTimeout(() => reject(new Error(message)), timeoutMs);
      }),
    ]);
  };

  const sanitizeCustomerDetails = () => ({
    name: customerDetails.name.trim(),
    email: customerDetails.email.trim(),
    phone: customerDetails.phone.trim(),
    address: customerDetails.address.trim(),
    city: customerDetails.city.trim(),
    postalCode: customerDetails.postalCode.trim(),
  });

  const sanitizeOrderItems = () =>
    state.items.map((item) => ({
      id: String(item.id),
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: item.quantity,
      category: item.category,
    }));

  const requestStripeCheckoutUrl = async (payload: {
    price_id: string;
    mode: 'payment' | 'subscription';
    success_url: string;
    cancel_url: string;
    customer_email: string;
  }) => {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 12000);

    try {
      const response = await fetch(`${supabaseFunctionsBaseUrl}/stripe-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      const rawBody = await response.text();
      const parsedBody = rawBody ? JSON.parse(rawBody) : null;

      if (!response.ok) {
        throw new Error(parsedBody?.error || parsedBody?.message || 'Failed to create checkout session');
      }

      if (!parsedBody?.url) {
        throw new Error('No checkout URL returned from Stripe');
      }

      return parsedBody.url as string;
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        throw new Error('Stripe checkout request timed out. Please try again.');
      }

      throw error;
    } finally {
      window.clearTimeout(timeoutId);
    }
  };

  const sendOrderEmailsInBackground = (orderNum: string) => {
    const details = sanitizeCustomerDetails();
    const emailPayload = {
      orderData: {
        orderId: orderNum,
        orderNumber: orderNum,
        customerName: details.name,
        customerEmail: details.email,
        customerPhone: details.phone,
        customerAddress: `${details.address}, ${details.city}, ${details.postalCode}`,
        items: sanitizeOrderItems().map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        total: totalAmount,
        paymentMethod: paymentMethod,
        orderDate: new Date().toISOString()
      }
    };

    const emailRequest = supabase.functions.invoke('send-order-emails', {
      body: emailPayload
    });

    const timeoutRequest = new Promise<never>((_, reject) => {
      window.setTimeout(() => reject(new Error('Email request timed out')), 8000);
    });

    void Promise.race([emailRequest, timeoutRequest])
      .then(({ data: emailData, error: emailError }) => {
        if (emailError) {
          console.error('Error invoking send-order-emails function:', emailError);
          return;
        }

        if (emailData && !emailData.success) {
          console.warn('Email function reported non-success:', emailData.error || emailData.message);
          return;
        }

        console.log('Email function invoked successfully.');
      })
      .catch((invokeError) => {
        console.error('Unexpected error during email function invocation:', invokeError);
      });
  };

  const handleCheckout = async () => {
    if (paymentMethod === 'cod') {
      await processOrder();
    } else {
      await processStripePayment();
    }
  };

  const processOrder = async () => {
    setLoading(true);
    try {
      if (!isSupabaseConfigured) {
        throw new Error('Supabase is not configured for order processing.');
      }

      const details = sanitizeCustomerDetails();
      const orderNum = generateOrderNumber();
      const orderData = {
        order_number: orderNum,
        customer_name: details.name,
        customer_email: details.email,
        customer_phone: details.phone,
        customer_address: details.address,
        customer_city: details.city,
        customer_postal_code: details.postalCode,
        items: sanitizeOrderItems(),
        subtotal: getTotalPrice(),
        shipping_cost: shippingCost,
        total_amount: totalAmount,
        payment_method: paymentMethod,
        payment_status: paymentMethod === 'cod' ? 'pending' : 'paid',
        order_status: 'pending',
        notes: notes || null
      };

      const { error } = await withTimeout(
        supabase.from('orders').insert([orderData]),
        12000,
        'Order creation timed out. Please try again.'
      );
      
      if (error) throw error;
      setOrderNumber(orderNum);
      clearCart();
      sendOrderEmailsInBackground(orderNum);
      navigate(`/success?order_number=${encodeURIComponent(orderNum)}&payment_method=${encodeURIComponent(paymentMethod)}`);
      return;
    } catch (error) {
      console.error('Error creating order:', error);
      alert(t('cart.error.orderFailed'));
    } finally {
      setLoading(false);
    }
  };

  const processStripePayment = async () => {
    setLoading(true);
    try {
      if (!isSupabaseConfigured || !supabaseFunctionsBaseUrl || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        throw new Error('Stripe checkout is not configured. Add the GitHub Actions Supabase and Stripe secrets first.');
      }
      const details = sanitizeCustomerDetails();

      // Import the stripe config to get product price IDs 
      const { stripeProducts, getProductById } = await import('../stripe-config');
      
      if (state.items.length === 0) {
        throw new Error('Cart is empty');
      }

      // Find Stripe products for cart items by matching slugs
      const cartItemsWithStripe = state.items.map(item => {
        // Extract the product slug from the item ID (if it's a string)
        const productId = typeof item.id === 'string' ? item.id : item.id.toString();
        
        // Look up the Stripe product by ID (slug)
        const stripeProduct = getProductById(productId);
        
        return {
          cartItem: item,
          stripeProduct
        };
      });

      // Check if we found matching Stripe products for all items
      const missingProducts = cartItemsWithStripe.filter(item => !item.stripeProduct);
      if (missingProducts.length > 0) {
        console.warn('Some products are not configured for Stripe checkout:', 
          missingProducts.map(item => item.cartItem.name));
        
        // For now, we'll fall back to the first product in the Stripe config
        // This ensures we maintain backward compatibility
        const fallbackProduct = stripeProducts[0];
        if (!fallbackProduct) {
          throw new Error('No Stripe products configured');
        }

        console.log('Using fallback product for checkout:', fallbackProduct.name);

        const checkoutUrl = await requestStripeCheckoutUrl({
          price_id: fallbackProduct.priceId,
          mode: 'payment',
          success_url: stripeSuccessUrl,
          cancel_url: stripeCancelUrl,
          customer_email: details.email,
        });

        window.location.href = checkoutUrl;
        return;
      }
      
      // Find the first item with a matching Stripe product
      const firstMatchingItem = cartItemsWithStripe.find(item => item.stripeProduct);
      
      if (firstMatchingItem) {
        const { stripeProduct } = firstMatchingItem;

        const checkoutUrl = await requestStripeCheckoutUrl({
          price_id: stripeProduct.priceId,
          mode: stripeProduct.mode || 'payment',
          success_url: stripeSuccessUrl,
          cancel_url: stripeCancelUrl,
          customer_email: details.email,
        });

        window.location.href = checkoutUrl;
      } else {
        throw new Error('No matching Stripe products found for items in cart');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      alert(`Error processing payment: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  // If no items in cart, redirect to home
  useEffect(() => {
    if (state.items.length === 0 && step !== 'confirmation') {
      setStep('cart');
    }
  }, [state.items.length, step]);

  const renderCartStep = () => {
    const cartItems = state.items;
    
    if (state.items.length === 0) {
      return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="text-center py-12 sm:py-16">
            <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-12 h-12 text-amber-600" strokeWidth={1.5} />
            </div>
            <h2 className="text-2xl sm:text-3xl font-light text-slate-900 mb-3">Coșul tău este gol</h2>
            <p className="text-slate-600 font-light mb-8 max-w-md mx-auto">Adaugă produse în coș pentru a continua procesul de cumpărare</p>
            <Link
              to="/toate-produsele"
              className="inline-block bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-md font-light transition-all duration-300 tracking-wide"
            >
              Continuă cumpărăturile
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div className="flex items-center">
            <ShoppingCart className="w-7 h-7 text-slate-700 mr-3" strokeWidth={1.5} />
            <h1 className="text-2xl sm:text-3xl font-light text-slate-900">Coșul meu</h1>
          </div>
          
          <div className="text-sm text-slate-600">
            {cartItems.length} {cartItems.length === 1 ? 'produs' : 'produse'} în coș
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6 border border-slate-100">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-slate-50/50 border border-slate-100 rounded-lg hover:shadow-sm transition-shadow duration-200">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <img
                      src={normalizeImageSource(item.image) || getPlaceholderImage()}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-md shadow-sm"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = getPlaceholderImage();
                      }}
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-light text-slate-800 mb-1 text-sm sm:text-base line-clamp-2">{item.name}</h3>
                    <p className="text-slate-600 text-sm">{item.price}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-4 sm:mt-0">
                  <div className="flex items-center bg-white rounded-full border border-slate-200 shadow-sm">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-10 h-10 rounded-full hover:bg-slate-50 flex items-center justify-center text-slate-600 transition-colors"
                      aria-label="Reduce quantity"
                    >
                      <Minus className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                    
                    <span className="w-10 text-center font-light text-slate-800">
                      {item.quantity}
                    </span>
                    
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-10 h-10 rounded-full hover:bg-slate-50 flex items-center justify-center text-slate-600 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                  </div>
                  
                  <button
                    onClick={() => removeItem(item.id)}
                    className="ml-4 p-2 hover:bg-red-50 text-red-500 rounded-full transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-5 h-5" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-100">
          <h2 className="text-xl font-light text-slate-900 mb-6 pb-2 border-b border-slate-100">Rezumatul comenzii</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center text-slate-600">
              <span className="font-light">Subtotal:</span>
              <span className="font-light">{getTotalPrice().toFixed(0)} Lei</span>
            </div>
            
            <div className="flex justify-between items-center text-slate-600">
              <span className="font-light">Transport:</span>
              <span className="font-light">
                {shippingCost === 0 ? (
                  <span className="text-green-600">Gratuit</span>
                ) : (
                  `${shippingCost} Lei`
                )}
              </span>
            </div>
            
            {shippingCost > 0 && (
              <div className="text-xs text-amber-600 font-light bg-amber-50 p-3 rounded-lg border border-amber-100">
                <Truck size={14} className="inline mr-1" strokeWidth={1.5} />
                Transport gratuit pentru comenzi peste 149 Lei
              </div>
            )}
            
            <div className="border-t border-slate-100 pt-4 mt-4">
              <div className="flex justify-between text-lg text-slate-900">
                <span>Total:</span>
                <span className="font-medium">{totalAmount.toFixed(0)} Lei</span>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => setStep('details')}
            className="w-full mt-6 bg-slate-900 text-white py-3 sm:py-4 rounded-md font-light tracking-wide uppercase hover:bg-slate-800 transition-colors duration-300 flex items-center justify-center space-x-2"
          >
            <span>Continuă către finalizare</span>
            <ArrowRight size={16} strokeWidth={1.5} />
          </button>
          
          <div className="mt-4 text-center">
            <Link
              to="/toate-produsele"
              className="text-sm text-slate-600 hover:text-slate-900 font-light underline"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Continuă cumpărăturile
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const renderDetailsStep = () => {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="flex items-center mb-6 sm:mb-8">
          <button
            onClick={() => setStep('cart')}
            className="mr-4 p-2 rounded-full hover:bg-slate-100 transition-colors"
            aria-label="Înapoi la coș"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" strokeWidth={1.5} />
          </button>
          <h1 className="text-2xl sm:text-3xl font-light text-slate-900">Detalii de livrare</h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-100">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Nume complet *
              </label>
              <input
                type="text"
                value={customerDetails.name}
                onChange={(e) => setCustomerDetails({...customerDetails, name: e.target.value})}
                className="w-full px-4 py-3 border border-slate-200 rounded-md focus:ring-1 focus:ring-slate-400 focus:border-slate-400 font-light text-slate-800"
                required
                placeholder="Numele și prenumele"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                value={customerDetails.email}
                onChange={(e) => setCustomerDetails({...customerDetails, email: e.target.value})}
                className="w-full px-4 py-3 border border-slate-200 rounded-md focus:ring-1 focus:ring-slate-400 focus:border-slate-400 font-light text-slate-800"
                required
                placeholder="Adresa de email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Telefon *
              </label>
              <input
                type="tel"
                value={customerDetails.phone}
                onChange={(e) => setCustomerDetails({...customerDetails, phone: e.target.value})}
                className="w-full px-4 py-3 border border-slate-200 rounded-md focus:ring-1 focus:ring-slate-400 focus:border-slate-400 font-light text-slate-800"
                required
                placeholder="Numărul de telefon"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Adresa *
              </label>
              <input
                type="text"
                value={customerDetails.address}
                onChange={(e) => setCustomerDetails({...customerDetails, address: e.target.value})}
                className="w-full px-4 py-3 border border-slate-200 rounded-md focus:ring-1 focus:ring-slate-400 focus:border-slate-400 font-light text-slate-800"
                required
                placeholder="Strada, numărul, blocul, apartamentul"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Oraș *
                </label>
                <input
                  type="text"
                  value={customerDetails.city}
                  onChange={(e) => setCustomerDetails({...customerDetails, city: e.target.value})}
                  className="w-full px-4 py-3 border border-slate-200 rounded-md focus:ring-1 focus:ring-slate-400 focus:border-slate-400 font-light text-slate-800"
                  required
                  placeholder="Orașul"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Cod poștal *
                </label>
                <input
                  type="text"
                  value={customerDetails.postalCode}
                  onChange={(e) => setCustomerDetails({...customerDetails, postalCode: e.target.value})}
                  className="w-full px-4 py-3 border border-slate-200 rounded-md focus:ring-1 focus:ring-slate-400 focus:border-slate-400 font-light text-slate-800"
                  required
                  placeholder="Codul poștal"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Notițe pentru comandă (opțional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-slate-200 rounded-md focus:ring-1 focus:ring-slate-400 focus:border-slate-400 font-light text-slate-800"
                placeholder="Instrucțiuni speciale de livrare..."
              />
            </div>
          </form>

          <div className="flex items-center space-x-2 mt-6 p-4 bg-blue-50 rounded-md border border-blue-100 text-blue-800">
            <User size={18} className="flex-shrink-0" strokeWidth={1.5} />
            <p className="text-sm font-light">
              Datele tale sunt securizate și utilizate doar pentru livrarea comenzii
            </p>
          </div>

          <button
            onClick={() => {
              if (customerDetails.name && customerDetails.email && customerDetails.phone && 
                  customerDetails.address && customerDetails.city && customerDetails.postalCode) {
                setStep('payment');
              } else {
                alert("Te rugăm să completezi toate câmpurile obligatorii marcate cu *");
              }
            }}
            disabled={!customerDetails.name || !customerDetails.email || !customerDetails.phone || !customerDetails.address || !customerDetails.city || !customerDetails.postalCode}
            className="w-full mt-6 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-3 sm:py-4 rounded-md font-light tracking-wide uppercase transition-colors duration-300 flex items-center justify-center space-x-2"
          >
            <span>Continuă către plată</span>
            <ArrowRight size={16} strokeWidth={1.5} />
          </button>
          
          <div className="mt-4">
            <button
              onClick={() => setStep('cart')}
              className="w-full text-center py-2 text-slate-600 hover:text-slate-900 font-light transition-colors"
            >
              Înapoi la coș
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderPaymentStep = () => {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="flex items-center mb-6 sm:mb-8">
          <button
            onClick={() => setStep('details')}
            className="mr-4 p-2 rounded-full hover:bg-slate-100 transition-colors"
            aria-label="Înapoi la detalii"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" strokeWidth={1.5} />
          </button>
          <h1 className="text-2xl sm:text-3xl font-light text-slate-900">Metoda de plată</h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-100 mb-6">
          <h2 className="text-lg font-medium text-slate-900 mb-4 pb-2 border-b border-slate-100">Alege metoda de plată</h2>
          <div className="space-y-6 mt-4">
            <div>
              <label className={`flex items-center p-5 border ${paymentMethod === 'cod' ? 'border-slate-400 bg-slate-50/70' : 'border-slate-200'} rounded-lg cursor-pointer hover:bg-slate-50 transition-all duration-300 relative group shadow-sm hover:shadow-md`}>
                <input 
                  type="radio" 
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={(e) => setPaymentMethod(e.target.value as 'cod' | 'card')}
                  className="mr-4 h-6 w-6 text-blue-700 focus:ring-blue-500 border-slate-300 transform scale-110"
                />
                <div className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 bg-blue-50 rounded-full mr-2 sm:mr-4 flex items-center justify-center border border-blue-100 shadow-sm group-hover:shadow-md transition-all duration-300">
                  <Truck className="w-7 h-7 text-blue-600" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-slate-800 text-base sm:text-xl truncate">Plata la livrare (Ramburs)</div>
                  <div className="text-sm sm:text-base text-slate-600 font-light mt-1 line-clamp-2 sm:line-clamp-none">Plătești cash sau cu cardul când primești produsele</div>
                </div>
                
                {paymentMethod === 'cod' && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 300, 
                      damping: 20
                    }}
                    className="absolute -right-3 -top-3 transform scale-100 group-hover:scale-110 transition-transform duration-300"
                  >
                    <div className="w-8 h-8 sm:w-9 sm:h-9 bg-green-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 border border-green-100">
                      <Check size={18} className="text-white" />
                    </div>
                  </motion.div>
                )}
              </label>
            </div>

            <div>
              <label className={`flex items-center p-5 border ${paymentMethod === 'card' ? 'border-slate-400 bg-slate-50/70' : 'border-slate-200'} rounded-lg cursor-pointer hover:bg-slate-50 transition-all duration-300 relative group shadow-sm hover:shadow-md ${!isStripeEnabled ? 'opacity-50' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value as 'cod' | 'card')}
                  className="mr-4 h-6 w-6 text-purple-700 focus:ring-purple-500 border-slate-300 transform scale-110"
                  disabled={!isStripeEnabled}
                />
                <div className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 bg-purple-50 rounded-full mr-2 sm:mr-4 flex items-center justify-center border border-purple-100 shadow-sm group-hover:shadow-md transition-all duration-300">
                  <CreditCard className="w-7 h-7 text-purple-600" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-slate-800 text-base sm:text-xl truncate">Plata cu cardul online</div>
                  <div className="text-sm sm:text-base text-slate-600 font-light mt-1 line-clamp-2 sm:line-clamp-none">Plată securizată prin Stripe</div>
                  
                  {/* Payment method icons */}
                  <div className="flex items-center mt-2 sm:mt-4 space-x-2 sm:space-x-4">
                    <img src={getAssetPath('/visa-card.png')} alt="Visa" className="h-6 sm:h-8 shadow-md rounded transform group-hover:scale-105 transition-transform duration-300" />
                    <img src={getAssetPath('/mastercard.png')} alt="Mastercard" className="h-6 sm:h-8 shadow-md rounded transform group-hover:scale-105 transition-transform duration-300" />
                  </div>
                </div>
                
                {paymentMethod === 'card' && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 300, 
                      damping: 20
                    }}
                    className="absolute -right-3 -top-3 transform scale-100 group-hover:scale-110 transition-transform duration-300"
                  >
                    <div className="w-8 h-8 sm:w-9 sm:h-9 bg-green-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 border border-green-100">
                      <Check size={18} className="text-white" />
                    </div>
                  </motion.div>
                )}
              </label>
            </div>
          </div>
          
          {!isStripeEnabled && (
            <div className="mt-6 p-5 bg-amber-50 rounded-lg border border-amber-200 flex items-start shadow-sm">
              <AlertCircle size={20} className="text-amber-600 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-base text-amber-700 font-light">
                Plata cu cardul online este temporar indisponibilă. Te rugăm să folosești opțiunea "Plata la livrare".
              </p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-100">
          <h3 className="text-lg font-light text-slate-900 mb-4 pb-2 border-b border-slate-100">Rezumatul comenzii</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Subtotal:</span>
              <span className="font-light text-slate-800">{getTotalPrice().toFixed(0)} Lei</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Transport:</span>
              <span className="font-light text-slate-800">
                {shippingCost === 0 ? (
                  <span className="text-green-600">Gratuit</span>
                ) : (
                  `${shippingCost} Lei`
                )}
              </span>
            </div>
            <div className="border-t border-slate-100 pt-3 mt-3">
              <div className="flex justify-between items-center">
                <span className="text-base font-medium text-slate-900">Total:</span>
                <span className="text-xl font-medium text-slate-900">{totalAmount.toFixed(0)} Lei</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-slate-50 rounded-md border border-slate-200">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-6 h-6 text-green-700" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-base font-medium text-slate-800">Comandă sigură și securizată</p>
                <p className="text-xs text-slate-600 mt-1 font-light">
                  Toate datele tale sunt criptate și procesate în siguranță. Niciodată nu stocăm informații despre cardul tău de credit.
                </p>
                <div className="flex items-center mt-2 space-x-2">
                  <div className="px-2 py-1 bg-white rounded border border-slate-200 shadow-sm flex items-center">
                    <Lock size={12} className="text-slate-500 mr-1" strokeWidth={1.5} />
                    <span className="text-xs text-slate-600">SSL Securizat</span>
                  </div>
                  <div className="px-2 py-1 bg-white rounded border border-slate-200 shadow-sm flex items-center">
                    <Check size={12} className="text-slate-500 mr-1" strokeWidth={1.5} />
                    <span className="text-xs text-slate-600">Plată verificată</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full mt-6 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-3 sm:py-4 rounded-md font-light tracking-wide uppercase transition-colors duration-300 flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                <span>Se procesează...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-5 h-5" strokeWidth={1.5} />
                <span>Finalizează comanda - {totalAmount.toFixed(0)} Lei</span>
              </>
            )}
          </button>
          
          <div className="mt-4">
            <button
              onClick={() => setStep('details')}
              className="w-full text-center py-2 text-slate-600 hover:text-slate-900 font-light transition-colors"
            >
              Înapoi la detalii de livrare
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderConfirmationStep = () => {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 text-center border border-slate-100">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center"
          >
            <Check className="w-10 h-10 text-green-600" strokeWidth={1.5} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <h1 className="text-2xl sm:text-3xl font-light text-slate-900 mb-3">Mulțumim pentru comandă!</h1>
            <p className="text-slate-600 font-light mb-6 max-w-md mx-auto">
              Comanda ta a fost plasată cu succes. Vei primi în curând un email de confirmare cu detaliile comenzii.
            </p>
          </motion.div>
          
          <div className="bg-slate-50 rounded-lg p-4 mb-6 border border-slate-100">
            <p className="text-sm text-slate-600 mb-1 font-light">Numărul comenzii:</p>
            <p className="text-xl font-medium text-slate-900">{orderNumber}</p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-left mb-8 p-4 bg-slate-50 rounded-lg border border-slate-100"
          >
            <h3 className="font-medium text-slate-800 mb-3 pb-1 border-b border-slate-100">Detalii de livrare:</h3>
            <div className="text-sm text-slate-600 space-y-2 font-light">
              <div className="flex items-center">
                <User size={14} className="mr-2 flex-shrink-0" strokeWidth={1.5} />
                <p>{customerDetails.name}</p>
              </div>
              <p><span className="text-slate-500">Email:</span> {customerDetails.email}</p>
              <p><span className="text-slate-500">Telefon:</span> {customerDetails.phone}</p>
              <p><span className="text-slate-500">Adresa:</span> {customerDetails.address}</p>
              <p><span className="text-slate-500">Oraș:</span> {customerDetails.city}, {customerDetails.postalCode}</p>
              <p><span className="text-slate-500">Metoda de plată:</span> {paymentMethod === 'cod' ? 'Plata la livrare' : 'Card'}</p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="space-y-4"
          >
            <Link
              to="/toate-produsele"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 sm:py-4 rounded-md font-light tracking-wide uppercase transition-colors duration-300 flex items-center justify-center space-x-2"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Continuă cumpărăturile
            </Link>
            
            <Link
              to="/"
              className="w-full border border-slate-200 hover:bg-slate-50 text-slate-700 py-3 rounded-md font-light transition-colors flex items-center justify-center"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Înapoi la pagina principală
            </Link>
            
          </motion.div>
        </div>
      </div>
    );
  };
  
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <SEOHead
          title="Coșul meu | Atomra Home Romania"
          description="Finalizează comanda ta de lumânări din ceară naturală Atomra. Livrare rapidă și transport gratuit peste 149 Lei."
          url="https://atomrahomeromania.ro/cart"
          noindex={true}
        />
      
        <div className="min-h-screen bg-slate-50 pt-32 sm:pt-36 md:pt-40 lg:pt-44">
          <AnimatePresence mode="wait">
            {step === 'cart' && (
              <motion.div
                key="cart"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                {renderCartStep()}
              </motion.div>
            )}
            
            {step === 'details' && (
              <motion.div
                key="details"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                {renderDetailsStep()}
              </motion.div>
            )}
            
            {step === 'payment' && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                {renderPaymentStep()}
              </motion.div>
            )}
            
            {step === 'confirmation' && (
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {renderConfirmationStep()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
};

export default CartPage;


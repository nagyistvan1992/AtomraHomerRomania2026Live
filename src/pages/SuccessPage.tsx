import React, { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext'; 
import SEOHead from '../components/SEOHead';
import { motion, AnimatePresence } from 'framer-motion';
import { getEntriLinks } from '../utils/getEntriLinks';
import { supabase } from '../lib/supabase';
import { invokeSupabaseFunction } from '../lib/supabaseFunctions';

interface DomainInfo {
  claim_url?: string;
}

interface OrderDetails {
  order_number?: string;
  amount_total?: number;
  customer_email?: string;
  created_at?: string;
  payment_method?: string;
}

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  useLanguage();
  const { clearCart, getTotalItems } = useCart();
  const [countdown, setCountdown] = useState(5);
  const sessionId = searchParams.get('session_id');
  const orderNumberParam = searchParams.get('order_number');
  const paymentMethodParam = searchParams.get('payment_method');
  const [domainInfo, setDomainInfo] = useState<DomainInfo | null>(null);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    const fetchData = async () => {
      setLoading(true);
      
      try {
        // Clear the cart when payment is successful
        if (getTotalItems() > 0) {
          clearCart();
        }
        
        // Try to fetch order details if we have a session ID
        if (sessionId) {
          try {
            const data = await invokeSupabaseFunction<OrderDetails>('get-session-details', {
              body: { session_id: sessionId },
              timeoutMs: 12000,
            });

            if (data) {
              setOrderDetails(data);
              console.log('Order details retrieved:', data);
            }
          } catch (error) {
            console.error('Error fetching session details:', error);
          }
        } else if (orderNumberParam) {
          try {
            const { data, error } = await supabase
              .from('orders')
              .select('order_number,total_amount,customer_email,created_at,payment_method')
              .eq('order_number', orderNumberParam)
              .single();

            if (!error && data) {
              setOrderDetails(data);
              console.log('COD order details retrieved:', data);
            }
          } catch (error) {
            console.error('Error fetching COD order details:', error);
          }
        }

        // Get domain info
        try {
          const info = await getEntriLinks();
          setDomainInfo(info);
        } catch (error) {
          console.error("Error fetching domain info:", error);
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [clearCart, sessionId, orderNumberParam, getTotalItems]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <>
      <SEOHead
        title="Payment Successful | Atomra Home Romania"
        description="Your payment has been processed successfully. Thank you for your purchase!"
        url="https://atomrahomeromania.ro/success"
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
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: loading ? 0.7 : 1, scale: loading ? 0.95 : 1 }}
              transition={{ duration: 0.5 }}
              className="luxury-card p-8 sm:p-12 rounded-lg"
            >
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.2
                }}
                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle size={40} className="text-green-600" />
              </motion.div>
              
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-8"
                  >
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 mx-auto mb-4"></div>
                    <p className="text-slate-600 font-light">Loading order details...</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.h1 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="text-3xl font-light text-slate-900 mb-4"
                    >
                      {paymentMethodParam === 'cod' ? 'Order Confirmed!' : 'Payment Successful!'}
                    </motion.h1>
                    
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="text-slate-600 mb-8 font-light"
                    >
                      {paymentMethodParam === 'cod'
                        ? 'Thank you for your order! Your cash on delivery order was placed successfully.'
                        : 'Thank you for your purchase! Your payment has been processed successfully.'}
                      {(orderDetails?.order_number || orderNumberParam) && (
                        <span className="block mt-2 text-sm font-medium text-slate-700">
                          Order Number: <span className="font-bold">{orderDetails?.order_number || orderNumberParam}</span>
                        </span>
                      )}
                    </motion.p>
                    
                    {orderDetails && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="bg-slate-50 p-4 rounded-lg mb-8 text-left border border-slate-200"
                      >
                        <h3 className="text-lg font-medium text-slate-900 mb-2">Order Summary</h3>
                        {typeof orderDetails.amount_total === 'number' && (
                          <p className="text-sm text-slate-600 mb-1">
                            <span className="font-medium">Total:</span> {sessionId ? orderDetails.amount_total / 100 : orderDetails.amount_total} Lei
                          </p>
                        )}
                        <p className="text-sm text-slate-600 mb-1">
                          <span className="font-medium">Date:</span> {new Date(orderDetails.created_at || Date.now()).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-slate-600">
                          <span className="font-medium">Email:</span> {orderDetails.customer_email || 'Not available'}
                        </p>
                        {orderDetails.payment_method && (
                          <p className="text-sm text-slate-600 mt-1">
                            <span className="font-medium">Payment:</span> {orderDetails.payment_method === 'cod' ? 'Cash on delivery' : orderDetails.payment_method}
                          </p>
                        )}
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-green-50 p-4 rounded-lg mb-8 border border-green-200"
              >
                <div className="flex items-center justify-center space-x-2 text-green-700">
                  <CheckCircle size={20} />
                  <span className="font-light">
                    {paymentMethodParam === 'cod'
                      ? 'Your order was recorded successfully. You will receive a confirmation email shortly.'
                      : 'You will receive a confirmation email shortly with your order details.'}
                  </span>
                </div>
              </motion.div>

              {countdown > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="bg-blue-50 p-4 rounded-lg mb-8 border border-blue-200"
                >
                  <div className="flex items-center justify-center space-x-2 text-blue-700">
                    <span className="font-light">
                      Redirecting to home page in <strong>{countdown}</strong> seconds...
                    </span>
                  </div>
                </motion.div>
              )}
              
              {!loading && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <Link
                    to="/"
                    className="bg-slate-900 text-white px-8 py-3 font-light tracking-wide uppercase hover:bg-slate-800 transition-colors duration-300 rounded flex items-center justify-center space-x-2"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    <ArrowLeft size={18} strokeWidth={1.5} />
                    <span>Continue Shopping</span>
                  </Link>
                  
                  <Link
                    to="/toate-produsele"
                    className="border border-slate-300 text-slate-700 px-8 py-3 font-light tracking-wide uppercase hover:bg-slate-50 transition-colors duration-300 rounded flex items-center justify-center space-x-2"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    <ShoppingBag size={18} strokeWidth={1.5} />
                    <span>Explore Products</span>
                  </Link>
                </motion.div>
              )}

              {domainInfo && domainInfo.claim_url && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="mt-8 p-4 bg-purple-50 rounded-lg border border-purple-200"
                >
                  <p className="text-purple-700 mb-2 font-medium">Want to manage your own domain?</p>
                  <p className="text-purple-600 text-sm mb-4">
                    You can claim this site and transfer it to your own Netlify account.
                  </p>
                  <a 
                    href={domainInfo.claim_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block bg-purple-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-purple-700 transition-colors"
                  >
                    Claim this site
                  </a>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessPage;


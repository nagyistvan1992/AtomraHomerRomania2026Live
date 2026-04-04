import React, { useRef, useEffect } from 'react';
import { X, Plus, Minus, ShoppingBag, ArrowRight, Check, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext'; 
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getAssetPath } from '../utils/assetPath';

const CartDrawer = () => {
  const { state, removeItem, updateQuantity, closeCart, getTotalItems, getTotalPrice } = useCart();
  const { t } = useLanguage();
  const cartRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Handle click outside to close cart
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        closeCart();
      }
    };

    if (state.isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent body scroll when cart is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      // Restore body scroll when cart is closed
      document.body.style.overflow = '';
    };
  }, [state.isOpen, closeCart]);

  // Handle escape key to close cart
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeCart();
      }
    };

    if (state.isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [state.isOpen, closeCart]);

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleRemoveItem = (id: number) => {
    removeItem(id);
  };

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();
  const shipping = totalPrice >= 149 ? 0 : 25;
  const finalTotal = totalPrice + shipping;

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {state.isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
            onClick={closeCart}
          />
        )}
      </AnimatePresence>
      
      {/* Drawer */}
      <AnimatePresence>
        {state.isOpen && (
          <motion.div 
            ref={cartRef}
            initial={{ x: '100%', opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0.5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 h-full w-full max-w-xs sm:max-w-md bg-white z-[70] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-white">
              <h2 className="text-lg sm:text-xl font-light text-gray-900 tracking-wide flex items-center">
                <ShoppingBag size={20} className="mr-2" strokeWidth={1.5} /> 
                Coșul meu ({totalItems})
              </h2> 
              <button
                onClick={closeCart}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 z-10"
                type="button"
                aria-label="Close cart"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {state.items.length === 0 ? (
                <div className="text-center py-8 sm:py-12">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ShoppingBag size={40} className="text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 font-light text-sm sm:text-base">Coșul tău este gol</p>
                    <button
                      onClick={closeCart}
                      className="mt-4 text-gray-900 hover:text-gray-700 font-light underline text-sm sm:text-base"
                      type="button"
                    >
                      Continuă cumpărăturile
                    </button>
                  </motion.div>
                </div>
              ) : (
                <div className="space-y-4 sm:space-y-6">
                  <AnimatePresence initial={false}>
                    {state.items.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex space-x-3 sm:space-x-4 bg-gray-50 p-3 rounded-lg"
                      >
                        <div className="w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 relative overflow-hidden rounded">
                          <img
                            src={item.image || getAssetPath('/placeholder-image.jpg')}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = getAssetPath('/placeholder-image.jpg');
                            }}
                          />
                          {state.lastAddedItem?.id === item.id && state.showAddAnimation && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="absolute inset-0 bg-green-500/20 flex items-center justify-center"
                            >
                              <Check className="text-white" size={24} />
                            </motion.div>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-light text-gray-900 mb-1 text-sm sm:text-base line-clamp-2">{item.name}</h3>
                          <p className="text-xs sm:text-sm text-gray-500 mb-1">{item.category}</p>
                          <p className="font-light text-gray-900 text-sm sm:text-base">{item.price}</p>
                        </div>
                        
                        <div className="flex flex-col items-end space-y-2 flex-shrink-0">
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-gray-400 hover:text-red-600 transition-colors duration-200 p-1"
                            type="button"
                            aria-label="Remove item"
                          >
                            <Trash2 size={14} strokeWidth={1.5} />
                          </button>
                          
                          <div className="flex items-center space-x-1 sm:space-x-2 bg-white rounded-full border border-gray-200">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
                              type="button"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} strokeWidth={1.5} />
                            </button>
                            
                            <span className="w-6 sm:w-8 text-center text-xs sm:text-sm font-light">
                              {item.quantity}
                            </span>
                            
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
                              type="button"
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} strokeWidth={1.5} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {state.items.length > 0 && (
              <div className="border-t border-gray-200 p-4 sm:p-6 space-y-3 sm:space-y-4 bg-white">
                {/* Subtotal */}
                <div className="flex justify-between items-center text-sm">
                  <span className="font-light text-gray-600">Subtotal:</span>
                  <span className="font-light text-gray-900">{totalPrice.toFixed(0)} {t('common.lei')}</span>
                </div>
                 
                {/* Shipping */}
                <div className="flex justify-between items-center text-sm">
                  <span className="font-light text-gray-600">Transport:</span>
                  <span className="font-light text-gray-900">
                    {shipping === 0 ? (
                      <span className="text-green-600">Gratuit</span>
                    ) : (
                      `${shipping} ${t('common.lei')}`
                    )}
                  </span>
                </div>
                
                {/* Free shipping notice */}
                {shipping === 0 && (
                  <div className="text-xs text-green-600 font-light">
                    🎉 Transport gratuit aplicat!
                  </div>
                )}
                
                {/* Total */}
                <div className="flex justify-between items-center border-t pt-3">
                  <span className="text-base sm:text-lg font-light text-gray-900">Total:</span>
                  <span className="text-lg sm:text-xl font-medium text-gray-900">
                    {finalTotal.toFixed(0)} {t('common.lei')}
                  </span>
                </div>
                
                <Link
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    closeCart();
                    // Use setTimeout to ensure cart is closed before navigation
                    setTimeout(() => {
                      navigate('/cart');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }, 300);
                  }}
                  className="w-full bg-gray-900 text-white py-3 sm:py-4 text-center font-light tracking-wide uppercase hover:bg-gray-800 transition-colors duration-300 block text-sm sm:text-base rounded flex items-center justify-center space-x-2"
                  aria-label="Finalizează comanda"
                >
                  <span>Finalizează comanda</span>
                  <ArrowRight size={16} strokeWidth={1.5} />
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add to Cart Animation */}
      <AnimatePresence>
        {state.showAddAnimation && state.lastAddedItem && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }} 
            exit={{ opacity: 0, y: -20 }}
            transition={{ 
              type: 'spring', 
              stiffness: 500, 
              damping: 30,
              duration: 0.4 
            }}
            className="fixed bottom-6 right-6 z-[80] bg-white shadow-2xl rounded-lg overflow-hidden max-w-xs"
          >
            <div className="p-4 flex items-center space-x-3 bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-500">
              <div className="flex-shrink-0 bg-green-100 p-2 rounded-full">
                <Check size={20} className="text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 line-clamp-1">
                  {state.lastAddedItem.name}
                </p>
                <p className="text-xs text-gray-600">
                  {t('product.addedToCart')}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CartDrawer;

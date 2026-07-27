import React, { useRef, useEffect } from 'react';
import { X, Plus, Minus, ShoppingBag, ArrowRight, Check, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage, type Language } from '../context/LanguageContext';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getPlaceholderImage, normalizeImageSource } from '../utils/imageSources';

const DRAWER_COPY: Record<
  Language,
  {
    title: string;
    empty: string;
    continueShopping: string;
    subtotal: string;
    shipping: string;
    free: string;
    freeApplied: string;
    total: string;
    checkout: string;
  }
> = {
  ro: {
    title: 'Cosul meu',
    empty: 'Cosul tau este gol',
    continueShopping: 'Continua cumparaturile',
    subtotal: 'Subtotal',
    shipping: 'Transport',
    free: 'Gratuit',
    freeApplied: 'Transport gratuit aplicat',
    total: 'Total',
    checkout: 'Finalizeaza comanda',
  },
  hu: {
    title: 'Kosaram',
    empty: 'A kosarad ures',
    continueShopping: 'Folytasd a vasarlast',
    subtotal: 'Reszosszeg',
    shipping: 'Szallitas',
    free: 'Ingyenes',
    freeApplied: 'Az ingyenes szallitas ervenyesitve lett',
    total: 'Vegosszeg',
    checkout: 'Rendeles veglegesitese',
  },
  en: {
    title: 'My cart',
    empty: 'Your cart is empty',
    continueShopping: 'Continue shopping',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    free: 'Free',
    freeApplied: 'Free shipping applied',
    total: 'Total',
    checkout: 'Complete order',
  },
};

const CartDrawer = () => {
  const { state, removeItem, updateQuantity, closeCart, getTotalItems, getTotalPrice } = useCart();
  const { t, language } = useLanguage();
  const cartRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const copy = DRAWER_COPY[language];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        closeCart();
      }
    };

    if (state.isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [state.isOpen, closeCart]);

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

  const handleQuantityChange = (id: string | number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleRemoveItem = (id: string | number) => {
    removeItem(id);
  };

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();
  const shipping = totalPrice >= 149 ? 0 : 25;
  const finalTotal = totalPrice + shipping;

  return (
    <>
      <AnimatePresence>
        {state.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
            onClick={closeCart}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {state.isOpen && (
          <motion.div
            ref={cartRef}
            initial={{ x: '100%', opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0.5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-xs flex-col bg-white shadow-2xl sm:max-w-md"
          >
            <div className="flex items-center justify-between border-b border-gray-200 bg-white p-4 sm:p-6">
              <h2 className="flex items-center text-lg font-light tracking-wide text-gray-900 sm:text-xl">
                <ShoppingBag size={20} className="mr-2" strokeWidth={1.5} />
                {copy.title} ({totalItems})
              </h2>
              <button
                onClick={closeCart}
                className="z-10 rounded-full p-2 transition-colors duration-200 hover:bg-gray-100"
                type="button"
                aria-label="Close cart"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {state.items.length === 0 ? (
                <div className="py-8 text-center sm:py-12">
                  <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
                    <ShoppingBag size={40} className="mx-auto mb-4 text-gray-300" />
                    <p className="text-sm font-light text-gray-500 sm:text-base">{copy.empty}</p>
                    <button
                      onClick={closeCart}
                      className="mt-4 text-sm font-light text-gray-900 underline hover:text-gray-700 sm:text-base"
                      type="button"
                    >
                      {copy.continueShopping}
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
                        className="flex space-x-3 rounded-lg bg-gray-50 p-3 sm:space-x-4"
                      >
                        <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded sm:h-16 sm:w-16">
                          <img
                            src={normalizeImageSource(item.image) || getPlaceholderImage()}
                            alt={item.name}
                            className="h-full w-full object-cover"
                            onError={(event) => {
                              const target = event.target as HTMLImageElement;
                              target.src = getPlaceholderImage();
                            }}
                          />
                          {state.lastAddedItem?.id === item.id && state.showAddAnimation && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="absolute inset-0 flex items-center justify-center bg-green-500/20"
                            >
                              <Check className="text-white" size={24} />
                            </motion.div>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="mb-1 line-clamp-2 text-sm font-light text-gray-900 sm:text-base">{item.name}</h3>
                          <p className="mb-1 text-xs text-gray-500 sm:text-sm">{item.category}</p>
                          <p className="text-sm font-light text-gray-900 sm:text-base">{item.price}</p>
                        </div>

                        <div className="flex flex-shrink-0 flex-col items-end space-y-2">
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="p-1 text-gray-400 transition-colors duration-200 hover:text-red-600"
                            type="button"
                            aria-label="Remove item"
                          >
                            <Trash2 size={14} strokeWidth={1.5} />
                          </button>

                          <div className="flex items-center space-x-1 rounded-full border border-gray-200 bg-white sm:space-x-2">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="rounded-full p-1 transition-colors duration-200 hover:bg-gray-100"
                              type="button"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} strokeWidth={1.5} />
                            </button>

                            <span className="w-6 text-center text-xs font-light sm:w-8 sm:text-sm">{item.quantity}</span>

                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="rounded-full p-1 transition-colors duration-200 hover:bg-gray-100"
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

            {state.items.length > 0 && (
              <div className="space-y-3 border-t border-gray-200 bg-white p-4 sm:space-y-4 sm:p-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-light text-gray-600">{copy.subtotal}:</span>
                  <span className="font-light text-gray-900">
                    {totalPrice.toFixed(0)} {t('common.lei')}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="font-light text-gray-600">{copy.shipping}:</span>
                  <span className="font-light text-gray-900">
                    {shipping === 0 ? <span className="text-green-600">{copy.free}</span> : `${shipping} ${t('common.lei')}`}
                  </span>
                </div>

                {shipping === 0 && <div className="text-xs font-light text-green-600">{copy.freeApplied}</div>}

                <div className="flex items-center justify-between border-t pt-3">
                  <span className="text-base font-light text-gray-900 sm:text-lg">{copy.total}:</span>
                  <span className="text-lg font-medium text-gray-900 sm:text-xl">
                    {finalTotal.toFixed(0)} {t('common.lei')}
                  </span>
                </div>

                <Link
                  to="#"
                  onClick={(event) => {
                    event.preventDefault();
                    closeCart();
                    setTimeout(() => {
                      navigate('/cart');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }, 300);
                  }}
                  className="flex w-full items-center justify-center space-x-2 rounded bg-gray-900 py-3 text-center text-sm font-light uppercase tracking-wide text-white transition-colors duration-300 hover:bg-gray-800 sm:py-4 sm:text-base"
                  aria-label={copy.checkout}
                >
                  <span>{copy.checkout}</span>
                  <ArrowRight size={16} strokeWidth={1.5} />
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {state.showAddAnimation && state.lastAddedItem && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30, duration: 0.4 }}
            className="fixed bottom-6 right-6 z-[80] max-w-xs overflow-hidden rounded-lg bg-white shadow-2xl"
          >
            <div className="flex items-center space-x-3 border-l-4 border-green-500 bg-gradient-to-r from-green-50 to-green-100 p-4">
              <div className="flex-shrink-0 rounded-full bg-green-100 p-2">
                <Check size={20} className="text-green-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="line-clamp-1 text-sm font-medium text-gray-900">{state.lastAddedItem.name}</p>
                <p className="text-xs text-gray-600">{t('product.addedToCart')}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CartDrawer;

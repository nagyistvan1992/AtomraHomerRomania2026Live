import React, { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { getPlaceholderImage, getPreferredImage } from '../utils/imageSources';

interface AddToCartButtonProps {
  product: {
    id?: number | string;
    slug?: string;
    name: string;
    price: number | string; 
    image?: string;
    images?: string[];
    category: string;
  };
  className?: string;
  showIcon?: boolean;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'outline' | 'icon';
  disabled?: boolean;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
  className = '',
  showIcon = true,
  showText = true,
  size = 'md',
  variant = 'primary',
  disabled = false
}) => {
  const { addItem } = useCart();
  const { t } = useLanguage();
  const [isAdded, setIsAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (disabled || isLoading) return;
    
    setIsLoading(true);
    
    try {
      // Format price consistently
      let formattedPrice: string;
      if (typeof product.price === 'number') {
        formattedPrice = `${product.price.toFixed(0)} Lei`;
      } else {
        formattedPrice = product.price.toString();
      }
      
      // Use slug as the ID for better Stripe integration
      // This way we can match cart items to Stripe products
      const productId = product.slug || product.id;
            
      // Validate required fields
      if (!product.name || (!product.image && (!product.images || product.images.length === 0)) || !product.category) {
        throw new Error('Missing required product information');
        return; // Early return to prevent further execution
      }
      
      addItem({
        id: productId,
        name: product.name,
        price: formattedPrice,
        image: getPreferredImage(product.image || product.images, getPlaceholderImage()),
        category: product.category
      });
      
      // Show success animation
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
      
    } catch (error) {
      console.error('Error adding item to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Size classes
  const sizeClasses = {
    sm: 'px-2 py-1.5 text-xs',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-2.5 text-base'
  };

  // Variant classes with explicit text colors
  const variantClasses = {
    primary: 'bg-gray-900 text-white hover:bg-gray-800 disabled:bg-gray-400 disabled:text-gray-200',
    secondary: 'bg-white text-gray-900 hover:bg-gray-50 border border-gray-200 disabled:bg-gray-100 disabled:text-gray-400',
    outline: 'bg-transparent text-gray-900 hover:bg-gray-50 border border-gray-200 disabled:border-gray-300 disabled:text-gray-400',
    icon: 'bg-white/95 text-gray-800 hover:text-gray-900 hover:bg-white shadow-lg hover:shadow-xl disabled:bg-gray-100 disabled:text-gray-400 border border-gray-200/50'
  };

  // Icon size based on button size
  const iconSize = {
    sm: 14,
    md: 16,
    lg: 18
  };

  // For icon-only variant with enhanced animations
  if (variant === 'icon') {
    return (
      <motion.button
        onClick={handleAddToCart}
        disabled={disabled || isLoading}
        initial={{ scale: 1 }}
        whileHover={{ 
          scale: 1.1,
          rotate: [0, -5, 5, 0],
          transition: { 
            scale: { duration: 0.2 },
            rotate: { duration: 0.6, ease: "easeInOut" }
          }
        }}
        whileTap={{ scale: 0.95 }}
        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 disabled:cursor-not-allowed backdrop-blur-sm group ${variantClasses[variant]} ${className}`}
        aria-label="Add to cart"
        style={{ 
          zIndex: 30,
          boxShadow: isAdded 
            ? '0 8px 25px rgba(34, 197, 94, 0.3), 0 0 0 2px rgba(34, 197, 94, 0.2)' 
            : '0 4px 20px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.2)'
        }}
      >
        {/* Ripple effect on click */}
        <motion.div
          className="absolute inset-0 rounded-full bg-green-400/20"
          initial={{ scale: 0, opacity: 0 }}
          animate={isAdded ? { scale: 1.5, opacity: [0.5, 0] } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
        
        {/* Floating particles effect */}
        {isAdded && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-green-400 rounded-full"
                initial={{ 
                  scale: 0, 
                  x: 0, 
                  y: 0, 
                  opacity: 1 
                }}
                animate={{ 
                  scale: [0, 1, 0],
                  x: Math.cos((i * 60) * Math.PI / 180) * 20,
                  y: Math.sin((i * 60) * Math.PI / 180) * 20,
                  opacity: [1, 1, 0]
                }}
                transition={{ 
                  duration: 0.8,
                  delay: i * 0.1,
                  ease: "easeOut"
                }}
              />
            ))}
          </>
        )}

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
            </motion.div>
          ) : isAdded ? (
            <motion.div
              key="check"
              initial={{ scale: 0.5, opacity: 0, rotate: -180 }}
              animate={{ 
                scale: [0.5, 1.2, 1], 
                opacity: 1, 
                rotate: 0 
              }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ 
                duration: 0.5,
                ease: "backOut"
              }}
            >
              <Check size={iconSize[size]} strokeWidth={2.5} className="text-green-600" />
            </motion.div>
          ) : (
            <motion.div
              key="cart"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <ShoppingCart 
                size={iconSize[size]} 
                strokeWidth={1.5} 
                className="text-gray-800 group-hover:text-gray-900 transition-colors duration-200" 
              />
              
              {/* Subtle glow effect on hover */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gray-400/20"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.5, opacity: 0.3 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    );
  }

  return (
    <motion.button
      onClick={handleAddToCart}
      disabled={disabled || isLoading}
      whileTap={{ scale: 0.97 }}
      className={`rounded flex items-center justify-center space-x-2 font-light tracking-wide transition-all duration-300 disabled:cursor-not-allowed ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      aria-label="Add to cart"
      style={{ minWidth: showText ? '120px' : 'auto' }}
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center space-x-2"
          >
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
            {showText && <span className="whitespace-nowrap">{t('checkout.processing')}</span>}
          </motion.div>
        ) : isAdded ? (
          <motion.div
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center space-x-2"
          >
            {showIcon && <Check size={iconSize[size]} strokeWidth={1.5} className="text-green-500" />}
            {showText && <span className="whitespace-nowrap">{t('product.addedToCart')}</span>}
          </motion.div>
        ) : (
          <motion.div
            key="normal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center space-x-2"
          >
            {showIcon && <ShoppingCart size={iconSize[size]} strokeWidth={1.5} />}
            {showText && <span className="whitespace-nowrap">{t('product.addToCart')}</span>}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default AddToCartButton;

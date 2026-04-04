import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Star, ShoppingCart, Plus, Minus, Heart, Share2, Check, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { supabase } from '../lib/supabase';
import SEOHead from './SEOHead';
import LazyImage from './LazyImage';
import AddToCartButton from './AddToCartButton';
import { StripeCheckoutButton } from './StripeCheckoutButton';
import { generateProductStructuredData, generateBreadcrumbStructuredData } from '../utils/seoUtils';
import { motion, AnimatePresence } from 'framer-motion';
import { getProductById } from '../stripe-config';
import { getAssetPath } from '../utils/assetPath';

interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  category: string;
  slug: string;
  description: string;
  long_description: string;
  features: string[];
  images: string[];
  tags?: string[];
  in_stock: boolean;
  image_alt_texts?: string[];
}

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { t, language } = useLanguage();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdded, setIsAdded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  // Scroll to top when component mounts
  useEffect(() => {
    // Force scroll to top immediately when product page loads
    window.scrollTo(0, 0);
    // Then apply smooth scroll for better UX
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) {
        navigate('/', { replace: true });
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();

        if (error) {
          throw error;
        }

        if (data) {
          setProduct(data);
          setIsVisible(true);
        } else {
          navigate('/', { replace: true });
        }
      } catch (err) {
        console.error('Error fetching product from Supabase:', err);
        setError('Product not found');
        navigate('/', { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug, navigate]);

  const handleAddToCart = () => {
    if (!product) return;
    
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: parseInt(product.id),
        name: product.name,
        price: `${product.price.toFixed(0)} Lei`,
        image: product.images && product.images.length > 0 ? product.images[0] : getAssetPath('/placeholder-image.jpg'),
        category: product.category
      });
    }
    
    // Show success animation
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        strokeWidth={1.5}
        className={`transition-all duration-300 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-200'
        }`}
      />
    ));
  };

  const getCategoryRoute = (category: string) => {
    switch (category) {
      case 'Home Collection':
        return '/home-collection';
      case 'Events Collection':
        return '/events-collection';
      case 'Accessories':
        return '/accessories-collection';
      default:
        return '/';
    }
  };

  // Find matching Stripe product
  const stripeProduct = product ? getProductById(product.slug) : null;

  // Custom SVG Icons for Quality Features
  const QualityIcons = {
    PremiumQuality: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
    EcoFriendly: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M7 20s-1-1-1-5c0-3 1-4 1-4s1 1 1 4c0 4-1 5-1 5z"/>
        <path d="M12 20s-1-1-1-5c0-3 1-4 1-4s1 1 1 4c0 4-1 5-1 5z"/>
        <path d="M17 20s-1-1-1-5c0-3 1-4 1-4s1 1 1 4c0 4-1 5-1 5z"/>
        <path d="M3 12c0-7 4-10 9-10s9 3 9 10"/>
        <circle cx="12" cy="8" r="2"/>
      </svg>
    ),
    SafeBurning: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
        <path d="M12 12a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1z"/>
      </svg>
    ),
    FastShipping: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 12h18l-3-3m0 6l3-3"/>
        <path d="M8 12v6a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-6"/>
        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
        <circle cx="7" cy="19" r="1"/>
        <circle cx="17" cy="19" r="1"/>
      </svg>
    ),
    SafePackaging: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
        <path d="m3.3 7 8.7 5 8.7-5"/>
        <path d="M12 22V12"/>
        <path d="M9 10l6-3"/>
        <circle cx="12" cy="12" r="2"/>
      </svg>
    )
  };

  const qualityFeatures = [
    {
      icon: <QualityIcons.PremiumQuality />,
      title: t('quality.premiumQuality.title'),
      description: t('quality.premiumQuality.description')
    },
    {
      icon: <QualityIcons.EcoFriendly />,
      title: t('quality.ecoFriendly.title'),
      description: t('quality.ecoFriendly.description')
    },
    {
      icon: <QualityIcons.SafeBurning />,
      title: t('quality.safeBurning.title'),
      description: t('quality.safeBurning.description')
    },
    {
      icon: <QualityIcons.FastShipping />,
      title: t('quality.fastShipping.title'),
      description: t('quality.fastShipping.description')
    },
    {
      icon: <QualityIcons.SafePackaging />,
      title: t('quality.safePackaging.title'),
      description: t('quality.safePackaging.description')
    }
  ];

  // Get SEO title based on language
  const getSeoTitle = () => {
    if (language === 'ro') {
      return `${product?.name} | Lumânare din Ceară Naturală | Atomra Home Romania`;
    } else if (language === 'hu') {
      return `${product?.name} | Természetes Viaszgyertya | Atomra Home Romania`;
    } else {
      return `${product?.name} | Natural Wax Candle | Atomra Home Romania`;
    }
  };

  // Navigate through images
  const nextImage = () => {
    if (!product || !product.images) return;
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    if (!product || !product.images) return;
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  // Handle fullscreen toggle
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFullscreen) {
        if (e.key === 'Escape') {
          setIsFullscreen(false);
        } else if (e.key === 'ArrowRight') {
          nextImage();
        } else if (e.key === 'ArrowLeft') {
          prevImage();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  // Get alt text for images
  const getImageAltText = (index: number) => {
    if (product?.image_alt_texts && product.image_alt_texts[index]) {
      return product.image_alt_texts[index];
    }
    return `Lumânare din ceară naturală ${product?.name} - imagine ${index + 1} - Atomra Home Romania`;
  };

  if (loading) {
    return (
      <div className="pt-32 sm:pt-36 md:pt-40 lg:pt-44 min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <div>
                <div className="aspect-square bg-gray-200 rounded-lg mb-6"></div>
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="aspect-square bg-gray-200 rounded-lg"></div>
                  ))}
                </div>
              </div>
              <div>
                <div className="h-12 bg-gray-200 rounded mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-4 w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded mb-8 w-1/2"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  // Generate structured data
  const productStructuredData = generateProductStructuredData(product);
  const breadcrumbStructuredData = generateBreadcrumbStructuredData([
    { name: 'Home', url: 'https://atomra-home-romania.com' },
    { name: product.category, url: `https://atomra-home-romania.com${getCategoryRoute(product.category)}` },
    { name: product.name, url: `https://atomra-home-romania.com/product/${product.slug}` }
  ]);

  return (
    <>
      <SEOHead
        title={getSeoTitle()}
        description={`${product.description} Lumânare din ceară naturală de soia, personalizabilă și reîncărcabilă.`}
        keywords={`lumanare ceara naturala, ceara de soia, lumanari ceara naturala, lumanare personalizata, lumanari din ceara naturala, ${product.name}, ${product.category}, ${product.tags?.join(', ')}`}
        image={product.images && product.images.length > 0 ? product.images[0] : getAssetPath('/placeholder-image.jpg')}
        url={`https://atomra-home-romania.com/product/${product.slug}`}
        type="product"
        structuredData={`[${productStructuredData}, ${breadcrumbStructuredData}]`}
        preloadImages={product.images && product.images.length > 0 ? product.images.slice(0, 3) : []}
      />
      
      {/* Fullscreen Image Gallery */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black z-[100] flex items-center justify-center">
          <button 
            onClick={toggleFullscreen}
            className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
          >
            <X size={24} />
          </button>
          
          <button
            onClick={prevImage}
            className="absolute left-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
            aria-label="Previous image"
          >
            <ChevronLeft size={32} />
          </button>
          
          <img 
            src={product.images[selectedImage]} 
            alt={getImageAltText(selectedImage)}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
          
          <button
            onClick={nextImage}
            className="absolute right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
            aria-label="Next image"
          >
            <ChevronRight size={32} />
          </button>
          
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {product.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-2 h-2 rounded-full ${selectedImage === index ? 'bg-white' : 'bg-white/50'}`}
                aria-label={`View image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
      
      <div className="pt-32 sm:pt-36 md:pt-40 lg:pt-44 min-h-screen bg-white" ref={pageRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Breadcrumb Navigation */}
          <nav className={`flex items-center space-x-2 mb-4 text-sm transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`} aria-label="Breadcrumb">
            <Link 
              to="/" 
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              {t('nav.home')}
            </Link>
            <span className="text-gray-300">/</span>
            <Link 
              to={getCategoryRoute(product.category)} 
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              {product.category}
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-light">{product.name}</span>
          </nav>

          {/* Back Button */}
          <div className={`mb-6 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`} style={{ transitionDelay: '0.1s' }}>
            <Link 
              to={getCategoryRoute(product.category)}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 group"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <ArrowLeft size={18} strokeWidth={1.5} className="group-hover:-translate-x-1 transition-transform duration-200" />
              <span className="font-light">{t('nav.backToCollection', { collection: product.category })}</span>
            </Link>
          </div>

          {/* Product Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Images */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="transition-all duration-700"
              ref={galleryRef}
            >
              {/* Main Image */}
              <div className="relative mb-4 sm:mb-6 overflow-hidden rounded-lg shadow-sm">
                <div 
                  className="cursor-pointer"
                  onClick={toggleFullscreen}
                >
                  <LazyImage
                    src={product.images && product.images.length > 0 ? product.images[selectedImage] : getAssetPath('/placeholder-image.jpg')}
                    alt={getImageAltText(selectedImage)}
                    className="w-full"
                    aspectRatio="square"
                    objectFit="cover"
                    priority={true}
                  />
                </div>
                
                {/* Navigation Arrows */}
                {product.images.length > 1 && (
                  <>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        prevImage();
                      }}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors duration-200"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage();
                      }}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors duration-200"
                      aria-label="Next image"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
                
                {/* Product Tags */}
                {product.tags && product.tags.length > 0 && (
                  <div className="absolute top-4 left-4 space-y-2">
                    {product.tags.map((tag, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                        className="inline-block bg-gray-900 text-white px-3 py-1 text-xs font-light tracking-wide uppercase"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-5 gap-2 sm:gap-4">
                  {product.images.map((image, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                      onClick={() => setSelectedImage(index)}
                      className={`overflow-hidden rounded-lg transition-all duration-300 ${
                        selectedImage === index 
                          ? 'ring-2 ring-gray-900 shadow-md' 
                          : 'hover:shadow-md hover:scale-105'
                      }`}
                      type="button"
                      aria-label={`View image ${index + 1} of ${product.name}`}
                    >
                      <LazyImage
                        src={image || getAssetPath('/placeholder-image.jpg')}
                        alt={getImageAltText(index)}
                        aspectRatio="square"
                        objectFit="cover"
                      />
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Product Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="transition-all duration-700"
            >
              {/* Product Title and Price */}
              <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extralight text-gray-900 mb-4 tracking-tight">
                  {product.name}
                </h1>
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <span className="text-2xl sm:text-3xl font-light text-gray-900">
                    {product.price.toFixed(0)} Lei
                  </span>
                  {product.in_stock ? (
                    <span className="text-green-600 text-sm font-light">{t('product.inStock')}</span>
                  ) : (
                    <span className="text-red-600 text-sm font-light">{t('product.outOfStock')}</span>
                  )}
                </div>
                
                {/* Rating */}
                <div className="flex items-center space-x-2 mb-6">
                  <div className="flex items-center space-x-1" role="img" aria-label={`Rating: ${product.rating} out of 5 stars`}>
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-sm text-gray-600 font-light">
                    {product.rating} ({product.reviews} {t('product.reviews')})
                  </span>
                </div>
              </div>

              {/* Short Description */}
              <p className="text-base sm:text-lg text-gray-600 mb-8 font-light leading-relaxed">
                {product.description}
              </p>

              {/* Features List */}
              {product.features && product.features.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-light text-gray-900 mb-4">{t('product.features')}</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <motion.li 
                        key={index} 
                        className="flex items-center space-x-3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                      >
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                        <span className="text-gray-600 font-light">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Quantity and Add to Cart */}
              <div className="mb-8">
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <label htmlFor="quantity" className="text-sm font-light text-gray-700">{t('product.quantity')}:</label>
                    <div className="flex items-center border border-gray-200 rounded">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2 hover:bg-gray-50 transition-colors duration-200"
                        type="button"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={16} strokeWidth={1.5} />
                      </button>
                      <input
                        id="quantity"
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="px-2 py-1 w-12 text-center min-w-[3rem] font-light border-0 focus:outline-none"
                        min="1"
                        aria-label="Product quantity"
                      />
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-2 hover:bg-gray-50 transition-colors duration-200"
                        type="button"
                        aria-label="Increase quantity"
                      >
                        <Plus size={16} strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Regular Add to Cart Button */}
                  <motion.button
                    onClick={handleAddToCart}
                    disabled={!product.in_stock}
                    whileTap={{ scale: 0.97 }}
                    className="flex-1 bg-gray-900 text-white py-3 px-4 sm:py-4 sm:px-8 font-light tracking-wide uppercase hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 rounded"
                    type="button"
                  >
                    <AnimatePresence mode="wait">
                      {isAdded ? (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-center space-x-2"
                        >
                          <Check size={18} strokeWidth={1.5} className="text-green-400" />
                          <span>{language === 'ro' ? 'Adăugat în Coș' : language === 'hu' ? 'Kosárba Téve' : 'Added to Cart'}</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="normal"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-center space-x-2"
                        >
                          <ShoppingCart size={18} strokeWidth={1.5} />
                          <span>{t('product.addToCart')}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>

                  {/* Stripe Checkout Button (if available) */}
                  {stripeProduct && (
                    <div className="flex-1">
                      <StripeCheckoutButton
                        priceId={stripeProduct.priceId}
                        mode={stripeProduct.mode}
                        productName={product.name}
                        className="w-full bg-indigo-600 text-white py-3 px-4 sm:py-4 sm:px-8 font-light tracking-wide uppercase hover:bg-indigo-700 transition-all duration-300 rounded"
                      >
                        {language === 'ro' ? 'Cumpără Acum' : 
                         language === 'hu' ? 'Vásárolj Most' : 
                         'Buy Now'} - {product.price.toFixed(0)} Lei
                      </StripeCheckoutButton>
                    </div>
                  )}
                  
                  <div className="flex space-x-2">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 sm:p-4 border border-gray-200 hover:bg-gray-50 transition-colors duration-200 rounded"
                      type="button"
                      aria-label="Add to wishlist"
                    >
                      <Heart size={18} strokeWidth={1.5} />
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 sm:p-4 border border-gray-200 hover:bg-gray-50 transition-colors duration-200 rounded"
                      type="button"
                      aria-label="Share product"
                    >
                      <Share2 size={18} strokeWidth={1.5} />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Quality Features Section */}
              <div className="mb-8 p-4 sm:p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-light text-gray-900 mb-4 sm:mb-6 text-center">{t('product.whyChooseAtomra')}</h3>
                <div className="grid grid-cols-1 gap-4">
                  {qualityFeatures.map((feature, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-center space-x-4 group"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    >
                      <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 group-hover:text-gray-900 group-hover:bg-gray-100 transition-all duration-300">
                        {feature.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-light text-gray-900 text-sm mb-1">{feature.title}</h4>
                        <p className="text-xs text-gray-600 font-light">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Long Description */}
              <div className="border-t border-gray-100 pt-8">
                <h3 className="text-lg font-light text-gray-900 mb-4">{t('product.aboutProduct')}</h3>
                <div className="prose prose-gray max-w-none">
                  {product.long_description.split('\n\n').map((paragraph, index) => (
                    <motion.p 
                      key={index} 
                      className="text-gray-600 font-light leading-relaxed mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* SEO Content Section */}
          <section className="mt-16 pt-8 border-t border-gray-100">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-light text-gray-900 mb-6">Despre Lumânările din Ceară Naturală</h2>
              
              <div className="prose prose-slate max-w-none">
                <p>
                  <strong>Lumânările din ceară naturală</strong> reprezintă o alternativă superioară față de lumânările convenționale din parafină. La Atomra Home Romania, ne mândrim cu produsele noastre din <strong>ceară naturală</strong>, create cu pasiune și dedicare pentru a oferi o experiență senzorială completă.
                </p>
                
                <p>
                  Produsul nostru, <strong>{product.name}</strong>, face parte din colecția {product.category} și este realizat din <strong>ceară de soia</strong> 100% naturală. Această <strong>lumânare personalizată</strong> este perfectă pentru {product.category === 'Home Collection' ? 'a crea o atmosferă caldă și primitoare în casa ta' : product.category === 'Events Collection' ? 'a adăuga eleganță și rafinament evenimentelor speciale' : 'a completa experiența ta cu lumânările Atomra'}.
                </p>
                
                <h3>Beneficiile Lumânărilor din Ceară Naturală</h3>
                
                <p>
                  Alegând <strong>lumânări din ceară naturală</strong> Atomra, beneficiezi de:
                </p>
                
                <ul>
                  <li>Ardere mai curată și mai lungă față de lumânările din parafină</li>
                  <li>Absența toxinelor și a substanțelor chimice dăunătoare</li>
                  <li>Parfum mai intens și mai natural</li>
                  <li>Impact redus asupra mediului - <strong>ceara naturală</strong> este biodegradabilă</li>
                  <li>Sistem inovator de reumplere care reduce deșeurile</li>
                  <li>Personalizabile - Creează-ți propria <strong>lumânare personalizată</strong> cu granulele noastre de ceară</li>
                </ul>
                
                <h3>Cum să Îngrijești Lumânarea Ta</h3>
                
                <p>
                  Pentru a te bucura la maximum de <strong>lumânarea ta personalizată</strong> din <strong>ceară naturală</strong>, urmează aceste sfaturi simple:
                </p>
                
                <ul>
                  <li>La prima aprindere, lasă lumânarea să ardă cel puțin 2 ore pentru a forma un bazin de ceară uniform</li>
                  <li>Taie fitilul la 5-6 mm înainte de fiecare aprindere</li>
                  <li>Ține lumânarea departe de curenți de aer pentru o ardere uniformă</li>
                  <li>Nu lăsa niciodată o lumânare aprinsă nesupravegheată</li>
                  <li>Reumple recipientul cu granule noi de ceară când nivelul scade</li>
                </ul>
                
                <p>
                  Descoperă întreaga noastră colecție de <strong>lumânări din ceară naturală</strong> și transformă-ți casa și evenimentele speciale cu produsele premium Atomra. Fiecare <strong>lumânare personalizată</strong> este creată cu pasiune și atenție la detalii, pentru a-ți oferi o experiență senzorială completă și memorabilă.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ProductPage;

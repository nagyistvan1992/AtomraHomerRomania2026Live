import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Star, ArrowLeft, ArrowRight, ShoppingCart, AlertCircle, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { supabase, testSupabaseConnection } from '../lib/supabase';
import SEOHead from '../components/SEOHead';
import LazyImage from '../components/LazyImage'; 
import AddToCartButton from '../components/AddToCartButton';
import { motion, AnimatePresence } from 'framer-motion';
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
  images: string[];
  tags?: string[];
  in_stock: boolean;
}

const AccessoriesCollectionPage = () => {
  const [visibleProducts, setVisibleProducts] = useState<boolean[]>([]);
  const [accessories, setAccessories] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();
  const { t } = useLanguage();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const fetchAccessories = async () => {
      // Test connection first
      const connectionOk = await testSupabaseConnection();
      if (!connectionOk) {
        setError('Unable to connect to database. Please check your internet connection and try again.');
        setLoading(false);
        return;
      }
      
      try {
        // Start loading immediately
        setLoading(true);
        setError(null);
        
        // Use a more efficient query with fewer fields for faster loading
        const { data, error } = await supabase
          .from('products')
          .select('id, name, price, rating, reviews, category, slug, description, images, tags, in_stock, created_at')
          .eq('category', 'Accessories')
          .eq('in_stock', true)
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }
        
        // Check for duplicate products by slug and keep only the most recent one
        const uniqueProducts: Product[] = [];
        const slugs = new Set();
        data?.forEach(product => {
          if (!slugs.has(product.slug)) {
            slugs.add(product.slug);
            uniqueProducts.push(product);
          }
        });

        // Reset the state before adding products to avoid accumulation
        setAccessories([]);
        
        // Set the unique products as the state
        setTimeout(() => {
          setAccessories(uniqueProducts);
          // Initialize visibility array with the same length as uniqueProducts
          setVisibleProducts(new Array(uniqueProducts.length).fill(false));
        }, 10);
        
        console.log(`Found ${uniqueProducts.length} unique accessories products`);
      } catch (err) {
        console.error('Error fetching products from Supabase:', err);
        setError('Failed to load products');
        
        // No fallback data - keep empty array
        setAccessories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAccessories();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            accessories.forEach((_, index) => {
              setTimeout(() => {
                setVisibleProducts(prev => {
                  const newVisible = [...prev];
                  newVisible[index] = true;
                  return newVisible;
                });
              }, index * 60);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [accessories]);

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            size={14}
            strokeWidth={1.5}
            className={`${
              i < Math.floor(rating)
                ? 'text-amber-500 fill-current'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-1 text-xs text-gray-500">{rating.toFixed(1)}</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="luxury-page-bg luxury-floating-elements min-h-screen pt-32 sm:pt-36 md:pt-40 lg:pt-44">
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-32 left-16 w-1 h-1 bg-slate-300/20 rounded-full animate-luxury-float"></div>
          <div className="absolute top-48 right-24 w-0.5 h-0.5 bg-slate-200/30 rounded-full animate-luxury-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-32 left-1/4 w-0.5 h-0.5 bg-slate-300/25 rounded-full animate-luxury-float" style={{ animationDelay: '4s' }}></div>
          <div className="absolute bottom-48 right-1/4 w-1 h-1 bg-slate-200/20 rounded-full animate-luxury-float" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="flex items-center justify-center h-64">
          <div className="w-20 h-20 relative">
            <div className="absolute inset-0 rounded-full border-t-2 border-slate-200 animate-spin"></div>
            <div className="absolute inset-0 rounded-full border-t-2 border-l-2 border-slate-800 animate-spin"></div>
          </div>
          <p className="mt-4 text-slate-600 font-light">Se încarcă produsele...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="luxury-page-bg luxury-floating-elements min-h-screen pt-32 sm:pt-36 md:pt-40 lg:pt-44">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
          <div className="text-center">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="h-10 w-10 text-red-500" />
            </div>
            <h2 className="text-2xl font-light text-slate-900 mb-4">A apărut o eroare</h2>
            <p className="text-slate-600 font-light mb-8">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-6 py-3 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors duration-300 font-light"
            >
              <RefreshCw className="h-5 w-5 mr-2" strokeWidth={1.5} />
              Reîncarcă pagina
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title="Accesorii pentru Lumânări | Atomra Home Romania"
        description="Descoperă accesoriile noastre premium pentru lumânări din ceară naturală. Tot ce ai nevoie pentru a întreține și a te bucura de lumânările Atomra."
        keywords="accesorii lumânări, fitile, recipiente, ustensile lumânări, întreținere lumânări, instrumente pentru lumânări"
        url="https://atomra-home-romania.com/accesorii"
      />
      
      <div className="luxury-page-bg luxury-floating-elements min-h-screen">
        {/* Luxury floating decorative elements */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-32 left-16 w-1 h-1 bg-slate-300/20 rounded-full animate-luxury-float"></div>
          <div className="absolute top-48 right-24 w-0.5 h-0.5 bg-slate-200/30 rounded-full animate-luxury-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-32 left-1/4 w-0.5 h-0.5 bg-slate-300/25 rounded-full animate-luxury-float" style={{ animationDelay: '4s' }}></div>
          <div className="absolute bottom-48 right-1/4 w-1 h-1 bg-slate-200/20 rounded-full animate-luxury-float" style={{ animationDelay: '1s' }}></div>
        </div>
      
        <div className="pt-32 sm:pt-36 md:pt-40 lg:pt-44 relative z-10">
          {/* Header Section */} 
          <section className="py-6 sm:py-8 bg-white">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
              <div className="mb-6">
                <Link  
                  to="/"  
                  className="flex items-center space-x-2 text-slate-600 hover:text-slate-800 transition-colors duration-200 group" 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
                > 
                  <ArrowLeft size={18} strokeWidth={1.5} className="group-hover:-translate-x-1 transition-transform duration-200" />
                  <span className="font-light">Înapoi la Pagina Principală</span>
                </Link> 
              </div>
            
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <motion.h1 
                  className="text-3xl sm:text-4xl lg:text-5xl font-extralight text-slate-900 mb-4 tracking-tight"
                >
                  Accesorii
                </motion.h1>
                <div className="w-16 h-px bg-slate-300 mx-auto mb-4"></div>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
                  Unelte și recipiente esențiale pentru a-ți îmbunătăți experiența cu lumânările. 
                  Tot ce ai nevoie pentru a întreține și a te bucura de lumânările Atomra.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Products Grid */} 
          <section className="py-12 sm:py-16 bg-slate-50" ref={sectionRef}>
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
              {accessories.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                  <ShoppingCart className="w-16 h-16 mx-auto text-slate-300 mb-6" strokeWidth={1} />
                  <h2 className="text-xl font-light text-slate-800 mb-4">Nu am găsit produse în această colecție</h2>
                  <Link
                    to="/toate-produsele"
                    className="inline-flex items-center px-6 py-3 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors duration-300 font-light"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    <ShoppingCart size={18} className="mr-2" strokeWidth={1.5} />
                    Vezi toate produsele
                  </Link>
                </div>
              ) : (
                <AnimatePresence>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                  >
                    {accessories.map((accessory, index) => (
                      <motion.div
                        key={accessory.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={visibleProducts[index] ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.5, delay: Math.min(index * 0.1, 0.6) }}
                        className="group"
                        onMouseEnter={() => setHoveredProduct(accessory.id)}
                        onMouseLeave={() => setHoveredProduct(null)}
                      >
                        <div className="luxury-card overflow-hidden hover:shadow-2xl transition-all duration-500 relative rounded-lg">
                          <div className="relative overflow-hidden bg-slate-50/50">
                            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 h-full flex flex-col border border-slate-100">
                              {/* Product Image */}
                              <Link 
                                to={`/product/${accessory.slug}`} 
                                className="block relative overflow-hidden"
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                              >
                                <div className="aspect-square relative">
                                  <LazyImage
                                    src={accessory.images && accessory.images.length > 0 ? accessory.images[0] : getAssetPath('/placeholder-image.jpg')}
                                    alt={accessory.name}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                    aspectRatio="square"
                                    loading="lazy"
                                  />
                                </div>
                              
                                {/* Add to Cart Icon - Bottom Right - Always visible */}
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-10">
                                  {/* Hover effect */}
                                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                  {/* In stock indicator */}
                                  {accessory.in_stock ? (
                                    <div className="absolute top-3 left-3 bg-green-100 text-green-800 text-xs py-1 px-2 rounded-md font-light">
                                      În stoc
                                    </div>
                                  ) : (
                                    <div className="absolute top-3 left-3 bg-red-100 text-red-800 text-xs py-1 px-2 rounded-md font-light">
                                      Stoc epuizat
                                    </div>
                                  )}

                                  {/* Add to cart button */}
                                  <div className="absolute bottom-3 right-3 z-10">
                                    <AddToCartButton 
                                      product={accessory}
                                      variant="icon"
                                      size="lg"
                                      disabled={!accessory.in_stock}
                                    />
                                  </div>
                                </div>
                              </Link>

                              {/* Product Info */}
                              <div className="p-4 flex-1 flex flex-col">
                                <Link 
                                  to={`/product/${accessory.slug}`}
                                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                  className="block mb-2"
                                >
                                  <h2 className="text-lg font-light text-slate-900 mb-2 hover:text-slate-700 transition-colors line-clamp-2">
                                    {accessory.name}
                                  </h2>
                                </Link>
                        
                                <p className="text-slate-600 text-sm mb-4 line-clamp-2 font-light flex-grow">
                                  {accessory.description}
                                </p>
                        
                                <div className="mt-auto space-y-3">
                                  {renderStars(accessory.rating)}
                          
                                  <div className="flex items-center justify-between">
                                    <p className="text-lg font-light text-slate-900 tracking-wide">
                                      {accessory.price.toFixed(0)} Lei
                                    </p>
                            
                                    <AnimatePresence>
                                      {hoveredProduct === accessory.id && (
                                        <motion.div
                                          initial={{ opacity: 0, y: 10 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          exit={{ opacity: 0, y: 10 }}
                                          transition={{ duration: 0.2 }}
                                        >
                                          <Link 
                                            to={`/product/${accessory.slug}`}
                                            className="flex items-center text-xs text-slate-600 hover:text-slate-900 transition-colors"
                                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                          >
                                            Vezi detalii
                                            <ArrowRight size={12} className="ml-1" />
                                          </Link>
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default AccessoriesCollectionPage;

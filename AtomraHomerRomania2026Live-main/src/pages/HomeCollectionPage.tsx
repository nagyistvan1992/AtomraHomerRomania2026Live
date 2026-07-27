import React, { useEffect, useRef, useState } from 'react';
import { Star, ArrowLeft, ShoppingCart, AlertCircle, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { getCatalogProductsByCategory } from '../lib/catalog';
import SEOHead from '../components/SEOHead';
import LazyImage from '../components/LazyImage'; 
import AddToCartButton from '../components/AddToCartButton';
import { motion } from 'framer-motion';
import { getPlaceholderImage, getPreferredImage } from '../utils/imageSources';
import { getSiteUrl } from '../utils/siteConfig';
import { generateBreadcrumbStructuredData } from '../utils/seoUtils';
import type { CatalogProduct as Product } from '../data/catalog';

const HomeCollectionPage = () => {
  const breadcrumbStructuredData = generateBreadcrumbStructuredData([
    { name: 'Home', url: getSiteUrl('/') },
    { name: 'Home Collection', url: getSiteUrl('/home-collection') },
  ]);
  const [visibleProducts, setVisibleProducts] = useState<boolean[]>([]);
  const [homeProducts, setHomeProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  useLanguage();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const fetchHomeProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const uniqueProducts = getCatalogProductsByCategory('home-collection') as Product[];

        setHomeProducts([]);
        setTimeout(() => {
          setHomeProducts(uniqueProducts);
          setVisibleProducts(new Array(uniqueProducts.length).fill(false));
        }, 10);
      } catch (err) {
        console.error('Error loading home collection:', err);
        setError('Failed to load products');
        setHomeProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeProducts();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            homeProducts.forEach((_, index) => {
              setTimeout(() => {
                setVisibleProducts(prev => {
                  const newVisible = [...prev];
                  newVisible[index] = true;
                  return newVisible;
                });
              }, index * 80);
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
  }, [homeProducts]);

  const renderRating = (rating: number) => {
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
        title="Colecția pentru acasă | Lumânări din ceară naturală | Atomra Home Romania"
        description="Descoperă colecția noastră de lumânări din ceară naturală pentru casă. Produse reîncărcabile, personalizabile și sustenabile care schimbă atmosfera căminului tău."
        keywords="lumânări pentru casă, ceară naturală, ceară de soia, lumânări reîncărcabile, lumânări pentru decor, atmosferă, lumânări ecologice"
        url={getSiteUrl('/home-collection')}
        structuredData={breadcrumbStructuredData}
      />
    
      <div className="luxury-page-bg luxury-floating-elements min-h-screen">
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
                  <span className="font-light">Înapoi la pagina principală</span>
                </Link>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extralight text-slate-900 mb-4 tracking-tight">
                  Colecția Home
                </h1>
                <div className="w-16 h-px bg-slate-300 mx-auto mb-4"></div>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
                  Transformă-ți spațiul de locuit cu colecția noastră de lumânări emblematice.
                  Fiecare parfum este ales cu grijă pentru a crea atmosfera potrivită pentru casa ta.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Products Grid */} 
          <section className="py-12 sm:py-16 bg-slate-50" ref={sectionRef}>
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
              {homeProducts.length === 0 ? (
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                  {homeProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: visibleProducts[index] ? 1 : 0,
                        y: visibleProducts[index] ? 0 : 20
                      }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                    >
                      <div className="aspect-square overflow-hidden relative">
                        <Link 
                          to={`/product/${product.slug}`}
                          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                          className="block relative h-full w-full overflow-hidden"
                        >
                          <LazyImage
                            src={getPreferredImage(product.images, getPlaceholderImage())}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="pointer-events-none absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </Link>
                      </div>
                      
                      <div className="p-4 flex flex-col h-[calc(100%-100%)]">
                        <div className="mb-2">
                          {renderRating(product.rating)}
                        </div>
                        
                        <Link
                          to={`/product/${product.slug}`}
                          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                          className="block"
                        >
                          <h3 className="text-lg font-light text-slate-900 mb-2 line-clamp-2 hover:text-slate-700 transition-colors duration-200">
                            {product.name}
                          </h3>
                        </Link>
                        
                        <p className="text-sm text-slate-600 mb-3 line-clamp-2 font-light">
                          {product.description} 
                        </p>
                        
                        <div className="flex items-center justify-between mt-auto">
                          <span className="text-lg font-medium text-slate-900">
                            {product.price.toFixed(2)} LEI
                          </span>
                          <AddToCartButton
                            product={product}
                            className="px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors duration-200 text-sm font-light"
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default HomeCollectionPage;


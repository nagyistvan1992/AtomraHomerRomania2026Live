import React, { useEffect, useRef, useState } from 'react';
import { Star, ArrowLeft, ShoppingBag, Search, Filter, Grid, List, AlertCircle, RefreshCw, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import SEOHead from '../components/SEOHead';
import LazyImage from '../components/LazyImage'; 
import AddToCartButton from '../components/AddToCartButton';
import { motion, AnimatePresence } from 'framer-motion';
import { getPlaceholderImage, getPreferredImage } from '../utils/imageSources';
import { getCatalogCategories, getCatalogProducts } from '../lib/catalog';
import type { CatalogProduct as Product } from '../data/catalog';

const AllProductsPage = () => {
  const [visibleProducts, setVisibleProducts] = useState<boolean[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); 
  const [categories, setCategories] = useState<{id: string; name: string}[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all'); 
  const [sortBy, setSortBy] = useState('name'); 
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid'); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const sectionRef = useRef<HTMLDivElement>(null);
  useLanguage();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length === 0) return;

    // Apply filtering and sorting in a single useEffect to avoid multiple re-renders
    let filtered = [...products];
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Apply search filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        default:
          return a.name.localeCompare(b.name);
      }
    });
    
    setFilteredProducts(filtered);
    // Reset visibility state when filtered products change
    setVisibleProducts(new Array(filtered.length).fill(false));
    
    // After setting filtered products, trigger visibility animation with a small delay
    setTimeout(() => {
      filtered.forEach((_, index) => {
        setTimeout(() => {
          setVisibleProducts(prev => {
            const newVisible = [...prev];
            if (index < newVisible.length) {
              newVisible[index] = true;
            }
            return newVisible;
          });
        }, index * 50);
      });
    }, 100);
    
  }, [products, selectedCategory, sortBy, searchQuery]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const uniqueProducts = getCatalogProducts();
      const categoriesData = getCatalogCategories().map((category) => ({
        id: category.id,
        name: category.name
      }));

      setCategories(categoriesData);

      setProducts(uniqueProducts);
      setFilteredProducts(uniqueProducts);
      
      // Initialize visibility state
      const initialVisibility = new Array(uniqueProducts.length).fill(false);
      setVisibleProducts(initialVisibility);
      
      // Animate products appearing with a staggered delay
      setTimeout(() => {
        uniqueProducts.forEach((_, index) => {
          setTimeout(() => {
            setVisibleProducts(prev => {
              const newVisible = [...prev];
              newVisible[index] = true;
              return newVisible;
            });
          }, index * 50);
        });
      }, 300);
      
    } catch (err) {
      console.error('Error loading catalog products:', err);
      setError('Failed to load products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => { 
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { 
            filteredProducts.forEach((_, index) => {
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
  }, [filteredProducts]);

  const renderStars = (rating: number) => (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={14}
          strokeWidth={1.5}
          className={i < Math.floor(rating) ? 'text-amber-500 fill-current' : 'text-gray-300'}
        />
      ))}
      <span className="ml-1 text-xs text-gray-500">{rating.toFixed(1)}</span>
    </div>
  );

  if (loading) {
    return (
      <div className="luxury-page-bg luxury-floating-elements min-h-screen pt-32 sm:pt-36 md:pt-40 lg:pt-44">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center h-64">
            <div className="w-20 h-20 relative">
              <div className="absolute inset-0 rounded-full border-t-2 border-slate-200 animate-spin"></div>
              <div className="absolute inset-0 rounded-full border-t-2 border-l-2 border-slate-800 animate-spin"></div>
            </div>
            <p className="mt-4 text-slate-600 font-light">Se încarcă produsele...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="luxury-page-bg luxury-floating-elements min-h-screen pt-32 sm:pt-36 md:pt-40 lg:pt-44">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-red-50 mb-6">
              <AlertCircle className="h-10 w-10 text-red-500" />
            </div>
            <h2 className="text-2xl font-light text-slate-900 mb-2">A apărut o eroare</h2>
            <p className="text-slate-600 mb-6 font-light">{error}</p>
            <button
              onClick={fetchProducts}
              className="flex items-center px-6 py-3 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-all duration-300 font-light"
            >
              <RefreshCw className="h-5 w-5 mr-2" strokeWidth={1.5} />
              Încearcă din nou
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title="Toate produsele | Lumânări din ceară naturală | Atomra Home Romania"
        description="Descoperă întreaga noastră colecție de lumânări din ceară naturală și accesorii premium. Produse personalizabile, elegante și sustenabile pentru orice ocazie."
        keywords="lumânări, ceară naturală, ceară de soia, lumânări reîncărcabile, lumânări ecologice, lumânări personalizabile, accesorii lumânări"
        url="https://atomrahomeromania.ro/toate-produsele"
      />
      
      <div className="luxury-page-bg luxury-floating-elements min-h-screen">
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-32 left-16 w-1 h-1 bg-slate-300/20 rounded-full animate-luxury-float"></div>
          <div className="absolute top-48 right-24 w-0.5 h-0.5 bg-slate-200/30 rounded-full animate-luxury-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-32 left-1/4 w-0.5 h-0.5 bg-slate-300/25 rounded-full animate-luxury-float" style={{ animationDelay: '4s' }}></div>
          <div className="absolute bottom-48 right-1/4 w-1 h-1 bg-slate-200/20 rounded-full animate-luxury-float" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="pt-32 sm:pt-36 md:pt-40 lg:pt-44 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6">
            {/* Header with Back Link */}
            <div className="mb-8">
              <Link 
                to="/" 
                className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors duration-200 group mb-6"
              >
                <ArrowLeft size={18} strokeWidth={1.5} className="group-hover:-translate-x-1 transition-transform duration-200" />
                <span className="font-light">Înapoi la pagina principală</span>
              </Link>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extralight text-slate-900 mb-4 tracking-tight">
                  Toate Produsele
                </h1>
                <div className="w-16 h-px bg-slate-300 mx-auto mb-4"></div>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
                  Descoperă întreaga noastră colecție de lumânări din ceară naturală și accesorii premium
                </p>
              </motion.div>
            </div>

            {/* Filters and Controls */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-slate-100">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex flex-col sm:flex-row gap-4 flex-1 md:flex-initial md:w-2/3">
                  {/* Search */}
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search size={16} className="text-slate-400" /> 
                    </div>
                    <input
                      type="text"
                      placeholder="Caută produse..."
                      value={searchQuery}
                      onChange={handleSearch}
                      className="pl-10 pr-4 py-2.5 w-full border border-slate-200 rounded-md focus:ring-2 focus:ring-slate-400 focus:border-transparent text-sm font-light bg-white"
                    />
                  </div>
                  
                  {/* Category Filter */}
                  <div className="relative flex-1 sm:max-w-xs">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Filter size={16} className="text-slate-400" />
                    </div>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="pl-10 pr-4 py-2.5 w-full border border-slate-200 rounded-md focus:ring-2 focus:ring-slate-400 focus:border-transparent text-sm font-light bg-white appearance-none"
                    >
                      <option value="all">Toate Categoriile</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4">
                  {/* Sort Dropdown */}
                  <div className="flex-1 sm:flex-initial">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full border border-slate-200 rounded-md focus:ring-2 focus:ring-slate-400 focus:border-transparent px-3 py-2.5 text-sm font-light bg-white"
                    >
                      <option value="name">Sortează după: Nume</option>
                      <option value="price-low">Preț: De la mic la mare</option>
                      <option value="price-high">Preț: De la mare la mic</option>
                      <option value="rating">Rating</option>
                      <option value="newest">Cele mai noi</option>
                    </select>
                  </div>
                  
                  {/* View Toggle */}
                  <div className="flex space-x-2 border border-slate-200 rounded-md overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2.5 ${viewMode === 'grid' ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 hover:bg-slate-50'}`}
                      aria-label="Grid view"
                    >
                      <Grid size={16} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2.5 ${viewMode === 'list' ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 hover:bg-slate-50'}`}
                      aria-label="List view"
                    >
                      <List size={16} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {selectedCategory !== 'all' && (
                  <div className="inline-flex items-center py-1 px-3 rounded-full text-xs font-light bg-slate-900 text-white">
                    {selectedCategory}
                    <button 
                      onClick={() => setSelectedCategory('all')} 
                      className="ml-2 hover:text-slate-300"
                    >
                      <X size={12} />
                    </button>
                  </div>
                )}
                {searchQuery && (
                  <div className="inline-flex items-center py-1 px-3 rounded-full text-xs font-light bg-slate-100 text-slate-800">
                    "{searchQuery}"
                    <button 
                      onClick={() => setSearchQuery('')} 
                      className="ml-2 hover:text-slate-500"
                    >
                      <X size={12} />
                    </button>
                  </div>
                )}
                <div className="ml-auto text-xs text-slate-500 font-light">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'produs' : 'produse'} găsite
                </div>
              </div>
            </div>

            {/* Products Grid or List */}
            <AnimatePresence mode="wait">
              {filteredProducts.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-16 bg-white rounded-lg shadow-sm border border-slate-100"
                >
                  <ShoppingBag className="w-16 h-16 mx-auto text-slate-300 mb-6" strokeWidth={1} />
                  <h2 className="text-xl font-light text-slate-800 mb-3">
                    Nu am găsit produse
                  </h2>
                  <p className="text-slate-500 max-w-md mx-auto mb-6 font-light">
                    {searchQuery 
                      ? `Nu s-au găsit rezultate pentru "${searchQuery}"` 
                      : selectedCategory !== 'all'
                        ? `Nu am găsit produse în categoria "${selectedCategory}"`
                        : 'Niciun produs disponibil în acest moment'}
                  </p>
                  {(searchQuery || selectedCategory !== 'all') && (
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('all');
                      }}
                      className="inline-flex items-center px-6 py-3 border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 rounded-md shadow-sm transition-colors duration-300 font-light"
                    >
                      <RefreshCw size={16} className="mr-2" strokeWidth={1.5} />
                      Vezi toate produsele
                    </button>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="products"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {filteredProducts.map((product, index) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, y: 30 }}
                          animate={visibleProducts[index] ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                          transition={{ duration: 0.5, delay: Math.min(index * 0.1, 0.8) }}
                          className="group"
                        >
                          <div className="relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 h-full flex flex-col border border-slate-100">
                            {/* Main Product Image - Clickable */}
                            <Link
                              to={`/product/${product.slug}`}
                              className="block relative overflow-hidden aspect-square"
                              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            >
                              <LazyImage
                                src={getPreferredImage(product.images, getPlaceholderImage())}
                                alt={product.name}
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                aspectRatio="square"
                                loading="lazy"
                              />
                              
                              {/* Optional overlay effect */}
                              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                              
                              {/* In stock indicator */}
                              {product.in_stock ? (
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
                                  product={product}
                                  variant="icon"
                                  size="lg"
                                  disabled={!product.in_stock}
                                />
                              </div>
                            </Link>
                            
                            {/* Product Info */}
                            <div className="p-4 flex-1 flex flex-col">
                              <Link 
                                to={`/product/${product.slug}`}
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                className="block"
                              > 
                                <h2 className="text-lg font-light text-slate-900 mb-2 line-clamp-2 hover:text-slate-700 transition-colors"> 
                                  {product.name}
                                </h2>
                              </Link>
                              
                              <p className="text-slate-600 font-light text-sm mb-4 line-clamp-2 flex-1">
                                {product.description}
                              </p>
                              
                              <div className="mt-auto space-y-2">
                                <div className="flex items-center justify-between">
                                  <div className="text-sm">
                                    {renderStars(product.rating)}
                                  </div>
                                  <span className="text-sm text-slate-500 font-light">
                                    {product.reviews} {product.reviews === 1 ? 'review' : 'reviews'}
                                  </span>
                                </div>
                                
                                <div className="flex items-center justify-between mt-2">
                                  <span className="text-xl font-light text-slate-900">
                                    {product.price.toFixed(0)} Lei
                                  </span>
                                  <span className="text-xs bg-slate-100 px-2 py-1 rounded-full text-slate-600">
                                    {product.category}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredProducts.map((product, index) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={visibleProducts[index] ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                          transition={{ duration: 0.5, delay: Math.min(index * 0.1, 1) }}
                          className="group"
                        >
                          <div className="flex bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 border border-slate-100">
                            {/* Product Image */}
                            <Link
                              to={`/product/${product.slug}`}
                              className="relative w-32 sm:w-48 flex-shrink-0"
                              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            >
                              <LazyImage
                                src={getPreferredImage(product.images, getPlaceholderImage())}
                                alt={product.name}
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                aspectRatio="square"
                                loading="lazy"
                              />
                              
                              {/* In stock indicator */}
                              {!product.in_stock && (
                                <div className="absolute top-2 left-2 bg-red-100 text-red-800 text-xs py-1 px-2 rounded-md font-light">
                                  Stoc epuizat
                                </div>
                              )}
                            </Link>
                            
                            {/* Product Info */}
                            <div className="flex-1 p-4 flex flex-col">
                              <div className="flex-1">
                                <Link 
                                  to={`/product/${product.slug}`}
                                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                  className="block"
                                >
                                  <h2 className="text-lg font-light text-slate-900 mb-2 hover:text-slate-700 transition-colors">
                                    {product.name}
                                  </h2>
                                </Link>
                                
                                <p className="text-slate-600 font-light text-sm mb-4 line-clamp-2">
                                  {product.description}
                                </p>
                                
                                <div className="flex items-center space-x-4 text-sm">
                                  {renderStars(product.rating)}
                                  <span className="text-slate-500 font-light">
                                    {product.reviews} {product.reviews === 1 ? 'review' : 'reviews'}
                                  </span>
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between mt-4">
                                <div>
                                  <span className="text-xl font-light text-slate-900 mr-3">
                                    {product.price.toFixed(0)} Lei
                                  </span>
                                  <span className="text-xs bg-slate-100 px-2 py-1 rounded-full text-slate-600">
                                    {product.category}
                                  </span>
                                </div>
                                
                                <AddToCartButton
                                  product={product}
                                  size="sm"
                                  disabled={!product.in_stock}
                                />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProductsPage;


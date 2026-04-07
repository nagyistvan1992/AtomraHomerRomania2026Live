import React, { useState, useEffect, useRef } from 'react';
import { X, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { getPlaceholderImage, getPreferredImage } from '../utils/imageSources';
import { searchCatalogProducts } from '../lib/catalog';
import type { CatalogProduct as Product } from '../data/catalog';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // Focus on search input when modal opens
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    } else {
      setIsVisible(false);
      setSearchQuery('');
      setSearchResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    const searchProducts = async () => {
      if (searchQuery.trim() === '') {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      
      try {
        setSearchResults(searchCatalogProducts(searchQuery));
      } catch (err) {
        console.error('Error searching catalog products:', err);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce search
    const timer = setTimeout(() => {
      if (searchQuery.trim().length >= 2) {
        searchProducts();
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleResultClick = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-2xl transform transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}>
        <div className="max-w-4xl mx-auto p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-light text-gray-900 tracking-wide">
              {t('search.title')}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>

          {/* Search Input */}
          <div className="relative mb-8">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={20} strokeWidth={1.5} className="text-gray-400" />
            </div>
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t('search.placeholder')}
              className="w-full pl-12 pr-4 py-4 text-lg border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent font-light"
            />
          </div>

          {/* Search Results */}
          <div className="max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-400 mx-auto mb-4"></div>
                <p className="text-gray-500 font-light">{t('common.loading')}</p>
              </div>
            ) : searchQuery.length >= 2 && searchResults.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 font-light text-lg">
                  {t('search.noResults')}
                </p>
                <p className="text-gray-400 font-light text-sm mt-2">
                  {t('search.tryDifferent')}
                </p>
              </div>
            ) : searchQuery.length >= 2 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.slug}`}
                    onClick={handleResultClick}
                    className="group block bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300"
                  >
                    <div className="aspect-square bg-gray-100 overflow-hidden">
                      <img
                        src={getPreferredImage(product.images, getPlaceholderImage())}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = getPlaceholderImage();
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-light text-gray-900 mb-2 group-hover:text-gray-700 transition-colors duration-200">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2 font-light line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-900 font-light">
                          {product.price.toFixed(0)} {t('common.lei')}
                        </span>
                        <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
                          {product.category}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-light text-gray-900 mb-4">
                  {t('search.quickLinks')}
                </h3>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/home-collection"
                    onClick={handleResultClick}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors duration-200 text-sm font-light"
                  >
                    {t('nav.home')}
                  </Link>
                  <Link
                    to="/events-collection"
                    onClick={handleResultClick}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors duration-200 text-sm font-light"
                  >
                    {t('nav.events')}
                  </Link>
                  <Link
                    to="/accesorii"
                    onClick={handleResultClick}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors duration-200 text-sm font-light"
                  >
                    {t('nav.accessories')}
                  </Link>
                  <Link
                    to="/coming-soon"
                    onClick={handleResultClick}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors duration-200 text-sm font-light"
                  >
                    {t('nav.coming')}
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchModal;

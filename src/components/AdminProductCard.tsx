import React from 'react';
import { Edit3, Trash2, Star, Eye, ShoppingBag, Tag, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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
  created_at: string;
}

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  viewMode: 'grid' | 'list';
}

const AdminProductCard: React.FC<ProductCardProps> = ({
  product,
  onEdit,
  onDelete,
  viewMode
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ro-RO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (viewMode === 'grid') {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-shadow duration-200 hover:shadow-md"
      >
        <div className="relative h-48 bg-gray-100">
          {product.images && product.images.length > 0 ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder-image.jpg';
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ShoppingBag size={32} className="text-gray-400" />
            </div>
          )}
          <div className="absolute top-2 right-2 flex space-x-2">
            <button
              onClick={() => onEdit(product)}
              className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow duration-200 group"
              title="Edit product"
            >
              <Edit3 size={16} className="text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
            </button>
            <button
              onClick={() => onDelete(product.id)}
              className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow duration-200 group"
              title="Delete product"
            >
              <Trash2 size={16} className="text-red-500 group-hover:text-red-700 transition-colors duration-200" />
            </button>
          </div>
          <div className={`absolute bottom-2 left-2 px-2 py-1 rounded-full text-xs font-medium ${
            product.in_stock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {product.in_stock ? 'In Stock' : 'Out of Stock'}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-light text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
          <p className="text-sm text-gray-500 mb-2 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between">
            <p className="text-lg font-light text-gray-900">{product.price.toFixed(0)} Lei</p>
            <div className="flex items-center space-x-1">
              <Star size={14} className="text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600">{product.rating}</span>
            </div>
          </div>
          <div className="mt-3 flex justify-between items-center">
            <div className="flex items-center space-x-1">
              <Tag size={14} className="text-gray-400" />
              <span className="text-xs text-gray-500">{product.category}</span>
            </div>
            <Link
              to={`/product/${product.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:text-blue-800 flex items-center"
            >
              <Eye size={12} className="mr-1" />
              View
            </Link>
          </div>
          <div className="mt-2 text-xs text-gray-400 flex items-center">
            <Calendar size={12} className="mr-1" />
            Added: {formatDate(product.created_at)}
          </div>
        </div>
      </motion.div>
    );
  }
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex bg-white border border-gray-200 rounded-lg overflow-hidden transition-shadow duration-200 hover:shadow-md"
    >
      <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 bg-gray-100">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder-image.jpg';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ShoppingBag size={24} className="text-gray-400" />
          </div>
        )}
      </div>
      
      <div className="flex-1 p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-light text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
            <p className="text-sm text-gray-500 mb-2 line-clamp-1 sm:line-clamp-2">{product.description}</p>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              <p className="text-lg font-light text-gray-900">{product.price.toFixed(0)} Lei</p>
              <div className="flex items-center space-x-1">
                <Star size={14} className="text-yellow-400 fill-current" />
                <span className="text-sm text-gray-600">{product.rating}</span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                product.in_stock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {product.in_stock ? 'In Stock' : 'Out of Stock'}
              </span>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {product.category}
              </span>
            </div>
            <div className="mt-2 text-xs text-gray-400 hidden sm:flex items-center">
              <Calendar size={12} className="mr-1" />
              Added: {formatDate(product.created_at)}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 ml-4">
            <Link
              to={`/product/${product.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors duration-200 flex items-center justify-center"
              title="View product"
            >
              <Eye size={18} className="text-blue-600" />
            </Link>
            <button
              onClick={() => onEdit(product)}
              className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center"
              title="Edit product"
            >
              <Edit3 size={18} className="text-gray-600" />
            </button>
            <button
              onClick={() => onDelete(product.id)}
              className="p-2 bg-red-100 rounded-lg hover:bg-red-200 transition-colors duration-200 flex items-center justify-center"
              title="Delete product"
            >
              <Trash2 size={18} className="text-red-500" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminProductCard;
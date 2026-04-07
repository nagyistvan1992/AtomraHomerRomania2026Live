import React, { useState, useRef } from 'react';
import { Trash2, Save, Upload, FileImage } from 'lucide-react';
import AdminImageUploader from './AdminImageUploader';
import slugify from 'slugify';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductFormData {
  id?: string;
  name: string;
  slug?: string;
  category: string;
  price: string | number;
  description: string;
  long_description: string;
  features: string[];
  images: string[];
  tags: string[];
  in_stock: boolean;
  rating: number;
  reviews: number;
  meta_title?: string;
  meta_description?: string;
}

interface ProductFormProps {
  initialData?: ProductFormData;
  categories: { id: string; name: string }[];
  onSave: (productData: ProductFormData & { slug: string; price: number }) => void;
  onCancel: () => void;
  loading: boolean;
}

const AdminProductForm: React.FC<ProductFormProps> = ({
  initialData = {
    name: '',
    category: '',
    price: '',
    description: '',
    long_description: '',
    features: [''],
    images: [''],
    tags: [''],
    in_stock: true,
    rating: 5,
    reviews: 0,
    meta_title: '',
    meta_description: ''
  },
  categories,
  onSave,
  onCancel,
  loading
}) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<'basic' | 'images' | 'seo'>('basic');
  const [showImageUploader, setShowImageUploader] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.price) newErrors.price = 'Price is required';
    if (parseFloat(formData.price.toString()) < 0) newErrors.price = 'Price cannot be negative';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.images.length === 0 || !formData.images[0].trim()) {
      newErrors.images = 'At least one image is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Generate slug if not provided
      const dataToSave = {
        ...formData,
        slug: formData.slug || slugify(formData.name, { lower: true, strict: true }),
        price: parseFloat(formData.price.toString())
      };
      
      onSave(dataToSave);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked
    });
  };

  const handleArrayItemChange = (field: 'features' | 'images' | 'tags', index: number, value: string) => {
    const updatedArray = [...formData[field]];
    updatedArray[index] = value;
    setFormData({
      ...formData,
      [field]: updatedArray
    });
    
    // Clear error when user types
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: ''
      });
    }
  };

  const handleAddArrayItem = (field: 'features' | 'images' | 'tags') => {
    setFormData({
      ...formData,
      [field]: [...formData[field], '']
    });
  };

  const handleRemoveArrayItem = (field: 'features' | 'images' | 'tags', index: number) => {
    const updatedArray = [...formData[field]];
    updatedArray.splice(index, 1);
    
    setFormData({
      ...formData,
      [field]: updatedArray.length > 0 ? updatedArray : ['']
    });
  };
  
  const handleImageUploaded = (url: string) => {
    // Add the new image URL to the images array
    const updatedImages = [...formData.images];
    
    // If the first image is empty, replace it
    if (updatedImages.length === 1 && !updatedImages[0]) {
      updatedImages[0] = url;
    } else {
      updatedImages.push(url);
    }
    
    setFormData({
      ...formData,
      images: updatedImages
    });
    
    // Clear any image errors
    if (errors.images) {
      setErrors({
        ...errors,
        images: ''
      });
    }
    
    // Hide the uploader
    setShowImageUploader(false);
  };
  
  const handleRemoveImage = (index: number) => {
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
    
    setFormData({
      ...formData,
      images: updatedImages.length > 0 ? updatedImages : ['']
    });
  };
  
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    // Process each file
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          // In a real app, you would upload this to your server or cloud storage
          // For demo purposes, we'll just use the data URL
          alert('In a real app, this would upload the file to your server or cloud storage');
          
          // Extract file name for alt text
          // Add the new image
          const updatedImages = [...formData.images];
          
          // If the first image is empty, replace it
          if (updatedImages.length === 1 && !updatedImages[0]) {
            updatedImages[0] = event.target.result;
          } else {
            updatedImages.push(event.target.result);
          }
          
          setFormData({
            ...formData,
            images: updatedImages
          });
        }
      };
      reader.readAsDataURL(file);
    });
    
    // Reset the input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          type="button"
          onClick={() => setActiveTab('basic')}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'basic'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Basic Info
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('images')}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'images'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Images
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('seo')}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'seo'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          SEO & Meta
        </button>
      </div>
      
      {/* Basic Info Tab */}
      <AnimatePresence mode="wait">
        {activeTab === 'basic' && (
          <motion.div 
            key="basic-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.name ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter product name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Slug (URL)
                </label>
                <div className="flex">
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="auto-generated-from-name"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (formData.name) {
                        setFormData({
                          ...formData,
                          slug: slugify(formData.name, { lower: true, strict: true })
                        });
                      }
                    }}
                    className="ml-2 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700 hover:bg-gray-100"
                  >
                    Generate
                  </button>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Leave empty to auto-generate from product name
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.category ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (Lei) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.price ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-600">{errors.price}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Short Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.description ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Brief product description"
                  rows={3}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="in_stock"
                  name="in_stock"
                  checked={formData.in_stock}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="in_stock" className="text-sm font-medium text-gray-700">
                  In Stock
                </label>
              </div>
            </div>
            
            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Long Description
                </label>
                <textarea
                  name="long_description"
                  value={formData.long_description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Detailed product description"
                  rows={6}
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Features
                  </label>
                  <button
                    type="button"
                    onClick={() => handleAddArrayItem('features')}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    + Add Feature
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => handleArrayItemChange('features', index, e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Product feature"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveArrayItem('features', index)}
                        className="p-2 text-red-500 hover:text-red-700"
                        disabled={formData.features.length <= 1}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Tags
                  </label>
                  <button
                    type="button"
                    onClick={() => handleAddArrayItem('tags')}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    + Add Tag
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.tags.map((tag, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={tag}
                        onChange={(e) => handleArrayItemChange('tags', index, e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Product tag"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveArrayItem('tags', index)}
                        className="p-2 text-red-500 hover:text-red-700"
                        disabled={formData.tags.length <= 1}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rating (0-5)
                  </label>
                  <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    max="5"
                    step="0.1"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reviews Count
                  </label>
                  <input
                    type="number"
                    name="reviews"
                    value={formData.reviews}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Images Tab */}
        {activeTab === 'images' && (
          <motion.div 
            key="images-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Product Images</h3>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowImageUploader(true)}
                    className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Upload size={16} className="mr-2" />
                    Upload Image
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={handleFileInputChange}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <FileImage size={16} className="mr-2" />
                    From Computer
                  </button>
                </div>
              </div>
              
              {showImageUploader ? (
                <div className="mb-6">
                  <AdminImageUploader
                    onImageUploaded={handleImageUploaded}
                    showAltTextInput={true}
                  />
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setShowImageUploader(false)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <AdminImageUploader
                    onImageUploaded={handleImageUploaded}
                    showAltTextInput={true}
                    existingImages={formData.images.filter(img => img.trim() !== '')}
                    onRemoveExistingImage={handleRemoveImage}
                  />
                  
                  {errors.images && (
                    <p className="mt-1 text-sm text-red-600">{errors.images}</p>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
        
        {/* SEO & Meta Tab */}
        {activeTab === 'seo' && (
          <motion.div 
            key="seo-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meta Title (for SEO)
              </label>
              <input
                type="text"
                name="meta_title"
                value={formData.meta_title || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Product meta title (leave empty to use product name)"
              />
              <p className="mt-1 text-xs text-gray-500">
                Recommended length: 50-60 characters. Leave empty to use product name.
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meta Description (for SEO)
              </label>
              <textarea
                name="meta_description"
                value={formData.meta_description || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Product meta description (leave empty to use short description)"
                rows={4}
              />
              <p className="mt-1 text-xs text-gray-500">
                Recommended length: 150-160 characters. Leave empty to use product description.
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-2">SEO Preview</h4>
              <div className="border border-gray-200 rounded-lg p-4 bg-white">
                <p className="text-blue-600 text-lg font-medium line-clamp-1">
                  {formData.meta_title || formData.name || 'Product Title'}
                </p>
                <p className="text-green-600 text-sm">
                  https://atomrahomeromania.ro/product/{formData.slug || slugify(formData.name, { lower: true, strict: true }) || 'product-slug'}
                </p>
                <p className="text-gray-600 text-sm line-clamp-2 mt-1">
                  {formData.meta_description || formData.description || 'Product description will appear here...'}
                </p>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-blue-900 mb-2">SEO Tips</h4>
              <ul className="text-sm text-blue-800 space-y-2 list-disc pl-5">
                <li>Use keywords relevant to your product in the title and description</li>
                <li>Keep meta titles under 60 characters to avoid truncation in search results</li>
                <li>Keep meta descriptions under 160 characters</li>
                <li>Include alt text for all images to improve accessibility and SEO</li>
                <li>Use descriptive, SEO-friendly URLs (slugs)</li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="flex justify-end space-x-4 pt-4 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save size={18} />
              <span>Save Product</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default AdminProductForm;


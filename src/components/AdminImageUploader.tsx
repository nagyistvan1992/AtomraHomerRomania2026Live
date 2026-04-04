import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image as ImageIcon, Check, AlertCircle, FileImage, Trash2, RefreshCw } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { getAssetPath } from '../utils/assetPath';

interface ImageUploaderProps {
  onImageUploaded: (url: string, altText?: string) => void;
  maxSize?: number; // in MB
  acceptedFileTypes?: string[];
  showAltTextInput?: boolean;
  existingImages?: string[];
  onRemoveExistingImage?: (index: number) => void;
}

const AdminImageUploader: React.FC<ImageUploaderProps> = ({
  onImageUploaded,
  maxSize = 5, // Default 5MB
  acceptedFileTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  showAltTextInput = true,
  existingImages = [],
  onRemoveExistingImage
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [altText, setAltText] = useState('');
  const [activeTab, setActiveTab] = useState<'upload' | 'existing'>('upload');
  
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    const file = acceptedFiles[0]; // Only use the first file
    
    try {
      setIsUploading(true);
      setUploadProgress(0);
      setUploadError(null);
      
      // Create a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `product-images/${fileName}`;
      
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 95) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 5;
        });
      }, 100);
      
      // Upload file to Supabase Storage
      const { data, error } = await supabase.storage
        .from('public')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });
      
      clearInterval(progressInterval);
      
      if (error) throw error;
      
      // Get public URL
      const { data: urlData } = supabase.storage
        .from('public')
        .getPublicUrl(filePath);
      
      setUploadProgress(100);
      setUploadedImage(urlData.publicUrl);
      
      // Extract alt text from file name if not provided
      if (!altText) {
        const defaultAltText = file.name.split('.')[0]
          .replace(/[_-]/g, ' ')
          .replace(/\b\w/g, l => l.toUpperCase());
        setAltText(defaultAltText);
      }
      
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadError('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  }, [altText]);
  
  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: {
      'image/*': acceptedFileTypes
    },
    maxSize: maxSize * 1024 * 1024,
    multiple: false
  });
  
  const handleSubmit = () => {
    if (uploadedImage) {
      onImageUploaded(uploadedImage, altText);
      
      // Reset state
      setUploadedImage(null);
      setAltText('');
      setUploadProgress(0);
    }
  };
  
  const handleCancel = () => {
    setUploadedImage(null);
    setAltText('');
    setUploadProgress(0);
    setUploadError(null);
  };
  
  return (
    <div className="space-y-4">
      {/* Tabs */}
      {existingImages && existingImages.length > 0 && (
        <div className="flex border-b border-gray-200 mb-4">
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-4 py-2 font-light text-sm ${
              activeTab === 'upload'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Upload New
          </button>
          <button
            onClick={() => setActiveTab('existing')}
            className={`px-4 py-2 font-light text-sm ${
              activeTab === 'existing'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Existing Images ({existingImages.length})
          </button>
        </div>
      )}
      
      {activeTab === 'upload' && (
        <>
          {!uploadedImage ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors duration-200 ${
                isDragActive
                  ? 'border-blue-400 bg-blue-50'
                  : uploadError
                  ? 'border-red-300 bg-red-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <input {...getInputProps()} />
              
              {isDragActive ? (
                <div className="flex flex-col items-center">
                  <Upload size={40} className="text-blue-500 mb-2" />
                  <p className="text-blue-600 font-light">Drop the image here...</p>
                </div>
              ) : uploadError ? (
                <div className="flex flex-col items-center">
                  <AlertCircle size={40} className="text-red-500 mb-2" />
                  <p className="text-red-600 font-light mb-2">{uploadError}</p>
                  <p className="text-sm text-red-500">Click or drag to try again</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <FileImage size={40} className="text-gray-400 mb-2" />
                  <p className="text-gray-600 font-light mb-2">
                    Drag and drop an image, or click to select
                  </p>
                  <p className="text-xs text-gray-500">
                    Max size: {maxSize}MB | Formats: JPG, PNG, WEBP, GIF
                  </p>
                </div>
              )}
              
              {fileRejections.length > 0 && (
                <div className="mt-4 text-sm text-red-500">
                  {fileRejections[0].errors.map(e => (
                    <p key={e.code}>{e.message}</p>
                  ))}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="border rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-medium text-gray-900">Uploaded Image</h4>
                <button
                  onClick={handleCancel}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={18} />
                </button>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                  <img
                    src={uploadedImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate mb-1">
                    {uploadedImage.split('/').pop()}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    URL: {uploadedImage}
                  </p>
                </div>
                
                <div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(uploadedImage);
                      alert('Image URL copied to clipboard');
                    }}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Copy URL
                  </button>
                </div>
              </div>
              
              {showAltTextInput && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Alt Text (for SEO and accessibility)
                  </label>
                  <input
                    type="text"
                    value={altText}
                    onChange={(e) => setAltText(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe the image"
                  />
                </div>
              )}
              
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleSubmit}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Check size={16} className="mr-2" />
                  Use This Image
                </button>
              </div>
            </motion.div>
          )}
          
          {isUploading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Uploading...</span>
                <span className="text-sm text-gray-600">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}
        </>
      )}
      
      {activeTab === 'existing' && existingImages && existingImages.length > 0 && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <AnimatePresence>
              {existingImages.map((image, index) => (
                <motion.div
                  key={`${image}-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="relative group"
                >
                  <div className="aspect-square bg-gray-100 rounded-md overflow-hidden border border-gray-200">
                    <img
                      src={image}
                      alt={`Product image ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = getAssetPath('/placeholder-image.jpg');
                      }}
                    />
                  </div>
                  
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center rounded-md">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(image);
                          alert('Image URL copied to clipboard');
                        }}
                        className="p-1.5 bg-white/90 rounded-full text-gray-700 hover:text-gray-900 hover:bg-white transition-colors duration-200"
                        title="Copy URL"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                      </button>
                      
                      {onRemoveExistingImage && (
                        <button
                          onClick={() => onRemoveExistingImage(index)}
                          className="p-1.5 bg-red-500/90 rounded-full text-white hover:bg-red-600 transition-colors duration-200"
                          title="Remove image"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {index === 0 && (
                    <div className="absolute top-2 left-2 px-2 py-1 bg-blue-600 text-white text-xs rounded-md">
                      Main
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              {existingImages.length} image{existingImages.length !== 1 ? 's' : ''} total
            </p>
            
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('upload')}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Upload size={16} className="mr-2" />
                Add New Image
              </button>
              
              {onRemoveExistingImage && existingImages.length > 1 && (
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to reorder images? The first image will be used as the main product image.')) {
                      // This would typically call a function to reorder images
                      alert('Image reordering would be implemented here');
                    }
                  }}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <RefreshCw size={16} className="mr-2" />
                  Reorder
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminImageUploader;

import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Tag, FileText, BarChart3, Settings, Users, ArrowLeft, Eye, ShoppingBag, User } from 'lucide-react';

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  onTabChange,
  onLogout,
  isOpen,
  onClose
}) => {
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      onLogout();
    }
  };

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
      isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    }`}>
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-light text-gray-900 tracking-wide">
            Atomra Admin
          </h1>
          <button
            onClick={onClose}
            className="lg:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-sm text-gray-500 font-light">
          Management Panel
        </p>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => onTabChange('dashboard')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                activeTab === 'dashboard' 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <BarChart3 size={18} strokeWidth={1.5} />
              <span className="font-light">Dashboard</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => onTabChange('products')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                activeTab === 'products' 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Package size={18} strokeWidth={1.5} />
              <span className="font-light">Products</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => onTabChange('categories')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                activeTab === 'categories' 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Tag size={18} strokeWidth={1.5} />
              <span className="font-light">Categories</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => onTabChange('orders')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                activeTab === 'orders' 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              <span className="font-light">Orders</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => onTabChange('customers')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                activeTab === 'customers' 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <User size={18} strokeWidth={1.5} />
              <span className="font-light">Customers</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => onTabChange('settings')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                activeTab === 'settings' 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Settings size={18} strokeWidth={1.5} />
              <span className="font-light">Settings</span>
            </button>
          </li>
        </ul>
        
        <div className="border-t border-gray-200 mt-6 pt-6">
          <ul className="space-y-2">
            <li>
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              >
                <ArrowLeft size={18} strokeWidth={1.5} />
                <span className="font-light">Logout</span>
              </button>
            </li>
            <li>
              <Link
                to="/"
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              >
                <Eye size={18} strokeWidth={1.5} />
                <span className="font-light">View Website</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default AdminSidebar;
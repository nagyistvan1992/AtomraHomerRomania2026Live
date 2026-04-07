import React, { useState } from 'react';
import { Bell, User, Search, Menu, RefreshCw, LogOut } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

interface AdminHeaderProps {
  title: string;
  onToggleSidebar: () => void;
  username: string;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ title, onToggleSidebar, username }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { logoutAdmin } = useAdmin();

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to log out?')) {
      await logoutAdmin();
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 fixed top-0 right-0 left-0 lg:left-64 z-10 h-16">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden mr-4 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-light text-gray-900">{title}</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search..."
              className="w-48 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-sm"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
          </div>
          
          <button className="relative p-2 text-gray-500 hover:text-gray-700 focus:outline-none hidden md:block">
            <Bell size={20} />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          
          <button className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none hidden md:block">
            <RefreshCw size={20} />
          </button>
          
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <User size={16} className="text-gray-600" />
              </div>
              <span className="text-sm font-light text-gray-700 hidden md:inline-block">{username}</span>
            </button>
            
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;

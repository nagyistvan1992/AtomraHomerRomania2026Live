import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User, Eye, EyeOff, LogIn, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import AdminSetupInstructions from './AdminSetupInstructions';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const { loginAdmin, adminLoading, adminError, isAdmin } = useAdmin();
  const navigate = useNavigate();

  // Check if already logged in
  useEffect(() => {
    if (isAdmin) {
      navigate('/admin');
    }
  }, [isAdmin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await loginAdmin(email, password);
    if (success) {
      navigate('/admin');
    } else {
      setShowInstructions(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          {/* Back button */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 group mb-6"
          >
            <ArrowLeft size={18} strokeWidth={1.5} className="group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="font-light">Back to Home</span>
          </Link>
          
          <h2 className="mt-6 text-center text-3xl font-light text-gray-900">
            Admin Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your credentials to access the admin panel
          </p>
        </div>
        
        {adminError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
            <div className="flex items-center">
              <AlertCircle size={18} className="mr-2" />
              <span className="block sm:inline font-light">{adminError}</span>
            </div>
          </div>
        )}
        
        {isAdmin && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative" role="alert">
            <div className="flex items-center">
              <CheckCircle size={18} className="mr-2" />
              <span className="block sm:inline font-light">You are already logged in as admin</span>
            </div>
            <div className="mt-2">
              <button
                onClick={() => navigate('/admin')}
                className="text-green-700 font-medium underline"
              >
                Go to Admin Panel
              </button>
            </div>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  autoFocus
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm font-light"
                  placeholder="Email address"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-3 pl-10 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm font-light"
                  placeholder="Password"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={adminLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-light rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LogIn size={18} className="text-gray-300 group-hover:text-gray-200" />
              </span>
              {adminLoading ? 'Logging in...' : 'Sign in to Admin Panel'}
            </button>
          </div>
        </form>
        
        {/* Admin Setup Instructions */}
        {showInstructions && <AdminSetupInstructions />}
      </div>
    </div>
  );
};

export default AdminLogin;

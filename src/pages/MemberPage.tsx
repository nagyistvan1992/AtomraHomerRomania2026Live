import React, { useState, useEffect } from 'react';
import { ArrowLeft, User, Package, Star, Gift, Crown, Calendar, MapPin, Phone, Mail, Edit3, Eye, EyeOff, LogOut, Award, TrendingUp, ShoppingBag, Clock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAdmin } from '../context/AdminContext';
import { useLanguage } from '../context/LanguageContext';
import SEOHead from '../components/SEOHead';
import AdminSetupInstructions from '../components/AdminSetupInstructions';
import { useStripeCheckout } from '../hooks/useStripeCheckout';
import { motion } from 'framer-motion';
import { getAssetPath } from '../utils/assetPath';

const MemberPage = () => {
  const navigate = useNavigate();
  const { state, login, register, logout, updateProfile, getTierBenefits, getPointsToNextTier, fetchUserOrders } = useAuth();
  const { loginAdmin, isAdmin, adminError } = useAdmin();
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'login' | 'register' | 'profile' | 'orders' | 'points'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const [loginForm, setLoginForm] = useState({
    email: 'atomrahomeromania@gmail.com',
    password: 'Istvan1992'
  });

  const [registerForm, setRegisterForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: ''
  });

  const [profileForm, setProfileForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: ''
  });

  // Check for pending checkout after login
  useEffect(() => {
    if (state.isAuthenticated) {
      const pendingCheckoutStr = sessionStorage.getItem('pendingCheckout');
      if (pendingCheckoutStr) {
        try {
          // Clear the pending checkout from session storage
          sessionStorage.removeItem('pendingCheckout');
          
          // Get the checkout data
          const checkoutData = JSON.parse(pendingCheckoutStr);
          
          // Use the useStripeCheckout hook to create a checkout session
          const { createCheckoutSession } = useStripeCheckout();
          
          // Create the checkout session
          setTimeout(() => {
            createCheckoutSession({
              priceId: checkoutData.priceId,
              mode: checkoutData.mode || 'payment'
            });
          }, 1000); // Small delay to ensure auth is fully processed
        } catch (error) {
          console.error('Error processing pending checkout:', error);
        }
      }
    }
  }, [state.isAuthenticated]);

  useEffect(() => {
    if (state.user) {
      setActiveTab('profile');
      setProfileForm({
        firstName: state.user.firstName || '',
        lastName: state.user.lastName || '',
        email: state.user.email || '',
        phone: state.user.phone || '',
        address: state.user.address || '',
        city: state.user.city || '',
        postalCode: state.user.postalCode || ''
      });
      
      // Fetch user orders when logged in
      fetchUserOrders();
    }
  }, [state.user, fetchUserOrders]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginForm.email || !loginForm.password) {
      setError('Please enter your email and password');
      return;
    }
    
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Check if this is an admin login attempt
    if (loginForm.email === 'atomrahomeromania@gmail.com') {
      try {
        const success = await loginAdmin(loginForm.email, loginForm.password);
        if (success) {
          navigate('/admin');
          return;
        } else {
          // Use the admin error from context if available
          setError(adminError || 'Invalid admin credentials. Please check your email and password, or complete the admin setup process below.');
          setIsLoading(false);
          return;
        }
      } catch (error: any) {
        console.error('Admin login error:', error);
        setError('Admin login failed. Please ensure your admin account is properly set up in Supabase using the instructions below.');
        setIsLoading(false);
        return;
      }
    }

    // Regular user login
    const success = await login(loginForm.email, loginForm.password);
    
    if (!success) {
      setError('Invalid email or password');
    }
    
    setIsLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    if (registerForm.password !== registerForm.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (registerForm.password.length < 6) {
      setError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

    const success = await register({
      email: registerForm.email,
      password: registerForm.password,
      firstName: registerForm.firstName,
      lastName: registerForm.lastName,
      phone: registerForm.phone
    });
    
    if (!success) {
      setError('Email already exists');
    } else {
      setSuccess('Account created successfully! Welcome bonus: 100 points');
    }
    
    setIsLoading(false);
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!profileForm.firstName || !profileForm.lastName || !profileForm.email) {
      setError('Please fill in all required fields');
      return;
    }
    
    updateProfile(profileForm);
    setIsEditing(false);
    setSuccess('Profile updated successfully');
    setTimeout(() => setSuccess(''), 3000);
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Bronze': return 'text-amber-600 bg-amber-50';
      case 'Silver': return 'text-gray-600 bg-gray-50';
      case 'Gold': return 'text-yellow-600 bg-yellow-50';
      case 'Platinum': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'processing': return 'text-blue-600 bg-blue-50';
      case 'shipped': return 'text-purple-600 bg-purple-50';
      case 'delivered': return 'text-green-600 bg-green-50';
      case 'cancelled': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ro-RO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!state.isAuthenticated) {
    return (
      <>
        <SEOHead
          title="Member Login | Atomra Home Romania"
          description="Login to your Atomra account to track orders, earn points, and access exclusive member benefits."
          keywords="member login, account, loyalty program, points, exclusive offers"
          url="https://atomra-home-romania.com/member"
        />
        
        <div className="luxury-page-bg luxury-floating-elements min-h-screen">
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <div className="absolute top-32 left-16 w-1 h-1 bg-slate-300/20 rounded-full animate-luxury-float"></div>
            <div className="absolute top-48 right-24 w-0.5 h-0.5 bg-slate-200/30 rounded-full animate-luxury-float" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-32 left-1/4 w-0.5 h-0.5 bg-slate-300/25 rounded-full animate-luxury-float" style={{ animationDelay: '4s' }}></div>
            <div className="absolute bottom-48 right-1/4 w-1 h-1 bg-slate-200/20 rounded-full animate-luxury-float" style={{ animationDelay: '1s' }}></div>
          </div>
          
          <div className="pt-32 sm:pt-36 md:pt-40 lg:pt-44 relative z-10">
            <div className="max-w-md mx-auto px-4 sm:px-6 py-8 sm:py-16">
              <div className="flex items-center mb-8">
                <Link 
                  to="/" 
                  className="flex items-center space-x-2 text-slate-600 hover:text-slate-800 transition-colors duration-200 group"
                >
                  <ArrowLeft size={18} strokeWidth={1.5} className="group-hover:-translate-x-1 transition-transform duration-200" />
                  <span className="font-light">Back to Home</span>
                </Link>
              </div>

              <div className="luxury-card p-6 sm:p-8 rounded-lg">
                {/* Tab Navigation */}
                <div className="flex mb-8 border-b border-slate-200">
                  <button
                    onClick={() => setActiveTab('login')}
                    className={`flex-1 py-3 text-center font-light tracking-wide transition-colors duration-200 ${
                      activeTab === 'login' 
                        ? 'text-slate-900 border-b-2 border-slate-900' 
                        : 'text-slate-600 hover:text-slate-800'
                    }`}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setActiveTab('register')}
                    className={`flex-1 py-3 text-center font-light tracking-wide transition-colors duration-200 ${
                      activeTab === 'register' 
                        ? 'text-slate-900 border-b-2 border-slate-900' 
                        : 'text-slate-600 hover:text-slate-800'
                    }`}
                  >
                    Register
                  </button>
                </div>

                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm font-light">{error}</p>
                  </div>
                )}
                
                {success && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-600 text-sm font-light">{success}</p>
                  </div>
                )}

                {success && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-600 text-sm font-light">{success}</p>
                  </div>
                )}

                {activeTab === 'login' && (
                  <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                      <label className="block text-sm font-light text-slate-700 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                        required
                        className="w-full px-4 py-3 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-slate-400 text-sm font-light bg-white/80 backdrop-blur-sm"
                        placeholder="Enter your email"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-light text-slate-700 mb-2">Password</label>
                      <div className="relative">
                        <input
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          value={loginForm.password}
                          onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                          required
                          className="w-full px-4 py-3 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-slate-400 text-sm font-light bg-white/80 backdrop-blur-sm pr-12"
                          placeholder="Enter your password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-slate-900 text-white py-3 sm:py-4 font-light tracking-wide uppercase hover:bg-slate-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed rounded"
                    >
                      {isLoading ? 'Logging in...' : 'Login'}
                    </button>

                    {/* Admin Setup Instructions - only show if admin login failed */}
                    {loginForm.email === 'atomrahomeromania@gmail.com' && error && (
                      <AdminSetupInstructions />
                    )}
                  </form>
                )}

                {activeTab === 'register' && (
                  <form onSubmit={handleRegister} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-light text-slate-700 mb-2">First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          value={registerForm.firstName}
                          onChange={(e) => setRegisterForm({ ...registerForm, firstName: e.target.value })}
                          required
                          className="w-full px-4 py-3 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-slate-400 text-sm font-light bg-white/80 backdrop-blur-sm"
                          placeholder="First name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-light text-slate-700 mb-2">Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          value={registerForm.lastName}
                          onChange={(e) => setRegisterForm({ ...registerForm, lastName: e.target.value })}
                          required
                          className="w-full px-4 py-3 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-slate-400 text-sm font-light bg-white/80 backdrop-blur-sm"
                          placeholder="Last name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-light text-slate-700 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={registerForm.email}
                        onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                        required
                        className="w-full px-4 py-3 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-slate-400 text-sm font-light bg-white/80 backdrop-blur-sm"
                        placeholder="Enter your email"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-light text-slate-700 mb-2">Phone (Optional)</label>
                      <input
                        type="tel"
                        name="phone"
                        value={registerForm.phone}
                        onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-slate-400 text-sm font-light bg-white/80 backdrop-blur-sm"
                        placeholder="Phone number"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-light text-slate-700 mb-2">Password</label>
                      <input
                        type="password"
                        name="password"
                        value={registerForm.password}
                        onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                        required
                        minLength={6}
                        className="w-full px-4 py-3 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-slate-400 text-sm font-light bg-white/80 backdrop-blur-sm"
                        placeholder="Create password (min 6 characters)"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-light text-slate-700 mb-2">Confirm Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={registerForm.confirmPassword}
                        onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                        required
                        className="w-full px-4 py-3 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-slate-400 text-sm font-light bg-white/80 backdrop-blur-sm"
                        placeholder="Confirm password"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-slate-900 text-white py-3 sm:py-4 font-light tracking-wide uppercase hover:bg-slate-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed rounded"
                    >
                      {isLoading ? 'Creating Account...' : 'Create Account'}
                    </button>

                    <div className="text-center">
                      <p className="text-xs text-slate-500 font-light">
                        By creating an account, you agree to our Terms of Service and Privacy Policy.
                        <br />
                        <strong>Welcome Bonus: 100 points!</strong>
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  const tierBenefits = getTierBenefits(state.user!.tier);
  const pointsToNext = getPointsToNextTier();

  return (
    <>
      <SEOHead
        title="My Account | Atomra Home Romania"
        description="Manage your Atomra account, track orders, view loyalty points, and access exclusive member benefits."
        keywords="my account, order tracking, loyalty points, member benefits, profile"
        url="https://atomra-home-romania.com/member"
      />
      
      <div className="luxury-page-bg luxury-floating-elements min-h-screen">
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-32 left-16 w-1 h-1 bg-slate-300/20 rounded-full animate-luxury-float"></div>
          <div className="absolute top-48 right-24 w-0.5 h-0.5 bg-slate-200/30 rounded-full animate-luxury-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-32 left-1/4 w-0.5 h-0.5 bg-slate-300/25 rounded-full animate-luxury-float" style={{ animationDelay: '4s' }}></div>
          <div className="absolute bottom-48 right-1/4 w-1 h-1 bg-slate-200/20 rounded-full animate-luxury-float" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="pt-32 sm:pt-36 md:pt-40 lg:pt-44 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-16">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div className="flex items-center space-x-4">
                <Link 
                  to="/" 
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 group"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  <ArrowLeft size={18} strokeWidth={1.5} className="group-hover:-translate-x-1 transition-transform duration-200" />
                  <span className="font-light">Back to Home</span>
                </Link>
              </div>
              
              <button
                onClick={logout}
                className="flex items-center space-x-2 text-slate-600 hover:text-slate-800 transition-colors duration-200"
              >
                <LogOut size={18} strokeWidth={1.5} />
                <span className="font-light">Logout</span>
              </button>
            </div>

            <div className="mb-8 sm:mb-12">
              <h1 className="text-3xl sm:text-4xl font-extralight text-slate-900 mb-4 tracking-tight">
                Welcome back, {state.user!.firstName}
              </h1>
              <p className="text-base sm:text-lg text-slate-600 font-light">
                Member since {formatDate(state.user!.joinDate)}
              </p>
            </div>

            {success && (
              <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-600 text-sm font-light">{success}</p>
              </div>
            )}

            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-200 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
              {[
                { id: 'profile', label: 'Profile', icon: User },
                { id: 'orders', label: 'Orders', icon: Package },
                { id: 'points', label: 'Loyalty Points', icon: Star }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as any)}
                  className={`flex items-center space-x-2 px-4 py-3 font-light tracking-wide transition-colors duration-200 whitespace-nowrap ${
                    activeTab === id 
                      ? 'text-slate-900 border-b-2 border-slate-900' 
                      : 'text-slate-600 hover:text-slate-800'
                  }`}
                >
                  <Icon size={18} strokeWidth={1.5} />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Info */}
                <div className="lg:col-span-2">
                  <div className="luxury-card p-6 sm:p-8 rounded-lg">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl sm:text-2xl font-light text-slate-900">Profile Information</h2>
                      <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="flex items-center space-x-2 text-slate-600 hover:text-slate-800 transition-colors duration-200"
                      >
                        <Edit3 size={18} strokeWidth={1.5} />
                        <span className="font-light">{isEditing ? 'Cancel' : 'Edit'}</span>
                      </button>
                    </div>

                    {isEditing ? (
                      <form onSubmit={handleUpdateProfile} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-light text-slate-700 mb-2">First Name</label>
                            <input
                              type="text"
                              value={profileForm.firstName}
                              onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })}
                              className="w-full px-4 py-3 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-slate-400 text-sm font-light bg-white/80 backdrop-blur-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-light text-slate-700 mb-2">Last Name</label>
                            <input
                              type="text"
                              value={profileForm.lastName}
                              onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })}
                              className="w-full px-4 py-3 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-slate-400 text-sm font-light bg-white/80 backdrop-blur-sm"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-light text-slate-700 mb-2">Email</label>
                          <input
                            type="email"
                            value={profileForm.email}
                            onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                            className="w-full px-4 py-3 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-slate-400 text-sm font-light bg-white/80 backdrop-blur-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-light text-slate-700 mb-2">Phone</label>
                          <input
                            type="tel"
                            value={profileForm.phone}
                            onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                            className="w-full px-4 py-3 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-slate-400 text-sm font-light bg-white/80 backdrop-blur-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-light text-slate-700 mb-2">Address</label>
                          <input
                            type="text"
                            value={profileForm.address}
                            onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                            className="w-full px-4 py-3 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-slate-400 text-sm font-light bg-white/80 backdrop-blur-sm"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-light text-slate-700 mb-2">City</label>
                            <input
                              type="text"
                              value={profileForm.city}
                              onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })}
                              className="w-full px-4 py-3 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-slate-400 text-sm font-light bg-white/80 backdrop-blur-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-light text-slate-700 mb-2">Postal Code</label>
                            <input
                              type="text"
                              value={profileForm.postalCode}
                              onChange={(e) => setProfileForm({ ...profileForm, postalCode: e.target.value })}
                              className="w-full px-4 py-3 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-slate-400 text-sm font-light bg-white/80 backdrop-blur-sm"
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="bg-slate-900 text-white px-6 sm:px-8 py-3 font-light tracking-wide uppercase hover:bg-slate-800 transition-colors duration-300 rounded"
                        >
                          Save Changes
                        </button>
                      </form>
                    ) : (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="flex items-center space-x-3">
                            <User size={20} strokeWidth={1.5} className="text-slate-400" />
                            <div>
                              <p className="text-sm text-slate-500 font-light">Name</p>
                              <p className="text-slate-900 font-light">{state.user!.firstName} {state.user!.lastName}</p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3">
                            <Mail size={20} strokeWidth={1.5} className="text-slate-400" />
                            <div>
                              <p className="text-sm text-slate-500 font-light">Email</p>
                              <p className="text-slate-900 font-light">{state.user!.email}</p>
                            </div>
                          </div>

                          {state.user!.phone && (
                            <div className="flex items-center space-x-3">
                              <Phone size={20} strokeWidth={1.5} className="text-slate-400" />
                              <div>
                                <p className="text-sm text-slate-500 font-light">Phone</p>
                                <p className="text-slate-900 font-light">{state.user!.phone}</p>
                              </div>
                            </div>
                          )}

                          {state.user!.address && (
                            <div className="flex items-center space-x-3">
                              <MapPin size={20} strokeWidth={1.5} className="text-slate-400" />
                              <div>
                                <p className="text-sm text-slate-500 font-light">Address</p>
                                <p className="text-slate-900 font-light">
                                  {state.user!.address}
                                  {state.user!.city && `, ${state.user!.city}`}
                                  {state.user!.postalCode && ` ${state.user!.postalCode}`}
                                </p>
                              </div>
                            </div>
                          )}

                          <div className="flex items-center space-x-3">
                            <Calendar size={20} strokeWidth={1.5} className="text-slate-400" />
                            <div>
                              <p className="text-sm text-slate-500 font-light">Member Since</p>
                              <p className="text-slate-900 font-light">{formatDate(state.user!.joinDate)}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Member Stats */}
                <div className="space-y-6">
                  {/* Tier Status */}
                  <div className="luxury-card p-6 rounded-lg">
                    <div className="flex items-center space-x-3 mb-4">
                      <Crown size={24} strokeWidth={1.5} className="text-slate-600" />
                      <h3 className="text-lg font-light text-slate-900">Member Tier</h3>
                    </div>
                    
                    <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-light ${getTierColor(state.user!.tier)}`}>
                      <Award size={16} strokeWidth={1.5} className="mr-2" />
                      {state.user!.tier}
                    </div>

                    {pointsToNext > 0 && (
                      <div className="mt-4">
                        <p className="text-sm text-slate-600 font-light mb-2">
                          Spend {pointsToNext} Lei more to reach the next tier
                        </p>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-slate-600 h-2 rounded-full transition-all duration-500"
                            style={{ 
                              width: `${Math.min(100, ((state.user!.totalSpent % 500) / 500) * 100)}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Quick Stats */}
                  <div className="luxury-card p-6 rounded-lg">
                    <h3 className="text-lg font-light text-slate-900 mb-4">Account Summary</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600 font-light">Total Spent</span>
                        <span className="text-slate-900 font-light">{state.user!.totalSpent} Lei</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600 font-light">Total Orders</span>
                        <span className="text-slate-900 font-light">{state.user!.orders.length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600 font-light">Loyalty Points</span>
                        <span className="text-slate-900 font-light">{state.user!.points}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="luxury-card p-6 sm:p-8 rounded-lg">
                <h2 className="text-2xl font-light text-slate-900 mb-6">Order History</h2>
                
                {state.user!.orders.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag size={48} strokeWidth={1} className="text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500 font-light mb-4">No orders yet</p>
                    <Link
                      to="/all-products"
                      className="bg-slate-900 text-white px-6 sm:px-8 py-3 font-light tracking-wide uppercase hover:bg-slate-800 transition-colors duration-300 rounded"
                    >
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {state.user!.orders.map((order) => (
                      <motion.div 
                        key={order.id} 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border border-slate-200 rounded-lg p-4 sm:p-6"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                          <div>
                            <h3 className="text-lg font-light text-slate-900">Order #{order.order_number}</h3>
                            <p className="text-sm text-slate-600 font-light">{formatDate(order.date)}</p>
                          </div>
                          <div className="text-right">
                            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-light ${getStatusColor(order.status)}`}>
                              <Clock size={14} strokeWidth={1.5} className="mr-1" />
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </div>
                            <p className="text-lg font-light text-slate-900 mt-1">{order.total} Lei</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                          {order.items.slice(0, 3).map((item) => (
                            <div key={`${order.id}-${item.id}`} className="flex space-x-3">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = getAssetPath('/placeholder-image.jpg');
                                }}
                              />
                              <div className="flex-1">
                                <h4 className="font-light text-slate-900 text-sm line-clamp-2">{item.name}</h4>
                                <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                                <p className="text-sm font-light text-slate-900">{item.price}</p>
                              </div>
                            </div>
                          ))}
                          {order.items.length > 3 && (
                            <div className="flex items-center justify-center bg-slate-50 rounded p-4">
                              <p className="text-sm text-slate-600 font-light">
                                +{order.items.length - 3} more items
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center justify-between text-sm text-slate-600 font-light">
                          <span>Points Earned: +{order.pointsEarned}</span>
                          {order.trackingNumber && (
                            <span>Tracking: {order.trackingNumber}</span>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Points Tab */}
            {activeTab === 'points' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Points Balance */}
                <div className="luxury-card p-6 sm:p-8 rounded-lg">
                  <div className="flex items-center space-x-3 mb-6">
                    <Star size={24} strokeWidth={1.5} className="text-slate-600" />
                    <h2 className="text-xl sm:text-2xl font-light text-slate-900">Loyalty Points</h2>
                  </div>

                  <div className="text-center mb-8">
                    <div className="text-4xl font-light text-slate-900 mb-2">{state.user!.points}</div>
                    <p className="text-slate-600 font-light">Available Points</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 font-light">Points Multiplier</span>
                      <span className="text-slate-900 font-light">{tierBenefits.pointsMultiplier}x</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 font-light">Free Shipping Threshold</span>
                      <span className="text-slate-900 font-light">
                        {tierBenefits.freeShippingThreshold === 0 ? 'Always Free' : `${tierBenefits.freeShippingThreshold} Lei`}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 font-light">Birthday Bonus</span>
                      <span className="text-slate-900 font-light">{tierBenefits.birthdayBonus} points</span>
                    </div>
                  </div>
                </div>

                {/* Tier Benefits */}
                <div className="luxury-card p-6 sm:p-8 rounded-lg">
                  <h3 className="text-xl font-light text-slate-900 mb-6">Your Benefits</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <TrendingUp size={20} strokeWidth={1.5} className="text-green-600 flex-shrink-0" />
                      <span className="text-slate-700 font-light">
                        Earn {tierBenefits.pointsMultiplier}x points on every purchase
                      </span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Package size={20} strokeWidth={1.5} className="text-blue-600 flex-shrink-0" />
                      <span className="text-slate-700 font-light">
                        {tierBenefits.freeShippingThreshold === 0 
                          ? 'Free shipping on all orders' 
                          : `Free shipping on orders over ${tierBenefits.freeShippingThreshold} Lei`
                        }
                      </span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Gift size={20} strokeWidth={1.5} className="text-purple-600 flex-shrink-0" />
                      <span className="text-slate-700 font-light">
                        {tierBenefits.birthdayBonus} bonus points on your birthday
                      </span>
                    </div>

                    {tierBenefits.exclusiveOffers && (
                      <div className="flex items-center space-x-3">
                        <Star size={20} strokeWidth={1.5} className="text-yellow-600 flex-shrink-0" />
                        <span className="text-slate-700 font-light">
                          Access to exclusive offers and sales
                        </span>
                      </div>
                    )}

                    {tierBenefits.earlyAccess && (
                      <div className="flex items-center space-x-3">
                        <Clock size={20} strokeWidth={1.5} className="text-orange-600 flex-shrink-0" />
                        <span className="text-slate-700 font-light">
                          Early access to new products
                        </span>
                      </div>
                    )}
                  </div>

                  {pointsToNext > 0 && (
                    <div className="mt-8 p-4 bg-slate-50 rounded-lg">
                      <h4 className="font-light text-slate-900 mb-2">Next Tier Progress</h4>
                      <p className="text-sm text-slate-600 font-light mb-3">
                        Spend {pointsToNext} Lei more to unlock the next tier
                      </p>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-slate-600 h-2 rounded-full transition-all duration-500"
                          style={{ 
                            width: `${Math.min(100, ((state.user!.totalSpent % 500) / 500) * 100)}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberPage;

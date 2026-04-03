import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';
import AdminDashboard from '../components/AdminDashboard';
import AdminProducts from '../components/AdminProducts';
import AdminCategories from '../components/AdminCategories';
import AdminOrders from '../components/AdminOrders';
import AdminCustomers from '../components/AdminCustomers';
import AdminSettings from '../components/AdminSettings';
import SEOHead from '../components/SEOHead';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isAdmin, adminLoading } = useAdmin();
  const navigate = useNavigate();
  const [username, setUsername] = useState('Admin');

  useEffect(() => {
    // Check if user is admin
    if (!adminLoading && !isAdmin) {
      navigate('/admin-login');
    }
    
    // Get admin name from localStorage if available
    const user = localStorage.getItem('atomra_user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        if (userData.firstName) {
          setUsername(`${userData.firstName} ${userData.lastName || ''}`);
        }
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }
  }, [isAdmin, adminLoading, navigate]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    // Implement logout functionality
  };

  // Get title based on active tab
  const getTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Dashboard';
      case 'products':
        return 'Products Management';
      case 'categories':
        return 'Categories Management';
      case 'orders':
        return 'Orders Management';
      case 'customers':
        return 'Customers Management';
      case 'settings':
        return 'Settings';
      default:
        return 'Dashboard';
    }
  };

  if (adminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600 font-light">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null; // Will redirect in useEffect
  }

  return (
    <>
      <SEOHead
        title={`Admin - ${getTitle()} | Atomra Home Romania`}
        description="Admin dashboard for Atomra Home Romania"
        noindex={true}
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Sidebar */}
        <AdminSidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onLogout={handleLogout}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        
        {/* Main Content */}
        <div className={`transition-all duration-300 ${
          isSidebarOpen ? 'lg:ml-64' : 'ml-0 lg:ml-64'
        }`}>
          {/* Header */}
          <AdminHeader
            title={getTitle()}
            onToggleSidebar={toggleSidebar}
            username={username}
          />
          
          {/* Content */}
          <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            {activeTab === 'dashboard' && <AdminDashboard />}
            {activeTab === 'products' && <AdminProducts />}
            {activeTab === 'categories' && <AdminCategories />}
            {activeTab === 'orders' && <AdminOrders />}
            {activeTab === 'customers' && <AdminCustomers />}
            {activeTab === 'settings' && <AdminSettings />}
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
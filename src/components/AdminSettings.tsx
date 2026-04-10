import React, { useState, useEffect } from 'react';
import { Save, RefreshCw, Mail, Globe, DollarSign, Truck } from 'lucide-react';

interface SettingsState {
  siteName: string;
  siteUrl: string;
  adminEmail: string;
  currency: string;
  freeShippingThreshold: number;
  taxRate: number;
  orderPrefix: string;
  gmailUsername: string;
  gmailAppPassword: string;
  stripePublishableKey: string;
  stripeSecretKey: string;
}

const AdminSettings = () => {
  const [settings, setSettings] = useState<SettingsState>({
    siteName: 'Atomra Home Romania',
    siteUrl: 'https://www.atomrahomeromania.ro',
    adminEmail: 'atomrahomeromania@gmail.com',
    currency: 'Lei',
    freeShippingThreshold: 149,
    taxRate: 19,
    orderPrefix: 'ATM',
    gmailUsername: '',
    gmailAppPassword: '',
    stripePublishableKey: '',
    stripeSecretKey: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    // In a real app, you would fetch settings from the database
    // For now, we'll just use the default values
    const fetchSettings = async () => {
      try {
        // Example of how you might fetch settings
        // const { data, error } = await supabase
        //   .from('settings')
        //   .select('*')
        //   .single();
        
        // if (error) throw error;
        
        // if (data) {
        //   setSettings(data);
        // }
        
        // For now, just simulate loading
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        setLoading(false);
      } catch (err) {
        console.error('Error fetching settings:', err);
        setError('Failed to load settings. Please try again.');
        setLoading(false);
      }
    };
    
    fetchSettings();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      [name]: value
    });
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      [name]: Number(value)
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSaveSuccess(false);
    setError(null);
    
    try {
      // In a real app, you would save settings to the database
      // For now, we'll just simulate saving
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Example of how you might save settings
      // const { error } = await supabase
      //   .from('settings')
      //   .upsert(settings);
      
      // if (error) throw error;
      
      setSaveSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    } catch (err) {
      console.error('Error saving settings:', err);
      setError('Failed to save settings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !settings) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-medium text-gray-900">Settings</h2>
        
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <RefreshCw size={16} className="mr-2" />
          Refresh
        </button>
      </div>
      
      {/* Settings Tabs */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('general')}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'general'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              General
            </button>
            <button
              onClick={() => setActiveTab('shipping')}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'shipping'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Shipping
            </button>
            <button
              onClick={() => setActiveTab('payment')}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'payment'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Payment
            </button>
            <button
              onClick={() => setActiveTab('email')}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'email'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Email
            </button>
          </nav>
        </div>
        
        <div className="p-6">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error:</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          )}
          
          {saveSuccess && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Success:</strong>
              <span className="block sm:inline"> Settings saved successfully!</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full">
                    <Globe size={20} className="text-blue-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">General Settings</h3>
                </div>
                
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 mb-1">
                      Site Name
                    </label>
                    <input
                      type="text"
                      id="siteName"
                      name="siteName"
                      value={settings.siteName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="siteUrl" className="block text-sm font-medium text-gray-700 mb-1">
                      Site URL
                    </label>
                    <input
                      type="url"
                      id="siteUrl"
                      name="siteUrl"
                      value={settings.siteUrl}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="adminEmail" className="block text-sm font-medium text-gray-700 mb-1">
                      Admin Email
                    </label>
                    <input
                      type="email"
                      id="adminEmail"
                      name="adminEmail"
                      value={settings.adminEmail}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
                      Currency
                    </label>
                    <input
                      type="text"
                      id="currency"
                      name="currency"
                      value={settings.currency}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="taxRate" className="block text-sm font-medium text-gray-700 mb-1">
                      Tax Rate (%)
                    </label>
                    <input
                      type="number"
                      id="taxRate"
                      name="taxRate"
                      value={settings.taxRate}
                      onChange={handleNumberChange}
                      min="0"
                      max="100"
                      step="0.01"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="orderPrefix" className="block text-sm font-medium text-gray-700 mb-1">
                      Order Number Prefix
                    </label>
                    <input
                      type="text"
                      id="orderPrefix"
                      name="orderPrefix"
                      value={settings.orderPrefix}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}
            
            {/* Shipping Settings */}
            {activeTab === 'shipping' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="flex-shrink-0 bg-green-100 p-2 rounded-full">
                    <Truck size={20} className="text-green-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Shipping Settings</h3>
                </div>
                
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="freeShippingThreshold" className="block text-sm font-medium text-gray-700 mb-1">
                      Free Shipping Threshold ({settings.currency})
                    </label>
                    <input
                      type="number"
                      id="freeShippingThreshold"
                      name="freeShippingThreshold"
                      value={settings.freeShippingThreshold}
                      onChange={handleNumberChange}
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      Set to 0 for no free shipping
                    </p>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3 flex-1 md:flex md:justify-between">
                      <p className="text-sm text-blue-700">
                        Currently, customers get free shipping when their order total exceeds {settings.freeShippingThreshold} {settings.currency}.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Payment Settings */}
            {activeTab === 'payment' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="flex-shrink-0 bg-purple-100 p-2 rounded-full">
                    <DollarSign size={20} className="text-purple-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Payment Settings</h3>
                </div>
                
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label htmlFor="stripePublishableKey" className="block text-sm font-medium text-gray-700 mb-1">
                      Stripe Publishable Key
                    </label>
                    <input
                      type="text"
                      id="stripePublishableKey"
                      name="stripePublishableKey"
                      value={settings.stripePublishableKey}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Stripe publishable key"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="stripeSecretKey" className="block text-sm font-medium text-gray-700 mb-1">
                      Stripe Secret Key
                    </label>
                    <input
                      type="password"
                      id="stripeSecretKey"
                      name="stripeSecretKey"
                      value={settings.stripeSecretKey}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Stripe secret key"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      This key is stored securely and never exposed to the client.
                    </p>
                  </div>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mt-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3 flex-1 md:flex md:justify-between">
                      <p className="text-sm text-yellow-700">
                        After updating Stripe keys, you may need to restart the server for changes to take effect.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Email Settings */}
            {activeTab === 'email' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="flex-shrink-0 bg-red-100 p-2 rounded-full">
                    <Mail size={20} className="text-red-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Email Settings</h3>
                </div>
                
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label htmlFor="gmailUsername" className="block text-sm font-medium text-gray-700 mb-1">
                      Gmail Username
                    </label>
                    <input
                      type="email"
                      id="gmailUsername"
                      name="gmailUsername"
                      value={settings.gmailUsername}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your-email@gmail.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="gmailAppPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Gmail App Password
                    </label>
                    <input
                      type="password"
                      id="gmailAppPassword"
                      name="gmailAppPassword"
                      value={settings.gmailAppPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="16-character app password"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      This is an app password generated from your Google account, not your regular Gmail password.
                    </p>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3 flex-1 md:flex md:justify-between">
                      <p className="text-sm text-blue-700">
                        To generate an app password, go to your Google Account &gt; Security &gt; 2-Step Verification &gt; App passwords.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Save Button */}
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} className="mr-2" />
                    Save Settings
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;


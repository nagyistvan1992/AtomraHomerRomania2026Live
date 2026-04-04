import React, { useState } from 'react';
import { Package, User, MapPin, Phone, Mail, Calendar, DollarSign, Truck, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { getAssetPath } from '../utils/assetPath';

interface OrderItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  customer_city: string;
  customer_postal_code: string;
  items: OrderItem[];
  subtotal: number;
  shipping_cost: number;
  total_amount: number;
  payment_method: string;
  payment_status: string;
  order_status: string;
  notes?: string;
  tracking_number?: string;
  created_at: string;
}

interface OrderDetailsProps {
  order: Order;
  onClose: () => void;
  onUpdateStatus: (id: string, status: string) => void;
  loading: boolean;
}

const AdminOrderDetails: React.FC<OrderDetailsProps> = ({
  order,
  onClose,
  onUpdateStatus,
  loading
}) => {
  const [trackingNumber, setTrackingNumber] = useState(order.tracking_number || '');
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState<{success?: boolean; message?: string} | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ro-RO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-purple-100 text-purple-800';
      case 'shipped': return 'bg-indigo-100 text-indigo-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusUpdate = async (status: string) => {
    // If status is shipped, update tracking number first
    if (status === 'shipped' && trackingNumber !== order.tracking_number) {
      try {
        const { error } = await supabase
          .from('orders')
          .update({ tracking_number: trackingNumber })
          .eq('id', order.id);
          
        if (error) throw error;
      } catch (error) {
        console.error('Error updating tracking number:', error);
        alert('Failed to update tracking number');
        return;
      }
    }
    
    // Update order status
    onUpdateStatus(order.id, status);
    
    // If status is shipped, send notification email
    if (status === 'shipped') {
      sendStatusEmail(status);
    }
  };
  
  const sendStatusEmail = async (status: string) => {
    setIsSendingEmail(true);
    setEmailStatus(null);
    
    try {
      // Prepare order data for email
      const orderData = {
        orderId: order.id,
        orderNumber: order.order_number,
        customerName: order.customer_name,
        customerEmail: order.customer_email,
        orderStatus: status,
        trackingNumber: trackingNumber || order.tracking_number,
        items: order.items.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        total: order.total_amount
      };
      
      // Call Supabase Edge Function to send email
      const { data, error } = await supabase.functions.invoke('send-order-status-email', {
        body: { orderData }
      });
      
      if (error) throw error;
      
      if (data.success) {
        setEmailStatus({ 
          success: true, 
          message: 'Status notification email sent successfully' 
        });
      } else {
        throw new Error(data.message || 'Failed to send email');
      }
    } catch (error) {
      console.error('Error sending status email:', error);
      setEmailStatus({ 
        success: false, 
        message: error.message || 'Failed to send status notification email' 
      });
    } finally {
      setIsSendingEmail(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between">
        <h3 className="text-xl font-light">Order #{order.order_number}</h3>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-300 transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Order Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <Package size={18} className="mr-2" />
              Order Information
            </h4>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Order Date:</span>
                <span className="text-sm font-medium text-gray-900 flex items-center">
                  <Calendar size={14} className="mr-1" />
                  {formatDate(order.created_at)}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Order Status:</span>
                <span className={`text-sm font-medium px-2 py-1 rounded-full ${getStatusColor(order.order_status)}`}>
                  {order.order_status.charAt(0).toUpperCase() + order.order_status.slice(1)}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Payment Method:</span>
                <span className="text-sm font-medium text-gray-900">
                  {order.payment_method === 'card' ? 'Credit Card' : 'Cash on Delivery'}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Payment Status:</span>
                <span className={`text-sm font-medium px-2 py-1 rounded-full ${getPaymentStatusColor(order.payment_status)}`}>
                  {order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1)}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Tracking Number:</span>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="text-sm px-2 py-1 border border-gray-300 rounded w-40 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Add tracking #"
                  />
                  {trackingNumber !== order.tracking_number && (
                    <button
                      onClick={async () => {
                        try {
                          const { error } = await supabase
                            .from('orders')
                            .update({ tracking_number: trackingNumber })
                            .eq('id', order.id);
                            
                          if (error) throw error;
                          alert('Tracking number updated successfully');
                        } catch (error) {
                          console.error('Error updating tracking number:', error);
                          alert('Failed to update tracking number');
                        }
                      }}
                      className="ml-2 text-xs text-blue-600 hover:text-blue-800"
                    >
                      Save
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Customer Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <User size={18} className="mr-2" />
              Customer Information
            </h4>
            
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="text-sm text-gray-600 w-24 flex-shrink-0">Name:</span>
                <span className="text-sm font-medium text-gray-900">
                  {order.customer_name}
                </span>
              </div>
              
              <div className="flex items-start">
                <span className="text-sm text-gray-600 w-24 flex-shrink-0">Email:</span>
                <a 
                  href={`mailto:${order.customer_email}`}
                  className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <Mail size={14} className="mr-1" />
                  {order.customer_email}
                </a>
              </div>
              
              <div className="flex items-start">
                <span className="text-sm text-gray-600 w-24 flex-shrink-0">Phone:</span>
                <a 
                  href={`tel:${order.customer_phone}`}
                  className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <Phone size={14} className="mr-1" />
                  {order.customer_phone}
                </a>
              </div>
              
              <div className="flex items-start">
                <span className="text-sm text-gray-600 w-24 flex-shrink-0">Address:</span>
                <span className="text-sm font-medium text-gray-900 flex items-start">
                  <MapPin size={14} className="mr-1 mt-0.5 flex-shrink-0" />
                  <span>
                    {order.customer_address}, {order.customer_city}, {order.customer_postal_code}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Order Items */}
        <div className="mb-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Order Items</h4>
          
          <div className="border rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {order.items.map((item, index) => {
                  const itemPrice = parseFloat(item.price.replace(/[^\d.]/g, ''));
                  const itemTotal = itemPrice * item.quantity;
                  
                  return (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img 
                              className="h-10 w-10 rounded-md object-cover" 
                              src={item.image} 
                              alt={item.name}
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = getAssetPath('/placeholder-image.jpg');
                              }}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.price}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.quantity}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{itemTotal.toFixed(0)} Lei</div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td colSpan={3} className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                    Subtotal:
                  </td>
                  <td className="px-6 py-3 text-sm font-medium text-gray-900">
                    {order.subtotal.toFixed(0)} Lei
                  </td>
                </tr>
                <tr>
                  <td colSpan={3} className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                    Shipping:
                  </td>
                  <td className="px-6 py-3 text-sm font-medium text-gray-900">
                    {order.shipping_cost.toFixed(0)} Lei
                  </td>
                </tr>
                <tr>
                  <td colSpan={3} className="px-6 py-3 text-right text-sm font-medium text-gray-900">
                    Total:
                  </td>
                  <td className="px-6 py-3 text-sm font-bold text-gray-900">
                    {order.total_amount.toFixed(0)} Lei
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        
        {/* Email Status */}
        {emailStatus && (
          <div className={`mb-6 p-4 rounded-lg ${emailStatus.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <div className="flex items-center">
              {emailStatus.success ? (
                <CheckCircle size={18} className="text-green-500 mr-2" />
              ) : (
                <AlertCircle size={18} className="text-red-500 mr-2" />
              )}
              <p className={`text-sm ${emailStatus.success ? 'text-green-700' : 'text-red-700'}`}>
                {emailStatus.message}
              </p>
            </div>
          </div>
        )}
        
        {/* Order Actions */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Update Order Status</h4>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
              <button
                key={status}
                onClick={() => handleStatusUpdate(status)}
                disabled={loading || order.order_status === status || isSendingEmail}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  order.order_status === status
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
          
          {loading && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
              <span>Updating order status...</span>
            </div>
          )}
          
          {isSendingEmail && (
            <div className="flex items-center space-x-2 text-sm text-gray-600 mt-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span>Sending notification email...</span>
            </div>
          )}
          
          {order.order_status === 'shipped' && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center mb-2">
                <Truck size={18} className="text-blue-600 mr-2" />
                <h5 className="text-blue-800 font-medium text-sm">Shipping Information</h5>
              </div>
              <p className="text-sm text-blue-700 mb-2">
                When you mark an order as shipped, a notification email is automatically sent to the customer with the tracking information.
              </p>
              <div className="flex items-center text-xs text-blue-600">
                <Clock size={14} className="mr-1" />
                <span>Emails are typically delivered within a few minutes.</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetails;

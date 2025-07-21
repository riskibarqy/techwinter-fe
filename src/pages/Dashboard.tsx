import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle, Clock, User, MapPin, Calendar } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import { mockOrders } from '../data/order';

export default function Dashboard() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('orders');

  // Filter orders for current user (in real app, this would come from API)
  const userOrders = mockOrders.filter(order => order.userId === user?.id || order.userId === 'user_123');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'processing':
        return <Package className="h-5 w-5 text-blue-500" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'shipped':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome back, {user?.firstName}!
            </h1>
            <p className="text-gray-400">Manage your orders and account settings</p>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-8 bg-gray-900 p-1 rounded-lg w-fit">
            {[
              { id: 'orders', label: 'My Orders', icon: Package },
              { id: 'profile', label: 'Profile', icon: User },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Order History</h2>
              
              {userOrders.length === 0 ? (
                <div className="bg-gray-900 rounded-lg p-8 text-center">
                  <Package className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No orders yet</h3>
                  <p className="text-gray-400">Start shopping to see your orders here!</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {userOrders.map((order) => (
                    <motion.div
                      key={order.id}
                      className="bg-gray-900 rounded-lg p-6 border border-gray-700"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                        <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                          <div>
                            <h3 className="text-lg font-semibold text-white">Order #{order.id}</h3>
                            <div className="flex items-center space-x-2 text-sm text-gray-400">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                            <span className="font-medium capitalize">{order.status}</span>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-white">${order.total.toFixed(2)}</p>
                            <p className="text-sm text-gray-400">{order.items.length} item(s)</p>
                          </div>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="space-y-3">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex items-center space-x-4 bg-gray-800 rounded-lg p-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-12 w-12 rounded object-cover"
                            />
                            <div className="flex-1">
                              <h4 className="text-white font-medium">{item.name}</h4>
                              <div className="text-sm text-gray-400">
                                {item.selectedSize && <span>Size: {item.selectedSize} • </span>}
                                {item.selectedColor && <span>Color: {item.selectedColor} • </span>}
                                <span>Qty: {item.quantity}</span>
                              </div>
                            </div>
                            <div className="text-white font-medium">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Shipping Info */}
                      <div className="mt-4 pt-4 border-t border-gray-700">
                        <div className="flex items-start space-x-3">
                          <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                          <div>
                            <h4 className="text-white font-medium mb-1">Shipping Address</h4>
                            <div className="text-sm text-gray-400">
                              <p>{order.shippingAddress.name}</p>
                              <p>{order.shippingAddress.address}</p>
                              <p>{order.shippingAddress.city}, {order.shippingAddress.zipCode}</p>
                              <p>{order.shippingAddress.country}</p>
                            </div>
                          </div>
                        </div>
                        
                        {order.trackingNumber && (
                          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <div className="flex items-center space-x-2">
                              <Truck className="h-4 w-4 text-blue-600" />
                              <span className="text-sm font-medium text-blue-800">
                                Tracking Number: {order.trackingNumber}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Profile Settings</h2>
              
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center space-x-6 mb-6">
                  <div className="h-20 w-20 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {user?.firstName} {user?.lastName}
                    </h3>
                    <p className="text-gray-400">{user?.emailAddresses[0]?.emailAddress}</p>
                    <p className="text-sm text-gray-500">Member since {new Date(user?.createdAt || '').toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={user?.firstName || ''}
                      disabled
                      className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={user?.lastName || ''}
                      disabled
                      className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={user?.emailAddresses[0]?.emailAddress || ''}
                      disabled
                      className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    />
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-700">
                  <p className="text-sm text-gray-400">
                    To update your profile information, please use the account settings in the user menu.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
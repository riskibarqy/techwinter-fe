import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Package, Users, DollarSign, TrendingUp, Save, X } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import { products as initialProducts } from '../data/products';
import { mockOrders } from '../data/order';
import { Product } from '../types/product';

export default function AdminDashboard() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('overview');
  const [products, setProducts] = useState(initialProducts);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    price: 0,
    image: '',
    category: 'hoodies',
    description: '',
    sizes: [],
    colors: [],
    inStock: true
  });

  // Check if user is admin
  const isAdmin = user?.publicMetadata?.role === 'admin';

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-black pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-400">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.image) {
      const product: Product = {
        id: Date.now(),
        name: newProduct.name,
        price: newProduct.price,
        image: newProduct.image,
        category: newProduct.category || 'hoodies',
        description: newProduct.description || '',
        sizes: newProduct.sizes || [],
        colors: newProduct.colors || [],
        inStock: newProduct.inStock ?? true,
        createdAt: new Date().toISOString()
      };
      
      setProducts([...products, product]);
      setNewProduct({
        name: '',
        price: 0,
        image: '',
        category: 'hoodies',
        description: '',
        sizes: [],
        colors: [],
        inStock: true
      });
      setIsAddingProduct(false);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setNewProduct(product);
  };

  const handleUpdateProduct = () => {
    if (editingProduct && newProduct.name && newProduct.price && newProduct.image) {
      setProducts(products.map(p => 
        p.id === editingProduct.id 
          ? { ...newProduct, id: editingProduct.id, updatedAt: new Date().toISOString() } as Product
          : p
      ));
      setEditingProduct(null);
      setNewProduct({
        name: '',
        price: 0,
        image: '',
        category: 'hoodies',
        description: '',
        sizes: [],
        colors: [],
        inStock: true
      });
    }
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const stats = {
    totalProducts: products.length,
    totalOrders: mockOrders.length,
    totalRevenue: mockOrders.reduce((sum, order) => sum + order.total, 0),
    activeUsers: 156 // Mock data
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
            <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Manage your TechWinter store</p>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-8 bg-gray-900 p-1 rounded-lg w-fit">
            {[
              { id: 'overview', label: 'Overview', icon: TrendingUp },
              { id: 'products', label: 'Products', icon: Package },
              { id: 'orders', label: 'Orders', icon: Users },
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

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                  { label: 'Total Products', value: stats.totalProducts, icon: Package, color: 'blue' },
                  { label: 'Total Orders', value: stats.totalOrders, icon: Users, color: 'green' },
                  { label: 'Revenue', value: `$${stats.totalRevenue.toFixed(2)}`, icon: DollarSign, color: 'purple' },
                  { label: 'Active Users', value: stats.activeUsers, icon: TrendingUp, color: 'orange' }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="bg-gray-900 rounded-lg p-6 border border-gray-700"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">{stat.label}</p>
                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                        <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {mockOrders.slice(0, 5).map((order) => (
                    <div key={order.id} className="flex items-center justify-between py-3 border-b border-gray-700 last:border-b-0">
                      <div>
                        <p className="text-white font-medium">Order #{order.id}</p>
                        <p className="text-gray-400 text-sm">{new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold">${order.total.toFixed(2)}</p>
                        <p className="text-gray-400 text-sm capitalize">{order.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Products Management</h2>
                <motion.button
                  onClick={() => setIsAddingProduct(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Product</span>
                </motion.button>
              </div>

              {/* Add/Edit Product Form */}
              {(isAddingProduct || editingProduct) && (
                <motion.div
                  className="bg-gray-900 rounded-lg p-6 border border-gray-700 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-white">
                      {editingProduct ? 'Edit Product' : 'Add New Product'}
                    </h3>
                    <button
                      onClick={() => {
                        setIsAddingProduct(false);
                        setEditingProduct(null);
                        setNewProduct({
                          name: '',
                          price: 0,
                          image: '',
                          category: 'hoodies',
                          description: '',
                          sizes: [],
                          colors: [],
                          inStock: true
                        });
                      }}
                      className="text-gray-400 hover:text-white"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                      <input
                        type="text"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                        placeholder="Product name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Price</label>
                      <input
                        type="number"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                        className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                        placeholder="0.00"
                        step="0.01"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                      <select
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                        className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      >
                        <option value="hoodies">Hoodies</option>
                        <option value="t-shirts">T-Shirts</option>
                        <option value="bottoms">Bottoms</option>
                        <option value="jackets">Jackets</option>
                        <option value="accessories">Accessories</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Image URL</label>
                      <input
                        type="url"
                        value={newProduct.image}
                        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                        className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                      <textarea
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                        rows={3}
                        placeholder="Product description"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Sizes (comma separated)</label>
                      <input
                        type="text"
                        value={newProduct.sizes?.join(', ') || ''}
                        onChange={(e) => setNewProduct({ 
                          ...newProduct, 
                          sizes: e.target.value.split(',').map(s => s.trim()).filter(s => s) 
                        })}
                        className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                        placeholder="S, M, L, XL"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Colors (comma separated)</label>
                      <input
                        type="text"
                        value={newProduct.colors?.join(', ') || ''}
                        onChange={(e) => setNewProduct({ 
                          ...newProduct, 
                          colors: e.target.value.split(',').map(c => c.trim()).filter(c => c) 
                        })}
                        className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                        placeholder="Black, White, Gray"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 mt-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={newProduct.inStock}
                        onChange={(e) => setNewProduct({ ...newProduct, inStock: e.target.checked })}
                        className="rounded border-gray-600 bg-gray-800 text-blue-500"
                      />
                      <span className="text-gray-300">In Stock</span>
                    </label>
                  </div>

                  <div className="flex space-x-3 mt-6">
                    <motion.button
                      onClick={editingProduct ? handleUpdateProduct : handleAddProduct}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Save className="h-4 w-4" />
                      <span>{editingProduct ? 'Update' : 'Add'} Product</span>
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Products List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <motion.div
                    key={product.id}
                    className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-white font-semibold">{product.name}</h3>
                        <span className={`px-2 py-1 rounded text-xs ${
                          product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-2">{product.description}</p>
                      <p className="text-xl font-bold text-white mb-4">${product.price.toFixed(2)}</p>
                      
                      <div className="flex space-x-2">
                        <motion.button
                          onClick={() => handleEditProduct(product)}
                          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg font-medium flex items-center justify-center space-x-1"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Edit className="h-4 w-4" />
                          <span>Edit</span>
                        </motion.button>
                        <motion.button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Orders Management</h2>
              
              <div className="space-y-4">
                {mockOrders.map((order) => (
                  <motion.div
                    key={order.id}
                    className="bg-gray-900 rounded-lg p-6 border border-gray-700"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white">Order #{order.id}</h3>
                        <p className="text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-white">${order.total.toFixed(2)}</p>
                        <select
                          value={order.status}
                          onChange={(e) => {
                            // In real app, this would update the order status
                            console.log('Update order status:', e.target.value);
                          }}
                          className="mt-2 bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white text-sm"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-white font-medium mb-2">Items</h4>
                        <div className="space-y-2">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex items-center space-x-3 bg-gray-800 rounded p-2">
                              <img src={item.image} alt={item.name} className="h-10 w-10 rounded object-cover" />
                              <div className="flex-1">
                                <p className="text-white text-sm">{item.name}</p>
                                <p className="text-gray-400 text-xs">Qty: {item.quantity}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-white font-medium mb-2">Shipping Address</h4>
                        <div className="bg-gray-800 rounded p-3 text-sm text-gray-300">
                          <p>{order.shippingAddress.name}</p>
                          <p>{order.shippingAddress.address}</p>
                          <p>{order.shippingAddress.city}, {order.shippingAddress.zipCode}</p>
                          <p>{order.shippingAddress.country}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
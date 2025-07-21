import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { SignedIn, useUser } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Cart from './components/Cart';
import Shop from './pages/Shop';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const { user } = useUser();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isAdmin = user?.publicMetadata?.role === 'admin';

  return (
    <CartProvider>
      <motion.div 
        className="min-h-screen bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Header 
          onCartClick={() => setIsCartOpen(true)}
          onSearch={setSearchQuery}
        />
        
        <Routes>
          <Route path="/" element={<Shop searchQuery={searchQuery} />} />
          <Route 
            path="/dashboard" 
            element={
              <SignedIn>
                <Dashboard />
              </SignedIn>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <SignedIn>
                {isAdmin ? <AdminDashboard /> : <Navigate to="/dashboard" />}
              </SignedIn>
            } 
          />
          <Route path="/about" element={<div className="min-h-screen bg-black pt-20 flex items-center justify-center"><h1 className="text-white text-2xl">About Page</h1></div>} />
          <Route path="/contact" element={<div className="min-h-screen bg-black pt-20 flex items-center justify-center"><h1 className="text-white text-2xl">Contact Page</h1></div>} />
        </Routes>
        
        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
        />
        
        <footer className="bg-gray-900 border-t border-gray-800 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-white font-bold text-lg mb-4">TECH<span className="text-blue-500">WINTER</span></h3>
                <p className="text-gray-400">Where technology meets style in premium fashion.</p>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-4">Shop</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Best Sellers</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Sale</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-4">Help</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Size Guide</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Shipping</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-4">Connect</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">TikTok</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-8 text-center">
              <p className="text-gray-400">&copy; 2025 TechWinter. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </motion.div>
    </CartProvider>
  );
}

export default App;
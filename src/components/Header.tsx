import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import { UserButton, useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
// import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useCart } from '../context/CartContext';
import { AuthIconButton } from './AuthIconButton';

interface HeaderProps {
  onCartClick: () => void;
  onSearch: (query: string) => void;
}

export default function Header({ onCartClick, onSearch }: HeaderProps) {
  const { itemCount } = useCart();
  const { isSignedIn, user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  onCartClick = () => {
    console.log('Cart clicked');
  }

  const isAdmin = user?.publicMetadata?.role === 'admin';
  return (
    <header className="bg-black border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <motion.h1
                className="text-2xl font-bold text-white tracking-wider cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                TECH<span className="text-blue-500">WINTER</span>
              </motion.h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {/* Signed in user options */}
            {isSignedIn && (
              <>
                <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="block text-gray-300 hover:text-white">Dashboard</Link>
                {isAdmin && (
                  <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="block text-gray-300 hover:text-white">Admin Panel</Link>
                )}
              </>
            )}
            <Link to="/" className="text-gray-300 hover:text-white transition-colors">Shop</Link>
            <Link to="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
            <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
          </nav>

          {/* Search Bar */}
          <motion.form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex items-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-900 text-white placeholder-gray-400 border border-gray-700 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Search className="h-4 w-4 text-gray-400" />
              </button>
            </div>
          </motion.form>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            {/* <ThemeToggle /> */}

            <motion.button
              onClick={onCartClick}
              className="text-gray-300 hover:text-white transition-colors relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingBag className="h-6 w-6" />
              {itemCount > 0 && (
                <motion.span
                  className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  {itemCount}
                </motion.span>
              )}
            </motion.button>

            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <AuthIconButton />
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-300 hover:text-white"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden border-t border-gray-800 bg-black"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="px-4 py-4 space-y-3">
                {/* Mobile search */}
                <form onSubmit={handleSearchSubmit}>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-gray-900 text-white placeholder-gray-400 border border-gray-700 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:border-blue-500"
                    />
                    <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <Search className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>
                </form>

                {/* Signed in user options */}
                {isSignedIn && (
                  <>
                    <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="block text-gray-300 hover:text-white">Dashboard</Link>
                    {isAdmin && (
                      <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="block text-gray-300 hover:text-white">Admin Panel</Link>
                    )}
                  </>
                )}

                {/* Links */}
                {[
                  { to: '/', label: 'Shop' },
                  { to: '/about', label: 'About' },
                  { to: '/contact', label: 'Contact' },
                ].map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-gray-300 hover:text-white"
                  >
                    {label}
                  </Link>
                ))}

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </header>
  );
}
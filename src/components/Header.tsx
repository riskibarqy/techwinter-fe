import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  onCartClick: () => void;
  onSearch: (query: string) => void;
}

export default function Header({ onCartClick, onSearch }: HeaderProps) {
  const { itemCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="bg-black border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-white tracking-wider">
              TECH<span className="text-red-500">WINTER</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">New Arrivals</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Clothing</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Accessories</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Sale</a>
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-900 text-white placeholder-gray-400 border border-gray-700 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:border-red-500 transition-colors"
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Search className="h-4 w-4 text-gray-400" />
              </button>
            </div>
          </form>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-300 hover:text-white transition-colors">
              <User className="h-6 w-6" />
            </button>
            
            <button 
              onClick={onCartClick}
              className="text-gray-300 hover:text-white transition-colors relative"
            >
              <ShoppingBag className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

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
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <form onSubmit={handleSearchSubmit} className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-gray-900 text-white placeholder-gray-400 border border-gray-700 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:border-red-500"
                  />
                  <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Search className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
              </form>
              
              <a href="#" className="block px-3 py-2 text-gray-300 hover:text-white">New Arrivals</a>
              <a href="#" className="block px-3 py-2 text-gray-300 hover:text-white">Clothing</a>
              <a href="#" className="block px-3 py-2 text-gray-300 hover:text-white">Accessories</a>
              <a href="#" className="block px-3 py-2 text-gray-300 hover:text-white">Sale</a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
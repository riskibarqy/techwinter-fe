import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '../types/product';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, product.sizes?.[0], product.colors?.[0]);
  };

  return (
    <motion.div 
      className="group cursor-pointer"
      onClick={() => onClick(product)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="relative overflow-hidden">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            whileHover={{ scale: 1.05 }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-bold text-lg">Out of Stock</span>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-blue-400 transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-400 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-white">
              ${product.price.toFixed(2)}
            </span>
            
            {product.inStock && (
              <motion.button
                onClick={handleAddToCart}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 hover:shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Add to Cart
              </motion.button>
            )}
          </div>
          
          {product.colors && product.colors.length > 0 && (
            <div className="flex space-x-2 mt-3">
              {product.colors.slice(0, 3).map((color, index) => (
                <motion.div
                  key={index}
                  className={`w-4 h-4 rounded-full border border-gray-600 ${
                    color.toLowerCase() === 'black' ? 'bg-black' :
                    color.toLowerCase() === 'white' ? 'bg-white' :
                    color.toLowerCase() === 'gray' || color.toLowerCase() === 'charcoal' ? 'bg-gray-500' :
                    color.toLowerCase() === 'navy' ? 'bg-blue-900' :
                    color.toLowerCase() === 'olive' ? 'bg-green-700' :
                    color.toLowerCase() === 'khaki' ? 'bg-yellow-600' :
                    color.toLowerCase() === 'indigo' ? 'bg-indigo-600' :
                    'bg-gray-400'
                  }`}
                  title={color}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
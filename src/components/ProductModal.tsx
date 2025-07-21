import React, { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '../types/product';
import { useCart } from '../context/CartContext';

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');


  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <motion.div 
          className="fixed inset-0 transition-opacity bg-black bg-opacity-75" 
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
        
        <motion.div 
          className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-900 shadow-xl rounded-2xl"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="flex justify-between items-center p-6 border-b border-gray-700">
            <h2 className="text-2xl font-bold text-white">{product.name}</h2>
            <motion.button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="h-6 w-6" />
            </motion.button>
          </div>
          
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 lg:h-full object-cover"
              />
            </div>
            
            <div className="lg:w-1/2 p-6">
              <div className="mb-6">
                <p className="text-3xl font-bold text-white mb-4">
                  ${product.price.toFixed(2)}
                </p>
                <p className="text-gray-300 leading-relaxed">
                  {product.description}
                </p>
              </div>
              
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <motion.button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 border rounded-lg font-medium transition-colors ${
                          selectedSize === size
                            ? 'border-blue-500 bg-blue-500 text-white'
                            : 'border-gray-600 text-gray-300 hover:border-gray-500'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {size}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}
              
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Color</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <motion.button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 border rounded-lg font-medium transition-colors ${
                          selectedColor === color
                            ? 'border-blue-500 bg-blue-500 text-white'
                            : 'border-gray-600 text-gray-300 hover:border-gray-500'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {color}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}
              
              <motion.button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`w-full py-3 px-6 rounded-lg font-bold text-lg transition-all ${
                  product.inStock
                    ? 'bg-blue-500 hover:bg-blue-600 text-white hover:shadow-lg transform hover:-translate-y-1'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
                whileHover={product.inStock ? { scale: 1.02 } : {}}
                whileTap={product.inStock ? { scale: 0.98 } : {}}
              >
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
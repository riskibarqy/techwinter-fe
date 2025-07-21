import React from 'react';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Cart({ isOpen, onClose }: CartProps) {
  const { items, removeFromCart, updateQuantity, clearCart, total } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
        
        <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
          <div className="w-screen max-w-md">
            <div className="h-full flex flex-col bg-gray-900 shadow-xl">
              <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                <div className="flex items-start justify-between mb-6">
                  <h2 className="text-lg font-bold text-white">Shopping Cart</h2>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                {items.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-400 text-lg">Your cart is empty</p>
                    <button
                      onClick={onClose}
                      className="mt-4 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="bg-gray-800 rounded-lg p-4">
                        <div className="flex items-center space-x-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-16 w-16 rounded object-cover"
                          />
                          
                          <div className="flex-1">
                            <h3 className="text-white font-medium">{item.name}</h3>
                            <div className="text-sm text-gray-400 space-y-1">
                              {item.selectedSize && <p>Size: {item.selectedSize}</p>}
                              {item.selectedColor && <p>Color: {item.selectedColor}</p>}
                            </div>
                            <p className="text-white font-bold">${item.price.toFixed(2)}</p>
                          </div>
                          
                          <div className="flex flex-col items-end space-y-2">
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-400 hover:text-red-300 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                            
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="text-gray-400 hover:text-white transition-colors"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="text-white font-medium min-w-[2rem] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="text-gray-400 hover:text-white transition-colors"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {items.length > 0 && (
                <div className="border-t border-gray-700 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-lg font-bold text-white mb-4">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  
                  <div className="space-y-3">
                    <button className="w-full bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg font-bold transition-colors">
                      Checkout
                    </button>
                    <button
                      onClick={clearCart}
                      className="w-full border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 py-2 px-4 rounded-lg transition-colors"
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <div className="relative h-96 bg-gradient-to-r from-black via-gray-900 to-blue-900 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <motion.div 
        className="relative text-center text-white"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-4 tracking-wider"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          TECH <span className="text-blue-500">WINTER</span>
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl mb-8 text-gray-300"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Where Technology Meets Style
        </motion.p>
        <motion.button 
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-bold text-lg transition-all transform hover:-translate-y-1 hover:shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Shop Collection
        </motion.button>
      </motion.div>
    </div>
  );
}
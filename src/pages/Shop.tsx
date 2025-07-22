import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useDebounce } from '@/hooks/useDebounce';
import Hero from '../components/Hero';
import CategoryFilter from '../components/CategoryFilter';
import { ProductGrid } from '@/features/products/components/ProductGrid';
import ProductModal from '../components/ProductModal';
import { products } from '../data/products';
import { Product } from '../types/product';

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const filteredProducts = useMemo(() => products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }), [selectedCategory, debouncedSearchQuery]);

  return (
    <div className="min-h-screen bg-black pt-16">
      <Hero />
      
      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {debouncedSearchQuery && (
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-white text-lg">
              Search results for "{debouncedSearchQuery}" ({filteredProducts.length} products)
            </p>
          </motion.div>
        )}
        
        <ProductGrid
          products={filteredProducts}
          onProductClick={setSelectedProduct}
        />
      </main>
      
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
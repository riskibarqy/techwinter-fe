import { motion } from 'framer-motion';
import { Product } from '@/types/product';
import ProductCard from '@/components/ProductCard';

interface ProductGridProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  isLoading?: boolean;
}

export const ProductGrid = ({ products, onProductClick, isLoading }: ProductGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="bg-gray-900 rounded-lg overflow-hidden animate-pulse">
            <div className="h-64 bg-gray-800" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-800 rounded" />
              <div className="h-3 bg-gray-800 rounded w-2/3" />
              <div className="h-6 bg-gray-800 rounded w-1/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <motion.div 
        className="text-center py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <p className="text-gray-400 text-lg">No products found</p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <ProductCard
            product={product}
            onClick={onProductClick}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};
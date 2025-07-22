import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { SEOHead } from '@/components/ui/SEOHead';
import { generateSEOData } from '@/utils/seo';
import { SEOData } from '@/types/seo';

interface AuthLayoutProps {
  children: ReactNode;
  seo?: Partial<SEOData>;
}

export const AuthLayout = ({ children, seo = {} }: AuthLayoutProps) => {
  const seoData = generateSEOData(seo);

  return (
    <>
      <SEOHead seo={seoData} />
      <motion.div 
        className="min-h-screen bg-black flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-md w-full mx-4">
          <div className="text-center mb-8">
            <motion.h1 
              className="text-3xl font-bold text-white tracking-wider"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              TECH<span className="text-blue-500">WINTER</span>
            </motion.h1>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {children}
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};
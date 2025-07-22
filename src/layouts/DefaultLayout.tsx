import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import { SEOHead } from '@/components/ui/SEOHead';
import { generateSEOData } from '@/utils/seo';
import { SEOData } from '@/types/seo';

interface DefaultLayoutProps {
  children: ReactNode;
  seo?: Partial<SEOData>;
}

export const DefaultLayout = ({ children, seo = {} }: DefaultLayoutProps) => {
  const seoData = generateSEOData(seo);

  return (
    <>
      <SEOHead seo={seoData} />
      <motion.div 
        className="min-h-screen bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Header 
          onCartClick={() => {}} // Will be handled by cart context
          onSearch={() => {}} // Will be handled by search context
        />
        <main>{children}</main>
        
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
    </>
  );
};
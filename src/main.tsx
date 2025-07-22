import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { CartProvider } from '@/context/CartContext';
import App from './App.tsx';
import './index.css';
import './i18n';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount, error: any) => {
        if (error?.status === 404) return false;
        return failureCount < 3;
      },
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
            <BrowserRouter>
              <CartProvider>
                <App />
              </CartProvider>
            </BrowserRouter>
          </ClerkProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  </StrictMode>
);

import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { LoadingPage } from '@/components/ui/LoadingSpinner';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

export const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
  const { isSignedIn, isLoaded, user } = useUser();
  const location = useLocation();

  if (!isLoaded) {
    return <LoadingPage />;
  }

  if (!isSignedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && user?.publicMetadata?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};
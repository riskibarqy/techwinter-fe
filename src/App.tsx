import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { DefaultLayout } from '@/layouts/DefaultLayout';
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';
import Shop from '@/pages/Shop';
import Dashboard from '@/pages/Dashboard';
import AdminDashboard from '@/pages/AdminDashboard';
import { LoadingPage } from '@/components/ui/LoadingSpinner';
import PostAuthSignIn from './pages/PostAuth/SignIn';
import PostAuthSignUp from './pages/PostAuth/SignUp';

function App() {
  const { isLoaded } = useUser();
  
  if (!isLoaded) {
    return <LoadingPage />;
  }

  return (
    <Routes>
      <Route path="/" element={<DefaultLayout><Shop /></DefaultLayout>} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <DefaultLayout><Dashboard /></DefaultLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute requireAdmin>
            <DefaultLayout><AdminDashboard /></DefaultLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/about" 
        element={
          <DefaultLayout seo={{ title: 'About Us', description: 'Learn more about TechWinter and our mission to blend technology with style.' }}>
            <div className="min-h-screen pt-20 flex items-center justify-center">
              <h1 className="text-white text-2xl">About Page</h1>
            </div>
          </DefaultLayout>
        } 
      />
      <Route 
        path="/contact" 
        element={
          <DefaultLayout seo={{ title: 'Contact Us', description: 'Get in touch with TechWinter for support, partnerships, or general inquiries.' }}>
            <div className="min-h-screen pt-20 flex items-center justify-center">
              <h1 className="text-white text-2xl">Contact Page</h1>
            </div>
          </DefaultLayout>
        } 
      />
      <Route path="/post-auth/sign-in" element={<PostAuthSignIn />} />
      <Route path="/post-auth/sign-up" element={<PostAuthSignUp />} />
    </Routes>
  );
}

export default App;
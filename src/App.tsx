import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-react';
import { DefaultLayout } from '@/layouts/DefaultLayout';
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';
import Shop from '@/pages/Shop';
import Dashboard from '@/pages/Dashboard';
import AdminDashboard from '@/pages/AdminDashboard';
import { LoadingPage } from '@/components/ui/LoadingSpinner';

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
    </Routes>
  );
}

export default App;
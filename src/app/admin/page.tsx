'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';
import LoginForm from '@/components/admin/LoginForm';

// Importar AdminDashboard de forma dinámica sin SSR
const AdminDashboard = dynamic(() => import('@/components/admin/AdminDashboard'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex items-center space-x-3">
        <Loader2 className="h-6 w-6 animate-spin text-brand-primary" />
        <span className="text-gray-600 font-light">Cargando panel de administración...</span>
      </div>
    </div>
  ),
});

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check if user is authenticated on mount
    const checkAuth = () => {
      const authenticated = localStorage.getItem('admin_authenticated');
      const token = localStorage.getItem('admin_token');

      if (authenticated === 'true' && token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setIsChecking(false);
    };

    checkAuth();
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center space-x-3">
          <Loader2 className="h-6 w-6 animate-spin text-brand-primary" />
          <span className="text-gray-600 font-light">Verificando autenticación...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginForm onLoginSuccess={handleLoginSuccess} />;
  }

  return <AdminDashboard />;
}

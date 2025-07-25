'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from './LoginForm';
import AdminDashboard from './AdminDashboard';
import Loader from '@/components/ui/Loader';

export default function AdminWrapper() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [forceUpdate, setForceUpdate] = useState(0);
  const router = useRouter();

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = () => {
    console.log('🔍 Verificando autenticación...');
    
    // Método más robusto para obtener cookies
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        return parts.pop()?.split(';').shift();
      }
      return null;
    };
    
    const token = getCookie('mgsi-admin-token');
    console.log('🍪 Token encontrado:', !!token);
    console.log('🎫 Token valor:', token?.substring(0, 20) + '...');

    if (token) {
      try {
        // Validar formato del token
        const decoded = atob(token);
        const isValid = decoded.includes('mgsi-admin');
        console.log('✅ Token decodificado:', decoded.substring(0, 30) + '...');
        console.log('✅ Token válido:', isValid);
        
        setIsAuthenticated(isValid);
        
        if (!isValid) {
          console.log('❌ Token inválido, limpiando...');
          // Token inválido, limpiar
          document.cookie = 'mgsi-admin-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        }
      } catch (error) {
        console.log('❌ Error decodificando token:', error);
        setIsAuthenticated(false);
        // Error decodificando, limpiar cookie
        document.cookie = 'mgsi-admin-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      }
    } else {
      console.log('🚫 No hay cookie de autenticación');
      setIsAuthenticated(false);
    }
    
    setIsLoading(false);
  };

  const handleLoginSuccess = () => {
    console.log('🎉 Login exitoso, re-verificando en 100ms...');
    // Forzar actualización y re-verificar
    setForceUpdate(prev => prev + 1);
    // Pequeño delay para asegurar que la cookie se haya establecido
    setTimeout(() => {
      checkAuthentication();
    }, 100);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
      setIsAuthenticated(false);
      router.refresh();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  // Mostrar loader mientras verifica autenticación
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader />
          <p className="mt-4 text-gray-600">Verificando autenticación...</p>
          <button 
            onClick={checkAuthentication}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded text-sm"
          >
            🔄 Re-verificar
          </button>
        </div>
      </div>
    );
  }

  // Si no está autenticado, mostrar login
  if (!isAuthenticated) {
    return <LoginForm onLoginSuccess={handleLoginSuccess} />;
  }

  // Si está autenticado, mostrar dashboard con layout de admin
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen fixed left-0 top-0 z-10">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-xl font-light text-gray-900 tracking-tight">
              Panel de Admin
            </h1>
            <p className="text-sm text-gray-500 mt-2 font-light">
              MG Servicio Inmobiliario
            </p>
          </div>
          
          <nav className="mt-8">
            <div className="px-6 space-y-2">
              <div className="flex items-center px-4 py-3 text-sm font-light text-gray-700 bg-gray-100 rounded-sm">
                <span>Dashboard</span>
              </div>
            </div>
          </nav>
          
          {/* Acciones del panel */}
          <div className="absolute bottom-6 left-6 right-6 space-y-2">
            <button
              onClick={handleLogout}
              className="flex items-center justify-center w-full px-4 py-2 text-sm font-light text-red-600 border border-red-200 rounded-sm hover:bg-red-50 transition-colors"
            >
              Cerrar Sesión
            </button>
            <a
              href="/"
              className="block w-full text-center px-4 py-2 text-sm font-light text-gray-600 border border-gray-200 rounded-sm hover:bg-gray-50 transition-colors"
            >
              ← Volver al sitio
            </a>
          </div>
        </div>

        {/* Main content with margin for fixed sidebar */}
        <div className="flex-1 ml-64">
          <AdminDashboard />
        </div>
      </div>
    </div>
  );
}

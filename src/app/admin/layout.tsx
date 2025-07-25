'use client';

import { ReactNode } from 'react';
import { Home, Settings, Users } from 'lucide-react';
import NotificationProvider from '@/components/ui/notifications/NotificationProvider';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <NotificationProvider>
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
                <a
                  href="/admin"
                  className="flex items-center px-4 py-3 text-sm font-light text-gray-700 bg-gray-100 rounded-sm transition-colors hover:bg-gray-200"
                >
                  <Home className="h-4 w-4 mr-3 text-gray-500" strokeWidth={1.5} />
                  <span>Dashboard</span>
                </a>
                
                <a
                  href="/admin/properties"
                  className="flex items-center px-4 py-3 text-sm font-light text-gray-600 rounded-sm transition-colors hover:bg-gray-100"
                >
                  <Users className="h-4 w-4 mr-3 text-gray-500" strokeWidth={1.5} />
                  <span>Propiedades</span>
                </a>
                
                <a
                  href="/admin/settings"
                  className="flex items-center px-4 py-3 text-sm font-light text-gray-600 rounded-sm transition-colors hover:bg-gray-100"
                >
                  <Settings className="h-4 w-4 mr-3 text-gray-500" strokeWidth={1.5} />
                  <span>Configuración</span>
                </a>
              </div>
            </nav>
            
            {/* Regresar al sitio */}
            <div className="absolute bottom-6 left-6 right-6">
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
            {children}
          </div>
        </div>
      </div>
    </NotificationProvider>
  );
}

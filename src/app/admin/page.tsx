'use client';

import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

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
  return <AdminDashboard />;
}

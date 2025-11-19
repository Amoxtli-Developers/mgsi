'use client';

import { useState } from 'react';
import { useGetPropertiesQuery } from '@/store/propertiesApi';
import StatsCards from './StatsCards';
import PropertiesTable from './PropertiesTable';
import CreatePropertyModal from './CreatePropertyModal';
import TableSkeleton from './TableSkeleton';
import { Loader2, RefreshCw, Plus, LogOut } from 'lucide-react';

export default function AdminDashboard() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Llamar al endpoint sin filtro para obtener TODAS las propiedades
  const { data: properties = [], isLoading, error, refetch } = useGetPropertiesQuery({ active: 'all' });

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setRefreshKey(prev => prev + 1);
    try {
      await refetch();
    } finally {
      // Add a small delay to show the skeleton animation
      setTimeout(() => {
        setIsRefreshing(false);
      }, 300);
    }
  };

  const handleLogout = () => {
    // Clear authentication from localStorage
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_authenticated');
    // Reload the page to trigger auth check
    window.location.reload();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center space-x-3">
          <Loader2 className="h-6 w-6 animate-spin text-brand-primary" />
          <span className="text-gray-600 font-light">Cargando dashboard...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-600 mb-4">Error al cargar las propiedades</div>
          <button
            onClick={handleRefresh}
            className="minimal-button-primary"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-light text-gray-900 tracking-tight">
            Dashboard de Propiedades
          </h1>
          <p className="text-gray-600 text-sm font-light mt-1">
            Gestión y monitoreo de todas las propiedades
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-4 py-2 bg-brand-primary text-white text-xs font-light tracking-wide rounded-sm hover:bg-brand-primary/90 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-3 w-3" strokeWidth={1.5} />
            <span>Nueva Propiedad</span>
          </button>

          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-sm hover:bg-gray-50 transition-colors text-xs font-light text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`h-3 w-3 text-gray-500 ${isRefreshing ? 'animate-spin' : ''}`} strokeWidth={1.5} />
            <span>{isRefreshing ? 'Actualizando...' : 'Actualizar'}</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 border border-red-200 rounded-sm hover:bg-red-50 transition-colors text-xs font-light text-red-600"
          >
            <LogOut className="h-3 w-3 text-red-500" strokeWidth={1.5} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards properties={properties} />

      {/* Properties Table */}
      <div className="mt-8">
        {isRefreshing ? (
          <TableSkeleton />
        ) : (
          <PropertiesTable properties={properties} onRefresh={handleRefresh} />
        )}
      </div>

      {/* Create Property Modal */}
      <CreatePropertyModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
    </div>
  );
}

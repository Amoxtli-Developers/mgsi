'use client';

import { useState } from 'react';
import { Eye, EyeOff, Edit, Trash2, MapPin, Calendar, Building } from 'lucide-react';
import { useDeletePropertyMutation } from '@/store/propertiesApi';
import { useNotification } from '@/components/ui/notifications/NotificationProvider';
import DeleteConfirmModal from './DeleteConfirmModal';
import EditPropertyModal from './EditPropertyModal';
import type { Property } from '@/types';

interface PropertiesTableProps {
  properties: Property[];
  onRefresh: () => void;
}

export default function PropertiesTable({ properties, onRefresh }: PropertiesTableProps) {
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [sortField, setSortField] = useState<'name' | 'createdAt' | 'rentPrice' | 'salePrice'>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<Property | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [propertyToEdit, setPropertyToEdit] = useState<Property | null>(null);
  
  const [deleteProperty, { isLoading: isDeleting }] = useDeletePropertyMutation();
  const { showNotification } = useNotification();

  const filteredProperties = properties.filter(property => {
    if (filter === 'active') return property.active;
    if (filter === 'inactive') return !property.active;
    return true;
  });

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    
    if (sortField === 'createdAt') {
      aValue = new Date(aValue).getTime();
      bValue = new Date(bValue).getTime();
    }
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const toggleActiveStatus = async (propertyId: string, currentStatus: boolean) => {
    // TODO: Implementar API call para actualizar el status
    console.log(`Toggle property ${propertyId} from ${currentStatus} to ${!currentStatus}`);
    // onRefresh();
  };

  const handleDeleteClick = (property: Property) => {
    setPropertyToDelete(property);
    setDeleteModalOpen(true);
  };

  const handleEditClick = (property: Property) => {
    setPropertyToEdit(property);
    setEditModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!propertyToDelete) return;

    try {
      const result = await deleteProperty(propertyToDelete._id).unwrap();
      
      showNotification({
        type: 'success',
        title: 'Propiedad eliminada',
        message: `La propiedad "${result.deletedProperty.name}" ha sido eliminada exitosamente.`,
      });

      setDeleteModalOpen(false);
      setPropertyToDelete(null);
      onRefresh();
    } catch (error: any) {
      showNotification({
        type: 'error',
        title: 'Error al eliminar',
        message: error?.data?.message || 'No se pudo eliminar la propiedad. Inténtalo nuevamente.',
      });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setPropertyToDelete(null);
  };

  const handleEditClose = () => {
    setEditModalOpen(false);
    setPropertyToEdit(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatPrice = (price: number) => {
    if (price === 0) return '-';
    return price.toLocaleString('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0
    });
  };

  return (
    <>
      <div className="bg-white rounded-sm border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-light text-gray-900 tracking-tight">
            Propiedades ({sortedProperties.length})
          </h2>
          
          {/* Filters */}
          <div className="flex items-center space-x-4">
            <div className="flex bg-gray-100 rounded-sm p-1">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 text-xs font-light rounded-sm transition-colors ${
                  filter === 'all' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Todas ({properties.length})
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`px-3 py-1 text-xs font-light rounded-sm transition-colors ${
                  filter === 'active' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Activas ({properties.filter(p => p.active).length})
              </button>
              <button
                onClick={() => setFilter('inactive')}
                className={`px-3 py-1 text-xs font-light rounded-sm transition-colors ${
                  filter === 'inactive' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Inactivas ({properties.filter(p => !p.active).length})
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-light text-gray-600 tracking-wider">
                Propiedad
              </th>
              <th className="px-6 py-3 text-left text-xs font-light text-gray-600 tracking-wider">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 hover:text-gray-900"
                >
                  <span>Nombre</span>
                  {sortField === 'name' && (
                    <span className="text-brand-primary">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-light text-gray-600 tracking-wider">
                Tipo
              </th>
              <th className="px-6 py-3 text-left text-xs font-light text-gray-600 tracking-wider">
                <button
                  onClick={() => handleSort('rentPrice')}
                  className="flex items-center space-x-1 hover:text-gray-900"
                >
                  <span>Renta</span>
                  {sortField === 'rentPrice' && (
                    <span className="text-brand-primary">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-light text-gray-600 tracking-wider">
                <button
                  onClick={() => handleSort('salePrice')}
                  className="flex items-center space-x-1 hover:text-gray-900"
                >
                  <span>Venta</span>
                  {sortField === 'salePrice' && (
                    <span className="text-brand-primary">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-light text-gray-600 tracking-wider">
                <button
                  onClick={() => handleSort('createdAt')}
                  className="flex items-center space-x-1 hover:text-gray-900"
                >
                  <span>Fecha</span>
                  {sortField === 'createdAt' && (
                    <span className="text-brand-primary">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-light text-gray-600 tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-light text-gray-600 tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedProperties.map((property) => (
              <tr key={property._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-100 rounded-sm flex items-center justify-center flex-shrink-0">
                      <Building className="h-5 w-5 text-gray-500" strokeWidth={1.5} />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-light text-gray-900 max-w-xs truncate">
                      {property.name}
                    </div>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <MapPin className="h-3 w-3 mr-1" strokeWidth={1.5} />
                      {property.surface}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {property.type && (
                    <span className="inline-flex items-center px-2 py-1 rounded-sm text-xs font-light bg-gray-100 text-gray-700">
                      {property.type}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900">
                  {formatPrice(property.rentPrice)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900">
                  {formatPrice(property.salePrice)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="h-3 w-3 mr-1" strokeWidth={1.5} />
                    {formatDate(property.createdAt)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => toggleActiveStatus(property._id, property.active)}
                    className={`inline-flex items-center px-3 py-1 rounded-sm text-xs font-light transition-colors ${
                      property.active
                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                        : 'bg-red-100 text-red-800 hover:bg-red-200'
                    }`}
                  >
                    {property.active ? (
                      <>
                        <Eye className="h-3 w-3 mr-1" strokeWidth={1.5} />
                        Activa
                      </>
                    ) : (
                      <>
                        <EyeOff className="h-3 w-3 mr-1" strokeWidth={1.5} />
                        Inactiva
                      </>
                    )}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handleEditClick(property)}
                      className="text-gray-400 hover:text-brand-primary transition-colors"
                    >
                      <Edit className="h-4 w-4" strokeWidth={1.5} />
                    </button>
                    <button 
                      onClick={() => handleDeleteClick(property)}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sortedProperties.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 font-light">
            No se encontraron propiedades
          </div>
        </div>
      )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        propertyName={propertyToDelete?.name || ''}
        isDeleting={isDeleting}
      />

      {/* Edit Property Modal */}
      <EditPropertyModal
        isOpen={editModalOpen}
        onClose={handleEditClose}
        property={propertyToEdit}
      />
    </>
  );
}

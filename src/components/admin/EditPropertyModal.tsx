'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Plus, Loader2 } from 'lucide-react';
import { useUpdatePropertyMutation } from '@/store/propertiesApi';
import { useNotification } from '@/components/ui/notifications/NotificationProvider';
import type { Property } from '@/types';

const propertySchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').max(200, 'Máximo 200 caracteres'),
  surface: z.string().min(1, 'La superficie es requerida').max(100, 'Máximo 100 caracteres'),
  description: z.string().min(1, 'La descripción es requerida').max(1000, 'Máximo 1000 caracteres'),
  rentPrice: z.number().min(0, 'El precio debe ser positivo').optional(),
  salePrice: z.number().min(0, 'El precio debe ser positivo').optional(),
  amenities: z.array(z.string()).optional(),
  notes: z.string().max(500, 'Máximo 500 caracteres').optional(),
  image: z.string().url('Debe ser una URL válida').optional().or(z.literal('')),
  type: z.enum(['Renta', 'Venta', 'Ambos']).optional(),
  active: z.boolean().optional(),
}).refine((data) => {
  return (data.rentPrice && data.rentPrice > 0) || (data.salePrice && data.salePrice > 0);
}, {
  message: 'Debe especificar al menos un precio (renta o venta)',
  path: ['rentPrice'],
});

type PropertyFormData = z.infer<typeof propertySchema>;

interface EditPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property | null;
}

export default function EditPropertyModal({ isOpen, onClose, property }: EditPropertyModalProps) {
  const [updateProperty, { isLoading }] = useUpdatePropertyMutation();
  const { showNotification } = useNotification();
  const [amenityInput, setAmenityInput] = useState('');
  const [amenitiesList, setAmenitiesList] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
  });

  const rentPrice = watch('rentPrice');
  const salePrice = watch('salePrice');

  // Cargar datos de la propiedad cuando se abre el modal
  useEffect(() => {
    if (isOpen && property) {
      reset({
        name: property.name,
        surface: property.surface,
        description: property.description,
        rentPrice: property.rentPrice || 0,
        salePrice: property.salePrice || 0,
        notes: property.notes || '',
        image: property.image || '',
        type: property.type,
        active: property.active,
      });
      setAmenitiesList(property.amenities || []);
      setValue('amenities', property.amenities || []);
    }
  }, [isOpen, property, reset, setValue]);

  const addAmenity = () => {
    if (amenityInput.trim() && !amenitiesList.includes(amenityInput.trim())) {
      const newAmenities = [...amenitiesList, amenityInput.trim()];
      setAmenitiesList(newAmenities);
      setValue('amenities', newAmenities);
      setAmenityInput('');
    }
  };

  const removeAmenity = (index: number) => {
    const newAmenities = amenitiesList.filter((_, i) => i !== index);
    setAmenitiesList(newAmenities);
    setValue('amenities', newAmenities);
  };

  const onSubmit = async (data: PropertyFormData) => {
    if (!property) return;

    try {
      const updateData = {
        ...data,
        amenities: amenitiesList,
        rentPrice: data.rentPrice || 0,
        salePrice: data.salePrice || 0,
      };

      const result = await updateProperty({
        id: property._id,
        data: updateData,
      }).unwrap();
      
      showNotification({
        type: 'success',
        title: 'Propiedad actualizada exitosamente',
        message: `La propiedad "${result.property.name}" ha sido actualizada correctamente.`,
      });

      onClose();
    } catch (error: any) {
      showNotification({
        type: 'error',
        title: 'Error al actualizar propiedad',
        message: error?.data?.message || 'Ocurrió un error inesperado. Inténtalo nuevamente.',
      });
    }
  };

  const handleClose = () => {
    reset();
    setAmenitiesList([]);
    setAmenityInput('');
    onClose();
  };

  if (!isOpen || !property) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={handleClose} />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white rounded-sm shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-lg font-light text-gray-900 tracking-tight">
              Editar Propiedad
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            {/* Información Básica */}
            <div className="space-y-4">
              <h3 className="text-sm font-light text-gray-900 tracking-tight uppercase">
                Información Básica
              </h3>
              
              <div>
                <label className="block text-xs font-light text-gray-600 mb-2 tracking-wide uppercase">
                  Nombre de la Propiedad *
                </label>
                <input
                  {...register('name')}
                  className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-brand-primary text-sm"
                  placeholder="Ej: AV. PATRIOTISMO No. 409 DESP. 502"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-600 font-light">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-light text-gray-600 mb-2 tracking-wide uppercase">
                  Superficie *
                </label>
                <input
                  {...register('surface')}
                  className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-brand-primary text-sm"
                  placeholder="Ej: 60 MTS"
                />
                {errors.surface && (
                  <p className="mt-1 text-xs text-red-600 font-light">{errors.surface.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-light text-gray-600 mb-2 tracking-wide uppercase">
                  Descripción *
                </label>
                <textarea
                  {...register('description')}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-brand-primary text-sm resize-none"
                  placeholder="Describe las características de la propiedad..."
                />
                {errors.description && (
                  <p className="mt-1 text-xs text-red-600 font-light">{errors.description.message}</p>
                )}
              </div>
            </div>

            {/* Precios */}
            <div className="space-y-4">
              <h3 className="text-sm font-light text-gray-900 tracking-tight uppercase">
                Precios
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-light text-gray-600 mb-2 tracking-wide uppercase">
                    Precio de Renta (MXN)
                  </label>
                  <input
                    {...register('rentPrice', { valueAsNumber: true })}
                    type="number"
                    min="0"
                    step="100"
                    className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-brand-primary text-sm"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-xs font-light text-gray-600 mb-2 tracking-wide uppercase">
                    Precio de Venta (MXN)
                  </label>
                  <input
                    {...register('salePrice', { valueAsNumber: true })}
                    type="number"
                    min="0"
                    step="1000"
                    className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-brand-primary text-sm"
                    placeholder="0"
                  />
                </div>
              </div>
              
              {errors.rentPrice && (
                <p className="text-xs text-red-600 font-light">{errors.rentPrice.message}</p>
              )}
            </div>

            {/* Estado y Tipo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-light text-gray-600 mb-2 tracking-wide uppercase">
                  Tipo de Propiedad
                </label>
                <select
                  {...register('type')}
                  className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-brand-primary text-sm"
                >
                  <option value="">Seleccionar tipo...</option>
                  <option value="Renta">Renta</option>
                  <option value="Venta">Venta</option>
                  <option value="Ambos">Ambos (Renta y Venta)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-light text-gray-600 mb-2 tracking-wide uppercase">
                  Estado
                </label>
                <select
                  {...register('active', { setValueAs: (value) => value === 'true' })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-brand-primary text-sm"
                >
                  <option value="true">Activa</option>
                  <option value="false">Inactiva</option>
                </select>
              </div>
            </div>

            {/* Amenidades */}
            <div className="space-y-4">
              <h3 className="text-sm font-light text-gray-900 tracking-tight uppercase">
                Amenidades
              </h3>
              
              <div className="flex gap-2">
                <input
                  value={amenityInput}
                  onChange={(e) => setAmenityInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAmenity())}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-brand-primary text-sm"
                  placeholder="Agregar amenidad..."
                />
                <button
                  type="button"
                  onClick={addAmenity}
                  className="px-3 py-2 bg-gray-100 text-gray-600 rounded-sm hover:bg-gray-200 transition-colors"
                >
                  <Plus className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>

              {amenitiesList.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {amenitiesList.map((amenity, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-sm"
                    >
                      {amenity}
                      <button
                        type="button"
                        onClick={() => removeAmenity(index)}
                        className="ml-2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-3 w-3" strokeWidth={1.5} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Información Adicional */}
            <div className="space-y-4">
              <h3 className="text-sm font-light text-gray-900 tracking-tight uppercase">
                Información Adicional
              </h3>
              
              <div>
                <label className="block text-xs font-light text-gray-600 mb-2 tracking-wide uppercase">
                  URL de Imagen
                </label>
                <input
                  {...register('image')}
                  className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-brand-primary text-sm"
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
                {errors.image && (
                  <p className="mt-1 text-xs text-red-600 font-light">{errors.image.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-light text-gray-600 mb-2 tracking-wide uppercase">
                  Notas
                </label>
                <textarea
                  {...register('notes')}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-brand-primary text-sm resize-none"
                  placeholder="Notas adicionales sobre la propiedad..."
                />
                {errors.notes && (
                  <p className="mt-1 text-xs text-red-600 font-light">{errors.notes.message}</p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-xs font-light text-gray-600 border border-gray-200 rounded-sm hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-brand-primary text-white text-xs font-light tracking-wide rounded-sm hover:bg-brand-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isLoading && <Loader2 className="h-3 w-3 animate-spin" strokeWidth={1.5} />}
                <span>{isLoading ? 'Actualizando...' : 'Actualizar Propiedad'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

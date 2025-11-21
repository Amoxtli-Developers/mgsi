'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Plus, Loader2, Upload, Trash2, ImageOff } from 'lucide-react';
import { useCreatePropertyMutation } from '@/store/propertiesApi';
import { useNotification } from '@/components/ui/notifications/NotificationProvider';
import Image from 'next/image';

const propertySchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').max(200, 'Máximo 200 caracteres'),
  surface: z.string().min(1, 'La superficie es requerida').max(100, 'Máximo 100 caracteres'),
  description: z.string().min(1, 'La descripción es requerida').max(1000, 'Máximo 1000 caracteres'),
  rentPrice: z.number().min(0, 'El precio debe ser positivo').optional(),
  salePrice: z.number().min(0, 'El precio debe ser positivo').optional(),
  amenities: z.array(z.string()).optional(),
  notes: z.string().max(500, 'Máximo 500 caracteres').optional(),
  type: z.enum(['Renta', 'Venta', 'Ambos']).optional(),
}).refine((data) => {
  return (data.rentPrice && data.rentPrice > 0) || (data.salePrice && data.salePrice > 0);
}, {
  message: 'Debe especificar al menos un precio (renta o venta)',
  path: ['rentPrice'],
});

type PropertyFormData = z.infer<typeof propertySchema>;

interface CreatePropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreatePropertyModal({ isOpen, onClose }: CreatePropertyModalProps) {
  const [createProperty, { isLoading }] = useCreatePropertyMutation();
  const { showNotification } = useNotification();
  const [amenityInput, setAmenityInput] = useState('');
  const [amenitiesList, setAmenitiesList] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [deletingImageIndex, setDeletingImageIndex] = useState<number | null>(null);
  const [tempPropertyId] = useState(() => `temp-${Date.now()}`);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      rentPrice: 0,
      salePrice: 0,
      amenities: [],
      notes: '',
    },
  });

  const rentPrice = watch('rentPrice');
  const salePrice = watch('salePrice');

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

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (files.length === 0) return;

    // Check if adding these files would exceed the 5 image limit
    if (uploadedImages.length + files.length > 5) {
      showNotification({
        type: 'error',
        title: 'Límite de imágenes excedido',
        message: `Solo puedes tener máximo 5 imágenes por propiedad. Actualmente tienes ${uploadedImages.length}.`,
      });
      e.target.value = '';
      return;
    }

    // Validate file types
    const validFiles = files.filter((file) => {
      const isValid = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type);
      if (!isValid) {
        showNotification({
          type: 'error',
          title: 'Tipo de archivo inválido',
          message: `${file.name} no es un formato válido. Solo se permiten JPG, PNG y WebP.`,
        });
      }
      return isValid;
    });

    // Validate file sizes (10MB max)
    const validSizedFiles = validFiles.filter((file) => {
      const isValid = file.size <= 10 * 1024 * 1024; // 10MB
      if (!isValid) {
        showNotification({
          type: 'error',
          title: 'Archivo muy grande',
          message: `${file.name} excede el límite de 10MB.`,
        });
      }
      return isValid;
    });

    if (validSizedFiles.length === 0) return;

    setIsUploading(true);

    try {
      const uploadPromises = validSizedFiles.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('propertyId', tempPropertyId);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Error uploading file');
        }

        const data = await response.json();
        return data.imageUrl;
      });

      const urls = await Promise.all(uploadPromises);
      setUploadedImages((prev) => [...prev, ...urls]);
      setSelectedFiles((prev) => [...prev, ...validSizedFiles]);

      showNotification({
        type: 'success',
        title: 'Imágenes cargadas',
        message: `${urls.length} imagen(es) cargada(s) exitosamente.`,
      });
    } catch (error: any) {
      showNotification({
        type: 'error',
        title: 'Error al cargar imágenes',
        message: error.message || 'Ocurrió un error al cargar las imágenes.',
      });
    } finally {
      setIsUploading(false);
      // Reset file input
      e.target.value = '';
    }
  };

  const removeImage = async (index: number) => {
    const imageUrl = uploadedImages[index];

    setDeletingImageIndex(index);

    try {
      const response = await fetch(`/api/upload?imageUrl=${encodeURIComponent(imageUrl)}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error deleting image');
      }

      setUploadedImages((prev) => prev.filter((_, i) => i !== index));
      setSelectedFiles((prev) => prev.filter((_, i) => i !== index));

      showNotification({
        type: 'success',
        title: 'Imagen eliminada',
        message: 'La imagen ha sido eliminada correctamente.',
      });
    } catch (error) {
      showNotification({
        type: 'error',
        title: 'Error al eliminar',
        message: 'No se pudo eliminar la imagen.',
      });
    } finally {
      setDeletingImageIndex(null);
    }
  };

  const onSubmit = async (data: PropertyFormData) => {
    try {
      const propertyData = {
        ...data,
        amenities: amenitiesList,
        rentPrice: data.rentPrice || 0,
        salePrice: data.salePrice || 0,
        images: uploadedImages,
      };

      const result = await createProperty(propertyData).unwrap();

      showNotification({
        type: 'success',
        title: 'Propiedad creada exitosamente',
        message: `La propiedad "${result.property.name}" ha sido creada correctamente.`,
      });

      // Reset form and close modal
      reset();
      setAmenitiesList([]);
      setAmenityInput('');
      setSelectedFiles([]);
      setUploadedImages([]);
      onClose();
    } catch (error: any) {
      showNotification({
        type: 'error',
        title: 'Error al crear propiedad',
        message: error?.data?.message || 'Ocurrió un error inesperado. Inténtalo nuevamente.',
      });
    }
  };

  const handleClose = () => {
    reset();
    setAmenitiesList([]);
    setAmenityInput('');
    setSelectedFiles([]);
    setUploadedImages([]);
    onClose();
  };

  if (!isOpen) return null;

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
              Crear Nueva Propiedad
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

            {/* Tipo */}
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

            {/* Imágenes */}
            <div className="space-y-4">
              <h3 className="text-sm font-light text-gray-900 tracking-tight uppercase">
                Imágenes
              </h3>

              <div>
                <label className="block text-xs font-light text-gray-600 mb-2 tracking-wide uppercase">
                  Cargar Imágenes (JPG, PNG, WebP - máx 5 imágenes, 10MB cada una)
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-200 border-dashed rounded-sm cursor-pointer hover:border-brand-primary transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-gray-400" strokeWidth={1.5} />
                      <p className="mb-1 text-xs text-gray-500 font-light">
                        <span className="font-normal">Click para cargar</span> o arrastra archivos
                      </p>
                      <p className="text-xs text-gray-400 font-light">JPG, PNG o WebP</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      multiple
                      onChange={handleFileSelect}
                      disabled={isUploading}
                    />
                  </label>
                </div>

                {isUploading && (
                  <div className="flex items-center justify-center mt-3 text-xs text-gray-500">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" strokeWidth={1.5} />
                    Subiendo imágenes...
                  </div>
                )}
              </div>

              {uploadedImages.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  {uploadedImages.map((imageUrl, index) => (
                    <div key={index} className="relative group aspect-square rounded-sm overflow-hidden border border-gray-200">
                      <Image
                        src={imageUrl}
                        alt={`Imagen ${index + 1}`}
                        fill
                        className="object-cover"
                      />

                      {/* Loading overlay when deleting */}
                      {deletingImageIndex === index && (
                        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-20">
                          <div className="flex flex-col items-center">
                            <Loader2 className="h-6 w-6 text-white animate-spin mb-1" strokeWidth={1.5} />
                            <span className="text-white text-xs">Eliminando...</span>
                          </div>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        disabled={deletingImageIndex === index}
                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-sm opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Trash2 className="h-3 w-3" strokeWidth={1.5} />
                      </button>
                      {index === 0 && (
                        <div className="absolute bottom-1 left-1 px-2 py-0.5 bg-black bg-opacity-75 text-white text-xs rounded-sm">
                          Principal
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
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
                disabled={isLoading || isUploading}
                className="px-4 py-2 bg-brand-primary text-white text-xs font-light tracking-wide rounded-sm hover:bg-brand-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isLoading && <Loader2 className="h-3 w-3 animate-spin" strokeWidth={1.5} />}
                <span>{isLoading ? 'Creando...' : 'Crear Propiedad'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

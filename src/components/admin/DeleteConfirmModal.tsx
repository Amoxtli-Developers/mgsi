'use client';

import { AlertTriangle, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  propertyName: string;
  isDeleting: boolean;
}

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  propertyName,
  isDeleting
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-md bg-white rounded-sm shadow-xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-100 rounded-sm flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-red-600" strokeWidth={1.5} />
              </div>
              <h2 className="text-lg font-light text-gray-900 tracking-tight">
                Eliminar Propiedad
              </h2>
            </div>
            <button
              onClick={onClose}
              disabled={isDeleting}
              className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <p className="text-sm text-gray-600 leading-relaxed font-light mb-4">
              ¿Estás seguro que deseas eliminar la siguiente propiedad?
            </p>
            
            <div className="bg-gray-50 p-4 rounded-sm border border-gray-200 mb-6">
              <p className="text-sm font-light text-gray-900 break-words">
                <span className="font-normal">Propiedad:</span> {propertyName}
              </p>
            </div>

            <div className="bg-red-50 border border-red-200 p-4 rounded-sm">
              <p className="text-xs text-red-800 font-light">
                <strong className="font-normal">Advertencia:</strong> Esta acción no se puede deshacer. 
                La propiedad será eliminada permanentemente de la base de datos.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
            <button
              onClick={onClose}
              disabled={isDeleting}
              className="px-4 py-2 text-xs font-light text-gray-600 border border-gray-200 rounded-sm hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              disabled={isDeleting}
              className="px-4 py-2 bg-red-600 text-white text-xs font-light tracking-wide rounded-sm hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDeleting ? 'Eliminando...' : 'Eliminar Propiedad'}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

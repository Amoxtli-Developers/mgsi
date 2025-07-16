'use client';

import { motion } from 'framer-motion';

interface LoaderProps {
  message?: string;
}

export default function Loader({ message = 'Cargando...' }: LoaderProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="text-center">
        {/* Animated Logo */}
        <motion.div
          className="w-16 h-16 mx-auto mb-6"
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <div className="w-full h-full bg-brand-primary rounded-full relative">
            <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-brand-primary rounded-full"></div>
            </div>
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-gray-900 mb-2"
        >
          MG Servicio Inmobiliario
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-600"
        >
          {message}
        </motion.p>

        {/* Loading Bar */}
        <div className="w-64 h-1 bg-gray-200 rounded-full mx-auto mt-6 overflow-hidden">
          <motion.div
            className="h-full bg-brand-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        </div>
      </div>
    </div>
  );
}

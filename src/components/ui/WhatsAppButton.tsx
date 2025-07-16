'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const whatsappNumber = "5255342493"; // Número de WhatsApp
  const defaultMessage = "Hola, me interesa obtener más información sobre sus servicios inmobiliarios.";

  const openWhatsApp = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      {/* Main WhatsApp Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
      >
        <button
          onClick={openWhatsApp}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 relative"
          aria-label="Contactar por WhatsApp"
        >
          <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform" />
        </button>
      </motion.div>

      {/* Tooltip on hover */}
      <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg border whitespace-nowrap">
          <div className="text-sm font-medium">¿Necesitas ayuda?</div>
          <div className="text-xs text-gray-600">Escríbenos por WhatsApp</div>
          
          {/* Arrow pointing down */}
          <div className="absolute top-full right-4 transform -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-white"></div>
        </div>
      </div>
    </div>
  );
}

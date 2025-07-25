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
    <div className="fixed bottom-8 right-8 z-50 group">
      {/* Main WhatsApp Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
      >
        <button
          onClick={openWhatsApp}
          className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-sm shadow-sm hover:shadow-md transition-all duration-300 hover:transform hover:scale-105"
          aria-label="Contactar por WhatsApp"
        >
          <MessageCircle className="h-5 w-5" strokeWidth={1.5} />
        </button>
      </motion.div>

      {/* Tooltip on hover */}
      <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none transform translate-y-1 group-hover:translate-y-0">
        <div className="bg-white text-gray-700 px-3 py-2 rounded-sm shadow-md border border-gray-100 whitespace-nowrap">
          <div className="text-xs font-light">¿Necesitas ayuda?</div>
          <div className="text-xs text-gray-500 font-light">Escríbenos por WhatsApp</div>
          
          {/* Arrow pointing down */}
          <div className="absolute top-full right-3 w-0 h-0 border-l-2 border-l-transparent border-r-2 border-r-transparent border-t-2 border-t-gray-100"></div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Building, ArrowRight } from 'lucide-react';

export default function EmptyPropertiesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section id="portfolio" className="section-padding bg-gray-50" ref={sectionRef}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="section-title">Nuestras Propiedades</h2>
          
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-12 rounded-lg shadow-lg"
            >
              <Building className="h-16 w-16 text-brand-primary mx-auto mb-6" />
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Propiedades Próximamente
              </h3>
              
              <p className="text-gray-600 mb-8 leading-relaxed">
                Estamos actualizando nuestro portafolio de propiedades. 
                Contáctanos directamente para conocer nuestras opciones disponibles.
              </p>
              
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center bg-brand-primary text-white px-8 py-3 rounded-lg hover:bg-brand-primary/90 transition-colors font-semibold"
              >
                Contáctanos
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

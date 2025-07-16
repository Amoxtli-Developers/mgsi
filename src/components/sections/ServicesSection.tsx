'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Home, CreditCard, Building2, FileText, UserCheck, Shield } from 'lucide-react';

const services = [
  {
    icon: Home,
    title: 'Compra y Venta',
    description: 'Asesoría completa en procesos de compra y venta de propiedades residenciales y comerciales.',
    features: ['Valuación profesional', 'Negociación', 'Documentación legal'],
  },
  {
    icon: CreditCard,
    title: 'Renta y Arrendamiento',
    description: 'Gestión integral de propiedades en renta con seguimiento completo del proceso.',
    features: ['Búsqueda de inquilinos', 'Contratos legales', 'Administración'],
  },
  {
    icon: Building2,
    title: 'Administración',
    description: 'Administración profesional de propiedades con mantenimiento y supervisión constante.',
    features: ['Mantenimiento', 'Cobros', 'Reportes mensuales'],
  },
  {
    icon: FileText,
    title: 'Asesoría Legal',
    description: 'Soporte legal especializado en todas las transacciones inmobiliarias.',
    features: ['Revisión de documentos', 'Trámites notariales', 'Resolución de conflictos'],
  },
  {
    icon: UserCheck,
    title: 'Consultoría',
    description: 'Consultoría especializada para inversionistas y desarrolladores inmobiliarios.',
    features: ['Análisis de mercado', 'Estrategias de inversión', 'Estudios de factibilidad'],
  },
  {
    icon: Shield,
    title: 'Seguros',
    description: 'Protección integral para tu patrimonio inmobiliario con seguros especializados.',
    features: ['Seguros de propiedad', 'Cobertura legal', 'Asesoría en reclamaciones'],
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section id="services" className="section-padding bg-gray-50" ref={sectionRef}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Nuestros Servicios</h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            Ofrecemos una gama completa de servicios inmobiliarios diseñados 
            para cubrir todas tus necesidades en el sector inmobiliario.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow group"
              >
                <div className="bg-brand-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-primary/20 transition-colors">
                  <Icon className="h-8 w-8 text-brand-primary" />
                </div>
                
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-brand-primary rounded-full mr-3 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-brand-primary text-white p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">
              ¿Necesitas asesoría personalizada?
            </h3>
            <p className="text-xl mb-6 opacity-90">
              Nuestro equipo de expertos está listo para ayudarte con tu próximo proyecto inmobiliario.
            </p>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-brand-primary font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Contacta con nosotros
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

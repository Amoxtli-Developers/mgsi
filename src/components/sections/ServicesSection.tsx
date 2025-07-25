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
    <section id="services" className="section-padding bg-gray-50/30" ref={sectionRef}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-24"
        >
          <h2 className="section-title text-balance">Nuestros Servicios</h2>
          <div className="max-w-2xl mx-auto">
            <p className="text-base text-gray-600 leading-relaxed font-light">
              Ofrecemos una gama completa de servicios inmobiliarios diseñados 
              para cubrir todas tus necesidades en el sector inmobiliario.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                className="minimal-card group hover:transform hover:translateY-[-2px]"
              >
                <div className="mb-8">
                  <Icon className="h-6 w-6 text-brand-primary mb-6 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                  
                  <h3 className="text-lg font-light mb-4 text-gray-900 tracking-tight">
                    {service.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-8 leading-relaxed font-light">
                    {service.description}
                  </p>
                </div>
                
                <div className="border-t border-gray-100 pt-6">
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-xs text-gray-500 font-light">
                        <div className="w-1 h-1 bg-brand-primary rounded-full mr-3 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="text-center mt-32"
        >
          <div className="max-w-2xl mx-auto">
            <div className="border border-gray-200 bg-white p-12 rounded-sm">
              <h3 className="text-xl font-light mb-6 text-gray-900 tracking-tight">
                ¿Necesitas asesoría personalizada?
              </h3>
              <p className="text-sm text-gray-600 mb-8 font-light leading-relaxed">
                Nuestro equipo de expertos está listo para ayudarte con tu próximo proyecto inmobiliario.
              </p>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="minimal-button-primary rounded-sm hover:transform hover:scale-[1.02]"
              >
                Contacta con nosotros
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

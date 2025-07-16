'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle, Users, Award, Clock } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: '40+ Años de Experiencia',
    description: 'Más de cuatro décadas brindando servicios inmobiliarios de calidad en México.',
  },
  {
    icon: Award,
    title: 'Profesionales Certificados',
    description: 'Equipo de expertos en áreas inmobiliaria, administrativa y legal.',
  },
  {
    icon: CheckCircle,
    title: 'Servicio Integral',
    description: 'Compra, venta, renta y administración de propiedades.',
  },
  {
    icon: Clock,
    title: 'Asesoría Personalizada',
    description: 'Atención dedicada y soluciones adaptadas a cada cliente.',
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section id="about" className="section-padding bg-white" ref={sectionRef}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Acerca de Nosotros</h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            Somos un grupo de profesionistas con más de 40 años de experiencia en el área 
            inmobiliaria, administrativa y legal, con el propósito de ayudar a nuestros 
            clientes en operaciones de compra, venta, renta y administración inmobiliaria.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="bg-brand-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-primary/20 transition-colors">
                  <Icon className="h-8 w-8 text-brand-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-gray-50 p-8 rounded-lg mt-16"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Nuestra Misión
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Brindar servicios inmobiliarios integrales de la más alta calidad, 
              combinando nuestra vasta experiencia con un enfoque personalizado 
              para cada cliente. Nos comprometemos a facilitar las decisiones 
              inmobiliarias más importantes de nuestros clientes con transparencia, 
              profesionalismo y dedicación.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

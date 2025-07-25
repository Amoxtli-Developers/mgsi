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
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-24"
        >
          <h2 className="section-title text-balance">Acerca de Nosotros</h2>
          <div className="max-w-2xl mx-auto">
            <p className="text-base text-gray-600 leading-relaxed font-light">
              Somos un grupo de profesionistas con más de 40 años de experiencia en el área 
              inmobiliaria, administrativa y legal, con el propósito de ayudar a nuestros 
              clientes en operaciones de compra, venta, renta y administración inmobiliaria.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
                className="text-center group"
              >
                <div className="w-12 h-12 mx-auto mb-6 flex items-center justify-center">
                  <Icon className="h-6 w-6 text-brand-primary group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-light mb-4 text-gray-900 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed font-light">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="mt-32"
        >
          <div className="max-w-3xl mx-auto text-center">
            <div className="border-t border-gray-100 pt-16">
              <h3 className="text-xl font-light text-gray-900 mb-8 tracking-tight">
                Nuestra Misión
              </h3>
              <p className="text-base text-gray-600 leading-loose font-light">
                Brindar servicios inmobiliarios integrales de la más alta calidad, 
                combinando nuestra vasta experiencia con un enfoque personalizado 
                para cada cliente. Nos comprometemos a facilitar las decisiones 
                inmobiliarias más importantes de nuestros clientes con transparencia, 
                profesionalismo y dedicación.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

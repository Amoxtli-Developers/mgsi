'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'María González',
    role: 'Propietaria',
    content: 'Excelente servicio y atención personalizada. Vendieron mi propiedad en tiempo récord y con el mejor precio del mercado.',
    rating: 5,
    image: 'https://via.placeholder.com/80x80?text=MG',
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    role: 'Inversionista',
    content: 'Más de 10 años trabajando con MG Servicio Inmobiliario. Su experiencia y profesionalismo son incomparables.',
    rating: 5,
    image: 'https://via.placeholder.com/80x80?text=CR',
  },
  {
    id: 3,
    name: 'Ana Martínez',
    role: 'Compradora',
    content: 'Encontraron la casa perfecta para mi familia. El proceso fue transparente y sin complicaciones.',
    rating: 5,
    image: 'https://via.placeholder.com/80x80?text=AM',
  },
  {
    id: 4,
    name: 'Roberto Silva',
    role: 'Arrendador',
    content: 'Administran mis propiedades de manera eficiente. Siempre recibo mis pagos a tiempo y sin problemas.',
    rating: 5,
    image: 'https://via.placeholder.com/80x80?text=RS',
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section id="testimonials" className="section-padding bg-white" ref={sectionRef}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Lo Que Dicen Nuestros Clientes</h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            La satisfacción de nuestros clientes es nuestra mejor carta de presentación. 
            Conoce las experiencias de quienes han confiado en nosotros.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-50 p-8 rounded-lg relative group hover:shadow-lg transition-shadow"
            >
              {/* Quote icon */}
              <div className="absolute top-4 right-4 text-brand-primary/20">
                <Quote className="h-8 w-8" />
              </div>

              {/* Stars */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 mb-6 italic leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-brand-primary text-white rounded-full flex items-center justify-center font-semibold text-sm mr-4">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-gray-200"
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-brand-primary mb-2">98%</div>
            <div className="text-gray-600">Clientes Satisfechos</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-brand-primary mb-2">1500+</div>
            <div className="text-gray-600">Operaciones Exitosas</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-brand-primary mb-2">40+</div>
            <div className="text-gray-600">Años de Experiencia</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

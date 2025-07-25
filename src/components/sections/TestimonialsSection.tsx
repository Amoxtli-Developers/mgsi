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
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-24"
        >
          <h2 className="section-title text-balance">Lo Que Dicen Nuestros Clientes</h2>
          <div className="max-w-2xl mx-auto">
            <p className="text-base text-gray-600 leading-relaxed font-light">
              La satisfacción de nuestros clientes es nuestra mejor carta de presentación. 
              Conoce las experiencias de quienes han confiado en nosotros.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
              className="relative group"
            >
              {/* Quote icon */}
              <div className="absolute -top-2 -left-2 text-brand-primary/10">
                <Quote className="h-8 w-8" strokeWidth={1} />
              </div>

              <div className="pl-6">
                {/* Stars */}
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-3 w-3 text-brand-primary fill-current mr-1"
                      strokeWidth={0}
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-700 mb-8 leading-loose font-light text-base">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center border-t border-gray-100 pt-6">
                  <div className="w-8 h-8 bg-brand-primary/10 text-brand-primary rounded-sm flex items-center justify-center font-light text-xs mr-4">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-light text-gray-900 text-sm tracking-tight">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-500 text-xs font-light">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="mt-32"
        >
          <div className="border-t border-gray-100 pt-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="text-3xl font-light text-brand-primary mb-3 tracking-tight">98%</div>
                <div className="text-gray-500 text-sm font-light tracking-wide">Clientes Satisfechos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-brand-primary mb-3 tracking-tight">1500+</div>
                <div className="text-gray-500 text-sm font-light tracking-wide">Operaciones Exitosas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-brand-primary mb-3 tracking-tight">40+</div>
                <div className="text-gray-500 text-sm font-light tracking-wide">Años de Experiencia</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

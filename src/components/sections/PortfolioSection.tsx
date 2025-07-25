'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { MapPin } from 'lucide-react';
import type { Property } from '@/types';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface PortfolioSectionProps {
  properties: Property[];
}

export default function PortfolioSection({ properties }: PortfolioSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section id="portfolio" className="section-padding bg-white" ref={sectionRef}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-24"
        >
          <h2 className="section-title text-balance">Propiedades</h2>
          <div className="max-w-2xl mx-auto">
            <p className="text-base text-gray-600 leading-relaxed font-light">
              Descubre nuestra selección de propiedades exclusivas
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="max-w-5xl mx-auto"
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            navigation
            pagination={{ 
              clickable: true,
              bulletClass: 'swiper-pagination-bullet',
              bulletActiveClass: 'swiper-pagination-bullet-active'
            }}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            className="property-swiper"
          >
            {properties.map((property) => (
              <SwiperSlide key={property._id}>
                <div className="bg-white">
                  {/* Imagen con altura reducida */}
                  <div className="relative w-full h-64 md:h-80 mb-6 overflow-hidden">
                    <Image
                      src={property.image || 'https://via.placeholder.com/800x400?text=Propiedad'}
                      alt={property.name}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                    {property.type && (
                      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-gray-700 px-3 py-1 text-xs font-light tracking-wide rounded-sm">
                        {property.type}
                      </div>
                    )}
                  </div>
                  
                  {/* Contenido más compacto */}
                  <div className="max-w-3xl mx-auto text-center px-4">
                    <h3 className="text-xl md:text-2xl font-light text-gray-900 mb-3 tracking-tight">
                      {property.name}
                    </h3>
                    
                    <div className="flex items-center justify-center mb-4">
                      <MapPin className="h-3 w-3 text-gray-400 mr-2" strokeWidth={1.5} />
                      <span className="text-gray-600 text-sm font-light">{property.surface}</span>
                    </div>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed font-light text-sm max-w-2xl mx-auto">
                      {property.description}
                    </p>
                    
                    {/* Amenidades más compactas */}
                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                      {property.amenities.slice(0, 3).map((amenity, index) => (
                        <span
                          key={index}
                          className="text-xs text-gray-500 border border-gray-200 px-3 py-1 font-light tracking-wide rounded-sm"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                    
                    {/* Precio más elegante */}
                    <div className="space-y-2">
                      {property.rentPrice > 0 && (
                        <div className="text-center">
                          <span className="text-xs text-gray-500 mr-4 uppercase tracking-wider font-light">Renta</span>
                          <span className="text-xl font-light text-gray-900 tracking-tight">
                            {property.rentPrice.toLocaleString('es-MX', {
                              style: 'currency',
                              currency: 'MXN',
                              minimumFractionDigits: 0,
                            })}
                          </span>
                        </div>
                      )}
                      {property.salePrice > 0 && (
                        <div className="text-center">
                          <span className="text-xs text-gray-500 mr-4 uppercase tracking-wider font-light">Venta</span>
                          <span className="text-xl font-light text-gray-900 tracking-tight">
                            {property.salePrice.toLocaleString('es-MX', {
                              style: 'currency',
                              currency: 'MXN',
                              minimumFractionDigits: 0,
                            })}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}

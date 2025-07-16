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
    <section id="portfolio" className="py-20 bg-white" ref={sectionRef}>
      <div className="container max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-light text-gray-900 mb-4">
            Propiedades
          </h2>
          <div className="w-12 h-px bg-brand-primary mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            Descubre nuestra selección de propiedades exclusivas
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            className="property-swiper"
          >
            {properties.map((property) => (
              <SwiperSlide key={property._id}>
                <div className="bg-white">
                  {/* Imagen */}
                  <div className="relative w-full h-96 mb-8">
                    <Image
                      src={property.image || 'https://via.placeholder.com/800x400?text=Propiedad'}
                      alt={property.name}
                      fill
                      className="object-cover"
                    />
                    {property.type && (
                      <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 text-sm font-medium">
                        {property.type}
                      </div>
                    )}
                  </div>
                  
                  {/* Contenido */}
                  <div className="max-w-2xl mx-auto text-center">
                    <h3 className="text-2xl font-light text-gray-900 mb-4">
                      {property.name}
                    </h3>
                    
                    <div className="flex items-center justify-center mb-6">
                      <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-gray-600">{property.surface}</span>
                    </div>
                    
                    <p className="text-gray-600 mb-8 leading-relaxed">
                      {property.description}
                    </p>
                    
                    {/* Amenidades */}
                    <div className="flex flex-wrap justify-center gap-3 mb-8">
                      {property.amenities.slice(0, 3).map((amenity, index) => (
                        <span
                          key={index}
                          className="text-sm text-gray-500 border border-gray-200 px-3 py-1"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                    
                    {/* Precio */}
                    <div className="space-y-2">
                      {property.rentPrice > 0 && (
                        <div className="text-center">
                          <span className="text-sm text-gray-500 mr-3">Renta</span>
                          <span className="text-2xl font-light text-gray-900">
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
                          <span className="text-sm text-gray-500 mr-3">Venta</span>
                          <span className="text-2xl font-light text-gray-900">
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

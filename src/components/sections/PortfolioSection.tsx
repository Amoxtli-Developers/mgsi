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
    <section id="portfolio" className="section-padding bg-gray-50" ref={sectionRef}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-title">Nuestras Propiedades</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Descubre nuestra selección de propiedades exclusivas en las mejores ubicaciones de México.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="pb-12"
          >
            {properties.map((property) => (
              <SwiperSlide key={property._id}>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
                  <div className="relative w-full h-64">
                    <Image
                      src={property.image || 'https://via.placeholder.com/600x400?text=Propiedad'}
                      alt={property.name}
                      fill
                      className="object-cover"
                    />
                    {property.type && (
                      <div className="absolute top-4 right-4 bg-brand-primary text-white px-3 py-1 rounded-full text-sm">
                        {property.type}
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{property.name}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{property.description}</p>
                    
                    <div className="flex items-center mb-4">
                      <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="text-gray-600">{property.surface}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {property.amenities.map((amenity, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 px-2 py-1 rounded-md text-sm text-gray-700"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                    
                    {property.notes && (
                      <p className="text-gray-500 mb-4 italic text-sm">
                        {property.notes}
                      </p>
                    )}
                    
                    <div className="mt-auto">
                      {property.rentPrice > 0 && (
                        <div className="flex items-baseline gap-2 mb-2">
                          <span className="text-sm font-medium text-gray-500">Renta:</span>
                          <span className="text-2xl font-bold text-brand-primary">
                            {property.rentPrice.toLocaleString('es-MX', {
                              style: 'currency',
                              currency: 'MXN',
                              minimumFractionDigits: 0,
                            })}
                          </span>
                        </div>
                      )}
                      {property.salePrice > 0 && (
                        <div className="flex items-baseline gap-2">
                          <span className="text-sm font-medium text-gray-500">Venta:</span>
                          <span className="text-2xl font-bold text-brand-primary">
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

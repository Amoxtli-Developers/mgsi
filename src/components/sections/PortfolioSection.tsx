'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, Thumbs } from 'swiper/modules';
import { MapPin, ChevronLeft, ChevronRight, ImageOff } from 'lucide-react';
import type { Property } from '@/types';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

interface PortfolioSectionProps {
  properties: Property[];
}

function PropertyImageGallery({ property }: { property: Property }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const images = property.images && property.images.length > 0
    ? property.images
    : (property.image ? [property.image] : []);

  // No images - show placeholder
  if (images.length === 0) {
    return (
      <div className="relative w-full h-64 md:h-80 mb-6 overflow-hidden bg-gray-50 border border-gray-200 rounded-sm flex items-center justify-center">
        <div className="flex flex-col items-center text-gray-400">
          <ImageOff className="h-16 w-16 mb-3" strokeWidth={1} />
          <span className="text-sm font-light tracking-wide">Sin imágenes disponibles</span>
        </div>
        {property.type && (
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-gray-700 px-3 py-1 text-xs font-light tracking-wide rounded-sm">
            {property.type}
          </div>
        )}
      </div>
    );
  }

  if (images.length === 1) {
    // Single image - simple display
    return (
      <div className="relative w-full h-64 md:h-80 mb-6 overflow-hidden">
        <Image
          src={images[0]}
          alt={property.name}
          fill
          className="object-cover"
        />
        {property.type && (
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-gray-700 px-3 py-1 text-xs font-light tracking-wide rounded-sm">
            {property.type}
          </div>
        )}
      </div>
    );
  }

  // Multiple images - gallery with thumbnails
  return (
    <div className="mb-6">
      {/* Main Image Swiper */}
      <div className="relative w-full h-64 md:h-80 mb-3 overflow-hidden group">
        <Swiper
          modules={[Navigation, Pagination, Thumbs]}
          spaceBetween={0}
          slidesPerView={1}
          navigation={{
            prevEl: '.image-swiper-button-prev',
            nextEl: '.image-swiper-button-next',
          }}
          pagination={{
            clickable: true,
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active'
          }}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          className="h-full"
        >
          {images.map((imageUrl, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <Image
                  src={imageUrl}
                  alt={`${property.name} - Imagen ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button
          className="image-swiper-button-prev absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Imagen anterior"
        >
          <ChevronLeft className="h-5 w-5 text-gray-800" strokeWidth={1.5} />
        </button>
        <button
          className="image-swiper-button-next absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Imagen siguiente"
        >
          <ChevronRight className="h-5 w-5 text-gray-800" strokeWidth={1.5} />
        </button>

        {property.type && (
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-gray-700 px-3 py-1 text-xs font-light tracking-wide rounded-sm z-10">
            {property.type}
          </div>
        )}

        {/* Image Counter */}
        <div className="absolute bottom-4 left-4 bg-black/75 backdrop-blur-sm text-white px-3 py-1 text-xs font-light rounded-sm z-10">
          {images.length} imágenes
        </div>
      </div>

      {/* Thumbnails */}
      <Swiper
        onSwiper={setThumbsSwiper}
        modules={[Thumbs]}
        spaceBetween={8}
        slidesPerView={4}
        breakpoints={{
          640: { slidesPerView: 5 },
          768: { slidesPerView: 6 },
        }}
        watchSlidesProgress
        className="thumbnails-swiper"
      >
        {images.map((imageUrl, index) => (
          <SwiperSlide key={index}>
            <div className="relative aspect-video rounded-sm overflow-hidden cursor-pointer border-2 border-transparent hover:border-brand-primary transition-colors">
              <Image
                src={imageUrl}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
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
                  {/* Image Gallery */}
                  <PropertyImageGallery property={property} />

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
                    {property.amenities && property.amenities.length > 0 && (
                      <div className="flex flex-wrap justify-center gap-2 mb-6">
                        {property.amenities.slice(0, 3).map((amenity, index) => (
                          <span
                            key={index}
                            className="text-xs text-gray-500 border border-gray-200 px-3 py-1 font-light tracking-wide rounded-sm"
                          >
                            {amenity}
                          </span>
                        ))}
                        {property.amenities.length > 3 && (
                          <span className="text-xs text-gray-400 px-3 py-1 font-light">
                            +{property.amenities.length - 3} más
                          </span>
                        )}
                      </div>
                    )}

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

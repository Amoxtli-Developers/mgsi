'use client';

import { useEffect, useState } from 'react';
import { useGetPropertiesQuery } from '@/store/propertiesApi';
import PortfolioSection from '@/components/sections/PortfolioSection';
import EmptyPropertiesSection from '@/components/sections/EmptyPropertiesSection';

export default function PropertiesWrapper() {
  const [mounted, setMounted] = useState(false);
  const { data: properties = [], isLoading, error } = useGetPropertiesQuery(undefined, {
    skip: !mounted,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // No renderizar nada hasta que el componente esté montado en el cliente
  if (!mounted) {
    return (
      <section id="portfolio" className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title">Nuestras Propiedades</h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              Descubre nuestra selección de propiedades exclusivas en las mejores ubicaciones de México.
            </p>
          </div>
          
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="h-16 w-16 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Cargando propiedades...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Mientras está cargando, mostrar un loader local en la sección
  if (isLoading) {
    return (
      <section id="portfolio" className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title">Nuestras Propiedades</h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              Descubre nuestra selección de propiedades exclusivas en las mejores ubicaciones de México.
            </p>
          </div>
          
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="h-16 w-16 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Cargando propiedades...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Si hay error o no hay propiedades, mostrar sección vacía
  if (error || properties.length === 0) {
    if (error) {
      console.error('Error loading properties:', error);
    }
    return <EmptyPropertiesSection />;
  }

  // Renderizar propiedades normalmente
  return <PortfolioSection properties={properties} />;
}

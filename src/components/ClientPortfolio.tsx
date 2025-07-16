'use client';

import { useGetPropertiesQuery } from '@/store/propertiesApi';
import PortfolioSection from '@/components/sections/PortfolioSection';

export default function ClientPortfolio() {
  const { data: properties = [], isLoading, error } = useGetPropertiesQuery();

  if (isLoading) {
    return (
      <section className="section-padding bg-gray-50">
        <div className="container">
          <h2 className="section-title">Nuestras Propiedades</h2>
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="h-16 w-16 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section-padding bg-gray-50">
        <div className="container">
          <h2 className="section-title">Nuestras Propiedades</h2>
          <div className="flex justify-center items-center min-h-[300px]">
            <p className="text-gray-600">Error al cargar las propiedades. Inténtalo más tarde.</p>
          </div>
        </div>
      </section>
    );
  }

  return <PortfolioSection properties={properties} />;
}

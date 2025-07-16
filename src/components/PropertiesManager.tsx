'use client';

import { useState, useEffect } from 'react';
import { useGetPropertiesQuery } from '@/store/propertiesApi';
import PortfolioSection from '@/components/sections/PortfolioSection';
import EmptyPropertiesSection from '@/components/sections/EmptyPropertiesSection';

interface PropertiesManagerProps {
  onLoadingChange: (loading: boolean) => void;
}

export default function PropertiesManager({ onLoadingChange }: PropertiesManagerProps) {
  const { data: properties = [], isLoading, error } = useGetPropertiesQuery();
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (initialLoad && !isLoading) {
      // Esperar un momento mínimo para mejor UX
      const timer = setTimeout(() => {
        setInitialLoad(false);
        onLoadingChange(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading, initialLoad, onLoadingChange]);

  // Durante la carga inicial, no renderizar nada
  if (initialLoad || isLoading) {
    return null;
  }

  // Si hay error, mostrar sección vacía
  if (error) {
    console.error('Error loading properties:', error);
    return <EmptyPropertiesSection />;
  }

  // Si no hay propiedades, mostrar sección vacía
  if (properties.length === 0) {
    return <EmptyPropertiesSection />;
  }

  // Renderizar propiedades
  return <PortfolioSection properties={properties} />;
}

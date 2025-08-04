'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ServicesSection from '@/components/sections/ServicesSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import ContactSection from '@/components/sections/ContactSection';
import JsonLd from '@/components/ui/JsonLd';

// Importación dinámica del componente que usa Redux
const PropertiesWrapper = dynamic(() => import('@/components/PropertiesWrapper'), {
  ssr: false,
  loading: () => (
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
  ),
});

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-16 w-16 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "MG Servicio Inmobiliario",
    "description": "Somos un grupo de profesionistas con más de 40 años de experiencia en el área Inmobiliaria, administrativa y legal, con el propósito de ayudar a nuestros clientes en operaciones de compra, venta, renta y administración inmobiliaria.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. Coyoacán 1435, Centro Urbano Presidente Alemán, Edificio H, Despacho 60-B",
      "addressLocality": "Ciudad de México",
      "addressRegion": "CDMX",
      "postalCode": "03100",
      "addressCountry": "MX"
    },
    "telephone": ["55-34-24-93", "55-34-59-44", "55-24-87-80"],
    "email": "contacto@mgsi.mx",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"
      ],
      "opens": "09:30",
      "closes": "18:00"
    },
    "priceRange": "$$",
    "sameAs": [
      "https://www.facebook.com/mgservicioinmobiliario",
      "https://www.instagram.com/mgservicioinmobiliario"
    ]
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PropertiesWrapper />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}

'use client';
import Script from 'next/script';
import { FC } from 'react';

interface JsonLdProps {
  data: any;
}

/**
 * Componente para generar JSON-LD estructurado para SEO
 */
const JsonLd: FC<JsonLdProps> = ({ data }) => {
  return (
    <Script
      id="json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      strategy="afterInteractive"
    />
  );
};

export default JsonLd;

/**
 * Generar datos estructurados para la organización
 */
export const generateOrganizationSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'MG Servicio Inmobiliario',
    url: 'https://mgservicioinmobiliario.com',
    logo: 'https://mgservicioinmobiliario.com/images/logo-color.svg',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+52 55 34 24 93',
      contactType: 'customer service',
      areaServed: 'MX',
      availableLanguage: ['Spanish'],
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Av. Coyoacán 1435, Centro Urbano Presidente Alemán, Edificio H, Despacho 60-B',
      addressLocality: 'Ciudad de México',
      addressRegion: 'CDMX',
      postalCode: '03100',
      addressCountry: 'MX',
    },
    sameAs: [
      'https://www.facebook.com/mgservicioinmobiliario',
      'https://www.instagram.com/mgservicioinmobiliario',
    ],
  };
};

/**
 * Generar datos estructurados para una propiedad inmobiliaria
 */
export const generatePropertySchema = (property: any) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: property.name,
    description: property.description,
    offers: {
      '@type': 'Offer',
      price: property.salePrice || property.rentPrice,
      priceCurrency: 'MXN',
      availability: 'https://schema.org/InStock',
    },
    image: property.image,
    brand: {
      '@type': 'Brand',
      name: 'MG Servicio Inmobiliario',
    },
  };
};

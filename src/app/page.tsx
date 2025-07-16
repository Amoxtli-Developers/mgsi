import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ServicesSection from '@/components/sections/ServicesSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import ContactSection from '@/components/sections/ContactSection';
import ClientPortfolio from '@/components/ClientPortfolio';
import JsonLd from '@/components/ui/JsonLd';

export default function Home() {
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
      <ClientPortfolio />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}

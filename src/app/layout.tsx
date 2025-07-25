import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import '@/styles/globals.css';
import { Providers } from './providers';
import ConditionalLayout from '@/components/ConditionalLayout';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'https://mgsi.netlify.app'),
  title: 'MG Servicio Inmobiliario | Expertos en Propiedades en México',
  description: 'Empresa especializada en propiedades inmobiliarias con más de 40 años de experiencia en el mercado mexicano. Asesoramiento para compra, venta y renta de propiedades.',
  keywords: 'inmobiliaria, propiedades, bienes raíces, casas en venta, departamentos en renta, servicios inmobiliarios, asesores inmobiliarios',
  authors: [{ name: 'MG Servicio Inmobiliario' }],
  category: 'Real Estate',
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/images/logo-icon.svg',
    apple: '/images/logo-icon.svg',
    shortcut: '/images/logo-icon.svg',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'MG Servicio Inmobiliario | Expertos en Propiedades en México',
    description: 'Empresa especializada en propiedades inmobiliarias con más de 40 años de experiencia en el mercado mexicano.',
    url: '/',
    siteName: 'MG Servicio Inmobiliario',
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MG Servicio Inmobiliario | Expertos en Propiedades',
    description: 'Empresa especializada en propiedades inmobiliarias con más de 40 años de experiencia en el mercado mexicano.',
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es" className={`${inter.variable} scroll-smooth`}>
      <body className="min-h-screen bg-background font-sans antialiased overflow-x-hidden">
        <Providers>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </Providers>
      </body>
    </html>
  );
}

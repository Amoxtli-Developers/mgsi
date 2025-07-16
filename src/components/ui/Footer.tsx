'use client';

import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId: string) => {
    document.querySelector(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-white">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <Logo 
                variant="light" 
                size="lg" 
                className="mb-4"
              />
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Somos un grupo de profesionistas con más de 40 años de experiencia 
              en el área inmobiliaria, administrativa y legal, con el propósito de 
              ayudar a nuestros clientes en operaciones de compra, venta, renta y 
              administración inmobiliaria.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/mgservicioinmobiliario"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 p-2 rounded-full transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/mgservicioinmobiliario"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-pink-600 hover:bg-pink-700 p-2 rounded-full transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-brand-primary mt-0.5 mr-3 flex-shrink-0" />
                <div className="text-gray-300 text-sm">
                  <p>Av. Coyoacán 1435</p>
                  <p>Centro Urbano Presidente Alemán</p>
                  <p>Edificio H, Despacho 60-B</p>
                  <p>Col. Del Valle, C.P. 03100</p>
                  <p>Ciudad de México</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-brand-primary mr-3" />
                <div className="text-gray-300 text-sm">
                  <p>55-34-24-93</p>
                  <p>55-34-59-44</p>
                  <p>55-24-87-80</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-brand-primary mr-3" />
                <a
                  href="mailto:contacto@mgsi.mx"
                  className="text-gray-300 hover:text-brand-primary transition-colors text-sm"
                >
                  contacto@mgsi.mx
                </a>
              </div>
              
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-brand-primary mr-3" />
                <div className="text-gray-300 text-sm">
                  <p>Lun - Vie: 9:30 - 18:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <nav className="space-y-2">
              <button
                onClick={() => scrollToSection('#hero')}
                className="block text-gray-300 hover:text-brand-primary transition-colors text-sm"
              >
                Inicio
              </button>
              <button
                onClick={() => scrollToSection('#portfolio')}
                className="block text-gray-300 hover:text-brand-primary transition-colors text-sm"
              >
                Propiedades
              </button>
              <button
                onClick={() => scrollToSection('#contact')}
                className="block text-gray-300 hover:text-brand-primary transition-colors text-sm"
              >
                Contacto
              </button>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} MG Servicio Inmobiliario. Todos los derechos reservados.
          </p>
          <p className="text-gray-400 text-sm mt-2 md:mt-0">
            Desarrollado por{' '}
            <a 
              href="https://www.amoxtli.tech" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-brand-primary hover:text-brand-primary/80 transition-colors font-medium"
            >
              Amoxtli Web Developers
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

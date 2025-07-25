'use client';

import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId: string) => {
    document.querySelector(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="container py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Company Info */}
          <div className="lg:col-span-6">
            <div className="mb-8">
              <Logo 
                variant="dark" 
                size="md" 
                className="mb-6"
              />
            </div>
            <p className="text-gray-600 mb-8 max-w-md font-light leading-relaxed text-sm">
              Somos un grupo de profesionistas con más de 40 años de experiencia 
              en el área inmobiliaria, administrativa y legal, con el propósito de 
              ayudar a nuestros clientes en operaciones de compra, venta, renta y 
              administración inmobiliaria.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-3">
              <a
                href="https://www.facebook.com/mgservicioinmobiliario"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-100 hover:bg-brand-primary hover:text-white text-gray-600 flex items-center justify-center rounded-sm transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" strokeWidth={1.5} />
              </a>
              <a
                href="https://www.instagram.com/mgservicioinmobiliario"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-100 hover:bg-brand-primary hover:text-white text-gray-600 flex items-center justify-center rounded-sm transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-light mb-6 text-gray-900 tracking-tight">Contacto</h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="h-3 w-3 text-brand-primary mt-1 mr-3 flex-shrink-0" strokeWidth={1.5} />
                <div className="text-gray-600 text-xs font-light leading-relaxed">
                  <p>Av. Coyoacán 1435</p>
                  <p>Centro Urbano Presidente Alemán</p>
                  <p>Edificio H, Despacho 60-B</p>
                  <p>Col. Del Valle, C.P. 03100</p>
                  <p>Ciudad de México</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="h-3 w-3 text-brand-primary mt-1 mr-3 flex-shrink-0" strokeWidth={1.5} />
                <div className="text-gray-600 text-xs font-light">
                  <p>55-34-24-93</p>
                  <p>55-34-59-44</p>
                  <p>55-24-87-80</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="h-3 w-3 text-brand-primary mt-1 mr-3 flex-shrink-0" strokeWidth={1.5} />
                <a
                  href="mailto:contacto@mgsi.mx"
                  className="text-gray-600 hover:text-brand-primary transition-colors text-xs font-light"
                >
                  contacto@mgsi.mx
                </a>
              </div>
              
              <div className="flex items-start">
                <Clock className="h-3 w-3 text-brand-primary mt-1 mr-3 flex-shrink-0" strokeWidth={1.5} />
                <div className="text-gray-600 text-xs font-light">
                  <p>Lun - Vie: 9:30 - 18:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-light mb-6 text-gray-900 tracking-tight">Enlaces Rápidos</h4>
            <nav className="space-y-3">
              <button
                onClick={() => scrollToSection('#hero')}
                className="block text-gray-600 hover:text-brand-primary transition-colors text-xs font-light"
              >
                Inicio
              </button>
              <button
                onClick={() => scrollToSection('#about')}
                className="block text-gray-600 hover:text-brand-primary transition-colors text-xs font-light"
              >
                Nosotros
              </button>
              <button
                onClick={() => scrollToSection('#services')}
                className="block text-gray-600 hover:text-brand-primary transition-colors text-xs font-light"
              >
                Servicios
              </button>
              <button
                onClick={() => scrollToSection('#portfolio')}
                className="block text-gray-600 hover:text-brand-primary transition-colors text-xs font-light"
              >
                Propiedades
              </button>
              <button
                onClick={() => scrollToSection('#contact')}
                className="block text-gray-600 hover:text-brand-primary transition-colors text-xs font-light"
              >
                Contacto
              </button>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-xs font-light">
            © {currentYear} MG Servicio Inmobiliario. Todos los derechos reservados.
          </p>
          <p className="text-gray-500 text-xs font-light mt-2 md:mt-0">
            Desarrollado por{' '}
            <a 
              href="https://www.amoxtli.tech" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-brand-primary hover:text-brand-primary/80 transition-colors"
            >
              Amoxtli Web Developers
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

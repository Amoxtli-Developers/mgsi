'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

const navItems = [
  { name: 'Inicio', href: '#hero' },
  { name: 'Nosotros', href: '#about' },
  { name: 'Servicios', href: '#services' },
  { name: 'Propiedades', href: '#portfolio' },
  { name: 'Testimonios', href: '#testimonials' },
  { name: 'Contacto', href: '#contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const updateScrolled = () => {
      setScrolled(scrollY.get() > 50);
    };
    const unsubscribe = scrollY.onChange(updateScrolled);
    updateScrolled();
    return () => unsubscribe();
  }, [scrollY]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      const handleScroll = () => setIsOpen(false);
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  if (!mounted) return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 py-4 md:py-6 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md border-b border-gray-100' 
          : 'bg-transparent'
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <button
            onClick={() => scrollToSection('#hero')}
            className="flex items-center"
          >
            <Logo 
              variant={scrolled ? 'dark' : 'light'} 
              size="md" 
              className="transition-all duration-300"
            />
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-12">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className={`text-sm font-light tracking-wide transition-all duration-300 hover:text-brand-primary relative group ${
                scrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-brand-primary transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          className={`block md:hidden transition-colors duration-300 ${scrolled ? 'text-gray-700' : 'text-white'}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-100 md:hidden"
          >
            <nav className="flex flex-col py-6">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  onClick={() => scrollToSection(item.href)}
                  className="px-8 py-4 text-sm font-light text-gray-700 hover:text-brand-primary hover:bg-gray-50/50 text-left transition-all duration-300 tracking-wide"
                >
                  {item.name}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
}

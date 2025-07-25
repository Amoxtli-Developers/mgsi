'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Building, Home, MapPin } from 'lucide-react';

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [stats, setStats] = useState({
    propiedades: 0,
    clientes: 0,
    años: 0
  });

  useEffect(() => {
    const targetStats = {
      propiedades: 250,
      clientes: 1500,
      años: 40
    };

    const timer = setTimeout(() => {
      const duration = 2000;
      const steps = 50;
      const interval = duration / steps;

      let currentStep = 0;
      const counter = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;

        setStats({
          propiedades: Math.floor(targetStats.propiedades * progress),
          clientes: Math.floor(targetStats.clientes * progress),
          años: Math.floor(targetStats.años * progress)
        });

        if (currentStep >= steps) {
          setStats(targetStats);
          clearInterval(counter);
        }
      }, interval);

      return () => clearInterval(counter);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Background with parallax - MANTENER FONDO ACTUAL */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 z-0 w-full"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#3c0013] to-brand-primary opacity-90" />

        {/* Decorative lines - MANTENER */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute left-1/4 top-0 bottom-0 w-px bg-white"></div>
          <div className="absolute left-2/4 top-0 bottom-0 w-px bg-white"></div>
          <div className="absolute left-3/4 top-0 bottom-0 w-px bg-white"></div>
          <div className="absolute left-0 right-0 top-1/3 h-px bg-white"></div>
          <div className="absolute left-0 right-0 top-2/3 h-px bg-white"></div>
        </div>
      </motion.div>

      {/* Main content - ACTUALIZADO CON ESTILO MINIMALISTA */}
      <div className="container relative z-10 text-white px-6 sm:px-8 lg:px-12 pt-32 pb-16 flex flex-col h-full">
        <div className="flex-1 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="mb-12 inline-block"
            >
              <span className="px-6 py-2 border border-white/20 text-white/90 text-xs font-light tracking-[0.2em] uppercase rounded-sm bg-white/5 backdrop-blur-sm">
                Expertos Inmobiliarios
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-12 leading-tight tracking-tight text-balance"
              style={{ letterSpacing: '-0.02em' }}
            >
              <span className="text-white">Encuentra tu </span>
              <span className="text-brand-primary font-normal">propiedad ideal</span>
              <span className="text-white"> en México</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              className="text-base sm:text-lg md:text-xl mb-16 text-white/80 max-w-2xl mx-auto font-light leading-relaxed"
            >
              Asesoría personalizada para comprar, vender o rentar
              propiedades con soluciones adaptadas a tus necesidades.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-6 justify-center mb-20"
            >
              <button
                onClick={() => scrollToSection('portfolio')}
                className="minimal-button-primary rounded-sm text-sm tracking-wide hover:transform hover:scale-[1.02] transition-all duration-300"
              >
                Ver Propiedades
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 text-sm font-light tracking-wide transition-all duration-300 border border-white/30 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-white rounded-sm hover:transform hover:scale-[1.02]"
              >
                Contáctanos
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator - ACTUALIZADO */}
      <div className="absolute bottom-12 inset-x-0 mx-auto w-full flex justify-center items-center z-10">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="cursor-pointer group"
          onClick={() => scrollToSection('about')}
        >
          <div className="flex flex-col items-center">
            <p className="text-white/70 text-xs font-light mb-3 tracking-wide uppercase">Descubre más</p>
            <div className="w-8 h-8 rounded-sm bg-white/5 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:bg-white/10 group-hover:border-white/30 transition-all duration-300">
              <ArrowDown className="h-4 w-4 text-white/70 group-hover:text-white" strokeWidth={1.5} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, MapPin, Phone, Mail, Clock } from 'lucide-react';
import type { ContactFormData } from '@/types';

const contactSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(8, 'Teléfono inválido'),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
  privacyPolicy: z.boolean().refine(val => val === true, 'Debe aceptar el aviso de privacidad'),
});

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setFormStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setFormStatus({
          type: 'success',
          message: result.message || 'Mensaje enviado correctamente. Nos pondremos en contacto pronto.',
        });
        reset();
      } else {
        setFormStatus({
          type: 'error',
          message: result.error || 'Error al enviar el mensaje. Inténtalo nuevamente.',
        });
      }
    } catch (error) {
      setFormStatus({
        type: 'error',
        message: 'Error de conexión. Por favor, inténtalo más tarde.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-gray-50/30" ref={sectionRef}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-24"
        >
          <h2 className="section-title text-balance">Contáctanos</h2>
          <div className="max-w-2xl mx-auto">
            <p className="text-base text-gray-600 leading-relaxed font-light">
              Danos la oportunidad de conocerte, estamos seguros de poder ayudarte.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-3"
          >
            <div className="minimal-card">
              <h3 className="text-lg font-light mb-8 tracking-tight">Envíanos un mensaje</h3>

              {formStatus.type && (
                <div
                  className={`p-4 mb-8 rounded-sm text-sm font-light ${
                    formStatus.type === 'success'
                      ? 'bg-green-50 text-green-700 border border-green-100'
                      : 'bg-red-50 text-red-700 border border-red-100'
                  }`}
                >
                  {formStatus.message}
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-xs font-light text-gray-600 mb-3 tracking-wide uppercase">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register('name')}
                    className={`w-full px-0 py-3 border-0 border-b bg-transparent focus:outline-none focus:border-brand-primary text-gray-900 font-light transition-colors duration-300 ${
                      errors.name ? 'border-red-300' : 'border-gray-200'
                    }`}
                    placeholder="Tu nombre"
                  />
                  {errors.name && (
                    <p className="mt-2 text-xs text-red-600 font-light">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-light text-gray-600 mb-3 tracking-wide uppercase">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email')}
                    className={`w-full px-0 py-3 border-0 border-b bg-transparent focus:outline-none focus:border-brand-primary text-gray-900 font-light transition-colors duration-300 ${
                      errors.email ? 'border-red-300' : 'border-gray-200'
                    }`}
                    placeholder="tu@email.com"
                  />
                  {errors.email && (
                    <p className="mt-2 text-xs text-red-600 font-light">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs font-light text-gray-600 mb-3 tracking-wide uppercase">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    {...register('phone')}
                    className={`w-full px-0 py-3 border-0 border-b bg-transparent focus:outline-none focus:border-brand-primary text-gray-900 font-light transition-colors duration-300 ${
                      errors.phone ? 'border-red-300' : 'border-gray-200'
                    }`}
                    placeholder="Tu número de teléfono"
                  />
                  {errors.phone && (
                    <p className="mt-2 text-xs text-red-600 font-light">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-light text-gray-600 mb-3 tracking-wide uppercase">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    {...register('message')}
                    className={`w-full px-0 py-3 border-0 border-b bg-transparent focus:outline-none focus:border-brand-primary text-gray-900 font-light transition-colors duration-300 resize-none ${
                      errors.message ? 'border-red-300' : 'border-gray-200'
                    }`}
                    placeholder="¿En qué podemos ayudarte?"
                  />
                  {errors.message && (
                    <p className="mt-2 text-xs text-red-600 font-light">{errors.message.message}</p>
                  )}
                </div>

                <div className="flex items-center pt-4">
                  <input
                    id="privacyPolicy"
                    type="checkbox"
                    {...register('privacyPolicy')}
                    className="h-3 w-3 text-brand-primary border-gray-300 rounded-sm focus:ring-brand-primary focus:ring-1 focus:ring-offset-0"
                  />
                  <label htmlFor="privacyPolicy" className="ml-3 text-xs text-gray-600 font-light">
                    He leído y acepto el{' '}
                    <button type="button" className="text-brand-primary hover:underline">
                      Aviso de Privacidad
                    </button>
                  </label>
                </div>
                {errors.privacyPolicy && (
                  <p className="text-xs text-red-600 font-light">{errors.privacyPolicy.message}</p>
                )}

                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="minimal-button-primary w-full justify-center items-center hover:transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" strokeWidth={1.5} />
                        Enviando...
                      </>
                    ) : (
                      'Enviar Mensaje'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="lg:col-span-2"
          >
            <div className="space-y-12">
              <div>
                <h3 className="text-lg font-light mb-8 tracking-tight">Información de Contacto</h3>
              </div>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 text-brand-primary mt-1 mr-4 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <h4 className="text-sm font-light mb-2 text-gray-900 tracking-tight">Dirección</h4>
                    <p className="text-xs text-gray-600 leading-relaxed font-light">
                      Av. Coyoacán 1435, Centro Urbano Presidente Alemán<br />
                      Edificio H, Despacho 60-B<br />
                      Col. Del Valle, C.P. 03100<br />
                      Ciudad de México
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-4 w-4 text-brand-primary mt-1 mr-4 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <h4 className="text-sm font-light mb-2 text-gray-900 tracking-tight">Teléfonos</h4>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-600 font-light">55-34-24-93</p>
                      <p className="text-xs text-gray-600 font-light">55-34-59-44</p>
                      <p className="text-xs text-gray-600 font-light">55-24-87-80</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="h-4 w-4 text-brand-primary mt-1 mr-4 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <h4 className="text-sm font-light mb-2 text-gray-900 tracking-tight">Email</h4>
                    <a
                      href="mailto:contacto@mgsi.mx"
                      className="text-xs text-gray-600 hover:text-brand-primary transition-colors font-light"
                    >
                      contacto@mgsi.mx
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="h-4 w-4 text-brand-primary mt-1 mr-4 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <h4 className="text-sm font-light mb-2 text-gray-900 tracking-tight">Horario de Atención</h4>
                    <p className="text-xs text-gray-600 leading-relaxed font-light">
                      Lunes a Viernes<br />
                      9:30 AM - 2:30 PM y 3:30 PM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

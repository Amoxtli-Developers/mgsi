'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Search } from 'lucide-react';

const socialLinks = [
  {
    name: 'Email',
    icon: Mail,
    href: 'mailto:contacto@mgsi.mx',
    color: 'bg-gray-600 hover:bg-gray-700',
  },
  {
    name: 'Teléfono',
    icon: Phone,
    href: 'tel:+525534249',
    color: 'bg-brand-primary hover:bg-brand-primary/90',
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://www.linkedin.com/company/mgservicioinmobiliario',
    color: 'bg-blue-600 hover:bg-blue-700',
  },
  {
    name: 'Google Search',
    icon: Search,
    href: 'https://www.google.com/search?q=MG+Servicio+Inmobiliario+México',
    color: 'bg-green-600 hover:bg-green-700',
  },
];

export default function SocialLinks() {
  return (
    <motion.div
      className="fixed left-8 top-1/2 transform -translate-y-1/2 z-40 hidden lg:flex flex-col space-y-2"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
    >
      {socialLinks.map((social, index) => {
        const Icon = social.icon;
        return (
          <motion.a
            key={social.name}
            href={social.href}
            target={social.href.startsWith('http') ? '_blank' : '_self'}
            rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className={`${social.color} text-white p-2 rounded-sm shadow-sm transition-all duration-300 group hover:shadow-md`}
            whileHover={{ scale: 1.05, x: 3 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5 + index * 0.1, ease: "easeOut" }}
            aria-label={social.name}
          >
            <Icon className="h-4 w-4 transition-transform" strokeWidth={1.5} />
          </motion.a>
        );
      })}
    </motion.div>
  );
}

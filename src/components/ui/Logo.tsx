'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  variant?: 'light' | 'dark' | 'color';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'h-8 w-auto',
  md: 'h-12 w-auto', 
  lg: 'h-16 w-auto',
};

export default function Logo({ 
  variant = 'color', 
  size = 'md', 
  className 
}: LogoProps) {
  const logoSrc = {
    light: '/images/logo-white.svg',
    dark: '/images/logo-color.svg',
    color: '/images/logo-color.svg',
  };

  return (
    <div className={cn('flex items-center', className)}>
      <Image
        src={logoSrc[variant]}
        alt="MG Servicio Inmobiliario"
        width={120}
        height={40}
        className={cn(sizeClasses[size], 'object-contain')}
        priority
      />
    </div>
  );
}

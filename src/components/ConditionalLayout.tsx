'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import SocialLinks from '@/components/ui/SocialLinks';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  if (isAdminRoute) {
    // Layout para rutas de admin - sin navegación
    return (
      <main className="min-h-screen">
        {children}
      </main>
    );
  }

  // Layout normal para el sitio público
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
      <SocialLinks />
    </>
  );
}

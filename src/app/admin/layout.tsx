import { ReactNode } from 'react';
import AdminClientLayout from './AdminClientLayout';

export const metadata = {
  title: 'Panel de Administración - MG Servicio Inmobiliario',
  description: 'Dashboard administrativo para gestión de propiedades',
  robots: {
    index: false,
    follow: false,
  },
};

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return <AdminClientLayout>{children}</AdminClientLayout>;
}

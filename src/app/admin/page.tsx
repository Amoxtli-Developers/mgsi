// Forzar renderizado dinámico para evitar errores de SSG
export const dynamic = 'force-dynamic';

import AdminWrapper from '@/components/admin/AdminWrapper';

export const metadata = {
  title: 'Panel de Administración - MG Servicio Inmobiliario',
  description: 'Dashboard administrativo para gestión de propiedades',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <AdminWrapper />;
}

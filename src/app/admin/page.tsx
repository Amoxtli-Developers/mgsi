import AdminDashboard from '@/components/admin/AdminDashboard';

export const metadata = {
  title: 'Panel de Administración - MG Servicio Inmobiliario',
  description: 'Dashboard administrativo para gestión de propiedades',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <AdminDashboard />;
}

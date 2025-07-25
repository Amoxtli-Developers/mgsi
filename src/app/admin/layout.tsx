import { ReactNode } from 'react';
import NotificationProvider from '@/components/ui/notifications/NotificationProvider';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <NotificationProvider>
      {children}
    </NotificationProvider>
  );
}

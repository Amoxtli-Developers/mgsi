'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type NotificationType = 'success' | 'error' | 'info';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
}

interface NotificationContextType {
  showNotification: (notification: Omit<Notification, 'id'>) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export default function NotificationProvider({ children }: NotificationProviderProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Date.now().toString();
    const newNotification = {
      ...notification,
      id,
      duration: notification.duration || 5000,
    };

    setNotifications(prev => [...prev, newNotification]);

    // Auto remove notification
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, newNotification.duration);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" strokeWidth={1.5} />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-600" strokeWidth={1.5} />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-600" strokeWidth={1.5} />;
    }
  };

  const getStyles = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      
      {/* Notifications Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        <AnimatePresence>
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 300, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 300, scale: 0.8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`
                w-80 p-4 rounded-sm border shadow-lg backdrop-blur-sm
                ${getStyles(notification.type)}
              `}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {getIcon(notification.type)}
                </div>
                
                <div className="ml-3 flex-1">
                  <h3 className="text-sm font-light tracking-tight">
                    {notification.title}
                  </h3>
                  {notification.message && (
                    <p className="mt-1 text-xs font-light opacity-80">
                      {notification.message}
                    </p>
                  )}
                </div>
                
                <button
                  onClick={() => removeNotification(notification.id)}
                  className="ml-4 inline-flex text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
}

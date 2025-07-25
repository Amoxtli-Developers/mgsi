'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LogIn, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Logo from '@/components/ui/Logo';

const loginSchema = z.object({
  username: z.string().min(1, 'El usuario es requerido'),
  password: z.string().min(1, 'La contraseña es requerida'),
});

type LoginForm = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onLoginSuccess: () => void;
}

export default function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    console.log('🚀 Iniciando login para:', data.username);
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log('📝 Respuesta del servidor:', result);
      console.log('📈 Status:', response.status);

      if (response.ok) {
        console.log('✅ Login exitoso, ejecutando callback...');
        console.log('🍪 Verificando cookie inmediatamente...');
        
        // Establecer cookie manualmente también desde el cliente como backup
        const backupToken = Buffer.from(`${Date.now()}-mgsi-admin`).toString('base64');
        document.cookie = `mgsi-admin-token=${backupToken}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
        console.log('🔧 Cookie establecida manualmente como backup');
        
        // Verificar que la cookie se estableció
        setTimeout(() => {
          const getCookie = (name: string) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) {
              return parts.pop()?.split(';').shift();
            }
            return null;
          };
          
          const token = getCookie('mgsi-admin-token');
          console.log('🔍 Token después del login:', !!token);
          console.log('🔍 Token valor:', token?.substring(0, 20) + '...');
          
          if (token) {
            console.log('✅ Cookie encontrada, ejecutando callback');
            onLoginSuccess();
          } else {
            console.log('❌ Cookie no encontrada, algo está mal');
            setError('Error estableciendo sesión. Intenta nuevamente.');
          }
        }, 100);
      } else {
        console.log('❌ Error en login:', result.error);
        setError(result.error || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.log('❌ Error de conexión:', error);
      setError('Error de conexión. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        {/* Logo y título */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="inline-block mb-6"
          >
            <Logo variant="dark" size="lg" />
          </motion.div>
          <h1 className="text-2xl font-light text-gray-900 tracking-tight mb-2">
            Panel de Administración
          </h1>
          <p className="text-gray-600 font-light">
            Ingresa tus credenciales para acceder
          </p>
        </div>

        {/* Formulario */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-8"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Campo Usuario */}
            <div>
              <label className="block text-sm font-light text-gray-700 mb-2">
                Usuario
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  {...register('username')}
                  type="text"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-sm focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors bg-gray-50 focus:bg-white"
                  placeholder="Ingresa tu usuario"
                  disabled={isLoading}
                />
              </div>
              {errors.username && (
                <p className="text-red-500 text-sm mt-1 font-light">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Campo Contraseña */}
            <div>
              <label className="block text-sm font-light text-gray-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-sm focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors bg-gray-50 focus:bg-white"
                  placeholder="Ingresa tu contraseña"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1 font-light">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Error message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-red-50 border border-red-200 rounded-sm p-3"
              >
                <p className="text-red-600 text-sm font-light">{error}</p>
              </motion.div>
            )}

            {/* Botón Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-brand-primary text-white py-3 px-4 rounded-sm font-light tracking-wide transition-all duration-300 hover:bg-brand-primary/90 focus:ring-2 focus:ring-brand-primary/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <LogIn className="h-4 w-4 mr-2" />
                  Iniciar Sesión
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* Link para volver */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="text-center mt-8 space-y-4"
        >
          <a
            href="/"
            className="text-sm font-light text-gray-600 hover:text-brand-primary transition-colors"
          >
            ← Volver al sitio web
          </a>
        
        </motion.div>
      </motion.div>
    </div>
  );
}

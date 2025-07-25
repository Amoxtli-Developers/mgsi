import { NextRequest, NextResponse } from 'next/server';
import { validateCredentials, createAuthToken, type LoginCredentials } from '@/lib/auth';

// Forzar renderizado dinámico
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body: LoginCredentials = await request.json();
    console.log('📝 API Login - Usuario:', body.username);

    if (!body.username || !body.password) {
      console.log('❌ Faltan credenciales');
      return NextResponse.json(
        { error: 'Usuario y contraseña son requeridos' },
        { status: 400 }
      );
    }

    console.log('🔍 Validando credenciales...');
    if (validateCredentials(body)) {
      console.log('✅ Credenciales válidas, creando cookie...');
      
      // Crear token simple
      const token = createAuthToken();
      console.log('🎫 Token creado:', token.substring(0, 20) + '...');
      
      const response = NextResponse.json(
        { success: true, message: 'Login exitoso' },
        { status: 200 }
      );
      
      // Establecer la cookie con configuración más permisiva para desarrollo
      response.cookies.set('mgsi-admin-token', token, {
        httpOnly: false, // Cambiado a false para que sea accesible desde JS
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax', // más permisivo para desarrollo
        maxAge: 60 * 60 * 24 * 7, // 7 días
        path: '/',
      });
      
      console.log('🍪 Cookie configurada en respuesta');
      
      return response;
    } else {
      console.log('❌ Credenciales inválidas');
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Error en login:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

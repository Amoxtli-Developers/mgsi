import { NextResponse } from 'next/server';

// Forzar renderizado dinámico
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST() {
  try {
    const response = NextResponse.json(
      { success: true, message: 'Logout exitoso' },
      { status: 200 }
    );
    
    // Eliminar la cookie estableciendo una fecha de expiración pasada
    response.cookies.set('mgsi-admin-token', '', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: new Date(0),
      path: '/'
    });
    
    return response;
  } catch (error) {
    console.error('Error en logout:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

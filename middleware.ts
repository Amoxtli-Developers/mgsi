import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Para desarrollo, permitir acceso a admin
  // La autenticación se maneja en el componente AdminWrapper
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin',
    '/admin/((?!_next/static|_next/image|favicon.ico).*)'
  ]
};

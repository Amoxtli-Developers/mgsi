import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export interface LoginCredentials {
  username: string;
  password: string;
}

export function validateCredentials(credentials: LoginCredentials): boolean {
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminUsername || !adminPassword) {
    console.error('Admin credentials not configured in environment variables');
    return false;
  }

  return credentials.username === adminUsername && credentials.password === adminPassword;
}

export function createAuthCookie(): { name: string; value: string; options: any } {
  // Crear token simple (en producción usar JWT)
  const token = Buffer.from(`${Date.now()}-mgsi-admin`).toString('base64');
  
  return {
    name: 'mgsi-admin-token',
    value: token,
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
      maxAge: 60 * 60 * 24 * 7, // 7 días
      path: '/',
    }
  };
}

export async function setAuthCookie(): Promise<void> {
  const cookieStore = cookies();
  const authCookie = createAuthCookie();
  
  cookieStore.set(authCookie.name, authCookie.value, authCookie.options);
}

export async function getAuthCookie(): Promise<string | null> {
  const cookieStore = cookies();
  const token = cookieStore.get('mgsi-admin-token');
  return token?.value || null;
}

export async function removeAuthCookie(): Promise<void> {
  const cookieStore = cookies();
  cookieStore.delete('mgsi-admin-token');
}

export async function isAuthenticated(): Promise<boolean> {
  const token = await getAuthCookie();
  
  if (!token) {
    return false;
  }

  try {
    // Validar que el token tenga el formato correcto
    const decoded = Buffer.from(token, 'base64').toString();
    return decoded.includes('mgsi-admin');
  } catch {
    return false;
  }
}

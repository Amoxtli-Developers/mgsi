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

export function createAuthToken(): string {
  // Crear token simple (en producción usar JWT)
  return Buffer.from(`${Date.now()}-mgsi-admin`).toString('base64');
}

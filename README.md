# MGSI Website

Sitio web oficial de MG Servicio Inmobiliario construido con Next.js 14, TypeScript y Tailwind CSS.

## 🚀 Características

- **Next.js 14** con App Router
- **TypeScript** para type safety
- **Tailwind CSS** para estilos
- **Framer Motion** para animaciones
- **Redux Toolkit** para manejo de estado
- **MongoDB** para base de datos
- **SendGrid** para emails
- **Responsive Design** para todos los dispositivos

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build
npm start
```

## 🔧 Variables de Entorno

```env
MONGODB_URI=tu_string_de_conexion_mongodb
SENDGRID_API_KEY=tu_api_key_sendgrid
SENDGRID_FROM=tu_email_verificado
SENDGRID_TO=email_destinatario
NEXTAUTH_URL=https://tu-dominio.com
NEXTAUTH_SECRET=tu_clave_secreta
```

## 📁 Estructura del Proyecto

```
src/
├── app/                    # Next.js 14 App Router
│   ├── api/               # API Routes
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página de inicio
│   └── providers.tsx      # Providers de Redux
├── components/
│   ├── sections/          # Secciones de la página
│   └── ui/               # Componentes reutilizables
├── lib/                   # Utilidades
├── store/                 # Redux store
├── styles/               # Estilos globales
└── types/                # Definiciones TypeScript
```

## 🌐 Despliegue en Netlify

1. Conecta tu repositorio a Netlify
2. Configura las variables de entorno en Netlify
3. El archivo `netlify.toml` se encarga de la configuración automática

## 📧 Funcionalidades

- **Portafolio de propiedades** con datos dinámicos desde MongoDB
- **Formulario de contacto** con validación y envío por email
- **Animaciones fluidas** con Framer Motion
- **Diseño responsive** para móviles y desktop
- **SEO optimizado** con metadatos

## 🛠️ Tecnologías

- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- Redux Toolkit
- MongoDB
- SendGrid
- Lucide React
- React Hook Form
- Zod
- Swiper.js

## 📄 Licencia

Este proyecto es privado y pertenece a MG Servicio Inmobiliario.
# mgsi

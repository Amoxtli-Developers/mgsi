export interface Property {
  _id: string;
  name: string;
  surface: string;
  description: string;
  rentPrice: number;
  salePrice: number;
  amenities: string[];
  notes: string;
  image: string; // Legacy: First/main image (kept for backward compatibility)
  images: string[]; // Array of all image URLs
  type?: 'Renta' | 'Venta' | 'Ambos';
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  privacyPolicy: boolean;
}

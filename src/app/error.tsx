'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-brand-primary mb-4">500</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Error del servidor
        </h2>
        <p className="text-gray-600 mb-8">
          Algo salió mal. Por favor, inténtalo de nuevo.
        </p>
        <div className="space-x-4">
          <button
            onClick={reset}
            className="bg-brand-primary text-white px-6 py-3 rounded-lg hover:bg-brand-primary/90 transition"
          >
            Reintentar
          </button>
          <a
            href="/"
            className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-400 transition"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
}

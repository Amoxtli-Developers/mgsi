'use client';

import { useMemo } from 'react';
import { Building, Home, MapPin, Eye, EyeOff, TrendingUp } from 'lucide-react';
import type { Property } from '@/types';

interface StatsCardsProps {
  properties: Property[];
}

export default function StatsCards({ properties }: StatsCardsProps) {
  const stats = useMemo(() => {
    const totalProperties = properties.length;
    const activeProperties = properties.filter(p => p.active).length;
    const inactiveProperties = properties.filter(p => !p.active).length;
    const rentProperties = properties.filter(p => p.rentPrice > 0).length;
    const saleProperties = properties.filter(p => p.salePrice > 0).length;
    
    const avgRentPrice = properties
      .filter(p => p.rentPrice > 0)
      .reduce((sum, p) => sum + p.rentPrice, 0) / rentProperties || 0;
      
    const avgSalePrice = properties
      .filter(p => p.salePrice > 0)
      .reduce((sum, p) => sum + p.salePrice, 0) / saleProperties || 0;

    return {
      totalProperties,
      activeProperties,
      inactiveProperties,
      rentProperties,
      saleProperties,
      avgRentPrice,
      avgSalePrice,
      activePercentage: totalProperties > 0 ? (activeProperties / totalProperties) * 100 : 0
    };
  }, [properties]);

  const statsData = [
    {
      title: 'Total Propiedades',
      value: stats.totalProperties,
      icon: Building,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-100'
    },
    {
      title: 'Propiedades Activas',
      value: stats.activeProperties,
      subtitle: `${stats.activePercentage.toFixed(1)}% del total`,
      icon: Eye,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-100'
    },
    {
      title: 'Propiedades Inactivas',
      value: stats.inactiveProperties,
      icon: EyeOff,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-100'
    },
    {
      title: 'En Renta',
      value: stats.rentProperties,
      subtitle: stats.avgRentPrice > 0 ? `Promedio: ${stats.avgRentPrice.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 0 })}` : '',
      icon: Home,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-100'
    },
    {
      title: 'En Venta',
      value: stats.saleProperties,
      subtitle: stats.avgSalePrice > 0 ? `Promedio: ${stats.avgSalePrice.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 0 })}` : '',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
      {statsData.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className={`${stat.bgColor} ${stat.borderColor} border rounded-sm p-6 hover:shadow-sm transition-shadow`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 ${stat.bgColor} rounded-sm flex items-center justify-center`}>
                <Icon className={`h-5 w-5 ${stat.color}`} strokeWidth={1.5} />
              </div>
            </div>
            
            <div>
              <div className="text-2xl font-light text-gray-900 tracking-tight mb-1">
                {stat.value.toLocaleString()}
              </div>
              <div className="text-xs font-light text-gray-600 tracking-wide uppercase mb-2">
                {stat.title}
              </div>
              {stat.subtitle && (
                <div className="text-xs text-gray-500 font-light">
                  {stat.subtitle}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Property } from '@/types';

interface GetPropertiesParams {
  active?: 'true' | 'false' | 'all';
}

interface CreatePropertyRequest {
  name: string;
  surface: string;
  description: string;
  rentPrice?: number;
  salePrice?: number;
  amenities?: string[];
  notes?: string;
  image?: string;
  images?: string[];
  type?: 'Renta' | 'Venta' | 'Ambos';
}

interface CreatePropertyResponse {
  message: string;
  property: Property;
}

interface UpdatePropertyRequest {
  id: string;
  data: Partial<{
    name: string;
    surface: string;
    description: string;
    rentPrice: number;
    salePrice: number;
    amenities: string[];
    notes: string;
    image: string;
    images: string[];
    type: 'Renta' | 'Venta' | 'Ambos';
    active: boolean;
  }>;
}

interface UpdatePropertyResponse {
  message: string;
  property: Property;
}

interface DeletePropertyResponse {
  message: string;
  deletedProperty: {
    id: string;
    name: string;
  };
}

export const propertiesApi = createApi({
  reducerPath: 'propertiesApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  tagTypes: ['Property'],
  endpoints: (builder) => ({
    getProperties: builder.query<Property[], GetPropertiesParams | void>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        
        if (params?.active) {
          searchParams.append('active', params.active);
        }
        
        const queryString = searchParams.toString();
        return `properties${queryString ? `?${queryString}` : ''}`;
      },
      providesTags: ['Property'],
    }),
    createProperty: builder.mutation<CreatePropertyResponse, CreatePropertyRequest>({
      query: (newProperty) => ({
        url: 'properties',
        method: 'POST',
        body: newProperty,
      }),
      invalidatesTags: ['Property'],
    }),
    updateProperty: builder.mutation<UpdatePropertyResponse, UpdatePropertyRequest>({
      query: ({ id, data }) => ({
        url: `properties/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Property'],
    }),
    deleteProperty: builder.mutation<DeletePropertyResponse, string>({
      query: (id) => ({
        url: `properties/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Property'],
    }),
    getPropertyById: builder.query<Property, string>({
      query: (id) => `properties/${id}`,
      providesTags: (result, error, id) => [{ type: 'Property', id }],
    }),
  }),
});

export const { useGetPropertiesQuery, useCreatePropertyMutation, useUpdatePropertyMutation, useDeletePropertyMutation, useGetPropertyByIdQuery } = propertiesApi;

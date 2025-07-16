import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Property } from '@/types';

export const propertiesApi = createApi({
  reducerPath: 'propertiesApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  tagTypes: ['Property'],
  endpoints: (builder) => ({
    getProperties: builder.query<Property[], void>({
      query: () => 'properties',
      providesTags: ['Property'],
    }),
  }),
});

export const { useGetPropertiesQuery } = propertiesApi;

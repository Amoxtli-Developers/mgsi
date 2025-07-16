import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import type { Property } from '@/types';

export async function GET() {
  try {
    const db = await getDatabase();
    const properties = await db
      .collection<Property>('properties')
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    
    return NextResponse.json(properties, { status: 200 });
  } catch (error) {
    console.error('Error fetching properties:', error);
    return NextResponse.json(
      { message: 'Error interno al obtener propiedades' },
      { status: 500 }
    );
  }
}

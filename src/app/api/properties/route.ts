import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import type { Property } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const activeFilter = searchParams.get('active');

    const db = await getDatabase();

    // Construir el filtro basado en el parámetro active
    let matchFilter: any = {};

    if (activeFilter === 'true') {
      matchFilter.active = true;
    } else if (activeFilter === 'false') {
      matchFilter.active = false;
    } else if (activeFilter === null || activeFilter === undefined) {
      // Si no se especifica el parámetro, solo mostrar las activas por defecto
      matchFilter.active = true;
    }
    // Si activeFilter === 'all', no se agrega filtro (muestra todas)

    // Use aggregation pipeline to properly compute the images array
    const pipeline: any[] = [];

    // Add $match stage if we have a filter
    if (Object.keys(matchFilter).length > 0) {
      pipeline.push({ $match: matchFilter });
    }

    // Add $addFields to ensure images array exists and includes legacy image field
    pipeline.push({
      $addFields: {
        images: {
          $cond: {
            if: { $isArray: '$images' },
            then: '$images',
            else: {
              $cond: {
                if: {
                  $and: [
                    { $ne: ['$image', ''] },
                    { $ne: ['$image', null] }
                  ]
                },
                then: ['$image'],
                else: []
              }
            }
          }
        }
      }
    });

    // Add $sort stage
    pipeline.push({ $sort: { createdAt: -1 } });

    const properties = await db
      .collection<Property>('properties')
      .aggregate(pipeline)
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validar campos requeridos
    const { name, surface, description, rentPrice, salePrice, amenities, notes, image, images, type } = body;

    if (!name || !surface || !description) {
      return NextResponse.json(
        { message: 'Los campos name, surface y description son requeridos' },
        { status: 400 }
      );
    }

    // Validar que al menos uno de los precios sea mayor a 0
    if (!rentPrice && !salePrice) {
      return NextResponse.json(
        { message: 'Debe especificar al menos un precio (renta o venta)' },
        { status: 400 }
      );
    }

    // Validar que amenities sea un array
    if (amenities && !Array.isArray(amenities)) {
      return NextResponse.json(
        { message: 'Amenities debe ser un array' },
        { status: 400 }
      );
    }

    // Validar que images sea un array si se proporciona
    if (images && !Array.isArray(images)) {
      return NextResponse.json(
        { message: 'Images debe ser un array' },
        { status: 400 }
      );
    }

    // Validar tipo si se proporciona
    if (type && !['Renta', 'Venta', 'Ambos'].includes(type)) {
      return NextResponse.json(
        { message: 'El tipo debe ser "Renta", "Venta" o "Ambos"' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const now = new Date().toISOString();

    // Determinar el array de imágenes
    const imageArray = images && images.length > 0 ? images : [];

    // Crear la nueva propiedad
    const newProperty = {
      name: name.trim(),
      surface: surface.trim(),
      description: description.trim(),
      rentPrice: Number(rentPrice) || 0,
      salePrice: Number(salePrice) || 0,
      amenities: amenities || [],
      notes: notes?.trim() || '',
      image: imageArray.length > 0 ? imageArray[0] : (image?.trim() || ''), // First image or legacy image
      images: imageArray,
      type: type || null,
      active: true, // Todas las propiedades se crean activas
      createdAt: now,
      updatedAt: now,
    };

    const result = await db
      .collection('properties')
      .insertOne(newProperty);

    if (result.acknowledged) {
      const createdProperty = {
        _id: result.insertedId.toString(),
        ...newProperty,
      };

      return NextResponse.json(
        {
          message: 'Propiedad creada exitosamente',
          property: createdProperty
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: 'Error al crear la propiedad' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error creating property:', error);
    return NextResponse.json(
      { message: 'Error interno al crear la propiedad' },
      { status: 500 }
    );
  }
}

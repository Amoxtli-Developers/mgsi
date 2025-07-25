import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

interface RouteParams {
  params: {
    id: string;
  };
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;

    // Validar que el ID sea un ObjectId válido
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: 'ID de propiedad inválido' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    
    // Verificar si la propiedad existe antes de eliminar
    const existingProperty = await db
      .collection('properties')
      .findOne({ _id: new ObjectId(id) });

    if (!existingProperty) {
      return NextResponse.json(
        { message: 'Propiedad no encontrada' },
        { status: 404 }
      );
    }

    // Eliminar la propiedad
    const result = await db
      .collection('properties')
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      return NextResponse.json(
        { 
          message: 'Propiedad eliminada exitosamente',
          deletedProperty: {
            id: existingProperty._id.toString(),
            name: existingProperty.name
          }
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: 'Error al eliminar la propiedad' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error deleting property:', error);
    return NextResponse.json(
      { message: 'Error interno al eliminar la propiedad' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;

    // Validar que el ID sea un ObjectId válido
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: 'ID de propiedad inválido' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    
    // Buscar la propiedad por ID
    const property = await db
      .collection('properties')
      .findOne({ _id: new ObjectId(id) });

    if (!property) {
      return NextResponse.json(
        { message: 'Propiedad no encontrada' },
        { status: 404 }
      );
    }

    // Convertir ObjectId a string para la respuesta
    const propertyWithStringId = {
      ...property,
      _id: property._id.toString(),
    };

    return NextResponse.json(propertyWithStringId, { status: 200 });
  } catch (error) {
    console.error('Error fetching property:', error);
    return NextResponse.json(
      { message: 'Error interno al obtener la propiedad' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;
    const body = await request.json();

    // Validar que el ID sea un ObjectId válido
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: 'ID de propiedad inválido' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    
    // Verificar si la propiedad existe
    const existingProperty = await db
      .collection('properties')
      .findOne({ _id: new ObjectId(id) });

    if (!existingProperty) {
      return NextResponse.json(
        { message: 'Propiedad no encontrada' },
        { status: 404 }
      );
    }

    // Validar campos si se proporcionan
    const { name, surface, description, rentPrice, salePrice, amenities, notes, image, type, active } = body;
    
    // Validar que al menos uno de los precios sea mayor a 0 si se proporcionan
    if ((rentPrice !== undefined || salePrice !== undefined)) {
      const newRentPrice = rentPrice !== undefined ? Number(rentPrice) : existingProperty.rentPrice;
      const newSalePrice = salePrice !== undefined ? Number(salePrice) : existingProperty.salePrice;
      
      if (newRentPrice <= 0 && newSalePrice <= 0) {
        return NextResponse.json(
          { message: 'Debe especificar al menos un precio mayor a 0 (renta o venta)' },
          { status: 400 }
        );
      }
    }
    
    // Validar que amenities sea un array si se proporciona
    if (amenities && !Array.isArray(amenities)) {
      return NextResponse.json(
        { message: 'Amenities debe ser un array' },
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

    // Construir objeto de actualización solo con campos proporcionados
    const updateData: any = {
      updatedAt: new Date().toISOString(),
    };

    if (name !== undefined) updateData.name = name.trim();
    if (surface !== undefined) updateData.surface = surface.trim();
    if (description !== undefined) updateData.description = description.trim();
    if (rentPrice !== undefined) updateData.rentPrice = Number(rentPrice) || 0;
    if (salePrice !== undefined) updateData.salePrice = Number(salePrice) || 0;
    if (amenities !== undefined) updateData.amenities = amenities;
    if (notes !== undefined) updateData.notes = notes?.trim() || '';
    if (image !== undefined) updateData.image = image?.trim() || '';
    if (type !== undefined) updateData.type = type;
    if (active !== undefined) updateData.active = Boolean(active);

    // Actualizar la propiedad
    const result = await db
      .collection('properties')
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
      );

    if (result.modifiedCount === 1 || result.matchedCount === 1) {
      // Obtener la propiedad actualizada
      const updatedProperty = await db
        .collection('properties')
        .findOne({ _id: new ObjectId(id) });

      const propertyWithStringId = {
        ...updatedProperty,
        _id: updatedProperty!._id.toString(),
      };

      return NextResponse.json(
        { 
          message: 'Propiedad actualizada exitosamente',
          property: propertyWithStringId 
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: 'Error al actualizar la propiedad' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error updating property:', error);
    return NextResponse.json(
      { message: 'Error interno al actualizar la propiedad' },
      { status: 500 }
    );
  }
}

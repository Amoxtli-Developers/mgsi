import { NextRequest, NextResponse } from 'next/server';
import { uploadPropertyImage, deletePropertyImage } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const propertyId = formData.get('propertyId') as string;

    if (!file) {
      return NextResponse.json(
        { message: 'No file provided' },
        { status: 400 }
      );
    }

    if (!propertyId) {
      return NextResponse.json(
        { message: 'Property ID is required' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { message: 'Invalid file type. Only JPG, PNG, and WebP are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { message: 'File size exceeds 10MB limit' },
        { status: 400 }
      );
    }

    // Upload to Supabase
    const imageUrl = await uploadPropertyImage(file, propertyId);

    return NextResponse.json(
      {
        message: 'Image uploaded successfully',
        imageUrl,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Error uploading image' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get('imageUrl');

    if (!imageUrl) {
      return NextResponse.json(
        { message: 'Image URL is required' },
        { status: 400 }
      );
    }

    await deletePropertyImage(imageUrl);

    return NextResponse.json(
      { message: 'Image deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Error deleting image' },
      { status: 500 }
    );
  }
}

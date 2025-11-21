import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Client for public operations (read-only)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client for server-side operations (bypasses RLS)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

/**
 * Upload an image to Supabase Storage
 * @param file - The file to upload
 * @param propertyId - The property ID for folder organization
 * @returns The public URL of the uploaded image
 */
export async function uploadPropertyImage(
  file: File,
  propertyId: string
): Promise<string> {
  const bucketName = process.env.SUPABASE_BUCKET_NAME || 'mgsi_bucket';
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
  const filePath = `${propertyId}/${fileName}`;

  // Use admin client to bypass RLS policies
  const { data, error } = await supabaseAdmin.storage
    .from(bucketName)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    throw new Error(`Error uploading image: ${error.message}`);
  }

  // Get public URL
  const { data: urlData } = supabaseAdmin.storage
    .from(bucketName)
    .getPublicUrl(filePath);

  return urlData.publicUrl;
}

/**
 * Delete an image from Supabase Storage
 * @param imageUrl - The full URL of the image to delete
 */
export async function deletePropertyImage(imageUrl: string): Promise<void> {
  const bucketName = process.env.SUPABASE_BUCKET_NAME || 'mgsi_bucket';

  // Extract the file path from the URL
  // URL format: https://donotyisbtmitahlyxun.supabase.co/storage/v1/object/public/mgsi_bucket/propertyId/filename.jpg
  const urlParts = imageUrl.split(`${bucketName}/`);
  if (urlParts.length < 2) {
    throw new Error('Invalid image URL format');
  }

  const filePath = urlParts[1];

  // Use admin client to bypass RLS policies
  const { error } = await supabaseAdmin.storage
    .from(bucketName)
    .remove([filePath]);

  if (error) {
    throw new Error(`Error deleting image: ${error.message}`);
  }
}

/**
 * Delete all images for a property
 * @param propertyId - The property ID
 */
export async function deletePropertyFolder(propertyId: string): Promise<void> {
  const bucketName = process.env.SUPABASE_BUCKET_NAME || 'mgsi_bucket';

  // List all files in the property folder using admin client
  const { data: files, error: listError } = await supabaseAdmin.storage
    .from(bucketName)
    .list(propertyId);

  if (listError) {
    throw new Error(`Error listing images: ${listError.message}`);
  }

  if (files && files.length > 0) {
    const filePaths = files.map((file) => `${propertyId}/${file.name}`);

    // Use admin client to bypass RLS policies
    const { error: deleteError } = await supabaseAdmin.storage
      .from(bucketName)
      .remove(filePaths);

    if (deleteError) {
      throw new Error(`Error deleting images: ${deleteError.message}`);
    }
  }
}

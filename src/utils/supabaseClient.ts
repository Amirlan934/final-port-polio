import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '/utils/supabase/info';

// Create Supabase client for frontend operations
export const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

// API base URL for our server
export const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-098d0831`;

// Upload image to server
export async function uploadImage(file: File): Promise<{ publicUrl: string; imageId: string }> {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch(`${API_BASE_URL}/upload-image`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`
    },
    body: formData
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to upload image');
  }
  
  const data = await response.json();
  return {
    publicUrl: data.publicUrl,
    imageId: data.imageId
  };
}

// Delete image
export async function deleteImage(imageId: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/image/${imageId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`
    }
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to delete image');
  }
}

// Get image metadata
export async function getImageMetadata(imageId: string) {
  const response = await fetch(`${API_BASE_URL}/image/${imageId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`
    }
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to get image');
  }
  
  return response.json();
}

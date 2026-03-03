import { useState, useRef } from 'react';
import { Upload, X, Check } from 'lucide-react';
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface ImageUploadInputProps {
  currentImage?: string;
  onImageUploaded: (imageUrl: string) => void;
  label?: string;
  className?: string;
}

export function ImageUploadInput({ 
  currentImage, 
  onImageUploaded, 
  label = 'Upload Image',
  className = ''
}: ImageUploadInputProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentImage || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }

    try {
      setUploading(true);

      // Create FormData
      const formData = new FormData();
      formData.append('file', file);

      // Upload to backend
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-098d0831/upload-image`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to upload image');
      }

      console.log('✅ Image uploaded successfully:', data);

      // Update preview and notify parent
      setPreview(data.publicUrl);
      onImageUploaded(data.publicUrl);

    } catch (error) {
      console.error('❌ Image upload error:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveImage = () => {
    setPreview('');
    onImageUploaded('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={className}>
      <label className="block text-sm text-gray-300 mb-2">{label}</label>
      
      {/* Preview */}
      {preview && (
        <div className="mb-3 relative group">
          <img 
            src={preview} 
            alt="Preview" 
            className="w-full h-48 object-cover rounded-lg border border-white/10"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-2 left-2 px-2 py-1 bg-green-500/90 text-white text-xs rounded flex items-center gap-1">
            <Check className="w-3 h-3" />
            Uploaded
          </div>
        </div>
      )}

      {/* Upload Input */}
      <div className="relative">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={uploading}
          className="hidden"
          id={`image-upload-${label.replace(/\s/g, '-')}`}
        />
        <label
          htmlFor={`image-upload-${label.replace(/\s/g, '-')}`}
          className={`
            flex items-center justify-center gap-2 w-full px-4 py-3 
            border-2 border-dashed rounded-lg cursor-pointer
            transition-colors
            ${uploading 
              ? 'border-purple-500/50 bg-purple-500/10 cursor-wait' 
              : 'border-white/20 bg-white/5 hover:border-purple-500/50 hover:bg-white/10'
            }
          `}
        >
          <Upload className={`w-5 h-5 ${uploading ? 'text-purple-400 animate-pulse' : 'text-white/60'}`} />
          <span className={uploading ? 'text-purple-400' : 'text-white/60'}>
            {uploading ? 'Uploading...' : preview ? 'Change Image' : 'Choose Image'}
          </span>
        </label>
      </div>

      {/* Help Text */}
      <p className="text-xs text-white/40 mt-2">
        Supported: JPG, PNG, WebP, GIF (Max 5MB)
      </p>
    </div>
  );
}

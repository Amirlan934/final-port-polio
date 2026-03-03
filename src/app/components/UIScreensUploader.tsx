import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, Trash2, Loader2, Image as ImageIcon, AlertCircle } from 'lucide-react';
import imageCompression from 'browser-image-compression';
import { uploadImage } from '../../utils/supabaseClient';

interface UIScreensUploaderProps {
  screens: string[];
  onScreensChange: (screens: string[]) => void;
}

interface UploadedScreen {
  url: string;
  id: string;
  isUploading?: boolean;
}

export function UIScreensUploader({ screens, onScreensChange }: UIScreensUploaderProps) {
  const [uploadedScreens, setUploadedScreens] = useState<UploadedScreen[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const initializedRef = useRef(false);
  const prevScreensRef = useRef<string[]>([]);

  // Initialize state from props only once
  useEffect(() => {
    if (!initializedRef.current && screens.length > 0) {
      setUploadedScreens(screens.map((url, index) => ({ url, id: `existing-${index}` })));
      prevScreensRef.current = screens;
      initializedRef.current = true;
    }
  }, [screens]);

  // Sync uploadedScreens to parent whenever it changes
  useEffect(() => {
    if (initializedRef.current) {
      const validScreens = uploadedScreens.filter(s => !s.isUploading).map(s => s.url);
      
      // Only call onScreensChange if the screens have actually changed
      const hasChanged = 
        validScreens.length !== prevScreensRef.current.length ||
        validScreens.some((url, index) => url !== prevScreensRef.current[index]);
      
      if (hasChanged) {
        prevScreensRef.current = validScreens;
        onScreensChange(validScreens);
      }
    }
  }, [uploadedScreens]); // Remove onScreensChange from dependencies

  // Compress image
  const compressImage = async (file: File): Promise<File> => {
    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      fileType: file.type as 'image/jpeg' | 'image/png' | 'image/webp',
    };

    try {
      const compressedFile = await imageCompression(file, options);
      console.log('Original file size:', (file.size / 1024 / 1024).toFixed(2), 'MB');
      console.log('Compressed file size:', (compressedFile.size / 1024 / 1024).toFixed(2), 'MB');
      return compressedFile;
    } catch (err) {
      console.error('Compression error:', err);
      return file;
    }
  };

  // Validate file
  const validateFile = (file: File): string | null => {
    if (!file.type.startsWith('image/')) {
      return 'Зөвхөн зураг файл upload хийх боломжтой';
    }

    if (file.size > 2 * 1024 * 1024) {
      return 'Зургийн хэмжээ 2MB-аас бага байх ёстой';
    }

    return null;
  };

  // Upload single file
  const uploadFile = async (file: File) => {
    const uploadId = `upload-${Date.now()}-${Math.random()}`;
    
    // Add placeholder
    setUploadedScreens(prev => {
      const newScreens = [...prev, { url: '', id: uploadId, isUploading: true }];
      return newScreens;
    });

    try {
      // Compress if needed
      let fileToUpload = file;
      if (file.size > 0.5 * 1024 * 1024) { // Compress if > 500KB
        fileToUpload = await compressImage(file);
      }

      // Upload to Supabase
      const { publicUrl } = await uploadImage(fileToUpload);

      // Update with actual URL
      setUploadedScreens(prev => 
        prev.map(s => 
          s.id === uploadId ? { url: publicUrl, id: uploadId, isUploading: false } : s
        )
      );

      setError(null);
    } catch (err) {
      console.error('Upload error:', err);
      setError('Зургийг upload хийхэд алдаа гарлаа: ' + (err as Error).message);
      
      // Remove placeholder on error
      setUploadedScreens(prev => prev.filter(s => s.id !== uploadId));
    }
  };

  // Handle file selection
  const handleFileSelect = async (files: FileList | null) => {
    if (!files) return;

    setError(null);
    const filesArray = Array.from(files);

    for (const file of filesArray) {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        continue;
      }

      await uploadFile(file);
    }
  };

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  // Delete screen
  const handleDelete = (id: string) => {
    setUploadedScreens(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
          isDragging
            ? 'border-purple-500 bg-purple-500/10'
            : 'border-white/10 hover:border-purple-400/50'
        }`}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
          id="ui-screens-upload"
        />
        <label htmlFor="ui-screens-upload" className="cursor-pointer">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
              <Upload className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-white mb-1">UI Screens зураг upload хийх</p>
              <p className="text-sm text-gray-400">
                Дарах эсвэл файл энд чирж оруулах
              </p>
              <p className="text-xs text-gray-500 mt-2">
                PNG, JPG, WEBP • Max 2MB • Олон файл сонгох боломжтой
              </p>
            </div>
          </div>
        </label>
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
          >
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-400">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preview Grid */}
      {uploadedScreens.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {uploadedScreens.map((screen, index) => (
              <motion.div
                key={screen.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative aspect-[4/3] rounded-lg overflow-hidden bg-black/50 border border-white/10 group"
              >
                {screen.isUploading ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
                    <p className="text-xs text-gray-400">Upload хийж байна...</p>
                  </div>
                ) : screen.url ? (
                  <>
                    <img
                      src={screen.url}
                      alt={`UI Screen ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23333"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23666" font-family="sans-serif"%3EЗураг ачаалагдсангүй%3C/text%3E%3C/svg%3E';
                      }}
                    />
                    
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    {/* Delete Button - Always visible with shadow */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDelete(screen.id)}
                      className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 rounded-lg shadow-lg transition-all z-10"
                      title="Устгах"
                    >
                      <Trash2 className="w-4 h-4 text-white" />
                    </motion.button>

                    {/* Screen Number */}
                    <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/70 rounded text-xs text-white">
                      Screen {index + 1}
                    </div>
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-gray-600" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Info Text */}
      {uploadedScreens.length === 0 && (
        <p className="text-sm text-gray-500 text-center">
          Одоогоор ямар ч UI screen оруулаагүй байна
        </p>
      )}
      {uploadedScreens.length > 0 && (
        <p className="text-sm text-gray-400 text-center">
          Нийт {uploadedScreens.filter(s => !s.isUploading).length} зураг оруулсан
        </p>
      )}
    </div>
  );
}
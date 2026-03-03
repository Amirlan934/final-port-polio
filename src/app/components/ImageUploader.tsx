import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, Search, X, Image as ImageIcon, Check, Loader2 } from 'lucide-react';
import { uploadImage } from '../../utils/supabaseClient';

interface ImageUploaderProps {
  currentImage: string;
  onImageSelect: (imageUrl: string) => void;
  onClose: () => void;
}

// Unsplash хайх function
async function searchUnsplash(query: string): Promise<string[]> {
  // Зарим түгээмэл сэдвүүдийн жишээ зургууд
  const imageCollections: Record<string, string[]> = {
    business: [
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80',
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80',
      'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80',
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80',
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80'
    ],
    technology: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
      'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80',
      'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?w=800&q=80',
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80'
    ],
    design: [
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
      'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80',
      'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&q=80',
      'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&q=80',
      'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80',
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80'
    ],
    mobile: [
      'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&q=80',
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80',
      'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800&q=80',
      'https://images.unsplash.com/photo-1601972599748-a0de1c4a5dfa?w=800&q=80'
    ],
    health: [
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80',
      'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&q=80',
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
      'https://images.unsplash.com/photo-1549576490-b0b4831ef60a?w=800&q=80',
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80'
    ],
    finance: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80',
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80',
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
      'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&q=80'
    ],
    creative: [
      'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80',
      'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&q=80',
      'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=800&q=80',
      'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800&q=80',
      'https://images.unsplash.com/photo-1452457807411-4979b707c5be?w=800&q=80',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80'
    ]
  };

  // Хайлтын түлхүүр үгийг олох
  const queryLower = query.toLowerCase();
  let selectedImages: string[] = [];

  for (const [key, images] of Object.entries(imageCollections)) {
    if (queryLower.includes(key) || key.includes(queryLower)) {
      selectedImages = images;
      break;
    }
  }

  // Олдоогүй бол анхдагч зургууд
  if (selectedImages.length === 0) {
    selectedImages = [
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
      'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80',
      'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&q=80',
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80'
    ];
  }

  return selectedImages;
}

export function ImageUploader({ currentImage, onImageSelect, onClose }: ImageUploaderProps) {
  const [activeTab, setActiveTab] = useState<'upload' | 'unsplash'>('upload');
  const [searchQuery, setSearchQuery] = useState('');
  const [unsplashResults, setUnsplashResults] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(currentImage);
  const [isUploading, setIsUploading] = useState(false);

  // Handle file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('Зөвхөн зураг файл upload хийх боломжтой');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Зургийн хэмжээ 5MB-аас бага байх ёстой');
      return;
    }

    try {
      setIsUploading(true);
      
      // Upload image to Supabase
      const { publicUrl } = await uploadImage(file);
      
      setPreviewUrl(publicUrl);
      alert('✅ Зураг амжилттай upload хийгдлээ!');
    } catch (error) {
      console.error('Upload error:', error);
      alert('❌ Зургийг upload хийхэд алдаа гарлаа: ' + (error as Error).message);
    } finally {
      setIsUploading(false);
    }
  };

  // Search Unsplash (mock - in real app would use API)
  const handleUnsplashSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    // Mock search results - in production, you'd use the Unsplash API
    const mockResults = await searchUnsplash(searchQuery);
    
    setTimeout(() => {
      setUnsplashResults(mockResults);
      setIsSearching(false);
    }, 500);
  };

  const handleSave = () => {
    console.log('💾 ImageUploader: Saving selected image URL:', previewUrl);
    onImageSelect(previewUrl);
    onClose();
  };

  return (
    <AnimatePresence>
      <>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[300]"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[90%] md:max-w-4xl md:h-[85vh] bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl shadow-2xl z-[301] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/50 backdrop-blur-xl">
            <h3 className="text-xl text-white">Зураг сонгох</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 px-6 pt-4 border-b border-white/10">
            <button
              onClick={() => setActiveTab('upload')}
              className={`px-4 py-2 rounded-t-lg transition-colors ${
                activeTab === 'upload'
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              <Upload className="w-4 h-4 inline mr-2" />
              Upload
            </button>
            <button
              onClick={() => setActiveTab('unsplash')}
              className={`px-4 py-2 rounded-t-lg transition-colors ${
                activeTab === 'unsplash'
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              <Search className="w-4 h-4 inline mr-2" />
              Unsplash
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {activeTab === 'upload' ? (
              <div className="space-y-6">
                {/* File Upload Area */}
                <div className="border-2 border-dashed border-white/10 rounded-lg p-12 text-center hover:border-purple-400 transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center gap-4">
                      {isUploading ? (
                        <>
                          <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center">
                            <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
                          </div>
                          <div>
                            <p className="text-purple-400 mb-2">Upload хийж байна...</p>
                            <p className="text-sm text-gray-500">
                              Түр хүлээнэ үү
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center">
                            <Upload className="w-8 h-8 text-purple-400" />
                          </div>
                          <div>
                            <p className="text-white mb-2">Upload Image</p>
                            <p className="text-sm text-gray-400">
                              Click or drag file here
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                              PNG, JPG, WEBP, GIF • Max 5MB
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </label>
                </div>

                {/* URL Input */}
                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    Or enter image URL
                  </label>
                  <input
                    type="text"
                    value={previewUrl}
                    onChange={(e) => setPreviewUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                  />
                </div>

                {/* Preview */}
                {previewUrl && (
                  <div>
                    <p className="text-sm text-gray-300 mb-2">Preview</p>
                    <div className="relative aspect-video rounded-lg overflow-hidden bg-black/50 border border-white/10">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23333"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23666" font-family="sans-serif"%3EЗураг ачаалагдсангүй%3C/text%3E%3C/svg%3E';
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {/* Search Bar */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleUnsplashSearch()}
                    placeholder="Зураг хайх... (ж.нь: 'business', 'nature', 'technology')"
                    className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                  />
                  <button
                    onClick={handleUnsplashSearch}
                    disabled={isSearching}
                    className="px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors disabled:opacity-50"
                  >
                    {isSearching ? 'Хайж байна...' : 'Хайх'}
                  </button>
                </div>

                {/* Results Grid */}
                {unsplashResults.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {unsplashResults.map((imageUrl, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className={`relative aspect-video rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                          previewUrl === imageUrl
                            ? 'border-purple-500 ring-2 ring-purple-500/50'
                            : 'border-white/10 hover:border-purple-500/50'
                        }`}
                        onClick={() => setPreviewUrl(imageUrl)}
                      >
                        <img
                          src={imageUrl}
                          alt={`Result ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        {previewUrl === imageUrl && (
                          <div className="absolute inset-0 bg-purple-500/20 flex items-center justify-center">
                            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                              <Check className="w-5 h-5 text-white" />
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Empty State */}
                {unsplashResults.length === 0 && !isSearching && (
                  <div className="text-center py-12 text-gray-400">
                    <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Зураг хайж эхлэх...</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-white/10 bg-black/50 backdrop-blur-xl">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              Цуцлах
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
            >
              Сонгох
            </button>
          </div>
        </motion.div>
      </>
    </AnimatePresence>
  );
}
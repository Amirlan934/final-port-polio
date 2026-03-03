import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Save, ChevronDown, ChevronUp, Upload } from 'lucide-react';
import { Project } from '../contexts/PortfolioContext';
import { ImageUploader } from './ImageUploader';
import { UIScreensUploader } from './UIScreensUploader';

interface ProjectEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
  onSave: (updatedProject: Project) => void;
}

export function ProjectEditModal({ isOpen, onClose, project, onSave }: ProjectEditModalProps) {
  const [formData, setFormData] = useState<Project>(project);
  const [showCaseStudy, setShowCaseStudy] = useState(false);
  const [showImageUploader, setShowImageUploader] = useState(false);
  const [currentImageField, setCurrentImageField] = useState<'main' | 'wireframe' | 'cover'>('main');

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const ensureCaseStudy = () => {
    if (!formData.caseStudy) {
      setFormData({
        ...formData,
        caseStudy: {
          title: formData.title,
          productType: '',
          role: '',
          platform: '',
          timeline: '',
          problemStatement: '',
          goals: [],
          responsibilities: [],
          researchInsights: '',
          userFlow: [],
          wireframeImage: '',
          wireframeDescription: '',
          uiScreens: [],
          designDecisions: {
            typography: '',
            colors: '',
            hierarchy: ''
          },
          interactions: [],
          results: '',
          reflection: '',
          coverImage: formData.image
        }
      });
    }
    setShowCaseStudy(true);
  };

  const updateCaseStudy = (field: string, value: any) => {
    setFormData({
      ...formData,
      caseStudy: {
        ...formData.caseStudy!,
        [field]: value
      }
    });
  };

  const updateDesignDecisions = (field: string, value: string) => {
    setFormData({
      ...formData,
      caseStudy: {
        ...formData.caseStudy!,
        designDecisions: {
          ...formData.caseStudy!.designDecisions,
          [field]: value
        }
      }
    });
  };

  const handleImageUpload = (url: string) => {
    if (currentImageField === 'main') {
      setFormData({ ...formData, image: url });
    } else if (currentImageField === 'wireframe') {
      updateCaseStudy('wireframeImage', url);
    } else if (currentImageField === 'cover') {
      updateCaseStudy('coverImage', url);
    }
    setShowImageUploader(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div key="project-modal">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-4 md:inset-8 bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/50 backdrop-blur-xl">
              <h2 className="text-2xl text-white">Төсөл засах</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="max-w-4xl mx-auto space-y-6">
                {/* Basic Info */}
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-4">
                  <h3 className="text-xl text-white mb-4">Үндсэн мэдээлэл</h3>
                  
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Гарчиг</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Ангилал</label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Тайлбар</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white min-h-[100px]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Зургийн URL</label>
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                    />
                    <button
                      onClick={() => {
                        setCurrentImageField('main');
                        setShowImageUploader(true);
                      }}
                      className="mt-2 flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      Зургийг оруулах
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Tags (таслалаар тусгаарла)</label>
                    <input
                      type="text"
                      value={formData.tags.join(', ')}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        tags: e.target.value.split(',').map(t => t.trim()).filter(t => t)
                      })}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                      placeholder="Product Design, UX Research, Design System"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <label htmlFor="featured" className="text-sm text-gray-300">
                      Featured project (нүүр хуудсанд харуулах)
                    </label>
                  </div>
                </div>

                {/* Case Study Section */}
                <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                  <button
                    onClick={ensureCaseStudy}
                    className="flex items-center justify-between w-full text-left mb-4"
                  >
                    <h3 className="text-xl text-white">Case Study</h3>
                    {showCaseStudy ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </button>

                  {showCaseStudy && (
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-300 mb-2">Product Type</label>
                          <input
                            type="text"
                            value={formData.caseStudy?.productType || ''}
                            onChange={(e) => updateCaseStudy('productType', e.target.value)}
                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-sm text-gray-300 mb-2">Role</label>
                          <input
                            type="text"
                            value={formData.caseStudy?.role || ''}
                            onChange={(e) => updateCaseStudy('role', e.target.value)}
                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-sm text-gray-300 mb-2">Platform</label>
                          <input
                            type="text"
                            value={formData.caseStudy?.platform || ''}
                            onChange={(e) => updateCaseStudy('platform', e.target.value)}
                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-sm text-gray-300 mb-2">Timeline</label>
                          <input
                            type="text"
                            value={formData.caseStudy?.timeline || ''}
                            onChange={(e) => updateCaseStudy('timeline', e.target.value)}
                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm text-gray-300 mb-2">Problem Statement</label>
                        <textarea
                          value={formData.caseStudy?.problemStatement || ''}
                          onChange={(e) => updateCaseStudy('problemStatement', e.target.value)}
                          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white min-h-[80px]"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-300 mb-2">Goals (таслалаар тусгаарла)</label>
                        <textarea
                          value={formData.caseStudy?.goals?.join(', ') || ''}
                          onChange={(e) => updateCaseStudy('goals', e.target.value.split(',').map(g => g.trim()).filter(g => g))}
                          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white min-h-[80px]"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-300 mb-2">Responsibilities (таслалаар тусгаарла)</label>
                        <textarea
                          value={formData.caseStudy?.responsibilities?.join(', ') || ''}
                          onChange={(e) => updateCaseStudy('responsibilities', e.target.value.split(',').map(r => r.trim()).filter(r => r))}
                          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white min-h-[60px]"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-300 mb-2">Research Insights</label>
                        <textarea
                          value={formData.caseStudy?.researchInsights || ''}
                          onChange={(e) => updateCaseStudy('researchInsights', e.target.value)}
                          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white min-h-[80px]"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-300 mb-2">User Flow (таслалаар тусгаарла)</label>
                        <textarea
                          value={formData.caseStudy?.userFlow?.join(', ') || ''}
                          onChange={(e) => updateCaseStudy('userFlow', e.target.value.split(',').map(u => u.trim()).filter(u => u))}
                          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white min-h-[60px]"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-300 mb-2">Wireframe Image URL</label>
                          <input
                            type="text"
                            value={formData.caseStudy?.wireframeImage || ''}
                            onChange={(e) => updateCaseStudy('wireframeImage', e.target.value)}
                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                          />
                          <button
                            onClick={() => {
                              setCurrentImageField('wireframe');
                              setShowImageUploader(true);
                            }}
                            className="mt-2 flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
                          >
                            <Upload className="w-4 h-4" />
                            Зургийг оруулах
                          </button>
                        </div>

                        <div>
                          <label className="block text-sm text-gray-300 mb-2">Cover Image URL</label>
                          <input
                            type="text"
                            value={formData.caseStudy?.coverImage || ''}
                            onChange={(e) => updateCaseStudy('coverImage', e.target.value)}
                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                          />
                          <button
                            onClick={() => {
                              setCurrentImageField('cover');
                              setShowImageUploader(true);
                            }}
                            className="mt-2 flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
                          >
                            <Upload className="w-4 h-4" />
                            Зургийг оруулах
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm text-gray-300 mb-2">Wireframe Description</label>
                        <textarea
                          value={formData.caseStudy?.wireframeDescription || ''}
                          onChange={(e) => updateCaseStudy('wireframeDescription', e.target.value)}
                          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white min-h-[60px]"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-300 mb-3">UI Screens</label>
                        <UIScreensUploader
                          screens={formData.caseStudy?.uiScreens || []}
                          onScreensChange={(screens) => updateCaseStudy('uiScreens', screens)}
                        />
                      </div>

                      <div className="border-t border-white/10 pt-4">
                        <h4 className="text-lg text-white mb-3">Design Decisions</h4>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm text-gray-300 mb-2">Typography</label>
                            <input
                              type="text"
                              value={formData.caseStudy?.designDecisions?.typography || ''}
                              onChange={(e) => updateDesignDecisions('typography', e.target.value)}
                              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-sm text-gray-300 mb-2">Colors</label>
                            <input
                              type="text"
                              value={formData.caseStudy?.designDecisions?.colors || ''}
                              onChange={(e) => updateDesignDecisions('colors', e.target.value)}
                              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-sm text-gray-300 mb-2">Hierarchy</label>
                            <input
                              type="text"
                              value={formData.caseStudy?.designDecisions?.hierarchy || ''}
                              onChange={(e) => updateDesignDecisions('hierarchy', e.target.value)}
                              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm text-gray-300 mb-2">Interactions (таслалаар тусгаарла)</label>
                        <textarea
                          value={formData.caseStudy?.interactions?.join(', ') || ''}
                          onChange={(e) => updateCaseStudy('interactions', e.target.value.split(',').map(i => i.trim()).filter(i => i))}
                          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white min-h-[60px]"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-300 mb-2">Results</label>
                        <textarea
                          value={formData.caseStudy?.results || ''}
                          onChange={(e) => updateCaseStudy('results', e.target.value)}
                          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white min-h-[80px]"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-300 mb-2">Reflection</label>
                        <textarea
                          value={formData.caseStudy?.reflection || ''}
                          onChange={(e) => updateCaseStudy('reflection', e.target.value)}
                          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white min-h-[80px]"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-white/10 bg-black/50 backdrop-blur-xl">
              <button
                onClick={onClose}
                className="flex items-center gap-2 px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
                Цуцлах
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
              >
                <Save className="w-4 h-4" />
                Хадгалах
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Image Uploader Modal */}
      {showImageUploader && (
        <ImageUploader
          key="image-uploader"
          currentImage={
            currentImageField === 'main' 
              ? formData.image 
              : currentImageField === 'wireframe' 
                ? formData.caseStudy?.wireframeImage || '' 
                : formData.caseStudy?.coverImage || ''
          }
          onImageSelect={handleImageUpload}
          onClose={() => setShowImageUploader(false)}
        />
      )}
    </AnimatePresence>
  );
}
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Save, ChevronDown, ChevronUp, Upload, Plus, Trash2, Eye, EyeOff } from 'lucide-react';
import { ProfessionalCaseStudy } from '../contexts/PortfolioContext';
import { ImageUploader } from './ImageUploader';
import { UIScreensUploader } from './UIScreensUploader';
import { FeaturedProjectSettings } from './FeaturedProjectSettings';

interface CaseStudyEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseStudy: ProfessionalCaseStudy | null;
  onSave: (data: Partial<ProfessionalCaseStudy>) => void;
}

export function CaseStudyEditModal({ isOpen, onClose, caseStudy, onSave }: CaseStudyEditModalProps) {
  const [formData, setFormData] = useState<Partial<ProfessionalCaseStudy>>({});
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    basic: true,
    featured: false,
    skills: false,
    designProcess: false,
    mockups: true,
    achievements: false,
  });
  const [showImageUploader, setShowImageUploader] = useState(false);
  const [uploadTarget, setUploadTarget] = useState<'hero' | 'mockup' | 'featured'>('hero');
  
  useEffect(() => {
    if (caseStudy) {
      setFormData(caseStudy);
    } else {
      setFormData({
        projectTitle: '',
        role: '',
        timeline: '',
        platform: '',
        description: '',
        heroImage: '',
        skills: [],
        designProcess: {
          research: '',
          design: '',
          testing: ''
        },
        mobileMockups: [],
        keyAchievements: {
          metric1: '',
          description1: '',
          metric2: '',
          description2: '',
          metric3: '',
          description3: ''
        },
        // Default featured settings
        featured: true,
        featuredButtonText: 'View Case Study',
        featuredButtonVisible: true,
        featuredTags: [],
        featuredOrder: 0
      });
    }
  }, [caseStudy]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSave = () => {
    console.log('💾 CaseStudyEditModal: Saving formData:', formData);
    console.log('🖼️ CaseStudyEditModal: heroImage in formData:', formData.heroImage);
    console.log('📱 CaseStudyEditModal: mobileMockups in formData:', formData.mobileMockups?.length || 0, formData.mobileMockups);
    onSave(formData);
    onClose();
  };

  const handleImageSelect = (url: string) => {
    console.log('🎯 CaseStudyEditModal: Received image URL:', url, 'for target:', uploadTarget);
    if (uploadTarget === 'hero') {
      console.log('✅ CaseStudyEditModal: Setting heroImage to:', url);
      setFormData(prev => ({ ...prev, heroImage: url }));
    } else {
      setFormData(prev => ({
        ...prev,
        mobileMockups: [...(prev.mobileMockups || []), url]
      }));
    }
    setShowImageUploader(false);
  };

  const addSkill = () => {
    setFormData(prev => ({
      ...prev,
      skills: [...(prev.skills || []), '']
    }));
  };

  const updateSkill = (index: number, value: string) => {
    const newSkills = [...(formData.skills || [])];
    newSkills[index] = value;
    setFormData(prev => ({ ...prev, skills: newSkills }));
  };

  const removeSkill = (index: number) => {
    const newSkills = (formData.skills || []).filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, skills: newSkills }));
  };

  const removeMockup = (index: number) => {
    const newMockups = (formData.mobileMockups || []).filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, mobileMockups: newMockups }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div key="case-study-modal">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 bg-white rounded-2xl shadow-2xl z-[201] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-violet-50">
              <h2 className="text-2xl font-semibold text-gray-900">
                {caseStudy ? 'Edit Case Study' : 'New Case Study'}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/50 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Basic Information */}
              <div className="mb-6">
                <button
                  onClick={() => toggleSection('basic')}
                  className="flex items-center justify-between w-full text-left mb-4"
                >
                  <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
                  {expandedSections.basic ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                
                {expandedSections.basic && (
                  <div className="space-y-4 pl-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Project Title *
                      </label>
                      <input
                        type="text"
                        value={formData.projectTitle || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, projectTitle: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="e.g., Modern Banking Experience"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Your Role *
                        </label>
                        <input
                          type="text"
                          value={formData.role || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="e.g., UI/UX Designer"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Timeline *
                        </label>
                        <input
                          type="text"
                          value={formData.timeline || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, timeline: e.target.value }))}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="e.g., 3 Months"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Platform *
                      </label>
                      <input
                        type="text"
                        value={formData.platform || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, platform: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="e.g., Web & Mobile"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Project Description *
                      </label>
                      <textarea
                        value={formData.description || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                        placeholder="Describe the project..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hero Image *
                      </label>
                      {formData.heroImage ? (
                        <div className="relative">
                          <img src={formData.heroImage} alt="Hero" className="w-full h-48 object-cover rounded-lg" />
                          <button
                            onClick={() => {
                              setUploadTarget('hero');
                              setShowImageUploader(true);
                            }}
                            className="absolute top-2 right-2 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-sm rounded-lg hover:bg-white transition-colors"
                          >
                            Change Image
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setUploadTarget('hero');
                            setShowImageUploader(true);
                          }}
                          className="w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-400 transition-colors flex flex-col items-center gap-2"
                        >
                          <Upload className="w-6 h-6 text-gray-400" />
                          <span className="text-sm text-gray-600">Upload Hero Image</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Featured Project Display Settings */}
              <div className="mb-6">
                <button
                  onClick={() => toggleSection('featured')}
                  className="flex items-center justify-between w-full text-left mb-4 bg-gradient-to-r from-purple-50 to-violet-50 px-4 py-3 rounded-lg"
                >
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Featured Project Display</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Customize how this appears on the homepage</p>
                  </div>
                  {expandedSections.featured ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                
                {expandedSections.featured && (
                  <FeaturedProjectSettings 
                    formData={formData} 
                    setFormData={setFormData} 
                  />
                )}
              </div>

              {/* Skills & Deliverables */}
              <div className="mb-6">
                <button
                  onClick={() => toggleSection('skills')}
                  className="flex items-center justify-between w-full text-left mb-4"
                >
                  <h3 className="text-lg font-medium text-gray-900">Skills & Deliverables</h3>
                  {expandedSections.skills ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                
                {expandedSections.skills && (
                  <div className="space-y-3 pl-4">
                    {(formData.skills || []).map((skill, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={skill}
                          onChange={(e) => updateSkill(index, e.target.value)}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="e.g., User Research"
                        />
                        <button
                          onClick={() => removeSkill(index)}
                          className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={addSkill}
                      className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Skill
                    </button>
                  </div>
                )}
              </div>

              {/* Design Process */}
              <div className="mb-6">
                <button
                  onClick={() => toggleSection('designProcess')}
                  className="flex items-center justify-between w-full text-left mb-4"
                >
                  <h3 className="text-lg font-medium text-gray-900">Design Process</h3>
                  {expandedSections.designProcess ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                
                {expandedSections.designProcess && (
                  <div className="space-y-4 pl-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Research
                      </label>
                      <textarea
                        value={formData.designProcess?.research || ''}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          designProcess: { ...(prev.designProcess || { research: '', design: '', testing: '' }), research: e.target.value }
                        }))}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                        placeholder="Describe the research phase..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Design
                      </label>
                      <textarea
                        value={formData.designProcess?.design || ''}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          designProcess: { ...(prev.designProcess || { research: '', design: '', testing: '' }), design: e.target.value }
                        }))}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                        placeholder="Describe the design phase..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Testing
                      </label>
                      <textarea
                        value={formData.designProcess?.testing || ''}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          designProcess: { ...(prev.designProcess || { research: '', design: '', testing: '' }), testing: e.target.value }
                        }))}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                        placeholder="Describe the testing phase..."
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Mockups */}
              <div className="mb-6">
                <button
                  onClick={() => toggleSection('mockups')}
                  className="flex items-center justify-between w-full text-left mb-4"
                >
                  <h3 className="text-lg font-medium text-gray-900">Mobile Mockups</h3>
                  {expandedSections.mockups ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                
                {expandedSections.mockups && (
                  <div className="pl-4">
                    <UIScreensUploader
                      screens={formData.mobileMockups || []}
                      onScreensChange={(screens) => setFormData(prev => ({ ...prev, mobileMockups: screens }))}
                    />
                  </div>
                )}
              </div>

              {/* Key Achievements */}
              <div className="mb-6">
                <button
                  onClick={() => toggleSection('achievements')}
                  className="flex items-center justify-between w-full text-left mb-4"
                >
                  <h3 className="text-lg font-medium text-gray-900">Key Achievements</h3>
                  {expandedSections.achievements ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                
                {expandedSections.achievements && (
                  <div className="space-y-4 pl-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Metric 1
                        </label>
                        <input
                          type="text"
                          value={formData.keyAchievements?.metric1 || ''}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            keyAchievements: {
                              ...(prev.keyAchievements || { metric1: '', description1: '', metric2: '', description2: '', metric3: '', description3: '' }),
                              metric1: e.target.value
                            }
                          }))}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="e.g., 42%"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description 1
                        </label>
                        <input
                          type="text"
                          value={formData.keyAchievements?.description1 || ''}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            keyAchievements: {
                              ...(prev.keyAchievements || { metric1: '', description1: '', metric2: '', description2: '', metric3: '', description3: '' }),
                              description1: e.target.value
                            }
                          }))}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="e.g., Increase in user engagement"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Metric 2
                        </label>
                        <input
                          type="text"
                          value={formData.keyAchievements?.metric2 || ''}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            keyAchievements: {
                              ...(prev.keyAchievements || { metric1: '', description1: '', metric2: '', description2: '', metric3: '', description3: '' }),
                              metric2: e.target.value
                            }
                          }))}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="e.g., 8.5/10"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description 2
                        </label>
                        <input
                          type="text"
                          value={formData.keyAchievements?.description2 || ''}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            keyAchievements: {
                              ...(prev.keyAchievements || { metric1: '', description1: '', metric2: '', description2: '', metric3: '', description3: '' }),
                              description2: e.target.value
                            }
                          }))}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="e.g., Average usability score"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Metric 3
                        </label>
                        <input
                          type="text"
                          value={formData.keyAchievements?.metric3 || ''}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            keyAchievements: {
                              ...(prev.keyAchievements || { metric1: '', description1: '', metric2: '', description2: '', metric3: '', description3: '' }),
                              metric3: e.target.value
                            }
                          }))}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="e.g., -35%"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description 3
                        </label>
                        <input
                          type="text"
                          value={formData.keyAchievements?.description3 || ''}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            keyAchievements: {
                              ...(prev.keyAchievements || { metric1: '', description1: '', metric2: '', description2: '', metric3: '', description3: '' }),
                              description3: e.target.value
                            }
                          }))}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="e.g., Reduction in support tickets"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-4 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={onClose}
                className="px-6 py-2.5 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                Save Case Study
              </button>
            </div>
          </motion.div>

          {/* Image Uploader Modal */}
          {showImageUploader && (
            <ImageUploader
              currentImage={uploadTarget === 'hero' ? (formData.heroImage || '') : ''}
              onImageSelect={handleImageSelect}
              onClose={() => setShowImageUploader(false)}
            />
          )}
        </div>
      )}
    </AnimatePresence>
  );
}
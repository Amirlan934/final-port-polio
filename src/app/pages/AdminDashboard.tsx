import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LogOut, 
  Briefcase, 
  Image as ImageIcon, 
  MessageSquare, 
  Settings,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Home,
  FileText,
  Download,
  Upload,
  Mail
} from 'lucide-react';
import { usePortfolio } from '../contexts/PortfolioContext';
import { CaseStudyEditModal } from '../components/CaseStudyEditModal';
import { ImageUploader } from '../components/ImageUploader';
import { ContactInquiriesPanel } from '../components/ContactInquiriesPanel';
import { ImageUploadInput } from '../components/ImageUploadInput';
import type { ProfessionalCaseStudy } from '../contexts/PortfolioContext';
import { toast, Toaster } from 'sonner';

interface AdminDashboardProps {
  onLogout: () => void;
}

type Tab = 'services' | 'testimonials' | 'hero' | 'about' | 'cv' | 'caseStudies' | 'contacts';

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<Tab>('caseStudies');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCaseStudy, setEditingCaseStudy] = useState<ProfessionalCaseStudy | null>(null);
  const [showImageUploader, setShowImageUploader] = useState(false);
  
  const {
    services,
    testimonials,
    heroContent,
    aboutSection,
    updateService,
    deleteService,
    addService,
    updateTestimonial,
    deleteTestimonial,
    addTestimonial,
    updateHeroContent,
    updateAboutSection,
    resetToDefaults,
    cvData,
    updateCV,
    professionalCaseStudies,
    updateProfessionalCaseStudy,
    deleteProfessionalCaseStudy,
    addProfessionalCaseStudy,
    refetchData
  } = usePortfolio();

  const handleLogout = () => {
    localStorage.removeItem('admin_logged_in');
    onLogout();
  };

  const handleEdit = (item: any, type: Tab) => {
    setEditingId(item.id);
    setEditForm(item);
  };

  const handleSave = (type: Tab) => {
    if (!editingId) return;
    
    switch (type) {
      case 'services':
        updateService(editingId, editForm);
        break;
      case 'testimonials':
        updateTestimonial(editingId, editForm);
        break;
    }
    
    setEditingId(null);
    setEditForm({});
  };

  const handleDelete = (id: string, type: Tab) => {
    if (!confirm('Устгахдаа итгэлтэй байна уу?')) return;
    
    switch (type) {
      case 'services':
        deleteService(id);
        break;
      case 'testimonials':
        deleteTestimonial(id);
        break;
      case 'caseStudies':
        deleteProfessionalCaseStudy(id);
        break;
    }
  };

  const handleAdd = (type: Tab) => {
    const newId = Date.now().toString();
    
    switch (type) {
      case 'services':
        addService({
          id: newId,
          title: editForm.title || 'New Service',
          description: editForm.description || 'Description',
          image: editForm.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80'
        });
        break;
      case 'testimonials':
        addTestimonial({
          id: newId,
          name: editForm.name || 'Name',
          role: editForm.role || 'Role',
          company: editForm.company || 'Company',
          content: editForm.content || 'Content',
          image: editForm.image || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80'
        });
        break;
      case 'caseStudies':
        // Don't add from simple modal, use the full edit modal instead
        break;
    }
    
    setShowAddModal(false);
    setEditForm({});
  };

  const tabs = [
    { id: 'caseStudies' as Tab, label: 'Төслүүд / Case Studies', icon: Briefcase },
    { id: 'services' as Tab, label: 'Үйлчилгээ', icon: Settings },
    { id: 'testimonials' as Tab, label: 'Сэтгэгдэл', icon: MessageSquare },
    { id: 'hero' as Tab, label: 'Hero хэсэг', icon: Home },
    { id: 'about' as Tab, label: 'About Me', icon: FileText },
    { id: 'cv' as Tab, label: 'CV', icon: FileText },
    { id: 'contacts' as Tab, label: 'Contact Inquiries', icon: Mail }
  ];

  return (
    <div className="min-h-screen bg-black">
      <Toaster position="top-right" richColors />
      
      {/* Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl text-white">Admin Dashboard</h1>
              <p className="text-sm text-gray-400">Portfolio удирдлага</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  if (window.confirm('⚠️ LocalStorage бүрэн цэвэрлэх үү? Энэ нь бүх өгөгдлийг устган.')) {
                    localStorage.clear();
                    window.location.reload();
                  }
                }}
                className="px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 rounded-lg border border-amber-500/20 transition-colors text-sm"
              >
                🗑️ Clear Storage
              </button>
              <button
                onClick={resetToDefaults}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg border border-white/10 transition-colors text-sm"
              >
                Анхны төлөвт буцаах
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg border border-red-500/20 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Гарах
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-purple-400 text-purple-400'
                      : 'border-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {/* Services Tab */}
          {activeTab === 'services' && (
            <motion.div
              key="services"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl text-white">Үйлчилгээ ({services.length})</h2>
                <button
                  onClick={() => {
                    setEditForm({});
                    setShowAddModal(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Үйлчилгээ нэмэх
                </button>
              </div>

              <div className="grid gap-4">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className="bg-white/5 border border-white/10 rounded-lg p-6"
                  >
                    {editingId === service.id ? (
                      <div className="space-y-4">
                        <input
                          type="text"
                          value={editForm.title || ''}
                          onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                          placeholder="Гарчиг"
                        />
                        <textarea
                          value={editForm.description || ''}
                          onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white min-h-[100px]"
                          placeholder="Тайлбар"
                        />
                        <div>
                          <label className="block text-sm text-gray-300 mb-2">Зураг</label>
                          {editForm.image && (
                            <img src={editForm.image} alt="Preview" className="w-full h-32 object-cover rounded-lg mb-2" />
                          )}
                          <button
                            onClick={() => setShowImageUploader(true)}
                            type="button"
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 rounded-lg text-purple-300 transition-colors"
                          >
                            <ImageIcon className="w-4 h-4" />
                            {editForm.image ? 'Зураг солих' : 'Зураг нэмэх'}
                          </button>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSave('services')}
                            className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
                          >
                            <Save className="w-4 h-4" />
                            Хадгалах
                          </button>
                          <button
                            onClick={() => {
                              setEditingId(null);
                              setEditForm({});
                            }}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg"
                          >
                            <X className="w-4 h-4" />
                            Цуцлах
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start justify-between gap-6">
                        <div className="flex-1">
                          <h3 className="text-xl text-white mb-2">{service.title}</h3>
                          <p className="text-gray-400 mb-3">{service.description}</p>
                          {service.image && (
                            <img src={service.image} alt={service.title} className="w-full h-40 object-cover rounded-lg mt-3" />
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(service, 'services')}
                            className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg border border-blue-500/20"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(service.id, 'services')}
                            className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg border border-red-500/20"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Testimonials Tab */}
          {activeTab === 'testimonials' && (
            <motion.div
              key="testimonials"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl text-white">Сэтгэгдэл ({testimonials.length})</h2>
                <button
                  onClick={() => {
                    setEditForm({});
                    setShowAddModal(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Сэтгэгдэл нэмэх
                </button>
              </div>

              <div className="grid gap-4">
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="bg-white/5 border border-white/10 rounded-lg p-6"
                  >
                    {editingId === testimonial.id ? (
                      <div className="space-y-4">
                        <input
                          type="text"
                          value={editForm.name || ''}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                          placeholder="Нэр"
                        />
                        <input
                          type="text"
                          value={editForm.role || ''}
                          onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                          placeholder="Албан тушаал"
                        />
                        <input
                          type="text"
                          value={editForm.company || ''}
                          onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                          placeholder="Компани"
                        />
                        <textarea
                          value={editForm.content || ''}
                          onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white min-h-[100px]"
                          placeholder="Сэтгэгдэл"
                        />
                        <ImageUploadInput
                          currentImage={editForm.image}
                          onImageUploaded={(url) => setEditForm({ ...editForm, image: url })}
                          label="Хэрэглэгчийн зураг"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSave('testimonials')}
                            className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
                          >
                            <Save className="w-4 h-4" />
                            Хадгалах
                          </button>
                          <button
                            onClick={() => {
                              setEditingId(null);
                              setEditForm({});
                            }}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg"
                          >
                            <X className="w-4 h-4" />
                            Цуцлах
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start justify-between">
                        <div className="flex gap-4">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-16 h-16 object-cover rounded-full"
                          />
                          <div>
                            <h3 className="text-lg text-white mb-1">{testimonial.name}</h3>
                            <p className="text-sm text-purple-400 mb-2">
                              {testimonial.role} • {testimonial.company}
                            </p>
                            <p className="text-gray-400">{testimonial.content}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(testimonial, 'testimonials')}
                            className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg border border-blue-500/20"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(testimonial.id, 'testimonials')}
                            className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg border border-red-500/20"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Hero Tab */}
          {activeTab === 'hero' && (
            <motion.div
              key="hero"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <h2 className="text-2xl text-white mb-6">Hero хэсгийн контент</h2>
              
              <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Мэндчилгээ</label>
                    <input
                      type="text"
                      value={heroContent.greeting}
                      onChange={(e) => updateHeroContent({ greeting: e.target.value })}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Гарчиг</label>
                    <input
                      type="text"
                      value={heroContent.title}
                      onChange={(e) => updateHeroContent({ title: e.target.value })}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-2">Дэд гарчиг</label>
                  <input
                    type="text"
                    value={heroContent.subtitle}
                    onChange={(e) => updateHeroContent({ subtitle: e.target.value })}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-2">Тайлбар</label>
                  <textarea
                    value={heroContent.description}
                    onChange={(e) => updateHeroContent({ description: e.target.value })}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white min-h-[100px]"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Үндсэн товч</label>
                    <input
                      type="text"
                      value={heroContent.primaryCTA}
                      onChange={(e) => updateHeroContent({ primaryCTA: e.target.value })}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Хоёрдогч товч</label>
                    <input
                      type="text"
                      value={heroContent.secondaryCTA}
                      onChange={(e) => updateHeroContent({ secondaryCTA: e.target.value })}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                    />
                  </div>
                </div>

                <ImageUploadInput
                  currentImage={heroContent.portraitImage}
                  onImageUploaded={(url) => updateHeroContent({ portraitImage: url })}
                  label="Портрет зураг"
                />

                <div className="border-t border-white/10 pt-6 mt-6">
                  <h3 className="text-lg text-white mb-4">About Me хэсэг</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Гарчиг</label>
                      <input
                        type="text"
                        value={heroContent.aboutMe.title}
                        onChange={(e) => updateHeroContent({ 
                          aboutMe: { ...heroContent.aboutMe, title: e.target.value }
                        })}
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Намтар</label>
                      <textarea
                        value={heroContent.aboutMe.bio}
                        onChange={(e) => updateHeroContent({ 
                          aboutMe: { ...heroContent.aboutMe, bio: e.target.value }
                        })}
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white min-h-[100px]"
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-300 mb-2">Имэйл</label>
                        <input
                          type="email"
                          value={heroContent.aboutMe.email}
                          onChange={(e) => updateHeroContent({ 
                            aboutMe: { ...heroContent.aboutMe, email: e.target.value }
                          })}
                          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-300 mb-2">Байршил</label>
                        <input
                          type="text"
                          value={heroContent.aboutMe.location}
                          onChange={(e) => updateHeroContent({ 
                            aboutMe: { ...heroContent.aboutMe, location: e.target.value }
                          })}
                          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <p className="text-green-400 text-sm">
                    ✓ Өөрчлөлтүүд автоматаар хадгалагдаж байна
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* About Tab */}
          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <h2 className="text-2xl text-white mb-6">About Me хэсэг</h2>
              
              <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-6">
                {/* Flip Card Content */}
                <div className="border-b border-white/10 pb-6">
                  <h3 className="text-lg text-white mb-4">Flip Card контент</h3>
                  
                  {/* Live Preview */}
                  <div className="mb-6 bg-black/40 border border-purple-500/20 rounded-xl p-6">
                    <p className="text-xs text-purple-400 uppercase tracking-wider mb-4">✨ Харагдах байдал (Flip Card-д ингэж харагдана)</p>
                    <div className="space-y-4 max-w-md">
                      <div>
                        <p className="text-xs uppercase tracking-wider text-purple-400 font-medium mb-1">ROLE</p>
                        <p className="text-base text-white">{aboutSection.role || '(хоосон)'}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-purple-400 font-medium mb-1">FOCUS</p>
                        <p className="text-base text-white">{aboutSection.focus || '(хоосон)'}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-purple-400 font-medium mb-1">EXPERIENCE</p>
                        <p className="text-base text-white">{aboutSection.experience || '(хоосон)'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">
                        Албан тушаал / Role
                        <span className="text-xs text-purple-400 ml-2">→ Flip card back ROLE</span>
                      </label>
                      <input
                        type="text"
                        value={aboutSection.role}
                        onChange={(e) => updateAboutSection({ role: e.target.value })}
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                        placeholder="UI/UX Designer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">
                        Туршлага / Experience
                        <span className="text-xs text-purple-400 ml-2">→ Flip card back EXPERIENCE</span>
                      </label>
                      <input
                        type="text"
                        value={aboutSection.experience}
                        onChange={(e) => updateAboutSection({ experience: e.target.value })}
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                        placeholder="8+ years"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm text-gray-300 mb-2">
                      Чиглэл / Focus
                      <span className="text-xs text-purple-400 ml-2">→ Flip card back FOCUS</span>
                    </label>
                    <textarea
                      value={aboutSection.focus}
                      onChange={(e) => updateAboutSection({ focus: e.target.value })}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white min-h-[80px]"
                      placeholder="Digital Product Design"
                    />
                  </div>
                </div>

                {/* Intro Section Content */}
                <div className="border-b border-white/10 pb-6">
                  <h3 className="text-lg text-white mb-4">Intro хэсэг</h3>
                  <p className="text-xs text-gray-400 mb-4">
                    💡 Энэ хэсэг нүүр хуудасны "About Me" intro section-д харагдана
                  </p>
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Гол илэрхийлэл</label>
                    <textarea
                      value={aboutSection.mainStatement}
                      onChange={(e) => updateAboutSection({ mainStatement: e.target.value })}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white min-h-[100px]"
                      placeholder="I design products that transform businesses and delight users"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm text-gray-300 mb-2">Дэмжих текст</label>
                    <textarea
                      value={aboutSection.supportingText}
                      onChange={(e) => updateAboutSection({ supportingText: e.target.value })}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white min-h-[100px]"
                      placeholder="With over a decade of experience..."
                    />
                  </div>
                </div>

                {/* Stats */}
                <div>
                  <h3 className="text-lg text-white mb-4">Статистик</h3>
                  <p className="text-xs text-gray-400 mb-4">
                    💡 Энэ тоонууд intro section-ийн доор 3 баганаар харагдана
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Төслийн тоо</label>
                      <input
                        type="text"
                        value={aboutSection.stats.projectsCount}
                        onChange={(e) => updateAboutSection({ 
                          stats: { ...aboutSection.stats, projectsCount: e.target.value }
                        })}
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white mb-2"
                        placeholder="150+"
                      />
                      <input
                        type="text"
                        value={aboutSection.stats.projectsLabel}
                        onChange={(e) => updateAboutSection({ 
                          stats: { ...aboutSection.stats, projectsLabel: e.target.value }
                        })}
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                        placeholder="Projects Delivered"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Үйлчлүүлэгчдийн тоо</label>
                      <input
                        type="text"
                        value={aboutSection.stats.clientsCount}
                        onChange={(e) => updateAboutSection({ 
                          stats: { ...aboutSection.stats, clientsCount: e.target.value }
                        })}
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white mb-2"
                        placeholder="50+"
                      />
                      <input
                        type="text"
                        value={aboutSection.stats.clientsLabel}
                        onChange={(e) => updateAboutSection({ 
                          stats: { ...aboutSection.stats, clientsLabel: e.target.value }
                        })}
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                        placeholder="Happy Clients"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Жилийн туршлага</label>
                      <input
                        type="text"
                        value={aboutSection.stats.yearsCount}
                        onChange={(e) => updateAboutSection({ 
                          stats: { ...aboutSection.stats, yearsCount: e.target.value }
                        })}
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white mb-2"
                        placeholder="12+"
                      />
                      <input
                        type="text"
                        value={aboutSection.stats.yearsLabel}
                        onChange={(e) => updateAboutSection({ 
                          stats: { ...aboutSection.stats, yearsLabel: e.target.value }
                        })}
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                        placeholder="Years Experience"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <p className="text-green-400 text-sm">
                    ✓ Өөрчлөлтүүд автоматаар хадгалагдаж байна
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* CV Tab */}
          {activeTab === 'cv' && (
            <motion.div
              key="cv"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <h2 className="text-2xl text-white mb-6">CV удирдлага</h2>
              
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                {cvData ? (
                  <div className="space-y-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl text-white mb-2">Одоогийн CV</h3>
                        <p className="text-gray-400 text-sm mb-1">
                          <strong>Файлын нэр:</strong> {cvData.fileName}
                        </p>
                        <p className="text-gray-400 text-sm">
                          <strong>Оруулсан огноо:</strong> {new Date(cvData.uploadDate).toLocaleDateString('mn-MN')}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <a
                          href={cvData.fileData}
                          download={cvData.fileName}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg border border-blue-500/20 transition-colors"
                        >
                          <Download className="w-4 h-4" />
                          Татах
                        </a>
                        <button
                          onClick={() => {
                            if (confirm('CV-г устгахдаа итгэлтэй байна уу?')) {
                              updateCV(null);
                            }
                          }}
                          className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg border border-red-500/20 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          Устгах
                        </button>
                      </div>
                    </div>

                    <div className="border-t border-white/10 pt-6">
                      <h4 className="text-lg text-white mb-4">Шинэ CV оруулах</h4>
                      <p className="text-gray-400 text-sm mb-4">
                        Шинэ CV файл оруулахад одоогийн CV солигдоно
                      </p>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            if (file.size > 10 * 1024 * 1024) {
                              alert('Файлын хэмжээ 10MB-аас бага байх ёстой!');
                              return;
                            }
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              const fileData = event.target?.result as string;
                              updateCV({
                                fileName: file.name,
                                fileData,
                                uploadDate: new Date().toISOString()
                              });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="w-full px-4 py-3 bg-white/5 border-2 border-dashed border-white/20 rounded-lg text-white cursor-pointer hover:border-purple-400 transition-colors"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl text-white mb-2">CV байхгүй байна</h3>
                    <p className="text-gray-400 mb-6">
                      Өөрийн CV файлыг оруулж эхлээрэй
                    </p>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          if (file.size > 10 * 1024 * 1024) {
                            alert('Файлын хэмжээ 10MB-аас бага байх ёстой!');
                            return;
                          }
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            const fileData = event.target?.result as string;
                            updateCV({
                              fileName: file.name,
                              fileData,
                              uploadDate: new Date().toISOString()
                            });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="hidden"
                      id="cv-upload"
                    />
                    <label
                      htmlFor="cv-upload"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg cursor-pointer transition-colors"
                    >
                      <Upload className="w-5 h-5" />
                      CV оруулах
                    </label>
                    <p className="text-gray-500 text-sm mt-4">
                      PDF, DOC, DOCX форматтай файл (Max 10MB)
                    </p>
                  </div>
                )}

                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mt-6">
                  <p className="text-green-400 text-sm">
                    ✓ CV өөрчлөлт автоматаар хадгалагдаж байна
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Case Studies Tab */}
          {activeTab === 'caseStudies' && (
            <motion.div
              key="caseStudies"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl text-white">Case Studies ({professionalCaseStudies.length})</h2>
                <button
                  onClick={() => {
                    setEditingCaseStudy({} as ProfessionalCaseStudy);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Case Study нэмэх
                </button>
              </div>

              <div className="grid gap-4">
                {professionalCaseStudies.map((caseStudy) => (
                  <div
                    key={caseStudy.id}
                    className="bg-white/5 border border-white/10 rounded-lg p-6"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4 flex-1">
                        {caseStudy.heroImage && (
                          <img
                            src={caseStudy.heroImage}
                            alt={caseStudy.projectTitle}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                        )}
                        <div>
                          <h3 className="text-xl text-white mb-1">{caseStudy.projectTitle}</h3>
                          <p className="text-purple-400 text-sm mb-2">{caseStudy.role} • {caseStudy.platform}</p>
                          <p className="text-gray-400 text-sm mb-2">{caseStudy.overview}</p>
                          <p className="text-gray-500 text-xs">{caseStudy.timeline}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingCaseStudy(caseStudy)}
                          className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg border border-blue-500/20"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(caseStudy.id, 'caseStudies')}
                          className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg border border-red-500/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Contact Inquiries Tab */}
          {activeTab === 'contacts' && (
            <motion.div
              key="contacts"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <h2 className="text-2xl text-white mb-6">Contact Inquiries</h2>
              <ContactInquiriesPanel />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Add Modal */}
      <AnimatePresence>
        {showAddModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              onClick={() => setShowAddModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-zinc-900 border border-white/10 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                <h3 className="text-2xl text-white mb-6">
                  {activeTab === 'services' && 'Шинэ үйлчилгээ нэмэх'}
                  {activeTab === 'testimonials' && 'Шинэ сэтгэгдэл нэмэх'}
                </h3>

                <div className="space-y-4">
                  {activeTab === 'services' && (
                    <>
                      <input
                        type="text"
                        placeholder="Үйлчилгээний нэр"
                        value={editForm.title || ''}
                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                      />
                      <textarea
                        placeholder="Тайлбар"
                        value={editForm.description || ''}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white min-h-[100px]"
                      />
                      <div>
                        <label className="block text-sm text-gray-300 mb-2">Зураг</label>
                        {editForm.image && (
                          <img src={editForm.image} alt="Preview" className="w-full h-32 object-cover rounded-lg mb-2" />
                        )}
                        <button
                          onClick={() => setShowImageUploader(true)}
                          type="button"
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 rounded-lg text-purple-300 transition-colors"
                        >
                          <ImageIcon className="w-4 h-4" />
                          {editForm.image ? 'Зураг солих' : 'Зураг нэмэх'}
                        </button>
                      </div>
                    </>
                  )}

                  {activeTab === 'testimonials' && (
                    <>
                      <input
                        type="text"
                        placeholder="Нэр"
                        value={editForm.name || ''}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                      />
                      <input
                        type="text"
                        placeholder="Албан тушаал"
                        value={editForm.role || ''}
                        onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                      />
                      <input
                        type="text"
                        placeholder="Компани"
                        value={editForm.company || ''}
                        onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                      />
                      <textarea
                        placeholder="Сэтгэгдэл"
                        value={editForm.content || ''}
                        onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white min-h-[100px]"
                      />
                      <ImageUploadInput
                        currentImage={editForm.image}
                        onImageUploaded={(url) => setEditForm({ ...editForm, image: url })}
                        label="Хэрэглэгчийн зураг"
                      />
                    </>
                  )}
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => handleAdd(activeTab)}
                    className="flex-1 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-colors"
                  >
                    Нэмэх
                  </button>
                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      setEditForm({});
                    }}
                    className="flex-1 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
                  >
                    Цуцлах
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Case Study Edit Modal */}
      {editingCaseStudy && (
        <CaseStudyEditModal
          isOpen={true}
          onClose={() => setEditingCaseStudy(null)}
          caseStudy={editingCaseStudy}
          onSave={async (updatedCaseStudy) => {
            try {
              console.log('🔄 AdminDashboard: Saving case study...', updatedCaseStudy);
              console.log('🖼️ Hero image in save:', updatedCaseStudy.heroImage);
              console.log('📱 Mobile mockups in save:', updatedCaseStudy.mobileMockups?.length || 0);
              
              if (updatedCaseStudy.id) {
                // Update existing case study
                console.log('📝 Updating existing case study with ID:', updatedCaseStudy.id);
                updateProfessionalCaseStudy(updatedCaseStudy.id, updatedCaseStudy);
                toast.success('✅ Case study амжилттай засагдлаа!', {
                  description: `${updatedCaseStudy.projectTitle || 'Төсөл'} - Бүх өгөгдөл хадгалагдлаа`
                });
              } else {
                // Add new case study
                const newCaseStudy = {
                  ...updatedCaseStudy,
                  id: Date.now().toString()
                } as ProfessionalCaseStudy;
                console.log('➕ Adding new case study with ID:', newCaseStudy.id);
                addProfessionalCaseStudy(newCaseStudy);
                toast.success('✅ Case study амжилттай нэмэгдлээ!');
              }
              
              // Wait for auto-sync to complete (useEffect triggers backend sync)
              console.log('⏳ Waiting for auto-sync to complete...');
              await new Promise(resolve => setTimeout(resolve, 1000));
              
              // Refetch to ensure consistency with backend
              console.log('🔄 Refetching data from backend...');
              await refetchData();
              console.log('✅ Data refetched successfully');
              
              setEditingCaseStudy(null);
            } catch (error) {
              console.error('❌ Error saving case study:', error);
              toast.error('❌ Алдаа гарлаа', {
                description: 'Case study хадгалахад алдаа гарлаа'
              });
            }
          }}
        />
      )}

      {/* Image Uploader */}
      {showImageUploader && (
        <ImageUploader
          currentImage={editForm.image || ''}
          onImageSelect={(imageUrl) => {
            setEditForm({ ...editForm, image: imageUrl });
            setShowImageUploader(false);
          }}
          onClose={() => setShowImageUploader(false)}
        />
      )}
    </div>
  );
}
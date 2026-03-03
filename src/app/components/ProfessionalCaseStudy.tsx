import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { usePortfolio } from '../contexts/PortfolioContext';

interface ProfessionalCaseStudyProps {
  isOpen: boolean;
  onClose: () => void;
  caseStudyId?: string;
}

export function ProfessionalCaseStudy({ isOpen, onClose, caseStudyId }: ProfessionalCaseStudyProps) {
  const { professionalCaseStudies } = usePortfolio();
  
  // Get the case study data
  const caseStudy = caseStudyId 
    ? professionalCaseStudies.find(cs => cs.id === caseStudyId)
    : professionalCaseStudies[0];

  // If no case study found, don't render
  if (!caseStudy) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-4 md:inset-8 bg-[#F5F5F0] rounded-2xl z-[101] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="fixed top-8 right-8 z-10 w-10 h-10 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>

            {/* Content Wrapper - Max width 1440px */}
            <div className="max-w-[1440px] mx-auto px-12 py-16">
              
              {/* Hero Section - Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
                
                {/* LEFT COLUMN - Text Content */}
                <div className="flex flex-col justify-center space-y-8">
                  {/* Project Title */}
                  <div>
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="text-5xl lg:text-6xl font-light text-gray-900 mb-3 leading-tight"
                    >
                      {caseStudy.projectTitle}
                    </motion.h1>
                    
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="text-sm text-gray-500 tracking-wide"
                    >
                      My Role: {caseStudy.role}
                    </motion.p>
                  </div>

                  {/* Project Description Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <h2 className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-4 font-medium">
                      Project Description
                    </h2>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {caseStudy.description}
                    </p>
                  </motion.div>

                  {/* Additional Info */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="flex gap-8 pt-4"
                  >
                    <div>
                      <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">Timeline</p>
                      <p className="text-gray-800 font-medium">{caseStudy.timeline}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">Platform</p>
                      <p className="text-gray-800 font-medium">{caseStudy.platform}</p>
                    </div>
                  </motion.div>
                </div>

                {/* RIGHT COLUMN - Large Mockup Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="relative"
                >
                  <div className="rounded-2xl overflow-hidden shadow-2xl shadow-gray-400/20">
                    <img
                      src={caseStudy.heroImage}
                      alt="Project mockup"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Skills & Deliverables Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6 }}
                className="mb-24"
              >
                <h2 className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-6 font-medium">
                  Skills & Deliverables
                </h2>
                
                <div className="flex flex-wrap gap-3">
                  {caseStudy.skills.map((skill, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-shadow"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Design Process Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6 }}
                className="mb-24"
              >
                <h2 className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-8 font-medium">
                  Design Process
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Research */}
                  <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <span className="text-2xl">🔍</span>
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-3">Research</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {caseStudy.designProcess.research}
                    </p>
                  </div>

                  {/* Design */}
                  <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                      <span className="text-2xl">✏️</span>
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-3">Design</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {caseStudy.designProcess.design}
                    </p>
                  </div>

                  {/* Testing */}
                  <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                      <span className="text-2xl">✅</span>
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-3">Testing</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {caseStudy.designProcess.testing}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Mobile Mockups Preview Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6 }}
                className="mb-24"
              >
                <h2 className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-8 font-medium">
                  Mobile Screens
                </h2>

                {/* Horizontal Scrolling Container */}
                <div className="flex gap-6 overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide">
                  {caseStudy.mobileMockups.map((mockup, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex-shrink-0 w-64 md:w-72"
                    >
                      <div className="rounded-2xl overflow-hidden shadow-xl shadow-gray-400/20 bg-white">
                        <img
                          src={mockup}
                          alt={`Mobile screen ${index + 1}`}
                          className="w-full aspect-[9/16] object-cover"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Key Achievements Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6 }}
                className="mb-16"
              >
                <h2 className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-8 font-medium">
                  Key Achievements
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-8 border border-blue-200/50">
                    <p className="text-4xl font-light text-blue-900 mb-2">{caseStudy.keyAchievements.metric1}</p>
                    <p className="text-gray-700">{caseStudy.keyAchievements.description1}</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl p-8 border border-purple-200/50">
                    <p className="text-4xl font-light text-purple-900 mb-2">{caseStudy.keyAchievements.metric2}</p>
                    <p className="text-gray-700">{caseStudy.keyAchievements.description2}</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl p-8 border border-green-200/50">
                    <p className="text-4xl font-light text-green-900 mb-2">{caseStudy.keyAchievements.metric3}</p>
                    <p className="text-gray-700">{caseStudy.keyAchievements.description3}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
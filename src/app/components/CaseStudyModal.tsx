import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';
import { easing } from '../utils/motion';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CaseStudyData {
  // Header
  title: string;
  productType: string;
  role: string;
  platform: string;
  timeline?: string;
  
  // Problem
  problemStatement: string;
  
  // Goals
  goals: string[];
  
  // Role details
  responsibilities: string[];
  
  // Research
  researchInsights: string;
  
  // User Flow
  userFlow: string[];
  
  // Wireframes
  wireframeImage?: string;
  wireframeDescription: string;
  
  // UI Design
  uiScreens: string[];
  designDecisions: {
    typography: string;
    colors: string;
    hierarchy: string;
  };
  
  // Interactions
  interactions?: string[];
  
  // Results
  results: string;
  
  // Reflection
  reflection: string;
  
  // Visual
  coverImage: string;
}

interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseStudy: CaseStudyData;
  onNext?: () => void;
  onPrev?: () => void;
}

export function CaseStudyModal({ isOpen, onClose, caseStudy, onNext, onPrev }: CaseStudyModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div key="case-study-detail-modal">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[100]"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[101] overflow-y-auto"
          >
            <div className="min-h-screen px-4 md:px-8">
              {/* Close Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                onClick={onClose}
                className="fixed top-8 right-8 z-[102] w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:scale-110"
              >
                <X className="w-5 h-5 text-white" />
              </motion.button>

              {/* Content */}
              <div className="max-w-5xl mx-auto py-20">
                
                {/* 1️⃣ CASE STUDY HEADER */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: easing }}
                  className="mb-24"
                >
                  {/* Cover Image */}
                  <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-12 border border-white/10">
                    <ImageWithFallback
                      src={caseStudy.coverImage}
                      alt={caseStudy.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>

                  {/* Header Info */}
                  <div className="space-y-6">
                    <h1 className="text-5xl md:text-7xl font-light text-white">
                      {caseStudy.title}
                    </h1>
                    
                    <div className="flex flex-wrap gap-6 text-gray-400">
                      <div>
                        <p className="text-xs uppercase tracking-wider text-purple-400 mb-1">Product Type</p>
                        <p className="text-white">{caseStudy.productType}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-purple-400 mb-1">Role</p>
                        <p className="text-white">{caseStudy.role}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-purple-400 mb-1">Platform</p>
                        <p className="text-white">{caseStudy.platform}</p>
                      </div>
                      {caseStudy.timeline && (
                        <div>
                          <p className="text-xs uppercase tracking-wider text-purple-400 mb-1">Timeline</p>
                          <p className="text-white">{caseStudy.timeline}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* 2️⃣ PROBLEM STATEMENT */}
                <motion.section
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, ease: easing }}
                  className="mb-24"
                >
                  <h2 className="text-3xl md:text-4xl font-light text-white mb-6">
                    The Problem
                  </h2>
                  <p className="text-xl text-gray-300 leading-relaxed">
                    {caseStudy.problemStatement}
                  </p>
                </motion.section>

                {/* 3️⃣ GOALS & SUCCESS CRITERIA */}
                <motion.section
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, ease: easing }}
                  className="mb-24"
                >
                  <h2 className="text-3xl md:text-4xl font-light text-white mb-8">
                    Goals & Success Criteria
                  </h2>
                  <div className="space-y-4">
                    {caseStudy.goals.map((goal, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1, ease: easing }}
                        className="flex items-start gap-4"
                      >
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                        <p className="text-lg text-gray-300">{goal}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>

                {/* 4️⃣ YOUR ROLE & RESPONSIBILITIES */}
                <motion.section
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, ease: easing }}
                  className="mb-24"
                >
                  <h2 className="text-3xl md:text-4xl font-light text-white mb-8">
                    My Role & Responsibilities
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {caseStudy.responsibilities.map((responsibility, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.05, ease: easing }}
                        className="px-6 py-3 bg-white/5 border border-white/20 text-white rounded-full backdrop-blur-sm"
                      >
                        {responsibility}
                      </motion.span>
                    ))}
                  </div>
                </motion.section>

                {/* 5️⃣ RESEARCH & INSIGHTS */}
                <motion.section
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, ease: easing }}
                  className="mb-24"
                >
                  <h2 className="text-3xl md:text-4xl font-light text-white mb-6">
                    Research & Insights
                  </h2>
                  <div className="bg-white/5 border border-white/20 rounded-2xl p-8 backdrop-blur-sm">
                    <p className="text-lg text-gray-300 leading-relaxed">
                      {caseStudy.researchInsights}
                    </p>
                  </div>
                </motion.section>

                {/* 6️⃣ USER FLOW */}
                <motion.section
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, ease: easing }}
                  className="mb-24"
                >
                  <h2 className="text-3xl md:text-4xl font-light text-white mb-8">
                    User Flow
                  </h2>
                  <div className="flex flex-wrap items-center gap-4">
                    {caseStudy.userFlow.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1, ease: easing }}
                        className="flex items-center gap-4"
                      >
                        <div className="px-6 py-4 bg-purple-500/20 border border-purple-400/30 rounded-xl backdrop-blur-sm">
                          <p className="text-white">{step}</p>
                        </div>
                        {index < caseStudy.userFlow.length - 1 && (
                          <ArrowRight className="w-5 h-5 text-purple-400 flex-shrink-0" />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.section>

                {/* 7️⃣ WIREFRAMES */}
                <motion.section
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, ease: easing }}
                  className="mb-24"
                >
                  <h2 className="text-3xl md:text-4xl font-light text-white mb-8">
                    Wireframes
                  </h2>
                  {caseStudy.wireframeImage && (
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6 border border-white/10">
                      <ImageWithFallback
                        src={caseStudy.wireframeImage}
                        alt="Wireframes"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <p className="text-lg text-gray-400 leading-relaxed">
                    {caseStudy.wireframeDescription}
                  </p>
                </motion.section>

                {/* 8️⃣ UI DESIGN */}
                <motion.section
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, ease: easing }}
                  className="mb-24"
                >
                  <h2 className="text-3xl md:text-4xl font-light text-white mb-8">
                    UI Design
                  </h2>
                  
                  {/* UI Screens Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {caseStudy.uiScreens.map((screen, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1, ease: easing }}
                        className="relative aspect-[9/16] md:aspect-[4/5] rounded-2xl overflow-hidden border border-white/10"
                      >
                        <ImageWithFallback
                          src={screen}
                          alt={`UI Screen ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    ))}
                  </div>

                  {/* Design Decisions */}
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm uppercase tracking-wider text-purple-400 mb-2">Typography</p>
                      <p className="text-gray-300">{caseStudy.designDecisions.typography}</p>
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-wider text-purple-400 mb-2">Colors</p>
                      <p className="text-gray-300">{caseStudy.designDecisions.colors}</p>
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-wider text-purple-400 mb-2">Visual Hierarchy</p>
                      <p className="text-gray-300">{caseStudy.designDecisions.hierarchy}</p>
                    </div>
                  </div>
                </motion.section>

                {/* 9️⃣ INTERACTION & MOTION */}
                {caseStudy.interactions && caseStudy.interactions.length > 0 && (
                  <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8, ease: easing }}
                    className="mb-24"
                  >
                    <h2 className="text-3xl md:text-4xl font-light text-white mb-8">
                      Interaction & Motion
                    </h2>
                    <div className="space-y-3">
                      {caseStudy.interactions.map((interaction, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1, ease: easing }}
                          className="flex items-center gap-3"
                        >
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full flex-shrink-0" />
                          <p className="text-gray-300">{interaction}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.section>
                )}

                {/* 🔟 RESULTS / IMPACT */}
                <motion.section
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, ease: easing }}
                  className="mb-24"
                >
                  <h2 className="text-3xl md:text-4xl font-light text-white mb-6">
                    Results & Impact
                  </h2>
                  <div className="bg-gradient-to-br from-purple-500/20 to-violet-500/10 border border-purple-400/30 rounded-2xl p-8 backdrop-blur-sm">
                    <p className="text-xl text-white leading-relaxed">
                      {caseStudy.results}
                    </p>
                  </div>
                </motion.section>

                {/* 1️⃣1️⃣ REFLECTION / LEARNINGS */}
                <motion.section
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, ease: easing }}
                  className="mb-24"
                >
                  <h2 className="text-3xl md:text-4xl font-light text-white mb-6">
                    Reflection & Learnings
                  </h2>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    {caseStudy.reflection}
                  </p>
                </motion.section>

                {/* 1️⃣2️⃣ NAVIGATION */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, ease: easing }}
                  className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-12 border-t border-white/10"
                >
                  {onPrev ? (
                    <motion.button
                      onClick={onPrev}
                      whileHover={{ x: -4 }}
                      className="flex items-center gap-3 text-white hover:text-purple-400 transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      <span>Previous Project</span>
                    </motion.button>
                  ) : (
                    <div />
                  )}

                  <motion.button
                    onClick={onClose}
                    whileHover={{ scale: 1.05 }}
                    className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full backdrop-blur-sm transition-all"
                  >
                    Back to All Projects
                  </motion.button>

                  {onNext ? (
                    <motion.button
                      onClick={onNext}
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-3 text-white hover:text-purple-400 transition-colors"
                    >
                      <span>Next Project</span>
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  ) : (
                    <div />
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
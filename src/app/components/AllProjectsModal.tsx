import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { easing } from '../utils/motion';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  caseStudy?: any;
}

interface AllProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  onProjectClick: (index: number) => void;
}

export function AllProjectsModal({ isOpen, onClose, projects, onProjectClick }: AllProjectsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div key="all-projects-modal">
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
            <div className="min-h-screen px-4 md:px-8 py-20">
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
              <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: easing }}
                  className="text-center mb-16"
                >
                  <p className="text-purple-400/70 tracking-[0.15em] uppercase text-xs md:text-sm mb-6">
                    Portfolio
                  </p>
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-tight mb-4">
                    All Projects
                  </h2>
                  <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    A comprehensive collection of my design work across various industries and platforms
                  </p>
                </motion.div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.map((project, index) => (
                    <motion.div
                      key={`${project.title}-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1, ease: easing }}
                      className="group cursor-pointer"
                      onClick={() => {
                        onProjectClick(index);
                        onClose();
                      }}
                    >
                      {/* Project Card */}
                      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-purple-400/50 transition-all duration-500">
                        {/* Image */}
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.6, ease: easing }}
                          >
                            <ImageWithFallback
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover"
                            />
                          </motion.div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                          
                          {/* Category Badge */}
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1.5 bg-purple-500/80 backdrop-blur-md text-white text-xs rounded-full border border-white/20">
                              {project.category}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-4">
                          <h3 className="text-2xl font-light text-white group-hover:text-purple-400 transition-colors duration-300">
                            {project.title}
                          </h3>
                          <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                            {project.description}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2">
                            {project.tags.slice(0, 3).map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="px-3 py-1 text-xs text-white/60 border border-white/20 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Hover CTA */}
                          <div className="pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-purple-400 text-sm flex items-center gap-2">
                              View Case Study
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
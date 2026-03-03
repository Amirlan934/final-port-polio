import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { Edit2, Trash2, Eye } from 'lucide-react';
import { usePortfolio } from '../contexts/PortfolioContext';

const easing = [0.22, 1, 0.36, 1];

export function FeaturedProjects() {
  const { professionalCaseStudies } = usePortfolio();
  const navigate = useNavigate();

  if (professionalCaseStudies.length === 0) {
    return null;
  }

  return (
    <section id="projects" className="relative py-24 px-6 bg-black">
      {/* Dark gradient overlay for consistency */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black z-0" />

      {/* Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-12">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easing }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-purple-400/80 mb-2 tracking-widest text-sm uppercase"
          >
            Portfolio
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easing, delay: 0.08 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl md:text-5xl text-white mb-4"
          >
            Featured Projects ({professionalCaseStudies.length})
          </motion.h2>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-8">
          {professionalCaseStudies.map((caseStudy, index) => (
            <motion.div
              key={caseStudy.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                ease: easing, 
                delay: index * 0.1 
              }}
              viewport={{ once: true, margin: "-50px" }}
              className="group bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 h-full"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Left side - Image (40% on desktop) */}
                <div className="md:w-[40%] flex-shrink-0">
                  {caseStudy.heroImage && (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-white/5"
                    >
                      <img
                        src={caseStudy.heroImage}
                        alt={caseStudy.projectTitle}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  )}
                  
                  {/* Mobile Mockups Preview - First 3 screens */}
                  {caseStudy.mobileMockups && caseStudy.mobileMockups.length > 0 && (
                    <div className="flex gap-3 mt-4">
                      {caseStudy.mobileMockups.slice(0, 3).map((mockup, i) => (
                        <motion.div
                          key={i}
                          whileHover={{ scale: 1.05, y: -4 }}
                          transition={{ duration: 0.2 }}
                          className="w-16 h-20 rounded-lg overflow-hidden bg-white/10 border border-white/20"
                        >
                          <img
                            src={mockup}
                            alt={`Screen ${i + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                      ))}
                      {caseStudy.mobileMockups.length > 3 && (
                        <div className="w-16 h-20 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                          <span className="text-xs text-gray-400 font-medium">+{caseStudy.mobileMockups.length - 3}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Right side - Content (60% on desktop) */}
                <div className="md:w-[60%] flex flex-col justify-between">
                  <div className="space-y-4">
                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl text-white font-semibold group-hover:text-purple-400 transition-colors">
                      {caseStudy.projectTitle}
                    </h3>
                    
                    {/* Role text */}
                    <p className="text-purple-400 text-sm md:text-base font-medium">
                      {caseStudy.role} / {caseStudy.platform}
                    </p>
                    
                    {/* Description - Limited to 2-3 lines */}
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed line-clamp-3">
                      {caseStudy.description}
                    </p>
                    
                    {/* Meta info */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {caseStudy.timeline}
                      </span>
                    </div>

                    {/* Tags - Flexible wrap with gap */}
                    {caseStudy.skills && caseStudy.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {caseStudy.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="px-3 py-1.5 bg-white/5 border border-white/10 text-gray-300 text-xs rounded-full hover:bg-white/10 transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* View Button */}
                  <div className="flex justify-end mt-6">
                    <button
                      onClick={() => navigate(`/case-study/${caseStudy.id}`)}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-lg border border-purple-500/20 transition-all duration-300 hover:scale-105 font-medium"
                    >
                      <Eye className="w-5 h-5" />
                      <span>View Project</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Projects Button - Bottom of Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: easing }}
          className="flex justify-center mt-16"
        >
          <motion.button
            onClick={() => navigate('/all-projects')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-full overflow-hidden transition-all duration-300 shadow-lg shadow-purple-500/50"
          >
            {/* Button glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-purple-500 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -inset-1 bg-purple-500/50 blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            
            <span className="relative z-10 font-semibold text-lg tracking-wide">View All Projects</span>
            <svg 
              className="relative z-10 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
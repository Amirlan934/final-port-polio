import { motion } from 'motion/react';
import { easing } from '../utils/motion';
import { ArrowUpRight, Grid } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { CaseStudyModal } from './CaseStudyModal';
import { AllProjectsModal } from './AllProjectsModal';
import { useState } from 'react';
import { usePortfolio } from '../contexts/PortfolioContext';
import { useNavigate } from 'react-router';

export function FeaturedWork() {
  const { projects, professionalCaseStudies } = usePortfolio();
  const navigate = useNavigate();
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);
  const [allProjectsModalOpen, setAllProjectsModalOpen] = useState(false);

  // Filter featured case studies and sort by order
  const featuredCaseStudies = professionalCaseStudies
    .filter(cs => cs.featured !== false) // Show if featured is not explicitly false
    .sort((a, b) => (a.featuredOrder || 0) - (b.featuredOrder || 0))
    .slice(0, 3);
  
  const featuredProjects = projects.filter(p => p.featured);
  const allProjects = projects;

  // Don't render if no content
  if (featuredCaseStudies.length === 0 && featuredProjects.length === 0) {
    return null;
  }

  const handleNext = () => {
    if (selectedProjectIndex !== null && selectedProjectIndex < featuredProjects.length - 1) {
      setSelectedProjectIndex(selectedProjectIndex + 1);
    }
  };

  const handlePrev = () => {
    if (selectedProjectIndex !== null && selectedProjectIndex > 0) {
      setSelectedProjectIndex(selectedProjectIndex - 1);
    }
  };

  return (
    <section id="work" className="relative py-24 px-6" style={{ position: 'relative' }}>
      {/* Soft gradient */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />
      
      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: easing }}
          className="text-center mb-32"
        >
          <p className="text-purple-400/70 tracking-[0.15em] uppercase text-xs md:text-sm mb-8">
            Selected Work
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-tight">
            Featured projects
          </h2>
        </motion.div>

        {/* Projects - Full screen each */}
        <div className="space-y-48">
          {featuredCaseStudies.map((caseStudy, index) => (
            <motion.div
              key={caseStudy.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-150px' }}
              transition={{ duration: 1, ease: easing }}
              className="group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Project Info */}
                <div className={`lg:col-span-5 space-y-8 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div>
                    <p className="text-purple-400/60 text-sm tracking-wider mb-4">
                      {caseStudy.platform}
                    </p>
                    <h3 className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6">
                      {caseStudy.projectTitle}
                    </h3>
                    <p className="text-xl text-gray-400 leading-relaxed">
                      {caseStudy.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-3">
                    {caseStudy.skills.slice(0, 4).map((skill) => (
                      <span
                        key={skill}
                        className="px-4 py-2 border border-white/20 text-white/70 text-sm rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* CTA - Show only if button is visible */}
                  {caseStudy.featuredButtonVisible !== false && (
                    <motion.button
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-3 text-white hover:text-purple-400 transition-colors duration-300 text-lg"
                      onClick={() => navigate(`/case-study/${caseStudy.id}`)}
                    >
                      {caseStudy.featuredButtonText || 'View Case Study'}
                      <ArrowUpRight className="w-5 h-5" />
                    </motion.button>
                  )}
                </div>

                {/* Project Image */}
                <div className={`lg:col-span-7 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.6, ease: easing }}
                    className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-white/5 border border-white/10 cursor-pointer"
                    onClick={() => navigate(`/case-study/${caseStudy.id}`)}
                  >
                    <ImageWithFallback
                      src={caseStudy.heroImage}
                      alt={caseStudy.projectTitle}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: easing }}
          className="flex justify-center mt-32"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center gap-3 px-10 py-5 bg-purple-500 hover:bg-purple-600 text-white rounded-full overflow-hidden transition-all duration-300"
            onClick={() => setAllProjectsModalOpen(true)}
          >
            {/* Button glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-purple-500 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -inset-1 bg-purple-500/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <Grid className="relative z-10 w-5 h-5" />
            <span className="relative z-10 font-medium">View All Projects</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Case Study Modal */}
      {selectedProjectIndex !== null && (
        <CaseStudyModal
          isOpen={true}
          onClose={() => setSelectedProjectIndex(null)}
          caseStudy={featuredProjects[selectedProjectIndex].caseStudy}
          onNext={selectedProjectIndex < featuredProjects.length - 1 ? handleNext : undefined}
          onPrev={selectedProjectIndex > 0 ? handlePrev : undefined}
        />
      )}

      {/* All Projects Modal */}
      {allProjectsModalOpen && (
        <AllProjectsModal
          isOpen={true}
          onClose={() => setAllProjectsModalOpen(false)}
          projects={allProjects}
          onProjectClick={(index) => {
            setSelectedProjectIndex(index);
            setAllProjectsModalOpen(false);
          }}
        />
      )}
    </section>
  );
}
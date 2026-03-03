import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, User, Monitor, CheckCircle, ExternalLink } from 'lucide-react';
import { usePortfolio } from '../contexts/PortfolioContext';
import { ProfessionalCaseStudy } from '../contexts/PortfolioContext';

export function CaseStudyDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { professionalCaseStudies } = usePortfolio();
  const [caseStudy, setCaseStudy] = useState<ProfessionalCaseStudy | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading and fetch case study by ID
    setLoading(true);
    
    if (id) {
      const foundCaseStudy = professionalCaseStudies.find(cs => cs.id === id);
      
      if (foundCaseStudy) {
        setCaseStudy(foundCaseStudy);
      } else {
        setCaseStudy(null);
      }
    }
    
    setLoading(false);
  }, [id, professionalCaseStudies]);

  // Error state - Case study not found
  if (!loading && !caseStudy) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl text-white mb-4">404</h1>
          <p className="text-xl text-gray-400 mb-8">Case Study not found</p>
          <button
            onClick={() => navigate('/all-projects')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
        </motion.div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-white text-xl"
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  if (!caseStudy) return null;

  return (
    <div className="min-h-screen bg-black">
      {/* Back Button */}
      <div className="fixed top-8 left-8 z-50">
        <motion.button
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </motion.button>
      </div>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[60vh] md:h-[70vh] overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src={caseStudy.heroImage}
            alt={caseStudy.projectTitle}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        </div>

        <div className="relative h-full max-w-7xl mx-auto px-6 flex items-end pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight">
              {caseStudy.projectTitle}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl">
              {caseStudy.description}
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2 text-gray-300">
                <User className="w-5 h-5 text-purple-400" />
                <span>{caseStudy.role}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Calendar className="w-5 h-5 text-purple-400" />
                <span>{caseStudy.timeline}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Monitor className="w-5 h-5 text-purple-400" />
                <span>{caseStudy.platform}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Skills & Deliverables */}
        {caseStudy.skills && caseStudy.skills.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-3xl md:text-4xl text-white mb-8">Skills & Deliverables</h2>
            <div className="flex flex-wrap gap-3">
              {caseStudy.skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-lg text-purple-300"
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Design Process */}
        {caseStudy.designProcess && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-3xl md:text-4xl text-white mb-12">Design Process</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Research */}
              {caseStudy.designProcess.research && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6"
                >
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl">🔍</span>
                  </div>
                  <h3 className="text-xl text-white mb-3">Research</h3>
                  <p className="text-gray-400">{caseStudy.designProcess.research}</p>
                </motion.div>
              )}

              {/* Design */}
              {caseStudy.designProcess.design && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6"
                >
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl">🎨</span>
                  </div>
                  <h3 className="text-xl text-white mb-3">Design</h3>
                  <p className="text-gray-400">{caseStudy.designProcess.design}</p>
                </motion.div>
              )}

              {/* Testing */}
              {caseStudy.designProcess.testing && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6"
                >
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl">✅</span>
                  </div>
                  <h3 className="text-xl text-white mb-3">Testing</h3>
                  <p className="text-gray-400">{caseStudy.designProcess.testing}</p>
                </motion.div>
              )}
            </div>
          </motion.section>
        )}

        {/* Mobile Mockups */}
        {caseStudy.mobileMockups && caseStudy.mobileMockups.length > 0 && (
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-32"
          >
            <h2 className="text-3xl md:text-4xl text-white mb-16 text-center">Mobile Mockups</h2>
            
            {/* Premium Presentation Showcase */}
            <div className="w-full bg-black">
              <div className="max-w-[1400px] mx-auto space-y-12 md:space-y-20">
                
                {caseStudy.mobileMockups.map((mockupImage, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="relative group"
                  >
                    {/* Adaptive background based on index */}
                    <div className={`relative overflow-hidden rounded-3xl ${
                      index === 0 
                        ? '' // First image - no background
                        : index % 2 === 1
                        ? 'bg-gradient-to-br from-gray-900 to-gray-800 p-8 md:p-12' // Dark background for odd indices
                        : 'bg-gradient-to-br from-gray-100 to-gray-200 p-8 md:p-12' // Light background for even indices
                    }`}>
                      <img
                        src={mockupImage}
                        alt={`Showcase ${index + 1}`}
                        className={`w-full h-auto ${index === 0 ? 'object-cover' : 'object-contain'}`}
                      />
                      
                      {/* Gradient overlay for depth */}
                      <div className={`absolute inset-0 ${
                        index === 0 
                          ? 'bg-gradient-to-t from-black/40 via-transparent to-transparent'
                          : index % 2 === 1
                          ? 'bg-gradient-to-br from-purple-500/5 to-transparent'
                          : 'bg-white/5'
                      } opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    </div>
                    
                    {/* Glow effect on hover */}
                    {index === 0 && (
                      <div className="absolute inset-0 -z-10 blur-3xl bg-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    )}
                    
                    {/* Shadow effect */}
                    <div className={`absolute -bottom-6 left-1/2 -translate-x-1/2 ${
                      index === 0 ? 'w-3/4 h-8' : index % 2 === 1 ? 'w-3/4 h-8' : 'w-2/3 h-10'
                    } ${
                      index % 2 === 0 && index !== 0 ? 'bg-black/20' : 'bg-purple-500/30'
                    } blur-3xl rounded-full`} />
                  </motion.div>
                ))}

              </div>
            </div>
          </motion.section>
        )}

        {/* Key Achievements */}
        {caseStudy.keyAchievements && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-3xl md:text-4xl text-white mb-12">Key Achievements</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Metric 1 */}
              {caseStudy.keyAchievements.metric1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="bg-gradient-to-br from-purple-500/10 to-violet-500/10 border border-purple-500/20 rounded-2xl p-8 text-center"
                >
                  <div className="text-5xl md:text-6xl text-purple-400 font-bold mb-3">
                    {caseStudy.keyAchievements.metric1}
                  </div>
                  <p className="text-gray-300">{caseStudy.keyAchievements.description1}</p>
                </motion.div>
              )}

              {/* Metric 2 */}
              {caseStudy.keyAchievements.metric2 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-purple-500/10 to-violet-500/10 border border-purple-500/20 rounded-2xl p-8 text-center"
                >
                  <div className="text-5xl md:text-6xl text-purple-400 font-bold mb-3">
                    {caseStudy.keyAchievements.metric2}
                  </div>
                  <p className="text-gray-300">{caseStudy.keyAchievements.description2}</p>
                </motion.div>
              )}

              {/* Metric 3 */}
              {caseStudy.keyAchievements.metric3 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-br from-purple-500/10 to-violet-500/10 border border-purple-500/20 rounded-2xl p-8 text-center"
                >
                  <div className="text-5xl md:text-6xl text-purple-400 font-bold mb-3">
                    {caseStudy.keyAchievements.metric3}
                  </div>
                  <p className="text-gray-300">{caseStudy.keyAchievements.description3}</p>
                </motion.div>
              )}
            </div>
          </motion.section>
        )}

        {/* Back to Portfolio CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center py-16"
        >
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Portfolio
          </button>
        </motion.div>
      </div>
    </div>
  );
}
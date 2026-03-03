import { motion } from 'motion/react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { usePortfolio } from '../contexts/PortfolioContext';
import { ParallaxBackground } from '../components/ParallaxBackground';
import { SparkleParticles } from '../components/SparkleParticles';
import { PortfolioNav } from '../components/PortfolioNav';
import { easing } from '../utils/motion';

// Using a high-quality dark abstract background from Unsplash
// In production, replace this URL with your own image in /src/assets/images/background.jpg
// Then import it with: import backgroundImage from '../../assets/images/background.jpg';
const backgroundImage = 'https://images.unsplash.com/photo-1761044590816-5180b35e99eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwYWJzdHJhY3QlMjBncmFkaWVudCUyMGJhY2tncm91bmQlMjBwcmVtaXVtfGVufDF8fHx8MTc3MjUwNjI3NXww&ixlib=rb-4.1.0&q=80&w=1080';

const PROJECTS_PER_PAGE = 9; // 3x3 grid

export function AllProjectsPage() {
  const { professionalCaseStudies } = usePortfolio();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const totalPages = Math.ceil(professionalCaseStudies.length / PROJECTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
  const endIndex = startIndex + PROJECTS_PER_PAGE;
  const currentProjects = professionalCaseStudies.slice(startIndex, endIndex);

  const handleProjectClick = (id: string) => {
    navigate(`/case-study/${id}`);
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <ParallaxBackground imageUrl={backgroundImage} />
      <SparkleParticles />
      
      <PortfolioNav />
      
      <main className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easing }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Бүх <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">Төслүүд</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              Миний бүх ажлын цуглуулга - {professionalCaseStudies.length} төсөл
            </p>
          </motion.div>

          {/* Projects Grid */}
          {currentProjects.length > 0 ? (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
              >
                {currentProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1, ease: easing }}
                    onClick={() => handleProjectClick(project.id)}
                    className="group relative cursor-pointer"
                  >
                    {/* Project Card */}
                    <div className="relative h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-purple-900/20 to-black border border-white/10 hover:border-purple-500/50 transition-all duration-500">
                      {/* Image */}
                      <div className="absolute inset-0">
                        <img
                          src={project.heroImage}
                          alt={project.projectTitle}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                      </div>

                      {/* Content */}
                      <div className="absolute inset-0 p-6 flex flex-col justify-end">
                        {/* Skills tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.skills?.slice(0, 3).map((skill, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 rounded-full text-purple-300 text-xs font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">
                          {project.projectTitle}
                        </h3>

                        {/* Role & Platform */}
                        <p className="text-gray-400 text-sm mb-1">
                          {project.role} • {project.platform}
                        </p>

                        {/* Timeline */}
                        <p className="text-gray-500 text-xs">
                          {project.timeline}
                        </p>

                        {/* Hover arrow */}
                        <div className="absolute top-6 right-6 w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                          <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </div>
                      </div>

                      {/* Purple glow on hover */}
                      <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Pagination */}
              {totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex justify-center items-center gap-2"
                >
                  {/* Previous button */}
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-purple-500/20 hover:border-purple-500/50 transition-all duration-300"
                  >
                    Өмнөх
                  </button>

                  {/* Page numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg border transition-all duration-300 ${
                        currentPage === page
                          ? 'bg-purple-500 border-purple-500 text-white'
                          : 'bg-white/5 border-white/10 text-gray-400 hover:bg-purple-500/20 hover:border-purple-500/50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  {/* Next button */}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-purple-500/20 hover:border-purple-500/50 transition-all duration-300"
                  >
                    Дараах
                  </button>
                </motion.div>
              )}
            </>
          ) : (
            // Empty state
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
                <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Төсөл байхгүй байна</h3>
              <p className="text-gray-400 mb-6">Админ хэсгээс шинэ төсөл нэмнэ үү</p>
              <button
                onClick={() => navigate('/admin')}
                className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors duration-300"
              >
                Админ хэсэг рүү очих
              </button>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
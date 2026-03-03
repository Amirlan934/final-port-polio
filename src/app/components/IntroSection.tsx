import { motion } from 'motion/react';
import { easing } from '../utils/motion';
import { usePortfolio } from '../contexts/PortfolioContext';

export function IntroSection() {
  const { aboutSection } = usePortfolio();

  // Fallback content if admin data is empty
  const mainStatement = aboutSection.mainStatement || "I craft meaningful digital experiences that users love.";
  const supportingText = aboutSection.supportingText || "With a deep passion for user-centered design, I transform complex problems into elegant, intuitive solutions. My approach combines research, creativity, and technical expertise to deliver products that not only look beautiful but also solve real user needs.";
  
  const projectsCount = aboutSection.stats.projectsCount || "150+";
  const projectsLabel = aboutSection.stats.projectsLabel || "Projects Completed";
  const clientsCount = aboutSection.stats.clientsCount || "50+";
  const clientsLabel = aboutSection.stats.clientsLabel || "Happy Clients";
  const yearsCount = aboutSection.stats.yearsCount || "8+";
  const yearsLabel = aboutSection.stats.yearsLabel || "Years Experience";

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-24" style={{ position: 'relative' }}>
      {/* Soft gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/30 backdrop-blur-[1px]" />
      
      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: easing }}
          className="space-y-16 text-center"
        >
          {/* Main Statement */}
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-light text-white leading-tight max-w-5xl mx-auto">
            {mainStatement}
          </h2>

          {/* Supporting Text */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: easing }}
            className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed max-w-4xl mx-auto"
          >
            {supportingText}
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5, ease: easing }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto pt-8"
          >
            <div>
              <div className="text-5xl md:text-6xl font-light text-white mb-2">{projectsCount}</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">{projectsLabel}</div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-light text-white mb-2">{clientsCount}</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">{clientsLabel}</div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-light text-white mb-2">{yearsCount}</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">{yearsLabel}</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
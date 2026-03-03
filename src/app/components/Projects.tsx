import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ProfessionalCaseStudy } from './ProfessionalCaseStudy';

const easing = [0.22, 1, 0.36, 1];

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState(false);
  
  // Track scroll progress using window scroll
  const { scrollYProgress } = useScroll({
    offset: ["start end", "end start"],
    layoutEffect: false,
  });

  // Create smooth spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Far background layer - slowest parallax (30% speed)
  const farBackgroundY = useTransform(smoothProgress, [0, 1], ['0%', '30%']);
  
  // Near background layer - medium parallax (45% speed)
  const nearBackgroundY = useTransform(smoothProgress, [0, 1], ['0%', '45%']);
  
  // Scale effect: subtle zoom from 1 to 1.06
  const backgroundScale = useTransform(smoothProgress, [0, 1], [1, 1.06]);

  return (
    <section 
      ref={containerRef}
      id="work"
      className="scroll-container min-h-screen py-32 px-6"
    >
      {/* Far Background Layer - Slowest Parallax (30%) */}
      <motion.div
        style={{
          y: farBackgroundY as MotionValue<string>,
          scale: backgroundScale,
        }}
        className="absolute inset-0 w-full h-[130%] -top-[15%] parallax-container"
      >
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1653104877761-181b3977808e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwYWJzdHJhY3QlMjB0ZXh0dXJlfGVufDF8fHx8MTc2Njg3MTc1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Background texture"
          className="w-full h-full object-cover opacity-40"
        />
      </motion.div>

      {/* Near Background Layer - Medium Parallax (45%) */}
      <motion.div
        style={{
          y: nearBackgroundY as MotionValue<string>,
        }}
        className="absolute inset-0 w-full h-[130%] -top-[15%] parallax-container"
      >
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1713714461174-04a8515e5423?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwZ3JhZGllbnQlMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc2Njc1NDM1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Background gradient"
          className="w-full h-full object-cover opacity-30"
        />
      </motion.div>

      {/* Dark gradient overlay for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black z-10" />

      {/* Content Layer */}
      <div className="relative z-20 max-w-7xl mx-auto px-6">
        {/* Section header with stagger */}
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easing }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-white/60 mb-2 tracking-widest text-sm"
          >
            SELECTED WORK
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easing, delay: 0.08 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-5xl md:text-6xl"
          >
            Featured Projects
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                ease: easing, 
                delay: index * 0.1 
              }}
              viewport={{ once: true, margin: "-50px" }}
              onClick={() => setIsCaseStudyOpen(true)}
              className="group cursor-pointer"
            >
              {/* Image container with hover lift and shadow */}
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3, ease: easing }}
                className="relative overflow-hidden bg-zinc-900 aspect-[4/3] mb-6 shadow-lg hover:shadow-2xl hover:shadow-purple-500/10 transition-shadow duration-300"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6, ease: easing }}
                  className="w-full h-full"
                >
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                
                {/* Overlay with metadata - gentle fade and slide */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3, ease: easing }}
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center"
                >
                  <motion.div
                    initial={{ y: 8, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, ease: easing, delay: 0.05 }}
                    className="flex items-center gap-2 text-white"
                  >
                    <span>View Project</span>
                    <ArrowRight size={20} />
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Project details with stagger */}
              <div>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.4, ease: easing, delay: 0.05 }}
                  viewport={{ once: true }}
                  className="text-white/50 text-sm mb-2"
                >
                  {project.category}
                </motion.p>
                <motion.h3
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.4, ease: easing, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="text-2xl mb-3 group-hover:text-purple-400 transition-colors duration-300"
                >
                  {project.title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.4, ease: easing, delay: 0.15 }}
                  viewport={{ once: true }}
                  className="text-white/70 mb-4"
                >
                  {project.description}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.4, ease: easing, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="flex flex-wrap gap-2"
                >
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/10 text-white/80 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Professional Case Study Modal */}
      <ProfessionalCaseStudy 
        isOpen={isCaseStudyOpen} 
        onClose={() => setIsCaseStudyOpen(false)} 
      />
    </section>
  );
}

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    category: 'Web Development',
    description: 'A modern, fully responsive e-commerce platform with advanced filtering and seamless checkout experience.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjB3ZWJzaXRlfGVufDF8fHx8MTcyNzM2Njk2NHww&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['React', 'TypeScript', 'Stripe']
  },
  {
    id: 2,
    title: 'Brand Identity System',
    category: 'UI/UX Design',
    description: 'Complete brand identity and design system for a tech startup, including logo, color palette, and components.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMGRlc2lnbnxlbnwxfHx8fDE3MjczNjY5NzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Figma', 'Branding', 'Design Systems']
  },
  {
    id: 3,
    title: 'SaaS Dashboard',
    category: 'Product Design',
    description: 'Intuitive analytics dashboard for a B2B SaaS platform with real-time data visualization.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXNoYm9hcmQlMjBhbmFseXRpY3N8ZW58MXx8fHwxNzI3MzY2OTgyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Dashboard', 'Analytics', 'Next.js']
  },
  {
    id: 4,
    title: 'Mobile Banking App',
    category: 'Mobile Design',
    description: 'User-friendly mobile banking app with biometric authentication and instant transfers.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHB8ZW58MXx8fHwxNzI3MzY2OTkxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['React Native', 'FinTech', 'Mobile']
  }
];
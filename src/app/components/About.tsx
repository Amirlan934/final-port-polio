import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'motion/react';

const easing = [0.22, 1, 0.36, 1];

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  
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

  // Parallax effect for background
  const backgroundY = useTransform(smoothProgress, [0, 1], ['0%', '25%']);
  const backgroundOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.4, 0.5, 0.3]);

  return (
    <section 
      ref={containerRef}
      id="about"
      className="scroll-container min-h-screen py-32 px-6"
    >
      {/* Parallax Background Layer */}
      <motion.div
        style={{
          y: backgroundY as MotionValue<string>,
          opacity: backgroundOpacity,
        }}
        className="absolute inset-0 w-full h-[120%] -top-[10%] parallax-container"
      >
        <div className="w-full h-full bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
        {/* Additional dark overlay */}
        <div className="absolute inset-0 bg-black/80" />
      </motion.div>

      {/* Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easing }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-white/60 mb-2 tracking-widest text-sm"
            >
              ABOUT ME
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easing, delay: 0.08 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-5xl md:text-6xl mb-8"
            >
              Who I Am
            </motion.h2>
            
            <div className="space-y-6 text-white/70 text-lg">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: easing, delay: 0.12 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                I'm a creative developer passionate about building beautiful, 
                functional digital experiences. With a background in both design 
                and development, I bridge the gap between aesthetics and functionality.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: easing, delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                Over the past 5+ years, I've worked with startups and established 
                companies to bring their digital visions to life. I specialize in 
                creating interactive web applications that not only look great but 
                deliver exceptional user experiences.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: easing, delay: 0.28 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                When I'm not coding, you can find me exploring new design trends, 
                contributing to open-source projects, or experimenting with the 
                latest web technologies.
              </motion.p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easing, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="bg-zinc-900 p-12 rounded-lg">
              <h3 className="text-2xl mb-8">Skills & Expertise</h3>
              
              <div className="grid grid-cols-2 gap-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: easing, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.02, y: -2 }}
                      transition={{ duration: 0.2, ease: easing }}
                      className="py-4 px-6 bg-white/5 hover:bg-white/10 transition-colors duration-300 rounded border border-white/10 hover:border-purple-500/50"
                    >
                      <p className="text-white/90 group-hover:text-purple-400 transition-colors duration-300">
                        {skill}
                      </p>
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: easing, delay: 0.4 }}
                viewport={{ once: true }}
                className="mt-12 pt-8 border-t border-white/10"
              >
                <div className="grid grid-cols-3 gap-8 text-center">
                  <div>
                    <p className="text-4xl mb-2 text-purple-400">5+</p>
                    <p className="text-white/60 text-sm">Years Experience</p>
                  </div>
                  <div>
                    <p className="text-4xl mb-2 text-purple-400">50+</p>
                    <p className="text-white/60 text-sm">Projects Completed</p>
                  </div>
                  <div>
                    <p className="text-4xl mb-2 text-purple-400">30+</p>
                    <p className="text-white/60 text-sm">Happy Clients</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const skills = [
  'React & Next.js',
  'TypeScript',
  'Tailwind CSS',
  'Motion/Framer',
  'Node.js',
  'GraphQL',
  'UI/UX Design',
  'Responsive Design'
];
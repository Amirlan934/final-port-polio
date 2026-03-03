import { motion, useScroll, useTransform } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { easing } from '../utils/motion';
import { usePortfolio } from '../contexts/PortfolioContext';

// Using a modern mobile app design screen from Unsplash
// In production, replace this URL with your own image in /src/assets/images/example-project.jpg
// Then import it with: import exampleImage from '../../assets/images/example-project.jpg';
const exampleImage = 'https://images.unsplash.com/photo-1717323454555-f053c31ff4b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtb2JpbGUlMjBhcHAlMjBkZXNpZ24lMjBzY3JlZW58ZW58MXx8fHwxNzcyNTA2Mjc1fDA&ixlib=rb-4.1.0&q=80&w=1080';

export function Services() {
  const { services } = usePortfolio();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    offset: ['start start', 'end end'],
    layoutEffect: false,
  });

  // Update active index based on scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const index = Math.min(
        Math.floor(latest * services.length),
        services.length - 1
      );
      setActiveIndex(index);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <section 
      ref={containerRef} 
      id="services"
      className="scroll-container min-h-screen isolate"
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        {/* Grid Layout */}
        <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Service Text List */}
          <div className="space-y-2">
            {/* Section Label */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easing }}
              className="text-purple-400 tracking-[0.3em] uppercase text-xs font-medium mb-8"
            >
              Services Overview
            </motion.p>

            {/* Service Items */}
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: easing }}
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
                className="py-6 border-b border-white/10 cursor-pointer group"
              >
                {/* Service Title */}
                <motion.h3
                  animate={{
                    opacity: activeIndex === index ? 1 : 0.4,
                    x: activeIndex === index ? 0 : -8,
                  }}
                  transition={{ duration: 0.5, ease: easing }}
                  className={`text-2xl md:text-3xl lg:text-4xl font-bold transition-colors duration-500 ${
                    activeIndex === index
                      ? 'text-white'
                      : 'text-gray-500'
                  }`}
                >
                  {service.title}
                </motion.h3>

                {/* Service Description - Only show for active */}
                <motion.div
                  initial={false}
                  animate={{
                    height: activeIndex === index ? 'auto' : 0,
                    opacity: activeIndex === index ? 1 : 0,
                    y: activeIndex === index ? 0 : -10,
                  }}
                  transition={{ duration: 0.5, ease: easing }}
                  className="overflow-hidden"
                >
                  <p className="text-gray-400 mt-4 leading-relaxed max-w-lg">
                    {service.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* RIGHT: Image Area */}
          <div className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden">
            {/* Image Container */}
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={false}
                animate={{
                  opacity: activeIndex === index ? 1 : 0,
                  y: activeIndex === index ? 0 : 20,
                  scale: activeIndex === index ? 1 : 1.05,
                }}
                transition={{ duration: 0.7, ease: easing }}
                className="absolute inset-0"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover rounded-2xl"
                />
                
                {/* Dark gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-2xl" />
                
                {/* Purple accent glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent opacity-60 mix-blend-overlay rounded-2xl" />
              </motion.div>
            ))}

            {/* Service Number Indicator */}
            <div className="absolute bottom-8 right-8 z-10">
              <motion.div
                animate={{
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: easing }}
                className="flex items-center gap-3 backdrop-blur-xl bg-white/10 border border-white/20 rounded-full px-6 py-3"
              >
                <span className="text-white text-xl font-bold">
                  {String(activeIndex + 1).padStart(2, '0')}
                </span>
                <span className="text-white/60 text-sm">/</span>
                <span className="text-white/60 text-sm">
                  {String(services.length).padStart(2, '0')}
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
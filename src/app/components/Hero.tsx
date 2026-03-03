import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const easing = [0.22, 1, 0.36, 1];

/**
 * Hero Component with Cinematic Parallax Scrolling
 * 
 * Animation architecture:
 * - Uses useScroll to track section's scroll progress (0 → 1)
 * - useSpring smooths the raw scroll value with physics
 * - useTransform maps smooth scroll to parallax Y positions
 * - Multiple background layers with different parallax speeds create depth
 * 
 * Parallax speed reference:
 * - Background layer: -150px (slowest, creates depth)
 * - Middle layer: -50px (medium speed)
 * - Foreground content: 0px (fixed speed, scrolls normally)
 * 
 * Result: As you scroll, background moves slower than foreground,
 * creating an immersive 3D parallax effect
 */

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress using window scroll instead of container
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end start"],
    layoutEffect: false,
  });

  // Create smooth spring physics for the scroll value
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
  
  // Fade out effect for content as user scrolls
  const contentOpacity = useTransform(smoothProgress, [0, 0.7, 1], [1, 0.6, 0]);

  const scrollToWork = () => {
    const element = document.getElementById('work');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={containerRef}
      className="scroll-container min-h-screen flex items-center justify-center px-6 overflow-hidden"
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

      {/* Content Layer - Normal scroll speed */}
      <motion.div 
        style={{ opacity: contentOpacity }}
        className="relative z-20 h-full flex items-center justify-center px-6"
      >
        <div className="max-w-6xl mx-auto text-center space-y-8">
          {/* Pre-headline - subtle entrance */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easing }}
            className="text-white/60 tracking-widest text-sm"
          >
            CREATIVE DESIGNER & DEVELOPER
          </motion.p>

          {/* Main headline - powerful entrance */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: easing }}
            className="text-6xl md:text-8xl lg:text-9xl leading-none"
          >
            Crafting Digital
            <br />
            <span className="text-purple-400">Experiences</span>
          </motion.h1>

          {/* Subheadline - delayed entrance */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: easing }}
            className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto"
          >
            Transforming ideas into immersive web experiences through thoughtful design and clean code
          </motion.p>

          {/* CTA Button - final entrance */}
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: easing }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={scrollToWork}
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black hover:bg-purple-400 hover:text-white transition-all duration-300 group mt-8"
          >
            <span>View My Work</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.button>
        </div>
      </motion.div>

      {/* Scroll indicator - pulses to encourage scrolling */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: easing }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: easing }}
            className="w-1 h-2 bg-white/60 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
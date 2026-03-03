import { motion } from 'motion/react';
import { useState } from 'react';
import { easing } from '../utils/motion';

interface FlipCardProps {
  frontImage: string;
  backContent: {
    role: string;
    focus: string;
    experience: string;
  };
}

export function FlipCard({ frontImage, backContent }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Use placeholder if no image provided
  const displayImage = frontImage || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80';

  return (
    <div className="relative w-full max-w-xl perspective-container">
      {/* Multi-layer purple glow behind portrait */}
      <motion.div
        className="absolute -inset-20 rounded-full bg-purple-500/30 blur-[120px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <motion.div
        className="absolute -inset-16 rounded-full bg-violet-500/40 blur-[100px]"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* 3D Flip Card Container */}
      <motion.div
        className="relative z-10 flip-card-inner cursor-pointer"
        onHoverStart={() => setIsFlipped(true)}
        onHoverEnd={() => setIsFlipped(false)}
        onClick={() => setIsFlipped(!isFlipped)}
        style={{ transformStyle: 'preserve-3d' }}
        animate={{
          rotateY: isFlipped ? 180 : 0,
        }}
        transition={{
          duration: 0.6,
          ease: easing,
        }}
      >
        {/* FRONT SIDE - Portrait Image */}
        <div
          className="flip-card-front"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <img
            src={displayImage}
            alt="UI/UX Designer Portfolio"
            className="w-full h-auto object-cover rounded-3xl shadow-2xl shadow-purple-500/50"
          />
          
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-transparent rounded-3xl pointer-events-none" />
        </div>

        {/* BACK SIDE - About Me Content */}
        <div
          className="flip-card-back absolute inset-0"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="w-full h-full backdrop-blur-2xl bg-black/80 border border-white/20 rounded-3xl p-10 md:p-14 lg:p-16 flex flex-col justify-center shadow-2xl shadow-purple-500/50">
            {/* Glassmorphism overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-violet-500/10 to-transparent rounded-3xl" />
            
            {/* Content */}
            <div className="relative z-10 space-y-6 max-w-[600px] mx-auto">
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isFlipped ? 1 : 0, y: isFlipped ? 0 : 10 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="text-3xl md:text-4xl font-bold text-white mb-8"
              >
                About Me
              </motion.h3>

              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: isFlipped ? 1 : 0, y: isFlipped ? 0 : 10 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="space-y-2"
                >
                  <p className="text-xs md:text-sm uppercase tracking-widest text-purple-400 font-medium">Role</p>
                  <p className="text-base md:text-lg text-white leading-relaxed">{backContent.role}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: isFlipped ? 1 : 0, y: isFlipped ? 0 : 10 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="space-y-2"
                >
                  <p className="text-xs md:text-sm uppercase tracking-widest text-purple-400 font-medium">Focus</p>
                  <p className="text-base md:text-lg text-white leading-relaxed">{backContent.focus}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: isFlipped ? 1 : 0, y: isFlipped ? 0 : 10 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  className="space-y-2"
                >
                  <p className="text-xs md:text-sm uppercase tracking-widest text-purple-400 font-medium">Experience</p>
                  <p className="text-base md:text-lg text-white leading-relaxed">{backContent.experience}</p>
                </motion.div>
              </div>

              {/* Subtle bottom glow */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isFlipped ? 1 : 0 }}
                transition={{ duration: 0.4, delay: 0.7 }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating particles around portrait */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-2 h-2 bg-purple-400 rounded-full blur-sm pointer-events-none"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.5,
            ease: 'easeInOut',
          }}
        />
      ))}

      <style>{`
        .perspective-container {
          perspective: 1000px;
        }

        .flip-card-inner {
          position: relative;
          width: 100%;
          transform-style: preserve-3d;
        }

        .flip-card-front,
        .flip-card-back {
          position: relative;
          width: 100%;
        }

        .flip-card-back {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .flip-card-inner {
            transition: opacity 0.3s ease-in-out !important;
          }
        }
      `}</style>
    </div>
  );
}
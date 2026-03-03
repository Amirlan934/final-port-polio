import { motion } from 'motion/react';
import { easing } from '../utils/motion';
import { PhoneGlowEffect } from './PhoneGlowEffect';
import { PhoneScreenAnimation } from './PhoneScreenAnimation';

// Using a professional designer profile photo from Unsplash
// In production, replace this URL with your own image in /src/assets/images/profile.jpg
// Then import it with: import profileImage from '../../assets/images/profile.jpg';
const profileImage = 'https://images.unsplash.com/photo-1649297554304-70425a8e82cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkZXNpZ25lciUyMHBvcnRmb2xpbyUyMHBob3RvfGVufDF8fHx8MTc3MjUwNjI3NXww&ixlib=rb-4.1.0&q=80&w=1080';

export function AboutSection() {
  return (
    <section id="about" className="relative min-h-screen flex items-center justify-center px-6 py-32">
      {/* Dark gradient backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/40 backdrop-blur-[2px]" />
      
      <div className="max-w-7xl mx-auto relative">
        <div className="flex flex-col items-center text-center">
          {/* Section Label */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: easing }}
            className="text-purple-400/70 tracking-[0.2em] uppercase text-xs md:text-sm mb-16"
          >
            About Me
          </motion.p>

          {/* Main Content Container */}
          <div className="relative w-full max-w-5xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              
              {/* LEFT: Profile Picture with Cinematic Effects */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 1.2, ease: easing }}
                className="relative flex items-center justify-center lg:justify-end order-2 lg:order-1"
              >
                <div className="relative w-full max-w-md flex items-center justify-center py-12">
                  {/* Glow effects behind profile */}
                  <PhoneGlowEffect />

                  {/* Main Profile Picture */}
                  <motion.div
                    animate={{
                      y: [0, -15, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="relative z-10"
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3, ease: easing }}
                      className="relative"
                    >
                      {/* Multi-layer glow effects */}
                      <motion.div
                        className="absolute -inset-16 rounded-full bg-purple-500/30 blur-[100px]"
                        animate={{
                          scale: [1, 1.15, 1],
                          opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />
                      
                      <motion.div
                        className="absolute -inset-14 rounded-full bg-violet-500/40 blur-[80px]"
                        animate={{
                          scale: [1.15, 1, 1.15],
                          opacity: [0.4, 0.7, 0.4],
                        }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />

                      {/* Profile Image Container - EXTRA LARGE */}
                      <div className="relative w-[28rem] h-[28rem] rounded-full overflow-hidden border-[6px] border-purple-400/70 shadow-2xl shadow-purple-500/90 ring-8 ring-purple-400/20">
                        <img
                          src={profileImage}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                        {/* Gradient overlay for depth */}
                        <div className="absolute inset-0 bg-gradient-to-t from-purple-500/30 via-transparent to-transparent" />
                        
                        {/* Light sweep animation */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          animate={{
                            x: ['-200%', '200%'],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            repeatDelay: 2,
                            ease: 'easeInOut',
                          }}
                        />
                      </div>
                      
                      {/* Rotating conic gradient ring */}
                      <motion.div
                        className="absolute -inset-4 rounded-full"
                        style={{
                          background: 'conic-gradient(from 0deg, transparent 0%, rgba(167, 139, 250, 0.7) 50%, transparent 100%)',
                        }}
                        animate={{
                          rotate: 360,
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      />
                      
                      {/* Multiple pulsing rings */}
                      <motion.div
                        className="absolute -inset-4 rounded-full border-2 border-purple-400/50"
                        animate={{
                          scale: [1, 1.15, 1],
                          opacity: [0.6, 0, 0.6],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: 'easeOut',
                        }}
                      />
                      
                      <motion.div
                        className="absolute -inset-8 rounded-full border border-violet-400/40"
                        animate={{
                          scale: [1, 1.25, 1],
                          opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: 'easeOut',
                          delay: 0.5,
                        }}
                      />

                      <motion.div
                        className="absolute -inset-12 rounded-full border border-purple-400/30"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.4, 0, 0.4],
                        }}
                        transition={{
                          duration: 3.5,
                          repeat: Infinity,
                          ease: 'easeOut',
                          delay: 1,
                        }}
                      />

                      {/* Orbiting sparkle particles */}
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={`sparkle-${i}`}
                          className="absolute w-2 h-2 bg-purple-300 rounded-full blur-[1px]"
                          style={{
                            top: `${Math.cos((i * Math.PI * 2) / 8) * 180 + 50}%`,
                            left: `${Math.sin((i * Math.PI * 2) / 8) * 180 + 50}%`,
                          }}
                          animate={{
                            scale: [0, 1.5, 0],
                            opacity: [0, 1, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.25,
                            ease: 'easeInOut',
                          }}
                        />
                      ))}
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>

              {/* RIGHT: About Text Content */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 1, delay: 0.2, ease: easing }}
                className="space-y-8 text-left order-1 lg:order-2"
              >
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
                  Crafting digital
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-400">
                    experiences
                  </span>
                </h2>

                <div className="space-y-5 text-base md:text-lg text-gray-400 leading-relaxed max-w-md">
                  <p>
                    I'm a UI/UX designer who transforms complex problems into elegant, 
                    intuitive solutions. My work bridges creativity and technology.
                  </p>
                  <p>
                    With expertise in user research, interface design, and prototyping, 
                    I create experiences that resonate with users and drive business success.
                  </p>
                  <p className="text-white/80">
                    Let's build something extraordinary together.
                  </p>
                </div>

                {/* Stats or highlights */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5, ease: easing }}
                  className="flex gap-8 pt-4"
                >
                  <div className="space-y-1">
                    <div className="text-3xl font-light text-purple-400">8+</div>
                    <div className="text-sm text-gray-500 uppercase tracking-wider">Years</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-3xl font-light text-purple-400">50+</div>
                    <div className="text-sm text-gray-500 uppercase tracking-wider">Projects</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-3xl font-light text-purple-400">20+</div>
                    <div className="text-sm text-gray-500 uppercase tracking-wider">Clients</div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}